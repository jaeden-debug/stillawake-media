import Link from "next/link";
import { Fragment } from "react";
import type { GameBundle } from "@/data/games";
import type { WikiBlock, WikiSection } from "@/data/games/types";
import { resolveLink } from "@/lib/games";

/**
 * Renders wiki text and blocks to plain server HTML.
 *
 * Everything an answer engine needs is in the initial response: no client
 * JavaScript, and spoilers use <details>, which keeps the text in the
 * document while collapsing it for readers.
 */

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function WikiText({ bundle, text }: { bundle: GameBundle; text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const href = resolveLink(bundle, link[2]);
          if (!href) return <Fragment key={i}>{link[1]}</Fragment>;
          return (
            <Link
              key={i}
              href={href}
              className="text-[#cfe3c2] underline decoration-[#7FA36B]/60 underline-offset-[3px] transition hover:text-white hover:decoration-white"
            >
              {link[1]}
            </Link>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

const calloutStyle: Record<"tip" | "warning" | "note", { label: string; border: string; bg: string }> = {
  tip: { label: "Tip", border: "border-[#7FA36B]/50", bg: "bg-[#7FA36B]/[.07]" },
  warning: { label: "Warning", border: "border-[#B3261E]/60", bg: "bg-[#B3261E]/[.08]" },
  note: { label: "Note", border: "border-white/15", bg: "bg-white/[.03]" },
};

export function WikiBlockView({ bundle, block }: { bundle: GameBundle; block: WikiBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4 text-[1.0625rem] leading-8 text-[#cfc8c8]">
          <WikiText bundle={bundle} text={block.text} />
        </p>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className={`mt-4 space-y-2.5 pl-6 text-[1.0625rem] leading-8 text-[#cfc8c8] ${block.ordered ? "list-decimal" : "list-disc marker:text-[#7FA36B]"}`}>
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <WikiText bundle={bundle} text={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "table":
      return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10" role="region" aria-label={block.caption} tabIndex={0}>
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <caption className="sr-only">{block.caption}</caption>
            <thead className="bg-white/[.05] text-xs uppercase tracking-[.12em] text-[#a9a0a0]">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-white/[.07]">
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="px-4 py-3 font-semibold text-white">
                        <WikiText bundle={bundle} text={cell} />
                      </th>
                    ) : (
                      <td key={c} className="px-4 py-3 text-[#cfc8c8]">
                        <WikiText bundle={bundle} text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const s = calloutStyle[block.tone];
      return (
        <aside className={`mt-6 rounded-2xl border ${s.border} ${s.bg} px-5 py-4 text-[0.98rem] leading-7 text-[#ddd6d6]`}>
          <span className="mr-2 text-xs font-bold uppercase tracking-[.2em] text-white">{s.label}</span>
          <WikiText bundle={bundle} text={block.text} />
        </aside>
      );
    }
  }
}

export function SpoilerGate({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group mt-4 rounded-2xl border border-[#B3261E]/40 bg-[#B3261E]/[.05]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
        <span>
          <span className="mr-2 rounded-full bg-[#B3261E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.15em]">Spoilers</span>
          {label}
        </span>
        <span aria-hidden="true" className="text-[#a9a0a0] transition group-open:rotate-45">＋</span>
      </summary>
      <div className="px-5 pb-5">{children}</div>
    </details>
  );
}

export function WikiSectionView({
  bundle,
  section,
  revealed = false,
}: {
  bundle: GameBundle;
  section: WikiSection;
  /** Already inside a spoiler gate. */
  revealed?: boolean;
}) {
  const body = section.blocks.map((b, i) => <WikiBlockView key={i} bundle={bundle} block={b} />);
  return (
    <section aria-labelledby={section.id} className="scroll-mt-28 pt-10">
      <h2 id={section.id} className="geist text-2xl font-black tracking-[-.04em] text-white md:text-[1.9rem]">
        {section.heading}
      </h2>
      {section.spoiler && !revealed ? <SpoilerGate label="Reveal this section">{body}</SpoilerGate> : body}
    </section>
  );
}
