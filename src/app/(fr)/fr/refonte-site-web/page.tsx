import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";
import { ArticlesLies } from "@/components/articles-lies";

export const metadata: Metadata = {
  title: "Refonte de site web | Moderniser sans perdre votre référencement",
  description:
    "Refonte de site web depuis Montréal, partout au Québec : reconstruction moderne, référencement préservé, objectifs de conversion mesurables et prix fixe écrit avant de vous engager.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/refonte-site-web",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/refonte-site-web",
      "en-CA": "https://stillawakemedia.com/website-redesign",
      "x-default": "https://stillawakemedia.com/website-redesign",
    },
  },
  openGraph: {
    title: "Refonte de site web",
    description: "Reconstruire le site sans perdre les positions Google. Portée écrite, prix fixe, sans appel de vente.",
    url: "https://stillawakemedia.com/fr/refonte-site-web",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Qu'est-ce qu'une refonte de site web?",
    "Une refonte reconstruit le design, la structure et souvent la plateforme d'un site existant — tout en protégeant ce qui fonctionne déjà : positions Google, trafic et chemins de conversion. Bien faite, c'est une migration; mal faite, c'est la façon la plus rapide de perdre des années de référencement en un lancement.",
  ],
  [
    "Une refonte va-t-elle nuire à mon référencement?",
    "Seulement si elle est faite sans méthode. Les positions sont attachées aux URL, au contenu, aux liens internes et à la structure. Nos refontes inventorient chaque URL existante, conservent ou redirigent (301) chacune délibérément, migrent le contenu qui génère du trafic, et relancent avec données structurées et gains de vitesse — la refonte aide généralement le référencement au lieu de l'effacer.",
  ],
  [
    "Combien coûte une refonte de site web?",
    "Chaque refonte est soumissionnée par écrit à partir de votre formulaire : la portée dépend du nombre de pages, de la plateforme et du contenu à migrer. Les fourchettes typiques du marché québécois vont de quelques milliers de dollars à 25 000 $ et plus — consultez notre guide des prix. Vous recevez un prix fixe écrit avant de vous engager.",
  ],
  [
    "Combien de temps prend une refonte?",
    "Ça dépend de la portée — mais vous voyez le plan avant de payer, et vous révisez le nouveau site sur une prévisualisation privée avec visite guidée avant toute mise en ligne. Rien n'est lancé sans votre approbation sur la version exacte que vous avez révisée.",
  ],
  [
    "Pouvez-vous refaire un site que vous n'avez pas créé?",
    "Oui — la plupart des refontes partent du travail de quelqu'un d'autre. On commence par un audit de l'existant : ce qui se positionne, ce qui convertit, ce qui est brisé, et ce que le nouveau site doit conserver.",
  ],
];

export default function RefonteSiteWebPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/refonte-site-web"
        name="Refonte de site web"
        description="Refonte de site web qui préserve le référencement : inventaire des URL, redirections délibérées, migration de contenu, vitesse et données structurées. Prix fixe écrit via formulaire asynchrone."
        breadcrumb={[
          ["Accueil", "/fr"],
          ["Services", "/services"],
          ["Refonte de site web", "/fr/refonte-site-web"],
        ]}
        faq={FAQ}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Refonte de site web</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Refaites le site. Gardez les positions.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">Qu&apos;est-ce qu&apos;une refonte?</strong> C&apos;est reconstruire le
            design, la structure et souvent la plateforme de votre site — en protégeant le capital de référencement et
            les chemins de conversion déjà gagnés. L&apos;erreur la plus coûteuse d&apos;une refonte, ce n&apos;est pas
            un design raté : c&apos;est un beau site qui supprime silencieusement les URL auxquelles Google faisait
            confiance. Chez nous, chaque refonte est d&apos;abord une migration.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Obtenir un plan de refonte
            </Link>
            <Link href="/fr/prix-site-web-quebec" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              Combien ça devrait coûter?
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">Comment on protège ce que vous avez bâti</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Audit des URL et positions", "Chaque URL existante est inventoriée avec son trafic et ses positions avant de changer un seul pixel."],
              ["Plan de redirections délibéré", "Conservée, fusionnée ou redirigée (301) — chaque adresse est une décision, pas un accident."],
              ["Migration du contenu", "Les pages qui génèrent du trafic déménagent améliorées, pas supprimées."],
              ["Relance bonifiée", "Vitesse, données structurées, liens internes et structure bilingue intégrés à la nouvelle fondation."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-[2rem] border border-white/10 p-7">
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl leading-8 text-[#C7B9B9]">
            Avant la mise en ligne, vous révisez la refonte terminée sur une prévisualisation privée avec visite guidée
            en français, signalez ce que vous voulez en contexte, et approuvez la version exacte qui sera lancée.
            Ensuite, la <Link href="/fr/maintenance-site-web" className="text-[#D71920] underline-offset-4 hover:underline">maintenance</Link> et
            les <Link href="/fr/agence-seo-montreal" className="text-[#D71920] underline-offset-4 hover:underline">forfaits SEO</Link> font fructifier le tout.
          </p>
        </div>
      </section>

      <FaqBlock title="Questions sur la refonte" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Création de site web à Montréal", "/fr/agence-web-montreal"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Maintenance de site web", "/fr/maintenance-site-web"],
          ["Guide des prix", "/fr/prix-site-web-quebec"],
          ["English version", "/website-redesign"],
        ]}
      />
    
      <ArticlesLies pillar="/fr/refonte-site-web" />
    </main>
  );
}
