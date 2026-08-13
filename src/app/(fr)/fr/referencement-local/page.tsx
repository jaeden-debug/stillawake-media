import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices, PriceCard } from "@/components/service-page";
import { ArticlesLies } from "@/components/articles-lies";

export const metadata: Metadata = {
  title: "Référencement local à Montréal | Être trouvé dans votre quartier",
  description:
    "Référencement local à Montréal : fiche Google, pages locales, données structurées et avis. Inclus dans nos forfaits SEO à 600 $ et 850 $ CAD par mois — avec des positions locales mesurées comme preuve.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/referencement-local",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/referencement-local",
      "en-CA": "https://stillawakemedia.com/local-seo",
      "x-default": "https://stillawakemedia.com/local-seo",
    },
  },
  openGraph: {
    title: "Référencement local Montréal",
    description: "Fiche Google, pages locales, avis et données structurées — avec des positions mesurées.",
    url: "https://stillawakemedia.com/fr/referencement-local",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte le référencement local?",
    "Chez nous, il n'est pas vendu à part : le travail local est inclus dans les forfaits SEO à 600 $ et 850 $ CAD par mois, parce qu'un référencement local sans fondation technique ne tient pas. Les prix sont publics et il n'y a pas de contrat de 12 mois.",
  ],
  [
    "Qu'est-ce que le référencement local exactement?",
    "C'est l'ensemble du travail qui vous fait apparaître quand quelqu'un cherche votre service avec une intention géographique : « plombier Rosemont », « agence de voyage à Montréal ». Ça combine votre fiche Google (Google Business Profile), des pages dédiées par service et par zone, des données structurées LocalBusiness, la cohérence de vos coordonnées partout sur le web, et les avis.",
  ],
  [
    "En combien de temps voit-on des résultats?",
    "Le référentiel honnête : les corrections de fiche Google peuvent bouger en quelques semaines; les positions organiques locales prennent généralement de 3 à 6 mois. Méfiez-vous de quiconque promet la première position — personne ne contrôle Google. Ce qu'on contrôle : le travail, mesuré et rapporté chaque mois depuis la Search Console.",
  ],
  [
    "Servez-vous Laval et la Rive-Sud?",
    "Oui. Le rayonnement local dépasse l'île : nos recherches de marché mesurent une vraie demande à Laval et Longueuil avec beaucoup moins de concurrence qu'au centre-ville — souvent l'occasion la plus rentable pour une entreprise de banlieue.",
  ],
  [
    "Faut-il un référencement local en français et en anglais?",
    "À Montréal, oui — les deux marchés cherchent différemment. Nos données de recherche montrent par exemple que les Québécois disent « site web » 2,6 fois plus souvent que « site internet ». Nous construisons les deux versions avec hreflang, comme sur ce site même : chaque page existe en français et en anglais.",
  ],
  [
    "Gérez-vous les avis Google?",
    "Nous mettons en place le système : moments de demande, gabarits bilingues, réponses aux avis. Nous n'achetons ni ne fabriquons jamais d'avis — c'est contre les règles de Google et c'est du poison à long terme pour une entreprise locale.",
  ],
];

