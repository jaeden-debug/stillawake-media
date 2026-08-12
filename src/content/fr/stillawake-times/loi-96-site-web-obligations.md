---
title: "Loi 96 et votre site web : ce que les entreprises du Québec doivent réellement faire"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "La Loi 96 a resserré les règles linguistiques du commerce au Québec. Voici ce qu'elle exige concrètement d'un site web et d'une boutique en ligne, ce qu'elle n'exige pas, et comment le construire sans doubler votre budget."
category: "Québec"
featured: true
author: "Jaeden Doody"
---

La plupart des propriétaires d'entreprise au Québec entendent parler de la Loi 96 par un fournisseur qui essaie de leur vendre quelque chose. Le message est presque toujours le même : « votre site n'est pas conforme, il faut tout refaire ». C'est rarement vrai, et c'est une mauvaise raison de prendre une décision.

Ce guide explique ce que la loi demande à un site web commercial, ce qu'elle ne demande pas, et comment structurer un site bilingue pour que la conformité soit une conséquence de l'architecture plutôt qu'un projet de rattrapage.

Un avertissement d'entrée de jeu : je ne suis pas avocat, et ce texte n'est pas un avis juridique. C'est ce qu'un développeur doit comprendre pour bâtir correctement. Pour les cas limites — marques de commerce déposées, affichage extérieur, contrats — parlez à un juriste.

## Ce que la loi vise réellement

La *Charte de la langue française*, modifiée par la Loi 96 (2022), part d'un principe simple : au Québec, le consommateur a le droit d'être servi en français. Cette logique s'étend au commerce en ligne.

Concrètement, pour un site web, ça se traduit par trois obligations qui reviennent constamment :

**Le français doit être disponible.** Si vous vendez ou sollicitez des clients au Québec, l'information commerciale doit exister en français.

**Le français ne doit pas être traité comme une version secondaire.** C'est la partie que les entreprises manquent le plus souvent. Une version française qui existe mais qui est plus courte, moins à jour ou plus difficile à atteindre que l'anglais ne respecte pas l'esprit — ni généralement la lettre — de l'exigence d'équivalence.

**Ça s'applique aux entreprises qui font affaire au Québec**, pas seulement à celles qui y ont un bureau. Une boutique en ligne ontarienne qui vend activement au Québec est concernée.

L'erreur mentale la plus fréquente est de penser « il me faut une traduction ». Ce n'est pas une exigence de traduction. C'est une exigence de **qualité équivalente**.

## Ce que « équivalent » veut dire en pratique

C'est ici que la théorie juridique rencontre le code, et c'est là que la plupart des sites échouent.

Un site est problématique quand :

- La page française existe mais contient trois paragraphes là où l'anglaise en contient quinze.
- Le menu français mène à des pages anglaises dès qu'on descend d'un niveau.
- Les pages de services sont traduites, mais le blogue, la FAQ, les conditions de vente et les courriels transactionnels restent unilingues.
- Le formulaire de contact est en français, mais la confirmation, la facture et le suivi arrivent en anglais.
- Le sélecteur de langue renvoie systématiquement à l'accueil plutôt qu'à l'équivalent de la page consultée.

Ce dernier point paraît mineur. Il ne l'est pas. Si un visiteur lit votre page de tarifs en anglais, clique sur « FR » et atterrit sur la page d'accueil française, la version française n'est pas équivalente — elle est plus difficile d'accès. C'est aussi un signal de mauvaise qualité pour Google, qui attend qu'un lien `hreflang` pointe vers la **page correspondante**, pas vers la racine du site.

L'équivalence se juge sur l'expérience complète, pas sur le nombre de pages traduites.

## Ce que la loi n'exige pas

Il circule beaucoup de fausses obligations. Trois méritent d'être démenties.

**Elle n'exige pas que le français soit la langue par défaut pour tous les visiteurs.** Vous pouvez détecter la langue du navigateur, ou laisser le visiteur choisir. Ce qui compte, c'est que le français soit disponible, complet et facilement atteignable. Beaucoup d'entreprises choisissent le français par défaut pour le marché québécois — c'est un choix commercial défendable, pas une obligation technique universelle.

**Elle n'exige pas de traduire chaque mot d'un blogue international.** Le contenu commercial destiné aux clients québécois doit exister en français. Un article technique très pointu destiné à une audience mondiale se traite différemment d'une page de services. La ligne se trace sur l'intention commerciale, pas sur le volume.

**Elle n'exige pas de refaire votre site.** C'est la vente la plus courante et la plus malhonnête. Si votre architecture peut accueillir un deuxième arbre de contenu, vous ajoutez du français. Une refonte se justifie quand l'architecture actuelle rend le bilinguisme impossible — pas parce qu'un fournisseur agite une loi.

## Le piège technique que presque tout le monde rate

Voici le problème que je vois le plus souvent, et il est invisible depuis le tableau de bord d'un CMS.

Une entreprise fait traduire ses pages. Le français est là, il est bon, il est complet. Puis on regarde le code : les pages françaises pointent vers les pages anglaises pour le contact, le portfolio, les études de cas et la moitié du pied de page. Les composants partagés — l'en-tête, le pied de page, les blocs d'appel à l'action — ont des liens codés en dur vers les URL anglaises.

Le résultat : un visiteur francophone traverse deux ou trois pages en français, clique sur « Nous joindre », et se retrouve en anglais. La version française n'est pas un site — c'est une couche de peinture sur un site anglais.

Ce défaut ne se voit pas en relisant les textes. Il se voit en auditant le HTML rendu et en listant chaque lien sortant de chaque page française. C'est un exercice mécanique, et il est presque toujours révélateur. Sur un site que j'ai audité récemment, les liens fautifs venaient de cinq mécanismes différents : des liens écrits en dur, des chemins passés en paramètres à des composants, un pied de page partagé, une liste de navigation réutilisée, et une page anglaise qui renvoyait vers le français.

