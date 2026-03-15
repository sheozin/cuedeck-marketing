// CueDeck CMS — TypeScript Types

export type CmsRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

export type PageStatus = 'draft' | 'published' | 'archived';
export type PostStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type ChangelogType = 'new' | 'improved' | 'fixed' | 'deprecated';

export interface CmsUser {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: CmsRole;
  last_active_at: string;
  created_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  status: PageStatus;
  published_at: string | null;
  created_by: string | null;
  updated_at: string;
  created_at: string;
}

export interface PageSection {
  id: string;
  page_id: string;
  section_type: string;
  order_index: number;
  content_json: Record<string, unknown>;
  is_visible: boolean;
  updated_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_json: Record<string, unknown>;
  cover_image: string | null;
  author_id: string | null;
  tags: string[];
  status: PostStatus;
  published_at: string | null;
  read_time_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  file_type: string;
  file_size_kb: number;
  width: number | null;
  height: number | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  company: string | null;
  avatar_url: string | null;
  quote: string;
  rating: number;
  is_featured: boolean;
  order_index: number;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_annual: number;
  features_json: string[];
  cta_label: string;
  cta_url: string;
  is_highlighted: boolean;
  is_active: boolean;
  order_index: number;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  category: string;
  order_index: number;
  is_visible: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  order_index: number;
  is_visible: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer_html: string;
  category: string;
  order_index: number;
  is_published: boolean;
}

export interface ChangelogItem {
  id: string;
  version: string;
  title: string;
  description_json: Record<string, unknown>;
  type: ChangelogType;
  published_at: string;
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  diff_json: Record<string, unknown> | null;
  created_at: string;
  // joined
  user?: Pick<CmsUser, 'email' | 'full_name' | 'avatar_url'>;
}

export interface SiteSetting {
  key: string;
  value: unknown;
  updated_by: string | null;
  updated_at: string;
}

export interface Redirect {
  id: string;
  from_path: string;
  to_path: string;
  status_code: number;
  is_active: boolean;
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  publishedPages: number;
  blogPostsThisMonth: number;
  totalMediaAssets: number;
  recentActivity: AuditLogEntry[];
}
