import type { Metadata } from "next";

import { PageSchema } from "@/components/page-schema";
import { TechStackGuide } from "@/components/tech-stack/guide";
import { FR } from "@/lib/tech-stack/fr";
import { PATHS } from "@/lib/tech-stack/types";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}${PATHS.fr}`;
const enUrl = `${siteUrl}${PATHS.en}`;

/**
 * Version française — et elle n'est pas justifiée par le volume.
 *
 * Google Keyword Planner (Canada, français, mesuré le 2026-08-15) ne retourne
 * AUCUN volume pour à peu près toutes les formulations de ce besoin :
 * « quelle plateforme pour site web », « meilleure plateforme site web »,
 * « choisir plateforme site web », « quelle technologie pour un site web »,
 * « wordpress ou site sur mesure », « cms ou site sur mesure », « site web
 * sur mesure ou template » — toutes sans données. Les seules valeurs mesurées
 * du groupe sont « wordpress vs shopify » (210/mois, une comparaison qui
 * appartient déjà à /fr/shopify-vs-woocommerce), « développement web sur
 * mesure » (40/mois) et « quel cms choisir » (10/mois).
 *
 * Cette page existe donc pour trois raisons qui ne sont pas le classement :
 *
 *   1. Parité linguistique. Le site est bilingue par principe et par marché;
 *      publier la ressource décisionnelle en anglais seulement dirait au
 *      lecteur québécois que la réflexion sérieuse se fait dans l'autre
 *      langue.
 *   2. Citation par les assistants. La question se pose en français même
 *      quand elle ne se tape pas dans Google, et c'est une surface de
 *      citation plutôt qu'une surface de classement.
 *   3. Support du calculateur, qui existe en français à
 *      /fr/outils/calculateur-cout-projet et dont les recommandations
 *      d'architecture doivent pouvoir pointer vers une explication française.
 *
 * C'est le même raisonnement, assumé, que celui qui garde /seo-canada en
 * anglais seulement : on publie une langue quand elle sert le lecteur, pas
 * parce qu'un tableau de mots-clés le demande.
 */
export const metadata: Metadata = {
  title: FR.chrome.meta.title,
  description: FR.chrome.meta.description,
  alternates: {
    canonical: url,
    languages: { "fr-CA": url, "en-CA": enUrl, "x-default": enUrl },
  },
  openGraph: {
    title: FR.chrome.meta.ogTitle,
    description: FR.chrome.meta.ogDescription,
    url,
    type: "article",
    locale: "fr_CA",
  },
};

export default function ChoisirTechnologieSiteWebPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route={PATHS.fr} />
      <TechStackGuide
        content={FR}
        calculatorHref="/fr/outils/calculateur-cout-projet"
        pricingHref="/fr/tarifs"
        prerequisite={{
          lead: "Si vous n'avez pas encore établi ce que le site doit faire, cette décision vient avant :",
          label: "quel genre de site votre entreprise a besoin",
          href: "/fr/guide-site-web-entreprise",
        }}
      />
    </main>
  );
}
