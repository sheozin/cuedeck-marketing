import type { Metadata } from 'next';
import { pageMeta } from "../../lib/pageMeta";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import DocsClient, { type DocSection } from '../../components/DocsClient';

const APP_URL = 'https://app.cuedeck.io';
const TRIAL_URL = `${APP_URL}/#signup`;

// ─── SEO ────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = pageMeta("/docs", "Docs and User Guide", "Complete guide to CueDeck: session management, roles, digital signage, AI agents, delay cascade, and more. Everything you need to run live events like a pro.");

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
          <div style={{ fontSize: 8, fontWeight: 700, color: '#60a5fa', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={{ width: 10, height: 10, flexShrink: 0 }}><defs><linearGradient id="doc-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1d4ed8"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient></defs><rect width="40" height="40" rx="12" fill="url(#doc-bg)"/><path d="M 25 10 A 10.5 10.5 0 1 0 25 30" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/></svg>
            <span><span style={{ color: '#fff' }}>Cue</span><span style={{ color: '#60a5fa' }}>Deck</span></span>
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

/** Line icons for sections without an emoji (marketing copy uses SVG icons) */
function CheckinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v7h-7" />
    </svg>
  );
}
function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <path d="M2 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM13 5v2M13 17v2M13 11v2" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <path d="M3 5h18v14H3zM3 7l9 6 9-6" />
    </svg>
  );
}
function GuideIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
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

  // ── 19. Event Check-in ──────────────────────────────────────────────────────
  {
    id: 'event-check-in',
    title: 'Event Check-in',
    icon: <CheckinIcon />,
    content: (
      <>
        <P>Event Check-in runs the registration desk for one event: your guest list, an online registration page, QR code emails, the check-in desk, a self-registration kiosk, door scanner phones, a live dashboard and a post-event report. It is priced per event and works with or without a CueDeck plan. Open it from <a href={`${APP_URL}/checkin`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>app.cuedeck.io/checkin</a>.</P>

        <H3>Setup</H3>
        <P>Each event has a sidebar: <B>Overview</B>, <B>Guests</B>, <B>Registration</B>, <B>Tickets</B>, <B>Branding</B>, <B>Badges</B>, <B>Emails</B>, <B>Team</B>, <B>Devices</B>, <B>Reports</B>, <B>Settings</B> and <B>Go live</B>. Overview lists what is still to do. Settings holds the name, date, start and end times, venue and timezone, which are shown on the desk, the kiosk and in guest emails.</P>

        <H3>Importing guests</H3>
        <P>Drop a CSV on the Attendees step. Before anything is saved, CueDeck shows who will be added, updated or skipped. Each file can hold up to 5,000 rows, and you can import more than once. You can also add people one at a time with <B>Add person</B>.</P>
        <Table
          headers={['Column', 'Notes']}
          rows={[
            ['first name', 'Guest first name'],
            ['last name', 'Guest last name'],
            ['email', 'Where the QR code is sent'],
            ['company', 'Guests with the same company check in together'],
            ['ticket type', 'For example Delegate, Speaker, VIP; used for arrival alerts and reports'],
          ]}
        />
        <P><B>Export CSV</B> on the same step downloads the guest list with arrival status at any time.</P>

        <H3>Registration page</H3>
        <P>Guests can add themselves to your guest list from a link. On the <B>Registration page</B> step, turn it on to get your link (app.cuedeck.io/r/ followed by a code) and share it in your invitation, on your website or on a poster.</P>
        <UL items={[
          <><B>What guests enter.</B> First name, last name, email, an optional company, and up to five questions of your own: a text answer or a choice from a list, required or optional. They tick a consent box before they can send it.</>,
          <><B>Confirming the email.</B> For a live event, the guest gets an email asking them to confirm their registration. They join your guest list only when they confirm, and their QR code then arrives by email. Nothing is registered for an address whose owner never confirms, and unconfirmed requests are deleted after 48 hours.</>,
          <><B>Capacity and closing time.</B> Set the most guests you can take and when registration closes. Capacity counts everyone on the guest list, however they were added. Registration also closes when check-in closes.</>,
          <><B>A leaked link.</B> Replace the link at any time; the old one stops working at once. Turning the page off keeps the same link for when you turn it back on.</>,
          <><B>Where registrations appear.</B> Guests who registered online are on the Attendees list like everyone else, shown as Registration page on the dashboard. <B>Export CSV</B> includes how each guest was added and their answers to your questions.</>,
        ]} />
        <P>In test mode the page works so you can try it: registrations are recorded straight away without any email, up to 25, and are cleared when you go live. The page is protected by a CAPTCHA, and it is included in the per-event price.</P>

        <H3>Test mode and going live</H3>
        <P>Every event starts in test mode. Everything works, but check-ins are capped at 25 and are cleared when you go live, so you can rehearse the desk with your team. An event can only be deleted while it is in test mode.</P>
        <P>Going live is a one-off payment for that event, at the per-event price shown in setup (excl. VAT; tax is calculated at checkout from your billing address, and you can add a VAT ID). The invoice arrives by email. Live events accept check-ins from a week before the event date until the end of the second day after it.</P>

        <H3>QR code emails</H3>
        <P>Each guest gets an email with a personal QR code. Emails to guests are sent only once the event is live; in test mode, <B>Send a test to myself</B> shows you exactly what guests will receive. With <B>Email QR codes on import</B> turned on, guests imported after go-live get their code straight away.</P>

        <H3>Desk staff and roles</H3>
        <P>Invite people by email on the Desk staff step. They only ever see this event.</P>
        <Table
          headers={['Role', 'What they can do']}
          rows={[
            ['Organizer', 'Edits the event, imports guests, sends QR emails and invites people'],
            ['Desk lead', 'Runs the desk on the day: kiosks, walk-ins, undoing any check-in, and inviting desk staff'],
            ['Crew', 'Searches, checks people in, prints badges and undoes their own check-ins'],
            ['Viewer', 'Sees the live numbers on the dashboard, never names'],
          ]}
        />

        <H3>The check-in desk</H3>
        <UL items={[
          <><B>Scan or search.</B> Point a USB scanner at the QR code, or type two or more letters of a name, company or email.</>,
          <><B>Whole companies at once.</B> When a guest arrives, everyone from the same company is listed. Tick who is standing at the desk and check them in together.</>,
          <><B>Badges.</B> Badges print through Chrome to any printer the computer can use, on the badge stock you choose under <B>Badges</B> (see below).</>,
          <><B>Walk-ins.</B> Add a walk-in at the desk, or let them register themselves at the kiosk.</>,
          <><B>Undo.</B> A check-in made by mistake can be undone. The correction is kept in the log; nothing is erased.</>,
          <><B>Offline.</B> If the Wi-Fi drops, the desk keeps checking people in and syncs when the connection is back. The header shows when everything is synced.</>,
        ]} />
        <Callout type="tip">For one-click badge printing without a dialog, start Chrome with kiosk printing enabled and set the printer and badge size once in the system print settings. Test a few badges on your real printer before the doors open.</Callout>

        <H3>Self-registration kiosk</H3>
        <P>Turn on <B>Self-registration kiosk</B> in setup, then pair a tablet: on the desk, open <B>Kiosk or scanner</B> and create a pairing code, then open app.cuedeck.io/kiosk on the tablet and type the code. You only do this once per tablet. Walk-ins type their details and are checked in; with <B>Kiosk prints badges</B> on, their badge prints straight away. A desk lead can revoke a kiosk from the same window at any time.</P>

        <H3>Door scanner phones</H3>
        <P>Any phone can check people in at a door, without a desk. Add your doors under <B>Door scanning</B> in setup, then on the desk open <B>Kiosk or scanner</B>, choose the door the phone will scan at and create a pairing code. Open app.cuedeck.io/checkin/scan on the phone and type the code. The phone confirms each scan with a sound and a clear result:</P>
        <UL items={[
          <><B>Checked in:</B> two rising notes and a green tick.</>,
          <><B>Already checked in:</B> one note. Let them through if it is the same person.</>,
          <><B>Refused</B> (for example a code from another event): two low buzzes.</>,
        ]} />
        <P>A code is read once and not again until it has been out of view for a moment, so a guest holding their phone still is not scanned twice. The phone keeps only the list of codes, never names, so a lost phone gives nothing away.</P>

        <H3>Live dashboard</H3>
        <P>The dashboard shows registered, checked in and still expected guests, arrivals per 15 minutes, turnout by ticket type, each desk with its sync status, and a company board that shows which companies are here, partly here or not here yet. <B>Client view</B> is a numbers-only version you can share on a screen.</P>
        <P><B>Arrival alerts:</B> choose ticket types in setup, such as VIP or Speaker. When one of those guests checks in, the alert appears on the dashboard and on desk leads&apos; screens.</P>

        <H3>Post-event report</H3>
        <P>About two hours after check-in closes, the event owner receives the report by email: turnout by ticket type, the busiest fifteen minutes, check-ins per desk, check-ins that were made offline and synced later, and companies with people missing.</P>
      </>
    ),
  },

  // ── 20. Check-in: registration, invitations and tickets ────────────────────
  {
    id: 'check-in-registration',
    title: 'Check-in: Registration, Invitations and Tickets',
    icon: <TicketIcon />,
    content: (
      <>
        <P>Everything under <B>Registration</B> and <B>Tickets</B> decides who can get onto your guest list and how.</P>

        <H3>Page language</H3>
        <P>The registration page, its emails and the guest&apos;s ticket are available in English, Polski, Deutsch and Arabic. <B>Automatic</B> shows each guest the page in their browser&apos;s language when it is one of these, or you can fix one language. What you write yourself (event name, description, questions, ticket names) is shown as you wrote it. Guests who register get their later emails in the language they used on the page.</P>

        <H3>Who can register</H3>
        <UL items={[
          <><B>Anyone with the link.</B> The default.</>,
          <><B>Invited guests only.</B> The public link takes no registrations. You invite guests from your guest list and each one gets a personal link to say whether they are coming. With approval on as well, the public link takes requests for an invitation instead.</>,
        ]} />

        <H3>Invitations</H3>
        <P>With <B>Invited guests only</B> on and the event live, the Guests page shows an <B>Invitations</B> bar: how many were invited, coming, not coming and not answered yet. <B>Send invitations</B> emails every imported guest with an email address who has not been invited yet, and <B>Send me a test</B> shows you the email first.</P>
        <UL items={[
          <><B>Answering.</B> The guest opens their link and says whether they are coming. They can come back to the same link and change their answer, and their plus-ones if you allow them.</>,
          <><B>Invite again.</B> Sends a fresh link to one guest. Each address can get one invitation every 10 minutes and at most five a day for an event.</>,
          <><B>Cancel link.</B> If an invitation was forwarded, this stops every link that guest was sent from working. Use Invite again to send a new one.</>,
        ]} />

        <H3>Waitlist and approval</H3>
        <UL items={[
          <><B>Waitlist when full.</B> Once you reach capacity, guests can join a waitlist instead. Offer places from the list and their ticket is emailed.</>,
          <><B>Move people up automatically.</B> When a place opens up (someone removed, a ticket refunded, capacity raised), the next people on the waitlist get it in order and their ticket is emailed. This is checked every 5 minutes. A group moves up only when all of it fits, and nobody jumps the queue.</>,
          <><B>Approve each registration.</B> Registrations wait for you, and guests get their ticket only once you approve them.</>,
        ]} />

        <H3>Plus-ones</H3>
        <P>Allow each guest to bring up to five people. Every plus-one gets their own QR ticket, sent to the guest who brought them, and takes a place within your capacity. Paid tickets have no plus-ones: everyone buys their own.</P>

        <H3>Tickets</H3>
        <P>Ticket types let guests choose what they register for. Without any, registration is free and nobody chooses. Each type has a name, an optional description, a price and currency, and optionally how many are available. A price of 0.00 makes a free ticket.</P>
        <UL items={[
          <><B>Getting paid.</B> To sell paid tickets, click <B>Connect Stripe</B> under Tickets and connect your own Stripe account. Payments go straight to that account. Free tickets work without Stripe.</>,
          <><B>What the guest sees.</B> The guest pays on Stripe&apos;s checkout page and gets their QR ticket by email once the payment has gone through.</>,
          <><B>Orders.</B> Tickets lists every order as Paid, Paying now or Refunded, with your revenue.</>,
          <><B>Refunds.</B> Click <B>Refund</B> on an order, then click again to confirm. The money goes back through Stripe. A guest who has not checked in yet is taken off the guest list and their QR code stops working; a guest who already checked in stays on it.</>,
        ]} />
        <Callout type="note">Stripe&apos;s card fees are charged on your Stripe account, and disputes are handled there too.</Callout>

        <H3>Put the form on your own website</H3>
        <P>Under Registration, open <B>Put the form on your own website</B> and copy the code into your page. The form fits itself to your page. Confirming an email and paying still open on CueDeck&apos;s own page.</P>

        <H3>Speakers from your run of show</H3>
        <P>If the event also runs in the CueDeck console, turn on <B>Tell the production console when a speaker arrives</B> on the Guests page. When a guest whose name matches a speaker checks in, their session shows the speaker as arrived. Only guests you listed or the desk added in person count, never names typed on the registration page or a kiosk. A panel counts once everyone on it is in.</P>
      </>
    ),
  },

  // ── 21. Check-in: branding, badges, emails, reports and integrations ───────
  {
    id: 'check-in-emails-integrations',
    title: 'Check-in: Branding, Emails and Integrations',
    icon: <MailIcon />,
    content: (
      <>
        <H3>Branding</H3>
        <P>One brand per event: <B>Hosted by</B>, a brand colour, the venue address (used for a Maps link), a description of the event, a wide cover image (at least 1600 px across) and a logo (square works best). Anything you leave empty is simply not shown. The brand appears on the registration page and in guest emails, and the colour on console displays. With <B>Show the programme</B> on, guests also see your sessions and times from the run of show, including any delays, for events you run in CueDeck.</P>
        <P><B>White label</B> removes CueDeck from what guests see: the registration page no longer says Registration by CueDeck, and guest emails have no CueDeck footer. The privacy link and the consent text stay, because they tell guests who handles their data.</P>

        <H3>Badges</H3>
        <P>The preview under <B>Badges</B> is the real badge at its printed size.</P>
        <Table
          headers={['Setting', 'Choices']}
          rows={[
            ['Badge stock', '100 × 70 mm (default), 4 × 3 in, 90 × 55 mm, A6, 4 × 6 in portrait, or your own size from 50 to 200 mm wide and 40 to 200 mm high'],
            ['Name', 'Full name, or first name large'],
            ['Layout', 'Centred or left'],
            ['Shown on the badge', 'Colour band, logo, company, ticket type, QR code (each on or off)'],
            ['Colours by ticket type', 'A band colour per ticket type, so staff spot VIPs and speakers across the room'],
          ]}
        />
        <P><B>Print a test badge</B> prints one on the printer attached to that computer.</P>

        <H3>Automatic emails</H3>
        <P>Turn these on under <B>Emails</B>. They go out once the event is live; test mode never emails guests. <B>Send me the reminder</B> and <B>Send me the thank-you</B> send you a copy first.</P>
        <UL items={[
          <><B>Reminder the day before.</B> Goes out from 24 hours before doors open, with each guest&apos;s QR code, the time and the venue. Guests who already checked in are skipped. Add an optional note, such as parking or which entrance to use.</>,
          <><B>Thank-you after the event.</B> Goes out 2 hours after the event ends, only to guests who checked in. Add an optional note and a link, such as a survey or the slides.</>,
        ]} />

        <H3>Registration reports</H3>
        <P>Under <B>Reports</B>, the registration page shows visitors, registrations and what share of visitors registered, guests checked in and QR emails sent, with a chart of the last 30 days. Visitors are counted once a day each, without cookies. Cards for invitations, ticket sales, the waitlist, plus-ones and automatic emails appear when they apply to the event.</P>
        <P>To see where guests come from, add <B>?ref=</B> and a word of your choice to your registration link, for example <B>?ref=newsletter</B> in your newsletter and <B>?ref=linkedin</B> in a post. The Sources table shows visitors and registrations for each one, and the guest export includes each guest&apos;s source.</P>

        <H3>Integrations (webhooks)</H3>
        <P>Under <B>Settings</B>, <B>Integrations</B> sends guests, check-ins and ticket sales to your own tools as they happen: Zapier, Make, your CRM or your own server. Add an https address and choose what it receives:</P>
        <Table
          headers={['Choice', 'Sent when']}
          rows={[
            ['New guest', 'A guest is added to the list'],
            ['Check-in', 'A guest checks in'],
            ['Ticket paid', 'A paid ticket order goes through'],
            ['Invitation answered', 'An invited guest says whether they are coming'],
          ]}
        />
        <UL items={[
          <><B>Only live events send.</B> Nothing is sent while the event is in test mode.</>,
          <><B>Signing secret.</B> Shown once when you add the webhook, so copy it then. Each call carries an <B>X-CueDeck-Signature</B> header, t=time,v1=signature, where the signature is HMAC-SHA256 of the time, a dot and the body, using your secret, in hex. Check it, and refuse calls older than five minutes.</>,
          <><B>Retries.</B> An answer other than 2xx within 10 seconds counts as failed, and the call is retried after 1, 5, 30, 120 and 360 minutes. Last delivery in the list shows how the latest call went.</>,
          <><B>Who it belongs to.</B> A webhook keeps sending only while the person who added it can still edit the event. The address must use the standard https port and may not point at a private network.</>,
        ]} />
      </>
    ),
  },

  // ── 22. Guide: check-in for your first event ────────────────────────────────
  {
    id: 'check-in-first-event',
    title: 'Guide: Run Check-in for Your First Event',
    icon: <GuideIcon />,
    content: (
      <>
        <P>A step-by-step walkthrough from an empty event to an open door. Allow about thirty minutes, plus time to rehearse with your team.</P>
        <H3>A week or more before</H3>
        <OL items={[
          <><B>Create the event.</B> In <a href={`${APP_URL}/checkin`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>Check-in</a>, create an event and fill in the name, date, venue and timezone.</>,
          <><B>Prepare your CSV.</B> One row per guest with the columns first name, last name, email, company and ticket type. Use the same spelling for each company so its people are grouped together.</>,
          <><B>Import it.</B> Drop the file on the Guests page, check the added, updated and skipped counts, then confirm.</>,
          <><B>Or let guests register.</B> Turn on the registration page under Registration and share the link in your invitation. Each guest confirms their email before joining the list.</>,
          <><B>Choose arrival alerts.</B> Pick the ticket types you want to hear about, such as VIP.</>,
          <><B>Invite your team.</B> Add a desk lead and crew under Team.</>,
          <><B>Check the QR email.</B> Use Send a test to myself and open it on your phone.</>,
        ]} />
        <H3>Rehearse in test mode</H3>
        <OL items={[
          'Open the desk on the laptop you will use on the day and check in a few colleagues by search and by QR code.',
          'Print a badge on the real printer and check it fits your 100 × 70 mm badge stock.',
          'Pair a phone as a door scanner and a tablet as a kiosk, and try both.',
          'Undo a check-in, and switch the Wi-Fi off for a minute to see the desk carry on and sync.',
        ]} />
        <Callout type="note">Test check-ins are capped at 25 and are cleared when you go live, so rehearsal never shows up in your real numbers.</Callout>
        <H3>Go live</H3>
        <OL items={[
          'On the Go live step, pay for the event. The price is shown there before you pay.',
          'Send the QR emails to every guest from the QR emails step.',
          'Turn on Email QR codes on import if more guests will be added later.',
        ]} />
        <H3>On the day</H3>
        <OL items={[
          'Open the desk on each laptop, pair the kiosk and the door phones again if they were reset.',
          'Keep the dashboard open on a separate screen to watch arrivals, desks and missing companies.',
          'Afterwards, the report arrives by email once check-in closes, and Export CSV gives you the full list.',
        ]} />
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

      <Footer cta={false} />
    </>
  );
}
