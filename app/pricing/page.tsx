import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PricingClient from "../../components/PricingClient";

export const metadata: Metadata = {
  title: "Pricing — CueDeck",
  description: "Simple, transparent pricing for professional event teams. Start free, scale as you grow.",
};

const TRIAL_URL = "https://app.cuedeck.io/#signup";
const CONTACT_URL = "/contact";

const plans = [
  {
    name: "Pay-per-event",
    price: { monthly: 39, annual: 39 },
    period: "per event",
    description: "Perfect for freelancers and one-off productions.",
    highlight: false,
    badge: null as string | null,
    features: [
      "1 event",
      "Up to 5 operators",
      "All 6 roles included",
      "Real-time sync",
      "Basic signage (2 displays)",
    ],
    cta: "Buy single event",
    ctaHref: TRIAL_URL,
    ctaStyle: "outline",
  },
  {
    name: "Starter",
    price: { monthly: 59, annual: 47 },
    period: "/month",
    description: "For small teams running regular events.",
    highlight: false,
    badge: null as string | null,
    features: [
      "1 active event at a time",
      "Up to 5 operators",
      "All 6 roles included",
      "Real-time sync",
      "5 signage displays",
      "Post-event reports",
      "3-day free trial",
    ],
    cta: "Start free trial",
    ctaHref: TRIAL_URL,
    ctaStyle: "outline",
  },
  {
    name: "Pro",
    price: { monthly: 99, annual: 79 },
    period: "/month",
    description: "Full power for production companies.",
    highlight: true,
    badge: "Most popular" as string | null,
    features: [
      "Unlimited active events",
      "Up to 20 operators",
      "All 6 roles included",
      "Unlimited signage displays",
      "AI Incident Advisor",
      "AI post-event reports",
      "Delay cascade",
      "Priority support",
      "3-day free trial",
    ],
    cta: "Start free trial",
    ctaHref: TRIAL_URL,
    ctaStyle: "filled",
  },
];

const faqs = [
  {
    q: "What counts as an event?",
    a: "An event is a single production run — a conference day, a gala, a ceremony. You can have multiple events running under one subscription, each with their own session list and operator set.",
  },
  {
    q: "Can I try before I commit?",
    a: "Yes. Every plan starts with a 3-day free trial. No credit card required. You get full access to all features in your chosen plan during the trial.",
  },
  {
    q: "What happens if I go over my operator limit?",
    a: "We'll notify you and you can upgrade instantly. We never cut you off mid-event — live event continuity is our top priority.",
  },
  {
    q: "Do you offer per-event pricing?",
    a: "Yes — for teams who run fewer than 4 events per year, per-event pricing is often more economical. Contact us and we'll work out the right structure.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit (TLS) and at rest (AES-256). We use Supabase with row-level security. Event data is retained for 12 months then purged unless you request otherwise.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, no lock-in. Cancel from your account settings at any time. If you're on annual billing we'll prorate any unused months.",
  },
];

const includedFeatures = [
  { icon: "⚡", title: "Real-time sync",      desc: "Sub-second updates across all operator devices, no refresh needed." },
  { icon: "🛡️", title: "Role-based access",   desc: "Each operator sees exactly what they need — nothing more." },
  { icon: "📡", title: "Digital signage",     desc: "Drive lobby screens, sponsor carousels, and break slides from the console." },
  { icon: "🤖", title: "AI agents",           desc: "Incident advisor, pre-cue engine, and post-event report generator." },
  { icon: "🔒", title: "Bank-grade security", desc: "TLS + AES-256 encryption, row-level security on all data." },
  { icon: "🔁", title: "Auto-reconnect",      desc: "If a device drops, it reconnects and catches up automatically." },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: "#fff" }}>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section style={{
          padding: "96px 40px 64px",
          background: "linear-gradient(135deg, #f0f7ff 0%, #fafafa 60%, #fff 100%)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {/* Label */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 99,
              marginBottom: 24,
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
              fontSize: 12,
              fontWeight: 600,
              color: "#3b82f6",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Pricing
            </div>

            <h1 style={{
              fontSize: "clamp(28px, 3vw, 42px)",
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.8px",
              marginBottom: 16,
              lineHeight: 1.15,
            }}>
              Simple, transparent pricing
            </h1>

            <p style={{
              fontSize: 17,
              color: "#6b7280",
              lineHeight: 1.6,
              marginBottom: 48,
              maxWidth: 480,
              margin: "0 auto 48px",
            }}>
              Start with a 3-day free trial on any plan. No credit card required.
            </p>

            {/* Toggle + currency rendered inside narrow hero; cards break out below */}
          </div>

          {/* PricingClient at full width (its own maxWidth: 1100) */}
          <PricingClient plans={plans} />

          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{
              textAlign: "center",
              fontSize: 13,
              color: "#9ca3af",
              marginTop: 32,
            }}>
              All prices in EUR (tax inclusive). Annual billing saves ~20%.{" "}
              <a href={CONTACT_URL} style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>
                Need per-event pricing?
              </a>
            </p>
          </div>
        </section>

        {/* ── What's included ───────────────────────────────────────────── */}
        <section style={{
          padding: "64px 40px",
          background: "#f9fafb",
          borderTop: "1px solid #f3f4f6",
          borderBottom: "1px solid #f3f4f6",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{
              textAlign: "center",
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.5px",
              marginBottom: 40,
            }}>
              What&apos;s included in every plan
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}>
              {includedFeatures.map(item => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "20px 20px",
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1.4 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section style={{ padding: "96px 40px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "#3b82f6",
                textTransform: "uppercase",
                marginBottom: 12,
              }}>
                FAQ
              </p>
              <h2 style={{
                fontSize: "clamp(24px, 2.5vw, 36px)",
                fontWeight: 800,
                color: "#111827",
                letterSpacing: "-0.8px",
              }}>
                Frequently asked questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {faqs.map((faq, i) => (
                <div
                  key={faq.q}
                  style={{
                    padding: "28px 0",
                    borderBottom: i < faqs.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  <p style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: 8,
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </p>
                  <p style={{
                    fontSize: 14,
                    color: "#6b7280",
                    lineHeight: 1.7,
                  }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA strip ─────────────────────────────────────────────────── */}
        <section style={{
          padding: "96px 40px",
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.07,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }} />
          <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
            <h2 style={{
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1px",
              marginBottom: 16,
              lineHeight: 1.15,
            }}>
              Ready to run your next event?
            </h2>
            <p style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.75)",
              marginBottom: 40,
              lineHeight: 1.6,
            }}>
              3-day free trial. No credit card. Cancel anytime.
            </p>
            <a
              href={TRIAL_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "15px 36px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                background: "#fff",
                color: "#1d4ed8",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              Start free trial →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
