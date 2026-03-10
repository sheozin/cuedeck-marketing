import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  featuredImage: string | null
  content: string
}

/** Parse YAML-like frontmatter from an MDX file */
function parseFrontmatter(raw: string): { fm: Record<string, string>; content: string } {
  const fm: Record<string, string> = {}
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (match) {
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(': ')
      if (key) fm[key.trim()] = rest.join(': ').trim()
    })
  }
  const content = raw.replace(/^---\n[\s\S]*?\n---\n/, '')
  return { fm, content }
}

/** Format a YYYY-MM-DD date string to "Mon DD, YYYY" without locale-dependent APIs. */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  if (!y || !m || !d) return dateStr
  return `${MONTHS[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`
}

/** Read a single blog post by slug. Returns null if not found. */
export function getPost(slug: string): Post | null {
  const mdxPath = join(process.cwd(), 'content', 'posts', slug, 'index.mdx')
  if (!existsSync(mdxPath)) return null

  const raw = readFileSync(mdxPath, 'utf-8')
  const { fm, content } = parseFrontmatter(raw)

  return {
    slug,
    title: fm.title || slug,
    date: fm.date || '',
    excerpt: fm.excerpt || '',
    author: fm.author || 'CueDeck Team',
    featuredImage: fm.featuredImage
      ? `/api/content-image/${slug}/${fm.featuredImage}`
      : null,
    content,
  }
}

/** Get all blog posts, sorted newest-first. */
export function getAllPosts(): Post[] {
  const postsDir = join(process.cwd(), 'content', 'posts')
  if (!existsSync(postsDir)) return []

  return readdirSync(postsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => getPost(d.name))
    .filter((p): p is Post => p !== null && !!p.date)
    .sort((a, b) => b.date.localeCompare(a.date))
}

/** Get related posts (excluding a given slug), sorted newest-first. */
export function getRelatedPosts(currentSlug: string, count = 3): Post[] {
  return getAllPosts()
    .filter(p => p.slug !== currentSlug)
    .slice(0, count)
}
