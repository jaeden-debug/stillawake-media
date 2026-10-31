/**
 * Data for /games/guides/best-roblox-zombie-games.
 *
 * Targets (Google Keyword Planner, US): "roblox zombie games" 2,900/mo,
 * "best zombie games on roblox" 480, "best roblox zombie game" 390, "roblox
 * zombie survival" 320.
 *
 * Every figure is from Roblox's public games API (games.roblox.com/v1/games),
 * read on SNAPSHOT_DATE. "playing" is a single moment, not an average; visits
 * are lifetime totals; maxPlayers is server size, not party size. Genre is
 * Roblox's own genre_l1 · genre_l2. Premises and warnings are paraphrased
 * from each game's own Roblox description. Nothing here is a quality
 * judgement, and no game is ranked above another.
 *
 * Left out for lack of a source: Field Trip Z (its description never says
 * zombies) and Decaying Winter (its enemies are raiders and "supernatural",
 * not zombies, per the developer).
 *
 * To refresh: re-query the API for these universe ids, update the numbers and
 * SNAPSHOT_DATE.
 */

import type { ComparisonGuide, GuideGame } from "./types";

const SNAPSHOT_DATE = "2026-10-31";

const games: GuideGame[] = [
  {
    universeId: 358276974,
    placeId: "863266079",
    name: "Apocalypse Rising 2",
    creator: "Dualpoint Interactive",
    genre: "Action · Open World Action",
    style: "Open-world tactical zombie survival",
    maxPlayers: 120,
    visits: 200_983_245,
    playingAtSnapshot: 1_424,
    created: "2017-06-11",
    premise:
      "An open-world tactical shooter set during a zombie outbreak across an island chain. You scavenge food, ammo and vehicle parts, repair cars and boats, and the developers list more than 100 guns and melee weapons.",
    goodFor: "Players who want a large map, looting and the option to play solo or with friends.",
    warnings: "Other players can be hostile as well as the infected, per the developer.",
  },
  {
    universeId: 8468366390,
    placeId: "122789100578830",
    name: "Infected Lands",
    creator: "Infected Lands",
    genre: "Action · Open World Action",
    style: "Open-world zombie survival",
    maxPlayers: 40,
    visits: 12_836_007,
    playingAtSnapshot: 1_696,
    created: "2025-08-17",
    premise:
      "Set in a quarantined Kentucky in 2001, two months after a virus spread. You loot towns, farms and checkpoints, fight the infected and other survivors, and can join factions or turn on them.",
    goodFor: "Groups who want open-world survival where other players are part of the danger.",
    warnings: "Hostile survivors and betrayal are part of the game, per the developer.",
  },
  {
    universeId: 7018190066,
    placeId: "116495829188952",
    name: "Dead Rails",
    creator: "RCM Games",
    genre: "Adventure · Exploration",
    style: "Zombie survival journey",
    maxPlayers: 16,
    visits: 6_632_593_929,
    playingAtSnapshot: 23_381,
    created: "2025-01-01",
    premise:
      "Set in 1899 after a zombie plague. You and your friends take a train across an infected desert toward a cure in Mexico.",
    goodFor: "Friends who want zombie survival with travel and scavenging.",
  },
  {
    universeId: 4342047058,
    placeId: "12334109280",
    name: "Guts & Blackpowder",
    creator: "Guts & Blackpowder",
    genre: "Shooter · PvE Shooter",
    style: "Napoleonic zombie hold-out",
    maxPlayers: 20,
    visits: 622_904_286,
    playingAtSnapshot: 11_710,
    created: "2023-01-31",
    premise:
      "The undead rise during the Napoleonic Wars, and a group of survivors armed only with muskets and swords has to hold out against the horde.",
    goodFor: "Groups who like slow-reload weapons and holding a line together.",
  },
  {
    universeId: 6756445340,
    placeId: "123388221240053",
    name: "The Undead Frontline",
    creator: "The Undead Frontline",
    genre: "Shooter · PvE Shooter",
    style: "WWII class-based zombie shooter",
    maxPlayers: 10,
    visits: 3_870_092,
    playingAtSnapshot: 1_822,
    created: "2024-11-03",
    premise:
      "A Second World War zombie shooter: pick a class, play as the USA or Germany, and hold the line against the horde in co-op for up to ten players. The developers describe it as in beta.",
    goodFor: "Squads who want class roles and progression, and are fine with a game still in beta.",
  },
  {
    universeId: 187796008,
    placeId: "488667523",
    name: "Those Who Remain",
    creator: "Peak Development Studios",
    genre: "Shooter · PvE Shooter",
    style: "Wave survival with objectives",
    maxPlayers: 50,
    visits: 131_975_251,
    playingAtSnapshot: 1_008,
    created: "2016-08-24",
    premise:
      "Survive endless waves of infected while looting to keep yourself and your friends alive, building defences and completing objectives before the horde overruns you.",
    goodFor: "Groups who want waves plus objectives, not only shooting.",
  },
  {
    universeId: 169302362,
    placeId: "443406476",
    name: "Project Lazarus: Zombies",
    creator: "logitech101",
    genre: "Shooter · PvE Shooter",
    style: "Classic round-based zombies",
    maxPlayers: 6,
    visits: 219_665_000,
    playingAtSnapshot: 750,
    created: "2016-06-28",
    premise:
      "A co-op wave shooter inspired by Call of Duty Zombies, per its developer: earn points by killing zombies and repairing barricades, then spend them on better weapons and new areas.",
    goodFor: "Small squads who know, or want to learn, the round-based zombies formula.",
  },
  {
    universeId: 1709832923,
    placeId: "4972091010",
    name: "Zombie Uprising",
    creator: "USSF - United States Special Forces",
    genre: "Shooter · PvE Shooter",
    style: "Co-op wave shooter",
    maxPlayers: 5,
    visits: 1_256_167_269,
    playingAtSnapshot: 601,
    created: "2020-05-02",
    premise:
      "Team up to fight waves of zombies across a range of maps, with more than 150 customisable weapons and a battle pass, per the developer.",
    goodFor: "A small squad that likes unlocking and customising weapons.",
  },
  {
    universeId: 504035427,
    placeId: "1240123653",
    name: "Zombie Attack",
    creator: "Zombie Attack Official",
    genre: "Survival",
    style: "Wave survival with bosses",
    maxPlayers: 8,
    visits: 1_700_647_934,
    playingAtSnapshot: 209,
    created: "2017-12-12",
    premise:
      "Team up, earn weapons and survive as many waves as you can, with a boss and rare zombies that drop better rewards.",
    goodFor: "Younger or newer players who want simple, readable co-op waves.",
  },
  {
    universeId: 44636121,
    placeId: "133815151",
    name: "The Final Stand 2",
    creator: "B_Ketchup",
    genre: "Shooter · PvE Shooter",
    style: "Fortify and survive waves",
    maxPlayers: 50,
    visits: 85_129_745,
    playingAtSnapshot: 361,
    created: "2013-10-26",
    premise: "Fortify your defences and survive wave after wave of growing zombie hordes for as long as you can.",
    goodFor: "Large groups who want a long-running, straightforward last-stand game.",
  },
  {
    universeId: 9098570654,
    placeId: "90148635862803",
    name: "Survive the Apocalypse",
    creator: "Rubicon South",
    genre: "Survival",
    style: "Loot, build and escape",
    maxPlayers: 25,
    visits: 280_407_716,
    playingAtSnapshot: 12_057,
    created: "2025-11-04",
    premise: "You have been left behind as the apocalypse begins: loot the city, build defences, survive the zombies and try to escape.",
    goodFor: "Groups who want a clear goal (escape) on top of base defence.",
  },
  {
    universeId: 10138624079,
    placeId: "82457571485380",
    name: "Zombie Rush Survival",
    creator: "Undead Dev.",
    genre: "Survival",
    style: "Wave defence with turrets and traps",
    maxPlayers: 30,
    visits: 148_757_760,
    playingAtSnapshot: 8_147,
    created: "2026-05-08",
    premise:
      "Fight endless waves that get tougher each round, buy weapons and upgrades, beat bosses, and place turrets, barricades and traps with your team.",
    goodFor: "Groups who enjoy tower-defence style building between fights.",
  },
];

