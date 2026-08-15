# StillAwake Media — Organic Search Entry & Topical Authority Plan

**Date:** 2026-08-14
**Status:** Research + strategy. Nothing implemented. Awaiting approval.

---

## 0. Data sources, and what I could not get

| Source | Status | Used for |
|---|---|---|
| Google Search Console (via Zylx, `sc-domain:stillawakemedia.com`) | ✅ Available | Current footprint, striking distance, index reality |
| Google Ads Keyword Planner API (via Zylx, account-wide) | ✅ Available, live | All volume / competition / bid / 12-month trend data |
| Live SERP inspection | ✅ Partial | Organic difficulty classification |
| Repository (132 routes, metadata, internal links) | ✅ Full | Targeting inventory, cannibalization, orphan detection |
| **Ahrefs API** | ❌ **0 API units on trial** | Could not get DR, referring domains, backlink profile |
| **Semrush API** | ❌ **Insufficient units** | Could not get third-party organic keyword or competitor data |

**What this means:** every volume, competition index and bid figure below is *measured* Google data. Every backlink/authority statement is *inferred* from GSC behaviour and SERP observation, not measured. I have flagged inferred claims. If you top up either API, the authority-gap section is the part worth re-running.

**Two further caveats:**
- Google Ads competition index measures **ad auction** competition. It is not organic difficulty. I have not used it as a difficulty proxy anywhere. Organic difficulty below comes from looking at who actually ranks.
- Some 12-month trend percentages are computed off very small bases (10–40 searches/month). A "+700%" on a base of 10 is noise. I've marked those.

---

## 1. What Google currently appears to understand StillAwake as

Google understands StillAwake as **a Montréal web design agency**, and it ranks the site accordingly: nowhere.

Evidence from GSC (90 days):

| Query | Impressions | Avg position |
|---|---|---|
| web design montreal | 19 | 96.2 |
| montreal web design | 10 | 98.2 |
| agence webflow montreal | 4 | 86.8 |
| montreal web designer | 3 | 98.7 |
| custom web access | 3 | 96.0 |
| local seo services montreal | 1 | 99.0 |

Every non-branded query Google shows the site for is a **Montréal agency query**, and every one of them sits at **position 86–99** — page 9 or 10. Google has correctly classified the entity and has placed it at the very bottom of a category it considers full.

The exceptions are telling:
- `"prix site web québec"` — position **14**
- `next javascript framework` — position 71
- `stylla web` — position 37

The only query in genuine striking distance is a **French, Quebec-specific, price-intent** query. That is a signal worth reading.

---

## 2. Current organic footprint (baseline)

**Property:** `sc-domain:stillawakemedia.com`
**Window:** 90 days
**Sitemap URLs:** 132 (128 submitted per GSC)

| Metric | Value |
|---|---|
| Total clicks | 5–7 |
| Total impressions | ~35–49 |
| Pages receiving *any* impression | 26 of 132 (**20%**) |
| Non-brand queries surfaced | 15 |
| Non-brand queries in top 20 | **1** (`"prix site web québec"`, pos 14) |
| Non-brand queries in top 10 | **0** |
| Clicks from non-brand queries | **0** |
| Countries with meaningful data | Canada only |
| FR articles (33) with impressions | **0** |
| EN articles (36) with impressions | 9 |

**Page-level (the pages that do get impressions):**

| Page | Impr | Pos | Read |
|---|---|---|---|
| `/` | 39 | 4.0 | Branded |
| `/about` | 27 | 2.6 | Branded |
| `/contact` | 19 | 4.1 | Branded |
| `/portfolio` | 19 | 4.4 | Branded |
| `/web-design-montreal` | **54** | **59.7** | Highest impressions, worst position — the flagship target is failing |
| `/seo-montreal` | 18 | 16.2 | **Only real striking-distance commercial page** |
| `/software-development` | 17 | 5.5 | Branded/navigational |
| `/fr/agence-web-montreal` | 6 | 69.8 | Failing |
| `/fr/prix-site-web-quebec` | 1 | 14.0 | Striking distance, no volume behind it |

**The critical read:** positions 2.6–5.5 on `/about`, `/contact`, `/portfolio`, `/services` are **branded** — people already searching "StillAwake Media". GSC anonymises low-volume queries, which is why they don't appear in the query table. Strip branded traffic and the site's non-brand organic footprint is **effectively zero**.

**Indexation:** GSC's sitemap API reports `urlsIndexed: 0`, but that field is deprecated and returns 0 for every property in this account including ones with confirmed traffic. **Indexation is not the problem** — 26 pages demonstrably serve impressions. The problem is that 106 pages have never been shown to anyone.

---

## 3. Existing keyword targeting (extracted from titles, H1s, URLs, schema)

| Keyword | Target page | Intent | Pos | Impr | Volume (measured) | Ads comp | Organic difficulty | Verdict |
|---|---|---|---|---|---|---|---|---|
| web design montreal | `/web-design-montreal` | Commercial | 59.7 | 54 | — (Montréal subset of collapsing family) | — | **VERY HARD** (local pack + entrenched agencies) | **ABANDON as primary** |
| seo montreal | `/seo-montreal` | Commercial | 16.2 | 18 | — | — | HARD | **KEEP** — only striking-distance asset |
| agence web montréal | `/fr/agence-web-montreal` | Commercial | 69.8 | 6 | `agence web` 880/mo QC, **−26%** | MEDIUM 41 | **VERY HARD** | MODIFY |
| agence seo montréal | `/fr/agence-seo-montreal` | Commercial | — | 0 | `agence seo` 480/mo QC, **−78%** | LOW 26 | HARD | MODIFY |
| custom software development | `/software-development` | Commercial | 5.5 | 17 | 260/mo CA, **−44%** | LOW 16 | HARD | KEEP, reframe |
| shopify development | `/shopify-development` | Commercial | 5.0 | 3 | 480/mo CA, **+43%** | LOW 9 | MODERATE | **KEEP — growing** |
| answer engine optimization | `/answer-engine-optimization` | Commercial | — | 0 | 320/mo CA · **2,400/mo US** | MEDIUM 41–48 | MODERATE | **KEEP — under-exploited** |
| website cost canada | `/website-cost-canada` | Commercial | — | 0 | `how much does a website cost` 210/mo CA | MEDIUM 51 | HARD | KEEP |
| prix site web québec | `/fr/prix-site-web-quebec` | Commercial | 14.0 | 1 | `prix site web` 40/mo QC, −25% | MEDIUM 41 | MODERATE | **KEEP — closest to page 1** |
| framer development | `/framer-development` | Commercial | — | 0 | thin | — | MODERATE | KEEP, deprioritise |
| llms.txt generator | `/tools/llms-txt-generator` | Transactional/tool | — | 0 | **480/mo US · 90/mo CA** | LOW 24–31 | **ATTAINABLE** | **ELEVATE — see §7** |

**Cannibalization found in the AEO cluster** — six pages compete for one intent:

- `/answer-engine-optimization` (service)
- `/stillawake-times/what-is-aeo-answer-engine-optimization`
- `/stillawake-times/what-is-generative-engine-optimization`
- `/stillawake-times/can-chatgpt-recommend-my-business`
- `/fr/referencement-ia`
- `/fr/etre-cite-par-ia`

None ranks. This is the one cluster where StillAwake has both a tool and real expertise, and it is split six ways.

---

## 4. Why the current targets aren't ranking

Three separate causes, in order of impact.

### 4.1 The target market is measurably collapsing

This is the finding that should change the strategy. Google's own 12-month history for the agency keyword family:

| Keyword (Canada, EN) | Volume | 12-mo trend |
|---|---|---|
| top web design companies | 480 | **−92%** |
| web designing company | 2,400 | **−79%** |
| website design and development company | 170 | **−79%** |
| best website design companies | 170 | **−77%** |
| web development agency | 590 | **−64%** |
| website development company | 590 | **−63%** |
| software development company | 720 | **−66%** |
| website redesign services | 720 | **−60%** |
| website developers | 1,600 | **−46%** |

| Keyword (Québec, FR) | Volume | 12-mo trend |
|---|---|---|
| agence marketing web | 320 | **−94%** |
| agence site web | 260 | **−91%** |
| agence web design | 30 | **−89%** |
| agence marketing digital | 170 | **−86%** |
| agence seo | 480 | **−78%** |
| agence de création de site web | 70 | **−73%** |
| creation site web | 320 | **−46%** |

**Nearly every "hire an agency" query in both languages has lost half to nine-tenths of its volume in twelve months.** People are no longer opening Google and typing "web design company". They are asking an assistant.

StillAwake is fighting for position on a category that is emptying out. Ranking #1 for `agence site web` in Québec in 2027 would be a smaller prize than it was in 2024.

### 4.2 Intent mismatch on the pages that do get impressions

`/web-design-montreal` earns the most impressions of any page (54) and sits at 59.7. That SERP is a local pack plus a dozen entrenched Montréal agencies with years of citations and reviews. It is a **local-relevance and authority** contest, not a content contest. No amount of writing fixes it.

### 4.3 The one genuine asset on the site is orphaned

