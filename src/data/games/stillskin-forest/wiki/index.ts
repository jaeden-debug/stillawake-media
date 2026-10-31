import type { WikiEntry } from "@/data/games/types";
import { gettingStarted } from "./getting-started";
import { weapons } from "./weapons";
import { items } from "./items";
import { enemies } from "./enemies";
import { mechanics } from "./mechanics";
import { locations } from "./locations";
import { specialNights } from "./special-nights";
import { story } from "./story";
import { quests } from "./quests";
import { campaign } from "./campaign";
import { multiplayer } from "./multiplayer";
import { updates } from "./updates";
import { expansion } from "./expansion";
import { unpublished } from "./audit";

export { stillskinUpdates } from "./updates";

/** Every Stillskin Forest wiki record, published or not. */
export const stillskinWiki: WikiEntry[] = [
  ...gettingStarted,
  ...weapons,
  ...items,
  ...enemies,
  ...mechanics,
  ...locations,
  ...specialNights,
  ...story,
  ...quests,
  ...campaign,
  ...multiplayer,
  ...updates,
  ...expansion,
  ...unpublished,
];
