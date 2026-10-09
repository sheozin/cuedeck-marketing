import type { Metadata } from "next";
import { pageMeta } from "../../../lib/pageMeta";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { jsonLd } from "../../../lib/jsonLd";
import { Hero, Section, Steps, FeatureGrid, Showcase, Faq, CtaStrip, breadcrumbs, faqJsonLd, TRIAL_URL } from "../../../components/Solutions";

export const metadata: Metadata = pageMeta("/solutions/command-center", "Show Calling and Run of Show Software", "Show calling software for live events. Build the run of show, call cues and push delays to every operator in real time. Six roles, one browser console.", "/solutions/command-center/opengraph-image");

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

// How a show runs, stage by stage. Every statement here comes from the docs page.
const phases = [
  {
    title: "Prepare the run of show",
    body: "Create the event with its name, date and venue, then add each session with a title, speaker, room, start time and duration. For a long programme, import a CSV instead: CueDeck checks the columns, time formats and durations, and shows a preview of what will be created before anything is saved. Session notes hold the technical requirements or speaker preferences every operator can read.",
  },
  {
    title: "Bring in the crew",
    body: "Invite operators by email from the Operators panel and give each one a role. New operators wait for the director's approval before they can open the console, so nobody joins the show uninvited. You can change a role at any time.",
  },
  {
    title: "Call each session",
    body: "Every session moves through the same states: Planned, Ready, Calling, Live and Ended. Stage marks a session Ready when the speaker is standing by, calls the speaker, and goes live. Transitions are checked on the server, so if two people press Go Live at once, only one change goes through. Keyboard shortcuts cover Ready, Call, Go Live, Hold and End.",
  },
  {
    title: "Run it live",
    body: "A live session shows elapsed and remaining time with a progress bar that turns amber at 80% and red at 100%. When a session passes its planned end, it switches to Overrun on its own. Hold pauses a session for a technical problem and Resume sends it back to Live. The director's broadcast bar puts a message on top of every operator's screen, with presets for common calls such as doors opening or a break.",
  },
  {
    title: "Absorb delays",
    body: "When a session runs late, the director enters the delay in minutes and chooses whether to cascade it. Later sessions in the same room move by that amount, sessions in other rooms stay put, and anchored sessions never move. Reset to planned puts every session back on its original time. Only the director can apply a delay, and everyone else sees the new schedule straight away.",
  },
  {
    title: "Close the show",
    body: "The event log records every state change, broadcast, delay, operator connection and signage override, and exports as a CSV. With the AI Report Generator, one click produces an executive summary, planned against actual timing for every session, the incident log and recommendations for the next event.",
  },
];

const roles = [
  { title: "Director", desc: "Sees everything. Runs session transitions, broadcasts, signage, delays, AI agents, billing and the operator list." },
  { title: "Stage", desc: "Sessions for the assigned rooms with speaker info and timing. Sets ready, calls the speaker, goes live, holds and ends." },
  { title: "AV", desc: "Session titles, rooms, technical notes and timing. Marks AV ready and follows every transition." },
  { title: "Interpreter", desc: "Session titles, speaker names, languages and timing, to follow each session as it progresses." },
  { title: "Registration", desc: "The session schedule, room assignments and room capacity for the front desk." },
  { title: "Signage", desc: "The signage panel: configure displays, set modes, manage the sponsor carousel and push overrides." },
];

const faqs = [
  { q: "Can I import my run of show from a spreadsheet?", a: "Yes. Save it as a CSV with title, room, start time and duration columns, plus optional speaker and notes. CueDeck validates the file and shows a preview before it creates the sessions. Import adds new sessions; edit existing ones in the console." },
  { q: "What are the six operator roles?", a: "Director, Stage, AV, Interpreter, Registration and Signage. Each role has its own view with only the controls and information that crew position needs. Only the director manages billing, invites operators, configures AI agents and applies delays." },
  { q: "What happens when a session overruns?", a: "When a live session passes its planned end, its status changes to Overrun automatically and every operator sees it. The director can then apply a delay: later sessions in the same room shift by that amount, while anchored sessions stay fixed." },
  { q: "Does it work for events with several rooms?", a: "Yes. Every session belongs to a room, operators can filter the session list by room, and a delay in one room does not move sessions in other rooms unless they depend on it. The director sees every room at once." },
  { q: "What if an operator loses their connection?", a: "CueDeck reconnects on its own and re-syncs the clock. The top bar shows the database and realtime connection status, and broadcasts are stored, so an operator who comes back sees the latest message." },
  { q: "Which plans include the AI features?", a: "The AI agents (Incident Advisor, Cue Engine and Report Generator) are included on the free trial, Pro and Enterprise plans. They run on CueDeck's servers, so there is nothing to set up." },
];

const related = [
  { href: "/solutions/stage-timer", label: "Stage timer and confidence monitor", desc: "Put the live countdown in front of the speaker." },
  { href: "/solutions/check-in", label: "Event check-in with QR codes", desc: "Run the registration desk from a laptop or tablet." },
  { href: "/blog/run-of-show-template", label: "Free run of show template", desc: "The columns a professional run of show needs." },
  { href: "/blog/managing-delays-live-events", label: "How to manage delays at live events", desc: "Keep the whole team on the new schedule." },
];

export default function CommandCenterPage() {
  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs("Command Center", "/solutions/command-center")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(faqs)) }} />
      <main style={{ paddingTop: 64, background: "#fff" }}>
        <Hero
          eyebrow="CueDeck Command Center"
          title={<>Call the whole show from one screen</>}
          lead="Show calling software for conferences and live events: your run of show, live cues and every operator in one real-time console. When the schedule slips, everyone knows at the same moment."
          primary={{ label: "Start free trial", href: TRIAL_URL }}
          secondary={{ label: "See pricing", href: "/pricing" }}
          note={<>3-day free trial on every plan · No credit card required</>}
          img={{ src: "/screenshots/cuedeck-command-center-director-console.jpg", width: 1440, height: 900,
            alt: "CueDeck director console: Main Stage live with 14:00 left and Hall B calling its speaker, the session list, the selected session's Hold and End controls, and the event log" }}
        />
        <Section eyebrow="How it works" title="From spreadsheet to show day" bg="#f9fafb">
          <Steps items={steps} />
        </Section>
        <Section eyebrow="Show calling" title="How a show runs in CueDeck" lead="The run of show stops being a document and becomes the live system the whole crew works from.">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {phases.map(p => (
              <div key={p.title} style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section eyebrow="Built for live" title="Everything the crew needs, nothing it does not" bg="#f9fafb">
          <FeatureGrid items={features} />
        </Section>
        <Section eyebrow="Operator roles" title="Six roles, one console" lead="Each crew position gets its own view of the same run of show.">
          <FeatureGrid items={roles} />
        </Section>
        <Showcase
          flip
          eyebrow="On stage"
          title="Speakers see the same clock you do"
          desc="Send the live session to a stage timer with one click. It counts down from the console's clock, so the stage and the director never disagree."
          img={{ src: "/screenshots/cuedeck-stage-timer-full-screen-countdown.jpg", width: 1600, height: 900,
            alt: "Stage timer showing 14:00 remaining for the live session, with the next session underneath" }}
        />
        <Section eyebrow="Questions" title="Show calling questions" bg="#f9fafb">
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
        <CtaStrip title="Ready to run your next event?" lead="3-day free trial. No credit card. Cancel anytime." label="Start free trial" href={TRIAL_URL} />
      </main>
      <Footer cta={false} />
    </>
  );
}
