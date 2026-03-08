import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

function getPost(slug: string) {
  const mdxPath = join(process.cwd(), 'content', 'posts', slug, 'index.mdx')
  if (!existsSync(mdxPath)) return null
  const raw = readFileSync(mdxPath, 'utf-8')
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/)
  const fm: Record<string, string> = {}
  if (frontmatterMatch) {
    frontmatterMatch[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(': ')
      if (key) fm[key.trim()] = rest.join(': ').trim()
    })
  }
  const content = raw.replace(/^---\n[\s\S]*?\n---\n/, '')
  return {
    slug,
    title: fm.title || slug,
    date: fm.date || '',
    excerpt: fm.excerpt || '',
    author: fm.author || 'CueDeck Team',
    content,
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — CueDeck Blog`, description: post.excerpt }
}

// Simple markdown-to-HTML renderer (no external deps)
function renderMarkdown(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;color:#111827;margin:32px 0 12px;letter-spacing:-0.3px">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:600;color:#111827;margin:24px 0 10px">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:600;color:#111827">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#3b82f6;text-decoration:none">$1</a>')
    .replace(/^(.+)$/gm, (line) => {
      if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<li') || line.trim() === '') return line
      return `<p style="font-size:16px;line-height:1.75;color:#374151;margin-bottom:16px">${line}</p>`
    })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: '#fff', minHeight: '80vh' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #fafafa 100%)', padding: '80px 40px 60px', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.date}</span>
            <span style={{ fontSize: 12, color: '#d1d5db' }}>·</span>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.author}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, color: '#111827', letterSpacing: '-1px', maxWidth: 700, margin: '0 auto 16px', lineHeight: 1.15 }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 560, margin: '0 auto' }}>{post.excerpt}</p>
        </div>

        {/* Content */}
        <div
          style={{ maxWidth: 720, margin: '0 auto', padding: '64px 40px' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Back */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 40px 80px' }}>
          <a href="/blog" style={{ fontSize: 14, fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}>← Back to Blog</a>
        </div>
      </main>
      <Footer />
    </>
  )
}
