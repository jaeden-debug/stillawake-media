import type { Metadata } from "next";

import { GuideBody } from "@/components/custom-software/guide-sections";
import { PageSchema } from "@/components/page-schema";
import { EN } from "@/lib/custom-software/en";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}${EN.path}`;
const frUrl = `${siteUrl}${EN.otherPath}`;

/**
 * "Do I actually need custom software?"
 *
 * THE FOURTH GUIDE IN THE CLUSTER, and the one that runs first in the
 * decision. `/website-setup-guide` answers *what should this consist of*;
 * `/website-ownership` answers *who holds the keys afterwards*. This one
 * answers the question that comes before both: does any of it need to be
 * built, or does it already exist and just need buying?
 *
 * WHY THIS URL AND NOT A HEAD TERM. The head terms are taken, by us. Google
 * Keyword Planner (Canada, exact-keyword history, 2026-08-15) puts "custom
 * software development" at 260/mo with LOW competition, and that intent
 * belongs to /software-development — a commercial page that already ranks for
 * the studio's own service. The definitional query belongs to the Times
 * article "What Is Custom Software Development?". Writing a third page for
 * either would be cannibalisation.
 *
 * What is genuinely unowned is the DECISION intent: "build vs buy software"
 * (10/mo), "off the shelf vs custom software" (10/mo), "when to build custom
 * software" (10/mo), all at effectively zero competition, plus the planning
 * vocabulary that does carry volume — "custom business software" (140/mo,
 * LOW), "custom software solutions" (90/mo, LOW). The URL states the question
 * rather than the product, which is the phrasing this page can actually win.
 *
 * The volume is small and the page is not built to live on it. The two
 * surfaces it is built for are answer engines — "does my business need custom
 * software" and "custom software vs saas" return no measurable ad volume
 * precisely because they are conversational, which is a citation surface — and
 * the project calculator, which links here from every result at the
 * application end of the ladder.
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
  twitter: {
    card: "summary_large_image",
    title: EN.meta.ogTitle,
    description: EN.meta.ogDescription,
  },
};

export default function DoINeedCustomSoftwarePage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route={EN.path} />
      <GuideBody content={EN} />
    </main>
  );
}
