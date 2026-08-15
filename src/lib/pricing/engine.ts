/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SHARED PRICING KERNEL — 3 of 5 · THE ENGINE
 *
 * CANONICAL SOURCE: stillawake-media (.com). Synced to .dev.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Pure, deterministic, dependency-free. The same input always produces the same
 * estimate, which is what makes a stored estimate reproducible from its
 * `pricing_version` years later.
 *
 * ORDER OF OPERATIONS — the order is load-bearing, not incidental:
 *
 *   1. foundation band
 *   2. capability bands (zero where the foundation already includes them)
 *   3. page-count multiplier — content scope only
 *   4. bilingual — fixed implementation + a share of each scope
 *   5. interaction premium — systems that must talk to each other
 *   6. rush — a real cost, so it scales the whole band
 *   7. range aggregation — independent items combined in quadrature
 *   8. risk — widens HIGH only, never invents effort
 *   9. floors, then rounding (low down, high up), floors re-applied
 *
 * Steps 1–6 are reported as deltas that sum exactly to the linear total, and
 * step 7 emits the single reconciling line. So the internal breakdown always
 * adds up to the number shown, which is the whole point of being able to
 * answer "why did this estimate at $X–$Y".
 */

import {
  AGGREGATION_EXPONENT,
  BILINGUAL,
  CAPABILITY_BY_ID,
  COMPLEXITY_FACTORS,
  FOUNDATIONS,
  INTERACTION,
  MODEL_CHECKSUM,
  PRICING_VERSION,
  RECURRING_BY_ID,
  RISK,
  ROUNDING,
  SCOPE_FACTORS,
  SCOPE_SENSITIVITY,
} from "./model";
import type {
  Band,
  CapabilitySpec,
  Complexity,
  Estimate,
  EstimateInput,
  FoundationId,
  LineItem,
  ScopeSize,
} from "./types";

/** Thrown for any input the model does not recognise. Never leaks internals. */
export class PricingInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PricingInputError";
  }
}

/**
 * Foundations whose cost genuinely scales with how much content there is.
 *
 * Page count is meaningless for a dashboard or an automation pipeline, so
 * those foundations sit outside the scope multiplier entirely. This is the
 * guard against Phase 21's "page count dominates software complexity".
 */
const CONTENT_BEARING: ReadonlySet<FoundationId> = new Set<FoundationId>([
  "marketing_site",
  "website_redesign",
  "ecommerce",
  "seo_engagement",
  "content_system",
]);

/** Capability groups that scale with content volume rather than app surface. */
const CONTENT_GROUPS = new Set(["content", "seo"]);

const ZERO: Band = { low: 0, expected: 0, high: 0 };

const addBands = (...bands: Band[]): Band =>
  bands.reduce(
    (a, b) => ({ low: a.low + b.low, expected: a.expected + b.expected, high: a.high + b.high }),
    ZERO,
  );

const scaleBand = (b: Band, f: number): Band => ({
  low: b.low * f,
  expected: b.expected * f,
  high: b.high * f,
});

/**
 * Resolves the tier to price at.
 *
 * `validateInput` fills this in for untrusted callers, but the internal
 * estimator builds inputs in code and a missing or unsupported tier must not
 * silently become "whatever indexes to undefined". Absent means the
 * capability's own default; present but unsupported is an error.
 */
function resolveComplexity(spec: CapabilitySpec, complexity: Complexity | undefined): Complexity {
  if (complexity === undefined) return spec.allowed[0];
  if (!spec.allowed.includes(complexity)) {
    throw new PricingInputError(`Unsupported level for ${spec.id}.`);
  }
  return complexity;
}

/** Resolves a capability to its band at the chosen tier. */
function capabilityBand(spec: CapabilitySpec, complexity: Complexity): Band {
  const qualitative = spec.bands?.[complexity];
  if (qualitative) return qualitative;
  const [l, e, h] = COMPLEXITY_FACTORS[complexity];
  return { low: spec.base.low * l, expected: spec.base.expected * e, high: spec.base.high * h };
}

function stepFor(value: number): number {
  for (const r of ROUNDING) if (value <= r.upTo) return r.step;
  return ROUNDING[ROUNDING.length - 1].step;
}

