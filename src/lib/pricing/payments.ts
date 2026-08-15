/**
 * Payment options — the rules from docs/payment-compliance.md, as code.
 *
 * READ docs/payment-compliance.md BEFORE CHANGING ANY NUMBER IN THIS FILE.
 * Each constant here traces to a quoted statutory provision. They are not
 * product decisions and they are not tuneable by preference.
 *
 * The model in one line: the same total price, split into a few payments, with
 * no interest, no fees, and no price difference for paying over time. Every
 * element is load-bearing — remove one and the compliance analysis collapses.
 */

import type { Band } from "./types";

/** Currency rounding for a displayed payment. Whole dollars — see roundPayment. */
const CENTS = 0;

/**
 * PUBLIC CEILING — 4 payments.
 *
 * Regulation Z §1026.2(a)(17)(i) makes a plan "payable by written agreement in
 * more than four installments" consumer credit EVEN WITH NO FINANCE CHARGE. The
 * public calculator cannot verify who is reading it, so what it advertises must
 * be safe for a consumer in the strictest jurisdiction we looked at.
 *
 * At 4 or fewer, completed by launch, we are simultaneously inside:
 *   US   Reg Z §1026.2(a)(17)(i)  — not more than four instalments
 *   UK   RAO art.60F(2)           — ≤12 payments within 12 months, no charges
 *   EU   CCD2 art.2(2)(h)         — completed within 50 days of delivery
 *   QC   CPA s.1(f)               — no charges, therefore not "credit"
 */
export const PUBLIC_MAX_PAYMENTS = 4;

/**
 * The schedules the public calculator may advertise. Derived from the ceiling
 * rather than written out, so raising the cap cannot leave this list stale.
 * Starts at 2 — "1 payment" is paying in full, which is not a schedule.
 */
export const PUBLIC_PAYMENT_COUNTS: number[] = Array.from(
  { length: PUBLIC_MAX_PAYMENTS - 1 },
  (_, i) => i + 2,
);

/**
 * ABSOLUTE CEILING — 12 payments within 12 months, business clients only.
 * RAO art.60F(2)(b),(c). Never exceed this for any client in any jurisdiction.
 */
export const ABSOLUTE_MAX_PAYMENTS = 12;
export const ABSOLUTE_MAX_MONTHS = 12;

/**
 * Smallest instalment we will schedule. Not a legal limit — an operational one.
 * Splitting a small project into many tiny payments multiplies the administrative
 * cost and the number of dates on which GST/QST falls due under ETA s.152(1)(c)
 * whether or not the client has paid.
 */
export const MIN_PAYMENT = 400;

/** Client classification. Drives which schedules are even offerable. */
export type ClientClass =
  /** Incorporated company, partnership, nonprofit — never a "consumer". QC CPA s.1(e). */
  | "business"
  /** Natural person, business purpose (sole proprietor). Excluded from "consumer" by s.1(e). */
  | "sole_proprietor"
  /** Natural person, personal purpose. Full consumer protection applies. */
  | "consumer"
  /** Not yet established — what the public calculator always sees. */
  | "unknown";

/** Where the client is. Drives which regime's ceiling binds. */
export type Jurisdiction = "qc" | "ca_other" | "us" | "eu" | "uk" | "other" | "unknown";

/** Why a schedule is not available. Internal only — never sent to the public. */
export type Restriction =
  | "exceeds_public_cap"
  | "consumer_beyond_delivery"
  | "unsupported_jurisdiction"
  | "payment_below_minimum"
  | "counsel_gate"
  | "exceeds_absolute_cap";

export type PaymentOption = {
  /** Number of equal payments, including the first one taken at signature. */
  count: number;
  /** Per-payment band. Low from the range low, high from the range high. */
  perPayment: Band;
  /** True when the schedule finishes on or before expected delivery. */
  withinDelivery: boolean;
  /** Publicly advertisable — safe for an unknown reader in every jurisdiction. */
  public: boolean;
};

export type PaymentAvailability = {
  offered: PaymentOption[];
  /** Internal-only. Why each blocked schedule is blocked. */
  blocked: { count: number; reason: Restriction }[];
};

/**
 * Round a payment for display. Whole dollars.
 *
 * Deliberately NOT rounded so the payments sum exactly to the total: these are
 * estimates from a range, and inventing a different final "balancing" payment
 * would imply a precision the estimate does not have. The contractual schedule
 * is generated separately from the agreed fixed price — see buildSchedule.
 */
export function roundPayment(amount: number): number {
  return Math.round(amount / 10 ** -CENTS) * 10 ** -CENTS;
}

/**
 * Split a project RANGE across N payments.
 *
 * P12: low ÷ N and high ÷ N. The midpoint is never used — presenting a single
 * derived figure would make an estimated range look like a quoted payment.
 */
