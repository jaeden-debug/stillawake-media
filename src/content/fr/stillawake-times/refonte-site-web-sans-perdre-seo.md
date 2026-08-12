---
title: "Refaire son site web sans perdre son référencement"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "La plupart des chutes de trafic après une refonte sont évitables. Voici les cinq causes réelles, la cartographie de redirections qui les prévient, et la marche à suivre avant, pendant et après la mise en ligne."
category: "SEO"
featured: false
author: "Jaeden Doody"
---

La refonte est le moment où les entreprises perdent le plus de trafic organique — et presque toujours pour des raisons qui n'ont rien à voir avec le design.

Le scénario est constant : le nouveau site est plus beau, tout le monde est content, et six semaines plus tard le trafic a fondu de moitié. Personne ne comprend pourquoi, parce que la cause a été introduite avant la mise en ligne et qu'elle est invisible à l'œil nu.

Voici ce qui se passe réellement, et comment l'éviter.

## Pourquoi le trafic tombe

Cinq causes expliquent la quasi-totalité des cas.

**Les URL ont changé sans redirection.** C'est la première, et de loin. Chaque ancienne adresse qui retourne une erreur 404 est une page qui disparaît de l'index, avec toute l'autorité qu'elle avait accumulée. Les liens externes qui pointaient vers elle ne mènent plus nulle part.

**Le contenu a été raccourci.** Les refontes s'accompagnent souvent d'un « nettoyage ». Une page de service qui faisait 1 500 mots en fait maintenant 300, parce que le nouveau design est plus épuré. Google avait classé les 1 500 mots.

**Les balises `noindex` de préproduction sont parties en production.** Le site de développement était bloqué pour éviter son indexation, et le blocage a suivi lors de la mise en ligne. C'est brutal, courant, et heureusement rapide à corriger — si on le détecte.

**Les titres et métadonnées ont été régénérés.** Le nouveau CMS applique un gabarit automatique et écrase des titres qui avaient été écrits pour des requêtes précises.

**La structure des liens internes a changé.** Le nouveau menu est plus épuré, donc plus court. Les pages qui recevaient des liens de la navigation n'en reçoivent plus. Elles deviennent orphelines et sortent progressivement de l'index.

Aucune de ces causes n'est une question de goût. Toutes sont mesurables avant la mise en ligne.

## Avant : l'inventaire

Le travail décisif se fait avant que quiconque touche au design.

### Listez toutes les URL indexées

Pas les pages que vous croyez avoir — celles que Google connaît. Trois sources à croiser :

Le rapport d'indexation de Search Console, qui donne ce qui est réellement indexé.

Un crawl complet du site actuel, qui donne ce qui est atteignable.

Vos analytiques sur douze mois, qui révèlent les pages recevant du trafic — y compris de vieilles pages oubliées qui rapportent encore.

Cette troisième source est celle qu'on saute, et c'est souvent là que se cachent les pages les plus rentables. Un article de 2021 qui amène trente visites qualifiées par mois n'apparaît nulle part dans les discussions de refonte, mais sa disparition se sent.

### Classez par valeur

Toutes les URL ne se valent pas. Pour chacune, notez le trafic organique, les mots-clés positionnés, les liens externes entrants, et les conversions.

Vous obtenez trois groupes :

**À préserver absolument** — trafic, positions ou liens. Ces URL survivent telles quelles ou sont redirigées avec un soin particulier.

**À fusionner** — plusieurs pages faibles traitant du même sujet. Elles deviennent une page forte, et toutes redirigent vers elle.

**À supprimer** — aucun trafic, aucun lien, aucune valeur. Elles retournent un 410. Supprimer volontairement est légitime ; c'est supprimer par accident qui coûte cher.

## La cartographie des redirections

C'est le livrable qui sauve la refonte. Un tableau : ancienne URL, nouvelle URL, type de redirection.

Quatre règles qui font la différence entre une carte qui fonctionne et une qui a l'air de fonctionner.

**Redirigez vers l'équivalent le plus proche, pas vers l'accueil.** Rediriger cinquante pages vers la page d'accueil est techniquement une redirection et fonctionnellement une suppression. Google traite une redirection vers une page sans rapport comme un « soft 404 » et ne transmet pas l'autorité. Si l'équivalent n'existe pas, la page la plus proche par sujet vaut mieux que l'accueil.

**Utilisez des 301, pas des 302.** La 301 est permanente et transmet l'autorité. La 302 dit « c'est temporaire, garde l'ancienne en mémoire ».

**Évitez les chaînes.** Si une page a déjà été redirigée par le passé, la nouvelle carte doit pointer la source d'origine directement vers la destination finale. A → B → C devient A → C et B → C. Chaque saut dilue.

