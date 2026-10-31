import { describe, it, expect } from "vitest";
import {
  BRAND_SUFFIX,
  MAX_TITLE_LENGTH,
  brandedTitle,
  pageTitle,
  titleWithBrand,
  withPageTitle,
} from "./page-title";

const chars = (s: string) => [...s].length;

describe("brandedTitle", () => {
  it("appends the brand when the full title fits", () => {
    expect(brandedTitle("Contact | Start a Project")).toBe("Contact | Start a Project | StillAwake Media");
  });

  it("keeps the brand at exactly the limit", () => {
    const title = "x".repeat(MAX_TITLE_LENGTH - BRAND_SUFFIX.length);
    expect(chars(brandedTitle(title))).toBe(MAX_TITLE_LENGTH);
    expect(brandedTitle(title).endsWith(BRAND_SUFFIX)).toBe(true);
  });

  it("drops the brand one character past the limit, leaving the page title untouched", () => {
    const title = "x".repeat(MAX_TITLE_LENGTH - BRAND_SUFFIX.length + 1);
    expect(brandedTitle(title)).toBe(title);
  });

  it("emits a long title alone rather than truncating it", () => {
    const wiki = "Stillskin Forest Wiki: Official Guides, Weapons and Enemies";
    expect(brandedTitle(wiki)).toBe(wiki);
    const fr = "Shopify ou WooCommerce (2026) : comparaison honnête pour le Québec";
    expect(brandedTitle(fr)).toBe(fr);
  });

  it("keeps the brand on a short French title (the /fr homepage, 59 characters)", () => {
    const title = "Agence web à Montréal — Sites, SEO et IA";
    expect(brandedTitle(title)).toBe(`${title}${BRAND_SUFFIX}`);
    expect(chars(brandedTitle(title))).toBe(59);
  });

  it("counts characters, not UTF-16 code units", () => {
    // 41 characters but 42 UTF-16 units: exactly 60 characters with the suffix, so it fits.
    const title = "x".repeat(MAX_TITLE_LENGTH - BRAND_SUFFIX.length - 1) + "😀";
    expect(title.length).toBe(MAX_TITLE_LENGTH - BRAND_SUFFIX.length + 1);
    expect(brandedTitle(title)).toBe(`${title}${BRAND_SUFFIX}`);
  });

  it("does not add the brand to a title that already names it", () => {
    expect(brandedTitle("Products | StillAwake Media")).toBe("Products | StillAwake Media");
  });
});

describe("pageTitle", () => {
  it("always returns an absolute title so the layout template cannot re-append the suffix", () => {
    expect(pageTitle("Pricing")).toEqual({ absolute: "Pricing | StillAwake Media" });
    const long = "Stillskin Forest: Co-op Survival Horror on Roblox";
    expect(pageTitle(long)).toEqual({ absolute: long });
  });
});

describe("withPageTitle", () => {
  it("rewrites a string title and leaves the rest of the metadata alone", () => {
    const meta = withPageTitle({ title: "Contact", description: "d", alternates: { canonical: "/contact" } });
    expect(meta).toEqual({
      title: { absolute: "Contact | StillAwake Media" },
      description: "d",
      alternates: { canonical: "/contact" },
    });
  });

  it("passes explicit absolute titles through", () => {
    const meta = { title: { absolute: "Our Portfolio | Web Design & Development — StillAwake Media" } };
    expect(withPageTitle(meta)).toBe(meta);
  });

  it("keeps the brand in og:title when the page relied on Next filling it from <title>", () => {
    const long = "Shopify vs WooCommerce (2026): An Honest Canadian Comparison";
    const meta = withPageTitle({ title: long, openGraph: { url: "/x" } });
    expect(meta.title).toEqual({ absolute: long });
    expect(meta.openGraph?.title).toBe(titleWithBrand(long));
    expect(meta.openGraph?.title).toContain("StillAwake Media");
  });

  it("does not override an og:title the page set itself", () => {
    const meta = withPageTitle({ title: "Long enough title that will drop the brand suffix here", openGraph: { title: "Share" } });
    expect(meta.openGraph?.title).toBe("Share");
  });
});
