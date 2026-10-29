/**
 * SERP descriptions have a length budget. Page copy and article excerpts do not.
 *
 * A live crawl on 2026-10-29 found 192 of 338 URLs serving a meta description
 * over 155 characters — 35 of them over 250, the longest at 338. The cause was
 * structural rather than careless: article metadata reuses the CMS `excerpt`
 * (or `seo.description`), and the service pages reuse their intro copy. Those
 * strings are the right length where they are rendered and roughly double what
 * a SERP shows.
 *
 * Narrowing the metadata leaves the page, the excerpt and the JSON-LD intact.
 *
 * Cuts at a word boundary and appends nothing: an unfinished sentence reads as
 * a short description, where "...pour une boutique en lig" reads as a broken
 * page. Google truncates either way; this only decides where.
 *
 * Works for French as well as English — the boundary is whitespace, not a
 * language-specific rule — and it never splits a multi-byte character, because
 * it slices on a word boundary rather than a byte count.
 */

/** Google truncates on pixel width; 155 is the usual safe approximation. */
export const META_DESCRIPTION_MAX = 155;

export function metaDescription(text: string | null | undefined, max = META_DESCRIPTION_MAX): string {
  const t = (text ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const atSpace = cut.slice(0, cut.lastIndexOf(" "));
  // Guard against one pathological long word swallowing the whole budget.
  const body = atSpace.length > max * 0.6 ? atSpace : cut;
  return body.replace(/[\s,;:—–-]+$/, "");
}
