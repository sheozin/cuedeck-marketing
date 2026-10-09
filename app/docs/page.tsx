import type { Metadata } from 'next';
import { pageMeta } from "../../lib/pageMeta";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import DocsClient, { type DocSection } from '../../components/DocsClient';
import DocShot from '../../components/DocShot';

const APP_URL = 'https://app.cuedeck.io';
const TRIAL_URL = `${APP_URL}/#signup`;

// ─── SEO ────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = pageMeta("/docs", "Docs and User Guide", "Complete guide to CueDeck: session management, roles, digital signage, AI agents, delay cascade, and more. Everything you need to run live events like a pro.");

// ─── Reusable inline‑styled atoms ───────────────────────────────────────────────

/** Paragraph */
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: 16, fontSize: 15, color: '#4b5563', lineHeight: 1.75 }}>{children}</p>;
}

/** Strong label */
function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: '#111827', fontWeight: 600 }}>{children}</strong>;
}

/** Callout box (tip / important / note) */
function Callout({ type = 'tip', children }: { type?: 'tip' | 'important' | 'note'; children: React.ReactNode }) {
  const colors: Record<string, { bg: string; border: string; label: string; labelColor: string }> = {
    tip:       { bg: 'rgba(34,197,94,0.05)',  border: '#22c55e', label: 'Tip',       labelColor: '#16a34a' },
    important: { bg: 'rgba(249,115,22,0.05)', border: '#f97316', label: 'Important', labelColor: '#ea580c' },
    note:      { bg: 'rgba(59,130,246,0.05)', border: '#3b82f6', label: 'Note',      labelColor: '#2563eb' },
  };
  const c = colors[type];
  return (
    <div style={{
      background: c.bg, borderLeft: `3px solid ${c.border}`,
      borderRadius: 8, padding: '14px 18px', marginBottom: 18,
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: c.labelColor, marginBottom: 6 }}>
        {c.label}
      </p>
      <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

/** Unordered list */
function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ paddingLeft: 20, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65 }}>{item}</li>
      ))}
    </ul>
  );
}

/** Ordered list */
function OL({ items }: { items: React.ReactNode[] }) {
  return (
    <ol style={{ paddingLeft: 20, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.65 }}>{item}</li>
      ))}
    </ol>
  );
}

/** Styled status badge pill (mimics console) */
function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '2px 10px',
      borderRadius: 99, background: `${color}18`, color, border: `1px solid ${color}44`,
      letterSpacing: '0.04em', lineHeight: '18px',
    }}>
      {label}
    </span>
  );
}

/** Simple table */
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 18, borderRadius: 10, border: '1px solid #e5e7eb', maxWidth: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 480 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                textAlign: 'left', padding: '10px 14px', fontWeight: 600,
                color: '#111827', background: '#f9fafb', borderBottom: '1px solid #e5e7eb',
                whiteSpace: 'nowrap',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} style={{ background: r % 2 === 1 ? '#fafafa' : '#fff' }}>
              {row.map((cell, c) => (
                <td key={c} style={{ padding: '9px 14px', color: '#4b5563', borderBottom: '1px solid #f3f4f6' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Sub-heading inside a section */
function H3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 10, marginTop: 24 }}>{children}</h3>;
}

/** Line icons for sections without an emoji (marketing copy uses SVG icons) */
function CheckinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v7h-7" />
    </svg>
  );
}
function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <path d="M2 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM13 5v2M13 17v2M13 11v2" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <path d="M3 5h18v14H3zM3 7l9 6 9-6" />
    </svg>
  );
}
function GuideIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

// ─── Section content definitions ────────────────────────────────────────────────

