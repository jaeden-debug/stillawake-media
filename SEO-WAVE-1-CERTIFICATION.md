# StillAwake SEO Wave 1 — Certification

**Date:** 2026-08-14
**Scope:** llms.txt authority cluster + programmatic SEO foundation
**Build:** ✅ passing · **Tests:** ✅ 138/138 · **Typecheck:** ✅ clean · **Lint:** 1 pre-existing warning

---

## Per-URL report

### 1. `/tools` — NEW

| | |
|---|---|
| **Primary query** | (none — architectural hub) |
| **Intent** | Navigational / discovery |
| **Why it deserves to exist** | The generator had zero inbound internal links. A hub was needed to carry link equity into it and to hold the guide set. It also states what the tools are *for*, which is not filler — it is the only page that explains the "machines, not people" framing the whole cluster rests on. |
| **Unique first-hand value** | Explains why the studio publishes free diagnostics; sets the honest expectation that more tools appear only when they do something useful. |
| **Links in** | Footer (Resources, sitewide), `/tools/llms-txt-generator`, all 3 platform guides (breadcrumb) |
| **Links out** | Generator, 3 guides, `/answer-engine-optimization` |
| **Commercial destination** | `/answer-engine-optimization` |
| **Indexable** | Yes |
| **Canonical** | `https://stillawakemedia.com/tools` |
| **hreflang** | `en-CA`, `x-default` (no FR counterpart yet — correct per site convention) |
| **Schema** | CollectionPage + BreadcrumbList + Organization/WebSite |
| **Quality gate** | ✅ Pass |

### 2. `/tools/llms-txt-generator` — IMPROVED

| | |
|---|---|
| **Primary query** | `llms txt generator` (480/mo US · 90/mo CA · LOW comp) |
| **Secondary** | `llms txt file`, `create llms txt`, `generate llms txt` |
| **Intent** | Transactional (tool) |
| **Why it deserves to exist** | It is working software, not a landing page. SERP is firecrawl / SiteSpeakAI / AdNabu / WordLift / LLMrefs — no major brand. |
| **Unique first-hand value** | The new "What this actually checks" section documents all 8 entity checks exactly as `analyze.ts` implements them, including the `@id`-resolution behaviour. Plus a stated limitations block and the SSRF/rate-limit handling note. No competitor publishes its methodology. |
| **Links in** | `/tools`, `/answer-engine-optimization` (×2), 3 platform guides, footer (via `/tools`) |
| **Links out** | 3 guides, `/answer-engine-optimization`, `/founder/jaeden-doody`, `/llms.txt`, `/tools` |
| **Commercial destination** | `/answer-engine-optimization` |
| **Indexable** | Yes · **Canonical** self · **Schema** WebPage(service) + BreadcrumbList |
| **Last verified** | Tool re-tested live: scores this site 95/100, 8 findings, 3,825-byte file |
| **Quality gate** | ✅ Pass |

### 3. `/tools/llms-txt/shopify` — NEW

| | |
|---|---|
| **Primary query** | `llms txt shopify` (20/mo US · LOW comp 3) |
| **Intent** | Implementation |
| **Why it deserves to exist** | **The pages currently ranking are wrong.** Shopify shipped native `/llms.txt`, `/llms-full.txt` and `/agents.md` on 28 May 2026; the upload-to-Files-plus-redirect method most guides still describe now shadows a file Shopify maintains. |
| **Unique first-hand value** | Correct 2026 answer ("you already have one"); the `agents.md` → `llms.txt` fallback chain; **only `agents` and `request` Liquid objects are available at this path** — copied generic templates render empty without erroring; must be Liquid not JSON; leftover redirects silently shadow overrides. |
| **Links in** | `/tools`, `/tools/llms-txt-generator`, `/answer-engine-optimization`, 2 sibling guides |
| **Links out** | Generator, `/shopify-development`, `/answer-engine-optimization`, siblings, founder |
| **Commercial destination** | `/shopify-development` (480/mo CA, **+43%**) |
| **Indexable** | Yes · **Canonical** self · **Schema** Article + BreadcrumbList |
| **Last verified** | 2026-08-14 · 3 primary Shopify sources |
| **Quality gate** | ✅ Pass — 5 steps, 5 gotchas, 3 verification steps, 4 limitations |

### 4. `/tools/llms-txt/nextjs` — NEW