export function splitRange(range: Band, count: number): Band {
  if (count < 1 || !Number.isInteger(count)) {
    throw new Error(`payment count must be a positive integer, got ${count}`);
  }
  return {
    low: roundPayment(range.low / count),
    expected: roundPayment(range.expected / count),
    high: roundPayment(range.high / count),
  };
}

/**
 * The rule that keeps every other rule true.
 *
 * QC CPA s.70(g) makes "the value of the rebate or of the discount to which the
 * consumer is entitled if he pays cash" a CREDIT CHARGE. So if paying over time
 * ever cost more than paying at once, the difference would be a credit charge,
 * the arrangement would become a regulated contract of credit, and the whole
 * disclosure regime would attach.
 *
 * Called on every schedule we build. It should never throw; if it does, someone
 * has introduced a surcharge and the compliance position is already broken.
 */
export function assertNoCreditCharge(singlePaymentTotal: number, scheduledTotal: number): void {
  if (Math.abs(scheduledTotal - singlePaymentTotal) > 0.01) {
    throw new Error(
      "Payment schedule total must equal the single-payment total. A difference " +
        "is a credit charge under Quebec CPA s.70(g) and converts this into a " +
        "regulated contract of credit. See docs/payment-compliance.md §2.",
    );
  }
}

/**
 * Which schedules may be shown or offered.
 *
 * `deliveryMonths` is how long the project itself runs. A schedule that ends
 * after delivery is materially different from one that ends at launch: for an
 * EU consumer it leaves CCD2's art.2(2)(h) exclusion entirely (payment must be
 * "entirely executed within 50 days of the delivery"), which is why consumers
 * never get one.
 */
export function availablePayments(
  range: Band,
  opts: {
    clientClass: ClientClass;
    jurisdiction: Jurisdiction;
    deliveryMonths: number;
    /** Candidate schedules, defaulting to what the public calculator shows. */
    counts?: number[];
    /** Internal surfaces pass true to see business-only schedules. */
    includeNonPublic?: boolean;
  },
): PaymentAvailability {
  const counts = opts.counts ?? [2, 3, 4, 6, 12];
  const offered: PaymentOption[] = [];
  const blocked: { count: number; reason: Restriction }[] = [];

  for (const count of counts) {
    const perPayment = splitRange(range, count);
    /* One payment per month, the first at signature — so N payments span N-1 months. */
    const spanMonths = count - 1;
    const withinDelivery = spanMonths <= opts.deliveryMonths;

    const block = (reason: Restriction) => blocked.push({ count, reason });

    if (count > ABSOLUTE_MAX_PAYMENTS || spanMonths > ABSOLUTE_MAX_MONTHS) {
      block("exceeds_absolute_cap");
      continue;
    }
    /* Low end of the band is what governs: if the cheapest version of this
       project produces a payment below the floor, the schedule is impractical. */
    if (perPayment.low < MIN_PAYMENT) {
      block("payment_below_minimum");
      continue;
    }

    const isPublic = count <= PUBLIC_MAX_PAYMENTS && withinDelivery;

    if (opts.clientClass === "consumer" || opts.clientClass === "unknown") {
      /* Reg Z §1026.2(a)(17)(i): more than four instalments is consumer credit
         even with no finance charge. CCD2 art.2(2)(h): must complete within 50
         days of delivery. Both bite for anyone we cannot classify. */
      if (count > PUBLIC_MAX_PAYMENTS) {
        block("exceeds_public_cap");
        continue;
      }
      if (!withinDelivery) {
        block("consumer_beyond_delivery");
        continue;
      }
    } else {
      /* Business client. Outside QC CPA (s.1(e)), Reg Z (§1026.3(a)), CCD2
         (art.3(1)). Still capped by the UK ceiling and by counsel gate Q5. */
      if (count > PUBLIC_MAX_PAYMENTS) {
        if (!SUPPORTED_B2B_JURISDICTIONS.includes(opts.jurisdiction)) {
          block("unsupported_jurisdiction");
          continue;
        }
        if (count > COUNSEL_GATED_ABOVE) {
          block("counsel_gate");
          continue;
        }
      }
    }

    if (!isPublic && !opts.includeNonPublic) {
      block("exceeds_public_cap");
      continue;
    }

    offered.push({ count, perPayment, withinDelivery, public: isPublic });
  }

  return { offered, blocked };
}

/**
 * Jurisdictions where we have actually done the research to offer a business
 * client a schedule longer than the public cap. Everywhere else gets the public
 * schedules only — we do not invent terms for a country we have not read.
 */
export const SUPPORTED_B2B_JURISDICTIONS: Jurisdiction[] = ["qc", "ca_other", "us", "uk", "eu"];

