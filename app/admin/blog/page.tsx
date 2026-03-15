'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/cms';
import type { Post } from '@/lib/posts';

const STATUS_COLORS: Record<string, string> = {
  published: '#10B981',
  draft: '#F59E0B',
  scheduled: '#4A8EFF',
  archived: '#64748b',
};

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [mdxPosts, setMdxPosts] = useState<Post[]>([]);
  const [mdxLoading, setMdxLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getCmsClient();
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('updated_at', { ascending: false });

    if (filter !== 'all') query = query.eq('status', filter);

    query.then(({ data }: { data: any }) => {
      setPosts((data ?? []) as BlogPost[]);
      setLoading(false);
    }, () => setLoading(false));
  }, [filter]);

  useEffect(() => {
    fetch('/api/admin/mdx-posts')
      .then((r) => r.json())
      .then(({ posts }: { posts: Post[] }) => {
        setMdxPosts(posts ?? []);
        setMdxLoading(false);
      })
      .catch(() => setMdxLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    const supabase = getCmsClient();
    await (supabase.from('blog_posts') as any).delete().eq('id', id);
    setPosts((p) => p.filter((x) => x.id !== id));
  }

  async function handleDuplicate(post: BlogPost) {
    const supabase = getCmsClient();
    const { data } = await (supabase.from('blog_posts') as any).insert({
      title: `${post.title} (copy)`,
      slug: `${post.slug}-copy-${Date.now()}`,
      excerpt: post.excerpt,
      content_json: post.content_json,
      cover_image: post.cover_image,
      tags: post.tags,
      status: 'draft',
      read_time_minutes: post.read_time_minutes,
    }).select().single();
    if (data) router.push(`/admin/blog/${data.id}/edit`);
  }

  const filtered = posts.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>Blog Posts</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{posts.length} posts total</p>
        </div>
        <Link
          href="/admin/blog/new/edit"
          style={{
            padding: '10px 20px',
            background: '#4A8EFF',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          + New Post
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['all', 'published', 'draft', 'scheduled', 'archived'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: filter === s ? '#4A8EFF' : '#1e293b',
              background: filter === s ? 'rgba(74,142,255,0.1)' : 'transparent',
              color: filter === s ? '#4A8EFF' : '#64748b',
              fontSize: '13px',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {s}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts…"
          style={{
            marginLeft: 'auto',
            padding: '6px 14px',
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            color: '#f1f5f9',
            fontSize: '13px',
            outline: 'none',
          }}
        />
      </div>

      {/* Table */}
      <div style={{
        background: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>Loading posts…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>
            No posts found.{' '}
            <Link href="/admin/blog/new/edit" style={{ color: '#4A8EFF' }}>Create one →</Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                {['Title', 'Status', 'Tags', 'Updated', 'Read time', ''].map((h) => (
                  <th key={h} style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {post.cover_image && (
                        <img
                          src={post.cover_image}
                          alt=""
                          style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                        />
                      )}
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{post.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>/{post.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: `${STATUS_COLORS[post.status]}22`,
                      color: STATUS_COLORS[post.status],
                      textTransform: 'capitalize',
                    }}>
                      {post.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {(post.tags ?? []).map((tag) => (
                        <span key={tag} style={{
                          padding: '2px 8px',
                          background: '#1e293b',
                          borderRadius: '8px',
                          fontSize: '11px',
                          color: '#94a3b8',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>
                    {formatDate(post.updated_at)}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>
                    {post.read_time_minutes} min
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        style={{
                          padding: '5px 12px',
                          background: '#1e293b',
                          borderRadius: '6px',
                          color: '#94a3b8',
                          fontSize: '12px',
                          textDecoration: 'none',
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDuplicate(post)}
                        style={{
                          padding: '5px 12px',
                          background: '#1e293b',
                          borderRadius: '6px',
                          color: '#94a3b8',
                          fontSize: '12px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        style={{
                          padding: '5px 12px',
                          background: 'rgba(239,68,68,0.1)',
                          borderRadius: '6px',
                          color: '#f87171',
                          fontSize: '12px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* File-based posts section */}
      <div style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
            File-based posts (read-only)
            {!mdxLoading && (
              <span style={{
                marginLeft: '10px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#64748b',
              }}>
                {mdxPosts.length} posts
              </span>
            )}
          </h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            These posts are stored as MDX files in <code style={{ background: '#1e293b', padding: '1px 6px', borderRadius: '4px', fontSize: '12px', color: '#94a3b8' }}>content/posts/</code> and managed in code via Keystatic. They cannot be edited here.
          </p>
        </div>

        <div style={{
          background: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {mdxLoading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>Loading file-based posts…</div>
          ) : mdxPosts.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>No MDX posts found in content/posts/.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  {['Title', 'Date', 'Author', 'Slug', ''].map((h) => (
                    <th key={h} style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mdxPosts.map((post) => (
                  <tr key={post.slug} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {post.featuredImage && (
                          <img
                            src={post.featuredImage}
                            alt=""
                            style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                          />
                        )}
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{post.title}</div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap' }}>
                      {post.date}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>
                      {post.author}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace', background: '#1e293b', padding: '2px 8px', borderRadius: '4px' }}>
                        /{post.slug}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '5px 12px',
                          background: '#1e293b',
                          borderRadius: '6px',
                          color: '#94a3b8',
                          fontSize: '12px',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
