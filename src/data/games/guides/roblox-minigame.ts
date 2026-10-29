import type { ComparisonGuide, GuideGame } from "./types";

/**
 * Data for /games/guides/roblox-minigame-games.
 *
 * Every figure is from Roblox's public games API (games.roblox.com/v1/games),
 * read on the snapshot date. Premises are paraphrased from each game's own
 * Roblox description. Not a ranking.
 */

const SNAPSHOT = "2026-10-26";

const games: GuideGame[] = [
  {
    universeId: 110181652,
    placeId: "277751860",
    name: "Epic Minigames",
    creator: "Typical Games",
    genre: "Party & Casual · Minigame",
    style: "Classic minigame rotation",
    maxPlayers: 12,
    visits: 2_361_147_791,
    playingAtSnapshot: 1_343,
    created: "2015-07-29",
    premise:
      "A large rotating collection of short minigames (the developer lists 142), with coins to spend on gear and effects, plus a board-game mode called Epic Party.",
    goodFor: "Anyone who wants lots of variety in short rounds.",
  },
  {
    universeId: 1802622907,
    placeId: "5171093784",
    name: "Don't Press The Button 4",
    creator: "Colorfuel Studios",
    genre: "Party & Casual · Minigame",
    style: "Button-driven chaos stages",
    maxPlayers: 10,
    visits: 1_310_328_055,
    playingAtSnapshot: 816,
    created: "2020-06-12",
    premise:
      "A button sits in the middle of nowhere. Press it and something chaotic happens; the developer lists 150 stages to survive.",
    goodFor: "Small groups who enjoy surprises and survival stages.",
  },
  {
    universeId: 5239362765,
    placeId: "15198166649",
    name: "DON'T GET ELIMINATED",
    creator: "Badass Experiences",
    genre: "Party & Casual · Minigame",
    style: "Game-show elimination with voting",
    maxPlayers: 50,
    visits: 411_313_093,
    playingAtSnapshot: 2_067,
    created: "2023-10-28",
    premise:
      "A host forces players through wild minigames in a game show, and players vote each other out between rounds.",
    goodFor: "Big groups who like social play and voting drama.",
  },
  {
    universeId: 9119782663,
    placeId: "139988436996662",
    name: "Stop the Timer",
    creator: "Ascora Studios",
    genre: "Party & Casual",
    style: "1v1 timing duels",
    maxPlayers: 20,
    visits: 101_463_243,
    playingAtSnapshot: 449,
    created: "2025-11-07",
    premise:
      "Face an opponent and stop a timer as close to the goal time as you can; ranks for winning, with several game modes.",
    goodFor: "Players who like pure timing and head-to-head competition.",
  },
  {
    universeId: 2936053166,
    placeId: "7554888362",
    name: "Squid Game X",
    creator: "redifi",
    genre: "Party & Casual · Minigame",
    style: "Elimination rounds inspired by a TV show",
    maxPlayers: 80,
    visits: 2_326_185_766,
    playingAtSnapshot: 13_744,
    created: "2021-09-24",
    premise:
      "A survival game inspired by the Squid Game series: elimination rounds such as Red Light, Green Light, Glass Bridge and Tug of War.",
    goodFor: "Large servers and anyone who knows the show.",
  },
  {
    universeId: 9384605736,
    placeId: "136764190843219",
    name: "Knockout!",
    creator: "braxworks",
    genre: "Party & Casual · Minigame",
    style: "Last-penguin-standing knockback",
    maxPlayers: 12,
    visits: 1_053_895_939,
    playingAtSnapshot: 767,
    created: "2025-12-19",
    premise:
      "Penguins on an ice floe launch at each other without seeing anyone's aim or power; the last one on the ice wins. The developer calls it a new game.",
    goodFor: "Small groups who like prediction and quick rounds.",
  },
  {
    universeId: 2176187244,
    placeId: "6020247720",
    name: "Ragdoll Physics [Skydiving]",
    creator: "Frobulate",
    genre: "Simulation · Physics Sim",
    style: "Ragdoll sandbox",
    maxPlayers: 25,
    visits: 320_765_136,
    playingAtSnapshot: 1_161,
    created: "2020-11-29",
    premise:
      "A sandbox built on a ragdoll engine: toggle ragdoll and anti-gravity, skydive, and use slow motion. Supports VR and voice chat.",
    goodFor: "Players who want ragdoll physics with no goals or scores.",
  },
  {
    universeId: 4018794732,
    placeId: "11273483795",
    name: "Ultimate Ragdoll Playground",
    creator: "ShrekWasMyIdea",
    genre: "Simulation · Physics Sim",
    style: "Ragdoll playground",
    maxPlayers: 35,
    visits: 297_721_580,
    playingAtSnapshot: 481,
    created: "2022-10-14",
    premise:
      "A playground for ragdolling your avatar: aimable cannons, bombs, pipes, a rocket to space, a tornado and more.",
    goodFor: "Groups who want to launch each other around for fun.",
  },
];

export const minigameGuide: ComparisonGuide = {
  id: "roblox-minigame",
  path: "/games/guides/roblox-minigame-games",
  gameSlug: "risk-it",
  title: "Roblox Minigame and Ragdoll Games: 8 to Play, With Real Numbers",
  shortName: "Roblox minigame games",
  description:
    "Eight Roblox minigame and ragdoll games compared with numbers from Roblox: style, server size, visits and players, and which suit a big group of friends.",
  blurb: "Epic Minigames, Squid Game X, DON'T GET ELIMINATED, Knockout! and four more, compared by style and server size.",
  snapshotDate: SNAPSHOT,
  question: "What are good minigame games on Roblox?",
  answer:
    "Eight established options in different styles: **Epic Minigames** for variety; **Don't Press The Button 4** for chaos stages; **DON'T GET ELIMINATED** and **Squid Game X** for big-server elimination; **Stop the Timer** for 1v1 timing; **Knockout!** for last-one-standing; and **Ragdoll Physics** or **Ultimate Ragdoll Playground** if you just want to launch your avatar. Server size decides how many friends fit.",
  disclosure: {
    before: "Disclosure: StillAwake Media makes ",
    linkText: "RISK IT!",
    href: "/games/risk-it",
    after: ", a minigame game of short challenges and ragdoll fails. It is left off this list on purpose: we will never rank our own game against these.",
  },
  groups: [
    { label: "Big groups (20+ per server)", min: 20 },
    { label: "Small sessions (12 or fewer per server)", max: 12 },
  ],
  keywords: ["guide", "best", "minigames", "party games", "ragdoll games", "roblox minigames", "with friends"],
  games,
};
