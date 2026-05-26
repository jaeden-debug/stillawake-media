import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

const pageUrl = "https://stillawakemedia.com/fr/agence-web-montreal";

export const metadata: Metadata = {
  title: "Agence Web Montréal | Sites Premium, SEO et Branding",
  description:
    "StillAwake Media est une agence web à Montréal spécialisée en sites premium, SEO, branding, performance, automatisation IA et croissance numérique.",
};

const sections = [
  {
    title: "Une agence web moderne à Montréal",
    body: [
      "La majorité des entreprises possèdent déjà un site web. Le problème est que plusieurs de ces sites ne génèrent pas réellement de croissance.",
      "Un site moderne doit créer de la confiance rapidement, être performant sur mobile, supporter le référencement Google, communiquer clairement la valeur de l’entreprise et convertir les visiteurs en clients.",
      "À Montréal, la concurrence numérique augmente rapidement. Les entreprises qui investissent dans une présence web premium prennent un avantage clair sur les marques qui utilisent encore des sites lents, génériques ou dépassés.",
      "StillAwake Media construit des systèmes numériques modernes : design web, SEO, branding, performance, développement et architecture de conversion."
    ],
  },
  {
    title: "Pourquoi les entreprises montréalaises ont besoin d’un meilleur site web",
    body: [
      "Le site web est souvent la première interaction entre une entreprise et un client potentiel.",
      "Avant un appel. Avant un courriel. Avant une visite en magasin.",
      "La qualité du site influence directement la perception de confiance, de professionnalisme et de valeur.",
      "Un site lent, mal structuré ou générique peut faire paraître une excellente entreprise moins crédible que ses concurrents."
    ],
  },
  {
    title: "Création de site web pensée pour la croissance",
    body: [
      "StillAwake Media ne construit pas seulement des pages visuellement attrayantes.",
      "Chaque projet est conçu comme une infrastructure numérique capable de supporter la croissance à long terme.",
      "Cela inclut : architecture SEO, performance mobile, hiérarchie de contenu, stratégie de conversion, branding, structure de navigation, maillage interne et évolutivité.",
      "Le but est de créer un site qui reste performant même lorsque l’entreprise grandit."
    ],
  },
  {
    title: "SEO et visibilité Google",
    body: [
      "Le référencement naturel doit être intégré dès le départ.",
      "Un bon site web aide Google à comprendre clairement les services, les pages importantes, la structure de contenu et la pertinence locale de l’entreprise.",
      "Le SEO technique, les Core Web Vitals, les balises structurées, les pages de services locales et le contenu stratégique jouent tous un rôle dans la visibilité.",
      "Montréal représente une opportunité unique parce que plusieurs concurrents possèdent encore des sites techniquement faibles."
    ],
  },
  {
    title: "Performance et vitesse",
    body: [
      "La vitesse influence directement l’expérience utilisateur.",
      "Les visiteurs quittent rapidement les sites lents, particulièrement sur mobile.",
      "La performance affecte aussi le SEO, les conversions et la perception de qualité.",
      "StillAwake Media construit des sites rapides, modernes et optimisés pour les appareils mobiles."
    ],
  },
  {
    title: "Branding et perception premium",
    body: [
      "Le branding ne se limite pas à un logo.",
      "La typographie, les espaces, les couleurs, les animations, les images et le ton de communication influencent tous la perception de la marque.",
      "Un site premium crée immédiatement une impression de confiance.",
      "Les entreprises qui veulent se positionner plus haut de gamme doivent avoir une présence numérique cohérente avec cette ambition."
    ],
  },
  {
    title: "Sites bilingues et SEO québécois",
    body: [
      "Le marché montréalais est bilingue.",
      "Les recherches en français et en anglais créent des opportunités SEO distinctes.",
      "Une stratégie bilingue bien construite peut augmenter la visibilité locale, améliorer la confiance et renforcer la présence de marque.",
      "Les pages françaises doivent être écrites pour le comportement de recherche québécois, pas simplement traduites automatiquement."
    ],
  },
  {
    title: "Développement web moderne",
    body: [
      "Les entreprises modernes ont parfois besoin de plus qu’un simple site vitrine.",
      "Intégrations API, automatisation, systèmes personnalisés, ecommerce, dashboards, outils internes et plateformes sur mesure deviennent de plus en plus importants.",
      "StillAwake Media combine design premium et développement moderne afin de créer des systèmes numériques capables d’évoluer."
    ],
  },
  {
    title: "Les erreurs fréquentes des sites web",
    body: [
      "Les problèmes les plus fréquents incluent :",
      "Sites lents.",
      "Templates génériques.",
      "Mauvaise expérience mobile.",
      "Absence de structure SEO.",
      "Messages vagues.",
      "Navigation confuse.",
      "Mauvaise hiérarchie visuelle.",
      "Branding incohérent.",
      "Absence de stratégie de conversion."
    ],
  },
  {
    title: "Pourquoi choisir StillAwake Media",
    body: [
      "StillAwake Media combine stratégie, design, SEO, branding, développement et performance dans un seul système cohérent.",
      "L’objectif n’est pas seulement de lancer un site.",
      "L’objectif est de créer une présence numérique forte capable de soutenir la croissance de l’entreprise pendant des années.",
      "Chaque projet est pensé pour créer de la confiance rapidement et performer dans les moteurs de recherche."
    ],
  },
];

