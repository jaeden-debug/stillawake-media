import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Développement Framer | Sites Framer professionnels — Montréal",
  description:
    "Développement Framer à Montréal : sites vitrines rapides et soignés, livrés en semaines. Conseil honnête sur quand Framer est le bon choix — et quand le sur-mesure le bat.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/developpement-framer",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/developpement-framer",
      "en-CA": "https://stillawakemedia.com/framer-development",
      "x-default": "https://stillawakemedia.com/framer-development",
    },
  },
  openGraph: {
    title: "Développement Framer | StillAwake Media",
    description: "Sites Framer professionnels — avec un conseil honnête sur quand choisir autre chose.",
    url: "https://stillawakemedia.com/fr/developpement-framer",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte un site Framer?",
    "Sur devis écrit, généralement bien en dessous d'un site sur mesure équivalent — c'est justement l'intérêt de Framer pour un site vitrine. S'ajoute l'abonnement Framer lui-même, payé directement à Framer (tarif public sur framer.com, selon le plan). Vous décrivez le projet dans notre formulaire; vous recevez une portée écrite avec prix fixe.",
  ],
  [
    "Framer ou un site sur mesure : comment choisir?",
    "Le critère honnête, c'est la logique. Si votre site présente et convainc (pages, animations, formulaire de contact, blogue), Framer livre plus vite pour moins cher. Dès qu'il y a des comptes utilisateurs, des paiements complexes, un portail ou des données métier — comme le portail client et la boutique eSIM que nous avons bâtis pour TravelDesign By Lisa — Framer n'est plus l'outil, et on vous le dira avant de vous vendre quoi que ce soit.",
  ],
  [
    "Un site Framer peut-il bien se référencer sur Google?",
    "Oui, si on le construit avec la même rigueur qu'un site sur mesure : structure de titres propre, métadonnées, données structurées, contenu réel. Framer génère du HTML statique rapide, ce qui aide. Ce qui coule les sites Framer en SEO, ce n'est pas l'outil — c'est le contenu mince qu'on y met. Notre approche SEO est documentée sur la page de notre agence SEO.",
  ],
  [
    "Puis-je modifier mon site moi-même après la livraison?",
    "Oui — c'est l'un des vrais avantages de Framer. L'éditeur visuel vous permet de changer textes et images sans coder. Nous livrons avec une formation, et le CMS de Framer permet de publier vos articles vous-même.",
  ],
  [
    "Faites-vous des sites Framer bilingues?",
    "Oui. La localisation fait partie de Framer et nous structurons le site pour le marché québécois : URL par langue et contenu réellement écrit en français — pas traduit à la machine. Le principe qu'on applique à tous nos projets : un visiteur francophone ne devrait jamais tomber sur une page anglaise.",
  ],
];

export default function DeveloppementFramerPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/developpement-framer"
        name="Développement Framer"
        description="Conception et développement de sites Framer professionnels : sites vitrines rapides, animés et modifiables par le client, avec SEO rigoureux."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Développement Framer", "/fr/developpement-framer"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Développement Framer</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Framer, quand c&apos;est le bon outil. Autre chose, quand ce ne l&apos;est pas.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce que le développement Framer?</strong> Framer est une
            plateforme qui permet de construire des sites vitrines visuellement riches — animations fluides, design
            précis, CMS intégré — et de les livrer en semaines plutôt qu&apos;en mois. Nous concevons des sites Framer
            professionnels depuis Montréal, et comme nous bâtissons aussi des{" "}
            <Link href="/fr/developpement-logiciel" className="text-[#D71920] underline-offset-4 hover:underline">plateformes sur mesure</Link>,
            notre recommandation entre les deux n&apos;a pas de parti pris : on vend les deux.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/fr/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">Décrire mon projet</Link>
            <Link href="/fr/tarifs" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">Voir les tarifs</Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Le choix honnête : Framer ou sur-mesure?
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
              <h3 className="text-xl font-semibold">Framer gagne quand…</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#C7B9B9]">
                <li>— Votre site <strong className="text-white">présente et convainc</strong> : services, portfolio, à-propos, contact</li>
                <li>— Le délai compte : semaines, pas mois</li>
                <li>— Vous voulez modifier textes et images vous-même, sans développeur</li>
                <li>— Le budget est celui d&apos;un site vitrine, pas d&apos;une plateforme</li>
                <li>— L&apos;image de marque exige des animations et un design précis au pixel</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 p-8">
              <h3 className="text-xl font-semibold">Le sur-mesure gagne quand…</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#C7B9B9]">
                <li>— Il y a des <strong className="text-white">comptes utilisateurs, des paiements ou un portail</strong></li>
                <li>— Vos données métier pilotent le site (calculateurs, tableaux de bord, réservations)</li>
                <li>— Le commerce dépasse le simple lien d&apos;achat — voyez la boutique eSIM avec réconciliation automatique de <Link href="/fr/etude-de-cas-lisa-travel-design" className="text-[#D71920] underline-offset-4 hover:underline">TravelDesign By Lisa</Link></li>
                <li>— Le site doit passer des suites de tests (les nôtres : 412 tests chez Lisa, ~190 chez <Link href="/fr/etude-de-cas-bankdemark" className="text-[#D71920] underline-offset-4 hover:underline">BankDeMark</Link>)</li>
                <li>— C&apos;est une boutique complète : voyez plutôt <Link href="/fr/developpement-shopify" className="text-[#D71920] underline-offset-4 hover:underline">Shopify</Link></li>
              </ul>
            </div>
          </div>
          <p className="mt-8 max-w-3xl leading-8 text-[#C7B9B9]">
            C&apos;est la conversation qu&apos;on a par écrit, gratuitement, avant toute soumission. Si Framer est le
            bon choix, tant mieux : vous économisez. Si ce ne l&apos;est pas, vous le saurez avant d&apos;avoir payé
            pour vous tromper.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Ce que vous recevez</h2>
            <ul className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>— Design original sur mesure — jamais un gabarit acheté rebadgé</li>
              <li>— Site Framer complet : pages, animations, CMS, formulaires</li>
              <li>— SEO appliqué avec la rigueur documentée de notre <Link href="/fr/agence-seo-montreal" className="text-[#D71920] underline-offset-4 hover:underline">pratique SEO</Link> : structure, métadonnées, données structurées</li>
              <li>— Bilinguisme français-anglais structuré pour le Québec</li>
              <li>— Formation pour modifier votre site vous-même</li>
              <li>— Le compte Framer est le vôtre : aucune prise d&apos;otage</li>
            </ul>
          </div>
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Prix et processus</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Sur devis écrit avec prix fixe — typiquement le point d&apos;entrée le plus abordable de nos services de
              création de sites, parce que Framer élimine une partie du travail d&apos;infrastructure. Vous payez
              l&apos;abonnement Framer directement à Framer (aucune marge cachée chez nous). Le processus est le même
              que tout ce qu&apos;on fait : formulaire asynchrone, portée écrite, jalons, livraison — sans appel de
              vente obligatoire. Comparez les approches dans notre{" "}
              <Link href="/fr/prix-site-web-quebec" className="text-[#D71920] underline-offset-4 hover:underline">guide des prix de sites web au Québec</Link>.
            </p>
            <Link href="/fr/contact" className="mt-8 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Obtenir une soumission</Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Création de site web", "/fr/agence-web-montreal"],
          ["Refonte de site web", "/fr/refonte-site-web"],
          ["Développement logiciel", "/fr/developpement-logiciel"],
          ["Guide des prix", "/fr/prix-site-web-quebec"],
          ["English version", "/framer-development"],
        ]}
      />
    </main>
  );
}
