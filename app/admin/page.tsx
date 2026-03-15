'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { formatRelativeTime } from '@/lib/utils';
import type { AuditLogEntry } from '@/types/cms';

interface Stats {
  publishedPages: number;
  blogPostsThisMonth: number;
  totalMedia: number;
  recentActivity: AuditLogEntry[];
}

const QUICK_ACTIONS = [
  { label: 'New Blog Post', icon: '✎', href: '/admin/blog/new/edit', color: '#4A8EFF' },
  { label: 'Edit Homepage', icon: '□', href: '/admin/pages', color: '#0ECECE' },
  { label: 'Upload Media', icon: '⊟', href: '/admin/media', color: '#8B5CF6' },
  { label: 'View Live Site', icon: '↗', href: 'https://www.cuedeck.io', color: '#10B981', external: true },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    publishedPages: 0,
    blogPostsThisMonth: 0,
    totalMedia: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getCmsClient();

    async function loadStats() {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const [pages, posts, media, activity] = await Promise.all([
        (supabase.from('pages') as any).select('id', { count: 'exact' }).eq('status', 'published'),
        (supabase.from('blog_posts') as any).select('id', { count: 'exact' }).gte('created_at', monthStart.toISOString()),
        (supabase.from('media_assets') as any).select('id', { count: 'exact' }),
        (supabase.from('audit_log') as any).select('*').order('created_at', { ascending: false }).limit(10),
      ]);

      setStats({
        publishedPages: pages.count ?? 0,
        blogPostsThisMonth: posts.count ?? 0,
        totalMedia: media.count ?? 0,
        recentActivity: (activity.data ?? []) as AuditLogEntry[],
      });
      setLoading(false);
    }

    loadStats().catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Published Pages', value: stats.publishedPages, icon: '□', color: '#4A8EFF', href: '/admin/pages' },
    { label: 'Posts This Month', value: stats.blogPostsThisMonth, icon: '✎', color: '#0ECECE', href: '/admin/blog' },
    { label: 'Media Assets', value: stats.totalMedia, icon: '⊟', color: '#8B5CF6', href: '/admin/media' },
    { label: 'Active Redirects', value: 0, icon: '↗', color: '#F59E0B', href: '/admin/redirects' },
  ];

  return (
    <div style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Welcome back — here&apos;s what&apos;s happening on CueDeck.io
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '28px',
      }}>
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            style={{
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '20px',
              textDecoration: 'none',
              display: 'block',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px', color: card.color }}>{card.icon}</span>
              <span style={{
                fontSize: '11px',
                padding: '3px 8px',
                background: `${card.color}22`,
                color: card.color,
                borderRadius: '10px',
                fontWeight: 600,
              }}>view →</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>
              {loading ? '—' : card.value}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{card.label}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Quick actions */}
        <div style={{
          background: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9', marginBottom: '16px' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {QUICK_ACTIONS.map((action) => {
              const Comp = action.external ? 'a' : Link;
              const props = action.external
                ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: action.href };
              return (
                <Comp
                  key={action.label}
                  {...props}
                  style={{
                    display: 'flex',
                    flexDirection: 'column' as const,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '20px 16px',
                    background: '#0A0E1A',
                    border: '1px solid #1e293b',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '22px', color: action.color }}>{action.icon}</span>
                  <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500, textAlign: 'center' as const }}>
                    {action.label}
                  </span>
                </Comp>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{
          background: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9', marginBottom: '16px' }}>
            Recent Activity
          </h2>
          {loading ? (
            <div style={{ color: '#475569', fontSize: '14px' }}>Loading…</div>
          ) : stats.recentActivity.length === 0 ? (
            <div style={{ color: '#475569', fontSize: '13px' }}>No recent activity yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.recentActivity.map((entry) => (
                <div key={entry.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #1e293b',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    color: '#4A8EFF',
                    flexShrink: 0,
                  }}>
                    {entry.action[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 500 }}>
                      {entry.action} {entry.entity_type}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>
                      {formatRelativeTime(entry.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link href="/admin/audit" style={{
            display: 'block',
            marginTop: '12px',
            fontSize: '13px',
            color: '#4A8EFF',
            textDecoration: 'none',
          }}>
            View full audit log →
          </Link>
        </div>
      </div>
    </div>
  );
}
