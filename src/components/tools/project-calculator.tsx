"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  activeQuestions,
  isComplete,
  mapAnswers,
  type Answers,
  type Locale,
  type Question,
} from "@/lib/pricing/public-flow";
import { studioHandoffUrl } from "@/lib/pricing/studio-handoff";
import {
  trackCalculatorCompleted,
  trackCalculatorStarted,
  trackProjectTypeSelected,
  trackStudioFromEstimate,
} from "@/lib/analytics";

/**
 * Public project cost calculator.
 *
 * One question at a time, in business language, with the next question chosen
 * by the previous answers — a restaurant owner is never shown a question about
 * roles and permissions. The engine runs on the server; this component holds
 * answer keys and nothing else, so there is no price in the browser to tamper
 * with before it is asked for.
 */

const UI = {
  en: {
    step: "Question",
    of: "of",
    back: "Back",
    next: "Continue",
    skip: "None of these",
    pickOne: "Pick at least one so we can price it.",
    calculate: "See my estimate",
    calculating: "Working it out…",
    heading: "Your project estimate",
    likely: "Likely project",
    includes: "Includes approximately",
    drivers: "Main cost drivers",
    ongoing: "Optional ongoing",
    ongoingNote: "Quoted separately from the build — never bundled into the project price.",
    quoted: "Quoted in writing",
    perMonth: "/month",
    disclaimer:
      "This is a planning estimate based on StillAwake Media's current pricing and typical implementation effort. It is not a binding quote. Final pricing depends on confirmed scope and integrations.",
    minimum:
      "This is at StillAwake Media's minimum engagement. Smaller pieces of work are handled as one-time support instead.",
    cta: "Start my project",
    ctaNote: "Your answers carry across — you will not be asked the same things twice.",
    restart: "Start over",
    error: "We could not work that out. Try again in a moment.",
    pricingModel: "Pricing model",
  },
  fr: {
    step: "Question",
    of: "sur",
    back: "Retour",
    next: "Continuer",
    skip: "Aucune de ces réponses",
    pickOne: "Choisissez-en au moins une pour qu'on puisse chiffrer.",
    calculate: "Voir mon estimation",
    calculating: "Calcul en cours…",
    heading: "Estimation de votre projet",
    likely: "Projet probable",
    includes: "Comprend environ",
    drivers: "Principaux facteurs de coût",
    ongoing: "Services récurrents optionnels",
    ongoingNote: "Facturés séparément du projet — jamais inclus dans le prix de la construction.",
    quoted: "Sur soumission écrite",
    perMonth: "/mois",
    disclaimer:
      "Ceci est une estimation de planification basée sur les tarifs actuels de StillAwake Media et l'effort d'implémentation habituel. Ce n'est pas une soumission ferme. Le prix final dépend de la portée confirmée et des intégrations.",
    minimum:
      "C'est le mandat minimum de StillAwake Media. Les travaux plus petits sont traités en dépannage ponctuel.",
    cta: "Démarrer mon projet",
    ctaNote: "Vos réponses vous suivent — on ne vous redemandera pas la même chose.",
    restart: "Recommencer",
    error: "On n'a pas pu calculer ça. Réessayez dans un instant.",
    pricingModel: "Modèle tarifaire",
  },
} as const;

type Result = {
  low: number;
  high: number;
  rangeLabel: string;
  projectLabel: string;
  includes: string[];
  drivers: string[];
  caveats: string[];
  recurring: { label: string; monthly: number | null; monthlyLabel: string | null }[];
  minimumApplied: boolean;
  pricingVersion: string;
  studioType: string;
};

