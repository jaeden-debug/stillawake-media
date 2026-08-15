---
title: "Search Console : les rapports qui changent une décision"
date: "2026-08-15"
excerpt: "Cinq rapports de Search Console répondent chacun à une question précise. Voici lequel répond à quoi, les mauvaises lectures qui coûtent des mois, et le piège des sites bilingues."
category: "Mesure"
featured: false
author: "Jaeden Doody"
---

# Search Console : les rapports qui changent une décision

**Cinq rapports de Search Console changent réellement une décision : Performances répond à « qu'est-ce qu'on cherche avant d'arriver chez moi », Indexation des pages répond à « est-ce que Google accepte d'indexer ça », Inspection d'URL répond à « qu'est-ce que Google détient exactement pour cette page-ci », Signaux web essentiels répond à « à quelle vitesse ça se charge pour de vraies personnes », et Sitemaps répond à « est-ce que Google a pris tout ce que j'ai publié ». Poser à un rapport une question qu'il ne mesure pas, c'est l'origine de la plupart des mois perdus.**

Cet outil est gratuit, il ne dépend d'aucun consentement de témoins et c'est le seul endroit où Google vous parle directement. Il est aussi celui que les PME lisent le plus mal.

## Performances : ce qui se passe avant le clic

Requêtes, impressions, clics, taux de clic, position moyenne, sur **16 mois** d'historique. Cette limite de 16 mois compte plus qu'on pense : une comparaison d'une année à l'autre est possible exactement une fois, puis les données les plus anciennes commencent à disparaître.

Trois mauvaises lectures font des dégâts.

**La position moyenne est une moyenne.** Elle est calculée sur toutes les impressions de la période. Une nouvelle requête où vous apparaissez en 40e position la fait chuter aussi fort qu'une requête établie qui glisse de la 4e à la 6e. Résultat contre-intuitif : un site qui gagne du terrain — qui apparaît pour plus de requêtes qu'avant — affiche souvent une position moyenne qui **se dégrade**. Le chiffre global ne veut rien dire. Filtrez par requête avant de le lire, ou ne le lisez pas.

**La somme des clics par requête n'égalera jamais le total.** Google retire les requêtes rares pour protéger la vie privée. L'écart n'est pas un bogue, c'est le fonctionnement.

**Des impressions sans clics, ce sont deux problèmes opposés.** Séparez selon la position avant de conclure :

- Position 1 à 5 avec un faible taux de clic : c'est un problème de titre et de description. Le classement est acquis, la promesse affichée n'est pas assez claire.
- Position 8 à 20 avec des impressions : c'est un problème de classement. Réécrire le titre ne change rien quand presque personne ne descend jusque-là.

Un exemple mesuré. Chez Blackwater Aquatics — une entreprise fondée et opérée par Jaeden, ce n'est pas un client — une page produit tient un **taux de clic de 8,61 % à une position moyenne de 8,5**, avec environ **60 000 impressions** sur les URL du top 12 (fenêtre Search Console de 180 jours se terminant le 12 août 2026). Un taux de clic aussi élevé aussi bas dans la page, c'est la preuve que le titre correspond déjà à l'intention. Le travail était de monter, pas de réécrire. Lue avec la moyenne globale, la même page aurait mené à la conclusion inverse.

Détail mécanique utile : la position enregistrée est celle de votre **meilleure** URL pour cette requête. Si deux de vos pages se font concurrence, le rapport vous montre la meilleure des deux et vous cache le conflit.

## Indexation des pages : les états ne veulent pas dire la même chose

C'est le rapport qu'on lit comme une note globale. Ce n'en est pas une. Deux états se ressemblent et n'ont rien à voir :

- **« Détectée, actuellement non indexée »** : Google sait que l'URL existe et ne l'a jamais téléchargée. C'est un signal de priorité — la page n'est liée depuis nulle part d'assez convaincant. Redemander l'indexation ne sert à rien. Des liens internes, oui.
- **« Explorée, actuellement non indexée »** : Google a lu la page et a choisi de ne pas l'indexer. C'est un jugement sur la qualité ou sur la duplication, pas une panne technique.
- **« Page en double, Google n'a pas choisi la même URL canonique »** : votre canonique a été écartée. Vérifiez laquelle Google a préférée — il a parfois raison.
- **« Exclue par la balise noindex »** : volontaire, ou une configuration de préproduction partie en production. Ouvrez la liste au lieu de supposer.

L'erreur classique : traiter « Détectée, actuellement non indexée » comme un bogue de Google et redemander l'indexation en boucle. C'est une rétroaction sur votre maillage interne.

## Inspection d'URL : la seule vérité par page

C'est ici que se cache l'après-midi le plus souvent gaspillé.

