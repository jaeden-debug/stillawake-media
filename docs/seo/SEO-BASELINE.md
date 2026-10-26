# SEO baseline (verified 2026-10-26)

All figures were pulled live on 2026-10-26 through Zylx (Search Console property `sc-domain:stillawakemedia.com`, GA4 property 549901138, Google Ads 800-560-2976) and a crawl of the live site. Search Console data ends 2026-10-24 (normal 2–3 day lag).

## Organic search (Search Console)

**Property-level totals** come from the device breakdown, which counts each search once and includes anonymized queries.

| Window | Clicks | Impressions | Notes |
|---|---:|---:|---|
| Last 28 days (Sep 28 – Oct 24) | **2** | **23** | Desktop 1/18 (avg pos 29.1), mobile 1/5 (42.2) |
| Last 90 days (Jul 28 – Oct 24) | **20** | **156** | Desktop 13/136 (25.1), mobile 7/20 (12.1) |
| All available (Jul 3 2025 – Oct 24 2026) | **22** | **231** | Desktop 14/207 (34.7), mobile 8/24 (18.0) |

**Correction:** the earlier diagnosis quoted "~450 impressions in 90 days". That summed page-level rows, which double-count, so it overstated visibility. 156 is correct.

- **Trend:** falling. Impressions peaked on Aug 12–15 (relaunch and redirect cleanup), then dropped to 0–2 a day.
- **Geography:** Canada has 19 of 22 clicks and 147 of 231 impressions. The rest is scattered single impressions.
- **Brand vs non-brand:** the homepage earned 19 of 22 clicks (all-time page view, avg pos 3.4). The visible non-brand queries have 0 clicks. Brand queries are mostly anonymized, so the split can't be measured exactly.
- **Search Console shows only 28 distinct query-page pairs**, which means most impressions come from anonymized queries.

### Commercial queries (all time, query × page)

| Query | Page | Impr. | Avg pos |
|---|---|---:|---:|
| "prix site web québec" | /fr/prix-site-web-quebec | 42 | 14.2 |
| web design montreal | /web-design-montreal | 19 | 96.2 |
| montreal web design | /web-design-montreal | 10 | 98.2 |
| montreal web designer | /web-design-montreal | 3 | 98.7 |
| agence web montreal | /fr/agence-web-montreal | 3 | 99.7 |
| agence web design montreal | /fr/agence-web-montreal | 2 | 96.5 |
| agence webflow montreal | /fr/agence-web-montreal | 4 | 86.8 |
| local seo services montreal | /seo-montreal | 1 | 99 |

### Pages (all time, page-level avg position)

- **Positions 4–10 with impressions (CTR opportunities):**
  - /about: 47 impr., pos 2.8
  - /contact: 37, pos 5.4
  - /portfolio (now /our-work): 25, pos 4.7
  - /software-development: 22, pos 5.0
  - /services: 21, pos 7.4
  - /stillawake-times: 21, pos 6.1
  - /pricing: 17, pos 5.8
  - /products: 14, pos 5.5
  - /ai-automation: 13, pos 6.8
  - /branding: 12, pos 4.5

  Most of these impressions are brand or navigational queries.
- **Positions 11–20:**
  - /fr/prix-site-web-quebec: 42, pos 14.2
  - /seo-montreal: 25, pos 14.0
  - /stillawake-times/best-website-design-for-small-businesses-2026: 4, pos 11.3
- **Positions 21–50:**
  - /web-design-montreal: 66, pos 49.4 (averaged; its commercial queries sit at about 96)
  - /fr/maintenance-site-web: 5, pos 39.4
- **Positions 50+:**
  - /fr/agence-web-montreal: 14, pos 84.6
  - /stillawake-times/why-nextjs-is-the-best-framework-for-modern-websites: 15, pos 69.7
  - /stillawake-times/what-is-a-custom-web-application: 6, pos 80.3
  - /stillawake-times/what-makes-a-luxury-brand-website-feel-premium: 3, pos 80.7

## GA4 (last 90 days, whole property)

The property is shared with stillawake.studio (see CONVERSION-TRACKING.md), so these numbers include Studio sessions.

- **Totals:** 117 sessions, 75 users, 309 page views. Engagement rate 67.5%, average session 285 s.
- **Channels:** Cross-network 31, Organic Search 26, Direct 21, AI Assistant 16, Referral 7, Unassigned 7, Organic Social 6, Paid Search 3.
- **Key events:** `contact_form_submit` 2, `ads_conversion_SUBMIT_LEAD_FORM_1` 2 (the same two leads, seen through Google Ads' tag), `calculator_completed` 37 (2 users), `cta_click_start` 9, `start_onboarding` 4 (Studio).
- **Landing pages that don't exist on this site:**
  - `/start` (Studio).
  - `/prints` and `/contact-us`: inbound links from a previous site version. `/contact-us` now redirects to `/contact`.

## Google Ads (last 90 days)

- **One campaign:** "Campaign #1", Performance Max, ENABLED. Cost CA$4.64, 182 impressions, 7 clicks, 0 conversions.
- **Final URL** is `https://www.stillawakemedia.com/` (www, which 308-redirects to the apex).
- **Search terms report:** returns no rows (normal for low-volume Performance Max).
- **Conversion actions:** two primary SUBMIT_LEAD_FORM actions (see CONVERSION-TRACKING.md).

## Technical (crawl of all 279 sitemap URLs, 2026-10-26)

Script: `scripts/seo-crawl.mjs`.

- **No problems in:**
  - HTTP status (0 non-200 pages)
  - titles and descriptions (0 missing, 0 duplicate)
  - H1s (0 pages with ≠1)
  - canonicals (0 not self-referencing)
  - indexing (0 noindex)
  - images (0 missing alt)
  - links (0 broken internal links)
- **Found:**
  - 2 non-reciprocal hreflang pairs: `/fr` → `/` and `/fr/contact` → `/contact`. The English pages had no `languages` alternates.
  - 4 internal links pointing at redirects, all in old markdown article content.
  - 1 page with no internal links to it: `/fr/developpement-framer`.
  - 127 titles over 70 characters including the brand suffix (68 over 80); 149 descriptions over 170 characters (99 over 200). Mostly articles, especially French.
- **Indexing:**
  - The current sitemap (`https://stillawakemedia.com/sitemap.xml`) was submitted 2026-08-12 and last downloaded 2026-10-24, with 0 errors and 0 warnings.
  - The Search Console sitemap API reports "0 indexed" on every property in the account, including ones with clicks. That's a reporting gap, not a defect.
  - Live URL Inspection isn't available through the API.
- **Redirects:**
  - www and http redirect to the apex with 308.
  - `http://www.` takes two hops (minor; it's at the host level).

## Data sources available and not available

| Source | Status |
|---|---|
| Search Console (Zylx) | Connected, verified |
| GA4 (Zylx) | Connected, verified |
| Google Ads, including Keyword Planner (Zylx) | Connected, verified |
| Microsoft Clarity (Zylx) | Connected |
| Ahrefs (direct MCP) | Plan doesn't include Site Explorer or SERP reports ("Insufficient plan") |
| Semrush (direct MCP) | Out of API units |
| Ahrefs / Semrush in Zylx | Not connected |
| PageSpeed Insights API | Anonymous daily quota exhausted on 2026-10-26 |
| Live URL Inspection | Not available via API |
