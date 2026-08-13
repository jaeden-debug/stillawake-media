import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { entityIds, ventures } from "@/data/entities";
import { jaedenDoody as person } from "@/data/people/jaeden-doody";

const frUrl = `${siteUrl}/fr/fondateur/jaeden-doody`;

export const metadata: Metadata = {
  title: "Jaeden Doody — Fondateur de StillAwake Media",
  description:
    "Jaeden Doody est le fondateur montréalais de StillAwake Media. Créateur et développeur, il bâtit des logiciels, des systèmes d'IA et des solutions d'affaires concrètes.",
  alternates: {
    canonical: "/fr/fondateur/jaeden-doody",
    languages: {
      "fr-CA": frUrl,
      "en-CA": person.url,
      "x-default": person.url,
    },
  },
  openGraph: {
    title: "Jaeden Doody — Fondateur de StillAwake Media",
    description:
      "Créateur et développeur montréalais : logiciels, systèmes d'IA et solutions d'affaires concrètes.",
    url: frUrl,
    type: "profile",
    locale: "fr_CA",
  },
};

const principles = [
  [
    "Comprendre le système d'abord",
    "Rafistoler un symptôme avant de comprendre ce qui le produit ne fait généralement que déplacer la panne vers un endroit moins visible.",
  ],
  [
    "Questionner les évidences",
    "« C'est comme ça que ça se fait » décrit une habitude, pas une explication. Ça vaut la peine de demander qui a décidé ça, et si la raison tient encore.",
  ],
  [
    "Bâtir pour apprendre",
    "Un système qui tourne vous apprend des choses que la théorie ne montre pas. L'essentiel de ce que Jaeden sait du logiciel, de la recherche et des opérations vient d'avoir exploité quelque chose, pas de l'avoir lu.",
  ],
  [
    "Suivre le problème en profondeur",
    "Le problème évident est souvent un symptôme. Le travail intéressant se trouve une ou deux couches en dessous.",
  ],
  [
    "Reconstruire quand il le faut",
    "Améliorer sans fin un système fondamentalement brisé coûte plus cher que le reconstruire correctement une fois. Savoir dans laquelle des deux situations on se trouve, c'est ça le métier.",
  ],
  [
    "Rester curieux",
    "Chaque système contient quelque chose qui mérite d'être compris — y compris ceux qui ont l'air plates de l'extérieur.",
  ],
];

const faqs = [
  [
    "Qui est Jaeden Doody?",
    "Jaeden Doody est un créateur et développeur établi à Montréal, au Québec, et le fondateur de StillAwake Media. Il bâtit des logiciels, des produits numériques et des systèmes d'affaires, et il est arrivé à la technologie par la mécanique.",
  ],
  [
    "Qui a fondé StillAwake Media?",
    "StillAwake Media a été fondée par Jaeden Doody. C'est l'entreprise par laquelle il développe des logiciels, des systèmes intelligents et de l'infrastructure numérique pour les entreprises modernes.",
  ],
  [
    "Qui a créé ZylX, et est-ce un produit de StillAwake Media?",
    "ZylX est un produit de StillAwake Media, créé par Jaeden Doody. C'est un système d'intelligence d'affaires — un « cerveau d'entreprise » pour l'IA — qui connecte les systèmes d'une entreprise et rend ce contexte accessible aux assistants IA autorisés via le protocole MCP.",
  ],
  [
    "Qu'est-ce que BankDeMark?",
    "BankDeMark est une plateforme de gestion financière connectée fondée par Jaeden Doody. Elle relie les dossiers financiers personnels et d'entreprise, les transactions, les factures et l'intelligence financière à travers ses produits Command et Invoice. Elle opère comme organisation distincte, pas comme produit de StillAwake Media.",
  ],
  [
    "Quel est le lien entre Jaeden et Blackwater Aquatics?",
    "Jaeden a fondé et opère Blackwater Aquatics Canada, une entreprise de commerce en ligne qui vend de la nourriture vivante pour poissons, des bettas, des crevettes et du vivant d'aquarium. C'est une entreprise distincte de StillAwake Media — et c'est de là que vient, de première main, une grande partie de son expérience en commerce en ligne, en SEO et en opérations.",
  ],
  [
    "Quel est le parcours professionnel de Jaeden Doody?",
    "Il a commencé en mécanique, sur des systèmes physiques, avant de passer au logiciel, aux sites web, à l'IA, à l'automatisation et aux systèmes d'affaires. L'approche diagnostique l'a suivi : comprendre le système, remonter la panne jusqu'à sa vraie cause, puis réparer ou reconstruire.",
  ],
];

