'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { formatRelativeTime } from '@/lib/utils';
import type { AuditLogEntry } from '@/types/cms';

export default function AuditLogPage() {
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<AuditLogEntry | null>(null);

  useEffect(() => {
    getCmsClient()
      .from('audit_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data }: { data: any }) => {
        setEntries((data ?? []) as AuditLogEntry[]);
        setLoading(false);
      }, () => setLoading(false));
  }, []);

  const filtered = entries.filter((e) =>
    !search ||
    e.action.toLowerCase().includes(search.toLowerCase()) ||
    e.entity_type.toLowerCase().includes(search.toLowerCase())
  );

  function exportCsv() {
    const rows = [
      ['Date', 'Action', 'Entity Type', 'Entity ID'],
      ...filtered.map((e) => [e.created_at, e.action, e.entity_type, e.entity_id ?? '']),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function diffRows(diff: Record<string, unknown> | null) {
    if (!diff) return null;
    const before = diff.before as Record<string, unknown> | undefined;
    const after = diff.after as Record<string, unknown> | undefined;
    if (!before && !after) return null;
    const keys = Array.from(new Set([...Object.keys(before ?? {}), ...Object.keys(after ?? {})]));
    return keys.filter((k) => JSON.stringify(before?.[k]) !== JSON.stringify(after?.[k]));
  }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>Audit Log</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{entries.length} entries</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by action or entity…"
            style={{ padding: '8px 14px', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', color: '#f1f5f9', fontSize: '13px', outline: 'none', width: '220px' }}
          />
          <button onClick={exportCsv} style={{ padding: '9px 18px', background: '#1e293b', border: 'none', borderRadius: '8px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
            Export CSV
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>Loading audit log…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>No entries found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  {['Time', 'Action', 'Entity', 'ID', ''].map((h) => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry) => (
                  <tr
                    key={entry.id}
                    onClick={() => setSelected(entry)}
                    style={{
                      borderBottom: '1px solid #1e293b',
                      cursor: 'pointer',
                      background: selected?.id === entry.id ? 'rgba(74,142,255,0.05)' : 'transparent',
                    }}
                  >
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>{formatRelativeTime(entry.created_at)}</td>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: '#f1f5f9', fontWeight: 500 }}>{entry.action}</td>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: '#94a3b8', textTransform: 'capitalize' }}>{entry.entity_type}</td>
                    <td style={{ padding: '10px 14px', fontSize: '11px', color: '#475569', fontFamily: 'monospace' }}>{entry.entity_id?.slice(0, 8) ?? '—'}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                      {entry.diff_json && <span style={{ fontSize: '11px', color: '#4A8EFF' }}>diff</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <div style={{ width: '280px', flexShrink: 0, background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px', position: 'sticky', top: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>Diff Viewer</span>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '16px' }}>×</button>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{selected.action} · {selected.entity_type}</div>
            <div style={{ fontSize: '11px', color: '#475569', marginBottom: '12px', fontFamily: 'monospace' }}>{selected.entity_id ?? 'no entity id'}</div>
            {selected.diff_json ? (
              <div>
                {(diffRows(selected.diff_json) ?? []).map((key) => {
                  const before = (selected.diff_json as Record<string, Record<string, unknown>>).before?.[key];
                  const after = (selected.diff_json as Record<string, Record<string, unknown>>).after?.[key];
                  return (
                    <div key={key} style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '11px', color: '#4A8EFF', fontWeight: 600, marginBottom: '3px' }}>{key}</div>
                      <div style={{ background: 'rgba(239,68,68,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#fca5a5', fontFamily: 'monospace', marginBottom: '2px' }}>
                        − {JSON.stringify(before)}
                      </div>
                      <div style={{ background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#6ee7b7', fontFamily: 'monospace' }}>
                        + {JSON.stringify(after)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: '#475569' }}>No diff data for this entry.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
