"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { prepare, search, type SearchDoc } from "@/lib/search";
import { trackSiteSearch } from "@/lib/analytics";

/**
 * Search box with live suggestions.
 *
 * Accessible as a combobox: arrow keys move through results, Enter opens the
 * active one, Escape clears. Works without hover. The index arrives as a prop
 * from a server component, so nothing unpublished can reach the client.
 */
export function SiteSearch({
  docs,
  scope,
  placeholder = "Search…",
  groups,
  tone = "default",
  autoFocus = false,
  locale = "en",
}: {
  docs: SearchDoc[];
  scope: string;
  placeholder?: string;
  /** Filter chips. Omit to hide them. */
  groups?: string[];
  tone?: "default" | "forest";
  autoFocus?: boolean;
  locale?: "en" | "fr";
}) {
  const fr = locale === "fr";
  const index = useMemo(() => prepare(docs), [docs]);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string | undefined>();
  const [active, setActive] = useState(0);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const hits = useMemo(() => search(index, query, group), [index, query, group]);
  const open = query.trim().length > 0;

  // Report a query once the visitor pauses, not on every keystroke.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const t = window.setTimeout(() => trackSiteSearch(scope, q, hits.length), 900);
    return () => window.clearTimeout(t);
  }, [query, hits.length, scope]);

  const accent = tone === "forest" ? "#7FA36B" : "#D71920";

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      window.location.assign(hits[active].doc.url);
    } else if (e.key === "Escape") {
      setQuery("");
      setActive(0);
    }
  }

  return (
    <div className="relative w-full">
      <label htmlFor={`${listId}-input`} className="sr-only">
        {placeholder}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/60 px-4 py-3 focus-within:border-white/40">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          id={`${listId}-input`}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && hits[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent text-base text-white outline-none placeholder:text-[#8a8a8a]"
        />
      </div>

      {groups && groups.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={fr ? "Filtrer les résultats" : "Filter results"}>
          {[undefined, ...groups].map((g) => (
            <button
              key={g ?? "all"}
              type="button"
              aria-pressed={group === g}
              onClick={() => {
                setGroup(g);
                setActive(0);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                group === g ? "border-white/60 bg-white/10 text-white" : "border-white/10 text-[#C7B9B9] hover:text-white"
              }`}
            >
              {g ?? (fr ? "Tout" : "All")}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="relative z-30 mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] shadow-2xl">
          {hits.length ? (
            <ul id={listId} role="listbox" aria-label={fr ? "Résultats de recherche" : "Search results"} className="max-h-[60vh] overflow-y-auto py-2">
              {hits.map((h, i) => (
                <li key={h.doc.id} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                  <a
                    href={h.doc.url}
                    onMouseEnter={() => setActive(i)}
                    className={`block px-4 py-3 transition ${i === active ? "bg-white/[.07]" : ""}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[.2em]" style={{ color: accent }}>
                        {h.doc.group}
                      </span>
                      {h.doc.spoiler && (
                        <span className="rounded-full border border-white/15 px-2 text-[10px] text-[#C7B9B9]">{fr ? "Divulgâcheurs" : "Spoilers"}</span>
                      )}
                    </span>
                    <span className="mt-1 block font-semibold text-white">{h.doc.title}</span>
                    <span className="mt-0.5 line-clamp-1 block text-sm text-[#a9a0a0]">{h.doc.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-sm text-[#C7B9B9]" role="status">
              {fr
                ? `Aucun résultat pour « ${query} ». Essayez un mot plus court ou parcourez les catégories.`
                : `No results for “${query}”. Try a shorter word, or browse the categories below.`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
