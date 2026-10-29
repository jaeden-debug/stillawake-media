# Content cluster master plan

The authoritative checklist for the five-cluster content program (Roblox, AI search, free tools, Shopify, software and automation). **Read this file, `CONTENT-PUBLICATION-LOG.md` and `BLOCKERS-AND-APPROVALS.md` at the start of every session**, then continue from "Next task" at the bottom.

This sits beside `MASTER-SEO-ROADMAP.md` (technical and service-page program) rather than replacing it. Shared systems are reused, not duplicated:

| Asked for | Where it lives | Why |
|---|---|---|
| Content inventory | `CONTENT-INVENTORY.md` (cluster section appended) | Existing inventory |
| Blockers | `BLOCKERS-AND-APPROVALS.md` (B-13 onward) | One blocker list for the whole site |
| Keyword-to-URL map | `KEYWORD-TO-URL-MAP.md` (new) | Cluster-level; `KEYWORD-STRATEGY.md` stays the service-term map |
| Everything else | new files listed below | No equivalent existed |

Other files: `CANNIBALIZATION-AUDIT.md`, `AI-DISCOVERY-AUDIT.md`, `CONTENT-PUBLICATION-LOG.md`, `CONTENT-QUALITY-CHECKLIST.md`, `CONTENT-PERFORMANCE-TRACKER.md`, `FINAL-CONTENT-CLUSTER-REPORT.md`.

Status: `[ ]` not started · `[-]` in progress · `[x]` completed and verified · `[!]` blocked · `[~]` monitoring

**"Verified" in this file means verified on a local production build** (`next build` + `next start`, crawl of all 338 sitemap URLs). Production verification happens after merge; until then every item's deployment column reads "PR open".

## Where things stand (2026-10-29)

- Branch `seo/content-clusters` stacks on PR #34 (`seo/discoverability-week1-2`) and includes PR #33 (`content/risk-it-public`). Merging it ships all three.
- Production serves 35 English articles from the CMS (Supabase `cms_public_content`), not from markdown. Four articles rewritten here are CMS-served; their markdown is updated, but the live copy changes only after a CMS sync (B-13).
- Search Console baseline (90 days to 2026-10-27): 0 impressions for any cluster query. See `CONTENT-PERFORMANCE-TRACKER.md`.

## Completion matrix

