import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const authCookie =
      request.cookies.get('cuedeck-cms-auth') ||
      request.cookies.get('sb-sawekpguemzvuvvulfbc-auth-token');

    if (!authCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /login to /admin if already authenticated
  if (pathname === '/login') {
    const authCookie =
      request.cookies.get('cuedeck-cms-auth') ||
      request.cookies.get('sb-sawekpguemzvuvvulfbc-auth-token');

    if (authCookie) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
