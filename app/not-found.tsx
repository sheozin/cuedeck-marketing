import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found — CueDeck",
  description: "This page doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: "#fff", minHeight: "calc(100vh - 64px)" }}>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "120px 40px",
            minHeight: "60vh",
          }}
        >
          {/* Big 404 */}
          <div
            style={{
              fontSize: "clamp(80px, 15vw, 160px)",
              fontWeight: 900,
              letterSpacing: "-6px",
              lineHeight: 1,
              background: "linear-gradient(135deg, #1d4ed8 0%, #93c5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 24,
            }}
          >
            404
          </div>

          <h1
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.6px",
              marginBottom: 12,
            }}
          >
            This page doesn&apos;t exist
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "#6b7280",
              lineHeight: 1.65,
              maxWidth: 420,
              marginBottom: 40,
            }}
          >
            It may have been moved, renamed, or never existed. Let&apos;s get you back on track.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                background: "#3b82f6",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 2px 10px rgba(59,130,246,0.35)",
              }}
            >
              ← Back to homepage
            </a>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 15,
                background: "#fff",
                color: "#374151",
                textDecoration: "none",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              Contact support
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
