'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      style={{
        padding: '80px 40px',
        background: '#fff',
        borderTop: '1px solid #f3f4f6',
        borderBottom: '1px solid #f3f4f6',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: '#3b82f6',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Stay in the loop
        </p>
        <h2
          style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '-0.6px',
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          Get tips from the production floor
        </h2>
        <p
          style={{
            fontSize: 16,
            color: '#6b7280',
            lineHeight: 1.65,
            marginBottom: 36,
          }}
        >
          Occasional updates on event operations, product news, and how teams are using CueDeck. No spam.
        </p>

        {status === 'success' ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '16px 24px',
              borderRadius: 12,
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#15803d',
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            ✓ You&apos;re on the list — we&apos;ll be in touch!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              style={{
                flex: '1 1 240px',
                maxWidth: 320,
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #d1d5db',
                fontSize: 15,
                color: '#111827',
                outline: 'none',
                background: '#fff',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '12px 24px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                cursor: 'pointer',
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(59,130,246,0.35)',
                opacity: status === 'loading' ? 0.7 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'loading' ? 'Joining…' : 'Subscribe →'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p style={{ marginTop: 12, fontSize: 13, color: '#ef4444' }}>
            Something went wrong. Email us at{' '}
            <a href="mailto:hello@cuedeck.io" style={{ color: '#3b82f6' }}>
              hello@cuedeck.io
            </a>
          </p>
        )}

        <p style={{ marginTop: 20, fontSize: 13, color: '#9ca3af' }}>
          Ready to start?{' '}
          <a
            href="https://app.cuedeck.io/#signup"
            style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}
          >
            Create your free account →
          </a>
        </p>
      </div>
    </section>
  )
}
