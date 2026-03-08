import Link from "next/link";

const APP_URL = "https://app.cuedeck.io";
const TRIAL_URL = `${APP_URL}/#signup`;

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
         style={{ background: "rgba(13,18,32,.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(59,130,246,.12)" }}>
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
          Cue<span style={{ color: "#3b82f6" }}>Deck</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#94a3b8" }}>
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#how"      className="hover:text-white transition-colors">How it works</a>
        <a href="#pricing"  className="hover:text-white transition-colors">Pricing</a>
      </div>
      <div className="flex items-center gap-3">
        <a href={APP_URL} className="hidden md:block text-sm hover:text-white transition-colors"
           style={{ color: "#94a3b8" }}>
          Sign in
        </a>
        <a href={TRIAL_URL}
           className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:brightness-110"
           style={{ background: "#3b82f6", color: "#fff" }}>
          Start free trial
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center pt-36 pb-24 px-6 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(ellipse, rgba(59,130,246,.18) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
           style={{ background: "rgba(59,130,246,.12)", border: "1px solid rgba(59,130,246,.3)", color: "#60a5fa" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        Real-time · Multi-role · AI-powered
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 max-w-3xl"
          style={{ color: "#f1f5f9" }}>
        The command center<br />
        <span style={{ color: "#3b82f6" }}>for live events</span>
      </h1>

      <p className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed" style={{ color: "#94a3b8" }}>
        CueDeck keeps your entire production team in sync — directors, stage managers, AV, interpreters,
        registration, and signage — all from one real-time dashboard.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-16">
        <a href={TRIAL_URL}
           className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-all hover:brightness-110 hover:scale-105"
           style={{ background: "#3b82f6", color: "#fff" }}>
          Start free 3-day trial
          <span>→</span>
        </a>
        <a href="#how"
           className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-base transition-colors"
           style={{ border: "1px solid rgba(255,255,255,.12)", color: "#cbd5e1" }}>
          See how it works
        </a>
      </div>

      {/* Dashboard mockup */}
      <DashboardMockup />
    </section>
  );
}

function DashboardMockup() {
  const sessions = [
    { n: 1, title: "Opening Ceremony",        room: "Main Stage",  status: "ENDED",   color: "#475569" },
    { n: 2, title: "Panel: Future of AI",     room: "Main Stage",  status: "ENDED",   color: "#475569" },
    { n: 3, title: "Keynote: The Next Wave",  room: "Main Stage",  status: "LIVE",    color: "#22c55e" },
    { n: 4, title: "Coffee Break",            room: "Foyer",       status: "READY",   color: "#3b82f6" },
    { n: 5, title: "Workshop: Data & Design", room: "Room 101",    status: "PLANNED", color: "#64748b" },
  ];
  return (
    <div className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl"
         style={{ border: "1px solid rgba(59,130,246,.25)", background: "#111827" }}>
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-4 py-3"
           style={{ background: "#0d1220", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-4 text-xs" style={{ color: "#475569" }}>app.cuedeck.io</span>
        <div className="ml-auto flex items-center gap-4 text-xs" style={{ color: "#475569" }}>
          <span>● database ✓</span><span>● realtime ✓</span><span>● edge functions ✓</span>
        </div>
      </div>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3"
           style={{ background: "#0f1623", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-sm">LEOD</span>
          <span className="text-xs" style={{ color: "#64748b" }}>AVE Annual Summit · Europe/Warsaw</span>
        </div>
        <div className="flex items-center gap-2">
          {["DIRECTOR","STAGE","AV","INTERP","REG","SIGNAGE"].map(r => (
            <span key={r} className="text-xs px-2 py-0.5 rounded"
                  style={{ background: r==="DIRECTOR" ? "#1e3a5f" : "transparent",
                            color: r==="DIRECTOR" ? "#60a5fa" : "#475569",
                            border: r==="DIRECTOR" ? "1px solid rgba(59,130,246,.4)" : "none" }}>
              {r}
            </span>
          ))}
        </div>
        <span className="font-mono text-white font-bold text-sm">14:32:07</span>
      </div>
      {/* Sessions */}
      <div className="p-3 flex flex-col gap-2">
        {sessions.map(s => (
          <div key={s.n} className="flex items-center gap-3 px-4 py-3 rounded-lg"
               style={{ background: s.status==="LIVE" ? "rgba(34,197,94,.07)" : "rgba(255,255,255,.03)",
                         border: `1px solid ${s.status==="LIVE" ? "rgba(34,197,94,.25)" : "rgba(255,255,255,.06)"}` }}>
            <span className="text-xs w-4 text-right" style={{ color: "#475569" }}>{s.n}</span>
            <div className="flex-1 text-left">
              <span className="text-sm font-medium" style={{ color: s.status==="LIVE" ? "#f1f5f9" : "#94a3b8" }}>
                {s.title}
              </span>
              <span className="ml-2 text-xs" style={{ color: "#475569" }}>{s.room}</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>
              {s.status}
            </span>
            {s.status === "LIVE" && (
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded" style={{ background: "#7c3aed22", color: "#a78bfa", border:"1px solid #7c3aed44" }}>HOLD</span>
                <span className="text-xs px-2 py-1 rounded" style={{ background: "#dc262622", color: "#f87171", border:"1px solid #dc262644" }}>END</span>
              </div>
            )}
            {s.status === "READY" && (
              <span className="text-xs px-2 py-1 rounded" style={{ background: "#22c55e22", color: "#4ade80", border:"1px solid #22c55e44" }}>GO LIVE</span>
            )}
          </div>
        ))}
      </div>
      {/* Gradient fade at bottom */}
      <div className="h-12 pointer-events-none"
           style={{ background: "linear-gradient(to bottom, transparent, #111827)" }} />
    </div>
  );
}

// ─── Logos / Social proof ────────────────────────────────────────────────────
function SocialProof() {
  return (
    <section className="py-12 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <p className="text-sm mb-6" style={{ color: "#475569" }}>
        TRUSTED BY EVENT PRODUCTION TEAMS
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
        {["AVE Events", "StageFirst", "LiveCo", "EventPro", "ShowDrive"].map(name => (
          <span key={name} className="text-lg font-semibold" style={{ color: "#334155" }}>{name}</span>
        ))}
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "🎭",
    title: "Multi-role Operations",
    desc: "Director, Stage, AV, Interp, Reg, and Signage — each role sees exactly what they need, nothing more.",
  },
  {
    icon: "⚡",
    title: "Real-time Sync",
    desc: "Session changes, broadcasts, and clock updates propagate instantly to every operator via live subscriptions.",
  },
  {
    icon: "🤖",
    title: "AI Incident Advisor",
    desc: "When something breaks, get instant AI-generated diagnosis and numbered resolution steps — no scrambling.",
  },
  {
    icon: "🖥️",
    title: "Digital Signage",
    desc: "Drive lobby displays, wayfinding screens, and sponsor carousels directly from the console — no extra software.",
  },
  {
    icon: "⏱",
    title: "Delay Cascade",
    desc: "Apply a delay to one session and it cascades downstream automatically. Every operator sees the new schedule instantly.",
  },
  {
    icon: "📊",
    title: "Post-event Reports",
    desc: "AI-generated executive summary, session-by-session variance, incidents log — ready to share in one click.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#f1f5f9" }}>
          Everything your team needs
        </h2>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748b" }}>
          Built by event producers, for event producers. Every feature solves a real problem from the floor.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(f => (
          <div key={f.title} className="p-6 rounded-xl transition-all hover:translate-y-[-2px]"
               style={{ background: "#111827", border: "1px solid rgba(255,255,255,.07)" }}>
            <span className="text-3xl mb-4 block">{f.icon}</span>
            <h3 className="font-semibold text-base mb-2" style={{ color: "#f1f5f9" }}>{f.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────
const STEPS = [
  { n: "01", title: "Create your event",     desc: "Add your sessions, rooms, and team members. Assign roles — each person sees only what's relevant to them." },
  { n: "02", title: "Go live on the day",    desc: "Open the console, hit Ready → Call Speaker → Go Live. Every status change is instant across all devices." },
  { n: "03", title: "Stay in control",       desc: "Apply delays, send broadcasts to all operators, manage signage, and get AI help if anything goes wrong." },
];

function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6" style={{ background: "#090e1a" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#f1f5f9" }}>
            Up and running in minutes
          </h2>
          <p className="text-lg" style={{ color: "#64748b" }}>No setup complexity. No training required.</p>
        </div>
        <div className="flex flex-col gap-8">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
                   style={{ background: "rgba(59,130,246,.12)", border: "1px solid rgba(59,130,246,.3)", color: "#60a5fa" }}>
                {s.n}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-semibold text-base mb-1" style={{ color: "#f1f5f9" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block" />
              )}
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
    desc: "Perfect for freelancers and occasional events.",
    highlight: false,
    features: [
      "1 event",
      "Up to 5 operators",
      "All roles included",
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
      "All roles included",
      "Real-time sync",
      "Basic signage (5 displays)",
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
    features: [
      "Unlimited active events",
      "Up to 20 operators",
      "All roles included",
      "Real-time sync",
      "Unlimited signage displays",
      "AI Incident Advisor",
      "AI Post-event reports",
      "Delay cascade",
      "Priority support",
    ],
    cta: "Start free trial",
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#f1f5f9" }}>
          Simple, honest pricing
        </h2>
        <p className="text-lg" style={{ color: "#64748b" }}>
          3-day free trial on Starter and Pro. No credit card required.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {PLANS.map(p => (
          <div key={p.name} className="rounded-xl p-7 flex flex-col"
               style={{
                 background: p.highlight ? "rgba(59,130,246,.08)" : "#111827",
                 border: p.highlight ? "1px solid rgba(59,130,246,.4)" : "1px solid rgba(255,255,255,.07)",
                 position: "relative",
               }}>
            {p.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                   style={{ background: "#3b82f6", color: "#fff" }}>
                MOST POPULAR
              </div>
            )}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-1" style={{ color: p.highlight ? "#60a5fa" : "#64748b" }}>{p.name}</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-extrabold" style={{ color: "#f1f5f9" }}>{p.price}</span>
                <span className="text-sm pb-1" style={{ color: "#64748b" }}>{p.period}</span>
              </div>
              <p className="text-sm" style={{ color: "#64748b" }}>{p.desc}</p>
            </div>
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#94a3b8" }}>
                  <span style={{ color: "#22c55e" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a href={TRIAL_URL}
               className="text-center py-2.5 rounded-lg font-semibold text-sm transition-all hover:brightness-110"
               style={{
                 background: p.highlight ? "#3b82f6" : "rgba(255,255,255,.07)",
                 color: p.highlight ? "#fff" : "#cbd5e1",
                 border: p.highlight ? "none" : "1px solid rgba(255,255,255,.1)",
               }}>
              {p.cta}
            </a>
          </div>
        ))}
      </div>
      <p className="text-center mt-8 text-sm" style={{ color: "#475569" }}>
        Need more? <a href="mailto:hello@cuedeck.io" className="underline hover:text-white transition-colors">Contact us</a> for Enterprise pricing.
      </p>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-24 px-6 text-center relative overflow-hidden"
             style={{ background: "#090e1a", borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,.12) 0%, transparent 60%)" }} />
      <div className="relative max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#f1f5f9" }}>
          Ready to run your event like a pro?
        </h2>
        <p className="text-lg mb-10" style={{ color: "#64748b" }}>
          Start your free 3-day trial today. No credit card required.
        </p>
        <a href={TRIAL_URL}
           className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:brightness-110 hover:scale-105"
           style={{ background: "#3b82f6", color: "#fff" }}>
          Start free trial →
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-lg" style={{ color: "#fff" }}>
          Cue<span style={{ color: "#3b82f6" }}>Deck</span>
        </span>
        <div className="flex gap-6 text-sm" style={{ color: "#475569" }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing"  className="hover:text-white transition-colors">Pricing</a>
          <a href={APP_URL}   className="hover:text-white transition-colors">Sign in</a>
          <a href="mailto:hello@cuedeck.io" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-sm" style={{ color: "#334155" }}>© 2026 CueDeck. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
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
