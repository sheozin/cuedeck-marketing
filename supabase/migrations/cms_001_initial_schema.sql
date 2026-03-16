-- =============================================================================
-- Idempotency: drop all policies and triggers before recreating
-- =============================================================================
DROP POLICY IF EXISTS "cms_users: self read" ON cms_users;
DROP POLICY IF EXISTS "cms_users: admin read all" ON cms_users;
DROP POLICY IF EXISTS "cms_users: self update" ON cms_users;
DROP POLICY IF EXISTS "pages: authenticated read" ON pages;
DROP POLICY IF EXISTS "pages: editor insert" ON pages;
DROP POLICY IF EXISTS "pages: editor update" ON pages;
DROP POLICY IF EXISTS "pages: editor delete" ON pages;
DROP POLICY IF EXISTS "page_sections: authenticated read" ON page_sections;
DROP POLICY IF EXISTS "page_sections: editor insert" ON page_sections;
DROP POLICY IF EXISTS "page_sections: editor update" ON page_sections;
DROP POLICY IF EXISTS "page_sections: editor delete" ON page_sections;
DROP POLICY IF EXISTS "blog_posts: authenticated read" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts: editor insert" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts: editor update" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts: editor delete" ON blog_posts;
DROP POLICY IF EXISTS "blog_tags: authenticated read" ON blog_tags;
DROP POLICY IF EXISTS "blog_tags: editor insert" ON blog_tags;
DROP POLICY IF EXISTS "blog_tags: editor update" ON blog_tags;
DROP POLICY IF EXISTS "blog_tags: editor delete" ON blog_tags;
DROP POLICY IF EXISTS "media_assets: authenticated read" ON media_assets;
DROP POLICY IF EXISTS "media_assets: editor insert" ON media_assets;
DROP POLICY IF EXISTS "media_assets: editor update" ON media_assets;
DROP POLICY IF EXISTS "media_assets: editor delete" ON media_assets;
DROP POLICY IF EXISTS "testimonials: authenticated read" ON testimonials;
DROP POLICY IF EXISTS "testimonials: editor insert" ON testimonials;
DROP POLICY IF EXISTS "testimonials: editor update" ON testimonials;
DROP POLICY IF EXISTS "testimonials: editor delete" ON testimonials;
DROP POLICY IF EXISTS "pricing_plans: authenticated read" ON pricing_plans;
DROP POLICY IF EXISTS "pricing_plans: editor insert" ON pricing_plans;
DROP POLICY IF EXISTS "pricing_plans: editor update" ON pricing_plans;
DROP POLICY IF EXISTS "pricing_plans: editor delete" ON pricing_plans;
DROP POLICY IF EXISTS "feature_cards: authenticated read" ON feature_cards;
DROP POLICY IF EXISTS "feature_cards: editor insert" ON feature_cards;
DROP POLICY IF EXISTS "feature_cards: editor update" ON feature_cards;
DROP POLICY IF EXISTS "feature_cards: editor delete" ON feature_cards;
DROP POLICY IF EXISTS "team_members: authenticated read" ON team_members;
DROP POLICY IF EXISTS "team_members: editor insert" ON team_members;
DROP POLICY IF EXISTS "team_members: editor update" ON team_members;
DROP POLICY IF EXISTS "team_members: editor delete" ON team_members;
DROP POLICY IF EXISTS "faqs: authenticated read" ON faqs;
DROP POLICY IF EXISTS "faqs: editor insert" ON faqs;
DROP POLICY IF EXISTS "faqs: editor update" ON faqs;
DROP POLICY IF EXISTS "faqs: editor delete" ON faqs;
DROP POLICY IF EXISTS "changelog_items: authenticated read" ON changelog_items;
DROP POLICY IF EXISTS "changelog_items: editor insert" ON changelog_items;
DROP POLICY IF EXISTS "changelog_items: editor update" ON changelog_items;
DROP POLICY IF EXISTS "changelog_items: editor delete" ON changelog_items;
DROP POLICY IF EXISTS "site_settings: authenticated read" ON site_settings;
DROP POLICY IF EXISTS "site_settings: editor insert" ON site_settings;
DROP POLICY IF EXISTS "site_settings: editor update" ON site_settings;
DROP POLICY IF EXISTS "site_settings: editor delete" ON site_settings;
DROP POLICY IF EXISTS "redirects: authenticated read" ON redirects;
DROP POLICY IF EXISTS "redirects: editor insert" ON redirects;
DROP POLICY IF EXISTS "redirects: editor update" ON redirects;
DROP POLICY IF EXISTS "redirects: editor delete" ON redirects;
DROP POLICY IF EXISTS "audit_log: admin read" ON audit_log;
DROP POLICY IF EXISTS "audit_log: authenticated insert" ON audit_log;
DROP TRIGGER IF EXISTS pages_updated_at ON pages;
DROP TRIGGER IF EXISTS page_sections_updated_at ON page_sections;
DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS site_settings_updated_at ON site_settings;

