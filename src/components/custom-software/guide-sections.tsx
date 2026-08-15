import Link from "next/link";

import type { GuideContent, Locale } from "@/lib/custom-software/types";

/**
 * One renderer, both languages.
 *
 * Every string comes from the locale content module; nothing here is written
 * in English or French except the handful of section chrome labels below. That
 * is what guarantees the two guides stay structurally identical — a section
 * added to one is a section added to both, and a French reader can never land
 * on a half-translated page.
 *
 * Anchor ids are IDENTICAL across locales (`#routes`, `#cost`, and the rest)
 * rather than localised. They are deep-linked from the project calculator's
 * results, and one link table that works for both languages is both simpler
 * and harder to break than two that drift apart.
 */

const LABELS: Record<Locale, {
  answer: string;
  chooseWhen: string;
  cost: string;
  failureMode: string;
  example: string;
  test: string;
  buyInstead: string;
  needItWhen: string;
  notConfused: string;
  productsExist: string;
  productsDont: string;
  buildTime: string;
  ongoing: string;
  faq: string;
}> = {
  en: {
    answer: "Short answer",
    chooseWhen: "Choose this when",
    cost: "What it costs you",
    failureMode: "How it goes wrong",
    example: "For example",
    test: "The test",
    buyInstead: "Buy this instead",
    needItWhen: "You need it when",
    notConfused: "Not to be confused with",
    productsExist: "Proven products exist",
    productsDont: "Usually has to be built",
    buildTime: "One-time",
    ongoing: "Every year, forever",
    faq: "Questions people actually ask",
  },
  fr: {
    answer: "Réponse courte",
    chooseWhen: "Choisissez cette voie quand",
    cost: "Ce que ça vous coûte",
    failureMode: "Comment ça dérape",
    example: "Par exemple",
    test: "Le test",
    buyInstead: "Achetez plutôt ceci",
    needItWhen: "Vous en avez besoin quand",
    notConfused: "À ne pas confondre avec",
    productsExist: "Des produits éprouvés existent",
    productsDont: "Doit généralement être bâti",
    buildTime: "Une seule fois",
    ongoing: "Chaque année, pour toujours",
    faq: "Les questions qu'on nous pose vraiment",
  },
};

function SectionHead({ title, intro }: { title: string; intro?: string }) {
  return (
    <>
      <h2 className="geist text-3xl font-black leading-[1.02] tracking-[-0.05em] md:text-4xl">{title}</h2>
      {intro ? <p className="mt-5 max-w-3xl text-lg leading-8 text-[#C7B9B9]">{intro}</p> : null}
    </>
  );
}

