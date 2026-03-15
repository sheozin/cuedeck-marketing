'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCmsStore } from '@/stores/cms-store';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: '⊞' },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Pages', href: '/admin/pages', icon: '□' },
      { label: 'Blog Posts', href: '/admin/blog', icon: '✎' },
      { label: 'Media Library', href: '/admin/media', icon: '⊟' },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { label: 'Testimonials', href: '/admin/testimonials', icon: '❝' },
      { label: 'Pricing Plans', href: '/admin/pricing', icon: '◈' },
      { label: 'Feature Cards', href: '/admin/features', icon: '⚡' },
      { label: 'Team Members', href: '/admin/team', icon: '◉' },
      { label: 'FAQs', href: '/admin/faq', icon: '?' },
      { label: 'Changelog', href: '/admin/changelog', icon: '◫' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'AI Agents', href: '/admin/ai', icon: '◈' },
      { label: 'Site Settings', href: '/admin/settings', icon: '⚙' },
      { label: 'Redirects', href: '/admin/redirects', icon: '↗' },
      { label: 'Audit Log', href: '/admin/audit', icon: '◌' },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, user } = useCmsStore();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <aside style={{
      width: sidebarCollapsed ? '60px' : '240px',
      minHeight: '100vh',
      background: '#0A0E1A',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.2s ease',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 50,
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Logo + collapse button */}
      <div style={{
        padding: sidebarCollapsed ? '20px 0' : '20px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: sidebarCollapsed ? 'center' : 'space-between',
        borderBottom: '1px solid #1e293b',
        minHeight: '60px',
        flexShrink: 0,
      }}>
        {!sidebarCollapsed && (
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.3px', color: '#fff' }}>
              Cue<span style={{ color: '#3b82f6' }}>Deck</span>
            </span>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '4px',
            fontSize: '16px',
            lineHeight: 1,
          }}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {NAV.map((group) => (
          <div key={group.title} style={{ marginBottom: '4px' }}>
            {!sidebarCollapsed && (
              <div style={{
                padding: '12px 16px 4px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#475569',
              }}>
                {group.title}
              </div>
            )}
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={sidebarCollapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: sidebarCollapsed ? '10px' : '9px 16px',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  margin: '1px 8px',
                  background: isActive(item.href) ? 'rgba(74,142,255,0.1)' : 'transparent',
                  color: isActive(item.href) ? '#4A8EFF' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: isActive(item.href) ? 600 : 400,
                  transition: 'all 0.1s',
                }}
              >
                <span style={{ fontSize: '14px', opacity: 0.85, flexShrink: 0 }}>{item.icon}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
                {!sidebarCollapsed && item.badge != null && item.badge > 0 && (
                  <span style={{
                    marginLeft: 'auto',
                    background: '#4A8EFF',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '1px 7px',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      {user && (
        <div style={{
          borderTop: '1px solid #1e293b',
          padding: sidebarCollapsed ? '12px 0' : '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#4A8EFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
          }}>
            {user.full_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
          </div>
          {!sidebarCollapsed && (
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.full_name || user.email}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
