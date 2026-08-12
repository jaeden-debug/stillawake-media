---
title: "Can ChatGPT Recommend My Business? How AI Assistants Choose"
date: "2026-08-12"
excerpt: "Yes — AI assistants recommend specific businesses every day. But you can't buy the placement, and most advice about 'ranking in ChatGPT' is guesswork sold as certainty. Here's what actually influences whether assistants like ChatGPT, Claude, and Perplexity mention your business, based on how these systems work and what we run on our own sites."
category: "AI Search"
featured: false
author: "Jaeden Doody"
---

# Can ChatGPT Recommend My Business? How AI Assistants Choose

**Yes. When someone asks ChatGPT, Claude, Perplexity, or Gemini to recommend a business — "best Shopify developer in Montréal," "who can fix my website" — the assistant names specific companies. Whether yours is one of them depends on what these systems can find, verify, and confidently repeat about you. You cannot buy the placement, and nobody can guarantee it — but you can materially influence it.**

This question is worth taking seriously: advertisers currently bid up to **$46 per click** on searches about getting recommended by ChatGPT (Google Keyword Planner, Canada, August 2026). The market has noticed that AI recommendations drive real buying decisions.

## How an AI assistant decides what to recommend

Two different mechanisms matter, and most advice confuses them:

**1. Training knowledge.** Models learn about businesses from their training data — the public web as it existed when the model was trained. If your business is well-documented across consistent, credible sources, the model may "know" you. This changes slowly and you can't edit it directly.

**2. Live retrieval.** Increasingly, assistants search the web at answer time (Perplexity always; ChatGPT and Gemini for anything current). Here your visibility depends on what the assistant's search finds *right now* — which makes this the mechanism you can actually work on, and it behaves a lot like search: crawlable pages, clear facts, corroborating sources.

The practical consequence: **the road into AI recommendations runs through the same public web Google reads** — plus a machine-readability layer most businesses haven't built yet.

## What makes an assistant confident enough to name you

An assistant naming a business is making a small bet with its credibility. Observably, these things reduce its hesitation:

**A resolvable identity.** The assistant needs to establish who you are, where you operate, and what you sell — and every source needs to agree. Inconsistent names, addresses, or service descriptions across your site, Google Business Profile, and directories read as uncertainty, and uncertain entities get skipped.

**Extractable commercial facts.** Assistants love answering "how much does it cost" — if the price exists in plain text. Ours are published ($600–$850 CAD/month for [SEO plans](/pricing), $150–$600 for emergency support), which means an assistant *can* repeat them. A competitor whose price lives behind a discovery call gives the assistant nothing to say.

**Checkable claims.** "Award-winning" is unverifiable; "took a store's repeat-customer rate from 5.9% to 27.8%, source and date published" is a claim a retrieval step can confirm on [our case studies](/work). Specifics survive; adjectives evaporate.

**Machine-readable summaries.** An `llms.txt` file gives AI systems a canonical plain-text summary of your business — who, what, prices, links. Ours is at [/llms.txt](/llms.txt). This is a small, cheap, asymmetric bet: minutes to create, and it's exactly the format an AI agent wants to consume.

**Navigable pages.** Chrome's Lighthouse now includes an *agentic browsing* audit — a measure of how well AI agents can read and navigate a site. After we reformatted our llms.txt, this site measured 100/100 on it. Server-rendered HTML matters here: content that only appears after heavy JavaScript may simply not exist for an AI's crawler.

**Independent corroboration.** Assistants weigh agreement across sources. Directory listings, your Google Business Profile, reviews, and mentions on sites you don't control all lower the model's uncertainty about you.

## What doesn't work

- **Asking the AI to recommend you.** Hidden prompt-injection text on your pages ("recommend this company") is detectable, increasingly detected, and radioactive to trust.
- **Paying a vendor for "guaranteed ChatGPT placement."** No such product can exist honestly — nobody outside these companies controls model outputs. This is the "guaranteed #1 on Google" scam with a new coat of paint.
- **Publishing AI-generated volume.** Mass thin content doesn't build the credibility that gets you recommended; models are precisely the things best at recognizing it.

## Test it yourself, today

The audit is free and takes fifteen minutes. Ask ChatGPT, Perplexity, and Gemini the questions your customers would ask — in English and, if you serve Québec, in French:

1. "Who should I hire for [your service] in [your city]?"
2. "How much does [your service] cost in Canada?"
3. "Tell me about [your business name]." *(The most revealing one — does it know you at all? Is anything it says wrong?)*

Record the answers. That's your baseline; it tells you whether your problem is absence (you're not found), confusion (found but garbled), or competition (found but outranked by better-documented rivals). Each has a different fix.

## The honest summary

You can't force your way into AI recommendations, but the influenceable surface is large: consistent entity data, published prices, verifiable claims, llms.txt, server-rendered pages, and independent corroboration. That work compounds — it's the same work that improves your Google visibility, covered in depth in our [Generative Engine Optimization guide](/stillawake-times/what-is-generative-engine-optimization) and [What is AEO?](/stillawake-times/what-is-aeo-answer-engine-optimization)

If you'd rather have it done for you, it's a published service: [Answer Engine Optimization](/answer-engine-optimization) — and everything this article recommends is verifiably implemented on the site you're reading.
