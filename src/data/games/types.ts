/**
 * Content model for the games platform.
 *
 * A game is data, not a page layout: /games/[game], its wiki home, every
 * category and every article are generated from these records. Adding a game
 * means adding a record and its wiki entries; no template changes.
 */

/**
 * How sure we are that an entry describes the game as it is.
 *
 * - `verified_live`: confirmed in the current game build, from the game's own
 *   configuration, source or a recorded playtest. Only these are published.
 * - `verified_planned`: confirmed as designed or built but not yet in the
 *   playable build. Kept for the content audit, never published as playable.
 * - `unverified`: described somewhere but not confirmed. Not published.
 * - `deprecated`: was true, no longer is. Not published.
 */
export type Verification = "verified_live" | "verified_planned" | "unverified" | "deprecated";

export type ReleaseStatus = "in-development" | "early-access" | "released";

export type GameMediaRef = {
  /** MediaAsset id from the game's media manifest. */
  asset: string;
};

export type Game = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** Meta description for the landing page: 120–160 characters. */
  metaDescription: string;
  description: string[];
  developer: string;
  publisher: string;
  /** Only platforms the game is actually built for. */
  platforms: string[];
  /**
   * Devices confirmed by a real test on that device. Empty until someone has
   * played it there; a platform the engine supports is not a device we
   * verified.
   */
  verifiedDevices: string[];
  genre: string[];
  releaseStatus: ReleaseStatus;
  /** ISO date, only when a public release actually happened. */
  releaseDate?: string;
  /** The official store / platform page. */
  officialUrl?: string;
  /**
   * True only once someone has joined the public experience. Until then the
   * CTA says "View on Roblox", never "Play now".
   */
  publiclyPlayable: boolean;
  statusNote: string;
  /**
   * Opt-in related-game block (GameSpotlight) for articles and wiki pages.
   * Links must point at pages that exist; labels in both site languages.
   */
  spotlight?: {
    blurbEn: string;
    blurbFr: string;
    links: { href: string; labelEn: string; labelFr: string }[];
  };
  /** Articles about how the game was made, shown as "Behind the game" on the landing page. */
  behindTheGame?: { title: string; href: string; blurb: string }[];
  features: { title: string; body: string }[];
  media: {
    hero?: string;
    thumbnail?: string;
    icon?: string;
    cover?: string;
    trailerPoster?: string;
    /** Link-preview (og:image) art for the game page. Falls back to hero, then thumbnail. */
    social?: string;
    screenshots: string[];
  };
  trailerUrl?: string;
  accent: string;
  /** Second brand colour, used for small highlights on the landing page. */
  accentSoft: string;
  /** Short genre line for the landing page <title>, e.g. "Co-op Survival Horror on Roblox". */
  kindLabel: string;
  /** "Players" fact on the landing page. */
  playersLabel: string;
  /** Per-game copy for the shared landing and wiki templates. */
  landing: {
    featuresTitle: string;
    /** A grid of entry cards from one category (enemies, challenges…). */
    showcase?: { category: string; title: string; linkLabel: string; exclude?: string[]; withImages?: boolean };
    /** A strip of hand-picked guides. */
    strip?: { title: string; slugs: string[]; category: string };
    wikiCtaTitle: string;
    wikiCtaBody: string;
  };
  /** Wiki home <title> suffix, meta description and intro line. */
  wikiBlurb: { title: string; description: string; intro: string };
  related: string[];
  lastVerified: string;
  /** Wiki articles to feature on the landing page and wiki home. */
  featuredGuides: string[];
  beginnerGuides: string[];
};

/** Inline text supports `**bold**` and `[label](target)` links, where a
 *  target of `@slug` resolves to another wiki entry of the same game. */
export type WikiBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "callout"; tone: "tip" | "warning" | "note"; text: string };

export type WikiSection = {
  id: string;
  heading: string;
  blocks: WikiBlock[];
  /** Collapsed behind a spoiler control, still present in the HTML. */
  spoiler?: boolean;
};

export type WikiCategory = {
  id: string;
  slug: string;
  title: string;
  /** Short label for the sidebar. */
  navLabel: string;
  description: string;
  intro: string;
};

export type WikiEntry = {
  /** Stable, unique within a game. Also the URL slug. */
  slug: string;
  category: string;
  /** The page H1. */
  title: string;
  /** <title>, without the brand suffix. Defaults to `${title} | Stillskin Forest Wiki`-style. */
  seoTitle?: string;
  /** Meta description: 120–160 characters, unique per page. */
  description: string;
  /** The natural-language question this page exists to answer. */
  question?: string;
  /** The direct answer, shown before anything else. */
  answer: string;
  /** Infobox rows. */
  facts?: [string, string][];
  sections: WikiSection[];
  related: string[];
  verification: Verification;
  /** Where the facts come from, in plain words. */
  sources: string[];
  lastVerified: string;
  /** The whole entry is story-sensitive. */
  spoiler?: boolean;
  media?: string;
  /** Extra search terms (synonyms, misspellings people actually type). */
  aliases?: string[];
  /** Content the page could not confirm. Feeds the content audit. */
  gaps?: string[];
};

export type GameUpdate = {
  id: string;
  /** Null until the game uses public version numbers. */
  version: string | null;
  date: string;
  title: string;
  kind: "development-milestone" | "public-release";
  newFeatures: string[];
  changes: string[];
  fixes: string[];
  balance: string[];
  knownIssues: string[];
  relatedEntries: string[];
};

export type MediaAsset = {
  id: string;
  filename: string;
  gameId: string;
  /** Wiki entry slug or page this image belongs to. */
  target: string;
  description: string;
  alt: string;
  use: "hero" | "thumbnail" | "icon" | "cover" | "screenshot" | "trailer-poster" | "social";
  dimensions: { width: number; height: number };
  aspectRatio: string;
  priority: "P0" | "P1" | "P2";
  captureInstructions: string;
  spoiler: boolean;
  /** Whether the subject exists in the current playable build. */
  liveAvailability: "live" | "not-in-build" | "secret";
  /** `missing` assets render the designed fallback, never a broken <img>. */
  status: "missing" | "captured" | "optimized";
  source?: string;
  /** Public path once captured, e.g. /games/stillskin-forest/locations/x.webp */
  src?: string;
};
