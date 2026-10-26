import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "special-nights", verification: "verified_live", lastVerified: VERIFIED } as const;

export const specialNights: WikiEntry[] = [
  {
    ...base,
    slug: "special-nights-overview",
    title: "Special Nights Explained",
    seoTitle: "Special Nights in Stillskin Forest: Chances and Effects",
    description:
      "How special nights work in Stillskin Forest: when they happen, the odds each night, and what Blood Moon, Heavy Fog, Infected Surge and Silent Night change.",
    question: "How do special nights work in Stillskin Forest?",
    answer:
      "Special nights are rolled at dusk from Night 2 onward. The chance starts at 30% on Night 2 and rises 6% each night to a maximum of 65%, and the same special night never comes twice in a row. Each is announced at dusk with a sting and a banner, and the HUD clock takes on its name and colour.",
    sections: [
      {
        id: "the-four",
        heading: "The four special nights",
        blocks: [
          { type: "table", caption: "Special night effects", head: ["Night", "Earliest", "Infected", "Chase speed", "Sight", "Other"], rows: [
            ["[Blood Moon](@blood-moon)", "Night 3", "×1.3", "×1.2", "×1.25", "Many more Runners and Brutes"],
            ["[Heavy Fog](@heavy-fog)", "Night 2", "Normal", "Normal", "×0.6", "Infected can spawn as close as 40 studs"],
            ["[Infected Surge](@infected-surge)", "Night 2", "×1.8", "Normal", "Normal", "Faster spawns; every infected hunts"],
            ["[Silent Night](@silent-night)", "Night 2", "×0.6", "×1.15", "Normal", "No groans or screams; the Watcher appears"],
          ] },
        ],
      },
      {
        id: "odds",
        heading: "Odds",
        blocks: [
          { type: "table", caption: "Chance of a special night", head: ["Night", "Chance"], rows: [
            ["1", "0% (always normal)"], ["2", "30%"], ["3", "36%"], ["4", "42%"], ["5", "48%"], ["6", "54%"], ["7", "60%"], ["8+", "65%"],
          ] },
          { type: "p", text: "When one rolls, Heavy Fog is slightly the most likely (weight 30), then Blood Moon and Infected Surge (25 each), then Silent Night (20). Blood Moon can't roll before Night 3." },
        ],
      },
    ],
    related: ["blood-moon", "heavy-fog", "infected-surge", "silent-night", "day-night-cycle"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["special nights", "events", "night events", "night modifiers"],
  },
  {
    ...base,
    slug: "blood-moon",
    title: "Blood Moon",
    seoTitle: "Blood Moon in Stillskin Forest: Effects and How to Survive",
    description:
      "The Blood Moon special night in Stillskin Forest: 30% more infected, 20% faster chases, longer sight, and many more Runners and Brutes.",
    question: "What happens during a Blood Moon in Stillskin Forest?",
    answer:
      "A Blood Moon turns the sky and light red and brings 30% more infected that chase 20% faster and spot you from 25% further. The mix shifts hard toward Runners and Brutes. It can roll from Night 3. In testing it put 19 infected on the map where a normal night had fewer.",
    facts: [["Earliest", "Night 3"], ["Infected", "×1.3"], ["Chase speed", "×1.2"], ["Detection", "×1.25"], ["Watcher", "50% chance"]],
    sections: [
      {
        id: "how-to-adapt",
        heading: "How to adapt",
        blocks: [
          { type: "list", items: [
            "×1.2 chase speed puts Runners above your sprint speed. Don't plan on outrunning a chase; plan on not starting one.",
            "Get behind a closed [door](@doors-and-building) or barricade before dusk ends.",
            "Bring guns for the Brutes, and expect the noise to bring more.",
            "Keep your [headlamp](@headlamp) off when you can: detection is already 25% longer.",
          ] },
        ],
      },
    ],
    related: ["special-nights-overview", "brute", "runner"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["red moon", "blood night"],
  },
  {
    ...base,
    slug: "heavy-fog",
    title: "Heavy Fog",
    seoTitle: "Heavy Fog in Stillskin Forest: Effects and How to Survive",
    description:
      "Heavy Fog in Stillskin Forest: dense grey fog cuts everyone's sight to 60%, infected can spawn as close as 40 studs, and the Watcher is likely to appear.",
    question: "What does Heavy Fog do in Stillskin Forest?",
    answer:
      "Heavy Fog rolls dense grey fog over the map with a low rumble. The infected only see 60% as far as usual, but neither can you, and they can spawn as close as 40 studs instead of 70. The Watcher is likely to appear.",
    facts: [["Earliest", "Night 2"], ["Detection", "×0.6"], ["Minimum spawn distance", "40 studs"], ["Watcher", "70% chance"]],
    sections: [
      {
        id: "how-to-adapt",
        heading: "How to adapt",
        blocks: [
          { type: "list", items: [
            "This is the night to move. Shorter sight ranges make crossing open ground safer.",
            "Expect infected to appear close without warning. Keep a melee weapon in hand.",
            "Stay within voice or [ping](@co-op-survival) range of your squad; you'll lose sight of each other quickly.",
          ] },
        ],
      },
    ],
    related: ["special-nights-overview", "watcher"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["fog", "foggy night"],
  },
  {
    ...base,
    slug: "infected-surge",
    title: "Infected Surge",
    seoTitle: "Infected Surge in Stillskin Forest: Effects and How to Survive",
    description:
      "The Infected Surge special night in Stillskin Forest: 80% more infected, faster spawning, and every infected hunting survivors all night.",
    question: "What is an Infected Surge in Stillskin Forest?",
    answer:
      "An Infected Surge brings 80% more infected, spawning faster, and every one of them hunts survivors instead of roaming. Screams echo all night. In testing it put 27 infected on the map.",
    facts: [["Earliest", "Night 2"], ["Infected", "×1.8"], ["Spawn interval", "0.8 s"], ["Behaviour", "All hunt"], ["Watcher", "15% chance"]],
    sections: [
      {
        id: "how-to-adapt",
        heading: "How to adapt",
        blocks: [
          { type: "list", items: [
            "They are coming regardless, so pick a defensible spot and hold it together.",
            "Choke points and [barricades](@doors-and-building) matter more than stealth tonight.",
            "Spread ammunition across the squad; see [Co-op survival](@co-op-survival).",
          ] },
        ],
      },
    ],
    related: ["special-nights-overview", "doors-and-building", "shotgun"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["surge", "horde night"],
  },
  {
    ...base,
    slug: "silent-night",
    title: "Silent Night",
    seoTitle: "Silent Night in Stillskin Forest: Effects and How to Survive",
    description:
      "The Silent Night special night in Stillskin Forest: fewer infected, but they make no sound and chase 15% faster, and the Watcher is guaranteed.",
    question: "What happens on a Silent Night in Stillskin Forest?",
    answer:
      "On a Silent Night the light turns cold and clear and the forest goes almost silent. There are fewer infected (60% of normal), but they make no groans or screams and chase 15% faster. The Watcher is guaranteed to appear.",
    facts: [["Earliest", "Night 2"], ["Infected", "×0.6"], ["Chase speed", "×1.15"], ["Sound", "No groans or screams"], ["Watcher", "Guaranteed"]],
    sections: [
      {
        id: "how-to-adapt",
        heading: "How to adapt",
        blocks: [
          { type: "list", items: [
            "You can't hear them coming. Watch instead: check corners and behind you.",
            "Screams don't alert other infected tonight, so a single chase stays single.",
            "Their 1.15× speed brings the fastest close to your sprint. Avoid long chases.",
          ] },
        ],
      },
    ],
    related: ["special-nights-overview", "watcher", "screamer"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["silent", "quiet night"],
  },
];
