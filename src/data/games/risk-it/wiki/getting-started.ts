import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "getting-started", verification: "verified_live", lastVerified: VERIFIED } as const;

export const gettingStarted: WikiEntry[] = [
  {
    ...base,
    slug: "what-is-risk-it",
    title: "What Is RISK IT!?",
    seoTitle: "What Is RISK IT!? The Roblox Minigame Game of Ragdoll Fails",
    description:
      "RISK IT! is a Roblox minigame game by StillAwake Media: eight 5–20 second challenges, ragdoll fails, medals and cosmetics. What it is and how it plays.",
    question: "What is RISK IT! on Roblox?",
    answer:
      "RISK IT! is a minigame game on Roblox, made by StillAwake Media. You walk onto one of eight challenge islands, take a 5 to 20 second challenge, and either bank GUTS or get ragdolled into the air with a headline to match. Then you land next to the pad and try again. It works solo; friends make it louder.",
    facts: [
      ["Platform", "Roblox"],
      ["Genre", "Party & Casual · Minigame"],
      ["Developer", "StillAwake Media"],
      ["Status", "Released 27 Oct 2026 (build v0.2.2)"],
      ["Challenges", "8"],
      ["Medals", "24 (bronze, silver, gold per challenge)"],
    ],
    media: "risk-it-arena-aerial",
    sections: [
      {
        id: "the-premise",
        heading: "The premise",
        blocks: [
          { type: "p", text: "A neon game show floats in a dark void over a synthwave grid. In the middle is the hub where you spawn; around it, eight islands, each lit in its own colour and each hosting one challenge. Walk onto an island's glowing pad, press **RISK IT!**, and a title card slides in." },
          { type: "p", text: "Win and you bank **GUTS**, the game's currency, plus a shot at a medal. Fail and the challenge makes a show of it: a trapdoor, a spring-loaded glove, a catapult or a blast launches your ragdoll, a headline stamps across the screen, and the crowd laughs. About 2.6 seconds later you're on your feet beside the pad, ready to go again. See [Wipeouts and recovery](@wipeouts-and-recovery)." },
        ],
      },
      {
        id: "the-challenges",
        heading: "The eight challenges",
        blocks: [
          { type: "list", items: [
            "[THE BUTTON](@the-button): every press doubles the pot; the board shows the exact odds of the floor dropping.",
            "[PERFECT STOP](@perfect-stop): stop a needle in a shrinking zone, three rounds.",
            "[QUICK DRAW](@quick-draw): wait for green, then slam. Flinch and the plate catapults you.",
            "[THE SWEEPER](@the-sweeper): cross a bridge past three spinning arms.",
            "[DOOR NUMBER WHO](@door-number-who): three doors, one trap, three rounds. Watch the lamps.",
            "[MELTDOWN](@meltdown): survive 15 seconds on a floor that keeps falling.",
            "[COPY THAT](@copy-that): repeat arrow sequences; bank or go again.",
            "[LONG SHOT](@long-shot): aim, set the power, get fired from a cannon at the rings.",
          ] },
          { type: "p", text: "[Challenges compared](@challenges-compared) puts all eight side by side." },
        ],
      },
      {
        id: "what-you-earn",
        heading: "What you earn",
        blocks: [
          { type: "p", text: "Every win pays [GUTS](@guts). Each challenge has bronze, silver and gold [medals](@medals) and a [personal best](@personal-bests). One challenge each day is the [Hot Seat](@hot-seat) and pays double. Your [wipeouts](@titles-and-wipeouts) count up too, and unlock titles. GUTS buy cosmetics in [THE VAULT](@the-vault)." },
        ],
      },
      {
        id: "development-status",
        heading: "Development status",
        blocks: [
          { type: "callout", tone: "note", text: "RISK IT! went public on Roblox on 27 October 2026. This wiki documents build v0.2.2 as of 26 October 2026. Balance, prices and challenges may change between builds, and every page shows the date it was last checked." },
        ],
      },
    ],
    related: ["how-to-play", "controls", "challenges-compared", "beginner-tips"],
    sources: [SRC.source, SRC.listing],
    aliases: ["risk it", "riskit", "risk it roblox", "about", "what is"],
  },
  {
    ...base,
    slug: "how-to-play",
    title: "How to Play RISK IT!",
    seoTitle: "How to Play RISK IT!: Start a Challenge, Win, Fail, Retry",
    description:
      "How RISK IT! works: walk onto a pad, press RISK IT!, play a 5–20 second challenge, bank GUTS or get launched, then retry with one tap. A plain-English guide.",
    question: "How do you play RISK IT!?",
    answer:
      "Walk from the hub to any glowing island and step onto its pad. When the RISK IT! prompt appears, press E (or tap it) to start. A title card plays for about a second, then the challenge begins. Win to bank GUTS and medals; fail and you get launched. Either way you land beside the pad, facing it, and can start again straight away.",
    facts: [
      ["Challenge length", "5–20 seconds"],
      ["Intro card", "1.25 seconds"],
      ["Back on your feet after a fail", "2.6 seconds"],
      ["Retry", "One tap or E at the pad"],
    ],
    media: "risk-it-hub",
    sections: [
      {
        id: "starting",
        heading: "Starting a challenge",
        blocks: [
          { type: "p", text: "You spawn on the hub. Each walkway leads to an island; the chevrons on the floor point the way, and new players get a sparkle beam pointing at [THE BUTTON](@the-button). Step onto the island's glowing pad and a **RISK IT!** prompt appears with your best result and medal on it. Press **E**, **X** on a controller, or tap the prompt." },
          { type: "p", text: "Only one player can be on a challenge at a time. If the pad is dim and the prompt is missing, someone else is mid-run; watch them fail first." },
        ],
      },
      {
        id: "during",
        heading: "During a challenge",
        blocks: [
          { type: "p", text: "A title card slides in with the challenge's name and rules, black bars frame the screen, and the camera lines up behind you. Then the control panel rises: for stand-still challenges it sits at the bottom with big buttons; for movement challenges ([THE SWEEPER](@the-sweeper), [DOOR NUMBER WHO](@door-number-who), [MELTDOWN](@meltdown)) it docks at the top so you can see where you're going." },
          { type: "p", text: "Every challenge has a time limit. Idling doesn't break anything; it usually ends the run, and on [THE BUTTON](@the-button) an idle player with a pot banks it automatically." },
        ],
      },
      {
        id: "after",
        heading: "After a win or a fail",
        blocks: [
          { type: "list", items: [
            "**Win:** confetti, a headline, +GUTS, and a medal or personal best if you earned one. You're placed back at the pad after 1.6 seconds.",
            "**Fail:** your ragdoll is launched, a headline stamps across the screen and your wipeout count goes up. You're back on your feet at the pad after 2.6 seconds. See [Wipeouts and recovery](@wipeouts-and-recovery).",
            "**Retry:** the RISK IT! prompt is already in front of you. See [Instant retry](@instant-retry).",
          ] },
        ],
      },
    ],
    related: ["controls", "beginner-tips", "wipeouts-and-recovery", "challenges-compared"],
    sources: [SRC.source, SRC.tests],
    aliases: ["how to play", "manual", "guide", "start", "beginner"],
  },
  {
    ...base,
    slug: "controls",
    title: "RISK IT! Controls",
    seoTitle: "RISK IT! Controls: Keyboard, Mouse, Controller and Touch",
    description:
      "Every RISK IT! control on keyboard, controller and touch: starting a challenge, the main action, cash out, arrows for COPY THAT, retry and THE VAULT.",
    question: "What are the controls in RISK IT!?",
    answer:
      "Press E at a pad to start. In a challenge, Space (or E) is the main action and Q is the second action, such as Cash Out. COPY THAT uses the arrow keys or WASD. Press R to retry and V to open THE VAULT. On a controller: A for the main action, B for the second, X at a pad, Y to retry. On touch, tap the on-screen buttons.",
    sections: [
      {
        id: "keyboard",
        heading: "Keyboard and mouse",
        blocks: [
          { type: "table", caption: "Keyboard and mouse controls", head: ["Input", "Action"], rows: [
            ["W A S D", "Move (and, in COPY THAT, the four arrows)"],
            ["E", "Start a challenge at a pad"],
            ["Space or E", "Main action: PRESS, STOP, SLAM, LOCK AIM, FIRE, GO AGAIN"],
            ["Q", "Second action: CASH OUT, BANK"],
            ["Arrow keys", "COPY THAT arrows"],
            ["Left click", "Main action in PERFECT STOP and QUICK DRAW (click anywhere)"],
            ["R", "Risk it again (retry) after a run"],
            ["V", "Open or close THE VAULT"],
            ["Esc", "Close THE VAULT"],
          ] },
          { type: "callout", tone: "tip", text: "In movement challenges ([THE SWEEPER](@the-sweeper), [DOOR NUMBER WHO](@door-number-who), [MELTDOWN](@meltdown)) Space stays your jump. The action keys only take over in stand-still challenges." },
        ],
      },
      {
        id: "controller",
        heading: "Controller",
        blocks: [
          { type: "table", caption: "Controller controls", head: ["Button", "Action"], rows: [
            ["X", "Start a challenge at a pad"],
            ["A or R2", "Main action"],
            ["B", "Second action"],
            ["D-pad", "COPY THAT arrows"],
            ["Y", "Retry"],
          ] },
          { type: "callout", tone: "note", text: "Controller bindings are in the build but have not yet been tested on a real controller." },
        ],
      },
      {
        id: "touch",
        heading: "Phone and tablet",
        blocks: [
          { type: "p", text: "Tap the RISK IT! prompt at a pad to start, then use the on-screen buttons. In PERFECT STOP and QUICK DRAW you can tap anywhere on the screen. COPY THAT shows four arrow buttons. Keyboard hints are hidden on touch devices. See [Playing on phone and tablet](@playing-on-phone-and-tablet)." },
        ],
      },
    ],
    related: ["how-to-play", "playing-on-phone-and-tablet", "copy-that", "the-vault"],
    sources: [SRC.source, SRC.device],
    aliases: ["keybinds", "keys", "controller", "gamepad", "buttons", "how to jump"],
    gaps: ["Controller input has not been tested on a physical controller."],
  },
  {
    ...base,
    slug: "playing-on-phone-and-tablet",
    title: "Playing RISK IT! on Phone and Tablet",
    seoTitle: "RISK IT! on Mobile: Phone and Tablet Controls and Layout",
    description:
      "How RISK IT! plays on a phone or tablet: tapping the prompt, the touch buttons, the top-docked panel for movement challenges, and what has been tested.",
    question: "Can you play RISK IT! on mobile?",
    answer:
      "Yes. RISK IT! supports phones and tablets: tap the RISK IT! prompt at a pad, then use the large on-screen buttons. Movement challenges dock their panel at the top so the thumbstick and jump button stay clear. The layout has been checked in Roblox Studio's Device Simulator; real phones are next.",
    media: "risk-it-mobile-prompt",
    sections: [
      {
        id: "what-changes",
        heading: "What changes on touch",
        blocks: [
          { type: "list", items: [
            "The RISK IT! prompt is a button you tap; it sits at pad level so it never covers the HUD.",
            "Challenge buttons are at least 44 pixels tall, the standard minimum for a comfortable tap.",
            "PERFECT STOP and QUICK DRAW accept a tap anywhere on the screen.",
            "COPY THAT shows four arrow buttons.",
            "Keyboard hints like SPACE and Q are hidden.",
            "THE VAULT fills the space under the Roblox top bar and scrolls with your finger.",
          ] },
        ],
      },
      {
        id: "movement",
        heading: "Movement challenges",
        blocks: [
          { type: "p", text: "In [THE SWEEPER](@the-sweeper), [DOOR NUMBER WHO](@door-number-who) and [MELTDOWN](@meltdown) the challenge panel is a slim strip at the top of the screen. The middle of the screen, where the bridge, doors and tiles are, stays clear, and Roblox's own thumbstick and jump button work as normal." },
        ],
      },
      {
        id: "tested",
        heading: "What has been tested",
        blocks: [
          { type: "callout", tone: "note", text: "Tested on 26 October 2026 in Roblox Studio's Device Simulator (iPhone XR, landscape) with real taps: starting a challenge, pressing and cashing out, the win screen, retry, THE VAULT and a movement challenge. A physical phone and portrait orientation have not been tested yet." },
        ],
      },
    ],
    related: ["controls", "how-to-play", "meltdown", "the-vault"],
    sources: [SRC.device, SRC.source],
    aliases: ["mobile", "phone", "ipad", "tablet", "touch", "android", "iphone"],
    gaps: ["Not yet tested on a physical phone or in portrait orientation."],
  },
  {
    ...base,
    slug: "beginner-tips",
    title: "RISK IT! Beginner Tips",
    seoTitle: "RISK IT! Beginner Tips: Your First Ten Minutes",
    description:
      "Ten practical RISK IT! tips for new players: which challenge to start with, when to cash out on THE BUTTON, the door tell, and how to earn your first medals.",
    question: "What should I do first in RISK IT!?",
    answer:
      "Start with THE BUTTON and cash out after one or two presses for a quick win. Then try QUICK DRAW and PERFECT STOP, which reward practice. Watch the lamps in DOOR NUMBER WHO: the trap door's lamp flickers. Check which challenge is today's Hot Seat for double GUTS.",
    sections: [
      {
        id: "tips",
        heading: "Ten tips",
        blocks: [
          { type: "list", ordered: true, items: [
            "**Start with [THE BUTTON](@the-button).** One safe press doubles the pot to 20; cashing out there is an 88% shot at your first win.",
            "**Bronze on THE BUTTON is a pot of 40**, which takes two safe presses (about a 70% chance).",
            "**In [QUICK DRAW](@quick-draw), react to green, not to change.** More than half of rounds flash yellow first. Pressing on yellow launches you.",
            "**In [PERFECT STOP](@perfect-stop), press a little before the zone.** The needle keeps moving while your finger does. Aim for the gold centre band: perfects decide the medal.",
            "**In [DOOR NUMBER WHO](@door-number-who), wait a second and watch the lamps.** The trap door's lamp flickers. Spending a moment watching is worth it.",
            "**In [MELTDOWN](@meltdown), keep moving.** Half of every wave targets the tiles around you; standing still is the fastest way down.",
            "**In [COPY THAT](@copy-that), bank before you're unsure.** Each extra arrow pays more, but a wrong one ends the run with nothing.",
            "**In [THE SWEEPER](@the-sweeper), jump the low arms and wait for the wall.** The middle arm is too tall to jump; let it pass.",
            "**In [LONG SHOT](@long-shot), use the ring markers on the meters.** The pink ticks show exactly where each ring is for aim and power.",
            "**Check the [Hot Seat](@hot-seat).** One challenge a day pays double GUTS; its pad pulses faster.",
          ] },
        ],
      },
    ],
    related: ["how-to-play", "the-button", "medals", "hot-seat"],
    sources: [SRC.source],
    aliases: ["tips", "beginner", "new player", "strategy", "first"],
  },
  {
    ...base,
    slug: "faq",
    title: "RISK IT! FAQ",
    seoTitle: "RISK IT! FAQ: Saving, Robux, Friends, Mobile and More",
    description:
      "Answers to common RISK IT! questions: is it free, does it use Robux, can you play solo or with friends, does progress save, and does it work on mobile.",
    question: "Common questions about RISK IT!",
    answer:
      "RISK IT! is free to play, has nothing for sale, works solo or with friends, and supports computer, phone and tablet. Progress is designed to save to your Roblox account; saving on live servers is being confirmed during the live test.",
    sections: [
      {
        id: "is-it-free",
        heading: "Is RISK IT! free?",
        blocks: [{ type: "p", text: "Yes. There are no Robux purchases in the game. GUTS, medals and every cosmetic in THE VAULT are earned by playing." }],
      },
      {
        id: "is-the-button-gambling",
        heading: "Is THE BUTTON gambling?",
        blocks: [{ type: "p", text: "No real money or Robux is involved. THE BUTTON is a press-your-luck game played with GUTS you earn in the game, and the board shows the exact chance that the next press drops you." }],
      },
      {
        id: "solo",
        heading: "Can I play RISK IT! alone?",
        blocks: [{ type: "p", text: "Yes. Every challenge is single-player and nothing waits for other players. Friends can watch, cheer and take turns on the same island." }],
      },
      {
        id: "friends",
        heading: "How does it work with friends?",
        blocks: [{ type: "p", text: "Each island runs one player at a time. While a friend is on a challenge, the pad dims and everyone else can watch the run, including the launch, from the island or the hub." }],
      },
      {
        id: "saving",
        heading: "Does my progress save?",
        blocks: [{ type: "p", text: "GUTS, medals, personal bests, wipeouts and your Vault items are designed to save to your Roblox account automatically. Saving on live servers is being confirmed during the live test." }],
      },
      {
        id: "mobile",
        heading: "Does RISK IT! work on mobile?",
        blocks: [{ type: "p", text: "Yes, on phones and tablets with touch controls. The layout has been checked in Roblox Studio's Device Simulator; a physical-phone test is next." }],
      },
      {
        id: "how-long",
        heading: "How long is a challenge?",
        blocks: [{ type: "p", text: "Between about 5 and 20 seconds. A fail puts you back on your feet in 2.6 seconds." }],
      },
      {
        id: "who-made-it",
        heading: "Who made RISK IT!?",
        blocks: [{ type: "p", text: "StillAwake Media, the studio that also makes the co-op survival-horror game Stillskin Forest." }],
      },
    ],
    related: ["what-is-risk-it", "how-to-play", "guts", "playing-with-friends"],
    sources: [SRC.source, SRC.tests, SRC.device],
    aliases: ["faq", "questions", "robux", "free", "save", "help"],
    gaps: ["Saving on live servers has not yet been confirmed."],
  },
];