**Testez la carte avant la mise en ligne.** Chaque ancienne URL doit retourner un 301 unique vers une destination qui retourne un 200. Ça s'automatise, et ça prend quelques minutes.

## Pendant : préserver ce qui classait

### Ne raccourcissez pas ce qui fonctionne

Si une page se classe, son contenu est un actif. Un design plus aéré n'oblige pas à supprimer du texte — il oblige à mieux le structurer. Sections, sous-titres, éléments repliables si nécessaire.

La question à poser devant chaque coupe : « est-ce que cette page se classe actuellement ? » Si oui, la charge de la preuve revient à celui qui veut couper.

### Conservez les titres et les H1

Les titres qui fonctionnent ont été écrits pour des requêtes précises. Un gabarit automatique qui produit « Services | Nom de l'entreprise » sur quarante pages détruit ce travail.

Migrez les métadonnées comme du contenu, pas comme de la configuration.

### Préservez l'architecture de liens internes

Faites l'inventaire des liens internes de l'ancien site avant de le remplacer. Les pages qui recevaient beaucoup de liens internes en recevaient pour une raison — elles comptaient. Si le nouveau menu est plus court, ces pages ont besoin d'autres points d'entrée : blocs contextuels, liens dans le corps du texte, pied de page.

### Gardez les mêmes URL quand c'est possible

La refonte la plus sûre est celle qui ne change pas les adresses. Si vos URL actuelles sont propres et descriptives, gardez-les. Changer une structure d'URL uniquement pour des raisons esthétiques est un risque sans contrepartie.

## Le jour de la mise en ligne

Une courte liste, dans l'ordre, avant d'ouvrir les vannes :

Vérifiez que le `robots.txt` de production n'est pas celui de la préproduction.

Cherchez `noindex` dans tout le site rendu. Une seule occurrence oubliée sur un gabarit peut désindexer une section entière.

Vérifiez que les balises canoniques pointent vers le domaine de production, pas vers l'environnement de test.

Exécutez la carte de redirections en entier et vérifiez les codes de statut.

Confirmez que le sitemap contient les **nouvelles** URL et pas les anciennes.

Vérifiez que le suivi analytique fonctionne — sinon vous serez aveugle pendant la période exacte où vous avez besoin de voir.

## Après : les quatre premières semaines

Une chute légère et temporaire est normale : Google doit réexplorer et réévaluer. Une chute qui s'aggrave après trois semaines ne l'est pas.

**Semaine 1.** Soumettez le nouveau sitemap. Surveillez les erreurs 404 dans Search Console — chacune est une redirection manquée. Corrigez-les au fur et à mesure ; c'est le travail le plus rentable de tout le projet.

**Semaine 2.** Vérifiez la couverture d'indexation. Les nouvelles URL apparaissent-elles ? Comparez le nombre de pages indexées avant et après.

**Semaine 3.** Comparez les positions par mot-clé, pas seulement le trafic global. Une baisse générale s'explique souvent par quelques pages précises. Repérez-les et regardez ce qui a changé sur elles.

**Semaine 4.** Si des pages ont perdu leurs positions, comparez l'ancienne version — via l'archive du web — avec la nouvelle. Dans la majorité des cas, le contenu a été raccourci ou le titre modifié.

Gardez les redirections en place **indéfiniment**. Les retirer après six mois rouvre exactement le problème que vous aviez évité ; certains liens externes et signets ne se mettront jamais à jour.

## Le cas particulier du bilinguisme

Si vous ajoutez ou réorganisez une version française pendant la refonte, deux points s'ajoutent.

Chaque langue conserve **ses propres URL**, et la carte de redirections doit traiter chaque langue séparément. Rediriger une ancienne page française vers la nouvelle page anglaise équivalente est une perte sèche.

Les balises `hreflang` doivent être **réciproques** dès la mise en ligne. Une déclaration unidirectionnelle est ignorée par Google — la balise existe, mais elle est inerte. C'est le genre de défaut qui ne casse rien visiblement et qui annule pourtant tout le bénéfice du travail bilingue.

## Ce qu'il faut retenir

Une refonte ne fait pas perdre de trafic. Ce sont les URL non redirigées, le contenu raccourci et les métadonnées écrasées qui en font perdre.

La partie qui protège votre référencement se joue avant la première maquette : lister ce que vous avez, mesurer ce que ça vaut, et décider explicitement du sort de chaque page. C'est une journée de travail sur un site moyen, et c'est la différence entre une refonte qui accélère la croissance et une refonte dont on met un an à se remettre.

Si vous ne retenez qu'une chose : la cartographie des redirections n'est pas une tâche technique de fin de projet. C'est le document de cadrage.
