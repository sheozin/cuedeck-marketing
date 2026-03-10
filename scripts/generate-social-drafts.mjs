#!/usr/bin/env node
/**
 * generate-social-drafts.mjs
 * Reads a blog post and generates ready-to-post social media drafts.
 *
 * Usage:  node scripts/generate-social-drafts.mjs <post-slug>
 * Example: node scripts/generate-social-drafts.mjs introducing-cuedeck
 */
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const POSTS_DIR = join(ROOT, 'content', 'posts')
const BASE_URL = 'https://cuedeck.io'

function parseFrontmatter(raw) {
  const fm = {}
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (match) {
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(': ')
      if (key) fm[key.trim()] = rest.join(': ').trim()
    })
  }
  return fm
}

// ── If no slug given, list all posts ────────────────────────────────────────
const slug = process.argv[2]

if (!slug || slug === '--list') {
  console.log('\nAvailable blog posts:\n')
  const dirs = readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const mdxPath = join(POSTS_DIR, d.name, 'index.mdx')
      if (!existsSync(mdxPath)) return null
      const fm = parseFrontmatter(readFileSync(mdxPath, 'utf-8'))
      return { slug: d.name, date: fm.date || '?', title: fm.title || d.name }
    })
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date))

  dirs.forEach(p => console.log(`  ${p.date}  ${p.slug}`))
  console.log(`\nUsage: node scripts/generate-social-drafts.mjs <slug>\n`)
  process.exit(0)
}

// ── Generate drafts for given slug ──────────────────────────────────────────
const mdxPath = join(POSTS_DIR, slug, 'index.mdx')
if (!existsSync(mdxPath)) {
  console.error(`Post not found: ${slug}`)
  console.error(`Run with --list to see available posts.`)
  process.exit(1)
}

const raw = readFileSync(mdxPath, 'utf-8')
const fm = parseFrontmatter(raw)
const title = fm.title || slug
const excerpt = fm.excerpt || ''
const url = `${BASE_URL}/blog/${slug}`

// ── Twitter/X (< 280 chars) ──────────────────────────────────────────────────
const twitterDraft = `New on the CueDeck blog:

${title}

${excerpt.length > 180 ? excerpt.slice(0, 177) + '...' : excerpt}

${url}`

// ── LinkedIn (longer-form) ──────────────────────────────────────────────────
const linkedinDraft = `${title}

${excerpt}

Read the full post: ${url}

#eventprofs #liveevents #eventtech #eventproduction #cuedeck`

console.log('\n' + '='.repeat(60))
console.log('  SOCIAL MEDIA DRAFTS')
console.log('  Post: ' + title)
console.log('='.repeat(60))

console.log('\n--- TWITTER/X ---')
console.log(`(${twitterDraft.length} chars)`)
console.log()
console.log(twitterDraft)

console.log('\n--- LINKEDIN ---')
console.log(`(${linkedinDraft.length} chars)`)
console.log()
console.log(linkedinDraft)

console.log('\n' + '='.repeat(60))
console.log()
