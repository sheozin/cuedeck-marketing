import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg viewBox="0 0 64 64" width="120" height="120">
          <path
            d="M 40 17 A 17 17 0 1 0 40 47"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    size,
  )
}
