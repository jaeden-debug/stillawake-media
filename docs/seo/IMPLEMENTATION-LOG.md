# Implementation log

Newest first. Each entry lists what changed, how it was verified, and what is still open.

## 2026-10-26 — Studio generate_lead delivery fixed

- **Cause:** `generate_lead` (0 events in 90 days) fired in the same tick as the redirect to .com/thank-you and was lost. `start_onboarding`, from the same tag with no redirect after it, recorded 4.
- **Fix:** [stillawake.studio#1](https://github.com/jaeden-debug/stillawake.studio/pull/1), merged as `d902e37`. The redirect awaits gtag's `event_callback` (capped at 1.5 s) and the hit is sent by beacon. A tracking error never blocks the redirect.
- **Verified:** 123/123 tests pass (6 new), `tsc` clean, ESLint clean, `next build` passes. The production deploy succeeded and the live /start bundle contains the beacon, callback and timeout code.
- **Not imported into Ads:** it would double-count with the /thank-you primary.
- **Cross-domain:** stillawakemedia.com and stillawake.studio added to the Google tag G-KE1CWNHY0S domains (owner-approved, confirmed after a reload).
- **Open (owner):** star `generate_lead` as a GA4 key event once it first arrives.

## 2026-10-26 — Google Ads rebuilt and paused for winter

Done in the Google Ads UI through the browser pane. The owner signed in and clicked Publish themselves. Full state and runbook: `docs/ads/README.md`.

- **Campaign #1 (PMax):** paused. Spend since Aug 10 was CA$62.25 (249 clicks, 0 conversions), not the $4.64 recorded earlier.
- **New Search campaign "Search | Leads | Montréal EN-FR" (ID 24394172619):**
  - paused, starting January 1, 2027, at CA$25/day with Maximize clicks and a CA$10 CPC cap
  - Search only; Montréal, Laval and Longueuil (presence only); AI Max and auto-created assets off
  - 6 ad groups, 39 keywords, 6 responsive search ads, 37 phrase negatives, 8 sitelinks and 12 callouts, all matching `docs/ads/search-campaign.json`
- **Conversions (B-01):**
  - two primaries, each counted One: the /thank-you import, renamed "Studio lead (thank-you page)", and the GA4 `contact_form_submit` import
  - "Lead form - Submit" set to secondary
  - `contact_form_submit` marked as a GA4 key event
- **Verified (read back from the UI):** both campaigns paused; settings; ad group, keyword and ad counts; negatives 37 of 37; assets 8 + 12.
- **Open:** Studio `generate_lead` records 0 events, so it can't be a key event yet (likely lost on redirect; that's a Studio code fix). The Zylx pause `ed0f4486` is redundant.

## 2026-10-26 — Owner-approved actions ("fix all in order")

**Final sweep: article meta author.** The article pages hardcoded `<meta name="author">` as "StillAwake Media", which contradicted the byline and JSON-LD once the articles were credited to Jaeden. A new `articleAuthors()` helper in `src/data/people/jaeden-doody.ts` takes the meta author from the same frontmatter name. It's used on the EN and FR article routes, on both the CMS and markdown paths. Verified locally on what-is-branding (CMS), custom-software-development-cost-canada (markdown) and prix-du-seo-au-quebec (FR); all show Jaeden Doody.

**1–2. Google Ads: one primary lead conversion (B-01), PMax final URL to the apex (B-02)**
- **Not done yet.** Zylx's Google Ads actions cover campaigns, budgets, keywords and ads only, with no conversion-action or final-URL edits.
- **Browser route:** Google asked to re-verify the jaeden@blackwateraquatics.ca sign-in, which needs the owner's password. Waiting on that sign-in. Budget and bidding won't be touched either way.

