'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import type { Redirect } from '@/types/cms';

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Redirect> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (getCmsClient().from('redirects') as any).select('*').order('from_path').then(({ data }: { data: any }) => {
      setRedirects((data ?? []) as Redirect[]);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const supabase = getCmsClient();
    if (editing.id) {
      const { data } = await (supabase.from('redirects') as any).update(editing as any).eq('id', editing.id).select().single();
      if (data) setRedirects((r) => r.map((x) => x.id === data.id ? data as Redirect : x));
    } else {
      const { data } = await (supabase.from('redirects') as any).insert(editing as any).select().single();
      if (data) setRedirects((r) => [...r, data as Redirect]);
    }
    setSaving(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this redirect?')) return;
    await (getCmsClient().from('redirects') as any).delete().eq('id', id);
    setRedirects((r) => r.filter((x) => x.id !== id));
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>Redirects</h1>
        <button onClick={() => setEditing({ from_path: '', to_path: '', status_code: 301, is_active: true })} style={{ padding: '10px 20px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          + Add Redirect
        </button>
      </div>

      <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>Loading…</div>
        ) : redirects.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>No redirects configured.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                {['From', 'To', 'Status', 'Active', ''].map((h) => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {redirects.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#f1f5f9', fontFamily: 'monospace' }}>{r.from_path}</td>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#94a3b8', fontFamily: 'monospace' }}>→ {r.to_path}</td>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#64748b' }}>{r.status_code}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ fontSize: '12px', color: r.is_active ? '#10B981' : '#64748b' }}>{r.is_active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => setEditing(r)} style={{ padding: '4px 10px', background: '#1e293b', border: 'none', borderRadius: '5px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleDelete(r.id)} style={{ padding: '4px 10px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '5px', color: '#f87171', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setEditing(null)}>
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>{editing.id ? 'Edit' : 'New'} Redirect</h2>
            {[['from_path', 'From path *', '/old-url'], ['to_path', 'To path *', '/new-url']].map(([field, label, ph]) => (
              <div key={field} style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>{label}</label>
                <input value={(editing as Record<string, unknown>)[field] as string ?? ''} onChange={(e) => setEditing((f) => ({ ...f, [field]: e.target.value }))} placeholder={ph} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'monospace', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Status code</label>
                <select value={editing.status_code ?? 301} onChange={(e) => setEditing((f) => ({ ...f, status_code: parseInt(e.target.value) }))} style={{ padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px' }}>
                  <option value={301}>301 Permanent</option>
                  <option value={302}>302 Temporary</option>
                  <option value={307}>307 Temporary (method-safe)</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#94a3b8' }}>
                  <input type="checkbox" checked={editing.is_active ?? true} onChange={(e) => setEditing((f) => ({ ...f, is_active: e.target.checked }))} />
                  Active
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setEditing(null)} style={{ padding: '9px 18px', background: '#1e293b', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ padding: '9px 18px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
