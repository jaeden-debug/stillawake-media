---
title: "Migration vers Shopify : le catalogue s'importe, pas vos positions"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "Une migration ecommerce risque plus qu'une migration de site vitrine : les URL de produits, les comptes clients, l'historique de commandes et les intégrations. Voici l'ordre qui protège le chiffre d'affaires."
category: "Ecommerce"
featured: false
author: "Jaeden Doody"
---

Une migration ecommerce est plus risquée qu'une migration de site vitrine. Un site vitrine qui perd du trafic perd des demandes futures ; une boutique qui casse perd des ventes le jour même.

Et il y a plus de pièces mobiles : catalogue, variantes, clients, commandes, paiements, taxes, expédition, intégrations comptables.

Voici ce qui casse réellement, et l'ordre qui protège le chiffre d'affaires.

## Décider si ça vaut la peine

Les raisons légitimes de migrer vers Shopify : votre plateforme actuelle demande plus de maintenance qu'elle n'en vaut, vos extensions se contredisent, la performance plafonne, ou vous passez plus de temps à réparer qu'à vendre.

Les mauvaises raisons : quelqu'un a dit que Shopify était meilleur pour le SEO — les deux plateformes font correctement du SEO ; ou vous voulez un site plus rapide sans avoir vérifié le poids de vos images.

Shopify impose aussi des contraintes réelles qu'il faut accepter d'avance : des préfixes d'URL fixes (`/products/`, `/collections/`), un modèle de variantes limité en nombre d'options, et des frais de transaction si vous n'utilisez pas sa solution de paiement.

## Ce qui casse le plus souvent

**Les URL de produits.** C'est le risque principal. Votre ancienne plateforme utilisait une structure, Shopify impose la sienne. Chaque produit qui se classait change d'adresse.

**Les URL de catégories.** Vos catégories deviennent des collections, avec un préfixe imposé.

**Les comptes clients.** Les mots de passe ne se migrent pas — ils sont chiffrés. Vos clients devront réinitialiser, et il faut le leur annoncer plutôt que de les laisser découvrir que leur compte ne fonctionne plus.

**Les avis produits.** Ils vivent souvent dans une extension propre à l'ancienne plateforme. Prévoyez l'export avant de fermer quoi que ce soit — c'est un actif de conversion difficile à reconstruire.

**Les intégrations.** Comptabilité, expédition, inventaire, points de vente. Chacune doit être reconfigurée et testée.

**Les redirections déjà en place.** Si votre ancienne boutique avait accumulé des redirections au fil des ans, elles disparaissent. Il faut les reconstruire dans la nouvelle carte.

## L'ordre qui protège

**1. Exportez tout avant de toucher à quoi que ce soit.** Produits, variantes, clients, commandes, avis, pages, articles. Y compris ce que vous croyez inutile.

**2. Listez toutes les URL indexées.** Search Console, un crawl complet, et douze mois d'analytiques. La troisième source révèle les vieilles pages qui vendent encore.

**3. Construisez la cartographie de redirections avant la migration.** Chaque ancienne URL vers son équivalent Shopify, en 301. Rediriger un produit vers la page d'accueil équivaut à le supprimer.

**4. Migrez le catalogue, avec les descriptions réécrites si nécessaire.** Ne migrez pas des descriptions de fournisseur dupliquées en espérant qu'elles se classeront cette fois.

**5. Recréez les collections comme des pages d'atterrissage**, pas comme des grilles vides. Les collections captent les requêtes de catégorie, qui ont plus de volume que les noms de produits.

**6. Configurez et testez taxes, expédition et paiements** avec de vraies commandes de test.

**7. Vérifiez les canoniques des variantes.** Shopify pose généralement une canonique vers l'URL de base ; un thème personnalisé peut casser ce comportement.

**8. Migrez pendant une période creuse.** Pas pendant votre saison forte, et pas un vendredi.

**9. Après la mise en ligne : surveillez les 404 quotidiennement** pendant deux semaines. Chaque 404 est une redirection manquée, et chaque redirection manquée est un produit disparu de l'index.

## La partie bilingue

Sur une boutique québécoise, c'est le gros du travail — et le plus sous-estimé.

Shopify gère le multilingue nativement, mais la traduction du catalogue reste un chantier réel : descriptions, titres, variantes, métadonnées. Les noms d'options — tailles, couleurs, matières — restent très souvent en anglais dans la version française, parce que ce sont des champs de configuration qu'un projet de traduction oublie.

Vérifiez aussi les gabarits de courriels transactionnels. Confirmation de commande, avis d'expédition, réinitialisation de mot de passe : ils doivent exister en français, et ils vivent dans une section distincte de l'administration.

## Ce qu'il faut mesurer après

Trois choses, dans cet ordre.

**Les 404**, quotidiennement pendant deux semaines.

**L'indexation des pages produits.** Comparez le nombre de pages indexées avant et après. Une chute importante signale des redirections manquées ou des canoniques mal configurées.

**Le taux de conversion**, séparé mobile et bureau. Une chute après migration vient souvent d'un changement dans le tunnel de paiement plutôt que du trafic.

## Ce qu'il faut retenir

Une migration ecommerce n'échoue pas techniquement — Shopify importe le catalogue sans difficulté. Elle échoue sur les redirections, les avis perdus et les intégrations non testées.

La cartographie des redirections n'est pas la dernière étape technique. C'est le document qui décide si vous gardez votre chiffre d'affaires organique. La méthode générale est détaillée dans [le plan de redirections](/fr/articles/refonte-site-web-sans-perdre-seo).

Si vous préférez que ce soit fait plutôt qu'expliqué, voyez [notre service de développement Shopify](/fr/developpement-shopify).
