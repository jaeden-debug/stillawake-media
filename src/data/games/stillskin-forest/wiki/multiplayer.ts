import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "multiplayer", verification: "verified_live", lastVerified: VERIFIED } as const;

export const multiplayer: WikiEntry[] = [
  {
    ...base,
    slug: "co-op-survival",
    lastVerified: "2026-10-31",
    title: "Co-op Survival: Revives, Pings and Sharing",
    seoTitle: "Stillskin Forest Co-op Guide: Revives, Pings, Waypoints and Giving Items",
    description:
      "How to survive as a squad in Stillskin Forest: reviving, pings, crew waypoints and base, giving items and shop supplies, no team damage, and Embers for teamwork.",
    question: "How does co-op work in Stillskin Forest?",
    answer:
      "Squads share one run. You revive downed teammates by holding E for three seconds, ping infected, loot or your position with T (Triangle / Y on controller) so the squad sees a marker for 8 seconds, mark waypoints and a crew base on the journal map, and hold E on a teammate to give them your held item, or half your ammo if your hands are empty. Teammates can shove each other but never hurt each other. Story progress such as the asylum unlock and the relics placed at the ritual circle is shared; each survivor finds their own relics.",
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
          { type: "p", text: "Press **T** or middle mouse (tap Triangle / Y on controller). Pings are labelled INFECTED, LOOT or HERE, show the distance and who pinged, last 8 seconds, and reach up to 300 studs. They work in matches, not in the lobby." },
        ],
      },
      {
        id: "waypoints",
        heading: "Crew waypoints and base",
        blocks: [
          { type: "p", text: "Open the journal map and click a building or a spot (tap on a phone; on a controller, move the cursor with the left stick and press Cross / A, or Square / X to drop a waypoint straight at the cursor). You can set your waypoint there or mark it as your crew's base." },
          { type: "list", items: [
            "**Waypoints:** each player has one, in their own colour. The whole crew sees it on the map and on screen with the distance. Right-click, Triangle / Y or **CLEAR MY WAYPOINT** removes yours.",
            "**Base:** one per session. Everyone in the session sees it, and it's still there when you come back. You can move or clear it later.",
          ] },
          { type: "p", text: "See [Controls](@controls) for every map button." },
        ],
      },
      {
        id: "giving",
        heading: "Giving items",
        blocks: [
          { type: "p", text: "Hold **E** on a teammate to hand over the item in your hands. With empty hands you give them half your ammunition instead. It respects their bag space." },
          { type: "p", text: "Supplies from the shop, whether bought with Embers or Robux, can be handed to or dropped for your crew like anything you find, keeping their ammo and condition. Each shop item says which it is: \"Can be given to your crew once in a run\" or \"Account-bound (can't be given)\". Passes, cosmetics, Embers and Ember packs always stay on your account, and gear bought before the 31 October update stays with whoever bought it." },
        ],
      },
      {
        id: "no-team-damage",
        heading: "Hitting a teammate",
        blocks: [
          { type: "p", text: "Nobody on your team ever loses health to you. A punch or swing that lands on a teammate gives them a short shove; a shot just makes a hit sound. There is no friendly-fire setting." },
        ],
      },
      {
        id: "embers-for-teamwork",
        heading: "Embers for teamwork",
        blocks: [
          { type: "p", text: "Embers come with every reward that gives points, including reviving a teammate and helping one, as well as kills, nights survived, relics, nailing planks and lighting lanterns. They pay all day, up to a daily limit per in-game day. Rewards for reviving the same teammate, sharing ammo back and forth or nailing planks have their own daily limits." },
        ],
      },
      {
        id: "shared-progress",
        heading: "Shared progress",
        blocks: [
          { type: "list", items: [
            "One player reading the [ledger](@blackthorn-admission-ledger) unlocks the asylum for everyone.",
            "Relics are personal: each survivor finds their own, and the relics placed at the ritual circle are shared.",
            "One player can hold [the ritual](@the-rite-of-stillness); everyone gets the ending.",
            "Placed [lanterns](@lantern) you found can be picked up by anyone.",
          ] },
          { type: "callout", tone: "note", text: "Revives, the shared asylum unlock, relic placing and the ritual have been verified with two players. Pings, giving, crew waypoints, the base marker and shoving teammates are live but not yet confirmed in a recorded multi-player test." },
        ],
      },
    ],
    related: ["playing-with-friends", "downed-and-revive", "death-ghosts-and-the-finale"],
    sources: [SRC.config, SRC.playtest, SRC.notes30, SRC.publish31],
    aliases: ["co-op", "coop", "team", "ping", "pings", "give items", "share ammo", "teamwork", "waypoint", "base marker", "friendly fire", "team damage"],
  },
  {
    ...base,
    slug: "death-ghosts-and-the-finale",
    lastVerified: "2026-10-31",
    title: "Death, Ghosts and the Rooftop Finale",
    seoTitle: "What Happens When You Die in Stillskin Forest: Ghosts and the Finale",
    description:
      "What happens when you die in Stillskin Forest: flying as a ghost, respawning at dawn, the last survivor, and how a team wipe ends your saved session.",
    question: "What happens when you die in Stillskin Forest?",
    answer:
      "If your teammates are still alive, you become a ghost: you fly freely around the map (or follow a teammate) and respawn beside a survivor when dawn breaks. When everyone in the session has fallen, the run ends and the session is over for good. It stays in your list, greyed out, with the day you reached. Play Again starts a new session on Day 1 with the squad; Back to Camp returns you to the lobby.",
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
            "If nobody in the session is left standing, the session ends for good. Playing alone, one death ends it. See [Saved sessions](@persistent-expeditions).",
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
          { type: "p", text: "When everyone in the session has fallen, the run ends with the rooftop finale and the session is over for good. Its end rewards are paid once, and it stays in everyone's list, greyed out with the final day." },
          { type: "list", items: [
            "The result cards land on the music's transition: day reached, nights survived, kills and revives.",
            "The squad stands on the roof of [St. Agnes Hospital](@st-agnes-hospital).",
            "Infected walk in from out of frame and dance, point, laugh and headbang around the lineup.",
            "The camera tours the hospital, the camp lake and dock, the forest, a cabin, the police car and a burning dumpster.",
          ] },
          { type: "p", text: "Each player then chooses **Play Again** to start a new session on Day 1 with the same squad as co-owners, or **Back to Camp** to go back to the lobby. A player who already has 3 active sessions is asked to remove one first." },
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
    sources: [SRC.config, SRC.playtest, SRC.report, SRC.publish31],
    aliases: ["death", "die", "ghost", "spectate", "spectator", "end of run", "return to camp", "finale", "zombie dance", "stats", "team wipe", "wipe"],
    gaps: ["Play Again and Back to Camp with several real clients in a live server have not been recorded yet.", "Whether the rooftop finale still plays before the session end screen in v382 has not been re-checked."],
  },
  {
    ...base,
    slug: "persistent-expeditions",
    lastVerified: "2026-10-31",
    title: "Saved Sessions: Saving Your Run and Playing With Friends",
    seoTitle: "Stillskin Forest Saved Sessions: Save, Invite Friends and Continue",
    description:
      "Saved sessions in Stillskin Forest: every run saves, co-owners and invited friends, up to 3 active sessions, playing alone, and why a team wipe ends one.",
    question: "Can you save your game in Stillskin Forest?",
    answer:
      "Yes. Every run you start from the trailhead is a saved session. Everyone who starts it together owns it, and friends you invite can join any time with their own gear. Leaving saves automatically, and anyone in the session can come back to it later, even alone. You can have up to 3 active sessions. If everyone in a session falls, it ends for good.",
    facts: [["Which runs save", "Every run started from the trailhead"], ["Active sessions", "Up to 3 per player"], ["Saves", "When you leave, about every 90 s, at each dawn, on Save & Leave"], ["Who can come back", "Anyone in the session, even alone"], ["Everyone falls", "The session ends for good"]],
    sections: [
      {
        id: "how-sessions-work",
        heading: "How sessions work",
        blocks: [
          { type: "list", items: [
            "**Every run is a session.** Everyone standing on the queue pad when the run starts becomes a co-owner. Co-owners can rename the session and remove it.",
            "**The SESSIONS menu.** If you have a session, it opens when you join: a card for each one with its name, day, phase and members, and a marker when someone is playing it now. Continue, rename, star a favourite to keep it on top, or remove it. **NEW SESSION** takes you to the lobby to start another.",
            "**Up to 3 active sessions.** With 3 active, starting a new one first asks you to remove one. Ended sessions don't count.",
            "**Removing** a session only takes it off your own list. It's deleted for good once every co-owner has removed it, so nobody can wipe a friend's progress.",
          ] },
        ],
      },
      {
        id: "friends",
        heading: "Inviting friends",
        blocks: [
          { type: "p", text: "In a session, press **INVITE FRIEND** to send a Roblox invite. Accepting it drops your friend straight into the live session, wherever you are in it. A newcomer starts with the starter kit and keeps their own gear and finds from then on; they don't get anyone else's. Members who joined this way can continue the session too, but only co-owners can rename it. If the session is being played when you open the menu, its card lets you join that server." },
        ],
      },
      {
        id: "leaving-and-coming-back",
        heading: "Leaving and coming back",
        blocks: [
          { type: "p", text: "Leaving saves at any time; **SAVE & LEAVE** is there if you want to be sure. The game also saves about every 90 seconds, at each dawn and after a night slept through. Nothing happens while nobody is playing: time stands still and nobody can die offline." },
          { type: "p", text: "Anyone in the session can come back to it, even when nobody else is online. If you enter alone, you're warned first: \"You're alone. If you die, this session ends for everyone.\"" },
        ],
      },
      {
        id: "what-is-kept",
        heading: "What a session keeps",
        blocks: [
          { type: "list", items: [
            "The day, the phase and how far into it you were.",
            "Every plank you nailed up, the asylum, the relics laid in the circle and the rite (done stays done), a win you already earned, and the crew base marked on the map.",
            "Each survivor's own bag, health, finds and position, with every item exactly as you left it: its ammo, its condition, and which rifle or freeze device is yours.",
            "Recovery backpacks still lying where someone fell, with what's in them kept just as exactly. Nothing comes back fuller than you left it.",
          ] },
          { type: "p", text: "The infected, loot lying around, doors and glass, the weather and generator fuel start fresh each time." },
        ],
      },
      {
        id: "dying",
        heading: "When everyone falls",
        blocks: [
          { type: "p", text: "If someone falls while a teammate is still standing, the usual rules apply: they come back at the next dawn and their gear waits in a recovery backpack. But when everyone currently in the session has fallen, the session is over for good. Playing alone, one death ends it. You see the end screen with the days you survived, the run's end rewards are paid once, and the session stays in your list, greyed out with the day you reached. **Play Again** starts a new session with the same squad. See [Death and ghosts](@death-ghosts-and-the-finale)." },
        ],
      },
      {
        id: "old-expeditions",
        heading: "Older expeditions",
        blocks: [
          { type: "p", text: "Saved sessions replace the old expedition slots and crews. Expeditions you already had carry over as sessions: the owner becomes a co-owner and the crew become members." },
        ],
      },
    ],
    related: ["playing-with-friends", "co-op-survival", "death-ghosts-and-the-finale", "night-survival"],
    sources: [SRC.config, SRC.playtest, SRC.publish31],
    aliases: ["save", "saving", "session", "sessions", "saved session", "expedition", "expeditions", "persistent world", "save slots", "continue", "crew", "invite"],
    gaps: ["Saved sessions are live but still being tested: invites, entering alone and ending a session with several players have not been recorded in a live server yet."],
  },
];
