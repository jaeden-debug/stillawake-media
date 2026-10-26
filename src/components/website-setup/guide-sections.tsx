import Link from "next/link";

import { RequirementFinder } from "@/components/website-setup/requirement-finder";
import type { GuideContent, InternalLink, Locale } from "@/lib/website-setup/types";

/**
 * The guide's body, rendered from a locale's content pack.
 *
 * Server-rendered apart from the requirement finder, and everything that can
 * be done without JavaScript is: the shape cards use native `<details>` for
 * progressive disclosure, the flow is an ordered list, and the control table
 * is a table. The only client component on the page is the one that genuinely
 * needs state.
 */

const LABELS: Record<
  Locale,
  {
    job: string;
    enoughWhen: string;
    requires: string;
    mistake: string;
    buyInstead: string;
    readMore: string;
    hybrid: string;
    clientOwns: string;
    buildOwns: string;
    whatChanges: string;
    who: string;
    goal: string;
    requirements: string;
    verdict: string;
    restraint: string;
    faq: string;
    answer: string;
    inShort: string;
  }
> = {
  en: {
    job: "The job",
    enoughWhen: "When it is enough",
    requires: "What it actually requires",
    mistake: "The expensive mistake",
    buyInstead: "Where buying beats building",
    readMore: "Details",
    hybrid: "Combinations are normal",
    clientOwns: "You change it",
    buildOwns: "Changed through development",
    whatChanges: "What",
    who: "Why",
    goal: "The goal",
    requirements: "What follows from it",
    verdict: "The shape",
    restraint: "What we would not build",
    faq: "Questions",
    answer: "The short answer",
    inShort: "In short",
  },
  fr: {
    job: "Le rôle",
    enoughWhen: "Quand c'est suffisant",
    requires: "Ce que ça exige réellement",
    mistake: "L'erreur coûteuse",
    buyInstead: "Quand acheter bat construire",
    readMore: "Détails",
    hybrid: "Les combinaisons sont normales",
    clientOwns: "Vous le changez",
    buildOwns: "Changé par le développement",
    whatChanges: "Quoi",
    who: "Pourquoi",
    goal: "L'objectif",
    requirements: "Ce qui en découle",
    verdict: "Le type",
    restraint: "Ce que nous ne construirions pas",
    faq: "Questions",
    answer: "La réponse courte",
    inShort: "En bref",
  },
};

function LinkPills({ links }: { links?: InternalLink[] }) {
  if (!links?.length) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full border border-white/12 px-3.5 py-1.5 text-xs text-[#C7B9B9] transition hover:border-[#D71920]/60 hover:text-white"
        >
          {link.label} →
        </Link>
      ))}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <>
      {eyebrow ? (
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{eyebrow}</p>
      ) : null}
      <h2 className="geist mt-4 text-3xl font-black leading-[1.02] tracking-[-0.05em] md:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-5 max-w-3xl text-lg leading-8 text-[#C7B9B9]">{intro}</p> : null}
    </>
  );
}

