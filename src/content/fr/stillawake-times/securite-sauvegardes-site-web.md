---
title: "Sécurité et sauvegardes : ce qui compte vraiment pour un site de PME"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "La plupart des sites de PME ne sont pas piratés par une attaque ciblée, mais par un robot qui exploite une faille connue depuis des mois. Voici les mesures qui écartent la quasi-totalité du risque, et la seule sauvegarde qui compte."
category: "Fondations"
featured: false
author: "Jaeden Doody"
---

La sécurité d'un site de PME souffre de deux malentendus opposés. D'un côté, « personne ne s'intéresse à mon site ». De l'autre, la peur diffuse qui pousse à acheter des solutions coûteuses sans savoir contre quoi elles protègent.

La réalité est plus prosaïque, et plus facile à traiter. Presque aucune PME n'est visée personnellement. Les compromissions viennent de robots qui parcourent le web en testant des failles connues et des mots de passe faibles, à grande échelle, sans discrimination.

Ça change complètement la façon de se défendre : vous n'avez pas besoin d'être imprenable, vous avez besoin de ne pas être une cible facile.

## Comment les sites tombent réellement

Par ordre de fréquence :

**Une extension ou un thème obsolète.** Une faille est publiée, un correctif sort, et les robots commencent à chercher les sites qui ne l'ont pas appliqué. Le délai entre la publication d'une faille et son exploitation automatisée se compte en jours.

**Un mot de passe faible ou réutilisé.** Les robots testent des combinaisons issues de fuites d'autres services. Si votre mot de passe d'administration est celui d'un forum piraté en 2019, il est déjà connu.

**Un compte d'administration oublié.** L'ancien développeur, le stagiaire de l'été dernier, l'extension d'essai qui a créé son propre accès.

**Un hébergement partagé mal isolé.** Un site voisin compromis peut, dans certaines configurations, atteindre le vôtre.

**Un ordinateur infecté qui possède les accès FTP.** Le site n'est pas attaqué ; les identifiants sont volés sur le poste de travail.

Vous remarquerez ce qui n'est pas dans cette liste : les attaques sophistiquées. Elles existent, mais elles ne visent pas les PME.

## Les mesures qui écartent l'essentiel du risque

Cinq choses, dans l'ordre d'efficacité.

**1. Mettez à jour, et vraiment.** C'est la mesure la plus efficace, et celle qu'on repousse le plus, par peur de casser le site. Cette peur est le vrai problème : elle signifie que vous n'avez pas d'environnement de test ni de sauvegarde fiable. Réglez ça d'abord, puis mettez à jour sans crainte.

**2. Authentification à deux facteurs sur tous les comptes d'administration.** Elle neutralise à elle seule la catégorie « mot de passe faible ou réutilisé ». C'est gratuit et ça prend cinq minutes.

**3. Faites le ménage des comptes.** Listez tous les comptes d'administration aujourd'hui. Supprimez ceux qui ne correspondent pas à une personne active. Faites-le à chaque départ, pas une fois par an.

**4. Réduisez la surface.** Chaque extension est une porte potentielle. Désinstallez — pas seulement désactivez — ce que vous n'utilisez pas. Une extension désactivée mais présente reste exploitable dans certains cas.

**5. HTTPS partout**, avec renouvellement automatique du certificat. C'est standard aujourd'hui, mais vérifiez qu'aucune ressource n'est encore chargée en `http` : ça déclenche des avertissements dans le navigateur.

Ces cinq mesures ne coûtent presque rien et écartent la grande majorité des scénarios réels. Tout le reste est du raffinement.

## Les sauvegardes : la seule question qui compte

Beaucoup d'entreprises « ont des sauvegardes ». Peu peuvent répondre à la question qui compte : **avez-vous déjà restauré une sauvegarde ?**

Une sauvegarde jamais testée est une hypothèse, pas une protection. Les modes d'échec sont banals : la sauvegarde ne contenait pas la base de données, elle tournait sur un dossier renommé six mois plus tôt, ou le seul moyen de la restaurer passe par un fournisseur qui n'est plus joignable.

Une sauvegarde utilisable réunit quatre conditions :

**Elle est automatique.** Une sauvegarde manuelle ne se fait pas.

