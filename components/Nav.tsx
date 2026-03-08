"use client";

const APP_URL = "https://app.cuedeck.io";
const TRIAL_URL = `${APP_URL}/#signup`;

export default function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #e5e7eb",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: "64px",
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
            Cue<span style={{ color: "#3b82f6" }}>Deck</span>
          </span>
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <a href="/#features" style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>Features</a>
        <a href="/#how"      style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>How it works</a>
        <a href="/#pricing"  style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>Pricing</a>
        <a href="/blog"      style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>Blog</a>
        <a href="/about"     style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>About</a>
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
