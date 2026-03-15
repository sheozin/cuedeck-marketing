'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { formatDate } from '@/lib/utils';
import type { ChangelogItem, ChangelogType } from '@/types/cms';

const TYPE_COLORS: Record<ChangelogType, string> = {
  new: '#10B981',
  improved: '#4A8EFF',
  fixed: '#F59E0B',
  deprecated: '#ef4444',
};

export default function ChangelogPage() {
  const [items, setItems] = useState<ChangelogItem[]>([]);
  const [editing, setEditing] = useState<Partial<ChangelogItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (getCmsClient().from('changelog_items') as any).select('*').order('published_at', { ascending: false }).then(({ data }: { data: any }) => {
      setItems((data ?? []) as ChangelogItem[]);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const supabase = getCmsClient();
    if (editing.id) {
      const { data } = await (supabase.from('changelog_items') as any).update(editing as any).eq('id', editing.id).select().single();
      if (data) setItems((i) => i.map((x) => x.id === data.id ? data as ChangelogItem : x));
    } else {
      const { data } = await (supabase.from('changelog_items') as any).insert({ ...editing, description_json: {} } as any).select().single();
      if (data) setItems((i) => [data as ChangelogItem, ...i]);
    }
    setSaving(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this changelog entry?')) return;
    await (getCmsClient().from('changelog_items') as any).delete().eq('id', id);
    setItems((i) => i.filter((x) => x.id !== id));
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>Changelog</h1>
        <button onClick={() => setEditing({ version: '', title: '', type: 'new', published_at: new Date().toISOString() })} style={{ padding: '10px 20px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          + Add Entry
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>Loading…</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item) => (
            <div key={item.id} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: `${TYPE_COLORS[item.type]}22`,
                    color: TYPE_COLORS[item.type],
                    textTransform: 'capitalize',
                  }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>v{item.version}</span>
                  <span style={{ fontSize: '12px', color: '#475569' }}>{formatDate(item.published_at)}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{item.title}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button onClick={() => setEditing(item)} style={{ padding: '5px 12px', background: '#1e293b', border: 'none', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ padding: '5px 12px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '6px', color: '#f87171', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setEditing(null)}>
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>{editing.id ? 'Edit' : 'New'} Changelog Entry</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Version *</label>
                <input value={editing.version ?? ''} onChange={(e) => setEditing((f) => ({ ...f, version: e.target.value }))} placeholder="2.5.0" style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', fontFamily: 'monospace', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Type</label>
                <select value={editing.type ?? 'new'} onChange={(e) => setEditing((f) => ({ ...f, type: e.target.value as ChangelogType }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px' }}>
                  {(['new', 'improved', 'fixed', 'deprecated'] as ChangelogType[]).map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Title *</label>
              <input value={editing.title ?? ''} onChange={(e) => setEditing((f) => ({ ...f, title: e.target.value }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Publish date</label>
              <input type="datetime-local" value={editing.published_at ? editing.published_at.slice(0, 16) : ''} onChange={(e) => setEditing((f) => ({ ...f, published_at: new Date(e.target.value).toISOString() }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
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
