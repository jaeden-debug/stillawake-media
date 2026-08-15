"use client";

import { useEffect } from "react";
import { trackStartClick, trackClusterClick } from "@/lib/analytics";

/**
 * Tracks clicks through to the Studio onboarding.
 *
 * One delegated listener on the document rather than a tracked-link component
 * used in ~30 places. Links to stillawake.studio/start are scattered across
 * service pages, the homepage, pricing and /global — most of them inside
 * server components — and converting each one into a client component to
 * attach an onClick would push a client boundary into pages that currently
 * ship no JavaScript at all.
 *
 * `capture: true` so the event is recorded before any navigation begins, and
 * the handler does no async work: gtag pushes into dataLayer synchronously,
 * which survives the page unload.
 */
export function OutboundTracking({ locale }: { locale: "en" | "fr" }) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      /**
       * Movement through the llms.txt cluster, tracked on the same delegated
       * listener rather than a second one. The path is guide → tool → service
       * page, and only clicks that leave the current section are interesting:
       * a link from the tool back to the tool tells us nothing.
       */
      const from = window.location.pathname;
      if (href.startsWith("/") && from.startsWith("/tools")) {
        if (href.startsWith("/tools/llms-txt-generator") && !from.startsWith("/tools/llms-txt-generator")) {
          trackClusterClick(from, "tool");
        } else if (href.startsWith("/tools/llms-txt/")) {
          trackClusterClick(from, "guide");
        } else if (href === "/answer-engine-optimization" || href.startsWith("/fr/referencement-ia")) {
          trackClusterClick(from, "service");
        }
        return;
      }

      if (!href.includes("stillawake.studio")) return;

      // The page the click came from is the useful dimension — it answers
      // "which page persuades people to start", which is the question the
      // content plan actually needs answered.
      trackStartClick(from, locale);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [locale]);

  return null;
}
