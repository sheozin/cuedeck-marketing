const APP_URL = "https://app.cuedeck.io";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Command Center", href: "/solutions/command-center" },
      { label: "Stage Timer", href: "/solutions/stage-timer" },
      { label: "Event Check-in", href: "/solutions/check-in" },
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Blog", href: "/blog" },
      { label: "RSS", href: "/blog/feed.xml" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sign in", href: APP_URL },
    ],
  },
];

const SOCIALS = [
  {
    href: "https://x.com/cuedeck",
    label: "X (Twitter)",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    href: "https://linkedin.com/company/cuedeck",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://www.youtube.com/@CueDeckApp",
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

// Layout lives in this scoped <style> (the site's inline styles cannot hold
// media queries). Desktop: a call to action, then brand plus three link
// columns. Phone: the columns fold into dropdowns so the footer stays short.
const CSS = `
  .cd-footer { background: #0b1120; color: #cbd5e1; padding: 0 40px 28px; }
  .cd-footer-inner { max-width: 1200px; margin: 0 auto; }
  .cd-footer-cta { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; padding: 48px 0; border-bottom: 1px solid #1e293b; }
  .cd-footer-cta h2 { color: #fff; font-size: 26px; font-weight: 700; letter-spacing: -0.4px; margin: 0; }
  .cd-footer-cta p { color: #94a3b8; font-size: 15px; margin: 6px 0 0; }
  .cd-footer-btns { display: flex; gap: 12px; }
  .cd-footer-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 20px; border-radius: 10px; font-weight: 600; font-size: 15px; text-decoration: none; }
  .cd-footer-btn.primary { background: #3b82f6; color: #fff; }
  .cd-footer-btn.primary:hover { background: #2563eb; }
  .cd-footer-btn.secondary { border: 1px solid #334155; color: #e2e8f0; }
  .cd-footer-btn.secondary:hover { border-color: #64748b; }
  .cd-footer-top { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 40px; padding: 48px 0; }
  .cd-footer-tag { font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 14px 0 20px; max-width: 280px; }
  .cd-footer-socials { display: flex; gap: 12px; }
  .cd-footer-socials a { color: #94a3b8; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 9px; border: 1px solid #1e293b; background: #111a2e; transition: color .2s, border-color .2s; }
  .cd-footer-socials a:hover { color: #fff; border-color: #3b82f6; }
  .cd-footer-col h3 { font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #64748b; margin: 0 0 16px; }
  .cd-footer-col ul, .cd-footer-acc ul { list-style: none; margin: 0; padding: 0; }
  .cd-footer-col li { margin-bottom: 11px; }
  .cd-footer-col a, .cd-footer-acc a { font-size: 14px; color: #cbd5e1; text-decoration: none; }
  .cd-footer-col a:hover, .cd-footer-acc a:hover { color: #fff; }
  .cd-footer-accs { display: none; }
  .cd-footer-acc { border-bottom: 1px solid #1e293b; }
  .cd-footer-acc summary { list-style: none; display: flex; justify-content: space-between; align-items: center; min-height: 52px; cursor: pointer; font-size: 13px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #e2e8f0; }
  .cd-footer-acc summary::-webkit-details-marker { display: none; }
  .cd-footer-acc summary svg { transition: transform .2s; }
  .cd-footer-acc[open] summary svg { transform: rotate(180deg); }
  .cd-footer-acc ul { padding-bottom: 12px; }
  .cd-footer-acc a { display: block; padding: 10px 0; font-size: 15px; }
  .cd-footer-bottom { padding-top: 22px; border-top: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; font-size: 13px; color: #64748b; }
  .cd-footer-legal { display: flex; gap: 20px; }
  .cd-footer-legal a { color: #94a3b8; text-decoration: none; display: inline-block; padding: 6px 0; }
  .cd-footer-legal a:hover { color: #fff; }
  @media (max-width: 900px) {
    .cd-footer-top { grid-template-columns: repeat(3, 1fr); }
    .cd-footer-brand { grid-column: 1 / -1; }
  }
  @media (max-width: 640px) {
    .cd-footer { padding: 0 20px 24px; }
    .cd-footer-cta { padding: 36px 0; }
    .cd-footer-cta h2 { font-size: 22px; }
    .cd-footer-btns { width: 100%; }
    .cd-footer-btn { flex: 1; }
    .cd-footer-top { display: block; padding: 36px 0 8px; }
    .cd-footer-col { display: none; }
    .cd-footer-accs { display: block; margin-top: 28px; border-top: 1px solid #1e293b; }
    .cd-footer-bottom { flex-direction: column-reverse; align-items: flex-start; margin-top: 8px; border-top: none; }
  }
`;

const CHEVRON = (
  <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// cta={false} on pages that already end with their own call to action, so
// the page never shows two in a row.
export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="cd-footer">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cd-footer-inner">
        {cta && <div className="cd-footer-cta">
          <div>
            <h2>Run your next event from one screen</h2>
            <p>Real-time session management for live event production teams.</p>
          </div>
          <div className="cd-footer-btns">
            <a className="cd-footer-btn primary" href={APP_URL}>Open the app</a>
            <a className="cd-footer-btn secondary" href="/pricing">See pricing</a>
          </div>
        </div>}
        <div className="cd-footer-top">
          <div className="cd-footer-brand">
            <a href="/" aria-label="CueDeck home" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg viewBox="0 0 64 64" width="26" height="26" style={{ flexShrink: 0 }} aria-hidden="true">
                <defs>
                  <linearGradient id="footer-logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1d4ed8"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#footer-logo-bg)"/>
                <path d="M 40 17 A 17 17 0 1 0 40 47" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
              </svg>
              <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.4px", color: "#fff" }}>
                Cue<span style={{ color: "#3b82f6" }}>Deck</span>
              </span>
            </a>
            <p className="cd-footer-tag">Live event operations: command center, stage timer, signage and check-in.</p>
            <div className="cd-footer-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
            <div className="cd-footer-accs">
              {COLUMNS.map(col => (
                <details key={col.title} className="cd-footer-acc">
                  <summary>{col.title}{CHEVRON}</summary>
                  <ul>
                    {col.links.map(l => (
                      <li key={l.label}><a href={l.href}>{l.label}</a></li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
          {COLUMNS.map(col => (
            <div key={col.title} className="cd-footer-col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map(l => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="cd-footer-bottom">
          <p style={{ margin: 0 }}>© 2026 CueDeck. All rights reserved. Powered by AVE Events.</p>
          <div className="cd-footer-legal" role="navigation" aria-label="Legal">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
