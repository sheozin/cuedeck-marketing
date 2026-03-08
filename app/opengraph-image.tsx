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
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '99px',
            padding: '8px 20px',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              color: '#93c5fd',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            LIVE EVENT OPERATIONS PLATFORM
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 0.95,
            letterSpacing: '-4px',
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          CueDeck
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
