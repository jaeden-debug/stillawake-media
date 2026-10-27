import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "getting-started", verification: "verified_live", lastVerified: VERIFIED } as const;

export const gettingStarted: WikiEntry[] = [
  {
    ...base,
    slug: "what-is-stillskin-forest",
    title: "What Is Stillskin Forest?",
    seoTitle: "What Is Stillskin Forest? The Roblox Co-op Survival Horror Game",
    description:
      "Stillskin Forest is a cooperative zombie survival-horror game on Roblox by StillAwake Media. What you do, where it's set, and how it differs.",
    question: "What is Stillskin Forest?",
    answer:
      "Stillskin Forest is a cooperative zombie survival-horror game on Roblox, made by StillAwake Media. You and your squad scavenge an abandoned campground, the ruined town of Stillwater and Blackthorn Asylum by day, survive increasingly dangerous nights, and follow clues toward something living under the hill.",
    facts: [
      ["Platform", "Roblox"],
      ["Genre", "Co-op survival horror"],
      ["Developer", "StillAwake Media"],
      ["Status", "In development"],
      ["Players per squad", "1–4 (Solo, Duo, Squad queues)"],
    ],
    sections: [
      {
        id: "the-premise",
        heading: "The premise",
        blocks: [
          { type: "p", text: "The tagline says it: **the forest is beautiful; the nights are not.** Daylight is calm enough to explore. You leave camp, pick a route, search houses, the hospital and the shops for supplies, and read what the people of Stillwater left behind. When dusk comes the infected multiply and start hunting." },
          { type: "p", text: "There are three goals running at once: survive the run, keep your squad alive, and understand what is happening beneath [Blackthorn Asylum](@blackthorn-asylum)." },
        ],
      },
      {
        id: "what-makes-it-different",
        heading: "What makes it different",
        blocks: [
          { type: "list", items: [
            "**Infected that behave with intent.** They notice you, alert each other, search where you were last seen, and only follow you up a ladder if they saw you climb it. See [Detection and noise](@detection-and-noise).",
            "**Hiding has consequences.** If the infected saw you hide, the [Dread Encounter](@the-dread-encounter) begins: they approach slowly and stare through the grate.",
            "**Close escapes are designed in.** Your sprint is 23 studs per second; the fastest normal infected is capped at 21.5. You can just barely pull away. See [Stamina and sprinting](@stamina-and-sprinting).",
            "**The run ends with a show.** When the last survivor falls, the squad lines up on the roof of St. Agnes Hospital while the infected dance around them. See [Death, ghosts and the finale](@death-ghosts-and-the-finale).",
          ] },
        ],
      },
      {
        id: "where-it-is-set",
        heading: "Where it is set",
        blocks: [
          { type: "p", text: "The world runs north to south: [the Campgrounds](@campgrounds), [the Forest Trail](@forest-trail), the town of [Stillwater](@stillwater), then up the hill to [Blackthorn Asylum](@blackthorn-asylum), its [graveyard](@graveyard), [chapel](@chapel), [crypt cave](@crypt-cave) and [Green Lake](@green-lake). Below all of it is [the Hollow](@the-hollow)." },
        ],
      },
      {
        id: "development-status",
        heading: "Development status",
        blocks: [
          { type: "callout", tone: "note", text: "Stillskin Forest is in active development. This wiki documents the current development build; public play on Roblox has not been confirmed yet, and numbers can change between builds. Every page shows the date it was last checked." },
        ],
      },
    ],
    related: ["how-to-play", "controls", "surviving-your-first-night", "enemy-comparison"],
    sources: [SRC.report, SRC.config, SRC.listing],
    aliases: ["stillskin", "still skin forest", "stillskin forest roblox", "about"],
  },
  {
    ...base,
    slug: "how-to-play",
    title: "How to Play Stillskin Forest",
    seoTitle: "How to Play Stillskin Forest: The Day, Night and Run Loop",
    description:
      "How a run of Stillskin Forest works: scavenge by day, prepare at dusk, survive the night, and what happens when your squad falls. A plain-English guide.",
    question: "How do you play Stillskin Forest?",
    answer:
      "Each run starts on Day 1 in morning light. Spend the day scavenging food, medicine, weapons and ammunition and reading clues; use the 40-second dusk to get somewhere defensible; then survive the three-minute night as the infected multiply and hunt. Revive teammates who go down. The run ends when everyone has fallen, or when your squad completes one of the story endings.",
    facts: [
      ["Full day", "About 8 minutes"],
      ["Day phase", "5 minutes (incl. 20 s sunrise, 40 s dusk)"],
      ["Night phase", "3 minutes"],
      ["Run starts", "Day 1, 8:00 a.m."],
    ],
    sections: [
      {
        id: "the-day",
        heading: "By day: scavenge and prepare",
        blocks: [
          { type: "p", text: "A few infected roam in daylight, but far fewer than at night (seven on Day 1). This is the time to leave camp, choose a route and search. Loot sits on real surfaces in houses, the hospital, the store and along the trails; walk up to it and press **E**. Empty loot spots refill at dawn." },
          { type: "list", items: [
            "Pick up [food](@food) and a [First Aid Kit](@first-aid-kit) before you need them.",
            "A melee weapon such as the [Baseball Bat](@baseball-bat) handles single infected quietly. Save [guns](@weapons-compared) for emergencies; they are loud.",
            "Read notes. They point toward [Blackthorn](@blackthorn-admission-ledger) and the story.",
          ] },
        ],
      },
      {
        id: "dusk",
        heading: "At dusk: get somewhere you can hold",
        blocks: [
          { type: "p", text: "Dusk lasts 40 seconds and is announced on screen. On Night 2 and later it may also announce a [special night](@special-nights-overview). Use it to regroup with your squad, close [doors](@doors-and-building), and decide whether you will hold a building, keep moving, or hide." },
        ],
      },
      {
        id: "the-night",
        heading: "At night: survive",
        blocks: [
          { type: "p", text: "The infected population jumps (45 on Night 1) and they spot you from further away. Your [headlamp](@headlamp) shows you more but also makes you easier to see. Gunfire, alarms and sprinting all draw attention; see [Detection and noise](@detection-and-noise)." },
          { type: "p", text: "You can fight, run, or [hide](@hiding). If you go down, a teammate has 20 seconds to [revive](@downed-and-revive) you." },
        ],
      },
      {
        id: "how-a-run-ends",
        heading: "How a run ends",
        blocks: [
          { type: "p", text: "When the last survivor falls the run is over: the squad's stat cards appear on the roof of St. Agnes Hospital and everyone votes to **Return to Camp** for a fresh Day 1. A run can also end in victory by completing [the Rite of Stillness](@the-rite-of-stillness) or destroying [the Heart of Stillskin](@the-heart-of-stillskin)." },
        ],
      },
    ],
    related: ["day-night-cycle", "surviving-your-first-night", "controls", "death-ghosts-and-the-finale"],
    sources: [SRC.config, SRC.playtest, SRC.report],
    aliases: ["how to play", "guide", "gameplay loop", "beginner"],
  },
  {
    ...base,
    slug: "controls",
    title: "Stillskin Forest Controls",
    seoTitle: "Stillskin Forest Controls: Keyboard, Mouse and Controller",
    description:
      "Every Stillskin Forest control on keyboard and mouse, with the controller buttons confirmed so far: sprint, headlamp, crouch, aim, reload, ping and more.",
    question: "What are the controls in Stillskin Forest?",
    answer:
      "Move with WASD, sprint with Left Shift, jump with Space, interact with E, toggle the headlamp with F, crouch with C, aim with right mouse, fire or swing with left mouse, reload with R, ping with T, and open the backpack with B or Tab. V switches to first person and J opens your journal.",
    sections: [
      {
        id: "keyboard-and-mouse",
        heading: "Keyboard and mouse",
        blocks: [
          { type: "table", caption: "Keyboard and mouse controls", head: ["Input", "Action"], rows: [
            ["W A S D", "Move"],
            ["Mouse", "Look and aim (the cursor is locked to the crosshair)"],
            ["Space", "Jump. Cars and furniture must be jumped onto, not walked up"],
            ["Left Shift", "Sprint while you have stamina"],
            ["C or Left Ctrl", "Crouch"],
            ["E", "Interact: pick up, read, hide, open doors, climb ladders"],
            ["Hold E", "Revive a downed teammate; give your held item to a teammate"],
            ["F", "Headlamp on/off"],
            ["Left mouse", "Fire, swing, or use the held item"],
            ["Right mouse", "Aim"],
            ["R", "Reload"],
            ["V", "Switch between third and first person"],
            ["Number keys", "Select a hotbar slot"],
            ["B or Tab", "Open the backpack"],
            ["G", "Drop the held item"],
            ["T or middle mouse", "Ping (infected, loot, or here)"],
            ["J", "Journal: notes, achievements and map"],
            ["L", "Light or put out a carried lantern"],
            ["H", "Clip the lantern to your belt"],
            ["Esc", "Close a note or menu"],
          ] },
        ],
      },
      {
        id: "controller",
        heading: "Controller",
        blocks: [
          { type: "table", caption: "Controller mappings in the current build", head: ["Button", "Action"], rows: [
            ["R2 / L2", "Fire / aim"],
            ["B", "Crouch"],
            ["X / Square", "Tap: reload. Hold: use a prompt (pick up, open, place relics)"],
            ["Y / Triangle", "Tap: ping. Hold: drop what you're holding"],
            ["LB / RB", "Cycle hotbar"],
            ["D-pad down", "Headlamp"],
            ["D-pad left / right", "Light lantern / lantern to belt"],
            ["R3", "First person"],
          ] },
          { type: "callout", tone: "note", text: "Controller and touch layouts are built and the on-screen hints switch automatically to the device you last used, but both still need a full test on real hardware. This table will be updated after that pass." },
        ],
      },
      {
        id: "tips",
        heading: "Control tips",
        blocks: [
          { type: "list", items: [
            "Sprinting stands you back up from a crouch.",
            "With a hammer, a quick click swings; holding the click and dragging across a surface nails a plank. See [Doors and building](@doors-and-building).",
            "Walking into the foot of a ladder starts a climb; Jump lets go partway.",
          ] },
        ],
      },
    ],
    media: "stillskin-forest-hotbar",
    related: ["how-to-play", "stamina-and-sprinting", "crouching-and-takedowns", "aiming-and-reloading"],
    sources: [SRC.playtest, SRC.report],
    aliases: ["keybinds", "keys", "key bindings", "controller", "gamepad", "buttons"],
    gaps: ["Controller and touch mappings not yet verified on real devices.", "Hotbar slot count shown on number keys (1–8) not confirmed with a real keypress for every slot."],
  },
  {
    ...base,
    slug: "surviving-your-first-night",
    title: "How to Survive Your First Night in Stillskin Forest",
    seoTitle: "Stillskin Forest Beginner's Guide: Survive Your First Night",
    description:
      "A beginner's survival guide for Stillskin Forest: what to collect on Day 1, where to be at dusk, how to handle the Night 1 horde, and when to hide.",
    question: "How do you survive the first night in Stillskin Forest?",
    answer:
      "Use Day 1 to collect a melee weapon, some food and a First Aid Kit, and stay near your squad. Before dusk ends, get inside a building you know and close the doors. At night, walk rather than sprint near calm infected, keep your headlamp off when you don't need it, fight single infected with melee, and run or hide from groups. Night 1 is always a normal night, never a special one.",
    sections: [
      {
        id: "day-one-checklist",
        heading: "Day 1 checklist",
        blocks: [
          { type: "list", ordered: true, items: [
            "Grab a melee weapon. The [Baseball Bat](@baseball-bat) and [Machete](@machete) are quiet and never need ammunition.",
            "Pick up any [food](@food). Each snack heals 25% and identical snacks stack in one slot.",
            "A [First Aid Kit](@first-aid-kit) heals 75%. Keep one for emergencies.",
            "Note where the hide spots are: lockers in the hospital, wardrobes in houses, the alley dumpster. See [Hiding](@hiding).",
            "Head back toward your squad before dusk.",
          ] },
        ],
      },
      {
        id: "when-dusk-comes",
        heading: "When dusk comes",
        blocks: [
          { type: "p", text: "Dusk gives you 40 seconds. Get inside, close the [doors](@doors-and-building) (the infected cannot open them and need eight hits to bash one in), and agree on a fallback route. Night 1 starts with around 45 infected spread across the map." },
        ],
      },
      {
        id: "during-the-night",
        heading: "During the night",
        blocks: [
          { type: "list", items: [
            "**Walk near calm infected.** Sprinting is audible from 30 studs; walking is quiet. Crouching is quieter still. See [Detection and noise](@detection-and-noise).",
            "**Mind your headlamp.** At night a lit lamp lets the infected spot you from 1.25× further; with it off they see only 0.8× as far. See [Headlamp](@headlamp).",
            "**Melee singles, avoid groups.** Only two infected can swing at you in any 1.6-second window, but a crowd will still pin you.",
            "**Shoot only when you must.** A pistol shot pulls in every infected within 90 studs; the shotgun, 120.",
            "**Break line of sight to end a chase.** Chases end after about 22 seconds, or once you get 85 studs clear.",
          ] },
        ],
      },
      {
        id: "if-it-goes-wrong",
        heading: "If it goes wrong",
        blocks: [
          { type: "p", text: "If you go down you have 20 seconds; a teammate holds **E** for 3 seconds to bring you back at 35% health. If no one can reach you, you will become a ghost and can keep watching. See [Downed and revive](@downed-and-revive)." },
        ],
      },
    ],
    related: ["how-to-play", "day-night-cycle", "hiding", "detection-and-noise"],
    sources: [SRC.config, SRC.items, SRC.playtest],
    aliases: ["beginner guide", "tips", "first night", "night 1", "how to survive"],
  },
  {
    ...base,
    slug: "playing-with-friends",
    title: "Playing Stillskin Forest with Friends",
    seoTitle: "Playing Stillskin Forest with Friends: Squads, Queues and Co-op",
    description:
      "How to play Stillskin Forest with friends: Solo, Duo and Squad queues, what you share as a team, and the co-op tools that keep a squad alive.",
    question: "Can you play Stillskin Forest with friends?",
    answer:
      "Yes. Stillskin Forest is built for co-op. From the lobby, a squad steps onto a queue pad together (Solo for 1, Duo for 2, Squad for 4) and is sent into its own match. In the match you share progress such as the asylum unlock and the relic count, and you can revive, ping and hand items to each other.",
    sections: [
      {
        id: "queues",
        heading: "Joining as a squad",
        blocks: [
          { type: "p", text: "The lobby is a ranger station in the woods with a campfire, a supply crate and a board of survival tips. At the trailhead are three queue pads: **Solo (1)**, **Duo (2)** and **Squad (4)**. A full pad leaves after a short countdown; otherwise it waits up to 20 seconds for teammates. The match then waits for the whole squad to arrive before Day 1 begins." },
          { type: "callout", tone: "note", text: "Queues have been tested in development. Moving squads between live servers needs the public game, so that part has not been confirmed yet." },
        ],
      },
      {
        id: "what-you-share",
        heading: "What your squad shares",
        blocks: [
          { type: "list", items: [
            "Reading the [Blackthorn Admission Ledger](@blackthorn-admission-ledger) unlocks the asylum for the whole team.",
            "Relics count toward one shared total, whoever carries them (verified with two players).",
            "One player can hold [the ritual](@the-rite-of-stillness) while others leave, and everyone sees the ending.",
          ] },
        ],
      },
      {
        id: "co-op-tools",
        heading: "Co-op tools",
        blocks: [
          { type: "p", text: "See [Co-op survival](@co-op-survival) for revives, pings and giving items, and [Death, ghosts and the finale](@death-ghosts-and-the-finale) for what happens when someone falls." },
        ],
      },
    ],
    related: ["co-op-survival", "death-ghosts-and-the-finale", "downed-and-revive"],
    sources: [SRC.playtest],
    aliases: ["multiplayer", "co-op", "coop", "friends", "squad", "duo", "party"],
    gaps: ["Live teleports between lobby and match servers not yet verified (needs the public game)."],
  },
  {
    ...base,
    slug: "faq",
    title: "Stillskin Forest FAQ",
    seoTitle: "Stillskin Forest FAQ: Platforms, Co-op, Weapons and More",
    description:
      "Quick answers about Stillskin Forest: is it multiplayer, what platforms it's on, how hiding works, how to unlock the asylum, and whether it's finished.",
    answer:
      "Short answers to the questions players ask most about Stillskin Forest, each linking to the full guide.",
    sections: [
      {
        id: "is-it-multiplayer",
        heading: "Is Stillskin Forest multiplayer?",
        blocks: [{ type: "p", text: "Yes. You can play solo or in squads of two or four, with revives, pings and item sharing. See [Playing with friends](@playing-with-friends)." }],
      },
      {
        id: "what-platforms",
        heading: "What platforms is Stillskin Forest on?",
        blocks: [{ type: "p", text: "Roblox. The game has keyboard, controller and touch controls, but only keyboard and mouse has been fully tested so far. See [Controls](@controls)." }],
      },
      {
        id: "is-it-out",
        heading: "Is Stillskin Forest out yet?",
        blocks: [{ type: "p", text: "It is in active development. The Roblox page exists, but public play has not been confirmed yet. This wiki documents the current development build." }],
      },
      {
        id: "how-do-you-hide",
        heading: "How do you hide from zombies?",
        blocks: [{ type: "p", text: "Walk up to a hiding spot such as a locker, wardrobe or dumpster and press **E**. If an infected saw you go in, it may come and stare at you through the opening. Stay put until it leaves. See [Hiding](@hiding) and [the Dread Encounter](@the-dread-encounter)." }],
      },
      {
        id: "best-weapon",
        heading: "What is the best weapon?",
        blocks: [{ type: "p", text: "It depends on the situation. The [Machete](@machete) hits hardest per swing of any melee weapon (40 damage), the [Pistol](@pistol) is accurate at range, and the [Shotgun](@shotgun) is devastating up close but loud and short-ranged. See [Weapons compared](@weapons-compared)." }],
      },
      {
        id: "how-to-get-into-the-asylum",
        heading: "How do you get into Blackthorn Asylum?",
        blocks: [{ type: "p", text: "Read the note nailed to the ROAD CLOSED barricade, follow its riddle to the park, and read the Blackthorn Admission Ledger. See [the walkthrough](@blackthorn-admission-ledger)." }],
      },
      {
        id: "what-is-the-watcher",
        heading: "What is the Watcher?",
        blocks: [{ type: "p", text: "A tall figure that appears in the distance, never attacks, and vanishes if you stare at it or walk toward it. See [The Watcher](@watcher)." }],
      },
      {
        id: "can-zombies-climb",
        heading: "Can zombies climb ladders?",
        blocks: [{ type: "p", text: "Only if they saw you climb that ladder, and only for a short time after. A roof can be safe from infected that didn't see how you got up. See [Climbing and ladders](@climbing-and-ladders)." }],
      },
    ],
    related: ["what-is-stillskin-forest", "how-to-play", "controls"],
    sources: [SRC.config, SRC.playtest, SRC.listing],
    aliases: ["questions", "faq", "help"],
  },
];
