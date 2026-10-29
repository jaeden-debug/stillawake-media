---
title: "How to Get Your Business Recommended by ChatGPT (And What Actually Decides It)"
date: "2026-08-12"
updated: "2026-10-29"
excerpt: "ChatGPT recommends businesses it can find, verify and confidently repeat. You can't buy placement, but you can be crawlable, consistent and corroborated."
category: "AI Search"
featured: false
author: "Jaeden Doody"
---

**ChatGPT recommends the businesses it can find, verify and confidently repeat. You can't buy a placement, and nobody can guarantee one. What you can influence is whether OpenAI's search crawler can reach your site, whether your business details agree everywhere they appear, and whether independent sources back up what you say about yourself.** That's the honest scope of "getting recommended by ChatGPT," and it's bigger than most businesses realize.

This guide explains how ChatGPT actually produces a recommendation, what OpenAI documents about its crawlers (as of October 2026), what you can work on, how to measure it, and a short self-test you can repeat every month.

## How ChatGPT answers: with and without search

When someone asks "who's the best Shopify developer in Montréal?", ChatGPT can answer in two different ways. Most bad advice comes from mixing them up.

### Without search: training knowledge

The underlying model learned from a large body of text gathered before its training cutoff. If your business was well documented and consistently described across the public web at that point, the model may "know" about you and mention you from memory. This knowledge:

