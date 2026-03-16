#!/usr/bin/env node
/**
 * One-time migration: read all MDX posts from content/posts/ and insert
 * them into the Supabase blog_posts table.
 *
 * Content is stored as { type: "markdown", content: "..." } in content_json
 * so the existing renderMarkdown() renderer on blog/[slug]/page continues to work.
 *
 * Usage: node scripts/migrate-mdx-to-db.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://sawekpguemzvuvvulfbc.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY env var is required.\nSet it before running: export SUPABASE_SERVICE_ROLE_KEY=your-key-here');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function parseFrontmatter(raw) {
  const fm = {};
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (match) {
    match[1].split('\n').forEach((line) => {
      const [key, ...rest] = line.split(': ');
      if (key) fm[key.trim()] = rest.join(': ').trim();
    });
  }
  const content = raw.replace(/^---\n[\s\S]*?\n---\n/, '');
  return { fm, content };
}

function estimateReadTime(content) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 200));
}

async function main() {
  const postsDir = join(ROOT, 'content', 'posts');
  if (!existsSync(postsDir)) {
    console.error('content/posts/ directory not found');
    process.exit(1);
  }

  const dirs = readdirSync(postsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  console.log(`\nMigrating ${dirs.length} MDX posts to Supabase blog_posts...\n`);

  // Fetch existing slugs so we can skip posts already in DB
  const { data: existing } = await sb.from('blog_posts').select('slug');
  const existingSlugs = new Set((existing ?? []).map((r) => r.slug));

  let inserted = 0;
  let skipped = 0;

  for (const slug of dirs) {
    const mdxPath = join(postsDir, slug, 'index.mdx');
    if (!existsSync(mdxPath)) {
      console.log(`  ⚠  ${slug} — no index.mdx, skipping`);
      skipped++;
      continue;
    }

    if (existingSlugs.has(slug)) {
      console.log(`  ⏭  ${slug} — already in DB, skipping`);
      skipped++;
      continue;
    }

    const raw = readFileSync(mdxPath, 'utf-8');
    const { fm, content } = parseFrontmatter(raw);

    if (!fm.date) {
      console.log(`  ⚠  ${slug} — no date in frontmatter, skipping`);
      skipped++;
      continue;
    }

    // Check if a featuredImage PNG exists
    const imgPath = join(postsDir, slug, fm.featuredImage || 'featuredImage.png');
    const coverImage = existsSync(imgPath)
      ? `/api/content-image/${slug}/${fm.featuredImage || 'featuredImage.png'}`
      : null;

    const row = {
      slug,
      title: fm.title || slug,
      excerpt: fm.excerpt || '',
      content_json: { type: 'markdown', content },
      cover_image: coverImage,
      tags: [],
      status: 'published',
      published_at: new Date(fm.date).toISOString(),
      read_time_minutes: estimateReadTime(content),
    };

    const { error } = await sb.from('blog_posts').insert(row);
    if (error) {
      console.error(`  ✗  ${slug} — insert failed: ${error.message}`);
    } else {
      console.log(`  ✓  ${slug}`);
      inserted++;
    }
  }

  console.log(`\nDone: ${inserted} inserted, ${skipped} skipped.\n`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
