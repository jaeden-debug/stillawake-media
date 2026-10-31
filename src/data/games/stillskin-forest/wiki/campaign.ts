import type { WikiBlock, WikiEntry } from "@/data/games/types";
import { SRC } from "./sources";

/**
 * V3 campaign, "The Ranger's Last Transmission". PRE-RELEASE DRAFT.
 *
 * Written from the V3 design documents before the update ships. Every mechanic
 * claim ends with "(TO VERIFY AT RELEASE)", as does every sentence that relies
 * on a story detail the owner has marked provisional (the ranger's name, the
 * Warden dying before she arrived, her disappearance being her entry into the
 * Astral). Pages are `verified_live` only so they render in the preview build;
 * this file must not reach main before the V3 release.
 *
 * Spoiler rule: the campaign's central twist appears only inside sections
 * marked `spoiler: true`. Titles, SEO titles, descriptions, questions,
 * answers, facts, aliases, gaps and every section heading stay clear of it,
 * because they show on listings, in the table of contents, in metadata and in
 * structured data.
 */

const base = { category: "campaign", verification: "verified_live", lastVerified: "2026-10-31" } as const;

const draft: WikiBlock = {
  type: "callout",
  tone: "warning",
  text: "Pre-release draft: the V3 campaign is not live yet. Details marked TO VERIFY AT RELEASE will be checked against the released game.",
};

const provisionalGap =
  "Some story details are provisional in the design documents and await the owner's confirmation.";