export function GuideBody({ content }: { content: GuideContent }) {
  const t = LABELS[content.locale];
  const buildLines = content.cost.items.filter((c) => c.timing === "build");
  const ongoingLines = content.cost.items.filter((c) => c.timing === "ongoing");

  return (
    <>
      {/* Hero. The short answer is a standalone block because it is what an
          answer engine quotes, and it has to be true with no page around it. */}
      <section className="px-6 pb-14 pt-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{content.hero.eyebrow}</p>
          <h1 className="geist mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-6xl">
            {content.hero.h1}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">{content.hero.standfirst}</p>

          <div className="mt-10 rounded-[1.75rem] border border-[#D71920]/35 bg-[#D71920]/[0.07] p-7 md:p-9">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{t.answer}</p>
            <p className="mt-4 text-[17px] leading-8 text-[#E7DFDF]">{content.hero.answer}</p>
          </div>
        </div>
      </section>

      {/* The vocabulary. Most of the money is wasted here. */}
      <section id="kinds" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead title={content.kinds.title} intro={content.kinds.intro} />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.kinds.items.map((k) => (
              <article
                key={k.id}
                id={`kind-${k.id}`}
                className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h3 className="geist text-xl font-black tracking-[-0.04em] text-white">{k.name}</h3>
                  {/* Whether something proven already exists is the single most
                      useful fact about a category, so it is on the card. */}
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
                      k.provenProductsExist
                        ? "border-emerald-300/30 text-emerald-300/90"
                        : "border-amber-300/30 text-amber-300/90"
                    }`}
                  >
                    {k.provenProductsExist ? t.productsExist : t.productsDont}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-7 text-[#C7B9B9]">{k.oneLine}</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-[#8C8080]">{t.needItWhen}</dt>
                    <dd className="mt-1 leading-6 text-[#C7B9B9]">{k.needItWhen}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-[#8C8080]">{t.notConfused}</dt>
                    <dd className="mt-1 leading-6 text-[#8C8080]">{k.notToBeConfusedWith}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THE FRAMEWORK. Deep-linked from the calculator. */}
      <section id="routes" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.routes.title} intro={content.routes.intro} />

          <ol className="mt-10 space-y-3">
            {content.routes.items.map((route, i) => (
              <li
                key={route.id}
                id={`route-${route.id}`}
                className={`scroll-mt-28 rounded-2xl border p-6 md:p-7 ${
                  /* Build is highlighted as the LAST rung, not the best one.
                     The visual weight marks where the ladder ends. */
                  route.id === "build"
                    ? "border-[#D71920]/45 bg-[#D71920]/[0.05]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-xs text-[#5F5757]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="geist text-2xl font-black tracking-[-0.045em] text-white">{route.name}</h3>
                </div>
                <p className="mt-3 max-w-3xl text-[16px] leading-7 text-[#E7DFDF]">{route.meaning}</p>

                <div className="mt-5">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C8080]">{t.chooseWhen}</p>
                  <ul className="mt-3 space-y-2">
                    {route.chooseWhen.map((c) => (
                      <li key={c} className="flex max-w-3xl gap-2.5 text-[15px] leading-7 text-[#C7B9B9]">
                        <span aria-hidden className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-[#D71920]" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-[#8C8080]">{t.cost}</dt>
                    <dd className="mt-1.5 text-sm leading-6 text-[#C7B9B9]">{route.cost}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-[#8C8080]">{t.failureMode}</dt>
                    <dd className="mt-1.5 text-sm leading-6 text-[#C7B9B9]">{route.failureMode}</dd>
                  </div>
                </dl>

                <p className="mt-5 border-l-2 border-white/15 pl-5 text-sm leading-7 text-[#8C8080]">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C8080]">{t.example}</span>
                  <br />
                  {route.example}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-9 max-w-3xl border-l-2 border-[#D71920]/60 pl-5 text-[16px] leading-8 text-[#E7DFDF]">
            {content.routes.rule}
          </p>
        </div>
      </section>

      {/* When it makes sense. */}
      <section id="when" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead title={content.when.title} intro={content.when.intro} />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.when.items.map((s) => (
              <article key={s.id} id={`signal-${s.id}`} className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="geist text-lg font-black tracking-[-0.04em] text-white">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#C7B9B9]">{s.body}</p>
                <p className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-[#C7B9B9]">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C8080]">{t.test}</span>
                  <br />
                  {s.test}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* When it doesn't — and what to buy instead. */}
      <section id="when-not" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead title={content.whenNot.title} intro={content.whenNot.intro} />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.whenNot.items.map((c) => (
              <article key={c.id} id={`instead-${c.id}`} className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="geist text-lg font-black tracking-[-0.04em] text-white">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#C7B9B9]">{c.body}</p>
                {/* Green, because this is the recommendation rather than the
                    warning. The alternative is the useful half of the section. */}
                <p className="mt-4 rounded-xl border border-emerald-300/20 bg-emerald-300/[0.05] p-4 text-sm leading-6 text-[#C7B9B9]">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/80">{t.buyInstead}</span>
                  <br />
                  {c.buyInstead}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Total cost of ownership. Deep-linked from the calculator. */}
      <section id="cost" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.cost.title} intro={content.cost.intro} />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { label: t.buildTime, lines: buildLines, accent: "border-white/10" },
              /* The recurring column carries the visual weight, because it is
                 the column that decides whether the project was affordable. */
              { label: t.ongoing, lines: ongoingLines, accent: "border-[#D71920]/40" },
            ].map((col) => (
              <div key={col.label} className={`rounded-2xl border ${col.accent} bg-white/[0.02] p-6`}>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#D71920]">{col.label}</p>
                <dl className="mt-5 space-y-4">
                  {col.lines.map((line) => (
                    <div key={line.id}>
                      <dt className="text-sm font-semibold text-white">{line.name}</dt>
                      <dd className="mt-1 text-sm leading-6 text-[#8C8080]">{line.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[16px] leading-8 text-[#C7B9B9]">{content.cost.comparison}</p>
          <p className="mt-5 max-w-3xl border-l-2 border-white/15 pl-5 text-sm leading-7 text-[#8C8080]">
            {content.cost.note}
          </p>
        </div>
      </section>

      {/* The sequence. */}
      <section id="decide" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.decide.title} intro={content.decide.intro} />

          <ol className="mt-10 space-y-2">
            {content.decide.steps.map((step, i) => (
              <li key={step.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-xs text-[#5F5757]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="geist text-lg font-black tracking-[-0.04em] text-white">{step.label}</h3>
                </div>
                <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[#C7B9B9]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The calculator hand-off — the guide's logic, applied to their case. */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[1.75rem] border border-[#D71920]/35 bg-[#D71920]/[0.07] p-7 md:p-9">
            <h2 className="geist text-2xl font-black tracking-[-0.045em] md:text-3xl">{content.cta.title}</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-8 text-[#E7DFDF]">{content.cta.body}</p>
            <Link
              href={content.cta.calculator.href}
              className="mt-6 inline-flex rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:brightness-110"
            >
              {content.cta.calculator.label} →
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHead title={t.faq} />
          <dl className="mt-9 space-y-7">
            {content.faq.map(([q, a]) => (
              <div key={q}>
                <dt className="geist text-lg font-black tracking-[-0.035em] text-white">{q}</dt>
                <dd className="mt-3 text-[15px] leading-8 text-[#C7B9B9]">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="geist text-2xl font-black tracking-[-0.045em]">{content.related.title}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {content.related.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl border border-white/10 px-5 py-4 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/50 hover:text-white"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
