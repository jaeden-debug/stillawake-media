# Portfolio 2.0, Games hub and Stillskin Forest wiki: implementation report

Date: 2026-10-25/26 · Repository: `stillawake-media` (stillawakemedia.com) · Status: **built and tested locally, not committed, not deployed.**

Related generated docs (kept current by `src/lib/game-docs.test.ts`):

- [ROUTE-INVENTORY.md](ROUTE-INVENTORY.md): every new URL, plus the portfolio inventory
- [stillskin-forest/CONTENT-AUDIT.md](stillskin-forest/CONTENT-AUDIT.md): published vs unpublished articles and every recorded gap
- [stillskin-forest/SCREENSHOT-CHECKLIST.md](stillskin-forest/SCREENSHOT-CHECKLIST.md) and [screenshot-manifest.json](stillskin-forest/screenshot-manifest.json): all 86 images
- [KEYWORD-RESEARCH.md](KEYWORD-RESEARCH.md): measured keyword data and intent map

---

## 1. What was built

| Area | Result |
|---|---|
| **Our Work** (`/our-work`) | Cinematic featured hero, category chips, project search, and horizontal shelves: Featured, Websites, Apps, Games, Tools, Components, SaaS, Brand & Design, Recently Updated. Shelves scroll by touch/trackpad natively, with previous/next buttons and Left/Right keys. |
| **Project pages** (`/our-work/[slug]`) | 8 static pages: overview, at-a-glance, highlights, case-study link, external link, related projects, breadcrumbs. The old iframe browser became a click-to-load, sandboxed **Live Preview** section with loading state and a fallback link. |
| **Games hub** (`/games`) | Game cards (status, platforms, genre, CTAs) and a guides shelf. Reusable for future games. |
| **Stillskin Forest** (`/games/stillskin-forest`) | Landing page: hero, status note, about, facts, features, screenshots (renders only when real captures exist), start-here guides, enemies, places, latest update, wiki CTA. |
| **Wiki** (`/games/stillskin-forest/wiki`) | Home with search and category filters, 11 category pages, **78 published articles**, left nav, right table of contents, mobile drawer, spoiler gates, related articles and backlinks, prev/next, sources and last-checked date on every page. |
| **Search** | One typo-tolerant client search over portfolio, games and wiki. The index is built on the server from published content only. Combobox semantics with keyboard support. |
| **SEO** | Metadata, canonicals, OG, JSON-LD (VideoGame, CollectionPage, ItemList, Article, BreadcrumbList, FAQPage on the FAQ only), sitemap entries, redirects, llms.txt links. |
| **Analytics** | New GA4 events (section 7). |
| **French portfolio** (`/fr/realisations`) | Rebuilt on the same shelf design with French copy (`projects-fr.ts`). French cards link to French case studies where they exist, otherwise to the live site, and English-only pages are marked with hreflang. The old iframe `PortfolioBrowser` component was removed. |
| **Genre guide** (`/games/guides/roblox-survival-horror-games`) | Eight Roblox survival-horror games compared, with dated numbers from Roblox's public API. Not a ranking, and the Stillskin Forest disclosure is on the page. Data: `src/data/games/guides/roblox-survival-horror.ts`. |

**Data architecture.** No database was added. Everything is typed content files, which the project already used:

- `src/data/portfolio/projects.ts`: one record per project, multi-category by reference.
- `src/data/games/types.ts`: Game, WikiEntry, WikiCategory, GameUpdate, MediaAsset.
- `src/data/games/stillskin-forest/`: `game.ts`, `media.ts`, `wiki/*.ts`.
- `src/lib/games.ts`: the single place that decides what is published.

## 2. Where the Stillskin Forest facts came from

1. **The game's own data**, read-only from the open Studio place on 2026-10-25: `ReplicatedStorage.GameConfig` (cycle, enemies, detection, noise, stamina, crouch, special nights, Watcher, durability, upgrades) and item attributes in `ServerStorage.Items` (every weapon/item stat). Nothing in Studio was changed.
2. **The Roblox session's project-state log**: features verified in playtests with real input, and an explicit "not yet verified" list.
3. **The design/game report** and the world tree (31 note titles, 9 secrets, Green Lake objects).
4. **The public Roblox API** (universe 7636493328): the listing exists, 0 visits, and playability could not be confirmed without login.

Rules applied: anything only the design report claimed, or the log listed as unverified, is left out or published with an explicit note. No numbers were invented. Derived numbers (hits-to-kill, stamina seconds) are marked as derived.

**Verification states.** `verified_live` (published) means "confirmed in the current development build". The game itself is not public, so every page says so and carries its check date. The Roblox CTA reads **"View on Roblox"**, not "Play", until `publiclyPlayable` is set to true.

## 3. Migration and SEO preservation

