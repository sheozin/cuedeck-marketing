/**
 * Custom Keystatic route handler with two fixes:
 *
 * FIX 1 — Vercel proxy origin (issue #1022):
 *   Keystatic reads req.url to build the OAuth redirect_uri. On Vercel the
 *   internal URL uses the proxy hostname, not the public domain. We rewrite
 *   the request URL using x-forwarded-host / x-forwarded-proto before handing
 *   off to Keystatic.
 *
 * FIX 2 — OAuth App token format:
 *   Keystatic's built-in callback handler validates the GitHub token response
 *   with a strict superstruct schema that requires expires_in + refresh_token.
 *   These fields are only present when using a proper GitHub App with token
 *   expiration enabled. A standard GitHub OAuth App returns only
 *   { access_token, token_type, scope } — no expiry fields — so Keystatic's
 *   validation always fails with "Authorization failed".
 *
 *   We intercept /api/keystatic/github/oauth/callback ourselves, exchange the
 *   code, and set the session cookie directly. For non-expiring OAuth App
 *   tokens we use a 1-year maxAge.
 */

import { makeRouteHandler } from '@keystatic/next/route-handler'
import config from '../../../../keystatic.config'

const keystaticHandler = makeRouteHandler({ config })

const CLIENT_ID = process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? ''
const CLIENT_SECRET = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ?? ''

/** Rewrite request URL to the real public origin on proxy platforms (Vercel). */
function withCorrectOrigin(req: Request): Request {
  const forwardedHost = req.headers.get('x-forwarded-host')
  const forwardedProto = req.headers.get('x-forwarded-proto')

  if (!forwardedHost) return req

  try {
    const url = new URL(req.url)
    url.hostname = forwardedHost.split(',')[0].trim()
    if (forwardedProto) {
      url.protocol = forwardedProto.split(',')[0].trim() + ':'
    }
    if (url.protocol === 'https:' && url.port === '443') url.port = ''
    if (url.protocol === 'http:' && url.port === '80') url.port = ''

    return new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
      body: req.body,
      // @ts-expect-error duplex required in some runtimes for streaming bodies
      duplex: 'half',
    })
  } catch {
    return req
  }
}

/** Serialize a Set-Cookie header value. */
function serializeCookie(
  name: string,
  value: string,
  opts: { maxAge: number; httpOnly?: boolean; path?: string; sameSite?: string }
): string {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`]
  parts.push(`Max-Age=${opts.maxAge}`)
  parts.push(`Path=${opts.path ?? '/'}`)
  parts.push(`SameSite=${opts.sameSite ?? 'Lax'}`)
  if (opts.httpOnly) parts.push('HttpOnly')
  if (process.env.NODE_ENV === 'production') parts.push('Secure')
  return parts.join('; ')
}

/** Parse cookies from the Cookie header string. */
function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=')
      return [decodeURIComponent(k.trim()), decodeURIComponent(v.join('=').trim())]
    })
  )
}

const ONE_YEAR = 365 * 24 * 60 * 60 // seconds

// Simple route regex copied from Keystatic source (allows optional 'from' redirect)
const keystaticRouteRegex =
  /^branch\/[^]+(\/collection\/[^/]+(|\/(create|item\/[^/]+))|\/singleton\/[^/]+)?$/

/**
 * Custom OAuth callback handler.
 * Handles both GitHub Apps (expiring tokens with refresh_token) and
 * standard GitHub OAuth Apps (non-expiring tokens, no refresh_token).
 */
async function handleOAuthCallback(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')
  const errorDescription = url.searchParams.get('error_description')

  if (errorDescription) {
    return new Response(
      `Authorization failed: ${errorDescription}`,
      { status: 400 }
    )
  }

  if (!code) {
    return new Response('Bad Request: missing code', { status: 400 })
  }

  // Exchange the code for an access token
  const tokenUrl = new URL('https://github.com/login/oauth/access_token')
  tokenUrl.searchParams.set('client_id', CLIENT_ID)
  tokenUrl.searchParams.set('client_secret', CLIENT_SECRET)
  tokenUrl.searchParams.set('code', code)

  const tokenRes = await fetch(tokenUrl.toString(), {
    method: 'POST',
    headers: { Accept: 'application/json' },
  })

  if (!tokenRes.ok) {
    return new Response('Authorization failed: GitHub token exchange failed', { status: 401 })
  }

  const tokenData = (await tokenRes.json()) as Record<string, unknown>

  const accessToken = tokenData.access_token
  if (typeof accessToken !== 'string' || !accessToken) {
    return new Response(
      `Authorization failed: ${typeof tokenData.error_description === 'string' ? tokenData.error_description : 'no access token returned'}`,
      { status: 401 }
    )
  }

  // Determine where to redirect after login
  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = parseCookies(cookieHeader)
  const fromCookie = state ? cookies['ks-' + state] : undefined
  const from =
    typeof fromCookie === 'string' && keystaticRouteRegex.test(fromCookie)
      ? fromCookie
      : undefined

  // Build Set-Cookie headers
  const setCookies: string[] = []

  // Access token cookie — use GitHub's expires_in if present (GitHub App),
  // otherwise default to 1 year (OAuth App non-expiring token).
  const accessTokenMaxAge =
    typeof tokenData.expires_in === 'number' ? tokenData.expires_in : ONE_YEAR

  setCookies.push(
    serializeCookie('keystatic-gh-access-token', accessToken, {
      maxAge: accessTokenMaxAge,
      path: '/',
      sameSite: 'Lax',
    })
  )

  // If GitHub returned a refresh token (GitHub App), store it.
  // We skip the Keystatic encryption here — store it as-is in an httpOnly cookie.
  if (typeof tokenData.refresh_token === 'string' && tokenData.refresh_token) {
    const refreshMaxAge =
      typeof tokenData.refresh_token_expires_in === 'number'
        ? tokenData.refresh_token_expires_in
        : ONE_YEAR
    setCookies.push(
      serializeCookie('keystatic-gh-refresh-token', tokenData.refresh_token, {
        maxAge: refreshMaxAge,
        httpOnly: true,
        path: '/',
        sameSite: 'Lax',
      })
    )
  }

  if (state === 'close') {
    return new Response(
      "<script>localStorage.setItem('ks-refetch-installations','true');window.close();</script>",
      {
        status: 200,
        headers: [
          ['Content-Type', 'text/html'],
          ...setCookies.map((c) => ['Set-Cookie', c] as [string, string]),
        ],
      }
    )
  }

  const redirectTo = `/keystatic${from ? `/${from}` : ''}`
  return new Response(null, {
    status: 307,
    headers: [
      ['Location', redirectTo],
      ...setCookies.map((c) => ['Set-Cookie', c] as [string, string]),
    ],
  })
}

async function routeRequest(req: Request): Promise<Response> {
  const fixed = withCorrectOrigin(req)
  const url = new URL(fixed.url)

  // Intercept only the OAuth callback — let Keystatic handle everything else
  if (url.pathname.endsWith('/github/oauth/callback')) {
    return handleOAuthCallback(fixed)
  }

  return keystaticHandler.GET(fixed)
}

export async function GET(req: Request) {
  return routeRequest(req)
}

export async function POST(req: Request) {
  const fixed = withCorrectOrigin(req)
  return keystaticHandler.POST(fixed)
}
