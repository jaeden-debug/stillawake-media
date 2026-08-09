import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { handleContactRequest, methodNotAllowedResponse } from "@/lib/contact/handler";
import { loadContactRuntimeConfig } from "@/lib/contact/security";
import type { ContactSubmission } from "@/lib/contact/schema";

export const runtime = "nodejs";

function safeSubjectName(name: string) {
  return name.replace(/[\r\n]+/gu, " ").slice(0, 100);
}

async function sendNotification(submission: ContactSubmission) {
  const config = loadContactRuntimeConfig();
  if (!config.resendApiKey || !config.fromEmail || !config.toEmail) {
    throw new Error("email_not_configured");
  }

  const resend = new Resend(config.resendApiKey);
  const { error } = await resend.emails.send({
    from: config.fromEmail,
    to: config.toEmail,
    replyTo: submission.email,
    subject: `New StillAwake Media inquiry from ${safeSubjectName(submission.name)}`,
    text: `Name: ${submission.name}\nEmail: ${submission.email}\nService: ${submission.service}\n\nMessage:\n${submission.message}`,
  });
  if (error) throw new Error("resend_failed");
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
