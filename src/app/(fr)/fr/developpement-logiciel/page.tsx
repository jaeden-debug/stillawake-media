import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Développement logiciel sur mesure | Applications web et SaaS",
  description: "Développement de logiciels sur mesure à Montréal : applications web, SaaS, tableaux de bord et outils internes. Portée écrite et prix fixe par courriel — sans appel de vente.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/developpement-logiciel",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/developpement-logiciel",
      "en-CA": "https://stillawakemedia.com/software-development",
      "x-default": "https://stillawakemedia.com/software-development",
    },
  },
  openGraph: {
    title: "Développement logiciel sur mesure | Applications web et SaaS",
    description: "Développement de logiciels sur mesure à Montréal : applications web, SaaS, tableaux de bord et outils internes. Portée écrite et prix fixe par courriel — sans appel de vente.",
    url: "https://stillawakemedia.com/fr/developpement-logiciel",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [["Combien coûte un logiciel sur mesure?", "Chaque projet est soumissionné par écrit : les fourchettes du marché vont d'environ 15 000 $ à bien plus de 100 000 $ CAD selon les fonctionnalités, les comptes, les paiements et les intégrations. Décrivez votre projet dans notre formulaire et vous recevrez une portée écrite avec prix fixe — sans appel."], ["Développez-vous des SaaS complets?", "Oui — comptes utilisateurs, abonnements, paiements, tableaux de bord, API. Nos propres produits internes fonctionnent sur les mêmes fondations que nous vendons."], ["Quelles technologies utilisez-vous?", "Des technologies web modernes et éprouvées (Next.js, React, TypeScript, Postgres) choisies pour la longévité et la performance — jamais pour la mode."], ["Qui possède le code?", "Vous. À la livraison finale, le code source, les accès et la documentation vous sont transférés."]];

export default function Page() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/developpement-logiciel"
        name="Développement logiciel sur mesure"
        description="Développement d'applications web, SaaS et outils internes sur mesure, sur devis écrit."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Développement logiciel", "/fr/developpement-logiciel"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />
      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Développement logiciel</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">Des logiciels bâtis autour de votre façon réelle de travailler.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu'est-ce que le développement logiciel sur mesure?</strong> C'est la conception et la construction d'applications web, de plateformes SaaS, de tableaux de bord et d'outils internes faits pour vos processus — plutôt que de forcer vos processus dans un logiciel générique. StillAwake Media conçoit et code ces systèmes depuis Montréal, pour des clients partout.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/fr/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">Obtenir une soumission écrite</Link>
            <Link href="/fr/tarifs" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">Voir les tarifs</Link>
          </div>
        </div>
      </section>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">Ce que vous recevez</h2>
          <ul className="mt-8 grid gap-3 text-[#C7B9B9] md:grid-cols-2">
            {["Applications web et plateformes SaaS complètes", "Tableaux de bord et outils internes", "Intégrations (paiements, comptes, API, automatisations)", "Architecture évolutive documentée", "Formation et transfert complet"].map((x) => (<li key={x} className="flex gap-2"><span className="text-[#D71920]">—</span> {x}</li>))}
          </ul>
        </div>
      </section>
      <FaqBlock title="Questions fréquentes" items={FAQ} />
      <RelatedServices title="Services connexes" links={[["Création de site web", "/fr/agence-web-montreal"], ["Automatisation IA", "/fr/automatisation-ia"], ["Maintenance", "/fr/maintenance-site-web"], ["Tarifs", "/fr/tarifs"], ["English version", "/software-development"]]} />
    </main>
  );
}