| Old URL | New | How |
|---|---|---|
| `/portfolio` | `/our-work` | 308 permanent redirect; the old page file was removed |
| `/our-work/stillskin-forest` | `/games/stillskin-forest` | 308, so the game has one canonical URL |
| `/our-work/llms-txt-generator` | `/tools/llms-txt-generator` | 308, existing tool page stays canonical |

- `/work` and all `/work/*` case studies are **unchanged** and linked from project pages.
- EN/FR: `/fr/realisations` now pairs with `/our-work` (hreflang updated both ways, sitemap pair updated) and uses the same new design. The wiki is English-only (French demand is 10–140 searches/month; see the keyword report).
- All internal `/portfolio` links (nav, footer, 8 pages, LiveWorkShowcase, llms.txt) now point to `/our-work`, so nothing links through a redirect.
- Nav: "Portfolio" became "Our Work", and "Games" was added.
- `PAGE_SCHEMA` key `/portfolio` renamed to `/our-work` (count stays 20, test unchanged).

## 4. SEO technical report

- **Server-rendered**: every article's full text is in the initial HTML (verified with curl). Spoilers use `<details>`, so they stay in the HTML but collapsed.
- **Metadata**: unique title tag and 70–165-character description on every article (enforced by tests), plus canonical and OG. Article titles use `absolute` titles, so they don't get a doubled brand suffix.
- **Structured data**: the game is a `VideoGame` with `@id`, linked to the existing Organization `@id`, with playMode and numberOfPlayers, and no ratings, prices or release date. Articles are `Article` authored and published by the Organization (no invented author), `about` the VideoGame. Category and hub pages are `CollectionPage` + `ItemList`. `FAQPage` only on the FAQ article. JSON-LD is escaped against `</script>`. A crawl confirmed every new page's JSON-LD parses. **Not yet run:** Google's Rich Results Test on the live URLs (needs deployment).
- **Sitemap**: 232 URLs (was 133 + new). Only published entries; lastmod is each entry's verified date, not the deploy date. `/portfolio` removed. A sitemap index isn't needed at this size.
- **Robots and crawlers**: `robots.txt` stays `allow: /` for all agents. That already admits Googlebot, Bingbot and OAI-SearchBot/GPTBot. Whether to block AI *training* crawlers (GPTBot, Google-Extended, CCBot) while keeping search crawlers is a business decision, so it was left unchanged. Vercel firewall/BotID settings were not modified.
- **llms.txt**: existing, auto-generated route; now lists Our Work, Games, the game and the wiki. It is not a substitute for the sitemap.
- **Not done (needs access or deployment):** Search Console / Bing Webmaster sitemap resubmission, IndexNow ping, Rich Results validation, Core Web Vitals on production.

## 5. Media

- 86 required images are defined in `media.ts`, plus 12 extra captures (98 total). **Passes 1–3 (2026-10-26): 61 captured (49 listed ids + 12 extras), all 12 P0 shots included.** 37 still missing. The capture JSON gives a reason for each one, for example a shot that needs two players. Captures are real in-game renders. Night shots carry a client-side exposure lift, which their captions disclose. Captures live in `src/data/games/stillskin-forest/captured.ts`, generated by `node scripts/import-game-captures.mjs` from `capture-delivery/stillskin-forest-assets.json`. The script refuses to import if any listed file is missing. The hero image is real dusk gameplay. The two survivors in it are clones of one test avatar, as its description notes. Don't use the in-game Bag of Chips model in marketing: it shows a real third-party logo.
- Missing images never render as broken `<img>`. Project cards use a designed typographic poster in the project's accent colour, the game screenshot gallery is hidden until real captures exist, and article figures appear only when an asset exists.
- A separate session (the Stillskin asset agent) is capturing real screenshots into `public/games/stillskin-forest/<folder>/`, against this manifest. To publish a capture: set its entry in `capturedAssets` in `media.ts` (status `"optimized"`, real dimensions), then run `UPDATE_DOCS=1 npx vitest run src/lib/game-docs.test.ts`.
- When the hero lands, also add it as `image` on the Stillskin record in `projects.ts`, so the Our Work hero and card show it.

**Homepages:** the EN and FR homepage showcase (`LiveWorkShowcase`) no longer embeds live sites. It shows the featured project cards and links to the portfolio. Live previews remain one click deeper, on each project page.

## 6. Missing or unverified game information

See CONTENT-AUDIT.md for the full list. Summary of what is **not** published:

- Escape from the Hollow (built, not playtest-verified)
- Green Lake investigation (no quest objective yet)
- Blackpine vs Pinecrest Ranger Station (naming conflict between the listing and the build)
- Shoulder/hip/pocket inventory, Embers/shop, achievements, leaderboards, weather, named milestone nights (planned or not live)

Gaps noted inside published pages: controller/touch verification, exact loot drop rates, per-note locations, two-player cave run, takedowns and plank-breaking not yet observed in a recorded test, multi-client Return to Camp.

