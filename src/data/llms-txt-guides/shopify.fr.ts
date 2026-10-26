import type { PlatformGuide } from "@/lib/llms-txt-guides/types";

/**
 * Shopify — version française (Québec).
 *
 * Ce n'est pas la traduction de la fiche anglaise, et la raison éditoriale est
 * différente. En anglais, l'enjeu est de corriger les guides qui font encore
 * téléverser un fichier dans Fichiers avec une redirection d'URL. En français,
 * il s'y ajoute une question que la documentation anglophone ne pose jamais :
 * une boutique québécoise bilingue veut savoir s'il existe un /fr/llms.txt.
 * La réponse — non, jamais — est documentée par Shopify et change ce qu'il
 * faut écrire dans le fichier unique servi au domaine principal.
 */
export const shopifyGuideFr: PlatformGuide = {
  slug: "shopify",
  platform: "Shopify",
  locale: "fr",
  status: "verified",

  primaryKeyword: "llms.txt shopify",
  secondaryKeywords: [
    "fichier llms.txt shopify",
    "ajouter llms.txt shopify",
    "llms.txt.liquid",
    "agents.md shopify",
  ],

  title: "llms.txt sur Shopify : votre boutique en a déjà un",
  description:
    "Shopify génère /llms.txt pour chaque boutique depuis le 28 mai 2026. Comment vérifier le vôtre, pourquoi il n'existe pas de version française séparée du fichier, et dans quels cas rares un modèle llms.txt.liquid se justifie vraiment.",

  intro:
    "Si vous exploitez une boutique Shopify, vous avez déjà un /llms.txt fonctionnel : Shopify le génère pour chaque vitrine depuis le 28 mai 2026 et le garde aligné sur /agents.md sans aucune intervention dans le thème. Le travail utile n'est donc pas de créer le fichier, mais de lire ce qu'il raconte de vous. Et pour une boutique québécoise bilingue, il y a une contrainte de plus, rarement mentionnée : le fichier est servi au domaine principal nu, sans préfixe de langue ni sous-dossier Shopify Markets, et il n'a aucune contrepartie localisée. Un seul fichier, deux publics.",

  supportStatus: {
    kind: "native",
    summary:
      "Pris en charge nativement depuis le 28 mai 2026. Chaque boutique Shopify sert /llms.txt, /llms-full.txt et /agents.md sans configuration. Shopify recommande explicitement de ne pas ajouter de modèle llms.txt.liquid dans la plupart des cas.",
  },

  fileLocation:
    "Servi par Shopify à https://votreboutique.com/llms.txt, toujours au domaine principal nu. Si vous décidez de le remplacer, le modèle se trouve dans le thème sous templates/llms.txt.liquid (Boutique en ligne → Thèmes → Modifier le code → Templates).",
  implementationMethod:
    "Modèle Liquid avec chaîne de repli : Shopify sert templates/llms.txt.liquid s'il existe, sinon templates/agents.md.liquid, sinon la version générée par Shopify. Un modèle llms.txt.liquid ne touche que /llms.txt : /agents.md et /llms-full.txt gardent leur propre résolution.",

  prerequisites: [
    "Une vitrine Shopify publiée : les trois fichiers sont servis sur le domaine en ligne, pas sur une boutique protégée par mot de passe.",
    "L'accès au code du thème (Boutique en ligne → Thèmes → Modifier le code), uniquement si vous comptez remplacer la version générée.",
  ],

  steps: [
    {
      title: "Lisez d'abord ce que Shopify sert déjà",
      body: "Avant de toucher à quoi que ce soit, ouvrez https://votreboutique.com/llms.txt et https://votreboutique.com/agents.md. Shopify construit les deux à partir des données de votre boutique : ce que vous voyez est exactement ce qu'un agent conversationnel voit. Lisez-le comme quelqu'un qui n'a jamais entendu parler de votre marque. La plupart des marchands constatent que le fichier est correct et que c'est la description de la boutique qui est faible.",
      code: {
        language: "bash",
        caption: "Vérifier les trois points d'accès",
        content:
          "curl -sI https://votreboutique.com/agents.md | head -n 3\ncurl -s  https://votreboutique.com/llms.txt | head -n 40\ncurl -s  https://votreboutique.com/llms-full.txt | head -n 20",
      },
    },
    {
      title: "Comprenez qu'il n'y a pas de version française du fichier",
      body: "C'est le point le plus important pour une boutique bilingue et il est écrit noir sur blanc dans la documentation de Shopify : le fichier est servi au domaine principal nu, sans préfixe de langue ni sous-dossier Shopify Markets, et il n'a aucune contrepartie localisée. Autrement dit, https://votreboutique.com/fr/llms.txt n'existe pas et n'existera pas. Si votre clientèle est francophone, c'est le fichier unique du domaine qui doit le dire.",
    },
    {
      title: "Décidez si un remplacement se justifie vraiment",
      body: "Shopify écrit qu'il ne faut pas ajouter de modèle llms.txt.liquid dans la majorité des cas, parce que la version gérée reste alignée sur /agents.md sans entretien de votre part. N'en ajoutez un que si /llms.txt doit dire quelque chose de différent de /agents.md. Si vous voulez simplement du meilleur contenu partout, modifiez plutôt templates/agents.md.liquid : /llms.txt et /llms-full.txt s'y replient tous les deux.",
    },
    {
      title: "Écrivez le modèle avec les seuls objets réellement disponibles",
      body: "C'est ici que la majorité des exemples copiés cassent. Dans llms.txt.liquid, vous n'avez accès qu'à l'objet request et à l'objet agents. Les objets globaux habituels de Liquid — shop, collections, articles, products — ne sont pas injectés. Comme Liquid rend un objet inconnu par du vide plutôt que par une erreur, une boucle sur collections produit un fichier syntaxiquement valide et vide, sans le moindre avertissement dans l'éditeur de thème.",
    },
    {
      title: "Corrigez les données de la boutique, pas seulement le fichier",
      body: "Un llms.txt impeccable qui pointe vers une boutique sans zones de livraison déclarées, sans politique de retour rédigée et avec une description d'une ligne n'aidera aucun assistant à répondre à une question sur vous. Le fichier généré ne peut refléter que ce que la boutique déclare déjà. Sur la plupart des boutiques québécoises, le vrai chantier est dans les politiques, la page À propos et les fiches produits — en français comme en anglais.",
    },
  ],

  example: {
    caption:
      "Un modèle llms.txt.liquid minimal pour une boutique bilingue. Il n'utilise que les propriétés documentées de l'objet agents, et il nomme les deux langues dans le même fichier puisqu'il n'y en aura jamais deux.",
    language: "liquid",
    content: `# {{ agents.store_name }}

> Boutique en ligne établie au Québec. Site offert en français et en anglais.

Domaine : {{ agents.store_url }}
Devise : {{ agents.currency }}
Plan du site : {{ agents.sitemap_url }}
Point d'accès MCP : {{ agents.mcp_endpoint_url }}

## Langues

- Français (marché principal) : {{ agents.store_url }}/fr
- English : {{ agents.store_url }}

## Notes pour les agents

- Les frais de livraison, les retours et les modalités de paiement sont publiés dans les politiques de la boutique.
- Les prix affichés sur la vitrine font foi ; une copie mise en cache peut être périmée.
- Les demandes de gros ou B2B passent par la page Contact liée dans la navigation.`,
  },

  gotchas: [
    {
      title: "Il n'y a qu'un seul fichier, même sur une boutique bilingue",
      body:
        "Shopify Markets et Traduire et adapter localisent la vitrine, pas les fichiers de découverte. Aucun préfixe de langue ne s'applique et il n'existe pas de contrepartie localisée. Si vous ajoutez un modèle qui ne parle qu'anglais, votre clientèle francophone disparaît de la seule description que les agents lisent. Nommez les deux langues dans le fichier unique.",
    },
    {
      title: "Le téléversement avec redirection d'URL est devenu la mauvaise réponse",
      body:
        "Beaucoup de guides encore bien classés vous font déposer un fichier Markdown dans la section Fichiers, puis créer une redirection de /llms.txt vers l'URL du CDN. C'était un contournement raisonnable avant la prise en charge native. Aujourd'hui, ça masque un fichier que Shopify génère et tient à jour, et ça vous confie un entretien manuel que personne n'assumera. Si vous aviez fait ça, retirez la redirection.",
    },
    {
      title: "La plupart des objets Liquid globaux sont absents à ce chemin",
      body:
        "llms.txt.liquid n'expose que agents et request. Un exemple repris d'un tutoriel Liquid générique, qui itère sur collections ou products, ne lèvera aucune erreur : il rendra simplement du vide. Vérifiez le fichier servi en production, pas l'aperçu dans l'éditeur.",
    },
    {
      title: "C'est /agents.md qui fait autorité, pas /llms.txt",
      body:
        "Shopify traite /agents.md comme le document canonique de découverte par les agents, et /llms.txt comme une adresse alternative qui le reflète par défaut. Remplacer seulement llms.txt.liquid crée une divergence que vous devrez entretenir à deux endroits ; modifier templates/agents.md.liquid agit sur les trois chemins d'un coup.",
    },
    {
      title: "Le modèle doit être en Liquid, pas en JSON",
      body:
        "Les modèles récents de Shopify sont souvent en JSON. Celui-ci ne peut pas l'être : le fichier doit s'appeler llms.txt.liquid et contenir du Liquid, quelle que soit la langue de votre interface d'administration.",
    },
  ],

  verificationMethod: [
    {
      title: "Confirmez un code 200 et un type texte brut",
      body: "Une vérification réussie renvoie HTTP 200 avec un type de contenu texte. Un 404 signifie que la vitrine ne sert pas le fichier — le plus souvent parce que vous testez une boutique protégée par mot de passe. Un type text/html indique qu'une redirection ou une application intercepte le chemin.",
      code: {
        language: "bash",
        content: 'curl -sI https://votreboutique.com/llms.txt | grep -iE "^(HTTP|content-type)"',
      },
    },
    {
      title: "Vérifiez qu'aucune redirection ne masque le chemin",
      body: "Dans l'administration Shopify, ouvrez Boutique en ligne → Navigation → Redirections d'URL et cherchez /llms.txt. Une redirection laissée par l'ancien contournement a préséance sur le modèle : c'est la première cause d'un remplacement qui « ne fait rien ».",
    },
    {
      title: "Confirmez que c'est bien votre version qui est servie",
      body: "Après avoir ajouté llms.txt.liquid, récupérez le fichier et cherchez une chaîne qui n'existe que dans votre modèle. Si vous voyez le contenu généré par Shopify, le modèle n'a pas pris effet : revalidez le nom exact du fichier et assurez-vous d'avoir modifié le thème publié plutôt qu'une copie.",
      code: {
        language: "bash",
        content: 'curl -s https://votreboutique.com/llms.txt | grep -i "Notes pour les agents"',
      },
    },
  ],

  limitations: [
    "Le fichier généré décrit votre boutique, pas votre marketing. Si les données de la boutique sont minces, le fichier le sera aussi : aucun modèle n'invente des faits.",
    "Un seul fichier dessert toutes les langues et tous les marchés. Vous ne pouvez pas servir une version française et une version anglaise distinctes, ni cibler un marché Shopify précis.",
    "Remplacer llms.txt.liquid vous en confie l'entretien : Shopify cesse de le garder aligné sur /agents.md et rien ne vous préviendra quand votre catalogue ou vos politiques changeront.",
    "llms.txt reste une convention proposée. Le fait que Shopify la serve n'oblige aucun assistant à la lire, et aucun moteur ne s'est engagé à s'en servir comme signal de classement ou de citation.",
  ],

  verifiedDate: "2026-08-14",
  sources: [
    {
      label: "Shopify — référence du modèle llms.txt.liquid",
      url: "https://shopify.dev/docs/storefronts/themes/architecture/templates/llms-txt-liquid",
      kind: "primary",
    },
    {
      label: "Shopify — référence du modèle agents.md.liquid (objet agents)",
      url: "https://shopify.dev/docs/storefronts/themes/architecture/templates/agents-md-liquid",
      kind: "primary",
    },
    {
      label: "Journal des modifications Shopify — personnaliser /llms.txt, /llms-full.txt et /agents.md (28 mai 2026)",
      url: "https://shopify.dev/changelog/customize-llmstxt-llms-fulltxt-and-agentsmd",
      kind: "primary",
    },
  ],

  relatedServices: [
    { label: "Développement Shopify", href: "/fr/developpement-shopify" },
    { label: "Référencement IA (AEO)", href: "/fr/referencement-ia" },
  ],
  relatedGuides: ["nextjs", "wordpress"],
};
