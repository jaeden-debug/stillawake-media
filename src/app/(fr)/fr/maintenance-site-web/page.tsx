import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard, FaqBlock, RelatedServices } from "@/components/service-page";
import { ArticlesLies } from "@/components/articles-lies";

export const metadata: Metadata = {
  title: "Maintenance de site web et support d'urgence | Tarifs affichés",
  description:
    "Maintenance de site web et support d'urgence le jour même, de Montréal pour tout le Québec. Dépannage à partir de 150 $ CAD, tarifs affichés avant le paiement.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/maintenance-site-web",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/maintenance-site-web",
      "en-CA": "https://stillawakemedia.com/website-maintenance",
      "x-default": "https://stillawakemedia.com/website-maintenance",
    },
  },
  openGraph: {
    title: "Maintenance de site web | StillAwake Media",
    description: "Entretien de site web et dépannage d'urgence avec tarifs affichés. De Montréal, partout au Québec.",
    url: "https://stillawakemedia.com/fr/maintenance-site-web",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte un dépannage d'urgence?",
    "Le support d'urgence pour un site sur mesure coûte 150 $, 250 $ ou 400 $ CAD (paiement unique) selon l'ampleur du problème : correctif rapide, incident prioritaire ou incident majeur. Pour une boutique en ligne, c'est 250 $, 400 $ ou 600 $ CAD. Trois questions déterminent le niveau — vous voyez le prix exact avant de payer.",
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
    "Oui — mises à jour, surveillance, sauvegardes et petits correctifs, avec un prix mensuel fixe établi selon votre site. Décrivez-nous votre site et vous recevrez une proposition écrite, sans appel obligatoire.",
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
          { name: "Support d'urgence — Site sur mesure (Correctif rapide)", price: 150 },
          { name: "Support d'urgence — Site sur mesure (Incident prioritaire)", price: 250 },
          { name: "Support d'urgence — Site sur mesure (Incident majeur)", price: 400 },
          { name: "Support d'urgence — Ecommerce (Triage de boutique)", price: 250 },
          { name: "Support d'urgence — Ecommerce (Incident prioritaire)", price: 400 },
          { name: "Support d'urgence — Ecommerce (Critique)", price: 600 },
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
            <Link href="/fr/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
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
            Le support d&apos;urgence pour un site sur mesure coûte de 150 $ à 400 $ CAD; pour une boutique en ligne, de
            250 $ à 600 $ CAD. Trois questions établissent le niveau et le prix s&apos;affiche avant le paiement.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Urgence — Site sur mesure"
              price="150 $ – 400 $ CAD"
              cadence="paiement unique"
              items={[
                "Correctif rapide — 150 $ : un problème ciblé, réglé le jour même",
                "Incident prioritaire — 250 $ : un bris qui nuit à vos affaires",
                "Incident majeur — 400 $ : plusieurs pages ou systèmes touchés",
                "Résumé d'incident et recommandations inclus",
              ]}
              cta={["Démarrer un dépannage", "/fr/contact"]}
              highlight
            />
            <PriceCard
              name="Urgence — Boutique en ligne"
              price="250 $ – 600 $ CAD"
              cadence="paiement unique"
              items={[
                "Triage de boutique — 250 $ : problème de paiement ou de catalogue réglé",
                "Incident prioritaire — 400 $ : bris qui coupe vos ventes",
                "Critique — 600 $ : boutique en panne, intervention immédiate",
                "Shopify et ecommerce sur mesure",
              ]}
              cta={["Réparer ma boutique", "/fr/contact"]}
              highlight
            />
          </div>
          <div className="mt-10 rounded-[2rem] border border-white/10 p-8">
            <h3 className="geist text-2xl font-black tracking-[-0.05em]">Forfaits d&apos;entretien mensuels</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
              Mises à jour, surveillance, sauvegardes et petits correctifs, avec un prix mensuel fixe établi selon votre
              site et votre trafic. Décrivez-nous votre site : vous recevrez une proposition écrite — sans appel.
            </p>
            <Link href="/fr/contact" className="mt-6 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-[#D71920]/60">
              Demander une soumission
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
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
