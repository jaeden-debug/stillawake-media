import type { Finding, FindingId } from "@/lib/llms-txt/analyze";

/**
 * User-facing copy for the llms.txt tool.
 *
 * Only presentation lives here. Crawling, SSRF protection, rate limiting,
 * entity analysis and scoring are shared server-side and are not duplicated or
 * varied per locale — a French visitor gets the same analysis, described in
 * French.
 *
 * Findings are keyed by `Finding.id` rather than translated from the English
 * string, so rewording an English finding cannot silently desynchronize the
 * French one. When no French copy exists for an id, the English server copy is
 * rendered rather than a blank — a missing translation degrades to information,
 * not to nothing.
 */

export type ToolLocale = "en" | "fr";

type FindingCopy = {
  /** `{value}` is replaced with the detected value when one is present. */
  ok: string;
  notOk: string;
  why: string;
};

export type ToolStrings = {
  urlLabel: string;
  placeholder: string;
  submit: string;
  submitting: string;
  genericError: string;
  networkError: string;
  running: string;
  scoreSuffix: string;
  readinessFor: string;
  pagesRead: (n: number) => string;
  findingsHeading: string;
  fileHeading: string;
  copy: string;
  copied: string;
  download: string;
  saveItAt: string;
  outputLabel: string;
  gapsHeading: (n: number) => string;
  gapsBody: string;
  gapsCta: string;
  gapsHref: string;
  findings: Partial<Record<FindingId, FindingCopy>>;
};

const EN: ToolStrings = {
  urlLabel: "Website address",
  placeholder: "yourcompany.com",
  submit: "Check my site",
  submitting: "Checking…",
  genericError: "Something went wrong.",
  networkError: "Could not reach the checker. Try again.",
  running: "Reading your homepage, sitemap and up to twelve pages. This takes a few seconds.",
  scoreSuffix: "/100",
  readinessFor: "AI readiness for",
  pagesRead: (n) => `${n} pages read`,
  findingsHeading: "What an answer engine can and cannot tell about you",
  fileHeading: "Your llms.txt",
  copy: "Copy",
  copied: "Copied",
  download: "Download",
  saveItAt: "Edit it before you publish. Save it at",
  outputLabel: "Generated llms.txt content",
  gapsHeading: (n) => `${n} ${n === 1 ? "gap" : "gaps"} worth fixing`,
  gapsBody:
    "Publishing the file is the easy half. The findings above are the reason an assistant would still struggle to describe or recommend you. That is the work we do.",
  gapsCta: "How we fix these →",
  gapsHref: "/answer-engine-optimization",
  // English renders the server copy directly; no overrides needed.
  findings: {},
};

const FR: ToolStrings = {
  urlLabel: "Adresse du site web",
  placeholder: "votreentreprise.com",
  submit: "Analyser mon site",
  submitting: "Analyse en cours…",
  genericError: "Une erreur est survenue.",
  networkError: "Impossible de joindre l'outil. Réessayez.",
  running:
    "Lecture de votre page d'accueil, de votre plan de site et d'un maximum de douze pages. Ça prend quelques secondes.",
  scoreSuffix: "/100",
  readinessFor: "Lisibilité par les IA pour",
  pagesRead: (n) => `${n} page${n === 1 ? "" : "s"} lue${n === 1 ? "" : "s"}`,
  findingsHeading: "Ce qu'un moteur de réponse peut — et ne peut pas — dire de vous",
  fileHeading: "Votre fichier llms.txt",
  copy: "Copier",
  copied: "Copié",
  download: "Télécharger",
  saveItAt: "Modifiez-le avant de le publier. Enregistrez-le à",
  outputLabel: "Contenu llms.txt généré",
  gapsHeading: (n) => `${n} lacune${n === 1 ? "" : "s"} à corriger`,
  gapsBody:
    "Publier le fichier, c'est la moitié facile. Les constats ci-dessus expliquent pourquoi un assistant aurait encore de la difficulté à vous décrire ou à vous recommander. C'est ce travail-là que nous faisons.",
  gapsCta: "Comment on corrige ça →",
  gapsHref: "/fr/referencement-ia",
  findings: {
    organization: {
      ok: "Organisation identifiée : {value}",
      notOk: "Aucune entité Organisation trouvée",
      why: "Sans organisation nommée dans les données structurées, un moteur de réponse doit deviner à qui appartient le site à partir du texte — et il choisit généralement de ne pas vous nommer du tout.",
    },
    description: {
      ok: "Description trouvée",
      notOk: "Aucune description trouvée",
      why: "C'est la phrase qu'un assistant réutilise quand on lui demande ce que vous faites. Sans elle, il écrit la sienne à partir du premier texte qu'il croise.",
    },
    pricing: {
      ok: "Signal de prix trouvé sur le site",
      notOk: "Aucun prix trouvé sur les pages analysées",
      why: "On demande constamment aux assistants ce que coûtent les choses. Un site sans aucun chiffre ne peut pas être la réponse : le concurrent qui affiche ses prix se fait citer à votre place.",
    },
    "area-served": {
      ok: "Zone desservie déclarée : {value}",
      notOk: "Aucune zone desservie déclarée",
      why: "Où vous travaillez est l'un des premiers filtres appliqués à une recommandation. Ne pas le déclarer, c'est être exclu de toutes les questions géographiques.",
    },
    contact: {
      ok: "Moyen de contact trouvé",
      notOk: "Aucun moyen de contact évident",
      why: "Une recommandation qu'on ne peut pas suivre est rarement faite. Les moteurs privilégient les entreprises qu'un lecteur peut réellement joindre.",
    },
    founder: {
      ok: "Fondateur identifié : {value}",
      notOk: "Aucune entité fondateur ou auteur",
      why: "Une personne nommée rattachée à une organisation est l'un des signaux de confiance les plus forts, et elle relie votre entité à ses profils publics.",
    },
    "same-as": {
      ok: "{value} profil(s) externe(s) liés",
      notOk: "Aucun profil sameAs lié",
      why: "sameAs sert à dire à un moteur que l'entité d'ici et celle de LinkedIn sont la même chose, plutôt que deux entreprises au nom semblable.",
    },
    "llms-txt": {
      ok: "Un fichier llms.txt existe déjà",
      notOk: "Aucun llms.txt publié pour l'instant",
      why: "Le fichier lui-même est la plus petite partie du travail, mais le publier, c'est choisir votre résumé au lieu d'accepter celui qui sera déduit.",
    },
  },
};

export const TOOL_STRINGS: Record<ToolLocale, ToolStrings> = { en: EN, fr: FR };

/**
 * Localized text for one finding, falling back to the server's English copy
 * when this locale has no entry for that id.
 */
export function findingCopy(
  finding: Finding,
  strings: ToolStrings,
): { label: string; why: string } {
  const copy = strings.findings[finding.id];
  if (!copy) return { label: finding.label, why: finding.why };
  const template = finding.level === "ok" ? copy.ok : copy.notOk;
  return {
    label: template.replace("{value}", finding.value ?? ""),
    why: copy.why,
  };
}
