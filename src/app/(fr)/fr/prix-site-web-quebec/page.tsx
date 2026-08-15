import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Prix d'un site web au Québec (guide 2026)",
  description:
    "Combien coûte un site web au Québec en 2026? Fourchettes réelles pour sites vitrines, sites sur mesure, boutiques en ligne et applications web — et les tarifs affichés d'un studio montréalais.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/prix-site-web-quebec",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/prix-site-web-quebec",
      "en-CA": "https://stillawakemedia.com/website-cost-canada",
      "x-default": "https://stillawakemedia.com/website-cost-canada",
    },
  },
  openGraph: {
    title: "Prix d'un site web au Québec (2026)",
    description: "Fourchettes honnêtes pour les sites web québécois — et les prix qu'on affiche nous-mêmes.",
    url: "https://stillawakemedia.com/fr/prix-site-web-quebec",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte un site web au Québec?",
    "En 2026, les fourchettes typiques du marché québécois sont : site en modèle (DIY) 0 $ à 1 500 $; site de petite entreprise fait par des professionnels environ 3 000 $ à 10 000 $; site d'entreprise sur mesure 8 000 $ à 25 000 $; boutique en ligne 5 000 $ à 30 000 $ et plus; application web sur mesure 15 000 $ à bien au-delà de 100 000 $. Ce sont des observations de marché — le vrai prix pour votre projet, c'est une soumission écrite.",
  ],
  [
    "Pourquoi les prix varient-ils autant?",
    "Cinq facteurs expliquent presque tout l'écart : design sur mesure ou modèle, nombre de pages et contenu produit, commerce en ligne et intégrations, référencement (SEO) intégré dès le départ ou rajouté après, et qui est responsable du site après le lancement. Deux « sites web » peuvent légitimement différer par un facteur de dix.",
  ],
  [
    "Combien coûte l'entretien d'un site web?",
    "Après la construction : hébergement et domaine (souvent 10 $ à 100 $ et plus par mois), maintenance et mises à jour, et le travail de croissance comme le SEO. Nos prix sont affichés : site d'entreprise professionnel environ 2 750 $ à 5 750 $ CAD avec référencement local, site plus simple à partir de 1 800 $, boutique en ligne à partir de 4 250 $, cadrage payant à partir de 1 800 $, forfaits SEO de 600 $ à 850 $ par mois et dépannage d'urgence de 150 $ à 600 $.",
  ],
  [
    "Un site pas cher, est-ce une mauvaise idée?",
    "Pas toujours — un site en modèle peut convenir pour valider une idée. Ça devient coûteux quand l'entreprise dépend du site : lenteur, structure SEO impossible à corriger et dépendance à la plateforme coûtent souvent plus cher à réparer que de bâtir correctement dès le départ.",
  ],
  [
    "Comment obtenir un prix exact sans appel de vente?",
    "Décrivez votre projet dans notre formulaire asynchrone : vous répondez aux questions une seule fois et vous recevez une portée écrite avec un prix fixe par courriel. Aucun appel de découverte requis — c'est notre processus standard.",
  ],
];

export default function PrixSiteWebQuebecPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/prix-site-web-quebec"
        name="Prix d'un site web au Québec — guide 2026"
        description="Guide des prix de sites web au Québec : fourchettes du marché pour sites vitrines, sur mesure, boutiques et applications, et les tarifs affichés de StillAwake Media."
        breadcrumb={[
          ["Accueil", "/fr"],
          ["Tarifs", "/fr/tarifs"],
          ["Prix d'un site web", "/fr/prix-site-web-quebec"],
        ]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Guide des prix · 2026</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Combien coûte un site web au Québec?
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            La vraie réponse : <strong className="text-white">d&apos;environ 1 500 $ pour un site en modèle à bien plus
            de 100 000 $ pour une application web sur mesure</strong> — parce que « un site web » décrit dix produits
            différents. Ce guide présente les fourchettes réelles du marché québécois en 2026, ce qui fait bouger le
            prix, et — chose rare pour une agence — les tarifs que nous affichons nous-mêmes.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist text-4xl font-black tracking-[-0.06em]">Fourchettes du marché québécois (2026)</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/20 text-xs uppercase tracking-[0.15em] text-[#C7B9B9]">
                  <th className="py-3 pr-4">Type de site</th>
                  <th className="py-3 pr-4">Fourchette typique (CAD)</th>
                  <th className="py-3">Ce qui fait bouger le prix</th>
                </tr>
              </thead>
              <tbody className="text-[#C7B9B9]">
                {[
                  ["Site en modèle (DIY)", "0 $ – 1 500 $", "Votre temps, limites du modèle, frais de plateforme"],
                  ["Site de petite entreprise (professionnel)", "3 000 $ – 10 000 $", "Nombre de pages, rédaction, personnalisation"],
                  ["Site d'entreprise sur mesure", "8 000 $ – 25 000 $", "Design original, architecture SEO, systèmes de contenu"],
                  ["Boutique en ligne / Shopify", "5 000 $ – 30 000 $ +", "Catalogue, thème sur mesure, intégrations, bilinguisme"],
                  ["Application web / SaaS sur mesure", "15 000 $ – 100 000 $ +", "Fonctionnalités, comptes, paiements, intégrations"],
                ].map(([t, r, w]) => (
                  <tr key={t} className="border-b border-white/10">
                    <td className="py-4 pr-4 text-white">{t}</td>
                    <td className="py-4 pr-4 font-semibold text-white">{r}</td>
                    <td className="py-4">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Ce que StillAwake affiche vraiment</h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              Nos prix sont affichés plutôt que fournis sur demande. Un{" "}
              <strong className="text-white">site d&apos;entreprise professionnel coûte environ 2 750 $ à 5 750 $ CAD</strong>{" "}
              avec le référencement local, un site plus simple{" "}
              <strong className="text-white">part de 1 800 $</strong>, une boutique en ligne{" "}
              <strong className="text-white">à partir de 4 250 $</strong>, et tout ce qu&apos;un formulaire ne peut
              pas cadrer honnêtement commence par un{" "}
              <strong className="text-white">cadrage payant à partir de 1 800 $</strong>, crédité sur la
              construction. On ne vous facture pas plus parce que vous avez plus d&apos;employés. Le récurrent et le support sont publics aussi : forfaits SEO de{" "}
              <strong className="text-white">600 $ à 850 $ CAD par mois</strong>, dépannage d&apos;urgence de{" "}
              <strong className="text-white">150 $ à 400 $ CAD</strong> (site sur mesure) ou{" "}
              <strong className="text-white">250 $ à 600 $ CAD</strong> (boutique), paiement unique. Tous les
              détails sur la page <Link href="/fr/tarifs" className="text-[#D71920] underline-offset-4 hover:underline">Tarifs</Link>.
            </p>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              Les fourchettes ci-dessus sont des observations de marché. Pour une fourchette bâtie à
              partir de votre projet réel plutôt que du marché,{" "}
              <Link
                href="/fr/outils/calculateur-cout-projet"
                className="text-[#D71920] underline-offset-4 hover:underline"
              >
                utilisez le calculateur de coût de projet
              </Link>{" "}
              — il utilise le même modèle tarifaire qu&apos;on emploie pour chiffrer de vrais mandats.
            </p>
            <Link href="https://stillawake.studio/fr/demarrer" className="mt-6 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">
              Obtenir une soumission écrite — sans appel
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions sur les prix" items={FAQ} />

      <RelatedServices
        title="Continuez"
        links={[
          ["Création de site web à Montréal", "/fr/agence-web-montreal"],
          ["Développement Shopify", "/fr/developpement-shopify"],
          ["Tous les tarifs", "/fr/tarifs"],
          ["Maintenance de site web", "/fr/maintenance-site-web"],
          ["English version", "/website-cost-canada"],
        ]}
      />
    </main>
  );
}
