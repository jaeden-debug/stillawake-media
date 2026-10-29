# Final content cluster report

Program: five content clusters (Roblox, AI search, free tools, Shopify, software and automation) for stillawakemedia.com. Report date 2026-10-29.

**Implementation status is separate from outcomes.** Everything below is built and verified on a local production build. None of it is deployed yet, and no ranking, indexing or AI-citation outcome can be measured until it is live and has been crawled. The first review is due 2026-11-30.

## 1. Cluster inventory

| Cluster | Delivered | Built in this batch | From PR #34 | Blocked |
|---|---|---|---|---|
| A Roblox | 6/6 | A3, A4, A5, /games hub section | A1, A2 (consolidated with 301) | — |
| B AI search | 5/6 (+ hub) | B4; B2, B3 (+B5 merged) markdown | B1 | B2, B3/B5 live text waits on CMS sync (B-13); experiment not run (B-18) |
| C Tools | 5/5 | C2, C3, tools hub | C1, C4 | — |
| D Shopify | 5/5 | D1, D3, D4 markdown, D2 fact fix, hub links | — | D4 live text waits on B-13 |
| E Software | 3/3 | E1, E2 markdown, hub links | — | E2 live text waits on B-13 |

## 2. URLs

**Created (9):** /stillawake-times/how-to-make-a-roblox-game · how-to-make-a-horror-game-in-roblox-studio · how-to-fix-lag-in-roblox-studio · how-to-appear-in-google-ai-overviews · how-much-does-a-shopify-store-cost-canada · how-to-build-a-shopify-store · app-development-cost-canada · /tools/seo-audit · /tools/app-development-cost-calculator. (PR #34 adds /tools/llms-txt, /tools/schema-markup-generator, /games/guides/scary-roblox-games-with-friends.)

**Updated:** 4 rewritten articles (B2, B3, D4, E2), custom-software cost article (link), /shopify-vs-woocommerce (price), /games, /tools, /, /answer-engine-optimization, /shopify-development, /software-development, /ai-automation (links), article templates (EN, FR, CMS), sitemap, llms.txt.

**Consolidated / redirects:** "ChatGPT SEO vs traditional SEO" merged into the GEO guide (no page, no redirect). PR #34's 301 from /games/guides/roblox-survival-horror-games. Nothing deleted.

## 3. Word counts

| Article | Words |
|---|---:|
| what-is-generative-engine-optimization | 3,379 |
| how-to-make-a-horror-game-in-roblox-studio | 3,063 |
| shopify-seo-guide | 2,988 |
| how-to-make-a-roblox-game | 2,685 |
| how-to-appear-in-google-ai-overviews | 2,651 |
| app-development-cost-canada | 2,609 |
| how-businesses-use-ai-automation-to-save-hundreds-of-hours | 2,605 |
| how-much-does-a-shopify-store-cost-canada | 2,552 |
| how-to-build-a-shopify-store | 2,465 |
| how-to-fix-lag-in-roblox-studio | 2,449 |
| can-chatgpt-recommend-my-business | 2,413 |

Body prose only, code blocks excluded. All above the 1,500 minimum. Tool and hub pages are sized to their purpose.

## 4. Internal linking

- Homepage resource groups: SEO audit, AI Overviews article, horror-game tutorial added; ChatGPT article relabelled to its new intent.
- /games: "Make your own Roblox game" section linking A3–A5.
- /tools: SEO audit and app calculator cards.
- /answer-engine-optimization: AI Overviews article and SEO audit.
- /shopify-development: cost and build guides alongside the SEO guide.
- /software-development: app calculator and app cost article; automation article relabelled on both software and automation pages.
- Every new article links its siblings, its hub, a relevant tool and the matching service page. Local crawl: 0 orphans, 0 broken links.

## 5. Schema

No new schema types were invented. Times articles use the existing Article template (author Person with founder @id, publisher Organization, datePublished, dateModified from `updated`). The two tools are registered in `PAGE_SCHEMA` as WebPage + Service + BreadcrumbList, following the existing tool pattern. No FAQPage markup was added (Google retired the FAQ rich result on 2026-05-07; the visible Q&A sections are content, not markup). JSON-LD parsed on rendered HTML for five pages; production validation in the Rich Results Test is pending deploy.

## 6. Tools developed

- **SEO audit** (`/tools/seo-audit`): up to 21 checks across response, indexing, content, structured data and sharing; honest about what only Search Console knows. SSRF-guarded, rate-limited, BotID-protected. 15 unit tests including robots.txt precedence and wildcards.
- **App development cost calculator** (`/tools/app-development-cost-calculator`): same engine and prices as the project calculator, opened at "Who uses it?". Assumptions and exclusions listed on the page.

## 7. Brand and game placements

- RISK IT!: A3 (validation, DataStore pattern, test bot, VFX replication lesson).
- Stillskin Forest: A3, A4 (case study throughout, 17 wiki links), A5; always disclosed as in development.
- Blackwater Aquatics: D1, D3, D4 and B2 — only dated figures from the case study, framed as one store's observations.
- Stalkr (NAVTRL): E1 as a mobile reference.
- Zylx Studio: not mentioned in articles; no capability claims could be verified to the standard required.

## 8. Verification

Local production build only (`next start`): crawl of 338 URLs, 0 non-200, 0 missing/duplicate titles or descriptions, one H1 everywhere, self-canonicals, 0 noindex, hreflang reciprocal, 0 broken links, 0 orphans. 911 unit tests pass. No horizontal overflow at 375px or 1280px. **Production: not verified — not deployed.**

## 9. Outstanding issues

| Issue | Ref |
|---|---|
| CMS sync for four rewritten articles | B-13 |
| Merge order of PRs #33, #34 and this PR (merging is a production deploy) | B-16 |
| URL Inspection requests and sitemap resubmission after deploy | B-17 |
| AI answer experiment not run | B-18 |
| Blackwater robots.txt blocks `?variant=` / `?locale=` | B-14 |
| Blackwater repeat-rate and Shopify store price inconsistencies on service pages | B-15 |
| Keyword difficulty and backlink data unavailable | B-08 |
| Owner review: A4 cites figures that appear only in Stillskin dev notes; Shopify Plus price display oddity on shopify.com | master plan A4, D1 |
| No GA4 event for SEO audit runs | performance tracker |
| Several existing articles below 1,500 words (custom software cost 978, document processing 1,256, processes worth automating 1,260) | content inventory |
| No French counterparts for the new pages (decision, not omission) | master plan |

## 10. Monitoring recommendations

1. 30/60/90-day reviews per cluster (`CONTENT-PERFORMANCE-TRACKER.md`), starting 2026-11-30. The Roblox tutorial has by far the largest measured demand (74,000/mo US) and the most competitive SERP; judge it on impressions and position trend, not clicks, at 30 days.
2. Watch the three MONITOR overlaps in `CANNIBALIZATION-AUDIT.md` in the query-to-page report.
3. Re-run the AI answer protocol monthly once started; publish it as original research after two runs.
4. Earn links for the tools and tutorials (Roblox DevForum, SEO communities, directories in B-06) — the site's main constraint is discovery, not on-page quality.
