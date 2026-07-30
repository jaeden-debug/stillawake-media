# StillAwake Media — Digital Products Store + Programmatic SEO Engine
## Master Audit, Commerce Architecture, Content Pipeline & 20-Page Launch Plan

**Status:** Phase 1 (Audit) + Phase 2 (Architecture & Preparation) — COMPLETE
**Date:** 2026-07-29
**Production changes made:** NONE (see §28)
**Scope of inspection:** `stillawakemedia.com` repo @ `main` (d31c591), live production HTML, live DNS, Shopify Admin API, Semrush keyword data

---

## 1. Executive Summary

The content engine is **real and substantial** — 41 long-form markdown articles, a working static pipeline on Next.js 16 App Router, deployed on Vercel, with a redirect map already in place. That is a genuine asset and should not be replaced.

But three findings block the commerce expansion, and one of them is actively damaging the site right now.

**Blocker 1 — CRITICAL, live, site-wide: every page without its own canonical tag points to a domain that does not exist.**
`src/app/layout.tsx:72` sets `alternates.canonical: "https://stillawakedmedia.com"` — note the stray `d` in `stillawake**d**media`. Next.js metadata inheritance propagates this to every route that doesn't override it. Verified in production HTML: `/`, `/about`, `/services`, `/contact` all serve `<link rel="canonical" href="https://stillawakedmedia.com"/>`. That domain has **no DNS record at all**. Three more pages (`/branding`, `/software-development`, `/ai-automation`) carry the same typo in their own canonicals. This tells Google the authoritative version of the homepage is an unreachable host. Nothing else in this document matters until this is fixed.

**Blocker 2 — The StillAwake store does not exist.** `shop.stillawakemedia.com` has no DNS record. The Shopify Admin API connection available to this project resolves to **Blackwater Aquatics Canada** (`blackwateraquatics.ca`, Basic plan, CAD) — an unrelated business. Therefore **no StillAwake plan, theme, digital-delivery, or checkout capability could be audited**, because none exists yet. Every Shopify requirement in §9 is written as a *specification to verify on creation*, not as an audited finding. This is the single largest gap between the brief's assumptions and reality.

**Blocker 3 — The publishing pipeline has no quality gate, and it shows.** Any `.md` file dropped into `src/content/stillawake-times/` is live on the next deploy. There is no draft state, no `noindex` state, no reviewer field, no `dateModified`, and no cannibalization check. The consequences are already visible in production: two route/article intent collisions, 41 articles sharing a single featured image, 12 inconsistent categories with no category pages, zero `Article` schema across the entire library, and `readTime` values overstated by 300–500%. Pushing 20 programmatic pages through this pipeline as-is would multiply existing defects, not add authority.

**The evidence also reorders the plan.** Real Semrush volumes (§16) show the brief's four clusters are not comparable in value:

| Cluster | Validated monthly US volume | Verdict |
|---|---|---|
| Email signatures | ~34,000 across 15 terms, KD 15–61 | **Fund first.** Real demand, low-KD industry tail, high commercial intent |
| Business templates | ~40,000 across 9 terms, KD 10–66 | **Fund first.** `notion templates` 22,200 (commercial intent), `sop template` 6,600 @ KD 36 |
| AI skills & prompts | One KD-75 head term + a tiny tail (20–260/mo) | **Brand/AEO play, not revenue.** Do not fund 5 pages |
| Shopify components | **~290/mo total across all 5 terms** | **Do not fund 5 pages.** Consolidate to 1 |

The brief allocates 25% of the launch (5 of 20 pages) to Shopify components, a cluster with under 300 monthly searches in total. It allocates another 25% to an AI cluster whose only large term (`claude skills`, 22,200) has KD 75 and is dominated by Anthropic's own documentation. Meanwhile `notion templates` (22,200, commercial intent, KD 40) has no page at all in the plan.

**Recommended next implementation step:** fix the canonical typo and the `readTime` inaccuracy (both are live defects, both are ~1 hour of work, neither requires any commerce decision), then upgrade the frontmatter schema and add a publish gate — *before* creating a single product or page. See §26.

---

## 2. Current StillAwake Media Site Architecture

| Layer | Finding | Evidence |
|---|---|---|
| Framework | Next.js **16.2.6**, App Router, React 19 | `node_modules/next/package.json`, `src/app/` |
| Language | TypeScript, strict-ish; path alias `@/*` | `tsconfig.json` |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` | `postcss.config.mjs`, `src/app/globals.css` |
| Rendering | Fully static. Articles pre-rendered via `generateStaticParams` | `src/app/stillawake-times/[slug]/page.tsx:11` |
| CMS | **None.** File-based markdown + `gray-matter` + `remark` | `src/lib/content.ts` |
| Database | **None** | — |
| Hosting | Vercel (`.vercel/` present); apex resolves `216.198.79.1` | DNS |
| Analytics | **Ahrefs Web Analytics only.** No GA4, no gtag | `src/app/layout.tsx:153-157`; grep for GA4 returned nothing |
| Forms | Single contact form → `/api/contact` → Resend | `src/app/api/contact/route.ts` |
| Sitemap | Dynamic, 57 URLs (16 static + 41 articles) | `src/app/sitemap.ts`; verified live |
| robots.txt | `Allow: /`, sitemap declared. Minified to one line | `src/app/robots.ts` |
| Redirects | 10 permanent redirects | `next.config.mjs` |
| i18n | **No i18n config.** One hand-built FR route | `src/app/fr/agence-web-montreal/` |
| Search | None | — |
| Commerce | **None whatsoever** — no cart, product model, or payment | — |

### Route inventory (17 routes)

`/` · `/about` · `/portfolio` · `/work` · `/services` · `/contact` · `/branding` · `/local-seo` · `/ai-automation` · `/framer-development` · `/shopify-development` · `/software-development` · `/web-design-montreal` · `/seo-montreal` · `/fr/agence-web-montreal` · `/stillawake-times` · `/stillawake-times/[slug]` (41)

### Two Next config files — latent hazard

Both `next.config.mjs` (contains the 10 redirects) and `next.config.ts` (empty stub) exist. Next 16's resolution order is `next.config.js` → `next.config.mjs` → `next.config.ts` (`node_modules/next/dist/shared/lib/constants.js:359`), so **`.mjs` wins and the redirects are live.** Verified. But the empty `.ts` stub is a live landmine: any future tooling or contributor that removes or renames the `.mjs` silently drops all 10 redirects. **Delete `next.config.ts`.**

---

## 3. Current Brand Positioning

**What the site currently is:** a premium Montreal web-design and digital agency selling done-for-you services.

- Root title: *"StillAwake Media | Web Design, SEO, AI & Software"*
- Slogan: *"Ambition Never Sleeps."*
- Schema declares `ProfessionalService`, `areaServed: ["Montreal", "Quebec", "Canada"]`, `addressLocality: "Montreal"` (`layout.tsx:112-136`)
- Root `keywords` are agency/local: *web design Montreal, SEO Montreal, digital agency Canada*
- Nav is service-led; a dedicated `montrealNav` block exists in `src/lib/data.ts`
- Visual identity: dark theme, red `#D71920` accent, Geist + Inter, glassmorphism, hero video
- Every CTA on every article is the same: **"Get a Free Audit →"** to `/contact`

