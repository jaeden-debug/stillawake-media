# Cannibalization audit: content clusters

Method, per item: repository search (`src/content`, `src/app`), route list, titles and H1s, Search Console query-to-page rows (90 days to 2026-10-27), and, where PR #34 already did it, the SERP overlap check. Search Console had no cluster-query impressions at all, so no existing ranking could be lost by any decision below.

| Intent | Candidates found | Decision | Rationale |
|---|---|---|---|
| Scary / survival-horror Roblox games | `/games/guides/roblox-survival-horror-games` | MERGE → `/games/guides/scary-roblox-games-with-friends`, 301 (PR #34) | Google's top 10 for both phrasings share the same sources; old URL was "unknown to Google". |
| How to make a Roblox game | none | CREATE (Times article) | No tutorial existed. Times gives Article schema and an author. |
| Horror game in Roblox Studio | none; Stillskin wiki is player-facing | CREATE | Creator intent vs. player intent; wiki pages are linked, not duplicated. |
| Roblox lag | none | CREATE | Developer intent. "roblox lag fix" is mostly player intent; the article targets developers and doesn't chase it. |
| llms.txt definition | `/tools/llms-txt-generator` FAQ line | CREATE `/tools/llms-txt` (PR #34) | Explainer intent differs from tool intent. |
| GEO | `what-is-generative-engine-optimization` | IMPROVE | Existing owner. |
| ChatGPT SEO vs traditional SEO | GEO article, `can-chatgpt-recommend-my-business` | MERGE into GEO article as a section | 390 US / 50 CA searches; a separate page would split a small intent across three URLs. |
| Get recommended / cited by ChatGPT | `can-chatgpt-recommend-my-business` | IMPROVE, retitle | Same intent, existing URL. Slug kept to preserve links. |
| Google AI Overviews | AEO service page mentions it | CREATE | Informational how-to; AEO page is commercial. Cross-linked. |
| Schema markup generator | FR explainer `donnees-structurees-implementation` | CREATE tool (PR #34) | Tool vs explainer. |
| SEO audit tool | `/seo-canada` mentions audits; one-time "site-audit" product | CREATE tool | Free self-serve check vs paid service; page links to `/seo-canada`. |
| App cost calculator | `/tools/project-cost-calculator` | CREATE landing page on the same engine | Different searcher (app budget vs website budget); no second pricing model. |
| Website cost | `/website-cost-canada`, project calculator | KEEP | Out of scope; not touched. |
| Shopify store cost | `/shopify-development` (service, has prices), `/website-cost-canada` | CREATE informational article | Platform fees, processing and taxes explained; service page stays the "hire us" owner. Article links to it rather than repeating its sales copy. |
| Shopify vs WooCommerce | `/shopify-vs-woocommerce` (+ FR) | KEEP, fact fix | Existing owner. |
| How to build a Shopify store | `when-you-outgrow-shopify`, `shopify-theme-store-requirements` | CREATE | Neither covers the setup tutorial. |
| Shopify SEO | `shopify-seo-guide`; `/shopify-development` SEO section | IMPROVE | Existing owner, crawled-not-indexed; rewritten for distinctiveness. |
| App cost in Canada | `custom-software-development-cost-canada` | CREATE separate, cross-link | Custom internal systems vs consumer/customer apps (native, app stores, IAP fees). Monitor: if Search Console shows both ranking for the same queries, consolidate into the app article. |
| AI automation examples | `how-businesses-use-ai-automation-to-save-hundreds-of-hours`, `how-ai-automation-is-changing-modern-businesses`, `which-business-processes-are-worth-automating` | IMPROVE the first; keep others | The first already targeted this intent. The second is a trends piece (MONITOR); the third is a decision framework. |

## Watch list (MONITOR)

- `how-ai-automation-is-changing-modern-businesses` vs the rewritten examples article — both "AI automation" in the title. If both gain impressions on the same queries in Search Console, merge the trends piece into the examples article with a 301.
- `app-development-cost-canada` vs `custom-software-development-cost-canada` — as above.
- Three GEO-adjacent pages (GEO guide, ChatGPT article, AI Overviews article) — distinct primary intents; check the query-to-page report at 30 and 60 days.

## No redirects added in this PR

The only redirect in the stack is PR #34's survival-horror → scary-games 301. Nothing was deleted.
