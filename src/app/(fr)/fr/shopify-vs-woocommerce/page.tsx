import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Shopify ou WooCommerce (2026) : comparaison honnête pour le Québec",
  description:
    "Shopify ou WooCommerce pour une entreprise québécoise en 2026 : vrai coût de possession, entretien, SEO, boutique bilingue, et qui devrait choisir quoi — par un studio qui bâtit sur Shopify.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/shopify-vs-woocommerce",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/shopify-vs-woocommerce",
      "en-CA": "https://stillawakemedia.com/shopify-vs-woocommerce",
      "x-default": "https://stillawakemedia.com/shopify-vs-woocommerce",
    },
  },
  openGraph: {
    title: "Shopify ou WooCommerce (2026)",
    description: "Comparaison honnête par un studio Shopify — incluant les cas où WooCommerce gagne.",
    url: "https://stillawakemedia.com/fr/shopify-vs-woocommerce",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Shopify ou WooCommerce : lequel est meilleur?",
    "Pour la plupart des marchands québécois, Shopify — parce que le paiement, l'hébergement, la sécurité et les mises à jour sont le problème de la plateforme, pas le vôtre, et le coût total est plus prévisible. WooCommerce gagne quand vous avez besoin d'une intégration WordPress profonde, d'une personnalisation inhabituelle avec un budget logiciel serré, ou d'un contrôle auto-hébergé complet avec quelqu'un de technique pour s'en occuper.",
  ],
  [
    "Lequel est le moins cher?",
    "WooCommerce semble moins cher (extension gratuite) mais ne l'est plus quand on compte l'hébergement, les extensions payantes, la sécurité et les heures d'entretien. Les frais de Shopify sont visibles d'avance (forfaits à partir d'environ 50 $ CAD/mois plus frais de transaction). Sur 2-3 ans, une boutique WooCommerce bien entretenue coûte généralement au moins autant que Shopify — mais de façon moins prévisible.",
  ],
  [
    "Lequel est meilleur pour le référencement (SEO)?",
    "Aucun ne gagne par défaut — le SEO vient de la structure, de la vitesse et du contenu, pas du logo de la plateforme. Shopify offre de bonnes bases techniques impossibles à briser; WooCommerce offre un contrôle total qu'on peut aussi briser. Une boutique bien construite se positionne sur les deux; une boutique WooCommerce négligée se dégrade plus vite parce que les mises à jour et la vitesse sont votre responsabilité.",
  ],
  [
    "Peut-on faire une boutique bilingue français-anglais?",
    "Oui, sur les deux — avec du travail. Shopify passe par ses fonctions natives de localisation; WooCommerce par des extensions multilingues. Pour les marchands québécois, nous bâtissons généralement des boutiques Shopify bilingues : moins de pièces mobiles pour garder les deux langues cohérentes — important pour la conformité et pour se positionner dans les deux langues.",
  ],
  [
    "Pouvez-vous migrer ma boutique WooCommerce vers Shopify?",
    "Oui — produits, clients et commandes migrent, et nous traitons les URL comme une migration de refonte : chaque adresse est cartographiée et redirigée délibérément pour que les positions survivent au déménagement. La migration est soumissionnée par écrit selon votre catalogue et votre trafic réels.",
  ],
];

const ROWS: [string, string, string][] = [
  ["Hébergement et sécurité", "Inclus, géré par Shopify", "Votre responsabilité (hébergement, SSL, correctifs)"],
  ["Fardeau d'entretien", "Minimal — la plateforme se met à jour", "Continu — extensions/thème/coeur à votre charge"],
  ["Coût mensuel réel", "Prévisible : forfait + applications + frais", "Variable : hébergement + extensions + heures d'entretien"],
  ["Paiement", "Parmi les meilleurs, PCI géré", "Configurable, mais le risque vous appartient"],
  ["Profondeur de personnalisation", "Thèmes + applications; code via Liquid", "Illimitée — c'est WordPress + PHP"],
  ["Contenu et blogue", "Correct", "Excellent — c'est WordPress"],
  ["Bilinguisme (fr-CA/en-CA)", "Localisation native, plus simple à maintenir", "Par extensions, plus de pièces mobiles"],
  ["Propriétaire idéal", "Marchands qui veulent vendre, pas administrer", "Équipes avec un responsable technique à l'interne"],
];

export default function ShopifyVsWooFrPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/shopify-vs-woocommerce"
        name="Shopify ou WooCommerce — comparaison 2026 pour le Québec"
        description="Comparaison honnête pour marchands québécois : coût de possession, entretien, SEO, capacité bilingue, et qui devrait choisir quoi."
        breadcrumb={[
          ["Accueil", "/fr"],
          ["Développement Shopify", "/fr/developpement-shopify"],
          ["Shopify ou WooCommerce", "/fr/shopify-vs-woocommerce"],
        ]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Comparaison · 2026</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Shopify ou WooCommerce : la version honnête.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            Transparence totale : nous bâtissons des boutiques Shopify — y compris des thèmes Shopify originaux.
            C&apos;est justement pour ça que cette comparaison peut se permettre d&apos;être honnête sur les cas où
            WooCommerce gagne vraiment. La réponse courte :{" "}
            <strong className="text-white">la plupart des marchands devraient choisir Shopify; les équipes avec un vrai
            responsable technique et de gros besoins de contenu WordPress devraient considérer WooCommerce.</strong>
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/20 text-xs uppercase tracking-[0.15em] text-[#C7B9B9]">
                  <th className="py-3 pr-4">Dimension</th>
                  <th className="py-3 pr-4">Shopify</th>
                  <th className="py-3">WooCommerce</th>
                </tr>
              </thead>
              <tbody className="text-[#C7B9B9]">
                {ROWS.map(([d, a, b]) => (
                  <tr key={d} className="border-b border-white/10">
                    <td className="py-4 pr-4 font-semibold text-white">{d}</td>
                    <td className="py-4 pr-4">{a}</td>
                    <td className="py-4">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Notre verdict</h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              Si vendre est votre métier et que le site est un outil : <strong className="text-white">Shopify</strong> —
              et s&apos;il brise, notre <Link href="/fr/maintenance-site-web" className="text-[#D71920] underline-offset-4 hover:underline">dépannage ecommerce</Link> a
              des tarifs affichés. Si votre boutique est indissociable d&apos;une grosse opération de contenu WordPress
              avec un responsable technique : WooCommerce est légitime. Pas certain de votre cas?{" "}
              <Link href="https://stillawake.studio/fr/demarrer" className="text-[#D71920] underline-offset-4 hover:underline">Décrivez votre boutique</Link> et
              vous recevrez une recommandation écrite — même si la réponse est « restez où vous êtes ».
            </p>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions Shopify vs WooCommerce" items={FAQ} />

      <RelatedServices
        title="Continuez"
        links={[
          ["Vous faut-il vraiment une boutique ?", "/fr/guide-site-web-entreprise"],
          ["Développement Shopify", "/fr/developpement-shopify"],
          ["Guide des prix", "/fr/prix-site-web-quebec"],
          ["Refonte de site web (migrations)", "/fr/refonte-site-web"],
          ["Dépannage ecommerce", "/fr/maintenance-site-web"],
          ["English version", "/shopify-vs-woocommerce"],
        ]}
      />
    </main>
  );
}
