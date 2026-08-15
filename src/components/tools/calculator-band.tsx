import Link from "next/link";

import { estimate } from "@/lib/pricing/engine";
import { formatCad, type Locale } from "@/lib/pricing/labels";
import { MINIMUM } from "@/lib/pricing/model";
import { mapAnswers } from "@/lib/pricing/public-flow";

/**
 * Homepage entry point to the cost calculator.
 *
 * The figures come from the pricing model rather than from copy, so the
 * homepage can never quietly disagree with what the calculator returns — the
 * exact failure that had a retired plan name live on the SEO article for
 * months. Change a price and this band changes with it.
 *
 * Deliberately shows the ENTRY price and the typical band together. The floor
 * alone reads as bait; the typical range alone reads as expensive. Together
 * they tell the truth: it starts here, most projects land there.
 */

const COPY = {
  en: {
    eyebrow: "Pricing, before you ask",
    title: "Find out what your project costs. Right now, without talking to anyone.",
    body: "Six questions in plain language — no jargon, no email, nothing stored. It runs the same pricing model we scope real work with, so the range you get is the range we would start from.",
    from: "Websites start at",
    typical: "A full business site with local search",
    cta: "Get your estimate",
    note: "Free · no signup · under a minute",
  },
  fr: {
    eyebrow: "Les prix, avant même de demander",
    title: "Découvrez ce que coûte votre projet. Tout de suite, sans parler à personne.",
    body: "Six questions en langage clair — sans jargon, sans courriel, rien n'est conservé. L'outil utilise le même modèle tarifaire qu'on emploie pour chiffrer de vrais mandats.",
    from: "Les sites web partent de",
    typical: "Un site d'entreprise complet avec référencement local",
    cta: "Obtenir votre estimation",
    note: "Gratuit · sans inscription · moins d'une minute",
  },
} as const;

export function CalculatorBand({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  const href =
    locale === "fr" ? "/fr/outils/calculateur-cout-projet" : "/tools/project-cost-calculator";

  /* The archetype, priced by RUNNING THE CALCULATOR rather than quoting a
     number beside it. Anything less and the homepage can promise "with local
     search" while showing a figure that excludes it — which is exactly the
     drift that left a retired plan name live on an article for months. */
  const archetype = estimate(
    mapAnswers({
      goal: "new_website",
      needs: ["explain", "leads", "found_local"],
      content: "ready",
      size: "standard",
    }),
  );

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.015] p-7 sm:p-10 md:p-14">
          {/* One soft light source. Decorative only. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-0 h-64 w-[32rem] rounded-full bg-[#D71920]/10 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{t.eyebrow}</p>
              <h2 className="geist mt-5 text-[1.9rem] font-black leading-[1.08] tracking-[-0.05em] sm:text-4xl md:text-5xl">
                {t.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#C7B9B9] md:text-base md:leading-8">
                {t.body}
              </p>
              <Link
                href={href}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.cta}
                <span aria-hidden>→</span>
              </Link>
              <p className="mt-3 text-xs text-[#8C8080]">{t.note}</p>
            </div>

            {/* The two numbers that matter, straight from the model. */}
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <dt className="text-[11px] uppercase tracking-[0.25em] text-[#8C8080]">{t.from}</dt>
                <dd className="geist mt-3 text-4xl font-black tracking-[-0.05em] tabular-nums md:text-5xl">
                  {formatCad(MINIMUM, locale)}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <dt className="text-[11px] uppercase tracking-[0.25em] text-[#8C8080]">{t.typical}</dt>
                {/* At 320px the range cannot fit on one line, so it is made to
                    break in the one place that still reads as a range: before
                    the dash. Left to itself it breaks after, stranding a
                    dangling "–" at the end of the first line. */}
                <dd className="geist mt-3 text-[1.75rem] font-black leading-tight tracking-[-0.05em] tabular-nums sm:text-3xl md:text-4xl">
                  {formatCad(archetype.low, locale)}{" "}
                  <span className="whitespace-nowrap">
                    <span className="text-[#8C8080]">–</span>&nbsp;
                    {formatCad(archetype.high, locale)}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
