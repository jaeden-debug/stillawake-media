---
title: "Le SEO technique, expliqué sans jargon (guide complet)"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "Le SEO technique est la fondation sous tout le reste. Sans lui, le bon contenu et les bons liens sous-performent. Voici chaque composante — exploration, indexation, données structurées, Core Web Vitals, rendu JavaScript — en langage clair."
category: "SEO"
featured: true
author: "Jaeden Doody"
---

Le SEO technique a mauvaise réputation parce qu'on l'explique mal. On le présente comme une liste d'éléments à cocher, sans jamais dire à quoi chacun sert. Résultat : des entreprises paient pour des « corrections techniques » sans comprendre ce qui a changé ni pourquoi.

Voici la version utile. Chaque section explique le mécanisme — pas seulement quoi faire, mais pourquoi ça compte et comment savoir si c'est brisé chez vous.

## Le modèle mental : trois étapes, pas une

Google fait trois choses distinctes avec votre site, et elles échouent séparément.

**Explorer** (*crawl*) : un robot demande vos pages. S'il ne peut pas les atteindre, rien d'autre n'a d'importance.

**Indexer** : Google décide de stocker la page dans son index. Une page explorée n'est pas nécessairement indexée — Google refuse activement les pages qu'il juge minces, dupliquées ou sans valeur.

**Classer** : parmi les pages indexées, Google choisit lesquelles montrer pour une requête.

La quasi-totalité des problèmes de SEO technique se situe aux étapes une et deux. Beaucoup d'entreprises optimisent le classement d'une page qui n'est même pas indexée. C'est le premier diagnostic à faire : votre page est-elle dans l'index ? Si non, aucun travail de mots-clés ne changera quoi que ce soit.

## L'exploration : peut-on atteindre vos pages ?

### robots.txt

Ce fichier, à la racine du domaine, dit aux robots où ils peuvent aller. Une seule ligne mal placée peut retirer un site entier de Google.

```
User-agent: *
Disallow: /
```

Ces deux lignes bloquent tout. Elles se retrouvent en production plus souvent qu'on ne le croit — typiquement copiées depuis un environnement de préproduction. Vérifiez `votresite.com/robots.txt` maintenant, si vous ne l'avez jamais fait.

Nuance importante : `robots.txt` bloque l'**exploration**, pas l'**indexation**. Une page bloquée peut quand même apparaître dans Google si d'autres sites y pointent — sans description, parce que Google n'a jamais pu la lire. Pour retirer réellement une page, il faut `noindex`, et Google doit pouvoir explorer la page pour voir cette directive. Bloquer une page *et* y mettre `noindex` est contre-productif : le robot ne verra jamais la directive.

### Le sitemap XML

Le sitemap est une liste des URL que vous voulez voir indexées. Ce n'est pas une garantie d'indexation — c'est une suggestion.

Deux erreurs fréquentes le rendent inutile :

Il contient des pages qui redirigent, retournent une erreur, ou portent une balise `noindex`. Un sitemap contradictoire perd de sa crédibilité.

La date `lastmod` est régénérée à chaque déploiement. Si chaque mise en ligne réestampille les cent pages du site comme « modifiées aujourd'hui », le signal devient du bruit et Google cesse d'y accorder du poids. La date doit refléter une modification réelle du contenu.

### Les pages orphelines

Une page orpheline n'a aucun lien interne pointant vers elle. Elle peut exister, être dans le sitemap, retourner un code 200 — et rester non indexée pendant des mois.

La raison est logique : les liens internes sont la façon dont vous dites à Google ce qui compte sur votre site. Une page vers laquelle rien ne pointe déclare implicitement sa propre insignifiance. Le sitemap dit « cette page existe ». Les liens internes disent « cette page compte ». Google écoute davantage le second.

C'est une des causes les plus fréquentes de « page explorée, actuellement non indexée » dans Search Console, et une des plus faciles à corriger.

## L'indexation : Google veut-il de votre page ?

### Les balises canoniques

Une balise canonique dit : « quand plusieurs URL montrent ce contenu, voici la version officielle ».

