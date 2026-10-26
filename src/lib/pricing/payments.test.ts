import { describe, expect, it } from "vitest";

import {
  ABSOLUTE_MAX_PAYMENTS,
  assertNoCreditCharge,
  availablePayments,
  buildSchedule,
  contractStatus,
  isLanguageElectionValid,
  MIN_PAYMENT,
  PUBLIC_MAX_PAYMENTS,
  PUBLIC_PAYMENT_COUNTS,
  requiresFrenchFirst,
  splitRange,
  type CounselApproval,
} from "./payments";

const range = { low: 2500, expected: 3600, high: 4750 };

describe("range arithmetic (P12)", () => {
  it("divides the low from the low and the high from the high", () => {
    expect(splitRange(range, 2)).toMatchObject({ low: 1250, high: 2375 });
    expect(splitRange(range, 4)).toMatchObject({ low: 625, high: 1188 });
  });

  it("never derives a payment from the midpoint", () => {
    /* The midpoint of 2500-4750 is 3625. A 3-way split of the midpoint is
       1208 — if either end of the reported band equalled that, the range would
       have collapsed into a single figure dressed up as a range. */
    const per = splitRange(range, 3);
    const midpointSplit = Math.round((range.low + range.high) / 2 / 3);
    expect(per.low).not.toBe(midpointSplit);
    expect(per.high).not.toBe(midpointSplit);
    expect(per.low).toBeLessThan(per.high);
  });

  it("preserves the spread of the original range", () => {
    for (const count of [2, 3, 4, 6, 12]) {
      const per = splitRange(range, count);
      expect(per.high / per.low).toBeCloseTo(range.high / range.low, 1);
    }
  });

  it("rejects a nonsensical payment count", () => {
    expect(() => splitRange(range, 0)).toThrow();
    expect(() => splitRange(range, 2.5)).toThrow();
  });
});

describe("no credit charge (QC CPA s.70(g))", () => {
  it("accepts a schedule totalling the single-payment price", () => {
    expect(() => assertNoCreditCharge(5000, 5000)).not.toThrow();
  });

  it("rejects any surcharge for paying over time", () => {
    expect(() => assertNoCreditCharge(5000, 5250)).toThrow(/credit charge/i);
  });

  it("rejects a cash discount, which s.70(g) also makes a credit charge", () => {
    expect(() => assertNoCreditCharge(5000, 4750)).toThrow(/credit charge/i);
  });

  it("every contractual schedule sums exactly to the agreed price", () => {
    for (const count of [2, 3, 4, 6, 12]) {
      for (const price of [1800, 2750, 5750, 12345.67]) {
        const { payments, total } = buildSchedule(price, count);
        expect(payments).toHaveLength(count);
        expect(total).toBeCloseTo(price, 2);
      }
    }
  });
});

describe("only approved schedules are public", () => {
  it("advertises 2, 3 and 4 payments and nothing longer", () => {
    expect(PUBLIC_PAYMENT_COUNTS).toEqual([2, 3, 4]);
    expect(Math.max(...PUBLIC_PAYMENT_COUNTS)).toBe(PUBLIC_MAX_PAYMENTS);
  });

  it("stays at or under the US Reg Z four-instalment line", () => {
    /* §1026.2(a)(17)(i): more than four instalments is consumer credit even
       with no finance charge. Public schedules must never cross it. */
    expect(PUBLIC_MAX_PAYMENTS).toBeLessThanOrEqual(4);
  });

  it("never exceeds the UK art.60F(2) ceiling anywhere", () => {
    expect(ABSOLUTE_MAX_PAYMENTS).toBeLessThanOrEqual(12);
  });
});

describe("client classification is not silently ignored", () => {
  const opts = { jurisdiction: "qc" as const, deliveryMonths: 3 };

  it("blocks a consumer from schedules past the public cap", () => {
    const { offered, blocked } = availablePayments(range, {
      ...opts,
      clientClass: "consumer",
      counts: [3, 6, 12],
      includeNonPublic: true,
    });
    expect(offered.map((o) => o.count)).toEqual([3]);
    expect(blocked.map((b) => b.reason)).toContain("exceeds_public_cap");
  });

  it("treats an unknown visitor exactly as strictly as a consumer", () => {
    const asConsumer = availablePayments(range, { ...opts, clientClass: "consumer", includeNonPublic: true });
    const asUnknown = availablePayments(range, { ...opts, clientClass: "unknown", includeNonPublic: true });
    expect(asUnknown.offered.map((o) => o.count)).toEqual(asConsumer.offered.map((o) => o.count));
  });

  it("lets a business go past the public cap in a researched jurisdiction", () => {
    const { offered } = availablePayments(range, {
      ...opts,
      clientClass: "business",
      counts: [3, 6],
      includeNonPublic: true,
    });
    expect(offered.map((o) => o.count)).toContain(6);
  });

  it("treats a sole proprietor as business — QC CPA s.1(e) excludes them", () => {
    const { offered } = availablePayments(range, {
      ...opts,
      clientClass: "sole_proprietor",
      counts: [6],
      includeNonPublic: true,
    });
    expect(offered.map((o) => o.count)).toContain(6);
  });

  it("blocks a consumer schedule that would outlive delivery", () => {
    const { blocked } = availablePayments(range, {
      jurisdiction: "eu",
      deliveryMonths: 1,
      clientClass: "consumer",
      counts: [4],
      includeNonPublic: true,
    });
    expect(blocked.map((b) => b.reason)).toContain("consumer_beyond_delivery");
  });
});

