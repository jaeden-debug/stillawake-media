import Link from "next/link";

import { getStripe } from "@/lib/stripe/client";

/**
 * The page Stripe returns a buyer to.
 *
 * It retrieves the session rather than assuming success. Landing on this URL
 * proves only that a redirect happened — a visitor can type it, a back button
 * can replay it, and some payment methods return here while still processing.
 * Telling someone their payment succeeded when it is `unpaid` is the worst
 * possible thing this page could do, so status decides the copy.
 *
 * Deliberately NOT a fulfilment hook. If provisioning is ever automated it
 * belongs on the `checkout.session.completed` webhook, which fires whether or
 * not the browser ever comes back.
 */

type Status = "paid" | "processing" | "open" | "unknown";

const COPY = {
  en: {
    paid: {
      eyebrow: "Payment received",
      title: "You're set. Check your email.",
      body: "Stripe has emailed your receipt. We've been notified and will be in touch within one business day to get started — nothing else is needed from you right now.",
    },
    processing: {
      eyebrow: "Payment processing",
      title: "Almost there — your payment is still clearing.",
      body: "Some payment methods take a little longer to confirm. You'll get an emailed receipt the moment it settles, and we'll pick it up from there. No need to pay again.",
    },
    open: {
      eyebrow: "Not completed",
      title: "That checkout wasn't finished.",
      body: "Nothing has been charged. You can start again from the pricing page, or get in touch and we'll send an invoice instead.",
    },
    unknown: {
      eyebrow: "Checkout",
      title: "We couldn't confirm that session.",
      body: "If you completed a payment, your emailed receipt is the record — nothing is lost. Get in touch and we'll confirm it by hand.",
    },
    pricing: "Back to pricing",
    contact: "Contact us",
  },
  fr: {
    paid: {
      eyebrow: "Paiement reçu",
      title: "C'est fait. Vérifiez vos courriels.",
      body: "Stripe vous a envoyé votre reçu. Nous avons été avisés et vous écrirons d'ici un jour ouvrable pour commencer — rien d'autre n'est requis de votre part.",
    },
    processing: {
      eyebrow: "Paiement en traitement",
      title: "Presque — votre paiement est encore en traitement.",
      body: "Certains modes de paiement prennent un peu plus de temps à confirmer. Vous recevrez le reçu par courriel dès que ce sera réglé, et on prend le relais. Inutile de payer à nouveau.",
    },
    open: {
      eyebrow: "Non complété",
      title: "Ce paiement n'a pas été complété.",
      body: "Rien n'a été facturé. Vous pouvez recommencer depuis la page des tarifs, ou nous écrire et on vous enverra plutôt une facture.",
    },
    unknown: {
      eyebrow: "Paiement",
      title: "Nous n'avons pas pu confirmer cette session.",
      body: "Si vous avez complété un paiement, le reçu reçu par courriel fait foi — rien n'est perdu. Écrivez-nous et on le confirmera à la main.",
    },
    pricing: "Retour aux tarifs",
    contact: "Nous écrire",
  },
} as const;

async function resolveStatus(sessionId: string | undefined): Promise<Status> {
  if (!sessionId) return "unknown";
  const stripe = getStripe();
  if (!stripe) return "unknown";
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid" || session.payment_status === "no_payment_required") {
      return "paid";
    }
    if (session.status === "complete") return "processing";
    return "open";
  } catch {
    /* A forged or expired id lands here. "unknown" is the honest answer — it
       neither confirms a payment nor tells a stranger the id was invalid. */
    return "unknown";
  }
}

export async function CheckoutComplete({
  sessionId,
  locale,
}: {
  sessionId?: string;
  locale: "en" | "fr";
}) {
  const status = await resolveStatus(sessionId);
  const t = COPY[locale];
  const panel = t[status];

  return (
    <main className="bg-black pt-28 text-white">
      <section className="px-6 pb-24 pt-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">{panel.eyebrow}</p>
          <h1 className="text-4xl font-semibold leading-[1.1] md:text-5xl">{panel.title}</h1>
          <p className="mt-8 text-lg leading-8 text-white/70">{panel.body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={locale === "fr" ? "/fr/tarifs" : "/pricing"}
              className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40"
            >
              {t.pricing}
            </Link>
            <Link
              href={locale === "fr" ? "/fr/contact" : "/contact"}
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90"
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
