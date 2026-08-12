---
title: "Vos courriels automatiques arrivent-ils vraiment ? Le guide de la délivrabilité"
date: "2026-08-12"
updated: "2026-08-12"
excerpt: "Confirmations de commande, réinitialisations de mot de passe, notifications de formulaire : ces courriels échouent silencieusement plus souvent qu'on ne le croit. Voici SPF, DKIM et DMARC expliqués simplement, et comment vérifier que ça fonctionne."
category: "Fondations"
featured: false
author: "Jaeden Doody"
---

Il existe une catégorie de panne particulièrement coûteuse : celle qui ne fait aucun bruit. Le formulaire de contact s'envoie, le client voit « merci », et le courriel n'arrive jamais dans votre boîte. Ou il arrive dans les indésirables, où personne ne regarde.

Vous ne l'apprenez pas par une alerte. Vous l'apprenez trois semaines plus tard, quand un client demande pourquoi vous n'avez jamais répondu.

Voici pourquoi ça arrive, et comment le vérifier.

## Les deux types de courriels d'un site

**Les courriels transactionnels** sont déclenchés par une action : confirmation de commande, réinitialisation de mot de passe, avis d'expédition, notification de formulaire. Ils sont attendus par le destinataire et doivent arriver immédiatement.

**Les courriels de marketing** sont envoyés à une liste : infolettre, promotion, relance.

Ils ont des exigences différentes, et les mélanger est une cause fréquente de problèmes. Envoyer vos confirmations de commande depuis la même infrastructure que vos infolettres signifie qu'une campagne mal reçue peut abîmer la réputation qui fait arriver vos confirmations.

Séparez-les. La plupart des services d'envoi permettent des domaines ou des sous-domaines distincts.

## Pourquoi un courriel finit dans les indésirables

Un serveur de réception se pose une question : cet expéditeur est-il légitime ?

Sans preuve, il suppose que non. C'est ce qui rend l'authentification obligatoire — sans elle, n'importe qui pourrait envoyer du courrier en prétendant être vous, et les fournisseurs le savent.

Trois mécanismes répondent à cette question. Ils ne sont pas facultatifs.

### SPF — qui a le droit d'envoyer en votre nom

Un enregistrement dans votre DNS qui liste les serveurs autorisés à envoyer du courrier pour votre domaine.

Sans SPF, un message provenant de votre service d'envoi n'a rien qui prouve qu'il est autorisé. Le piège fréquent : plusieurs services envoient en votre nom — votre boutique, votre CRM, votre outil d'infolettre, votre hébergeur — et un seul figure dans l'enregistrement. Les autres échouent.

### DKIM — la signature qui prouve que rien n'a été modifié

Une signature cryptographique ajoutée à chaque message, vérifiable grâce à une clé publiée dans votre DNS.

Elle prouve deux choses : que le message vient bien du domaine annoncé, et qu'il n'a pas été altéré en route.

### DMARC — ce qu'il faut faire quand ça échoue

DMARC dit aux serveurs de réception comment traiter un message qui échoue aux vérifications précédentes : ne rien faire, mettre en quarantaine, ou rejeter. Il permet aussi de recevoir des rapports.

La bonne pratique est progressive : commencez en mode observation (`p=none`) pour voir qui envoie en votre nom, corrigez ce qui échoue, puis durcissez vers la quarantaine et le rejet.

Passer directement au rejet est la meilleure façon de bloquer vos propres factures.

## L'erreur la plus fréquente : usurper l'adresse du client

Beaucoup de formulaires de contact sont configurés pour envoyer le message « de la part de » l'adresse saisie par le visiteur. L'intention est pratique — vous pouvez répondre directement.

Le problème : votre serveur envoie alors un courriel prétendant venir de `gmail.com`, sans autorisation de Gmail. C'est exactement le comportement que SPF, DKIM et DMARC ont été conçus pour bloquer. Votre notification finit en indésirable, ou disparaît.

