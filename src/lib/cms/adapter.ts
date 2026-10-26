import { unstable_cache } from "next/cache";
import { getCmsClient } from "./client";
import type {
  CmsAuthor,
  CmsContentType,
  CmsLocale,
  CmsMedia,
  CmsPublishedContent,
  CmsRedirect,
  CmsSource,
} from "./types";

/**
 * The ONLY module pages query the CMS through.
 *
 * Every read is wrapped in unstable_cache (revalidate 300s) and tagged so the
 * .dev writer's revalidate webhook can invalidate precisely. Every raw query
 * is wrapped in try/catch: Supabase downtime (or a build machine with no
 * network/env) degrades to null/[] with a loud log — pages fall back to the
 * file-based content where a dual-read exists, and ISR fills in at runtime.
 */

const REVALIDATE = 300;

/** Publish/unpublish windows are enforced client-side as defence in depth —
 *  the views are expected to filter, but a cached row must never outlive its
 *  window silently. */
function isLive(row: Pick<CmsPublishedContent, "publish_at" | "unpublish_at">): boolean {
  const now = Date.now();
  if (row.publish_at && Date.parse(row.publish_at) > now) return false;
  if (row.unpublish_at && Date.parse(row.unpublish_at) <= now) return false;
  return true;
}

function logCmsError(context: string, err: unknown) {
  console.error(`[cms] ${context}:`, err instanceof Error ? err.message : err);
}

/* ------------------------------------------------------------------ */
/* Raw (uncached) queries                                              */
/* ------------------------------------------------------------------ */

async function queryByRoute(routePath: string): Promise<CmsPublishedContent | null> {
  const db = getCmsClient();
  if (!db) return null;
  try {
    const { data, error } = await db
      .from("cms_public_content")
      .select("*")
      .eq("route_path", routePath)
      .limit(1);
    if (error) throw error;
    const row = (data?.[0] as CmsPublishedContent | undefined) ?? null;
    return row && isLive(row) ? row : null;
  } catch (err) {
    logCmsError(`getPublishedByRoute(${routePath}) failed`, err);
    return null;
  }
}

async function queryArticles(locale: CmsLocale): Promise<CmsPublishedContent[]> {
  const db = getCmsClient();
  if (!db) return [];
  try {
    const { data, error } = await db
      .from("cms_public_content")
      .select("*")
      .eq("type", "article")
      .eq("locale", locale)
      .order("publish_at", { ascending: false });
    if (error) throw error;
    return ((data ?? []) as CmsPublishedContent[]).filter(isLive);
  } catch (err) {
    logCmsError(`getPublishedArticles(${locale}) failed`, err);
    return [];
  }
}

/**
 * Products for the hub, ordered by the editor-controlled `data.sort`.
 *
 * Sort lives in the published snapshot, so reordering in the CMS only moves
 * cards once the change is published — same trust boundary as any other edit.
 * Rows missing a sort fall to the end rather than colliding at 0.
 */
async function queryProducts(locale: CmsLocale): Promise<CmsPublishedContent[]> {
  const db = getCmsClient();
  if (!db) return [];
  try {
    const { data, error } = await db
      .from("cms_public_content")
      .select("*")
      .eq("type", "product")
      .eq("locale", locale);
    if (error) throw error;
    const rows = ((data ?? []) as CmsPublishedContent[]).filter(isLive);
    return rows.sort((a, b) => {
      const sortOf = (r: CmsPublishedContent) => {
        const v = (r.snapshot?.data as { sort?: unknown } | null)?.sort;
        return typeof v === "number" && Number.isFinite(v) ? v : Number.MAX_SAFE_INTEGER;
      };
      const delta = sortOf(a) - sortOf(b);
      if (delta !== 0) return delta;
      // Stable tiebreak so duplicate sort values can't shuffle between renders.
      return (a.snapshot?.title ?? "").localeCompare(b.snapshot?.title ?? "");
    });
  } catch (err) {
    logCmsError(`getPublishedProducts(${locale}) failed`, err);
    return [];
  }
}

