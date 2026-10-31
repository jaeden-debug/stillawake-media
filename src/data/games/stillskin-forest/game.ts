import type { Game, WikiCategory } from "@/data/games/types";

/**
 * Sources, in order of authority:
 *  1. The game's own configuration and item templates in the Studio place
 *     (ReplicatedStorage.GameConfig, ServerStorage.Items), read 2026-10-25.
 *  2. The Roblox session's project-state log of features verified in
 *     playtests with real input.
 *  3. The design/game report written alongside the build.
 *  4. The public Roblox listing (universe 7636493328), read 2026-10-26.
 *
 * Anything only (3) says, or that (2) lists as "not yet verified", is either
 * left out or published with that caveat.
 */

export const STILLSKIN_VERIFIED = "2026-10-25";

export const stillskinForest: Game = {
  id: "stillskin-forest",
  slug: "stillskin-forest",
  title: "Stillskin Forest",
  tagline: "The forest is beautiful. The nights are not.",
  summary:
    "A cooperative zombie survival-horror game on Roblox. Scavenge by day, survive escalating nights, and follow the clues to Blackthorn Asylum and what lives under the hill.",
  metaDescription:
    "Stillskin Forest is a co-op survival-horror game on Roblox by StillAwake Media. Scavenge by day, survive the nights, and uncover what lives under the hill.",
  description: [
    "Stillskin Forest is a cooperative survival-horror experience on Roblox, made by StillAwake Media. Your squad starts at an abandoned campground and pushes outward: down the forest trail to the ruined town of Stillwater, then up the hill to Blackthorn Asylum and the lake below it.",
    "Daylight is for scavenging food, medicine, weapons and ammunition, and for reading what the town left behind. When the sun goes down the infected multiply and start hunting. They see, hear gunshots, search where you were last seen, and remember the ladder they watched you climb. You decide whether to fight, run, hide, or go back for a downed teammate.",
    "Underneath the survival is a mystery: four relics, a ritual, and something the asylum's records describe as a heart beneath the hill.",
  ],
  developer: "StillAwake Media",
  publisher: "StillAwake Media",
  platforms: ["Roblox"],
  verifiedDevices: [],
  genre: ["Survival horror", "Co-op", "Zombie survival"],
  releaseStatus: "released",
  releaseDate: "2026-10-28",
  officialUrl: "https://www.roblox.com/games/111788627314883/Stillskin-Forest",
  publiclyPlayable: true,
  statusNote:
    "Stillskin Forest went public on Roblox on 28 October 2026. This site describes the published game; details may change between updates, and every page shows the date it was last checked.",
  spotlight: {
    blurbEn:
      "A co-op zombie survival-horror game on Roblox for up to four players. Scavenge by day, survive the night, and find out what happened in the forest.",
    blurbFr:
      "Un jeu coopératif de survie et d'horreur sur Roblox, jusqu'à quatre joueurs. Fouillez le jour, survivez à la nuit et découvrez ce qui s'est passé dans la forêt.",
    links: [
      { href: "/games/stillskin-forest/wiki/getting-started/how-to-play", labelEn: "How to play", labelFr: "Comment jouer (en anglais)" },
      { href: "/games/stillskin-forest/wiki", labelEn: "Official wiki", labelFr: "Wiki officiel (en anglais)" },
      { href: "/games/stillskin-forest/wiki/getting-started/controls", labelEn: "Controls", labelFr: "Commandes (en anglais)" },
      { href: "/games/stillskin-forest/wiki/updates/development-log", labelEn: "What's new", labelFr: "Nouveautés (en anglais)" },
    ],
  },
  behindTheGame: [
    {
      title: "How to optimize a Roblox game for PS4",
      href: "/stillawake-times/how-to-optimize-a-roblox-game-for-ps4",
      blurb: "Our console performance case study: what we measured, what shipped and what still needs a real PS4.",
    },
    {
      title: "How to make a Roblox game with AI agents",
      href: "/stillawake-times/how-to-make-a-roblox-game-with-ai-agents",
      blurb: "The moderator-led workflow we use to build Stillskin Forest with a team of AI coding agents.",
    },
    {
      title: "How to make a horror game in Roblox Studio",
      href: "/stillawake-times/how-to-make-a-horror-game-in-roblox-studio",
      blurb: "Lighting, sound, enemy perception and hiding, from building Stillskin Forest.",
    },
  ],
  features: [
    {
      title: "Infected that hunt with intent",
      body: "They notice you, call others, search your last position and give up a chase instead of tracking you across the map. A sprinting survivor is only slightly faster than the fastest of them.",
    },
    {
      title: "Hiding is not the same as safe",
      body: "Get seen ducking into a locker and the Dread Encounter begins: the chase goes quiet, and something walks up to the grate and stares.",
    },
    {
      title: "Nights that escalate",
      body: "Night brings far more infected than the day, and from Night 2 a special night can roll: Blood Moon, Heavy Fog, Infected Surge or Silent Night.",
    },
    {
      title: "Built for a squad",
      body: "Revive downed teammates, ping threats and loot, hand over ammo, and keep playing as a ghost after you fall.",
    },
    {
      title: "A town worth searching",
      body: "St. Agnes Hospital, the morgue, the diner, the general store, houses with attics and hidden rooms, a storm drain under the park, and nine secrets to find.",
    },
    {
      title: "A mystery with two endings",
      body: "Unlock Blackthorn Asylum, recover four relics, and choose between putting the Hollow to sleep or going down to finish it.",
    },
  ],
  media: {
    screenshots: [
      "stillskin-forest-night-chase",
      "stillskin-forest-campgrounds",
      "stillskin-forest-hospital",
      "stillskin-forest-blackthorn-asylum",
      "stillskin-forest-green-lake",
    ],
    hero: "stillskin-forest-hero",
    thumbnail: "stillskin-forest-thumbnail",
    icon: "stillskin-forest-icon",
    cover: "stillskin-forest-cover",
    trailerPoster: "stillskin-forest-trailer-poster",
    social: "stillskin-forest-social",
  },
  accent: "#7FA36B",
  accentSoft: "#b9d4a8",
  kindLabel: "Co-op Survival Horror on Roblox",
  playersLabel: "Solo, Duo or Squad of 4",
  landing: {
    featuresTitle: "What makes it Stillskin Forest",
    showcase: { category: "enemies", title: "The infected", linkLabel: "All enemies", exclude: ["enemy-comparison"] },
    strip: {
      title: "Places to survive",
      slugs: ["campgrounds", "stillwater", "st-agnes-hospital", "blackthorn-asylum", "green-lake", "the-hollow"],
      category: "locations",
    },
    wikiCtaTitle: "Every weapon, enemy, place and secret, documented.",
    wikiCtaBody: "is written from the game's own data. Story pages hide spoilers until you open them.",
  },
  wikiBlurb: {
    title: "Official Guides, Weapons and Enemies",
    description:
      "The official Stillskin Forest wiki: weapons, enemies, locations, survival mechanics, quests, story and updates, written from the game's own data.",
    intro: "guides on weapons, enemies, places, survival and story, written from the game itself. Story pages hide spoilers until you open them.",
  },
  related: ["risk-it"],
  lastVerified: STILLSKIN_VERIFIED,
  featuredGuides: [
    "how-to-play",
    "surviving-your-first-night",
    "the-dread-encounter",
    "enemy-comparison",
    "blackthorn-admission-ledger",
    "weapons-compared",
  ],
  beginnerGuides: [
    "what-is-stillskin-forest",
    "how-to-play",
    "controls",
    "surviving-your-first-night",
    "playing-with-friends",
    "faq",
  ],
};

