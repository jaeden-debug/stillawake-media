import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";

/**
 * Politique de confidentialité — version française.
 *
 * Traduction du contenu anglais, pas un texte distinct : les deux pages
 * doivent décrire exactement les mêmes traitements, sinon la divergence
 * devient elle-même un problème de conformité.
 */

const url = "https://stillawakemedia.com/fr/confidentialite";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Ce que StillAwake Media recueille, quels outils de mesure fonctionnent, quels témoins sont déposés, comment fonctionne le consentement et comment nous joindre.",
  alternates: {
    canonical: url,
    languages: {
      "en-CA": "https://stillawakemedia.com/privacy",
      "fr-CA": url,
      "x-default": "https://stillawakemedia.com/privacy",
    },
  },
};

const updated = "13 août 2026";

export default function ConfidentialitePage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/fr/confidentialite" />

      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="geist text-4xl font-black tracking-[-0.04em] md:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-sm text-[#C7B9B9]">Mise à jour le {updated}</p>

          <div className="mt-12 space-y-10 text-[#C7B9B9]">
            <section>
              <h2 className="geist text-2xl font-bold text-white">Qui nous sommes</h2>
              <p className="mt-3">
                StillAwake Media est un studio numérique établi à Montréal,
                Québec, Canada, qui travaille à distance avec une clientèle
                internationale. Pour toute question relative à la vie privée,
                écrivez à{" "}
                <a href="mailto:jaeden@stillawakemedia.com" className="underline hover:text-white">
                  jaeden@stillawakemedia.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">
                Renseignements que vous nous fournissez
              </h2>
              <p className="mt-3">
                Lorsque vous remplissez le formulaire de contact ou le
                questionnaire d&apos;intégration sur stillawake.studio, nous
                recueillons ce que vous y inscrivez — généralement votre nom,
                votre courriel et une description de votre projet. Nous nous en
                servons pour vous répondre et pour cadrer le mandat. Nous ne les
                vendons pas et ne les utilisons pas à des fins publicitaires.
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">
                Mesure d&apos;audience et témoins
              </h2>
              <p className="mt-3">
                Trois outils de mesure fonctionnent sur ce site. Deux d&apos;entre
                eux restent inactifs tant que vous ne les avez pas acceptés.
              </p>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-white">
                    Ahrefs Web Analytics — toujours actif
                  </h3>
                  <p className="mt-1">
                    Compte les pages consultées. Ne dépose aucun témoin et ne
                    crée aucun identifiant : il mesure des pages, pas des
                    personnes. Il fonctionne sans consentement parce qu&apos;il ne
                    peut pas vous identifier.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    Google Analytics 4 — seulement avec consentement
                  </h3>
                  <p className="mt-1">
                    Mesure les pages visitées et le parcours dans le site. Si
                    vous acceptez, il dépose les témoins{" "}
                    <code className="text-white">_ga</code> et{" "}
                    <code className="text-white">_ga_KE1CWNHY0S</code>. Si vous
                    refusez, le mode de consentement Google maintient le
                    stockage refusé et aucun témoin de ce type n&apos;est déposé.
                    Les signaux publicitaires sont refusés en tout temps — nous
                    n&apos;utilisons aucune balise publicitaire ni de reciblage.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    Microsoft Clarity — seulement avec consentement
                  </h3>
                  <p className="mt-1">
                    Enregistre de façon anonymisée l&apos;interaction avec les
                    pages — défilement, clics, déplacement du curseur — afin de
                    repérer ce qui rend une page confuse. Si vous acceptez, il
                    dépose <code className="text-white">_clck</code> et{" "}
                    <code className="text-white">_clsk</code>. Si vous refusez,
                    le script Clarity n&apos;est jamais chargé.
                  </p>
                </div>
              </div>
              <p className="mt-6">
                Votre choix est conservé dans le stockage local de votre
                navigateur sous <code className="text-white">sam-consent</code>,
                avec la date à laquelle vous l&apos;avez fait. Effacer le stockage
                de votre navigateur fera réapparaître la bannière.
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">Fournisseurs</h2>
              <p className="mt-3">
                Nous utilisons Vercel pour l&apos;hébergement, Supabase pour la
                conservation des demandes et des données de projet, Resend pour
                l&apos;envoi de courriels, Google Analytics, Microsoft Clarity et
                Ahrefs pour la mesure, ainsi que Stripe lorsqu&apos;un projet est
                facturé en ligne. Certains traitent des données à
                l&apos;extérieur du Canada, notamment aux États-Unis.
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">Vos droits</h2>
              <p className="mt-3">
                Vous pouvez demander quels renseignements nous détenons à votre
                sujet, en demander la rectification ou la suppression, retirer
                votre consentement à la mesure d&apos;audience en tout temps en
                effaçant le stockage de votre navigateur et en choisissant de
                nouveau, et — en vertu de la Loi 25 — demander vos données dans
                un format portable. Écrivez à{" "}
                <a href="mailto:jaeden@stillawakemedia.com" className="underline hover:text-white">
                  jaeden@stillawakemedia.com
                </a>{" "}
                ; nous répondons dans les 30 jours.
              </p>
              <p className="mt-3">
                Vous pouvez également porter plainte auprès de la Commission
                d&apos;accès à l&apos;information du Québec, ou de votre autorité
                de protection des données si vous êtes dans l&apos;Union
                européenne ou au Royaume-Uni.
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">Conservation</h2>
              <p className="mt-3">
                Les demandes et les dossiers de projet sont conservés pendant la
                durée de la relation d&apos;affaires et aussi longtemps ensuite
                que les règles fiscales et comptables l&apos;exigent. Les données
                de mesure suivent la période de conservation configurée dans
                chaque outil.
              </p>
            </section>

            <p className="border-t border-white/10 pt-8 text-sm">
              Available in English:{" "}
              <Link href="/privacy" className="underline hover:text-white">
                Privacy policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
