# StillAwake Media — SEO / AEO / Local / Service-Architecture Audit
**Discovery & opportunity-mapping pass — 2026-08-12.** No mass content was produced. Data sources: live site + repo inspection (FACT), Google Ads Keyword Planner via Zylx (FACT — geo Canada 2124 / Québec 20123, pulled 2026-08-12), live SERP inspection via web search (FACT, US-datacenter flavored — local packs unobservable), competitor site fetches (FACT). **Semrush and Ahrefs both had 0 API units** — organic KD is ESTIMATE-UNAVAILABLE throughout; "winnability" combines paid-competition index + SERP maturity (INFERENCE). GSC: Ahrefs project exists but returned 0 query rows (accessible-but-empty). GBP: not accessible this session — UNVERIFIED.

---

## EXECUTIVE FINDINGS

- **Biggest opportunities:** (1) Montréal SEO cluster — ~1,730 EN searches/mo at LOW paid competition (`seo montreal` 880, `seo agency/services/company montreal` 850) plus `agence seo montréal` 170 FR; (2) **Shopify Montréal SERP is nearly uncontested** — a job posting, directories, and a US agency's programmatic city page rank today; (3) **AEO/GEO** — 1,040+ CA searches/mo (GEO 720 + AEO 320) with exactly ONE Montréal competitor (Dialekta) and an immature global SERP; (4) **website maintenance** 320/mo CA and rising, near-zero competition, maps directly to the active Emergency Support + draft Care Plan products; (5) **pricing transparency** — only 1 of 15 observed Montréal competitors publishes tiers; StillAwake already has approved live prices.
- **Biggest weaknesses:** French parity is 1 page of 17 (5.9%); 8 commercial money pages are trapped as blog articles (with 308 redirects pointing *into* the blog URLs); homepage H1 is the wordmark and links to zero service pages; three head terms are cannibalized by service-page/article duplicates; no pricing page, no legal pages; founder entity is a near-orphan (0 article links, 0 article authorship).
- **Biggest immediate risks:** September is the demand peak for virtually every Montréal term (3–5× spikes measured) — pages shipped after mid-September miss the year's best window. Cannibalization is live *now* on the three most valuable head terms.
- **English opportunity:** ~4,500/mo across measured commercial clusters (CA), most at LOW paid competition. National `seo agency canada` averages 2,400/mo (volatile 390–6,600) at comp 11.
- **French opportunity:** ~2,000/mo measured Québec-province demand; FR SERPs are visibly thinner (exact-match domains and a France-based listicle rank for money terms).
- **Montréal opportunity:** strongest and most winnable; StillAwake already holds the best-linked page on the site for `web design montreal`.
- **Canada opportunity:** real (SEO cluster ~1,230/mo national LOW comp; web design ~640) — sequence after Montréal traction.
- **Global opportunity:** AEO/GEO only (US: GEO 5,400, AEO 2,400, maintenance 2,400). Generic US web-design: not winnable now, skip.
- **AEO opportunity:** unusually good foundation — the site already ships a consolidated entity graph (`@id`-linked Organization/Person/ventures), `/llms.txt`, and honest founder data. Missing: answer-shaped service content, article authorship, dateModified, per-topic FAQs.

## CURRENT SITE INVENTORY (stillawakemedia.com — all FACT)

