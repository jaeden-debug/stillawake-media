/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — COPY-PASTE BREAKDOWN
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Turns an estimate into text an operator can paste into an email or a
 * proposal without editing it first.
 *
 * TWO AUDIENCES, TWO FUNCTIONS, AND THEY MUST NOT BE CONFUSED.
 * `clientBreakdown` is safe to send: a range, what is included, what is not,
 * and payment options. `internalBreakdown` carries effort, implied day rate and
 * opportunity value, and must never be pasted to a client. They are separate
 * functions rather than one function with a flag, because a flag defaulting the
 * wrong way is how internal figures end up in a client's inbox.
 */

import { formatCad, labelForKey, type Locale } from "./labels";
import { PUBLIC_PAYMENT_COUNTS, MIN_PAYMENT } from "./payments";
import type { Estimate } from "./types";

const money = (n: number, locale: Locale) => formatCad(n, locale);

/**
 * Client-safe breakdown. Everything here is already public: the range, the
 * scope, the exclusions, the payment options and the fact that it is not a
 * quote. Nothing internal crosses this boundary.
 */
export function clientBreakdown(
  estimate: Estimate,
  opts: { locale?: Locale; projectName?: string } = {},
): string {
  const locale = opts.locale ?? "en";
  const fr = locale === "fr";
  const L = fr
    ? {
        range: "Fourchette estimée",
        from: "À partir de",
        includes: "Ce qui est inclus",
        excludes: "Non inclus",
        drivers: "Ce qui fait bouger le prix",
        payments: "Options de paiement",
        each: "par versement",
        payNote:
          "Même prix total. Aucun intérêt, aucuns frais, rien de plus pour étaler les versements.",
        notQuote:
          "Estimation préliminaire, pas une soumission. Le prix ferme est établi dans la proposition écrite.",
        discovery: "Ce projet commence par un cadrage payant",
        model: "Modèle tarifaire",
      }
    : {
        range: "Estimated range",
        from: "Starting around",
        includes: "What's included",
        excludes: "Not included",
        drivers: "What moves the price",
        payments: "Payment options",
        each: "per payment",
        payNote: "Same total price. No interest, no fees, nothing extra for paying over time.",
        notQuote:
          "A preliminary estimate, not a quote. The firm price is set in the written proposal.",
        discovery: "This project starts with paid discovery",
        model: "Pricing model",
      };

  const out: string[] = [];
  if (opts.projectName) out.push(opts.projectName, "");

  if (estimate.needsDiscovery) {
    out.push(`${L.from} ${money(estimate.low, locale)}`, "", L.discovery);
  } else {
    out.push(`${L.range}: ${money(estimate.low, locale)} – ${money(estimate.high, locale)}`);
  }

  const section = (title: string, items: string[]) => {
    if (items.length === 0) return;
    out.push("", title, ...items.map((i) => `  - ${i}`));
  };

  /* The engine returns KEYS, not prose — that is what lets one model serve two
     languages and the internal estimator. Anything pasted to a client has to go
     through the label table first, or they receive "bookings.integrate". */
  const say = (keys: string[]) => keys.map((k) => labelForKey(k, locale));
  section(L.includes, say(estimate.includes));
  section(L.drivers, say(estimate.drivers));
  section(L.excludes, say(estimate.excludes));

  /* Payment options only where they are honest: a discovery-routed project has
     no range to divide, and dividing a starting figure would imply a total we
     have not established. */
  if (!estimate.needsDiscovery) {
    const rows = PUBLIC_PAYMENT_COUNTS.map((count) => ({
      count,
      low: Math.round(estimate.low / count),
      high: Math.round(estimate.high / count),
    })).filter((r) => r.low >= MIN_PAYMENT);

    if (rows.length > 0) {
      out.push("", L.payments);
      for (const r of rows) {
        const n = fr ? `${r.count} versements` : `${r.count} payments`;
        out.push(`  ${n}: ${money(r.low, locale)} – ${money(r.high, locale)} ${L.each}`);
      }
      out.push(`  ${L.payNote}`);
    }
  }

  out.push("", L.notQuote, `${L.model} ${estimate.pricingVersion}`);
  return out.join("\n");
}

/**
 * Internal breakdown. Effort, implied day rate, opportunity value and the
 * per-line bands.
 *
 * NEVER SEND THIS TO A CLIENT. The implied day rate in particular tells them
 * exactly how to argue the price down, and the opportunity value tells them
 * what a competitor would have charged.
 */
export function internalBreakdown(
  estimate: Estimate,
  opts: { projectName?: string; clientName?: string } = {},
): string {
  const out: string[] = ["INTERNAL — do not send to client", ""];
  if (opts.projectName) out.push(`Project: ${opts.projectName}`);
  if (opts.clientName) out.push(`Client:  ${opts.clientName}`);
  if (opts.projectName || opts.clientName) out.push("");

  out.push(
    `Sell range      ${money(estimate.low, "en")} – ${money(estimate.high, "en")}`,
    `Expected        ${money(estimate.expected, "en")}`,
    `Effort          ${estimate.days.expected}d (${estimate.days.low}–${estimate.days.high})`,
    `Implied rate    ${money(estimate.internalRate, "en")}/day`,
    `Opportunity     ${money(estimate.internalValue.low, "en")} – ${money(estimate.internalValue.high, "en")}`,
    `Spread          ${(estimate.high / estimate.low).toFixed(2)}x`,
    `Tier            ${estimate.tier}`,
    `Model           ${estimate.pricingVersion} (${estimate.modelChecksum})`,
  );

  if (estimate.needsDiscovery) {
    out.push("", `DISCOVERY: ${estimate.discoveryReason ?? "scope not established"}`);
  }

  if (estimate.lines.length > 0) {
    out.push("", "Lines");
    for (const l of estimate.lines) {
      const band =
        l.band.low === l.band.high
          ? money(l.band.low, "en")
          : `${money(l.band.low, "en")}–${money(l.band.high, "en")}`;
      const kind = l.addKind ? ` [${l.addKind}]` : "";
      out.push(`  ${labelForKey(l.key, "en")}${kind}: ${band}`);
    }
  }

  out.push(
    "",
    `Low assumes:  ${estimate.lowAssumption}`,
    `High assumes: ${estimate.highAssumption}`,
  );

  return out.join("\n");
}
