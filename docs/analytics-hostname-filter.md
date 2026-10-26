# Reading stillawakemedia.com traffic on its own in GA4

stillawakemedia.com and stillawake.studio share one GA4 property (`G-KE1CWNHY0S`) on purpose: cross-domain measurement keeps a visitor's original source (Google Ads, organic search) attached when they move from the site to the Studio intake, where leads convert. Splitting the property would make every Studio lead look like a referral from stillawakemedia.com.

The cost of sharing is that GA4's default reports mix both sites. Studio pages such as `/start` show up as if they were stillawakemedia.com pages, and so does anything Zylx reads from this property. Decision (2026-10-26): keep the shared property and filter by hostname when reading this site's numbers.

## In GA4 reports (saved comparison)

1. Open any report, for example **Reports → Acquisition → Traffic acquisition**.
2. Click **Add comparison** (top of the report).
3. Dimension **Hostname**, match type **exactly matches**, value `stillawakemedia.com`. Apply.
4. Optionally add a second comparison with `stillawake.studio`, to see both side by side.
5. Save the comparison (**Saved comparisons → Save**) so it can be reapplied in one click.

## In an Exploration (for landing pages)

1. **Explore → Free form**.
2. Dimensions: Hostname, Landing page + query string, Session default channel group. Metrics: Sessions, Engaged sessions, Key events.
3. Filter: **Hostname exactly matches `stillawakemedia.com`**.

## Things to know

- The cross-domain hand-off itself still appears as one session spanning both hostnames. That's the point of sharing.
- `www.stillawakemedia.com` redirects to `stillawakemedia.com`, so it should not appear as a separate hostname. If it does, include it in the filter.
- Zylx summaries for the StillAwake Media workspace read the whole property, so their session counts include Studio. Check the filtered GA4 view before drawing conclusions from small numbers.
- Landing pages such as `/prints` that exist on neither site are old inbound links. `/collab-sign-up` and `/contact-us` now redirect to `/contact`.