| | |
|---|---|
| **Primary query** | `llms txt nextjs` (10/mo US · LOW comp 4) — *published on SERP weakness, expertise and linkability, not volume* |
| **Intent** | Implementation |
| **Why it deserves to exist** | This site is a Next.js App Router site serving its own `/llms.txt` from a Route Handler. Strongest available first-hand evidence. |
| **Unique first-hand value** | **Route Handlers are not cached by default** — without `dynamic = "force-static"` the file recomputes on every crawler hit; `use cache` is invalid directly inside a handler body; `public/` serves with `Cache-Control: max-age=0`; the build-table static-vs-dynamic check as CI-able verification. Verified against the Next.js 16.3.0 docs in this repo. |
| **Links in** | `/tools`, generator, `/answer-engine-optimization`, 2 siblings |
| **Links out** | Generator, `/software-development`, AEO, siblings, founder |
| **Commercial destination** | `/software-development` |
| **Indexable** | Yes · **Canonical** self · **Schema** Article + BreadcrumbList |
| **Last verified** | 2026-08-14 · 3 primary Next.js sources |
| **Quality gate** | ✅ Pass — 5 steps, 5 gotchas, 3 verification steps, 4 limitations |

### 5. `/tools/llms-txt/wordpress` — NEW

| | |
|---|---|
| **Primary query** | `llms txt wordpress` (**390/mo US** · LOW comp 23) — highest-volume platform variant |
| **Intent** | Implementation |
| **Why it deserves to exist** | Ranking pages say "install a plugin or upload a file" and stop. What the plugins actually do is the useful part and is undocumented outside developer specs. |
| **Unique first-hand value** | Yoast writes a **physical file** to the web root via `get_home_path()` and refreshes it on a **weekly scheduled action, not on publish**; caps at **five most-recent items per content type** (12-month window, cornerstone first); **will not overwrite an existing llms.txt**; ~5-minute 404 window after activation; custom post types need "Show in search results". Plus: physical file sits outside WP cache purging. |
| **Tone check** | Not an anti-WordPress pitch — the guide explicitly says the plugin route is reasonable for most sites. |
| **Links in** | `/tools`, generator, `/answer-engine-optimization`, 2 siblings |
| **Links out** | Generator, `/website-redesign`, AEO, siblings, founder |
| **Commercial destination** | `/answer-engine-optimization` |
| **Indexable** | Yes · **Canonical** self · **Schema** Article + BreadcrumbList |
| **Last verified** | 2026-08-14 · 3 primary + 1 secondary source |
| **Quality gate** | ✅ Pass — 5 steps, 6 gotchas, 3 verification steps, 4 limitations |

---

## A. URLs created (4)
`/tools` · `/tools/llms-txt/shopify` · `/tools/llms-txt/nextjs` · `/tools/llms-txt/wordpress`

## B. URLs improved (3 in code)
- `/tools/llms-txt-generator` — methodology, limitations, security handling, guide links, breadcrumb, author attribution, fixed an internal link that pointed at a redirect (`/technical-seo`)
- `/answer-engine-optimization` — contextual paragraph into the tool + 3 guides; related-links block extended
- `/stillawake-times/what-is-generative-engine-optimization` — **markdown updated but not live** (see §N)

## C. URLs merged (1)
`/stillawake-times/what-is-aeo-answer-engine-optimization` → `/stillawake-times/what-is-generative-engine-optimization`

Rationale: the retired article competed with **both** the `/answer-engine-optimization` service page (same head term, commercial intent) and the GEO guide (same informational intent, published the same day). The service page keeps commercial AEO; the GEO guide — longer, with a first-hand playbook — takes informational intent for all three terms. Merged in: the AEO definition, the SEO-vs-AEO framing, the FAQ-schema warning, and the 5-question self-audit.

## D. Redirects created (1)
One permanent redirect, single hop, no chain. Verified: `308 → /stillawake-times/what-is-generative-engine-optimization`, target `200`.

## E. Internal links added
- Footer → `/tools` (sitewide, both root layouts)
- `/answer-engine-optimization` → generator ×2, + 3 guides, + related block
- `/tools` → generator + 3 guides + AEO
- Generator → 3 guides, `/tools`, founder, `/llms.txt`
- Each guide → generator, `/tools`, 2 siblings, its commercial page, AEO, founder
- 2 articles → generator + guides *(markdown only — not live, see §N)*