## 7. Analytics

All events are secondary (none is a conversion) and go through the existing consent-mode GA4 setup. A delegated listener reads `data-track` attributes, so server components need no client JavaScript.

| Event | When | Params |
|---|---|---|
| `roblox_outbound_click` | Any View/Play on Roblox button | game, placement, page |
| `game_cta_click` | View details / wiki / how-to-play CTAs | game, cta, page |
| `portfolio_card_click`, `portfolio_featured_click` | Project card / hero | project, page |
| `portfolio_outbound_click` | External site links | project or host, page |
| `live_preview_load` | Visitor loads an iframe preview | host |
| `site_search` | Query paused ≥0.9 s | search_scope (our_work, wiki:stillskin-forest), search_term, results, **no_results** (the missing-content report) |
| `ai_referral` | First page of a session referred by ChatGPT, Perplexity, Copilot, Gemini, Claude or You.com | ai_source, landing_page |

- Hub visits, project views, wiki visits and article-to-article navigation come from GA4 `page_view` (filter by path `/our-work`, `/games`, `/games/*/wiki`).
- Organic Google vs Bing vs social vs direct uses GA4's default channel grouping. AI traffic usually arrives without a referrer, so `ai_referral` undercounts by design.
- An outbound Roblox click is **not** a play.
- GA4 admin step still needed: register `search_term`, `search_scope`, `no_results`, `game`, `placement` and `ai_source` as custom dimensions.

## 8. Test report

| Check | Result |
|---|---|
| `tsc --noEmit` | Pass |
| `vitest run` | **146/146** (122 existing + 20 wiki/portfolio/search integrity + 4 generated-doc freshness) |
| `next build` | Pass: 242 static pages. 4 warnings are pre-existing (`src/lib/content.ts` fs tracing) |
| `scripts/check-seo-parity.mjs` | Pass (14 EN/FR pairs) |
| ESLint | No new problem types. The repo has 21 pre-existing errors (`<a>` for internal links on service pages); one pre-existing `<a href>` on `shopify-development` (formerly `/portfolio`) is now reported twice by Next's rule. |
| Crawl (dev server) | 232/232 sitemap URLs return 200. 138 unique internal links from the new pages: 0 broken. Every new page has exactly 1 H1, a canonical, and valid JSON-LD. Redirects return 308 to the right targets. |
| Browser | Desktop 1440 and mobile 375: Our Work, landing, wiki article, spoiler page all render; no horizontal overflow on mobile; shelf arrows and arrow keys page correctly. |

The integrity tests enforce: no link to an unpublished page, no unpublished content routed or searchable, unique slugs/titles/H1s/descriptions, description length, every article has an answer and sources, every media id exists, stable URL shapes, and typo-tolerant search ("shotgn" finds Shotgun).

## 9. Deployment

**Not deployed and not committed.** Production deploys through Vercel's Git integration on `main`. Pushing is your call.

After deploy:

1. Spot-check `/our-work`, `/games/stillskin-forest`, a wiki article and `/portfolio` (expect 308).
2. Submit `https://stillawakemedia.com/sitemap.xml` in Search Console and Bing Webmaster Tools, and ping IndexNow for the new URLs.
3. Run Rich Results Test on the game page, a wiki article and the FAQ.
4. Register the GA4 custom dimensions above.
5. When the game is publicly playable: set `publiclyPlayable: true` and `releaseStatus`/`releaseDate` in `game.ts`, and add tested devices to `verifiedDevices`.

## 10. Future publishing

**Add a project:** add a record to `projects` in `src/data/portfolio/projects.ts`. Give it categories by id, and add a new category to `projectCategories` if needed. Set `canonicalPath` if it has a home elsewhere on the site. It appears on every shelf, in search, in the sitemap and gets a page automatically.

**Add a game:**

1. Create `src/data/games/<slug>/game.ts` (Game + categories), `media.ts` and `wiki/`.
2. Add a bundle to `gameBundles` in `src/data/games/index.ts`.
3. Add a project record with `canonicalPath: "/games/<slug>"`.

All routes, sitemap entries, search, schema and nav come from the bundle. No template changes.

**Add a wiki article:** append a `WikiEntry` to the right `wiki/*.ts` file. Requirements:

- a unique `slug`, a question-style `answer` first, sections, sources and `lastVerified`;
- `verification: "verified_live"` only once confirmed in the build; anything else stays unpublished and shows up in the audit;
- link to other articles with `[label](@slug)`; tests fail on a link to an unpublished page;
- then run `UPDATE_DOCS=1 npx vitest run src/lib/game-docs.test.ts`.

**Update game data after a build change:** edit the numbers in the relevant entry, bump its `lastVerified`, add a `GameUpdate` in `wiki/updates.ts` (no invented version numbers), and regenerate docs.

**Add screenshots:** see section 5.
