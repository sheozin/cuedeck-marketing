# Blog Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blog list with a 3-column card grid + tag filter, and enhance the post page with a reading progress bar, category badge, and pull quote styling.

**Architecture:** `BlogPage` (server) fetches posts and passes them to `BlogGrid` (client component) which owns filter state. The post page gains two additive changes: a new `ReadingProgress` client component and CSS/markup additions to the existing server component.

**Tech Stack:** Next.js 16 App Router, TypeScript strict, inline styles only (no Tailwind classes for layout), Supabase JS v2, `'use client'` components for interactivity.

**Verification:** No test suite — use `npm run build` for TypeScript correctness and the dev server at `http://localhost:3000` for visual verification after each task.

**Spec:** `docs/superpowers/specs/2026-03-15-blog-redesign-design.md`

---

## Chunk 1: BlogGrid client component + blog list page rewrite

### Task 1: Create `BlogGrid.tsx` — filter bar + card grid

**Files:**
- Create: `app/blog/BlogGrid.tsx`

- [ ] **Step 1: Create `app/blog/BlogGrid.tsx` with the following content**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  tags: string[] | null;
  published_at: string;
  read_time_minutes: number | null;
}

interface Props {
  posts: Post[];
  tags: string[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogGrid({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState('all');

  const filtered =
    activeTag === 'all'
      ? posts
      : posts.filter((p) => (p.tags ?? []).includes(activeTag));

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
        .post-card:hover .post-card-title { color: #3b82f6 !important; }
        .post-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; }
      `}</style>

      {/* Tag filter bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {['all', ...tags].map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'capitalize',
              background: activeTag === tag ? '#3b82f6' : '#f1f5f9',
              color: activeTag === tag ? '#fff' : '#64748b',
              transition: 'all 0.15s',
            }}
          >
            {tag === 'all' ? 'All' : tag}
          </button>
        ))}
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: 16 }}>
          No posts found.
        </p>
      ) : (
        <div
          className="blog-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {filtered.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="post-card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'box-shadow 0.15s',
              }}
            >
              {/* Cover image or gradient placeholder */}
              {post.cover_image ? (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    display: 'block',
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                    flexShrink: 0,
                  }}
                />
              )}

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Category badge */}
                {post.tags && post.tags.length > 0 && (
                  <span style={{
                    display: 'inline-block',
                    background: '#eff6ff',
                    color: '#3b82f6',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    marginBottom: '10px',
                    alignSelf: 'flex-start',
                  }}>
                    {post.tags[0]}
                  </span>
                )}

                {/* Title */}
                <div
                  className="post-card-title"
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: 1.4,
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.title}
                </div>

                {/* Excerpt */}
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    lineHeight: 1.6,
                    marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1,
                  }}
                >
                  {post.excerpt}
                </div>

                {/* Meta */}
                <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', gap: '6px' }}>
                  <span>{formatDate(post.published_at)}</span>
                  {post.read_time_minutes && (
                    <>
                      <span>·</span>
                      <span>{post.read_time_minutes} min read</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

---

### Task 2: Rewrite `app/blog/page.tsx` to use BlogGrid

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Replace the full contents of `app/blog/page.tsx`**

```tsx
import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import BlogGrid from './BlogGrid'

export const metadata: Metadata = {
  title: 'Blog — CueDeck',
  description: 'Insights, tips, and updates from the CueDeck team on live event production.',
}

export default async function BlogPage() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )

  const { data: posts } = await sb
    .from('blog_posts')
    .select('id, slug, title, excerpt, cover_image, tags, published_at, read_time_minutes')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const allPosts = posts ?? []
  const tags = [...new Set(allPosts.flatMap((p) => p.tags ?? []))].sort()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, minHeight: '80vh', background: '#fff' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #fafafa 100%)', padding: '80px 40px 60px', textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: '#3b82f6', textTransform: 'uppercase', marginBottom: 12 }}>BLOG</p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#111827', letterSpacing: '-1px', marginBottom: 16 }}>
            Insights & Updates
          </h1>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 480, margin: '0 auto' }}>
            Tips, tutorials, and news from the CueDeck team.
          </p>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 40px' }}>
          {allPosts.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: 16 }}>No posts yet — check back soon.</p>
          ) : (
            <BlogGrid posts={allPosts} tags={tags} />
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Start dev server and verify blog list page**

```bash
npm run dev
```

Open `http://localhost:3000/blog`.

Verify:
- Posts render in a 3-column card grid
- Each card has cover image (or gradient placeholder), category badge (if tags exist), title, excerpt, meta row
- Tag filter pills appear above the grid
- Clicking a tag pill filters the cards client-side (no page reload)
- "All" pill shows all posts
- Hover on a card: shadow appears + title turns blue

- [ ] **Step 4: Commit**

```bash
git add app/blog/page.tsx app/blog/BlogGrid.tsx
git commit -m "feat: blog list — 3-col card grid with tag filter"
```

---

## Chunk 2: Post page enhancements

### Task 3: Create `ReadingProgress` component

**Files:**
- Create: `components/ReadingProgress.tsx`

- [ ] **Step 1: Create `components/ReadingProgress.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 200,
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: '#3b82f6',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

---

### Task 4: Update post page — category badge, title, pull quotes, ReadingProgress

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Add `ReadingProgress` import**

Add after the existing imports at the top of `app/blog/[slug]/page.tsx`:

```tsx
import ReadingProgress from '../../../components/ReadingProgress'
```

- [ ] **Step 2: Add blockquote CSS rule to the existing post-prose style block**

The file contains a `<style>` tag with post-prose rules (around line 152). The last existing rule is `.related-card:hover .related-title { color: #3b82f6 !important; }`. Insert the blockquote rule on a new line **before** the closing backtick (`` ` ``) that ends the template literal:

Find this exact string:
```
        .related-card:hover .related-title { color: #3b82f6 !important; }
      ` }} />
