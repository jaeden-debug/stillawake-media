import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd } from "@/components/service-page";

export const metadata: Metadata = {
  title: "StillAwake Media | Agence web à Montréal — Sites, SEO et IA",
  description:
    "Agence web montréalaise : création de sites web, boutiques Shopify, référencement (SEO), optimisation IA et logiciels sur mesure — avec tarifs affichés et résultats mesurables.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr",
      "en-CA": "https://stillawakemedia.com/",
      "x-default": "https://stillawakemedia.com/",
    },
  },
  openGraph: {
    title: "StillAwake Media | Agence web à Montréal",
    description: "Sites web, SEO, optimisation IA et logiciels sur mesure pour entreprises québécoises.",
    url: "https://stillawakemedia.com/fr",
    type: "website",
    locale: "fr_CA",
  },
};

const SERVICES: [string, string, string][] = [
  ["Création de site web", "/fr/agence-web-montreal", "Sites premium codés sur mesure, rapides et bâtis pour convertir."],
  ["Agence SEO Montréal", "/fr/agence-seo-montreal", "Forfaits de référencement affichés : 600 $ à 850 $ CAD par mois."],
  ["Maintenance & dépannage", "/fr/maintenance-site-web", "Entretien continu et urgences réglées le jour même, dès 150 $."],
  ["Référencement IA (AEO)", "/fr/referencement-ia", "Faites-vous citer par ChatGPT, Perplexity et Google IA."],
  ["Développement Shopify", "/fr/developpement-shopify", "Boutiques bilingues et thèmes sur mesure qui vendent."],
  ["Tarifs", "/fr/tarifs", "Tous nos prix, affichés. Sans appel de vente."],
];

export default function FrHome() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr"
        name="StillAwake Media — Agence web à Montréal"
        description="Agence numérique montréalaise : création de sites web, SEO, optimisation IA, Shopify et logiciels sur mesure pour entreprises québécoises et canadiennes."
        breadcrumb={[["Accueil", "/fr"]]}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p aria-hidden="true" className="geist font-mono text-[11vw] font-normal leading-[1.05] tracking-[0.3em] text-white md:text-[96px]">
            STILL<span className="text-[#D71920]">AWAKE</span>
          </p>
          <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-[1.1] md:text-5xl">
            Sites web, SEO et systèmes IA — bâtis à Montréal pour les entreprises ambitieuses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            StillAwake Media conçoit des marques audacieuses, des sites performants, des systèmes de référencement et
            des outils IA pensés pour faire croître les entreprises modernes — au Québec, au Canada et partout, à
            distance. L&apos;ambition ne dort jamais.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/fr/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Obtenir un audit gratuit
            </Link>
            <Link href="/portfolio" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.3em] text-[#D71920]">Nos services</p>
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            L&apos;infrastructure numérique, au complet.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(([name, href, desc]) => (
              <Link key={href} href={href} className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
                <h3 className="geist text-2xl font-black tracking-[-0.05em]">{name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#D71920] p-10 md:p-16">
          <h2 className="geist max-w-3xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Sautez l&apos;appel de vente. Dites-nous ce que vous bâtissez.
          </h2>
          <Link href="/fr/contact" className="mt-8 inline-flex rounded-full bg-black px-6 py-4 font-bold">
            Démarrer un projet →
          </Link>
        </div>
      </section>
    </main>
  );
}
