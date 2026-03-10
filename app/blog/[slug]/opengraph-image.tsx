import { ImageResponse } from 'next/og'
import { getPost } from '../../../lib/posts'

export const runtime = 'nodejs'
export const alt = 'CueDeck Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  const title = post?.title || 'CueDeck Blog'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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
            marginBottom: '32px',
          }}
        >
          <span style={{ color: '#93c5fd', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em' }}>
            CUEDECK BLOG
          </span>
        </div>

        {/* Post title */}
        <div
          style={{
            fontSize: title.length > 50 ? 48 : 56,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-2px',
            maxWidth: 900,
            display: 'flex',
          }}
        >
          {title}
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

        {/* Bottom: logo + domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            left: 80,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
              }}
            >
              <svg viewBox="0 0 64 64" width="28" height="28">
                <path
                  d="M 40 17 A 17 17 0 1 0 40 47"
                  stroke="white"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, display: 'flex' }}>
              <span style={{ color: '#ffffff' }}>Cue</span>
              <span style={{ color: '#60a5fa' }}>Deck</span>
            </span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 18, fontWeight: 500, display: 'flex' }}>
            cuedeck.io
          </div>
        </div>
      </div>
    ),
    size,
  )
}
