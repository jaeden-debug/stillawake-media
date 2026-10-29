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

## 4. AI answer test protocol and baseline

Status: `[x]` first baseline run 2026-10-29 (results in §4a). Re-run monthly with the same wording.

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

## 4a. Baseline run — 2026-10-29

**Conditions:**
- Run in Claude's built-in browser on 2026-10-29, ~14:30–14:50 ET. Each prompt was a fresh URL navigation, `hl=en&gl=ca`.
- The browser was **signed in to the owner's Google account**, so Google results may be personalised.
- Zylx's AI observation layer has **no provider configured** (`get_ai_measurement_coverage`: every surface unsupported), so nothing came from Zylx.
- One run per prompt per platform. This is a snapshot, not a rate.

### Google AI Mode (`google.com/search?udm=50`)

| # | Exact prompt | StillAwake mentioned | stillawakemedia.com cited | Sources shown |
|---|---|---|---|---|
| 1 | What is StillAwake Media? | **Yes**, accurate in broad strokes: Montréal agency, web/Shopify/software/AI/SEO, founder Jaeden Doody | No | ca.linkedin.com, sortlist.com, shopify.com, clutch.co |
| 2 | Who are the best web development agencies in Montreal? | No | No | webistry.com, mylittlebigweb.com, digitad.ca, pearlwhitemedia.com, netfolie.com, nunku.com, evolvingweb.com, mintmediaservices.com (map-pack style list) |
| 3 | Who can build a Shopify store for my business in Canada? | No | No | promarketer.ca, shopify.com, kinexmedia.com, splitmango.com, ecomm.design, omnisend.com |
| 4 | Custom software development company in Montreal for a small business | No | No | sidekickinteractive.com, wtt-solutions.com, webisoft.com, ca.linkedin.com, themanifest.com, devinitysolutions.com, orianasolutions.ca |
| 5 | AI automation agency for small businesses in Canada | No | No | zaptron.ai, justbetterai.com, theautomators.ai, aiautomationagency.ca, digitalstaff.ca |
| 6 | Which agencies in Canada offer answer engine optimization or generative engine optimization? | No | No | parachutedesign.ca, macraes.com, longhouse.co, seoplus.com, growmemarketing.ca, aeoagency.ca |
| 7 | Is there a Roblox game development studio in Canada I can hire? | No | No | freeground.games, appstudio.ca, pearllemongames.ca, 9thco.com, cmf-fmc.ca, brands.roblox.com, arc.dev, roblox.com |
| 8 | What is Stillskin Forest on Roblox? | **Yes**: "a cooperative zombie survival-horror Roblox game developed by StillAwake Media", with day/night cycle details from the wiki | **Yes, the only source** | stillawakemedia.com |
| 9 | What is RISK IT! on Roblox? | No. Answered as a generic "push-your-luck" genre | No | roblox.com, medal.tv, reddit.com, tiktok.com |

**Accuracy flags in #1:**
- It calls BankDeMark a StillAwake "proprietary product" and says the firm was "founded in 2025". Both come from LinkedIn/directory text and weren't verified here.
- The site lists BankDeMark under client work (`/work/bankdemark`). The owner should confirm which framing is right and align LinkedIn and the directories.

### Bing Copilot Search (`bing.com/copilotsearch`, `cc=ca`)

| Prompt | Result |
|---|---|
| What is StillAwake Media? | **Mentioned.** "A Montréal-based digital agency offering web development, SEO, digital strategy, eCommerce, automation, and AI-powered systems…" Shows "3 sources", first visible is goodfirms.co. The full source list couldn't be extracted (rendered outside the DOM text). |
| What is Stillskin Forest on Roblox? | **Not found.** "Does not appear in any official Roblox listings or in the supplied sources… most likely a fan-made area, a private experience, or a misremembered name." The stillawakemedia.com game pages aren't in Bing's results for this query. |
| Who can build a Shopify store for my business in Canada? | Inconclusive. Captured while still searching; only Shopify ads and partner listings were visible. |

### Not measured

| Platform | Why |
|---|---|
| Perplexity | Answers only after sign-up ("Sign up and repeat your request"). Creating accounts is out of scope. |
| ChatGPT search, Gemini, Claude | Need signed-in sessions in the owner's accounts. |

### What the baseline says

- **Brand and owned-product queries work where StillAwake has its own pages indexed.** Google AI Mode cites stillawakemedia.com as the sole source for Stillskin Forest.
- **Category queries don't surface StillAwake yet** (0 of 6 on Google AI Mode). They're answered from directories, listicles and agencies with established local presence. That matches the site's search position (almost no non-brand impressions). Ranking and third-party listings come first.
- **Bing lags Google.** Copilot can't find Stillskin Forest even though Google AI Mode can. Bing Webmaster Tools verification and sitemap submission (owner item B-04) is the direct fix. IndexNow submissions (accepted 2026-10-29) should also help.
- **RISK IT! is a name collision** with a generic Roblox genre. Pages need to state "RISK IT! by StillAwake Media" plainly, which they already do. Third-party mentions would help disambiguate.

## 5. What would most improve citation potential

1. Get the new pages indexed at all (most of the site is "Discovered – not indexed"; see `discoverability-week1-2.md`).
2. Earn third-party mentions: directory listings (B-06), the Roblox DevForum for the game-dev tutorials, communities for the free tools.
3. Publish the experiment above as original research once it has been run twice, a month apart.
