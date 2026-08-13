import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { jaedenDoody } from "@/data/people/jaeden-doody";
import { ArticlesLies } from "@/components/articles-lies";

const url = `${siteUrl}/fr/audit-seo`;

export const metadata: Metadata = {
  title: "Audit SEO : quoi vérifier, dans quel ordre (grille 2026)",
  description:
    "Comment faire un audit SEO sérieux : la grille en quatre couches que nous utilisons — indexation, technique, contenu, crédibilité — avec les outils gratuits pour chaque vérification et les pièges des audits automatisés.",
  alternates: { canonical: "/fr/audit-seo" },
  openGraph: {
    title: "Audit SEO : quoi vérifier, dans quel ordre",
    description: "La grille d'audit en quatre couches, les outils gratuits, et les pièges à éviter.",
    url,
    type: "article",
    locale: "fr_CA",
  },
};

export default function AuditSeoPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: "Audit SEO : quoi vérifier, dans quel ordre",
        description:
          "La grille d'audit SEO en quatre couches : indexation, technique, contenu, crédibilité — avec outils gratuits.",
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
          { "@type": "ListItem", position: 2, name: "Audit SEO", item: url },
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
            Audit SEO : quoi vérifier, dans quel ordre
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
              <strong className="text-white">Un audit SEO est un diagnostic structuré de votre site : qu&apos;est-ce
              qui empêche Google de le trouver, de le comprendre et de le classer?</strong> Un audit sérieux suit un
              ordre précis — indexation, technique, contenu, crédibilité — parce que chaque couche dépend de la
              précédente. Voici la grille que nous utilisons réellement, avec les outils gratuits pour chaque
              vérification. Quand nous avons repris une plateforme cliente, cet audit a révélé ~2 300 défauts; une
              fois corrigés, le site est passé de zéro clic organique à la page 1 en 8 semaines.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Couche 1 — L&apos;indexation : est-ce que Google vous voit?</h2>
            <p>
              Inutile d&apos;optimiser des pages que Google n&apos;a jamais vues. Vérifications, dans l&apos;ordre :
            </p>
            <ul className="space-y-3">
              <li>— Tapez <code className="rounded bg-white/10 px-2 py-0.5 text-sm">site:votredomaine.com</code> dans Google. Le nombre de résultats ressemble-t-il au nombre réel de pages de votre site? Un écart énorme dans un sens ou l&apos;autre est un symptôme.</li>
              <li>— Dans <strong className="text-white">Google Search Console</strong> (gratuit, indispensable — si vous ne l&apos;avez pas, c&apos;est la première action de l&apos;audit) : le rapport « Indexation des pages » liste précisément ce qui est indexé, exclu, et pourquoi.</li>
              <li>— Le fichier robots.txt bloque-t-il des sections par accident? Le plan de site (sitemap.xml) existe-t-il, est-il soumis, est-il à jour?</li>
              <li>— Y a-t-il des balises « noindex » oubliées d&apos;un lancement ou d&apos;une refonte? C&apos;est le classique des classiques : un site mis en ligne avec le blocage de développement encore actif.</li>
            </ul>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Couche 2 — La technique : est-ce que ça tient?</h2>
            <ul className="space-y-3">
              <li>— <strong className="text-white">Vitesse et stabilité</strong> : PageSpeed Insights (gratuit) donne vos Core Web Vitals — chargement, réactivité, stabilité visuelle. Sur mobile d&apos;abord : c&apos;est là que Google évalue votre site.</li>
              <li>— <strong className="text-white">Une seule balise H1 par page</strong>, une hiérarchie de titres logique, des balises titre et description uniques — pas dupliquées sur vingt pages.</li>
              <li>— <strong className="text-white">Les redirections</strong> : les anciennes URL pointent-elles vers les nouvelles, directement, sans chaînes? Chaque refonte mal gérée fuit de l&apos;autorité ici.</li>
              <li>— <strong className="text-white">Les données structurées</strong> : le test des résultats enrichis de Google valide votre balisage. Organisation, services, fil d&apos;Ariane — cohérents sur tout le site.</li>
              <li>— <strong className="text-white">Le bilinguisme</strong>, spécifique au Québec : les balises hreflang relient-elles correctement chaque page française à sa contrepartie anglaise? Réciproquement? C&apos;est presque toujours cassé sur les sites bilingues que nous auditons.</li>
            </ul>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Couche 3 — Le contenu : est-ce que ça répond?</h2>
            <ul className="space-y-3">
              <li>— Chaque service que vous vendez a-t-il sa page dédiée? Dans les deux langues? Une entreprise qui vend cinq services avec deux pages laisse trois files de clients sans porte d&apos;entrée.</li>
              <li>— Vos prix sont-ils trouvables? Les recherches « prix » et « coût » sont massives, et la page qui y répond franchement gagne — c&apos;est mesurable dans notre propre marché.</li>
              <li>— Y a-t-il des pages qui se cannibalisent — deux pages qui visent la même recherche et se divisent les signaux? Le rapport « Performances » de la Search Console le révèle : une même requête qui alterne entre deux URL.</li>
              <li>— Le contenu répond-il en premières lignes, ou fait-il attendre la réponse huit paragraphes? Les extraits de Google et les moteurs IA citent ce qui répond directement.</li>
            </ul>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Couche 4 — La crédibilité : est-ce corroboré?</h2>
            <ul className="space-y-3">
              <li>— Nom, adresse, téléphone identiques partout : site, <Link href="/fr/fiche-google-entreprise" className="text-[#D71920] underline underline-offset-4">fiche Google Entreprise</Link>, annuaires, réseaux.</li>
              <li>— Qui vous cite? Des liens entrants de sites crédibles de votre secteur — pas des fermes de liens achetés, qui font plus de mal que de bien.</li>
              <li>— L&apos;auteur de votre contenu existe-t-il? Une vraie page d&apos;équipe ou de fondateur, reliée aux articles, pèse de plus en plus — pour Google comme pour les moteurs IA.</li>
            </ul>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Le piège des audits automatisés</h2>
            <p>
              Les outils qui génèrent un « score SEO » en 30 secondes produisent des listes de 200 « erreurs » sans
              hiérarchie — où une méta-description un peu longue pèse autant qu&apos;une section entière non indexée.
              L&apos;outil est utile pour collecter; le jugement est dans la priorisation : qu&apos;est-ce qui bloque
              réellement, qu&apos;est-ce qui rapporte le plus vite, dans quel ordre. C&apos;est exactement la
              différence entre un rapport et un diagnostic.
            </p>
          </div>

          <div className="mt-14 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">L&apos;audit, fait par nous</h2>
            <p className="mt-3 leading-8 text-[#C7B9B9]">
              Décrivez votre site et vos objectifs par écrit — vous recevez un diagnostic priorisé : ce qui bloque, ce
              qui rapporte, dans quel ordre. Sans appel de vente. Et si vous voulez la suite, les forfaits sont
              publics : 600 $ ou 850 $ CAD par mois.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Demander un audit</Link>
              <Link href="/fr/agence-seo-montreal" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:border-white/40">Voir les forfaits</Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <Link href="/fr/referencement-naturel" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Le SEO expliqué</Link>
            <Link href="/fr/fiche-google-entreprise" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Fiche Google Entreprise</Link>
            <Link href="/fr/etre-cite-par-ia" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Être cité par les IA</Link>
            <Link href="/fr/etudes-de-cas" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Études de cas</Link>
          </div>
        </div>
      </article>
    
      <ArticlesLies pillar="/fr/audit-seo" />
    </main>
  );
}