`/tools/llms-txt-generator` — a working, free, genuinely differentiated tool — has **zero inbound internal links**.

Verified: it appears in `src/app/sitemap.ts` and `src/data/page-schema-map.ts` and nowhere else. It is not in the footer (38 links, not one to the tool), not in the header nav, not linked from `/answer-engine-optimization`, not linked from any of the four AEO articles, and there is no `/tools` index page. It links *out* to the AEO service page; nothing links *in*.

It receives no internal PageRank, no crawl priority, and no topical reinforcement. It is the single highest-leverage fix on the site.

---

## 5. Google Ads API research methodology

Run through Zylx → Google Ads `KeywordPlanIdeaService`, account-wide research scope, live (not cached).

**Discovery methods used:**
1. Seed-keyword expansion — 4 seed sets × up to 10 seeds
2. Explicit keyword metrics validation — 4 batches, 129 exact keywords
3. Separate geo/language datasets, never blended
4. Commercial, informational, problem-phrased and platform-modified seeds
5. Cross-language comparison rather than translation

**Geo/language datasets run separately:**

| Dataset | Geo target ID | Ideas returned |
|---|---|---|
| English / Canada (commercial) | 2124 | 300 |
| English / Canada (CMS + technical) | 2124 | 300 |
| French / Québec (commercial) | 20123 (Province) | 300 |
| French / Québec (compliance) | 20123 | 300 |
| English / United States (AI search) | 2840 | 24 validated |
| French / Canada (AI search) | 2124 | 18 validated |

**Fields collected:** keyword, avg monthly searches, 12-month search history, competition level, competition index, low/high top-of-page bid (micros → CAD/USD), resolved geography, resolved language.

**Explicitly not done:** no keyword was labelled "easy" because Google Ads said LOW. Difficulty classification in §10 comes only from inspecting who ranks.

---

## 6. Geographic findings

| Market | Measured demand | Trend | Competition | Verdict |
|---|---|---|---|---|
| **Montréal (EN)** | Small subset of a declining family | Collapsing | Local pack + entrenched agencies | **Do not lead with this** |
| **Québec (FR) — services** | 43-keyword commercial cluster totals **370 searches/month** | −25% to −94% | Moderate | **Too small to be a growth engine** |
| **Québec (FR) — compliance** | `loi 25` **6,600/mo** | Flat, sub-terms **+63% to +707%** | MEDIUM 36 | Real demand, but see §8 |
| **Canada (EN)** | Agency terms 590–2,400/mo | −44% to −92% | Moderate | Declining |
| **Canada (EN) — technical** | `headless cms` 880 **+86%**, `shopify development` 480 **+43%**, `core web vitals` 480 **+56%** | **Growing** | LOW 9–20 | **Real opportunity** |
| **United States (EN) — AI search** | Cluster totals **40,290/mo**, 16 of 23 terms LOW competition | Mixed, `llms.txt` family stable-to-up | **LOW 10–31** | **The opportunity** |

### The geographic conclusion

**Geography should not be the primary axis of this strategy. Topic should be.**

That is a direct answer to Phase 5's instruction not to default to Montréal and not to chase global volume blindly. The reasoning:

- Montréal/Québec intent is where StillAwake *delivers*, but the demand there is small and shrinking fast enough that winning it is a shrinking prize.
- The technical and AI-search topics StillAwake genuinely knows are **non-geographic**. A developer in Toronto, Austin or Lyon searching `llms.txt generator` is equally reachable, and the SERP has no local pack to lose to.
- StillAwake already sells globally — `/global` exists ("Work With Us From Anywhere"). Non-geographic technical intent matches actual service delivery.

**Recommendation:** lead with non-geographic technical/AI-search intent. Keep Montréal/Québec pages as a maintained but secondary local layer, and let the FR side be a *differentiation and AI-citation* play rather than a volume play.

---

## 7. Finding the "in" — English opportunities

### The wedge: the llms.txt / AI-readiness cluster

Measured, United States, English:

| Keyword | Volume | Ads comp | Index | Low bid | High bid |
|---|---|---|---|---|---|
| **llms txt** | **6,600** | LOW | **10** | $0.73 | $7.08 |
| llms txt file | 880 | LOW | 17 | $0.46 | $6.13 |
| **llms txt generator** | **480** | LOW | **31** | $1.12 | $7.24 |
| what is llms txt | 480 | LOW | 25 | $0.93 | $5.27 |
| **llms txt wordpress** | **390** | LOW | **23** | — | — |
| llms txt seo | 260 | LOW | 29 | $3.66 | $8.81 |
| llms txt example | 170 | LOW | 13 | $0.92 | $4.21 |
| how to create llms txt | 20 | MEDIUM | 45 | $1.35 | $17.44 |
| llms txt shopify | 20 | LOW | 3 | — | — |
| llms txt webflow | 20 | LOW | 0 | — | — |
| llms txt nextjs | 10 | LOW | 4 | — | — |
| llms txt squarespace | 10 | LOW | 5 | — | — |
| llms txt framer | 10 | LOW | 6 | — | — |

Adjacent AI-search demand (US): `ai seo` 14,800 · `generative engine optimization` 5,400 · `ai search optimization` 3,600 · `geo vs seo` 2,900 · `answer engine optimization` 2,400 · `llm seo` 880 · `chatgpt seo` 480 · `how to rank in chatgpt` 170 · `ai overviews seo` 170.

**Cluster total: 40,290 searches/month. 16 of 23 terms at LOW ad competition.**

Canada mirrors it: `llms txt` 880/mo at LOW 11; `answer engine optimization` 320/mo; `generative engine optimization` 720/mo.

### Why this is the entry point and the Montréal terms are not

1. **StillAwake already built the tool.** `/tools/llms-txt-generator` is live, returns 200, has a Node-runtime API with an SSRF guard that resolves DNS before connecting, a rate limiter, a 12-page crawl budget, and 230 lines of tests. This is not a landing page — it is working software.
2. **It is differentiated in the exact way the SERP is weak.** Every competing generator dumps a page list. StillAwake's analyses *entity gaps* — whether an answer engine can determine who owns the site, what it sells, where it operates, what it costs. The page says so plainly, and it says llms.txt is "a proposed convention, not a standard any engine is obliged to honour." That honesty is a ranking and citation asset in a niche full of overclaiming.
3. **Tools earn links.** This is the only asset on the site that can plausibly attract referring domains without outreach.
4. **It ladders directly into a commercial page** that already exists and is already well-linked.

### The intent split that decides everything

This is the most important SERP finding in the report.

**`what is llms.txt` — VERY HARD.** Live SERP contains **Ahrefs, Semrush, Search Engine Land, Chrome for Developers, GitBook, Mintlify, llmstxt.org**. Major SEO and developer-tooling brands own the explainer intent. StillAwake cannot win this and should not try.

**`llms.txt generator` — ATTAINABLE.** Live SERP contains firecrawl (GitHub repo), SiteSpeakAI, AdNabu, WordLift, LLMrefs, llmstxtgenerate.com. Small SaaS and free-tool pages. No Ahrefs, no Semrush, no major publisher. **This is a tool SERP, and StillAwake has a tool.**

**`llms.txt for Shopify` — HIGH OPPORTUNITY.** Live SERP contains AdNabu's blog, icecubedigital, a Shopify Developer Community *forum thread*, Ilana Davis (independent consultant), llmstxtgenerate.com, shopexpertagency, and hamzataj.com (personal blog). Forum-heavy, independent-heavy, thin. This is exactly the SERP profile Phase 7 asked me to find.

**The rule that falls out of this:** StillAwake wins **tool** and **implementation** intent in this cluster. It loses **definition** intent. Every page recommended below respects that line.

---

## 8. French opportunities

I researched French separately and did not translate the English list. The result is uncomfortable but clear.

### French service demand in Québec is small and shrinking

The 43-keyword French commercial cluster I validated totals **370 searches/month across all 43 terms**, with 20 of 43 returning no measurable volume at all. Individually: `prix site web sur mesure` — no data. `coût site web québec` — no data. `refonte site web sans perdre seo` — no data. `quitter wordpress` — no data.

StillAwake has 33 French articles targeting this space. All 33 have **zero impressions in 90 days**. That is not a coincidence — several are targeting queries with no measurable demand.

### Where French demand actually is

| Keyword (Québec, FR) | Volume | Comp | Index | Trend | Note |
|---|---|---|---|---|---|
| **loi 25** | **6,600** | MEDIUM | 36 | −2% | Largest FR term by an order of magnitude |
| confidentialité | 1,000 | LOW | 9 | −9% | |
| politique de confidentialité | 390 | LOW | 27 | −13% | |
| la loi 25 | 260 | MEDIUM | 42 | −7% | |
| loi 25 sur la protection des renseignements personnels | 210 | MEDIUM | 45 | **+707%** ⚠️ | Small base — treat as directional |
| loi 25 résumé | 210 | MEDIUM | 37 | −9% | |
| **développement logiciel** | 210 | MEDIUM | 34 | **+15%** | Rare FR term that is *growing* |
| loi 25 protection des renseignements personnels | 110 | MEDIUM | 46 | **+126%** ⚠️ | |
| **fiche google entreprise** | **90** | LOW | **17** | **40 → 140/mo** | Genuinely growing; page already exists |
| loi 25 renseignements personnels | 70 | LOW | 30 | +63% ⚠️ | |
| loi 25 consentement | 40 | MEDIUM | 38 | | |
| politique de confidentialité loi 25 | 30 | MEDIUM | 48 | | |
| loi 25 checklist / amende / pme | 10 each | LOW | | | Long tail exists |

