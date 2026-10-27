import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "challenges", verification: "verified_live", lastVerified: VERIFIED } as const;

export const challenges: WikiEntry[] = [
  {
    ...base,
    slug: "the-button",
    title: "THE BUTTON",
    seoTitle: "THE BUTTON in RISK IT!: Odds, Payouts and When to Cash Out",
    description:
      "How THE BUTTON works in RISK IT!: the pot doubles every press, the exact drop chance per press, medal targets, and when cashing out makes sense.",
    question: "How does THE BUTTON work in RISK IT!?",
    answer:
      "THE BUTTON is press-your-luck. The pot starts at 10 GUTS and doubles with every safe press. The first press has a 12% chance of dropping you through a trapdoor, and each press after that adds 8%, shown on the board before you press. Cash out any time to bank the pot. Eight safe presses (a pot of 1,280) is an automatic gold win.",
    facts: [
      ["Starting pot", "10 GUTS"],
      ["Each safe press", "Pot × 2"],
      ["Drop chance", "12% on press 1, +8% per press (max 85%)"],
      ["Max presses", "8 (pot 1,280, automatic win)"],
      ["Medals", "Bronze 40 · Silver 160 · Gold 640"],
      ["Fail", "Trapdoor, then the pit bounces you out"],
    ],
    media: "risk-it-the-button",
    sections: [
      {
        id: "how-it-plays",
        heading: "How it plays",
        blocks: [
          { type: "p", text: "You stand on a stage over a hidden pit, facing a big red button and a pot board. Press **PRESS ×2** (Space) and a drum roll plays while the warning bulbs flash for just over a second. Survive and the pot doubles. **CASH OUT** (Q) appears after your first safe press and banks the pot as your payout." },
          { type: "p", text: "If you sit idle for 12 seconds with a pot, the game banks it for you. Idle before your first press and the floor gets impatient." },
        ],
      },
      {
        id: "odds",
        heading: "The odds, press by press",
        blocks: [
          { type: "table", caption: "THE BUTTON: pot and drop chance by press", head: ["Press", "Pot if safe", "Chance this press drops you", "Chance you're still standing"], rows: [
            ["1", "20", "12%", "88%"],
            ["2", "40", "20%", "70%"],
            ["3", "80", "28%", "51%"],
            ["4", "160", "36%", "32%"],
            ["5", "320", "44%", "18%"],
            ["6", "640", "52%", "9%"],
            ["7", "1,280", "60%", "3.5%"],
            ["8", "1,280 (auto win)", "68%", "1.1%"],
          ] },
          { type: "p", text: "The last column is the chance of surviving every press up to that one, worked out from the first two. The board always shows the next press's chance before you commit." },
        ],
      },
      {
        id: "when-to-cash-out",
        heading: "When to cash out",
        blocks: [
          { type: "list", items: [
            "**For your first win:** one press (88% safe), then cash out 20.",
            "**For bronze (40):** two presses, about a 70% shot.",
            "**For silver (160):** four presses, about 32%.",
            "**For gold (640):** six presses, about 9%. That's what makes it a gold.",
          ] },
          { type: "callout", tone: "note", text: "A drop costs nothing but the pot on the table. There's no penalty beyond a wipeout and a very public bounce." },
        ],
      },
      {
        id: "the-fail",
        heading: "The fail",
        blocks: [
          { type: "p", text: "The trapdoor halves swing open, you fall into the pit, and just under a second later the bounce pad at the bottom fires you back out toward the hub. Headlines include TRAPDOOR'D and FLOOR SAID NO." },
        ],
      },
    ],
    related: ["challenges-compared", "guts", "medals", "fairness-and-odds"],
    sources: [SRC.source, SRC.tests],
    aliases: ["button", "press your luck", "pot", "cash out", "trapdoor", "odds"],
  },
  {
    ...base,
    slug: "perfect-stop",
    title: "PERFECT STOP",
    seoTitle: "PERFECT STOP in RISK IT!: Zone Sizes, Speeds and Perfects",
    description:
      "How PERFECT STOP works in RISK IT!: stop a ping-ponging needle in a shrinking zone over three rounds. Zone widths, needle speeds, perfects and medals.",
    question: "How do you win PERFECT STOP in RISK IT!?",
    answer:
      "Stop the needle inside the green zone in all three rounds. The zone shrinks and the needle speeds up each round. Landing in the gold centre band scores a PERFECT, and perfects decide your medal: one for silver, two or more for gold. Miss once and the board's boxing glove punches you off.",
    facts: [
      ["Rounds", "3"],
      ["Zone width", "24% → 16% → 10% of the bar"],
      ["Needle speed", "0.85 → 1.2 → 1.6 bar-widths per second"],
      ["PERFECT", "Inside the gold band (inner 40% of the zone)"],
      ["Payout", "60 GUTS + 35 per perfect"],
      ["Medals", "Bronze: clear · Silver: 1 perfect · Gold: 2+"],
    ],
    media: "risk-it-perfect-stop",
    sections: [
      {
        id: "how-it-plays",
        heading: "How it plays",
        blocks: [
          { type: "p", text: "A meter on the board in front of you, mirrored on your screen, has a green zone with a gold centre band. A white needle sweeps back and forth across it. Press **STOP** (Space, click or tap anywhere) to freeze it. Each round the zone moves, gets narrower, and the needle gets faster." },
          { type: "table", caption: "PERFECT STOP rounds", head: ["Round", "Zone width", "Needle speed"], rows: [
            ["1", "24%", "0.85 per second"],
            ["2", "16%", "1.2 per second"],
            ["3", "10%", "1.6 per second"],
          ] },
          { type: "p", text: "You have about six seconds per round. Not pressing at all counts as a miss." },
        ],
      },
      {
        id: "tips",
        heading: "Tips",
        blocks: [
          { type: "list", items: [
            "Press slightly before the needle reaches the zone. Your reaction time is part of the shot.",
            "In round 3 the zone is a tenth of the bar and the needle crosses it in under a tenth of a second. Wait for a sweep where you feel the rhythm.",
            "Your press is judged on the server using the moment you pressed, with a small allowance for your connection.",
          ] },
        ],
      },
      {
        id: "the-fail",
        heading: "The fail",
        blocks: [
          { type: "p", text: "A spring-loaded red boxing glove shoots out of the board and punches you back toward the hub. Headlines include BONKED and RIGHT HOOK." },
        ],
      },
    ],
    related: ["challenges-compared", "quick-draw", "medals", "fairness-and-odds"],
    sources: [SRC.source, SRC.tests],
    aliases: ["stop", "needle", "timing", "perfect", "meter"],
  },
  {
    ...base,
    slug: "quick-draw",
    title: "QUICK DRAW",
    seoTitle: "QUICK DRAW in RISK IT!: Reaction Times, Fake-outs and Medals",
    description:
      "How QUICK DRAW works in RISK IT!: wait for green and slam. Wait times, the yellow fake-out, reaction-time medals, payouts and what counts as a flinch.",
    question: "How does QUICK DRAW work in RISK IT!?",
    answer:
      "Wait while the light is red, then press SLAM the instant it turns green. The wait is random, between 1.8 and 4.4 seconds, and more than half of rounds flash yellow first as a fake-out. Pressing early, on yellow, faster than 100 ms or slower than a second launches you. Gold is 260 ms or faster.",
    facts: [
      ["Wait before green", "1.8–4.4 s (random)"],
      ["Yellow fake-out", "55% of rounds"],
      ["Time to react", "1 second after green"],
      ["Payout", "190 − 300 × reaction, between 40 and 150 GUTS"],
      ["Medals", "Bronze: any win · Silver ≤ 340 ms · Gold ≤ 260 ms"],
      ["Fail", "The plate catapults you"],
    ],
    media: "risk-it-quick-draw",
    sections: [
      {
        id: "how-it-plays",
        heading: "How it plays",
        blocks: [
          { type: "p", text: "You stand on a plate facing a three-lamp tower. It's red. At a random moment it turns green: press **SLAM** (Space, click or tap anywhere) as fast as you can. Your reaction time is your score, measured in milliseconds." },
          { type: "p", text: "In 55% of rounds the lamp flashes yellow for about a third of a second first. Yellow is not green." },
        ],
      },
      {
        id: "what-fails",
        heading: "What counts as a fail",
        blocks: [
          { type: "table", caption: "QUICK DRAW fail conditions", head: ["You…", "Headline"], rows: [
            ["Pressed while red", "FLINCHED"],
            ["Pressed on yellow", "IT WAS YELLOW"],
            ["Pressed under 100 ms after green", "LUCKY GUESS? NO."],
            ["Didn't press within a second", "TOO SLOW"],
          ] },
          { type: "p", text: "Under 100 ms is faster than human reaction, so the game treats it as a guess." },
        ],
      },
      {
        id: "payout",
        heading: "Payout",
        blocks: [
          { type: "p", text: "Faster pays more: 190 GUTS minus 300 for every second of reaction time, never below 40 or above 150. A 250 ms reaction pays 115; 200 ms pays 130." },
        ],
      },
    ],
    related: ["challenges-compared", "perfect-stop", "medals", "wipeouts-and-recovery"],
    sources: [SRC.source, SRC.tests],
    aliases: ["reaction", "reflex", "green light", "draw", "slam", "flinch"],
  },
  {
    ...base,
    slug: "the-sweeper",
    title: "THE SWEEPER",
    seoTitle: "THE SWEEPER in RISK IT!: The Arms, Time Limit and Medal Times",
    description:
      "How THE SWEEPER works in RISK IT!: cross a 74-stud bridge past three spinning arms in 16 seconds. Which arms to jump, which to wait for, and medal times.",
    question: "How do you beat THE SWEEPER in RISK IT!?",
    answer:
      "Run the bridge to the FINISH platform in under 16 seconds without getting hit. Two of the three arms are low enough to jump; the middle one is a tall wall you have to time. Touch an arm and it sweeps you off; fall and you bounce off the net below. Gold is 6.5 seconds or faster.",
    facts: [
      ["Bridge", "74 studs, 8 studs wide"],
      ["Time limit", "16 seconds"],
      ["Arms", "Low (jump) · Wall (wait) · Low and faster (jump)"],
      ["Payout", "220 − 12 per second, 60 to 180 GUTS"],
      ["Medals", "Bronze: finish · Silver ≤ 8.5 s · Gold ≤ 6.5 s"],
    ],
    media: "risk-it-the-sweeper",
    sections: [
      {
        id: "the-arms",
        heading: "The three arms",
        blocks: [
          { type: "table", caption: "THE SWEEPER arms", head: ["Arm", "Type", "What to do"], rows: [
            ["First", "Low bar, full width, spins around a centre post", "Jump it. Go around the post on either side"],
            ["Second", "Tall wall, one-sided, pivots beside the bridge", "Can't be jumped. Wait for it to swing past"],
            ["Third", "Low bar, spins faster than the first", "Jump it with tighter timing"],
          ] },
          { type: "p", text: "The arms are real physics objects, so they push anything in their way, including spectators who wander onto the bridge." },
        ],
      },
      {
        id: "the-fail",
        heading: "The fails",
        blocks: [
          { type: "list", items: [
            "**Swept:** touching an arm flings you sideways in the direction it was spinning (SWEPT, CLEAN SWEEP).",
            "**Fall:** dropping off the bridge lands you in a trampoline net far below, which bounces you back up (SPLAT, GRAVITY WINS).",
            "**Timeout:** still on the bridge after 16 seconds.",
          ] },
        ],
      },
      {
        id: "tips",
        heading: "Tips",
        blocks: [
          { type: "list", items: [
            "The panel docks at the top in this challenge so you can see the bridge. Space is your jump here.",
            "Walk speed is 16 for everyone during the run.",
            "For gold, don't stop for the low arms: jump them in stride, and arrive at the wall as it opens.",
          ] },
        ],
      },
    ],
    related: ["challenges-compared", "meltdown", "controls", "wipeouts-and-recovery"],
    sources: [SRC.source, SRC.tests],
    aliases: ["sweeper", "bridge", "arms", "spinner", "obby"],
  },
  {
    ...base,
    slug: "door-number-who",
    title: "DOOR NUMBER WHO",
    seoTitle: "DOOR NUMBER WHO in RISK IT!: The Lamp Tell and How to Win",
    description:
      "How DOOR NUMBER WHO works in RISK IT!: three doors, one trap, three rounds. The flickering-lamp tell, the time limit, payout and medal times.",
    question: "How do you know which door is safe in DOOR NUMBER WHO?",
    answer:
      "Watch the lamps above the doors. In every round, one of the three doors is a trap, and that door's lamp flickers briefly every second or so. The other two stay steady. Walk through a safe door three rounds in a row to win; walk through the trap and it blasts you back out.",
    facts: [
      ["Rounds", "3 (doors reshuffle each round)"],
      ["Doors", "3, one trap per round"],
      ["Time per round", "10 seconds"],
      ["The tell", "The trap door's lamp flickers"],
      ["Payout", "120 GUTS"],
      ["Medals", "Bronze: clear · Silver < 11 s · Gold < 7 s total"],
    ],
    media: "risk-it-door-number-who",
    sections: [
      {
        id: "how-it-plays",
        heading: "How it plays",
        blocks: [
          { type: "p", text: "A wall with three holographic doors, numbered 1 to 3, stands in front of you. Pick one and walk through it. Safe: the curtain turns green, you get a small confetti pop, and you're placed back at the start for the next round with a new trap. Three safe doors wins." },
        ],
      },
      {
        id: "the-tell",
        heading: "The tell",
        blocks: [
          { type: "p", text: "The trap door's lamp dims for a split second at random intervals, roughly every 0.7 to 1.6 seconds, and sometimes double-flickers. Safe doors' lamps never flicker. Without the tell, a blind guess clears all three rounds only 30% of the time; with it, it's a skill." },
          { type: "callout", tone: "tip", text: "Your medal is your total time across the three rounds, so there's a trade-off: watch long enough to be sure, but not longer." },
        ],
      },
      {
        id: "the-fail",
        heading: "The fail",
        blocks: [
          { type: "p", text: "The trap door's curtain turns red and a blast throws you back through the doorway toward the hub (WRONG DOOR, DOOR SAID NO). Running out of time in a round also fails." },
        ],
      },
    ],
    related: ["challenges-compared", "beginner-tips", "medals", "fairness-and-odds"],
    sources: [SRC.source, SRC.tests],
    aliases: ["doors", "door", "trap door", "three doors", "lamp", "which door"],
  },
  {
    ...base,
    slug: "meltdown",
    title: "MELTDOWN",
    seoTitle: "MELTDOWN in RISK IT!: Survive 15 Seconds and Score Close Calls",
    description:
      "How MELTDOWN works in RISK IT!: survive 15 seconds on a 7×7 floor that drops away in growing waves. Warnings, targeting, close calls and medals.",
    question: "How do you survive MELTDOWN in RISK IT!?",
    answer:
      "Keep moving for 15 seconds. Every second a wave of tiles flashes for 0.9 seconds and then drops, and half of each wave targets the tiles around you. Step off a tile less than half a second before it falls and you score a CLOSE CALL. Surviving wins bronze; two close calls earn silver and four earn gold.",
    facts: [
      ["Floor", "7 × 7 tiles, 4 studs each"],
      ["Survive", "15 seconds"],
      ["Warning before a drop", "0.9 seconds"],
      ["Wave size", "1 tile, +1 every 3 seconds"],
      ["Close call", "Leaving a tile ≤ 0.45 s before it drops"],
      ["Payout", "90 GUTS + 25 per close call"],
      ["Medals", "Bronze: survive · Silver: 2 close calls · Gold: 4"],
    ],
    media: "risk-it-meltdown",
    sections: [
      {
        id: "how-it-plays",
        heading: "How it plays",
        blocks: [
          { type: "p", text: "You stand in the middle of a floating grid with no walkway off it. From the first second, tiles start flashing: a warning tile blinks orange and pink for 0.9 seconds, then falls away. Waves grow from one tile to five by the end. Of the 49 tiles, 44 go." },
          { type: "p", text: "Half of every wave is picked from the tiles right around you, so standing still is the quickest way down." },
        ],
      },
      {
        id: "close-calls",
        heading: "Close calls",
        blocks: [
          { type: "p", text: "If a tile drops less than 0.45 seconds after you stepped off it, the screen flashes CLOSE CALL! and you score one. Close calls are worth 25 GUTS each and decide the silver and gold medals, so the best runs dance on warning tiles until the last moment." },
        ],
      },
      {
        id: "the-fail",
        heading: "The fail",
        blocks: [
          { type: "p", text: "Fall through and you drop to a trampoline net far below, which bounces you back up before you're returned to the pad (MELTED)." },
        ],
      },
    ],
    related: ["challenges-compared", "the-sweeper", "medals", "playing-on-phone-and-tablet"],
    sources: [SRC.source, SRC.tests],
    aliases: ["meltdown", "falling floor", "floor is lava", "tiles", "survive"],
  },
  {
    ...base,
    slug: "copy-that",
    title: "COPY THAT",
    seoTitle: "COPY THAT in RISK IT!: Arrow Memory, Payouts and When to Bank",
    description:
      "How COPY THAT works in RISK IT!: repeat arrow sequences that grow by one each round, then bank or go again. Payouts per length, timings and medals.",
    question: "How does COPY THAT work in RISK IT!?",
    answer:
      "Watch a sequence of arrows light up, then repeat it with the arrow keys, WASD, the D-pad or the on-screen arrows. It starts at three arrows. After each clean repeat you can BANK the payout or GO AGAIN with one more arrow for more GUTS. One wrong arrow, or freezing for four seconds, and the spring floor fires you skyward.",
    facts: [
      ["Starting length", "3 arrows"],
      ["Maximum", "10 arrows"],
      ["Time per arrow", "4 seconds"],
      ["Payout by length", "3: 48 · 4: 69 · 5: 93 · 6: 120 · 8: 181 · 10: 253"],
      ["Medals", "Bronze 4 · Silver 6 · Gold 8 arrows"],
      ["Fail", "The spring pad launches you straight up"],
    ],
    media: "risk-it-copy-that",
    sections: [
      {
        id: "how-it-plays",
        heading: "How it plays",
        blocks: [
          { type: "p", text: "A board with four arrows faces you. During WATCH, arrows light up one at a time (also shown on your panel, with progress dots). During YOUR TURN, repeat them. Each arrow you get right flashes green." },
          { type: "p", text: "Arrows show for half a second at three arrows, getting quicker as the sequence grows (down to about a quarter of a second)." },
        ],
      },
      {
        id: "bank-or-go-again",
        heading: "Bank or go again",
        blocks: [
          { type: "p", text: "After each clean repeat the panel offers **BANK** (Q) and **GO AGAIN** (Space). The payout grows faster than the length, which is the temptation:" },
          { type: "table", caption: "COPY THAT payout by sequence length", head: ["Arrows", "Payout"], rows: [
            ["3", "48"], ["4", "69"], ["5", "93"], ["6", "120"], ["7", "149"], ["8", "181"], ["9", "216"], ["10", "253"],
          ] },
          { type: "p", text: "If you don't choose within 8 seconds, the game banks for you. Reaching 10 arrows ends the run as a win." },
        ],
      },
      {
        id: "the-fail",
        heading: "The fail",
        blocks: [
          { type: "p", text: "The correct arrow lights red and the spring pad under you fires you almost straight up (MEMORY: DELETED, COPY... NOT THAT). Freezing for four seconds counts too (BRAIN.EXE STOPPED)." },
        ],
      },
    ],
    related: ["challenges-compared", "controls", "medals", "guts"],
    sources: [SRC.source, SRC.tests],
    aliases: ["copy", "simon", "memory", "arrows", "sequence"],
  },
  {
    ...base,
    slug: "long-shot",
    title: "LONG SHOT",
    seoTitle: "LONG SHOT in RISK IT!: Rings, Bullseyes and Aiming the Cannon",
    description:
      "How LONG SHOT works in RISK IT!: lock the aim, lock the power, and get fired from a cannon at rings worth 100, 250 or 500. Bullseyes double the score.",
    question: "How do you play LONG SHOT in RISK IT!?",
    answer:
      "Lock the swinging aim, then lock the power, and the cannon fires you along that exact arc. Land inside a ring to win: the near ring is worth 100 points, the middle 250 and the far one 500, and landing within 3 studs of a ring's centre is a bullseye worth double. Miss and you splash down in the net.",
    facts: [
      ["Rings", "100 (near) · 250 (middle) · 500 (far)"],
      ["Bullseye", "Within 3 studs of centre: double points"],
      ["Aim range", "±30°"],
      ["Payout", "40 GUTS + 30% of your points"],
      ["Medals", "Bronze 100 · Silver 250 · Gold 500 points"],
    ],
    media: "risk-it-long-shot-aim",
    sections: [
      {
        id: "how-it-plays",
        heading: "How it plays",
        blocks: [
          { type: "p", text: "You stand by a cannon at the island's edge, with three target rings floating out over the void. Step one: an aim needle swings left and right; press **LOCK AIM**. Step two: a power needle sweeps; press **FIRE!**. You're placed in the muzzle and launched." },
          { type: "p", text: "Both meters have pink tick marks labelled with each ring's points, showing exactly where that ring is in aim and power. Line both needles up on the same ring's ticks." },
        ],
      },
      {
        id: "scoring",
        heading: "Scoring",
        blocks: [
          { type: "table", caption: "LONG SHOT rings", head: ["Ring", "Distance", "Points", "Bullseye"], rows: [
            ["Near", "52 studs", "100", "200"],
            ["Middle", "80 studs", "250", "500"],
            ["Far", "108 studs", "500", "1,000"],
          ] },
          { type: "p", text: "A bullseye on the middle ring (500 points) already earns gold. The landing point is calculated exactly on the server the moment you fire, and your flight follows that arc." },
        ],
      },
      {
        id: "wins-fly-too",
        heading: "Wins fly too",
        blocks: [
          { type: "p", text: "LONG SHOT is the one challenge where winning also sends you flying. On a hit you stick the landing on the ring, the confetti goes off, and then you're returned to the pad. A miss lands you in the net far below (MISSED, SPLASHDOWN, AIR BALL)." },
        ],
      },
    ],
    related: ["challenges-compared", "fail-trails", "medals", "fairness-and-odds"],
    sources: [SRC.source, SRC.tests],
    aliases: ["cannon", "long shot", "rings", "bullseye", "aim", "launch"],
  },
  {
    ...base,
    slug: "challenges-compared",
    title: "All RISK IT! Challenges Compared",
    seoTitle: "All 8 RISK IT! Challenges Compared: Skills, Payouts and Medals",
    description:
      "Every RISK IT! challenge side by side: what skill it tests, how long it takes, how it fails, what it pays and the target for each medal.",
    question: "Which RISK IT! challenge should I play?",
    answer:
      "Each of the eight challenges tests a different skill: luck (THE BUTTON), timing (PERFECT STOP), reaction (QUICK DRAW), movement (THE SWEEPER), observation (DOOR NUMBER WHO), survival (MELTDOWN), memory (COPY THAT) and aim (LONG SHOT). New players usually start with THE BUTTON; QUICK DRAW and PERFECT STOP reward practice most.",
    media: "risk-it-arena-aerial",
    sections: [
      {
        id: "at-a-glance",
        heading: "At a glance",
        blocks: [
          { type: "table", caption: "RISK IT! challenges compared", head: ["Challenge", "Skill", "Fail", "Pays (GUTS)", "Gold medal"], rows: [
            ["[THE BUTTON](@the-button)", "Press your luck", "Trapdoor", "The pot (20–1,280)", "Pot of 640"],
            ["[PERFECT STOP](@perfect-stop)", "Timing", "Boxing glove", "60–165", "2 perfects"],
            ["[QUICK DRAW](@quick-draw)", "Reaction", "Catapult", "40–150", "≤ 260 ms"],
            ["[THE SWEEPER](@the-sweeper)", "Movement", "Swept / net", "60–180", "≤ 6.5 s"],
            ["[DOOR NUMBER WHO](@door-number-who)", "Observation", "Blast", "120", "< 7 s total"],
            ["[MELTDOWN](@meltdown)", "Survival", "Fall / net", "90 + 25 per close call", "4 close calls"],
            ["[COPY THAT](@copy-that)", "Memory", "Spring launch", "48–253", "8 arrows"],
            ["[LONG SHOT](@long-shot)", "Aim", "Splashdown", "70–340", "500 points"],
          ] },
        ],
      },
      {
        id: "by-type",
        heading: "Stand still or move",
        blocks: [
          { type: "p", text: "Five challenges keep you in place and use the action buttons: THE BUTTON, PERFECT STOP, QUICK DRAW, COPY THAT and LONG SHOT. Three are movement challenges where you walk, run and jump: THE SWEEPER, DOOR NUMBER WHO and MELTDOWN. In those, Space stays your jump and the panel docks at the top of the screen." },
        ],
      },
      {
        id: "hot-seat",
        heading: "Today's Hot Seat",
        blocks: [
          { type: "p", text: "One challenge each day pays double GUTS. It rotates through the eight in the order above, changing at midnight UTC. See [Hot Seat](@hot-seat)." },
        ],
      },
    ],
    related: ["the-button", "medals", "beginner-tips", "hot-seat"],
    sources: [SRC.source],
    aliases: ["challenges", "minigames", "list", "all challenges", "best challenge"],
  },
];
