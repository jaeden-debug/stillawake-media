import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "locations", verification: "verified_live", lastVerified: VERIFIED } as const;

export const locations: WikiEntry[] = [
  {
    ...base,
    slug: "campgrounds",
    lastVerified: "2026-10-31",
    title: "The Campgrounds",
    seoTitle: "The Campgrounds in Stillskin Forest: Cabins, Lake and Watchtowers",
    description:
      "The Campgrounds are where a new Stillskin Forest run starts: cabins, an abandoned house, sheds, a lake and dock, two watchtowers, and a TV with something on it.",
    question: "Where do you start in Stillskin Forest?",
    answer:
      "A new run starts at the Campgrounds, the northern end of the map: camping cabins, the Abandoned House, two sheds, two watchtowers, and a lake with a dock. The cabins are the best place on the map to find a hammer.",
    sections: [
      {
        id: "what-is-here",
        heading: "What's here",
        blocks: [
          { type: "list", items: [
            "Camping cabins and two sheds. Their loot leans toward tools: [hammers](@hammer) turn up here more than anywhere else, along with food and ammo. A shed can hold one of the two [jerry cans](@generators-and-jerry-cans) in play.",
            "The Abandoned House, with a couple of loot spots and a television. Walk up to the TV and the static cuts to green camcorder footage, with subtitles.",
            "Two watchtowers with climbable ladders.",
            "A lake and dock, lit by lanterns at night.",
          ] },
          { type: "p", text: "A cabin, the Abandoned House or a shed counts as a shelter: board it with three planks and you can [sleep through the night](@night-survival) there." },
        ],
      },
      {
        id: "routes",
        heading: "Routes out",
        blocks: [
          { type: "p", text: "South through [the Forest Trail](@forest-trail) to [Stillwater](@stillwater). A squad starts a run spread across a few spawn points at the south edge of camp, by the trail." },
        ],
      },
    ],
    related: ["forest-trail", "stillwater", "how-to-play"],
    sources: [SRC.playtest, SRC.world, SRC.notes30],
    aliases: ["camp", "spawn", "cabins", "lake", "dock", "watchtower"],
  },
  {
    ...base,
    slug: "forest-trail",
    lastVerified: "2026-10-27",
    title: "The Forest Trail",
    seoTitle: "The Forest Trail in Stillskin Forest",
    description:
      "The Forest Trail links the Campgrounds to Stillwater in Stillskin Forest: lanterns, a signpost, trail loot, and something in the trees.",
    answer:
      "The Forest Trail is the path from the Campgrounds south through deep forest to Stillwater. It is lined with lanterns and has a signpost, a fallen log, loot spots along the way, and a scare where something runs through the trees. Off the trail the woods are thick with pines, bushes and ferns.",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "The trail is the main road between camp and town. Its loot spots refill at dawn like everywhere else, and it is one of the places headlamp parts can turn up. Infected spawn across the trail as well as the forest and town, never closer than 70 studs to a survivor and never in your line of sight." },
        ],
      },
      {
        id: "the-woods",
        heading: "The woods around it",
        blocks: [
          { type: "p", text: "Stillskin Forest is one continuous forest: the town, the asylum, the lake, the ranger station and the airfield sit in clearings inside it, joined by the lantern-lit trails. Between them the pines stand close, with bushes and ferns underneath. Bushes rustle when anything walks through them, you or an infected, and the wind sways the trees and blows leaves about. Under the canopy at night it is properly dark: you can see the ground and the nearest trunks, and past that you need the [headlamp](@headlamp)." },
        ],
      },
    ],
    related: ["campgrounds", "stillwater"],
    sources: [SRC.playtest],
    aliases: ["trail", "path", "forest path"],
  },
  {
    ...base,
    slug: "stillwater",
    lastVerified: "2026-10-31",
    title: "Stillwater",
    seoTitle: "Stillwater in Stillskin Forest: Town Map, Buildings and Secrets",
    description:
      "Stillwater is the abandoned town at the heart of Stillskin Forest: the hospital, diner, general store, houses, park, and the road to Blackthorn.",
    question: "What is in Stillwater?",
    answer:
      "Stillwater is the ruined town south of the forest. It holds St. Agnes Hospital, Rosie's Diner, Pine General Store, five houses, Memorial Park and a creek, plus wrecks, a police roadblock and a payphone that rings at night. The road west climbs to Blackthorn Asylum.",
    sections: [
      {
        id: "arriving",
        heading: "Arriving",
        blocks: [
          { type: "p", text: "The town sign reads WELCOME TO STILLWATER, population 812, with the number crossed out to 0. A police roadblock with flashing lights stands at the entrance." },
        ],
      },
      {
        id: "places",
        heading: "Places in town",
        blocks: [
          { type: "list", items: [
            "[St. Agnes Hospital](@st-agnes-hospital) and, beneath it, [the morgue](@morgue)",
            "[Pine General Store](@pine-general-store) and its walk-in freezer",
            "[Rosie's Diner](@rosies-diner) and the alley between it and the store",
            "[The houses](@houses-of-stillwater) on Elm and Birch",
            "[Memorial Park](@memorial-park) and [the storm drain](@storm-drain) under it",
            "The creek, with floating trash, a sludge pipe and the Main Street bridge",
          ] },
        ],
      },
      {
        id: "streets",
        heading: "On the streets",
        blocks: [
          { type: "p", text: "Burning wrecks, a crashed car whose alarm draws infected, fire barrels and police tape. Streetlights come on at dusk; some flicker and some are dead. Graffiti warns THE HOLLOW IS UNDER THE GRAVES and DON'T GO UP THE HILL, and a sign points to BLACKTHORN ASYLUM 2 MI." },
          { type: "p", text: "Every building door in town opens and closes the same way, and infected can bash them down. See [Doors and building](@doors-and-building)." },
        ],
      },
      {
        id: "trails-out",
        heading: "Trails out of town",
        blocks: [
          { type: "p", text: "Lantern-lit trails run east from the end of Main Street and from the park to [Blackpine Airfield](@blackpine-airfield), and a short spur leads to the morgue stairs beside the hospital." },
        ],
      },
      {
        id: "the-road-to-blackthorn",
        heading: "The road to Blackthorn",
        blocks: [
          { type: "p", text: "Birch Lane bends into Blackthorn Hill Road, past the shoved-aside ROAD CLOSED barricade and up a guard-railed climb to the asylum gate. The note nailed to that barricade starts [the asylum quest](@blackthorn-admission-ledger)." },
        ],
      },
    ],
    related: ["st-agnes-hospital", "pine-general-store", "memorial-park", "blackthorn-asylum", "secrets-and-easter-eggs"],
    sources: [SRC.playtest, SRC.world, SRC.notes30],
    aliases: ["town", "stillwater town", "main street", "police car", "wrecked cars"],
  },
  {
    ...base,
    slug: "st-agnes-hospital",
    lastVerified: "2026-10-31",
    title: "St. Agnes Hospital",
    seoTitle: "St. Agnes Hospital in Stillskin Forest: Ambush, Loot and Roof",
    description:
      "St. Agnes Hospital in Stillskin Forest: a two-floor hospital with an ambush, medical loot, lockers to hide in, a ladder to the roof, and the morgue below.",
    question: "What happens when you enter St. Agnes Hospital?",
    answer:
      "The first time someone walks into St. Agnes Hospital in a run, three infected burst out of the patient rooms. It has two floors, medical-heavy loot, two lockers to hide in, a ladder to the roof, and stairs on its east side down to the morgue.",
    sections: [
      {
        id: "layout",
        heading: "Layout",
        blocks: [
          { type: "list", items: [
            "**Ground floor:** lobby and reception, four patient rooms, stairs, a vending machine.",
            "**Upstairs:** a ward, an operating room and an office.",
            "**Outside:** the ER canopy and an abandoned ambulance. At night the red EMERGENCY sign and the ambulance's lightbar are lit.",
            "**Roof:** reached by ladder; a sandbag nest left by someone named Reyes.",
            "**Below:** the [morgue](@morgue), down the stairs on the hospital's east side.",
          ] },
        ],
      },
      {
        id: "the-ambush",
        heading: "The ambush",
        blocks: [
          { type: "p", text: "Three infected come out of the rooms the first time anyone enters in a run. You can fight, run, or hide in one of the two lockers; if they see you get in, the [Dread Encounter](@the-dread-encounter) plays out at your locker." },
        ],
      },
      {
        id: "loot",
        heading: "Loot",
        blocks: [
          { type: "p", text: "First aid kits are the most common find here, along with pistol ammo and snacks. Weapons found in the hospital roll a rarer tier more often than in town, and it is one of the few places a [jerry can](@generators-and-jerry-cans) can turn up. The roof has two stash spots with better odds." },
        ],
      },
      {
        id: "the-roof",
        heading: "The roof",
        blocks: [
          { type: "p", text: "Infected can't follow you up the ladder unless they saw you climb it. When a run ends, the finale plays out on this roof: see [the finale](@death-ghosts-and-the-finale)." },
        ],
      },
      {
        id: "the-vending-machine",
        heading: "The vending machine",
        blocks: [
          { type: "p", text: "You can shake the lobby vending machine. It may drop one snack per run, but the noise draws nearby infected." },
        ],
      },
    ],
    related: ["morgue", "hiding", "first-aid-kit", "climbing-and-ladders"],
    sources: [SRC.playtest, SRC.world, SRC.notes30],
    aliases: ["hospital", "st agnes", "saint agnes"],
  },
  {
    ...base,
    slug: "morgue",
    lastVerified: "2026-10-31",
    title: "The Morgue",
    seoTitle: "The Morgue in Stillskin Forest: How to Find It and What's Inside",
    description:
      "The morgue under St. Agnes Hospital in Stillskin Forest: how to get in by the stairs on its east side, the dread that builds inside, and what's hidden there.",
    question: "How do you get into the morgue in Stillskin Forest?",
    answer:
      "Take the stairs down on the east side of St. Agnes Hospital; a short lantern-lit spur leads to them. The morgue has a drawer wall, autopsy tables and a stash. It is a dread zone, so the longer you stay the worse it gets, and one drawer is a hiding spot.",
    sections: [
      {
        id: "inside",
        heading: "Inside",
        blocks: [
          { type: "p", text: "Finding it counts as a secret: \"The Morgue Under St. Agnes\". A ST. AGNES MORGUE title shows as you enter, and the underground music plays inside. One of the drawers can be [hidden](@hiding) in. It has two loot spots: one rolls hospital supplies, the other is a stash with better odds." },
          { type: "callout", tone: "warning", text: "Dread builds here. At full dread, a Walker can step out behind you. See [dread zones](@the-dread-encounter)." },
        ],
      },
      {
        id: "relic",
        heading: "The relic here",
        spoiler: true,
        blocks: [
          { type: "p", text: "[The Sister's Rosary](@sisters-rosary), one of the four relics needed for [the Rite of Stillness](@the-rite-of-stillness), is in the morgue. Relics are personal: each survivor picks up their own." },
        ],
      },
    ],
    related: ["st-agnes-hospital", "the-dread-encounter", "sisters-rosary"],
    sources: [SRC.playtest, SRC.world, SRC.notes30],
    aliases: ["morgue", "cellar", "autopsy"],
  },
  {
    ...base,
    slug: "pine-general-store",
    lastVerified: "2026-10-31",
    title: "Pine General Store",
    seoTitle: "Pine General Store in Stillskin Forest: Alarm, Freezer and Roof",
    description:
      "Pine General Store in Stillskin Forest: food-heavy loot, a burglar alarm that draws infected, a walk-in freezer out back, and a hideout on the roof.",
    question: "Why does an alarm go off in the general store?",
    answer:
      "Pine General Store has a burglar alarm that goes off the first time someone walks in each run, and it draws infected. The store has food-heavy loot, a walk-in freezer through the back door, and a ladder to a hideout on the roof.",
    sections: [
      {
        id: "the-store",
        heading: "The store",
        blocks: [
          { type: "p", text: "Expect company after the alarm. The loot leans toward [food](@food), with ammo, hammers, lanterns and batteries also common. A mannequin in the store changes place when nobody is looking." },
        ],
      },
      {
        id: "the-freezer",
        heading: "The walk-in freezer",
        blocks: [
          { type: "p", text: "Through the store's back door: meat hooks and a chest freezer you can [hide](@hiding) in. It is a dread zone with a stash spot, and finding it counts as the secret \"The Walk-in\"." },
        ],
      },
      {
        id: "the-roof",
        heading: "The roof",
        blocks: [
          { type: "p", text: "A ladder leads to Danny's hideout, another secret, with a loot spot of its own." },
        ],
      },
    ],
    related: ["stillwater", "food", "secrets-and-easter-eggs"],
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["general store", "store", "shop", "freezer", "walk-in freezer"],
  },
  {
    ...base,
    slug: "rosies-diner",
    lastVerified: "2026-10-31",
    title: "Rosie's Diner",
    seoTitle: "Rosie's Diner in Stillskin Forest",
    description:
      "Rosie's Diner in Stillskin Forest: an emergency radio broadcast about Blackthorn Hill, and the alley with a dumpster to hide in.",
    answer:
      "Rosie's Diner sits on Stillwater's main street. Inside, an emergency radio broadcast warns about Blackthorn Hill and the graveyard. The alley between the diner and the general store has a dumpster you can hide in.",
    sections: [
      {
        id: "the-broadcast",
        heading: "The broadcast",
        blocks: [
          { type: "p", text: "The radio plays with captions when you come in. It is one of the first pointers toward [Blackthorn Asylum](@blackthorn-asylum)." },
          { type: "p", text: "The diner's furniture has been cleared out. Its two loot spots, on the floor, roll from the same food-heavy table as [the general store](@pine-general-store)." },
        ],
      },
      {
        id: "the-alley",
        heading: "The alley",
        blocks: [
          { type: "p", text: "Dumpsters, trash, a puddle, a flickering light, and a dumpster-slam scare. The alley dumpster is one of the [hiding spots](@hiding)." },
        ],
      },
    ],
    related: ["stillwater", "pine-general-store", "hiding"],
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["diner", "rosies", "alley"],
  },
  {
    ...base,
    slug: "houses-of-stillwater",
    lastVerified: "2026-10-31",
    title: "The Houses of Stillwater",
    seoTitle: "Stillwater Houses in Stillskin Forest: Attic, Hidden Study and Tapes",
    description:
      "The five houses on Elm and Birch in Stillskin Forest, including Tommy's attic, Paul's hidden study behind a bookshelf, wardrobes to hide in, and story tapes.",
    question: "How do you find the hidden study in Stillskin Forest?",
    answer:
      "Paul's hidden study is in Birch 1, behind a bookshelf you can walk through; a cold draft hints at it. The other houses hold Tommy's attic (Elm 1, up a ladder through a hatch), wardrobes to hide in (Elm 2 and Elm 3), and story tapes.",
    sections: [
      {
        id: "the-houses",
        heading: "The houses",
        blocks: [
          { type: "p", text: "Five houses with porches and fences: Elm 1 to 3 and Birch 1 and 2. Two are boarded up and one is burned out. Their furniture has been cleared out, and each has a couple of loot spots on the floor. In Elm 2, a TV switches on by itself." },
        ],
      },
      {
        id: "tommys-attic",
        heading: "Tommy's attic (Elm 1)",
        blocks: [
          { type: "p", text: "A ladder leads up through a hatch to a full attic room: a circle of dolls, a rocking chair, a music box, and a trunk you can hide in. The dolls turn to face you when you look away; the chair rocks when you come near. The attic is a dread zone and a secret, with a stash spot." },
        ],
      },
      {
        id: "pauls-study",
        heading: "Paul's hidden study (Birch 1)",
        blocks: [
          { type: "p", text: "Walk through the bookshelf; a cold draft gives it away. The study is a dread zone and a secret, with a note and a stash spot." },
        ],
      },
      {
        id: "tapes",
        heading: "Tapes",
        spoiler: true,
        blocks: [
          { type: "p", text: "Three of the game's five tapes are in houses: Dr. Vance's (Elm 2), Sister Agnes's (Elm 3) and the Groundskeeper's (Birch 2). See [Notes and tapes](@notes-and-tapes)." },
        ],
      },
    ],
    related: ["stillwater", "hiding", "secrets-and-easter-eggs", "notes-and-tapes"],
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["houses", "hidden study", "attic", "tommy's attic", "paul's study", "elm", "birch"],
  },
  {
    ...base,
    slug: "memorial-park",
    lastVerified: "2026-10-31",
    title: "Memorial Park",
    seoTitle: "Memorial Park in Stillskin Forest: The Playground and the Ledger",
    description:
      "Memorial Park in Stillskin Forest: the playground, the broken fountain, the polluted pond, and the readable note that unlocks Blackthorn Asylum.",
    answer:
      "Memorial Park is Stillwater's park: a playground with a music-box scare, a gazebo, picnic tables, a broken fountain spilling sludge, and a polluted pond. The Blackthorn Admission Ledger, the note that unlocks the asylum, is here, and the storm drain runs underneath.",
    sections: [
      {
        id: "the-ledger",
        heading: "The ledger",
        spoiler: true,
        blocks: [
          { type: "p", text: "The riddle on the ROAD CLOSED barricade points here. The Blackthorn Admission Ledger is a readable note on the ground by the park's gazebo, and reading it unlocks the asylum. See [the walkthrough](@blackthorn-admission-ledger)." },
        ],
      },
      {
        id: "underneath",
        heading: "Underneath",
        blocks: [
          { type: "p", text: "[The storm drain](@storm-drain) runs from the creek to a manhole in the park." },
        ],
      },
      {
        id: "trail-east",
        heading: "The trail east",
        blocks: [
          { type: "p", text: "A lantern-lit trail leaves the park's east side for [Blackpine Airfield](@blackpine-airfield), coming out by Hangar 1 and the control tower." },
        ],
      },
    ],
    related: ["stillwater", "storm-drain", "blackthorn-admission-ledger"],
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["park", "fountain", "playground", "picnic tables"],
  },
  {
    ...base,
    slug: "storm-drain",
    lastVerified: "2026-10-31",
    title: "The Storm Drain",
    seoTitle: "The Storm Drain in Stillskin Forest: Under the Park",
    description:
      "The storm drain in Stillskin Forest: a culvert at the creek leads to a tunnel under Memorial Park and a manhole up. A dread zone and a secret.",
    answer:
      "A creek culvert in Stillwater leads into a tunnel that runs under Memorial Park and comes up through a manhole. Finding it counts as the secret \"Under the Park\". It is a dread zone and plays the underground music.",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "The drain is a way across town out of sight, with a stash spot and a note inside. Dread builds while you are inside; see [dread zones](@the-dread-encounter)." },
        ],
      },
    ],
    related: ["memorial-park", "secrets-and-easter-eggs"],
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["drain", "tunnel", "sewer", "culvert", "under the park"],
  },
  {
    ...base,
    slug: "blackthorn-asylum",
    lastVerified: "2026-10-28",
    title: "Blackthorn Asylum",
    seoTitle: "Blackthorn Asylum in Stillskin Forest: How to Get In and What's Inside",
    description:
      "Blackthorn Asylum in Stillskin Forest: how to unlock it, its two floors, the 19 residents, and where the relics, Freeze Device and Hunting Rifle are.",
    question: "How do you get into Blackthorn Asylum?",
    answer:
      "The asylum is locked until someone reads the Blackthorn Admission Ledger, a note in Memorial Park. That unlocks it for your whole team for the run: the doors swing open and the chains drop. The first time anyone sets foot on the grounds afterward, 19 residents wake.",
    sections: [
      {
        id: "getting-there",
        heading: "Getting there",
        blocks: [
          { type: "p", text: "Follow Birch Lane onto Blackthorn Hill Road and climb to the gate. The full unlock is in [the Blackthorn Admission Ledger walkthrough](@blackthorn-admission-ledger)." },
        ],
      },
      {
        id: "layout",
        heading: "Layout",
        blocks: [
          { type: "list", items: [
            "**Ground floor:** the admissions hall and stairs, Ward A and the restraint room, the nurse station, the day room, the cafeteria with the ritual circle, and the kitchen.",
            "**Upstairs:** records, Dr. Vance's office, and a block of six cells.",
            "**Outside:** ivy, boarded windows, a sign missing its N (the letter lies on the step), a green lamp over the doors, a dry fountain with a DO NOT DRINK warning.",
          ] },
        ],
      },
      {
        id: "residents",
        heading: "The residents",
        blocks: [
          { type: "p", text: "19 infected wake when someone first steps onto the grounds after the unlock: mostly Walkers, plus three Runners, a Screamer and a Brute. They are not replaced when killed. You can play it quiet, or loud and fight through." },
        ],
      },
      {
        id: "what-is-inside",
        heading: "What's inside",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "The [Freeze Device](@freeze-device), on the nurse-station counter: each survivor claims their own, once per run. Once you have yours it's gone from the counter for you only.",
            "The Hunting Rifle case, in Dr. Vance's office: hold E to open it, then press E (Square) to claim your rifle. Each survivor gets one per run; losing it doesn't give another. Once you have yours, the rifle in the case is gone for you only.",
            "[Dr. Vance's Ring](@dr-vances-ring), in his office upstairs.",
            "The ritual circle in the cafeteria, where [the Rite of Stillness](@the-rite-of-stillness) is performed.",
            "Two tapes: the Night Nurse and the Records Room.",
          ] },
        ],
      },
    ],
    related: ["blackthorn-admission-ledger", "graveyard", "chapel", "green-lake", "dr-h-vance"],
    sources: [SRC.playtest, SRC.world],
    aliases: ["asylum", "blackthorn", "blackthorn hill", "ritual circle", "cafeteria"],
  },
  {
    ...base,
    slug: "graveyard",
    lastVerified: "2026-10-31",
    title: "The Blackthorn Graveyard",
    seoTitle: "The Graveyard in Stillskin Forest: The Angel and Marion Hollis' Grave",
    description:
      "The graveyard on Blackthorn Hill in Stillskin Forest: the angel statue, the grave it points to, and the Angel's Tear relic.",
    answer:
      "The graveyard sits beside Blackthorn Asylum, with the chapel and the crypt cave behind it. A lit stone angel there, titled The Angel's Hand as you walk up, points at one grave in particular.",
    sections: [
      {
        id: "the-angel",
        heading: "The angel",
        spoiler: true,
        blocks: [
          { type: "p", text: "The angel points at Marion Hollis' grave. Use \"Search the grave\" to find [the Angel's Tear](@angels-tear); each survivor finds their own. The inscription on the angel's base is one of the game's notes." },
        ],
      },
    ],
    related: ["chapel", "crypt-cave", "angels-tear", "blackthorn-asylum"],
    sources: [SRC.playtest, SRC.world, SRC.notes30],
    aliases: ["graves", "cemetery", "angel statue"],
  },
  {
    ...base,
    slug: "chapel",
    lastVerified: "2026-10-31",
    title: "The Chapel",
    seoTitle: "The Chapel in Stillskin Forest: The Rite of Stillness",
    description:
      "The chapel by the Blackthorn graveyard in Stillskin Forest holds the Rite of Stillness and a stair down to the crypt cave.",
    answer:
      "The chapel stands by the Blackthorn graveyard. It holds the note \"The Rite of Stillness\", which explains the ritual, and the crypt cave lies behind it, down a wooden stair.",
    sections: [
      {
        id: "the-rite",
        heading: "The Rite of Stillness",
        spoiler: true,
        blocks: [
          { type: "p", text: "The note names the four relics (the Sister's rosary, the miner's lantern, the angel's tear and the doctor's ring) and says to lay them in the circle on the cafeteria floor, \"where the sick were fed\", then hold the circle until the last candle burns. See [the Rite of Stillness walkthrough](@the-rite-of-stillness)." },
        ],
      },
    ],
    related: ["graveyard", "crypt-cave", "the-rite-of-stillness"],
    sources: [SRC.playtest, SRC.report, SRC.notes30],
    aliases: ["church"],
  },
  {
    ...base,
    slug: "crypt-cave",
    lastVerified: "2026-10-31",
    title: "The Crypt Cave",
    seoTitle: "The Crypt Cave in Stillskin Forest: The Miner's Lantern",
    description:
      "The crypt cave behind the Blackthorn chapel in Stillskin Forest: a green-lit chamber, the Miner's Lantern, and the boulder that hides the way down.",
    answer:
      "Behind the chapel, a stone CRYPT arch and slate steps lead into a cave that runs down to a green-lit chamber. A boulder blocks the way deeper until the relic in the chamber is taken.",
    sections: [
      {
        id: "the-chamber",
        heading: "The chamber",
        spoiler: true,
        blocks: [
          { type: "p", text: "[The Miner's Lantern](@miners-lantern) still burns green here. Each survivor takes their own, and the first one taken makes the boulder grind aside (\"THE LIGHT OPENS THE WAY\"), opening the route into [the Hollow](@the-hollow) for everyone." },
        ],
      },
      {
        id: "getting-there",
        heading: "Getting there",
        blocks: [
          { type: "p", text: "A lantern-lit Crypt Trail leads to the arch, and a THE CRYPT CAVE title shows as you enter. A wooden stair also runs down from the chapel to the cave mouth. A note, \"Groundskeeper's Warning\", lies inside." },
        ],
      },
    ],
    related: ["chapel", "the-hollow", "miners-lantern", "descent-into-the-hollow"],
    sources: [SRC.playtest, SRC.notes30],
    spoiler: true,
    aliases: ["crypt", "cave"],
  },
  {
    ...base,
    slug: "green-lake",
    lastVerified: "2026-10-31",
    title: "Green Lake",
    seoTitle: "Green Lake in Stillskin Forest: The Water Remembers",
    description:
      "Green Lake beside Blackthorn Asylum in Stillskin Forest: green water, fog, a sampling dock, a condemned-water sign, the asylum drain, and what it means.",
    question: "What is Green Lake in Stillskin Forest?",
    answer:
      "Green Lake lies north-east of Blackthorn Asylum. Its water is green, with fog banks, reeds, an abandoned sampling dock, a condemned-water sign and a drain from the asylum. Arriving shows its title card, \"The Water Remembers\".",
    sections: [
      {
        id: "the-lake",
        heading: "The lake",
        blocks: [
          { type: "p", text: "The atmosphere shifts as you arrive: green haze and a low local soundscape that fade out over four seconds when you leave. Four clue notes are hidden around the shore, and they go in your journal under Green Lake." },
        ],
      },
      {
        id: "what-it-means",
        heading: "What it means",
        spoiler: true,
        blocks: [
          { type: "p", text: "The lake is a wound connected to [the Hollow](@the-hollow-lore), not its source. The clues say it changed color after Hollis broke through the lower gallery, that Dr. Vance had the sample results burned, and that lake water was piped into the asylum cistern, after which patients grew calm, dreamed the same room beneath the hill, and began to speak with one voice. The black drain points back to the asylum." },
          { type: "callout", tone: "note", text: "In the current build Green Lake is a place and a set of clues. It is not yet part of a quest objective." },
        ],
      },
    ],
    related: ["blackthorn-asylum", "the-hollow-lore", "dr-h-vance"],
    sources: [SRC.report, SRC.world, SRC.notes30],
    aliases: ["lake", "green water", "sampling dock", "the water remembers"],
  },
  {
    ...base,
    slug: "the-hollow",
    lastVerified: "2026-10-31",
    title: "The Hollow (Location)",
    seoTitle: "The Hollow in Stillskin Forest: Weeping Gallery, Root Gate and the Heart",
    description:
      "The Hollow is the underground region of Stillskin Forest: the Weeping Gallery and its bridge, the Root Gate, and the Heart's cavern under the asylum.",
    answer:
      "The Hollow is the underground route beneath Blackthorn, reached through the crypt cave once the boulder moves. It runs through the Weeping Gallery (a chasm with a pressure-plate bridge), the Root Gate (two levers pulled together), and ends in the cavern of the Heart of Stillskin under the asylum's back lawn.",
    spoiler: true,
    sections: [
      {
        id: "route",
        heading: "The route",
        spoiler: true,
        blocks: [
          { type: "list", ordered: true, items: [
            "**The Weeping Gallery.** A long hall lit by green crystals, crossed by a chasm.",
            "**The Root Gate.** Two levers in alcoves about 40 studs apart, pulled within a few seconds of each other.",
            "**The Heart's cavern.** A huge cavern under the asylum's back lawn.",
          ] },
          { type: "p", text: "How to get through each is in [Descent into the Hollow](@descent-into-the-hollow) and [The Heart of Stillskin](@the-heart-of-stillskin)." },
        ],
      },
    ],
    related: ["crypt-cave", "descent-into-the-hollow", "the-heart-of-stillskin", "the-hollow-lore"],
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["hollow", "underground", "weeping gallery", "root gate", "cave system"],
  },
  {
    ...base,
    slug: "secrets-and-easter-eggs",
    lastVerified: "2026-10-31",
    title: "Secrets and Easter Eggs",
    seoTitle: "All Secrets in Stillskin Forest (9) and Easter Eggs",
    description:
      "All nine secrets in Stillskin Forest and where to find them, plus the easter eggs: the payphone, the vending machine, the mannequin and the dolls.",
    question: "How many secrets are in Stillskin Forest?",
    answer:
      "There are nine secrets, each announced with a SECRET FOUND banner: The Morgue Under St. Agnes, The Walk-in, Tommy's Attic, Paul's Hidden Study, Under the Park, Reyes' Last Stand, Danny's Hideout, The Lookout Camp, and Every Call Answered.",
    spoiler: true,
    sections: [
      {
        id: "the-nine",
        heading: "The nine secrets",
        spoiler: true,
        blocks: [
          { type: "table", caption: "Secrets and where they are", head: ["Secret", "Where"], rows: [
            ["The Morgue Under St. Agnes", "Stairs on the east side of [the hospital](@st-agnes-hospital)"],
            ["The Walk-in", "Through the back door of [Pine General Store](@pine-general-store)"],
            ["Danny's Hideout", "Store roof, by ladder"],
            ["Reyes' Last Stand", "Hospital roof, by ladder"],
            ["Tommy's Attic", "Elm 1, ladder through the hatch"],
            ["Paul's Hidden Study", "Birch 1, through the bookshelf"],
            ["Under the Park", "[The storm drain](@storm-drain)"],
            ["The Lookout Camp", "A survivors' camp with a tent in the woods east of town, toward [Blackpine Airfield](@blackpine-airfield)"],
            ["Every Call Answered", "Answer all five payphone calls in one run"],
          ] },
        ],
      },
      {
        id: "easter-eggs",
        heading: "Easter eggs",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "**The payphone** at Main and Elm rings at night when someone is nearby, with five different calls.",
            "**The vending machine** in the hospital lobby can be shaken. The noise draws nearby infected, and it may drop one snack per run.",
            "**The mannequin** in the general store moves when nobody is looking.",
            "**The attic dolls** turn to face you when you look away.",
            "**The rocking chair** rocks when you come near.",
          ] },
        ],
      },
    ],
    related: ["stillwater", "houses-of-stillwater", "st-agnes-hospital", "pine-general-store"],
    sources: [SRC.playtest, SRC.world, SRC.notes30],
    aliases: ["secrets", "easter eggs", "hidden", "payphone", "mannequin", "dolls"],
  },
];
