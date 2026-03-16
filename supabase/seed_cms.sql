-- =============================================================================
-- CueDeck CMS — Seed Data
-- File: seed_cms.sql
-- Idempotent: clears and re-seeds all CMS tables with consistent UUIDs.
-- Does NOT touch cms_users (requires auth.users entries).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Clean slate: delete all existing seed data so UUIDs stay consistent
-- ---------------------------------------------------------------------------
DELETE FROM audit_log;
DELETE FROM page_sections;
DELETE FROM pages;
DELETE FROM blog_posts;
DELETE FROM blog_tags;
DELETE FROM testimonials;
DELETE FROM pricing_plans;
DELETE FROM feature_cards;
DELETE FROM team_members;
DELETE FROM faqs;
DELETE FROM changelog_items;
DELETE FROM site_settings;
DELETE FROM redirects;

-- ---------------------------------------------------------------------------
-- pages
-- ---------------------------------------------------------------------------
INSERT INTO pages (id, slug, title, meta_title, meta_description, status, published_at)
VALUES
  (
    'b0000001-0000-0000-0000-000000000001',
    'home',
    'Homepage',
    'CueDeck — Run flawless events, every time',
    'CueDeck is the all-in-one production console for conference directors, AV teams, and event operators.',
    'published',
    now() - interval '30 days'
  ),
  (
    'b0000001-0000-0000-0000-000000000002',
    'pricing',
    'Pricing',
    'CueDeck Pricing — Simple, transparent plans',
    'Choose the CueDeck plan that fits your event production needs. Start free, scale as you grow.',
    'published',
    now() - interval '30 days'
  ),
  (
    'b0000001-0000-0000-0000-000000000003',
    'about',
    'About',
    'About CueDeck — Built by event professionals',
    'We built CueDeck because we lived the chaos of conference production firsthand.',
    'draft',
    NULL
  )
ON CONFLICT (slug) DO UPDATE SET
  title            = EXCLUDED.title,
  meta_title       = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  status           = EXCLUDED.status,
  updated_at       = now();

-- ---------------------------------------------------------------------------
-- page_sections (homepage)
-- ---------------------------------------------------------------------------
INSERT INTO page_sections (id, page_id, section_type, order_index, content_json, is_visible)
VALUES
  (
    'c0000001-0000-0000-0000-000000000001',
    'b0000001-0000-0000-0000-000000000001',
    'hero',
    0,
    '{
      "headline": "Run flawless events, every time",
      "subheadline": "CueDeck is the all-in-one production console for conference directors.",
      "cta_primary": "Start free trial",
      "cta_secondary": "Watch demo",
      "cta_primary_url": "/signup",
      "cta_secondary_url": "/demo"
    }'::jsonb,
    true
  ),
  (
    'c0000001-0000-0000-0000-000000000002',
    'b0000001-0000-0000-0000-000000000001',
    'features',
    1,
    '{
      "headline": "Everything your team needs on stage day",
      "subheadline": "From the opening keynote to the final Q&A, CueDeck keeps every operator in sync."
    }'::jsonb,
    true
  ),
  (
    'c0000001-0000-0000-0000-000000000003',
    'b0000001-0000-0000-0000-000000000001',
    'testimonials',
    2,
    '{
      "headline": "Trusted by production teams worldwide",
      "subheadline": "Event directors and AV professionals rely on CueDeck for their most critical days."
    }'::jsonb,
    true
  ),
  (
    'c0000001-0000-0000-0000-000000000004',
    'b0000001-0000-0000-0000-000000000001',
    'pricing',
    3,
    '{
      "headline": "Simple, transparent pricing",
      "subheadline": "No hidden fees. Cancel anytime.",
      "billing_note": "All prices are tax-inclusive. EU VAT handled automatically."
    }'::jsonb,
    true
  ),
  (
    'c0000001-0000-0000-0000-000000000005',
    'b0000001-0000-0000-0000-000000000001',
    'cta',
    4,
    '{
      "headline": "Ready to take control of your event?",
      "subheadline": "Join hundreds of production teams who trust CueDeck on stage day.",
      "cta_label": "Start free trial",
      "cta_url": "/signup"
    }'::jsonb,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  section_type = EXCLUDED.section_type,
  order_index  = EXCLUDED.order_index,
  content_json = EXCLUDED.content_json,
  is_visible   = EXCLUDED.is_visible,
  updated_at   = now();

