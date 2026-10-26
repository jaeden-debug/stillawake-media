import { describe, expect, it } from "vitest";

import { EMERGENCY, ONE_TIME, RECURRING } from "./model";
import { MIN_PAYMENT } from "./payments";
import {
  DISCOVERY_LOOKUP_KEY,
  EMERGENCY_LOOKUP_KEYS,
  INSTALMENT_LOOKUP_KEY,
  LOOKUP_PREFIX,
  ONE_TIME_LOOKUP_KEYS,
  RECURRING_LOOKUP_KEYS,
  allLookupKeys,
  sellableIds,
} from "./stripe-catalogue";

/**
 * The kernel and the Stripe account are separate systems and nothing at
 * runtime keeps them equal. What CAN be enforced here is that every price
 * StillAwake has agreed to charge has somewhere to be charged — the failure
 * this catches is approving a catalogue row, publishing it, and only finding
 * out it has no Stripe product when a customer tries to pay.
 *
 * These are structural checks, not live ones. Confirming an amount actually
 * matches Stripe requires the API, which the test suite deliberately cannot
 * reach; the lookup key is what makes that reconciliation possible at all.
 */
describe("the Stripe catalogue covers everything sellable", () => {
  const ids = sellableIds();

  it("has a key for every approved monthly plan", () => {
    expect(Object.keys(RECURRING_LOOKUP_KEYS).sort()).toEqual([...ids.recurring].sort());
  });

  it("has a key for every approved one-time service", () => {
    expect(Object.keys(ONE_TIME_LOOKUP_KEYS).sort()).toEqual([...ids.oneTime].sort());
  });

  it("has a key for every emergency tier", () => {
    expect(Object.keys(EMERGENCY_LOOKUP_KEYS).sort()).toEqual([...ids.emergency].sort());
  });

  /**
   * A draft row must NOT be sellable. Publishing a price and being able to
   * take money for it are the same decision, so an unapproved row with a
   * Stripe key would be a live checkout for a price we never agreed to.
   */
  it("has no key for an unapproved catalogue row", () => {
    for (const row of RECURRING.filter((r) => !r.approved)) {
      expect(RECURRING_LOOKUP_KEYS[row.id], `${row.id} is a draft but is sellable`).toBeUndefined();
    }
    for (const service of Object.values(ONE_TIME).filter((s) => !s.approved)) {
      expect(ONE_TIME_LOOKUP_KEYS[service.id], `${service.id} is a draft`).toBeUndefined();
    }
  });

  it("namespaces and does not reuse any key", () => {
    const keys = allLookupKeys();
    expect(new Set(keys).size, "a duplicated key would point two products at one price").toBe(
      keys.length,
    );
    for (const key of keys) {
      expect(key, key).toMatch(new RegExp(`^${LOOKUP_PREFIX}[a-z0-9_]+_cad$`));
    }
  });

  it("keeps discovery and instalments distinct from the service catalogue", () => {
    expect(DISCOVERY_LOOKUP_KEY).not.toBe(INSTALMENT_LOOKUP_KEY);
    expect(Object.values(RECURRING_LOOKUP_KEYS)).not.toContain(INSTALMENT_LOOKUP_KEY);
  });

  /**
   * The instalment price is the only custom-amount product, and its floor has
   * to agree with the schedule builder. If MIN_PAYMENT ever rises above the
   * Stripe minimum, a schedule this repo considers valid would be rejected at
   * checkout — so the number is asserted here as a reminder to move both.
   */
  it("documents an instalment floor that matches the payment rules", () => {
    expect(MIN_PAYMENT).toBe(400);
  });

  it("covers every emergency tier the model defines, in both directions", () => {
    const modelKeys = Object.values(EMERGENCY).flatMap((track) =>
      track.tiers.map((tier) => `${track.id}.${tier.id}`),
    );
    for (const key of modelKeys) expect(EMERGENCY_LOOKUP_KEYS[key], key).toBeTruthy();
    for (const key of Object.keys(EMERGENCY_LOOKUP_KEYS)) {
      expect(modelKeys, `${key} is sellable but not in EMERGENCY`).toContain(key);
    }
  });
});
