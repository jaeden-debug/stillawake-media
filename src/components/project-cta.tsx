import Link from "next/link";

/**
 * "Need help getting started?" band for resource pages: tools, guides and
 * decision pages, which had no route to a project inquiry.
 *
 * Three routes, in the order a reader is usually ready for them: describe the
 * project (the Studio intake, which is the tracked lead conversion), get a
 * price range first (the calculator), or read the published prices. The
 * intake links are picked up by the document-level listener in
 * outbound-tracking.tsx, so no tracking code is needed here.
 */

const COPY = {
  en: {
    eyebrow: "Next step",
    title: "Need help getting started with your project?",
    body: "Tell us what you're building and we'll reply with a plan and a written quote. No sales call needed. Not ready yet? Estimate the cost in a minute, or read our published prices.",
    start: ["Start your project", "https://stillawake.studio/start"],
    estimate: ["Estimate the cost", "/tools/project-cost-calculator"],
    pricing: ["See pricing", "/pricing"],
  },
  fr: {
    eyebrow: "Prochaine étape",
    title: "Besoin d'aide pour démarrer votre projet?",
    body: "Décrivez ce que vous voulez bâtir et nous vous répondrons avec un plan et une soumission écrite, sans appel de vente. Pas encore prêt? Estimez le coût en une minute ou consultez nos tarifs publiés.",
    start: ["Démarrer votre projet", "https://stillawake.studio/fr/demarrer"],
    estimate: ["Estimer le coût", "/fr/outils/calculateur-cout-projet"],
    pricing: ["Voir les tarifs", "/fr/tarifs"],
  },
} as const;

export function ProjectCta({
  locale = "en",
  title,
  body,
  hideEstimate = false,
}: {
  locale?: "en" | "fr";
  /** Override the heading for a page with a more specific next step. */
  title?: string;
  body?: string;
  /** Leave out the calculator button, e.g. on the calculator itself. */
  hideEstimate?: boolean;
}) {
  const t = COPY[locale];
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#D71920]/[0.12] to-white/[0.02] p-7 sm:p-10 md:p-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{t.eyebrow}</p>
        <h2 className="geist mt-4 max-w-3xl text-3xl font-black leading-[1.02] tracking-[-0.05em] md:text-5xl">
          {title ?? t.title}
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#C7B9B9] md:text-base md:leading-8">{body ?? t.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={t.start[1]}
            className="inline-flex items-center gap-2 rounded-full bg-[#D71920] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.start[0]} <span aria-hidden>→</span>
          </Link>
          {!hideEstimate && (
            <Link
              href={t.estimate[1]}
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t.estimate[0]}
            </Link>
          )}
          <Link
            href={t.pricing[1]}
            className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.pricing[0]}
          </Link>
        </div>
      </div>
    </section>
  );
}
