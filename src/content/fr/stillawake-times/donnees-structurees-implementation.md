---
title: "Données structurées : quoi baliser, et les erreurs qui coûtent cher"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "Le guide d'implémentation du balisage JSON-LD : quels types servent réellement une PME, la règle des identifiants stables que presque personne n'applique, et les erreurs qui déclenchent une pénalité manuelle."
category: "SEO"
featured: false
author: "Jaeden Doody"
---

Les données structurées sont expliquées deux fois trop vite : « ajoutez du schema, vous aurez des étoiles dans Google ». Ça produit des sites remplis de balisage inutile, et parfois pénalisé.

Cet article est le guide d'implémentation. Pour la vue d'ensemble du SEO technique et la place des données structurées dedans, commencez par [le guide du SEO technique](/fr/articles/seo-technique-guide-complet).

## À quoi ça sert réellement

Trois usages distincts, de plus en plus importants dans cet ordre.

**Les résultats enrichis.** Étoiles d'avis, questions dépliables, fil d'Ariane, prix. Visibles, mais Google décide seul de les afficher — un balisage correct rend l'affichage possible, jamais garanti.

**La désambiguïsation.** Le balisage dit explicitement « cette page décrit *cette* entreprise, fondée par *cette* personne ». Sans lui, un moteur doit le déduire d'une mise en page. C'est particulièrement utile quand votre nom ressemble à celui d'une autre entité.

**Les moteurs de réponse.** C'est l'usage qui a le plus gagné en importance. Un modèle qui résume votre entreprise s'appuie volontiers sur des faits déclarés explicitement plutôt que devinés. Les données structurées sont la façon la plus directe de dire une chose vraie à une machine.

## Les types qui servent à une PME

Six, pas quarante.

**`Organization`** — qui vous êtes. Nom, URL, logo, profils officiels. Une seule fois pour toute l'entreprise, pas une par page.

**`LocalBusiness`** (ou une sous-catégorie comme `ProfessionalService`) — si vous servez une zone géographique. Adresse, horaires, zone desservie.

**`Article`** — pour le contenu éditorial. Titre, date de publication, date de modification, auteur.

**`BreadcrumbList`** — la position de la page dans l'arborescence. Simple, et souvent affiché dans les résultats.

**`FAQPage`** — pour les questions fréquentes, **à condition** qu'elles soient visibles sur la page.

**`Product`** — sur une boutique. Prix, disponibilité, avis.

Ce qui ne sert à rien pour la plupart des PME : baliser chaque paragraphe, déclarer des types exotiques, ou empiler des balisages redondants.

## La règle que presque personne n'applique : les identifiants

C'est la partie qui distingue un balisage utile d'un balisage décoratif.

Chaque entité devrait avoir un identifiant stable — un `@id` — et les autres blocs devraient **s'y référer** plutôt que de la redécrire.

Le défaut typique : la page d'accueil déclare une `Organization` nommée « Entreprise ABC », la page contact déclare un `LocalBusiness` nommé « Entreprise ABC », et un article déclare un `publisher` nommé « Entreprise ABC ». Trois descriptions, aucun identifiant partagé. Pour un consommateur de données, ce sont potentiellement trois entités différentes qui portent le même nom.

Avec des identifiants, vous déclarez l'organisation une fois avec un `@id` stable — par exemple `https://votresite.com/#organization` — et partout ailleurs vous écrivez simplement une référence à cet identifiant. Le graphe devient cohérent : une entreprise, une personne, des relations explicites.

C'est aussi ce qui permet de relier une personne à une organisation de façon non ambiguë : la page « fondateur » déclare la personne avec son propre identifiant, et l'organisation déclare que son fondateur est cette personne, par référence.

Cette discipline coûte quelques minutes et change la nature de ce que vous déclarez : d'une collection d'affirmations isolées à un graphe.

## Les erreurs qui coûtent cher

### Baliser ce qui n'est pas visible

La règle la plus stricte de Google. Un `FAQPage` dont les questions n'apparaissent pas sur la page, des avis balisés qui ne sont affichés nulle part, un prix dans le balisage différent de celui affiché.

C'est une cause documentée d'action manuelle. Le balisage décrit la page ; il ne l'augmente pas.

### Les avis auto-attribués

Baliser des avis que vous avez écrits vous-même, ou une note moyenne inventée, est explicitement interdit. Les avis balisés doivent provenir de vrais clients et être affichés.

### Plusieurs blocs contradictoires

Un thème génère un balisage, une extension SEO en génère un autre, et vous en avez ajouté un troisième à la main. Trois `Organization` avec des informations différentes valent moins que zéro.

Vérifiez ce que votre site émet réellement avant d'ajouter quoi que ce soit.

### Confondre `LocalBusiness` et une entreprise en ligne

`LocalBusiness` implique un lieu où l'on sert des clients. Une entreprise entièrement en ligne qui déclare une adresse fictive pour « faire local » crée une incohérence entre son balisage, sa fiche Google et la réalité.

Si vous n'avez pas de local recevant du public, `ProfessionalService` avec un `areaServed` décrit mieux la situation qu'une adresse inventée.

### Oublier la langue

Sur un site bilingue, chaque page devrait déclarer sa langue dans le balisage (`inLanguage`). Et les deux versions d'une même page décrivent **la même entité** : elles doivent partager le même `@id` pour la personne ou l'organisation, et ne différer que sur les nœuds propres à la page.

C'est une nuance qu'on rate facilement : traduire le balisage en dupliquant les identifiants crée deux entreprises, une par langue.

## Comment vérifier

**Le test des résultats enrichis de Google** vous dit si un type est admissible à un affichage enrichi.

**Le validateur schema.org** vous dit si votre balisage est syntaxiquement correct — plus strict, et utile pour les types que Google n'affiche pas.

**Search Console** vous montre ce que Google a réellement lu sur votre site, avec les erreurs par type. C'est la source la plus fiable, parce qu'elle reflète le traitement réel plutôt qu'un test ponctuel.

**Regardez le HTML rendu**, pas votre configuration. Un site qui génère le balisage en JavaScript peut le produire correctement dans le navigateur et pas dans le HTML initial.

## Un ordre d'implémentation raisonnable

**1. Une `Organization` unique, avec un `@id` stable**, présente sur tout le site.

**2. Un `BreadcrumbList`** sur les pages profondes.

**3. `Article`** sur le contenu éditorial, avec un auteur réel — une personne, pas seulement la marque, si quelqu'un a réellement écrit le texte.

**4. `LocalBusiness` ou `ProfessionalService`** si vous servez une zone, avec des informations identiques à votre fiche Google.

**5. `FAQPage`** uniquement là où les questions sont visibles.

**6. `Product`** sur une boutique.

Puis arrêtez. Le balisage supplémentaire au-delà de ça a un rendement décroissant rapide.

## Ce qu'il faut retenir

Les données structurées ne font pas monter une page. Elles rendent explicite ce qu'une machine devrait comprendre de votre page — ce qui compte de plus en plus, à mesure que les réponses sont générées plutôt que listées.

Deux règles suffisent à éviter presque tous les problèmes : ne balisez jamais ce qui n'est pas visible, et utilisez des identifiants stables auxquels les autres blocs se réfèrent. Le reste est de la mécanique.

Si vous préférez que ce soit fait plutôt qu'expliqué, voyez [nos forfaits de référencement](/fr/agence-seo-montreal).
