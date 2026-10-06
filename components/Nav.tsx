"use client";
import { useState } from "react";

const APP_URL = "https://app.cuedeck.io";
const TRIAL_URL = `${APP_URL}/#signup`;

const solutions = [
  { label: "Command Center",         href: "/solutions/command-center", desc: "Run of show, live cues and operator roles" },
  { label: "Stage Timer & Displays", href: "/solutions/stage-timer",    desc: "Speaker countdown and venue screens" },
  { label: "Event Check-in",         href: "/solutions/check-in",       desc: "Guest list, QR codes, desk and badges" },
];

const links = [
  { label: "Features",     href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Pricing",      href: "/pricing" },
  { label: "Tutorials",    href: "/tutorials" },
  { label: "Blog",         href: "/blog" },
  { label: "About",        href: "/about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);

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
        <a href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <svg viewBox="0 0 64 64" width="28" height="28" style={{ flexShrink: 0 }}>
            <defs>
              <linearGradient id="nav-logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1d4ed8"/>
                <stop offset="100%" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="14" fill="url(#nav-logo-bg)"/>
            <path d="M 40 17 A 17 17 0 1 0 40 47" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "#111827" }}>
            Cue<span style={{ color: "#3b82f6" }}>Deck</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: "28px" }}>
          <div style={{ position: "relative" }} onMouseEnter={() => setSolOpen(true)} onMouseLeave={() => setSolOpen(false)}>
            <button
              type="button"
              aria-expanded={solOpen}
              aria-haspopup="true"
              onClick={() => setSolOpen(o => !o)}
              onKeyDown={e => { if (e.key === "Escape") setSolOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 14, color: "#4b5563", fontWeight: 500, fontFamily: "inherit" }}
            >
              Solutions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ transform: solOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {solOpen && (
              <div style={{ position: "absolute", top: "100%", left: -16, paddingTop: 12 }}>
                <div style={{
                  width: 320, background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb",
                  boxShadow: "0 12px 32px rgba(15,23,42,0.12)", padding: 8,
                }}>
                  {solutions.map(s => (
                    <a key={s.href} href={s.href} onBlur={e => { if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) setSolOpen(false); }}
                      style={{ display: "block", padding: "10px 12px", borderRadius: 8, textDecoration: "none" }}>
                      <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#111827" }}>{s.label}</span>
                      <span style={{ display: "block", fontSize: 13, color: "#6b7280", marginTop: 2 }}>{s.desc}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
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
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9ca3af", padding: "8px 0 4px" }}>Solutions</p>
          {solutions.map(s => (
            <a key={s.href} href={s.href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "10px 0", textDecoration: "none", borderBottom: "1px solid #f9fafb",
            }}>
              <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#111827" }}>{s.label}</span>
              <span style={{ display: "block", fontSize: 13, color: "#6b7280", marginTop: 2 }}>{s.desc}</span>
            </a>
          ))}
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
