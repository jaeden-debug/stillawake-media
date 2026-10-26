import type { Metadata } from "next";

import { GuideBody } from "@/components/website-setup/guide-sections";
import { PageSchema } from "@/components/page-schema";
import { FR } from "@/lib/website-setup/fr";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}${FR.path}`;
const enUrl = `${siteUrl}${FR.otherPath}`;

/**
 * « Quel type de site web pour votre entreprise ? »
 *
 * Écrit pour le Québec plutôt que traduit, et pas seulement de ton : la
 * version française porte deux exigences que l'anglaise n'a pas — la Loi 96
 * (le français n'est pas une traduction ajoutée, c'est une exigence de
 * contenu qui double l'opération éditoriale) et la Loi 25 (tout compte client
 * devient une obligation documentée). Ces deux réalités changent des réponses
 * dans le questionnaire, elles ne colorent pas les paragraphes.
 *
 * Demande mesurée (Google Keyword Planner, 2026-08, Canada, français) : la
 * formulation en question n'a pas de volume mesurable, mais le vocabulaire du
 * marché en a — « site vitrine » 50/mois (LOW), « site transactionnel »
 * 40/mois plus « site web transactionnel » 30/mois, « types de sites web »
 * 20/mois, « site web pour entreprise » 20/mois, « cahier des charges site
 * web » 10/mois. C'est pourquoi ce sont les noms des types, pas des
 * traductions littérales de « brochure site » et « ecommerce website ».
 */
export const metadata: Metadata = {
  title: FR.meta.title,
  description: FR.meta.description,
  alternates: {
    canonical: FR.path,
    languages: { "fr-CA": url, "en-CA": enUrl, "x-default": enUrl },
  },
  openGraph: {
    title: FR.meta.ogTitle,
    description: FR.meta.ogDescription,
    url,
    type: "article",
    locale: "fr_CA",
  },
};

export default function GuideSiteWebEntreprisePage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route={FR.path} />
      <GuideBody content={FR} />
    </main>
  );
}
