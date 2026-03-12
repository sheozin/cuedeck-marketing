import { Metadata } from 'next'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Tutorials — CueDeck',
  description: 'Learn CueDeck with our complete 21-episode tutorial series — from setting up your first event to running AI-assisted live productions.',
}

const CATEGORIES = [
  { id: 'start',    label: 'Getting Started',      emoji: '🚀', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'prod',     label: 'Production Features',   emoji: '⚡', color: '#f59e0b', bg: '#fffbeb' },
  { id: 'ai',       label: 'AI Agents',             emoji: '🤖', color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'signage',  label: 'Displays & Signage',    emoji: '📺', color: '#10b981', bg: '#ecfdf5' },
  { id: 'advanced', label: 'Advanced & Operations', emoji: '🎯', color: '#ef4444', bg: '#fef2f2' },
]

const EPISODES: {
  num: string
  shortTitle: string
  duration: string
  desc: string
  category: string
  youtubeUrl: string | null
  accentColor: string
}[] = [
  { num: '01', shortTitle: 'Welcome & Overview', duration: '4–5 min', category: 'start', youtubeUrl: null, accentColor: '#3b82f6',
    desc: 'A full overview of what CueDeck does and a walkthrough of the six roles — director, stage, AV, interpretation, registration, and signage.' },
  { num: '02', shortTitle: 'Your First Event', duration: '6–7 min', category: 'start', youtubeUrl: null, accentColor: '#3b82f6',
    desc: 'Create an event from scratch — event details, sessions, rooms, speakers, and running order. Ends with a full programme ready to go live.' },
  { num: '03', shortTitle: 'Running Live', duration: '5–6 min', category: 'start', youtubeUrl: null, accentColor: '#3b82f6',
    desc: 'The core of CueDeck: the full session lifecycle — PLANNED, READY, CALLING, LIVE, HOLD, OVERRUN, ENDED — with the delay nudge cascade.' },
  { num: '04', shortTitle: 'Roles & Team', duration: '5 min', category: 'start', youtubeUrl: null, accentColor: '#3b82f6',
    desc: 'Explore all 6 roles and exactly what each can see and do. Walk through the team invite flow to get your whole crew connected before show day.' },
  { num: '05', shortTitle: 'Broadcast Bar', duration: '4 min', category: 'start', youtubeUrl: null, accentColor: '#3b82f6',
    desc: 'No more group chats during a live event. Send a message to every connected device instantly. One-click presets for your most common announcements.' },
  { num: '06', shortTitle: 'Delay Cascade', duration: '6–7 min', category: 'prod', youtubeUrl: null, accentColor: '#f59e0b',
    desc: 'When a session runs long, CueDeck automatically shifts every subsequent session. See anchor sessions, cascade visualiser, and instant reset.' },
  { num: '07', shortTitle: 'Signage Setup', duration: '6–7 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'Turn any browser tab into a live venue display. Lobby monitors, stage-side screens, backstage tablets — all updating in realtime from your console.' },
  { num: '08', shortTitle: 'All 11 Display Modes', duration: '8–10 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'A complete walkthrough of every display mode: schedule, agenda, timeline, programme grid, next-up, sponsors, stage timer, and more.' },
  { num: '09', shortTitle: 'Stage Monitor', duration: '5–6 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'A fullscreen overlay showing the current LIVE session in giant text. Colour-coded by urgency — green, amber, red, OVERRUN, HOLD.' },
  { num: '10', shortTitle: 'Stage Timer', duration: '5–6 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'A fullscreen speaker countdown — standby, green, amber, red, overrun flash, and hold freeze. Set up once, runs for the whole event.' },
  { num: '11', shortTitle: 'AI Incident Advisor', duration: '5–6 min', category: 'ai', youtubeUrl: null, accentColor: '#8b5cf6',
    desc: 'When something goes wrong on stage, the AI Incident Advisor gives you a prioritised action plan in seconds. Demo with a real incident scenario.' },
  { num: '12', shortTitle: 'AI Cue Engine', duration: '5 min', category: 'ai', youtubeUrl: null, accentColor: '#8b5cf6',
    desc: 'The Cue Engine fires 8 minutes before every session with an AI-generated readiness checklist — mic, slides, speaker, AV. Never miss a pre-cue.' },
  { num: '13', shortTitle: 'AI Report Generator', duration: '6 min', category: 'ai', youtubeUrl: null, accentColor: '#8b5cf6',
    desc: 'After the event, generate a full debrief: session variance, incident log, executive summary, and AI narrative — ready to send to your client.' },
  { num: '14', shortTitle: 'Timeline & Programme', duration: '5–6 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'Timeline mode shows sessions as a chronological list. Programme mode shows a time × room grid — perfect for a lobby overview screen.' },
  { num: '15', shortTitle: 'Sponsor Signage', duration: '4–5 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'Upload sponsor logos to CueDeck, add them to the rotating sponsor display, and show branded content on your venue screens between sessions.' },
  { num: '16', shortTitle: 'Event Log', duration: '5 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'Every state change, broadcast, and delay is logged automatically. Use the event log during the event and export a full audit trail after.' },
  { num: '17', shortTitle: 'Keyboard Shortcuts', duration: '3–4 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'Speed up your workflow with keyboard shortcuts and the Cmd+K command palette — quick reference, help docs, and instant navigation.' },
  { num: '18', shortTitle: 'Mobile & Tablet', duration: '4–5 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'CueDeck is fully responsive. Run it on any device — laptop, tablet, phone. See how the layout adapts for each role on smaller screens.' },
  { num: '19', shortTitle: 'Billing & Plans', duration: '4 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'Walk through the three pricing plans — Pay-per-Event, Starter, and Pro — and manage your subscription from inside the console.' },
  { num: '20', shortTitle: 'Multi-Room Events', duration: '6–7 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'Running a conference with 4+ parallel tracks? Structure sessions by room, filter views per role, and keep delays room-isolated.' },
  { num: '21', shortTitle: 'Full Walkthrough', duration: '18–22 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'The complete CueDeck experience in one session — create event, invite team, run 10 sessions live, use AI agents, manage signage, export report.' },
]

function ThumbnailPlaceholder({ num, accentColor, youtubeUrl }: {
  num: string; accentColor: string; youtubeUrl: string | null
}) {
  return (
    <div style={{
      position: 'relative', width: '100%', paddingBottom: '56.25%',
      background: '#0f172a', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Episode badge */}
      <div style={{
        position: 'absolute', top: 10, left: 12,
        background: accentColor, color: '#fff',
        fontSize: 10, fontWeight: 800, padding: '3px 8px',
        borderRadius: 4, letterSpacing: '0.05em', zIndex: 1,
      }}>
        #{num}
      </div>
      {/* Coming soon */}
      {!youtubeUrl && (
        <div style={{
          position: 'absolute', top: 10, right: 12,
          background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)',
          fontSize: 9, fontWeight: 600, padding: '3px 7px',
          borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 1,
        }}>
          Coming soon
        </div>
      )}
      {/* Play button */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 44, height: 44, borderRadius: '50%',
        background: youtubeUrl ? accentColor : 'rgba(255,255,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1,
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M5 3.5L13 8L5 12.5V3.5Z" fill={youtubeUrl ? '#fff' : 'rgba(255,255,255,0.4)'} />
        </svg>
      </div>
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      {/* CueDeck wordmark */}
      <div style={{
        position: 'absolute', bottom: 8, left: 12,
        fontSize: 10, fontWeight: 800, letterSpacing: '-0.3px',
        color: 'rgba(255,255,255,0.2)', zIndex: 1,
      }}>
        Cue<span style={{ color: accentColor, opacity: 0.4 }}>Deck</span>
      </div>
    </div>
  )
}

function EpisodeCard({ ep }: { ep: typeof EPISODES[0] }) {
  const cardBody = (
    <div className="tutorial-card-inner">
      <ThumbnailPlaceholder num={ep.num} accentColor={ep.accentColor} youtubeUrl={ep.youtubeUrl} />
      <div style={{ padding: '14px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: ep.accentColor,
            background: `${ep.accentColor}15`, padding: '2px 7px', borderRadius: 4,
          }}>
            Ep {ep.num}
          </span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>{ep.duration}</span>
        </div>
        <h3 style={{
          fontSize: 13.5, fontWeight: 700, color: '#111827',
          lineHeight: 1.35, marginBottom: 8, letterSpacing: '-0.2px', flex: 1,
        }}>
          {ep.shortTitle}
        </h3>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.55, margin: 0 }}>
          {ep.desc}
        </p>
        <div style={{ marginTop: 12 }}>
          {ep.youtubeUrl ? (
            <span style={{ fontSize: 12.5, fontWeight: 600, color: ep.accentColor }}>
              Watch now →
            </span>
          ) : (
            <span style={{ fontSize: 11.5, color: '#9ca3af' }}>Coming soon</span>
          )}
        </div>
      </div>
    </div>
  )

  if (ep.youtubeUrl) {
    return (
      <a href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer" className="tutorial-card">
        {cardBody}
      </a>
    )
  }
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{cardBody}</div>
}

export default function TutorialsPage() {
  const episodesByCategory = CATEGORIES.map(cat => ({
    ...cat,
    episodes: EPISODES.filter(ep => ep.category === cat.id),
  }))

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, minHeight: '80vh', background: '#fff' }}>

        {/* ── Hero ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1e40af 100%)',
          padding: '80px 40px 72px', textAlign: 'center',
        }}>
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
            color: '#93c5fd', textTransform: 'uppercase', marginBottom: 16,
          }}>
            TUTORIAL SERIES
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 800, color: '#fff',
            letterSpacing: '-1.5px', marginBottom: 18, lineHeight: 1.1,
          }}>
            Learn CueDeck
          </h1>
          <p style={{
            fontSize: 18, color: '#93c5fd', maxWidth: 560, margin: '0 auto 44px', lineHeight: 1.6,
          }}>
            The complete guide to running live events with CueDeck — from first setup to
            AI-assisted production. 21 episodes covering every feature.
          </p>

          {/* Stats */}
          <div className="tutorials-hero-stats" style={{
            display: 'flex', gap: 40, justifyContent: 'center',
            alignItems: 'center', flexWrap: 'wrap',
          }}>
            {[
              { value: '21',      label: 'Episodes' },
              { value: '~5 hrs',  label: 'Total runtime' },
              { value: '5',       label: 'Categories' },
              { value: 'Free',    label: 'Always free' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 500, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Coming soon notice */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 36,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            padding: '10px 22px', borderRadius: 50,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#fbbf24', boxShadow: '0 0 8px #fbbf24',
            }} />
            <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>
              Series launching soon — subscribe on YouTube to be notified
            </span>
          </div>
        </div>

        {/* ── Episode categories ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 80px' }}>

          {episodesByCategory.map(cat => (
            <section key={cat.id} style={{ marginBottom: 68 }}>
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                marginBottom: 24, paddingBottom: 16,
                borderBottom: `2px solid ${cat.color}20`,
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: cat.bg, border: `1px solid ${cat.color}25`,
                  padding: '6px 14px', borderRadius: 20,
                }}>
                  <span style={{ fontSize: 15 }}>{cat.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: cat.color, letterSpacing: '-0.2px' }}>
                    {cat.label}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
                  {cat.episodes.length} episode{cat.episodes.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Grid */}
              <div className="tutorials-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 18,
                alignItems: 'start',
              }}>
                {cat.episodes.map(ep => <EpisodeCard key={ep.num} ep={ep} />)}
              </div>
            </section>
          ))}

          {/* ── Bottom CTA ── */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
            border: '1px solid #dbeafe', borderRadius: 16,
            padding: '48px 40px', textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800,
              color: '#111827', letterSpacing: '-0.5px', marginBottom: 12,
            }}>
              Ready to follow along?
            </h2>
            <p style={{
              fontSize: 16, color: '#6b7280', marginBottom: 28,
              maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.6,
            }}>
              Start your free trial and open the console while you watch — the best way to learn CueDeck is hands-on.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://app.cuedeck.io/#signup" style={{
                fontSize: 15, fontWeight: 700, padding: '12px 28px', borderRadius: 10,
                background: '#3b82f6', color: '#fff', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
              }}>
                Start free trial
              </a>
              <a href="https://www.youtube.com/@cuedeck" target="_blank" rel="noopener noreferrer" style={{
                fontSize: 15, fontWeight: 600, padding: '12px 28px', borderRadius: 10,
                background: '#fff', color: '#374151', textDecoration: 'none',
                border: '1.5px solid #e5e7eb',
              }}>
                Subscribe on YouTube →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
