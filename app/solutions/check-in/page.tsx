import type { Metadata } from "next";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { jsonLd } from "../../../lib/jsonLd";
import { getCheckinPrice } from "../../../lib/checkinPrice";
import {
  Hero, Section, Steps, FeatureGrid, Showcase, Faq, CtaStrip, breadcrumbs, faqJsonLd, TRIAL_URL, BASE_URL,
} from "../../../components/Solutions";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Event Check-in with QR Codes and Badges",
  description: "Import your guest list, email QR codes, check whole teams in with one scan and print badges. Works offline. One price per event, no subscription.",
  alternates: { canonical: `${BASE_URL}/solutions/check-in` },
  openGraph: {
    title: "Event Check-in with QR Codes and Badges | CueDeck",
    description: "Guest list, QR emails, a fast desk, door scanner phones and a live dashboard. One price per event.",
    url: `${BASE_URL}/solutions/check-in`,
    type: "website",
  },
};

const steps = [
  { title: "Import your guests", desc: "Upload a CSV. You see who will be added, updated or skipped before anything is saved." },
  { title: "Send QR codes", desc: "Every guest gets an email with a personal QR code. Try the desk with a free test run first." },
  { title: "Check people in", desc: "Scan or search at the desk, or point a phone at the door. Badges print as people arrive." },
];

const capabilities = [
  { title: "Whole teams at once", desc: "One scan brings up everyone from the same company. Tick who is standing there and check them in together." },
  { title: "Badges on demand", desc: "Print from the desk to any printer Chrome can reach. No print server and no extra software." },
  { title: "Self-registration kiosk", desc: "Walk-ins sign themselves in on a tablet. Pair it with a code and revoke it any time." },
  { title: "Works offline", desc: "If the Wi-Fi drops, the desk keeps checking people in and syncs when the connection is back." },
  { title: "Mistakes are undoable", desc: "Checked in the wrong person? Undo it. Every correction stays in the log, nothing is erased." },
  { title: "Staff see only their event", desc: "Invite registration staff by email. They get the desk for your event and nothing else." },
  { title: "Arrival alerts", desc: "Pick the ticket types that matter, such as VIP or Speaker. When one arrives, every desk and the dashboard shows it." },
  { title: "Attendance export", desc: "Download the guest list with arrival times as a CSV whenever you need it." },
];

