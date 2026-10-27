import type { WikiEntry } from "@/data/games/types";
import { SRC, VERIFIED } from "./sources";

const base = { category: "vault", verification: "verified_live", lastVerified: VERIFIED } as const;

export const vault: WikiEntry[] = [
  {
    ...base,
    slug: "the-vault",
    title: "THE VAULT",
    seoTitle: "THE VAULT in RISK IT!: Every Cosmetic and Its Price",
    description:
      "THE VAULT is RISK IT!'s cosmetic shop: five fail trails and five launch bursts bought with GUTS. Every item, every price, and how equipping works.",
    question: "What can you buy in THE VAULT?",
    answer:
      "THE VAULT sells two kinds of cosmetics, both bought with GUTS: fail trails, which streak behind you when you're launched, and launch bursts, which go off as you fly. There are five of each, including a free default. Buying an item equips it straight away. Nothing in THE VAULT affects your odds, and nothing costs Robux.",
    facts: [
      ["Currency", "GUTS"],
      ["Fail trails", "5 (Signature free)"],
      ["Launch bursts", "5 (None free)"],
      ["Most expensive", "Full Spectrum, 3,500 GUTS"],
      ["After buying", "Auto-equipped"],
    ],
    media: "risk-it-the-vault",
    sections: [
      {
        id: "catalogue",
        heading: "The full catalogue",
        blocks: [
          { type: "table", caption: "THE VAULT catalogue", head: ["Item", "Type", "Price (GUTS)"], rows: [
            ["Signature", "Trail", "Free"],
            ["Liquid Gold", "Trail", "400"],
            ["Void Walker", "Trail", "900"],
            ["Re-entry", "Trail", "1,500"],
            ["Full Spectrum", "Trail", "3,500"],
            ["None", "Burst", "Free"],
            ["Party Pooper", "Burst", "300"],
            ["Seeing Stars", "Burst", "750"],
            ["Cartoon Poof", "Burst", "1,200"],
            ["Overcharged", "Burst", "2,500"],
          ] },
        ],
      },
      {
        id: "using-it",
        heading: "Using THE VAULT",
        blocks: [
          { type: "p", text: "Walk up to THE VAULT in the hub and open it. Switch between the **Fail Trails** and **Launch Bursts** tabs, then buy or equip. Owned items can be swapped any time for free. Every purchase is checked on the server, so a purchase can't go through without the GUTS for it." },
          { type: "p", text: "On phones THE VAULT fills the screen and scrolls, with large tap targets." },
        ],
      },
    ],
    related: ["fail-trails", "launch-bursts", "guts"],
    sources: [SRC.source, SRC.tests],
    aliases: ["vault", "shop", "store", "cosmetics", "skins", "buy"],
  },
  {
    ...base,
    slug: "fail-trails",
    title: "Fail Trails",
    seoTitle: "RISK IT! Fail Trails: All Five, From Signature to Full Spectrum",
    description:
      "Every RISK IT! fail trail in THE VAULT: Signature, Liquid Gold, Void Walker, Re-entry and Full Spectrum, with what they look like and what they cost.",
    question: "What fail trails are in RISK IT!?",
    answer:
      "There are five fail trails: Signature (free, matches the challenge colour), Liquid Gold (400 GUTS), Void Walker (900), Re-entry (1,500) and Full Spectrum (3,500, a rainbow). A trail streaks behind you whenever a challenge launches you, and on LONG SHOT wins too.",
    facts: [
      ["Count", "5"],
      ["Price range", "Free to 3,500 GUTS"],
      ["Shows", "While you're launched"],
    ],
    media: "risk-it-trail-full-spectrum",
    sections: [
      {
        id: "all-trails",
        heading: "All trails",
        blocks: [
          { type: "table", caption: "Fail trails", head: ["Trail", "Look", "Price"], rows: [
            ["Signature", "Matches the challenge's colour", "Free"],
            ["Liquid Gold", "Bright gold fading to pale gold", "400"],
            ["Void Walker", "Violet fading to near-black", "900"],
            ["Re-entry", "Red-hot fading to orange", "1,500"],
            ["Full Spectrum", "Cycles through every colour", "3,500"],
          ] },
        ],
      },
    ],
    related: ["the-vault", "launch-bursts", "long-shot"],
    sources: [SRC.source],
    aliases: ["trail", "trails", "rainbow trail", "gold trail"],
  },
  {
    ...base,
    slug: "launch-bursts",
    title: "Launch Bursts",
    seoTitle: "RISK IT! Launch Bursts: Party Pooper, Seeing Stars and More",
    description:
      "Every RISK IT! launch burst in THE VAULT: Party Pooper confetti, Seeing Stars, Cartoon Poof and Overcharged sparks, with prices in GUTS.",
    question: "What launch bursts are in RISK IT!?",
    answer:
      "Launch bursts are effects that go off from your body while you fly after a fail. There are four to buy: Party Pooper (300 GUTS, confetti), Seeing Stars (750, cartoon stars), Cartoon Poof (1,200, a big puff of smoke) and Overcharged (2,500, crackling sparks). None is the free default.",
    facts: [
      ["Count", "4 plus None"],
      ["Price range", "300–2,500 GUTS"],
      ["Shows", "During your launch"],
    ],
    media: "risk-it-trail-liquid-gold",
    sections: [
      {
        id: "all-bursts",
        heading: "All bursts",
        blocks: [
          { type: "table", caption: "Launch bursts", head: ["Burst", "Effect", "Price"], rows: [
            ["None", "Fail quietly", "Free"],
            ["Party Pooper", "Confetti cannon", "300"],
            ["Seeing Stars", "Cartoon stars spin off you", "750"],
            ["Cartoon Poof", "A big puff of smoke", "1,200"],
            ["Overcharged", "Crackling sparks", "2,500"],
          ] },
          { type: "p", text: "Other players see your burst too. Combine any burst with any trail." },
        ],
      },
    ],
    related: ["the-vault", "fail-trails", "wipeouts-and-recovery"],
    sources: [SRC.source],
    aliases: ["burst", "bursts", "confetti", "effects", "particles"],
  },
];
