"use client";

import { useState } from "react";
import Link from "next/link";
import type { Finding } from "@/lib/llms-txt/analyze";

type Result = {
  domain: string;
  score: number;
  findings: Finding[];
  pagesAnalyzed: number;
  llmsTxt: string;
};

const LEVEL_STYLE: Record<Finding["level"], string> = {
  ok: "border-emerald-400/30 bg-emerald-400/[0.06]",
  warn: "border-amber-400/30 bg-amber-400/[0.06]",
  fail: "border-[#D71920]/40 bg-[#D71920]/[0.08]",
};
const LEVEL_MARK: Record<Finding["level"], string> = { ok: "✓", warn: "!", fail: "✕" };

export function LlmsTxtTool() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [edited, setEdited] = useState("");
  const [copied, setCopied] = useState(false);

  async function run(event: React.FormEvent) {
    event.preventDefault();
    setState("running");
    setError("");
    try {
      const res = await fetch("/api/tools/llms-txt", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setResult(data);
      setEdited(data.llmsTxt);
      setState("done");
    } catch {
      setError("Could not reach the checker. Try again.");
      setState("error");
    }
  }

  function copy() {
    navigator.clipboard.writeText(edited).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function download() {
    const blob = new Blob([edited], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "llms.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const gaps = result?.findings.filter((f) => f.level !== "ok") ?? [];

  return (
    <div>
      <form onSubmit={run} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="site-url">
          Website address
        </label>
        <input
          id="site-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourcompany.com"
          required
          maxLength={300}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="w-full rounded-full border border-white/15 bg-black/40 px-6 py-4 text-white outline-none placeholder:text-white/40 focus:border-[#D71920]/60"
        />
        <button
          type="submit"
          disabled={state === "running"}
          className="shrink-0 rounded-full bg-[#D71920] px-8 py-4 font-bold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {state === "running" ? "Checking…" : "Check my site"}
        </button>
      </form>

      {state === "error" && (
        <p className="mt-4 rounded-2xl border border-[#D71920]/40 bg-[#D71920]/10 p-4 text-sm text-white">
          {error}
        </p>
      )}

      {state === "running" && (
        <p className="mt-6 text-sm text-[#C7B9B9]">
          Reading your homepage, sitemap and up to twelve pages. This takes a few seconds.
        </p>
      )}

      {result && state === "done" && (
        <div className="mt-10 space-y-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="geist text-5xl font-black tracking-[-0.04em] text-[#D71920]">
              {result.score}
              <span className="text-2xl text-white/40">/100</span>
            </p>
            <p className="text-[#C7B9B9]">
              AI readiness for <span className="text-white">{result.domain}</span> · {result.pagesAnalyzed} pages read
            </p>
          </div>

          {/* The findings are the product. The file is the thing people came
              for; the gaps are the thing they can act on. */}
          <section>
            <h2 className="geist text-2xl font-black tracking-[-0.03em] text-white">
              What an answer engine can and cannot tell about you
            </h2>
            <div className="mt-5 space-y-3">
              {result.findings.map((f) => (
                <div
                  key={f.label}
                  className={`rounded-2xl border p-4 ${LEVEL_STYLE[f.level]}`}
                >
                  <p className="font-bold text-white">
                    <span aria-hidden className="mr-2 opacity-70">{LEVEL_MARK[f.level]}</span>
                    {f.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#C7B9B9]">{f.why}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="geist text-2xl font-black tracking-[-0.03em] text-white">
                Your llms.txt
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={copy}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Download
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-[#C7B9B9]">
              Edit it before you publish. Save it at{" "}
              <code className="text-white">https://{result.domain}/llms.txt</code>.
            </p>
            <label className="sr-only" htmlFor="llms-output">
              Generated llms.txt content
            </label>
            <textarea
              id="llms-output"
              value={edited}
              onChange={(e) => setEdited(e.target.value)}
              rows={18}
              spellCheck={false}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/50 p-5 font-mono text-sm text-white outline-none focus:border-[#D71920]/50"
            />
          </section>

          {gaps.length > 0 && (
            <section className="rounded-[2rem] bg-[#D71920] p-8 md:p-10">
              <h2 className="geist text-3xl font-black tracking-[-0.04em] text-white">
                {gaps.length} {gaps.length === 1 ? "gap" : "gaps"} worth fixing
              </h2>
              <p className="mt-3 max-w-2xl text-white/90">
                Publishing the file is the easy half. The findings above are the reason
                an assistant would still struggle to describe or recommend you. That is
                the work we do.
              </p>
              <Link
                href="/answer-engine-optimization"
                className="mt-7 inline-flex rounded-full bg-black px-6 py-4 font-bold text-white"
              >
                How we fix these →
              </Link>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
