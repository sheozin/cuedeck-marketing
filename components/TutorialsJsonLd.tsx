import { jsonLd } from "../lib/jsonLd";
import { SITE_URL } from "../lib/site";
import { TUTORIAL_VIDEOS } from "../lib/tutorialVideos";

// ItemList of VideoObject for /tutorials. Only videos with a sourced
// uploadDate and description are listed (see lib/tutorialVideos.ts).
export default function TutorialsJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CueDeck tutorials",
    url: `${SITE_URL}/tutorials`,
    itemListElement: TUTORIAL_VIDEOS.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.name,
        description: v.description,
        uploadDate: v.uploadDate,
        duration: v.duration,
        thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${v.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}