export default function Page() {
  /**
   * Same entity graph as the EN page — identical @ids, French surface. The
   * Person node re-uses person.id so both language pages describe one entity;
   * only the ProfilePage node is page-specific.
   */
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person.id,
        name: person.name,
        url: person.url,
        description:
          "Jaeden Doody est un créateur et développeur établi à Montréal et le fondateur de StillAwake Media. Il bâtit des logiciels, des produits numériques et les systèmes d'affaires qui les soutiennent — avec une approche héritée de la mécanique.",
        birthDate: person.birthDate,
        birthPlace: { "@type": "Place", name: person.birthPlaceName },
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: person.locality,
            addressRegion: person.region,
            addressCountry: person.country,
          },
        },
        jobTitle: person.jobTitle,
        worksFor: { "@id": entityIds.organization },
        knowsAbout: [...person.knowsAbout],
        ...(person.sameAs.length ? { sameAs: [...person.sameAs] } : {}),
      },
      {
        "@type": "ProfilePage",
        "@id": `${frUrl}#profilepage`,
        url: frUrl,
        name: "Jaeden Doody — Fondateur de StillAwake Media",
        inLanguage: "fr-CA",
        mainEntity: { "@id": person.id },
        isPartOf: { "@id": entityIds.website },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${siteUrl}/fr` },
          { "@type": "ListItem", position: 2, name: "Fondateur", item: frUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${frUrl}#faq`,
        inLanguage: "fr-CA",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Fondateur
          </p>

          <h1 className="geist text-6xl font-black leading-[.9] tracking-[-0.075em] md:text-9xl">
            Jaeden Doody
          </h1>

          <p className="geist mt-6 text-xl font-bold tracking-[-0.03em] text-white md:text-2xl">
            Fondateur de StillAwake Media · Créateur · Développeur
          </p>

          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-[#C7B9B9]">
            <p>
              Jaeden Doody est un créateur et développeur établi à Montréal, au
              Québec, et le fondateur de{" "}
              <span className="text-white">StillAwake Media</span> —
              l&apos;entreprise par laquelle il bâtit des logiciels, des
              produits numériques et les systèmes d&apos;affaires qui les font
              tourner.
            </p>

            <p>
              Il n&apos;a pas commencé dans le logiciel. Il a commencé dans la
              mécanique — et c&apos;est encore la chose la plus utile dans sa
              façon de travailler.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-6 py-4 font-bold">
              Travailler avec StillAwake →
            </Link>

            <Link href="/fr/etudes-de-cas" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
              Voir le travail →
            </Link>

            <a
              href={person.linkedin}
              target="_blank"
              rel="me noopener"
              className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white"
            >
              Suivre sur LinkedIn →
            </a>

            <Link href="/founder/jaeden-doody" lang="en-CA" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
              English version →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-4">
        <div className="mx-auto max-w-7xl">
          <div className="glass rounded-[2rem] p-8 md:p-10">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">
              Qui est Jaeden Doody?
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[#C7B9B9]">
              Jaeden Doody est un créateur et développeur de Montréal, au
              Québec, et le fondateur de StillAwake Media, un studio qui bâtit
              des logiciels, des sites web, des systèmes de commerce en ligne et
              de l&apos;infrastructure d&apos;IA. Arrivé à la technologie par la
              mécanique, il bâtit et opère ses propres entreprises — dont ZylX,
              un système d&apos;intelligence d&apos;affaires pour l&apos;IA;
              BankDeMark, une plateforme financière connectée; et Blackwater
              Aquatics Canada, un commerce en ligne bien réel — et c&apos;est de
              là que vient, de première main, l&apos;expertise derrière le
              travail client de StillAwake.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Parcours
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            De la mécanique au logiciel.
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-[#C7B9B9]">
            <p>
              Avant de bâtir des systèmes logiciels, Jaeden travaillait sur des
              systèmes mécaniques. La mécanique impose une discipline
              difficile à contrefaire : on ne répare pas de façon fiable ce
              qu&apos;on ne comprend pas. Une pièce bouge ou ne bouge pas. Le
              moteur tourne ou ne tourne pas. Il n&apos;existe aucune version du
              métier où on contourne une panne en parlant.
            </p>

            <p>
              On apprend donc une séquence. Quand quelque chose casse, on
              remonte la trace. On inspecte les composants. On trouve celui qui
              est réellement responsable — pas celui qui est le plus facile à
              blâmer. Puis on répare, ou on décide que la conception était
              mauvaise et on reconstruit.
            </p>

            <p>
              Cette séquence s&apos;est transférée presque intégralement. Les
              objets ont changé; la pensée, non. Les systèmes mécaniques sont
              devenus des systèmes logiciels. Le dépannage est devenu du
              débogage. Les composants sont devenus des services, des bases de
              données, des API et des flux de travail. Reconstruire un
              assemblage est devenu du développement de produit.
            </p>

            <p>
              C&apos;est aussi pourquoi beaucoup de conseils d&apos;affaires
              standards passent mal avec lui. Une recommandation sans mécanisme
              derrière, c&apos;est une supposition avec de la confiance
              par-dessus — et en mécanique, deviner avec confiance, c&apos;est
              comme ça qu&apos;on remplace deux fois la mauvaise pièce.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Approche
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Bâtir, c&apos;est sa façon d&apos;apprendre.
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-[#C7B9B9]">
            <p>
              Jaeden ne sépare pas l&apos;apprentissage et la construction. Les
              projets <em>sont</em> l&apos;étude — chacun est un terrain
              concret pour comprendre en même temps les clients, le logiciel,
              les opérations, la finance, le marketing, la recherche,
              l&apos;automatisation, l&apos;IA, les données et
              l&apos;infrastructure, dans des conditions réelles où se tromper a
              des conséquences.
            </p>

            <p>
              Le résultat est une boucle plutôt qu&apos;une ligne droite :
              trouver un problème, comprendre ce qui le cause vraiment, bâtir
              quelque chose, l&apos;exploiter assez longtemps pour voir où ça
              force, découvrir le problème suivant qui se cachait sous le
              premier, et améliorer le système.
            </p>

            <p>
              Il lui arrive de se créer des problèmes volontairement — prendre
              un projet qu&apos;il ne sait pas encore finir, parce que devoir le
              finir est ce qui force l&apos;apprentissage. C&apos;est une
              habitude de curiosité avant tout.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 text-sm">
            {["Problème", "Enquêter", "Bâtir", "Exploiter", "Nouveau problème", "Améliorer"].map(
              (step, i) => (
                <span key={step} className="flex items-center gap-3">
                  <span className="glass rounded-full px-5 py-3 font-bold text-white">
                    {step}
                  </span>
                  {i < 5 && <span className="text-[#D71920]">→</span>}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Les heures que personne ne voit
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Un produit fini cache presque tout le travail.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            La partie visible d&apos;un projet, c&apos;est le lancement. La
            vraie partie, c&apos;est la nuit d&apos;avant — et les cinquante
            nuits d&apos;avant celle-là. Une séquence illustrative — pas des
            heures historiques, mais une nuit que tout bâtisseur reconnaîtra :
          </p>

          <div className="mt-10 max-w-2xl font-mono text-sm leading-7">
            {[
              ["23 h 47", "Un dernier bogue avant de pouvoir livrer."],
              ["0 h 38", "Le bogue n'est pas un bogue. C'est l'architecture qui est mauvaise."],
              ["1 h 26", "Architecture réécrite. La moitié des tests échouent — tant mieux, ils testaient la mauvaise chose."],
              ["2 h 14", "Les tests passent. Déploiement."],
              ["2 h 17", "En le regardant tourner, il voit ce que ça pourrait faire ensuite."],
              ["2 h 18", "Il ouvre un nouveau fichier."],
            ].map(([time, entry]) => (
              <div key={time} className="flex gap-4 border-l border-[#D71920]/40 py-2 pl-5">
                <span className="shrink-0 text-[#D71920]">{time}</span>
                <span className="text-[#C7B9B9]">{entry}</span>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            La dernière ligne est la plus importante. Le nom StillAwake en est
            venu à représenter exactement ça — pas le manque de sommeil comme
            trophée, mais l&apos;état d&apos;être véritablement incapable de
            laisser un problème tranquille une fois que la prochaine solution
            est visible. Les systèmes finis sur cette page sont faits de
            centaines de ces petites boucles invisibles : bâtir, casser,
            tracer, apprendre, reconstruire.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Entreprises et produits
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Ce qu&apos;il a bâti.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Quatre choses, avec des liens différents entre elles. Ce ne sont pas
            toutes le même genre d&apos;entreprise, et ça vaut la peine
            d&apos;être précis.
          </p>

          <div className="mt-12 space-y-5">
            <article className="rounded-[2.5rem] border border-[#D71920]/30 bg-[#D71920]/10 p-8 md:p-10">
              <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                Fondée par Jaeden Doody · vous êtes ici
              </p>
              <h3 className="geist mt-4 text-3xl font-black tracking-[-0.05em] md:text-4xl">
                StillAwake Media
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#E7DFDF]">
                L&apos;entreprise que Jaeden a fondée, et le parapluie sous
                lequel passe le reste du travail. StillAwake Media bâtit des
                logiciels, des systèmes intelligents et de l&apos;infrastructure
                numérique pour les entreprises modernes — identifier un vrai
                problème opérationnel, comprendre le système qui le produit,
                puis bâtir une solution concrète. Elle existe parce qu&apos;il
                rencontrait sans cesse ces problèmes en exploitant ses propres
                entreprises, et qu&apos;il en a eu assez de recoudre ensemble
                des outils qui n&apos;étaient pas faits pour la tâche.
              </p>
              <Link
                href="/fr/a-propos"
                className="mt-6 inline-flex text-sm font-bold text-white underline decoration-[#D71920] underline-offset-4"
              >
                En savoir plus sur StillAwake Media →
              </Link>
            </article>

            {ventures.map((venture) => (
              <article
                key={venture.key}
                className="rounded-[2.5rem] border border-white/10 bg-[#070707] p-8 md:p-10"
              >
                <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                  {venture.key === "zylx" && "Produit StillAwake Media · créé par Jaeden Doody"}
                  {venture.key === "bankdemark" && "Fondée par Jaeden Doody · organisation distincte"}
                  {venture.key === "blackwater" && "Fondée et opérée par Jaeden Doody · entreprise distincte"}
                </p>

                <h3 className="geist mt-4 text-3xl font-black tracking-[-0.05em] md:text-4xl">
                  {venture.name}
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-8 text-[#C7B9B9]">
                  {venture.key === "zylx" && (
                    <>
                      Un produit StillAwake Media, créé par Jaeden. ZylX
                      connecte les systèmes d&apos;une entreprise une seule
                      fois, en construit un contexte persistant, et rend ce
                      contexte accessible aux assistants IA autorisés via le
                      protocole MCP — pour qu&apos;un assistant réponde avec la
                      vraie connaissance de l&apos;entreprise au lieu de
                      deviner. C&apos;est l&apos;exemple le plus clair du motif
                      derrière tout le reste : le problème était réel, rencontré
                      à répétition en exploitant d&apos;autres entreprises, et
                      la solution est devenue un produit.
                    </>
                  )}
                  {venture.key === "bankdemark" && (
                    <>
                      BankDeMark relie les dossiers financiers personnels et
                      d&apos;entreprise, les transactions, les factures et
                      l&apos;intelligence financière à travers ses produits
                      Command et Invoice. BankDeMark opère comme sa propre
                      organisation, pas comme un produit StillAwake Media —
                      Jaeden l&apos;a fondée et la développe, mais les deux
                      entités sont distinctes.
                    </>
                  )}
                  {venture.key === "blackwater" && (
                    <>
                      Une entreprise canadienne de commerce en ligne qui vend de
                      la nourriture vivante pour poissons, des bettas, des
                      crevettes et du vivant d&apos;aquarium — opérée au
                      quotidien, pas juste construite puis remise à
                      quelqu&apos;un. Celle-ci compte pour une raison précise :
                      c&apos;est un vrai commerce avec de vrais clients, de
                      l&apos;inventaire, de l&apos;expédition et de la
                      concurrence de recherche. L&apos;expérience derrière le
                      travail ecommerce, SEO et automatisation de StillAwake est
                      de première main, pas théorique. C&apos;est une entreprise
                      distincte de StillAwake Media.
                    </>
                  )}
                </p>

                <a
                  href={venture.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex text-sm font-bold text-white underline decoration-[#D71920] underline-offset-4"
                >
                  {venture.domain} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Du concret, pas des adjectifs
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Le travail, chiffres à l&apos;appui.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Les adjectifs ne coûtent rien; les mesures, oui. Ces quatre projets
            clients sont documentés dans des études de cas complètes où chaque
            chiffre porte sa source et sa date.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              ["/fr/etude-de-cas-lisa-travel-design", "TravelDesign By Lisa", "Une plateforme de voyage trilingue de 834 URL — CMS sur mesure, portail client, CRM et boutique eSIM automatisée — menée de zéro clic organique à la page 1, couverte par 412 tests."],
              ["/fr/etude-de-cas-bankdemark", "BankDeMark", "Une plateforme financière dont les calculs d'argent sont vérifiés contre 26 cas de référence, en position moyenne 1,3 sur Google avec un score Lighthouse mesuré de 100/100/100."],
              ["/fr/etude-de-cas-stalkr-navtrl", "NAVTRL / Stalkr", "Une app de localisation en temps réel — 10 947 lignes de TypeScript, synchronisation sous 3 secondes, SOS à activation maintenue — du premier commit au build TestFlight en 24 jours."],
              ["/fr/etude-de-cas-blackwater-aquatics", "Blackwater Aquatics", "Une boutique Shopify menée par l'éducation : 64 pages de contenu pour 17 produits, une fiche produit en page 1 à 8,6 % de CTR, et un taux de clients récurrents passé de 5,9 % à 27,8 %."],
            ].map(([href, name, detail]) => (
              <Link key={href} href={href} className="glass rounded-[2rem] p-7 transition hover:border-[#D71920]/60">
                <h3 className="geist text-2xl font-black tracking-[-0.05em]">{name}</h3>
                <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{detail}</p>
                <p className="mt-4 text-sm font-bold text-[#D71920]">Lire l&apos;étude de cas →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Registre technique
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            La pile, et à quoi elle sert.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Chaque technologie ci-dessous est en production dans les projets de
            cette page — rien n&apos;est de la décoration de CV.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              ["Plateformes web", "TypeScript, React et Next.js — la fondation des sites et plateformes de StillAwake, y compris celui-ci. Utilisés pour des systèmes rendus côté serveur et solides en SEO, pas pour des démos."],
              ["Mobile", "React Native avec Expo — une seule base de code qui livre iOS et Android, prouvée par le moteur de localisation en temps réel de Stalkr."],
              ["Données et sécurité", "Supabase et PostgreSQL avec sécurité au niveau des lignes sur chaque table — y compris les données de localisation et les dossiers financiers, où une politique manquante n'est pas un détail."],
              ["Paiements et commerce", "Stripe pour les abonnements, le paiement et la réconciliation; Shopify et Liquid pour le commerce en ligne, opérés de première main via Blackwater Aquatics."],
              ["Systèmes d'IA", "Intégration de modèles d'IA avec des garde-fous conçus — ZylX connecte les systèmes d'affaires aux assistants IA via le protocole MCP, bâti pour que les assistants répondent depuis de vraies données au lieu de deviner."],
              ["Recherche et mesure", "Données structurées, graphes d'entités, architecture hreflang, Search Console et Lighthouse — traités comme de l'ingénierie, avec des mesures publiées et datées."],
            ].map(([area, detail]) => (
              <div key={area}>
                <h3 className="geist text-xl font-black tracking-[-0.04em] text-white">{area}</h3>
                <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Domaines de travail
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Sur quoi il travaille.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Les domaines dans lesquels Jaeden bâtit et fait de la recherche.
            Certains depuis des années; d&apos;autres sont actuels et en
            apprentissage actif.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            {[
              "Intelligence artificielle",
              "Agents IA",
              "Protocole MCP",
              "Intelligence d'affaires",
              "SaaS",
              "Développement logiciel",
              "Systèmes d'affaires",
              "Automatisation",
              "Technologie financière",
              "Commerce en ligne",
              "Recherche et SEO",
              "Infrastructure de données",
              "Sites web et produits numériques",
              "Développement de produit",
            ].map((area) => (
              <span
                key={area}
                className="glass rounded-full px-5 py-3 text-sm text-[#C7B9B9]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Principes
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Comment il aborde les problèmes.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map(([heading, body]) => (
              <div key={heading} className="glass rounded-[2rem] p-7">
                <h3 className="geist text-2xl font-black tracking-[-0.05em]">
                  {heading}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#C7B9B9]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Dans ses mots
          </p>

          <div className="mt-4 max-w-3xl space-y-6 text-lg leading-9 text-[#E7DFDF]">
            <p>
              « J&apos;ai toujours voulu savoir comment les choses fonctionnent
              pour vrai. La mécanique m&apos;a donné un point de départ, et
              c&apos;était un travail honnête d&apos;une façon bien précise : si
              quelque chose était brisé, tu ne pouvais pas t&apos;en sortir en
              parlant. Il fallait aller trouver le problème. »
            </p>

            <p>
              « Ça m&apos;a suivi dans le logiciel et les affaires. Aujourd&apos;hui,
              au lieu de démonter un moteur, je démonte des flux de travail, des
              API, des systèmes financiers, des problèmes de recherche et de
              l&apos;infrastructure d&apos;IA. Même instinct, autres objets. »
            </p>

            <p>
              « J&apos;aime bâtir des choses. Ce que j&apos;aime encore plus,
              c&apos;est comprendre ce que j&apos;ai bâti et pourquoi ça
              fonctionne — parce que c&apos;est cette partie-là qui se transfère
              au prochain projet. »
            </p>
          </div>

          <p className="geist mt-10 text-sm font-bold tracking-[-0.02em] text-[#8F8585]">
            — Jaeden Doody, fondateur, StillAwake Media
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            En exploration
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Ce qu&apos;il bâtit en ce moment.
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-[#C7B9B9]">
            <p>
              Le centre de gravité actuel, c&apos;est ZylX et la question qui le
              sous-tend : comment donner à un assistant IA un contexte
              d&apos;affaires réel et vérifié — pour qu&apos;il réponde à
              partir de ce qui est vrai d&apos;une entreprise au lieu
              d&apos;improviser? Ça entraîne les agents IA, le protocole MCP,
              l&apos;intelligence d&apos;affaires et l&apos;ingénierie de
              garde-fous qui garde un assistant honnête.
            </p>
            <p>
              En parallèle : le système client asynchrone de StillAwake — un
              parcours d&apos;acquisition, d&apos;accueil et de livraison qui
              fonctionne en français et en anglais sans appels de vente
              obligatoires — et la recherche continue sur la visibilité dans
              les recherches IA (AEO) que StillAwake publie et applique pour ses
              clients.
            </p>
          </div>

          <p className="mt-8 text-sm text-[#8F8585]">Dernière mise à jour : 12 août 2026</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Écrits et recherche
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Le travail, décortiqué.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Jaeden signe des articles dans The StillAwake Times, publiés en
            anglais seulement pour l&apos;instant. En français, le raisonnement
            derrière les projets est documenté dans les études de cas : le
            mandat, l&apos;architecture des pages, la structure de recherche et
            les décisions techniques, avec les chiffres mesurés.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["BankDeMark", "/fr/etude-de-cas-bankdemark", "Architecture SEO menée par les calculateurs, et un score Lighthouse parfait mesuré."],
              ["NAVTRL / Stalkr", "/fr/etude-de-cas-stalkr-navtrl", "Du premier commit à TestFlight en 24 jours, plus le moteur de croissance autour."],
              ["Blackwater Aquatics", "/fr/etude-de-cas-blackwater-aquatics", "Commerce Shopify mené par l&apos;éducation : 64 pages pour 17 produits."],
              ["Lisa Travel Design", "/fr/etude-de-cas-lisa-travel-design", "Positionnement haut de gamme et parcours de demande qualifiée."],
            ].map(([name, href, desc]) => (
              <Link
                key={href}
                href={href}
                className="glass rounded-[2rem] p-6 transition hover:border-[#D71920]/60"
              >
                <h3 className="geist text-xl font-black tracking-[-0.04em]">{name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{desc}</p>
              </Link>
            ))}
          </div>

          <Link href="/fr/etudes-de-cas" className="mt-8 inline-flex text-[#D71920]">
            Voir toutes les études de cas →
          </Link>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Questions
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Questions fréquentes.
          </h2>

          <div className="mt-12 space-y-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="glass rounded-[2rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.04em]">
                  {question}
                </h3>
                <p className="mt-3 max-w-4xl text-base leading-8 text-[#C7B9B9]">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#D71920]/20 p-10 md:p-16">
          <h2 className="geist max-w-4xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-6xl">
            Un problème qui mérite d&apos;être résolu?
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#E7DFDF]">
            Décrivez ce que vous bâtissez à StillAwake — par écrit, sans appel
            de vente.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-white px-7 py-4 text-sm font-bold text-black">
              Démarrer un projet →
            </Link>
            <Link href="/fr/etudes-de-cas" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white">
              Explorer le travail →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
