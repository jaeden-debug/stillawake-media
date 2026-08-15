---
title: "AI Website Redesign: What AI Does Well and Where It Fails"
date: "2026-08-15"
excerpt: "AI compresses the mechanical half of a website rebuild from weeks to days. It cannot decide what to keep, how the site should be organized, or who is accountable when it ships wrong."
category: "Web Design"
featured: false
author: "Jaeden Doody"
---

# AI Website Redesign: What AI Does Well and Where It Fails

**AI genuinely accelerates four parts of a website redesign: first-draft copy from existing source material, component scaffolding, URL migration mapping, and test generation. It reliably fails at four others: deciding what to keep, information architecture, brand voice, and accountability. The failures are not random — they cluster wherever the task requires a judgment that has no correct answer in the training data.**

We build with AI every day, on our own properties and on client work. This is a report from that, not a prediction.

## Three different things people mean by "AI redesign"

The phrase covers three products with very different risk profiles, and conflating them is how people get burned.

**Prompt-to-site generators** take a description and emit a finished website. Fast, cheap, and structurally generic — they produce the median of what they were trained on, which is fine for a placeholder and rarely fine for a business that competes on positioning.

**AI-assisted builds** use models inside a normal engineering process: a human decides the architecture, AI does the volume work, a human reviews every line. This is what we do.

**AI-generated content dropped onto a human-built site** is the most common and least discussed version, and it is where fabricated facts get published.

## Where AI genuinely earns its place

**Migration mapping.** Crawl the old site, crawl the new structure, produce a URL-to-URL map. This is exactly the kind of high-volume, verifiable, pattern-matching work machines are good at, and the output can be checked mechanically. On [TravelDesign By Lisa](/work/lisa-travel-design) — a client platform — that meant working across **834 URLs** and clearing roughly **2,300 defects** without the mapping becoming the bottleneck.

**Test generation.** A redesign is a refactor of something that already works, and the safety net is tests. The same Lisa project carries **412 tests**; BankDeMark, which Jaeden owns and operates rather than a client project, carries **26 golden test cases** across 13 calculators. Writing that many assertions by hand is the kind of task that quietly does not get done. With AI it gets done, and each one is individually reviewable.

**Component scaffolding.** The tenth variant of a card, the responsive table, the form states. Repetitive, constrained, easy to verify visually.

**First drafts from real source material.** Give a model your existing pages, your transcripts, your actual service definitions, and ask for a restructured draft. The kept-text ratio is low — often under half survives editing — but starting from a structured draft beats starting from a blank page.

**Mechanical sweeps.** Alt text audits, heading hierarchy, metadata gaps, contrast ratios. Checkable against a standard, which is the common thread in everything on this list.

## Where it fails, specifically

**Deciding what to keep.** This is the highest-stakes decision in a redesign and the one AI is worst at. A model looking at a page sees words. It does not see that the page ranks for a query worth 40% of your inbound, or that it earns three leads a quarter and those three are your best clients. Even handed the analytics, it optimizes for the metric you gave it — and "low traffic, high value" is exactly the pattern that gets cut.

**Information architecture.** Ask an AI to structure a site and you get Home / About / Services / Blog / Contact, because that is the genre convention it absorbed. That is not a decision about your buyers; it is an average of everyone else's. Real IA comes from knowing which three questions a prospect asks before they contact you, and in what order — which lives in a sales inbox, not a training corpus.

**Brand voice.** Models regress to the mean of their distribution. The output is competent and forgettable, with a recognizable cadence: triads, the "not just X, but Y" construction, and a smoothness that reads as nobody in particular. If your differentiation is that you sound like a specific human with specific opinions, generated copy actively works against you.

**Anything containing a fact.** Prices, service areas, certifications, staff names, guarantees, statistics, testimonials. Generated marketing copy will invent a plausible number rather than leave a gap, and the invented number reads exactly like a real one. This is why every figure on our site carries a source and a date — including the honest ones, like our own Search Console showing 26 pages with impressions and 5 clicks in 28 days.

**Accountability.** Nobody can call a tool at 9pm when the contact form silently stops delivering. A model has no liability, no insurance, and no memory of the decision it made three weeks ago. When you hire a firm, part of what you are buying is a named person who is answerable for the outcome — and that is not a line item AI can absorb.

## The trade-off nobody states plainly

AI-assisted work does not remove cost. It moves it from production to review.

The savings are real only if there is someone who can review at expert level. If you cannot tell a good component from a bad one, or spot a hallucinated claim in your own service description, AI does not make you faster — it makes you wrong faster, at volume, with more confidence. A team without a senior reviewer gets worse outcomes with AI than without it. That is the honest version, and it is the question to ask any firm that leads with "we use AI": *who reviews it, and what are they qualified to catch?*

## What the disciplined version produces

Two measured results from working this way. On our own site, reformatting our llms.txt with proper markdown links moved the Chrome Lighthouse **agentic-browsing score from 67 to 100** (measured by us, August 2026) — a small, mechanical, entirely verifiable change of exactly the kind AI is suited to. On [NAVTRL](/work/stalkr-navtrl), a client build, the shipped site holds **98/100/100 Lighthouse** plus a perfect 100 agentic-navigation score.

Neither of those came from prompting a site into existence. They came from a human deciding what mattered and using machines for the volume underneath.

## If you are scoping a rebuild

Decide the architecture and the keep/cut list with people who understand your business. Use AI for the migration map, the tests, the scaffolding and the sweeps. Budget review time honestly — it is the real cost, and it does not shrink. Our [website redesign](/website-redesign) and [web design](/web-design-montreal) work runs on exactly that split, and the [cost ranges](/website-cost-canada) reflect review time rather than pretending it disappeared.

If you want to know what your own rebuild would actually involve, describe it in writing at [stillawake.studio/start](https://stillawake.studio/start) and you get a written scope back. No sales call.
