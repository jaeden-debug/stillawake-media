import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Référencement IA (AEO) | Être cité par ChatGPT et Google IA",
  description:
    "Optimisation pour les moteurs de réponse (AEO) : faites en sorte que ChatGPT, Perplexity, Gemini et les aperçus IA de Google trouvent, comprennent et citent votre entreprise québécoise.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/referencement-ia",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/referencement-ia",
      "en-CA": "https://stillawakemedia.com/answer-engine-optimization",
      "x-default": "https://stillawakemedia.com/answer-engine-optimization",
    },
  },
  openGraph: {
    title: "Référencement IA (AEO) | StillAwake Media",
    description: "Optimisation pour moteurs de réponse : entités, données structurées, contenu citable.",
    url: "https://stillawakemedia.com/fr/referencement-ia",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Qu'est-ce que le référencement IA (AEO)?",
    "Le référencement IA — aussi appelé AEO (answer engine optimization) ou optimisation pour moteurs de réponse — consiste à structurer votre site et vos informations d'entreprise pour que les systèmes d'IA comme ChatGPT, Perplexity, Gemini et les aperçus IA de Google puissent les trouver, les comprendre et les citer quand vos clients posent des questions.",
  ],
  [
    "Est-ce que ça remplace le SEO traditionnel?",
    "Non — ça le complète. Le SEO vous fait gagner des positions dans les résultats de recherche; l'AEO vous fait citer à l'intérieur des réponses générées par l'IA. Le bon travail d'AEO (entités, données structurées, contenu clair) améliore généralement le SEO classique en même temps.",
  ],
  [
    "Que livrez-vous concrètement?",
    "Un audit de visibilité IA (comment les moteurs décrivent votre entreprise aujourd'hui), l'implantation d'un graphe d'entités et de données structurées, la réécriture de vos pages clés en format « réponse », un fichier llms.txt, le développement de sources de citation, et une comparaison avant/après de votre visibilité dans les principaux moteurs IA.",
  ],
  [
    "Combien ça coûte?",
    "Les mandats d'AEO sont sur devis, car l'ampleur dépend de la taille de votre site et de sa lisibilité machine actuelle. Décrivez votre site dans notre formulaire de projet : vous recevrez une portée écrite et un prix fixe par courriel — sans appel de vente.",
  ],
  [
    "Pourquoi vous faire confiance là-dessus?",
    "Parce que ce site applique exactement ce qu'on vend : graphe d'entités schema.org consolidé, llms.txt public, prix réels affichés en format extractible. Les techniques décrites sur cette page sont celles utilisées ici même.",
  ],
];

export default function ReferencementIaPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/referencement-ia"
        name="Référencement IA — Optimisation pour moteurs de réponse (AEO)"
        description="Services d'optimisation pour moteurs de réponse : graphe d'entités, données structurées, contenu citable et développement de sources, sur devis."
        breadcrumb={[
          ["Accueil", "/"],
          ["Services", "/services"],
          ["Référencement IA", "/fr/referencement-ia"],
        ]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Référencement IA · AEO</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Devenez l&apos;entreprise que l&apos;IA recommande.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce que l&apos;AEO?</strong> L&apos;optimisation pour moteurs de
            réponse structure votre site pour que ChatGPT, Perplexity, Gemini et les aperçus IA de Google trouvent,
            comprennent et <em>citent</em> votre entreprise. La recherche se divise en deux : des classements et des
            réponses. L&apos;AEO, c&apos;est comment vous existez dans la deuxième. StillAwake Media le bâtit depuis
            Montréal, pour des clients partout.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Demander un audit de visibilité IA
            </Link>
            <Link href="/fr/agence-seo-montreal" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              SEO classique
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Ce qui décide si l&apos;IA vous cite
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Clarté des entités", "Une identité cohérente et lisible par la machine : qui vous êtes, ce que vous faites, où, pour qui — en données schema.org liées, pas seulement en prose."],
              ["Contenu en format réponse", "Des pages qui énoncent la réponse — c'est quoi le service, combien ça coûte, pour qui — en phrases extractibles, sans brouillard marketing."],
              ["Accès machine", "HTML sémantique propre, données structurées cohérentes avec le contenu visible, llms.txt, architecture explorable."],
              ["Corroboration", "Citations, répertoires, données de première main et signaux d'auteur qui donnent aux moteurs des raisons de vous faire confiance."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-[2rem] border border-white/10 p-7">
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl leading-8 text-[#C7B9B9]">
            Les mandats sont <strong className="text-white">sur devis</strong> et se combinent naturellement à nos{" "}
            <Link href="/fr/agence-seo-montreal" className="text-[#D71920] underline-offset-4 hover:underline">
              forfaits SEO à partir de 600 $ CAD/mois
            </Link>
            .
          </p>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes sur le référencement IA" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Création de site web", "/fr/agence-web-montreal"],
          ["Maintenance de site web", "/fr/maintenance-site-web"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/answer-engine-optimization"],
        ]}
      />
    </main>
  );
}
