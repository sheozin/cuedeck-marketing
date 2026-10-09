import Link from "next/link";
import Image from "next/image";
import { DeviceStage, Laptop, Monitor, Tablet, LiveLabel, DOT } from "../components/DeviceFrames";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: SITE_URL } };
import EmailCapture from "../components/EmailCapture";
import { jsonLd as safeJsonLd } from "../lib/jsonLd";
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../keystatic.config'
import { getAllPosts, formatDate } from '../lib/posts'
import { getCheckinPrice } from '../lib/checkinPrice'
import HomePricing from '../components/HomePricing'
import { SITE_URL } from '../lib/site'
import { softwareApplicationJsonLd } from '../lib/plans'

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
const IconTimer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8"/>
    <path d="M12 9v4l2 2"/>
    <path d="M5 3L2 6"/>
    <path d="M22 6l-3-3"/>
    <path d="M12 5V3"/>
    <path d="M10 3h4"/>
  </svg>
);
const IconLink = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

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
        maxWidth: 1280, width: "100%", margin: "0 auto", padding: "0 24px",
        display: "grid", gap: 48, alignItems: "center",
        overflow: "hidden",
      }} className="cd-hero-grid">
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

        {/* Right: the console on a laptop beside the stage timer it drives */}
        <DeviceStage layout="pair">
          <Laptop
            img={{ src: "/screenshots/cuedeck-console-now-and-next-band.jpg", width: 2144, height: 1136,
              alt: "CueDeck console for Northwind Summit 2026: Main Stage live with 14:00 left and the next panel ready, Hall B calling its speaker, and the session list below" }}
            sizes="(max-width: 900px) 92vw, 420px" priority
          >
            <LiveLabel dot={DOT.live} title="Main Stage live" sub="14:00 left" pos={{ left: -18, top: 22 }} />
            <LiveLabel dot={DOT.calling} title="Hall B calling its speaker" sub="On stage in 4 min" pos={{ left: 18, bottom: -8 }} />
          </Laptop>
          <Monitor
            img={{ src: "/screenshots/cuedeck-stage-timer-live-countdown.jpg", width: 3840, height: 2160,
              alt: "CueDeck stage timer: 14:00 remaining in green for The future of hybrid events, with a message from the director: Take questions from 10:35" }}
            sizes="(max-width: 900px) 92vw, 320px"
          >
            <LiveLabel dot={DOT.info} title="Director message on stage" sub="Take questions from 10:35" pos={{ right: -10, top: -14 }} />
          </Monitor>
        </DeviceStage>
      </div>
    </section>
  );
}

