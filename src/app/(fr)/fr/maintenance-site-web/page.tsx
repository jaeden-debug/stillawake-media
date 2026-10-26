import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard, FaqBlock, RelatedServices } from "@/components/service-page";
import { ArticlesLies } from "@/components/articles-lies";
import { EMERGENCY, RECURRING_BY_ID } from "@/lib/pricing/model";
import { EMERGENCY_DESCRIPTIONS, EMERGENCY_LABELS, RECURRING_LABELS } from "@/lib/pricing/labels";

/** Same kernel as the English page — see its comment. */
const tierPrices = (id: keyof typeof EMERGENCY) => EMERGENCY[id].tiers.map((t) => t.price);
const listPrices = (id: keyof typeof EMERGENCY) => {
  const prices = tierPrices(id).map((p) => `${p} $`);
  return `${prices.slice(0, -1).join(", ")} ou ${prices.at(-1)} CAD`;
};
const bandLabel = (id: keyof typeof EMERGENCY) =>
  `${Math.min(...tierPrices(id))} $ – ${Math.max(...tierPrices(id))} $ CAD`;

const CARE = RECURRING_BY_ID["website-care-plan"];
const HOSTING = RECURRING_BY_ID["managed-hosting"];

export const metadata: Metadata = {
  title: "Maintenance de site web et support d'urgence | Tarifs affichés",
  description: `Maintenance de site web et support d'urgence le jour même, de Montréal pour tout le Québec. Forfaits d'entretien à partir de ${HOSTING.monthly} $ CAD par mois et dépannage à partir de ${Math.min(...tierPrices("custom_site"))} $ CAD, tarifs affichés avant le paiement.`,
  alternates: {
    canonical: "https://stillawakemedia.com/fr/maintenance-site-web",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/maintenance-site-web",
      "en-CA": "https://stillawakemedia.com/website-maintenance",
      "x-default": "https://stillawakemedia.com/website-maintenance",
    },
  },
  openGraph: {
    title: "Maintenance de site web",
    description: "Entretien de site web et dépannage d'urgence avec tarifs affichés. De Montréal, partout au Québec.",
    url: "https://stillawakemedia.com/fr/maintenance-site-web",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte un dépannage d'urgence?",
    `Le support d'urgence pour un site sur mesure coûte ${listPrices("custom_site")} (paiement unique) selon l'ampleur du problème : correctif rapide, incident prioritaire ou incident majeur. Pour une boutique en ligne, c'est ${listPrices("ecommerce")}. Trois questions déterminent le niveau — vous voyez le prix exact avant de payer.`,
  ],
  [
    "Qu'est-ce qui compte comme une urgence?",
    "Le site est en panne, le paiement ne fonctionne plus, une mise à jour a tout cassé, les formulaires ne partent plus, ou quelque chose de visible nuit à vos ventes. Si c'est urgent pour vous, ça se qualifie — le niveau reflète simplement l'ampleur du travail.",
  ],
  [
    "Quel est votre délai de réponse?",
    "Le jour même, durant les heures d'affaires, pour les urgences. Vous recevez ensuite un résumé de l'incident et des recommandations pour éviter que ça se reproduise.",
  ],
  [
    "Entretenez-vous des sites que vous n'avez pas créés?",
    "Oui. Nous prenons en charge les sites codés sur mesure, les applications Next.js et React, les boutiques Shopify et la plupart des technologies modernes. WordPress est évalué au cas par cas.",
  ],
  [
    "Offrez-vous des forfaits de maintenance mensuels?",
    `Oui, et le prix est affiché. L'hébergement géré coûte ${HOSTING.monthly} $ CAD par mois. Le forfait d'entretien coûte ${CARE.monthly} $ CAD par mois et comprend l'hébergement, les mises à jour, la surveillance, les sauvegardes et les petites modifications de contenu — sur un forfait, un bris n'entraîne aucuns frais d'incident. Les configurations plus lourdes restent chiffrées individuellement.`,
  ],
  [
    "Travaillez-vous ailleurs qu'à Montréal?",
    "Oui. StillAwake Media est basée à Montréal et travaille à distance avec des entreprises partout au Québec et au Canada. La maintenance et le support d'urgence sont des services entièrement à distance.",
  ],
];

