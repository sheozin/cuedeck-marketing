'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCmsStore } from '@/stores/cms-store';
import { getCmsClient } from '@/lib/supabase/cms-client';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: string;
  action: () => void;
}

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useCmsStore();
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<CommandItem[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const staticCommands: CommandItem[] = [
    { id: 'new-post', label: 'New Blog Post', icon: '✎', action: () => router.push('/admin/blog/new/edit') },
    { id: 'new-page', label: 'New Page', icon: '□', action: () => router.push('/admin/pages') },
    { id: 'media', label: 'Upload Media', icon: '⊟', action: () => router.push('/admin/media') },
    { id: 'blog', label: 'Blog Posts', icon: '✎', action: () => router.push('/admin/blog') },
    { id: 'pages', label: 'Pages', icon: '□', action: () => router.push('/admin/pages') },
    { id: 'testimonials', label: 'Testimonials', icon: '❝', action: () => router.push('/admin/testimonials') },
    { id: 'pricing', label: 'Pricing Plans', icon: '◈', action: () => router.push('/admin/pricing') },
    { id: 'faq', label: 'FAQs', icon: '?', action: () => router.push('/admin/faq') },
    { id: 'settings', label: 'Site Settings', icon: '⚙', action: () => router.push('/admin/settings') },
    { id: 'audit', label: 'Audit Log', icon: '◌', action: () => router.push('/admin/audit') },
    { id: 'live', label: 'View Live Site', icon: '↗', action: () => window.open('https://www.cuedeck.io', '_blank') },
  ];

  // Keyboard shortcut to open
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') setCommandPaletteOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Filter items
  useEffect(() => {
    const q = query.toLowerCase();
    const filtered = staticCommands.filter(
      (c) =>
        !q ||
        c.label.toLowerCase().includes(q) ||
        (c.description?.toLowerCase().includes(q) ?? false)
    );
    setItems(filtered);
    setSelected(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Also search blog posts
  useEffect(() => {
    if (!query || query.length < 2) return;
    const supabase = getCmsClient();
    supabase
      .from('blog_posts')
      .select('id, title, slug, status')
      .ilike('title', `%${query}%`)
      .limit(5)
      .then(({ data }: { data: any[] | null }) => {
        if (!data) return;
        const postItems: CommandItem[] = data.map((p) => ({
          id: `post-${p.id}`,
          label: p.title,
          description: `Blog post · ${p.status}`,
          icon: '✎',
          action: () => router.push(`/admin/blog/${p.id}/edit`),
        }));
        setItems((prev) => [...prev, ...postItems]);
      });
  }, [query, router]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && items[selected]) {
      items[selected].action();
      setCommandPaletteOpen(false);
    }
  }

  if (!commandPaletteOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 260,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '120px',
      }}
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          background: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          borderBottom: '1px solid #1e293b',
        }}>
          <span style={{ fontSize: '16px', color: '#64748b' }}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, posts, actions…"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#f1f5f9',
              fontSize: '15px',
            }}
          />
          <kbd style={{
            padding: '3px 7px',
            background: '#0A0E1A',
            borderRadius: '5px',
            fontSize: '11px',
            color: '#64748b',
          }}>Esc</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {items.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#475569', fontSize: '14px' }}>
              No results for &quot;{query}&quot;
            </div>
          ) : (
            items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => { item.action(); setCommandPaletteOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: i === selected ? 'rgba(74,142,255,0.1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderLeft: i === selected ? '2px solid #4A8EFF' : '2px solid transparent',
                }}
                onMouseEnter={() => setSelected(i)}
              >
                <span style={{ fontSize: '16px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '14px', color: '#f1f5f9', fontWeight: 500 }}>{item.label}</div>
                  {item.description && (
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>{item.description}</div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        <div style={{
          padding: '10px 16px',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          gap: '16px',
          fontSize: '11px',
          color: '#475569',
        }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );
}
