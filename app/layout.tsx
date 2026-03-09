import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CookieBanner from "../components/CookieBanner";
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
        { "@type": "Offer", name: "Pay-per-event", price: "39",  priceCurrency: "EUR" },
        { "@type": "Offer", name: "Starter",        price: "59",  priceCurrency: "EUR", billingIncrement: "month" },
        { "@type": "Offer", name: "Pro",             price: "99",  priceCurrency: "EUR", billingIncrement: "month" },
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
        {/* Mobile responsive overrides — inline <style> bypasses Tailwind purge */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { overflow-x: hidden; }

          @media (max-width: 768px) {
            /* Collapse auto-fit minmax(320px) grids — at 375px the 295px content
               area is smaller than 320px min, so columns overflow without this. */
            [style*="minmax(320px, 1fr)"] {
              grid-template-columns: 1fr !important;
            }
            /* Reduce large gaps when stacked */
            [style*="gap: 60px"], [style*="gap:60px"] {
              gap: 32px !important;
            }
            [style*="gap: 64px"], [style*="gap:64px"] {
              gap: 32px !important;
            }
            /* Constrain mockup widths */
            [style*="max-width: 540px"],
            [style*="max-width: 560px"] {
              max-width: 100% !important;
            }
            /* Mockup right-col: stop pushing centre */
            [style*="justify-content: flex-end"] {
              justify-content: center !important;
            }
            /* Scale down large font sizes in mockup titlebar */
            h1 { letter-spacing: -0.5px !important; }
          }

          @media (max-width: 500px) {
            /* Hide dashboard mockup role pills that wrap badly */
            [style*="padding: 0px 40px"],
            [style*="padding:0 40px"] {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
          }
        ` }} />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