export const campaign: WikiEntry[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "campaign-getting-started",
    title: "How the Campaign Starts",
    seoTitle: "Stillskin Forest Campaign: How The Ranger's Last Transmission Starts",
    description:
      "How the Stillskin Forest V3 campaign begins: the radio briefing, your first two objectives, the Camp Stillskin board, saved sessions and the three hint levels.",
    question: "How does the Stillskin Forest campaign start?",
    answer:
      "A new session opens on a quiet morning at Camp Stillskin. A radio briefing from dispatch says the reserve is closed after a series of unexplained disappearances and gives you the job: find out what happened, starting with the missing ranger's records. Two objectives appear, \"Find the ranger's field records\" and \"Prepare for nightfall\", and the first clue is the ranger's notice on the Camp Stillskin board (TO VERIFY AT RELEASE).",
    facts: [
      ["Campaign", "The Ranger's Last Transmission (V3)"],
      ["Chapters", "22 (TO VERIFY AT RELEASE)"],
      ["Starts", "Session start, Camp Stillskin (TO VERIFY AT RELEASE)"],
      ["First objectives", "Find the ranger's field records · Prepare for nightfall (TO VERIFY AT RELEASE)"],
      ["Hints", "3 levels (TO VERIFY AT RELEASE)"],
      ["Progress", "Shared by the whole session (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What the campaign is",
        blocks: [
          draft,
          { type: "p", text: "V3 adds a story campaign, **The Ranger's Last Transmission**, on top of the survival game you already know. You still scavenge by day and survive the nights, but now there is an investigation running through every session: a wildlife ranger spent more than 100 days documenting what went wrong in Stillskin Wildlife Reserve, and then vanished. Her journals and tapes are the trail you follow." },
          { type: "p", text: "The campaign runs over 22 chapters, from Camp Stillskin to a final choice that changes the forest for good (TO VERIFY AT RELEASE). See [the chapter overview](@main-campaign) for the full route." },
        ],
      },
      {
        id: "the-briefing",
        heading: "The radio briefing",
        blocks: [
          { type: "p", text: "The first few seconds are deliberately quiet: no animals, no birdsong, wind in the pines. Then the radio crackles and dispatch speaks:" },
          { type: "callout", tone: "note", text: "\"Stillskin Wildlife Reserve. Closed following a series of unexplained disappearances. Your assignment is to find out what happened.\"" },
          { type: "p", text: "Dispatch goes on to name the last ranger on duty, Ranger Hollis, who filed reports from the Ranger Base and the fire watchtower for over three months (TO VERIFY AT RELEASE). Her last report is unaccounted for. Dispatch tells you to start with her records, points you to her notice on the camp board, and warns you not to be out in the open at nightfall." },
          { type: "p", text: "There is no voice acting: the briefing, like every recording in the campaign, appears as an on-screen transcript with radio sound effects (TO VERIFY AT RELEASE). You can move while it plays, and the transcript is saved in your journal (J) so you can read it again (TO VERIFY AT RELEASE). See [tapes and recordings](@tapes-and-recordings)." },
        ],
      },
      {
        id: "objectives",
        heading: "Your first objectives",
        blocks: [
          { type: "p", text: "The campaign shows at most one main objective, one survival objective and one optional objective at a time (TO VERIFY AT RELEASE). Press **O** to collapse the objective panel ([controls](@controls))." },
          { type: "table", caption: "Opening objectives", head: ["Type", "Objective", "How it completes"], rows: [
            ["Main", "Find the ranger's field records", "Read the ranger's notice on the Camp Stillskin board (TO VERIFY AT RELEASE)"],
            ["Survival", "Prepare for nightfall", "Nail 3 planks onto a shelter (TO VERIFY AT RELEASE)"],
          ] },
          { type: "p", text: "The notice is the brightest thing in view when you arrive: a fresh sheet on a weathered board, with a lantern hanging beside it. It asks campers to report any animal sightings at all, warns them not to follow lights or voices off the marked trails, and adds, in newer pen, that her records are at the base and in the tower. That sends you to chapter 2, the Ranger Base and the fire watchtower (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "saved-sessions",
        heading: "Saved sessions and progress",
        blocks: [
          { type: "p", text: "Every campaign lives inside a [saved session](@persistent-expeditions). Progress is shared by the whole session: when any member finds a required clue, the chapter counts it for everyone (TO VERIFY AT RELEASE). Notes, tapes and relics you pick up stay personal, as they do today (TO VERIFY AT RELEASE)." },
          { type: "list", items: [
            "Leaving saves automatically, and anyone in the session can come back to it later, even alone (TO VERIFY AT RELEASE).",
            "Dying or disconnecting never clears campaign progress (TO VERIFY AT RELEASE).",
            "In the forest, a team wipe still ends the session for good, as in the live game (TO VERIFY AT RELEASE).",
            "The Astral is the exception: a full wipe there sends everyone back to the cave tomb checkpoint and the session carries on. See [the Astral](@the-astral) (TO VERIFY AT RELEASE).",
            "A player who joins later starts at the session's current chapter, with an empty personal journal apart from the shared quest summaries (TO VERIFY AT RELEASE).",
          ] },
        ],
      },
      {
        id: "hints",
        heading: "The three hint levels",
        blocks: [
          { type: "p", text: "Every required clue can be found three ways, so nobody needs to look anything up outside the game." },
          { type: "table", caption: "Hint levels", head: ["Level", "What it is", "Example"], rows: [
            ["1 · Narrative", "A line in an earlier clue that points to the next one", "\"My records are at the base and in the tower.\""],
            ["2 · Environmental", "Something in the world that says \"this is the place\"", "A desk lamp left on at the Ranger Base; a blinking REC light on the radio"],
            ["3 · Assist", "After 12 in-game hours stuck on a step, a \"Ranger's note\" appears in your journal, with an optional map pin (TO VERIFY AT RELEASE)", "\"Day 1 is on my desk at the base, next to the radio.\""],
          ] },
          { type: "p", text: "Assist notes are written in the ranger's voice, so they never break the story, and they never point at something you have already collected (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "out-of-order",
        heading: "Finding things out of order is fine",
        blocks: [
          { type: "p", text: "The chapter order is a guide, not a gate. Every clue sets a permanent flag when it is found, and a chapter completes as soon as its clues are found, whenever that happened (TO VERIFY AT RELEASE). Read Backstreet's note on the hospital roof on your first afternoon and chapter 3 is already half done when you get there; collect relics early and they count toward chapter 11 (TO VERIFY AT RELEASE). Nothing re-locks, and nothing you find early can leave you stuck (TO VERIFY AT RELEASE)." },
          { type: "callout", tone: "tip", text: "Squads often split at the start: one group to the Ranger Base, one to the watchtower. Both find something, and chapter 2 needs both places anyway (TO VERIFY AT RELEASE)." },
        ],
      },
    ],
    related: ["main-campaign", "ranger-journals", "tapes-and-recordings", "persistent-expeditions", "controls", "how-to-play"],
    sources: [SRC.v3draft],
    aliases: ["v3", "v3 campaign", "rangers last transmission", "ranger's last transmission", "campaign start", "radio briefing", "camp board", "story mode", "hints"],
    gaps: [provisionalGap, "Objective wording, hint timing and session rules are from design documents and must be checked in the released build."],
  },

  // 2 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "main-campaign",
    title: "The Ranger's Last Transmission: All 22 Chapters",
    seoTitle: "Stillskin Forest Campaign Walkthrough: All 22 Chapters (V3)",
    description:
      "Chapter-by-chapter overview of The Ranger's Last Transmission, the Stillskin Forest V3 campaign: 22 chapters from Camp Stillskin to the final choice.",
    question: "What are the chapters of the Stillskin Forest campaign?",
    answer:
      "The Ranger's Last Transmission has 22 chapters (TO VERIFY AT RELEASE). Chapters 1 to 15 follow the missing ranger's trail through the reserve: her base and watchtower, the hunting camp, Stillwater, Green Lake, Blackthorn Asylum, the relics and the ritual, and the military quarantine. Chapters 16 to 22 cover the end of her trail and the permanent ending your crew chooses. The order is a guide: evidence found early still counts (TO VERIFY AT RELEASE).",
    facts: [
      ["Chapters", "22 (TO VERIFY AT RELEASE)"],
      ["Endings", "3, permanent (TO VERIFY AT RELEASE)"],
      ["Event chapters", "4 (first Watcher) and 15 (Silent Night) run on timers (TO VERIFY AT RELEASE)"],
      ["Chapter order", "A guide; clues found early still count (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "overview",
        heading: "How the campaign is structured",
        blocks: [
          draft,
          { type: "p", text: "Each chapter has a goal, shown as your main objective, and a set of clues that complete it. Most chapters are places to investigate. Two are events that happen to you: the first Watcher sighting (chapter 4) and the first Silent Night (chapter 15) (TO VERIFY AT RELEASE). New to the campaign? Start with [how the campaign starts](@campaign-getting-started)." },
        ],
      },
      {
        id: "chapters-1-15",
        heading: "Chapters 1 to 15: the ranger's trail",
        blocks: [
          { type: "table", caption: "Chapters 1–15", head: ["#", "Chapter", "What you do", "Where"], rows: [
            ["1", "Camp Stillskin", "Hear the briefing, read the ranger's notice", "Camp Stillskin board"],
            ["2", "Ranger Base", "Collect her first journals and her radio log", "Ranger Base and fire watchtower"],
            ["3", "The hunting camp", "Find out what the hunter [Backstreet](@backstreet) saw", "Hunting camp, St. Agnes Hospital roof"],
            ["4", "The first Watcher", "An event: something watches one of you (TO VERIFY AT RELEASE)", "Anywhere, Days 2–5 (TO VERIFY AT RELEASE)"],
            ["5", "Stillwater", "Learn what happened to the residents", "Rosie's Diner, Elm Street, Pine General Store"],
            ["6", "Green Lake", "Follow the green light", "Green Lake, the Lost Camp"],
            ["7", "The device", "Recover the [Freeze Device](@freeze-device-story)", "The Lost Camp"],
            ["8", "Blackthorn", "Get into the asylum", "Memorial Park, Blackthorn Asylum"],
            ["9", "The Warden's office", "Find the [Hunter's Rifle](@hunters-rifle) or the Warden's journal", "Asylum, top floor, right side"],
            ["10", "The goggles", "Learn where the Warden's night-vision goggles went", "Asylum staff room and office"],
            ["11", "The relics", "Find [the four relics](@relics-and-the-buried-relic)", "Around the map; one is buried"],
            ["12", "The ritual", "Complete the Rite of Stillness, which frees the goggles (TO VERIFY AT RELEASE)", "Asylum cafeteria"],
            ["13", "The quarantine", "Uncover what happened to the military", "Blackpine Airfield, the medical camp"],
            ["14", "Final transmissions", "Hear the ranger's last tapes", "Watchtower, Ranger Base, Lookout Camp"],
            ["15", "Silent Night", "An event: the forest goes quiet (TO VERIFY AT RELEASE)", "Anywhere, Days 4–6 (TO VERIFY AT RELEASE)"],
          ] },
        ],
      },
      {
        id: "what-completes-a-chapter",
        heading: "What each chapter needs",
        blocks: [
          { type: "list", items: [
            "**Chapter 2** needs her four early journals and the radio log (TO VERIFY AT RELEASE).",
            "**Chapter 3** needs Backstreet's recording at the hunting camp and his note on the hospital roof (TO VERIFY AT RELEASE).",
            "**Chapter 5** needs any two of three residents' accounts (TO VERIFY AT RELEASE).",
            "**Chapter 6** needs the clue on the Green Lake shore and the letter at the Lost Camp (TO VERIFY AT RELEASE).",
            "**Chapter 9** completes on either the Hunter's Rifle or the Warden's journal (TO VERIFY AT RELEASE).",
            "**Chapter 10** completes when you claim the goggles after the ritual (TO VERIFY AT RELEASE).",
            "**Chapter 13** needs the quarantine report and the burial record, and two military tapes open it (TO VERIFY AT RELEASE).",
            "**Chapter 14** needs all three of the ranger's final tapes (TO VERIFY AT RELEASE).",
          ] },
          { type: "callout", tone: "tip", text: "No chapter can fail for good. If a timed event is interrupted (someone goes down, a fight starts), it waits for the next good moment (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "chapters-16-22",
        heading: "Chapters 16 to 22: the end of the trail",
        spoiler: true,
        blocks: [
          { type: "table", caption: "Chapters 16–22", head: ["#", "Chapter", "What happens"], rows: [
            ["16", "The cave tomb", "Once the final tapes and Silent Night are behind you, the Watchers close in at night and your crew collapses. You wake together in the cave tomb, beside a page from the ranger's fire map (TO VERIFY AT RELEASE)."],
            ["17", "[The Dark Forest](@dark-forest)", "Follow the draught out of the tomb with the hill behind you, into near-black forest. Night vision is essential (TO VERIFY AT RELEASE)."],
            ["18", "[The Nowhere Tree](@nowhere-tree)", "A tree past the end of the map. Everyone present chooses to go through (TO VERIFY AT RELEASE)."],
            ["19", "[The Astral](@the-astral)", "Survive one full night in a grey world, against hostile Watchers (TO VERIFY AT RELEASE)."],
            ["20", "The false ranger", "At dawn a light appears. The ranger is standing in it, and she speaks to you through the radio on her vest. She is not the ranger. The real ranger died in the Astral; this is the entity wearing her voice and shape."],
            ["21", "The choice", "Your crew votes: \"Follow the light\", \"Refuse and run\", or, for prepared crews only, \"Destroy the false ranger\" (TO VERIFY AT RELEASE)."],
            ["22", "The world after", "The forest changes for good. See [after the campaign](@post-campaign-survival)."],
          ] },
        ],
      },
      {
        id: "what-it-adds-up-to",
        heading: "What the story adds up to",
        spoiler: true,
        blocks: [
          { type: "p", text: "By the end, an attentive player can put six things together:" },
          { type: "list", ordered: true, items: [
            "The ranger was real, brave and right.",
            "The Warden tried to control the thing under the hill and became part of it.",
            "The military came, tried to contain it, and failed.",
            "The ranger found the Nowhere Tree and died in the Astral. In the design this is also when she disappeared (TO VERIFY AT RELEASE).",
            "Every clue you followed was genuine, but the entity arranged which ones you found and when, to bring capable survivors to it.",
            "The ranger waiting at the end is an imitation. The entity wants survivors to accept its influence and carry it out of the Astral.",
          ] },
          { type: "p", text: "Her last tape warns you in so many words: \"If you hear my voice telling you it's safe, don't believe me.\" The imitation's first words in person tell you it's safe." },
        ],
      },
      {
        id: "endings",
        heading: "The three endings",
        blocks: [
          { type: "p", text: "Every ending is permanent for the session, and none of them is a victory screen followed by a reset: the session carries on in the world your crew chose (TO VERIFY AT RELEASE). The choice is a vote among everyone present (TO VERIFY AT RELEASE)." },
          { type: "list", items: [
            "[The Marked](@ending-the-marked): the choice labelled \"Follow the light\".",
            "[The Remains](@ending-the-remains): the choice labelled \"Refuse and run\".",
            "[The Severance](@ending-the-severance): the third choice, which appears only for crews who prepared for it (TO VERIFY AT RELEASE).",
          ] },
        ],
      },
    ],
    related: ["campaign-getting-started", "ranger-journals", "tapes-and-recordings", "the-astral", "ending-the-severance", "post-campaign-survival"],
    sources: [SRC.v3draft],
    aliases: ["campaign walkthrough", "chapters", "chapter list", "main quest", "v3 story", "quest order", "ranger's last transmission chapters"],
    gaps: [provisionalGap, "Chapter names, completion rules and the order of chapters 16 to 22 are from design documents."],
  },

  // 3 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "ranger-journals",
    title: "Ranger Journals",
    seoTitle: "Stillskin Forest Ranger Journals: How Many and Where to Find Them",
    description:
      "The missing ranger's field journals in Stillskin Forest V3: what they are, how many there are, and where the early entries are at the base and watchtower.",
    question: "Where are the ranger's journals in Stillskin Forest?",
    answer:
      "The ranger's journals are dated field entries she wrote over more than 100 days investigating the reserve, and they are the main trail of the V3 campaign. The design calls for 25 to 35 entries, counting her tapes (TO VERIFY AT RELEASE). The first four are at the Ranger Base and the fire watchtower, and chapter 2 needs all of them (TO VERIFY AT RELEASE).",
    facts: [
      ["Written by", "The missing ranger (Ranger Hollis, TO VERIFY AT RELEASE)"],
      ["Entries", "25–35, including tapes (TO VERIFY AT RELEASE)"],
      ["Span", "Ranger Day 1 to past Day 100"],
      ["First four", "Ranger Base and fire watchtower (TO VERIFY AT RELEASE)"],
      ["Read again", "Journal (J) (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "what-they-are",
        heading: "What the journals are",
        blocks: [
          draft,
          { type: "p", text: "The ranger was posted to Stillskin after reports that the animals had gone. She started out writing like a professional: dates, counts, tracks, weather. Over the months her entries get longer, then shorter and less certain, but she never stops trying to leave something useful for whoever comes after her." },
          { type: "p", text: "The journals replace the old map letters as the backbone of the story (TO VERIFY AT RELEASE). Each entry is a readable note: read it once and it is saved in your journal (J), and the campaign counts it for the whole session (TO VERIFY AT RELEASE). Most entries point to the next place to look." },
        ],
      },
      {
        id: "early-entries",
        heading: "Where the early entries are",
        blocks: [
          { type: "table", caption: "Ranger journal entries, chapters 1–5", head: ["Ranger day", "Where", "Needed?", "Points to"], rows: [
            ["Notice", "Camp Stillskin board, by a lantern", "Yes, chapter 1 (TO VERIFY AT RELEASE)", "The base and the tower"],
            ["Day 1", "Ranger Base, on the desk by the radio", "Yes, chapter 2 (TO VERIFY AT RELEASE)", "Her trail cameras"],
            ["Day 6", "Ranger Base, under the map on the map table", "Yes, chapter 2 (TO VERIFY AT RELEASE)", "The watchtower"],
            ["Day 10", "The existing \"Ranger Hollis — Watch Log\" note at the ranger station (TO VERIFY AT RELEASE)", "Optional", "Green Lake's drainage and the fire map"],
            ["Day 12", "Fire watchtower cab, on the log shelf", "Yes, chapter 2 (TO VERIFY AT RELEASE)", "The next entry in the cab"],
            ["Day 19", "Fire watchtower, under the open logbook", "Yes, chapter 2 (TO VERIFY AT RELEASE)", "The hunting camp, past the east trail"],
            ["Day 20", "Hunting camp, pinned to the meat-shed door", "Optional", "Backstreet's story"],
            ["Day 27", "Lookout Camp, inside the tent", "Optional", "What the first Watcher was"],
            ["Day 41", "Stillwater, in the parked police car", "Optional", "Green Lake, then the asylum"],
          ] },
          { type: "p", text: "Her radio log on the base's radio desk is the fifth thing chapter 2 needs (TO VERIFY AT RELEASE). See [tapes and recordings](@tapes-and-recordings)." },
          { type: "callout", tone: "tip", text: "Read them in order if you can, as her notice asks. Nothing breaks if you don't, but the early entries plant details that matter much later." },
        ],
      },
      {
        id: "middle-entries",
        heading: "Days 44 to 80: the lake, the asylum and the circle",
        spoiler: true,
        blocks: [
          { type: "table", caption: "Ranger journal entries, chapters 6–12", head: ["Ranger day", "Where", "What she found"], rows: [
            ["44", "Green Lake dock", "The lake glows from below; a pipe runs uphill toward Blackthorn"],
            ["51", "Green Lake drain outlet", "The pump-house valve has been welded open; the asylum drank from the lake"],
            ["57", "Blackthorn Asylum gate", "A new chain and lock; the town's story of the Warden who \"went into the circle to hold it\""],
            ["61", "A ward bed in the asylum", "Made beds, files that measure the patients, a circle-and-line symbol on the walls"],
            ["66", "The Warden's office", "Backstreet's rifle on the rack, things labelled with dates after the Warden's death, a locked cabinet"],
            ["70", "Beside the empty goggle case in the office", "The Warden's goggles went into the circle with him"],
            ["74", "The chapel, by the Rite of Stillness", "The rite puts it to sleep and promises nothing more"],
            ["80", "The asylum cafeteria, near the circle", "A green glint in the circle she can't reach; \"Whoever comes after me: finish it.\""],
          ] },
          { type: "p", text: "In the current draft the Warden died before she arrived, so she finds the aftermath rather than the man (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "late-entries",
        heading: "The last entries",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "**Day 86, inside the watchtower cab door.** The tower radio played her nightly log back to her on its own, a day behind, word for word, with the recorder off.",
            "**Days 92, 98 and \"one hundred and something\".** Her three final tapes at the watchtower, the Ranger Base and the Lookout Camp tent. The last one carries her warning: \"If you hear my voice telling you it's safe, don't believe me.\"",
            "**Day 101, on the Ranger Base door.** Her last written entry: she left for the tree without the goggles.",
            "**Day 99, the cave tomb.** A torn page of her fire map with a route to the tree, waiting where your crew wakes. \"If you woke up in here, you didn't walk in. I'm sorry. Keep going.\"",
            "**The Dark Forest and the Nowhere Tree.** Two handheld recordings on the way, and one at the roots.",
            "**The Astral.** Her lantern by a ruined house, cracked, with four words scratched into the brass: \"R.H. — it is not me.\" It is on every route (TO VERIFY AT RELEASE).",
          ] },
          { type: "p", text: "Every word she wrote is true. What the entity controlled was where her records ended up and in what order you found them. She died in the Astral, and her lantern is the one thing she managed to leave there in spite of it: the warning that the ranger you are about to meet is not her." },
        ],
      },
    ],
    related: ["tapes-and-recordings", "main-campaign", "campaign-getting-started", "notes-and-tapes", "ranger-station-trail"],
    sources: [SRC.v3draft],
    aliases: ["journals", "ranger journal", "field journal", "ranger hollis", "journal locations", "ranger notes", "watch log"],
    gaps: [provisionalGap, "The final number of journal entries and every placement are from design documents; world placement is still being built."],
  },

  // 4 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "tapes-and-recordings",
    title: "Tapes and Recordings",
    seoTitle: "Stillskin Forest Tapes and Recordings: Transcripts, Journal and Voices",
    description:
      "How tapes, radios and answering machines work in the Stillskin Forest V3 campaign: on-screen transcripts, the journal, and whose recordings you find.",
    question: "How do tapes and recordings work in the Stillskin Forest campaign?",
    answer:
      "There is no voice acting in V3. Every tape, radio call and answering machine plays as an on-screen transcript, typed out line by line over sound effects such as static, wind and breathing (TO VERIFY AT RELEASE). The full transcript is saved in your journal the first time it plays (TO VERIFY AT RELEASE). You hear the ranger, dispatch, the hunter Backstreet, a Stillwater family, asylum staff and the military.",
    facts: [
      ["Voice acting", "None; on-screen transcripts (TO VERIFY AT RELEASE)"],
      ["Types", "Tapes, radio calls, an answering machine"],
      ["Length", "About 10–55 s each (TO VERIFY AT RELEASE)"],
      ["Saved to", "Journal (J) on first play (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "how-they-work",
        heading: "How recordings work",
        blocks: [
          draft,
          { type: "list", items: [
            "Walk up to a recorder, radio or answering machine and hold **E** (Square on controller) on its prompt (TO VERIFY AT RELEASE).",
            "The transcript types out on screen, one short line at a time, timed to the recording (TO VERIFY AT RELEASE).",
            "Sounds appear as grey cues, such as [static], [breathing] or [footsteps], and play as sound effects (TO VERIFY AT RELEASE).",
            "When more than one person speaks, each line starts with the speaker's name in capitals (TO VERIFY AT RELEASE).",
            "Close it any time with **Esc** (Circle on controller) and read the full transcript later in your journal: **J** on keyboard, hold Select or the touchpad on controller ([controls](@controls)).",
            "A recording counts toward the campaign when any member of the session finishes or stops it (TO VERIFY AT RELEASE).",
          ] },
          { type: "p", text: "The existing notes and tapes system is described on [notes and tapes](@notes-and-tapes); V3 builds on it." },
        ],
      },
      {
        id: "who-you-hear",
        heading: "Who you hear",
        blocks: [
          { type: "table", caption: "Recordings in chapters 1–13", head: ["Voice", "Recording", "Where", "Chapter"], rows: [
            ["Dispatch", "The opening briefing", "Plays at session start", "1"],
            ["The ranger and dispatch", "Her radio log: days 9, 14 and 20", "Ranger Base, radio desk (TO VERIFY AT RELEASE)", "2"],
            ["The ranger", "Her nightly tower log, read aloud", "Fire watchtower radio (TO VERIFY AT RELEASE)", "2"],
            ["Backstreet", "A phone recording of the eyes", "Hunting camp, by the fire ring (TO VERIFY AT RELEASE)", "3"],
            ["A Stillwater mother", "Three messages on an answering machine", "A house on Elm Street (TO VERIFY AT RELEASE)", "5"],
            ["An asylum orderly", "A confession from the staff room", "Blackthorn Asylum (TO VERIFY AT RELEASE)", "8"],
            ["A military medic", "The medical-camp intake log", "Quarantine medical camp (TO VERIFY AT RELEASE)", "13"],
            ["A military officer", "The radio log of the breach", "Blackpine Airfield command center (TO VERIFY AT RELEASE)", "13"],
          ] },
          { type: "p", text: "There is also one hum: on the fire-tower stairs at night you may hear a faint, wordless melody below you (TO VERIFY AT RELEASE). Other hum sources are silent for now (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "late-recordings",
        heading: "The ranger's last recordings",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "**Final transmission 1, the watchtower (Day 92).** She heard her own voice on the Green Lake shore, eight kilometres away, using words she hadn't said yet.",
            "**Final transmission 2, the Ranger Base (Day 98).** She found a tree past the hill that isn't on any map. \"I'm going to look. Not through. Just look.\"",
            "**Final transmission 3, the Lookout Camp tent.** \"It learns voices. It learned mine. If you hear my voice telling you it's safe, don't believe me.\" This tape is one of the three things the Severance needs (TO VERIFY AT RELEASE).",
            "**Two handheld recordings in the Dark Forest, and one at the Nowhere Tree's roots,** ending with her footsteps going in.",
            "**Her lost handheld radio in the Astral,** at the end of the night: \"Come towards the light. It's safe now.\"",
            "**The radio on the false ranger's vest.** Five lines, the last repeating \"It's safe. It's safe now.\"",
            "**Dispatch after the ending,** with a different broadcast for each ending. See [after the campaign](@post-campaign-survival).",
          ] },
        ],
      },
      {
        id: "wrong-voices",
        heading: "Reading between the lines",
        spoiler: true,
        blocks: [
          { type: "p", text: "Recordings in which the entity speaks with someone else's voice get no special styling (TO VERIFY AT RELEASE). The tells are in the words:" },
          { type: "list", items: [
            "On the Elm Street answering machine, the son's message is the calmest thing on the tape, after two frightened ones, and he never answers anything his mother asked. \"It's safe now. Come outside.\"",
            "Every real recording of the ranger opens with a day number or a place. The Astral radio call doesn't.",
            "The false ranger repeats a line from her Day 1 journal word for word, says the exact phrase her warning tape told you never to believe, never mentions the warning, the Warden's notes or her lantern, and never moves her mouth: every line is tagged [radio crackle].",
          ] },
        ],
      },
    ],
    related: ["ranger-journals", "notes-and-tapes", "campaign-getting-started", "backstreet", "controls"],
    sources: [SRC.v3draft, SRC.controls31],
    aliases: ["tapes", "recordings", "transcripts", "radio", "answering machine", "voices", "voice acting", "audio logs"],
    gaps: [provisionalGap, "Transcript timing, prompts and placements are from design documents."],
  },

  // 5 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "backstreet",
    title: "Backstreet",
    seoTitle: "Who Is Backstreet in Stillskin Forest? The Hunter's Story",
    description:
      "Backstreet, the frightened hunter in the Stillskin Forest V3 campaign: what he saw at the hunting camp, where his recording and note are, and his rifle.",
    question: "Who is Backstreet in Stillskin Forest?",
    answer:
      "Backstreet is a frightened hunter, known only by his nickname. He saw glowing eyes at the hunting camp, fled, lost his rifle and ran for the roof of St. Agnes Hospital. His recording at the hunting camp and his note on the hospital roof are the two clues chapter 3 needs (TO VERIFY AT RELEASE).",
    facts: [
      ["Role", "Hunter, first witness of the eyes"],
      ["Chapter", "3 (TO VERIFY AT RELEASE)"],
      ["Clues", "Hunting-camp recording, hospital-roof note (TO VERIFY AT RELEASE)"],
      ["His rifle", "The Hunter's Rifle"],
    ],
    sections: [
      {
        id: "who-he-is",
        heading: "Who he is",
        blocks: [
          draft,
          { type: "p", text: "Everyone calls him Backstreet; his real name hasn't been decided. He came off the east trail at a dead run one morning, with no rifle and no pack, and the ranger gave him coffee he was shaking too hard to drink. He told her there were eyes at the hunting camp: \"Not animal eyes. Too high. Too many. Glowing.\" She is the reason you go looking for him." },
        ],
      },
      {
        id: "where-to-find",
        heading: "Where to find his trail",
        blocks: [
          { type: "table", caption: "Backstreet's clues", head: ["Clue", "Where", "Needed?"], rows: [
            ["His phone recording", "The hunting camp, past the east trail: listen for a chirp by the fire ring (TO VERIFY AT RELEASE)", "Yes, chapter 3 (TO VERIFY AT RELEASE)"],
            ["His note, on the back of a hunting tag", "The roof of [St. Agnes Hospital](@st-agnes-hospital), wedged under a vent, near an empty can and a torn sleeve (TO VERIFY AT RELEASE)", "Yes, chapter 3 (TO VERIFY AT RELEASE)"],
            ["The ranger's Day 20 entry", "Pinned to the hunting camp's meat-shed door with a knife (TO VERIFY AT RELEASE)", "Optional"],
            ["His farewell", "The flooded tunnel near the park (TO VERIFY AT RELEASE)", "Optional"],
          ] },
          { type: "p", text: "The ranger's Day 19 journal in the fire watchtower points you to the hunting camp, and the end of his recording names the hospital roof. Either clue can be found first (TO VERIFY AT RELEASE)." },
          { type: "callout", tone: "tip", text: "Go to the hunting camp by day. The recording can be stopped if infected come, but the camp is a long way from shelter." },
        ],
      },
      {
        id: "how-his-story-ends",
        heading: "How his story ends",
        spoiler: true,
        blocks: [
          { type: "p", text: "From the roof, Backstreet tried the storm tunnel by the park, hoping the drains would take him to the lake and the road. The water rose faster than he expected and the grate at the lake end was locked. His skeleton is on a dry ledge in the flooded tunnel, beside a short farewell to his mother: \"It's not so bad in here. It's quiet. Nothing hums.\"" },
          { type: "p", text: "His rifle didn't stay at the hunting camp. The ranger found a careful drag mark through the ash, and later found the rifle on the rack in the Warden's office, where it had not been a few days before. In the current draft the Warden was already dead by then, so something under his influence carried it there (TO VERIFY AT RELEASE). See [the Hunter's Rifle](@hunters-rifle)." },
        ],
      },
    ],
    related: ["hunters-rifle", "ranger-journals", "tapes-and-recordings", "st-agnes-hospital", "main-campaign"],
    sources: [SRC.v3draft],
    aliases: ["backstreet", "the hunter", "hunting camp", "hunter's tape", "glowing eyes", "flooded tunnel"],
    gaps: [provisionalGap, "Backstreet's real name is left blank by the owner. The hunting camp and flooded tunnel are still being built."],
  },

  // 6 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "hunters-rifle",
    title: "Hunter's Rifle",
    seoTitle: "Hunter's Rifle in Stillskin Forest: Backstreet's Gun and Where to Find It",
    description:
      "The Hunter's Rifle, V3's new name for the Hunting Rifle in Stillskin Forest: whose it was, how it reached Blackthorn, and where it is (top floor, right side).",
    question: "Where is the Hunter's Rifle in Stillskin Forest?",
    answer:
      "The Hunter's Rifle is the V3 name for the Hunting Rifle (TO VERIFY AT RELEASE). In the campaign it is Backstreet's rifle, lost when he fled the hunting camp. It is in the Warden's office in Blackthorn Asylum, on the top floor, right side (TO VERIFY AT RELEASE). Finding it, or the Warden's journal, completes chapter 9 (TO VERIFY AT RELEASE).",
    facts: [
      ["Old name", "Hunting Rifle"],
      ["Owner", "Backstreet"],
      ["Where", "Warden's office, Blackthorn Asylum, top floor, right side (TO VERIFY AT RELEASE)"],
      ["Ammunition", "Rifle Rounds (TO VERIFY AT RELEASE)"],
      ["Chapter", "9 (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "what-changes",
        heading: "What changes in V3",
        blocks: [
          draft,
          { type: "p", text: "The rifle gets a new name and a story. It was Backstreet's, his dad's rifle, and losing it is one of the first things he tells you about. The rename isn't expected to change the gun itself; check its stats on the weapons pages at release (TO VERIFY AT RELEASE)." },
          { type: "p", text: "In the live game the rifle is claimed from a case in Dr. Vance's office ([Blackthorn Asylum](@blackthorn-asylum)), and in V3 Dr. Vance is the Warden. Whether V3 keeps the case or shows the rifle on a rack is part of the release check (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "how-to-get-it",
        heading: "How to get it",
        blocks: [
          { type: "list", ordered: true, items: [
            "Unlock the asylum with the [Admission Ledger](@blackthorn-admission-ledger) (chapter 8) (TO VERIFY AT RELEASE).",
            "Go to the top floor and take the right side. The Warden's door has a brass WARDEN plate, and you can see the rifle through the door glass (TO VERIFY AT RELEASE).",
            "Claim the rifle. Chapter 9 completes on the rifle or on the Warden's journal in the same office, whichever comes first (TO VERIFY AT RELEASE).",
          ] },
          { type: "callout", tone: "tip", text: "While you're in the office, note the locked cabinet. It holds the Warden's frequency notes, one of the three things [the Severance](@ending-the-severance) needs, and its key is elsewhere in the asylum (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "how-it-got-there",
        heading: "How it got to the office",
        spoiler: true,
        blocks: [
          { type: "p", text: "Backstreet's initials are scratched under the stock. The ranger's Day 66 entry finds the rifle on the rack when it had not been there on Day 61, in an office nobody alive had entered. The Warden's office is \"a museum of things the forest took\": knives, a camp lantern, a child's shoe, each labelled in his hand with dates after his death. \"Whatever he is now, he is still collecting.\"" },
          { type: "p", text: "Canon says the Warden recovered the rifle. In the current draft he died before the ranger arrived, so it was carried there by an infected body under his influence (TO VERIFY AT RELEASE)." },
        ],
      },
    ],
    related: ["backstreet", "blackthorn-asylum", "blackthorn-admission-ledger", "ending-the-severance", "main-campaign"],
    sources: [SRC.v3draft, SRC.publish31],
    aliases: ["hunting rifle", "hunters rifle", "backstreet's rifle", "rifle location", "warden's office", "vance office rifle"],
    gaps: [provisionalGap, "Whether the rename changes any stats, and how the rifle is claimed in V3, must be checked in the released build."],
  },

  // 7 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "freeze-device-story",
    title: "The Freeze Device's Story",
    seoTitle: "Stillskin Forest Freeze Device Story: Green Lake, Lost Camp and the Prototype",
    description:
      "The Freeze Device in the Stillskin Forest V3 campaign: a military prototype, its trail from Green Lake to the Lost Camp, and why the third ending needs it.",
    question: "Where does the Freeze Device come from in the Stillskin Forest campaign?",
    answer:
      "In V3 the Freeze Device is a military prototype built to interrupt whatever controls the infected. A containment specialist escaped the collapsing quarantine with it and never made it past Green Lake; a camper carried it on to the Lost Camp, where its green glow lights the trees. You recover it there in chapter 7 (TO VERIFY AT RELEASE). It stops an Astral Watcher for about 10 seconds (TO VERIFY AT RELEASE), and a working device is one of three things the Severance ending needs (TO VERIFY AT RELEASE).",
    facts: [
      ["What it is", "A military prototype"],
      ["Where", "The Lost Camp (TO VERIFY AT RELEASE)"],
      ["Chapters", "6–7 (TO VERIFY AT RELEASE)"],
      ["Freezes an Astral Watcher", "About 10 s (TO VERIFY AT RELEASE)"],
      ["Ending", "Needed for the Severance (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "overview",
        heading: "What changes in V3",
        blocks: [
          draft,
          { type: "p", text: "The [Freeze Device](@freeze-device) you know is the same gadget with a new history. In the live game you claim it from the nurse-station counter in Blackthorn Asylum; in V3 its story, and the place you recover it, move to Green Lake and the [Lost Camp](@lost-camp) (TO VERIFY AT RELEASE). Its cooldown, identity and anti-duplication rules stay as they are (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "the-trail",
        heading: "Following the trail",
        blocks: [
          { type: "list", ordered: true, items: [
            "**Green Lake shore.** The ranger's Day 41 journal says the green lights are strongest over [Green Lake](@green-lake). On the shore, a torn hazard suit is visible from the dock; the containment specialist's notebook page is with it. This is required for chapter 6 (TO VERIFY AT RELEASE).",
            "**The Lost Camp.** The specialist left the prototype \"with the kid from the campsite\". Follow the green light in the trees off the trail behind the chapel to the Lost Camp, and read the camper's letter by the fire pit, also required for chapter 6 (TO VERIFY AT RELEASE).",
            "**The case.** The letter says the device is \"in the case under the middle shelter\", still lit. Picking it up completes chapter 7 for the session; each survivor takes their own (TO VERIFY AT RELEASE).",
            "**The tag.** A military tag tied to the case explains what it does. Optional.",
          ] },
        ],
      },
      {
        id: "in-the-astral",
        heading: "Using it in the Astral",
        blocks: [
          { type: "list", items: [
            "A freeze that catches an Astral Watcher holds it for 10 seconds and does it no damage (TO VERIFY AT RELEASE).",
            "Freezing the Watcher that is grabbing someone breaks the grab at once (TO VERIFY AT RELEASE).",
            "A Watcher can't be frozen again for 6 seconds afterwards, and repeat freezes on the same one within 30 seconds get shorter: 10, then 6, then 3 seconds (TO VERIFY AT RELEASE).",
            "The device's cooldown is the same as in the forest, so it is a decision, not a guarantee (TO VERIFY AT RELEASE).",
          ] },
          { type: "p", text: "See [the Watchers](@watchers) for the grab and the other ways to break it." },
        ],
      },
      {
        id: "the-severance",
        heading: "Why the third ending needs it",
        blocks: [
          { type: "p", text: "The third choice at the end of the campaign appears only if a member present at the choice carries the Freeze Device (its cooldown doesn't matter), alongside two documents (TO VERIFY AT RELEASE). See [the Severance](@ending-the-severance)." },
          { type: "callout", tone: "note", text: "In the story, the people who used it measured different effects: the Warden timed eleven seconds with an early version of the green light, and a military tape reports three seconds before its operator was cut off. Those are story details, not the game's numbers." },
        ],
      },
      {
        id: "at-the-end",
        heading: "What it does at the end",
        spoiler: true,
        blocks: [
          { type: "p", text: "The device was built to interrupt the frequency the entity uses to control bodies, and the Warden's notes show the same frequency can wear any voice it has heard. In the Severance, its green light cuts the radio voice of the false ranger off mid-word, and for those seconds the figure stands silent and wrong. The rest of the confrontation is still being designed (TO VERIFY AT RELEASE)." },
        ],
      },
    ],
    related: ["freeze-device", "lost-camp", "green-lake", "watchers", "ending-the-severance"],
    sources: [SRC.v3draft],
    aliases: ["freeze device", "prototype", "interrupt unit", "lost camp device", "green lake specialist", "freeze gun story"],
    gaps: [provisionalGap, "Decided: the device has a cooldown, not charges; the Severance only needs a present member to carry it. Confirm at release."],
  },

  // 8 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "night-vision-and-the-ritual",
    title: "Night Vision and the Ritual",
    seoTitle: "How to Get Night Vision in Stillskin Forest V3: The Warden's Goggles",
    description:
      "How to get night-vision goggles in the Stillskin Forest V3 campaign: why they're trapped in the ritual circle, how the ritual frees them, and why you need them.",
    question: "How do you get night vision in the Stillskin Forest campaign?",
    answer:
      "The night-vision goggles belonged to the Warden, who stole them from the military. They are trapped in the ritual circle in Blackthorn Asylum's cafeteria: you can see a green glint at its centre but can't take it. Completing the Rite of Stillness releases them, and each survivor claims their own pair (TO VERIFY AT RELEASE). You need them for the Dark Forest, where a lamp lights only about a metre (TO VERIFY AT RELEASE).",
    facts: [
      ["Source", "The ritual circle, Blackthorn Asylum cafeteria (TO VERIFY AT RELEASE)"],
      ["Released by", "Completing the Rite of Stillness (TO VERIFY AT RELEASE)"],
      ["One pair", "Per survivor (TO VERIFY AT RELEASE)"],
      ["Needed for", "The Dark Forest (TO VERIFY AT RELEASE)"],
      ["Toggle", "F / D-pad down"],
    ],
    sections: [
      {
        id: "overview",
        heading: "Why the ritual matters now",
        blocks: [
          draft,
          { type: "p", text: "In the live game the goggles are already the ritual's reward. V3 gives that a reason and raises the stakes: the ritual is the only way to get night vision for the campaign, so it becomes the road to the late chapters (TO VERIFY AT RELEASE). Players who already own the goggles keep them (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "the-trail",
        heading: "The trail to the goggles (chapter 10)",
        blocks: [
          { type: "list", items: [
            "**The Warden's office.** A military incident report: one pair of night observation goggles signed out to Dr. H. Vance \"for patient observation under low light\", never returned. The goggle case in the office is empty (TO VERIFY AT RELEASE).",
            "**The asylum staff room.** A night nurse's log, pinned under the orderly's tape, says where they went and that \"something still glints in the middle of that circle\" (TO VERIFY AT RELEASE).",
            "**The cafeteria circle.** A faint green glint at the centre. Try to take it and the prompt says \"Out of reach. The circle is holding it.\", and your objective changes to finishing the ritual (TO VERIFY AT RELEASE).",
          ] },
        ],
      },
      {
        id: "releasing-them",
        heading: "Releasing the goggles (chapter 12)",
        blocks: [
          { type: "list", ordered: true, items: [
            "Find all four relics. One has moved in V3: see [relics and the buried relic](@relics-and-the-buried-relic) (TO VERIFY AT RELEASE).",
            "Complete [the Rite of Stillness](@the-rite-of-stillness) at the cafeteria circle, holding it through the siege as in the live game (TO VERIFY AT RELEASE).",
            "When the rite completes, the goggles lie glowing in the scorch at the circle's centre. Hold **E** (Square) to claim your pair; everyone present takes their own (TO VERIFY AT RELEASE).",
          ] },
          { type: "p", text: "The ritual can be completed once per expedition and still pays 150 Embers (TO VERIFY AT RELEASE). Claiming the goggles completes chapter 10 (TO VERIFY AT RELEASE). Toggle them with **F** or D-pad down, like the [headlamp](@headlamp) ([controls](@controls))." },
          { type: "callout", tone: "warning", text: "The siege is the most dangerous fight before the late chapters, and a team wipe in the forest ends the session (TO VERIFY AT RELEASE). Go in rested, armed and healed." },
        ],
      },
      {
        id: "why-you-need-them",
        heading: "Why you need them",
        blocks: [
          { type: "list", items: [
            "**The Dark Forest** is near-black; a lamp lights about a metre, and the goggles make it navigable (TO VERIFY AT RELEASE). A hint at its edge warns players who arrive without them (TO VERIFY AT RELEASE). See [the Dark Forest](@dark-forest).",
            "**Light exposure still applies.** The goggles keep the live game's light-dependent exposure rules (TO VERIFY AT RELEASE).",
            "**They don't help in the Astral,** whose grey fog night vision can't cut (TO VERIFY AT RELEASE).",
            "**They are not a win condition.** They get you through the dark; they don't end anything.",
          ] },
          { type: "p", text: "The ritual is not required for the Severance ending, but it gives an advantage in the confrontation; the exact advantage isn't final (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "what-happened-in-the-circle",
        heading: "What happened in the circle",
        spoiler: true,
        blocks: [
          { type: "p", text: "The Warden believed Sister Agnes's rite could be turned from a lullaby into a way to hold the thing under the hill. He walked into the cafeteria at midnight with the whole ward singing, the military's goggles strapped over his eyes so he could see whatever answered him. There was a light, then a scorch on the floor the shape of a man standing, and the singing stopped. His consciousness is trapped inside the intelligence he tried to command, and his goggles stayed in the circle." },
          { type: "p", text: "The ranger reached the circle on Day 80 and couldn't take them: her hand stopped an inch above the floor. She didn't have all four relics, so she went to the tree without night vision. You can finish what she couldn't." },
        ],
      },
    ],
    related: ["the-rite-of-stillness", "the-four-relics", "headlamp", "dark-forest", "relics-and-the-buried-relic"],
    sources: [SRC.v3draft, SRC.controls31],
    aliases: ["nvg", "night vision", "night vision goggles", "warden's goggles", "how to get nvg", "goggles in the circle"],
    gaps: [provisionalGap, "The ritual's advantage for the Severance confrontation is not designed yet."],
  },

  // 9 ─────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "relics-and-the-buried-relic",
    title: "Relics and the Buried Relic",
    seoTitle: "Stillskin Forest V3 Relics: Where the Buried Relic Is",
    description:
      "The four relics in the Stillskin Forest V3 campaign: what stays the same, which relic moves to a buried spot near the ranger trader station, and the fire-map clue.",
    question: "Where is the buried relic in the Stillskin Forest campaign?",
    answer:
      "The four relics of the Rite of Stillness keep their live locations except one, which V3 moves to a buried, off-trail spot near the Ranger Trader Station (TO VERIFY AT RELEASE). The clue is on the ranger's fire map: a small circle with a line through it, drawn in green ink near the trader station. The same symbol is carved on a stump at the dig site (TO VERIFY AT RELEASE).",
    facts: [
      ["Relics", "4"],
      ["Moved", "1, to a buried spot near the Ranger Trader Station (TO VERIFY AT RELEASE)"],
      ["Clue", "The ranger's fire map (TO VERIFY AT RELEASE)"],
      ["Marker", "A circle-and-line symbol carved on a stump (TO VERIFY AT RELEASE)"],
      ["Chapter", "11 (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "what-stays",
        heading: "What stays the same",
        blocks: [
          draft,
          { type: "p", text: "Three relics are where [the four relics](@the-four-relics) page says they are today (TO VERIFY AT RELEASE). Relics are still personal finds: each survivor finds their own, and whatever anyone lays in the cafeteria circle stays there for the squad (TO VERIFY AT RELEASE). The ritual can still be completed once per expedition (TO VERIFY AT RELEASE)." },
          { type: "p", text: "Each relic has more than one clue pointing to it, and the ranger's Day 74 journal at the chapel says she found three of the four places (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "the-buried-relic",
        heading: "Finding the buried relic",
        blocks: [
          { type: "list", ordered: true, items: [
            "Look at the fire map at the ranger station, the same map the old watch log mentions. Her pencil marks the drainage route from Green Lake. Near the trader station, off the trail, there's a small circle with a line through it in green ink, pressed hard enough to tear the paper (TO VERIFY AT RELEASE).",
            "Head for the [Ranger Trader Station](@ranger-trader-station) and look off the trail for a stump carved with the same symbol, with disturbed earth beside it. It is visible from the trail (TO VERIFY AT RELEASE).",
            "Dig up the relic there (TO VERIFY AT RELEASE).",
          ] },
          { type: "callout", tone: "tip", text: "Stuck? After 12 in-game hours the assist note reads: \"Someone marked a spot on the fire map near the trader station. Not me.\" (TO VERIFY AT RELEASE)" },
          { type: "p", text: "The trader station is a safe zone inside its fence, but the dig site is outside it (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "who-marked-the-map",
        heading: "Who marked the map",
        spoiler: true,
        blocks: [
          { type: "p", text: "The green circle is not in the ranger's handwriting, and the same circle-and-line symbol is painted a hundred times on the asylum's day-room wall and carved into a tree at the hunting camp. After the quarantine collapsed, the entity under the hill arranged the trail of real evidence to bring capable survivors to it; moving one relic, and marking where, is part of that arrangement." },
          { type: "p", text: "The relics also explain the link between the entity and the Warden: the rite they belong to was the tool he tried to turn into command, and the circle they are laid in is where it took him." },
        ],
      },
    ],
    related: ["the-four-relics", "the-rite-of-stillness", "ranger-trader-station", "night-vision-and-the-ritual", "main-campaign"],
    sources: [SRC.v3draft],
    aliases: ["buried relic", "relic locations", "fire map", "moved relic", "relic near trader", "relics v3"],
    gaps: [provisionalGap, "The design documents don't say which of the four relics is moved."],
  },

  // 10 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "watchers",
    title: "Watchers in the Campaign",
    seoTitle: "Stillskin Forest Watchers (V3): Forest Sightings vs the Astral",
    description:
      "How the Watchers behave in the Stillskin Forest V3 campaign: staring and vanishing in the forest, and the hostile, interruptible grab in the Astral.",
    question: "What do the Watchers do in the Stillskin Forest campaign?",
    answer:
      "In the forest, a Watcher is a tall, pale, motionless figure that stares and never chases or attacks; it vanishes when struck, shot, touched or lost from view (TO VERIFY AT RELEASE). In the Astral, Watchers are hostile: one can grab a survivor and drain their health, and the grab can be broken with the Freeze Device, by fighting back, or by escaping (TO VERIFY AT RELEASE).",
    facts: [
      ["In the forest", "Stares, never attacks (TO VERIFY AT RELEASE)"],
      ["In the Astral", "Hostile; health-draining grab (TO VERIFY AT RELEASE)"],
      ["First sighting", "Days 2–5, one player (TO VERIFY AT RELEASE)"],
      ["Grab drain", "6 health per second, stops at 15% (TO VERIFY AT RELEASE)"],
      ["Freeze", "10 s (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "overview",
        heading: "Two kinds of encounter",
        blocks: [
          draft,
          { type: "p", text: "The live game's [Watcher](@watcher) is a rare, distant sighting. In the campaign, Watchers are staged: a first sighting, a sighting the whole group shares on [Silent Night](@silent-night-story), and later encounters that escalate (TO VERIFY AT RELEASE). In the forest they only watch. In the Astral they attack." },
          { type: "table", caption: "Forest and Astral Watchers", head: ["", "Forest", "Astral"], rows: [
            ["Behaviour", "Stands motionless and stares (TO VERIFY AT RELEASE)", "Closes in and grabs (TO VERIFY AT RELEASE)"],
            ["Chases?", "Never (TO VERIFY AT RELEASE)", "Yes (TO VERIFY AT RELEASE)"],
            ["Damage", "None (TO VERIFY AT RELEASE)", "Drains the grabbed survivor's health (TO VERIFY AT RELEASE)"],
            ["Goes away when", "Struck, shot, touched or lost from view (TO VERIFY AT RELEASE)", "Frozen, fought off or escaped (TO VERIFY AT RELEASE)"],
          ] },
        ],
      },
      {
        id: "the-first-watcher",
        heading: "The first Watcher (chapter 4)",
        blocks: [
          { type: "list", items: [
            "It happens between Days 2 and 5, to one player who is alone and busy: reading, looting, building or healing (TO VERIFY AT RELEASE).",
            "A few seconds before, a short, unfamiliar musical phrase plays (TO VERIFY AT RELEASE).",
            "When you look up it is already there at the tree line, about 30 to 60 studs away. It doesn't walk in or fade in (TO VERIFY AT RELEASE).",
            "It stares and doesn't move at all. Your controls are never locked: look away, approach, shoot, call a friend, or carry on (TO VERIFY AT RELEASE).",
            "It is gone the moment you lose sight of it or hit it, and it vanishes before a teammate can see it. Only you saw it (TO VERIFY AT RELEASE).",
            "A journal line follows: \"Something was watching you from the trees. When you looked again, it was gone.\" (TO VERIFY AT RELEASE)",
          ] },
          { type: "p", text: "It never happens during a fight, a chase, while you are down or hiding, or inside the trader's safe zone; if one starts, it waits for another moment (TO VERIFY AT RELEASE). The ranger's Day 27 journal at the Lookout Camp describes the same thing: \"Don't chase it. Don't run either. Finish what you were doing.\"" },
        ],
      },
      {
        id: "the-motif",
        heading: "The musical omen",
        blocks: [
          { type: "p", text: "A recurring melody warns you before staged encounters. The first time it is short and unfamiliar, 3 to 6 seconds before the Watcher; the second time longer and recognisable; the third time distorted (TO VERIFY AT RELEASE). The final track isn't chosen yet (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "the-astral-grab",
        heading: "The grab in the Astral",
        blocks: [
          { type: "p", text: "In [the Astral](@the-astral), a Watcher can seize a survivor and drain 6 health a second. A single grab ends by itself at 15% health and leaves the victim staggered, so it is dangerous but never an instant kill (TO VERIFY AT RELEASE). There are three ways out:" },
          { type: "table", caption: "Breaking a grab", head: ["Way out", "Who", "How it works"], rows: [
            ["Freeze", "Anyone with the device, including the victim", "A [Freeze Device](@freeze-device-story) cone that catches the Watcher breaks the grab at once and freezes it for 10 s (TO VERIFY AT RELEASE)"],
            ["Fight back", "The victim or a teammate", "Hits fill a break meter to 6: [fists](@fists) 1, melee 2, charged melee 4, a gun hit 1 (TO VERIFY AT RELEASE)"],
            ["Escape", "The victim", "Mash the interact button: 0.5 per press, up to 8 presses a second (TO VERIFY AT RELEASE)"],
          ] },
          { type: "list", items: [
            "The break meter drains by 1 a second, so keep hitting (TO VERIFY AT RELEASE).",
            "A broken grab sends the Watcher back for 2 seconds and gives the victim 4 seconds without being grabbed (TO VERIFY AT RELEASE).",
            "Teammates never hurt each other, so shoot the Watcher without worrying about your friend (TO VERIFY AT RELEASE).",
          ] },
        ],
      },
      {
        id: "what-they-are",
        heading: "What the Watchers are",
        spoiler: true,
        blocks: [
          { type: "p", text: "The Watchers are the entity's observers, and they have been watching the expedition all along: the ranger's, and then yours. They never speak. On Silent Night they show themselves to the whole crew; later they close in from every side of the tree line, the musical omen distorted, and your crew collapses and wakes in the cave tomb (TO VERIFY AT RELEASE). The ranger's final tape notes that the Watchers were all facing the same way: north-east, past Blackthorn, toward the Nowhere Tree." },
        ],
      },
    ],
    related: ["watcher", "silent-night-story", "the-astral", "freeze-device-story", "fists"],
    sources: [SRC.v3draft],
    aliases: ["watchers", "watcher v3", "tall pale figure", "watcher grab", "astral watchers", "musical omen"],
    gaps: [provisionalGap, "Every Watcher value comes from design notes and is a starting point for tuning. The first sighting is still under human review."],
  },

  // 11 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "silent-night-story",
    title: "Silent Night in the Campaign",
    seoTitle: "Stillskin Forest V3 Silent Night: Lamp-Post Circles and the Watcher",
    description:
      "The scripted first Silent Night of the Stillskin Forest V3 campaign: when it happens, the entranced lamp-post circles, and the Watcher the whole group sees.",
    question: "When is Silent Night in the Stillskin Forest campaign?",
    answer:
      "The campaign's first Silent Night comes between Days 4 and 6. It is triggered by time and by progress (your crew must have had the first Watcher sighting), not by the ritual (TO VERIFY AT RELEASE). The forest goes unnaturally quiet, the infected circle the lamp posts as if entranced, and later a Watcher stands where the whole group can see it. It doesn't chase (TO VERIFY AT RELEASE).",
    facts: [
      ["When", "Days 4–6 (TO VERIFY AT RELEASE)"],
      ["Trigger", "Time and progress; not the ritual (TO VERIFY AT RELEASE)"],
      ["Lamp-post circles", "Entranced infected ignore you (TO VERIFY AT RELEASE)"],
      ["Watcher", "Seen by the whole group; no chase (TO VERIFY AT RELEASE)"],
      ["Later Silent Nights", "Random (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "overview",
        heading: "How it differs from a normal Silent Night",
        blocks: [
          draft,
          { type: "p", text: "The live [Silent Night](@silent-night) is a random special night. In the campaign, the first one is a scripted event, chapter 15, and every later one stays random as it is today (TO VERIFY AT RELEASE)." },
          { type: "table", caption: "Silent Night trigger", head: ["Condition", "Detail"], rows: [
            ["Day", "Day 4, 5 or 6 (TO VERIFY AT RELEASE)"],
            ["Progress", "The first Watcher sighting has happened (TO VERIFY AT RELEASE)"],
            ["Ritual", "Not needed (TO VERIFY AT RELEASE)"],
          ] },
        ],
      },
      {
        id: "the-night",
        heading: "What happens",
        blocks: [
          { type: "list", ordered: true, items: [
            "**Dusk.** The normal dusk banner, then the world's sound thins over about 20 seconds: wind, insects and distant infected fade (TO VERIFY AT RELEASE).",
            "**The lamps.** Infected gather at lamp posts and circle slowly, entranced. They ignore you (TO VERIFY AT RELEASE).",
            "**Chases end.** Anyone being chased sees the chaser turn away and walk to a lamp (TO VERIFY AT RELEASE).",
            "**The Watcher.** Later, a single Watcher stands where the whole group can see it, with the second, longer version of the musical omen. It stares and doesn't chase (TO VERIFY AT RELEASE).",
            "**Dawn.** Sound returns and a line is added to your journal (TO VERIFY AT RELEASE).",
          ] },
          { type: "callout", tone: "warning", text: "Attacking one entranced infected wakes its whole circle (TO VERIFY AT RELEASE). If you want an easy night, leave the lamps alone." },
          { type: "p", text: "If your crew spends the night in a shelter, it still counts and the journal line appears at dawn (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "lamp-post-omens",
        heading: "Lamp-post omens before it",
        blocks: [
          { type: "p", text: "Silent Night has a warning. On Days 1 to 3, you may find one to five infected slowly circling a lamp post, coordinated but not perfectly, ignoring you (TO VERIFY AT RELEASE). They can still be attacked, and attacking one wakes its circle (TO VERIFY AT RELEASE). The whole crew sees them (TO VERIFY AT RELEASE). After the campaign the circles change with your ending: see [after the campaign](@post-campaign-survival)." },
        ],
      },
      {
        id: "what-it-means",
        heading: "What it means",
        spoiler: true,
        blocks: [
          { type: "p", text: "The hum at each lamp is the same wordless tune at the end of Backstreet's recording and on the fire-tower stairs. The journal line spells out the change: \"The tall figure watched all of us this time, not just one.\" The forest is organised, and it is waiting. Once Silent Night and the ranger's final tapes are behind you, the next staged encounter takes your crew to the cave tomb (TO VERIFY AT RELEASE)." },
        ],
      },
    ],
    related: ["silent-night", "watchers", "special-nights-overview", "main-campaign", "post-campaign-survival"],
    sources: [SRC.v3draft],
    aliases: ["silent night", "scripted silent night", "lamp post", "lamp-post circles", "entranced zombies", "omens"],
    gaps: [provisionalGap, "The hum at the lamp posts is silent until a track is approved."],
  },

  // 12 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "dark-forest",
    title: "The Dark Forest",
    seoTitle: "Stillskin Forest Dark Forest (V3): Night Vision and the Way Through",
    description:
      "The Dark Forest in the Stillskin Forest V3 campaign: what to bring, why night-vision goggles are essential, and how to find your way through to the end.",
    question: "How do you get through the Dark Forest in Stillskin Forest?",
    answer:
      "The Dark Forest is chapter 17: near-black forest past the edge of the map, full of whispers (TO VERIFY AT RELEASE). Night-vision goggles from the ritual are essential there, because a lamp lights only about a metre (TO VERIFY AT RELEASE). The way is fair: keep the hill behind you and follow the ranger service's trail markers to the Nowhere Tree (TO VERIFY AT RELEASE).",
    facts: [
      ["Chapter", "17 (TO VERIFY AT RELEASE)"],
      ["Needs", "Night-vision goggles (TO VERIFY AT RELEASE)"],
      ["Lamp range", "About 1 metre (TO VERIFY AT RELEASE)"],
      ["Leads to", "The Nowhere Tree"],
    ],
    sections: [
      {
        id: "before-you-go",
        heading: "Before you go",
        blocks: [
          draft,
          { type: "list", items: [
            "**Night vision.** Complete the ritual to free the Warden's goggles. See [night vision and the ritual](@night-vision-and-the-ritual). Arrive without them and a hint at the forest's edge tells you where to get them (TO VERIFY AT RELEASE).",
            "**The Freeze Device, in your bag.** You'll want it later, and it is one of the three things the third ending needs (TO VERIFY AT RELEASE).",
            "**Healing and ammunition.** There is little to find once you are through.",
          ] },
        ],
      },
      {
        id: "finding-the-way",
        heading: "Finding the way",
        blocks: [
          { type: "list", items: [
            "Silhouettes are very dark and whispers come from both sides; they are atmosphere, not enemies you need to find (TO VERIFY AT RELEASE).",
            "Keep the hill behind you.",
            "Follow the ranger service trail markers. The last one points the final stretch (TO VERIFY AT RELEASE).",
            "Two of the ranger's handheld recorders lie along the way. They're optional (TO VERIFY AT RELEASE).",
            "When the whispers stop, you're at the tree.",
          ] },
          { type: "p", text: "The Dark Forest was built to run well on PS4 (TO VERIFY AT RELEASE). Next: [the Nowhere Tree](@nowhere-tree)." },
        ],
      },
      {
        id: "how-you-get-there",
        heading: "How you get there",
        spoiler: true,
        blocks: [
          { type: "p", text: "You don't walk in by choice. Once the ranger's final tapes and Silent Night are behind you, the Watchers close in on your crew one night and you collapse together; it lasts a few seconds and does no damage (TO VERIFY AT RELEASE). You wake in the cave tomb, beside a page torn from her fire map, with a pencil route north-east into ground she labelled \"dark\" (TO VERIFY AT RELEASE). \"Follow the draught out of here, then keep the hill behind you.\" Members who weren't there rejoin in the tomb (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "her-recordings",
        heading: "What her recordings tell you",
        spoiler: true,
        blocks: [
          { type: "p", text: "Day 101: \"It's darker than night should be. My lamp lights about a metre and then just stops.\" Then she finds a trail marker, one of the ranger service's own, where nobody ever put a trail, and leaves her recorder on it. She walked this way without goggles. The markers were placed for whoever came next, as part of the entity's arrangement of the trail." },
        ],
      },
    ],
    related: ["night-vision-and-the-ritual", "nowhere-tree", "main-campaign", "headlamp", "the-astral"],
    sources: [SRC.v3draft],
    aliases: ["dark forest", "darkforest", "dark ground", "chapter 17", "nvg forest", "way to the tree"],
    gaps: [provisionalGap, "The Dark Forest is still being built; its layout and markers must be checked at release."],
  },

  // 13 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "nowhere-tree",
    spoiler: true,
    title: "The Nowhere Tree",
    seoTitle: "The Nowhere Tree in Stillskin Forest: What It Is and How to Enter",
    description:
      "The Nowhere Tree in the Stillskin Forest V3 campaign: where it stands, what the ranger recorded at its roots, and how your crew agrees to go through.",
    question: "What is the Nowhere Tree in Stillskin Forest?",
    answer:
      "The Nowhere Tree is a vast tree past the end of the map, at the far side of the Dark Forest. A gap in its roots shows grey fog lit like daylight: it is the way into the Astral. Reaching it completes chapter 17, and going through needs every member present to choose \"Go through\" (TO VERIFY AT RELEASE).",
    facts: [
      ["Where", "Past the Dark Forest, beyond the map"],
      ["What it is", "The way into the Astral"],
      ["Chapters", "17–18 (TO VERIFY AT RELEASE)"],
      ["Entering", "Every member present chooses (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "reaching-it",
        heading: "Reaching the tree",
        blocks: [
          draft,
          { type: "p", text: "Follow [the Dark Forest](@dark-forest) markers with the hill behind you. The tree is bigger than anything else in the forest, and the whispers stop when you reach it. One last recording of the ranger's lies at the roots; it's optional (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "going-through",
        heading: "Going through",
        blocks: [
          { type: "p", text: "A prompt at the gap in the roots reads \"Go through\". Everyone present must choose it; nobody is forced, and the session waits (TO VERIFY AT RELEASE)." },
          { type: "p", text: "What's on the other side is a full night of survival with no infected, but hostile Watchers. Before you choose, check:" },
          { type: "list", items: [
            "A member present carries the [Freeze Device](@freeze-device-story); its cooldown doesn't matter (TO VERIFY AT RELEASE).",
            "Healing, ammunition and a melee weapon.",
            "If your crew wants the third choice at the end: the ranger's last tape from the Lookout Camp tent, the Warden's frequency notes and the device. See [the Severance](@ending-the-severance) (TO VERIFY AT RELEASE).",
          ] },
          { type: "p", text: "Next: [the Astral](@the-astral)." },
        ],
      },
      {
        id: "what-happened-here",
        heading: "What happened at the tree",
        spoiler: true,
        blocks: [
          { type: "p", text: "The ranger's Day 98 tape said she would only look. Her last recording is at the roots: \"There's a gap in the roots and through it there's… grey. Like fog in daylight. The whispers stopped. I said I'd only look. I'm going to look.\" Then footsteps on roots, then nothing." },
          { type: "p", text: "She went through and died in the Astral. To the world she simply disappeared; in the current draft her disappearance and her entering the Astral are the same event (TO VERIFY AT RELEASE). The forest, she guessed, had been waiting for someone to walk up to that tree on purpose. It still is." },
        ],
      },
    ],
    related: ["dark-forest", "the-astral", "main-campaign", "tapes-and-recordings", "ending-the-severance"],
    sources: [SRC.v3draft],
    aliases: ["nowhere tree", "the tree", "portal", "astral portal", "chapter 18", "tree roots"],
    gaps: [provisionalGap],
  },

  // 14 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "the-astral",
    spoiler: true,
    title: "The Astral",
    seoTitle: "The Astral in Stillskin Forest: How to Survive the Night (V3)",
    description:
      "The Astral in the Stillskin Forest V3 campaign: grey fog, ruined houses, hostile Watchers, three routes, and how a wipe or a disconnect is handled.",
    question: "How do you survive the Astral in Stillskin Forest?",
    answer:
      "The Astral is a separate grey world through the Nowhere Tree: fog that night vision can't cut, bare trees, sharp dry ground, ruined houses and no infected (TO VERIFY AT RELEASE). Your crew must survive one full night there against hostile Watchers, on one of three routes picked by a saved seed (TO VERIFY AT RELEASE). A full wipe sends everyone back to the cave tomb checkpoint instead of ending the session (TO VERIFY AT RELEASE).",
    facts: [
      ["Chapter", "19 (TO VERIFY AT RELEASE)"],
      ["Goal", "Survive one full night (TO VERIFY AT RELEASE)"],
      ["Enemies", "Hostile Watchers; no infected (TO VERIFY AT RELEASE)"],
      ["Routes", "3, chosen by a saved seed (TO VERIFY AT RELEASE)"],
      ["Full wipe", "Back to the cave tomb checkpoint (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "what-its-like",
        heading: "What it's like",
        blocks: [
          draft,
          { type: "list", items: [
            "Grey fog everywhere. Night-vision goggles don't help (TO VERIFY AT RELEASE).",
            "Bare trees, sharp dry ground and ruined houses (TO VERIFY AT RELEASE).",
            "Very few places to hide (TO VERIFY AT RELEASE).",
            "No infected at all. The silence is total until the Watchers come (TO VERIFY AT RELEASE).",
            "It is a separate place from the forest; your gear, including your Freeze Device, comes with you (TO VERIFY AT RELEASE).",
          ] },
        ],
      },
      {
        id: "the-night",
        heading: "The night, phase by phase",
        blocks: [
          { type: "table", caption: "The Astral night", head: ["Phase", "What happens"], rows: [
            ["Arrival", "You step out of the roots into the grey (TO VERIFY AT RELEASE)"],
            ["The route", "One of three route patterns, fixed for your session by a saved seed (TO VERIFY AT RELEASE)"],
            ["First contact", "A Watcher closes in and grabs (TO VERIFY AT RELEASE)"],
            ["Escalation", "Paced phases with more Watchers; the Freeze Device matters most here (TO VERIFY AT RELEASE)"],
            ["The light", "In the last phase a distant light appears, and you head for it (TO VERIFY AT RELEASE)"],
          ] },
        ],
      },
      {
        id: "surviving",
        heading: "How to survive it",
        blocks: [
          { type: "list", items: [
            "Stay together. A grabbed survivor needs a teammate to freeze or hit the Watcher. See [the Watchers](@watchers).",
            "Don't spend the [Freeze Device](@freeze-device-story) on a Watcher that isn't grabbing anyone unless you must; its cooldown doesn't change in the Astral (TO VERIFY AT RELEASE).",
            "Hit the grabbing Watcher with anything: even [fists](@fists) count toward breaking a grab (TO VERIFY AT RELEASE).",
            "Shoot freely: teammates never hurt each other (TO VERIFY AT RELEASE).",
            "Individual deaths follow the usual rules: [downed and revive](@downed-and-revive), then ghost (TO VERIFY AT RELEASE).",
          ] },
        ],
      },
      {
        id: "wipes-and-leaving",
        heading: "Wipes, leaving and rejoining",
        blocks: [
          { type: "table", caption: "Astral session rules", head: ["Situation", "What happens"], rows: [
            ["Everyone falls", "Everyone wakes at the cave tomb checkpoint and can try again; the session does not end (TO VERIFY AT RELEASE)"],
            ["You leave mid-Astral and teammates are still there", "When you rejoin, you go back into the live Astral with them (TO VERIFY AT RELEASE)"],
            ["You leave and nobody is in the Astral", "When you rejoin, you return to the cave tomb checkpoint (TO VERIFY AT RELEASE)"],
          ] },
          { type: "callout", tone: "note", text: "This is an exception to the forest rule that a team wipe ends the session ([saved sessions](@persistent-expeditions)) (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "on-the-route",
        heading: "What you find on the route",
        spoiler: true,
        blocks: [
          { type: "p", text: "By a ruined house on every route lies the ranger's lantern, cold, its glass cracked. Scratched into the brass with a knife point: \"R.H. — it is not me.\" It is optional for progress and the truest clue in the game (TO VERIFY AT RELEASE)." },
          { type: "p", text: "In the last phase, as the light appears, her lost handheld radio crackles: \"Hello? Is someone there? Oh, thank God. I can see your lights. Come towards the light. It's safe now. I'll wait for you.\" Every real recording of hers starts with a day number or a place. This one doesn't, and it says the one thing her last tape told you never to believe." },
        ],
      },
      {
        id: "what-happened-to-her",
        heading: "What happened to her",
        spoiler: true,
        blocks: [
          { type: "p", text: "The ranger died here, more than a hundred days into her investigation. The entity kept her voice. At dawn, in the light, a figure in her uniform waits for your crew: an imitation that speaks through the radio on its vest and wants you to accept its influence and carry it out of the Astral. What your crew does next is [the ending](@main-campaign)." },
        ],
      },
    ],
    related: ["nowhere-tree", "watchers", "freeze-device-story", "persistent-expeditions", "ending-the-marked", "ending-the-severance"],
    sources: [SRC.v3draft],
    aliases: ["astral", "the astral", "grey world", "astral night", "astral wipe", "cave tomb checkpoint", "astral routes"],
    gaps: [provisionalGap, "The number and pacing of the Astral's phases are from design documents."],
  },

  // 15 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "ending-the-marked",
    spoiler: true,
    title: "Ending: The Marked",
    seoTitle: "Stillskin Forest Ending: The Marked (Follow the Light)",
    description:
      "The Marked, one of three permanent endings in the Stillskin Forest V3 campaign: the choice that leads to it, and how the forest changes for your crew.",
    question: "What happens in the Marked ending of Stillskin Forest?",
    answer:
      "The Marked is the ending your crew gets by voting for \"Follow the light\" at the end of the campaign. You return to the original forest, now under a growing influence: you move faster, your stamina lasts longer, and revives and healing are quicker, but the infected are drawn to you (TO VERIFY AT RELEASE). The ending is permanent for the session (TO VERIFY AT RELEASE).",
    facts: [
      ["Choice", "Follow the light"],
      ["World", "The original forest, under growing influence (TO VERIFY AT RELEASE)"],
      ["Gifts", "Speed, stamina, faster revives and healing (TO VERIFY AT RELEASE)"],
      ["Cost", "The infected are drawn to you (TO VERIFY AT RELEASE)"],
      ["Permanent", "Yes (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "the-vote",
        heading: "How the choice works",
        blocks: [
          draft,
          { type: "list", items: [
            "Everyone present at the end of the Astral votes (TO VERIFY AT RELEASE).",
            "The majority wins. A tie gets one re-vote; a second tie means your crew runs, which gives [the Remains](@ending-the-remains) (TO VERIFY AT RELEASE).",
            "Members who weren't there are bound by the result and see \"Your crew made a choice while you were away\" when they next join (TO VERIFY AT RELEASE).",
            "The button labels never tell you what will happen. This page does, so read it only if you want to know.",
          ] },
        ],
      },
      {
        id: "the-world-after",
        heading: "The world after",
        blocks: [
          { type: "table", caption: "The Marked: gifts and cost", head: ["Effect", "Starting value"], rows: [
            ["Walk and sprint speed", "×1.12 (TO VERIFY AT RELEASE)"],
            ["Stamina", "Drains at ×0.75, recovers at ×1.25 (TO VERIFY AT RELEASE)"],
            ["Revives", "Hold time ×0.7 when the reviver or the downed survivor is Marked (TO VERIFY AT RELEASE)"],
            ["Healing items", "Use time ×0.7, same healing (TO VERIFY AT RELEASE)"],
            ["Infected", "Noticing range toward you ×1.3; they still have to see or hear you (TO VERIFY AT RELEASE)"],
            ["Damage", "No bonus (TO VERIFY AT RELEASE)"],
          ] },
          { type: "list", items: [
            "You wake at the tree in the original forest, in the morning (TO VERIFY AT RELEASE).",
            "Lamp-post circles are tighter (TO VERIFY AT RELEASE).",
            "Dispatch reports \"survivors moving through the reserve faster than anyone should\", and says the lamps are \"busy\" (TO VERIFY AT RELEASE).",
            "A short, unsettling notice tells you about the change once; the game never explains it (TO VERIFY AT RELEASE).",
          ] },
          { type: "p", text: "Compare all three worlds on [after the campaign](@post-campaign-survival)." },
        ],
      },
      {
        id: "what-you-followed",
        heading: "What following the light means",
        spoiler: true,
        blocks: [
          { type: "p", text: "Following the light means accepting the voice. The ranger in the light is an imitation, the real ranger having died in the Astral, and it wanted exactly this: survivors who accept its influence and carry it beyond the Astral. She turns and leads you back through the tree. The gifts are that influence, and the infected drifting toward you are its attention. Your journal says it plainly: \"You came back changed. The forest knows your name now.\"" },
        ],
      },
    ],
    related: ["ending-the-remains", "ending-the-severance", "post-campaign-survival", "stamina-and-sprinting", "main-campaign"],
    sources: [SRC.v3draft],
    aliases: ["marked ending", "the marked", "follow the light", "good ending", "bad ending", "endings"],
    gaps: [provisionalGap, "The tie rule awaits owner confirmation. Gift values are starting points for tuning."],
  },

  // 16 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "ending-the-remains",
    spoiler: true,
    title: "Ending: The Remains",
    seoTitle: "Stillskin Forest Ending: The Remains (Refuse and Run)",
    description:
      "The Remains, one of three permanent endings in the Stillskin Forest V3 campaign: the choice that leads to it, and the burned forest your crew wakes in.",
    question: "What happens in the Remains ending of Stillskin Forest?",
    answer:
      "The Remains is the ending your crew gets by voting for \"Refuse and run\". You wake at Green Lake in a burned, desolate copy of the whole forest: no gifts, scarce resources and no way back (TO VERIFY AT RELEASE). It is also what happens if your crew ties twice in the vote (TO VERIFY AT RELEASE).",
    facts: [
      ["Choice", "Refuse and run"],
      ["World", "A burned copy of the whole forest (TO VERIFY AT RELEASE)"],
      ["Wake at", "Green Lake (TO VERIFY AT RELEASE)"],
      ["Gifts", "None (TO VERIFY AT RELEASE)"],
      ["Permanent", "Yes; exile can't be undone (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "the-choice",
        heading: "How you get it",
        blocks: [
          draft,
          { type: "p", text: "Vote \"Refuse and run\" at the end of the Astral. The same voting rules apply to every ending: see [the Marked](@ending-the-marked). Because a second tie defaults to running, this is the ending a divided crew gets (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "the-world-after",
        heading: "The world after",
        blocks: [
          { type: "list", items: [
            "You run; the fog closes; you wake at [Green Lake](@green-lake) (TO VERIFY AT RELEASE).",
            "The whole forest is a burned, desolate copy, and a separate place from the original (TO VERIFY AT RELEASE).",
            "No gifts and scarce resources (TO VERIFY AT RELEASE).",
            "Lamp posts are unlit, or their circles are broken (TO VERIFY AT RELEASE).",
            "Dispatch breaks up through static: \"…Stillskin… anyone… on this channel…\" (TO VERIFY AT RELEASE)",
            "Your journal: \"You woke at Green Lake in a forest that burned while you were gone. Nothing followed you. Nothing is left.\" (TO VERIFY AT RELEASE)",
          ] },
          { type: "callout", tone: "tip", text: "Treat every item as precious. Ration healing, repair rather than replace, and use the Ranger Trader Station if it is there for you (TO VERIFY AT RELEASE)." },
        ],
      },
      {
        id: "what-you-ran-from",
        heading: "What you ran from",
        spoiler: true,
        blocks: [
          { type: "p", text: "Refusing means turning your back on the light and the figure in it: an imitation of the ranger, who died in the Astral, offering to walk you out. You don't carry the entity's influence out, and nothing follows you. The price is everything else: the forest you come back to has burned, and there is no way home." },
        ],
      },
    ],
    related: ["ending-the-marked", "ending-the-severance", "post-campaign-survival", "green-lake", "main-campaign"],
    sources: [SRC.v3draft],
    aliases: ["remains ending", "the remains", "refuse and run", "burned forest", "exile ending", "endings"],
    gaps: [provisionalGap, "What the burned forest contains (traders, loot tables) is not specified yet."],
  },

  // 17 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "ending-the-severance",
    spoiler: true,
    title: "Ending: The Severance",
    seoTitle: "Stillskin Forest Ending: The Severance and How to Unlock It",
    description:
      "The Severance, the third ending of the Stillskin Forest V3 campaign: what your crew must prepare to unlock the third choice, and the world it leaves behind.",
    question: "How do you get the Severance ending in Stillskin Forest?",
    answer:
      "The Severance is the ending behind the third choice, which appears only for crews who prepared. You need the ranger's last tape from the Lookout Camp tent, the Warden's frequency notes from the locked cabinet in his office, and a member present who carries the Freeze Device (TO VERIFY AT RELEASE). The ritual isn't required but gives an advantage (TO VERIFY AT RELEASE). Afterwards the forest is damaged and quieter, with no curse and no stamina gift (TO VERIFY AT RELEASE).",
    facts: [
      ["Unlocks", "The third choice (TO VERIFY AT RELEASE)"],
      ["Needs", "The ranger's last tape, the Warden's frequency notes, a working Freeze Device (TO VERIFY AT RELEASE)"],
      ["Ritual", "Not required; gives an advantage (TO VERIFY AT RELEASE)"],
      ["World", "Damaged forest, weakened phenomenon (TO VERIFY AT RELEASE)"],
      ["Gifts", "None; no curse (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "requirements",
        heading: "What you need",
        blocks: [
          draft,
          { type: "table", caption: "Severance requirements", head: ["Item", "Where", "How to find it"], rows: [
            ["The ranger's last tape", "Lookout Camp tent, a recorder on the chair (TO VERIFY AT RELEASE)", "Her second final tape at the Ranger Base points there; it is also one of chapter 14's three tapes (TO VERIFY AT RELEASE)"],
            ["The Warden's frequency notes", "The locked cabinet in the Warden's office, asylum top floor, right side (TO VERIFY AT RELEASE)", "The key hangs on the ring by the cafeteria door, tagged \"W.\" (TO VERIFY AT RELEASE)"],
            ["The Freeze Device", "The Lost Camp (TO VERIFY AT RELEASE)", "Carried by a member present at the choice; the cooldown doesn't matter (TO VERIFY AT RELEASE)"],
          ] },
          { type: "list", items: [
            "The tape and the notes count if any member of the session has found them (TO VERIFY AT RELEASE).",
            "If your crew isn't prepared, the third choice simply doesn't appear: there is no greyed-out button to hint at it (TO VERIFY AT RELEASE).",
            "[The ritual](@night-vision-and-the-ritual) isn't required, but it gives your crew an advantage in the confrontation; the exact advantage isn't final (TO VERIFY AT RELEASE).",
          ] },
          { type: "callout", tone: "tip", text: "Collect all three before you go through [the Nowhere Tree](@nowhere-tree). See [the Freeze Device's story](@freeze-device-story) and [the Hunter's Rifle](@hunters-rifle) for the office." },
        ],
      },
      {
        id: "the-world-after",
        heading: "The world after",
        blocks: [
          { type: "list", items: [
            "You wake in a damaged, quieter forest. The phenomenon is weakened, but it may still exist (TO VERIFY AT RELEASE).",
            "No curse and no stamina gift (TO VERIFY AT RELEASE).",
            "Lamp-post circles are rare and incomplete (TO VERIFY AT RELEASE).",
            "Dispatch: \"Readings are down across the reserve. It's quiet out there. Too early to call it over. Start a new investigation when you're ready.\" (TO VERIFY AT RELEASE)",
            "New investigations open (TO VERIFY AT RELEASE).",
          ] },
          { type: "p", text: "Compare all three worlds on [after the campaign](@post-campaign-survival). The voting rules are the same as for every ending: see [the Marked](@ending-the-marked)." },
        ],
      },
      {
        id: "the-third-choice",
        heading: "The third choice and the confrontation",
        spoiler: true,
        blocks: [
          { type: "p", text: "The third button reads **\"Destroy the false ranger\"**. Only crews who found the evidence ever see it, and by then they know what it means: the ranger died in the Astral, and the figure in the light is the entity wearing her voice and shape." },
          { type: "list", items: [
            "**Her tape** told you it learns voices and that she would never tell you it's safe.",
            "**The Warden's notes** showed the frequency can be interrupted by the green light, and that \"any voice that has spoken near it can be spoken again\".",
            "**The Freeze Device** is that green light. In the confrontation it cuts the radio voice off mid-word, and for those seconds the figure stands silent and wrong. Then it goes still and the radio dies with a click (TO VERIFY AT RELEASE).",
          ] },
          { type: "p", text: "The rest of the confrontation is still being designed; the ritual's advantage, such as a longer window to act, applies here (TO VERIFY AT RELEASE). The journal afterwards: \"She's gone, and so is the voice that wore her. Something may still be under the hill. Not today.\"" },
        ],
      },
    ],
    related: ["ending-the-marked", "ending-the-remains", "freeze-device-story", "post-campaign-survival", "nowhere-tree"],
    sources: [SRC.v3draft],
    aliases: ["severance ending", "the severance", "severed", "third ending", "secret ending", "true ending", "endings", "how to unlock severance"],
    gaps: [provisionalGap, "The confrontation is not designed yet. Whether a document found by any member counts for the whole crew awaits confirmation."],
  },

  // 18 ────────────────────────────────────────────────────────────────────
  {
    ...base,
    slug: "post-campaign-survival",
    title: "After the Campaign",
    seoTitle: "Stillskin Forest After the Ending: Post-Campaign Survival (V3)",
    description:
      "What happens after the Stillskin Forest V3 campaign ends: the world after each ending, lamp-post omen variants, and the dispatch radio broadcasts.",
    question: "What happens after you finish the Stillskin Forest campaign?",
    answer:
      "The campaign doesn't end with a victory screen or a reset: the session carries on in a world shaped by your crew's choice (TO VERIFY AT RELEASE). The Marked keep the original forest under a growing influence, the Remains live in a burned copy, and the Severance leaves a damaged, quieter forest. Lamp-post omens change with each ending, and a dispatch broadcast plays the first time you return (TO VERIFY AT RELEASE).",
    facts: [
      ["Victory screen", "None (TO VERIFY AT RELEASE)"],
      ["Reset", "None; the session carries on (TO VERIFY AT RELEASE)"],
      ["Worlds", "3, one per ending (TO VERIFY AT RELEASE)"],
      ["Dispatch broadcast", "Once, on your first return (TO VERIFY AT RELEASE)"],
    ],
    sections: [
      {
        id: "the-three-worlds",
        heading: "The three worlds",
        blocks: [
          draft,
          { type: "table", caption: "After each ending", head: ["", "The Marked", "The Remains", "The Severance"], rows: [
            ["Choice", "Follow the light", "Refuse and run", "The third choice"],
            ["World", "The original forest, under growing influence (TO VERIFY AT RELEASE)", "A burned, desolate copy of the whole forest (TO VERIFY AT RELEASE)", "A damaged forest; the phenomenon weakened (TO VERIFY AT RELEASE)"],
            ["You wake", "At the tree, in the morning (TO VERIFY AT RELEASE)", "At Green Lake (TO VERIFY AT RELEASE)", "In the damaged forest (TO VERIFY AT RELEASE)"],
            ["Gifts", "Speed, stamina, faster revives and healing (TO VERIFY AT RELEASE)", "None (TO VERIFY AT RELEASE)", "None, and no curse (TO VERIFY AT RELEASE)"],
            ["Cost", "The infected are drawn to you (TO VERIFY AT RELEASE)", "Scarce resources, permanent exile (TO VERIFY AT RELEASE)", "The entity may still exist (TO VERIFY AT RELEASE)"],
            ["Lamp posts", "Tighter circles (TO VERIFY AT RELEASE)", "Unlit posts, broken circles (TO VERIFY AT RELEASE)", "Rare, incomplete circles (TO VERIFY AT RELEASE)"],
          ] },
          { type: "p", text: "Details: [the Marked](@ending-the-marked), [the Remains](@ending-the-remains), [the Severance](@ending-the-severance)." },
        ],
      },
      {
        id: "dispatch",
        heading: "The dispatch broadcasts",
        blocks: [
          { type: "p", text: "The first time your crew returns to the forest after the ending, the base or camp radio plays one short broadcast (TO VERIFY AT RELEASE):" },
          { type: "list", items: [
            "**The Marked:** dispatch warns of reports of survivors \"moving through the reserve faster than anyone should\", and that the lamps are busy.",
            "**The Remains:** static, and a faint voice breaking up: \"…Stillskin… anyone… on this channel…\"",
            "**The Severance:** \"Readings are down across the reserve. It's quiet out there. Too early to call it over. Start a new investigation when you're ready.\"",
          ] },
        ],
      },
      {
        id: "keeping-going",
        heading: "Keeping going",
        blocks: [
          { type: "list", items: [
            "The ending is permanent for the session; it can't be replayed or changed there (TO VERIFY AT RELEASE).",
            "Survival carries on as before: day and night, special nights, scavenging and trading (TO VERIFY AT RELEASE).",
            "Silent Nights after the first stay random (TO VERIFY AT RELEASE).",
            "A team wipe in the forest still ends the session (TO VERIFY AT RELEASE). See [saved sessions](@persistent-expeditions).",
            "To see another ending, start a new session (TO VERIFY AT RELEASE).",
          ] },
        ],
      },
      {
        id: "journal-lines",
        heading: "Journal lines after each ending",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "**The Marked:** \"You came back changed. The forest knows your name now.\"",
            "**The Remains:** \"You woke at Green Lake in a forest that burned while you were gone. Nothing followed you. Nothing is left.\"",
            "**The Severance:** \"She's gone, and so is the voice that wore her. Something may still be under the hill. Not today.\"",
          ] },
          { type: "p", text: "Only the Severance cuts off the imitation that wore the ranger's voice. The Marked carry its influence out with them; the Remains escape it at the cost of their world." },
        ],
      },
    ],
    related: ["ending-the-marked", "ending-the-remains", "ending-the-severance", "silent-night-story", "persistent-expeditions"],
    sources: [SRC.v3draft],
    aliases: ["after the ending", "post game", "endgame", "post campaign", "dispatch radio", "lamp post variants", "new game plus"],
    gaps: [provisionalGap, "Post-campaign objectives for each world are not written yet."],
  },
];