La bonne configuration : envoyez **depuis votre propre domaine** (`notifications@votreentreprise.ca`) et placez l'adresse du visiteur dans le champ `Reply-To`. Vous répondez toujours d'un clic, et le message passe l'authentification.

C'est probablement la cause numéro un des notifications de formulaire manquantes.

## Les autres causes de disparition

**Le domaine d'envoi n'est pas vérifié** chez votre fournisseur. La plupart exigent une vérification par DNS ; sans elle, vos envois partent depuis leur domaine partagé, dont la réputation dépend de tous les autres clients.

**L'adresse d'expéditeur n'existe pas.** Une adresse `noreply@` qui rejette tout courrier entrant est un signal négatif. Utilisez une adresse réelle et surveillée.

**Aucun lien de désabonnement sur les envois de masse.** Obligatoire au Canada sous la LCAP, et son absence déclenche des filtres.

**Un pic soudain de volume.** Passer de dix courriels par jour à cinq mille ressemble à une compromission. Montez progressivement.

**Le domaine est trop récent.** Un domaine neuf n'a aucune réputation. Les premières semaines sont plus fragiles.

## Comment vérifier, concrètement

**1. Envoyez-vous un test depuis votre propre formulaire**, depuis une adresse externe (pas votre courriel d'entreprise). Vérifiez la réception, et surtout le dossier indésirable.

**2. Regardez les en-têtes du message reçu.** Dans Gmail : « Afficher l'original ». Vous devriez voir `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`. Tout ce qui n'est pas `PASS` est votre problème.

**3. Listez tout ce qui envoie en votre nom.** Site, boutique, CRM, facturation, outil de réservation, infolettre. Chacun doit être autorisé dans votre configuration.

**4. Testez chaque courriel automatique du parcours**, pas seulement le formulaire de contact : création de compte, réinitialisation de mot de passe, confirmation de commande, avis d'expédition, reçu.

**5. Refaites ce test après chaque changement d'infrastructure.** Un changement d'hébergeur, de plateforme ou de service d'envoi casse régulièrement l'authentification, sans avertissement.

## La partie québécoise

Deux exigences s'ajoutent ici.

**La LCAP** (loi canadienne anti-pourriel) encadre les courriels commerciaux : consentement, identification claire de l'expéditeur, mécanisme de désabonnement fonctionnel. Les courriels purement transactionnels bénéficient d'exceptions, mais la frontière se brouille dès qu'une confirmation de commande contient une promotion.

**Le français.** Si vous servez des clients au Québec, vos courriels transactionnels doivent exister en français, au même titre que vos pages. C'est la partie qu'on oublie le plus souvent : les pages du site sont traduites, et la confirmation de commande arrive en anglais. Le sujet est traité plus largement dans [l'article sur la Loi 96](/fr/articles/loi-96-site-web-obligations).

Ces courriels vivent souvent chez un fournisseur tiers, avec leurs propres gabarits — c'est précisément pour ça qu'ils échappent aux projets de traduction.

## Une configuration saine, en résumé

- Un service d'envoi dédié pour le transactionnel, distinct du marketing.
- Un domaine d'envoi vérifié, avec SPF, DKIM et DMARC configurés.
- Une adresse d'expéditeur réelle sur votre domaine, jamais celle du visiteur.
- L'adresse du visiteur dans `Reply-To`.
- DMARC en observation d'abord, durci ensuite.
- Des gabarits en français et en anglais.
- Un test complet du parcours après chaque changement d'infrastructure.

## Ce qu'il faut retenir

Les courriels automatiques échouent silencieusement, et c'est ce qui les rend coûteux. Aucune alerte, aucun message d'erreur — juste des clients qui pensent que vous les ignorez.

Faites le test aujourd'hui : remplissez votre propre formulaire depuis une adresse externe, et regardez les en-têtes du message reçu. Cinq minutes, et vous saurez si vous avez un problème.

Si vous préférez que ce soit fait plutôt qu'expliqué, voyez [notre service de maintenance et de support](/fr/maintenance-site-web).
