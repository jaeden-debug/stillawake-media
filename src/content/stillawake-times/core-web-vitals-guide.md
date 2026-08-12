---
title: "Core Web Vitals: What They Are and How to Actually Fix Them"
date: "2026-08-12"
excerpt: "Core Web Vitals are Google's three user-experience metrics — LCP (loading), INP (responsiveness), and CLS (visual stability). This guide explains each threshold, how to measure them properly, and the fixes that move them — with the measured scores from our own production builds as proof it's doable."
category: "Web Performance"
featured: false
author: "Jaeden Doody"
---

# Core Web Vitals: What They Are and How to Actually Fix Them

**Core Web Vitals are the three metrics Google uses to measure real-user experience on your pages: LCP (Largest Contentful Paint — loading speed), INP (Interaction to Next Paint — responsiveness), and CLS (Cumulative Layout Shift — visual stability). Google's "good" thresholds: LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, CLS ≤ 0.1.** They're a ranking signal, but more importantly they measure whether your site feels fast, responsive, and stable to actual visitors.

This isn't theoretical for us: the platforms we build measure at the top of these scales — BankDeMark holds a **100/100/100 Lighthouse score** and TravelDesign By Lisa's platform holds a **CLS of 0.00** (both Chrome Lighthouse, mobile, measured August 2026, published in [our case studies](/work)). Everything below is the practice behind those numbers.

## The three metrics, in plain language

### LCP — Largest Contentful Paint (target: ≤ 2.5s)

How long until the biggest visible element — usually a hero image or headline — finishes rendering. It's the moment the page *feels* loaded. The common killers: enormous unoptimized images, slow server responses, render-blocking scripts and stylesheets, and fonts that hold text hostage.

### INP — Interaction to Next Paint (target: ≤ 200ms)

When a visitor taps a button or opens a menu, how long before the screen visibly responds. INP replaced the older FID metric in 2024 and it's stricter: it looks at *all* interactions across the visit, not just the first. The killer is JavaScript: long tasks blocking the main thread mean taps that feel ignored.

### CLS — Cumulative Layout Shift (target: ≤ 0.1)

How much the page jumps around while loading — the "I tried to tap the button and it moved" metric. Caused by images without reserved dimensions, late-loading ads and embeds, and fonts that swap size. A CLS of 0.00 — no shift at all — is achievable; one of our production builds holds it.

## Lab data vs field data (why your scores disagree)

Two different measurements wear the same name, and confusing them wastes debugging time:

- **Field data** (CrUX — the Chrome User Experience Report) is what real Chrome users experienced over the last 28 days. **This is what Google actually uses for ranking.** See it in Search Console's Core Web Vitals report and PageSpeed Insights' top section.
- **Lab data** (Lighthouse) is a one-off simulated test. Perfect for debugging and before/after comparisons, but it isn't the ranking input — and low-traffic sites may have no field data at all, in which case lab data is all you've got.

A page can score 95 in Lighthouse and still fail field CWV (your users are on slow phones), or the reverse. Check field first to know *if* you have a problem; use lab to find *what* it is.

## The fixes that actually move each metric

### Fixing LCP

1. **Compress and right-size images.** Serve modern formats (WebP/AVIF) at the display size, not the camera size. This is the #1 fix on most sites we audit.
2. **Preload the hero.** Tell the browser the LCP element is coming (`fetchpriority="high"`, preload links) instead of letting it discover it late.
3. **Fix server response time.** No frontend trick rescues a 2-second server response. Static rendering or good caching turns this into a solved problem — it's why our builds sit on server-rendered Next.js with static generation.
4. **Cut render-blocking resources.** Every synchronous script and stylesheet in the head delays first paint.

### Fixing INP

1. **Ship less JavaScript.** The most reliable fix. Every framework megabyte is main-thread work on a mid-range phone. This is the structural argument for server rendering — HTML that arrives already built.
2. **Break up long tasks.** Anything over 50ms blocks interactions; chunk it or defer it.
3. **Audit third-party scripts.** Chat widgets, trackers, and tag managers routinely dominate main-thread time. Load them late, or ask honestly whether they earn their cost.

### Fixing CLS

1. **Reserve space for everything that loads late.** Explicit width/height on images and video; fixed-size containers for embeds and ads.
2. **Handle fonts properly.** `font-display: swap` plus size-adjusted fallback fonts prevents the text reflow jump.
3. **Never insert content above existing content** after load — banners and notices belong in pre-reserved space.

## How this connects to revenue

Speed is a trust signal before it's a ranking signal — a slow, jumpy site reads as an untrustworthy business regardless of what Google thinks. We've written up the business case with the research in [How Website Speed Impacts Revenue & SEO](/stillawake-times/how-website-speed-directly-impacts-revenue-and-seo-rankings). The short version: the same work that satisfies Google's thresholds measurably improves conversion, and it compounds with everything else — a fast site is easier for crawlers (human-search and [AI-search](/stillawake-times/what-is-generative-engine-optimization) alike) to fully index.

## What "good" looks like when it ships

The standard we hold our own work to, since these are published and re-runnable:

- [BankDeMark](/work/bankdemark): 100 performance / 100 accessibility / 100 best practices — on a financial platform with 13 interactive calculators, which is exactly the kind of JavaScript-heavy build where INP usually dies.
- [TravelDesign By Lisa](/work/lisa-travel-design): CLS 0.00 across a trilingual 834-URL platform.
- [NAVTRL](/work/stalkr-navtrl): 98/100/100 on a 31-route marketing site shipped in 19 days — speed of delivery and speed of page are not actually in tension.

If your site fails Core Web Vitals and you want it fixed rather than explained, that's [website maintenance and emergency support](/website-maintenance) — published pricing, measured before/after. And if you're rebuilding anyway, build it right the first time: [web design that treats performance as a constraint](/web-design-montreal), not an afterthought.
