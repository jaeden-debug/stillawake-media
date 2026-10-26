"use client";

import { useEffect } from "react";
import { trackAiReferral, trackClusterClick, trackStartClick, trackTaggedClick } from "@/lib/analytics";

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
const AI_REFERRERS: [string, string][] = [
  ["chatgpt.com", "chatgpt"],
  ["chat.openai.com", "chatgpt"],
  ["perplexity.ai", "perplexity"],
  ["copilot.microsoft.com", "copilot"],
  ["gemini.google.com", "gemini"],
  ["claude.ai", "claude"],
  ["you.com", "you"],
];

export function OutboundTracking({ locale }: { locale: "en" | "fr" }) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");

      // Tagged CTAs (game, Roblox and portfolio links) carry their own event
      // name and parameters as data attributes.
      const tagged = target?.closest?.("[data-track]") as HTMLElement | null;
      if (tagged) {
        const params: Record<string, string> = { page: window.location.pathname };
        for (const [key, value] of Object.entries(tagged.dataset)) {
          if (key.startsWith("track") && key !== "track" && value) {
            params[key.slice(5).replace(/^./, (c) => c.toLowerCase())] = value;
          }
        }
        trackTaggedClick(tagged.dataset.track!, params);
      }

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

    // Known AI assistants, by referrer host. Recorded once per session.
    try {
      const host = document.referrer ? new URL(document.referrer).hostname : "";
      const ai = AI_REFERRERS.find(([pattern]) => host === pattern || host.endsWith(`.${pattern}`));
      if (ai && !sessionStorage.getItem("sa_ai_ref")) {
        sessionStorage.setItem("sa_ai_ref", "1");
        trackAiReferral(ai[1], window.location.pathname);
      }
    } catch {
      // Storage blocked or a malformed referrer: skip, never break the page.
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [locale]);

  return null;
}
