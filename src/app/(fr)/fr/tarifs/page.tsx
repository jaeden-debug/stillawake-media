import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard } from "@/components/service-page";
import { getContentLayer } from "@/lib/cms/adapter";
import { DISCOVERY, EMERGENCY, MINIMUM, ONE_TIME, RECURRING } from "@/lib/pricing/model";
import {
  EMERGENCY_DESCRIPTIONS,
  EMERGENCY_LABELS,
  ONE_TIME_DESCRIPTIONS,
  ONE_TIME_LABELS,
  RECURRING_LABELS,
} from "@/lib/pricing/labels";
import { slot } from "@/lib/cms/layer";
import { ArticlesLies } from "@/components/articles-lies";

export const revalidate = 300;

/** Québec French puts the symbol after the number, with a space. */
const money = (n: number) => `${n.toLocaleString("fr-CA")} $ CAD`;

const MONTHLY = RECURRING.filter((r) => r.approved && r.monthly !== null);
const ONE_TIME_SERVICES = Object.values(ONE_TIME).filter((s) => s.approved);

/** Les trois chiffres d'entrée, dérivés pour que la copie ne périme pas. */
const ENTRY_MONTHLY = Math.min(...MONTHLY.map((r) => r.monthly!));
const ENTRY_ONE_TIME = Math.min(...ONE_TIME_SERVICES.map((s) => s.price));
const EMERGENCY_CEILING = Math.max(
  ...Object.values(EMERGENCY).flatMap((t) => t.tiers.map((tier) => tier.price)),
);

const MONTHLY_ITEMS: Record<string, string[]> = {
  "managed-hosting": [
    "Hébergement rapide sur notre infrastructure",
    "SSL, DNS et surveillance de disponibilité",
    "Sauvegardes quotidiennes",
    "On s'occupe de la plateforme, vous ne la voyez jamais",
  ],
  "website-care-plan": [
    "Tout l'hébergement géré",
    "Mises à jour logicielles et des dépendances",
    "Petites modifications de contenu et de texte",
    "Si ça brise, on répare — sans frais d'incident",
  ],
  "seo-starter": [
    "Suivi de la Search Console",
    "Une correction on-page par mois",
    "Un rapport mensuel réellement lisible",
    "Le vrai point d'entrée — pas un Essentiel réduit",
  ],
  "seo-essentials": [
    "SEO technique",
    "Optimisation des pages",
    "Suivi Search Console",
    "Rapport mensuel",
  ],
  "seo-advanced": [
    "Tout Essentiel",
    "Optimisation IA (AEO)",
    "Optimisation des entités",
    "Stratégie de contenu",
  ],
  "content-creation": [
    "Articles et textes de pages rédigés pour vous",
    "Recherchés selon ce que les gens cherchent vraiment",
    "Publiés, maillés à l'interne et mesurés",
    "S'ajoute à un forfait SEO — ce n'en est pas un",
  ],
};

const MONTHLY_CTA: Record<string, [string, string]> = {
  "managed-hosting": ["Choisir l'hébergement", "/fr/maintenance-site-web"],
  "website-care-plan": ["Choisir l'entretien", "/fr/maintenance-site-web"],
  "seo-starter": ["Choisir Départ", "/fr/agence-seo-montreal"],
  "seo-essentials": ["Choisir Essentiel", "/fr/agence-seo-montreal"],
  "seo-advanced": ["Choisir Avancé", "/fr/agence-seo-montreal"],
  "content-creation": ["Choisir la production de contenu", "/fr/contact"],
};

export const metadata: Metadata = {
  title: "Tarifs — Prix affichés, sans appel de vente",
  description: `Tarifs StillAwake Media : forfaits mensuels à partir de ${ENTRY_MONTHLY} $ CAD, services à prix fixe à partir de ${ENTRY_ONE_TIME} $, sites à partir de 1 800 $ CAD, un site d'entreprise complet de 2 750 $ à 5 750 $, boutiques en ligne à partir de 4 250 $, cadrage payant à partir de 1 800 $ et dépannage d'urgence de ${ENTRY_ONE_TIME} $ à ${EMERGENCY_CEILING} $. Publiés, en dollars canadiens.`,
  alternates: {
    canonical: "https://stillawakemedia.com/fr/tarifs",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/tarifs",
      "en-CA": "https://stillawakemedia.com/pricing",
      "x-default": "https://stillawakemedia.com/pricing",
    },
  },
  openGraph: {
    title: "Tarifs",
    description: "Prix affichés pour le SEO, la maintenance et le support. Soumissions écrites pour les projets.",
    url: "https://stillawakemedia.com/fr/tarifs",
    type: "website",
    locale: "fr_CA",
  },
};

