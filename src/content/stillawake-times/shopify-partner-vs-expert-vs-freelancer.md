---
title: "Shopify Partner vs Expert vs Freelancer: What the Badges Actually Mean"
date: "2026-08-15"
excerpt: "There is no Shopify Expert badge anymore. The Experts Marketplace is now the Partner Directory, where partners are tiered Select, Plus, Premier and Platinum by the size of merchant they serve."
category: "Shopify"
featured: false
author: "Jaeden Doody"
---

**"Shopify Expert" is no longer a credential Shopify issues. Shopify's current help documentation describes only the Partner Directory, where listed partners are sorted into four tiers — Select, Plus, Premier and Platinum — and those tiers describe the size of merchant a partner is suited to, not the quality of their code. Becoming a Shopify Partner is free and self-serve; it certifies that you signed the Partner Agreement, nothing more.** Verified against `help.shopify.com/en/partners/directory/how-it-works` on August 14, 2026.

That single fact rearranges how you should read every Shopify agency's homepage.

## What the tiers actually describe

Shopify's documentation defines the four Partner Directory tiers by merchant fit, in its own words:

- **Select Partners** — "Best for small and medium-sized businesses"
- **Plus Partners** — "Best suited for mid-market and larger businesses"
- **Premier Partners** — "Designed for large enterprises"
- **Platinum Partners** — "Tailored for global enterprise businesses"

Read those definitions again and notice what is absent. Not one of them says a word about build quality, performance, accessibility, security, or whether the partner writes maintainable Liquid. They describe the customer segment. A Platinum partner is a firm that serves global enterprises. That is a statement about their client list, not about the code they will hand you.

If you run a 40-product store in Montréal, a Platinum badge is not a mark of superiority over a Select partner — it is a signal that you are not the customer that shop is built to serve, and that you will likely be handed to their most junior team.

## How Shopify ranks the directory

The default ordering in the Partner Directory is documented as considering "trust and performance," "quality of work," and "user location." Shopify also says ranking promotes active participation, referrals, collaborations and Shopify certifications.

Two honest observations about that.

Shopify does not publish the weights, the inputs, or how "quality of work" is measured. It is a ranking signal described in three words. Treating a partner's position in the directory as a proxy for engineering quality is reading far more into it than Shopify claims for it.

And "active participation, referrals, collaborations" are marketplace-health metrics. They reward partners who bring Shopify business. That is entirely reasonable for Shopify — it is a partner programme, not a consumer-protection regime — but it means directory position partly measures a partner's relationship with Shopify, not their relationship with you.

## The one thing that is genuinely verified: reviews

The review system is the most substantive vetting mechanism in the directory, and it has real gates. Per Shopify's documentation, to request a review a partner must be listed in the directory with the right permissions, must have merchant collaborator access, and must have worked with that merchant for **more than one week**. Reviews appear within 48 hours when the merchant is on a paid plan.

Collaborator access is the part that matters. A review cannot be posted by someone who was never actually connected to the store. That makes directory reviews meaningfully harder to fabricate than reviews on a general freelance platform or on an agency's own website.

It is still a low bar — one week of access — and reviews are written by clients, who are rating communication and outcome, not code. But it is a verified relationship, and that is more than most badges give you.

## What Shopify does not vet

Here is where I will be careful, because the honest answer is about absence of evidence.

Shopify's partner documentation does not describe any audit of a partner's delivered code, any technical examination before listing, any insurance or bonding requirement, or any verification of the case studies a partner publishes on their own site. I looked for it and did not find it. I am not going to claim Shopify performs zero checks — I cannot see inside their process — but I can tell you that no such check is documented as a condition of being listed, and you should not assume one exists.

Practically: signing up as a Shopify Partner is free. Anyone can do it in an afternoon. "Shopify Partner" on a website means the person signed an agreement.

Two separate things are worth distinguishing from directory tiers:

