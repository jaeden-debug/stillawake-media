import type { PlatformGuide } from "@/lib/llms-txt-guides/types";

/**
 * Next.js — version française (Québec).
 *
 * La fiche anglaise porte sur le piège de cache : dans l'App Router, un Route
 * Handler n'est pas mis en cache par défaut, donc chaque passage de robot
 * déclenche une invocation. Ce piège existe aussi en français et la fiche le
 * répète, mais l'angle propre à cette page est ailleurs : sur un site
 * bilingue — celui-ci sert l'anglais à la racine et le français sous /fr —
 * la question qui revient est « où mettre le /fr/llms.txt ». La convention
 * n'en prévoit pas, et c'est ce que cette page explique.
 */
export const nextjsGuideFr: PlatformGuide = {
  slug: "nextjs",
  platform: "Next.js",
  locale: "fr",
  status: "verified",

  primaryKeyword: "llms.txt next.js",
  secondaryKeywords: [
    "créer un fichier llms.txt",
    "llms.txt app router",
    "route handler llms.txt",
    "générer llms.txt next js",
  ],

  title: "llms.txt dans Next.js : Route Handler ou fichier statique",
  description:
    "Les trois façons de servir /llms.txt depuis un site Next.js App Router, pourquoi un Route Handler non mis en cache se recalcule à chaque passage de robot, et comment traiter un site bilingue français-anglais qui n'a droit qu'à un seul fichier.",

  intro:
    "Servir /llms.txt depuis Next.js prend dix minutes ; servir un fichier qui reste vrai est le vrai sujet. Vous avez trois options réelles — un fichier statique dans public/, un Route Handler prérendu au build, ou un Route Handler exécuté à chaque requête — et elles se distinguent surtout par leur façon d'échouer. Il faut aussi trancher une question que les guides anglophones ignorent : sur un site bilingue avec l'anglais à la racine et le français sous /fr, la convention ne prévoit qu'un seul fichier, à la racine du domaine. Le bilinguisme se règle donc dans le contenu du fichier, pas dans le routage.",

  supportStatus: {
    kind: "manual",
    summary:
      "Aucune convention intégrée. Next.js prévoit des fichiers de métadonnées spéciaux pour robots.txt et sitemap.xml, mais llms.txt n'en fait pas partie : vous l'implémentez vous-même, le plus proprement avec un Route Handler.",
  },

  fileLocation:
    "Soit public/llms.txt pour un fichier statique, soit un Route Handler dans app/llms.txt/route.ts — src/app/llms.txt/route.ts si vous utilisez le dossier src. Un nom de dossier contenant un point est parfaitement valide.",
  implementationMethod:
    "Route Handler exportant une fonction GET, avec export const dynamic = \"force-static\" pour le prérendre au moment du build. Comportement vérifié contre Next.js 16.3.0 dans ce dépôt, documentation en version 16.3.1.",

  prerequisites: [
    "Un projet Next.js utilisant l'App Router. Les valeurs par défaut de cache décrites ici sont propres à l'App Router et ne s'appliquent pas au Pages Router.",
    "Une source de vérité à partir de laquelle générer le contenu : un tableau de services, une requête au CMS, votre module d'entités. Si la seule source est une chaîne écrite à la main, utilisez public/ et acceptez la dérive.",
  ],

  steps: [
    {
      title: "Choisissez le mode d'échec que vous acceptez",
      body: "Un fichier dans public/llms.txt est servi directement et ne coûte rien, mais c'est une copie des faits de votre site que rien ne synchronise : il devient faux en silence le jour où vous publiez une nouvelle page de service. Un Route Handler généré à partir des vraies données ne peut pas dériver, puisqu'il lit la même source que vos pages. Prenez public/ seulement si le site est petit et change rarement.",
    },
    {
      title: "Créez le Route Handler",
      body: "Ajoutez app/llms.txt/route.ts qui exporte une fonction GET renvoyant une Response. Déclarez le type de contenu explicitement : ce fichier doit être servi en texte brut pour être utile, et l'écrire évite de dépendre des valeurs par défaut du cadriciel. Rappel de la documentation : un route.ts et un page.tsx ne peuvent pas coexister au même segment de route, ce qui ne pose aucun problème ici.",
      code: {
        language: "ts",
        caption: "app/llms.txt/route.ts — un seul fichier qui couvre les deux langues",
        content: `import { siteUrl } from "@/lib/data";
import { organization } from "@/data/entities";
import { SERVICES } from "@/data/services";

// Dans l'App Router, les Route Handlers ne sont PAS mis en cache par défaut.
// Sans cette ligne, le fichier est régénéré à chaque requête de robot.
export const dynamic = "force-static";

export function GET() {
  const actifs = SERVICES.filter((s) => s.active);

  const corps = [
    \`# \${organization.name}\`,
    "",
    \`> \${organization.description}\`,
    "",
    "## Services (English)",
    ...actifs.map((s) => \`- \${s.name} — \${siteUrl}\${s.enPath}\`),
    "",
    "## Services (français)",
    ...actifs.map((s) => \`- \${s.nameFr} — \${siteUrl}\${s.frPath}\`),
    "",
  ].join("\\n");

  return new Response(corps, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}`,
      },
    },
    {
      title: "Activez la mise en cache explicitement",
      body: "C'est l'étape que tout le monde saute. Dans l'App Router, les Route Handlers ne sont pas mis en cache par défaut ; seule la méthode GET peut y adhérer, et elle le fait par une option de configuration de route. Ajouter export const dynamic = \"force-static\" prérend la réponse au build, ce qui convient à un fichier dont le contenu ne change qu'au déploiement. Sans ça, chaque robot qui récupère /llms.txt invoque votre fonction.",
    },
    {
      title: "Traitez le bilinguisme dans le contenu, pas dans les routes",
      body: "Rien ne vous empêche techniquement de créer app/fr/llms.txt/route.ts, mais la convention place le fichier à la racine du domaine et aucun robot n'ira chercher ailleurs. llms.txt ne possède aucun mécanisme équivalent à hreflang. La solution qui fonctionne est un fichier unique qui énumère explicitement les URL des deux langues, avec un intertitre par langue, comme dans l'exemple de Route Handler ci-dessus.",
    },
    {
      title: "Générez à partir de la même source que vos pages",
      body: "La seule raison d'utiliser un Route Handler plutôt qu'un fichier statique, c'est qu'il peut lire vos vraies données. Sur ce site, le gestionnaire importe les mêmes modules d'entités et de services que ceux qui produisent le JSON-LD et les pages de service : le fichier ne peut donc ni annoncer un service disparu ni oublier un service ajouté. Si votre llms.txt est généré depuis une autre source, vous entretenez deux choses.",
    },
    {
      title: "Déployez et confirmez le prérendu",
      body: "Après le build, regardez le tableau des routes. Une route marquée statique a été prérendue ; une route marquée dynamique s'exécutera à chaque requête, ce qui signifie presque toujours que l'export force-static manque ou que le gestionnaire touche à des données de requête. Sur Vercel et les plateformes équivalentes, c'est la différence entre une ressource statique en cache et une invocation de fonction par passage de robot.",
      code: {
        language: "bash",
        content: "npx next build\n# Repérez /llms.txt dans le tableau des routes et vérifiez qu'il est statique.",
      },
    },
  ],

  example: {
    caption:
      "La forme de sortie visée pour un site bilingue. Des faits et des URL, pas du texte de positionnement — et les deux langues nommées dans le même fichier.",
    language: "markdown",
    content: `# Studio Exemple

> Studio de développement web établi à Montréal. Site et services offerts en français et en anglais.

Site web : https://exemple.com
Langues : français (/fr), anglais (racine)

## Services — français

- Refonte de site web — à partir de 4 000 $ CA — https://exemple.com/fr/refonte-site-web
- Référencement technique — 1 200 $ CA/mois — https://exemple.com/fr/referencement-naturel

## Services — English

- Website redesign — from $4,000 CAD — https://exemple.com/website-redesign
- Technical SEO — $1,200 CAD/month — https://exemple.com/seo

## Pages clés

- [À propos](https://exemple.com/fr/a-propos)
- [Contact](https://exemple.com/fr/contact)`,
  },

  gotchas: [
    {
      title: "Les Route Handlers ne sont pas mis en cache par défaut",
      body:
        "C'est l'erreur la plus fréquente et elle est silencieuse : le fichier est correct, il vous coûte simplement une invocation par requête. Dans l'App Router, un Route Handler n'est pas mis en cache tant qu'un GET n'y adhère pas par une option de configuration de route comme export const dynamic = \"force-static\". Les robots d'IA récupèrent les fichiers de découverte avec enthousiasme : c'est une ligne de coût réelle, pas théorique.",
    },
    {
      title: "Un /fr/llms.txt ne sera lu par personne",
      body:
        "Sur un site bilingue, le réflexe est de dupliquer le gestionnaire sous le segment de langue. Techniquement Next.js l'accepte ; en pratique la convention situe le fichier à la racine du domaine et vous venez de créer une deuxième source de vérité que rien ne consulte. Un seul fichier, deux sections de langue.",
    },
    {
      title: "« use cache » ne s'utilise pas directement dans le corps du gestionnaire",
      body:
        "Si les Cache Components sont activés dans votre projet et que vous tentez d'y recourir dans le corps du Route Handler pour mettre en cache une requête coûteuse, ça ne fonctionnera pas. La documentation demande d'extraire le travail dans une fonction auxiliaire et de marquer celle-ci. À savoir avant de restructurer un gestionnaire autour d'une directive qui n'est pas valide à cet endroit.",
    },
    {
      title: "public/llms.txt et un Route Handler sont deux sources de vérité",
      body:
        "Si vous aviez déposé un fichier dans public/ et que vous ajoutez ensuite app/llms.txt/route.ts, deux définitions de la même URL cohabitent sans qu'on devine laquelle l'emporte. Supprimez le fichier de public/. Notez aussi que Next.js sert les fichiers de public/ avec Cache-Control: public, max-age=0 : la voie statique n'est donc pas automatiquement la moins chère.",
    },
    {
      title: "Générer le fichier depuis le sitemap donne un moins bon fichier",
      body:
        "Le raccourci tentant consiste à parcourir le même tableau qui alimente sitemap.ts. Un sitemap est une liste exhaustive d'URL ; llms.txt est une déclaration choisie de ce que fait l'entreprise et de ce qui compte. Déverser toutes les routes produit un long fichier sans aucune information d'entité — exactement le défaut que ce fichier est censé corriger.",
    },
  ],

  verificationMethod: [
    {
      title: "Confirmez le code et le type de contenu en production",
      body: "Le point d'accès doit renvoyer 200 avec un type de contenu texte brut. Si vous obtenez text/html, quelque chose rend une page : le plus souvent une route attrape-tout ou une réécriture qui intercepte le chemin avant le gestionnaire.",
      code: {
        language: "bash",
        content: 'curl -sI https://votresite.com/llms.txt | grep -iE "^(HTTP|content-type)"',
      },
    },
    {
      title: "Confirmez le prérendu plutôt que le calcul par requête",
      body: "Cherchez /llms.txt dans le tableau des routes de next build et vérifiez qu'il est listé comme statique. S'il est dynamique, l'export force-static manque ou le gestionnaire lit des données de requête. C'est la vérification qui attrape le piège de cache, et elle s'automatise facilement en intégration continue.",
      code: {
        language: "bash",
        content: "npx next build | grep -A2 'llms.txt'",
      },
    },
    {
      title: "Confirmez que les deux langues sont présentes et exactes",
      body: "Comparez les services et les URL listés dans le fichier à ce que le site offre réellement aujourd'hui, dans les deux langues. Une section française absente ou pointant vers des chemins anglais est le symptôme d'un fichier généré depuis une source partielle — précisément ce que l'approche par Route Handler doit empêcher.",
      code: {
        language: "bash",
        content: "curl -s https://votresite.com/llms.txt | grep -c 'exemple.com/fr/'",
      },
    },
  ],

  limitations: [
    "force-static fige le fichier au moment du build. Si vos services ou votre contenu changent par un CMS sans redéploiement, le fichier accusera un retard jusqu'au prochain déploiement : prévoyez une revalidation ou un déclencheur de rebuild si c'est important.",
    "Un fichier unique pour deux langues reste un compromis. Vous ne pouvez pas offrir à un assistant francophone une description française complète sans allonger le fichier pour tout le monde.",
    "Un Route Handler ne peut décrire que les données que votre application possède déjà. Il ne compense pas un site qui n'énonce nulle part ses prix, son territoire desservi ou qui le dirige.",
    "Le comportement de cache décrit ici a été vérifié contre Next.js 16.3.0 dans l'App Router. Les versions majeures antérieures et le Pages Router diffèrent, et Next.js a déjà changé ses valeurs par défaut de cache d'une majeure à l'autre.",
    "llms.txt demeure une proposition sans statut normatif. La servir est peu coûteux et sans risque ; ce n'est pas un levier de classement, et aucun moteur ne garantit de la lire.",
  ],

  verifiedDate: "2026-08-14",
  sources: [
    {
      label: "Next.js — Route Handlers (mise en cache, résolution de route)",
      url: "https://nextjs.org/docs/app/getting-started/route-handlers",
      kind: "primary",
    },
    {
      label: "Next.js — dossier public (service des fichiers statiques et en-têtes de cache)",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/public-folder",
      kind: "primary",
    },
    {
      label: "Next.js — convention de fichier route.js",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/route",
      kind: "primary",
    },
  ],

  relatedServices: [
    { label: "Développement logiciel", href: "/fr/developpement-logiciel" },
    { label: "Référencement IA (AEO)", href: "/fr/referencement-ia" },
  ],
  relatedGuides: ["shopify", "wordpress"],
};
