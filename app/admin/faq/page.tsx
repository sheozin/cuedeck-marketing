'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import type { Faq } from '@/types/cms';

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (getCmsClient().from('faqs') as any).select('*').order('order_index').then(({ data }: { data: any }) => {
      setFaqs((data ?? []) as Faq[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const supabase = getCmsClient();
    if (editing.id) {
      const { data } = await (supabase.from('faqs') as any).update(editing as any).eq('id', editing.id).select().single();
      if (data) setFaqs((f) => f.map((x) => x.id === data.id ? data as Faq : x));
    } else {
      const { data } = await (supabase.from('faqs') as any).insert(editing as any).select().single();
      if (data) setFaqs((f) => [...f, data as Faq]);
    }
    setSaving(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this FAQ?')) return;
    await (getCmsClient().from('faqs') as any).delete().eq('id', id);
    setFaqs((f) => f.filter((x) => x.id !== id));
  }

  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>FAQs</h1>
        <button onClick={() => setEditing({ question: '', answer_html: '', category: 'general', order_index: faqs.length, is_published: true })} style={{ padding: '10px 20px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          + Add FAQ
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>Loading…</div>
      ) : (
        categories.map((cat) => (
          <div key={cat} style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{cat}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {faqs.filter((f) => f.category === cat).map((faq) => {
                const preview = stripHtml(faq.answer_html).slice(0, 120);
                return (
                  <div key={faq.id} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', marginBottom: '6px' }}>{faq.question}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{preview}{faq.answer_html.length > 120 ? '…' : ''}</div>
                      {!faq.is_published && <span style={{ fontSize: '11px', color: '#F59E0B', marginTop: '4px', display: 'block' }}>Unpublished</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button onClick={() => setEditing(faq)} style={{ padding: '5px 12px', background: '#1e293b', border: 'none', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleDelete(faq.id)} style={{ padding: '5px 12px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '6px', color: '#f87171', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setEditing(null)}>
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>{editing.id ? 'Edit' : 'New'} FAQ</h2>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Question *</label>
              <input value={editing.question ?? ''} onChange={(e) => setEditing((f) => ({ ...f, question: e.target.value }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Answer (HTML) *</label>
              <textarea value={editing.answer_html ?? ''} onChange={(e) => setEditing((f) => ({ ...f, answer_html: e.target.value }))} rows={5} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'monospace' }} />
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>HTML is stored as-is and rendered on the live site.</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Category</label>
                <input value={editing.category ?? 'general'} onChange={(e) => setEditing((f) => ({ ...f, category: e.target.value }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#94a3b8' }}>
                  <input type="checkbox" checked={editing.is_published ?? true} onChange={(e) => setEditing((f) => ({ ...f, is_published: e.target.checked }))} />
                  Published
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
