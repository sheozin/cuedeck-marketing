import { NextResponse } from 'next/server'
import { getPublishedPosts } from '../../../lib/blogPosts'
import { SITE_URL } from '../../../lib/site'

export const revalidate = 3600

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = await getPublishedPosts()

  const items = posts
    .map(p => {
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
      <author>hello@cuedeck.io (CueDeck Team)</author>
    </item>`
    })
    .join('')

  // The newest post change, not the request time.
  const newest = posts.map(p => p.updatedAt).sort().at(-1)
  const lastBuild = newest ? new Date(newest).toUTCString() : null

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CueDeck Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Insights, tips, and updates from the CueDeck team on live event production.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${lastBuild ? `<lastBuildDate>${lastBuild}</lastBuildDate>` : ''}
    ${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
