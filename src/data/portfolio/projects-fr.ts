import type { Project, ProjectCategoryId } from "@/data/portfolio/projects";

/**
 * French copy for the portfolio, keyed by project id.
 *
 * Written for Québec, not machine-translated, and kept beside the English
 * registry rather than inside it so a project without French copy is obvious
 * (the FR page falls back to the English summary and says nothing it can't
 * back up). Links stay in French where a French page exists.
 */

export const projectCategoriesFr: Record<ProjectCategoryId, { label: string; blurb: string }> = {
  websites: { label: "Sites web", blurb: "Des sites codés sur mesure, pensés pour l'intention de recherche et une prochaine étape claire." },
  apps: { label: "Applications", blurb: "Produits mobiles et en temps réel." },
  games: { label: "Jeux", blurb: "Jeux originaux publiés par StillAwake Media." },
  tools: { label: "Outils", blurb: "Des outils gratuits, ouverts à tous." },
  components: { label: "Composants", blurb: "Sections d'interface interactives et blocs réutilisables." },
  saas: { label: "SaaS", blurb: "Logiciels vendus comme service." },
  "brand-design": { label: "Marque et design", blurb: "Identités visuelles, logos et éléments graphiques." },
};

type ProjectFr = {
  kind: string;
  summary: string;
  /** French case study, when one exists. */
  caseStudyPath?: string;
};

export const projectsFr: Record<string, ProjectFr> = {
  "stillskin-forest": {
    kind: "Survie-horreur coopératif",
    summary: "Un jeu de survie-horreur coopératif sur Roblox. La forêt est belle. Les nuits, non.",
  },
  "lisa-travel-design": {
    kind: "Site de voyage",
    summary: "Un site de voyage haut de gamme bâti autour de la confiance, de la planification et des demandes qualifiées.",
    caseStudyPath: "/fr/etude-de-cas-lisa-travel-design",
  },
  "navtrl-stalkr": {
    kind: "Application de localisation",
    summary: "Stalkr, une application de localisation en temps réel pour les groupes hors réseau, et le site NAVTRL qui la présente.",
    caseStudyPath: "/fr/etude-de-cas-stalkr-navtrl",
  },
  bankdemark: {
    kind: "Plateforme finance et SEO",
    summary: "Une plateforme de contenu financier menée par des calculateurs, conçue autour de l'intention de recherche.",
    caseStudyPath: "/fr/etude-de-cas-bankdemark",
  },
  "blackwater-aquatics": {
    kind: "Boutique Shopify",
    summary: "Commerce Shopify axé sur l'éducation : boutique, SEO et contenu pour les aquariophiles canadiens.",
    caseStudyPath: "/fr/etude-de-cas-blackwater-aquatics",
  },
  "zylx-ai": {
    kind: "Logiciel IA",
    summary: "Une marque logicielle d'IA pour les systèmes de flux de travail, les agents et l'automatisation.",
  },
  "northground-bushcraft": {
    kind: "Marque plein air",
    summary: "Une présence de marque plein air robuste, avec une direction éditoriale axée sur la survie et le terrain.",
  },
  "llms-txt-generator": {
    kind: "Outil AEO gratuit",
    summary: "Un outil gratuit qui rédige un fichier llms.txt pour un site et montre ce qu'un moteur de réponse ne peut pas savoir de l'entreprise.",
  },
  "neon-link-hub": {
    kind: "Composant d'interface",
    summary: "Un composant de centre de liens animé : sections interactives et blocs d'interface axés sur la conversion.",
  },
  "graphics-and-assets": {
    kind: "Design graphique",
    summary: "Infographies, vignettes, visuels sociaux et bannières qui renforcent l'autorité de la marque.",
  },
};

/**
 * Where a French card should go: the French case study if there is one,
 * otherwise the project's canonical page on this site if it is a game or tool
 * (English, flagged with hreflang on the link), otherwise the live site.
 */
export function projectHrefFr(project: Project): { href: string; lang?: string; external?: boolean } {
  const fr = projectsFr[project.id];
  if (fr?.caseStudyPath) return { href: fr.caseStudyPath };
  if (project.canonicalPath) return { href: project.canonicalPath, lang: "en-CA" };
  if (project.externalUrl) return { href: project.externalUrl, external: true };
  return { href: `/our-work/${project.slug}`, lang: "en-CA" };
}
