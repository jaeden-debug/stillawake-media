"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { resolve, type Path } from "@/lib/tech-stack/tree";
import { ANCHORS, LEVEL_ORDER, type TechStackContent } from "@/lib/tech-stack/types";

/**
 * The decision tree, as an interface.
 *
 * One question at a time, each option a real <button> inside a <fieldset>
 * with a <legend>, so the whole thing is operable from the keyboard and reads
 * correctly to a screen reader without any ARIA scaffolding. Nothing is
 * stored, nothing is posted, and there is no email gate in front of the
 * answer — the reader gets the recommendation whether or not they ever
 * contact us.
 *
 * All the logic lives in `tree.ts`; this component holds an ordered list of
 * answers and renders whatever the tree says comes next. That means the copy
 * cannot get out of step with the branching, and the same component serves
 * both languages.
 */
export function DecisionTree({
  content,
  calculatorHref,
}: {
  content: TechStackContent;
  calculatorHref: string;
}) {
  const [path, setPath] = useState<Path>([]);
  const state = useMemo(() => resolve(path), [path]);
  const ui = content.chrome.ui;

  const answer = (question: string, key: string) =>
    setPath((current) => [...current, { question: question as Path[number]["question"], answer: key }]);

  const back = () => setPath((current) => current.slice(0, -1));
  const restart = () => setPath([]);

  /** The trail so far, in the reader's own words rather than as answer keys. */
  const trail = path
    .map(({ question, answer: key }) => content.questions[question]?.answers[key]?.label)
    .filter((label): label is string => Boolean(label));

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
      {trail.length > 0 ? (
        <div className="mb-6 border-b border-white/10 pb-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C8080]">
            {ui.treeAnswerLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {trail.map((label, i) => (
              <li
                key={`${label}-${i}`}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#C7B9B9]"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.done ? (
        <Outcome
          content={content}
          outcomeId={state.outcome}
          calculatorHref={calculatorHref}
          onBack={back}
          onRestart={restart}
        />
      ) : (
        <fieldset className="border-0 p-0">
          <legend className="geist text-2xl font-black leading-tight tracking-[-0.04em] md:text-3xl">
            {content.questions[state.question].prompt}
          </legend>
          {content.questions[state.question].help ? (
            <p className="mt-3 text-sm text-[#8C8080]">{content.questions[state.question].help}</p>
          ) : null}

          <div className="mt-6 grid gap-3">
            {state.answers.map((key) => {
              const option = content.questions[state.question].answers[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => answer(state.question, key)}
                  className="rounded-xl border border-white/15 bg-white/[0.02] p-4 text-left transition hover:border-[#D71920]/60 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D71920]"
                >
                  <span className="block font-semibold text-white">{option.label}</span>
                  {option.blurb ? (
                    <span className="mt-1 block text-sm text-[#8C8080]">{option.blurb}</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {path.length > 0 ? (
            <button
              type="button"
              onClick={back}
              className="mt-6 text-sm text-[#8C8080] underline underline-offset-4 transition hover:text-white"
            >
              ← {ui.treeBack}
            </button>
          ) : null}
        </fieldset>
      )}
    </div>
  );
}

function Outcome({
  content,
  outcomeId,
  calculatorHref,
  onBack,
  onRestart,
}: {
  content: TechStackContent;
  outcomeId: keyof TechStackContent["outcomes"];
  calculatorHref: string;
  onBack: () => void;
  onRestart: () => void;
}) {
  const ui = content.chrome.ui;
  const outcome = content.outcomes[outcomeId];
  const level = content.levels[outcome.level];
  const scenario = content.scenarios[outcome.scenario];
  const levelNumber = LEVEL_ORDER.indexOf(outcome.level) + 1;

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">
        {ui.levelBadge} {levelNumber}
      </p>
      <h3 className="geist mt-4 text-2xl font-black leading-tight tracking-[-0.05em] md:text-3xl">
        {outcome.title}
      </h3>

      <div className="mt-6 rounded-xl border border-[#D71920]/30 bg-[#D71920]/[0.06] p-5">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#D71920]">{ui.treeStackLabel}</p>
        <p className="mt-2 text-[#E6DCDC]">{outcome.stack}</p>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8C8080]">
            {ui.treeWhyLabel}
          </h4>
          <p className="mt-2 text-[#C7B9B9]">{outcome.why}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#8C8080]">
            {ui.treeChangesLabel}
          </h4>
          <p className="mt-2 text-[#C7B9B9]">{outcome.changesIf}</p>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={`#${ANCHORS.scenario(outcome.scenario)}`}
          className="rounded-full bg-[#D71920] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b5141b]"
        >
          {ui.treeReadMore}: {scenario.name}
        </a>
        <a
          href={`#${ANCHORS.level(outcome.level)}`}
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50"
        >
          {level.name}
        </a>
        <Link
          href={calculatorHref}
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50"
        >
          {ui.treeCalculator}
        </Link>
      </div>

      <p className="mt-6 text-xs text-[#5F5757]">{ui.treeDisclaimer}</p>

      <div className="mt-6 flex gap-5 border-t border-white/10 pt-5 text-sm text-[#8C8080]">
        <button
          type="button"
          onClick={onBack}
          className="underline underline-offset-4 transition hover:text-white"
        >
          ← {ui.treeBack}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="underline underline-offset-4 transition hover:text-white"
        >
          {ui.treeRestart}
        </button>
      </div>
    </div>
  );
}
