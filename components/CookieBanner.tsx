'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

const CONSENT_KEY = 'cd_analytics_consent'

export default function CookieBanner() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored as 'accepted' | 'declined')
    } else {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setConsent('declined')
    setVisible(false)
  }

  return (
    <>
      {/* Only inject analytics script after explicit acceptance */}
      {consent === 'accepted' && <Analytics />}

      {/* Banner */}
      {visible && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'min(calc(100vw - 32px), 640px)',
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.55,
              flex: '1 1 260px',
              margin: 0,
            }}
          >
            We use analytics to understand how visitors use CueDeck.
            See our{' '}
            <a
              href="/privacy"
              style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}
            >
              Privacy Policy
            </a>
            .
          </p>

          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button
              onClick={decline}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              Decline
            </button>
            <button
              onClick={accept}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(59,130,246,0.4)',
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  )
}
