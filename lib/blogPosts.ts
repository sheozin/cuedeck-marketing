import { createClient } from "@supabase/supabase-js";
import { getAllPosts } from "./posts";

// The published posts the blog pages render (Supabase blog_posts), for the
// sitemap and RSS feed, so all three list the same posts with the same dates.
export type PublishedPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string; // updated_at ?? published_at
  coverImage: string | null;
};

export async function getPublishedPosts(): Promise<PublishedPost[]> {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
  const { data, error } = await sb
    .from("blog_posts")
    .select("slug, title, excerpt, cover_image, published_at, updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (!error && data) {
    return data.map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? "",
      publishedAt: p.published_at,
      updatedAt: p.updated_at ?? p.published_at,
      coverImage: p.cover_image,
    }));
  }

  // DB unreachable: fall back to the MDX files rather than an empty feed.
  console.error("getPublishedPosts: blog_posts query failed, using MDX fallback", error?.message);
  return getAllPosts().map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    publishedAt: p.date,
    updatedAt: p.date,
    coverImage: p.featuredImage,
  }));
}