**3. Directory and Google Business Profile copy (B-05, B-06)**
- **`DIRECTORY-PROFILES.md` additions:**
  - HelloDarwin, in EN and FR
  - Semrush Agency Partners, flagged as needing an active Semrush account
  - Google Business Profile: service-area setup, categories, EN/FR description without links or prices (per Google's rules), and a service list using the names and prices from the live /pricing schema
- **Price check:** every price was cross-checked against the live /pricing page.
- **`docs/citation-kit.md` corrections:** the SEO range now starts at $250, and the email is jaeden@ instead of hello@, which the site never uses.
- **Not done by Claude:** creating accounts and publishing the listings. Those stay owner actions.

**4. Authors on the remaining articles**
- **Script:** `stillawakemedia.dev/scripts/set-article-author.mts` found 17 published articles with no author.
- **Draft check:** before republishing, each saved version was compared with its live snapshot. None had unpublished drafts, so republishing shipped nothing unreviewed.
- **Result:** all 17 credited to Jaeden Doody and republished; a re-run finds 0. Markdown bylines updated, so all 52 EN and 44 FR now say Jaeden Doody.
- **Where the byline comes from:** the article page reads the visible byline and the JSON-LD author from the markdown `author` field (`src/app/(en)/stillawake-times/[slug]/page.tsx`), not from the CMS. The live pages switch when the markdown deploys.

## 2026-10-26 — Batch 3 (branch `seo/program-batch-3`)

**P7-02: the four articles that earn impressions**
- **Query data:** Search Console shows only 1–3 visible impressions per query for these articles. All four already open with a "Quick Answer" section, so answer-first was in place. The gap was internal links: three linked only to /contact.
- **Links added**, one contextual sentence each, placed after the paragraph it fits:
  - best-website-design-for-small-businesses-2026 → /website-cost-canada
  - what-is-a-custom-web-application → /stillawake-times/custom-software-development-cost-canada, /do-i-need-custom-software, /software-development
  - why-nextjs-is-the-best-framework-for-modern-websites → /stillawake-times/why-modern-businesses-are-moving-away-from-wordpress, /web-design-montreal
  - what-makes-a-luxury-brand-website-feel-premium → /our-work
- **CMS script:** `stillawakemedia.dev/scripts/add-article-links.mts` targets a heading or a paragraph's opening words, and handles anchor spans and inline markup in the HTML copy.
- **Live:** best-website-design is republished.
- **Waiting (B-12):** the other three are saved as new versions but can't publish, because they have no CMS author. Publishing needs one, and setting it would change their byline from StillAwake Media to Jaeden Doody. The markdown fallbacks are updated.

- **B-12 resolved:** the owner approved crediting Jaeden Doody, so the author was set and the three articles were republished. Live checks:
  - all six added sentences are present
  - the JSON-LD author is `/founder/jaeden-doody#person`
  - IndexNow accepted the three URLs (HTTP 200)
  - the markdown bylines are updated to match

**P6-04: /web-design-montreal**
- **H1:** "Web design in Montreal: custom websites built to rank and convert."
- **Quick answer:** now states StillAwake's own prices (from /website-cost-canada) before the market ranges.
- **New "How a Web Design Project Works" section:** four steps (form, fixed-price written scope, bilingual build, ownership). It matches the French page and is backed by /website-ownership.

**Verification before PR**
- 843 tests pass.
- Build succeeds.
- seo-parity OK.
- Local crawl: every check at 0.
- The page renders correctly at mobile width.

## 2026-10-26 — Batch 2 (branch `seo/program-batch-2`)

**SEO price accuracy (found while auditing /web-design-montreal)**
- **Problem:** nine pages and articles still said SEO plans cost "$600–$850 CAD/month". Starter ($250) has been in the catalogue since 2026-08-15. /seo-canada and the CMS copy of how-much-does-seo-cost-canada also used retired plan names ("Growth SEO — Essential / Growth") and listed two plans instead of three.
- **Code pages:** /seo-canada now renders its three plans, its schema offers and its FAQ answer from the pricing model. The SEO range now starts at $250 on:
  - /web-design-montreal
  - /website-cost-canada
  - /fr/prix-site-web-quebec
  - /fr/etre-cite-par-ia
- **Markdown articles:** EN (can-chatgpt-recommend-my-business, custom-software-development-cost-canada, what-is-generative-engine-optimization, how-much-does-seo-cost-canada) and FR (prix-du-seo-au-quebec, which also had the 850 plan wrongly named "Croissance"). Starter added to both plan lists.
- **CMS:** `stillawakemedia.dev/scripts/fix-seo-plan-copy.mts` scanned every article and page. Three EN articles needed fixes and were republished through the CMS's normal save/publish path (14 changes on the SEO cost article, including the Starter bullet). Archived rows were skipped.
- **Guard:** `published-prices.test.ts` now fails on any SEO range ending at the top plan's price that doesn't start at the cheapest plan. It also covers 6 more pages. Checked: it fails on the old /web-design-montreal copy.

**/fr/agence-web-montreal (P6-05)**
- H1 now leads with "création de site web sur mesure".
- The generic quick answer is replaced with prices (from /fr/prix-site-web-quebec) and what's included.
- The "création de site web" section is now a 4-step process: form, written fixed-price scope, bilingual build, ownership. Each step is backed by existing pages.
- FAQ: real prices, plus a timeline answer (31 routes in 19 days, from the Stalkr case study).

**Internal links (P8-02)**
- Four articles now link to /seo-montreal from their closing call to action: why-local-seo-matters, how-to-rank-higher-on-google-maps, google-business-profile-optimization, what-is-technical-seo.
- Done in the CMS (`scripts/link-seo-montreal.mts`, republished) and in the markdown fallbacks.
- Live before the fix: 0 links to /seo-montreal from any of the four.

**Performance (P13-01)**
- Mobile Lighthouse, live, before:
  - /: 68 / 97 / 100 / 100 (performance / accessibility / best practices / SEO)
  - /seo-montreal: 99 / 92 / 100 / 100
  - /web-design-montreal: 96 / 96 / 100 / 100
  - /fr/agence-web-montreal: 99 / 96 / 100 / 100
  - /fr/agence-seo-montreal: 99 / 92 / 100 / 100
- **Homepage findings:**
  - A 401 KB below-the-fold intro video downloaded on load, because `autoPlay` overrides `preload="none"`.
  - A 181 KB 512px favicon was fetched at high priority.
- **Fixes:**
  - `LazyVideo` sets the video's source only within 200px of the viewport. EN and FR homepages use it.
  - Icons now point at a 3 KB 48px favicon, the 192px icon and the 180px apple-touch icon.
- **Verified in the local build:**
  - The video has no source on load, then plays when scrolled to.
  - Page weight is 1,002 KB vs 1,581 KB live.
- **Caveat:** mobile performance scores on the live homepage varied between 68 and 92 across runs, so scores aren't used as evidence. Page weight is.

**Also:** stillawakemedia.dev PR #1 merged `fix-redirect-links.mts` from a clean branch, because local `main` there has 5 unrelated unpushed commits.

**Deploy (2026-10-26)**
- **PR #9:** merged as 41eb99c after the Vercel check passed. Changes were live within about a minute.
- **Live checks:**
  - 0 stale "$600–$850" ranges or retired plan names across all 10 affected URLs
  - the 4 articles each link to /seo-montreal
  - the FR agency H1 is updated
  - the homepage intro video ships with no source, and the icons point at the small files
- **Live crawl, 279 URLs:** every check at 0, including linksToRedirects.
- **IndexNow:** 20 URLs submitted, HTTP 200.
- **CMS scripts:** merged in stillawakemedia.dev PR #2; that deploy succeeded.

**Verification before PR**
- 843 tests pass.
- Build succeeds.
- seo-parity OK.
- Local crawl, 279 URLs: every check at 0.

## 2026-10-26 — B-11: CMS article links

- **Why:** three articles are served from their CMS rows, so the markdown link fix in PR #6 didn't reach production.
- **How:** `stillawakemedia.dev/scripts/fix-redirect-links.mts` saved new versions through the CMS's own save path, rewriting only whole href values (2 per article: the editor copy and the HTML copy).
- **Publish gate:** the first publish was blocked with `missing_author`; these rows predated the author requirement. With the owner's approval, Jaeden Doody was set as author and all three were republished. The markdown fallbacks were updated to match.
- **Verified live:**
  - no stale hrefs
  - JSON-LD author is `/founder/jaeden-doody#person`
  - all three return 200
  - full crawl of 279 URLs: linksToRedirects 0, broken 0, orphans 0, hreflang 0
- **Note:** 20 other published articles still had no CMS author. Corrected 2026-10-26: the real figure was 17 once batch 3 credited three more, and all are now fixed (see the owner-approved actions entry).

## 2026-10-26 — Batch 1 (branch `seo/program-batch-1`)

**Discovery**
- **Baseline:** Search Console, GA4, Ads and Clarity pulled live through Zylx. Corrected the 90-day impressions from ~450 to 156 (`SEO-BASELINE.md`).
- **Sitemap:** `https://stillawakemedia.com/sitemap.xml` was submitted 2026-08-12 and last downloaded 2026-10-24, with 0 errors.
- **Keywords:** Keyword Planner volumes for 20+ EN and FR terms (`KEYWORD-STRATEGY.md`).
- **Competitors:** what the results pages look like for the SEO and web design terms (`COMPETITOR-ANALYSIS.md`).
- **Crawl:** wrote `scripts/seo-crawl.mjs` and crawled all 279 sitemap URLs on production. Found:
  - 2 non-reciprocal hreflang pairs
  - 4 internal links pointing at redirects
  - 1 orphan page
  - 124–127 long titles and 149 long descriptions

**Changes**
- **P2-01:** added `languages` alternates (en-CA, fr-CA, x-default) to EN `/` and `/contact`.
- **P2-02:** pointed internal links at their final URLs instead of redirects:
  - homepage article card, `src/lib/data.ts`: slug `custom-coded-websites-outperform-templates` → `why-custom-coded-websites-outperform-templates`
  - `best-website-design-for-small-businesses-2026.md`: `/blog/google-business-profile-optimization` → `/stillawake-times/google-business-profile-optimization`
  - `website-performance.md`: `/technical-seo` → `/stillawake-times/what-is-technical-seo`
  - `why-modern-businesses-are-moving-away-from-wordpress.md`: `/blog/how-to-redesign-...` → `/stillawake-times/how-to-redesign-...`
- **P2-03:** linked `/fr/developpement-framer` from the related links on `/fr/agence-web-montreal`.
- **P6-01, /seo-montreal:**
  - title is now "SEO Montreal | SEO Services & Local SEO Agency", matching the measured terms "seo services montreal" (140/month) and "seo agency montreal" (110/month)
  - the description states the real starting price ($250 CAD/month, read from the pricing model)
  - the generic "Quick Answer" is replaced with a concrete one: what StillAwake does, the price, and an honest timeline with no ranking guarantee
  - the case-study proof block moved up, right after pricing
- **P6-02, /fr/agence-seo-montreal:** reviewed. It already has prices, FAQ, proof and hreflang, so it's unchanged.
- **P6-03:** titles now lead with the measured term on:
  - /web-design-montreal
  - /fr/agence-web-montreal (description rewritten too, now leading with "création de site web")
  - /fr/refonte-site-web
  - /fr/maintenance-site-web
  - /fr/developpement-logiciel
  - /website-maintenance
- **Tooling:** added a `stillawake-com-prod` entry (`next start` on port 3006) to `.claude/launch.json` for local production crawls.

**Verification (local production build)**
- **Checks:** `tsc` clean; ESLint 0 errors (1 existing unused-import warning in `src/app/(en)/page.tsx`); `check-seo-parity` OK; pricing tests 374 passed.
- **Build:** `npm run build` succeeded.
- **Crawl of `next start`, 279 URLs:** hreflangNotReciprocal 0, linksToRedirects 0, orphans 0, brokenInternalLinks 0, non200 0, duplicate titles and descriptions 0. Long titles went from 127 to 124.

**Deploy (2026-10-26)**
- **PR #6:** merged as 960c852 after the Vercel check passed. The new /seo-montreal title was live within about a minute.
- **Live crawl, 279 URLs:** hreflang 0, orphans 0, broken links 0, non200 0. linksToRedirects is 3, all inside articles that production serves from the CMS's published copy, so the markdown fix doesn't reach them (B-11).
- **IndexNow:** 10 changed URLs submitted, HTTP 200.

**Open:** B-01 to B-11, then P6-04, P6-05, P7-02, P8-02 and P13-01.
