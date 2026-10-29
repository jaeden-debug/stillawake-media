import type { Game, WikiCategory } from "@/data/games/types";

/**
 * Sources, in order of authority:
 *  1. The game's own source: shared Config and the server challenge modules
 *     (build v0.2.2, 26 Oct 2026). Every number on these pages is read from it.
 *  2. The automated Studio regression run (25/25 checks) and the Studio Device
 *     Simulator pass (iPhone XR), 26 Oct 2026.
 *  3. The public Roblox listing (universe 10773223333), published 26 Oct 2026.
 *
 * Not confirmed yet, and said so where it matters: saving progress on live
 * servers, real phones, and multiplayer under real network lag.
 */

export const RISK_IT_VERIFIED = "2026-10-26";

export const riskIt: Game = {
  id: "risk-it",
  slug: "risk-it",
  title: "RISK IT!",
  tagline: "Walk up. Risk it. Get launched. Try again.",
  summary:
    "A neon game show floating in the void: eight tiny challenges, five to twenty seconds each. Win and you bank GUTS. Fail and you get ragdolled into orbit, then you land next to the pad and go again.",
  metaDescription:
    "RISK IT! is a Roblox minigame game by StillAwake Media: eight 5–20 second challenges, ragdoll fails, medals and a cosmetic shop. Works solo or with friends.",
  description: [
    "RISK IT! is a minigame game on Roblox, made by StillAwake Media. You spawn on a neon hub floating over a synthwave void, with eight challenge islands around you. Walk onto a glowing pad, press RISK IT!, and you are in: a press-your-luck button, a timing needle, a reaction test, a bridge of spinning arms, three doors with a trap behind one, a floor that falls away, a memory game, and a cannon.",
    "Every challenge takes between five and twenty seconds. Win and you bank GUTS, the game's currency, and chase bronze, silver and gold medals. Fail and the game makes a show of it: a trapdoor, a spring-loaded boxing glove, a catapult or a blast sends your ragdoll flying, a headline stamps across the screen, and the crowd laughs. You land beside the pad, facing it, about three seconds later.",
    "It is built to work alone. Other players make the fails louder, but nothing waits for a full server.",
  ],
  developer: "StillAwake Media",
  publisher: "StillAwake Media",
  platforms: ["Roblox"],
  verifiedDevices: [],
  genre: ["Party & Casual", "Minigames", "Ragdoll"],
  releaseStatus: "released",
  releaseDate: "2026-10-27",
  officialUrl: "https://www.roblox.com/games/128665544571489/RISK-IT",
  publiclyPlayable: true,
  statusNote:
    "RISK IT! went public on Roblox on 27 October 2026 (Maturity: Minimal; open to players 16+ for now, as of 29 October 2026). This site documents build v0.2.2 as of 26 October 2026; balance, prices and challenges may change between updates, and every page shows the date it was last checked.",
  features: [
    {
      title: "Eight challenges, eight different skills",
      body: "Press your luck, stop a needle, react to a light, cross a bridge, read a flickering lamp, dodge a falling floor, repeat arrows, and aim a cannon. No two use the same input.",
    },
    {
      title: "Failure is the show",
      body: "Every fail launches your ragdoll with its own gag (trapdoor, glove, catapult, blast, sweep or spring), a stamped headline and a chase camera, then puts you back on your feet in about 2.6 seconds.",
    },
    {
      title: "One tap to go again",
      body: "You land next to the pad, facing it, with the RISK IT! prompt already up. A retry is a single tap.",
    },
    {
      title: "Honest odds",
      body: "THE BUTTON shows the exact chance that the next press drops you. The server decides every outcome; nothing is weighted against you and nothing is for sale.",
    },
    {
      title: "Medals, bests and a daily Hot Seat",
      body: "24 medals, a personal best on every challenge, wipeout titles, and one challenge each day that pays double GUTS.",
    },
    {
      title: "Fail in style",
      body: "Spend GUTS in THE VAULT on fail trails and launch bursts. Everything in it is cosmetic and earned by playing.",
    },
  ],
  media: {
    screenshots: [
      "risk-it-launch-full-spectrum",
      "risk-it-long-shot-flight",
      "risk-it-the-button",
      "risk-it-meltdown",
      "risk-it-win-banked-it",
      "risk-it-arena-aerial",
    ],
    hero: "risk-it-hero",
    thumbnail: "risk-it-thumbnail",
    icon: "risk-it-icon",
    social: "risk-it-social",
  },
  accent: "#FF2E63",
  accentSoft: "#FFD60A",
  kindLabel: "Minigames and Ragdoll Fails on Roblox",
  playersLabel: "Solo or with friends",
  landing: {
    featuresTitle: "What makes it RISK IT!",
    showcase: {
      category: "challenges",
      title: "The eight challenges",
      linkLabel: "All challenges",
      exclude: ["challenges-compared"],
      withImages: true,
    },
    strip: {
      title: "Earn, unlock, show off",
      slugs: ["guts", "medals", "hot-seat", "the-vault", "titles-and-wipeouts", "personal-bests"],
      category: "progression",
    },
    wikiCtaTitle: "Every challenge, medal and cosmetic, documented.",
    wikiCtaBody: "is written from the game's own source: exact odds, timings, payouts and medal targets for every challenge.",
  },
  wikiBlurb: {
    title: "Official Guides, Challenges and Progression",
    description:
      "The official RISK IT! wiki: all eight challenges with exact odds, timings and medal targets, plus GUTS, medals, the Hot Seat, THE VAULT and controls.",
    intro: "guides on the challenges, medals, GUTS, cosmetics and controls, written from the game's own source.",
  },
  related: ["stillskin-forest"],
  lastVerified: RISK_IT_VERIFIED,
  featuredGuides: ["how-to-play", "the-button", "challenges-compared", "medals", "the-vault", "beginner-tips"],
  beginnerGuides: ["what-is-risk-it", "how-to-play", "controls", "beginner-tips", "playing-on-phone-and-tablet", "faq"],
};

