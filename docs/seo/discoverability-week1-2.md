# Discoverability: Weeks 1–2 implementation checklist

Started 2026-10-29. Each item is marked done only with evidence written next to it. "Owner" items need a sign-in or a decision only the site owner can make.

## 1. What Search Console actually says (2026-10-29)

Source: Search Console → Indexing → Pages, property `sc-domain:stillawakemedia.com`, read in the browser as jaeden@stillawakemedia.com. The report was last updated **2026-10-22**.

| Status | Pages | Source | What it is |
|---|---:|---|---|
| Indexed | 45 | — | Mostly the homepage, core EN service pages, and some older articles. |
| Discovered – currently not indexed | 127 | Google systems | Google knows the URL from the sitemap but hasn't crawled it. |
| Crawled – currently not indexed | 11 | Google systems | Google crawled the page and chose not to index it. |
| Page with redirect | 6 | Website | Expected: `http://`, `www.`, `/technical-seo`, and two retired Times slugs. |

Sitemaps report: `https://stillawakemedia.com/sitemap.xml`, submitted 2026-08-12, **last read 2026-10-24**, status Success, **178 discovered URLs**. The live sitemap now has 327 URLs.

### What each bucket means

- **The ~140 game pages are not in the report at all.** The games hub, Stillskin wiki, RISK IT! and both comparison guides were first committed on **2026-10-25**. The report's data stops at 2026-10-22, and Google last read the sitemap on 2026-10-24. URL Inspection of `/games/guides/roblox-survival-horror-games` returns "URL is unknown to Google". The gap between 178 and 327 is timing, not a quality verdict.
- **Discovered – not indexed (127): a crawl-priority problem, not a technical block.** The list covers:
  - nearly the whole French site (`/fr/*`, all 47 `/fr/articles/*`);
  - all of `/tools` except the cost calculator;
  - the four case studies (`/work/*`);
  - about 40 English Times articles;
  - several resource pages (`/website-ownership`, `/website-setup-guide`, `/choosing-website-technology`, `/do-i-need-custom-software`).

  URL Inspection of `/tools/llms-txt-generator` shows "Discovered – currently not indexed", discovered via the sitemap, "Referring page: None detected", last crawl N/A. Google learned these URLs only from the sitemap, never through internal links, and hasn't spent crawl budget on them. This is typical for a young domain with few external links. Better internal linking from pages Google already crawls (the homepage, `/about`, `/services`, `/web-design-montreal`, `/pricing`) is the lever we control.
- **Crawled – not indexed (11): a quality and distinctiveness signal.** These are generic early articles, last crawled 2026-07-24 to 2026-08-22:
  - how-modern-businesses-use-custom-dashboards-and-internal-tools
  - what-makes-a-high-converting-website
  - how-website-speed-directly-impacts-revenue-and-seo-rankings
  - what-makes-a-luxury-brand-website-feel-premium
  - the-psychology-behind-high-converting-websites
  - shopify-seo-guide
  - what-is-branding
  - web-development-montreal
  - website-redesign-montreal
  - how-google-crawls-and-understands-websites
  - one more (the report lists 11; 10 were captured on the first page)

  Google fetched these and decided they don't add enough. Resubmitting won't change that; rewriting or consolidating will. That is follow-up work, listed in section 4.
- **Technical exclusions: none.** No noindex, no robots.txt blocks, no canonical conflicts, no soft 404s, no server errors in any bucket. A live fetch of 16 priority URLs (Zylx `gsc_indexing_diagnostics`) returned 200, `index, follow`, and a self-referencing canonical for each.
- **Duplicates: none reported.** There is no "Duplicate without user-selected canonical" or "Alternate page with proper canonical" bucket.

### Conclusion

Resubmitting the sitemap tells Google about the 140 new game URLs; it won't make Google crawl the 127 it already knows about, and it won't change the 11 it rejected. The work is:
1. make priority pages reachable in one hop from pages Google already indexes;
2. make the new pages substantial and original;
3. consolidate where two pages would compete;
4. earn external links (tools are the best candidates).

## 2. Search intent checks before building

| Proposed page | Existing page with the same intent? | Decision |
|---|---|---|
| "Best scary Roblox games to play with friends" | `/games/guides/roblox-survival-horror-games`. Google's top 10 for "scary roblox games to play with friends" and "roblox survival horror games" share roblox.com/spotlight/horror, mmoculture.com, 9thimpact.com and Reddit, so Google treats them as one intent. | **Consolidate.** Expand the survival-horror guide into `/games/guides/scary-roblox-games-with-friends` and 301 the old URL. The old URL was never indexed ("URL is unknown to Google"), so the redirect costs nothing. |
| "What is llms.txt?" | `/tools/llms-txt-generator` answers it in one FAQ line. The top 10 for "what is llms.txt" are explainers (llmstxt.org, Chrome docs, GitBook, Semrush, Ahrefs), a different intent from a generator tool. | **New hub at `/tools/llms-txt`**, the parent of the existing platform guides. The generator's FAQ answer links to it instead of repeating it. |
| "Schema markup generator" | None in English. FR article `donnees-structurees-implementation` is an explainer, not a tool. | **New tool at `/tools/schema-markup-generator`.** |
| GEO / "generative engine optimization" | `/stillawake-times/what-is-generative-engine-optimization` exists (discovered, not indexed). | No new page. Link to it from the homepage and the llms.txt hub. |
| "How to rank on Google Maps" | `/stillawake-times/how-to-rank-higher-on-google-maps` exists (discovered, not indexed). | No new page. Link to it from the homepage and the Local SEO page. |

