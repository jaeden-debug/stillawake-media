---
title: "Shopify SEO: How to Get More Organic Traffic to Your Store"
date: "2026-05-24"
updated: "2026-10-29"
excerpt: "Shopify handles sitemaps, canonicals and robots.txt. Organic traffic comes from what it doesn't do: intent-mapped collections, original product pages and content."
category: "Shopify"
featured: true
image: "/best-website-design-for-small-businesses-2026-featured-image.jpg"
author: "Jaeden Doody"
---

**To get more organic traffic to a Shopify store, keep the technical defaults Shopify already gets right, close the few gaps it leaves open (collection-path product links, filter and tag URLs, internal search pages, app bloat), then put most of your effort into collections built around what people actually search for, original product pages, and education content that links to them.** Shopify will not stop you from ranking. It also won't make a thin store rank on its own.

This guide is written from operating a Shopify store, not just auditing other people's. Blackwater Aquatics Canada is our own store, and the figures from it below are one store's observations with their dates and windows, not proof that any single change caused anything. Platform behaviour was checked against Shopify's help centre, shopify.dev and Google Search Central as of October 2026.

## What Shopify already does for SEO (and where the defaults stop)

Before changing anything, know what the platform handles. Most "Shopify SEO fixes" sold as apps duplicate work the platform or theme already does.

### sitemap.xml