export const riskItCategories: WikiCategory[] = [
  {
    id: "getting-started",
    slug: "getting-started",
    title: "Getting Started",
    navLabel: "Getting Started",
    description:
      "New to RISK IT!? What the game is, how a challenge works, the controls on every device, beginner tips and the FAQ.",
    intro: "Start here. The player manual: what the game is, how to start a challenge, the full control list, and what to try first.",
  },
  {
    id: "challenges",
    slug: "challenges",
    title: "Challenges",
    navLabel: "Challenges",
    description:
      "All eight RISK IT! challenges: THE BUTTON, PERFECT STOP, QUICK DRAW, THE SWEEPER, DOOR NUMBER WHO, MELTDOWN, COPY THAT and LONG SHOT.",
    intro:
      "Each challenge has its own island, its own fail and its own medal targets. Numbers below come straight from the game's source.",
  },
  {
    id: "progression",
    slug: "progression",
    title: "GUTS & Medals",
    navLabel: "GUTS & Medals",
    description:
      "How progression works in RISK IT!: GUTS, the 24 medals, personal bests, wipeout titles and the daily Hot Seat.",
    intro: "What you earn and what it means. Nothing here requires grinding, and nothing is for sale.",
  },
  {
    id: "vault",
    slug: "vault",
    title: "THE VAULT",
    navLabel: "THE VAULT",
    description: "THE VAULT, RISK IT!'s cosmetic shop: every fail trail and launch burst, what it looks like and what it costs in GUTS.",
    intro: "Spend GUTS on how you fail. Everything is cosmetic, has a fixed price, and is bought with GUTS earned by playing.",
  },
  {
    id: "mechanics",
    slug: "mechanics",
    title: "How It Works",
    navLabel: "How It Works",
    description:
      "The systems behind RISK IT!: ragdoll fails and recovery, instant retry, how outcomes are decided fairly, and playing with friends.",
    intro: "The rules underneath every challenge. Each guide answers one question directly, then explains the system.",
  },
  {
    id: "updates",
    slug: "updates",
    title: "Updates",
    navLabel: "Updates",
    description: "RISK IT! update history: what each build added, changed and fixed, with the documentation it affected.",
    intro: "Builds, newest first. Dates are the day a change was confirmed in the game.",
  },
];
