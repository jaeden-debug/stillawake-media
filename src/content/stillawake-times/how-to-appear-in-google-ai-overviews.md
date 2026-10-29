---
title: "How to Appear in Google AI Overviews (and AI Mode): What Google Actually Documents"
date: "2026-10-29"
excerpt: "Google says there are no extra requirements for AI Overviews or AI Mode: a page must be indexed and eligible for a snippet. Here's what that means in practice."
category: "AI Search"
featured: false
author: "Jaeden Doody"
---

**To appear in Google AI Overviews or AI Mode, a page has to be indexed and eligible to be shown in Google Search with a snippet. Google says there are no additional requirements and no special optimizations beyond that, and that normal SEO best practices still apply.** Nobody can guarantee inclusion, and no file, tag or schema type switches it on. What you can do is remove the things that make a page ineligible, and make your best passages easy for Google to understand and quote.

That's the short version, and it comes straight from Google's own [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) page on Search Central (checked October 2026). The rest of this article separates what Google has documented from what the industry has observed, and turns both into a checklist you can run on your own site.

## What Google documents (and what it doesn't)

Most advice about AI Overviews mixes three different kinds of claim: things Google has written down, patterns people have noticed, and guesses sold as tactics. It helps to keep them apart.

### Documented by Google

As of October 2026, Google's Search Central documentation on AI features says:

- **No extra requirements.** In Google's words, "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."
- **Eligibility is the normal Search bar.** A page has to be "indexed and eligible to be shown in Google Search with a snippet."
- **SEO best practices still apply.** Google states that "the best practices for SEO remain relevant for AI features in Google Search."
- **No special files or markup.** Google says you don't need to create new machine-readable files, AI text files, or markup to appear in these features, and that there's "no special schema.org structured data that you need to add."
- **Query fan-out.** Both AI Overviews and AI Mode may issue multiple related searches across subtopics and data sources to build a response. Google says this lets them show a wider and more diverse set of links than a classic results page.
- **Controls are the existing ones.** `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex` govern what can be shown.
- **Reporting is folded in.** Traffic from AI features is included in the Search Console Performance report under the "Web" search type, not broken out separately.

### Not documented by Google

Google has not published a ranking formula for which pages get linked in an AI Overview. It hasn't said how many sources are chosen, how passages are selected, or how much weight any one signal carries. Anyone presenting a precise "AI Overview ranking factor" list is describing their own observations, not Google's system. Treat those lists as hypotheses to test, not rules.

### Commonly observed (hypotheses, not guarantees)

People who track AI Overviews closely tend to report similar patterns. Cited pages usually already rank somewhere in the organic results for the query or a related sub-query. Clear, self-contained passages that directly answer a question seem to get used more than answers buried in long preamble. Pages with a clear topic and an identifiable publisher seem to be easier to cite than vague ones. These observations line up with Google's "SEO best practices still apply" statement, but they're inferences, and your results on any single query can differ.

## How AI Overviews choose sources

The documented part is query fan-out. When someone asks a complicated question, Google can break it into related searches, run them against its index and other data sources, and compose one response with links to supporting pages. That has two practical consequences.

**First, you can be cited for queries you don't rank for directly.** If your page is a strong result for one of the sub-questions Google generates, it can be linked in the overview for the broader query. A page that thoroughly answers "how long does Shopify migration take" could support an overview for "should I move my store to Shopify," even if it doesn't rank for that exact phrase.

**Second, retrieval still runs on the index.** Fan-out searches Google's existing index. If a page isn't indexed, or is blocked from showing a snippet, it isn't a candidate. This is why the eligibility rules matter more than any "AI optimization" trick.

What we don't know is the selection step after retrieval: why one of ten eligible pages gets the link and the others don't. Our working assumption is that it's the same blend of relevance, quality and usefulness that drives normal ranking, applied at the passage level. That's an assumption, and it's labelled as one.

## Step 1: Make sure the page is eligible

Eligibility is binary, and it's where most "why aren't we in AI Overviews" problems actually start. Check these before anything else:

1. **The page is indexed.** Use the URL Inspection tool in Search Console. "URL is on Google" is the minimum. If it's "Discovered" or "Crawled – currently not indexed," the AI question is premature. Our guide to [the Search Console reports that matter](/stillawake-times/google-search-console-reports-that-matter) covers how to read these.
2. **The page can be crawled.** robots.txt mustn't block Googlebot, and important content shouldn't depend on scripts Google can't render. [How Google crawls and understands websites](/stillawake-times/how-google-crawls-and-understands-websites) goes through the details.
3. **Snippets aren't blocked.** A `nosnippet` robots meta tag, or a very low `max-snippet` value, limits or removes what Google can show from the page. That includes AI features. Check templates for these tags, because they often get added site-wide by accident.
4. **The canonical is the page you want cited.** If Google picks a different canonical (a parameter URL, a duplicate, an old version), that's the version that can appear.
5. **The page meets Google's spam policies.** A page that's been demoted or removed for spam isn't going to be cited.

