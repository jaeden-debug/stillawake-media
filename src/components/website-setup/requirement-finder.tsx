"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { evaluate, type FinderResult } from "@/lib/website-setup/engine";
import type { GuideContent, Locale, Question, SiteTypeId } from "@/lib/website-setup/types";

/**
 * The requirement finder.
 *
 * Every statement is a real checkbox inside a real fieldset, so the whole
 * thing works from the keyboard and reads correctly to a screen reader
 * without any of the ARIA gymnastics a custom control would need. State is a
 * Set of ids held in memory: nothing is stored, nothing is posted, and there
 * is no lead capture standing between the reader and the answer.
 *
 * The readout deliberately includes the two things a sales form would never
 * say — that most of the selection may be unnecessary, and that a "nobody
 * will maintain it" answer contradicts the rest of the choices.
 */

const UI: Record<
  Locale,
  {
    empty: string;
    emptyHint: string;
    result: string;
    primary: string;
    also: string;
    hybrid: string;
    oneSite: string;
    weight: string;
    cmsLabel: string;
    cms: Record<"none" | "light" | "structured", string>;
    duties: string;
    conflict: string;
    conflictBody: string;
    bands: Record<FinderResult["band"], { name: string; body: string }>;
    reset: string;
    selectedCount: (n: number) => string;
    next: string;
    calculator: string;
    calculatorHref: string;
    readTypes: string;
    note: string;
  }