export default async function TarifsPage() {
  const slots = await getContentLayer("pricing", "fr");
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/tarifs"
        name="Tarifs des services StillAwake Media"
        description="Tarifs affichés : forfaits SEO mensuels, dépannage d'urgence à paiement unique, et travaux sur devis."
        offers={[
          { name: "Site web", price: MINIMUM },
          { name: "Cadrage de projet", price: DISCOVERY.from },
          ...MONTHLY.map((r) => ({
            name: RECURRING_LABELS[r.id].fr,
            price: r.monthly!,
            interval: "MONTH" as const,
          })),
          ...ONE_TIME_SERVICES.map((s) => ({ name: ONE_TIME_LABELS[s.id].fr, price: s.price })),
          ...Object.values(EMERGENCY).map((track) => ({
            name: EMERGENCY_LABELS[track.id].fr,
            price: track.tiers[0].price,
          })),
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
            {slot(slots, "hero_title", "Les prix sont sur la page. C'est ça, l'idée.")}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            {slot(
              slots,
              "hero_intro",
              `La plupart des agences cachent leurs prix derrière un appel de découverte. StillAwake Media les affiche. Un site d'entreprise professionnel avec le référencement local configuré coûte environ 2 750 $ à 5 750 $, et un site plus simple part de 1 800 $. Le bas de la fourchette suppose que vous fournissez le contenu et que la portée reste proche de ce que vous avez demandé; le haut, c'est le même projet avec plus de contenu original, plus de travail de design ou plus de choses à connecter. Si un projet complet n'est pas encore pour vous, les services à prix fixe partent de ${ENTRY_ONE_TIME} $ et les forfaits mensuels de ${ENTRY_MONTHLY} $. On ne vous facture jamais plus parce que vous avez plus d'employés. Tous les prix sont en dollars canadiens.`,
            )}
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist text-4xl font-black tracking-[-0.06em]">Projets — trois façons d&apos;entrer</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Ce dont vous avez besoin est décidé par le travail, pas par la taille de votre entreprise.
            Chiffrez votre projet avec le{" "}
            <Link href="/fr/outils/calculateur-cout-projet" className="text-[#D71920] underline-offset-4 hover:underline">
              calculateur de coût
            </Link>{" "}
            — il utilise le même modèle qu&apos;on emploie pour chiffrer de vrais mandats.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Les projets peuvent être répartis en un maximum de quatre versements pendant la
            réalisation, au même prix total — sans intérêt, sans frais, et rien de plus à payer
            parce que vous étalez les versements. Le{" "}
            <Link href="/fr/outils/calculateur-cout-projet" className="text-[#D71920] underline-offset-4 hover:underline">
              calculateur
            </Link>{" "}
            estime à quoi ressemble chaque versement. Les options de paiement sont confirmées dans
            votre proposition écrite, pas ici.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <PriceCard
              name="Site web"
              price={`à partir de ${MINIMUM.toLocaleString("fr-CA")} $ CAD`}
              cadence="un site complet avec référencement local : 2 750 $ à 5 750 $"
              items={[
                "Design sur mesure, conçu pour vous",
                "Accueil, à propos, contact et vos pages de services",
                "Formulaires, analytique et Search Console",
                "SEO technique et données structurées",
                "Vous modifiez le contenu vous-même",
              ]}
              cta={["Chiffrer", "/fr/outils/calculateur-cout-projet"]}
              highlight
            />
            <PriceCard
              name="Boutique ou système"
              price="à partir de 4 250 $ CAD"
              cadence="portée écrite, prix fixe"
              items={[
                "Shopify bien configuré, à partir de 4 250 $",
                "Tableaux de bord à partir de 12 000 $",
                "Chiffré selon le travail, pas selon vos effectifs",
                "Sans appel de vente obligatoire",
              ]}
              cta={["Obtenir une fourchette", "/fr/outils/calculateur-cout-projet"]}
            />
            <PriceCard
              name="Cadrage"
              price={`à partir de ${DISCOVERY.from.toLocaleString("fr-CA")} $ CAD`}
              cadence="crédité sur la construction"
              items={[
                "Pour les logiciels et ce qui prend encore forme",
                "Une portée écrite et une architecture",
                "Un prix de construction fixe à la fin",
                "Les frais sont déduits de la construction",
              ]}
              cta={["Commencer par le cadrage", "https://stillawake.studio/fr/demarrer"]}
            />
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">
            Paiement unique — points de départ à prix fixe
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Pas encore prêt pour un projet. Ces prix sont fixes — pas une fourchette, pas une
            estimation, et pas une consultation qui se transforme en soumission. Vous payez le
            montant affiché et vous obtenez la chose.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ONE_TIME_SERVICES.map((service) => (
              <PriceCard
                key={service.id}
                name={ONE_TIME_LABELS[service.id].fr}
                price={money(service.price)}
                cadence="paiement unique"
                items={[ONE_TIME_DESCRIPTIONS[service.id].fr]}
                cta={["Réserver", "https://stillawake.studio/fr/demarrer"]}
              />
            ))}
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Mensuel — garder le site en vie</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Les forfaits commencent à {money(MONTHLY[0].monthly!)} par mois. Chacun est un palier
            complet, pas une version amputée de celui du dessus — on monte quand le travail
            l&apos;exige, pas parce que le petit forfait a été rendu volontairement pénible.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {MONTHLY.filter((r) => r.group === "care").map((plan) => (
              <PriceCard
                key={plan.id}
                name={RECURRING_LABELS[plan.id].fr}
                price={money(plan.monthly!)}
                cadence="par mois"
                items={MONTHLY_ITEMS[plan.id]}
                cta={MONTHLY_CTA[plan.id]}
              />
            ))}
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Mensuel — forfaits de croissance</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Départ est un vrai forfait à petite échelle, pas un essai. La production de contenu fait
            exception volontairement : elle rédige du nouveau matériel plutôt que d&apos;optimiser
            l&apos;existant, alors elle s&apos;ajoute à un forfait SEO plutôt que de le remplacer.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MONTHLY.filter((r) => r.group === "seo" || r.group === "content").map((plan) => (
              <PriceCard
                key={plan.id}
                name={RECURRING_LABELS[plan.id].fr}
                price={money(plan.monthly!)}
                cadence="par mois"
                items={MONTHLY_ITEMS[plan.id]}
                cta={MONTHLY_CTA[plan.id]}
                highlight={plan.id === "seo-essentials"}
              />
            ))}
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Paiement unique — support d&apos;urgence</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Trois questions établissent le palier; vous voyez le prix exact avant de payer. Jamais
            un abonnement.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {Object.values(EMERGENCY).map((track) => {
              const prices = track.tiers.map((t) => t.price);
              return (
                <PriceCard
                  key={track.id}
                  name={EMERGENCY_LABELS[track.id].fr}
                  price={`${Math.min(...prices)} $ – ${Math.max(...prices)} $ CAD`}
                  cadence="paiement unique"
                  items={track.tiers.map(
                    (tier) =>
                      `${EMERGENCY_LABELS[`${track.id}.${tier.id}`].fr} — ${tier.price} $ : ${
                        EMERGENCY_DESCRIPTIONS[`${track.id}.${tier.id}`].fr
                      }`,
                  )}
                  cta={[
                    track.id === "ecommerce" ? "Réparer ma boutique" : "Obtenir de l'aide",
                    "/fr/maintenance-site-web",
                  ]}
                />
              );
            })}
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Ce qu&apos;on fait</h2>
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

          <p className="mt-10 text-sm text-[#C7B9B9]">
            Avant de commencer,{" "}
            <Link href="/fr/outils/calculateur-cout-projet" className="text-[#D71920] underline-offset-4 hover:underline">
              chiffrez votre projet avec notre calculateur
            </Link>{" "}
            — il utilise le modèle qu&apos;on emploie à l&apos;interne — ou lisez le guide :{" "}
            <Link href="/fr/prix-site-web-quebec" className="text-[#D71920] underline-offset-4 hover:underline">Combien coûte un site web au Québec?</Link>
          </p>

          <div className="mt-16 rounded-[2rem] bg-[#D71920] p-10">
            <h2 className="geist max-w-2xl text-4xl font-black tracking-[-0.06em]">Sautez l&apos;appel de vente. Dites-nous ce que vous bâtissez.</h2>
            <Link href="https://stillawake.studio/fr/demarrer" className="mt-6 inline-flex rounded-full bg-black px-6 py-4 font-bold">Démarrer un projet →</Link>
          </div>
        </div>
      </section>
    
      <ArticlesLies pillar="/fr/tarifs" />
    </main>
  );
}
