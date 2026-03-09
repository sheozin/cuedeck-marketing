const APP_URL = "https://app.cuedeck.io";

export default function Footer() {
  return (
    <footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "40px 40px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
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
