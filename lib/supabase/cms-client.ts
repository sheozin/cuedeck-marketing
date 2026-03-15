'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyDB = Record<string, Record<string, any>>;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCmsClient(): SupabaseClient<AnyDB> {
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: 'cuedeck-cms-auth',
      },
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client as SupabaseClient<any>;
}
