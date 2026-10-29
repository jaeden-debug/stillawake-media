import { entityIds } from "@/data/entities";
import type { Game, WikiEntry } from "@/data/games/types";
import type { GameBundle } from "@/data/games";
import wikiPublished from "@/data/games/wiki-published.json";
import { siteUrl } from "@/lib/data";
import { absolute, entryImage, entryPath, entryText, gamePath, hasImage, mediaFor, plainText, wikiPath } from "@/lib/games";

/**
 * Structured data for the games platform.
 *
 * Only truthful, supported properties: no ratings, no review counts, no
 * prices, no release date until there is a release. Wiki articles are
 * authored and published by the organization, so they reference the existing
 * Organization @id rather than inventing a person.
 */

export type Crumb = { name: string; path: string };

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? `${siteUrl}/` : `${siteUrl}${c.path}`,
    })),
  };
}

export function videoGameId(game: Game) {
  return `${absolute(gamePath(game.slug))}#videogame`;
}

export function videoGameNode(bundle: GameBundle) {
  const { game } = bundle;
  const image = [mediaFor(bundle, game.media.hero), mediaFor(bundle, game.media.thumbnail)].find(hasImage);
  const node: Record<string, unknown> = {
    "@type": "VideoGame",
    "@id": videoGameId(game),
    name: game.title,
    url: absolute(gamePath(game.slug)),
    description: game.summary,
    slogan: game.tagline,
    genre: game.genre,
    gamePlatform: game.platforms,
    applicationCategory: "Game",
    playMode: ["SinglePlayer", "CoOp", "MultiPlayer"],
    numberOfPlayers: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4 },
    author: { "@id": entityIds.organization },
    publisher: { "@id": entityIds.organization },
    inLanguage: "en",
  };
  if (game.officialUrl) node.sameAs = [game.officialUrl];
  if (game.releaseDate) node.datePublished = game.releaseDate;
  if (hasImage(image)) node.image = absolute(image.src);
  return node;
}

function page(type: string, url: string, name: string, description: string, extra: Record<string, unknown> = {}) {
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-CA",
    isPartOf: { "@id": entityIds.website },
    publisher: { "@id": entityIds.organization },
    ...extra,
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function itemList(name: string, items: { name: string; url: string }[]) {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url.startsWith("http") ? it.url : `${siteUrl}${it.url}`,
    })),
  };
}

export function collectionPageNode(url: string, name: string, description: string, about?: string) {
  return page("CollectionPage", url, name, description, about ? { about: { "@id": about } } : {});
}

export function gamePageNode(bundle: GameBundle) {
  const url = absolute(gamePath(bundle.game.slug));
  return page("WebPage", url, bundle.game.title, bundle.game.summary, {
    mainEntity: { "@id": videoGameId(bundle.game) },
    dateModified: bundle.game.lastVerified,
  });
}

export function wikiArticleNode(bundle: GameBundle, entry: WikiEntry) {
  const url = absolute(entryPath(bundle.game.slug, entry));
  const image = entryImage(bundle, entry);
  // First time the entry went live, from git history (scripts/wiki-published-dates.mjs).
  const published = (wikiPublished as Record<string, Record<string, string>>)[bundle.game.slug]?.[entry.slug];
  const node: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: entry.title,
    description: entry.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    ...(published ? { datePublished: published } : {}),
    dateModified: entry.lastVerified,
    author: { "@id": entityIds.organization },
    publisher: { "@id": entityIds.organization },
    about: { "@id": videoGameId(bundle.game) },
    isPartOf: { "@id": `${absolute(wikiPath(bundle.game.slug))}#webpage` },
    inLanguage: "en-CA",
    articleSection: bundle.categories.find((c) => c.id === entry.category)?.title,
    wordCount: entryText(entry).split(/\s+/).length,
  };
  // Spoiler images stay out of structured data: search engines can use it as
  // the result thumbnail, which would show the spoiler before anyone clicks.
  if (hasImage(image) && !image.spoiler) node.image = absolute(image.src);
  return node;
}

export function wikiWebPageNode(bundle: GameBundle, entry: WikiEntry) {
  const url = absolute(entryPath(bundle.game.slug, entry));
  return page("WebPage", url, entry.title, entry.description, {
    dateModified: entry.lastVerified,
    mainEntity: { "@id": `${url}#article` },
  });
}

/** Only for the FAQ entry: every section heading is a question with its answer. */
export function faqPageNode(bundle: GameBundle, entry: WikiEntry) {
  const url = absolute(entryPath(bundle.game.slug, entry));
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: entry.sections.map((s) => ({
      "@type": "Question",
      name: s.heading,
      acceptedAnswer: {
        "@type": "Answer",
        text: s.blocks.map((b) => (b.type === "p" || b.type === "callout" ? plainText(b.text) : "")).join(" ").trim(),
      },
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here except for "</script>", which the
      // replace neutralises.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
