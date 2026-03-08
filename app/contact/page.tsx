import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Contact — CueDeck",
  description: "Get in touch with the CueDeck team for general enquiries, support, or enterprise pricing.",
};

const IconMail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconHeadset = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
  </svg>
);

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: "#fff" }}>

        {/* Hero */}
        <section style={{
          padding: "96px 40px 72px",
          background: "linear-gradient(135deg, #f0f7ff 0%, #fafafa 60%, #fff 100%)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h1 style={{
              fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 800,
              lineHeight: 1.1, letterSpacing: "-1.5px",
              color: "#111827", marginBottom: 16,
            }}>
              Get in touch
            </h1>
            <p style={{ fontSize: 18, color: "#4b5563", lineHeight: 1.7 }}>
              We&apos;re a small, focused team. Every message goes directly to a human who works on CueDeck.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section style={{ padding: "64px 40px", background: "#fff" }}>
          <div style={{
            maxWidth: 960, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
          }}>
            {[
              { Icon: IconMail,     title: "General",    desc: "Questions about CueDeck, partnerships, or anything else.",                         email: "hello@cuedeck.io" },
              { Icon: IconHeadset,  title: "Support",    desc: "Having an issue during an event? We prioritise production-day support.",           email: "support@cuedeck.io" },
              { Icon: IconBuilding, title: "Enterprise", desc: "Custom plans, volume licensing, dedicated onboarding and SLAs.",                  email: "enterprise@cuedeck.io" },
            ].map(card => (
              <div key={card.title} style={{
                padding: "32px 28px", borderRadius: 12,
                border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: "rgba(59,130,246,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6",
                }}>
                  <card.Icon />
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{card.title}</h2>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65, flex: 1 }}>{card.desc}</p>
                <a href={`mailto:${card.email}`} style={{ fontSize: 14, fontWeight: 600, color: "#3b82f6", textDecoration: "none" }}>
                  {card.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section style={{ padding: "64px 40px 96px", background: "#f9fafb", borderTop: "1px solid #f3f4f6" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8, letterSpacing: "-0.5px" }}>
              Send a message
            </h2>
            <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 36, lineHeight: 1.6 }}>
              Fill out the form below and we&apos;ll get back to you within one business day.
            </p>
            <form action="mailto:hello@cuedeck.io" method="POST" encType="text/plain" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Name</label>
                <input type="text" name="name" required placeholder="Your name" style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8,
                  border: "1px solid #d1d5db", fontSize: 14, color: "#111827",
                  background: "#fff", outline: "none", boxSizing: "border-box",
                }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
                <input type="email" name="email" required placeholder="you@example.com" style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8,
                  border: "1px solid #d1d5db", fontSize: 14, color: "#111827",
                  background: "#fff", outline: "none", boxSizing: "border-box",
                }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Message</label>
                <textarea name="message" required rows={6} placeholder="Tell us what you need..." style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8,
                  border: "1px solid #d1d5db", fontSize: 14, color: "#111827",
                  background: "#fff", outline: "none", resize: "vertical",
                  fontFamily: "inherit", boxSizing: "border-box",
                }} />
              </div>
              <div>
                <button type="submit" style={{
                  padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15,
                  cursor: "pointer", background: "#3b82f6", color: "#fff", border: "none",
                  boxShadow: "0 2px 8px rgba(59,130,246,0.35)",
                }}>
                  Send message
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
