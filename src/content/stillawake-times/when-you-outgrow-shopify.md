---
title: "When You Actually Outgrow Shopify (And When It's Just Your Theme)"
date: "2026-08-15"
excerpt: "Most stores that want to leave Shopify have not outgrown the platform — they have outgrown their theme and their app stack, which is a far cheaper problem to fix."
category: "Shopify"
featured: false
author: "Jaeden Doody"
---

**You have genuinely outgrown Shopify when the platform blocks a business rule you cannot change: checkout logic the plan will not let you touch, B2B pricing your catalogue cannot express, or an integration whose volume exceeds what the API will give you. Every other complaint — slow pages, an admin that fights you, a store that cannot do what you pictured — is almost always the theme and the app stack, and replatforming will carry both problems to the new platform at ten times the cost.**

I want to argue against the migration before I argue for it, because in the majority of these conversations the migration is the wrong answer and it is the expensive one.

## The four signals that are real

These are constraints of the platform itself. If one of these is your situation, the conversation is legitimate.

### 1. Checkout logic you are not permitted to change

Shopify's checkout is the part of the stack it holds most tightly, and how much of it you can modify depends on your plan. If your business requires conditional logic inside the checkout — a rule about who is allowed to buy what, a pricing calculation that runs at payment time, a compliance step or an approval gate before an order can be placed — you are pressing on the one boundary Shopify draws hardest.

Before concluding you are blocked, confirm what your specific plan permits today. Shopify's checkout extensibility surface and the plan tiers that unlock it have changed repeatedly, and a limitation someone hit two years ago may not exist now. Check Shopify's current checkout documentation for your plan rather than trusting a forum post or this article.

### 2. B2B pricing rules your catalogue cannot express

Wholesale is where Shopify most often runs out of room in a way that is not fixable with a theme. Customer-specific price lists, negotiated per-account terms, minimum order quantities that vary by account, purchase orders, net-30 invoicing, tiered volume breaks that stack with contract pricing — these are relational business rules, and a product catalogue is not a relational pricing engine.

Shopify has B2B features and they cover a meaningful slice of this. The question is not "does Shopify do B2B" — it does — but "does Shopify express *my* pricing rules without a stack of apps holding the logic together." When your pricing lives in three apps that each hold a piece, you have not built B2B; you have built a liability.

### 3. Catalogue and variant structure that does not fit

Every commerce platform imposes a product model, and Shopify's is products with variants along a fixed number of option axes. Businesses that sell genuinely configurable goods — made-to-measure, per-dimension pricing, dependent option trees where selecting one option changes what other options exist — are trying to store a configurator inside a variant table.

Shopify's variant and option limits have been raised more than once and differ by plan, so I am deliberately not quoting a number here that would be wrong within a year. Look up the current limits in Shopify's own product documentation. What is stable is the shape of the constraint: variants are a flat matrix, and if your product is a decision tree, the matrix will keep losing.

### 4. Integration volume and API limits

If you are syncing an ERP, a warehouse system, or a real-time inventory feed across multiple channels, API rate limits stop being trivia and become the architecture. This shows up as scheduled syncs that no longer finish inside their window, inventory that drifts between systems, and an integration that mostly works until a sale weekend.

The honest test: has an integration actually failed under load, with logs, or does someone merely believe it will? Those are very different situations.

## The far more common case: your theme is the problem

Now the part that saves people money.

Here is a diagnostic that costs nothing. Open your store on a phone, on cellular, not office wifi. Run Lighthouse on your product page — the product page, not the home page. Then open your Shopify admin and count your installed apps.

For context on what "acceptable" means, Shopify's own Theme Store requires a minimum 60 average Lighthouse performance score and a minimum 90 average accessibility score across product, collection and home pages, desktop and mobile, before it will publish a theme at all (verified at `shopify.dev/docs/storefronts/themes/store/requirements`, August 14, 2026). That is Shopify's floor for a theme with no merchant content in it yet. If your live store is below that floor, your store is slower than the worst theme Shopify is willing to list — and the platform is not what made it slow.

