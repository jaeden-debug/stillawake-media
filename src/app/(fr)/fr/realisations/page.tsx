import type { Metadata } from "next";
import Link from "next/link";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";
import { InternalLinks } from "@/components/site";
import { siteUrl } from "@/lib/data";

const pageUrl = `${siteUrl}/fr/realisations`;

export const metadata: Metadata = {
  title: "Réalisations | Sites web, SEO et projets de marque",
  description:
    "Explorez les réalisations de StillAwake Media : aperçus en direct de sites web, systèmes SEO, marques, expériences ecommerce et infrastructure numérique.",
  alternates: {
    canonical: "/fr/realisations",
    languages: {
      "fr-CA": pageUrl,
      "en-CA": `${siteUrl}/portfolio`,
      "x-default": `${siteUrl}/portfolio`,
    },
  },
  openGraph: {
    title: "Réalisations",
    description:
      "Aperçus en direct de sites web, systèmes SEO, marques et infrastructure numérique bâtis par StillAwake Media.",
    url: pageUrl,
    type: "website",
    locale: "fr_CA",
  },
};

export default function Realisations() {
  return (
    <main className="pt-28">
      <PortfolioBrowser locale="fr" />

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Derrière les projets
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Vous voulez le raisonnement, pas juste l&apos;aperçu ?
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Les aperçus ci-dessus montrent à quoi ressemble chaque projet. Les
            études de cas expliquent le mandat, l&apos;architecture des pages, la
            structure de recherche et les décisions derrière chaque build.
          </p>

          <Link
            href="/fr/etudes-de-cas"
            className="mt-10 inline-flex rounded-full bg-[#D71920] px-6 py-4 font-bold"
          >
            Lire les études de cas →
          </Link>

          <Link
            href="/portfolio"
            lang="en-CA"
            className="mt-10 ml-3 inline-flex rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white"
          >
            English version →
          </Link>
        </div>
      </section>

      <InternalLinks locale="fr" />
    </main>
  );
}
