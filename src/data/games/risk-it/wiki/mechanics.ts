import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "mechanics", verification: "verified_live", lastVerified: VERIFIED } as const;

export const mechanics: WikiEntry[] = [
  {
    ...base,
    slug: "wipeouts-and-recovery",
    title: "Wipeouts and Recovery",
    seoTitle: "How Fails Work in RISK IT!: Ragdolls, Headlines and Recovery",
    description:
      "What happens when you fail in RISK IT!: the gag that launches you, the ragdoll and chase camera, the headline, and how fast you're back on your feet.",
    question: "What happens when you fail in RISK IT!?",
    answer:
      "A fail launches your character as a ragdoll with that challenge's gag (a trapdoor, a boxing glove, a catapult, a blast, a sweep or a spring). A headline stamps across the screen, the camera chases you, and your trail and burst play. About 2.6 seconds later you're back on your feet next to the pad, facing it, ready to retry.",
    facts: [
      ["Ragdoll time", "2.6 seconds"],
      ["Back at", "Next to the pad, facing it"],
      ["Cost", "Nothing (adds a wipeout)"],
    ],
    media: "risk-it-launch-full-spectrum",
    sections: [
      {
        id: "the-gags",
        heading: "Every challenge's fail",
        blocks: [
          { type: "table", caption: "Fails by challenge", head: ["Challenge", "Fail"], rows: [
            ["THE BUTTON", "Trapdoor, then the pit bounces you out"],
            ["PERFECT STOP", "Spring-loaded boxing glove"],
            ["QUICK DRAW", "The plate catapults you"],
            ["THE SWEEPER", "Swept by an arm, or a fall into the net"],
            ["DOOR NUMBER WHO", "A blast back through the door"],
            ["MELTDOWN", "The floor drops you into the net"],
            ["COPY THAT", "The spring floor launches you straight up"],
            ["LONG SHOT", "Splashdown in the net"],
          ] },
        ],
      },
      {
        id: "safety",
        heading: "You can't get lost",
        blocks: [
          { type: "p", text: "Every launch is aimed back toward the hub, and anyone who ends up in the void is caught and returned. The ragdoll is physics on your own character, so other players see your fail exactly as you do." },
        ],
      },
    ],
    related: ["instant-retry", "titles-and-wipeouts", "fail-trails"],
    sources: [SRC.source, SRC.tests],
    aliases: ["fail", "ragdoll", "launch", "wipeout", "respawn", "die"],
  },
  {
    ...base,
    slug: "instant-retry",
    title: "Instant Retry",
    seoTitle: "Retrying in RISK IT!: How Fast You Can Go Again",
    description:
      "RISK IT! is built for one more go: after a fail you land beside the pad with the RISK IT! prompt up. Exact timings from fail to the next attempt.",
    question: "How fast can you retry a challenge in RISK IT!?",
    answer:
      "Fast. You're back on your feet beside the pad about 2.6 seconds after a fail, facing it, with the RISK IT! prompt already up. One press or tap and the 1.25-second intro starts. After a win you're returned in 1.6 seconds.",
    facts: [
      ["Fail to feet", "2.6 s"],
      ["Win to pad", "1.6 s"],
      ["Intro before a challenge", "1.25 s"],
    ],
    media: "risk-it-mobile-prompt",
    sections: [
      {
        id: "timeline",
        heading: "From fail to next attempt",
        blocks: [
          { type: "list", ordered: true, items: [
            "Fail: the gag fires and you ragdoll for 2.6 seconds.",
            "You're placed beside the pad, facing it, with the prompt showing.",
            "Press E, click the prompt, or tap it on a phone.",
            "A 1.25-second intro frames the challenge, and you're in.",
          ] },
          { type: "p", text: "Each pad takes one player at a time. If someone is on it, the pad dims; walk to another island or wait a few seconds." },
        ],
      },
    ],
    related: ["wipeouts-and-recovery", "how-to-play", "playing-with-friends"],
    sources: [SRC.source, SRC.tests],
    aliases: ["retry", "again", "restart", "replay", "one more"],
  },
  {
    ...base,
    slug: "fairness-and-odds",
    title: "Fairness and Odds",
    seoTitle: "Is RISK IT! Rigged? How Outcomes and Odds Are Decided",
    description:
      "How RISK IT! decides wins and fails: every result is decided on the server, THE BUTTON shows its real odds, and nothing is weighted or for sale.",
    question: "Is RISK IT! rigged?",
    answer:
      "No. Every outcome is decided on Roblox's server from the rules on these pages, not on your device, and nothing changes them per player. THE BUTTON shows the true chance of each press before you make it. The random parts (which door is the trap, when the light turns green, which tiles fall) are fresh every attempt. Nothing for sale changes your odds.",
    facts: [
      ["Decided on", "The server"],
      ["Odds shown", "THE BUTTON: every press"],
      ["Pay-to-win", "None"],
    ],
    sections: [
      {
        id: "what-is-random",
        heading: "What's random, and what's skill",
        blocks: [
          { type: "table", caption: "Randomness by challenge", head: ["Challenge", "Random", "Skill"], rows: [
            ["THE BUTTON", "Each press's drop, at the shown chance", "When to cash out"],
            ["PERFECT STOP", "Where the zone sits", "Timing"],
            ["QUICK DRAW", "The wait and the fake-out", "Reaction"],
            ["THE SWEEPER", "Nothing", "Movement and timing"],
            ["DOOR NUMBER WHO", "Which door is the trap", "Spotting the flicker"],
            ["MELTDOWN", "Which tiles fall (half aimed near you)", "Movement"],
            ["COPY THAT", "The arrow sequence", "Memory"],
            ["LONG SHOT", "Nothing", "Aim and power"],
          ] },
        ],
      },
      {
        id: "timing",
        heading: "Timing and lag",
        blocks: [
          { type: "p", text: "In timing challenges the server judges your press by when you pressed it, with a small, capped allowance for connection delay, so a slow connection doesn't turn a good press into a miss." },
        ],
      },
    ],
    related: ["the-button", "challenges-compared", "guts"],
    sources: [SRC.source, SRC.tests],
    aliases: ["rigged", "fair", "odds", "random", "lag", "pay to win"],
  },
  {
    ...base,
    slug: "playing-with-friends",
    title: "Playing With Friends",
    seoTitle: "Playing RISK IT! With Friends: What Changes in a Full Server",
    description:
      "RISK IT! works solo, and friends make the fails louder. How shared servers work: one player per pad, watching each other's launches, and titles.",
    question: "Can you play RISK IT! with friends?",
    answer:
      "Yes. Join a friend's server and you share the hub and all eight islands. Each pad takes one player at a time, everyone sees everyone else's fails, trails and bursts, and titles show over each player's head. Nothing in the game needs more than one player.",
    facts: [
      ["Needs other players", "No"],
      ["Players per pad", "1"],
      ["See others' fails", "Yes"],
    ],
    sections: [
      {
        id: "shared-server",
        heading: "In a shared server",
        blocks: [
          { type: "list", items: [
            "An occupied pad dims; you can watch from the island while someone plays.",
            "Spectators standing on THE SWEEPER bridge can get pushed by the arms.",
            "GUTS, medals and bests are your own; nothing is shared or lost to other players.",
          ] },
          { type: "callout", tone: "note", text: "Multiplayer has been tested in Studio, not yet on busy live servers with real connection delay." },
        ],
      },
    ],
    related: ["instant-retry", "titles-and-wipeouts", "faq"],
    sources: [SRC.source, SRC.tests],
    aliases: ["friends", "multiplayer", "co-op", "together", "party"],
    gaps: ["Busy live servers and real network lag not yet tested."],
  },
];
