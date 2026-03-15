import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import ReadingProgress from '../../../components/ReadingProgress'

interface Props {
  params: Promise<{ slug: string }>
}

function sbClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sb = sbClient()
  const { data } = await sb
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (!data) return {}
  return { title: `${data.title} — CueDeck Blog`, description: data.excerpt }
}

// Content comes from developer-controlled MDX files or admin-authored DB content (trusted server-side source)
function renderMarkdown(md: string, slug: string): string {
  let processed = md.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
    `![$1](/api/content-image/${slug}/$2)`
  )

  return processed
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(
      /^!\[([^\]]*)\]\(([^)]+)\)$/gm,
      '<figure><img src="$2" alt="$1" /><figcaption>$1</figcaption></figure>'
    )
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="prose-link">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^(.+)$/gm, (line) => {
      if (
        line.startsWith('<h') ||
        line.startsWith('<ul') ||
        line.startsWith('<li') ||
        line.startsWith('<blockquote') ||
        line.startsWith('<figure') ||
        line.startsWith('<code') ||
        line.trim() === ''
      ) return line
      return `<p>${line}</p>`
    })
}

interface TiptapNode {
  type: string
  text?: string
  content?: TiptapNode[]
  marks?: { type: string; attrs?: Record<string, unknown> }[]
  attrs?: Record<string, unknown>
}

function renderTiptap(nodes: TiptapNode[]): string {
  return nodes.map((node) => {
    if (node.type === 'paragraph') {
      const inner = node.content ? renderTiptap(node.content) : ''
      return inner ? `<p>${inner}</p>` : ''
    }
    if (node.type === 'heading') {
      const level = (node.attrs?.level as number) ?? 2
      const inner = node.content ? renderTiptap(node.content) : ''
      return `<h${level}>${inner}</h${level}>`
    }
    if (node.type === 'bulletList') {
      return `<ul>${node.content ? renderTiptap(node.content) : ''}</ul>`
    }
    if (node.type === 'listItem') {
      return `<li>${node.content ? renderTiptap(node.content) : ''}</li>`
    }
    if (node.type === 'text') {
      let t = node.text ?? ''
      const marks = node.marks ?? []
      if (marks.some((m) => m.type === 'bold')) t = `<strong>${t}</strong>`
      if (marks.some((m) => m.type === 'italic')) t = `<em>${t}</em>`
      if (marks.some((m) => m.type === 'code')) t = `<code>${t}</code>`
      const linkMark = marks.find((m) => m.type === 'link')
      if (linkMark) {
        const href = (linkMark.attrs?.href as string) ?? '#'
        t = `<a href="${href}" class="prose-link">${t}</a>`
      }
      return t
    }
    if (node.type === 'hardBreak') return '<br/>'
    if (node.type === 'blockquote') {
      return `<blockquote>${node.content ? renderTiptap(node.content) : ''}</blockquote>`
    }
    return node.content ? renderTiptap(node.content) : ''
  }).join('')
}

