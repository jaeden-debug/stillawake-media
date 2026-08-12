import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Revalidation webhook (§58) called by the .dev writer after a publish.
 *
 * Auth: `Authorization: CMS-HMAC <hex>` where hex = HMAC-SHA256 of the raw
 * request body keyed with CMS_REVALIDATE_SECRET, verified with
 * timingSafeEqual. Body: { paths[], tags[], reason, ts } — rejected when ts
 * is outside a ±5 minute replay window. Fails closed (503) when the secret
 * env is missing.
 */

export const runtime = "nodejs";

const REPLAY_WINDOW_MS = 5 * 60 * 1000;

type RevalidateBody = {
  paths?: unknown;
  tags?: unknown;
  reason?: unknown;
  ts?: unknown;
};

export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!secret) {
    // Fail closed: without the secret nothing can be authenticated.
    return NextResponse.json({ ok: false, error: "revalidate secret not configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization") ?? "";
  const match = /^CMS-HMAC\s+([0-9a-f]+)$/i.exec(auth);
  if (!match) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const rawBody = await request.text();
  const expected = createHmac("sha256", secret).update(rawBody).digest();
  let provided: Buffer;
  try {
    provided = Buffer.from(match[1], "hex");
  } catch {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody;
  try {
    body = JSON.parse(rawBody) as RevalidateBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  const ts = typeof body.ts === "number" ? body.ts : Number(body.ts);
  if (!Number.isFinite(ts) || Math.abs(Date.now() - ts) > REPLAY_WINDOW_MS) {
    return NextResponse.json({ ok: false, error: "stale or missing ts" }, { status: 401 });
  }

  const tags = Array.isArray(body.tags)
    ? body.tags.filter((tag): tag is string => typeof tag === "string" && tag.length > 0)
    : [];
  const paths = Array.isArray(body.paths)
    ? body.paths.filter((path): path is string => typeof path === "string" && path.startsWith("/"))
    : [];

  // Next 16 requires a cacheLife profile; "max" = expire the tag now,
  // regardless of how long the cached entries were allowed to live.
  for (const tag of tags) revalidateTag(tag, "max");
  for (const path of paths) revalidatePath(path);

  console.log(
    `[cms] revalidated ${tags.length} tag(s), ${paths.length} path(s) — reason: ${
      typeof body.reason === "string" ? body.reason : "unspecified"
    }`,
  );

  return NextResponse.json({ ok: true, revalidated: { paths, tags } });
}
