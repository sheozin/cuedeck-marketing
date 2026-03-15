'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { slugify } from '@/lib/utils';
import { TiptapEditor } from '@/components/editor/TiptapEditor';
import type { BlogPost } from '@/types/cms';

const STATUS_OPTIONS = ['draft', 'published', 'scheduled', 'archived'];

const EMPTY_POST: Partial<BlogPost> = {
  title: '',
  slug: '',
  excerpt: '',
  content_json: {},
  cover_image: null,
  tags: [],
  status: 'draft',
  read_time_minutes: 5,
};

export default function BlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const router = useRouter();

  const [post, setPost] = useState<Partial<BlogPost>>(EMPTY_POST);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isNew) return;
    const supabase = getCmsClient();
    supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }: { data: any }) => {
        if (data) setPost(data as BlogPost);
        setLoading(false);
      }, () => setLoading(false));
  }, [id, isNew]);

  // Auto-generate slug from title
  function handleTitleChange(title: string) {
    setPost((p) => ({
      ...p,
      title,
      slug: p.slug && p.slug !== slugify(p.title ?? '') ? p.slug : slugify(title),
    }));
  }

  function addTag(tag: string) {
    const t = tag.trim().toLowerCase();
    if (!t || (post.tags ?? []).includes(t)) return;
    setPost((p) => ({ ...p, tags: [...(p.tags ?? []), t] }));
    setTagInput('');
  }

  function removeTag(tag: string) {
    setPost((p) => ({ ...p, tags: (p.tags ?? []).filter((t) => t !== tag) }));
  }

  const handleSave = useCallback(async (publish?: boolean) => {
    setSaving(true);
    const supabase = getCmsClient();
    const payload = {
      ...post,
      status: publish ? 'published' : (post.status ?? 'draft'),
      published_at: publish ? new Date().toISOString() : post.published_at,
    };

    let error;
    if (isNew) {
      const { data, error: e } = await (supabase.from('blog_posts') as any).insert(payload as any).select().single();
      error = e;
      if (data) {
        router.replace(`/admin/blog/${(data as any).id}/edit`);
      }
    } else {
      const { error: e } = await (supabase.from('blog_posts') as any).update(payload as any).eq('id', id);
      error = e;
    }

    setSaving(false);
    setSaveMsg(error ? `Error: ${error.message}` : (publish ? 'Published!' : 'Saved'));
    setTimeout(() => setSaveMsg(''), 3000);
  }, [post, isNew, id, router]);

  // Cmd+S to save
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSave]);

  if (loading) {
    return <div style={{ color: '#64748b', padding: '40px' }}>Loading post…</div>;
  }

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9' }}>
            {isNew ? 'New Blog Post' : 'Edit Post'}
          </h1>
          <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace', marginTop: '2px' }}>
            /{post.slug || '(no slug)'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {saveMsg && (
            <span style={{ fontSize: '13px', color: saveMsg.startsWith('Error') ? '#f87171' : '#10B981' }}>
              {saveMsg}
            </span>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            style={{
              padding: '9px 18px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '14px',
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Saving…' : 'Save draft'}
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            style={{
              padding: '9px 18px',
              background: '#4A8EFF',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            Publish
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'start' }}>
        {/* Left: Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title */}
          <input
            value={post.title ?? ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            style={{
              width: '100%',
              padding: '14px',
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              color: '#f1f5f9',
              fontSize: '22px',
              fontWeight: 700,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />

          {/* Excerpt */}
          <textarea
            value={post.excerpt ?? ''}
            onChange={(e) => setPost((p) => ({ ...p, excerpt: e.target.value }))}
            placeholder="Short excerpt (shown in blog list and SEO)"
            rows={3}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              color: '#f1f5f9',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              lineHeight: 1.6,
              boxSizing: 'border-box',
            }}
          />

          {/* Tiptap editor */}
          <TiptapEditor
            content={post.content_json ?? {}}
            onChange={(content) => setPost((p) => ({ ...p, content_json: content }))}
            placeholder="Start writing your post…"
          />
        </div>

        {/* Right: Settings sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '80px' }}>
          {/* Publish settings */}
          <div style={{
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            padding: '16px',
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Publish
            </h3>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Status</label>
              <select
                value={post.status ?? 'draft'}
                onChange={(e) => setPost((p) => ({ ...p, status: e.target.value as BlogPost['status'] }))}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  background: '#0A0E1A',
                  border: '1px solid #1e293b',
                  borderRadius: '6px',
                  color: '#f1f5f9',
                  fontSize: '13px',
                  textTransform: 'capitalize',
                }}
              >
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Publish date</label>
              <input
                type="datetime-local"
                value={post.published_at ? post.published_at.slice(0, 16) : ''}
                onChange={(e) => setPost((p) => ({ ...p, published_at: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  background: '#0A0E1A',
                  border: '1px solid #1e293b',
                  borderRadius: '6px',
                  color: '#f1f5f9',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Read time (min)</label>
              <input
                type="number"
                value={post.read_time_minutes ?? 5}
                min={1}
                onChange={(e) => setPost((p) => ({ ...p, read_time_minutes: parseInt(e.target.value) || 5 }))}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  background: '#0A0E1A',
                  border: '1px solid #1e293b',
                  borderRadius: '6px',
                  color: '#f1f5f9',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* SEO / Slug */}
          <div style={{
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            padding: '16px',
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              SEO
            </h3>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>URL slug</label>
              <input
                value={post.slug ?? ''}
                onChange={(e) => setPost((p) => ({ ...p, slug: slugify(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  background: '#0A0E1A',
                  border: '1px solid #1e293b',
                  borderRadius: '6px',
                  color: '#4A8EFF',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Cover image URL</label>
              <input
                value={post.cover_image ?? ''}
                onChange={(e) => setPost((p) => ({ ...p, cover_image: e.target.value || null }))}
                placeholder="https://…"
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  background: '#0A0E1A',
                  border: '1px solid #1e293b',
                  borderRadius: '6px',
                  color: '#f1f5f9',
                  fontSize: '12px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Tags */}
          <div style={{
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            padding: '16px',
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Tags
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              {(post.tags ?? []).map((tag) => (
                <span key={tag} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 10px',
                  background: '#1e293b',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#94a3b8',
                }}>
                  {tag}
                  <button onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: '12px' }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); } }}
                placeholder="Add tag…"
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  background: '#0A0E1A',
                  border: '1px solid #1e293b',
                  borderRadius: '6px',
                  color: '#f1f5f9',
                  fontSize: '12px',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => addTag(tagInput)}
                style={{
                  padding: '7px 12px',
                  background: '#1e293b',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#94a3b8',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
