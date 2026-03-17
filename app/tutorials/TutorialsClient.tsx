'use client'

import { useState, useEffect, useCallback } from 'react'

const CATEGORIES = [
  { id: 'start',    label: 'Getting Started',      emoji: '\u{1F680}', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'prod',     label: 'Production Features',   emoji: '\u26A1',    color: '#f59e0b', bg: '#fffbeb' },
  { id: 'ai',       label: 'AI Agents',             emoji: '\u{1F916}', color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'signage',  label: 'Displays & Signage',    emoji: '\u{1F4FA}', color: '#10b981', bg: '#ecfdf5' },
  { id: 'advanced', label: 'Advanced & Operations', emoji: '\u{1F3AF}', color: '#ef4444', bg: '#fef2f2' },
]

type Episode = {
  num: string
  shortTitle: string
  duration: string
  desc: string
  category: string
  youtubeUrl: string | null
  accentColor: string
}

function getVideoId(url: string): string {
  const match = url.match(/[?&]v=([^&]+)/)
  return match ? match[1] : ''
}

function ThumbnailPlaceholder({ num, accentColor, youtubeUrl }: {
  num: string; accentColor: string; youtubeUrl: string | null
}) {
  const videoId = youtubeUrl ? getVideoId(youtubeUrl) : null
  return (
    <div style={{
      position: 'relative', width: '100%', paddingBottom: '56.25%',
      background: '#0f172a', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* YouTube thumbnail as background */}
      {videoId && (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      <div style={{
        position: 'absolute', top: 10, left: 12,
        background: accentColor, color: '#fff',
        fontSize: 10, fontWeight: 800, padding: '3px 8px',
        borderRadius: 4, letterSpacing: '0.05em', zIndex: 1,
      }}>
        #{num}
      </div>
      {!youtubeUrl && (
        <div style={{
          position: 'absolute', top: 10, right: 12,
          background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)',
          fontSize: 9, fontWeight: 600, padding: '3px 7px',
          borderRadius: 4, letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 1,
        }}>
          Coming soon
        </div>
      )}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 44, height: 44, borderRadius: '50%',
        background: youtubeUrl ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1,
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M5 3.5L13 8L5 12.5V3.5Z" fill="#fff" />
        </svg>
      </div>
      {!videoId && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />
          <div style={{
            position: 'absolute', bottom: 8, left: 12,
            fontSize: 10, fontWeight: 800, letterSpacing: '-0.3px',
            color: 'rgba(255,255,255,0.2)', zIndex: 1,
          }}>
            Cue<span style={{ color: accentColor, opacity: 0.4 }}>Deck</span>
          </div>
        </>
      )}
    </div>
  )
}

function VideoModal({ videoId, title, onClose }: {
  videoId: string; title: string; onClose: () => void
}) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998 }}>
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(4px)',
        }}
      />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw', maxWidth: 960,
        borderRadius: 12, overflow: 'hidden',
        background: '#000',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.1)', border: 'none',
            borderRadius: 8, cursor: 'pointer', zIndex: 2,
            color: '#fff', fontSize: 18, fontWeight: 600,
          }}
        >
          ✕
        </button>
        <div style={{
          padding: '14px 52px 14px 20px',
          background: 'rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{title}</span>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', border: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}

function EpisodeCard({ ep, onPlay }: { ep: Episode; onPlay: (ep: Episode) => void }) {
  const cardBody = (
    <div className="tutorial-card-inner">
      <ThumbnailPlaceholder num={ep.num} accentColor={ep.accentColor} youtubeUrl={ep.youtubeUrl} />
      <div style={{ padding: '14px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: ep.accentColor,
            background: `${ep.accentColor}15`, padding: '2px 7px', borderRadius: 4,
          }}>
            Ep {ep.num}
          </span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>{ep.duration}</span>
        </div>
        <h3 style={{
          fontSize: 13.5, fontWeight: 700, color: '#111827',
          lineHeight: 1.35, marginBottom: 8, letterSpacing: '-0.2px', flex: 1,
        }}>
          {ep.shortTitle}
        </h3>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.55, margin: 0 }}>
          {ep.desc}
        </p>
        <div style={{ marginTop: 12 }}>
          {ep.youtubeUrl ? (
            <span style={{ fontSize: 12.5, fontWeight: 600, color: ep.accentColor }}>
              Watch now →
            </span>
          ) : (
            <span style={{ fontSize: 11.5, color: '#9ca3af' }}>Coming soon</span>
          )}
        </div>
      </div>
    </div>
  )

  if (ep.youtubeUrl) {
    return (
      <div
        onClick={() => onPlay(ep)}
        className="tutorial-card"
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onPlay(ep) }}
      >
        {cardBody}
      </div>
    )
  }
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{cardBody}</div>
}