const SECTIONS: DocSection[] = [

  // ── 1. Quick Start ──────────────────────────────────────────────────────────
  {
    id: 'quick-start',
    title: 'Quick Start',
    icon: '🚀',
    content: (
      <>
        <P>Get your first event running in five steps:</P>
        <OL items={[
          <><B>Sign up</B>: Go to <a href={TRIAL_URL} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>app.cuedeck.io</a> and create an account. Crew you invite do not sign up: they open the link in their invitation email.</>,
          <><B>Create an event</B>: Open the event switcher in the header and choose <B>New event</B>. Give it a name, date, and venue.</>,
          <><B>Add sessions</B>: Click <B>Add session</B> to create your programme. Set title, speaker, room, start time, and duration for each session.</>,
          <><B>Invite your team</B>: Open your profile menu, choose <B>Team</B> and invite stage managers, AV techs, and other crew to this event by email. Assign each person a role.</>,
          <><B>Go live!</B>: On event day, open the console. Move sessions through the state machine: <Badge label="PLANNED" color="#3b82f6" /> → <Badge label="READY" color="#22c55e" /> → <Badge label="CALLING" color="#f97316" /> → <Badge label="LIVE" color="#ff3b30" /> → <Badge label="ENDED" color="#6b7280" /></>,
        ]} />
        <Callout type="tip">Every status change propagates to all connected operators in real time. No need to refresh.</Callout>
      </>
    ),
  },

  // ── 2. Getting Started ──────────────────────────────────────────────────────
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '👋',
    content: (
      <>
        <H3>Creating an Account</H3>
        <P>Navigate to <a href={APP_URL} style={{ color: '#3b82f6', textDecoration: 'none' }}>app.cuedeck.io</a> and click <B>Create account</B>. You will need:</P>
        <UL items={[
          'Your full name and organization',
          'A work email address',
          'A password (minimum 10 characters)',
        ]} />

        <H3>Signing In</H3>
        <P>Enter your email and password on the login screen. CueDeck uses Supabase Auth with secure session tokens. Your session persists across browser tabs.</P>

        <H3>The Welcome Modal</H3>
        <P>First-time users see a welcome modal that explains the console layout, role assignments, and key shortcuts. The Help menu in the header has a quick reference, keyboard shortcuts and what&apos;s new.</P>

        <H3>Choosing a Role</H3>
        <P>Your director assigns you a role on each event when inviting you. Each role shows a different view of the console optimised for that crew position. See the <a href="#roles" style={{ color: '#3b82f6', textDecoration: 'none' }}>Roles</a> section for details.</P>

        <Callout type="note">If you are the director (account owner), you automatically have full access to all features and settings.</Callout>
      </>
    ),
  },

  // ── 3. UI Overview ──────────────────────────────────────────────────────────
  {
    id: 'ui-overview',
    title: 'UI Overview',
    icon: '🖥️',
    content: (
      <>
        <P>The CueDeck console is divided into six main regions:</P>
        <DocShot
          src="/screenshots/cuedeck-closeup-layout-overview.jpg"
          width={2880}
          height={1800}
          alt="The whole CueDeck console for Northwind Summit 2026 at 10:31: header with event switcher, clock, All systems, Crew 3/5, Displays 3 and View as director; the Now and next band for Main Stage and Hall B; the filter bar with a Running +5 min delay chip; the session list from #3 LIVE to #9; the inspector for session #3; the event log; and the broadcast bar along the bottom"
          caption="The console during a live event. The numbers match the list below."
          markers={[
            { n: 1, x: 29, y: 2.9 },
            { n: 2, x: 40, y: 10 },
            { n: 3, x: 30, y: 77 },
            { n: 4, x: 88, y: 8.6 },
            { n: 5, x: 87.5, y: 70.2 },
            { n: 6, x: 50, y: 95.6 },
          ]}
        />

        <H3>1. Header</H3>
        <P>Contains the CueDeck logo, the event switcher (current event name and date, your other events, Edit event and New event), the synced clock, the All systems status pill, Crew (who is online), Displays (directors only, with the number of displays online), View as (directors only, to see the console as another role), Help and your profile menu. The clock is NTP-synced and shows the corrected time across all connected devices. Accuracy is maintained via RTT-based offset calculation.</P>

        <H3>2. Now and next band</H3>
        <P>One lane per room. Each lane shows the session that is live or being called, its countdown, the main action (Hold, End, On stage) and the next session in that room with its next step.</P>

        <H3>3. Session list</H3>
        <P>Every session as a row with status, number, title, speaker, room, time and the action for its current state. Rows are colour-coded by status and completed sessions fold into one line at the top. The filter bar above holds search, status and room filters, the List and Timeline toggle, and the delay chip when the programme is running late.</P>

        <H3>4. Inspector</H3>
        <P>Details and controls for the selected session: countdown, speaker arrival, notes, Control (Hold, End), Timing, Screens and a message to the speaker.</P>

        <H3>5. Event log</H3>
        <P>Every status change, delay, broadcast and error with its time. Filter by All, Status, Broadcast or Errors, or export the log as CSV.</P>

        <H3>6. Broadcast bar</H3>
        <P>A persistent bar along the bottom of the console for sending messages to all operators. Includes presets, a character counter and a level (info, warn or critical).</P>

        <Callout type="tip">The interface is fully responsive. On a phone the console shows one column with Now, Schedule, Log and Send tabs at the bottom. The clock remains always visible.</Callout>
      </>
    ),
  },

  // ── 4. Roles ────────────────────────────────────────────────────────────────
  {
    id: 'roles',
    title: 'Roles',
    icon: '👥',
    content: (
      <>
        <P>CueDeck supports six distinct operator roles. Each role has a tailored view showing only the controls and information relevant to that crew position.</P>

        <Table
          headers={['Role', 'What They See', 'What They Can Do']}
          rows={[
            ['Director', 'Everything: the full console, Displays, Team and View as', 'All session transitions, broadcast, signage, delay cascade, AI agents, billing, operator management'],
            ['Stage', 'Sessions for assigned rooms, speaker info, timing', 'Call speaker, set ready, go live, end session, hold stage'],
            ['AV', 'Session titles, rooms, technical notes, timing', 'Mark AV ready, view technical notes, monitor transitions'],
            ['Interpreter', 'Session titles, speaker names, languages, timing', 'View language assignments, monitor session progress'],
            ['Registration', 'Session list, room assignments, attendee-relevant info', 'View session schedule, check room capacity'],
            ['Signage', 'The Displays view with display management', 'Configure displays, set modes, manage sponsor carousel, push overrides'],
          ]}
        />

        <Callout type="important">Only directors can manage billing, invite operators, use AI agents, or reset delays. Directors and stage managers can push delays. All other roles are read-heavy with limited write actions.</Callout>
      </>
    ),
  },

  // ── 5. Session States ───────────────────────────────────────────────────────
  {
    id: 'session-states',
    title: 'Session States',
    icon: '🔄',
    content: (
      <>
        <P>Every session in CueDeck follows an 8-state machine. Transitions are enforced server-side via Supabase Edge Functions to ensure consistency across all connected devices.</P>

        <H3>The 8 States</H3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          <Badge label="PLANNED" color="#3b82f6" />
          <Badge label="READY" color="#22c55e" />
          <Badge label="CALLING" color="#f97316" />
          <Badge label="LIVE" color="#ff3b30" />
          <Badge label="OVERRUN" color="#ff00a8" />
          <Badge label="HOLD" color="#f97316" />
          <Badge label="ENDED" color="#6b7280" />
          <Badge label="CANCELLED" color="#4b5563" />
        </div>

        <H3>Transition Flow</H3>
        <P>The typical happy path for a session is:</P>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8,
          padding: '16px 20px', background: '#f9fafb', borderRadius: 10,
          border: '1px solid #e5e7eb', marginBottom: 18, fontSize: 13, color: '#374151',
        }}>
          <Badge label="PLANNED" color="#3b82f6" />
          <span>→</span>
          <Badge label="READY" color="#22c55e" />
          <span>→</span>
          <Badge label="CALLING" color="#f97316" />
          <span>→</span>
          <Badge label="LIVE" color="#ff3b30" />
          <span>→</span>
          <Badge label="ENDED" color="#6b7280" />
        </div>

        <H3>Special Transitions</H3>
        <UL items={[
          <><Badge label="LIVE" color="#ff3b30" /> → <Badge label="OVERRUN" color="#ff00a8" /> — Triggered automatically when the session exceeds its planned end time.</>,
          <><Badge label="LIVE" color="#ff3b30" /> → <Badge label="HOLD" color="#f97316" /> — Pause a session (e.g. technical issues). Resume sends it back to LIVE.</>,
          <><span>Any state</span> → <Badge label="CANCELLED" color="#4b5563" /> — Cancel a session. Can be reinstated back to PLANNED.</>,
          <><Badge label="CANCELLED" color="#4b5563" /> → <Badge label="PLANNED" color="#3b82f6" /> — Reinstate a cancelled session.</>,
        ]} />

        <Callout type="note">Transitions are idempotent. If two operators click &quot;Go Live&quot; simultaneously, the server processes the first and ignores the duplicate.</Callout>
      </>
    ),
  },

  // ── 6. Session Controls ─────────────────────────────────────────────────────
  {
    id: 'session-controls',
    title: 'Session Controls',
    icon: '🎛️',
    content: (
      <>
        <P>Each session row displays the action button appropriate to its current state. The available controls change dynamically as the session progresses.</P>
        <DocShot
          src="/screenshots/cuedeck-closeup-session-row.jpg"
          width={2112}
          height={388}
          alt="Three session rows: #3 LIVE The future of hybrid events with Tomas Okafor arrived, Main Stage, 14:00 left and End; #4 CALLING Breakout: captions and accessible stages with Jun Watanabe not arrived, Hall B, 10:35 to 11:20, was 10:30, +5 and On stage; #5 READY Panel: building crews that scale, Main Stage, 11:00 to 11:45 and Call speaker"
          caption="Session rows in the LIVE, CALLING and READY states, each with its next action."
        />

        <H3>Row Anatomy</H3>
        <UL items={[
          <><B>Status badge</B>: colour-coded pill showing current state</>,
          <><B>Session number</B>: sequential order in the programme</>,
          <><B>Title &amp; speaker</B>: session name, presenter and company, with whether the speaker has arrived</>,
          <><B>Room</B>: physical location or room name</>,
          <><B>Scheduled time</B>: start and end time, with the original time and the delay when the session has moved</>,
          <><B>Time left</B>: shown on the row while the session is LIVE</>,
          <><B>Action button</B>: the next step for the state (Set ready, Call speaker, On stage, End)</>,
        ]} />

        <H3>Timing Display</H3>
        <P>When a session is <Badge label="LIVE" color="#ff3b30" />, select it to see its timing in the inspector:</P>
        <UL items={[
          'Remaining time as a large countdown',
          'Elapsed time since going live',
          'A progress bar that fills from left to right',
        ]} />
        <DocShot
          src="/screenshots/cuedeck-closeup-inspector.jpg"
          width={718}
          height={1008}
          maxWidth={360}
          alt="Inspector for session #3 The future of hybrid events, LIVE on Main Stage: 14:00 left, 31:00 elapsed with a progress bar, Tomas Okafor arrived, a note about audience Q&A from 10:35, Control with Hold and End, and Timing with minus 1 and plus 1 minute for this session and push following by 5, 10 or 15"
          caption="The inspector for the selected session."
        />

        <H3>Notes</H3>
        <P>Each session has a notes field visible to all operators. Directors can edit notes; other roles can read them. Use notes for technical requirements, speaker preferences, or last-minute changes.</P>
      </>
    ),
  },

  // ── 7. Broadcast ────────────────────────────────────────────────────────────
  {
    id: 'broadcast',
    title: 'Broadcast System',
    icon: '📢',
    content: (
      <>
        <P>The broadcast system lets directors send real-time messages to all connected operators. Messages are typed in the broadcast bar at the bottom of the console and appear as a banner on every operator&apos;s screen.</P>
        <DocShot
          src="/screenshots/cuedeck-closeup-broadcast-bar.jpg"
          width={2880}
          height={104}
          alt="Broadcast bar with the Presets menu, the message Doors to Hall B open in 5 minutes, a 33/200 counter, the level set to info, and Send and Clear buttons"
          caption="The broadcast bar along the bottom of the console."
        />

        <H3>Sending a Broadcast</H3>
        <OL items={[
          'Click the message field in the broadcast bar at the bottom of the console (or press B for the keyboard shortcut)',
          'Type your message (max 200 characters; a counter shows how many you have used)',
          'Choose the level: info, warn or critical',
          'Press Enter or click Send',
        ]} />

        <H3>Quick Presets</H3>
        <P>The Presets menu in the broadcast bar fills in a common message:</P>
        <UL items={[
          '"Coffee break starting now"',
          '"Please take your seats, the next session is starting soon"',
          '"Running a few minutes behind schedule"',
          '"Please silence your phones"',
          '"Hold, please stand by"',
        ]} />

        <H3>Dismissing</H3>
        <P>Operators can dismiss a broadcast locally by clicking Dismiss. The message remains visible to other operators who haven&apos;t dismissed it. Sending a new broadcast replaces the previous one for everyone.</P>

        <Callout type="tip">Broadcasts are stored in the database and survive page refreshes. If an operator reconnects, they see the latest active broadcast.</Callout>
      </>
    ),
  },

  // ── 8. Delay Cascade ────────────────────────────────────────────────────────
  {
    id: 'delay-cascade',
    title: 'Delay Cascade',
    icon: '⏱️',
    content: (
      <>
        <P>When a session runs late, the delay cascade automatically adjusts all downstream sessions to maintain the correct schedule gap.</P>
        <DocShot
          src="/screenshots/cuedeck-closeup-delay-cascade.jpg"
          width={2120}
          height={758}
          alt="Filter bar with the amber delay chip Running +5 min, 2 affected, stops at #7 and a Reset delays button, above the session list where #4 and #6 show their new times, was 10:30 and was 11:30, and +5, followed by the line Delay stops here: below runs on the original schedule"
          caption="A +5 minute delay: the shifted sessions show their original time, and the list marks where the delay stops."
        />

        <H3>Applying a Delay</H3>
        <OL items={[
          'Select the session that is running late',
          'In the inspector under Timing, click +5, +10 or +15 next to Push following',
          'All affected sessions update instantly for every operator, and the filter bar shows the delay chip with how many sessions moved',
        ]} />

        <H3>Cascade Logic</H3>
        <UL items={[
          <><B>Following sessions</B>: the session and every later session in the programme shift by the delay amount, in every room. Ended and cancelled sessions are skipped</>,
          <><B>Rooms</B>: the cascade follows programme order, not rooms. To keep another room on time, place an anchor before its sessions</>,
          <><B>Anchor sessions</B>: sessions marked as &quot;anchored&quot; will not move, creating a hard boundary. The list shows &quot;Delay stops here&quot; above them</>,
        ]} />

        <H3>Resetting Delays</H3>
        <P>Directors can reset all delays back to the original schedule using the &quot;Reset delays&quot; button in the filter bar. This reverts every session to its originally scheduled time.</P>

        <Callout type="important">Directors and stage managers can push delays, and only directors can reset them. Other roles see the updated schedule but cannot modify it.</Callout>
        <P>See how the delay cascade fits into a live show on the <a href="/solutions/command-center" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>show calling and run of show page</a>.</P>
      </>
    ),
  },

  // ── 9. Quick Filters ────────────────────────────────────────────────────────
  {
    id: 'quick-filters',
    title: 'Quick Filters',
    icon: '🔍',
    content: (
      <>
        <P>The filter bar sits above the session list and lets you quickly narrow down what you see.</P>

        <H3>Search</H3>
        <P>Type in the <B>Search title or speaker</B> box to filter sessions by title or speaker name. Results update as you type.</P>

        <H3>Status Filter</H3>
        <P>Pick a state from the <B>All statuses</B> dropdown to show only sessions in that state, or choose Active to hide ended and cancelled sessions.</P>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          <Badge label="PLANNED" color="#3b82f6" />
          <Badge label="READY" color="#22c55e" />
          <Badge label="LIVE" color="#ff3b30" />
          <Badge label="ENDED" color="#6b7280" />
          <Badge label="HOLD" color="#f97316" />
        </div>

        <H3>Room Filter</H3>
        <P>Select a room from the <B>All rooms</B> dropdown to show only sessions in that location. Useful when your event spans multiple rooms or halls.</P>

        <Callout type="tip">Filters are additive — you can combine search, status, and room filters simultaneously. Press Escape to clear all filters.</Callout>
      </>
    ),
  },

  // ── 10. Digital Signage ─────────────────────────────────────────────────────
  {
    id: 'signage',
    title: 'Digital Signage',
    icon: '📺',
    content: (
      <>
        <P>CueDeck includes a built-in digital signage system. Drive lobby screens, wayfinding displays, and sponsor carousels directly from the console — no extra software needed.</P>

        <H3>Connecting a Display</H3>
        <OL items={[
          'On the TV or screen, open app.cuedeck.io/d in any browser',
          'A 6-character pairing code appears on screen (e.g. A7K-3M2)',
          'In the console, click Displays in the header and type the pairing code',
          'Click Pair — the display connects instantly via realtime',
        ]} />
        <Callout type="tip">Tap &ldquo;Install&rdquo; or &ldquo;Add to Home Screen&rdquo; in the browser to install the display as a fullscreen app. It survives reboots and auto-reconnects — no reconfiguration needed.</Callout>

        <H3>Display Modes</H3>
        <Table
          headers={['Mode', 'Description']}
          rows={[
            ['Agenda', 'Shows the current and upcoming sessions in a scrolling list'],
            ['Now & Next', 'Large format showing the current live session and what is coming next'],
            ['Timeline', 'Chronological session list with time markers — ideal for lobby overviews'],
            ['Programme', 'Time × room grid showing the full event programme at a glance'],
            ['Stage Timer', 'Speaker-facing fullscreen countdown with colour-coded urgency (green → amber → red → overrun)'],
            ['Sponsors', 'Auto-rotating carousel of sponsor logos and media'],
            ['Schedule Grid', 'Full programme grid with room columns and time rows'],
            ['WiFi Info', 'Network name and password in large format'],
            ['Break Screen', 'Countdown timer for coffee/lunch breaks'],
            ['Custom Message', 'Free-text message in large display format'],
            ['Blank', 'Black screen (power-save / pre-event)'],
          ]}
        />

        <H3>Sequences</H3>
        <P>Each display can run a sequence — an ordered list of modes that rotate automatically. For example: Sponsors (30s) → Agenda (20s) → WiFi (10s) → repeat.</P>

        <H3>Global Overrides</H3>
        <P>Directors can push a global override to ALL displays at once. Common overrides include Break Screen, 5-Min Recall, and Emergency Message. Overrides take priority until manually cleared.</P>

        <Callout type="note">Displays auto-reconnect if the network drops or the device reboots. The short URL <B>app.cuedeck.io/d</B> works on any device with a browser. The Displays button in the header shows how many displays are online.</Callout>
        <P>For an overview of every screen CueDeck can drive, see <a href="/solutions/stage-timer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>event signage displays and the stage timer</a>.</P>
      </>
    ),
  },

  // ── 11. Stage Monitor ───────────────────────────────────────────────────────
  {
    id: 'confidence-monitor',
    title: 'Stage Monitor',
    icon: '🎭',
    content: (
      <>
        <P>The Stage Monitor (confidence monitor) provides a fullscreen overlay for speakers and stage crew showing essential session information.</P>
        <DocShot
          src="/screenshots/cuedeck-display-stage-monitor.jpg"
          width={3840}
          height={2160}
          alt="Stage screen for Main Stage at Northwind Summit 2026: LIVE, a large green 14:00 remaining countdown with a progress bar, the session The future of hybrid events by Tomas Okafor, the next session Panel: building crews that scale, and a yellow band reading Message from the director: Take questions from 10:35"
          caption="The stage timer display for Main Stage, with a message to the speaker along the bottom."
        />

        <H3>What It Shows</H3>
        <UL items={[
          'Current session title and speaker name (large, readable from a distance)',
          'Elapsed and remaining time with large countdown numbers',
          'Status badge (LIVE, OVERRUN, HOLD)',
          'Next session preview so the speaker knows what follows',
          'Messages to the speaker, sent from the inspector',
        ]} />

        <H3>How to Use</H3>
        <OL items={[
          'Select a session and click "Stage monitor" under Screens in the inspector',
          'The display opens in fullscreen mode',
          'Place the browser on a monitor facing the stage',
          'Press Escape to exit fullscreen',
        ]} />

        <Callout type="tip">The stage monitor uses a high-contrast dark theme with large typography. It is designed to be readable from 10+ meters away.</Callout>
        <P>See the <a href="/solutions/stage-timer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>stage timer and confidence monitor</a> overview for how both screens work together.</P>
      </>
    ),
  },

  // ── 12. Stage Timer ───────────────────────────────────────────────────────────
  {
    id: 'stage-timer',
    title: 'Stage Timer',
    icon: '⏱️',
    content: (
      <>
        <P>The Stage Timer is a dedicated fullscreen countdown designed for speakers. Place it on any screen facing the stage and speakers always know exactly how much time they have left — no hand signals required.</P>

        <H3>How It Works</H3>
        <OL items={[
          'Register a display and set its mode to "Stage Timer"',
          'Open the display on a screen or monitor facing the stage',
          'The timer automatically syncs with the current LIVE session and counts down',
        ]} />

        <H3>Colour-coded Urgency</H3>
        <P>The countdown shifts colour as time runs low, giving speakers an unmistakable visual cue:</P>
        <UL items={[
          'Green — plenty of time remaining',
          'Amber — approaching the end of the session',
          'Red — final minutes, time to wrap up',
          'Flashing red + overage counter — the session has overrun (e.g. +2:15)',
        ]} />

        <H3>Special States</H3>
        <UL items={[
          'HOLD — the countdown freezes and shows HOLD in purple, used during breaks or pauses',
          'Standby — when no session is live, the timer shows a standby screen with the next scheduled session',
          'Progress bar — a visual bar at the bottom shows how far through the session the speaker is',
        ]} />

        <Callout type="tip">The Stage Timer uses high-contrast colours and massive typography. It is readable from the back of a large stage — even in bright lighting conditions.</Callout>
        <P>Read more about the <a href="/solutions/stage-timer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>stage timer for speakers</a> and the screens it runs on.</P>
      </>
    ),
  },

  // ── 13. AI Agents ───────────────────────────────────────────────────────────
  {
    id: 'ai-agents',
    title: 'AI Agents',
    icon: '🤖',
    content: (
      <>
        <P>CueDeck includes three AI-powered agent modules that assist directors during and after events. Agents are powered by Anthropic&apos;s Claude and are available on Trial, Pro, and Enterprise plans. No setup or configuration required: AI works automatically when you&apos;re logged in. Directors find the AI tools under Tools in the profile menu.</P>

        <H3>1. Incident Advisor</H3>
        <P>When a technical warning fires (audio loss, video signal drop, mic failure), the Incident Advisor opens automatically. It analyses the current state of your event and provides:</P>
        <UL items={[
          'AI-generated technical diagnosis of what is likely happening and why',
          'Numbered resolution steps ranked by urgency — click each to check off',
          'Estimated resolution time so you know how much buffer you have',
          'Escalate or mark resolved in one click, with the outcome logged to the event log',
        ]} />
        <Callout type="tip">The Incident Advisor fires automatically when system warnings are detected.</Callout>

        <H3>2. Cue Engine</H3>
        <P>The Cue Engine monitors your session schedule and fires automatic pre-cue alerts 8 minutes before each session is due to start. It helps your team prepare by:</P>
        <UL items={[
          'Showing a countdown modal with the upcoming session details (speaker, room, type)',
          'Generating a role-appropriate pre-cue checklist for AV, stage, and interpretation',
          'Highlighting any special technical requirements or notes on the session',
          'Auto-dismissing when the session transitions to READY or LIVE',
        ]} />

        <H3>3. Report Generator</H3>
        <P>After your event ends, open your profile menu and click &ldquo;Generate report&rdquo; under Tools. Claude analyses everything that happened (session timing, delays and any incidents) and produces a comprehensive four-tab report:</P>
        <UL items={[
          'Executive Summary — AI-written narrative overview of how the event ran',
          'Session Variance — Planned vs. actual timing for every session with variance flags',
          'Incidents Log — All issues flagged and how they were resolved',
          'Recommendations — Specific, actionable suggestions for your next event',
        ]} />
        <Callout type="note">AI agents run entirely server-side. Your Anthropic API credentials are never stored in the browser or exposed to your operators — AI just works as part of your CueDeck plan.</Callout>
      </>
    ),
  },

  // ── 13. Operator Management ─────────────────────────────────────────────────
  {
    id: 'operators',
    title: 'Operator Management',
    icon: '👤',
    content: (
      <>
        <P>Each event has its own team. Directors manage it from the Team window: open your profile menu and choose <B>Team</B>. The window shows everyone on the event with their role, status and when they were last seen. The Crew pill in the header shows who is online right now.</P>

        <H3>Inviting Operators</H3>
        <OL items={[
          'Open your profile menu and choose Team',
          'Under "Invite to this event", enter their email address and, optionally, their name',
          'Select a role (Stage, AV, Interp, Reg, Signage, or Director)',
          'Click "Send invite"',
          'A new person receives an invitation email that names the event and the role. Someone who already has an account is added straight away and gets a short email with a link to the console',
        ]} />

        <H3>Role Assignment</H3>
        <P>Each person has one role per event, which determines their view and permissions. You can change it at any time from the role dropdown next to their name in the Team window. The same person can hold a different role on another event.</P>

        <H3>Suspending and Removing Operators</H3>
        <P>In the Team window, <B>Suspend</B> blocks someone on this event until you click <B>Reactivate</B>. <B>Remove from this event</B> takes them off this event only, and <B>Remove from all my events</B> takes them off every event you organise. Both ask you to press again to confirm.</P>

        <Callout type="important">Seats count per event and follow the organiser&apos;s plan. Pay-per-event and Starter allow up to 5 people on an event&apos;s team, Pro up to 20. The Team window shows how many seats are used. An organiser can send up to 20 invitations a day.</Callout>
      </>
    ),
  },

  // ── 14. Billing & Plans ─────────────────────────────────────────────────────
  {
    id: 'billing',
    title: 'Billing & Plans',
    icon: '💳',
    content: (
      <>
        <P>CueDeck offers flexible pricing to match your production needs. All plans include a 3-day free trial with no credit card required.</P>

        <H3>Plans</H3>
        <Table
          headers={['Plan', 'Price', 'Events', 'Operators', 'Key Features']}
          rows={[
            ['Pay-per-event', '€39 / event', '1 event', 'Up to 5', 'All 6 roles, real-time sync, basic signage (2 displays)'],
            ['Starter', '€59 / month', '1 active', 'Up to 5', 'All roles, 5 signage displays, post-event reports'],
            ['Pro', '€99 / month', 'Unlimited', 'Up to 20', 'All features, unlimited signage, AI agents, delay cascade, priority support'],
            ['Enterprise', 'Custom', 'Unlimited', 'Unlimited', 'Custom integrations, SLA, dedicated support'],
          ]}
        />

        <H3>Free Trial</H3>
        <P>New directors automatically start on a 3-day free trial of the Pro plan. When the trial expires, you can choose any plan to continue. Your data is preserved regardless of which plan you choose.</P>

        <H3>Upgrading</H3>
        <P>Open your profile menu, choose Billing and click &quot;Upgrade&quot;. You will be redirected to a secure Stripe Checkout page. Payments are processed by Stripe, and CueDeck never stores your card details.</P>

        <H3>Annual Billing</H3>
        <P>Save 20% by choosing annual billing on Starter and Pro plans. Switch between monthly and annual from the Stripe customer portal.</P>

        <Callout type="note">Operators inherit their director&apos;s plan. Only directors manage billing — operators never see billing screens.</Callout>
      </>
    ),
  },

  // ── 15. Keyboard Shortcuts ──────────────────────────────────────────────────
  {
    id: 'keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    icon: '⌨️',
    content: (
      <>
        <P>CueDeck supports keyboard shortcuts for fast operation during live events. ?, Esc and ⌘K work in every role; /, B and R are for directors. Press ? or choose Shortcuts in the profile menu to see the list.</P>
        <DocShot
          src="/screenshots/cuedeck-closeup-keyboard-shortcuts.jpg"
          width={1184}
          height={766}
          maxWidth={592}
          alt="Keyboard Shortcuts dialog. Navigation: Focus search bar /, Focus broadcast input B, Refresh sessions R, Navigate session cards up and down arrows. Help: Keyboard shortcuts ?, Command palette ⌘K. General: Close modal / clear filters Esc"
          caption="The Keyboard Shortcuts dialog."
        />

        <Table
          headers={['Shortcut', 'Action']}
          rows={[
            ['/', 'Focus search bar'],
            ['B', 'Focus broadcast input'],
            ['R', 'Refresh sessions'],
            ['↑ ↓', 'Navigate session cards'],
            ['?', 'Show keyboard shortcuts'],
            ['⌘K / Ctrl+K', 'Open the command palette'],
            ['Esc', 'Close modal / clear filters'],
          ]}
        />

        <Callout type="tip">Shortcuts are disabled when a text input is focused. Press Escape first to unfocus, then use shortcuts.</Callout>
      </>
    ),
  },

  // ── 16. Clock Sync ──────────────────────────────────────────────────────────
  {
    id: 'clock-sync',
    title: 'Clock Sync',
    icon: '🕐',
    content: (
      <>
        <P>Accurate timing is critical in live events. CueDeck uses a round-trip-time (RTT) synchronisation algorithm to ensure all connected devices show the same clock — regardless of network latency or device clock drift.</P>

        <H3>How It Works</H3>
        <OL items={[
          'On connection, CueDeck takes 3 time samples between the client and the Supabase server',
          'Each sample measures the round-trip time and calculates the one-way offset',
          'The median offset is stored and applied to all time displays',
          'All functions use correctedNow() instead of raw Date.now() for consistent timing',
        ]} />

        <H3>Reconnection</H3>
        <P>If the connection drops and recovers, CueDeck automatically re-syncs the clock. The All systems pill in the header shows the connection status (database, realtime, clock and edge functions).</P>

        <Callout type="note">Clock accuracy is typically within ±50ms. This is more than sufficient for live event operations where actions are measured in seconds.</Callout>
      </>
    ),
  },

  // ── 17. Event Log & Export ──────────────────────────────────────────────────
  {
    id: 'event-log',
    title: 'Event Log & Export',
    icon: '📋',
    content: (
      <>
        <P>CueDeck logs every significant action during your event — session transitions, broadcasts, delays, and operator actions. This log is invaluable for post-event review.</P>

        <H3>Viewing the Log</H3>
        <P>The <B>Event log</B> sits at the bottom right of the console, under the inspector; use its arrow to minimise or show it. Entries are displayed in reverse chronological order with timestamps, actor (who triggered it), and the action description.</P>

        <H3>Log Entry Types</H3>
        <UL items={[
          'Session state transitions (e.g. "Session 3 → LIVE by director@company.com")',
          'Broadcast messages sent',
          'Delay cascade applications',
          'Operator connections and disconnections',
          'Signage override pushes',
        ]} />

        <H3>CSV Export</H3>
        <P>Click the <B>Export CSV</B> button to download the full event log. The CSV includes columns for timestamp, action type, session ID, actor, and description. Use this for client reporting or internal review.</P>

        <Callout type="tip">The post-event CSV report also includes a variance analysis showing planned vs. actual start/end times for every session.</Callout>
      </>
    ),
  },

  // ── 18. CSV Import ──────────────────────────────────────────────────────────
  {
    id: 'csv-import',
    title: 'CSV Import',
    icon: '📥',
    content: (
      <>
        <P>You can bulk-import sessions from a CSV file instead of creating them manually. This is especially useful for events with 20+ sessions.</P>

        <H3>CSV Format</H3>
        <P>Your CSV file must include the following columns (headers in the first row):</P>
        <Table
          headers={['Column', 'Required', 'Description', 'Example']}
          rows={[
            ['title', 'Yes', 'Session title', 'Opening Ceremony'],
            ['speaker', 'No', 'Speaker name', 'Dr. Sarah Chen'],
            ['room', 'Yes', 'Room or venue name', 'Main Stage'],
            ['start_time', 'Yes', 'ISO 8601 or HH:MM format', '09:00 or 2026-03-15T09:00'],
            ['duration', 'Yes', 'Duration in minutes', '45'],
            ['notes', 'No', 'Session notes', 'Requires 2 wireless mics'],
          ]}
        />

        <H3>Importing</H3>
        <OL items={[
          'Go to the Sessions view',
          'Click "Import CSV" in the toolbar',
          'Select your CSV file',
          'Review the preview — CueDeck shows a summary of what will be created',
          'Confirm to import all sessions at once',
        ]} />

        <H3>Validation</H3>
        <P>CueDeck validates your CSV before importing. It checks for:</P>
        <UL items={[
          'Required columns present',
          'Valid time formats',
          'Positive duration values',
          'No duplicate session titles in the same room and time',
        ]} />

        <Callout type="important">CSV import creates new sessions — it does not update existing ones. If you need to modify sessions after import, edit them individually in the console.</Callout>
      </>
    ),
  },

  // ── 19. Event Check-in ──────────────────────────────────────────────────────
  {
    id: 'event-check-in',
    title: 'Event Check-in',
    icon: <CheckinIcon />,
    content: (
      <>
        <P>Event Check-in runs the registration desk for one event: your guest list, an online registration page, QR code emails, the check-in desk, a self-registration kiosk, door scanner phones, a live dashboard and a post-event report. It is priced per event and works with or without a CueDeck plan. Open it from <a href={`${APP_URL}/checkin`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>app.cuedeck.io/checkin</a>.</P>

        <H3>Setup</H3>
        <P>Each event has a sidebar: <B>Overview</B>, <B>Guests</B>, <B>Registration</B>, <B>Tickets</B>, <B>Branding</B>, <B>Badges</B>, <B>Emails</B>, <B>Team</B>, <B>Devices</B>, <B>Reports</B>, <B>Settings</B> and <B>Go live</B>. Overview lists what is still to do. Settings holds the name, date, start and end times, venue and timezone, which are shown on the desk, the kiosk and in guest emails.</P>

        <H3>Importing guests</H3>
        <P>Drop a CSV on the Attendees step. Before anything is saved, CueDeck shows who will be added, updated or skipped. Each file can hold up to 5,000 rows, and you can import more than once. You can also add people one at a time with <B>Add person</B>.</P>
        <Table
          headers={['Column', 'Notes']}
          rows={[
            ['first name', 'Guest first name'],
            ['last name', 'Guest last name'],
            ['email', 'Where the QR code is sent'],
            ['company', 'Guests with the same company check in together'],
            ['ticket type', 'For example Delegate, Speaker, VIP; used for arrival alerts and reports'],
          ]}
        />
        <P><B>Export CSV</B> on the same step downloads the guest list with arrival status at any time.</P>

        <H3>Registration page</H3>
        <P>Guests can add themselves to your guest list from a link. On the <B>Registration page</B> step, turn it on to get your link (app.cuedeck.io/r/ followed by a code) and share it in your invitation, on your website or on a poster.</P>
        <UL items={[
          <><B>What guests enter.</B> First name, last name, email, an optional company, and up to five questions of your own: a text answer or a choice from a list, required or optional. They tick a consent box before they can send it.</>,
          <><B>Confirming the email.</B> For a live event, the guest gets an email asking them to confirm their registration. They join your guest list only when they confirm, and their QR code then arrives by email. Nothing is registered for an address whose owner never confirms, and unconfirmed requests are deleted after 48 hours.</>,
          <><B>Capacity and closing time.</B> Set the most guests you can take and when registration closes. Capacity counts everyone on the guest list, however they were added. Registration also closes when check-in closes.</>,
          <><B>A leaked link.</B> Replace the link at any time; the old one stops working at once. Turning the page off keeps the same link for when you turn it back on.</>,
          <><B>Where registrations appear.</B> Guests who registered online are on the Attendees list like everyone else, shown as Registration page on the dashboard. <B>Export CSV</B> includes how each guest was added and their answers to your questions.</>,
        ]} />
        <P>In test mode the page works so you can try it: registrations are recorded straight away without any email, up to 25, and are cleared when you go live. The page is protected by a CAPTCHA, and it is included in the per-event price.</P>

        <H3>Test mode and going live</H3>
        <P>Every event starts in test mode. Everything works, but check-ins are capped at 25 and are cleared when you go live, so you can rehearse the desk with your team. An event can only be deleted while it is in test mode.</P>
        <P>Going live is a one-off payment for that event, at the per-event price shown in setup (excl. VAT; tax is calculated at checkout from your billing address, and you can add a VAT ID). The invoice arrives by email. Live events accept check-ins from a week before the event date until the end of the second day after it.</P>

        <H3>QR code emails</H3>
        <P>Each guest gets an email with a personal QR code. Emails to guests are sent only once the event is live; in test mode, <B>Send a test to myself</B> shows you exactly what guests will receive. With <B>Email QR codes on import</B> turned on, guests imported after go-live get their code straight away.</P>

        <H3>Desk staff and roles</H3>
        <P>Invite people by email on the Desk staff step. They only ever see this event.</P>
        <Table
          headers={['Role', 'What they can do']}
          rows={[
            ['Organizer', 'Edits the event, imports guests, sends QR emails and invites people'],
            ['Desk lead', 'Runs the desk on the day: kiosks, walk-ins, undoing any check-in, and inviting desk staff'],
            ['Crew', 'Searches, checks people in, prints badges and undoes their own check-ins'],
            ['Viewer', 'Sees the live numbers on the dashboard, never names'],
          ]}
        />

        <H3>The check-in desk</H3>
        <UL items={[
          <><B>Scan or search.</B> Point a USB scanner at the QR code, or type two or more letters of a name, company or email.</>,
          <><B>Whole companies at once.</B> When a guest arrives, everyone from the same company is listed. Tick who is standing at the desk and check them in together.</>,
          <><B>Badges.</B> Badges print through Chrome to any printer the computer can use, on the badge stock you choose under <B>Badges</B> (see below).</>,
          <><B>Walk-ins.</B> Add a walk-in at the desk, or let them register themselves at the kiosk.</>,
          <><B>Undo.</B> A check-in made by mistake can be undone. The correction is kept in the log; nothing is erased.</>,
          <><B>Offline.</B> If the Wi-Fi drops, the desk keeps checking people in and syncs when the connection is back. The header shows when everything is synced.</>,
        ]} />
        <Callout type="tip">For one-click badge printing without a dialog, start Chrome with kiosk printing enabled and set the printer and badge size once in the system print settings. Test a few badges on your real printer before the doors open.</Callout>

        <H3>Self-registration kiosk</H3>
        <P>Turn on <B>Self-registration kiosk</B> in setup, then pair a tablet: on the desk, open <B>Kiosk or scanner</B> and create a pairing code, then open app.cuedeck.io/kiosk on the tablet and type the code. You only do this once per tablet. Walk-ins type their details and are checked in; with <B>Kiosk prints badges</B> on, their badge prints straight away. A desk lead can revoke a kiosk from the same window at any time.</P>

        <H3>Door scanner phones</H3>
        <P>Any phone can check people in at a door, without a desk. Add your doors under <B>Door scanning</B> in setup, then on the desk open <B>Kiosk or scanner</B>, choose the door the phone will scan at and create a pairing code. Open app.cuedeck.io/checkin/scan on the phone and type the code. The phone confirms each scan with a sound and a clear result:</P>
        <UL items={[
          <><B>Checked in:</B> two rising notes and a green tick.</>,
          <><B>Already checked in:</B> one note. Let them through if it is the same person.</>,
          <><B>Refused</B> (for example a code from another event): two low buzzes.</>,
        ]} />
        <P>A code is read once and not again until it has been out of view for a moment, so a guest holding their phone still is not scanned twice. The phone keeps only the list of codes, never names, so a lost phone gives nothing away.</P>

        <H3>Live dashboard</H3>
        <P>The dashboard shows registered, checked in and still expected guests, arrivals per 15 minutes, turnout by ticket type, each desk with its sync status, and a company board that shows which companies are here, partly here or not here yet. <B>Client view</B> is a numbers-only version you can share on a screen.</P>
        <P><B>Arrival alerts:</B> choose ticket types in setup, such as VIP or Speaker. When one of those guests checks in, the alert appears on the dashboard and on desk leads&apos; screens.</P>

        <H3>Post-event report</H3>
        <P>About two hours after check-in closes, the event owner receives the report by email: turnout by ticket type, the busiest fifteen minutes, check-ins per desk, check-ins that were made offline and synced later, and companies with people missing.</P>
        <P>For a summary of what Event Check-in does and what it costs, see the <a href="/solutions/check-in" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>event check-in app with QR codes and badges</a>.</P>
      </>
    ),
  },

  // ── 20. Check-in: registration, invitations and tickets ────────────────────
  {
    id: 'check-in-registration',
    title: 'Check-in: Registration, Invitations and Tickets',
    icon: <TicketIcon />,
    content: (
      <>
        <P>Everything under <B>Registration</B> and <B>Tickets</B> decides who can get onto your guest list and how.</P>

        <H3>Page language</H3>
        <P>The registration page, its emails and the guest&apos;s ticket are available in English, Polski, Deutsch and Arabic. <B>Automatic</B> shows each guest the page in their browser&apos;s language when it is one of these, or you can fix one language. What you write yourself (event name, description, questions, ticket names) is shown as you wrote it. Guests who register get their later emails in the language they used on the page.</P>

        <H3>Who can register</H3>
        <UL items={[
          <><B>Anyone with the link.</B> The default.</>,
          <><B>Invited guests only.</B> The public link takes no registrations. You invite guests from your guest list and each one gets a personal link to say whether they are coming. With approval on as well, the public link takes requests for an invitation instead.</>,
        ]} />

        <H3>Invitations</H3>
        <P>With <B>Invited guests only</B> on and the event live, the Guests page shows an <B>Invitations</B> bar: how many were invited, coming, not coming and not answered yet. <B>Send invitations</B> emails every imported guest with an email address who has not been invited yet, and <B>Send me a test</B> shows you the email first.</P>
        <UL items={[
          <><B>Answering.</B> The guest opens their link and says whether they are coming. They can come back to the same link and change their answer, and their plus-ones if you allow them.</>,
          <><B>Invite again.</B> Sends a fresh link to one guest. Each address can get one invitation every 10 minutes and at most five a day for an event.</>,
          <><B>Cancel link.</B> If an invitation was forwarded, this stops every link that guest was sent from working. Use Invite again to send a new one.</>,
        ]} />

        <H3>Waitlist and approval</H3>
        <UL items={[
          <><B>Waitlist when full.</B> Once you reach capacity, guests can join a waitlist instead. Offer places from the list and their ticket is emailed.</>,
          <><B>Move people up automatically.</B> When a place opens up (someone removed, a ticket refunded, capacity raised), the next people on the waitlist get it in order and their ticket is emailed. This is checked every 5 minutes. A group moves up only when all of it fits, and nobody jumps the queue.</>,
          <><B>Approve each registration.</B> Registrations wait for you, and guests get their ticket only once you approve them.</>,
        ]} />

        <H3>Plus-ones</H3>
        <P>Allow each guest to bring up to five people. Every plus-one gets their own QR ticket, sent to the guest who brought them, and takes a place within your capacity. Paid tickets have no plus-ones: everyone buys their own.</P>

        <H3>Tickets</H3>
        <P>Ticket types let guests choose what they register for. Without any, registration is free and nobody chooses. Each type has a name, an optional description, a price and currency, and optionally how many are available. A price of 0.00 makes a free ticket.</P>
        <UL items={[
          <><B>Getting paid.</B> To sell paid tickets, click <B>Connect Stripe</B> under Tickets and connect your own Stripe account. Payments go straight to that account. Free tickets work without Stripe.</>,
          <><B>What the guest sees.</B> The guest pays on Stripe&apos;s checkout page and gets their QR ticket by email once the payment has gone through.</>,
          <><B>Orders.</B> Tickets lists every order as Paid, Paying now or Refunded, with your revenue.</>,
          <><B>Refunds.</B> Click <B>Refund</B> on an order, then click again to confirm. The money goes back through Stripe. A guest who has not checked in yet is taken off the guest list and their QR code stops working; a guest who already checked in stays on it.</>,
        ]} />
        <Callout type="note">Stripe&apos;s card fees are charged on your Stripe account, and disputes are handled there too.</Callout>

        <H3>Put the form on your own website</H3>
        <P>Under Registration, open <B>Put the form on your own website</B> and copy the code into your page. The form fits itself to your page. Confirming an email and paying still open on CueDeck&apos;s own page.</P>

        <H3>Speakers from your run of show</H3>
        <P>If the event also runs in the CueDeck console, turn on <B>Tell the production console when a speaker arrives</B> on the Guests page. When a guest whose name matches a speaker checks in, their session shows the speaker as arrived. Only guests you listed or the desk added in person count, never names typed on the registration page or a kiosk. A panel counts once everyone on it is in.</P>
      </>
    ),
  },

  // ── 21. Check-in: branding, badges, emails, reports and integrations ───────
  {
    id: 'check-in-emails-integrations',
    title: 'Check-in: Branding, Emails and Integrations',
    icon: <MailIcon />,
    content: (
      <>
        <H3>Branding</H3>
        <P>One brand per event: <B>Hosted by</B>, a brand colour, the venue address (used for a Maps link), a description of the event, a wide cover image (at least 1600 px across) and a logo (square works best). Anything you leave empty is simply not shown. The brand appears on the registration page and in guest emails, and the colour on console displays. With <B>Show the programme</B> on, guests also see your sessions and times from the run of show, including any delays, for events you run in CueDeck.</P>
        <P><B>White label</B> removes CueDeck from what guests see: the registration page no longer says Registration by CueDeck, and guest emails have no CueDeck footer. The privacy link and the consent text stay, because they tell guests who handles their data.</P>

        <H3>Badges</H3>
        <P>The preview under <B>Badges</B> is the real badge at its printed size.</P>
        <Table
          headers={['Setting', 'Choices']}
          rows={[
            ['Badge stock', '100 × 70 mm (default), 4 × 3 in, 90 × 55 mm, A6, 4 × 6 in portrait, or your own size from 50 to 200 mm wide and 40 to 200 mm high'],
            ['Name', 'Full name, or first name large'],
            ['Layout', 'Centred or left'],
            ['Shown on the badge', 'Colour band, logo, company, ticket type, QR code (each on or off)'],
            ['Colours by ticket type', 'A band colour per ticket type, so staff spot VIPs and speakers across the room'],
          ]}
        />
        <P><B>Print a test badge</B> prints one on the printer attached to that computer.</P>

        <H3>Automatic emails</H3>
        <P>Turn these on under <B>Emails</B>. They go out once the event is live; test mode never emails guests. <B>Send me the reminder</B> and <B>Send me the thank-you</B> send you a copy first.</P>
        <UL items={[
          <><B>Reminder the day before.</B> Goes out from 24 hours before doors open, with each guest&apos;s QR code, the time and the venue. Guests who already checked in are skipped. Add an optional note, such as parking or which entrance to use.</>,
          <><B>Thank-you after the event.</B> Goes out 2 hours after the event ends, only to guests who checked in. Add an optional note and a link, such as a survey or the slides.</>,
        ]} />

        <H3>Registration reports</H3>
        <P>Under <B>Reports</B>, the registration page shows visitors, registrations and what share of visitors registered, guests checked in and QR emails sent, with a chart of the last 30 days. Visitors are counted once a day each, without cookies. Cards for invitations, ticket sales, the waitlist, plus-ones and automatic emails appear when they apply to the event.</P>
        <P>To see where guests come from, add <B>?ref=</B> and a word of your choice to your registration link, for example <B>?ref=newsletter</B> in your newsletter and <B>?ref=linkedin</B> in a post. The Sources table shows visitors and registrations for each one, and the guest export includes each guest&apos;s source.</P>

        <H3>Integrations (webhooks)</H3>
        <P>Under <B>Settings</B>, <B>Integrations</B> sends guests, check-ins and ticket sales to your own tools as they happen: Zapier, Make, your CRM or your own server. Add an https address and choose what it receives:</P>
        <Table
          headers={['Choice', 'Sent when']}
          rows={[
            ['New guest', 'A guest is added to the list'],
            ['Check-in', 'A guest checks in'],
            ['Ticket paid', 'A paid ticket order goes through'],
            ['Invitation answered', 'An invited guest says whether they are coming'],
          ]}
        />
        <UL items={[
          <><B>Only live events send.</B> Nothing is sent while the event is in test mode.</>,
          <><B>Signing secret.</B> Shown once when you add the webhook, so copy it then. Each call carries an <B>X-CueDeck-Signature</B> header, t=time,v1=signature, where the signature is HMAC-SHA256 of the time, a dot and the body, using your secret, in hex. Check it, and refuse calls older than five minutes.</>,
          <><B>Retries.</B> An answer other than 2xx within 10 seconds counts as failed, and the call is retried after 1, 5, 30, 120 and 360 minutes. Last delivery in the list shows how the latest call went.</>,
          <><B>Who it belongs to.</B> A webhook keeps sending only while the person who added it can still edit the event. The address must use the standard https port and may not point at a private network.</>,
        ]} />
      </>
    ),
  },

  // ── 22. Guide: check-in for your first event ────────────────────────────────
  {
    id: 'check-in-first-event',
    title: 'Guide: Run Check-in for Your First Event',
    icon: <GuideIcon />,
    content: (
      <>
        <P>A step-by-step walkthrough from an empty event to an open door. Allow about thirty minutes, plus time to rehearse with your team.</P>
        <H3>A week or more before</H3>
        <OL items={[
          <><B>Create the event.</B> In <a href={`${APP_URL}/checkin`} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>Check-in</a>, create an event and fill in the name, date, venue and timezone.</>,
          <><B>Prepare your CSV.</B> One row per guest with the columns first name, last name, email, company and ticket type. Use the same spelling for each company so its people are grouped together.</>,
          <><B>Import it.</B> Drop the file on the Guests page, check the added, updated and skipped counts, then confirm.</>,
          <><B>Or let guests register.</B> Turn on the registration page under Registration and share the link in your invitation. Each guest confirms their email before joining the list.</>,
          <><B>Choose arrival alerts.</B> Pick the ticket types you want to hear about, such as VIP.</>,
          <><B>Invite your team.</B> Add a desk lead and crew under Team.</>,
          <><B>Check the QR email.</B> Use Send a test to myself and open it on your phone.</>,
        ]} />
        <H3>Rehearse in test mode</H3>
        <OL items={[
          'Open the desk on the laptop you will use on the day and check in a few colleagues by search and by QR code.',
          'Print a badge on the real printer and check it fits your 100 × 70 mm badge stock.',
          'Pair a phone as a door scanner and a tablet as a kiosk, and try both.',
          'Undo a check-in, and switch the Wi-Fi off for a minute to see the desk carry on and sync.',
        ]} />
        <Callout type="note">Test check-ins are capped at 25 and are cleared when you go live, so rehearsal never shows up in your real numbers.</Callout>
        <H3>Go live</H3>
        <OL items={[
          'On the Go live step, pay for the event. The price is shown there before you pay.',
          'Send the QR emails to every guest from the QR emails step.',
          'Turn on Email QR codes on import if more guests will be added later.',
        ]} />
        <H3>On the day</H3>
        <OL items={[
          'Open the desk on each laptop, pair the kiosk and the door phones again if they were reset.',
          'Keep the dashboard open on a separate screen to watch arrivals, desks and missing companies.',
          'Afterwards, the report arrives by email once check-in closes, and Export CSV gives you the full list.',
        ]} />
      </>
    ),
  },

];

