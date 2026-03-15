'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDB = Record<string, Record<string, any>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: SupabaseClient<any> | null = null;

// Uses @supabase/ssr's createBrowserClient so sessions are stored in cookies,
// not localStorage — required for the middleware to see the session server-side.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCmsClient(): SupabaseClient<AnyDB> {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client as SupabaseClient<any>;
}