Le même contenu est souvent accessible par plusieurs adresses : avec et sans `www`, en `http` et `https`, avec des paramètres de suivi, avec ou sans barre oblique finale. Sans canonique, Google voit du contenu dupliqué et doit deviner laquelle indexer. Il devine parfois mal.

La règle pratique : chaque page porte une canonique qui pointe vers elle-même, même sans doublon apparent. Ça coûte une ligne et prévient des problèmes subtils.

Les erreurs qui font mal : une canonique qui pointe vers une autre page (vous demandez à Google d'ignorer celle-ci), une canonique qui pointe vers un domaine de préproduction, ou une canonique qui contredit votre sitemap.

### « Explorée, actuellement non indexée »

C'est le message le plus frustrant de Search Console, parce qu'il ne dit pas pourquoi. Traduit : Google a lu la page et a décidé qu'elle ne valait pas la place.

Les causes réelles, par ordre de fréquence :

**Contenu mince.** La page existe pour occuper un mot-clé, sans rien apporter. Trois cents mots qui répètent le titre.

**Quasi-doublon.** La page ressemble trop à une autre page du site. C'est courant sur les pages « service + ville » générées en série.

**Page orpheline.** Voir plus haut.

**Site trop récent ou sans autorité.** Google alloue son budget d'exploration selon l'autorité perçue.

La correction n'est pas technique. On ne répare pas une page mince avec une balise. Il faut lui donner une raison d'exister — ou l'absorber dans une page qui en a une.

## Les données structurées

Les données structurées (le plus souvent en JSON-LD) décrivent votre page dans un vocabulaire que les machines comprennent. Elles ne changent pas ce que voit le visiteur.

Leur intérêt a doublé avec les moteurs de réponse. Un modèle de langage qui résume votre entreprise s'appuie volontiers sur des faits explicitement déclarés plutôt que déduits d'une mise en page.

Les types qui comptent pour une entreprise de services :

`Organization` — qui vous êtes, votre logo, vos profils officiels. Une seule fois, avec un identifiant stable.

`LocalBusiness` ou `ProfessionalService` — si vous servez une zone géographique.

`Article` — pour le contenu éditorial, avec un auteur réel.

`FAQPage` — seulement si les questions sont réellement visibles sur la page.

`BreadcrumbList` — la position de la page dans l'arborescence.

Deux règles évitent la majorité des problèmes. Premièrement, ne déclarez jamais en données structurées ce qui n'est pas visible sur la page — c'est une violation des consignes et ça finit par se retourner contre vous. Deuxièmement, utilisez des identifiants (`@id`) stables et référencez-les d'un bloc à l'autre. Deux blocs qui décrivent la même entreprise sans identifiant partagé, ce sont deux entreprises différentes aux yeux d'un consommateur de données.

## Les Core Web Vitals

Google mesure trois choses sur l'expérience réelle des visiteurs.

**LCP** (*Largest Contentful Paint*) : le temps avant que le plus gros élément visible s'affiche. Cible : moins de 2,5 secondes. C'est presque toujours une image ou une vidéo d'en-tête.

**INP** (*Interaction to Next Paint*) : le délai entre un clic et la réaction visible. Cible : moins de 200 millisecondes. C'est du JavaScript qui bloque le fil principal.

**CLS** (*Cumulative Layout Shift*) : le déplacement du contenu pendant le chargement. Cible : moins de 0,1. Cause dominante : des images sans dimensions déclarées, qui poussent le texte vers le bas en s'affichant.

Deux précisions que les rapports vendent mal.

Le score Lighthouse dans votre navigateur est une **simulation en laboratoire**. Google classe à partir de **données de terrain** — les mesures de vrais visiteurs, dans le rapport d'expérience Chrome. Un 100 en laboratoire avec de mauvaises données de terrain ne vous aide pas.

Et les Core Web Vitals sont un facteur de départage, pas un levier principal. Une page rapide et sans pertinence ne battra pas une page lente et pertinente. En revanche, entre deux pages comparables, la vitesse tranche — et la vitesse affecte directement le taux de conversion, ce qui compte indépendamment de Google.

## Le rendu JavaScript

Si votre site construit son contenu en JavaScript dans le navigateur, Google doit exécuter ce JavaScript pour voir quoi que ce soit. Il le fait, mais en deux temps et avec un délai variable.

Le test décisif est simple : affichez le code source de la page (`Ctrl+U`, pas l'inspecteur). Si votre texte principal, vos titres et vos liens n'y sont pas, vous dépendez du rendu.

Ce n'est pas fatal, mais c'est une dépendance inutile pour un site de contenu. Le rendu côté serveur ou la génération statique élimine le problème : le HTML arrive complet, le robot n'a rien à exécuter.

Le cas le plus dommageable est la navigation construite en JavaScript. Si vos liens internes n'existent pas dans le HTML, votre architecture de liens n'existe pas pour un robot qui ne rend pas — et toutes vos pages deviennent orphelines.

## Redirections et codes de statut

Une redirection **301** est permanente et transmet l'autorité. Une **302** est temporaire et n'en transmet pas de la même façon. Utilisez 301 pour tout changement définitif d'URL.

Deux problèmes reviennent :

**Les chaînes.** Page A redirige vers B, qui redirige vers C. Chaque saut est une occasion de perdre du signal. Pointez A directement vers C.

**Les boucles.** A vers B, B vers A. La page devient inaccessible.

Et une variante trompeuse : la « **soft 404** ». La page dit « produit introuvable » mais retourne un code 200. Google l'indexe comme une page valide, ou la classe elle-même comme soft 404. Une page absente doit retourner un vrai 404 ou 410.

## Le bilinguisme, si vous opérez au Québec

Un site bilingue ajoute une couche technique.

Chaque langue a besoin de **sa propre URL**. Un site qui change de langue sans changer d'adresse ne peut être indexé qu'une fois.

Les balises **`hreflang` doivent être réciproques**. Si la page française déclare son équivalent anglais mais que l'anglaise ne déclare rien en retour, Google ignore la déclaration. C'est une panne silencieuse : la balise est présente, simplement inerte.

L'attribut **`lang` du `<html>`** doit correspondre à la langue réelle. Une page française servie en `lang="en"` est mal étiquetée pour les moteurs et pour les lecteurs d'écran. Préférez `fr-CA` à `fr`.

Enfin, vérifiez que vos pages françaises **ne pointent pas vers des pages anglaises**. C'est un défaut invisible dans le CMS : les composants partagés — en-tête, pied de page, blocs d'appel à l'action — contiennent souvent des liens codés en dur vers les URL anglaises.

## Un ordre de diagnostic qui fonctionne

Face à un site qui ne performe pas, cet ordre évite de perdre du temps.

**1. La page est-elle indexée ?** Cherchez `site:votresite.com/la-page` dans Google. Si elle n'y est pas, tout le reste est prématuré.

**2. Est-elle explorable ?** Vérifiez `robots.txt` et l'absence de `noindex`.

**3. A-t-elle des liens internes ?** Si rien ne pointe vers elle, corrigez ça d'abord.

**4. Sa canonique pointe-t-elle vers elle-même ?**

**5. Le contenu existe-t-il dans le HTML source ?**

**6. Est-elle mince ou quasi identique à une autre page ?** C'est la cause la plus fréquente de non-indexation, et la seule qui exige du travail éditorial plutôt que technique.

**7. Alors seulement, regardez la vitesse et les données structurées.**

## Ce qu'il faut retenir

Le SEO technique ne fait pas grimper une page. Il enlève les raisons pour lesquelles elle ne peut pas grimper.

C'est pour ça qu'il vient en premier — pas parce que c'est le plus important, mais parce que tout le reste en dépend. Un excellent article sur une page non indexée vaut zéro. La même page, correctement explorable et reliée, laisse le contenu faire son travail.

Commencez par vérifier l'indexation. Tout part de là.

Si vous préférez que ce soit fait plutôt qu'expliqué, voyez [nos forfaits de référencement](/fr/agence-seo-montreal).
