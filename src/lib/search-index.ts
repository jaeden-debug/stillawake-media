import { projects, projectCategories, projectHref } from "@/data/portfolio/projects";
import type { SearchDoc } from "@/lib/search";
import { GUIDE_PATH, GUIDE_TITLE, guideGames } from "@/data/games/guides/roblox-survival-horror";
import {
  activeCategories,
  allGames,
  categoryPath,
  entryPath,
  entryText,
  gamePath,
  getBundle,
  publishedEntries,
  wikiPath,
} from "@/lib/games";

/** Server-only: everything published, as search documents. */
export function siteSearchDocs(): SearchDoc[] {
  const docs: SearchDoc[] = projects.map((p) => ({
    id: `project:${p.id}`,
    title: p.title,
    url: projectHref(p),
    group: "Projects",
    summary: p.summary,
    keywords: [
      p.kind,
      ...p.platforms,
      ...p.categories.map((c) => projectCategories.find((x) => x.id === c)?.label ?? c),
      ...(p.technologies ?? []),
    ],
  }));

  docs.push({
    id: "guide:roblox-survival-horror",
    title: GUIDE_TITLE,
    url: GUIDE_PATH,
    group: "Games",
    summary: "Eight Roblox survival-horror games compared, with numbers from Roblox itself.",
    keywords: ["guide", "best", "scary roblox games", "roblox horror games", "with friends", ...guideGames.map((g) => g.name)],
  });

  for (const game of allGames()) {
    docs.push({
      id: `game:${game.id}`,
      title: game.title,
      url: gamePath(game.slug),
      group: "Games",
      summary: game.summary,
      keywords: [...game.genre, ...game.platforms, game.tagline, "game", "wiki"],
    });
    docs.push(...wikiSearchDocs(game.slug));
  }
  return docs;
}

/** Wiki-scoped documents for one game, grouped by wiki category. */
export function wikiSearchDocs(gameSlug: string): SearchDoc[] {
  const bundle = getBundle(gameSlug);
  if (!bundle) return [];
  const label = (id: string) => bundle.categories.find((c) => c.id === id)?.navLabel ?? id;

  const docs: SearchDoc[] = publishedEntries(bundle).map((e) => ({
    id: `wiki:${bundle.game.id}:${e.slug}`,
    title: e.title,
    url: entryPath(gameSlug, e),
    group: label(e.category),
    summary: e.description,
    keywords: [...(e.aliases ?? []), label(e.category), bundle.game.title],
    // Spoiler pages are searchable by title and aliases, not by their body.
    body: e.spoiler ? undefined : entryText(e),
    spoiler: e.spoiler,
  }));

  for (const c of activeCategories(bundle)) {
    docs.push({
      id: `wikicat:${bundle.game.id}:${c.id}`,
      title: `${c.title}`,
      url: categoryPath(gameSlug, c.slug),
      group: c.navLabel,
      summary: c.description,
      keywords: ["all", c.navLabel, "list"],
    });
  }

  docs.push({
    id: `wikihome:${bundle.game.id}`,
    title: `${bundle.game.title} Wiki`,
    url: wikiPath(gameSlug),
    group: "Getting Started",
    summary: `The official ${bundle.game.title} wiki.`,
    keywords: ["wiki", "home", "official"],
  });
  return docs;
}
