import type { Metadata } from "next";

/**
 * Page <title> branding.
 *
 * The root layouts used to add the brand with a static
 * `title.template: "%s | StillAwake Media"`. That suffix is 19 characters, and
 * on most long pages it was the only thing pushing the title past the ~60
 * characters search results show, so the SERP truncated the page's own words
 * to keep our name. Next's `title.template` is a plain string — it cannot
 * decide per page — so the rule lives here instead:
 *
 *   append " | StillAwake Media" only when the whole title stays within
 *   MAX_TITLE_LENGTH; otherwise emit the page title on its own.
 *
 * Every page that relies on the brand suffix routes its metadata through
 * `withPageTitle()` (or its title through `pageTitle()`), which always resolves
 * to `{ absolute }`, so the result no longer depends on the layout template.
 * The template stays in the root metadata only as a fallback for a page that
 * forgets the helper.
 *
 * Open Graph and Twitter titles are not length-limited the same way and are
 * where the brand matters for share cards, so `withPageTitle()` keeps the full
 * suffixed title there whenever the page did not set its own.
 */

export const BRAND_NAME = "StillAwake Media";
export const BRAND_SUFFIX = ` | ${BRAND_NAME}`;
/** Roughly what Google shows before truncating a title on desktop. */
export const MAX_TITLE_LENGTH = 60;

/** Characters, not UTF-16 code units — "é" and "—" count once. */
function length(text: string): number {
  return [...text].length;
}

/** The title with the brand suffix, regardless of length (for share cards). */
export function titleWithBrand(title: string): string {
  const trimmed = title.trim();
  return trimmed.includes(BRAND_NAME) ? trimmed : `${trimmed}${BRAND_SUFFIX}`;
}

/**
 * The text for the <title> tag: `title | StillAwake Media` when that fits in
 * MAX_TITLE_LENGTH characters, otherwise the page title alone. A title that
 * already names the brand is left as written.
 */
export function brandedTitle(title: string): string {
  const trimmed = title.trim();
  const full = titleWithBrand(trimmed);
  return length(full) <= MAX_TITLE_LENGTH ? full : trimmed;
}

/** `Metadata.title` for a page: always absolute, so no template is re-applied. */
export function pageTitle(title: string): Metadata["title"] {
  return { absolute: brandedTitle(title) };
}

/**
 * Applies the title rule to a page's metadata.
 *
 * - A plain string `title` becomes `{ absolute: brandedTitle(title) }`.
 * - `{ absolute }` and template objects are the page's explicit choice and
 *   pass through untouched.
 * - If the page declares `openGraph` without a title, Next would have filled
 *   og:title from the resolved <title> (which carried the brand). That title
 *   may now be unbranded, so og:title is set to the full branded title to keep
 *   the share card as it was. A twitter block without a title inherits it
 *   from Open Graph, as before.
 */
export function withPageTitle(metadata: Metadata): Metadata {
  const { title } = metadata;
  if (typeof title !== "string") return metadata;

  const result: Metadata = { ...metadata, title: pageTitle(title) };
  if (metadata.openGraph && !metadata.openGraph.title) {
    result.openGraph = { ...metadata.openGraph, title: titleWithBrand(title) };
  }
  return result;
}