### Honest read on Loi 25

`loi 25` at 6,600/mo is the biggest French opportunity by volume — and I am recommending **against** leading with it.

- The head term's SERP will be owned by the **Commission d'accès à l'information du Québec**, Éducaloi, government portals and law firms. A web studio ranking above the regulator for the name of the statute is not realistic, and arguably shouldn't be.
- Search intent for `loi 25` is *"what is this law"* — a legal question. StillAwake is not a law firm and should not present as one.
- The commercially-bridged long tail — `loi 25 site web`, `bannière cookies loi 25`, `loi 25 checklist` — is where StillAwake is genuinely credible (they implemented consent on client sites; `/fr/articles/loi-25-cookies-consentement` already exists). But those sit at **10–30 searches/month**.

**Verdict:** Loi 25 is a **supporting cluster with a narrow implementation angle**, not a pillar. Target `loi 25 site web` / `bannière cookies loi 25` / `loi 25 checklist` as implementation content that links to service pages. Do not chase the head term.

### The real French strategy

French AI-search demand in Canada is thin: `geo seo` 480 · `seo ia` 170 · `chatgpt seo` 70 · `perplexity seo` 20 · `référencement ia` 10. Terms like `être cité par chatgpt`, `seo génératif` and `optimisation moteur génératif` return **no measurable volume at all** — the French vocabulary for this field has not settled yet.

That is the opportunity, stated honestly: **French AI-search terminology is pre-consensus.** Competition is close to zero because almost nobody has published. Volume is close to zero for the same reason. Publishing now is a bet that the vocabulary settles and StillAwake is already there.

**Recommendation for French:**
- Mirror the English llms.txt/AEO cluster in French — low cost, near-zero competition, real bilingual credibility, and it makes StillAwake citable by French-language AI assistants (which is itself the service being sold).
- Treat French as a **differentiation and citation play, not a traffic forecast.** Do not model revenue off French organic volume.
- Fix the existing 33 French articles before writing more. Several target zero-volume queries.

⚠️ One data caveat: `llms txt` returned **880/mo under geo=Canada, language=French**, identical to the English Canada figure. "llms txt" is a language-neutral string, so Keyword Planner is very likely reporting the same searches under both language settings. **Do not count that 880 twice.**

---

## 9. Competitor landscape

**Search competitors** (who ranks for what StillAwake wants):
- *Montréal agency terms* — entrenched local agencies with citation and review profiles StillAwake cannot match this year. Local pack dominated.
- *`llms.txt generator`* — firecrawl (GitHub), SiteSpeakAI, AdNabu, WordLift, LLMrefs, llmstxtgenerate.com. **All small. None is a media brand.**
- *`what is llms.txt`* — Ahrefs, Semrush, Search Engine Land, Chrome for Developers, GitBook, Mintlify. **Untouchable.**
- *`llms.txt for Shopify`* — AdNabu, icecubedigital, Shopify forums, independent consultants, personal blogs. **Weakest SERP found in this research.**

**Business competitors:** Montréal/Québec web agencies. Relevant to sales, largely irrelevant to the recommended strategy, because the recommended strategy does not compete with them on their terms.

**Content competitors:** Ahrefs, Semrush and Search Engine Land own AI-search *explainer* content globally. They do not own *implementation-per-platform* content, and they do not ship a free entity-gap analyser.

**Their blind spots — and where StillAwake is genuinely stronger:**
1. **Per-platform implementation.** The big SEO brands write "what is llms.txt". They do not write "here is the file, verified working, on Shopify's new native `llms.txt.liquid` template, with the gotchas."
2. **Honesty about efficacy.** Almost every competing tool implies llms.txt is an established standard with ranking benefit. StillAwake's page already says it isn't. That is defensible, citable, and impossible for a vendor with a paid product to copy.
3. **The gap analysis.** Competitors output a file. StillAwake outputs *what's missing that stops an AI describing you*. That is a different and more useful product.
4. **Bilingual.** No competitor in this cluster publishes in French.

---

## 10. SERP difficulty findings

| Query | Volume | Who ranks | Classification |
|---|---|---|---|
| web design montreal | — | Local pack + entrenched agencies | **VERY HARD** |
| agence web montréal | 880 QC | Local pack + established FR agencies | **VERY HARD** |
| loi 25 | 6,600 QC | CAI Québec, Éducaloi, gov, law firms | **VERY HARD** (and wrong entity type) |
| what is llms txt | 480 US | Ahrefs, Semrush, Search Engine Land, Chrome Devs, GitBook, Mintlify | **VERY HARD** |
| generative engine optimization | 5,400 US | SEO SaaS + major publishers | **HARD** |
| answer engine optimization | 2,400 US / 320 CA | Mixed SEO SaaS + agencies | **MODERATE** |
| custom software development | 260 CA | Clutch, directories, large firms | **HARD** |
| headless cms | 880 CA | Vendor sites (Contentful, Sanity, Strapi) | **HARD** — vendor-owned |
| shopify development | 480 CA | Shopify Partners, agencies | **MODERATE** |
| **llms txt generator** | **480 US / 90 CA** | firecrawl, SiteSpeakAI, AdNabu, WordLift, LLMrefs, llmstxtgenerate | **ATTAINABLE** |
| **llms txt wordpress** | **390 US** | Plugin pages, small blogs | **ATTAINABLE** |
| **llms txt shopify** | 20 US | AdNabu blog, forums, personal blogs, independents | **HIGH-OPPORTUNITY** |
| **llms txt nextjs / framer / squarespace / webflow** | 10–20 US each | Thin, forum-heavy, largely unanswered | **HIGH-OPPORTUNITY** |
| prix site web québec | 40 QC | Mixed FR agencies | **MODERATE** — already pos 14 |
| fiche google entreprise | 90 QC | Google docs + FR blogs | **MODERATE** |

**Why the classifications differ from Ads competition:** `llms txt` shows LOW ad competition (index 10) *and* a very hard organic SERP, because major SEO brands publish there for authority, not for ad revenue. `llms txt shopify` shows LOW ad competition (index 3) *and* a genuinely weak organic SERP. Identical Ads signal, opposite organic reality. This is precisely the trap Phase 4 warned about.

---

## 11. Content gap vs authority gap

Diagnosis per problem area — this determines whether the fix is writing or something else.

| Problem | Gap type | Fix |
|---|---|---|
| `/web-design-montreal` at pos 59.7 | **AUTHORITY GAP + LOCAL RELEVANCE GAP** | Not fixable by content. Needs citations, reviews, GBP, links. |
| `/seo-montreal` at pos 16.2 | **CONTENT QUALITY GAP** | Closest win. Improve depth and internal links. |
| `/tools/llms-txt-generator` invisible | **INTERNAL LINKING GAP** | **Zero inbound links. Highest-leverage fix on the site.** |
| AEO cluster (6 pages, none ranking) | **CANNIBALIZATION + TOPICAL DEPTH GAP** | Consolidate to one owner per intent. |
| 33 FR articles at zero impressions | **INTENT MISMATCH + no measurable demand** | Several target queries with no volume. Audit before adding more. |
| 36 EN articles, 9 with impressions | **AUTHORITY GAP** | Site cannot support this much undifferentiated content. |
| `/answer-engine-optimization` not ranking | **TOPICAL DEPTH GAP** | Cluster is split, tool is disconnected. |
| Whole domain | **AUTHORITY GAP** (inferred — see §0) | Needs earned links. Content alone will not fix it. |

**The single most important conclusion in this report:**

> StillAwake does not have a content gap. It has 132 pages and 69 articles, and 80% of them have never been shown to a single searcher. **Publishing more articles is the wrong prescription.** The gaps are authority, internal linking, cannibalization, and — on the French side — targeting queries that don't exist.

This directly constrains the programmatic-SEO plan in §20.

---

## 12. Topical authority map

Pillars retained only where there is both evidence and keyword opportunity.

### PILLAR 1 — AI Search Readiness & Answer Engine Optimization ✅ **PRIMARY**
Commercial page: `/answer-engine-optimization` · `/fr/referencement-ia`
Hub asset: `/tools/llms-txt-generator`
Evidence: working tool, entity-gap analyser, honest efficacy position, BankDeMark case study
Demand: 40,290/mo US cluster, 16/23 LOW competition

### PILLAR 2 — Shopify & Ecommerce Engineering ✅ **SECONDARY**
Commercial page: `/shopify-development` · `/fr/developpement-shopify`
Evidence: Blackwater Aquatics (real client build)
Demand: `shopify development` 480/mo CA, **+43%** — one of very few growing commercial terms

