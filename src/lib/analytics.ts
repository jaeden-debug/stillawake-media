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
 * SECONDARY — discovery diagnostics for the portfolio, games and wiki.
 * None of these is a conversion. A Roblox outbound click means someone left
 * for the Roblox page, not that they played.
 */

/** A site, portfolio or wiki search the visitor paused on. `results: 0`
 *  doubles as the missing-content report: it lists what people looked for
 *  and didn't find. */
export function trackSiteSearch(scope: string, query: string, results: number) {
  gtag("event", "site_search", {
    search_scope: scope,
    search_term: query.slice(0, 100),
    results,
    no_results: results === 0,
  });
}

/**
 * A click on any element carrying `data-track`. Lets server components mark
 * CTAs without becoming client components: the delegated listener in
 * OutboundTracking reads the attributes.
 */
export function trackTaggedClick(name: string, params: Record<string, string>) {
  gtag("event", name, params);
}

/** First page of a session arriving from a known AI assistant. Most AI
 *  traffic sends no referrer at all, so this undercounts by design. */
export function trackAiReferral(source: string, landing: string) {
  gtag("event", "ai_referral", { ai_source: source, landing_page: landing });
}
