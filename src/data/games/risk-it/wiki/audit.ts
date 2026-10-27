import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

/**
 * Pages the wiki needs but cannot publish yet. Never routed, never in the
 * sitemap or search; they exist so the content audit lists what is blocked.
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
  sources: [SRC.source],
  lastVerified: VERIFIED,
  gaps,
});

export const unpublished: WikiEntry[] = [
  pending("saving-progress", "mechanics", "Does RISK IT! Save Your Progress?", "unverified", [
    "GUTS, medals, bests and cosmetics save to a DataStore with a session lock; this works in Studio but has not been confirmed across live servers.",
  ]),
  pending("controller-controls", "getting-started", "Playing RISK IT! With a Controller", "unverified", [
    "Gamepad buttons are bound but have not been tested on a real controller.",
  ]),
  pending("leaderboards", "progression", "Leaderboards", "verified_planned", [
    "GUTS shows on the in-server player list; no global leaderboard exists yet.",
  ]),
];
