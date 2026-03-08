import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

export const metadata: Metadata = {
  title: "Terms of Service — CueDeck",
  description: "The terms and conditions governing use of the CueDeck platform.",
};

const prose: React.CSSProperties = { fontSize: 15, color: "#4b5563", lineHeight: 1.8, marginBottom: 16 };
const h2s: React.CSSProperties  = { fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 12, marginTop: 48, letterSpacing: "-0.3px" };

export default async function TermsPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const terms = await reader.singletons.terms.read()

  const sections = [
    { heading: '1. Acceptance of Terms',        key: 'acceptance',      text: terms?.acceptance },
    { heading: '2. Service Description',         key: 'serviceDesc',     text: terms?.serviceDesc },
    { heading: '3. Account Registration',        key: 'accountReg',      text: terms?.accountReg },
    { heading: '4. Subscription and Billing',    key: 'billing',         text: terms?.billing },
    { heading: '5. Acceptable Use',              key: 'acceptableUse',   text: terms?.acceptableUse },
    { heading: '6. Intellectual Property',       key: 'intellectualProp',text: terms?.intellectualProp },
    { heading: '7. Disclaimer of Warranties',    key: 'warranties',      text: terms?.warranties },
    { heading: '8. Limitation of Liability',     key: 'liability',       text: terms?.liability },
    { heading: '9. Termination',                 key: 'termination',     text: terms?.termination },
    { heading: '10. Changes to Terms',           key: 'changes',         text: terms?.changes },
    { heading: '11. Governing Law',              key: 'governingLaw',    text: terms?.governingLaw },
    { heading: '12. Contact',                    key: 'contactUs',       text: terms?.contactUs },
  ]

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <section style={{ padding: "80px 40px 120px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" as const, marginBottom: 12 }}>Legal</p>
            <h1 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#111827", letterSpacing: "-1px", marginBottom: 8 }}>Terms of Service</h1>
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
