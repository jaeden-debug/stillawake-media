"use client";

import { useRef, useState } from "react";
import { CONTACT_SERVICES } from "@/lib/contact/schema";
import { acquireSubmissionLock } from "@/lib/contact/submission-lock";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
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
    setNotice("Sending your message...");

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
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (response.ok) {
        setStatus("sent");
        setNotice("Message sent. We’ll review it shortly.");
        form.reset();
        refreshTimingSignal();
        return;
      }

      setStatus("error");
      setNotice(data.error || "Message failed to send. Please try again.");
      refreshTimingSignal();
    } catch {
      setStatus("error");
      setNotice("Message failed to send. Please check your connection and try again.");
      refreshTimingSignal();
    } finally {
      submissionLock.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass relative grid gap-4 rounded-[2rem] p-6">
      <label className="grid gap-2">
        <span className="text-sm text-[#C7B9B9]">Name</span>
        <input
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#C7B9B9]">Email</span>
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
        <span className="text-sm text-[#C7B9B9]">Service</span>
        <select
          name="service"
          className="rounded-2xl border border-white/10 bg-black/40 p-4"
          defaultValue="Website"
        >
          {CONTACT_SERVICES.map((service) => <option key={service}>{service}</option>)}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#C7B9B9]">What are you building?</span>
        <textarea
          name="message"
          required
          maxLength={5_000}
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
        {status === "sending" ? "Sending..." : "Request Free Audit"}
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
