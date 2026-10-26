import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { FaqBlock, RelatedServices } from "@/components/service-page";
import { ArticlesLies } from "@/components/articles-lies";
import {
  CredentialSplit,
  Disclosure,
  OwnershipMatrix,
  StackDiagram,
  WorkflowRail,
} from "@/components/ownership";
import { faqPairs } from "@/data/website-ownership";
import { RECURRING_BY_ID } from "@/lib/pricing/model";

/**
 * Version française de la ressource sur la propriété d'un site web.
 *
 * Demande mesurée au Québec : quasi nulle (`propriété site web` 0/mois,
 * `propriétaire nom de domaine` 10/mois — Google Keyword Planner, Québec,
 * 2026-08-15). Cette page n'est donc pas un pari sur le volume organique :
 * c'est une page de confiance et de conversion pour la clientèle
 * francophone, et un actif citable par les assistants IA en français, où
 * personne n'a encore publié sérieusement sur le sujet. C'est exactement le
 * cadrage retenu dans le plan d'entrée SEO pour tout le côté français.
 *
 * Le texte est écrit en français d'affaires du Québec, pas traduit de
 * l'anglais. Les noms de produits restent en anglais parce que c'est ce que
 * les gens disent réellement.
 */

const url = "https://stillawakemedia.com/fr/propriete-site-web";
const HOSTING = RECURRING_BY_ID["managed-hosting"];
const CARE = RECURRING_BY_ID["website-care-plan"];

export const metadata: Metadata = {
  title: "Propriété d’un site web : qui possède le domaine, le code et les comptes",
  description:
    "Guide clair sur la propriété d’un site web quand vous engagez une agence : qui doit posséder le nom de domaine, l’hébergement, le code source, le CMS, la base de données, Stripe, Shopify et l’analytique — qui paie quoi, et ce qui arrive si vous cessez de travailler ensemble.",
  alternates: {
    canonical: url,
    languages: {
      "fr-CA": url,
      "en-CA": "https://stillawakemedia.com/website-ownership",
      "x-default": "https://stillawakemedia.com/website-ownership",
    },
  },
  openGraph: {
    title: "À qui appartient votre site web?",
    description:
      "Domaine, hébergement, code, CMS, base de données, paiements et analytique — qui doit posséder quoi, qui paie, et ce qui arrive quand un mandat se termine.",
    url,
    type: "article",
    locale: "fr_CA",
  },
};

const FAQ = faqPairs("fr");

const PRINCIPES: [string, string][] = [
  [
    "Les comptes vous appartiennent",
    "Chaque compte dont votre entreprise dépend — domaine, hébergement, CMS, base de données, paiements, analytique — devrait être au nom de votre entreprise, sur votre courriel, avec votre méthode de récupération.",
  ],
  [
    "Nous obtenons un accès, pas la propriété",
    "Un studio a besoin d’un accès administrateur ou développeur pour bâtir et faire rouler votre site. Il n’a besoin d’être propriétaire de rien pour bien faire ce travail.",
  ],
  [
    "Rien ne dépend d’un seul portable",
    "Votre capacité à accéder à votre propre infrastructure ne devrait jamais passer par le téléphone, le courriel ou le gestionnaire de mots de passe d’un employé de StillAwake.",
  ],
  [
    "C’est écrit",
    "Quels comptes existent, qui détient chacun, ce qu’ils coûtent et ce qui arrive à la fin — par écrit, avant le début du mandat.",
  ],
];

