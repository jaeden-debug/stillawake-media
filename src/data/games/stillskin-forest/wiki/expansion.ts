import type { WikiEntry } from "@/data/games/types";
import knowledge from "@/data/games/stillskin-forest/knowledge.json";
import { SRC } from "./sources";

/**
 * The Blackpine expansion (published build of 27 Oct 2026): the airfield, military gear, soldier
 * infected, night survival and power. Numbers come from `knowledge.json`, which is exported from the
 * game's own configuration, so a changed value in the game shows up as a changed value here.
 */
const K = knowledge.values;
const VERIFIED_27 = knowledge.lastVerified;
const pct = (x: number) => `${Math.round(x * 100)}%`;
const min = (s: number) => `${s / 60} min`;

const ak = K.items["Mini AK"];
const soldier = K.zombies.Soldier;
const walker = K.zombies.Walker;
const plate = K.armor["Plate Carrier"];
const helmet = K.armor["Military Helmet"];
const rare = (name: string) => K.military.Rares.find((r) => r.Name === name)!;

export const expansion: WikiEntry[] = [
  {
    slug: "blackpine-airfield",
    category: "locations",
    verification: "verified_live",
    lastVerified: VERIFIED_27,
    title: "Blackpine Airfield",
    seoTitle: "Blackpine Airfield in Stillskin Forest: Map, Loot and Military Gear",
    description:
      "Blackpine Airfield in Stillskin Forest: how to get there, the runway, control tower, hangar, command center and barracks, its soldiers, and the rare gear.",
    question: "Where is the military base in Stillskin Forest?",
    answer:
      "Blackpine Airfield is the military base south of Blackpine Ranger Station. Take the lit Ranger Trail east from the end of the Forest Trail, through Ranger Gap, then the access road south from the ranger station to the checkpoint. It is the only place the Plate Carrier, Military Helmet and Mini AK can turn up, and it is guarded by soldier infected.",
    facts: [
      ["Way in", "Ranger Trail → Ranger Gap → ranger station → access road south"],
      ["Buildings", "Command center, Barracks A and B, control tower, Hangar 1, guard booth"],
      ["Enemies", "Soldiers (only here)"],
      ["Power", "One generator for the floodlights, runway and interior lights"],
    ],
    sections: [
      {
        id: "layout",
        heading: "Layout",
        blocks: [
          { type: "list", items: [
            "**Checkpoint:** a guard booth, a jammed barrier and the airfield sign. The perimeter fence has gaps where it has been torn down.",
            "**Command center:** operations room with a map table and radios, offices, and a restricted store room. Lockers and crates.",
            "**Barracks A:** two rows of bunks with a footlocker at each. **Barracks B:** bunks, a card table and a wall of lockers.",
            "**Control tower:** a ground room, an outside stair in two flights and a glass control cab that overlooks the whole field.",
            "**Hangar 1:** a big open shed with a transport plane, work benches, drums and stacked crates. The east doors are jammed half open.",
            "**The runway:** long, cracked and exposed. Crossing it at night is a risk.",
          ] },
          { type: "p", text: "Every building has working doors (E / Square), and the infected bash closed ones just as they do in town. The buildings can be boarded up with the [Hammer](@hammer)." },
        ],
      },
      {
        id: "loot",
        heading: "Loot",
        blocks: [
          { type: "p", text: `The airfield's lockers, footlockers and crates hold ordinary military supplies: ammunition (including Rifle Rounds), first aid, batteries, food, tools and the odd Gas Can. About ${pct(K.militaryLootTable.emptyChance)} of searches come up empty.` },
          { type: "p", text: "The rare gear is placed differently: see [Military armor](@military-armor), [Mini AK](@mini-ak) and the rare-gear rules below." },
        ],
      },
      {
        id: "rare-gear",
        heading: "How the rare gear appears",
        blocks: [
          { type: "p", text: "Each morning (the first morning of a run included), each rare item gets one chance for the whole server to be hidden in a random unsearched airfield container. A miss means none that day. There is no guarantee after a set number of days, and never more than one of each waiting to be found." },
          { type: "table", caption: "Daily chance per item (one survivor)", head: ["Item", "Chance each morning"], rows: [
            ["Plate Carrier", pct(rare("Plate Carrier").Chance)],
            ["Military Helmet", pct(rare("Military Helmet").Chance)],
            ["Mini AK", pct(rare("Mini AK").Chance)],
          ] },
          { type: "p", text: `A bigger squad raises those chances a little (+${pct(K.military.PerExtraPlayer)} of the base chance per extra survivor, at most +${pct(K.military.MaxPlayerBonus)}). It never adds extra copies. In a simulation of 200,000 solo runs, at least one of the three appeared on Day 1 in about 31% of runs and by Day 3 in about 67%.` },
        ],
      },
    ],
    related: ["soldier", "military-armor", "mini-ak", "generators-and-gas-cans"],
    sources: [SRC.config27, SRC.world27, SRC.playtest27],
    aliases: ["military base", "army base", "airfield", "runway", "hangar", "control tower", "barracks"],
    gaps: ["Not yet walked through with two or more players."],
  },
  {
    slug: "soldier",
    category: "enemies",
    verification: "verified_live",
    lastVerified: VERIFIED_27,
    title: "Soldier",
    seoTitle: "Soldier Infected in Stillskin Forest: Health, Damage and Helmets",
    description:
      "Soldier infected in Stillskin Forest: tougher and harder-hitting than a Walker, found only at Blackpine Airfield. How their helmets change headshots.",
    question: "How do you kill the soldier zombies in Stillskin Forest?",
    answer: `Aim for the head. Soldiers have ${soldier.health} health (a Walker has ${walker.health}) and hit for ${soldier.damage}. About ${pct(soldier.helmetChance!)} wear a helmet: the first headshot knocks it off and deals heavy damage instead of killing, and the next headshot kills as usual. They only appear at Blackpine Airfield.`,
    facts: [["Health", String(soldier.health)], ["Damage", String(soldier.damage)], ["Chase speed", String(soldier.chaseSpeed)], ["Helmet", `About ${pct(soldier.helmetChance!)}`], ["Where", "Blackpine Airfield only"]],
    sections: [
      {
        id: "helmets",
        heading: "Helmets and headshots",
        blocks: [
          { type: "p", text: `A headshot normally kills any infected outright. A helmeted soldier's first headshot instead deals ${K.helmetHeadshot.multiplier}× the gun's damage or ${pct(K.helmetHeadshot.share)} of its health, whichever is more, and the helmet flies off. With the Pistol that is two headshots, against four body shots.` },
        ],
      },
      {
        id: "where",
        heading: "Where they are",
        blocks: [
          { type: "p", text: `Soldiers wake when a survivor comes near the airfield: up to ${K.airfield.dayBudget} by day and ${K.airfield.nightBudget} at night. They never spawn anywhere else, and they appear out of sight, away from survivors.` },
          { type: "p", text: "Their kills are a little more likely to drop ammunition, often Rifle Rounds. See [Night survival](@night-survival)." },
        ],
      },
    ],
    related: ["blackpine-airfield", "enemy-comparison", "walker", "mini-ak"],
    sources: [SRC.config27, SRC.playtest27],
    aliases: ["soldier zombie", "military zombie", "army zombie", "helmet zombie"],
  },
  {
    slug: "mini-ak",
    category: "weapons",
    verification: "verified_live",
    lastVerified: VERIFIED_27,
    title: "Mini AK",
    seoTitle: "Mini AK in Stillskin Forest: Damage, Fire Rate and Where to Find It",
    description:
      "The Mini AK in Stillskin Forest: a fully automatic carbine using Rifle Rounds, only found at Blackpine Airfield. Damage, fire rate, magazine and noise.",
    question: "Where do you find the Mini AK in Stillskin Forest?",
    answer: `Only at Blackpine Airfield, and rarely: it has a ${pct(rare("Mini AK").Chance)} chance each morning to be hidden in an airfield container. It is fully automatic (${Math.round(60 / ak.Cooldown)} rounds per minute), deals ${ak.Damage} per bullet, holds ${ak.MagSize} rounds and uses Rifle Rounds. It is loud.`,
    facts: [["Type", "Automatic carbine"], ["Damage", String(ak.Damage)], ["Fire rate", `${Math.round(60 / ak.Cooldown)} rounds/min`], ["Magazine", String(ak.MagSize)], ["Reload", `${ak.ReloadTime} s`], ["Range", `${ak.Range} studs`], ["Ammo", "Rifle Rounds"]],
    sections: [
      {
        id: "using-it",
        heading: "Using it",
        blocks: [
          { type: "p", text: "Hold fire to keep shooting (R2 on controller). Aim (L2) to tighten the spread. Every shot carries as far as a shotgun blast, so a long burst calls the infected from a wide area." },
          { type: "p", text: "Rifle Rounds come from the asylum, stashes, airfield containers and the infected, especially soldiers. See [Ammunition](@ammunition)." },
        ],
      },
    ],
    related: ["weapons-compared", "ammunition", "blackpine-airfield", "pistol"],
    sources: [SRC.items27, SRC.playtest27],
    aliases: ["ak", "ak47", "ak-47", "rifle", "assault rifle", "automatic"],
    gaps: ["The third-person model uses the shared gun pose; no dedicated reload animation yet."],
  },
  {
    slug: "military-armor",
    category: "items",
    verification: "verified_live",
    lastVerified: VERIFIED_27,
    title: "Military Armor: Plate Carrier and Helmet",
    seoTitle: "Plate Carrier and Military Helmet in Stillskin Forest: Armor Guide",
    description:
      "How armor works in Stillskin Forest: the Plate Carrier and Military Helmet, how much damage each absorbs, durability, and how to wear and remove them.",
    question: "How does armor work in Stillskin Forest?",
    answer: `Hold the armor and press fire to wear it; it leaves your bag and shows on your character. The Plate Carrier absorbs ${pct(plate.Absorb)} of each hit and the Military Helmet ${pct(helmet.Absorb)}, until their durability (${plate.Durability} and ${helmet.Durability}) runs out. Press K to take it off. Both are only found at Blackpine Airfield.`,
    facts: [["Plate Carrier", `${pct(plate.Absorb)} of each hit, ${plate.Durability} durability`], ["Military Helmet", `${pct(helmet.Absorb)} of each hit, ${helmet.Durability} durability`], ["Wear", "Hold it, press fire (WEAR on touch)"], ["Take off", "K"]],
    sections: [
      {
        id: "how-it-works",
        heading: "How it works",
        blocks: [
          { type: "list", items: [
            "Each worn piece takes its share of a hit, and that much is taken off its durability. Wearing both, a 20-damage hit costs you 9 health.",
            "At 0 durability a piece breaks and is gone.",
            "Taken-off armor goes back in your bag with its remaining durability, or onto the ground if your bag is full.",
            "If you are knocked out of the run for good, what you wore drops where you fell.",
            "The HUD shows each worn piece's condition above the health bar.",
          ] },
        ],
      },
    ],
    related: ["blackpine-airfield", "health-and-healing", "soldier"],
    sources: [SRC.config27, SRC.playtest27],
    aliases: ["armor", "armour", "plate carrier", "vest", "body armor", "helmet", "military helmet"],
    gaps: ["Taking armor off with a controller is not mapped yet (keyboard K only)."],
  },
  {
    slug: "night-survival",
    category: "mechanics",
    verification: "verified_live",
    lastVerified: VERIFIED_27,
    title: "Night Survival: Hunters, Wisps, Night Caches and Sleep",
    seoTitle: "Night in Stillskin Forest: Hunting Infected, Wisps, Caches and Sleep",
    description:
      "What happens at night in Stillskin Forest: infected that search for you, green wisps, glowing night caches, ammo from kills, and sleeping until dawn.",
    question: "What can you do at night in Stillskin Forest?",
    answer:
      "Go out for the rewards or hole up. At night the infected near you start searching your area, but green wisps lead you to stashes or toward relics, five glowing night caches appear with the best outdoor loot, and kills can drop ammo. If everyone is inside one boarded-up building, you can all sleep until dawn for some health.",
    sections: [
      {
        id: "hunters",
        heading: "The infected come looking",
        blocks: [
          { type: "p", text: `Every ${K.nightHunt.Interval} seconds after dark, a share of the calm infected near each survivor (in your part of the map and the parts around it) set off to search the ground near you. They are sent near you, never to your exact spot, and find you only by sight or sound. The share grows over the first nights: about 30% on Night 1, 40% on Night 2 and ${pct(K.nightHunt.Fraction)} from Night 3, at most ${K.nightHunt.MaxPerSurvivor} per survivor each time. They set off a few seconds apart, not all at once.` },
        ],
      },
      {
        id: "wisps",
        heading: "Green wisps",
        blocks: [
          { type: "p", text: `${K.night.Wisps.PerNight} times a night, a green light appears ahead of a survivor. It only drifts on while someone is within ${K.night.Wisps.LeadRange} studs, and fades if nobody follows. About half lead toward a relic nobody has taken (to its way in); the rest lead to a stash of ${K.night.Wisps.StashItems} night-cache items.` },
        ],
      },
      {
        id: "caches",
        heading: "Night caches",
        blocks: [
          { type: "p", text: `${K.night.Caches.PerNight} glowing green crates appear around the map at nightfall and vanish at dawn. They have the best outdoor odds (Rifle Rounds, guns, first aid, headlamp parts), but opening one is ${K.night.Caches.NoiseMult}× as loud as a normal crate.` },
        ],
      },
      {
        id: "ammo-drops",
        heading: "Ammo from kills",
        blocks: [
          { type: "p", text: `An infected you kill has a ${pct(K.ammoDrops.Chance)} chance to drop a little ammunition (soldiers ${pct(K.ammoDrops.SoldierChance)}): about one drop every five or six kills. It is mostly Pistol Ammo, sometimes Shells, rarely Rifle Rounds, and disappears after ${min(K.ammoDrops.Lifetime)}. Only kills a survivor made count.` },
        ],
      },
      {
        id: "sleep",
        heading: "Sleeping until dawn",
        blocks: [
          { type: "p", text: `If everyone alive is inside one building with at least ${K.night.Sleep.MinPlanks} planks nailed up, and no infected are right outside, a "Sleep until dawn" prompt appears (hold N, or D-pad up). Everyone has to hold it. The night ends at once, and everyone loses ${K.night.Sleep.HealthCost} health (never below 10).` },
        ],
      },
    ],
    related: ["day-night-cycle", "doors-and-building", "detection-and-noise", "generators-and-gas-cans"],
    sources: [SRC.config27, SRC.playtest27],
    aliases: ["night", "wisp", "wisps", "night cache", "sleep", "skip night", "ammo drop", "night hunt"],
    gaps: ["Sleeping with two or more players voting has not been tested."],
  },
  {
    slug: "generators-and-gas-cans",
    category: "mechanics",
    verification: "verified_live",
    lastVerified: VERIFIED_27,
    title: "Generators and Gas Cans",
    seoTitle: "Generators and Gas Cans in Stillskin Forest: Fuel and Power",
    description:
      "How to power lights in Stillskin Forest: where Gas Cans turn up, how long one runs a generator, starting and stopping it, and the noise it makes.",
    question: "How do generators work in Stillskin Forest?",
    answer: `Hold E at the generator's fuel cap with a Gas Can in your bag to add ${min(K.generators.SecondsPerCan)} of fuel (one whole night), up to ${min(K.generators.MaxFuel)}. Start it at the control panel on the other end. While it runs it lights everything wired to it, burns fuel, and its noise draws the infected nearby.`,
    facts: [["One Gas Can", min(K.generators.SecondsPerCan)], ["Fuel tank", min(K.generators.MaxFuel)], ["Noise", `Every ${K.generators.NoiseEvery} s, ${K.generators.NoiseRadius}-stud radius`], ["Gas Cans", "One chance per map section per day"]],
    sections: [
      {
        id: "gas-cans",
        heading: "Finding Gas Cans",
        blocks: [
          { type: "p", text: "Each section of the map (the campgrounds, the trail, north and south Stillwater, Blackthorn Hill, the lowland below it, the ranger station and the airfield) gets one Gas Can each morning in one of a few spots. A section never has two lying around: if yesterday's is still there, no new one appears. Airfield containers can also hold one." },
        ],
      },
      {
        id: "generators",
        heading: "Generators",
        blocks: [
          { type: "p", text: "The generator at [Blackpine Airfield](@blackpine-airfield) powers its floodlights, runway lights and the lights inside its buildings. Fuel burns only while it runs, on the server's clock. A new run starts every generator empty." },
        ],
      },
    ],
    related: ["blackpine-airfield", "night-survival", "headlamp"],
    sources: [SRC.config27, SRC.playtest27],
    aliases: ["generator", "gas can", "fuel", "gasoline", "power", "floodlights"],
    gaps: ["The ranger station's own generator works separately and doesn't use fuel yet. No engine-running sound yet."],
  },
];
