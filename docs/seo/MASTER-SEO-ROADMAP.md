# Master SEO roadmap — stillawakemedia.com

Persistent state for the SEO recovery program. **Read this file and `IMPLEMENTATION-LOG.md` at the start of every session**, then continue from the first open task.

Status: `[ ]` not started · `[-]` in progress · `[x]` done and verified · `[!]` blocked (see `BLOCKERS-AND-APPROVALS.md`) · `[~]` deferred on purpose

Supporting documents: `SEO-BASELINE.md`, `KEYWORD-STRATEGY.md`, `COMPETITOR-ANALYSIS.md`, `CONTENT-INVENTORY.md`, `BACKLINK-AUDIT.md`, `LOCAL-SEO.md`, `CONVERSION-TRACKING.md`, `SEO-MONITORING.md`, `BLOCKERS-AND-APPROVALS.md`, `IMPLEMENTATION-LOG.md`.

## Targets (revised 2026-10-26 from the corrected baseline)

The program brief started from "~450 impressions / ~20 clicks in 90 days". The corrected figure is **156 impressions and 20 clicks** (see `SEO-BASELINE.md`). Targets are set against that, for the 90 days ending 2027-01-31:

| Metric (Search Console, 90 days) | Baseline (to 2026-10-24) | Target | Stretch |
|---|---:|---:|---:|
| Impressions | 156 | 600 | 1,500 |
| Clicks | 20 | 40 | 80 |
| Non-brand queries with ≥1 impression | ~20 visible | 60 | 120 |
| /seo-montreal avg. position for "seo montreal" queries | 14 (all-time page avg.) | top 10 | top 5 |
| /web-design-montreal position for "web design montreal" | ~96 | top 50 | top 20 |
| Organic contact-form leads (GA4 `contact_form_submit`, organic) | not separable today | measured | 2+ |

Why lower than the brief's 1,500–3,000: the site starts from a smaller real base, has almost no referring domains (unmeasurable at the moment, see `BACKLINK-AUDIT.md`), and the commercial Montréal terms have small absolute demand (largest: "seo montreal" 260/month). Revisit at the 2026-12-07 review.

## Phase 1 — Baseline and measurement

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P1-01 | Pull Search Console, GA4, Ads, Clarity baseline | P0 | [x] | Zylx | `SEO-BASELINE.md` | Totals per window, query and page tables, sources dated | Re-pulled from device breakdown | `SEO-BASELINE.md` | — | 2026-10-26 |
| P1-02 | Correct the "~450 impressions" figure | P0 | [x] | Zylx | `SEO-BASELINE.md` | Property totals from device rows, not page rows | 90d device sum = 156 | `SEO-BASELINE.md` | P1-01 | 2026-10-26 |
| P1-03 | Repeatable technical crawl | P0 | [x] | Node | `scripts/seo-crawl.mjs` | Checks status, meta, H1, canonical, hreflang, links, orphans | Ran on prod (279 URLs) and local build | Log 2026-10-26 | — | 2026-10-26 |
| P1-04 | Confirm sitemap submitted and read | P0 | [x] | Zylx GSC | GSC | Current sitemap submitted, 0 errors | lastDownloaded 2026-10-24, 0 errors/warnings | Log 2026-10-26 | — | 2026-10-26 |

## Phase 2 — Technical SEO

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P2-01 | Reciprocal hreflang on EN `/` and `/contact` | P1 | [x] | Code | `src/app/(en)/page.tsx`, `src/app/(en)/contact/page.tsx` | Crawl `hreflangNotReciprocal` = 0 | Local build crawl = 0; live check after deploy | Log | P1-03 | 2026-10-26 |
| P2-02 | Replace internal links that hit redirects | P1 | [x] | Code | `src/lib/data.ts`, 3 articles | Crawl `linksToRedirects` = 0 | Live crawl 0 after CMS republish | Log | P1-03 | 2026-10-26 |
| P2-03 | Link the orphaned `/fr/developpement-framer` | P2 | [x] | Code | `src/app/(fr)/fr/agence-web-montreal/page.tsx` | Crawl `orphans` = 0 | Local build crawl = 0 | Log | P1-03 | 2026-10-26 |
| P2-04 | `http://www.` → apex in one hop | P3 | [!] | Vercel domains | Vercel | One 308 | `curl -I` | B-07 | — | |
| P2-05 | Title lengths on article pages (124 over 70 chars incl. suffix) | P3 | [~] | Code | articles | Only where a page earns impressions | Crawl | CTR-only effect; most articles have 0 impressions | P1-01 | |
| P2-06 | Description lengths (149 over 170 chars) | P3 | [~] | Code | many | Same rule as P2-05 | Crawl | Google rewrites most descriptions anyway | P1-01 | |

