import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Tarifs | StillAwake Media — Prix affichés, sans appel de vente",
  description:
    "Tarifs StillAwake Media : forfaits SEO de 600 $ à 850 $ CAD par mois, dépannage d'urgence de 150 $ à 600 $ CAD, et soumissions écrites pour les projets. Transparent, en dollars canadiens.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/tarifs",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/tarifs",
      "en-CA": "https://stillawakemedia.com/pricing",
      "x-default": "https://stillawakemedia.com/pricing",
    },
  },
  openGraph: {
    title: "Tarifs | StillAwake Media",
    description: "Prix affichés pour le SEO, la maintenance et le support. Soumissions écrites pour les projets.",
    url: "https://stillawakemedia.com/fr/tarifs",
    type: "website",
    locale: "fr_CA",
  },
};

export default function TarifsPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/tarifs"
        name="Tarifs des services StillAwake Media"
        description="Tarifs affichés : forfaits SEO mensuels, dépannage d'urgence à paiement unique, et travaux sur devis."
        offers={[
          { name: "Croissance SEO — Essentiel", price: 600, interval: "MONTH" },
          { name: "Croissance SEO — Avancé", price: 850, interval: "MONTH" },
          { name: "Support d'urgence — Site sur mesure", price: 150 },
          { name: "Support d'urgence — Ecommerce", price: 250 },
        ]}
        breadcrumb={[
          ["Accueil", "/"],
          ["Tarifs", "/fr/tarifs"],
        ]}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-16 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Tarifs</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Les prix sont sur la page. C&apos;est ça, l&apos;idée.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            La plupart des agences cachent leurs prix derrière un appel de découverte. StillAwake Media les affiche :
            les services récurrents ont un prix mensuel, le support a des tarifs uniques, et les projets reçoivent une
            soumission écrite via un formulaire asynchrone — jamais d&apos;appel de vente obligatoire. Tous les prix
            sont en dollars canadiens.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist text-4xl font-black tracking-[-0.06em]">Mensuel — forfaits SEO</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Croissance SEO — Essentiel coûte 600 $ CAD par mois. Croissance SEO — Avancé coûte 850 $ CAD par mois.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Croissance SEO — Essentiel"
              price="600 $ CAD"
              cadence="par mois"
              items={["SEO technique", "Optimisation des pages", "Suivi Search Console", "Rapport mensuel"]}
              cta={["Choisir Essentiel", "/fr/agence-seo-montreal"]}
            />
            <PriceCard
              name="Croissance SEO — Avancé"
              price="850 $ CAD"
              cadence="par mois"
              items={["Tout Essentiel", "Optimisation IA (AEO)", "Optimisation des entités", "Stratégie de contenu"]}
              cta={["Choisir Avancé", "/fr/agence-seo-montreal"]}
              highlight
            />
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Paiement unique — support d&apos;urgence</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Urgence — Site sur mesure"
              price="150 $ – 400 $ CAD"
              cadence="paiement unique"
              items={["150 $ correctif rapide", "250 $ incident prioritaire", "400 $ incident majeur", "Réponse le jour même (heures d'affaires)"]}
              cta={["Obtenir de l'aide", "/fr/maintenance-site-web"]}
            />
            <PriceCard
              name="Urgence — Boutique en ligne"
              price="250 $ – 600 $ CAD"
              cadence="paiement unique"
              items={["250 $ triage", "400 $ incident prioritaire", "600 $ critique", "Shopify et sur mesure"]}
              cta={["Réparer ma boutique", "/fr/maintenance-site-web"]}
            />
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Sur devis — projets</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Création de site web", "/fr/agence-web-montreal"],
              ["Développement Shopify", "/fr/developpement-shopify"],
              ["Référencement IA (AEO)", "/fr/referencement-ia"],
            ].map(([n, h]) => (
              <Link key={h} href={h} className="rounded-[2rem] border border-white/10 p-6 transition hover:border-[#D71920]/60">
                <h3 className="text-lg font-semibold">{n}</h3>
                <p className="mt-2 text-sm text-[#C7B9B9]">Portée écrite + prix fixe par courriel.</p>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-[2rem] bg-[#D71920] p-10">
            <h2 className="geist max-w-2xl text-4xl font-black tracking-[-0.06em]">Sautez l&apos;appel de vente. Dites-nous ce que vous bâtissez.</h2>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-black px-6 py-4 font-bold">Démarrer un projet →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
