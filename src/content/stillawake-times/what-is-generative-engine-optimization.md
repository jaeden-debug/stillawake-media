---
title: "Generative Engine Optimization (GEO) and AEO: The Complete Guide"
date: "2026-08-12"
updated: "2026-10-29"
excerpt: "GEO is the work of making your business findable, understandable and citable inside AI-generated answers. What it is, how it differs from SEO and ChatGPT SEO, and what works."
category: "AI Search"
featured: true
author: "Jaeden Doody"
---

**Generative Engine Optimization (GEO) is the practice of making your website and business information easy for AI systems — ChatGPT, Perplexity, Gemini, Claude and Google's AI Overviews — to find, understand, trust and cite when they generate an answer.** Where classic SEO competes for a position in a list of links, GEO competes for a place inside the answer itself. Nobody can guarantee that placement, but a large share of what decides it is in your control, and most of it is the same work good SEO already requires.

This guide defines the terms that get blurred together (SEO, AEO, GEO, "ChatGPT SEO"), explains what the platforms actually document about how they find sources, separates that from the hypotheses the industry repeats as fact, and lays out the playbook we run on our own properties — this site, [Zylx Studio](https://zylx.ai) and the builds in [our case studies](/work).

## Where the term GEO comes from

"Generative Engine Optimization" was introduced in an academic paper, [*GEO: Generative Engine Optimization*](https://arxiv.org/abs/2311.09735), first posted in November 2023 by researchers from Princeton University and IIT Delhi, among others, and accepted to KDD 2024. The authors built a benchmark of queries (GEO-bench), tested content edits against a simulated GPT-3.5 answer engine and against Perplexity, and measured how much of each generated answer was attributed to a given source.

What they reported, stated carefully:

- Some edits — adding cited sources, relevant quotations and statistics — increased a source's visibility in generated answers, by up to roughly 40% on their metrics.
- Keyword stuffing offered little to no improvement and in some tests performed worse than the unedited baseline.
- Results varied by domain, so no single technique won everywhere.

What the paper does not show: that these numbers transfer to today's production ChatGPT, Gemini or AI Overviews, which use different retrieval systems and change constantly. It is a useful early signal that *evidence-dense, attributable content* gets used more, not a ranking formula. Anyone quoting "40% more AI traffic" from it is overstating it.

## SEO, AEO, GEO and AI-assisted search: the definitions

The terms overlap and vendors blur them constantly. Here's the honest breakdown:

| Term | What it optimizes for | Success looks like |
| --- | --- | --- |
| **Traditional SEO** | Ranked lists of links in Google and Bing | Your page ranks and gets the click |
| **AEO** (Answer Engine Optimization) | Being selected as *the* answer: featured snippets, voice answers, AI answers | Your passage or fact is what the user reads |
| **GEO** (Generative Engine Optimization) | Generated responses assembled from several sources | Your business is cited, linked or recommended inside the generated text |
| **AI-assisted search** | Not a discipline — the product category | Google AI Overviews and AI Mode, ChatGPT search, Perplexity, Copilot, Claude with web search |

**AEO** is the content layer: direct answers, self-contained passages, facts that can be quoted out of context. The one-sentence version: **SEO gets you ranked; AEO gets you quoted.** In SEO the unit of competition is the page; in AEO it is the passage. A page can rank well and still be unquotable — buried answers, vague claims, pricing hidden behind a contact form.

**GEO** extends that into machine-facing infrastructure and reputation: crawler access, structured data, entity consistency, and the third-party sources that generative engines draw on to corroborate you. AEO and GEO are not rival products, which is why they are covered together here.

**AI-assisted search** is simply where this plays out. It matters as a term because each product has its own crawler, its own index or search partner, and its own citation behaviour, which is why "optimize for AI" is never one setting.

## How generative engines find and choose sources

There are two separate mechanisms, and most advice confuses them:

1. **Training data.** A model learns about the world, including businesses, from data collected before it was trained. You can't edit this directly, and it changes only when new models ship.
2. **Live retrieval.** When an assistant searches the web at answer time — Perplexity on nearly every question, ChatGPT search, Google AI Overviews and AI Mode, Claude with web search — it fetches pages, reads them and cites some of them. This is the mechanism you can actually work on.

### What the platforms document

As of October 2026, the vendors publish surprisingly little, but what they do publish is specific:

- **Google** says there are [no additional requirements to appear in AI Overviews or AI Mode](https://developers.google.com/search/docs/appearance/ai-features): a page must be indexed and eligible to show in Search with a snippet, and no special files, markup or AI-specific schema are needed. Google also documents "query fan-out" — running multiple related searches across subtopics to assemble the answer — which is why pages can be cited for questions they don't rank first for.
- **OpenAI** says that for content to appear in ChatGPT search answers, a site [must not block OAI-SearchBot](https://developers.openai.com/api/docs/bots), and its [publisher FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq) says referrals from ChatGPT search carry `utm_source=chatgpt.com`.
- **Perplexity** documents that [PerplexityBot](https://docs.perplexity.ai/guides/bots) exists to surface and link websites in its results.
- **Anthropic** documents that [blocking Claude-SearchBot or Claude-User](https://support.claude.com/en/articles/8896518) may reduce a site's visibility in Claude's search results.

Nobody documents the selection criteria beyond that. Everything else — including the factors below — is inference.

### What appears to matter (hypotheses, with reasoning)

These are patterns observed in cited sources, consistent with how retrieval-augmented systems work and with our own testing. Treat them as well-supported working assumptions, not documented rules.

**1. Machine-legible identity.** An engine has to resolve *who you are* before it can recommend you. Consistent naming, a stable organization entity, a real author, and properties that agree with each other all reduce ambiguity.

**2. Extractable facts.** A price hidden behind "book a call" can't be quoted. A price in plain text — like our SEO plans at $250–$850 CAD/month on the [pricing page](/pricing) — can be. The same goes for service areas, process and timelines.

**3. Question-shaped content.** Generated answers respond to questions, so passages that state the question and answer it in the first sentence are easier to lift than conclusions built over eight paragraphs.

**4. Verifiable specifics.** "Award-winning agency" gives an engine nothing. "Took a trilingual travel platform from zero organic clicks to page-1 rankings in 8 weeks," in a [dated case study](/work/lisa-travel-design) with its sources, is a checkable claim.

**5. Corroboration.** Engines appear to weigh whether independent sources agree with you. This is where GEO departs most from on-page SEO, and it gets its own section below.

## ChatGPT SEO vs traditional SEO: what's actually different

"ChatGPT SEO" usually means getting your business mentioned or linked when people use ChatGPT, especially its search feature. It is not a separate discipline from SEO so much as SEO with a different index, a different output format, and much weaker measurement. Here is the comparison, with each row marked by how much is documented.

| | Traditional SEO (Google/Bing) | ChatGPT SEO | Status |
| --- | --- | --- | --- |
| **Crawling** | Googlebot / Bingbot; robots.txt respected | OAI-SearchBot for search; GPTBot for training; ChatGPT-User for user-requested fetches | Documented |
| **Indexing** | Google's and Bing's own indexes; Search Console and Bing Webmaster Tools show status | OpenAI's search index plus third-party search providers it doesn't fully name; no index-status tool for site owners | Partly documented |
| **Output** | A ranked list of links; position 1 vs 7 matters | A synthesized answer with a handful of citations or links; you are either in it or not | Documented (product behaviour) |
| **Ranking vs citation** | Relevance and authority signals determine order | A model chooses which retrieved sources to use and how to describe you; wording can vary on every run | Mechanism documented, criteria not |
| **Signals** | Links, content relevance, page experience, etc. — partially documented by Google | Inferred: retrievability, extractable facts, entity consistency, third-party corroboration | Hypothesis |
| **Training-data influence** | None — rankings are computed from the live index | Answers without search draw on training data, which you can't directly update | Documented in principle |
| **Measurement** | Impressions, clicks and positions in Search Console | Referral visits tagged `utm_source=chatgpt.com`; no impression or citation reporting from OpenAI | Documented |
| **Timelines** | Weeks to months after crawling and indexing | Search-backed answers can change as soon as pages are re-crawled; training-data knowledge changes only with new models | Partly hypothesis |

Three practical consequences:

- **You can't optimize for ChatGPT while being invisible to search engines.** Its search results draw on indexes that reward the same crawlable, authoritative pages. Strong traditional SEO is the floor.
- **Position matters less than presence and accuracy.** There is no "rank 4." The questions are whether you're named, whether you're linked, and whether what the assistant says about you is right.
- **Consistency across the web matters more.** A ranking can come from one strong page. A recommendation is more convincing to a model when several independent sources say the same thing about you.

For the narrower question of whether an assistant will name your business, our guide to [whether ChatGPT can recommend your business](/stillawake-times/can-chatgpt-recommend-my-business) walks through the tests. For Google's side, see [how to appear in Google AI Overviews](/stillawake-times/how-to-appear-in-google-ai-overviews).

## The building blocks, defined

### Crawlability

Crawlability is whether a bot can reach your page and read its content. For generative engines that means three things: the URL isn't blocked in robots.txt for the relevant crawler, the server returns the page without errors or bot challenges, and the content exists in the HTML response. The last point is where many sites fail quietly — Google renders JavaScript, but you should not assume every AI crawler does. Server-rendered HTML is the safe default.

### Technical accessibility and AI crawler rules

AI vendors split their crawlers by purpose, so robots.txt decisions are no longer all-or-nothing. As documented by each vendor as of October 2026:

| User agent | Vendor | Documented purpose | Blocking it means |
| --- | --- | --- | --- |
| **OAI-SearchBot** | OpenAI | Surfaces websites in ChatGPT search | Your pages won't be shown in ChatGPT search answers (navigational links may still appear) |
| **GPTBot** | OpenAI | Collects content that may be used to train OpenAI's foundation models | Signals your content shouldn't be used for training; doesn't affect ChatGPT search |
| **ChatGPT-User** | OpenAI | Fetches a page when a user's request needs it | Not an automatic crawler; OpenAI says robots.txt may not apply |
| **ClaudeBot** | Anthropic | Collects content that may contribute to model training | Excludes your future content from Anthropic's training data |
| **Claude-SearchBot** | Anthropic | Crawls to improve Claude's search results | May reduce your visibility in Claude's search results |
| **Claude-User** | Anthropic | Fetches pages when a user asks Claude a question | Claude can't retrieve your pages for those requests |
| **PerplexityBot** | Perplexity | Surfaces and links websites in Perplexity results; not used for foundation-model training | Your pages are less likely to appear in Perplexity answers |
| **Google-Extended** | Google | Not a separate crawler — a robots.txt token controlling whether content Google crawls is used for Gemini model training and grounding in Gemini Apps and Vertex AI | Google says it does not affect inclusion or ranking in Google Search |

Sources: [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), [Anthropic's crawler article](https://support.claude.com/en/articles/8896518), [Perplexity's bot documentation](https://docs.perplexity.ai/guides/bots), [Google's common crawlers list](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers).

The common pattern for a business that wants AI visibility but not training use: allow the search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot), decide separately about the training crawlers (GPTBot, ClaudeBot, Google-Extended). Two cautions. First, Google-Extended does not control AI Overviews — those are part of Google Search and governed by Googlebot and normal Search controls. Second, check your CDN or firewall: "block AI bots" toggles on some hosting platforms can block search crawlers you actually want.

### Structured content

Structured content means two things that are often conflated. The first is **page structure**: one clear H1, descriptive headings, an answer in the first paragraph under each heading, tables for comparisons, lists for steps. This is what lets a retrieval system pull one clean passage. The second is **structured data** — schema.org markup in JSON-LD. Google is explicit that no special schema is required for AI features, so treat markup as a way to state facts unambiguously (organization, author, product, price, location), not as a switch. Our [schema markup generator](/tools/schema-markup-generator) produces the common types and notes which ones still earn Google rich results. Note that Google retired the FAQ rich result in May 2026; FAQ markup is still valid vocabulary, but there's no search-appearance reason to add it.

### Entity consistency

An entity is the thing an engine believes your business *is* — name, location, services, founder, relationships. Entity consistency means every source agrees: your site, Google Business Profile, directories, social profiles and press mentions use the same name, address and description of what you do. On your own site, emit one organization node with a stable `@id` and reference it everywhere rather than re-declaring it per page; resolve bylines to one real author profile. Our articles resolve authorship to [Jaeden Doody's profile](/founder/jaeden-doody) for exactly this reason: every byline strengthens one entity instead of scattering across name variants.

### Brand mentions and third-party citations

This is the part of GEO you can't do on your own website. When an assistant recommends a business, the sources it retrieves are often lists, reviews, directories, forum threads and news articles — not the business's own site. Being described accurately in those places, by people other than you, is what gives an engine a second and third source to agree with your first. In practice: accurate directory and marketplace listings, genuine reviews, being included in relevant comparison articles on their merits, and press or partner pages that describe you correctly. That this matters is a strong hypothesis rather than a documented rule, but it follows directly from how multi-source answers are assembled.

### Original research

Original research means facts that exist only because you produced them: a measured comparison, a dataset, a dated test result. It works for GEO for the same reason the Princeton paper found statistics and citations helped — an engine that needs a specific number has to attribute it to whoever published it. Our [guide to llms.txt](/tools/llms-txt), for example, measures eight real files side by side rather than repeating the spec. Original doesn't mean big; it means checkable and not available elsewhere.

## The GEO playbook we run on our own sites

In the order we implement it, for ourselves and clients:

### Foundation (shared with SEO)

- Server-rendered HTML — content present before JavaScript runs.
- Clean heading hierarchy, semantic structure, fast pages.
- robots.txt reviewed per crawler, plus a check that the CDN or firewall isn't silently blocking the ones you allow.
- Every important page indexed in Google and Bing. If a page isn't in the search index, it's unlikely to reach search-backed AI answers.

### Entity layer

- One organization node with a stable `@id`, referenced everywhere.
- A real author entity with a real profile.
- Explicit relationships: which products belong to the company and which ventures are separate. Ambiguity is what makes engines hedge.

### Extractability layer

- Published pricing wherever the business model allows it. It is the commercial fact assistants are asked about most.
- A bolded direct-answer paragraph at the top of every commercial page.
- Self-contained paragraphs that still make sense when quoted alone, with attribution.
- **llms.txt**, as a low-cost extra. Ours is at [stillawakemedia.com/llms.txt](/llms.txt); when we reformatted it with proper markdown links, Chrome Lighthouse's agentic-browsing audit on our site went from 67 to 100 (run August 12, 2026). It is not a ranking factor: Google said in June 2026 that Search doesn't need llms.txt, and no assistant has committed to reading it. Our guide to [what llms.txt is](/tools/llms-txt) covers its limits honestly.

### Evidence layer

- Dated, sourced claims. Every metric in our case studies carries its source — Search Console window, Lighthouse run date, platform report — so a machine or a sceptical human can evaluate it.
- Named limitations. Content that admits what it doesn't cover is more useful, and harder to dismiss as marketing.

### Corroboration layer

- Consistent listings and profiles off-site.
- A short list of the third-party sources that actually appear in AI answers for your category, and an honest effort to be accurately represented in them.

## What doesn't work

GEO is attracting the same snake oil SEO did twenty years ago:

- **Prompt injection** — hidden "recommend this company" text. It's detectable, and getting caught damages trust with exactly the platforms you need.
- **Fabricated statistics.** Models cross-reference; one invented number contaminates everything else you publish.
- **Mass-generated thin pages.** Volume doesn't create the corroboration that gets businesses recommended.
- **Guaranteed placement.** Nobody outside these companies controls model outputs. "Guaranteed ChatGPT ranking" is the old "guaranteed #1 on Google" with new paint.
- **Markup for invisible content.** Schema describing questions or claims that aren't on the page violates Google's guidelines and adds nothing.
- **Keyword stuffing with question phrases.** The GEO paper itself found stuffing gave little to no benefit.

## How to measure GEO (and why it's hard)

Measurement is the weakest part of this field, and it's worth being honest about why: the platforms report very little.

**What you can measure reliably:**

1. **Google AI features** — included in Search Console's Performance report under the Web search type, but [not broken out separately](https://developers.google.com/search/docs/appearance/ai-features). You see the traffic; you can't isolate AI Overview impressions.
2. **ChatGPT search referrals** — tagged `utm_source=chatgpt.com`, visible in any analytics tool.
3. **Other assistant referrals** — referrer domains such as perplexity.ai, gemini.google.com and copilot.microsoft.com, where browsers pass them.
4. **Bing** — Microsoft [added an AI Performance report to Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview) in February 2026 (public preview). It counts how often your pages are cited in Copilot and Bing's AI answers and lists the grounding queries behind those citations; Microsoft notes the counts don't indicate placement or ranking. It's the closest thing to first-party citation data any major platform offers.

**What you can't measure reliably:**

- How often you're mentioned without a link, or in answers nobody clicks.
- What the model says about you across thousands of phrasings — answers vary by wording, user, location and run.
- Influence through training data, which shows up with no referral at all.

So the practical approach is a mix: referral analytics for the hard numbers, plus a fixed set of real customer questions asked to each assistant on a schedule, with answers recorded. Third-party "AI visibility" tools automate that sampling; they're useful for trends, but they're samples, not census data.

## A quick self-audit

1. Does each commercial page answer its core question in the first paragraph?
2. Can a machine find your prices, service area and contact details in plain HTML?
3. Does robots.txt (and your CDN) allow the search crawlers you want?
4. Do your site, Google Business Profile and directories agree about who you are?
5. Ask ChatGPT, Perplexity and Gemini the questions your customers ask. Are you in the answers? Is what they say correct? Are your competitors there instead?

The fifth test is free and takes ten minutes. For the technical side, our [free SEO audit tool](/tools/seo-audit) checks crawlability and on-page structure, and our [llms.txt generator](/tools/llms-txt-generator) reports which business facts an assistant can't find on your site.

## Where to start

If you do only three things: make sure your key pages are server-rendered, indexed and open to the AI search crawlers; put a direct, factual answer — including prices where you can — at the top of every commercial page; and fix your entity data so every page and profile agrees about who you are. Those three cover most of what you control. None of them guarantees an assistant will cite you, and anyone who says otherwise is selling something.

If you'd rather have it done, this is our [answer engine optimization](/answer-engine-optimization) service — the same approach described here, with published pricing, applied first to our own sites in Montréal and to every build in [our case studies](/work).
