# Content inventory (2026-10-26)

52 English articles (`src/content/stillawake-times/`), 44 French articles (`src/content/fr/stillawake-times/`), plus service, tool, case-study, portfolio and game pages: 279 sitemap URLs in total.

Search Console data (all time, to 2026-10-24) shows impressions on only four articles. Everything else has zero recorded impressions. With 231 lifetime impressions site-wide, "zero" mostly means "not yet tested by Google", not "failed". **No article is recommended for deletion.** That decision needs at least another 90 days of data.

## Articles with impressions

| Article | Impr. | Avg. pos | Action |
|---|---:|---:|---|
| why-nextjs-is-the-best-framework-for-modern-websites | 15 | 69.7 | Keep. Informational and off-target for leads. Link to /web-design-montreal. |
| what-is-a-custom-web-application | 6 | 80.3 | Improve: open with a clear definition and link to /software-development. |
| best-website-design-for-small-businesses-2026 | 4 | 11.3 | Improve first, since it's closest to page 1. Redirecting GBP link fixed 2026-10-26. |
| what-makes-a-luxury-brand-website-feel-premium | 3 | 80.7 | Keep. |

## Clusters and their owner page

| Cluster | EN articles | Owner page |
|---|---|---|
| SEO and local SEO | what-is-technical-seo, why-local-seo-matters, how-to-rank-higher-on-google-maps, google-business-profile-optimization, how-much-does-seo-cost-canada, seo-consultant-vs-agency-vs-diy, canadian-seo-companies-compared, why-is-my-website-not-ranking-on-google, how-google-crawls-and-understands-websites, google-search-console-reports-that-matter, why-internal-linking-is-one-of-the-most-powerful-seo-strategies, core-web-vitals-guide, website-performance, how-website-speed-directly-impacts-revenue-and-seo-rankings | /seo-montreal (local), /seo-canada (national) |
| AI search | what-is-generative-engine-optimization, can-chatgpt-recommend-my-business | /answer-engine-optimization |
| Web design and redesign | best-website-design-for-small-businesses-2026, what-to-know-before-hiring-web-design-agency, web-development-companies-compared, website-redesign-companies-what-to-look-for, how-to-redesign-a-website-without-destroying-seo, ai-website-redesign-what-ai-can-and-cannot-do, what-makes-a-high-converting-website, the-psychology-behind-high-converting-websites, why-most-business-websites-fail-to-generate-leads, why-businesses-lose-customers-because-of-bad-mobile-design, why-most-agency-websites-feel-cheap, what-makes-a-luxury-brand-website-feel-premium, the-future-of-websites-in-2026-and-beyond, why-custom-coded-websites-outperform-templates, website-builders-vs-hiring-someone, why-modern-businesses-are-moving-away-from-wordpress, framer-vs-wordpress, framer-seo-guide, why-nextjs-is-the-best-framework-for-modern-websites | /web-design-montreal, /website-redesign |
| Price and quotes | what-a-website-quote-should-include, website-maintenance-what-breaks-and-what-it-costs | /website-cost-canada, /website-maintenance |
| Shopify | shopify-seo-guide, shopify-partner-vs-expert-vs-freelancer, when-you-outgrow-shopify, shopify-theme-store-requirements | /shopify-development |
| Software and automation | what-is-custom-software-development, custom-software-development-cost-canada, what-is-a-custom-web-application, how-modern-businesses-use-custom-dashboards-and-internal-tools, ai-integration-vs-automation-vs-custom-ai, how-ai-automation-is-changing-modern-businesses, how-businesses-use-ai-automation-to-save-hundreds-of-hours, which-business-processes-are-worth-automating, intelligent-document-processing-explained | /software-development, /ai-automation |
| Branding | what-is-branding, how-premium-branding-builds-instant-trust-online | /branding |

## Overlap to watch (merge candidates, not yet)

Merge only if Search Console later shows two of these splitting the same queries:

- **Performance:** core-web-vitals-guide, website-performance, how-website-speed-directly-impacts-revenue-and-seo-rankings.
- **Lead-generating websites:** what-makes-a-high-converting-website, the-psychology-behind-high-converting-websites, why-most-business-websites-fail-to-generate-leads.
- **AI automation:** how-ai-automation-is-changing-modern-businesses, how-businesses-use-ai-automation-to-save-hundreds-of-hours.

## French

The 44 French articles mirror most English topics and are paired through hreflang. `scripts/check-seo-parity.mjs` reports 14 EN/FR pairs, all OK, on 2026-10-26. Apply the same rule: no deletion before more data.


