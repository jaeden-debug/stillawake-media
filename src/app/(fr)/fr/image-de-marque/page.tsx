import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Image de marque et identité visuelle | Studio de branding à Montréal",
  description:
    "Création d'image de marque à Montréal : logo, identité visuelle, système de marque complet et déclinaison web. Quatre marques réelles en production comme preuve — pas un portfolio de maquettes.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/image-de-marque",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/image-de-marque",
      "en-CA": "https://stillawakemedia.com/branding",
      "x-default": "https://stillawakemedia.com/branding",
    },
  },
  openGraph: {
    title: "Image de marque | StillAwake Media",
    description: "Identité visuelle et systèmes de marque — prouvés par des marques réelles en production.",
    url: "https://stillawakemedia.com/fr/image-de-marque",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûte une image de marque?",
    "Sur devis écrit — le prix dépend de la portée : un logo avec ses déclinaisons n'est pas un système de marque complet avec guide, gabarits et déclinaison web. Vous décrivez votre projet dans notre formulaire, vous recevez une portée écrite avec prix fixe. Aucun appel de vente obligatoire, et le prix ne bouge pas en cours de route.",
  ],
  [
    "Quelle est la différence entre un logo et une image de marque?",
    "Le logo est un fichier. L'image de marque est le système qui décide de tout le reste : palette avec codes exacts, typographies et leurs règles d'usage, ton de voix, gabarits. Le test honnête : si on enlève votre logo de votre site, est-ce qu'on vous reconnaît encore? Chacune de nos quatre marques en production passe ce test — elles ne se ressemblent pas entre elles.",
  ],
  [
    "Ma marque doit-elle fonctionner en français et en anglais?",
    "Au Québec, presque toujours. C'est une contrainte de design réelle : slogan qui se traduit sans perdre son sens, longueurs de texte différentes dans les gabarits, nom qui se prononce dans les deux langues. Nous concevons pour les deux dès le départ — le site trilingue de TravelDesign By Lisa (français, anglais, espagnol) porte la même identité dans ses 834 URL.",
  ],
  [
    "Livrez-vous les fichiers sources?",
    "Oui, tout : fichiers vectoriels, exports par usage (web, imprimé, réseaux sociaux), guide de marque et gabarits. La marque vous appartient entièrement — c'est votre actif, pas le nôtre.",
  ],
  [
    "Pouvez-vous appliquer la marque à mon site web ensuite?",
    "C'est notre force principale : nous sommes d'abord un studio qui construit. La même équipe qui dessine votre identité peut la déployer sur votre site, votre boutique Shopify ou votre application — sans perte de fidélité entre la maquette et la production.",
  ],
];

const BRANDS: [string, string, string, string][] = [
  [
    "Blackwater Aquatics",
    "/fr/etude-de-cas-blackwater-aquatics",
    "Marque de niche : boutique + base de connaissances",
    "Une identité d'autorité scientifique pour une boutique d'aquariophilie — appliquée sur 64 pages éducatives et 17 produits. Le résultat mesuré : 27,8 % de clients récurrents.",
  ],
  [
    "NAVTRL / Stalkr",
    "/fr/etude-de-cas-stalkr-navtrl",
    "Marque produit : app + site + courriels",
    "Une marque tech déployée sur une app mobile de 11 écrans, un site de 31 routes et 34 gabarits de courriels — cohérente du magasin d'applications à la boîte de réception.",
  ],
  [
    "BankDeMark",
    "/fr/etude-de-cas-bankdemark",
    "Marque financière : confiance et précision",
    "Une identité sobre pour une plateforme de littératie financière — où la crédibilité visuelle doit soutenir des calculs vérifiés par 26 cas de référence.",
  ],
  [
    "TravelDesign By Lisa",
    "/fr/etude-de-cas-lisa-travel-design",
    "Marque de service : chaleureuse et trilingue",
    "Une identité d'agence de voyage qui tient en français, en anglais et en espagnol sur 834 URL — avec des sessions moyennes mesurées de plus de 9 minutes.",
  ],
];

