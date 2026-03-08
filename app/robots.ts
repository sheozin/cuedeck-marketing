import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/keystatic/", "/keystatic"],
      },
    ],
    sitemap: "https://cuedeck.io/sitemap.xml",
  };
}
