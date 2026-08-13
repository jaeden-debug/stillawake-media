import type { Metadata } from "next";
import Link from "next/link";
import { Button, InternalLinks } from "@/components/site";
import { siteUrl } from "@/lib/data";
import { jaedenDoody } from "@/data/people/jaeden-doody";

const pageUrl = `${siteUrl}/fr/a-propos`;

export const metadata: Metadata = {
  title: "À propos | Studio d'infrastructure numérique à Montréal",
  description:
    "StillAwake Media est un studio montréalais qui bâtit des sites premium, des systèmes SEO, des marques, de l'automatisation IA, des expériences Shopify et des logiciels sur mesure.",
  alternates: {
    canonical: "/fr/a-propos",
    languages: {
      "fr-CA": pageUrl,
      "en-CA": `${siteUrl}/about`,
      "x-default": `${siteUrl}/about`,
    },
  },
  openGraph: {
    title: "À propos de StillAwake Media",
    description:
      "Studio montréalais : sites premium, systèmes SEO, marques, automatisation IA, Shopify et logiciels sur mesure.",
    url: pageUrl,
    type: "website",
    locale: "fr_CA",
  },
};

const capabilities: [string, string][] = [
  ["Sites web", "Sites codés sur mesure, pages d'atterrissage, pages de services et systèmes de pages orientés conversion."],
  ["Systèmes SEO", "SEO technique, métadonnées, liens internes, structures d'articles et architecture de contenu orientée recherche."],
  ["Image de marque", "Direction de logo, systèmes visuels, typographie, couleurs, message, graphiques et actifs numériques."],
  ["Automatisation IA", "Flux concrets pour le contenu, la recherche, l'administration, les leads et les tâches répétitives."],
  ["Apps & logiciels", "Tableaux de bord, portails, outils de flux de travail, concepts SaaS et interfaces produit sur mesure."],
  ["Actifs de croissance", "Sections réutilisables, pipelines d'articles, pages de campagne et contenu bâtisseur d'autorité."],
];

const fit = [
  "Fondateurs qui lancent une marque sérieuse",
  "Entreprises de services qui doivent inspirer confiance",
  "Marques ecommerce qui ont besoin d'un SEO plus solide",
  "Créateurs qui transforment l'attention en entreprise",
  "Commerces locaux prêts à paraître premium",
  "Opérateurs qui bâtissent outils, automatisations ou logiciels",
];

const process: [string, string, string][] = [
  ["01", "Clarifier", "On définit l'offre, l'audience, le positionnement, les pages, l'intention de recherche et le parcours de conversion."],
  ["02", "Concevoir", "On façonne le système visuel : mise en page, hiérarchie, typographie, mouvement, confiance et sensation de marque."],
  ["03", "Bâtir", "On crée le site, la structure de contenu, la base SEO, les intégrations et le système technique."],
  ["04", "Lancer", "On peaufine, teste, publie et prépare la suite : trafic, leads et autorité."],
];

