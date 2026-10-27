import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "progression", verification: "verified_live", lastVerified: VERIFIED } as const;

export const progression: WikiEntry[] = [
  {
    ...base,
    slug: "guts",
    title: "GUTS",
    seoTitle: "GUTS in RISK IT!: How to Earn It and What It's For",
    description:
      "GUTS is RISK IT!'s currency. How much each challenge pays, how the Hot Seat doubles it, and what you can spend it on in THE VAULT.",
    question: "How do you get GUTS in RISK IT!?",
    answer:
      "You earn GUTS by winning challenges. Each challenge pays differently, from 20 GUTS for one safe press of THE BUTTON to over 1,000 for a full pot, and the day's Hot Seat challenge pays double. Fails cost nothing. GUTS is spent in THE VAULT on cosmetic fail trails and launch bursts.",
    facts: [
      ["Starting GUTS", "0"],
      ["Earned by", "Winning challenges"],
      ["Lost by", "Nothing (fails are free)"],
      ["Hot Seat", "2× payout on one challenge per day"],
      ["Spent in", "THE VAULT (cosmetics only)"],
      ["Bought with Robux", "No"],
    ],
    media: "risk-it-win-banked-it",
    sections: [
      {
        id: "payouts",
        heading: "What each challenge pays",
        blocks: [
          { type: "table", caption: "GUTS payout by challenge", head: ["Challenge", "Payout"], rows: [
            ["[THE BUTTON](@the-button)", "The pot you cash out: 20 to 1,280"],
            ["[PERFECT STOP](@perfect-stop)", "60 + 35 per perfect"],
            ["[QUICK DRAW](@quick-draw)", "40–150, faster pays more"],
            ["[THE SWEEPER](@the-sweeper)", "60–180, faster pays more"],
            ["[DOOR NUMBER WHO](@door-number-who)", "120"],
            ["[MELTDOWN](@meltdown)", "90 + 25 per close call"],
            ["[COPY THAT](@copy-that)", "48–253 by length"],
            ["[LONG SHOT](@long-shot)", "40 + 30% of your points"],
          ] },
          { type: "p", text: "Your total shows at the top of the screen and on the player list. Every win flashes the amount with confetti." },
        ],
      },
      {
        id: "spending",
        heading: "Spending GUTS",
        blocks: [
          { type: "p", text: "The only thing to buy is style: [fail trails](@fail-trails) and [launch bursts](@launch-bursts) in [THE VAULT](@the-vault). Nothing in the game changes your odds, and no GUTS can be bought for Robux." },
        ],
      },
    ],
    related: ["the-vault", "hot-seat", "medals", "challenges-compared"],
    sources: [SRC.source, SRC.tests],
    aliases: ["guts", "currency", "money", "coins", "cash", "earn guts"],
  },
  {
    ...base,
    slug: "medals",
    title: "Medals",
    seoTitle: "RISK IT! Medals: Every Bronze, Silver and Gold Target",
    description:
      "All 24 RISK IT! medals: the bronze, silver and gold target for each of the eight challenges, and how the medal count on your screen works.",
    question: "How do medals work in RISK IT!?",
    answer:
      "Each of the eight challenges has a bronze, silver and gold medal, 24 in all. A medal is decided by how well you win: a bigger pot, more perfects, a faster time and so on. Each challenge keeps your best medal, and the counter on your screen adds them up as points (bronze 1, silver 2, gold 3), up to 24.",
    facts: [
      ["Medals", "24 (3 per challenge)"],
      ["Kept", "Your best medal per challenge"],
      ["Medal points", "Bronze 1 · Silver 2 · Gold 3 (max 24)"],
    ],
    media: "risk-it-hub",
    sections: [
      {
        id: "targets",
        heading: "Every medal target",
        blocks: [
          { type: "table", caption: "RISK IT! medal targets", head: ["Challenge", "Bronze", "Silver", "Gold"], rows: [
            ["[THE BUTTON](@the-button)", "Pot 40", "Pot 160", "Pot 640"],
            ["[PERFECT STOP](@perfect-stop)", "Clear all 3", "1 perfect", "2 perfects"],
            ["[QUICK DRAW](@quick-draw)", "Any win", "≤ 340 ms", "≤ 260 ms"],
            ["[THE SWEEPER](@the-sweeper)", "Finish", "≤ 8.5 s", "≤ 6.5 s"],
            ["[DOOR NUMBER WHO](@door-number-who)", "Clear 3 rounds", "< 11 s total", "< 7 s total"],
            ["[MELTDOWN](@meltdown)", "Survive", "2 close calls", "4 close calls"],
            ["[COPY THAT](@copy-that)", "4 arrows", "6 arrows", "8 arrows"],
            ["[LONG SHOT](@long-shot)", "100 points", "250 points", "500 points"],
          ] },
          { type: "p", text: "THE BUTTON is the one challenge where a win can come with no medal: cashing out at 20 banks GUTS but is below bronze." },
        ],
      },
      {
        id: "where-to-see",
        heading: "Where to see them",
        blocks: [
          { type: "p", text: "Your medal points sit in the top bar. Each challenge pad's sign shows your best result there, or NO CLEAR YET if you've tried it but not won." },
        ],
      },
    ],
    related: ["personal-bests", "challenges-compared", "guts", "beginner-tips"],
    sources: [SRC.source, SRC.tests],
    aliases: ["medals", "gold", "silver", "bronze", "medal targets", "all medals"],
  },
  {
    ...base,
    slug: "personal-bests",
    title: "Personal Bests",
    seoTitle: "Personal Bests in RISK IT!: What Each Challenge Tracks",
    description:
      "RISK IT! keeps a personal best on every challenge: biggest pot, fastest reaction, most close calls and more. What each one measures and where it shows.",
    question: "What counts as a personal best in RISK IT!?",
    answer:
      "Every challenge records your best winning result, measured the same way as its medals: biggest pot, most perfects, fastest reaction, fastest time, most close calls, longest sequence or best ring. Beat it and the win screen tells you so. Your best shows on the challenge's sign.",
    facts: [
      ["Tracked", "One best per challenge, wins only"],
      ["Shown", "On each challenge's pad sign"],
    ],
    sections: [
      {
        id: "what-is-tracked",
        heading: "What each challenge tracks",
        blocks: [
          { type: "table", caption: "Personal best by challenge", head: ["Challenge", "Best", "Better is"], rows: [
            ["THE BUTTON", "Biggest pot", "Higher"],
            ["PERFECT STOP", "Perfects", "Higher"],
            ["QUICK DRAW", "Reaction (ms)", "Lower"],
            ["THE SWEEPER", "Fastest (s)", "Lower"],
            ["DOOR NUMBER WHO", "Fastest (s)", "Lower"],
            ["MELTDOWN", "Close calls", "Higher"],
            ["COPY THAT", "Longest sequence", "Higher"],
            ["LONG SHOT", "Best ring", "Higher"],
          ] },
        ],
      },
    ],
    related: ["medals", "challenges-compared", "instant-retry"],
    sources: [SRC.source],
    aliases: ["personal best", "pb", "record", "best time", "high score"],
  },
  {
    ...base,
    slug: "titles-and-wipeouts",
    title: "Titles and Wipeouts",
    seoTitle: "RISK IT! Titles: Every Wipeout Title and How to Unlock It",
    description:
      "In RISK IT! failing is progress: every wipeout counts toward titles shown over your head, from FRESH MEAT to UNKILLABLE at 400 wipeouts.",
    question: "How do you get titles in RISK IT!?",
    answer:
      "Titles come from wipeouts, not wins. Every time a challenge launches you, your wipeout count goes up, and at 5, 20, 60, 150 and 400 wipeouts you earn a new title shown over your head. Everyone starts as FRESH MEAT.",
    facts: [
      ["Earned from", "Wipeouts (fails)"],
      ["Titles", "6"],
      ["Top title", "UNKILLABLE (400 wipeouts)"],
    ],
    sections: [
      {
        id: "all-titles",
        heading: "All titles",
        blocks: [
          { type: "table", caption: "RISK IT! titles", head: ["Wipeouts", "Title"], rows: [
            ["0", "FRESH MEAT"],
            ["5", "SLIGHTLY BRUISED"],
            ["20", "CRASH TEST DUMMY"],
            ["60", "PROFESSIONAL YEETEE"],
            ["150", "GRAVITY'S FAVORITE"],
            ["400", "UNKILLABLE"],
          ] },
          { type: "p", text: "Your wipeout count is in the top bar next to your GUTS. Your title shows over your head to other players (your own tag is hidden from you so it doesn't block the view)." },
        ],
      },
    ],
    related: ["wipeouts-and-recovery", "medals", "fail-trails"],
    sources: [SRC.source],
    aliases: ["titles", "wipeouts", "rank", "unkillable", "name tag"],
  },
  {
    ...base,
    slug: "hot-seat",
    title: "Hot Seat",
    seoTitle: "RISK IT! Hot Seat: Today's Double-GUTS Challenge",
    description:
      "Each day one RISK IT! challenge is the Hot Seat and pays double GUTS. How it rotates, when it changes, and how to spot it in the hub.",
    question: "What is the Hot Seat in RISK IT!?",
    answer:
      "The Hot Seat is one challenge per day that pays double GUTS. It rotates through all eight challenges in order and changes at midnight UTC. The banner at the top of the screen names today's Hot Seat.",
    facts: [
      ["Bonus", "2× GUTS"],
      ["Changes", "Daily at 00:00 UTC"],
      ["Order", "Button, Stop, Draw, Sweeper, Doors, Meltdown, Copy, Long Shot"],
    ],
    media: "risk-it-hub",
    sections: [
      {
        id: "how-it-works",
        heading: "How it works",
        blocks: [
          { type: "p", text: "The doubling applies to the GUTS payout only; medals and personal bests are unchanged. Every server picks the same Hot Seat because it's worked out from the date." },
          { type: "callout", tone: "tip", text: "On a THE BUTTON Hot Seat day, a 640 pot banks 1,280 GUTS." },
        ],
      },
    ],
    related: ["guts", "challenges-compared", "the-vault"],
    sources: [SRC.source],
    aliases: ["hot seat", "daily", "double guts", "bonus", "2x"],
  },
];
