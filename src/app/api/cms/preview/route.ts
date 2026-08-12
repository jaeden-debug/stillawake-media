import { jwtVerify } from "jose";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Draft preview entry (§54): GET ?token=&to=
 *
 * The token is an HS256 JWT signed with CMS_PREVIEW_SECRET by the .dev
 * writer; its payload must carry purpose "cms-preview" and route === to.
 * Success enables draft mode (per-visitor cookie) and redirects to the
 * previewed route. Anything invalid gets a page-less 401.
 */

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const to = url.searchParams.get("to");
  const secret = process.env.CMS_PREVIEW_SECRET;

  // `to` must be a site-relative path — never an open redirect.
  if (!token || !to || !to.startsWith("/") || to.startsWith("//") || !secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
    });
    if (payload.purpose !== "cms-preview" || payload.route !== to) {
      return new Response("Unauthorized", { status: 401 });
    }
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }

  (await draftMode()).enable();
  redirect(to);
}
