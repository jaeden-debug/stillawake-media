import type { Metadata } from "next";
import { ServiceJsonLd, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Étude de cas : BankDeMark — no 1 sur Google avec un Lighthouse parfait",
  description:
    "Comment StillAwake Media a bâti une plateforme financière menée par les calculatrices : architecture SEO de 91 URL, 13 calculatrices, positions no 1 sur Google et un score Lighthouse mesuré de 100/100/100.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/etude-de-cas-bankdemark",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/etude-de-cas-bankdemark",
      "en-CA": "https://stillawakemedia.com/work/bankdemark",
      "x-default": "https://stillawakemedia.com/work/bankdemark",
    },
  },
  openGraph: {
    title: "Étude de cas : BankDeMark",
    description: "Architecture SEO menée par les calculatrices : positions no 1 et Lighthouse parfait mesuré.",
    url: "https://stillawakemedia.com/fr/etude-de-cas-bankdemark",
    type: "article",
    locale: "fr_CA",
  },
};

const METRICS: [string, string, string][] = [
  ["Position 1,3", "No 1 sur sa requête principale", "Google Search Console, fenêtre de 180 jours au 12 août 2026 : la page valeur-nette-par-âge tient la position moyenne 1,3 (332 impressions), l'épargne-retraite par âge est à 2,3 et le hub de calculatrices à 2,6."],
  ["100 / 100 / 100", "Lighthouse parfait", "Accessibilité 100, Bonnes pratiques 100, SEO 100 — mesuré par nous avec Chrome Lighthouse (mobile) le 12 août 2026. Pas une estimation : une exécution reproductible."],
  ["91 URL", "Architecture menée par les outils", "13 calculatrices financières interactives, ~58 articles et 9 pages piliers conçus comme un seul système de liens internes — les outils gagnent les positions, le contenu convertit l'intention."],
  ["26 cas de référence", "Les maths d'argent, testées", "Les calculs financiers sont vérifiés contre des cas de référence — plus ~190 tests automatisés sur le noyau financier, avec une précision monétaire au cent près."],
  ["26 tables", "Sécurité au niveau des lignes partout", "La couche de données financières tourne sur 26 tables Supabase, toutes protégées par RLS, avec migrations suivies et piste d'audit."],
  ["3 sous-domaines", "Un seul système financier", "bankdemark.com (plateforme publique), command.bankdemark.com (finances d'entreprise), invoice.bankdemark.com — un seul graphe d'entités, une seule marque."],
];

export default function EtudeBankDeMark() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/etude-de-cas-bankdemark"
        name="Étude de cas : BankDeMark"
        description="Plateforme financière menée par les calculatrices : 91 URL, positions no 1 sur Google, Lighthouse 100/100/100 mesuré."
        breadcrumb={[
          ["Accueil", "/fr"],
          ["Études de cas", "/work"],
          ["BankDeMark", "/fr/etude-de-cas-bankdemark"],
        ]}
        inLanguage="fr-CA"
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Étude de cas · Finance</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            BankDeMark : atteindre le no 1 avec des outils, pas des astuces.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <a href="https://bankdemark.com" className="text-[#D71920] underline-offset-4 hover:underline" rel="noopener">BankDeMark</a>{" "}
            est une plateforme financière canadienne bâtie sur une thèse simple : les calculatrices interactives
            gagnent des positions que les articles seuls ne peuvent pas gagner. Nous avons architecturé 91 URL autour
            de 13 calculatrices et du contenu qui les alimente — puis construit la couche financière avec la rigueur
            que l&apos;argent exige. Chaque chiffre est sourcé et daté.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {METRICS.map(([big, label, detail]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 p-7">
                <p className="geist text-3xl font-black tracking-[-0.04em] text-[#D71920]">{big}</p>
                <h2 className="mt-2 text-lg font-semibold">{label}</h2>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">La partie honnête</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              BankDeMark est jeune et pré-revenu, et sa couche produit d&apos;affaires est en développement actif —
              nous le disons clairement. Ce qui est prouvé aujourd&apos;hui : l&apos;architecture de recherche (une
              position no 1 sur une requête compétitive quelques mois après le lancement), le plafond technique mesuré
              (un score Lighthouse littéralement parfait), et une culture d&apos;ingénierie où les maths financières
              livrent avec des cas de référence et où les audits internes sont plus sévères que tout ce qu&apos;un
              client écrirait. Les positions d&apos;abord; la courbe de clics et de revenus, c&apos;est le prochain
              chapitre.
            </p>
          </div>
        </div>
      </section>

      <RelatedServices
        title="Les services derrière ce projet"
        links={[
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
          ["Développement logiciel sur mesure", "/fr/developpement-logiciel"],
          ["Référencement IA (AEO)", "/fr/referencement-ia"],
          ["English version", "/work/bankdemark"],
        ]}
      />
    </main>
  );
}