A technical crawl catches most of this in minutes. Our [free SEO audit tool](/tools/seo-audit) flags indexability, snippet directives and canonical problems.

## Step 2: Write passages that are easy to quote

Once a page is eligible, the question is whether its content is easy to lift out and attribute. This part isn't documented as an AI Overview rule. It's good writing for search, and it happens to suit a system that composes answers out of passages.

**Answer first.** Put the direct answer in the first sentence or two under each heading, then explain. If a section is titled "How long does a Shopify migration take?", the next sentence should give the range and what it depends on. Throat-clearing comes last or not at all.

**Make each section self-contained.** A passage that starts "As mentioned above, this means…" falls apart when it's quoted on its own. Restate the subject: "A Shopify migration usually takes…" rather than "It usually takes…".

**Use headings that match real questions.** `##` and `###` headings phrased the way people search ("How much does X cost in Canada?", "Is X required?") give Google clean boundaries between topics. This also helps with fan-out, because each heading can line up with a sub-query.

**Prefer specifics to adjectives.** "Most audits take 3–5 business days, and you get a written report" is quotable. "Our industry-leading audits are fast and thorough" isn't. If you state a number, give the date and source next to it.

**Use lists and tables where the content really is a list or a comparison.** Steps, requirements and side-by-side options are easier to extract from structured HTML than from a long paragraph. Don't force everything into bullets, though. Explanations still need prose.

**Write for people.** Google's guidance on [creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) is part of the SEO best practices Google says still apply. Pages written to game a system tend to read that way, to people and to Google alike.

## Step 3: Make the entity behind the page clear

An AI response that links to your page is implicitly vouching for you as a source. It helps when Google can easily tell who published the page and why they're credible on the topic.

- **Name the business consistently.** Use the same legal or trading name, address, phone number and service descriptions on your site, your Google Business Profile and directories. For local businesses, our [Google Business Profile optimization guide](/stillawake-times/google-business-profile-optimization) covers this.
- **Have a real About page and real author information.** Show who wrote the article, what they do, and how to contact the business.
- **Link related pages together.** A topic covered by one thin page is weaker than a cluster of pages that link to each other with descriptive anchors. Our piece on [internal linking](/stillawake-times/why-internal-linking-is-one-of-the-most-powerful-seo-strategies) explains why.
- **Earn mentions you don't control.** Reviews, press, industry directories and partner pages corroborate the facts on your own site.

None of this is an AI-specific signal Google has confirmed. It's how Google has always assessed sources, and there's no reason to think AI features ignore it.

## Step 4: Keep content current

For queries where the answer changes (prices, regulations, software features, "best X in 2026"), an outdated page is a weak candidate however well it's written. Google hasn't published a freshness rule for AI Overviews. Still, a response built from current search results will tend to pull from pages that reflect the current state of things.

Practical habits:

- Put a visible "last updated" date on pages that change, and only change it when the content really changed.
- When you update a time-sensitive fact, say "as of [month, year]" in the text so the claim carries its own date.
- Remove or rewrite claims that are no longer true. A page that's 90% accurate and 10% stale can still get passed over.

## Step 5: Use structured data for understanding, not as a switch

Google says plainly that there's no special schema.org markup for AI Overviews or AI Mode. It also says that if you use structured data, it should match the visible text on the page. Structured data is still worth doing. It helps Google understand what a page is about and who's behind it, and it powers rich results that are still supported. Just don't expect an "AI schema" to unlock anything.

Markup that's usually worth having:

- `Organization` or `LocalBusiness` on the home page or contact page, with your name, logo, URL, contact details and `sameAs` links to official profiles.
- `Article` (with author and dates) on editorial content.
- `Product`, `BreadcrumbList` and other types where they genuinely describe the page.

One change to note: Google retired the FAQ rich result on 7 May 2026. `FAQPage` is still valid schema.org vocabulary, but adding it won't earn a Google rich result, and nothing suggests it helps with AI Overviews. Our [schema markup generator](/tools/schema-markup-generator) builds the common types and notes which ones still produce Google results.

## How to control or opt out of AI features