export default async function CheckinPage() {
  const price = await getCheckinPrice();
  const priceText = price ? `${price.label}${price.taxExclusive ? " excl. VAT" : ""}` : null;

  const faqs = [
    {
      q: "What does going live mean?",
      a: priceText
        ? `Setup and a test run are free: up to 25 test check-ins, cleared when you go live. Going live is a one-off ${priceText} payment for that event, which turns on real check-ins and QR emails.`
        : "Setup and a test run are free: up to 25 test check-ins, cleared when you go live. Going live is a one-off payment for that event, which turns on real check-ins and QR emails. You see the price before you pay.",
    },
    { q: "Do I need special hardware?", a: "No. Any laptop or tablet with Chrome runs the desk. A USB QR scanner is faster but optional, phones work as door scanners, and badges print to any printer Chrome can use." },
    { q: "Is there a limit on attendees?", a: "There is no per-attendee fee and no ticket commission. Each CSV import takes up to 5,000 rows, and you can import more than once." },
    { q: "When can guests be checked in?", a: "From a week before the event until two days after it. The post-event report is emailed to you once that window closes." },
    { q: "What happens if the venue Wi-Fi fails?", a: "The desk keeps working and stores check-ins on the device. They sync on their own when the connection returns, and the dashboard shows any desk that is still catching up." },
    { q: "Do I need to use CueDeck for the rest of the show?", a: "No. Check-in works on its own. If you already run your show in CueDeck, it uses the same login and the same events." },
  ];

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs("Event Check-in", "/solutions/check-in")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(faqs)) }} />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <Hero
          eyebrow="CueDeck Event Check-in"
          title={<>Every guest through the door in seconds</>}
          lead="Import your guest list, email everyone a QR code, and run the registration desk from any laptop or tablet. Badges print as people arrive, and it keeps working when the venue Wi-Fi does not."
          primary={{ label: "Set up your event free", href: TRIAL_URL }}
          secondary={{ label: "See how it works", href: "#how" }}
          note={priceText
            ? <>Free to set up and test · {priceText} per event to go live · No subscription</>
            : <>Free to set up and test · No subscription · See pricing when you sign up</>}
          img={{ src: "/screenshots/checkin-desk-group-arrival.jpg", width: 1440, height: 900,
            alt: "CueDeck check-in desk: one search brings up three guests from the same company, ready to check in together" }}
        />

        <Section id="how" eyebrow="How it works" title="Ready before the doors open" lead="Three steps, all in your browser. No app to install and no hardware to rent." bg="#f9fafb">
          <Steps items={steps} />
        </Section>

        <Showcase
          eyebrow="Guest list"
          title="Your guest list, checked before it is saved"
          desc="Drop in a CSV and CueDeck shows who will be added, updated or skipped. Track who has their QR email, who has arrived, and test everything before you pay."
          img={{ src: "/screenshots/checkin-setup-guest-list.jpg", width: 1440, height: 900,
            alt: "Check-in setup: attendee list with company, ticket type, QR email status and arrival status" }}
        />

        <Showcase
          flip
          eyebrow="Door scanners"
          title="Any phone becomes a door scanner"
          desc="Pair a phone with a code from the desk and point it at guests' QR codes. It confirms each arrival with a sound and a clear tick, and refuses codes from other events."
          points={["No app to install", "Each scanner is tied to one entrance", "Revoke a phone from the desk at any time"]}
          img={{ src: "/screenshots/checkin-door-scanner-phone.jpg", width: 390, height: 844,
            alt: "Door scanner on a phone showing a green Checked in confirmation for a delegate" }}
          imgMaxWidth={300}
        />

        <Showcase
          eyebrow="Live dashboard"
          title="See the doors from anywhere"
          desc="Arrivals over time, every desk and its sync status, which companies are still missing people, and alerts the moment a VIP walks in."
          points={["Arrivals per 15 minutes and turnout by ticket type", "Company board: who is here, who is partly here, who has not arrived", "Desk health, including check-ins waiting to sync"]}
          img={{ src: "/screenshots/checkin-dashboard-live.jpg", width: 1440, height: 1250,
            alt: "Check-in dashboard with arrival totals, desk status, arrival alerts, company board and arrivals chart" }}
        />

        <Section eyebrow="Built for the busy hour" title="The queue moves, the desk stays calm" lead="Designed for the twenty minutes when everyone arrives at once." bg="#f9fafb">
          <FeatureGrid items={capabilities} />
        </Section>

        <Showcase
          flip
          eyebrow="After the event"
          title="The report writes itself"
          desc="When check-in closes, a report lands in your inbox: turnout by ticket type, the busiest fifteen minutes, how each desk performed, and which companies had people missing."
          img={{ src: "/screenshots/checkin-post-event-report.jpg", width: 1440, height: 1080,
            alt: "Post-event check-in report with turnout, ticket types, desk totals and companies with people missing" }}
        />

        <Section eyebrow="Pricing" title="One price per event. Everything included." lead="No per-attendee fees, no ticket commission, no subscription." bg="#f9fafb">
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", maxWidth: 860, margin: "0 auto" }}>
            <div style={{ padding: 32, borderRadius: 16, background: "#fff", border: "2px solid #3b82f6", boxShadow: "0 8px 30px rgba(59,130,246,0.12)" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Check-in · per event</p>
              {price ? (
                <p style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 44, fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>{price.label}</span>
                  {price.taxExclusive && <span style={{ fontSize: 15, color: "#6b7280", marginLeft: 8 }}>excl. VAT</span>}
                </p>
              ) : (
                <p style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 6 }}>See pricing when you sign up</p>
              )}
              <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Set up and test free. Pay when you go live.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "#374151" }}>
                {["Unlimited desks and door scanner phones", "QR code email to every guest", "Badge printing and self-registration kiosk", "Live dashboard, arrival alerts and post-event report", "Offline desk and attendance export"].map(x => <li key={x}>{x}</li>)}
              </ul>
              <a href={TRIAL_URL} style={{ display: "block", textAlign: "center", padding: 13, borderRadius: 10, background: "#3b82f6", color: "#fff", fontWeight: 700, textDecoration: "none" }}>Set up your event free</a>
            </div>
            <div style={{ padding: 32, borderRadius: 16, background: "#fff", border: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Already on CueDeck?</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 12 }}>Same login, same events</p>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.7, marginBottom: 16 }}>Check-in works on the events already in your CueDeck console. Open check-in, pick the event, and add your guest list.</p>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>Not using CueDeck for the show itself? You do not need to. Check-in works on its own.</p>
            </div>
          </div>
        </Section>

        <Section eyebrow="Questions" title="Frequently asked questions">
          <Faq items={faqs} />
        </Section>

        <CtaStrip
          title="Set up your next event's check-in today"
          lead="Import your guest list and try the desk free. Pay only when you are ready to go live."
          label="Get started free"
          href={TRIAL_URL}
        />
      </main>
      <Footer />
    </>
  );
}
