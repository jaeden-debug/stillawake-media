# Google Ads: paused for now, ready for winter

Account 800-560-2976 (CAD, Toronto time). Decision 2026-10-26: pause paid search until winter, then relaunch on a budget that can afford clicks. This file is the state and the runbook. The campaign is specified in [`search-campaign.json`](search-campaign.json), which is the single source for keywords, ads, negatives and settings. As of 2026-10-26 the campaign is **built in Google Ads and paused**.

## Why the old campaign stopped

"Campaign #1" (Performance Max, $2/day):
- **Results since Aug 10, 2026 (Google Ads UI, read 2026-10-26):** CA$62.25 spent, 11,643 impressions, 249 clicks, 0 conversions.
  - An earlier figure in this file ($4.64, 7 clicks) came from a 90-day Zylx read and was wrong. The UI number above is authoritative.
- **Search terms:** none recorded.
- **Why:** Keyword Planner puts the low end of top-of-page bids for the target searches at about $3–$9 CAD (median about $6), and the high end at $9–$84. At $2/day the campaign can't enter those auctions, so the money went to cheap non-search inventory.

## Current state (verified in the Google Ads UI, 2026-10-26)

| Item | State |
|---|---|
| Campaign #1 (PMax, ID 24143680714) | **Paused.** Kept, not deleted, for its history. |
| New campaign "Search \| Leads \| Montréal EN-FR" (ID 24394172619) | **Paused.** Built to the spec; summary below. |
| Ad groups | 6 of 6, each with 1 responsive search ad. All 6 ads and 20 assets were "under review" at creation; they show "Not eligible" only because the campaign is paused. |
| Keywords | 39 of 39 |
| Negative keywords | 37 of 37, phrase match, campaign level |
| Sitelinks | 8, campaign level: Pricing, Our Work, SEO Plans, Contact, Tarifs, Réalisations, Forfaits SEO, Nous joindre. No descriptions; the spec has none. |
| Callouts | 12, campaign level (6 EN, 6 FR, from the spec) |
| Conversions | See "Conversion tracking" below |
| Zylx Google Ads writes | On, with guards: no auto-execution, approval required. Resume, budget change and delete are **blocked**, so Zylx can never start spend. |
| Zylx pause change `ed0f4486` | Approved but never executed (Zylx's live test was never run). The campaign was paused in the UI instead, so this change is redundant; reject it in the Zylx approval queue if it bothers you. |

## The new campaign

- **Status:** paused. **Start date:** January 1, 2027, with no end date. The start date is a second guard: even if resumed early, nothing serves before then.
- **Network:** Google Search only. Search partners and the Display network are off.
- **Where:** Montréal, Laval and Longueuil, presence only (people in or regularly in these places).
- **Languages:** Google no longer offers a language setting for this campaign; it shows "All languages" and matches by the searcher's language. The ad groups are split EN/FR by keyword and copy instead.
- **Budget:** **CA$25/day** (up to about $760/month while running), the recommended minimum. Google's estimate at build time for the EN SEO ad group was about 30 clicks a week at about CA$5.83 per click.
- **Bidding:**
  - At launch: Maximize clicks with a CA$10 maximum cost per click. There's no conversion history yet to bid on.
  - Later: switch to Maximize conversions once there are 15 or more primary conversions in 30 days.
- **Turned off:** AI Max (text and URL expansion), automatically created assets, broad match. Ad rotation: optimize.
- **Ad groups:** each has its own landing page, and every claim in the ads is backed by a published page.

| Ad group | Keywords | Landing page | Headlines / descriptions | Ad strength at build |
|---|---:|---|---|---|
| EN \| SEO Montréal | 8 | /seo-montreal | 15 / 4 | Good |
| FR \| Agence SEO Montréal | 7 | /fr/agence-seo-montreal | 15 / 4 | Good |
| EN \| Web Design Montréal | 7 | /web-design-montreal | 15 / 4 | Good |
| FR \| Création site web Montréal | 7 | /fr/agence-web-montreal | 15 / 4 | Good |
| FR \| Prix site web | 5 | /fr/prix-site-web-quebec | 11 / 3 | Average |
| EN \| Website cost | 5 | /website-cost-canada | 11 / 3 | Average |

The two price ad groups are "Average" because the spec has 11 headlines for them, not 15. Adding 4 more true headlines each would lift them.

## Conversion tracking

**Google Ads (Goals → Conversions), as set 2026-10-26:**

| Conversion action | Source | Goal | Count | Role |
|---|---|---|---|---|
| Studio lead (thank-you page), renamed from "SUBMIT_LEAD_FORM" | GA4 event `ads_conversion_SUBMIT_LEAD_FORM_1` (page load of /thank-you) | Submit lead forms | One | **Primary** |
| www.stillawakemedia.com (web) contact_form_submit | GA4 key event `contact_form_submit` | Request quotes | One | **Primary** |
| Lead form - Submit | Google-hosted lead form | Submit lead forms | — | Secondary |

The campaign uses the account-default goals: Submit lead forms and Request quotes.

**GA4 (property 549901138):**
- `contact_form_submit` is now a key event.
- `generate_lead` (stillawake.studio intake) recorded 0 events in 90 days. Over the same period `start_onboarding` recorded 4, from the same tag with no redirect after it. The event fired in the same tick as the redirect to /thank-you and lost the race. **Fixed 2026-10-26** ([stillawake.studio#1](https://github.com/jaeden-debug/stillawake.studio/pull/1), live as `d902e37`): the redirect now waits for gtag's send confirmation (at most 1.5 s) and the hit goes by beacon. GA4 only lists an event once it has received it, so it can't be starred until the first real or test lead arrives.
- **Cross-domain measurement:** the Google tag G-KE1CWNHY0S (Tag Manager → Google tags → "My website" → Configure your domains) lists "Contains stillawakemedia.com" and "Contains stillawake.studio". It was saved 2026-10-26 with the owner's approval and confirmed after a reload. The return redirect to /thank-you now stays in the visitor's original session instead of counting as a stillawake.studio referral. The suggested `*.vercel.app` preview domains were deliberately left out.
- **Do not import `generate_lead` into Google Ads as a primary conversion.** Every Studio lead also loads /thank-you, which is already the primary "Studio lead (thank-you page)", so importing both would count each lead twice. Mark it as a GA4 key event for reporting only.

## Still to do (owner)

1. **First `generate_lead`:** after it arrives (or after one test intake, whose lead you then delete), go to GA4 → Admin → Key events and mark `generate_lead`. Reporting only; see above.
2. **Optional:** reject the redundant Zylx pause `ed0f4486`.

## Resume checklist (winter)

1. **Confirm tracking:** in Google Ads, both primary conversions show "Recording conversions" (submit the site contact form once to test).
2. **Check the ads passed review:** ads and assets should be "Approved", not "Under review" or "Disapproved".
3. **Check settings:** Search only, the 3 locations, the budget you want, and the start date (January 1, 2027; move it if you resume on another day).
4. **Resume** in the Google Ads UI. Resume is deliberately blocked in Zylx; unblock `google_ads.campaign.resume` there only if you want Zylx to do it.
5. **Day 2:** read the search terms and add negatives for anything off-intent.
6. **Week 2:** check cost per click against the $10 cap and the share of impressions lost to budget.
7. **Bidding:** after 15+ conversions in 30 days, switch to Maximize conversions.
8. **Old PMax campaign:** keep it paused. Don't delete it; its history stays useful.
