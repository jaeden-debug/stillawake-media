import { isProjectService, type ContactSubmission } from "./schema";

/**
 * The two emails a contact submission produces, and how they differ.
 *
 * A general inquiry or support request is a conversation: the visitor is
 * told a human will reply, and the operator gets a plain notification.
 *
 * A real service is a project: the visitor is handed the Studio onboarding
 * questionnaire, because a message box cannot capture scope, features,
 * timeline, budget or brand — and the operator is told they were prompted,
 * so an empty inbox afterwards is a signal rather than a mystery.
 */

const BRAND = "#D71920";
const BG = "#050505";
const PANEL = "#0b0b0b";

export function studioStartUrl(locale: "en" | "fr" = "en"): string {
  const base = process.env.STUDIO_START_URL || "https://stillawake.studio/start";
  return locale === "fr" ? base.replace(/\/start$/, "/fr/demarrer") : base;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, paragraphs: string[], cta?: { label: string; url: string }) {
  const body = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#c7b9b9">${p}</p>`
    )
    .join("");
  return `<div style="background:${BG};padding:40px 16px;font-family:Inter,system-ui,sans-serif">
  <div style="max-width:520px;margin:0 auto;background:${PANEL};border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;color:#ffffff">
    <div style="letter-spacing:.3em;font-size:11px;color:#8a8a8a">STILLAWAKE MEDIA</div>
    <h1 style="font-size:22px;font-weight:600;margin:18px 0 16px;color:#ffffff">${title}</h1>
    ${body}
    ${
      cta
        ? `<a href="${cta.url}" style="display:inline-block;margin-top:12px;background:${BRAND};color:#fff;font-weight:600;text-decoration:none;padding:14px 26px;border-radius:999px;font-size:15px">${cta.label}</a>`
        : ""
    }
    <p style="margin-top:28px;margin-bottom:0;font-size:11px;color:#5b5b5b">Ambition never sleeps.</p>
  </div>
</div>`;
}

const strip = (s: string) => s.replace(/<[^>]+>/g, "");

export type RenderedEmail = { subject: string; html: string; text: string };

/* ── to the person who wrote in ──────────────────────────────── */

export function clientConfirmation(
  submission: ContactSubmission,
  locale: "en" | "fr" = "en"
): RenderedEmail {
  const fr = locale === "fr";
  const first = submission.name.split(" ")[0] || submission.name;
  const project = isProjectService(submission.service);

  if (!project) {
    // General inquiry / support — reassurance, no funnel.
    const paragraphs = fr
      ? [
          `Merci ${esc(first)} — on a bien reçu votre message.`,
          "Une personne le lit et vous répond dans les plus brefs délais, généralement en moins d'un jour ouvrable.",
          "Si c'est urgent, répondez simplement à ce courriel et il remontera directement.",
        ]
      : [
          `Thanks ${esc(first)} — we've got your message.`,
          "A human is reading it and will get back to you as soon as possible, usually within one business day.",
          "If it's urgent, just reply to this email and it comes straight to us.",
        ];
    return {
      subject: fr ? "On a bien reçu votre message" : "We've got your message",
      html: shell(fr ? "Message reçu." : "Message received.", paragraphs),
      text: [fr ? "Message reçu." : "Message received.", "", ...paragraphs.map(strip)].join("\n"),
    };
  }

  // A real service — hand them the onboarding questionnaire.
  const url = studioStartUrl(locale);
  const paragraphs = fr
    ? [
        `Merci ${esc(first)} — on a bien reçu votre demande concernant <strong>${esc(submission.service)}</strong>.`,
        "Pour vous répondre avec une portée écrite et un prix fixe plutôt qu'un appel de vente, on a besoin d'un peu plus de contexte.",
        "Le formulaire ci-dessous s'adapte à votre projet et prend quelques minutes. Il se sauvegarde à mesure — vous pouvez le reprendre plus tard.",
      ]
    : [
        `Thanks ${esc(first)} — we've got your enquiry about <strong>${esc(submission.service)}</strong>.`,
        "So we can come back with a written scope and a fixed price instead of booking a sales call, we need a little more context.",
        "The form below adapts to your project and takes a few minutes. It saves as you go, so you can finish later.",
      ];
  return {
    subject: fr
      ? "Prochaine étape : décrivez votre projet"
      : "Next step: tell us about your project",
    html: shell(
      fr ? "On a bien reçu votre demande." : "We've got your enquiry.",
      paragraphs,
      { label: fr ? "Décrire mon projet" : "Describe my project", url }
    ),
    text: [
      fr ? "On a bien reçu votre demande." : "We've got your enquiry.",
      "",
      ...paragraphs.map(strip),
      "",
      `${fr ? "Décrire mon projet" : "Describe my project"}: ${url}`,
    ].join("\n"),
  };
}