### PILLAR 3 — Custom Software & Product Engineering ✅ **SECONDARY**
Commercial page: `/software-development` · `/fr/developpement-logiciel`
Evidence: BankDeMark (SaaS, own product), NAVTRL/Stalkr (iOS, TestFlight in 24 days)
Demand: `custom software development companies` +48% CA; `développement logiciel` 210/mo QC **+15%**

### PILLAR 4 — Custom & Embedded CMS ⚠️ **CONDITIONAL**
Evidence: strongest first-hand expertise on the whole site — they built and run an embedded CMS
Demand: `headless cms` 880/mo CA **+86%** — but the SERP is **vendor-owned** (Contentful, Sanity, Strapi own their own names)
**Verdict:** real expertise, hard SERP. Use as *supporting* content under Pillar 1 and 3, not a standalone pillar yet.

### PILLAR 5 — Montréal / Québec Local ⚠️ **MAINTAIN, DO NOT INVEST**
Demand collapsing 25–94%. Keep pages, keep NAP/GBP hygiene, stop treating as the growth engine.

### ❌ REJECTED PILLARS
- **Generic "web design"** — collapsing category, VERY HARD SERPs, no differentiation
- **Loi 25 as a pillar** — wrong entity type; keep as narrow implementation content
- **Branding** — no measurable demand found, no search-led path
- **Generic AI automation** — cannot satisfy the intent behind broad AI queries

---

## 13. Authority ladder

| Level | Description | Example targets | When |
|---|---|---|---|
| **L1 — ENTRY** | Specific, weak SERPs, direct expertise | `llms txt shopify`, `llms txt nextjs`, `llms txt framer`, `llms txt squarespace`, `llms txt webflow` | **Now** |
| **L2 — TOOL / CLUSTER** | Tool intent + implementation | `llms txt generator`, `llms txt wordpress`, `llms txt example`, `how to create llms txt` | **Now → 90d** |
| **L3 — COMMERCIAL LONG-TAIL** | Buyer intent, moderate competition | `answer engine optimization`, `shopify development`, `prix site web québec`, `fiche google entreprise` | 90–180d |
| **L4 — CORE COMMERCIAL** | Money terms | `ai search optimization`, `custom software development`, `seo montreal` | 180–365d |
| **L5 — CATEGORY HEAD** | Only with real authority | `llms txt`, `ai seo`, `generative engine optimization`, `what is llms txt` | **Not before 12 months, if ever** |

---

## 14. Trust / E-E-A-T assessment

**Already strong — do not disturb:**
- Named founder with dedicated pages (`/founder/jaeden-doody`, FR mirror)
- Four real case studies with specific, falsifiable claims (Lighthouse score, "0 clicks to page 1 in 8 weeks", "TestFlight in 24 days")
- Published pricing — `/pricing` "Published Rates, No Sales Call". Rare and trust-building.
- Organization/Service schema via `page-schema-map.ts`
- Correct bilingual hreflang (`en-CA`, `fr-CA`, `x-default`) in sitemap
- The tool page's honesty about llms.txt efficacy

**Real deficiencies:**
1. **Article author attribution** — the AEO/technical articles need visible bylines tied to `/founder/jaeden-doody` with Person schema. Currently the strongest E-E-A-T signal on the site is disconnected from the content.
2. **No `/tools` index** — one free tool, no hub. Undersells capability and blocks internal linking.
3. **No visible methodology on the tool** — it does a 12-page crawl with defined checks. Saying so publicly is a trust and differentiation asset.
4. **Case-study ownership is not labelled.** BankDeMark and Zylx are StillAwake-owned ventures; Blackwater, TravelDesign and NAVTRL/Stalkr are client projects. This must be explicit — see §15.
5. **No `dateModified` surfaced** on articles in a fast-moving field.
6. **No external profiles / citations** feeding the local pillar.

**Not recommended:** no fabricated reviews, credentials, awards or client counts. Nothing in this plan requires them.

---

## 15. Case-study strategy — ownership labelling is mandatory

⚠️ **Correct classification, per Phase 15:**