**Entity gap — the core strategic tension.** The current entity is *local, service-based, high-touch, Montreal*. The planned store is *global, product-based, self-serve, transactional*. These are not adjacent. Adding six top-level product category routes to an agency site risks diluting the local-service entity that currently earns the rankings, while the product entity is too new to carry itself.

**This drives the §10 recommendation:** nest all commerce content under one `/digital-products/` hub rather than scattering six new top-level routes. One coherent new entity node, cleanly bounded, is defensible. Six competing ones dilute both identities.

**Trust signals present:** portfolio/work pages, `LiveWorkShowcase`, `PortfolioBrowser`, About page.
**Trust signals absent and required for product commerce:** named author entity (all 41 articles are authored by the string `"StillAwake Media"` — no person, no bio, no credentials), reviews, refund/licensing policy, pricing transparency.

---

## 4. Technical SEO Audit

Severity: **P0** = fix before anything else · **P1** = fix before publishing new pages · **P2** = fix during build-out

| # | Sev | Finding | Location | Evidence |
|---|---|---|---|---|
| 1 | **P0** | Site-wide canonical → non-existent domain `stillawakedmedia.com` | `layout.tsx:72` | Live HTML on `/`, `/about`, `/services`, `/contact`. `dig` returns nothing |
| 2 | **P0** | Same typo in 3 page-level canonicals | `branding:12`, `software-development:10`, `ai-automation:12` | grep + live HTML |
| 3 | **P1** | `readTime` overstated 300–500%; user-facing false claim | all 41 `.md` | `seo-montreal` claims *44 min*, is 1,876 words (~8 min). `agence-web-montreal` claims *41 min*, is 1,559 words (~7 min) |
| 4 | **P1** | **Zero `Article`/`BlogPosting` schema** on all 41 articles | `[slug]/page.tsx` | No `@type: Article` anywhere in `src/app` |
| 5 | **P1** | **No `dateModified`** anywhere on the site | — | grep returned nothing |
| 6 | **P1** | Two route↔article intent collisions (cannibalization) | see §4a | `/seo-montreal` vs `/stillawake-times/seo-montreal`; `/web-design-montreal` vs `/stillawake-times/web-design-montreal` |
| 7 | **P1** | All 41 articles share **one** featured image | all `.md` | 41/41 = `best-website-design-for-small-businesses-2026-featured-image.jpg` |
| 8 | **P1** | All 41 articles share **one** OG image, hardcoded | `[slug]/page.tsx:32` | `post.image` is never used by the article template |
| 9 | **P1** | 12 categories, no category pages → orphan taxonomy | `src/lib/content.ts:128` | `getCategories()` exists; no route consumes it |
| 10 | **P1** | Category taxonomy internally inconsistent | frontmatter | `"AI Automation"` **and** `"AI & Automation"`; `"Technical SEO"` / `"Local SEO"` / `"SEO Strategy"` overlap. 19 of 41 dumped in `"Web Design"` |
| 11 | **P2** | Static sitemap entries claim `lastModified: new Date()` — every page looks edited on every deploy | `sitemap.ts:8` | False freshness signal |
| 12 | **P2** | No `BlogPosting`/`FAQPage`/`BreadcrumbList` on articles; FAQ+breadcrumb schema exists on only 2 service pages | grep | `web-design-montreal`, `fr/agence-web-montreal` only |
| 13 | **P2** | `remark-html` runs with `sanitize: false` | `content.ts:103` | Acceptable for hand-authored first-party MD; **becomes an injection vector the moment content is generated from data** |
| 14 | **P2** | No GA4 → cross-domain commerce attribution impossible | `layout.tsx` | `@next/third-parties` is installed but unused |
| 15 | **P2** | Contact email sends from `onboarding@resend.dev` sandbox sender | `api/contact/route.ts:28` | Deliverability + brand risk for transactional commerce mail |
| 16 | **P2** | `robots.ts` minified to a single unreadable line | `robots.ts:1` | Maintainability |
| 17 | **P2** | Dead `next.config.ts` stub shadowing the real config | root | §2 |
| 18 | **P2** | Duplicate `Footer` export; `site.tsx` version is dead code | `site.tsx:129` vs `footer.tsx:25` | Layout imports from `footer.tsx` |
| 19 | **P2** | `InternalLinks` appends the same generic nav block to all 41 articles | `site.tsx:141` | Not contextual linking — sitewide boilerplate |
| 20 | **P2** | Legacy `/images/blog/` path guard for a directory that doesn't exist | `stillawake-times/page.tsx:36` | Dead branch |
| 21 | **P2** | Uncommitted regression in working tree: `branding` meta description truncated mid-word to `"...help moder"` | `git diff` | Not yet live. **Do not commit as-is** |

### 4a. Cannibalization already in production

| Intent | Page A (service route) | Page B (article) | Consequence |
|---|---|---|---|
| "seo montreal" | `/seo-montreal` | `/stillawake-times/seo-montreal` | Two pages, one intent, both indexed, both in sitemap |
| "web design montreal" | `/web-design-montreal` | `/stillawake-times/web-design-montreal` | Same |

Both article versions are *also* linked from `montrealNav` in `src/lib/data.ts`, so the site actively distributes link equity to both competitors for the same query. This is the proof that the pipeline has no intent-ownership gate — and the reason §18 requires one before scaling.

### 4b. What is genuinely healthy

- Static pre-rendering: no JS-rendering risk for crawlers or AI agents
- `robots.txt` clean and permissive; AI crawlers unblocked
- Sitemap dynamically includes all 41 articles automatically
- `metadataBase` correctly set, so relative canonicals resolve properly — this is why article canonicals are **correct** while page canonicals are broken
- Redirect map exists with no chains or loops detected
- Article canonicals verified correct in production: `/stillawake-times/what-is-technical-seo` → `https://stillawakemedia.com/stillawake-times/what-is-technical-seo`
- Organization / WebSite / ProfessionalService schema present sitewide
- Hero media already compressed (242 KB and 410 KB MP4s with poster images)

