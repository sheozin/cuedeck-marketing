import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — CueDeck",
  description: "How CueDeck collects, uses, and protects your personal information.",
};

const prose: React.CSSProperties = { fontSize: 15, color: "#4b5563", lineHeight: 1.8, marginBottom: 16 };
const h2s: React.CSSProperties  = { fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 12, marginTop: 48, letterSpacing: "-0.3px" };

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <section style={{ padding: "80px 40px 120px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" as const, marginBottom: 12 }}>Legal</p>
            <h1 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: 8 }}>Privacy Policy</h1>
            <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 48 }}>Last updated: March 2026</p>

            <h2 style={h2s}>Introduction</h2>
            <p style={prose}>CueDeck (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the CueDeck live event management platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. Please read this policy carefully. If you disagree with its terms, please discontinue use of the service.</p>

            <h2 style={h2s}>Information We Collect</h2>
            <p style={prose}>We collect information you provide directly, including: your name, email address, and password when you create an account; payment information processed securely via our payment provider (we do not store card numbers); event data, session schedules, and operator information you enter into the platform; and communications you send to us.</p>
            <p style={prose}>We also collect information automatically, including: log data (IP address, browser type, pages visited, timestamps); device information; and usage data such as features accessed and actions taken within the console.</p>

            <h2 style={h2s}>How We Use Your Information</h2>
            <p style={prose}>We use the information we collect to: provide, maintain, and improve the CueDeck service; process transactions and send related information; send technical notices and support messages; respond to your comments and questions; and monitor and analyse usage and trends to improve the platform.</p>
            <p style={prose}>We do not use your event data for advertising. Your session schedules, operator lists, and broadcast messages are your data — we access them only as necessary to provide the service or when required by law.</p>

            <h2 style={h2s}>Data Sharing</h2>
            <p style={prose}>We do not sell, trade, or rent your personal information to third parties. We may share information with: service providers who perform services on our behalf (hosting, payment processing, analytics) subject to confidentiality obligations; business partners with your consent; and law enforcement or government bodies when required by applicable law.</p>

            <h2 style={h2s}>Data Retention</h2>
            <p style={prose}>We retain your account information for as long as your account is active or as needed to provide the service. Event data is retained for 12 months after an event&apos;s end date, after which it may be deleted or anonymised. You may request deletion of your account and associated data at any time by contacting us.</p>

            <h2 style={h2s}>Security</h2>
            <p style={prose}>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All data is encrypted in transit using TLS and at rest using AES-256. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h2 style={h2s}>Your Rights (GDPR)</h2>
            <p style={prose}>If you are located in the European Economic Area, you have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data (right to erasure); object to or restrict processing; and data portability. To exercise these rights, contact <a href="mailto:privacy@cuedeck.io" style={{ color: "#3b82f6", textDecoration: "none" }}>privacy@cuedeck.io</a>. We will respond within 30 days.</p>

            <h2 style={h2s}>Cookies</h2>
            <p style={prose}>We use strictly necessary cookies to keep you signed in and maintain your session. We do not use advertising or tracking cookies. You may disable cookies in your browser settings, but this will prevent you from signing in to the service.</p>

            <h2 style={h2s}>Contact Us</h2>
            <p style={prose}>For questions about this Privacy Policy, contact us at <a href="mailto:privacy@cuedeck.io" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>privacy@cuedeck.io</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