What actually made it slow, in roughly the order I find it:

**Apps you stopped using but never removed.** Uninstalling an app frequently leaves its script tags and theme snippets behind. I have opened themes carrying code for review apps the merchant replaced two years ago. The store is still paying to load it on every page.

**Overlapping apps.** Two popup tools, three analytics scripts, a review app and a separate rating widget. Each was a reasonable decision in isolation; together they are the site.

**A theme built for a demo.** Premium themes are optimized to look extraordinary with twelve products and professional photography. Load 900 SKUs and user-generated images into one and the same theme behaves entirely differently.

**Images nobody ever compressed.** Still the single most common cause of a slow product page, and still the cheapest to fix.

None of these are Shopify. All of them will follow you to a new platform, because they are your content and your decisions, and the migration will simply re-create them in a codebase with fewer guardrails.

## What the migration actually costs

Replatforming an ecommerce store is not a website project. It is a data project with a website attached.

You are moving a catalogue with its variants and inventory, customer accounts whose passwords cannot be transferred because they are hashed, order history, active subscriptions, tax configuration, shipping rules, every integration with accounting and fulfilment, and a URL structure that determines whether your organic traffic survives. Then you rebuild the checkout — the part Shopify was doing for you, correctly, including PCI compliance, fraud tooling and payment method coverage.

In the 2026 Canadian market, a serious ecommerce build runs roughly $5,000 to $30,000 or more depending on catalogue complexity and integrations. A migration off Shopify sits at the top of that range or beyond it, and the number that is never in the quote is the six months afterward where the team is fixing things instead of selling.

The realistic alternative — a new theme built properly, an app audit that removes half the stack, and a proper image pipeline — is a fraction of that, and you find out within weeks whether it solved the problem.

## What "not outgrowing it" looks like in practice

We operate [Blackwater Aquatics](/work/blackwater-aquatics) ourselves — it is our store, not a client's. Seventeen products, four collections, 64 content pages. By raw catalogue size it is a small store, and by every naive metric it should have "outgrown" nothing.

The growth there came from structure, not platform: content architecture around the catalogue, product pages built to be found and to answer questions. A product page holds page one at an 8.61% organic click-through rate at position 8.5, and the repeat-customer rate moved from 5.9% to 27.8% period over period (Shopify, 30-day window; Search Console, 180-day window ending August 12, 2026). Not one of those numbers required a different platform. Several of them required rewriting the theme.

The pattern generalizes. The stores I have seen genuinely constrained by Shopify were constrained by a *business rule* — a wholesale structure, a regulated checkout step, a configurator. The stores that felt constrained were constrained by their own front end.

## How to decide in one afternoon

Write down the single thing you cannot do today. One sentence, specific.

If it is a business rule — "I cannot give account-specific contract pricing to 40 wholesale customers," "I cannot require an approval step before an order is placed" — check Shopify's current documentation for your plan, because the answer changes, and then scope a real evaluation. That is [ecommerce architecture work](/shopify-development), and sometimes the answer is a custom application beside Shopify rather than instead of it. What that costs and what drives the cost is in [custom software development cost in Canada](/stillawake-times/custom-software-development-cost-canada).

If it is "my site is slow," "my pages don't convert," or "my admin is annoying" — you have a theme and app problem. Fix that first, for a tenth of the money, and see what is left. Our [website redesign](/website-redesign) work and the organic side in our [Shopify SEO guide](/stillawake-times/shopify-seo-guide) cover most of it, and if you are genuinely comparing platforms rather than escaping a theme, [Shopify vs WooCommerce](/shopify-vs-woocommerce) is the honest version of that comparison.

The trade-off worth stating plainly: staying on Shopify means accepting constraints you did not choose, in exchange for a checkout, a payments stack and a security posture you do not have to maintain. Leaving means owning all of it. Most businesses that leave underestimate the second half of that sentence.

---

Not sure which one you have? Describe the specific thing your store cannot do at [stillawake.studio/start](https://stillawake.studio/start) and you get a written assessment back — including "you don't need us for this." No sales call.
