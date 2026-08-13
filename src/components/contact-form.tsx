"use client";

import { useRef, useState } from "react";
import {
  CONTACT_SERVICES,
  REFERRAL_LABELS_EN,
  REFERRAL_LABELS_FR,
  REFERRAL_SOURCES,
  SERVICE_LABELS_FR,
} from "@/lib/contact/schema";
import { acquireSubmissionLock } from "@/lib/contact/submission-lock";
import { trackContactSubmit } from "@/lib/analytics";

type Status = "idle" | "sending" | "sent" | "error";

type FormLabels = {
  name: string; email: string; service: string; message: string;
  messagePlaceholder: string; submit: string; sending: string;
  sent: string; failed: string;
  referral: string; referralSkip: string;
  serviceLabels?: Record<string, string>;
  referralLabels?: Record<string, string>;
};
const EN_LABELS: FormLabels = {
  name: "Name", email: "Email", service: "Reason for contact", message: "Message",
  messagePlaceholder: "Tell us what you need.",
  // No longer "Request Free Audit": this form is a conversation, and a real
  // project is handed to the Studio onboarding questionnaire instead.
  submit: "Send message",
  sending: "Sending...", sent: "Message sent. Check your inbox — we’ve sent you a confirmation.",
  failed: "Message failed to send. Please try again.",
  referral: "How did you find us?", referralSkip: "Rather not say",
  referralLabels: REFERRAL_LABELS_EN,
};
export const FR_LABELS: FormLabels = {
  name: "Nom", email: "Courriel", service: "Motif du contact", message: "Message",
  messagePlaceholder: "Dites-nous ce dont vous avez besoin.",
  submit: "Envoyer le message",
  sending: "Envoi en cours...", sent: "Message envoyé. Vérifiez votre boîte de réception — une confirmation vous attend.",
  failed: "L'envoi a échoué. Veuillez réessayer.",
  referral: "Comment nous avez-vous trouvés?", referralSkip: "Je préfère ne pas le dire",
  serviceLabels: SERVICE_LABELS_FR,
  referralLabels: REFERRAL_LABELS_FR,
};

export function ContactForm({
  labels = EN_LABELS,
  locale = "en",
}: { labels?: FormLabels; locale?: "en" | "fr" } = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const submissionLock = useRef(false);

  function refreshTimingSignal() {
    setFormStartedAt(Date.now());
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acquireSubmissionLock(submissionLock)) return;
    setStatus("sending");
    setNotice(labels.sending);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          service: formData.get("service"),
          message: formData.get("message"),
          projectReference: formData.get("projectReference"),
          formStartedAt,
          locale,
          referralSource: formData.get("referralSource") || "",
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (response.ok) {
        setStatus("sent");
        setNotice(labels.sent);
        // PRIMARY conversion. Fired only on a 200 from the API, after the
        // server has accepted and stored the enquiry — not on click, and not
        // on a failed submit, so the count matches real rows.
        trackContactSubmit(String(formData.get("service") ?? "unknown"), locale);
        form.reset();
        refreshTimingSignal();
        return;
      }

      setStatus("error");
      setNotice(data.error || labels.failed);
      refreshTimingSignal();
    } catch {
      setStatus("error");
      setNotice(labels.failed);
      refreshTimingSignal();
    } finally {
      submissionLock.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass relative grid gap-4 rounded-[2rem] p-6">
      <label className="grid gap-2">
        <span className="text-sm text-[#C7B9B9]">{labels.name}</span>
        <input
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#C7B9B9]">{labels.email}</span>
        <input
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#C7B9B9]">{labels.service}</span>
        <select
          name="service"
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
          // Defaults to General inquiry: this form is for talking to us.
          // Picking a real service routes them into Studio onboarding.
          defaultValue="General inquiry"
        >
          {CONTACT_SERVICES.map((service) => (
            <option key={service} value={service}>
              {labels.serviceLabels?.[service] ?? service}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#C7B9B9]">{labels.referral}</span>
        <select
          name="referralSource"
          defaultValue=""
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
        >
          {/* Optional: attribution must never be a barrier to enquiring. */}
          <option value="">{labels.referralSkip}</option>
          {REFERRAL_SOURCES.map((s) => (
            <option key={s} value={s}>
              {(labels.referralLabels ?? REFERRAL_LABELS_EN)[s]}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#C7B9B9]">{labels.message}</span>
        <textarea
          name="message"
          required
          maxLength={5_000}
          placeholder={labels.messagePlaceholder}
          className="min-h-36 rounded-2xl border border-white/10 bg-black/40 p-4"
        />
      </label>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="projectReference">Project reference</label>
        <input
          id="projectReference"
          name="projectReference"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[#D71920] px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? labels.sending : labels.submit}
      </button>

      <div aria-live="polite" aria-atomic="true">
        {notice && (
          <p className={`rounded-2xl border p-4 text-sm ${
            status === "sent"
              ? "border-white/10 bg-white/5 text-[#C7B9B9]"
              : status === "error"
                ? "border-[#D71920]/40 bg-[#D71920]/10 text-white"
                : "border-white/10 bg-white/5 text-[#C7B9B9]"
          }`}>
            {notice}
          </p>
        )}
      </div>
    </form>
  );
}
