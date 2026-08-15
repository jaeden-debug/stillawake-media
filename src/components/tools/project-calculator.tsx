"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { activeQuestions, isComplete, mapAnswers, type Answers, type Locale, type Question } from "@/lib/pricing/public-flow";
import { studioHandoffUrl } from "@/lib/pricing/studio-handoff";
import {
  trackCalculatorCompleted,
  trackCalculatorStarted,
  trackProjectTypeSelected,
  trackStudioFromEstimate,
} from "@/lib/analytics";

/**
 * The public estimator.
 *
 * One question per screen, chosen by the previous answers, in the client's
 * language rather than ours. The engine runs on the server; this component
 * holds answer keys and nothing else, so there is no price in the browser to
 * tamper with before it is asked for.
 *
 * Motion is CSS-only and every transition sits behind `motion-safe:`, so a
 * visitor with reduced-motion set gets the same interface without any of it.
 * Options are real buttons carrying `aria-pressed`, so the whole flow works
 * from the keyboard. On a page whose job is to demonstrate that we build
 * things properly, the interaction is part of the argument.
 */

const UI: Record<Locale, {
  of: string; back: string; next: string; skip: string; pickOne: string; calculate: string;
  calculating: string; yourEstimate: string; fixedPrice: string; startsAround: string; includes: string;
  drivers: string; ongoing: string; ongoingNote: string; quoted: string; perMonth: string;
  launchNote: string; customNote: string; discoveryTitle: string; discoveryBody: string;
  discoveryCta: string; discoveryFrom: string; budgetAbove: string; notQuote: string; cta: string;
  ctaNote: string; restart: string; error: string; notIncluded: string; model: string;
}> = {
  en: {
    of: "of",
    back: "Back",
    next: "Continue",
    skip: "None of these",
    pickOne: "Pick at least one to continue.",
    calculate: "See my estimate",
    calculating: "Working it out",
    yourEstimate: "Your estimate",
    fixedPrice: "Fixed price",
    startsAround: "Projects like this start around",
    includes: "What that includes",
    drivers: "What's driving it",
    ongoing: "Optional, monthly",
    ongoingNote: "Quoted separately — never folded into the project price.",
    quoted: "Quoted in writing",
    perMonth: "/mo",
    launchNote:
      "This is our fixed-scope Launch product: our proven layout, your existing brand applied, up to five pages, one round of revisions. The fastest way to get something real online — and because it is a product, the scope is capped.",
    customNote: "Every project gets a written scope with a fixed price before any commitment. No sales call.",
    discoveryTitle: "This one needs scoping before it can be priced",
    discoveryBody:
      "A form cannot honestly price a system this size. The requirements are the expensive part and they do not exist yet, so we do not guess at them. Paid discovery produces a written scope, an architecture and a fixed build price — and the fee comes off the build.",
    discoveryCta: "Start with discovery",
    discoveryFrom: "Discovery from",
    budgetAbove:
      "That sits above the budget you mentioned. Scope moves the price, not the conversation — tell us what matters most and we will propose a smaller first phase at the same rates.",
    notQuote: "A planning estimate, not a binding quote. Final pricing depends on confirmed scope.",
    cta: "Start my project",
    ctaNote: "Your answers carry across — you will not be asked any of this twice.",
    restart: "Start over",
    error: "We could not work that out. Try again in a moment.",
    notIncluded: "Not included",
    model: "Pricing model",
  },
  fr: {
    of: "sur",
    back: "Retour",
    next: "Continuer",
    skip: "Aucun de ceux-ci",
    pickOne: "Choisissez-en au moins un pour continuer.",
    calculate: "Voir mon estimation",
    calculating: "Calcul en cours",
    yourEstimate: "Votre estimation",
    fixedPrice: "Prix fixe",
    startsAround: "Les projets comme celui-ci commencent autour de",
    includes: "Ce que ça comprend",
    drivers: "Ce qui influence le prix",
    ongoing: "Optionnel, mensuel",
    ongoingNote: "Facturé séparément — jamais inclus dans le prix du projet.",
    quoted: "Sur soumission écrite",
    perMonth: "/mois",
    launchNote:
      "C'est notre produit Lancement à portée fixe : notre gabarit éprouvé, votre image de marque appliquée, jusqu'à cinq pages, une ronde de révisions. La façon la plus rapide de mettre quelque chose de solide en ligne — et comme c'est un produit, la portée est plafonnée.",
    customNote:
      "Chaque projet reçoit une portée écrite avec un prix fixe avant tout engagement. Sans appel de vente.",
    discoveryTitle: "Celui-ci doit être cadré avant d'être chiffré",
    discoveryBody:
      "Un formulaire ne peut pas chiffrer honnêtement un système de cette taille. Les exigences sont la partie coûteuse et elles n'existent pas encore, alors on ne les devine pas. Le cadrage payant produit une portée écrite, une architecture et un prix de construction fixe — et les frais sont déduits de la construction.",
    discoveryCta: "Commencer par le cadrage",
    discoveryFrom: "Cadrage à partir de",
    budgetAbove:
      "C'est au-dessus du budget que vous avez mentionné. C'est la portée qui change le prix, pas la conversation — dites-nous ce qui compte le plus et on proposera une première phase plus petite, aux mêmes tarifs.",
    notQuote:
      "Une estimation de planification, pas une soumission ferme. Le prix final dépend de la portée confirmée.",
    cta: "Démarrer mon projet",
    ctaNote: "Vos réponses vous suivent — on ne vous redemandera rien de tout ça.",
    restart: "Recommencer",
    error: "On n'a pas pu calculer ça. Réessayez dans un instant.",
    notIncluded: "Non inclus",
    model: "Modèle tarifaire",
  },
};