/** Render content_json to HTML. Handles markdown-wrapped and Tiptap JSON formats. */
function renderContent(contentJson: Record<string, unknown>, slug: string): string {
  if (!contentJson) return ''
  if (contentJson.type === 'markdown' && typeof contentJson.content === 'string') {
    return renderMarkdown(contentJson.content, slug)
  }
  if (contentJson.type === 'doc' && Array.isArray(contentJson.content)) {
    return renderTiptap(contentJson.content as TiptapNode[])
  }
  return ''
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const sb = sbClient()

  const { data: post } = await sb
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  const { data: related } = await sb
    .from('blog_posts')
    .select('id, slug, title, cover_image, published_at')
    .eq('status', 'published')
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(3)

  const contentHtml = renderContent(post.content_json as Record<string, unknown>, slug)
  const readMin = post.read_time_minutes ?? 5

  return (
    <>
      <Nav />

      <style dangerouslySetInnerHTML={{ __html: `
        .post-prose { color: #374151; font-size: 17px; line-height: 1.8; }
        .post-prose p { margin: 0 0 1.4em; }
        .post-prose h2 { font-size: 24px; font-weight: 700; color: #111827; letter-spacing: -0.4px; margin: 2.2em 0 0.6em; line-height: 1.25; }
        .post-prose h3 { font-size: 19px; font-weight: 600; color: #111827; margin: 1.8em 0 0.5em; }
        .post-prose strong { font-weight: 600; color: #111827; }
        .post-prose a.prose-link { color: #3b82f6; text-decoration: underline; text-decoration-color: rgba(59,130,246,0.4); text-underline-offset: 3px; }
        .post-prose a.prose-link:hover { text-decoration-color: #3b82f6; }
        .post-prose li { margin: 0 0 0.4em 1.4em; list-style: disc; }
        .post-prose code { background: #f3f4f6; padding: 2px 7px; border-radius: 5px; font-size: 14px; color: #1f2937; font-family: ui-monospace, monospace; }
        .post-prose figure { margin: 2em 0; }
        .post-prose figure img { width: 100%; height: auto; border-radius: 10px; box-shadow: 0 2px 16px rgba(0,0,0,0.08); display: block; }
        .post-prose figcaption { font-size: 13px; color: #9ca3af; text-align: center; margin-top: 10px; }
        .related-card:hover .related-title { color: #3b82f6 !important; }
        .post-prose blockquote { border-left: 4px solid #3b82f6; background: #f0f7ff; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 2em 0; font-style: italic; font-weight: 600; color: #1e40af; font-size: 18px; line-height: 1.5; }
      ` }} />

      <main style={{ paddingTop: 64, background: '#fff', minHeight: '100vh' }}>
        <ReadingProgress />

        {/* Article header */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 40px 0' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, fontSize: 13, color: '#9ca3af' }}>
            <Link href="/blog" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>Blog</Link>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <path d="M6 4l4 4-4 4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 320 }}>{post.title}</span>
          </div>

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
          {/* Title */}
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-2px', lineHeight: 1.12, marginBottom: 20 }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p style={{ fontSize: 19, color: '#6b7280', lineHeight: 1.6, marginBottom: 28, maxWidth: 620 }}>
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 32, borderBottom: '1px solid #f3f4f6' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>C</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#6b7280' }}>
              <span style={{ fontWeight: 600, color: '#374151' }}>CueDeck Team</span>
              <span style={{ color: '#d1d5db' }}>·</span>
              <time>{formatDate(post.published_at)}</time>
              <span style={{ color: '#d1d5db' }}>·</span>
              <span>{readMin} min read</span>
            </div>
          </div>
        </div>

        {/* Featured image */}
        {post.cover_image && (
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '36px 40px 0' }}>
            <img
              src={post.cover_image}
              alt={post.title}
              style={{
                width: '100%', height: 'auto',
                borderRadius: 14, display: 'block',
                boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
              }}
            />
          </div>
        )}

        {/* Post content */}
        <div
          className="post-prose"
          style={{ maxWidth: 720, margin: '0 auto', padding: '48px 40px 16px' }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* CTA strip */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px 56px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f0f7ff 0%, #eff6ff 100%)',
            border: '1px solid #dbeafe',
            borderRadius: 14,
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1e40af', marginBottom: 4 }}>
                Ready to run tighter events?
              </div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>
                CueDeck gives your whole team a live view of the run-of-show.
              </div>
            </div>
            <a
              href="https://app.cuedeck.io/#signup"
              style={{
                padding: '10px 22px',
                background: '#3b82f6',
                color: '#fff',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 4px rgba(59,130,246,0.35)',
                flexShrink: 0,
              }}
            >
              Start free →
            </a>
          </div>
        </div>

        {/* Keep reading */}
        {related && related.length > 0 && (
          <div style={{ background: '#f9fafb', borderTop: '1px solid #f3f4f6', padding: '56px 40px' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 28, letterSpacing: '-0.3px' }}>
                Keep reading
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {related.map(r => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="related-card"
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{
                      background: '#fff',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      overflow: 'hidden',
                      height: '100%',
                    }}>
                      {r.cover_image && (
                        <img
                          src={r.cover_image}
                          alt={r.title}
                          style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
                        />
                      )}
                      <div style={{ padding: '16px' }}>
                        <time style={{ fontSize: 12, color: '#9ca3af', display: 'block', marginBottom: 6 }}>
                          {formatDate(r.published_at)}
                        </time>
                        <div
                          className="related-title"
                          style={{ fontSize: 14, fontWeight: 600, color: '#111827', lineHeight: 1.4 }}
                        >
                          {r.title}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back link */}
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 40px 64px' }}>
          <Link href="/blog" style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All posts
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
