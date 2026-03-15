import type { Metadata } from 'next';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import DocsClient, { type DocSection } from '../../components/DocsClient';

const APP_URL = 'https://app.cuedeck.io';
const TRIAL_URL = `${APP_URL}/#signup`;

// ─── SEO ────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Docs — CueDeck User Guide',
  description:
    'Complete guide to CueDeck: session management, roles, digital signage, AI agents, delay cascade, and more. Everything you need to run live events like a pro.',
  openGraph: {
    title: 'CueDeck Docs — User Guide',
    description: 'Complete documentation for the CueDeck live-event production console.',
    url: 'https://cuedeck.io/docs',
  },
};

// ─── Reusable inline‑styled atoms ───────────────────────────────────────────────

/** Paragraph */
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: 16, fontSize: 15, color: '#4b5563', lineHeight: 1.75 }}>{children}</p>;
}

/** Strong label */
function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: '#111827', fontWeight: 600 }}>{children}</strong>;
}

/** Callout box (tip / important / note) */
function Callout({ type = 'tip', children }: { type?: 'tip' | 'important' | 'note'; children: React.ReactNode }) {
  const colors: Record<string, { bg: string; border: string; label: string; labelColor: string }> = {
    tip:       { bg: 'rgba(34,197,94,0.05)',  border: '#22c55e', label: 'Tip',       labelColor: '#16a34a' },
    important: { bg: 'rgba(249,115,22,0.05)', border: '#f97316', label: 'Important', labelColor: '#ea580c' },
    note:      { bg: 'rgba(59,130,246,0.05)', border: '#3b82f6', label: 'Note',      labelColor: '#2563eb' },
  };
  const c = colors[type];
  return (
    <div style={{
      background: c.bg, borderLeft: `3px solid ${c.border}`,
      borderRadius: 8, padding: '14px 18px', marginBottom: 18,
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: c.labelColor, marginBottom: 6 }}>
        {c.label}
      </p>
      <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

/** Unordered list */
function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ paddingLeft: 20, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65 }}>{item}</li>
      ))}
    </ul>
  );
}

/** Ordered list */
function OL({ items }: { items: React.ReactNode[] }) {
  return (
    <ol style={{ paddingLeft: 20, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65 }}>{item}</li>
      ))}
    </ol>
  );
}

/** Styled status badge pill (mimics console) */
function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '2px 10px',
      borderRadius: 99, background: `${color}18`, color, border: `1px solid ${color}44`,
      letterSpacing: '0.04em', lineHeight: '18px',
    }}>
      {label}
    </span>
  );
}

/** Simple table */
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 18, borderRadius: 10, border: '1px solid #e5e7eb', maxWidth: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                textAlign: 'left', padding: '10px 14px', fontWeight: 600,
                color: '#111827', background: '#f9fafb', borderBottom: '1px solid #e5e7eb',
                whiteSpace: 'nowrap',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} style={{ background: r % 2 === 1 ? '#fafafa' : '#fff' }}>
              {row.map((cell, c) => (
                <td key={c} style={{ padding: '9px 14px', color: '#4b5563', borderBottom: '1px solid #f3f4f6' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Sub-heading inside a section */
function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 10, marginTop: 24 }}>{children}</h3>;
}

// ─── Console mockup wrapper (dark frame) ────────────────────────────────────────
function MockFrame({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden', marginBottom: 20, marginTop: 8,
      boxShadow: '0 8px 30px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid rgba(255,255,255,0.06)', maxWidth: 600, width: '100%',
    }}>
      {/* Titlebar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#0d1220', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', opacity: 0.65, display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308', opacity: 0.65, display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', opacity: 0.65, display: 'inline-block' }} />
        {title && <span style={{ marginLeft: 8, fontSize: 10, color: '#475569' }}>{title}</span>}
      </div>
      {/* Content */}
      <div style={{ background: '#111827', padding: '12px 14px' }}>
        {children}
      </div>
    </div>
  );
}

