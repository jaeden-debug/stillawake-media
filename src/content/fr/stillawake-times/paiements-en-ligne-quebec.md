---
title: "Accepter les paiements en ligne au Québec : Stripe, Shopify Payments ou virement Interac"
date: "2026-08-15"
excerpt: "Le vrai coût d'un paiement en ligne ne se lit pas dans le taux affiché : il se lit dans la conversion de devise, les délais de dépôt et la vérification d'identité qui bloque le compte."
category: "Ecommerce"
featured: false
author: "Jaeden Doody"
---

**Une entreprise québécoise qui vend en ligne a trois options réalistes : Shopify Payments si la boutique est sur Shopify, Stripe si le paiement doit vivre dans une application sur mesure, et le virement Interac pour les montants élevés entre entreprises. Le taux affiché n'est presque jamais le coût réel — ce qui coûte cher, c'est la conversion de devise quand vous vendez en dollars américains, et ce qui bloque un lancement, c'est la vérification d'identité de l'entreprise.**

J'écris ceci en opérant deux systèmes de paiement différents : celui de Blackwater Aquatics, notre propre boutique Shopify, et la réconciliation Stripe que nous avons construite pour la boutique d'eSIM de TravelDesign By Lisa. Les deux ont posé des problèmes que personne n'annonce dans la page de tarification.

## Une précision sur les frais avant tout le reste

Je ne vais pas écrire ici de pourcentages ni de montants fixes par transaction. Les grilles tarifaires de Stripe, de Shopify et des banques changent, et un article qui affiche un taux de 2026 devient un mensonge en 2027 sans que personne s'en aperçoive.

Consultez la page de tarification du fournisseur au moment où vous décidez. Ce qui suit, c'est la **structure** des frais — celle-là est stable, et c'est elle qui détermine votre coût réel.

Il y a quatre couches, et la plupart des gens n'en comparent qu'une :

1. **Le taux de base** par transaction (un pourcentage plus un montant fixe). C'est le seul chiffre que les gens comparent.
2. **La surcharge sur les cartes étrangères.** Une carte émise hors du Canada coûte plus cher à traiter. Si vous vendez aux États-Unis, ce n'est pas un cas marginal, c'est votre volume.
3. **La conversion de devise.** Un pourcentage additionnel appliqué quand la devise du client n'est pas celle de votre dépôt.
4. **Les frais de transaction de la plateforme.** Shopify facture des frais supplémentaires si vous utilisez un autre processeur que Shopify Payments. Ce n'est pas une punition arbitraire : c'est le modèle d'affaires. Mais ça signifie que « brancher Stripe sur Shopify » coûte plus cher que le taux de Stripe.

## Le coût caché : la devise

C'est la ligne que je vois le plus souvent ignorée, et c'est celle qui fait le plus mal.

Si votre boutique affiche des prix en dollars américains parce que vos clients sont américains, et que votre compte bancaire est en dollars canadiens, chaque vente passe par une conversion. Vous payez la marge de change sur **le montant complet de chaque commande**, pas seulement sur votre profit.

Faites le calcul avec votre propre marge. Sur un produit dont la marge brute est de 30 %, une conversion prélevée sur le montant total peut représenter plusieurs points de pourcentage de cette marge — c'est-à-dire une fraction beaucoup plus grande de votre profit que le taux de traitement de base. Une entreprise qui compare deux processeurs à 0,1 % près pendant qu'elle convertit toutes ses ventes optimise la mauvaise ligne.

Deux façons de réduire ça : détenir un solde dans la devise de vente et être déposé dans cette devise-là (les deux fournisseurs offrent des comptes multidevises, avec leurs propres conditions), ou vendre uniquement en dollars canadiens et laisser la banque du client faire la conversion. La seconde option est plus simple et coûte de la conversion sur le marché américain, où afficher des prix en dollars canadiens réduit le taux de conversion.

Il n'y a pas de bonne réponse universelle ici. Il y a un arbitrage, et il faut le faire consciemment.

## Ce qui bloque réellement une entreprise québécoise

Le refus de compte n'arrive pas au moment où vous vous y attendez. Il arrive après la première vente, quand le fournisseur demande la documentation avant de libérer le premier dépôt.

**La vérification d'identité de l'entreprise.** Attendez-vous à devoir fournir le numéro d'entreprise du Québec (NEQ), la preuve d'immatriculation au Registraire des entreprises, une pièce d'identité gouvernementale pour chaque personne détenant une part significative, et une preuve d'adresse d'affaires. Une adresse résidentielle est acceptable pour un travailleur autonome, mais elle ralentit la vérification.

**Le compte bancaire au nom de l'entreprise.** C'est le blocage numéro un. Le nom sur le compte de dépôt doit correspondre au nom légal de l'entreprise enregistré chez le fournisseur. « Jean Tremblay » et « 9123-4567 Québec inc. » ne sont pas la même entité, et le dépôt échouera. Ouvrez le compte d'affaires avant d'ouvrir le compte de paiement, pas l'inverse.

**Les secteurs à risque.** Certains types de commerce déclenchent un examen manuel, une réserve sur les fonds, ou un refus : abonnements, produits livrés longtemps après le paiement, revente de crédits ou de services numériques d'un tiers. La boutique d'eSIM de TravelDesign By Lisa tombe dans cette dernière catégorie — un produit numérique fourni par un fournisseur externe — et ça se planifie d'avance plutôt que de se découvrir la semaine du lancement.

**Le nom sur le relevé bancaire.** Si votre client voit un nom qu'il ne reconnaît pas sur son relevé de carte, il conteste. Configurez le descripteur de relevé pour qu'il affiche le nom de la boutique, pas le nom légal de la société. Cette configuration prend deux minutes et évite des contestations qui coûtent des frais fixes en plus du montant remboursé.

