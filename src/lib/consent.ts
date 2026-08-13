/**
 * Analytics consent.
 *
 * Three trackers run on this site and they do not need the same treatment:
 *
 * - **GA4** sets `_ga` / `_ga_*` and profiles a visitor across pages. Gated.
 * - **Microsoft Clarity** sets `_clck` / `_clsk` and records the session —
 *   mouse movement, scrolling, clicks. Session replay is the most invasive
 *   thing on the site, and Clarity has no consent-mode equivalent, so the
 *   script must not load at all until consent is given. Gated hardest.
 * - **Ahrefs Web Analytics** sets no cookies and no identifiers (verified in
 *   the browser: it requests `analytics.js` and posts one `api/event`, and
 *   `document.cookie` stays empty of any Ahrefs key). It measures page counts,
 *   not people, so it is treated as strictly necessary and is not gated.
 *
 * Storing the visitor's answer is itself strictly necessary — a site is
 * allowed to remember that you said no — so this uses localStorage under the
 * same origin rather than another cookie.
 */

export const CONSENT_KEY = "sam-consent";
export const CONSENT_VERSION = 1;

export type ConsentChoice = "granted" | "denied";

export type ConsentRecord = {
  v: number;
  analytics: ConsentChoice;
  /** ISO date — evidence of when consent was collected, which Law 25 expects. */
  at: string;
};

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    // A stored answer to an older question is not an answer to this one.
    if (parsed?.v !== CONSENT_VERSION) return null;
    if (parsed.analytics !== "granted" && parsed.analytics !== "denied") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: ConsentChoice): ConsentRecord {
  const record: ConsentRecord = {
    v: CONSENT_VERSION,
    analytics,
    at: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    // Private mode with storage disabled: the banner reappears next visit,
    // which is the correct failure direction — we never assume consent.
  }
  return record;
}

/**
 * The Consent Mode v2 signal sent to Google.
 *
 * `ad_*` are denied permanently, not tied to the choice: this site runs no
 * advertising or remarketing tags, so there is nothing to grant. If a Google
 * Ads remarketing tag is ever added, that decision has to be made explicitly
 * here rather than inherited by accident.
 */
export function googleConsentPayload(analytics: ConsentChoice) {
  return {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: analytics,
    functionality_storage: "granted",
    security_storage: "granted",
  } as const;
}
