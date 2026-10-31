/**
 * Data for /games/guides/scary-roblox-games-with-friends.
 *
 * This guide absorbed /games/guides/roblox-survival-horror-games on
 * 2026-10-29 (301 in src/data/redirects.mjs). Google's top 10 for "scary
 * roblox games to play with friends" and "roblox survival horror games"
 * share most of their results, so two pages would have competed for one
 * intent. The old URL was never indexed ("URL is unknown to Google" in URL
 * Inspection), so nothing was lost. Keyword Planner, 2026-10-29, US: "scary
 * roblox games" 49,500/mo, "roblox horror games" 33,100, "roblox survival
 * horror games" 18,100, "scary roblox games to play with friends" 3,600.
 *
 * Broadened 2026-10-31 to also own the multiplayer / co-op phrasings
 * (Keyword Planner, US): "roblox horror games to play with friends" 880,
 * "horror games to play with friends roblox" 880, "best roblox horror games
 * to play with friends" 590, "multiplayer roblox horror games" 260, "roblox
 * co op horror games" 90. Zombie games and night-survival games have their
 * own guides (best-roblox-zombie-games, roblox-horror-survival-games); this
 * page links to them rather than competing for those terms.
 *
 * Every figure is from Roblox's public games API (games.roblox.com/v1/games),
 * read on SNAPSHOT_DATE. "playing" is a single moment, not an average; visits
 * are lifetime totals; maxPlayers is server size, not party size. Genre is
 * Roblox's own genre_l1 · genre_l2. Premises and warnings are paraphrased
 * from each game's own Roblox description. Nothing here is a quality
 * judgement, and no game is ranked above another.
 *
 * To refresh: re-query the API for these universe ids, update the numbers and
 * SNAPSHOT_DATE.
 */

import type { ComparisonGuide, GuideGame } from "./types";

export { robloxUrl, type GuideGame } from "./types";

export const SNAPSHOT_DATE = "2026-10-31";
export const GUIDE_PATH = "/games/guides/scary-roblox-games-with-friends";
export const GUIDE_TITLE = "Best Scary Roblox Horror Games to Play With Friends";

