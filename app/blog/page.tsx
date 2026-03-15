import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Blog — CueDeck',
  description: 'Insights, tips, and updates from the CueDeck team on live event production.',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
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
          {!posts || posts.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: 16 }}>No posts yet — check back soon.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {posts.map(post => (
                <article key={post.id} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: 40 }}>
                  {post.cover_image && (
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 16 }}>
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8, display: 'block' }}
                      />
                    </Link>
                  )}
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>{formatDate(post.published_at)}</span>
                    <span style={{ fontSize: 12, color: '#d1d5db' }}>·</span>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>CueDeck Team</span>
                    {post.read_time_minutes && (
                      <>
                        <span style={{ fontSize: 12, color: '#d1d5db' }}>·</span>
                        <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.read_time_minutes} min read</span>
                      </>
                    )}
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
