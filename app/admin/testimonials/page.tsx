'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import type { Testimonial } from '@/types/cms';

const EMPTY: Partial<Testimonial> = { author_name: '', author_title: '', company: '', quote: '', rating: 5, is_featured: false, order_index: 0 };

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (getCmsClient().from('testimonials') as any).select('*').order('order_index').then(({ data }: { data: any }) => {
      setItems((data ?? []) as Testimonial[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const supabase = getCmsClient();
    if (editing.id) {
      const { data } = await (supabase.from('testimonials') as any).update(editing as any).eq('id', editing.id).select().single();
      if (data) setItems((i) => i.map((x) => x.id === data.id ? data as Testimonial : x));
    } else {
      const { data } = await (supabase.from('testimonials') as any).insert(editing as any).select().single();
      if (data) setItems((i) => [...i, data as Testimonial]);
    }
    setSaving(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await (getCmsClient().from('testimonials') as any).delete().eq('id', id);
    setItems((i) => i.filter((x) => x.id !== id));
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>Testimonials</h1>
        <button onClick={() => setEditing({ ...EMPTY, order_index: items.length })} style={{ padding: '10px 20px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          + Add Testimonial
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>Loading…</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <div key={item.id} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9' }}>{item.author_name}</span>
                  {item.author_title && <span style={{ fontSize: '12px', color: '#64748b' }}>{item.author_title}{item.company ? `, ${item.company}` : ''}</span>}
                  {item.is_featured && <span style={{ padding: '2px 8px', background: 'rgba(74,142,255,0.15)', color: '#4A8EFF', borderRadius: '8px', fontSize: '11px' }}>Featured</span>}
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>&ldquo;{item.quote}&rdquo;</div>
                <div style={{ marginTop: '8px', color: '#F59E0B', fontSize: '14px' }}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => setEditing(item)} style={{ padding: '5px 12px', background: '#1e293b', border: 'none', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ padding: '5px 12px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '6px', color: '#f87171', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setEditing(null)}>
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>{editing.id ? 'Edit' : 'New'} Testimonial</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              {[['author_name', 'Name *'], ['author_title', 'Title'], ['company', 'Company'], ['avatar_url', 'Avatar URL']].map(([field, label]) => (
                <div key={field}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>{label}</label>
                  <input value={(editing as Record<string, unknown>)[field] as string ?? ''} onChange={(e) => setEditing((f) => ({ ...f, [field]: e.target.value }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Quote *</label>
              <textarea value={editing.quote ?? ''} onChange={(e) => setEditing((f) => ({ ...f, quote: e.target.value }))} rows={3} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Rating (1-5)</label>
                <input type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing((f) => ({ ...f, rating: parseInt(e.target.value) }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '2px' }}>
                <input type="checkbox" id="featured" checked={editing.is_featured ?? false} onChange={(e) => setEditing((f) => ({ ...f, is_featured: e.target.checked }))} />
                <label htmlFor="featured" style={{ fontSize: '13px', color: '#94a3b8' }}>Featured</label>
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
