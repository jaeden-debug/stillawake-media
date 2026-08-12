import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Automatisation IA | Des processus d'affaires sans friction",
  description: "Automatisation IA pour entreprises québécoises : workflows sur mesure, intégrations et outils IA qui éliminent le travail répétitif. Sur devis écrit, sans appel de vente.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/automatisation-ia",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/automatisation-ia",
      "en-CA": "https://stillawakemedia.com/ai-automation",
      "x-default": "https://stillawakemedia.com/ai-automation",
    },
  },
  openGraph: {
    title: "Automatisation IA | Des processus d'affaires sans friction",
    description: "Automatisation IA pour entreprises québécoises : workflows sur mesure, intégrations et outils IA qui éliminent le travail répétitif. Sur devis écrit, sans appel de vente.",
    url: "https://stillawakemedia.com/fr/automatisation-ia",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [["Combien coûte l'automatisation IA?", "Sur devis écrit : une automatisation ciblée diffère d'un système complet. Décrivez vos processus dans notre formulaire et vous recevrez une portée écrite avec prix fixe."], ["Quels processus valent la peine d'être automatisés?", "Ceux qui sont répétitifs, fréquents et basés sur des règles : tri de courriels, saisie de données, génération de rapports, suivis clients. L'audit initial identifie où les heures se perdent réellement."], ["Utilisez-vous nos outils existants?", "Oui — l'automatisation se branche sur ce que vous utilisez déjà plutôt que de tout remplacer."], ["Est-ce sécuritaire pour nos données?", "Les accès sont limités au strict nécessaire et documentés; rien n'est envoyé à des tiers sans que ce soit explicite dans la portée."]];

export default function Page() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/automatisation-ia"
        name="Automatisation IA"
        description="Workflows IA sur mesure, intégrations et outils internes qui automatisent les processus d'affaires, sur devis."
        breadcrumb={[["Accueil", "/fr"], ["Services", "/services"], ["Automatisation IA", "/fr/automatisation-ia"]]}
        faq={FAQ}
        inLanguage="fr-CA"
      />
      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Automatisation IA</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">Des systèmes IA qui éliminent la friction et font gagner des heures.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu'est-ce que l'automatisation IA?</strong> C'est l'utilisation d'outils d'intelligence artificielle et d'automatisations sur mesure pour retirer le travail répétitif de vos opérations : traitement de courriels, génération de documents, workflows entre vos logiciels, assistants internes. StillAwake Media conçoit ces systèmes depuis Montréal — et les utilise dans ses propres opérations.
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
            {["Audit de vos processus et occasions d'automatisation", "Workflows IA sur mesure entre vos outils existants", "Assistants et agents internes", "Intégrations (CRM, courriel, facturation, données)", "Documentation et formation"].map((x) => (<li key={x} className="flex gap-2"><span className="text-[#D71920]">—</span> {x}</li>))}
          </ul>
        </div>
      </section>
      <FaqBlock title="Questions fréquentes" items={FAQ} />
      <RelatedServices title="Services connexes" links={[["Développement logiciel", "/fr/developpement-logiciel"], ["Référencement IA (AEO)", "/fr/referencement-ia"], ["Tarifs", "/fr/tarifs"], ["English version", "/ai-automation"]]} />
    </main>
  );
}