If you'd rather limit what Google shows from your pages in AI features, the controls are the same preview controls that apply to Search:

| Control | What it does |
| --- | --- |
| `<meta name="robots" content="nosnippet">` | No text snippet from the page in Search, including AI features. |
| `max-snippet:[number]` | Caps how many characters can be shown as a snippet. |
| `data-nosnippet` attribute | Excludes specific parts of a page (a `span`, `div` or `section`) from snippets. |
| `noindex` | Removes the page from Google Search entirely. |

These are blunt tools. `nosnippet` also strips the snippet from your regular blue-link result, which usually hurts click-through. Use `data-nosnippet` if there's one specific block you don't want quoted, such as a pricing table that changes daily or a members-only excerpt.

`Google-Extended` is a separate robots.txt token. Google describes it as a way to limit AI training and grounding in some of its other systems. Its documentation doesn't present it as the control for AI Overviews or AI Mode in Search. Those are governed by the preview controls above.

## Measuring AI Overviews traffic (and its limits)

Measurement is the weakest part of this whole area, so set expectations early.

- **Search Console** includes clicks and impressions from AI features in the Performance report under the "Web" search type. As of October 2026, Google's AI features documentation doesn't describe a separate filter that isolates AI Overview clicks from regular result clicks. You can see overall Search performance for a page or query. You can't cleanly attribute a specific click to an AI Overview link.
- **Analytics** will show this traffic as Google organic, because that's what it is.
- **Manual spot checks** (searching your target queries and noting whether an overview appears and who it cites) are useful for qualitative insight. But AI responses vary by user, location, phrasing and time, so a handful of checks isn't a representative sample.

A reasonable approach: track the organic performance of the pages you've improved, record dated spot checks for a fixed list of queries, and look for direction over months rather than proof from a single result.

## What doesn't work

**llms.txt for Google.** In June 2026 Google added a note to its documentation saying llms.txt files aren't needed for Google Search and won't positively or negatively affect visibility or rankings. That's on top of the AI features page saying no AI text files are required. An llms.txt file can still be a useful plain-language summary for other tools and agents. Our explainer on [what llms.txt is](/tools/llms-txt) covers where it does and doesn't matter. It isn't an AI Overviews lever.

**FAQ schema as a shortcut.** As above, the FAQ rich result is gone, and there's no evidence FAQ markup influences AI features.

**"AI SEO hacks."** Hidden text aimed at AI systems, keyword-stuffed "AI-friendly" sections, mass-produced pages targeting every question variation, or invisible prompt-style instructions. At best these do nothing. At worst they fall under Google's spam policies on hidden text and scaled content abuse.

**Paying for guaranteed placement.** No one outside Google controls which pages appear in AI Overviews. A guarantee is a red flag, just like a guaranteed #1 ranking was.

## Practical checklist

Run this on each page you want to be citable:

- [ ] URL Inspection shows the page is indexed, with the canonical you expect.
- [ ] No `nosnippet` or restrictive `max-snippet` on the page or its template (unless intentional).
- [ ] Main content is in the rendered HTML Google sees, not hidden behind interactions.
- [ ] The first paragraph answers the page's main question directly.
- [ ] Each `##` section answers one question and makes sense when quoted alone.
- [ ] Facts carry specifics: numbers, dates, sources, "as of" for anything time-sensitive.
- [ ] Author and publisher are identifiable, with About and contact information.
- [ ] Organization/LocalBusiness and Article markup are present and match the visible text.
- [ ] No FAQ markup added in the hope of a rich result or AI boost.
- [ ] The page links to and from related pages in the same topic cluster.
- [ ] Time-sensitive pages have a visible, honest "last updated" date.
- [ ] A dated baseline of manual query checks is recorded before changes go live.

## How this fits with ChatGPT and other assistants

Google AI Overviews are one answer engine among several. ChatGPT, Perplexity and Gemini each retrieve and cite sources their own way, with their own crawlers and controls. The foundations overlap (crawlable pages, clear facts, consistent entity data), but the details differ. Our [guide to generative engine optimization](/stillawake-times/what-is-generative-engine-optimization) covers the broader picture, and [how to get your business recommended by ChatGPT](/stillawake-times/can-chatgpt-recommend-my-business) covers OpenAI's crawlers and measurement specifically.

## Next step

If you want a second set of eyes, start with the free [SEO audit tool](/tools/seo-audit) to catch eligibility problems. If you'd rather have the whole thing handled (indexability, content structure, entity data and measurement), that's what our [answer engine optimization](/answer-engine-optimization) service covers. We'll tell you what we can and can't influence before you spend anything.
