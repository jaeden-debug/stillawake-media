import { gameBundles, type GameBundle } from "@/data/games";
import { projects, projectCategories, projectHref, projectsWithDetailPage } from "@/data/portfolio/projects";
import {
  activeCategories,
  categoryPath,
  entryPath,
  gamePath,
  isPublished,
  publishedEntries,
  wikiPath,
} from "@/lib/games";

/**
 * Generated documentation: the screenshot manifest, the content audit and the
 * route inventory. Built from the same registries the site renders, and
 * checked by game-docs.test.ts, so the docs can't drift from the code.
 * Regenerate with: UPDATE_DOCS=1 npx vitest run src/lib/game-docs.test.ts
 */

export function screenshotManifestJson(bundle: GameBundle): string {
  const assets = Object.values(bundle.media).map((a) => ({
    id: a.id,
    filename: a.filename,
    src: a.src,
    gameId: a.gameId,
    target: a.target,
    description: a.description,
    alt: a.alt,
    use: a.use,
    dimensions: a.dimensions,
    aspectRatio: a.aspectRatio,
    priority: a.priority,
    captureInstructions: a.captureInstructions,
    spoiler: a.spoiler,
    liveAvailability: a.liveAvailability,
    status: a.status,
  }));
  return JSON.stringify({ game: bundle.game.id, generatedFrom: `src/data/games/${bundle.game.id}/media.ts`, assets }, null, 2) + "\n";
}

function targetUrl(bundle: GameBundle, target: string): string {
  if (target.startsWith("/")) return target;
  const e = bundle.wiki.find((x) => x.slug === target);
  return e ? entryPath(bundle.game.slug, e) : target;
}

export function screenshotChecklistMd(bundle: GameBundle): string {
  const rows = Object.values(bundle.media).sort((a, b) => a.priority.localeCompare(b.priority) || a.id.localeCompare(b.id));
  const lines = [
    `# ${bundle.game.title}: screenshot capture checklist`,
    "",
    `Generated from \`src/data/games/${bundle.game.id}/media.ts\`. Do not edit by hand.`,
    "",
    "Rules: real in-game captures only. No development UI unless the note says HUD allowed. No generated or stock images presented as gameplay. Save as WebP at the listed size to the `Path` shown (under `public/`). Then set the asset's status in `media.ts` and the image appears on every page that references it.",
    "",
    `Total: ${rows.length} · P0: ${rows.filter((r) => r.priority === "P0").length} · captured: ${rows.filter((r) => r.status !== "missing").length}`,
    "",
    "| Done | Priority | File | Path | Size | Target page | Spoiler | In build | What to capture | Alt text |",
    "|---|---|---|---|---|---|---|---|---|---|",
    ...rows.map((a) =>
      [
        a.status === "missing" ? "☐" : "☑",
        a.priority,
        `\`${a.filename}\``,
        `\`public${a.src}\``,
        `${a.dimensions.width}×${a.dimensions.height} (${a.aspectRatio})`,
        `\`${targetUrl(bundle, a.target)}\``,
        a.spoiler ? "yes" : "no",
        a.liveAvailability,
        a.captureInstructions.replace(/\|/g, "/"),
        a.alt.replace(/\|/g, "/"),
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"),
    ),
    "",
  ];
  return lines.join("\n");
}

export function contentAuditMd(bundle: GameBundle): string {
  const pub = publishedEntries(bundle);
  const unpub = bundle.wiki.filter((e) => !isPublished(e));
  const withGaps = bundle.wiki.filter((e) => e.gaps?.length);
  const label = (id: string) => bundle.categories.find((c) => c.id === id)?.title ?? id;
  const out = [
    `# ${bundle.game.title} wiki: content audit`,
    "",
    "Generated from the wiki registry. Do not edit by hand.",
    "",
    `- Published (verified_live): **${pub.length}** articles across ${activeCategories(bundle).length} categories`,
    `- Not published: **${unpub.length}** (planned, unverified or deprecated)`,
    `- Articles with recorded gaps: **${withGaps.length}**`,
    `- Last verified: ${bundle.game.lastVerified}`,
    "",
    "## Published articles",
    "",
    "| Category | Article | URL | Spoiler | Last verified |",
    "|---|---|---|---|---|",
    ...pub.map((e) => `| ${label(e.category)} | ${e.title} | \`${entryPath(bundle.game.slug, e)}\` | ${e.spoiler ? "yes" : "no"} | ${e.lastVerified} |`),
    "",
    "## Not published, and why",
    "",
    "| Article | Category | State | What's missing |",
    "|---|---|---|---|",
    ...unpub.map((e) => `| ${e.title} | ${label(e.category)} | ${e.verification} | ${(e.gaps ?? []).join(" ")} |`),
    "",
    "## Gaps inside published articles",
    "",
    "| Article | Gap |",
    "|---|---|",
    ...withGaps.filter(isPublished).flatMap((e) => (e.gaps ?? []).map((g) => `| ${e.title} | ${g} |`)),
    "",
    "## Media",
    "",
    `${Object.values(bundle.media).filter((a) => a.status === "missing").length} of ${Object.values(bundle.media).length} images still to capture. See SCREENSHOT-CHECKLIST.md.`,
    "",
  ];
  return out.join("\n");
}

export function routeInventoryMd(): string {
  const out = [
    "# Route inventory: Our Work and Games",
    "",
    "Generated from the registries. Do not edit by hand. Every URL below is in the sitemap and returns 200.",
    "",
    "## Portfolio",
    "",
    "| URL | Page |",
    "|---|---|",
    "| `/our-work` | Our Work hub (replaces `/portfolio`, which 308-redirects here) |",
    ...projectsWithDetailPage().map((p) => `| \`/our-work/${p.slug}\` | ${p.title} |`),
    "",
    "Projects whose canonical page lives elsewhere (cards link there, and `/our-work/<slug>` redirects):",
    "",
    ...projects.filter((p) => p.canonicalPath).map((p) => `- ${p.title} → \`${projectHref(p)}\``),
    "",
    "## Games",
    "",
    "| URL | Page |",
    "|---|---|",
    "| `/games` | Games hub |",
    "| `/games/guides/roblox-survival-horror-games` | Editorial guide: Roblox survival horror games |",
  ];
  for (const b of gameBundles) {
    out.push(`| \`${gamePath(b.game.slug)}\` | ${b.game.title} landing page |`);
    out.push(`| \`${wikiPath(b.game.slug)}\` | ${b.game.title} wiki home |`);
    for (const c of activeCategories(b)) out.push(`| \`${categoryPath(b.game.slug, c.slug)}\` | Wiki category: ${c.title} |`);
    for (const e of publishedEntries(b)) out.push(`| \`${entryPath(b.game.slug, e)}\` | ${e.title} |`);
  }
  out.push("", "## Portfolio inventory", "", "| Project | Categories | Platforms | Status | Page |", "|---|---|---|---|---|");
  for (const p of projects) {
    const cats = p.categories.map((c) => projectCategories.find((x) => x.id === c)?.label ?? c).join(", ");
    out.push(`| ${p.title} | ${cats} | ${p.platforms.join(", ")} | ${p.status} | \`${projectHref(p)}\` |`);
  }
  out.push("");
  return out.join("\n");
}
