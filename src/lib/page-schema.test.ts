import { describe, it, expect } from "vitest";
import { PAGE_SCHEMA } from "@/data/page-schema-map";
import { buildPageSchema } from "@/lib/page-schema";
import { entityIds } from "@/data/entities";
import { siteUrl } from "@/lib/data";

/**
 * These pages had no structured data at all before. The risk now is not that
 * schema is missing but that it drifts: a dangling @id, a page that claims to
 * be a Service without saying what service, a breadcrumb pointing at a URL
 * that isn't the page. None of that is visible in the browser, so it is
 * checked here instead.
 */

const entries = Object.entries(PAGE_SCHEMA);

function graphFor(route: string) {
  const url = route === "/" ? `${siteUrl}/` : `${siteUrl}${route.replace(/\/$/, "")}`;
  return { url, graph: buildPageSchema({ ...PAGE_SCHEMA[route], url })["@graph"] };
}

describe("page schema registry", () => {
  it("covers the routes that had no other schema", () => {
    // 17 pages that originally had none, plus the two privacy pages from
    // the consent work, the llms.txt tool, and the /tools index added with
    // the platform-guide cluster, plus the EN and FR project cost calculator.
    // An exact count is deliberate: it forces a conscious decision whenever a
    // route joins or leaves.
    expect(entries.length).toBe(25);
  });

  it.each(entries.map(([r]) => r))("%s produces a coherent graph", (route) => {
    const { url, graph } = graphFor(route);

    const page = graph.find((n) => String(n["@id"] ?? "").endsWith("#webpage"));
    expect(page, "every page needs a page node").toBeDefined();
    expect(page!.url).toBe(url);
    expect(page!.name).toBeTruthy();
    expect(page!.description).toBeTruthy();

    // Every reference must point at an entity the site actually declares.
    expect(page!.isPartOf).toEqual({ "@id": entityIds.website });
    expect(page!.publisher).toEqual({ "@id": entityIds.organization });

    const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList") as
      | { itemListElement: { position: number; item: string }[] }
      | undefined;
    expect(crumbs, "every page needs a breadcrumb").toBeDefined();
    const trail = crumbs!.itemListElement;
    // Positions are 1..n with no gaps, and the trail ends on this page.
    expect(trail.map((c) => c.position)).toEqual(trail.map((_, i) => i + 1));
    expect(trail.at(-1)!.item).toBe(url);
  });

  it("gives every service page a serviceType", () => {
    for (const [route, entry] of entries) {
      if (entry.kind !== "service") continue;
      const service = graphFor(route).graph.find((n) => n["@type"] === "Service");
      expect(service, `${route} is a service page with no Service node`).toBeDefined();
      expect(service!.serviceType).toBeTruthy();
      expect(service!.provider).toEqual({ "@id": entityIds.organization });
    }
  });

  it("declares French pages as French", () => {
    for (const [route, entry] of entries) {
      const expected = route === "/fr" || route.startsWith("/fr/") ? "fr" : "en";
      expect(entry.locale, `${route} has the wrong locale`).toBe(expected);
    }
  });
});
