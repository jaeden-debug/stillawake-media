# Content publication log

One entry per batch. "Published" means verified on production; until then the status is "PR open".

## 2026-10-29 — Content clusters batch 1

- **Branch:** `seo/content-clusters` (stacks on PR #34 `seo/discoverability-week1-2`, includes PR #33 `content/risk-it-public`).
- **Commits:** `5473c8f` article template overflow fix · `0da8b9b` SEO audit tool and app cost calculator · `94f4a24` cluster articles and hub links · `aa9eace` docs (plus this log and the final report).
- **Status:** PR open. Not merged, not deployed. Production verification pending.

| URL | Type | Action | Words | Local build | Production |
|---|---|---|---:|---|---|
| /stillawake-times/how-to-make-a-roblox-game | Article | Create | 2,685 | 200, canonical self, Article JSON-LD, in sitemap | pending |
| /stillawake-times/how-to-make-a-horror-game-in-roblox-studio | Article | Create | 3,063 | same | pending |
| /stillawake-times/how-to-fix-lag-in-roblox-studio | Article | Create | 2,449 | same | pending |
| /stillawake-times/how-to-appear-in-google-ai-overviews | Article | Create | 2,651 | same | pending |
| /stillawake-times/how-much-does-a-shopify-store-cost-canada | Article | Create | 2,552 | same | pending |
| /stillawake-times/how-to-build-a-shopify-store | Article | Create | 2,465 | same | pending |
| /stillawake-times/app-development-cost-canada | Article | Create | 2,609 | same | pending |
| /stillawake-times/can-chatgpt-recommend-my-business | Article | Rewrite | 2,413 | markdown fallback verified | CMS sync B-13 |
| /stillawake-times/what-is-generative-engine-optimization | Article | Rewrite | 3,379 | markdown fallback verified | CMS sync B-13 |
| /stillawake-times/shopify-seo-guide | Article | Rewrite | 2,988 | markdown fallback verified | CMS sync B-13 |
| /stillawake-times/how-businesses-use-ai-automation-to-save-hundreds-of-hours | Article | Rewrite | 2,605 | markdown fallback verified | CMS sync B-13 |
| /stillawake-times/custom-software-development-cost-canada | Article | Link added | 978 | verified | pending |
| /tools/seo-audit | Tool | Create | — | 200; API tested on 4 public URLs; SSRF refusals tested | pending |
| /tools/app-development-cost-calculator | Tool | Create | — | 200; flow run to a result | pending |
| /tools | Hub | Improve | — | 200 | pending |
| /games | Hub | Improve | — | 200 | pending |
| /, /answer-engine-optimization, /shopify-development, /software-development, /ai-automation | Links | Improve | — | 200 | pending |
| /shopify-vs-woocommerce | Page | Fact fix | — | 200 | pending |

Local verification: `next build` exit 0; `next start` crawl of 338 sitemap URLs with 0 errors in every blocking category (see `CONTENT-QUALITY-CHECKLIST.md`).

### After merge (to do)

1. Fetch each URL above on production: status, canonical, JSON-LD, presence in `/sitemap.xml`.
2. Run the SEO audit tool on production against itself (BotID path differs on Vercel).
3. IndexNow: the daily cron covers it; or `node scripts/indexnow-submit.mjs` with the new URLs.
4. Owner: URL Inspection requests (B-17); CMS sync (B-13).
5. Update this table's Production column and the master plan statuses.
