import "server-only";
import Stripe from "stripe";

/**
 * Stripe client. SERVER ONLY — the `server-only` import makes importing this
 * from a client component a build error rather than a leaked secret key.
 *
 * Returns null when STRIPE_SECRET_KEY is absent, exactly like the CMS client:
 * a build machine or a fork without secrets must degrade to "checkout
 * unavailable", never crash the page that renders a buy button. Callers treat
 * null as a 503, not an exception.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) {
    cached = new Stripe(key, {
      /* Pinning matters here. An unpinned client silently follows Stripe's
         default version for the account, so a dashboard-side version bump
         could change response shapes under a deployed build. This value is the
         one the installed SDK's types are generated against — if a bump is
         wanted, upgrade the SDK and let the compiler name the new version. */
      apiVersion: "2026-07-29.dahlia",
      appInfo: { name: "stillawakemedia.com", url: "https://stillawakemedia.com" },
      maxNetworkRetries: 2,
    });
  }
  return cached;
}

/**
 * Live-mode guard.
 *
 * The catalogue this site sells from exists in LIVE mode. A test key would
 * resolve none of the `sa_*_cad` lookup keys and every checkout would 404 in a
 * way that looks like a catalogue bug rather than a misconfigured environment,
 * so the distinction is surfaced explicitly.
 */
export function isLiveKey(): boolean {
  return (process.env.STRIPE_SECRET_KEY ?? "").startsWith("sk_live_");
}
