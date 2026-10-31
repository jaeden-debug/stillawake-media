export type GuideGame = {
  universeId: number;
  placeId: string;
  name: string;
  creator: string;
  /** Roblox's own genre labels. */
  genre: string;
  style: string;
  maxPlayers: number;
  visits: number;
  playingAtSnapshot: number;
  created: string;
  premise: string;
  goodFor: string;
  warnings?: string;
};

/**
 * A "games compared" guide: real numbers from Roblox's public games API, read
 * on snapshotDate, with premises paraphrased from each developer's own
 * description. Never a ranking.
 */
export type ComparisonGuide = {
  id: string;
  path: string;
  /** Slug of our own game this guide accompanies; its thumbnail is the share image. */
  gameSlug: string;
  title: string;
  /** Short name for breadcrumbs and the list schema. */
  shortName: string;
  description: string;
  /** Hub card blurb. */
  blurb: string;
  snapshotDate: string;
  question: string;
  /** Direct answer; supports `**bold**`. */
  answer: string;
  /** Disclosure of StillAwake's own game in this genre. */
  disclosure: { before: string; linkText: string; href: string; after: string };
  /** Server-size groups for the "with friends" section. */
  groups: { label: string; min?: number; max?: number }[];
  /** Heading for the server-size section; defaults to "Which to play with friends". */
  groupsHeading?: string;
  keywords: string[];
  games: GuideGame[];
  /**
   * Optional grouping of the games by how a group plays them. When present,
   * "The games" renders section by section, in this order. Every game must
   * appear in exactly one section (enforced in games.test.ts).
   */
  sections?: { id: string; heading: string; intro: string; games: number[] }[];
  /** First-hand notes from building our own game in the genre. */
  experience?: { heading: string; intro: string; points: { title: string; body: string }[] };
  faqs?: { q: string; a: string }[];
  /** Internal links rendered as "Related" near the end of the page. */
  related?: { label: string; href: string; note: string }[];
};

/** Roblox's public games API query a guide's figures were read from. */
export function guideApiUrl(guide: Pick<ComparisonGuide, "games">) {
  return `https://games.roblox.com/v1/games?universeIds=${guide.games.map((g) => g.universeId).join(",")}`;
}

export function robloxUrl(g: GuideGame) {
  return `https://www.roblox.com/games/${g.placeId}`;
}