- changes only when OpenAI trains and releases new models,
- can be out of date (old prices, old address, a service you've stopped offering),
- can't be edited by you directly.

OpenAI's crawler documentation says GPTBot is the crawler used for content that may be used in training its generative AI foundation models. Allowing or disallowing GPTBot affects future training data. It doesn't affect what ChatGPT search shows today.

### With search: live retrieval

ChatGPT can also search the web while answering. It may do this automatically when a question would benefit from current information, and users can choose search themselves. For local and commercial questions ("near me," "best," "how much," "who should I hire"), search is common. That's the mode you can actually work on, because it depends on what's on the web right now.

When OpenAI launched ChatGPT search, it [said](https://openai.com/index/introducing-chatgpt-search/) the feature draws on third-party search providers and content provided directly by its partners. OpenAI hasn't published a current list of those providers or how much each contributes. Bing has been widely reported as one of them, but OpenAI doesn't document that being indexed by any particular search engine guarantees you'll appear in ChatGPT. So keep your site healthy in Bing Webmaster Tools for its own sake, and don't treat it as a ChatGPT switch.

The practical conclusion: **the route into ChatGPT recommendations runs through the same public web that search engines read**, plus a few OpenAI-specific crawler settings.

## OpenAI's crawlers and robots.txt

OpenAI's [crawler overview](https://developers.openai.com/api/docs/bots) (checked October 2026) describes three user agents. They do different jobs, and blocking the wrong one is a common, quiet mistake.

| User agent | What OpenAI says it's for | What blocking it does |
| --- | --- | --- |
| **OAI-SearchBot** | Surfacing websites in ChatGPT's search features. | Your pages won't be shown in ChatGPT search answers, though they can still appear as navigational links. |
| **GPTBot** | Crawling content that may be used to train OpenAI's foundation models. | Signals your content shouldn't be used for training. It doesn't control search visibility. |
| **ChatGPT-User** | Certain user-initiated actions, such as when a user's request leads ChatGPT to visit a page. Not used for automatic crawling. | OpenAI notes robots.txt rules may not apply to user-initiated requests, and that this agent doesn't decide whether content appears in search. |

What to do with this:

- **If you want to be recommended in ChatGPT search, don't block OAI-SearchBot.** Check robots.txt, and also check firewall, CDN and "bot protection" settings. Security tools sometimes block AI crawlers by default without the site owner knowing.
- **Blocking GPTBot is a separate decision** about training use. You can block GPTBot and still allow OAI-SearchBot.
- **Changes aren't instant.** OpenAI notes that robots.txt changes can take roughly a day to be reflected in search results.

A minimal robots.txt that allows search but opts out of training looks like this:

```
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /
```

Whether you opt out of training is a business choice, not an SEO one. We're not recommending either way here.

## Why third-party mentions matter so much

Naming a business in an answer is a small bet on the assistant's credibility. A recommendation that turns out to be wrong (closed, unlicensed, badly reviewed) is a bad answer. So it's reasonable to expect a system like this to favour businesses whose details are backed up by sources the business doesn't control. OpenAI hasn't published a weighting for this. It's an inference from how retrieval and answer generation work, and it matches what people see when they look at which sources ChatGPT cites for local and "best of" questions: directories, review platforms, local news, industry lists and comparison articles turn up constantly.

The sources most likely to matter for a typical service business:

- **Review platforms** relevant to your industry, plus your Google Business Profile reviews. Volume matters less than recent, specific, genuine reviews that describe what you actually do.
- **Industry and local directories** that are actually maintained: professional associations, chambers of commerce, platform partner directories (for example, Shopify's Partner Directory if you're a Shopify developer).
- **Editorial mentions:** local press, trade publications, podcasts and "best X in [city]" roundups written by real publishers.
- **Partner and client pages** that link to you and describe the work you did.

Don't confuse this with buying listings on low-quality "top 10" sites or swapping reviews. Fake corroboration is still fake, review platforms actively remove it, and it puts you on the wrong side of their policies and consumer-protection rules.

## Entity consistency: be one business, everywhere

Before an assistant can recommend you, it has to work out who you are. If your site says "StillAwake Media Inc.," a directory says "Still Awake Studio," and an old listing has a previous address, you look like three uncertain entities rather than one confident one.

**NAP consistency.** Name, address and phone number should match character for character across your website, Google Business Profile, Bing Places, Apple Business Connect, and the directories you're listed in. The same goes for your service area and core service descriptions. Our [local SEO](/local-seo) work starts with exactly this audit, because it pays off in Google Maps and AI answers alike.

**Organization schema.** Add `Organization` (or the most specific `LocalBusiness` subtype) structured data to your home or contact page with your official name, URL, logo, contact details, address and `sameAs` links to your real profiles. No OpenAI documentation says ChatGPT reads schema directly. But structured data is an unambiguous, machine-readable statement of your identity, and the search systems ChatGPT draws on do use it. Our free [schema markup generator](/tools/schema-markup-generator) builds this in a couple of minutes. Just make sure the markup matches what's visible on the page.

**One canonical "about" page.** A plain-language page that states who you are, where you operate, what you do, who runs the business and how to contact you. When an assistant searches for your name, this is the page you want it to find.

## Make your site readable to OAI-SearchBot

Allowing the crawler is only the first step. The content also has to be there when it arrives.

- **Server-render important content.** Text that only appears after heavy client-side JavaScript, inside tabs that load on click, or behind cookie walls may not be visible to a crawler. Your services, locations, prices and contact details should be in the HTML.
- **Publish the facts people ask about.** "How much does it cost?" is one of the most common questions people ask assistants. If your prices exist only on a discovery call, there's nothing to repeat. We publish ours (SEO plans at $250–$850 CAD/month on our [pricing page](/pricing)) partly so assistants have something accurate to quote.
- **One page per real service and location.** A page for each core service, written for the people who buy it, gives retrieval something specific to match. Don't spin up thin near-duplicate city pages. They tend to be ignored or treated as low quality.
- **Keep it current.** Out-of-date hours, discontinued services and old pricing get repeated back to customers.

An `llms.txt` file is optional. It's a plain-text summary of your business some tools and agents read, and ours is at [/llms.txt](/llms.txt). OpenAI hasn't said ChatGPT uses it, and Google said in June 2026 that Search doesn't need it. Treat it as a cheap convenience, not a ranking lever. Our [llms.txt explainer](/tools/llms-txt) covers where it does and doesn't help.

## Publish original content worth citing

ChatGPT search cites sources to back up its answers. Pages that get cited usually contain something an answer needs: a clear definition, a specific number, a comparison, a process, or first-hand evidence. Generic content that repeats what a hundred other pages say gives a retrieval system no reason to choose yours.

Content that tends to earn citations:

- **Original data with dates and sources.** For example, our [Blackwater Aquatics case study](/work/blackwater-aquatics) documents our own Shopify store's repeat-customer rate going from 5.9% to 33.3% period over period, with the measurement window and the small sample size stated alongside it.
- **Clear answers to real customer questions,** written so each section stands on its own when quoted.
- **Honest comparisons and "how to choose" guides** in your field, including when you're *not* the right fit.
- **Process explanations** that show how you actually work, with timelines and what's included.

The same principles apply to Google's AI features. Our guide on [how to appear in Google AI Overviews](/stillawake-times/how-to-appear-in-google-ai-overviews) covers the passage-level structure in more detail.

## Measuring ChatGPT referrals

OpenAI's publisher FAQ says ChatGPT automatically adds `utm_source=chatgpt.com` to referral URLs from ChatGPT search results, so publishers can track that traffic in analytics tools such as Google Analytics. In practice:

- **In GA4,** open Reports → Acquisition → Traffic acquisition and filter or add a secondary dimension for *Session source* = `chatgpt.com`. You can also build an exploration that compares landing pages and conversions for that source.
- **Expect undercounting.** Not every visit carries the parameter. Some links get copied and pasted, some apps strip parameters, and some people read a recommendation and then search for your name on Google. That last group shows up as branded organic search or direct traffic, not ChatGPT.
- **Ask new customers.** A "How did you hear about us?" field with "ChatGPT / AI assistant" as an option is crude, but it catches influence that analytics misses.
- **Watch branded search.** A rise in searches for your business name in Search Console can be an indirect sign that people are hearing about you elsewhere, including from assistants. It's a signal, not proof.

## Limitations to keep in mind

**Answers aren't deterministic.** The same prompt can produce different businesses on different days, for different users, in different locations, or with small changes in wording. Being named once doesn't mean you're "ranking." Being left out once doesn't mean you're invisible.

**Small samples mislead.** Running five prompts and concluding anything is like judging Google rankings from one search in incognito. Use a fixed prompt set, repeat it on a schedule, and look at the trend.

**Personalization and memory.** ChatGPT can take a user's context, past conversations and location into account. What you see when you test isn't necessarily what a customer sees.

**Models change.** New model releases and search changes can shift results overnight, for reasons that have nothing to do with your site.

**Nobody can guarantee placement.** Anyone selling "guaranteed ChatGPT recommendations" is selling something they don't control. The same goes for hidden text telling AI systems to recommend you. It's detectable, it damages trust, and it can break platform and search engine policies.

## A repeatable self-test protocol

This takes about 20 minutes a month and gives you a dated record instead of anecdotes.

**1. Write a fixed prompt set (8–12 prompts) and never edit it.** Mix three kinds:

- Category prompts: "Who should I hire for [service] in [city]?" / "What are the best [service] companies in [region]?"
- Problem prompts: "How do I fix [problem your customers have]?" / "How much does [service] cost in Canada?"
- Brand prompts: "What do you know about [business name]?" / "Is [business name] a good choice for [service]?"

If you serve Québec, add French versions of your most important prompts.

**2. Control the conditions.** Use a logged-out or fresh session where possible, note whether the response used search (visible sources or citations), and note the model or mode shown. Run each prompt the same way each time.

**3. Record, for every prompt:**

| Field | Example |
| --- | --- |
| Date | 2026-10-29 |
| Prompt (exact wording) | "Who should I hire for Shopify development in Montréal?" |
| Mode | Search used / no search |
| Were you mentioned? | Yes / No / Incorrectly |
| Position in the answer | First, among several, footnote |
| Sources cited | List every URL ChatGPT linked |
| Errors about you | Wrong price, old address, discontinued service |

**4. Read the citations, not just the answer.** The cited URLs tell you which sources ChatGPT trusts for your category. If the same directory or roundup article keeps appearing and you're not on it, that's a concrete target.

**5. Diagnose the pattern.** Not found at all usually points to crawl access or thin corroboration. Found but wrong points to inconsistent or outdated information somewhere. Found but behind competitors points to them having more and better independent sources. Each needs a different fix.

Run the same set on Perplexity, Gemini and Google AI Mode if those matter to your customers. The patterns are often similar, and the differences are informative.

## Bringing it together

Getting recommended by ChatGPT isn't a separate discipline from being findable online. It's the same work under stricter conditions. Let OAI-SearchBot in, state your facts plainly on crawlable pages, make your business details identical everywhere, earn real third-party mentions, publish things worth citing, and measure it honestly. Our [guide to generative engine optimization](/stillawake-times/what-is-generative-engine-optimization) covers the wider picture across assistants.

If you'd rather have it done for you, this is what our [answer engine optimization](/answer-engine-optimization) service covers: crawler and robots.txt checks, entity and schema cleanup, content structure, and a fixed-prompt baseline we re-run so you can see what changed. We'll tell you up front which parts are in your control and which aren't.
