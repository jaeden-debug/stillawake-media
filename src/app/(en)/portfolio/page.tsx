import type { Metadata } from "next";
import Link from "next/link";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";
import { InternalLinks } from "@/components/site";

import { PageSchema } from "@/components/page-schema";
export const metadata: Metadata = {
  title: "Website Portfolio | Premium Web Design & SEO Projects",
  description:
    "Explore StillAwake Media website projects through live previews, SEO systems, brand builds, ecommerce experiences, and digital infrastructure examples.",
  alternates: {
    canonical: "/portfolio",
    languages: {
      "en-CA": "https://stillawakemedia.com/portfolio",
      "fr-CA": "https://stillawakemedia.com/fr/realisations",
      "x-default": "https://stillawakemedia.com/portfolio",
    },
  },
};

export default function Portfolio() {
  return (
    <main className="pt-28">
          <PageSchema route="/portfolio" />

      <PortfolioBrowser />

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Behind the Builds
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Want the reasoning, not just the preview?
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            The previews above show what each project looks like. The case
            studies break down the brief, the page architecture, the search
            structure, and the decisions behind each build.
          </p>

          <Link
            href="/work"
            className="mt-10 inline-flex rounded-full bg-[#D71920] px-6 py-4 font-bold"
          >
            Read the case studies →
          </Link>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