**Generator inbound internal links: 0 → 5 source files** (plus sitewide footer path via `/tools`).

## F. Orphan pages remaining
None in this cluster. Every new URL has ≥2 contextual inbound links plus breadcrumbs.

## G. Sitemap changes
- Added `/tools`, `/tools/llms-txt-generator` (lastmod refreshed), and the 3 guides
- Guides are emitted from `publishedGuides()` — the **same gate** the router uses, so a draft or failing record can never be listed
- **Systemic fix:** the sitemap now filters every entry against the redirect table. It was advertising the retired AEO URL because a CMS row outlived the markdown file. Verified: **all 138 sitemap URLs return 200, none redirect.**

## H. Schema changes
- New `InlinePageSchema` for build-time routes (the registry is keyed by literal route and cannot describe `[platform]`)
- `/tools` registered as CollectionPage; generator gained a `/tools` breadcrumb
- Guides emit Article + BreadcrumbList, `dateModified` = verified date
- Verified: **3 valid JSON-LD blocks per page, all parse**
- No FAQ schema added — not semantically justified here

## I. hreflang changes
None to existing pairs. New pages declare `en-CA` + `x-default` only, matching the site's documented rule that a page with no FR counterpart gets no `fr-CA` alternate. **No EN/FR cross-canonicalization introduced.**

## J. Programmatic architecture created
- `src/lib/llms-txt-guides/types.ts` — record type + `validateGuide()` + `isPublishable()`
- `src/data/llms-txt-guides/{index,shopify,nextjs,wordpress}.ts`
- `src/app/(en)/tools/llms-txt/[platform]/page.tsx` — `generateStaticParams` from published set, `dynamicParams = false`
- `src/components/tools/platform-guide.tsx` — server-only renderer, no highlighting library

**The gate, enforced mechanically:** minimum 3 steps (each ≥90 chars of real explanation), 2 gotchas, 2 verification steps, 2 limitations, 1 prerequisite, a ≥120-char example, an ISO `verifiedDate`, and ≥1 **primary** source. Plus a distinctiveness suite that fails if two guides share >15% of their long sentences, if a guide names its platform fewer than 3 times in its substance, or if two guides share a file location, mechanism or example.

Verified by test: a complete-but-unverified record is unpublishable; a verified-but-thin record is unpublishable; `/tools/llms-txt/wix` returns **404**.

## K. Platform pages deliberately NOT published
**Webflow, Framer, Squarespace** — the engine supports them; the evidence does not exist yet. To publish each I need, from primary documentation: whether the platform serves `/llms.txt` natively today, the exact mechanism (custom-code injection, hosted file, reverse proxy, or unsupported), platform restrictions on serving plain text at a root path, publishing/CDN cache behaviour, and a working verification procedure. None of that was checked this wave, and Squarespace/Framer in particular may not permit arbitrary root paths at all — which would make "how to add llms.txt" the wrong page to write.

**Wix, Ghost, Astro, Drupal, BigCommerce, WooCommerce, Magento, HubSpot, Sanity, Contentful** — not researched. Not in the registry.

The engine existing is not authorization to publish.

## L. Tests
**138 passing across 7 files** (was 131/6). New:
- `src/lib/llms-txt-guides/guides.test.ts` — 22 tests: schema, publishability, thin/draft rejection, boilerplate ratio, platform-name density, unique file location/mechanism/example, unique titles/descriptions/keywords, route resolution + traversal safety, related-service links resolve to real `page.tsx` files, cross-links only to published guides, no future verified dates
- `src/data/redirects.test.ts` — 7 tests: no duplicate sources, **no chains**, no self-redirects, absolute paths, all permanent, no guide route is a redirect source, the AEO merge target is correct
- `src/lib/page-schema.test.ts` — registry count 20 → 21 (deliberate guard, updated consciously)

## M. Build result
`next build` ✅ — 146 static pages. All 3 guides prerender as SSG; `/tools` and the generator are static.

## N. Remaining SEO risks

