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
      ["Status", "Released 28 Oct 2026"],
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
        heading: "Release status",
        blocks: [
          { type: "callout", tone: "note", text: "Stillskin Forest went public on Roblox on 28 October 2026. This wiki describes the published game, and numbers can change between updates. Every page shows the date it was last checked against the live game." },
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
      "Each run starts on Day 1 in morning light. Spend the day scavenging food, medicine, weapons and ammunition and reading clues; use the 40-second dusk to get somewhere defensible; then survive the five-minute night as far more infected roam and hunt. Revive teammates who go down. The run ends when everyone has fallen, or when your squad completes one of the story endings.",
    facts: [
      ["Day phase", "8 minutes (incl. 20 s sunrise, 40 s dusk)"],
      ["Night phase", "5 minutes"],
      ["Full day and night", "About 13 minutes"],
      ["Run starts", "Day 1, 8:00 a.m."],
    ],
    sections: [
      {
        id: "the-day",
        heading: "By day: scavenge and prepare",
        blocks: [
          { type: "p", text: "A few infected roam in daylight, but far fewer than at night (at most 16 at a time by day, against 40 at night). This is the time to leave camp, choose a route and search. Loot sits on real surfaces in houses, the hospital, the store and along the trails; walk up to it and press **E**. Empty loot spots refill at dawn." },
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
          { type: "p", text: "The infected population jumps (up to 40 at night, against 16 by day) and they spot you from further away. Your [headlamp](@headlamp) shows you more but also makes you easier to see. Gunfire, alarms and sprinting all draw attention; see [Detection and noise](@detection-and-noise)." },
          { type: "p", text: "You can fight, run, or [hide](@hiding). If you go down, a teammate has 2 minutes to [revive](@downed-and-revive) you." },
        ],
      },
      {
        id: "how-a-run-ends",
        heading: "How a run ends",
        blocks: [
          { type: "p", text: "When the last survivor falls the run is over: the squad's stat cards appear on the roof of St. Agnes Hospital and everyone votes to **Return to Camp** for a fresh Day 1. Completing [the Rite of Stillness](@the-rite-of-stillness) or destroying [the Heart of Stillskin](@the-heart-of-stillskin) wins the run, and the win is paid the moment it happens. The run then keeps going until the last survivor falls, and its end screen still shows your win." },
          { type: "p", text: "**After you win.** Night-vision goggles replace the headlamp (after the ritual you claim yours from the circle; after the Heart everyone gets them at once), and the infected get more persistent: they hear a little further, a scream pulls in one more, they search longer, and they keep after you for about seven seconds out of sight instead of five. They still don't know where you are until they see or hear you, and there are no more of them than on any other night. If they've just heard you behind a plank or door, they tear at it." },
        ],
      },
    ],
    related: ["day-night-cycle", "surviving-your-first-night", "controls", "death-ghosts-and-the-finale"],
    sources: [SRC.config, SRC.playtest, SRC.report, SRC.notes30],
    aliases: ["how to play", "guide", "gameplay loop", "beginner"],
  },
  {
    ...base,
    slug: "controls",
    lastVerified: "2026-10-31",
    title: "Stillskin Forest Controls",
    seoTitle: "Stillskin Forest Controls: Keyboard, Mouse and Controller",
    description:
      "Every Stillskin Forest control on keyboard and mouse and on controller: sprint, crouch, aim, reload, headlamp, lantern, ping, bag, journal and more.",
    question: "What are the controls in Stillskin Forest?",
    answer:
      "Move with WASD, jump with Space, sprint with Left Shift, crouch with C, aim with right mouse, fire or swing with left mouse, reload with R, and hold E to interact. F toggles the headlamp, T pings, Tab or B opens the bag, J opens the journal and map, and V switches between first and third person.",
    sections: [
      {
        id: "keyboard-and-mouse",
        heading: "Keyboard and mouse (PC and Mac)",
        blocks: [
          { type: "table", caption: "Keyboard and mouse controls", head: ["Input", "Action"], rows: [
            ["W A S D / Space", "Move / jump"],
            ["Left Shift", "Sprint (hold); hold your breath while aiming"],
            ["C or Ctrl", "Crouch (toggle). On a Mac, use C"],
            ["V · X", "Switch first/third person · swap shoulder"],
            ["Right mouse", "Aim (hold). Mac trackpad: two-finger click"],
            ["Left mouse", "Fire, swing, or use the held item"],
            ["R", "Reload"],
            ["1–8 · Q · G", "Hotbar slot · last item · drop"],
            ["Tab or B", "Bag"],
            ["F", "Headlamp or night vision"],
            ["L · H", "Lantern light · lantern in hand or on belt"],
            ["K", "Take off armour"],
            ["Hold E", "Interact: pick up, equip armour, revive, relics, sleep, Return to Base, recover a backpack"],
            ["Z", "Search a loot spot again"],
            ["T or middle mouse", "Ping"],
            ["J", "Journal and map"],
            ["O", "Collapse the objective"],
            ["Esc", "Close a menu, note or tape"],
          ] },
          { type: "table", caption: "As a ghost (after you fall)", head: ["Input", "Action"], rows: [
            ["W A S D", "Fly"],
            ["Space · Ctrl", "Rise · sink"],
            ["Shift", "Faster"],
            ["Q · E", "Watch a teammate"],
          ] },
        ],
      },
      {
        id: "controller",
        heading: "Controller",
        blocks: [
          { type: "table", caption: "Controller (PlayStation labels; on Xbox, Square = X, Triangle = Y, Circle = B, Cross = A)", head: ["Button", "Action"], rows: [
            ["R2", "Fire, swing or use"],
            ["L2", "Aim"],
            ["Square", "Tap: reload. Hold: prompts"],
            ["Triangle", "Tap: ping. Hold: drop"],
            ["Circle", "Crouch; back out of menus"],
            ["L1 / R1", "Cycle hotbar"],
            ["D-pad up", "Swap shoulder"],
            ["D-pad down", "Headlamp"],
            ["D-pad left / right", "Lantern / lantern in hand or on belt"],
            ["L3", "Sprint; hold your breath while aiming"],
            ["R3", "Switch camera view"],
            ["Select / Touchpad", "Tap: bag. Hold: journal"],
          ] },
        ],
      },
      {
        id: "touch",
        heading: "Touch screens",
        blocks: [
          { type: "p", text: "On phones and tablets the game uses on-screen touch controls." },
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
          { type: "callout", tone: "note", text: "These bindings were read from the published game's input scripts on 31 October 2026. Punching with empty hands is temporarily unavailable; see [Fists](@fists)." },
        ],
      },
    ],
    media: "stillskin-forest-hotbar",
    related: ["how-to-play", "stamina-and-sprinting", "crouching-and-takedowns", "aiming-and-reloading"],
    sources: [SRC.controls31, SRC.playtest],
    aliases: ["keybinds", "keys", "key bindings", "controller", "gamepad", "buttons"],
    gaps: ["Bindings read from the game's scripts, not hand-checked on every device.", "Touch button layout not yet documented."],
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
          { type: "p", text: "Dusk gives you 40 seconds. Get inside, close the [doors](@doors-and-building) (the infected cannot open them and need eight hits to bash one in), and agree on a fallback route. At night up to 40 infected roam the map at once." },
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
            "**Break line of sight to end a chase.** A chase never times out while an infected can see you. Stay out of sight for about 5 seconds and it switches to searching where you were.",
          ] },
        ],
      },
      {
        id: "if-it-goes-wrong",
        heading: "If it goes wrong",
        blocks: [
          { type: "p", text: "If you go down you have 2 minutes; a teammate holds **E** for 3 seconds to bring you back at 35% health. If no one reaches you, you become a ghost who can fly around the map, and you respawn next to a teammate at dawn. See [Downed and revive](@downed-and-revive)." },
        ],
      },
    ],
    related: ["how-to-play", "day-night-cycle", "hiding", "detection-and-noise"],
    sources: [SRC.config, SRC.items, SRC.playtest, SRC.notes30],
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
      "Yes. Stillskin Forest is built for co-op. From the lobby, a squad steps onto a queue pad together (Solo for 1, Duo for 2, Squad for 4) and is sent into its own match. In the match you share progress such as the asylum unlock and the relics placed at the ritual circle, and you can revive, ping and hand found items to each other.",
    sections: [
      {
        id: "queues",
        heading: "Joining as a squad",
        blocks: [
          { type: "p", text: "The lobby is a camp in a forest clearing, with a bonfire, Mortimer's shop stall and a departure truck at the trailhead. At the gate are three queue pads: **Solo (1)**, **Duo (2)** and **Squad (4)**. A full pad leaves after a short countdown; otherwise it waits up to 20 seconds for teammates. The match then waits for the whole squad to arrive before Day 1 begins." },
        ],
      },
      {
        id: "what-you-share",
        heading: "What your squad shares",
        blocks: [
          { type: "list", items: [
            "Reading the [Blackthorn Admission Ledger](@blackthorn-admission-ledger) unlocks the asylum for the whole team.",
            "Relics are personal: each survivor finds their own. The relics placed at the ritual circle are shared, so the squad fills the circle together.",
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
    sources: [SRC.playtest, SRC.notes30],
    aliases: ["multiplayer", "co-op", "coop", "friends", "squad", "duo", "party"],
    gaps: ["The squad teleport between the lobby and live match servers has not been independently verified."],
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
        blocks: [{ type: "p", text: "Roblox. You can play with keyboard and mouse, with a controller, or on a touch screen with on-screen controls. See [Controls](@controls)." }],
      },
      {
        id: "is-it-out",
        heading: "Is Stillskin Forest out yet?",
        blocks: [{ type: "p", text: "Yes. Stillskin Forest went public on Roblox on 28 October 2026 and is free to play from its Roblox page. This wiki describes the published game." }],
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
