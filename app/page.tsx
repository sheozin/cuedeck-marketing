import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import EmailCapture from "../components/EmailCapture";
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../keystatic.config'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const APP_URL = "https://app.cuedeck.io";
const TRIAL_URL = `${APP_URL}/#signup`;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconBrain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconBarChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  const sessions = [
    { n: 1, title: "Opening Ceremony",       room: "Main Stage", status: "ENDED",   color: "#6b7280" },
    { n: 2, title: "Panel: Future of AI",    room: "Main Stage", status: "ENDED",   color: "#6b7280" },
    { n: 3, title: "Keynote: The Next Wave", room: "Main Stage", status: "LIVE",    color: "#22c55e" },
    { n: 4, title: "Coffee Break",           room: "Foyer",      status: "READY",   color: "#3b82f6" },
    { n: 5, title: "Workshop: Data & Design",room: "Room 101",   status: "PLANNED", color: "#9ca3af" },
  ];
  return (
    <div style={{
      width: "100%", maxWidth: 540, borderRadius: 14, overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.1)",
      border: "1px solid rgba(255,255,255,0.1)",
    }}>
      {/* Titlebar */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "#0d1220", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444", opacity: 0.7, display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#eab308", opacity: 0.7, display: "inline-block" }} />
        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", opacity: 0.7, display: "inline-block" }} />
        <span style={{ marginLeft: 10, fontSize: 11, color: "#475569" }}>app.cuedeck.io</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, fontSize: 11, color: "#475569" }}>
          <span>● db ✓</span><span>● realtime ✓</span>
        </div>
      </div>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#0f1623", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 800, letterSpacing: "-0.3px", fontSize: 13 }}>
            <span style={{ color: "#fff" }}>Cue</span><span style={{ color: "#3b82f6" }}>Deck</span>
          </span>
          <span style={{ fontSize: 11, color: "#64748b" }}>AVE Annual Summit</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["DIRECTOR","STAGE","AV","SIGNAGE"].map(r => (
            <span key={r} style={{
              fontSize: 10, padding: "2px 7px", borderRadius: 4,
              background: r === "DIRECTOR" ? "#1e3a5f" : "transparent",
              color: r === "DIRECTOR" ? "#60a5fa" : "#475569",
              border: r === "DIRECTOR" ? "1px solid rgba(59,130,246,0.4)" : "none",
            }}>{r}</span>
          ))}
        </div>
        <span style={{ fontFamily: "monospace", color: "#fff", fontWeight: 700, fontSize: 13 }}>14:32:07</span>
      </div>
      {/* Sessions */}
      <div style={{ padding: "10px 10px 0", background: "#111827", display: "flex", flexDirection: "column", gap: 6 }}>
        {sessions.map(s => (
          <div key={s.n} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 8,
            background: s.status === "LIVE" ? "rgba(34,197,94,0.07)" : "rgba(255,255,255,0.025)",
            border: `1px solid ${s.status === "LIVE" ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.06)"}`,
          }}>
            <span style={{ fontSize: 11, color: "#475569", width: 14, textAlign: "right" }}>{s.n}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: s.status === "LIVE" ? "#f1f5f9" : "#94a3b8" }}>{s.title}</span>
              <span style={{ fontSize: 10, color: "#475569", marginLeft: 6 }}>{s.room}</span>
            </div>
            <span style={{
              fontSize: 10, padding: "2px 8px", borderRadius: 99, fontWeight: 600,
              background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44`,
            }}>{s.status}</span>
            {s.status === "LIVE" && (
              <div style={{ display: "flex", gap: 5 }}>
                <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, background: "#7c3aed22", color: "#a78bfa", border: "1px solid #7c3aed44" }}>HOLD</span>
                <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, background: "#dc262622", color: "#f87171", border: "1px solid #dc262644" }}>END</span>
              </div>
            )}
            {s.status === "READY" && (
              <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, background: "#22c55e22", color: "#4ade80", border: "1px solid #22c55e44" }}>GO LIVE</span>
            )}
          </div>
        ))}
      </div>
      {/* Fade */}
      <div style={{ height: 36, background: "linear-gradient(to bottom, transparent, #111827)", marginTop: -4 }} />
    </div>
  );
}

// ─── Timeline Mockup ──────────────────────────────────────────────────────────
function TimelineMockup() {
  const rooms = [
    { name: "Main Stage", color: "#3b82f6", sessions: [
      { title: "Opening Ceremony",  start: 9,   end: 10.25, status: "ENDED" },
      { title: "Keynote: Future AI", start: 10.5, end: 11.5, status: "ENDED" },
      { title: "Closing & Network", start: 13,  end: 14.5, status: "ENDED" },
    ]},
    { name: "Room B", color: "#8b5cf6", sessions: [
      { title: "Workshop: AI Tools", start: 11, end: 12.5, status: "ENDED" },
    ]},
    { name: "Foyer", color: "#f59e0b", sessions: [
      { title: "Coffee Break", start: 10,  end: 10.5, status: "ENDED" },
      { title: "Lunch Break",  start: 12.5, end: 13.5, status: "ENDED" },
    ]},
  ];
  const startHr = 9, endHr = 15;
  const totalHrs = endHr - startHr;
  const nowHr = 14.68; // 14:41 in decimal
  const toPercent = (hr: number) => ((hr - startHr) / totalHrs) * 100;
  const hours = [9,10,11,12,13,14,15];

  return (
    <div style={{
      width: "100%", maxWidth: 560, borderRadius: 14, overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.1)",
    }}>
      {/* Titlebar */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "#0d1220", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", opacity: 0.7, display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308", opacity: 0.7, display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", opacity: 0.7, display: "inline-block" }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: "#475569" }}>Timeline View</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#60a5fa", fontWeight: 600 }}>AVE Test Event</span>
      </div>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: "#0f1623", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["DIRECTOR","STAGE","AV"].map(r => (
            <span key={r} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: r==="DIRECTOR"?"#1e3a5f":"transparent", color: r==="DIRECTOR"?"#60a5fa":"#475569", border: r==="DIRECTOR"?"1px solid rgba(59,130,246,0.4)":"none" }}>{r}</span>
          ))}
        </div>
        <span style={{ fontFamily: "monospace", color: "#fff", fontWeight: 700, fontSize: 12 }}>14:41:22</span>
      </div>
      {/* Timeline grid */}
      <div style={{ background: "#111827", padding: "12px 0 16px" }}>
        {/* Hour axis */}
        <div style={{ display: "flex", paddingLeft: 64, paddingRight: 12, marginBottom: 8, position: "relative" }}>
          {hours.map(h => (
            <div key={h} style={{ flex: 1, fontSize: 9, color: "#475569", textAlign: "left" }}>{h}:00</div>
          ))}
        </div>
        {/* Rooms */}
        {rooms.map(room => (
          <div key={room.name} style={{ display: "flex", alignItems: "center", marginBottom: 6, padding: "0 12px 0 0" }}>
            <div style={{ width: 64, flexShrink: 0, fontSize: 9, color: "#64748b", textAlign: "right", paddingRight: 10, overflow: "hidden", whiteSpace: "nowrap" as const }}>
              {room.name}
            </div>
            <div style={{ flex: 1, height: 24, position: "relative", background: "rgba(255,255,255,0.02)", borderRadius: 3 }}>
              {room.sessions.map(s => (
                <div key={s.title} style={{
                  position: "absolute",
                  left: `${toPercent(s.start)}%`,
                  width: `${toPercent(s.end) - toPercent(s.start)}%`,
                  top: 2, bottom: 2,
                  background: `${room.color}33`,
                  border: `1px solid ${room.color}88`,
                  borderRadius: 3,
                  display: "flex", alignItems: "center",
                  padding: "0 4px", overflow: "hidden",
                }}>
                  <span style={{ fontSize: 8, color: room.color, fontWeight: 600, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>
                    {s.title}
                  </span>
                </div>
              ))}
              {/* NOW marker */}
              <div style={{
                position: "absolute",
                left: `${toPercent(nowHr)}%`,
                top: -4, bottom: -4, width: 1,
                background: "#f97316",
                opacity: 0.8,
              }} />
            </div>
          </div>
        ))}
        {/* NOW label */}
        <div style={{ paddingLeft: 64, position: "relative" }}>
          <span style={{
            position: "absolute",
            left: `calc(64px + ${toPercent(nowHr)}% * (100% - 76px) / 100%)`,
            fontSize: 8, color: "#f97316", fontWeight: 700, transform: "translateX(-50%)",
          }}>NOW</span>
        </div>
      </div>
    </div>
  );
}

// ─── Signage Mockup ───────────────────────────────────────────────────────────
function SignageMockup() {
  return (
    <div style={{
      width: "100%", maxWidth: 560, borderRadius: 14, overflow: "hidden",
      boxShadow: "0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.1)",
    }}>
      {/* Titlebar */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "#0d1220", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", opacity: 0.7, display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308", opacity: 0.7, display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", opacity: 0.7, display: "inline-block" }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: "#475569" }}>Signage Control</span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#22c55e" }}>1 display online</span>
      </div>
      <div style={{ background: "#111827", padding: "14px 14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Global override section */}
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 8 }}>Global Display Override</p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
            {["☕ Break Screen","⚡ 5-Min Recall","🖼 Sponsors","📊 Agenda Grid","📶 WiFi Info","🗓 Schedule"].map(btn => (
              <button key={btn} style={{
                fontSize: 9, padding: "4px 8px", borderRadius: 4, cursor: "pointer",
                background: "rgba(59,130,246,0.1)", color: "#60a5fa",
                border: "1px solid rgba(59,130,246,0.25)",
              }}>{btn}</button>
            ))}
          </div>
        </div>
        {/* Registered displays */}
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 8 }}>Registered Displays (1)</p>
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8, padding: "10px 12px",
            display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9" }}>Lobby</span>
                <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 3, background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }}>lobby</span>
              </div>
              <div style={{ display: "flex", gap: 8, fontSize: 9, color: "#64748b", marginBottom: 4 }}>
                <span>sponsors</span><span>·</span><span>portrait</span><span>·</span><span>⟳ 2 slides</span>
              </div>
              <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 3, background: "rgba(234,179,8,0.12)", color: "#fbbf24", border: "1px solid rgba(234,179,8,0.3)" }}>⚡ override: sponsors</span>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              {["▶ Launch","QR","Edit"].map(a => (
                <button key={a} style={{ fontSize: 9, padding: "3px 7px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", cursor: "pointer" }}>{a}</button>
              ))}
            </div>
          </div>
        </div>
        {/* Sponsor library */}
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 8 }}>Sponsor Library (2)</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["AVE Egypt","AVE Events"].map(name => (
              <div key={name} style={{
                width: 80, height: 48, borderRadius: 6,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 9, color: "#64748b", textAlign: "center" as const }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ heroHeadline, heroSubheadline }: { heroHeadline: string; heroSubheadline: string }) {
  return (
    <section style={{
      paddingTop: 120,
      paddingBottom: 80,
      background: "linear-gradient(135deg, #f0f7ff 0%, #fafafa 40%, #fff7ed 100%)",
      minHeight: "92vh",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={{
        maxWidth: 1200, width: "100%", margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 60, alignItems: "center",
        overflow: "hidden",
      }}>
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 99, marginBottom: 24,
            background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
            fontSize: 12, fontWeight: 600, color: "#3b82f6", letterSpacing: "0.04em",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
            Real-time · Multi-role · AI-powered
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-1.5px",
            color: "#111827", marginBottom: 20,
          }}>
            The command center<br />
            <span style={{ color: "#3b82f6" }}>for live events.</span>
          </h1>

          <p style={{
            fontSize: 18, color: "#4b5563", lineHeight: 1.7,
            marginBottom: 36, maxWidth: 440,
          }}>
            {heroSubheadline}
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32, flexWrap: "wrap" }}>
            <a href={TRIAL_URL} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15,
              background: "#3b82f6", color: "#fff", textDecoration: "none",
              boxShadow: "0 4px 14px rgba(59,130,246,0.4)",
              transition: "transform 0.15s",
            }}>
              Try for free →
            </a>
            <a href="#how" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15,
              background: "#fff", color: "#374151", textDecoration: "none",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}>
              See how it works
            </a>
          </div>

          <p style={{ fontSize: 13, color: "#9ca3af" }}>No credit card required · 3-day free trial on all plans</p>
        </div>

        {/* Right */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────
function SocialProof() {
  return (
    <section style={{
      padding: "48px 40px",
      background: "#fff",
      borderTop: "1px solid #f3f4f6",
      borderBottom: "1px solid #f3f4f6",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#9ca3af", marginBottom: 28, textTransform: "uppercase" }}>
          Trusted by event production teams worldwide
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px 40px" }}>
          {["AVE Events", "StageFirst", "LiveCo", "EventPro", "ShowDrive", "ProdCraft"].map(name => (
            <span key={name} style={{ fontSize: 16, fontWeight: 700, color: "#d1d5db", letterSpacing: "-0.3px" }}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    Icon: IconUsers,
    title: "Multi-role Operations",
    desc: "Director, Stage, AV, Interp, Reg, and Signage — each role sees exactly what they need, with role-adaptive filters and keyboard shortcuts.",
  },
  {
    Icon: IconZap,
    title: "Real-time Sync",
    desc: "Session changes, broadcasts, and clock updates propagate instantly to every operator via live subscriptions. Zero polling.",
  },
  {
    Icon: IconBrain,
    title: "AI Incident Advisor",
    desc: "When something breaks, get instant AI-generated diagnosis and numbered resolution steps — no scrambling, no guesswork.",
  },
  {
    Icon: IconMonitor,
    title: "Digital Signage",
    desc: "Drive lobby displays, wayfinding screens, and sponsor carousels directly from the console. Auto-rotate sequences, video support.",
  },
  {
    Icon: IconClock,
    title: "Delay Cascade",
    desc: "Apply a delay to one session and it cascades downstream automatically. Every operator sees the new schedule instantly.",
  },
  {
    Icon: IconBarChart,
    title: "Post-event Reports",
    desc: "AI-generated executive summary, session-by-session variance analysis, and incidents log — ready to share in one click.",
  },
];

function Features() {
  return (
    <section id="features" style={{ padding: "96px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 12 }}>
            FEATURES
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.8px", marginBottom: 16 }}>
            Everything your team needs
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            Built by event producers, for event producers. Every feature solves a real problem from the floor.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 24 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              padding: "28px 28px 32px",
              borderRadius: 12,
              background: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, marginBottom: 18,
                background: "rgba(59,130,246,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#3b82f6",
              }}>
                <f.Icon />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it Works ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: "01",
    title: "Create your event",
    desc: "Add your sessions, rooms, and team members. Assign roles — each person sees only what's relevant to them. Import from a spreadsheet or build from scratch in minutes.",
  },
  {
    n: "02",
    title: "Go live on the day",
    desc: "Open the console, hit Ready → Call Speaker → Go Live. Every status change propagates instantly across all devices. No refresh needed.",
  },
  {
    n: "03",
    title: "Stay in control",
    desc: "Apply delay cascades, send broadcasts to all operators, manage signage displays, and get AI-powered help if anything goes sideways.",
  },
];

function HowItWorks() {
  return (
    <section id="how" style={{ padding: "96px 40px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 12 }}>
            HOW IT WORKS
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.8px", marginBottom: 16 }}>
            Up and running in minutes
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.6 }}>No setup complexity. No training required.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{
              display: "grid", gridTemplateColumns: "80px 1fr",
              gap: 28, alignItems: "flex-start",
              padding: "36px 0",
              borderBottom: i < STEPS.length - 1 ? "1px solid #e5e7eb" : "none",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "#fff", border: "2px solid #e5e7eb",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 800, color: "#3b82f6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                flexShrink: 0,
              }}>
                {s.n}
              </div>
              <div style={{ paddingTop: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Pay-per-event",
    price: "€39",
    period: "per event",
    desc: "Perfect for freelancers and one-off productions.",
    highlight: false,
    badge: undefined as string | undefined,
    features: [
      "1 event",
      "Up to 5 operators",
      "All 6 roles included",
      "Real-time sync",
      "Basic signage (2 displays)",
    ],
    cta: "Buy single event",
  },
  {
    name: "Starter",
    price: "€59",
    period: "/ month",
    desc: "For small teams running regular events.",
    highlight: false,
    badge: undefined as string | undefined,
    features: [
      "1 active event at a time",
      "Up to 5 operators",
      "All 6 roles included",
      "Real-time sync",
      "5 signage displays",
      "Post-event reports",
    ],
    cta: "Start free trial",
  },
  {
    name: "Pro",
    price: "€99",
    period: "/ month",
    desc: "Full power for production companies.",
    highlight: true,
    badge: "Most popular",
    features: [
      "Unlimited active events",
      "Up to 20 operators",
      "All 6 roles included",
      "Real-time sync",
      "Unlimited signage displays",
      "AI Incident Advisor",
      "AI post-event reports",
      "Delay cascade",
      "Priority support",
    ],
    cta: "Start free trial",
  },
];

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "96px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 12 }}>
            PRICING
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.8px", marginBottom: 16 }}>
            Simple, honest pricing
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.6 }}>
            3-day free trial on Starter and Pro. No credit card required.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 24, alignItems: "stretch" }}>
          {PLANS.map(p => (
            <div key={p.name} style={{
              borderRadius: 16,
              padding: "32px 28px",
              display: "flex", flexDirection: "column",
              background: p.highlight ? "#1e40af" : "#fff",
              border: p.highlight ? "none" : "1px solid #e5e7eb",
              boxShadow: p.highlight ? "0 20px 40px rgba(30,64,175,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
              position: "relative",
            }}>
              {p.badge && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "#3b82f6", color: "#fff",
                  fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 99,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  boxShadow: "0 2px 8px rgba(59,130,246,0.4)",
                }}>
                  {p.badge}
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: p.highlight ? "rgba(255,255,255,0.7)" : "#9ca3af" }}>{p.name}</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1px", color: p.highlight ? "#fff" : "#111827", lineHeight: 1 }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: p.highlight ? "rgba(255,255,255,0.6)" : "#9ca3af", paddingBottom: 6 }}>{p.period}</span>
                </div>
                <p style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.65)" : "#6b7280" }}>{p.desc}</p>
              </div>

              <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.85)" : "#374151" }}>
                    <span style={{ color: p.highlight ? "#93c5fd" : "#22c55e", flexShrink: 0 }}><IconCheck /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href={TRIAL_URL} style={{
                display: "block", textAlign: "center",
                padding: "12px 20px", borderRadius: 10,
                fontWeight: 700, fontSize: 14, textDecoration: "none",
                background: p.highlight ? "rgba(255,255,255,0.15)" : "#3b82f6",
                color: "#fff",
                border: p.highlight ? "1px solid rgba(255,255,255,0.25)" : "none",
                boxShadow: p.highlight ? "none" : "0 2px 8px rgba(59,130,246,0.3)",
              }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 32, fontSize: 14, color: "#9ca3af" }}>
          Need more? <a href="mailto:hello@cuedeck.io" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>Contact us</a> for Enterprise pricing.
        </p>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{
      padding: "96px 40px",
      background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.07,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }} />
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800,
          color: "#fff", letterSpacing: "-1px", marginBottom: 16, lineHeight: 1.15,
        }}>
          Ready to run your event like a pro?
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", marginBottom: 40, lineHeight: 1.6 }}>
          Start your free 3-day trial today. No credit card required.
        </p>
        <a href={TRIAL_URL} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "15px 36px", borderRadius: 12,
          fontWeight: 700, fontSize: 16, textDecoration: "none",
          background: "#fff", color: "#1d4ed8",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>
          Start free trial →
        </a>
      </div>
    </section>
  );
}

// ─── Global styles ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; overflow-x: hidden; }
    body { font-family: -apple-system, 'Inter', BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; background: #fff; overflow-x: hidden; }
    a { transition: opacity 0.15s; }
    a:hover { opacity: 0.82; }
    @media (max-width: 1023px) {
      nav { padding: 0 20px !important; }
    }
    @media (max-width: 640px) {
      section { padding-left: 16px !important; padding-right: 16px !important; }
      section > div { max-width: 100% !important; overflow: hidden !important; }
      h1 { font-size: clamp(28px, 7vw, 36px) !important; }
    }
  `}</style>
);