async function queryByTypeSlug(
  type: CmsContentType,
  locale: CmsLocale,
  slug: string,
): Promise<CmsPublishedContent | null> {
  const db = getCmsClient();
  if (!db) return null;
  try {
    const { data, error } = await db
      .from("cms_public_content")
      .select("*")
      .eq("type", type)
      .eq("locale", locale)
      .eq("slug", slug)
      .limit(1);
    if (error) throw error;
    const row = (data?.[0] as CmsPublishedContent | undefined) ?? null;
    return row && isLive(row) ? row : null;
  } catch (err) {
    logCmsError(`getPublishedByTypeSlug(${type}, ${locale}, ${slug}) failed`, err);
    return null;
  }
}

/**
 * Route map for the bespoke code-owned pages that accept a CMS content layer
 * (§75–76). Mirrors CONTENT_LAYER_ROUTES in the .dev repo's src/cms/registry.ts
 * — keep the two in sync by hand; the layer rows carry route_path set to these
 * exact values.
 */
const CONTENT_LAYER_ROUTES: Record<string, Record<CmsLocale, string>> = {
  home: { en: "/", fr: "/fr" },
  about: { en: "/about", fr: "/fr/a-propos" },
  founder: { en: "/founder/jaeden-doody", fr: "/fr/fondateur/jaeden-doody" },
  pricing: { en: "/pricing", fr: "/fr/tarifs" },
  contact: { en: "/contact", fr: "/fr/contact" },
};

async function queryContentLayer(
  layerKey: string,
  locale: CmsLocale,
): Promise<Record<string, string> | null> {
  const routePath = CONTENT_LAYER_ROUTES[layerKey]?.[locale];
  if (!routePath) return null;
  const db = getCmsClient();
  if (!db) return null;
  try {
    const { data, error } = await db
      .from("cms_public_content")
      .select("*")
      .eq("type", "content_layer")
      .eq("route_path", routePath)
      .limit(1);
    if (error) throw error;
    const row = (data?.[0] as CmsPublishedContent | undefined) ?? null;
    if (!row || !isLive(row)) return null;
    const slots = (row.snapshot?.data as { slots?: Record<string, string> } | null)?.slots;
    return slots && typeof slots === "object" ? slots : null;
  } catch (err) {
    logCmsError(`getContentLayer(${layerKey}, ${locale}) failed`, err);
    return null;
  }
}

async function queryAuthor(id: string): Promise<CmsAuthor | null> {
  const db = getCmsClient();
  if (!db) return null;
  try {
    const { data, error } = await db
      .from("cms_public_authors")
      .select("*")
      .eq("id", id)
      .limit(1);
    if (error) throw error;
    return ((data?.[0] as CmsAuthor | undefined) ?? null);
  } catch (err) {
    logCmsError(`getAuthor(${id}) failed`, err);
    return null;
  }
}

async function queryMediaByIds(ids: string[]): Promise<CmsMedia[]> {
  if (ids.length === 0) return [];
  const db = getCmsClient();
  if (!db) return [];
  try {
    const { data, error } = await db.from("cms_public_media").select("*").in("id", ids);
    if (error) throw error;
    return (data ?? []) as CmsMedia[];
  } catch (err) {
    logCmsError(`getMediaByIds(${ids.join(",")}) failed`, err);
    return [];
  }
}

async function querySourcesFor(contentId: string): Promise<CmsSource[]> {
  const db = getCmsClient();
  if (!db) return [];
  try {
    const { data, error } = await db
      .from("cms_public_sources")
      .select("*")
      .eq("content_id", contentId)
      .order("sort", { ascending: true });
    if (error) throw error;
    return (data ?? []) as CmsSource[];
  } catch (err) {
    logCmsError(`getSourcesFor(${contentId}) failed`, err);
    return [];
  }
}

/**
 * Relation column names are not part of the published contract yet, so the
 * join is defensive: probe the common from/to shapes and take whichever side
 * points away from this content. Errors degrade to [].
 */
