import type { Metadata } from "next";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { jsonLd } from "../../../lib/jsonLd";
import { Hero, Section, Steps, FeatureGrid, Showcase, CtaStrip, breadcrumbs, TRIAL_URL, BASE_URL } from "../../../components/Solutions";

export const metadata: Metadata = {
  title: "Live Event Command Center for Show Callers",
  description: "Run of show, live cues and operator roles in one real-time console. Delay cascade, broadcasts, AI incident advisor and post-event reports.",
  alternates: { canonical: `${BASE_URL}/solutions/command-center` },
  openGraph: {
    title: "Live Event Command Center | CueDeck",
    description: "Run of show, live cues and operator roles in one real-time console.",
    url: `${BASE_URL}/solutions/command-center`,
    type: "website",
  },
};

const steps = [
  { title: "Build the run of show", desc: "Add sessions, rooms and team members, or import them from a spreadsheet. Assign each person a role." },
  { title: "Call the show", desc: "Ready, Call Speaker, Go Live. Every status change reaches every operator's screen instantly, no refresh needed." },
  { title: "Stay in control", desc: "Apply a delay and it cascades through the day. Broadcast to the crew, drive the screens, and get help when something breaks." },
];

const features = [
  { title: "Six operator roles", desc: "Director, Stage, AV, Interp, Reg and Signage. Each role sees exactly what it needs, with role-adaptive filters and keyboard shortcuts." },
  { title: "Real-time sync", desc: "Session changes, broadcasts and clock updates reach every operator through live subscriptions. Zero polling." },
  { title: "Delay cascade", desc: "Apply a delay to one session and it moves everything after it. Every operator sees the new schedule at once." },
  { title: "AI Incident Advisor", desc: "When something breaks, get an instant diagnosis and numbered resolution steps. Included on Pro." },
  { title: "Post-event reports", desc: "An executive summary, session-by-session timing variance and the incident log, ready to share in one click." },
  { title: "Auto-reconnect", desc: "If a device drops, it reconnects and catches up on its own." },
];

export default function CommandCenterPage() {
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs("Command Center", "/solutions/command-center")) }} />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <Hero
          eyebrow="CueDeck Command Center"
          title={<>Call the whole show from one screen</>}
          lead="Your run of show, live cues and every operator in one real-time console. When the schedule slips, everyone knows at the same moment."
          primary={{ label: "Start free trial", href: TRIAL_URL }}
          secondary={{ label: "See pricing", href: "/pricing" }}
          note={<>3-day free trial on every plan · No credit card required</>}
          img={{ src: "/screenshots/console-director-view.jpg", width: 1440, height: 900,
            alt: "CueDeck director console with a live session, its time remaining, the next session ready and quick actions" }}
        />
        <Section eyebrow="How it works" title="From spreadsheet to show day" bg="#f9fafb">
          <Steps items={steps} />
        </Section>
        <Section eyebrow="Built for live" title="Everything the crew needs, nothing it does not">
          <FeatureGrid items={features} />
        </Section>
        <Showcase
          flip
          eyebrow="On stage"
          title="Speakers see the same clock you do"
          desc="Send the live session to a stage timer with one click. It counts down from the console's clock, so the stage and the director never disagree."
          img={{ src: "/screenshots/display-stage-timer.jpg", width: 1600, height: 900,
            alt: "Stage timer showing 13:50 remaining for the live session, with the next session underneath" }}
        />
        <CtaStrip title="Ready to run your next event?" lead="3-day free trial. No credit card. Cancel anytime." label="Start free trial" href={TRIAL_URL} />
      </main>
      <Footer />
    </>
  );
}
