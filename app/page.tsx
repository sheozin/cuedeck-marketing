import Link from "next/link";

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

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #e5e7eb",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: "64px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
          Cue<span style={{ color: "#3b82f6" }}>Deck</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <a href="#features" style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>Features</a>
        <a href="#how"      style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>How it works</a>
        <a href="#pricing"  style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>Pricing</a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a href={APP_URL} style={{ fontSize: 14, color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>
          Sign in
        </a>
        <a href={TRIAL_URL} style={{
          fontSize: 14, fontWeight: 600, padding: "9px 20px", borderRadius: "8px",
          background: "#3b82f6", color: "#fff", textDecoration: "none",
          boxShadow: "0 1px 3px rgba(59,130,246,0.4)",
        }}>
          Start free trial
        </a>
      </div>
    </nav>
  );
}

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
          <span style={{ fontWeight: 700, color: "#fff", fontSize: 13 }}>LEOD</span>
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
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
        maxWidth: 1200, margin: "0 auto", padding: "0 40px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
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
            CueDeck keeps your entire production team in sync — directors, stage managers,
            AV, interpreters, registration, and signage — all from one real-time dashboard.
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
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
    price: "$39",
    period: "per event",
    desc: "Perfect for freelancers and one-off productions.",
    highlight: false,
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
    price: "$49",
    period: "/ month",
    desc: "For small teams running regular events.",
    highlight: false,
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
    price: "$99",
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
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
                color: p.highlight ? "#fff" : "#fff",
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

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "40px 40px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", color: "#111827" }}>
          Cue<span style={{ color: "#3b82f6" }}>Deck</span>
        </span>
        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "Features", href: "#features" },
            { label: "Pricing",  href: "#pricing" },
            { label: "Sign in",  href: APP_URL },
            { label: "Contact",  href: "mailto:hello@cuedeck.io" },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ fontSize: 13, color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>{link.label}</a>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 CueDeck. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Global styles ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: -apple-system, 'Inter', BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; background: #fff; }
    a { transition: opacity 0.15s; }
    a:hover { opacity: 0.82; }
    @media (max-width: 900px) {
      nav { padding: 0 20px !important; }
      nav > div:nth-child(2) { display: none !important; }
      section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
      section > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
