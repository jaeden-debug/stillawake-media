import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";
import { ArticlesLies } from "@/components/articles-lies";

export const metadata: Metadata = {
  title: "Automatisation IA pour PME | Agents et flux automatisés — Montréal",
  description:
    "Automatisation IA à Montréal : agents avec garde-fous, courriels de cycle de vie, réconciliation de paiements et assistants intelligents. Des systèmes que nous exploitons nous-mêmes en production.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/automatisation-ia",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/automatisation-ia",
      "en-CA": "https://stillawakemedia.com/ai-automation",
      "x-default": "https://stillawakemedia.com/ai-automation",
    },
  },
  openGraph: {
    title: "Automatisation IA | StillAwake Media",
    description: "Des automatisations IA avec garde-fous — en production dans nos propres systèmes.",
    url: "https://stillawakemedia.com/fr/automatisation-ia",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte un projet d'automatisation IA?",
    "Sur devis écrit. Une automatisation ciblée (un flux de courriels, une réconciliation) coûte une fraction d'un agent conversationnel complet. Vous décrivez le processus à automatiser dans notre formulaire; vous recevez une portée écrite avec prix fixe. On vous dira aussi honnêtement si l'IA n'est pas la bonne solution — parfois un simple script fait mieux, pour moins cher.",
  ],
  [
    "Comment empêchez-vous l'IA d'inventer des choses?",
    "Par architecture, pas par espoir. Nos agents ne peuvent affirmer que ce qui vient d'une source de données réelle : notre guide de prévisualisation Zylx, par exemple, décrit uniquement le projet chargé en base de données et reconnaît explicitement quand une rétroaction est enregistrée plutôt qu'appliquée. Un agent qui peut tout dire finira par dire n'importe quoi — le nôtre est contraint à ses données.",
  ],
  [
    "Quelles automatisations donnent le meilleur rendement pour une PME?",
    "Dans notre expérience de production : 1) les courriels de cycle de vie — accueil, activation, relances — parce qu'ils travaillent 24/7 (nous en avons 34 gabarits en production sur un seul produit); 2) la réconciliation automatique des paiements et commandes, qui élimine la saisie manuelle; 3) le tri et la qualification des demandes entrantes. Les agents conversationnels viennent après, pas avant.",
  ],
  [
    "Est-ce que l'automatisation fonctionne en français?",
    "Oui, et c'est non négociable chez nous. Notre propre système d'accueil client est entièrement bilingue : un client francophone reçoit ses courriels, son lien de connexion et sa visite guidée en français — jamais un gabarit anglais recyclé. Nous construisons vos automatisations selon la même règle.",
  ],
  [
    "Utilisez-vous ChatGPT ou autre chose?",
    "Nous travaillons avec les API des grands modèles (Anthropic, OpenAI) selon le besoin, mais le modèle est la plus petite partie du travail. La valeur est dans la plomberie : connexion à vos données, garde-fous, journalisation, et le fait que le système échoue proprement au lieu d'improviser.",
  ],
];

const PROOF: [string, string, string][] = [
  [
    "Zylx, notre guide IA",
    "Un agent contraint à la vérité",
    "Chaque prévisualisation client que nous livrons inclut une visite guidée par IA — bilingue, consciente du projet, et architecturée pour ne jamais inventer : elle décrit ce qui est en base de données, rien d'autre. Vous la vivez vous-même comme client.",
  ],
  [
    "34 gabarits de courriels",
    "Cycle de vie complet automatisé",
    "Pour le lancement de Stalkr : séquence d'accueil de 7 courriels, activation, relances à 30/60/90 jours — branchés à la liste d'attente avant le lancement. Détail dans l'étude de cas NAVTRL.",
  ],
  [
    "Réconciliation Stripe",
    "Zéro saisie manuelle",
    "La boutique eSIM de TravelDesign By Lisa vend, exécute la commande auprès du fournisseur et réconcilie le paiement automatiquement — un flux commerce complet sans intervention humaine, couvert par la suite de 412 tests de la plateforme.",
  ],
];