/**
 * Above this, a schedule needs counsel gate Q5 (UK BNPL reforms, S.I. 2025/1205)
 * answered before it can be offered at all. Raise only when Q5 is closed.
 */
export const COUNSEL_GATED_ABOVE = 6;

/** Contract assurance level. Only the first is assignable by an implementation. */
export type ContractStatus =
  /** Drafted against quoted primary sources. NOT a legal opinion. */
  | "VERIFIED_PRIMARY"
  /** Needs a lawyer before use in this configuration. */
  | "COUNSEL_REVIEW_RECOMMENDED"
  /** Only ever set by a recorded human administrative action. See recordCounselApproval. */
  | "COUNSEL_APPROVED";

/**
 * Counsel approval cannot be asserted by code, by a model, or by a config flag.
 * It requires a recorded act naming a real lawyer against a specific document
 * version. This function is the only path to COUNSEL_APPROVED and it deliberately
 * takes evidence rather than a boolean.
 */
export type CounselApproval = {
  counselName: string;
  firm: string;
  barNumber: string;
  jurisdiction: Jurisdiction;
  documentVersion: string;
  /** SHA-256 of the exact document approved. */
  documentHash: string;
  approvedOn: string;
};

export function contractStatus(approval?: CounselApproval | null): ContractStatus {
  if (!approval) return "COUNSEL_REVIEW_RECOMMENDED";
  const complete =
    approval.counselName.trim() !== "" &&
    approval.firm.trim() !== "" &&
    approval.barNumber.trim() !== "" &&
    approval.documentHash.length === 64 &&
    approval.documentVersion.trim() !== "" &&
    approval.approvedOn.trim() !== "";
  return complete ? "COUNSEL_APPROVED" : "COUNSEL_REVIEW_RECOMMENDED";
}

/**
 * Does this client need the French version handed over before they may be asked
 * to sign an English one?
 *
 * Charter of the French Language s.55: for a contract of adhesion, the parties
 * may be bound by a non-French version only "after its French version has been
 * remitted to the adhering party". The fourth paragraph exempts "a contract used
 * in relations with persons outside Québec" — so this turns on where the CLIENT
 * is, not on StillAwake being in Québec.
 *
 * Note this is NOT limited to consumers. It binds B2B dealings equally.
 */
export function requiresFrenchFirst(jurisdiction: Jurisdiction): boolean {
  return jurisdiction === "qc";
}

/**
 * Evidence that s.55 was satisfied. An election is only valid if the French
 * version was remitted BEFORE it was made — a signature block reading "the
 * client agrees to contract in English" does not satisfy the section.
 */
export type LanguageElection = {
  frenchVersionRemittedAt: string;
  electedLanguage: "fr" | "en";
  electedAt: string;
  /** SHA-256 of the French version actually delivered. */
  frenchDocumentHash: string;
};

export function isLanguageElectionValid(
  election: LanguageElection | null,
  jurisdiction: Jurisdiction,
): boolean {
  if (!requiresFrenchFirst(jurisdiction)) return true;
  if (!election) return false;
  if (election.electedLanguage === "fr") return true;
  const remitted = Date.parse(election.frenchVersionRemittedAt);
  const elected = Date.parse(election.electedAt);
  if (Number.isNaN(remitted) || Number.isNaN(elected)) return false;
  /* The order is the whole point of s.55. */
  return remitted <= elected && election.frenchDocumentHash.length === 64;
}

/**
 * The contractual schedule, as distinct from the estimate.
 *
 * P12: once a proposal fixes a single price, the schedule must be built from
 * THAT price, never from the calculator's range. Passing a range here is a
 * programming error, so the signature only accepts a number.
 */
export function buildSchedule(
  agreedPrice: number,
  count: number,
): { payments: number[]; total: number } {
  if (!Number.isFinite(agreedPrice) || agreedPrice <= 0) {
    throw new Error("A contractual schedule requires a single agreed price.");
  }
  if (count < 1 || !Number.isInteger(count) || count > ABSOLUTE_MAX_PAYMENTS) {
    throw new Error(`payment count out of range: ${count}`);
  }
  /* Here the payments MUST sum to the price exactly — this is a contract, not an
     estimate. Rounding lands on the first payment, which is the largest and the
     one taken at signature. */
  const base = Math.floor((agreedPrice / count) * 100) / 100;
  const payments = Array.from({ length: count }, () => base);
  const drift = Math.round((agreedPrice - base * count) * 100) / 100;
  payments[0] = Math.round((payments[0] + drift) * 100) / 100;
  const total = Math.round(payments.reduce((a, b) => a + b, 0) * 100) / 100;
  assertNoCreditCharge(agreedPrice, total);
  return { payments, total };
}