> = {
  en: {
    empty: "Nothing selected yet.",
    emptyHint:
      "Tick the statements that are true. If none of them are, you need a brochure site — and that is a real answer, not a consolation prize.",
    result: "What your answers point at",
    primary: "Primary shape",
    also: "Also required",
    hybrid:
      "That is a hybrid: two products sharing a brand. Scope, budget and release them separately, and never let the marketing site wait on the application.",
    oneSite:
      "Those overlap rather than compete. It is still one website doing two jobs, on one budget — a second product only appears higher up this scale.",
    weight: "Lifecycle weight",
    cmsLabel: "Content management",
    cms: {
      none: "No CMS needed — content can ship with deployments.",
      light: "A light CMS: someone non-technical changes words and images.",
      structured: "Structured content: records with fields, roles and a publishing workflow.",
    },
    duties: "Obligations you are taking on",
    conflict: "Your answers disagree with each other",
    conflictBody:
      "You said nobody will maintain it, and then selected enough capability to require maintaining. One of those has to give. The usual fix is to cut scope until the site can survive being ignored — not to buy a support plan and hope.",
    bands: {
      single: {
        name: "One website",
        body: "A site, not a system. It can be built once, kept fast, and left alone between content updates.",
      },
      system: {
        name: "A website with a system attached",
        body: "Still one project, but something in it now runs continuously — a store, a booking flow, a content operation. Budget for the running, not just the building.",
      },
      "two-products": {
        name: "Two products in one project",
        body: "A marketing site and an application. They have different users and different success measures. Treat them as two builds with two scopes, or the smaller one will be starved by the larger.",
      },
      software: {
        name: "A software project with a website attached",
        body: "At this point nobody can honestly price it from a questionnaire — the requirements are the expensive part and they do not exist yet. This is what paid discovery is for.",
      },
    },
    reset: "Clear",
    selectedCount: (n) => `${n} selected`,
    next: "What to do with this",
    calculator: "Estimate what this scope costs",
    calculatorHref: "/tools/project-cost-calculator",
    readTypes: "Read what each shape actually requires",
    note: "Nothing here is stored or sent. Close the tab and it is gone.",
  },
  fr: {
    empty: "Rien de sélectionné pour l'instant.",
    emptyHint:
      "Cochez les énoncés qui sont vrais. Si aucun ne l'est, il vous faut un site vitrine — et c'est une vraie réponse, pas un prix de consolation.",
    result: "Ce que vos réponses indiquent",
    primary: "Type principal",
    also: "Aussi nécessaire",
    hybrid:
      "C'est un site hybride : deux produits sous une même marque. Cadrez-les, budgétez-les et livrez-les séparément, et ne laissez jamais le site marketing attendre après l'application.",
    oneSite:
      "Ces types se recoupent plutôt que de se disputer. Ça reste un seul site qui fait deux jobs, sur un seul budget — un deuxième produit n'apparaît que plus haut sur cette échelle.",
    weight: "Poids d'entretien",
    cmsLabel: "Gestion de contenu",
    cms: {
      none: "Aucun CMS nécessaire — le contenu peut être livré avec les déploiements.",
      light: "Un CMS léger : une personne non technique change les textes et les images.",
      structured: "Contenu structuré : des fiches avec des champs, des rôles et un flux de publication.",
    },
    duties: "Obligations que vous assumez",
    conflict: "Vos réponses se contredisent",
    conflictBody:
      "Vous avez dit que personne ne l'entretiendra, puis choisi assez de fonctions pour exiger de l'entretien. Une des deux doit céder. La correction habituelle est de couper la portée jusqu'à ce que le site survive à l'abandon — pas d'acheter un forfait de soutien en espérant.",
    bands: {
      single: {
        name: "Un site web",
        body: "Un site, pas un système. Il se construit une fois, reste rapide, et peut être laissé tranquille entre deux mises à jour de contenu.",
      },
      system: {
        name: "Un site avec un système attaché",
        body: "Toujours un seul projet, mais quelque chose y roule en continu — une boutique, un parcours de réservation, une opération de contenu. Budgétez l'exploitation, pas juste la construction.",
      },
      "two-products": {
        name: "Deux produits dans un projet",
        body: "Un site marketing et une application. Utilisateurs différents, mesures de succès différentes. Traitez-les comme deux projets, sinon le plus petit sera affamé par le plus gros.",
      },
      software: {
        name: "Un projet logiciel avec un site attaché",
        body: "À ce stade, personne ne peut honnêtement chiffrer ça à partir d'un questionnaire — les exigences sont la partie coûteuse et elles n'existent pas encore. C'est à ça que sert une phase de cadrage payante.",
      },
    },
    reset: "Effacer",
    selectedCount: (n) => `${n} sélectionné${n > 1 ? "s" : ""}`,
    next: "Quoi faire avec ça",
    calculator: "Estimer ce que cette portée coûte",
    calculatorHref: "/fr/outils/calculateur-cout-projet",
    readTypes: "Lire ce que chaque type exige réellement",
    note: "Rien n'est enregistré ni envoyé. Fermez l'onglet et c'est disparu.",
  },
};

function QuestionRow({
  question,
  checked,
  onToggle,
}: {
  question: Question;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${
        checked
          ? "border-[#D71920]/60 bg-[#D71920]/[0.07]"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(question.id)}
        className="mt-1 size-4 shrink-0 accent-[#D71920]"
      />
      <span className="min-w-0">
        <span className="block text-[15px] leading-6 text-white">{question.ask}</span>
        <span
          className={`mt-1 block text-sm leading-6 text-[#9A8F8F] ${checked ? "" : "hidden sm:block"}`}
        >
          {question.decides}
        </span>
      </span>
    </label>
  );
}

