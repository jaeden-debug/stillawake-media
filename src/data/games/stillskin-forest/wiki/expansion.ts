import type { WikiEntry } from "@/data/games/types";
import knowledge from "@/data/games/stillskin-forest/knowledge.json";
import { SRC } from "./sources";

/**
 * The Blackpine expansion (published build of 27 Oct 2026; loot economy update 28 Oct 2026): the airfield, military gear, soldier
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
const VERIFIED_28 = "2026-10-28";
const econ = K.economy;

export const expansion: WikiEntry[] = [
  {
    slug: "blackpine-airfield",
    category: "locations",
    verification: "verified_live",
    lastVerified: VERIFIED_28,
    title: "Blackpine Airfield",
    seoTitle: "Blackpine Airfield in Stillskin Forest: Map, Loot and Military Gear",
    description:
      "Blackpine Airfield in Stillskin Forest: how to get there, the runway, control tower, hangar, command center and barracks, its soldiers, and the rare gear.",
    question: "Where is the military base in Stillskin Forest?",
    answer:
      "Blackpine Airfield is the military base east of Stillwater, south of Blackpine Ranger Station. Three lit trails lead there from town through the forest: from the end of Main Street to the north checkpoint and to a cut in the west fence between the barracks, and from the park to a second fence cut by Hangar 1. It is the only place the Plate Carrier, Military Helmet and Mini AK can turn up, and it is guarded by soldier infected.",
    facts: [
      ["Way in", "Three lit trails from town: to the checkpoint, the barracks and Hangar 1"],
      ["Buildings", "Command center, Barracks A and B, control tower, Hangar 1, guard booth"],
      ["Enemies", "Soldiers (only here)"],
      ["Power", "One generator for the floodlights, runway and interior lights (needs a Jerry Can)"],
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
          { type: "p", text: "There are no crates or lockers to search any more. Supplies lie out in the open: on bunks, desks, workbenches, shelves and floors across the barracks, hangar, command center and tower. Ammunition (including Rifle Rounds), first aid, batteries, food, tools, Gun Repair Kits and the odd shotgun turn up. Not every spot has something; the server keeps only part of them filled at a time." },
          { type: "p", text: "The airfield is also one of the three places a [Jerry Can](@generators-and-jerry-cans) can appear." },
          { type: "p", text: "The rare gear is placed differently: see [Military armor](@military-armor), [Mini AK](@mini-ak) and the rare-gear rules below." },
        ],
      },
      {
        id: "rare-gear",
        heading: "How the rare gear appears",
        blocks: [
          { type: "p", text: "Every morning (the first morning of a run included), the server picks which of the three rare items can appear that day: always at least one and never all three. Over many days each of the Plate Carrier, the Military Helmet and the Mini AK is picked on about half of them." },
          { type: "table", caption: "Rare gear per day (100,000 simulated days)", head: ["Picked that day", "Share of days"], rows: [
            ["One of the three", "50%"],
            ["Two of the three", "50%"],
            ["None, or all three", "Never"],
          ] },
          { type: "p", text: "A picked item lies on a floor spot somewhere inside the airfield fence, out of sight of anyone nearby. If one of that kind is still lying there unclaimed, no second one appears. Over a whole server session each kind can appear at most once per survivor in the run, so a squad still has to search and share. The odds are the same for everyone: nothing looks at how you play or what you buy." },
        ],
      },
    ],
    related: ["soldier", "military-armor", "mini-ak", "generators-and-jerry-cans"],
    sources: [SRC.config28, SRC.world27, SRC.playtest27, SRC.playtest28],
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
    lastVerified: VERIFIED_28,
    title: "Mini AK",
    seoTitle: "Mini AK in Stillskin Forest: Damage, Fire Rate and Where to Find It",
    description:
      "The Mini AK in Stillskin Forest: a fully automatic carbine using Rifle Rounds, only found at Blackpine Airfield. Damage, fire rate, magazine and noise.",
    question: "Where do you find the Mini AK in Stillskin Forest?",
    answer: `Only at Blackpine Airfield: on about half of all days it is one of the rare items picked for that morning, and then it lies somewhere inside the airfield fence. It is fully automatic (${Math.round(60 / ak.Cooldown)} rounds per minute), deals ${ak.Damage} per bullet, holds ${ak.MagSize} rounds and uses Rifle Rounds. It is loud.`,
    facts: [["Type", "Automatic carbine"], ["Damage", String(ak.Damage)], ["Fire rate", `${Math.round(60 / ak.Cooldown)} rounds/min`], ["Magazine", String(ak.MagSize)], ["Reload", `${ak.ReloadTime} s`], ["Range", `${ak.Range} studs`], ["Ammo", "Rifle Rounds"]],
    sections: [
      {
        id: "using-it",
        heading: "Using it",
        blocks: [
          { type: "p", text: "Hold fire to keep shooting (R2 on controller). Aim (L2) to tighten the spread. Every shot carries as far as a shotgun blast, so a long burst calls the infected from a wide area." },
          { type: "p", text: "Rifle Rounds come from the asylum, stashes, the airfield and the infected, especially soldiers. See [Ammunition](@ammunition)." },
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
    lastVerified: "2026-10-30",
    title: "Military Armor: Plate Carrier and Helmet",
    seoTitle: "Plate Carrier and Military Helmet in Stillskin Forest: Armor Guide",
    description:
      "How armor works in Stillskin Forest: the Plate Carrier and Military Helmet, how much damage each absorbs, durability, and how to wear and remove them.",
    question: "How does armor work in Stillskin Forest?",
    answer: `Hold E (X / Square) on armor lying on the ground and it goes straight on, with no bag slot needed ("Equip Helmet", or "Swap Helmet" if you already wear one); a piece in your bag goes on when you hold it and press fire. The Plate Carrier absorbs ${pct(plate.Absorb)} of each hit and the Military Helmet ${pct(helmet.Absorb)}, until their durability (${plate.Durability} and ${helmet.Durability}) runs out. Press K to take it off. Both are only found at Blackpine Airfield.`,
    facts: [["Plate Carrier", `${pct(plate.Absorb)} of each hit, ${plate.Durability} durability`], ["Military Helmet", `${pct(helmet.Absorb)} of each hit, ${helmet.Durability} durability`], ["Wear", "Hold E on it on the ground (no bag slot)"], ["Take off", "K"]],
    sections: [
      {
        id: "how-it-works",
        heading: "How it works",
        blocks: [
          { type: "list", items: [
            "Each worn piece takes its share of a hit, and that much is taken off its durability. Wearing both, a 20-damage hit costs you 9 health.",
            "At 0 durability a piece breaks and is gone.",
            "Taken-off armor goes back in your bag with its remaining durability, or onto the ground if your bag is full. Swapping works the same way: the old piece is never deleted.",
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
    lastVerified: "2026-10-30",
    title: "Night Survival: New Arrivals, Wisps, Night Caches and Sleep",
    seoTitle: "Night in Stillskin Forest: New Infected, Wisps, Caches and Sleep",
    description:
      "What happens at night in Stillskin Forest: fresh infected even where you cleared them, green wisps, glowing night caches, ammo from kills, and sleeping until dawn.",
    question: "What can you do at night in Stillskin Forest?",
    answer:
      "Go out for the rewards or hole up. At nightfall fresh infected come into the woods, even where you cleared them by day, but green wisps lead you to stashes or toward relics, five glowing night caches appear with the best outdoor loot, and kills can drop ammo. If everyone is inside one boarded-up building, you can all sleep until dawn for some health.",
    sections: [
      {
        id: "new-arrivals",
        heading: "New infected at nightfall",
        blocks: [
          { type: "p", text: `When night falls every part of the map, including ground you cleared by day and are still standing on, gets a fresh batch of up to ${K.regions.NightQuota} infected, up to ${K.population.NightAmbient} in the forest in all. They arrive a few at a time, out of sight and at least 70 studs from anyone, and start out wandering: they don't know where you are. They find you the usual way, by seeing you, hearing you, or from another infected that saw you. Light and movement give you away; darkness, crouching and walls help. See [Detection and noise](@detection-and-noise).` },
          { type: "p", text: `Kill the ones around you and your ground stays clear for the night. Ground nobody is standing on can get a couple more later in the night (after about ${Math.round(K.regions.NightReinforceAfter / 60)} minutes), and those can wander over to you.` },
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
          { type: "p", text: `Nail at least ${K.night.Sleep.MinPlanks} planks onto a building and, at dusk or night, a card under your objective says SLEEP UNTIL DAWN. Hold E (X / Square on a controller) inside to lie down: that asks the squad to sleep. Everyone still alive has to lie down in the same shelter; downed and fallen players don't hold it up. Teammates outside see "Hold E to Return to Base", which walks them into the shelter, but not while something is close to them or after them. Hold E again to get up. When everyone is down, the screen fades, the night is skipped, and you all wake at dawn, ${K.night.Sleep.HealthCost} health lighter (never below 10). Infected right by the shelter stop it, and the card says why.` },
        ],
      },
    ],
    related: ["day-night-cycle", "doors-and-building", "detection-and-noise", "generators-and-jerry-cans"],
    sources: [SRC.config27, SRC.playtest27],
    aliases: ["night", "wisp", "wisps", "night cache", "sleep", "skip night", "ammo drop", "night hunt"],
    gaps: ["Sleeping with three or four players has not been tested (two players tested)."],
  },
  {
    slug: "generators-and-jerry-cans",
    category: "mechanics",
    verification: "verified_live",
    lastVerified: "2026-10-29",
    title: "Generators and Jerry Cans",
    seoTitle: "Generators and Jerry Cans in Stillskin Forest: Fuel and Power",
    description:
      "How to power lights in Stillskin Forest: where Jerry Cans turn up, refuelling a generator, how long a can lasts, starting and stopping it, and the noise it makes.",
    question: "How do generators work in Stillskin Forest?",
    answer: `Take a Jerry Can in your hands and walk up to the generator: the prompt reads "Refuel Generator". Hold E (Square on controller) for 2.5 seconds to pour it in; one can adds ${min(K.generators.SecondsPerCan)} of fuel (one whole night), up to ${min(K.generators.MaxFuel)}. The prompt then reads "Start Generator": hold E for a second to start it, and again to stop it. It burns fuel only while running, lights everything wired to it, and its noise draws the infected nearby.`,
    facts: [["One Jerry Can", min(K.generators.SecondsPerCan)], ["Fuel tank", min(K.generators.MaxFuel)], ["Refuel", "Hold 2.5 s with the can in hand"], ["Start / stop", "Hold 1 s"], ["Noise", `Every ${K.generators.NoiseEvery} s, ${K.generators.NoiseRadius}-stud radius`], ["Jerry Cans in the world", `${econ.JerryCans.Total} at a time`]],
    sections: [
      {
        id: "jerry-cans",
        heading: "Finding Jerry Cans",
        blocks: [
          { type: "p", text: `Only ${econ.JerryCans.Total} Jerry Cans exist at a time, counting the ones lying around and the ones in bags. They turn up in only three places: [Blackpine Airfield](@blackpine-airfield), [St. Agnes Hospital](@st-agnes-hospital) and the campground sheds. Picking one up or dropping it doesn't make a new one; pouring one into a generator uses it up, and a replacement appears somewhere in those three places a little later.` },
          { type: "p", text: "A Jerry Can takes a bag slot of its own and cans don't stack." },
        ],
      },
      {
        id: "refuelling",
        heading: "Refuelling, starting and stopping",
        blocks: [
          { type: "p", text: "Each generator has one prompt. What it does depends on what you're holding and the generator's state:" },
          { type: "table", caption: "What the generator prompt says", head: ["When", "Prompt", "What a hold does"], rows: [
            ["Jerry Can in your hands, tank not full", "Refuel Generator", "Pours the can in (2.5 s hold)"],
            ["Fuel in it, switched off", "Start Generator", "Starts it (1 s hold)"],
            ["Running", "Stop Generator", "Stops it and keeps the fuel that's left"],
            ["Empty, no can in hand", "Generator needs fuel. Equip a jerry can.", "Nothing"],
            ["Another survivor is pouring", "Someone is refuelling", "Nothing"],
          ] },
          { type: "list", items: [
            "The can has to be in your hands: select it on the hotbar. One left in your bag won't pour.",
            "Let go early, walk away, get downed or put the can away and nothing is used: the can stays yours.",
            "The can only disappears once its fuel is in. You'll see \"Generator refuelled\" and the new fuel time.",
            "One survivor refuels a generator at a time, and one press never refuels and starts it at once.",
            "When the fuel runs out it stops by itself: \"Generator out of fuel.\"",
          ] },
        ],
      },
      {
        id: "generators",
        heading: "The generators",
        blocks: [
          { type: "list", items: [
            "**Blackpine Airfield:** powers its floodlights, runway lights and the lights inside its buildings.",
            "**Blackpine Ranger Station:** powers the compound's floodlights and the tower beacon. It used to run without fuel; it now needs a Jerry Can like the airfield's.",
          ] },
          { type: "p", text: "Press E at the switch to start or stop one. With no fuel it says so: find a Jerry Can. Fuel burns only while it runs, on the server's clock, so stopping it saves what's left. A new run starts every generator empty." },
        ],
      },
    ],
    related: ["blackpine-airfield", "night-survival", "headlamp"],
    sources: [SRC.config28, SRC.playtest28],
    aliases: ["generator", "gas can", "jerry can", "fuel", "gasoline", "power", "floodlights", "refuel"],
    gaps: ["No engine-running sound yet. The pouring sound has not been reviewed by the developer. Refuelling was tested with keyboard input in Studio, not yet with a controller."],
  },
];