export default function ProprieteSiteWebPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <PageSchema route="/fr/propriete-site-web" />

      {/* La réponse directe est le premier paragraphe : c’est le passage
          qu’un assistant IA va citer, alors il doit tenir seul. */}
      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">
            Propriété et infrastructure
          </p>
          <h1 className="geist max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            À qui appartient quoi quand quelqu’un bâtit votre site web.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/80">
            <strong className="text-white">
              Vous devriez posséder chaque compte dont votre entreprise dépend : le nom de domaine,
              l’hébergement, le CMS, la base de données, Stripe, Shopify, Analytics et Search Console.
              Votre agence, elle, devrait détenir un accès administrateur ou développeur à ces comptes —
              pas la propriété.
            </strong>{" "}
            Cette phrase règle l’essentiel de la confusion, et presque toutes les histoires d’horreur
            d’entreprises qui perdent leur site web sont des histoires où cette phrase a été ignorée.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Voici le portrait complet : ce qu’est réellement chaque morceau d’un site web, qui devrait le
            détenir, qui le paie, comment un vrai projet se déroule, et ce qui arrive si votre studio et
            vous prenez des chemins différents. C’est écrit pour un propriétaire d’entreprise, pas pour un
            développeur. Aucune connaissance technique n’est présumée, et rien n’est caché pour faire
            paraître le travail plus mystérieux qu’il l’est.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="https://stillawake.studio/start"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90"
            >
              Obtenir une soumission écrite — sans appel
            </Link>
            <Link
              href="/fr/outils/calculateur-cout-projet"
              className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40"
            >
              Estimer un projet
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Le principe, en quatre lignes.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PRINCIPES.map(([titre, texte]) => (
              <div key={titre} className="glass rounded-[1.75rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.05em]">{titre}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">La carte</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Un site web, c’est cinq couches, pas une seule chose.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Quand quelqu’un dit «&nbsp;le site web&nbsp;», il parle en réalité de l’une des cinq choses
            distinctes qui peuvent chacune être possédée, payée et déplacée séparément. Une fois qu’on les
            voit séparément, la question de la propriété cesse d’être intimidante : elle devient cinq
            petites questions dont les réponses sont évidentes.
          </p>
          <StackDiagram locale="fr" />
          <p className="mt-8 max-w-3xl text-sm leading-7 text-[#8C8080]">
            La plupart des sites de PME utilisent les couches un, deux et trois, et s’arrêtent là. Les
            couches quatre et cinq s’ajoutent quand l’entreprise en a réellement besoin — une décision qui
            mérite d’être prise délibérément, parce que chacune ajoute des coûts, de l’entretien et une
            obligation de sécurité.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Le tableau</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Chaque compte, qui devrait le détenir, et qui paie.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            C’est le tableau à apporter dans une discussion avec n’importe quel fournisseur, pas seulement
            avec nous. Trois lignes portent la mention{" "}
            <strong className="text-white">varie selon le contrat</strong> : ce sont de véritables choix
            commerciaux où plus d’un arrangement est honnête. Tout le reste est une recommandation que nous
            défendrions dans n’importe quel mandat.
          </p>
          <OwnershipMatrix locale="fr" />
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <h3 className="geist text-2xl font-black tracking-[-0.05em]">
              Là où la propriété peut légitimement varier
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
              Le code peut vous être cédé ou concédé sous licence. L’hébergement peut vivre dans votre
              compte ou dans un forfait géré. Le courriel transactionnel peut passer par votre fournisseur
              ou par le nôtre. Ces six arrangements sont utilisés par des studios sérieux, et le choix se
              résume souvent à ceci : voulez-vous détenir la plateforme, ou détenir une seule facture? Ce
              qui n’est pas une variation légitime, c’est de laisser la question sans réponse — ou de
              découvrir la réponse le jour où vous essayez de partir. Si une proposition ne nomme pas
              l’arrangement, c’est la question à poser avant de signer.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">En clair</p>
          <h2 className="geist mt-5 text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Ce que chacune de ces choses est vraiment.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#C7B9B9]">
            Ouvrez seulement ce dont vous avez besoin. Rien ici ne présume que vous savez ce qu’est un
            serveur de noms.
          </p>

          <div className="mt-10 space-y-4">
            <Disclosure
              summary="Nom de domaine et DNS"
              hint="Votre adresse, et le panneau qui pointe vers le reste"
            >
              <p>
                Un <strong className="text-white">nom de domaine</strong>, c’est l’adresse que les gens
                tapent. Vous le louez auprès d’un <strong className="text-white">registraire</strong> —
                Cloudflare, Namecheap, GoDaddy — pour environ 15 à 60 $ CAD par année, et il est à vous
                tant que vous renouvelez. Le <strong className="text-white">DNS</strong>, c’est le panneau
                de réglages qui y est rattaché : une courte liste d’enregistrements qui indiquent quel
                serveur répond pour le site, quel service gère vos courriels, et quels enregistrements
                prouvent à Google ou à Microsoft que vous contrôlez le domaine.
              </p>
              <p>
                Enregistrez-le vous-même, au nom légal de votre entreprise, sur une adresse courriel
                d’entreprise que vous aurez encore dans cinq ans. Activez le renouvellement automatique et
                le verrouillage de transfert. Donnez ensuite à votre studio l’accès pour modifier les
                enregistrements : c’est une invitation de cinq secondes, entièrement réversible.
              </p>
              <p>
                Un domaine expiré est le seul échec de cette page sans récupération propre : un nom
                abandonné peut être racheté par un tiers en quelques jours, et il emporte avec lui vos
                courriels, votre référencement et chaque lien jamais créé vers vous. Le sujet est
                approfondi dans{" "}
                <Link
                  href="/fr/articles/nom-de-domaine-hebergement"
                  className="text-[#D71920] underline-offset-4 hover:underline"
                >
                  notre article sur le domaine et l’hébergement
                </Link>
                .
              </p>
            </Disclosure>

            <Disclosure summary="Code source et dépôts" hint="GitHub, et ce que veut dire « remise »">
              <p>
                Un site sur mesure, c’est un dossier de fichiers. Ces fichiers vivent dans un{" "}
                <strong className="text-white">dépôt</strong> — presque toujours sur GitHub — qui conserve
                l’historique complet de chaque modification, qui l’a faite et quand, et qui permet
                d’annuler n’importe quel changement. Le dépôt est aussi ce que la plateforme d’hébergement
                surveille : on pousse une modification, le site se reconstruit tout seul.
              </p>
              <p>
                Deux choses vous concernent. D’abord, qu’un dépôt existe : si un fournisseur modifie des
                fichiers directement sur un serveur en ligne, il n’y a ni historique ni retour arrière.
                Ensuite, ce que votre entente prévoit pour lui — cession au paiement final et transfert
                vers votre organisation GitHub est l’arrangement le plus propre, et c’est le nôtre. Une
                licence reste légitime, mais ça devrait être une phrase que vous lisez, pas un fait que
                vous découvrez.
              </p>
              <p>
                Les sites bâtis sur une plateforme sont différents par nature. Shopify, Framer et Webflow
                ne produisent pas de code portable, et aucun fournisseur honnête ne peut prétendre le
                contraire : ce qui se transfère là, c’est le compte, pas le code.
              </p>
            </Disclosure>

            <Disclosure summary="Hébergement et déploiement" hint="Vercel, CDN, SSL — l’endroit où le site roule">
              <p>
                L’<strong className="text-white">hébergement</strong>, ce sont les machines qui répondent
                quand quelqu’un visite votre adresse. Les plateformes modernes comme{" "}
                <strong className="text-white">Vercel</strong> font plus que stocker des fichiers : elles
                compilent le site à partir de votre dépôt, le distribuent sur un{" "}
                <strong className="text-white">CDN</strong> — un réseau de serveurs répartis dans le monde,
                pour qu’un visiteur de Melbourne soit servi de près — émettent le certificat{" "}
                <strong className="text-white">SSL</strong> qui affiche le cadenas, et vous donnent un
                aperçu privé de chaque modification avant sa mise en ligne.
              </p>
              <p>
                À l’échelle d’une PME, ça coûte de zéro à quelques dollars par mois. Le compte devrait être
                au nom de votre entreprise par défaut. L’hébergement géré sous notre compte est l’autre
                modèle honnête — une facture prévisible plutôt que quatre accès fournisseurs — et si c’est
                ce que vous choisissez, l’arrangement est écrit et le site demeure transférable.
              </p>
            </Disclosure>

            <Disclosure summary="CMS — gestion de contenu" hint="WordPress, Webflow, Framer, Sanity, sur mesure">
              <p>
                Un <strong className="text-white">CMS</strong>, c’est l’écran d’administration où quelqu’un
                change les textes et les images sans toucher au code. Les catégories à connaître : les{" "}
                <strong className="text-white">plateformes tout-en-un</strong> (WordPress, Webflow, Framer),
                où le CMS et le site sont le même produit; les{" "}
                <strong className="text-white">CMS découplés</strong> (Sanity, Contentful), qui stockent le
                contenu et l’envoient à un site sur mesure; le{" "}
                <strong className="text-white">contenu de boutique</strong> (les pages et le blogue de
                Shopify, inclus avec la boutique); et l’
                <strong className="text-white">admin sur mesure</strong> intégré au site — c’est ce qui fait
                rouler ce site-ci, et c’est souvent la bonne réponse quand une entreprise a besoin de
                modifier six choses plutôt que tout.
              </p>
              <p>
                Vous n’en avez pas automatiquement besoin. Un CMS devient rentable quand le contenu change
                assez souvent pour qu’attendre après un développeur représente un coût réel. Sous ce seuil,
                c’est une obligation de mise à jour et une façon de plus de briser le site.
              </p>
              <p>Peu importe lequel, le siège propriétaire vous appartient — et le contenu aussi.</p>
            </Disclosure>

            <Disclosure
              summary="Base de données, authentification et stockage"
              hint="Supabase, Postgres — et pourquoi la plupart des sites n’en ont pas besoin"
            >
              <p>
                Disons-le franchement :{" "}
                <strong className="text-white">
                  un site vitrine n’a pas besoin d’une base de données sur mesure.
                </strong>{" "}
                Des pages, des services, un portfolio et un formulaire de contact n’en exigent aucune. Si un
                fournisseur en propose une pour un site de cinq pages, la bonne question est : qu’est-ce
                qu’elle stockerait?
              </p>
              <p>
                Il en faut une quand le site conserve quelque chose de propre à chaque visiteur : comptes
                utilisateurs, réservations, données sauvegardées, adhésions, tableau de bord interne, portail
                où votre personnel se connecte. Dans ce cas,{" "}
                <strong className="text-white">Supabase</strong> réunit une base de données{" "}
                <strong className="text-white">PostgreSQL</strong> (la référence pour conserver des données
                structurées), l’<strong className="text-white">authentification</strong> (inscription,
                connexion, réinitialisation de mot de passe, rôles) et le{" "}
                <strong className="text-white">stockage</strong> de fichiers — les morceaux qu’une petite
                équipe devrait autrement opérer elle-même.
              </p>
              <p>
                Là où elle existe, elle contient les données de vos clients, ce qui en fait votre
                responsabilité légale sous la Loi 25 au Québec et la LPRPDE au fédéral, peu importe qui l’a
                bâtie. C’est la raison la plus solide pour que l’organisation soit à votre nom.
              </p>
            </Disclosure>

            <Disclosure summary="Commerce en ligne" hint="Shopify — produits, inventaire, paiement, commandes, clients">
              <p>
                Une plateforme ecommerce, c’est une base de données, un CMS, un flux de paiement et un outil
                d’opérations vendus dans un seul abonnement.{" "}
                <strong className="text-white">Shopify</strong> détient votre catalogue, vos quantités en
                stock, le paiement, les commandes, les réglages d’expédition, les codes promo et votre liste
                de clients — laquelle devient, après quelques années, l’un des actifs les plus précieux de
                l’entreprise.
              </p>
              <p>
                La boutique doit être ouverte par vous, sous votre entreprise, avec vous comme propriétaire.
                Nous travaillons à l’intérieur avec un accès Personnel ou Collaborateur, limitable aux
                sections que le mandat touche et révocable en un clic. Un fournisseur qui insiste pour
                détenir le siège propriétaire détient votre liste de clients : ça devrait mettre fin à la
                conversation.
              </p>
            </Disclosure>

            <Disclosure summary="Paiements" hint="Stripe — la seule ligne non négociable">
              <p>
                <strong className="text-white">Stripe</strong> est un processeur de paiement : il recueille
                les données de carte sur une page que votre site ne voit jamais, débite la carte, puis
                dépose l’argent dans votre compte bancaire. Votre site n’en a besoin que si vous encaissez
                réellement — un dépôt, un abonnement, des frais de réservation, un produit numérique, un
                paiement sur une boutique sur mesure.
              </p>
              <p>
                C’est la seule ligne du tableau sans variation possible. Un compte Stripe est vérifié contre
                une identité juridique réelle, verse dans un vrai compte bancaire, et porte les obligations
                de rétrofacturation et de taxes qui viennent avec le fait d’encaisser. Il doit être ouvert
                par votre entreprise, à son nom, avec vos coordonnées bancaires. Nous bâtissons
                l’intégration avec des clés API restreintes que vous émettez depuis votre propre tableau de
                bord, et que vous pouvez révoquer sans toucher à rien d’autre.
              </p>
            </Disclosure>

            <Disclosure summary="Courriel" hint="Courriel d’entreprise et courriel transactionnel : deux choses">
              <p>
                Le <strong className="text-white">courriel d’entreprise</strong> — vous@votreentreprise.com,
                par Google Workspace ou Microsoft 365 — vous appartient sans nuance. C’est l’adresse de
                récupération de tous les autres comptes de cette page, ce qui en fait la pire chose à laisser
                dans l’espace de quelqu’un d’autre.
              </p>
              <p>
                Le <strong className="text-white">courriel transactionnel</strong>, c’est autre chose : le
                courrier automatique que votre site envoie. Une notification de formulaire, une confirmation
                de commande, une réinitialisation de mot de passe. Ça passe par un service de livraison comme{" "}
                <strong className="text-white">Resend</strong> ou Postmark, parce qu’un courriel envoyé
                directement par un serveur web aboutit dans les indésirables. Les forfaits gratuits couvrent
                habituellement au complet le volume d’un formulaire de PME.
              </p>
              <p>
                Peu importe qui détient ce compte, les enregistrements SPF, DKIM et DMARC vont dans votre
                DNS : ce sont eux qui permettent aux serveurs destinataires de confirmer que le courriel
                vient bien de votre domaine, et c’est la différence entre arriver et être filtré.
              </p>
            </Disclosure>

            <Disclosure summary="Analytique et comptes marketing" hint="GA4, Search Console, Google Ads, Clarity">
              <p>
                <strong className="text-white">Google Analytics 4</strong> mesure ce que font les visiteurs.{" "}
                <strong className="text-white">Google Search Console</strong> montre ce que les gens ont
                cherché avant d’arriver, et ce que Google pense de vos pages.{" "}
                <strong className="text-white">Microsoft Clarity</strong> enregistre des sessions et des
                cartes de chaleur. <strong className="text-white">Google Ads</strong> dépense votre argent.
                La <strong className="text-white">fiche d’établissement Google</strong> est votre présence
                dans Maps et dans le pack local.
              </p>
              <p>
                Tous sauf Ads sont gratuits, et chacun accumule un historique impossible à recréer plus tard.
                Ce sont aussi les comptes les plus souvent perdus, parce que ce sont les plus faciles à créer
                à la hâte sous la session Google qui adonnait d’être ouverte. Créez-les sous le compte de
                votre entreprise, puis invitez votre agence : Administrateur dans Analytics, utilisateur
                Complet délégué dans Search Console, accès gestionnaire sur Ads et sur votre fiche.
              </p>
              <p>
                Un détail technique sur lequel il vaut la peine d’insister : faites vérifier Search Console
                par un <strong className="text-white">enregistrement DNS</strong> plutôt que par un fichier
                téléversé ou une balise dans la page. Le fichier et la balise disparaissent à la première
                refonte. L’enregistrement DNS, lui, survit.
              </p>
            </Disclosure>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Juste ce qu’il faut</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Vous n’avez presque certainement pas besoin de tout ça.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Chaque service de cette page coûte de l’argent, de l’attention et du risque. La liste de ce
            qu’un projet exige devrait être un argument que vous gagnez, pas une pile dont vous héritez.
            Voici la version honnête.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {(
              [
                [
                  "Un site vitrine",
                  "Domaine, code, hébergement. C’est toute la liste. Pas de base de données, pas de CMS à moins de publier souvent, pas de Stripe, pas de Shopify. La majorité des sites que nous bâtissons pour des entreprises de services s’arrêtent ici — et ils sont plus rapides et moins chers à opérer pour cette raison.",
                ],
                [
                  "Un site avec un blogue ou des mises à jour fréquentes",
                  "Ajoutez un CMS. Lequel dépend de qui édite et à quelle fréquence, pas de la plateforme à la mode. Si deux personnes modifient trois pages par trimestre, un petit admin sur mesure bat une plateforme complète.",
                ],
                [
                  "Une boutique",
                  "Ajoutez Shopify, ou une boutique sur mesure avec Stripe. Shopify gagne quand vous avez de l’inventaire, de l’expédition et un catalogue; un paiement sur mesure gagne quand vous vendez quelques articles et voulez que le site reste un seul système.",
                ],
                [
                  "Un produit, un portail ou un système de réservation",
                  "Là, il vous faut une base de données, de l’authentification et probablement des paiements — le moment où un site web devient un logiciel, et où bien cadrer le projet compte le plus.",
                ],
              ] as [string, string][]
            ).map(([titre, texte]) => (
              <div key={titre} className="glass rounded-[1.75rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.05em]">{titre}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{texte}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-[#8C8080]">
            Déterminer dans lequel des quatre vous vous situez est une question de besoins, pas de
            technologie, et elle a son propre guide :{" "}
            <Link
              href="/fr/guide-site-web-entreprise"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              quel type de site web votre entreprise a réellement besoin
            </Link>
            . Une fois ça réglé, sur quoi le bâtir — et donc lesquels de ces comptes vous finirez par
            posséder — se décide dans{" "}
            <Link
              href="/fr/choisir-technologie-site-web"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              le guide des technologies
            </Link>
            . Si vous préférez y répondre par le prix, le{" "}
            <Link
              href="/fr/outils/calculateur-cout-projet"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              calculateur de coût de projet
            </Link>{" "}
            pose des questions sur votre entreprise plutôt que sur la technologie, et vous dit quelle forme
            prend le projet — avec la fourchette à partir de laquelle nous le chiffrerions.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">La séquence</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Comment un projet se déroule vraiment, dans l’ordre.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            L’ordre compte plus que n’importe quelle étape prise isolément. La propriété s’établit à
            l’étape quatre — <em className="not-italic text-white">avant</em> que quoi que ce soit soit
            bâti — parce que chaque étape suivante hérite de ce qui a été décidé là. Corriger la propriété
            après le lancement, c’est migrer une infrastructure en ligne : du travail que vous payez deux
            fois.
          </p>
          <WorkflowRail locale="fr" />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Sécurité</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Ne partagez jamais un mot de passe. Invitez un compte.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Envoyer un accès par courriel à un fournisseur a l’air de l’option rapide, et ça crée quatre
            problèmes d’un coup. Personne ne peut dire qui a fait quelle modification. Vous ne pouvez pas
            retirer une personne sans bloquer tout le monde. Les codes d’authentification doivent être
            relayés par texto au pire moment possible. Et quand le fournisseur change d’employé, vos
            identifiants partent avec quelqu’un que vous n’avez jamais rencontré.
          </p>
          <CredentialSplit locale="fr" />
          <div className="mt-10 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/[0.07] p-8">
            <h3 className="geist text-2xl font-black tracking-[-0.05em]">Le test qui compte</h3>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              Votre capacité à accéder à votre propre infrastructure ne devrait pas dépendre du portable, du
              téléphone, du courriel ou de l’application d’authentification d’un employé de StillAwake. Si
              toute notre équipe disparaissait demain, vous pourriez encore vous connecter à votre domaine,
              à votre hébergement, à votre CMS, à votre base de données, à Stripe, à Shopify et à votre
              analytique — parce qu’ils ont toujours été les vôtres et que nous n’y avons jamais été que des
              invités. Ce n’est pas une promesse sur notre conduite : c’est une propriété de la façon dont
              les comptes ont été montés, et vous pouvez le vérifier vous-même en dix minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Fin de mandat</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Ce qui arrive si nous cessons de travailler ensemble.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Les mandats se terminent. Les budgets changent, les équipes changent, des entreprises se
            vendent, et parfois une relation de travail arrive simplement à son terme. Rien de tout ça ne
            devrait mettre votre site web en péril, et un studio confiant dans son travail n’a aucune raison
            de rendre le départ difficile.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {(
              [
                [
                  "Rien ne s’éteint",
                  "Le domaine, l’hébergement, le CMS, la base de données, Stripe et l’analytique sont déjà à vous et déjà payés par vous. Retirer nos accès change qui peut modifier le site. Ça ne change pas si le site roule.",
                ],
                [
                  "Vous recevez l’inventaire",
                  "Une liste écrite de chaque compte, son rôle, son fournisseur, son détenteur et son coût — en plus du dépôt de code, des fichiers de design sources et de la documentation rédigée pendant le mandat.",
                ],
                [
                  "Les accès sont révoqués, par vous",
                  "Vous retirez nos comptes administrateur, développeur, personnel et collaborateur de votre côté. Vous n’avez pas à attendre après nous, ni à croire sur parole que c’est fait.",
                ],
                [
                  "Une nouvelle équipe peut embarquer tout de suite",
                  "N’importe quel développeur compétent peut lire un dépôt avec un historique complet et reprendre une pile technologique standard. Rien dans le build ne dépend d’un outil propriétaire que nous seuls savons opérer.",
                ],
                [
                  "L’historique de recherche survit",
                  "Parce qu’Analytics, Search Console et votre fiche Google ont été vérifiés sous vos comptes — Search Console par enregistrement DNS — les années de données restent avec l’entreprise plutôt qu’avec le fournisseur.",
                ],
                [
                  "La porte reste ouverte",
                  "Le support après coup existe et son prix est affiché. Partir n’est pas pénalisé, et revenir n’exige pas de nous réexpliquer une infrastructure que nous ne voyons plus, parce que nous l’avons documentée en sortant.",
                ],
              ] as [string, string][]
            ).map(([titre, texte]) => (
              <div key={titre} className="glass rounded-[1.75rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.05em]">{titre}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{texte}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-sm leading-7 text-[#8C8080]">
            Si vous lisez ceci parce qu’un ancien fournisseur détient quelque chose qui vous appartient,
            c’est une situation récupérable plus souvent qu’elle en a l’air. Un domaine se transfère, les
            propriétés Google se revérifient par DNS, et un site peut être reconstruit à partir de ce qui
            est publiquement servi même quand les fichiers d’origine ont disparu. Commencez par découvrir
            qui est votre registraire : tout le reste découle de là.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Service géré</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Posséder et opérer, ce sont deux métiers différents.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Posséder votre infrastructure ne veut pas dire l’administrer. La plupart des propriétaires
            d’entreprise veulent les comptes à leur nom et le travail hors de leur bureau, et ces deux
            choses sont parfaitement compatibles — c’est précisément ce qu’est un service géré.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <h3 className="geist text-2xl font-black tracking-[-0.05em]">Vous gardez</h3>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#C7B9B9]">
                {[
                  "Le siège propriétaire sur chaque compte",
                  "La relation de facturation pour tout ce que vous payez directement",
                  "Les données — clients, commandes, soumissions, historique analytique",
                  "Le droit de nous retirer, sans préavis ni négociation",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#D71920]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/[0.07] p-8">
              <h3 className="geist text-2xl font-black tracking-[-0.05em]">Nous gérons</h3>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#C7B9B9]">
                {[
                  "Déploiements, surveillance de la disponibilité et sauvegardes quotidiennes",
                  "Mises à jour logicielles, de dépendances et de sécurité",
                  "DNS, SSL et enregistrements de délivrabilité maintenus corrects",
                  "Petites modifications de contenu, et correctifs quand quelque chose brise",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#D71920]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Nos prix pour ça sont affichés plutôt que chiffrés sur demande : hébergement géré à{" "}
            <strong className="text-white">{HOSTING.monthly} $ CAD par mois</strong>, et forfait d’entretien
            complet — hébergement, mises à jour, surveillance, sauvegardes et petites modifications, sans
            frais d’incident séparés quand quelque chose brise — à{" "}
            <strong className="text-white">{CARE.monthly} $ CAD par mois</strong>. Les détails sont sur la{" "}
            <Link
              href="/fr/maintenance-site-web"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              page maintenance et support
            </Link>
            , avec les tarifs de dépannage ponctuel pour les sites que nous n’avons pas bâtis.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="https://stillawake.studio/start"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90"
            >
              Démarrer un projet
            </Link>
            <Link
              href="/fr/contact"
              className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40"
            >
              Poser une question sur la propriété
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions sur la propriété d’un site web" items={FAQ} />

      <ArticlesLies pillar="/fr/propriete-site-web" />

      <RelatedServices
        title="Pour continuer"
        links={[
          ["Quel type de site vous faut-il?", "/fr/guide-site-web-entreprise"],
          ["Quelle technologie choisir?", "/fr/choisir-technologie-site-web"],
          ["Maintenance et support", "/fr/maintenance-site-web"],
          ["Création de site web", "/fr/agence-web-montreal"],
          ["Développement logiciel", "/fr/developpement-logiciel"],
          ["Prix d’un site web au Québec", "/fr/prix-site-web-quebec"],
          ["Calculateur de coût", "/fr/outils/calculateur-cout-projet"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/website-ownership"],
        ]}
      />
    </main>
  );
}
