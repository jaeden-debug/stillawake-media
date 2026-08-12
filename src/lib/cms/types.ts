/**
 * Types for the published CMS surface exposed by Supabase.
 *
 * The database (project qzyzdpjvrecplkenrxhe) exposes ONLY the `cms_public_*`
 * views to the publishable key — base tables are deny-all. Everything this
 * site reads flows through these shapes; the writer lives in the .dev repo.
 */

export type CmsLocale = "en" | "fr";

export type CmsContentType =
  | "article"
  | "case_study"
  | "service"
  | "location"
  | "comparison"
  | "standard_page"
  | "content_layer";

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

type SectionBase = { id: string; v: number };

export type ImageAttribution = {
  provider: string;
  sourceUrl?: string;
  photographerName?: string;
  photographerUrl?: string;
};

export type ImageItem = {
  url: string;
  alt: string;
  caption?: string;
  attribution?: ImageAttribution;
};

export type RichtextSection = SectionBase & { type: "richtext"; html: string };
export type DirectAnswerSection = SectionBase & {
  type: "direct_answer";
  question?: string;
  answer: string;
};
export type KeyTakeawaysSection = SectionBase & {
  type: "key_takeaways";
  heading?: string;
  items: string[];
};
export type ImageSection = SectionBase & { type: "image" } & ImageItem;
export type GallerySection = SectionBase & { type: "gallery"; items: ImageItem[] };
export type StatsSection = SectionBase & {
  type: "stats";
  heading?: string;
  items: { value: string; label: string; note?: string }[];
};
export type FeatureListSection = SectionBase & {
  type: "feature_list";
  heading?: string;
  items: { title: string; body?: string }[];
};
export type StepsSection = SectionBase & {
  type: "steps";
  heading?: string;
  items: { title: string; body?: string }[];
};
export type FaqSection = SectionBase & {
  type: "faq";
  items: { q: string; a: string }[];
};
export type ComparisonTableSection = SectionBase & {
  type: "comparison_table";
  caption?: string;
  columns: string[];
  rows: string[][];
};
export type QuoteSection = SectionBase & {
  type: "quote";
  text: string;
  cite?: string;
  role?: string;
};
export type CtaSection = SectionBase & {
  type: "cta";
  heading?: string;
  body?: string;
  label: string;
  href: string;
};
export type CaseStudyProofSection = SectionBase & {
  type: "case_study_proof";
  metric: string;
  label: string;
  evidence?: string;
};
export type SourcesSection = SectionBase & { type: "sources"; heading?: string };
export type RelatedContentSection = SectionBase & {
  type: "related_content";
  heading?: string;
  limit?: number;
};
export type CodeSection = SectionBase & {
  type: "code";
  language?: string;
  code: string;
};

export type CmsSection =
  | RichtextSection
  | DirectAnswerSection
  | KeyTakeawaysSection
  | ImageSection
  | GallerySection
  | StatsSection
  | FeatureListSection
  | StepsSection
  | FaqSection
  | ComparisonTableSection
  | QuoteSection
  | CtaSection
  | CaseStudyProofSection
  | SourcesSection
  | RelatedContentSection
  | CodeSection;

/* ------------------------------------------------------------------ */
/* Rows                                                                */
/* ------------------------------------------------------------------ */

export type CmsSeo = {
  title?: string;
  description?: string;
  noindex?: boolean;
  ogImage?: string;
};

export type CmsSnapshot = {
  title: string;
  excerpt: string | null;
  sections: CmsSection[];
  seo: CmsSeo | null;
  data: Record<string, unknown> | null;
  author_id: string | null;
  featured_media_id: string | null;
  slug: string;
  route_path: string;
};

export type CmsPublishedContent = {
  id: string;
  type: CmsContentType;
  locale: CmsLocale;
  translation_group_id: string | null;
  slug: string;
  route_path: string | null;
  author_id: string | null;
  featured_media_id: string | null;
  snapshot: CmsSnapshot;
  section_schema_version: number | null;
  publish_at: string | null;
  unpublish_at: string | null;
  first_published_at: string | null;
  published_at: string | null;
  last_reviewed_at: string | null;
};

export type CmsAuthor = {
  id: string;
  slug: string | null;
  name: string;
  job_title: string | null;
  person_id: string | null;
  profile_url: string | null;
  photo_url: string | null;
  same_as: string[] | null;
  knows_about: string[] | null;
  bio: string | null;
};

export type CmsMedia = {
  id: string;
  provider: string | null;
  url: string;
  optimized_url: string | null;
  width: number | null;
  height: number | null;
  blur_data_url: string | null;
  dominant_color: string | null;
  alt: string | null;
  caption: string | null;
  title: string | null;
  source_url: string | null;
  photographer_name: string | null;
  photographer_url: string | null;
};

export type CmsSource = {
  id: string;
  content_id: string;
  sort: number | null;
  title: string;
  publisher: string | null;
  url: string | null;
  source_type: string | null;
  accessed_at: string | null;
};

export type CmsRedirect = {
  from_path: string;
  to_path: string;
  status_code: number | null;
};

/** Shape returned by the .dev repo's draft-content endpoint (guarded preview). */
export type CmsDraftItem = {
  id: string;
  type: CmsContentType;
  locale: CmsLocale;
  slug: string;
  route_path: string | null;
  title: string;
  excerpt: string | null;
  sections: CmsSection[];
  seo: CmsSeo | null;
  data: Record<string, unknown> | null;
  author_id: string | null;
  featured_media_id: string | null;
  translation_group_id: string | null;
};
