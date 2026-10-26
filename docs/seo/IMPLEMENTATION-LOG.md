# Implementation log

Newest first. Each entry lists what changed, how it was verified, and what is still open.

## 2026-10-26 — Batch 1 (branch `seo/program-batch-1`)

**Discovery**
- **Baseline:** Search Console, GA4, Ads and Clarity pulled live through Zylx. Corrected the 90-day impressions from ~450 to 156 (`SEO-BASELINE.md`).
- **Sitemap:** `https://stillawakemedia.com/sitemap.xml` was submitted 2026-08-12 and last downloaded 2026-10-24, with 0 errors.
- **Keywords:** Keyword Planner volumes for 20+ EN and FR terms (`KEYWORD-STRATEGY.md`).
- **Competitors:** what the results pages look like for the SEO and web design terms (`COMPETITOR-ANALYSIS.md`).
- **Crawl:** wrote `scripts/seo-crawl.mjs` and crawled all 279 sitemap URLs on production. Found:
  - 2 non-reciprocal hreflang pairs
  - 4 internal links pointing at redirects
  - 1 orphan page
  - 124–127 long titles and 149 long descriptions

**Changes**
- **P2-01:** added `languages` alternates (en-CA, fr-CA, x-default) to EN `/` and `/contact`.
- **P2-02:** pointed internal links at their final URLs instead of redirects:
  - homepage article card, `src/lib/data.ts`: slug `custom-coded-websites-outperform-templates` → `why-custom-coded-websites-outperform-templates`
  - `best-website-design-for-small-businesses-2026.md`: `/blog/google-business-profile-optimization` → `/stillawake-times/google-business-profile-optimization`
  - `website-performance.md`: `/technical-seo` → `/stillawake-times/what-is-technical-seo`
  - `why-modern-businesses-are-moving-away-from-wordpress.md`: `/blog/how-to-redesign-...` → `/stillawake-times/how-to-redesign-...`
- **P2-03:** linked `/fr/developpement-framer` from the related links on `/fr/agence-web-montreal`.
- **P6-01, /seo-montreal:**
  - title is now "SEO Montreal | SEO Services & Local SEO Agency", matching the measured terms "seo services montreal" (140/month) and "seo agency montreal" (110/month)
  - the description states the real starting price ($250 CAD/month, read from the pricing model)
  - the generic "Quick Answer" is replaced with a concrete one: what StillAwake does, the price, and an honest timeline with no ranking guarantee
  - the case-study proof block moved up, right after pricing
- **P6-02, /fr/agence-seo-montreal:** reviewed. It already has prices, FAQ, proof and hreflang, so it's unchanged.
- **P6-03:** titles now lead with the measured term on:
  - /web-design-montreal
  - /fr/agence-web-montreal (description rewritten too, now leading with "création de site web")
  - /fr/refonte-site-web
  - /fr/maintenance-site-web
  - /fr/developpement-logiciel
  - /website-maintenance
- **Tooling:** added a `stillawake-com-prod` entry (`next start` on port 3006) to `.claude/launch.json` for local production crawls.

**Verification (local production build)**
- **Checks:** `tsc` clean; ESLint 0 errors (1 existing unused-import warning in `src/app/(en)/page.tsx`); `check-seo-parity` OK; pricing tests 374 passed.
- **Build:** `npm run build` succeeded.
- **Crawl of `next start`, 279 URLs:** hreflangNotReciprocal 0, linksToRedirects 0, orphans 0, brokenInternalLinks 0, non200 0, duplicate titles and descriptions 0. Long titles went from 127 to 124.

**Open:** deploy and check live (P15-02), IndexNow, then the owner actions B-01 to B-09.