- Total public URLs: **58** (17 static + 41 articles). English 57, French 1 (+1 FR-language article mis-served as `lang="en"`).
- Dedicated service pages: 8 (`/software-development`, `/branding`, `/local-seo`, `/ai-automation`, `/framer-development`, `/shopify-development`, `/web-design-montreal`, `/seo-montreal`) + `/services` hub (pure link grid).
- Pages missing FR equivalent: **16 of 17** static pages.
- Orphan/near-orphan: `/founder/jaeden-doody` (2 in-links, zero article authorship), `/framer-development` (not in footer), 2 "service" articles reachable only via the services grid.
- Weak: `/` (wordmark H1, 3 internal links, no service links), `/contact` + `/stillawake-times` (**no H1**), `/services` (~30 words of copy), all 41 articles render **two H1s**, the 5 shortest articles are the commercial money pages.
- Duplicate/cannibalizing: `web design montreal` (service page vs article), `seo montreal` (service vs article), `agence web montréal` (FR page vs mis-lang'd article), `/local-seo` vs `/seo-montreal`, `/portfolio` vs `/work`, plus 3 near-duplicate article pairs (speed ×2, hiring-agency ×2, anti-WordPress ×3).
- Missing entirely: privacy/terms, pricing page, category archives, `x-default` hreflang, per-page OG images (one shared image sitewide), article `dateModified`/`image` schema.

## FRENCH PARITY

- Coverage: **5.9% of pages (1/17), 1.7% of URLs (1/58).**
- Critical missing FR pages: `/fr` contact, services hub, SEO Montréal, about, pricing guide.
- Technical: hreflang exists on exactly one EN↔FR pair (correct, reciprocal, but no `x-default`); `/web-design-montreal` serves `lang="en"` while declaring `en-CA`; the FR page is a **link cul-de-sac** (every exit is English; header/footer untranslated).
- FR keyword strategy must NOT mirror EN (measured): **"site web" beats "site internet" 2.6:1** in Québec; "agence seo" (480) beats "agence de référencement" (40) — Québécois searchers use the anglicism; "conception" is the distinctly Québécois variant with the softest competition (`conception site web montréal` comp 17 LOW); canonical FR money term is **"agence web montréal"**.

## SERVICE CATALOGUE → WEBSITE MATRIX

| Studio product (canonical) | Status/price | EN public page | FR page | Verdict | Priority |
|---|---|---|---|---|---|
| SEO Growth — Essentials | ACTIVE $600/mo | `/seo-montreal` exists, no pricing, cannibalized | none | REBUILD w/ tiers + FR | **P0** |
| SEO Growth — Advanced | ACTIVE $850/mo | same page (tier 2) | none | same | **P0** |
| Emergency Support — Custom Site | ACTIVE $150/250/400 | **none** | none | CREATE (support/maintenance page) | **P0** |
| Emergency Support — Ecommerce | ACTIVE $250/400/600 | **none** | none | same page | **P0** |
| Website Care Plan | draft $150/mo | **none** | none | CREATE (maintenance page — 320/mo CA rising) | **P0** |
| Managed Hosting | draft $40/mo | none | none | fold into maintenance page | P1 |
| AI Search Optimization | draft $600/mo | **none** | none | CREATE AEO/GEO pillar+service | **P0** |
| Content Creation | draft $1,200/mo | none | none | CREATE after clusters exist | P2 |
| Link Building | draft, no price | none | none | CREATE when priced | P2 |
| Full-Stack Growth | draft, no price | none | none | CREATE when priced | P2 |
| Project: Web design | via /start | `/web-design-montreal` (strongest page) | `/fr/agence-web-montreal` | KEEP, kill article twin | P0 fix |
| Project: Shopify dev | via /start | `/shopify-development` (no Montréal focus) | none | ADD Montréal page/section — SERP gap | **P0** |
| Project: Software/SaaS/app | via /start | `/software-development` | none | KEEP + FR later | P1 |
| Project: Branding | via /start | `/branding` | none | KEEP | P2 |
| Project: AI automation | via /start | `/ai-automation` | none | KEEP | P2 |
| Project: Framer | via /start | `/framer-development` (weak in-links) | none | IMPROVE links | P2 |
| Project: Redesign | via /start | article only (`website-redesign-montreal`) | none | PROMOTE to `/website-redesign` (refonte 100/mo FR) | P1 |
| Project: Local SEO | via /start | `/local-seo` (cannibalizes seo-montreal) | none | MERGE/differentiate into SEO pillar | P0 fix |

**Currently offered vs expansion:** everything above is CURRENTLY OFFERED. LOGICAL EXPANSION (needs your business approval, demand measured): website audits (fold into Free Audit CTA), conversion optimization (skip dedicated page for now), accessibility (no measured demand — skip). CONTENT-ONLY: comparison and pricing guides below.

## ENGLISH KEYWORD OPPORTUNITIES (Google Ads, CA, FACT)

| Cluster | Keywords (vol/mo) | Comp | Target page |
|---|---|---|---|
| Montréal SEO | seo montreal 880 · seo agency mtl 320 · seo services mtl 320 · seo company mtl 210 · seo consultant mtl 170 · local seo mtl 30 | LOW (5–30) | ONE bilingual SEO-Montréal pillar w/ $600/$850 tiers |
| Montréal design | web design mtl 260 · website design mtl 260 · web developer mtl 260 · agency 90 · web dev 50 | MED | existing `/web-design-montreal` (consolidate article twin) |
| Shopify | shopify developer 590 · expert 260 · agency 110 · dev agency 40 (city terms <10) | LOW (20–49) | `/shopify-development` + Montréal section |
| AEO/AI | GEO 720 (US 5,400) · AEO 320 (US 2,400) · ai search opt 170 · ai seo services 170 · ai seo agency 110 · aeo services 40↑ | LOW-MED | AEO/GEO pillar + service page |
| Maintenance | maintenance services 320↑ (US 2,400) · support 70 · packages 50 · cost 50 · emergency repair 10 | LOW (0–24) | maintenance + support page w/ tier pricing |
| Custom dev | custom web development 110 ×2 variants | LOW 3 | `/software-development` refresh |
| Pricing | how much does a website cost 210 · shopify website cost 110 · website cost canada 20 | MED | Canada website-cost guide |
| National | seo agency canada ~2,400 (volatile) · seo services canada 590 · seo consultant canada 320 · web design canada 640 combined | LOW | national pages after Montréal traction |

September peak (measured): Montréal terms spike 3–5× (web design mtl hit 1,300 in Sept 2025). **Ship P0 pages by early September.**

## FRENCH KEYWORD OPPORTUNITIES (Google Ads, QC province, FACT)

| Cluster | Keywords (vol/mo) | Comp | Target page |
|---|---|---|---|
| Agence/création | agence web 880 · conception site web 390 · création de site web 390 · conception web 320 · agence web montréal 110 · création/conception site web mtl 50+50 | LOW-MED (mtl-conception comp 17) | FR homepage-equivalent + `/fr/creation-site-web-montreal` |
| SEO | agence seo 480 · référencement web 210 (comp 8) · **agence seo montréal 170** · seo montréal 90 (bids to $79!) · référencement naturel 70 · référencement local 40 | LOW-MED | `/fr/agence-seo-montreal` |
| Shopify | site shopify 210 · boutique shopify 170 · expert shopify 70 · agence shopify 40 (ALL city variants null) | LOW-MED | ONE FR Shopify hub, no city pages |
| Pricing | prix site web 40 + variants ≈90 combined | MED-HIGH | "Prix d'un site web au Québec" guide |
| Refonte/maintenance | refonte site web 100 combined · maintenance ≈30 | MED | refonte page P1; maintenance section |
| Cities | agence web: québec 70 · laval 50 · longueuil 40 · rive-sud 20; agence seo laval 40 (comp 7) · longueuil 30 (comp 0) | LOW | Laval + Longueuil pages (agence web + agence seo only) |
| AEO-IA | seo ia 50 (ads comp HIGH 76) · référencement ia 10 · optimisation ia 10 | tiny, monetizable | FR AEO page as tier-2 |

## LOCAL SEO

- **Montréal:** best-linked page already targets it; missing: published pricing, case-study depth, GBP state UNVERIFIED, citations unbuilt.
- **Laval / Longueuil:** justified for `agence web` + `agence seo` (FR) only — EN city variants unmeasured/<10.
- **Brossard:** fold into "Rive-Sud" (20/mo) — no dedicated page yet.
- **Québec City:** `agence web québec` 70/mo — one FR page later (WAVE 8).
- **GBP / Bing / Apple:** UNVERIFIED — not accessible this session. Action item for you: confirm GBP exists, category "Website designer"/"Marketing agency", bilingual description, link to /contact.
- **Citations (from SERP evidence):** HelloDarwin (Québec-native, ranks in 3 SERPs — top priority, FR+EN), Clutch, DesignRush (#1 for web design mtl), GoodFirms, TechBehemoths, The Manifest, Semrush Agency Partners, Shopify Partners directory. Skip junk directories.
- **Local schema:** Organization/ProfessionalService with Montréal PostalAddress + areaServed already live (FACT) — good; add `Service` + `Offer` nodes on new service pages.

## PROGRAMMATIC LOCAL SEO

- **Recommended architecture:** keep flat EN pattern (`/seo-montreal` style already indexed) — `/[service]-[city]` EN; `/fr/[service french]-[city]` FR. Do NOT restructure existing URLs.
- **Approved combinations (evidence-backed):** agence web laval · agence web longueuil · agence seo laval · agence seo longueuil · agence web québec (city) — FR ONLY.
- **Rejected:** every Shopify×city (null volume), every US city page (no local relevance), EN Laval/Longueuil (unmeasured), Brossard/Sherbrooke/Trois-Rivières/Gatineau standalone (insufficient volume now).
- **Quality bar:** each local page needs ≥600 words of genuinely local content (local business context, service-area proof, distinct FAQs, local CTA) or it doesn't ship.

## NATIONAL / GLOBAL

- Canada: SEO-services-Canada page + web-design-Canada page — WAVE 6, after Montréal pillar has impressions.
- US/global: AEO/GEO content only (SERP is young, listicle-heavy — get INTO the listicles via outreach). NOT worth creating: generic "web design agency USA", US city pages, `web application development canada` (10/mo, comp 86).

## CONTENT CLUSTERS (priority order)

1. **SEO/AEO** — pillar: SEO Montréal (bilingual). Commercial: AEO/GEO service, national SEO. Support: existing 8 SEO articles + technical-SEO article (recategorized), AI-search guides, "SEO vs AEO", "AEO vs GEO". Citation asset: **AI Search Visibility Study (Montréal businesses)**.
2. **Maintenance/Support** — pillar: maintenance page w/ tiers. Support: cost article, emergency FAQ. (Products already live in Studio.)
3. **Shopify/Ecommerce** — pillar: Shopify development (+Montréal). Support: existing shopify-seo-guide + ecommerce article, "Shopify vs WooCommerce", "Shopify theme vs custom". Citation asset: **Shopify theme performance study** (you build themes — first-party data exists).
4. **Web design/dev** — already strongest; consolidate cannibals, add "Prix d'un site web au Québec" + "Website cost Canada" guides.
5. **AI automation / software** — keep, feed from existing articles.

## AEO / AI SEARCH READINESS

- **Already strong (FACT, rare among competitors):** consolidated entity graph with cross-site `@id`s, `/llms.txt`, honest founder Person entity, ProfessionalService with areaServed, article Article schema.
- **Missing:** article authorship (all 41 authored as Organization — switch to Jaeden Doody Person on expert pieces), `dateModified`, per-article images/Breadcrumbs, answer-shaped intro paragraphs on service pages (price, timeline, who-for in first 100 words), FAQ schema on service pages (exists on only 3 pages), citations INTO listicles (Omnius/Minuttia/First Page Sage AEO lists).
- **Best citation opportunities (ranked):** 1) Montréal/Québec website pricing report (feeds pricing pages, unique bilingual data); 2) Shopify theme performance study (first-party theme-builder data); 3) AI-search visibility study of Québec businesses; 4) Canadian small-business web maturity snapshot.

