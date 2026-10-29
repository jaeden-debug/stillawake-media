import { siteUrl } from "@/lib/data";
import { getAllPosts } from "@/lib/content";
import { projects, projectCategories, projectHref } from "@/data/portfolio/projects";
import { gameBundles } from "@/data/games";
import { comparisonGuides } from "@/data/games/guides";
import {
  activeCategories,
  entriesInCategory,
  entryPath,
  entryText,
  gamePath,
  plainText,
  wikiPath,
} from "@/lib/games";

/**
 * The machine-readable index of everything published: projects, games, wiki
 * articles and editorial articles.
 *
 * llms.txt carries the map (one line per page); llms-full.txt carries the
 * text. Both are built from the same registries the pages render from, so a
 * new project, wiki entry or article appears here the moment it is published,
 * and unpublished content never does.
 */

const abs = (path: string) => (path.startsWith("http") ? path : `${siteUrl}${path}`);
const label = (id: string) => projectCategories.find((c) => c.id === id)?.label ?? id;

export function projectsSection(): string {
  return [
    "## Our Work (every project)",
    "",
    ...projects.map(
      (p) =>
        `- [${p.title}](${abs(projectHref(p))}): ${p.summary} (${p.categories.map(label).join(", ")}; ${p.platforms.join(", ")}${p.status !== "live" ? `; ${p.status === "beta" ? "beta" : "in development"}` : ""})${p.externalUrl ? ` Live: ${p.externalUrl}` : ""}${p.caseStudyPath ? ` Case study: ${abs(p.caseStudyPath)}` : ""}`,
    ),
  ].join("\n");
}

export function gamesSection(): string {
  const out: string[] = ["## Games published by StillAwake Media", ""];
  for (const { game, ...bundle } of gameBundles) {
    out.push(
      `### ${game.title}`,
      "",
      `${game.summary} Tagline: "${game.tagline}"`,
      "",
      `- Official page: ${abs(gamePath(game.slug))}`,
      `- Official wiki: ${abs(wikiPath(game.slug))}`,
      `- Platform: ${game.platforms.join(", ")}. Genre: ${game.genre.join(", ")}. Developer and publisher: ${game.developer}.`,
      `- Status: ${game.statusNote}`,
      ...(game.officialUrl ? [`- Roblox page: ${game.officialUrl}`] : []),
      "",
    );
    const b = { game, ...bundle };
    for (const c of activeCategories(b)) {
      out.push(`#### ${game.title} wiki: ${c.title}`, "");
      for (const e of entriesInCategory(b, c.id)) {
        out.push(`- [${e.title}](${abs(entryPath(game.slug, e))}): ${e.description}`);
      }
      out.push("");
    }
  }
  out.push(`### Guides`, "", ...comparisonGuides.map((g) => `- [${g.title}](${abs(g.path)}): figures from Roblox's public listings, ${g.snapshotDate}.`));
  return out.join("\n");
}

export function articlesSection(): string {
  const en = getAllPosts("en");
  const fr = getAllPosts("fr");
  return [
    "## Articles (The StillAwake Times)",
    "",
    ...en.map((p) => `- [${p.title}](${abs(`/stillawake-times/${p.slug}`)}): ${p.excerpt}`),
    "",
    "## Articles en français",
    "",
    ...fr.map((p) => `- [${p.title}](${abs(`/fr/articles/${p.slug}`)}): ${p.excerpt}`),
  ].join("\n");
}

/** The full text of every project and published wiki article. */
export function fullText(): string {
  const out: string[] = [];
  out.push("# StillAwake Media: full text of projects and game documentation", "");
  out.push(
    "Generated from the site's published content. Every section names its canonical URL; cite that URL. Game documentation describes the most recently checked build of each released game and carries the date it was last checked.",
    "",
  );

  out.push("## Projects", "");
  for (const p of projects) {
    out.push(
      `### ${p.title}`,
      `URL: ${abs(projectHref(p))}`,
      `Type: ${p.kind}. Categories: ${p.categories.map(label).join(", ")}. Platforms: ${p.platforms.join(", ")}. Status: ${p.status}.`,
      "",
      ...p.description,
      "",
      `Highlights: ${p.highlights.join("; ")}.`,
      ...(p.externalUrl ? [`Live site: ${p.externalUrl}`] : []),
      ...(p.caseStudyPath ? [`Case study: ${abs(p.caseStudyPath)}`] : []),
      "",
    );
  }

  for (const { game, ...bundle } of gameBundles) {
    const b = { game, ...bundle };
    out.push(`## ${game.title}`, `URL: ${abs(gamePath(game.slug))}`, "", ...game.description, "", `Status: ${game.statusNote}`, "");
    out.push("Features:", ...game.features.map((f) => `- ${f.title}: ${f.body}`), "");
    for (const c of activeCategories(b)) {
      for (const e of entriesInCategory(b, c.id)) {
        out.push(`### ${e.title}`, `URL: ${abs(entryPath(game.slug, e))}`, `Section: ${c.title}. Last checked: ${e.lastVerified}.${e.spoiler ? " Contains story spoilers." : ""}`);
        if (e.question) out.push(`Question: ${e.question}`);
        out.push("", entryText(e), "");
        if (e.facts?.length) out.push(`Facts: ${e.facts.map(([k, v]) => `${k}: ${plainText(v)}`).join("; ")}.`, "");
        out.push(`Sources: ${e.sources.join("; ")}.`, "");
      }
    }
  }
  return out.join("\n");
}