| Project | Type | Must be presented as |
|---|---|---|
| Zylx Studio | **StillAwake-owned product** | Own product |
| BankDeMark / Invoice / Command | **StillAwake-owned product** | Own product |
| StillAwake Embedded CMS | **StillAwake-owned product** | Own product |
| Blackwater Aquatics | **Separate venture** (per project memory: Blackwater's Shopify store is Blackwater's, not StillAwake's) | Do **not** conflate with StillAwake |
| TravelDesign By Lisa | **Client project** | Client |
| NAVTRL / Stalkr | **Client project** | Client |

Presenting an owned venture as a third-party client would be misrepresentation. The current `/work` pages must be audited for this before any of them are used as authority assets.

**Cluster mapping:**
- **Embedded CMS** → custom CMS architecture, "why we didn't use a headless vendor", client editing without a page builder → supports Pillars 1, 3, 4
- **BankDeMark** → SaaS architecture, auth, Lighthouse/CWV → supports Pillar 3
- **TravelDesign By Lisa** → bilingual FR/EN architecture, hreflang, real SEO outcome → supports Pillars 1 and 5, and is the **best available proof for the French strategy**
- **NAVTRL/Stalkr** → mobile/product velocity → supports Pillar 3
- **Blackwater** → Shopify + ecommerce (labelled correctly) → supports Pillar 2

---

## 16. Keyword scoring model

Weights per Phase 16, unmodified — the evidence didn't justify changing them.

`Score = 20%·SERP attainability + 20%·business relevance + 15%·first-hand expertise + 15%·conversion adjacency + 10%·cluster value + 10%·measurable demand + 5%·linkability + 5%·differentiation`

Applied to the shortlist:

| Target | SERP | Rel | Exp | Conv | Clus | Dem | Link | Diff | **Score** |
|---|---|---|---|---|---|---|---|---|---|
| `llms txt generator` (tool) | 85 | 80 | 100 | 70 | 95 | 60 | 95 | 95 | **83** |
| `llms txt shopify` | 90 | 85 | 95 | 80 | 80 | 35 | 60 | 85 | **80** |
| `llms txt nextjs` | 90 | 70 | 100 | 60 | 80 | 25 | 75 | 90 | **73** |
| `llms txt wordpress` | 70 | 55 | 75 | 45 | 85 | 75 | 55 | 70 | **65** |
| `answer engine optimization` | 55 | 95 | 90 | 95 | 85 | 70 | 40 | 70 | **77** |
| `shopify development` | 60 | 90 | 85 | 95 | 70 | 65 | 30 | 55 | **72** |
| `fiche google entreprise` (FR) | 60 | 60 | 70 | 55 | 50 | 55 | 30 | 60 | **58** |
| `prix site web québec` (FR) | 65 | 85 | 80 | 90 | 40 | 30 | 25 | 55 | **65** |
| `loi 25 site web` (FR) | 75 | 50 | 70 | 45 | 55 | 20 | 45 | 65 | **56** |
| `web design montreal` | 10 | 90 | 80 | 95 | 40 | 50 | 20 | 30 | **56** ⚠️ high value, unwinnable now |
| `what is llms txt` | 10 | 70 | 90 | 50 | 80 | 75 | 40 | 60 | **57** ⚠️ demand without attainability |

---

## 17. Cannibalization findings and canonical map

| Intent | Pages currently competing | **Canonical owner** | Action for the others |
|---|---|---|---|
| AEO service | `/answer-engine-optimization`, 4 articles, 2 FR pages | **`/answer-engine-optimization`** | Articles become supporting, link up |
| "What is AEO/GEO" | `what-is-aeo-...`, `what-is-generative-engine-optimization` | **Merge into one** | 301 the weaker |
| AI citation | `can-chatgpt-recommend-my-business`, `/fr/etre-cite-par-ia` | Keep EN, keep FR as locale mirror | Ensure hreflang pairs |
| llms.txt tool | `/tools/llms-txt-generator` | **`/tools/llms-txt-generator`** | Everything links *in* |
| FR AI search | `/fr/referencement-ia`, `/fr/etre-cite-par-ia` | `/fr/referencement-ia` = service; `/fr/etre-cite-par-ia` = guide | Distinguish clearly |
| Shopify vs WooCommerce | `/shopify-vs-woocommerce` + FR mirror | Fine as-is | — |
| Technical SEO | `/technical-seo` appears in GSC but **is not in the sitemap** | Investigate | ⚠️ CMS page outside sitemap — see §18 |

⚠️ **Anomaly to resolve:** `/technical-seo` received an impression at position 2 but does not appear in `sitemap.xml` and has no route file. It is served by the `[...cmsSlug]` catch-all. Either add CMS pages to the sitemap or confirm it should exist.

---

## 18. Existing pages to improve (before anything new is written)

| URL | Current target | **Recommended primary** | Secondary | Action |
|---|---|---|---|---|
| `/tools/llms-txt-generator` | (orphaned) | **`llms txt generator`** | `llms txt file`, `free llms txt` | **Add inbound links from footer, nav, AEO page, all 4 AEO articles. Create `/tools` index.** |
| `/answer-engine-optimization` | AEO | `answer engine optimization` | `ai search optimization`, `llm seo` | Link down to tool + platform guides; absorb the merged explainer |
| `/seo-montreal` | seo montreal | `seo montreal` (keep) | `technical seo montreal` | Best striking-distance page (16.2). Deepen, link internally. |
| `/web-design-montreal` | web design montreal | **Demote** — keep page, stop treating as flagship | local variants | Fix local signals (GBP, citations), don't invest content |
| `/fr/prix-site-web-quebec` | prix site web québec | `prix site web québec` (keep) | `coût site web` | Position 14 — closest FR win. Improve and link. |
| `/fr/fiche-google-entreprise` | fiche google entreprise | `fiche google entreprise` | `google my business québec` | 90/mo and growing 40→140. Under-served. |
| `/shopify-development` | shopify development | `shopify development` | `shopify developer` | +43% trend. Add Blackwater proof. |
| `/software-development` | custom software development | `custom software development` | `custom business software` (+400% ⚠️ small base) | Add BankDeMark + NAVTRL proof |
| `/fr/referencement-ia` | référencement IA | `seo ia` / `référencement ia` | `geo seo` | FR mirror of Pillar 1 |
| 33 FR articles | various | **Audit** | — | Several target zero-volume queries. Consolidate or noindex. |

---

## 19–20. What to actually build — and the honest verdict on programmatic SEO

### The direct answer to your goal

You asked for **programmatic SEO articles in English and French that are genuinely useful**.

**Programmatic SEO is the right instinct for this cluster — but only because you have a tool.** Here is the constraint, stated plainly:

You already ran a content-volume play. 69 articles, EN and FR. After 90 days: **9 of 36 English articles have any impressions at all, 0 of 33 French articles do, and the whole site has 0 non-brand clicks.** Generating 40 more pages of the same kind will produce the same result, faster.

What makes programmatic work here is that **each page can carry a real, per-platform artifact produced by software you already own** — a verified working file, a real gap report, real platform-specific gotchas. That is not spun text. That is a utility replicated across a dimension.

**So: programmatic yes — but tool-backed, not text-backed. Roughly 20 platforms × 2 languages, not 200 pages.**

### The pSEO engine: `llms.txt for [platform]`

| Platform | US volume | Ads comp | SERP quality |
|---|---|---|---|
| WordPress | 390 | LOW 23 | Plugin pages, small blogs |
| Shopify | 20 | LOW 3 | **Forums, personal blogs — weakest found** |
| Webflow | 20 | LOW 0 | Thin |
| Squarespace | 10 | LOW 5 | Thin |
| Framer | 10 | LOW 6 | Thin |
| Next.js | 10 | LOW 4 | Thin — **and it's your own stack** |
| Wix, Ghost, Astro, Drupal, BigCommerce, WooCommerce, Notion, HubSpot, Craft, Sanity, Contentful, Magento | unmeasured | — | Long tail, near-zero competition |

Each page must contain, or it doesn't ship:
1. Steps **verified by actually doing it** on that platform
2. A real, working example file
3. Platform-specific gotchas (e.g. Shopify's `llms.txt.liquid` template vs the CDN-redirect workaround)
4. The tool, pre-scoped to that platform
5. Honest statement of what llms.txt does and doesn't do
6. Link up to `/answer-engine-optimization`

**Quality bar (Phase 20):** "what can StillAwake add that isn't in the SERP?" → *verified first-hand implementation on that specific platform, plus a free entity-gap analyser no competitor offers.* That answer holds for every page in this set. It does **not** hold for a 40-page "what is llms.txt in [language]" set, which is why that isn't recommended.

### FIRST 10 (in order)

| # | Target query | Vol | Type | URL | Why we can win |
|---|---|---|---|---|---|
| 1 | *(structural)* | — | **Fix orphan** | Link `/tools/llms-txt-generator` from footer, nav, AEO page, 4 articles; build `/tools` index | Zero inbound links today. Highest leverage on the site. |
| 2 | `llms txt generator` | 480 US / 90 CA | Improve existing | `/tools/llms-txt-generator` | Tool SERP of small players; you have the better tool |
| 3 | `llms txt shopify` | 20 US | New | `/tools/llms-txt/shopify` | Weakest SERP found; Blackwater = real Shopify evidence |
| 4 | `llms txt nextjs` | 10 US | New | `/tools/llms-txt/nextjs` | Your own stack; strongest possible first-hand proof |
| 5 | `llms txt wordpress` | 390 US | New | `/tools/llms-txt/wordpress` | Highest-volume platform variant |
| 6 | *(consolidation)* | — | **Merge** | `what-is-aeo` + `what-is-generative-engine-optimization` → one | Removes cannibalization |
| 7 | `llms txt webflow` | 20 US | New | `/tools/llms-txt/webflow` | Thin SERP |
| 8 | `llms txt framer` | 10 US | New | `/tools/llms-txt/framer` | You sell Framer development |
| 9 | `llms txt squarespace` | 10 US | New | `/tools/llms-txt/squarespace` | Thin SERP |
| 10 | `seo ia` / `référencement ia` | 170 / 10 CA-FR | Improve | `/fr/referencement-ia` + FR tool mirror | Near-zero FR competition |

**Every one of these links up to `/answer-engine-optimization` (or `/fr/referencement-ia`). That is the commercial page this whole cluster exists to strengthen.**

### NEXT 10

11. `/fr/outils/generateur-llms-txt` — French tool mirror
12–15. French platform guides: Shopify, WordPress, Next.js, Webflow
16. `llms txt example` (170 US) — real annotated examples
17. `how to create llms txt` (20 US) — implementation, not definition
18. **Original research asset** — see §21
19. `/fr/fiche-google-entreprise` improvement (90/mo, growing)
20. `/seo-montreal` depth pass (only page at pos 16.2)

### LATER
`answer engine optimization` depth · `ai search optimization` · `shopify development` + Blackwater proof · `custom software development` + BankDeMark/NAVTRL proof · remaining platform long tail · Loi 25 implementation angle

### ⚠️ Do NOT target yet
`llms txt` (6,600) · `what is llms txt` (480) · `ai seo` (14,800) · `generative engine optimization` (5,400) · `geo vs seo` (2,900) · `headless cms` (880) · `loi 25` (6,600) · `web design montreal` · `agence web montréal`

All have real demand. All have SERPs owned by Ahrefs, Semrush, Search Engine Land, CMS vendors, the Québec government, or entrenched local agencies. Chasing them now repeats the current mistake.

---

## 21. Link-earning strategy

The authority gap is the binding constraint. Content alone will not close it.

**Tier 1 — assets that deserve citation:**
1. **The tool itself** — free, no signup, no email. Already true. It just needs to be *findable*.
2. **Original research: an AI-readiness study.** Run the analyser across a defined population (e.g. 200 Canadian SMB sites, or 200 Shopify stores) and publish the aggregate findings: what % have llms.txt, what % state pricing, what % declare a service area, what % have organization markup. **This is the single best link asset available**, and StillAwake is one of very few studios that can generate it, because the analyser already exists.
   - ⚠️ **Publish aggregate and anonymised.** Do not publish a named scorecard ranking real businesses as "AI-unready" — that is reputationally hostile to the exact people you want as clients, and it invites disputes. Aggregate findings earn links; naming and shaming earns problems.
3. **Open-source the analyser** (or a core piece of it). GitHub repos rank in this exact SERP — firecrawl's does.
4. **The honest-efficacy position** — a well-argued "llms.txt probably doesn't do what vendors say, here's what we measured" is genuinely citable in a niche full of hype.

**Tier 2 — legitimate, unglamorous:**
Shopify/Vercel/Supabase partner directories · Québec business citations and GBP (supports the local pillar) · podcasts and developer communities · Shopify Dev Community (a forum thread already ranks for `llms.txt Shopify`) · technology-partner links.

**Explicitly excluded:** directory spam, PBNs, paid links, fake guest posts, reciprocal schemes.

---

## 22. THE FIRST FIVE WINS

The most important output of this project.

### 1. `/tools/llms-txt-generator` — fix the orphan, own `llms txt generator`
- **Volume:** 480/mo US · 90/mo CA · `llms txt file` 880/mo US
- **Geography:** Non-geographic (US + CA + global)
- **Difficulty:** **ATTAINABLE** — SERP is firecrawl, SiteSpeakAI, AdNabu, WordLift, LLMrefs, llmstxtgenerate. No major brand.
- **Action:** Improve existing. Add inbound links from footer (38 links, currently zero to the tool), header nav, `/answer-engine-optimization`, and all four AEO articles. Create `/tools` index.
- **Why we win:** the tool exists, works, has tests, and does entity-gap analysis nobody else does.
- **Assets needed:** none — build already done. Only linking and a methodology section.
- **Ladder role:** **L2 hub.** Everything else in the cluster links to it.

### 2. `/tools/llms-txt/shopify` — `llms txt shopify`
- **Volume:** 20/mo US (low, but see below)
- **Difficulty:** **HIGH-OPPORTUNITY** — the weakest SERP in this entire research: forum threads, personal blogs, independent consultants.
- **Why we win:** real Shopify delivery experience (Blackwater), plus Shopify's native `llms.txt.liquid` template is new enough that most ranking pages document the outdated CDN-redirect workaround.
- **Commercial bridge:** links to `/shopify-development` (480/mo, **+43%** — a growing commercial term).
- **Ladder role:** **L1 entry.**

### 3. `/tools/llms-txt/nextjs` — `llms txt nextjs`
- **Volume:** 10/mo US ⚠️ low measured demand — justified on SERP weakness, expertise and linkability, not volume
- **Difficulty:** **HIGH-OPPORTUNITY** — thin, largely unanswered
- **Why we win:** it is StillAwake's own stack. This site's `/llms.txt` route is a live, inspectable reference implementation. Strongest possible first-hand proof.
- **Bonus:** most likely page in the set to earn developer links.
- **Ladder role:** **L1 entry + link asset.**

### 4. `/tools/llms-txt/wordpress` — `llms txt wordpress`
- **Volume:** **390/mo US** — highest-volume platform variant
- **Difficulty:** **ATTAINABLE** — plugin pages and small blogs
- **Why we win:** StillAwake has a documented position on migrating off WordPress (`why-modern-businesses-are-moving-away-from-wordpress`, `/fr/articles/quitter-wordpress`). Genuine, non-generic point of view.
- **Ladder role:** **L2 volume anchor.**

### 5. `/fr/referencement-ia` + `/fr/outils/generateur-llms-txt` — French mirror
- **Volume:** `seo ia` 170/mo CA-FR · `geo seo` 480/mo CA-FR · `référencement ia` 10/mo
- **Difficulty:** **ATTAINABLE** — near-zero French competition; the French vocabulary for this field hasn't settled
- **Why we win:** genuinely bilingual, correct hreflang already implemented, and TravelDesign By Lisa is real proof of bilingual SEO delivery.
- **Honest framing:** this is a **differentiation and AI-citation play, not a traffic forecast.** French volume is small. The value is being the only credible French-language voice in the cluster when the terminology settles — and being citable by French-language assistants, which is the service being sold.
- **Ladder role:** **L1/L2, French locale.**

**Internal linking plan for all five:**
```
Footer + header nav
    └─► /tools (new index)
            └─► /tools/llms-txt-generator  ◄── 4 AEO articles, /answer-engine-optimization
                    ├─► /tools/llms-txt/shopify   ──► /shopify-development
                    ├─► /tools/llms-txt/nextjs    ──► /software-development
                    ├─► /tools/llms-txt/wordpress ──► /website-redesign
                    └─► /tools/llms-txt/webflow|framer|squarespace
                            └─ all link up ──► /answer-engine-optimization
                                                    └─► /contact
FR mirror: /fr/outils/... ──► /fr/referencement-ia ──► /fr/contact
```

---

## 23. 90 / 180 / 365-day plan

No ranking promises on dates. Rankings aren't controllable; the inputs are.

### 0–90 days — fix what exists, ship the wedge
- Un-orphan the tool; build `/tools` index; add footer + nav links
- Merge the two AEO explainer articles; point the cluster at one owner
- Ship first-five pages 2–5
- Add author attribution + Person schema to technical articles
- Label owned-vs-client projects correctly on all `/work` pages
- Resolve the `/technical-seo` sitemap anomaly
- **Audit the 33 French articles** — consolidate or noindex those targeting zero-volume queries
- Deepen `/seo-montreal` (pos 16.2) and `/fr/prix-site-web-quebec` (pos 14) — the only two striking-distance pages
- Local hygiene: GBP, citations, NAP consistency

### 90–180 days — complete the cluster, start earning links
- Remaining platform guides EN + FR
- **Publish the aggregate AI-readiness research** (§21) — the primary link asset
- Consider open-sourcing the analyser core
- Refresh whichever early pages show first impressions
- Strengthen `/shopify-development` and `/software-development` with case-study proof
- Begin partner-directory and community link work

### 180–365 days — move up the ladder
- Attack `answer engine optimization` (2,400/mo US) and `ai search optimization` (3,600/mo US) with the cluster behind them
- Second original-research edition (year-over-year change is inherently linkable)
- Re-evaluate `headless cms` and `what is llms txt` — only if referring domains have actually grown
- Reconsider Montréal terms only if local signals have materially improved

---

## 24. Measurement framework

Leading indicators, because rankings will lag. **Baselines are today's measured values:**

| Metric | Baseline (2026-08-14) | 90d target | 180d target |
|---|---|---|---|
| Pages with ≥1 impression | **26 / 132 (20%)** | 45 | 70 |
| Total impressions (90d) | **~35–49** | 500 | 2,500 |
| Distinct non-brand queries | **15** | 60 | 200 |
| Non-brand queries in top 50 | ~3 | 25 | 80 |
| Non-brand queries in top 20 | **1** | 8 | 25 |
| Non-brand queries in top 10 | **0** | 2 | 10 |
| Non-brand clicks | **0** | 15 | 100 |
| Referring domains | *unmeasured — Ahrefs unavailable* | establish baseline first | +10 |
| `/tools/*` impressions | **0** | 200 | 1,000 |
| `/answer-engine-optimization` impressions | **0** | 100 | 500 |
| FR pages with impressions | **0 / 33** | 8 | 20 |
| Qualified inbound leads (organic) | 0 | 2 | 8 |

**The first honest signal of success is not a ranking. It is `Pages with ≥1 impression` moving from 26 toward 45, and `distinct non-brand queries` moving from 15 toward 60.** That is Google discovering the site has a subject.

**Action required:** top up Ahrefs or Semrush to establish a referring-domain baseline. The authority-gap diagnosis in §11 is currently inferred, not measured.

---

## 25. The highest-value commercial keyword we can realistically work toward

**`answer engine optimization`** — 2,400/mo US, 320/mo CA, MEDIUM competition (index 41–48), $16.04–$46.40 top-of-page bids.

That bid range is the tell: advertisers pay $16–46 per click. It is a real, high-value commercial term. Its SERP is MODERATE, not VERY HARD — mixed SEO SaaS and agencies, no untouchable incumbent. StillAwake already has the commercial page, and it is already well-linked internally (13 inbound sources).

It is reachable **only from underneath** — via a completed llms.txt cluster feeding it relevance and links. That is precisely what the first five build.

---

## THE STILLAWAKE SEO ENTRY POINT

**Where we begin:** the free llms.txt generator you already built, plus a small set of platform-specific implementation pages in English and French that link into it.

**Why:**

You are not losing because you lack content. You have 132 pages and 69 articles, and 106 of them have never been shown to a single searcher. You are losing for three measurable reasons.

First, **the market you are targeting is emptying out.** Google's own twelve-month data shows `agence site web` down 91%, `agence marketing web` down 94%, `top web design companies` down 92%, `web designing company` down 79%. Nearly every "hire an agency" query in both languages has lost most of its volume in a year. You are ranked position 96 on a category that is shrinking. Winning it would be a diminishing prize.

Second, **your only real asset is invisible.** `/tools/llms-txt-generator` is working software — SSRF-guarded, rate-limited, tested — and it does something none of its six competitors do: it tells you what an answer engine *cannot* determine about your business. It has zero inbound internal links. Not one. It is in your sitemap and your schema map and nowhere else on your own website.

Third, **there is a market moving in the opposite direction, and you are already standing in it.** The llms.txt and AI-search cluster measures 40,290 searches/month in the US with 16 of 23 terms at LOW competition. `llms txt` alone is 6,600/mo at competition index 10.

The discipline that makes this work is knowing which half of that cluster you can take. `what is llms.txt` is owned by Ahrefs, Semrush, Search Engine Land, Chrome for Developers and GitBook — you will not win the definition. But `llms.txt generator` is owned by six small tools, and `llms.txt for Shopify` is owned by forum threads and personal blogs. **You win tool intent and implementation intent. You lose definition intent.** Every page in this plan respects that line.

**How it leads to the commercial keywords you actually want:**

The platform pages are L1 — specific, weak SERPs, real first-hand implementation, near-zero competition. They exist to teach Google one thing: *this domain is about making websites legible to AI systems.*

They all link up to the tool, and the tool links up to `/answer-engine-optimization` — a page targeting a 2,400/mo term where advertisers pay $16–46 a click, on a MODERATE SERP with no untouchable incumbent. That is the money term, and it is reachable from underneath once the cluster beneath it exists.

The tool and the aggregate AI-readiness research are the only assets you have that can earn links without begging for them. Links are the binding constraint on everything above L3.

And the French mirror costs little, faces almost no competition, and makes you the only credible French-language voice in this field — which matters twice, because being citable by a French-language AI assistant *is the product you are selling*.

**One last thing, said plainly:** programmatic is the right shape for this, but only because you have a tool. Twenty platforms × two languages, each page carrying a verified working file and a real gap report, is a utility replicated across a dimension. Forty pages of "what is llms.txt, in French" is what you already tried, and it produced zero clicks. The tool is what makes the difference between those two outcomes.

**Start by adding one link to your footer.**

---
---

# APPENDIX A — TOP 50 KEYWORD OPPORTUNITY TABLE

All volume / competition / bid figures are **measured Google Ads Keyword Planner data**, retrieved live 2026-08-14. Bids in local currency, top-of-page range. Organic difficulty is **my own classification from live SERP inspection**, never derived from Ads competition.

Legend — **Action:** `PURSUE NOW` · `PURSUE AFTER CLUSTER` · `IMPROVE EXISTING` · `LONG-TERM` · `REJECT (now)`
⚠️ = trend computed off a base under 40 searches/month; treat as directional only.

| # | Keyword | Lang | Geo | Intent | Vol/mo | Trend | Ads comp | Idx | Low bid | High bid | Organic difficulty | Current pos | Existing URL | Recommended URL | Score | Level | Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | llms txt generator | EN | US | Transactional/tool | 480 | +7% | LOW | 31 | $1.12 | $7.24 | **ATTAINABLE** | — | `/tools/llms-txt-generator` | same | **83** | L2 | **PURSUE NOW** |
| 2 | llms txt shopify | EN | US | Implementation | 20 | −33%⚠️ | LOW | 3 | — | — | **HIGH-OPPORTUNITY** | — | — | `/tools/llms-txt/shopify` | **80** | L1 | **PURSUE NOW** |
| 3 | answer engine optimization | EN | US | Commercial | 2,400 | +6% | MEDIUM | 41 | $16.04 | $46.40 | MODERATE | — | `/answer-engine-optimization` | same | **77** | L4 | PURSUE AFTER CLUSTER |
| 4 | llms txt nextjs | EN | US | Implementation | 10 | 0% | LOW | 4 | — | — | **HIGH-OPPORTUNITY** | — | — | `/tools/llms-txt/nextjs` | **73** | L1 | **PURSUE NOW** |
| 5 | shopify development | EN | CA | Commercial | 480 | **+43%** | LOW | 9 | $6.93 | $45.70 | MODERATE | 5.0 | `/shopify-development` | same | **72** | L3 | IMPROVE EXISTING |
| 6 | llms txt wordpress | EN | US | Implementation | 390 | +23%⚠️ | LOW | 23 | — | — | **ATTAINABLE** | — | — | `/tools/llms-txt/wordpress` | **65** | L2 | **PURSUE NOW** |
| 7 | prix site web québec | FR | QC | Commercial | 40 | −25% | MEDIUM | 41 | $3.07 | $10.21 | MODERATE | **14** | `/fr/prix-site-web-quebec` | same | **65** | L3 | IMPROVE EXISTING |
| 8 | llms txt file | EN | US | Informational | 880 | −13% | LOW | 17 | $0.46 | $6.13 | HARD | — | — | `/tools/llms-txt-generator` | 62 | L2 | PURSUE AFTER CLUSTER |
| 9 | fiche google entreprise | FR | QC | Informational | 90 | **40→140** | LOW | 17 | $5.26 | $25.50 | MODERATE | — | `/fr/fiche-google-entreprise` | same | **58** | L3 | IMPROVE EXISTING |
| 10 | llms txt example | EN | US | Informational | 170 | −22% | LOW | 13 | $0.92 | $4.21 | ATTAINABLE | — | — | `/tools/llms-txt/examples` | 58 | L2 | PURSUE AFTER CLUSTER |
| 11 | what is llms txt | EN | US | Informational | 480 | +18% | LOW | 25 | $0.93 | $5.27 | **VERY HARD** | — | — | — | 57 | L5 | **REJECT (now)** |
| 12 | web design montreal | EN | Montréal | Commercial | — | — | — | — | — | — | **VERY HARD** | **59.7** | `/web-design-montreal` | same | 56 | L4 | **REJECT (now)** |
| 13 | loi 25 site web | FR | QC | Implementation | 20 | −20%⚠️ | MEDIUM | 43 | $2.00 | $7.41 | ATTAINABLE | — | `/fr/articles/loi-25-cookies-consentement` | same | **56** | L1 | LONG-TERM |
| 14 | llms txt webflow | EN | US | Implementation | 20 | −50%⚠️ | LOW | 0 | — | — | **HIGH-OPPORTUNITY** | — | — | `/tools/llms-txt/webflow` | 55 | L1 | **PURSUE NOW** |
| 15 | llms txt framer | EN | US | Implementation | 10 | 0% | LOW | 6 | — | — | **HIGH-OPPORTUNITY** | — | — | `/tools/llms-txt/framer` | 55 | L1 | PURSUE AFTER CLUSTER |
| 16 | llms txt squarespace | EN | US | Implementation | 10 | +25%⚠️ | LOW | 5 | — | — | **HIGH-OPPORTUNITY** | — | — | `/tools/llms-txt/squarespace` | 54 | L1 | PURSUE AFTER CLUSTER |
| 17 | llms txt seo | EN | US | Informational | 260 | −33% | LOW | 29 | $3.66 | $8.81 | MODERATE | — | — | `/answer-engine-optimization` | 54 | L2 | PURSUE AFTER CLUSTER |
| 18 | seo montreal | EN | Montréal | Commercial | — | — | — | — | — | — | HARD | **16.2** | `/seo-montreal` | same | 53 | L4 | IMPROVE EXISTING |
| 19 | seo ia | FR | CA | Informational | 170 | +8% | MEDIUM | 59 | $4.25 | $18.94 | ATTAINABLE | — | `/fr/referencement-ia` | same | 53 | L2 | **PURSUE NOW** |
| 20 | custom software development | EN | CA | Commercial | 260 | −44% | LOW | 16 | $8.18 | $35.28 | HARD | 5.5 | `/software-development` | same | 52 | L4 | IMPROVE EXISTING |
| 21 | how to create llms txt | EN | US | Implementation | 20 | −29%⚠️ | MEDIUM | 45 | $1.35 | $17.44 | ATTAINABLE | — | — | `/tools/llms-txt-generator` | 52 | L2 | PURSUE AFTER CLUSTER |
| 22 | ai search optimization | EN | US | Commercial | 3,600 | +140% | LOW | 33 | $1.29 | $52.29 | HARD | — | — | `/answer-engine-optimization` | 51 | L4 | LONG-TERM |
| 23 | développement logiciel | FR | QC | Commercial | 210 | **+15%** | MEDIUM | 34 | $3.66 | $33.18 | MODERATE | — | `/fr/developpement-logiciel` | same | 51 | L3 | IMPROVE EXISTING |
| 24 | geo seo | FR | CA | Informational | 480 | 0% | MEDIUM | 64 | $3.74 | $13.30 | MODERATE | — | — | `/fr/referencement-ia` | 50 | L3 | PURSUE AFTER CLUSTER |
| 25 | custom software development companies | EN | CA | Commercial | 140 | **+48%** | LOW | 12 | $2.76 | $48.92 | HARD | — | `/software-development` | same | 50 | L4 | LONG-TERM |
| 26 | chatgpt seo | EN | US | Informational | 480 | −34% | LOW | 23 | $7.28 | $25.82 | HARD | — | `/stillawake-times/can-chatgpt-recommend-my-business` | same | 49 | L3 | IMPROVE EXISTING |
| 27 | how to rank in chatgpt | EN | US | Informational | 170 | +91% | LOW | 13 | $8.89 | $23.68 | MODERATE | — | — | `/answer-engine-optimization` | 49 | L3 | PURSUE AFTER CLUSTER |
| 28 | shopify development agency | EN | CA | Commercial | 50 | **+156%**⚠️ | LOW | 19 | $20.05 | $186.22 | MODERATE | — | `/shopify-development` | same | 48 | L3 | IMPROVE EXISTING |
| 29 | ai overviews seo | EN | US | Informational | 170 | −35% | LOW | 15 | $12.12 | $31.20 | MODERATE | — | — | `/answer-engine-optimization` | 48 | L3 | PURSUE AFTER CLUSTER |
| 30 | core web vitals | EN | CA | Informational | 480 | **+56%** | LOW | 20 | $2.63 | $15.32 | HARD | — | `/stillawake-times/core-web-vitals-guide` | same | 47 | L3 | IMPROVE EXISTING |
| 31 | loi 25 checklist | FR | QC | Implementation | 10 | −29%⚠️ | — | — | — | — | ATTAINABLE | — | — | `/fr/outils/checklist-loi-25` | 47 | L1 | LONG-TERM |
| 32 | perplexity seo | FR | CA | Informational | 20 | −53%⚠️ | LOW | 29 | — | — | ATTAINABLE | — | — | `/fr/referencement-ia` | 46 | L2 | PURSUE AFTER CLUSTER |
| 33 | supabase vs firebase | EN | CA | Comparison | 260 | −6% | LOW | 13 | $0.63 | $10.56 | HARD | — | — | — | 45 | L3 | LONG-TERM |
| 34 | shopify headless | EN | CA | Implementation | 140 | **+15%** | MEDIUM | 36 | $8.48 | $26.91 | MODERATE | — | — | `/shopify-development` | 45 | L3 | LONG-TERM |
| 35 | how much does a website cost | EN | CA | Commercial | 210 | −7% | MEDIUM | 51 | $2.24 | $7.44 | HARD | — | `/website-cost-canada` | same | 45 | L4 | IMPROVE EXISTING |
| 36 | custom web development | EN | CA | Commercial | 110 | −8% | LOW | 16 | $10.92 | $33.39 | HARD | — | `/services` | same | 44 | L4 | LONG-TERM |
| 37 | loi 25 consentement | FR | QC | Implementation | 40 | −33% | MEDIUM | 38 | $1.33 | $4.26 | MODERATE | — | `/fr/articles/loi-25-cookies-consentement` | same | 44 | L2 | LONG-TERM |
| 38 | website maintenance cost | EN | CA | Commercial | 50 | −47% | LOW | 24 | $2.20 | $11.82 | MODERATE | — | `/website-maintenance` | same | 43 | L3 | IMPROVE EXISTING |
| 39 | politique de confidentialité loi 25 | FR | QC | Implementation | 30 | −33% | MEDIUM | 48 | $1.20 | $7.52 | MODERATE | — | — | `/fr/outils/politique-confidentialite` | 43 | L2 | LONG-TERM |
| 40 | référencement ia | FR | CA | Commercial | 10 | 0% | MEDIUM | 41 | $5.07 | $18.57 | **ATTAINABLE** | — | `/fr/referencement-ia` | same | 42 | L2 | **PURSUE NOW** |
| 41 | strapi cms | EN | CA | Informational | 210 | **+15%** | LOW | 28 | $5.07 | $20.13 | **VERY HARD** (vendor) | — | — | — | 40 | L5 | REJECT (now) |
| 42 | headless cms | EN | CA | Informational | 880 | **+86%** | LOW | 20 | $5.57 | $20.89 | **VERY HARD** (vendor) | — | — | — | 40 | L5 | REJECT (now) |
| 43 | fichier llms txt | FR | CA | Informational | 10 | 0% | MEDIUM | 38 | — | — | ATTAINABLE | — | — | `/fr/outils/generateur-llms-txt` | 40 | L1 | **PURSUE NOW** |
| 44 | website redesign services | EN | CA | Commercial | 720 | **−60%** | LOW | 13 | $2.77 | $18.80 | HARD | — | `/website-redesign` | same | 38 | L4 | IMPROVE EXISTING |
| 45 | loi 25 | FR | QC | Informational | **6,600** | −2% | MEDIUM | 36 | $1.10 | $4.53 | **VERY HARD** (gov/legal) | — | — | — | 35 | L5 | **REJECT (now)** |
| 46 | generative engine optimization | EN | US | Informational | 5,400 | −45% | MEDIUM | 54 | $16.27 | $43.37 | HARD | — | `/stillawake-times/what-is-generative-engine-optimization` | merge | 34 | L5 | REJECT (now) |
| 47 | geo vs seo | EN | US | Comparison | 2,900 | −45% | MEDIUM | 36 | $4.45 | $37.87 | HARD | — | — | — | 33 | L5 | REJECT (now) |
| 48 | ai seo | EN | US | Informational | **14,800** | 0% | MEDIUM | 44 | $1.04 | $41.44 | **VERY HARD** | — | — | — | 32 | L5 | **REJECT (now)** |
| 49 | agence web montréal | FR | QC | Commercial | 880 | **−26%** | MEDIUM | 41 | $3.35 | $13.93 | **VERY HARD** | **69.8** | `/fr/agence-web-montreal` | same | 30 | L4 | REJECT (now) |
| 50 | agence seo | FR | QC | Commercial | 480 | **−78%** | LOW | 26 | $4.68 | $20.14 | HARD | — | `/fr/agence-seo-montreal` | same | 25 | L4 | **REJECT (now)** |

**Reading the bottom of this table matters as much as the top.** Rows 45–50 have the largest volumes in the whole dataset (`loi 25` 6,600 · `ai seo` 14,800 · `agence web` 880). They score lowest because volume is 10% of the model and attainability is 20%. That is the model working as intended.

---

# APPENDIX B — TOPICAL MAP

```
════════════════════════════════════════════════════════════════════
COMMERCIAL PILLAR 1 — ANSWER ENGINE OPTIMIZATION          ★ PRIMARY
  /answer-engine-optimization        ⟷ hreflang ⟷  /fr/referencement-ia
  target: answer engine optimization (2,400/mo US · 320/mo CA)
════════════════════════════════════════════════════════════════════
│
├─ HUB / TOOL ASSET ──────────────────────────────────────────────
│   /tools  (NEW index)  ◄── footer + header nav
│     └─ /tools/llms-txt-generator          ★ FIRST WIN
│          target: llms txt generator (480/mo US · 90/mo CA)
│          ⟶ links to: /answer-engine-optimization, /contact
│          ⟵ links from: footer, nav, /tools, all 4 AEO articles
│
├─ IMPLEMENTATION CLUSTER (the programmatic engine) ──────────────
│   /tools/llms-txt/shopify      llms txt shopify (20)      ⟶ /shopify-development
│   /tools/llms-txt/nextjs       llms txt nextjs (10)       ⟶ /software-development
│   /tools/llms-txt/wordpress    llms txt wordpress (390)   ⟶ /website-redesign
│   /tools/llms-txt/webflow      llms txt webflow (20)      ⟶ /answer-engine-optimization
│   /tools/llms-txt/framer       llms txt framer (10)       ⟶ /framer-development
│   /tools/llms-txt/squarespace  llms txt squarespace (10)  ⟶ /website-redesign
│   ‹later: wix · ghost · astro · drupal · bigcommerce · woocommerce ›
│   ALL ⟶ /tools/llms-txt-generator ⟶ /answer-engine-optimization
│
├─ DECISION / EDUCATIONAL ────────────────────────────────────────
│   /stillawake-times/what-is-aeo-...  ⊕ MERGE ⊕  what-is-generative-...
│   /stillawake-times/can-chatgpt-recommend-my-business  (chatgpt seo, 480)
│   /tools/llms-txt/examples            llms txt example (170)
│   ALL ⟶ /answer-engine-optimization
│
├─ EVIDENCE / LINK ASSETS ────────────────────────────────────────
│   AI-Readiness Study (aggregate, anonymised)      ★ primary link asset
│   Open-sourced analyser core (GitHub)
│   /work/bankdemark  — Lighthouse + ranking proof   [OWNED PRODUCT]
│
└─ FRENCH MIRROR ─────────────────────────────────────────────────
    /fr/referencement-ia          seo ia (170) · référencement ia (10)
    /fr/outils/generateur-llms-txt   fichier llms txt (10)     ★ FIRST WIN
    /fr/etre-cite-par-ia          guide (distinct from service page)
    ALL ⟶ /fr/referencement-ia ⟶ /fr/contact

════════════════════════════════════════════════════════════════════
COMMERCIAL PILLAR 2 — SHOPIFY & ECOMMERCE              ★ SECONDARY
  /shopify-development  ⟷ hreflang ⟷  /fr/developpement-shopify
  target: shopify development (480/mo CA, +43%)
════════════════════════════════════════════════════════════════════
├─ /tools/llms-txt/shopify                        (cross-pillar link)
├─ /shopify-vs-woocommerce  ⟷  /fr/shopify-vs-woocommerce
├─ /fr/boutique-en-ligne-quebec
└─ EVIDENCE: /work/blackwater-aquatics    [SEPARATE VENTURE — label clearly]

════════════════════════════════════════════════════════════════════
COMMERCIAL PILLAR 3 — CUSTOM SOFTWARE                  ★ SECONDARY
  /software-development ⟷ hreflang ⟷ /fr/developpement-logiciel
  target: custom software development (260/mo CA) · développement logiciel (210/mo QC, +15%)
════════════════════════════════════════════════════════════════════
├─ /stillawake-times/what-is-custom-software-development
├─ /stillawake-times/what-is-a-custom-web-application
├─ /tools/llms-txt/nextjs                         (cross-pillar link)
└─ EVIDENCE: /work/bankdemark [OWNED] · /work/stalkr-navtrl [CLIENT]
             StillAwake Embedded CMS [OWNED PRODUCT]

════════════════════════════════════════════════════════════════════
PILLAR 4 — CUSTOM / EMBEDDED CMS          ⚠ SUPPORTING ONLY
  Strongest first-hand expertise · vendor-owned SERPs
  → fold under Pillars 1 & 3 as evidence, not a standalone pillar
════════════════════════════════════════════════════════════════════

════════════════════════════════════════════════════════════════════
PILLAR 5 — MONTRÉAL / QUÉBEC LOCAL        ⚠ MAINTAIN, DO NOT INVEST
  /seo-montreal (pos 16.2 — best striking distance, worth depth)
  /fr/prix-site-web-quebec (pos 14 — closest FR win)
  /fr/fiche-google-entreprise (90/mo, growing 40→140)
  /web-design-montreal (pos 59.7 — authority+local gap, not content)
  → fix GBP, citations, NAP. Do not treat as growth engine.
════════════════════════════════════════════════════════════════════
```

**One primary intent → one primary page.** Where two pages currently share an intent (the two AEO explainers), one is merged and 301'd. Where a page has no measurable demand behind it (several of the 33 French articles), it is consolidated or noindexed rather than left to dilute the cluster.