-- =============================================================================
-- CueDeck CMS — Initial Schema
-- Migration: cms_001_initial_schema.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Helper: get_cms_role()
-- Returns the CMS role of the currently authenticated user.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_cms_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM cms_users WHERE id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- Table: cms_users
-- Maps auth.users to CMS roles.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cms_users (
  id             UUID        PRIMARY KEY REFERENCES auth.users(id),
  email          TEXT        NOT NULL,
  full_name      TEXT,
  avatar_url     TEXT,
  role           TEXT        NOT NULL DEFAULT 'viewer'
                             CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer')),
  last_active_at TIMESTAMPTZ DEFAULT now(),
  created_at     TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own row
CREATE POLICY "cms_users: self read"
  ON cms_users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- super_admin and admin can read all rows
CREATE POLICY "cms_users: admin read all"
  ON cms_users FOR SELECT
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin'));

-- Users can update their own non-sensitive fields
CREATE POLICY "cms_users: self update"
  ON cms_users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ---------------------------------------------------------------------------
-- Table: pages
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pages (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT        NOT NULL UNIQUE,
  title            TEXT        NOT NULL,
  meta_title       TEXT,
  meta_description TEXT,
  og_image         TEXT,
  status           TEXT        NOT NULL DEFAULT 'draft'
                               CHECK (status IN ('draft', 'published', 'archived')),
  published_at     TIMESTAMPTZ,
  created_by       UUID        REFERENCES auth.users(id),
  updated_at       TIMESTAMPTZ DEFAULT now(),
  created_at       TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pages: authenticated read"
  ON pages FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "pages: editor insert"
  ON pages FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "pages: editor update"
  ON pages FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "pages: editor delete"
  ON pages FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: page_sections
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS page_sections (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id      UUID    NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  section_type TEXT    NOT NULL,
  order_index  INTEGER NOT NULL DEFAULT 0,
  content_json JSONB   NOT NULL DEFAULT '{}',
  is_visible   BOOLEAN NOT NULL DEFAULT true,
  updated_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_sections: authenticated read"
  ON page_sections FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "page_sections: editor insert"
  ON page_sections FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "page_sections: editor update"
  ON page_sections FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "page_sections: editor delete"
  ON page_sections FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: blog_posts
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               TEXT        NOT NULL UNIQUE,
  title              TEXT        NOT NULL,
  excerpt            TEXT,
  content_json       JSONB       DEFAULT '{}',
  cover_image        TEXT,
  author_id          UUID        REFERENCES auth.users(id),
  tags               TEXT[]      DEFAULT '{}',
  status             TEXT        NOT NULL DEFAULT 'draft'
                                 CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at       TIMESTAMPTZ,
  read_time_minutes  INTEGER     DEFAULT 5,
  created_at         TIMESTAMPTZ DEFAULT now(),
  updated_at         TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_posts: authenticated read"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "blog_posts: editor insert"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "blog_posts: editor update"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "blog_posts: editor delete"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: blog_tags
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_tags (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT NOT NULL,
  slug  TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#3b82f6'
);

ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_tags: authenticated read"
  ON blog_tags FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "blog_tags: editor insert"
  ON blog_tags FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "blog_tags: editor update"
  ON blog_tags FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "blog_tags: editor delete"
  ON blog_tags FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: media_assets
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media_assets (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  filename     TEXT    NOT NULL,
  url          TEXT    NOT NULL,
  alt_text     TEXT,
  file_type    TEXT    NOT NULL DEFAULT 'image'
                       CHECK (file_type IN ('image', 'video', 'document')),
  file_size_kb INTEGER DEFAULT 0,
  width        INTEGER,
  height       INTEGER,
  uploaded_by  UUID    REFERENCES auth.users(id),
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "media_assets: authenticated read"
  ON media_assets FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "media_assets: editor insert"
  ON media_assets FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "media_assets: editor update"
  ON media_assets FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "media_assets: editor delete"
  ON media_assets FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: testimonials
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name  TEXT    NOT NULL,
  author_title TEXT,
  company      TEXT,
  avatar_url   TEXT,
  quote        TEXT    NOT NULL,
  rating       INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured  BOOLEAN DEFAULT false,
  order_index  INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials: authenticated read"
  ON testimonials FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "testimonials: editor insert"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "testimonials: editor update"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "testimonials: editor delete"
  ON testimonials FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: pricing_plans
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pricing_plans (
  id             UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT          NOT NULL,
  slug           TEXT          NOT NULL UNIQUE,
  price_monthly  NUMERIC(10,2) DEFAULT 0,
  price_annual   NUMERIC(10,2) DEFAULT 0,
  features_json  JSONB         DEFAULT '[]',
  cta_label      TEXT          DEFAULT 'Get started',
  cta_url        TEXT          DEFAULT '/signup',
  is_highlighted BOOLEAN       DEFAULT false,
  is_active      BOOLEAN       DEFAULT true,
  order_index    INTEGER       DEFAULT 0
);

ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pricing_plans: authenticated read"
  ON pricing_plans FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "pricing_plans: editor insert"
  ON pricing_plans FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "pricing_plans: editor update"
  ON pricing_plans FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "pricing_plans: editor delete"
  ON pricing_plans FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: feature_cards
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feature_cards (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT    NOT NULL,
  description TEXT    NOT NULL,
  icon_name   TEXT    DEFAULT 'Star',
  category    TEXT    DEFAULT 'general',
  order_index INTEGER DEFAULT 0,
  is_visible  BOOLEAN DEFAULT true
);

ALTER TABLE feature_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "feature_cards: authenticated read"
  ON feature_cards FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "feature_cards: editor insert"
  ON feature_cards FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "feature_cards: editor update"
  ON feature_cards FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "feature_cards: editor delete"
  ON feature_cards FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: team_members
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT    NOT NULL,
  role         TEXT    NOT NULL,
  bio          TEXT,
  photo_url    TEXT,
  linkedin_url TEXT,
  order_index  INTEGER DEFAULT 0,
  is_visible   BOOLEAN DEFAULT true
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "team_members: authenticated read"
  ON team_members FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "team_members: editor insert"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "team_members: editor update"
  ON team_members FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "team_members: editor delete"
  ON team_members FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: faqs
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
  id           UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  question     TEXT    NOT NULL,
  answer_html  TEXT    NOT NULL,
  category     TEXT    DEFAULT 'general',
  order_index  INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "faqs: authenticated read"
  ON faqs FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "faqs: editor insert"
  ON faqs FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "faqs: editor update"
  ON faqs FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "faqs: editor delete"
  ON faqs FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: changelog_items
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS changelog_items (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  version          TEXT        NOT NULL,
  title            TEXT        NOT NULL,
  description_json JSONB       DEFAULT '{}',
  type             TEXT        NOT NULL DEFAULT 'new'
                               CHECK (type IN ('new', 'improved', 'fixed', 'deprecated')),
  published_at     TIMESTAMPTZ DEFAULT now(),
  created_at       TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE changelog_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "changelog_items: authenticated read"
  ON changelog_items FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "changelog_items: editor insert"
  ON changelog_items FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "changelog_items: editor update"
  ON changelog_items FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "changelog_items: editor delete"
  ON changelog_items FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: site_settings
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL DEFAULT 'null',
  updated_by UUID  REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_settings: authenticated read"
  ON site_settings FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "site_settings: editor insert"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "site_settings: editor update"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "site_settings: editor delete"
  ON site_settings FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: redirects
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS redirects (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path   TEXT    NOT NULL,
  to_path     TEXT    NOT NULL,
  status_code INTEGER DEFAULT 301 CHECK (status_code IN (301, 302, 307)),
  is_active   BOOLEAN DEFAULT true
);

ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "redirects: authenticated read"
  ON redirects FOR SELECT
  TO authenticated
  USING (get_cms_role() IS NOT NULL);

CREATE POLICY "redirects: editor insert"
  ON redirects FOR INSERT
  TO authenticated
  WITH CHECK (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "redirects: editor update"
  ON redirects FOR UPDATE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

CREATE POLICY "redirects: editor delete"
  ON redirects FOR DELETE
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin', 'editor'));

-- ---------------------------------------------------------------------------
-- Table: audit_log
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id),
  action      TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id   UUID,
  diff_json   JSONB,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Only super_admin and admin can read audit logs
CREATE POLICY "audit_log: admin read"
  ON audit_log FOR SELECT
  TO authenticated
  USING (get_cms_role() IN ('super_admin', 'admin'));

-- Any authenticated CMS user can insert audit entries
CREATE POLICY "audit_log: authenticated insert"
  ON audit_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- Trigger: update_updated_at()
-- Auto-updates the updated_at column on modification.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply trigger to tables that have updated_at
CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- Storage bucket
--
-- ACTION REQUIRED: Manually create a storage bucket named 'cuedeck-media'
-- in the Supabase Dashboard → Storage → New bucket.
-- Set it as PUBLIC so uploaded media URLs are accessible without auth.
--
-- After creating the bucket, you can optionally add storage RLS policies
-- via the Dashboard or by running policies against the storage.objects table.
--
-- Example storage policies (run after bucket is created):
--
-- INSERT INTO storage.buckets (id, name, public) VALUES ('cuedeck-media', 'cuedeck-media', true)
-- ON CONFLICT (id) DO NOTHING;
--
-- CREATE POLICY "cuedeck-media: authenticated upload"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (
--     bucket_id = 'cuedeck-media'
--     AND get_cms_role() IN ('super_admin', 'admin', 'editor')
--   );
--
-- CREATE POLICY "cuedeck-media: public read"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'cuedeck-media');
--
-- CREATE POLICY "cuedeck-media: editor delete"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (
--     bucket_id = 'cuedeck-media'
--     AND get_cms_role() IN ('super_admin', 'admin', 'editor')
--   );
-- ---------------------------------------------------------------------------
