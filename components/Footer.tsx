const APP_URL = "https://app.cuedeck.io";

export default function Footer() {
  return (
    <footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "40px 40px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>
          <svg viewBox="0 0 64 64" width="22" height="22" style={{ flexShrink: 0 }}>
            <defs>
              <linearGradient id="footer-logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1d4ed8"/>
                <stop offset="100%" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="14" fill="url(#footer-logo-bg)"/>
            <path d="M 40 17 A 17 17 0 1 0 40 47" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
          </svg>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", color: "#111827" }}>
            Cue<span style={{ color: "#3b82f6" }}>Deck</span>
          </span>
        </a>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Features", href: "/#features" },
            { label: "Pricing",  href: "/#pricing" },
            { label: "Docs",     href: "/docs" },
            { label: "Blog",     href: "/blog" },
            { label: "About",    href: "/about" },
            { label: "Contact",  href: "/contact" },
            { label: "Privacy",  href: "/privacy" },
            { label: "Terms",    href: "/terms" },
            { label: "Sign in",  href: APP_URL },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ fontSize: 13, color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>{link.label}</a>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 CueDeck. All rights reserved.</p>
      </div>
    </footer>
  );
}
