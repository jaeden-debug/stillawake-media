import { gameBundles, type GameBundle } from "@/data/games";
import type { MediaAsset, WikiCategory, WikiEntry } from "@/data/games/types";
import { siteUrl } from "@/lib/data";

/**
 * Read-side helpers for the games platform. Routes never reach into the data
 * files directly; they go through here, so "what is published" is decided in
 * exactly one place.
 */

export function allGames() {
  return gameBundles.map((b) => b.game);
}

export function getBundle(gameSlug: string): GameBundle | undefined {
  return gameBundles.find((b) => b.game.slug === gameSlug);
}

/** Only verified-live entries are ever routed, listed, searched or mapped. */
export function isPublished(entry: WikiEntry): boolean {
  return entry.verification === "verified_live";
}

export function publishedEntries(bundle: GameBundle): WikiEntry[] {
  return bundle.wiki.filter(isPublished);
}

export function unpublishedEntries(bundle: GameBundle): WikiEntry[] {
  return bundle.wiki.filter((e) => !isPublished(e));
}

export function getCategory(bundle: GameBundle, slug: string): WikiCategory | undefined {
  return bundle.categories.find((c) => c.slug === slug);
}

export function entriesInCategory(bundle: GameBundle, categoryId: string): WikiEntry[] {
  return publishedEntries(bundle).filter((e) => e.category === categoryId);
}

/** Categories that have at least one published entry. */
export function activeCategories(bundle: GameBundle): WikiCategory[] {
  return bundle.categories.filter((c) => entriesInCategory(bundle, c.id).length > 0);
}

export function getEntry(bundle: GameBundle, slug: string): WikiEntry | undefined {
  return publishedEntries(bundle).find((e) => e.slug === slug);
}

export function gamePath(gameSlug: string) {
  return `/games/${gameSlug}`;
}

export function wikiPath(gameSlug: string) {
  return `/games/${gameSlug}/wiki`;
}

export function categoryPath(gameSlug: string, categorySlug: string) {
  return `${wikiPath(gameSlug)}/${categorySlug}`;
}

export function entryPath(gameSlug: string, entry: Pick<WikiEntry, "category" | "slug">) {
  return `${wikiPath(gameSlug)}/${entry.category}/${entry.slug}`;
}

export function absolute(path: string) {
  return `${siteUrl}${path}`;
}

/**
 * Resolves an inline link target. `@slug` means another entry of the same
 * game; anything else is used as-is. An `@slug` that is not published
 * resolves to null and is rendered as plain text, so a page can never link to
 * a 404.
 */
export function resolveLink(bundle: GameBundle, target: string): string | null {
  if (!target.startsWith("@")) return target;
  const entry = getEntry(bundle, target.slice(1));
  return entry ? entryPath(bundle.game.slug, entry) : null;
}

export function relatedEntries(bundle: GameBundle, entry: WikiEntry): WikiEntry[] {
  const explicit = entry.related
    .map((slug) => getEntry(bundle, slug))
    .filter((e): e is WikiEntry => Boolean(e));
  if (explicit.length >= 3) return explicit;
  // Top up from the same category so every page has somewhere to go next.
  const extra = entriesInCategory(bundle, entry.category).filter(
    (e) => e.slug !== entry.slug && !explicit.includes(e),
  );
  return [...explicit, ...extra].slice(0, 4);
}

/** Entries that link to this one: the reverse of `related` and inline links. */
export function backlinks(bundle: GameBundle, entry: WikiEntry): WikiEntry[] {
  const needle = `(@${entry.slug})`;
  return publishedEntries(bundle).filter(
    (e) =>
      e.slug !== entry.slug &&
      (e.related.includes(entry.slug) || JSON.stringify(e.sections).includes(needle)),
  );
}

export function mediaFor(bundle: GameBundle, id: string | undefined): MediaAsset | undefined {
  if (!id) return undefined;
  return bundle.media[id];
}

/**
 * The lead image for an article: its explicit `media`, otherwise the first
 * captured asset whose manifest target is this entry. Missing assets return
 * undefined, so the page simply has no figure.
 */
export function entryImage(bundle: GameBundle, entry: WikiEntry): MediaAsset | undefined {
  const explicit = mediaFor(bundle, entry.media);
  if (hasImage(explicit)) return explicit;
  return Object.values(bundle.media).find(
    (a) => a.target === entry.slug && hasImage(a) && (!a.spoiler || entry.spoiler),
  );
}

/** True when the asset has a real file behind it. */
export function hasImage(asset: MediaAsset | undefined): asset is MediaAsset & { src: string } {
  return Boolean(asset && asset.status !== "missing" && asset.src);
}

/** Section headings for the on-page table of contents. */
export function tableOfContents(entry: WikiEntry) {
  return entry.sections.map((s) => ({ id: s.id, heading: s.heading }));
}

/** Most recently verified first. */
export function recentlyUpdatedEntries(bundle: GameBundle, limit = 6): WikiEntry[] {
  return [...publishedEntries(bundle)]
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified) || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export function entryTitleTag(bundle: GameBundle, entry: WikiEntry) {
  return entry.seoTitle ?? `${entry.title} | ${bundle.game.title} Wiki`;
}

/** Strips the inline markup used in wiki text: `**bold**` and `[label](target)`. */
export function plainText(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/** The whole article as plain text, for search and structured data. */
export function entryText(entry: WikiEntry): string {
  const parts: string[] = [entry.answer];
  for (const section of entry.sections) {
    parts.push(section.heading);
    for (const block of section.blocks) {
      if (block.type === "p" || block.type === "callout") parts.push(block.text);
      else if (block.type === "list") parts.push(...block.items);
      else if (block.type === "table") parts.push(...block.rows.flat());
    }
  }
  return plainText(parts.join(" "));
}
