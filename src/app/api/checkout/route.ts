import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";

import { getStripe } from "@/lib/stripe/client";
import { checkoutMode, publicLookupKey } from "@/lib/pricing/stripe-catalogue";
import { siteUrl } from "@/lib/data";

/**
 * Checkout session creation.
 *
 * THE SECURITY MODEL, in one paragraph: the browser posts a catalogue ID and a
 * locale. That is the entire accepted vocabulary. There is no field for an
 * amount, a price ID, a quantity, a coupon or a currency, so there is nothing a
 * client can send that changes what it is charged. The ID is checked against
 * `PUBLIC_CHECKOUT_ITEMS`, resolved to a `sa_*_cad` lookup key, and the price
 * is read from Stripe at request time. Anything not on that allowlist — a
 * custom-amount instalment, an emergency tier — is a 404, indistinguishable
 * from a typo.
 *
 * WHY LOOKUP KEYS AND NOT PRICE IDS. Stripe prices are immutable: changing an
 * amount means creating a new price and moving the key onto it. Resolving by
 * key means that migration needs no deploy here, and it means this file
 * contains no number that could disagree with the pricing model.
 *
 * TAX. `automatic_tax` is on and every price is `tax_behavior: exclusive`, so
 * GST/QST is added on top of the published figure. That requires an address,
 * which is why billing address collection is REQUIRED rather than auto — with
 * no address Stripe cannot determine a jurisdiction and quietly charges zero.
 *
 * Nothing is stored here. The Checkout Session is the record, and Stripe emails
 * the receipt.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** A payment attempt is rarer than a price check — this is tighter than the estimator. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const recent = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 1000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const RETURN_PATHS = {
  en: { success: "/checkout/complete", cancel: "/pricing" },
  fr: { success: "/fr/paiement/complete", cancel: "/fr/tarifs" },
} as const;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  /* Cards get tested against payment endpoints by bots; this one creates real
     sessions, so it is gated the same way the contact form is. A failure to
     evaluate is treated as a bot — fail closed, not open. */
  try {
    const { isBot } = await checkBotId();
    if (isBot) return NextResponse.json({ error: "Request blocked." }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Request blocked." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = (body ?? {}) as Record<string, unknown>;
  const locale: "en" | "fr" = payload.locale === "fr" ? "fr" : "en";

  const lookupKey = publicLookupKey(payload.item);
  if (!lookupKey) {
    return NextResponse.json({ error: "Not available for online purchase." }, { status: 404 });
  }

  const stripe = getStripe();
  if (!stripe) {
    console.error("[checkout] STRIPE_SECRET_KEY is not configured");
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable. Please get in touch and we'll invoice you." },
      { status: 503 },
    );
  }

  try {
    const prices = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 });
    const price = prices.data[0];
    /* A missing price means the catalogue and this deploy disagree — most
       likely a test-mode key against a live-mode catalogue. Never fall back to
       a hardcoded amount; refuse. */
    if (!price) {
      console.error(`[checkout] no active price for lookup key ${lookupKey}`);
      return NextResponse.json(
        { error: "Checkout is temporarily unavailable. Please get in touch and we'll invoice you." },
        { status: 503 },
      );
    }

    const mode = checkoutMode(String(payload.item));
    const paths = RETURN_PATHS[locale];

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: price.id, quantity: 1 }],
      locale,
      /* Required, not "auto": automatic_tax needs a jurisdiction, and without
         an address it resolves to no tax at all rather than failing. */
      billing_address_collection: "required",
      automatic_tax: { enabled: true },
      /* A registered business can enter its GST/QST number, which Stripe puts
         on the invoice — the difference between a receipt they can claim and
         one they cannot. */
      tax_id_collection: { enabled: true },
      ...(mode === "payment"
        ? { customer_creation: "always" as const, invoice_creation: { enabled: true } }
        : {}),
      /* Subscriptions need the address stored on the customer so renewals are
         taxed the same way the first charge was. */
      ...(mode === "subscription"
        ? { customer_update: undefined, subscription_data: { metadata: { item: String(payload.item) } } }
        : {}),
      metadata: { item: String(payload.item), lookup_key: lookupKey, locale },
      success_url: `${siteUrl}${paths.success}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${paths.cancel}`,
    });

    if (!session.url) throw new Error("Stripe returned a session with no URL");
    return NextResponse.json({ url: session.url }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    console.error("[checkout] session creation failed", error);
    return NextResponse.json(
      { error: "Checkout could not be started. Please get in touch and we'll invoice you." },
      { status: 502 },
    );
  }
}

function methodNotAllowed() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
