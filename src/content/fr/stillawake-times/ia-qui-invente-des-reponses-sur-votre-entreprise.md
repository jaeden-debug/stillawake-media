---
title: "Quand l'IA invente des réponses sur votre entreprise"
date: "2026-08-15"
excerpt: "Aucun fournisseur d'IA n'offre de canal de correction garanti. Voici comment découvrir ce qui se dit de vous, pourquoi c'est faux, ce qui aide réellement, et ce que vous ne contrôlez pas."
category: "Confiance"
featured: false
author: "Jaeden Doody"
---

# Quand l'IA invente des réponses sur votre entreprise

**Quand un assistant IA affirme quelque chose de faux sur votre entreprise, il n'existe aucun canal de correction garanti. Ni OpenAI, ni Google, ni Anthropic, ni Perplexity n'offrent de formulaire qui corrige une réponse sur demande. Ce que vous pouvez changer, c'est la matière première : des données d'entité cohérentes, une page « À propos » qui énonce les faits en clair, et des profils tiers qui disent la même chose que vous. Le reste — le calendrier, le poids des données d'entraînement déjà figées — n'est pas entre vos mains, et il faut le savoir avant de payer quelqu'un qui prétend le contraire.**

Ce texte ne porte pas sur la façon de se faire citer : c'est un autre sujet, traité dans [être cité par l'IA](/fr/etre-cite-par-ia). Celui-ci porte sur le dégât — quand ce qui est dit de vous est simplement faux.

## D'abord : le découvrir vous-même

Il n'existe aucun tableau de bord fiable pour ça. La seule méthode honnête, c'est de tester à la main.

Un protocole qui tient en trente minutes :

- **Écrivez huit à dix questions** telles qu'un client les poserait vraiment. « Qui est [votre entreprise] ? », « Est-ce que [votre entreprise] fait de la [votre service] ? », « Combien coûte [votre service] chez [votre entreprise] ? », « Quelles sont les heures d'ouverture de… », « Est-ce que [votre entreprise] est fiable ? »
- **En français et en anglais.** Les réponses divergent souvent, et pas légèrement. Une entreprise québécoise peut être décrite correctement en français et confondue avec une homonyme torontoise en anglais.
- **Dans une session neuve**, sans historique et sans compte connecté si possible. Votre historique influence la réponse et vous donne une image plus flatteuse que celle du public.
- **Sur au moins trois assistants**, et refaites-le une semaine plus tard. Les réponses ne sont pas déterministes : la même question posée deux fois donne deux textes différents. **Une seule mauvaise réponse n'est pas une preuve.** Ce que vous cherchez, c'est un motif qui revient.
- **Notez les réponses mot à mot**, avec la date et l'outil. Sans ça, vous n'aurez aucun moyen de savoir si quoi que ce soit s'est amélioré dans six mois.

## Quatre types d'erreurs, quatre causes différentes

**Le fait périmé.** Ancienne adresse, ancien prix, ancien nom, ancien associé. Cause : de vieilles pages encore en ligne, chez vous ou ailleurs, qui n'ont jamais été mises à jour. C'est le type le plus fréquent et le plus corrigeable.

**La confusion d'entités.** Deux entreprises au nom semblable fusionnées en une seule. Au Québec, avec des noms descriptifs et beaucoup de PME régionales, c'est courant — surtout quand la vôtre est jeune et l'autre est établie depuis vingt ans. Le modèle ne « choisit » pas : il n'a jamais eu de quoi vous distinguer.

**L'extrapolation.** L'assistant comble un vide. Vos heures, vos prix, votre zone desservie ne figurent nulle part de façon exploitable, alors il produit ce qui est plausible pour une entreprise de votre type. Ce n'est pas de la malveillance : c'est un système qui préfère une réponse vraisemblable à un « je ne sais pas ».

**La reprise d'une source hostile ou marginale.** Un avis isolé, un fil de forum, un annuaire douteux — repris comme s'il valait votre propre site, parce que rien de plus solide ne le contredit.

## Pourquoi ça arrive vraiment

Deux mécanismes se superposent, et ils n'ont pas le même remède.

Le premier, c'est la **minceur des données d'entité**. Si votre entreprise existe surtout comme un logo et un formulaire de contact, il n'y a rien à quoi s'accrocher. Le second, pire, c'est la **contradiction**. Trois adresses différentes sur trois annuaires, deux orthographes du nom légal, un numéro de téléphone qui varie : le système n'a aucun moyen d'arbitrer, alors il tranche au hasard — et il tranche différemment chaque fois.

Ajoutez que certains assistants font une recherche en direct au moment de répondre. Si la première page trouvée sur votre nom est un annuaire de 2019 plutôt que votre site, c'est l'annuaire qui parle en votre nom.

## Ce qui aide réellement

