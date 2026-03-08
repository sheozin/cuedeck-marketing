# CueDeck Marketing Site — Project Memory

## What This Is
Next.js 16 (App Router, Turbopack) marketing site for **CueDeck** — a live event operations platform.
- **Live site:** cuedeck-marketing.vercel.app → cuedeck.io
- **App URL:** https://app.cuedeck.io
- **Dev server:** `npm run dev` → http://localhost:3000 (or 3001 if 3000 is taken)
- **Launch config:** `.claude/launch.json` → port 3000

## Tech Stack
- Next.js 16 + Turbopack (no Webpack)
- **Tailwind CSS v4** — `@import "tailwindcss"` in globals.css
- All layout uses **inline styles only** (zero `className` for layout) — this is intentional
- TypeScript strict mode
- Keystatic CMS (GitHub storage) for blog posts
- Vercel Analytics (GDPR-gated via CookieBanner)
- `@vercel/analytics` — only loads after cookie Accept

## Critical CSS Note — Tailwind v4 Purge
Tailwind v4 + Turbopack **purges attribute selectors** like `[style*="minmax(320px"]` from globals.css because they don't appear as class names.

**Fix:** All mobile responsive overrides live in a `<style dangerouslySetInnerHTML>` tag directly in `app/layout.tsx` `<head>` — this bypasses Tailwind's purge entirely. Do NOT move them to globals.css.

## Project Structure
```
app/
  page.tsx          — Homepage (all sections + mockup components)
  layout.tsx        — Root layout: JSON-LD, mobile CSS overrides, CookieBanner
  globals.css       — Tailwind import + base styles (Tailwind-safe rules only)
  about/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  pricing/page.tsx  — Uses PricingClient.tsx for currency toggle
  blog/page.tsx     — Lists posts from content/posts/
  blog/[slug]/page.tsx
  keystatic/        — CMS admin UI
  api/subscribe/    — Email capture endpoint (Loops.so optional)
  opengraph-image.tsx — Dynamic OG card (edge runtime)
  icon.tsx          — Dynamic favicon (edge runtime)
  sitemap.ts
  robots.ts
  not-found.tsx

components/
  Nav.tsx           — Shared nav (logo: Cue[white]Deck[blue #3b82f6], font-weight 800)
  Footer.tsx        — Shared footer
  CookieBanner.tsx  — GDPR cookie consent + conditionally loads <Analytics />
  EmailCapture.tsx  — Email form → /api/subscribe
  PricingClient.tsx — 'use client': monthly/annual toggle + geo currency detection

content/posts/      — MDX blog posts (Keystatic manages these)
keystatic.config.ts — CMS config (local storage mode)
```

## Branding Rules
- Logo: **Cue** (dark/white) + **Deck** (blue `#3b82f6`), fontWeight 800, letterSpacing -0.3px
- This applies everywhere: Nav, DashboardMockup toolbar, loading screen
- The console app (LEOD) uses the same styling: `.logo { font-size:16px; font-weight:800; letter-spacing:-.3px } .logo span { color:#3b82f6 }`
- **NEVER** show "LEOD" on the marketing site — always "CueDeck"

## Pricing
- **Pay-per-event:** $39 / per event
- **Starter:** $49/month (annual: $39/mo, saves 20%)
- **Pro:** $99/month (annual: $79/mo, saves 20%) — "Most popular"
- Base currency: **USD** (factor 1.0)
- Multi-currency via `ipapi.co` geolocation: EUR ×0.93, GBP ×0.79, AED ×3.67, SGD ×1.35
- `DEFAULT_CURRENCY = 'USD'` in PricingClient.tsx

## Mobile Responsive Strategy
- Viewport: 375px iPhone standard
- Hero inner container: `padding: "0 40px"` → 295px effective width
- Grid `minmax(320px, 1fr)` overflows at 375px (295 < 320) — fixed via layout.tsx style tag
- Key rules in layout.tsx `<style>`:
  - `html, body { overflow-x: hidden }`
  - `[style*="minmax(320px, 1fr)"] → grid-template-columns: 1fr` at ≤768px
  - Gap reductions (60px→32px, 64px→32px) when stacked
  - Mockup max-widths clamped to 100%

## Homepage Sections (in order)
1. Hero — headline + DashboardMockup (right col)
2. SocialProof — logo bar
3. RoleShowcase — Director/Timeline/Signage mockups with descriptions
4. Features — 6 cards, `repeat(3, 1fr)` grid (3 per row)
5. HowItWorks — 3 numbered steps
6. Pricing — 3 plans, `repeat(3, 1fr)` grid
7. Testimonials — blockquote
8. EmailCapture — newsletter form
9. CTA strip
10. Footer

## Mockup Components (in page.tsx)
- `DashboardMockup` — dark console UI, toolbar shows `Cue[white]Deck[blue]`, session list
- `TimelineMockup` — SVG-style horizontal timeline, 3 rooms, NOW marker
- `SignageMockup` — display registry panel with override buttons, sponsor library

## Known Quirks
- `app/page.tsx` contains an embedded `<style>` tag (inside a `Nav` component or similar at ~line 730) with `@media (max-width: 900px)` rules — these collapse 2-col and 3-col grids to 1 col on tablet
- The Keystatic CMS is configured for GitHub storage — needs `KEYSTATIC_SECRET` env var to protect `/keystatic/` admin route
- `LOOPS_API_KEY` env var optional — if not set, subscribe endpoint logs the email only
- OG image and favicon use `next/og` edge runtime — no external dependencies

## Deployment
- Vercel auto-deploys on push to main branch
- After local changes, commit + push to update the live site
- `npm run build` to verify zero TypeScript errors before pushing
