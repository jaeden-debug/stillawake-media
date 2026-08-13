import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard, FaqBlock, RelatedServices } from "@/components/service-page";
import { ArticlesLies } from "@/components/articles-lies";

export const metadata: Metadata = {
  title: "Agence SEO Montréal | Référencement avec tarifs affichés",
  description:
    "Agence SEO à Montréal : référencement technique, SEO local et optimisation IA avec tarifs affichés — forfaits de 600 $ à 850 $ CAD par mois. Sans appel de vente obligatoire.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/agence-seo-montreal",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/agence-seo-montreal",
      "en-CA": "https://stillawakemedia.com/seo-montreal",
      "x-default": "https://stillawakemedia.com/seo-montreal",
    },
  },
  openGraph: {
    title: "Agence SEO Montréal | StillAwake Media",
    description: "Référencement technique, SEO local et optimisation IA pour entreprises québécoises. Tarifs affichés.",
    url: "https://stillawakemedia.com/fr/agence-seo-montreal",
    type: "website",
    locale: "fr_CA",
  },
};

const FAQ: [string, string][] = [
  [
    "Combien coûtent vos services SEO?",
    "Nos forfaits SEO sont affichés : Croissance SEO Essentiel coûte 600 $ CAD par mois et Croissance SEO Avancé coûte 850 $ CAD par mois. Pas de frais cachés, pas d'appel de vente obligatoire — le forfait Avancé ajoute l'optimisation pour les moteurs IA (AEO), le travail d'entités et la stratégie de contenu.",
  ],
  [
    "Qu'est-ce que le référencement naturel (SEO)?",
    "Le SEO, ou référencement naturel, est l'ensemble du travail technique et éditorial qui permet à votre site web d'apparaître dans Google quand vos clients cherchent vos services : structure du site, vitesse, contenu, liens internes, données structurées et visibilité locale.",
  ],
  [
    "Faites-vous du référencement local à Montréal?",
    "Oui. Le référencement local — fiche Google Business, recherches « près de moi », visibilité sur la carte — fait partie de nos forfaits. Nous travaillons avec des entreprises de Montréal, Laval, Longueuil, la Rive-Sud et partout au Québec, entièrement à distance.",
  ],
  [
    "En combien de temps voit-on des résultats?",
    "Le SEO est un travail qui se cumule. Les correctifs techniques produisent souvent des effets en quelques semaines; la progression des positions concurrentielles se mesure généralement sur plusieurs mois. Chaque mois, vous recevez un rapport clair sur ce qui a été fait et ce qui a bougé.",
  ],
  [
    "Travaillez-vous en français et en anglais?",
    "Oui. Nous optimisons des sites dans les deux langues — un avantage réel au Québec, où vos clients cherchent dans les deux. Ce site en est la preuve : chaque page commerciale existe dans les deux langues.",
  ],
  [
    "Qu'est-ce que l'optimisation IA (AEO)?",
    "C'est le travail qui permet à ChatGPT, Perplexity, Gemini et aux aperçus IA de Google de comprendre et de citer votre entreprise. Le forfait Avancé l'inclut; nous offrons aussi un service dédié d'optimisation pour moteurs de réponse.",
  ],
  [
    "Garantissez-vous la première position sur Google?",
    "Non — et méfiez-vous de quiconque le fait, car personne ne contrôle Google. Ce que nous garantissons : le travail livré chaque mois, un rapport honnête depuis la Search Console, et aucun contrat de 12 mois pour vous retenir. Nos résultats mesurés sont publics dans nos études de cas.",
  ],
  [
    "Servez-vous Laval, Longueuil et la Rive-Sud?",
    "Oui, entièrement à distance. Nos recherches de marché mesurent d'ailleurs une vraie demande SEO en banlieue avec une concurrence bien plus faible qu'au centre-ville de Montréal — souvent l'occasion la plus rentable pour une entreprise de Laval ou de Longueuil.",
  ],
];

