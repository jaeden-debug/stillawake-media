import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";
import { ArticlesLies } from "@/components/articles-lies";

export const metadata: Metadata = {
  title: "Développement Shopify | Expert Shopify à Montréal",
  description:
    "Expert Shopify à Montréal : création de boutique en ligne, thèmes sur mesure, optimisation SEO et dépannage Shopify. Boutiques rapides, bilingues, bâties pour vendre.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/developpement-shopify",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/developpement-shopify",
      "en-CA": "https://stillawakemedia.com/shopify-development",
      "x-default": "https://stillawakemedia.com/shopify-development",
    },
  },
  openGraph: {
    title: "Développement Shopify | StillAwake Media",
    description: "Création de boutique Shopify, thèmes sur mesure, SEO et support — de Montréal.",
    url: "https://stillawakemedia.com/fr/developpement-shopify",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte une boutique Shopify?",
    "Une boutique Shopify professionnelle est un projet sur devis : le prix dépend du catalogue, du design, des intégrations et du contenu. Décrivez votre projet dans notre formulaire et vous recevrez une portée écrite avec un prix fixe — sans appel de vente. Le dépannage d'urgence, lui, a des tarifs affichés de 250 $ à 600 $ CAD.",
  ],
  [
    "Créez-vous des thèmes Shopify sur mesure?",
    "Oui — c'est une de nos spécialités. Nous concevons et développons des thèmes Shopify originaux, rapides et conformes aux exigences de la plateforme, plutôt que d'empiler des applications sur un thème générique.",
  ],
  [
    "Ma boutique peut-elle être bilingue?",
    "Oui. Nous bâtissons des boutiques français-anglais adaptées au marché québécois : URL localisées, contenu traduit correctement, données structurées dans les deux langues.",
  ],
  [
    "Pouvez-vous réparer ou reprendre une boutique existante?",
    "Oui. Nous offrons le dépannage d'urgence (tarifs affichés), l'optimisation de vitesse, le SEO Shopify et la reprise de boutiques mal construites — même si nous ne les avons pas créées.",
  ],
  [
    "Travaillez-vous seulement à Montréal?",
    "Non. Nous sommes basés à Montréal et travaillons à distance avec des marchands partout au Québec et au Canada.",
  ],
];

export default function DeveloppementShopifyPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/developpement-shopify"
        name="Développement Shopify — création de boutique et thèmes sur mesure"
        description="Services Shopify à Montréal : création de boutique en ligne, développement de thèmes sur mesure, SEO Shopify et support d'urgence, sur devis."
        breadcrumb={[
          ["Accueil", "/"],
          ["Services", "/services"],
          ["Développement Shopify", "/fr/developpement-shopify"],
        ]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Shopify · Ecommerce</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Développement Shopify : des boutiques bâties pour vendre, pas juste pour exister.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce que le développement Shopify?</strong> C&apos;est la
            conception et la construction complète de votre boutique en ligne sur Shopify : thème, catalogue, paiement,
            vitesse, SEO et contenu. StillAwake Media développe des thèmes Shopify sur mesure et des boutiques
            bilingues depuis Montréal — dont des boutiques canadiennes réelles que vous pouvez visiter dans notre
            portfolio.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Démarrer ma boutique
            </Link>
            <Link href="/fr/realisations" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              Voir nos boutiques
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Ce que vous recevez</h2>
            <ul className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>— Boutique Shopify complète : design, thème, catalogue, paiement</li>
              <li>— Thème sur mesure, rapide, sans dépendance à vingt applications</li>
              <li>— SEO Shopify : structure, collections, données structurées, vitesse</li>
              <li>— Bilinguisme français-anglais pensé pour le Québec</li>
              <li>— Formation pour gérer votre boutique vous-même</li>
            </ul>
          </div>
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Prix et processus</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Chaque boutique est <strong className="text-white">sur devis</strong> : vous décrivez votre projet dans
              notre formulaire asynchrone, et vous recevez une portée écrite avec prix fixe par courriel. Besoin
              d&apos;aide urgente sur une boutique existante? Le{" "}
              <Link href="/fr/maintenance-site-web" className="text-[#D71920] underline-offset-4 hover:underline">
                dépannage ecommerce
              </Link>{" "}
              coûte de 250 $ à 600 $ CAD, tarif affiché avant paiement.
            </p>
            <Link href="https://stillawake.studio/fr/demarrer" className="mt-8 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">
              Obtenir une soumission
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes sur Shopify" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Création de site web à Montréal", "/fr/agence-web-montreal"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Guide : boutique en ligne au Québec", "/fr/boutique-en-ligne-quebec"],
          ["Maintenance et dépannage", "/fr/maintenance-site-web"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/shopify-development"],
        ]}
      />
    
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[.3em] text-[#D71920]">Des preuves, pas des promesses</p>
          <h2 className="geist max-w-3xl text-3xl font-black tracking-[-0.06em]">Une fiche produit à 8,6 % de CTR et 27,8 % de clients récurrents — mesuré.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            Blackwater Aquatics Canada : 64 pages éducatives derrière une boutique Shopify de 17 produits — positions
            en page 1, ~60 000 impressions sur les meilleures pages, et un taux de fidélité plus que quadruplé. Sourcé et daté.
          </p>
          <a href="/fr/etude-de-cas-blackwater-aquatics" className="mt-6 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Lire l'étude de cas →</a>
        </div>
      </section>
    
      <ArticlesLies pillar="/fr/developpement-shopify" />
    </main>
  );
}
