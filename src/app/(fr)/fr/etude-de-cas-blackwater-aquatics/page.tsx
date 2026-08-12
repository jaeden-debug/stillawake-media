import type { Metadata } from "next";
import { ServiceJsonLd, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Étude de cas : Blackwater Aquatics — le commerce Shopify mené par l'éducation",
  description:
    "Comment StillAwake Media a bâti une boutique Shopify canadienne où 64 pages éducatives portent un catalogue de 17 produits : positions en page 1, une fiche produit à 8,6 % de CTR et 27,8 % de clients récurrents.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/etude-de-cas-blackwater-aquatics",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/etude-de-cas-blackwater-aquatics",
      "en-CA": "https://stillawakemedia.com/work/blackwater-aquatics",
      "x-default": "https://stillawakemedia.com/work/blackwater-aquatics",
    },
  },
  openGraph: {
    title: "Étude de cas : Blackwater Aquatics | StillAwake Media",
    description: "Commerce Shopify mené par l'éducation : le contenu dépasse le catalogue 4 pour 1 — et ça vend.",
    url: "https://stillawakemedia.com/fr/etude-de-cas-blackwater-aquatics",
    type: "article",
    locale: "fr_CA",
  },
};

const METRICS: [string, string, string][] = [
  ["8,6 % CTR", "Une fiche produit qui se positionne seule", "La fiche produit de culture de scuds a gagné 230 clics organiques avec un taux de clic de 8,61 % (position 8,5) — Google Search Console, fenêtre de 180 jours au 12 août 2026. Une fiche produit n'y arrive presque jamais sans architecture de contenu derrière."],
  ["~60 000", "Impressions sur les 12 meilleures pages", "≈890 clics organiques sur les 12 meilleures URL dans la même fenêtre, avec des guides d'élevage aux positions 5,7 à 8 — un seul guide de reproduction de bettas a récolté 17 872 impressions."],
  ["27,8 %", "Taux de clients récurrents", "En hausse depuis 5,9 % à la période précédente (Shopify, pondéré par client, fenêtre de 30 jours au 12 août 2026). L'éducation ne fait pas que se positionner — elle fait revenir les acheteurs."],
  ["64 : 17", "Pages contre produits", "Soixante-quatre pages éducatives et quatre blogues derrière un catalogue de dix-sept produits. La boutique est bâtie comme une base de connaissances qui vend — parce que dans une niche, la confiance EST le produit."],
  ["4 collections", "Structure alignée sur l'intention", "Des collections conçues autour des vraies recherches canadiennes (nourriture vivante pour poissons, bettas au Canada) avec une structure canonique propre — les pages de collection se positionnent d'elles-mêmes."],
  ["2 propriétés", "Un écosystème, pas un site", "L'application compagnon SpawnOS (spawnos.app) gagne déjà ses propres positions — guides d'espèces et outils d'aquariophilie qui ramènent la même audience vers la boutique."],
];

export default function EtudeBlackwater() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/etude-de-cas-blackwater-aquatics"
        name="Étude de cas : Blackwater Aquatics Canada"
        description="Boutique Shopify menée par l'éducation : 64 pages de contenu pour 17 produits, positions en page 1, fiche produit à 8,6 % de CTR, 27,8 % de clients récurrents."
        breadcrumb={[
          ["Accueil", "/fr"],
          ["Études de cas", "/work"],
          ["Blackwater Aquatics", "/fr/etude-de-cas-blackwater-aquatics"],
        ]}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Étude de cas · Shopify / Ecommerce</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Blackwater Aquatics : la boutique qui enseigne d&apos;abord — et vend grâce à ça.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <a href="https://blackwateraquatics.ca" className="text-[#D71920] underline-offset-4 hover:underline" rel="noopener">Blackwater Aquatics Canada</a>{" "}
            expédie de la nourriture vivante et des cultures d&apos;élevage — une niche profonde où les acheteurs font
            des recherches obsessives avant de faire confiance. Nous avons donc bâti la boutique Shopify à
            l&apos;envers : 64 pages éducatives et une base de connaissances d&apos;abord, 17 produits portés par
            elles. Résultat : une boutique que Google traite comme une autorité et que les clients traitent comme une
            ressource. Chaque chiffre est sourcé et daté.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {METRICS.map(([big, label, detail]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 p-7">
                <p className="geist text-3xl font-black tracking-[-0.04em] text-[#D71920]">{big}</p>
                <h2 className="mt-2 text-lg font-semibold">{label}</h2>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">La partie honnête</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              C&apos;est une petite boutique de niche et nous ne prétendons pas le contraire — pas de revenus gonflés,
              pas de multiples de vanité. Ce que les données prouvent, c&apos;est le modèle : dans une catégorie où une
              fiche produit ne se positionne normalement pas, l&apos;architecture menée par l&apos;éducation en a mis
              une en page 1 avec 8,6 % de taux de clic, tient les guides aux positions 5 à 8 sur les vraies questions
              de la niche, et a plus que quadruplé le taux de clients récurrents d&apos;une période à l&apos;autre. Des
              commandes arrivent chaque semaine de la recherche organique. C&apos;est le playbook Shopify que nous
              vendons — en production, mesurable, en direct.
            </p>
          </div>
        </div>
      </section>

      <RelatedServices
        title="Les services derrière ce projet"
        links={[
          ["Développement Shopify", "/fr/developpement-shopify"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Shopify ou WooCommerce", "/fr/shopify-vs-woocommerce"],
          ["Dépannage ecommerce", "/fr/maintenance-site-web"],
          ["English version", "/work/blackwater-aquatics"],
        ]}
      />
    </main>
  );
}
