import { describe, expect, it } from "vitest";

import { clientBreakdown, internalBreakdown } from "./breakdown";
import { estimate } from "./engine";
import { estimateInputFromIntake } from "./intake-mapping";

/** A realistic filled-in intake for a restaurant that wants bookings. */
const restaurant = {
  project_type: "website",
  new_or_existing: "rebuild",
  business_name: "Chez Nous",
  business_does: "A neighbourhood bistro",
  pages_scale: "5_15",
  site_goals: ["booking", "inform"],
  site_features: ["cms", "local_seo"],
  content_owner: "shared",
  timeline: "1_2_months",
  budget: "5_15k",
  decision_makers: "just_me",
};

describe("mapping a completed intake", () => {
  it("reads the project type and size into a base", () => {
    const { input } = estimateInputFromIntake(restaurant);
    expect(input.base).toBe("website_standard");
  });

  it("prices bookings as an integration, not a build", () => {
    /* The difference is thousands of dollars, and someone asking for bookings
       on a bistro site nearly always wants OpenTable connected. */
    const { input } = estimateInputFromIntake(restaurant);
    expect(input.additions).toContainEqual({ id: "bookings", variant: "integrate" });
  });

  it("carries local search through", () => {
    expect(estimateInputFromIntake(restaurant).input.seo).toBe("local");
  });

  it("reads shared content ownership as content help", () => {
    const { input } = estimateInputFromIntake(restaurant);
    expect(input.additions?.some((a) => a.id === "content_help")).toBe(true);
  });

  it("produces a priceable input", () => {
    const result = estimate(estimateInputFromIntake(restaurant).input);
    expect(result.low).toBeGreaterThan(0);
    expect(result.high).toBeGreaterThan(result.low);
  });
});

describe("the mapping never hides what it ignored", () => {
  it("reports answers it has no pricing rule for", () => {
    const { unmapped } = estimateInputFromIntake({
      ...restaurant,
      some_future_question: "a value the model has never heard of",
    });
    expect(unmapped.join(" ")).toMatch(/some_future_question/);
  });

  it("says so when the size question was skipped", () => {
    const { unmapped } = estimateInputFromIntake({ ...restaurant, pages_scale: "unsure" });
    expect(unmapped.join(" ")).toMatch(/pages_scale/);
  });

  it("does not treat free-text answers as unmapped noise", () => {
    const { unmapped } = estimateInputFromIntake(restaurant);
    expect(unmapped.join(" ")).not.toMatch(/business_does|business_name/);
  });

  it("flags an intake too thin to price", () => {
    expect(estimateInputFromIntake({}).needsReview).toBe(true);
    expect(estimateInputFromIntake({ project_type: "other" }).input.undefinedScope).toBe(true);
  });

  it("routes a native app to discovery rather than guessing", () => {
    const { input } = estimateInputFromIntake({ project_type: "mobile_app" });
    expect(input.undefinedScope).toBe(true);
  });
});

describe("software sizing", () => {
  it("scales with the number of heavy capabilities", () => {
    const small = estimateInputFromIntake({ project_type: "saas", app_needs: ["search"] });
    const big = estimateInputFromIntake({
      project_type: "saas",
      app_needs: ["accounts_auth", "payments", "subscriptions", "realtime", "ai", "admin"],
    });
    expect(small.input.base).toBe("software_dashboard");
    expect(big.input.base).toBe("software_platform");
  });

  it("prices a bigger store for a bigger catalogue", () => {
    expect(estimateInputFromIntake({ project_type: "ecommerce", product_count: "1_10" }).input.base)
      .toBe("store_standard");
    expect(
      estimateInputFromIntake({ project_type: "ecommerce", product_count: "1000_plus" }).input.base,
    ).toBe("store_large");
  });
});

describe("the client breakdown is safe to paste", () => {
  const result = estimate(estimateInputFromIntake(restaurant).input);
  const text = clientBreakdown(result, { projectName: "Chez Nous" });

  it("shows the range", () => {
    expect(text).toMatch(/Estimated range: CA\$[\d,]+ – CA\$[\d,]+/);
  });

  it("says it is not a quote", () => {
    expect(text).toMatch(/not a quote/i);
  });

  it("leaks no internal figures", () => {
    /* The whole reason internal and client breakdowns are separate functions. */
    for (const forbidden of [
      String(result.expected),
      String(result.internalRate),
      String(result.internalValue.low),
      String(result.days.expected),
    ]) {
      expect(text).not.toContain(forbidden);
    }
    expect(text).not.toMatch(/implied|opportunity|per day|internal/i);
  });

  it("includes payment options that divide the range", () => {
    expect(text).toMatch(/3 payments: CA\$[\d,]+ – CA\$[\d,]+/);
  });

  it("uses prose, not engine keys", () => {
    /* The engine emits keys so one model can serve two languages. A client
       who receives "bookings.integrate" has been sent our internal vocabulary. */
    const bullets = text.split("\n").filter((l) => l.startsWith("  - "));
    expect(bullets.length).toBeGreaterThan(3);
    for (const b of bullets) {
      const item = b.slice(4);
      expect(item, `"${item}" is an engine key, not prose`).not.toMatch(/^[a-z][a-z_.]*$/);
    }
    expect(text).toMatch(/Custom design/);
  });

  it("has a French version with the same structure", () => {
    const frText = clientBreakdown(result, { locale: "fr" });
    expect(frText).toMatch(/Fourchette estimée/);
    expect(frText).toMatch(/versements/);
    expect(frText).not.toMatch(/Estimated range/);
  });
});

describe("the internal breakdown is marked and complete", () => {
  const result = estimate(estimateInputFromIntake(restaurant).input);
  const text = internalBreakdown(result, { projectName: "Chez Nous" });

  it("warns on the first line", () => {
    expect(text.split("\n")[0]).toMatch(/INTERNAL — do not send/);
  });

  it("carries the figures the operator needs", () => {
    expect(text).toMatch(/Implied rate/);
    expect(text).toMatch(/Opportunity/);
    expect(text).toMatch(/Effort/);
  });
});
