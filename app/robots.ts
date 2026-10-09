import { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

// /login stays crawlable so Google can see its noindex meta; a disallow
// would hide the noindex and leave the bare URL indexable.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/auth/", "/keystatic"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
