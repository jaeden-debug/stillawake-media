import Link from "next/link";

import { DecisionTree } from "@/components/tech-stack/decision-tree";
import {
  ANCHORS,
  APPROACH_ORDER,
  CRITERION_ORDER,
  LEVEL_ORDER,
  type ApproachId,
  type Cell,
  type CriterionId,
  type LayerId,
  type LevelId,
  type MythId,
  type Rating,
  type ScenarioId,
  type StackLayer,
  type TechStackContent,
} from "@/lib/tech-stack/types";

/**
 * The technology decision resource, rendered.
 *
 * Server-rendered apart from the decision tree, which is the only part that
 * needs state. Progressive disclosure is native <details>/<summary> rather
 * than a component with an open flag: it costs no JavaScript, it is
 * keyboard-operable and screen-reader-correct for free, and — the reason that
 * actually matters on a page like this — the content inside a closed
 * <details> is still in the HTML, so search crawlers and answer engines read
 * all of it.
 *
 * Both languages render from here. The copy lives in `en.ts` and `fr.ts`;
 * nothing in this file is language-specific, which is what stops the French
 * page quietly becoming a shorter version of the English one.
 */

const RATING_STYLE: Record<Rating, string> = {
  strong: "border-[#3FA37A]/40 bg-[#3FA37A]/10 text-[#8FD9BB]",
  workable: "border-white/20 bg-white/[0.04] text-[#C7B9B9]",
  limited: "border-[#C98A2E]/40 bg-[#C98A2E]/10 text-[#E3B978]",
  wrong_tool: "border-[#D71920]/45 bg-[#D71920]/10 text-[#F09098]",
};

/**
 * A rating shown as a dot as well as a colour and a word.
 *
 * Colour alone would fail anyone who cannot distinguish these hues, so the
 * word is always present and the legend defines it. The dot is decorative and
 * hidden from assistive technology.
 */
