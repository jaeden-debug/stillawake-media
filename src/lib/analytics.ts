/**
 * Analytics events.
 *
 * Two tiers, and the distinction is the whole point:
 *
 * **Primary** — an actual lead. `contact_form_submit` on this site, and
 * `generate_lead` on the Studio when someone finishes onboarding. These are
 * the only events that should ever be marked as conversions in GA4 or
 * imported into Google Ads. A campaign optimised toward anything else learns
 * to buy people who click.
 *
 * **Secondary** — diagnostics. `cta_click_start` tells us which page pushed
 * someone toward the Studio; `start_onboarding` tells us whether the hand-off
 * across domains actually works. Useful, never a conversion.
 *
 * Everything here is a no-op until GA4 has loaded, and GA4 respects the
 * consent state set in `lib/consent.ts` — a visitor who declined still
 * generates cookieless pings, so events are counted without being tied to a
 * person. Nothing here needs its own consent check.
 */

type GtagFn = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { gtag?: GtagFn }).gtag;
  // Before gtag.js loads, calls queue into dataLayer via the consent stub in
  // root-shell, so an early click is still recorded rather than dropped.
  fn?.(...args);
}

/** PRIMARY — a real enquiry was submitted on stillawakemedia.com. */
export function trackContactSubmit(service: string, locale: "en" | "fr") {
  gtag("event", "contact_form_submit", {
    service,
    locale,
    // Marks the event as the one worth optimising toward, so the GA4 admin
    // side has an unambiguous signal to promote to a key event.
    is_primary_conversion: true,
  });
}

/** SECONDARY — someone clicked through to the Studio onboarding. */
export function trackStartClick(source: string, locale: "en" | "fr") {
  gtag("event", "cta_click_start", { source, locale });
}

/** SECONDARY — diagnostic only. Never a conversion. */
export function trackPricingCtaClick(plan: string) {
  gtag("event", "pricing_cta_click", { plan });
}

/**
 * SECONDARY — movement through the llms.txt cluster.
 *
 * The cluster's whole thesis is that a platform guide feeds the tool and the
 * tool feeds the AEO service page. That is a claim about behaviour, and
 * without this event it is unfalsifiable: GA4 page views tell us a guide was
 * read, not whether anyone moved along the path we built for them.
 *
 * `from` is the page path, so the same event answers "which guide converts
 * into tool usage" and "which page sends people to the service page" without
 * a second event type. Never a conversion.
 */
export function trackClusterClick(from: string, to: "tool" | "service" | "guide") {
  gtag("event", "llms_cluster_click", { from, to });
}

/**
 * SECONDARY — the project cost calculator funnel.
 *
 * Four events, deliberately: started, what they said they wanted, finished,
 * and whether the estimate pushed them into the Studio. Together those answer
 * the only three questions worth asking of this tool — which projects people
 * come here for, how many abandon it, and whether an estimate converts.
 *
 * PRIVACY: no free-text ever reaches GA4. `projectType` is one of the seven
 * published answer keys from the question flow, never a description of the
 * business, and the estimate is reported as a rounded band rather than an
 * exact figure so no single visitor's project is identifiable in the reports.
 * None of these are conversions — `contact_form_submit` and Studio's
 * `generate_lead` remain the only two.
 */
export function trackCalculatorStarted(locale: "en" | "fr") {
  gtag("event", "calculator_started", { locale });
}

export function trackProjectTypeSelected(projectType: string, locale: "en" | "fr") {
  gtag("event", "project_type_selected", { project_type: projectType, locale });
}

/** Buckets keep an individual estimate out of the report while keeping it useful. */
function band(low: number, high: number): string {
  const mid = (low + high) / 2;
  if (mid < 5000) return "under_5k";
  if (mid < 10000) return "5k_10k";
  if (mid < 25000) return "10k_25k";
  if (mid < 50000) return "25k_50k";
  return "over_50k";
}

export function trackCalculatorCompleted(low: number, high: number, locale: "en" | "fr") {
  gtag("event", "calculator_completed", { estimate_band: band(low, high), locale });
}

export function trackStudioFromEstimate(low: number, high: number, locale: "en" | "fr") {
  gtag("event", "studio_started_from_estimate", { estimate_band: band(low, high), locale });
}