---

## 5. Content Audit

**Volume:** 41 articles, ~1.05 MB markdown. Median ~26 KB (~4,000 words). Genuinely long-form and, on inspection, substantive rather than padded.

**Quality:** high. `what-is-technical-seo.md` (3,888 words) and `shopify-seo-guide.md` are credible practitioner content with real FAQ blocks and internal links. This library is the strongest asset in the project.

**Topical coverage:** web design (19), software development (5), local SEO (5), performance (2), Shopify (2), branding (2), plus singles.

**Gaps relative to the store:** zero coverage of email signatures, AI skills/prompts as products, digital templates, licensing, or "how to install X". Every existing article funnels to a *service* CTA. There is no product-shaped content and no product-shaped CTA component.

**Structural weaknesses:**
- No unique imagery — 41 articles, 1 image
- 12 inconsistent categories, no category pages
- `InternalLinks` boilerplate on every article instead of contextual links
- Single hardcoded CTA (`Get a Free Audit → /contact`) with no per-article override
- Author is a string, never an entity
- No `dateModified`, no reviewer, no evidence/sources field

**Freshness:** all 41 dated 2026-05-24/25 with no modification tracking. The library will look uniformly stale within months and there is no mechanism to signal updates.

---

## 6. StillAwake Times Pipeline Map

```
Author writes .md by hand
        ↓
src/content/stillawake-times/<slug>.md      ← slug IS the filename; no slug field
        ↓
gray-matter parses 8 frontmatter fields     ← title date excerpt category featured image readTime author
        ↓
remark + remark-html  (sanitize: false)
addHeadingIds() injects <span id> anchors
extractToc() builds the Article Map sidebar
estimateReadTime() — DEFINED BUT BYPASSED whenever frontmatter sets readTime (all 41 do)
        ↓
generateStaticParams() pre-renders every file found on disk
        ↓
sitemap.ts auto-includes every file found on disk
        ↓
git commit → push → Vercel build → LIVE
```

**There is no gate anywhere in that chain.** File on disk == published, indexed, and in the sitemap. `estimateReadTime()` at `content.ts:69` would have produced correct values, but every article overrides it with a wrong hand-written number — which is exactly how the 300–500% overstatement got live.

---

## 7. StillAwake Times Gaps

| Capability | Present? | Consequence for programmatic SEO |
|---|---|---|
| Draft / editorial state | **No** | Cannot stage a page. Commit = publish |
| `noindex` state | **No** | Cannot hold a failing page back from the index |
| Per-page canonical override | **No** | Cannot resolve cannibalization declaratively |
| `dateModified` / `updated` | **No** | No freshness signal; AEO penalty |
| Author as entity | **No** | String only. No E-E-A-T surface |
| Reviewer / approver | **No** | No editorial accountability |
| Primary keyword / intent field | **No** | No machine-checkable intent ownership → no cannibalization gate |
| Product mapping | **No** | No content→commerce join |
| Per-page CTA config | **No** | One hardcoded services CTA for all pages |
| Category pages | **No** | Taxonomy exists but is unreachable |
| Contextual internal links | **No** | Generic nav block only |
| `Article`/`FAQ`/`Breadcrumb` schema | **No** | Library is structurally invisible to answer engines |
| Unique OG image per page | **No** | Hardcoded single image |
| Duplicate/cannibalization detection | **No** | Already failing — see §4a |
| Quality scoring | **No** | No publish criteria |
| Version history | Git only | Adequate |
| Page retirement / pruning | **No** | Deleting a file 404s with no redirect |
| Performance tracking per page | **No** | Ahrefs only, no GA4, no per-page conversion data |

---

## 8. Programmatic SEO Readiness

**Verdict: NOT READY. Do not publish the 20 pages against the current pipeline.**

The pipeline can *render* 20 or 200 pages without difficulty — static generation and the auto-sitemap scale fine. That is not the constraint. The constraint is that it has **no mechanism to prevent a bad page from going live**, and the two existing cannibalization collisions plus the false `readTime` values prove that failure mode is active, not theoretical.

Required before page 1 ships (detail in §18):

1. Extend frontmatter to the full schema (§18a)
2. Add `status: draft|review|published` — only `published` renders, sitemaps, and indexes
3. Add `noindex` support wired to the metadata `robots` field
4. Add `primaryKeyword` + a build-time uniqueness assertion → **fails the build on collision**
5. Emit `Article` + `FAQPage` + `BreadcrumbList` JSON-LD from frontmatter
6. Add `dateModified`
7. Make the CTA a component driven by frontmatter, not hardcoded markup
8. Real per-page OG images
9. Build category/hub routes so the taxonomy is reachable
10. Fix the P0 canonical bug — a new page inheriting a broken canonical is worse than no page

---

## 9. Shopify Capability Findings

**This section could not be audited. It is a specification, not a finding.**

| Question | Status |
|---|---|
| Does `shop.stillawakemedia.com` exist? | **No.** No DNS record |
| Is a StillAwake Shopify store connected? | **No.** The connected store is Blackwater Aquatics Canada (Basic, CAD) — unrelated |
| StillAwake plan / theme / delivery / checkout capability | **UNKNOWN — store does not exist** |

Do not infer StillAwake's capabilities from the Blackwater store. Different business, different plan instance, irrelevant to this program.

### 9a. Verify these on store creation, before designing around any of them

**Likely available on Basic (verify at signup — Shopify changes plan tiers):** custom domain/subdomain, collections, products with variants, blogs and pages, app installs, customer accounts, Shopify-hosted checkout, abandoned-checkout email, basic analytics, automatic tax, discount codes, `Product` schema from theme, auto sitemap and canonicals.

**Likely NOT available on Basic — confirm before promising:** checkout extensibility / Shopify Functions, `checkout.liquid` customization, scripts, B2B, advanced report builder, third-party calculated shipping, more than the base staff-account count.

**Digital delivery is not native.** Shopify does not deliver files out of the box. Requires an app — *Shopify Digital Downloads* (free, first-party, adequate for simple ZIP/PDF delivery) or a paid alternative (SendOwl, Fetch) if licence keys, download caps, or PDF stamping are needed. **Decide this before pricing anything.**

**Custom-service products** need: `requiresShipping: false`, no inventory tracking, line-item properties or a post-purchase intake form, and a stated turnaround. Deposit-style products need either a partial-payment app or a plain "deposit" product + manual invoice.

