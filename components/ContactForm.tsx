'use client'

import { useState, type FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong.')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        padding: '32px 28px', borderRadius: 12,
        background: '#f0fdf4', border: '1px solid #bbf7d0',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>&#10003;</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#166534', marginBottom: 8 }}>
          Message sent!
        </h3>
        <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6 }}>
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            marginTop: 16, padding: '8px 20px', borderRadius: 8,
            border: '1px solid #d1d5db', background: '#fff',
            fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer',
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Name</label>
        <input type="text" name="name" required placeholder="Your name" style={{
          width: '100%', padding: '10px 14px', borderRadius: 8,
          border: '1px solid #d1d5db', fontSize: 14, color: '#111827',
          background: '#fff', outline: 'none', boxSizing: 'border-box',
        }} />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email</label>
        <input type="email" name="email" required placeholder="you@example.com" style={{
          width: '100%', padding: '10px 14px', borderRadius: 8,
          border: '1px solid #d1d5db', fontSize: 14, color: '#111827',
          background: '#fff', outline: 'none', boxSizing: 'border-box',
        }} />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Message</label>
        <textarea name="message" required rows={6} placeholder="Tell us what you need..." style={{
          width: '100%', padding: '10px 14px', borderRadius: 8,
          border: '1px solid #d1d5db', fontSize: 14, color: '#111827',
          background: '#fff', outline: 'none', resize: 'vertical',
          fontFamily: 'inherit', boxSizing: 'border-box',
        }} />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: 13, color: '#dc2626', margin: 0 }}>
          {errorMsg}
        </p>
      )}

      <div>
        <button type="submit" disabled={status === 'sending'} style={{
          padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          background: status === 'sending' ? '#93c5fd' : '#3b82f6',
          color: '#fff', border: 'none',
          boxShadow: '0 2px 8px rgba(59,130,246,0.35)',
          opacity: status === 'sending' ? 0.8 : 1,
        }}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
