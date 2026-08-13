import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Développement logiciel sur mesure | SaaS, portails et outils — Montréal",
  description:
    "Développement de logiciels sur mesure à Montréal : SaaS, portails clients, tableaux de bord et applications mobiles. Trois produits réels documentés, portée écrite et prix fixe — sans appel de vente.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/developpement-logiciel",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/developpement-logiciel",
      "en-CA": "https://stillawakemedia.com/software-development",
      "x-default": "https://stillawakemedia.com/software-development",
    },
  },
  openGraph: {
    title: "Développement logiciel sur mesure",
    description: "SaaS, portails, tableaux de bord — avec trois builds réels et mesurés comme preuve.",
    url: "https://stillawakemedia.com/fr/developpement-logiciel",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte un logiciel sur mesure au Québec?",
    "Les fourchettes réelles du marché en 2026 : environ 15 000 $ CAD pour une application web ciblée, et bien au-delà de 100 000 $ pour un SaaS complet avec comptes, paiements et intégrations. Ce qui fait bouger le prix : le nombre de rôles utilisateurs, les paiements, les intégrations externes et le volume de données. Chaque projet reçoit une portée écrite avec un prix fixe avant engagement — détails dans notre guide des prix.",
  ],
  [
    "Quelles technologies utilisez-vous, et pourquoi?",
    "Next.js, React, TypeScript et Supabase (Postgres), avec Stripe pour les paiements — la même pile sur laquelle tournent nos propres produits. On la choisit pour trois raisons vérifiables : la longévité (technologies dominantes, pas de niche fragile), la sécurité au niveau de la base de données (règles RLS sur chaque table), et la vitesse de livraison démontrée — notre app de localisation Stalkr est passée du premier commit à un build prêt pour TestFlight en 24 jours.",
  ],
  [
    "Comment garantissez-vous que les calculs sont exacts?",
    "Par des tests contre des cas de référence. Sur BankDeMark, notre plateforme financière, les mathématiques d'argent sont vérifiées par 26 cas de référence dorés et environ 190 tests automatisés, avec une précision monétaire au cent près. Un logiciel qui touche à l'argent sans suite de tests n'est pas un produit — c'est un risque.",
  ],
  [
    "Développez-vous des applications mobiles?",
    "Oui — en React Native (Expo), ce qui livre iOS et Android à partir d'une base de code commune. Stalkr en est l'exemple documenté : 10 947 lignes de TypeScript, positions en temps réel synchronisées en moins de 3 secondes, notifications push et bouton SOS avec activation par maintien de 3 secondes.",
  ],
  [
    "Qui possède le code à la fin?",
    "Vous. À la livraison finale : code source complet, accès aux services, documentation et formation. Aucune dépendance envers nous — même si la plupart de nos clients choisissent un forfait de maintenance justement parce qu'ils connaissent la valeur d'un responsable.",
  ],
  [
    "Comment se passe un projet, concrètement?",
    "1) Vous décrivez le projet dans notre formulaire asynchrone — pas d'appel de vente. 2) Vous recevez une portée écrite avec prix fixe et jalons. 3) Le développement avance avec des mises à jour visibles dans votre portail client. 4) Vous révisez le produit sur une prévisualisation privée avec visite guidée en français. 5) Livraison, transfert et formation.",
  ],
];

