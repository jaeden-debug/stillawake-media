import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";
import { siteUrl } from "@/lib/data";

import { PageSchema } from "@/components/page-schema";
const pageUrl = `${siteUrl}/fr/etudes-de-cas`;

export const metadata: Metadata = {
  title: "Études de cas | Comment StillAwake Media bâtit ses projets",
  description:
    "Décortiqués de projets StillAwake Media — le mandat, l'architecture des pages, la structure SEO et les décisions de design derrière chaque build.",
  alternates: {
    canonical: "/fr/etudes-de-cas",
    languages: {
      "fr-CA": pageUrl,
      "en-CA": `${siteUrl}/work`,
      "x-default": `${siteUrl}/work`,
    },
  },
  openGraph: {
    title: "Études de cas",
    description:
      "Le mandat, l'architecture, la structure SEO et les décisions derrière chaque projet StillAwake Media.",
    url: pageUrl,
    type: "website",
    locale: "fr_CA",
  },
};

const caseStudies: {
  name: string;
  href: string;
  domain: string;
  discipline: string;
  headline: string;
  proof: string[];
}[] = [
  {
    name: "Lisa Travel Design",
    href: "/fr/etude-de-cas-lisa-travel-design",
    domain: "lisatraveldesign.com",
    discipline: "Site web · Marque · Génération de leads",
    headline:
      "Un site de voyage haut de gamme bâti pour inspirer confiance avant même de parler de prix, et transformer l'intérêt en demande qualifiée.",
    proof: ["Positionnement avant mise en page", "Parcours de demande structuré", "Expérience mobile d'abord"],
  },
  {
    name: "BankDeMark",
    href: "/fr/etude-de-cas-bankdemark",
    domain: "bankdemark.com",
    discipline: "Plateforme SEO · Contenu · Outils",
    headline:
      "Une architecture SEO menée par les calculateurs : 13 outils interactifs, 91 URL et un score Lighthouse parfait mesuré.",
    proof: ["Positions n°1 sur Google", "Lighthouse 100/100/100", "≈190 tests automatisés"],
  },
  {
    name: "NAVTRL / Stalkr",
    href: "/fr/etude-de-cas-stalkr-navtrl",
    domain: "navtrl.com",
    discipline: "App mobile · Temps réel · Croissance",
    headline:
      "Une app de localisation en temps réel — équipes, zones et SOS — passée du premier commit à TestFlight en 24 jours.",
    proof: ["24 jours jusqu'à TestFlight", "Positions synchronisées en moins de 3 s", "Site à 98/100/100"],
  },
  {
    name: "Blackwater Aquatics",
    href: "/fr/etude-de-cas-blackwater-aquatics",
    domain: "blackwateraquatics.ca",
    discipline: "Shopify · Contenu · Ecommerce",
    headline:
      "Un commerce Shopify mené par l'éducation : 64 pages de contenu soutiennent un catalogue de 17 produits — et ça vend.",
    proof: ["Taux de réachat de 27,8 %", "Page produit à 8,6 % de CTR", "Positions en page 1"],
  },
];

export default function EtudesDeCas() {
  return (
    <main className="pt-28">
          <PageSchema route="/fr/etudes-de-cas" />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Études de cas</p>

          <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
            Le raisonnement derrière le travail, pas juste les captures d&apos;écran.
          </h1>

          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-[#C7B9B9]">
            <p>
              La plupart des pages « réalisations » sont un mur de vignettes. Ça
              prouve qu&apos;un projet existe, mais pas si la réflexion derrière
              se transposerait à votre entreprise.
            </p>
            <p>
              Ces décortiqués couvrent le mandat, l&apos;architecture des pages,
              la structure de recherche et les décisions de design derrière des
              projets réels. Pour cliquer dans les sites eux-mêmes, les{" "}
              <Link href="/fr/realisations" className="text-white underline decoration-[#D71920] underline-offset-4">
                réalisations
              </Link>{" "}
              ouvrent chacun en aperçu direct.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-6 py-4 font-bold">
              Démarrer un projet →
            </Link>
            <Link href="/fr/tarifs" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
              Voir les tarifs →
            </Link>
            <Link href="/work" lang="en-CA" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
              English version →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl space-y-8">
          {caseStudies.map((study) => (
            <article key={study.href} className="rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
              <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">{study.discipline}</p>

              <h2 className="geist mt-4 text-4xl font-black tracking-[-0.06em] md:text-6xl">
                {study.name}
              </h2>

              <p className="mt-3 text-sm text-[#8F8585]">{study.domain}</p>

              <p className="mt-8 max-w-3xl text-base leading-8 text-[#C7B9B9]">{study.headline}</p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {study.proof.map((item) => (
                  <div key={item} className="glass rounded-[2rem] p-6">
                    <p className="text-base font-bold leading-7">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                href={study.href}
                className="mt-10 inline-flex rounded-full bg-[#D71920] px-6 py-4 font-bold"
              >
                Lire l&apos;étude de cas →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Chiffres mesurés, pas estimés.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Les scores Lighthouse cités sont des exécutions réelles sur Chrome
            (mobile) que vous pouvez reproduire. Les taux de conversion et de
            réachat proviennent des tableaux de bord des plateformes concernées,
            avec la fenêtre de mesure indiquée dans chaque étude de cas.
          </p>
        </div>
      </section>

      <InternalLinks locale="fr" />
    </main>
  );
}
