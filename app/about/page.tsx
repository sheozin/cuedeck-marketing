import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

export const metadata: Metadata = {
  title: "About — CueDeck",
  description: "Built by event professionals, for event professionals. Learn about the mission behind CueDeck.",
};

export default async function AboutPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const about = await reader.singletons.about.read()

  const heroHeadline = about?.heroHeadline ?? 'Built by event professionals, for event professionals.'
  const heroTagline = about?.heroTagline ?? 'CueDeck was born in the chaos of live events — backstage, on comms, watching schedules slip. We built the tool we always wished existed.'
  const missionHeading = about?.missionHeading ?? 'Calm under pressure. Always.'
  const missionBody = about?.missionBody ?? 'Live events are unforgiving. When a speaker is late, a session overruns, or AV goes down, every second counts.\n\nCueDeck replaces that friction with a single real-time console.\n\nWe believe the best events look effortless because the team behind them has the right tools. CueDeck is that tool.'
  const quoteText = about?.quoteText ?? 'We cut our pre-event briefing from 45 minutes to 10. Everyone already knows their role, their cues, and their fallback. CueDeck made that possible.'
  const quoteAuthor = about?.quoteAuthor ?? '— Lead Producer, AVE Events International'
  const ctaHeading = about?.ctaHeading ?? 'Ready to run your event like a pro?'
  const ctaSubtext = about?.ctaSubtext ?? 'Start your free 3-day trial. No credit card required.'

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: "#fff" }}>

        {/* Hero */}
        <section style={{
          padding: "96px 40px 80px",
          background: "linear-gradient(135deg, #f0f7ff 0%, #fafafa 40%, #fff7ed 100%)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 99, marginBottom: 24,
              background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
              fontSize: 12, fontWeight: 600, color: "#3b82f6", letterSpacing: "0.04em",
            }}>
              Our Story
            </div>
            <h1 style={{
              fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 800,
              lineHeight: 1.1, letterSpacing: "-1.5px",
              color: "#111827", marginBottom: 20,
            }}>
              {heroHeadline}
            </h1>
            <p style={{ fontSize: 18, color: "#4b5563", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              {heroTagline}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "56px 40px", background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{
            maxWidth: 900, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24,
          }}>
            {[
              { stat: "500+", label: "Events Powered" },
              { stat: "50+",  label: "Teams Trust CueDeck" },
              { stat: "8",    label: "Operator Roles" },
            ].map(item => (
              <div key={item.label} style={{
                textAlign: "center", padding: "32px 24px",
                borderRadius: 12, border: "1px solid #e5e7eb",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 44, fontWeight: 800, color: "#3b82f6", letterSpacing: "-1.5px", marginBottom: 6, lineHeight: 1 }}>
                  {item.stat}
                </p>
                <p style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section style={{ padding: "96px 40px", background: "#f9fafb" }}>
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 72, alignItems: "center",
          }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" as const, marginBottom: 16 }}>
                Our Mission
              </p>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.8px", marginBottom: 20, lineHeight: 1.2 }}>
                {missionHeading}
              </h2>
              {missionBody.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, marginBottom: 16 }}>
                  {para}
                </p>
              ))}
            </div>
            <blockquote style={{ borderLeft: "4px solid #3b82f6", paddingLeft: 28, margin: 0 }}>
              <p style={{ fontSize: 20, fontWeight: 600, color: "#111827", lineHeight: 1.55, marginBottom: 20, fontStyle: "italic" }}>
                &ldquo;{quoteText}&rdquo;
              </p>
              <footer style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>
                {quoteAuthor}
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: "96px 40px", background: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" as const, marginBottom: 12 }}>What We Stand For</p>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#111827", letterSpacing: "-0.8px" }}>Our values</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
              {[
                { title: "Reliability",  desc: "Live events don't get second takes. CueDeck uses idempotent operations, real-time sync, and graceful reconnection so it keeps working when you need it most." },
                { title: "Simplicity",   desc: "A tool no one uses is no tool at all. Every feature has a reason. No bloat, no training manuals — just clear controls that work the way event teams think." },
                { title: "Real-time",    desc: "Not near-real-time. Not refresh-to-update. Every session change, broadcast, and clock correction reaches every operator in under a second, everywhere." },
              ].map((v, i) => (
                <div key={v.title} style={{
                  padding: "32px 28px", borderRadius: 12,
                  border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, marginBottom: 18,
                    background: "rgba(59,130,246,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20,
                  }}>
                    {["🔒","⚡","📡"][i]}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: "96px 40px",
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.07,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }} />
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: 16, lineHeight: 1.15 }}>
              {ctaHeading}
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", marginBottom: 40 }}>
              {ctaSubtext}
            </p>
            <a href="https://app.cuedeck.io/#signup" style={{
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

      </main>
      <Footer />
    </>
  );
}
