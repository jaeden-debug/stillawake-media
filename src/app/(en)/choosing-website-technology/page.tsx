import type { Metadata } from "next";

import { PageSchema } from "@/components/page-schema";
import { TechStackGuide } from "@/components/tech-stack/guide";
import { EN } from "@/lib/tech-stack/en";
import { PATHS } from "@/lib/tech-stack/types";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}${PATHS.en}`;
const frUrl = `${siteUrl}${PATHS.fr}`;

/**
 * "What technology should I use for my website?"
 *
 * THE INTENT THIS OWNS, and the pages it must not take work from:
 *
 *   /website-setup-guide      what should this site CONSIST of (requirements)
 *   this page                 what should it be BUILT ON (architecture)
 *   /website-cost-canada      what will it COST
 *   /shopify-vs-woocommerce   one head-to-head, decided
 *   /stillawake-times/…       the individual comparisons and explainers
 *
 * So this is a consolidation hub, not a comparison page. It answers the
 * decision and links down to the comparisons; it never re-argues one.
 *
 * MEASURED DEMAND (Google Keyword Planner, Canada, live 2026-08-15). The
 * cluster is a long fragmented tail rather than a head term, which is exactly
 * why it wants one page instead of fifteen: "best website builder for small
 * business" 390/mo (HIGH, and the SERP is affiliate review sites — not a
 * surface a studio wins or should want), "webflow vs wordpress" 210/mo (LOW),
 * "custom website development" 110/mo (LOW), "best website platform" 30/mo
 * (HIGH), then a long tail at 10/mo each: "website tech stack", "tech stack
 * for website", "wordpress vs custom website", "cms vs custom website",
 * "nextjs vs wordpress", "headless cms vs wordpress", "best tech stack for
 * web development", "best platform for business website", "choosing a website
 * platform", "what platform should i build my website on".
 *
 * "framer vs wordpress" (30/mo) is deliberately NOT targeted here — that
 * intent already belongs to /stillawake-times/framer-vs-wordpress, and this
 * page links to it rather than competing with it.
 *
 * The title is the natural-language question because that is what a person
 * types into an assistant, and being the cited answer to it is worth more
 * here than ranking for any single 10/mo phrase.
 */
export const metadata: Metadata = {
  title: EN.chrome.meta.title,
  description: EN.chrome.meta.description,
  alternates: {
    canonical: url,
    languages: { "en-CA": url, "fr-CA": frUrl, "x-default": url },
  },
  openGraph: {
    title: EN.chrome.meta.ogTitle,
    description: EN.chrome.meta.ogDescription,
    url,
    type: "article",
  },
};

export default function ChoosingWebsiteTechnologyPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route={PATHS.en} />
      <TechStackGuide
        content={EN}
        calculatorHref="/tools/project-cost-calculator"
        pricingHref="/pricing"
        prerequisite={{
          lead: "If you have not yet worked out what the site actually has to do, that decision comes first:",
          label: "what kind of website your business needs",
          href: "/website-setup-guide",
        }}
      />
    </main>
  );
}
