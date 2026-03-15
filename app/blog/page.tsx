import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import type { Post } from './BlogGrid'
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

  const { data: posts, error } = await sb
    .from('blog_posts')
    .select('id, slug, title, excerpt, cover_image, tags, published_at, read_time_minutes')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) throw new Error(`Failed to load blog posts: ${error.message}`)
  const allPosts = (posts ?? []) as Post[]
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
