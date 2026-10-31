import type { WikiEntry, WikiSection } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "weapons", verification: "verified_live", lastVerified: VERIFIED } as const;

const meleeTiers: WikiSection = {
  id: "upgrade-tiers",
  heading: "Upgrade tiers",
  blocks: [
    { type: "table", caption: "Melee upgrade tiers (multipliers on base stats)", head: ["Tier", "Name", "Damage", "Time between swings", "Knockback"], rows: [
      ["I", "Worn", "×1", "×1", "×1"],
      ["II", "Sharpened", "×1.25", "×0.9", "×1"],
      ["III", "Reinforced", "×1.5", "×0.8", "×1.3"],
    ] },
    { type: "callout", tone: "note", text: "Found weapons roll a rarity when they spawn, and rarer finds come at a higher tier. Picking up a rarer copy of a weapon you already carry upgrades yours." },
    { type: "p", text: "**Picking up a second one repairs yours.** If you already carry this weapon and find another, your own is repaired to full and gets a little tougher (+5% of its original durability each time, up to 125%). The copy you found is used up. Every melee weapon also breaks a window pane in one hit. See [Durability](@durability-and-wear)." },
  ],
};

const chargedAttack: WikiSection = {
  id: "charged-attack",
  heading: "Charged attack",
  blocks: [
    { type: "p", text: "Hold the attack button (click or R2) to wind up: you'll see the arm drawn back. Let go to strike. A full wind-up (about a second) hits twice as hard and knocks the infected back, but you take longer to recover before the next swing. A quick tap swings as normal, on release. Put the weapon away mid-wind-up and nothing happens." },
    { type: "p", text: "Swings, charged or not, don't land through walls or planks. Hitting a teammate only shoves them: nobody on your team ever loses health to you." },
  ],
};

const gunTiers: WikiSection = {
  id: "upgrade-tiers",
  heading: "Upgrade tiers",
  blocks: [
    { type: "table", caption: "Gun upgrade tiers (multipliers on base stats)", head: ["Tier", "Name", "Damage", "Spread", "Reload time", "Magazine"], rows: [
      ["I", "Standard", "×1", "×1", "×1", "+0"],
      ["II", "Tuned", "×1.15", "×0.85", "×0.85", "+2"],
      ["III", "Custom", "×1.3", "×0.7", "×0.7", "+4"],
    ] },
    { type: "callout", tone: "note", text: "Found weapons roll a rarity when they spawn, and rarer finds come at a higher tier. Picking up a rarer copy of a weapon you already carry upgrades yours." },
  ],
};