export default function ImageDeMarquePage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/image-de-marque"
        name="Image de marque et identité visuelle"
        description="Création de logo, identité visuelle et système de marque complet à Montréal, avec déclinaison web par la même équipe."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Image de marque", "/fr/image-de-marque"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Image de marque</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Une image de marque n&apos;est pas un logo. C&apos;est un système.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce que l&apos;image de marque?</strong> C&apos;est
            l&apos;ensemble des décisions visuelles et verbales qui rendent votre entreprise reconnaissable sans son
            nom : logo et déclinaisons, palette, typographie, ton, gabarits. Notre différence est simple à vérifier :
            les quatre marques ci-dessous sont en production en ce moment, chacune avec un style distinct — pas des
            concepts de portfolio, des entreprises qui opèrent avec.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/fr/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">Démarrer ma marque</Link>
            <Link href="/fr/realisations" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">Voir le portfolio</Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Quatre marques, quatre personnalités — une seule équipe
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            Le vrai test d&apos;un studio de branding : est-ce que ses marques se ressemblent toutes? Comparez
            vous-même — chaque étude de cas est publique.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {BRANDS.map(([name, href, type, detail]) => (
              <Link key={name} href={href} className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
                <p className="text-sm uppercase tracking-[0.2em] text-[#D71920]">{type}</p>
                <h3 className="mt-2 text-xl font-semibold">{name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Les livrables, concrètement</h2>
            <ul className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>— Logo principal + déclinaisons (horizontal, icône, monochrome)</li>
              <li>— Palette avec codes exacts (écran et imprimé) et règles d&apos;usage</li>
              <li>— Typographies avec hiérarchie définie</li>
              <li>— Guide de marque : ce qui est permis, ce qui ne l&apos;est pas</li>
              <li>— Gabarits selon vos besoins : réseaux sociaux, présentations, signatures courriel</li>
              <li>— Tous les fichiers sources — la marque vous appartient</li>
            </ul>
            <h3 className="mt-10 text-xl font-semibold">La contrainte québécoise</h3>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              Une marque d&apos;ici vit en deux langues. Ça change le design : les textes français sont ~20 % plus
              longs que l&apos;anglais dans les mêmes gabarits, les slogans doivent porter dans les deux langues, et
              l&apos;affichage en français est la norme du marché. On conçoit pour cette réalité dès le premier
              croquis, pas en rattrapage.
            </p>
          </div>
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">De la marque au produit</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              La plupart des studios livrent un PDF et vous laissent trouver quelqu&apos;un pour l&apos;appliquer.
              Nous sommes l&apos;inverse : un studio de{" "}
              <Link href="/fr/agence-web-montreal" className="text-[#D71920] underline-offset-4 hover:underline">développement web</Link>{" "}
              et{" "}
              <Link href="/fr/developpement-logiciel" className="text-[#D71920] underline-offset-4 hover:underline">logiciel</Link>{" "}
              qui fait aussi la marque. Résultat : l&apos;identité de NAVTRL est identique dans l&apos;app iOS, sur les
              19 pages d&apos;atterrissage et dans les 34 gabarits de courriels — parce que la même équipe a tout
              construit.
            </p>
            <h3 className="mt-10 text-xl font-semibold">Prix et processus</h3>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              Sur devis écrit avec prix fixe. Vous décrivez le projet dans notre formulaire asynchrone; vous recevez
              la portée par courriel — jamais d&apos;appel de vente obligatoire. Les projets combinés
              (marque + site) sont chiffrés ensemble, ce qui évite de payer deux fois la phase de découverte.
            </p>
            <Link href="/fr/contact" className="mt-8 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Obtenir une soumission</Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Création de site web", "/fr/agence-web-montreal"],
          ["Développement Shopify", "/fr/developpement-shopify"],
          ["Développement logiciel", "/fr/developpement-logiciel"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/branding"],
        ]}
      />
    </main>
  );
}
