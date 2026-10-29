import { describe, expect, it } from "vitest";
import { gameBundles } from "@/data/games";
import { projects, projectCategories, projectsWithDetailPage } from "@/data/portfolio/projects";
import {
  activeCategories,
  entryPath,
  entryTitleTag,
  isPublished,
  publishedEntries,
  resolveLink,
} from "@/lib/games";
import { prepare, search, editDistance } from "@/lib/search";
import { siteSearchDocs, wikiSearchDocs } from "@/lib/search-index";

/**
 * The wiki is data, so its failure modes are data failures: a link to a page
 * that doesn't exist, two pages competing for one search intent, a page
 * published with nothing in it. None of that shows up as a type error.
 */

const LINK = /\[[^\]]+\]\((@[^)]+)\)/g;

function allText(entry: (typeof gameBundles)[number]["wiki"][number]): string {
  return JSON.stringify([entry.answer, entry.sections]);
}

describe.each(gameBundles.map((b) => [b.game.slug, b] as const))("%s wiki", (_slug, bundle) => {
  const published = publishedEntries(bundle);

  it("has unique slugs across the whole game", () => {
    const slugs = bundle.wiki.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("puts every entry in a declared category", () => {
    const ids = new Set(bundle.categories.map((c) => c.id));
    for (const e of bundle.wiki) expect(ids.has(e.category), `${e.slug} → ${e.category}`).toBe(true);
  });

  it("only links to published entries", () => {
    for (const e of published) {
      for (const [, target] of allText(e).matchAll(LINK)) {
        expect(resolveLink(bundle, target), `${e.slug} links to ${target}`).not.toBeNull();
      }
      for (const r of e.related) {
        expect(published.some((p) => p.slug === r), `${e.slug} related → ${r}`).toBe(true);
      }
    }
  });

  it("publishes no empty or placeholder pages", () => {
    for (const e of published) {
      expect(e.answer.length, `${e.slug} answer`).toBeGreaterThan(60);
      if (e.slug !== "development-log") expect(e.sections.length, `${e.slug} sections`).toBeGreaterThan(0);
      expect(allText(e)).not.toMatch(/lorem|TODO|TBD|placeholder/i);
      expect(e.sources.length).toBeGreaterThan(0);
    }
  });

  it("never publishes unverified, planned or deprecated content", () => {
    for (const e of published) expect(isPublished(e)).toBe(true);
    const routed = new Set(published.map((e) => e.slug));
    for (const e of bundle.wiki.filter((x) => x.verification !== "verified_live")) {
      expect(routed.has(e.slug)).toBe(false);
    }
  });

  it("gives every published page a unique title tag and a useful meta description", () => {
    const titles = published.map((e) => entryTitleTag(bundle, e));
    expect(new Set(titles).size).toBe(titles.length);
    const descriptions = published.map((e) => e.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    for (const e of published) {
      expect(e.description.length, `${e.slug}: ${e.description.length} chars`).toBeGreaterThanOrEqual(70);
      expect(e.description.length, `${e.slug}: ${e.description.length} chars`).toBeLessThanOrEqual(165);
      expect(entryTitleTag(bundle, e).length, `${e.slug} title`).toBeLessThanOrEqual(80);
    }
  });

  it("has unique H1s", () => {
    const h1s = published.map((e) => e.title.toLowerCase());
    expect(new Set(h1s).size).toBe(h1s.length);
  });

  it("references only media declared in the manifest", () => {
    const ids = [
      ...Object.values(bundle.game.media).flat(),
      ...published.map((e) => e.media).filter(Boolean),
    ] as string[];
    for (const id of ids) expect(bundle.media[id], id).toBeDefined();
  });

  it("builds stable, predictable URLs", () => {
    for (const e of published) {
      expect(entryPath(bundle.game.slug, e)).toMatch(/^\/games\/[a-z0-9-]+\/wiki\/[a-z0-9-]+\/[a-z0-9-]+$/);
    }
  });

  it("only exposes categories that have content", () => {
    for (const c of activeCategories(bundle)) {
      expect(published.some((e) => e.category === c.id)).toBe(true);
    }
  });

  it("keeps unpublished content out of search", () => {
    const urls = new Set(wikiSearchDocs(bundle.game.slug).map((d) => d.url));
    for (const e of bundle.wiki.filter((x) => !isPublished(x))) {
      expect(urls.has(entryPath(bundle.game.slug, e))).toBe(false);
    }
  });
});

describe("portfolio registry", () => {
  it("has unique ids and slugs", () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it("uses declared categories, and every category used has a label", () => {
    const ids = new Set(projectCategories.map((c) => c.id));
    for (const p of projects) for (const c of p.categories) expect(ids.has(c), `${p.id} → ${c}`).toBe(true);
  });

  it("does not give a project with a canonical home a second page", () => {
    for (const p of projectsWithDetailPage()) expect(p.canonicalPath).toBeUndefined();
  });

  it("keeps every project that was on the old portfolio", () => {
    const titles = projects.map((p) => p.title);
    for (const t of ["Lisa Travel Design", "BankDeMark", "Blackwater Aquatics", "ZYLX.ai", "Northground Bushcraft", "NAVTRL / Stalkr"]) {
      expect(titles).toContain(t);
    }
  });
});

describe("site search", () => {
  const index = prepare(siteSearchDocs());
  const top = (q: string, group?: string) => search(index, q, group)[0]?.doc.title;

  it("finds exact titles first", () => {
    expect(top("shotgun")).toBe("Shotgun");
    expect(top("brute")).toBe("Brute");
  });

  it("tolerates typos", () => {
    expect(editDistance("shotgn", "shotgun")).toBe(1);
    expect(top("shotgn")).toBe("Shotgun");
    expect(top("machette")).toBe("Machete");
  });

  it("matches aliases", () => {
    expect(search(index, "locker").map((h) => h.doc.title)).toContain("Hiding");
    const keybinds = search(index, "keybinds").slice(0, 2).map((h) => h.doc.title);
    expect(keybinds).toContain("Stillskin Forest Controls");
    expect(keybinds).toContain("RISK IT! Controls");
  });

  it("filters by group", () => {
    for (const h of search(index, "forest", "Projects")) expect(h.doc.group).toBe("Projects");
  });

  it("returns nothing for nonsense rather than noise", () => {
    expect(search(index, "qwxzv plorf")).toHaveLength(0);
  });
});

describe("share images for hub-level pages", () => {
  it("every game's thumbnail is a real image, so wiki home pages get a share card", async () => {
    const { socialImage } = await import("@/lib/games");
    for (const bundle of gameBundles) {
      const img = socialImage(bundle);
      expect(img, bundle.game.slug).toBeDefined();
      expect(img!.url).toMatch(/^https:\/\/stillawakemedia\.com\/games\/.+-thumbnail\.webp$/);
      expect(img!.alt.length).toBeGreaterThan(10);
    }
  });

  it("a sectioned guide places every game in exactly one section", async () => {
    const { comparisonGuides } = await import("@/data/games/guides");
    for (const guide of comparisonGuides) {
      if (!guide.sections) continue;
      const placed = guide.sections.flatMap((s) => s.games).sort();
      expect(placed, guide.id).toEqual(guide.games.map((g) => g.universeId).sort());
    }
  });

  it("every comparison guide names one of our games and uses its thumbnail", async () => {
    const { comparisonGuides } = await import("@/data/games/guides");
    const { guideMetadata } = await import("@/components/games/ComparisonGuidePage");
    const { getBundle, socialImage } = await import("@/lib/games");
    for (const guide of comparisonGuides) {
      const bundle = getBundle(guide.gameSlug);
      expect(bundle, guide.id).toBeDefined();
      const meta = guideMetadata(guide);
      const og = meta.openGraph as { images?: { url: string }[] };
      expect(og.images?.[0]?.url).toBe(socialImage(bundle)!.url);
    }
  });
});
