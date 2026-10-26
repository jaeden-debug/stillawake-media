---
title: "The Five Google Search Console Reports That Change a Decision"
date: "2026-08-15"
excerpt: "Search Console has dozens of screens and five that change what you do next. Here is what each one measures, which question it answers, and the misreadings that cost businesses months."
category: "Technical SEO"
featured: false
author: "Jaeden Doody"
---

# The Five Google Search Console Reports That Change a Decision

**Five Search Console reports change decisions: Performance, Page indexing, URL Inspection, Core Web Vitals, and Sitemaps. Each answers exactly one question — Performance answers "what are people searching before they reach me", Page indexing answers "is Google willing to index this", URL Inspection answers "what does Google currently hold for this one URL", Core Web Vitals answers "how does this feel to real Chrome users", and Sitemaps answers "does what I published match what Google took". Everything else in the interface is context.**

This is not the ranking-diagnosis question — that has [its own order of operations](/stillawake-times/why-is-my-website-not-ranking-on-google). This is about operating the tool: what the numbers on the screen actually represent, and the four or five misreadings that send businesses down months of pointless work.

## Performance: what happens before the click

The Performance report shows queries, impressions, clicks, click-through rate and average position for the last 16 months. That retention limit matters more than people expect — a year-over-year comparison is possible exactly once, and then the earliest data starts falling off the back.

Three misreadings here do the most damage.

**Average position is an average.** It is calculated across every impression in the period, and a new query where you appear at position 40 pulls it down just as hard as an old query slipping from 4 to 6. A site that is winning — appearing for more queries than last month — frequently shows a *worsening* average position. The site-wide number is close to meaningless. Filter by a specific query before you read position, or don't read it.

**Clicks by query will never sum to total clicks.** Google filters out rare queries to protect user privacy, so the query table is a subset. If you are reconciling the query tab against the totals and finding a gap, the gap is the design, not a bug.

**Impressions without clicks are two different problems.** Split by position band before diagnosing:

- Position 1–5 with a low CTR is a snippet problem. The title and meta description are not earning the click that the ranking already won.
- Position 8–20 with impressions is a ranking problem. Rewriting the title does nothing when almost nobody scrolls that far.

That distinction has a live example. On Blackwater Aquatics — a business Jaeden founded and operates, not a client — one product page holds an **8.61% CTR at an average position of 8.5**, with roughly 60,000 impressions across the top-12 URLs in the 180-day GSC window ending August 12, 2026. A CTR that high that far down the page is the signal that the title already matches intent. The work was moving the position, not rewriting the tag. Read the same page with the site-wide average and you would have concluded the opposite.

One more mechanical detail: position is recorded as the top position of your best-ranking URL for that query in that impression. If two of your pages compete for one query, the report quietly shows you the better of the two and hides the fight.

## Page indexing: the states mean different things

The Page indexing report is the one most often read as a single pass/fail number. It is not. The states have different causes and different fixes, and two of them look almost identical:

- **Discovered — currently not indexed.** Google knows the URL exists and has never fetched it. This is a priority signal: the page is not linked from anywhere convincing enough for Google to spend a fetch on. Resubmitting it does not help. Internal links do.
- **Crawled — currently not indexed.** Google fetched the page, read it, and chose not to index it. That is a quality or duplication judgment, not a technical failure. Requesting indexing repeatedly on these is the single most common waste of time in Search Console.
- **Duplicate, Google chose a different canonical.** Your canonical was overruled. Worth checking which URL Google preferred — sometimes it is right.
- **Excluded by 'noindex' tag.** Intentional, or a staging config that shipped. Check the list rather than assuming.

The named failure mode: treating "Discovered — currently not indexed" as a bug in Google. It is feedback about your internal linking and site structure, and it is covered in more depth in [how Google crawls and understands websites](/stillawake-times/how-google-crawls-and-understands-websites).

Validation runs after a fix are slow — expect days, not hours — and a validation that fails does not necessarily mean the fix failed. It means Google recrawled a sample and at least one URL still showed the problem.

## URL Inspection: the only per-URL ground truth

This is the report that answers "what does Google actually hold for this page right now", and it contains the misreading that wastes the most individual afternoons.

By default, URL Inspection shows the **last indexed version** — a snapshot from whenever Google last crawled, which can be weeks old. Fix a page, inspect it, see the old problem still listed, and the natural conclusion is that the fix did not work. It did. You are looking at history. **Test live URL** fetches the page as it exists now, and that is the button that answers the question you meant to ask.

The other genuinely useful thing here is the rendered HTML and screenshot from the live test. If your content depends on JavaScript, this is where you find out whether Google sees it.

## Core Web Vitals: field data, with a floor

The Core Web Vitals report shows LCP, INP and CLS from the Chrome User Experience Report — real Chrome users, not a lab test — on a **28-day rolling window**, grouped into buckets of similar URLs. Two consequences follow.

First, a fix does not show up for weeks. The window has to roll past the old data. Teams that deploy a performance fix and check the report on Friday conclude nothing useful.

Second, low-traffic URLs return "not enough data". That is not a pass. It means CrUX did not collect enough real sessions to report, and you need lab measurement instead. The mechanics of the three metrics are in our [Core Web Vitals guide](/stillawake-times/core-web-vitals-guide); the point here is the reporting lag.

Honest disclosure on this one: our own Search Console property is close to empty — **26 pages with any impressions and 5 clicks in the last 28 days**. We read field data on client and owned properties, not on stillawakemedia.com, because ours does not have the traffic to generate it.

## Sitemaps: a reconciliation check, not a submission ritual

The Sitemaps report is worth about ninety seconds a month, and its value is entirely in the diff. Your sitemap is the list of pages you *believe* should be indexed. Page indexing is the list Google *actually* indexed. Subtract one from the other and you have a specific, finite list of URLs to investigate — which is a very different task from "why is traffic down".

On [TravelDesign By Lisa](/work/lisa-travel-design), a client platform, that reconciliation across 834 URLs is what turned a vague performance problem into roughly 2,300 individually fixable defects. The sitemap was not the fix. It was the inventory that made the fix countable.

## Which report answers which question

- *Are people searching for this, and are we appearing?* → Performance, filtered by query.
- *Is this page in Google at all, and if not, why?* → Page indexing.
- *Did my fix to this specific page land?* → URL Inspection, live test.
- *Is this slow for real users?* → Core Web Vitals.
- *Did Google take everything I published?* → Sitemaps, diffed against Page indexing.

Asking a report a question it does not answer is where most of the wasted months come from.

## What Search Console cannot tell you

It has no competitor data. It cannot tell you *why* a position moved. It anonymizes rare queries, so long-tail analysis is always partial. And it reports Google Search only — when an AI assistant cites your page, that citation does not appear here as an impression, which is a growing blind spot and the reason [generative engine visibility](/stillawake-times/what-is-generative-engine-optimization) needs separate measurement entirely.

It is still the only report Google gives you directly, it is free, and it does not depend on cookie consent. For most businesses it is both the most useful and the most under-read tool they already own — which is usually where an [SEO engagement](/seo-canada) starts.

---

If you want someone to read your property and tell you what it says, describe the situation in writing at [stillawake.studio/start](https://stillawake.studio/start). You get a written scope back. No sales call.
