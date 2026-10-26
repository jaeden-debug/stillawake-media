import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { publishedGuides } from "@/data/llms-txt-guides";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}/fr/outils`;
const enUrl = `${siteUrl}/tools`;

export const metadata: Metadata = {
  title: "Outils techniques gratuits pour le web et la recherche IA",
  description:
    "Outils gratuits et guides d'implémentation de StillAwake Media — à commencer par un générateur llms.txt qui vous dit ce qu'un moteur de réponse n'arrive pas à établir sur votre entreprise. Sans inscription.",
  alternates: {
    canonical: "/fr/outils",
    languages: { "fr-CA": url, "en-CA": enUrl, "x-default": enUrl },
  },
  openGraph: {
    title: "Outils techniques gratuits — StillAwake Media",
    description:
      "Des outils gratuits pour vérifier comment les machines lisent votre site, avec des guides d'implémentation par plateforme.",
    url,
    type: "website",
    locale: "fr_CA",
  },
};

export default function OutilsPage() {
  const guides = publishedGuides("fr");

  return (
    <main className="bg-black pt-28 text-white">
      <PageSchema route="/fr/outils" />

      <section className="border-b border-white/10 px-6 pb-16 pt-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Outils</p>
          <h1 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Des outils qui vous disent ce qui manque.
          </h1>
          <p className="mt-8 text-lg leading-8 text-white/70">
            La plupart des outils gratuits d&apos;agence sont des formulaires de capture déguisés. Les nôtres font
            un vrai travail : ils examinent votre site comme une machine le ferait et vous rapportent ce
            qu&apos;elle <em>n&apos;arrive pas</em> à établir. Gratuits, sans inscription, sans courriel — et vous
            repartez avec le résultat, que vous nous parliez ou non.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/fr/outils/generateur-llms-txt"
            className="block rounded-[2rem] border border-white/10 bg-[#070707] p-8 transition hover:border-[#D71920]/60 md:p-10"
          >
            <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">Recherche IA</p>
            <h2 className="geist mt-4 text-3xl font-black tracking-[-0.05em]">Générateur llms.txt</h2>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              Génère un fichier llms.txt à partir de votre site — et signale les huit faits d&apos;entité
              qu&apos;un moteur de réponse cherche : qui vous êtes, ce que vous vendez, où vous opérez, ce que ça
              coûte. Les lacunes sont le vrai résultat.
            </p>
            <p className="mt-6 text-sm font-bold text-[#D71920]">Ouvrir l&apos;outil →</p>
          </Link>

          <Link
            href="/fr/outils/calculateur-cout-projet"
            className="mt-6 block rounded-[2rem] border border-white/10 bg-[#070707] p-8 transition hover:border-[#D71920]/60 md:p-10"
          >
            <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">Budget</p>
            <h2 className="geist mt-4 text-3xl font-black tracking-[-0.05em]">
              Calculateur de coût de projet
            </h2>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              Utilise le même modèle tarifaire qu&apos;on emploie à l&apos;interne pour chiffrer de vrais
              mandats. Les questions portent sur votre entreprise, pas sur la technologie — vous
              n&apos;avez jamais à deviner s&apos;il vous faut Shopify, une API ou un moteur de
              réservation.
            </p>
            <p className="mt-6 text-sm font-bold text-[#D71920]">Ouvrir l&apos;outil →</p>
          </Link>

          <Link
            href="/fr/guide-site-web-entreprise"
            className="mt-6 block rounded-[2rem] border border-white/10 bg-[#070707] p-8 transition hover:border-[#D71920]/60 md:p-10"
          >
            <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">Guide</p>
            <h2 className="geist mt-4 text-3xl font-black tracking-[-0.05em]">
              Quel type de site web pour votre entreprise ?
            </h2>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              La question que le calculateur suppose déjà réglée. Vingt-quatre énoncés sur votre
              entreprise, neuf types de sites, et une lecture honnête de ce que vos réponses
              indiquent — y compris quand la réponse est « moins que ce que vous alliez acheter ».
            </p>
            <p className="mt-6 text-sm font-bold text-[#D71920]">Ouvrir le guide →</p>
          </Link>

          <Link
            href="/fr/choisir-technologie-site-web"
            className="mt-6 block rounded-[2rem] border border-white/10 bg-[#070707] p-8 transition hover:border-[#D71920]/60 md:p-10"
          >
            <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">Guide</p>
            <h2 className="geist mt-4 text-3xl font-black tracking-[-0.05em]">
              Quelle technologie choisir pour son site web ?
            </h2>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              La décision qui suit celle d&apos;au-dessus. Une échelle de simplicité à cinq niveaux,
              neuf situations d&apos;affaires et une comparaison sur quinze critères entre
              constructeurs hébergés, Webflow, WordPress, Shopify et développement sur mesure —
              écrite pour vous éviter d&apos;acheter une machinerie que vos besoins n&apos;ont jamais
              demandée.
            </p>
            <p className="mt-6 text-sm font-bold text-[#D71920]">Ouvrir le guide →</p>
          </Link>

          <Link
            href="/fr/logiciel-sur-mesure-ou-solution-existante"
            className="mt-6 block rounded-[2rem] border border-white/10 bg-[#070707] p-8 transition hover:border-[#D71920]/60 md:p-10"
          >
            <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">Guide</p>
            <h2 className="geist mt-4 text-3xl font-black tracking-[-0.05em]">
              Avez-vous vraiment besoin d&apos;un logiciel sur mesure ?
            </h2>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              La question qui vient avant toutes les autres. Acheter, configurer, intégrer, étendre
              ou bâtir — dans cet ordre, avec une règle : on ne descend d&apos;un échelon qu&apos;en
              nommant ce que celui du dessus ne pouvait pas faire. Écrit par un studio qui développe
              du sur-mesure, et qui commence donc par les arguments contre.
            </p>
            <p className="mt-6 text-sm font-bold text-[#D71920]">Ouvrir le guide →</p>
          </Link>

          {guides.length > 0 && (
            <div className="mt-12">
              <h2 className="geist text-2xl font-black tracking-[-0.05em]">
                Guides d&apos;implémentation par plateforme
              </h2>
              <p className="mt-3 leading-8 text-[#C7B9B9]">
                Comment installer un llms.txt là où votre site vit réellement — vérifié contre la documentation
                officielle de chaque plateforme, avec la date de vérification sur chaque guide.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/fr/outils/llms-txt/${guide.slug}`}
                    className="rounded-[1.5rem] border border-white/10 p-6 transition hover:border-[#D71920]/60"
                  >
                    <h3 className="font-semibold text-white">{guide.platform}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#C7B9B9]">{guide.supportStatus.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 rounded-[2rem] border border-white/10 p-8">
            <h2 className="geist text-xl font-black tracking-[-0.05em]">Pourquoi il n&apos;y en a qu&apos;un</h2>
            <p className="mt-3 leading-8 text-[#C7B9B9]">
              Parce qu&apos;on publie un outil quand il fait quelque chose d&apos;utile, pas pour remplir une page.
              D&apos;autres viendront quand ils mériteront d&apos;exister. Entretemps, le travail commercial derrière
              celui-ci est le{" "}
              <Link href="/fr/referencement-ia" className="text-[#D71920] underline underline-offset-4">
                référencement IA
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