-- ---------------------------------------------------------------------------
-- blog_tags
-- ---------------------------------------------------------------------------
INSERT INTO blog_tags (id, name, slug, color)
VALUES
  ('d0000001-0000-0000-0000-000000000001', 'Production',    'production',    '#3b82f6'),
  ('d0000001-0000-0000-0000-000000000002', 'Events',        'events',        '#10b981'),
  ('d0000001-0000-0000-0000-000000000003', 'AV',            'av',            '#f59e0b'),
  ('d0000001-0000-0000-0000-000000000004', 'Hybrid',        'hybrid',        '#8b5cf6'),
  ('d0000001-0000-0000-0000-000000000005', 'Product',       'product',       '#ef4444')
ON CONFLICT (slug) DO UPDATE SET
  name  = EXCLUDED.name,
  color = EXCLUDED.color;

-- ---------------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------------
INSERT INTO blog_posts (id, slug, title, excerpt, content_json, tags, status, published_at, read_time_minutes)
VALUES
  (
    'e0000001-0000-0000-0000-000000000001',
    'how-to-run-a-perfect-conference',
    'How to Run a Perfect Conference: A Director''s Playbook',
    'After producing over 200 conferences, we distilled the essential workflows every event director needs to run a flawless show.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Running a conference is one of the most logistically demanding things a person can do professionally. You''re coordinating speakers, AV teams, interpreters, registration staff, and signage operators — often simultaneously across multiple rooms."}]},{"type":"paragraph","content":[{"type":"text","text":"The directors who make it look effortless share one trait: they have a system. In this playbook, we break down the exact workflows that keep high-pressure events on track from first rehearsal to final applause."}]}]}'::jsonb,
    ARRAY['production', 'events'],
    'published',
    now() - interval '14 days',
    8
  ),
  (
    'e0000001-0000-0000-0000-000000000002',
    '5-signs-your-av-setup-is-about-to-fail',
    '5 Signs Your AV Setup Is About to Fail (And How to Fix It)',
    'These are the warning signs every AV director should recognise before they become a live incident.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"AV failures don''t happen randomly. In almost every case, there were warning signs that went unnoticed or unaddressed in the hours before showtime. This post covers the five most common signals — and the quick fixes that prevent them from becoming full-blown incidents on stage."}]},{"type":"paragraph","content":[{"type":"text","text":"Whether you''re running a 50-person boardroom or a 5,000-seat keynote, these principles apply. Learn to read the room before it''s too late."}]}]}'::jsonb,
    ARRAY['av', 'troubleshooting'],
    'published',
    now() - interval '21 days',
    6
  ),
  (
    'e0000001-0000-0000-0000-000000000003',
    'the-future-of-hybrid-events',
    'The Future of Hybrid Events: What Planners Need to Know',
    'Hybrid events are no longer a pandemic workaround — they''re a permanent format that demands a new operational playbook.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"When hybrid events first emerged as a necessity, most production teams treated them as an in-person event with a camera pointed at the stage. Three years on, audience expectations have shifted dramatically."}]},{"type":"paragraph","content":[{"type":"text","text":"In this article we explore the operational patterns, technology choices, and team structures that distinguish great hybrid events from the ones that leave remote attendees feeling like an afterthought."}]}]}'::jsonb,
    ARRAY['hybrid', 'trends'],
    'draft',
    NULL,
    7
  ),
  (
    'e0000001-0000-0000-0000-000000000004',
    'cuedeck-2-5-released',
    'CueDeck 2.5 Released: Stage Timer, AI Agents, and More',
    'Our biggest release yet brings a speaker-facing stage timer display, three AI agent modules, and a fully redesigned onboarding experience.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"CueDeck 2.5 is here. This release is the result of six months of feedback from production teams across Europe and North America, and it addresses the most-requested features in our backlog."}]},{"type":"paragraph","content":[{"type":"text","text":"The headline addition is the Stage Timer display mode: a fullscreen, speaker-facing countdown that colour-codes urgency, freezes on HOLD, and flashes red on OVERRUN. No more hand signals across the room."}]}]}'::jsonb,
    ARRAY['product', 'release'],
    'published',
    now() - interval '7 days',
    4
  )
