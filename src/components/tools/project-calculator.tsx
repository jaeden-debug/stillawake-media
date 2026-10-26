"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

import type { PresentedRecommendation } from "@/lib/architecture/present";
import { activeQuestions, isComplete, mapAnswers, type Answers, type Locale, type Question } from "@/lib/pricing/public-flow";
import { formatCad } from "@/lib/pricing/labels";
import { MIN_PAYMENT, PUBLIC_PAYMENT_COUNTS } from "@/lib/pricing/payments";
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
  ctaNote: string; restart: string; error: string; notIncluded: string; rangeMeaning: string;
  towardLower: string; lowMeans: string; highMeans: string; couldAdd: string; model: string;
  payToggle: string; payTitle: string; payEach: string; payPlural: (n: number) => string;
  payNote: string; payDisclaimer: string; payLonger: string;
  shareTitle: string; shareCopy: string; shareCopied: string; shareEmail: string;
  shareNative: string;
  setupTitle: string; setupWhy: string; setupComplexity: string; setupConfidence: string;
  setupYouManage: string; setupWeHandle: string; setupNotNeeded: string; setupNotNeededNote: string;
  setupAlternative: string; setupAltWhy: string; setupOpen: string; setupTech: string;
  setupTechNote: string; setupRead: string; setupVersion: string; setupWhyThis: string;
}> = {
  en: {
    of: "of",
    back: "Back",
    next: "Continue",
    skip: "None of these",
    pickOne: "Pick at least one to continue.",
    calculate: "See my estimate",
    calculating: "Working it out",
    yourEstimate: "Estimated project range",
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
    customNote: "Every project gets a written scope with a fixed price before any commitment.",
    discoveryTitle: "This one needs scoping before it can be priced",
    discoveryBody:
      "A form cannot honestly price a system this size. The requirements are the expensive part and they do not exist yet, so we do not guess at them. Paid discovery produces a written scope, an architecture and a fixed build price — and the fee comes off the build.",
    discoveryCta: "Start with discovery",
    discoveryFrom: "Discovery from",
    budgetAbove:
      "That sits above the budget you mentioned. Scope moves the price, not the conversation — tell us what matters most and we will propose a smaller first phase at the same rates.",
    notQuote: "A preliminary estimate, not a quote. A real proposal follows a short conversation about scope.",
    payToggle: "See estimated payment options",
    payTitle: "Estimated payment options",
    payEach: "per payment",
    payPlural: (n: number) => `${n} payments`,
    payNote: "Same total price either way. No interest, no fees, and no extra cost for paying over time.",
    payDisclaimer:
      "For planning only. These figures are divided from the estimated project range above and are not a quote, a credit approval or an offer of financing. Actual payment options are set out in your written proposal and agreement.",
    payLonger:
      "Business clients can ask about a longer schedule in the written proposal.",
    shareTitle: "Share this estimate",
    shareCopy: "Copy link",
    shareCopied: "Link copied",
    shareEmail: "Email it",
    shareNative: "Share",
    cta: "Get a real project estimate",
    ctaNote: "Your answers carry across — you will not be asked any of this twice.",
    restart: "Start over",
    error: "We could not work that out. Try again in a moment.",
    notIncluded: "Not included",
    rangeMeaning: "What this range means",
    towardLower:
      "Most straightforward projects with the scope you selected land toward the lower or middle of this range.",
    lowMeans: "Toward the lower end",
    highMeans: "Toward the higher end",
    couldAdd: "You could also add",
    model: "Pricing model",
    setupTitle: "What we'd actually build",
    setupWhy: "Why it fits",
    setupComplexity: "Complexity",
    setupConfidence: "How firmly we'd hold this",
    setupYouManage: "What you'll be able to manage",
    setupWeHandle: "What StillAwake handles",
    setupNotNeeded: "Why we aren't adding more",
    setupNotNeededNote:
      "A good recommendation contains fewer things, not more. Each of these is something we would not build for you, and the reason why.",
    setupAlternative: "The alternative we considered",
    setupAltWhy: "Why we didn't choose it",
    setupOpen: "What could still change this",
    setupTech: "View technical details",
    setupTechNote: "The stack, layer by layer. Nothing here changes the recommendation above.",
    setupRead: "Worth reading next",
    setupVersion: "Recommendation model",
    setupWhyThis: "Why this setup, and not a bigger one",
  },
  fr: {
    of: "sur",
    back: "Retour",
    next: "Continuer",
    skip: "Aucun de ceux-ci",
    pickOne: "Choisissez-en au moins un pour continuer.",
    calculate: "Voir mon estimation",
    calculating: "Calcul en cours",
    yourEstimate: "Fourchette estimée du projet",
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
      "Une estimation préliminaire, pas une soumission. Une vraie proposition suit une courte discussion sur la portée.",
    payToggle: "Voir les options de paiement estimées",
    payTitle: "Options de paiement estimées",
    payEach: "par versement",
    payPlural: (n: number) => `${n} versements`,
    payNote:
      "Le prix total reste le même. Aucun intérêt, aucuns frais, et rien de plus à payer parce que vous étalez les versements.",
    payDisclaimer:
      "À titre indicatif seulement. Ces montants sont divisés à partir de la fourchette estimée ci-dessus : ce n'est ni une soumission, ni une approbation de crédit, ni une offre de financement. Les options de paiement réelles sont établies dans votre proposition écrite et votre entente.",
    payLonger:
      "Les entreprises peuvent demander un échéancier plus long dans la proposition écrite.",
    shareTitle: "Partager cette estimation",
    shareCopy: "Copier le lien",
    shareCopied: "Lien copié",
    shareEmail: "Envoyer par courriel",
    shareNative: "Partager",
    cta: "Obtenir une vraie estimation",
    ctaNote: "Vos réponses vous suivent — on ne vous redemandera rien de tout ça.",
    restart: "Recommencer",
    error: "On n'a pas pu calculer ça. Réessayez dans un instant.",
    notIncluded: "Non inclus",
    rangeMeaning: "Ce que cette fourchette signifie",
    towardLower:
      "La plupart des projets simples avec la portée que vous avez choisie se situent dans le bas ou le milieu de cette fourchette.",
    lowMeans: "Vers le bas de la fourchette",
    highMeans: "Vers le haut de la fourchette",
    couldAdd: "Vous pourriez aussi ajouter",
    model: "Modèle tarifaire",
    setupTitle: "Ce qu'on bâtirait réellement",
    setupWhy: "Pourquoi ça convient",
    setupComplexity: "Complexité",
    setupConfidence: "À quel point on y tient",
    setupYouManage: "Ce que vous pourrez gérer",
    setupWeHandle: "Ce dont StillAwake s'occupe",
    setupNotNeeded: "Pourquoi on n'en ajoute pas plus",
    setupNotNeededNote:
      "Une bonne recommandation contient moins de choses, pas plus. Chacune d'elles est quelque chose qu'on ne vous bâtirait pas, avec la raison.",
    setupAlternative: "L'option qu'on a envisagée",
    setupAltWhy: "Pourquoi on ne l'a pas retenue",
    setupOpen: "Ce qui pourrait encore changer ça",
    setupTech: "Voir les détails techniques",
    setupTechNote: "La pile, couche par couche. Rien ici ne change la recommandation ci-dessus.",
    setupRead: "À lire ensuite",
    setupVersion: "Modèle de recommandation",
    setupWhyThis: "Pourquoi cette configuration, et pas une plus grosse",
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
  lowAssumption: string | null;
  highAssumption: string | null;
  possibleAdditions: string[];
  summary: string[];
  includes: string[];
  drivers: string[];
  caveats: string[];
  recurring: { label: string; monthly: number | null; monthlyLabel: string | null }[];
  budgetSignal: "fits" | "above" | "below" | null;
  pricingVersion: string;
  /** Null when the recommender failed. The estimate still stands on its own. */
  architecture: PresentedRecommendation | null;
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
  /* The options list scrolls inside a fixed-height card, so a new question has
     to start at the top — otherwise answering a long question leaves the next
     one already scrolled halfway down. */
  const scrollRef = useRef<HTMLDivElement>(null);
  /* The card itself, so the flow can plant it in the middle of the screen. */
  const shellRef = useRef<HTMLDivElement>(null);
  /* Planting happens once. Re-centring on every answer would yank the page
     under someone who had deliberately scrolled to read the help text. */
  const planted = useRef(false);

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
    scrollRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });

    /* The card lives below the page intro, so at rest it sits several hundred
       pixels down. Once someone actually starts answering, put it in the middle
       of the screen and leave it there — the height is constant, so from that
       point on nothing moves and they never have to scroll back to it.
       Gated on safeIndex > 0 because this effect also runs on mount, and
       yanking the page down before anyone has touched the thing is worse than
       leaving it where it is. */
    if (!planted.current && safeIndex > 0 && shellRef.current) {
      planted.current = true;
      const box = shellRef.current.getBoundingClientRect();
      const alreadyCentred = box.top > -40 && box.top < window.innerHeight * 0.25;
      if (!alreadyCentred) {
        shellRef.current.scrollIntoView({
          block: "center",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      }
    }
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

  /* Long lists keep one option per row and shrink the rows instead. Twelve
     stacked rows at full size do not fit a phone, and the alternatives — a
     second column or a scrollbar — both make options easy to miss. */
  const optionCount = current?.options.length ?? 0;
  const dense = optionCount > 6;
  /**
   * A third tier, for the one list that outgrew the second.
   *
   * "What does the website need to do?" now carries thirteen options, and at
   * thirteen the dense layout pushed the Continue button 49px below the fold
   * on a 720px-tall viewport — which is the exact failure the last several
   * rounds of work on this card were fixing. The rule stays what it was: no
   * second column and no scrollbar, because an option you have to hunt for is
   * an option nobody picks. So the rows get shorter instead.
   *
   * The floor is deliberate. At `[@media(max-height:720px)]` a row is ~31px
   * tall, which clears the 24px minimum target size (WCAG 2.5.8 AA) with room
   * to spare; a fourth tier below this one would not, so the next list that
   * outgrows this needs a different answer rather than tighter padding.
   */
  const veryDense = optionCount > 12;
  const picked = current?.kind === "multi" ? ((answers[current.id] as string[] | undefined)?.length ?? 0) : 0;
  const blocked = current?.kind === "multi" && !current.optional && picked === 0;

  /* Until a service is chosen the flow genuinely does not know how long it is —
     the depth questions do not exist yet. Claiming "1 of 1" would be a lie that
     also renders a full progress bar on the first screen, so the total is
     withheld and the bar shows a token amount of progress instead. */
  const totalKnown = (answers.services as string[] | undefined)?.length ? true : false;
  const progress = totalKnown ? ((safeIndex + 1) / questions.length) * 100 : 8;

  return (
    <Shell steady cardRef={shellRef}>
      <div className="flex shrink-0 items-center justify-between gap-4 text-[11px] uppercase tracking-[0.28em] text-[#8C8080]">
        <span className="tabular-nums">
          {totalKnown ? `${safeIndex + 1} ${T.of} ${questions.length}` : safeIndex + 1}
        </span>
        {safeIndex > 0 && (
          <button type="button" onClick={() => setIndex(safeIndex - 1)} className={`${FOCUS} rounded-full px-2 py-1 transition hover:text-white`}>
            ← {T.back}
          </button>
        )}
      </div>

      <div className="mt-4 h-px w-full shrink-0 overflow-hidden bg-white/10">
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
        <div
          key={current.id}
          ref={scrollRef}
          className="motion-safe:animate-[sam-rise_.45s_cubic-bezier(.16,1,.3,1)_both]"
        >
          <h2
            ref={headingRef}
            tabIndex={-1}
            className={`geist font-light leading-snug text-white outline-none ${
              dense
                ? "mt-3 text-2xl sm:mt-5 sm:text-3xl [@media(min-height:950px)]:mt-6"
                : "mt-4 text-2xl sm:mt-6 sm:text-3xl"
            }`}
          >
            {current.prompt[locale]}
          </h2>
          {current.help && (
            /* On a long list this line competes with a row, so it goes only on
               the screens that cannot spare one — hidden by height, not by a
               flag, so a tall screen keeps the guidance. */
            <p
              className={`mt-2.5 max-w-xl text-sm leading-relaxed text-[#C7B9B9] [@media(max-height:720px)]:mt-1.5 [@media(max-height:720px)]:text-xs ${
                dense ? "hidden [@media(min-height:950px)]:block" : ""
              }`}
            >
              {current.help[locale]}
            </p>
          )}

          {/* One option per row, always — a stacked list is read top to bottom
              and nothing is missed. Long lists get shorter rows rather than a
              second column or a scrollbar; an option you have to hunt for is an
              option nobody picks. */}
          <div
            className={`grid [@media(max-height:720px)]:mt-3 ${dense ? "mt-2 [@media(min-height:950px)]:mt-5" : "mt-4 sm:mt-5"} ${
              veryDense
                ? "gap-1 [@media(max-height:850px)]:gap-px [@media(min-height:950px)]:gap-2"
                : dense
                  ? "gap-1 [@media(max-height:720px)]:gap-0.5 [@media(min-height:950px)]:gap-2.5"
                  : "gap-2.5 [@media(max-height:720px)]:gap-1.5 [@media(min-height:900px)]:gap-3"
            }`}
          >
            {current.options.map((o) => {
              const on =
                current.kind === "single"
                  ? answers[current.id] === o.key
                  : Array.isArray(answers[current.id]) && (answers[current.id] as string[]).includes(o.key);
              return (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => choose(current, o.key)}
                  role={current.kind === "multi" ? "checkbox" : "radio"}
                  aria-checked={on}
                  aria-pressed={on}
                  /* StudioChoice, verbatim: a right-hand dot rather than a
                     left checkbox, and colour carrying the state. Padding
                     still steps down where the screen is short, because the
                     Studio flow never has to fit twelve options at once. */
                  className={`group relative w-full rounded-2xl border text-left transition-colors duration-150 ${FOCUS} ${
                    veryDense
                      ? "px-5 py-1.5 [@media(max-height:850px)]:py-1 [@media(min-height:950px)]:py-3.5"
                      : dense
                        ? "px-5 py-2 [@media(max-height:720px)]:py-1.5 [@media(min-height:950px)]:py-4"
                        : "px-5 py-4 [@media(max-height:720px)]:py-2.5 [@media(min-height:1100px)]:py-5"
                  } ${
                    on
                      ? "border-[#D71920]/70 bg-[#D71920]/[0.08] shadow-[0_0_30px_-12px_rgba(215,25,32,0.5)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <span
                    className={`block pr-6 text-[15px] leading-snug ${
                      on ? "text-white" : "text-[#C7B9B9] group-hover:text-white"
                    }`}
                  >
                    {o.label[locale]}
                  </span>
                  {o.blurb && !dense && (
                    <span className="mt-1 block pr-6 text-xs text-[#8a8a8a]">{o.blurb[locale]}</span>
                  )}
                  <span
                    aria-hidden
                    className={`absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-all duration-150 ${
                      on ? "bg-[#D71920] shadow-[0_0_10px_rgba(215,25,32,0.8)]" : "bg-white/15"
                    }`}
                  />
                </button>
              );
            })}
          </div>

        </div>
      )}

      {/* Footer stays pinned outside the scroll region: on a short screen the
          advance button used to sit below the fold of a twelve-option list. */}
      {(current?.kind === "multi" && !onLast) || (onLast && complete) || state === "error" ? (
        <div className="shrink-0 border-t border-white/10 pt-3 [@media(max-height:720px)]:pt-3 [@media(min-height:950px)]:pt-5">
          {current?.kind === "multi" && !onLast && (
            <>
              <button
                type="button"
                onClick={advance}
                disabled={blocked}
                className={`${FOCUS} inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-[#D71920]/60 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15 disabled:hover:bg-transparent`}
              >
                {picked || !current.optional ? T.next : T.skip} <span aria-hidden>→</span>
              </button>
              {blocked && <p className="mt-3 text-xs text-[#8C8080]">{T.pickOne}</p>}
            </>
          )}

      {onLast && complete && (
        <button
          type="button"
          onClick={submit}
          disabled={state === "loading"}
          className={`${FOCUS} group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D71920] px-8 py-4 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-70 sm:w-auto`}
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
        </div>
      ) : null}
    </Shell>
  );
}

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D71920]";

/*
 * SHORT-VIEWPORT CLASSES ARE WRITTEN OUT IN FULL, EVERY TIME.
 *
 * Tailwind scans source text for complete class names, so a prefix built by
 * concatenation generates no CSS at all — the styles silently do not exist. A
 * landscape phone or a 568px handset cannot show five full-size options AND
 * keep the card centred, so on those the rows get shorter rather than the card
 * getting a scrollbar; a hidden option is one nobody picks.
 */

/**
 * Card chrome, shared by the question and result states so they feel continuous.
 *
 * `steady` is what stops the screen jumping. Question screens have wildly
 * different option counts — twelve on "what do you need?", four on "how ready is
 * your content?" — and letting the card size itself to each one moved the whole
 * page by ~200px on every answer. In steady mode the card takes a constant
 * height instead, and the options scroll inside it.
 *
 * The height is capped against the viewport, so the card never grows past the
 * screen: at 320x720 it used to render 781px tall and simply did not fit. `svh`
 * rather than `vh` because on iOS and Android `vh` is the LARGE viewport, which
 * counts space behind the address bar — the card would be clipped until the user
 * scrolled and the bar collapsed.
 *
 * The result state deliberately opts out: it is long-form content someone reads
 * and scrolls, not a step in a sequence.
 */
function Shell({
  children,
  steady = false,
  cardRef,
}: {
  children: React.ReactNode;
  steady?: boolean;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={cardRef} className={steady ? "flex w-full justify-center" : "flex justify-center py-6"}>
      <div
        className={`studio-glass relative w-full overflow-hidden rounded-3xl backdrop-blur-[36px] backdrop-saturate-[1.3] max-sm:backdrop-blur-[20px] max-sm:backdrop-saturate-[1.2] ${
          steady
            ? "flex flex-col px-6 py-8 sm:px-10 sm:py-12 [@media(max-height:720px)]:px-5 [@media(max-height:720px)]:py-5"
            : "px-6 py-8 sm:px-10 sm:py-12"
        }`}
      >
        {/* One soft light source behind the card. Purely decorative. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#D71920]/10 blur-3xl"
        />
        <div className={steady ? "relative flex min-h-0 flex-1 flex-col" : "relative"}>{children}</div>
        <style>{KEYFRAMES}</style>
      </div>
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
  const topRef = useRef<HTMLDivElement>(null);

  /* The result runs well past a screen, so centring it would land the reader in
     the middle of the scope list with the price above the fold line. Put its top
     at the top of the screen instead. */
  useEffect(() => {
    topRef.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, []);
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

  /* No badge. The eyebrow already says "estimated project range", and there is
     no second thing worth saying — every result is a range now, including the
     entry tier, whose band is genuinely $1,800–$3,000 rather than a fixed
     price. Calling that "fixed price" while showing one number was the old
     capped-product framing and it read as a promise we had not made. */
  const badge = null;

  return (
    <div ref={topRef} className="scroll-mt-24 motion-safe:animate-[sam-rise_.5s_cubic-bezier(.16,1,.3,1)_both]">
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
          {result.needsDiscovery ? (
            fmt(counted)
          ) : (
            <>
              {/* Break BEFORE the dash. Left alone this strands a dangling "–"
                  at the end of the first line on any narrow card. */}
              {fmt(counted)}{" "}
              <span className="whitespace-nowrap">
                <span className="text-[#8C8080]">–</span>&nbsp;{fmt(result.high)}
              </span>
            </>
          )}
        </p>

        {result.summary.length > 0 && (
          <p className="mt-4 text-[15px] leading-7 text-[#C7B9B9]">{result.summary.join(" · ")}</p>
        )}

        {!result.needsDiscovery && (
          <PaymentOptions low={result.low} high={result.high} T={T} locale={locale} />
        )}

        {/* Directly under the number. Sharing is a reaction to seeing the
            price, and the detail sections below run to well over a thousand
            pixels — at the bottom of the card these were never found. */}
        <ShareEstimate result={result} T={T} locale={locale} />

        {!result.needsDiscovery && (result.lowAssumption || result.highAssumption) && (
          <div className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm leading-6 text-[#C7B9B9]">{T.towardLower}</p>
            <dl className="mt-4 space-y-2.5 text-sm">
              {result.lowAssumption && (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="shrink-0 text-[#8C8080]">{T.lowMeans}</dt>
                  <dd className="text-[#C7B9B9]">{result.lowAssumption}</dd>
                </div>
              )}
              {result.highAssumption && (
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="shrink-0 text-[#8C8080]">{T.highMeans}</dt>
                  <dd className="text-[#C7B9B9]">{result.highAssumption}</dd>
                </div>
              )}
            </dl>
          </div>
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

        {result.architecture && <RecommendedSetup setup={result.architecture} T={T} />}

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

        {result.possibleAdditions.length > 0 && !result.needsDiscovery && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.couldAdd}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {result.possibleAdditions.map((a) => (
                <li key={a} className="rounded-full border border-white/10 px-3 py-1.5 text-[13px] text-[#8C8080]">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}

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

/**
 * THE RECOMMENDED SETUP.
 *
 * This is the part of the result that is worth more than the price, and the
 * reason it is written the way it is: a prospect who has just been shown a
 * number is about to ask "and what would you actually build?". Answering that
 * with "Next.js, Supabase, Sanity, Stripe" tells them nothing they can act on.
 * Answering it with "a website you can edit yourself — and no database, no
 * logins and no payment setup, because nothing here needs them" tells them
 * what they are buying AND what they are not being sold.
 *
 * So the order is deliberate:
 *
 *   what it is → why it fits → what you can manage → what we handle →
 *   WHAT WE ARE NOT ADDING → the alternative we rejected → the stack
 *
 * "Why we aren't adding more" sits above the technical panel because it is the
 * section that earns the trust. Anyone can list technologies. Naming the four
 * we deliberately left out, with reasons, is checkable.
 *
 * The stack lives behind a disclosure with aria-expanded/aria-controls, so it
 * is operable from the keyboard and announced properly — and so nobody who did
 * not ask for proper nouns is shown any.
 */
function RecommendedSetup({ setup, T }: { setup: PresentedRecommendation; T: Copy }) {
  const [open, setOpen] = useState(false);
  const panelId = "architecture-technical-panel";

  return (
    <section className="mt-9 border-t border-white/10 pt-8">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{T.setupTitle}</p>

      <h3 className="geist mt-4 text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl">
        {setup.headline}
      </h3>
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#C7B9B9]">{setup.summary}</p>

      {/* Straight into the technology guide's section for this exact answer.
          Sits directly under the recommendation because "why this?" is the
          next thing anyone thinks, and it should not require scrolling. */}
      <Link
        href={setup.whyThisHref}
        className={`${FOCUS} mt-4 inline-flex items-center gap-1.5 text-sm text-[#D71920] underline-offset-4 transition hover:underline`}
      >
        {T.setupWhyThis} <span aria-hidden>→</span>
      </Link>

      {/* Complexity and confidence sit together: a reader deciding whether to
          trust this needs both, and neither means much alone. */}
      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.25em] text-[#8C8080]">{T.setupComplexity}</dt>
          <dd className="geist mt-1.5 text-lg font-black tracking-[-0.03em]">{setup.complexity}</dd>
        </div>
        <div className="max-w-md">
          <dt className="text-[11px] uppercase tracking-[0.25em] text-[#8C8080]">{T.setupConfidence}</dt>
          <dd className="geist mt-1.5 text-lg font-black tracking-[-0.03em]">{setup.confidence}</dd>
          <dd className="mt-1 text-xs leading-5 text-[#8C8080]">{setup.confidenceNote}</dd>
        </div>
      </dl>

      {setup.reasons.length > 0 && (
        <div className="mt-8">
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.setupWhy}</h4>
          <ul className="mt-4 space-y-2.5">
            {setup.reasons.map((r) => (
              <li key={r} className="flex max-w-2xl gap-2.5 text-sm leading-6 text-[#C7B9B9]">
                <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#D71920]" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(setup.clientManages.length > 0 || setup.studioHandles.length > 0) && (
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {setup.clientManages.length > 0 && (
            <section>
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.setupYouManage}</h4>
              <ul className="mt-4 space-y-2">
                {setup.clientManages.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm text-[#C7B9B9]">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-emerald-300/70" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {setup.studioHandles.length > 0 && (
            <section>
              <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.setupWeHandle}</h4>
              <ul className="mt-4 space-y-2">
                {setup.studioHandles.map((s) => (
                  <li key={s} className="flex gap-2.5 text-sm text-[#C7B9B9]">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/30" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* The section that makes the rest believable. */}
      {setup.notNeeded.length > 0 && (
        <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-5 sm:p-6">
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-emerald-300/80">{T.setupNotNeeded}</h4>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#C7B9B9]">{T.setupNotNeededNote}</p>
          <dl className="mt-5 space-y-4">
            {setup.notNeeded.map((n) => (
              <div key={n.label}>
                <dt className="text-sm font-semibold text-white">{n.label}</dt>
                <dd className="mt-1 max-w-2xl text-sm leading-6 text-[#8C8080]">{n.why}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {setup.alternative && (
        <div className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.setupAlternative}</h4>
          <p className="mt-3 text-sm font-semibold text-white">{setup.alternative.label}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[#8C8080]">{T.setupAltWhy}</p>
          <p className="mt-1.5 text-sm leading-6 text-[#C7B9B9]">{setup.alternative.why}</p>
        </div>
      )}

      {setup.openQuestions.length > 0 && (
        <div className="mt-8 max-w-2xl">
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.setupOpen}</h4>
          <ul className="mt-4 space-y-2.5">
            {setup.openQuestions.map((q) => (
              <li key={q} className="flex gap-2.5 text-sm leading-6 text-[#8C8080]">
                <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-amber-300/60" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className={`${FOCUS} inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-[#C7B9B9] transition hover:border-white/30 hover:text-white`}
        >
          {T.setupTech}
          <span aria-hidden className={`text-xs transition-transform motion-safe:duration-200 ${open ? "rotate-180" : ""}`}>
            ↓
          </span>
        </button>

        {open && (
          <div
            id={panelId}
            className="mt-4 max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-5 motion-safe:animate-[sam-rise_.35s_cubic-bezier(.16,1,.3,1)_both] sm:p-6"
          >
            <p className="text-xs leading-5 text-[#8C8080]">{T.setupTechNote}</p>
            <dl className="mt-5 space-y-4">
              {setup.technical.map((row) => (
                <div key={row.layer} className="border-b border-white/[0.07] pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <dt className="text-sm text-[#8C8080]">{row.layer}</dt>
                    <dd
                      className={`text-sm font-semibold ${
                        row.choice ? "text-white" : "text-emerald-300"
                      }`}
                    >
                      {row.choice ?? row.status}
                    </dd>
                  </div>
                  {row.why && <p className="mt-1.5 text-xs leading-5 text-[#8C8080]">{row.why}</p>}
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {/* Contextual, never four identical calls to action. A Shopify answer and
          a customer-portal answer have almost nothing useful in common. */}
      {setup.links.length > 0 && (
        <div className="mt-8">
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#8C8080]">{T.setupRead}</h4>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {setup.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${FOCUS} rounded-xl border border-white/10 px-4 py-3 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/50 hover:text-white`}
              >
                {l.label} <span aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="mt-7 text-[10px] uppercase tracking-[0.25em] text-[#5a5252]">
        {T.setupVersion} {setup.version}
      </p>
    </section>
  );
}

/**
 * Estimated payment options — collapsed by default.
 *
 * WHY THESE SCHEDULES AND NOT OTHERS. The public calculator cannot know who is
 * reading it, so what it advertises has to be safe for a consumer in the
 * strictest jurisdiction we researched. Regulation Z §1026.2(a)(17)(i) treats a
 * plan payable "in more than four installments" as consumer credit even with no
 * finance charge, so four is the ceiling here. See docs/payment-compliance.md.
 *
 * The numbers are divided from the RANGE, never from its midpoint: low ÷ N and
 * high ÷ N. Dividing the midpoint would turn an estimate into what looks like a
 * quoted payment, which is the exact impression this section must not create.
 *
 * Disclosure is a button with aria-expanded/aria-controls rather than a bare
 * toggle, so it is announced and operable from the keyboard. Motion sits behind
 * motion-safe:.
 */
function PaymentOptions({
  low,
  high,
  T,
  locale,
}: {
  low: number;
  high: number;
  T: (typeof UI)[Locale];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const panelId = "payment-options-panel";

  const options = PUBLIC_PAYMENT_COUNTS.map((count) => ({
    count,
    low: Math.round(low / count),
    high: Math.round(high / count),
  })).filter((o) => o.low >= MIN_PAYMENT);

  if (options.length === 0) return null;

  return (
    <div className="mt-6 max-w-2xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`${FOCUS} inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-[#C7B9B9] transition hover:border-white/30 hover:text-white`}
      >
        {T.payToggle}
        <span aria-hidden className={`text-xs transition-transform motion-safe:duration-200 ${open ? "rotate-180" : ""}`}>
          ↓
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-5 motion-safe:animate-[sam-rise_.35s_cubic-bezier(.16,1,.3,1)_both] sm:p-6"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C8080]">{T.payTitle}</p>

          <dl className="mt-4 space-y-4">
            {options.map((o) => (
              <div
                key={o.count}
                className="flex flex-col gap-1 border-b border-white/[0.07] pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <dt className="text-sm text-[#C7B9B9]">{T.payPlural(o.count)}</dt>
                {/* emerald-300 on near-black is ~12:1, comfortably past WCAG AA.
                    Reusing the design system's existing success green rather
                    than introducing a second one. */}
                {/* The figure is one unwrappable unit and the label sits under
                    it on a narrow phone. Left to wrap freely at 320px the amount
                    itself broke across three ragged lines. */}
                <dd className="geist text-lg font-black tabular-nums text-emerald-300 sm:text-xl">
                  <span className="whitespace-nowrap">
                    {formatCad(o.low, locale)} <span className="text-emerald-300/50">–</span>{" "}
                    {formatCad(o.high, locale)}
                  </span>{" "}
                  <span className="block text-xs font-medium text-[#8C8080] sm:inline">
                    {T.payEach}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm leading-6 text-[#C7B9B9]">{T.payNote}</p>
          <p className="mt-2 text-xs leading-5 text-[#8C8080]">{T.payLonger}</p>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-[#8C8080]">
            {T.payDisclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Copy text, with a fallback for the cases the async Clipboard API refuses.
 *
 * navigator.clipboard requires a secure context AND a focused document, so it
 * rejects outright when the page is not frontmost — which is exactly when
 * someone is arranging windows to paste the thing somewhere. The old selection
 * trick still works there. Returns whether it truly copied.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/**
 * Share the estimate.
 *
 * The link carries the ANSWER KEYS, not the price — the same rule the rest of
 * the calculator follows. A recipient's browser asks the server for the range,
 * so a shared URL cannot be edited into a different number and then screenshot
 * as though we had quoted it.
 *
 * Red on white text because these have to be findable on a dark card that is
 * already carrying a red primary CTA; a ghost button here disappears.
 */
function ShareEstimate({
  result,
  T,
  locale,
}: {
  result: Result;
  T: (typeof UI)[Locale];
  locale: Locale;
}) {
  const [copied, setCopied] = useState(false);

  /* The URL is read at click time rather than held in state — it cannot change
     under us here, and storing it would mean a render pass that exists only to
     learn something the browser already knows. */
  const currentUrl = () => (typeof window === "undefined" ? "" : window.location.href);

  /* Whether the OS share sheet exists is a browser capability, not app state.
     useSyncExternalStore is how you read one without a hydration mismatch and
     without setting state inside an effect. The server answer is "no", so the
     button is absent in the HTML and appears once hydrated. */
  const canNativeShare = useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );

  const subject = locale === "fr" ? "Notre estimation de projet" : "Our project estimate";
  const range = `${formatCad(result.low, locale)} – ${formatCad(result.high, locale)}`;

  const RED =
    "inline-flex min-h-11 items-center gap-2 rounded-full bg-[#D71920] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110";

  return (
    <div className="mt-7 border-t border-white/10 pt-6">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#8C8080]">{T.shareTitle}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => {
            void copyToClipboard(currentUrl()).then((ok) => {
              /* Only claim success when it actually copied. Flashing the tick
                 regardless would tell someone the link is on their clipboard
                 when it is not. */
              if (!ok) return;
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          className={`${FOCUS} ${RED}`}
        >
          {/* Two overlapping squares, becoming a tick once copied. Drawn rather
              than typed so it keeps its weight against the bold label instead
              of rendering as whatever glyph the platform substitutes. */}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {copied ? (
              <path d="M3 8.5 6.2 11.7 13 4.9" />
            ) : (
              <>
                <rect x="5.6" y="5.6" width="8.4" height="8.4" rx="1.8" />
                <path d="M10.9 3.1a1.8 1.8 0 0 0-1.3-1.1H3.8A1.8 1.8 0 0 0 2 3.8v5.8c0 .6.4 1.1 1 1.3" />
              </>
            )}
          </svg>
          {T.shareCopy}
        </button>

        {canNativeShare && (
          <button
            type="button"
            onClick={() => {
              void navigator
                .share({ title: subject, text: `${subject}: ${range}`, url: currentUrl() })
                .catch(() => {
                  /* The user dismissed the sheet. Not an error worth reporting. */
                });
            }}
            className={`${FOCUS} ${RED}`}
          >
            {T.shareNative}
            <span aria-hidden>↗</span>
          </button>
        )}
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? T.shareCopied : ""}
      </p>
    </div>
  );
}
