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

    // Load current user and verify they have a cms_users row.
    // A valid Supabase session is not enough — the user must be explicitly
    // provisioned as a CMS user. This blocks CueDeck app users from accessing
    // the CMS even if they share the same Supabase project.
    async function loadUser() {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        router.push('/login');
        return;
      }
      const { data, error: roleError } = await supabase
        .from('cms_users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (roleError || !data) {
        // Valid session but no CMS access — sign out and redirect
        await supabase.auth.signOut();
        router.push('/login?error=no_cms_access');
        return;
      }
      setUser(data as CmsUser);
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
