---
title: "Shopify Theme Store Requirements: What Actually Gets Themes Rejected"
date: "2026-08-15"
excerpt: "Shopify requires a 60 average Lighthouse performance score and a 90 average accessibility score before a theme can be published, and rejects any new submission derived from Dawn or Horizon."
category: "Shopify"
featured: false
author: "Jaeden Doody"
---

**To be published on the Shopify Theme Store, a theme must hit a minimum 60 average Lighthouse performance score and a minimum 90 average accessibility score across the product, collection and home page templates on both desktop and mobile, support every required template and merchant-facing feature, ship native CSS with no Sass, and present an original design — new submissions built on or derived from Dawn or Horizon are not eligible.** Every number in that sentence is verified against Shopify's own documentation at `shopify.dev/docs/storefronts/themes/store/requirements`, checked on August 14, 2026.

We build Shopify themes for the Theme Store at StillAwake Media, which means we read that requirements page the way other people read a building code. What follows is what it actually contains, what it deliberately leaves vague, and where I will tell you plainly that I could not verify something.

## The two numbers that decide most submissions

Shopify's requirements page states two hard thresholds:

- **Minimum 60 average performance score** across product, collection and home pages, desktop and mobile
- **Minimum 90 average accessibility score** across the same pages, desktop and mobile

Two details in that wording matter more than the numbers themselves.

First, it is an **average across three template types on two form factors**. A theme that scores 85 on a sparse home page and 40 on a real product page does not pass because the home page carried it. Six measurements, averaged — and the product page is almost always the one that drags.

Second, testing uses a **benchmark dataset with actual images and content**. You cannot pass by submitting a theme demo with three products, one hero image and no reviews. The requirement explicitly exists because empty sections score beautifully and sell nothing.

The gap between those two numbers is the interesting part. Sixty is a low bar for performance; ninety is a high bar for accessibility. Shopify is telling you where it will not negotiate. A theme with an unlabelled icon button, a colour scheme that fails contrast in the merchant's default preset, or a carousel that cannot be operated by keyboard will fail the accessibility average long before the performance average becomes a problem.

Worth being clear about what 60 means in context: it is a floor for entry to a marketplace, not a target for a shipped store. When we build a client site rather than a marketplace theme, we work in a different range — [Stalkr / NAVTRL](/work/stalkr-navtrl) runs 98/100/100 in Lighthouse, and [BankDeMark](/work/bankdemark) runs 100/100/100. A theme has to stay fast while a merchant loads it with apps, a mega menu and a 3,000-word collection description, so building to exactly 60 in a controlled demo is how you get rejected on the benchmark dataset.

## The requirements people forget until they fail

The templates list is not negotiable and it is longer than most first-time submitters expect. Shopify requires `theme.liquid`, `404.json`, `article.json`, `blog.json`, `cart.json`, `collection.json`, `index.json`, `list-collections.json`, `page.json`, `page.contact.json`, `password.json`, `product.json`, `search.json` and `gift_card.liquid`, plus `settings_data.json` and `settings_schema.json`.

`gift_card.liquid`, `password.json` and `list-collections.json` are the three that get skipped. They are the templates nobody designs because nobody demos them.

Beyond templates, the documented mandatory architecture includes:

- **Sections Everywhere** — Online Store 2.0 compatibility, not optional
- A **custom Liquid section** available on every template that supports one
- **Header and footer rendered inside section groups**
- **App blocks** in the main product and featured product sections

That last one is the requirement that quietly reshapes your product page. Merchants install review apps, subscription apps, size-chart apps. If your main product section does not accept app blocks, every merchant who buys your theme has to hire a developer on day two.

The merchant-facing feature list is similarly concrete: faceted search filtering, gift cards, accelerated checkout buttons, discounts, country and language selectors, multi-level menus, newsletter forms, pickup availability, product recommendations, rich media, predictive search, selling plans, Shop Pay Installments and unit pricing.

Unit pricing and pickup availability are the two that catch people. They look like edge cases from a North American desk and they are legal or operational requirements for a large share of merchants.

## Code rules that read like nitpicks and are not

Shopify requires **only native CSS** — no Sass or SCSS files in the submitted theme. It disallows minified CSS and JS with narrow exceptions for ES6 and third-party libraries. It requires SEO metadata, Open Graph tags and Twitter cards. It requires protocol-relative URLs and no hard-coded HTTP or HTTPS. It requires valid HTML with a proper `lang` attribute.