| ID | Deliverable | Action | URL | Words | Status | Deployment |
|---|---|---|---|---:|---|---|
| A1 | Best scary Roblox games to play with friends | CREATE (PR #34) | /games/guides/scary-roblox-games-with-friends | guide page | [x] local | PR #34 |
| A2 | Best Roblox survival horror games | MERGE into A1, 301 (PR #34) | /games/guides/roblox-survival-horror-games → A1 | — | [x] local | PR #34 |
| A3 | How to make a Roblox game | CREATE | /stillawake-times/how-to-make-a-roblox-game | 2,685 | [x] local | PR open |
| A4 | How to make a horror game in Roblox Studio | CREATE | /stillawake-times/how-to-make-a-horror-game-in-roblox-studio | 3,063 | [x] local | PR open |
| A5 | How to fix lag in Roblox games | CREATE | /stillawake-times/how-to-fix-lag-in-roblox-studio | 2,449 | [x] local | PR open |
| A-hub | Roblox development hub | IMPROVE | /games ("Make your own Roblox game" section) | hub | [x] local | PR open |
| B1 | What is llms.txt? | CREATE (PR #34) | /tools/llms-txt | guide page | [x] local | PR #34 |
| B2 | How to get recommended by ChatGPT | IMPROVE (rewrite) | /stillawake-times/can-chatgpt-recommend-my-business | 2,413 | [!] markdown done; CMS sync B-13 | PR open + B-13 |
| B3 | Generative engine optimization guide | IMPROVE | /stillawake-times/what-is-generative-engine-optimization | 3,379 | [!] markdown done; CMS sync B-13 | PR open + B-13 |
| B4 | How to appear in Google AI Overviews | CREATE | /stillawake-times/how-to-appear-in-google-ai-overviews | 2,651 | [x] local | PR open |
| B5 | ChatGPT SEO vs traditional SEO | MERGE into B3 (section + table) | B3 URL | in B3 | [!] with B3 | PR open + B-13 |
| B-hub | AI search hub | IMPROVE | /answer-engine-optimization related links + homepage group | hub | [x] local | PR open |
| B-exp | "Can AI assistants discover StillAwake?" experiment | — | not published | — | [ ] protocol written, not run | — |
| C1 | Schema markup generator | CREATE (PR #34) | /tools/schema-markup-generator | tool | [x] local | PR #34 |
| C2 | Website SEO audit tool | CREATE | /tools/seo-audit + /api/tools/seo-audit | tool | [x] local | PR open |
| C3 | App development cost calculator | CREATE (extends existing engine) | /tools/app-development-cost-calculator | tool | [x] local | PR open |
| C4 | llms.txt generator improvements | IMPROVE (PR #34) | /tools/llms-txt-generator | tool | [x] local | PR #34 |
| C-hub | Free tools hub | IMPROVE | /tools | hub | [x] local | PR open |
| D1 | Shopify store cost in Canada | CREATE | /stillawake-times/how-much-does-a-shopify-store-cost-canada | 2,552 | [x] local | PR open |
| D2 | Shopify vs WooCommerce | KEEP + fact fix | /shopify-vs-woocommerce | page | [x] local | PR open |
| D3 | How to build a Shopify store | CREATE | /stillawake-times/how-to-build-a-shopify-store | 2,465 | [x] local | PR open |
| D4 | Shopify SEO guide | IMPROVE (rewrite) | /stillawake-times/shopify-seo-guide | 2,988 | [!] markdown done; CMS sync B-13 | PR open + B-13 |
| D-hub | Ecommerce hub | IMPROVE | /shopify-development links to D1, D3, D4 | hub | [x] local | PR open |
| E1 | App development cost in Canada | CREATE | /stillawake-times/app-development-cost-canada | 2,609 | [x] local | PR open |
| E2 | AI automation for small businesses | IMPROVE (rewrite) | /stillawake-times/how-businesses-use-ai-automation-to-save-hundreds-of-hours | 2,605 | [!] markdown done; CMS sync B-13 | PR open + B-13 |
| E-hub | Software and automation hub | IMPROVE | /software-development, /ai-automation related articles | hub | [x] local | PR open |

Word counts are body prose excluding frontmatter and code blocks (`awk` + code-fence strip, see `CONTENT-QUALITY-CHECKLIST.md`).

## Item records

Each record: topic · intent · keywords · URL · existing URL · action · audience · sources · original evidence · links · promotion · schema · words · quality review · deployment · production verification · completed.

### A3 — How to make a Roblox game
- **Intent:** informational tutorial. **Primary:** how to make a roblox game (US 74,000/mo, CA 6,600/mo, Keyword Planner 2026-10-29). **Secondary:** roblox studio tutorial, how to publish a roblox game.
- **URL:** /stillawake-times/how-to-make-a-roblox-game. **Existing:** none (no prior tutorial). **Action:** CREATE.
- **Audience:** beginner and intermediate creators, teens and adults.
- **Sources:** create.roblox.com (publishing, content maturity, testing modes, script locations, remote events, streaming, performance), checked 2026-10.
- **Original evidence:** RISK IT! source and docs (`stillawake-media/risk-it/`): server-side validation rules, token-bucket remote limiter, DataStore session pattern, end-to-end bot results (25/25 v0.2) and the jump-key bug the bot missed; Stillskin Forest server-authoritative crouch.
- **Links:** A4, A5, /games, /games/risk-it, /games/stillskin-forest, /contact. **Promotion:** both games, disclosed as ours. **Schema:** Article (template).
- **Quality review:** passed; two Luau examples read-reviewed, not run in Studio. **Deployment:** PR open. **Production verification:** pending. **Completed:** —

### A4 — How to make a horror game in Roblox Studio
- **Intent:** advanced tutorial. **Primary:** how to make a horror game in roblox studio (US 210/mo).
- **URL:** /stillawake-times/how-to-make-a-horror-game-in-roblox-studio. **Action:** CREATE.
- **Sources:** Roblox Lighting, LightingStyle, Atmosphere, ColorCorrectionEffect, audio objects, pathfinding, testing modes docs.
- **Original evidence:** Stillskin Forest dev docs (`Documents/Codex/.../stillskin-v2/docs`, coordination notes) and the published wiki: perception, search-last-known-position, Dread Encounter, special nights, revives and ghosts. Says plainly multi-client testing hasn't been done.
- **Links:** /games/stillskin-forest + 17 wiki entries, A1, A3, A5. **Schema:** Article.
- **Flag for owner:** uses figures that appear only in dev pass notes (16 jump-only props, four-zombie Dread test, noise cooldowns). Confirm you're happy publishing them.

### A5 — How to fix lag in Roblox games
- **Intent:** technical optimization. **Primary:** how to fix lag in roblox studio (US 10/mo); **secondary:** roblox lag fix (US 480/mo, mostly player intent). Small demand; kept because it completes the developer cluster and A3 links to it.
- **Sources:** MicroProfiler, Developer Console, streaming, lighting, network ownership docs. **Original evidence:** Stillskin and RISK IT! practices (client-side VFX after server-emitted particles failed to replicate). No FPS figures.
- **Note:** Stillskin's console performance pass is described only as "in progress".

### B2 — How to get your business recommended by ChatGPT
- **Primary:** how to get cited by chatgpt (US 170/mo avg, 720 in Sept 2026 — rising). **URL:** existing /stillawake-times/can-chatgpt-recommend-my-business (slug kept). **Action:** IMPROVE, 856 → 2,413 words.
- **Sources:** OpenAI crawler docs (OAI-SearchBot, GPTBot, ChatGPT-User), OpenAI "Introducing ChatGPT search", OpenAI publisher FAQ (utm_source=chatgpt.com, read via search excerpts because the page returns 403 to fetchers).
- **Corrections:** removed an unsourced "$46 per click" and a "$150–$600" price; fixed Blackwater repeat rate to the case study's 5.9% → 33.3%.
- **Status:** [!] markdown ready; production serves the CMS copy (B-13).

### B3 + B5 — GEO guide, absorbing "ChatGPT SEO vs traditional SEO"
- **Primary:** generative engine optimization (US 4,400, CA 590). **Merged intent:** chatgpt seo (US 390, CA 50). One page owns both; see `CANNIBALIZATION-AUDIT.md`.
- **Sources:** arXiv 2311.09735 (GEO paper, KDD 2024), Google AI features docs, Google common crawlers, OpenAI crawler docs, Anthropic crawler article, Perplexity bot docs, Bing AI Performance announcement (blogs.bing.com, Feb 2026).
- **Removed:** "case-study sites score 98–100 for speed" (only accessibility/best-practices/SEO scores are backed in the repo).
- **Status:** [!] CMS sync B-13.

### B4 — How to appear in Google AI Overviews
- **Primary:** how to appear in google ai overviews (US 210 avg, 590–880/mo Jul–Sep 2026). **Action:** CREATE (no page owned this; AEO service page is commercial).
- **Sources:** Google Search Central "AI features and your website", Google helpful content guidance. Separates documented behaviour from observed patterns, labelled as hypotheses.

### C2 — Free SEO audit tool
- **Primary:** seo audit tool (US 1,900, CA 170), free seo audit tool (US 590), free seo audit (CA 210).
- **Build:** `src/lib/seo-audit/analyze.ts` (pure, 15 tests), `src/app/api/tools/seo-audit/route.ts`, `src/components/tools/seo-audit-tool.tsx`, page.
- **Safety:** reuses the llms.txt SSRF guard (DNS resolved and validated before connecting, every redirect hop re-checked, private/link-local/metadata ranges refused, 2 MB cap, 8 s timeout). Fixed request budget: page + robots.txt + at most two same-origin sitemap files. Per-IP limit 6/minute per instance. Vercel BotID on the POST, failing closed on Vercel. Honest user agent `StillAwakeSEOAuditBot/1.0`.
- **Verified locally:** audited /web-design-montreal (13 pass, 1 note), blackwateraquatics.ca, and the `http://www.` URL (correctly flagged the 2-hop redirect, B-07). Refused `169.254.169.254` and `localhost`.
- **States its limits:** cannot see Search Console indexing, rankings, quality, CWV, or JS-rendered content.

### C3 — App development cost calculator
- **Primary:** app development cost calculator (US 210, CA 10).
- **Build:** the existing `ProjectCalculator` gained a `preset` prop; the page presets `goal: "software"` so the flow opens at "Who uses it?". Every band on the page is read from `src/lib/pricing/model.ts` (`BASES.software_*`, `ADDITIONS.*`) — no second pricing model.
- **Limits stated:** native iOS/Android scoped individually; third-party running costs excluded; discovery above the size threshold.
- **Verified locally:** customer-portal path returns "from CA$18,000" + discovery from CA$1,800.

### D1 — How much a Shopify store costs in Canada
- **Primary:** shopify website cost (US 590), how much does a shopify store cost (US 210, CA 20). Distinct from /shopify-development (commercial).
- **Sources:** shopify.com/ca/pricing (CAD plan prices, card rates, third-party fees, as of Oct 2026), Theme Store, help.shopify.com, CRA small-supplier rule, Éducaloi on French-language requirements.
- **Flags:** Plus "from $3,400 CAD/mo" shown on Shopify's page next to a "Try for $517" button — worth rechecking; theme price band has no currency on Shopify's listing (article says so). StillAwake build price quoted from /pricing ($4,250), which differs from `store_standard` low ($3,600) in the model — see B-15.

### D2 — Shopify vs WooCommerce
- **Action:** KEEP. Fact check found one dated figure ("plans from about $50 CAD/month"), replaced with "as of October 2026, Basic is CA$49/month billed monthly or CA$37/month billed yearly". FR page has no price figure.

### D3 — How to build a Shopify store
- **Primary:** how to build a shopify store (US 3,600, CA 590). **Sources:** help.shopify.com (11 articles), shopify.dev. Uses "Test payment gateway" (Shopify's current name).

### D4 — Shopify SEO guide
- **Primary:** shopify seo (US 1,900, CA 260). Search Console: "Crawled – currently not indexed". Rewritten for specificity, not length (3,812 → 2,988).
- **Original evidence:** Blackwater case-study figures with their dates. **Status:** [!] CMS sync B-13.
- **Side finding:** Blackwater's own `robots.txt.liquid` disallows `/*?variant=` and `/*?locale=` — may hide canonicals and interfere with Markets URLs (B-14).

### E1 — App development cost in Canada
- **Primary:** how much does it cost to build an app (US 480, CA 50). Distinct from `custom-software-development-cost-canada` (bespoke internal systems); the two link to each other.
- **Prices:** StillAwake bands from the pricing model only; no market ranges. Store fees from Apple and Google primary pages. Stalkr (NAVTRL) used as the mobile reference.

### E2 — AI automation for small businesses
- **Primary:** ai automation for small business (US 1,600, CA 590). Owner URL kept (existing article) — no new page.
- **Removed:** invented hours-saved figures, "$1,500–$60,000" bands, "15–20% maintenance". All examples labelled illustrative. Law 25 points rest on the CAI summary (LegisQuébec blocked fetching).
- **Status:** [!] CMS sync B-13. The article still uses an unrelated featured image — replace when syncing.

## Bilingual decision

No new French pages in this program. Measured French demand for these specific intents was not established, and the French site already has owner pages for AI search (`/fr/referencement-ia`, `/fr/etre-cite-par-ia`), Shopify (`/fr/developpement-shopify`, `/fr/boutique-en-ligne-quebec`), automation (`/fr/automatisation-ia`) and pricing. New EN articles declare no `pair`, so no hreflang is emitted for them (correct for EN-only content). Candidates for a later FR pass: the SEO audit tool and the app cost calculator (tool UIs, where FR copy is cheap and the calculator engine is already bilingual).

## Next task

1. Owner: decide on merging PRs #33 → #34 → this PR (or this PR alone, which includes both), and approve the CMS sync (B-13).
2. After merge: production verification for every URL in the matrix (status, canonical, schema, sitemap), then IndexNow submission and Search Console URL Inspection for A3, A4, B4, C2, C3, D1, D3, E1 (owner, quota ~10/day).
3. Run the AI-discovery experiment in `AI-DISCOVERY-AUDIT.md` §4 and record results.
4. 30-day review on 2026-11-30 (`CONTENT-PERFORMANCE-TRACKER.md`).
