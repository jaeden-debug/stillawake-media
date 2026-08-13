"use client";

/**
 * Consent banner.
 *
 * Deliberately small: no CMP vendor, no iframe, no external request. The whole
 * mechanism is ~2KB of first-party code, which matters because the site's
 * measured TTFB is 110–220ms and a third-party CMP is typically heavier than
 * everything it gates.
 *
 * Accept and Decline are the same size, same weight, same prominence, and
 * Decline is not hidden behind a "manage preferences" step. That is a
 * requirement under Law 25 and GDPR, not a stylistic choice.
 */

import { useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CONSENT_KEY,
  readConsent,
  writeConsent,
  googleConsentPayload,
  type ConsentChoice,
} from "@/lib/consent";

const CLARITY_PROJECT_ID = "y1xydoz217";

const T = {
  en: {
    title: "Cookies and analytics",
    body: "We use analytics to understand which pages are useful, including a tool that records anonymised page interactions. Nothing loads until you choose.",
    accept: "Accept",
    decline: "Decline",
    privacy: "Privacy policy",
    privacyHref: "/privacy",
    label: "Cookie consent",
  },
  fr: {
    title: "Témoins et statistiques",
    body: "Nous utilisons des outils de mesure pour comprendre quelles pages sont utiles, dont un outil qui enregistre des interactions anonymisées. Rien ne se charge avant votre choix.",
    accept: "Accepter",
    decline: "Refuser",
    privacy: "Politique de confidentialité",
    privacyHref: "/fr/confidentialite",
    label: "Consentement aux témoins",
  },
} as const;

/** Injects Clarity. Called only after analytics consent is granted. */
function loadClarity() {
  if (typeof window === "undefined") return;
  const w = window as unknown as Record<string, unknown>;
  if (w.__clarityLoaded) return;
  w.__clarityLoaded = true;

  // Official Clarity stub: queues clarity(...) calls until the tag arrives.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] =
      c[a] ||
      function (...args: unknown[]) {
        (c[a].q = c[a].q || []).push(args);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

/** Tells Google the visitor's answer. gtag queues into dataLayer either way. */
function updateGoogleConsent(analytics: ConsentChoice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", googleConsentPayload(analytics));
}

/**
 * The stored choice, read through useSyncExternalStore rather than an effect.
 *
 * localStorage cannot be read during a server render, and reading it in an
 * effect means the first client paint has to guess. Guessing "no consent yet"
 * flashes the banner at every returning visitor who already accepted; guessing
 * the opposite would show nothing to someone who has never chosen.
 *
 * The server snapshot is `undefined` — "not known yet" — which is distinct
 * from `null`, meaning "asked, and there is no record". The banner renders
 * only on `null`, so hydration shows nothing and the real answer arrives one
 * render later, with no flash either way.
 */
const UNKNOWN = undefined;

/**
 * The snapshot must be a stable value, not a fresh object.
 *
 * useSyncExternalStore compares snapshots with Object.is on every render. An
 * earlier version returned `readConsent()` directly — a new object each call —
 * so React concluded the store had changed on every render and looped, firing
 * ~52 duplicate `consent update` pushes on a single page view. Returning the
 * raw string keeps the comparison by value; parsing happens in a memo below.
 */
function getRawSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("sam-consent-change", onChange);
  // Another tab answering the banner should settle this one too.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("sam-consent-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function ConsentBanner({ locale }: { locale: "en" | "fr" }) {
  const t = T[locale];
  const raw = useSyncExternalStore(subscribe, getRawSnapshot, () => UNKNOWN);
  // `undefined` = not read yet (server/hydration); `null` = read, nothing stored.
  const consent = useMemo(() => (raw === UNKNOWN ? UNKNOWN : readConsent()), [raw]);

  // Re-apply a previous "yes" on every page load: Consent Mode defaults back
  // to denied on each fresh document, so a stored grant has to be replayed.
  useEffect(() => {
    if (consent?.analytics === "granted") {
      updateGoogleConsent("granted");
      loadClarity();
    }
  }, [consent]);

  function choose(analytics: ConsentChoice) {
    writeConsent(analytics);
    updateGoogleConsent(analytics);
    if (analytics === "granted") loadClarity();
    window.dispatchEvent(new Event("sam-consent-change"));
  }

  if (consent === UNKNOWN || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label={t.label}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-black/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-white">{t.title}</p>
          <p className="mt-1 text-sm text-[#C7B9B9]">
            {t.body}{" "}
            <Link href={t.privacyHref} className="underline hover:text-white">
              {t.privacy}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