export default function DeveloppementLogicielPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/developpement-logiciel"
        name="Développement logiciel sur mesure"
        description="Développement d'applications web, SaaS, portails clients et applications mobiles sur mesure, avec builds documentés et prix fixe écrit."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Développement logiciel", "/fr/developpement-logiciel"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Développement logiciel</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Des logiciels sur mesure — prouvés par les nôtres.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce que le développement logiciel sur mesure?</strong> C&apos;est
            la conception et la construction d&apos;applications faites pour vos processus — SaaS, portails clients,
            tableaux de bord, outils internes, applications mobiles — plutôt que de tordre vos opérations pour entrer
            dans un logiciel générique. La différence chez StillAwake Media : nous ne vendons pas une compétence
            théorique. Nous exploitons nos propres produits sur la même pile que nous vendons, et leurs chiffres sont
            publics.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">Obtenir une portée écrite</Link>
            <Link href="/fr/tarifs" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">Voir les tarifs</Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Trois builds réels, trois preuves différentes
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            Chaque affirmation ci-dessous est sourcée et datée dans son étude de cas complète.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Link href="/fr/etude-de-cas-stalkr-navtrl" className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
              <p className="geist text-2xl font-black tracking-[-0.04em] text-[#D71920]">24 jours</p>
              <h3 className="mt-2 text-lg font-semibold">Stalkr — app mobile temps réel</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                10 947 lignes de TypeScript, 11 écrans : suivi d&apos;équipe en direct synchronisé en moins de
                3 secondes, zones géorepérées, SOS avec activation par maintien. Du premier commit au build TestFlight
                en 24 jours — daté par l&apos;historique git.
              </p>
            </Link>
            <Link href="/fr/etude-de-cas-bankdemark" className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
              <p className="geist text-2xl font-black tracking-[-0.04em] text-[#D71920]">26 cas dorés</p>
              <h3 className="mt-2 text-lg font-semibold">BankDeMark — plateforme financière</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                Un noyau financier où chaque calcul d&apos;argent est testé contre des cas de référence, ~190 tests
                automatisés, 26 tables toutes protégées par RLS — et un score Lighthouse mesuré de 100/100/100 sur la
                plateforme publique.
              </p>
            </Link>
            <Link href="/fr/etude-de-cas-lisa-travel-design" className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
              <p className="geist text-2xl font-black tracking-[-0.04em] text-[#D71920]">412 tests</p>
              <h3 className="mt-2 text-lg font-semibold">TravelDesign By Lisa — plateforme complète</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                834 URL trilingues, CMS sur mesure (56 migrations), portail client, CRM et boutique eSIM avec paiement
                Stripe et réconciliation automatisée — couverts par 412 tests unitaires, bout-en-bout et de sécurité.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">Ce qu&apos;on construit — et comment</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Types de projets</h3>
              <ul className="mt-5 space-y-3 text-[#C7B9B9]">
                <li>— <strong className="text-white">SaaS</strong> : comptes, abonnements Stripe, tableaux de bord, API</li>
                <li>— <strong className="text-white">Portails clients</strong> : espaces sécurisés, documents, facturation, suivi de projet</li>
                <li>— <strong className="text-white">Outils internes</strong> : tableaux de bord, automatisations, rapports qui remplacent les feuilles de calcul</li>
                <li>— <strong className="text-white">Applications mobiles</strong> : React Native/Expo, iOS + Android d&apos;une seule base de code</li>
                <li>— <strong className="text-white">Commerce spécialisé</strong> : la boutique eSIM de Lisa vend, exécute et réconcilie automatiquement</li>
              </ul>
              <h3 className="mt-10 text-xl font-semibold">La pile, et pourquoi elle</h3>
              <p className="mt-5 leading-8 text-[#C7B9B9]">
                Next.js + React + TypeScript + Supabase (Postgres) + Stripe. Pas parce que c&apos;est à la mode :
                parce que la sécurité se fait au niveau de la base de données (règles RLS sur chaque table — y compris
                les données de localisation de Stalkr), parce que le typage attrape les erreurs avant vos clients, et
                parce que c&apos;est la pile de nos propres produits — on vit avec nos choix.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">La discipline qui vient avec</h3>
              <ul className="mt-5 space-y-3 text-[#C7B9B9]">
                <li>— <strong className="text-white">Migrations suivies</strong> : chaque changement de schéma est versionné et reproductible</li>
                <li>— <strong className="text-white">Tests automatisés</strong> : 412 sur la plateforme de Lisa, ~190 sur le noyau BankDeMark — pas des promesses, des suites qui tournent</li>
                <li>— <strong className="text-white">Sécurité vérifiée</strong> : sonde des 77 routes API de Lisa — 0 constat critique ou élevé</li>
                <li>— <strong className="text-white">Incidents documentés</strong> : le 5 août 2026, un incident de sécurité chez Lisa a été corrigé, renforcé et documenté la journée même — c&apos;est écrit dans l&apos;étude de cas</li>
                <li>— <strong className="text-white">Transfert complet</strong> : code source, accès, documentation, formation</li>
              </ul>
              <h3 className="mt-10 text-xl font-semibold">Prix</h3>
              <p className="mt-5 leading-8 text-[#C7B9B9]">
                Sur devis écrit, toujours — le marché québécois va d&apos;environ 15 000 $ pour une application ciblée à
                plus de 100 000 $ pour un SaaS complet (fourchettes détaillées dans le{" "}
                <Link href="/fr/prix-site-web-quebec" className="text-[#D71920] underline-offset-4 hover:underline">guide des prix</Link>).
                Vous décrivez le projet une fois, vous recevez une portée écrite avec prix fixe et jalons. Jamais
                d&apos;appel de vente obligatoire.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Création de site web", "/fr/agence-web-montreal"],
          ["Automatisation IA", "/fr/automatisation-ia"],
          ["Maintenance de site web", "/fr/maintenance-site-web"],
          ["Guide des prix", "/fr/prix-site-web-quebec"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/software-development"],
        ]}
      />
    </main>
  );
}
