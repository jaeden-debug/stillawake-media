# SEO implementation report: batch 1 (2026-10-26)

This covers batch 1 only, not the whole program. Open work continues from `MASTER-SEO-ROADMAP.md`.

## Where the site actually stands

- **Search Console, 90 days to 2026-10-24:** 20 clicks, 156 impressions. The earlier "~450" was a double count.
- **Trend:** falling since a mid-August peak.
- **Clicks:** almost all brand (homepage, position 3.4). No visible non-brand query has earned a click.
- **Nearest wins:**
  - /fr/agence-seo-montreal at position 9.7
  - /seo-montreal at 14
  - /fr/prix-site-web-quebec at 14.2, with 42 impressions
- **Web design pages:** around position 90–100. That's an authority gap, not an on-page one.
- **Root cause, ranked:**
  1. Very little authority: no measurable referring domains, no directory listings, no Google Business Profile visibility observed.
  2. Small absolute demand: the biggest commercial term, "seo montreal", gets 260 searches a month.
  3. Ordinary on-page gaps, now fixed.

## What shipped (PR #6, merge 960c852, live 2026-10-26)

| Change | Verified live |
|---|---|
| Reciprocal hreflang on `/` and `/contact` | Yes. `/` now emits en-CA, fr-CA and x-default. The live crawl finds 0 non-reciprocal pairs. |
| Orphaned `/fr/developpement-framer` linked | Yes. Live crawl: 0 orphans. |
| Homepage article card pointed at the final URL | Yes |
| 3 article links fixed | Yes, after a follow-up CMS republish (B-11). These articles render from the CMS, which also required an author: they're now credited to Jaeden Doody, with the owner's approval. |
| /seo-montreal title, description, quick answer, proof placement | Yes. Live title is "SEO Montreal \| SEO Services & Local SEO Agency \| StillAwake Media". |
| Titles on 6 commercial pages lead with the measured term | Yes |
| Sitemap `lastmod` bumped for changed pages | Yes |
| IndexNow submission of the 10 changed URLs | HTTP 200 |

**Full live crawl (279 URLs):**
- 0 non-200 pages, 0 broken links, 0 orphans, 0 hreflang errors, 0 duplicate titles or descriptions.
- After the CMS republish: 0 links to redirects.

## Not done, and why

- **Owner actions:** Google Ads conversion cleanup, PMax final URL, GSC Request indexing, Google Business Profile, directories, client credit links and a paid data source are all listed in `BLOCKERS-AND-APPROVALS.md` (B-01 to B-11). Each is an account change or external action that needs the owner.
- **Backlink numbers:** no source was available, so none are reported.
- **Lighthouse:** the PageSpeed API quota was exhausted. Still open as P13-01.
- **Article title/description trims:** deferred. They only affect click-through rate, and those pages have no impressions yet.

## Expected effect

On-page fixes alone won't move the web design pages. The SEO pages are close enough to page 1 that the title and copy changes could show up within 2–6 weeks. Check on 2026-11-23 against the baseline in `SEO-MONITORING.md`. **The single highest-impact next step is B-05 and B-06** (Google Business Profile and directory listings), and both need the owner.