export default function ReferencementLocalPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/referencement-local"
        name="Référencement local à Montréal"
        description="Optimisation de fiche Google, pages locales, données structurées LocalBusiness et stratégie d'avis — inclus dans les forfaits SEO mensuels."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Référencement local", "/fr/referencement-local"]]}
        faq={FAQ}
        offers={[
          { name: "SEO Essentiel (inclut le local)", price: 600, currency: "CAD", interval: "MONTH" },
          { name: "SEO Croissance (inclut le local)", price: 850, currency: "CAD", interval: "MONTH" },
        ]}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Référencement local</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Être trouvé par les gens de votre quartier — mesurablement.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce que le référencement local?</strong> C&apos;est le travail
            qui vous fait apparaître quand quelqu&apos;un à Montréal, Laval ou sur la Rive-Sud cherche exactement ce
            que vous offrez, près de chez lui. Fiche Google, pages par service et par zone, données structurées, avis
            — un système, pas une astuce. Et comme tout notre SEO : prix publics, rapports mensuels depuis la Search
            Console, aucun contrat de 12 mois.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">Évaluer ma visibilité locale</Link>
            <Link href="/fr/agence-seo-montreal" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">Voir les forfaits SEO</Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Des positions locales réelles, pas des promesses
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Link href="/fr/etude-de-cas-lisa-travel-design" className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
              <p className="geist text-2xl font-black tracking-[-0.04em] text-[#D71920]">Page 1 locale</p>
              <h3 className="mt-2 text-lg font-semibold">TravelDesign By Lisa — agente de voyage à Montréal</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                Une entreprise de services locale partie de zéro visibilité : sa page « travel agent Montréal » tient
                maintenant des positions en page 1 (position moyenne ~7,9, Google Search Console). Le local n&apos;est pas venu d&apos;une astuce — il est venu d&apos;une plateforme
                trilingue techniquement irréprochable (CLS mesuré : 0,00) et de pages dédiées par intention.
              </p>
            </Link>
            <Link href="/fr/etude-de-cas-blackwater-aquatics" className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
              <p className="geist text-2xl font-black tracking-[-0.04em] text-[#D71920]">Intention « au Canada »</p>
              <h3 className="mt-2 text-lg font-semibold">Blackwater Aquatics — se positionner sur la géographie</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                Des collections construites autour de l&apos;intention géographique réelle (« live fish food Canada »,
                « betta fish Canada ») : ~60 000 impressions sur les 12 meilleures pages et des guides aux positions
                5 à 8. La même mécanique s&apos;applique à « près de moi » et aux quartiers.
              </p>
            </Link>
          </div>
          <p className="mt-8 max-w-3xl leading-8 text-[#C7B9B9]">
            Et une donnée de marché que peu d&apos;agences vous montrent : notre recherche de mots-clés (Google
            Keyword Planner, geo Québec) mesure une demande réelle mais une concurrence bien plus faible à{" "}
            <strong className="text-white">Laval et Longueuil</strong> qu&apos;au centre-ville de Montréal. Si votre
            entreprise est en banlieue, c&apos;est souvent là que le référencement local rapporte le plus vite.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em]">Le travail, concrètement</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-[#D71920]">1. Fondation</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#C7B9B9]">
                <li>— Fiche Google complète : catégories, services, photos, heures</li>
                <li>— Coordonnées identiques partout (nom, adresse, téléphone)</li>
                <li>— Données structurées LocalBusiness — comme celles de ce site</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#D71920]">2. Pages locales</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#C7B9B9]">
                <li>— Une page par service, par langue — jamais de pages clones par quartier</li>
                <li>— Contenu bilingue avec hreflang, écrit pour l&apos;intention d&apos;ici</li>
                <li>— Maillage interne qui concentre l&apos;autorité</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#D71920]">3. Preuve et suivi</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#C7B9B9]">
                <li>— Système d&apos;avis : demandes, gabarits, réponses</li>
                <li>— Rapport mensuel : positions, clics, appels — depuis la Search Console</li>
                <li>— Ce qui a été fait, ce qui s&apos;en vient, sans jargon</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em]">Inclus dans nos forfaits SEO</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            Nous ne vendons pas le local à la pièce : sans fondation technique, il ne tient pas. Les deux forfaits
            l&apos;incluent — prix publics, sans contrat annuel.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <PriceCard
              name="SEO Essentiel"
              price="600 $ CAD"
              cadence="par mois"
              items={[
                "Fondation technique complète",
                "Fiche Google et données structurées LocalBusiness",
                "Pages locales par service, bilingues",
                "Rapport mensuel depuis la Search Console",
              ]}
              cta={["Voir le forfait", "/fr/agence-seo-montreal"]}
            />
            <PriceCard
              name="SEO Croissance"
              price="850 $ CAD"
              cadence="par mois"
              items={[
                "Tout le forfait Essentiel",
                "Contenu mensuel écrit pour l'intention locale",
                "Autorité locale et stratégie d'avis",
                "Optimisation pour les réponses d'IA (AEO)",
              ]}
              cta={["Voir le forfait", "/fr/agence-seo-montreal"]}
              highlight
            />
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Guide : fiche Google Entreprise", "/fr/fiche-google-entreprise"],
          ["Guide : le SEO expliqué", "/fr/referencement-naturel"],
          ["Guide des prix", "/fr/prix-site-web-quebec"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/local-seo"],
        ]}
      />
    
      <ArticlesLies pillar="/fr/referencement-local" />
    </main>
  );
}
