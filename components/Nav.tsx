"use client";
import { useState } from "react";

const APP_URL = "https://app.cuedeck.io";
const TRIAL_URL = `${APP_URL}/#signup`;

const links = [
  { label: "Features",     href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Pricing",      href: "/pricing" },
  { label: "Docs",         href: "/docs" },
  { label: "Blog",         href: "/blog" },
  { label: "About",        href: "/about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #e5e7eb",
    }}>
      {/* Desktop + Mobile top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: "64px", maxWidth: 1280, margin: "0 auto",
      }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
            Cue<span style={{ color: "#3b82f6" }}>Deck</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: "28px" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: 14, color: "#4b5563", textDecoration: "none", fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: "12px" }}>
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

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#374151" }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="lg:hidden" style={{
          background: "#fff", borderTop: "1px solid #f3f4f6",
          padding: "12px 24px 20px",
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "12px 0", fontSize: 15, fontWeight: 500,
              color: "#374151", textDecoration: "none", borderBottom: "1px solid #f9fafb",
            }}>
              {l.label}
            </a>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
            <a href={APP_URL} style={{
              textAlign: "center", padding: "11px", borderRadius: "10px",
              fontSize: 14, fontWeight: 600, color: "#374151", textDecoration: "none",
              border: "1.5px solid #e5e7eb",
            }}>Sign in</a>
            <a href={TRIAL_URL} style={{
              textAlign: "center", padding: "11px", borderRadius: "10px",
              fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none",
              background: "#3b82f6", boxShadow: "0 2px 6px rgba(59,130,246,0.4)",
            }}>Start free trial</a>
          </div>
        </div>
      )}
    </nav>
  );
}
