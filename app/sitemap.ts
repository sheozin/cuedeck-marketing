import { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
import { getPublishedPosts } from "../lib/blogPosts";

export const revalidate = 3600;

// lastModified for static pages = `git log -1 --format=%cI -- <page file>`
// taken on 2026-10-09. Update the date when you change a page's content.
const PAGES: { path: string; lastModified: string }[] = [
  { path: "",                           lastModified: "2026-10-09T12:11:35+02:00" },
  { path: "/pricing",                   lastModified: "2026-10-09T11:43:17+02:00" },
  { path: "/solutions/command-center",  lastModified: "2026-10-09T11:56:15+02:00" },
  { path: "/solutions/stage-timer",     lastModified: "2026-10-09T11:56:15+02:00" },
  { path: "/solutions/check-in",        lastModified: "2026-10-06T17:30:50+02:00" },
  { path: "/about",                     lastModified: "2026-10-09T11:43:17+02:00" },
  { path: "/docs",                      lastModified: "2026-10-09T11:43:17+02:00" },
  { path: "/tutorials",                 lastModified: "2026-10-09T11:43:17+02:00" },
  { path: "/contact",                   lastModified: "2026-10-06T11:59:07+02:00" },
  { path: "/privacy",                   lastModified: "2026-10-06T11:59:07+02:00" },
  { path: "/terms",                     lastModified: "2026-10-06T11:59:07+02:00" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  // /blog changes when a post does.
  const blogLastModified = posts.map(p => p.updatedAt).sort().at(-1);

  return [
    ...PAGES.map(p => ({ url: `${SITE_URL}${p.path}`, lastModified: p.lastModified })),
    { url: `${SITE_URL}/blog`, ...(blogLastModified ? { lastModified: blogLastModified } : {}) },
    ...posts.map(p => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ];
}
