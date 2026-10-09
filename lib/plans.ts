import { SITE_URL } from "./site";

// The Command Center plans shown on /pricing, and the single source for the
// SoftwareApplication offers in structured data. EUR, tax inclusive.
export const TRIAL_URL = "https://app.cuedeck.io/#signup";

export type Plan = {
  name: string;
  price: { monthly: number; annual: number };
  period: string;
  billing: "event" | "month";
  description: string;
  highlight: boolean;
  badge: string | null;
  features: string[];
  cta: string;
  ctaHref: string;
  ctaStyle: string;
};

export const plans: Plan[] = [
  {
    name: "Pay-per-event",
    price: { monthly: 39, annual: 39 },
    period: "per event",
    billing: "event",
    description: "Perfect for freelancers and one-off productions.",
    highlight: false,
    badge: null,
    features: [
      "1 event",
      "Up to 5 operators",
      "All 6 roles included",
      "Real-time sync",
      "Basic signage (2 displays)",
    ],
    cta: "Buy single event",
    ctaHref: TRIAL_URL,
    ctaStyle: "outline",
  },
  {
    name: "Starter",
    price: { monthly: 59, annual: 47 },
    period: "/month",
    billing: "month",
    description: "For small teams running regular events.",
    highlight: false,
    badge: null,
    features: [
      "1 active event at a time",
      "Up to 5 operators",
      "All 6 roles included",
      "Real-time sync",
      "5 signage displays",
      "Post-event reports",
      "3-day free trial",
    ],
    cta: "Start free trial",
    ctaHref: TRIAL_URL,
    ctaStyle: "outline",
  },
  {
    name: "Pro",
    price: { monthly: 99, annual: 79 },
    period: "/month",
    billing: "month",
    description: "Full power for production companies.",
    highlight: true,
    badge: "Most popular",
    features: [
      "Unlimited active events",
      "Up to 20 operators",
      "All 6 roles included",
      "Unlimited signage displays",
      "AI Incident Advisor",
      "AI post-event reports",
      "Delay cascade",
      "Priority support",
      "3-day free trial",
    ],
    cta: "Start free trial",
    ctaHref: TRIAL_URL,
    ctaStyle: "filled",
  },
];

// Real screenshots in public/screenshots (each verified to return 200 on www).
const SCREENSHOTS = [
  "cuedeck-command-center-director-console.jpg",
  "cuedeck-stage-timer-full-screen-countdown.jpg",
  "cuedeck-console-timeline-view.jpg",
];

// SoftwareApplication for / and /pricing only (not sitewide). Offers are the
// monthly list prices from `plans`; the annual rate is not a separate offer.
export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "CueDeck",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: "Real-time live event management platform for production teams.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  screenshot: SCREENSHOTS.map(f => `${SITE_URL}/screenshots/${f}`),
  offers: plans.map(p => ({
    "@type": "Offer",
    name: p.name,
    price: String(p.price.monthly),
    priceCurrency: "EUR",
    url: `${SITE_URL}/pricing`,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(p.price.monthly),
      priceCurrency: "EUR",
      valueAddedTaxIncluded: true,
      ...(p.billing === "month"
        ? { billingDuration: "P1M", unitCode: "MON" }
        : { unitText: "event" }),
    },
  })),
};
