import type { WikiEntry } from "@/data/games/types";
import { gettingStarted } from "./getting-started";
import { challenges } from "./challenges";
import { progression } from "./progression";
import { vault } from "./vault";
import { mechanics } from "./mechanics";
import { updates } from "./updates";
import { unpublished } from "./audit";

export { riskItUpdates } from "./updates";

/** Every RISK IT! wiki record, published or not. */
export const riskItWiki: WikiEntry[] = [
  ...gettingStarted,
  ...challenges,
  ...progression,
  ...vault,
  ...mechanics,
  ...updates,
  ...unpublished,
];
