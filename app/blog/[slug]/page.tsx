import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost, getRelatedPosts, formatDate } from '../../../lib/posts'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — CueDeck Blog`, description: post.excerpt }
}

// Markdown-to-HTML renderer with image + list support
function renderMarkdown(md: string, slug: string): string {
  // First resolve relative image paths to the API route
  let processed = md.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+)\)/g,
    `![$1](/api/content-image/${slug}/$2)`
  )

  return processed
    .replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;color:#111827;margin:32px 0 12px;letter-spacing:-0.3px">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:600;color:#111827;margin:24px 0 10px">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:600;color:#111827">$1</strong>')
    // Inline images → figure with caption
    .replace(
      /^!\[([^\]]*)\]\(([^)]+)\)$/gm,
      '<figure style="margin:24px 0"><img src="$2" alt="$1" style="width:100%;height:auto;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.06)" /><figcaption style="font-size:13px;color:#9ca3af;margin-top:8px;text-align:center">$1</figcaption></figure>'
    )
    // Links (after images so image alt text isn't matched)
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#3b82f6;text-decoration:none">$1</a>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li style="font-size:16px;line-height:1.75;color:#374151;margin-bottom:4px;margin-left:20px">$1</li>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:14px;color:#1f2937">$1</code>')
    // Paragraphs (skip elements already wrapped in HTML tags)
    .replace(/^(.+)$/gm, (line) => {
      if (
        line.startsWith('<h') ||
        line.startsWith('<ul') ||
        line.startsWith('<li') ||
        line.startsWith('<figure') ||
        line.startsWith('<code') ||
        line.trim() === ''
      ) return line
      return `<p style="font-size:16px;line-height:1.75;color:#374151;margin-bottom:16px">${line}</p>`
    })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const related = getRelatedPosts(slug)

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: '#fff', minHeight: '80vh' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #fafafa 100%)', padding: '80px 40px 60px', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{formatDate(post.date)}</span>
            <span style={{ fontSize: 12, color: '#d1d5db' }}>·</span>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.author}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, color: '#111827', letterSpacing: '-1px', maxWidth: 700, margin: '0 auto 16px', lineHeight: 1.15 }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 560, margin: '0 auto' }}>{post.excerpt}</p>
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px' }}>
            <img
              src={post.featuredImage}
              alt={post.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 12,
                marginTop: -30,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* Content */}
        <div
          style={{ maxWidth: 720, margin: '0 auto', padding: '64px 40px' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content, slug) }}
        />

        {/* Keep Reading */}
        {related.length > 0 && (
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px 48px' }}>
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 40 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20, letterSpacing: '-0.2px' }}>Keep reading</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {related.map(r => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <time style={{ fontSize: 12, color: '#9ca3af', flexShrink: 0, minWidth: 80 }}>{formatDate(r.date)}</time>
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{r.title}</span>
                      <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4, lineHeight: 1.5 }}>{r.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px 80px' }}>
          <a href="/blog" style={{ fontSize: 14, fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}>← Back to Blog</a>
        </div>
      </main>
      <Footer />
    </>
  )
}
