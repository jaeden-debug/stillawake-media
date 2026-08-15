/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 3 of 5 · THE ENGINE
 *
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Pure, deterministic, dependency-free.
 *
 *   base + additions + search scope + proportional process + risk
 *
 * Additions are FLAT amounts, not multipliers on the whole project. That is
 * the correction at the heart of this version: the only proportional term left
 * is stakeholder review, capped at 8%, because review rounds genuinely scale
 * with the project while accessibility conformance does not.
 *
 * Days ride alongside the money the whole way and never influence it. They
 * exist so `internalRate` can report what the price implies per day.
 */

import {
  ADDITIONS,
  AGGREGATION_EXPONENT,
  BASES,
  BASE_RECURRING,
  BUDGET_BANDS,
  DISCOVERY_SIZE_THRESHOLD,
  EXCLUSIONS,
  MINIMUM,
  MODEL_CHECKSUM,
  PRICING_VERSION,
  RECURRING_BY_ID,
  RISK,
  ROUNDING,
  SEO_SCOPES,
} from "./model";
import type {
  AdditionId,
  Band,
  BaseId,
  Days,
  Estimate,
  EstimateInput,
  LineItem,
  SeoScopeId,
} from "./types";

/** Thrown for any input the model does not recognise. Never leaks internals. */
export class PricingInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PricingInputError";
  }
}

const ZERO: Band = { low: 0, expected: 0, high: 0 };
const ZERO_DAYS: Days = { low: 0, expected: 0, high: 0 };

const add = (...bands: Band[]): Band =>
  bands.reduce((a, b) => ({ low: a.low + b.low, expected: a.expected + b.expected, high: a.high + b.high }), ZERO);
const addDays = (...ds: Days[]): Days =>
  ds.reduce((a, b) => ({ low: a.low + b.low, expected: a.expected + b.expected, high: a.high + b.high }), ZERO_DAYS);
const scale = (b: Band, f: number): Band => ({ low: b.low * f, expected: b.expected * f, high: b.high * f });

function stepFor(value: number): number {
  for (const r of ROUNDING) if (value <= r.upTo) return r.step;
  return ROUNDING[ROUNDING.length - 1].step;
}
const roundDown = (v: number) => Math.floor(v / stepFor(v)) * stepFor(v);
const roundUp = (v: number) => Math.ceil(v / stepFor(v)) * stepFor(v);

/** Independent items combine around their shared expected value. */
function aggregate(items: Band[]): Band {
  const expected = items.reduce((s, b) => s + b.expected, 0);
  const e = AGGREGATION_EXPONENT;
  const dev = (pick: (b: Band) => number) =>
    Math.pow(items.reduce((s, b) => s + Math.pow(Math.max(0, pick(b)), e), 0), 1 / e);
  return {
    low: expected - dev((b) => b.expected - b.low),
    expected,
    high: expected + dev((b) => b.high - b.expected),
  };
}

/**
 * Validates untrusted input against the model.
 *
 * Every id is checked against the model's own tables, so an unknown base, an
 * addition the base does not carry, or an unknown variant is rejected rather
 * than silently defaulting to something cheap. Nothing else on the object is
 * read, so injected fields cannot reach the calculation.
 */
export function validateInput(raw: unknown): EstimateInput {
  if (typeof raw !== "object" || raw === null) throw new PricingInputError("Invalid request.");
  const o = raw as Record<string, unknown>;

  const base = o.base;
  if (typeof base !== "string" || !Object.hasOwn(BASES, base)) {
    throw new PricingInputError("Tell us what you need.");
  }
  const spec = BASES[base as BaseId];

  const additions: { id: AdditionId; variant?: string }[] = [];
  if (o.additions !== undefined) {
    if (!Array.isArray(o.additions)) throw new PricingInputError("Invalid options.");
    if (o.additions.length > 12) throw new PricingInputError("Too many options.");
    const seen = new Set<string>();
    for (const entry of o.additions) {
      if (typeof entry !== "object" || entry === null) throw new PricingInputError("Invalid option.");
      const a = entry as Record<string, unknown>;
      const id = a.id;
      if (typeof id !== "string" || !Object.hasOwn(ADDITIONS, id)) {
        throw new PricingInputError(`Unknown option: ${String(id)}`);
      }
      if (!spec.additions.includes(id as AdditionId)) {
        throw new PricingInputError(`${id} does not apply here.`);
      }
      if (seen.has(id)) continue;
      seen.add(id);

      const addSpec = ADDITIONS[id as AdditionId];
      let variant: string | undefined;
      if (a.variant !== undefined) {
        if (typeof a.variant !== "string" || !addSpec.variants?.some((v) => v.id === a.variant)) {
          throw new PricingInputError(`Unsupported option for ${id}.`);
        }
        variant = a.variant;
      }
      additions.push({ id: id as AdditionId, variant });
    }
  }

  const seo =
    typeof o.seo === "string" && Object.hasOwn(SEO_SCOPES, o.seo) ? (o.seo as SeoScopeId) : "none";
  const budget =
    typeof o.budget === "string" && (Object.hasOwn(BUDGET_BANDS, o.budget) || o.budget === "unsure")
      ? (o.budget as EstimateInput["budget"])
      : undefined;

  return {
    base: base as BaseId,
    additions,
    seo,
    budget,
    undefinedScope: o.undefinedScope === true,
    rush: o.rush === true,
  };
}