export default function MaintenanceSiteWebPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/maintenance-site-web"
        name="Maintenance de site web et support d'urgence"
        description="Forfaits d'entretien de site web et support d'urgence le jour même avec tarifs affichés, offerts à distance depuis Montréal."
        offers={[
          ...Object.values(EMERGENCY).flatMap((t) =>
            t.tiers.map((tier) => ({
              name: `${EMERGENCY_LABELS[t.id].fr} (${EMERGENCY_LABELS[`${t.id}.${tier.id}`].fr})`,
              price: tier.price,
            })),
          ),
          { name: RECURRING_LABELS["managed-hosting"].fr, price: HOSTING.monthly!, interval: "MONTH" as const },
          { name: RECURRING_LABELS["website-care-plan"].fr, price: CARE.monthly!, interval: "MONTH" as const },
        ]}
        breadcrumb={[
          ["Accueil", "/"],
          ["Services", "/services"],
          ["Maintenance de site web", "/fr/maintenance-site-web"],
        ]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Maintenance &amp; Support</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Maintenance de site web et dépannage d&apos;urgence — avec les prix affichés.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce que la maintenance d&apos;un site web?</strong> C&apos;est le
            travail continu qui garde votre site rapide, sécurisé et performant après le lancement : mises à jour,
            surveillance, sauvegardes, petits correctifs — et quelqu&apos;un d&apos;imputable quand quelque chose brise.
            StillAwake Media offre les deux : des forfaits d&apos;entretien et du dépannage ponctuel, partout au Québec,
            depuis Montréal.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Obtenir de l&apos;aide maintenant
            </Link>
            <Link href="/fr/tarifs" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              Voir tous les tarifs
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Support d&apos;urgence : paiement unique, jamais d&apos;abonnement.
          </h2>
          <p className="mt-4 max-w-3xl text-[#C7B9B9]">
            Le support d&apos;urgence pour un site sur mesure coûte de {bandLabel("custom_site")}; pour une
            boutique en ligne, de {bandLabel("ecommerce")}. Trois questions établissent le niveau et le
            prix s&apos;affiche avant le paiement.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {Object.values(EMERGENCY).map((t) => (
              <PriceCard
                key={t.id}
                name={EMERGENCY_LABELS[t.id].fr}
                price={bandLabel(t.id as keyof typeof EMERGENCY)}
                cadence="paiement unique"
                items={[
                  ...t.tiers.map(
                    (tier) =>
                      `${EMERGENCY_LABELS[`${t.id}.${tier.id}`].fr} — ${tier.price} $ : ${
                        EMERGENCY_DESCRIPTIONS[`${t.id}.${tier.id}`].fr
                      }`,
                  ),
                  t.id === "ecommerce"
                    ? "Shopify et ecommerce sur mesure"
                    : "Résumé d'incident et recommandations inclus",
                ]}
                cta={[t.id === "ecommerce" ? "Réparer ma boutique" : "Démarrer un dépannage", "/fr/contact"]}
                highlight
              />
            ))}
          </div>

          <h2 className="geist mt-16 max-w-4xl text-4xl font-black tracking-[-0.06em]">
            Forfaits d&apos;entretien. Affichés, pas sur demande.
          </h2>
          <p className="mt-4 max-w-3xl text-[#C7B9B9]">
            Un forfait, c&apos;est la façon économique d&apos;obtenir le même résultat : les correctifs
            qui coûteraient un dépannage sont simplement inclus. Un seul incident majeur par année
            coûte plus cher que le forfait.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PriceCard
              name={RECURRING_LABELS["managed-hosting"].fr}
              price={`${HOSTING.monthly} $ CAD`}
              cadence="par mois"
              items={[
                "Hébergement rapide sur notre infrastructure",
                "SSL, DNS et surveillance de disponibilité",
                "Sauvegardes quotidiennes",
                "La plateforme gérée, pour ne plus y penser",
              ]}
              cta={["Choisir l'hébergement", "https://stillawake.studio/fr/demarrer"]}
            />
            <PriceCard
              name={RECURRING_LABELS["website-care-plan"].fr}
              price={`${CARE.monthly} $ CAD`}
              cadence="par mois"
              items={[
                "Tout l'hébergement géré",
                "Mises à jour logicielles et des dépendances",
                "Petites modifications de contenu et de texte",
                "Si ça brise, on répare — sans frais d'incident",
              ]}
              cta={["Choisir l'entretien", "https://stillawake.studio/fr/demarrer"]}
              highlight
            />
          </div>
          <div className="mt-10 rounded-[2rem] border border-white/10 p-8">
            <p className="max-w-3xl text-sm leading-7 text-[#C7B9B9]">
              Les configurations plus lourdes, à fort trafic ou à risque particulier restent
              chiffrées individuellement — mais le forfait affiché est le point de départ, pas un
              prix d&apos;appel.
            </p>
            <Link href="https://stillawake.studio/fr/demarrer" className="mt-6 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-[#D71920]/60">
              Demander une soumission
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Propriété d’un site web", "/fr/propriete-site-web"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Création de site web", "/fr/agence-web-montreal"],
          ["Développement Shopify", "/fr/developpement-shopify"],
          ["Optimisation IA (AEO)", "/fr/referencement-ia"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/website-maintenance"],
        ]}
      />
    
      <ArticlesLies pillar="/fr/maintenance-site-web" />
    </main>
  );
}
