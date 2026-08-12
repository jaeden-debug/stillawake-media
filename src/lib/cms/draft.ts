import type { CmsDraftItem } from "./types";

/**
 * Server-to-server draft fetch for preview mode (§54).
 *
 * Calls the .dev writer's guarded endpoint with the shared sync secret. The
 * endpoint contract: GET /api/cms/draft-content?route=<path> with
 * `Authorization: Bearer CMS_SYNC_SECRET` → `{ item }` matching the snapshot
 * shape. Never cached; failures degrade to null (the page then shows a
 * "Draft unavailable" panel instead of crashing preview).
 */
export async function fetchDraftByRoute(route: string): Promise<CmsDraftItem | null> {
  const base = process.env.CMS_ADMIN_URL;
  const secret = process.env.CMS_SYNC_SECRET;
  if (!base || !secret) {
    console.error("[cms] draft fetch skipped: CMS_ADMIN_URL / CMS_SYNC_SECRET not set");
    return null;
  }
  try {
    const url = `${base.replace(/\/+$/, "")}/api/cms/draft-content?route=${encodeURIComponent(route)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`draft-content responded ${res.status}`);
    const json = (await res.json()) as { item?: CmsDraftItem | null };
    return json.item ?? null;
  } catch (err) {
    console.error(`[cms] draft fetch failed for ${route}:`, err instanceof Error ? err.message : err);
    return null;
  }
}
