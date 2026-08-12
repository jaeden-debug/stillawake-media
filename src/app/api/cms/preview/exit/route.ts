import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Leaves draft preview: clears the draft-mode cookie and returns home. */

export const runtime = "nodejs";

export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
