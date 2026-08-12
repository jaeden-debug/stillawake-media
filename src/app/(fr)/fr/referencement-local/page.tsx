import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Référencement local | Être trouvé par les clients près de chez vous",
  description: "Référencement local pour entreprises québécoises : fiche Google, recherches « près de moi », visibilité sur la carte et avis. Inclus dans nos forfaits SEO de 600 $ à 850 $ CAD/mois.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/referencement-local",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/referencement-local",
      "en-CA": "https://stillawakemedia.com/local-seo",
      "x-default": "https://stillawakemedia.com/local-seo",
    },
  },
  openGraph: {
    title: "Référencement local | Être trouvé par les clients près de chez vous",
    description: "Référencement local pour entreprises québécoises : fiche Google, recherches « près de moi », visibilité sur la carte et avis. Inclus dans nos forfaits SEO de 600 $ à 850 $ CAD/mois.",
    url: "https://stillawakemedia.com/fr/referencement-local",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [["Combien coûte le référencement local?", "Il est inclus dans nos forfaits SEO affichés : 600 $ CAD/mois (Essentiel) ou 850 $ CAD/mois (Avancé). Pas de supplément caché pour le volet local."], ["Combien de temps avant d'apparaître sur la carte?", "Les optimisations de fiche produisent souvent des effets en quelques semaines; la progression dans le trio local des recherches concurrentielles se bâtit sur des mois, avis et contenu aidant."], ["Couvrez-vous Laval et la Rive-Sud?", "Oui — Montréal, Laval, Longueuil, la Rive-Sud et tout le Québec, à distance."], ["Gérez-vous les avis Google?", "Nous mettons en place la stratégie et les outils pour en obtenir; les avis eux-mêmes doivent venir de vrais clients — jamais achetés ni fabriqués."]];

export default function Page() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/referencement-local"
        name="Référencement local"
        description="Visibilité locale : fiche Google, carte, avis et pages locales — inclus dans les forfaits SEO mensuels."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Référencement local", "/fr/referencement-local"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />
      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Référencement local</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">Quand quelqu'un cherche près de chez vous, soyez la réponse.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu'est-ce que le référencement local?</strong> C'est le travail qui fait apparaître votre entreprise quand quelqu'un cherche vos services dans votre région : fiche Google optimisée, présence sur la carte, avis, pages locales et données structurées géographiques. C'est un volet de nos forfaits SEO — pas un produit mystérieux à part.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/fr/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">Obtenir une soumission écrite</Link>
            <Link href="/fr/tarifs" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">Voir les tarifs</Link>
          </div>
        </div>
      </section>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">Ce que vous recevez</h2>
          <ul className="mt-8 grid gap-3 text-[#C7B9B9] md:grid-cols-2">
            {["Optimisation complète de la fiche Google (GBP)", "Cohérence NAP et inscriptions dans les bons répertoires", "Pages et contenu à intention locale", "Stratégie d'avis clients", "Données structurées locales (LocalBusiness, Service)"].map((x) => (<li key={x} className="flex gap-2"><span className="text-[#D71920]">—</span> {x}</li>))}
          </ul>
        </div>
      </section>
      <FaqBlock title="Questions fréquentes" items={FAQ} />
      <RelatedServices title="Services connexes" links={[["Agence SEO Montréal", "/fr/agence-seo-montreal"], ["Création de site web", "/fr/agence-web-montreal"], ["Tarifs", "/fr/tarifs"], ["English version", "/local-seo"]]} />
    </main>
  );
}
