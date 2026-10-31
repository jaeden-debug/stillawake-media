/**
 * Data for /games/guides/roblox-horror-survival-games.
 *
 * Targets (Google Keyword Planner, US): "roblox horror survival games"
 * 2,900/mo (volatile), "roblox survive the night" 590. The angle is the
 * mechanic (lasting until morning, and how each game gets you there), not
 * playing with friends: that intent belongs to
 * /games/guides/scary-roblox-games-with-friends, so this page links to it
 * instead of competing for it.
 *
 * Every figure is from Roblox's public games API (games.roblox.com/v1/games),
 * read on SNAPSHOT_DATE. "playing" is a single moment, not an average; visits
 * are lifetime totals; maxPlayers is server size, not party size. Genre is
 * Roblox's own genre_l1 · genre_l2. Premises are paraphrased from each game's
 * own Roblox description. Nothing here is a quality judgement, and no game is
 * ranked above another.
 *
 * To refresh: re-query the API for these universe ids, update the numbers and
 * SNAPSHOT_DATE.
 */

import type { ComparisonGuide, GuideGame } from "./types";

const SNAPSHOT_DATE = "2026-10-31";

const games: GuideGame[] = [
  {
    universeId: 1000233041,
    placeId: "2768379856",
    name: "3008",
    creator: "uglyburger0",
    genre: "Survival · 1 vs All",
    style: "Furniture-store base building",
    maxPlayers: 16,
    visits: 3_336_981_955,
    playingAtSnapshot: 20_152,
    created: "2019-01-20",
    premise: "An enormous furniture store you can wander, build a base in, and survive its employees.",
    goodFor: "Players who want the game the others in this section say inspired them.",
  },
  {
    universeId: 7058980030,
    placeId: "127380660530951",
    name: "Survive Overnight in a Mega Store",
    creator: "Velstorm's Survive Overnight Game",
    genre: "Survival",
    style: "Build a fort before closing",
    maxPlayers: 25,
    visits: 654_805_985,
    playingAtSnapshot: 6_507,
    created: "2025-01-09",
    premise: "The store is closing and you can't get out, so you build a fort to last the night. The developer credits 3008 as its inspiration.",
    goodFor: "Players who liked 3008 and want a newer take on it.",
  },
  {
    universeId: 8776018564,
    placeId: "122802147482832",
    name: "24 Hours Overnight",
    creator: "A-1 Productions",
    genre: "Survival",
    style: "Store base building",
    maxPlayers: 25,
    visits: 82_101_173,
    playingAtSnapshot: 1_839,
    created: "2025-09-22",
    premise:
      "Build a base to survive the night while dangerous employees and monsters roam a store. A night market opens on some nights with items you can't get elsewhere. The developer credits 3008.",
    goodFor: "Players who want store survival with extra things to unlock.",
  },
  {
    universeId: 7453941040,
    placeId: "109686116036889",
    name: "DANGEROUS NIGHT",
    creator: "Aqvise",
    genre: "Survival",
    style: "Furnish a bunker by day, hide by night",
    maxPlayers: 15,
    visits: 210_972_694,
    playingAtSnapshot: 2_738,
    created: "2025-03-29",
    premise:
      "You inherit an empty underground shelter. By day you visit a furniture market and kit it out; you must be back inside before dark, when the monsters come out.",
    goodFor: "Players who enjoy decorating and upgrading a safe place between scares.",
  },
  {
    universeId: 9257800423,
    placeId: "94495283121683",
    name: "STAY INSIDE!",
    creator: "FalconRise Studio",
    genre: "Survival",
    style: "Cozy apartment horror",
    maxPlayers: 8,
    visits: 42_087_561,
    playingAtSnapshot: 1_307,
    created: "2025-11-28",
    premise:
      "The developer calls it a cozy horror game. By day you shop and furnish your apartment to raise its Coziness; at night strange entities roam and you stay inside until morning.",
    goodFor: "Players who want lighter, cosier horror.",
  },
  {
    universeId: 7326934954,
    placeId: "79546208627805",
    name: "99 Nights in the Forest",
    creator: "Grandma's Favourite Games",
    genre: "Survival",
    style: "Camp-building survival horror",
    maxPlayers: 25,
    visits: 30_334_574_903,
    playingAtSnapshot: 198_361,
    created: "2025-03-04",
    premise: "Build a camp in the forest with your friends while something out there watches you.",
    goodFor: "Players who want a long survival run measured in nights.",
  },
  {
    universeId: 847722000,
    placeId: "2413927524",
    name: "The Rake REMASTERED",
    creator: "RVVZ",
    genre: "Survival · Escape",
    style: "One-monster night survival",
    maxPlayers: 8,
    visits: 204_812_829,
    playingAtSnapshot: 359,
    created: "2018-09-27",
    premise:
      "The Rake stalks a forest at night. Run, hide, find items and spend points on upgrades to last until morning.",
    goodFor: "Players who want a classic single-monster survival night.",
  },
  {
    universeId: 9219116196,
    placeId: "96153864779911",
    name: "Scary Grocery: The Night Shift",
    creator: "Moo Milk Studio",
    genre: "Survival",
    style: "Night-shift doppelganger checks",
    maxPlayers: 30,
    visits: 105_959_059,
    playingAtSnapshot: 1_098,
    created: "2025-11-22",
    premise:
      "Your first night shift at a store: scan customers, check their details and question them. Real customers check out; doppelgangers get shot. Let one through and you face the entity.",
    goodFor: "Players who prefer paying attention and making calls over running and building.",
  },
  {
    universeId: 10696894951,
    placeId: "139020444733179",
    name: "Survive Deep in the Woods",
    creator: "Simple and Fiya Games",
    genre: "Survival · 1 vs All",
    style: "Farmers vs a player-controlled beast",
    maxPlayers: 60,
    visits: 45_048_520,
    playingAtSnapshot: 4_995,
    created: "2026-08-13",
    premise:
      "Farmers chop trees, build and defend a base and try to last until morning. One player is the Beast and hunts every farmer before sunrise.",
    goodFor: "Players who want base building where the threat is another person.",
  },
  {
    universeId: 1489026993,
    placeId: "4580204640",
    name: "Survive the Killer!",
    creator: "Slyce Entertainment",
    genre: "Survival · 1 vs All",
    style: "Hide, rescue and escape",
    maxPlayers: 13,
    visits: 2_706_325_084,
    playingAtSnapshot: 10_732,
    created: "2020-01-06",
    premise:
      "Survivors hide from the killer, save teammates and escape together; the killer tries to get everyone before they escape or time runs out.",
    goodFor: "Short rounds where surviving means outlasting a player, not a night.",
  },
];

