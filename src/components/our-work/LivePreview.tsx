"use client";

import { useEffect, useState } from "react";

/**
 * A live, sandboxed preview of a project's site.
 *
 * Nothing loads until the visitor asks: a third-party page is heavy, can't be
 * optimised by us, and would otherwise run on every visit to the detail page.
 * Some sites refuse to be framed (X-Frame-Options / CSP frame-ancestors) and
 * the browser gives us no way to detect that, so after a few seconds the
 * fallback link is always offered alongside the frame.
 */
export function LivePreview({ url, title, accent }: { url: string; title: string; accent: string }) {
  const [requested, setRequested] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!requested || loaded) return;
    const t = window.setTimeout(() => setSlow(true), 6000);
    return () => window.clearTimeout(t);
  }, [requested, loaded]);

  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[.04] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-black/50 px-3 py-1.5 text-xs text-[#B8B8B8]">{host}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          data-track="portfolio_outbound_click"
          data-track-host={host}
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-black"
          style={{ background: accent }}
        >
          Open ↗
        </a>
      </div>

      <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
        {!requested ? (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div>
              <p className="text-sm text-[#C7B9B9]">Load {title} inside this page. It runs in a sandbox.</p>
              <button
                type="button"
                onClick={() => setRequested(true)}
                data-track="live_preview_load"
                data-track-host={host}
                className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-bold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Load live preview
              </button>
            </div>
          </div>
        ) : (
          <>
            {!loaded && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-[#050505]" role="status">
                <div className="text-center">
                  <div className="mx-auto size-10 rounded-full border-2 border-white/10 border-t-white motion-safe:animate-spin" />
                  <p className="mt-4 text-xs uppercase tracking-[.3em] text-[#a9a0a0]">Loading {host}</p>
                </div>
              </div>
            )}
            <iframe
              title={`${title} live preview`}
              src={url}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 h-full w-full border-0 bg-white"
            />
          </>
        )}
      </div>

      {requested && (slow || loaded) && (
        <p className="border-t border-white/10 px-4 py-3 text-xs text-[#a9a0a0]">
          Blank or blocked? Some sites don&apos;t allow embedding.{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
            Open {host} in a new tab
          </a>
          .
        </p>
      )}
    </div>
  );
}
