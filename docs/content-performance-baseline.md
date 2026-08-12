# Content Performance Baseline — stillawakemedia.com

Snapshot taken **2026-08-12**, the day Waves A–C shipped and the Zylx/GSC connection went live.
Compare against this at the 7-day (Aug 19), 28-day (Sep 9), and 90-day (Nov 10) reviews.
Source: Google Search Console via Zylx workspace `6ea0e2aa` (property `sc-domain:stillawakemedia.com`), 28-day window.

## Site-wide baseline (28 days pre-launch)

- **Total: ~28 impressions, 2 clicks.** Both clicks on the homepage at position 5 (brand queries).
- Pages with impressions at positions 2–9 (tiny volumes, mostly navigational): /, /about, /branding, /contact, /portfolio, /seo-montreal (pos 8.5), /services, /shopify-development (6.5), /software-development (6.2), /web-design-montreal (8.7), best-website-design article (pos 2).
- First non-brand footprints: "custom web application" cluster (pos ~96), "agence webflow montreal" → /fr/agence-web-montreal (pos 86.8), "next javascript framework" (pos 71).
- Interpretation: the site is indexed and being tested by Google, but has essentially zero query history. Everything measured from here is attributable to the new architecture + content.

## Technical state at baseline (verified 2026-08-12)

- 18-URL sample (all new content + money pages): all 200, all in sitemap, all self-canonical, zero noindex/robots blocks.
- ⚠️ **Open item:** the `sc-domain:stillawakemedia.com` property has NO current sitemap submitted — its only sitemap entry is `https://www.stillawakemedia.com/sitemap_index.xml` from **2017** (a previous site on this domain; 7 warnings, last downloaded 2019). The current `https://stillawakemedia.com/sitemap.xml` (96 URLs) must be submitted in the GSC UI and the 2017 relic removed. The .dev and .studio sitemaps were submitted correctly on 2026-08-12.

## Published in this wave (track these URLs)

| URL | Target query (volume/mo, geo) | Published |
| --- | --- | --- |
| /stillawake-times/what-is-generative-engine-optimization | generative engine optimization (720, CA) | 2026-08-12 |
| /stillawake-times/what-is-aeo-answer-engine-optimization | what is aeo (390, CA, rising) | 2026-08-12 |
| /stillawake-times/how-much-does-seo-cost-canada | seo pricing (170) + how much does seo cost (50) | 2026-08-12 |
| /stillawake-times/can-chatgpt-recommend-my-business | chatgpt seo (90) + recommendation intent ($46 bids) | 2026-08-12 |
| /stillawake-times/core-web-vitals-guide | core web vitals (480, LOW comp, rising) | 2026-08-12 |
| /fr/fiche-google-entreprise | fiche google entreprise (90, QC, rising, $44 bids) | 2026-08-12 |
| /fr/referencement-naturel | seo définition (90) + référencement naturel (70) | 2026-08-12 |
| /fr/audit-seo | audit seo (110, QC) | 2026-08-12 |
| /fr/etre-cite-par-ia | seo ia (50) + référencement ia (rising) | 2026-08-12 |
| /fr/boutique-en-ligne-quebec | créer une boutique en ligne (90, QC) | 2026-08-12 |

Refreshed with `updated: 2026-08-12`: shopify-seo-guide (shopify seo, 320), google-business-profile-optimization (GBP optimization, 320, rising).
Consolidated (expect their trickle to shift to money pages): 4 Montréal stub articles → 308 to /web-design-montreal, /software-development, /shopify-development.

## Review protocol

At each checkpoint pull `get_gsc_keywords` + `get_gsc_pages` (28d) from the StillAwake workspace and ask:
1. Are the 10 new URLs indexed and earning impressions? (7-day: indexing; 28-day: impressions; 90-day: positions)
2. Which queries surfaced that we didn't target? (new-article candidates for Wave D)
3. Did the consolidation 308s transfer the Montréal stub impressions to the money pages?
4. High-impression/low-CTR rows → title/description fixes before writing anything new.
Wave D publishing decisions are gated on this data — no volume without evidence.