// ─── Mockup: UI Overview (annotated layout) ─────────────────────────────────────
function MockUIOverview() {
  return (
    <MockFrame title="app.cuedeck.io — Director View">
      <div style={{ display: 'flex', gap: 8 }}>
        {/* Sidebar */}
        <div style={{
          width: 100, minWidth: 70, flexShrink: 1, background: 'rgba(255,255,255,0.03)',
          borderRadius: 6, padding: '8px 6px', border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: '#60a5fa', marginBottom: 4 }}>
            <span style={{ color: '#fff' }}>Cue</span>Deck
          </div>
          {['Sessions', 'Timeline', 'Signage', 'Operators', 'AI Agents', 'Event Log', 'Billing'].map((item, i) => (
            <div key={item} style={{
              fontSize: 8, padding: '3px 6px', borderRadius: 3, color: i === 0 ? '#60a5fa' : '#64748b',
              background: i === 0 ? 'rgba(59,130,246,0.12)' : 'transparent',
            }}>{item}</div>
          ))}
          <div style={{ fontSize: 7, color: '#334155', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 4 }}>
            ← Sidebar
          </div>
        </div>
        {/* Main area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Top bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '4px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {['DIR', 'STG', 'AV', 'SIG'].map((r, i) => (
                <span key={r} style={{
                  fontSize: 7, padding: '1px 4px', borderRadius: 2,
                  background: i === 0 ? '#1e3a5f' : 'transparent',
                  color: i === 0 ? '#60a5fa' : '#475569',
                }}>{r}</span>
              ))}
            </div>
            <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#fff', fontWeight: 700 }}>14:32:07</span>
          </div>
          {/* Broadcast bar */}
          <div style={{
            padding: '4px 8px', background: 'rgba(59,130,246,0.08)', borderRadius: 4,
            border: '1px dashed rgba(59,130,246,0.3)', fontSize: 7, color: '#60a5fa',
          }}>
            📢 Broadcast: &quot;Doors open in 5 minutes&quot;
          </div>
          {/* Session cards */}
          {[
            { n: 1, title: 'Opening Ceremony', status: 'ENDED', color: '#6b7280' },
            { n: 2, title: 'Keynote: Future of AI', status: 'LIVE', color: '#ff3b30' },
            { n: 3, title: 'Coffee Break', status: 'READY', color: '#22c55e' },
            { n: 4, title: 'Workshop: Data Design', status: 'PLANNED', color: '#3b82f6' },
          ].map(s => (
            <div key={s.n} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 5,
              background: s.status === 'LIVE' ? 'rgba(255,59,48,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${s.status === 'LIVE' ? 'rgba(255,59,48,0.2)' : 'rgba(255,255,255,0.05)'}`,
            }}>
              <span style={{ fontSize: 8, color: '#475569', width: 10 }}>{s.n}</span>
              <span style={{ fontSize: 9, color: s.status === 'ENDED' ? '#64748b' : '#e2e8f0', flex: 1, fontWeight: 500 }}>{s.title}</span>
              <span style={{
                fontSize: 7, padding: '1px 6px', borderRadius: 99, fontWeight: 700,
                background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44`,
              }}>{s.status}</span>
            </div>
          ))}
          <div style={{ fontSize: 7, color: '#334155', textAlign: 'right' }}>↑ Session List Area</div>
        </div>
      </div>
    </MockFrame>
  );
}

// ─── Mockup: Session Card anatomy ───────────────────────────────────────────────
function MockSessionCard() {
  return (
    <MockFrame title="Session Card — LIVE state">
      <div style={{
        padding: '10px 12px', borderRadius: 8,
        background: 'rgba(255,59,48,0.06)',
        border: '1px solid rgba(255,59,48,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>3</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Keynote: The Next Wave</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>Dr. Sarah Chen · Main Stage · 10:30–11:15</div>
          </div>
          <span style={{
            fontSize: 9, padding: '2px 8px', borderRadius: 99, fontWeight: 700,
            background: 'rgba(255,59,48,0.15)', color: '#ff3b30', border: '1px solid rgba(255,59,48,0.3)',
          }}>LIVE</span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginBottom: 8, overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', background: '#ff3b30', borderRadius: 99 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 10, color: '#94a3b8' }}>
            <span style={{ color: '#f1f5f9', fontWeight: 600, fontFamily: 'monospace' }}>30:42</span> elapsed · <span style={{ color: '#f1f5f9', fontWeight: 600, fontFamily: 'monospace' }}>14:18</span> remaining
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <span style={{ fontSize: 8, padding: '3px 8px', borderRadius: 4, background: 'rgba(249,115,22,0.12)', color: '#fdba74', border: '1px solid rgba(249,115,22,0.3)' }}>HOLD</span>
            <span style={{ fontSize: 8, padding: '3px 8px', borderRadius: 4, background: 'rgba(107,114,128,0.12)', color: '#9ca3af', border: '1px solid rgba(107,114,128,0.3)' }}>END</span>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

// ─── Mockup: Broadcast Bar ──────────────────────────────────────────────────────
function MockBroadcast() {
  return (
    <MockFrame title="Broadcast System">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Input bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 6,
          border: '1px solid rgba(59,130,246,0.25)',
        }}>
          <span style={{ fontSize: 12 }}>📢</span>
          <span style={{ flex: 1, fontSize: 11, color: '#94a3b8' }}>Type broadcast message...</span>
          <span style={{ fontSize: 9, color: '#475569' }}>0/280</span>
          <span style={{ fontSize: 9, padding: '3px 10px', borderRadius: 4, background: '#3b82f6', color: '#fff', fontWeight: 600 }}>Send</span>
        </div>
        {/* Presets */}
        <div>
          <div style={{ fontSize: 8, color: '#475569', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Presets</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {['🚪 Doors open 5min', '⏸ Hold — tech issue', '✅ All clear', '☕ Break 15min', '👔 VIP standby'].map(p => (
              <span key={p} style={{
                fontSize: 8, padding: '3px 8px', borderRadius: 4,
                background: 'rgba(59,130,246,0.08)', color: '#60a5fa',
                border: '1px solid rgba(59,130,246,0.2)', cursor: 'pointer',
              }}>{p}</span>
            ))}
          </div>
        </div>
        {/* Active broadcast */}
        <div style={{
          padding: '8px 10px', borderRadius: 6,
          background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 8, color: '#3b82f6', fontWeight: 600, marginBottom: 2 }}>ACTIVE BROADCAST</div>
            <div style={{ fontSize: 11, color: '#e2e8f0' }}>☕ Break time — back in 15 minutes</div>
          </div>
          <span style={{ fontSize: 10, color: '#475569', cursor: 'pointer' }}>✕</span>
        </div>
      </div>
    </MockFrame>
  );
}

// ─── Mockup: Delay Cascade ──────────────────────────────────────────────────────
function MockDelayCascade() {
  return (
    <MockFrame title="Delay Cascade — +10 min applied">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { n: 3, title: 'Keynote: The Next Wave', time: '10:30', newTime: null, status: 'LIVE', delayed: false },
          { n: 4, title: 'Coffee Break', time: '11:15', newTime: '11:25', status: 'READY', delayed: true },
          { n: 5, title: 'Panel: Data Ethics', time: '11:45', newTime: '11:55', status: 'PLANNED', delayed: true },
          { n: 6, title: 'Workshop: Intro to AI', time: '12:30', newTime: '12:40', status: 'PLANNED', delayed: true },
        ].map(s => (
          <div key={s.n} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6,
            background: s.delayed ? 'rgba(249,115,22,0.06)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${s.delayed ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)'}`,
          }}>
            <span style={{ fontSize: 9, color: '#475569', width: 12 }}>{s.n}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#e2e8f0', fontWeight: 500 }}>{s.title}</div>
              <div style={{ fontSize: 9, color: '#64748b' }}>
                {s.delayed ? (
                  <><span style={{ textDecoration: 'line-through', color: '#475569' }}>{s.time}</span> → <span style={{ color: '#fdba74', fontWeight: 600 }}>{s.newTime}</span> <span style={{ color: '#f97316', fontSize: 8 }}>+10min</span></>
                ) : (
                  <span>{s.time}</span>
                )}
              </div>
            </div>
            <span style={{
              fontSize: 7, padding: '1px 6px', borderRadius: 99, fontWeight: 700,
              background: s.status === 'LIVE' ? 'rgba(255,59,48,0.15)' : s.status === 'READY' ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.12)',
              color: s.status === 'LIVE' ? '#ff3b30' : s.status === 'READY' ? '#22c55e' : '#3b82f6',
            }}>{s.status}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, marginTop: 4 }}>
          <span style={{ fontSize: 8, padding: '3px 10px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>Reset to planned</span>
        </div>
      </div>
    </MockFrame>
  );
}

