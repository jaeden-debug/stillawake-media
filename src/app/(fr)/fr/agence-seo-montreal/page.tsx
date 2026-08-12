import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Agence SEO Montréal | Référencement avec tarifs affichés",
  description:
    "Agence SEO à Montréal : référencement technique, SEO local et optimisation IA avec tarifs affichés — forfaits de 600 $ à 850 $ CAD par mois. Sans appel de vente obligatoire.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/agence-seo-montreal",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/agence-seo-montreal",
      "en-CA": "https://stillawakemedia.com/seo-montreal",
      "x-default": "https://stillawakemedia.com/seo-montreal",
    },
  },
  openGraph: {
    title: "Agence SEO Montréal | StillAwake Media",
    description: "Référencement technique, SEO local et optimisation IA pour entreprises québécoises. Tarifs affichés.",
    url: "https://stillawakemedia.com/fr/agence-seo-montreal",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûtent vos services SEO?",
    "Nos forfaits SEO sont affichés : Croissance SEO Essentiel coûte 600 $ CAD par mois et Croissance SEO Avancé coûte 850 $ CAD par mois. Pas de frais cachés, pas d'appel de vente obligatoire — le forfait Avancé ajoute l'optimisation pour les moteurs IA (AEO), le travail d'entités et la stratégie de contenu.",
  ],
  [
    "Qu'est-ce que le référencement naturel (SEO)?",
    "Le SEO, ou référencement naturel, est l'ensemble du travail technique et éditorial qui permet à votre site web d'apparaître dans Google quand vos clients cherchent vos services : structure du site, vitesse, contenu, liens internes, données structurées et visibilité locale.",
  ],
  [
    "Faites-vous du référencement local à Montréal?",
    "Oui. Le référencement local — fiche Google Business, recherches « près de moi », visibilité sur la carte — fait partie de nos forfaits. Nous travaillons avec des entreprises de Montréal, Laval, Longueuil, la Rive-Sud et partout au Québec, entièrement à distance.",
  ],
  [
    "En combien de temps voit-on des résultats?",
    "Le SEO est un travail qui se cumule. Les correctifs techniques produisent souvent des effets en quelques semaines; la progression des positions concurrentielles se mesure généralement sur plusieurs mois. Chaque mois, vous recevez un rapport clair sur ce qui a été fait et ce qui a bougé.",
  ],
  [
    "Travaillez-vous en français et en anglais?",
    "Oui. Nous optimisons des sites dans les deux langues — un avantage réel au Québec, où vos clients cherchent dans les deux. Ce site en est la preuve : chaque page commerciale existe dans les deux langues.",
  ],
  [
    "Qu'est-ce que l'optimisation IA (AEO)?",
    "C'est le travail qui permet à ChatGPT, Perplexity, Gemini et aux aperçus IA de Google de comprendre et de citer votre entreprise. Le forfait Avancé l'inclut; nous offrons aussi un service dédié d'optimisation pour moteurs de réponse.",
  ],
];

export default function AgenceSeoMontrealPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/agence-seo-montreal"
        name="Agence SEO Montréal — Référencement naturel et local"
        description="Services de référencement (SEO) à Montréal : SEO technique, référencement local et optimisation IA, avec forfaits mensuels affichés de 600 $ à 850 $ CAD."
        offers={[
          { name: "Croissance SEO — Essentiel", price: 600, interval: "MONTH" },
          { name: "Croissance SEO — Avancé", price: 850, interval: "MONTH" },
        ]}
        breadcrumb={[
          ["Accueil", "/"],
          ["Services", "/services"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
        ]}
        faq={FAQ}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Agence SEO · Montréal</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Agence SEO à Montréal — le référencement, avec les prix affichés.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            StillAwake Media est une agence SEO montréalaise qui bâtit des systèmes de référencement complets : SEO
            technique, référencement local, architecture de contenu et optimisation pour les moteurs IA. Pas de jargon
            creux, pas d&apos;appel de vente obligatoire — des forfaits clairs, un rapport chaque mois, des résultats
            mesurables.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Démarrer mon SEO
            </Link>
            <Link href="/portfolio" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">Forfaits mensuels. Prix en dollars canadiens.</h2>
          <p className="mt-4 max-w-3xl text-[#C7B9B9]">
            Croissance SEO — Essentiel coûte 600 $ CAD par mois. Croissance SEO — Avancé coûte 850 $ CAD par mois.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Croissance SEO — Essentiel"
              price="600 $ CAD"
              cadence="par mois"
              items={["SEO technique", "Optimisation des pages", "Suivi Google Search Console", "Rapport mensuel clair"]}
              cta={["Choisir Essentiel", "/contact"]}
            />
            <PriceCard
              name="Croissance SEO — Avancé"
              price="850 $ CAD"
              cadence="par mois"
              items={["Tout le forfait Essentiel", "Optimisation moteurs IA (AEO)", "Optimisation des entités", "Stratégie de contenu"]}
              cta={["Choisir Avancé", "/contact"]}
              highlight
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Pour qui</h2>
            <ul className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>— Entreprises de services qui veulent des appels et des soumissions, pas juste du trafic</li>
              <li>— Boutiques en ligne qui veulent vendre sans dépendre de la pub</li>
              <li>— Entreprises bilingues qui doivent exister dans les deux langues sur Google</li>
              <li>— Propriétaires qui veulent comprendre ce qu&apos;ils paient chaque mois</li>
            </ul>
          </div>
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Comment ça fonctionne</h2>
            <ol className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>1. Audit initial — technique, contenu, concurrence, visibilité locale</li>
              <li>2. Correctifs techniques et fondations (structure, vitesse, données structurées)</li>
              <li>3. Travail mensuel : contenu, liens internes, visibilité locale et IA</li>
              <li>4. Rapport mensuel : ce qui a été fait, ce qui a bougé, ce qui s&apos;en vient</li>
            </ol>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes sur le SEO" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Création de site web à Montréal", "/fr/agence-web-montreal"],
          ["Optimisation IA (AEO)", "/fr/referencement-ia"],
          ["Maintenance de site web", "/fr/maintenance-site-web"],
          ["Développement Shopify", "/fr/developpement-shopify"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/seo-montreal"],
        ]}
      />
    
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[.3em] text-[#D71920]">Des preuves, pas des promesses</p>
          <h2 className="geist max-w-3xl text-3xl font-black tracking-[-0.06em]">De zéro clic organique à la page 1 en 8 semaines — mesuré.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            TravelDesign By Lisa : plateforme trilingue de 834 URL, ~2 300 défauts SEO corrigés, sessions moyennes de
            9 minutes, CLS 0,00 et Bonnes pratiques 100 mesurés en août 2026. Chaque chiffre est sourcé et daté dans l'étude de cas.
          </p>
          <a href="/fr/etude-de-cas-lisa-travel-design" className="mt-6 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Lire l'étude de cas →</a>
        </div>
      </section>
    </main>
  );
}
