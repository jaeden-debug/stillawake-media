import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "story", verification: "verified_live", lastVerified: VERIFIED, spoiler: true } as const;

const unconfirmed = (text: string) =>
  ({ type: "callout", tone: "note", text: `**Not confirmed by the game:** ${text}` }) as const;

export const story: WikiEntry[] = [
  {
    ...base,
    spoiler: false,
    slug: "story-overview",
    title: "Stillskin Forest Story Explained",
    seoTitle: "Stillskin Forest Story and Lore Explained",
    description:
      "The story of Stillskin Forest: what happened to Stillwater, Blackthorn Asylum, Dr. Vance, the miner E. Hollis, Green Lake, and the Hollow beneath the hill.",
    question: "What is the story of Stillskin Forest?",
    answer:
      "Stillwater's people were taken by something the asylum's records describe as a heart beneath the hill: the Hollow. A miner, E. Hollis, broke into a lower gallery and woke or exposed it. Dr. H. Vance of Blackthorn Asylum treated the afflicted, realised it was not a disease, and found an old rite that can put the Hollow to sleep using four relics. The story is told through notes, tapes, graves and places rather than cutscenes.",
    sections: [
      {
        id: "spoiler-free",
        heading: "Without spoilers",
        blocks: [
          { type: "p", text: "Stillwater is empty. Notes in the houses, a radio broadcast in the diner and graffiti on the walls all point the same way: up the hill, to Blackthorn Asylum and its graveyard. Everything below is told by what survivors find." },
        ],
      },
      {
        id: "the-story",
        heading: "The story so far",
        spoiler: true,
        blocks: [
          { type: "list", ordered: true, items: [
            "**The breach.** E. Hollis, a miner, broke into a lower gallery beneath the hill. He was admitted to Blackthorn with \"glow sickness\". See [E. Hollis](@e-hollis).",
            "**The lake changes.** Green Lake turned after the breach. Its water was piped into the asylum cistern. See [Green Lake](@green-lake).",
            "**The patients.** Vance admitted the affected: Hollis, a sleepwalking child, a patient who heard singing. They grew calm, shared the same dreams, and eventually spoke with one voice. See [Dr. H. Vance](@dr-h-vance).",
            "**The rite.** Vance found an old rite that can put the presence to sleep, using four relics laid in the circle where the sick were fed. See [The four relics](@the-four-relics).",
            "**The Hollow.** What lives under the hill can reach dreams, voices, water and the infected. Sleep is temporary unless its source is confronted. See [The Hollow](@the-hollow-lore).",
          ] },
        ],
      },
      {
        id: "how-it-ends",
        heading: "How it can end",
        spoiler: true,
        blocks: [
          { type: "p", text: "Two endings exist in the current build. Completing [the Rite of Stillness](@the-rite-of-stillness) puts the Hollow to sleep (\"THE HOLLOW SLEEPS... for now\"). Going down and destroying [the Heart of Stillskin](@the-heart-of-stillskin) ends it: \"THE HEART IS DEAD\"." },
        ],
      },
    ],
    related: ["the-hollow-lore", "dr-h-vance", "e-hollis", "the-four-relics", "notes-and-tapes"],
    sources: [SRC.report, SRC.playtest, SRC.world],
    aliases: ["lore", "story", "plot", "what happened"],
  },
  {
    ...base,
    slug: "the-hollow-lore",
    title: "The Hollow (Lore)",
    seoTitle: "What Is the Hollow in Stillskin Forest?",
    description:
      "The Hollow in Stillskin Forest lore: the living presence under Blackthorn Hill, how it reaches the town through water and dreams, and how it can be stopped.",
    question: "What is the Hollow in Stillskin Forest?",
    answer:
      "The Hollow is the living presence beneath Blackthorn Hill. Blackthorn's records describe it as something like a heart, with the town as its blood. It influences dreams, voices, water and the infected. The old rite can put it to sleep, but earlier accounts suggest that sleep doesn't last unless its source, the Heart, is destroyed.",
    sections: [
      {
        id: "what-the-records-say",
        heading: "What the records say",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "It is not an ordinary disease. Dr. Vance came to that conclusion himself.",
            "It reaches people through water: Green Lake's water ran into the asylum's cistern.",
            "Those it touches share dreams and, in the end, speak with one voice.",
            "The rite puts it to sleep; the Heart beneath the asylum is its source.",
          ] },
          unconfirmed("whether the Hollow was always there, or was created by the mining. The records describe Hollis as having woken or exposed it."),
        ],
      },
    ],
    related: ["story-overview", "the-hollow", "the-heart-of-stillskin"],
    sources: [SRC.report, SRC.playtest],
    aliases: ["hollow", "heart beneath the hill", "the infection", "shared dreams"],
  },
  {
    ...base,
    slug: "e-hollis",
    title: "E. Hollis",
    seoTitle: "E. Hollis in Stillskin Forest: The Miner Who Woke the Hollow",
    description:
      "E. Hollis, the miner in Stillskin Forest lore: glow sickness, the lower gallery, his lantern in the crypt cave, and his last words in the Hollow.",
    question: "Who is Hollis in Stillskin Forest?",
    answer:
      "E. Hollis was a miner admitted to Blackthorn Asylum with \"glow sickness\". He appears to have broken into a lower gallery under the hill and woken or exposed the Hollow. His lantern still burns green in the crypt cave, and his last account, found in the Weeping Gallery, describes a bridge mechanism, a pressure plate, roots that need two hands, and companions lost below.",
    sections: [
      {
        id: "his-trail",
        heading: "His trail",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "Admitted to Blackthorn by [Dr. Vance](@dr-h-vance).",
            "[The Miner's Lantern](@miners-lantern) is one of the four relics.",
            "\"Hollis' Last Words\" in the Weeping Gallery is effectively a guide to [Descent into the Hollow](@descent-into-the-hollow), including how to cross alone.",
          ] },
          unconfirmed("whether Marion Hollis, whose grave holds the Angel's Tear, or the 'Ranger Hollis' of a watch log, is related to E. Hollis. The game names them but doesn't say."),
        ],
      },
    ],
    related: ["miners-lantern", "descent-into-the-hollow", "story-overview"],
    sources: [SRC.report, SRC.playtest, SRC.world],
    aliases: ["hollis", "miner", "glow sickness"],
  },
  {
    ...base,
    slug: "dr-h-vance",
    title: "Dr. H. Vance",
    seoTitle: "Dr. Vance in Stillskin Forest: Blackthorn's Doctor",
    description:
      "Dr. H. Vance in Stillskin Forest lore: the Blackthorn doctor who treated the afflicted, hid the Green Lake samples, found the rite, and kept the last relic.",
    question: "Who is Dr. Vance in Stillskin Forest?",
    answer:
      "Dr. H. Vance was the doctor at Blackthorn Asylum. He admitted the afflicted, including Hollis, a sleepwalking child and a patient who heard singing, and came to realise the condition was not a disease. His writings connect the old rite, the green water, the four relics and the thing under the hill. He concealed the lake's sample results and kept the doctor's ring, the last relic.",
    sections: [
      {
        id: "his-writing",
        heading: "His writing",
        spoiler: true,
        blocks: [
          { type: "p", text: "Several notes and a tape carry his voice: his journal and last entry, his notes on the Heart, and a water-stained confession. Most point at the relics and the rite. His office upstairs in [Blackthorn Asylum](@blackthorn-asylum) holds [his ring](@dr-vances-ring)." },
          { type: "p", text: "The records portray a man trapped by guilt and obsession: he understood what was happening and kept the wound open anyway." },
        ],
      },
    ],
    related: ["dr-vances-ring", "blackthorn-asylum", "green-lake", "story-overview"],
    sources: [SRC.report, SRC.playtest, SRC.world],
    aliases: ["vance", "doctor", "dr vance"],
  },
  {
    ...base,
    slug: "the-four-relics",
    lastVerified: "2026-10-30",
    title: "The Four Relics",
    seoTitle: "All 4 Relic Locations in Stillskin Forest",
    description:
      "Where to find all four relics in Stillskin Forest: the Sister's Rosary, the Miner's Lantern, the Angel's Tear and Dr. Vance's Ring, and what they're for.",
    question: "Where are the four relics in Stillskin Forest?",
    answer:
      "The Sister's Rosary is in the morgue under St. Agnes Hospital. The Miner's Lantern is in the green-lit chamber of the crypt cave. The Angel's Tear is in Marion Hollis' grave, the one the angel statue points to. Dr. Vance's Ring is in his office upstairs in Blackthorn Asylum. Bring all four to the cafeteria circle for the Rite of Stillness.",
    sections: [
      {
        id: "locations",
        heading: "Where they are",
        spoiler: true,
        blocks: [
          { type: "table", caption: "Relic locations", head: ["Relic", "Location", "How"], rows: [
            ["[The Sister's Rosary](@sisters-rosary)", "[The morgue](@morgue)", "In the morgue under St. Agnes"],
            ["[The Miner's Lantern](@miners-lantern)", "[The crypt cave](@crypt-cave)", "Green-lit chamber at the bottom"],
            ["[The Angel's Tear](@angels-tear)", "[The graveyard](@graveyard)", "\"Search the grave\" at Marion Hollis' grave"],
            ["[Dr. Vance's Ring](@dr-vances-ring)", "[Blackthorn Asylum](@blackthorn-asylum)", "Vance's office, upstairs"],
          ] },
          { type: "p", text: "Each survivor collects their own relics: taking one removes it only for you (once you walk away), so your teammates can still find theirs. At the cafeteria circle, \"Place Relics\" lays every relic you carry, and the circle keeps what the whole squad has laid: one survivor can bring all four, or you can split them up." },
        ],
      },
    ],
    related: ["the-rite-of-stillness", "sisters-rosary", "miners-lantern", "angels-tear", "dr-vances-ring"],
    sources: [SRC.playtest, SRC.report],
    aliases: ["relics", "relic locations", "four relics", "4 relics"],
  },
  {
    ...base,
    slug: "sisters-rosary",
    title: "The Sister's Rosary",
    seoTitle: "The Sister's Rosary in Stillskin Forest: Location",
    description: "Where to find the Sister's Rosary in Stillskin Forest: one of the four ritual relics, hidden in the morgue under St. Agnes Hospital.",
    answer: "The Sister's Rosary is one of the four relics for the Rite of Stillness. It is in the morgue beneath St. Agnes Hospital, reached through the cellar doors behind the building.",
    sections: [
      {
        id: "getting-it",
        heading: "Getting it",
        spoiler: true,
        blocks: [
          { type: "p", text: "Go behind [St. Agnes Hospital](@st-agnes-hospital), down the cellar doors into [the morgue](@morgue). Dread builds while you search; don't stay longer than you need to." },
        ],
      },
    ],
    related: ["the-four-relics", "morgue"],
    sources: [SRC.playtest],
    aliases: ["rosary", "sister rosary"],
  },
  {
    ...base,
    slug: "miners-lantern",
    title: "The Miner's Lantern",
    seoTitle: "The Miner's Lantern in Stillskin Forest: Location",
    description: "Where to find the Miner's Lantern in Stillskin Forest: the relic that still burns green in the crypt cave, and the passage it opens.",
    answer: "The Miner's Lantern belonged to E. Hollis and still burns green in the chamber at the bottom of the crypt cave behind the chapel. Taking it is a relic pickup and also moves the boulder that blocks the way into the Hollow.",
    sections: [
      {
        id: "getting-it",
        heading: "Getting it",
        spoiler: true,
        blocks: [
          { type: "p", text: "Take the wooden stair behind [the chapel](@chapel) down into [the crypt cave](@crypt-cave). Picking up the lantern makes the boulder grind aside: \"THE LIGHT OPENS THE WAY\"." },
        ],
      },
    ],
    related: ["the-four-relics", "crypt-cave", "e-hollis", "descent-into-the-hollow"],
    sources: [SRC.playtest],
    aliases: ["miner lantern", "green lantern", "hollis lantern"],
  },
  {
    ...base,
    slug: "angels-tear",
    title: "The Angel's Tear",
    seoTitle: "The Angel's Tear in Stillskin Forest: Location",
    description: "Where to find the Angel's Tear in Stillskin Forest: follow the angel statue in the Blackthorn graveyard to Marion Hollis' grave and search it.",
    answer: "The angel statue in the Blackthorn graveyard points at Marion Hollis' grave. Use \"Search the grave\" there to find the Angel's Tear.",
    sections: [
      {
        id: "getting-it",
        heading: "Getting it",
        spoiler: true,
        blocks: [
          { type: "p", text: "In [the graveyard](@graveyard), find the angel and follow where it points. The inscription on the angel is one of the game's notes." },
        ],
      },
    ],
    related: ["the-four-relics", "graveyard"],
    sources: [SRC.playtest, SRC.world],
    aliases: ["angel tear", "tear"],
  },
  {
    ...base,
    slug: "dr-vances-ring",
    title: "Dr. Vance's Ring",
    seoTitle: "Dr. Vance's Ring in Stillskin Forest: Location",
    description: "Where to find Dr. Vance's Ring in Stillskin Forest: the last relic, kept in his office upstairs in Blackthorn Asylum.",
    answer: "Dr. Vance's Ring, the doctor's ring and the last of the four relics, is in Vance's office on the upper floor of Blackthorn Asylum.",
    sections: [
      {
        id: "getting-it",
        heading: "Getting it",
        spoiler: true,
        blocks: [
          { type: "p", text: "Unlock [the asylum](@blackthorn-admission-ledger), deal with or slip past the residents, and take the stairs from the admissions hall. The office is on the upper floor, with the records room and the cell block." },
        ],
      },
    ],
    related: ["the-four-relics", "dr-h-vance", "blackthorn-asylum"],
    sources: [SRC.playtest],
    aliases: ["vance ring", "doctor's ring", "ring"],
  },
  {
    ...base,
    slug: "notes-and-tapes",
    lastVerified: "2026-10-30",
    title: "Notes and Tapes",
    seoTitle: "All Notes and Tapes in Stillskin Forest",
    description:
      "Every readable note and tape in Stillskin Forest by title: how reading works, how notes are tracked in your journal, and where the tapes are.",
    question: "How many notes are in Stillskin Forest?",
    answer:
      "The current build has 31 readable notes and 5 tapes. Walk up to a note and use its Read prompt; each new note is added to your journal (J) and counts toward the notes you've found that run. Tapes have a \"Play tape\" prompt.",
    sections: [
      {
        id: "reading",
        heading: "Reading and the journal",
        blocks: [
          { type: "p", text: "Notes open in a paper reader; close it with Esc. A toast confirms \"Added to your journal\". The journal's Notes tab keeps everything you've read." },
          { type: "p", text: "Letters and tapes are personal: once you've read a letter (or stopped a tape) a quiet chime marks the find, and when you walk away it disappears for you. Your teammates still see it until they've found it themselves, and you can reread it any time in your journal." },
        ],
      },
      {
        id: "all-notes",
        heading: "All 31 notes",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "Autopsy Log", "Blackthorn Admission Ledger", "Dr. Vance's Journal", "Dr. Vance's Last Entry", "Dr. Vance's Notes: The Heart", "Drain Journal", "EVACUATION ORDER — UNSENT", "FREQUENCY 87.9", "Freezer Inventory", "GREEN LAKE FIELD LOG — 1958", "Groundskeeper's Warning", "Hollis' Last Words", "Inscription on the Angel", "Last Stand", "Letter on the Fridge", "Lily's Diary", "MAINTENANCE ORDER 6-B", "Missing Poster", "Nailed to the Barricade", "Note on the Register", "Order Ticket #44", "PATIENT 16 — TRANSCRIPTION", "Paul's Map", "RANGER HOLLIS — WATCH LOG", "Rooftop Kid", "Staff Memo", "Survivor's Journal", "The Rite of Stillness", "Tommy's Drawing", "Transfer Orders", "VANCE'S WATER-STAINED CONFESSION",
          ] },
        ],
      },
      {
        id: "tapes",
        heading: "The five tapes",
        spoiler: true,
        blocks: [
          { type: "table", caption: "Tapes", head: ["Tape", "Where"], rows: [
            ["Dr. Vance", "Elm 2"], ["Sister Agnes", "Elm 3"], ["The Groundskeeper", "Birch 2"], ["The Night Nurse", "Blackthorn Asylum"], ["The Records Room", "Blackthorn Asylum"],
          ] },
        ],
      },
    ],
    related: ["story-overview", "houses-of-stillwater", "blackthorn-asylum"],
    sources: [SRC.world, SRC.playtest],
    aliases: ["notes", "tapes", "documents", "journal", "collectibles"],
    gaps: ["The location of every individual note is not yet documented."],
  },
];
