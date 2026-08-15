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