export default function TutorialsClient({ episodes }: { episodes: Episode[] }) {
  const [activeVideo, setActiveVideo] = useState<Episode | null>(null)

  const episodesByCategory = CATEGORIES.map(cat => ({
    ...cat,
    episodes: episodes.filter(ep => ep.category === cat.id),
  }))

  return (
    <>
      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1e40af 100%)',
        padding: '80px 40px 72px', textAlign: 'center',
      }}>
        <p style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
          color: '#93c5fd', textTransform: 'uppercase', marginBottom: 16,
        }}>
          TUTORIAL SERIES
        </p>
        <h1 style={{
          fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 800, color: '#fff',
          letterSpacing: '-1.5px', marginBottom: 18, lineHeight: 1.1,
        }}>
          Learn CueDeck
        </h1>
        <p style={{
          fontSize: 18, color: '#93c5fd', maxWidth: 560, margin: '0 auto 44px', lineHeight: 1.6,
        }}>
          The complete guide to running live events with CueDeck — from first setup to
          AI-assisted production. 21 episodes covering every feature.
        </p>

        <div className="tutorials-hero-stats" style={{
          display: 'flex', gap: 40, justifyContent: 'center',
          alignItems: 'center', flexWrap: 'wrap',
        }}>
          {[
            { value: '21',      label: 'Episodes' },
            { value: '~5 hrs',  label: 'Total runtime' },
            { value: '5',       label: 'Categories' },
            { value: 'Free',    label: 'Always free' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 500, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 36,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          padding: '10px 22px', borderRadius: 50,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#34d399', boxShadow: '0 0 8px #34d399',
          }} />
          <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>
            9 of 21 episodes live — more coming soon
          </span>
        </div>
      </div>

      {/* ── Episode categories ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 80px' }}>
        {episodesByCategory.map(cat => (
          <section key={cat.id} style={{ marginBottom: 68 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 24, paddingBottom: 16,
              borderBottom: `2px solid ${cat.color}20`,
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: cat.bg, border: `1px solid ${cat.color}25`,
                padding: '6px 14px', borderRadius: 20,
              }}>
                <span style={{ fontSize: 15 }}>{cat.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: cat.color, letterSpacing: '-0.2px' }}>
                  {cat.label}
                </span>
              </div>
              <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>
                {cat.episodes.length} episode{cat.episodes.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="tutorials-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 18,
              alignItems: 'start',
            }}>
              {cat.episodes.map(ep => (
                <EpisodeCard key={ep.num} ep={ep} onPlay={setActiveVideo} />
              ))}
            </div>
          </section>
        ))}

        {/* ── Bottom CTA ── */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
          border: '1px solid #dbeafe', borderRadius: 16,
          padding: '48px 40px', textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800,
            color: '#111827', letterSpacing: '-0.5px', marginBottom: 12,
          }}>
            Ready to follow along?
          </h2>
          <p style={{
            fontSize: 16, color: '#6b7280', marginBottom: 28,
            maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.6,
          }}>
            Start your free trial and open the console while you watch — the best way to learn CueDeck is hands-on.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.cuedeck.io/#signup" style={{
              fontSize: 15, fontWeight: 700, padding: '12px 28px', borderRadius: 10,
              background: '#3b82f6', color: '#fff', textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
            }}>
              Start free trial
            </a>
            <a href="https://www.youtube.com/@CueDeckApp" target="_blank" rel="noopener noreferrer" style={{
              fontSize: 15, fontWeight: 600, padding: '12px 28px', borderRadius: 10,
              background: '#fff', color: '#374151', textDecoration: 'none',
              border: '1.5px solid #e5e7eb',
            }}>
              Subscribe on YouTube →
            </a>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {activeVideo && activeVideo.youtubeUrl && (
        <VideoModal
          videoId={getVideoId(activeVideo.youtubeUrl)}
          title={`Ep ${activeVideo.num}: ${activeVideo.shortTitle}`}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  )
}
