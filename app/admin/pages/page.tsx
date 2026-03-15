'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { formatDate } from '@/lib/utils';
import type { Page } from '@/types/cms';

const STATUS_COLORS: Record<string, string> = {
  published: '#10B981',
  draft: '#F59E0B',
  archived: '#64748b',
};

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getCmsClient();
    (supabase.from('pages') as any).select('*').order('updated_at', { ascending: false }).then(({ data }: { data: any }) => {
      setPages((data ?? []) as Page[]);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>Pages</h1>
      </div>

      <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>Loading…</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                {['Title', 'Slug', 'Status', 'Updated', ''].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{page.title}</td>
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#0ECECE', fontFamily: 'monospace' }}>/{page.slug}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, background: `${STATUS_COLORS[page.status]}22`, color: STATUS_COLORS[page.status], textTransform: 'capitalize' }}>
                      {page.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{formatDate(page.updated_at)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <Link href={`/admin/pages/${page.id}/edit`} style={{ padding: '5px 12px', background: '#1e293b', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', textDecoration: 'none' }}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
