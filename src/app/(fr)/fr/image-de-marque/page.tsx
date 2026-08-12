import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Image de marque | Identités visuelles premium",
  description: "Création d'image de marque à Montréal : identité visuelle, logo, système de marque complet. Des marques qui inspirent confiance avant même qu'un mot soit lu.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/image-de-marque",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/image-de-marque",
      "en-CA": "https://stillawakemedia.com/branding",
      "x-default": "https://stillawakemedia.com/branding",
    },
  },
  openGraph: {
    title: "Image de marque | Identités visuelles premium",
    description: "Création d'image de marque à Montréal : identité visuelle, logo, système de marque complet. Des marques qui inspirent confiance avant même qu'un mot soit lu.",
    url: "https://stillawakemedia.com/fr/image-de-marque",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [["Combien coûte une image de marque?", "Sur devis écrit selon la portée : un logo seul diffère d'un système de marque complet. Les fourchettes du marché québécois vont d'environ 1 200 $ pour un logo à 3 200 $ et plus pour une identité complète. Vous recevez un prix fixe avant de vous engager."], ["Travaillez-vous avec des marques existantes?", "Oui — rafraîchissement, refonte complète ou simple mise en cohérence d'une marque qui a grandi trop vite."], ["Que reçoit-on à la fin?", "Tous les fichiers sources, les exports pour chaque usage, et un guide de marque que n'importe quel collaborateur futur peut suivre."], ["La marque fonctionne-t-elle dans les deux langues?", "Oui — nous concevons pour le marché québécois : les systèmes tiennent compte du bilinguisme dès le départ."]];

export default function Page() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/image-de-marque"
        name="Image de marque et identité visuelle"
        description="Systèmes d'identité de marque complets : logo, couleurs, typographie, guide de marque, sur devis."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Image de marque", "/fr/image-de-marque"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />
      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Image de marque</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">Des marques qui paraissent premium avant qu'un mot soit lu.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu'est-ce qu'un système d'image de marque?</strong> C'est bien plus qu'un logo : c'est l'identité visuelle complète — logo, couleurs, typographie, ton et règles d'usage — qui rend votre entreprise reconnaissable et crédible partout où elle apparaît. StillAwake Media conçoit des systèmes de marque cohérents depuis Montréal.
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
            {["Logo et déclinaisons", "Palette de couleurs et typographie", "Guide de marque et règles d'usage", "Ton de voix et messages clés", "Gabarits d'application (web, social, documents)"].map((x) => (<li key={x} className="flex gap-2"><span className="text-[#D71920]">—</span> {x}</li>))}
          </ul>
        </div>
      </section>
      <FaqBlock title="Questions fréquentes" items={FAQ} />
      <RelatedServices title="Services connexes" links={[["Création de site web", "/fr/agence-web-montreal"], ["Refonte de site web", "/fr/refonte-site-web"], ["Tarifs", "/fr/tarifs"], ["English version", "/branding"]]} />
    </main>
  );
}
