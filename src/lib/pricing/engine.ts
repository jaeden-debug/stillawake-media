/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 3 of 5 · THE ENGINE
 *
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Pure, deterministic, dependency-free — the same input always produces the
 * same estimate, which is what makes a stored estimate reproducible from its
 * `pricing_version` years later.
 *
 * ORDER OF OPERATIONS — load-bearing, not incidental:
 *
 *   1. each service line at its depth → days × discipline rate
 *   2. add-ons, at their chosen variant where the word is ambiguous
 *   3. organisational complexity — the honest enterprise multiple
 *   4. rush — real cost, so it scales the whole band
 *   5. independent items combined in quadrature
 *   6. risk — widens HIGH only, never invents effort
 *   7. minimum, rounding, tier, discovery routing
 *
 * Steps 1–4 are reported as deltas that sum to the linear total, and step 5
 * emits the single reconciling line — so the internal breakdown always adds up
 * to the number shown.
 */

import {
  ADDONS,
  AGGREGATION_EXPONENT,
  BUDGET_BANDS,
  DAY_RATES,
  DEPTH_INCLUDES,
  DISCOVERY_ALWAYS_LINES,
  DISCOVERY_DEPTHS,
  DISCOVERY_THRESHOLD,
  LINE_RECURRING,
  MINIMUM,
  MODEL_CHECKSUM,
  ORG_FACTORS,
  PRICING_VERSION,
  RECURRING_BY_ID,
  RISK,
  ROUNDING,
  SERVICE_LINES,
} from "./model";
import type {
  AddonId,
  Band,
  Days,
  Discipline,
  Estimate,
  EstimateInput,
  LineItem,
  LineSelection,
  OrgFactorId,
  ServiceLineId,
  Tier,
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

const addBands = (...bands: Band[]): Band =>
  bands.reduce((a, b) => ({ low: a.low + b.low, expected: a.expected + b.expected, high: a.high + b.high }), ZERO);

const addDays = (...ds: Days[]): Days =>
  ds.reduce((a, b) => ({ low: a.low + b.low, expected: a.expected + b.expected, high: a.high + b.high }), ZERO_DAYS);

const scale = (b: Band, f: number): Band => ({ low: b.low * f, expected: b.expected * f, high: b.high * f });

/** The only place days become money. */
const toMoney = (d: Days, discipline: Discipline): Band => {
  const rate = DAY_RATES[discipline];
  return { low: d.low * rate, expected: d.expected * rate, high: d.high * rate };
};

function stepFor(value: number): number {
  for (const r of ROUNDING) if (value <= r.upTo) return r.step;
  return ROUNDING[ROUNDING.length - 1].step;
}
const roundDown = (v: number) => Math.floor(v / stepFor(v)) * stepFor(v);
const roundUp = (v: number) => Math.ceil(v / stepFor(v)) * stepFor(v);

/**
 * Combines independent items around their shared expected value.
 * With one item this returns that item's own band unchanged.
 */
function aggregate(items: Band[]): Band {
  const expected = items.reduce((s, b) => s + b.expected, 0);
  const p = AGGREGATION_EXPONENT;
  const dev = (pick: (b: Band) => number) =>
    Math.pow(items.reduce((s, b) => s + Math.pow(Math.max(0, pick(b)), p), 0), 1 / p);
  return {
    low: expected - dev((b) => b.expected - b.low),
    expected,
    high: expected + dev((b) => b.high - b.expected),
  };
}

const depthOf = (line: ServiceLineId, depth: string) =>
  SERVICE_LINES[line]?.depths.find((d) => d.id === depth);

/**
 * Validates untrusted input against the model.
 *
 * Every id is checked against the model's own tables rather than a duplicated
 * list, so an unknown line, a depth that line does not offer, or an add-on it
 * does not carry is rejected instead of silently defaulting to something
 * cheap. Nothing else on the object is read, so injected fields cannot reach
 * the calculation.
 */
export function validateInput(raw: unknown): EstimateInput {
  if (typeof raw !== "object" || raw === null) throw new PricingInputError("Invalid request.");
  const o = raw as Record<string, unknown>;

  if (!Array.isArray(o.lines) || o.lines.length === 0) {
    throw new PricingInputError("Tell us what you need.");
  }
  if (o.lines.length > 7) throw new PricingInputError("Too many services.");

  const seen = new Set<string>();
  const lines: LineSelection[] = [];

  for (const entry of o.lines) {
    if (typeof entry !== "object" || entry === null) throw new PricingInputError("Invalid service.");
    const l = entry as Record<string, unknown>;
    const id = l.id;
    if (typeof id !== "string" || !Object.hasOwn(SERVICE_LINES, id)) {
      throw new PricingInputError(`Unknown service: ${String(id)}`);
    }
    if (seen.has(id)) continue;
    seen.add(id);

    const spec = SERVICE_LINES[id as ServiceLineId];
    const depth = typeof l.depth === "string" ? l.depth : spec.depths[0].id;
    if (!spec.depths.some((d) => d.id === depth)) {
      throw new PricingInputError(`Unsupported level for ${id}.`);
    }

    const addons: { id: AddonId; variant?: string }[] = [];
    if (l.addons !== undefined) {
      if (!Array.isArray(l.addons)) throw new PricingInputError("Invalid options.");
      if (l.addons.length > 8) throw new PricingInputError("Too many options.");
      const seenAddon = new Set<string>();
      for (const a of l.addons) {
        if (typeof a !== "object" || a === null) throw new PricingInputError("Invalid option.");
        const ao = a as Record<string, unknown>;
        const aid = ao.id;
        if (typeof aid !== "string" || !Object.hasOwn(ADDONS, aid)) {
          throw new PricingInputError(`Unknown option: ${String(aid)}`);
        }
        // An add-on must actually belong to the line that carries it.
        if (!spec.addons?.includes(aid as AddonId)) {
          throw new PricingInputError(`${aid} does not apply to ${id}.`);
        }
        if (seenAddon.has(aid)) continue;
        seenAddon.add(aid);

        const addonSpec = ADDONS[aid as AddonId];
        let variant: string | undefined;
        if (ao.variant !== undefined) {
          if (typeof ao.variant !== "string" || !addonSpec.variants?.some((v) => v.id === ao.variant)) {
            throw new PricingInputError(`Unsupported option level for ${aid}.`);
          }
          variant = ao.variant;
        }
        addons.push({ id: aid as AddonId, variant });
      }
    }

    lines.push({ id: id as ServiceLineId, depth, addons });
  }

  const org: OrgFactorId[] = [];
  if (o.org !== undefined) {
    if (!Array.isArray(o.org)) throw new PricingInputError("Invalid organisation details.");
    for (const f of o.org) {
      if (typeof f === "string" && Object.hasOwn(ORG_FACTORS, f) && !org.includes(f as OrgFactorId)) {
        org.push(f as OrgFactorId);
      }
    }
  }

  const budget =
    typeof o.budget === "string" && (Object.hasOwn(BUDGET_BANDS, o.budget) || o.budget === "unsure")
      ? (o.budget as EstimateInput["budget"])
      : undefined;

  return { lines, org, budget, undefinedScope: o.undefinedScope === true, rush: o.rush === true };
}

/** Computes a full internal estimate. Callers decide what to expose. */
export function estimate(input: EstimateInput): Estimate {
  if (!input.lines?.length) throw new PricingInputError("Tell us what you need.");

  const items: Band[] = [];
  const reported: LineItem[] = [];
  const externalHighs: number[] = [];
  const includes: string[] = [];
  const recurringIds = new Set<string>();
  let totalDays: Days = ZERO_DAYS;
  let productizedOnly = true;

  const selectedLineIds = new Set(input.lines.map((l) => l.id));
  const seenLines = new Set<string>();
  for (const sel of input.lines) {
    const spec = Object.hasOwn(SERVICE_LINES, sel.id) ? SERVICE_LINES[sel.id] : undefined;
    if (!spec) throw new PricingInputError(`Unknown service: ${sel.id}`);
    if (seenLines.has(sel.id)) continue;
    seenLines.add(sel.id);

    const depth = depthOf(sel.id, sel.depth);
    if (!depth) throw new PricingInputError(`Unsupported level for ${sel.id}.`);

    /* Absorbed work is reported at zero rather than dropped, so the client can
       see it is included rather than wondering whether it was forgotten. It
       also must not flip the tier: a Launch site plus the SEO foundations that
       Launch already includes is still the Launch product. */
    const absorbed = depth.absorbedBy?.some((l) => selectedLineIds.has(l)) ?? false;
    if (absorbed) {
      reported.push({
        key: `${sel.id}.${depth.id}`,
        kind: "line",
        band: ZERO,
        days: ZERO_DAYS,
        note: "included_in_build",
      });
      includes.push(...(DEPTH_INCLUDES[`${sel.id}.${depth.id}`] ?? []));
      for (const r of LINE_RECURRING[sel.id] ?? []) recurringIds.add(r);
      continue;
    }

    if (!depth.productized) productizedOnly = false;

    const discipline = depth.discipline ?? spec.discipline;
    const band = toMoney(depth.days, discipline);

    reported.push({
      key: `${sel.id}.${depth.id}`,
      kind: "line",
      band,
      days: depth.days,
      discipline,
    });
    items.push(band);
    totalDays = addDays(totalDays, depth.days);
    includes.push(...(DEPTH_INCLUDES[`${sel.id}.${depth.id}`] ?? []));
    for (const r of LINE_RECURRING[sel.id] ?? []) recurringIds.add(r);

    for (const addon of sel.addons ?? []) {
      const aSpec = Object.hasOwn(ADDONS, addon.id) ? ADDONS[addon.id] : undefined;
      if (!aSpec) throw new PricingInputError(`Unknown option: ${addon.id}`);
      if (!spec.addons?.includes(addon.id)) {
        throw new PricingInputError(`${addon.id} does not apply to ${sel.id}.`);
      }
      // An add-on with variants MUST resolve to one — averaging a tenfold
      // spread is exactly the dishonesty the variants exist to prevent.
      const variant = aSpec.variants?.find((v) => v.id === addon.variant) ?? null;
      if (aSpec.variants && !variant) {
        throw new PricingInputError(`${addon.id} needs a level.`);
      }
      const aDays = variant?.days ?? aSpec.days;
      const aDiscipline = aSpec.discipline ?? spec.discipline;
      const aBand = toMoney(aDays, aDiscipline);

      reported.push({
        key: variant ? `${addon.id}.${variant.id}` : addon.id,
        kind: "addon",
        band: aBand,
        days: aDays,
        discipline: aDiscipline,
      });
      items.push(aBand);
      totalDays = addDays(totalDays, aDays);
      includes.push(addon.id);
      if (aSpec.externalSystem) externalHighs.push(aBand.high);
      productizedOnly = false;
    }
  }

  const base = addBands(...items);

  /* ── 3. organisational complexity ──────────────────────────────────────── */
  const caveats: string[] = [];
  let orgFactor = 1;
  for (const id of input.org ?? []) {
    const f = Object.hasOwn(ORG_FACTORS, id) ? ORG_FACTORS[id] : undefined;
    if (!f) continue;
    orgFactor *= f.factor;
    if (f.addsUncertainty) caveats.push("unknown_external_system");
  }
  let running = base;
  if (orgFactor !== 1) {
    const delta = scale(running, orgFactor - 1);
    reported.push({
      key: "organisation",
      kind: "org",
      band: delta,
      days: {
        low: totalDays.low * (orgFactor - 1),
        expected: totalDays.expected * (orgFactor - 1),
        high: totalDays.high * (orgFactor - 1),
      },
      note: (input.org ?? []).join(","),
    });
    running = addBands(running, delta);
    productizedOnly = false;
  }

  /* ── 4. rush ───────────────────────────────────────────────────────────── */
  const rushPct = input.rush ? RISK.rushAll : 0;
  if (rushPct > 0) {
    const delta = scale(running, rushPct);
    reported.push({ key: "rush", kind: "risk", band: delta });
    running = addBands(running, delta);
    caveats.push("rush");
    productizedOnly = false;
  }

  /* ── 5. aggregation ────────────────────────────────────────────────────── */
  const globalFactor = orgFactor * (1 + rushPct);
  const aggregated = aggregate(items.map((b) => scale(b, globalFactor)));
  reported.push({
    key: "range_aggregation",
    kind: "aggregation",
    band: { low: aggregated.low - running.low, expected: 0, high: aggregated.high - running.high },
    note: `${items.length}_independent_items`,
  });
  let total = aggregated;

  /* ── 6. risk widens the top ────────────────────────────────────────────── */
  if (externalHighs.length > 0) {
    const add = externalHighs.reduce((a, b) => a + b, 0) * globalFactor * RISK.unknownSystemHighShare;
    reported.push({ key: "unknown_external_system", kind: "risk", band: { low: 0, expected: 0, high: add } });
    total = { ...total, high: total.high + add };
    if (!caveats.includes("unknown_external_system")) caveats.push("unknown_external_system");
  }
  if (input.undefinedScope) {
    const add = total.high * RISK.undefinedScopeHighShare;
    reported.push({ key: "undefined_scope", kind: "risk", band: { low: 0, expected: 0, high: add } });
    total = { ...total, high: total.high + add };
    caveats.push("undefined_scope");
  }

  /* ── 7. minimum, rounding, tier ────────────────────────────────────────── */
  let minimumApplied = false;
  if (total.low < MINIMUM) {
    total = { ...total, low: MINIMUM };
    minimumApplied = true;
    reported.push({ key: "minimum", kind: "minimum", band: ZERO, note: String(MINIMUM) });
  }
  total = {
    low: total.low,
    expected: Math.max(total.expected, total.low * 1.1),
    high: Math.max(total.high, total.low * 1.1 * 1.15),
  };

  const low = Math.max(MINIMUM, roundDown(total.low));
  const high = Math.max(roundUp(total.high), low + stepFor(low));
  const expected = Math.min(Math.max(Math.round(total.expected), low), high);

  const needsDiscovery =
    // Sheer size: past here the useful advice is "phase it", not a number.
    expected >= DISCOVERY_THRESHOLD ||
    input.lines.some((l) => DISCOVERY_ALWAYS_LINES.includes(l.id)) ||
    input.lines.some((l) => DISCOVERY_DEPTHS.includes(`${l.id}.${l.depth}`)) ||
    // They told us the scope is still open. Quoting it would be theatre.
    input.undefinedScope === true;
  const tier: Tier = needsDiscovery ? "systems" : productizedOnly ? "launch" : "custom";

  const drivers = reported
    .filter((l) => l.band.expected > 0 && l.kind !== "minimum" && l.kind !== "risk")
    .sort((a, b) => b.band.expected - a.band.expected)
    .slice(0, 4)
    .map((l) => l.key);

  // Advanced contains Essentials, so never offer both.
  if (recurringIds.has("seo-advanced")) recurringIds.delete("seo-essentials");
  const recurring = [...recurringIds]
    .map((id) => RECURRING_BY_ID[id])
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({ id: r.id, monthly: r.approved ? r.monthly : null }));

  /* Budget routes, it never prices. This only reports whether the answers and
     the stated budget meet, so the UI can offer a smaller scope rather than
     quietly quoting a different number. */
  let budgetSignal: Estimate["budgetSignal"] = null;
  if (input.budget && input.budget !== "unsure" && Object.hasOwn(BUDGET_BANDS, input.budget)) {
    const band = BUDGET_BANDS[input.budget];
    budgetSignal = low > band.high ? "above" : high < band.low ? "below" : "fits";
  }

  return {
    pricingVersion: PRICING_VERSION,
    modelChecksum: MODEL_CHECKSUM,
    low,
    high,
    expected,
    days: {
      low: Math.round(totalDays.low * globalFactor * 10) / 10,
      expected: Math.round(totalDays.expected * globalFactor * 10) / 10,
      high: Math.round(totalDays.high * globalFactor * 10) / 10,
    },
    tier,
    needsDiscovery,
    lines: reported,
    drivers,
    includes: [...new Set(includes)],
    recurring,
    minimumApplied,
    caveats,
    budgetSignal,
  };
}
