import type { GameUpdate, WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

/**
 * Development milestones, dated by when each change was confirmed in the
 * build. There are no public version numbers yet, so `version` is null; do not
 * invent one. Public releases get kind "public-release" once they happen.
 */
export const stillskinUpdates: GameUpdate[] = [
  {
    id: "2026-10-27-blackpine-expansion",
    version: null,
    date: "2026-10-27",
    title: "Blackpine expansion: the airfield, military gear, night survival and power",
    kind: "development-milestone",
    newFeatures: [
      "Blackpine Airfield: a military base south of the ranger station, with a runway, control tower, hangar, command center, two barracks and vehicles.",
      "Soldier infected, only at the airfield, some wearing helmets that soak the first headshot.",
      "Rare military gear: the Plate Carrier, the Military Helmet and the Mini AK, each with one chance a day to appear at the airfield.",
      "Wearable armor that absorbs part of every hit until it wears out (K takes it off).",
      "Night hunting: a share of the infected near you search your area after dark.",
      "Green wisps that lead to night stashes or toward relics, and glowing night caches that only exist at night.",
      "Sleep until dawn in a boarded-up building, for 25 health.",
      "Ammo dropped by the infected you kill.",
      "Generators fuelled by Gas Cans (one chance per map section per day) that power the airfield's lights.",
      "Lit trails and signposts to the morgue, the crypt cave, the ranger station, Hunter's Blind, the Old Logging Camp and Stillwater Overlook, plus named places on the map.",
    ],
    changes: [
      "Day phase 5 → 8 minutes; night 3 → 5 minutes.",
      "Headlamp battery 5 → 10 minutes (Extended Battery 15); Batteries are now spares that swap in by themselves.",
      "The Hammer swings only on a quick tap; a held press builds and never swings.",
      "No limit on planks per player (was 120).",
      "Smoother terrain, a pass through the ridge to the ranger station, a walk-in morgue stair and a marked crypt entrance.",
    ],
    fixes: [
      "Trees in the lobby were tilted or upside down, and some trees on the map floated above the ground.",
      "The fire tower could not be reached: a ridge with a drop stood between the town and the ranger station.",
      "Out-of-place lava and basalt textures at the campsite.",
    ],
    balance: [
      "Soldier: 130 health, 11.5 damage. Ammo drop chance 18% (soldiers 22%).",
    ],
    knownIssues: [
      "Two-player sleep voting, rare-gear sharing and the airfield with a full squad are not yet tested.",
      "Holding R2 to build on a real controller still needs checking.",
      "The Mini AK has no dedicated reload animation; generators have no engine sound yet.",
    ],
    relatedEntries: [
      "blackpine-airfield", "soldier", "mini-ak", "military-armor", "night-survival", "generators-and-gas-cans",
      "day-night-cycle", "headlamp", "doors-and-building",
    ],
  },
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