const faqs = [
  [
    "Qu’est-ce qu’une agence web à Montréal ?",
    "Une agence web à Montréal aide les entreprises avec la création de sites web, le SEO, le branding, le développement, l’expérience utilisateur et la performance numérique."
  ],
  [
    "Combien coûte un site web à Montréal ?",
    "Le coût dépend du nombre de pages, de la complexité du projet, du branding, du SEO, des intégrations et du niveau de personnalisation."
  ],
  [
    "Pourquoi le SEO est-il important pour un site web ?",
    "Le SEO aide Google à comprendre et classer le site. Une bonne structure SEO peut augmenter la visibilité et générer plus de trafic qualifié."
  ],
  [
    "Est-ce qu’un site bilingue est important au Québec ?",
    "Oui. Plusieurs entreprises montréalaises bénéficient fortement d’une stratégie bilingue française et anglaise."
  ],
  [
    "Quelle est la différence entre design web et développement web ?",
    "Le design web concerne l’expérience utilisateur et l’apparence. Le développement web concerne le code, les systèmes et la performance technique."
  ],
  [
    "Pourquoi les sites lents perdent-ils des clients ?",
    "Les utilisateurs quittent rapidement les sites qui chargent lentement, surtout sur mobile."
  ],
  [
    "Shopify est-il bon pour ecommerce ?",
    "Oui. Shopify est une excellente plateforme pour plusieurs boutiques ecommerce modernes."
  ],
  [
    "Le branding influence-t-il les conversions ?",
    "Oui. Une image de marque cohérente améliore la confiance et influence les décisions d’achat."
  ],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Agence Web Montréal",
      url: pageUrl,
      inLanguage: "fr-CA",
    },
    {
      "@type": "Service",
      serviceType: "Agence Web",
      areaServed: {
        "@type": "City",
        name: "Montréal",
      },
      provider: {
        "@type": "Organization",
        name: "StillAwake Media",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a,
        },
      })),
    },
  ],
};

export default function Page() {
  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden px-6 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.2),transparent_34%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Agence Web Montréal
          </p>

          <h1 className="geist max-w-6xl text-5xl font-black leading-[.88] tracking-[-0.08em] md:text-8xl">
            Agence web à Montréal pour marques modernes et systèmes numériques performants.
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            Sites web premium, SEO, branding, performance et infrastructure numérique
            conçus pour la croissance à long terme.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white"
            >
              Démarrer votre projet →
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9]"
            >
              Voir le portfolio →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="glass rounded-[2.5rem] p-8 md:p-12">
            <p className="mb-5 text-sm uppercase tracking-[.35em] text-[#D71920]">
              Réponse Rapide
            </p>

            <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              Que devrait inclure une agence web moderne à Montréal ?
            </h2>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-[#C7B9B9]">
              Une agence web moderne doit combiner design, SEO, performance,
              branding, UX, développement et stratégie numérique dans un système cohérent.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl grid gap-12">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2.5rem] border border-white/10 bg-[#070707] p-8 md:p-12"
            >
              <h2 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
                {section.title}
              </h2>

              <div className="mt-8 grid gap-5">
                {section.body.map((p) => (
                  <p key={p} className="text-base leading-8 text-[#C7B9B9]">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[3rem] border border-white/10 bg-[#070707] p-10 md:p-16">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            FAQ
          </p>

          <div className="grid gap-5">
            {faqs.map(([q, a]) => (
              <div
                key={q}
                className="rounded-[2rem] border border-white/10 bg-white/[.03] p-6"
              >
                <h3 className="geist text-2xl font-black tracking-[-0.05em]">
                  {q}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[3rem] border border-white/10 bg-[#D71920]/20 p-10 md:p-16">
          <h2 className="geist max-w-5xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-7xl">
            Construisez une présence numérique qui inspire confiance immédiatement.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#E7DFDF]">
            StillAwake Media aide les entreprises montréalaises à créer des sites
            modernes, rapides et stratégiques conçus pour la croissance.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white px-7 py-4 text-sm font-bold text-black"
            >
              Démarrer votre projet →
            </Link>

            <Link
              href="/about"
              className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white"
            >
              À propos →
            </Link>
          </div>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