export const guideGames: GuideGame[] = [
  {
    universeId: 2440500124,
    placeId: "6516141723",
    name: "DOORS",
    creator: "LSPLASH",
    genre: "Survival · Escape",
    style: "Co-op escape horror",
    maxPlayers: 50,
    visits: 7_980_799_468,
    playingAtSnapshot: 37_431,
    created: "2021-03-14",
    premise:
      "A horror game built around opening door after door. The developers suggest going in without a guide and treating each death as a lesson.",
    goodFor: "Groups who like learning a run by dying and trying again.",
    warnings: "Loud sounds and flashing lights, per the developer.",
  },
  {
    universeId: 4367208330,
    placeId: "12411473842",
    name: "Pressure",
    creator: "Urbanshade: Hadal Division",
    genre: "Survival · Escape",
    style: "Escape horror",
    maxPlayers: 50,
    visits: 493_172_387,
    playingAtSnapshot: 608,
    created: "2023-02-07",
    premise:
      "You are told you are expendable and not expected to return. The developers describe it as being in alpha.",
    goodFor: "Players comfortable with an in-progress game and a bleak tone.",
  },
  {
    universeId: 6508759464,
    placeId: "138837502355157",
    name: "Grace",
    creator: "The Fartering Few",
    genre: "Survival · Escape",
    style: "Fast rooms-style escape",
    maxPlayers: 50,
    visits: 461_715_364,
    playingAtSnapshot: 681,
    created: "2024-09-03",
    premise:
      "A rooms-style game built around chaos, movement and speed: get from saferoom to saferoom before your time runs out. The developer says it is in alpha and mostly made by one person.",
    goodFor: "Groups who have played DOORS or Pressure and want something faster.",
  },
  {
    universeId: 2294168059,
    placeId: "6243699076",
    name: "The Mimic",
    creator: "CTStudio",
    genre: "Survival · Escape",
    style: "Story-driven horror chapters",
    maxPlayers: 45,
    visits: 1_272_632_264,
    playingAtSnapshot: 12_325,
    created: "2021-01-15",
    premise:
      "Four stories drawn from Japanese history and urban legend. Each book casts you as a different character in a world that mirrors our own.",
    goodFor: "Players who want horror with a narrative and distinct chapters.",
    warnings: "Flashing lights, loud noises and jumpscares, per the developer.",
  },
  {
    universeId: 3761186887,
    placeId: "10277607801",
    name: "Apeirophobia",
    creator: "Polaroid Studios",
    genre: "Adventure · Exploration",
    style: "Backrooms exploration horror",
    maxPlayers: 40,
    visits: 438_760_683,
    playingAtSnapshot: 376,
    created: "2022-07-19",
    premise:
      "Exploration and documentation in endless rooms, with puzzles to solve and entities to hide from. Inspired by the Backrooms.",
    goodFor: "Players who prefer puzzles and dread over combat.",
    warnings: "Sudden jumpscares, flashing lights and loud noises, per the developer.",
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
    goodFor: "Groups who want to build and hold a camp together, night after night.",
  },
  {
    universeId: 1000233041,
    placeId: "2768379856",
    name: "3008",
    creator: "uglyburger0",
    genre: "Survival · 1 vs All",
    style: "Survival with base building",
    maxPlayers: 16,
    visits: 3_336_981_955,
    playingAtSnapshot: 20_152,
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
    visits: 6_632_593_929,
    playingAtSnapshot: 23_381,
    created: "2025-01-01",
    premise:
      "Set in 1899 after a zombie plague. You and your friends take a train across an infected desert toward a cure in Mexico.",
    goodFor: "Friends who want zombie survival with travel and scavenging.",
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
    goodFor: "Small groups who want a classic single-monster survival night.",
  },
  {
    universeId: 2239430935,
    placeId: "6137321701",
    name: "Blair",
    creator: "Spooky Scary Games",
    genre: "Survival",
    style: "Co-op ghost hunting",
    maxPlayers: 50,
    visits: 365_274_657,
    playingAtSnapshot: 526,
    created: "2020-12-25",
    premise:
      "A ghost-hunting game the developers describe as inspired by Phasmophobia: gather evidence, work out which type of ghost you are dealing with, and explore haunted locations.",
    goodFor: "Teams who like solving a case together more than running from a monster. The developers list voice-chat lobbies.",
    warnings: "Horror elements, flashing lights and fear, per the developer.",
  },
  {
    universeId: 3171190217,
    placeId: "8267733039",
    name: "SPECTER",
    creator: "Lithium Labs",
    genre: "Survival",
    style: "Co-op ghost hunting",
    maxPlayers: 50,
    visits: 239_912_199,
    playingAtSnapshot: 160,
    created: "2021-12-16",
    premise:
      "Investigate haunted locations with friends: use your equipment to find evidence, identify the ghost, then escape before it hunts you. Hiding spots and stamina matter during a hunt.",
    goodFor: "Ghost hunting with friends. The developers say the in-game spirit box supports voice chat.",
    warnings: "Flashing lights, loud noises and scary scenes, per the developer.",
  },
  {
    universeId: 6331902150,
    placeId: "18687417158",
    name: "Forsaken",
    creator: "Forsaken Dev Team",
    genre: "Survival · 1 vs All",
    style: "Asymmetric killer vs survivors",
    maxPlayers: 9,
    visits: 5_889_125_682,
    playingAtSnapshot: 39_793,
    created: "2024-07-28",
    premise:
      "Survivors protect each other and complete objectives until a timer runs out; killers try to eliminate everyone. The developers describe it as in beta.",
    goodFor: "Players who want to play as, or against, the monster.",
    warnings: "Flashing lights and loud audio, per the developer.",
  },
  {
    universeId: 533435040,
    placeId: "1324061305",
    name: "Flicker",
    creator: "JJ Studios",
    genre: "Survival",
    style: "Social deduction horror",
    maxPlayers: 30,
    visits: 870_280_113,
    playingAtSnapshot: 338,
    created: "2018-01-12",
    premise:
      "When the lights go out, the murderer strikes. Everyone has a hidden ability, and you use clues, questioning and intuition to find the killer, or to be the one nobody catches.",
    goodFor: "Larger groups who enjoy bluffing and accusing each other. The developers added a party system so friends queue into the same match.",
  },
  {
    universeId: 1516533665,
    placeId: "4623386862",
    name: "Piggy",
    creator: "Piggy Dev Team",
    genre: "Survival",
    style: "Chase and escape",
    maxPlayers: 6,
    visits: 14_442_829_892,
    playingAtSnapshot: 18_469,
    created: "2020-01-23",
    premise:
      "Escape Piggy and uncover the mystery behind it, using items, crouching and traps.",
    goodFor: "Small groups and younger players who want short, readable chases.",
  },
  {
    universeId: 3647333358,
    placeId: "9872472334",
    name: "Evade",
    creator: "Hexagon Development Community",
    genre: "Survival",
    style: "Parkour chase horror",
    maxPlayers: 15,
    visits: 9_409_120_254,
    playingAtSnapshot: 58_080,
    created: "2022-06-10",
    premise:
      "An action parkour game where movement is what keeps you alive while Nextbots chase you through the map.",
    goodFor: "Friends who want fast, chaotic chases more than slow dread.",
    warnings: "Flashing lights and loud sounds, per the developer.",
  },
];

