import { describe, expect, it } from "vitest";
import { cmsContentDates } from "@/lib/cms/dates";
import type { CmsPublishedContent } from "@/lib/cms/types";

const item = (over: Partial<CmsPublishedContent>, data?: Record<string, unknown>) =>
  ({
    first_published_at: "2026-08-12T10:00:00Z",
    publish_at: null,
    published_at: "2026-10-29T09:00:00Z",
    snapshot: { data: data ?? null },
    ...over,
  }) as unknown as CmsPublishedContent;

describe("cmsContentDates", () => {
  it("does not treat a republish as a modification", () => {
    expect(cmsContentDates(item({}))).toEqual({ published: "2026-08-12" });
  });

  it("uses the writer's explicit updated date", () => {
    expect(cmsContentDates(item({}, { updated: "2026-09-01" }))).toEqual({
      published: "2026-08-12",
      modified: "2026-09-01",
    });
  });

  it("ignores malformed or earlier updated dates", () => {
    expect(cmsContentDates(item({}, { updated: "Sept 1" })).modified).toBeUndefined();
    expect(cmsContentDates(item({}, { updated: "2026-01-01" })).modified).toBeUndefined();
  });

  it("falls back to published_at when there is no first publish date", () => {
    expect(cmsContentDates(item({ first_published_at: null })).published).toBe("2026-10-29");
  });
});
