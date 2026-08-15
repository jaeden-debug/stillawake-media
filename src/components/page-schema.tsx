import { PAGE_SCHEMA } from "@/data/page-schema-map";
import { buildPageSchema, type PageSchemaInput } from "@/lib/page-schema";
import { siteUrl } from "@/lib/data";

/**
 * Same JSON-LD, for routes generated at build time rather than listed in the
 * registry. The registry is keyed by literal route and cannot describe a
 * `[platform]` segment, so programmatic pages pass their own input — derived
 * from the same record that produced the page, which keeps the two in step.
 */
export function InlinePageSchema({ input }: { input: PageSchemaInput }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPageSchema(input)) }}
    />
  );
}

/**
 * Drops the page-level JSON-LD for a route.
 *
 * The page passes only its route; everything else lives in the registry so
 * the whole site's structured data can be reviewed in one file. A route with
 * no entry renders nothing rather than throwing — a missing entry should not
 * take a page down.
 */
export function PageSchema({ route }: { route: string }) {
  const entry = PAGE_SCHEMA[route];
  if (!entry) return null;

  // "/" keeps its slash to match the canonical; every other route drops it.
  const url = route === "/" ? `${siteUrl}/` : `${siteUrl}${route.replace(/\/$/, "")}`;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildPageSchema({ ...entry, url })),
      }}
    />
  );
}
