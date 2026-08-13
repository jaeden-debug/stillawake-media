import type { Metadata } from "next";
import { ServiceJsonLd, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Étude de cas : NAVTRL / Stalkr — une app de localisation en 24 jours",
  description:
    "Comment StillAwake Media a bâti Stalkr : une app de localisation en temps réel de 11 000 lignes (équipes, zones, SOS) en 24 jours, plus un moteur de croissance de 31 routes mesuré à 98/100/100.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/etude-de-cas-stalkr-navtrl",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/etude-de-cas-stalkr-navtrl",
      "en-CA": "https://stillawakemedia.com/work/stalkr-navtrl",
      "x-default": "https://stillawakemedia.com/work/stalkr-navtrl",
    },
  },
  openGraph: {
    title: "Étude de cas : NAVTRL / Stalkr",
    description: "Une app de localisation en temps réel menée au bêta TestFlight en 24 jours — avec son moteur de croissance.",
    url: "https://stillawakemedia.com/fr/etude-de-cas-stalkr-navtrl",
    type: "article",
    locale: "fr_CA",
  },
};

const METRICS: [string, string, string][] = [
  ["24 jours", "De l'idée au build prêt pour TestFlight", "10 947 lignes de TypeScript sur 11 écrans : suivi d'équipe en direct, zones géorepérées, trajets, invitations et trajets de sécurité — du premier commit à la préparation TestFlight en moins d'un mois (mai 2026, historique git)."],
  ["< 3 secondes", "Synchronisation en temps réel", "Diffusion Supabase Realtime avec une cible de mise à jour sous 3 secondes, détection des marqueurs fantômes après 5 minutes, et optimisation du rendu par couche documentée dans une architecture de 355 lignes."],
  ["3 s maintenues · 60 s de repos", "Ingénierie de sécurité", "Le déclencheur SOS est volontairement difficile à activer par accident et impossible à spammer — activation par maintien avec périodes de repos, pings « Je vais bien » et observateurs de trajet avec leur propre canal de notifications."],
  ["98 / 100 / 100", "Site marketing, mesuré", "navtrl.com : Accessibilité 98, Bonnes pratiques 100, SEO 100 — plus un 100 parfait en navigation agentique, l'audit de navigabilité IA. Chrome Lighthouse (mobile), exécuté par nous le 12 août 2026."],
  ["31 routes", "Le moteur de croissance", "19 pages d'atterrissage ciblées par intention, 40 articles, pages de suivi en direct avec aperçus riches, et liens profonds Apple — bâtis en 19 jours en parallèle de l'app."],
  ["34 gabarits", "Marketing de cycle de vie intégré", "Séquence d'accueil de 7 courriels, séquences d'activation et relances à 30/60/90 jours — 34 gabarits branchés à la liste d'attente avant le lancement, pas après."],
];

export default function EtudeStalkr() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/etude-de-cas-stalkr-navtrl"
        name="Étude de cas : NAVTRL / Stalkr"
        description="App de localisation en temps réel (équipes, zones, SOS) menée à TestFlight en 24 jours, avec un moteur de croissance de 31 routes mesuré à 98/100/100."
        breadcrumb={[
          ["Accueil", "/fr"],
          ["Études de cas", "/work"],
          ["NAVTRL / Stalkr", "/fr/etude-de-cas-stalkr-navtrl"],
        ]}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Étude de cas · App mobile / SaaS</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Stalkr : une app de localisation en temps réel, menée au bêta en 24 jours.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            Stalkr, de <a href="https://navtrl.com" className="text-[#D71920] underline-offset-4 hover:underline" rel="noopener">NAVTRL</a>,
            c&apos;est la localisation en direct pour les équipes qui sortent des sentiers — chasseurs, road trips,
            familles : positions en temps réel, zones géorepérées, trajets et parcours de sécurité avec SOS. Nous avons
            bâti l&apos;app React Native ET la machine de croissance autour — pages d&apos;atterrissage, courriels de
            cycle de vie, pages de partage en direct — comme un seul système.
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
              Stalkr est en bêta TestFlight — pas encore sur l&apos;App Store public, et nous le disons. Ce que le
              projet prouve, c&apos;est la vitesse avec discipline : une liste de contrôle qualité de 60 cas avec des
              seuils explicites, une table des causes racines pour chaque bogue de carte corrigé (six, chacun avec sa
              vraie cause nommée), et la sécurité au niveau des lignes sur chaque table — y compris les données de
              localisation. Un produit en bêta mérite la même honnêteté d&apos;ingénierie qu&apos;un produit à grande
              échelle.
            </p>
          </div>
        </div>
      </section>

      <RelatedServices
        title="Les services derrière ce projet"
        links={[
          ["Développement logiciel sur mesure", "/fr/developpement-logiciel"],
          ["Création de site web à Montréal", "/fr/agence-web-montreal"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["English version", "/work/stalkr-navtrl"],
        ]}
      />
    </main>
  );
}