Par défaut, l'outil affiche la **dernière version indexée** — un instantané qui peut dater de plusieurs semaines. Vous corrigez une page, vous l'inspectez, vous voyez encore l'ancien problème, et vous concluez que la correction n'a pas fonctionné. Elle a fonctionné. Vous regardez le passé. Le bouton **« Tester l'URL en direct »** va chercher la page telle qu'elle est maintenant. C'est celui qui répond à la question que vous vous posiez.

Le test en direct donne aussi le HTML rendu. Si votre contenu dépend du JavaScript, c'est là que vous saurez si Google le voit.

## Signaux web essentiels : des données de terrain, avec un plancher

LCP, INP et CLS mesurés sur de vrais utilisateurs de Chrome, sur une fenêtre glissante de **28 jours**, regroupés par familles d'URL semblables. Deux conséquences.

Une correction de performance ne paraît pas avant des semaines : la fenêtre doit rouler. Déployer le mardi et regarder le vendredi n'apprend rien.

Et les URL à faible trafic affichent « données insuffisantes ». **Ce n'est pas une réussite.** Ça veut dire qu'il n'y a pas assez de sessions réelles pour publier une mesure, et qu'il faut passer par un test en laboratoire.

Transparence sur nos propres chiffres : notre propriété Search Console est presque vide — **26 pages avec des impressions et 5 clics sur 28 jours**. Nous lisons des données de terrain sur les propriétés de clients, pas sur la nôtre, parce que la nôtre n'a pas le trafic pour en produire.

## Sitemaps : un rapprochement, pas un rituel

Ce rapport vaut environ quatre-vingt-dix secondes par mois, et toute sa valeur est dans l'écart. Le sitemap est la liste des pages que vous **croyez** devoir être indexées. Indexation des pages est la liste que Google a **réellement** indexée. Soustrayez l'une de l'autre et vous obtenez une liste finie d'URL à examiner — ce qui est une tâche très différente de « pourquoi le trafic baisse ».

Sur [TravelDesign By Lisa](/fr/etudes-de-cas), une plateforme cliente, ce rapprochement sur **834 URL** est ce qui a transformé un malaise vague en environ **2 300 défauts** individuellement corrigeables. Le sitemap n'était pas la correction. C'était l'inventaire qui l'a rendue dénombrable.

## Le piège bilingue, propre au Québec

Voici la limite que personne ne mentionne : **Search Console n'a aucune dimension de langue.** Ni filtre, ni colonne, ni regroupement.

Sur un site bilingue, la conséquence est directe. Une requête identique tapée par un francophone et par un anglophone — un nom de marque, un terme technique, « Montréal » — apparaît sur **une seule ligne** dans l'onglet Requêtes, alors que Google a pu montrer la page française à l'un et la page anglaise à l'autre. Cette ligne mélange donc deux pages classées différemment et deux publics au comportement différent. La position moyenne affichée n'appartient à aucune des deux pages, et le taux de clic non plus.

Trois habitudes règlent ça :

**Lisez par page, pas par requête.** Ouvrez l'onglet Pages, filtrez sur une URL précise, puis regardez ses requêtes. Vous obtenez enfin des chiffres qui appartiennent à une seule version linguistique.

**Ne remplacez pas la langue par le pays.** Le filtre Pays vous donne « Canada », et le Canada contient les deux langues. Au Québec, cette substitution est particulièrement trompeuse : une bonne partie de votre audience anglophone locale est dans le même segment que votre audience francophone.

**Surveillez les transferts d'impressions entre versions.** Si vos balises `hreflang` ne sont pas réciproques, Google peut se mettre à afficher l'URL anglaise là où il affichait la française. Vos impressions migrent d'une page à l'autre sans qu'aucun classement n'ait bougé. Vue page par page, ça ressemble à une chute suivie d'une hausse ; vue globalement, ça ne ressemble à rien du tout. Comparez toujours la paire de pages ensemble avant de conclure à une perte.

## Ce que Search Console ne peut pas vous dire

Aucune donnée sur vos concurrents. Aucune explication du **pourquoi** d'un mouvement de position. Les requêtes rares sont anonymisées, donc l'analyse de longue traîne est toujours partielle. Et il ne couvre que la recherche Google : quand un assistant IA cite votre page, ça n'apparaît nulle part ici — un angle mort qui grandit, et la raison pour laquelle [être cité par l'IA](/fr/etre-cite-par-ia) se mesure autrement.

C'est malgré tout le seul canal direct entre Google et vous. La plupart des [audits SEO](/fr/audit-seo) sérieux commencent là, avant tout travail de [référencement naturel](/fr/referencement-naturel), et c'est aussi le premier endroit qu'on ouvre quand une entreprise nous demande pourquoi sa visibilité stagne à [Montréal](/fr/agence-seo-montreal).

---

Si vous voulez qu'on lise votre propriété et qu'on vous dise ce qu'elle raconte, décrivez la situation par écrit sur [stillawake.studio/fr/demarrer](https://stillawake.studio/fr/demarrer). Vous recevez une portée écrite en retour. Sans appel de vente.
