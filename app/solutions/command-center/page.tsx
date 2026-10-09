import type { Metadata } from "next";
import { pageMeta } from "../../../lib/pageMeta";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { jsonLd } from "../../../lib/jsonLd";
import { DOT } from "../../../components/DeviceFrames";
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
          device="laptop"
          labels={[
            { dot: DOT.live, title: "Main Stage live", sub: "14:00 left", pos: { left: -18, top: 22 } },
            { dot: DOT.calling, title: "Hall B calling its speaker", sub: "On stage in 4 min", pos: { right: -20, bottom: "16%" } },
          ]}
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
          eyebrow="Event teams"
          title="Invite people to one event, with one role"
          desc="Each event has its own team. Invite someone by email, pick their role and they get access to that event only. People you invite work under your plan, so they do not need one of their own."
          points={[
            "Change a role, suspend someone or remove them from this event or from all your events",
            "Seats follow your plan: up to 5 on Pay-per-event and Starter, up to 20 on Pro",
            "See when each person was last seen",
          ]}
          img={{ src: "/screenshots/cuedeck-console-team-window.jpg", width: 1440, height: 900,
            alt: "Team window for Northwind Summit 2026: 6 of 20 seats used, an invite row with email, name and role, and team members with their roles and when they were last seen" }}
          device="laptop"
          labels={[
            { dot: DOT.info, title: "Team 6 of 20 seats", sub: "Team for Northwind Summit 2026", pos: { left: -18, top: -14 } },
            { dot: DOT.ok, title: "Daniel Okoro, Stage", sub: "Last seen 3 minutes ago", pos: { right: -20, bottom: -10 } },
          ]}
        />
        <Showcase
          flip
          eyebrow="Event switcher"
          title="Every event you work on, grouped by organiser"
          desc="Your own events sit at the top of the switcher. Events other organisers have invited you to are listed under their name, so a freelancer crewing for several companies moves between shows in one click."
          img={{ src: "/screenshots/cuedeck-console-event-switcher.jpg", width: 1440, height: 900,
            alt: "Event switcher open in the console: Your events, then events grouped under Harbourlight Productions and Tidewater Group, with Edit event and New event below" }}
          device="laptop"
          labels={[
            { dot: DOT.info, title: "Your events", sub: "Northwind Summit 2026 and Partner Day 2027", pos: { right: -20, top: "18%" } },
            { dot: DOT.ok, title: "Grouped by organiser", sub: "Harbourlight Productions, Tidewater Group", pos: { left: -18, bottom: "20%" } },
          ]}
        />
        <Showcase
          eyebrow="On your phone"
          title="Run the show from a phone"
          desc="On a phone the console turns into cards, one for each room's current and next session. Hold, end, add or take away a minute, call the next speaker or mark them arrived without going back to the laptop."
          points={[
            "Filter to one room or follow all of them",
            "Now, Schedule, Log and Send along the bottom",
            "Message to speaker from the live session's card",
          ]}
          img={{ src: "/screenshots/cuedeck-console-phone-now.jpg", width: 390, height: 844,
            alt: "CueDeck console on a phone: Main Stage live with 14:00 left and Hold, End, minus and plus one minute and Message to speaker buttons, then the next session with Call speaker" }}
          device="phone"
          imgMaxWidth={270}
          labels={[
            { dot: DOT.live, title: "Main Stage live", sub: "14:00 left", pos: { left: -110, top: "14%" } },
            { dot: DOT.info, title: "Next at 11:05 (+5)", sub: "Call speaker", pos: { right: -130, top: "56%" } },
          ]}
        />
        <Showcase
          flip
          eyebrow="Delay cascade"
          title="Late in one room, on time everywhere else"
          desc="Push the following sessions by five, ten or fifteen minutes and the list shows the new times beside the old ones. The delay stops at the next anchored session, and everything below it runs on the original schedule."
          img={{ src: "/screenshots/cuedeck-closeup-delay-cascade.jpg", width: 2120, height: 758,
            alt: "Session list running 5 minutes late: three sessions show +5 with their original times, and a line marks where the delay stops" }}
          device="card"
          labels={[
            { dot: DOT.delay, title: "Running +5 min", sub: "3 affected, stops at #7", pos: { left: -14, top: -26 } },
            { dot: DOT.info, title: "Delay stops here", sub: "Below runs on the original schedule", pos: { right: -14, bottom: -26 } },
          ]}
        />
        <Showcase
          eyebrow="Message to speaker"
          title="Tell the speaker without walking on stage"
          desc="Pick a preset such as 5 minutes left or Please wrap up, or type a short message of up to 60 characters. It shows on that room's stage timer and stage monitor, and clears by itself when the session ends."
          img={{ src: "/screenshots/cuedeck-console-message-to-speaker.jpg", width: 1440, height: 900,
            alt: "Console inspector with message presets for the Main Stage speaker and the strip On the stage timer now: Take questions from 10:35" }}
          device="laptop"
          labels={[{ dot: DOT.info, title: "Message sent from the console", sub: "Take questions from 10:35", pos: { left: -18, top: 18 } }]}
          second={{
            layout: "pair",
            device: "monitor",
            img: { src: "/screenshots/cuedeck-stage-timer-live-countdown.jpg", width: 1920, height: 1080,
              alt: "Stage timer with 14:00 remaining and a yellow band below: Message from the director, Take questions from 10:35" },
            labels: [{ dot: DOT.calling, title: "Shown on the stage timer", sub: "Take questions from 10:35", pos: { right: -10, top: -14 } }],
          }}
        />
        <Showcase
          flip
          eyebrow="On stage"
          title="Speakers see the same clock you do"
          desc="Send the live session to a stage timer with one click. It counts down from the console's clock, so the stage and the director never disagree."
          img={{ src: "/screenshots/cuedeck-stage-timer-full-screen-countdown.jpg", width: 1600, height: 900,
            alt: "Stage timer showing 14:00 remaining for the live session, with the next session underneath" }}
          device="monitor"
          labels={[{ dot: DOT.ok, title: "Live on the stage screen", sub: "14:00 remaining", pos: { right: -10, top: -14 } }]}
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
