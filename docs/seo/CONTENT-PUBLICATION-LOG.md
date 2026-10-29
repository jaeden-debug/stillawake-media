# Content publication log

One entry per batch. "Published" means verified on production; until then the status is "PR open".

## 2026-10-29 — Content clusters batch 1

- **Branch:** `seo/content-clusters` (stacks on PR #34 `seo/discoverability-week1-2`, includes PR #33 `content/risk-it-public`).
- **Commits:** `5473c8f` article template overflow fix · `0da8b9b` SEO audit tool and app cost calculator · `94f4a24` cluster articles and hub links · `aa9eace` docs (plus this log and the final report).
- **Status:** merged to main as PR #37 (`fd3c4e9`) on 2026-10-29 after #33; #34 was already merged. Production deployed and verified 2026-10-29 (see table).

| URL | Type | Action | Words | Local build | Production |
|---|---|---|---:|---|---|
| /stillawake-times/how-to-make-a-roblox-game | Article | Create | 2,685 | 200, canonical self, Article JSON-LD, in sitemap | 200, self-canonical, valid JSON-LD, in sitemap, dateModified 2026-10-29 |
| /stillawake-times/how-to-make-a-horror-game-in-roblox-studio | Article | Create | 3,063 | same | 200, self-canonical, valid JSON-LD, in sitemap, dateModified 2026-10-29 |
| /stillawake-times/how-to-fix-lag-in-roblox-studio | Article | Create | 2,449 | same | 200, self-canonical, valid JSON-LD, in sitemap, dateModified 2026-10-29 |
| /stillawake-times/how-to-appear-in-google-ai-overviews | Article | Create | 2,651 | same | 200, self-canonical, valid JSON-LD, in sitemap, dateModified 2026-10-29 |
| /stillawake-times/how-much-does-a-shopify-store-cost-canada | Article | Create | 2,552 | same | 200, self-canonical, valid JSON-LD, in sitemap, dateModified 2026-10-29 |
| /stillawake-times/how-to-build-a-shopify-store | Article | Create | 2,465 | same | 200, self-canonical, valid JSON-LD, in sitemap, dateModified 2026-10-29 |
| /stillawake-times/app-development-cost-canada | Article | Create | 2,609 | same | 200, self-canonical, valid JSON-LD, in sitemap, dateModified 2026-10-29 |
| /stillawake-times/can-chatgpt-recommend-my-business | Article | Rewrite | 2,413 | markdown fallback verified | 200, new title live via CMS, dateModified 2026-10-29 |
| /stillawake-times/what-is-generative-engine-optimization | Article | Rewrite | 3,379 | markdown fallback verified | 200, new title live via CMS, dateModified 2026-10-29 |
| /stillawake-times/shopify-seo-guide | Article | Rewrite | 2,988 | markdown fallback verified | 200, new title live via CMS, dateModified 2026-10-29 |
| /stillawake-times/how-businesses-use-ai-automation-to-save-hundreds-of-hours | Article | Rewrite | 2,605 | markdown fallback verified | 200, new title live via CMS, dateModified 2026-10-29 |
| /stillawake-times/custom-software-development-cost-canada | Article | Link added | 978 | verified | 200, self-canonical, in sitemap |
| /tools/seo-audit | Tool | Create | — | 200; API tested on 4 public URLs; SSRF refusals tested | 200, self-canonical, in sitemap |
| /tools/app-development-cost-calculator | Tool | Create | — | 200; flow run to a result | 200, self-canonical, in sitemap |
| /tools | Hub | Improve | — | 200 | 200, self-canonical, in sitemap |
| /games | Hub | Improve | — | 200 | 200, self-canonical, in sitemap |
| /, /answer-engine-optimization, /shopify-development, /software-development, /ai-automation | Links | Improve | — | 200 | live |
| /shopify-vs-woocommerce | Page | Fact fix | — | 200 | 200, self-canonical, in sitemap |

Local verification: `next build` exit 0; `next start` crawl of 338 sitemap URLs with 0 errors in every blocking category (see `CONTENT-QUALITY-CHECKLIST.md`).

### After merge

1. [x] Fetched each URL on production: status, canonical, JSON-LD, presence in `/sitemap.xml`. Old survival-horror guide returns 308 to the scary-games guide.
2. [x] SEO audit tool run on production in a browser (BotID active): the Roblox tutorial returned 0 problems, 11 OK, 2 length notes.
3. [x] IndexNow: `node scripts/indexnow-submit.mjs` submitted all 338 sitemap URLs, 200 OK.
4. [x] CMS sync (B-13): four rows saved and republished through the CMS save/publish path by `stillawakemedia.dev/scripts/sync-cluster-articles.mts` (actor `content-clusters-sync`). [ ] Owner: URL Inspection requests (B-17).
5. [x] Table and master plan updated. CMS pages took about 5 minutes to show new text (CMS read cache plus page revalidation).