async function queryRelatedFor(contentId: string, limit: number): Promise<CmsPublishedContent[]> {
  const db = getCmsClient();
  if (!db) return [];
  try {
    const { data, error } = await db.from("cms_public_relations").select("*");
    if (error) throw error;
    const relatedIds: string[] = [];
    for (const raw of (data ?? []) as Record<string, unknown>[]) {
      const from = (raw.from_id ?? raw.from_content_id ?? raw.content_id ?? raw.source_content_id) as
        | string
        | undefined;
      const to = (raw.to_id ?? raw.to_content_id ?? raw.related_content_id ?? raw.target_content_id) as
        | string
        | undefined;
      if (from === contentId && to && to !== contentId) relatedIds.push(to);
      else if (to === contentId && from && from !== contentId) relatedIds.push(from);
    }
    if (relatedIds.length === 0) return [];
    const { data: content, error: contentError } = await db
      .from("cms_public_content")
      .select("*")
      .in("id", Array.from(new Set(relatedIds)));
    if (contentError) throw contentError;
    return ((content ?? []) as CmsPublishedContent[]).filter(isLive).slice(0, limit);
  } catch (err) {
    logCmsError(`getRelatedFor(${contentId}) failed`, err);
    return [];
  }
}

async function querySiblingOf(
  translationGroupId: string,
  locale: CmsLocale,
): Promise<CmsPublishedContent | null> {
  const db = getCmsClient();
  if (!db) return null;
  try {
    const { data, error } = await db
      .from("cms_public_content")
      .select("*")
      .eq("translation_group_id", translationGroupId)
      .eq("locale", locale)
      .limit(1);
    if (error) throw error;
    const row = (data?.[0] as CmsPublishedContent | undefined) ?? null;
    return row && isLive(row) ? row : null;
  } catch (err) {
    logCmsError(`getSiblingOf(${translationGroupId}, ${locale}) failed`, err);
    return null;
  }
}

async function queryRedirects(): Promise<CmsRedirect[]> {
  const db = getCmsClient();
  if (!db) return [];
  try {
    const { data, error } = await db.from("cms_public_redirects").select("*");
    if (error) throw error;
    return (data ?? []) as CmsRedirect[];
  } catch (err) {
    logCmsError("getRedirects failed", err);
    return [];
  }
}

