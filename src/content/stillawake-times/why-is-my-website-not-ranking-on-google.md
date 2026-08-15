---
title: "Why Isn't My Website Ranking on Google? A Diagnosis Order"
date: "2026-08-14"
excerpt: "There is no single reason a site doesn't rank — but there is a correct order to check in. This is the nine-layer diagnosis we run on real sites, starting with the checks that make every later check pointless if they fail."
category: "SEO Strategy"
featured: true
author: "Jaeden Doody"
---

# Why Isn't My Website Ranking on Google? A Diagnosis Order

**There is no universal answer — but there is a correct order to check in, and most people start in the wrong place.** The order matters because each layer makes the ones below it meaningless: if Google hasn't indexed a page, no amount of keyword work will help it; if the page targets the wrong intent, technical perfection won't save it. Work top to bottom and stop at the first real failure.

Below is the sequence we actually run. It came out of doing this on live sites — including one where the diagnosis surfaced roughly **2,300 technical defects** before a single ranking moved ([TravelDesign By Lisa](/work/lisa-travel-design), a client platform).

## The nine layers, in order

### 1. Indexation — is the page in Google at all?

Search `site:yourdomain.com/your-page-path`. Nothing returned means Google doesn't have the page, and every other question is premature.

Then open Search Console → **Indexing → Pages**. It tells you not just what's excluded but *why*: "Discovered – currently not indexed", "Crawled – currently not indexed", "Excluded by 'noindex' tag", "Duplicate, Google chose a different canonical". Those four have completely different fixes.

The single most common cause we find on newly launched sites: a `noindex` tag left over from staging. It costs nothing to check and it invalidates everything else.

### 2. Search intent — does your page match what the query wants?

This is the layer people skip, and it's the most common reason a *technically fine* page doesn't rank.

Search your target query and look at what's actually ranking. If the first ten results are all comparison listicles and your page is a service page, Google has already told you what it thinks that query means. You are not competing on quality — you're in the wrong format entirely.

We test this before writing anything now. It's how we concluded that "best SEO company" queries are listicle territory where a vendor page can't win, while the *criteria* behind them are wide open.

### 3. Crawlability — can Google reach and render it?

Check `robots.txt` isn't blocking the path. Confirm the page is in your sitemap and that the sitemap is submitted to the right Search Console property — a real failure we hit on this very site, where the property held a sitemap from **2017** while the current one was never submitted.

Then confirm the content exists in the server-rendered HTML. Use Search Console's URL Inspection → "View crawled page". If your main content only appears after JavaScript executes, you're gambling on the render queue. Our [guide to how Google crawls and understands websites](/stillawake-times/how-google-crawls-and-understands-websites) covers the mechanics.

### 4. On-page targeting — is the page unambiguous about its subject?

One `<h1>`. A title tag that contains the actual query language a human would type. A first paragraph that answers the question directly rather than warming up to it.

This is also where you check for the opposite failure: keyword stuffing. If the phrase appears eleven times in four paragraphs, that reads as manipulation to a modern ranking system and as unreadable to a person.

### 5. Cannibalization — are two of your own pages fighting?

Search Console → **Performance**, filter to the query, and look at the Pages tab. If two URLs alternate for the same query across weeks, you're splitting your own signals and neither page wins.

The fix is a decision, not a tweak: one URL owns the intent, the other gets refocused or 301'd into it. We removed four of our own pages this way — thin location articles that competed head-on with the service pages they were supposed to support.

### 6. Internal links — does your site vote for the page?

A page with no internal links pointing at it is telling Google it doesn't matter. Orphan pages are extremely common on sites that grew by accident, and they're cheap to fix.

We found this on our own [llms.txt generator](/tools/llms-txt-generator) — genuinely useful software with essentially no inbound internal links, which is a self-inflicted ranking cap. See [why internal linking is one of the most powerful SEO strategies](/stillawake-times/why-internal-linking-is-one-of-the-most-powerful-seo-strategies).

### 7. Authority — has anyone outside your site vouched for it?

If layers 1–6 are clean and you still don't rank for a competitive commercial term, this is usually the real answer, and it's the slowest to fix. It means other credible sites don't reference you.

Be honest with yourself here: a new domain competing against sites with a decade of accumulated references will lose on head terms regardless of page quality. The move is to win specific, lower-competition queries first and build from there — not to keep rewriting a page that's losing on a different axis entirely.

### 8. Content quality — does the page deserve the position?

The test that matters: **what does this page contain that the current top ten do not?** Not "more words" — something concrete. A measurement, a working example, a named limitation, first-hand experience, a real constraint the others gloss over.

If you can't answer that, the page isn't underranked. It's accurately ranked.

### 9. Performance and Core Web Vitals — the tiebreaker

Speed rarely lifts a page from nowhere to page one, but it decides close contests and it affects everything downstream of the click. Use field data (Search Console's Core Web Vitals report), not just a one-off Lighthouse run — they measure different things, as our [Core Web Vitals guide](/stillawake-times/core-web-vitals-guide) explains.

## What this diagnosis cannot tell you

It won't produce a single cause, because sites usually have several small failures rather than one dramatic one. It won't tell you how long recovery takes — technical fixes can move within weeks, authority takes months. And it can't tell you whether the query is worth ranking for in the first place, which is a business question, not an SEO one.

**One thing it will do reliably:** stop you spending three months on content when the real problem was a `noindex` tag, a sitemap in the wrong property, or two of your own pages competing.

## If you'd rather have it run for you

A written diagnosis of where your site actually sits — layer by layer, with the blocking items first — is what our SEO work opens with. Plans are published at **$600 and $850 CAD/month** on the [SEO Montréal page](/seo-montreal), with no 12-month contract, and there's a fuller cost breakdown in [how much SEO costs in Canada](/stillawake-times/how-much-does-seo-cost-canada).

Describe your situation in writing at [stillawake.studio/start](https://stillawake.studio/start) — no sales call required.