**Une seule version des faits, partout.** Un nom légal, une adresse, un numéro, écrits exactement de la même façon sur votre site, votre fiche Google, vos profils sociaux et les annuaires sectoriels. La cohérence vaut plus que le volume : dix mentions identiques valent mieux que cinquante mentions divergentes.

**Des données structurées.** Un balisage `Organization` ou `LocalBusiness` propre, avec une seule adresse canonique. C'est la version lisible par machine de la phrase précédente.

**Une page « À propos » écrite en phrases complètes.** Datée, factuelle, avec le nom légal, l'année de fondation, la zone desservie, les services réels. Pas une infographie, pas un carrousel : du texte extractible. C'est la page la plus sous-estimée d'un site quand on parle d'IA.

**Une [fiche Google Entreprise](/fr/fiche-google-entreprise) à jour.** Elle alimente une bonne partie de ce que les systèmes considèrent comme des faits vérifiés sur une entreprise locale.

**Des profils tiers concordants.** Le Registraire des entreprises du Québec, LinkedIn, les associations sectorielles, un ou deux annuaires crédibles. Ce que vous cherchez, c'est la corroboration : plusieurs sources indépendantes qui disent la même chose.

**Nettoyer le passé.** Les vieilles pages qui portent l'ancienne information doivent être corrigées ou redirigées, pas supprimées en silence. Une page supprimée peut rester dans des copies et des citations pendant longtemps ; une page corrigée remplace l'ancienne version.

**Un fichier `llms.txt`** — utile, mais soyons précis sur ce qu'il fait. Le seul effet que nous avons mesuré chez nous, c'est le passage du score de navigation agentique de Chrome Lighthouse de **67 à 100** après avoir reformaté le nôtre avec de vrais liens markdown (mesuré par nous, août 2026). C'est une amélioration réelle de la lisibilité machine. Ce n'est pas un canal de correction, et tous les assistants ne le lisent pas. Notre [générateur de llms.txt](/fr/outils/generateur-llms-txt) est gratuit si vous voulez voir où vous en êtes.

## Ce que vous ne contrôlez pas

Cette section est celle qu'on vous vend rarement.

**Les données d'entraînement déjà figées.** Un modèle entraîné avant votre changement de nom continuera de mentionner l'ancien jusqu'à son prochain entraînement, peu importe ce que vous publiez. Vous pouvez influencer ce qu'il trouve en direct ; vous ne pouvez pas modifier ce qu'il a déjà mémorisé.

**Le délai.** Des semaines à des mois, sans accusé de réception et sans confirmation. Vous corrigez, vous attendez, vous retestez.

**L'absence de canal de correction.** Il existe des boutons « signaler » ou « pouce vers le bas », qui alimentent des processus internes sans engagement ni suivi. Il existe aussi, chez la plupart des fournisseurs, des formulaires juridiques pour du contenu illégal ou du retrait de renseignements personnels. **Ce n'est pas la même chose qu'une correction factuelle**, et présenter l'un comme l'autre est malhonnête. Si un prestataire vous vend une « correction garantie de votre réputation IA », demandez-lui le nom du canal et le délai contractuel. Il n'y en a pas.

**La mesure.** Search Console ne montre pas les citations dans ChatGPT. Aucun outil ne vous donne aujourd'hui une mesure complète et vérifiable de ce que les assistants disent de vous. Les outils de suivi qui existent échantillonnent des questions — c'est une indication, pas un inventaire.

## Quand ce n'est plus un dossier de visibilité

Si l'affirmation est diffamatoire, ou si elle expose des renseignements personnels, ce n'est plus une question de référencement. C'est un dossier juridique, avec des recours différents et des délais différents. Nous ne sommes pas avocats et nous ne prétendons pas l'être ; à ce stade, la bonne dépense n'est pas une agence web.

## Un rythme réaliste

Vingt minutes par trimestre : rejouez vos huit questions, comparez aux réponses notées la fois précédente, et vérifiez que vos données d'entité n'ont pas divergé quelque part entre-temps. C'est un travail d'hygiène, pas un projet.

La bonne nouvelle, c'est que presque tout ce qui règle ce problème règle aussi autre chose. Des données d'entité cohérentes améliorent le [référencement naturel](/fr/referencement-naturel), une fiche Google exacte améliore la recherche locale, et une page « À propos » factuelle convertit mieux qu'un manifeste. C'est habituellement le point de départ d'un [audit](/fr/audit-seo) chez nous, et la logique complète est décrite dans notre approche du [référencement IA](/fr/referencement-ia).

---

Si un assistant raconte quelque chose de faux sur votre entreprise et que vous voulez savoir d'où ça vient, décrivez la situation par écrit sur [stillawake.studio/fr/demarrer](https://stillawake.studio/fr/demarrer). Vous recevez une portée écrite en retour. Sans appel de vente.