export const stillskinCategories: WikiCategory[] = [
  {
    id: "getting-started",
    slug: "getting-started",
    title: "Getting Started",
    navLabel: "Getting Started",
    description:
      "New to Stillskin Forest? How the game works, the controls, your first night, and playing with friends.",
    intro:
      "Start here. These guides cover what the game is, how a run works, the full control list, and how to make it through your first night.",
  },
  {
    id: "weapons",
    slug: "weapons",
    title: "Weapons",
    navLabel: "Weapons",
    description:
      "Every weapon in Stillskin Forest: damage, attack speed, range, magazine, reload and durability from the game's own configuration.",
    intro:
      "Melee weapons are quiet and never run out of ammunition; guns end fights faster and tell every infected nearby where you are. Stats below come straight from the game's item data.",
  },
  {
    id: "items",
    slug: "items",
    title: "Items & Equipment",
    navLabel: "Items",
    description:
      "Food, medicine, ammunition, the headlamp, lanterns and upgrades in Stillskin Forest: what each one does and how to use it.",
    intro:
      "Everything you can pick up that is not a weapon: healing, ammunition, light, and the parts that make your headlamp better.",
  },
  {
    id: "enemies",
    slug: "enemies",
    title: "Enemies",
    navLabel: "Enemies",
    description:
      "The infected of Stillskin Forest: Walker, Runner, Screamer, Brute and the Watcher. Health, speed, damage and how to survive each.",
    intro:
      "Four kinds of infected hunt you, and one thing only watches. Their numbers come from the game's configuration.",
  },
  {
    id: "mechanics",
    slug: "mechanics",
    title: "Survival Mechanics",
    navLabel: "Mechanics",
    description:
      "How Stillskin Forest works under the hood: stamina, detection, hiding, the Dread Encounter, health, revives, inventory, climbing and building.",
    intro:
      "The rules of survival. Each guide answers one question directly, then explains the system behind it.",
  },
  {
    id: "locations",
    slug: "locations",
    title: "Locations",
    navLabel: "Locations",
    description:
      "Every area of Stillskin Forest, from the Campgrounds and Stillwater to Blackthorn Asylum, Green Lake and the Hollow.",
    intro:
      "The map runs from the Campgrounds in the north, down the forest trail into Stillwater, and up the hill to Blackthorn. Some places are underground.",
  },
  {
    id: "special-nights",
    slug: "special-nights",
    title: "Special Nights",
    navLabel: "Special Nights",
    description:
      "Blood Moon, Heavy Fog, Infected Surge and Silent Night: what each special night changes in Stillskin Forest and how to adapt.",
    intro:
      "Night 1 is always normal. From Night 2, each dusk can roll a special night that changes how many infected come, how fast they are, and how far anyone can see.",
  },
  {
    id: "story",
    slug: "story",
    title: "Story & Lore",
    navLabel: "Story & Lore",
    description:
      "The story of Stillskin Forest: Stillwater, Blackthorn Asylum, Dr. H. Vance, E. Hollis, the four relics and the Hollow beneath the hill.",
    intro:
      "What happened to Stillwater, told through notes, tapes and graves. Story pages contain spoilers, which stay hidden until you open them.",
  },
  {
    id: "quests",
    slug: "quests",
    title: "Quests & Walkthroughs",
    navLabel: "Quests",
    description:
      "Step-by-step Stillskin Forest walkthroughs: unlocking Blackthorn Asylum, the four relics, the Rite of Stillness, and the Heart of Stillskin.",
    intro:
      "The route through the mystery, in order. Walkthroughs are published only for content confirmed in the current build.",
  },
  {
    id: "campaign",
    slug: "campaign",
    title: "Campaign",
    navLabel: "Campaign",
    description:
      "The Ranger's Last Transmission, the Stillskin Forest V3 campaign: how it starts, its chapters, journals and tapes, the Watchers, the Astral and the endings.",
    intro:
      "Pre-release draft guides to the V3 campaign, The Ranger's Last Transmission. Story reveals stay behind spoiler controls, and every mechanic will be checked against the released game.",
  },
  {
    id: "multiplayer",
    slug: "multiplayer",
    title: "Co-op & End of Run",
    navLabel: "Co-op",
    description:
      "Playing Stillskin Forest as a squad: revives, pings, sharing items, ghost spectating, the last survivor and the rooftop finale.",
    intro:
      "Stillskin Forest is built for squads. These guides cover what changes when you play together, and how a run ends.",
  },
  {
    id: "updates",
    slug: "updates",
    title: "Updates",
    navLabel: "Updates",
    description:
      "Stillskin Forest development log and update history, with the documentation each change affected.",
    intro:
      "Development milestones and, once the game is public, release notes. Dates are the day a change was confirmed in the build.",
  },
];
