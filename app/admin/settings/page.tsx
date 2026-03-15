'use client';

import { useEffect, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import type { SiteSetting } from '@/types/cms';

const SETTING_GROUPS = [
  {
    title: 'General',
    keys: ['site_name', 'site_tagline', 'site_url', 'app_url', 'support_email'],
    labels: { site_name: 'Site Name', site_tagline: 'Tagline', site_url: 'Site URL', app_url: 'App URL', support_email: 'Support Email' },
  },
  {
    title: 'Social',
    keys: ['social_twitter', 'social_linkedin'],
    labels: { social_twitter: 'Twitter Handle', social_linkedin: 'LinkedIn URL' },
  },
  {
    title: 'System',
    keys: ['maintenance_mode', 'signup_open'],
    labels: { maintenance_mode: 'Maintenance Mode', signup_open: 'Signups Open' },
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    (getCmsClient().from('site_settings') as any).select('*').then(({ data }: { data: any }) => {
      const map: Record<string, unknown> = {};
      for (const s of (data ?? []) as SiteSetting[]) {
        map[s.key] = s.value;
      }
      setSettings(map);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    const supabase = getCmsClient();
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const { error } = await (supabase.from('site_settings') as any).upsert(upserts as any, { onConflict: 'key' });
    setSaving(false);
    setSaveMsg(error ? `Error: ${error.message}` : 'Settings saved');
    setTimeout(() => setSaveMsg(''), 3000);
  }

  function updateSetting(key: string, value: unknown) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  if (loading) return <div style={{ color: '#475569', padding: '40px' }}>Loading settings…</div>;

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9' }}>Site Settings</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {saveMsg && <span style={{ fontSize: '13px', color: saveMsg.startsWith('Error') ? '#f87171' : '#10B981' }}>{saveMsg}</span>}
          <button onClick={handleSave} disabled={saving} style={{ padding: '10px 20px', background: '#4A8EFF', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            {saving ? 'Saving…' : 'Save all'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {SETTING_GROUPS.map((group) => (
          <div key={group.title} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>{group.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {group.keys.map((key) => {
                const label = (group.labels as Record<string, unknown>)[key] as string ?? key;
                const value = settings[key];
                const isBool = typeof value === 'boolean';
                return (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label style={{ width: '180px', fontSize: '13px', color: '#94a3b8', flexShrink: 0 }}>{label}</label>
                    {isBool ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[true, false].map((v) => (
                          <button
                            key={String(v)}
                            onClick={() => updateSetting(key, v)}
                            style={{
                              padding: '5px 14px',
                              borderRadius: '6px',
                              border: '1px solid',
                              borderColor: value === v ? '#4A8EFF' : '#1e293b',
                              background: value === v ? 'rgba(74,142,255,0.1)' : '#0A0E1A',
                              color: value === v ? '#4A8EFF' : '#64748b',
                              fontSize: '13px',
                              cursor: 'pointer',
                            }}
                          >
                            {v ? 'On' : 'Off'}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        value={typeof value === 'string' ? value : ''}
                        onChange={(e) => updateSetting(key, e.target.value)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          background: '#0A0E1A',
                          border: '1px solid #1e293b',
                          borderRadius: '6px',
                          color: '#f1f5f9',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