export function estimate(input: EstimateInput): Estimate {
  const base = Object.hasOwn(BASES, input.base) ? BASES[input.base] : undefined;
  if (!base) throw new PricingInputError("Tell us what you need.");

  const lines: LineItem[] = [];
  const items: Band[] = [];
  const externalHighs: number[] = [];
  const includes = [...base.includes];
  const caveats: string[] = [];
  let days = base.days;
  let discoveryReason: string | null = null;

  lines.push({ key: base.id, kind: "base", band: base.price, days: base.days });
  items.push(base.price);
  if (base.alwaysDiscovery) discoveryReason = "software_requirements";

  /* ── additions: flat, and integration is not construction ──────────────── */
  let proportionalShare = 0;
  const seen = new Set<string>();
  for (const sel of input.additions ?? []) {
    const spec = Object.hasOwn(ADDITIONS, sel.id) ? ADDITIONS[sel.id] : undefined;
    if (!spec) throw new PricingInputError(`Unknown option: ${sel.id}`);
    if (!base.additions.includes(sel.id)) throw new PricingInputError(`${sel.id} does not apply here.`);
    if (seen.has(sel.id)) continue;
    seen.add(sel.id);

    // Proportional process work is applied after the flat items are known.
    if (spec.share !== undefined) {
      proportionalShare += spec.share;
      includes.push(sel.id);
      continue;
    }

    // A variant addition MUST resolve. Averaging "connect the tool they have"
    // with "build them one" is exactly the error this model exists to fix.
    const variant = spec.variants?.find((v) => v.id === sel.variant) ?? null;
    if (spec.variants && !variant) throw new PricingInputError(`${sel.id} needs a level.`);

    const price = variant?.price ?? spec.price;
    const dayCost = variant?.days ?? spec.days;
    if (!price || !dayCost) throw new PricingInputError(`${sel.id} is not priced.`);

    lines.push({
      key: variant ? `${sel.id}.${variant.id}` : sel.id,
      kind: "addition",
      band: price,
      days: dayCost,
      addKind: variant?.kind ?? spec.kind,
    });
    items.push(price);
    days = addDays(days, dayCost);
    includes.push(variant ? `${sel.id}.${variant.id}` : sel.id);
    if (spec.externalSystem) externalHighs.push(price.high);
    if (variant?.alwaysDiscovery && !discoveryReason) discoveryReason = "building_not_integrating";
  }

  /* ── search scope ──────────────────────────────────────────────────────── */
  const seoId = input.seo ?? "none";
  const seo = SEO_SCOPES[seoId] ?? SEO_SCOPES.none;
  if (seo.price.expected > 0) {
    lines.push({ key: `seo.${seo.id}`, kind: "seo", band: seo.price, days: seo.days });
    items.push(seo.price);
    days = addDays(days, seo.days);
    includes.push(...seo.includes);
  }

  /* ── proportional process (stakeholder review only) ────────────────────── */
  const flat = add(...items);
  if (proportionalShare > 0) {
    const band = scale(flat, proportionalShare);
    lines.push({ key: "stakeholders", kind: "complexity", band, note: `${Math.round(proportionalShare * 100)}%` });
    items.push(band);
    days = { low: days.low * (1 + proportionalShare), expected: days.expected * (1 + proportionalShare), high: days.high * (1 + proportionalShare) };
  }

  /* ── rush: real cost, so it moves the whole band ───────────────────────── */
  const rushPct = input.rush ? RISK.rushAll : 0;
  const linear = add(...items);
  if (rushPct > 0) {
    const band = scale(linear, rushPct);
    lines.push({ key: "rush", kind: "risk", band });
    items.push(band);
    caveats.push("rush");
  }

  /* ── aggregate independent items ───────────────────────────────────────── */
  const scaled = items.map((b) => (rushPct > 0 ? scale(b, 1) : b));
  const aggregated = aggregate(scaled);
  const linearTotal = add(...items);
  lines.push({
    key: "range_aggregation",
    kind: "aggregation",
    band: { low: aggregated.low - linearTotal.low, expected: 0, high: aggregated.high - linearTotal.high },
    note: `${items.length}_independent_items`,
  });
  let total = aggregated;

  /* ── risk widens the top, never invents effort ─────────────────────────── */
  if (externalHighs.length > 0) {
    const amount = externalHighs.reduce((a, b) => a + b, 0) * RISK.unknownSystemHighShare;
    lines.push({ key: "unknown_external_system", kind: "risk", band: { low: 0, expected: 0, high: amount } });
    total = { ...total, high: total.high + amount };
    caveats.push("unknown_external_system");
  }
  if (input.undefinedScope) {
    const amount = total.high * RISK.undefinedScopeHighShare;
    lines.push({ key: "undefined_scope", kind: "risk", band: { low: 0, expected: 0, high: amount } });
    total = { ...total, high: total.high + amount };
    caveats.push("undefined_scope");
    if (!discoveryReason) discoveryReason = "scope_undefined";
  }

  /* ── minimum, rounding ─────────────────────────────────────────────────── */
  let minimumApplied = false;
  if (total.low < MINIMUM) {
    total = { ...total, low: MINIMUM };
    minimumApplied = true;
    lines.push({ key: "minimum", kind: "minimum", band: ZERO, note: String(MINIMUM) });
  }
  total = {
    low: total.low,
    expected: Math.max(total.expected, total.low * 1.08),
    high: Math.max(total.high, total.low * 1.08 * 1.12),
  };

  const low = Math.max(MINIMUM, roundDown(total.low));
  const high = Math.max(roundUp(total.high), low + stepFor(low));
  const expected = Math.min(Math.max(Math.round(total.expected), low), high);

  /* ── discovery: uncertainty and architecture risk, plus sheer size ─────── */
  if (!discoveryReason && expected >= DISCOVERY_SIZE_THRESHOLD) discoveryReason = "phase_it";
  const needsDiscovery = discoveryReason !== null;
  /* Launch is a PRODUCT: one published price, hard caps. The moment anything
     is added to it — an option, a search scope — it stops being that product
     and becomes a small project with a range. Calling it "fixed price" while
     showing a range would be the tool contradicting itself. */
  const isProduct =
    base.productized === true && (input.additions?.length ?? 0) === 0 && seoId === "none";
  const tier = needsDiscovery ? "discovery" : isProduct ? "launch" : "project";

  const drivers = lines
    .filter((l) => l.band.expected > 0 && l.kind !== "minimum" && l.kind !== "risk")
    .sort((a, b) => b.band.expected - a.band.expected)
    .slice(0, 4)
    .map((l) => l.key);

  const recurringIds = new Set(BASE_RECURRING[base.id] ?? []);
  if (seoId !== "none") recurringIds.add(seoId === "content_strategy" ? "seo-advanced" : "seo-essentials");
  if (recurringIds.has("seo-advanced")) recurringIds.delete("seo-essentials");
  const recurring = [...recurringIds]
    .map((id) => RECURRING_BY_ID[id])
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({ id: r.id, monthly: r.approved ? r.monthly : null }));

  let budgetSignal: Estimate["budgetSignal"] = null;
  if (input.budget && input.budget !== "unsure" && Object.hasOwn(BUDGET_BANDS, input.budget)) {
    if (low > BUDGET_BANDS[input.budget].high) budgetSignal = "above";
  }

  const roundedDays = {
    low: Math.round(days.low * 10) / 10,
    expected: Math.round(days.expected * 10) / 10,
    high: Math.round(days.high * 10) / 10,
  };

  return {
    pricingVersion: PRICING_VERSION,
    modelChecksum: MODEL_CHECKSUM,
    low,
    high,
    expected,
    days: roundedDays,
    internalRate: roundedDays.expected > 0 ? Math.round(expected / roundedDays.expected) : 0,
    tier,
    needsDiscovery,
    discoveryReason,
    lines,
    drivers,
    includes: [...new Set(includes)],
    excludes: EXCLUSIONS,
    recurring,
    minimumApplied,
    caveats,
    budgetSignal,
  };
}
