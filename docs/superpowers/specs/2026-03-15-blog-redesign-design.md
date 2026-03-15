# Blog Redesign — Design Spec

**Date:** 2026-03-15
**Status:** Approved

## Overview

Redesign both the blog list page and the blog post page of the CueDeck marketing site. The blog list moves from a single-column article stack to a card grid with tag filtering. The post page keeps its centered layout but gains a reading progress bar, category badge, and pull quote styling.

---

## 1. Blog List Page (`app/blog/page.tsx`)

### Layout

Replace the current vertical article stack with a **3-column equal card grid** at max-width 1100px (up from 800px).

### Tag Filter Bar

- Rendered as a `'use client'` component (`BlogGrid`) since filtering is client-side
- Pills: "All" + one pill per unique tag collected from all posts' `tags` arrays
- Active pill: blue fill (`#3b82f6`), white text
- Inactive pill: `#f1f5f9` background, `#64748b` text
- Clicking a pill filters the visible cards without page reload
- If a post has no tags, it shows under "All" only

### Post Cards

Each card is a `<Link>` wrapping:
- **Cover image** — full card width, 180px tall, `object-fit: cover`, rounded top corners. If no cover image, show a gradient placeholder (`linear-gradient(135deg, #1e3a8a, #3b82f6)`).
- **Category badge** — blue pill (`#eff6ff` bg, `#3b82f6` text), first tag from `tags` array, uppercase, 11px. Hidden if no tags.
- **Title** — 15px, font-weight 700, 2-line clamp (`-webkit-line-clamp: 2`)
- **Excerpt** — 13px, `#6b7280`, 3-line clamp
- **Meta row** — date (formatted) · read time (if present). 12px, `#9ca3af`, bottom of card.
- Hover: subtle box-shadow lift (`0 4px 20px rgba(0,0,0,0.08)`) + title turns blue

### Responsive Breakpoints

- 769px+: 3 columns
- 481–768px: 2 columns
- 480px and below: 1 column

Handled via an inline `<style>` tag in the page (consistent with the project's Tailwind v4 purge workaround — static CSS only, no user content).

### Architecture

The server component (`BlogPage`) fetches posts from Supabase and passes them to a `'use client'` component (`BlogGrid`) that owns filter state. This keeps the data fetch on the server while enabling client-side filtering.

```
BlogPage (server) — fetches posts, collects unique tags
  └─ BlogGrid (client) — filter state, renders filter bar + card grid
       └─ PostCard — individual card (plain function inside BlogGrid)
```

`BlogGrid` lives in a new file: `app/blog/BlogGrid.tsx` with `'use client'` at the top.

`BlogPage` passes two props to `BlogGrid`:
- `posts: BlogPost[]` — the full list from Supabase
- `tags: string[]` — unique sorted tags derived server-side (`[...new Set(posts.flatMap(p => p.tags ?? []))].sort()`)

---

## 2. Blog Post Page (`app/blog/[slug]/page.tsx`)

All changes are additive — no structural layout changes.

### Reading Progress Bar

- Fixed 3px bar at `top: 0`, `left: 0`, `width: 100%`, `z-index: 200` (above nav)
- Fills left-to-right as user scrolls through the article
- Color: `#3b82f6`
- Implemented as a `'use client'` component (`ReadingProgress`) with a `scroll` event listener on `window`
- Progress = `scrollY / (scrollHeight - innerHeight) * 100`
- Lives in a new file: `components/ReadingProgress.tsx`
- Mounted inside `<main>` before the article header. Standard RSC + client component composition — no `dynamic()` needed; Next.js App Router allows server components to render client components as children.

### Category Badge

- Displayed below the breadcrumb, above the `<h1>` title
- Shows `post.tags[0]` if tags exist, else nothing rendered
- Styled: `#eff6ff` background, `#3b82f6` text, 11px, font-weight 700, uppercase, `border-radius: 20px`, `padding: 3px 12px`

### Title Typography

- Font size: `clamp(32px, 4vw, 52px)` (up from `clamp(28px, 4vw, 48px)`)
- Letter spacing: `-2px` (tighter, from `-1.5px`)

### Pull Quote Styling

Added to the existing `.post-prose` style block (static CSS, not user content):

```css
.post-prose blockquote {
  border-left: 4px solid #3b82f6;
  background: #f0f7ff;
  border-radius: 0 8px 8px 0;
  padding: 16px 20px;
  margin: 2em 0;
  font-style: italic;
  font-weight: 600;
  color: #1e40af;
  font-size: 18px;
  line-height: 1.5;
}
```

The `renderMarkdown()` function needs a blockquote rule inserted **before** the list item and paragraph wrapping steps:
- Pattern: `^> (.+)$` (multiline) → `<blockquote>$1</blockquote>`
- The catch-all paragraph wrapper guard list must also have `<blockquote` added to it, otherwise `<blockquote>` lines get double-wrapped as `<p><blockquote>...</blockquote></p>`

The `renderTiptap()` function needs a `blockquote` node handler (type `'blockquote'` → wrap `renderTiptap(node.content)` in `<blockquote>` tags).

---

## Files Changed

| File | Change |
|------|--------|
| `app/blog/page.tsx` | Rewrite — pass posts to BlogGrid client component |
| `app/blog/BlogGrid.tsx` | New — client component with filter bar + card grid |
| `app/blog/[slug]/page.tsx` | Add category badge, bigger title, pull quote CSS, mount ReadingProgress |
| `components/ReadingProgress.tsx` | New — fixed scroll progress bar |

---

## Out of Scope

- Pagination (13 posts fits in one grid)
- Search within the blog list
- Author profiles or author-specific filtering
- Table of contents on post page
