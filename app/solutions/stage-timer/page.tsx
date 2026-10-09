import type { Metadata } from "next";
import { pageMeta } from "../../../lib/pageMeta";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { jsonLd } from "../../../lib/jsonLd";
import { DOT } from "../../../components/DeviceFrames";
import { Hero, Section, FeatureGrid, Showcase, Faq, CtaStrip, breadcrumbs, faqJsonLd, TRIAL_URL } from "../../../components/Solutions";

export const metadata: Metadata = pageMeta("/solutions/stage-timer", "Stage Timer and Confidence Monitor for Events", "A full-screen stage timer, a confidence monitor for speakers and 11 signage display modes, all driven by your run of show. Pair any screen with a code.", "/solutions/stage-timer/opengraph-image");

const features = [
  { title: "Colour-coded countdown", desc: "Green, then amber, then red as time runs down, readable from the back of the stage." },
  { title: "Hold and overrun", desc: "HOLD freezes the clock. When a session runs over, the timer flashes so the speaker cannot miss it." },
  { title: "Confidence monitor", desc: "A fullscreen view for speakers and stage crew: the session title and speaker, elapsed and remaining time, the LIVE, OVERRUN or HOLD status, the next session and the director's broadcasts." },
  { title: "Next session underneath", desc: "The stage timer shows what comes next, so the speaker and the stage manager are ready for the handover." },
  { title: "11 display modes", desc: "Stage timer, schedule, agenda, timeline, programme, wayfinding, sponsors, break, Wi-Fi, recall and custom messages." },
  { title: "Pair with a code", desc: "Each screen shows a short code. Enter it in the console and the screen is yours. No network setup, no IP addresses." },
  { title: "Driven from the run of show", desc: "Screens follow the live schedule. Apply a delay in the console and every screen updates." },
];

// Every statement here comes from the Digital Signage, Stage Monitor and Stage Timer docs sections.
const details = [
  {
    title: "How the stage timer works",
    body: "Register a display, set its mode to Stage Timer and open it on a screen facing the stage. It picks up the session that is live in the console and counts down on its own. The numbers turn from green to amber to red as the end approaches. If the speaker runs over, the timer flashes and counts the time over, for example +2:15. When no session is live, it shows a standby screen with the next scheduled session, and a progress bar along the bottom shows how far through the session the speaker is.",
  },
  {
    title: "Hold, delays and the director's clock",
    body: "When the director puts a session on hold, the countdown freezes and shows HOLD until the session resumes. When a delay is applied in the console, the timer and every other screen follow the new schedule. The stage timer counts from the same synced clock as the console, so the stage and the director never disagree about how much time is left. A message to the speaker sent from the console shows on that room's stage timer and stage monitor, and clears by itself when the session ends.",
  },
  {
    title: "The confidence monitor",
    body: "The Stage Monitor is the confidence monitor for speakers and stage crew. Open it from the Stage Monitor button in the console and it goes fullscreen. Put that browser on a monitor facing the stage and it shows the current session title and speaker in large type, elapsed and remaining time, the session status and a preview of what follows. Broadcast messages from the director appear on it too. It uses a high-contrast dark theme, and Escape closes it.",
  },
  {
    title: "Connecting a screen",
    body: "On the TV, tablet or monitor, open app.cuedeck.io/d in any browser. A 6-character pairing code appears. Type it into the Signage panel, click Pair and the screen is connected. Install the display from the browser and it runs as a fullscreen app that survives reboots. Paired displays reconnect on their own if the network drops, and the Signage panel shows which ones are online.",
  },
  {
    title: "Signage for the rest of the venue",
    body: "The same screens can show the agenda, a time and room programme grid, sponsor logos, the Wi-Fi details, a break countdown or a custom message. A display can rotate through a sequence of modes, such as sponsors, then the agenda, then the Wi-Fi details. The director can push an override such as a break screen, a 5-minute recall or an emergency message to every display at once, and it stays up until it is cleared.",
  },
];

const faqs = [
  { q: "Do I need special hardware for the stage timer?", a: "No. Any screen with a web browser works, such as a TV, a tablet or a monitor on a laptop. Open app.cuedeck.io/d on it and pair it with a code. You can also install the display as a fullscreen app from the browser." },
  { q: "How do I connect a screen?", a: "Open app.cuedeck.io/d on the screen and a 6-character pairing code appears. Type the code into the Signage panel in the console and click Pair. The code expires after 5 minutes if it is not used." },
  { q: "What happens when a speaker runs over time?", a: "The countdown goes from green to amber to red as time runs low. Once the session passes its planned end, the timer flashes and shows the time over, for example +2:15, and the session shows as OVERRUN in the console." },
  { q: "What does HOLD do?", a: "HOLD pauses a live session, for example during a technical issue. The stage timer freezes and shows HOLD until the director or stage manager resumes the session." },
  { q: "How many display modes are there?", a: "Eleven: stage timer, schedule, agenda, timeline, programme, wayfinding, sponsors, break, Wi-Fi, recall and custom message. A display can show one mode or rotate through a sequence of them." },
  { q: "How many screens can I connect?", a: "Pay-per-event includes 2 signage displays, Starter includes 5 and Pro has no limit. The stage timer is included in every plan." },
];