## Phase 3 — Indexing and discovery

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P3-01 | IndexNow on deploy and daily cron | P0 | [x] | Code | `/api/cron/indexnow` | 200 from api.indexnow.org | Submitted after PR #5 and PR #6 (10 URLs, 200) | Earlier log | — | 2026-10-26 |
| P3-02 | llms.txt / llms-full.txt | P1 | [x] | Code | `/llms.txt` | Lists every published page | `ai-index.test.ts` | Earlier PRs | — | 2026-10-26 |
| P3-03 | Request indexing for changed money pages in GSC | P1 | [!] | GSC UI | GSC | Inspected + requested | Owner action | B-03 | P2-01 | |
| P3-04 | Bing Webmaster Tools sitemap | P2 | [!] | Bing UI | Bing | Sitemap submitted | Owner action | B-04 | — | |

## Phase 4 — Keyword strategy

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P4-01 | Measured volumes for EN and FR Montréal terms | P0 | [x] | Keyword Planner via Zylx | `KEYWORD-STRATEGY.md` | Volumes recorded, none invented | Planner response | `KEYWORD-STRATEGY.md` | — | 2026-10-26 |
| P4-02 | One owner page per intent | P0 | [x] | Repo | `KEYWORD-STRATEGY.md` | Map has no two pages on one intent | Reviewed against routes | `KEYWORD-STRATEGY.md` | P4-01 | 2026-10-26 |
| P4-03 | Refresh with Semrush/Ahrefs difficulty data | P2 | [!] | Semrush/Ahrefs | — | KD per term | — | B-08 | — | |

## Phase 5 — Competitor analysis

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P5-01 | Who ranks for the priority terms | P1 | [x] | Web search | `COMPETITOR-ANALYSIS.md` | SERP composition per term | Searches 2026-10-26 | `COMPETITOR-ANALYSIS.md` | P4-01 | 2026-10-26 |
| P5-02 | Competitor backlink gap | P2 | [!] | Ahrefs/Semrush | — | Referring-domain gap list | — | B-08 | P5-01 | |

## Phase 6 — Service pages

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P6-01 | /seo-montreal: title/description on "seo services/agency montreal", concrete quick answer, proof moved up | P0 | [x] | Code | `src/app/(en)/seo-montreal/page.tsx` | Title has both measured terms; price in description; honest timeline | Build + live check | Log | P4-02 | 2026-10-26 |
| P6-02 | /fr/agence-seo-montreal review | P0 | [x] | Review | `src/app/(fr)/fr/agence-seo-montreal/page.tsx` | Already has prices, FAQ, proof, hreflang | Read 2026-10-26; no change needed | Log | P4-02 | 2026-10-26 |
| P6-03 | Titles on web design, agence web, refonte, maintenance, logiciel pages | P1 | [x] | Code | 6 pages | Title leads with the measured term | Build + live check | Log | P4-02 | 2026-10-26 |
| P6-04 | /web-design-montreal depth vs. ranking competitors | P1 | [ ] | Code | `src/app/(en)/web-design-montreal/page.tsx` | Covers process, pricing, proof, FAQ the SERP shows | Compare with `COMPETITOR-ANALYSIS.md` | — | P5-01 | |
| P6-05 | /fr/agence-web-montreal → "création site web montréal" coverage | P1 | [ ] | Code | FR agency page | Section on création de site web (110/mo + 40/mo) | Review | — | P4-02 | |

## Phase 7 — Content inventory

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P7-01 | Classify 52 EN + 44 FR articles | P1 | [x] | Repo + GSC | `CONTENT-INVENTORY.md` | Each has keep / improve / merge-candidate | — | `CONTENT-INVENTORY.md` | P1-01 | 2026-10-26 |
| P7-02 | Improve the 4 articles that already earn impressions | P2 | [ ] | Code | see inventory | Clear answer up top, link to owner service page | Crawl + GSC 28d later | — | P7-01 | |
| P7-03 | Decide merges for overlapping articles | P3 | [~] | Repo | see inventory | No deletion without data | Re-check at 2026-12-07 with more GSC data | — | P7-01 | |

