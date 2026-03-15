'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import type { FeatureCard } from '@/types/cms';

export default function FeaturesPage() {
  const [features, setFeatures] = useState<FeatureCard[]>([]);
  const [editing, setEditing] = useState<Partial<FeatureCard> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (getCmsClient().from('feature_cards') as any).select('*').order('order_index').then(({ data }: { data: any }) => {
      setFeatures((data ?? []) as FeatureCard[]);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const supabase = getCmsClient();
    if (editing.id) {
      const { data } = await (supabase.from('feature_cards') as any).update(editing as any).eq('id', editing.id).select().single();
      if (data) setFeatures((f) => f.map((x) => x.id === data.id ? data as FeatureCard : x));
    } else {
      const { data } = await (supabase.from('feature_cards') as any).insert(editing as any).select().single();
      if (data) setFeatures((f) => [...f, data as FeatureCard]);
    }
    setSaving(false);
    setEditing(null);
  }

  async function toggleVisible(id: string, is_visible: boolean) {
    await (getCmsClient().from('feature_cards') as any).update({ is_visible: !is_visible } as any).eq('id', id);
    setFeatures((f) => f.map((x) => x.id === id ? { ...x, is_visible: !is_visible } : x));
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>Feature Cards</h1>
        <button onClick={() => setEditing({ title: '', description: '', icon_name: 'Zap', category: 'general', order_index: features.length, is_visible: true })} style={{ padding: '10px 20px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          + Add Feature
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>Loading…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {features.map((f) => (
            <div key={f.id} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px', opacity: f.is_visible ? 1 : 0.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '22px' }}>⚡</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => toggleVisible(f.id, f.is_visible)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px' }}>
                    {f.is_visible ? '👁' : '🙈'}
                  </button>
                  <button onClick={() => setEditing(f)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '13px' }}>✎</button>
                </div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', marginBottom: '6px' }}>{f.title}</div>
              <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>{f.description}</div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '8px', textTransform: 'capitalize' }}>{f.category}</div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setEditing(null)}>
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>{editing.id ? 'Edit' : 'New'} Feature Card</h2>
            {[['title', 'Title *'], ['icon_name', 'Icon name'], ['category', 'Category']].map(([field, label]) => (
              <div key={field} style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>{label}</label>
                <input value={(editing as Record<string, unknown>)[field] as string ?? ''} onChange={(e) => setEditing((f) => ({ ...f, [field]: e.target.value }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Description *</label>
              <textarea value={editing.description ?? ''} onChange={(e) => setEditing((f) => ({ ...f, description: e.target.value }))} rows={3} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box' }} />
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
