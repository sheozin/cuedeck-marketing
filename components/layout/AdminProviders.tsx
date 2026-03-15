'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { useCmsStore } from '@/stores/cms-store';
import type { CmsUser } from '@/types/cms';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

export function AdminProviders({ children }: { children: React.ReactNode }) {
  const { setUser } = useCmsStore();
  const router = useRouter();

  useEffect(() => {
    const supabase = getCmsClient();

    // Load current user
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const { data } = await supabase
        .from('cms_users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) setUser(data as CmsUser);
    }

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, router]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
