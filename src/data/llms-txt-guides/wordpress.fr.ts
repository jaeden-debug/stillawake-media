import type { PlatformGuide } from "@/lib/llms-txt-guides/types";

/**
 * WordPress — version française (Québec).
 *
 * Deux raisons éditoriales, dont une qui n'existe qu'en français.
 *
 * La première est la même qu'en anglais : les pages qui se classent disent
 * « installez une extension » et s'arrêtent là, alors que l'information utile
 * est ce que l'extension fait réellement — Yoast écrit un vrai fichier sur le
 * disque, le rafraîchit une fois par semaine et plafonne à cinq entrées par
 * type de contenu.
 *
 * La seconde est propre au Québec : une part importante des sites WordPress
 * d'ici sont bilingues avec Polylang ou WPML, et un fichier physique déposé à
 * la racine web ne passe jamais par WordPress. L'extension de langue ne voit
 * donc jamais la requête. Personne ne le dit, et c'est la question numéro un
 * quand on parle de llms.txt à un site fr/en.
 */
export const wordpressGuideFr: PlatformGuide = {
  slug: "wordpress",
  platform: "WordPress",
  locale: "fr",
  status: "verified",

  primaryKeyword: "llms.txt wordpress",
  secondaryKeywords: [
    "extension llms.txt wordpress",
    "ajouter llms.txt wordpress",
    "yoast llms.txt",
    "llms.txt site bilingue",
  ],

  title: "llms.txt sur WordPress : extension ou fichier déposé à la main",
  description:
    "Ce que font vraiment les extensions llms.txt sur WordPress — Yoast écrit un fichier physique rafraîchi une fois par semaine, plafonné à cinq entrées par type de contenu — et pourquoi un site bilingue Polylang ou WPML n'obtient qu'un seul fichier, quoi qu'il arrive.",

  intro:
    "Trois chemins mènent à un llms.txt sur WordPress : laisser une extension de référencement le générer, en installer une qui sert l'adresse dynamiquement, ou déposer vous-même un fichier à la racine web. Ils ne sont pas équivalents et l'écran de réglages ne montre pas la différence. Yoast SEO, par exemple, écrit un vrai fichier sur le disque et le met à jour par une tâche planifiée hebdomadaire — pas à la publication — en ne retenant que les cinq éléments les plus récemment modifiés par type de contenu, publiés dans les douze derniers mois, en donnant priorité au contenu phare (« cornerstone »). C'est un choix défendable, mais ce n'est pas ce que « génération automatique » évoque. Et sur un site bilingue, un quatrième problème apparaît.",

  supportStatus: {
    kind: "plugin",
    summary:
      "Rien dans le cœur de WordPress. Yoast SEO génère un llms.txt comme fonctionnalité intégrée qu'on active ; des extensions dédiées le servent par règle de réécriture ; ou vous téléversez un fichier statique. Les trois fonctionnent et échouent différemment.",
  },

  fileLocation:
    "https://votresite.com/llms.txt. Physiquement, soit un vrai fichier dans la racine web — le dossier qui contient wp-config.php — soit une adresse virtuelle gérée par la règle de réécriture d'une extension, sans aucun fichier sur le disque.",
  implementationMethod:
    "Trois options : (1) Yoast SEO écrit un fichier physique dans la racine web par une action planifiée hebdomadaire, en résolvant le chemin avec get_home_path() puis en repli sur la racine documentaire du serveur ; (2) une extension dédiée enregistre une règle de réécriture et rend le fichier à la demande, avec son propre cache ; (3) vous déposez un fichier statique par SFTP.",

  prerequisites: [
    "Un accès administrateur à WordPress si vous passez par une extension, ou un accès SFTP ou gestionnaire de fichiers à la racine web si vous déposez le fichier vous-même.",
    "Une décision claire sur qui répond de l'exactitude du fichier : les règles de sélection de l'extension, ou vous. C'est le vrai choix qui se fait ici.",
    "Sur un site bilingue, savoir laquelle de vos deux langues doit dominer le fichier unique, puisqu'il n'y en aura qu'un.",
  ],

  steps: [
    {
      title: "Une note de vocabulaire avant de chercher",
      body: "La traduction officielle de WordPress dit « extension » là où l'anglais dit plugin, et l'interface d'administration française n'affiche que « Extensions ». Dans le milieu québécois, on dit couramment « plugin » à l'oral et dans la documentation technique. Les deux mots désignent la même chose : si vous cherchez de la documentation, essayez les deux, et sachez que les fils de discussion utiles sur ce sujet sont encore majoritairement anglophones.",
    },
    {
      title: "Vérifiez si vous en avez déjà un",
      body: "Avant d'installer quoi que ce soit, ouvrez https://votresite.com/llms.txt. Une extension de référencement déjà en place a pu en générer un, et un fichier oublié peut dormir dans la racine web. Ça compte plus sur WordPress qu'ailleurs : un fichier physique sur le disque est servi par le serveur web avant même que WordPress traite la requête, donc un vieux dépôt masque silencieusement l'extension que vous activerez plus tard.",
      code: {
        language: "bash",
        content: 'curl -sI https://votresite.com/llms.txt | grep -iE "^(HTTP|content-type)"\ncurl -s  https://votresite.com/llms.txt | head -n 30',
      },
    },
    {
      title: "Option A — activer la fonctionnalité dans Yoast SEO",
      body: "Yoast SEO inclut la génération de llms.txt pour les versions gratuite et payante ; on l'active dans les réglages du site et rien d'autre n'est requis. Sachez ce que vous obtenez : Yoast écrit un fichier physique dans la racine web, en résolvant le chemin par get_home_path() avec un repli sur la racine documentaire du serveur, puis rafraîchit ce fichier par une action planifiée hebdomadaire plutôt qu'à la publication.",
    },
    {
      title: "Option B — une extension dédiée si vous voulez du dynamique",
      body: "Les extensions conçues spécifiquement pour ça, comme LLMs.txt Builder sur WordPress.org, procèdent autrement : elles enregistrent des règles de réécriture et produisent la réponse à la demande, avec leur propre cache — 24 heures dans le cas de celle-là — et génèrent souvent un llms-full.txt avec des extraits. Conséquence pratique : le fichier n'existe que comme route, ce qu'il faut savoir avant de le chercher sur le disque.",
    },
    {
      title: "Option C — écrire le fichier et le déposer vous-même",
      body: "Déposez un llms.txt dans la racine web — le même dossier que wp-config.php — par SFTP ou par le gestionnaire de fichiers de votre hébergeur. C'est la seule option qui vous donne le contrôle éditorial complet, ce qui est généralement l'enjeu réel pour un site d'entreprise : vingt lignes choisies qui disent qui vous êtes, ce que vous vendez et à quel prix valent mieux qu'une liste automatique de vos cinq derniers billets. En contrepartie, rien ne le met à jour sauf vous.",
    },
    {
      title: "Sur un site bilingue, choisissez la langue du fichier unique",
      body: "Polylang et WPML découpent le site par sous-dossier de langue, mais un fichier physique déposé à la racine web est servi par le serveur avant que WordPress ne route la requête : l'extension de langue ne la voit jamais. Il n'y aura donc qu'un seul /llms.txt. Écrivez-le en français si votre clientèle est québécoise, et listez-y explicitement les URL des deux versions plutôt que d'espérer un fichier par langue.",
    },
  ],

  example: {
    caption:
      "Un llms.txt écrit à la main pour un site WordPress bilingue d'ici. Court, factuel, et les deux langues nommées dans le même fichier puisqu'il n'y en aura qu'un.",
    language: "markdown",
    content: `# Clinique dentaire Exemple

> Clinique dentaire familiale à Québec, ouverte depuis 2011. Services offerts en français et en anglais.

Territoire desservi : Québec, Lévis, Sainte-Foy (Québec, Canada)
Les heures d'ouverture et le numéro d'urgence sont publiés sur la page Contact.

## Services

- Examen et nettoyage — 145 $ CA — https://exemple.com/fr/nettoyage
- Urgence dentaire — sans rendez-vous — https://exemple.com/fr/urgence
- Orthodontie — évaluation sur place — https://exemple.com/fr/orthodontie

## Pages clés

- [À propos et permis d'exercice](https://exemple.com/fr/a-propos)
- [Assurances acceptées](https://exemple.com/fr/assurances)
- [English version](https://exemple.com/en/)`,
  },

  gotchas: [
    {
      title: "Un site bilingue n'obtient quand même qu'un seul fichier",
      body:
        "Polylang et WPML ne changent rien ici. Le fichier généré par Yoast est déposé à la racine web et sert la même réponse à tout le monde ; la documentation de LLMs.txt Builder ne mentionne ni WPML ni Polylang. Attendre un /fr/llms.txt et un /en/llms.txt vous fera perdre du temps : décidez plutôt de la langue du fichier unique et nommez-y les deux versions.",
    },
    {
      title: "Yoast rafraîchit le fichier chaque semaine, pas à la publication",
      body:
        "Le llms.txt de Yoast est généré une fois puis mis à jour par une action planifiée hebdomadaire. C'est acceptable pour un site d'entreprise stable et trompeur si vous croyiez que « automatique » voulait dire « à la publication ». Sur un site à faible achalandage ou avec DISABLE_WP_CRON, la tâche planifiée peut d'ailleurs ne pas se déclencher au moment prévu.",
    },
    {
      title: "Yoast n'écrase pas un llms.txt déjà présent",
      body:
        "Si un fichier existe déjà à la racine web, Yoast le laisse tranquille. C'est le comportement prudent souhaitable, et il produit une situation déroutante : vous activez la fonctionnalité, le réglage indique qu'elle est active, et le contenu de /llms.txt ne bouge jamais. Vérifiez ce qui est réellement servi avant de conclure à un bogue. À l\'inverse, si une autre extension sert llms.txt dynamiquement, il n\'y a aucun fichier sur le disque à respecter : Yoast écrit le sien, et c\'est celui-là qui est affiché — sa spécification le dit explicitement. Le mécanisme vient du serveur web, pas de WordPress : un fichier présent à la racine documentaire est servi avant que la requête n\'atteigne PHP, donc la règle de réécriture de l\'autre extension ne s\'exécute jamais. Une configuration d\'hébergement qui force tout à passer par PHP inverserait ce comportement.",
    },
    {
      title: "Seuls les cinq éléments les plus récents par type de contenu sont retenus",
      body:
        "Yoast retient les cinq publications, pages ou entrées de type personnalisé les plus récemment mises à jour, ainsi que les cinq catégories ou étiquettes auxquelles le plus de contenu est rattaché. C'est une stratégie de sélection, pas un index. Votre meilleur guide, publié il y a deux ans, n'y sera pas — une bonne raison de le marquer comme contenu clé ou d'entretenir le fichier à la main.",
    },
    {
      title: "Un fichier physique échappe au cache de WordPress",
      body:
        "Comme Yoast et le dépôt manuel écrivent un vrai fichier, votre extension de cache WordPress n'a rien à purger : le serveur web le sert directement et le RDC devant votre site le met en cache selon ses propres règles. Vider le cache de WordPress après avoir modifié le fichier ne fait rien ; purgez au niveau du RDC.",
    },
    {
      title: "Les types de contenu personnalisés doivent être visibles dans les résultats de recherche",
      body:
        "Yoast ne considère un type de contenu personnalisé que si l'option d'affichage dans les résultats de recherche est cochée pour ce type, dans les réglages d'apparence de la recherche. Si un type qui vous tient à cœur manque au fichier, c'est le premier endroit à regarder.",
    },
  ],

  verificationMethod: [
    {
      title: "Confirmez le point d'accès et le type de contenu",
      body: "Vous voulez un HTTP 200 et un type de contenu texte brut. Un type text/html signifie généralement que WordPress route la requête vers une page ou un gabarit 404 au lieu de servir un fichier : la règle de réécriture n'est pas enregistrée, ou le fichier n'est pas là où vous le croyez.",
      code: {
        language: "bash",
        content: 'curl -sI https://votresite.com/llms.txt | grep -iE "^(HTTP|content-type)"',
      },
    },
    {
      title: "Déterminez si c'est un vrai fichier ou une route d'extension",
      body: "C'est l'information dont vous avez besoin avant de modifier quoi que ce soit, parce qu'elle vous dit quel système possède le fichier. Regardez la racine web par SFTP : si llms.txt s'y trouve, c'est un fichier physique, celui de Yoast ou votre dépôt. S'il n'y est pas alors que l'adresse répond, une extension le rend par réécriture et modifier des fichiers ne servira à rien.",
    },
    {
      title: "Vérifiez que le fichier reflète votre contenu actuel et la bonne langue",
      body: "Comparez les pages listées à ce que vous avez publié récemment, et vérifiez que les URL pointent vers le sous-dossier de langue attendu. Si le fichier nomme du contenu vieux de plusieurs mois, vous regardez soit le décalage du rafraîchissement hebdomadaire, soit un cache d'extension périmé, soit une tâche planifiée qui ne se déclenche pas.",
    },
  ],

  limitations: [
    "Un fichier généré par une extension reflète les règles de sélection de l'extension, pas votre jugement éditorial. Cinq billets récents sont rarement les vingt meilleures lignes que vous pourriez écrire sur votre entreprise.",
    "Un fichier déposé à la main n'a aucun mécanisme de mise à jour. Il est juste le jour où vous l'écrivez et dérive ensuite : c'est le prix du contrôle.",
    "Aucune des trois approches ne produit de version française et de version anglaise distinctes. Un site bilingue doit faire tenir les deux publics dans un seul fichier.",
    "Servir le fichier suppose un accès à la racine web ou une extension autorisée à écrire des règles de réécriture. Certains forfaits d'hébergement infogéré restreignent l'un ou l'autre, et un cache de périphérie agressif peut continuer à servir une copie périmée.",
    "llms.txt n'est qu'une proposition : aucun moteur n'est tenu de l'honorer. John Mueller, de Google, a publiquement mis en doute l'intérêt du format et noté que les modèles ne cherchent pas activement ces fichiers — à garder en tête avant de payer une extension sur la foi de promesses de classement.",
  ],

  verifiedDate: "2026-08-15",
  sources: [
    {
      label: "Portail développeur Yoast — spécification fonctionnelle de llms.txt",
      url: "https://developer.yoast.com/features/llms-txt/functional-specification/",
      kind: "primary",
    },
    {
      label: "Yoast — présentation de la fonctionnalité llms.txt",
      url: "https://yoast.com/features/llms-txt/",
      kind: "primary",
    },
    {
      label: "LLMs.txt Builder — répertoire des extensions WordPress.org",
      url: "https://wordpress.org/plugins/nt-llms-txt-builder/",
      kind: "primary",
    },
  ],

  relatedServices: [
    { label: "Refonte de site web", href: "/fr/refonte-site-web" },
    { label: "Référencement IA (AEO)", href: "/fr/referencement-ia" },
  ],
  relatedGuides: ["shopify", "nextjs"],
};