```

Replace with:
```
        .related-card:hover .related-title { color: #3b82f6 !important; }
        .post-prose blockquote { border-left: 4px solid #3b82f6; background: #f0f7ff; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 2em 0; font-style: italic; font-weight: 600; color: #1e40af; font-size: 18px; line-height: 1.5; }
      ` }} />
```

- [ ] **Step 3: Update title font size and letter-spacing**

Find the exact string (current values are `clamp(28px, 4vw, 48px)` and `letterSpacing: '-1.5px'`):

```tsx
<h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: 20 }}>
```

Replace with:

```tsx
<h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-2px', lineHeight: 1.12, marginBottom: 20 }}>
```

- [ ] **Step 4: Add category badge**

In the article header `<div>` (the one with `maxWidth: 760`), insert the badge immediately before the `{/* Title */}` comment (which exists at line ~182). Find this exact string:

```tsx
          {/* Title */}
```

Insert the badge block before it:

```tsx
{/* Category badge */}
{post.tags && (post.tags as string[]).length > 0 && (
  <span style={{
    display: 'inline-block',
    background: '#eff6ff',
    color: '#3b82f6',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '3px 12px',
    borderRadius: '20px',
    marginBottom: '16px',
  }}>
    {(post.tags as string[])[0]}
  </span>
)}
```

- [ ] **Step 5: Mount `ReadingProgress` as the first child of `<main>`**

Find `<main style={{ paddingTop: 64, background: '#fff', minHeight: '100vh' }}>` and insert `<ReadingProgress />` immediately after the opening tag:

```tsx
<main style={{ paddingTop: 64, background: '#fff', minHeight: '100vh' }}>
  <ReadingProgress />

  {/* Article header */}
```

- [ ] **Step 6: Add blockquote rule to `renderMarkdown()`**

In the `renderMarkdown()` function, find this exact string (the link replace followed immediately by the list-item replace):

```tsx
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="prose-link">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
```

Replace with (blockquote rule inserted between them):

```tsx
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="prose-link">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
```

Then find the paragraph catch-all guard block (the `if` statement checking `line.startsWith('<h')`) and add `'<blockquote'` to the list:

```tsx
if (
  line.startsWith('<h') ||
  line.startsWith('<ul') ||
  line.startsWith('<li') ||
  line.startsWith('<blockquote') ||
  line.startsWith('<figure') ||
  line.startsWith('<code') ||
  line.trim() === ''
) return line
```

- [ ] **Step 7: Add blockquote handler to `renderTiptap()`**

In the `renderTiptap()` function, add before the final `return node.content ? renderTiptap(node.content) : ''` fallback:

```tsx
if (node.type === 'blockquote') {
  return `<blockquote>${node.content ? renderTiptap(node.content) : ''}</blockquote>`
}
```

- [ ] **Step 8: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 9: Verify in browser**

Open `http://localhost:3000/blog/stage-manager-workflow-guide`.

Verify:
- Blue 3px reading progress bar appears at the top of the viewport and advances as you scroll down
- A category badge (e.g. "OPERATIONS") appears between the breadcrumb and the `<h1>` title
- The title is visibly larger with tighter letter-spacing compared to other pages
- Post content renders fully with no layout regressions
- Scroll to the bottom and back — progress bar tracks correctly

- [ ] **Step 10: Commit**

```bash
git add components/ReadingProgress.tsx
git add -- "app/blog/[slug]/page.tsx"
git commit -m "feat: blog post — reading progress, category badge, pull quote styles"
```

---

## Chunk 3: Final build verification + push

### Task 5: Production build check + push

- [ ] **Step 1: Run full production build**

```bash
npm run build
```

Expected: Exits with code 0. Zero TypeScript errors, zero Next.js build errors.

- [ ] **Step 2: Smoke-check responsive layout**

Start the dev server if not already running:

```bash
npm run dev
```

Open `http://localhost:3000/blog`. Resize the browser (or use DevTools device emulation):

- At 1280px wide: 3-column grid
- At 600px wide: 2-column grid
- At 375px wide: 1-column grid

Resize browser window (or use DevTools device emulation) to verify each breakpoint.

- [ ] **Step 3: Push to GitHub (triggers Vercel deploy)**

```bash
git push origin main
```

- [ ] **Step 4: Confirm live site**

Wait for Vercel deploy to complete, then open `https://www.cuedeck.io/blog`.

Verify the live site shows the card grid and that a post page shows the reading progress bar.
