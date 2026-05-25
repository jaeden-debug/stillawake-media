"use client";

import { useState } from "react";
import { InternalLinks, Section } from "@/components/site";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [notice, setNotice] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("sending");
    setNotice("Sending your message...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        service: formData.get("service"),
        message: formData.get("message"),
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      setStatus("sent");
      setNotice("Message sent. We’ll review it shortly.");
      form.reset();
      return;
    }

    setStatus("error");
    setNotice(data.error || "Message failed to send.");
  }

  return (
    <main className="pt-28">
      <Section eyebrow="Contact" title="Start building.">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xl leading-9 text-[#C7B9B9]">
              Tell us what you want to build: a premium website, stronger brand,
              SEO growth system, AI automation, software tool, or complete digital infrastructure upgrade.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass grid gap-4 rounded-[2rem] p-6">
            <input name="name" required className="rounded-2xl border border-white/10 bg-black/40 p-4" placeholder="Name" />
            <input name="email" type="email" required className="rounded-2xl border border-white/10 bg-black/40 p-4" placeholder="Email" />

            <select name="service" className="rounded-2xl border border-white/10 bg-black/40 p-4" defaultValue="Website">
              <option>Website</option>
              <option>SEO</option>
              <option>Branding</option>
              <option>AI automation</option>
              <option>Software/App</option>
              <option>Shopify</option>
            </select>

            <textarea name="message" required className="min-h-36 rounded-2xl border border-white/10 bg-black/40 p-4" placeholder="What are you building?" />

            <button disabled={status === "sending"} className="rounded-full bg-[#D71920] px-6 py-4 font-bold disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Request Free Audit"}
            </button>

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
          </form>
        </div>
      </Section>

    </main>
  );
}
