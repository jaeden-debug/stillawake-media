/**
 * Data for /games/guides/roblox-survival-horror-games.
 *
 * Every figure is from Roblox's public games API (games.roblox.com/v1/games),
 * read on SNAPSHOT_DATE. "playing" is a single moment, not an average; visits
 * are lifetime totals; maxPlayers is server size, not party size. Premises are
 * paraphrased from each game's own Roblox description. Nothing here is a
 * quality judgement, and no game is ranked above another.
 *
 * To refresh: re-query the API for these universe ids, update the numbers and
 * SNAPSHOT_DATE.
 */

export const SNAPSHOT_DATE = "2026-10-26";
export const GUIDE_PATH = "/games/guides/roblox-survival-horror-games";
export const GUIDE_TITLE = "Roblox Survival Horror Games: 8 to Play, With Real Numbers";

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

export const guideGames: GuideGame[] = [
  {
    universeId: 2440500124,
    placeId: "6516141723",
    name: "DOORS",
    creator: "LSPLASH",
    genre: "Survival · Escape",
    style: "Co-op escape horror",
    maxPlayers: 50,
    visits: 7_953_851_826,
    playingAtSnapshot: 27_459,
    created: "2021-03-14",
    premise:
      "A horror game built around opening door after door. The developers suggest going in without a guide and treating each death as a lesson.",
    goodFor: "Groups who like learning a run by dying and trying again.",
    warnings: "Loud sounds and flashing lights, per the developer.",
  },
  {
    universeId: 2294168059,
    placeId: "6243699076",
    name: "The Mimic",
    creator: "CTStudio",
    genre: "Survival · Escape",
    style: "Story-driven horror chapters",
    maxPlayers: 45,
    visits: 1_264_014_660,
    playingAtSnapshot: 13_661,
    created: "2021-01-15",
    premise:
      "Four stories drawn from Japanese history and urban legend. Each book casts you as a different character in a world that mirrors our own.",
    goodFor: "Players who want horror with a narrative and distinct chapters.",
    warnings: "Flashing lights, loud noises and jumpscares, per the developer.",
  },
  {
    universeId: 4367208330,
    placeId: "12411473842",
    name: "Pressure",
    creator: "Urbanshade: Hadal Division",
    genre: "Survival · Escape",
    style: "Escape horror",
    maxPlayers: 50,
    visits: 492_708_019,
    playingAtSnapshot: 735,
    created: "2023-02-07",
    premise:
      "You are told you are expendable and not expected to return. The developers describe it as being in alpha.",
    goodFor: "Players comfortable with an in-progress game and a bleak tone.",
  },
  {
    universeId: 1000233041,
    placeId: "2768379856",
    name: "3008",
    creator: "uglyburger0",
    genre: "Survival · 1 vs All",
    style: "Survival with base building",
    maxPlayers: 16,
    visits: 3_332_197_102,
    playingAtSnapshot: 10_542,
    created: "2019-01-20",
    premise:
      "An enormous furniture store you can wander, build a base in, and survive its employees.",
    goodFor: "Groups who want to fortify a base together between threats.",
  },
  {
    universeId: 7018190066,
    placeId: "116495829188952",
    name: "Dead Rails",
    creator: "RCM Games",
    genre: "Adventure · Exploration",
    style: "Zombie survival journey",
    maxPlayers: 16,
    visits: 6_622_860_752,
    playingAtSnapshot: 19_392,
    created: "2025-01-01",
    premise:
      "Set in 1899 after a zombie plague. You and your friends take a train across an infected desert toward a cure in Mexico.",
    goodFor: "Friends who want zombie survival with travel and scavenging.",
  },
  {
    universeId: 1516533665,
    placeId: "4623386862",
    name: "Piggy",
    creator: "Piggy Dev Team",
    genre: "Survival",
    style: "Chase and escape",
    maxPlayers: 6,
    visits: 14_435_111_793,
    playingAtSnapshot: 12_284,
    created: "2020-01-23",
    premise:
      "Escape Piggy and uncover the mystery behind it, using items, crouching and traps.",
    goodFor: "Small groups and younger players who want short, readable chases.",
  },
  {
    universeId: 6331902150,
    placeId: "18687417158",
    name: "Forsaken",
    creator: "Forsaken Dev Team",
    genre: "Survival · 1 vs All",
    style: "Asymmetric killer vs survivors",
    maxPlayers: 9,
    visits: 5_873_947_182,
    playingAtSnapshot: 30_051,
    created: "2024-07-28",
    premise:
      "Survivors protect each other and complete objectives until a timer runs out; killers try to eliminate everyone. The developers describe it as in beta.",
    goodFor: "Players who want to play as, or against, the monster.",
    warnings: "Flashing lights and loud audio, per the developer.",
  },
  {
    universeId: 3761186887,
    placeId: "10277607801",
    name: "Apeirophobia",
    creator: "Polaroid Studios",
    genre: "Adventure · Exploration",
    style: "Backrooms exploration horror",
    maxPlayers: 40,
    visits: 438_491_042,
    playingAtSnapshot: 626,
    created: "2022-07-19",
    premise:
      "Exploration and documentation in endless rooms, with puzzles to solve and entities to hide from. Inspired by the Backrooms.",
    goodFor: "Players who prefer puzzles and dread over combat.",
    warnings: "Sudden jumpscares, flashing lights and loud noises, per the developer.",
  },
];

export function robloxUrl(g: GuideGame) {
  return `https://www.roblox.com/games/${g.placeId}`;
}
