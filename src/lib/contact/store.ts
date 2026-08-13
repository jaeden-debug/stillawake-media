import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isProjectService, type ContactSubmission } from "./schema";

/**
 * Persistence for contact submissions.
 *
 * The form used to only send an email, which meant no follow-up was
 * possible and nothing could be measured. Rows here are the "cold lead"
 * tier; the dev admin joins them to studio `leads` (warm) and `workspaces`
 * (clients).
 *
 * Storage is best-effort by design: if the database is unreachable the
 * visitor still gets their confirmation and the operator still gets the
 * notification. Losing a row is bad; losing the enquiry is worse.
 */

let client: SupabaseClient | null = null;

function sb(): SupabaseClient | null {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export async function recordSubmission(
  submission: ContactSubmission,
  locale: "en" | "fr" = "en"
): Promise<string | null> {
  const db = sb();
  if (!db) return null;
  const project = isProjectService(submission.service);
  const { data, error } = await db
    .from("contact_submissions")
    .insert({
      name: submission.name,
      email: submission.email,
      service: submission.service,
      is_project: project,
      message: submission.message,
      language: locale,
      project_reference: submission.projectReference || null,
      // A project enquiry is "prompted" the moment we email them the form.
      status: project ? "prompted" : "new",
    })
    .select("id")
    .maybeSingle();
  if (error) {
    console.warn(`[contact] could not record submission: ${error.message}`);
    return null;
  }
  return (data?.id as string) ?? null;
}