The no-minification rule is the one that tells you what the review is for. Shopify's reviewers read your code. A theme is a product that thousands of merchants and their developers will edit by hand for years, so it is reviewed as source, not as a bundle. If your build pipeline outputs one compressed CSS file, your pipeline is the thing that needs to change.

## The review process, and what Shopify does not publish

Submission runs through the Partner Dashboard: Themes → Submit a theme → upload the ZIP, acknowledge the Partner Agreement, then complete the theme submission form with your listing and preset information. Every preset must include at least one demo store, and Shopify's review team may access that demo store's admin during review.

Review is documented as **five stages**, and a theme must meet all requirements in a stage to advance to the next one. Shopify's own framing is that a submitted theme is expected to have been fully built to the requirements and fully tested for bugs before it arrives — poorly tested submissions are rejected rather than triaged.

Two outcomes are documented. If minor changes are needed, you receive an email listing the required changes. If the submission misses a requirement, it is rejected and you correct it before resubmitting. And there is a real penalty attached to ignoring feedback: per Shopify's documentation, if you resubmit without addressing the reasons for rejection, you could be temporarily suspended from submitting themes to the Theme Store.

**Here is what I could not verify.** Shopify does not publish a review turnaround time — not per stage, not end to end, not a service-level target. Nor does it publish a first-pass rejection rate. Developers trade estimates in forums; those are anecdotes, and I am not going to launder anecdotes into a statistic by putting them in an article. If you are planning a launch around a Theme Store listing, plan it with an unknown review window, because that is genuinely what you have.

The commercial term is documented: total theme revenues are subject to a **15% revenue share**, calculated on gross sales, not net.

## Why first submissions fail

Reading the requirements alongside the review structure, the failures cluster in a way that has nothing to do with talent:

**The theme was designed, then made compliant.** Accessibility at 90 average is an architectural property. Focus states, contrast, heading order and keyboard operability are cheap when they are in the first component and expensive when they are retrofitted across forty sections.

**It was tested on the demo, not on the benchmark.** Real catalogues have long titles, missing images, twelve variants and a review widget. Shopify tests with content. Test with content.

**Required templates were treated as optional.** Nobody screenshots the password page. It is still required.

**The design was not distinct enough.** Shopify requires unique and intentional design, requires themes to be exclusive to the Theme Store, and — this is the rule that ends a lot of projects before they start — states that new theme submissions built on or derived from Dawn or Horizon are not eligible. Starting from Shopify's own reference theme is the most natural instinct in the world and it disqualifies you.

## What this means if you are hiring rather than building

Most people reading this are not submitting a theme. They are trying to work out whether their [Shopify build](/shopify-development) is being done to a real standard.

The Theme Store requirements are a free, public, vendor-authored specification for what competent Shopify front-end work looks like. Ask whether your build meets the accessibility bar. Ask whether the main product section accepts app blocks, because that determines what your next three app installs cost you. Ask whether the code you are paying for is readable by the developer who comes after.

We apply the same standard to stores we operate ourselves. [Blackwater Aquatics](/work/blackwater-aquatics) is our own Shopify store — 64 content pages supporting 17 products — and the front end there is held to theme-review discipline for the same reason: it has to survive years of edits. The organic results that came out of it are documented separately in our [Shopify SEO guide](/stillawake-times/shopify-seo-guide), and the platform trade-offs sit in our [Shopify vs WooCommerce comparison](/shopify-vs-woocommerce). What it costs to work with us is on the [pricing page](/pricing), in writing, before you talk to anyone.

---

**Sources checked August 14, 2026:** `shopify.dev/docs/storefronts/themes/store/requirements`, `shopify.dev/docs/storefronts/themes/store`, `shopify.dev/docs/storefronts/themes/store/review-process`, `shopify.dev/docs/storefronts/themes/store/review-process/submit-theme`, `shopify.dev/docs/storefronts/themes/store/revenue-share`. Requirements change; verify against the live pages before you build to them.

---

Building a theme, or a store that should be held to the same standard? Describe it in writing at [stillawake.studio/start](https://stillawake.studio/start) and you get a written scope back. No sales call.
