import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "quests", verification: "verified_live", lastVerified: VERIFIED } as const;

export const quests: WikiEntry[] = [
  {
    ...base,
    slug: "blackthorn-admission-ledger",
    lastVerified: "2026-10-31",
    title: "Unlocking Blackthorn Asylum: The Admission Ledger",
    seoTitle: "How to Unlock Blackthorn Asylum in Stillskin Forest (Ledger Walkthrough)",
    description:
      "Step-by-step: how to unlock Blackthorn Asylum in Stillskin Forest. Read the note on the barricade, follow its riddle to the park gazebo, and read the ledger.",
    question: "How do you unlock Blackthorn Asylum in Stillskin Forest?",
    answer:
      "Read the note \"Nailed to the Barricade\" at the ROAD CLOSED barricade on the road out of Stillwater. Its riddle points to the gazebo in Memorial Park. Find the Blackthorn Admission Ledger under a loose board there and read it: the asylum unlocks for your whole team for the rest of the run.",
    sections: [
      {
        id: "steps",
        heading: "Walkthrough",
        spoiler: true,
        blocks: [
          { type: "list", ordered: true, items: [
            "In [Stillwater](@stillwater), follow Birch Lane to where it becomes Blackthorn Hill Road. The ROAD CLOSED barricade has been shoved onto the verge.",
            "Read the note nailed to it: \"Nailed to the Barricade\". It is a riddle: the book that signed the patients in waits \"where the band played on Sundays\", under the boards.",
            "Go to the gazebo in [Memorial Park](@memorial-park) in Stillwater.",
            "Find the Blackthorn Admission Ledger, a readable note poking out from under a loose board, and read it.",
            "The asylum doors swing open and the chains drop for every player in your run, with the banner \"Chains fall on Blackthorn Hill\".",
          ] },
          { type: "callout", tone: "warning", text: "The first time anyone steps onto the asylum grounds after this, 19 residents wake, including a Screamer and a Brute. Go together. See [Blackthorn Asylum](@blackthorn-asylum)." },
        ],
      },
      {
        id: "next",
        heading: "What's next",
        blocks: [
          { type: "p", text: "Inside are the [Freeze Device](@freeze-device) and one of [the four relics](@the-four-relics). Collect all four for [the Rite of Stillness](@the-rite-of-stillness)." },
        ],
      },
    ],
    related: ["blackthorn-asylum", "memorial-park", "the-four-relics", "the-rite-of-stillness"],
    sources: [SRC.world, SRC.notes30],
    aliases: ["ledger", "admission ledger", "unlock asylum", "riddle", "barricade note", "asylum investigation"],
  },
  {
    ...base,
    slug: "the-rite-of-stillness",
    lastVerified: "2026-10-30",
    title: "The Rite of Stillness: Ritual Walkthrough",
    seoTitle: "Stillskin Forest Ritual Walkthrough: The Rite of Stillness",
    description:
      "How to complete the ritual in Stillskin Forest: lay the four relics at the cafeteria circle in Blackthorn Asylum and hold it for 50 seconds against the waves.",
    question: "How do you do the ritual in Stillskin Forest?",
    answer:
      "Each survivor finds their own relics. At the ritual circle in Blackthorn Asylum's cafeteria, hold E / Square on \"Place Relics\" to lay the ones you carry; the circle keeps what the whole squad has laid. With all four in place, hold \"Begin Ritual\". Then hold the cafeteria for 50 seconds while the candles light and waves of infected arrive, with a Brute at the halfway point. If the circle is left empty for 6 seconds it breaks, and you can start again. Finish it and every infected drops: you win, \"THE HOLLOW SLEEPS\", and the run keeps going until the last survivor falls.",
    facts: [["Requires", "All 4 relics"], ["Where", "Blackthorn Asylum cafeteria"], ["Hold time", "50 s"], ["Breaks if empty for", "6 s"], ["Reward", "Victory: The Hollow Sleeps"]],
    sections: [
      {
        id: "preparation",
        heading: "Preparation",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "Collect [the four relics](@the-four-relics). Each survivor has their own: when you take one it disappears for you (once you walk away), and your teammates still find theirs. One survivor can carry all four, or the squad can split them up: whatever any of you lays in the circle stays there.",
            "Bring ammunition and healing. A [Shotgun](@shotgun) is ideal for the Brute.",
            "If you have the [Freeze Device](@freeze-device), save it for the defence: one shot into the doorway freezes a whole wave.",
            "Clear the cafeteria and close nearby [doors](@doors-and-building) first; consider nailing planks across entrances.",
          ] },
        ],
      },
      {
        id: "the-defence",
        heading: "The defence",
        spoiler: true,
        blocks: [
          { type: "p", text: "Lay your relics with \"Place Relics\", then hold \"Begin Ritual\" once all four are in. The rite can only be completed once per run: afterwards the circle stays closed and the objective moves on." },
          { type: "p", text: "When it starts, the candles light one by one over 50 seconds while waves arrive; a Brute comes at the halfway point. Someone must stay in the cafeteria: if it is empty for 6 seconds the circle breaks. One player holding it is enough; teammates can leave." },
        ],
      },
      {
        id: "the-ending",
        heading: "The ending",
        spoiler: true,
        blocks: [
          { type: "p", text: "Every infected drops and \"YOU WON · THE HOLLOW SLEEPS\" appears. The win and its Embers are yours straight away, but the run doesn't end: it carries on, harder (see [After you win](@how-to-play)). The words \"for now\" are deliberate: the other ending is below, in [the Heart of Stillskin](@the-heart-of-stillskin)." },
          { type: "p", text: "**The reward.** As the last candle burns down a low swell rises, the centre of the circle starts to glow and green motes drift in along the floor. A pair of [night-vision goggles](@headlamp) rises slowly out of the ground and hangs there, turning. Walk up and press E (Square) to claim yours: each survivor gets their own pair, once per ritual, with a RITUAL COMPLETE · NIGHT VISION UNLOCKED card, and the HUD lamp indicator turns into NVG. Nobody is held in a cutscene; you can move the whole time." },
        ],
      },
    ],
    related: ["the-four-relics", "blackthorn-asylum", "the-heart-of-stillskin", "brute"],
    sources: [SRC.playtest],
    aliases: ["ritual", "rite", "ritual defense", "ritual preparation", "hollow sleeps", "ending"],
  },
  {
    ...base,
    slug: "descent-into-the-hollow",
    lastVerified: "2026-10-31",
    title: "Descent into the Hollow",
    seoTitle: "Stillskin Forest Hollow Walkthrough: Bridge, Plates and Root Gate",
    description:
      "How to get through the Hollow in Stillskin Forest: the boulder, the Weeping Gallery bridge and pressure plates, and the two-lever Root Gate, solo or co-op.",
    question: "How do you get through the Hollow in Stillskin Forest?",
    answer:
      "Once anyone takes the Miner's Lantern from the crypt cave, the boulder moves. In the Weeping Gallery, the bridge over the chasm rises only while a living player or the pushable stone stands on a pressure plate; solo players push the stone onto the plate. At the Root Gate, pull both levers (about 40 studs apart) within 6 seconds of each other.",
    sections: [
      {
        id: "the-boulder",
        heading: "1. The boulder",
        spoiler: true,
        blocks: [
          { type: "p", text: "In [the crypt cave](@crypt-cave), take [the Miner's Lantern](@miners-lantern). The boulder grinds aside, for the whole squad, next to green words on the wall: \"THE LIGHT OPENS THE WAY\"." },
        ],
      },
      {
        id: "the-weeping-gallery",
        heading: "2. The Weeping Gallery",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "There is a pressure plate on each side of the chasm. The bridge rises out of the pit while a living player, or the pushable stone, is on a plate.",
            "**In co-op:** one player stands on the plate while the others cross.",
            "**Solo:** push the stone onto the plate (walk into it). \"Hollis' Last Words\", found here, says so.",
            "The bridge stays up for 3 seconds after the plate is released.",
            "If you fall in, a ladder gets you back out.",
          ] },
        ],
      },
      {
        id: "the-root-gate",
        heading: "3. The Root Gate",
        spoiler: true,
        blocks: [
          { type: "p", text: "Two levers sit in alcoves about 40 studs apart, under the words \"TWO HANDS AT ONCE\". Pull both within 6 seconds of each other; after the first, a banner counts you in. It is easy with two players and a sprint for one." },
        ],
      },
      {
        id: "next",
        heading: "What's next",
        spoiler: true,
        blocks: [
          { type: "p", text: "Beyond the gate is [the Heart of Stillskin](@the-heart-of-stillskin)." },
        ],
      },
    ],
    related: ["the-heart-of-stillskin", "the-hollow", "crypt-cave", "e-hollis"],
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["hollow walkthrough", "bridge puzzle", "pressure plate", "levers", "root gate", "cooperative cave"],
    gaps: ["The full descent has been verified solo; a two-player run of the cave has not been recorded yet."],
  },
  {
    ...base,
    slug: "the-heart-of-stillskin",
    lastVerified: "2026-10-31",
    title: "The Heart of Stillskin",
    seoTitle: "How to Beat the Heart of Stillskin (True Ending Walkthrough)",
    description:
      "How to destroy the Heart of Stillskin: survive the guardian waves, sever all three veins (hold E for 3 s each), then get out before the Hollow caves in.",
    question: "How do you get the true ending in Stillskin Forest?",
    answer:
      "Reach the Heart's cavern beyond the Root Gate. Entering wakes the Heart and starts waves of guardians every 7 seconds, with every fourth wave made of Brutes. Sever its three veins by holding E (Square on PlayStation) for three seconds on each. When the third vein is cut the Heart dies and every infected drops. Then the Hollow caves in: get out within 75 seconds. If anyone is still alive, you win: \"OUT ALIVE\".",
    facts: [["Veins", "3"], ["Sever", "Hold E for 3 s each"], ["Waves", "Every 7 s: 3, then 4, then 5 at most"], ["Every 4th wave", "Brutes"], ["Max guardians alive", "14"], ["Escape time", "75 s"]],
    sections: [
      {
        id: "the-fight",
        heading: "The fight",
        spoiler: true,
        blocks: [
          { type: "list", items: [
            "The Heart pulses red when it wakes. A wave comes every 7 seconds: 3 guardians, then 4, then 5 a wave from then on, with never more than 14 alive. Most are Walkers, some Runners, and every fourth wave is Brutes.",
            "Waves only spawn while someone is in the cavern.",
            "A VEINS counter shows your progress.",
            "Severing takes a three-second hold. Have teammates cover whoever is cutting.",
          ] },
        ],
      },
      {
        id: "the-ending",
        heading: "The ending",
        spoiler: true,
        blocks: [
          { type: "p", text: "Every infected drops and a banner reads \"The Heart is dead\": Stillskin will never wake again. This is the alternative to [the Rite of Stillness](@the-rite-of-stillness), which only puts the Hollow to sleep." },
          { type: "p", text: "**Get out.** A few seconds later the Hollow starts to cave in. Anyone inside has 75 seconds, shown on a GET OUT countdown, to get back past the boulder while the ground shakes and rocks fall (each hit hurts). Anyone still inside when it comes down is buried. If anyone is still alive, the run is won: \"OUT ALIVE\". The win is paid at once and the run keeps going." },
        ],
      },
    ],
    related: ["descent-into-the-hollow", "the-rite-of-stillness", "the-hollow-lore", "brute"],
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["heart", "true ending", "final boss", "veins", "heart confrontation"],
  },
];
