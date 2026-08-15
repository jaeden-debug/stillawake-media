"use client";

import { useState } from "react";

/**
 * Starts a Stripe Checkout session for one catalogue item.
 *
 * It posts an ID, never a price. The amount is resolved server-side from the
 * Stripe catalogue, so nothing this component sends — or that anyone edits in
 * devtools before it sends — can change what is charged.
 *
 * Failure is shown in place rather than thrown away. The one thing a buy
 * button must never do is look like it worked: if the session cannot be
 * created, the visitor gets the reason and a way to reach a human.
 */
export function BuyButton({
  item,
  label,
  locale = "en",
  variant = "solid",
}: {
  item: string;
  label: string;
  locale?: "en" | "fr";
  variant?: "solid" | "outline";
}) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const copy =
    locale === "fr"
      ? { loading: "Redirection…", fallback: "Impossible de démarrer le paiement.", contact: "Nous écrire" }
      : { loading: "Redirecting…", fallback: "Couldn't start checkout.", contact: "Contact us" };

  async function start() {
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, locale }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setState("error");
        setMessage(data.error ?? copy.fallback);
        return;
      }
      /* Full navigation, not router.push — Checkout is on Stripe's origin. */
      window.location.assign(data.url);
    } catch {
      setState("error");
      setMessage(copy.fallback);
    }
  }

  const base =
    "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition disabled:opacity-60";
  const skin =
    variant === "outline"
      ? "border border-white/15 hover:border-[#D71920]/60"
      : "bg-[#D71920] hover:opacity-90";

  return (
    <div>
      <button type="button" onClick={start} disabled={state === "loading"} className={`${base} ${skin}`}>
        {state === "loading" ? copy.loading : label}
      </button>
      {state === "error" && message && (
        <p className="mt-3 text-sm text-[#D71920]">
          {message}{" "}
          <a
            href={locale === "fr" ? "/fr/contact" : "/contact"}
            className="underline underline-offset-4"
          >
            {copy.contact}
          </a>
        </p>
      )}
    </div>
  );
}
