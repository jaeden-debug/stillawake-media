import type { Metadata } from "next";
import { ServiceJsonLd, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Étude de cas : TravelDesign By Lisa — de 0 clic à la page 1 en 8 semaines",
  description:
    "Comment StillAwake Media a bâti une plateforme de voyage trilingue — 834 URL, CMS sur mesure, boutique eSIM, 412 tests automatisés — et l'a menée de zéro clic organique à la page 1. Chiffres réels, sourcés et datés.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/etude-de-cas-lisa-travel-design",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/etude-de-cas-lisa-travel-design",
      "en-CA": "https://stillawakemedia.com/work/lisa-travel-design",
      "x-default": "https://stillawakemedia.com/work/lisa-travel-design",
    },
  },
  openGraph: {
    title: "Étude de cas : TravelDesign By Lisa | StillAwake Media",
    description: "De zéro clic organique à la page 1 en 8 semaines — chaque chiffre est sourcé.",
    url: "https://stillawakemedia.com/fr/etude-de-cas-lisa-travel-design",
    type: "article",
    locale: "fr_CA",
  },
};

const METRICS: [string, string, string][] = [
  ["0 → page 1", "Bascule organique", "Audit du 22 juin : 14 mots-clés, position moyenne 64, zéro clic. Août (fenêtre GSC de 180 jours) : positions en page 1 (5,3–8,9) sur plusieurs requêtes cibles d'hôtels, ~9 000 impressions sur un seul article comparatif."],
  ["9 min 06 s", "Durée moyenne de session", "GA4, fenêtre de 90 jours se terminant le 12 août 2026 — avec un taux d'engagement de 59,9 %. Les visiteurs ne rebondissent pas; ils lisent."],
  ["0,00 CLS · 100 BP", "Performance mesurée", "Audit Lighthouse exécuté par nous le 12 août 2026 (mobile) : décalage de mise en page 0,00, Bonnes pratiques 100, Accessibilité 93, SEO 92."],
  ["~2 300", "Défauts SEO corrigés", "L'audit Ahrefs relevait ~3 000 instances de problèmes; l'analyse a retracé ~88 % à une seule mauvaise configuration. Onze fichiers et une variable d'environnement plus tard : titres dupliqués 7→0, sitemap dédupliqué de 716 à 634 URL."],
  ["412", "Tests automatisés", "Suites unitaires, bout-en-bout et sécurité (frontières RLS et auth incluses) — toutes au vert à la dernière exécution enregistrée."],
  ["0 critique / 0 élevé", "Posture de sécurité", "Sonde boîte noire des 77 routes API plus revue de chaque frontière d'authentification (5 août 2026). Deux constats mineurs — corrigés dans le même cycle."],
];

export default function EtudeDeCasLisa() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/etude-de-cas-lisa-travel-design"
        name="Étude de cas : TravelDesign By Lisa"
        description="Plateforme de voyage trilingue : 834 URL, CMS sur mesure, commerce eSIM, redressement SEO mesuré de zéro clic à la page 1."
        breadcrumb={[
          ["Accueil", "/fr"],
          ["Études de cas", "/work"],
          ["TravelDesign By Lisa", "/fr/etude-de-cas-lisa-travel-design"],
        ]}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Étude de cas · Voyage</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            TravelDesign By Lisa : de zéro clic organique à la page 1 — avec les preuves.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            Une conseillère en voyages de Montréal avait besoin de plus qu&apos;une brochure : d&apos;une entreprise de
            réservation. En 65 jours et 310 commits, nous avons bâti{" "}
            <a href="https://lisatraveldesign.com/fr" className="text-[#D71920] underline-offset-4 hover:underline" rel="noopener">lisatraveldesign.com</a> —
            une plateforme trilingue (FR/EN/ES) de 834 URL : CMS sur mesure, portail client et CRM, générateur de
            soumissions, et une boutique eSIM en direct avec paiement Stripe. Puis nous avons corrigé ce que les audits
            ont trouvé, et mesuré le résultat. Chaque chiffre ci-dessous a une source et une date.
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

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="geist text-3xl font-black tracking-[-0.06em]">Ce qui a réellement été bâti</h2>
              <ul className="mt-6 space-y-3 text-[#C7B9B9]">
                <li>— Architecture trilingue de 834 URL (EN 345 / FR 342 / ES 149)</li>
                <li>— CMS sur mesure sur Supabase : 56 migrations, résolveur de liens bilingue, planification</li>
                <li>— Commerce eSIM : catalogue, paiement Stripe, exécution et réconciliation automatisées</li>
                <li>— Portail client, CRM, générateur de soumissions avec dates de voyage</li>
                <li>— Pipeline d&apos;images : WebP qualité 80, aperçus flous, plafond 2200 px</li>
                <li>— 199 pages d&apos;exigences d&apos;entrée par pays × 3 langues, recherche tolérante aux fautes</li>
              </ul>
            </div>
            <div>
              <h2 className="geist text-3xl font-black tracking-[-0.06em]">La partie honnête</h2>
              <p className="mt-6 leading-8 text-[#C7B9B9]">
                C&apos;est un site jeune — les chiffres absolus de trafic sont ceux d&apos;un démarrage et nous les
                publions quand même : 573 sessions et 9 conversions en 90 jours. Ce que les données prouvent, c&apos;est
                la trajectoire et la qualité : il y a deux mois, Google n&apos;envoyait rien à ce site; aujourd&apos;hui
                il tient des positions en page 1 sur ses requêtes cibles avec l&apos;engagement le plus profond que nous
                ayons mesuré. Quand les coûts d&apos;infrastructure ont grimpé, nous avons réduit le poids par page de
                ~95 % (≈750 Ko → ≈30 Ko). Quand un incident de sécurité est survenu le 5 août, nous avons corrigé,
                renforcé et <em>documenté</em> le tout la journée même. C&apos;est ça, être responsable d&apos;un site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices
        title="Les services derrière ce projet"
        links={[
          ["Création de site web à Montréal", "/fr/agence-web-montreal"],
          ["Développement logiciel sur mesure", "/fr/developpement-logiciel"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Maintenance de site web", "/fr/maintenance-site-web"],
          ["English version", "/work/lisa-travel-design"],
        ]}
      />
    </main>
  );
}