// ─── Page Component ─────────────────────────────────────────────────────────────
export default function DocsPage() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        a { transition: opacity 0.15s; }
        a:hover { opacity: 0.82; }
        .docs-page-wrap { overflow-x: hidden; width: 100%; }
        .docs-hero { padding-top: 120px; }
        @media (max-width: 1023px) {
          .docs-hero { padding-top: 180px !important; }
        }
      `}</style>

      <Nav />

      <main className="docs-page-wrap">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="docs-hero" style={{
        paddingBottom: 48,
        background: 'linear-gradient(135deg, #f0f7ff 0%, #fafafa 40%, #fff7ed 100%)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 99, marginBottom: 20,
            background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
            fontSize: 12, fontWeight: 600, color: '#3b82f6', letterSpacing: '0.04em',
          }}>
            USER GUIDE
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-1.2px',
            color: '#111827',
            marginBottom: 16,
          }}>
            CueDeck Documentation
          </h1>

          <p style={{
            fontSize: 18,
            color: '#6b7280',
            lineHeight: 1.65,
            maxWidth: 560,
            margin: '0 auto',
          }}>
            Everything you need to run live events with CueDeck — from first login to post-event reports.
          </p>
        </div>
      </section>

      {/* ── Docs content (client component) ───────────────────── */}
      <section style={{ padding: '48px 0 0', background: '#fff' }}>
        <DocsClient sections={SECTIONS} />
      </section>

      {/* ── CTA Strip ────────────────────────────────────────────── */}
      <section style={{
        padding: '64px 40px',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.07,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800, color: '#fff',
            letterSpacing: '-0.8px', marginBottom: 14, lineHeight: 1.2,
          }}>
            Ready to try CueDeck?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.6 }}>
            Start your free 3-day trial. No credit card required.
          </p>
          <a href={TRIAL_URL} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 32px', borderRadius: 12,
            fontWeight: 700, fontSize: 15, textDecoration: 'none',
            background: '#fff', color: '#1d4ed8',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}>
            Start free trial →
          </a>
        </div>
      </section>
      </main>{/* end docs-page-wrap */}

      <Footer cta={false} />
    </>
  );
}
