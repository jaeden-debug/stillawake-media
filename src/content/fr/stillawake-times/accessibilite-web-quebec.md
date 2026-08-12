---
title: "L'accessibilité web : les corrections qui comptent, dans l'ordre"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "L'accessibilité est présentée comme une contrainte technique interminable. En pratique, huit corrections règlent la majorité des obstacles réels — et la plupart améliorent aussi votre référencement et vos conversions."
category: "Accessibilité"
featured: false
author: "Jaeden Doody"
---

L'accessibilité web souffre d'un problème de présentation. On la vend soit comme une obligation légale vague, soit comme une liste de deux cents critères techniques. Les deux découragent, et la plupart des sites n'y touchent jamais.

La réalité est plus simple : un petit nombre de défauts causent la majorité des blocages réels. Les corriger prend rarement plus d'une journée, et la plupart améliorent aussi votre référencement et votre taux de conversion — parce qu'un site utilisable par un lecteur d'écran est un site dont la structure est claire, et Google lit la même structure.

## Qui est concerné, réellement

Pas seulement les personnes aveugles. C'est l'idée fausse la plus limitante.

- Une personne malvoyante qui agrandit le texte à 200 %.
- Une personne daltonienne — environ un homme sur douze — pour qui « les champs en rouge sont obligatoires » ne veut rien dire.
- Une personne qui navigue au clavier, par handicap moteur ou par habitude.
- Une personne sourde devant une vidéo sans sous-titres.
- Une personne âgée dont la vue et la motricité fine ont baissé.
- Vous, avec le soleil sur l'écran, une main occupée, ou une connexion instable.

Cette dernière catégorie est celle qui convainc les sceptiques : l'accessibilité améliore l'expérience de tout le monde, dans des conditions imparfaites, qui sont les conditions normales.

## Les huit corrections qui comptent

Par ordre d'impact.

### 1. Le contraste du texte

Le défaut le plus répandu, et le plus facile à corriger. Le gris clair sur blanc est à la mode et illisible pour beaucoup de gens.

La règle : un rapport de contraste d'au moins 4,5:1 pour le texte normal, 3:1 pour les grands titres. Les outils de développement de votre navigateur le calculent directement.

Le piège fréquent : le texte gris pâle sur les libellés de formulaire et les notes de bas de page — précisément les endroits où l'information compte.

### 2. Le texte alternatif des images

Chaque image porteuse d'information a besoin d'une description. Chaque image purement décorative a besoin d'un attribut alt **vide** — pas absent, vide — pour que le lecteur d'écran l'ignore.

Ce qui ne fonctionne pas : « image1.jpg », « photo », ou une description qui ne dit pas ce qui compte. Pour un graphique, décrivez la conclusion, pas la forme.

Bénéfice secondaire : le texte alternatif est aussi ce qui vous fait exister dans la recherche d'images.

### 3. La navigation au clavier

Testez maintenant : posez la souris et parcourez votre site avec la touche Tab.

Trois questions. Pouvez-vous atteindre chaque lien et chaque bouton ? Voyez-vous **où vous êtes** à chaque instant ? Pouvez-vous fermer une fenêtre modale sans souris ?

Le défaut le plus courant est l'indicateur de focus supprimé en CSS parce qu'il était jugé laid. Sans lui, une personne au clavier navigue à l'aveugle. Si le contour par défaut ne vous plaît pas, remplacez-le par un style à vous — ne le supprimez pas.

### 4. La hiérarchie des titres

Un seul `h1` par page. Puis `h2`, puis `h3`, sans sauter de niveau. Les titres servent à la structure, pas à la taille du texte — si vous voulez du texte plus gros, utilisez du CSS.

Beaucoup de gens naviguent en sautant de titre en titre. Une hiérarchie cassée rend cette navigation inutilisable.

C'est aussi exactement ce que Google lit pour comprendre le plan de votre page. Une seule correction, deux bénéfices.

### 5. Les libellés de formulaire

Chaque champ a besoin d'un libellé réellement associé — pas seulement d'un texte gris à l'intérieur du champ.

