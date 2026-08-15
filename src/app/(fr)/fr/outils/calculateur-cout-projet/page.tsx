import type { Metadata } from "next";
import Link from "next/link";

import { PageSchema } from "@/components/page-schema";
import { ProjectCalculator } from "@/components/tools/project-calculator";
import { DISCOVERY, MINIMUM, PRICING_VERSION } from "@/lib/pricing/model";

const url = "https://stillawakemedia.com/fr/outils/calculateur-cout-projet";
const enUrl = "https://stillawakemedia.com/tools/project-cost-calculator";

/**
 * Écrit pour le Québec, pas traduit de l'anglais.
 *
 * La demande FR mesurée sur ces termes est faible — « prix site web » et
 * « coût site web » se comptent en dizaines de recherches par mois au Québec,
 * pas en centaines. Cette page existe parce que la règle est que tout ce qui
 * s'adresse aux clients existe dans les deux langues, et parce qu'un outil
 * fonctionnel en français est un signal d'entité que le contenu traduit ne
 * donne pas. Ce n'est pas une prévision de trafic.
 */
export const metadata: Metadata = {
  title: "Calculateur de coût de projet web — prix réels au Canada",
  description:
    "Estimez ce que coûterait vraiment un site web, une boutique en ligne, un mandat SEO ou un logiciel sur mesure au Québec. Gratuit, sans courriel, en langage clair — basé sur les tarifs réels de StillAwake Media, en dollars canadiens.",
  alternates: {
    canonical: url,
    languages: { "fr-CA": url, "en-CA": enUrl, "x-default": enUrl },
  },
  /* Comme en anglais : la carte de partage décrit l'ESTIMATION, pas l'outil. */
  openGraph: {
    title: "Votre estimation de projet StillAwake",
    description: "Voyez la portée de votre projet, l'investissement estimé et les prochaines étapes.",
    url,
    type: "website",
    locale: "fr_CA",
    images: [
      {
        url: "https://stillawakemedia.com/og-project-estimate.jpg",
        width: 1200,
        height: 630,
        alt: "StillAwake Media — estimation de projet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Votre estimation de projet StillAwake",
    description: "Voyez la portée de votre projet, l'investissement estimé et les prochaines étapes.",
    images: ["https://stillawakemedia.com/og-project-estimate.jpg"],
  },
};

export default function CalculateurCoutProjetPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/fr/outils/calculateur-cout-projet" />

      {/* Même structure qu'en anglais : la carte partage un écran avec une
          intro volontairement courte, et le long texte passe en dessous. */}
      {/* Le calculateur occupe le premier écran; le h1 et le texte suivent. */}
      <section className="flex h-[100svh] flex-col px-5 pb-6 pt-20 sm:px-6 sm:pt-24">
        <div className="mx-auto flex w-full min-h-0 max-w-3xl flex-1 flex-col">
          <ProjectCalculator locale="fr" />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Outil gratuit</p>
          <h1 className="geist mt-5 text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-5xl">
            Combien coûterait vraiment votre projet?
          </h1>
          <div className="mt-6 space-y-5 text-[#C7B9B9]">
            <p className="text-lg">
              La plupart des calculateurs de coûts sont des formulaires de collecte déguisés en
              chiffre. Celui-ci utilise le même modèle tarifaire que StillAwake Media utilise à
              l&apos;interne pour chiffrer de vrais mandats. La fourchette que vous obtenez,
              c&apos;est celle d&apos;où on partirait — pas un chiffre conçu pour vous amener au
              téléphone.
            </p>
            <p>
              Les questions portent sur votre entreprise, pas sur la technologie. Pas besoin de savoir
              si ça vous prend Shopify, une API ou un moteur de réservation : décrivez ce qui doit se
              passer, et le modèle détermine ce que ça implique de construire.
            </p>
            <p className="text-sm text-[#8C8080]">
              Gratuit · sans inscription · sans courriel · rien n&apos;est conservé. En dollars
              canadiens.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.05em]">Comment l&apos;estimation est bâtie</h2>

          <div className="mt-7 space-y-6 text-[#C7B9B9]">
            <div>
              <h3 className="font-semibold text-white">Un projet normal, un prix normal</h3>
              <p className="mt-2">
                Le modèle part d&apos;un vrai projet — un site d&apos;entreprise professionnel avec les
                pages, formulaires, mesures et fondations de recherche dont toute entreprise a besoin —
                puis ajoute seulement ce que vous avez demandé. Ce n&apos;est pas un calcul théorique
                d&apos;effort d&apos;agence, et votre projet ne coûte pas plus cher parce que votre
                entreprise compte plus d&apos;employés.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Les services se combinent — ce ne sont pas des catégories</h3>
              <p className="mt-2">
                Un site de restaurant conçu pour bien se classer avec un blogue, ce n&apos;est pas une
                option parmi quatre : c&apos;est quatre types de travail à la fois. Vous choisissez donc
                tout ce qui s&apos;applique et vous fixez la profondeur de chacun. C&apos;est aussi
                pourquoi l&apos;estimation peut bouger beaucoup : le coût vit dans la profondeur.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Les grandes organisations coûtent réellement plus cher à servir</h3>
              <p className="mt-2">
                Pas parce qu&apos;elles en ont les moyens — parce que plusieurs décideurs, c&apos;est
                plusieurs rondes de révision, que la conformité demande de vrais tests, et que se
                connecter à des systèmes qu&apos;on ne voit pas de l&apos;intérieur est réellement plus
                difficile. C&apos;est détaillable, donc on le détaille. Un propriétaire qui décide seul
                n&apos;en coche aucun et paie le prix de base.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Le même mot peut vouloir dire des projets très différents</h3>
              <p className="mt-2">
                « Prise de rendez-vous » peut vouloir dire un lien vers un outil externe, un système de
                réservation intégré au site, ou votre propre moteur de disponibilités avec des règles de
                personnel et de ressources. Ce ne sont pas des variantes d&apos;un même prix — ce sont
                trois projets différents. Le calculateur pose donc une question de suivi au lieu
                d&apos;en faire une moyenne, et c&apos;est pourquoi l&apos;estimation bouge beaucoup
                quand vous y répondez.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">L&apos;incertitude élargit la fourchette, elle ne la gonfle pas</h3>
              <p className="mt-2">
                Quand un projet doit se connecter à un système que personne à l&apos;extérieur de votre
                entreprise n&apos;a vu, on ne peut pas honnêtement dire à quel point ce sera difficile.
                Plutôt que d&apos;inventer un chiffre, le haut de la fourchette monte et le bas reste
                où il est. Une fourchette plus large, c&apos;est le résultat honnête d&apos;une portée
                encore floue.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Les services récurrents restent à part</h3>
              <p className="mt-2">
                Le SEO, l&apos;entretien et l&apos;hébergement sont des coûts récurrents, et les
                fondre dans un total de projet rend les deux chiffres inutiles. Quand un prix mensuel
                est publié, il est affiché comme un prix mensuel; quand il ne l&apos;est pas, on le dit
                plutôt que d&apos;en inventer un. Nos forfaits publiés sont sur la{" "}
                <Link href="/fr/tarifs" className="text-[#D71920] underline-offset-4 hover:underline">
                  page des tarifs
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Il y a un plancher, et il y a un produit à ce plancher</h3>
              <p className="mt-2">
                Rien n&apos;est construit sous {MINIMUM.toLocaleString("fr-CA")} $ — en dessous, le
                cadrage, la révision et le transfert coûtent plus cher que le travail. Mais ce plancher
                est un vrai produit, pas un projet sur mesure au rabais : Lancement, c&apos;est notre
                gabarit éprouvé avec votre image de marque, jusqu&apos;à cinq pages, une ronde de
                révisions. C&apos;est justement la portée fixe qui rend le prix possible. Les mandats
                plus petits passent par le{" "}
                <Link href="/fr/maintenance-site-web" className="text-[#D71920] underline-offset-4 hover:underline">
                  dépannage ponctuel
                </Link>
                , qui a ses propres prix publiés.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Au-delà d&apos;un certain point, on cadre au lieu de chiffrer</h3>
              <p className="mt-2">
                Personne ne peut chiffrer honnêtement une plateforme à partir d&apos;un questionnaire —
                les exigences sont la partie coûteuse et elles n&apos;existent pas encore. Au-delà
                d&apos;environ 40 000 $, et pour tout logiciel, l&apos;outil propose un cadrage payant
                plutôt qu&apos;un chiffre confiant. À partir de{" "}
                {DISCOVERY.from.toLocaleString("fr-CA")} $, ça produit une portée écrite et un prix de
                construction fixe, et les frais sont déduits de la construction.
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-[#5a5252]">
            Modèle tarifaire {PRICING_VERSION}
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.05em]">Pour aller plus loin</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Combien coûte un site web au Québec?", "/fr/prix-site-web-quebec"],
              ["Tarifs publiés — sans appel de vente", "/fr/tarifs"],
              ["Refonte de site web", "/fr/refonte-site-web"],
              ["Développement logiciel sur mesure", "/fr/developpement-logiciel"],
              ["Boutique en ligne au Québec", "/fr/boutique-en-ligne-quebec"],
              ["Référencement naturel", "/fr/referencement-naturel"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-white/10 px-5 py-4 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/50 hover:text-white"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
