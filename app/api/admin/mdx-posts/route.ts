import { createServerClient } from '@supabase/ssr';
import { NextRequest } from 'next/server';
import { getAllPosts } from '@/lib/posts';

// getAllPosts uses fs — must run on Node.js, not edge
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  // Verify the caller has a valid Supabase session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll() {},
      },
    },
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = getAllPosts();
  return Response.json({ posts });
}
