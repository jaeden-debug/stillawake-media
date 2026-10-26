import { EN } from "./en";
import { FR } from "./fr";
import type { TechStackContent } from "./types";

/** The content set for a language. Both pages render from the same component. */
export function techStackContent(locale: "en" | "fr"): TechStackContent {
  return locale === "fr" ? FR : EN;
}

export { EN, FR };
export * from "./types";
export { resolve, reachableOutcomes, reachableQuestions, type Path, type Resolution } from "./tree";
