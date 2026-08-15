import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { LlmsTxtTool } from "@/components/tools/llms-txt-tool";
import { publishedGuides } from "@/data/llms-txt-guides";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}/fr/outils/generateur-llms-txt`;
const enUrl = `${siteUrl}/tools/llms-txt-generator`;

export const metadata: Metadata = {
  title: "Générateur llms.txt gratuit + vérification de lisibilité IA",
  description:
    "Générez un fichier llms.txt pour votre site et découvrez ce qu'un moteur de réponse peut — ou ne peut pas — dire de votre entreprise. Gratuit, sans inscription, sans courriel.",
  alternates: {
    canonical: "/fr/outils/generateur-llms-txt",
    languages: { "fr-CA": url, "en-CA": enUrl, "x-default": enUrl },
  },
  openGraph: {
    title: "Générateur llms.txt gratuit — StillAwake Media",
    description:
      "Créez votre fichier llms.txt et voyez ce que ChatGPT, Perplexity et les aperçus IA de Google peuvent réellement dire de votre entreprise.",
    url,
    type: "website",
    locale: "fr_CA",
  },
};

/**
 * Les vérifications, décrites exactement comme `src/lib/llms-txt/analyze.ts`
 * les implémente — même ordre que les constats retournés par l'outil, pour que
 * la page et le résultat ne racontent jamais deux histoires différentes.
 */
const VERIFICATIONS = [
  {
    name: "Identité de l'organisation",
    detail:
      "Cherche un nœud Organization (ou un sous-type) dans le JSON-LD de votre page d'accueil et en lit le nom. C'est la vérification la plus lourdement pondérée : si une machine n'arrive pas à établir à qui appartient le site, rien de ce qu'elle trouve ensuite ne vous est attribuable.",
  },
  {
    name: "Description de l'entreprise",
    detail:
      "Prend la description de l'organisation dans les données structurées, avec repli sur votre méta-description. Un site dont la seule autodescription est un slogan ne donne rien de concret à répéter à un moteur.",
  },
  {
    name: "Signal de prix",
    detail:
      "Balaie les pages récupérées à la recherche de montants ($, €, £, ou un chiffre suivi de CAD/USD/EUR/GBP). Volontairement conservateur : un faux positif vous ferait croire que vos prix sont trouvables alors qu'ils ne le sont pas.",
  },
  {
    name: "Zone desservie",
    detail:
      "Lit areaServed dans votre balisage d'organisation. Sans lui, un assistant à qui on demande quelqu'un « près de moi » n'a aucune base pour vous inclure.",
  },
  {
    name: "Moyen de contact",
    detail:
      "Cherche une page ou un lien de contact réel. Une recommandation qu'on ne peut pas suivre est rarement faite.",
  },
  {
    name: "Entité fondateur ou auteur",
    detail:
      "Résout founder/author, y compris lorsqu'il s'agit d'une référence @id pointant vers une personne déclarée ailleurs — c'est la façon correcte de modéliser une entité partagée, et l'outil ne vous pénalise pas pour l'avoir bien fait.",
  },
  {
    name: "Profils externes (sameAs)",
    detail:
      "Compte les profils liés par sameAs. C'est ainsi qu'on indique à un moteur que l'entité d'ici et celle d'ailleurs sont la même, plutôt que deux entreprises au nom semblable.",
  },
  {
    name: "Fichier llms.txt existant",
    detail:
      "Vérifie si /llms.txt répond déjà. Publier le fichier, c'est choisir votre résumé au lieu d'accepter celui qui sera déduit.",
  },
];

export default function GenerateurLlmsTxtPage() {
  const guides = publishedGuides("fr");

  return (
    <main className="bg-black pt-28 text-white">
      <PageSchema route="/fr/outils/generateur-llms-txt" />

      <section className="border-b border-white/10 px-6 pb-16 pt-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Outil gratuit</p>
          <h1 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Générateur llms.txt
          </h1>
          <p className="mt-8 text-lg leading-8 text-white/70">
            <strong className="text-white">Un fichier llms.txt est un résumé en texte simple de votre site,
            destiné aux systèmes d&apos;IA.</strong> Cet outil le génère pour vous — mais surtout, il vous dit ce
            qu&apos;un moteur de réponse <em>n&apos;arrive pas</em> à établir sur votre entreprise. C&apos;est cette
            deuxième partie qui a de la valeur. Gratuit, sans inscription, sans courriel.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <LlmsTxtTool locale="fr" />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-12">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.05em]">
              Une convention proposée, pas une norme
            </h2>
            <p className="mt-5 leading-8 text-[#C7B9B9]">
              Soyons clairs sur ce point, parce que beaucoup d&apos;outils ne le sont pas : llms.txt est une{" "}
              <strong className="text-white">convention proposée</strong>, pas un standard officiel du web. Aucun
              fournisseur d&apos;IA ne s&apos;est engagé publiquement à le lire, et publier le fichier ne garantit ni
              un meilleur classement, ni une citation, ni du trafic. Ce qu&apos;il fait, concrètement : il vous
              laisse choisir le résumé de votre entreprise au lieu de laisser une machine le déduire de ce
              qu&apos;elle croise en premier. C&apos;est un petit pari asymétrique — quelques minutes de travail
              pour un bénéfice possible, pas une solution miracle.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.05em]">Ce que l&apos;outil vérifie réellement</h2>
            <p className="mt-5 leading-8 text-[#C7B9B9]">
              Huit vérifications d&apos;entité, pondérées selon leur effet sur votre capacité à être cité. La liste
              ci-dessous décrit exactement ce que le code fait — pas une version marketing.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {VERIFICATIONS.map((v) => (
                <div key={v.name} className="rounded-[1.5rem] border border-white/10 p-6">
                  <h3 className="font-semibold text-white">{v.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#C7B9B9]">{v.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.05em]">Ce que l&apos;outil ne fait pas</h2>
            <ul className="mt-5 space-y-3 leading-8 text-[#C7B9B9]">
              <li>— Il lit votre page d&apos;accueil, votre plan de site et un maximum de douze pages. Ce n&apos;est pas un audit de site complet.</li>
              <li>— Il ne publie rien à votre place : vous copiez le fichier et l&apos;installez vous-même.</li>
              <li>— Il ne peut pas promettre qu&apos;une IA vous citera. Personne ne le peut.</li>
              <li>— Un score élevé signifie que vos faits d&apos;entité sont lisibles, pas que votre entreprise se classera.</li>
            </ul>
          </div>

          {guides.length > 0 && (
            <div>
              <h2 className="geist text-3xl font-black tracking-[-0.05em]">
                L&apos;installer sur votre plateforme
              </h2>
              <p className="mt-5 leading-8 text-[#C7B9B9]">
                Générer le fichier est la partie facile. L&apos;installer correctement dépend de votre plateforme —
                et sur certaines, vous en avez déjà un sans le savoir.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/fr/outils/llms-txt/${guide.slug}`}
                    className="rounded-full border border-white/10 px-5 py-3 text-sm transition hover:border-[#D71920]/60 hover:text-white"
                  >
                    {guide.platform}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">
              Les lacunes sont le vrai travail
            </h2>
            <p className="mt-3 leading-8 text-[#C7B9B9]">
              Publier le fichier prend cinq minutes. Corriger les constats — identité d&apos;entité absente, prix
              introuvables, zone desservie non déclarée — c&apos;est ce qui détermine si un assistant peut vous
              décrire et vous recommander. C&apos;est exactement le service qu&apos;on offre en{" "}
              <Link href="/fr/referencement-ia" className="text-[#D71920] underline underline-offset-4">
                référencement IA
              </Link>
              , et le guide complet est sur{" "}
              <Link href="/fr/etre-cite-par-ia" className="text-[#D71920] underline underline-offset-4">
                être cité par ChatGPT et les moteurs IA
              </Link>
              .
            </p>
          </div>

          <p className="text-sm text-[#8F8585]">
            Outil et méthodologie par{" "}
            <Link
              href="/fr/fondateur/jaeden-doody"
              className="underline decoration-[#D71920] underline-offset-4 hover:text-white"
            >
              Jaeden Doody
            </Link>
            . Le fichier llms.txt de ce site est public :{" "}
            <a href="/llms.txt" className="text-[#D71920] underline underline-offset-4">
              stillawakemedia.com/llms.txt
            </a>
            . Version anglaise :{" "}
            <Link href="/tools/llms-txt-generator" className="text-[#D71920] underline underline-offset-4">
              llms.txt generator
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