**Tax:** digital goods and services have destination-specific rules (Canadian GST/HST/QST, EU VAT, US economic nexus). Enable Shopify's automatic tax and get an accountant's confirmation for digital-goods treatment in Quebec specifically. **Do not treat this document as tax advice.**

### 9b. Product metafield schema to define at creation

`format` · `compatiblePlatforms` · `fileTypes` · `licence` (personal / commercial / extended) · `version` · `updatePolicy` · `supportLevel` · `installDifficulty` · `customisationAvailable` · `instantDelivery` · `previewUrl` · `demoUrl` · `docsUrl` · `relatedProducts` · `customUpgradeHandle` · `authorityPageUrl` (the canonical main-site page for this product)

`authorityPageUrl` is the join key for the entire content→commerce model in §17. Define it on day one.

---

## 10. Recommended Main-Site / Store Architecture

**Content ownership: hybrid, weighted decisively to the main site.**

The main site has Next.js flexibility, an existing article library, established rankings, and full control over schema and canonicals. Shopify Basic has none of that. So:

| Main site (`stillawakemedia.com`) — canonical owner | Shopify (`shop.stillawakemedia.com`) |
|---|---|
| All category authority pages | Product pages |
| All educational / comparison / how-to content | Collections (purchase-focused, thin by design) |
| All 20 programmatic pages | Cart + checkout + digital delivery |
| Industry and use-case pages | Store policies (refund, licence, support) |
| Custom-service sales pages + intake | Order management |
| StillAwake Times | — |

**Rule: never publish the same content on both domains.** Shopify collection descriptions stay 1–2 sentences and link *up* to the main-site authority page. The main-site page is always the canonical owner of the informational intent; the Shopify product page owns only the transactional intent for that specific SKU.

### 10a. Recommended URL structure — one hub, not six top-level routes

The brief suggests `/email-signatures`, `/ai-skills`, `/shopify`, `/business-templates`, `/digital-products`, `/custom-services` as siblings at root. **I recommend nesting them under a single hub instead:**

```
/digital-products                                   ← category hub (brief's page 20)
/digital-products/email-signatures                  ← cluster hub
/digital-products/email-signatures/<page>
/digital-products/ai-skills
/digital-products/ai-skills/<page>
/digital-products/shopify-sections
/digital-products/shopify-sections/<page>
/digital-products/business-templates
/digital-products/business-templates/<page>
/custom-services                                    ← stays top-level: it is a service, not a product
/custom-services/<service>
```

Three concrete reasons, all grounded in what's in the repo:

1. **`/shopify` would collide with the existing `/shopify-development` service page.** That's a third cannibalization pair added on purpose, on top of the two already broken in §4a.
2. **Entity containment.** §3 established the live entity is a Montreal service agency. Six new top-level product routes dilute it. One bounded hub adds a clean child node instead.
3. **Link equity concentration.** One hub is linkable from primary nav and can absorb and redistribute equity. Six top-level routes compete for the same finite nav slots and internal links.

**Tradeoff, stated honestly:** URLs are longer and pages sit one click deeper. Given the site is 57 URLs — nowhere near a crawl-budget problem — depth costs nothing here and the structural clarity is worth more.

`/custom-services` stays top-level deliberately: it is the highest-margin offer and it is a *service*, which matches the existing entity rather than diluting it.

---

## 11. Product Taxonomy

```
DIGITAL PRODUCTS
├── Email & Business Identity        ← FUND FIRST (validated demand)
│   ├── HTML signature kits · Gmail · Outlook · Apple Mail
│   ├── Team / multi-seat packs
│   └── Industry variants (real estate, agency, consultant, trades, travel)
├── Business Operations Templates    ← FUND FIRST (validated demand)
│   ├── SOP systems · client onboarding · proposals
│   ├── Notion operating systems      ← largest single untapped term (22,200/mo)
│   └── Content / marketing calendars
├── AI Skills & Prompt Systems       ← FUND AS BRAND/AEO, not near-term revenue
│   ├── Claude Skills · ChatGPT prompt packs
│   └── SEO / Google Ads prompt systems
├── Shopify & Ecommerce Components   ← FUND MINIMALLY (~290/mo total demand)
│   └── Sections (FAQ, testimonial, hero, mega menu) — one page, not five
├── Developer & UI Assets            ← DEFER (KD 77, no commercial signal)
└── Creator & Branding Assets        ← DEFER pending a separate decision (see §23)

CUSTOM SERVICES  (one per product category, always the margin play)
```

**Product type taxonomy** — the store must distinguish these clearly, because refund policy and delivery differ per type:
`instant-download` · `configurable-template` · `licensed-code` · `custom-service` · `implementation-addon` · `consultation`

---

## 12. Initial Catalogue Recommendation

Prices are **recommendations in CAD, not validated by any market research.** Treat as starting hypotheses to test.

**Wave 1 — launch (6 products).** Deliberately small. Every one maps to a validated keyword cluster and a page in the launch plan.

| # | Product | Type | Price (CAD, rec.) | Effort | Support | Landing page |
|---|---|---|---|---|---|---|
| 1 | Business HTML Email Signature Kit (6 layouts) | instant-download | $39 | Med | Low | `/digital-products/email-signatures/html-email-signature-templates-small-business` |
| 2 | Gmail Signature Kit | instant-download | $24 | Low | Med* | `.../gmail-signature-templates` |
| 3 | Outlook Signature Kit | instant-download | $24 | Low | Med* | `.../outlook-signature-templates` |
| 4 | Custom Email Signature Service | custom-service | $149–$399 | Per job | High | `.../custom-business-email-signatures` |
| 5 | SOP Starter Pack | instant-download | $49 | Med | Low | `/digital-products/business-templates/sop-templates-small-business` |
| 6 | Agency Client Onboarding Pack | instant-download | $69 | Med | Low | `.../client-onboarding-templates-agencies` |

\* Signature support burden is genuinely high — email-client rendering is the single most common refund driver in this category. Ship a real installation guide per client and a documented compatibility table, or margin evaporates in support time.

**Wave 2 — after Wave 1 validates (4):** Notion Business OS ($79) · Content Calendar System ($39) · Claude SEO Skill ($59) · ChatGPT Small Business Prompt Pack ($29)

**Wave 3 — only if the Shopify cluster shows any traffic (3):** Shopify FAQ Section ($29) · Testimonial Section ($29) · Conversion Hero Section ($39)

**Deferred:** Tailwind Business UI Pack (KD 77, CPC $0 — no monetisation signal). Creator/adult-platform assets — see §23.