const roundDown = (v: number) => Math.floor(v / stepFor(v)) * stepFor(v);
const roundUp = (v: number) => Math.ceil(v / stepFor(v)) * stepFor(v);

/**
 * Combines independent scope items around their shared expected value.
 *
 * With one item this returns that item's own band unchanged, so a simple
 * project is never "narrowed" by a statistical argument that does not apply
 * to it.
 */
function aggregate(items: Band[]): Band {
  const expected = items.reduce((sum, b) => sum + b.expected, 0);
  const p = AGGREGATION_EXPONENT;
  const lowDev = Math.pow(
    items.reduce((sum, b) => sum + Math.pow(Math.max(0, b.expected - b.low), p), 0),
    1 / p,
  );
  const highDev = Math.pow(
    items.reduce((sum, b) => sum + Math.pow(Math.max(0, b.high - b.expected), p), 0),
    1 / p,
  );
  return { low: expected - lowDev, expected, high: expected + highDev };
}

/**
 * Validates an untrusted input against the model.
 *
 * The public API calls this before anything else. Every enum is checked
 * against the model's own tables rather than a duplicated list, so a
 * capability that does not exist — or exists but does not offer the requested
 * tier — is rejected instead of silently defaulting to something cheap.
 * Unknown keys cannot influence the result because nothing else is read.
 */
export function validateInput(raw: unknown): EstimateInput {
  if (typeof raw !== "object" || raw === null) throw new PricingInputError("Invalid request.");
  const o = raw as Record<string, unknown>;

  const foundation = o.foundation;
  if (typeof foundation !== "string" || !Object.hasOwn(FOUNDATIONS, foundation)) {
    throw new PricingInputError("Unknown project type.");
  }

  const scope = o.scope;
  if (typeof scope !== "string" || !Object.hasOwn(SCOPE_FACTORS, scope)) {
    throw new PricingInputError("Unknown project size.");
  }

  const rawCaps = o.capabilities;
  if (rawCaps !== undefined && !Array.isArray(rawCaps)) {
    throw new PricingInputError("Invalid capabilities.");
  }
  const list = (rawCaps ?? []) as unknown[];
  // Bounded so a crafted request cannot turn the endpoint into a compute sink.
  if (list.length > 40) throw new PricingInputError("Too many capabilities.");

  const seen = new Set<string>();
  const capabilities: EstimateInput["capabilities"] = [];
  for (const entry of list) {
    if (typeof entry !== "object" || entry === null) throw new PricingInputError("Invalid capability.");
    const c = entry as Record<string, unknown>;
    const id = c.id;
    if (typeof id !== "string") throw new PricingInputError("Invalid capability.");
    const spec = Object.hasOwn(CAPABILITY_BY_ID, id) ? CAPABILITY_BY_ID[id] : undefined;
    if (!spec) throw new PricingInputError(`Unknown capability: ${id}`);
    if (seen.has(id)) continue; // duplicates are a client bug, not an error
    seen.add(id);

    const complexity = c.complexity ?? spec.allowed[0];
    if (typeof complexity !== "string" || !spec.allowed.includes(complexity as Complexity)) {
      throw new PricingInputError(`Unsupported level for ${id}.`);
    }
    capabilities.push({ id, complexity: complexity as Complexity });
  }

  return {
    foundation: foundation as FoundationId,
    scope: scope as ScopeSize,
    bilingual: o.bilingual === true,
    capabilities,
    undefinedScope: o.undefinedScope === true,
    rush: o.rush === true,
  };
}

/**
 * One priced element with its own multipliers attached.
 *
 * `scopeSens` is how much page count moves it (0–1) and `bilingualShare` is
 * how much a second language does. Carrying them per item rather than
 * bucketing everything into "content" and "app" is what stops a 15-page site
 * inflating its SEO lines and a programmatic pipeline being charged per
 * generated page.
 */
type Item = { band: Band; scopeSens: number; bilingualShare: number };

