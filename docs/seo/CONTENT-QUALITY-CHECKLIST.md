# Content quality checklist

Run for every new or substantially rewritten editorial article and tool page. Automated checks support editorial judgment; they don't replace it.

## Editorial (manual)

- [ ] First paragraph answers the search intent directly (bolded core answer).
- [ ] At least 1,500 words of body prose (articles only), target 1,800–3,000. Count excludes frontmatter and code blocks:
  `awk 'BEGIN{c=0} /^---$/{c++; next} c>=2' FILE | awk '/^```/{f=!f;next} !f' | wc -w`
- [ ] No invented search volumes, rankings, testimonials, client results, prices, performance numbers or test results.
- [ ] Every StillAwake price comes from `src/lib/pricing/model.ts` or a published page that renders from it.
- [ ] Time-sensitive facts carry "as of <month year>" and link the primary source.
- [ ] Documented platform behaviour is separated from hypotheses.
- [ ] Projects described accurately: Blackwater = our own store; Stillskin Forest = in development; RISK IT! = public on Roblox.
- [ ] No guarantees of rankings, AI citations or rich results. No claim that llms.txt is required or used by Google Search.
- [ ] Promotion is contextual (1–2 mentions + one closing next step).
- [ ] Cannibalization decision recorded in `CANNIBALIZATION-AUDIT.md`.
- [ ] Code samples are labelled as simplified and use current APIs.

## Technical (automated where possible)

| Check | How |
|---|---|
| Typecheck, lint, unit tests | `npx tsc --noEmit`, `npx eslint`, `npx vitest run` |
| Production build | `npm run build` |
| Titles, descriptions, H1, canonical, noindex, hreflang, alt, broken links, links to redirects, orphans, duplicates | `node scripts/seo-crawl.mjs http://localhost:PORT` on `next start` |
| Published prices agree with the model | `src/lib/pricing/published-prices.test.ts` (in vitest) |
| Page-schema registry covers static routes | `src/lib/page-schema.test.ts` |
| JSON-LD parses; correct dates and canonical | parse `application/ld+json` blocks on rendered HTML |
| No horizontal overflow at 375px | iframe scrollWidth check in the browser preview |
| One H1 | the template renders the title as H1; markdown must not start with `# ` (it's stripped centrally, but don't rely on it) |

## Results for this program (2026-10-29, local production build)

- tsc clean; eslint clean on changed files; vitest 30 files, 911 passed, 2 skipped.
- Build exit 0. Crawl of 338 URLs: non200 0, missingTitle 0, dupTitles 0, dupDescs 0, h1Not1 0, canonicalNotSelf 0, noindex 0, hreflangNotReciprocal 0, brokenInternalLinks 0, linksToRedirects 0, orphans 0. `longTitle` 134 and `longDesc` 157 remain, as accepted in roadmap P2-05/P2-06.
- All 11 new/rewritten articles: 2,413–3,379 words, no leading H1.
- Overflow: fixed a pre-existing template bug where any code block widened article pages on phones (also affected `what-is-technical-seo`). 0 overflow at 375px and 1280px after the fix.

## Known gap

The crawler counts title length including the " | StillAwake Media" suffix. Several new titles exceed 70 characters with the suffix. Accepted: titles are written for clarity, and Google rewrites as it sees fit.
