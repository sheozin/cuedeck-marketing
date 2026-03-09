import { MetadataRoute } from "next";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

const BASE_URL = "https://cuedeck.io";

function getBlogSlugs(): string[] {
  const postsDir = join(process.cwd(), "content", "posts");
  if (!existsSync(postsDir)) return [];
  return readdirSync(postsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: BASE_URL,               lastModified: new Date(), changeFrequency: "weekly",   priority: 1 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/blog`,     lastModified: new Date(), changeFrequency: "weekly",   priority: 0.9 },
    { url: `${BASE_URL}/docs`,     lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/contact`,  lastModified: new Date(), changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE_URL}/privacy`,  lastModified: new Date(), changeFrequency: "yearly",   priority: 0.3 },
    { url: `${BASE_URL}/terms`,    lastModified: new Date(), changeFrequency: "yearly",   priority: 0.3 },
    ...blogEntries,
  ];
}
