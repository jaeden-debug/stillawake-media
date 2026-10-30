import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "mechanics", verification: "verified_live", lastVerified: VERIFIED } as const;

export const mechanics: WikiEntry[] = [
  {
    ...base,
    slug: "day-night-cycle",
    lastVerified: "2026-10-29",
    title: "Day and Night Cycle",
    seoTitle: "Stillskin Forest Day and Night Cycle: How Long Is a Night?",
    description:
      "How long a day and night last in Stillskin Forest, what changes after dark, and how the infected population grows each day.",
    question: "How long is a night in Stillskin Forest?",
    answer:
      "A night lasts five minutes. The day phase lasts eight minutes, including a 20-second sunrise at the start and a 40-second dusk at the end, so a full day and night take about thirteen minutes. Runs begin on Day 1 at 8:00 a.m. in full light.",
    facts: [["Day phase", "8 min"], ["Sunrise", "20 s"], ["Dusk", "40 s"], ["Night", "5 min"], ["Full cycle", "~13 min"]],
    sections: [
      {
        id: "phases",
        heading: "The phases",
        blocks: [
          { type: "table", caption: "A day in Stillskin Forest", head: ["Phase", "Length", "Clock", "What changes"], rows: [
            ["Dawn", "20 s", "5:48 → 7:00", "Night extras head back into the woods and despawn. Empty loot spots refill."],
            ["Day", "7 min", "7:00 → 17:36", "Few infected, shorter detection range. Scavenge."],
            ["Dusk", "40 s", "17:36 → 19:12", "Warning banner. A special night may be announced."],
            ["Night", "5 min", "19:12 → 5:48", "Fresh infected come into the woods, even where you cleared them by day, and detection range grows. See [Night survival](@night-survival)."],
          ] },
        ],
      },
      {
        id: "escalation",
        heading: "How it escalates",
        blocks: [
          { type: "p", text: "Every day adds infected. By day the forest holds 6 plus the day number (to a maximum of 14). At night it holds up to 40, arriving up to three at a time, out of sight and never closer than 70 studs. Counting every infected from every source (the airfield's soldiers, the asylum, the ritual, ambushes), there are never more than 56 at once, special nights included." },
          { type: "table", caption: "Ordinary infected in the forest", head: ["Day", "By day", "At night"], rows: [
            ["1", "7", "40"], ["2", "8", "40"], ["3", "9", "40"], ["4", "10", "40"], ["5+", "11–14", "40"],
          ] },
          { type: "p", text: "Detection range grows too: 45 studs by day, 70 at night, plus 1.5 studs for every day survived. From Night 2, dusk can roll a [special night](@special-nights-overview)." },
        ],
      },
      {
        id: "cleared-ground",
        heading: "Cleared ground stays cleared",
        blocks: [
          { type: "p", text: "The map is split into squares about 160 studs across, and each square gets a few ordinary infected per day. Kill the ones around you and no more appear in your square while anyone stays in it or near its edge. It fills up again only once everyone has been gone for about two minutes." },
          { type: "p", text: "Nightfall is the exception: every square, including the one you're standing in, gets a fresh batch for the night. They arrive out of sight and don't know where you are; they find you the usual way, by sight or sound. Clear your ground at night and it stays clear for the rest of the night, though infected from the squares around you can still wander in." },
        ],
      },
    ],
    related: ["night-survival", "surviving-your-first-night", "special-nights-overview", "detection-and-noise", "headlamp"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["day night", "night length", "time", "cycle", "how long is a day"],
  },
  {
    ...base,
    slug: "stamina-and-sprinting",
    title: "Stamina and Sprinting",
    seoTitle: "Stamina and Sprinting in Stillskin Forest: Speeds and Recovery",
    description:
      "How sprinting and stamina work in Stillskin Forest: sprint speed 23 vs walk 16, about six seconds of sprint, recovery, and why it beats every infected.",
    question: "How does stamina work in Stillskin Forest?",
    answer:
      "Hold Left Shift to sprint at 23 studs per second instead of walking at 16. Sprinting drains 16 stamina per second from 100, so a full bar gives about six seconds. It starts refilling at 22 per second 0.8 seconds after you stop. You need 15 stamina to start a sprint, and if you run dry you are winded until it is back to 35.",
    facts: [["Walk", "16 studs/s"], ["Sprint", "23 studs/s"], ["Aiming walk", "12 studs/s"], ["Crouch", "8 studs/s"], ["Stamina", "100"], ["Drain", "16/s"], ["Regen", "22/s after 0.8 s"]],
    sections: [
      {
        id: "the-race",
        heading: "Why sprinting matters",
        blocks: [
          { type: "p", text: "No normal infected is faster than you. The quickest, the [Runner](@runner), is capped at 21.5. That gap is deliberately small: you can just barely pull away, and only while your stamina lasts. Chases also end on their own after about 22 seconds, after 145 studs of pursuit, or once you are 85 studs clear." },
        ],
      },
      {
        id: "noise",
        heading: "Sprinting is loud",
        blocks: [
          { type: "p", text: "Moving faster than 19 studs per second counts as sprinting, and calm infected within 30 studs hear it. Walking near them is quiet. See [Detection and noise](@detection-and-noise)." },
        ],
      },
      {
        id: "tips",
        heading: "Tips",
        blocks: [
          { type: "list", items: [
            "Sprint in bursts. Stopping briefly lets stamina recover quickly (22 per second against a 16 per second drain).",
            "Sprinting stands you up from a crouch.",
            "Aim sway grows when you are winded, so catch your breath before a careful shot.",
          ] },
        ],
      },
    ],
    related: ["detection-and-noise", "runner", "crouching-and-takedowns"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["stamina", "sprint", "run", "speed", "movement speed"],
  },
  {
    ...base,
    slug: "detection-and-noise",
    lastVerified: "2026-10-29",
    title: "Detection, Noise and Pursuit",
    seoTitle: "How Zombies Detect You in Stillskin Forest: Sight, Noise and Chases",
    description:
      "How the infected find you in Stillskin Forest: sight range, field of view, noise from guns and sprinting, alerts, searches, and how chases end.",
    question: "How do zombies detect you in Stillskin Forest?",
    answer:
      "Infected see you within a 140° field of view out to 45 studs by day and 70 at night (more each day), and sense you within 9 studs from any direction. They also investigate noise: gunshots within 90 studs, shotgun blasts within 120, melee within 25, and sprinting footsteps within 30, all shorter through a wall. After about a second of seeing you they commit, scream to alert others within 45 studs, and chase. They never simply know where you are.",
    sections: [
      {
        id: "sight",
        heading: "Sight",
        blocks: [
          { type: "table", caption: "Detection ranges", head: ["Condition", "Range"], rows: [
            ["Day", "45 studs (+1.5 per day)"],
            ["Night", "70 studs (+1.5 per day)"],
            ["Any direction, any time", "9 studs"],
            ["Field of view", "140°"],
            ["Headlamp on at dusk/night", "×1.25"],
            ["Headlamp off at dusk/night", "×0.8"],
            ["Crouching", "×0.55 (close sense ×0.6)"],
            ["In rain", "Down by up to 45% in a downpour (see [Weather](@weather))"],
          ] },
        ],
      },
      {
        id: "noise",
        heading: "Noise",
        blocks: [
          { type: "table", caption: "How far each noise carries", head: ["Noise", "Heard within"], rows: [
            ["Shotgun blast, Hunting Rifle or Mini AK shot", "120 studs"], ["Gunshot", "90 studs"], ["Running generator", "45 studs, every 8 s"], ["Sprinting footsteps", "30 studs"], ["Melee swing", "25 studs"], ["Walking", "Silent"], ["Crouched footsteps", "Silent"],
          ] },
          { type: "p", text: "Walls muffle sound. With a wall between you and an infected, a quiet noise (sprinting, a melee swing, a running generator) carries less than half as far, and a gunshot about four fifths as far. Glass doesn't count as a wall." },
          { type: "p", text: "Alarms count too: the burglar alarm at [Pine General Store](@pine-general-store), a crashed car's alarm, and the hospital vending machine all pull infected in. Breaking a window is loud too. In rain every noise carries up to 40% less far." },
          { type: "p", text: "Walking through bushes and ferns rustles them, and splashing through a puddle makes a sound. You hear the infected doing the same, which is often the first sign one is close." },
        ],
      },
      {
        id: "states",
        heading: "From roaming to chasing",
        blocks: [
          { type: "list", ordered: true, items: [
            "**Roam.** Idle or wandering.",
            "**Suspicious.** It has seen you; after about 1.1 seconds it commits.",
            "**Alert.** It screams, pulling in infected within 45 studs (100 for a [Screamer](@screamer)).",
            "**Chase.** It leads your movement; a pack fans out to close from the sides.",
            "**Attack.** In reach, it winds up (slowing down) and swings.",
            "**Search.** If it loses sight of you for 5 seconds, it searches where you were heading for roughly 7 to 12 seconds, stopping now and then to listen and look around, then returns to roaming.",
          ] },
          { type: "p", text: "An infected that can see you tells searching infected within about 20 studs where you are, every couple of seconds. That's the only way news of you spreads, besides a scream. Infected far away never come for you just because it's night." },
        ],
      },
      {
        id: "how-chases-end",
        heading: "How chases end",
        blocks: [
          { type: "p", text: "An infected that can still see you keeps coming: there is no timer while you're in plain sight. Break line of sight and it heads for where it last saw you; about 5 seconds later it starts searching. A loud noise (a gunshot) can tell a chaser that has lost you where you went. Climbing a ladder the chaser didn't see you use also leaves it behind; see [Climbing and ladders](@climbing-and-ladders)." },
        ],
      },
    ],
    media: "stillskin-forest-chase-golden-hour",
    related: ["hiding", "stamina-and-sprinting", "headlamp", "crouching-and-takedowns", "enemy-comparison"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["stealth", "noise", "aggro", "chase", "detection", "line of sight"],
  },
  {
    ...base,
    slug: "hiding",
    lastVerified: "2026-10-29",
    title: "Hiding",
    seoTitle: "How to Hide in Stillskin Forest: Lockers, Wardrobes and Hide Spots",
    description:
      "How to hide from zombies in Stillskin Forest: where the hiding spots are, how to enter and leave, and what happens if the infected saw you go in.",
    question: "How do you hide from zombies in Stillskin Forest?",
    answer:
      "Walk up to a hiding spot (a locker, wardrobe, dumpster, chest, trunk, morgue drawer or tent) and press E. You watch through the slats or gap and can look around a little; leave with E or Space. If no infected was after you, you're safe. If one was, it comes to look (the Dread Encounter). One that watched you climb in from close by will usually find you; break its line of sight before you hide and it will look, then leave.",
    sections: [
      {
        id: "where",
        heading: "Hiding spots",
        blocks: [
          { type: "list", items: [
            "Two lockers in [St. Agnes Hospital](@st-agnes-hospital)",
            "The alley dumpster between the store and the diner",
            "Wardrobes in two [Stillwater houses](@houses-of-stillwater)",
            "The chest freezer in the [walk-in freezer](@pine-general-store)",
            "The trunk in Tommy's attic",
            "A drawer in the [morgue](@morgue)",
            "The tent at the [Campgrounds](@campgrounds)",
          ] },
        ],
      },
      {
        id: "entering-and-leaving",
        heading: "Entering and leaving",
        blocks: [
          { type: "p", text: "Press **E** at the spot. Inside, the camera looks out through the opening with a small range of movement, and you hear your own breathing. Leave with **E**, **Space**, gamepad A or B, or the LEAVE button on touch." },
          { type: "p", text: "Hidden survivors cannot be targeted or damaged directly. A chaser that loses you walks to roughly where you vanished and searches, so being found is a real risk." },
        ],
      },
      {
        id: "if-they-saw-you",
        heading: "If they saw you",
        blocks: [
          { type: "p", text: "Hiding while an infected is after you starts [the Dread Encounter](@the-dread-encounter). You can leave at any time, but leaving while one is close restarts the chase, and nothing tells you when it's safe: listen first." },
        ],
      },
    ],
    related: ["the-dread-encounter", "detection-and-noise", "st-agnes-hospital"],
    sources: [SRC.playtest, SRC.report, SRC.config],
    aliases: ["hide", "locker", "lockers", "wardrobe", "hiding spots", "hide spots"],
  },
  {
    ...base,
    slug: "the-dread-encounter",
    lastVerified: "2026-10-29",
    title: "The Dread Encounter",
    seoTitle: "The Dread Encounter in Stillskin Forest: What Happens When You Hide",
    description:
      "The Dread Encounter is what happens in Stillskin Forest when the infected see you hide: the slow approach, the stare through the grate, and how it ends.",
    question: "What is the Dread Encounter in Stillskin Forest?",
    answer:
      "The Dread Encounter happens when infected that were after you see where you hid, or lose you right beside it. The chase goes quiet; there's no music, only your breathing, your heart and their footsteps. They walk slowly toward your spot. One steps up to the opening and looks straight in at you for four to nine seconds while others wait nearby. If it watched you climb in from close up, it may find you and drag you out. If it only lost you nearby, it looks, then leaves, one at a time, sometimes glancing back.",
    sections: [
      {
        id: "the-sequence",
        heading: "The sequence",
        blocks: [
          { type: "list", ordered: true, items: [
            "The chase goes quiet. There's no music: only your breathing, your heartbeat and the room.",
            "The infected stop sprinting and approach slowly, walking around furniture rather than through it.",
            "A lead infected pauses, turns its head toward your spot, then comes up to the opening.",
            "It looks in at you through the slats or the gap, breathing close, for four to nine seconds. Now and then it glances away, then back.",
            "Others, up to five in all, wait or search nearby. Only one ever stands at the opening.",
            "Either it finds you (see below) or they withdraw one at a time, with gaps between them. One may linger or look back.",
            "Nothing announces that it's over. Listen before you leave.",
          ] },
        ],
      },
      {
        id: "rules",
        heading: "Rules",
        blocks: [
          { type: "list", items: [
            "**Being found depends on what it saw.** An infected that watched you climb in from up close, with nothing between you, finds you in a locker or wardrobe and drags you out after banging on it once: you get a moment's warning. Darker spots (the tent, the morgue drawer) and spots with a lid (the dumpster, the freezer, the trunk) hide you better.",
            "**Break line of sight first.** If it only lost you near the spot, it looks, then leaves.",
            "**Noise matters.** A sound right at your spot during the inspection (a teammate's gunfire, say) makes it surer. A loud sound somewhere else can pull it away to look.",
            "Hidden, you can't be hurt: it never attacks through the door.",
            "You can leave at any time; leaving while it's close restarts the chase.",
            "An encounter times out after 38 seconds at most.",
          ] },
        ],
      },
      {
        id: "dread-zones",
        heading: "Dread in confined places",
        blocks: [
          { type: "p", text: "A separate dread meter builds in five confined places (the [morgue](@morgue), the walk-in freezer, Tommy's attic, Paul's hidden study and the [storm drain](@storm-drain)) and while you hide. As it rises you hear whispers, then breathing; the colour drains and the vignette closes in. At full dread the place gives you a scare: a knock, a slam, scratching, rats, or, in the morgue, a Walker stepping out behind you." },
        ],
      },
    ],
    related: ["hiding", "detection-and-noise", "morgue"],
    sources: [SRC.report, SRC.config, SRC.playtest],
    aliases: ["dread", "locker stare", "zombie stares at me", "dread encounter"],
  },
  {
    ...base,
    slug: "health-and-healing",
    title: "Health, Damage and Healing",
    seoTitle: "Health and Healing in Stillskin Forest: Regen, Food and First Aid",
    description:
      "How health works in Stillskin Forest: slow natural regeneration, healing with food and First Aid Kits, damage feedback, and protection from hit-stacking.",
    question: "How do you heal in Stillskin Forest?",
    answer:
      "Eat food (25% each) or use a First Aid Kit (75%). Health also regenerates slowly on its own, at 0.6 per second, but not while you are downed. After any hit you get 0.45 seconds in which further hits are ignored, so a crowd can't take your whole bar in one instant.",
    sections: [
      {
        id: "taking-damage",
        heading: "Taking damage",
        blocks: [
          { type: "p", text: "A hit produces a physical hit reaction, an impact sound, a red edge on screen and a health bar that flashes and jumps. Only two infected may swing at you in any 1.6-second window, and there is 0.45 seconds of grace after each hit. Below a third of your health, music and ambience go muffled." },
          { type: "table", caption: "Damage per hit", head: ["Attacker", "Damage"], rows: [
            ["[Walker](@walker)", "10"], ["[Runner](@runner)", "8"], ["[Screamer](@screamer)", "8"], ["[Brute](@brute)", "28"],
          ] },
          { type: "p", text: "Holding an item when you're hit wears it slightly. See [Durability](@durability-and-wear)." },
        ],
      },
      {
        id: "healing",
        heading: "Healing",
        blocks: [
          { type: "list", items: [
            "[Food](@food): 25%, 0.6 s to eat.",
            "[First Aid Kit](@first-aid-kit): 75%, 1.5 s to use.",
            "Natural regeneration: 0.6 health per second, not while downed.",
            "Being revived: you return at 35% health.",
          ] },
        ],
      },
      {
        id: "accessibility",
        heading: "Reduce flashing",
        blocks: [
          { type: "p", text: "The settings include a Reduce flashing option that softens the red damage flashes." },
        ],
      },
    ],
    related: ["food", "first-aid-kit", "downed-and-revive"],
    sources: [SRC.config, SRC.items, SRC.playtest],
    aliases: ["health", "hp", "heal", "regen", "damage"],
  },
  {
    ...base,
    slug: "downed-and-revive",
    title: "Downed and Revive",
    seoTitle: "How to Revive Teammates in Stillskin Forest",
    description:
      "What happens when you go down in Stillskin Forest: the 2-minute window, how to revive a teammate by holding E for 3 seconds, and coming back at dawn.",
    question: "How do you revive a teammate in Stillskin Forest?",
    answer:
      "Walk to your downed teammate and hold E for three seconds. You have 2 minutes from the moment they go down. They come back at 35% health. While downed, a player can only crawl slowly and can't use items or interact.",
    facts: [["Revive window", "2 min"], ["Hold to revive", "3 s (E)"], ["Health after revive", "35%"], ["Crawl speed", "4 studs/s"]],
    sections: [
      {
        id: "going-down",
        heading: "Going down",
        blocks: [
          { type: "p", text: "A lethal hit doesn't kill you outright while teammates are standing. You go down with a 2-minute countdown and an overlay. Movement and interaction are disabled except a slow crawl, and you don't regenerate." },
          { type: "callout", tone: "warning", text: "If you are the last survivor standing, there is no revive. A lethal hit starts the final-death sequence. See [Death, ghosts and the finale](@death-ghosts-and-the-finale)." },
        ],
      },
      {
        id: "reviving",
        heading: "Reviving",
        blocks: [
          { type: "p", text: "Hold **E** on the downed player for three seconds; letting go cancels. Clear or block the infected first: you can't fight while reviving. Reviving with real input between two players has been verified." },
        ],
      },
      {
        id: "if-time-runs-out",
        heading: "If time runs out",
        blocks: [
          { type: "p", text: "At zero the player is eliminated and becomes a ghost while the run continues. Infected chasing them disperse rather than attacking the body. Ghosts fly freely around the map and come back at dawn: see [Death, ghosts and the finale](@death-ghosts-and-the-finale)." },
        ],
      },
    ],
    related: ["death-ghosts-and-the-finale", "co-op-survival", "health-and-healing"],
    sources: [SRC.config, SRC.playtest, SRC.report],
    aliases: ["revive", "downed", "knocked down", "bleeding out", "res"],
  },
  {
    ...base,
    slug: "inventory-and-hotbar",
    lastVerified: "2026-10-29",
    title: "Inventory and Hotbar",
    seoTitle: "Inventory in Stillskin Forest: Slots, Stacking and the Backpack",
    description:
      "How the Stillskin Forest inventory works: eight slots, stacking snacks, the backpack panel, dropping items, and what doesn't take a slot.",
    question: "How many items can you carry in Stillskin Forest?",
    answer:
      "Eight different items. Identical snacks stack in one slot, ammunition is held as a reserve on your guns, and headlamp parts are fitted on pickup so they never take a slot. If your bag is full, a new item stays on the ground with a 'Your bag is full' message.",
    sections: [
      {
        id: "hotbar",
        heading: "The hotbar",
        blocks: [
          { type: "p", text: "Number keys select a slot (LB/RB cycle on a controller). The selected item lifts with a 3D preview; guns show magazine and reserve, and the coloured strip shows [durability](@durability-and-wear), turning red below 25%." },
        ],
      },
      {
        id: "backpack",
        heading: "The backpack",
        blocks: [
          { type: "p", text: "Press **B** or **Tab** to open the backpack: item cards with rarity, descriptions, stats and ammo, plus equip, use and drop buttons and the settings. It frees the mouse and blurs the background. On a controller, the D-pad navigates it." },
          { type: "p", text: "**Graphics** in the settings switches between High, Balanced and Performance. It only changes how the game looks on your device (how far tree shadows reach, how much the foliage sways, how many leaves drift), never what you can see or do. Consoles start on Performance, phones on Balanced, and PCs follow Roblox's own graphics slider. Your choice is saved." },
        ],
      },
      {
        id: "dropping",
        heading: "Dropping and sharing",
        blocks: [
          { type: "p", text: "Press **G** to drop the held item. Dropped items keep their wear. To hand something to a teammate directly, hold **E** on them; see [Co-op survival](@co-op-survival)." },
          { type: "p", text: "Up to two guns or melee weapons from your bag are shown holstered across your back." },
        ],
      },
    ],
    related: ["durability-and-wear", "food", "co-op-survival"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["inventory", "backpack", "bag", "slots", "hotbar", "drop"],
    gaps: ["An eight-slot physical layout (shoulder, hip and pocket slots) is designed but not yet the live inventory."],
  },
  {
    ...base,
    slug: "aiming-and-reloading",
    lastVerified: "2026-10-27",
    title: "Aiming, Headshots and Reloading",
    seoTitle: "Aiming and Headshots in Stillskin Forest: Damage, Spread and Reloads",
    description:
      "How aiming works in Stillskin Forest: right mouse to aim, headshot multipliers, spread, first person, aim assist on controller, and reloading.",
    question: "Do headshots do more damage in Stillskin Forest?",
    answer:
      "Yes. A headshot doubles a single bullet's damage (a Pistol hit goes from 34 to 68) and multiplies each shotgun pellet by 1.4. Headshots show a gold hitmarker and damage number. Hold right mouse to aim, which tightens your spread and slows you to 12 studs per second.",
    sections: [
      {
        id: "aiming",
        heading: "Aiming",
        blocks: [
          { type: "list", items: [
            "Right mouse (L2 on controller) to aim. The camera pulls in and your spread tightens.",
            "Your character turns to face whatever you shoot at, even behind you.",
            "V switches to first person; aiming there brings the sights to your eye line.",
            "Aim sway is gentle when rested and larger when you're winded.",
            "On controller and touch only, aiming applies a gentle pull toward targets within 7°.",
            "Shots go exactly where your crosshair is, from your eye line: hugging a car, fence or wall no longer eats the shot. See [Shooting through cover](@shooting-through-cover).",
          ] },
        ],
      },
      {
        id: "staggers",
        heading: "Staggers",
        blocks: [
          { type: "p", text: "Infected stagger from headshots, melee hits, shotgun blasts, or any hit dealing 30% or more of their health, then can't be staggered again for 1.1 seconds. A [Brute](@brute) only staggers from a headshot of 50 damage or more." },
        ],
      },
      {
        id: "reloading",
        heading: "Reloading",
        blocks: [
          { type: "p", text: "Press **R**. An empty magazine reloads automatically; switching weapons cancels the reload. The Pistol reloads in 1.6 s and the Shotgun in 2.4 s. See [Ammunition](@ammunition)." },
        ],
      },
    ],
    related: ["pistol", "shotgun", "ammunition", "weapons-compared", "shooting-through-cover"],
    sources: [SRC.config, SRC.items, SRC.playtest, SRC.playtest27],
    aliases: ["aim", "headshot", "reload", "first person", "crosshair", "aim assist"],
  },
  {
    ...base,
    slug: "shooting-through-cover",
    lastVerified: "2026-10-28",
    title: "Shooting Through Doors, Windows and Glass",
    seoTitle: "Stillskin Forest Wall-Bangs: Shooting Through Doors and Breaking Glass",
    description:
      "What bullets go through in Stillskin Forest: open doorways, glass that shatters, doors and thin wood for less damage, what stops a shot, and how to break windows.",
    question: "Can you shoot through doors and windows in Stillskin Forest?",
    answer:
      "Yes. A bullet flies through open doorways, shatters window glass and carries on (90% damage), and punches through a closed door or a thin wooden board for about half damage, up to two in a row. Concrete, plaster, brick, metal, rock and thick walls stop it. Any bullet or any melee weapon breaks a window pane in one hit, fists take six punches, and the infected break one in eight blows.",
    facts: [["Through glass", "90% damage, glass breaks"], ["Through a door or thin wood", "55% each, up to 2"], ["Stops a bullet", "Concrete, plaster, brick, metal, rock, thick walls"], ["Bullets to break a pane", "1"], ["Melee weapon hits to break a pane", "1"], ["Infected blows to break a pane", "8"]],
    sections: [
      {
        id: "what-bullets-do",
        heading: "What a bullet goes through",
        blocks: [
          { type: "table", caption: "Bullets and cover", head: ["In the way", "What happens", "Damage left"], rows: [
            ["Open doorway, anything you can see or walk through", "Passes", "100%"],
            ["Window or car glass", "Shatters and passes", "90%"],
            ["Closed door, plank wall, thin wooden board", "Punches through (a wall-bang), at most two", "55% per layer"],
            ["Concrete, plaster, brick, metal, rock, thick walls, the ground", "Stops the bullet", "0%"],
          ] },
          { type: "p", text: "Shots are traced from your eye to the crosshair, so standing right next to a car, a fence or a wall doesn't block a shot you can see. Standing on a car and shooting an infected at its wheels works. A headshot through a door still hurts more than a body shot, but it is no longer an instant kill." },
        ],
      },
      {
        id: "breaking-glass",
        heading: "Breaking glass",
        blocks: [
          { type: "table", caption: "Hits to break one window pane", head: ["With", "Hits"], rows: [
            ["Any bullet (every shotgun pellet too)", "1"],
            ["Any melee weapon: [Machete](@machete), [Baseball Bat](@baseball-bat), [Hammer](@hammer), [Crowbar](@crowbar)", "1"],
            ["[Fists](@fists)", "6"],
            ["An infected", "8"],
          ] },
          { type: "p", text: "Breaking glass is loud: it draws infected from about 45 studs. A broken pane leaves the frame open, so you can climb through a window big enough to fit. Every window is whole again at the start of a new run." },
          { type: "callout", tone: "warning", text: "The infected can see you through a window. If one spots you inside, it comes straight for the glass and smashes it in eight blows, so a window is not a wall." },
        ],
      },
    ],
    related: ["aiming-and-reloading", "doors-and-building", "weapons-compared", "fists", "detection-and-noise"],
    sources: [SRC.playtest27, SRC.playtest28],
    aliases: ["wallbang", "wall bang", "shoot through doors", "glass", "break window", "windows", "penetration", "bullet through wall"],
  },
  {
    ...base,
    slug: "weather",
    lastVerified: "2026-10-27",
    title: "Weather: Rain, Storms and Puddles",
    seoTitle: "Stillskin Forest Weather: Rain, Thunderstorms and Sneaking in the Rain",
    description:
      "Weather in Stillskin Forest: rain every few days and nights, thunderstorms, puddles that splash, and why rain makes it far easier to sneak past the infected.",
    question: "Does it rain in Stillskin Forest?",
    answer:
      "Yes, every few days and nights. Any day or night can bring rain, and it never stays dry for long. Some rains are thunderstorms with lightning and thunder. In the rain the infected see and hear far less: in a downpour they spot you at little more than half the usual distance and hear noise over a much smaller area, so it is the best time to slip past them.",
    facts: [["How often", "Every few days and nights"], ["Storms", "About 4 in 10 rains (more at night)"], ["Infected sight in a downpour", "Down by almost half"], ["Infected hearing in a downpour", "Down by about 40%"], ["Never on", "The first day of a run"]],
    sections: [
      {
        id: "when-it-rains",
        heading: "When it rains",
        blocks: [
          { type: "p", text: "Each day and each night has a chance of rain, and the forest is never dry for more than a few phases in a row. Rain fades in and out over about half a minute and can last most of a day or a night. About four rains in ten are thunderstorms, a little more often at night. It never rains on the first day of a run." },
        ],
      },
      {
        id: "sneaking",
        heading: "Sneaking in the rain",
        blocks: [
          { type: "p", text: "Rain is cover. The heavier it falls, the less the infected notice: in a full downpour they see you at a little over half their usual range and only hear noise from about 60% as far away. Gunshots still carry, just not as far." },
          { type: "callout", tone: "tip", text: "Rain is the time to cross open ground, loot a busy street or get past a pack you couldn't otherwise. It stacks with [crouching](@crouching-and-takedowns) and a headlamp switched off." },
        ],
      },
      {
        id: "storms",
        heading: "Thunderstorms",
        blocks: [
          { type: "p", text: "In a storm the wind picks up (trees sway harder and the rain slants), and lightning strikes around you every several seconds. Each strike flashes the sky; the thunder arrives a moment later, the further away the strike the longer the gap, so a close one cracks and a far one rumbles." },
        ],
      },
      {
        id: "puddles",
        heading: "Puddles",
        blocks: [
          { type: "p", text: "Puddles fill up on trails, roads and clearings while it rains and dry out slowly after. Running through one splashes loudly enough to hear, and you can hear the infected splashing through them too." },
        ],
      },
      {
        id: "look-and-sound",
        heading: "What it looks and sounds like",
        blocks: [
          { type: "list", items: [
            "The sky clouds over and the light goes grey; low mist creeps in, even by day.",
            "Rain stops at the edge of a roof: step inside and you hear it drumming overhead instead.",
            "Fewer dry leaves blow about; the trees move more.",
          ] },
        ],
      },
    ],
    related: ["detection-and-noise", "day-night-cycle", "crouching-and-takedowns", "night-survival"],
    sources: [SRC.playtest27],
    aliases: ["rain", "weather", "storm", "thunder", "lightning", "puddles", "thunderstorm"],
  },
  {
    ...base,
    slug: "climbing-and-ladders",
    title: "Climbing, Jumping and Ladders",
    seoTitle: "Can Zombies Climb in Stillskin Forest? Ladders, Roofs and Cars",
    description:
      "How climbing works in Stillskin Forest: ladders only, cars and furniture must be jumped onto, and infected climb a ladder only if they saw you use it.",
    question: "Can zombies climb ladders in Stillskin Forest?",
    answer:
      "Only if they watched you climb that ladder, and only for about 14 seconds afterward. Otherwise infected can't climb ladders, jump onto cars or furniture, or climb walls. That makes a roof reached by a ladder no chaser saw you use one of the safest places in the game.",
    sections: [
      {
        id: "ladders",
        heading: "Ladders",
        blocks: [
          { type: "p", text: "You can only climb at ladders. Press **E** at the bottom (\"Climb up\") or the top (\"Climb down\"), or walk into a ladder's foot. Jump lets go partway. Ladders lead to the hospital roof, the store roof, Tommy's attic, and the campground watchtowers." },
        ],
      },
      {
        id: "cars-and-furniture",
        heading: "Cars and furniture",
        blocks: [
          { type: "p", text: "You can't walk up onto a car or furniture; you have to jump. A jump from the ground clears the police car. Walls with ledges can't be climbed by accident." },
        ],
      },
      {
        id: "infected",
        heading: "What the infected can't do",
        blocks: [
          { type: "list", items: [
            "Jump onto cars or furniture.",
            "Climb ladders, unless one saw you climb it in the last 14 seconds.",
            "Open doors (they bash them instead; see [Doors and building](@doors-and-building)).",
          ] },
        ],
      },
    ],
    related: ["detection-and-noise", "st-agnes-hospital", "doors-and-building"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["climb", "ladder", "roof", "jump", "parkour", "can zombies climb"],
  },
  {
    ...base,
    slug: "crouching-and-takedowns",
    title: "Crouching and Takedowns",
    seoTitle: "Crouch and Stealth Takedowns in Stillskin Forest",
    description:
      "How to crouch in Stillskin Forest (C, Left Ctrl or B), how much harder it makes you to spot, and how to land a one-hit stealth takedown.",
    question: "How do stealth takedowns work in Stillskin Forest?",
    answer:
      "Crouch (C, Left Ctrl, or B on controller) and hit a calm infected from behind with a melee weapon: it's a one-blow TAKEDOWN. Crouching slows you to 8 studs per second, silences your footsteps, and makes the infected see you at only 0.55× their normal range. Brutes can't be taken down.",
    sections: [
      {
        id: "crouching",
        heading: "Crouching",
        blocks: [
          { type: "table", caption: "Crouch effects", head: ["Effect", "Value"], rows: [
            ["Speed", "8 studs/s (walk is 16)"], ["Sight range against you", "×0.55"], ["Close-range sense", "×0.6"], ["Footsteps", "Silent"],
          ] },
          { type: "p", text: "Sprinting stands you up. Other players see your crouch pose." },
        ],
      },
      {
        id: "takedowns",
        heading: "Takedowns",
        blocks: [
          { type: "list", items: [
            "Crouched, from behind, with a melee weapon.",
            "The target must be calm (not alerted or chasing).",
            "Doesn't work on a [Brute](@brute).",
            "A takedown shows a banner and counts toward achievements.",
          ] },
        ],
      },
    ],
    related: ["detection-and-noise", "baseball-bat", "machete"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["crouch", "sneak", "stealth", "takedown", "stealth kill"],
    gaps: ["Takedowns and the crouch-walk cycle are built but were not yet confirmed in a recorded playtest."],
  },
  {
    ...base,
    slug: "doors-and-building",
    lastVerified: "2026-10-27",
    title: "Doors and Building Barricades",
    seoTitle: "Building and Doors in Stillskin Forest: Planks, Hammers and Barricades",
    description:
      "How to barricade in Stillskin Forest: closing doors the infected must bash open, nailing planks with the Hammer, and prying them off with the Crowbar.",
    question: "How do you build barricades in Stillskin Forest?",
    answer:
      "Equip a Hammer, hold the click (or R2) on a surface, drag to where you want the plank to end, and release to nail it. A quick tap swings instead; a hold never swings. There is no limit on planks; each costs one point of hammer durability. An infected with a plank in its way claws at it and needs six hits to break it. Doors help too: the infected can't open them and need eight hits to bash one open.",
    sections: [
      {
        id: "doors",
        heading: "Doors",
        blocks: [
          { type: "p", text: "Stillwater has 29 working doors. Press **E** to open or close one; it swings away from you. Infected can't open doors; they bash a closed one, which bursts open after eight hits. Every door is shut and repaired at the start of each run." },
        ],
      },
      {
        id: "planks",
        heading: "Nailing planks",
        blocks: [
          { type: "table", caption: "Building rules", head: ["Rule", "Value"], rows: [
            ["Tool", "[Hammer](@hammer)"], ["Plank length", "1.5–12 studs"], ["Reach", "Both ends within 20 studs of you"], ["Cost", "1 hammer durability per plank"], ["Infected hits to break", "6 (one every 1.4 s)"], ["Crowbar swings to remove", "2"], ["Maximum", "No limit"],
          ] },
          { type: "p", text: "A green ghost board shows while you drag if the plank will fit. Planks can't overlap a player or an infected. A broken or pried plank falls and fades away." },
          { type: "p", text: "The infected claw at a plank, door or window only when they've just seen you go behind it (within about 3 seconds) or heard you there (within about 8). A base on its own, or night falling, never sets them on it, and they can't hurt you through a wall." },
        ],
      },
    ],
    related: ["hammer", "crowbar", "night-survival", "surviving-your-first-night"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["build", "base building", "barricade", "planks", "doors", "fortify"],
    gaps: ["Infected breaking planks on their own was not yet observed in a recorded playtest."],
  },
  {
    ...base,
    slug: "durability-and-wear",
    lastVerified: "2026-10-30",
    title: "Durability and Wear",
    seoTitle: "Weapon Durability in Stillskin Forest: How Long Weapons Last",
    description:
      "Weapons and tools in Stillskin Forest wear out. Durability values for each item, what causes wear, how to repair weapons, and what happens when one breaks.",
    question: "Do weapons break in Stillskin Forest?",
    answer:
      "Yes. Every weapon and tool has durability. Each landed swing, shot, nailed plank or gadget use costs 1, as does a swing that hits a wall and each hit you take while holding the item. At zero the item breaks, and you can't miss it: a loud snap and a big BROKE! notice across the screen. A gun's last shot still fires, then it snaps and drops out of your hand; the rounds in its magazine go back to your ammo reserve, so you never lose ammo with it. Melee weapons repair themselves the scavenger's way: pick up another copy of one you carry and yours goes back to full and gets 5% tougher (up to 125% of its original durability); the copy is used up. A gun is repaired with a [Gun Repair Kit](@gun-repair-kit), and finding a less worn copy of a gun you carry swaps its durability onto yours. Lanterns and the Freeze Device never wear out. Durability ranges from 110 (Machete) to 480 (Hammer) before any repairs; guns last 400 (Pistol) and 175 (Shotgun) shots.",
    sections: [
      {
        id: "values",
        heading: "Durability by item",
        blocks: [
          { type: "table", caption: "Maximum durability", head: ["Item", "Durability"], rows: [
            ["[Hammer](@hammer)", "480"], ["[Pistol](@pistol)", "400"], ["[Shotgun](@shotgun)", "175"], ["[Crowbar](@crowbar)", "140"], ["[Baseball Bat](@baseball-bat)", "120"], ["[Machete](@machete)", "110"], ["[Lantern](@lantern)", "Never wears out"], ["[Freeze Device](@freeze-device)", "Never wears out"],
          ] },
        ],
      },
      {
        id: "what-wears",
        heading: "What causes wear",
        blocks: [
          { type: "list", items: [
            "A melee swing that lands, a shot, a nailed plank: 1 each.",
            "A melee swing that hits a wall: 1.",
            "Getting hit while holding the item: 1.",
          ] },
          { type: "p", text: "The hotbar strip shows durability and turns red below 25%. Dropped items keep their wear." },
        ],
      },
      {
        id: "when-it-breaks",
        heading: "When something breaks",
        blocks: [
          { type: "list", items: [
            "A big red notice drops onto your screen naming what broke; for a gun it also says how many rounds went back to your ammo.",
            "A gun's last shot fires first. A moment later it snaps, then it falls out of your hand and clatters on the ground. The broken gun can't be picked up and disappears after a while.",
            "A melee weapon or tool snaps and is gone.",
          ] },
        ],
      },
      {
        id: "repairs",
        heading: "Repairing weapons",
        blocks: [
          { type: "table", caption: "How to repair", head: ["Weapon", "How", "Result"], rows: [
            ["Melee (bat, machete, hammer, crowbar)", "Pick up another of the same weapon", "Full durability, +5% of the original each time, up to 125%"],
            ["Guns", "Use a [Gun Repair Kit](@gun-repair-kit)", "Your most worn gun back to full"],
            ["Guns", "Pick up a less worn copy of a gun you carry", "Yours takes the better durability; its rounds go to your reserve"],
          ] },
          { type: "p", text: "A repair never makes a better weapon worse. Once a melee weapon reaches 125% further copies still repair it to full." },
        ],
      },
    ],
    related: ["weapons-compared", "inventory-and-hotbar", "gun-repair-kit"],
    sources: [SRC.config, SRC.config28, SRC.playtest28],
    aliases: ["durability", "wear", "break", "weapon breaking"],
  },
];