## COMPETITOR FINDINGS (observed)

- EN Montréal: WebCie (4/8 SERPs, bilingual, no pricing/case studies), Digitad (ONLY one with published tiers), My Little Big Web (deepest service tree, partial pricing), Bang, 8P Design, Evolving Web, Momentumm.
- FR: thinner SERPs — EMDs (`agence-seo-montreal.com`, `seomontreal.io`, `conceptionwebmontreal.com`) and a France-based listicle rank = weak competition.
- AEO: Dialekta only (no pricing, no case studies); BlackCat has buried AEO sub-pages.
- Shopify Montréal: effectively vacant (job post + directories + US programmatic page).
- **Exploitable universally:** nobody shows narrative, metric-driven case studies; almost nobody shows pricing; StillAwake can do both from day one.

## SEO TECHNICAL FINDINGS (fix list)

Indexation: healthy. Sitemap: fine (add FR URLs + hreflang alternates as FR ships). Canonicals: correct, 3 styles — standardize later. hreflang: 1 pair only, no x-default; `lang` attr mismatch on `/web-design-montreal`. Schema: strong org/founder; articles lack dateModified/image/breadcrumbs. Metadata: home page lacks a bespoke title/description. Internal linking: zero article→article markdown links; 3 links point at 308 redirects; homepage links to no services; `/seo-montreal` missing the shared InternalLinks block. Performance: 185KB favicon, homepage autoplay video in LCP region (INFERENCE), single shared OG image.