export default function AutomatisationIaPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/automatisation-ia"
        name="Automatisation IA pour entreprises"
        description="Agents IA avec garde-fous, automatisation de courriels de cycle de vie, réconciliation de paiements et flux d'affaires automatisés."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Automatisation IA", "/fr/automatisation-ia"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Automatisation IA</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            De l&apos;IA avec des garde-fous — pas des démos qui improvisent.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce que l&apos;automatisation IA?</strong> C&apos;est brancher
            des modèles d&apos;intelligence artificielle et des flux automatisés sur vos vrais processus : accueil des
            clients, courriels, paiements, qualification des demandes. La différence chez StillAwake Media : chaque
            automatisation que nous vendons tourne d&apos;abord dans nos propres systèmes. Notre agence fonctionne
            elle-même sans appels de vente — c&apos;est l&apos;automatisation qui fait le travail.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/fr/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">Décrire mon processus</Link>
            <Link href="/fr/tarifs" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">Voir les tarifs</Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            En production chez nous, avant d&apos;être vendu à vous
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {PROOF.map(([big, label, detail]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 p-7">
                <p className="geist text-2xl font-black tracking-[-0.04em] text-[#D71920]">{big}</p>
                <h3 className="mt-2 text-lg font-semibold">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl leading-8 text-[#C7B9B9]">
            Les détails techniques sont publics :{" "}
            <Link href="/fr/etude-de-cas-stalkr-navtrl" className="text-[#D71920] underline-offset-4 hover:underline">étude de cas NAVTRL / Stalkr</Link>{" "}
            (les 34 gabarits) et{" "}
            <Link href="/fr/etude-de-cas-lisa-travel-design" className="text-[#D71920] underline-offset-4 hover:underline">étude de cas TravelDesign By Lisa</Link>{" "}
            (le commerce automatisé).
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Ce qu&apos;on automatise pour vous</h2>
            <ul className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>— <strong className="text-white">Courriels de cycle de vie</strong> : accueil, activation, relances — écrits, brandés, bilingues</li>
              <li>— <strong className="text-white">Qualification des demandes</strong> : formulaires intelligents qui trient et acheminent avant que vous lisiez</li>
              <li>— <strong className="text-white">Paiements et commandes</strong> : facturation, réconciliation, reçus automatiques via Stripe</li>
              <li>— <strong className="text-white">Assistants IA contraints</strong> : agents qui répondent depuis VOS données, avec journalisation</li>
              <li>— <strong className="text-white">Rapports</strong> : les chiffres qui comptent, livrés sans que personne les compile</li>
            </ul>
          </div>
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">La partie honnête</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              L&apos;IA n&apos;est pas toujours la réponse. Si votre processus est un transfert de données prévisible,
              un script ordinaire est plus fiable et moins cher qu&apos;un modèle de langage — et on vous le dira dans
              la soumission. On refuse aussi les agents « qui font tout » : un système sans limites définies finit par
              répondre avec assurance à des questions qu&apos;il ne comprend pas. Chaque automatisation qu&apos;on
              livre a un périmètre écrit, des garde-fous testés et un journal de ce qu&apos;elle a fait.
            </p>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              Point de départ typique : une seule automatisation à haut rendement, livrée vite — pas un chantier de
              six mois. Décrivez le processus qui vous coûte le plus de temps dans le{" "}
              <Link href="/fr/contact" className="text-[#D71920] underline-offset-4 hover:underline">formulaire</Link>,
              et la portée écrite vous dira ce que ça vaut d&apos;automatiser.
            </p>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Développement logiciel", "/fr/developpement-logiciel"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Maintenance de site web", "/fr/maintenance-site-web"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/ai-automation"],
        ]}
      />
    
      <ArticlesLies pillar="/fr/automatisation-ia" />
    </main>
  );
}