const related = [
  { href: "/solutions/command-center", label: "Show calling and run of show software", desc: "Run the live schedule the screens follow." },
  { href: "/solutions/check-in", label: "Event check-in with QR codes", desc: "Run the registration desk from a laptop or tablet." },
  { href: "/blog/digital-signage-live-events", label: "Digital signage for live events", desc: "What to show on each screen in the venue." },
  { href: "/blog/stage-manager-workflow-guide", label: "Stage manager workflow", desc: "From ready to live, with the confidence monitor." },
];

export default function StageTimerPage() {
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs("Stage Timer & Displays", "/solutions/stage-timer")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(faqs)) }} />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <Hero
          eyebrow="Stage Timer & Displays"
          title={<>Every speaker knows exactly where they stand</>}
          lead="A stage timer and confidence monitor for every speaker, and signage for every other screen in the venue, all driven by the same live run of show."
          primary={{ label: "Start free trial", href: TRIAL_URL }}
          secondary={{ label: "See pricing", href: "/pricing" }}
          note={<>Included in every CueDeck plan</>}
          img={{ src: "/screenshots/cuedeck-stage-timer-full-screen-countdown.jpg", width: 1600, height: 900,
            alt: "Full-screen stage timer: 14:00 remaining in green, the session title, speaker and next session" }}
          device="monitor"
          labels={[
            { dot: DOT.ok, title: "Live on the stage screen", sub: "14:00 remaining", pos: { right: -10, top: -14 } },
            { dot: DOT.info, title: "Next session underneath", sub: "Panel: building crews that scale", pos: { left: -14, bottom: "12%" } },
          ]}
        />
        <Section eyebrow="On every screen" title="One schedule, every display" bg="#f9fafb">
          <FeatureGrid items={features} />
        </Section>
        <Section eyebrow="In detail" title="The stage timer, the confidence monitor and the signage" lead="What each screen shows, and how it stays in step with the console.">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {details.map(d => (
              <div key={d.title} style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{d.title}</h3>
                <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75 }}>{d.body}</p>
              </div>
            ))}
          </div>
        </Section>
        <Showcase
          flip
          eyebrow="Lobby screens"
          title="The whole day on the lobby screens"
          desc="The same displays can show the programme for everyone outside the room. The day grid lays out sessions by time and room, and the programme list runs through them in order with the speaker, room and length of each one. Both mark the session that is live."
          img={{ src: "/screenshots/cuedeck-display-day-grid.jpg", width: 1920, height: 1080,
            alt: "Day grid display for the lobby: Hall B and Main Stage columns with sessions from 09:00 to 16:30 and the live session highlighted" }}
          device="monitor"
          labels={[{ dot: DOT.info, title: "Day grid", sub: "Hall B and Main Stage, 09:00 to 16:30", pos: { left: -14, top: -16 } }]}
          second={{
            layout: "pair",
            device: "monitor",
            img: { src: "/screenshots/cuedeck-display-programme-list.jpg", width: 1920, height: 1080,
              alt: "Programme list display for the lobby: sessions in order with start time, speaker, room and duration, finished sessions dimmed and the live session highlighted" },
            labels: [{ dot: DOT.live, title: "Programme list", sub: "Live session highlighted", pos: { right: -10, top: -14 } }],
          }}
        />
        <Showcase
          eyebrow="Behind the screens"
          title="Controlled from the console"
          desc="The stage timer and every signage screen read the same schedule your crew is running. When the director goes live, holds or adds time, the screens follow within a second."
          img={{ src: "/screenshots/cuedeck-command-center-director-console.jpg", width: 1440, height: 900,
            alt: "CueDeck director console with the live session selected: its 14:00 countdown, Hold and End controls, and the event log below" }}
          device="laptop"
          labels={[
            { dot: DOT.live, title: "Selected session live", sub: "Hold and End controls", pos: { right: -20, bottom: "26%" } },
            { dot: DOT.delay, title: "Running +5 min", sub: "3 sessions affected", pos: { left: -18, bottom: "16%" } },
          ]}
        />
        <Section eyebrow="Questions" title="Stage timer questions" bg="#f9fafb">
          <Faq items={faqs} />
        </Section>
        <Section eyebrow="Related" title="Keep reading">
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))" }}>
            {related.map(r => (
              <a key={r.href} href={r.href} style={{ display: "block", padding: 24, borderRadius: 14, border: "1px solid #e5e7eb", background: "#fff", textDecoration: "none" }}>
                <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#2563eb", marginBottom: 6 }}>{r.label}</span>
                <span style={{ display: "block", fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{r.desc}</span>
              </a>
            ))}
          </div>
        </Section>
        <CtaStrip title="Put the clock where the speaker can see it" lead="Included in every CueDeck plan. 3-day free trial, no credit card." label="Start free trial" href={TRIAL_URL} />
      </main>
      <Footer cta={false} />
    </>
  );
}
