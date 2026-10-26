# Blockers and approvals

These are account-level or external actions. Each one waits for the owner's explicit go-ahead or needs the owner to do it.

| ID | Action | Why | Who | Risk if skipped | Status |
|---|---|---|---|---|---|
| B-01 | Google Ads: keep one primary lead conversion and set the other to secondary | Two primary actions can double-count each lead for bidding | Owner (or Claude with approval) | Smart bidding learns from inflated numbers | Superseded by `docs/ads/README.md` (conversion tracking): import generate_lead + contact_form_submit as the primary goals |
| B-02 | Google Ads PMax: change final URL from `https://www.stillawakemedia.com/` to `https://stillawakemedia.com/` | Saves a 308 hop on every paid click | Owner (or Claude with approval) | Small speed and attribution cost | Moot: Campaign #1 is being paused (approved in Zylx, waiting on the live test) |
| B-03 | Search Console: URL Inspection → Request indexing for /seo-montreal, /fr/agence-seo-montreal, /web-design-montreal, /fr/agence-web-montreal, /, /contact | Not available through the API | Owner | Slower re-crawl. IndexNow covers Bing and Yandex, not Google. | Waiting |
| B-04 | Bing Webmaster Tools: confirm the site is verified and the sitemap submitted | Not visible from here | Owner | Bing and Copilot discovery | Waiting |
| B-05 | Google Business Profile: claim, verify and complete it | Local map-pack visibility | Owner | No map-pack presence | Copy ready in `DIRECTORY-PROFILES.md` §7; owner creates and verifies the profile |
| B-06 | Directory profiles: Clutch, HelloDarwin, Semrush Agency Partners | These directories rank on page 1 for the priority terms | Owner (publishes external listings) | Missing the fastest route onto those results pages | Copy ready in `DIRECTORY-PROFILES.md` §1–6; owner creates and publishes the listings |
| B-07 | Vercel: make `http://www.stillawakemedia.com` redirect to the apex in one hop | Currently two hops | Owner (domain setting) | Minor | Waiting |
| B-08 | Semrush API units or an Ahrefs plan upgrade | Needed for backlink, keyword-difficulty and competitor data | Owner (paid) | Backlink audit stays empty | Waiting |
| B-09 | "Site by StillAwake Media" credit link on client sites | Legitimate links from real work | Owner, with each client's consent | Lower authority | Waiting |
| B-11 | CMS: update the published copies of 3 articles (best-website-design-for-small-businesses-2026, website-performance, why-modern-businesses-are-moving-away-from-wordpress) so their links skip the redirects | Production serves the CMS copy, not the markdown that was fixed | Claude, once the owner OKs editing published CMS content | 3 extra 308 hops, minor | Done 2026-10-26: owner approved crediting Jaeden Doody; republished via `stillawakemedia.dev/scripts/fix-redirect-links.mts` |
| B-12 | CMS author for what-is-a-custom-web-application, why-nextjs-is-the-best-framework-for-modern-websites, what-makes-a-luxury-brand-website-feel-premium | Their link updates are saved but can't publish without an author; setting Jaeden Doody changes the byline from StillAwake Media | Owner decision | The three articles keep their old internal links | Done 2026-10-26: owner approved crediting Jaeden Doody; all three republished |
| B-10 | (Optional) Revisit splitting the GA4 property between the site and Studio | Decided 2026-10-26 to keep it shared and filter by hostname | Owner | None for now | Decided: keep shared |

Never done without explicit permission: purchases, outreach or review requests, Ads budget or bidding changes, new campaigns, external listings, or ownership settings.
