'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────────
export interface DocSection {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

// ─── Chevron SVG ────────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.2s',
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ─── TOC item renderer (shared between desktop & mobile) ────────────────────────
function TocItem({
  section,
  isActive,
  onClick,
  mobile,
}: {
  section: DocSection;
  isActive: boolean;
  onClick: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: mobile ? '10px 12px' : '7px 12px',
        borderRadius: 8,
        border: 'none',
        background: isActive ? 'rgba(59,130,246,0.06)' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: mobile ? 14 : 13,
        fontWeight: isActive ? 600 : 400,
        color: isActive ? '#3b82f6' : mobile ? '#4b5563' : '#6b7280',
        borderLeft: mobile ? undefined : isActive ? '2px solid #3b82f6' : '2px solid transparent',
        transition: 'all 0.15s',
      }}
    >
      <span style={{ fontSize: mobile ? 15 : 14, lineHeight: 1 }}>{section.icon}</span>
      <span style={{ whiteSpace: mobile ? undefined : 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {section.title}
      </span>
    </button>
  );
}

// ─── DocsClient ─────────────────────────────────────────────────────────────────
export default function DocsClient({ sections }: { sections: DocSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [tocOpen, setTocOpen] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // ── Scroll spy via IntersectionObserver ──────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
    );

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) {
        sectionRefs.current.set(s.id, el);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const toggle = useCallback((id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTocOpen(false);
      setCollapsed(prev => ({ ...prev, [id]: false }));
    }
  }, []);

  // ── Section content renderer ────────────────────────────────────────────────
  const renderSections = (
    <div className="docs-content-area" style={{ flex: 1, minWidth: 0, maxWidth: '100%', paddingBottom: 80, overflowX: 'hidden' }}>
      {sections.map(s => {
        const isOpen = collapsed[s.id] !== true;
        return (
          <section
            key={s.id}
            id={s.id}
            style={{
              scrollMarginTop: 80,
              marginBottom: 8,
              borderBottom: '1px solid #f3f4f6',
              paddingBottom: 8,
            }}
          >
            <button
              onClick={() => toggle(s.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '20px 0',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <h2 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.3px',
                  margin: 0,
                }}>
                  {s.title}
                </h2>
              </div>
              <Chevron open={isOpen} />
            </button>

            {isOpen && (
              <div style={{
                paddingBottom: 24,
                fontSize: 15,
                color: '#4b5563',
                lineHeight: 1.75,
              }}>
                {s.content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );

  return (
    <>
      <style>{`
        .docs-toc-desktop { display: block; }
        .docs-toc-mobile-wrap { display: none; }
        .docs-flex-row { gap: 48px; }
        @media (max-width: 1023px) {
          .docs-toc-desktop { display: none !important; }
          .docs-toc-mobile-wrap { display: block !important; }
          .docs-content-area section { scroll-margin-top: 148px !important; }
          .docs-content-area { padding-top: 76px; }
          .docs-flex-row { gap: 0 !important; }
        }
      `}</style>

      {/* ══════════ Mobile TOC — fixed below nav ══════════ */}
      <div className="docs-toc-mobile-wrap" style={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 24px',
      }}>
        <button
          onClick={() => setTocOpen(o => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '10px 16px',
            borderRadius: 10,
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            color: '#374151',
          }}
        >
          <span>Table of Contents</span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: tocOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {tocOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 12,
            right: 12,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            maxHeight: '60vh',
            overflowY: 'auto',
            zIndex: 50,
            padding: 8,
            marginTop: 4,
          }}>
            {sections.map(s => (
              <TocItem
                key={s.id}
                section={s}
                isActive={activeId === s.id}
                onClick={() => scrollTo(s.id)}
                mobile
              />
            ))}
          </div>
        )}
      </div>

      {/* ══════════ Desktop: sidebar + content row ══════════ */}
      <div className="docs-flex-row" style={{
        display: 'flex',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 24px',
        overflowX: 'hidden',
      }}>
        {/* Desktop TOC Sidebar */}
        <nav className="docs-toc-desktop" style={{
          width: 240,
          flexShrink: 0,
          position: 'sticky',
          top: 88,
          alignSelf: 'flex-start',
          maxHeight: 'calc(100vh - 104px)',
          overflowY: 'auto',
          paddingBottom: 32,
        }}>
          <p style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#9ca3af',
            textTransform: 'uppercase',
            marginBottom: 16,
            paddingLeft: 12,
          }}>
            Table of Contents
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sections.map(s => (
              <li key={s.id}>
                <TocItem
                  section={s}
                  isActive={activeId === s.id}
                  onClick={() => scrollTo(s.id)}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        {renderSections}
      </div>
    </>
  );
}
