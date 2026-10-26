"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

/**
 * A horizontal shelf of cards.
 *
 * Native horizontal scrolling with snap points does the heavy lifting, so
 * touch swiping and trackpads work with no JavaScript at all. On top of that:
 * previous/next buttons for mouse users (desktop never depends on a
 * horizontal wheel), and Left/Right arrow keys while focus is in the row.
 * Buttons disable at either end. Motion respects prefers-reduced-motion.
 */
export function ContentRow({
  id,
  title,
  blurb,
  href,
  hrefLabel,
  locale = "en",
  children,
}: {
  id: string;
  title: string;
  blurb?: string;
  href?: string;
  hrefLabel?: string;
  locale?: "en" | "fr";
  children: React.ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const count = Children.count(children);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function page(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Aim at a card edge rather than an arbitrary offset: with mandatory snap,
    // a smooth scroll to a non-snap position can be cancelled by the browser.
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const wanted = el.scrollLeft + direction * el.clientWidth * 0.85;
    const edges = Array.from(el.children, (c) => (c as HTMLElement).offsetLeft - pad);
    const target =
      direction > 0
        ? (edges.filter((x) => x <= wanted).pop() ?? edges[0])
        : (edges.find((x) => x >= wanted) ?? 0);
    const left = Math.max(0, Math.min(target, el.scrollWidth - el.clientWidth));
    const start = el.scrollLeft;
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    // Some engines drop smooth scrolling on snap containers; land it anyway.
    window.setTimeout(() => {
      if (el.scrollLeft === start && left !== start) el.scrollTo({ left, behavior: "auto" });
      update();
    }, 450);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      page(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      page(-1);
    }
  }

  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28 py-6">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6">
        <div>
          <h2 id={headingId} className="geist text-2xl font-black tracking-[-.05em] text-white md:text-3xl">
            {title}
          </h2>
          {blurb && <p className="mt-1 text-sm text-[#a9a0a0]">{blurb}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {href && (
            <a href={href} className="mr-2 hidden text-sm font-semibold text-[#C7B9B9] hover:text-white sm:inline">
              {hrefLabel ?? (locale === "fr" ? "Tout voir" : "See all")} →
            </a>
          )}
          {count > 1 && (
            <>
              <RowButton label={`${locale === "fr" ? "Précédent" : "Previous"} ${title}`} disabled={atStart} onClick={() => page(-1)} dir="prev" />
              <RowButton label={`${locale === "fr" ? "Suivant" : "Next"} ${title}`} disabled={atEnd} onClick={() => page(1)} dir="next" />
            </>
          )}
        </div>
      </div>

      <div
        ref={scroller}
        role="region"
        aria-label={
          locale === "fr"
            ? `${title} (flèches gauche et droite pour défiler)`
            : `${title} (use left and right arrow keys to scroll)`
        }
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/40 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[30%] xl:w-[23%]">{child}</div>
        ))}
      </div>
    </section>
  );
}

function RowButton({
  label,
  disabled,
  onClick,
  dir,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  dir: "prev" | "next";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/[.04] text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-30"
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        {dir === "prev" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  );
}