/** Both locales share one shape, so a missing key in either is a type error. */
type Copy = (typeof UI)["en"];

type Result = {
  low: number;
  high: number;
  tier: "launch" | "project" | "discovery";
  needsDiscovery: boolean;
  discoveryReason: string | null;
  discoveryFromLabel: string;
  excludes: string[];
  summary: string[];
  includes: string[];
  drivers: string[];
  caveats: string[];
  recurring: { label: string; monthly: number | null; monthlyLabel: string | null }[];
  budgetSignal: "fits" | "above" | "below" | null;
  pricingVersion: string;
};

const KEYFRAMES = `
@keyframes sam-rise { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
@keyframes sam-dot { 0%,100% { opacity:.25 } 50% { opacity:1 } }
`;

/**
 * Counts up on first paint, and is correct even when it cannot.
 *
 * The value initialises to the target rather than to zero, because
 * `requestAnimationFrame` does not fire in a background tab — the first
 * version of this animated from 0 and left "CA$0" on screen permanently if the
 * page was opened in a background tab. A price is not a decoration: the
 * animation is a progressive enhancement, and the safety timeout guarantees
 * the real figure lands whether or not a single frame ever runs.
 */
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // Nothing to do: the value already IS the target, which is the whole point
    // of initialising to it rather than to zero.
    if (reduced || typeof document === "undefined" || document.hidden) return;

    let frame = 0;
    let start = 0;
    // Every write happens inside a callback, never synchronously in the effect
    // body — so the first painted frame shows the real figure and the count-up
    // takes over from the next one.
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / 900);
      // easeOutExpo — quick, then settles, so the figure feels arrived-at.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // If the tab is hidden or backgrounded mid-run, rAF stops and this is what
    // puts the true number on screen.
    const safety = setTimeout(() => setValue(target), 1400);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(safety);
    };
  }, [target]);
  return value;
}

