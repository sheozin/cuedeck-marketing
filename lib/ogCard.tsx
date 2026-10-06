// The 1200x630 social card for the /solutions pages, in the style of the
// root app/opengraph-image.tsx: dark blue gradient, logo mark, one headline.
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogCard(badge: string, title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "80px", background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 48 }}>
          <div style={{ width: 56, height: 56, borderRadius: 13, background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 64 64" width="40" height="40">
              <path d="M 40 17 A 17 17 0 1 0 40 47" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>
            Cue<span style={{ color: "#60a5fa" }}>Deck</span>
          </div>
        </div>
        <div style={{ display: "flex", color: "#93c5fd", fontSize: 22, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 20 }}>{badge}</div>
        <div style={{ display: "flex", color: "#fff", fontSize: 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 28, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.75)", fontSize: 28, lineHeight: 1.4, maxWidth: 980 }}>{subtitle}</div>
      </div>
    ),
    ogSize,
  );
}