// ─── Built by ─────────────────────────────────────────────────────────────────
function BuiltBy() {
  return (
    <section style={{
      padding: "28px 40px",
      background: "#fff",
      borderTop: "1px solid #f3f4f6",
      borderBottom: "1px solid #f3f4f6",
    }}>
      <p style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", fontSize: 14, fontWeight: 600, color: "#6b7280" }}>
        Built and used in production by AVE Events
      </p>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
// Each card shows a close-up only where one honestly matches the title; the
// others stay text-only. pos picks which part of the shot the 2:1 box keeps.
type FeatureShot = { src: string; alt: string; width: number; height: number; pos: string };
const FEATURES: { Icon: () => React.JSX.Element; title: string; desc: string; shot?: FeatureShot }[] = [
  {
    Icon: IconUsers,
    title: "Multi-role Operations",
    shot: { src: "/screenshots/cuedeck-closeup-team-roles.jpg", width: 1200, height: 600, pos: "left top", alt: "Event team list with each person's role, Stage or AV, and Suspend or Remove controls" },
    desc: "Director, Stage, AV, Interp, Reg, and Signage: each role sees exactly what they need, with role-adaptive filters and keyboard shortcuts.",
  },
  {
    Icon: IconZap,
    title: "Real-time Sync",
    shot: { src: "/screenshots/cuedeck-closeup-event-log.jpg", width: 718, height: 480, pos: "center top", alt: "Event log showing the realtime channel connected and session status changes with their times" },
    desc: "Session changes, broadcasts, and clock updates propagate instantly to every operator via live subscriptions. Zero polling.",
  },
  {
    Icon: IconBrain,
    title: "AI Incident Advisor",
    desc: "When something breaks, get instant AI-generated diagnosis and numbered resolution steps. No scrambling, no guesswork.",
  },
  {
    Icon: IconMonitor,
    title: "Digital Signage",
    shot: { src: "/screenshots/cuedeck-display-schedule.jpg", width: 3840, height: 2160, pos: "center", alt: "Lobby display showing the live session, its speaker, 14:00 remaining and the next session" },
    desc: "Drive lobby displays, wayfinding screens, and sponsor carousels directly from the console. Auto-rotate sequences, video support.",
  },
  {
    Icon: IconClock,
    title: "Delay Cascade",
    shot: { src: "/screenshots/cuedeck-closeup-delay-cascade.jpg", width: 2120, height: 758, pos: "right top", alt: "Session list running 5 minutes late: three sessions moved by +5 and a line where the delay stops" },
    desc: "Apply a delay to one session and it cascades downstream automatically. Every operator sees the new schedule instantly.",
  },
  {
    Icon: IconBarChart,
    title: "Post-event Reports",
    desc: "AI-generated executive summary, session-by-session variance analysis, and incidents log, ready to share in one click.",
  },
  {
    Icon: IconTimer,
    title: "Stage Timer",
    shot: { src: "/screenshots/cuedeck-stage-timer-live-countdown.jpg", width: 3840, height: 2160, pos: "center", alt: "Stage timer counting down 14:00 in green with a message from the director below" },
    desc: "Full-screen countdown visible from any stage. Colour-coded urgency as time runs down, a HOLD freeze and a clear overtime state, so speakers always know where they stand.",
  },
  {
    Icon: IconLink,
    title: "Display Pairing",
    shot: { src: "/screenshots/cuedeck-display-pairing-code.jpg", width: 1920, height: 1080, pos: "center", alt: "Display screen showing a pairing code to enter in the CueDeck console" },
    desc: "Pair signage screens in seconds: each display shows a 6-character code, enter it in the console, done. No network setup, no IP addresses.",
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
            Live event production features
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
              {/* Same 2:1 light frame on every card so the titles line up; cards
                  without an honest screenshot show their icon in it instead. */}
              <div style={{ padding: 5, borderRadius: 10, background: "#eef4ff", border: "1px solid #dbeafe", marginBottom: 20 }}>
                {f.shot ? (
                  <div style={{ position: "relative", aspectRatio: "2 / 1", borderRadius: 6, overflow: "hidden", background: "#0b0d12" }}>
                    <Image src={f.shot.src} alt={f.shot.alt} fill sizes="(max-width: 900px) 100vw, 360px"
                      style={{ objectFit: "cover", objectPosition: f.shot.pos }} />
                  </div>
                ) : (
                  <div style={{
                    aspectRatio: "2 / 1", borderRadius: 6, color: "#3b82f6",
                    background: "radial-gradient(260px 140px at 30% 20%, #dbeafe 0, transparent 70%), linear-gradient(180deg, #f8fbff, #eef4ff)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ transform: "scale(1.8)" }}><f.Icon /></div>
                  </div>
                )}
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
    desc: "Add your sessions, rooms, and team members. Assign roles so each person sees only what's relevant to them. Import from a spreadsheet or build from scratch in minutes.",
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

const CHECKIN_FEATURES = [
  "Guest list import",
  "QR code emails",
  "Check-in desk",
  "Door scanner phones",
  "Badges",
  "Live dashboard",
  "Post-event report",
];

async function Pricing() {
  const checkin = await getCheckinPrice();
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
            3-day free trial on Starter and Pro, no credit card required. Event Check-in is priced per event.
          </p>
        </div>

        <HomePricing commandCenter={
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
        } checkin={
        <div style={{
          maxWidth: 400, margin: "0 auto",
          borderRadius: 16, padding: "32px 28px",
          display: "flex", flexDirection: "column",
          background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#9ca3af" }}>Event Check-in</p>
            {checkin ? (
              <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1px", color: "#111827", lineHeight: 1 }}>{checkin.label}</span>
                <span style={{ fontSize: 14, color: "#9ca3af", paddingBottom: 6 }}>per event{checkin.taxExclusive ? ", excl. VAT" : ""}</span>
              </div>
            ) : (
              <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>See pricing when you sign up</p>
            )}
            <p style={{ fontSize: 13, color: "#6b7280" }}>No subscription and no per-attendee fees. It works with or without a CueDeck plan.</p>
          </div>

          <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, flex: 1 }}>
            {CHECKIN_FEATURES.map(f => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
                <span style={{ color: "#22c55e", flexShrink: 0 }}><IconCheck /></span>
                {f}
              </li>
            ))}
          </ul>

          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Set up and test free. Pay when you go live.</p>

          <a href={TRIAL_URL} style={{
            display: "block", textAlign: "center",
            padding: "12px 20px", borderRadius: 10,
            fontWeight: 700, fontSize: 14, textDecoration: "none",
            background: "#3b82f6", color: "#fff",
            boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
          }}>
            Set up your event free
          </a>
          <a href="/solutions/check-in" style={{
            display: "block", textAlign: "center", marginTop: 10,
            padding: "12px 20px", borderRadius: 10,
            fontWeight: 700, fontSize: 14, textDecoration: "none",
            background: "#fff", color: "#3b82f6", border: "1px solid #bfdbfe",
          }}>
            Learn about Event Check-in
          </a>
        </div>
        } />

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
    .cd-hero-grid { grid-template-columns: minmax(0, 4.6fr) minmax(0, 7.4fr); }
    @media (max-width: 900px) { .cd-hero-grid { grid-template-columns: minmax(0, 1fr); } }
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
// ─── Event Check-in ───────────────────────────────────────────────────────────
const CHECKIN_POINTS = [
  "Guests register from your link, or import a CSV; every guest gets a personal QR code",
  "One scan brings up a whole company, checked in together",
  "Phones become door scanners; walk-ins use a self-registration kiosk",
  "Keeps working offline, with a live dashboard and a report after the event",
];

function CheckinSection() {
  return (
    <section id="check-in" style={{ padding: "96px 40px", background: "#f9fafb", borderTop: "1px solid #f3f4f6" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "grid", alignItems: "center", gap: 56,
        gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))",
      }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase", marginBottom: 12 }}>
            NEW: EVENT CHECK-IN
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.8px", marginBottom: 16, lineHeight: 1.15 }}>
            Event check-in with QR codes and badges
          </h2>
          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.65, marginBottom: 24 }}>
            Run the registration desk from any laptop or tablet. Priced per event, with or without a CueDeck plan.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
            {CHECKIN_POINTS.map(p => (
              <li key={p} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", lineHeight: 1.5 }}>
                <span style={{ color: "#3b82f6", flexShrink: 0, marginTop: 2 }}><IconCheck /></span>{p}
              </li>
            ))}
          </ul>
          <a href="/solutions/check-in" style={{
            display: "inline-block", padding: "13px 26px", borderRadius: 10, background: "#3b82f6", color: "#fff",
            fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 2px 8px rgba(59,130,246,0.4)",
          }}>Explore Event Check-in</a>
        </div>
        <DeviceStage>
          <Laptop
            img={{ src: "/screenshots/checkin-desk-group-arrival.jpg", width: 2880, height: 1800,
              alt: "CueDeck check-in desk: one search brings up three guests from the same company, ready to check in together" }}
            sizes="(max-width: 900px) 92vw, 520px"
          >
            <LiveLabel dot={DOT.ok} title="5 of 9 arrived" sub="All synced" pos={{ right: -20, top: 18 }} />
            <LiveLabel dot={DOT.info} title="Contoso Demo" sub="3 people expected" pos={{ left: -18, top: "52%" }} />
          </Laptop>
        </DeviceStage>
      </div>
    </section>
  );
}

const SHOWCASE_LINK = { display: "inline-block", marginTop: 20, fontSize: 15, fontWeight: 600, color: "#2563eb", textDecoration: "none" } as const;

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

          {/* Row 1: Director view */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", fontSize: 11, fontWeight: 600, color: "#3b82f6", marginBottom: 16 }}>DIRECTOR VIEW</div>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.6px", marginBottom: 14, lineHeight: 1.2 }}>
                Complete session control at a glance
              </h3>
              <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, marginBottom: 20 }}>
                See every session, every status, and every operator in one screen. Trigger transitions, send broadcasts, apply delay cascades, and monitor your AI agents, all without leaving the console.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["8-state session machine (PLANNED → LIVE → ENDED)", "One-click delay cascade across all downstream sessions", "Broadcast bar with quick presets for common messages"].map(f => (
                  <li key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#4b5563" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/solutions/command-center" style={SHOWCASE_LINK}>Explore show calling and run of show →</a>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: "100%", maxWidth: 540 }}>
                <DeviceStage>
                  <Laptop
                    img={{ src: "/screenshots/cuedeck-command-center-director-console.jpg", width: 2880, height: 1800,
                      alt: "CueDeck director console: Main Stage and Hall B in the now and next band, the session list with live, calling, ready and planned sessions, the selected session's Hold and End controls, and the event log" }}
                    sizes="(max-width: 900px) 92vw, 480px"
                  >
                    <LiveLabel dot={DOT.delay} title="Running +5 min" sub="3 sessions affected" pos={{ left: -18, bottom: "16%" }} />
                    <LiveLabel dot={DOT.live} title="Selected session" sub="Hold and End controls" pos={{ right: -20, bottom: "26%" }} />
                  </Laptop>
                </DeviceStage>
              </div>
            </div>
          </div>

          {/* Row 2: Timeline (reversed) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 64, alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ width: "100%", maxWidth: 540 }}>
                <DeviceStage>
                  <Laptop
                    img={{ src: "/screenshots/cuedeck-console-timeline-view.jpg", width: 2144, height: 1030,
                      alt: "CueDeck timeline view: Main Stage and Hall B sessions on one time axis, coloured by status, with the Now line at 10:31" }}
                    sizes="(max-width: 900px) 92vw, 480px"
                  >
                    <LiveLabel dot={DOT.info} title="Now line at 10:31" sub="Main Stage and Hall B on one axis" pos={{ right: -20, top: 18 }} />
                  </Laptop>
                </DeviceStage>
              </div>
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
                {["Room-by-room horizontal layout with live NOW cursor", "Colour-coded by status: live, calling, ready and planned", "Toggle between List and Timeline with one click"].map(f => (
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
                Register lobby screens, wayfinding displays, and sponsor panels. Set per-display content sequences or push a global override to all screens instantly. No extra software needed.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Instant display pairing with 6-character codes", "Auto-rotating sequences: sponsors → agenda → schedule", "One-click global overrides for break screens or recall"].map(f => (
                  <li key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#4b5563" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/solutions/stage-timer" style={SHOWCASE_LINK}>See event signage displays →</a>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: "100%", maxWidth: 540 }}>
                <DeviceStage>
                  <Laptop
                    img={{ src: "/screenshots/cuedeck-console-displays-signage-control.jpg", width: 2144, height: 950,
                      alt: "CueDeck Displays panel: push to all buttons for break screen, recall, sponsors and schedules, and three registered displays online" }}
                    sizes="(max-width: 900px) 92vw, 480px"
                  >
                    <LiveLabel dot={DOT.ok} title="3 displays online" sub="Stage timer, foyer, Hall B door" pos={{ right: -20, top: -14 }} />
                  </Laptop>
                </DeviceStage>
              </div>
            </div>
          </div>

          {/* Row 4: Stage Timer (reversed layout) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 64, alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ width: "100%", maxWidth: 540 }}>
                <DeviceStage layout="twin">
                  <Monitor
                    img={{ src: "/screenshots/cuedeck-stage-timer-live-countdown.jpg", width: 3840, height: 2160,
                      alt: "CueDeck stage timer: 14:00 remaining in green for The future of hybrid events, with a message from the director: Take questions from 10:35" }}
                    sizes="(max-width: 900px) 46vw, 240px"
                  >
                    <LiveLabel dot={DOT.ok} title="14:00 remaining" sub="Take questions from 10:35" pos={{ left: -14, top: -16 }} />
                  </Monitor>
                  <Monitor
                    img={{ src: "/screenshots/cuedeck-stage-timer-overtime.jpg", width: 3840, height: 2160,
                      alt: "CueDeck stage timer in overtime: +02:15 in magenta for The future of hybrid events" }}
                    sizes="(max-width: 900px) 46vw, 240px"
                  >
                    <LiveLabel dot={DOT.over} title="Overtime" sub="+02:15 over" pos={{ right: -14, top: -16 }} />
                  </Monitor>
                </DeviceStage>
              </div>
            </div>
            <div>
              <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 11, fontWeight: 600, color: "#ef4444", marginBottom: 16 }}>STAGE TIMER</div>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.6px", marginBottom: 14, lineHeight: 1.2 }}>
                Speaker-facing countdown your presenters will love
              </h3>
              <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, marginBottom: 20 }}>
                Open the Stage Timer on any screen facing the stage. Speakers see a massive countdown that shifts from green to amber to red as time runs low. If they overrun, the timer flashes in magenta with the time over: no ambiguity, no awkward signals.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Colour-coded urgency: green → amber → red → flashing overrun", "HOLD freeze keeps the clock paused during breaks or delays", "Progress bar and live session info visible at a glance"].map(f => (
                  <li key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#4b5563" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/solutions/stage-timer" style={SHOWCASE_LINK}>See the stage timer and confidence monitor →</a>
            </div>
          </div>

          {/* Row 5: Display Pairing */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", fontSize: 11, fontWeight: 600, color: "#10b981", marginBottom: 16 }}>DISPLAY PAIRING</div>
              <h3 style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.6px", marginBottom: 14, lineHeight: 1.2 }}>
                Connect screens in seconds, not minutes
              </h3>
              <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, marginBottom: 20 }}>
                Open <strong style={{ color: "#111827", fontFamily: "monospace" }}>app.cuedeck.io/d</strong> on any screen: TV, tablet, or monitor. A 6-character pairing code appears. Type it into the console and the screen connects instantly. Install as an app for auto-reconnect on reboot.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Short URL: just 11 characters to type on a TV remote", "Installs as a fullscreen app: no browser chrome, survives reboots", "Auto-reconnect: paired displays remember their connection", "6-character code with 5-minute auto-expiry for security"].map(f => (
                  <li key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "#4b5563" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: "100%", maxWidth: 540 }}>
                <DeviceStage>
                  <Tablet
                    img={{ src: "/screenshots/cuedeck-display-pairing-code.jpg", width: 1920, height: 1080,
                      alt: "CueDeck display pairing screen showing the code LZN-FS4, waiting for connection, with the code expiring in 5:00" }}
                    sizes="(max-width: 900px) 92vw, 440px" maxWidth="90%"
                  >
                    <LiveLabel dot={DOT.ok} title="Pairing code on screen" sub="Expires in 5:00" pos={{ right: -20, top: -14 }} />
                  </Tablet>
                </DeviceStage>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const homeFaqs = [
  { q: "What is CueDeck?", a: "CueDeck is a real-time production console for live events. It gives every operator (directors, stage managers, AV techs, interpreters, registration, and signage) a role-based dashboard that updates instantly." },
  { q: "How does real-time sync work?", a: "CueDeck uses live database subscriptions via Supabase Realtime. When a director changes a session status, every connected operator sees the update instantly. No polling, no refreshing." },
  { q: "What roles does CueDeck support?", a: "Six roles: Director (full control), Stage (session transitions), AV (hold capability), Interpreter (read-only language view), Registration (read-only desk view), and Signage (display management)." },
  { q: "Do I need to install any software?", a: "No. CueDeck runs entirely in the browser. Open it on any device: laptop, tablet, or phone. Signage displays work the same way: open app.cuedeck.io/d on any screen and pair with a 6-character code. You can also install the display page as a fullscreen app for auto-reconnect on reboot, no app store required." },
  { q: "Can I use CueDeck for multi-room events?", a: "Yes. Sessions are assigned to rooms, and operators can filter by room. Signage displays can be configured to show content for specific rooms. The director sees everything across all rooms." },
  { q: "How does digital signage work?", a: "Register displays from the console, choose a content mode (schedule, wayfinding, sponsors, break screen, and more), and launch the display URL on any browser. Displays update in real time and support global overrides." },
  { q: "What do the AI agents actually do?", a: "CueDeck includes three AI agents powered by Anthropic's Claude. The Incident Advisor fires automatically when technical warnings are detected and gives your team a diagnosis and step-by-step fix checklist. The Cue Engine sends pre-cue alerts 8 minutes before each session with an AI-generated preparation checklist. The Report Generator produces a full post-event analysis (session variance, incidents log, and improvement recommendations) in one click." },
  { q: "Do I need to set up anything to use the AI features?", a: "No. AI runs entirely on CueDeck's servers. There is nothing to configure: no API key to manage, and no browser extension to install. As long as you are on a Trial, Pro, or Enterprise plan and logged in, AI features work automatically." },
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
function LatestPosts({ posts }: { posts: { slug: string; title: string; excerpt: string; date: string; featuredImage: string | null }[] }) {
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
            <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color 0.15s, box-shadow 0.15s" }}>
              {p.featuredImage && (
                <img src={p.featuredImage} alt={p.title} width={1200} height={630} loading="lazy" decoding="async" style={{ width: "100%", height: 160, objectFit: "cover" }} />
              )}
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <time style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{formatDate(p.date)}</time>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, flex: 1 }}>{p.excerpt}</p>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6" }}>Read more &rarr;</span>
              </div>
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
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <>
      <GlobalStyle />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(homeFaqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(softwareApplicationJsonLd) }}
      />
      <main>
        <Hero heroHeadline={heroHeadline} heroSubheadline={heroSubheadline} />
        <BuiltBy />
        <RoleShowcase />
        <Features />
        <CheckinSection />
        <HowItWorks />
        <Pricing />
        <LatestPosts posts={latestPosts} />
        <FAQ />
        <EmailCapture />
        <FinalCTA />
      </main>
      <Footer cta={false} />
    </>
  );
}
