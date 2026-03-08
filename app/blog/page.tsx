import { Metadata } from 'next'
import Link from 'next/link'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Blog — CueDeck',
  description: 'Insights, tips, and updates from the CueDeck team on live event production.',
}

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
}

function getPosts(): Post[] {
  const postsDir = join(process.cwd(), 'content', 'posts')
  if (!existsSync(postsDir)) return []

  const slugs = readdirSync(postsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  return slugs.map(slug => {
    const mdxPath = join(postsDir, slug, 'index.mdx')
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
    return {
      slug,
      title: fm.title || slug,
      date: fm.date || '',
      excerpt: fm.excerpt || '',
      author: fm.author || 'CueDeck Team',
    }
  }).filter(Boolean).sort((a, b) => b!.date.localeCompare(a!.date)) as Post[]
}

export default function BlogPage() {
  const posts = getPosts()

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

        {/* Posts */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '64px 40px' }}>
          {posts.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: 16 }}>No posts yet — check back soon.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {posts.map(post => (
                <article key={post.slug} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: 40 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.date}</span>
                    <span style={{ fontSize: 12, color: '#d1d5db' }}>·</span>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.author}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 10, letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                      {post.title}
                    </h2>
                  </Link>
                  <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} style={{ fontSize: 14, fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}>
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
