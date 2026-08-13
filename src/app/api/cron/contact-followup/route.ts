import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { followUpEmail } from "@/lib/contact/emails";
import { loadContactRuntimeConfig } from "@/lib/contact/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The 3-day nudge.
 *
 * Someone asked about a real service, was emailed the Studio onboarding
 * form, and never filled it in. Rather than let that go quiet, we send the
 * same link once more.
 *
 * Rules that keep it from becoming spam:
 *   - project enquiries only (general/support never enter this sequence)
 *   - at least 3 days old
 *   - still `prompted` — anyone who completed onboarding is `onboarded`
 *     and excluded
 *   - `followup_sent_at` is stamped, so it fires exactly once, ever
 *   - a matching submitted studio lead (by email) short-circuits it even
 *     if the status hasn't been reconciled yet
 */

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
const BATCH = 25;

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // Vercel Cron signs requests with CRON_SECRET; allow a manual bearer too.
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const config = loadContactRuntimeConfig();
  if (!url || !key) return Response.json({ error: "db_not_configured" }, { status: 500 });
  if (!config.resendApiKey || !config.fromEmail) {
    return Response.json({ error: "email_not_configured" }, { status: 500 });
  }

  const db = createClient(url, key, { auth: { persistSession: false } });
  const cutoff = new Date(Date.now() - THREE_DAYS_MS).toISOString();

  const { data: due, error } = await db
    .from("contact_submissions")
    .select("id,name,email,service,language,created_at")
    .eq("is_project", true)
    .eq("status", "prompted")
    .is("followup_sent_at", null)
    .lt("created_at", cutoff)
    .order("created_at", { ascending: true })
    .limit(BATCH);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  if (!due?.length) return Response.json({ checked: 0, sent: 0 });

  // Anyone who has already submitted studio discovery is done, whatever
  // their contact row says.
  const emails = due.map((d) => (d.email as string).toLowerCase());
  const { data: existing } = await db
    .from("leads")
    .select("email,status")
    .in("email", emails)
    .neq("status", "draft");
  const onboarded = new Set(
    (existing ?? []).map((l) => (l.email as string)?.toLowerCase()).filter(Boolean)
  );

  const resend = new Resend(config.resendApiKey);
  let sent = 0;
  let skipped = 0;

  for (const row of due) {
    const email = (row.email as string).toLowerCase();
    if (onboarded.has(email)) {
      await db
        .from("contact_submissions")
        .update({ status: "onboarded", followup_sent_at: new Date().toISOString() })
        .eq("id", row.id);
      skipped++;
      continue;
    }

    const locale = row.language === "fr" ? "fr" : "en";
    const mail = followUpEmail(row.name as string, row.service as string, locale);
    try {
      const { error: sendErr } = await resend.emails.send({
        from: config.fromEmail,
        to: row.email as string,
        replyTo: config.toEmail ?? config.fromEmail,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
      if (sendErr) throw new Error(sendErr.message);
      // Stamp only after a successful send, so a failure retries tomorrow
      // rather than silently burning the one nudge this contact gets.
      await db
        .from("contact_submissions")
        .update({ followup_sent_at: new Date().toISOString() })
        .eq("id", row.id);
      sent++;
    } catch (e) {
      console.warn(`[contact-followup] ${row.id} failed`, e);
    }
  }

  return Response.json({ checked: due.length, sent, alreadyOnboarded: skipped });
}
