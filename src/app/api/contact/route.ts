import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { handleContactRequest, methodNotAllowedResponse } from "@/lib/contact/handler";
import { loadContactRuntimeConfig } from "@/lib/contact/security";
import type { ContactSubmission } from "@/lib/contact/schema";
import { clientConfirmation, operatorNotification } from "@/lib/contact/emails";
import { recordSubmission } from "@/lib/contact/store";

export const runtime = "nodejs";

function safeSubjectName(name: string) {
  return name.replace(/[\r\n]+/gu, " ").slice(0, 100);
}

/**
 * Two emails per submission, branching on whether the visitor picked a
 * real service:
 *   - the operator always gets a notification (project enquiries say so,
 *     and link to the pipeline)
 *   - the visitor always gets a confirmation (a project enquiry carries
 *     the Studio onboarding CTA; a general/support one just reassures)
 *
 * The operator notification is the one that must not fail — the visitor
 * confirmation is best-effort, because a missing receipt is recoverable
 * and a lost enquiry is not.
 */
async function sendNotification(submission: ContactSubmission) {
  const config = loadContactRuntimeConfig();
  if (!config.resendApiKey || !config.fromEmail || !config.toEmail) {
    throw new Error("email_not_configured");
  }

  const locale = submission.locale;
  const contactId = await recordSubmission(submission, locale);

  const resend = new Resend(config.resendApiKey);
  const operator = operatorNotification(submission, { locale, contactId: contactId ?? undefined });
  const { error } = await resend.emails.send({
    from: config.fromEmail,
    to: config.toEmail,
    replyTo: submission.email,
    subject: `${operator.subject} — ${safeSubjectName(submission.name)}`,
    html: operator.html,
    text: operator.text,
  });
  if (error) throw new Error("resend_failed");

  try {
    const client = clientConfirmation(submission, locale);
    await resend.emails.send({
      from: config.fromEmail,
      to: submission.email,
      replyTo: config.toEmail,
      subject: client.subject,
      html: client.html,
      text: client.text,
    });
  } catch (e) {
    console.warn("[contact] confirmation to visitor failed", e);
  }
}

export async function POST(request: Request) {
  return handleContactRequest(request, {
    config: loadContactRuntimeConfig(),
    checkBot: async () => !(await checkBotId()).isBot,
    sendNotification,
  });
}

export async function GET() {
  return methodNotAllowedResponse();
}

export async function PUT() {
  return methodNotAllowedResponse();
}

export async function PATCH() {
  return methodNotAllowedResponse();
}

export async function DELETE() {
  return methodNotAllowedResponse();
}

export async function OPTIONS() {
  return methodNotAllowedResponse();
}
