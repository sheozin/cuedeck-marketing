'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCmsClient } from '@/lib/supabase/cms-client';

// Cloudflare Turnstile. This login shares the app.cuedeck.io Supabase
// project, which checks a CAPTCHA token on every sign-in once CAPTCHA is on.
// The same public site key as cuedeck-auth.js in the console repo. Empty
// means no widget and no token, which Supabase accepts while CAPTCHA is off.
const TURNSTILE_SITE_KEY = '';

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
};

function useTurnstile() {
  const slot = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !slot.current) return;
    const el = slot.current;
    const render = () => {
      const t = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (!t || widget.current) return;
      widget.current = t.render(el, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: 'interaction-only',
        callback: (tok: string) => setToken(tok),
        'expired-callback': () => setToken(null),
        'error-callback': () => { setToken(null); setFailed(true); },
      });
    };
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
    if (existing) { render(); existing.addEventListener('load', render); return; }
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.dataset.turnstile = '1';
    s.addEventListener('load', render);
    s.addEventListener('error', () => setFailed(true));
    document.head.appendChild(s);
  }, []);
  const reset = () => {
    setToken(null);
    const t = (window as unknown as { turnstile?: Turnstile }).turnstile;
    if (t && widget.current) t.reset(widget.current);
  };
  return { slot, token, reset, failed, required: Boolean(TURNSTILE_SITE_KEY) };
}

function authMessage(error: { code?: string; message: string }) {
  if (error.code === 'captcha_failed') return 'The security check failed. Reload the page and try again.';
  if (error.code === 'invalid_credentials') return 'That email and password do not match.';
  return error.message;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Validate next to prevent open redirect — must be a relative /admin path
  const rawNext = searchParams.get('next') ?? '/admin';
  const next = rawNext.startsWith('/admin') ? rawNext : '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicSent, setMagicSent] = useState(false);

  const supabase = getCmsClient();
  const captcha = useTurnstile();
  const captchaMissing = () => {
    if (captcha.required && !captcha.token) {
      setError(captcha.failed
        ? 'The security check could not load. Check your connection, disable any blocker for this page, and reload.'
        : 'The security check has not finished yet. Wait a moment and try again.');
      return true;
    }
    return false;
  };

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (captchaMissing()) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password, options: { captchaToken: captcha.token ?? undefined } });
    captcha.reset();
    setLoading(false);
    if (error) { setError(authMessage(error)); return; }
    router.push(next);
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (captchaMissing()) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        captchaToken: captcha.token ?? undefined,
      },
    });
    captcha.reset();
    setLoading(false);
    if (error) { setError(authMessage(error)); return; }
    setMagicSent(true);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0E1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 800,
            letterSpacing: '-0.3px',
            color: '#fff',
            marginBottom: '8px',
          }}>
            Cue<span style={{ color: '#3b82f6' }}>Deck</span>
          </div>
          <div style={{ color: '#64748b', fontSize: '14px' }}>
            CMS Admin Dashboard
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#f1f5f9',
            marginBottom: '24px',
          }}>
            Sign in to your account
          </h1>

          {magicSent ? (
            <div style={{
              background: 'rgba(74,142,255,0.1)',
              border: '1px solid rgba(74,142,255,0.3)',
              borderRadius: '8px',
              padding: '16px',
              color: '#93c5fd',
              fontSize: '14px',
              lineHeight: 1.6,
            }}>
              ✓ Magic link sent to <strong>{email}</strong>. Check your inbox and click the link to sign in.
            </div>
          ) : (
            <>
              {/* Mode toggle */}
              <div style={{
                display: 'flex',
                background: '#0A0E1A',
                borderRadius: '8px',
                padding: '4px',
                marginBottom: '24px',
                gap: '4px',
              }}>
                {(['password', 'magic'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 500,
                      background: mode === m ? '#1e293b' : 'transparent',
                      color: mode === m ? '#f1f5f9' : '#64748b',
                      transition: 'all 0.15s',
                    }}
                  >
                    {m === 'password' ? 'Password' : 'Magic Link'}
                  </button>
                ))}
              </div>

              <form onSubmit={mode === 'password' ? handlePasswordLogin : handleMagicLink}>
                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px', fontWeight: 500 }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@cuedeck.io"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#0A0E1A',
                      border: '1px solid #1e293b',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Password (only in password mode) */}
                {mode === 'password' && (
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px', fontWeight: 500 }}>
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#0A0E1A',
                        border: '1px solid #1e293b',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                )}

                {mode === 'magic' && <div style={{ marginBottom: '24px' }} />}

                {error && (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#fca5a5',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '11px',
                    background: loading ? '#1e40af' : '#4A8EFF',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.15s',
                  }}
                >
                  {loading ? 'Signing in…' : mode === 'password' ? 'Sign in' : 'Send magic link'}
                </button>
                <div ref={captcha.slot} style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }} />
              </form>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#475569' }}>
          CueDeck CMS · For authorized users only
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