export function RequirementFinder({ content }: { content: GuideContent }) {
  const t = UI[content.locale];
  const { groups, questions } = content.finder;
  const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set<string>());

  const result = useMemo(() => evaluate(questions, selected), [questions, selected]);

  const typeName = useMemo(() => {
    const byId = new Map<SiteTypeId, string>(content.types.items.map((item) => [item.id, item.name]));
    return (id: SiteTypeId) => byId.get(id) ?? id;
  }, [content.types.items]);

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const band = t.bands[result.band];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
      <div className="space-y-8">
        {groups.map((group) => (
          <fieldset key={group.id} className="border-0 p-0">
            <legend className="geist text-xl font-black tracking-[-0.04em] text-white">
              {group.name}
            </legend>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9A8F8F]">{group.intro}</p>
            <div className="mt-4 grid gap-2">
              {questions
                .filter((q) => q.group === group.id)
                .map((q) => (
                  <QuestionRow
                    key={q.id}
                    question={q}
                    checked={selected.has(q.id)}
                    onToggle={toggle}
                  />
                ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/* The readout follows the questions in the DOM so the reading order is
          natural on a phone, and sticks beside them on a wide screen. */}
      <aside
        aria-live="polite"
        className="rounded-[1.75rem] border border-white/12 bg-[#070707] p-6 lg:sticky lg:top-28"
      >
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="geist text-lg font-black tracking-[-0.04em]">{t.result}</h3>
          {selected.size > 0 ? (
            <button
              type="button"
              onClick={() => setSelected(new Set<string>())}
              className="text-xs uppercase tracking-[0.2em] text-[#8C8080] transition hover:text-white"
            >
              {t.reset}
            </button>
          ) : null}
        </div>

        {result.selected.length === 0 ? (
          <>
            <p className="mt-4 text-sm text-[#8C8080]">{t.empty}</p>
            <p className="mt-2 text-sm leading-6 text-[#C7B9B9]">{t.emptyHint}</p>
          </>
        ) : (
          <div className="mt-5 space-y-5 text-sm leading-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">
              {t.selectedCount(result.selected.length)}
            </p>

            {result.primary ? (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#D71920]">{t.primary}</p>
                <p className="geist mt-1 text-2xl font-black tracking-[-0.05em] text-white">
                  {typeName(result.primary)}
                </p>
              </div>
            ) : null}

            {result.secondary.length > 0 ? (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">{t.also}</p>
                <p className="mt-1 text-white">
                  {result.secondary.map((id) => typeName(id)).join(" · ")}
                </p>
                {/* Two shapes is not automatically two products. A lead-gen
                    site that also needs content is one website doing two jobs;
                    calling that a hybrid would invent a second budget. The
                    split is the lifecycle band, which is what actually
                    distinguishes "more pages" from "an application". */}
                <p className="mt-2 text-[#C7B9B9]">
                  {result.band === "two-products" || result.band === "software"
                    ? t.hybrid
                    : t.oneSite}
                </p>
              </div>
            ) : null}

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">{t.weight}</p>
              <p className="geist mt-1 text-lg font-black tracking-[-0.04em] text-white">
                {band.name}
              </p>
              <p className="mt-2 text-[#C7B9B9]">{band.body}</p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">{t.cmsLabel}</p>
              <p className="mt-2 text-[#C7B9B9]">{t.cms[result.cms]}</p>
            </div>

            {result.duties.length > 0 ? (
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">{t.duties}</p>
                <ul className="mt-2 space-y-2 text-[#C7B9B9]">
                  {result.duties.map((duty) => (
                    <li key={duty} className="flex gap-2">
                      <span className="text-[#D71920]">—</span>
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {result.conflict ? (
              <div className="rounded-2xl border border-[#D71920]/50 bg-[#D71920]/10 p-4">
                <p className="font-semibold text-white">{t.conflict}</p>
                <p className="mt-2 text-[#E7DFDF]">{t.conflictBody}</p>
              </div>
            ) : null}

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">{t.next}</p>
              <div className="mt-3 grid gap-2">
                <Link
                  href={t.calculatorHref}
                  className="rounded-xl border border-white/15 px-4 py-3 text-[#C7B9B9] transition hover:border-[#D71920]/60 hover:text-white"
                >
                  {t.calculator} →
                </Link>
                <a
                  href="#types"
                  className="rounded-xl border border-white/15 px-4 py-3 text-[#C7B9B9] transition hover:border-[#D71920]/60 hover:text-white"
                >
                  {t.readTypes} →
                </a>
              </div>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-[#5F5757]">{t.note}</p>
      </aside>
    </div>
  );
}
