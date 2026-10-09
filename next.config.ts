import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control",  value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options",          value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options",   value: "nosniff" },
  { key: "Referrer-Policy",          value: "origin-when-cross-origin" },
  { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Filenames are not hashed, so a day fresh plus a week of background revalidation.
        source: "/screenshots/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/d",
        destination: "https://app.cuedeck.io/d",
        permanent: true,
      },
      {
        source: "/check-in",
        destination: "/solutions/check-in",
        permanent: true,
      },
      {
        source: "/display",
        destination: "https://app.cuedeck.io/display",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
