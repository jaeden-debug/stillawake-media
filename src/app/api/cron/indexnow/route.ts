import sitemap from "@/app/sitemap";
import { recentlyChanged, submitToIndexNow } from "@/lib/indexnow";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily IndexNow push.
 *
 * Reads the same sitemap search engines read and submits every URL whose
 * lastmod falls in the last two days: new wiki articles, new projects, new
 * CMS posts and edited pages all reach Bing within a day of going live,
 * with no one remembering to submit them. The two-day window overlaps the
 * daily schedule, so a missed run still catches up.
 */

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) return Response.json({ error: "unauthorized" }, { status: 401 });

  const urls = recentlyChanged(await sitemap(), 2);
  if (!urls.length) return Response.json({ submitted: 0, note: "nothing changed in the last 2 days" });

  const result = await submitToIndexNow(urls);
  return Response.json({ ...result, urls });
}
