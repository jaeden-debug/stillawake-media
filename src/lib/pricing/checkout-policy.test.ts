import { describe, expect, it } from "vitest";

import { EMERGENCY, ONE_TIME, RECURRING } from "./model";
import {
  DISCOVERY_LOOKUP_KEY,
  EMERGENCY_LOOKUP_KEYS,
  INSTALMENT_LOOKUP_KEY,
  PUBLIC_CHECKOUT_ITEMS,
  RECURRING_LOOKUP_KEYS,
  checkoutMode,
  publicLookupKey,
} from "./stripe-catalogue";

/**
 * What a stranger can buy without a human looking at it.
 *
 * These are the assertions that stop a refactor turning a controlled catalogue
 * into an open till. They test the POLICY, not Stripe — no network, no key.
 */
describe("public checkout allowlist", () => {
  /**
   * THE ONE THAT MATTERS MOST. `project-instalment` is a custom-amount price:
   * whoever names the amount sets the price. Publicly purchasable, it would
   * let someone pay $4 for a $12,000 build.
   */
  it("never exposes the custom-amount instalment", () => {
    expect(PUBLIC_CHECKOUT_ITEMS).not.toContain("project-instalment");
    expect(publicLookupKey("project-instalment")).toBeNull();
    /* Not reachable under any spelling that resolves to that key either. */
    for (const item of PUBLIC_CHECKOUT_ITEMS) {
      expect(publicLookupKey(item)).not.toBe(INSTALMENT_LOOKUP_KEY);
    }
  });

  /**
   * Both maintenance pages publish "a three-question workload check sets your
   * tier". A buy button would make that copy false and would let someone in a
   * panic buy a tier for an incident nobody has assessed.
   */
  it("never exposes an emergency tier", () => {
    const emergencyKeys = new Set(Object.values(EMERGENCY_LOOKUP_KEYS));
    for (const track of Object.values(EMERGENCY)) {
      for (const tier of track.tiers) {
        const id = `${track.id}.${tier.id}`;
        expect(PUBLIC_CHECKOUT_ITEMS).not.toContain(id);
        expect(publicLookupKey(id)).toBeNull();
      }
    }
    for (const item of PUBLIC_CHECKOUT_ITEMS) {
      expect(emergencyKeys.has(publicLookupKey(item) ?? ""), item).toBe(false);
    }
  });

  it("resolves every allowlisted item to a real lookup key", () => {
    const known = new Set([
      ...Object.values(RECURRING_LOOKUP_KEYS),
      DISCOVERY_LOOKUP_KEY,
      "sa_site_audit_cad",
      "sa_llms_txt_setup_cad",
      "sa_gbp_setup_cad",
      "sa_speed_fix_cad",
    ]);
    for (const item of PUBLIC_CHECKOUT_ITEMS) {
      const key = publicLookupKey(item);
      expect(key, `${item} resolves to nothing`).toBeTruthy();
      expect(known, `${item} → ${key}`).toContain(key);
    }
  });

  /** Every approved recurring plan and one-time service should be buyable. */
  it("covers the whole approved self-serve catalogue", () => {
    for (const plan of RECURRING.filter((r) => r.approved)) {
      expect(PUBLIC_CHECKOUT_ITEMS, `${plan.id} is approved but not buyable`).toContain(plan.id);
    }
    for (const service of Object.values(ONE_TIME).filter((s) => s.approved)) {
      expect(PUBLIC_CHECKOUT_ITEMS, `${service.id} is approved but not buyable`).toContain(service.id);
    }
  });

  /** A draft price must never be purchasable — that is what "unapproved" means. */
  it("never exposes an unapproved catalogue row", () => {
    for (const row of RECURRING.filter((r) => !r.approved)) {
      expect(PUBLIC_CHECKOUT_ITEMS, row.id).not.toContain(row.id);
    }
    for (const service of Object.values(ONE_TIME).filter((s) => !s.approved)) {
      expect(PUBLIC_CHECKOUT_ITEMS, service.id).not.toContain(service.id);
    }
  });

  /** Subscribing to a one-off (or charging a plan once) is a real billing bug. */
  it("bills recurring plans as subscriptions and everything else once", () => {
    for (const plan of RECURRING.filter((r) => r.approved)) {
      expect(checkoutMode(plan.id), plan.id).toBe("subscription");
    }
    for (const service of Object.values(ONE_TIME).filter((s) => s.approved)) {
      expect(checkoutMode(service.id), service.id).toBe("payment");
    }
    expect(checkoutMode("project-discovery")).toBe("payment");
  });

  /**
   * The route passes `payload.item` straight in from JSON, so the resolver has
   * to survive whatever arrives — including the shapes people reach for when
   * they are probing an endpoint.
   */
  it("refuses non-string and prototype-shaped input", () => {
    for (const junk of [
      undefined, null, 42, true, {}, [], ["seo-starter"],
      "__proto__", "constructor", "toString", "hasOwnProperty",
      "SEO-STARTER", " seo-starter", "seo-starter ", "",
    ]) {
      expect(publicLookupKey(junk), String(junk)).toBeNull();
    }
  });

  it("has no duplicate entries", () => {
    expect(new Set(PUBLIC_CHECKOUT_ITEMS).size).toBe(PUBLIC_CHECKOUT_ITEMS.length);
  });
});