// ─── Role Showcase ────────────────────────────────────────────────────────────
function RoleShowcase() {
  return (
    <section style={{ padding: "96px 40px", background: "#f9fafb", borderTop: "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" as const, marginBottom: 12 }}>PRODUCT TOUR</p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.8px", marginBottom: 16 }}>
            Every view your team needs
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            Directors see the full picture. Stage managers see their cues. Signage operators control every display. One console, six roles.
          </p>
        </div>

        {/* Three feature rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>

          {/* Row 1: Director view (existing DashboardMockup) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", fontSize: 11, fontWeight: 600, color: "#3b82f6", marginBottom: 16 }}>DIRECTOR VIEW</div>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.6px", marginBottom: 14, lineHeight: 1.2 }}>
                Complete session control at a glance
              </h3>
              <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, marginBottom: 20 }}>
                See every session, every status, and every operator in one screen. Trigger transitions, send broadcasts, apply delay cascades, and monitor your AI agents — all without leaving the console.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["8-state session machine (PLANNED → LIVE → ENDED)", "One-click delay cascade across all downstream sessions", "Broadcast bar with quick presets for common messages"].map(f => (
                  <li key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#4b5563" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <DashboardMockup />
            </div>
          </div>

          {/* Row 2: Timeline (reversed) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 64, alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <TimelineMockup />
            </div>
            <div>
              <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", fontSize: 11, fontWeight: 600, color: "#8b5cf6", marginBottom: 16 }}>TIMELINE VIEW</div>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.6px", marginBottom: 14, lineHeight: 1.2 }}>
                Your full programme on one horizontal canvas
              </h3>
              <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, marginBottom: 20 }}>
                Switch to Timeline view and see every session across every room plotted on a shared time axis. The NOW marker moves in real time. Spot conflicts, overruns, and gaps instantly.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Room-by-room horizontal layout with live NOW cursor", "Colour-coded by room for instant spatial orientation", "Toggle between List and Timeline with one click"].map(f => (
                  <li key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#4b5563" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 3: Signage */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 11, fontWeight: 600, color: "#d97706", marginBottom: 16 }}>SIGNAGE CONTROL</div>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.6px", marginBottom: 14, lineHeight: 1.2 }}>
                Drive every display from the console
              </h3>
              <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, marginBottom: 20 }}>
                Register lobby screens, wayfinding displays, and sponsor panels. Set per-display content sequences or push a global override to all screens instantly — no extra software needed.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Auto-rotating sequences: sponsors → agenda → schedule", "Video support (MP4/WebM) in sponsor carousel", "One-click global overrides for break screens or recall"].map(f => (
                  <li key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#4b5563" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <SignageMockup />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const homeFaqs = [
  { q: "What is CueDeck?", a: "CueDeck is a real-time production console for live events. It gives every operator — directors, stage managers, AV techs, interpreters, registration, and signage — a role-based dashboard that updates in under 100 milliseconds." },
  { q: "How does real-time sync work?", a: "CueDeck uses live database subscriptions via Supabase Realtime. When a director changes a session status, every connected operator sees the update instantly — no polling, no refreshing." },
  { q: "What roles does CueDeck support?", a: "Six roles: Director (full control), Stage (session transitions), AV (hold capability), Interpreter (read-only language view), Registration (read-only desk view), and Signage (display management)." },
  { q: "Do I need to install any software?", a: "No. CueDeck runs entirely in the browser. Open it on any device — laptop, tablet, or phone. Signage displays work the same way: just open the display URL in a browser on your screen." },
  { q: "Can I use CueDeck for multi-room events?", a: "Yes. Sessions are assigned to rooms, and operators can filter by room. Signage displays can be configured to show content for specific rooms. The director sees everything across all rooms." },
  { q: "How does digital signage work?", a: "Register displays from the console, choose a content mode (schedule, wayfinding, sponsors, break screen, and more), and launch the display URL on any browser. Displays update in real time and support global overrides." },
];

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQ() {
  return (
    <section style={{ padding: "80px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", fontSize: 11, fontWeight: 600, color: "#3b82f6", marginBottom: 16 }}>FAQ</div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
            Frequently asked questions
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {homeFaqs.map((f, i) => (
            <details key={i} style={{ borderBottom: "1px solid #e5e7eb", padding: "20px 0" }}>
              <summary style={{ fontSize: 16, fontWeight: 600, color: "#111827", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q}
                <span style={{ fontSize: 20, color: "#9ca3af", flexShrink: 0, marginLeft: 16 }}>+</span>
              </summary>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.75, marginTop: 12 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── From the Blog ────────────────────────────────────────────────────────────
function LatestPosts({ posts }: { posts: { slug: string; title: string; excerpt: string; date: string }[] }) {
  if (!posts.length) return null;
  return (
    <section style={{ padding: "80px 40px", background: "#fafafa" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", fontSize: 11, fontWeight: 600, color: "#059669", marginBottom: 16 }}>FROM THE BLOG</div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
            Insights for event production teams
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 12, transition: "border-color 0.15s, box-shadow 0.15s" }}>
              <time style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, flex: 1 }}>{p.excerpt}</p>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6" }}>Read more &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const homepage = await reader.singletons.homepage.read()
  const heroHeadline = homepage?.heroHeadline ?? 'The Command Center for Live Events'
  const heroSubheadline = homepage?.heroSubheadline ?? 'Real-time session management, digital signage, and AI-assisted operations for professional event teams.'

  // Fetch latest 3 blog posts for "From the Blog" section
  const postsDir = join(process.cwd(), 'content', 'posts')
  const latestPosts = existsSync(postsDir)
    ? readdirSync(postsDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => {
          const mdxPath = join(postsDir, d.name, 'index.mdx')
          if (!existsSync(mdxPath)) return null
          const raw = readFileSync(mdxPath, 'utf-8')
          const fm: Record<string, string> = {}
          const match = raw.match(/^---\n([\s\S]*?)\n---/)
          if (match) {
            match[1].split('\n').forEach(line => {
              const [key, ...rest] = line.split(': ')
              if (key) fm[key.trim()] = rest.join(': ').trim()
            })
          }
          return fm.date ? { slug: d.name, title: fm.title || d.name, excerpt: fm.excerpt || '', date: fm.date } : null
        })
        .filter((p): p is { slug: string; title: string; excerpt: string; date: string } => p !== null)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 3)
    : []

  return (
    <>
      <GlobalStyle />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <main>
        <Hero heroHeadline={heroHeadline} heroSubheadline={heroSubheadline} />
        <SocialProof />
        <RoleShowcase />
        <Features />
        <HowItWorks />
        <Pricing />
        <LatestPosts posts={latestPosts} />
        <FAQ />
        <EmailCapture />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
