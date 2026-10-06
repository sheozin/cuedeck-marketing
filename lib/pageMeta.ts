import type { Metadata } from "next";

// Per-page metadata. The root layout's openGraph/twitter blocks describe the
// homepage; a page that sets only title/description inherits them whole, so
// every page used to share the homepage's og:url and og:title. Each page
// declares its own through this. A page-level openGraph block also drops the
// inherited image and outranks a segment's opengraph-image file, so the image
// is explicit: the root card by default, or the page's own card path.
export function pageMeta(path: string, title: string, description: string, image?: string): Metadata {
  const socialTitle = `${title} | CueDeck`;
  const card = (url: string) => [{ url, width: 1200, height: 630, alt: socialTitle }];
  const url = `https://cuedeck.io${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: socialTitle, description, url, siteName: "CueDeck", type: "website", locale: "en_US", images: card(image ?? "/opengraph-image") },
    twitter: { card: "summary_large_image", title: socialTitle, description, creator: "@cuedeck", images: card(image ?? "/twitter-image") },
  };
}
