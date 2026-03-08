'use client';

import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Plan {
  name: string;
  price: { monthly: number; annual: number } | null;
  description: string;
  highlight: boolean;
  badge: string | null;
  features: string[];
  cta: string;
  ctaHref: string;
  ctaStyle: string;
}

interface CurrencyConfig {
  symbol: string;
  factor: number;
  code: string;
}

// ─── Currency Map ─────────────────────────────────────────────────────────────
const CURRENCIES: Record<string, CurrencyConfig> = {
  EUR: { symbol: '€', factor: 1.0,  code: 'EUR' },
  USD: { symbol: '$', factor: 1.08, code: 'USD' },
  GBP: { symbol: '£', factor: 0.86, code: 'GBP' },
  AED: { symbol: 'AED ', factor: 3.97, code: 'AED' },
  SGD: { symbol: 'S$', factor: 1.46, code: 'SGD' },
};

const SUPPORTED_CODES = Object.keys(CURRENCIES);
const DEFAULT_CURRENCY = 'EUR';
const LS_KEY = 'cd_currency';

// ─── IconCheck SVG ────────────────────────────────────────────────────────────
function IconCheck({ highlighted }: { highlighted: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={highlighted ? '#93c5fd' : '#22c55e'}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── PricingClient ────────────────────────────────────────────────────────────
export default function PricingClient({ plans }: { plans: Plan[] }) {
  const [annual, setAnnual] = useState(false);
  const [currencyCode, setCurrencyCode] = useState<string>(DEFAULT_CURRENCY);
  const [currencyLoaded, setCurrencyLoaded] = useState(false);

  // Detect currency on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(LS_KEY) : null;
    if (stored && SUPPORTED_CODES.includes(stored)) {
      setCurrencyCode(stored);
      setCurrencyLoaded(true);
      return;
    }

    (async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
        if (!res.ok) throw new Error('ipapi failed');
        const data = await res.json();
        const detected: string = data?.currency ?? DEFAULT_CURRENCY;
        const code = SUPPORTED_CODES.includes(detected) ? detected : DEFAULT_CURRENCY;
        setCurrencyCode(code);
      } catch {
        // silent fallback to EUR
      } finally {
        setCurrencyLoaded(true);
      }
    })();
  }, []);

  function handleCurrencyChange(code: string) {
    setCurrencyCode(code);
    try {
      localStorage.setItem(LS_KEY, code);
    } catch {
      // ignore
    }
  }

  const currency = CURRENCIES[currencyCode] ?? CURRENCIES[DEFAULT_CURRENCY];

  function formatPrice(base: number): string {
    return `${currency.symbol}${Math.round(base * currency.factor)}`;
  }

  return (
    <>
      {/* Currency selector + toggle row */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        marginBottom: 48,
      }}>
        {/* Monthly / Annual toggle */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          background: '#f3f4f6',
          borderRadius: 12,
          padding: 4,
        }}>
          <button
            onClick={() => setAnnual(false)}
            style={{
              padding: '8px 20px',
              borderRadius: 9,
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: !annual ? '#fff' : 'transparent',
              color: !annual ? '#111827' : '#6b7280',
              boxShadow: !annual ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            style={{
              padding: '8px 20px',
              borderRadius: 9,
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              background: annual ? '#fff' : 'transparent',
              color: annual ? '#111827' : '#6b7280',
              boxShadow: annual ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Annual
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#16a34a',
              background: '#dcfce7',
              border: '1px solid #bbf7d0',
              borderRadius: 99,
              padding: '2px 8px',
            }}>
              Save 20%
            </span>
          </button>
        </div>

        {/* Currency selector */}
        {currencyLoaded && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>Currency:</span>
            <select
              value={currencyCode}
              onChange={e => handleCurrencyChange(e.target.value)}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: '5px 10px',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {SUPPORTED_CODES.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Plan cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        alignItems: 'start',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {plans.map(plan => (
          <div
            key={plan.name}
            style={{
              borderRadius: 16,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              background: plan.highlight ? '#1e40af' : '#fff',
              border: plan.highlight ? 'none' : '1px solid #e5e7eb',
              boxShadow: plan.highlight
                ? '0 20px 40px rgba(30,64,175,0.3)'
                : '0 1px 4px rgba(0,0,0,0.04)',
              position: 'relative',
            }}
          >
            {/* Badge */}
            {plan.badge && (
              <div style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#3b82f6',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                padding: '4px 14px',
                borderRadius: 99,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(59,130,246,0.4)',
              }}>
                {plan.badge}
              </div>
            )}

            {/* Plan header */}
            <div style={{ marginBottom: 24 }}>
              <p style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#3b82f6',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                {plan.name}
              </p>

              {plan.price ? (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 8 }}>
                  <span style={{
                    fontSize: 44,
                    fontWeight: 800,
                    letterSpacing: '-1px',
                    color: plan.highlight ? '#fff' : '#111827',
                    lineHeight: 1,
                  }}>
                    {formatPrice(annual ? plan.price.annual : plan.price.monthly)}
                  </span>
                  <span style={{
                    fontSize: 14,
                    color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#9ca3af',
                    paddingBottom: 6,
                  }}>
                    /month
                  </span>
                </div>
              ) : (
                <div style={{
                  fontSize: 44,
                  fontWeight: 800,
                  letterSpacing: '-1px',
                  color: plan.highlight ? '#fff' : '#111827',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  Custom
                </div>
              )}

              {annual && plan.price && (
                <p style={{
                  fontSize: 12,
                  color: plan.highlight ? 'rgba(255,255,255,0.55)' : '#9ca3af',
                  marginBottom: 4,
                }}>
                  Billed annually
                </p>
              )}

              <p style={{
                fontSize: 13,
                color: plan.highlight ? 'rgba(255,255,255,0.65)' : '#6b7280',
                lineHeight: 1.55,
              }}>
                {plan.description}
              </p>
            </div>

            {/* Features */}
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 28,
              flex: 1,
              listStyle: 'none',
              padding: 0,
              margin: '0 0 28px 0',
            }}>
              {plan.features.map(f => (
                <li key={f} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: plan.highlight ? 'rgba(255,255,255,0.85)' : '#374151',
                }}>
                  <IconCheck highlighted={plan.highlight} />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <a
              href={plan.ctaHref}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px 20px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none',
                ...(plan.highlight
                  ? {
                      background: 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.25)',
                    }
                  : plan.ctaStyle === 'filled'
                  ? {
                      background: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      boxShadow: '0 2px 8px rgba(59,130,246,0.35)',
                    }
                  : {
                      background: '#fff',
                      color: '#374151',
                      border: '1px solid #e5e7eb',
                    }),
              }}
            >
              {plan.cta} →
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