// ─── Mockup: Stage Monitor ──────────────────────────────────────────────────────
function MockStageMonitor() {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden', marginBottom: 20, marginTop: 8,
      boxShadow: '0 8px 30px rgba(0,0,0,0.15)', maxWidth: 600, width: '100%',
      background: '#000', border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ padding: '24px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>NOW PRESENTING</div>
        <div style={{ fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 800, color: '#fff', marginBottom: 6 }}>Keynote: The Next Wave</div>
        <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16 }}>Dr. Sarah Chen · Main Stage</div>
        <div style={{ fontFamily: 'monospace', fontSize: 'clamp(28px, 8vw, 40px)', fontWeight: 800, color: '#22c55e', marginBottom: 6 }}>14:18</div>
        <div style={{ fontSize: 11, color: '#64748b' }}>remaining</div>
        {/* Progress bar */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 99, margin: '16px auto 16px', maxWidth: 300, overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', background: '#22c55e', borderRadius: 99 }} />
        </div>
        <div style={{
          fontSize: 10, color: '#475569', padding: '6px 12px', borderRadius: 6,
          background: 'rgba(255,255,255,0.04)', display: 'inline-block',
        }}>
          NEXT: Coffee Break · 11:15
        </div>
      </div>
    </div>
  );
}

// ─── Mockup: AI Agents Panel ────────────────────────────────────────────────────
function MockAIAgents() {
  return (
    <MockFrame title="AI Agents — Director Panel">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { icon: '🔍', name: 'Incident Advisor', desc: 'AI diagnosis & resolution steps', status: 'Ready', statusColor: '#22c55e' },
          { icon: '⏰', name: 'Cue Engine', desc: 'Pre-cue alerts 8 min before start', status: 'Active · 2 upcoming', statusColor: '#3b82f6' },
          { icon: '📊', name: 'Report Generator', desc: 'Post-event summary & variance', status: 'Ready', statusColor: '#22c55e' },
        ].map(a => (
          <div key={a.name} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 6,
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: 18 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#f1f5f9' }}>{a.name}</div>
              <div style={{ fontSize: 9, color: '#64748b' }}>{a.desc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 8, color: a.statusColor, fontWeight: 600 }}>{a.status}</div>
              <span style={{
                fontSize: 8, padding: '2px 8px', borderRadius: 4, marginTop: 2, display: 'inline-block',
                background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)',
              }}>Open</span>
            </div>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

// ─── Mockup: Keyboard Shortcuts ─────────────────────────────────────────────────
function MockKeyboard() {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16, marginTop: 8,
    }}>
      {[
        { key: 'B', label: 'Broadcast' },
        { key: 'R', label: 'Ready' },
        { key: 'G', label: 'Go Live' },
        { key: 'H', label: 'Hold' },
        { key: 'E', label: 'End' },
        { key: 'F', label: 'Filter' },
      ].map(k => (
        <div key={k.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#f9fafb', border: '1px solid #e5e7eb', boxShadow: '0 2px 0 #d1d5db',
            fontSize: 14, fontWeight: 700, color: '#111827', fontFamily: 'monospace',
          }}>{k.key}</div>
          <span style={{ fontSize: 9, color: '#9ca3af' }}>{k.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Section content definitions ────────────────────────────────────────────────

const SECTIONS: DocSection[] = [

  // ── 1. Quick Start ──────────────────────────────────────────────────────────
  {
    id: 'quick-start',
    title: 'Quick Start',
    icon: '🚀',
    content: (
      <>
        <P>Get your first event running in five steps:</P>
        <OL items={[
          <><B>Sign up</B> — Go to <a href={TRIAL_URL} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>app.cuedeck.io</a> and create an account with the invite code provided by your director (or start a free trial).</>,
          <><B>Create an event</B> — Click <B>+ New Event</B> in the sidebar. Give it a name, date, and venue.</>,
          <><B>Add sessions</B> — Click <B>+ Add Session</B> to create your programme. Set title, speaker, room, start time, and duration for each session.</>,
          <><B>Invite your team</B> — Go to <B>Operators</B> in the sidebar and invite stage managers, AV techs, and other crew by email. Assign each person a role.</>,
          <><B>Go live!</B> — On event day, open the console. Move sessions through the state machine: <Badge label="PLANNED" color="#3b82f6" /> → <Badge label="READY" color="#22c55e" /> → <Badge label="CALLING" color="#f97316" /> → <Badge label="LIVE" color="#ff3b30" /> → <Badge label="ENDED" color="#6b7280" /></>,
        ]} />
        <Callout type="tip">Every status change propagates to all connected operators in real time. No need to refresh.</Callout>
      </>
    ),
  },

  // ── 2. Getting Started ──────────────────────────────────────────────────────
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '👋',
    content: (
      <>
        <H3>Creating an Account</H3>
        <P>Navigate to <a href={APP_URL} style={{ color: '#3b82f6', textDecoration: 'none' }}>app.cuedeck.io</a> and click <B>Sign up</B>. You will need:</P>
        <UL items={[
          'A valid email address',
          'A password (minimum 6 characters)',
          'An invite code from your director, or select "Start free trial" if you are the director',
        ]} />

        <H3>Signing In</H3>
        <P>Enter your email and password on the login screen. CueDeck uses Supabase Auth with secure session tokens. Your session persists across browser tabs.</P>

        <H3>The Welcome Modal</H3>
        <P>First-time users see a welcome modal that explains the console layout, role assignments, and key shortcuts. You can revisit this anytime from the sidebar help menu.</P>

        <H3>Choosing a Role</H3>
        <P>Your director assigns you a role when inviting you. Each role shows a different view of the console optimised for that crew position. See the <a href="#roles" style={{ color: '#3b82f6', textDecoration: 'none' }}>Roles</a> section for details.</P>

        <Callout type="note">If you are the director (account owner), you automatically have full access to all features and settings.</Callout>
      </>
    ),
  },

  // ── 3. UI Overview ──────────────────────────────────────────────────────────
  {
    id: 'ui-overview',
    title: 'UI Overview',
    icon: '🖥️',
    content: (
      <>
        <P>The CueDeck console is divided into five main regions:</P>
        <MockUIOverview />

        <H3>1. Top Bar</H3>
        <P>Contains the CueDeck logo, current event name, role switcher pills (Director / Stage / AV / etc.), database and realtime connection indicators, and the synced clock.</P>

        <H3>2. Sidebar</H3>
        <P>Navigation hub with links to: Events, Sessions (list view), Timeline, Signage, Operators, Broadcast, AI Agents (director only), Event Log, and Billing.</P>

        <H3>3. Session List</H3>
        <P>The main content area showing all sessions as cards. Each card displays session number, title, speaker, room, time, status badge, and action buttons. Cards are colour-coded by status.</P>

        <H3>4. Broadcast Bar</H3>
        <P>A persistent bar at the top of the session area for sending messages to all operators. Includes quick presets and a character counter.</P>

        <H3>5. Clock</H3>
        <P>An NTP-synced clock in the top-right corner showing the corrected time across all connected devices. Accuracy is maintained via RTT-based offset calculation.</P>

        <Callout type="tip">The interface is fully responsive. On tablets, the sidebar collapses into a hamburger menu. The clock remains always visible.</Callout>
      </>
    ),
  },

  // ── 4. Roles ────────────────────────────────────────────────────────────────
  {
    id: 'roles',
    title: 'Roles',
    icon: '👥',
    content: (
      <>
        <P>CueDeck supports six distinct operator roles. Each role has a tailored view showing only the controls and information relevant to that crew position.</P>

        <Table
          headers={['Role', 'What They See', 'What They Can Do']}
          rows={[
            ['Director', 'Everything — full console with all panels', 'All session transitions, broadcast, signage, delay cascade, AI agents, billing, operator management'],
            ['Stage', 'Sessions for assigned rooms, speaker info, timing', 'Call speaker, set ready, go live, end session, hold stage'],
            ['AV', 'Session titles, rooms, technical notes, timing', 'Mark AV ready, view technical notes, monitor transitions'],
            ['Interpreter', 'Session titles, speaker names, languages, timing', 'View language assignments, monitor session progress'],
            ['Registration', 'Session list, room assignments, attendee-relevant info', 'View session schedule, check room capacity'],
            ['Signage', 'Signage panel with display management', 'Configure displays, set modes, manage sponsor carousel, push overrides'],
          ]}
        />

        <Callout type="important">Only directors can manage billing, invite operators, configure AI agents, or apply delay cascades. All other roles are read-heavy with limited write actions.</Callout>
      </>
    ),
  },

  // ── 5. Session States ───────────────────────────────────────────────────────
  {
    id: 'session-states',
    title: 'Session States',
    icon: '🔄',
    content: (
      <>
        <P>Every session in CueDeck follows an 8-state machine. Transitions are enforced server-side via Supabase Edge Functions to ensure consistency across all connected devices.</P>

        <H3>The 8 States</H3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          <Badge label="PLANNED" color="#3b82f6" />
          <Badge label="READY" color="#22c55e" />
          <Badge label="CALLING" color="#f97316" />
          <Badge label="LIVE" color="#ff3b30" />
          <Badge label="OVERRUN" color="#ff00a8" />
          <Badge label="HOLD" color="#f97316" />
          <Badge label="ENDED" color="#6b7280" />
          <Badge label="CANCELLED" color="#4b5563" />
        </div>

        <H3>Transition Flow</H3>
        <P>The typical happy path for a session is:</P>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8,
          padding: '16px 20px', background: '#f9fafb', borderRadius: 10,
          border: '1px solid #e5e7eb', marginBottom: 18, fontSize: 13, color: '#374151',
        }}>
          <Badge label="PLANNED" color="#3b82f6" />
          <span>→</span>
          <Badge label="READY" color="#22c55e" />
          <span>→</span>
          <Badge label="CALLING" color="#f97316" />
          <span>→</span>
          <Badge label="LIVE" color="#ff3b30" />
          <span>→</span>
          <Badge label="ENDED" color="#6b7280" />
        </div>

        <H3>Special Transitions</H3>
        <UL items={[
          <><Badge label="LIVE" color="#ff3b30" /> → <Badge label="OVERRUN" color="#ff00a8" /> — Triggered automatically when the session exceeds its planned end time.</>,
          <><Badge label="LIVE" color="#ff3b30" /> → <Badge label="HOLD" color="#f97316" /> — Pause a session (e.g. technical issues). Resume sends it back to LIVE.</>,
          <><span>Any state</span> → <Badge label="CANCELLED" color="#4b5563" /> — Cancel a session. Can be reinstated back to PLANNED.</>,
          <><Badge label="CANCELLED" color="#4b5563" /> → <Badge label="PLANNED" color="#3b82f6" /> — Reinstate a cancelled session.</>,
        ]} />

        <Callout type="note">Transitions are idempotent. If two operators click &quot;Go Live&quot; simultaneously, the server processes the first and ignores the duplicate.</Callout>
      </>
    ),
  },

  // ── 6. Session Controls ─────────────────────────────────────────────────────
  {
    id: 'session-controls',
    title: 'Session Controls',
    icon: '🎛️',
    content: (
      <>
        <P>Each session card displays action buttons appropriate to its current state. The available controls change dynamically as the session progresses.</P>
        <MockSessionCard />

        <H3>Card Anatomy</H3>
        <UL items={[
          <><B>Session number</B> — Sequential order in the programme</>,
          <><B>Title &amp; speaker</B> — Session name and presenter</>,
          <><B>Room</B> — Physical location / room name</>,
          <><B>Scheduled time</B> — Start time and duration</>,
          <><B>Status badge</B> — Colour-coded pill showing current state</>,
          <><B>Progress bar</B> — Visual indicator showing elapsed vs. remaining time (visible when LIVE)</>,
          <><B>Action buttons</B> — State-specific controls (Ready, Call Speaker, Go Live, Hold, End, Cancel)</>,
        ]} />

        <H3>Timing Display</H3>
        <P>When a session is <Badge label="LIVE" color="#ff3b30" />, the card shows:</P>
        <UL items={[
          'Elapsed time since going live',
          'Remaining time until planned end',
          'A progress bar that fills from left to right',
          'The bar turns amber at 80% and red at 100% (overrun)',
        ]} />

        <H3>Notes</H3>
        <P>Each session has a notes field visible to all operators. Directors can edit notes; other roles can read them. Use notes for technical requirements, speaker preferences, or last-minute changes.</P>
      </>
    ),
  },

  // ── 7. Broadcast ────────────────────────────────────────────────────────────
  {
    id: 'broadcast',
    title: 'Broadcast System',
    icon: '📢',
    content: (
      <>
        <P>The broadcast system lets directors send real-time messages to all connected operators. Messages appear as a banner at the top of every operator&apos;s screen.</P>
        <MockBroadcast />

        <H3>Sending a Broadcast</H3>
        <OL items={[
          'Click the broadcast bar at the top of the session list (or press B for the keyboard shortcut)',
          'Type your message (max 280 characters — a counter shows remaining)',
          'Press Enter or click Send',
        ]} />

        <H3>Quick Presets</H3>
        <P>The broadcast bar includes one-click presets for common messages:</P>
        <UL items={[
          '"Doors open in 5 minutes"',
          '"Please hold — technical issue"',
          '"All clear — resume programme"',
          '"Break time — 15 minutes"',
          '"VIP arrival — standby all positions"',
        ]} />

        <H3>Dismissing</H3>
        <P>Operators can dismiss a broadcast locally by clicking the X button. The message remains visible to other operators who haven&apos;t dismissed it. Sending a new broadcast replaces the previous one for everyone.</P>

        <Callout type="tip">Broadcasts are stored in the database and survive page refreshes. If an operator reconnects, they see the latest active broadcast.</Callout>
      </>
    ),
  },

  // ── 8. Delay Cascade ────────────────────────────────────────────────────────
  {
    id: 'delay-cascade',
    title: 'Delay Cascade',
    icon: '⏱️',
    content: (
      <>
        <P>When a session runs late, the delay cascade automatically adjusts all downstream sessions to maintain the correct schedule gap.</P>
        <MockDelayCascade />

        <H3>Applying a Delay</H3>
        <OL items={[
          'Open the session that is running late',
          'Click the delay button (clock icon) or use the keyboard shortcut',
          'Enter the delay amount in minutes (e.g. +10)',
          'Choose whether to cascade to downstream sessions',
          'Confirm — all affected sessions update instantly for every operator',
        ]} />

        <H3>Cascade Logic</H3>
        <UL items={[
          <><B>Same room</B> — All later sessions in the same room shift by the delay amount</>,
          <><B>Cross-room</B> — Sessions in other rooms are not affected unless they depend on the delayed session</>,
          <><B>Anchor sessions</B> — Sessions marked as &quot;anchored&quot; will not move, creating a hard boundary</>,
        ]} />

        <H3>Resetting Delays</H3>
        <P>Directors can reset all delays back to the original schedule using the &quot;Reset to planned&quot; button. This reverts every session to its originally scheduled time.</P>

        <Callout type="important">Only directors can apply delay cascades. Stage managers and other roles see the updated schedule but cannot modify it.</Callout>
      </>
    ),
  },

  // ── 9. Quick Filters ────────────────────────────────────────────────────────
  {
    id: 'quick-filters',
    title: 'Quick Filters',
    icon: '🔍',
    content: (
      <>
        <P>The filter bar sits above the session list and lets you quickly narrow down what you see.</P>

        <H3>Search</H3>
        <P>Type in the search box to filter sessions by title, speaker name, or room. Results update as you type.</P>

        <H3>Status Filter</H3>
        <P>Click any status badge in the filter bar to show only sessions in that state. Click again to deselect. You can select multiple statuses.</P>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          <Badge label="PLANNED" color="#3b82f6" />
          <Badge label="READY" color="#22c55e" />
          <Badge label="LIVE" color="#ff3b30" />
          <Badge label="ENDED" color="#6b7280" />
          <Badge label="HOLD" color="#f97316" />
        </div>

        <H3>Room Filter</H3>
        <P>Select a room from the dropdown to show only sessions in that location. Useful when your event spans multiple rooms or halls.</P>

        <Callout type="tip">Filters are additive — you can combine search, status, and room filters simultaneously. Press Escape to clear all filters.</Callout>
      </>
    ),
  },

  // ── 10. Digital Signage ─────────────────────────────────────────────────────
  {
    id: 'signage',
    title: 'Digital Signage',
    icon: '📺',
    content: (
      <>
        <P>CueDeck includes a built-in digital signage system. Drive lobby screens, wayfinding displays, and sponsor carousels directly from the console — no extra software needed.</P>

        <H3>Connecting a Display</H3>
        <OL items={[
          'On the TV or screen, open app.cuedeck.io/d in any browser',
          'A 6-character pairing code appears on screen (e.g. A7K-3M2)',
          'In the console, go to the Signage panel and type the pairing code',
          'Click Pair — the display connects instantly via realtime',
        ]} />
        <Callout type="tip">Tap &ldquo;Install&rdquo; or &ldquo;Add to Home Screen&rdquo; in the browser to install the display as a fullscreen app. It survives reboots and auto-reconnects — no reconfiguration needed.</Callout>

        <H3>Display Modes</H3>
        <Table
          headers={['Mode', 'Description']}
          rows={[
            ['Agenda', 'Shows the current and upcoming sessions in a scrolling list'],
            ['Now & Next', 'Large format showing the current live session and what is coming next'],
            ['Timeline', 'Chronological session list with time markers — ideal for lobby overviews'],
            ['Programme', 'Time × room grid showing the full event programme at a glance'],
            ['Stage Timer', 'Speaker-facing fullscreen countdown with colour-coded urgency (green → amber → red → overrun)'],
            ['Sponsors', 'Auto-rotating carousel of sponsor logos and media'],
            ['Schedule Grid', 'Full programme grid with room columns and time rows'],
            ['WiFi Info', 'Network name and password in large format'],
            ['Break Screen', 'Countdown timer for coffee/lunch breaks'],
            ['Custom Message', 'Free-text message in large display format'],
            ['Blank', 'Black screen (power-save / pre-event)'],
          ]}
        />

        <H3>Sequences</H3>
        <P>Each display can run a sequence — an ordered list of modes that rotate automatically. For example: Sponsors (30s) → Agenda (20s) → WiFi (10s) → repeat.</P>

        <H3>Global Overrides</H3>
        <P>Directors can push a global override to ALL displays at once. Common overrides include Break Screen, 5-Min Recall, and Emergency Message. Overrides take priority until manually cleared.</P>

        <Callout type="note">Displays auto-reconnect if the network drops or the device reboots. The short URL <B>app.cuedeck.io/d</B> works on any device with a browser. Status indicators in the signage panel show which displays are online.</Callout>
      </>
    ),
  },

  // ── 11. Stage Monitor ───────────────────────────────────────────────────────
  {
    id: 'confidence-monitor',
    title: 'Stage Monitor',
    icon: '🎭',
    content: (
      <>
        <P>The Stage Monitor (confidence monitor) provides a fullscreen overlay for speakers and stage crew showing essential session information.</P>
        <MockStageMonitor />

        <H3>What It Shows</H3>
        <UL items={[
          'Current session title and speaker name (large, readable from a distance)',
          'Elapsed and remaining time with large countdown numbers',
          'Status badge (LIVE, OVERRUN, HOLD)',
          'Next session preview so the speaker knows what follows',
          'Broadcast messages when sent by the director',
        ]} />

        <H3>How to Use</H3>
        <OL items={[
          'Click the "Stage Monitor" button in the top bar or sidebar',
          'The display opens in fullscreen mode',
          'Place the browser on a monitor facing the stage',
          'Press Escape to exit fullscreen',
        ]} />

        <Callout type="tip">The stage monitor uses a high-contrast dark theme with large typography. It is designed to be readable from 10+ meters away.</Callout>
      </>
    ),
  },

  // ── 12. Stage Timer ───────────────────────────────────────────────────────────
  {
    id: 'stage-timer',
    title: 'Stage Timer',
    icon: '⏱️',
    content: (
      <>
        <P>The Stage Timer is a dedicated fullscreen countdown designed for speakers. Place it on any screen facing the stage and speakers always know exactly how much time they have left — no hand signals required.</P>

        <H3>How It Works</H3>
        <OL items={[
          'Register a display and set its mode to "Stage Timer"',
          'Open the display on a screen or monitor facing the stage',
          'The timer automatically syncs with the current LIVE session and counts down',
        ]} />

        <H3>Colour-coded Urgency</H3>
        <P>The countdown shifts colour as time runs low, giving speakers an unmistakable visual cue:</P>
        <UL items={[
          'Green — plenty of time remaining',
          'Amber — approaching the end of the session',
          'Red — final minutes, time to wrap up',
          'Flashing red + overage counter — the session has overrun (e.g. +2:15)',
        ]} />

        <H3>Special States</H3>
        <UL items={[
          'HOLD — the countdown freezes and shows HOLD in purple, used during breaks or pauses',
          'Standby — when no session is live, the timer shows a standby screen with the next scheduled session',
          'Progress bar — a visual bar at the bottom shows how far through the session the speaker is',
        ]} />

        <Callout type="tip">The Stage Timer uses high-contrast colours and massive typography. It is readable from the back of a large stage — even in bright lighting conditions.</Callout>
      </>
    ),
  },

  // ── 13. AI Agents ───────────────────────────────────────────────────────────
  {
    id: 'ai-agents',
    title: 'AI Agents',
    icon: '🤖',
    content: (
      <>
        <P>CueDeck includes three AI-powered agent modules that assist directors during and after events. Agents are powered by Anthropic&apos;s Claude and are available on Trial, Pro, and Enterprise plans. No setup or configuration required — AI works automatically when you&apos;re logged in.</P>
        <MockAIAgents />

        <H3>1. Incident Advisor</H3>
        <P>When a technical warning fires (audio loss, video signal drop, mic failure), the Incident Advisor opens automatically. It analyses the current state of your event and provides:</P>
        <UL items={[
          'AI-generated technical diagnosis of what is likely happening and why',
          'Numbered resolution steps ranked by urgency — click each to check off',
          'Estimated resolution time so you know how much buffer you have',
          'Escalate or mark resolved in one click, with the outcome logged to the event log',
        ]} />
        <Callout type="tip">The Incident Advisor fires automatically when system warnings are detected. You can also trigger a test at any time from the AI Agents panel in the sidebar.</Callout>

        <H3>2. Cue Engine</H3>
        <P>The Cue Engine monitors your session schedule and fires automatic pre-cue alerts 8 minutes before each session is due to start. It helps your team prepare by:</P>
        <UL items={[
          'Showing a countdown modal with the upcoming session details (speaker, room, type)',
          'Generating a role-appropriate pre-cue checklist for AV, stage, and interpretation',
          'Highlighting any special technical requirements or notes on the session',
          'Auto-dismissing when the session transitions to READY or LIVE',
        ]} />

        <H3>3. Report Generator</H3>
        <P>After your event ends, click &ldquo;Generate Report&rdquo; in the AI Agents panel. Claude analyses everything that happened — session timing, delays, and any incidents — and produces a comprehensive four-tab report:</P>
        <UL items={[
          'Executive Summary — AI-written narrative overview of how the event ran',
          'Session Variance — Planned vs. actual timing for every session with variance flags',
          'Incidents Log — All issues flagged and how they were resolved',
          'Recommendations — Specific, actionable suggestions for your next event',
        ]} />
        <Callout type="note">AI agents run entirely server-side. Your Anthropic API credentials are never stored in the browser or exposed to your operators — AI just works as part of your CueDeck plan.</Callout>
      </>
    ),
  },

  // ── 13. Operator Management ─────────────────────────────────────────────────
  {
    id: 'operators',
    title: 'Operator Management',
    icon: '👤',
    content: (
      <>
        <P>Directors manage their team from the Operators panel in the sidebar. This is where you invite crew, assign roles, and monitor who is connected.</P>

        <H3>Inviting Operators</H3>
        <OL items={[
          'Go to Operators in the sidebar',
          'Click "+ Invite Operator"',
          'Enter their email address',
          'Select a role (Stage, AV, Interpreter, Registration, or Signage)',
          'They receive an email with a signup link and invite code',
        ]} />

        <H3>Role Assignment</H3>
        <P>Each invited operator is assigned a role that determines their view and permissions. You can change roles at any time from the Operators panel.</P>

        <H3>Approval Flow</H3>
        <P>New operators who sign up with an invite code start in a <B>pending</B> state. The director must approve them before they gain access to the console. This prevents unauthorised access.</P>

        <H3>Removing Operators</H3>
        <P>Directors can remove operators from their team at any time. Removed operators lose access to the console immediately.</P>

        <Callout type="important">Each CueDeck plan has an operator limit. Pay-per-event and Starter support up to 5 operators. Pro supports up to 20.</Callout>
      </>
    ),
  },

  // ── 14. Billing & Plans ─────────────────────────────────────────────────────
  {
    id: 'billing',
    title: 'Billing & Plans',
    icon: '💳',
    content: (
      <>
        <P>CueDeck offers flexible pricing to match your production needs. All plans include a 3-day free trial with no credit card required.</P>

        <H3>Plans</H3>
        <Table
          headers={['Plan', 'Price', 'Events', 'Operators', 'Key Features']}
          rows={[
            ['Pay-per-event', '€39 / event', '1 event', 'Up to 5', 'All 6 roles, real-time sync, basic signage (2 displays)'],
            ['Starter', '€59 / month', '1 active', 'Up to 5', 'All roles, 5 signage displays, post-event reports'],
            ['Pro', '€99 / month', 'Unlimited', 'Up to 20', 'All features, unlimited signage, AI agents, delay cascade, priority support'],
            ['Enterprise', 'Custom', 'Unlimited', 'Unlimited', 'Custom integrations, SLA, dedicated support'],
          ]}
        />

        <H3>Free Trial</H3>
        <P>New directors automatically start on a 3-day free trial of the Pro plan. When the trial expires, you can choose any plan to continue. Your data is preserved regardless of which plan you choose.</P>

        <H3>Upgrading</H3>
        <P>Go to the Billing panel in the sidebar and click &quot;Upgrade&quot;. You will be redirected to a secure Stripe Checkout page. Payments are processed by Stripe — CueDeck never stores your card details.</P>

        <H3>Annual Billing</H3>
        <P>Save 20% by choosing annual billing on Starter and Pro plans. Switch between monthly and annual from the Stripe customer portal.</P>

        <Callout type="note">Operators inherit their director&apos;s plan. Only directors manage billing — operators never see billing screens.</Callout>
      </>
    ),
  },

  // ── 15. Keyboard Shortcuts ──────────────────────────────────────────────────
  {
    id: 'keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    icon: '⌨️',
    content: (
      <>
        <P>CueDeck supports keyboard shortcuts for fast operation during live events. Shortcuts are available in all roles.</P>
        <MockKeyboard />

        <Table
          headers={['Shortcut', 'Action']}
          rows={[
            ['B', 'Focus broadcast bar'],
            ['F', 'Focus search / filter'],
            ['Escape', 'Clear filters / close modals'],
            ['1-9', 'Select session by number'],
            ['R', 'Set selected session to READY'],
            ['C', 'Call speaker for selected session'],
            ['G', 'Go live on selected session'],
            ['H', 'Hold selected session'],
            ['E', 'End selected session'],
            ['N', 'Open notes for selected session'],
            ['T', 'Toggle between List and Timeline view'],
            ['?', 'Show keyboard shortcuts help'],
          ]}
        />

        <Callout type="tip">Shortcuts are disabled when a text input is focused. Press Escape first to unfocus, then use shortcuts.</Callout>
      </>
    ),
  },

  // ── 16. Clock Sync ──────────────────────────────────────────────────────────
  {
    id: 'clock-sync',
    title: 'Clock Sync',
    icon: '🕐',
    content: (
      <>
        <P>Accurate timing is critical in live events. CueDeck uses a round-trip-time (RTT) synchronisation algorithm to ensure all connected devices show the same clock — regardless of network latency or device clock drift.</P>

        <H3>How It Works</H3>
        <OL items={[
          'On connection, CueDeck takes 3 time samples between the client and the Supabase server',
          'Each sample measures the round-trip time and calculates the one-way offset',
          'The median offset is stored and applied to all time displays',
          'All functions use correctedNow() instead of raw Date.now() for consistent timing',
        ]} />

        <H3>Reconnection</H3>
        <P>If the connection drops and recovers, CueDeck automatically re-syncs the clock. The console shows connection status indicators (database + realtime) in the top bar.</P>

        <Callout type="note">Clock accuracy is typically within ±50ms. This is more than sufficient for live event operations where actions are measured in seconds.</Callout>
      </>
    ),
  },

  // ── 17. Event Log & Export ──────────────────────────────────────────────────
  {
    id: 'event-log',
    title: 'Event Log & Export',
    icon: '📋',
    content: (
      <>
        <P>CueDeck logs every significant action during your event — session transitions, broadcasts, delays, and operator actions. This log is invaluable for post-event review.</P>

        <H3>Viewing the Log</H3>
        <P>Go to <B>Event Log</B> in the sidebar. Entries are displayed in reverse chronological order with timestamps, actor (who triggered it), and the action description.</P>

        <H3>Log Entry Types</H3>
        <UL items={[
          'Session state transitions (e.g. "Session 3 → LIVE by director@company.com")',
          'Broadcast messages sent',
          'Delay cascade applications',
          'Operator connections and disconnections',
          'Signage override pushes',
        ]} />

        <H3>CSV Export</H3>
        <P>Click the <B>Export CSV</B> button to download the full event log. The CSV includes columns for timestamp, action type, session ID, actor, and description. Use this for client reporting or internal review.</P>

        <Callout type="tip">The post-event CSV report also includes a variance analysis showing planned vs. actual start/end times for every session.</Callout>
      </>
    ),
  },

  // ── 18. CSV Import ──────────────────────────────────────────────────────────
  {
    id: 'csv-import',
    title: 'CSV Import',
    icon: '📥',
    content: (
      <>
        <P>You can bulk-import sessions from a CSV file instead of creating them manually. This is especially useful for events with 20+ sessions.</P>

        <H3>CSV Format</H3>
        <P>Your CSV file must include the following columns (headers in the first row):</P>
        <Table
          headers={['Column', 'Required', 'Description', 'Example']}
          rows={[
            ['title', 'Yes', 'Session title', 'Opening Ceremony'],
            ['speaker', 'No', 'Speaker name', 'Dr. Sarah Chen'],
            ['room', 'Yes', 'Room or venue name', 'Main Stage'],
            ['start_time', 'Yes', 'ISO 8601 or HH:MM format', '09:00 or 2026-03-15T09:00'],
            ['duration', 'Yes', 'Duration in minutes', '45'],
            ['notes', 'No', 'Session notes', 'Requires 2 wireless mics'],
          ]}
        />

        <H3>Importing</H3>
        <OL items={[
          'Go to the Sessions view',
          'Click "Import CSV" in the toolbar',
          'Select your CSV file',
          'Review the preview — CueDeck shows a summary of what will be created',
          'Confirm to import all sessions at once',
        ]} />

        <H3>Validation</H3>
        <P>CueDeck validates your CSV before importing. It checks for:</P>
        <UL items={[
          'Required columns present',
          'Valid time formats',
          'Positive duration values',
          'No duplicate session titles in the same room and time',
        ]} />

        <Callout type="important">CSV import creates new sessions — it does not update existing ones. If you need to modify sessions after import, edit them individually in the console.</Callout>
      </>
    ),
  },

];

