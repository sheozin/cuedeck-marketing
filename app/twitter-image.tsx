import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CueDeck — The Command Center for Live Events'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)',
          padding: '80px',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Logo mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
            }}
          >
            <svg viewBox="0 0 64 64" width="44" height="44">
              <path
                d="M 40 17 A 17 17 0 1 0 40 47"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: '-2px', display: 'flex' }}>
            <span style={{ color: '#ffffff' }}>Cue</span>
            <span style={{ color: '#60a5fa' }}>Deck</span>
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 34,
            color: 'rgba(255,255,255,0.72)',
            fontWeight: 500,
            lineHeight: 1.35,
            maxWidth: 680,
            display: 'flex',
          }}
        >
          The Command Center for Live Events
        </div>

        {/* Divider */}
        <div
          style={{
            width: 64,
            height: 4,
            background: '#60a5fa',
            borderRadius: 4,
            marginTop: 40,
            display: 'flex',
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            position: 'absolute',
            bottom: 64,
            left: 80,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Role pills */}
          <div style={{ display: 'flex', gap: 10 }}>
            {['Director', 'Stage', 'AV', 'Signage', 'Realtime'].map((label) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 99,
                  padding: '7px 16px',
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 15,
                  fontWeight: 600,
                  display: 'flex',
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Domain */}
          <div
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: 18,
              fontWeight: 500,
              display: 'flex',
            }}
          >
            cuedeck.io
          </div>
        </div>
      </div>
    ),
    size,
  )
}
