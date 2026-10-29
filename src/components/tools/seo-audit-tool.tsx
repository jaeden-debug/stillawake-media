"use client";

import { useState } from "react";
import type { Check, CheckLevel } from "@/lib/seo-audit/analyze";

type Result = {
  url: string;
  checkedAt: string;
  summary: Record<CheckLevel, number>;
  checks: Check[];
  headings: { level: number; text: string }[];
};

const LEVEL_STYLE: Record<CheckLevel, string> = {
  fail: "border-[#D71920]/40 bg-[#D71920]/[0.08]",
  warn: "border-amber-400/30 bg-amber-400/[0.06]",
  pass: "border-emerald-400/25 bg-emerald-400/[0.05]",
  info: "border-white/15 bg-white/[0.03]",
};
const LEVEL_MARK: Record<CheckLevel, string> = { fail: "✕", warn: "!", pass: "✓", info: "i" };
const LEVEL_NAME: Record<CheckLevel, string> = { fail: "Problem", warn: "Worth fixing", pass: "OK", info: "Note" };
const ORDER: CheckLevel[] = ["fail", "warn", "info", "pass"];
const GROUPS: Check["group"][] = ["Response", "Indexing", "Content", "Structured data", "Sharing"];

/**
 * The request goes to /api/tools/seo-audit, which fetches the page from our
 * server. Results are not stored; the report exists only in this component.
 */
export function SeoAuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [showPassed, setShowPassed] = useState(false);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/tools/seo-audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "The check failed. Try again.");
      else setResult(data as Result);
    } catch {
      setError("The check failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const visible = result
    ? result.checks
        .filter((c) => showPassed || c.level !== "pass")
        .sort((a, b) => ORDER.indexOf(a.level) - ORDER.indexOf(b.level))
    : [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-8">
      <form onSubmit={run} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="seo-audit-url" className="sr-only">
          Page URL
        </label>
        <input
          id="seo-audit-url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://example.com/your-page"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full min-w-0 rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#D71920]/60"
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="shrink-0 rounded-full bg-[#D71920] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
        >
          {loading ? "Checking…" : "Check page"}
        </button>
      </form>
      <p className="mt-3 text-xs text-[#8C8080]">
        One page per check. We fetch the page, its robots.txt and its sitemap, and keep nothing.
      </p>

      <div aria-live="polite">
        {error && (
          <p className="mt-6 rounded-xl border border-[#D71920]/40 bg-[#D71920]/[0.08] p-4 text-sm text-white">{error}</p>
        )}

        {result && (
          <div className="mt-8">
            <p className="break-all text-sm text-[#C7B9B9]">
              Checked <span className="text-white">{result.url}</span> at{" "}
              {new Date(result.checkedAt).toLocaleString("en-CA")}
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(["fail", "warn", "info", "pass"] as CheckLevel[]).map((level) => (
                <div key={level} className={`rounded-xl border p-4 ${LEVEL_STYLE[level]}`}>
                  <dt className="text-xs uppercase tracking-[0.2em] text-[#C7B9B9]">{LEVEL_NAME[level]}</dt>
                  <dd className="geist mt-1 text-3xl font-black">{result.summary[level]}</dd>
                </div>
              ))}
            </dl>

            <label className="mt-6 inline-flex items-center gap-2 text-sm text-[#C7B9B9]">
              <input type="checkbox" checked={showPassed} onChange={(e) => setShowPassed(e.target.checked)} />
              Show passed checks
            </label>

            {GROUPS.map((group) => {
              const items = visible.filter((c) => c.group === group);
              if (items.length === 0) return null;
              return (
                <section key={group} className="mt-8">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[#D71920]">{group}</h3>
                  <ul className="mt-3 space-y-3">
                    {items.map((c) => (
                      <li key={c.id} className={`rounded-xl border p-4 ${LEVEL_STYLE[c.level]}`}>
                        <p className="font-semibold text-white">
                          <span aria-hidden="true" className="mr-2 inline-block w-4 text-center">
                            {LEVEL_MARK[c.level]}
                          </span>
                          <span className="sr-only">{LEVEL_NAME[c.level]}: </span>
                          {c.title}
                        </p>
                        <p className="mt-1 break-words pl-6 text-sm text-[#C7B9B9]">{c.detail}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            {result.headings.length > 0 && (
              <details className="mt-8 rounded-xl border border-white/10 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-white">
                  Heading outline ({result.headings.length})
                </summary>
                <ol className="mt-3 space-y-1 text-sm text-[#C7B9B9]">
                  {result.headings.map((h, i) => (
                    <li key={i} style={{ paddingLeft: `${(h.level - 1) * 14}px` }}>
                      <span className="text-[#8C8080]">H{h.level}</span> {h.text || "(empty)"}
                    </li>
                  ))}
                </ol>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