**Cut from the brief's suggested 15:** launching 15 products at once across 6 categories with no validated demand and a solo support model is how a store ends up with 15 zero-sale SKUs. Six is enough to prove the model.

---

## 13. Custom-Service Model

The real business here. Templates are the top of funnel; customisation is the margin.

Three tiers, consistently presented on every category page:

| Tier | What it is | Price posture | Delivery |
|---|---|---|---|
| **Ready-made** | Buy the template, install yourself | Fixed, listed | Instant download |
| **Customised** | StillAwake adapts the template to your brand and installs it | Fixed range, listed | 3–5 business days |
| **Fully custom** | Built from scratch to spec | Quote only | Scoped |

Standard CTA copy (do not overclaim): *"Need this adapted to your brand, workflow, or platform? StillAwake can customise and install it."*

Requirements: published turnaround per tier, a structured intake form (not the generic contact form), a revision limit stated up front, and an explicit statement of what is *not* included. Custom work sold without a revision cap is the fastest route to unprofitable jobs.

---

## 14. Conversion Architecture

Consistent hierarchy on every commercial page:

1. **PRIMARY** — Buy the ready-made product → Shopify product page
2. **SECONDARY** — Customise this product → `/custom-services/...`
3. **TERTIARY** — Ask a question → intake form

**Permitted:** direct product links, Buy Now, real previews and demos, honest compatibility tables, installation guides, transparent licensing, bundles, contextual related products, clear refund and support terms.

