import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { loadContactRuntimeConfig } from "@/lib/contact/security";
import { REFERRAL_LABELS_EN, type ReferralSource } from "@/lib/contact/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Monday digest of the pipeline.
 *
 * The dev Clients board already shows stalled enquiries, but only if you
 * open it. This makes the pipeline push instead of pull: one email a week
 * listing everyone who asked about a service and never finished
 * onboarding, plus what actually came in.
 *
 * Operator-facing, so English only — nobody but StillAwake reads it.
 */

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const days = (iso: string) =>
  Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);

export async function GET(req: Request) {
  if (!authorized(req)) return Response.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const config = loadContactRuntimeConfig();
  if (!url || !key) return Response.json({ error: "db_not_configured" }, { status: 500 });
  if (!config.resendApiKey || !config.fromEmail || !config.toEmail) {
    return Response.json({ error: "email_not_configured" }, { status: 500 });
  }

  const db = createClient(url, key, { auth: { persistSession: false } });
  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const [stalledRes, newRes, leadsRes] = await Promise.all([
    db
      .from("contact_submissions")
      .select("name,email,service,created_at,followup_sent_at,referral_source")
      .eq("is_project", true)
      .eq("status", "prompted")
      .order("created_at", { ascending: true })
      .limit(50),
    db
      .from("contact_submissions")
      .select("name,service,referral_source,created_at")
      .gte("created_at", weekAgo)
      .order("created_at", { ascending: false })
      .limit(50),
    db
      .from("leads")
      .select("name,company,project_type,submitted_at")
      .neq("status", "draft")
      .gte("submitted_at", weekAgo)
      .limit(50),
  ]);

  const stalled = stalledRes.data ?? [];
  const fresh = newRes.data ?? [];
  const onboarded = leadsRes.data ?? [];

  // Nothing happened and nothing is stuck — don't send a "no news" email.
  if (stalled.length === 0 && fresh.length === 0 && onboarded.length === 0) {
    return Response.json({ sent: false, reason: "nothing_to_report" });
  }

  const adminBase = process.env.ADMIN_APP_URL || "https://stillawakemedia.dev";
  const rows = (items: string[]) =>
    items.map((h) => `<li style="margin:0 0 8px;color:#c7b9b9">${h}</li>`).join("");

  const sections: string[] = [];

  if (stalled.length) {
    sections.push(
      `<h2 style="font-size:15px;color:#ff8f93;margin:24px 0 10px">Awaiting onboarding (${stalled.length})</h2>
       <ul style="padding-left:18px;margin:0">${rows(
         stalled.map(
           (s) =>
             `<strong style="color:#fff">${esc(s.name as string)}</strong> — ${esc(
               s.service as string
             )} · ${days(s.created_at as string)} days · ${
               s.followup_sent_at ? "nudged" : "no nudge yet"
             }`
         )
       )}</ul>`
    );
  }
  if (fresh.length) {
    sections.push(
      `<h2 style="font-size:15px;color:#fff;margin:24px 0 10px">New enquiries this week (${fresh.length})</h2>
       <ul style="padding-left:18px;margin:0">${rows(
         fresh.map(
           (s) =>
             `${esc(s.name as string)} — ${esc(s.service as string)}${
               s.referral_source
                 ? ` · via ${esc(
                     REFERRAL_LABELS_EN[s.referral_source as ReferralSource] ??
                       (s.referral_source as string)
                   )}`
                 : ""
             }`
         )
       )}</ul>`
    );
  }
  if (onboarded.length) {
    sections.push(
      `<h2 style="font-size:15px;color:#8fe3b0;margin:24px 0 10px">Completed onboarding this week (${onboarded.length})</h2>
       <ul style="padding-left:18px;margin:0">${rows(
         onboarded.map(
           (l) =>
             `${esc((l.company as string) || (l.name as string) || "—")} — ${esc(
               (l.project_type as string) || "?"
             )}`
         )
       )}</ul>`
    );
  }

  const html = `<div style="background:#050505;padding:40px 16px;font-family:Inter,system-ui,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#0b0b0b;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;color:#fff">
    <div style="letter-spacing:.3em;font-size:11px;color:#8a8a8a">STILLAWAKE MEDIA</div>
    <h1 style="font-size:21px;font-weight:600;margin:16px 0 4px">This week's pipeline</h1>
    <p style="color:#8a8a8a;font-size:13px;margin:0">${stalled.length} awaiting onboarding · ${fresh.length} new · ${onboarded.length} onboarded</p>
    ${sections.join("")}
    <a href="${adminBase}/admin/clients" style="display:inline-block;margin-top:26px;background:#D71920;color:#fff;font-weight:600;text-decoration:none;padding:13px 24px;border-radius:999px;font-size:14px">Open the pipeline</a>
  </div>
</div>`;

  const resend = new Resend(config.resendApiKey);
  const { error } = await resend.emails.send({
    from: config.fromEmail,
    to: config.toEmail,
    subject: `Pipeline — ${stalled.length} awaiting, ${fresh.length} new`,
    html,
    text: [
      "This week's pipeline",
      `${stalled.length} awaiting onboarding, ${fresh.length} new, ${onboarded.length} onboarded`,
      "",
      ...stalled.map(
        (s) => `AWAITING: ${s.name} — ${s.service} — ${days(s.created_at as string)} days`
      ),
      "",
      `${adminBase}/admin/clients`,
    ].join("\n"),
  });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({
    sent: true,
    stalled: stalled.length,
    new: fresh.length,
    onboarded: onboarded.length,
  });
}