export function GuideBody({ content }: { content: GuideContent }) {
  const t = LABELS[content.locale];

  return (
    <>
      {/* Hero. The short answer is a standalone paragraph on purpose: it is
          what an answer engine quotes, and it has to be true on its own. */}
      <section className="px-6 pb-14 pt-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">
            {content.hero.eyebrow}
          </p>
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

      {/* Requirements before technology — the flow. */}
      <section id="sequence" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.flow.title} intro={content.flow.intro} />

          <ol className="mt-10 space-y-2">
            {content.flow.steps.map((step, i) => (
              <li
                key={step.label}
                className={`relative rounded-2xl border p-5 md:p-6 ${
                  i === content.flow.steps.length - 1
                    ? "border-[#D71920]/45 bg-[#D71920]/[0.05]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-xs text-[#5F5757]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="geist text-lg font-black tracking-[-0.04em] text-white">
                    {step.label}
                  </h3>
                </div>
                <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[#C7B9B9]">{step.body}</p>
                {i < content.flow.steps.length - 1 ? (
                  <span aria-hidden className="mt-3 block text-sm text-[#D71920]/70">
                    ↓
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-3xl border-l-2 border-[#D71920]/60 pl-5 text-[15px] leading-7 text-[#C7B9B9]">
            {content.flow.warning}
          </p>

          <Link
            href={content.flow.handoff.href}
            className="mt-8 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/60 hover:text-white"
          >
            {content.flow.handoff.label} →
          </Link>
        </div>
      </section>

      {/* The interactive part. */}
      <section id="finder" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead title={content.finder.title} intro={content.finder.intro} />
          <div className="mt-10">
            <RequirementFinder content={content} />
          </div>
        </div>
      </section>

      {/* The nine shapes. */}
      <section id="types" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.types.title} intro={content.types.intro} />

          <div className="mt-10 grid gap-3">
            {content.types.items.map((type) => (
              <details
                key={type.id}
                id={`type-${type.id}`}
                className="group scroll-mt-28 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6 transition open:border-[#D71920]/40 md:p-7"
              >
                <summary className="cursor-pointer list-none">
                  <span className="flex items-start justify-between gap-4">
                    <span className="min-w-0">
                      <span className="geist block text-2xl font-black tracking-[-0.05em] text-white">
                        {type.name}
                      </span>
                      <span className="mt-2 block text-[15px] leading-7 text-[#C7B9B9]">
                        {type.job}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-sm text-[#8C8080] transition group-open:rotate-45"
                    >
                      ＋
                    </span>
                  </span>
                </summary>

                <div className="mt-6 grid gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#D71920]">
                      {t.enoughWhen}
                    </h4>
                    <p className="mt-2 text-[15px] leading-7 text-[#C7B9B9]">
                      {type.sufficientWhen}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#D71920]">
                      {t.requires}
                    </h4>
                    <ul className="mt-2 space-y-2 text-[15px] leading-7 text-[#C7B9B9]">
                      {type.requires.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-[#D71920]">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">
                      {t.mistake}
                    </h4>
                    <p className="mt-2 text-[15px] leading-7 text-[#C7B9B9]">{type.mistake}</p>
                  </div>
                  {type.buyInstead ? (
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">
                        {t.buyInstead}
                      </h4>
                      <p className="mt-2 text-[15px] leading-7 text-[#C7B9B9]">{type.buyInstead}</p>
                    </div>
                  ) : null}
                  <div className="md:col-span-2">
                    <LinkPills links={type.links} />
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-7">
            <h3 className="geist text-xl font-black tracking-[-0.04em]">{t.hybrid}</h3>
            <p className="mt-3 text-[15px] leading-7 text-[#C7B9B9]">{content.types.hybrid}</p>
          </div>
        </div>
      </section>

      {/* CMS decision. */}
      <section id="cms" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.cms.title} intro={content.cms.intro} />

          <ul className="mt-8 grid gap-2 md:grid-cols-2">
            {content.cms.deciders.map((decider) => (
              <li
                key={decider}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-[15px] leading-7 text-[#C7B9B9]"
              >
                {decider}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-3">
            {content.cms.options.map((option) => (
              <div
                key={option.name}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6 md:p-7"
              >
                <h3 className="geist text-xl font-black tracking-[-0.04em]">{option.name}</h3>
                <p className="mt-2 text-sm leading-7 text-[#8C8080]">{option.what}</p>
                <p className="mt-4 text-[15px] leading-7 text-[#C7B9B9]">{option.justifiedWhen}</p>
                <p className="mt-3 border-l-2 border-white/15 pl-4 text-sm leading-7 text-[#9A8F8F]">
                  {option.cost}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl border-l-2 border-[#D71920]/60 pl-5 text-[15px] leading-7 text-[#C7B9B9]">
            {content.cms.verdict}
          </p>
        </div>
      </section>

      {/* Client control. */}
      <section id="control" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.control.title} intro={content.control.intro} />

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/20 text-xs uppercase tracking-[0.15em] text-[#8C8080]">
                  <th className="py-3 pr-4">{t.whatChanges}</th>
                  <th className="py-3 pr-4">—</th>
                  <th className="py-3">{t.who}</th>
                </tr>
              </thead>
              <tbody className="text-[#C7B9B9]">
                {content.control.rows.map((row) => (
                  <tr key={row.item} className="border-b border-white/10">
                    <td className="py-4 pr-4 font-semibold text-white">{row.item}</td>
                    <td className="py-4 pr-4 whitespace-nowrap">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs ${
                          row.owner === "client"
                            ? "border-[#D71920]/50 bg-[#D71920]/10 text-white"
                            : "border-white/15 text-[#9A8F8F]"
                        }`}
                      >
                        {row.owner === "client" ? t.clientOwns : t.buildOwns}
                      </span>
                    </td>
                    <td className="py-4">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cost of complexity. */}
      <section id="complexity" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.complexity.title} intro={content.complexity.intro} />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {content.complexity.costs.map((cost) => (
              <div key={cost.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="geist text-base font-black tracking-[-0.03em] text-white">
                  {cost.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#C7B9B9]">{cost.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-[#D71920]/40 bg-[#D71920]/[0.06] p-7">
            <p className="text-[17px] leading-8 text-[#E7DFDF]">{content.complexity.rule}</p>
          </div>
        </div>
      </section>

      {/* Worked examples. */}
      <section id="examples" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.scenarios.title} intro={content.scenarios.intro} />

          <div className="mt-10 grid gap-4">
            {content.scenarios.items.map((scenario) => (
              <article
                key={scenario.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6 md:p-8"
              >
                <h3 className="geist text-2xl font-black tracking-[-0.05em]">
                  {scenario.business}
                </h3>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#D71920]">{t.goal}</h4>
                    <p className="mt-2 text-[15px] leading-7 text-[#C7B9B9]">{scenario.goal}</p>

                    <h4 className="mt-5 text-xs uppercase tracking-[0.2em] text-[#8C8080]">
                      {t.requirements}
                    </h4>
                    <ul className="mt-2 space-y-2 text-[15px] leading-7 text-[#C7B9B9]">
                      {scenario.requirements.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-[#D71920]">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-[#D71920]">
                      {t.verdict}
                    </h4>
                    <p className="mt-2 text-[15px] leading-7 text-[#C7B9B9]">{scenario.verdict}</p>

                    <h4 className="mt-5 text-xs uppercase tracking-[0.2em] text-[#8C8080]">
                      {t.restraint}
                    </h4>
                    <p className="mt-2 text-[15px] leading-7 text-[#C7B9B9]">
                      {scenario.restraint}
                    </p>
                  </div>
                </div>

                <LinkPills links={scenario.links} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The checklist. */}
      <section id="checklist" className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.checklist.title} intro={content.checklist.intro} />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {content.checklist.sections.map((section) => (
              <div
                key={section.name}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6"
              >
                <h3 className="geist text-lg font-black tracking-[-0.04em]">{section.name}</h3>
                <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#C7B9B9]">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 size-3 shrink-0 rounded-[3px] border border-white/25"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl border-l-2 border-[#D71920]/60 pl-5 text-[15px] leading-7 text-[#C7B9B9]">
            {content.checklist.outro}
          </p>
        </div>
      </section>

      {/* FAQ. Mirrors the FAQPage JSON-LD the page emits. */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={t.faq} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {content.faqs.map((faq) => (
              <div key={faq.q} className="rounded-[1.5rem] border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onward links. */}
      <section className="border-t border-white/10 px-6 py-16 pb-24">
        <div className="mx-auto max-w-5xl">
          <SectionHead title={content.next.title} intro={content.next.intro} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.next.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-white/10 px-5 py-4 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/50 hover:text-white"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
