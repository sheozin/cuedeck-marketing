import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — CueDeck",
  description: "The terms and conditions governing use of the CueDeck platform.",
};

const prose: React.CSSProperties = { fontSize: 15, color: "#4b5563", lineHeight: 1.8, marginBottom: 16 };
const h2s: React.CSSProperties  = { fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 12, marginTop: 48, letterSpacing: "-0.3px" };

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <section style={{ padding: "80px 40px 120px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" as const, marginBottom: 12 }}>Legal</p>
            <h1 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: 8 }}>Terms of Service</h1>
            <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 48 }}>Last updated: March 2026</p>

            <h2 style={h2s}>1. Acceptance of Terms</h2>
            <p style={prose}>By accessing or using the CueDeck platform (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the Service. These Terms apply to all users, including operators, directors, and administrators.</p>

            <h2 style={h2s}>2. Service Description</h2>
            <p style={prose}>CueDeck is a real-time live event management platform providing session management, multi-role operator access, digital signage control, AI-assisted incident diagnosis, and post-event reporting. The Service is provided on a subscription or per-event basis as described on the pricing page.</p>

            <h2 style={h2s}>3. Account Registration</h2>
            <p style={prose}>You must register for an account to use the Service. You agree to provide accurate, current, and complete information and to keep your account credentials secure. You are responsible for all activity that occurs under your account. Notify us immediately at <a href="mailto:support@cuedeck.io" style={{ color: "#3b82f6", textDecoration: "none" }}>support@cuedeck.io</a> if you suspect any unauthorised use.</p>

            <h2 style={h2s}>4. Subscription and Billing</h2>
            <p style={prose}>Paid plans are billed in advance on a monthly or per-event basis. All fees are non-refundable except as required by law. We reserve the right to change pricing with 30 days&apos; notice. Continued use after a price change constitutes acceptance of the new pricing. Free trials are provided for the period stated at sign-up with no credit card required.</p>

            <h2 style={h2s}>5. Acceptable Use</h2>
            <p style={prose}>You agree not to: use the Service for any unlawful purpose; transmit any harmful, offensive, or disruptive content through the broadcast system; attempt to gain unauthorised access to any part of the Service; reverse-engineer, decompile, or disassemble the Service; or use the Service to build a competing product.</p>

            <h2 style={h2s}>6. Intellectual Property</h2>
            <p style={prose}>The Service and its original content, features, and functionality are owned by CueDeck and are protected by copyright, trademark, and other intellectual property laws. You retain all rights to the event data you enter into the platform. By using the Service, you grant us a limited licence to process and display that data solely to provide the Service to you.</p>

            <h2 style={h2s}>7. Disclaimer of Warranties</h2>
            <p style={prose}>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Service will be uninterrupted or error-free.</p>

            <h2 style={h2s}>8. Limitation of Liability</h2>
            <p style={prose}>To the fullest extent permitted by applicable law, CueDeck shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Service. Our total liability for any claim shall not exceed the amount you paid to us in the 12 months preceding the claim.</p>

            <h2 style={h2s}>9. Termination</h2>
            <p style={prose}>You may cancel your account at any time from your account settings. We may suspend or terminate your access to the Service immediately, without notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service ceases immediately.</p>

            <h2 style={h2s}>10. Changes to Terms</h2>
            <p style={prose}>We reserve the right to modify these Terms at any time. We will notify you of material changes by email or by posting a notice on the Service. Your continued use after the effective date of the revised Terms constitutes acceptance of those changes.</p>

            <h2 style={h2s}>11. Governing Law</h2>
            <p style={prose}>These Terms are governed by and construed in accordance with the laws of Ireland, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dublin, Ireland.</p>

            <h2 style={h2s}>12. Contact</h2>
            <p style={prose}>For questions about these Terms, contact us at <a href="mailto:legal@cuedeck.io" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>legal@cuedeck.io</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