// ─── Page Component ─────────────────────────────────────────────────────────────
export default function DocsPage() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        a { transition: opacity 0.15s; }
        a:hover { opacity: 0.82; }
        .docs-page-wrap { overflow-x: hidden; width: 100%; }
        .docs-hero { padding-top: 120px; }
        @media (max-width: 1023px) {
          .docs-hero { padding-top: 180px !important; }
        }
      `}</style>

      <Nav />

      <div className="docs-page-wrap">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="docs-hero" style={{
        paddingBottom: 48,
        background: 'linear-gradient(135deg, #f0f7ff 0%, #fafafa 40%, #fff7ed 100%)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 99, marginBottom: 20,
            background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
            fontSize: 12, fontWeight: 600, color: '#3b82f6', letterSpacing: '0.04em',
          }}>
            USER GUIDE
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-1.2px',
            color: '#111827',
            marginBottom: 16,
          }}>
            CueDeck Documentation
          </h1>

          <p style={{
            fontSize: 18,
            color: '#6b7280',
            lineHeight: 1.65,
            maxWidth: 560,
            margin: '0 auto',
          }}>
            Everything you need to run live events with CueDeck — from first login to post-event reports.
          </p>
        </div>
      </section>

      {/* ── Docs content (client component) ───────────────────── */}
      <section style={{ padding: '48px 0 0', background: '#fff' }}>
        <DocsClient sections={SECTIONS} />
      </section>

      {/* ── CTA Strip ────────────────────────────────────────────── */}
      <section style={{
        padding: '64px 40px',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.07,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800, color: '#fff',
            letterSpacing: '-0.8px', marginBottom: 14, lineHeight: 1.2,
          }}>
            Ready to try CueDeck?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.6 }}>
            Start your free 3-day trial. No credit card required.
          </p>
          <a href={TRIAL_URL} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 12,
            fontWeight: 700, fontSize: 15, textDecoration: 'none',
            background: '#fff', color: '#1d4ed8',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}>
            Start free trial →
          </a>
        </div>
      </section>
      </div>{/* end docs-page-wrap */}

      <Footer />
    </>
  );
}
