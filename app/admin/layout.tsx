import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminTopbar } from '@/components/layout/AdminTopbar';
import { AdminProviders } from '@/components/layout/AdminProviders';
import { CommandPalette } from '@/components/layout/CommandPalette';

export const metadata: Metadata = {
  title: { default: 'CueDeck CMS', template: '%s — CueDeck CMS' },
  description: 'CueDeck Content Management Dashboard',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0A0E1A',
        color: '#f1f5f9',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>
        <AdminSidebar />
        {/* Main content — offset by sidebar width (dynamic via CSS var) */}
        <div style={{
          flex: 1,
          marginLeft: '240px', // match sidebar width
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <AdminTopbar />
          <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
            {children}
          </main>
        </div>
        <CommandPalette />
      </div>
    </AdminProviders>
  );
}