Every store gets an auto-generated `/sitemap.xml`. According to [Shopify's sitemap documentation](https://help.shopify.com/en/manual/promoting-marketing/seo/find-site-map), it links to child sitemaps for products, collections, blogs and pages, and includes your products, their primary product image, pages, collections and blog posts. You can't edit it by hand; it updates as you publish. If you sell in several languages, those languages are added automatically. If you run more than one domain for international targeting, each domain gets its own sitemap and you submit each one in Google Search Console.

What to do: submit `/sitemap.xml` in Search Console, then use the Pages report to compare what you submitted with what Google indexed. Don't install an app to "generate" a sitemap. You already have one.

### robots.txt and robots.txt.liquid

Shopify serves a default `robots.txt`, and [its documentation](https://help.shopify.com/en/manual/promoting-marketing/seo/editing-robots-txt) describes it as already suited to most stores. The default rules keep crawlers out of the cart and checkout, sorted collection URLs (`/collections/*sort_by*`) and multi-tag collection URLs (`/collections/*+*`). On the live default file we checked, there is also a rule for collection URLs carrying more than one storefront filter.

You can customize it by adding a `robots.txt.liquid` template to your theme. Shopify recommends editing it with Liquid so the platform can keep the default rules up to date, and warns that this is an unsupported customization and that mistakes can wipe out your search traffic. Treat it as a scalpel. The most common legitimate edit is blocking a crawl trap, such as a third-party search or filter app that creates endless parameter URLs.

### Canonical tags and the /collections/x/products/y problem

Every Shopify product can be reached at two kinds of URL:

- `/products/blue-shirt` (the canonical product URL)
- `/collections/shirts/products/blue-shirt` (the same page in a collection context)

Themes print `<link rel="canonical" href="{{ canonical_url }}">` in the head. On a collection-context product URL, that canonical normally points back to `/products/blue-shirt`, which is what you want. Variant URLs (`?variant=123`) also resolve to the base product as canonical.

The part most guides skip is *how your theme links to products*. Shopify's [`within` Liquid filter](https://shopify.dev/docs/api/liquid/filters/within) builds the collection-context URL, and Shopify's own documentation tells developers to consider the SEO implications of using it. If your collection grid uses `product.url | within: collection`, every internal link on every collection page points at a non-canonical duplicate. Google may still consolidate correctly, but you're sending it mixed signals: canonical says one URL, thousands of internal links say another.

Shopify's reference theme, Dawn, links product cards to the plain product URL (`card_product.url`). Many older and third-party themes don't. Check yours:

1. Open any collection page, view source, and look at the `href` on product cards. If it contains `/collections/` before `/products/`, your theme uses `within`.
2. In Search Console, open Pages → "Alternate page with proper canonical tag". If it's full of `/collections/.../products/...` URLs, Google is crawling your duplicates.
3. The fix is usually one line in the product card snippet: remove `| within: collection`. Breadcrumb logic that relies on collection context may need adjusting at the same time.

### Tag pages, filters, sorting and pagination

These are where Shopify stores quietly create thousands of low-value URLs, which matters more after a "Crawled – currently not indexed" warning than almost anything else.

| URL pattern | Example | Default behaviour | What we recommend |
|---|---|---|---|
| Single tag | `/collections/food/live` | Crawlable | Don't use tags as a navigation system. If a tag combination deserves to rank, make it a real collection with its own copy. |
| Multiple tags | `/collections/food/live+frozen` | Disallowed in default robots.txt | Leave as is. |
| Sort | `?sort_by=price-ascending` | Disallowed in default robots.txt | Leave as is. |
| Storefront filters | `?filter.p.product_type=...` | Single-filter URLs crawlable; multi-filter combinations disallowed on the default file we checked | Don't link to filter URLs from menus or content. Promote any filtered view that matches real demand into a proper collection. |
| Pagination | `?page=2` | Crawlable | Leave it. Google advises against [pointing page 2 at page 1 as canonical](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading) and no longer uses rel=next/prev. |
| Internal search | `/search?q=...` | Depends on your theme and robots file | Add a `noindex` meta tag (below). |

Google's guidance is that filter and sort variations of the same list should be kept out of the index with `noindex` or a robots.txt pattern. Pick one per URL type. If a URL is blocked in robots.txt, Google can't fetch it to see a `noindex`.

### Internal search results

Search results pages are thin, endless and sometimes spammable: anyone can link to `/search?q=anything`. Shopify's [guide to hiding pages from search engines](https://help.shopify.com/en/manual/promoting-marketing/seo/hide-a-page-from-search-engines) gives the snippet for the `<head>` of `theme.liquid`:

```liquid
{% if template contains 'search' %}
<meta name="robots" content="noindex">
{% endif %}
```

Check your live `/robots.txt` first. If it already has `Disallow: /search`, Google won't crawl those pages to see the tag. That's usually fine, but blocked URLs can still be indexed (without content) if other sites link to them. The same help page covers the `seo.hidden` metafield and the "Unlisted" product status for hiding individual products or pages.

## Collection architecture: map collections to search intent

Collections are the pages most likely to rank for commercial category searches ("live fish food canada", "linen bedding queen"). Most stores create collections around internal logic like supplier, season or "New In" instead of how buyers search.

A workable process:

1. **List the category searches you could plausibly win.** Use Search Console queries if you have history, plus keyword data and the autocomplete suggestions buyers see. Group queries that want the same page.
2. **One collection per intent.** If "betta food" and "food for bettas" show the same results, they belong on one page. If "live fish food" and "frozen fish food" show different results, they need different collections.
3. **Handle = the intent.** `/collections/live-fish-food`, not `/collections/frontpage-2`. Set it before the page earns links. Changing it later means a redirect.
4. **Write copy that helps someone choose.** A short intro above the grid and a buying guide below it: which product suits which situation, what to compare, shipping or climate notes for your market. Shopify's [SEO guidance](https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords) suggests keeping titles to about 60 characters and meta descriptions to about 160.
5. **Use automated collections where they're actually rule-based.** Use manual collections where curation is the point.

Shopify doesn't support nested collection URLs (`/collections/food/live` is a tag URL, not a sub-collection). Hierarchy comes from navigation menus, breadcrumbs and links between parent and child collections.

**What our store does:** Blackwater Aquatics runs four collections, each built around a specific Canadian search intent, such as live fish food in Canada and betta fish in Canada, with clean canonical structure. On our own store the collection pages rank on their own, but we didn't run a controlled test, so we can't separate how much of that comes from the structure and how much from the content behind it.

## Product page optimization

### Titles, descriptions and variants

The product title becomes the page's H1. The SEO title (search engine listing) can be edited separately, and that's where you add the qualifier a searcher uses: size, format, compatibility, "Canada". If you leave it blank, the theme combines the product title with your shop name.

Descriptions are where most stores lose. Manufacturer copy appears on every other retailer selling the same item, so it gives Google no reason to pick your page. Write what only you know: who it's for and who it isn't for, how to use it, what goes wrong, how it compares with the item next to it, and what shipping or storage looks like in your climate. Shopify's own help suggests at least 250 words of descriptive text per product. Treat that as a floor for usefulness, not a ranking rule.

Variants: use them for true variations of one product (size, colour, quantity). They share one URL and one canonical. If two "variants" answer different searches (a different species, a different use), make them separate products so each can have its own title, copy and URL.

### Structured data and Google's merchant listings

Most current themes output Product structured data using Shopify's [`structured_data` Liquid filter](https://shopify.dev/docs/api/liquid/filters/structured_data), which produces a schema.org `Product` with a nested `Offer`, or a `ProductGroup` for products with variants. Older themes often hand-roll their own JSON-LD, and review or SEO apps sometimes add a second block. Duplicate or conflicting Product markup is one of the most common problems we find in audits.

Google's [merchant listing documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) requires a product `name`, a crawlable `image`, and an `Offer` (not an `AggregateOffer`) with a price above zero and a currency. Run a product URL through Google's Rich Results Test, confirm one Product entity, and confirm the price and availability match the page. Our [schema markup generator](/tools/schema-markup-generator) is useful for checking what a correct block looks like, but on Shopify the fix is usually in the theme, not a pasted snippet. Note that Google retired the FAQ rich result in 2026, so FAQ markup on product pages won't earn an expanded listing.

Separately, install Shopify's [Google & YouTube](https://help.shopify.com/en/manual/online-sales-channels/google) sales channel. It syncs your catalogue to Google Merchant Center, which is the feed behind free product listings on Google's Shopping surfaces. A clean feed and clean on-page markup support each other: the same price, availability and GTIN in both places.

### Images: alt text and file names

Shopify lets you set alt text on product media, collection images and blog featured images. Describe the image for someone who can't see it, and include the product name and the attribute shown: "Scud culture in shipping container, top view" rather than "IMG_4471". Rename files before upload (`live-scud-culture-container.jpg`), because the original file name carries into the CDN URL. Upload at sensible dimensions: themes request resized versions through the CDN, but an oversized original still costs you.

**What our store saw:** in Search Console, Blackwater's scud-culture product page earned 233 organic clicks at an 8.55% click-through rate, at an average position of 8.5, over the 180-day window ending August 13, 2026. Product pages in a narrow niche don't usually earn that on their own. That page is linked from the care content described below. It's one page on one store, and we can't isolate which factor mattered most.

## Page speed: theme and app bloat

On Shopify you don't manage servers, so speed problems almost always come from the theme and the apps.

- **Measure real users first.** Shopify's [web performance dashboard](https://help.shopify.com/en/manual/online-store/web-performance/web-performance-dashboard) reports LCP, INP and CLS from real-user data over the past 30 days, at the 75th percentile. Use that, and Search Console's Core Web Vitals report, before trusting a single lab score.
- **Audit apps quarterly.** Every review widget, popup, upsell and tracking pixel adds JavaScript. Apps built on theme app extensions are removed when uninstalled. Older apps that edited theme files directly can leave snippets behind, so search `theme.liquid` and `snippets/` for leftover script tags after uninstalling.
- **Watch the hero.** A carousel of full-width images, a background video or a late-loading font is usually the LCP problem on the homepage and collection pages.
- **Treat theme choice as a performance decision.** A theme packed with sections you'll never use ships code you'll always load.

Our guide to [what technical SEO covers](/stillawake-times/what-is-technical-seo) goes deeper on Core Web Vitals and rendering.

## Internal linking and education content

This is where Shopify stores have the most room to stand out, because the platform gives you a blog and pages but no strategy.

Product and collection pages answer "where do I buy". Education content answers the questions people ask before that: how to choose, how to use, what goes wrong, which option fits which situation. Each article should link to the one or two collections or products it naturally leads to, using descriptive anchor text, and those product and collection pages should link back to the guide that answers their main objection.

Rules we apply:

- **One page per question.** Two articles answering the same question compete with each other.
- **Link from collections to guides and from guides to collections.** Not only from the blog index.
- **No orphan pages.** Every article needs a link from a collection, a product or a hub page, not just the blog feed.
- **Update instead of duplicating.** When a guide goes stale, refresh it and keep the URL.

**What our store looks like:** Blackwater Aquatics has 64 education pages and four blogs behind a 17-product catalogue. In the same 180-day Search Console window ending August 13, 2026, the top 12 URLs earned 912 organic clicks from 59,377 impressions. Care guides held average positions of 7.1–8.3 on their queries, and one betta-fry guide earned 18,457 impressions on its own. These are observations from a small niche store. They show the content is being found, not that the same ratio will work in your category. The full numbers and disclosure are in the [Blackwater Aquatics case study](/work/blackwater-aquatics).

## International and bilingual stores (Shopify Markets)

For Canadian stores selling in English and French, or across borders, Shopify Markets handles more than many guides suggest. According to [Shopify's international SEO documentation](https://help.shopify.com/en/manual/markets/seo):

- Hreflang tags are generated automatically from your market and language setup. Shopify warns that turning them off can hurt SEO unless you replace them.
- Subfolders (for example `/fr/` or `/en-us/`) are recommended for most stores.
- Sitemaps include market-specific URLs automatically.
- Location-based redirection applies to shoppers, but known search engine crawlers are excluded.
- Each market or language version gets a self-referencing canonical.

Where stores go wrong: untranslated content that falls back to English on the `/fr/` URLs (creating near-duplicates), apps that inject their own hreflang alongside Shopify's, and English handles left on French pages. For a Québec store, budget for real French copy on collections and top products, not just a machine-translated theme.

## Redirects when migrating or renaming

Changing a product or collection handle in the admin normally offers a "Create a URL redirect" checkbox. Leave it ticked. When migrating from WooCommerce or another platform, export every indexed URL first (from Search Console and a crawl), map each one to its closest equivalent, and import the redirects by CSV. Per [Shopify's redirect documentation](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect):

- Redirects only fire from URLs that no longer resolve. If the old page still exists, the redirect is ignored.
- Hiding a product or setting it to Draft makes its URL 404, which allows a redirect.
- Standard plans allow up to 100,000 redirects.

Don't redirect everything to the homepage. Google tends to treat that as a soft 404. If you're still choosing a platform, our [Shopify vs WooCommerce comparison](/shopify-vs-woocommerce) covers migration trade-offs.

## Apps: what to use and what to skip

Skip apps that:

- generate a sitemap or robots.txt (you have both),
- inject a second Product schema block on top of your theme's,
- auto-generate hundreds of "SEO landing pages" or tag pages,
- promise automatic alt text or meta descriptions written from templates.

Use apps judiciously for:

- reviews (if they output markup, make sure it merges with your theme's rather than duplicating it),
- the Google & YouTube channel,
- translation, if you sell bilingually,
- bulk editing of metadata when you have hundreds of products.

After any install, check page speed and view source for duplicate structured data.

## Prioritized Shopify SEO checklist

In order of impact for most small and mid-size stores:

1. **Search Console set up** for every domain, sitemap submitted, Pages report reviewed for "Crawled – currently not indexed" and "Alternate page with proper canonical tag".
2. **Product links in collection grids** point to `/products/handle`, not `/collections/.../products/...`.
3. **Collections mapped one-to-one to search intents**, with clean handles, unique titles and helpful copy.
4. **Top 20 product pages** rewritten with original descriptions, SEO titles that match how buyers search, and descriptive alt text.
5. **One valid Product/Offer block per product page**, price and availability matching the page and Merchant Center.
6. **Internal search `noindex`**, tag navigation removed or replaced by collections, filter URLs not linked from menus.
7. **App and theme audit**, judged by Core Web Vitals from real users.
8. **Education content plan**: one page per real buyer question, each linked to and from its collection.
9. **Markets and hreflang** checked if you sell in more than one language or country.
10. **Redirect map** for every handle change or migration.

If you'd rather start with data, our [free SEO audit tool](/tools/seo-audit) flags many of the on-page issues above.

## Where this fits

If you're still at the setup stage, start with [how to build a Shopify store](/stillawake-times/how-to-build-a-shopify-store) and [what a Shopify store costs in Canada](/stillawake-times/how-much-does-a-shopify-store-cost-canada). The architecture is far cheaper to get right before launch than to fix after.

StillAwake Media builds and fixes Shopify stores with this structure from the start: theme code, collection architecture, structured data and content plans. If your store has pages Google crawls but won't index, or collections that don't rank, our [Shopify development](/shopify-development) team can review the theme and URL structure with you.
