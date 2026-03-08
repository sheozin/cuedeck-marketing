import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CueDeck — The Command Center for Live Events",
  description:
    "Real-time session management for directors, stage managers, AV teams, and interpreters. Run your event like a pro.",
  openGraph: {
    title: "CueDeck — The Command Center for Live Events",
    description: "Real-time session management for live event production teams.",
    url: "https://cuedeck.io",
    siteName: "CueDeck",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
