import type { GameUpdate, WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

/** Builds, newest first. Version numbers are the game's own (shown in Config). */
export const riskItUpdates: GameUpdate[] = [
  {
    id: "2026-10-26-v0-2-2",
    version: "0.2.2",
    date: "2026-10-26",
    title: "v0.2.2: phone layout pass",
    kind: "public-release",
    newFeatures: [],
    changes: [
      "Movement challenges use a slim panel docked at the top so the play area stays visible on phones.",
      "The RISK IT! prompt sits at pad level and no longer overlaps the top bar.",
      "Your own title tag is hidden from you; one clear retry call-to-action.",
      "No keyboard hints on touch screens; THE VAULT scroll resets per tab.",
    ],
    fixes: ["The win stamp drifted under the top bar on small screens."],
    balance: [],
    knownIssues: [
      "Tested in Studio's Device Simulator; not yet on real phones.",
      "Saving progress on live servers not yet confirmed.",
    ],
    relatedEntries: ["playing-on-phone-and-tablet", "controls"],
  },
  {
    id: "2026-10-26-v0-2-1",
    version: "0.2.1",
    date: "2026-10-26",
    title: "v0.2.1: effects and cosmetics pass",
    kind: "development-milestone",
    newFeatures: ["A chase camera follows you through every fail."],
    changes: [
      "Wider, longer trails with a glow; Re-entry and Full Spectrum recoloured to stand apart.",
      "Launch bursts stream from your body during the flight; Overcharged rebuilt.",
      "Phone layout: panel and stamp scale with screen height; medals moved clear of the jump button.",
    ],
    fixes: [
      "Launch bursts and win confetti weren't visible to players.",
      "QUICK DRAW's catapult plate could swat players back down mid-launch.",
    ],
    balance: [],
    knownIssues: [],
    relatedEntries: ["fail-trails", "launch-bursts", "quick-draw", "wipeouts-and-recovery"],
  },
  {
    id: "2026-10-26-v0-2-0",
    version: "0.2.0",
    date: "2026-10-26",
    title: "v0.2.0: three new challenges and THE VAULT",
    kind: "development-milestone",
    newFeatures: [
      "MELTDOWN: survive a collapsing floor.",
      "COPY THAT: arrow memory with bank-or-go-again.",
      "LONG SHOT: the cannon and the 100, 250 and 500 rings.",
      "THE VAULT: five fail trails and five launch bursts bought with GUTS.",
    ],
    changes: [],
    fixes: ["Space was captured in movement challenges, so you couldn't jump."],
    balance: [],
    knownIssues: [],
    relatedEntries: ["meltdown", "copy-that", "long-shot", "the-vault"],
  },
  {
    id: "2026-10-26-v0-1-0",
    version: "0.1.0",
    date: "2026-10-26",
    title: "v0.1.0: first build",
    kind: "development-milestone",
    newFeatures: [
      "The hub and five challenges: THE BUTTON, PERFECT STOP, QUICK DRAW, THE SWEEPER and DOOR NUMBER WHO.",
      "Ragdoll fails with headlines, GUTS, medals, personal bests, wipeout titles and the daily Hot Seat.",
    ],
    changes: [],
    fixes: [],
    balance: [],
    knownIssues: [],
    relatedEntries: ["the-button", "perfect-stop", "quick-draw", "the-sweeper", "door-number-who", "hot-seat"],
  },
];

export const updates: WikiEntry[] = [
  {
    slug: "development-log",
    category: "updates",
    title: "RISK IT! Update Log",
    seoTitle: "RISK IT! Updates and Patch Notes",
    description:
      "What's new in RISK IT!: every build from v0.1.0 to v0.2.2 with new challenges, changes, fixes and known issues, dated as confirmed in the game.",
    question: "What's new in RISK IT!?",
    answer:
      "The current build is v0.2.2 (26 October 2026), the build that went public on Roblox on 27 October 2026. It added a phone layout pass on top of v0.2.1's effects pass and v0.2.0's three new challenges (MELTDOWN, COPY THAT and LONG SHOT) and THE VAULT cosmetic shop.",
    sections: [],
    related: ["what-is-risk-it", "challenges-compared"],
    verification: "verified_live",
    sources: [SRC.source],
    lastVerified: VERIFIED,
    aliases: ["updates", "patch notes", "changelog", "what's new", "version"],
  },
];