## Content clusters (added 2026-10-29)

Classification of every page relevant to the five clusters. Full rationale in `CANNIBALIZATION-AUDIT.md`; ownership in `KEYWORD-TO-URL-MAP.md`. Word counts are body prose without code blocks.

| URL | Cluster | Class | Words | Served from | Notes |
|---|---|---|---:|---|---|
| /games | A | IMPROVE | hub | code | "Make your own Roblox game" section added |
| /games/guides/scary-roblox-games-with-friends | A | CREATE (PR #34) | guide | code | Owner of scary/horror/survival-horror intent |
| /games/guides/roblox-survival-horror-games | A | REDIRECT (PR #34) | — | — | 301 to the above |
| /games/guides/roblox-minigame-games | A | KEEP | guide | code | |
| /stillawake-times/how-to-make-a-roblox-game | A | CREATE | 2,685 | markdown | |
| /stillawake-times/how-to-make-a-horror-game-in-roblox-studio | A | CREATE | 3,063 | markdown | |
| /stillawake-times/how-to-fix-lag-in-roblox-studio | A | CREATE | 2,449 | markdown | |
| /stillawake-times/risk-it-roblox-minigame-launch | A | MONITOR | 681 | markdown | Launch note, below 1,500; news format, not an evergreen guide |
| /tools/llms-txt | B | CREATE (PR #34) | guide | code | |
| /stillawake-times/what-is-generative-engine-optimization | B | IMPROVE | 3,379 | CMS (B-13) | Absorbs "ChatGPT SEO vs SEO" |
| /stillawake-times/can-chatgpt-recommend-my-business | B | IMPROVE | 2,413 | CMS (B-13) | |
| /stillawake-times/how-to-appear-in-google-ai-overviews | B | CREATE | 2,651 | markdown | |
| /answer-engine-optimization | B | KEEP (links added) | page | code | Commercial owner |
| /tools | C | IMPROVE | hub | code | Two new cards |
| /tools/schema-markup-generator | C | CREATE (PR #34) | tool | code | |
| /tools/seo-audit | C | CREATE | tool | code | |
| /tools/app-development-cost-calculator | C | CREATE | tool | code | Same pricing engine |
| /tools/project-cost-calculator | C | KEEP | tool | code | |
| /tools/llms-txt-generator | C | IMPROVE (PR #34) | tool | code | |
| /shopify-development | D | KEEP (links added) | page | code | B-15 figure check |
| /shopify-vs-woocommerce | D | KEEP (fact fix) | page | code | Plan price updated |
| /stillawake-times/shopify-seo-guide | D | IMPROVE | 2,988 | CMS (B-13) | Was crawled-not-indexed |
| /stillawake-times/how-much-does-a-shopify-store-cost-canada | D | CREATE | 2,552 | markdown | |
| /stillawake-times/how-to-build-a-shopify-store | D | CREATE | 2,465 | markdown | |
| /stillawake-times/when-you-outgrow-shopify | D | KEEP | 1,578 | markdown | |
| /stillawake-times/shopify-theme-store-requirements | D | KEEP | 1,533 | markdown | |
| /stillawake-times/shopify-partner-vs-expert-vs-freelancer | D | MONITOR | 1,465 | markdown | Just under 1,500 |
| /work/blackwater-aquatics | D | KEEP | page | code | Source of all Blackwater figures |
| /software-development | E | KEEP (links added) | page | code | |
| /ai-automation | E | KEEP (link label updated) | page | code | |
| /stillawake-times/app-development-cost-canada | E | CREATE | 2,609 | markdown | |
| /stillawake-times/custom-software-development-cost-canada | E | MONITOR | 978 | markdown | Below 1,500; cross-linked to app article; candidate for expansion |
| /stillawake-times/how-businesses-use-ai-automation-to-save-hundreds-of-hours | E | IMPROVE | 2,605 | CMS (B-13) | Owns "AI automation for small business" |
| /stillawake-times/how-ai-automation-is-changing-modern-businesses | E | MONITOR | 3,332 | CMS | Possible overlap with the above |
| /stillawake-times/which-business-processes-are-worth-automating | E | KEEP | 1,260 | markdown | Decision framework; below 1,500 — expand later |
| /stillawake-times/intelligent-document-processing-explained | E | KEEP | 1,256 | markdown | Below 1,500 — expand later |
| /stillawake-times/ai-integration-vs-automation-vs-custom-ai | E | KEEP | 1,498 | markdown | |
