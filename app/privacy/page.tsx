import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

export const metadata: Metadata = {
  title: "Privacy Policy — CueDeck",
  description: "How CueDeck collects, uses, and protects your personal information.",
};

const prose: React.CSSProperties = { fontSize: 15, color: "#4b5563", lineHeight: 1.8, marginBottom: 16 };
const h2s: React.CSSProperties  = { fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 12, marginTop: 48, letterSpacing: "-0.3px" };

export default async function PrivacyPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const privacy = await reader.singletons.privacy.read()

  const sections = [
    { heading: 'Introduction',                   key: 'intro',          text: privacy?.intro },
    { heading: 'Information We Collect',          key: 'dataCollection', text: privacy?.dataCollection },
    { heading: 'How We Use Your Information',     key: 'howWeUse',       text: privacy?.howWeUse },
    { heading: 'Data Sharing',                    key: 'dataSharing',    text: privacy?.dataSharing },
    { heading: 'Data Retention',                  key: 'dataRetention',  text: privacy?.dataRetention },
    { heading: 'Security',                        key: 'security',       text: privacy?.security },
    { heading: 'Your Rights (GDPR)',              key: 'gdprRights',     text: privacy?.gdprRights },
    { heading: 'Cookies',                         key: 'cookies',        text: privacy?.cookies },
    { heading: 'Contact Us',                      key: 'contactUs',      text: privacy?.contactUs },
  ]

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <section style={{ padding: "80px 40px 120px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" as const, marginBottom: 12 }}>Legal</p>
            <h1 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: 8 }}>Privacy Policy</h1>
            <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 48 }}>Last updated: March 2026</p>

            {sections.map(({ heading, key, text }) => text ? (
              <div key={key}>
                <h2 style={h2s}>{heading}</h2>
                {text.split('\n\n').map((para, i) => (
                  <p key={i} style={prose}>{para}</p>
                ))}
              </div>
            ) : null)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