## Les délais de dépôt

Le premier dépôt est toujours le plus long. Les fournisseurs retiennent les fonds d'un nouveau compte plus longtemps que ceux d'un compte établi — c'est de la gestion de risque, c'est normal, et ça surprend tout le monde.

Le cycle régulier ensuite se compte en quelques jours ouvrables et dépend du fournisseur, de l'ancienneté du compte et de votre secteur. Vérifiez le calendrier exact dans votre tableau de bord plutôt que dans un article : c'est affiché, c'est propre à votre compte, et c'est la seule source fiable.

Ce qu'il faut retenir pour la trésorerie : **votre argent n'est pas disponible le jour de la vente.** Si vous payez un fournisseur à la commande, vous financez l'écart. Une boutique qui grossit vite peut manquer de liquidités en étant profitable, uniquement à cause de ce décalage.

## Le virement Interac : où il gagne vraiment

Le virement Interac n'est pas un concurrent des cartes pour du commerce de détail. Personne ne va abandonner son panier pour aller faire un virement.

Il gagne dans deux situations précises :

**Les factures B2B de montant élevé.** Sur une facture de plusieurs milliers de dollars, le pourcentage prélevé par une carte devient un montant qui se remarque. Un virement à frais fixe — souvent gratuit sur un forfait d'affaires — est nettement moins cher. Vérifiez la limite de virement de votre institution : elles sont plafonnées, quotidiennement et hebdomadairement, et le plafond d'affaires diffère du plafond personnel.

**Les clients qui n'ont pas de carte de crédit d'entreprise.** Plus fréquent qu'on pense chez les petites entreprises et les OBNL.

Ce qu'il faut savoir avant de l'offrir :

- **Il n'y a pas de rétrofacturation.** Un virement reçu est reçu. C'est un avantage réel de trésorerie et de risque.
- **Il n'y a pas non plus de protection pour le client**, ce qui rend certains acheteurs méfiants sur une première transaction.
- **La réconciliation est manuelle.** C'est le vrai coût. Le dépôt arrive dans le compte bancaire sans lien automatique avec la facture. Quelqu'un doit associer les deux à la main, chaque fois. À trois virements par mois, c'est acceptable. À trente, c'est un poste de travail.
- **Le dépôt automatique est essentiel.** Sans lui, chaque virement exige de répondre à une question de sécurité, et une réponse mal orthographiée fait retourner l'argent.

## Ce que la réconciliation automatique change

La partie que les gens sous-estiment le plus dans un système de paiement, ce n'est pas d'encaisser. C'est de savoir, sans y penser, que tout ce qui a été payé a été livré et que tout ce qui a été livré a été payé.

Pour la boutique d'eSIM de [TravelDesign By Lisa](/fr/etude-de-cas-lisa-travel-design), la chaîne complète est automatisée : le client paie, le fournisseur exécute, la transaction est appariée et réconciliée sans intervention. Il n'y a pas de modèle d'intelligence artificielle là-dedans — ce sont des règles, parce que l'exigence était l'exactitude comptable, et des règles sont exactes d'une manière qu'un système probabiliste n'est pas.

Ce qui fait le vrai travail dans ce système, ce sont les cas d'exception : le remboursement partiel, la commande payée dont le fournisseur ne répond pas, le montant qui ne correspond pas à un cent près à cause du change. C'est là que passe la majorité du développement, et c'est la partie qui n'apparaît jamais dans une démonstration.

Sur [Blackwater Aquatics](/fr/etude-de-cas-blackwater-aquatics), notre propre boutique, la même chose se règle nativement dans Shopify parce que la boutique et le paiement sont le même produit. C'est le principal argument en faveur de Shopify Payments et il est rarement formulé ainsi : vous n'achetez pas un meilleur taux, vous achetez de ne pas avoir à construire la réconciliation.

## Comment choisir

**Votre boutique est sur Shopify et vous vendez des produits standards ?** Shopify Payments, sauf raison précise de faire autrement. Les frais de transaction supplémentaires imposés aux autres processeurs annulent généralement l'écart de taux, et la réconciliation est incluse. Le contexte du reste de la boutique est couvert dans notre page [développement Shopify](/fr/developpement-shopify) et dans le guide [boutique en ligne au Québec](/fr/boutique-en-ligne-quebec).

**Le paiement doit vivre dans une application sur mesure, un portail client, un système de réservation ou d'abonnement ?** Stripe. C'est là que sa flexibilité justifie le travail de développement — voir [développement logiciel](/fr/developpement-logiciel).

**Vous facturez d'autres entreprises pour des montants élevés ?** Offrez le virement Interac en plus de la carte, et acceptez que quelqu'un fasse la réconciliation à la main jusqu'à ce que le volume justifie de l'automatiser.

Nos tarifs publiés sont sur la page [tarifs](/fr/tarifs), et les projets complets sont documentés dans nos [études de cas](/fr/etudes-de-cas).

---

**Une note d'honnêteté :** les grilles tarifaires citées de mémoire vieillissent mal. Avant de décider, ouvrez la page de tarification actuelle de Stripe et celle de Shopify, et faites le calcul avec **votre** panier moyen, **votre** répartition de devises et **votre** taux de cartes étrangères. Le meilleur fournisseur dépend de ces trois chiffres-là, pas d'un classement général.

---

Vous avez un système de paiement à bâtir ou à réparer ? Décrivez-le par écrit sur [stillawake.studio/fr/demarrer](https://stillawake.studio/fr/demarrer) et vous recevez une portée écrite en retour. Aucun appel de vente.
