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
    lastVerified: "2026-10-31",
    title: "Stillskin Forest Story Explained",
    seoTitle: "Stillskin Forest Story and Lore Explained",
    description:
      "The story of Stillskin Forest: what happened to Stillwater, Blackthorn Asylum, Dr. Vance, the miner E. Hollis, Green Lake, and the Hollow under the hill.",
    question: "What is the story of Stillskin Forest?",
    answer:
      "Something under Blackthorn Hill, the Hollow, has been calling Stillwater's people up the road. Dr. Vance's notes call it a heart, with the town as its blood. A miner, E. Hollis, went down through the crypt under the chapel and woke it. Vance took in the afflicted at Blackthorn Asylum and came to see it was never a sickness. An old rite, which Sister Agnes knew, puts it back to sleep with four relics. The story is told through notes, tapes, graves and places.",
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
            "**The breach.** E. Hollis, a miner, went down through the old crypt under the chapel with his lantern burning green, and woke something under the hill. He was admitted to Blackthorn with \"glow sickness\". See [E. Hollis](@e-hollis).",
            "**The lake changes.** Green Lake changed after the breach, and its water was secretly piped up to the asylum, where the sick were fed \"the green water\". See [Green Lake](@green-lake).",
            "**The patients.** Glow sickness meant bright eyes, lost memories and sleepwalking toward the hills. Vance had the sick moved from St. Agnes to Blackthorn and signed them in himself: Hollis, a sleepwalking child, a patient who \"hears singing\". See [Dr. H. Vance](@dr-h-vance).",
            "**The rite.** Four relics kept the Hollow asleep before the mine woke it. Laid in the circle on the cafeteria floor, where the sick were fed, they put it back to sleep. See [The four relics](@the-four-relics).",
            "**The Hollow.** Vance's last notes say the rite only puts it to sleep, and it always wakes again. Three great veins feed the Heart under the hill; cut all three and it cannot live. See [The Hollow](@the-hollow-lore).",
          ] },
        ],
      },
      {
        id: "how-it-ends",
        heading: "How it can end",
        spoiler: true,
        blocks: [
          { type: "p", text: "There are two ways to win. Completing [the Rite of Stillness](@the-rite-of-stillness) puts the Hollow to sleep: \"THE HOLLOW SLEEPS\", \"for now\". Going down and destroying [the Heart of Stillskin](@the-heart-of-stillskin) ends it (\"Stillskin will never wake again\"); then the Hollow caves in, and getting out wins the run: \"OUT ALIVE\". Either way the win is paid at once and the run keeps going." },
        ],
      },
    ],
    related: ["the-hollow-lore", "dr-h-vance", "e-hollis", "the-four-relics", "notes-and-tapes"],
    sources: [SRC.world, SRC.notes30],
    aliases: ["lore", "story", "plot", "what happened"],
  },
  {
    ...base,
    slug: "the-hollow-lore",
    lastVerified: "2026-10-31",
    title: "The Hollow (Lore)",
    seoTitle: "What Is the Hollow in Stillskin Forest?",
    description:
      "The Hollow in Stillskin Forest lore: the living thing under Blackthorn Hill, how it reaches the town, and how the rite and the Heart can stop it.",
    question: "What is the Hollow in Stillskin Forest?",
    answer:
      "The Hollow is the living thing under the graves on Blackthorn Hill. Dr. Vance's notes call it a heart, with the town as its blood. Hollis said it sings, and Vance writes that it has been calling the sick up the road. The old rite puts it to sleep, but Vance writes that it always wakes again; only cutting the Heart's three veins kills it.",
    sections: [
      {
        id: "what-the-records-say",
        heading: "What the records say",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "It is not a sickness. Dr. Vance came to that conclusion himself.",
            "Glow sickness brings bright eyes, lost memories and sleepwalking toward the hills. The autopsy log adds luminous pupils, pale green blood and living roots in the lungs.",
            "Its water reached the asylum: Green Lake's water was piped up the hill, and the sick were fed \"the green water\".",
            "It was there before the mining: the rite note says four relics kept it asleep \"before the mine woke it\".",
            "The rite puts it to sleep; the Heart, in a cavern under the asylum, is what keeps it alive.",
          ] },
        ],
      },
    ],
    related: ["story-overview", "the-hollow", "the-heart-of-stillskin"],
    sources: [SRC.world, SRC.notes30],
    aliases: ["hollow", "heart beneath the hill", "the infection", "shared dreams"],
  },
  {
    ...base,
    slug: "e-hollis",
    lastVerified: "2026-10-31",
    title: "E. Hollis",
    seoTitle: "E. Hollis in Stillskin Forest: The Miner Who Woke the Hollow",
    description:
      "E. Hollis, the miner in Stillskin Forest lore: glow sickness, the crypt under the chapel, his lantern in the crypt cave, and his last words in the Hollow.",
    question: "Who is Hollis in Stillskin Forest?",
    answer:
      "E. Hollis was a miner admitted to Blackthorn Asylum with \"glow sickness\". He went down through the old crypt under the chapel, lantern burning green, and Dr. Vance writes that he woke something under the hill. His lantern still burns green in the crypt cave. His last words, found in the Weeping Gallery, explain the bridge, the plate, the roots that need two hands, and Marcus, who held the bridge for him and was taken.",
    sections: [
      {
        id: "his-trail",
        heading: "His trail",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "Admitted to Blackthorn by [Dr. Vance](@dr-h-vance). On Vance's tape he says something under the graves \"sings\".",
            "His body went to the cold room under St. Agnes with Sister Agnes' rosary in his hands. The autopsy log says he sat up, and drawer 4 is now empty.",
            "[The Miner's Lantern](@miners-lantern) is one of the four relics.",
            "\"Hollis' Last Words\" in the Weeping Gallery is effectively a guide to [Descent into the Hollow](@descent-into-the-hollow), including how to cross alone.",
          ] },
          unconfirmed("how E. Hollis is related to Marion Hollis, whose grave holds the Angel's Tear (the Groundskeeper says she cried herself to death when Hollis didn't come back), or to the Ranger Hollis heard on the ranger station radio."),
        ],
      },
    ],
    related: ["miners-lantern", "descent-into-the-hollow", "story-overview"],
    sources: [SRC.world, SRC.notes30],
    aliases: ["hollis", "miner", "glow sickness"],
  },
  {
    ...base,
    slug: "dr-h-vance",
    lastVerified: "2026-10-31",
    title: "Dr. H. Vance",
    seoTitle: "Dr. Vance in Stillskin Forest: Blackthorn's Doctor",
    description:
      "Dr. H. Vance in Stillskin Forest lore: the Blackthorn doctor who signed in the afflicted, wrote about the Heart and the rite, and kept the last relic.",
    question: "Who is Dr. Vance in Stillskin Forest?",
    answer:
      "Dr. H. Vance was the doctor at Blackthorn Asylum. He had glow-sickness patients moved there from St. Agnes and admitted them himself, including Hollis, a sleepwalking child and a patient who heard singing. He came to see it was never a sickness. His writings connect the old rite, the green water, the four relics and the thing under the hill. He kept the doctor's ring, the last relic, and couldn't make himself take it off.",
    sections: [
      {
        id: "his-writing",
        heading: "His writing",
        spoiler: true,
        blocks: [
          { type: "p", text: "Several notes and a tape carry his voice: the transfer orders, his journal and last entry, his notes on the Heart, a water-stained confession, and his session tape with Hollis. His office upstairs in [Blackthorn Asylum](@blackthorn-asylum) holds [his ring](@dr-vances-ring)." },
          { type: "p", text: "A staff memo says he hadn't left his office in nine days. His last line in the admission ledger says he signed every one of them in, and unlocked the front doors so someone could come up and end it." },
        ],
      },
    ],
    related: ["dr-vances-ring", "blackthorn-asylum", "green-lake", "story-overview"],
    sources: [SRC.world, SRC.notes30],
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
    lastVerified: "2026-10-31",
    title: "The Sister's Rosary",
    seoTitle: "The Sister's Rosary in Stillskin Forest: Location",
    description: "Where to find the Sister's Rosary in Stillskin Forest: one of the four ritual relics, hidden in the morgue under St. Agnes Hospital.",
    answer: "The Sister's Rosary (the pickup is labelled \"Sister Agnes' Rosary\") is one of the four relics for the Rite of Stillness. It is on the autopsy table in the morgue beneath St. Agnes Hospital, reached by the stairs down on the hospital's east side. Each survivor collects their own.",
    sections: [
      {
        id: "getting-it",
        heading: "Getting it",
        spoiler: true,
        blocks: [
          { type: "p", text: "Take the stairs down on the east side of [St. Agnes Hospital](@st-agnes-hospital) (follow the lanterns) into [the morgue](@morgue). Sister Agnes' tape says she left it in Hollis' hands; it lies with the body on the autopsy table. Dread builds while you search; don't stay longer than you need to." },
        ],
      },
    ],
    related: ["the-four-relics", "morgue"],
    sources: [SRC.world, SRC.notes30],
    aliases: ["rosary", "sister rosary"],
  },
  {
    ...base,
    slug: "miners-lantern",
    lastVerified: "2026-10-31",
    title: "The Miner's Lantern",
    seoTitle: "The Miner's Lantern in Stillskin Forest: Location",
    description: "Where to find the Miner's Lantern in Stillskin Forest: the relic that still burns green in the crypt cave, and the passage it opens.",
    answer: "The Miner's Lantern belonged to E. Hollis and still burns green in the chamber at the bottom of the crypt cave behind the chapel. Each survivor collects their own. The first time anyone takes it, the boulder that blocks the way into the Hollow grinds aside for everyone.",
    sections: [
      {
        id: "getting-it",
        heading: "Getting it",
        spoiler: true,
        blocks: [
          { type: "p", text: "Take the wooden stair behind [the chapel](@chapel) down into [the crypt cave](@crypt-cave). The lantern lies by a miner's remains in the green-lit chamber. Picking it up makes the boulder grind aside; green words on the wall beside it read \"THE LIGHT OPENS THE WAY\"." },
        ],
      },
    ],
    related: ["the-four-relics", "crypt-cave", "e-hollis", "descent-into-the-hollow"],
    sources: [SRC.world, SRC.notes30],
    aliases: ["miner lantern", "green lantern", "hollis lantern"],
  },
  {
    ...base,
    slug: "angels-tear",
    lastVerified: "2026-10-31",
    title: "The Angel's Tear",
    seoTitle: "The Angel's Tear in Stillskin Forest: Location",
    description: "Where to find the Angel's Tear in Stillskin Forest: follow the angel statue in the Blackthorn graveyard to Marion Hollis' grave and search it.",
    answer: "The angel statue in the Blackthorn graveyard points at Marion Hollis' grave. Hold \"Search the grave\" there to find the Angel's Tear. Each survivor searches for their own.",
    sections: [
      {
        id: "getting-it",
        heading: "Getting it",
        spoiler: true,
        blocks: [
          { type: "p", text: "In [the graveyard](@graveyard), find the angel and follow where it points. The inscription on the angel is one of the game's notes, and the Groundskeeper's tape says Marion was buried with a vial of her tears." },
        ],
      },
    ],
    related: ["the-four-relics", "graveyard"],
    sources: [SRC.world, SRC.notes30],
    aliases: ["angel tear", "tear"],
  },
  {
    ...base,
    slug: "dr-vances-ring",
    lastVerified: "2026-10-31",
    title: "Dr. Vance's Ring",
    seoTitle: "Dr. Vance's Ring in Stillskin Forest: Location",
    description: "Where to find Dr. Vance's Ring in Stillskin Forest: the last relic, kept in his office upstairs in Blackthorn Asylum.",
    answer: "Dr. Vance's Ring, the doctor's ring and the last of the four relics, is in Vance's office on the upper floor of Blackthorn Asylum. Each survivor collects their own.",
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
    sources: [SRC.world, SRC.notes30],
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