Le texte d'espace réservé (`placeholder`) disparaît dès qu'on commence à taper. Quelqu'un qui hésite ne sait plus ce qu'on lui demandait.

Et les erreurs doivent être **textuelles**, pas seulement colorées. « Ce champ est obligatoire » à côté du champ, pas une bordure rouge.

### 6. Les liens qui disent où ils mènent

« Cliquez ici », « en savoir plus », « lire la suite ». Une personne qui parcourt la liste des liens d'une page entend « en savoir plus » quatorze fois.

Écrivez ce que le lien fait : « voir nos tarifs », « lire l'étude de cas BankDeMark ». C'est meilleur pour tout le monde, et c'est un signal de référencement.

### 7. L'attribut de langue

Le `<html>` doit déclarer la langue réelle de la page. Une page française servie en `lang="en"` sera lue par un lecteur d'écran avec une prononciation anglaise — incompréhensible.

Sur un site bilingue, ça veut dire `lang="fr-CA"` sur les pages françaises, pas seulement sur l'accueil. C'est un défaut courant quand la langue est fixée globalement plutôt que par page.

### 8. Les vidéos et le mouvement

Les vidéos porteuses d'information ont besoin de sous-titres. Une vidéo décorative en arrière-plan doit être muette et ne doit pas empêcher la lecture du contenu par-dessus.

Et respectez `prefers-reduced-motion` : certaines personnes ressentent des nausées face aux animations de défilement. C'est deux lignes de CSS.

## Ce que les surcouches automatiques ne règlent pas

Il existe des services qui promettent la conformité en ajoutant un script à votre site. Ils ajoutent un menu flottant avec des options de contraste et de taille de texte.

Ils ne corrigent pas les défauts sous-jacents. Un texte alternatif manquant reste manquant ; une hiérarchie de titres cassée reste cassée. Les organisations de personnes handicapées critiquent largement ces outils, et plusieurs poursuites aux États-Unis ont visé des sites qui en utilisaient.

Corrigez le code. Il n'y a pas de raccourci, mais il y a beaucoup moins de travail qu'on vous le laisse croire.

## Le cadre au Québec et au Canada

Sans entrer dans le détail juridique : les organismes publics québécois sont soumis à des standards d'accessibilité, et la *Loi canadienne sur l'accessibilité* vise les entités sous réglementation fédérale. Pour une PME privée, l'obligation formelle est plus floue.

Mais l'argument légal n'est pas le meilleur argument. Une part significative de la population vit avec une limitation qui affecte l'usage du web, et cette proportion augmente avec le vieillissement. Ce sont des clients.

Et les huit corrections ci-dessus améliorent le référencement, la lisibilité mobile et les conversions pour tout le monde. Vous n'avez pas besoin d'une obligation légale pour justifier ça.

## Comment tester en une heure

**1. Parcourez le site au clavier**, sans souris. Le test le plus révélateur, et il est gratuit.

**2. Passez un vérificateur automatique** (l'onglet Lighthouse de Chrome en contient un). Il attrape le contraste, les alt manquants et la structure des titres. Il détecte environ le tiers des problèmes réels — utile, pas suffisant.

**3. Agrandissez à 200 %.** Le contenu reste-t-il lisible et utilisable ?

**4. Désactivez les images.** Comprend-on encore la page ?

**5. Lisez votre page en niveaux de gris.** L'information portée uniquement par la couleur disparaît.

Ces cinq tests prennent une heure et trouvent la majorité de ce qui compte.

## Ce qu'il faut retenir

L'accessibilité n'est pas une liste de deux cents critères. Pour la plupart des sites, c'est le contraste, les textes alternatifs, le focus au clavier, la hiérarchie des titres, les libellés de formulaire, des liens explicites, la bonne langue déclarée, et des sous-titres.

Commencez par le test au clavier. Il prend cinq minutes et vous dira immédiatement où vous en êtes.

Si vous préférez que ce soit fait plutôt qu'expliqué, voyez [notre service de création de site web](/fr/agence-web-montreal).
