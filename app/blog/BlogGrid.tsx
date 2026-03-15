'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[] | null;
  published_at: string;
  read_time_minutes: number | null;
}

interface Props {
  posts: Post[];
  tags: string[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogGrid({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered =
    activeTag === 'all'
      ? posts
      : posts.filter((p) => (p.tags ?? []).includes(activeTag));

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Tag filter bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {['all', ...tags].map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'capitalize',
              background: activeTag === tag ? '#3b82f6' : '#f1f5f9',
              color: activeTag === tag ? '#fff' : '#64748b',
              transition: 'all 0.15s',
            }}
          >
            {tag === 'all' ? 'All' : tag}
          </button>
        ))}
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: 16 }}>
          No posts found.
        </p>
      ) : (
        <div
          className="blog-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {filtered.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'box-shadow 0.15s',
                boxShadow: hoveredId === post.id ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {/* Cover image or gradient placeholder */}
              {post.cover_image ? (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    display: 'block',
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                    flexShrink: 0,
                  }}
                />
              )}

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Category badge */}
                {post.tags && post.tags.length > 0 && (
                  <span style={{
                    display: 'inline-block',
                    background: '#eff6ff',
                    color: '#3b82f6',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    marginBottom: '10px',
                    alignSelf: 'flex-start',
                  }}>
                    {post.tags[0]}
                  </span>
                )}

                {/* Title */}
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: hoveredId === post.id ? '#3b82f6' : '#111827',
                    lineHeight: 1.4,
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    transition: 'color 0.15s',
                  }}
                >
                  {post.title}
                </div>

                {/* Excerpt */}
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    lineHeight: 1.6,
                    marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1,
                  }}
                >
                  {post.excerpt ?? ''}
                </div>

                {/* Meta */}
                <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', gap: '6px' }}>
                  <span>{formatDate(post.published_at)}</span>
                  {post.read_time_minutes && (
                    <>
                      <span>·</span>
                      <span>{post.read_time_minutes} min read</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