**Prohibited, and worth stating explicitly because the site already has one accuracy problem (§4 #3):** fake urgency, fabricated inventory or scarcity, invented reviews or customer counts, unverified savings, guaranteed results, misleading "free" claims.

**Digital-goods refund policy needs deciding before launch.** Instant downloads cannot be "returned". Pick one and publish it: (a) no refunds after download, stated plainly pre-purchase; (b) discretionary refund window; (c) refunds only on demonstrated technical failure. Option (c) is the fairest and most defensible for signature products, where rendering issues are the real risk.

---

## 15. Cross-Domain Tracking Plan

**Current state: no GA4 at all.** `@next/third-parties` is installed but unused. Ahrefs Web Analytics cannot do cross-domain e-commerce attribution. Article-assisted conversion is currently unmeasurable — meaning there is no way to prove the content engine drives revenue.

Required build:

1. Install GA4 on `stillawakemedia.com` (`@next/third-parties/google` → `<GoogleAnalytics gaId>`); it is already a dependency
2. Same GA4 property on the Shopify store
3. Configure **cross-domain measurement** listing both hostnames — without this, every shop transition creates a new session and attribution dies
4. Add `shop.stillawakemedia.com` to **referral exclusions**
5. Verify `shop.` as a separate Search Console property (subdomains are separate properties)
6. Submit both sitemaps
7. Consent handling appropriate to CA/EU traffic

**Events to define:** `article_view` · `category_click` · `product_click` · `shop_transition` · `buy_now_click` · `add_to_cart` · `begin_checkout` · `purchase` · `customization_click` · `contact_submit` · `product_download` · `repeat_purchase`

Tag every main-site → shop link with UTMs identifying the source page, so `article-assisted conversion` becomes measurable per URL. That single measurement is what tells you whether to keep funding the content engine.

---

## 16. SEO / AEO Strategy — with validated data

**Source:** Semrush `phrase_these`, US database, retrieved 2026-07-29. Volumes are monthly US searches. KD = Semrush Keyword Difficulty. Intent: 0=commercial, 1=informational, 2=navigational, 3=transactional.

### Cluster A — Email signatures ✅ FUND FIRST

| Keyword | Vol | KD | CPC | Intent |
|---|---|---|---|---|
| email signature generator | 14,800 | 48 | $2.96 | 0 |
| email signature template | 6,600 | 45 | $3.01 | 1 |
| professional email signature | 3,600 | 43 | $2.68 | 1 |
| email signature templates | 2,400 | 54 | $3.01 | 1 |
| gmail signature template | 1,600 | 55 | $2.42 | 1 |
| email signature design | 1,300 | 39 | $3.18 | 1 |
| custom email signature | 1,000 | 61 | $4.66 | 1 |
| outlook signature template | 1,000 | 43 | $2.24 | 1 |
| free email signature template | 720 | 39 | $2.62 | 0 |
| gmail signature examples | 320 | 48 | $2.80 | 1 |
| email signature html | 320 | 56 | $4.61 | 1 |
| html email signature template | 260 | 39 | $3.20 | 0 |
| outlook signature templates free | 210 | 45 | $1.99 | 0 |
| **real estate email signature** | **170** | **15** | $4.24 | 1 |
| **email signature for realtors** | **50** | **17** | $4.44 | 1 |

~34,000/mo, healthy CPCs, and — critically — the **industry tail sits at KD 15–17**. Those are the fastest realistic wins on the entire list and they directly validate the by-industry hub. Note `email signature generator` (14,800) is *tool* intent: a template product partially serves it, so treat it as a secondary target, not the primary.

### Cluster B — Business templates ✅ FUND FIRST

| Keyword | Vol | KD | CPC | Intent |
|---|---|---|---|---|
| **notion templates** | **22,200** | **40** | $2.93 | 2 |
| sop template | 6,600 | 36 | $3.18 | 1,0 |
| standard operating procedure template | 6,600 | 38 | $3.19 | 1 |
| content calendar template | 5,400 | 57 | $5.67 | 1 |
| sop template word | 4,400 | 38 | $3.19 | 1 |
| social media content calendar | 3,600 | 66 | $7.51 | 1 |
| marketing calendar template | 1,300 | 47 | $6.52 | 1 |
| **client onboarding template** | **390** | **23** | **$11.04** | 1 |
| agency onboarding process | 50 | 10 | $6.54 | 1 |

The strongest cluster overall. `sop template` at 6,600/KD 36 is the single best volume-to-difficulty ratio in the plan. `client onboarding template` has a **$11.04 CPC at KD 23** — low competition, high commercial value. And `notion templates` (22,200, KD 40) had **no page in the brief at all**; page 18 should be re-scoped around it.

### Cluster C — AI skills & prompts ⚠️ BRAND/AEO PLAY, NOT REVENUE

| Keyword | Vol | KD | CPC |
|---|---|---|---|
| claude skills | 22,200 | **75** | $9.41 |
| claude skills marketplace | 2,400 | 49 | $8.30 |
| ai prompt templates | 260 | 34 | $2.52 |
| chatgpt prompts for business | 210 | **12** | $3.45 |
| claude ai skills | 140 | 53 | $3.87 |
| chatgpt prompt pack | 50 | 42 | $3.19 |
| seo prompts | 50 | 31 | $4.73 |
| google ads prompts | 20 | 0 | — |

One large head term at KD 75, dominated by Anthropic's own documentation — not winnable soon and largely informational. `claude skills marketplace` (2,400, KD 49, $8.30 CPC) is the genuinely attractive target. `chatgpt prompts for business` at **KD 12** is a cheap win. The rest (20–50/mo) do not justify dedicated pages. **Fund 2 pages here, not 5.**

### Cluster D — Shopify components ❌ DO NOT FUND 5 PAGES

| Keyword | Vol | KD |
|---|---|---|
| shopify sections | 140 | 55 |
| shopify mega menu | 90 | 30 |
| shopify faq section | 20 | 0 |
| shopify section templates | 20 | 0 |
| shopify theme sections | 20 | 0 |

**~290/mo across the entire cluster.** The brief allocates 5 of 20 launch pages here. On this evidence that is a 25% misallocation. Consolidate to **one** page covering sections generally, with FAQ/testimonial/mega-menu as on-page sections rather than separate URLs. Revisit only if that one page earns impressions.

Also: `tailwind components` — 1,000/mo, **KD 77, CPC $0.00**. High difficulty, zero commercial signal. Deferred in §12.

### AEO requirements (per page, non-negotiable)

Direct answer in the first 40–60 words · clear definition · structured lists · comparison table where genuinely useful · explicit product↔platform relationships · natural-language FAQ headings · step-by-step install sections · named author with credentials · visible `dateModified` · `Article` + `FAQPage` + `BreadcrumbList` JSON-LD · explicit links to the relevant products.

Every page answers: what is it · who is it for · what problem does it solve · what's included · how is it installed · what does it cost · can it be customised · what should I choose · what are the alternatives · what mistakes to avoid · which StillAwake product applies.

---

## 17. Internal-Link Model

```
StillAwake Times article
   └→ cluster hub  (/digital-products/email-signatures)
        └→ programmatic page
             └→ Shopify product        [PRIMARY]
             └→ custom service         [SECONDARY]

Shopify product
   └→ main-site authority page  (via authorityPageUrl metafield)
   └→ install guide
   └→ compatible products

/digital-products hub
   └→ 4 cluster hubs → child pages → top products → related articles
```

**Rules:**
- Every programmatic page: exactly **one** primary commercial destination, one secondary product, one service CTA, 3–5 genuinely useful editorial links
- Exactly **one page owns each search intent** — enforced by the `primaryKeyword` build assertion (§18a)
- Vary anchor text; no exact-match anchor stuffing
- Replace the sitewide `InternalLinks` nav dump with contextual, frontmatter-driven links
- Retire the `montrealNav` duplicates that feed the §4a collisions

---

## 18. Programmatic Page Template

**Modular blocks, in order:** breadcrumb → category badge → H1 → direct answer (40–60 words) → hero CTA → who this is for → problem solved → what's included → compatibility table → installation → template vs custom comparison → previews → pricing context → mistakes to avoid → FAQs → related products → related articles → custom-service CTA → author + reviewer → last updated.

**Page-level variables:** `platform` · `productType` · `audience` · `industry` · `fileFormat` · `compatibility` · `installMethod` · `skillLevel` · `licence` · `priceRange` · `customAvailable`

**Anti-duplication rules — the difference between a content engine and a thin-page farm:**
- Variable substitution may only produce *labels, table cells, and metadata* — never prose paragraphs
- Direct answer, "who this is for", "mistakes to avoid", and FAQ **answers** must be hand-written per page
- Minimum 40% of body text unique to the page
- Two pages may never share a `primaryKeyword`
- Comparison tables must carry page-specific rows, not a shared block

### 18a. Required frontmatter schema (extends the current 8 fields)

```yaml
# --- existing ---
title: string
date: string                  # first published
excerpt: string
category: enum                # from a fixed, deduplicated list
featured: boolean
image: string                 # MUST become per-page and MUST be rendered
readTime: string              # DELETE — derive from estimateReadTime()
author: string                # → author entity id

# --- required additions ---
status: draft | review | published     # only `published` renders/sitemaps/indexes
noindex: boolean                       # default false
dateModified: string                   # required on every edit
slug: string                           # explicit, decoupled from filename
canonicalOverride: string | null
primaryKeyword: string                 # UNIQUE across corpus — build fails on collision
secondaryKeywords: string[]
searchIntent: informational | commercial | transactional | navigational
funnelStage: top | middle | bottom
pageType: article | cluster-hub | category-hub | product-landing | service-landing
authorId: string                       # → real person entity
reviewerId: string | null
primaryProduct: string | null          # Shopify handle
secondaryProducts: string[]
customServiceUrl: string | null
ctaVariant: product | category | service | audit
schemaTypes: string[]                  # Article | FAQPage | BreadcrumbList | Product
faqs: [{ q, a }]                       # drives FAQPage JSON-LD
internalLinksOut: string[]
ogImage: string                        # per-page, required
imageAlt: string
evidenceNotes: string[]                # source for any factual claim
qualityScore: number                   # 0–100, must clear threshold to publish
maintenanceCadence: monthly | quarterly | biannual
```

### 18b. Publish gate (must pass, enforced in build)

`status == published` · unique `primaryKeyword` · canonical resolves to `stillawakemedia.com` · title 30–60 chars · meta description 120–158 chars · exactly one H1 · ≥40% unique body text · every claim has an `evidenceNotes` entry · `primaryProduct` resolves to a live Shopify handle · CTA destination returns 200 · required schema emitted and valid · ≥3 internal links out · `authorId` resolves · `dateModified` present · per-page `ogImage` exists · `qualityScore` ≥ threshold · no cannibalization conflict.

**Fail → stays `draft`.** No exceptions, or the gate is theatre.

---

## 19. Twenty Detailed Page Briefs

→ **`01-page-briefs.md`** (all 20, 32 fields each, evidence-tiered)

---

## 20. Suggested URLs

Revised per §10a. `⚠️` = changed from the brief; `🔴` = recommend cutting or merging.

| # | Page | URL |
|---|---|---|
| 1 | HTML Email Signature Templates for Small Business | `/digital-products/email-signatures/html-email-signature-templates-small-business` ⚠️ |
| 2 | Gmail Email Signature Templates | `/digital-products/email-signatures/gmail-signature-templates` ⚠️ |
| 3 | Outlook Email Signature Templates | `/digital-products/email-signatures/outlook-signature-templates` ⚠️ |
| 4 | Custom Email Signatures for Businesses | `/digital-products/email-signatures/custom-business-email-signatures` ⚠️ |
| 5 | Email Signature Templates by Industry | `/digital-products/email-signatures/templates-by-industry` ⚠️ |
| 6 | Claude Skills for Business | `/digital-products/ai-skills/claude-skills-for-business` ⚠️ |
| 7 | ChatGPT Prompt Packs for Small Business | `/digital-products/ai-skills/chatgpt-prompt-packs-small-business` ⚠️ |
| 8 | SEO Prompt Templates | `/digital-products/ai-skills/seo-prompt-templates` ⚠️🔴 merge → #7 |
| 9 | Google Ads Prompt Templates & Skills | `/digital-products/ai-skills/google-ads-prompts-and-skills` ⚠️🔴 merge → #7 |
| 10 | Custom AI Skill Development | `/custom-services/custom-ai-skill-development` ⚠️ |
| 11 | Shopify Sections for Online Stores | `/digital-products/shopify-sections` ⚠️ |
| 12 | Shopify FAQ Section Templates | 🔴 **cut** — section within #11 |
| 13 | Shopify Testimonial Section Templates | 🔴 **cut** — section within #11 |
| 14 | Shopify Mega Menu Templates | `/digital-products/shopify-sections/shopify-mega-menu-templates` ⚠️ (KD 30 — keep) |
| 15 | Custom Shopify Sections | `/custom-services/custom-shopify-sections` ⚠️ |
| 16 | SOP Templates for Small Business | `/digital-products/business-templates/sop-templates-small-business` ⚠️ |
| 17 | Client Onboarding Templates for Agencies | `/digital-products/business-templates/client-onboarding-templates-agencies` ⚠️ |
| 18 | Notion Business Operating System | `/digital-products/business-templates/notion-business-operating-system` ⚠️ **re-scope to `notion templates`, 22,200/mo** |
| 19 | Marketing Content Calendar Templates | `/digital-products/business-templates/marketing-content-calendar-templates` ⚠️ |
| 20 | Digital Business Templates and Tools | `/digital-products` ⚠️ **make this the hub, not a child page** |

**Net: 17 pages instead of 20** — cutting 2 near-zero-demand Shopify pages and merging 2 tiny AI pages. The freed capacity goes to the email-signature industry tail (KD 15–17), which is where the fastest wins are.

---

## 21. Product-to-Content Mapping

| Product | Authority page (canonical owner) | Secondary pages | Custom upsell |
|---|---|---|---|
| Business HTML Signature Kit | #1 | #5, #20 | Custom Signature Service |
| Gmail Signature Kit | #2 | #1, #5 | Custom Signature Service |
| Outlook Signature Kit | #3 | #1, #5 | Custom Signature Service |
| Custom Signature Service | #4 | #1, #2, #3, #5 | — |
| SOP Starter Pack | #16 | #18, #20 | Custom Digital Asset Service |
| Agency Onboarding Pack | #17 | #16, #18 | Custom Digital Asset Service |
| Notion Business OS | #18 | #16, #19 | Custom Digital Asset Service |
| Content Calendar System | #19 | #18, #20 | Custom Digital Asset Service |
| Claude SEO Skill | #6 | #7, #10 | Custom AI Skill Development |
| ChatGPT Prompt Pack | #7 | #6, #10 | Custom AI Skill Development |
| Shopify sections (3) | #11 | #14, #15 | Custom Shopify Sections |

Every product has exactly one authority page. Every authority page has exactly one primary product. No orphans.

---

## 22. Publishing Order

**Wave 0 — remediation (no new pages).** Fix P0 canonicals · fix `readTime` · resolve the two §4a collisions · delete `next.config.ts` · install GA4 · ship the frontmatter schema + publish gate + `Article`/`FAQ`/`Breadcrumb` schema.

**Wave 1 — hubs (2 pages).** #20 `/digital-products` · #1 email-signature cluster hub. Validates the template and the CTA components against real traffic before scaling.

**Wave 2 — highest validated demand (4).** #16 SOP (6,600/KD 36) · #18 Notion (22,200/KD 40) · #2 Gmail (1,600) · #3 Outlook (1,000).

**Wave 3 — commercial intent (3).** #4 Custom signatures ($4.66 CPC) · #17 Client onboarding ($11.04 CPC, KD 23) · #5 Industry hub (KD 15–17 tail).

**Wave 4 — remaining (4).** #19 Calendars · #6 Claude Skills · #7 ChatGPT prompts (KD 12) · #11 Shopify sections.

**Wave 5 — services (3).** #10, #15, and the `/custom-services` hub.

**Wave 6 — conditional.** #14 mega menu only if #11 earns impressions. The industry tail expands only if #5 ranks.

Never publish more than 4 pages in a wave without reviewing indexing and CTR from the previous wave.

---

## 23. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| P0 canonical typo continues to suppress indexing | **Critical** | Fix immediately (§26) |
| Entity dilution — agency identity blurred by product catalogue | High | Single `/digital-products` hub (§10a); keep service pages untouched |
| Thin-page penalty from programmatic pages | High | Publish gate §18b; 40% unique-text floor |
| New cannibalization on top of the two existing pairs | High | `primaryKeyword` uniqueness assertion fails the build |
| Subdomain authority does not transfer from apex | Medium | Separate GSC property; strong internal linking; Organization schema + `sameAs` |
| Support burden on signature products exceeds margin | Medium | Per-client install guides; published compatibility table; refund policy (c) |
| Digital-goods tax treatment (GST/HST/QST, EU VAT) | Medium | Automatic tax + accountant review before launch |
| `sanitize: false` becomes an injection vector once content is data-driven | Medium | Enable sanitisation or validate at the gate before any generated content |
| Solo operator capacity across 6 products + 17 pages + custom services | Medium | Wave model; 6 products not 15 |
| **Adult-platform creator assets (MyFreeCams/Chaturbate templates)** | **High — needs your decision** | These carry payment-processor, ad-platform, and brand-adjacency consequences: Shopify Payments and Google Ads/Merchant Center both restrict adult-adjacent content, and this catalogue would sit on the same domain entity as the agency brand. **Recommend excluding from this store**, or isolating on a separate domain and merchant account. Flagged, not decided — see §25 |
| Wrong `readTime` values already erode trust | Low–Med | Delete field, derive from `estimateReadTime()` |

---

## 24. Blockers

1. **`shop.stillawakemedia.com` does not exist.** No DNS, no store, no plan. Everything in §9 is blocked until created.
2. **P0 canonical typo.** Publishing new pages into a broken canonical structure wastes the work.
3. **No publish gate.** §8 — commit equals publish.
4. **No GA4.** Cross-domain attribution and article-assisted conversion are unmeasurable, so ROI on the whole programme is unprovable.
5. **No digital-delivery mechanism chosen.** Shopify does not do this natively (§9a).
6. **No author entity.** E-E-A-T and AEO both require a real named person; all 41 articles are authored by a string.
7. **No products exist.** §18b requires `primaryProduct` to resolve to a live handle — pages cannot pass the gate until at least Wave 1 products exist.

---

## 25. Required User Decisions

| # | Decision | My recommendation |
|---|---|---|
| 1 | Approve the P0 canonical fix now, separately from everything else? | **Yes — do this today.** Zero commerce risk, active SEO damage |
| 2 | Nested `/digital-products/*` hub, or six top-level routes as briefed? | **Nested hub** (§10a) — avoids the `/shopify` collision and entity dilution |
| 3 | Cut 2 Shopify pages and merge 2 AI pages (20 → 17)? | **Yes** — 290/mo cannot justify 5 pages |
| 4 | Re-scope page #18 to target `notion templates` (22,200/mo)? | **Yes** — largest untapped validated term in the plan |
| 5 | Who is the named author entity? | Required for AEO. Needs a real person, bio, and credentials |
| 6 | Digital delivery: Shopify Digital Downloads (free) or paid app? | **Start with the free first-party app**; upgrade only if licence keys are needed |
| 7 | Refund policy for digital goods? | **Option (c)** — refunds on demonstrated technical failure (§14) |
| 8 | **Adult-platform creator assets: in or out?** | **Out of this store.** Payment-processor and ad-platform risk plus brand adjacency (§23). Separate domain and merchant account if pursued |
| 9 | Shopify plan tier for the new store? | Start Basic; verify the §9a capability list at signup before designing around it |
| 10 | Fix the two §4a cannibalization pairs — redirect articles to service pages, or canonical them? | **301 the article versions to the service pages.** Service pages are stronger and better linked |

---

## 26. Recommended Next Implementation Step

**One narrowly scoped, high-value, zero-commerce-risk change. Nothing else should happen first.**

**Step 1 — fix the P0 canonical bug (~15 min).**
- `src/app/layout.tsx:72` → remove `alternates` from root metadata entirely (let each route self-canonicalise via `metadataBase`), or correct to `siteUrl`. **Removing is safer** — a root canonical inherited by every page is the bug's root cause, not just its symptom.
- `src/app/branding/page.tsx:12`, `software-development/page.tsx:10`, `ai-automation/page.tsx:12` → replace the hardcoded typo domain with relative paths (`/branding`, etc.) so `metadataBase` resolves them, matching the pattern that already works correctly for articles.
- Also revert the uncommitted truncated `branding` meta description (§4 #21).
- Verify: `curl -s https://stillawakemedia.com/ | grep canonical` on every route.

**Step 2 — fix `readTime` (~15 min).** Delete the field from all 41 files; let `estimateReadTime()` at `content.ts:69` compute it. It is already written and correct.

**Step 3 — delete `next.config.ts` (~1 min).** Protects the 10 live redirects.

Steps 1–3 are pure defect repair, touch no content, add no routes, and require none of the decisions in §25. **I recommend authorising these three now and holding everything else pending your §25 answers.**

Then, in order: frontmatter schema + publish gate → GA4 + cross-domain → create the Shopify store → Wave 1 products → Wave 1 pages.

---

## 27. Files and Systems That Would Need Modification

**Wave 0 (defect repair) — 5 files**
`src/app/layout.tsx` (remove root canonical; add GA4) · `src/app/branding/page.tsx` · `src/app/software-development/page.tsx` · `src/app/ai-automation/page.tsx` · delete `next.config.ts`

**Pipeline upgrade**
`src/lib/content.ts` — extend `PostMeta`, add status/noindex filtering, drop `readTime` override, add keyword-uniqueness assertion
`src/app/stillawake-times/[slug]/page.tsx` — emit Article/FAQ/Breadcrumb JSON-LD, use `post.image` for OG, modular CTA
`src/app/sitemap.ts` — filter unpublished/noindex; real `lastModified`; add new routes
all 41 `src/content/stillawake-times/*.md` — frontmatter migration
`src/lib/data.ts` — nav additions; retire `montrealNav` duplicates

**New files**
`src/app/digital-products/page.tsx` + 4 cluster hubs + child pages · `src/app/custom-services/**` · `src/app/stillawake-times/category/[category]/page.tsx` · `src/lib/products.ts` (Shopify mapping) · `src/lib/authors.ts` · `src/components/commerce/{ProductCta,CategoryCta,CustomizationCta,ComparisonTable,RelatedProducts}.tsx` · `src/lib/schema.ts` · `src/lib/publish-gate.ts` · per-page OG images in `public/`
`next.config.mjs` — redirects for the two §4a collisions

**External systems**
DNS (`shop` CNAME) · new Shopify store + digital-delivery app + metafields · GA4 property with cross-domain config · Search Console property for `shop.` · Resend verified sending domain (replace `onboarding@resend.dev`)

**Explicitly NOT to be touched:** the 41 article bodies (content is good) · service page copy · the existing 10 redirects · `PortfolioBrowser` / `LiveWorkShowcase` · Blackwater Aquatics (unrelated business).

---

## 28. Confirmation: No Production Changes Were Made

**Confirmed. Nothing in production, no live URL, no content, and no store data was modified.**

- **Repo:** the only files created are `docs/commerce-program/00-master-report.md` and `01-page-briefs.md` — planning documents in a new `docs/` directory. No route, component, config, or content file was edited. Nothing was committed or pushed. The pre-existing uncommitted `src/app/branding/page.tsx` change was left exactly as found (and flagged in §4 #21).
- **Live site:** read-only. `curl` GETs against public URLs and `dig` DNS lookups only.
- **Shopify:** read-only. `get-shop-info` and `search_products` against the connected store. **No product, collection, or setting was created or modified on Blackwater Aquatics or anywhere else.** That store is unrelated to this programme and nothing here applies to it.
- **Semrush / Ahrefs:** read-only keyword queries.
- **Nothing published, deleted, redirected, or indexed.** No blog pipeline behaviour was altered.

All keyword figures in §16 come from Semrush `phrase_these` (US, 2026-07-29) and are cited as retrieved. Ahrefs was attempted first and returned `API units limit reached` — no Ahrefs data is used or estimated anywhere in this report. All pricing is labelled as an unvalidated recommendation. No reviews, sales, customer counts, or performance claims have been invented.
