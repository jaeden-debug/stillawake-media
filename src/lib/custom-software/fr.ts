import type { GuideContent } from "./types";

/**
 * Le guide français.
 *
 * ÉCRIT POUR LE QUÉBEC, PAS TRADUIT. Même règle que le noyau tarifaire et que
 * les autres guides du groupe : les exemples, le vocabulaire et les objections
 * sont ceux d'ici.
 *
 * CIBLAGE (Google Keyword Planner, Canada, français, historique de mots-clés
 * exacts, vérifié le 2026-08-15). Les termes de tête appartiennent déjà à
 * d'autres pages du site et cette page ne leur fait pas concurrence :
 * « logiciel sur mesure » (70/mois, concurrence moyenne) et « développement
 * logiciel sur mesure » (50/mois) sont à /fr/developpement-logiciel. Le reste
 * du groupe mesuré est mince — « application sur mesure », « logiciel de
 * gestion sur mesure », « erp sur mesure », « solution logicielle sur mesure »
 * à 10/mois chacun — et plusieurs formulations en question ne retournent
 * aucun volume publicitaire mesurable.
 *
 * C'est précisément pourquoi l'URL et le H1 portent la DÉCISION plutôt que le
 * produit : « logiciel sur mesure ou solution existante ». Une question sans
 * volume publicitaire mesurable est souvent une question conversationnelle,
 * donc une surface de citation pour les moteurs de réponse plutôt qu'une
 * surface de classement — d'où le bloc de réponse directe et la FAQ. La
 * seconde source de trafic est le calculateur, qui pointe ici depuis chaque
 * résultat qui aboutit du côté applicatif.
 */
