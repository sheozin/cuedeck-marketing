'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { TiptapEditor } from '@/components/editor/TiptapEditor';
import type { Page, PageSection } from '@/types/cms';

const SECTION_TYPES = [
  { type: 'hero', label: 'Hero', icon: '⭐' },
  { type: 'features', label: 'Feature Grid', icon: '⚡' },
  { type: 'testimonials', label: 'Testimonials', icon: '❝' },
  { type: 'pricing', label: 'Pricing', icon: '◈' },
  { type: 'stats', label: 'Stats', icon: '📊' },
  { type: 'faq', label: 'FAQ', icon: '?' },
  { type: 'cta', label: 'CTA Banner', icon: '📢' },
  { type: 'blog_grid', label: 'Blog Grid', icon: '✎' },
  { type: 'team', label: 'Team Grid', icon: '◉' },
  { type: 'richtext', label: 'Rich Text', icon: 'T' },
  { type: 'html', label: 'Custom HTML', icon: '</>' },
];

export default function PageEditPage() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    const supabase = getCmsClient();
    Promise.all([
      (supabase.from('pages') as any).select('*').eq('id', id).single(),
      (supabase.from('page_sections') as any).select('*').eq('page_id', id).order('order_index'),
    ]).then(([pageRes, sectionsRes]) => {
      if (pageRes.data) setPage(pageRes.data as Page);
      setSections((sectionsRes.data ?? []) as PageSection[]);
      setLoading(false);
    });
  }, [id]);

  const handleSave = useCallback(async () => {
    if (!page) return;
    setSaving(true);
    const supabase = getCmsClient();
    await (supabase.from('pages') as any).update({
      title: page.title,
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      og_image: page.og_image,
      status: page.status,
    } as any).eq('id', id);
    setSaving(false);
    setSaveMsg('Saved');
    setTimeout(() => setSaveMsg(''), 2500);
  }, [page, id]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); handleSave(); }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSave]);

  async function addSection(type: string) {
    const supabase = getCmsClient();
    const maxOrder = sections.reduce((m, s) => Math.max(m, s.order_index), -1);
    const { data } = await (supabase.from('page_sections') as any).insert({
      page_id: id,
      section_type: type,
      order_index: maxOrder + 1,
      content_json: {},
      is_visible: true,
    } as any).select().single();
    if (data) {
      setSections((s) => [...s, data as PageSection]);
      setActiveSection(data.id);
    }
  }

  async function removeSection(sectionId: string) {
    if (!confirm('Remove this section?')) return;
    const supabase = getCmsClient();
    await (supabase.from('page_sections') as any).delete().eq('id', sectionId);
    setSections((s) => s.filter((x) => x.id !== sectionId));
    if (activeSection === sectionId) setActiveSection(null);
  }

  async function moveSection(sectionId: string, direction: 'up' | 'down') {
    const idx = sections.findIndex((s) => s.id === sectionId);
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === sections.length - 1) return;

    const newSections = [...sections];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newSections[idx], newSections[swapIdx]] = [newSections[swapIdx], newSections[idx]];
    newSections.forEach((s, i) => s.order_index = i);
    setSections(newSections);

    const supabase = getCmsClient();
    await Promise.all(newSections.map((s, i) =>
      (supabase.from('page_sections') as any).update({ order_index: i } as any).eq('id', s.id)
    ));
  }

  async function toggleVisible(section: PageSection) {
    const supabase = getCmsClient();
    await (supabase.from('page_sections') as any).update({ is_visible: !section.is_visible } as any).eq('id', section.id);
    setSections((s) => s.map((x) => x.id === section.id ? { ...x, is_visible: !x.is_visible } : x));
  }

  const activeSectionData = sections.find((s) => s.id === activeSection);

  if (loading) return <div style={{ color: '#64748b', padding: '40px' }}>Loading page editor…</div>;
  if (!page) return <div style={{ color: '#f87171', padding: '40px' }}>Page not found.</div>;

  return (
    <div style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9' }}>Edit Page: {page.title}</h1>
          <div style={{ fontSize: '12px', color: '#0ECECE', fontFamily: 'monospace', marginTop: '2px' }}>/{page.slug}</div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {saveMsg && <span style={{ fontSize: '13px', color: '#10B981' }}>{saveMsg}</span>}
          <button onClick={handleSave} disabled={saving} style={{ padding: '9px 18px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'flex-start' }}>
        {/* Left: canvas */}
        <div>
          {/* SEO panel */}
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SEO</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Meta title</label>
                <input value={page.meta_title ?? ''} onChange={(e) => setPage((p) => p ? { ...p, meta_title: e.target.value } : p)} style={{ width: '100%', padding: '7px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>OG image URL</label>
                <input value={page.og_image ?? ''} onChange={(e) => setPage((p) => p ? { ...p, og_image: e.target.value || null } : p)} style={{ width: '100%', padding: '7px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Meta description</label>
                <textarea value={page.meta_description ?? ''} onChange={(e) => setPage((p) => p ? { ...p, meta_description: e.target.value } : p)} rows={2} style={{ width: '100%', padding: '7px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '12px', resize: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sections.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#475569', background: '#111827', borderRadius: '10px', border: '1px dashed #1e293b' }}>
                No sections yet. Add one from the right panel.
              </div>
            )}
            {sections.map((section, i) => {
              const typeDef = SECTION_TYPES.find((t) => t.type === section.section_type);
              const isActive = activeSection === section.id;
              return (
                <div key={section.id} style={{
                  background: '#111827',
                  border: `1px solid ${isActive ? '#4A8EFF' : '#1e293b'}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}>
                  <div
                    onClick={() => setActiveSection(isActive ? null : section.id)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}>{typeDef?.icon ?? '□'}</span>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: isActive ? '#4A8EFF' : '#f1f5f9' }}>{typeDef?.label ?? section.section_type}</span>
                      {!section.is_visible && <span style={{ fontSize: '11px', color: '#475569' }}>(hidden)</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }} disabled={i === 0} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' }}>↑</button>
                      <button onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }} disabled={i === sections.length - 1} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' }}>↓</button>
                      <button onClick={(e) => { e.stopPropagation(); toggleVisible(section); }} style={{ background: 'none', border: 'none', color: section.is_visible ? '#10B981' : '#64748b', cursor: 'pointer', fontSize: '13px' }}>
                        {section.is_visible ? '👁' : '🙈'}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); removeSection(section.id); }} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '13px' }}>✕</button>
                    </div>
                  </div>
                  {isActive && (
                    <div style={{ padding: '16px', borderTop: '1px solid #1e293b' }}>
                      {section.section_type === 'richtext' ? (
                        <TiptapEditor
                          content={section.content_json as Record<string, unknown>}
                          onChange={async (content) => {
                            const supabase = getCmsClient();
                            await (supabase.from('page_sections') as any).update({ content_json: content } as any).eq('id', section.id);
                            setSections((s) => s.map((x) => x.id === section.id ? { ...x, content_json: content } : x));
                          }}
                        />
                      ) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#475569', background: '#0A0E1A', borderRadius: '8px' }}>
                          <div style={{ fontSize: '24px', marginBottom: '8px' }}>{typeDef?.icon}</div>
                          <div style={{ fontSize: '14px' }}><strong>{typeDef?.label}</strong> section</div>
                          <div style={{ fontSize: '12px', color: '#334155', marginTop: '4px' }}>
                            This section type renders dynamic content from the CMS tables.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: section library */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Add Section</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {SECTION_TYPES.map((t) => (
                <button
                  key={t.type}
                  onClick={() => addSection(t.type)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '9px 12px',
                    background: 'transparent',
                    border: '1px solid #1e293b',
                    borderRadius: '7px',
                    color: '#94a3b8',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
