import type { GameUpdate, WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

/**
 * Development milestones, dated by when each change was confirmed in the
 * build. There are no public version numbers yet, so `version` is null; do not
 * invent one. Public releases get kind "public-release" once they happen.
 */
export const stillskinUpdates: GameUpdate[] = [
  {
    id: "2026-10-25-development-build",
    version: null,
    date: "2026-10-25",
    title: "Development build: Blackthorn, the Hollow, the lobby and survivor systems",
    kind: "development-milestone",
    newFeatures: [
      "Blackthorn Hill: the asylum, graveyard, chapel, crypt cave and Green Lake.",
      "The asylum unlock via the Blackthorn Admission Ledger.",
      "The four relics and the Rite of Stillness ending.",
      "The Hollow: the Weeping Gallery, the Root Gate and the Heart of Stillskin ending.",
      "Hiding spots, the Dread Encounter and dread zones.",
      "Nine secrets and the Stillwater easter eggs.",
      "Doors the infected must bash open; building with the Hammer and Crowbar.",
      "Crouch, stealth takedowns, team pings and giving items.",
      "Lantern, headlamp battery and headlamp parts.",
      "Weapon durability.",
      "Lobby with Solo, Duo and Squad queues; journal with notes, achievements and map.",
      "Zone music and an audio mix with indoor, hall and cave reverb.",
    ],
    changes: [
      "Climbing is ladder-only; cars and furniture must be jumped onto.",
      "Infected swing with a real hand hit and slow down during the wind-up.",
      "Only two infected may attack one survivor in any 1.6-second window, with 0.45 s of grace after each hit.",
      "Indoor camera pulls in closer; first person hides your own head and hair.",
      "Night population tripled (up to 72).",
    ],
    fixes: [
      "Infected could wander off the map and lead players out of bounds.",
      "Interaction prompts swallowed clicks near the crosshair.",
      "Attic dolls, rocking chair and mannequin didn't work under streaming.",
      "Heart guardian waves kept spawning after players left.",
    ],
    balance: [
      "Walker damage 12 → 10.",
      "Melee durability roughly doubled.",
      "Wear when hit 2 → 1.",
      "Root Gate lever window 4 s → 6 s; Hollow bridge stays up 3 s after release.",
    ],
    knownIssues: [
      "Controller and touch controls not yet tested on real devices.",
      "Multi-player Return to Camp voting not yet recorded.",
      "Audio levels set without a listening pass.",
    ],
    relatedEntries: [
      "blackthorn-asylum", "the-rite-of-stillness", "the-heart-of-stillskin", "the-dread-encounter",
      "doors-and-building", "crouching-and-takedowns", "durability-and-wear", "secrets-and-easter-eggs",
    ],
  },
];

export const updates: WikiEntry[] = [
  {
    slug: "development-log",
    category: "updates",
    title: "Stillskin Forest Development Log",
    seoTitle: "Stillskin Forest Updates and Development Log",
    description:
      "What's new in Stillskin Forest: dated development milestones with new features, changes, fixes, balance changes and known issues.",
    question: "What's new in Stillskin Forest?",
    answer:
      "The most recent milestone (25 October 2026) added Blackthorn Hill, the asylum quest, the four relics and two endings, hiding and the Dread Encounter, building, crouch and takedowns, the lobby and squads, and a long list of fixes. The game has no public version numbers yet.",
    sections: [],
    related: ["what-is-stillskin-forest", "how-to-play"],
    verification: "verified_live",
    sources: [SRC.playtest],
    lastVerified: VERIFIED,
    aliases: ["updates", "patch notes", "changelog", "what's new", "news", "version"],
  },
];
