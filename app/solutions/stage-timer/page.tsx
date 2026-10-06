import type { Metadata } from "next";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { jsonLd } from "../../../lib/jsonLd";
import { Hero, Section, FeatureGrid, Showcase, CtaStrip, breadcrumbs, TRIAL_URL, BASE_URL } from "../../../components/Solutions";

export const metadata: Metadata = {
  title: "Stage Timer and Event Signage Displays",
  description: "A full-screen speaker countdown and 11 signage display modes, driven from your run of show. Pair any screen with a code. Included in every CueDeck plan.",
  alternates: { canonical: `${BASE_URL}/solutions/stage-timer` },
  openGraph: {
    title: "Stage Timer and Displays | CueDeck",
    description: "Speaker countdown and signage screens, driven from your run of show.",
    url: `${BASE_URL}/solutions/stage-timer`,
    type: "website",
  },
};

const features = [
  { title: "Colour-coded countdown", desc: "Green, then amber, then red as time runs down, readable from the back of the stage." },
  { title: "Hold and overrun", desc: "HOLD freezes the clock. When a session runs over, the timer flashes so the speaker cannot miss it." },
  { title: "Next session underneath", desc: "The stage timer shows what comes next, so the speaker and the stage manager are ready for the handover." },
  { title: "11 display modes", desc: "Stage timer, schedule, agenda, timeline, programme, wayfinding, sponsors, break, Wi-Fi, recall and custom messages." },
  { title: "Pair with a code", desc: "Each screen shows a short code. Enter it in the console and the screen is yours. No network setup, no IP addresses." },
  { title: "Driven from the run of show", desc: "Screens follow the live schedule. Apply a delay in the console and every screen updates." },
];

export default function StageTimerPage() {
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs("Stage Timer & Displays", "/solutions/stage-timer")) }} />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <Hero
          eyebrow="Stage Timer & Displays"
          title={<>Every speaker knows exactly where they stand</>}
          lead="A full-screen countdown for the stage and signage for every other screen in the venue, all driven by the same live run of show."
          primary={{ label: "Start free trial", href: TRIAL_URL }}
          secondary={{ label: "See pricing", href: "/pricing" }}
          note={<>Included in every CueDeck plan</>}
          img={{ src: "/screenshots/display-stage-timer.jpg", width: 1600, height: 900,
            alt: "Full-screen stage timer: 13:50 remaining in green, the session title, speaker and next session" }}
        />
        <Section eyebrow="On every screen" title="One schedule, every display" bg="#f9fafb">
          <FeatureGrid items={features} />
        </Section>
        <Showcase
          eyebrow="Behind the screens"
          title="Controlled from the console"
          desc="The stage timer and every signage screen read the same schedule your crew is running. When the director goes live, holds or adds time, the screens follow within a second."
          img={{ src: "/screenshots/console-director-view.jpg", width: 1440, height: 900,
            alt: "CueDeck director console with Stage Monitor and Stage Timer buttons beside the live session" }}
        />
        <CtaStrip title="Put the clock where the speaker can see it" lead="Included in every CueDeck plan. 3-day free trial, no credit card." label="Start free trial" href={TRIAL_URL} />
      </main>
      <Footer />
    </>
  );
}
