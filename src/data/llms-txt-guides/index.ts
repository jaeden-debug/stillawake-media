import type { PlatformGuide } from "@/lib/llms-txt-guides/types";
import { isPublishable } from "@/lib/llms-txt-guides/types";
import { shopifyGuide } from "./shopify";
import { nextjsGuide } from "./nextjs";
import { wordpressGuide } from "./wordpress";

/**
 * The registry.
 *
 * Adding a platform here is necessary but not sufficient: routing, the sitemap
 * and the index all read `publishedGuides()`, which drops anything that is
 * still a draft or fails the evidence schema. A half-written record can live
 * in this list without ever becoming a URL.
 *
 * Platforms deliberately NOT here yet — Webflow, Framer, Squarespace, Wix,
 * Ghost, Astro, Drupal, BigCommerce, WooCommerce — are absent because nobody
 * has verified their behaviour against primary documentation, not because the
 * system cannot express them.
 */
const ALL_GUIDES: PlatformGuide[] = [shopifyGuide, nextjsGuide, wordpressGuide];

/** Every record, including drafts. For tests and tooling only — never routing. */
export function allGuides(): PlatformGuide[] {
  return ALL_GUIDES;
}

/** The only list routing, the sitemap and the index are allowed to read. */
export function publishedGuides(locale: "en" | "fr" = "en"): PlatformGuide[] {
  return ALL_GUIDES.filter((g) => g.locale === locale && isPublishable(g));
}

export function getPublishedGuide(slug: string, locale: "en" | "fr" = "en"): PlatformGuide | null {
  return publishedGuides(locale).find((g) => g.slug === slug) ?? null;
}
