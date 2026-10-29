import { describe, expect, it } from "vitest";
import { looksLikeBot, parseUsagePing } from "./tool-usage";

describe("tool usage allow-list", () => {
  it("accepts only declared tool, event and detail combinations", () => {
    expect(parseUsagePing({ tool: "schema_generator", event: "copied", detail: "LocalBusiness" })).toEqual({ tool: "schema_generator", event: "copied", detail: "LocalBusiness" });
    expect(parseUsagePing({ tool: "llms_txt", event: "run", detail: "70_89" })).not.toBeNull();
    expect(parseUsagePing({ tool: "calculator", event: "started" })).toEqual({ tool: "calculator", event: "started", detail: "" });
  });

  it("rejects anything outside it, including free text", () => {
    expect(parseUsagePing({ tool: "schema_generator", event: "copied", detail: "https://example.com" })).toBeNull();
    expect(parseUsagePing({ tool: "schema_generator", event: "deleted", detail: "Product" })).toBeNull();
    expect(parseUsagePing({ tool: "admin", event: "run" })).toBeNull();
    expect(parseUsagePing({ tool: "llms_txt", event: "run", detail: 5 })).toBeNull();
    expect(parseUsagePing(null)).toBeNull();
    expect(parseUsagePing("run")).toBeNull();
  });

  it("counts SEO audit runs by fail band and never accepts a URL", () => {
    expect(parseUsagePing({ tool: "seo_audit", event: "run", detail: "fail_1_2" })).toEqual({ tool: "seo_audit", event: "run", detail: "fail_1_2" });
    expect(parseUsagePing({ tool: "seo_audit", event: "run_failed" })).not.toBeNull();
    expect(parseUsagePing({ tool: "seo_audit", event: "run", detail: "https://example.com/" })).toBeNull();
    expect(parseUsagePing({ tool: "seo_audit", event: "copied", detail: "" })).toBeNull();
  });

  it("treats missing or crawler user agents as bots", () => {
    expect(looksLikeBot(null)).toBe(true);
    expect(looksLikeBot("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(looksLikeBot("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15")).toBe(false);
  });
});
