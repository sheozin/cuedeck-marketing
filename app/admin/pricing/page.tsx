'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import type { PricingPlan } from '@/types/cms';

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [editing, setEditing] = useState<Partial<PricingPlan> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    (getCmsClient().from('pricing_plans') as any).select('*').order('order_index').then(({ data }: { data: any }) => {
      setPlans((data ?? []) as PricingPlan[]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const supabase = getCmsClient();
    if (editing.id) {
      const { data } = await (supabase.from('pricing_plans') as any).update(editing as any).eq('id', editing.id).select().single();
      if (data) setPlans((p) => p.map((x) => x.id === data.id ? data as PricingPlan : x));
    } else {
      const { data } = await (supabase.from('pricing_plans') as any).insert({ ...editing, features_json: editing.features_json ?? [] } as any).select().single();
      if (data) setPlans((p) => [...p, data as PricingPlan]);
    }
    setSaving(false);
    setEditing(null);
  }

  function addFeature() {
    if (!featureInput.trim()) return;
    setEditing((e) => ({ ...e, features_json: [...(e?.features_json ?? []), featureInput.trim()] }));
    setFeatureInput('');
  }

  function removeFeature(i: number) {
    setEditing((e) => ({ ...e, features_json: (e?.features_json ?? []).filter((_, idx) => idx !== i) }));
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>Pricing Plans</h1>
        <button onClick={() => setEditing({ name: '', slug: '', price_monthly: 0, price_annual: 0, features_json: [], cta_label: 'Get Started', cta_url: '/contact', is_highlighted: false, is_active: true, order_index: plans.length })} style={{ padding: '10px 20px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          + Add Plan
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>Loading…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {plans.map((plan) => (
            <div key={plan.id} style={{ background: '#111827', border: `1px solid ${plan.is_highlighted ? '#4A8EFF' : '#1e293b'}`, borderRadius: '12px', padding: '20px', position: 'relative' }}>
              {plan.is_highlighted && <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#4A8EFF', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '10px', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>{plan.name}</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#4A8EFF', marginBottom: '4px' }}>€{plan.price_monthly}<span style={{ fontSize: '13px', color: '#64748b' }}>/mo</span></div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>€{plan.price_annual}/mo annual</div>
              <ul style={{ margin: '0 0 16px', padding: '0 0 0 16px', listStyle: 'disc' }}>
                {(plan.features_json ?? []).map((f, i) => (
                  <li key={i} style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{f}</li>
                ))}
              </ul>
              <button onClick={() => setEditing(plan)} style={{ width: '100%', padding: '8px', background: '#1e293b', border: 'none', borderRadius: '6px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setEditing(null)}>
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '560px', maxHeight: '80vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>{editing.id ? 'Edit' : 'New'} Plan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              {[['name', 'Name *'], ['slug', 'Slug'], ['cta_label', 'CTA Label'], ['cta_url', 'CTA URL']].map(([field, label]) => (
                <div key={field}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>{label}</label>
                  <input value={(editing as Record<string, unknown>)[field] as string ?? ''} onChange={(e) => setEditing((f) => ({ ...f, [field]: e.target.value }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              ))}
              {[['price_monthly', 'Monthly price (€)'], ['price_annual', 'Annual price (€)']].map(([field, label]) => (
                <div key={field}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>{label}</label>
                  <input type="number" value={(editing as Record<string, unknown>)[field] as number ?? 0} onChange={(e) => setEditing((f) => ({ ...f, [field]: parseFloat(e.target.value) || 0 }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#94a3b8' }}>
                <input type="checkbox" checked={editing.is_highlighted ?? false} onChange={(e) => setEditing((f) => ({ ...f, is_highlighted: e.target.checked }))} />
                Highlighted (Most popular)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#94a3b8' }}>
                <input type="checkbox" checked={editing.is_active ?? true} onChange={(e) => setEditing((f) => ({ ...f, is_active: e.target.checked }))} />
                Active
              </label>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>Features</label>
              {(editing.features_json ?? []).map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ flex: 1, padding: '6px 10px', background: '#0A0E1A', borderRadius: '5px', fontSize: '12px', color: '#94a3b8' }}>{f}</span>
                  <button onClick={() => removeFeature(i)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '14px' }}>×</button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }} placeholder="Add feature…" style={{ flex: 1, padding: '7px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '12px', outline: 'none' }} />
                <button onClick={addFeature} style={{ padding: '7px 12px', background: '#1e293b', border: 'none', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>Add</button>
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
