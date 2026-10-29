# Content performance tracker

Measures whether Roblox, AI search, tools, Shopify or software content produces results, cluster by cluster. Do not judge a page before 90 days unless it has had impressions for at least 30.

## Cluster definitions (URL patterns)

| Cluster | URLs |
|---|---|
| A Roblox | `/games/guides/*`, `/stillawake-times/how-to-make-a-roblox-game`, `…/how-to-make-a-horror-game-in-roblox-studio`, `…/how-to-fix-lag-in-roblox-studio` (game pages and wikis tracked separately as "Games") |
| B AI search | `/tools/llms-txt`, `/stillawake-times/what-is-generative-engine-optimization`, `…/can-chatgpt-recommend-my-business`, `…/how-to-appear-in-google-ai-overviews`, `/answer-engine-optimization` |
| C Tools | `/tools`, `/tools/*` except `/tools/llms-txt` |
| D Shopify | `/stillawake-times/shopify-seo-guide`, `…/how-much-does-a-shopify-store-cost-canada`, `…/how-to-build-a-shopify-store`, `/shopify-vs-woocommerce`, `/shopify-development` |
| E Software & automation | `/stillawake-times/app-development-cost-canada`, `…/custom-software-development-cost-canada`, `…/how-businesses-use-ai-automation-to-save-hundreds-of-hours`, `/software-development`, `/ai-automation` |

In GA4, create these as content groups or as landing-page filters in an exploration (owner action; regex per row).

## Baseline — before publication

Source: Search Console via Zylx, property `sc-domain:stillawakemedia.com`, 90 days 2026-07-31 → 2026-10-27, final data, read 2026-10-29.

| Cluster | Impressions | Clicks | Pages with impressions | Notes |
|---|---:|---:|---:|---|
| A Roblox | 0 | 0 | 0 | Guides first committed 2026-10-25; not yet in GSC data |
| B AI search | 3 | 0 | 1 (`/answer-engine-optimization`, pos 4.3) | |
| C Tools | 6 | 1 | 1 (`/tools/project-cost-calculator`, pos 4.5) | |
| D Shopify | 5 | 0 | 2 (`/shopify-development` 4, `shopify-seo-guide` 1) | |
| E Software | 12 | 0 | 2 (`/software-development` 10, `/ai-automation` 2) | |
| Whole property (sum of page rows) | 367 | 23 | 42 | Mostly brand and homepage; page-row sums exceed property totals because one query can show several pages |

Search Console's Page indexing report (updated 2026-10-22): 45 indexed, 127 discovered-not-indexed, 11 crawled-not-indexed (`discoverability-week1-2.md`).

Non-branded clicks to cluster pages: 0. Organic contact-form leads attributable to cluster pages: not separable yet (GA4 `contact_form_submit` by landing page).

## What to record at each review

Per cluster: impressions, clicks, CTR, average position, non-branded clicks, number of indexed URLs (URL Inspection or Page indexing), top 5 queries per page, GA4 engaged sessions, tool events (SEO audit runs, calculator completions — instrument first, see below), clicks to `/games/*` and roblox.com from articles, service-page visits from articles, contact submissions, referring domains (if Ahrefs/Semrush access, B-08), identifiable AI referrals (chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com).

## Reviews

| Review | Date | Status |
|---|---|---|
| Publication baseline | 2026-10-29 | [x] above |
| 30-day | 2026-11-30 | [ ] |
| 60-day | 2026-12-30 | [ ] |
| 90-day | 2027-01-29 | [ ] |

## Instrumentation gaps

- SEO audit tool: GA4 `seo_audit_run` / `seo_audit_run_failed` with a fail band (consented visitors), and the consent-free `tool_usage_daily` counter for everyone (2026-10-29, #45 and #49). The audited URL is never recorded.
- The app calculator reuses the project calculator's existing events (`calculator_started`, etc.); it can be separated by `page_location`.
