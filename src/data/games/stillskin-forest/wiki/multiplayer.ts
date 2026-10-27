import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "multiplayer", verification: "verified_live", lastVerified: VERIFIED } as const;

export const multiplayer: WikiEntry[] = [
  {
    ...base,
    slug: "co-op-survival",
    title: "Co-op Survival: Revives, Pings and Sharing",
    seoTitle: "Stillskin Forest Co-op Guide: Revives, Pings and Giving Items",
    description:
      "How to survive as a squad in Stillskin Forest: reviving, pinging infected and loot, giving items and ammo, and what your team shares.",
    question: "How does co-op work in Stillskin Forest?",
    answer:
      "Squads share one run. You revive downed teammates by holding E for three seconds, ping infected, loot or your position with T (X on controller) so the squad sees a marker for 8 seconds, and hold E on a teammate to give them your held item, or half your ammo if your hands are empty. Story progress such as the asylum unlock and relic count is shared.",
    sections: [
      {
        id: "revives",
        heading: "Revives",
        blocks: [
          { type: "p", text: "A downed teammate has 2 minutes. Hold **E** on them for 3 seconds and they're back at 35% health. Full details in [Downed and revive](@downed-and-revive)." },
        ],
      },
      {
        id: "pings",
        heading: "Pings",
        blocks: [
          { type: "p", text: "Press **T** or middle mouse (X on controller). Pings are labelled INFECTED, LOOT or HERE, show the distance and who pinged, last 8 seconds, and reach up to 300 studs. They work in matches, not in the lobby." },
        ],
      },
      {
        id: "giving",
        heading: "Giving items",
        blocks: [
          { type: "p", text: "Hold **E** on a teammate to hand over the item in your hands. With empty hands you give them half your ammunition instead. It respects their bag space." },
        ],
      },
      {
        id: "shared-progress",
        heading: "Shared progress",
        blocks: [
          { type: "list", items: [
            "One player reading the [ledger](@blackthorn-admission-ledger) unlocks the asylum for everyone.",
            "Relics count toward one shared total.",
            "One player can hold [the ritual](@the-rite-of-stillness); everyone gets the ending.",
            "Placed [lanterns](@lantern) can be picked up by anyone.",
          ] },
          { type: "callout", tone: "note", text: "Revives, the shared asylum unlock, shared relics and the ritual have been verified with two players. Pings and giving are built but not yet confirmed in a recorded two-player test." },
        ],
      },
    ],
    related: ["playing-with-friends", "downed-and-revive", "death-ghosts-and-the-finale"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["co-op", "coop", "team", "ping", "pings", "give items", "share ammo", "teamwork"],
  },
  {
    ...base,
    slug: "death-ghosts-and-the-finale",
    title: "Death, Ghosts and the Rooftop Finale",
    seoTitle: "What Happens When You Die in Stillskin Forest: Ghosts and the Finale",
    description:
      "What happens when you die in Stillskin Forest: flying as a ghost, respawning at dawn, the last-survivor sequence, the rooftop finale and Return to Camp.",
    question: "What happens when you die in Stillskin Forest?",
    answer:
      "If your teammates are still alive, you become a ghost: you fly freely around the map (or follow a teammate) and respawn beside a survivor when dawn breaks. When the last survivor falls, the run ends: everyone appears on the roof of St. Agnes Hospital with their stat cards while the infected walk in and dance, the camera tours the map, and players choose Return to Camp to start a new run on Day 1.",
    sections: [
      {
        id: "ghost-mode",
        heading: "Ghost mode",
        blocks: [
          { type: "p", text: "An eliminated player's avatar breaks apart and they become a ghost while teammates fight on. The infected that were after them disperse rather than attacking the body." },
          { type: "list", items: [
            "**Fly:** ghosts fly by default. Move with **WASD** (or the left stick) in the direction you look, **Space** and **Ctrl** to rise and sink, **Shift** to go faster. Hold the right mouse button (or use the right stick) to look around.",
            "**Follow a survivor:** **Q** / **E** (LB / RB) switch to watching a teammate; **F** (Y) flies again.",
            "**Back at dawn:** when dawn breaks, every ghost respawns next to a teammate who is still standing. You keep your ammo, but the gear you carried is gone.",
            "If nobody is left standing, the run is over and there is no respawn.",
          ] },
        ],
      },
      {
        id: "the-last-survivor",
        heading: "The last survivor",
        blocks: [
          { type: "p", text: "The final survivor doesn't get a revive window. A lethal hit starts a short final-death sequence, and the last-survivor music begins as it happens." },
        ],
      },
      {
        id: "the-finale",
        heading: "The rooftop finale",
        blocks: [
          { type: "list", items: [
            "The result cards land on the music's transition: day reached, nights survived, kills and revives.",
            "The squad stands on the roof of [St. Agnes Hospital](@st-agnes-hospital).",
            "Infected walk in from out of frame and dance, point, laugh and headbang around the lineup.",
            "The camera tours the hospital, the camp lake and dock, the forest, a cabin, the police car and a burning dumpster.",
            "Each player chooses **Return to Camp** to start the next run.",
          ] },
          { type: "p", text: "Winning ([the ritual](@the-rite-of-stillness) or [the Heart](@the-heart-of-stillskin)) no longer ends the run: you keep playing until the last survivor falls, and that end screen shows the win, without the laughing horde." },
        ],
      },
      {
        id: "out-of-bounds",
        heading: "Leaving the map",
        blocks: [
          { type: "p", text: "The woods darken toward the edge of the map. Step outside and a TURN BACK countdown starts from 10, costing 10% of your health each second. Step back in to clear it; reach zero and you're out of the run with no revive." },
        ],
      },
    ],
    related: ["downed-and-revive", "co-op-survival", "how-to-play"],
    sources: [SRC.config, SRC.playtest, SRC.report],
    aliases: ["death", "die", "ghost", "spectate", "spectator", "end of run", "return to camp", "finale", "zombie dance", "stats"],
    gaps: ["Return to Camp voting with several real clients has not been recorded yet."],
  },
];