export const zombieGuide: ComparisonGuide = {
  id: "best-roblox-zombie-games",
  path: "/games/guides/best-roblox-zombie-games",
  gameSlug: "stillskin-forest",
  title: "Best Roblox Zombie Games: 12 Zombie Survival Picks",
  shortName: "Best Roblox zombie games",
  description:
    "12 Roblox zombie games compared: open worlds, wave shooters, historical settings and base defence. Server size and visits from Roblox, 31 Oct 2026.",
  blurb: "Apocalypse Rising 2, Dead Rails, Guts & Blackpowder, Those Who Remain, Project Lazarus and seven more, grouped by how they play.",
  snapshotDate: SNAPSHOT_DATE,
  question: "What are the best zombie games on Roblox?",
  answer:
    "It depends what kind of zombie game you want. For **open-world zombie survival**: Apocalypse Rising 2 or Infected Lands. For **zombies in another era**: Dead Rails (1899), Guts & Blackpowder (Napoleonic Wars) or The Undead Frontline (WWII). For **classic wave survival**: Those Who Remain, Project Lazarus, Zombie Uprising, Zombie Attack or The Final Stand 2. To **build defences and hold out**: Survive the Apocalypse or Zombie Rush Survival. Check server size if you are bringing friends: it ranges from 5 to 120.",
  disclosure: {
    before: "Disclosure: StillAwake Media makes ",
    linkText: "Stillskin Forest",
    href: "/games/stillskin-forest",
    after: ", a co-op zombie survival-horror game for squads of up to four that went public on Roblox on 28 October 2026. It isn't on this list because we will not rank our own game against the games we are recommending. What we learned building it is in the last section.",
  },
  groups: [
    { label: "Big groups (20 or more per server)", min: 20 },
    { label: "Medium groups (10 to 19 per server)", min: 10, max: 19 },
    { label: "Small squads (under 10 per server)", max: 9 },
  ],
  sections: [
    {
      id: "open-world",
      heading: "Open-world zombie survival",
      intro: "Big maps, looting and travel, where the infected are one danger among several. In both of these, other players can be a threat too.",
      games: [358276974, 8468366390],
    },
    {
      id: "era",
      heading: "Zombies in another era",
      intro: "The same undead, different century. The setting changes the weapons and how a fight feels.",
      games: [7018190066, 4342047058, 6756445340],
    },
    {
      id: "waves",
      heading: "Classic wave survival",
      intro: "Rounds get harder, you earn better weapons, and the run ends when the horde overruns you. Easy to pick up, and best with a few friends covering each other.",
      games: [187796008, 169302362, 1709832923, 504035427, 44636121],
    },
    {
      id: "defence",
      heading: "Build defences and hold out",
      intro: "Spend time between fights placing barricades, turrets or traps. Good for groups who like planning as much as shooting.",
      games: [9098570654, 10138624079],
    },
  ],
  experience: {
    heading: "What building a zombie game taught us to look for",
    intro:
      "We make Stillskin Forest, a co-op zombie survival-horror game on Roblox. Designing its infected and its day and night made us notice what separates zombie games from each other. Use these as a checklist when you choose one.",
    points: [
      {
        title: "More than one kind of zombie",
        body: "Stillskin has five infected types: Walker, Runner, Screamer, Brute and Soldier. When the threats differ, a squad has to decide who deals with what. A game with one zombie type plays the same in round 20 as in round 1.",
      },
      {
        title: "A reason to keep going besides the next wave",
        body: "In Stillskin you collect relics and perform a ritual, so there is an end point. Wave games are about how long you last; story or objective games are about getting somewhere. Know which your group wants.",
      },
      {
        title: "Room to breathe between fights",
        body: "Stillskin alternates an 8-minute day with a 5-minute night. Quiet time to scavenge makes the dangerous time land harder. Wave games do this with the gap between rounds; open-world games leave it to you.",
      },
      {
        title: "Controls that suit your group",
        body: "Stillskin plays with touch controls on screen, keyboard and mouse, or a controller. If friends are on phones and others on PC, check that a game supports all of them before you start.",
      },
    ],
  },
  faqs: [
    {
      q: "What is the most-played zombie game on Roblox right now?",
      a: "Of the 12 here, Dead Rails had the most people playing when we checked (23,381 on 31 October 2026), followed by Survive the Apocalypse (12,057) and Guts & Blackpowder (11,710). Player counts change by the minute, so treat these as a snapshot.",
    },
    {
      q: "Which Roblox zombie survival games have an open world?",
      a: "Apocalypse Rising 2 and Infected Lands. Both let you roam, loot and fight other survivors as well as the infected. Dead Rails is a journey across a map rather than an open sandbox.",
    },
    {
      q: "Which zombie games are best for a big group?",
      a: "Apocalypse Rising 2 holds up to 120 per server. Those Who Remain and The Final Stand 2 hold 50, Infected Lands 40, Zombie Rush Survival 30, Survive the Apocalypse 25 and Guts & Blackpowder 20.",
    },
    {
      q: "Which are good for two to four friends?",
      a: "Any of them, since every game here holds at least five per server. Project Lazarus (6), Zombie Uprising (5) and Zombie Attack (8) are built around small squads.",
    },
    {
      q: "Is this a ranking?",
      a: "No. We grouped established zombie games by how they play and took every number from Roblox's own listings so you can choose.",
    },
  ],
  related: [
    {
      label: "Roblox horror survival games",
      href: "/games/guides/roblox-horror-survival-games",
      note: "10 games where the goal is to last until morning.",
    },
    {
      label: "Scary Roblox horror games to play with friends",
      href: "/games/guides/scary-roblox-games-with-friends",
      note: "15 multiplayer horror games grouped by how a group plays them.",
    },
    {
      label: "Stillskin Forest",
      href: "/games/stillskin-forest",
      note: "our own co-op zombie survival-horror game on Roblox.",
    },
  ],
  keywords: ["guide", "best", "roblox zombie games", "zombie survival", "zombie games on roblox", "wave survival", "open world"],
  games,
};