function RatingChip({ rating, label }: { rating: Rating; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${RATING_STYLE[rating]}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

/** The layer-band diagram. Plain elements rather than SVG, so it reflows on a phone. */
function StackDiagram({ layers, label, absentLabel }: { layers: StackLayer[]; label: string; absentLabel: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C8080]">{label}</p>
      <ul className="mt-3 space-y-1.5">
        {layers.map((layer) => (
          <li
            key={layer.role}
            className={`flex flex-col gap-0.5 rounded-lg border px-4 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 ${
              layer.absent
                ? "border-dashed border-white/10 text-[#5F5757]"
                : "border-white/10 bg-white/[0.03] text-[#C7B9B9]"
            }`}
          >
            <span className={`text-xs uppercase tracking-[0.15em] ${layer.absent ? "" : "text-white"}`}>
              {layer.role}
            </span>
            <span className="text-sm sm:text-right">
              {layer.fill}
              {layer.absent ? <span className="sr-only"> — {absentLabel}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bullets({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[#C7B9B9]">
          <span
            aria-hidden="true"
            className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${muted ? "bg-[#5F5757]" : "bg-[#D71920]"}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechStackGuide({
  content,
  calculatorHref,
  pricingHref,
  prerequisite,
}: {
  content: TechStackContent;
  calculatorHref: string;
  pricingHref: string;
  /** The requirements guide this page assumes has already been read. */
  prerequisite: { label: string; href: string; lead: string };
}) {
  const { chrome, levels, scenarios, matrix, layers, myths } = content;
  const ui = chrome.ui;

  return (
    <>
      {/* ── Opening ──────────────────────────────────────────────────────── */}
      <section className="px-6 pb-14 pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">{chrome.eyebrow}</p>
          <h1 className="geist mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-6xl">
            {chrome.h1}
          </h1>
          <p className="mt-7 text-lg text-[#C7B9B9]">{chrome.standfirst}</p>

          <div className="mt-6 space-y-5 text-[#C7B9B9]">
            {chrome.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {/* The one link back to the requirements cluster. Framed as a
              prerequisite rather than as related reading, so the dominant flow
              between the two pages stays requirements → technology. */}
          <p className="mt-6 text-sm text-[#8C8080]">
            {prerequisite.lead}{" "}
            <Link
              href={prerequisite.href}
              className="text-[#C7B9B9] underline underline-offset-4 transition hover:text-white"
            >
              {prerequisite.label}
            </Link>
            .
          </p>

          <nav aria-label={chrome.ui.readNext} className="mt-9 flex flex-wrap gap-2">
            {[
              [ui.treeHeading, ANCHORS.tree],
              [ui.ladderHeading, ANCHORS.ladder],
              [ui.scenariosHeading, ANCHORS.scenarios],
              [ui.matrixHeading, ANCHORS.matrix],
              [ui.layersHeading, ANCHORS.layers],
              [ui.mythsHeading, ANCHORS.myths],
            ].map(([label, anchor]) => (
              <a
                key={anchor}
                href={`#${anchor}`}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/60 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Decision tree ────────────────────────────────────────────────── */}
      <section id={ANCHORS.tree} className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
            {ui.treeHeading}
          </h2>
          <p className="mt-3 text-[#C7B9B9]">{ui.treeIntro}</p>
          <div className="mt-8">
            <DecisionTree content={content} calculatorHref={calculatorHref} />
          </div>
        </div>
      </section>

      {/* ── Simplicity ladder ────────────────────────────────────────────── */}
      <section id={ANCHORS.ladder} className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
            {ui.ladderHeading}
          </h2>
          <p className="mt-3 text-[#C7B9B9]">{ui.ladderIntro}</p>

          <div className="mt-9 space-y-4">
            {LEVEL_ORDER.map((id: LevelId, index) => {
              const level = levels[id];
              return (
                <details
                  key={id}
                  id={ANCHORS.level(id)}
                  className="group scroll-mt-28 rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-6 transition open:border-[#D71920]/40"
                >
                  <summary className="cursor-pointer list-none">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">
                      {ui.levelBadge} {index + 1}
                    </span>
                    <span className="geist mt-3 block text-xl font-black tracking-[-0.04em] md:text-2xl">
                      {level.name}
                    </span>
                    <span className="mt-2 block text-[#C7B9B9]">{level.summary}</span>
                    <span className="mt-3 block text-xs text-[#5F5757] group-open:hidden">
                      {level.examples}
                    </span>
                  </summary>

                  <div className="mt-6 space-y-6 border-t border-white/10 pt-6">
                    <p className="text-sm text-[#8C8080]">{level.examples}</p>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                        {ui.rightWhen}
                      </h4>
                      <Bullets items={level.rightWhen} />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                        {ui.outgrowWhen}
                      </h4>
                      <Bullets items={level.outgrowWhen} muted />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                          {ui.runningCost}
                        </h4>
                        <p className="mt-2 text-sm text-[#C7B9B9]">{level.runningCost}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                          {ui.whoEdits}
                        </h4>
                        <p className="mt-2 text-sm text-[#C7B9B9]">{level.whoEdits}</p>
                      </div>
                    </div>

                    <StackDiagram
                      layers={level.diagram}
                      label={ui.diagramLabel}
                      absentLabel={ui.absentLabel}
                    />
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Scenarios ────────────────────────────────────────────────────── */}
      <section id={ANCHORS.scenarios} className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
            {ui.scenariosHeading}
          </h2>
          <p className="mt-3 text-[#C7B9B9]">{ui.scenariosIntro}</p>

          <div className="mt-9 space-y-4">
            {(Object.keys(scenarios) as ScenarioId[]).map((id) => {
              const scenario = scenarios[id];
              const levelNumber = LEVEL_ORDER.indexOf(scenario.level) + 1;
              return (
                <details
                  key={id}
                  id={ANCHORS.scenario(id)}
                  className="group scroll-mt-28 rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-6 transition open:border-[#D71920]/40"
                >
                  <summary className="cursor-pointer list-none">
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="geist text-xl font-black tracking-[-0.04em] md:text-2xl">
                        {scenario.name}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#8C8080]">
                        {ui.levelBadge} {levelNumber}
                      </span>
                    </span>
                    <span className="mt-3 block text-[#C7B9B9]">{scenario.recommendation}</span>
                  </summary>

                  <div className="mt-6 space-y-6 border-t border-white/10 pt-6">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                        {ui.scenarioWho}
                      </h4>
                      <p className="mt-2 text-[#C7B9B9]">{scenario.who}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                        {ui.scenarioNeeds}
                      </h4>
                      <Bullets items={scenario.needs} />
                    </div>

                    <div className="rounded-xl border border-[#D71920]/30 bg-[#D71920]/[0.06] p-5">
                      <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#D71920]">
                        {ui.scenarioRecommendation}
                      </h4>
                      <p className="mt-2 font-semibold text-[#E6DCDC]">{scenario.recommendation}</p>
                      <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{scenario.why}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                        {ui.scenarioAlternatives}
                      </h4>
                      <dl className="mt-3 space-y-3">
                        {scenario.alternatives.map((alternative) => (
                          <div key={alternative.option} className="rounded-lg border border-white/10 p-4">
                            <dt className="font-semibold text-white">{alternative.option}</dt>
                            <dd className="mt-1 text-sm text-[#C7B9B9]">{alternative.when}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                          {ui.scenarioOverkill}
                        </h4>
                        <p className="mt-2 text-sm text-[#C7B9B9]">{scenario.overkill}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                          {ui.scenarioEscalation}
                        </h4>
                        <p className="mt-2 text-sm text-[#C7B9B9]">{scenario.escalation}</p>
                      </div>
                    </div>

                    <a
                      href={`#${ANCHORS.level(scenario.level)}`}
                      className="inline-block text-sm text-[#D71920] underline-offset-4 hover:underline"
                    >
                      {levels[scenario.level].name} →
                    </a>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Matrix ───────────────────────────────────────────────────────── */}
      <section id={ANCHORS.matrix} className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
            {ui.matrixHeading}
          </h2>
          <p className="mt-3 max-w-3xl text-[#C7B9B9]">{ui.matrixIntro}</p>

          <div className="mt-6 max-w-3xl rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm leading-7 text-[#8C8080]">{ui.matrixMethodology}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(ui.matrixLegend) as Rating[]).map((rating) => (
                <li key={rating}>
                  <RatingChip rating={rating} label={ui.matrixLegend[rating]} />
                </li>
              ))}
            </ul>
          </div>

          {/* Wide screens get the table. It scrolls inside its own container
              so the page body never scrolls sideways. */}
          <div className="mt-9 hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <caption className="sr-only">{ui.matrixHeading}</caption>
              <thead>
                <tr className="border-b border-white/20">
                  <th scope="col" className="py-3 pr-4 text-xs uppercase tracking-[0.15em] text-[#8C8080]">
                    {ui.criterionColumn}
                  </th>
                  {APPROACH_ORDER.map((approach: ApproachId) => (
                    <th key={approach} scope="col" className="px-3 py-3 align-bottom">
                      <span className="block text-sm font-semibold text-white">
                        {ui.approaches[approach].name}
                      </span>
                      <span className="mt-1 block text-xs font-normal text-[#8C8080]">
                        {ui.approaches[approach].sub}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CRITERION_ORDER.map((criterion: CriterionId) => (
                  <tr key={criterion} className="border-b border-white/10 align-top">
                    <th
                      scope="row"
                      className="py-4 pr-4 text-left text-sm font-semibold text-white"
                    >
                      {ui.criteria[criterion]}
                    </th>
                    {APPROACH_ORDER.map((approach) => (
                      <MatrixCell
                        key={approach}
                        cell={matrix[approach][criterion]}
                        legend={ui.matrixLegend}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Narrow screens get the same data one approach at a time. A
              fifteen-column table on a phone is not a comparison, it is a
              horizontal scroll nobody finishes. */}
          <div className="mt-9 space-y-4 lg:hidden">
            {APPROACH_ORDER.map((approach) => (
              <details
                key={approach}
                className="group rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-5 transition open:border-[#D71920]/40"
              >
                <summary className="cursor-pointer list-none">
                  <span className="geist block text-lg font-black tracking-[-0.04em]">
                    {ui.approaches[approach].name}
                  </span>
                  <span className="mt-1 block text-sm text-[#8C8080]">
                    {ui.approaches[approach].sub}
                  </span>
                </summary>
                <dl className="mt-5 space-y-4 border-t border-white/10 pt-5">
                  {CRITERION_ORDER.map((criterion) => {
                    const cell = matrix[approach][criterion];
                    return (
                      <div key={criterion}>
                        <dt className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-semibold text-white">
                            {ui.criteria[criterion]}
                          </span>
                          <RatingChip rating={cell.rating} label={ui.matrixLegend[cell.rating]} />
                        </dt>
                        {cell.note ? (
                          <dd className="mt-1.5 text-sm text-[#8C8080]">{cell.note}</dd>
                        ) : null}
                      </div>
                    );
                  })}
                </dl>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technologies by layer ────────────────────────────────────────── */}
      <section id={ANCHORS.layers} className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
            {ui.layersHeading}
          </h2>
          <p className="mt-3 text-[#C7B9B9]">{ui.layersIntro}</p>

          <div className="mt-9 space-y-8">
            {(Object.keys(layers) as LayerId[]).map((id) => {
              const layer = layers[id];
              return (
                <div key={id} id={ANCHORS.layer(id)} className="scroll-mt-28">
                  <h3 className="geist text-xl font-black tracking-[-0.04em] md:text-2xl">
                    {layer.name}
                  </h3>
                  <p className="mt-2 text-[#C7B9B9]">{layer.purpose}</p>

                  <dl className="mt-5 space-y-3">
                    {layer.entries.map((entry) => (
                      <div
                        key={entry.tech}
                        className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
                      >
                        <dt className="font-semibold text-white">{entry.tech}</dt>
                        <dd className="mt-1 text-sm text-[#C7B9B9]">{entry.what}</dd>
                        <dd className="mt-2 text-sm text-[#8C8080]">{entry.when}</dd>
                      </div>
                    ))}
                  </dl>

                  {layer.caution ? (
                    <p className="mt-4 border-l-2 border-[#D71920]/50 pl-4 text-sm text-[#C7B9B9]">
                      <span className="font-semibold text-white">{ui.layerCaution}: </span>
                      {layer.caution}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── You probably don't need… ─────────────────────────────────────── */}
      <section id={ANCHORS.myths} className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
            {ui.mythsHeading}
          </h2>
          <p className="mt-3 text-[#C7B9B9]">{ui.mythsIntro}</p>

          <div className="mt-9 space-y-4">
            {(Object.keys(myths) as MythId[]).map((id) => {
              const myth = myths[id];
              return (
                <details
                  key={id}
                  id={ANCHORS.myth(id)}
                  className="group scroll-mt-28 rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-6 transition open:border-[#D71920]/40"
                >
                  <summary className="geist cursor-pointer list-none text-xl font-black tracking-[-0.04em]">
                    {myth.claim}
                  </summary>

                  <div className="mt-5 space-y-5 border-t border-white/10 pt-5">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                        {ui.mythsUsually}
                      </h4>
                      <p className="mt-2 text-[#C7B9B9]">{myth.usually}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                        {ui.mythsJustified}
                      </h4>
                      <Bullets items={myth.justifiedWhen} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                        {ui.mythsInstead}
                      </h4>
                      <p className="mt-2 text-[#C7B9B9]">{myth.instead}</p>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How we decide ────────────────────────────────────────────────── */}
      <section id={ANCHORS.principles} className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
            {chrome.principlesHeading}
          </h2>
          <div className="mt-8 space-y-7">
            {chrome.principles.map((principle) => (
              <div key={principle.title}>
                <h3 className="font-semibold text-white">{principle.title}</h3>
                <p className="mt-2 text-[#C7B9B9]">{principle.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 border-l-2 border-[#D71920]/50 pl-4 text-sm leading-7 text-[#C7B9B9]">
            {ui.honesty}
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id={ANCHORS.faq} className="scroll-mt-28 border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
            {chrome.faqHeading}
          </h2>
          <div className="mt-8 space-y-6">
            {chrome.faq.map((item) => (
              <div key={item.q} className="rounded-[1.25rem] border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + related ────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[1.5rem] border border-[#D71920]/40 bg-[#D71920]/5 p-7">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">{chrome.cta.heading}</h2>
            <p className="mt-3 text-[#C7B9B9]">{chrome.cta.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={calculatorHref}
                className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b5141b]"
              >
                {chrome.cta.primary}
              </Link>
              <Link
                href={pricingHref}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
              >
                {chrome.cta.secondary}
              </Link>
            </div>
          </div>

          <h2 className="geist mt-14 text-2xl font-black tracking-[-0.05em]">
            {chrome.relatedHeading}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {chrome.related.map((link) => (
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

/** One cell of the wide table. Split out so the row stays readable. */
function MatrixCell({ cell, legend }: { cell: Cell; legend: Record<Rating, string> }) {
  return (
    <td className="px-3 py-4">
      <RatingChip rating={cell.rating} label={legend[cell.rating]} />
      {cell.note ? <p className="mt-2 text-xs leading-5 text-[#8C8080]">{cell.note}</p> : null}
    </td>
  );
}