export const horrorSurvivalGuide: ComparisonGuide = {
  id: "roblox-horror-survival-games",
  path: "/games/guides/roblox-horror-survival-games",
  gameSlug: "stillskin-forest",
  title: "Roblox Horror Survival Games: 10 Ways to Survive the Night",
  shortName: "Roblox horror survival games",
  description:
    "10 Roblox horror survival games where the goal is to last until morning, grouped by how you survive the night. Numbers from Roblox, 31 Oct 2026.",
  blurb: "3008, 99 Nights in the Forest, DANGEROUS NIGHT, The Rake REMASTERED, Scary Grocery and five more, grouped by how you get to morning.",
  snapshotDate: SNAPSHOT_DATE,
  question: "What are the best Roblox horror survival games where you survive the night?",
  answer:
    "Pick by how you want to get to morning. To **build a base in a store**: 3008, Survive Overnight in a Mega Store or 24 Hours Overnight. To **furnish a shelter by day and hide by night**: DANGEROUS NIGHT or STAY INSIDE!. To **survive the forest**: 99 Nights in the Forest or The Rake REMASTERED. To **work a night shift**: Scary Grocery: The Night Shift. To **outlast a player who hunts you**: Survive Deep in the Woods or Survive the Killer!.",
  disclosure: {
    before: "Disclosure: StillAwake Media makes ",
    linkText: "Stillskin Forest",
    href: "/games/stillskin-forest",
    after: ", a co-op zombie survival-horror game with a day and night cycle that went public on Roblox on 28 October 2026. It isn't on this list because we will not rank our own game against the games we are recommending. What we learned building it is in the last section.",
  },
  groupsHeading: "Server sizes",
  groups: [
    { label: "Large servers (20 or more)", min: 20 },
    { label: "Medium servers (10 to 19)", min: 10, max: 19 },
    { label: "Small servers (under 10)", max: 9 },
  ],
  sections: [
    {
      id: "store",
      heading: "Build a base in a store",
      intro: "The 3008 formula: a huge building, staff or monsters that turn hostile at night, and whatever you can drag together into a fort.",
      games: [1000233041, 7058980030, 8776018564],
    },
    {
      id: "shelter",
      heading: "Furnish a shelter by day, hide by night",
      intro: "A home base you improve in daylight. The night is about being inside when it starts.",
      games: [7453941040, 9257800423],
    },
    {
      id: "forest",
      heading: "Survive the forest",
      intro: "Outdoors, in the dark, with something hunting. One builds a camp across many nights; the other is a single night against a single monster.",
      games: [7326934954, 847722000],
    },
    {
      id: "shift",
      heading: "Work the night shift",
      intro: "No base, no running: you survive by noticing what is wrong.",
      games: [9219116196],
    },
    {
      id: "hunted",
      heading: "Outlast a player who hunts you",
      intro: "The threat is another player, so no two rounds play out the same.",
      games: [10696894951, 1489026993],
    },
  ],
  experience: {
    heading: "What designing a day and night taught us about survival horror",
    intro:
      "Stillskin Forest, our co-op zombie survival-horror game on Roblox, is built on a day and night cycle. Tuning it changed how we look at other survive-the-night games. These are the questions we now ask of any of them.",
    points: [
      {
        title: "How long is the day, and how long is the night?",
        body: "In Stillskin a day lasts 8 minutes and a night 5. A shorter night keeps the tension from wearing off; a longer day gives you time to prepare. Most games in this guide also split time between preparing and surviving, so it's worth noticing the balance.",
      },
      {
        title: "What changes after dark?",
        body: "Our infected come in five types (Walker, Runner, Screamer, Brute and Soldier), and the night is when you meet them. The best survival nights ask you to do something different from the day, not just more of it.",
      },
      {
        title: "Is surviving the whole point?",
        body: "Stillskin gives you a goal beyond the next morning: collect relics and perform a ritual. Some games here are about lasting as many nights as you can; others have an ending. Decide which you want before you start.",
      },
      {
        title: "Can you play it on what you have?",
        body: "Stillskin supports touch controls on screen, PC and controller. A night is a long time to spend fighting the controls, so check what a game supports first.",
      },
    ],
  },
  faqs: [
    {
      q: "What does \"survive the night\" mean in Roblox games?",
      a: "It is a common structure: a safer period to explore, gather or build, then a night where threats appear and you have to last until morning. Survive Overnight in a Mega Store, 24 Hours Overnight, DANGEROUS NIGHT and STAY INSIDE! all credit 3008 as an inspiration in their Roblox descriptions.",
    },
    {
      q: "What is the most-played Roblox horror survival game right now?",
      a: "Of the 10 here, 99 Nights in the Forest had the most people playing when we checked (198,361 on 31 October 2026), followed by 3008 (20,152) and Survive the Killer! (10,732). Player counts change by the minute, so treat these as a snapshot.",
    },
    {
      q: "Which of these are less scary?",
      a: "STAY INSIDE! calls itself a cozy horror game, and DANGEROUS NIGHT puts a lot of its time into decorating your bunker.",
    },
    {
      q: "Is this a ranking?",
      a: "No. We grouped established survive-the-night games by how they work and took every number from Roblox's own listings so you can choose.",
    },
  ],
  related: [
    {
      label: "Scary Roblox horror games to play with friends",
      href: "/games/guides/scary-roblox-games-with-friends",
      note: "15 multiplayer horror games grouped by how a group plays them.",
    },
    {
      label: "Best Roblox zombie games",
      href: "/games/guides/best-roblox-zombie-games",
      note: "12 zombie survival games: open worlds, wave shooters and base defence.",
    },
    {
      label: "Stillskin Forest",
      href: "/games/stillskin-forest",
      note: "our own co-op zombie survival-horror game with an 8-minute day and 5-minute night.",
    },
  ],
  keywords: ["guide", "roblox horror survival games", "survive the night", "survive overnight", "night survival", "horror survival"],
  games,
};
