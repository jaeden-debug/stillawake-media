import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Hub-and-spoke clustering for the French site.
 *
 * Each French article ends with a link to the commercial page that owns its
 * search intent. This module reads those links back out of the markdown and
 * inverts them, so a service page can render its own satellites.
 *
 * Derived rather than hand-maintained on purpose: the article is the single
 * declaration of which pillar it belongs to. Add an article, and its pillar
 * picks it up on the next build — no second list to forget.
 */
export type Satellite = { slug: string; title: string; excerpt: string; category: string };

const dir = path.join(process.cwd(), "src/content/fr/stillawake-times");

/** Matches markdown links to a French commercial page: ](/fr/…) */
const PILLAR_LINK = /\]\((\/fr\/[a-z0-9-]+)\)/g;

/** Articles are satellites, never pillars — a link to another article is a
 *  sibling reference, not a cluster membership. */
function isArticleLink(href: string) {
  return href.startsWith("/fr/articles");
}

let cache: Map<string, Satellite[]> | null = null;

function build(): Map<string, Satellite[]> {
  const map = new Map<string, Satellite[]>();
  if (!fs.existsSync(dir)) return map;

  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, "");

    const pillars = new Set<string>();
    for (const m of content.matchAll(PILLAR_LINK)) {
      if (!isArticleLink(m[1])) pillars.add(m[1]);
    }

    for (const pillar of pillars) {
      const list = map.get(pillar) ?? [];
      list.push({
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        category: data.category || "Stratégie",
      });
      map.set(pillar, list);
    }
  }

  for (const [, list] of map) list.sort((a, b) => a.title.localeCompare(b.title, "fr"));
  return map;
}

/** Satellites for a pillar, e.g. getSatellites("/fr/agence-seo-montreal"). */
export function getSatellites(pillar: string, limit = 6): Satellite[] {
  cache ??= build();
  return (cache.get(pillar) ?? []).slice(0, limit);
}

/** Every pillar that currently has at least one satellite. Used by the audit. */
export function getClusterMap(): Record<string, string[]> {
  cache ??= build();
  return Object.fromEntries(
    [...cache.entries()].map(([pillar, list]) => [pillar, list.map((s) => s.slug)]),
  );
}
