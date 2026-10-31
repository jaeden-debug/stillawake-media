import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "getting-started", verification: "verified_live", lastVerified: VERIFIED } as const;

export const gettingStarted: WikiEntry[] = [
  {
    ...base,
    slug: "what-is-stillskin-forest",
    lastVerified: "2026-10-31",
    title: "What Is Stillskin Forest?",
    seoTitle: "What Is Stillskin Forest? The Roblox Co-op Survival Horror Game",
    description:
      "Stillskin Forest is a cooperative zombie survival-horror game on Roblox by StillAwake Media. What you do, where it's set, and how it differs.",
    question: "What is Stillskin Forest?",
    answer:
      "Stillskin Forest is a cooperative zombie survival-horror game on Roblox, made by StillAwake Media. You and your squad scavenge an abandoned campground, the ruined town of Stillwater and Blackthorn Asylum by day, survive increasingly dangerous nights, and follow clues toward what lies beneath the asylum.",
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
          { type: "p", text: "The tagline says it: **the forest is beautiful. The nights are not.** Daylight is calm enough to explore. You leave camp, pick a route, search houses, the hospital and the shops for supplies, and read what the people of Stillwater left behind. When night falls there are far more infected, and they spot you from further away." },
          { type: "p", text: "There are three goals running at once: survive the run, keep your squad alive, and understand what is happening beneath [Blackthorn Asylum](@blackthorn-asylum)." },
        ],
      },
      {
        id: "what-makes-it-different",
        heading: "What makes it different",
        blocks: [
          { type: "list", items: [
            "**Infected that behave with intent.** They notice you, alert each other, search where you were last seen, and only follow you up a ladder if they saw you climb it. See [Detection and noise](@detection-and-noise).",
            "**Hiding has consequences.** If an infected was after you when you hid, it comes to look in at you: the [Dread Encounter](@the-dread-encounter). If it watched you climb in from close by, it drags you out.",
            "**Close escapes are designed in.** Your sprint is 23 studs per second; the fastest normal infected is capped at 21.5. You can just barely pull away. See [Stamina and sprinting](@stamina-and-sprinting).",
            "**The run ends with a show.** In a normal run, when the last survivor falls, the squad lines up on the roof of St. Agnes Hospital while the infected dance around them. See [Death, ghosts and the finale](@death-ghosts-and-the-finale).",
          ] },
        ],
      },
      {
        id: "where-it-is-set",
        heading: "Where it is set",
        blocks: [
          { type: "p", text: "The world runs north to south: [the Campgrounds](@campgrounds), [the Forest Trail](@forest-trail), the town of [Stillwater](@stillwater), then up the hill to [Blackthorn Asylum](@blackthorn-asylum), its [graveyard](@graveyard), [chapel](@chapel), [crypt cave](@crypt-cave) and [Green Lake](@green-lake). Below all of it is [the Hollow](@the-hollow). East of town lies [Blackpine Airfield](@blackpine-airfield)." },
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
    sources: [SRC.report, SRC.config, SRC.listing, SRC.notes30],
    aliases: ["stillskin", "still skin forest", "stillskin forest roblox", "about"],
  },
  {
    ...base,
    slug: "how-to-play",
    lastVerified: "2026-10-31",
    title: "How to Play Stillskin Forest",
    seoTitle: "How to Play Stillskin Forest: The Day, Night and Run Loop",
    description:
      "How a run of Stillskin Forest works: scavenge by day, prepare at dusk, survive the night, and what happens when your whole squad falls. A plain-English guide.",
    question: "How do you play Stillskin Forest?",
    answer:
      "Each run starts on Day 1 in morning light. Spend the day scavenging food, medicine, weapons and ammunition and reading clues; use the 40-second dusk to get somewhere defensible; then survive the five-minute night as far more infected roam. Revive teammates who go down. Every run is a saved session you can leave and come back to; it ends for good only when everyone in it has fallen. Winning one of the story endings doesn't end it.",
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
          { type: "p", text: "A few infected roam in daylight, but far fewer than at night (at most 16 at a time by day, against up to 28 at night). This is the time to leave camp, choose a route and search. Loot sits on real surfaces in houses, the hospital, the store and along the trails; walk up to it and hold **E**. Empty loot spots refill at dawn." },
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
          { type: "p", text: "The infected population jumps (up to 28 roam the forest at night, against 16 by day, and no more than 40 are ever alive across the whole map; scripted events like the ritual siege keep their own numbers) and they spot you from further away. Your [headlamp](@headlamp) shows you more but also makes you easier to see. Gunfire, alarms and sprinting all draw attention; see [Detection and noise](@detection-and-noise)." },
          { type: "p", text: "You can fight, run, or [hide](@hiding). If you go down, a teammate has 2 minutes to [revive](@downed-and-revive) you." },
          { type: "p", text: "In a boarded-up shelter your squad can [sleep until dawn](@night-survival). A zombie just wandering nearby doesn't stop you sleeping; only one that is actually hunting you or your shelter does. If something attacks while the screen fades, everyone wakes back up with no penalty." },
        ],
      },
      {
        id: "how-a-run-ends",
        heading: "How a run ends",
        blocks: [
          { type: "p", text: "Every run you start from the trailhead is a [saved session](@persistent-expeditions): leave whenever you like and it saves, then carry on from the same day later. If someone falls while a teammate is still standing, they come back at dawn. When everyone in the session has fallen, the session is over for good: you see the end screen with the day you reached, and the session stays in your list, greyed out. **Play Again** starts a new session on Day 1 with your squad; **Back to Camp** returns you to the lobby. Completing [the Rite of Stillness](@the-rite-of-stillness) or destroying [the Heart of Stillskin](@the-heart-of-stillskin) wins the run, and the win is paid the moment it happens. The run then keeps going until the last survivor falls, and its end screen still shows your win." },
          { type: "p", text: "**After you win.** Night-vision goggles replace the headlamp (after the ritual you claim yours from the circle; after the Heart everyone gets them at once), and the infected get more persistent: they hear a little further, a scream pulls in one more, they search longer, and they keep after you for about seven seconds out of sight instead of five. They still don't know where you are until they see or hear you, and there are no more of them than on any other night. If they've just heard you behind a plank or door, they tear at it." },
        ],
      },
    ],
    related: ["day-night-cycle", "surviving-your-first-night", "controls", "death-ghosts-and-the-finale"],
    sources: [SRC.config, SRC.playtest, SRC.report, SRC.notes30, SRC.publish31],
    aliases: ["how to play", "guide", "gameplay loop", "beginner"],
  },
  {
    ...base,
    slug: "controls",
    lastVerified: "2026-10-31",
    title: "Stillskin Forest Controls",
    seoTitle: "Stillskin Forest Controls: Keyboard, Mouse and Controller",
    description:
      "Every Stillskin Forest control on keyboard and mouse and on controller: punching, charged attacks, aiming, headlamp, ping, bag, and the journal map's waypoints.",
    question: "What are the controls in Stillskin Forest?",
    answer:
      "Move with WASD, jump with Space, sprint with Left Shift, crouch with C, aim with right mouse, fire or swing with left mouse (punch with empty hands; hold to wind up a charged attack), reload with R, and hold E to interact. F toggles the headlamp, T pings, Tab or B opens the bag, J opens the journal and map, and V switches between first and third person.",
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
            ["Left mouse", "Fire, swing, or use the held item. With empty hands: punch"],
            ["Hold left mouse, release", "Charged attack with a melee weapon or fists"],
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
          { type: "table", caption: "On the journal map", head: ["Input", "Action"], rows: [
            ["Mouse wheel · drag", "Zoom · pan"],
            ["Click a building or a spot", "Choose: set a waypoint there, mark it as your crew's base, or clear your waypoint"],
            ["Right-click", "Clear your waypoint"],
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
            ["R2", "Fire, swing or use. With empty hands: punch. Hold and release: charged attack"],
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
          { type: "table", caption: "On the journal map (controller)", head: ["Button", "Action"], rows: [
            ["Left stick", "Move the map cursor (it snaps to buildings)"],
            ["Right stick · R2 / L2", "Pan · zoom in / out"],
            ["Cross", "Select the building or spot: set a waypoint, mark your crew's base, or clear your waypoint"],
            ["Square", "Drop your waypoint at the cursor"],
            ["Triangle", "Clear your waypoint"],
            ["R3 · Circle", "Centre on yourself · close the choice card"],
          ] },
        ],
      },
      {
        id: "touch",
        heading: "Touch screens",
        blocks: [
          { type: "p", text: "On phones and tablets the game uses on-screen touch controls. The objective sits in a small **OBJECTIVE** tab at the top of the screen; tap it to open or close it, so it never covers your controls. On the journal map, tap a building or a spot to set a waypoint or mark your base, pinch to zoom and drag to pan." },
        ],
      },
      {
        id: "tips",
        heading: "Control tips",
        blocks: [
          { type: "list", items: [
            "Sprinting stands you back up from a crouch.",
            "**Punching** is a last resort: weaker than any weapon. See [Fists](@fists).",
            "**Charged attacks:** hold the attack button with a melee weapon or bare fists to wind up (your arm draws back), then let go. A full wind-up hits twice as hard and knocks the infected back, but you recover more slowly. Quick taps swing and punch as normal.",
            "**Crew waypoints:** each player has one waypoint in their own colour, shown to the whole crew on the map and on screen with the distance. A base you mark is seen by everyone in the session and is still there when you come back.",
            "With a hammer, a quick click swings; holding the click and dragging across a surface nails a plank. See [Doors and building](@doors-and-building).",
            "Walking into the foot of a ladder starts a climb; Jump lets go partway.",
          ] },
          { type: "callout", tone: "note", text: "These bindings were read from the published game's input scripts (build v382) on 31 October 2026." },
        ],
      },
    ],
    media: "stillskin-forest-hotbar",
    related: ["how-to-play", "stamina-and-sprinting", "crouching-and-takedowns", "aiming-and-reloading"],
    sources: [SRC.controls31, SRC.publish31, SRC.playtest],
    aliases: ["keybinds", "keys", "key bindings", "controller", "gamepad", "buttons", "punch", "charged attack", "map", "waypoint"],
    gaps: ["Bindings read from the game's scripts, not hand-checked on every device.", "Touch button layout not yet documented.", "The new journal map and charged attacks are live but still being tested."],
  },
  {
    ...base,
    slug: "surviving-your-first-night",
    lastVerified: "2026-10-31",
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
          { type: "p", text: "Dusk gives you 40 seconds. Get inside, close the [doors](@doors-and-building) (the infected cannot open them and need eight hits to bash one in), and agree on a fallback route. At night up to 28 infected roam the forest at once." },
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
            "**Shoot only when you must.** A pistol shot is heard up to 90 studs away; the shotgun, 120. Walls muffle it only a little.",
            "**Break line of sight to end a chase.** A chase never times out while an infected can see you. Stay out of sight for about 5 seconds and it switches to searching where you were.",
            "**Sleep it off.** If your squad is together in a boarded-up building, you can [sleep until dawn](@night-survival). Infected wandering past won't stop you; only one actually hunting you or your shelter will. If something attacks while the screen fades, everyone just wakes back up, with no penalty.",
          ] },
        ],
      },
      {
        id: "if-it-goes-wrong",
        heading: "If it goes wrong",
        blocks: [
          { type: "p", text: "If you go down you have 2 minutes; a teammate holds **E** for 3 seconds to bring you back at 35% health. If no one reaches you, you become a ghost who can fly around the map, and you respawn next to a teammate at dawn. The gear you carried is packed into a backpack where you fell; only you can open it, and it lasts three dawns. If everyone in your session falls, the session ends for good. See [Downed and revive](@downed-and-revive)." },
        ],
      },
    ],
    related: ["how-to-play", "day-night-cycle", "hiding", "detection-and-noise"],
    sources: [SRC.config, SRC.items, SRC.playtest, SRC.notes30, SRC.publish31],
    aliases: ["beginner guide", "tips", "first night", "night 1", "how to survive"],
  },
  {
    ...base,
    slug: "playing-with-friends",
    lastVerified: "2026-10-31",
    title: "Playing Stillskin Forest with Friends",
    seoTitle: "Playing Stillskin Forest with Friends: Squads, Queues and Co-op",
    description:
      "How to play Stillskin Forest with friends: queues, saved sessions you share and invite friends to, what your squad shares, and the co-op tools.",
    question: "Can you play Stillskin Forest with friends?",
    answer:
      "Yes. Stillskin Forest is built for co-op. From the lobby, a squad steps onto a queue pad together (Solo for 1, Duo for 2, Squad for 4). Every run is a saved session that everyone who started it owns, and you can invite more friends into it. In the match you share progress such as the asylum unlock and the circle's relics, and you can revive, ping, mark waypoints and hand items to each other.",
    sections: [
      {
        id: "queues",
        heading: "Joining as a squad",
        blocks: [
          { type: "p", text: "The lobby is Pinecrest, a camp on level ground in a wide open clearing around the bonfire, ringed by pines. Lit, signed trails lead out of it: **North**, **East**, **South**, **West** and the **Old Camp Trail**. Mortimer's shop, the bonfire, the supply crate, the clues and the queues are where they always were. Wander too far and you get the usual turn-back countdown, but the lobby can't hurt you: when it runs out you simply reappear at camp." },
          { type: "p", text: "At the trailhead are three queue pads: **Solo (1)**, **Duo (2)** and **Squad (4)**. A full pad leaves after a short countdown; otherwise it waits up to 20 seconds for teammates. The match then waits for the whole squad to arrive before Day 1 begins." },
        ],
      },
      {
        id: "saved-sessions",
        heading: "Saved sessions",
        blocks: [
          { type: "list", items: [
            "**Every run is saved.** Everyone who starts a run together owns that session. Leaving saves it automatically, and you carry on from the same day next time.",
            "**Invite friends.** In a session, **INVITE FRIEND** sends a Roblox invite; accepting drops your friend straight into the live session. They join with a starter kit and keep their own gear from then on.",
            "**Come back any time, even alone.** If you have a session, the SESSIONS menu opens when you join. Anyone in a session can continue it; if nobody else is playing, you're warned that if you die, the session ends for everyone.",
            "**Up to 3 active sessions** each. Removing a session only takes it off your own list.",
            "**A team wipe ends it.** If everyone in the session falls, that session is over for good.",
          ] },
          { type: "p", text: "Full details in [Saved sessions](@persistent-expeditions)." },
        ],
      },
      {
        id: "what-you-share",
        heading: "What your squad shares",
        blocks: [
          { type: "list", items: [
            "Reading the [Blackthorn Admission Ledger](@blackthorn-admission-ledger) unlocks the asylum for the whole team.",
            "Relics are personal: each survivor finds their own. The relics placed at the ritual circle are shared, so the squad fills the circle together.",
            "One player can hold [the ritual](@the-rite-of-stillness) while others leave, and the win counts for everyone in the match.",
            "A crew base marked on the journal map is seen by everyone in the session and is still there when you come back.",
          ] },
        ],
      },
      {
        id: "co-op-tools",
        heading: "Co-op tools",
        blocks: [
          { type: "p", text: "See [Co-op survival](@co-op-survival) for revives, pings, waypoints and giving items, and [Death, ghosts and the finale](@death-ghosts-and-the-finale) for what happens when someone falls. Teammates can shove each other but can never hurt each other." },
          { type: "p", text: "A full crew of four has places worth heading for together: the Lost Camp is stocked for a crew of four, and the Ranger Trader Station sells survival supplies for Embers (15% off at night) inside a safe zone." },
        ],
      },
    ],
    related: ["co-op-survival", "persistent-expeditions", "death-ghosts-and-the-finale", "downed-and-revive"],
    sources: [SRC.playtest, SRC.notes30, SRC.publish31],
    aliases: ["multiplayer", "co-op", "coop", "friends", "squad", "duo", "party", "invite", "sessions", "lobby"],
    gaps: ["The squad teleport between the lobby and live match servers has not been independently verified.", "Saved sessions, invites and the reworked lobby are live but still being tested with several players."],
  },
  {
    ...base,
    slug: "faq",
    lastVerified: "2026-10-31",
    title: "Stillskin Forest FAQ",
    seoTitle: "Stillskin Forest FAQ: Platforms, Co-op, Weapons and More",
    description:
      "Quick answers about Stillskin Forest: co-op, saving, platforms, zombies at night, sleeping, punching, hiding and how to unlock the asylum.",
    answer:
      "Short answers to the questions players ask most about Stillskin Forest, each linking to the full guide.",
    sections: [
      {
        id: "is-it-multiplayer",
        heading: "Is Stillskin Forest multiplayer?",
        blocks: [{ type: "p", text: "Yes. You can play solo or in squads of two or four, with revives, pings, crew waypoints and item sharing, and invite friends into a saved session. Teammates can shove each other but never hurt each other. See [Playing with friends](@playing-with-friends)." }],
      },
      {
        id: "can-you-save",
        heading: "Can you save your game?",
        blocks: [{ type: "p", text: "Yes. Every run you start from the trailhead is a saved session. Leaving saves it, and anyone in it can come back later, even alone. You can have up to 3 active sessions. If everyone in a session falls, it ends for good. See [Saved sessions](@persistent-expeditions)." }],
      },
      {
        id: "how-many-zombies",
        heading: "How many zombies are there at night?",
        blocks: [{ type: "p", text: "Up to 28 roam the forest at night (16 by day), and no more than 40 are ever alive across the whole map. Scripted events like the ritual siege keep their own numbers. See [How to play](@how-to-play)." }],
      },
      {
        id: "can-you-sleep",
        heading: "Why can't we sleep?",
        blocks: [{ type: "p", text: "Only an infected that is actually hunting you or your shelter stops you sleeping; one just wandering nearby doesn't. If something attacks while the screen fades, everyone wakes back up with no penalty. See [Night survival](@night-survival)." }],
      },
      {
        id: "can-you-punch",
        heading: "Can you punch?",
        blocks: [{ type: "p", text: "Yes. With nothing in your hands, click (R2 on controller) to punch. It's a last resort, weaker than any weapon. Hold the button to wind up a charged punch or swing. See [Controls](@controls)." }],
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
        blocks: [{ type: "p", text: "Walk up to a hiding spot such as a locker, wardrobe or dumpster and press **E**. If an infected was after you, it may come and look in at you through the opening. If it watched you climb in from close by it will usually find you and pull you out, so break its line of sight first. Nothing tells you when it's safe: listen before you leave. See [Hiding](@hiding) and [the Dread Encounter](@the-dread-encounter)." }],
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
    sources: [SRC.config, SRC.playtest, SRC.listing, SRC.notes30, SRC.publish31],
    aliases: ["questions", "faq", "help"],
  },
];
