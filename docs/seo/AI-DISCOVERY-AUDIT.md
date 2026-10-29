# AI discovery audit

What makes StillAwake's content discoverable and accurately readable by search engines and AI-assisted search, what was checked on 2026-10-29, and the test protocol for AI answers. Nothing here claims that any assistant cites or will cite the site.

## 1. Crawler access (checked 2026-10-29)

`https://stillawakemedia.com/robots.txt`:

```
User-Agent: *
Allow: /
Sitemap: https://stillawakemedia.com/sitemap.xml
```

- No crawler is blocked, including GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Bingbot. That is an intentional choice: the site wants to be readable by every assistant. Allowing GPTBot and Google-Extended also permits use for model training; revisit if that stops being acceptable.
- Each vendor runs separate crawlers and indexes. Being in Bing's index is not documented by OpenAI as sufficient for ChatGPT visibility, and the content says so.

## 2. Technical accessibility

| Check | Result | Evidence |
|---|---|---|
| Content in server HTML | Yes. Articles are static/ISR HTML; tools render their explanations server-side, only the interactive parts are client components. | Local build; SEO audit tool reports 2,000+ words in HTML for articles |
| Canonicals | Self-referencing on all 338 sitemap URLs | Local crawl 2026-10-29: `canonicalNotSelf` 0 |
| Noindex | None on indexable pages | Crawl: `noindex` 0 |
| Sitemap | 338 URLs, includes every new page; redirected guide excluded | Local `/sitemap.xml` |
| Internal links | 0 broken, 0 orphans, 0 links to redirects | Crawl |
| Structured data | Article on Times articles (author Person, publisher Organization, dates); WebPage + Service + BreadcrumbList on tools; one Organization and WebSite site-wide | JSON-LD parsed on 5 pages |
| llms.txt | Live (77 KB); new tools added; long tail under `## Optional` (PR #34) | `/llms.txt` |
| Authentication walls | None on content | — |

## 3. Entity consistency

The site consistently names StillAwake Media (Montréal studio), its founder (Jaeden Doody, `/founder/jaeden-doody`), its services, and its own projects. This program added accurate relationship statements: Blackwater Aquatics is "our own store"; Stillskin Forest is "in development, not publicly released"; RISK IT! is "public on Roblox, Minimal maturity, 16+ for now (2026-10-29)"; Stalkr is "a client build for NAVTRL". No business relationships were invented.

One inconsistency found and left for the owner (B-15): `/shopify-development` cites a 27.8% Blackwater repeat-customer rate; the case study says 33.3% (30 days to 2026-08-14). Assistants that read both pages see two numbers.

## 4. AI answer test protocol (not yet run)

Status: `[ ]`. No AI assistant was queried in this session; results must not be inferred.

Run on the same day, logged out where possible, each prompt in a fresh conversation:

| # | Prompt | Type |
|---|---|---|
| 1 | "What is StillAwake Media?" | Brand |
| 2 | "Recommend a web design studio in Montréal that also does SEO" | Commercial, local |
| 3 | "Who can help my business show up in ChatGPT answers in Canada?" | Commercial, AEO |
| 4 | "How much does a Shopify store cost in Canada?" | Informational, D1 |
| 5 | "How do I make a horror game in Roblox Studio?" | Informational, A4 |
| 6 | "Is llms.txt required for AI search?" | Informational, B1 |
| 7 | "What is Stillskin Forest on Roblox?" | Brand / game |

Platforms: ChatGPT (search on), Google AI Mode / AI Overviews, Bing Copilot, Perplexity, Gemini.

Record per run: date, platform, mode (search/browse on or off), exact prompt, whether StillAwake is mentioned, cited URLs, competitors cited, whether facts about StillAwake are accurate, screenshot path.

Limits: answers are non-deterministic and personalised; seven prompts are not a representative sample; a mention on one day is not a ranking. First-party measurement exists only in Bing Webmaster Tools' AI Performance report (public preview since Feb 2026) and in GA4 referrals (`utm_source=chatgpt.com`, perplexity.ai, copilot, gemini referrers). Bing Webmaster Tools access is blocked on the owner (B-04).

## 5. What would most improve citation potential

1. Get the new pages indexed at all (most of the site is "Discovered – not indexed"; see `discoverability-week1-2.md`).
2. Earn third-party mentions: directory listings (B-06), the Roblox DevForum for the game-dev tutorials, communities for the free tools.
3. Publish the experiment above as original research once it has been run twice, a month apart.