export function ProjectCalculator({ locale }: { locale: Locale }) {
  const T = UI[locale];
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<"asking" | "loading" | "done" | "error">("asking");
  const [result, setResult] = useState<Result | null>(null);
  const [started, setStarted] = useState(false);

  const questions = useMemo(() => activeQuestions(answers), [answers]);
  // Answering can retract later questions, so the cursor must never point past
  // the end of a shortened flow.
  const safeIndex = Math.min(index, Math.max(0, questions.length - 1));
  const current: Question | undefined = questions[safeIndex];
  const complete = isComplete(answers);
  const onLast = safeIndex >= questions.length - 1;

  function choose(q: Question, key: string) {
    if (!started) {
      trackCalculatorStarted(locale);
      setStarted(true);
    }
    if (q.id === "goal") trackProjectTypeSelected(key, locale);

    if (q.kind === "single") {
      setAnswers((prev) => {
        const next = { ...prev, [q.id]: key };
        // A changed branch invalidates answers from the abandoned one, and a
        // stale answer would otherwise keep influencing the estimate.
        if (q.id === "goal" || q.id === "outcome") {
          const keep = new Set(["goal", "outcome", "clarity", "timing"]);
          for (const id of Object.keys(next)) if (!keep.has(id)) delete next[id];
        }
        return next;
      });
      setIndex(safeIndex + 1);
      return;
    }

    setAnswers((prev) => {
      const list = Array.isArray(prev[q.id]) ? [...(prev[q.id] as string[])] : [];
      const at = list.indexOf(key);
      if (at >= 0) list.splice(at, 1);
      else list.push(key);
      return { ...prev, [q.id]: list };
    });
  }

  async function submit() {
    setState("loading");
    try {
      const res = await fetch("/api/tools/project-estimate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers, locale }),
      });
      if (!res.ok) {
        setState("error");
        return;
      }
      const data: Result = await res.json();
      setResult(data);
      setState("done");
      trackCalculatorCompleted(data.low, data.high, locale);
    } catch {
      setState("error");
    }
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setResult(null);
    setState("asking");
  }

  if (state === "done" && result) {
    // Everything they just told us, translated into the Studio intake's own
    // vocabulary, so the next screen does not re-ask any of it.
    const studioHref = studioHandoffUrl({
      answers,
      input: mapAnswers(answers),
      low: result.low,
      high: result.high,
      pricingVersion: result.pricingVersion,
      locale,
    });
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{T.heading}</p>
        <p className="geist mt-5 text-4xl font-black leading-[1.05] tracking-[-0.05em] md:text-5xl">
          {result.rangeLabel}
        </p>

        <p className="mt-5 text-sm text-[#8C8080]">
          {T.likely} · <span className="text-white">{result.projectLabel}</span>
        </p>

        {result.minimumApplied && <p className="mt-4 text-sm text-[#C7B9B9]">{T.minimum}</p>}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.includes}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-[#C7B9B9]">
              {result.includes.map((i) => (
                <li key={i}>· {i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.drivers}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-[#C7B9B9]">
              {result.drivers.map((d) => (
                <li key={d}>· {d}</li>
              ))}
            </ul>
          </div>
        </div>

        {result.caveats.length > 0 && (
          <div className="mt-8 space-y-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.05] p-5">
            {result.caveats.map((c) => (
              <p key={c} className="text-sm text-[#C7B9B9]">
                {c}
              </p>
            ))}
          </div>
        )}

        {result.recurring.length > 0 && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.ongoing}</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {result.recurring.map((r) => (
                <li key={r.label} className="flex flex-wrap justify-between gap-2 text-[#C7B9B9]">
                  <span>{r.label}</span>
                  <span className="text-white">
                    {r.monthlyLabel ? `${r.monthlyLabel}${T.perMonth}` : T.quoted}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[#8C8080]">{T.ongoingNote}</p>
          </div>
        )}

        <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-[#8C8080]">{T.disclaimer}</p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href={studioHref}
            onClick={() => trackStudioFromEstimate(result.low, result.high, locale)}
            className="inline-flex rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:opacity-90"
          >
            {T.cta} →
          </Link>
          <button type="button" onClick={restart} className="text-sm text-[#8C8080] underline-offset-4 hover:underline">
            {T.restart}
          </button>
        </div>
        <p className="mt-3 text-xs text-[#8C8080]">{T.ctaNote}</p>
        <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#5a5252]">
          {T.pricingModel} {result.pricingVersion}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">
        <span>
          {T.step} {safeIndex + 1} {T.of} {questions.length}
        </span>
        {safeIndex > 0 && (
          <button type="button" onClick={() => setIndex(safeIndex - 1)} className="hover:text-white">
            ← {T.back}
          </button>
        )}
      </div>

      <div
        className="mt-3 h-px w-full bg-white/10"
        role="progressbar"
        aria-valuenow={safeIndex + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
      >
        <div
          className="h-px bg-[#D71920] transition-all"
          style={{ width: `${((safeIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {current && (
        <>
          <h2 className="geist mt-7 text-2xl font-black tracking-[-0.04em] md:text-3xl">
            {current.prompt[locale]}
          </h2>
          {current.help && <p className="mt-3 text-sm text-[#8C8080]">{current.help[locale]}</p>}

          <div className="mt-7 grid gap-2.5">
            {current.options.map((o) => {
              const picked =
                current.kind === "single"
                  ? answers[current.id] === o.key
                  : Array.isArray(answers[current.id]) && (answers[current.id] as string[]).includes(o.key);
              return (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => choose(current, o.key)}
                  aria-pressed={picked}
                  className={`rounded-xl border px-5 py-4 text-left text-sm transition ${
                    picked
                      ? "border-[#D71920]/70 bg-[#D71920]/10 text-white"
                      : "border-white/10 text-[#C7B9B9] hover:border-white/30 hover:text-white"
                  }`}
                >
                  {o.label[locale]}
                  {o.help && <span className="mt-1 block text-xs text-[#8C8080]">{o.help[locale]}</span>}
                </button>
              );
            })}
          </div>

          {current.kind === "multi" &&
            (() => {
              const picked = (answers[current.id] as string[] | undefined)?.length ?? 0;
              // A required question with nothing picked must not advance: doing
              // so used to strand the visitor on the last step with no submit
              // button and no explanation of what was missing.
              const blocked = !current.optional && picked === 0;
              return (
                <>
                  <button
                    type="button"
                    onClick={() => setIndex(safeIndex + 1)}
                    disabled={blocked}
                    className="mt-6 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-[#D71920]/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15"
                  >
                    {picked || !current.optional ? T.next : T.skip} →
                  </button>
                  {blocked && <p className="mt-3 text-xs text-[#8C8080]">{T.pickOne}</p>}
                </>
              );
            })()}
        </>
      )}

      {onLast && complete && (
        <button
          type="button"
          onClick={submit}
          disabled={state === "loading"}
          className="mt-7 inline-flex rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {state === "loading" ? T.calculating : T.calculate} →
        </button>
      )}

      {state === "error" && <p className="mt-4 text-sm text-[#ff6b70]">{T.error}</p>}
    </div>
  );
}
