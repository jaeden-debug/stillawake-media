import { EN } from "./en";
import { FR } from "./fr";
import type { GuideContent, Locale } from "./types";

/** The two independently written guides, keyed by locale. */
export const GUIDES: Record<Locale, GuideContent> = { en: EN, fr: FR };

export function guide(locale: Locale): GuideContent {
  return GUIDES[locale];
}

export type { GuideContent, Locale } from "./types";