export const friendsGuide: ComparisonGuide = {
  id: "scary-roblox-games-with-friends",
  path: GUIDE_PATH,
  gameSlug: "stillskin-forest",
  title: GUIDE_TITLE,
  shortName: "Scary Roblox horror games to play with friends",
  description:
    "15 multiplayer Roblox horror games for a group, from co-op escapes to ghost hunts, sorted by how you play together. Numbers from Roblox, 31 Oct 2026.",
  blurb: "15 multiplayer and co-op horror games: DOORS, 99 Nights in the Forest, Blair, Forsaken, Flicker, Evade and more, grouped by how you play together.",
  snapshotDate: SNAPSHOT_DATE,
  question: "What are the best scary Roblox horror games to play with friends?",
  answer:
    "Every game here is multiplayer, and most are co-op horror, so pick by how your group likes to be scared. To **escape together**: DOORS, Pressure, Grace, The Mimic or Apeirophobia. To **survive the night as a team**: 99 Nights in the Forest, 3008, Dead Rails or The Rake REMASTERED. To **solve a haunting**: Blair or SPECTER. To **let someone play the monster**: Forsaken or Flicker. For **quick, loud chases**: Piggy or Evade. Then check server size, because it decides whether your whole group fits in one game.",
  disclosure: {
    before: "Disclosure: StillAwake Media makes ",
    linkText: "Stillskin Forest",
    href: "/games/stillskin-forest",
    after: ", a co-op survival-horror game for squads of up to four released on Roblox on 28 October 2026. It isn't on this list because we will not rank our own game against the games we are recommending. What we learned building it is in the last section.",
  },
  groups: [
    { label: "Big groups (16 or more per server)", min: 16 },
    { label: "Medium groups (10 to 15 per server)", min: 10, max: 15 },
    { label: "Small groups (under 10 per server)", max: 9 },
  ],
  sections: [
    {
      id: "escape",
      heading: "Escape together, room by room",
      intro: "Progress through rooms or levels as a group, where each death teaches you the next one. Best when everyone can stay on voice and call out what they see.",
      games: [2440500124, 4367208330, 6508759464, 2294168059, 3761186887],
    },
    {
      id: "survive",
      heading: "Survive the night as a team",
      intro: "Build, scavenge and hold out. These reward splitting jobs between friends: someone gathers, someone builds, someone watches.",
      games: [7326934954, 1000233041, 7018190066, 847722000],
    },
    {
      id: "ghosts",
      heading: "Hunt ghosts with evidence",
      intro: "Slower, investigative horror. You win by pooling clues, which makes them good for groups that like to talk through a problem.",
      games: [2239430935, 3171190217],
    },
    {
      id: "monster",
      heading: "One of you is the monster",
      intro: "Asymmetric games where a player is the killer. The fear comes from people, not scripts, so the same map plays differently every round.",
      games: [6331902150, 533435040],
    },
    {
      id: "chase",
      heading: "Quick, loud chases",
      intro: "Short rounds, easy to learn, lots of screaming. Good with younger players or when you have twenty minutes.",
      games: [1516533665, 3647333358],
    },
  ],
  experience: {
    heading: "What building a co-op horror game taught us about playing one with friends",
    intro:
      "We make Stillskin Forest, a co-op survival-horror game for squads of up to four that went public on Roblox on 28 October 2026. Designing it meant deciding, mechanic by mechanic, what makes horror better with friends. These are the things we look for in other games now, and they're a useful checklist when your group is choosing.",
    points: [
      {
        title: "A reason to go back for each other",
        body: "In Stillskin a downed player can be revived, so a squad has to choose between running and risking the rescue. Games where helping a teammate costs you something create the stories your group retells.",
      },
      {
        title: "A way to talk without voice chat",
        body: "Not every group can use voice. We added pings for threats and loot because a quick 'there' is often all a squad needs. If some of your friends can't use voice, check what a game offers instead.",
      },
      {
        title: "Something to do after you die",
        body: "A fallen Stillskin player becomes a ghost who can fly around the map, then respawns next to a teammate at dawn. Long waits in a lobby after an early death are where a group's evening falls apart, so it's worth checking how a game handles them.",
      },
      {
        title: "Fear that escalates",
        body: "Our nights get harder each time, with special nights such as Blood Moon and Heavy Fog. A game that ramps up keeps a group together for 'one more night'; one that peaks in the first ten minutes doesn't.",
      },
      {
        title: "A server your whole group fits in",
        body: "Server size is the hard limit. A four-person squad fits almost anywhere; a group of twelve rules out Piggy (6), The Rake REMASTERED (8) and Forsaken (9). The table above lists it for every game.",
      },
    ],
  },
  faqs: [
    {
      q: "What are the best co-op horror games on Roblox?",
      a: "If you want to work together against the game rather than against each other, start with the escape games (DOORS, Pressure, Grace, The Mimic, Apeirophobia), the survive-the-night games (99 Nights in the Forest, 3008, Dead Rails, The Rake REMASTERED) or the ghost hunts (Blair, SPECTER). Forsaken and Flicker are multiplayer too, but one player is the killer, so they are not purely co-op.",
    },
    {
      q: "What is the most-played multiplayer Roblox horror game right now?",
      a: "Of the 15 here, 99 Nights in the Forest had the most people playing when we checked (198,361 on 31 October 2026), followed by Evade (58,080) and Forsaken (39,793). Player counts change by the minute, so treat these as a snapshot.",
    },
    {
      q: "Which scary Roblox games are best for two players?",
      a: "Any of them work for two, since every game here holds at least six per server. For a duo, the ghost-hunting games (Blair, SPECTER) and the escape games (DOORS, Pressure) suit two people talking through a problem together.",
    },
    {
      q: "Which multiplayer horror games work for a big group?",
      a: "DOORS, Pressure, Grace, Blair and SPECTER hold up to 50 per server, The Mimic 45, Apeirophobia 40, Flicker 30 and 99 Nights in the Forest 25.",
    },
    {
      q: "Is this a ranking?",
      a: "No. Every game here is established and multiplayer. We grouped them by how you play together and took every number from Roblox's own listings so you can choose for your group.",
    },
    {
      q: "Where are the zombie games?",
      a: "Dead Rails is here because it is a journey a group takes together. For wave shooters, open-world zombie survival and base defence, see our guide to the best Roblox zombie games. For games built around lasting until morning, see Roblox horror survival games.",
    },
  ],
  related: [
    {
      label: "Best Roblox zombie games",
      href: "/games/guides/best-roblox-zombie-games",
      note: "12 zombie survival games compared: open worlds, wave shooters, historical settings and base defence.",
    },
    {
      label: "Roblox horror survival games",
      href: "/games/guides/roblox-horror-survival-games",
      note: "10 games where the goal is to survive the night, grouped by how you get through it.",
    },
    {
      label: "Stillskin Forest",
      href: "/games/stillskin-forest",
      note: "our own co-op zombie survival-horror game on Roblox, for squads of up to four.",
    },
    {
      label: "Playing Stillskin Forest with friends",
      href: "/games/stillskin-forest/wiki/getting-started/playing-with-friends",
      note: "Solo, Duo and Squad queues and the co-op tools a squad shares.",
    },
  ],
  keywords: ["guide", "best", "scary roblox games", "roblox horror games", "with friends", "survival horror", "multiplayer", "co-op horror", "co op"],
  games: guideGames,
};