ON CONFLICT (slug) DO UPDATE SET
  title              = EXCLUDED.title,
  excerpt            = EXCLUDED.excerpt,
  content_json       = EXCLUDED.content_json,
  tags               = EXCLUDED.tags,
  status             = EXCLUDED.status,
  published_at       = EXCLUDED.published_at,
  read_time_minutes  = EXCLUDED.read_time_minutes,
  updated_at         = now();

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
INSERT INTO testimonials (id, author_name, author_title, company, quote, rating, is_featured, order_index)
VALUES
  (
    'f0000001-0000-0000-0000-000000000001',
    'Sarah Chen',
    'Head of Events',
    'TechConf Europe',
    'CueDeck transformed our event operations. We went from chaos to complete control in minutes.',
    5,
    true,
    0
  ),
  (
    'f0000001-0000-0000-0000-000000000002',
    'Marcus Rodriguez',
    'AV Director',
    'Meridian Productions',
    'The stage timer display alone is worth the price. No more frantic signaling across the room.',
    5,
    false,
    1
  ),
  (
    'f0000001-0000-0000-0000-000000000003',
    'Emma Blackwood',
    'Conference Producer',
    'Summit Group',
    'We manage 12 simultaneous tracks. CueDeck is the only tool that scales with us.',
    5,
    true,
    2
  ),
  (
    'f0000001-0000-0000-0000-000000000004',
    'James O''Connor',
    'Event Manager',
    'Global Events Agency',
    'The delay cascade feature saved our keynote when a speaker ran 20 minutes long. Incredible.',
    4,
    false,
    3
  )
ON CONFLICT (id) DO UPDATE SET
  author_name  = EXCLUDED.author_name,
  author_title = EXCLUDED.author_title,
  company      = EXCLUDED.company,
  quote        = EXCLUDED.quote,
  rating       = EXCLUDED.rating,
  is_featured  = EXCLUDED.is_featured,
  order_index  = EXCLUDED.order_index;

-- ---------------------------------------------------------------------------
-- pricing_plans
-- ---------------------------------------------------------------------------
INSERT INTO pricing_plans (id, name, slug, price_monthly, price_annual, features_json, cta_label, cta_url, is_highlighted, is_active, order_index)
VALUES
  (
    'a1000001-0000-0000-0000-000000000001',
    'Starter',
    'starter',
    49.00,
    39.00,
    '["Up to 3 events per month", "5 operator seats", "All display modes", "Email support"]'::jsonb,
    'Get started',
    '/signup',
    false,
    true,
    0
  ),
  (
    'a1000001-0000-0000-0000-000000000002',
    'Pro',
    'pro',
    149.00,
    119.00,
    '["Unlimited events", "15 operator seats", "AI Agent modules", "Priority support", "Custom branding"]'::jsonb,
    'Start free trial',
    '/signup?plan=pro',
    true,
    true,
    1
  ),
  (
    'a1000001-0000-0000-0000-000000000003',
    'Enterprise',
    'enterprise',
    0.00,
    0.00,
    '["Unlimited everything", "Dedicated account manager", "SLA guarantee", "Custom integrations", "On-site training"]'::jsonb,
    'Contact us',
    '/contact',
    false,
    true,
    2
  )
ON CONFLICT (slug) DO UPDATE SET
  name           = EXCLUDED.name,
  price_monthly  = EXCLUDED.price_monthly,
  price_annual   = EXCLUDED.price_annual,
  features_json  = EXCLUDED.features_json,
  cta_label      = EXCLUDED.cta_label,
  cta_url        = EXCLUDED.cta_url,
  is_highlighted = EXCLUDED.is_highlighted,
  is_active      = EXCLUDED.is_active,
  order_index    = EXCLUDED.order_index;

