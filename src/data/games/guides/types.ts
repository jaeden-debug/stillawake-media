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
  keywords: string[];
  games: GuideGame[];
};

export function robloxUrl(g: GuideGame) {
  return `https://www.roblox.com/games/${g.placeId}`;
}
