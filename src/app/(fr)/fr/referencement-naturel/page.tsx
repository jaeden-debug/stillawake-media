import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { jaedenDoody } from "@/data/people/jaeden-doody";

const url = `${siteUrl}/fr/referencement-naturel`;

export const metadata: Metadata = {
  title: "Le référencement naturel (SEO), expliqué simplement",
  description:
    "C'est quoi le SEO? Le référencement naturel expliqué sans jargon : comment Google classe les sites, les trois piliers du travail, les délais réalistes et les mythes à éviter — par un studio qui publie ses résultats mesurés.",
  alternates: { canonical: "/fr/referencement-naturel" },
  openGraph: {
    title: "Le référencement naturel (SEO), expliqué simplement | StillAwake Media",
    description: "Comment Google classe les sites, les vrais piliers du SEO, et les délais honnêtes.",
    url,
    type: "article",
    locale: "fr_CA",
  },
};

export default function ReferencementNaturelPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: "Le référencement naturel (SEO), expliqué simplement",
        description:
          "Le SEO expliqué sans jargon : fonctionnement de Google, les trois piliers, les délais réalistes, les mythes.",
        datePublished: "2026-08-12",
        dateModified: "2026-08-12",
        inLanguage: "fr-CA",
        mainEntityOfPage: url,
        author: { "@id": jaedenDoody.id },
        publisher: { "@id": entityIds.organization },
        isPartOf: { "@id": entityIds.website },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${siteUrl}/fr` },
          { "@type": "ListItem", position: 2, name: "Le référencement naturel", item: url },
        ],
      },
    ],
  };

  return (
    <main className="bg-black pt-28 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Guide · SEO</p>
          <h1 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Le référencement naturel (SEO), expliqué simplement
          </h1>
          <p className="mt-6 text-sm text-[#8F8585]">
            Par{" "}
            <Link href="/fr/fondateur/jaeden-doody" className="underline decoration-[#D71920] underline-offset-4 hover:text-white">
              Jaeden Doody
            </Link>{" "}
            · Publié le 12 août 2026
          </p>

          <div className="mt-10 space-y-6 text-base leading-8 text-[#C7B9B9]">
            <p className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-lg leading-8">
              <strong className="text-white">Le référencement naturel — le SEO (Search Engine Optimization) — est
              l&apos;ensemble du travail qui permet à votre site web d&apos;apparaître dans les résultats de Google
              quand vos clients cherchent ce que vous offrez, sans payer de publicité.</strong> Ça combine trois
              choses : un site techniquement sain que Google peut lire, du contenu qui répond aux vraies questions de
              vos clients, et une crédibilité que Google peut vérifier. Rien de magique — du travail mesurable.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Comment Google décide qui apparaît</h2>
            <p>
              Google fait trois choses avec votre site. Il l&apos;<strong className="text-white">explore</strong> :
              ses robots suivent les liens et lisent vos pages. Il l&apos;<strong className="text-white">indexe</strong> :
              il range ce qu&apos;il a compris dans son immense catalogue. Puis il le{" "}
              <strong className="text-white">classe</strong> : pour chaque recherche, il ordonne les pages selon des
              centaines de signaux — pertinence du contenu, qualité technique, expérience mobile, vitesse, réputation.
              Le SEO travaille chacune de ces trois étapes. Un site magnifique que Google ne peut pas explorer
              correctement n&apos;existe tout simplement pas dans les résultats.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Les trois piliers du travail</h2>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">1. Le SEO technique : la fondation</h3>
            <p>
              Structure propre, vitesse de chargement, stabilité visuelle, données structurées, plan de site,
              adaptation mobile. C&apos;est invisible pour le visiteur et décisif pour Google. Exemple concret et
              mesuré de notre portfolio : la plateforme de{" "}
              <Link href="/fr/etude-de-cas-lisa-travel-design" className="text-[#D71920] underline underline-offset-4">TravelDesign By Lisa</Link>{" "}
              avait environ 2 300 défauts techniques à corriger. Une fois la fondation réparée, les positions ont
              décollé — de zéro clic organique à la page 1 en 8 semaines. L&apos;ordre des travaux n&apos;était pas un
              hasard : le contenu ne peut pas se positionner sur une fondation brisée.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">2. Le contenu : répondre aux vraies questions</h3>
            <p>
              Google classe des réponses. Un site qui répond clairement, en profondeur et honnêtement aux questions de
              ses clients — prix, délais, comparaisons, problèmes — accumule des positions. Un site qui répète « le
              meilleur service » sur toutes ses pages n&apos;en accumule aucune. La démonstration la plus nette dans
              notre portfolio :{" "}
              <Link href="/fr/etude-de-cas-blackwater-aquatics" className="text-[#D71920] underline underline-offset-4">Blackwater Aquatics</Link>,
              une boutique où 64 pages éducatives portent 17 produits. Résultat mesuré : ~60 000 impressions sur les 12
              meilleures pages, et une fiche produit en page 1 avec 8,6 % de taux de clic — chose presque impossible
              sans cette architecture de contenu.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">3. La crédibilité : ce que les autres disent de vous</h3>
            <p>
              Liens entrants de sites crédibles, avis, cohérence de vos informations partout sur le web, fiche Google
              soignée (notre{" "}
              <Link href="/fr/fiche-google-entreprise" className="text-[#D71920] underline underline-offset-4">guide québécois de la fiche Google</Link>{" "}
              couvre ce morceau). Google recoupe. Une entreprise dont l&apos;identité est claire et corroborée partout
              inspire confiance — à Google, et maintenant aux assistants IA qui recommandent des entreprises.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Et l&apos;IA dans tout ça?</h2>
            <p>
              Une part croissante des recherches se termine dans une réponse d&apos;IA — les aperçus IA de Google,
              ChatGPT, Perplexity — plutôt que dans une liste de liens. La bonne nouvelle : la fondation est la même.
              La couche supplémentaire — être compréhensible et citable par les moteurs IA — s&apos;appelle le
              référencement IA (AEO), et nous l&apos;avons détaillée sur notre page{" "}
              <Link href="/fr/etre-cite-par-ia" className="text-[#D71920] underline underline-offset-4">être cité par les IA</Link>.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Les délais honnêtes</h2>
            <p>
              Les corrections techniques produisent souvent des effets en quelques semaines. Les positions
              concurrentielles se gagnent en mois — et se cumulent ensuite, contrairement à la publicité qui
              s&apos;arrête quand le budget s&apos;arrête. Quiconque vous garantit la première position vend du vent :
              personne ne contrôle Google. Ce qui se garantit, c&apos;est le travail livré et mesuré chaque mois.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Les mythes qui persistent</h2>
            <ul className="space-y-3">
              <li>— <strong className="text-white">« Il faut répéter le mot-clé partout. »</strong> Non. Google comprend le sens depuis longtemps; la répétition mécanique nuit à la lecture et n&apos;aide pas au classement.</li>
              <li>— <strong className="text-white">« Le SEO, c&apos;est mort à cause de l&apos;IA. »</strong> Les moteurs IA choisissent leurs sources parmi les sites bien structurés et crédibles — exactement ce que le SEO construit. Le travail change de forme, pas de nature.</li>
              <li>— <strong className="text-white">« Plus de pages = plus de trafic. »</strong> Cent pages minces se nuisent entre elles. Une architecture délibérée — chaque intention de recherche a UNE page responsable — bat le volume à tous les coups.</li>
              <li>— <strong className="text-white">« On paie Google pour mieux se classer. »</strong> La publicité et le classement naturel sont des systèmes séparés. Acheter des annonces n&apos;améliore pas vos positions organiques.</li>
            </ul>
          </div>

          <div className="mt-14 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">Le SEO avec les prix affichés</h2>
            <p className="mt-3 leading-8 text-[#C7B9B9]">
              Nos forfaits sont publics — 600 $ ou 850 $ CAD par mois, sans contrat de 12 mois — et nos résultats
              sont sourcés et datés dans nos études de cas. Décrivez votre situation par écrit; recevez une
              évaluation honnête, sans appel de vente.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/fr/agence-seo-montreal" className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Voir les forfaits SEO</Link>
              <Link href="/fr/audit-seo" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:border-white/40">Commencer par un audit</Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <Link href="/fr/agence-seo-montreal" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Agence SEO Montréal</Link>
            <Link href="/fr/referencement-local" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Référencement local</Link>
            <Link href="/fr/fiche-google-entreprise" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Fiche Google Entreprise</Link>
            <Link href="/fr/etre-cite-par-ia" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Être cité par les IA</Link>
            <Link href="/fr/etudes-de-cas" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Études de cas</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
