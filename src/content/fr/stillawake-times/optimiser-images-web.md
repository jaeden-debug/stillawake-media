---
title: "Les images : la première cause de lenteur, et la plus facile à corriger"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "Sur la majorité des sites lents, les images pèsent plus que tout le reste réuni. Voici les formats, les dimensions et les attributs qui règlent le problème — généralement en une journée, sans toucher au design."
category: "Performance"
featured: false
author: "Jaeden Doody"
---

Sur la plupart des sites lents que j'ai audités, la cause dominante n'est ni l'hébergement, ni le thème, ni le JavaScript. Ce sont les images.

C'est une bonne nouvelle : c'est la partie la plus mécanique à corriger, elle ne demande aucune décision de design, et elle produit un gain immédiat et mesurable.

## Le problème type

Une photo sortie d'un appareil ou d'un téléphone pèse entre 3 et 8 Mo, en 4000 pixels de large. Elle est téléversée telle quelle, puis affichée dans un bloc de 800 pixels.

Le navigateur télécharge quand même les 8 Mo. Il les redimensionne ensuite pour l'affichage. Vous avez payé le transfert complet pour montrer un dixième de l'information.

Multipliez par douze images sur une page d'accueil et vous obtenez une page de 40 Mo qui met vingt secondes à charger sur un réseau cellulaire moyen.

## Les quatre corrections

### 1. Redimensionner avant de téléverser

La correction la plus importante, et la plus ignorée.

Une image ne devrait jamais dépasser de beaucoup la taille maximale à laquelle elle sera affichée. Pour une image pleine largeur sur un écran d'ordinateur, 1920 pixels de large suffisent. Pour une vignette de 400 pixels, 800 suffisent largement.

Règle pratique : deux fois la taille d'affichage maximale, pour les écrans à haute densité. Jamais plus.

### 2. Utiliser un format moderne

**AVIF** offre la meilleure compression et est largement supporté aujourd'hui.

**WebP** compresse nettement mieux que JPEG et PNG, avec un support universel.

**JPEG** reste acceptable en repli.

**PNG** ne devrait servir que quand la transparence est nécessaire. Une photo en PNG pèse plusieurs fois ce qu'elle devrait.

**SVG** pour les logos, icônes et illustrations vectorielles — poids minuscule, net à toutes les tailles.

Le passage de JPEG à WebP ou AVIF réduit typiquement le poids de 30 à 60 % sans différence visible.

### 3. Déclarer les dimensions

Chaque balise image doit porter `width` et `height`. Sans ça, le navigateur ne sait pas combien de place réserver : il affiche le texte, puis l'image arrive et pousse tout vers le bas.

C'est la cause dominante du **CLS**, la mesure de stabilité visuelle de Google — et la raison pour laquelle vous cliquez parfois sur le mauvais lien pendant qu'une page finit de charger.

Deux attributs, et le problème disparaît.

### 4. Différer ce qui est hors écran

Les images sous la ligne de flottaison doivent se charger seulement quand on approche. L'attribut `loading="lazy"` suffit dans la plupart des cas.

Une exception importante : **ne différez pas l'image principale de l'en-tête**. C'est généralement l'élément que Google mesure pour le LCP ; la différer dégrade précisément le chiffre que vous essayez d'améliorer.

## Le texte alternatif

Chaque image porteuse d'information a besoin d'un attribut `alt` qui décrit ce qu'elle montre. Chaque image décorative a besoin d'un `alt` **vide** — pas absent — pour que les lecteurs d'écran l'ignorent.

Ce n'est pas seulement de l'accessibilité : c'est ce qui vous fait exister dans la recherche d'images, un canal que la plupart des sites ignorent complètement.

Et donnez des noms de fichiers descriptifs. `chaise-ergonomique-maillee-noire.jpg` vaut mieux que `IMG_4471.jpg`.

## Les images en arrière-plan

Une vidéo ou une grande image d'arrière-plan en en-tête est un choix esthétique légitime, et c'est presque toujours l'élément le plus lourd de la page.

Trois précautions : compressez agressivement — un arrière-plan sous une couche sombre tolère une qualité bien inférieure ; fournissez une image d'affiche pour une vidéo, afin que quelque chose s'affiche immédiatement ; et vérifiez le comportement sur mobile, où une vidéo d'arrière-plan est souvent du poids pur pour un effet invisible.

## Comment vérifier

**Ouvrez l'onglet réseau des outils de développement, filtrez sur les images, triez par taille.** En dix secondes, vous voyez vos plus gros fichiers. C'est le diagnostic le plus rapide qui existe.

**Regardez le poids total de la page.** Sous 1 Mo, vous êtes en bonne posture. Au-delà de 3 Mo, vous avez un problème d'actifs.

**Testez sur mobile**, pas sur votre ordinateur.

## Ce qu'il faut retenir

Avant de changer d'hébergeur, d'installer une extension de cache ou d'envisager une refonte pour cause de lenteur : triez vos images par taille et regardez.

Redimensionner, convertir en format moderne, déclarer les dimensions, différer ce qui est hors écran. Quatre gestes mécaniques qui règlent la majorité des problèmes de vitesse — souvent en une journée, sans toucher au design.

Si vous préférez que ce soit fait plutôt qu'expliqué, voyez [notre service de maintenance et de performance](/fr/maintenance-site-web).
