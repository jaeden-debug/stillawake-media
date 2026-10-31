import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "enemies", verification: "verified_live", lastVerified: VERIFIED } as const;

const configNote = {
  type: "callout",
  tone: "note",
  text: "Numbers come from the game's enemy configuration. Long real-time runs into later days are still being playtested, so the balance may shift.",
} as const;

export const enemies: WikiEntry[] = [
  {
    ...base,
    slug: "enemy-comparison",
    lastVerified: "2026-10-31",
    title: "Stillskin Forest Enemies Compared",
    seoTitle: "Stillskin Forest Enemies: Walker, Runner, Screamer, Brute and Watcher",
    description:
      "Every enemy in Stillskin Forest compared: health, chase speed, damage, attack rate and the first day each appears, plus how to deal with each.",
    question: "What enemies are in Stillskin Forest?",
    answer:
      "There are four kinds of infected (the Walker, the Runner, the Screamer and the Brute) plus the Watcher, which never attacks. Walkers appear from Day 1, Runners and Screamers from Day 2, and Brutes from Day 3, at night only. No infected can outrun a sprinting survivor: the fastest is capped at 21.5 studs per second against your 23.",
    sections: [
      {
        id: "comparison",
        heading: "Side by side",
        blocks: [
          { type: "table", caption: "Infected stats", head: ["Enemy", "Health", "Chase speed", "Damage", "Time between attacks", "First appears", "Spawn weight"], rows: [
            ["[Walker](@walker)", "100", "20", "10", "1.9 s", "Day 1", "70"],
            ["[Runner](@runner)", "60", "21.5", "8", "1.5 s", "Day 2", "20"],
            ["[Screamer](@screamer)", "70", "20.5", "8", "1.9 s", "Day 2", "8"],
            ["[Brute](@brute)", "320", "18.5", "28", "2.6 s", "Day 3, nights only", "6"],
            ["[Watcher](@watcher)", "—", "—", "Never attacks", "—", "Rare sightings", "—"],
            ["[Soldier](@soldier)", "130", "20.5", "11.5", "1.9 s", "Blackpine Airfield only", "—"],
          ] },
          { type: "p", text: "Spawn weight is relative: of every 104 infected the director rolls once all four types are unlocked, about 70 are Walkers. Special nights change the mix; a [Blood Moon](@blood-moon) adds far more Runners and Brutes." },
          { type: "p", text: "How many: up to 28 roam the forest at night, and no more than 40 are ever alive at once across the whole map. Scripted events like the [ritual siege](@the-rite-of-stillness) keep their own numbers. See [Day and night cycle](@day-night-cycle)." },
          configNote,
        ],
      },
      {
        id: "what-they-share",
        heading: "What every infected does",
        blocks: [
          { type: "list", items: [
            "Notices you by sight within its field of view, or within 9 studs from any direction. See [Detection and noise](@detection-and-noise).",
            "Investigates gunshots, alarms and sprinting footsteps.",
            "Searches your last known position after losing you, then goes back to roaming.",
            "Cannot open doors, but bashes a closed one open in eight hits. It can see you through a window and breaks the glass in eight blows too.",
            "At night its eyes glow, a colour per type: Walker green, Runner yellow, Screamer white, Brute red, Soldier amber. You can pick out a pair of eyes across a clearing in the dark.",
            "Rain hides you: in a downpour it notices you at a little over half the usual range. See [Weather](@weather).",
            "Cannot climb onto cars or furniture, and climbs a ladder only if it saw you climb it.",
            "Only two infected may attack one survivor in any 1.6-second window; the rest crowd and wait.",
            "Its swing is a real hand hitting you, and the wind-up slows it so you can read and dodge it.",
          ] },
        ],
      },
    ],
    related: ["walker", "runner", "screamer", "brute", "watcher", "soldier", "detection-and-noise", "weather"],
    sources: [SRC.config, SRC.playtest, SRC.publish31],
    aliases: ["zombies", "monsters", "infected", "enemy list", "all enemies", "zombie types"],
  },
  {
    ...base,
    slug: "walker",
    lastVerified: "2026-10-31",
    title: "Walker",
    seoTitle: "Walker in Stillskin Forest: Stats and How to Survive",
    description:
      "The Walker is Stillskin Forest's most common infected: 100 health, 10 damage, chase speed 20. Behaviour, weaknesses and how to deal with them.",
    question: "What is a Walker in Stillskin Forest?",
    answer:
      "The Walker is the baseline infected and by far the most common. It has 100 health, hits for 10 every 1.9 seconds, and chases at 20 studs per second, so a sprinting survivor slowly pulls away. Four swings of a common bat or three common pistol body shots bring one down.",
    facts: [["Health", "100"], ["Damage", "10"], ["Time between attacks", "1.9 s"], ["Roam speed", "5"], ["Chase speed", "20"], ["First appears", "Day 1"]],
    sections: [
      {
        id: "behaviour",
        heading: "Behaviour",
        blocks: [
          { type: "p", text: "Walkers idle and roam by day and wander a little further at night; they come for you only once they see or hear you. One that sees you moves through suspicion (about a second), raises the alarm, then chases and attacks. In a pack they fan out and close in from the sides rather than queueing behind each other, and they stop at arm's length instead of shoving into you." },
        ],
      },
      {
        id: "how-to-deal-with-them",
        heading: "How to deal with them",
        blocks: [
          { type: "list", items: [
            "One Walker: fight it with melee. Swing, step back, swing.",
            "Two or more: back into a doorway so they come one at a time, or run. You are faster.",
            "Watch for the wind-up. A swinging Walker slows to under half speed, which is your window to step out of reach.",
            "Headshots stagger them; so do melee hits and shotgun blasts.",
          ] },
        ],
      },
    ],
    related: ["runner", "enemy-comparison", "baseball-bat"],
    sources: [SRC.config, SRC.playtest, SRC.notes30],
    aliases: ["zombie", "basic zombie"],
  },
  {
    ...base,
    slug: "runner",
    lastVerified: "2026-10-31",
    title: "Runner",
    seoTitle: "Runner in Stillskin Forest: The Fastest Infected",
    description:
      "The Runner is Stillskin Forest's fastest infected: 60 health, chase speed 21.5, just under your sprint. Stats and how to escape one.",
    question: "Can you outrun a Runner in Stillskin Forest?",
    answer:
      "Barely. A Runner chases at 21.5 studs per second and your sprint is 23, so you gain only 1.5 studs every second, and only while your stamina lasts. Runners are fragile, though: 60 health, so two machete swings or two pistol body shots drop one.",
    facts: [["Health", "60"], ["Damage", "8"], ["Time between attacks", "1.5 s"], ["Roam speed", "7"], ["Chase speed", "21.5"], ["First appears", "Day 2"]],
    sections: [
      {
        id: "behaviour",
        heading: "Behaviour",
        blocks: [
          { type: "p", text: "Lighter and faster than a Walker, and it attacks more often. Runners make up about a fifth of spawns once they unlock on Day 2, and many more on a [Blood Moon](@blood-moon)." },
          configNote,
        ],
      },
      {
        id: "how-to-escape",
        heading: "How to escape one",
        blocks: [
          { type: "list", items: [
            "Don't start a long sprint on low stamina. You need at least 15 to start sprinting. See [Stamina and sprinting](@stamina-and-sprinting).",
            "Break line of sight: while it can see you it never gives up, but about 5 seconds after losing you it starts searching instead.",
            "Climb a ladder it didn't see you use, or turn and fight: it is the easiest infected to kill.",
          ] },
        ],
      },
    ],
    related: ["walker", "stamina-and-sprinting", "enemy-comparison"],
    sources: [SRC.config, SRC.notes30],
    aliases: ["fast zombie", "sprinter"],
  },
  {
    ...base,
    slug: "screamer",
    lastVerified: "2026-10-31",
    title: "Screamer",
    seoTitle: "Screamer in Stillskin Forest: Stop It Before It Calls the Horde",
    description:
      "The Screamer in Stillskin Forest calls the nearest infected from up to 100 studs away. Its stats, why it's a priority target, and how to kill it first.",
    question: "What does the Screamer do in Stillskin Forest?",
    answer:
      "The Screamer's scream calls the nearest six infected from up to 100 studs away, and it keeps calling while it chases you. A normal infected's alert reaches only the nearest four within 45 studs. On its own it is weak (70 health, 8 damage), so kill it first, ideally with a pistol headshot before it reaches you.",
    facts: [["Health", "70"], ["Damage", "8"], ["Time between attacks", "1.9 s"], ["Chase speed", "20.5"], ["Alert radius", "100 studs"], ["Infected called", "Nearest 6"], ["First appears", "Day 2"]],
    sections: [
      {
        id: "behaviour",
        heading: "Behaviour",
        blocks: [
          { type: "p", text: "Any infected that spots you screams before it chases, sending the nearest four within 45 studs to where it saw you. The Screamer's call reaches 100 studs and the nearest six, and it calls again every 16 to 24 seconds while it chases. A Screamer you leave alive turns one fight into several. On a [Silent Night](@silent-night) the screams make no sound, but they still bring others." },
          configNote,
        ],
      },
      {
        id: "how-to-deal-with-it",
        heading: "How to deal with it",
        blocks: [
          { type: "list", items: [
            "Shoot it at range: one headshot, or three body shots from a common pistol (two from a rarer one).",
            "Two machete swings also do it, if you can close the distance quietly.",
            "If it has already screamed, move. Infected are converging on that spot.",
          ] },
        ],
      },
    ],
    related: ["pistol", "detection-and-noise", "enemy-comparison"],
    sources: [SRC.config, SRC.notes30],
    aliases: ["scream zombie", "shrieker"],
  },
  {
    ...base,
    slug: "brute",
    lastVerified: "2026-10-31",
    title: "Brute",
    seoTitle: "Brute in Stillskin Forest: How to Beat the Biggest Infected",
    description:
      "The Brute in Stillskin Forest: 320 health, 28 damage per hit, night-only from Day 3. How much it takes to kill and how to avoid getting hit.",
    question: "How do you kill a Brute in Stillskin Forest?",
    answer:
      "Keep your distance and use guns. A Brute has 320 health and hits for 28, the hardest of any infected, but it is the slowest (chase speed 18.5) and attacks only every 2.6 seconds. It takes about ten body shots from a common pistol, or a single headshot from any gun. It shrugs off most knockback.",
    facts: [["Health", "320"], ["Damage", "28"], ["Time between attacks", "2.6 s"], ["Chase speed", "18.5"], ["Size", "1.35× a Walker"], ["Knockback resistance", "80%"], ["First appears", "Day 3, nights only"]],
    sections: [
      {
        id: "behaviour",
        heading: "Behaviour",
        blocks: [
          { type: "p", text: "In the forest, Brutes only spawn at night, from Day 3 on, and are rare (about 6 in every 104 spawns). They also appear in fixed places: one wakes among the residents of [Blackthorn Asylum](@blackthorn-asylum), one arrives halfway through [the Rite of Stillness](@the-rite-of-stillness), and one joins every fourth guardian wave at [the Heart](@the-heart-of-stillskin)." },
          configNote,
        ],
      },
      {
        id: "how-to-beat-it",
        heading: "How to beat it",
        blocks: [
          { type: "list", items: [
            "You are much faster. Kite it and shoot.",
            "Melee is a poor trade: 13 swings of a common bat, and without armour each of its hits costs you over a quarter of your health.",
            "Crouched takedowns don't work on Brutes.",
            "The [Freeze Device](@freeze-device) holds it for 6 seconds and takes 25% of its health per shot.",
          ] },
        ],
      },
    ],
    related: ["shotgun", "pistol", "enemy-comparison", "freeze-device"],
    sources: [SRC.config, SRC.playtest, SRC.notes30],
    aliases: ["tank", "big zombie", "boss"],
  },
  {
    ...base,
    slug: "watcher",
    lastVerified: "2026-10-31",
    title: "The Watcher",
    seoTitle: "The Watcher in Stillskin Forest: What It Is and What It Does",
    description:
      "The Watcher in Stillskin Forest is a tall figure that appears in the distance, never attacks, and vanishes when stared at or approached.",
    question: "What is the Watcher in Stillskin Forest?",
    answer:
      "The Watcher is a rare, tall figure (about 8 studs) with two glowing eyes that appears 70 to 115 studs away, in view. It never attacks and bullets pass through it. Stare at it for about a second and it vanishes with a flicker of static; it also disappears if you walk within 35 studs, or after 25 seconds.",
    facts: [["Attacks", "Never"], ["Appears at", "70–115 studs"], ["Vanishes", "1.2 s stare, 35 studs, or 25 s"], ["Night chance", "12% per check"], ["Day chance", "1% per check"]],
    sections: [
      {
        id: "sightings",
        heading: "When it appears",
        blocks: [
          { type: "p", text: "Every 30 seconds there is a chance: about 12% on a normal night, 25% on a special night, and 1% by day, with at least 75 seconds between sightings. Each special night also rolls its own chance of a sighting 20 to 70 seconds in; on a [Silent Night](@silent-night) that roll always succeeds. It never appears to a survivor who is being chased or who hid in the last minute." },
        ],
      },
      {
        id: "what-happens",
        heading: "What happens when you look at it",
        blocks: [
          { type: "p", text: "Looking straight at it builds a heartbeat and darkens the edges of your screen. After about 1.2 seconds it vanishes with a static flicker and a camera jolt. Your sightings are counted." },
          { type: "callout", tone: "note", text: "What the Watcher is, and what it wants, is not explained in the current build." },
        ],
      },
    ],
    related: ["enemy-comparison", "heavy-fog", "silent-night"],
    sources: [SRC.config, SRC.playtest, SRC.notes30],
    aliases: ["tall figure", "glowing eyes", "slender"],
  },
];
