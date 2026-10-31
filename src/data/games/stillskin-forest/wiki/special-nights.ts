import type { WikiEntry } from "@/data/games/types";
import { SRC } from "./sources";

const base = { category: "special-nights", verification: "verified_live", lastVerified: "2026-10-31" } as const;

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
      "Special nights are rolled at dusk from Night 2 onward. The chance starts at 30% on Night 2 and rises 6% each night to a maximum of 65%, and the same special night never comes twice in a row. Each is announced at dusk with a sting and a banner, and once night falls the HUD clock takes on its name and colour. None of them adds infected: the normal night cap always holds.",
    sections: [
      {
        id: "the-four",
        heading: "The four special nights",
        blocks: [
          { type: "table", caption: "Special night effects", head: ["Night", "Earliest", "Infected", "Chase speed", "Sight", "Other"], rows: [
            ["[Blood Moon](@blood-moon)", "Night 3", "Normal", "×1.2", "×1.25", "More Runners and Brutes"],
            ["[Heavy Fog](@heavy-fog)", "Night 2", "Normal", "Normal", "×0.6", "Infected can spawn as close as 40 studs"],
            ["[Infected Surge](@infected-surge)", "Night 2", "Normal", "Normal", "×1.15", "The night fills faster; more Runners and Screamers"],
            ["[Silent Night](@silent-night)", "Night 2", "×0.6", "×1.15", "Normal", "Silent groans and screams; the Watcher appears"],
          ] },
          { type: "p", text: "Faster chases still stop at the infected's usual top speed, which is just below your sprint. Sprinting costs stamina, so you can't keep it up for ever." },
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
          { type: "p", text: "During the Hallow's Eve event (until 3 November 2026) a fifth night, Hallow's Eve, can also roll from Night 2, and while the event runs it is the most likely special night. The infected wear carved, glowing pumpkins; their numbers, speed and sight are normal." },
        ],
      },
    ],
    related: ["blood-moon", "heavy-fog", "infected-surge", "silent-night", "day-night-cycle"],
    sources: [SRC.notes30],
    aliases: ["special nights", "events", "night events", "night modifiers"],
  },
  {
    ...base,
    slug: "blood-moon",
    title: "Blood Moon",
    seoTitle: "Blood Moon in Stillskin Forest: Effects and How to Survive",
    description:
      "The Blood Moon special night in Stillskin Forest: faster chases, 25% longer sight, and more Runners and Brutes, with no extra infected.",
    question: "What happens during a Blood Moon in Stillskin Forest?",
    answer:
      "A Blood Moon turns the sky and light red. The infected chase 20% faster (up to their usual top speed, just below your sprint) and spot you from 25% further. Far more of them are Runners, and more are Brutes. It can roll from Night 3. It does not add infected: the normal night cap still applies.",
    facts: [["Earliest", "Night 3"], ["Infected", "Normal night cap (40)"], ["Chase speed", "×1.2"], ["Detection", "×1.25"], ["Watcher", "50% chance"]],
    sections: [
      {
        id: "how-to-adapt",
        heading: "How to adapt",
        blocks: [
          { type: "list", items: [
            "Almost every infected now chases at the top speed, just below your sprint. Your stamina runs out first, so don't plan on outrunning a chase; plan on not starting one.",
            "Get behind a closed [door](@doors-and-building) or barricade before dusk ends.",
            "Bring guns for the Brutes, and expect the noise to bring more.",
            "Keep your [headlamp](@headlamp) off when you can: detection is already 25% longer.",
          ] },
        ],
      },
    ],
    related: ["special-nights-overview", "brute", "runner"],
    sources: [SRC.notes30],
    aliases: ["red moon", "blood night"],
  },
  {
    ...base,
    slug: "heavy-fog",
    title: "Heavy Fog",
    seoTitle: "Heavy Fog in Stillskin Forest: Effects and How to Survive",
    description:
      "Heavy Fog in Stillskin Forest: dense grey fog cuts the infected's sight to 60%, they can spawn as close as 40 studs, and the Watcher is likely to appear.",
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
    sources: [SRC.notes30],
    aliases: ["fog", "foggy night"],
  },
  {
    ...base,
    slug: "infected-surge",
    title: "Infected Surge",
    seoTitle: "Infected Surge in Stillskin Forest: Effects and How to Survive",
    description:
      "The Infected Surge special night in Stillskin Forest: the night fills faster, the infected see 15% further, and more are Runners and Screamers.",
    question: "What is an Infected Surge in Stillskin Forest?",
    answer:
      "On an Infected Surge the night's infected arrive faster than usual instead of trickling in, they spot you from 15% further, and more of them are Runners and Screamers. Screams echo through the trees all night. There are no extra infected: the number never goes past the normal night cap, and they don't track you down; they still have to see or hear you.",
    facts: [["Earliest", "Night 2"], ["Infected", "Normal night cap (40)"], ["Spawn interval", "0.8 s"], ["Detection", "×1.15"], ["Mix", "More Runners and Screamers"], ["Watcher", "15% chance"]],
    sections: [
      {
        id: "how-to-adapt",
        heading: "How to adapt",
        blocks: [
          { type: "list", items: [
            "Move early: the forest fills up fast after dusk.",
            "Their sight is 15% longer, so keep to cover and stay quiet. More Screamers means one sighting can call in others.",
            "If you're spotted, a closed [door](@doors-and-building) or barricade buys time. Share found ammunition across the squad; see [Co-op survival](@co-op-survival).",
          ] },
        ],
      },
    ],
    related: ["special-nights-overview", "doors-and-building", "shotgun"],
    sources: [SRC.notes30],
    aliases: ["surge", "horde night"],
  },
  {
    ...base,
    slug: "silent-night",
    title: "Silent Night",
    seoTitle: "Silent Night in Stillskin Forest: Effects and How to Survive",
    description:
      "The Silent Night special night in Stillskin Forest: fewer infected, but their voices are silent, they chase 15% faster, and the Watcher almost always appears.",
    question: "What happens on a Silent Night in Stillskin Forest?",
    answer:
      "On a Silent Night the light turns cold and clear and the forest goes almost silent. There are fewer infected (60% of normal), but their groans and screams make no sound (a scream still calls others in) and they chase 15% faster. The Watcher almost always appears, unless you're being chased or have just hidden.",
    facts: [["Earliest", "Night 2"], ["Infected", "×0.6"], ["Chase speed", "×1.15"], ["Sound", "Groans and screams are silent"], ["Watcher", "Almost certain"]],
    sections: [
      {
        id: "how-to-adapt",
        heading: "How to adapt",
        blocks: [
          { type: "list", items: [
            "You can't hear them coming, or hear a scream calling others. Watch instead: check corners and behind you.",
            "A spotted survivor still gets nearby infected called in; you just won't hear it happen.",
            "Their 1.15× speed brings every type up to the top chase speed, just below your sprint. Avoid long chases.",
          ] },
        ],
      },
    ],
    related: ["special-nights-overview", "watcher", "screamer"],
    sources: [SRC.notes30],
    aliases: ["silent", "quiet night"],
  },
];