export const FR: GuideContent = {
  locale: "fr",
  path: "/fr/logiciel-sur-mesure-ou-solution-existante",
  otherPath: "/do-i-need-custom-software",

  meta: {
    title: "Ai-je besoin d'un logiciel sur mesure? Le guide acheter ou bâtir",
    description:
      "La plupart des entreprises qui croient avoir besoin d'un logiciel sur mesure ont besoin d'acheter, de configurer ou de connecter quelque chose qui existe déjà. Un cadre en cinq voies — acheter, configurer, intégrer, étendre, bâtir — les signaux qui justifient vraiment un développement, et les coûts de possession que personne ne chiffre.",
    ogTitle: "Avez-vous vraiment besoin d'un logiciel sur mesure?",
    ogDescription:
      "Acheter, configurer, intégrer, étendre ou bâtir — dans cet ordre. Le test honnête, par un studio qui développe du sur-mesure.",
  },

  hero: {
    eyebrow: "Guide de décision",
    h1: "Avez-vous vraiment besoin d'un logiciel sur mesure?",
    standfirst:
      "Ce guide est écrit par un studio qui développe des logiciels sur mesure, et c'est exactement pourquoi il commence par les arguments contre. La plupart des besoins qui nous arrivent sous la forme « ça nous prend un système » sont comblés par quelque chose qui existe déjà — et ceux qui ne le sont vraiment pas méritent d'être faits comme il faut.",
    answer:
      "La plupart des entreprises n'ont pas besoin d'un logiciel sur mesure. Vous en avez besoin quand un processus qui vous fait gagner de l'argent ne peut être modélisé par aucun produit achetable — parce que le flux de travail est réellement le vôtre, parce que plusieurs systèmes doivent être orchestrés d'une façon qu'aucun d'eux ne supporte, ou parce que le logiciel est le produit que vous vendez. Tout le reste est mieux servi en achetant un produit éprouvé, en le configurant, en connectant quelques-uns ensemble, ou en en étendant un avec un peu de code sur mesure. Descendez la liste dans l'ordre : acheter, configurer, intégrer, étendre, bâtir. Le sur-mesure est la bonne réponse quand les quatre voies moins chères ont été écartées pour une raison précise et formulée — pas quand elles n'ont simplement pas été essayées.",
  },

  kinds: {
    title: "D'abord, les mots",
    intro:
      "Beaucoup d'argent se perd parce que deux personnes dans une même pièce emploient « un système » pour dire deux choses différentes. L'une décrit quelque chose qui pourrait rouler jeudi; l'autre décrit six mois de travail. Voici les catégories, et c'est dans les distinctions que se trouve le coût.",
    items: [
      {
        id: "website",
        name: "Un site web",
        oneLine: "Des pages qui expliquent ce que vous faites et permettent de vous joindre.",
        needItWhen: "Les gens doivent vous trouver, comprendre ce que vous vendez et vous contacter. C'est-à-dire presque toutes les entreprises.",
        notToBeConfusedWith: "Une application web. Un site présente de l'information; une application conserve des données qui appartiennent à quelqu'un.",
        provenProductsExist: true,
      },
      {
        id: "cms",
        name: "Un système de gestion de contenu",
        oneLine: "L'interface d'édition derrière un site, pour le modifier sans développeur.",
        needItWhen: "Le contenu va changer et vous voulez être celui qui le change.",
        notToBeConfusedWith: "Une base de données. Un CMS conserve des pages que vous publiez; une base de données conserve des enregistrements sur lesquels l'entreprise opère. Les sites ont bien plus souvent besoin du premier.",
        provenProductsExist: true,
      },
      {
        id: "ecommerce",
        name: "Une plateforme de commerce en ligne",
        oneLine: "Un catalogue, un panier, un paiement, et toute la mécanique de taxes, de livraison et de fraude derrière.",
        needItWhen: "Vous vendez des produits et voulez que l'argent, le stock, la TPS et la TVQ soient gérés par quelque chose qui a déjà réglé ça.",
        notToBeConfusedWith: "Du commerce sur mesure. Vouloir une vitrine inhabituelle est un problème de design; avoir besoin d'un modèle de commande qu'aucune plateforme ne supporte est un problème de logiciel — et seul le second coûte cher.",
        provenProductsExist: true,
      },
      {
        id: "crm",
        name: "Un CRM",
        oneLine: "Un registre des gens avec qui vous faites affaire et de chaque échange que vous avez eu.",
        needItWhen: "Les prospects ou les clients sont suivis dans une boîte de réception, un chiffrier, ou la mémoire de quelqu'un.",
        notToBeConfusedWith: "Une base de données sur mesure. Presque tous les besoins CRM d'une PME sont comblés par un produit à quelques dizaines de dollars par mois.",
        provenProductsExist: true,
      },
      {
        id: "erp",
        name: "Un ERP",
        oneLine: "Un seul système faisant rouler finances, inventaire, achats et opérations sur des données communes.",
        needItWhen: "Plusieurs services ont besoin des mêmes chiffres et ne s'entendent pas dessus en ce moment.",
        notToBeConfusedWith: "Quelque chose qu'une PME devrait bâtir. Les implantations d'ERP sont des projets de configuration, et celles qui échouent ont généralement échoué à l'étape des processus, pas du logiciel.",
        provenProductsExist: true,
      },
      {
        id: "saas",
        name: "Le SaaS",
        oneLine: "Un logiciel qu'on loue plutôt que de le posséder, hébergé chez quelqu'un d'autre.",
        needItWhen: "Un produit fait déjà la job. Ce qui, pour la plupart des fonctions d'entreprise, est le cas.",
        notToBeConfusedWith: "Bâtir votre propre SaaS. Utiliser du SaaS et vendre du SaaS sont aux deux extrémités opposées de ce guide.",
        provenProductsExist: true,
      },
      {
        id: "portal",
        name: "Un portail client",
        oneLine: "Un endroit où vos clients se connectent pour voir ce qui n'appartient qu'à eux.",
        needItWhen: "Vous envoyez des documents, des statuts ou des fichiers à des clients un par un, assez souvent pour que ce soit devenu une tâche.",
        notToBeConfusedWith: "Un site avec un mot de passe. Dès qu'il y a des données privées, la séparation entre les clients doit être appliquée dans la base de données, pas dans l'interface.",
        provenProductsExist: false,
      },
      {
        id: "dashboard",
        name: "Un tableau de bord interne",
        oneLine: "Des écrans où votre équipe travaille, bâtis autour de sa façon réelle de travailler.",
        needItWhen: "La journée de votre équipe se passe à naviguer entre des systèmes et à les réconcilier à la main.",
        notToBeConfusedWith: "Un outil de rapports. Si vous devez seulement VOIR les chiffres, un produit de rapports fait ça aujourd'hui pour presque rien.",
        provenProductsExist: false,
      },
      {
        id: "automation",
        name: "L'automatisation de processus",
        oneLine: "Un processus qui tourne entre des systèmes que vous avez déjà, à intervalle ou sur déclencheur.",
        needItWhen: "Une séquence répétitive se déroule pareillement chaque fois et c'est une personne qui la fait.",
        notToBeConfusedWith: "Une application. Une automatisation n'a pas d'interface et personne ne s'y connecte — c'est pourquoi elle coûte habituellement bien moins cher que ce que les gens imaginent.",
        provenProductsExist: true,
      },
      {
        id: "integration",
        name: "Une couche d'intégration",
        oneLine: "La plomberie qui garde deux systèmes ou plus d'accord entre eux.",
        needItWhen: "La même information est saisie à plus d'un endroit.",
        notToBeConfusedWith: "Remplacer les systèmes. Connecter ce que vous exploitez déjà coûte presque toujours moins cher que de migrer ailleurs.",
        provenProductsExist: true,
      },
      {
        id: "business-app",
        name: "Une application d'affaires sur mesure",
        oneLine: "Un logiciel bâti autour du processus d'une seule entreprise, parce que ce processus est réellement le sien.",
        needItWhen: "Votre façon de faire est une des raisons pour lesquelles les clients vous choisissent, et aucun produit ne la modélise.",
        notToBeConfusedWith: "L'impatience envers un produit qu'on n'a pas fini de configurer.",
        provenProductsExist: false,
      },
      {
        id: "product",
        name: "Le logiciel comme produit",
        oneLine: "Le logiciel est ce que vous vendez. N'importe qui peut s'inscrire, et ça doit tenir la route.",
        needItWhen: "Votre modèle d'affaires, c'est le logiciel lui-même.",
        notToBeConfusedWith: "Tout ce qui précède. C'est une autre entreprise, avec un autre profil de risque, et ça ne se termine pas au lancement.",
        provenProductsExist: false,
      },
    ],
  },

  routes: {
    title: "Acheter, configurer, intégrer, étendre, bâtir",
    intro:
      "Chaque besoin descend cette liste dans l'ordre. Non pas parce que le moins cher a toujours raison, mais parce que chaque échelon coûte plus d'argent, plus de temps et plus d'obligations permanentes que celui du dessus — alors descendre devrait exiger une raison qu'on peut dire à voix haute.",
    rule:
      "La règle : on ne descend d'un échelon qu'en nommant ce que l'échelon du dessus ne pouvait pas faire. « On a regardé et rien ne faisait » n'est pas une raison. « Les trois produits retenus supposent tous un prix par client, et nous facturons par emplacement » en est une.",
    items: [
      {
        id: "buy",
        name: "Acheter",
        meaning: "Un produit fait déjà ça. Vous le payez et vous commencez à l'utiliser.",
        chooseWhen: [
          "Le besoin est celui de milliers d'autres entreprises — paiements, rendez-vous, comptabilité, courriel, paie, billets de soutien, CRM.",
          "Être différent là-dessus n'est pas ce qui vous fait gagner. Personne n'a jamais choisi un fournisseur à cause de son logiciel de facturation.",
          "Vous préférez que la sécurité, la conformité et la disponibilité soient le travail à temps plein de quelqu'un d'autre.",
        ],
        cost: "Un abonnement, et vivre à l'intérieur des suppositions de quelqu'un d'autre sur la façon de faire le travail.",
        failureMode:
          "Acheter cinq produits qui se chevauchent, chacun réglant une tranche, puis payer une personne pour les réconcilier. Ce n'est pas un échec d'achat — c'est un problème d'intégration réglé par un humain.",
        example:
          "Une clinique qui veut la prise de rendez-vous en ligne. Les produits de réservation gèrent les disponibilités, les rappels, les absences, les fuseaux horaires et les annulations, et ont été déboguées par des dizaines de milliers de cliniques. Bâtir ça, c'est une année à découvrir quels étaient ces cas limites.",
      },
      {
        id: "configure",
        name: "Configurer",
        meaning: "Un produit fait ça, mais seulement une fois vraiment configuré autour de votre entreprise.",
        chooseWhen: [
          "Le produit a les concepts qu'il vous faut, mais les réglages par défaut décrivent une entreprise différente de la vôtre.",
          "L'écart, ce sont des champs, des étapes, des permissions, des gabarits, des règles et du vocabulaire — pas une capacité manquante.",
          "Personne de compétent n'y a encore consacré de vraies heures. La plupart des verdicts « ce produit ne peut pas » sont rendus depuis les réglages par défaut.",
        ],
        cost: "De vraies heures d'une personne qui comprend à la fois le produit et votre processus. C'est celle qu'on sous-estime systématiquement.",
        failureMode:
          "Déclarer un produit insuffisant après un essai gratuit, puis payer cinquante fois plus pour reconstruire ce qu'il faisait déjà. L'essai évaluait les réglages par défaut, pas le produit.",
        example:
          "Un CRM qui semble n'avoir aucune notion de votre processus de vente, jusqu'à ce qu'on y configure des étapes, des champs et des règles d'automatisation — quelques jours de travail contre plusieurs mois pour bâtir une solution de rechange.",
      },
      {
        id: "integrate",
        name: "Intégrer",
        meaning: "Plusieurs systèmes éprouvés font chacun leur part, et sont connectés pour que la donnée ne soit saisie qu'une fois.",
        chooseWhen: [
          "Chaque tâche prise isolément est déjà réglée par un produit que vous exploitez ou pourriez acheter.",
          "La vraie douleur, c'est la ressaisie, la réconciliation et le désaccord entre les systèmes.",
          "Les systèmes ont de vraies interfaces — la plupart des produits établis en ont.",
        ],
        cost: "Bâtir une fois, puis entretenir pour toujours : les interfaces changent, les identifiants expirent, et quelque chose doit remarquer quand une synchronisation échoue.",
        failureMode:
          "Une connexion que personne ne surveille. Une intégration qui échoue en silence est pire que pas d'intégration, parce que l'entreprise continue de se fier à des chiffres qui ont cessé d'être vrais il y a des semaines.",
        example:
          "Les commandes de la boutique qui créent des factures dans le système comptable et des contacts dans l'infolettre. Trois produits éprouvés, deux connexions, et personne qui retape quoi que ce soit.",
      },
      {
        id: "extend",
        name: "Étendre",
        meaning: "Garder la plateforme, et écrire un peu de code sur mesure pour la partie précise qu'elle ne fait pas.",
        chooseWhen: [
          "Un besoin sur vingt n'est vraiment pas supporté, et les dix-neuf autres sont bien couverts.",
          "La plateforme offre une façon prévue de l'étendre, plutôt qu'une façon de se battre avec elle.",
          "Vous voulez que le fournisseur continue de porter la sécurité, l'hébergement et les mises à niveau de tout le reste.",
        ],
        cost: "Un morceau de code que vous possédez à l'intérieur d'un produit que vous ne possédez pas, et qu'il faut retester quand la plateforme change.",
        failureMode:
          "Étendre au point d'avoir bâti une application dans le produit de quelqu'un d'autre, avec aucun du contrôle et tout l'entretien. Il existe un point où étendre cesse d'être moins cher que bâtir, et on le dépasse généralement sans s'en apercevoir.",
        example:
          "Une boutique qui a besoin d'une règle de prix inhabituelle. Le catalogue, le paiement, les taxes et l'expédition restent sur la plateforme; la règle de prix est un petit bout de code sur mesure.",
      },
      {
        id: "build",
        name: "Bâtir",
        meaning: "Un logiciel écrit pour votre entreprise, possédé par votre entreprise.",
        chooseWhen: [
          "Le flux de travail est réellement propriétaire et fait partie des raisons pour lesquelles les clients vous choisissent.",
          "Vous avez retenu de vrais produits et pouvez nommer précisément ce que chacun ne peut pas modéliser.",
          "Le coût manuel est mesurable et récurrent, et l'arithmétique tient encore après les coûts de possession ci-dessous.",
          "Le logiciel est lui-même le produit que vous vendez.",
        ],
        cost: "Tout ce qui figure dans la section sur la possession, en permanence, que quelqu'un y travaille activement ou non.",
        failureMode:
          "Reconstruire un produit qui existe déjà, avec moins de fonctions, aucune suite de tests, et une seule personne qui le comprend. C'est l'erreur coûteuse la plus fréquente du domaine.",
        example:
          "Un distributeur dont les prix dépendent de clauses contractuelles, d'un historique de volume et de l'économie des tournées, dans une combinaison qu'aucun ERP ne modélise — et où bien faire ça est précisément ce qui lui fait gagner des comptes.",
      },
    ],
  },

  when: {
    title: "Quand le sur-mesure se justifie vraiment",
    intro:
      "Voici les cas où bâtir est la bonne décision. Chacun vient avec un test, parce que chaque élément de cette liste est aussi quelque chose dont une entreprise peut se convaincre.",
    items: [
      {
        id: "proprietary-workflow",
        title: "Le flux de travail est réellement le vôtre",
        body: "Votre processus n'est pas une version moins bonne d'un processus standard — c'en est un autre, et il fait partie des raisons pour lesquelles les clients vous choisissent. Le faire entrer de force dans le modèle d'un produit signifierait faire un peu moins bien, pour toujours, ce qui vous rend concurrentiel.",
        test: "Pouvez-vous nommer un concurrent qui procède de la même façon? Si la réponse est « tous », c'est un processus standard et un produit existe.",
      },
      {
        id: "no-model-fits",
        title: "Aucun produit ne peut modéliser l'opération",
        body: "Vous avez cherché sérieusement, et chaque candidat casse sur la même supposition structurelle — un emplacement par compte, un prix par produit, un propriétaire par enregistrement — que votre entreprise viole réellement.",
        test: "Pouvez-vous énoncer la supposition de chaque produit retenu et pourquoi votre entreprise la brise? Sinon, l'évaluation n'a pas encore eu lieu.",
      },
      {
        id: "manual-cost",
        title: "Il y a du travail manuel mesurable et récurrent",
        body: "Un nombre précis d'heures va dans une tâche répétitive précise chaque semaine, et la tâche est assez déterministe pour être décrite exactement. C'est un problème d'arithmétique qui a une vraie réponse.",
        test: "Combien d'heures, à faire exactement quoi, et combien disparaîtraient réellement? Une économie qu'on ne peut pas compter est une économie qu'on n'a pas faite.",
      },
      {
        id: "orchestration",
        title: "Plusieurs systèmes demandent une vraie orchestration",
        body: "Pas deux systèmes à synchroniser — plusieurs systèmes, avec un séquencement, de la logique conditionnelle, des exceptions et un responsable quand une étape échoue. C'est un système en soi, et les outils de connexion cessent d'être honnêtes à cette complexité.",
        test: "Le processus a-t-il des embranchements et des états d'échec que vous pouvez dessiner? Les lignes droites, c'est de l'automatisation; les embranchements avec conséquences, c'est du logiciel.",
      },
      {
        id: "private-data",
        title: "Les clients ont besoin de leur espace privé",
        body: "Vos clients doivent se connecter et voir des dossiers qui n'appartiennent qu'à eux. Ce n'est pas une fonction de site web — c'est une garantie de séparation des données, et elle doit être appliquée dans la base de données plutôt que dans l'interface.",
        test: "Si les données de deux clients se mélangeaient, seriez-vous tenu de déclarer l'incident? Si oui, c'est un logiciel avec des obligations, pas une page avec un mot de passe.",
      },
      {
        id: "unusual-data",
        title: "Le modèle de données lui-même est inhabituel",
        body: "Ce que votre entreprise suit, et les relations entre ces choses, ne ressemblent pas à la forme clients-commandes-produits autour de laquelle les produits sont bâtis.",
        test: "Dessinez vos entités et leurs relations. Si ça ressemble à un schéma normal de commerce ou de CRM, achetez-en un.",
      },
      {
        id: "permissions",
        title: "Les permissions sont réellement compliquées",
        body: "Plusieurs types d'utilisateurs, voyant des choses différentes, avec des règles qui dépendent des relations plutôt que des titres. Les produits offrent généralement des rôles; certaines entreprises ont besoin de règles.",
        test: "Pouvez-vous exprimer les accès sous forme d'une courte liste de rôles? Si oui, les produits gèrent ça. Si ça dépend de qui possède quoi, peut-être pas.",
      },
      {
        id: "the-product",
        title: "Le logiciel est ce que vous vendez",
        body: "N'importe qui peut s'inscrire, les gens paient pour l'accès, et le logiciel est l'entreprise. Impossible d'acheter une sortie de secours ici.",
        test: "Vos clients vous paieraient-ils encore si le logiciel disparaissait? Si non, c'est le produit, et il mérite d'être bâti comme il faut.",
      },
    ],
  },

  whenNot: {
    title: "Quand ce n'est probablement pas nécessaire",
    intro:
      "Chacun de ces besoins nous a réellement été demandé, et chacun est mieux servi par quelque chose qui existe déjà. Nommer la solution de rechange est tout l'intérêt — une liste de choses à ne pas bâtir, sans la chose à acheter à la place, n'est utile à personne.",
    items: [
      {
        id: "ordinary-ecommerce",
        title: "La vente en ligne ordinaire",
        body: "Produits, variantes, stock, panier, TPS et TVQ, expédition, remboursements et fraude. Chacun de ces éléments est un problème résolu avec des cas limites brutaux, et ce sont ces cas limites que vous paieriez à redécouvrir.",
        buyInstead:
          "Une plateforme de commerce. Mettez la différence dans la vitrine, la photographie et les fiches produits, qui sont les parties qui influencent vraiment l'achat.",
      },
      {
        id: "ordinary-scheduling",
        title: "Les rendez-vous ordinaires",
        body: "Disponibilités, tampons, personnel, rappels, reports, annulations, fuseaux horaires et heure avancée. La prise de rendez-vous a l'air simple et ne l'est notoirement pas.",
        buyInstead:
          "Un produit de réservation établi, intégré au site et habillé à vos couleurs. N'en bâtissez un que lorsque la disponibilité dépend de règles — salles, équipement, personnel qualifié, séquences — qu'aucun produit ne supporte.",
      },
      {
        id: "marketing-site",
        title: "Un site vitrine",
        body: "Si le site explique ce que vous faites et génère des demandes, il n'a besoin ni de serveur applicatif, ni de base de données, ni de comptes. Les ajouter ajoute une surface de sécurité, des coûts d'hébergement et de l'entretien en échange de rien que le visiteur puisse voir.",
        buyInstead:
          "Un site bien fait sur une plateforme éprouvée, avec le formulaire livré dans une vraie boîte de réception. Mettez l'argent dans la rédaction et l'architecture de recherche.",
      },
      {
        id: "custom-cms",
        title: "Un système de gestion de contenu sur mesure",
        body: "Bâtir une interface d'édition, c'est bâtir les brouillons, les révisions, la gestion des médias, les permissions, les aperçus et la planification. C'est une catégorie de produits avec des décennies de travail dedans, et ce n'est presque jamais ce qui fait gagner de l'argent à une entreprise.",
        buyInstead:
          "L'éditeur de la plateforme, ou un CMS découplé établi quand le contenu est vraiment structuré. Des écrans d'administration sur mesure ont du sens pour vos données d'affaires — pas pour vos pages.",
      },
      {
        id: "basic-crm",
        title: "Un CRM de base",
        body: "Contacts, occasions, étapes, notes et rappels. C'est la catégorie la plus résolue du logiciel d'affaires, et les produits les moins chers y sont très bons.",
        buyInstead:
          "Un CRM établi, bien configuré — quelques jours de travail, pas quelques mois. À revoir seulement si votre processus de vente n'entre vraiment pas dans un entonnoir.",
      },
      {
        id: "payments",
        title: "Tout ce qui touche aux numéros de carte",
        body: "Manipuler les données de carte vous-même transforme un site en système porteur d'obligations réglementaires, d'exigences de vérification et d'un scénario de brèche réellement sérieux.",
        buyInstead:
          "Un paiement hébergé, pour que les données de carte n'atteignent jamais vos serveurs. Ce n'est pas un raccourci — c'est l'architecture correcte, et c'est ce que les plateformes elles-mêmes utilisent.",
      },
      {
        id: "reporting",
        title: "Des rapports sur des données que vous avez déjà",
        body: "Vouloir voir les chiffres n'est pas la même chose qu'avoir besoin d'une application. La plupart des besoins « ça nous prend un tableau de bord » sont une question de rapports déguisée en logiciel.",
        buyInstead:
          "Un outil de rapports ou d'intelligence d'affaires branché sur vos systèmes actuels. Ne bâtissez des écrans que lorsque les gens doivent AGIR dedans, pas seulement regarder.",
      },
      {
        id: "internal-comms",
        title: "Messagerie interne, fichiers ou documents",
        body: "Clavardage, disques partagés, wikis, signature électronique et suivi de projets sont des catégories banalisées où les produits sont excellents et où le coût de se tromper est un mois d'abonnement.",
        buyInstead: "Le produit établi que votre équipe va réellement ouvrir. L'adoption compte plus que l'adéquation ici.",
      },
    ],
  },

  cost: {
    title: "Ce que ça coûte à posséder, pas seulement à bâtir",
    intro:
      "La construction est la partie que tout le monde budgète, et c'est rarement celle qui fait mal. Un logiciel sur mesure est une obligation permanente : dès qu'il existe, il faut le garder vivant, le garder sécuritaire et le garder juste — que quelqu'un y travaille activement ou non.",
    note:
      "Aucun montant n'apparaît dans cette section, délibérément. N'importe quel chiffre inventé pour « l'entretien annuel » serait une supposition déguisée en recherche, et les écarts dépassent l'ordre de grandeur selon ce qui a été bâti. Ce qui compte, c'est que chaque ligne ci-dessous existe, que la plupart reviennent chaque année, et qu'une soumission qui ne mentionne que les quatre premières est incomplète plutôt que concurrentielle.",
    comparison:
      "Comparez honnêtement avec la solution de rechange. Un abonnement paraît cher à côté d'un prix de construction unique et revient habituellement moins cher sur cinq ans, parce que les frais du fournisseur sont répartis sur tous ses clients — vous achetez une fraction d'une équipe de sécurité, une fraction d'un budget de disponibilité et une fraction d'une feuille de route. Le sur-mesure gagne quand ce que vous obtenez n'est vendu par personne, pas quand les frais mensuels sont agaçants.",
    items: [
      { id: "discovery", name: "Cadrage et spécifications", timing: "build", body: "Établir précisément ce que ça doit faire avant de bâtir quoi que ce soit. Sauter cette étape n'économise pas le coût — ça le déplace dans la construction, où changer d'idée coûte bien plus cher." },
      { id: "design", name: "Design", timing: "build", body: "Pas de la décoration. La disposition des écrans décide si votre équipe est plus rapide ou plus lente que le chiffrier que vous remplacez." },
      { id: "development", name: "Développement", timing: "build", body: "La partie que tout le monde veut dire par « ça va coûter combien ». Généralement bien moins de la moitié du montant sur cinq ans." },
      { id: "qa", name: "Tests", timing: "build", body: "Les tests automatisés sont ce qui rend un système modifiable plus tard. Un logiciel sans tests devient plus cher à modifier chaque année, jusqu'à ce qu'il soit moins cher de le remplacer." },
      { id: "data", name: "Migration des données", timing: "build", body: "Amener ce que vous avez déjà dans le nouveau système, dans un état qui vaut la peine d'être conservé. Les vraies données sont toujours plus salissantes que prévu." },
      { id: "training", name: "Formation et déploiement", timing: "build", body: "Un logiciel que votre équipe contourne est un coût, pas un actif. C'est au déploiement que ça se décide." },
      { id: "hosting", name: "Hébergement et infrastructure", timing: "ongoing", body: "Serveurs, bases de données, stockage, bande passante. Modeste pour la plupart des applications d'affaires, et ça ne s'arrête jamais." },
      { id: "security", name: "Sécurité", timing: "ongoing", body: "Mises à jour de dépendances, correctifs, révision des accès, et un plan pour le jour où quelque chose est découvert. Un fournisseur fait ça pour tous ses clients à la fois; posséder un logiciel, c'est posséder ça." },
      { id: "monitoring", name: "Surveillance et alertes", timing: "ongoing", body: "Savoir que c'est brisé avant que vos clients vous l'apprennent. Un logiciel non surveillé échoue en silence, et c'est la sorte d'échec qui coûte cher." },
      { id: "backups", name: "Sauvegardes et restauration", timing: "ongoing", body: "Des sauvegardes que personne n'a jamais restaurées ne sont pas des sauvegardes. C'est la restauration qu'on paie." },
      { id: "maintenance", name: "Entretien", timing: "ongoing", body: "Les plateformes, les langages et les bibliothèques bougent sous vos pieds. Un logiciel laissé seul deux ans n'est pas stable, il accumule une facture." },
      { id: "integrations", name: "Entretien des intégrations", timing: "ongoing", body: "Chaque système auquel vous vous connectez changera son interface un jour, selon son calendrier et non le vôtre." },
      { id: "support", name: "Soutien", timing: "ongoing", body: "Quelqu'un à qui votre équipe peut demander, et quelqu'un qui répond quand ça brise à une heure inopportune." },
      { id: "evolution", name: "Changements", timing: "ongoing", body: "Votre entreprise va changer, et un logiciel incapable de suivre devient la contrainte qu'il devait éliminer." },
    ],
  },

  decide: {
    title: "Comment décider, dans l'ordre",
    intro:
      "Faites passer chaque besoin dans cette séquence séparément. La plupart des projets sont un mélange — acheter la prise de rendez-vous, configurer le CRM, intégrer la comptabilité, bâtir la seule chose qui est vraiment la vôtre — et traiter le projet entier comme une seule décision acheter-ou-bâtir est exactement comment on finit par bâtir des morceaux qu'on aurait pu acheter.",
    steps: [
      { label: "Écrivez le processus", body: "Exactement comme il se déroule aujourd'hui, exceptions comprises, y compris les bouts que quelqu'un gère parce qu'il sait. Si ça ne peut pas s'écrire, ça ne peut pas se bâtir — et cette seule étape révèle souvent que le problème est un problème de processus." },
      { label: "Séparez les besoins", body: "Découpez en tâches individuelles. Rendez-vous, facturation, dossiers, rapports, notifications. Chacune s'évalue toute seule." },
      { label: "Retenez de vrais produits pour chacune", body: "Nommez-en trois. Si vous n'arrivez pas à en trouver trois pour un besoin, c'est une vraie preuve — et c'est la première vraie preuve que vous aurez recueillie." },
      { label: "Testez-les comme il faut", body: "Configurés, avec vos données, par quelqu'un qui a lu la documentation. Un essai par défaut évalue les réglages par défaut." },
      { label: "Nommez ce qui casse", body: "Pour chaque produit, la supposition précise qui ne tient pas. Cette phrase est toute la justification de ce qui suit, et si vous ne pouvez pas l'écrire, vous n'êtes pas prêt à bâtir." },
      { label: "Vérifiez si les connecter comble l'écart", body: "Souvent les produits sont bons individuellement et la douleur est qu'ils ne se parlent pas. C'est un projet d'intégration, à une fraction du coût." },
      { label: "Vérifiez si en étendre un comble l'écart", body: "Un morceau sur mesure dans une plateforme qui continue de porter tout le reste est souvent le meilleur rapport qualité-prix disponible." },
      { label: "Faites l'arithmétique de possession", body: "Coût de construction plus cinq ans des lignes récurrentes ci-dessus, contre les abonnements plus les heures manuelles que vous continueriez de payer. Ensuite, décidez." },
      { label: "Bâtissez la plus petite chose qui le prouve", body: "Si vous bâtissez, bâtissez d'abord le flux de travail qui porte la valeur. Une première version en production vaut mieux qu'une spécification de tout." },
    ],
  },

  faq: [
    [
      "Mon entreprise a-t-elle besoin d'un logiciel sur mesure?",
      "Probablement pas, et le test est précis : le sur-mesure se justifie quand un processus qui vous fait gagner de l'argent ne peut être modélisé par aucun produit achetable, quand plusieurs systèmes exigent une orchestration qu'aucun ne supporte, quand des clients ont besoin d'espaces privés, ou quand le logiciel est lui-même ce que vous vendez. Descendez acheter → configurer → intégrer → étendre → bâtir dans cet ordre, et ne descendez d'un échelon qu'en nommant ce que celui du dessus ne pouvait pas faire.",
    ],
    [
      "Logiciel sur mesure ou SaaS — lequel est mieux?",
      "Ce ne sont pas des concurrents, ce sont deux réponses à deux questions différentes. Le SaaS a raison chaque fois que des milliers d'entreprises partagent votre besoin, parce que le fournisseur répartit le coût de la sécurité, de la disponibilité et du développement sur toutes. Le sur-mesure a raison quand le besoin est réellement le vôtre. La plupart des entreprises devraient rouler surtout en SaaS, avec un peu de sur-mesure là où elles sont vraiment différentes.",
    ],
    [
      "Comment savoir si un produit existant peut vraiment faire ce qu'il me faut?",
      "Retenez-en trois, configurez-les avec vos propres données, et essayez d'écrire une phrase par produit nommant la supposition structurelle précise qui ne tient pas — un emplacement par compte, un prix par produit, un propriétaire par dossier. Si vous n'arrivez pas à écrire cette phrase, le produit n'a pas encore été évalué; un essai gratuit teste les réglages par défaut, pas le produit.",
    ],
    [
      "Combien coûte l'entretien d'un logiciel sur mesure?",
      "La réponse honnête, c'est que ça varie de plus d'un ordre de grandeur, alors tout chiffre unique serait inventé. Ce qui est fiable, c'est la liste : hébergement, correctifs de sécurité, surveillance, sauvegardes et tests de restauration, mises à niveau des dépendances et des plateformes, entretien des intégrations, soutien, et changements au fil de l'entreprise. Ça revient que quelqu'un y travaille ou non, et une soumission qui ne mentionne que le cadrage, le design, le développement et les tests est incomplète.",
    ],
    [
      "Un logiciel sur mesure coûte-t-il moins cher que des abonnements?",
      "Habituellement non, et la comparaison est souvent mal faite. Un abonnement achète une fraction d'une équipe de sécurité, d'un budget de disponibilité et d'une feuille de route, partagée entre tous les clients du fournisseur. Le sur-mesure gagne quand ce que vous obtenez n'est vendu par personne — pas quand les frais mensuels paraissent irritants à côté d'un prix de construction unique.",
    ],
    [
      "Puis-je commencer avec une plateforme existante et bâtir plus tard?",
      "Habituellement oui, et c'est souvent la meilleure séquence possible. Achetez ou configurez quelque chose maintenant, faites rouler l'entreprise dessus, et laissez la friction vous dire précisément où le morceau sur mesure doit aller. Des besoins découverts en opérant valent bien plus que des besoins imaginés en réunion de planification — et il se peut que la friction n'arrive jamais.",
    ],
    [
      "Quelle est la différence entre un portail client et un site avec une connexion?",
      "L'obligation. Un site avec un mot de passe cache des pages; un portail conserve des dossiers appartenant à des personnes précises, et la séparation entre elles doit être appliquée dans la base de données plutôt que dans l'interface. Dès qu'il y a des données clients privées, vous exploitez un logiciel avec des responsabilités de sécurité, de sauvegarde et de divulgation — c'est un autre projet, et il est chiffré comme tel.",
    ],
  ],

  cta: {
    title: "Passez vos propres besoins dans la machine",
    body: "Le calculateur de projet applique la même logique que ce guide. Décrivez ce qui doit se passer et il retourne la configuration la plus simple qui le fait — y compris, quand ça s'applique, ce dont vous n'avez pas besoin.",
    calculator: { label: "Essayer le calculateur de projet", href: "/fr/outils/calculateur-cout-projet" },
  },

  related: {
    title: "Le reste de la décision",
    links: [
      { label: "Quel type de site web pour votre entreprise?", href: "/fr/guide-site-web-entreprise" },
      { label: "Propriété d'un site web et des comptes", href: "/fr/propriete-site-web" },
      { label: "Développement logiciel sur mesure", href: "/fr/developpement-logiciel" },
      { label: "Automatisation et IA", href: "/fr/automatisation-ia" },
      { label: "Prix d'un site web au Québec", href: "/fr/prix-site-web-quebec" },
      { label: "Tarifs publiés", href: "/fr/tarifs" },
    ],
  },
};