## 3. Checklist

### Week 1: discoverability of existing pages

- [x] Homepage "Free tools and guides" section linking priority guides, tools and services with descriptive anchors. *Evidence:* `src/app/(en)/page.tsx` `RESOURCE_GROUPS`; the local production build shows 13 links in the section. The services chip row gains Local SEO and AI Automation.
- [x] Footer "Explore" links to the llms.txt guide, the schema generator, the games hub and the Roblox guide. *Evidence:* `src/components/footer.tsx`, rendered on every EN page.
- [x] Contextual links. *Evidence:*
  - AEO → llms.txt guide and schema generator: intro paragraph and Related links.
  - Local SEO → schema generator: new first card. It already linked the Google Maps article.
  - llms.txt generator → llms.txt guide: intro line. Its FAQ now states Google's June 2026 position.
  - tools hub → the new tool and guide: a schema generator card, and the guide linked from the guides intro.
  - GEO article → llms.txt guide. The article now says llms.txt isn't a ranking factor and nothing guarantees a citation; `updated` is 2026-10-29.
- [x] Sitemap lastmod updated for changed pages. New pages included; the redirected guide excluded. *Evidence:* the local build sitemap has 329 URLs, including `/tools/llms-txt`, `/tools/schema-markup-generator` and `/games/guides/scary-roblox-games-with-friends`, and not the old guide.
- [ ] Resubmit the sitemap in Search Console after deploy, so Google reads the 327+ URL version.
- [ ] Request indexing (URL Inspection) for the priority URLs after deploy. Daily quota is about 10.
- [ ] Bing Webmaster Tools. **Owner:** needs a Microsoft or Google sign-in consent.

### Week 2: new and consolidated pages

- [x] `/tools/llms-txt`: an original "What is llms.txt?" resource with real examples, the spec structure, limitations (Google's June 2026 statement), and implementation steps. No claim that it guarantees AI visibility.
- [x] `/tools/schema-markup-generator`: a working generator for Organization, LocalBusiness, Article, Product, BreadcrumbList, FAQPage and Person. It validates required and recommended fields and formats, and outputs copyable JSON-LD. It states that FAQ rich results were retired on 2026-05-07 and that markup guarantees nothing.
- [x] `/games/guides/scary-roblox-games-with-friends`: games grouped by how you play together, with every figure re-read from games.roblox.com on 2026-10-29, plus a section on designing co-op horror from building Stillskin Forest (disclosed as unreleased). The old guide URL is 301-redirected here.

### Release

- [x] Typecheck, unit tests and production build pass. *Evidence:*
  - `tsc --noEmit` is clean.
  - vitest: 29 files, 880 passed, 2 skipped. New tests: `src/lib/schema-generator/index.test.ts` (11) and the guide-sections test in `games.test.ts`.
  - `npm run build` exits 0.
  - Local `next start`: the 10 changed routes return 200; the old guide returns 308 to the new one; no console errors; no horizontal overflow at 375px.
- [ ] PR merged; production serves the new pages (200, canonical, in sitemap).
- [ ] IndexNow submission accepted.

Also in this release:
- `/llms.txt` now puts the long tail (every project, wiki page and article) under `## Optional`, as the proposal intends. It was measured at 77 KB with 245 links and no Optional section.
- Validator fix found in browser testing: a bad price no longer reports two errors.

### Project CTAs (requested 2026-10-29, second release)

- [x] "Need help getting started with your project?" band (`src/components/project-cta.tsx`). Three buttons: the Studio intake, the cost calculator and the pricing page; FR version links `/fr/...`. Added to:
  - EN: the tools hub, the llms.txt guide (AEO-specific copy), the schema generator (structured-data copy), the llms.txt generator, the three llms.txt platform guides, the website setup guide, choosing website technology, and do I need custom software.
  - FR: outils, the générateur llms.txt, the FR platform guides, guide-site-web-entreprise, choisir-technologie-site-web, and logiciel-sur-mesure-ou-solution-existante.
- [x] Article "Next step" boxes (Times, CMS articles, FR articles) gain "Estimate the cost" and "See pricing" next to the existing start button.
- Left out on purpose: the games guides and wiki. Readers there are players, and StillAwake doesn't sell game development, so an agency CTA would be off-intent.

## 4. Follow-ups (not in this release)

- Rewrite or consolidate the 11 crawled-not-indexed articles.
- French counterparts for the llms.txt hub and the schema generator.
- Earn external links to the tools: directories, communities, and the Roblox DevForum for the guide.
