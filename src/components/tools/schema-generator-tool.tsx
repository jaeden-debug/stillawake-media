"use client";

import { useMemo, useState } from "react";
import {
  EXAMPLES,
  FIELDS,
  ROW_LABELS,
  SCHEMA_TYPES,
  buildSchema,
  renderJsonLd,
  validate,
  type Field,
  type FormState,
  type Issue,
  type SchemaType,
} from "@/lib/schema-generator";

const LEVEL_TAG: Record<Field["level"], string> = { required: "Required", recommended: "Recommended", optional: "Optional" };
const ISSUE_STYLE: Record<Issue["level"], string> = {
  error: "border-[#D71920]/40 bg-[#D71920]/[0.08]",
  warning: "border-amber-400/30 bg-amber-400/[0.06]",
  note: "border-white/15 bg-white/[0.04]",
};
const ISSUE_MARK: Record<Issue["level"], string> = { error: "✕", warning: "!", note: "i" };

const input =
  "w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#D71920]/60";

/**
 * All state is local; nothing is sent anywhere. The builder and validator are
 * the tested functions in src/lib/schema-generator, so what this shows and
 * what the tests assert are the same rules.
 */
export function SchemaGeneratorTool() {
  const [type, setType] = useState<SchemaType>("LocalBusiness");
  const [forms, setForms] = useState<Record<SchemaType, FormState>>(() => structuredClone(EXAMPLES));
  const [wrap, setWrap] = useState(true);
  const [copied, setCopied] = useState(false);

  const form = forms[type];
  const schema = useMemo(() => buildSchema(type, form), [type, form]);
  const output = useMemo(() => renderJsonLd(schema, wrap), [schema, wrap]);
  const issues = useMemo(() => validate(type, form), [type, form]);
  const errorCount = issues.filter((i) => i.level === "error").length;
  const rowSpec = ROW_LABELS[type];

  const update = (next: Partial<FormState>) => setForms((f) => ({ ...f, [type]: { ...f[type], ...next } }));
  const setValue = (key: string, value: string) => update({ values: { ...form.values, [key]: value } });
  const setRow = (i: number, side: "a" | "b", value: string) =>
    update({ rows: form.rows.map((r, j) => (j === i ? { ...r, [side]: value } : r)) });

  function copy() {
    navigator.clipboard.writeText(output).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        const el = document.getElementById("schema-output") as HTMLTextAreaElement | null;
        el?.select();
      },
    );
  }

  return (
    <div className="grid gap-10">
      <fieldset>
        <legend className="text-sm font-bold text-white">1. What are you marking up?</legend>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup">
          {SCHEMA_TYPES.map((t) => (
            <button
              key={t.type}
              type="button"
              role="radio"
              aria-checked={type === t.type}
              onClick={() => setType(t.type)}
              className={`rounded-xl border p-4 text-left transition ${type === t.type ? "border-[#D71920] bg-[#D71920]/10" : "border-white/10 hover:border-white/30"}`}
            >
              <span className="block font-bold text-white">{t.label}</span>
              <span className="mt-1 block text-xs leading-5 text-[#C7B9B9]">{t.blurb}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="fields-h" className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="fields-h" className="text-sm font-bold text-white">2. Fill in what is true on the page</h2>
            <div className="flex gap-3 text-xs">
              <button type="button" onClick={() => update(structuredClone(EXAMPLES[type]))} className="text-[#C7B9B9] underline underline-offset-2 hover:text-white">
                Load example
              </button>
              <button type="button" onClick={() => update({ values: {}, rows: rowSpec ? Array.from({ length: rowSpec.min }, () => ({ a: "", b: "" })) : [] })} className="text-[#C7B9B9] underline underline-offset-2 hover:text-white">
                Clear
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-[#8C8080]">The form opens with fictional example data. Replace it with your own.</p>

          <div className="mt-5 grid gap-5">
            {FIELDS[type].map((f) => {
              const id = `sg-${type}-${f.key}`;
              const fieldIssue = issues.find((i) => i.field === f.key && i.level === "error");
              return (
                <div key={f.key}>
                  <label htmlFor={id} className="flex flex-wrap items-baseline gap-2 text-sm text-white">
                    {f.label}
                    <span className={`text-[10px] uppercase tracking-[0.15em] ${f.level === "required" ? "text-[#ff6b70]" : f.level === "recommended" ? "text-amber-300/80" : "text-[#8C8080]"}`}>
                      {LEVEL_TAG[f.level]}
                    </span>
                  </label>
                  {f.kind === "select" ? (
                    <select id={id} value={form.values[f.key] ?? ""} onChange={(e) => setValue(f.key, e.target.value)} className={`mt-2 ${input}`}>
                      <option value="">Choose…</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.kind === "textarea" || f.kind === "urls" ? (
                    <textarea id={id} rows={3} value={form.values[f.key] ?? ""} placeholder={f.placeholder} onChange={(e) => setValue(f.key, e.target.value)} className={`mt-2 ${input}`} aria-invalid={!!fieldIssue} />
                  ) : (
                    <input
                      id={id}
                      type={f.kind === "date" ? "date" : f.kind === "email" ? "email" : f.kind === "url" ? "url" : "text"}
                      inputMode={f.kind === "number" ? "decimal" : f.kind === "tel" ? "tel" : undefined}
                      value={form.values[f.key] ?? ""}
                      placeholder={f.placeholder}
                      onChange={(e) => setValue(f.key, e.target.value)}
                      className={`mt-2 ${input}`}
                      aria-invalid={!!fieldIssue}
                    />
                  )}
                  {f.help && <p className="mt-1.5 text-xs leading-5 text-[#8C8080]">{f.help}</p>}
                  {fieldIssue && <p className="mt-1.5 text-xs text-[#ff8a8e]">{fieldIssue.message}</p>}
                </div>
              );
            })}

            {rowSpec && (
              <div className="grid gap-4">
                {form.rows.map((r, i) => (
                  <div key={i} className="rounded-xl border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.15em] text-[#8C8080]">{type === "BreadcrumbList" ? `Level ${i + 1}` : `Question ${i + 1}`}</p>
                      {form.rows.length > rowSpec.min && (
                        <button type="button" onClick={() => update({ rows: form.rows.filter((_, j) => j !== i) })} className="text-xs text-[#C7B9B9] underline underline-offset-2 hover:text-white">
                          Remove
                        </button>
                      )}
                    </div>
                    <label htmlFor={`sg-row-${i}-a`} className="mt-3 block text-sm text-white">{rowSpec.a}</label>
                    <input id={`sg-row-${i}-a`} value={r.a} onChange={(e) => setRow(i, "a", e.target.value)} className={`mt-2 ${input}`} />
                    <label htmlFor={`sg-row-${i}-b`} className="mt-3 block text-sm text-white">
                      {rowSpec.b}
                      {type === "BreadcrumbList" && i === form.rows.length - 1 && <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-[#8C8080]">Optional on the last level</span>}
                    </label>
                    {type === "FAQPage" ? (
                      <textarea id={`sg-row-${i}-b`} rows={3} value={r.b} onChange={(e) => setRow(i, "b", e.target.value)} className={`mt-2 ${input}`} />
                    ) : (
                      <input id={`sg-row-${i}-b`} type="url" value={r.b} onChange={(e) => setRow(i, "b", e.target.value)} className={`mt-2 ${input}`} />
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => update({ rows: [...form.rows, { a: "", b: "" }] })} className="justify-self-start rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">
                  + {rowSpec.add}
                </button>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="out-h" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="out-h" className="text-sm font-bold text-white">3. Check it, then copy it</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-[#C7B9B9]">
                <input id="sg-wrap" type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} className="accent-[#D71920]" />
                Include &lt;script&gt; tag
              </label>
              <button type="button" onClick={copy} className="rounded-full bg-[#D71920] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90">
                {copied ? "Copied" : "Copy JSON-LD"}
              </button>
            </div>
          </div>

          <p className={`mt-4 text-sm font-semibold ${errorCount ? "text-[#ff8a8e]" : "text-emerald-300"}`} aria-live="polite">
            {errorCount ? `${errorCount} ${errorCount === 1 ? "problem" : "problems"} to fix before you publish this.` : "No errors. Test it in Google's Rich Results Test before you publish."}
          </p>

          <label htmlFor="schema-output" className="sr-only">Generated JSON-LD</label>
          <textarea id="schema-output" readOnly value={output} rows={18} spellCheck={false} className="mt-4 w-full rounded-2xl border border-white/10 bg-black/60 p-5 font-mono text-xs leading-5 text-white outline-none focus:border-[#D71920]/50" />

          {issues.length > 0 && (
            <ul className="mt-5 grid gap-2">
              {issues.map((i, k) => (
                <li key={k} className={`rounded-xl border p-3 text-sm leading-6 text-[#e6dddd] ${ISSUE_STYLE[i.level]}`}>
                  <span aria-hidden className="mr-2 font-bold opacity-70">{ISSUE_MARK[i.level]}</span>
                  <span className="sr-only">{i.level}: </span>
                  {i.message}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-5 text-xs leading-5 text-[#8C8080]">
            Then test the published page in{" "}
            <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener" className="underline hover:text-white">Google&apos;s Rich Results Test</a> and the{" "}
            <a href="https://validator.schema.org/" target="_blank" rel="noopener" className="underline hover:text-white">Schema.org validator</a>. Nothing you type here leaves your browser.
          </p>
        </section>
      </div>
    </div>
  );
}