export default function APropos() {
  return (
    <main className="overflow-hidden pt-28">
      <section className="relative px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(215,25,32,.22),transparent_34%),radial-gradient(circle_at_10%_70%,rgba(255,255,255,.06),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_.9fr] md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">À propos de StillAwake Media</p>
            <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
              Des systèmes numériques pour les marques qui refusent d&apos;être ordinaires.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9] md:text-xl md:leading-9">
              StillAwake Media est un studio de technologie créative basé au Canada. Nous bâtissons des sites sur mesure, des systèmes SEO, des identités de marque, de l&apos;automatisation IA, des outils logiciels et des actifs numériques pour les entreprises qui veulent une présence en ligne plus affûtée.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="https://stillawake.studio/fr/demarrer">Démarrer un projet</Button>
              <Link href="/fr/realisations" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium text-[#C7B9B9] transition hover:bg-white/8 hover:text-white">
                Voir les réalisations <span className="grid size-7 place-items-center rounded-full bg-white/8 text-white">→</span>
              </Link>
              <Link href="/about" lang="en-CA" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium text-[#C7B9B9] transition hover:bg-white/8 hover:text-white">
                English version →
              </Link>
            </div>
          </div>

          <div className="glass relative overflow-hidden rounded-[2.5rem] p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.25),transparent_35%)]" />
            <div className="relative grid gap-4">
              {[
                ["01", "Des sites qui convertissent"],
                ["02", "Une architecture SEO que Google peut explorer"],
                ["03", "Des systèmes de marque mémorables"],
                ["04", "Des flux IA qui font gagner du temps"],
              ].map(([num, text]) => (
                <div key={text} className="rounded-3xl border border-white/10 bg-black/35 p-5 transition hover:-translate-y-1 hover:border-[#D71920]/50">
                  <p className="text-xs tracking-[.25em] text-[#D71920]">{num}</p>
                  <p className="geist mt-2 text-2xl font-black tracking-tighter">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Ce que nous faisons</p>
          <h2 className="geist max-w-5xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-7xl">
            Nous transformons des idées éparses en un moteur numérique clair.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {capabilities.map(([title, desc]) => (
              <article key={title} className="glass group rounded-4xl p-6 transition duration-500 hover:-translate-y-1 hover:border-[#D71920]/50 hover:bg-white/8">
                <div className="mb-8 h-1 w-16 rounded-full bg-[#D71920] transition group-hover:w-28" />
                <h3 className="geist text-3xl font-black tracking-[-0.06em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Pour qui</p>
          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Bâti pour les opérateurs, pas pour les concours de design.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {fit.map((x) => (
              <div key={x} className="glass rounded-3xl p-6 text-lg font-bold">{x}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Processus</p>
          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Un chemin simple. Un résultat solide.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {process.map(([num, title, desc]) => (
              <div className="glass rounded-3xl p-7" key={title}>
                <p className="text-sm tracking-[0.25em] text-[#D71920]">{num}</p>
                <h3 className="geist mt-4 text-3xl tracking-[-0.06em] text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Fondateur</p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            StillAwake Media a été fondée par Jaeden Doody.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Jaeden est un créateur et développeur montréalais venu au logiciel
            par la mécanique. Il bâtit les produits que StillAwake développe,
            dont{" "}
            <a href="https://zylx.ai" target="_blank" rel="noopener" className="text-white underline decoration-[#D71920] underline-offset-4">
              ZylX
            </a>
            , et a fondé séparément{" "}
            <a href="https://bankdemark.com" target="_blank" rel="noopener" className="text-white underline decoration-[#D71920] underline-offset-4">
              BankDeMark
            </a>{" "}
            et{" "}
            <a href="https://blackwateraquatics.ca" target="_blank" rel="noopener" className="text-white underline decoration-[#D71920] underline-offset-4">
              Blackwater Aquatics
            </a>
            .
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/fr/fondateur/jaeden-doody" className="inline-flex rounded-full bg-[#D71920] px-6 py-4 font-bold">
              Lire son parcours →
            </Link>
            <a
              href={jaedenDoody.linkedin}
              target="_blank"
              rel="me noopener"
              className="inline-flex rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white"
            >
              Jaeden sur LinkedIn →
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#D71920] p-8 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,.22),transparent_30%)]" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[.35em] text-white/70">Commencez ici</p>
              <h2 className="geist max-w-4xl text-5xl font-black leading-[.9] tracking-[-0.07em] md:text-7xl">
                Dites-nous ce que vous voulez bâtir.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Envoyez l&apos;idée du projet, le site actuel, les objectifs ou le problème. On en fera une prochaine étape claire.
              </p>
            </div>

            <Link href="https://stillawake.studio/fr/demarrer" className="inline-flex rounded-full bg-black px-7 py-4 font-bold text-white transition hover:scale-[1.02]">
              Obtenir un audit gratuit →
            </Link>
          </div>
        </div>
      </section>

      <InternalLinks locale="fr" />
    </main>
  );
}
