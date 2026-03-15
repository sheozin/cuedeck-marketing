'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import type { TeamMember } from '@/types/cms';

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (getCmsClient().from('team_members') as any).select('*').order('order_index').then(({ data }: { data: any }) => {
      setMembers((data ?? []) as TeamMember[]);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const supabase = getCmsClient();
    if (editing.id) {
      const { data } = await (supabase.from('team_members') as any).update(editing as any).eq('id', editing.id).select().single();
      if (data) setMembers((m) => m.map((x) => x.id === data.id ? data as TeamMember : x));
    } else {
      const { data } = await (supabase.from('team_members') as any).insert(editing as any).select().single();
      if (data) setMembers((m) => [...m, data as TeamMember]);
    }
    setSaving(false);
    setEditing(null);
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>Team Members</h1>
        <button onClick={() => setEditing({ name: '', role: '', bio: '', is_visible: true, order_index: members.length })} style={{ padding: '10px 20px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          + Add Member
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>Loading…</div>
      ) : members.length === 0 ? (
        <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>No team members yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {members.map((m) => (
            <div key={m.id} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              {m.photo_url ? (
                <img src={m.photo_url} alt={m.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#4A8EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {m.name[0]}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{m.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{m.role}</div>
              </div>
              {!m.is_visible && <span style={{ fontSize: '11px', color: '#475569' }}>hidden</span>}
              <button onClick={() => setEditing(m)} style={{ padding: '5px 12px', background: '#1e293b', border: 'none', borderRadius: '6px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setEditing(null)}>
          <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>{editing.id ? 'Edit' : 'New'} Team Member</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              {[['name', 'Name *'], ['role', 'Role *'], ['photo_url', 'Photo URL'], ['linkedin_url', 'LinkedIn URL']].map(([field, label]) => (
                <div key={field}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>{label}</label>
                  <input value={(editing as Record<string, unknown>)[field] as string ?? ''} onChange={(e) => setEditing((f) => ({ ...f, [field]: e.target.value || null }))} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Bio</label>
              <textarea value={editing.bio ?? ''} onChange={(e) => setEditing((f) => ({ ...f, bio: e.target.value || null }))} rows={3} style={{ width: '100%', padding: '8px 10px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '13px', resize: 'vertical', boxSizing: 'border-box' }} />
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
