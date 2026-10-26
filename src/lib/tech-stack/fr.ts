import type { TechStackContent } from "./types";

/**
 * Contenu français de la ressource décisionnelle.
 *
 * Écrit pour le Québec plutôt que traduit de l'anglais — c'est la pratique du
 * site. Seule la structure est partagée avec `en.ts`; les identifiants sont
 * identiques dans les deux langues pour que les ancres, les liens entrants et
 * les futurs renvois du calculateur fonctionnent sans savoir dans quelle
 * langue se trouve le lecteur.
 */
export const FR: TechStackContent = {
  locale: "fr",

  chrome: {
    meta: {
      title: "Quelle technologie choisir pour son site web?",
      description:
        "Une ressource décisionnelle pour choisir la plateforme ou la pile technologique de son site : neuf situations d'affaires, une échelle de simplicité à cinq niveaux, une comparaison sur quinze critères — et l'exigence qui justifie chaque montée en complexité.",
      ogTitle: "Quelle technologie choisir pour son site web?",
      ogDescription:
        "L'architecture la plus simple qui répond vraiment à vos besoins — et ce qui justifierait quoi que ce soit de plus.",
    },
    eyebrow: "Ressource décisionnelle",
    h1: "Quelle technologie choisir pour son site web?",
    standfirst:
      "La bonne réponse, c'est l'architecture la plus simple qui répond réellement aux besoins de l'entreprise — et pour la plupart des entreprises, c'est plusieurs crans en dessous de ce qu'une agence aurait du plaisir à construire. Cette ressource détermine à quel cran vous êtes, et ce qui justifierait vraiment de monter d'un cran.",
    intro: [
      "Presque toutes les mauvaises décisions technologiques dans ce marché sont la même décision : on vend à une entreprise un niveau de machinerie que ses besoins n'ont jamais demandé. Un site de plomberie de cinq pages reçoit une base de données. Une boutique de vêtements reçoit une caisse sur mesure. Une équipe qui publie deux fois par année reçoit un CMS découplé avec un moteur de flux de travail. Rien de tout ça n'est incompétent — c'est constructible, et ça fonctionne le jour du lancement. C'est simplement plus que ce que l'entreprise avait besoin, et la facture arrive plus tard : en entretien, en fragilité, et en incapacité de changer quoi que ce soit sans rappeler la personne qui l'a bâti.",
      "Cette page est donc organisée par situations d'affaires plutôt que par technologies. Vous n'y trouverez pas de palmarès de cadriciels. Vous y trouverez l'exigence qui justifie chaque montée en complexité, formulée assez clairement pour que vous puissiez vérifier si vous avez cette exigence — et pour bien des lecteurs, la réponse honnête est un constructeur hébergé et un après-midi, pas un projet.",
      "Tout ici est le raisonnement qu'on applique sur de vrais mandats, y compris les parties où la bonne recommandation est quelque chose qu'on ne vend pas.",
    ],
    ui: {
      ladderHeading: "L'échelle de simplicité",
      ladderIntro:
        "Cinq crans, du moins de machinerie au plus. La règle qui compte est celle entre les crans : ne montez pas d'un niveau sans qu'une exigence vous y oblige. Chaque cran indique ce qui force le suivant.",
      scenariosHeading: "Neuf situations d'affaires",
      scenariosIntro:
        "Trouvez celle qui correspond à la façon dont votre entreprise fonctionne vraiment. Chacune donne la réponse normale, les solutions de rechange défendables, la surenchère technique que cette situation attire, et l'exigence unique qui justifie de monter d'un cran.",
      matrixHeading: "Comparaison par critère",
      matrixIntro:
        "Six approches confrontées aux quinze critères qui décident des vrais projets. Les rangées sont des approches plutôt que des produits, parce que le choix qu'une entreprise fait est architectural : « un constructeur hébergé » est une décision; « Framer plutôt que Squarespace » est une préférence.",
      matrixMethodology:
        "Aucune note sur dix ici, volontairement. Personne ne peut défendre pourquoi le SEO d'une plateforme vaut 7 et celui d'une autre 8, et un chiffre invente une précision qui n'existe pas. Ce qui se défend, c'est la décision qu'une évaluation implique : chaque case dit donc ce que ça signifie pour votre choix, et porte le fait qui l'appuie. Ce sont des jugements tirés de la construction et de l'entretien de ces piles technologiques, pas des mesures de laboratoire.",
      matrixLegend: {
        strong: "Une raison de le choisir",
        workable: "Correct, avec une réserve",
        limited: "Possible, mais ça résiste",
        wrong_tool: "Mauvais outil pour ça",
      },
      criterionColumn: "Critère",
      criteria: {
        setup: "Complexité de mise en place",
        maintenance: "Entretien continu",
        editing: "Modification par le client",
        seo: "Marge de manœuvre SEO",
        performance: "Performance",
        ecommerce: "Commerce en ligne",
        auth: "Authentification",
        database: "Base de données",
        workflows: "Processus sur mesure",
        scale: "Capacité à grandir",
        build_cost: "Coût de développement",
        run_cost: "Coût récurrent",
        lock_in: "Dépendance au fournisseur",
        portability: "Portabilité",
        expertise: "Expertise requise",
      },
      approaches: {
        hosted_builder: { name: "Constructeur hébergé", sub: "Framer, Squarespace" },
        visual_cms: { name: "CMS visuel", sub: "Webflow" },
        wordpress: { name: "WordPress", sub: "Auto-hébergé, avec thème" },
        shopify: { name: "Shopify", sub: "Commerce hébergé" },
        custom_cms: { name: "Frontal sur mesure + CMS", sub: "Next.js + Sanity" },
        custom_app: { name: "Application + infrastructure", sub: "Next.js + Supabase" },
      },
      layersHeading: "Les technologies, par couche",
      layersIntro:
        "Regrouper par couche architecturale évite la confusion la plus courante dans ces discussions : traiter comme concurrents des outils qui font des métiers différents. Stripe et Framer ne sont pas des solutions de rechange l'un pour l'autre. Supabase ne remplace pas Shopify. La plupart des vraies architectures choisissent une chose par couche et laissent plusieurs couches vides — et une couche vide est un bon résultat, pas un manque.",
      mythsHeading: "Vous n'avez probablement pas besoin…",
      mythsIntro:
        "Chacun de ces éléments est vraiment justifié pour certaines entreprises et nettement excessif pour la plupart. Voici l'exigence qui rend chacun légitime, pour que vous puissiez vérifier au lieu de deviner.",
      mythsUsually: "Pourquoi habituellement non",
      mythsJustified: "Quand c'est vraiment justifié",
      mythsInstead: "Quoi faire à la place",
      treeHeading: "Trouvez votre réponse",
      treeIntro:
        "Quatre ou cinq questions sur le fonctionnement de votre entreprise — aucune sur la technologie. Chacune ne peut que vous faire monter dans l'échelle, alors vous arrivez à l'architecture la plus simple qui répond quand même à un besoin que vous avez nommé.",
      treeStart: "Commencer",
      treeRestart: "Recommencer",
      treeBack: "Retour",
      treeAnswerLabel: "Vos réponses",
      treeStackLabel: "Par où commencer",
      treeWhyLabel: "Pourquoi ça",
      treeChangesLabel: "Ce qui changerait la réponse",
      treeReadMore: "Lire le raisonnement complet",
      treeCalculator: "Voir ce que ça coûte à bâtir",
      treeDisclaimer:
        "Un point de départ, pas un devis technique. Une vraie recommandation suit un examen de votre contenu, de votre trafic et des systèmes que vous utilisez déjà.",
      levelBadge: "Niveau",
      rightWhen: "Le bon choix quand",
      outgrowWhen: "Vous l'avez dépassé quand",
      runningCost: "Ce que ça coûte à faire vivre",
      whoEdits: "Qui peut le modifier",
      scenarioWho: "De qui on parle",
      scenarioNeeds: "Ce que ça doit faire",
      scenarioRecommendation: "Réponse normale",
      scenarioAlternatives: "Aussi défendable",
      scenarioOverkill: "La surenchère à refuser",
      scenarioEscalation: "Ce qui justifie de monter",
      layerCaution: "Où ça dérape",
      diagramLabel: "Architecture",
      absentLabel: "absent",
      readNext: "À lire ensuite",
      honesty:
        "On construit des logiciels sur mesure, et cette page dit quand même à la majorité des lecteurs de ne pas en acheter. Ce n'est pas de la modestie : une entreprise placée au mauvais cran devient un client malheureux vers le dix-huitième mois, et on préfère perdre le mandat que d'hériter de ça.",
    },
    principlesHeading: "Comment on décide vraiment",
    principles: [
      {
        title: "Ce sont les exigences qui choisissent l'architecture — jamais l'inverse",
        body: "Chaque cran de l'échelle est justifié par une exigence, sinon il ne l'est pas du tout. Si personne ne peut nommer l'exigence qui demande une base de données, il n'y a pas de base de données. Ça semble évident et c'est violé constamment, généralement parce que la technologie a été choisie avant que quiconque écrive les exigences.",
      },
      {
        title: "Intégrer ce qui existe et le construire sont deux produits différents",
        body: "« Prendre des rendez-vous » peut vouloir dire intégrer l'outil de réservation que vous payez déjà, ou bâtir un moteur de disponibilités avec personnel, ressources et règles. Ce ne sont pas deux formats du même mandat — l'écart est d'un ordre de grandeur en coût, en délai et en responsabilité après le lancement. Le même clivage s'applique aux commandes, aux paiements, aux comptes et à la recherche. Demander lequel des deux vous voulez dire est souvent la question la plus rentable d'un projet.",
      },
      {
        title: "Acheter avant de construire, et être honnête sur ce qu'on fait",
        body: "Si un produit existant règle quatre-vingts pour cent du besoin, la bonne décision est presque toujours de l'utiliser et de bâtir les vingt pour cent manquants — ou d'ajuster le processus pour que les quatre-vingts suffisent. Le logiciel sur mesure mérite sa place quand le processus est l'avantage concurrentiel, pas quand il est simplement inhabituel.",
      },
      {
        title: "Comptez la deuxième année, pas le lancement",
        body: "N'importe laquelle de ces approches peut avoir fière allure le jour du lancement. Les différences apparaissent en deuxième année : qui peut changer un prix sans développeur, ce qui casse quand une extension se met à jour, si une refonte veut dire une reconstruction, et si vous pouvez partir. Pas cher à bâtir et cher à posséder est le plus mauvais échange courant dans ce marché.",
      },
      {
        title: "Possédez vos comptes, peu importe la technologie",
        body: "Le domaine, le DNS, l'hébergement, les outils de mesure et le dépôt de code doivent être à votre nom, avec votre agence invitée dedans. C'est indépendant de toutes les autres décisions de cette page et c'est ce qui détermine si un choix technologique est réversible. Une pile que vous aimez dans le compte de quelqu'un d'autre vaut moins qu'une pile que vous tolérez dans le vôtre.",
      },
      {
        title: "Préférez la couche ennuyeuse",
        body: "Postgres, un CMS hébergé, un processeur de paiement en qui tout le monde a déjà confiance. La nouveauté au niveau de l'infrastructure n'apporte à peu près rien à un site d'entreprise et coûte très cher le jour où le choix original cesse d'être maintenu. Gardez l'originalité pour les parties du produit que vos clients voient.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faq: [
      {
        q: "Quelle technologie choisir pour son site web?",
        a: "Choisissez l'architecture la plus simple qui répond vraiment à vos exigences. Pour la plupart des entreprises — entrepreneurs, consultants, cliniques, restaurants, services professionnels — c'est un constructeur hébergé comme Framer ou Squarespace, ou un site géré par un CMS sur Webflow ou WordPress. Un frontal sur mesure avec un CMS découplé devient justifié quand la recherche est un canal principal et que le nombre de pages est élevé. Une base de données et une infrastructure applicative deviennent justifiées quand des utilisateurs se connectent et voient des données qui leur appartiennent. Le logiciel entièrement sur mesure se justifie quand le processus lui-même est le produit.",
      },
      {
        q: "WordPress est-il encore un choix raisonnable en 2026?",
        a: "Oui, dans un cas précis : un site riche en contenu, avec plusieurs personnes qui publient, une équipe ou une agence WordPress déjà en place, et une extension qui règle vraiment une exigence. C'est un mauvais choix quand personne n'est responsable des mises à jour, parce que l'entretien est réel et que le prix de la négligence est un site compromis, pas seulement un site désuet.",
      },
      {
        q: "Ça me prend un site sur mesure, ou un gabarit suffit?",
        a: "Un gabarit suffit quand le rôle du site est d'être crédible et d'expliquer ce que vous faites, et que personne dans l'équipe ne se bat contre le gabarit pour publier. Ça cesse de suffire quand la structure dont vous avez besoin n'existe pas dans le gabarit, quand la performance ou les résultats de recherche ont un impact commercial réel, ou quand votre site est devenu impossible à distinguer de vos concurrents qui utilisent le même thème.",
      },
      {
        q: "Shopify ou une boutique sur mesure?",
        a: "Shopify, sauf si quelque chose dans votre façon de vendre brise vraiment une boutique normale : prix négociés par client, location avec retours, configurateurs complexes, place de marché avec vendeurs tiers, ou un ERP qui doit rester la source de vérité. La caisse, les taxes, la détection de fraude, la conformité des paiements et l'hébergement de Shopify représentent une quantité de travail énorme qu'il faudrait autrement payer pour reconstruire, puis entretenir — et reconstruire une caisse ne rentabilise à peu près jamais l'investissement.",
      },
      {
        q: "Quand une entreprise a-t-elle vraiment besoin d'une base de données comme Supabase ou Postgres?",
        a: "Quand quelque chose doit persister et appartenir à quelqu'un : comptes d'utilisateurs, dossiers enregistrés, historique de commandes que vous contrôlez, documents téléversés, l'état d'une application. Un formulaire de contact n'en a pas besoin — il a besoin d'un courriel. Un blogue n'en a pas besoin — le CMS en a déjà une. Si rien de dynamique n'a besoin d'être stocké et récupéré par utilisateur, une base de données est une machinerie sans mandat.",
      },
      {
        q: "Next.js, est-ce exagéré pour un site de PME?",
        a: "Souvent, oui. Next.js mérite sa place quand le site est gros, quand la recherche est un canal d'acquisition principal, quand le contenu vient d'un CMS ou d'une API, ou quand le site va devenir une application. Pour un site de cinq pages modifié deux fois par année, un constructeur hébergé donne le même résultat commercial plus vite, et quelqu'un au bureau peut changer le numéro de téléphone.",
      },
      {
        q: "Comment éviter de se faire vendre trop gros?",
        a: "Demandez quelle exigence rend chaque composant nécessaire, et attendez une réponse précise. « Vous en aurez besoin plus tard » n'est pas une exigence. Demandez ce qui arrive le jour où vous voulez partir, qui possède les comptes, et qui peut changer un prix sans développeur. Un studio incapable de répondre à ça en français clair vend une pile technologique au lieu de régler un problème.",
      },
    ],
    relatedHeading: "À lire ensuite",
    related: [
      { label: "Ai-je vraiment besoin d'un logiciel sur mesure?", href: "/fr/logiciel-sur-mesure-ou-solution-existante" },
      { label: "Qui possède le domaine, le code et les comptes", href: "/fr/propriete-site-web" },
      { label: "Site sur mesure ou gabarit?", href: "/fr/articles/site-sur-mesure-ou-template" },
      { label: "Quitter WordPress", href: "/fr/articles/quitter-wordpress" },
      { label: "Nom de domaine et hébergement", href: "/fr/articles/nom-de-domaine-hebergement" },
      { label: "Choisir une agence web : les questions à poser", href: "/fr/articles/choisir-agence-web-questions" },
      { label: "Développement logiciel sur mesure", href: "/fr/developpement-logiciel" },
      { label: "Shopify ou WooCommerce", href: "/fr/shopify-vs-woocommerce" },
      { label: "Boutique en ligne au Québec", href: "/fr/boutique-en-ligne-quebec" },
      { label: "Calculateur de coût de projet", href: "/fr/outils/calculateur-cout-projet" },
      { label: "Prix d'un site web au Québec", href: "/fr/prix-site-web-quebec" },
      { label: "English version", href: "/choosing-website-technology" },
    ],
    cta: {
      heading: "Vous voulez trancher pour votre entreprise en particulier?",
      body: "Le calculateur pose le même genre de questions que cette page — sur votre entreprise plutôt que sur la technologie — et retourne une portée et une fourchette tirées du modèle qu'on utilise pour chiffrer de vrais mandats. Si la réponse est un constructeur hébergé et aucun projet, il va le dire.",
      primary: "Utiliser le calculateur",
      secondary: "Voir les tarifs affichés",
    },
  },

  levels: {
    l1: {
      id: "l1",
      name: "Niveau 1 — Constructeur hébergé",
      summary:
        "Un seul produit héberge, édite et sert le site au complet. Pas de CMS séparé, pas de serveur à entretenir, rien à mettre à jour.",
      examples: "Framer, Squarespace, Carrd, ou les pages de Shopify pour une boutique qui existe déjà.",
      rightWhen: [
        "Moins d'une quinzaine de pages, et une structure sans particularité.",
        "Le rôle du site est d'être crédible, d'expliquer l'offre et de générer des demandes.",
        "Personne n'a besoin de se connecter, et rien n'a besoin d'être stocké par personne.",
        "Le contenu change à l'occasion, et on peut confier l'éditeur à une personne.",
      ],
      outgrowWhen: [
        "Il vous faut un type de page que le constructeur ne sait pas exprimer, et vous le simulez en dupliquant des pages.",
        "La recherche est un canal d'acquisition principal et vous butez sur des limites de contrôle : redirections, données structurées, métadonnées par page, versions linguistiques.",
        "Quelqu'un doit se connecter, acheter quelque chose de complexe, ou voir ses propres données.",
        "Le nombre de pages a grimpé au point qu'un changement veut dire modifier le même bloc vingt fois.",
      ],
      runningCost: "Un abonnement par mois et un domaine par année. Aucune facture d'hébergement, aucun forfait d'entretien.",
      whoEdits: "N'importe qui dans l'entreprise, dans un éditeur visuel, sans déploiement.",
      diagram: [
        { role: "Hébergement", fill: "Inclus dans la plateforme" },
        { role: "Présentation", fill: "Gabarits et éditeur de la plateforme" },
        { role: "Contenu", fill: "Collections intégrées" },
        { role: "Formulaires", fill: "Intégrés, vers un courriel" },
        { role: "Base de données", fill: "Aucune", absent: true },
        { role: "Authentification", fill: "Aucune", absent: true },
        { role: "Infrastructure applicative", fill: "Aucune", absent: true },
      ],
    },
    l2: {
      id: "l2",
      name: "Niveau 2 — Site marketing géré par un CMS",
      summary:
        "Un système de gestion de contenu où votre équipe publie, avec un frontal conçu par-dessus. Toujours une seule plateforme, mais le contenu est maintenant structuré plutôt que tapé dans une page.",
      examples: "Webflow avec son CMS, WordPress avec un thème entretenu, Shopify pour une boutique qui publie vraiment.",
      rightWhen: [
        "Le contenu est un canal : pages de services, emplacements, comparaisons, études de cas, un blogue avec un calendrier.",
        "Des personnes non techniques publient régulièrement et ne peuvent pas attendre après un développeur.",
        "Il y a des types de pages répétés — services, employés, emplacements, projets — qui devraient partager une seule structure.",
        "La recherche compte commercialement et il vous faut le contrôle des métadonnées, des redirections et des données structurées.",
      ],
      outgrowWhen: [
        "La performance est devenue un problème commercial et le rendu de la plateforme est le plafond.",
        "Le design se bat contre le constructeur — chaque mise en page demande un contournement que l'éditeur suivant brise.",
        "Il vous faut le contenu à deux endroits à la fois : un site, une application, des écrans en magasin.",
        "Vous payez quatre extensions par abonnement pour simuler une seule fonction.",
      ],
      runningCost:
        "Un abonnement à la plateforme, plus les extensions ou applications. Sur WordPress, ajoutez un vrai hébergement et un budget d'entretien — un WordPress laissé sans surveillance est un incident de sécurité qui attend une semaine tranquille.",
      whoEdits: "L'équipe marketing, dans le CMS, sans toucher à la mise en page.",
      diagram: [
        { role: "Hébergement", fill: "Plateforme (Webflow) ou votre hébergeur (WordPress)" },
        { role: "Présentation", fill: "Thème ou construction visuelle" },
        { role: "Contenu", fill: "Collections et types de contenu du CMS" },
        { role: "Formulaires", fill: "Intégrés ou par extension" },
        { role: "Base de données", fill: "Celle du CMS — vous ne la concevez pas" },
        { role: "Authentification", fill: "Éditeurs seulement", absent: true },
        { role: "Infrastructure applicative", fill: "Aucune qui vous appartient", absent: true },
      ],
    },
    l3: {
      id: "l3",
      name: "Niveau 3 — Frontal sur mesure + CMS",
      summary:
        "L'interface est écrite en code et le contenu vit dans un CMS découplé. Les deux sont séparés : le site peut être refait sans ressaisir le contenu, et le contenu survit au design.",
      examples: "Next.js sur Vercel avec Sanity, Contentful, ou une couche de contenu versionnée dans le dépôt.",
      rightWhen: [
        "La recherche est un canal principal et le nombre de pages est assez élevé pour que la structure et le maillage interne soient une stratégie, pas de l'entretien.",
        "La performance a un impact commercial réel — une boutique, un moteur à demandes, un éditeur de contenu.",
        "Le design est vraiment sur mesure et un constructeur le reproduirait à quatre-vingt-dix pour cent, mal.",
        "Le contenu doit alimenter plus d'une surface, ou survivre à la prochaine refonte.",
      ],
      outgrowWhen: [
        "Des utilisateurs ont besoin de comptes, de données privées, ou de quoi que ce soit qui persiste par personne — c'est le niveau 4, et c'est un autre projet.",
        "Vous construisez de la logique d'affaires dans le CMS pour éviter d'admettre qu'il vous faut une infrastructure applicative.",
      ],
      runningCost:
        "Hébergement sur une plateforme sans serveur, un abonnement CMS, et une relation avec un développeur pour les changements de structure — pas pour les changements de contenu.",
      whoEdits:
        "Les éditeurs changent le contenu librement. Changer ce QU'EST un type de page demande un développeur : c'est l'échange que vous faites.",
      diagram: [
        { role: "Hébergement", fill: "Vercel ou équivalent" },
        { role: "Présentation", fill: "Next.js / React, écrit pour cette entreprise" },
        { role: "Contenu", fill: "CMS découplé, structuré" },
        { role: "Formulaires", fill: "Route API vers courriel ou CRM" },
        { role: "Base de données", fill: "Celle du CMS, et rien d'autre" },
        { role: "Authentification", fill: "Éditeurs seulement", absent: true },
        { role: "Infrastructure applicative", fill: "Mince — routes API, aucun état à elle" },
      ],
    },
    l4: {
      id: "l4",
      name: "Niveau 4 — Frontal sur mesure + infrastructure et base de données",
      summary:
        "Il y a maintenant de l'état. Des gens se connectent, des dossiers leur appartiennent, et le système fait des choses quand personne ne regarde. C'est un logiciel avec un site web attaché, plutôt qu'un site web avec des fonctions.",
      examples:
        "Next.js avec Supabase ou Postgres, authentification, règles d'accès par rangée, Stripe pour la facturation, Resend pour les courriels transactionnels.",
      rightWhen: [
        "Des utilisateurs se connectent et voient des données qui sont les leurs — portail client, espace membre, système de réservation que vous possédez.",
        "L'entreprise a un processus qu'aucun produit existant n'exécute, et ce processus est l'avantage.",
        "Les données doivent être interrogées et analysées d'une façon qu'un chiffrier ou un CMS ne peut pas exprimer.",
        "Quelque chose doit se produire selon un horaire, ou en réaction à un événement, sans personne.",
      ],
      outgrowWhen: [
        "Plusieurs produits, plusieurs équipes et une vraie surface de plateforme — le niveau 5, et surtout un changement d'organisation plutôt que de technologie.",
      ],
      runningCost:
        "Hébergement, base de données infogérée, fournisseur d'authentification, courriel, suivi des erreurs — et, inévitablement, une relation d'ingénierie continue. Un logiciel, ça ne s'achète pas une seule fois.",
      whoEdits:
        "Le contenu marketing, si un CMS a été inclus. Tout le reste passe par un déploiement, et c'est pourquoi le site vitrine est souvent gardé volontairement hors de ce niveau.",
      diagram: [
        { role: "Hébergement", fill: "Vercel ou équivalent" },
        { role: "Présentation", fill: "Application Next.js / React" },
        { role: "Contenu", fill: "CMS pour les pages marketing, s'il y en a" },
        { role: "Infrastructure applicative", fill: "Routes API, actions serveur, tâches planifiées" },
        { role: "Base de données", fill: "Postgres, avec règles d'accès par rangée" },
        { role: "Authentification", fill: "Supabase Auth, Clerk ou équivalent" },
        { role: "Paiements", fill: "Stripe, si de l'argent circule" },
      ],
    },
    l5: {
      id: "l5",
      name: "Niveau 5 — Logiciel ou plateforme entièrement sur mesure",
      summary:
        "Un produit à part entière : n'importe qui peut s'inscrire, la facturation roule toute seule, et le système doit continuer de fonctionner pendant que l'équipe dort. Le site web devient le marketing du logiciel, pas la chose elle-même.",
      examples:
        "Une application SaaS — Next.js, Postgres, authentification avec rôles et organisations, abonnements Stripe, courriels transactionnels, observabilité, un environnement de préproduction et un processus de mise en production.",
      rightWhen: [
        "Les clients se servent eux-mêmes : ils s'inscrivent, utilisent le produit et sont facturés sans que vous touchiez à rien.",
        "Plusieurs organisations utilisent le même système et ne doivent jamais voir les données des autres.",
        "Le logiciel est ce que vous vendez, ou c'est le cœur opérationnel sur lequel l'entreprise roule.",
      ],
      outgrowWhen: ["C'est le sommet de l'échelle. Ce qui change après, c'est la structure de l'équipe, pas l'architecture."],
      runningCost:
        "Tout ce qu'il y a au niveau 4, plus l'observabilité, une garde applicative, une posture de sécurité et une feuille de route. Budgétez la deuxième année avant de vous engager pour la première.",
      whoEdits: "Produit et ingénierie, selon un cycle de livraison.",
      diagram: [
        { role: "Hébergement", fill: "Plateforme infogérée, plus un environnement de préproduction" },
        { role: "Présentation", fill: "Interface applicative, plus un site vitrine distinct" },
        { role: "Infrastructure applicative", fill: "Services, tâches, webhooks" },
        { role: "Base de données", fill: "Postgres, avec isolation par client" },
        { role: "Authentification", fill: "Comptes, rôles, organisations, SSO" },
        { role: "Paiements", fill: "Abonnements Stripe et droits d'accès" },
        { role: "Observabilité", fill: "Journalisation, suivi d'erreurs, alertes" },
      ],
    },
  },

  scenarios: {
    "simple-business": {
      id: "simple-business",
      name: "Site d'entreprise simple",
      who: "Entrepreneurs en construction, consultants, entreprises de services locaux, restaurants, cliniques, métiers, cabinets professionnels — des entreprises dont le site doit établir qu'elles existent vraiment et rendre le contact facile.",
      needs: [
        "Expliquer l'offre, le territoire desservi et les prix ou la fourchette.",
        "Avoir l'air assez crédible pour qu'un inconnu accepte d'appeler.",
        "Générer des demandes : un formulaire, un numéro, une carte, les heures d'ouverture.",
        "Être trouvé pour son propre nom et une poignée de termes locaux.",
      ],
      level: "l1",
      recommendation:
        "Un constructeur hébergé — Framer ou Squarespace — configuré correctement, avec le domaine et les outils de mesure dans les comptes de l'entreprise.",
      why: "Rien dans cette liste de besoins n'exige une base de données, une connexion ou un déploiement. Ce qu'il faut, c'est une structure claire, un design crédible, des pages rapides, de bons signaux de recherche locale et un formulaire qui se rend à une personne. Un constructeur hébergé fait tout ça, sans rien créer que l'entreprise doive entretenir. Ce genre de site échoue rarement à cause de la plateforme — il échoue à cause d'un texte flou, d'une absence de prochaine étape claire, et d'une fiche Google Entreprise que personne n'a remplie.",
      alternatives: [
        {
          option: "Webflow",
          when: "Il y a des types de pages répétés — plusieurs services, plusieurs emplacements — qui devraient partager une structure plutôt que d'être des copies.",
        },
        {
          option: "WordPress",
          when: "L'entreprise a déjà un site WordPress, quelqu'un qui l'entretient, et aucune raison de migrer. Changer de plateforme coûte quelque chose; « WordPress est vieux » n'est pas une exigence.",
        },
        {
          option: "Un site sur mesure statique",
          when: "La marque est le produit et le design doit être vraiment unique — hôtellerie, luxe, architecture — ou le site est un moteur à demandes où la performance et la structure de recherche valent l'investissement.",
        },
      ],
      overkill:
        "Une base de données, une connexion, un CMS découplé ou un développement sur mesure pour un site de cinq pages que personne ne modifie. Un plombier n'a pas besoin de Supabase. Si la proposition en contient un, demandez quelle exigence il sert et attendez une réponse précise.",
      escalation:
        "La recherche qui devient un vrai canal d'acquisition — le jour où vous voulez vingt pages service-par-quartier qui partagent une structure, vous êtes rendu au niveau 2.",
    },

    "marketing-seo": {
      id: "marketing-seo",
      name: "Site marketing axé sur le référencement",
      who: "Les entreprises pour qui la recherche organique et les pages d'atterrissage payantes sont une source principale de clients : agences, sites vitrines de logiciels, entreprises multiservices ou multiemplacements, quiconque exploite le contenu comme canal.",
      needs: [
        "Beaucoup de pages d'atterrissage qui partagent une structure et se produisent rapidement.",
        "Un blogue ou une bibliothèque de ressources, publiés selon un calendrier par des non-développeurs.",
        "D'excellents signaux web essentiels, parce que la performance influence à la fois le classement et la conversion.",
        "Le contrôle complet des métadonnées, des canoniques, des redirections, des données structurées, des plans de site et du hreflang.",
        "Un suivi de conversion qui survit au consentement, et des mesures sur lesquelles on peut agir.",
      ],
      level: "l2",
      recommendation:
        "Webflow quand l'équipe marketing doit posséder les pages de bout en bout. Next.js avec un CMS découplé quand le nombre de pages est élevé, que la performance a un impact commercial, ou que le site est bilingue et que l'architecture des URL compte.",
      why: "C'est la situation où la plateforme change vraiment les résultats. Les pages d'atterrissage ne sont économiques que si le type de page existe une seule fois et que l'équipe peut en produire des instances; la performance n'est fiable que si vous contrôlez ce qui est envoyé au navigateur; et la structure de recherche — canoniques, redirections, hreflang — n'est contrôlable que si la plateforme l'expose. Ces trois points sont exactement là où les constructeurs hébergés manquent d'espace, et exactement là où un frontal sur mesure commence à valoir son prix.",
      alternatives: [
        {
          option: "WordPress",
          when: "Il y a déjà une équipe de contenu qui le connaît, quelqu'un de responsable des mises à jour, et une extension qui règle vraiment une exigence au lieu d'en ajouter une.",
        },
        {
          option: "Rester sur un constructeur hébergé",
          when: "La recherche compte, mais le site est petit. Ne migrez pas un site de quinze pages pour des raisons de référencement seulement — corrigez d'abord le contenu et la structure, et voyez si la plateforme était vraiment la contrainte.",
        },
      ],
      overkill:
        "Une infrastructure applicative et une base de données pour un site qui publie des articles. Le contenu n'est pas de l'état applicatif. Si rien n'est stocké par utilisateur, le CMS est la seule base de données de ce projet.",
      escalation:
        "Le contenu qui doit alimenter une deuxième surface — une application, des écrans en magasin, un flux partenaire — ou la performance qui atteint le plafond de la plateforme. Les deux mènent au niveau 3.",
    },

    publisher: {
      id: "publisher",
      name: "Éditeur de contenu",
      who: "Magazines, salles de nouvelles, sites de recherche et d'éducation, grandes bibliothèques de ressources — partout où le contenu est le produit et où plus d'une personne en est responsable.",
      needs: [
        "Des modifications fréquentes, par plusieurs personnes, sans collisions.",
        "Un vrai flux éditorial : brouillons, révision, publication programmée, embargos.",
        "Une taxonomie qui tient le coup en volume — catégories, mots-clés, séries, auteurs.",
        "La gestion des médias : images en plusieurs formats, vidéo, légendes, crédits.",
        "Des archives qui restent rapides et indexées en grandissant vers les milliers d'articles.",
      ],
      level: "l3",
      recommendation:
        "Un CMS découplé avec de vrais rôles et de la programmation — Sanity, Contentful, ou WordPress utilisé strictement comme moteur de contenu — avec un frontal Next.js.",
      why: "La publication est le cas où l'expérience éditoriale est une exigence d'affaires, pas un confort. Les rédacteurs ont besoin de brouillons et de programmation; l'archive doit rester rapide à l'échelle; et le contenu doit survivre à plusieurs refontes. Séparer le contenu de la présentation est ce qui rend les trois possibles en même temps. C'est aussi la seule situation où le modèle éditorial de WordPress, avec des décennies de raffinement derrière lui, est un véritable argument en sa faveur.",
      alternatives: [
        {
          option: "WordPress avec un thème classique",
          when: "L'équipe éditoriale est grande, déjà formée, et les exigences de performance sont ordinaires. Ne découplez pas une salle de nouvelles par mode — ça double la surface à entretenir.",
        },
        {
          option: "Le CMS de Webflow",
          when: "La bibliothèque compte quelques centaines d'éléments et le flux de travail est simple. Ses limites d'éléments et son flux éditorial sont les contraintes à vérifier avant de s'engager.",
        },
      ],
      overkill:
        "Construire un CMS sur mesure. Le logiciel éditorial est un problème résolu, avec des décennies de travail d'ergonomie derrière lui, et un panneau d'administration maison sera moins bon le jour du lancement et encore moins bon trois ans plus tard. Ne bâtissez un CMS sur mesure que si le modèle de contenu est vraiment inexprimable — et il l'est presque jamais.",
      escalation:
        "Des abonnements, un mur payant ou des comptes lecteurs. C'est le niveau 4, parce que ça introduit des utilisateurs et des choses qui leur appartiennent.",
    },

    ecommerce: {
      id: "ecommerce",
      name: "Commerce en ligne",
      who: "Quiconque vend des produits en ligne — une première boutique, une marque établie, du direct au consommateur, ou une opération de gros qui passe au web.",
      needs: [
        "Un catalogue avec variantes, inventaire et collections.",
        "Une caisse qui convertit, et qui gère correctement les taxes, la livraison et la fraude.",
        "Des paiements, des remboursements et des rétrofacturations traités conformément.",
        "Les opérations : commandes, préparation, retours, dossiers clients, rapports.",
        "Le marketing : rabais, courriels, paniers abandonnés, flux de produits.",
      ],
      level: "l2",
      recommendation:
        "Shopify, sauf si votre façon de vendre brise vraiment une boutique normale. Mettez l'effort dans le thème, les données de produits et la mise en marché plutôt que dans la plomberie.",
      why: "La caisse est le composant le plus coûteux du commerce et le moins visible. Les taxes entre juridictions, la validation d'adresses, la détection de fraude, la portée PCI, la couverture des moyens de paiement, les reprises sur cartes refusées, les remboursements et les rétrofacturations : Shopify y a consacré plus d'une décennie, ça s'améliore sans vous, et c'est un terrain réglementé où se tromper coûte cher. Reconstruire ça est un gros projet dont le meilleur résultat possible est d'égaler ce que vous auriez pu louer. Presque toutes les boutiques qui croient avoir besoin de commerce sur mesure ont plutôt besoin d'un meilleur thème, de données de produits propres et d'une décision de mise en marché.",
      alternatives: [
        {
          option: "Shopify avec un frontal sur mesure (découplé)",
          when: "L'expérience de marque ou de contenu est vraiment un facteur de différenciation et la vitrine est un véritable problème de design — mais gardez la caisse de Shopify. Découplé veut dire vitrine sur mesure, pas caisse sur mesure.",
        },
        {
          option: "WooCommerce",
          when: "L'entreprise est déjà bien installée dans WordPress, le catalogue est modeste, et quelqu'un est responsable de l'entretien et de la posture PCI.",
        },
        {
          option: "Commerce sur mesure",
          when: "Prix contractuels par client, location avec disponibilités et retours, configurateurs complexes, places de marché avec vendeurs tiers, ou un ERP qui doit rester la source de vérité. Ces cas sont réels, et plus rares qu'on le prétend.",
        },
      ],
      overkill:
        "Une caisse sur mesure. Une boutique de vêtements n'en a pas besoin. Si une proposition inclut la reconstruction de la caisse, demandez ce qu'elle fera que celle de Shopify ne fait pas, et chiffrez la conformité et l'entretien de cette réponse en même temps que la construction.",
      escalation:
        "Des modèles de vente qu'une boutique ne peut pas exprimer — abonnements avec droits d'accès, facturation à l'usage, catalogues par compte. Là, le commerce est devenu une application : c'est le niveau 4.",
    },

    booking: {
      id: "booking",
      name: "Réservation et entreprise de services",
      who: "Cliniques, salons, studios, restaurants, métiers avec visites planifiées, consultants qui vendent du temps, tours et location d'équipement.",
      needs: [
        "Des disponibilités qui reflètent la réalité — personnel, locaux, équipement, temps de déplacement.",
        "Confirmations, rappels et reprogrammation sans coup de téléphone.",
        "Un dépôt ou le paiement au moment de la réservation, quand ça convient à l'entreprise.",
        "Ce que l'industrie attend déjà : OpenTable, un système de gestion de clinique, une caisse.",
      ],
      level: "l1",
      recommendation:
        "Intégrez le produit de réservation sur lequel votre industrie roule déjà — Calendly, Square, Acuity, OpenTable, votre système de gestion — dans le niveau où se trouve déjà le reste du site. La réservation change rarement l'architecture du site web.",
      why: "C'est l'exemple le plus clair du clivage intégrer-ou-construire, et celui où l'écart de coût est le plus grand. Intégrer un outil de réservation, c'est de la configuration et du style; bâtir un moteur de disponibilités, c'est du logiciel, avec des règles sur le personnel, les ressources, les tampons, les annulations, les fuseaux horaires, les absences et les rappels — chacune étant une décision que quelqu'un doit prendre et entretenir. L'outil de l'industrie apporte aussi ce que vous ne pouvez pas reconstruire à bas prix : des rappels qui réduisent les absences, une relation de paiement, et la conformité quand des dossiers de santé sont en jeu.",
      alternatives: [
        {
          option: "Un système de réservation que vous possédez",
          when: "Les disponibilités dépendent de règles qu'aucun produit n'exprime — travaux à plusieurs ressources, répartition de techniciens, équipement qui doit revenir avant de repartir — ou le parcours de réservation lui-même est le facteur de différenciation.",
        },
        {
          option: "La réservation par la plateforme de commerce",
          when: "Vous êtes déjà sur Shopify et vous vendez des rendez-vous comme des produits, avec un calendrier simple.",
        },
      ],
      overkill:
        "Bâtir un moteur de réservation parce que le widget intégré ne correspond pas aux polices de la marque. Stylisez l'intégration, ou choisissez un produit qui permet de la styliser. L'écart visuel coûte une fraction de ce que coûte l'entretien d'un système de calendrier.",
      escalation:
        "Des règles de disponibilité qu'aucun produit ne peut exprimer, ou des réservations qui doivent alimenter un système opérationnel que vous possédez. Là c'est le niveau 4 — et c'est un projet logiciel à côté d'un site web, pas un site web plus gros.",
    },

    membership: {
      id: "membership",
      name: "Espace membre ou portail authentifié",
      who: "Associations, formateurs, agences qui donnent à leurs clients un endroit pour voir leur propre travail, fournisseurs B2B qui exposent des prix ou des documents, communautés derrière une connexion.",
      needs: [
        "Des comptes, et du contenu ou des données que seule la bonne personne peut voir.",
        "Des rôles : membre, administrateur, employé, parfois un accès par organisation.",
        "De la facturation récurrente, si l'adhésion est payante.",
        "Un historique de ce qui appartient à une personne — fichiers, progression, factures, billets.",
      ],
      level: "l4",
      recommendation:
        "D'abord, vérifiez si un produit le fait déjà : Circle, Memberstack, une plateforme de formation, le portail client de votre CRM. Si rien ne convient, c'est ici qu'une infrastructure applicative mérite sa place — Next.js avec Supabase ou Postgres, une vraie authentification, des règles d'accès appliquées par rangée, Stripe pour la facturation.",
      why: "C'est la frontière autour de laquelle toute l'échelle est bâtie. Dès que des données appartiennent à une personne précise, vous prenez la responsabilité du contrôle d'accès, de la loi sur la protection des renseignements personnels, de la gestion des mots de passe et des sessions, et de ce qui arrive quand quelqu'un part. C'est exactement cette responsabilité que Supabase, Clerk et leurs semblables existent pour réduire — et exactement pourquoi une connexion ne s'ajoute jamais à la légère à un site vitrine. Un portail, ce n'est pas une page derrière un mot de passe : c'est une application avec un site vitrine attaché.",
      alternatives: [
        {
          option: "Un produit d'adhésion prêt à l'emploi",
          when: "L'exigence est du contenu derrière une connexion avec de la facturation récurrente. Ça couvre plus de cas que la plupart des agences l'admettent, et ça élimine complètement la surface de sécurité.",
        },
        {
          option: "Un espace de travail partagé plutôt qu'un portail",
          when: "Le vrai besoin est « les clients peuvent voir leurs fichiers et l'état du projet ». Notion, un lecteur partagé ou votre outil de gestion de projet règlent souvent ça pour le prix d'un après-midi.",
        },
      ],
      overkill:
        "Bâtir un portail pour livrer ce qu'une pièce jointe ou un dossier partagé livre déjà. Les portails sont souvent achetés pour avoir l'air organisé, puis abandonnés parce que se connecter demande plus d'effort que ce qu'il y a à l'intérieur.",
      escalation:
        "N'importe qui pouvant s'inscrire sans intervention, avec facturation en libre-service et des clients qui ne doivent jamais se voir entre eux — c'est le niveau 5.",
    },

    saas: {
      id: "saas",
      name: "SaaS",
      who: "Un logiciel vendu par abonnement, où les clients s'inscrivent eux-mêmes, utilisent le produit et sont facturés automatiquement.",
      needs: [
        "Une interface applicative qui est le produit, pas sa description.",
        "La multilocation : une isolation stricte entre les organisations clientes.",
        "Une authentification avec rôles, invitations et — éventuellement — l'authentification unique.",
        "La facturation par abonnement, les changements de forfait, la proratisation, les relances, les droits d'accès.",
        "Des courriels transactionnels qui se rendent vraiment.",
        "De l'observabilité : vous apprenez qu'il y a un bris avant que vos clients vous l'annoncent.",
      ],
      level: "l5",
      recommendation:
        "Next.js et React sur Vercel; Postgres, souvent via Supabase, avec sécurité au niveau des rangées; Supabase Auth ou Clerk pour les comptes; Stripe pour les abonnements; Resend pour les courriels transactionnels; GitHub avec aperçus et un environnement de préproduction; suivi des erreurs et alertes de disponibilité dès le premier jour.",
      why: "C'est la seule situation de cette page où l'architecture sur mesure est la réponse évidente plutôt qu'un risque, parce que le logiciel EST le produit — on ne loue pas la chose qu'on vend. La discipline qui compte ici est différente : ce n'est pas « est-ce que ça devrait être sur mesure » mais « à quel point peut-on en construire peu pour la première version ». Achetez l'authentification, la facturation, le courriel, le suivi des erreurs. Ne construisez que la partie pour laquelle vos clients paient. Les équipes qui écrivent leur propre authentification et leur propre facturation pour économiser des abonnements y perdent régulièrement un trimestre et héritent du fardeau de sécurité pour toujours.",
      alternatives: [
        {
          option: "Valider d'abord sans code",
          when: "L'hypothèse produit n'est pas prouvée. Une version manuelle derrière un formulaire et un chiffrier répond à la question qui compte, bien plus économiquement qu'une plateforme.",
        },
      ],
      overkill:
        "Des microservices, Kubernetes et des bus d'événements pour un produit sans utilisateurs. Une seule application bien structurée sur une infrastructure infogérée vous mènera plus loin que la plupart des fondateurs le pensent, et il est bien plus facile de séparer quelque chose qui fonctionne que d'assembler quelque chose qui n'a jamais tout à fait fonctionné. Aussi : un tableau de bord SaaS ne s'assemble pas avec des pages de constructeur visuel — la surface d'un produit, c'est de l'état applicatif, et ce n'est pas à ça que ces outils servent.",
      escalation:
        "Des problèmes d'échelle que vous pouvez réellement mesurer. On sépare un service quand un goulot précis l'exige, pas en prévision d'un goulot.",
    },

    "internal-tools": {
      id: "internal-tools",
      name: "Application d'affaires interne",
      who: "Des logiciels d'opérations utilisés par le personnel plutôt que par les clients : un CRM, un outil de soumission ou de répartition, un flux d'approbation, l'inventaire, des tableaux de bord.",
      needs: [
        "Encoder un processus qui vit actuellement dans des chiffriers, des courriels et la tête des gens.",
        "Des dossiers avec un historique, et des rapports transversaux.",
        "Des permissions par rôle, et une piste de vérification quand les décisions ont des conséquences.",
        "Des connexions aux systèmes qui détiennent déjà les données.",
      ],
      level: "l4",
      recommendation:
        "C'est ici que le test « acheter d'abord » s'applique le plus fort. Si un produit existant fait l'essentiel, utilisez-le et construisez la partie manquante. Là où le sur mesure est la bonne réponse, un outil interne est habituellement le logiciel sur mesure le moins cher qui existe : une interface Next.js par-dessus Postgres, l'authentification, et une portée honnête.",
      why: "Les outils internes ont un avantage caché — les utilisateurs sont vos propres employés, alors l'interface peut être sobre, les cas limites peuvent être traités par une personne, et les exigences se recueillent en marchant jusqu'au bureau d'à côté. Ça en fait une valeur inhabituellement bonne quand le processus est réellement particulier. Mais les mêmes conditions rendent la surenchère facile : la demande vise souvent un système qui remplace quatre outils alors que ce qu'il faut, c'est un écran qui élimine une heure répétée par semaine.",
      alternatives: [
        {
          option: "Configurer une plateforme existante",
          when: "Le processus est courant — pipeline de ventes, billets, projets, inventaire. Airtable, un vrai CRM ou votre ERP battront un développement sur mesure pendant des années.",
        },
        {
          option: "Une automatisation plutôt qu'une application",
          when: "Le besoin réel est « ces données devraient passer de A à B sans personne ». C'est un flux, pas un système, et ça coûte une fraction du prix.",
        },
      ],
      overkill:
        "Reconstruire un CRM. Aussi : des tableaux de bord que personne n'ouvre. Avant de bâtir un système de rapports, trouvez quelle décision le rapport change — si la réponse est aucune, le rapport est un projet sans rendement.",
      escalation:
        "L'outil qui devient quelque chose que vous vendriez à d'autres. C'est une autre entreprise, avec les exigences du niveau 5 : multilocation, facturation en libre-service, soutien.",
    },

    "custom-platform": {
      id: "custom-platform",
      name: "Plateforme entièrement sur mesure",
      who: "Places de marché, systèmes de logistique et de répartition, processus réglementés, produits de données — tout ce où la façon dont l'entreprise opère n'est représentée par aucun produit sur le marché.",
      needs: [
        "Un modèle de domaine qu'aucun système prêt à l'emploi n'exprime.",
        "Des règles, des états et des intégrations propres à cette entreprise.",
        "Souvent : de la conformité, de la vérifiabilité, ou des exigences de résidence des données.",
        "Une longue durée de vie, et donc une architecture maintenable plutôt qu'ingénieuse.",
      ],
      level: "l5",
      recommendation:
        "Sur mesure, et cadré par écrit avant qu'on construise quoi que ce soit. Un cadrage payant qui produit un document d'exigences, une architecture et un prix de construction fixe n'est pas une formalité ici — les exigences sont la partie coûteuse, et elles n'existent pas encore.",
      why: "C'est ici que le logiciel sur mesure est carrément la bonne réponse : quand le processus est l'avantage concurrentiel, l'encoder est l'investissement. Le risque n'est plus de surdimensionner l'architecture — c'est de construire fidèlement la mauvaise chose. L'argent va donc dans la décision de quoi construire, dans la livraison de la plus petite version qu'un vrai utilisateur peut utiliser pour du vrai travail, et dans une infrastructure ennuyeuse et bien comprise en dessous. Personne ne peut chiffrer honnêtement une plateforme à partir d'un questionnaire, et tout studio qui le fait devine à vos frais.",
      alternatives: [
        {
          option: "Un assemblage de produits existants",
          when: "La partie inhabituelle est une seule étape dans un processus par ailleurs ordinaire. Quatre-vingt-dix pour cent acheté et dix pour cent construit bat cent pour cent construit, de façon permanente.",
        },
      ],
      overkill:
        "Concevoir pour une échelle que vous n'avez pas atteinte. L'échec le plus courant à ce niveau n'est pas le manque d'ingénierie — c'est un système conçu pour l'entreprise qu'on espère être dans cinq ans, livré si tard que l'entreprise qu'on est aujourd'hui ne pouvait pas l'attendre.",
      escalation:
        "Rien au-dessus. La prochaine contrainte est organisationnelle : qui l'entretient, qui est de garde, et ce qui arrive quand la personne qui le comprenait s'en va.",
    },
  },

  matrix: {
    hosted_builder: {
      setup: { rating: "strong", note: "En ligne en quelques jours. Aucun environnement, aucune compilation, aucune décision d'hébergement." },
      maintenance: { rating: "strong", note: "Rien à corriger. La plateforme se met à jour toute seule." },
      editing: { rating: "strong", note: "Édition visuelle par n'importe qui, publiée immédiatement." },
      seo: { rating: "workable", note: "Métadonnées, plans de site et redirections sont gérés; le contrôle avancé — hreflang, données structurées fines, règles serveur — varie et mérite d'être vérifié avant de s'engager." },
      performance: { rating: "workable", note: "Habituellement bonne d'emblée; le plafond est celui de la plateforme, et les animations lourdes ou les scripts intégrés l'érodent vite." },
      ecommerce: { rating: "limited", note: "Correct pour une poignée de produits. Pas une plateforme d'opérations." },
      auth: { rating: "wrong_tool", note: "Protéger une page par mot de passe n'est pas de l'authentification." },
      database: { rating: "wrong_tool", note: "Les collections stockent du contenu, pas des dossiers par utilisateur." },
      workflows: { rating: "wrong_tool", note: "Aucun endroit pour exécuter de la logique d'affaires." },
      scale: { rating: "workable", note: "Le trafic passe très bien. C'est le nombre de pages et la complexité structurelle qui cassent en premier." },
      build_cost: { rating: "strong", note: "Le point d'entrée crédible le moins cher pour un site professionnel." },
      run_cost: { rating: "strong", note: "Un abonnement et un domaine." },
      lock_in: { rating: "limited", note: "Le design ne part pas avec vous. Déménager veut dire reconstruire." },
      portability: { rating: "limited", note: "Le contenu s'exporte généralement; la mise en page et les interactions, non." },
      expertise: { rating: "strong", note: "Une personne non technique compétente peut le gérer indéfiniment." },
    },

    visual_cms: {
      setup: { rating: "workable", note: "Des jours à des semaines. Structurer les collections correctement est un vrai travail de conception." },
      maintenance: { rating: "strong", note: "Hébergé et corrigé par la plateforme." },
      editing: { rating: "strong", note: "Le rôle Éditeur laisse le marketing publier sans toucher à la mise en page." },
      seo: { rating: "strong", note: "Contrôle par page, redirections, canoniques, plans de site et données structurées sont tous exposés." },
      performance: { rating: "workable", note: "Bonne quand c'est bâti avec soin; se dégrade avec les interactions lourdes et les intégrations tierces." },
      ecommerce: { rating: "limited", note: "Ça existe, mais ce n'est pas concurrentiel avec une plateforme de commerce dédiée pour de vraies opérations." },
      auth: { rating: "limited", note: "Des fonctions de membres existent; au-delà du contenu protégé, il faut une vraie infrastructure." },
      database: { rating: "limited", note: "Des collections CMS, avec des limites d'éléments à vérifier contre votre archive." },
      workflows: { rating: "limited", note: "La logique passe par des services d'automatisation tiers, pas par du code que vous contrôlez." },
      scale: { rating: "workable", note: "Confortable jusqu'à quelques centaines d'éléments; planifiez l'architecture au-delà." },
      build_cost: { rating: "workable", note: "Milieu de gamme. Moins cher que le sur mesure, plus qu'un constructeur." },
      run_cost: { rating: "workable", note: "Forfait du site plus les sièges; les coûts montent avec les éditeurs et les modules." },
      lock_in: { rating: "limited", note: "Le contenu s'exporte; la construction, non. Partir veut dire refaire le frontal." },
      portability: { rating: "limited", note: "Le contenu CMS est portable par CSV ou API; la mise en page ne l'est pas." },
      expertise: { rating: "workable", note: "Les éditeurs n'ont besoin d'aucune compétence. Bien construire demande quelqu'un qui connaît vraiment l'outil." },
    },

    wordpress: {
      setup: { rating: "workable", note: "Vite installé, long à bien faire. Les choix de thème et d'extensions décident des cinq prochaines années." },
      maintenance: { rating: "limited", note: "Les mises à jour du cœur, du thème et des extensions sont continues et non facultatives. Un WordPress non entretenu est le logiciel le plus souvent compromis sur le web." },
      editing: { rating: "strong", note: "Trente ans de raffinement éditorial, et une main-d'œuvre qui le connaît déjà." },
      seo: { rating: "strong", note: "Contrôle complet, avec des extensions matures. La contrainte est la discipline, pas la capacité." },
      performance: { rating: "limited", note: "Atteignable, mais ça se travaille : cache, gestion d'images et retenue sur les extensions. La prolifération d'extensions est la cause habituelle d'un site lent." },
      ecommerce: { rating: "workable", note: "WooCommerce est capable et vous met en charge de la posture PCI, des mises à jour et de la disponibilité." },
      auth: { rating: "workable", note: "Des utilisateurs et des rôles existent; des extensions d'adhésion les étendent. La sécurité vous appartient." },
      database: { rating: "workable", note: "Une vraie base de données en dessous, même si le schéma est celui de WordPress plutôt que le vôtre." },
      workflows: { rating: "workable", note: "Les crochets et les extensions maison font du vrai travail — au prix d'entretenir ce code dans le cycle de livraison de quelqu'un d'autre." },
      scale: { rating: "workable", note: "Ça monte en charge avec du cache et de l'attention à l'infrastructure. De très grands sites y tournent, avec des équipes." },
      build_cost: { rating: "strong", note: "L'offre énorme de développeurs et de thèmes maintient le coût d'entrée bas." },
      run_cost: { rating: "workable", note: "Hébergement, extensions payantes, et un budget d'entretien qui n'est pas facultatif." },
      lock_in: { rating: "strong", note: "Logiciel libre. Vous pouvez l'héberger n'importe où et personne ne peut monter le loyer." },
      portability: { rating: "strong", note: "La base de données et les fichiers sont à vous; les chemins d'export sont bien balisés." },
      expertise: { rating: "workable", note: "Facile à démarrer, et il faut un mainteneur vraiment compétent pour rester en sécurité." },
    },

    shopify: {
      setup: { rating: "strong", note: "Une boutique fonctionnelle, avec paiements et taxes, en quelques jours." },
      maintenance: { rating: "strong", note: "La plateforme, la caisse et la conformité sont le problème de Shopify. Les applications sont le vôtre." },
      editing: { rating: "strong", note: "Produits, collections et contenu dans une seule administration que toute l'équipe peut utiliser." },
      seo: { rating: "workable", note: "Solide, avec des contraintes connues — préfixes d'URL imposés et contrôle limité sur certaines pages générées." },
      performance: { rating: "workable", note: "Rapide par défaut; les scripts d'applications sont la raison habituelle pour laquelle une boutique cesse de l'être." },
      ecommerce: { rating: "strong", note: "Caisse, taxes, fraude, paiements, inventaire et rapports — toute la surface, entretenue pour vous." },
      auth: { rating: "workable", note: "Les comptes clients sont intégrés. Ce n'est pas un système d'identité polyvalent." },
      database: { rating: "workable", note: "Produits, commandes et clients, avec des métachamps pour le reste. Pas un endroit pour des données applicatives sans lien." },
      workflows: { rating: "workable", note: "Flow, les applications et les fonctions couvrent beaucoup; une logique vraiment particulière demande du code à côté de la plateforme." },
      scale: { rating: "strong", note: "Encaisse les pointes de trafic et les gros catalogues sans que vous y pensiez." },
      build_cost: { rating: "strong", note: "L'argent va au thème, aux données de produits et à la mise en marché plutôt qu'à la plomberie." },
      run_cost: { rating: "workable", note: "Abonnement, frais de transaction et applications. La prolifération d'applications est le coût à surveiller." },
      lock_in: { rating: "limited", note: "Réelle, et généralement acceptable. Le code du thème et la caisse ne vous suivent pas." },
      portability: { rating: "workable", note: "Produits, clients et commandes s'exportent proprement; la vitrine, non." },
      expertise: { rating: "strong", note: "Des marchands gèrent des boutiques seuls tous les jours. Les spécialistes servent au thème et aux intégrations." },
    },

    custom_cms: {
      setup: { rating: "limited", note: "Des semaines. Modélisation du contenu, frontal et déploiement sont tous de vraies décisions." },
      maintenance: { rating: "workable", note: "Les dépendances demandent des mises à jour périodiques, mais il n'y a pas de serveur à corriger et la surface d'attaque est plus petite qu'un écosystème d'extensions." },
      editing: { rating: "strong", note: "Les éditeurs obtiennent un modèle conçu pour eux. Changer ce QU'EST un type de page demande encore un développeur." },
      seo: { rating: "strong", note: "Contrôle total : métadonnées, canoniques, hreflang, données structurées, redirections, plans de site, stratégie de rendu." },
      performance: { rating: "strong", note: "Vous décidez ce qui est envoyé au navigateur, la seule façon durable de tenir les signaux web essentiels." },
      ecommerce: { rating: "workable", note: "Bon comme vitrine devant Shopify. Bâtir le moteur de commerce lui-même est un autre projet." },
      auth: { rating: "workable", note: "Simple à ajouter — mais l'ajouter veut dire que vous êtes au niveau 4, pas au niveau 3." },
      database: { rating: "workable", note: "Le CMS est la base de données. N'ajoutez la vôtre que si quelque chose doit persister par utilisateur." },
      workflows: { rating: "workable", note: "Les routes API et les tâches planifiées font du vrai travail sans infrastructure complète." },
      scale: { rating: "strong", note: "La génération statique et la diffusion en périphérie montent en charge pratiquement sans limite." },
      build_cost: { rating: "limited", note: "L'option la plus chère qui ne soit pas une application. Justifiée par le trafic, le nombre de pages ou la marque." },
      run_cost: { rating: "workable", note: "Hébergement plus abonnement CMS — souvent moins par mois que la pile d'extensions équivalente." },
      lock_in: { rating: "strong", note: "Votre code, votre dépôt, un hébergement portable. Le CMS est la pièce remplaçable." },
      portability: { rating: "strong", note: "Le contenu s'exporte par API; le frontal tourne partout où Node tourne." },
      expertise: { rating: "limited", note: "Exige une relation avec un développeur pour tout ce qui est structurel. C'est l'échange." },
    },

    custom_app: {
      setup: { rating: "wrong_tool", note: "Pour un site vitrine, c'est le mauvais point de départ. Pour une application, c'est le début d'un projet, pas un lancement." },
      maintenance: { rating: "limited", note: "Dépendances, migrations, correctifs de sécurité et quelqu'un de responsable quand ça brise à 2 h du matin." },
      editing: { rating: "limited", note: "L'édition de contenu n'existe que si un CMS a été inclus volontairement. Tout le reste passe par un déploiement." },
      seo: { rating: "strong", note: "Contrôle complet — même si la majorité d'une application est derrière une connexion et, avec raison, pas indexée du tout." },
      performance: { rating: "strong", note: "À vous de la contrôler, et à vous de la rater. Les requêtes à la base de données deviennent le facteur décisif." },
      ecommerce: { rating: "workable", note: "Nécessaire seulement pour des modèles de vente qu'une plateforme ne peut pas exprimer. Autrement, un coût important et évitable." },
      auth: { rating: "strong", note: "La raison d'être ici. Comptes, rôles, sessions et règles d'accès par rangée." },
      database: { rating: "strong", note: "Un schéma conçu pour votre domaine, ce qui est tout l'intérêt de ce niveau." },
      workflows: { rating: "strong", note: "N'importe quelle règle, n'importe quel horaire, n'importe quelle intégration. Rien n'est « non pris en charge »." },
      scale: { rating: "strong", note: "Monte en charge aussi loin que l'architecture et la conception de la base de données le permettent." },
      build_cost: { rating: "wrong_tool", note: "De loin le plus élevé, et irrécupérable si l'exigence était imaginaire." },
      run_cost: { rating: "limited", note: "Hébergement, base de données, authentification, courriel, surveillance — plus une relation d'ingénierie continue." },
      lock_in: { rating: "strong", note: "Votre code et vos données. Les services infogérés se remplacent avec de l'effort." },
      portability: { rating: "workable", note: "Postgres et l'outillage standard voyagent bien; les particularités des services infogérés demandent de la planification." },
      expertise: { rating: "wrong_tool", note: "Demande de l'ingénierie en continu. Une entreprise sans cette relation ne devrait pas être à ce niveau." },
    },
  },

  layers: {
    presentation: {
      id: "presentation",
      name: "Présentation — ce que le visiteur voit",
      purpose:
        "L'interface elle-même. Tous les projets ont cette couche; la seule question est de savoir si elle s'exprime dans un éditeur visuel ou dans du code.",
      entries: [
        { tech: "Framer", what: "Un outil de design hébergé qui publie un vrai site.", when: "Petits sites où le design compte, où l'équipe veut éditer visuellement et où rien n'exige d'infrastructure." },
        { tech: "Webflow", what: "Un constructeur visuel avec un CMS derrière.", when: "Sites marketing avec des types de pages répétés, où l'équipe marketing doit posséder les pages." },
        { tech: "React", what: "La bibliothèque de composants dans laquelle le sur mesure s'écrit.", when: "Toute interface écrite en code — donc, en pratique, tout ce qui est au niveau 3 ou plus." },
        { tech: "Next.js", what: "Le cadriciel React : routage, stratégie de rendu, métadonnées, images, routes API.", when: "Sites sur mesure et applications où la recherche, la performance ou l'état applicatif comptent." },
      ],
      caution:
        "Choisir un cadriciel avant de savoir si le site en a besoin. Next.js est une excellente réponse à des questions qu'un site vitrine de cinq pages ne pose jamais.",
    },

    content: {
      id: "content",
      name: "Contenu — où vivent les mots et les images",
      purpose:
        "Où le contenu modifiable est stocké et modélisé. Nécessaire dès que le contenu change selon un calendrier ou par quelqu'un qui n'est pas développeur.",
      entries: [
        { tech: "CMS intégré (Framer, Webflow, Shopify)", what: "Des collections dans la plateforme.", when: "Le site et le contenu vivent sur la même plateforme, ce qui couvre la plupart des entreprises." },
        { tech: "WordPress", what: "Un CMS mature avec un grand écosystème éditorial.", when: "Grandes équipes éditoriales, capacité WordPress déjà en place, ou une extension vraiment utile." },
        { tech: "Sanity / CMS découplé", what: "Le contenu comme données structurées, livrées par API.", when: "Un frontal sur mesure, ou du contenu qui doit alimenter plus d'une surface." },
        { tech: "Markdown dans le dépôt", what: "Le contenu comme fichiers, versionné avec le code.", when: "Contenu écrit par des développeurs — documentation, notes de version — où la révision par demande de tirage est un avantage." },
      ],
      caution:
        "Construire un CMS sur mesure. Le logiciel éditorial est un problème résolu, et un panneau d'administration maison est moins bon le jour du lancement que ce que vous n'avez pas acheté.",
    },

    commerce: {
      id: "commerce",
      name: "Commerce — catalogue, caisse, commandes",
      purpose:
        "Tout ce qui se passe entre l'existence d'un produit et l'arrivée de l'argent : variantes, inventaire, panier, caisse, taxes, livraison, préparation, retours.",
      entries: [
        { tech: "Shopify", what: "Commerce hébergé, incluant une caisse entretenue pour vous.", when: "Presque toutes les boutiques. La valeur par défaut jusqu'à ce qu'une exigence précise la brise." },
        { tech: "Shopify découplé (Storefront API)", what: "Le moteur de commerce de Shopify derrière une vitrine sur mesure.", when: "L'expérience de marque est un facteur de différenciation — tout en gardant la caisse de Shopify." },
        { tech: "WooCommerce", what: "Le commerce comme extension WordPress.", when: "Déjà engagé dans WordPress, catalogue modeste, quelqu'un de responsable de l'entretien." },
        { tech: "Commerce sur mesure", what: "Votre propre catalogue, panier et modèle de commandes.", when: "Prix contractuels, location, configurateurs, places de marché, ou un ERP qui doit rester la source de vérité." },
      ],
      caution:
        "Confondre « découplé » et « caisse sur mesure ». Le commerce découplé veut dire que vous avez bâti la vitrine. Reconstruire la caisse est une décision distincte, bien plus grosse et bien plus risquée.",
    },

    data: {
      id: "data",
      name: "Données — ce qui persiste",
      purpose:
        "Où les dossiers vivent quand ils doivent survivre, être interrogés et appartenir à quelqu'un. Cette couche est vide sur la plupart des sites d'entreprise, et c'est le bon résultat.",
      entries: [
        { tech: "PostgreSQL", what: "La base de données relationnelle sur laquelle presque toute application sérieuse aboutit.", when: "Tout ce qui a des utilisateurs, des dossiers, un historique ou des rapports." },
        { tech: "Supabase", what: "Postgres infogéré avec authentification, stockage, temps réel et sécurité par rangée.", when: "Des applications qui veulent une vraie base de données sans en administrer une — le choix habituel au niveau 4." },
        { tech: "Le stockage du CMS", what: "Du contenu, déjà stocké et déjà interrogeable.", when: "Le contenu est la seule chose qui persiste — c'est-à-dire la plupart des sites." },
      ],
      caution:
        "Ajouter une base de données parce que le projet a l'air d'en mériter une. Si rien n'est stocké par utilisateur, cette couche reste vide et le projet reste moins cher à posséder.",
    },

    auth: {
      id: "auth",
      name: "Authentification — qui est connecté",
      purpose:
        "Identité, sessions et permissions. Introduire cette couche est le plus grand pas dans l'échelle, parce qu'elle amène avec elle la responsabilité des données d'autrui.",
      entries: [
        { tech: "Supabase Auth", what: "Comptes, sessions et règles d'accès à côté de la base de données.", when: "Vous utilisez déjà Supabase et voulez le contrôle d'accès appliqué au niveau des données." },
        { tech: "Clerk / Auth.js", what: "Des fournisseurs d'identité dédiés.", when: "La connexion sociale, les organisations, les invitations ou l'authentification unique sont des exigences." },
        { tech: "Comptes de plateforme (Shopify, Circle, un produit d'adhésion)", what: "La connexion de quelqu'un d'autre, la responsabilité de quelqu'un d'autre.", when: "Le besoin est du contenu ou des commandes derrière une connexion — ce qui est habituellement le cas." },
      ],
      caution:
        "Écrire votre propre authentification. Sessions, réinitialisations, limitation de débit, gestion des brèches et loi sur la vie privée entrent toutes dans la portée dès ce moment-là, et rien de ça n'est ce qui distingue votre produit.",
    },

    payments: {
      id: "payments",
      name: "Paiements — encaisser",
      purpose:
        "Le traitement de l'argent. Volontairement séparé du commerce : prendre un dépôt n'est pas le même problème que gérer une boutique, et confondre les deux est la façon dont des entreprises se retrouvent avec une boutique dont elles n'avaient pas besoin.",
      entries: [
        { tech: "Stripe", what: "Paiements, abonnements, factures, caisse hébergée.", when: "Dépôts, paiements de services, abonnements, ou une application qui facture — partout où il n'y a pas de vrai catalogue." },
        { tech: "Shopify Payments", what: "Les paiements dans la plateforme de commerce.", when: "Vous avez une boutique; c'est déjà là." },
        { tech: "Un lien de paiement", what: "Une page hébergée que vous envoyez à quelqu'un.", when: "Des paiements occasionnels ou ponctuels. Bien plus souvent la bonne réponse qu'une caisse." },
      ],
      caution:
        "Bâtir une boutique pour encaisser quatre paiements par mois. Stripe sur un site de niveau 1 règle ça pour le prix d'un après-midi, sans frais de plateforme récurrents.",
    },

    email: {
      id: "email",
      name: "Courriel — les messages que le système envoie",
      purpose:
        "Le courriel transactionnel : confirmations, reçus, réinitialisations de mot de passe, notifications. Distinct du courriel marketing, et il doit se rendre.",
      entries: [
        { tech: "Resend", what: "Du courriel transactionnel pensé pour les développeurs, avec une vraie posture de délivrabilité.", when: "Tout développement sur mesure qui envoie du courriel par lui-même." },
        { tech: "Le courriel de la plateforme", what: "Ce que le constructeur ou la boutique envoie déjà.", when: "Notifications de formulaire et confirmations de commande sur une plateforme hébergée." },
      ],
      caution:
        "Envoyer du courriel transactionnel depuis une boîte de courriel ordinaire ou un domaine non authentifié. Sans SPF, DKIM et DMARC, les réinitialisations de mot de passe tombent dans les indésirables et personne ne l'apprend avant qu'un client se plaigne.",
    },

    hosting: {
      id: "hosting",
      name: "Hébergement et diffusion",
      purpose: "Où le site tourne réellement, et à quelle vitesse il se rend aux gens.",
      entries: [
        { tech: "La plateforme elle-même", what: "Framer, Webflow et Shopify hébergent ce qu'ils construisent.", when: "Niveaux 1 et 2. Il n'y a aucune décision d'hébergement à prendre, et c'est un avantage." },
        { tech: "Vercel", what: "Hébergement infogéré pour Next.js, avec aperçus et diffusion en périphérie.", when: "Frontaux sur mesure et applications, où les aperçus de déploiement changent la façon de réviser." },
        { tech: "Hébergement infogéré classique", what: "Un serveur que quelqu'un entretient.", when: "WordPress. Choisissez un hébergeur qui gère les mises à jour et les sauvegardes, ou budgétez quelqu'un qui le fait." },
      ],
      caution:
        "Héberger dans le compte de l'agence. Peu importe la technologie, l'hébergement, le domaine et le DNS doivent être au nom de l'entreprise — c'est ce qui rend toutes les autres décisions réversibles.",
    },

    measurement: {
      id: "measurement",
      name: "Mesure — savoir si ça a marché",
      purpose:
        "La couche qui détermine si les autres en valaient la peine. Indépendante de la technologie, et régulièrement la dernière chose que quelqu'un configure.",
      entries: [
        { tech: "Google Analytics 4", what: "Trafic, sources et conversions.", when: "Toujours, avec le consentement géré correctement." },
        { tech: "Google Search Console", what: "Ce pour quoi le site est réellement trouvé, et ce que Google n'arrive pas à indexer.", when: "Toujours. C'est gratuit, et c'est la seule vue de première main sur la recherche." },
        { tech: "Microsoft Clarity", what: "Enregistrements de sessions et cartes de chaleur.", when: "Pour diagnostiquer pourquoi une page qui reçoit du trafic ne convertit pas." },
      ],
      caution:
        "Des outils qui mesurent les sessions mais pas la demande. Si l'envoi du formulaire n'est pas un événement suivi, le site ne peut pas être amélioré sur des preuves et chaque discussion à son sujet devient une affaire de goût.",
    },

    source: {
      id: "source",
      name: "Code source et processus",
      purpose:
        "Où vit le code et comment les changements se rendent en production. Présent seulement à partir du niveau 3 — et à partir de là, ce n'est pas facultatif.",
      entries: [
        { tech: "GitHub", what: "Historique des versions, révision, et la trace du pourquoi des changements.", when: "Tout développement sur mesure. C'est aussi votre police d'assurance contre un point de défaillance humain unique." },
        { tech: "Déploiements d'aperçu", what: "Chaque changement obtient une adresse avant d'être en ligne.", when: "Frontaux sur mesure — ça transforme la révision d'une description en quelque chose de cliquable." },
      ],
      caution:
        "Du code sur mesure sans dépôt auquel l'entreprise a accès. Si la seule copie est sur le portable d'un pigiste, vous ne possédez pas le site, peu importe ce que disait la facture.",
    },
  },

  myths: {
    database: {
      id: "database",
      claim: "…d'une base de données",
      usually:
        "Un site vitrine ne stocke rien. Les formulaires de contact envoient un courriel. Les articles vivent dans le CMS. Les produits vivent dans la plateforme de commerce. Si rien n'a besoin d'être écrit, relu et rattaché à une personne précise, une base de données n'a rien à faire — et elle demandera quand même des sauvegardes, des migrations et quelqu'un qui la comprend.",
      justifiedWhen: [
        "Des utilisateurs ont des comptes et voient des dossiers qui leur appartiennent.",
        "L'entreprise doit interroger ses propres données d'une façon qu'un CMS ne peut pas exprimer.",
        "Quelque chose doit persister entre les sessions — travail sauvegardé, progression, historique de commandes que vous contrôlez.",
        "Des documents ou des médias téléversés doivent être associés à une personne ou à une organisation.",
      ],
      instead:
        "Laissez le CMS être la base de données du contenu et la plateforme de commerce celle des produits. Envoyez les soumissions de formulaire vers un courriel et un CRM.",
    },

    auth: {
      id: "auth",
      claim: "…de comptes utilisateurs",
      usually:
        "On ajoute des connexions parce que ça fait professionnel, puis personne ne se connecte. Chaque compte créé est un mot de passe à réinitialiser, une session à sécuriser, une obligation en matière de vie privée, et quelque chose à supprimer quand on vous le demande. Protéger du contenu qui ne vaut pas cette friction réduit systématiquement son auditoire.",
      justifiedWhen: [
        "Des gens doivent voir des données qui sont vraiment les leurs et ne doivent pas voir celles des autres.",
        "L'accès est ce que vous vendez — adhésion, formation, abonnement.",
        "Le personnel utilise le système et ses actions doivent être attribuables.",
      ],
      instead:
        "Envoyez le fichier. Utilisez un lecteur ou un espace partagé pour les documents clients. Si c'est vraiment un espace membre, commencez par un produit d'adhésion avant de bâtir l'identité vous-même.",
    },

    "custom-ecommerce": {
      id: "custom-ecommerce",
      claim: "…d'un commerce sur mesure",
      usually:
        "Une caisse ressemble à un formulaire et n'en est pas un. Les taxes entre juridictions, la validation d'adresses, la détection de fraude, la portée PCI, la couverture des moyens de paiement, les reprises sur cartes refusées, les remboursements et les rétrofacturations représentent des années de travail qui s'améliorent sans vous sur une plateforme hébergée. Le meilleur résultat réaliste d'une reconstruction, c'est l'égalité — et ensuite c'est à vous pour toujours.",
      justifiedWhen: [
        "Les prix sont négociés par client ou par contrat.",
        "Vous louez plutôt que de vendre, avec disponibilités, retours et état à suivre.",
        "Les produits se configurent au lieu de se choisir, avec des options dépendantes et des règles de prix.",
        "C'est une place de marché : vendeurs tiers, partage des paiements, leur propre inventaire.",
        "Un ERP ou un PIM doit rester la source de vérité et la vitrine doit le suivre.",
      ],
      instead:
        "Utilisez Shopify et mettez l'argent dans le thème, les données de produits et la mise en marché. Si l'expérience de vitrine est vraiment un facteur de différenciation, allez découplé — et gardez la caisse de Shopify.",
    },

    "custom-cms": {
      id: "custom-cms",
      claim: "…d'un CMS sur mesure",
      usually:
        "« Notre contenu est particulier » veut presque toujours dire « notre modèle de contenu n'a jamais été écrit ». Le logiciel éditorial contient des décennies de travail d'ergonomie — brouillons, rôles, programmation, médias, aperçus, historique de révisions — et un panneau maison part derrière sur les six et recule chaque année.",
      justifiedWhen: [
        "Le modèle de contenu est vraiment inexprimable dans un CMS configurable — profondément relationnel, versionné de façon inhabituelle, ou réglementé.",
        "L'édition EST le produit, comme pour un outil de publication.",
      ],
      instead:
        "Modélisez le contenu correctement dans un CMS découplé. Presque toutes les discussions « il nous faut un CMS sur mesure » se terminent par un bon schéma dans un CMS existant.",
    },

    microservices: {
      id: "microservices",
      claim: "…de microservices",
      usually:
        "Les microservices règlent un problème d'organisation : plusieurs équipes qui doivent livrer indépendamment. Pour une seule équipe, ils transforment de simples appels de fonction en appels réseau qui peuvent échouer, et un déploiement en plusieurs. Une seule application bien structurée mènera une entreprise bien plus loin que les diagrammes d'architecture le laissent croire.",
      justifiedWhen: [
        "Plusieurs équipes se bloquent réellement les unes les autres au moment de livrer.",
        "Un composant mesuré a des besoins de ressources si différents qu'il doit monter en charge séparément.",
        "Une frontière réglementaire exige la séparation physique d'un sous-système.",
      ],
      instead:
        "Bâtissez une seule application bien organisée avec des frontières internes claires. Séparer quelque chose qui fonctionne est simple; assembler quelque chose qui n'a jamais fonctionné, non.",
    },

    ai: {
      id: "ai",
      claim: "…d'une couche d'IA",
      usually:
        "L'IA ajoutée parce que c'est attendu produit un robot conversationnel qui répond moins bien que la page de foire aux questions, et un coût de soutien. La bonne question n'est jamais « où peut-on ajouter de l'IA » mais « quel jugement répété est coûteux, tolérant à la révision, et assez fréquent pour compter ».",
      justifiedWhen: [
        "Une tâche répétée exige de lire de l'information non structurée et de porter un jugement — trier des demandes, extraire des champs de documents, classer des billets.",
        "Le volume est assez élevé pour qu'un gain en pourcentage représente de l'argent réel.",
        "Une personne peut réviser le résultat, et une mauvaise réponse est récupérable.",
      ],
      instead:
        "Corrigez d'abord le contenu — une page de prix claire bat un robot qui explique les prix. Ensuite, automatisez le jugement précis, ennuyeux et à haut volume plutôt que d'ajouter un assistant polyvalent.",
    },

    headless: {
      id: "headless",
      claim: "…d'une architecture découplée",
      usually:
        "Passer au découplé double le nombre de systèmes à entretenir et le nombre d'endroits où un changement doit être fait. On l'achète bien plus souvent pour la performance qu'on en a besoin pour ça — la plupart des sites lents le sont à cause des images, des scripts tiers et de la prolifération d'extensions, et l'architecture ne règle rien de tout ça.",
      justifiedWhen: [
        "Le contenu doit alimenter plus d'une surface — un site, une application, des écrans en magasin, un flux partenaire.",
        "Le frontal est vraiment sur mesure et le rendu de la plateforme est la contrainte que vous avez mesurée.",
        "Le contenu doit survivre à plusieurs refontes sans être ressaisi.",
      ],
      instead:
        "Mesurez d'abord. Corrigez les images, les scripts et l'hébergement sur la plateforme que vous avez; si c'est encore la contrainte après ça, l'argument pour le découplé sera précis plutôt qu'aspirationnel.",
    },

    "mobile-app": {
      id: "mobile-app",
      claim: "…d'une application mobile",
      usually:
        "Une application doit être installée, mise à jour, approuvée et livrée par deux magasins d'applications, et elle démarre avec un auditoire de zéro. À moins d'avoir une raison d'être sur l'écran d'accueil, un site web rapide et bien adapté rejoint tout le monde immédiatement et se modifie le même après-midi.",
      justifiedWhen: [
        "Vous avez besoin de quelque chose que seul un appareil fournit — usage hors ligne, notifications poussées, caméra ou position en arrière-plan.",
        "L'usage est habituel et assez fréquent pour que l'icône sur l'écran d'accueil vaille la friction d'installation.",
        "La distribution par les magasins d'applications est elle-même le canal.",
      ],
      instead:
        "Bâtissez d'abord un site rapide et vraiment adaptatif. Si l'installabilité est la seule exigence, une application web progressive en couvre une bonne partie sans deux bases de code de plus.",
    },
  },

  questions: {
    selling: {
      prompt: "Est-ce que les gens vont vous payer sur le site web?",
      help: "De l'argent qui change de mains sur le site — pas une facture que vous envoyez après.",
      answers: {
        no: { label: "Non", blurb: "Demandes, appels, soumissions, ou paiement ailleurs" },
        occasional: {
          label: "À l'occasion, ou pour quelques articles seulement",
          blurb: "Dépôts, une poignée d'articles, une formation, une facture",
        },
        catalogue: { label: "Oui — un vrai catalogue", blurb: "Des produits avec variantes, stock et livraison" },
        subscription: {
          label: "Oui — un accès récurrent à quelque chose",
          blurb: "Un abonnement, une adhésion, un logiciel",
        },
      },
    },

    commerce_fit: {
      prompt: "Est-ce que votre façon de vendre brise une boutique normale?",
      help: "Pas « êtes-vous spéciaux » — est-ce que la mécanique diffère de choisir un article, payer et se le faire livrer.",
      answers: {
        normal: { label: "Non, c'est une boutique normale", blurb: "On choisit, on paie, on livre ou on ramasse" },
        content: {
          label: "Normale, mais on publie sérieusement aussi",
          blurb: "Contenu éditorial, guides et campagnes à côté du catalogue",
        },
        unusual: {
          label: "Oui, vraiment",
          blurb: "Prix par client, location, configurateurs, place de marché, ou un ERP aux commandes",
        },
      },
    },

    accounts: {
      prompt: "Est-ce que quelqu'un doit se connecter?",
      help: "Se connecter pour voir ou faire quelque chose qui lui appartient en propre.",
      answers: {
        no: { label: "Non", blurb: "Tout sur le site est public" },
        clients: { label: "Nos clients, pour voir leurs affaires", blurb: "Fichiers, rendez-vous, commandes, progression" },
        staff: { label: "Seulement notre équipe, à l'interne", blurb: "Un outil d'opérations plutôt qu'un site web" },
        public: { label: "N'importe qui peut s'inscrire", blurb: "En libre-service, et facturé automatiquement" },
      },
    },

    portal_scope: {
      prompt: "Est-ce qu'un produit qui s'achète ferait déjà l'essentiel?",
      help: "Un portail client dans votre CRM, une plateforme de formation, un outil d'adhésion, un espace de travail partagé.",
      answers: {
        maybe: { label: "Probablement — on n'a pas vraiment regardé", blurb: "Le besoin a l'air assez standard" },
        no: {
          label: "Non — on a regardé, rien ne convient",
          blurb: "Les données ou les règles sont propres à notre façon de travailler",
        },
      },
    },

    editing: {
      prompt: "Qui modifie le site, et à quelle fréquence?",
      answers: {
        rarely: { label: "Rarement, et demander à quelqu'un convient", blurb: "Quelques changements par année" },
        team: { label: "Notre équipe publie régulièrement", blurb: "Des non-techniciens, sans attendre après un développeur" },
        editorial: {
          label: "Plusieurs rédacteurs, avec un vrai processus",
          blurb: "Brouillons, révision, programmation, catégories, médias",
        },
      },
    },

    workflow: {
      prompt: "Y a-t-il un processus fait à la main qu'aucun de vos outils ne gère?",
      help: "Soumissions, répartition, approbations, conciliation — le chiffrier que tout le monde sait être un problème.",
      answers: {
        no: { label: "Non, nos outils couvrent ça", blurb: "Ou les trous sont mineurs" },
        manual: { label: "Oui, et ça nous coûte du vrai temps", blurb: "Des gens qui retapent des données d'un système à l'autre" },
      },
    },

    search: {
      prompt: "À quel point votre entreprise dépend d'être trouvée dans la recherche?",
      answers: {
        known: { label: "Pas beaucoup", blurb: "Les gens arrivent en connaissant notre nom — références, clients réguliers, bouche-à-oreille" },
        channel: { label: "C'est un de nos canaux principaux", blurb: "Pages de services, emplacements, un blogue qui vaut la peine" },
        primary: {
          label: "C'est LE canal",
          blurb: "Beaucoup de pages, et les classements décident du mois",
        },
      },
    },
  },

  outcomes: {
    "simple-site": {
      title: "Un constructeur hébergé est vraiment la bonne réponse",
      stack: "Framer ou Squarespace · votre propre domaine · fiche Google Entreprise · Analytics et Search Console",
      why: "Rien de ce que vous avez décrit n'exige une base de données, une connexion, un CMS ou un déploiement. Ça exige une structure claire, un design crédible, des pages rapides et un formulaire qui se rend à une personne — et un constructeur hébergé fait tout ça sans rien créer que vous deviez entretenir. Mettez le budget que vous venez d'économiser dans les photos et dans la rédaction des pages, parce que c'est ça qui décidera vraiment si le site fonctionne.",
      changesIf:
        "Vous commencez à vouloir beaucoup de pages qui partagent une structure — des services par quartier, une bibliothèque qui grandit — ou la recherche devient un canal où vous vous battez. C'est le passage à un site géré par un CMS, et c'est une vraie raison.",
      level: "l1",
      scenario: "simple-business",
    },

    "marketing-site": {
      title: "Un site marketing géré par un CMS",
      stack: "Webflow, ou WordPress si votre équipe y vit déjà · des collections structurées pour les types de pages répétés · des mesures respectueuses du consentement",
      why: "Vous avez des types de pages répétés et une équipe qui publie — c'est exactement à ça que sert un CMS. La valeur, c'est qu'une page de service ou d'emplacement existe une seule fois comme structure : produire la vingtième ne coûte presque rien et elles restent toutes cohérentes. Choisissez Webflow si vous voulez que l'hébergement et les mises à jour soient gérés; choisissez WordPress si vous avez déjà l'équipe, les extensions et quelqu'un de responsable de l'entretien.",
      changesIf:
        "La performance prend une importance commerciale, le design se met à se battre contre le constructeur, ou le contenu doit alimenter une deuxième surface. Là, un frontal sur mesure avec un CMS découplé commence à se rentabiliser.",
      level: "l2",
      scenario: "marketing-seo",
    },

    "custom-marketing-site": {
      title: "Un frontal sur mesure avec un CMS découplé",
      stack: "Next.js sur Vercel · Sanity ou un CMS découplé équivalent · GitHub avec déploiements d'aperçu · Search Console et mesures branchées sur la demande, pas sur la visite",
      why: "Quand les classements décident du mois et que le nombre de pages est élevé, la plateforme cesse d'être un détail. Il vous faut le contrôle de ce qui est envoyé au navigateur, des canoniques, des redirections, des données structurées et — si vous êtes bilingues — du hreflang et de l'architecture des URL. Séparer le contenu de la présentation fait aussi que la prochaine refonte n'oblige pas à ressaisir des années de contenu. C'est l'option la plus chère qui ne soit pas une application, et c'est le trafic qui la justifie.",
      changesIf:
        "Quelqu'un doit se connecter et voir des données qui lui appartiennent. C'est un autre projet, avec une base de données dedans, et il devrait être cadré comme tel plutôt qu'ajouté à celui-ci.",
      level: "l3",
      scenario: "marketing-seo",
    },

    publisher: {
      title: "Une pile de publication, avec le flux éditorial comme exigence",
      stack: "CMS découplé avec rôles, brouillons et programmation · frontal Next.js · un traitement des médias qui gère correctement les formats et les tailles",
      why: "Avec plusieurs rédacteurs, l'expérience éditoriale est une exigence d'affaires plutôt qu'un confort : brouillons, révision, programmation et une taxonomie qui tient encore debout à mille articles. Séparer le contenu de la présentation est ce qui permet à l'archive de rester rapide, de rester indexée et de survivre aux refontes. Si votre équipe connaît déjà WordPress et que les exigences de performance sont ordinaires, l'utiliser de façon classique est une réponse tout à fait défendable — ne découplez pas par mode.",
      changesIf:
        "Un mur payant, des abonnements ou des comptes lecteurs. Ça introduit des utilisateurs et des choses qui leur appartiennent : c'est un cran de plus et un autre budget.",
      level: "l3",
      scenario: "publisher",
    },

    "payments-link": {
      title: "Encaisser sans bâtir de boutique",
      stack: "Le niveau où votre site est déjà · liens de paiement Stripe ou caisse hébergée · un outil de facturation si vous facturez",
      why: "Une poignée d'articles, des dépôts ou des paiements occasionnels, c'est un problème de paiement, pas un problème de commerce. Stripe règle ça sur un site de niveau 1 pour le prix d'un après-midi, sans frais de plateforme, sans catalogue à entretenir et sans boutique à mettre en marché. Des entreprises se retrouvent régulièrement à faire vivre une plateforme de commerce pour quatre transactions par mois, puis à payer pour l'entretenir.",
      changesIf:
        "Le catalogue grandit, ou il vous faut du stock, des variantes, des règles de livraison et la gestion des commandes. C'est là qu'une vraie plateforme de commerce cesse d'être un fardeau et devient l'option la moins chère.",
      level: "l1",
      scenario: "ecommerce",
    },

    shopify: {
      title: "Shopify, et l'effort dans la boutique plutôt que dans la plomberie",
      stack: "Shopify · un thème bien construit · des données de produits propres · Shopify Payments · courriels et séquences de paniers abandonnés",
      why: "Rien de ce que vous avez décrit ne brise une boutique normale, et la caisse est la chose la plus coûteuse à construire en commerce et la moins visible. Les taxes, la fraude, la couverture des paiements, les reprises, les remboursements et la portée PCI arrivent entretenus, et ils s'améliorent sans vous. L'argent est bien mieux investi dans le thème, la photographie, les données de produits et la mise en marché, parce que c'est à ça que les clients réagissent vraiment.",
      changesIf:
        "Votre façon de vendre cesse vraiment de rentrer — prix contractuels, location, configurateurs, place de marché, ou un ERP qui doit être aux commandes. Là, une vitrine sur mesure ou du commerce sur mesure devient une vraie discussion.",
      level: "l2",
      scenario: "ecommerce",
    },

    "shopify-content": {
      title: "Shopify pour le commerce, avec une vraie couche de contenu",
      stack: "Shopify pour le catalogue et la caisse · une expérience de contenu sur mesure ou gérée par un CMS · une seule navigation et une seule marque pour les deux",
      why: "Vous faites deux métiers en même temps : vendre, et publier assez bien pour que le contenu soit un canal. Shopify s'occupe du commerce; là où il est plus faible, c'est l'éditorial. Les deux réponses viables sont une solide construction de contenu dans Shopify, ou une vitrine sur mesure qui lit Shopify par son API Storefront — en gardant la caisse de Shopify dans les deux cas. La décision dépend du vrai volume éditorial, alors comptez les articles publiés l'an dernier avant de choisir.",
      changesIf:
        "L'opération éditoriale est petite en pratique. Alors gardez tout dans Shopify — un deuxième système à entretenir pour six articles par année est un mauvais échange.",
      level: "l3",
      scenario: "ecommerce",
    },

    "headless-commerce": {
      title: "Du commerce qu'une plateforme ne peut vraiment pas exprimer",
      stack: "Portée écrite avant de construire quoi que ce soit · le moteur de Shopify conservé partout où c'est possible · du sur mesure seulement pour la partie qui est réellement différente",
      why: "Les prix par client, la location, les configurateurs, les places de marché et les catalogues pilotés par un ERP sont de vraies raisons pour lesquelles une boutique normale ne convient pas — et elles sont plus rares qu'on le prétend, alors le premier travail est de confirmer que la vôtre en est une. Même là, la bonne forme est habituellement de garder le plus possible de la plateforme et de ne bâtir que la partie qui diffère. Reconstruire la caisse devrait être la dernière chose envisagée, pas la première.",
      changesIf:
        "La partie inhabituelle s'avère être une seule étape d'un processus par ailleurs ordinaire. Quatre-vingt-dix pour cent acheté et dix pour cent construit gagne à tout coup.",
      level: "l4",
      scenario: "ecommerce",
    },

    "buy-before-build": {
      title: "Achetez le portail avant d'en bâtir un",
      stack: "Un produit existant — le portail client de votre CRM, une plateforme de formation ou d'adhésion, un espace de travail partagé · votre site actuel, inchangé",
      why: "Ce que vous avez décrit ressemble à un problème résolu, et les problèmes résolus valent la peine d'être achetés. Un produit vous donne les comptes, les permissions, les réinitialisations de mot de passe, la gestion de la vie privée et une équipe de soutien, et rien de ça n'est ce qui distingue votre entreprise. Le bâtir vous-même veut dire posséder l'identité, le contrôle d'accès et les données d'autrui, pour de bon. Regardez d'abord ce qui existe — et si rien ne convient, vous saurez exactement pourquoi, ce qui rendra le développement sur mesure bien mieux défini.",
      changesIf:
        "Vous regardez et vraiment rien ne convient, parce que les données ou les règles sont propres à votre façon de travailler. Alors un portail sur mesure est justifié, et vous le cadrerez à partir de ce que les produits ont mal fait.",
      level: "l2",
      scenario: "membership",
    },

    portal: {
      title: "Un portail client — une application avec un site web à côté",
      stack: "Next.js · Supabase ou Postgres avec règles d'accès par rangée · une authentification que vous n'avez pas écrite vous-même · Stripe si c'est facturé · Resend pour les courriels transactionnels",
      why: "Dès que des données appartiennent à une personne précise, vous assumez le contrôle d'accès, la gestion des sessions, les obligations de confidentialité et les demandes de suppression. C'est pour ça que ce cran existe et pourquoi ce n'est pas une fonction qu'on ajoute à un site vitrine. Utilisez des services infogérés pour les parties identiques dans tous les produits — identité, facturation, courriel — et ne construisez que ce qui vous est propre. Garder le site vitrine public sur une plateforme plus simple est habituellement le bon choix, pour qu'un changement de contenu n'exige jamais un déploiement.",
      changesIf:
        "N'importe qui peut s'inscrire sans intervention et être facturé automatiquement, avec des organisations qui ne doivent jamais se voir. C'est un produit, et ça demande tout l'attirail du niveau 5.",
      level: "l4",
      scenario: "membership",
    },

    "internal-tool": {
      title: "Un outil interne — le logiciel sur mesure le moins cher, si la portée est honnête",
      stack: "Configurer une plateforme existante quand c'est possible · sinon Next.js par-dessus Postgres, avec rôles et piste de vérification · des intégrations aux systèmes qui détiennent déjà les données",
      why: "Les utilisateurs sont vos propres employés, alors l'interface peut être sobre et les cas limites peuvent être traités par une personne — ce qui rend les outils internes particulièrement rentables quand le processus est vraiment particulier. Le risque, c'est la portée : la demande vise souvent un système qui remplace quatre outils, alors que ce qui enlève la douleur, c'est un écran qui élimine une heure répétée par semaine. Bâtissez cet écran d'abord, et soyez honnête sur la possibilité qu'une plateforme existante bien configurée le batte.",
      changesIf:
        "Vous le vendriez à d'autres. C'est une autre entreprise, avec d'autres exigences — multilocation, facturation en libre-service, soutien — et ça appartient au niveau 5.",
      level: "l4",
      scenario: "internal-tools",
    },

    saas: {
      title: "Un produit, pas un site web",
      stack: "Next.js sur Vercel · Postgres via Supabase avec isolation par client · Supabase Auth ou Clerk · abonnements Stripe · Resend · GitHub avec aperçus et préproduction · suivi des erreurs et alertes de disponibilité",
      why: "C'est le cas où l'architecture sur mesure est la réponse évidente, parce que le logiciel est ce que vous vendez. La discipline qui compte n'est pas « est-ce que ça devrait être sur mesure » mais « à quel point peut-on en construire peu pour la version un ». Achetez l'authentification, la facturation, le courriel et la surveillance; ne construisez que la partie pour laquelle les clients paient. Les équipes qui écrivent leur propre authentification et leur propre facturation pour économiser des abonnements y perdent un trimestre et héritent du fardeau de sécurité pour toujours. Oubliez les microservices — une seule application bien structurée vous mènera bien plus loin que les diagrammes le suggèrent.",
      changesIf:
        "L'hypothèse produit n'est pas encore prouvée. Une version manuelle derrière un formulaire et un chiffrier répond à la question qui compte pour une fraction du prix.",
      level: "l5",
      scenario: "saas",
    },

    "separate-system": {
      title: "Deux projets, pas un site web plus gros",
      stack: "Gardez le site au niveau le plus simple qui le sert · cadrez le processus séparément : une automatisation si des données doivent juste circuler, un outil interne si le processus doit être encodé",
      why: "C'est la réponse la plus utile que cet outil donne. Un processus manuel pénible est une raison de bâtir un logiciel; ce n'est pas une raison de reconstruire le site web autour. Fusionner les deux produit un site qui demande un développeur pour changer un numéro de téléphone et un outil qui hérite des contraintes d'un site vitrine. Gardez-les séparés : le site reste économique à posséder et facile à modifier, et le processus est cadré selon ses propres mérites — où la première question est de savoir si un produit existant ou une simple automatisation le règle déjà.",
      changesIf:
        "Le processus s'avère être des données qui circulent entre deux outils que vous payez déjà. C'est une automatisation qui se mesure en jours, pas un système.",
      level: "l4",
      scenario: "internal-tools",
    },
  },
};
