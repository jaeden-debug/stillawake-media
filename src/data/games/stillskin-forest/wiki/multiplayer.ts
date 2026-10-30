import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "multiplayer", verification: "verified_live", lastVerified: VERIFIED } as const;

export const multiplayer: WikiEntry[] = [
  {
    ...base,
    slug: "co-op-survival",
    lastVerified: "2026-10-28",
    title: "Co-op Survival: Revives, Pings and Sharing",
    seoTitle: "Stillskin Forest Co-op Guide: Revives, Pings and Giving Items",
    description:
      "How to survive as a squad in Stillskin Forest: reviving, pinging infected and loot, giving items and ammo, and what your team shares.",
    question: "How does co-op work in Stillskin Forest?",
    answer:
      "Squads share one run. You revive downed teammates by holding E for three seconds, ping infected, loot or your position with T (X on controller) so the squad sees a marker for 8 seconds, and hold E on a teammate to give them your held item, or half your ammo if your hands are empty. Story progress such as the asylum unlock and relic count is shared.",
    sections: [
      {
        id: "squad-markers",
        heading: "Finding your squad",
        blocks: [
          { type: "p", text: "Every teammate has a colour of their own, the same on everyone's screen, so you can always find each other:" },
          { type: "list", items: [
            "**Outline through walls:** a coloured outline on their body that shows through trees and buildings, filling in faintly when something blocks your view and fading when they're right beside you.",
            "**Name tag:** their name and distance in metres above them, smaller the further away they are.",
            "**Edge pointer:** when a teammate is off screen or behind you, an arrow at the edge of your screen points their way, with their name and distance.",
            "**Downed:** a downed teammate's marker turns red and pulses, with DOWN next to their name.",
          ] },
          { type: "p", text: "Markers work across the map: in testing, the edge pointer led straight to a teammate 157 m away." },
        ],
      },
      {
        id: "revives",
        heading: "Revives",
        blocks: [
          { type: "p", text: "A downed teammate has 2 minutes. Hold **E** on them for 3 seconds and they're back at 35% health. Full details in [Downed and revive](@downed-and-revive)." },
        ],
      },
      {
        id: "pings",
        heading: "Pings",
        blocks: [
          { type: "p", text: "Press **T** or middle mouse (X on controller). Pings are labelled INFECTED, LOOT or HERE, show the distance and who pinged, last 8 seconds, and reach up to 300 studs. They work in matches, not in the lobby." },
        ],
      },
      {
        id: "giving",
        heading: "Giving items",
        blocks: [
          { type: "p", text: "Hold **E** on a teammate to hand over the item in your hands. With empty hands you give them half your ammunition instead. It respects their bag space." },
        ],
      },
      {
        id: "shared-progress",
        heading: "Shared progress",
        blocks: [
          { type: "list", items: [
            "One player reading the [ledger](@blackthorn-admission-ledger) unlocks the asylum for everyone.",
            "Relics count toward one shared total.",
            "One player can hold [the ritual](@the-rite-of-stillness); everyone gets the ending.",
            "Placed [lanterns](@lantern) can be picked up by anyone.",
          ] },
          { type: "callout", tone: "note", text: "Revives, the shared asylum unlock, shared relics and the ritual have been verified with two players. Pings and giving are built but not yet confirmed in a recorded two-player test." },
        ],
      },
    ],
    related: ["playing-with-friends", "downed-and-revive", "death-ghosts-and-the-finale"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["co-op", "coop", "team", "ping", "pings", "give items", "share ammo", "teamwork"],
  },
  {
    ...base,
    slug: "death-ghosts-and-the-finale",
    lastVerified: "2026-10-30",
    title: "Death, Ghosts and the Rooftop Finale",
    seoTitle: "What Happens When You Die in Stillskin Forest: Ghosts and the Finale",
    description:
      "What happens when you die in Stillskin Forest: flying as a ghost, respawning at dawn, the last-survivor sequence, the rooftop finale and Return to Camp.",
    question: "What happens when you die in Stillskin Forest?",
    answer:
      "If your teammates are still alive, you become a ghost: you fly freely around the map (or follow a teammate) and respawn beside a survivor when dawn breaks. When the last survivor falls, the run ends: everyone appears on the roof of St. Agnes Hospital with their stat cards while the infected walk in and dance, the camera tours the map, and players choose Return to Camp to start a new run on Day 1.",
    sections: [
      {
        id: "ghost-mode",
        heading: "Ghost mode",
        blocks: [
          { type: "p", text: "An eliminated player's avatar breaks apart and they become a ghost while teammates fight on. The infected that were after them disperse rather than attacking the body." },
          { type: "list", items: [
            "**Fly:** ghosts fly by default. Move with **WASD** (or the left stick) in the direction you look, **Space** and **Ctrl** to rise and sink, **Shift** to go faster. Hold the right mouse button (or use the right stick) to look around.",
            "**Follow a survivor:** **Q** / **E** (LB / RB) switch to watching a teammate; **F** (Y) flies again.",
            "**Back at dawn:** when dawn breaks, every ghost respawns next to a teammate who is still standing. You keep your ammo.",
            "**Your backpack:** what you carried is packed into a backpack where you fell. Only you can open it (hold E, \"Recover Backpack\"); anything that doesn't fit stays in it for later. It lasts three dawns.",
            "If nobody is left standing, a normal run is over. In a [persistent expedition](@persistent-expeditions) the night passes instead and everyone wakes at base at the next dawn.",
          ] },
        ],
      },
      {
        id: "the-last-survivor",
        heading: "The last survivor",
        blocks: [
          { type: "p", text: "The final survivor doesn't get a revive window. A lethal hit starts a short final-death sequence, and the last-survivor music begins as it happens." },
        ],
      },
      {
        id: "the-finale",
        heading: "The rooftop finale",
        blocks: [
          { type: "list", items: [
            "The result cards land on the music's transition: day reached, nights survived, kills and revives.",
            "The squad stands on the roof of [St. Agnes Hospital](@st-agnes-hospital).",
            "Infected walk in from out of frame and dance, point, laugh and headbang around the lineup.",
            "The camera tours the hospital, the camp lake and dock, the forest, a cabin, the police car and a burning dumpster.",
            "Each player chooses **Return to Camp** to start the next run.",
          ] },
          { type: "p", text: "Winning ([the ritual](@the-rite-of-stillness) or [the Heart](@the-heart-of-stillskin)) no longer ends the run: you keep playing until the last survivor falls, and that end screen shows the win, without the laughing horde." },
        ],
      },
      {
        id: "out-of-bounds",
        heading: "Leaving the map",
        blocks: [
          { type: "p", text: "The woods darken toward the edge of the map. Step outside and a TURN BACK countdown starts from 10, costing 10% of your health each second. Step back in to clear it; reach zero and you're out of the run with no revive." },
        ],
      },
    ],
    related: ["downed-and-revive", "co-op-survival", "how-to-play"],
    sources: [SRC.config, SRC.playtest, SRC.report],
    aliases: ["death", "die", "ghost", "spectate", "spectator", "end of run", "return to camp", "finale", "zombie dance", "stats"],
    gaps: ["Return to Camp voting with several real clients has not been recorded yet."],
  },
  {
    ...base,
    slug: "persistent-expeditions",
    lastVerified: "2026-10-30",
    title: "Persistent Expeditions: Saved Worlds and Crews",
    seoTitle: "Stillskin Forest Expeditions: Save Your World and Play With Your Crew",
    description:
      "Persistent expeditions in Stillskin Forest: three save slots, autosave, Save & Leave, returning on the same day, inviting a crew, and what happens when all fall.",
    question: "Can you save your world in Stillskin Forest?",
    answer:
      "Yes. At camp, press EXPEDITIONS to start a persistent world in one of three slots. It saves on its own (every minute and a half, at each dawn, when someone leaves) and with SAVE & LEAVE, and when you come back you continue on the same day and phase: your planks, the rite, your bag, ammo, armour and headlamp batteries are as you left them. Add friends as crew so they can join; the owner decides whether the crew can keep playing without them.",
    facts: [["Slots", "3 per player"], ["Autosave", "About every 90 s, each dawn, when a player leaves"], ["Who can join", "Owner and crew"], ["Crew without the owner", "Only if the owner turns Offline ON"], ["Everyone falls", "Wake at base next dawn"]],
    sections: [
      {
        id: "what-is-kept",
        heading: "What a saved world keeps",
        blocks: [
          { type: "list", items: [
            "The day, the phase and how far into it you were.",
            "Every plank you nailed up, the asylum, the relics laid in the circle and the rite (done stays done), and a win you already earned.",
            "Each survivor's bag (with each item's wear and magazine), ammo, headlamp and spare batteries, goggles, armour and the personal finds they've made.",
            "Recovery backpacks still lying where someone fell.",
          ] },
          { type: "p", text: "The infected, loot lying around, doors and glass, the weather and generator fuel start fresh each time. Nothing happens while nobody is playing: time stands still and nobody can die offline." },
        ],
      },
      {
        id: "crew",
        heading: "Playing with a crew",
        blocks: [
          { type: "p", text: "In the expedition's card, Crew lists your friends; add the ones you want. They'll see your world under CREW EXPEDITIONS at camp and can Join it while you're playing, or Continue it on their own if you've turned Offline ON (their progress is shared with yours). Someone joining a world on Day 20 for the first time starts with a basic kit at base and a short welcome; they don't get anyone else's gear or finds." },
        ],
      },
      {
        id: "dying",
        heading: "Dying in an expedition",
        blocks: [
          { type: "p", text: "You come back at the next dawn as usual. If everyone falls, the day and night pass and the whole crew wakes at base, the shelter you last slept in. Your gear waits in your recovery backpack where you fell. See [Death and ghosts](@death-ghosts-and-the-finale)." },
        ],
      },
    ],
    related: ["co-op-survival", "death-ghosts-and-the-finale", "night-survival"],
    sources: [SRC.config, SRC.playtest],
    aliases: ["save", "saving", "expedition", "expeditions", "persistent world", "save slots", "continue", "crew"],
    gaps: ["Crew joining a Day 20 world was tested in Studio with four players (owner restored, crew given the starter kit, a non-crew player refused); joining a world running on another live server has not been tested yet."],
  },
];
