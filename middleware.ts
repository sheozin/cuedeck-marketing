import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Public pages: copy Vercel's geo country into a first-party cookie so the
// statically rendered /pricing can pick a currency in the browser without a
// third-party lookup. No auth work on these paths.
export function setCountryCookie(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  const country = request.headers.get('x-vercel-ip-country');
  if (country && /^[A-Za-z]{2}$/.test(country) && !request.cookies.has('cd_country')) {
    response.cookies.set('cd_country', country.toUpperCase(), {
      path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24, httpOnly: false,
    });
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === '/' || path === '/pricing') return setCountryCookie(request);

  let supabaseResponse = NextResponse.next({ request });

  // Build a server client that reads/refreshes session cookies.
  // getUser() verifies the JWT with Supabase — cannot be spoofed by a crafted cookie.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/pricing', '/'],
};
