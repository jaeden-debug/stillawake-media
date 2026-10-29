import { describe, expect, it } from "vitest";
import { EXAMPLES, FIELDS, SCHEMA_TYPES, buildSchema, renderJsonLd, validate, type SchemaType } from ".";

const errors = (type: SchemaType, values: Record<string, string>, rows: { a: string; b: string }[] = []) =>
  validate(type, { values, rows }).filter((i) => i.level === "error");

describe("schema generator", () => {
  it("every example builds valid JSON-LD with no errors", () => {
    for (const { type } of SCHEMA_TYPES) {
      const schema = buildSchema(type, EXAMPLES[type]);
      expect(schema["@context"]).toBe("https://schema.org");
      expect(JSON.parse(renderJsonLd(schema, false))).toEqual(schema);
      expect(errors(type, EXAMPLES[type].values, EXAMPLES[type].rows), type).toEqual([]);
    }
  });

  it("drops empty fields and empty nested objects", () => {
    const s = buildSchema("Article", { values: { subtype: "Article", headline: "Hi" }, rows: [] });
    expect(s).toEqual({ "@context": "https://schema.org", "@type": "Article", headline: "Hi" });
  });

  it("uses the chosen local business subtype and upper-cases the country", () => {
    const s = buildSchema("LocalBusiness", EXAMPLES.LocalBusiness);
    expect(s["@type"]).toBe("ProfessionalService");
    expect((s.address as Record<string, string>).addressCountry).toBe("CA");
  });

  it("requires a name and the full address for a local business", () => {
    const e = errors("LocalBusiness", { subtype: "LocalBusiness" });
    for (const k of ["name", "streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry"]) {
      expect(e.some((i) => i.field === k), k).toBe(true);
    }
  });

  it("rejects malformed URLs, dates, hours and coordinates", () => {
    expect(errors("Organization", { name: "X", url: "example.com" }).map((i) => i.field)).toContain("url");
    expect(errors("Article", { subtype: "Article", headline: "X", datePublished: "29/10/2026" }).map((i) => i.field)).toContain("datePublished");
    expect(errors("LocalBusiness", { ...EXAMPLES.LocalBusiness.values, openingHours: "Monday 9-5" }).map((i) => i.field)).toContain("openingHours");
    expect(errors("LocalBusiness", { ...EXAMPLES.LocalBusiness.values, latitude: "95" }).map((i) => i.field)).toContain("latitude");
  });

  it("flags a modified date before the published date", () => {
    const e = errors("Article", { subtype: "Article", headline: "X", datePublished: "2026-10-20", dateModified: "2026-10-01" });
    expect(e.map((i) => i.field)).toContain("dateModified");
  });

  it("needs a price or a rating with review count for a product", () => {
    expect(errors("Product", { name: "Mug" }).some((i) => /price, or a rating/.test(i.message))).toBe(true);
    expect(errors("Product", { name: "Mug", ratingValue: "4.5", reviewCount: "12" })).toEqual([]);
    expect(errors("Product", { name: "Mug", price: "$24" }).filter((i) => i.field === "price")).toHaveLength(1);
    expect(errors("Product", { name: "Mug", price: "1e3", priceCurrency: "CAD" }).map((i) => i.field)).toContain("price");
    expect(errors("Product", { name: "Mug", price: "24", priceCurrency: "dollars" }).map((i) => i.field)).toContain("priceCurrency");
  });

  it("numbers breadcrumb positions and lets the last level omit its URL", () => {
    const s = buildSchema("BreadcrumbList", { values: {}, rows: [{ a: "Home", b: "https://x.com/" }, { a: "Here", b: "" }] });
    const items = s.itemListElement as Record<string, unknown>[];
    expect(items.map((i) => i.position)).toEqual([1, 2]);
    expect(items[1].item).toBeUndefined();
    expect(errors("BreadcrumbList", {}, [{ a: "Home", b: "https://x.com/" }, { a: "Here", b: "" }])).toEqual([]);
    expect(errors("BreadcrumbList", {}, [{ a: "Home", b: "" }, { a: "Here", b: "" }]).length).toBeGreaterThan(0);
  });

  it("always says FAQ rich results are retired", () => {
    const notes = validate("FAQPage", EXAMPLES.FAQPage).filter((i) => i.level === "note");
    expect(notes[0].message).toMatch(/7 May 2026/);
  });

  it("escapes < so a value cannot close the script tag", () => {
    const out = renderJsonLd(buildSchema("Organization", { values: { name: "</script><b>" }, rows: [] }), true);
    expect(out).not.toContain("</script><b>");
    expect(out.endsWith("</script>")).toBe(true);
  });

  it("defines fields for every non-list type", () => {
    for (const { type } of SCHEMA_TYPES) {
      if (type === "BreadcrumbList" || type === "FAQPage") continue;
      expect(FIELDS[type].length, type).toBeGreaterThan(0);
    }
  });
});
