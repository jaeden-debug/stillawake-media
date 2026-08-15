import type { Metadata } from "next";

import { GuideBody } from "@/components/website-setup/guide-sections";
import { PageSchema } from "@/components/page-schema";
import { EN } from "@/lib/website-setup/en";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}${EN.path}`;
const frUrl = `${siteUrl}${EN.otherPath}`;

/**
 * "What kind of website does my business need?"
 *
 * Deliberately distinct from every platform page on the site. Those answer
 * *what should power this* — Shopify vs WooCommerce, builders vs hiring,
 * moving off WordPress. This one answers *what should this consist of*, which
 * is the decision those pages assume has already been made. The two clusters
 * link to each other in one direction only: requirements → technology.
 *
 * Measured demand (Google Keyword Planner, 2026-08, exact-keyword history):
 * the question phrasing itself is tiny (10/mo US and CA), so the page is not
 * built on it. The volume sits in the shapes and the planning vocabulary —
 * "types of websites" 880/mo US and 140/mo CA (LOW), "lead generation
 * website" 1,900/mo US (LOW, trending up), "website planning" 390/mo US,
 * "brochure website" 210/mo US, "how to plan a website" 170/mo US, "website
 * requirements" 110/mo US, "business website setup" 140/mo US, "how to
 * choose a cms" 40/mo US — which is why those are the section headings and
 * the shape names rather than decoration. The question phrasing earns its
 * place in the H1 and the FAQ because it is what a person actually asks an
 * assistant, and that is a citation surface rather than a ranking one.
 */
export const metadata: Metadata = {
  title: EN.meta.title,
  description: EN.meta.description,
  alternates: {
    canonical: url,
    languages: { "en-CA": url, "fr-CA": frUrl, "x-default": url },
  },
  openGraph: {
    title: EN.meta.ogTitle,
    description: EN.meta.ogDescription,
    url,
    type: "article",
  },
};

export default function WebsiteSetupGuidePage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route={EN.path} />
      <GuideBody content={EN} />
    </main>
  );
}
