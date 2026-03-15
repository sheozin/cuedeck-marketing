import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Derive Supabase project ref from URL to avoid hardcoding
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ?? '';
const SUPABASE_COOKIE = projectRef ? `sb-${projectRef}-auth-token` : '';

function hasAuthCookie(request: NextRequest): boolean {
  return !!(
    request.cookies.get('cuedeck-cms-auth') ||
    (SUPABASE_COOKIE && request.cookies.get(SUPABASE_COOKIE))
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    if (!hasAuthCookie(request)) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /login to /admin if already authenticated
  if (pathname === '/login') {
    if (hasAuthCookie(request)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
