# Conversion tracking (audited 2026-10-26)

## Lead paths

| Path | Where | What fires |
|---|---|---|
| Contact form (EN `/contact`, FR `/fr/contact`) | `src/components/contact-form.tsx` | `trackContactSubmit(service, locale)` → GA4 `contact_form_submit`. It fires only after the server returns success (`setStatus("sent")`), so failed submissions aren't counted. |
| "Start your project" buttons | to `https://stillawake.studio/start` | `cta_click_start`. The lead itself completes on stillawake.studio, which shares the GA4 property on purpose. |
| Project cost calculator | `/tools/project-cost-calculator` | `calculator_completed` (engagement, not a lead) |
| Email | `mailto:` links on the EN and FR privacy pages only | Not tracked. Not a real lead path. |

No phone number is published, so there's no call tracking to set up.

## GA4 (last 90 days, whole property)

- `contact_form_submit`: 2
- `ads_conversion_SUBMIT_LEAD_FORM_1`: 2. These are the same two leads, recorded by the Google Ads tag.
- `start_onboarding`: 4. These happen on stillawake.studio.

The property is shared with stillawake.studio. To read this site on its own, filter by hostname as described in `docs/analytics-hostname-filter.md`.

## Google Ads conversion actions

Two **primary** actions both count form submissions:

1. **"Lead form - Submit".** Category LEAD_FORM_SUBMIT, counting ONE_PER_CLICK.
2. **"SUBMIT_LEAD_FORM".** Imported from GA4, counting MANY_PER_CLICK.

With both set to primary, one lead can be counted twice for bidding, and the MANY_PER_CLICK setting can inflate it further. **Recommendation (B-01):** keep one as primary (the GA4 import, so Ads and GA4 agree) and switch the other to secondary. This is an account change, so it's waiting for the owner's approval.

## Organic leads

- With 2 form submissions in 90 days, an organic lead number can't be reported with any confidence.
- **To check:** GA4 → Reports → Engagement → Events → `contact_form_submit`, with "Session default channel group" as a secondary dimension and the hostname filter applied.
- Review this monthly in `SEO-MONITORING.md`.
