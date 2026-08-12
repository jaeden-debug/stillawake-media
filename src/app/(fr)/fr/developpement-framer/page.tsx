import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Développement Framer | Sites Framer premium et optimisés SEO",
  description: "Développement Framer à Montréal : sites premium avec un vrai travail de structure SEO. Design soigné, animations fluides, livré vite — sur devis écrit.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/developpement-framer",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/developpement-framer",
      "en-CA": "https://stillawakemedia.com/framer-development",
      "x-default": "https://stillawakemedia.com/framer-development",
    },
  },
  openGraph: {
    title: "Développement Framer | Sites Framer premium et optimisés SEO",
    description: "Développement Framer à Montréal : sites premium avec un vrai travail de structure SEO. Design soigné, animations fluides, livré vite — sur devis écrit.",
    url: "https://stillawakemedia.com/fr/developpement-framer",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [["Framer ou site codé sur mesure?", "Framer excelle pour les sites vitrines rapides à lancer avec un design fort. Le sur-mesure gagne quand il faut du contenu massif, du bilinguisme complexe ou des fonctionnalités applicatives. On vous recommande honnêtement l'un ou l'autre selon le mandat."], ["Combien coûte un site Framer?", "Sur devis écrit — généralement plus rapide et moins coûteux qu'un site codé sur mesure équivalent. Prix fixe avant engagement."], ["Puis-je modifier le site moi-même ensuite?", "Oui — c'est une des forces de Framer. La formation est incluse."], ["Le SEO est-il limité sur Framer?", "Non, si la structure est bien faite : métadonnées, sémantique, vitesse et contenu se travaillent très bien sur Framer."]];

export default function Page() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/developpement-framer"
        name="Développement Framer"
        description="Sites Framer premium avec structure SEO sérieuse, sur devis."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Développement Framer", "/fr/developpement-framer"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />
      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Développement Framer</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">Des sites Framer premium, avec une vraie structure SEO.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu'est-ce que le développement Framer?</strong> Framer est une plateforme de création de sites qui permet un design très soigné et des animations fluides avec un délai de livraison court. StillAwake Media construit des sites Framer quand c'est le bon outil pour le mandat — avec la même rigueur SEO que nos sites codés sur mesure.
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
            {["Site Framer complet, design premium", "Structure SEO : métadonnées, sémantique, performance", "Animations et interactions soignées", "Formation pour éditer votre contenu vous-même"].map((x) => (<li key={x} className="flex gap-2"><span className="text-[#D71920]">—</span> {x}</li>))}
          </ul>
        </div>
      </section>
      <FaqBlock title="Questions fréquentes" items={FAQ} />
      <RelatedServices title="Services connexes" links={[["Création de site web", "/fr/agence-web-montreal"], ["Refonte de site web", "/fr/refonte-site-web"], ["Tarifs", "/fr/tarifs"], ["English version", "/framer-development"]]} />
    </main>
  );
}
