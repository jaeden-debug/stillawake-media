import type { Metadata } from "next";

import { GuideBody } from "@/components/custom-software/guide-sections";
import { PageSchema } from "@/components/page-schema";
import { FR } from "@/lib/custom-software/fr";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}${FR.path}`;
const enUrl = `${siteUrl}${FR.otherPath}`;

/**
 * « Logiciel sur mesure ou solution existante? »
 *
 * L'URL porte la DÉCISION, pas le produit — délibérément. Google Keyword
 * Planner (Canada, français, historique exact, 2026-08-15) donne « logiciel
 * sur mesure » à 70/mois et « développement logiciel sur mesure » à 50/mois,
 * les deux en concurrence moyenne, et ces intentions appartiennent déjà à
 * /fr/developpement-logiciel. Écrire une deuxième page commerciale pour les
 * mêmes termes serait de la cannibalisation.
 *
 * Le reste du groupe français mesuré est mince — « application sur mesure »,
 * « erp sur mesure », « logiciel de gestion sur mesure » à 10/mois — et
 * plusieurs formulations en question ne retournent aucun volume mesurable.
 * C'est le signe d'une intention conversationnelle : une surface de citation
 * pour les moteurs de réponse plutôt qu'une surface de classement. D'où le
 * bloc de réponse directe, la FAQ, et le fait que la seconde source de trafic
 * prévue soit le calculateur de projet, qui pointe ici depuis chaque résultat
 * qui aboutit du côté applicatif.
 */
export const metadata: Metadata = {
  title: FR.meta.title,
  description: FR.meta.description,
  alternates: {
    canonical: url,
    languages: { "fr-CA": url, "en-CA": enUrl, "x-default": enUrl },
  },
  openGraph: {
    title: FR.meta.ogTitle,
    description: FR.meta.ogDescription,
    url,
    type: "article",
    locale: "fr_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: FR.meta.ogTitle,
    description: FR.meta.ogDescription,
  },
};

export default function LogicielSurMesureOuSolutionExistantePage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route={FR.path} />
      <GuideBody content={FR} />
    </main>
  );
}