export function ProjectCalculator({ locale }: { locale: Locale }) {
  const T = UI[locale];
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<"asking" | "loading" | "done" | "error">("asking");
  const [result, setResult] = useState<Result | null>(null);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const questions = useMemo(() => activeQuestions(answers), [answers]);
  // Answering can retract later questions, so the cursor must never point past
  // the end of a shortened flow.
  const safeIndex = Math.min(index, Math.max(0, questions.length - 1));
  const current: Question | undefined = questions[safeIndex];
  const onLast = safeIndex >= questions.length - 1;
  const complete = isComplete(answers);

  // Moving the focus announces the new question to a screen reader and keeps
  // it in frame on a phone.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [safeIndex, state]);

  const advance = useCallback(() => setIndex((i) => i + 1), []);

  function choose(q: Question, key: string) {
    if (!started.current) {
      trackCalculatorStarted(locale);
      started.current = true;
    }
    if (q.id === "services") trackProjectTypeSelected(key, locale);

    if (q.kind === "single") {
      setAnswers((prev) => ({ ...prev, [q.id]: key }));
      advance();
      return;
    }

    setAnswers((prev) => {
      const list = Array.isArray(prev[q.id]) ? [...(prev[q.id] as string[])] : [];
      const at = list.indexOf(key);
      if (at >= 0) list.splice(at, 1);
      else list.push(key);
      const next = { ...prev, [q.id]: list };

      // Dropping a service must drop the answers that only existed because of
      // it, or a retracted choice keeps influencing the estimate.
      if (q.id === "services") {
        for (const id of Object.keys(next)) {
          if (id.startsWith("depth.") && !list.includes(id.slice(6))) delete next[id];
        }
      }
      return next;
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
      if (!res.ok) return setState("error");
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
    started.current = false;
    setState("asking");
  }

  if (state === "done" && result) {
    return <ResultCard result={result} locale={locale} T={T} answers={answers} onRestart={restart} />;
  }

  const picked = current?.kind === "multi" ? ((answers[current.id] as string[] | undefined)?.length ?? 0) : 0;
  const blocked = current?.kind === "multi" && !current.optional && picked === 0;

  /* Until a service is chosen the flow genuinely does not know how long it is —
     the depth questions do not exist yet. Claiming "1 of 1" would be a lie that
     also renders a full progress bar on the first screen, so the total is
     withheld and the bar shows a token amount of progress instead. */
  const totalKnown = (answers.services as string[] | undefined)?.length ? true : false;
  const progress = totalKnown ? ((safeIndex + 1) / questions.length) * 100 : 8;

  return (
    <Shell>
      <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.28em] text-[#8C8080]">
        <span className="tabular-nums">
          {totalKnown ? `${safeIndex + 1} ${T.of} ${questions.length}` : safeIndex + 1}
        </span>
        {safeIndex > 0 && (
          <button type="button" onClick={() => setIndex(safeIndex - 1)} className={`${FOCUS} rounded-full px-2 py-1 transition hover:text-white`}>
            ← {T.back}
          </button>
        )}
      </div>

      <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
        <div
          className="h-px bg-[#D71920] motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={safeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalKnown ? questions.length : undefined}
          aria-label="Progress"
        />
      </div>

      {current && (
        // Keying on the question id restarts the entrance animation per screen.
        <div key={current.id} className="motion-safe:animate-[sam-rise_.45s_cubic-bezier(.16,1,.3,1)_both]">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="geist mt-8 text-[1.7rem] font-black leading-[1.1] tracking-[-0.04em] outline-none sm:text-4xl"
          >
            {current.prompt[locale]}
          </h2>
          {current.help && <p className="mt-3 max-w-xl text-sm leading-6 text-[#8C8080]">{current.help[locale]}</p>}

          <div className="mt-7 grid gap-2.5">
            {current.options.map((o, i) => {
              const on =
                current.kind === "single"
                  ? answers[current.id] === o.key
                  : Array.isArray(answers[current.id]) && (answers[current.id] as string[]).includes(o.key);
              return (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => choose(current, o.key)}
                  aria-pressed={on}
                  style={{ animationDelay: `${Math.min(i * 45, 300)}ms` }}
                  className={`${FOCUS} group flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 motion-safe:animate-[sam-rise_.5s_cubic-bezier(.16,1,.3,1)_both] sm:p-5 ${
                    on
                      ? "border-[#D71920] bg-[#D71920]/[0.09] shadow-[0_0_0_1px_rgba(215,25,32,.32),0_18px_40px_-24px_rgba(215,25,32,.65)]"
                      : "border-white/10 bg-white/[0.02] hover:-translate-y-px hover:border-white/25 hover:bg-white/[0.045]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-all duration-200 ${
                      current.kind === "multi" ? "rounded-md" : "rounded-full"
                    } ${on ? "border-[#D71920] bg-[#D71920]" : "border-white/25 group-hover:border-white/45"}`}
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className={`h-3 w-3 transition-all duration-200 ${on ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                      fill="none"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 6.3 4.8 8.6 9.5 3.9" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[0.95rem] font-medium leading-snug ${on ? "text-white" : "text-[#DDD2D2]"}`}>
                      {o.label[locale]}
                    </span>
                    {o.blurb && <span className="mt-1 block text-[13px] leading-snug text-[#8C8080]">{o.blurb[locale]}</span>}
                  </span>
                </button>
              );
            })}
          </div>

          {current.kind === "multi" && !onLast && (
            <div className="mt-6">
              <button
                type="button"
                onClick={advance}
                disabled={blocked}
                className={`${FOCUS} inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-[#D71920]/60 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15 disabled:hover:bg-transparent`}
              >
                {picked || !current.optional ? T.next : T.skip} <span aria-hidden>→</span>
              </button>
              {blocked && <p className="mt-3 text-xs text-[#8C8080]">{T.pickOne}</p>}
            </div>
          )}
        </div>
      )}

      {onLast && complete && (
        <button
          type="button"
          onClick={submit}
          disabled={state === "loading"}
          className={`${FOCUS} group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D71920] px-8 py-4 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-70 sm:w-auto`}
        >
          {state === "loading" ? (
            <>
              {T.calculating}
              <span className="inline-flex gap-1" aria-hidden>
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1 w-1 rounded-full bg-white/80 motion-safe:animate-[sam-dot_1s_ease-in-out_infinite]"
                    style={{ animationDelay: `${d * 160}ms` }}
                  />
                ))}
              </span>
            </>
          ) : (
            <>
              {T.calculate}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </>
          )}
        </button>
      )}

      {state === "error" && (
        <p role="alert" className="mt-4 text-sm text-[#ff6b70]">
          {T.error}
        </p>
      )}
    </Shell>
  );
}

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D71920]";

