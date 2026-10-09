import type { Metadata } from "next";

// The Keystatic page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Keystatic",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
