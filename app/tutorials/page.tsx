import { Metadata } from 'next'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import TutorialsClient from './TutorialsClient'

export const metadata: Metadata = {
  title: 'Tutorials — CueDeck',
  description: 'Learn CueDeck with our complete 21-episode tutorial series — from setting up your first event to running AI-assisted live productions.',
}

const EPISODES = [
  { num: '01', shortTitle: 'Welcome & Overview', duration: '4–5 min', category: 'start', youtubeUrl: 'https://www.youtube.com/watch?v=YzZuZiprSao', accentColor: '#3b82f6',
    desc: 'A full overview of what CueDeck does and a walkthrough of the six roles — director, stage, AV, interpretation, registration, and signage.' },
  { num: '02', shortTitle: 'Your First Event', duration: '6–7 min', category: 'start', youtubeUrl: 'https://www.youtube.com/watch?v=v0CM_4XKMcQ', accentColor: '#3b82f6',
    desc: 'Create an event from scratch — event details, sessions, rooms, speakers, and running order. Ends with a full programme ready to go live.' },
  { num: '03', shortTitle: 'Running Live', duration: '5–6 min', category: 'start', youtubeUrl: 'https://www.youtube.com/watch?v=NDeJfYDrcns', accentColor: '#3b82f6',
    desc: 'The core of CueDeck: the full session lifecycle — PLANNED, READY, CALLING, LIVE, HOLD, OVERRUN, ENDED — with the delay nudge cascade.' },
  { num: '04', shortTitle: 'Roles & Team', duration: '5 min', category: 'start', youtubeUrl: 'https://www.youtube.com/watch?v=DxrMZCBU4Cs', accentColor: '#3b82f6',
    desc: 'Explore all 6 roles and exactly what each can see and do. Walk through the team invite flow to get your whole crew connected before show day.' },
  { num: '05', shortTitle: 'Broadcast Bar', duration: '4 min', category: 'start', youtubeUrl: 'https://www.youtube.com/watch?v=2ZqYHw2TI_E', accentColor: '#3b82f6',
    desc: 'No more group chats during a live event. Send a message to every connected device instantly. One-click presets for your most common announcements.' },
  { num: '06', shortTitle: 'Delay Cascade', duration: '6–7 min', category: 'prod', youtubeUrl: 'https://www.youtube.com/watch?v=vq4hef-0uCg', accentColor: '#f59e0b',
    desc: 'When a session runs long, CueDeck automatically shifts every subsequent session. See anchor sessions, cascade visualiser, and instant reset.' },
  { num: '07', shortTitle: 'Signage Setup', duration: '6–7 min', category: 'signage', youtubeUrl: 'https://www.youtube.com/watch?v=ZD8xXyBt7ec', accentColor: '#10b981',
    desc: 'Turn any browser tab into a live venue display. Lobby monitors, stage-side screens, backstage tablets — all updating in realtime from your console.' },
  { num: '08', shortTitle: 'All 11 Display Modes', duration: '8–10 min', category: 'signage', youtubeUrl: 'https://www.youtube.com/watch?v=ntM9NZkPWR8', accentColor: '#10b981',
    desc: 'A complete walkthrough of every display mode: schedule, agenda, timeline, programme grid, next-up, sponsors, stage timer, and more.' },
  { num: '09', shortTitle: 'Stage Monitor', duration: '5–6 min', category: 'signage', youtubeUrl: 'https://www.youtube.com/watch?v=5pnrAtIQBZI', accentColor: '#10b981',
    desc: 'A fullscreen overlay showing the current LIVE session in giant text. Colour-coded by urgency — green, amber, red, OVERRUN, HOLD.' },
  { num: '10', shortTitle: 'Stage Timer', duration: '5–6 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'A fullscreen speaker countdown — standby, green, amber, red, overrun flash, and hold freeze. Set up once, runs for the whole event.' },
  { num: '11', shortTitle: 'AI Incident Advisor', duration: '5–6 min', category: 'ai', youtubeUrl: null, accentColor: '#8b5cf6',
    desc: 'When something goes wrong on stage, the AI Incident Advisor gives you a prioritised action plan in seconds. Demo with a real incident scenario.' },
  { num: '12', shortTitle: 'AI Cue Engine', duration: '5 min', category: 'ai', youtubeUrl: null, accentColor: '#8b5cf6',
    desc: 'The Cue Engine fires 8 minutes before every session with an AI-generated readiness checklist — mic, slides, speaker, AV. Never miss a pre-cue.' },
  { num: '13', shortTitle: 'AI Report Generator', duration: '6 min', category: 'ai', youtubeUrl: null, accentColor: '#8b5cf6',
    desc: 'After the event, generate a full debrief: session variance, incident log, executive summary, and AI narrative — ready to send to your client.' },
  { num: '14', shortTitle: 'Timeline & Programme', duration: '5–6 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'Timeline mode shows sessions as a chronological list. Programme mode shows a time × room grid — perfect for a lobby overview screen.' },
  { num: '15', shortTitle: 'Sponsor Signage', duration: '4–5 min', category: 'signage', youtubeUrl: null, accentColor: '#10b981',
    desc: 'Upload sponsor logos to CueDeck, add them to the rotating sponsor display, and show branded content on your venue screens between sessions.' },
  { num: '16', shortTitle: 'Event Log', duration: '5 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'Every state change, broadcast, and delay is logged automatically. Use the event log during the event and export a full audit trail after.' },
  { num: '17', shortTitle: 'Keyboard Shortcuts', duration: '3–4 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'Speed up your workflow with keyboard shortcuts and the Cmd+K command palette — quick reference, help docs, and instant navigation.' },
  { num: '18', shortTitle: 'Mobile & Tablet', duration: '4–5 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'CueDeck is fully responsive. Run it on any device — laptop, tablet, phone. See how the layout adapts for each role on smaller screens.' },
  { num: '19', shortTitle: 'Billing & Plans', duration: '4 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'Walk through the three pricing plans — Pay-per-Event, Starter, and Pro — and manage your subscription from inside the console.' },
  { num: '20', shortTitle: 'Multi-Room Events', duration: '6–7 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'Running a conference with 4+ parallel tracks? Structure sessions by room, filter views per role, and keep delays room-isolated.' },
  { num: '21', shortTitle: 'Full Walkthrough', duration: '18–22 min', category: 'advanced', youtubeUrl: null, accentColor: '#ef4444',
    desc: 'The complete CueDeck experience in one session — create event, invite team, run 10 sessions live, use AI agents, manage signage, export report.' },
]

export default function TutorialsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64, minHeight: '80vh', background: '#fff' }}>
        <TutorialsClient episodes={EPISODES} />
      </main>
      <Footer />
    </>
  )
}