**Shopify certifications** are real, individually earned credentials, and Shopify's documentation names them as a ranking input. They test a person's knowledge of the platform. They do not test whether that person ships fast, accessible, maintainable stores.

**Shopify Plus** is a merchant plan, not a partner credential. "Plus Partner" and "our client is on Shopify Plus" are different claims and are frequently blurred.

## Freelancer, agency, or the person who will actually type

The badge conversation distracts from the question that predicts your outcome: **who writes the code, and are they still there in six months?**

The failure mode I see most often in Shopify rescue work is not incompetence — it is discontinuity. A store gets built by a contractor inside an agency, the contractor rolls off, and the merchant is left with a theme nobody in the building has read. Nine months later a section breaks, and fixing it costs more than it cost to build, because the first hour of every fix is archaeology.

Freelancers have the opposite pair of risks: excellent continuity while they are available, and total unavailability the week they take on a bigger contract or get sick. Neither structure is safer in the abstract. What matters is whether the arrangement is written down.

## Five questions that outperform every badge

**"Can I see a live store you built, and may I run Lighthouse on it myself?"** Not a screenshot, not a case study — a URL. Performance and accessibility scores are objectively measurable by you, for free, in your own browser, in about ninety seconds. We publish ours for exactly this reason: [Stalkr / NAVTRL](/work/stalkr-navtrl) at 98/100/100 and [BankDeMark](/work/bankdemark) at 100/100/100 are live, and you can check both without asking us anything. A vendor who deflects this question has told you the answer.

**"Who specifically will do the work, and what happens if they leave?"** You want a name and a written handover position.

**"Do you operate a store yourself?"** There is a category of judgement you only acquire by having your own money on the line. We run [Blackwater Aquatics](/work/blackwater-aquatics) — 64 content pages, 17 products, four collections, our own inventory, our own refunds. Every recommendation we make about product page structure comes from having watched it change our own repeat-customer rate, which moved from 5.9% to 27.8% period over period. That is a different kind of knowledge than reading a Shopify blog post.

**"What does the theme code look like?"** Shopify publishes public Theme Store requirements — native CSS, no minified source, app blocks in the main product section, a minimum 90 average Lighthouse accessibility score — and those requirements are a free, vendor-authored quality specification you can hold any Shopify build to. They are published at `shopify.dev/docs/storefronts/themes/store/requirements`. Ask whether your build would survive them.

**"Will I get a written scope before I pay anything?"** A vendor who cannot describe the work in writing before invoicing will not describe it in writing afterward either.

## A note on price

`shopify experts` is one of the more expensive phrases in Canadian paid search — reported cost-per-click for that term reaches into the tens of dollars. That does not make it a bad search. It tells you that the results page is crowded with firms whose acquisition cost is high enough that it has to come out of your build budget.

The 2026 Canadian range for a serious ecommerce build sits between roughly $5,000 and $30,000 or more, depending on catalogue complexity, integrations and how much of the checkout logic is custom. Our published rates for [Shopify development](/shopify-development) and ongoing work are on the [pricing page](/pricing), and what shapes the number for custom work is broken down in [custom software development cost in Canada](/stillawake-times/custom-software-development-cost-canada).

## The short version

Use the Partner Directory as a discovery tool and a review source. Do not use tier names as a quality ranking — Shopify does not define them that way. Then do the evaluation yourself: run Lighthouse on a live build, get a name, get a scope in writing.

---

**Sources checked August 14, 2026:** `help.shopify.com/en/partners/directory/how-it-works`, `shopify.com/partners/directory`, `shopify.dev/docs/storefronts/themes/store/requirements`. Shopify renames programmes; verify tier names against the live documentation before quoting them. Shopify help content dates the retirement of the Experts Marketplace name to October 2023, but I could not confirm that date from a primary Shopify page, so treat the date — not the change itself — as unverified.

---

Want an evaluation you can check rather than a badge you have to trust? Describe your store in writing at [stillawake.studio/start](https://stillawake.studio/start) and you get a written scope back. No sales call.