1. **⚠️ Three live articles link to the retired URL.** Articles are served **CMS-first** from Supabase, so the markdown edits are dormant. `what-is-generative-engine-optimization`, `can-chatgpt-recommend-my-business` and `how-much-does-seo-cost-canada` still render `href="/stillawake-times/what-is-aeo-answer-engine-optimization"`, which now 301s. **Not search-critical** (the redirect resolves, the sitemap no longer lists it, cannibalization is resolved) but it costs a hop and looks unmaintained. **You asked to apply this yourself — checklist below.**
2. **The content merge is not live.** The AEO definition, SEO-vs-AEO framing, FAQ-schema warning and self-audit exist in the markdown file only. The live GEO article is unchanged.
3. **Pre-existing:** `sitemap.xml` logs `Failed to set Next.js data cache for unstable_cache — items over 2MB (3.29 MB)`. The CMS sitemap query exceeds the data-cache limit, so it re-fetches every build. Not introduced here; worth a look when you next touch the CMS adapter.
4. **Pre-existing:** one lint warning, `src/app/(en)/page.tsx` — `'services' is defined but never used`. File untouched by this wave; left alone deliberately.
5. **Volume honesty:** `llms txt nextjs`, `llms txt shopify`, `llms txt framer/squarespace` are 10–20/mo. These are entry-ladder and link-earning plays, not traffic plays. `llms txt wordpress` (390) and `llms txt generator` (480) carry the measurable demand.
6. **No French yet.** Locale architecture is ready (`locale` on the record, `publishedGuides(locale)`), but no FR guide is written and the tool UI is English-only.

## O. Recommended Wave 2

1. **Apply the CMS updates** (checklist below) — closes the only open defect.
2. **Research Webflow / Framer / Squarespace** against primary docs. Publish only those that clear the gate; expect at least one to turn out unsupported, which is itself a publishable answer.
3. **French cluster.** Needs: a localized tool UI, and FR guides written for Québec French. Target `seo ia` (170/mo CA-FR) and `référencement ia`; do **not** literal-translate "llms txt generator". Mirror at `/fr/outils/generateur-llms-txt` → `/fr/referencement-ia`.
4. **The link asset.** The aggregate, anonymised AI-readiness study from the strategy doc §21 — the highest-value item available, and the analyser already exists to generate it.
5. **Measure before publishing more.** Wave 3 scope should be decided from Search Console, not from the engine's capacity.

---

## Your CMS checklist

Three published rows in `cms_content_items`, all `type='article'`, `locale='en'`. Backup the body of each before editing.

**1. `what-is-generative-engine-optimization`** *(the surviving canonical explainer)*
- Retitle to: `Generative Engine Optimization (GEO) and AEO: The Complete Guide`
- Replace the sentence ending `…We cover the answer-engine layer separately in [What is AEO?](/stillawake-times/what-is-aeo-answer-engine-optimization)` — delete that link and paste in the new `### What is AEO, specifically?` block
- Add the `## A quick self-audit` section and the two extra `What doesn't work` bullets (FAQ schema, question-phrase stuffing)
- In `## Where to start`, add the paragraph linking `/tools/llms-txt-generator` and the three guides

> All four edits are ready to copy verbatim from `src/content/stillawake-times/what-is-generative-engine-optimization.md` in this repo — the markdown file is now the corrected version.

**2. `can-chatgpt-recommend-my-business`**
- Replace `[What is AEO?](/stillawake-times/what-is-aeo-answer-engine-optimization)` → `[GEO and AEO guide](/stillawake-times/what-is-generative-engine-optimization)`
- Optional: append the tool + guide links to the **Machine-readable summaries** paragraph (see the markdown file)

**3. `how-much-does-seo-cost-canada`**
- Change the `[AEO](…)` link target to `/stillawake-times/what-is-generative-engine-optimization`

**4. Retired row**
- Set `what-is-aeo-answer-engine-optimization` to unpublished/archived. The URL already 301s and is out of the sitemap, so this is tidiness — but leaving a published row for a redirected URL will keep confusing future audits.

After applying, re-run: `curl -s https://stillawakemedia.com/stillawake-times/what-is-generative-engine-optimization | grep -c what-is-aeo` → expect `0`.

---

## What this wave does and does not claim

Wave 1 built the architecture and published the first evidence-backed cluster. It has **not** fixed SEO, earned topical authority, or made anything rank. Those claims can only come from Search Console.

Watch, from the baselines in `SEO-ENTRY-STRATEGY-2026-08-14.md` §24: pages with ≥1 impression (26/132 today), distinct non-brand queries (15), `/tools/*` impressions (0), and generator usage. Wave 3 scope should follow that evidence.
