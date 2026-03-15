'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCmsStore } from '@/stores/cms-store';
import { getCmsClient } from '@/lib/supabase/cms-client';

function getBreadcrumbs(pathname: string) {
  const segments = pathname.replace('/admin', '').split('/').filter(Boolean);
  const crumbs: { label: string; href: string }[] = [
    { label: 'Admin', href: '/admin' },
  ];
  let path = '/admin';
  for (const seg of segments) {
    path += `/${seg}`;
    const label = seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    // Skip UUIDs
    if (seg.length === 36 && seg.includes('-')) {
      crumbs.push({ label: 'Edit', href: path });
    } else {
      crumbs.push({ label: label, href: path });
    }
  }
  return crumbs;
}

export function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setCommandPaletteOpen } = useCmsStore();
  const breadcrumbs = getBreadcrumbs(pathname);

  async function handleSignOut() {
    const supabase = getCmsClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <header style={{
      height: '60px',
      background: '#0A0E1A',
      borderBottom: '1px solid #1e293b',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      {/* Breadcrumbs */}
      <nav style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {i > 0 && <span style={{ color: '#334155', fontSize: '13px' }}>/</span>}
            <Link
              href={crumb.href}
              style={{
                fontSize: '13px',
                color: i === breadcrumbs.length - 1 ? '#f1f5f9' : '#64748b',
                textDecoration: 'none',
                fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
              }}
            >
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Search / Command palette trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            color: '#64748b',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <span>⌘</span>
          <span>Search…</span>
          <span style={{ marginLeft: '4px', fontSize: '11px', opacity: 0.7 }}>K</span>
        </button>

        {/* View live site */}
        <a
          href="https://www.cuedeck.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '6px 14px',
            background: 'transparent',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            color: '#94a3b8',
            fontSize: '13px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          View Live ↗
        </a>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          style={{
            padding: '6px 14px',
            background: 'transparent',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            color: '#64748b',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