## CONTENT ROADMAP — FIRST 25 ENGLISH (score /100: commercial 20 · demand 15 · feasibility 15 · authority 10 · local 10 · conversion 10 · differentiation 10 · AEO 5 · proof 5)

| # | Page | Keyword target | Type | Score |
|---|---|---|---|---|
| 1 | `/seo-montreal` REBUILD w/ $600/$850 tiers, merge article twin + `/local-seo` | seo montreal 880 + cluster 850 | service pillar | 92 |
| 2 | `/website-maintenance` (Care Plan + Emergency tiers + pricing) | maintenance 320↑ + support cluster | service | 90 |
| 3 | `/shopify-development` + Montréal section & case study (Blackwater/theme work) | shopify developer 590 + cluster | service | 88 |
| 4 | `/answer-engine-optimization` (AEO+GEO pillar w/ service CTA, $600 AI-search product) | AEO 320 + GEO 720 | pillar+service | 86 |
| 5 | `/web-design-montreal` consolidation (301 article twin into it, homepage links) | web design mtl ~610 | fix+expand | 85 |
| 6 | `/website-cost-canada` guide | how much does a website cost 210+ | pricing guide | 78 |
| 7 | `/website-redesign` (promote article) | redesign + refonte intent | service | 74 |
| 8 | `/seo-services-canada` | seo canada cluster 1,230+ | national | 72 |
| 9 | `/shopify-website-cost` guide | 110+210 adjacent | pricing guide | 70 |
| 10 | `/seo-consultant-montreal` (founder-angle) | 170 + canada 320 | service variant | 69 |
| 11–25 | homepage rewrite w/ service links & real H1 · legal pages · Shopify vs WooCommerce · SEO vs AEO · AEO vs GEO · custom vs template · maintenance cost guide · GBP guide refresh · technical SEO promote to page · case study rebuilds ×3 (metric-driven) · web-design-canada · founder-authored expert article ×2 | — | mixed | 55–68 |