export default function AgenceSeoMontrealPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/fr/agence-seo-montreal"
        name="Agence SEO Montréal — Référencement naturel et local"
        description="Services de référencement (SEO) à Montréal : SEO technique, référencement local et optimisation IA, avec forfaits mensuels affichés de 600 $ à 850 $ CAD."
        offers={[
          { name: "Croissance SEO — Essentiel", price: 600, interval: "MONTH" },
          { name: "Croissance SEO — Avancé", price: 850, interval: "MONTH" },
        ]}
        breadcrumb={[
          ["Accueil", "/"],
          ["Services", "/services"],
          ["Agence SEO Montréal", "/fr/agence-seo-montreal"],
        ]}
        faq={FAQ}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Agence SEO · Montréal</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Agence SEO à Montréal — le référencement, avec les prix affichés.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            StillAwake Media est une agence SEO montréalaise qui bâtit des systèmes de référencement complets : SEO
            technique, référencement local, architecture de contenu et optimisation pour les moteurs IA. Pas de jargon
            creux, pas d&apos;appel de vente obligatoire — des forfaits clairs, un rapport chaque mois, des résultats
            mesurables.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Démarrer mon SEO
            </Link>
            <Link href="/fr/realisations" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">Forfaits mensuels. Prix en dollars canadiens.</h2>
          <p className="mt-4 max-w-3xl text-[#C7B9B9]">
            Croissance SEO — Essentiel coûte 600 $ CAD par mois. Croissance SEO — Avancé coûte 850 $ CAD par mois.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Croissance SEO — Essentiel"
              price="600 $ CAD"
              cadence="par mois"
              items={["SEO technique", "Optimisation des pages", "Suivi Google Search Console", "Rapport mensuel clair"]}
              cta={["Choisir Essentiel", "/fr/contact"]}
            />
            <PriceCard
              name="Croissance SEO — Avancé"
              price="850 $ CAD"
              cadence="par mois"
              items={["Tout le forfait Essentiel", "Optimisation moteurs IA (AEO)", "Optimisation des entités", "Stratégie de contenu"]}
              cta={["Choisir Avancé", "/fr/contact"]}
              highlight
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Pour qui</h2>
            <ul className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>— Entreprises de services qui veulent des appels et des soumissions, pas juste du trafic</li>
              <li>— Boutiques en ligne qui veulent vendre sans dépendre de la pub</li>
              <li>— Entreprises bilingues qui doivent exister dans les deux langues sur Google</li>
              <li>— Propriétaires qui veulent comprendre ce qu&apos;ils paient chaque mois</li>
            </ul>
          </div>
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Comment ça fonctionne</h2>
            <ol className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>1. Audit initial — technique, contenu, concurrence, visibilité locale</li>
              <li>2. Correctifs techniques et fondations (structure, vitesse, données structurées)</li>
              <li>3. Travail mensuel : contenu, liens internes, visibilité locale et IA</li>
              <li>4. Rapport mensuel : ce qui a été fait, ce qui a bougé, ce qui s&apos;en vient</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Trois preuves SEO, sourcées et datées
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            La plupart des agences vous montrent des logos. Nous montrons des positions mesurées, avec leur source et
            leur date — cliquez pour vérifier.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Link href="/fr/etude-de-cas-lisa-travel-design" className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
              <p className="geist text-3xl font-black tracking-[-0.04em] text-[#D71920]">0 → page 1</p>
              <h3 className="mt-2 text-lg font-semibold">TravelDesign By Lisa</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                De zéro clic organique à des positions en page 1 en 8 semaines : ~2 300 défauts SEO corrigés sur une
                plateforme trilingue de 834 URL. Sessions moyennes de 9 minutes — les visiteurs restent.
              </p>
            </Link>
            <Link href="/fr/etude-de-cas-bankdemark" className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
              <p className="geist text-3xl font-black tracking-[-0.04em] text-[#D71920]">Position 1,3</p>
              <h3 className="mt-2 text-lg font-semibold">BankDeMark</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                Position moyenne de 1,3 sur sa grappe de requêtes (Google Search Console) avec un score Lighthouse
                parfait de 100/100/100, mesuré par nous en août 2026.
              </p>
            </Link>
            <Link href="/fr/etude-de-cas-blackwater-aquatics" className="rounded-[2rem] border border-white/10 p-7 transition hover:border-[#D71920]/60">
              <p className="geist text-3xl font-black tracking-[-0.04em] text-[#D71920]">8,6 % CTR</p>
              <h3 className="mt-2 text-lg font-semibold">Blackwater Aquatics</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                Une fiche produit Shopify en page 1 avec 8,6 % de taux de clic, ~60 000 impressions sur les 12
                meilleures pages — le contenu éducatif qui vend, mesuré sur 180 jours.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-4xl gap-14">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Ce que le référencement veut dire en 2026</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Le SEO n&apos;est plus une liste de mots-clés répétés dans une page. C&apos;est un système : une
              fondation technique que Google peut explorer sans friction, une architecture de contenu qui couvre les
              vraies questions de vos clients, une visibilité locale entretenue, et — nouveauté qui change tout —
              une lisibilité pour les moteurs de réponse IA. Quand quelqu&apos;un demande à ChatGPT ou à Gemini
              « quelle agence recommandes-tu à Montréal? », les entreprises citées sont celles dont les sites sont
              structurés pour être compris. Les autres n&apos;existent tout simplement pas dans la réponse.
            </p>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              Notre pratique couvre les deux mondes à la fois, parce qu&apos;ils reposent sur la même fondation :
              structure propre, données structurées, contenu réellement utile, preuves vérifiables.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Le marché québécois, en chiffres réels</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Avant de vendre du SEO au Québec, on l&apos;a mesuré (Google Ads Keyword Planner, ciblage Québec,
              2026). Quelques données que la plupart des agences ne partageront jamais : « agence seo » se cherche
              environ 480 fois par mois au Québec, « agence seo montréal » environ 170 fois, et les annonceurs paient
              jusqu&apos;à ~79 $ le clic sur « seo montréal » — c&apos;est le prix que le marché accorde à cette
              visibilité. Les Québécois écrivent « site web » 2,6 fois plus souvent que « site internet » — un détail
              de vocabulaire qui change comment vos pages doivent être écrites. Et la demande existe aussi à
              <strong className="text-white"> Laval et Longueuil</strong>, avec une concurrence nettement plus faible
              qu&apos;au centre-ville : souvent l&apos;occasion la plus rapide pour une entreprise de banlieue.
            </p>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              Ce travail de mesure, c&apos;est la première étape de chaque mandat : votre stratégie repose sur la
              demande réelle de votre marché, pas sur des suppositions.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Le SEO technique d&apos;abord — parce que rien ne tient sans lui</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Un contenu brillant sur un site cassé ne se positionne pas. La fondation technique — exploration,
              indexation, vitesse, stabilité visuelle, données structurées, canoniques, sitemaps — décide de ce que
              Google peut même considérer. C&apos;est mesurable, alors nous publions nos mesures : la plateforme de
              TravelDesign By Lisa tient un CLS de 0,00 (zéro déplacement de mise en page) et 100 en bonnes
              pratiques; BankDeMark obtient un Lighthouse parfait de 100/100/100. Ce sont nos audits Chrome
              Lighthouse d&apos;août 2026, refaisables par n&apos;importe qui.
            </p>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              Sur un mandat typique, les premières semaines corrigent cette fondation. Chez Lisa, ce sont ~2 300
              défauts techniques qui ont été éliminés avant que les positions décollent — le décollage n&apos;était
              pas un hasard.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Le référencement local : être trouvé dans votre quartier</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Pour une entreprise de services, la recherche locale est souvent le canal le plus payant : « près de
              moi », le quartier, la carte. Le travail combine votre fiche Google Business, la cohérence de vos
              coordonnées, des données structurées LocalBusiness, des pages par service écrites pour
              l&apos;intention locale, et un système d&apos;avis honnête. La preuve locale la plus parlante de notre
              portfolio : la page « travel agent Montréal » de Lisa tient des positions en page 1 (position moyenne
              ~7,9, Search Console) pour une entreprise partie de zéro. Le détail complet est sur notre page{" "}
              <Link href="/fr/referencement-local" className="text-[#D71920] underline-offset-4 hover:underline">référencement local</Link>.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">L&apos;architecture de contenu : l&apos;autorité se construit en grappes</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Une page seule ne devient pas une autorité. Google récompense les sites qui couvrent leur sujet en
              profondeur : une page pilier, des pages satellites par intention, un maillage interne qui concentre la
              force au lieu de la disperser. Le cas le plus net de notre portfolio :{" "}
              <Link href="/fr/etude-de-cas-blackwater-aquatics" className="text-[#D71920] underline-offset-4 hover:underline">Blackwater Aquatics</Link>,
              une boutique où 64 pages éducatives portent 17 produits. Résultat mesuré : des guides aux positions 5 à
              8 sur les vraies questions de la niche, ~60 000 impressions sur les 12 meilleures pages — et une fiche
              produit qui se positionne en page 1 avec 8,6 % de taux de clic, chose presque impossible sans cette
              architecture derrière.
            </p>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              L&apos;effet dépasse le trafic : le taux de clients récurrents de la boutique est passé de 5,9 % à
              27,8 % d&apos;une période à l&apos;autre. Le contenu qui positionne est le même qui fait revenir les
              acheteurs.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Données structurées et maillage interne : l&apos;infrastructure invisible</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Les données structurées (schema.org) disent explicitement à Google et aux moteurs IA qui vous êtes, ce
              que vous vendez et à quel prix. Le maillage interne décide quelles pages reçoivent l&apos;autorité que
              votre site accumule. Ce site même est la démonstration : chaque page de service porte son schéma
              Service avec offres et FAQ, chaque paire français-anglais est liée par hreflang, et notre catalogue
              complet est publié en format lisible par les IA. Regardez le code source de cette page — c&apos;est
              exactement ce qu&apos;on construit pour nos clients.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Le SEO bilingue : deux marchés, deux sites</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Au Québec, vos clients cherchent dans deux langues — et Google traite ces recherches comme deux marchés
              distincts. La mauvaise solution : traduire à la machine et espérer. La bonne : des pages françaises
              écrites pour le vocabulaire d&apos;ici (rappel : « site web » bat « site internet » 2,6 contre 1), un
              hreflang réciproque propre, et une expérience où un francophone ne tombe jamais sur une page anglaise.
              C&apos;est la règle que nous appliquons à notre propre entreprise : formulaires, courriels et portail
              client existent intégralement dans les deux langues.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">L&apos;optimisation pour les moteurs IA (AEO)</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Une part croissante des recherches n&apos;aboutit plus sur une liste de liens mais dans une réponse
              d&apos;IA. Être cité dans ces réponses se travaille : contenu en forme de questions-réponses, prix
              extractibles, données structurées, fichier llms.txt, autorité d&apos;entité. Nous mesurons aussi cette
              dimension : le site NAVTRL que nous avons construit obtient un score parfait de 100 en navigation
              agentique — l&apos;audit de la capacité des assistants IA à lire et naviguer un site. Le forfait Avancé
              inclut ce travail; le service dédié est détaillé sur notre page{" "}
              <Link href="/fr/referencement-ia" className="text-[#D71920] underline-offset-4 hover:underline">optimisation IA</Link>.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Pourquoi tant d&apos;agences SEO déçoivent</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Les plaintes qu&apos;on entend des entreprises qui arrivent chez nous sont toujours les mêmes : prix
              cachés jusqu&apos;à l&apos;appel de vente, contrats de 12 mois signés avant la première preuve,
              rapports remplis de jargon qui ne disent pas ce qui a été fait, et des « positions » sur des mots-clés
              que personne ne cherche. Notre réponse structurelle : les prix sont sur cette page, il n&apos;y a pas
              de contrat annuel, le rapport mensuel dit ce qui a été fait et ce qui a bougé en français clair, et les
              preuves sont publiques. Si nous ne livrons pas, vous partez — c&apos;est la bonne pression, et elle est
              sur nous.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Un actif qui se cumule</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              La publicité s&apos;arrête quand le budget s&apos;arrête. Le référencement se cumule : chaque correctif
              technique, chaque page utile, chaque position gagnée continue de travailler des mois plus tard. Chez
              Blackwater, des commandes arrivent chaque semaine de la recherche organique — sans un dollar de
              publicité. C&apos;est ça, l&apos;actif. Décrivez votre situation dans notre{" "}
              <Link href="https://stillawake.studio/fr/demarrer" className="text-[#D71920] underline-offset-4 hover:underline">formulaire</Link>{" "}
              et recevez une évaluation écrite : où vous êtes, ce qui bloque, et ce que le forfait ferait dans votre
              cas — sans appel de vente.
            </p>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions fréquentes sur le SEO" items={FAQ} />

      <RelatedServices
        title="Services connexes"
        links={[
          ["Création de site web à Montréal", "/fr/agence-web-montreal"],
          ["Optimisation IA (AEO)", "/fr/referencement-ia"],
          ["Guide : le SEO expliqué", "/fr/referencement-naturel"],
          ["Guide : audit SEO", "/fr/audit-seo"],
          ["Guide : être cité par les IA", "/fr/etre-cite-par-ia"],
          ["Guide : fiche Google Entreprise", "/fr/fiche-google-entreprise"],
          ["Tarifs", "/fr/tarifs"],
          ["English version", "/seo-montreal"],
        ]}
      />
    
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[.3em] text-[#D71920]">Des preuves, pas des promesses</p>
          <h2 className="geist max-w-3xl text-3xl font-black tracking-[-0.06em]">De zéro clic organique à la page 1 en 8 semaines — mesuré.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            TravelDesign By Lisa : plateforme trilingue de 834 URL, ~2 300 défauts SEO corrigés, sessions moyennes de
            9 minutes, CLS 0,00 et Bonnes pratiques 100 mesurés en août 2026. Chaque chiffre est sourcé et daté dans l'étude de cas.
          </p>
          <a href="/fr/etude-de-cas-lisa-travel-design" className="mt-6 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Lire l'étude de cas →</a>
        </div>
      </section>
    
      <ArticlesLies pillar="/fr/agence-seo-montreal" />
    </main>
  );
}