## Phase 8 — Internal linking

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P8-01 | Zero orphans, zero redirecting links | P1 | [x] | Crawl | — | Both 0 | Local crawl | Log | P2-02 | 2026-10-26 |
| P8-02 | Each SEO/local article links to /seo-montreal or /fr/agence-seo-montreal | P2 | [ ] | Code | articles | Link present with descriptive anchor | grep + crawl | — | P7-01 | |

## Phase 9 — Local SEO

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P9-01 | Local SEO plan and NAP | P1 | [x] | Docs | `LOCAL-SEO.md` | Plan written from verified facts | — | `LOCAL-SEO.md` | — | 2026-10-26 |
| P9-02 | Google Business Profile | P0 | [!] | GBP | — | Verified, category, services, site link | Owner | B-05 | — | |
| P9-03 | Directory listings (Clutch, HelloDarwin, etc.) | P1 | [!] | External | `DIRECTORY-PROFILES.md` | Listed, consistent NAP | Owner | B-06 | P9-01 | |

## Phase 10 — Authority and backlinks

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P10-01 | Document what can and cannot be measured | P1 | [x] | Docs | `BACKLINK-AUDIT.md` | No invented DR or link counts | — | `BACKLINK-AUDIT.md` | — | 2026-10-26 |
| P10-02 | Credit links from client sites built by StillAwake | P1 | [!] | Client sites | — | Client agrees, visible credit | Owner | B-09 | — | |

## Phase 11 — Conversion tracking

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P11-01 | Audit form, GA4 events, Ads conversion actions | P0 | [x] | Code + Zylx | `CONVERSION-TRACKING.md` | Every lead path traced | — | `CONVERSION-TRACKING.md` | — | 2026-10-26 |
| P11-02 | One primary lead conversion in Google Ads | P0 | [!] | Google Ads | Ads | One primary, other secondary | Owner | B-01 | P11-01 | |
| P11-03 | Hostname filter for GA4 reading | P1 | [x] | Docs | `docs/analytics-hostname-filter.md` | Documented | PR #5 | — | — | 2026-10-26 |

## Phase 12 — AI search (AEO)

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P12-01 | Organization/Service/Article schema, llms.txt | P1 | [x] | Code | site-wide | Valid JSON-LD on money pages | Earlier PRs | — | — | 2026-10-26 |
| P12-02 | Track "AI Assistant" channel monthly | P2 | [ ] | GA4 | `SEO-MONITORING.md` | Monthly number logged | GA4 | 16 sessions/90d at baseline | — | |

## Phase 13 — Performance

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P13-01 | Lighthouse on /, /seo-montreal, /web-design-montreal, /fr/agence-web-montreal | P2 | [ ] | Lighthouse | — | Scores recorded | Lighthouse JSON | PSI API quota was exhausted 2026-10-26 | — | |

## Phase 14 — Paid search alignment

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P14-01 | PMax final URL www → apex | P2 | [!] | Google Ads | Ads | Final URL apex | Owner | B-02 | — | |

## Phase 15 — Monitoring and reporting

| ID | Task | Priority | Status | Tool | Location | Acceptance criteria | Verification | Evidence | Depends on | Completed |
|---|---|---|---|---|---|---|---|---|---|---|
| P15-01 | Monitoring cadence and queries | P1 | [x] | Docs | `SEO-MONITORING.md` | Weekly/monthly checks defined | — | `SEO-MONITORING.md` | — | 2026-10-26 |
| P15-02 | Deploy batch 1 and verify live | P0 | [x] | GitHub/Vercel | PR | Live crawl clean | Live crawl 2026-10-26: all 0 except 3 CMS redirect links | PR #6, 960c852 | P2-01..P6-03 | 2026-10-26 |
| P15-03 | 28-day review | P1 | [ ] | Zylx | `SEO-MONITORING.md` | Compare with baseline | — | Due 2026-11-23 | P15-02 | |
| P15-04 | Final report (batch 1) | P1 | [x] | Docs | `FINAL-SEO-IMPLEMENTATION-REPORT.md` | Evidence for each claim | Live checks | `FINAL-SEO-IMPLEMENTATION-REPORT.md` | P15-02 | 2026-10-26 |