/** Card chrome, shared by the question and result states so they feel continuous. */
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.015] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,.9)] sm:p-9">
      {/* One soft light source behind the card. Purely decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#D71920]/10 blur-3xl"
      />
      <div className="relative">{children}</div>
      <style>{KEYFRAMES}</style>
    </div>
  );
}

function ResultCard({
  result,
  locale,
  T,
  answers,
  onRestart,
}: {
  result: Result;
  locale: Locale;
  T: Copy;
  answers: Answers;
  onRestart: () => void;
}) {
  const counted = useCountUp(result.low);
  const fmt = (n: number) =>
    locale === "fr"
      ? `${new Intl.NumberFormat("fr-CA").format(n)} $`
      : `CA$${new Intl.NumberFormat("en-CA").format(n)}`;

  const studioHref = studioHandoffUrl({
    answers,
    input: mapAnswers(answers),
    low: result.low,
    high: result.high,
    pricingVersion: result.pricingVersion,
    locale,
  });

  const badge = result.needsDiscovery ? null : result.tier === "launch" ? T.fixedPrice : T.yourEstimate;

  return (
    <div className="motion-safe:animate-[sam-rise_.5s_cubic-bezier(.16,1,.3,1)_both]">
      <Shell>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{T.yourEstimate}</p>
          {badge && (
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[#8C8080]">
              {badge}
            </span>
          )}
        </div>

        {result.needsDiscovery && <p className="mt-4 text-sm text-[#8C8080]">{T.startsAround}</p>}

        <p className="geist mt-3 text-[2.4rem] font-black leading-[1] tracking-[-0.055em] tabular-nums sm:text-6xl">
          {result.tier === "launch" || result.needsDiscovery ? (
            fmt(counted)
          ) : (
            <>
              {fmt(counted)}
              <span className="text-[#8C8080]"> – </span>
              {fmt(result.high)}
            </>
          )}
        </p>

        {result.summary.length > 0 && (
          <p className="mt-4 text-[15px] leading-7 text-[#C7B9B9]">{result.summary.join(" · ")}</p>
        )}

        {result.tier === "launch" && !result.needsDiscovery && (
          <p className="mt-5 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-[#C7B9B9]">
            {T.launchNote}
          </p>
        )}

        {result.needsDiscovery && (
          <div className="mt-6 max-w-2xl rounded-2xl border border-[#D71920]/30 bg-[#D71920]/[0.06] p-5 sm:p-6">
            <h3 className="geist text-lg font-black tracking-[-0.03em]">{T.discoveryTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{T.discoveryBody}</p>
            <p className="mt-4 text-sm text-white">
              {T.discoveryFrom}{" "}
              <strong className="geist text-xl font-black">{result.discoveryFromLabel}</strong>
            </p>
          </div>
        )}

        {result.budgetSignal === "above" && (
          <p className="mt-5 max-w-2xl rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-5 text-sm leading-6 text-[#C7B9B9]">
            {T.budgetAbove}
          </p>
        )}

        <div className="mt-9 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
          <section>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.includes}</h3>
            <ul className="mt-4 space-y-2">
              {result.includes.map((i) => (
                <li key={i} className="flex gap-2.5 text-sm text-[#C7B9B9]">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#D71920]" />
                  {i}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.drivers}</h3>
            <ul className="mt-4 space-y-2">
              {result.drivers.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm text-[#C7B9B9]">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/30" />
                  {d}
                </li>
              ))}
            </ul>

            {result.recurring.length > 0 && (
              <div className="mt-8">
                <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.ongoing}</h3>
                <ul className="mt-4 space-y-2">
                  {result.recurring.map((r) => (
                    <li key={r.label} className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                      <span className="text-[#C7B9B9]">{r.label}</span>
                      <span className="text-white">{r.monthlyLabel ? `${r.monthlyLabel}${T.perMonth}` : T.quoted}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-5 text-[#8C8080]">{T.ongoingNote}</p>
              </div>
            )}
          </section>
        </div>

        {result.excludes.length > 0 && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.notIncluded}</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {result.excludes.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-[#8C8080]">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/20" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.caveats.length > 0 && (
          <div className="mt-8 space-y-2.5 border-t border-white/10 pt-6">
            {result.caveats.map((c) => (
              <p key={c} className="max-w-3xl text-sm leading-6 text-[#8C8080]">
                {c}
              </p>
            ))}
          </div>
        )}

        <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-6 text-[#8C8080]">
          {result.needsDiscovery ? T.notQuote : `${result.tier === "launch" ? "" : `${T.customNote} `}${T.notQuote}`}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={studioHref}
            onClick={() => trackStudioFromEstimate(result.low, result.high, locale)}
            className={`${FOCUS} group inline-flex items-center gap-2 rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:brightness-110`}
          >
            {result.needsDiscovery ? T.discoveryCta : T.cta}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <button type="button" onClick={onRestart} className={`${FOCUS} rounded-full px-2 py-1 text-sm text-[#8C8080] underline-offset-4 transition hover:text-white hover:underline`}>
            {T.restart}
          </button>
        </div>
        <p className="mt-3 text-xs text-[#8C8080]">{T.ctaNote}</p>

        <p className="mt-7 text-[10px] uppercase tracking-[0.25em] text-[#5a5252]">
          {T.model} {result.pricingVersion}
        </p>
      </Shell>
    </div>
  );
}