/* ── to the operator ─────────────────────────────────────────── */

export function operatorNotification(
  submission: ContactSubmission,
  opts: { locale?: "en" | "fr"; contactId?: string } = {}
): RenderedEmail {
  const project = isProjectService(submission.service);
  const adminBase = process.env.ADMIN_APP_URL || "https://stillawakemedia.dev";
  const statusUrl = `${adminBase}/admin/clients${opts.contactId ? `?focus=${opts.contactId}` : ""}`;

  const who = `<strong>${esc(submission.name)}</strong> · ${esc(submission.email)}`;
  const meta = `Reason: ${esc(submission.service)}${opts.locale === "fr" ? " · FR" : ""}`;
  const message = `<span style="color:#e8e0e0">${esc(submission.message).replace(/\n/g, "<br>")}</span>`;

  if (!project) {
    return {
      subject: `${submission.service} — ${submission.name}`,
      html: shell("New message", [who, meta, message]),
      text: [
        "New message",
        "",
        `${submission.name} · ${submission.email}`,
        `Reason: ${submission.service}`,
        "",
        submission.message,
      ].join("\n"),
    };
  }

  return {
    subject: `PROJECT ENQUIRY — ${submission.service} — ${submission.name}`,
    html: shell(
      "New project enquiry",
      [
        who,
        meta,
        message,
        // The important part: they've already been asked for detail, so
        // silence from here is meaningful.
        `<span style="display:inline-block;background:rgba(215,25,32,.14);border:1px solid rgba(215,25,32,.4);border-radius:999px;padding:6px 14px;font-size:13px;color:#ffd7d9">They've been emailed the Studio onboarding form. A follow-up sends automatically in 3 days if they don't complete it.</span>`,
      ],
      { label: "Check status", url: statusUrl }
    ),
    text: [
      "New project enquiry",
      "",
      `${submission.name} · ${submission.email}`,
      `Reason: ${submission.service}`,
      "",
      submission.message,
      "",
      "They've been emailed the Studio onboarding form. A follow-up sends automatically in 3 days if they don't complete it.",
      `Check status: ${statusUrl}`,
    ].join("\n"),
  };
}

/* ── the 3-day nudge ─────────────────────────────────────────── */

export function followUpEmail(
  name: string,
  service: string,
  locale: "en" | "fr" = "en"
): RenderedEmail {
  const fr = locale === "fr";
  const first = name.split(" ")[0] || name;
  const url = studioStartUrl(locale);
  const paragraphs = fr
    ? [
        `Bonjour ${esc(first)} — petit rappel au sujet de votre demande concernant <strong>${esc(service)}</strong>.`,
        "On n'a pas encore reçu les détails de votre projet, alors on ne veut pas vous envoyer un prix approximatif.",
        "Le formulaire prend quelques minutes et se sauvegarde à mesure. Si le moment n'est plus le bon, répondez simplement à ce courriel — aucun souci.",
      ]
    : [
        `Hi ${esc(first)} — a quick nudge about your <strong>${esc(service)}</strong> enquiry.`,
        "We haven't received your project details yet, and we'd rather not send you a guess at a price.",
        "The form takes a few minutes and saves as you go. If the timing has changed, just reply to this email — no problem at all.",
      ];
  return {
    subject: fr ? "Toujours intéressé par votre projet?" : "Still thinking about your project?",
    html: shell(fr ? "On garde votre place." : "Your spot is still open.", paragraphs, {
      label: fr ? "Décrire mon projet" : "Describe my project",
      url,
    }),
    text: [
      fr ? "On garde votre place." : "Your spot is still open.",
      "",
      ...paragraphs.map(strip),
      "",
      `${fr ? "Décrire mon projet" : "Describe my project"}: ${url}`,
    ].join("\n"),
  };
}
