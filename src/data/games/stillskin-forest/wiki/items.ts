import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "items", verification: "verified_live", lastVerified: VERIFIED } as const;

export const items: WikiEntry[] = [
  {
    ...base,
    slug: "gun-repair-kit",
    lastVerified: "2026-10-28",
    title: "Gun Repair Kit",
    seoTitle: "Gun Repair Kit in Stillskin Forest: How to Repair Guns",
    description:
      "The Gun Repair Kit in Stillskin Forest restores one gun to full durability. Where to find one, why you need a gun to pick it up, and which gun it repairs.",
    question: "How do you repair a gun in Stillskin Forest?",
    answer:
      "Use a Gun Repair Kit. Select it and use it: after two seconds your most worn gun is back to full durability and the kit is used up. You can only pick a kit up while you carry a gun, and if all your guns are already in perfect condition the kit is kept.",
    facts: [["Repairs", "One gun, to full"], ["Which gun", "Your most worn one"], ["Use time", "2 s"], ["Pick up", "Only while carrying a gun"], ["Rarity", "Rare"]],
    sections: [
      {
        id: "using-it",
        heading: "Using it",
        blocks: [
          { type: "list", items: [
            "Select the kit and use it (click or R2; the button reads REPAIR). It works on the gun of yours that's most worn.",
            "It never repairs more than one gun, and it's only used up once the repair is done. Switch away during the two seconds and nothing is lost.",
            "If every gun you carry is already pristine, it tells you so and keeps the kit.",
            "With no gun in your bag, a kit on the ground says \"You have no gun to repair\" and stays there.",
          ] },
        ],
      },
      {
        id: "where-to-find",
        heading: "Where to find it",
        blocks: [
          { type: "p", text: "Gun Repair Kits are uncommon. Look on the floors and benches of [Blackpine Airfield](@blackpine-airfield), in stashes, and occasionally in houses and the store." },
        ],
      },
    ],
    related: ["durability-and-wear", "pistol", "shotgun", "ammunition"],
    sources: [SRC.items28, SRC.config28, SRC.playtest28],
    aliases: ["repair kit", "gun repair", "repair gun", "fix gun", "weapon repair"],
  },
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
    lastVerified: "2026-10-28",
    title: "First Aid Kit",
    seoTitle: "First Aid Kit in Stillskin Forest: How Much It Heals",
    description:
      "The First Aid Kit in Stillskin Forest heals 75% of your health and takes 1.5 seconds to use. Where to look for one and when to use it.",
    question: "How much does a First Aid Kit heal in Stillskin Forest?",
    answer:
      "A First Aid Kit heals 75% of your maximum health and takes 1.5 seconds to use. They are deliberately scarce: there is only one per survivor in the whole server at a time, and you can carry just one. Save it for when food won't be enough.",
    facts: [["Heals", "75%"], ["Use time", "1.5 s"], ["How many exist", "One per survivor in the server"], ["Carry limit", "1"], ["Rarity", "Rare"]],
    sections: [
      {
        id: "using-it",
        heading: "Using it",
        blocks: [
          { type: "p", text: "Bandages and antiseptic. Select it and use it; the 1.5-second use time is three times longer than eating, so get out of reach first." },
        ],
      },
      {
        id: "how-many",
        heading: "How many there are",
        blocks: [
          { type: "list", items: [
            "The server keeps one First Aid Kit per survivor: solo there is one, a squad of four has four. That counts kits lying around and kits in bags.",
            "You can carry only one. Walk up to another while you have one and it stays where it is for a teammate.",
            "Using a kit frees a new one. It appears somewhere else a little later, never right in front of anyone. Just picking one up doesn't make a new one.",
            "[St. Agnes Hospital](@st-agnes-hospital) is the likeliest place to find one; houses, the store, the asylum and the airfield can hold one too.",
          ] },
        ],
      },
    ],
    related: ["food", "health-and-healing", "st-agnes-hospital"],
    sources: [SRC.items, SRC.config28, SRC.playtest28],
    aliases: ["medkit", "med kit", "first aid", "bandage"],
  },
  {
    ...base,
    slug: "ammunition",
    lastVerified: "2026-10-27",
    title: "Ammunition: Pistol Ammo, Shells and Rifle Rounds",
    seoTitle: "Ammo in Stillskin Forest: Pistol Ammo, Shells, Rifle Rounds",
    description:
      "Stillskin Forest ammunition: Pistol Ammo, Shells and Rifle Rounds, which guns use them, where to find them, and ammo dropped by the infected.",
    question: "What ammo does each gun use in Stillskin Forest?",
    answer:
      "The Pistol uses Pistol Ammo, the Shotgun uses Shells, and the Hunting Rifle and Mini AK use Rifle Rounds. Ammunition you pick up goes into a reserve; reloading moves it into the gun's magazine. Guns you find already come loaded, and the infected you kill sometimes drop a little ammo.",
    sections: [
      {
        id: "how-it-works",
        heading: "How reserves and magazines work",
        blocks: [
          { type: "list", items: [
            "Each gun shows its magazine and reserve on the hotbar. The bag lists all three reserves (Pistol Ammo, Shells, Rifle Rounds) even when you carry no gun for them.",
            "If a gun breaks, the rounds in its magazine go back into your reserve.",
            "Picking up another copy of a gun you carry adds its rounds to your reserve, and if the found gun is less worn, yours takes its durability.",
            "Press **R** to reload; an empty gun reloads automatically.",
            "Switching weapons cancels a reload in progress.",
            "To share, hold **E** on a teammate with empty hands to give them half your ammo. See [Co-op survival](@co-op-survival).",
          ] },
        ],
      },
      {
        id: "never-lost",
        heading: "Ammo is never lost during a run",
        blocks: [
          { type: "list", items: [
            "Drop a gun and the rounds in its magazine stay with you; the gun goes on the ground empty.",
            "Being taken out doesn't cost ammo: the rounds in your guns go back to you, and you have them when you respawn at dawn.",
            "Swap to another gun and your ammo carries over, plus whatever the new gun had loaded.",
            "Ammo only resets when a new run starts.",
          ] },
        ],
      },
      {
        id: "rifle-rounds",
        heading: "Rifle Rounds and ammo from kills",
        blocks: [
          { type: "p", text: "Rifle Rounds are the scarcest: they turn up in Blackthorn Asylum, stashes, [Blackpine Airfield](@blackpine-airfield) containers and night caches. An infected you kill has an 18% chance to drop a small amount of ammo (22% for soldiers, who drop Rifle Rounds more often). See [Night survival](@night-survival)." },
        ],
      },
    ],
    related: ["pistol", "shotgun", "mini-ak", "aiming-and-reloading"],
    sources: [SRC.items, SRC.playtest],
    aliases: ["ammo", "pistol ammo", "shells", "shotgun shells", "bullets"],
  },
  {
    ...base,
    slug: "headlamp",
    lastVerified: "2026-10-28",
    title: "Headlamp",
    seoTitle: "Headlamp in Stillskin Forest: Range, Battery and Detection Trade-off",
    description:
      "Every survivor wears a headlamp in Stillskin Forest. Toggle it with F. Its range, battery life, upgrades, and why it makes you easier to spot at night.",
    question: "How does the headlamp work in Stillskin Forest?",
    answer:
      "Every survivor wears a headlamp that takes no inventory slot; press F (D-pad down on controller) to toggle it. It lights where you aim, but at dusk and night a lit lamp lets the infected spot you from 1.25× further, while turning it off cuts their sight range to 0.8×. A charge lasts ten minutes of light, and spare Batteries swap in by themselves.",
    facts: [
      ["Toggle", "F / D-pad down"], ["Battery", "10 minutes of light (15 with Extended Battery)"], ["Spare batteries", "Up to 6, no bag slot"],
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
        id: "night-vision-goggles",
        heading: "Night-vision goggles",
        blocks: [
          { type: "p", text: "Night-vision goggles are the endgame prize. Complete [the Rite of Stillness](@the-rite-of-stillness) and a pair rises out of the ritual circle: walk up and press E (Square) to claim yours. Each survivor claims their own, once per ritual. Winning by killing [the Heart](@the-heart-of-stillskin) gives everyone goggles straight away. Either way they replace the headlamp for the rest of that run (your lamp, battery and spares are untouched and come back next run), and the HUD's lamp indicator turns into an NVG one. They use the same button (F / D-pad down) and the same battery. Switched on, they throw no beam: the world turns bright green and you can see across the dark. In first person the view narrows a little, as if looking through the tubes. Teammates see the goggles glow green while they're on." },
        ],
      },
      {
        id: "battery",
        heading: "Battery",
        blocks: [
          { type: "p", text: "The battery drains only while the lamp is on: ten minutes of light on a charge, about two nights. Below 15% it dims and flickers. When it runs out, a spare battery goes in by itself if you carry one; otherwise the lamp dies. The HUD shows the charge and your spares (\"+2 BATT\"), and each run starts full." },
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
    lastVerified: "2026-10-27",
    title: "Headlamp Upgrades and Batteries",
    seoTitle: "Stillskin Forest Headlamp Upgrades: LED Bulb, Reflector, Batteries",
    description:
      "How to upgrade your headlamp in Stillskin Forest: LED Bulb (Tier II), Tactical Reflector (Tier III), Extended Battery, and spare Batteries that need no bag slot.",
    question: "How do you upgrade the headlamp in Stillskin Forest?",
    answer:
      "Pick up headlamp parts and they are fitted instantly without taking a bag slot. The LED Bulb raises the lamp to Tier II (40 studs), the Tactical Reflector to Tier III (60 studs), the Extended Battery raises battery life to fifteen minutes, and Batteries are kept as spares (up to six) that swap in when the lamp dies. A part no better than what you have is salvaged for 15 Embers.",
    sections: [
      {
        id: "parts",
        heading: "The parts",
        blocks: [
          { type: "table", caption: "Headlamp parts", head: ["Part", "Effect", "Rarity"], rows: [
            ["LED Bulb", "Lamp to Tier II: 40 studs, 56°, brighter", "Rare"],
            ["Tactical Reflector", "Lamp to Tier III: 60 studs, 66°, no flicker", "Legendary"],
            ["Extended Battery", "15 minutes of light per charge instead of 10", "Epic"],
            ["Batteries", "A spare (up to 6). A dead lamp takes it at once; with 6 spares it tops the lamp up", "Common"],
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
    lastVerified: "2026-10-28",
    title: "Lantern",
    seoTitle: "Lantern in Stillskin Forest: Carrying, Placing and Lighting",
    description:
      "The kerosene Lantern in Stillskin Forest: carry it lit, clip it to your belt, or place up to four to light a room or base. Controls and ranges.",
    question: "How do you use the Lantern in Stillskin Forest?",
    answer:
      "Press L to light or put out the Lantern. Carried, it lights 16 studs and moves your weapon to your left hand; press H to clip it to your belt (dimmer, but your weapon goes back to your right hand). With the Lantern selected, click to place it where you aim; a placed lantern lights 26 studs. Lanterns never wear out, and you can carry several: each one you pick up is another lantern. Each player can place up to four.",
    facts: [["Carried light", "16 studs"], ["Placed light", "26 studs"], ["Max placed", "4 per player"], ["Durability", "Never wears out"], ["In the world", "Up to 4 at a time"], ["Rarity", "Uncommon"]],
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
      {
        id: "finding",
        heading: "Finding lanterns",
        blocks: [
          { type: "p", text: "Lanterns are fairly common. Up to four lie around the map at a time (at least one per survivor, up to four), most often at the campground. When someone picks one up, another appears somewhere else a little later. Lanterns you drop or place don't count toward the four. Several lanterns share one bag slot." },
        ],
      },
    ],
    related: ["headlamp", "doors-and-building"],
    sources: [SRC.items, SRC.config28, SRC.playtest28],
    aliases: ["lamp", "kerosene lantern", "light source"],
  },
];