async function queryAllPublished(): Promise<CmsPublishedContent[]> {
  const db = getCmsClient();
  if (!db) return [];
  try {
    const { data, error } = await db.from("cms_public_content").select("*");
    if (error) throw error;
    return ((data ?? []) as CmsPublishedContent[]).filter(isLive);
  } catch (err) {
    logCmsError("getAllPublishedForSitemap failed", err);
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Cached public API                                                   */
/* ------------------------------------------------------------------ */

export function getPublishedByRoute(routePath: string): Promise<CmsPublishedContent | null> {
  return unstable_cache(() => queryByRoute(routePath), ["cms-by-route", routePath], {
    revalidate: REVALIDATE,
    tags: ["cms-content", `cms-route-${routePath}`],
  })();
}

/**
 * Cached-miss lesson: a cached null for a route MUST be confirmed with a
 * direct uncached query before any caller 404s — otherwise a transient
 * Supabase failure gets frozen into the cache as "this page does not exist"
 * for the whole revalidate window.
 */
export async function getPublishedByRouteConfirmed(
  routePath: string,
): Promise<CmsPublishedContent | null> {
  const cachedResult = await getPublishedByRoute(routePath);
  if (cachedResult) return cachedResult;
  return queryByRoute(routePath);
}

export function getPublishedArticles(locale: CmsLocale): Promise<CmsPublishedContent[]> {
  return unstable_cache(() => queryArticles(locale), ["cms-articles", locale], {
    revalidate: REVALIDATE,
    tags: ["cms-content", "cms-article"],
  })();
}

export function getPublishedProducts(locale: CmsLocale): Promise<CmsPublishedContent[]> {
  return unstable_cache(() => queryProducts(locale), ["cms-products", locale], {
    revalidate: REVALIDATE,
    tags: ["cms-content", "cms-product"],
  })();
}

export function getPublishedByTypeSlug(
  type: CmsContentType,
  locale: CmsLocale,
  slug: string,
): Promise<CmsPublishedContent | null> {
  return unstable_cache(
    () => queryByTypeSlug(type, locale, slug),
    ["cms-by-type-slug", type, locale, slug],
    { revalidate: REVALIDATE, tags: ["cms-content", `cms-${type}-${locale}-${slug}`] },
  )();
}

/** Companion to getPublishedByRouteConfirmed for the slug-addressed pages. */
export async function getPublishedByTypeSlugConfirmed(
  type: CmsContentType,
  locale: CmsLocale,
  slug: string,
): Promise<CmsPublishedContent | null> {
  const cachedResult = await getPublishedByTypeSlug(type, locale, slug);
  if (cachedResult) return cachedResult;
  return queryByTypeSlug(type, locale, slug);
}

/**
 * Published slots for a code-owned page's content layer, or null when no layer
 * is published (pages then render their code literals via slot() fallbacks).
 */
export function getContentLayer(
  layerKey: string,
  locale: CmsLocale,
): Promise<Record<string, string> | null> {
  return unstable_cache(
    () => queryContentLayer(layerKey, locale),
    ["cms-layer", layerKey, locale],
    { revalidate: REVALIDATE, tags: ["cms-content", `cms-layer-${layerKey}-${locale}`] },
  )();
}

export function getAuthor(id: string): Promise<CmsAuthor | null> {
  return unstable_cache(() => queryAuthor(id), ["cms-author", id], {
    revalidate: REVALIDATE,
    tags: ["cms-content"],
  })();
}

export function getMediaByIds(ids: string[]): Promise<CmsMedia[]> {
  const sorted = [...ids].sort();
  return unstable_cache(() => queryMediaByIds(sorted), ["cms-media", ...sorted], {
    revalidate: REVALIDATE,
    tags: ["cms-content"],
  })();
}

export function getSourcesFor(contentId: string): Promise<CmsSource[]> {
  return unstable_cache(() => querySourcesFor(contentId), ["cms-sources", contentId], {
    revalidate: REVALIDATE,
    tags: ["cms-content"],
  })();
}

export function getRelatedFor(contentId: string, limit = 4): Promise<CmsPublishedContent[]> {
  return unstable_cache(
    () => queryRelatedFor(contentId, limit),
    ["cms-related", contentId, String(limit)],
    { revalidate: REVALIDATE, tags: ["cms-content"] },
  )();
}

export function getSiblingOf(
  translationGroupId: string,
  locale: CmsLocale,
): Promise<CmsPublishedContent | null> {
  return unstable_cache(
    () => querySiblingOf(translationGroupId, locale),
    ["cms-sibling", translationGroupId, locale],
    { revalidate: REVALIDATE, tags: ["cms-content"] },
  )();
}

export function getRedirects(): Promise<CmsRedirect[]> {
  return unstable_cache(queryRedirects, ["cms-redirects"], {
    revalidate: REVALIDATE,
    tags: ["cms-redirects"],
  })();
}

/**
 * Redirect lookup for file routes that own a URL namespace (e.g. the article
 * [slug] routes) — the last-resort catch-all never sees their misses, so they
 * must consult the table themselves before 404ing. Cached under the same
 * cms-redirects tag the publish webhook invalidates.
 */
export async function redirectFor(path: string): Promise<CmsRedirect | null> {
  const all = await getRedirects();
  return all.find((r) => r.from_path === path) ?? null;
}

export function getAllPublishedForSitemap(): Promise<CmsPublishedContent[]> {
  return unstable_cache(queryAllPublished, ["cms-all-published"], {
    revalidate: REVALIDATE,
    tags: ["cms-content"],
  })();
}