export const weapons: WikiEntry[] = [
  {
    ...base,
    slug: "weapons-compared",
    lastVerified: "2026-10-31",
    title: "Stillskin Forest Weapons Compared",
    seoTitle: "Stillskin Forest Weapons: Every Weapon Compared (Damage, Speed, Range)",
    description:
      "Every Stillskin Forest weapon side by side: damage, attack speed, range, magazine, reload and durability for the bat, machete, hammer, crowbar, pistol, shotgun.",
    question: "What is the best weapon in Stillskin Forest?",
    answer:
      "There is no single best weapon. The Machete deals the most damage per swing (40, or 80 with a full charged wind-up) and the Hammer knocks infected furthest; the Pistol is the accurate long-range option (34 damage, 12-round magazine); the Shotgun fires six 18-damage pellets and wins any fight at close range, but it is the loudest thing you can do. Most survivors carry one melee weapon and one gun.",
    sections: [
      {
        id: "melee",
        heading: "Melee weapons",
        blocks: [
          { type: "table", caption: "Melee weapon base stats (Tier I)", head: ["Weapon", "Damage", "Charged hit", "Time between swings", "Range", "Knockback", "Durability"], rows: [
            ["[Baseball Bat](@baseball-bat)", "25", "50", "0.55 s", "5.5", "30", "120"],
            ["[Machete](@machete)", "40", "80", "0.6 s", "5.5", "22", "110"],
            ["[Hammer](@hammer)", "32", "No wind-up", "0.75 s", "5", "48", "480"],
            ["[Crowbar](@crowbar)", "18", "36", "0.5 s", "5", "20", "140"],
            ["[Fists](@fists)", "17", "34", "0.55 s", "4.5", "10", "Never wear out"],
          ] },
          { type: "p", text: "**Charged attacks.** Hold the attack button with a melee weapon or empty hands to wind up, then let go: a full wind-up (about a second) hits twice as hard and knocks the infected back, at the cost of a slower recovery. Quick taps swing and punch as normal. The [Hammer](@hammer) has no wind-up, because holding it builds instead." },
          { type: "p", text: "Melee is quiet: a swing is heard by infected within 25 studs, compared with 90 for a pistol shot. A crouched hit from behind on an infected that hasn't noticed you is an instant [takedown](@crouching-and-takedowns)." },
        ],
      },
      {
        id: "guns",
        heading: "Guns",
        blocks: [
          { type: "table", caption: "Gun base stats (Tier I)", head: ["Weapon", "Damage", "Pellets", "Magazine", "Reload", "Time between shots", "Range", "Durability", "Ammo"], rows: [
            ["[Pistol](@pistol)", "34", "1", "12", "1.6 s", "0.22 s", "250", "400", "[Pistol Ammo](@ammunition)"],
            ["[Shotgun](@shotgun)", "18 per pellet", "6", "6", "2.4 s", "0.8 s", "70", "175", "[Shells](@ammunition)"],
            ["[Mini AK](@mini-ak)", "26", "1", "20", "2.4 s", "0.12 s (automatic)", "320", "350", "[Rifle Rounds](@ammunition)"],
          ] },
          { type: "p", text: "A headshot from any gun, or a single shotgun pellet to the head, kills an infected outright. The exception is a helmeted [Soldier](@soldier), whose helmet absorbs the first headshot. See [Aiming and reloading](@aiming-and-reloading)." },
          { type: "p", text: "Pistols and shotguns turn up in ordinary scavenging: houses, the store, the hospital, the airfield, stashes and night caches, and now and then on the trail. They are still rarer than food and melee weapons. A [Gun Repair Kit](@gun-repair-kit) restores a worn gun to full; a [Gun Cleaning Kit](@gun-cleaning-kit) gives back about a third of its condition. A gun you drop keeps its condition, so picking it up again gives you the same gun, just with an empty magazine (the rounds stayed with you)." },
        ],
      },
      {
        id: "hits-to-kill",
        heading: "Hits to bring down each infected",
        blocks: [
          { type: "table", caption: "Body hits needed at Tier I (derived from damage and health)", head: ["Weapon", "Walker (100)", "Runner (60)", "Screamer (70)", "Brute (320)"], rows: [
            ["Baseball Bat", "4", "3", "3", "13"],
            ["Machete", "3", "2", "2", "8"],
            ["Hammer", "4", "2", "3", "10"],
            ["Crowbar", "6", "4", "4", "18"],
            ["Fists", "6", "4", "5", "19"],
            ["Pistol (body)", "3", "2", "3", "10"],
            ["Any gun (head)", "1", "1", "1", "1"],
          ] },
          { type: "callout", tone: "note", text: "These are worked out from base damage and enemy health. They ignore upgrade tiers and charged attacks, which roughly halve the count. A headshot kills any of these outright. A full shotgun blast at close range (6 × 18 = 108) drops a Walker if every pellet lands." },
        ],
      },
      {
        id: "which-to-carry",
        heading: "Which to carry",
        blocks: [
          { type: "list", items: [
            "**Quiet scavenging:** Machete or Baseball Bat.",
            "**Building a defence:** [Hammer](@hammer) (it nails planks) plus a [Crowbar](@crowbar) to take them down again.",
            "**Holding a corridor:** Shotgun, with the understanding that it calls everything within 120 studs.",
            "**Picking off a Screamer before it calls the horde:** Pistol, aimed at the head.",
          ] },
        ],
      },
    ],
    related: ["baseball-bat", "machete", "pistol", "shotgun", "fists", "enemy-comparison"],
    sources: [SRC.items, SRC.config, SRC.playtest, SRC.notes30, SRC.publish31],
    aliases: ["weapons", "best weapon", "weapon tier list", "guns", "melee", "damage", "charged attack", "heavy attack"],
  },
  {
    ...base,
    slug: "fists",
    lastVerified: "2026-10-31",
    title: "Fists",
    seoTitle: "Punching in Stillskin Forest: Fists, Charged Punches and Damage",
    description:
      "Yes, you can punch zombies in Stillskin Forest. With empty hands, click or R2 to punch for 17, or hold to wind up a charged punch for 34. A last resort.",
    question: "Can you punch zombies in Stillskin Forest?",
    answer:
      "Yes. With nothing in your hands, click (R2 on controller) to punch for 17 damage, or hold to wind up and let go for a charged punch that hits twice as hard (34) and knocks the infected back. It's a last resort: weaker than any weapon, and it takes six punches to drop a Walker.",
    facts: [
      ["Type", "Unarmed"], ["Damage", "17"], ["Charged punch", "34, with knockback"], ["Time between punches", "0.55 s"],
      ["Range", "4.5 studs"], ["Knockback", "10"], ["Durability", "Never wears out"], ["Controls", "Click / R2 with empty hands"],
    ],
    sections: [
      {
        id: "how-to-punch",
        heading: "How to punch",
        blocks: [
          { type: "p", text: "Put away whatever you're holding so your hands are empty, then click (R2 on controller). A quick tap throws a jab: 17 damage, a little knockback, and about half a second before the next one." },
          { type: "p", text: "Hold the button instead to wind up: you'll see the arm drawn back. Let go to strike. A full wind-up (about a second) hits twice as hard (34) and knocks the infected back, but you take longer to recover. See [Charged attacks](@weapons-compared)." },
        ],
      },
      {
        id: "how-strong",
        heading: "How strong it is",
        blocks: [
          { type: "table", caption: "Punches needed at base damage (derived from damage and health)", head: ["Infected", "Jabs", "Charged punches"], rows: [
            ["[Walker](@walker) (100)", "6", "3"],
            ["[Runner](@runner) (60)", "4", "2"],
            ["[Screamer](@screamer) (70)", "5", "3"],
            ["[Brute](@brute) (320)", "19", "10"],
          ] },
          { type: "p", text: "Punches are quiet like any melee hit, never run out and never wear out, but they're weaker and shorter-reaching than every weapon. They don't land through walls or planks, and a window pane takes several punches to break where any melee weapon breaks it in one. You can't punch while hiding." },
        ],
      },
      {
        id: "teammates",
        heading: "Punching a teammate",
        blocks: [
          { type: "p", text: "Punching a teammate only gives them a shove. Nobody on your team ever loses health to you, so there's no way to knock a friend down." },
        ],
      },
      {
        id: "instead",
        heading: "Better options",
        blocks: [
          { type: "list", items: [
            "**[Baseball Bat](@baseball-bat):** the common starter melee weapon, with good knockback.",
            "**[Machete](@machete):** the hardest-hitting melee weapon.",
            "**[Hammer](@hammer):** heavy knockback, and it nails planks for building.",
            "**[Crowbar](@crowbar):** fast and weak, and it takes planks down.",
          ] },
          { type: "p", text: "See [Weapons compared](@weapons-compared) and [Shooting through cover](@shooting-through-cover)." },
        ],
      },
    ],
    related: ["weapons-compared", "baseball-bat", "machete", "crouching-and-takedowns"],
    sources: [SRC.notes30, SRC.publish31],
    aliases: ["punch", "fist", "unarmed", "bare hands", "melee without weapon", "charged punch"],
  },
  {
    ...base,
    slug: "baseball-bat",
    lastVerified: "2026-10-31",
    title: "Baseball Bat",
    seoTitle: "Baseball Bat in Stillskin Forest: Damage, Speed and Tips",
    description:
      "The Baseball Bat in Stillskin Forest: 25 damage, 0.55 s between swings, strong knockback and 120 durability. How it compares and how to use it.",
    question: "How good is the Baseball Bat in Stillskin Forest?",
    answer:
      "The Baseball Bat is a common melee weapon: 25 damage per swing, 0.55 seconds between swings, 5.5 studs of reach and solid knockback (30). It takes four body hits to drop a Walker and has 120 durability.",
    facts: [
      ["Type", "Melee"], ["Damage", "25"], ["Time between swings", "0.55 s"], ["Range", "5.5 studs"],
      ["Knockback", "30"], ["Durability", "120"], ["Rarity", "Rolled when found"],
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "Solid wood with a taped grip. Bats turn up in houses, the store, the cabins and along the trail. Its knockback pushes an infected back out of swing range, which buys time against one or two at once. Three swings took a Walker from 100 to 25 health in testing; the fourth finishes it." },
        ],
      },
      {
        id: "strengths-and-weaknesses",
        heading: "Strengths and weaknesses",
        blocks: [
          { type: "list", items: [
            "**Strengths:** quiet (heard within 25 studs), no ammunition, fast swings, good knockback, durable.",
            "**Weaknesses:** lowest damage of the bat/machete/hammer group; poor against a [Brute](@brute) (13 hits).",
          ] },
        ],
      },
      {
        id: "tips",
        heading: "Tips",
        blocks: [
          { type: "list", items: [
            "Swing, step back, swing. Knockback plus a step keeps you out of a Walker's reach.",
            "Crouch and hit an unaware infected from behind for a one-blow [takedown](@crouching-and-takedowns) (not a Brute).",
            "Swinging into a wall wears the bat by 1. Every landed swing and every hit you take while holding it wears it too. See [Durability](@durability-and-wear).",
            "A full charged swing hits for 50: two of them drop a Walker.",
          ] },
        ],
      },
      chargedAttack,
      meleeTiers,
    ],
    related: ["machete", "hammer", "weapons-compared", "walker"],
    sources: [SRC.items, SRC.config, SRC.playtest, SRC.notes30, SRC.publish31],
    aliases: ["bat"],
    gaps: ["Exact loot locations and drop rates not published."],
  },
  {
    ...base,
    slug: "machete",
    lastVerified: "2026-10-31",
    title: "Machete",
    seoTitle: "Machete in Stillskin Forest: Damage, Speed and Tips",
    description:
      "The Machete in Stillskin Forest: 40 damage per swing, the hardest-hitting melee weapon, with 0.6 s between swings and 110 durability.",
    question: "Is the Machete better than the bat in Stillskin Forest?",
    answer:
      "For damage, yes. The Machete hits for 40, the most of any melee weapon, so it drops a Walker in three swings instead of four. It swings slightly slower (0.6 s against the bat's 0.55 s), has less knockback (22) and breaks a little sooner (110 uses).",
    facts: [
      ["Type", "Melee"], ["Damage", "40"], ["Time between swings", "0.6 s"], ["Range", "5.5 studs"],
      ["Knockback", "22"], ["Durability", "110"], ["Rarity", "Rolled when found"],
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "Rusty but sharp. The Machete is the melee weapon to keep if damage matters most. It two-shots a [Runner](@runner) or [Screamer](@screamer) and needs eight hits on a [Brute](@brute)." },
        ],
      },
      {
        id: "strengths-and-weaknesses",
        heading: "Strengths and weaknesses",
        blocks: [
          { type: "list", items: [
            "**Strengths:** highest melee damage, quiet, no ammunition.",
            "**Weaknesses:** less knockback than the bat or hammer, so infected stay closer after each hit. A charged swing (80 damage) adds knockback when you need room.",
          ] },
        ],
      },
      chargedAttack,
      meleeTiers,
    ],
    related: ["baseball-bat", "hammer", "weapons-compared"],
    sources: [SRC.items, SRC.config, SRC.notes30, SRC.publish31],
    aliases: ["knife", "blade"],
  },
  {
    ...base,
    slug: "hammer",
    lastVerified: "2026-10-31",
    title: "Hammer",
    seoTitle: "Hammer in Stillskin Forest: Damage, Building and Tips",
    description:
      "The Hammer in Stillskin Forest: 32 damage, the biggest knockback of any weapon, 480 durability, and the only tool that nails planks for building.",
    question: "What does the Hammer do in Stillskin Forest?",
    answer:
      "The Hammer is a heavy melee weapon (32 damage, 0.75 s between swings, 48 knockback) and the building tool. A quick tap swings; holding the click (or R2) and dragging across a surface nails a plank, costing one point of the hammer's 480 durability. A hold never swings, even if you let go without placing a plank.",
    facts: [
      ["Type", "Melee / builder"], ["Damage", "32"], ["Time between swings", "0.75 s"], ["Range", "5 studs"],
      ["Knockback", "48"], ["Durability", "480"], ["Rarity", "Rolled when found"],
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "Slow, but it staggers what it hits and sends it flying: the Hammer has the strongest knockback of any weapon. It is also the only way to build. See [Doors and building](@doors-and-building)." },
          { type: "p", text: "**No charged attack.** Other melee weapons wind up when you hold the button, but holding with the Hammer is how you nail planks, so it only ever swings on a quick tap." },
        ],
      },
      {
        id: "where-to-find",
        heading: "Where to find it",
        blocks: [
          { type: "p", text: "Hammers are easy to find, above all in the campground cabins, the campsite sheds and the ranger station, then houses and the store. On the first two days of a run there is always at least one lying around for each survivor (up to four), and one that's taken is replaced. It lasts a long time: 480 durability, three times the old value. The lobby shop also sells one as a supply for a run. Like any supply bought with Embers or Robux, once it's in the run you can hand it to or drop it for your crew. Hammers bought before the 31 Oct 2026 update stay with the player who bought them." },
        ],
      },
      meleeTiers,
    ],
    related: ["crowbar", "doors-and-building", "weapons-compared"],
    sources: [SRC.items, SRC.config, SRC.playtest, SRC.publish31],
    aliases: ["build", "builder"],
  },
  {
    ...base,
    slug: "crowbar",
    lastVerified: "2026-10-31",
    title: "Crowbar",
    seoTitle: "Crowbar in Stillskin Forest: Prying Planks and Combat",
    description:
      "The Crowbar in Stillskin Forest: a fast 18-damage pry bar that takes a nailed plank down in two swings. Stats, uses and tips.",
    question: "What is the Crowbar for in Stillskin Forest?",
    answer:
      "The Crowbar is a pry bar. Two swings take a nailed plank down, which is how you remove a barricade. It also works as a fast but weak weapon: 18 damage, 0.5 seconds between swings, 140 durability.",
    facts: [
      ["Type", "Melee / pry tool"], ["Damage", "18"], ["Time between swings", "0.5 s"], ["Range", "5 studs"],
      ["Knockback", "20"], ["Durability", "140"], ["Rarity", "Rolled when found"],
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "The Crowbar pairs with the [Hammer](@hammer): one builds, the other unbuilds. Against the infected it is the weakest melee option (six hits on a Walker), so treat it as a tool you can fight with in a pinch. A full charged swing (36) halves that to three." },
        ],
      },
      chargedAttack,
      meleeTiers,
    ],
    related: ["hammer", "doors-and-building", "weapons-compared"],
    sources: [SRC.items, SRC.config, SRC.playtest, SRC.notes30, SRC.publish31],
    aliases: ["pry bar"],
  },
  {
    ...base,
    slug: "pistol",
    lastVerified: "2026-10-30",
    title: "Pistol",
    seoTitle: "Pistol in Stillskin Forest: Damage, Magazine, Reload and Tips",
    description:
      "The Pistol in Stillskin Forest: 34 damage, 12-round magazine, 1.6 s reload and 250-stud range. A headshot kills outright. Stats and tips.",
    question: "How does the Pistol work in Stillskin Forest?",
    answer:
      "The Pistol fires one 34-damage bullet up to 250 studs, with a 12-round magazine, 0.22 seconds between shots and a 1.6-second reload. A headshot kills any infected outright, except a helmeted Soldier's first. It uses Pistol Ammo, and every shot is heard by infected up to 90 studs away.",
    facts: [
      ["Type", "Gun"], ["Damage", "34 (headshot kills)"], ["Magazine", "12"], ["Reload", "1.6 s"],
      ["Time between shots", "0.22 s"], ["Range", "250 studs"], ["Ammo", "Pistol Ammo"], ["Durability", "400"], ["Rarity", "Rolled when found"],
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "A reliable sidearm with long range (250 studs; only the Mini AK and Hunting Rifle reach further). Found guns come loaded. Pressing **R** moves rounds from your reserve into the magazine, and an empty gun reloads by itself. Switching away cancels a reload." },
        ],
      },
      {
        id: "aiming",
        heading: "Aiming and headshots",
        blocks: [
          { type: "p", text: "Aiming with right mouse tightens your spread considerably. A headshot kills an infected outright and shows a gold hitmarker. A helmeted [Soldier](@soldier) loses its helmet to the first one instead. See [Aiming and reloading](@aiming-and-reloading)." },
        ],
      },
      {
        id: "tips",
        heading: "Tips",
        blocks: [
          { type: "list", items: [
            "One headshot drops any infected except a helmeted Soldier.",
            "Kill a [Screamer](@screamer) at range before it calls the nearest six infected within 100 studs.",
            "Every shot pulls in calm infected within 90 studs. Fire, then move.",
          ] },
        ],
      },
      gunTiers,
    ],
    related: ["shotgun", "ammunition", "aiming-and-reloading", "weapons-compared"],
    sources: [SRC.items, SRC.config, SRC.playtest],
    aliases: ["gun", "handgun", "sidearm"],
  },
  {
    ...base,
    slug: "shotgun",
    lastVerified: "2026-10-30",
    title: "Shotgun",
    seoTitle: "Shotgun in Stillskin Forest: Damage, Shells, Reload and Tips",
    description:
      "The Shotgun in Stillskin Forest: six 18-damage pellets, 6-shell magazine, 2.4 s reload, 70-stud range. Devastating up close, heard 120 studs away.",
    question: "How strong is the Shotgun in Stillskin Forest?",
    answer:
      "The Shotgun fires six pellets of 18 damage each (108 if all hit), enough to drop a Walker in one blast at close range. It holds six Shells, takes 2.4 seconds to reload, reaches 70 studs, and is the loudest weapon in the game: every shot is heard 120 studs away.",
    facts: [
      ["Type", "Gun"], ["Damage", "6 × 18 per shot"], ["Magazine", "6"], ["Reload", "2.4 s"],
      ["Time between shots", "0.8 s"], ["Range", "70 studs"], ["Ammo", "Shells"], ["Durability", "175"], ["Rarity", "Rolled when found"],
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          { type: "p", text: "Devastating up close. The spread is wide, so damage falls off quickly with distance, and a single pellet to the head kills outright. Shotgun hits always stagger an infected." },
        ],
      },
      {
        id: "strengths-and-weaknesses",
        heading: "Strengths and weaknesses",
        blocks: [
          { type: "list", items: [
            "**Strengths:** highest burst damage; staggers; can stop a [Brute](@brute) charge.",
            "**Weaknesses:** loudest weapon (120-stud noise), short range, slow reload, and it wears out sooner than the Pistol (175 shots against 400).",
          ] },
        ],
      },
      gunTiers,
    ],
    related: ["pistol", "ammunition", "brute", "weapons-compared"],
    sources: [SRC.items, SRC.config, SRC.playtest],
    aliases: ["shot gun"],
  },
  {
    ...base,
    slug: "freeze-device",
    lastVerified: "2026-10-31",
    title: "Freeze Device",
    seoTitle: "Freeze Device in Stillskin Forest: How to Get It and How It Works",
    description:
      "The Freeze Device in Stillskin Forest freezes the infected in front of you for 10 seconds (Brutes 6) and takes a quarter of their health. Where to claim it.",
    question: "What does the Freeze Device do?",
    answer:
      "The Freeze Device is a rewired signal remote that throws a cone of cold in the direction you aim. Every infected in that cone, up to 42 studs away and in clear sight, freezes for 10 seconds (a Brute for 6) and loses a quarter of its maximum health. It recharges in 5 seconds and never wears out. Each survivor claims their own from the nurse-station counter in Blackthorn Asylum, and can go back for it if it's dropped or lost.",
    facts: [
      ["Type", "Gadget"], ["Range", "42 studs, in front of you"], ["Freeze", "10 s (Brutes 6 s)"], ["Damage", "25% of max health"],
      ["Recharge", "5 s"], ["Durability", "Never wears out"], ["Rarity", "Legendary"], ["Location", "Blackthorn Asylum nurse station"],
    ],
    sections: [
      {
        id: "getting-it",
        heading: "Getting it",
        blocks: [
          { type: "p", text: "Once [Blackthorn Asylum](@blackthorn-asylum) is open and its residents wake, the Freeze Device sits on the nurse-station counter. Walk up and press E (Square on controller) to claim it." },
          { type: "list", items: [
            "Every survivor in the server can claim their own. One player taking theirs doesn't take anyone else's.",
            "It stays yours. If you drop or lose it, go back to the counter and you get your own one back, exactly as you left it.",
            "If a teammate is carrying yours, or it's packed in a backpack, the counter won't give you another; it tells you where yours is.",
            "If it's gone for good, the counter gives you a replacement, at most once per in-game day.",
          ] },
        ],
      },
      {
        id: "how-to-use",
        heading: "How to use it",
        blocks: [
          { type: "p", text: "Equip it and fire (click or R2) where you're aiming. Everything in the cone in front of you freezes at once, so it's made for a group coming down a corridor or through a door. Walls and closed doors block it: only infected you can see are hit." },
          { type: "list", items: [
            "Frozen infected can't move, chase or attack, but they can still be hit.",
            "Each shot takes 25% of each target's maximum health, once. An infected already at a quarter or less dies.",
            "Frost creeps over a frozen infected. Two seconds before it breaks free the ice pulses and cracks, then it shatters.",
            "Hitting one that's already frozen still takes a quarter of its health, but only adds 2 seconds to the freeze, and nothing stays frozen longer than 14 seconds in a row.",
            "Just after it thaws, an infected shakes the next freeze off twice as fast (for about 6 seconds).",
            "Firing again inside the 5-second recharge tells you how long is left.",
          ] },
          { type: "callout", tone: "tip", text: "Save it for [the Rite of Stillness](@the-rite-of-stillness): a shot into the doorway when a wave arrives buys real time." },
        ],
      },
    ],
    related: ["blackthorn-asylum", "the-rite-of-stillness", "brute", "weapons-compared"],
    sources: [SRC.items28, SRC.config28, SRC.playtest28, SRC.publish31],
    aliases: ["freeze", "freeze gun", "signal remote", "remote", "tv remote", "gadget", "ice gun"],
    gaps: ["Performance with a very large herd and on phones has not been measured. Its sounds have not been reviewed by the developer yet."],
  },
];
