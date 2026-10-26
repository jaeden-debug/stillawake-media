import { describe, expect, it } from "vitest";
import { fullText, gamesSection, projectsSection } from "@/lib/ai-index";
import { recentlyChanged } from "@/lib/indexnow";
import { gameBundles } from "@/data/games";
import { projects, projectHref } from "@/data/portfolio/projects";
import { entryPath, isPublished, publishedEntries } from "@/lib/games";
import { siteUrl } from "@/lib/data";

/**
 * The AI-facing index has one job: list everything that is published and
 * nothing that isn't. A page added tomorrow must show up without anyone
 * editing these files, which is what these tests pin down.
 */
describe("llms index", () => {
  it("lists every project", () => {
    const s = projectsSection();
    for (const p of projects) expect(s).toContain(`${siteUrl}${projectHref(p)}`.replace(`${siteUrl}http`, "http"));
  });

  it("lists every published wiki article and no unpublished one", () => {
    const s = gamesSection();
    const full = fullText();
    for (const b of gameBundles) {
      for (const e of publishedEntries(b)) {
        expect(s).toContain(`${siteUrl}${entryPath(b.game.slug, e)}`);
        expect(full).toContain(`${siteUrl}${entryPath(b.game.slug, e)}`);
      }
      for (const e of b.wiki.filter((x) => !isPublished(x))) {
        expect(s).not.toContain(entryPath(b.game.slug, e));
        expect(full).not.toContain(entryPath(b.game.slug, e));
      }
    }
  });
});

describe("IndexNow change window", () => {
  const now = Date.parse("2026-10-26T12:00:00Z");
  const entries = [
    { url: "a", lastModified: "2026-10-26" },
    { url: "b", lastModified: new Date("2026-10-25T00:00:00Z") },
    { url: "c", lastModified: "2026-08-13" },
    { url: "d" },
  ];

  it("keeps only URLs changed inside the window, newest first", () => {
    expect(recentlyChanged(entries, 2, now)).toEqual(["a", "b"]);
  });

  it("ignores entries without a lastmod", () => {
    expect(recentlyChanged(entries, 3650, now)).not.toContain("d");
  });
});
