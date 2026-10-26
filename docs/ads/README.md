# Google Ads: paused for now, ready for winter

Account 800-560-2976 (CAD, Toronto time). Decision 2026-10-26: pause paid search until winter, then relaunch on a budget that can afford clicks. This file is the state and the runbook. The campaign itself is specified in [`search-campaign.json`](search-campaign.json), which is the single source for keywords, ads, negatives and settings.

## Why the old campaign stopped

"Campaign #1" (Performance Max, $2/day):
- **Results, last 90 days:** $4.64 spent, 7 clicks at $0.66, 0 conversions.
- **Search terms:** none recorded.
- **Why:** Keyword Planner puts the low end of top-of-page bids for the target searches at about $3–$9 CAD (median about $6), and the high end at $9–$84. At $2/day the campaign can't enter those auctions, so the money went to cheap non-search inventory.

## Current state

| Item | State | Evidence |
|---|---|---|
| Campaign #1 (PMax) pause | Approved in Zylx (change `ed0f4486`). **Not applied yet:** Zylx won't execute Google Ads actions until its one-time live test passes (see "Still to do"). | `approve_pending_action` → `approved_pending`, reason "No successful live round-trip test recorded" |
| Zylx Google Ads writes | On, with guards: no auto-execution, approval required. Resume, budget change and delete are **blocked**, so Zylx can never start spend. | `update_provider_write_settings`, 2026-10-26 |
| Zylx credential check | Write access verified (validate-only probe) | `setup_provider_execution` → `enabled_credentials_verified` |
| New Search campaign | Specified and validated (6 ad groups, 39 keywords, 37 negatives; every headline ≤30 and description ≤90 characters). Built **paused** once Zylx execution is ready. | `search-campaign.json` |
| Landing pages | All 6 final URLs, plus sitelink targets and /thank-you, return 200 | Checked 2026-10-26 |

**Full-autonomy note:** the workspace runs in `full_autonomy` mode, which lets Zylx run *low-risk* Google Ads actions (pause, adding negative keywords, creating ad groups) without asking. Anything that spends money (resume, budget changes) is blocked or never-auto.

## The new campaign (summary)

- **Network:** Search only. Search partners and the Display network are both off.
- **Where:** Montréal, Laval and Longueuil, presence only. **Languages:** English and French.
- **Budget:** **$25 CAD/day** (up to about $760/month while running), the recommended minimum. It buys about 4 clicks a day at the median low-end bid of about $6. Less than that takes months to produce data worth acting on.
- **Bidding:**
  - At launch: Maximize clicks with a $10 maximum cost per click. There's no conversion history yet to bid on.
  - Later: switch to Maximize conversions once there are 15 or more primary conversions in 30 days.
- **Ad groups:** each has its own landing page, and every claim in the ads is backed by a published page.

| Ad group | Landing page |
|---|---|
| EN SEO | /seo-montreal |
| FR SEO | /fr/agence-seo-montreal |
| EN web design | /web-design-montreal |
| FR création de site web | /fr/agence-web-montreal |
| FR prix | /fr/prix-site-web-quebec |
| EN website cost | /website-cost-canada |

## Conversion tracking

This is where the old campaign was weakest.

**What fires today (GA4 property 549901138, last 90 days):**

| Event | Where | Fires when | Count | Key event? |
|---|---|---|---:|---|
| `generate_lead` | stillawake.studio intake | Lead row saved (code: `src/lib/analytics.ts`, `intake-submit.ts`) | 0 | **No** |
| `contact_form_submit` | stillawakemedia.com /contact | Server accepted the form (`contact-form.tsx`) | 2 | **No** |
| `ads_conversion_SUBMIT_LEAD_FORM_1` | GA4/tag-generated, in neither codebase | unclear | 2 (1 user) | Yes, the only one |

**In Google Ads:**
- "Lead form - Submit" (a Google-hosted lead form) and "SUBMIT_LEAD_FORM" (the GA4 import above) are both **Primary**.
- Neither of the two real lead events is imported.

**Fix:** UI-only steps. Neither the GA4 nor the Google Ads conversion settings can be changed through the APIs available here.

1. **GA4 → Admin → Events:** mark `generate_lead` and `contact_form_submit` as **key events**. Leave `ads_conversion_SUBMIT_LEAD_FORM_1` unmarked.
2. **Google Ads → Goals → Conversions → New → Import → Google Analytics 4:** import both key events.
   - Category: Submit lead form.
   - Count: **One**.
   - Set both as **Primary**.
3. **Set to Secondary** (don't delete): "Lead form - Submit" and the old "SUBMIT_LEAD_FORM" import.
4. **Check that `generate_lead` actually fires.** It recorded 0 in 90 days, and the Studio leads database couldn't be read from this session to confirm whether any leads came in. Use GA4 → Admin → DebugView while submitting the Studio intake once yourself, then delete that test lead.

## Still to do (owner)

1. **Zylx live test:** run it once in the Zylx app (Google Ads → execution readiness → live test). It adds a temporary negative keyword to a campaign, checks it, and removes it. This session doesn't have that tool. After it passes:
   - the approved pause applies;
   - the new campaign can be built paused from `search-campaign.json`.
2. **Conversion fixes:** steps 1–4 above.
3. **Sitelinks and callouts:** listed in `search-campaign.json`. Zylx has no executor for these, so add them in the Google Ads UI.

## Resume checklist (winter)

1. **Confirm tracking:**
   - GA4 key events show `generate_lead` / `contact_form_submit`;
   - Google Ads lists both as Primary and "Recording conversions".
2. **Check settings:** open the new campaign and confirm Search only, the 3 locations, EN+FR, and the budget you want.
3. **Resume** in the Google Ads UI. Resume is deliberately blocked in Zylx; unblock `google_ads.campaign.resume` there only if you want Zylx to do it.
4. **Day 2:** read the search terms and add negatives for anything off-intent.
5. **Week 2:** check cost per click against the $10 cap and the share of impressions lost to budget.
6. **Bidding:** after 15+ conversions in 30 days, switch to Maximize conversions.
7. **Old PMax campaign:** keep it paused. Don't delete it; its history stays useful.