**Elle contient les fichiers *et* la base de données.** L'un sans l'autre ne restaure rien.

**Elle est stockée ailleurs que sur le serveur du site.** Une sauvegarde sur la machine compromise est compromise aussi.

**Vous pouvez la restaurer vous-même**, sans dépendre d'un tiers.

Et l'historique compte : sept jours minimum, trente jours de préférence. Une compromission n'est pas toujours découverte le jour même — si votre seule sauvegarde date d'hier et que l'intrusion date de trois semaines, vous restaurez un site déjà infecté.

**Testez la restauration une fois.** Sur un environnement de test. C'est une heure de travail, une fois, et c'est la différence entre avoir des sauvegardes et être protégé.

## Ce qui ne sert pas à grand-chose

**Les extensions de sécurité empilées.** Deux extensions de sécurité qui font la même chose entrent en conflit et ralentissent le site. Une seule, bien configurée, suffit.

**Cacher l'URL de connexion.** Ça complique la vie de votre équipe et arrête les robots les plus simples pendant quelques semaines. Ce n'est pas une protection.

**Les scanners de logiciels malveillants comme seule défense.** Ils détectent après coup. Utile, mais ça ne remplace pas les mises à jour.

**Payer pour un pare-feu applicatif sur un site vitrine à faible trafic.** Justifié pour une boutique ou une application qui traite des données ; excessif pour un site de cinq pages qui n'est pas à jour — commencez par les mises à jour.

## Si le site est compromis

L'ordre compte.

**1. Mettez le site hors ligne** ou en maintenance. Un site compromis peut distribuer des logiciels malveillants à vos visiteurs, et Google le signalera — un avertissement rouge dans les résultats coûte plus cher que quelques heures d'indisponibilité.

**2. Changez tous les mots de passe** : hébergement, base de données, FTP, administration, registraire. Depuis un ordinateur dont vous êtes certain.

**3. Restaurez une sauvegarde antérieure à la compromission.** D'où l'importance de l'historique.

**4. Mettez tout à jour avant de remettre en ligne.** Sinon la même faille sera exploitée à nouveau, souvent en quelques heures.

**5. Vérifiez dans Search Console** que Google n'a pas signalé le site, et demandez un réexamen si nécessaire.

**6. Cherchez la cause.** Restaurer sans comprendre garantit la répétition.

## Le côté données

Si votre site collecte des renseignements personnels — et un formulaire de contact en collecte — deux obligations méritent attention au Québec.

La **Loi 25** encadre la protection des renseignements personnels : consentement, conservation limitée, et obligation de signaler certains incidents de confidentialité.

En pratique, pour un site de PME : ne collectez que ce dont vous avez besoin, ne conservez pas indéfiniment les soumissions de formulaire, sachez où elles sont stockées, et publiez une politique de confidentialité qui décrit la réalité plutôt qu'un texte générique copié.

Ce n'est pas un avis juridique. C'est le minimum qu'un site devrait faire.

## La liste de vérification annuelle

Une fois par an, une heure :

- Tous les comptes d'administration correspondent-ils à une personne active ?
- L'authentification à deux facteurs est-elle activée partout ?
- Les mises à jour sont-elles à jour, ou en retard par peur ?
- Ai-je restauré une sauvegarde au moins une fois ?
- La sauvegarde est-elle stockée hors du serveur ?
- Le certificat HTTPS se renouvelle-t-il automatiquement ?
- Le domaine est-il verrouillé contre les transferts et à mon nom ?
- Reste-t-il des extensions inutilisées ?

Si vous répondez oui à tout, vous êtes au-dessus de la moyenne des PME et hors de portée de la quasi-totalité des attaques automatisées.

## Ce qu'il faut retenir

Vous n'avez pas besoin d'un dispositif de sécurité sophistiqué. Vous avez besoin d'être à jour, d'avoir l'authentification à deux facteurs, de ne garder que les comptes utiles, et de posséder une sauvegarde que vous avez déjà restaurée au moins une fois.

Ce dernier point est celui qui transforme un incident en inconvénient plutôt qu'en catastrophe. Testez-la.

Si vous préférez que ce soit fait plutôt qu'expliqué, voyez [notre service de maintenance et de support](/fr/maintenance-site-web).