describe("unsupported jurisdictions get no invented terms", () => {
  it("refuses extended schedules where we have not done the research", () => {
    const { offered, blocked } = availablePayments(range, {
      clientClass: "business",
      jurisdiction: "other",
      deliveryMonths: 6,
      counts: [3, 6],
      includeNonPublic: true,
    });
    expect(offered.map((o) => o.count)).toEqual([3]);
    expect(blocked.map((b) => b.reason)).toContain("unsupported_jurisdiction");
  });

  it("falls back conservatively for an unknown jurisdiction", () => {
    const { offered } = availablePayments(range, {
      clientClass: "business",
      jurisdiction: "unknown",
      deliveryMonths: 6,
      counts: [3, 6, 12],
      includeNonPublic: true,
    });
    expect(offered.every((o) => o.count <= PUBLIC_MAX_PAYMENTS)).toBe(true);
  });

  it("keeps 12 payments behind the counsel gate even for a supported business", () => {
    const { offered, blocked } = availablePayments(
      { low: 40000, expected: 55000, high: 80000 },
      {
        clientClass: "business",
        jurisdiction: "uk",
        deliveryMonths: 12,
        counts: [12],
        includeNonPublic: true,
      },
    );
    expect(offered).toHaveLength(0);
    expect(blocked.map((b) => b.reason)).toContain("counsel_gate");
  });
});

describe("public surface leaks nothing internal", () => {
  it("omits blocked schedules and their reasons when not internal", () => {
    const { offered } = availablePayments(range, {
      clientClass: "unknown",
      jurisdiction: "unknown",
      deliveryMonths: 3,
    });
    for (const o of offered) {
      expect(o.public).toBe(true);
      expect(o.count).toBeLessThanOrEqual(PUBLIC_MAX_PAYMENTS);
    }
  });

  it("drops schedules whose payments fall under the floor", () => {
    const { blocked } = availablePayments(
      { low: 1800, expected: 2000, high: 3000 },
      { clientClass: "business", jurisdiction: "qc", deliveryMonths: 6, counts: [12], includeNonPublic: true },
    );
    expect(blocked.map((b) => b.reason)).toContain("payment_below_minimum");
    expect(1800 / 12).toBeLessThan(MIN_PAYMENT);
  });
});

describe("the calculator cannot create a financing agreement", () => {
  it("refuses to build a contractual schedule from a range", () => {
    // @ts-expect-error a Band is not an agreed price — that is the point
    expect(() => buildSchedule(range, 3)).toThrow();
  });

  it("refuses a schedule without a fixed agreed price", () => {
    expect(() => buildSchedule(0, 3)).toThrow(/single agreed price/i);
    expect(() => buildSchedule(Number.NaN, 3)).toThrow(/single agreed price/i);
  });

  it("refuses a schedule beyond the absolute ceiling", () => {
    expect(() => buildSchedule(50000, 24)).toThrow(/out of range/i);
  });
});

describe("counsel approval cannot be self-certified", () => {
  it("defaults to review recommended", () => {
    expect(contractStatus(null)).toBe("COUNSEL_REVIEW_RECOMMENDED");
    expect(contractStatus()).toBe("COUNSEL_REVIEW_RECOMMENDED");
  });

  it("rejects an approval missing real evidence", () => {
    const partial = {
      counselName: "",
      firm: "",
      barNumber: "",
      jurisdiction: "qc",
      documentVersion: "1.0",
      documentHash: "x".repeat(64),
      approvedOn: "2026-08-15",
    } as CounselApproval;
    expect(contractStatus(partial)).toBe("COUNSEL_REVIEW_RECOMMENDED");
  });

  it("accepts only a fully evidenced approval", () => {
    const full: CounselApproval = {
      counselName: "A. Lawyer",
      firm: "Firm LLP",
      barNumber: "12345",
      jurisdiction: "qc",
      documentVersion: "1.0",
      documentHash: "a".repeat(64),
      approvedOn: "2026-08-15",
    };
    expect(contractStatus(full)).toBe("COUNSEL_APPROVED");
  });
});

describe("Charter of the French Language s.55", () => {
  it("requires French first for a Québec client", () => {
    expect(requiresFrenchFirst("qc")).toBe(true);
  });

  it("does not apply outside Québec — s.55 ¶4(3)", () => {
    for (const j of ["ca_other", "us", "eu", "uk", "other"] as const) {
      expect(requiresFrenchFirst(j)).toBe(false);
      expect(isLanguageElectionValid(null, j)).toBe(true);
    }
  });

  it("rejects an English election with no French version remitted", () => {
    expect(isLanguageElectionValid(null, "qc")).toBe(false);
  });

  it("rejects an election made BEFORE the French version was remitted", () => {
    /* This is the whole point of s.55: a signature-block clause reading "the
       client agrees to contract in English" does not satisfy the section. */
    expect(
      isLanguageElectionValid(
        {
          frenchVersionRemittedAt: "2026-08-15T12:00:00Z",
          electedLanguage: "en",
          electedAt: "2026-08-15T09:00:00Z",
          frenchDocumentHash: "a".repeat(64),
        },
        "qc",
      ),
    ).toBe(false);
  });

  it("accepts an election made after the French version was remitted", () => {
    expect(
      isLanguageElectionValid(
        {
          frenchVersionRemittedAt: "2026-08-15T09:00:00Z",
          electedLanguage: "en",
          electedAt: "2026-08-15T12:00:00Z",
          frenchDocumentHash: "a".repeat(64),
        },
        "qc",
      ),
    ).toBe(true);
  });

  it("needs no election at all when the client signs in French", () => {
    expect(
      isLanguageElectionValid(
        {
          frenchVersionRemittedAt: "2026-08-15T09:00:00Z",
          electedLanguage: "fr",
          electedAt: "2026-08-15T09:00:00Z",
          frenchDocumentHash: "",
        },
        "qc",
      ),
    ).toBe(true);
  });
});
