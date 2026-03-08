import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const BASE_URL = "https://cuedeck.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "CueDeck — The Command Center for Live Events",
    template: "%s | CueDeck",
  },
  description:
    "Real-time session management for directors, stage managers, AV teams, interpreters, registration, and signage operators. Run your live event like a pro.",
  keywords: ["live event management", "event production software", "stage management", "digital signage", "conference operations"],
  authors: [{ name: "CueDeck" }],
  creator: "CueDeck",
  openGraph: {
    title: "CueDeck — The Command Center for Live Events",
    description: "Real-time session management for live event production teams.",
    url: BASE_URL,
    siteName: "CueDeck",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CueDeck — The Command Center for Live Events",
    description: "Real-time session management for live event production teams.",
    creator: "@cuedeck",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "CueDeck",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
      contactPoint: { "@type": "ContactPoint", email: "hello@cuedeck.io", contactType: "customer service" },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "CueDeck",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "CueDeck",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: BASE_URL,
      offers: [
        { "@type": "Offer", name: "Pay-per-event", price: "39", priceCurrency: "USD" },
        { "@type": "Offer", name: "Starter", price: "49", priceCurrency: "USD", billingIncrement: "month" },
        { "@type": "Offer", name: "Pro",     price: "99", priceCurrency: "USD", billingIncrement: "month" },
      ],
      description: "Real-time live event management platform for production teams.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
