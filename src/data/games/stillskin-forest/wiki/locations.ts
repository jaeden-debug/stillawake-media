import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "locations", verification: "verified_live", lastVerified: VERIFIED } as const;

export const locations: WikiEntry[] = [
  {
    ...base,
    slug: "campgrounds",
    title: "The Campgrounds",
    seoTitle: "The Campgrounds in Stillskin Forest: Cabins, Lake and Watchtowers",
    description:
      "The Campgrounds are where every Stillskin Forest run starts: cabins, an abandoned house, a lake and dock, two watchtowers, and a TV with something on it.",
    question: "Where do you start in Stillskin Forest?",
    answer:
      "Every run starts at the Campgrounds, the northern end of the map: a ring of camping cabins, an abandoned house, two sheds, two watchtowers, and a lake with a dock. It is the original survival area and the place you return to.",
    sections: [
      {
        id: "what-is-here",
        heading: "What's here",
        blocks: [
          { type: "list", items: [
            "Camping cabins and the Abandoned House, with indoor loot spots.",
            "Two watchtowers with climbable ladders. One of them has a jump scare that also brings two infected.",
            "A lake and dock, lit at night.",
            "A tent you can [hide](@hiding) in.",
            "A television. Walk up to it and the static cuts to green camcorder footage, with subtitles.",
          ] },
        ],
      },
      {
        id: "routes",
        heading: "Routes out",
        blocks: [
          { type: "p", text: "South through [the Forest Trail](@forest-trail) to [Stillwater](@stillwater). Several hidden spawn points around camp spread a squad out at the start of a run." },
        ],
      },
    ],
    related: ["forest-trail", "stillwater", "how-to-play"],
    sources: [SRC.playtest, SRC.world],
    aliases: ["camp", "spawn", "cabins", "lake", "dock", "watchtower"],
  },
  {
    ...base,
    slug: "forest-trail",
    title: "The Forest Trail",
    seoTitle: "The Forest Trail in Stillskin Forest",
    description:
      "The Forest Trail links the Campgrounds to Stillwater in Stillskin Forest: lanterns, a signpost, trail loot, and something in the trees.",
    answer:
      "The Forest Trail is the path from the Campgrounds south through new forest to Stillwater. It is lined with lanterns and has a signpost, a fallen log, loot spots along the way, and a scare where something runs through the trees.",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "The trail is the main road between camp and town. Its loot spots refill at dawn like everywhere else, and it is one of the places headlamp parts can turn up. Infected spawn across the trail as well as the forest and town, never closer than 70 studs to a survivor and never in your line of sight." },
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
            "[Rosie's Diner](@rosies-diner) and the alley behind it",
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
          { type: "p", text: "Burning wrecks, a crashed car whose alarm draws infected, fire barrels and police tape. 22 streetlights come on at dusk; some flicker and some are dead. Graffiti warns THE HOLLOW IS UNDER THE GRAVES and DON'T GO UP THE HILL, and a sign points to BLACKTHORN ASYLUM 2 MI." },
          { type: "p", text: "Stillwater has 29 working [doors](@doors-and-building)." },
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
    sources: [SRC.playtest, SRC.world],
    aliases: ["town", "stillwater town", "main street", "police car", "wrecked cars"],
  },
  {
    ...base,
    slug: "st-agnes-hospital",
    title: "St. Agnes Hospital",
    seoTitle: "St. Agnes Hospital in Stillskin Forest: Ambush, Loot and Roof",
    description:
      "St. Agnes Hospital in Stillskin Forest: a two-floor hospital with an ambush, medical loot, lockers to hide in, a ladder to the roof, and the morgue below.",
    question: "What happens when you enter St. Agnes Hospital?",
    answer:
      "Walking into St. Agnes Hospital triggers an ambush: three infected burst out of the patient rooms. The hospital has two floors (lobby, patient rooms, an upstairs ward, operating room and office), medical-heavy loot, two lockers to hide in, a ladder to the roof, and cellar doors behind it leading down to the morgue.",
    sections: [
      {
        id: "layout",
        heading: "Layout",
        blocks: [
          { type: "list", items: [
            "**Ground floor:** lobby and reception, four patient rooms, stairs, a vending machine.",
            "**Upstairs:** a ward, an operating room and an office.",
            "**Outside:** the ER canopy and an abandoned ambulance.",
            "**Roof:** reached by ladder; a sandbag nest left by someone named Reyes.",
            "**Below:** the [morgue](@morgue), through cellar doors behind the building.",
          ] },
        ],
      },
      {
        id: "the-ambush",
        heading: "The ambush",
        blocks: [
          { type: "p", text: "Three infected come out of the rooms when you enter. Hiding in one of the two lockers works: in testing, all three lost the survivor, searched, and went back to roaming. The [Dread Encounter](@the-dread-encounter) applies if they see you get in." },
        ],
      },
      {
        id: "the-roof",
        heading: "The roof",
        blocks: [
          { type: "p", text: "Infected can't follow you up the ladder unless they saw you climb it. The roof is also where the run ends: see [the finale](@death-ghosts-and-the-finale)." },
        ],
      },
      {
        id: "the-vending-machine",
        heading: "The vending machine",
        blocks: [
          { type: "p", text: "You can shake the lobby vending machine. It may drop one snack per run, but it is loud enough to draw infected from 90 studs away." },
        ],
      },
    ],
    related: ["morgue", "hiding", "first-aid-kit", "climbing-and-ladders"],
    sources: [SRC.playtest, SRC.world],
    aliases: ["hospital", "st agnes", "saint agnes"],
  },
  {
    ...base,
    slug: "morgue",
    title: "The Morgue",
    seoTitle: "The Morgue in Stillskin Forest: How to Find It and What's Inside",
    description:
      "The morgue under St. Agnes Hospital in Stillskin Forest: how to get in through the cellar doors, the dread that builds inside, and what's hidden there.",
    question: "How do you get into the morgue in Stillskin Forest?",
    answer:
      "Go behind St. Agnes Hospital and take the cellar doors down. The morgue has a drawer wall, autopsy tables and a stash. It is one of the game's dread zones, so the longer you stay the worse it gets, and one drawer is a hiding spot.",
    sections: [
      {
        id: "inside",
        heading: "Inside",
        blocks: [
          { type: "p", text: "Finding it counts as a secret: \"The Morgue Under St. Agnes\". It has its own location audio and plays the underground music track. One of the drawers can be [hidden](@hiding) in." },
          { type: "callout", tone: "warning", text: "Dread builds here. At full dread, a Walker can step out behind you. See [the Dread Encounter](@the-dread-encounter)." },
        ],
      },
      {
        id: "relic",
        heading: "The relic here",
        spoiler: true,
        blocks: [
          { type: "p", text: "[The Sister's Rosary](@sisters-rosary), one of the four relics needed for [the Rite of Stillness](@the-rite-of-stillness), is in the morgue." },
        ],
      },
    ],
    related: ["st-agnes-hospital", "the-dread-encounter", "sisters-rosary"],
    sources: [SRC.playtest, SRC.world],
    aliases: ["morgue", "cellar", "autopsy"],
  },
  {
    ...base,
    slug: "pine-general-store",
    title: "Pine General Store",
    seoTitle: "Pine General Store in Stillskin Forest: Alarm, Freezer and Roof",
    description:
      "Pine General Store in Stillskin Forest: food-heavy loot, a burglar alarm that draws infected, a walk-in freezer out back, and a hideout on the roof.",
    question: "Why does an alarm go off in the general store?",
    answer:
      "Pine General Store has a burglar alarm that goes off when you walk in, and it draws infected. The store has food-heavy loot, a walk-in freezer through the back door, and a ladder to a hideout on the roof.",
    sections: [
      {
        id: "the-store",
        heading: "The store",
        blocks: [
          { type: "p", text: "Expect company after the alarm. The loot leans toward [food](@food), and Hammers turn up here more often than anywhere else. A mannequin in the store changes place when nobody is looking." },
        ],
      },
      {
        id: "the-freezer",
        heading: "The walk-in freezer",
        blocks: [
          { type: "p", text: "Through the store's back door: meat hooks and a chest freezer you can [hide](@hiding) in. It is a dread zone, and finding it counts as the secret \"The Walk-in\"." },
        ],
      },
      {
        id: "the-roof",
        heading: "The roof",
        blocks: [
          { type: "p", text: "A ladder leads to Danny's hideout, another secret." },
        ],
      },
    ],
    related: ["stillwater", "food", "secrets-and-easter-eggs"],
    sources: [SRC.playtest],
    aliases: ["general store", "store", "shop", "freezer", "walk-in freezer"],
  },
  {
    ...base,
    slug: "rosies-diner",
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
    sources: [SRC.playtest],
    aliases: ["diner", "rosies", "alley"],
  },
  {
    ...base,
    slug: "houses-of-stillwater",
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
          { type: "p", text: "Five houses with porches and fences. Two are boarded up and one is burned out. In one, a TV switches on by itself." },
        ],
      },
      {
        id: "tommys-attic",
        heading: "Tommy's attic (Elm 1)",
        blocks: [
          { type: "p", text: "A ladder leads up through a hatch to a full attic room: a circle of dolls, a rocking chair, a music box, and a trunk you can hide in. The dolls turn to face you when you look away; the chair rocks when you come near. The attic is a dread zone and a secret." },
        ],
      },
      {
        id: "pauls-study",
        heading: "Paul's hidden study (Birch 1)",
        blocks: [
          { type: "p", text: "Walk through the bookshelf. The study is a dread zone and a secret." },
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
    sources: [SRC.playtest],
    aliases: ["houses", "hidden study", "attic", "tommy's attic", "paul's study", "elm", "birch"],
  },
  {
    ...base,
    slug: "memorial-park",
    title: "Memorial Park",
    seoTitle: "Memorial Park in Stillskin Forest: The Playground and the Ledger",
    description:
      "Memorial Park in Stillskin Forest: the playground, the broken fountain, the polluted pond, and the readable note that unlocks Blackthorn Asylum.",
    answer:
      "Memorial Park is Stillwater's park: a playground with a music-box scare, picnic tables, a broken fountain spilling sludge, and a polluted pond with bubbles and flies. The Blackthorn Admission Ledger, the note that unlocks the asylum, is here, and the storm drain runs underneath.",
    sections: [
      {
        id: "the-ledger",
        heading: "The ledger",
        spoiler: true,
        blocks: [
          { type: "p", text: "The riddle on the ROAD CLOSED barricade points here. The Blackthorn Admission Ledger is a readable note near the picnic tables, and reading it unlocks the asylum. See [the walkthrough](@blackthorn-admission-ledger)." },
        ],
      },
      {
        id: "underneath",
        heading: "Underneath",
        blocks: [
          { type: "p", text: "[The storm drain](@storm-drain) runs from the creek to a manhole in the park." },
        ],
      },
    ],
    related: ["stillwater", "storm-drain", "blackthorn-admission-ledger"],
    sources: [SRC.playtest],
    aliases: ["park", "fountain", "playground", "picnic tables"],
  },
  {
    ...base,
    slug: "storm-drain",
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
          { type: "p", text: "The drain is a way across town out of sight. Dread builds while you are inside; see [the Dread Encounter](@the-dread-encounter)." },
        ],
      },
    ],
    related: ["memorial-park", "secrets-and-easter-eggs"],
    sources: [SRC.playtest],
    aliases: ["drain", "tunnel", "sewer", "culvert", "under the park"],
  },
  {
    ...base,
    slug: "blackthorn-asylum",
    title: "Blackthorn Asylum",
    seoTitle: "Blackthorn Asylum in Stillskin Forest: How to Get In and What's Inside",
    description:
      "Blackthorn Asylum in Stillskin Forest: how to unlock it, its two floors, the 19 residents that wake, and where the relics and Signal Remote are.",
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
            "The [Signal Remote](@signal-remote), at the nurse station.",
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
    title: "The Blackthorn Graveyard",
    seoTitle: "The Graveyard in Stillskin Forest: The Angel and Marion Hollis' Grave",
    description:
      "The graveyard on Blackthorn Hill in Stillskin Forest: the angel statue, the grave it points to, and the Angel's Tear relic.",
    answer:
      "The graveyard sits beside Blackthorn Asylum, with the chapel and the crypt cave behind it. An angel statue there points at one grave in particular.",
    sections: [
      {
        id: "the-angel",
        heading: "The angel",
        spoiler: true,
        blocks: [
          { type: "p", text: "The angel points at Marion Hollis' grave. Use \"Search the grave\" to find [the Angel's Tear](@angels-tear). An inscription on the angel is one of the game's notes." },
        ],
      },
    ],
    related: ["chapel", "crypt-cave", "angels-tear", "blackthorn-asylum"],
    sources: [SRC.playtest, SRC.world],
    aliases: ["graves", "cemetery", "angel statue"],
  },
  {
    ...base,
    slug: "chapel",
    title: "The Chapel",
    seoTitle: "The Chapel in Stillskin Forest: The Rite of Stillness",
    description:
      "The chapel by the Blackthorn graveyard in Stillskin Forest holds the Rite of Stillness and a stair down to the crypt cave.",
    answer:
      "The chapel stands by the Blackthorn graveyard. It holds the note \"The Rite of Stillness\", which explains the ritual, and a wooden stair behind it leads down to the crypt cave.",
    sections: [
      {
        id: "the-rite",
        heading: "The Rite of Stillness",
        spoiler: true,
        blocks: [
          { type: "p", text: "The chapel's instructions say the four relics must be brought to the circle where the sick were fed. See [the Rite of Stillness walkthrough](@the-rite-of-stillness)." },
        ],
      },
    ],
    related: ["graveyard", "crypt-cave", "the-rite-of-stillness"],
    sources: [SRC.playtest, SRC.report],
    aliases: ["church"],
  },
  {
    ...base,
    slug: "crypt-cave",
    title: "The Crypt Cave",
    seoTitle: "The Crypt Cave in Stillskin Forest: The Miner's Lantern",
    description:
      "The crypt cave behind the Blackthorn chapel in Stillskin Forest: a green-lit chamber, the Miner's Lantern, and the boulder that hides the way down.",
    answer:
      "Behind the chapel, an easy-to-enter cave runs down to a green-lit chamber. A boulder blocks the way deeper until the relic in the chamber is taken.",
    sections: [
      {
        id: "the-chamber",
        heading: "The chamber",
        spoiler: true,
        blocks: [
          { type: "p", text: "[The Miner's Lantern](@miners-lantern) still burns green here. Taking it makes the boulder grind aside (\"THE LIGHT OPENS THE WAY\"), opening the route into [the Hollow](@the-hollow)." },
        ],
      },
    ],
    related: ["chapel", "the-hollow", "miners-lantern", "descent-into-the-hollow"],
    sources: [SRC.playtest],
    spoiler: true,
    aliases: ["crypt", "cave"],
  },
  {
    ...base,
    slug: "green-lake",
    title: "Green Lake",
    seoTitle: "Green Lake in Stillskin Forest: The Water Remembers",
    description:
      "Green Lake below Blackthorn Asylum in Stillskin Forest: green water, fog, a sampling dock, a condemned-water sign, the asylum drain, and what it means.",
    question: "What is Green Lake in Stillskin Forest?",
    answer:
      "Green Lake lies east and north-east of Blackthorn Asylum. Its water is green and reactive, with fog banks, reeds, bubbling vents, an abandoned sampling dock, a condemned-water sign and a corroded drain from the asylum. Its subtitle is \"The Water Remembers\".",
    sections: [
      {
        id: "the-lake",
        heading: "The lake",
        blocks: [
          { type: "p", text: "The atmosphere shifts as you arrive: a low local soundscape that fades out over four seconds when you leave. Clues are hidden around the shore." },
        ],
      },
      {
        id: "what-it-means",
        heading: "What it means",
        spoiler: true,
        blocks: [
          { type: "p", text: "The lake is a wound connected to [the Hollow](@the-hollow-lore), not its source. The clues suggest it changed after Hollis breached the lower gallery, that Dr. Vance hid the sample results, and that lake water was piped into the asylum cistern, after which patients grew calm, shared the same dreams, and began to speak with one voice. The corroded drain points back to the asylum." },
          { type: "callout", tone: "note", text: "In the current build Green Lake is a place and a set of clues. It is not yet part of a quest objective." },
        ],
      },
    ],
    related: ["blackthorn-asylum", "the-hollow-lore", "dr-h-vance"],
    sources: [SRC.report, SRC.world],
    aliases: ["lake", "green water", "sampling dock", "the water remembers"],
  },
  {
    ...base,
    slug: "the-hollow",
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
            "**The Root Gate.** Two levers in alcoves about 40 studs apart.",
            "**The Heart's cavern.** A huge cavern under the asylum's back lawn.",
          ] },
          { type: "p", text: "How to get through each is in [Descent into the Hollow](@descent-into-the-hollow) and [The Heart of Stillskin](@the-heart-of-stillskin)." },
        ],
      },
    ],
    related: ["crypt-cave", "descent-into-the-hollow", "the-heart-of-stillskin", "the-hollow-lore"],
    sources: [SRC.playtest],
    aliases: ["hollow", "underground", "weeping gallery", "root gate", "cave system"],
  },
  {
    ...base,
    slug: "secrets-and-easter-eggs",
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
            ["The Morgue Under St. Agnes", "Cellar doors behind [the hospital](@st-agnes-hospital)"],
            ["The Walk-in", "Through the back door of [Pine General Store](@pine-general-store)"],
            ["Danny's Hideout", "Store roof, by ladder"],
            ["Reyes' Last Stand", "Hospital roof, by ladder"],
            ["Tommy's Attic", "Elm 1, ladder through the hatch"],
            ["Paul's Hidden Study", "Birch 1, through the bookshelf"],
            ["Under the Park", "[The storm drain](@storm-drain)"],
            ["The Lookout Camp", "A ledge in the east hills"],
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
            "**The payphone** at Main and Elm rings at night with five different calls.",
            "**The vending machine** in the hospital lobby can be shaken. Loud, and it may drop one snack per run.",
            "**The mannequin** in the general store moves when nobody is looking.",
            "**The attic dolls** turn to face you when you look away.",
            "**The rocking chair** rocks when you come near.",
          ] },
        ],
      },
    ],
    related: ["stillwater", "houses-of-stillwater", "st-agnes-hospital", "pine-general-store"],
    sources: [SRC.playtest, SRC.world],
    aliases: ["secrets", "easter eggs", "hidden", "payphone", "mannequin", "dolls"],
  },
];