/** Computes a full internal estimate. Callers decide what to expose. */
export function estimate(input: EstimateInput): Estimate {
  const foundation = Object.hasOwn(FOUNDATIONS, input.foundation)
    ? FOUNDATIONS[input.foundation]
    : undefined;
  if (!foundation) throw new PricingInputError("Unknown project type.");

  const lines: LineItem[] = [];
  const items: Item[] = [];
  const foundationIsContent = CONTENT_BEARING.has(foundation.id);

  lines.push({ key: foundation.id, kind: "foundation", band: foundation.band });
  items.push({
    band: foundation.band,
    scopeSens: foundationIsContent ? 1 : 0,
    bilingualShare: foundationIsContent ? BILINGUAL.contentShare : BILINGUAL.appShare,
  });

  const externalHighs: number[] = [];
  let hardCount = 0;

  const seen = new Set<string>();
  for (const sel of input.capabilities) {
    const spec = Object.hasOwn(CAPABILITY_BY_ID, sel.id) ? CAPABILITY_BY_ID[sel.id] : undefined;
    if (!spec) throw new PricingInputError(`Unknown capability: ${sel.id}`);
    // Charging the same capability twice is always a caller bug, and doing it
    // silently is the worst possible outcome.
    if (seen.has(sel.id)) continue;
    seen.add(sel.id);

    const complexity = resolveComplexity(spec, sel.complexity);

    // A foundation that already ships this cannot also charge for it.
    if (spec.includedIn?.includes(foundation.id)) {
      lines.push({
        key: sel.id,
        kind: "capability",
        band: ZERO,
        complexity,
        group: spec.group,
        note: "included_in_foundation",
      });
      continue;
    }

    const b = capabilityBand(spec, complexity);
    lines.push({ key: sel.id, kind: "capability", band: b, complexity, group: spec.group });
    items.push({
      band: b,
      scopeSens: spec.scopeSensitivity ?? SCOPE_SENSITIVITY[spec.group],
      bilingualShare: CONTENT_GROUPS.has(spec.group) ? BILINGUAL.contentShare : BILINGUAL.appShare,
    });

    if (spec.externalSystem) externalHighs.push(b.high);
    if (complexity === "advanced" || complexity === "complex") hardCount += 1;
    if (spec.group === "integration") hardCount += 1;
  }

  /* ── 3. page-count scope, weighted per item ────────────────────────────── */
  const scopeFactor = SCOPE_FACTORS[input.scope];
  /** Page-count multiplier for one item. */
  const scopeOf = (i: Item) => 1 + (scopeFactor - 1) * i.scopeSens;

  if (scopeFactor !== 1) {
    const uplift = addBands(...items.map((i) => scaleBand(i.band, scopeOf(i) - 1)));
    if (uplift.expected > 0) lines.push({ key: input.scope, kind: "scope", band: uplift });
  }

  /* ── 4. bilingual ──────────────────────────────────────────────────────── */
  if (input.bilingual) {
    // Fixed plumbing (routing, hreflang, switcher, dual sitemaps) plus a share
    // of each item AFTER page count, since more pages means more to adapt.
    const uplift = addBands(
      BILINGUAL.implementation,
      ...items.map((i) => scaleBand(i.band, scopeOf(i) * i.bilingualShare)),
    );
    lines.push({ key: "bilingual", kind: "bilingual", band: uplift });
    // The fixed part is its own independent item; the proportional part rides
    // along on the items it came from, via `bilingualShare` below.
    items.push({ band: BILINGUAL.implementation, scopeSens: 0, bilingualShare: 0 });
  }

  /** Everything except interaction, rush and risk — those come next. */
  const itemFactor = (i: Item) => scopeOf(i) * (input.bilingual ? 1 + i.bilingualShare : 1);

  const linearBase = addBands(
    ...lines.filter((l) => l.kind !== "risk" && l.kind !== "minimum").map((l) => l.band),
  );

  /* ── 5. interaction ────────────────────────────────────────────────────── */
  const units = Math.max(0, hardCount - 1);
  const interactionPct = Math.min(INTERACTION.cap, INTERACTION.perUnit * units);
  let running = linearBase;
  if (interactionPct > 0) {
    const b = scaleBand(running, interactionPct);
    lines.push({ key: "interaction", kind: "interaction", band: b, note: `${units + 1}_interacting_systems` });
    running = addBands(running, b);
  }

  /* ── 6. rush ───────────────────────────────────────────────────────────── */
  const caveats: string[] = [];
  const rushPct = input.rush ? RISK.rushAll : 0;
  if (rushPct > 0) {
    const b = scaleBand(running, rushPct);
    lines.push({ key: "rush", kind: "risk", band: b });
    running = addBands(running, b);
    caveats.push("rush");
  }

  /* ── 7. range aggregation ──────────────────────────────────────────────── */
  const globalFactor = (1 + interactionPct) * (1 + rushPct);
  const scaled = items.map((i) => scaleBand(i.band, itemFactor(i) * globalFactor));
  const aggregated = aggregate(scaled);

  lines.push({
    key: "range_aggregation",
    kind: "interaction",
    band: {
      low: aggregated.low - running.low,
      expected: 0,
      high: aggregated.high - running.high,
    },
    note: `${items.length}_independent_items`,
  });
  let total = aggregated;

  /* ── 8. risk — widens HIGH, never invents effort ───────────────────────── */
  if (externalHighs.length > 0) {
    const bilingualFactor = input.bilingual ? 1 + BILINGUAL.appShare : 1;
    const add =
      externalHighs.reduce((a, b) => a + b, 0) *
      bilingualFactor *
      globalFactor *
      RISK.unknownSystemHighShare;
    lines.push({ key: "unknown_external_system", kind: "risk", band: { low: 0, expected: 0, high: add } });
    total = { ...total, high: total.high + add };
    caveats.push("unknown_external_system");
  }

  if (input.undefinedScope) {
    const add = total.high * RISK.undefinedScopeHighShare;
    lines.push({ key: "undefined_scope", kind: "risk", band: { low: 0, expected: 0, high: add } });
    total = { ...total, high: total.high + add };
    caveats.push("undefined_scope");
  }

  /* ── 9. floors ─────────────────────────────────────────────────────────── */
  const floor = foundation.floor;
  let minimumApplied = false;
  if (total.low < floor) {
    total = { ...total, low: floor };
    minimumApplied = true;
    lines.push({ key: "minimum", kind: "minimum", band: ZERO, note: String(floor) });
  }
  // A floor can push LOW past a small EXPECTED; keep the triple ordered and
  // keep the band wide enough to still read as a range.
  total = {
    low: total.low,
    expected: Math.max(total.expected, total.low * 1.15),
    high: Math.max(total.high, total.low * 1.15 * 1.2),
  };

  const low = Math.max(floor, roundDown(total.low));
  const high = Math.max(roundUp(total.high), low + stepFor(low));
  const expected = Math.min(Math.max(Math.round(total.expected), low), high);

  /* ── presentation ──────────────────────────────────────────────────────── */
  const drivers = lines
    .filter((l) => l.band.expected > 0 && l.kind !== "minimum" && l.kind !== "risk")
    .sort((a, b) => b.band.expected - a.band.expected)
    .slice(0, 4)
    .map((l) => l.key);

  const includes = [
    // `marketing_site` advertises "up to 6 pages" because that is what its
    // band buys. Once a larger scope has been paid for, saying so anyway
    // understates what the client is getting, so the chosen size replaces it.
    ...foundation.includes.map((key) =>
      key === "up_to_six_pages" && input.scope !== "small" ? input.scope : key,
    ),
    ...input.capabilities
      .filter((c) => !CAPABILITY_BY_ID[c.id]?.includedIn?.includes(foundation.id))
      .map((c) => c.id),
  ];

  const recurringIds = new Set<string>(foundation.suggestedRecurring);
  const groups = new Set(input.capabilities.map((c) => CAPABILITY_BY_ID[c.id]?.group));
  if (groups.has("seo")) recurringIds.add("seo-essentials");
  if (input.capabilities.some((c) => c.id === "content_strategy" || c.id === "programmatic_content")) {
    recurringIds.add("seo-advanced");
  }
  // Never offer both SEO tiers at once — Advanced contains Essentials.
  if (recurringIds.has("seo-advanced")) recurringIds.delete("seo-essentials");

  const recurring = [...recurringIds]
    .map((id) => RECURRING_BY_ID[id])
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .map((r) => ({ id: r.id, monthly: r.approved ? r.monthly : null }));

  return {
    pricingVersion: PRICING_VERSION,
    modelChecksum: MODEL_CHECKSUM,
    low,
    high,
    expected,
    lines,
    drivers,
    includes,
    recurring,
    minimumApplied,
    caveats,
  };
}
