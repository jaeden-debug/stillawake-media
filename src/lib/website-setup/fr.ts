import type { GuideContent } from "./types";

/**
 * Le guide français.
 *
 * Écrit pour le Québec, pas traduit de l'anglais. Deux différences de fond,
 * pas de ton : le vocabulaire réel du marché (« site vitrine », « site
 * transactionnel », « portail client » — ce sont les mots que les gens
 * cherchent) et les obligations légales qui changent véritablement la
 * décision ici. La Loi 96 fait du français une exigence, pas une option de
 * traduction ; la Loi 25 transforme tout compte client en responsabilité
 * documentée. Ces deux réalités déplacent des cases dans le questionnaire,
 * elles ne se contentent pas de colorer les paragraphes.
 *
 * Les identifiants sont identiques à ceux de la version anglaise : le moteur,
 * les tests et le sélecteur se comportent pareil dans les deux langues.
 */
export const FR: GuideContent = {
  locale: "fr",
  path: "/fr/guide-site-web-entreprise",
  otherPath: "/website-setup-guide",

  meta: {
    title: "Quel type de site web pour votre entreprise ?",
    description:
      "Guide de planification pour les entreprises du Québec : les questions qui déterminent ce que votre site doit contenir, les neuf types de sites web, quand un CMS est justifié, et ce que chaque fonctionnalité coûte pour de bon. La technologie vient en dernier.",
    ogTitle: "Quel type de site web votre entreprise a-t-elle vraiment besoin ?",
    ogDescription:
      "Neuf types de sites web, les questions qui tranchent entre eux, et le vrai coût de chaque fonctionnalité ajoutée. Les besoins d'abord, la technologie ensuite.",
  },

  hero: {
    eyebrow: "Guide de planification",
    h1: "Quel type de site web votre entreprise a-t-elle vraiment besoin ?",
    standfirst:
      "La plupart des projets web commencent par une plateforme et reculent ensuite vers les besoins. C'est l'ordre inverse du bon, et c'est pourquoi tant d'entreprises paient l'entretien de fonctions qu'elles n'utilisent jamais. Ce guide commence là où la décision se prend réellement : ce qui doit arriver, pour qui, et à quelle fréquence.",
    answer:
      "Votre site doit avoir la forme qui permet à ce dont votre entreprise a besoin d'arriver — et rien de plus. Pour la majorité des entreprises, c'est un site de génération de clients : des pages qui expliquent l'offre, des formulaires qui se rendent réellement à une personne, et une mesure qui montre quelles pages produisent des demandes. Une boutique transactionnelle, un moteur de réservation, des comptes clients, un portail ou une application ne se justifient que lorsqu'un vrai processus d'affaires ne peut pas fonctionner sans. Tout le reste ajoute un coût permanent : sécurité, tests, hébergement, mises à jour, formation, entretien. Une fonctionnalité doit exister parce qu'elle crée de la valeur, pas parce qu'elle est réalisable.",
  },

  flow: {
    title: "Les besoins avant la technologie",
    intro:
      "Cette décision a une séquence, et chaque étage découle du précédent. Choisir WordPress, Shopify, Framer, Next.js ou Supabase avant d'avoir descendu cette liste inverse le processus : on s'engage d'abord dans une série de contraintes, puis on découvre ce dont l'entreprise avait besoin.",
    steps: [
      {
        label: "Objectif d'affaires",
        body: "Le résultat commercial, chiffré si vous l'avez. Plus de demandes qualifiées. Moins d'appels sur les disponibilités. Des commandes qui n'exigent personne pour être traitées.",
      },
      {
        label: "Action du visiteur",
        body: "La seule chose qu'un visiteur doit faire pour que ce résultat se produise. Envoyer une demande. Passer une commande. Réserver une plage horaire. Se connecter et télécharger un document.",
      },
      {
        label: "Fonctionnalités",
        body: "Ce qui doit exister pour rendre cette action possible. Un formulaire qui valide et qui se rend. Un panier qui survit à un rechargement. Un calendrier qui ne peut pas doubler une réservation.",
      },
      {
        label: "Contenu",
        body: "Ce qui doit se trouver sur la page pour qu'on passe à l'action, en quelle quantité, et à quelle fréquence ça change. C'est ici que la question du CMS se tranche — pas plus tard.",
      },
      {
        label: "Intégrations",
        body: "Où les données doivent aller ensuite. Un CRM, la comptabilité, l'inventaire, un logiciel de réservation, une plateforme de courriels. Tout ce que l'entreprise utilise déjà et ne laissera pas tomber.",
      },
      {
        label: "Administration",
        body: "Qui modifie quoi, qui approuve, et ce que personne ne doit pouvoir briser. Aussi : qui répond quand ça casse un vendredi à 19 h.",
      },
      {
        label: "Sécurité et données",
        body: "Quelles données personnelles ou de paiement sont recueillies, où elles résident, qui peut y accéder. Au Québec, ce n'est pas une réflexion technique : la Loi 25 en fait une obligation documentée dès le premier compte client.",
      },
      {
        label: "Croissance",
        body: "Ce qui cède à dix fois le trafic, dix fois le catalogue ou dix fois les utilisateurs — et si c'est une année réaliste ou un trimestre imaginaire.",
      },
      {
        label: "Technologie",
        body: "Seulement maintenant. La pile technologique découle des huit réponses précédentes ; si deux plateformes y répondent également, le choix entre elles n'est pas la décision importante.",
      },
    ],
    warning:
      "Si quelqu'un vous propose une plateforme avant de vous avoir posé au moins les cinq premières questions, il vend ce qu'il construit déjà. Ça peut rester la bonne réponse — ce n'est simplement pas encore un argument.",
    handoff: {
      label: "Une fois les huit réponses en main, choisissez la technologie",
      href: "/fr/choisir-technologie-site-web",
    },
  },

  finder: {
    title: "Commencez par l'entreprise, pas par le logiciel",
    intro:
      "Cochez tout ce qui est vrai pour votre entreprise. Rien n'est enregistré, rien n'est envoyé, et le résultat se met à jour au fur et à mesure. L'important n'est pas la recommandation finale : c'est que chaque énoncé change le projet d'une façon précise, et que vous voyiez lesquels vous êtes en train de choisir.",
    groups: [
      {
        id: "outcome",
        name: "À quoi sert le site",
        intro:
          "La première question n'est pas ce que le site devrait contenir. C'est ce qui devrait être différent dans l'entreprise parce que le site existe.",
      },
      {
        id: "selling",
        name: "Argent et transactions",
        intro:
          "Dès qu'on encaisse, qu'on suit un inventaire ou qu'on réserve du temps, le site devient un système opérationnel. C'est une autre catégorie d'objet à posséder — et généralement le moment où intégrer un logiciel éprouvé bat le fait d'en construire un.",
      },
      {
        id: "people",
        name: "Comptes et accès",
        intro:
          "Dès qu'une personne se connecte, vous possédez l'identité, les permissions, la réinitialisation de mots de passe, la sécurité des sessions — et les renseignements personnels de quelqu'un d'autre. C'est le plus grand saut de coût et d'obligation de cette page.",
      },
      {
        id: "content",
        name: "Contenu et mise à jour",
        intro:
          "La fréquence des changements et l'identité de la personne qui les fait déterminent s'il vous faut un CMS, et lequel. C'est une question de processus, pas de préférence logicielle.",
      },
      {
        id: "systems",
        name: "Le reste de vos logiciels",
        intro:
          "Un site qui ne se connecte pas à la façon dont l'entreprise fonctionne déjà crée du travail au lieu d'en enlever. Les intégrations sont aussi là où la majorité des projets perdent leur échéancier.",
      },
      {
        id: "scale",
        name: "Croissance et entretien",
        intro:
          "Deux questions qui annulent discrètement les autres : qu'arrive-t-il si ça fonctionne, et qui l'entretient quand ça fonctionne.",
      },
    ],
    questions: [
      {
        id: "credibility",
        group: "outcome",
        ask: "Les gens nous vérifient en ligne avant de nous faire confiance.",
        decides:
          "Que le rôle du site est la preuve, pas la persuasion : des services clairs, du vrai travail, de vraies personnes, et des coordonnées faciles à trouver. Quelques pages bien faites suffisent.",
        implies: ["brochure"],
        weight: 0,
      },
      {
        id: "leads",
        group: "outcome",
        ask: "Son rôle principal est de transformer des inconnus en demandes.",
        decides:
          "Que la conversion devient une exigence mesurable et non un espoir : des formulaires qui se rendent vraiment, une page par service, et une mesure qui attribue les demandes aux pages.",
        implies: ["lead-gen"],
        weight: 1,
      },
      {
        id: "organic",
        group: "outcome",
        ask: "Les gens doivent nous trouver par la recherche, pas par référence.",
        decides:
          "Qu'il faut une architecture de contenu plutôt qu'un nombre de pages : une page par intention réelle, un maillage interne qui les relie, des données structurées, et un endroit pour publier sans passer par un développeur.",
        implies: ["content", "lead-gen"],
        weight: 2,
        cms: "structured",
      },
      {
        id: "products",
        group: "selling",
        ask: "Nous vendons des produits, et les clients les achètent sur le site.",
        decides:
          "Un catalogue, des variantes, les taxes (TPS/TVQ selon la province de livraison), les règles d'expédition, la caisse, les remboursements et des commandes sur lesquelles la comptabilité peut s'appuyer. C'est la plus grosse expansion de portée de cette page.",
        implies: ["ecommerce"],
        weight: 3,
      },
      {
        id: "inventory",
        group: "selling",
        ask: "Les niveaux d'inventaire doivent être suivis et respectés.",
        decides:
          "Que le site n'est plus la source de vérité. L'inventaire vit ailleurs — un point de vente, un entrepôt, un fichier — et le site doit s'accorder avec lui en continu, sinon il vendra ce que vous n'avez pas.",
        implies: ["ecommerce"],
        weight: 3,
      },
      {
        id: "bookings",
        group: "selling",
        ask: "Les gens réservent du temps, des tables, des chambres ou des rendez-vous.",
        decides:
          "Des règles de disponibilité, une capacité, des annulations, des rappels, des fuseaux horaires. Il est presque toujours moins cher et plus sûr d'intégrer un logiciel de réservation éprouvé que de bâtir un calendrier qui ne doit jamais doubler.",
        implies: ["booking"],
        weight: 2,
      },
      {
        id: "payments",
        group: "selling",
        ask: "De l'argent doit changer de mains sur le site.",
        decides:
          "Un processeur de paiement, des reçus, la gestion des échecs, les remboursements et une surface de conformité. Les données de carte ne doivent jamais toucher vos systèmes — c'est une question réglée, et la réponse est un processeur hébergé.",
        implies: ["ecommerce", "booking", "membership"],
        weight: 2,
        duty: "Les paiements amènent des obligations PCI et une surface de sécurité permanente. Un processeur hébergé garde les données de carte hors de vos serveurs.",
      },
      {
        id: "subscriptions",
        group: "selling",
        ask: "Des gens nous paient de façon récurrente pour un accès continu.",
        decides:
          "Des cycles de facturation, des changements de forfait, la relance d'échecs, l'expiration et le retrait d'accès. La logique de facturation est habituellement plus difficile que le contenu qu'elle protège.",
        implies: ["membership"],
        weight: 3,
      },
      {
        id: "accounts",
        group: "people",
        ask: "Les visiteurs doivent se connecter à leur propre compte.",
        decides:
          "L'identité, les sessions, les mots de passe oubliés, les permissions, la récupération de compte — et un devoir permanent envers ce que ces comptes contiennent. Si rien derrière la connexion n'est réellement privé, les comptes ne sont peut-être pas nécessaires.",
        implies: ["membership", "portal", "saas"],
        weight: 3,
        duty: "Loi 25 : dès qu'il y a des comptes, vous détenez des renseignements personnels. Ça implique un responsable de la protection des renseignements personnels, une politique publiée et l'obligation de déclarer un incident de confidentialité.",
      },
      {
        id: "client-area",
        group: "people",
        ask: "Les clients ont besoin d'un espace privé pour leurs documents ou leur suivi.",
        decides:
          "Un portail client : une isolation stricte des données par client, une piste de vérification, et des permissions assez serrées pour qu'un client ne voie jamais le dossier d'un autre. L'isolation est l'exigence ; le reste est de la décoration.",
        implies: ["portal"],
        weight: 3,
        duty: "Un client qui voit les données d'un autre est un incident de confidentialité déclarable. L'isolation se conçoit, elle ne se présume pas.",
      },
      {
        id: "staff",
        group: "people",
        ask: "Notre propre personnel s'en servira pour travailler.",
        decides:
          "Un outil interne, qui est un produit différent d'un site vitrine : il se juge à la vitesse d'utilisation et à l'exactitude, pas à l'impression visuelle, et il ne devrait généralement pas vivre sur le site public.",
        implies: ["internal"],
        weight: 3,
      },
      {
        id: "software",
        group: "people",
        ask: "Ce que nous vendons, c'est le logiciel lui-même.",
        decides:
          "Que vous bâtissez un produit avec un site marketing à côté, pas un site avec des fonctions. Les deux exigent des budgets, des cadences de livraison et souvent des bases de code différentes.",
        implies: ["saas"],
        weight: 3,
      },
      {
        id: "frequent",
        group: "content",
        ask: "Le contenu change chaque semaine ou plus souvent.",
        decides:
          "Que les modifications ne peuvent pas passer par un développeur. À ce rythme, le goulot d'étranglement est le processus, pas la technologie.",
        implies: ["content"],
        weight: 1,
        cms: "light",
      },
      {
        id: "who-edits",
        group: "content",
        ask: "Une personne non technique doit changer les textes et les images elle-même.",
        decides:
          "Un CMS avec une interface réellement utilisable — et une décision sur ce qu'elle a le droit de changer, ce qui compte plus que le choix du CMS.",
        implies: ["content"],
        weight: 1,
        cms: "light",
      },
      {
        id: "approvals",
        group: "content",
        ask: "Les changements doivent être révisés ou approuvés avant publication.",
        decides:
          "Des brouillons, une publication planifiée et des rôles. Un flux d'approbation élimine les options les plus simples — c'est une des rares vraies raisons d'accepter un CMS plus lourd.",
        implies: ["content"],
        weight: 2,
        cms: "structured",
      },
      {
        id: "languages",
        group: "content",
        ask: "Le site doit exister en français et en anglais.",
        decides:
          "Environ le double de l'opération de contenu, plus les balises canoniques et hreflang, plus une règle pour le jour où une langue prend du retard. Au Québec, ce n'est pas facultatif : le français doit être présent et de qualité au moins équivalente à toute autre langue, et une page traduite à la machine puis abandonnée est pire que pas de page.",
        implies: ["content"],
        weight: 2,
        cms: "structured",
        duty: "Loi 96 : le contenu commercial destiné au Québec doit être disponible en français, dans une version au moins équivalente aux autres langues offertes.",
      },
      {
        id: "locations",
        group: "content",
        ask: "Nous desservons plusieurs villes, régions ou succursales.",
        decides:
          "Une page par emplacement avec du contenu réellement différent, et des fiches d'entreprise cohérentes. Dupliquer une page en changeant le nom de la ville est la façon la plus courante de ne se classer nulle part.",
        implies: ["content", "lead-gen"],
        weight: 1,
        cms: "structured",
      },
      {
        id: "structured",
        group: "content",
        ask: "Nous publions des éléments répétitifs — services, équipe, produits, FAQ, réalisations.",
        decides:
          "Du contenu structuré : des fiches avec des champs et des relations, plutôt que des pages contenant du texte. C'est ce qui permet d'agrandir le site plus tard sans le refaire.",
        implies: ["content"],
        weight: 1,
        cms: "structured",
      },
      {
        id: "crm",
        group: "systems",
        ask: "Les demandes doivent aboutir dans un CRM, pas seulement dans une boîte courriel.",
        decides:
          "Un chemin de livraison avec des reprises et une trace, parce qu'un formulaire qui échoue en silence est pire que pas de formulaire. C'est aussi là que la source des demandes devient mesurable.",
        implies: ["lead-gen"],
        weight: 1,
      },
      {
        id: "integrations",
        group: "systems",
        ask: "Le site doit échanger des données avec des logiciels que nous utilisons déjà.",
        decides:
          "La première source de risque d'échéancier, parce que les limites de l'autre système se découvrent au lieu de se concevoir. L'existence d'une API — et ce qu'elle permet vraiment — devrait être vérifiée avant tout chiffrage.",
        implies: ["portal", "internal"],
        weight: 2,
      },
      {
        id: "automation",
        group: "systems",
        ask: "Des choses devraient se déclencher automatiquement après un envoi ou un achat.",
        decides:
          "Des automatisations avec reprises, alertes d'échec et journal. Une automatisation qui échoue en silence coûte plus cher que l'étape manuelle qu'elle remplaçait.",
        implies: ["internal", "lead-gen"],
        weight: 2,
      },
      {
        id: "reporting",
        group: "systems",
        ask: "Quelqu'un a besoin d'un tableau de bord ou d'un rapport récurrent.",
        decides:
          "Quelle décision le rapport sert. La plupart des demandes de rapports sont comblées par des outils de mesure déjà en place ; un tableau de bord sur mesure se justifie quand il réunit des données de systèmes qui ne se parlent pas.",
        implies: ["internal"],
        weight: 2,
      },
      {
        id: "traffic",
        group: "scale",
        ask: "Le trafic pourrait réalistement décupler en un an.",
        decides:
          "Moins de conséquences qu'on pense pour un site de contenu : des pages statiques derrière un CDN absorbent ça sans drame. Beaucoup plus pour tout ce qui a des connexions, des paniers ou des requêtes en direct, où c'est la base de données qui cède en premier.",
        implies: ["content"],
        weight: 1,
      },
      {
        id: "neglect",
        group: "scale",
        ask: "Personne ici ne l'entretiendra. Il doit survivre à l'abandon.",
        decides:
          "Un plafond de complexité. C'est une contrainte, pas une fonctionnalité : ça n'ajoute pas de travail, ça limite ce que le résultat a le droit d'exiger de vous.",
        implies: ["brochure"],
        weight: 0,
        constraint: true,
      },
    ],
  },

  types: {
    title: "Les neuf types",
    intro:
      "Presque tous les sites d'entreprise sont l'un de ceux-ci, ou une combinaison assumée de deux. Ils sont décrits par ce qu'ils exigent plutôt que par ce qui les propulse, parce que ce sont les exigences que vous vous engagez à porter.",
    items: [
      {
        id: "brochure",
        name: "Site vitrine",
        job: "Prouver que l'entreprise est réelle, compétente et joignable.",
        sufficientWhen:
          "Le travail arrive par référence, par téléphone ou en personne, et le site sert à confirmer que vous existez et que ça vaut la peine d'appeler. C'est une réponse légitime, pas une version d'entrée de gamme — un site de cinq pages rapide et bien écrit bat un site de vingt pages négligé, à tout coup.",
        requires: [
          "Des services clairs, de vraies preuves de travail, de vraies coordonnées",
          "Un chargement rapide et une mise en page qui tient sur un téléphone",
          "Des informations d'entreprise exactes partout où elles apparaissent en ligne",
        ],
        mistake:
          "Ajouter un blogue que personne n'écrira, une boutique sans produits et un module de réservation pour une entreprise qui réserve par texto — puis payer l'entretien des trois.",
        links: [
          { label: "Site sur mesure ou gabarit ?", href: "/fr/articles/site-sur-mesure-ou-template" },
          { label: "Déroulement d'un projet web", href: "/fr/articles/deroulement-projet-web-delais" },
        ],
      },
      {
        id: "lead-gen",
        name: "Site de génération de clients",
        job: "Transformer le trafic en demandes qu'on peut attribuer et mesurer.",
        sufficientWhen:
          "La vente se conclut dans une conversation, pas dans une caisse — services professionnels, métiers, cabinets, consultants, B2B. C'est ce dont la majorité des entreprises ont réellement besoin, et là où un budget web rapporte le plus.",
        requires: [
          "Une page par service, écrite pour être trouvée et pour répondre aux objections",
          "Des formulaires qui valident, se rendent à une personne et résistent aux pourriels",
          "Une mesure qui attribue les demandes aux pages",
          "Un endroit où la demande atterrit et fait l'objet d'un suivi",
        ],
        mistake:
          "Mesurer le trafic au lieu des demandes. Une page qui se classe et ne convertit personne est un centre de coûts avec une belle posture.",
        links: [
          { label: "Pourquoi votre site ne génère pas de clients", href: "/fr/articles/pourquoi-site-ne-genere-pas-de-clients" },
          { label: "Un formulaire de contact qui convertit", href: "/fr/articles/formulaire-contact-conversion" },
        ],
      },
      {
        id: "content",
        name: "Site de contenu / SEO",
        job: "Gagner du trafic en continu en occupant les questions que vos acheteurs posent.",
        sufficientWhen:
          "Votre marché cherche avant d'acheter, et vous pouvez vous engager à publier pendant un an plutôt qu'un trimestre. Sans cet engagement, c'est la façon la plus chère de posséder des archives vides.",
        requires: [
          "Une architecture de contenu : une page par intention, reliée délibérément",
          "Un CMS que quelqu'un utilisera vraiment, avec des types de contenu structurés",
          "Des données structurées, des URL propres et un plan de site qui reste exact",
          "Un rythme de publication, et une personne dont c'est la tâche",
        ],
        mistake:
          "Publier du volume au lieu de la couverture. Cinquante articles minces se nuisent entre eux ; dix pages qui répondent réellement à une question, non.",
        links: [
          { label: "Le maillage interne", href: "/fr/articles/maillage-interne-seo" },
          { label: "Référencement naturel", href: "/fr/referencement-naturel" },
        ],
      },
      {
        id: "ecommerce",
        name: "Site transactionnel",
        job: "Vendre des produits sans qu'une personne traite la transaction.",
        sufficientWhen:
          "Vous avez des produits, de l'inventaire et un processus d'expédition. Avec trois produits vendus surtout en personne, une page et un lien de paiement vous serviront mieux qu'une boutique.",
        requires: [
          "Un catalogue et des variantes, avec des fiches produits qui vendent réellement",
          "Un inventaire qui correspond à la réalité, où qu'elle soit tenue",
          "Caisse, TPS/TVQ, règles d'expédition, retours et remboursements",
          "L'exécution des commandes et le service client — les parties qui ne sont pas du logiciel",
        ],
        mistake:
          "Traiter la boutique comme le projet et les fiches produits comme du remplissage. Le catalogue est le site ; le reste est de la navigation.",
        buyInstead:
          "Pour la majorité des marchands, une plateforme transactionnelle hébergée est la bonne réponse : la caisse, la conformité des paiements et la sécurité deviennent le problème de quelqu'un d'autre. Une caisse sur mesure se justifie quand une règle d'affaires ne peut vraiment pas s'exprimer sur la plateforme — pas parce que la plateforme est démodée.",
        links: [
          { label: "Boutique en ligne au Québec", href: "/fr/boutique-en-ligne-quebec" },
          { label: "Taxes TPS/TVQ pour une boutique", href: "/fr/articles/taxes-tps-tvq-boutique-en-ligne" },
          { label: "Shopify ou WooCommerce", href: "/fr/shopify-vs-woocommerce" },
        ],
      },
      {
        id: "booking",
        name: "Site de réservation",
        job: "Permettre de réserver du temps ou de la capacité sans appel téléphonique.",
        sufficientWhen:
          "La disponibilité est précisément ce que les clients veulent savoir, et y répondre à la main vous coûte des heures ou des réservations.",
        requires: [
          "Des règles de disponibilité et de capacité qui ne peuvent pas être violées",
          "Confirmations, rappels, annulations et gestion des absences",
          "Ce que votre personnel utilise déjà pour voir l'horaire de la journée",
        ],
        mistake:
          "Bâtir un moteur de réservation. Les doubles réservations, les fuseaux, l'heure avancée et les politiques d'annulation sont des problèmes résolus dont les cas limites coûtent cher.",
        buyInstead:
          "Intégrez un logiciel de réservation éprouvé et concevez le site autour. Les restaurants en particulier devraient considérer la plateforme de réservation comme une infrastructure, pas une fonctionnalité : les clients arrivent par elle, et la refaire n'apporte rien qu'un client puisse voir.",
        links: [{ label: "Automatisation IA", href: "/fr/automatisation-ia" }],
      },
      {
        id: "membership",
        name: "Site à abonnement",
        job: "Vendre un accès continu, et le retirer quand le paiement s'arrête.",
        sufficientWhen:
          "Il y a réellement du matériel ou une communauté de valeur derrière la barrière, et une raison récurrente de revenir. Sinon, vous avez bâti un mur payant autour d'une bibliothèque que personne ne visite deux fois.",
        requires: [
          "Comptes, facturation récurrente, changements de forfait et annulations",
          "Un contrôle d'accès appliqué côté serveur, pas caché dans l'interface",
          "Un plan de rétention, parce que c'est l'attrition — pas l'inscription — qui décide si ça marche",
        ],
        mistake:
          "Verrouiller du contenu qui servait mieux à attirer des clients. Certains textes rapportent plus en public que derrière une connexion.",
        links: [{ label: "Développement logiciel", href: "/fr/developpement-logiciel" }],
      },
      {
        id: "portal",
        name: "Portail client",
        job: "Donner à chaque client ses propres informations et son propre suivi, en privé.",
        sufficientWhen:
          "Vos clients vous écrivent aujourd'hui pour connaître un statut, obtenir un document ou revoir un historique, et y répondre coûte du vrai temps de personnel. Le portail se justifie par le volume de ces demandes, pas par son apparence moderne.",
        requires: [
          "Une isolation stricte des données par client, conçue puis testée",
          "Authentification, permissions, piste de vérification et récupération de compte",
          "Une intégration avec l'endroit où vivent réellement les données aujourd'hui",
          "Un chemin de soutien pour le jour où quelqu'un n'arrive pas à entrer",
        ],
        mistake:
          "Bâtir le portail avant le processus. Si le processus interne est inconstant, le portail rend cette inconstance visible aux clients.",
        links: [
          { label: "Développement logiciel", href: "/fr/developpement-logiciel" },
          { label: "Sécurité et sauvegardes", href: "/fr/articles/securite-sauvegardes-site-web" },
        ],
      },
      {
        id: "internal",
        name: "Outil d'entreprise interne",
        job: "Permettre au personnel de travailler plus vite et avec moins d'erreurs.",
        sufficientWhen:
          "Un processus roule sur des chiffriers et de la mémoire, se brise quand la personne qui le connaît est absente, et coûte plus cher en erreurs qu'il ne coûterait à bâtir.",
        requires: [
          "Un processus écrit et accepté avant qu'on construise quoi que ce soit",
          "Des rôles, des permissions et une trace de qui a changé quoi",
          "La vitesse d'utilisation avant le fini visuel — c'est un outil, pas une vitrine",
          "De la formation, et un responsable après la mise en ligne",
        ],
        mistake:
          "Refaire un logiciel qu'on pourrait acheter. Le vrai argument pour construire, c'est l'ajustement : quand votre façon de travailler est l'avantage et que les outils génériques vous forcent à travailler comme tout le monde.",
        buyInstead:
          "Si un produit standard couvre quatre-vingts pour cent du processus, achetez-le et ne construisez que la portion qui vous appartient vraiment.",
        links: [
          { label: "Sur mesure ou solution existante ?", href: "/fr/logiciel-sur-mesure-ou-solution-existante" },
          { label: "Développement logiciel", href: "/fr/developpement-logiciel" },
          { label: "Automatisation IA", href: "/fr/automatisation-ia" },
        ],
      },
      {
        id: "saas",
        name: "SaaS / application web",
        job: "Livrer le logiciel comme produit lui-même.",
        sufficientWhen:
          "Les gens paient pour ce que le logiciel fait, pas pour ce que votre entreprise fait. À ce moment-là, le site est le marketing d'un produit, et le produit est un projet distinct avec sa propre feuille de route.",
        requires: [
          "Une portée de produit, un processus de livraison et des environnements autres que la production",
          "Comptes, facturation, soutien, attentes de disponibilité et posture de sécurité",
          "Un site marketing capable d'avancer à un rythme différent de l'application",
        ],
        mistake:
          "Le chiffrer comme un site web. Un questionnaire ne peut pas cadrer une plateforme — les exigences sont la partie coûteuse, et elles n'existent pas encore.",
        links: [
          { label: "Développement logiciel", href: "/fr/developpement-logiciel" },
          { label: "Prix d'un site web au Québec", href: "/fr/prix-site-web-quebec" },
        ],
      },
    ],
    hybrid:
      "Les combinaisons sont normales et souvent correctes. Une clinique, c'est un site de génération de clients plus une réservation intégrée. Une marque avec des comptes en gros, c'est une boutique plus un portail. Une entreprise de logiciel, c'est un site marketing plus une application. Ce qui compte, c'est de savoir que ce sont deux choses : portées distinctes, cadences de livraison distinctes, budgets généralement distincts — et le site marketing ne devrait jamais attendre après l'application.",
  },

  cms: {
    title: "Avez-vous vraiment besoin d'un CMS ?",
    intro:
      "Un système de gestion de contenu est une décision de processus déguisée en logiciel. Répondez à ceci avant de nommer un produit — les réponses éliminent la plupart des options.",
    deciders: [
      "Qui modifie — un propriétaire, une personne au marketing, ou plusieurs personnes dans différents services ?",
      "Ce qu'ils modifient — des textes et des images, ou des fiches structurées comme des services, du personnel, des produits ?",
      "À quelle fréquence — quelques fois par année, chaque mois, ou plusieurs fois par semaine ?",
      "Approbations — la personne peut-elle publier directement, ou faut-il une révision ?",
      "Langues — une seule, ou deux qui doivent rester alignées ?",
      "Publication — faut-il planifier, mettre sous embargo ou faire expirer du contenu automatiquement ?",
      "Structure — est-ce des fiches répétitives avec des champs, ou de vraies pages uniques ?",
    ],
    options: [
      {
        name: "Aucun CMS",
        what: "Le contenu vit dans le code et les changements sont déployés.",
        justifiedWhen:
          "Le contenu change quelques fois par année et une seule personne possède le site. Le plus rapide et le moins cher à exploiter, sans interface d'administration à sécuriser ni à mettre à jour.",
        cost: "Chaque changement de formulation attend un développeur. Acceptable à quatre changements par année, insupportable à quarante.",
      },
      {
        name: "CMS hébergé",
        what: "Une plateforme tout-en-un où l'édition, l'hébergement et les gabarits viennent ensemble.",
        justifiedWhen:
          "Un propriétaire non technique doit pouvoir tout changer et le design n'a pas à sortir de l'ordinaire. Le moins de friction pour modifier, et la plateforme gère ses mises à jour.",
        cost: "Vous héritez des limites et de la tarification de la plateforme, et les besoins inhabituels deviennent chers rapidement.",
      },
      {
        name: "CMS découplé (headless)",
        what: "Le contenu vit dans un système séparé avec une API ; le site s'affiche à partir de là.",
        justifiedWhen:
          "Le contenu est structuré et réutilisé — la même fiche de service qui apparaît dans une liste, sur une page détaillée et dans un formulaire — ou plusieurs canaux le consomment, ou plusieurs personnes ont besoin de rôles et d'approbations. C'est aussi la façon la plus propre de tenir deux langues alignées.",
        cost: "Deux systèmes à exploiter, un exercice de modélisation en amont, et une vraie différence entre un bon modèle de contenu et un modèle bâclé.",
      },
      {
        name: "CMS transactionnel",
        what: "Une plateforme de commerce où produits, inventaire et commandes sont des objets de premier ordre.",
        justifiedWhen:
          "Vendre est le rôle principal. Produits, stock, taxes et caisse sont gérés par un logiciel dont c'est toute la raison d'être, et le marchandisage reste entre les mains du marchand.",
        cost: "Le côté contenu et blogue est généralement plus faible qu'un CMS dédié ; une stratégie de contenu ambitieuse doit être planifiée autour.",
      },
      {
        name: "Administration sur mesure",
        what: "Une interface d'édition bâtie spécifiquement pour les fiches de cette entreprise.",
        justifiedWhen:
          "Le contenu appartient vraiment à votre domaine — un inventaire avec vos règles, des dossiers clients, des contraintes d'horaire — et un CMS générique forcerait votre personnel à traduire son travail dans le modèle de quelqu'un d'autre.",
        cost: "Vous possédez maintenant une application, avec sa sécurité, ses mises à jour et sa formation. Justifié par un usage quotidien, pas par une préférence.",
      },
    ],
    verdict:
      "La bonne réponse est l'option la plus légère qui survit à votre vraie façon de travailler pendant deux ans. La plupart des entreprises achètent trop ici : elles paient un système conçu pour une équipe éditoriale, puis mettent le site à jour deux fois par année en passant par le développeur.",
  },

  control: {
    title: "Ce que vous devriez pouvoir changer vous-même",
    intro:
      "La propriété n'est pas tout ou rien. Certaines choses doivent toujours être à quelques clics du propriétaire ; d'autres doivent rester derrière un processus de développement et de déploiement, parce que les changer à la légère, c'est ainsi qu'un site casse, perd son positionnement ou cesse discrètement de recueillir des demandes.",
    rows: [
      { item: "Textes et titres des pages", owner: "client", why: "Votre offre change plus vite que n'importe quel calendrier de livraison." },
      { item: "Articles de blogue", owner: "client", why: "Publier ne peut pas dépendre de la disponibilité de quelqu'un d'autre." },
      { item: "Services et descriptions", owner: "client", why: "Ce que vous vendez vous appartient, et ça évolue." },
      { item: "Équipe, biographies et photos", owner: "client", why: "Les gens arrivent et partent ; une page d'équipe périmée se lit comme de la négligence." },
      { item: "Produits, prix et inventaire", owner: "client", why: "Les décisions commerciales ne peuvent pas attendre un déploiement." },
      { item: "Images et galeries", owner: "client", why: "Un nouveau projet devrait être publiable la semaine où il se termine." },
      { item: "Succursales et heures d'ouverture", owner: "client", why: "Des heures erronées vous coûtent des clients et nuisent à la recherche locale." },
      { item: "FAQ", owner: "client", why: "Elles viennent de vraies questions de clients, qui arrivent sans arrêt." },
      { item: "Structure d'URL et redirections", owner: "build", why: "Changer des URL à la légère est la façon la plus rapide de perdre un positionnement accumulé." },
      { item: "Gabarits et système de mise en page", owner: "build", why: "Une mise en page libre finit par devenir une mise en page incohérente." },
      { item: "Données structurées et métadonnées", owner: "build", why: "Elles doivent rester cohérentes sur tout le site pour signifier quelque chose." },
      { item: "Formulaires, livraison et intégrations", owner: "build", why: "Un formulaire brisé est invisible ; ça se teste, ça ne se présume pas." },
      { item: "Mesure, consentement et témoins", owner: "build", why: "Ça porte des obligations de la Loi 25 et ça brise la mesure quand c'est modifié à l'aveugle." },
      { item: "Accès, permissions et paiements", owner: "build", why: "Les changements de sécurité exigent une révision. C'est le seul endroit où la friction est la fonctionnalité." },
    ],
  },

  complexity: {
    title: "Le coût de la complexité",
    intro:
      "Chaque fonctionnalité a un cycle de vie, et la construction en est la partie la moins chère. C'est ce calcul qui détermine si une fonction vaut la peine d'exister — pas sa faisabilité, qui est presque toujours acquise.",
    costs: [
      { name: "Développement", body: "Le seul coût que tout le monde compte, et généralement le plus petit sur cinq ans." },
      { name: "Tests", body: "Chaque fonction multiplie ce qu'il faut revérifier avant chaque mise en ligne." },
      { name: "Sécurité", body: "Connexions, téléversements et paiements ajoutent chacun une surface qu'il faut surveiller." },
      { name: "Hébergement", body: "Bases de données, tâches en arrière-plan et stockage coûtent plus que des pages statiques, chaque mois, pour toujours." },
      { name: "Surveillance", body: "Tout ce qui peut échouer en silence a besoin d'un témoin, sinon c'est un client qui vous l'apprend." },
      { name: "Mises à jour", body: "Les dépendances vieillissent. Un logiciel jamais mis à jour devient un logiciel impossible à mettre à jour." },
      { name: "Formation", body: "Chaque interface d'administration doit être apprise — de nouveau, à chaque changement de personnel." },
      { name: "Entretien", body: "Le contenu dérive, les API changent, les navigateurs avancent. Rien ne reste terminé." },
    ],
    rule: "Une fonctionnalité doit exister parce qu'elle crée de la valeur d'affaires, pas parce qu'elle est réalisable. Si personne ne peut nommer le processus qu'elle améliore ou l'argent qu'elle rapporte, ce n'est pas une fonctionnalité : c'est un passif avec une belle interface.",
  },

  scenarios: {
    title: "Six entreprises, raisonnées",
    intro:
      "La même séquence, appliquée à des situations réelles. Aucune ne part d'une plateforme, et deux concluent que la version ambitieuse serait de l'argent gaspillé.",
    items: [
      {
        id: "contractor",
        business: "Entrepreneur en construction ou métier spécialisé",
        goal: "Plus de demandes qualifiées de la région, et moins d'appels pour des questions auxquelles le site pourrait répondre.",
        requirements: [
          "Une page par service, écrite comme les clients décrivent le problème",
          "De la preuve : vraies photos de chantier, vrais avis, territoire desservi clairement nommé",
          "Un formulaire et un bouton d'appel qui fonctionnent sur un téléphone, dans un camion",
          "Une présence en recherche locale et des fiches d'entreprise cohérentes",
        ],
        verdict:
          "Un site de génération de clients avec édition de contenu légère. Pas de base de données, pas de comptes, pas de boutique. Le budget appartient aux pages de services et à la preuve, parce que c'est ce qui décide si le téléphone sonne.",
        restraint:
          "Pas de connexion client, pas de moteur de soumission, pas de réservation. Une soumission de ce type exige une visite, et un formulaire qui capte les détails du chantier fait le même travail sans l'entretien.",
        links: [
          { label: "Référencement local", href: "/fr/referencement-local" },
          { label: "Création web", href: "/fr/agence-web-montreal" },
        ],
      },
      {
        id: "professional",
        business: "Cabinet juridique, comptable ou professionnel",
        goal: "Être le choix crédible évident quand quelqu'un se renseigne sur un problème qu'il n'a jamais eu.",
        requirements: [
          "Du contenu d'autorité qui répond aux questions que les clients posent en premier",
          "Des pages par domaine de pratique, calquées sur la façon dont les gens cherchent",
          "Des personnes nommées avec de vrais titres — la confiance, dans ces domaines, est personnelle",
          "Un chemin de contact qui respecte la confidentialité et pose les attentes",
        ],
        verdict:
          "Un site de contenu et de référencement avec génération de clients, et un CMS avec flux d'approbation — parce que dans une profession réglementée, quelqu'un de senior doit approuver avant publication.",
        restraint:
          "Pas de portail client en première phase. C'est un deuxième projet légitime une fois que le volume d'échange de documents le justifie, mais il ne doit jamais retarder le site qui amène les clients.",
        links: [
          { label: "Référencement naturel", href: "/fr/referencement-naturel" },
          { label: "Être cité par l'IA", href: "/fr/etre-cite-par-ia" },
        ],
      },
      {
        id: "restaurant",
        business: "Restaurant",
        goal: "Remplir les tables et cesser de répondre au téléphone pour les heures et le menu.",
        requirements: [
          "Menu, heures, adresse et stationnement — trouvables en moins de cinq secondes, sur un téléphone",
          "Des réservations prises de façon fiable au moment où quelqu'un décide de venir",
          "Des photos qui font ressembler la salle à la salle",
          "Une fiche Google exacte, que la plupart des gens voient avant le site",
        ],
        verdict:
          "Un site marketing avec une infrastructure de réservation éprouvée intégrée. Les clients arrivent par la plateforme de réservation en laquelle votre personnel de plancher a déjà confiance ; le rôle du site est de les y envoyer sans friction.",
        restraint:
          "Ne refaites pas la réservation. Doubles réservations, listes d'attente, dépôts et politiques d'absence sont des problèmes résolus aux cas limites coûteux, et un client ne peut pas savoir qui a écrit le module.",
        links: [
          { label: "Fiche Google Entreprise", href: "/fr/fiche-google-entreprise" },
          { label: "Création web", href: "/fr/agence-web-montreal" },
        ],
      },
      {
        id: "clothing",
        business: "Marque de vêtements en ligne",
        goal: "Vendre directement, avec de la marge, sans qu'une personne touche à chaque commande.",
        requirements: [
          "Catalogue avec variantes, tailles et inventaire qui correspond à l'entrepôt",
          "Caisse, TPS/TVQ selon la province de livraison, règles d'expédition, retours et remboursements",
          "Des fiches produits qui vendent — photos, coupe, matières, entretien",
          "Des séquences courriel pour les paniers abandonnés et le rachat",
        ],
        verdict:
          "Un site transactionnel sur une plateforme de commerce hébergée. La caisse, la conformité des paiements et la sécurité cessent d'être votre problème, et le budget se déplace vers les fiches produits et la marque — là où se joue vraiment la différence de conversion.",
        restraint:
          "Pas de caisse sur mesure, et pas de système d'inventaire maison avant qu'il y ait de l'inventaire. À revoir seulement quand une règle d'affaires précise ne peut vraiment pas s'exprimer sur la plateforme.",
        links: [
          { label: "Boutique en ligne au Québec", href: "/fr/boutique-en-ligne-quebec" },
          { label: "Paiements en ligne au Québec", href: "/fr/articles/paiements-en-ligne-quebec" },
        ],
      },
      {
        id: "travel",
        business: "Conseiller en voyages ou service haut de gamme",
        goal: "Attirer des demandes qualifiées et cesser de perdre des heures en suivi et en administration.",
        requirements: [
          "Du contenu par destination et par spécialité qui gagne du trafic de recherche",
          "Un parcours de demande qui qualifie avant de réserver du temps à l'agenda",
          "Un CRM qui détient la relation client, pas une boîte courriel",
          "Éventuellement, un espace où le client voit son itinéraire et ses documents",
        ],
        verdict:
          "Un site hybride, bâti dans cet ordre : contenu et génération de clients d'abord, puis un espace client quand le volume de courriels de suivi le prouve. Le site public amène les clients ; le portail réduit le coût de les servir.",
        restraint:
          "Pas les deux en même temps. Un portail bâti avant d'avoir assez de clients pour le remplir, c'est de l'entretien sans retour, et ça retarde la partie qui génère des revenus.",
        links: [
          { label: "Étude de cas — Lisa Travel Design", href: "/fr/etude-de-cas-lisa-travel-design" },
          { label: "Développement logiciel", href: "/fr/developpement-logiciel" },
        ],
      },
      {
        id: "operations",
        business: "Entreprise à forte charge opérationnelle",
        goal: "Gagner des mandats publiquement tout en remplaçant les chiffriers sur lesquels l'entreprise roule réellement.",
        requirements: [
          "Un site public crédible qui vend la capacité",
          "Un outil interne qui correspond au vrai processus, écrit d'abord",
          "Des rôles, des permissions et une piste de vérification",
          "Une intégration avec la comptabilité ou l'horaire déjà en place",
        ],
        verdict:
          "Deux produits : un site public et un logiciel interne sur mesure. Ils partagent une marque et presque rien d'autre — utilisateurs différents, mesures de succès différentes, cadences différentes.",
        restraint:
          "Ne mettez pas les outils du personnel derrière une connexion sur le site marketing pour économiser. Ça complique le site public, ça contraint l'outil, et ça donne aux deux une posture de sécurité plus faible que si chacun vivait seul.",
        links: [
          { label: "Développement logiciel", href: "/fr/developpement-logiciel" },
          { label: "Automatisation IA", href: "/fr/automatisation-ia" },
        ],
      },
    ],
  },

  checklist: {
    title: "Votre liste d'exigences",
    intro:
      "Écrivez une réponse à chacun de ces points avant de parler à qui que ce soit de construction. Ça prend un après-midi, ça rend les soumissions comparables, et c'est la différence entre acheter un site et en commander un.",
    sections: [
      {
        name: "Objectif et action",
        items: [
          "Le résultat commercial, en une phrase, chiffré si possible",
          "La seule action qu'un visiteur doit poser pour que ce résultat arrive",
          "Comment vous saurez que ça a fonctionné, et qui regarde ça",
        ],
      },
      {
        name: "Fonctions et contenu",
        items: [
          "Les pages qui doivent exister au lancement, et qui les écrit",
          "Les types de contenu répétitifs — services, équipe, produits, succursales, FAQ",
          "La fréquence de changement de chacun, et qui le change",
          "Les langues, et qui garde la deuxième à jour",
        ],
      },
      {
        name: "Systèmes et administration",
        items: [
          "Chaque système avec lequel le site doit échanger des données, et s'il a une API",
          "Où va une demande ou une commande après l'envoi",
          "Qui modifie, qui approuve, qui a un compte, et ce que chacun ne doit jamais pouvoir briser",
        ],
      },
      {
        name: "Données, croissance et entretien",
        items: [
          "Quelles données personnelles ou de paiement sont recueillies, et où elles résident (Loi 25)",
          "À quoi ressemble une croissance réaliste sur douze mois",
          "Qui l'entretient, avec quel budget, et qui on appelle quand ça casse",
          "Ce que vous choisissez délibérément de ne pas construire en phase un",
        ],
      },
    ],
    outro:
      "La dernière ligne est celle qui économise le plus. Une liste écrite de ce qui est hors portée vaut plus qu'une longue liste de ce qui est inclus.",
  },

  next: {
    title: "La suite",
    intro:
      "Vous avez des exigences. Voici les prochaines décisions, à peu près dans l'ordre où elles comptent.",
    links: [
      { label: "Maintenant, choisir la technologie", href: "/fr/choisir-technologie-site-web" },
      { label: "Estimer ce que cette portée coûte", href: "/fr/outils/calculateur-cout-projet" },
      { label: "Prix d'un site web au Québec", href: "/fr/prix-site-web-quebec" },
      { label: "Shopify ou WooCommerce", href: "/fr/shopify-vs-woocommerce" },
      { label: "Site sur mesure ou gabarit", href: "/fr/articles/site-sur-mesure-ou-template" },
      { label: "Logiciel sur mesure ou solution existante ?", href: "/fr/logiciel-sur-mesure-ou-solution-existante" },
      { label: "Développement logiciel sur mesure", href: "/fr/developpement-logiciel" },
      { label: "À qui appartient le domaine, l'hébergement, le code et les comptes", href: "/fr/propriete-site-web" },
      { label: "Obligations de la Loi 96 pour un site web", href: "/fr/articles/loi-96-site-web-obligations" },
      { label: "Loi 25, témoins et consentement", href: "/fr/articles/loi-25-cookies-consentement" },
      { label: "Entretien et maintenance", href: "/fr/maintenance-site-web" },
      { label: "Tarifs publiés — sans appel de vente", href: "/fr/tarifs" },
      { label: "English version", href: "/website-setup-guide" },
    ],
  },

  faqs: [
    {
      q: "Quel type de site web mon entreprise a-t-elle besoin ?",
      a: "La majorité des entreprises ont besoin d'un site de génération de clients : des pages qui expliquent l'offre, des formulaires qui se rendent réellement à une personne, et une mesure qui montre quelles pages produisent des demandes. Un site transactionnel s'impose quand vous vendez des produits directement, un site de réservation quand les clients réservent du temps, des comptes quand quelque chose de réellement privé se trouve derrière une connexion, un portail quand chaque client a besoin de son propre dossier, et une application quand le logiciel est le produit. Tout ce qui dépasse ce que le processus d'affaires exige ajoute un coût permanent sans ajouter de revenu.",
    },
    {
      q: "Site vitrine ou site transactionnel : comment choisir ?",
      a: "La question est de savoir si la vente se conclut sur le site. Si le client achète en ligne, il vous faut un site transactionnel : catalogue, inventaire, caisse, TPS/TVQ, expédition et retours. Si la vente se conclut dans une conversation, un site vitrine bien construit — avec des pages de services et des formulaires qui convertissent — fait le travail pour une fraction du coût d'exploitation. Une boutique sans produits à vendre est un coût d'entretien permanent sans revenu.",
    },
    {
      q: "Ai-je vraiment besoin d'un CMS ?",
      a: "Seulement si une personne non technique doit modifier du contenu sans développeur, ou si le contenu change plus de quelques fois par année. Si une seule personne possède le site et qu'il change rarement, aucun CMS est l'option la plus rapide et la moins chère. Si le contenu est structuré et répétitif — services, équipe, produits, succursales — un CMS structuré ou découplé se justifie. Des approbations ou deux langues à tenir alignées éliminent les options les plus simples et constituent une vraie raison d'accepter un système plus lourd.",
    },
    {
      q: "Mon site doit-il obligatoirement être en français au Québec ?",
      a: "Oui pour le contenu commercial destiné au public québécois : la Charte de la langue française, modifiée par la Loi 96, exige que l'information commerciale soit disponible en français dans une version au moins équivalente à celle offerte dans une autre langue. Concrètement, ça veut dire que le français n'est pas une traduction ajoutée après coup — c'est une exigence de contenu qui double l'opération éditoriale et qui doit être planifiée avant le choix du CMS, pas après.",
    },
    {
      q: "Faut-il choisir la plateforme avant de définir les besoins ?",
      a: "Non. Choisir WordPress, Shopify, Framer, Next.js ou Supabase avant que les exigences existent inverse la décision : on s'engage d'abord dans des contraintes, puis on découvre ce dont l'entreprise avait besoin. Descendez la séquence — objectif d'affaires, action du visiteur, fonctions, contenu, intégrations, administration, sécurité, croissance — et seulement ensuite la technologie. Si deux plateformes répondent également à tout ça, le choix entre elles n'est pas la décision importante.",
    },
    {
      q: "Quand faut-il construire plutôt qu'acheter ?",
      a: "Construisez quand votre façon de travailler est l'avantage et qu'un logiciel générique vous forcerait à travailler comme tout le monde. Achetez quand le problème est déjà résolu et que ses cas limites coûtent cher : paiements, réservation, livraison de courriels et caisse transactionnelle en sont les exemples habituels. Si un produit standard couvre environ quatre-vingts pour cent du processus, achetez-le et ne construisez que la portion qui vous appartient vraiment.",
    },
  ],
};