## CONTENT ROADMAP — FIRST 25 FRENCH

| # | Page | Keyword target | Score |
|---|---|---|---|
| 1 | `/fr/agence-seo-montreal` (tiers $600/$850) | agence seo mtl 170 + seo mtl 90 + agence seo 480 | 90 |
| 2 | `/fr/creation-site-web-montreal` (création+conception both) | 100 combined, comp 17–36 | 85 |
| 3 | FR shell: nav/footer/contact (`/fr/contact`) | enabler | 84 |
| 4 | `/fr/agence-web-montreal` EXPAND (fix cul-de-sac, FR internal links, kill mis-lang'd article) | agence web mtl 110 | 82 |
| 5 | `/fr/prix-site-web-quebec` | ~90 combined pricing | 76 |
| 6 | `/fr/services` hub | enabler | 72 |
| 7 | `/fr/developpement-shopify` (ONE hub — no city pages) | shopify FR cluster ~450 | 71 |
| 8 | `/fr/agence-web-laval` | 50, MED 65 | 64 |
| 9 | `/fr/agence-seo-laval` | 40, comp 7 | 63 |
| 10 | `/fr/agence-web-longueuil` + `/fr/agence-seo-longueuil` | 40+30, comp ~0 | 62 |
| 11–25 | refonte site web · maintenance FR · agence web québec (city) · référencement local article · seo ia page · FR about · FR case studies ×2 · référencement web guide (comp 8!) · FR comparison articles ×3 · FR homepage | — | 45–60 |

**NEXT 50 (EN + FR combined backlog):** comparison family completion, industry pages ONLY if a case study exists (pet/aquarium ecommerce via Blackwater theme work is the one justified today), problem keywords ("website not getting leads", "shopify store slow" — measured tiny; treat as article long-tail), remaining article dedup/merges, national web-design page, US-targeted AEO content, citation-asset builds.

## FULL TRANSLATION MATRIX (master parity checklist)

| EN | FR | Action |
|---|---|---|
| `/` | `/fr` | CREATE FR (wave 2) |
| `/services` | `/fr/services` | CREATE |
| `/contact` | `/fr/contact` | CREATE (wave 1) |
| `/about` | `/fr/a-propos` | CREATE (wave 5) |
| `/web-design-montreal` | `/fr/agence-web-montreal` | EXISTS — expand FR |
| `/seo-montreal` | `/fr/agence-seo-montreal` | CREATE (P0) |
| `/shopify-development` | `/fr/developpement-shopify` | CREATE |
| `/software-development` | `/fr/developpement-logiciel` | LATER |
| `/branding` | `/fr/branding` | LATER |
| `/local-seo` | — | MERGING into SEO pillar |
| `/ai-automation` | `/fr/automatisation-ia` | LATER |
| `/framer-development` | — | SKIP FR (no measured FR demand) |
| `/website-maintenance` (new) | `/fr/maintenance-site-web` | CREATE pair |
| `/answer-engine-optimization` (new) | `/fr/referencement-ia` | CREATE pair (FR tier-2) |
| `/website-cost-canada` (new) | `/fr/prix-site-web-quebec` | CREATE pair (different angles) |
| `/portfolio`, `/work` | shared visuals | FR intro only, later |
| articles ×41 | — | translate only top-5 performers once GSC shows winners |

## QUICK WINS (no new content required)

1. Kill the duplicate-H1 bug on all 41 articles (template + markdown `#`).
2. Add H1s to `/contact` and `/stillawake-times`; give the homepage a real H1 + links to all service pages.
3. **Reverse the 6 backwards redirects**: promote the commercial articles to their clean top-level URLs and 301 the `/stillawake-times/...` versions → this un-cannibalizes web-design-montreal + seo-montreal at the same time.
4. Merge the 3 near-duplicate article pairs; unify category strings ("AI Automation" vs "AI & Automation"); recategorize `what-is-technical-seo`.
5. Add `/seo-montreal` hreflang + InternalLinks block; fix `lang` attr on `/web-design-montreal`.
6. Author top articles as Jaeden Doody (Person @id) instead of Organization; link founder page from those bylines.
7. Add legal pages (privacy/terms) — trust + E-E-A-T baseline.
8. Submit sitemaps in the new Search Console properties (done for .studio/.dev; verify .com property), and list the site on HelloDarwin + Clutch + DesignRush.
9. Fix the 3 internal links pointing at 308 redirects.
10. Publish pricing on `/seo-montreal` and the new maintenance page — near-unique among ranking Montréal agencies.

## BUILD ORDER

- **WAVE 1 (now → Sept 1):** Quick wins 1–10 + `/website-maintenance` + `/seo-montreal` rebuild (EN) — these hit the September demand spike.
- **WAVE 2:** FR foundation — FR shell/nav, `/fr/contact`, `/fr/agence-seo-montreal`, `/fr/creation-site-web-montreal`, expand `/fr/agence-web-montreal`.
- **WAVE 3:** AEO/GEO pillar (EN) + Shopify Montréal + entity/citation foundation (directories, GBP verification).
- **WAVE 4:** pricing guides (EN cost guide + FR prix guide) + `/website-redesign`.
- **WAVE 5:** comparison cluster + case-study rebuilds (metric-driven) + FR services/about.
- **WAVE 6:** Canada national pages (SEO first).
- **WAVE 7:** citation assets (pricing report → theme performance study).
- **WAVE 8:** Laval/Longueuil/Québec-City FR local pages.
- **WAVE 9:** long-tail articles, article translations of proven winners.

## FINAL VERDICT

- **Focus first:** the Montréal SEO pillar (bilingual, with published tiers) + the maintenance/support page — they monetize products that are ALREADY live in Studio and hit the September spike.
- **Top 5 EN keywords:** seo montreal (880) · shopify developer (590) · generative engine optimization (720 CA/5,400 US) · website maintenance services (320↑) · seo agency montreal (320).
- **Top 5 FR keywords:** agence seo montréal (170) · agence web montréal (110) · création/conception site web montréal (100) · agence web (880, province) · agence seo (480, province).
- **First 5 pages:** seo-montreal rebuild · website-maintenance · shopify-development+Montréal · answer-engine-optimization · web-design-montreal consolidation.
- **First 5 FR pages:** agence-seo-montreal · creation-site-web-montreal · FR contact/shell · agence-web-montreal expansion · prix-site-web-quebec.
- **Local markets first:** Montréal (now), Laval + Longueuil (FR, wave 8), Québec City (later).
- **Do NOT scale programmatically:** Shopify×city (zero volume), US cities, EN suburb pages, industry pages without case studies.
- **Differentiation vs Montréal agencies:** published pricing + metric-driven case studies + genuine AEO capability (nobody combines all three today; only Digitad has pricing, only Dialekta has AEO).
- **Differentiation globally:** first-party research from real build data (Shopify themes, pricing benchmarks) + the ecosystem story (Studio portal + Zylx tours are themselves demonstrable product proof).
- **To become citable by Google/ChatGPT/Perplexity/Gemini:** keep the entity graph + llms.txt current, put real authorship (Person) on expert content with dates, publish first-party data reports others must reference, answer-shaped service pages (price/timeline/scope in the first screen), and earn listicle/directory citations in the AEO category while it's still soft.

## OPPORTUNITY SCORE: **74/100**
Technical foundation 8/10 (entity graph + llms.txt rare; H1/dup issues drag) · Service architecture 6/10 (pages exist; money pages trapped in blog) · EN commercial 8/10 · FR 9/10 (thin SERPs, near-zero parity = huge headroom) · Montréal local 8/10 · Canada 6/10 · International 4/10 (AEO only) · Content authority 6/10 (41 articles, weak interlinking) · AEO 8/10 · Citation assets 7/10 (real first-party data available) · Competitive difficulty 7/10 (directories beatable, agencies mediocre). Weighted: the demand is real, measured, and the market's weaknesses map exactly onto assets StillAwake already has.
