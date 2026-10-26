# SEO monitoring

## Weekly (5 minutes)

- **Search Console:** last 7 days of clicks, impressions, and top pages and queries. Use the device breakdown for totals; page rows double-count.
- **Crawl:** run `node scripts/seo-crawl.mjs`. Everything except `longTitle` and `longDesc` should be 0.
- **Deploys:** after every production deploy, confirm IndexNow ran (`/api/cron/indexnow` daily at 14:30 UTC, or `scripts/indexnow-submit.mjs`).

## Monthly

- **Priority page positions.** Record them in the table below:
  - /seo-montreal
  - /fr/agence-seo-montreal
  - /web-design-montreal
  - /fr/agence-web-montreal
  - /fr/prix-site-web-quebec
- **GA4:** organic sessions and `contact_form_submit` by channel, filtered to hostname `stillawakemedia.com`, plus the AI Assistant channel.
- **Ads:** check the search terms, and confirm only one primary lead conversion is set.

## Review dates

| Date | Review |
|---|---|
| 2026-11-23 | 28 days after batch 1 |
| 2026-12-07 | Revisit targets in `MASTER-SEO-ROADMAP.md` |
| 2027-01-31 | 90-day target check |

## Position log

| Date | /seo-montreal | /fr/agence-seo-montreal | /web-design-montreal | /fr/agence-web-montreal | /fr/prix-site-web-quebec | 90d impressions | 90d clicks |
|---|---|---|---|---|---|---:|---:|
| 2026-10-24 (baseline) | 14.0 (all-time) | 9.7 | 49.4 page / ~96 queries | 84.6 | 14.2 | 156 | 20 |
