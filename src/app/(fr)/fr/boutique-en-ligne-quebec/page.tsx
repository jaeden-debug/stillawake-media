import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { jaedenDoody } from "@/data/people/jaeden-doody";

const url = `${siteUrl}/fr/boutique-en-ligne-quebec`;

export const metadata: Metadata = {
  title: "Créer une boutique en ligne au Québec : le guide honnête (2026)",
  description:
    "DIY, Shopify, sur mesure : les vraies options pour créer une boutique en ligne au Québec, ce que chacune coûte, et les leçons d'un studio qui opère sa propre boutique — avec un taux de clients récurrents mesuré à 27,8 %.",
  alternates: { canonical: "/fr/boutique-en-ligne-quebec" },
  openGraph: {
    title: "Créer une boutique en ligne au Québec : le guide honnête",
    description: "DIY, Shopify ou sur mesure — les vraies options, les vrais coûts, et l'expérience d'un opérateur.",
    url,
    type: "article",
    locale: "fr_CA",
  },
};

export default function BoutiqueEnLigneQuebecPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: "Créer une boutique en ligne au Québec : le guide honnête",
        description:
          "Les options réelles pour lancer une boutique en ligne au Québec — DIY, Shopify, sur mesure — leurs coûts et leurs pièges, par un studio qui opère sa propre boutique.",
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
          { "@type": "ListItem", position: 2, name: "Boutique en ligne au Québec", item: url },
        ],
      },
    ],
  };

  return (
    <main className="bg-black pt-28 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Guide · Commerce en ligne</p>
          <h1 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Créer une boutique en ligne au Québec : le guide honnête
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
              <strong className="text-white">Il y a trois vraies façons de créer une boutique en ligne au Québec :
              la faire soi-même sur une plateforme (souvent Shopify), la faire construire professionnellement sur
              Shopify, ou faire développer une plateforme sur mesure.</strong> La bonne réponse dépend de votre
              catalogue, de votre budget et de qui va l&apos;opérer. Ce guide vient d&apos;une position particulière :
              nous construisons des boutiques pour des clients, et nous en{" "}
              <strong className="text-white">opérons une nous-mêmes</strong> — avec l&apos;inventaire, l&apos;expédition,
              les clients et les chiffres qui viennent avec. Les conseils ci-dessous sont ceux d&apos;un opérateur,
              pas d&apos;un vendeur de sites.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Option 1 — La faire vous-même (0 $ – 1 500 $ + abonnements)</h2>
            <p>
              Shopify, Square, Wix : les plateformes modernes permettent réellement de lancer seul une petite
              boutique. C&apos;est le bon choix si votre catalogue est simple, votre budget serré, et votre temps
              disponible. Les limites honnêtes : le design générique du gabarit (vos concurrents ont le même), le
              référencement laissé au minimum, et surtout le plafond de temps — chaque heure passée à bricoler la
              boutique est une heure enlevée aux produits et aux clients. Beaucoup de nos clients ecommerce sont des
              gens qui ont commencé en DIY, ont validé leur marché, puis ont frappé ce plafond.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Option 2 — Shopify construit professionnellement (5 000 $ – 30 000 $+)</h2>
            <p>
              Le choix par défaut pour la grande majorité des commerces québécois. Un thème sur mesure (pas un gabarit
              rebadgé), une structure de collections pensée pour la recherche, le bilinguisme français-anglais fait
              correctement, et un SEO intégré dès la construction. La fourchette de 5 000 $ à 30 000 $+ CAD est une
              observation du marché canadien 2026 — le prix réel dépend du catalogue, des intégrations et du contenu;
              chez nous, c&apos;est toujours une portée écrite avec prix fixe, détaillée sur la page{" "}
              <Link href="/fr/developpement-shopify" className="text-[#D71920] underline underline-offset-4">développement Shopify</Link>.
            </p>
            <p>
              Ce que le travail professionnel change, mesurablement : notre propre boutique,{" "}
              <Link href="/fr/etude-de-cas-blackwater-aquatics" className="text-[#D71920] underline underline-offset-4">Blackwater Aquatics Canada</Link>,
              est construite comme une base de connaissances qui vend — 64 pages éducatives derrière 17 produits.
              Résultats sourcés et datés : une fiche produit en page 1 de Google avec 8,6 % de taux de clic, ~60 000
              impressions sur les 12 meilleures pages, et un taux de clients récurrents passé de 5,9 % à{" "}
              <strong className="text-white">27,8 %</strong>. Des commandes arrivent chaque semaine de la recherche
              organique, sans un dollar de publicité. C&apos;est ça, la différence entre « avoir une boutique » et
              avoir une boutique architecturée.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Option 3 — Le sur mesure (15 000 $ – 100 000 $+)</h2>
            <p>
              Justifié seulement quand votre modèle dépasse ce que Shopify fait bien : abonnements complexes, portails
              clients, logique métier particulière, intégrations profondes. Exemple réel de notre portfolio : la
              boutique eSIM de{" "}
              <Link href="/fr/etude-de-cas-lisa-travel-design" className="text-[#D71920] underline underline-offset-4">TravelDesign By Lisa</Link>{" "}
              vend, exécute la commande auprès du fournisseur et réconcilie le paiement Stripe automatiquement — un
              flux impossible dans un gabarit. Mais soyons clairs : si un catalogue de produits standard suffit à
              votre modèle, le sur mesure est un surcoût, pas un avantage — et on vous le dira avant de vous vendre
              quoi que ce soit.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Les spécificités québécoises qu&apos;on oublie</h2>
            <ul className="space-y-3">
              <li>— <strong className="text-white">Le bilinguisme, fait correctement.</strong> URL localisées, contenu réellement écrit en français (pas traduit à la machine), balises hreflang réciproques. Vos clients cherchent dans les deux langues; votre boutique doit exister dans les deux.</li>
              <li>— <strong className="text-white">Les taxes canadiennes</strong> : TPS/TVQ configurées correctement dès le départ, selon les provinces où vous vendez.</li>
              <li>— <strong className="text-white">L&apos;expédition réaliste.</strong> Les frais d&apos;expédition au Canada tuent plus de marges que n&apos;importe quel autre poste. Testez vos scénarios réels avant le lancement — leçon vécue, pas théorique.</li>
              <li>— <strong className="text-white">La recherche géographique.</strong> Les collections construites autour de l&apos;intention réelle (« au Canada », « au Québec ») se positionnent d&apos;elles-mêmes — c&apos;est exactement la mécanique documentée dans notre étude de cas Blackwater.</li>
            </ul>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Les erreurs qui coûtent le plus cher</h2>
            <ul className="space-y-3">
              <li>— <strong className="text-white">Lancer sans plan de trafic.</strong> Une boutique sans SEO ni contenu, c&apos;est un magasin dans un rang sans pancarte. Le contenu éducatif qui amène les acheteurs se planifie AVANT le lancement.</li>
              <li>— <strong className="text-white">Empiler les applications.</strong> Vingt applications Shopify pour compenser un thème faible = boutique lente + factures mensuelles perpétuelles. Un thème bien construit en élimine la majorité.</li>
              <li>— <strong className="text-white">Ignorer les clients récurrents.</strong> Acquérir un client coûte cher; le faire revenir coûte presque rien. Le contenu, les courriels post-achat et l&apos;expérience de commande font ce travail — c&apos;est le levier derrière notre 27,8 %.</li>
              <li>— <strong className="text-white">Choisir sur le prix du build seulement.</strong> La boutique la moins chère qui ne vend pas coûte infiniment plus cher que la boutique bien faite qui vend.</li>
            </ul>
          </div>

          <div className="mt-14 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">Parlez à un studio qui opère sa propre boutique</h2>
            <p className="mt-3 leading-8 text-[#C7B9B9]">
              Décrivez votre projet par écrit — catalogue, marché, budget — et recevez une portée écrite avec prix
              fixe, incluant notre avis honnête sur l&apos;option qui vous convient (même si c&apos;est la moins
              chère). Sans appel de vente.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Décrire mon projet</Link>
              <Link href="/fr/developpement-shopify" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:border-white/40">Développement Shopify</Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <Link href="/fr/developpement-shopify" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Développement Shopify</Link>
            <Link href="/fr/shopify-vs-woocommerce" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Shopify ou WooCommerce</Link>
            <Link href="/fr/prix-site-web-quebec" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Guide des prix</Link>
            <Link href="/fr/etude-de-cas-blackwater-aquatics" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Étude de cas Blackwater</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
