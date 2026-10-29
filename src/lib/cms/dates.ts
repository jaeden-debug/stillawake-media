import type { CmsPublishedContent } from "@/lib/cms/types";

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Publication dates for a CMS item, for bylines, Article JSON-LD and the
 * sitemap.
 *
 * `published_at` is stamped on every publish, including a republish that
 * changed nothing, so it is not a modification date. Reading it as one moved
 * `dateModified` and sitemap `lastmod` each time a post was republished, which
 * is the same fake-freshness signal the hand-kept sitemap dates exist to
 * avoid. A modification is therefore only claimed when the writer records one
 * explicitly in `snapshot.data.updated` (YYYY-MM-DD), the CMS twin of the
 * markdown `updated` frontmatter.
 */
export function cmsContentDates(item: CmsPublishedContent): { published: string; modified?: string } {
  const published = (item.first_published_at ?? item.publish_at ?? item.published_at ?? "").slice(0, 10);
  const raw = item.snapshot?.data?.updated;
  const updated = typeof raw === "string" && ISO_DAY.test(raw) ? raw : undefined;
  return {
    published,
    ...(updated && updated > published ? { modified: updated } : {}),
  };
}