Si vous ne vérifiez qu'un seul élément après avoir lu ce texte, vérifiez celui-là.

## Le SEO et la loi tirent dans la même direction

Bonne nouvelle : bien faire le bilinguisme sert votre référencement. Les deux exigences se recoupent presque parfaitement.

**Des URL distinctes par langue.** Chaque langue a besoin de sa propre adresse : `/fr/agence-web-montreal` et `/web-design-montreal`. Un site qui change de langue en JavaScript sans changer d'URL ne peut pas être indexé correctement dans les deux langues — Google n'a rien à classer.

**Des balises `hreflang` réciproques.** Chaque page doit déclarer sa contrepartie, et la contrepartie doit déclarer la première en retour. Google ignore une déclaration `hreflang` non réciproque. C'est une erreur silencieuse : rien ne casse, la balise est simplement inerte.

**L'attribut `lang` correct sur le `<html>`.** Une page française servie avec `lang="en"` est mal étiquetée pour les lecteurs d'écran et envoie un signal contradictoire aux moteurs. Utilisez `fr-CA`, pas seulement `fr` — le français québécois et le français de France ne ciblent pas les mêmes requêtes.

**Un contenu écrit, pas traduit.** Un Québécois cherche « agence web Montréal », pas « agence de conception de sites internet ». Une traduction littérale d'une page anglaise rate les mots que vos clients tapent réellement. C'est la différence entre une page qui existe et une page qui se classe.

Ce dernier point est celui qui distingue un site bilingue rentable d'un site bilingue conforme. La conformité vous évite un problème. Le contenu écrit pour le marché vous amène des clients.

## Le contenu qu'on oublie systématiquement

Les pages de services sont toujours traduites. Le reste, rarement. Voici ce qui manque le plus souvent :

- Les **courriels transactionnels** : confirmation de commande, réinitialisation de mot de passe, avis d'expédition. Ils vivent souvent chez un fournisseur tiers et échappent au projet de traduction.
- Les **conditions de vente et la politique de confidentialité**. Ce sont précisément les documents où la langue compte le plus pour le consommateur.
- Les **messages d'erreur de formulaire** — « This field is required » sur un formulaire par ailleurs français.
- Les **pages 404** et les états vides.
- Les **fiches produits** dans une boutique en ligne, et surtout leurs **variantes** et descriptions courtes.
- Les **métadonnées** : le titre et la description qui s'affichent dans les résultats Google. Une page française avec un titre anglais dans les résultats de recherche, c'est la première impression manquée.

Sur une boutique Shopify, la question des fiches produits domine tout le reste : c'est là que se trouve le volume, et c'est là que le travail est réel.

## Par où commencer, dans l'ordre

Si vous partez d'un site unilingue anglais et que vous vendez au Québec, l'ordre efficace est celui-ci.

**1. Inventoriez vos pages par intention commerciale.** Les pages qui vendent, qui expliquent un prix, ou qui recueillent une demande passent en premier. Un article de blogue de 2019 sur une tendance passée n'a pas besoin d'être traduit avant votre page de tarifs.

**2. Bâtissez la structure d'URL avant d'écrire.** Décidez du préfixe (`/fr/`) et des slugs français. Changer d'avis après avoir publié coûte des redirections et de l'autorité perdue.

**3. Écrivez les pages commerciales en français, ne les traduisez pas.** Faites-les rédiger par quelqu'un qui écrit en français québécois, avec la recherche de mots-clés faite en français. C'est plus long, et c'est la seule partie du projet qui génère du revenu plutôt que d'éviter un risque.

**4. Reliez tout, puis vérifiez le HTML rendu.** Chaque page française doit mener à des pages françaises. Auditez la sortie, pas le code source — les composants partagés cachent des liens.

**5. Posez les `hreflang` réciproques et le bon attribut `lang`.** Puis vérifiez les deux directions.

**6. Traduisez la couche transactionnelle.** Courriels, formulaires, erreurs, politiques.

**7. Puis, et seulement puis, le contenu éditorial.**

L'erreur classique est d'inverser 3 et 7 : traduire cinquante articles de blogue pendant que la page de tarifs reste unilingue.

## Combien de temps, et pour quel coût

Ça dépend d'une seule variable : est-ce que votre site actuel peut accueillir un deuxième arbre de contenu ?

Si oui — la plupart des sites modernes le peuvent — le travail est de la rédaction, du câblage de liens et de la configuration technique. Le coût est dominé par l'écriture, pas par le développement.

Si non — un site bâti sur un thème qui suppose une seule langue, ou une structure qui ne permet pas des URL parallèles — vous ferez face à un vrai choix : contourner à grands frais, ou reconstruire proprement. C'est le seul scénario où une refonte est la bonne réponse, et ça se démontre en regardant l'architecture, pas en citant une loi.

Dans les deux cas, la partie qui prend réellement du temps est celle qui a de la valeur : écrire des pages françaises qui parlent au marché québécois. Le reste est de la mécanique.

## Ce qu'il faut retenir

La Loi 96 ne demande pas de traduire votre site. Elle demande que vos clients québécois puissent faire affaire avec vous en français, aussi facilement qu'en anglais.

La différence entre ces deux formulations est tout le projet. La première mène à une couche de traduction posée sur un site anglais, avec des liens qui fuient vers l'anglais dès le deuxième clic. La seconde mène à un vrai site français — qui se trouve aussi être celui qui se classe dans Google, qui convertit, et qui n'a pas besoin d'être refait la prochaine fois que la réglementation bouge.

Faites-le une fois, correctement, dans le bon ordre.
