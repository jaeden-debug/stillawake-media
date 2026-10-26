import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "items", verification: "verified_live", lastVerified: VERIFIED } as const;

export const items: WikiEntry[] = [
  {
    ...base,
    slug: "food",
    title: "Food: Bag of Chips, Canned Beans and Energy Bar",
    seoTitle: "Food in Stillskin Forest: Chips, Canned Beans and Energy Bars",
    description:
      "Every food item in Stillskin Forest heals 25% of your health in 0.6 seconds and stacks in one slot. Chips, canned beans and energy bars explained.",
    question: "How do you heal with food in Stillskin Forest?",
    answer:
      "Select a snack on your hotbar and use it. A Bag of Chips, a can of Canned Beans and an Energy Bar each heal 25% of your maximum health and take 0.6 seconds to eat. Identical snacks stack in a single inventory slot.",
    facts: [["Heals", "25% each"], ["Use time", "0.6 s"], ["Stacks", "Yes, identical snacks share a slot"], ["Rarity", "Common"]],
    sections: [
      {
        id: "the-snacks",
        heading: "The three snacks",
        blocks: [
          { type: "table", caption: "Food items", head: ["Item", "Heals", "Use time", "Description in game"], rows: [
            ["Bag of Chips", "25%", "0.6 s", "Salty and stale. Still food."],
            ["Canned Beans", "25%", "0.6 s", "Cold beans. Better than nothing."],
            ["Energy Bar", "25%", "0.6 s", "Chewy, sweet, keeps you going."],
          ] },
          { type: "p", text: "They are functionally identical; carry whichever you find. Eating in testing took a survivor from 50 to 76 health and the stack from three to two." },
        ],
      },
      {
        id: "where-to-find",
        heading: "Where to find food",
        blocks: [
          { type: "p", text: "Food appears in loot spots across the map, and [Pine General Store](@pine-general-store) uses a food-heavy loot table. The hospital lobby vending machine can be shaken for a snack once per run, but it is loud and draws infected from up to 90 studs away." },
        ],
      },
    ],
    related: ["first-aid-kit", "health-and-healing", "inventory-and-hotbar"],
    sources: [SRC.items, SRC.playtest],
    aliases: ["chips", "beans", "energy bar", "snack", "heal", "healing items"],
  },
  {
    ...base,
    slug: "first-aid-kit",
    title: "First Aid Kit",
    seoTitle: "First Aid Kit in Stillskin Forest: How Much It Heals",
    description:
      "The First Aid Kit in Stillskin Forest heals 75% of your health and takes 1.5 seconds to use. Where to look for one and when to use it.",
    question: "How much does a First Aid Kit heal in Stillskin Forest?",
    answer:
      "A First Aid Kit heals 75% of your maximum health and takes 1.5 seconds to use. It is Rare, so it is worth saving for when food won't be enough.",
    facts: [["Heals", "75%"], ["Use time", "1.5 s"], ["Rarity", "Rare"]],
    sections: [
      {
        id: "using-it",
        heading: "Using it",
        blocks: [
          { type: "p", text: "Bandages and antiseptic. Select it and use it; the 1.5-second use time is three times longer than eating, so get out of reach first. [St. Agnes Hospital](@st-agnes-hospital) uses a medical-heavy loot table." },
        ],
      },
    ],
    related: ["food", "health-and-healing", "st-agnes-hospital"],
    sources: [SRC.items, SRC.playtest],
    aliases: ["medkit", "med kit", "first aid", "bandage"],
  },
  {
    ...base,
    slug: "ammunition",
    title: "Ammunition: Pistol Ammo and Shells",
    seoTitle: "Ammo in Stillskin Forest: Pistol Ammo, Shells and Reloading",
    description:
      "Stillskin Forest has two ammunition types: Pistol Ammo for the Pistol and Shells for the Shotgun. How reserves, magazines and reloading work.",
    question: "What ammo does each gun use in Stillskin Forest?",
    answer:
      "The Pistol uses Pistol Ammo and the Shotgun uses Shells. Ammunition you pick up goes into a reserve; reloading moves it into the gun's magazine (12 rounds for the Pistol, 6 for the Shotgun). Guns you find already come loaded.",
    sections: [
      {
        id: "how-it-works",
        heading: "How reserves and magazines work",
        blocks: [
          { type: "list", items: [
            "Each gun shows its magazine and reserve on the hotbar.",
            "Press **R** to reload; an empty gun reloads automatically.",
            "Switching weapons cancels a reload in progress.",
            "To share, hold **E** on a teammate with empty hands to give them half your ammo. See [Co-op survival](@co-op-survival).",
          ] },
        ],
      },
    ],
    related: ["pistol", "shotgun", "aiming-and-reloading"],
    sources: [SRC.items, SRC.playtest],
    aliases: ["ammo", "pistol ammo", "shells", "shotgun shells", "bullets"],
  },
  {
    ...base,
    slug: "headlamp",
    title: "Headlamp",
    seoTitle: "Headlamp in Stillskin Forest: Range, Battery and Detection Trade-off",
    description:
      "Every survivor wears a headlamp in Stillskin Forest. Toggle it with F. Its range, battery life, upgrades, and why it makes you easier to spot at night.",
    question: "How does the headlamp work in Stillskin Forest?",
    answer:
      "Every survivor wears a headlamp that takes no inventory slot; press F (D-pad down on controller) to toggle it. It lights where you aim, but at dusk and night a lit lamp lets the infected spot you from 1.25× further, while turning it off cuts their sight range to 0.8×. The battery lasts five minutes of light per run.",
    facts: [
      ["Toggle", "F / D-pad down"], ["Battery", "5 minutes of light (10 with Extended Battery)"],
      ["Starting range", "24 studs"], ["Detection when lit (dusk/night)", "×1.25"], ["Detection when off (dusk/night)", "×0.8"],
    ],
    sections: [
      {
        id: "the-trade-off",
        heading: "The trade-off",
        blocks: [
          { type: "p", text: "Nights are dark enough that you can make out shapes in the moonlight but need the lamp to see detail. The cost is visibility: infected notice a lit lamp from further away. Switch it on to search a room, off to cross open ground." },
          { type: "p", text: "Other players see your beam, and your beam follows your aim." },
        ],
      },
      {
        id: "tiers",
        heading: "Lamp tiers",
        blocks: [
          { type: "table", caption: "Headlamp tiers", head: ["Tier", "Name", "Range", "Beam angle", "Flicker"], rows: [
            ["I", "Cheap Headlamp", "24 studs", "46°", "Occasional"],
            ["II", "LED Headlamp", "40 studs", "56°", "Rare"],
            ["III", "Tactical Headlamp", "60 studs", "66°", "None"],
          ] },
          { type: "p", text: "You upgrade the lamp by finding parts. See [Headlamp upgrades and batteries](@headlamp-upgrades). The tier resets to I each run." },
        ],
      },
      {
        id: "battery",
        heading: "Battery",
        blocks: [
          { type: "p", text: "The battery drains only while the lamp is on: five minutes of light on a charge. Below 15% it dims and flickers; at 0 it dies. The HUD shows the percentage, and each run starts full." },
        ],
      },
    ],
    related: ["headlamp-upgrades", "detection-and-noise", "day-night-cycle", "lantern"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["flashlight", "torch", "light", "lamp"],
  },
  {
    ...base,
    slug: "headlamp-upgrades",
    title: "Headlamp Upgrades and Batteries",
    seoTitle: "Stillskin Forest Headlamp Upgrades: LED Bulb, Reflector, Batteries",
    description:
      "How to upgrade your headlamp in Stillskin Forest: LED Bulb (Tier II), Tactical Reflector (Tier III), Extended Battery and Batteries, all fitted on pickup.",
    question: "How do you upgrade the headlamp in Stillskin Forest?",
    answer:
      "Pick up headlamp parts and they are fitted instantly without taking a bag slot. The LED Bulb raises the lamp to Tier II (40 studs), the Tactical Reflector to Tier III (60 studs), the Extended Battery doubles battery life to ten minutes, and Batteries put back 60% charge. A part no better than what you have is salvaged for 15 Embers.",
    sections: [
      {
        id: "parts",
        heading: "The parts",
        blocks: [
          { type: "table", caption: "Headlamp parts", head: ["Part", "Effect", "Rarity"], rows: [
            ["LED Bulb", "Lamp to Tier II: 40 studs, 56°, brighter", "Rare"],
            ["Tactical Reflector", "Lamp to Tier III: 60 studs, 66°, no flicker", "Legendary"],
            ["Extended Battery", "10 minutes of light per charge instead of 5", "Epic"],
            ["Batteries", "Restores 60% charge", "Common"],
          ] },
          { type: "p", text: "Upgrades last for the run. The lamp returns to Tier I when a new run starts." },
        ],
      },
    ],
    related: ["headlamp", "lantern"],
    sources: [SRC.items, SRC.config, SRC.playtest],
    aliases: ["led bulb", "tactical reflector", "extended battery", "batteries", "battery"],
    gaps: ["Drop rates for each part are tuned frequently and not published."],
  },
  {
    ...base,
    slug: "lantern",
    title: "Lantern",
    seoTitle: "Lantern in Stillskin Forest: Carrying, Placing and Lighting",
    description:
      "The kerosene Lantern in Stillskin Forest: carry it lit, clip it to your belt, or place up to four to light a room or base. Controls and ranges.",
    question: "How do you use the Lantern in Stillskin Forest?",
    answer:
      "Press L to light or put out the Lantern. Carried, it lights 16 studs and moves your weapon to your left hand; press H to clip it to your belt (dimmer, but your weapon goes back to your right hand). With the Lantern selected, click to place it where you aim; a placed lantern lights 26 studs. Each player can place up to four.",
    facts: [["Carried light", "16 studs"], ["Placed light", "26 studs"], ["Max placed", "4 per player"], ["Durability", "220"], ["Rarity", "Uncommon"]],
    sections: [
      {
        id: "carrying",
        heading: "Carrying it",
        blocks: [
          { type: "p", text: "Lanterns spawn unlit. In hand, the lantern hangs from its handle and you can still fight: any weapon moves to your left hand. On the belt (H, or D-pad right) the light is dimmer and the weapon returns to your right hand." },
        ],
      },
      {
        id: "placing",
        heading: "Placing it",
        blocks: [
          { type: "p", text: "Click to set it down on the floor or a furniture top where your crosshair is. It keeps its flame and anyone can hold **E** to pick it up. Place a fifth and your oldest one returns to your bag. Placed lanterns are cleared at the start of each run." },
          { type: "callout", tone: "tip", text: "Lanterns let you light a base without running your [headlamp](@headlamp) battery down." },
        ],
      },
    ],
    related: ["headlamp", "doors-and-building"],
    sources: [SRC.items, SRC.playtest],
    aliases: ["lamp", "kerosene lantern", "light source"],
  },
];
