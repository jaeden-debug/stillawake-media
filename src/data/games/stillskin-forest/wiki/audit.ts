import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

/**
 * Pages the wiki needs but cannot publish yet. They are never routed, never
 * in the sitemap and never in search; they exist so the content audit lists
 * exactly what is blocked and why. Promote one by writing its sections and
 * setting verification to "verified_live" once the build confirms it.
 */

const pending = (
  slug: string,
  category: string,
  title: string,
  verification: WikiEntry["verification"],
  gaps: string[],
): WikiEntry => ({
  slug,
  category,
  title,
  description: title,
  answer: "",
  sections: [],
  related: [],
  verification,
  sources: [SRC.playtest, SRC.report],
  lastVerified: VERIFIED,
  gaps,
});

export const unpublished: WikiEntry[] = [
  pending("escape-from-the-hollow", "quests", "Escape from the Hollow", "unverified", [
    "A 75-second collapse after the Heart dies (falling rocks, OUT ALIVE result) is built but not yet confirmed in a playtest.",
  ]),
  pending("green-lake-investigation", "quests", "Green Lake Investigation", "verified_planned", [
    "Green Lake has clues in the world, but no quest objective uses them yet.",
  ]),
  pending("blackpine-ranger-station", "locations", "Blackpine Ranger Station", "unverified", [
    "The public listing names a Blackpine Ranger Station with a fire lookout tower; the lobby is called Pinecrest Ranger Station in development notes. Name, location and role need confirming in the build.",
  ]),
  pending("physical-inventory", "mechanics", "Shoulder, Hip and Pocket Slots", "verified_planned", [
    "The physical eight-slot layout (2 shoulder, 2 hip, 4 pocket) is built and tested in isolation but is not the live inventory.",
  ]),
  pending("embers-and-the-outfitter", "multiplayer", "Embers and the Outfitter", "verified_planned", [
    "Embers, the lobby shop, daily rewards and VIP exist in development; Robux products are not set up and saving across servers needs the public game.",
  ]),
  pending("achievements", "multiplayer", "Achievements", "verified_planned", [
    "19 achievements are defined and tracked; the unlock banner and persistence across sessions are not yet confirmed in play.",
  ]),
  pending("leaderboards", "multiplayer", "Longest Survivors Leaderboard", "verified_planned", [
    "The lobby leaderboard exists but has no real data until the game is public.",
  ]),
  pending("weather", "mechanics", "Weather", "verified_planned", ["Rain and thunder are planned but not built."]),
  pending("night-milestones", "special-nights", "Night Milestones (First Dark, The Long Night…)", "verified_planned", [
    "Named milestone nights (Night 1 First Dark, Night 2 The Hunt Deepens, Night 3 Heavy Footsteps, Night 5 The Long Night, Night 7 No Safe Trail) are implemented as data but not integrated into the live director.",
  ]),
];