-- ---------------------------------------------------------------------------
-- feature_cards
-- ---------------------------------------------------------------------------
INSERT INTO feature_cards (id, title, description, icon_name, category, order_index, is_visible)
VALUES
  (
    'a2000001-0000-0000-0000-000000000001',
    'Multi-Role Access',
    'Director, AV, stage, interpreter, registration — everyone sees what they need, nothing they don''t.',
    'Users',
    'operations',
    0,
    true
  ),
  (
    'a2000001-0000-0000-0000-000000000002',
    'Real-Time Sync',
    'All operators see the same live state with sub-second latency via Supabase Realtime.',
    'Zap',
    'technology',
    1,
    true
  ),
  (
    'a2000001-0000-0000-0000-000000000003',
    'Digital Signage',
    '11 display modes including stage timer, sponsor carousel, and programme grid.',
    'Monitor',
    'operations',
    2,
    true
  ),
  (
    'a2000001-0000-0000-0000-000000000004',
    'AI Agents',
    'Incident advisor, cue engine, and post-event report generator built in.',
    'Bot',
    'ai',
    3,
    true
  ),
  (
    'a2000001-0000-0000-0000-000000000005',
    'Delay Cascade',
    'Push one button to ripple a delay through all remaining sessions automatically.',
    'Clock',
    'operations',
    4,
    true
  ),
  (
    'a2000001-0000-0000-0000-000000000006',
    'Offline Resilience',
    'Works through network hiccups with automatic reconnection and state recovery.',
    'Shield',
    'technology',
    5,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  title       = EXCLUDED.title,
  description = EXCLUDED.description,
  icon_name   = EXCLUDED.icon_name,
  category    = EXCLUDED.category,
  order_index = EXCLUDED.order_index,
  is_visible  = EXCLUDED.is_visible;

-- ---------------------------------------------------------------------------
-- team_members
-- ---------------------------------------------------------------------------
INSERT INTO team_members (id, name, role, bio, order_index, is_visible)
VALUES
  (
    'a3000001-0000-0000-0000-000000000001',
    'Alex Rivera',
    'Founder & CEO',
    'Alex spent a decade directing large-scale conferences before building the tool they always wished existed.',
    0,
    true
  ),
  (
    'a3000001-0000-0000-0000-000000000002',
    'Jordan Kim',
    'Head of Product',
    'Jordan brings deep UX expertise from the broadcast world, shaping every operator-facing interaction in CueDeck.',
    1,
    true
  ),
  (
    'a3000001-0000-0000-0000-000000000003',
    'Sam Patel',
    'Lead Engineer',
    'Sam architected the real-time sync engine and edge function infrastructure that makes CueDeck sub-second reliable.',
    2,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  role        = EXCLUDED.role,
  bio         = EXCLUDED.bio,
  order_index = EXCLUDED.order_index,
  is_visible  = EXCLUDED.is_visible;

-- ---------------------------------------------------------------------------
-- faqs
-- ---------------------------------------------------------------------------
INSERT INTO faqs (id, question, answer_html, category, order_index, is_published)
VALUES
  (
    'a4000001-0000-0000-0000-000000000001',
    'What is CueDeck?',
    '<p>CueDeck is a real-time production console designed for conference directors and their AV teams. It replaces radio chatter, shared spreadsheets, and manual cue cards with a single live dashboard that keeps every operator — on stage, in the AV booth, at registration — in perfect sync.</p>',
    'general',
    0,
    true
  ),
  (
    'a4000001-0000-0000-0000-000000000002',
    'How many events can I manage simultaneously?',
    '<p>On the Starter plan you can run up to 3 active events per month. Pro users have no limit and can manage multiple concurrent events across different venues from the same account. Enterprise plans include dedicated infrastructure for extremely high-volume operations.</p>',
    'general',
    1,
    true
  ),
  (
    'a4000001-0000-0000-0000-000000000003',
    'Can I cancel anytime?',
    '<p>Yes. There are no long-term contracts. You can cancel your subscription at any time from your account settings and you will retain access until the end of your current billing period. We do not charge cancellation fees.</p>',
    'billing',
    2,
    true
  ),
  (
    'a4000001-0000-0000-0000-000000000004',
    'Do you offer refunds?',
    '<p>We offer a full refund within 14 days of your first payment if CueDeck does not meet your needs. After that period, refunds are evaluated on a case-by-case basis. Contact <a href="mailto:hello@cuedeck.io">hello@cuedeck.io</a> and our team will help.</p>',
    'billing',
    3,
    true
  ),
  (
    'a4000001-0000-0000-0000-000000000005',
    'What browsers does CueDeck support?',
    '<p>CueDeck works in any modern browser: Chrome 110+, Firefox 115+, Safari 16.4+, and Edge 110+. We recommend Chrome for the best real-time performance. The console requires JavaScript and a stable internet connection. Mobile browsers are supported for read-only operator views.</p>',
    'technical',
    4,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  question     = EXCLUDED.question,
  answer_html  = EXCLUDED.answer_html,
  category     = EXCLUDED.category,
  order_index  = EXCLUDED.order_index,
  is_published = EXCLUDED.is_published;

-- ---------------------------------------------------------------------------
-- changelog_items
-- ---------------------------------------------------------------------------
INSERT INTO changelog_items (id, version, title, description_json, type, published_at)
VALUES
  (
    'a5000001-0000-0000-0000-000000000001',
    'v2.5.0',
    'Stage Timer & AI Agents',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Introduces the Stage Timer display mode — a speaker-facing fullscreen countdown with HOLD freeze, colour-coded urgency, progress bar, and OVERRUN flash. Also ships three AI Agent modules: Incident Advisor, Cue Engine, and Report Generator."}]}]}'::jsonb,
    'new',
    now() - interval '7 days'
  ),
  (
    'a5000001-0000-0000-0000-000000000002',
    'v2.4.0',
    'Digital Signage Sequences',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Display operators can now define content sequences — ordered playlists of display modes that cycle automatically. Supports per-display dwell times and manual override. Also adds scroll and paginate display styles for timeline and programme modes."}]}]}'::jsonb,
    'new',
    now() - interval '60 days'
  ),
  (
    'a5000001-0000-0000-0000-000000000003',
    'v2.3.1',
    'Performance improvements and bug fixes',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Reduces initial load time by 40% through lazy-loading of agent modules. Fixes a race condition in the delay cascade that could produce incorrect session times when two operators applied delays within the same second."}]}]}'::jsonb,
    'fixed',
    now() - interval '90 days'
  )
ON CONFLICT (id) DO UPDATE SET
  version          = EXCLUDED.version,
  title            = EXCLUDED.title,
  description_json = EXCLUDED.description_json,
  type             = EXCLUDED.type,
  published_at     = EXCLUDED.published_at;

-- ---------------------------------------------------------------------------
-- site_settings
-- ---------------------------------------------------------------------------
INSERT INTO site_settings (key, value)
VALUES
  ('site_name',          '"CueDeck"'::jsonb),
  ('site_url',           '"https://www.cuedeck.io"'::jsonb),
  ('support_email',      '"hello@cuedeck.io"'::jsonb),
  ('analytics_enabled',  'true'::jsonb),
  ('maintenance_mode',   'false'::jsonb)
ON CONFLICT (key) DO UPDATE SET
  value      = EXCLUDED.value,
  updated_at = now();

-- ---------------------------------------------------------------------------
-- audit_log (sample entries — user_id is NULL since no real auth users)
-- ---------------------------------------------------------------------------
INSERT INTO audit_log (id, user_id, action, entity_type, entity_id, diff_json, created_at)
VALUES
  (
    'a6000001-0000-0000-0000-000000000001',
    NULL,
    'published',
    'blog_post',
    'e0000001-0000-0000-0000-000000000004',
    '{"status":{"from":"draft","to":"published"}}'::jsonb,
    now() - interval '7 days'
  ),
  (
    'a6000001-0000-0000-0000-000000000002',
    NULL,
    'created',
    'page',
    'b0000001-0000-0000-0000-000000000003',
    '{"slug":"about","status":"draft"}'::jsonb,
    now() - interval '30 days'
  ),
  (
    'a6000001-0000-0000-0000-000000000003',
    NULL,
    'updated',
    'site_settings',
    NULL,
    '{"key":"maintenance_mode","value":{"from":true,"to":false}}'::jsonb,
    now() - interval '2 days'
  )
ON CONFLICT (id) DO NOTHING;
