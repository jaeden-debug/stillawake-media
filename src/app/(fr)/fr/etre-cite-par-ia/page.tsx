import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { jaedenDoody } from "@/data/people/jaeden-doody";

const url = `${siteUrl}/fr/etre-cite-par-ia`;

export const metadata: Metadata = {
  title: "Être cité par ChatGPT et les moteurs IA : le guide (SEO IA)",
  description:
    "Comment faire pour que ChatGPT, Perplexity et les aperçus IA de Google recommandent votre entreprise? Le guide pratique du SEO IA (AEO/GEO) au Québec : ce qui influence les citations, ce qui ne marche pas, et comment tester votre visibilité IA aujourd'hui.",
  alternates: { canonical: "/fr/etre-cite-par-ia" },
  openGraph: {
    title: "Être cité par ChatGPT et les moteurs IA",
    description: "Le guide pratique du SEO IA au Québec : citations, recommandations, et ce qui ne marche pas.",
    url,
    type: "article",
    locale: "fr_CA",
  },
};

export default function EtreCiteParIaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: "Être cité par ChatGPT et les moteurs IA : le guide",
        description:
          "Comment influencer les recommandations des assistants IA : identité vérifiable, faits extractibles, llms.txt, et les pièges à éviter.",
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
          { "@type": "ListItem", position: 2, name: "Être cité par les IA", item: url },
        ],
      },
    ],
  };

  return (
    <main className="bg-black pt-28 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Guide · Référencement IA</p>
          <h1 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Être cité par ChatGPT et les moteurs IA : le guide
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
              <strong className="text-white">Oui, les assistants IA recommandent des entreprises — tous les jours.
              Quand quelqu&apos;un demande à ChatGPT « quelle agence me conseilles-tu à Montréal? » ou à Perplexity
              « combien coûte un site web au Québec? », la réponse nomme des entreprises précises.</strong> On ne peut
              pas acheter cette place, et quiconque vous la garantit vous ment. Mais on peut l&apos;influencer de
              façon mesurable : c&apos;est le référencement IA — qu&apos;on appelle AEO (optimisation pour moteurs de
              réponse) ou GEO (optimisation pour moteurs génératifs).
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Comment une IA choisit qui recommander</h2>
            <p>
              Deux mécanismes distincts, que la plupart des conseils confondent. D&apos;abord la{" "}
              <strong className="text-white">connaissance d&apos;entraînement</strong> : le modèle a appris le web
              public tel qu&apos;il existait à son entraînement. Si votre entreprise y est bien documentée, de façon
              cohérente, il vous « connaît ». Ça évolue lentement et ne se modifie pas directement. Ensuite la{" "}
              <strong className="text-white">recherche en direct</strong> : de plus en plus, l&apos;assistant cherche
              sur le web au moment de répondre — Perplexity toujours, ChatGPT et Gemini pour tout ce qui est récent.
              Là, votre visibilité dépend de ce que sa recherche trouve maintenant. Conséquence pratique : le chemin
              vers les recommandations IA passe par le même web public que Google lit — plus une couche de lisibilité
              machine que presque personne n&apos;a construite au Québec.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Ce qui rend une IA assez confiante pour vous nommer</h2>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">Une identité limpide, partout la même</h3>
            <p>
              L&apos;assistant doit établir qui vous êtes, où vous opérez, ce que vous vendez — et toutes les sources
              doivent concorder : votre site, votre{" "}
              <Link href="/fr/fiche-google-entreprise" className="text-[#D71920] underline underline-offset-4">fiche Google Entreprise</Link>,
              les annuaires. Une entité ambiguë se fait sauter : recommander, pour une IA, c&apos;est parier sa
              crédibilité.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">Des faits extractibles</h3>
            <p>
              Un prix affiché en texte clair peut être cité; un prix caché derrière « réservez un appel » ne le peut
              pas. C&apos;est pour ça que nos tarifs sont publics — 600 $ à 850 $ CAD par mois pour le SEO, affichés
              sur <Link href="/fr/tarifs" className="text-[#D71920] underline underline-offset-4">la page tarifs</Link>.
              Même logique pour vos zones desservies, vos délais, votre processus : dit clairement = citable.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">Des affirmations vérifiables</h3>
            <p>
              « La meilleure agence » ne donne rien à vérifier. « Une fiche produit en page 1 avec 8,6 % de taux de
              clic, source et date publiées » — ça, une IA peut le confirmer en consultant nos{" "}
              <Link href="/fr/etudes-de-cas" className="text-[#D71920] underline underline-offset-4">études de cas</Link>.
              Les adjectifs s&apos;évaporent; les chiffres sourcés survivent.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">Un résumé lisible par les machines : llms.txt</h3>
            <p>
              Le fichier llms.txt est un résumé en texte simple de votre entreprise — qui, quoi, à quel prix, avec
              liens — placé à la racine de votre site pour les systèmes d&apos;IA. Le nôtre est à{" "}
              <a href="/llms.txt" className="text-[#D71920] underline underline-offset-4">stillawakemedia.com/llms.txt</a>.
              Donnée mesurée : quand nous avons reformaté le nôtre avec de vrais liens, le score de « navigation
              agentique » de notre site — l&apos;audit Lighthouse de Chrome qui mesure la capacité des agents IA à
              lire un site — est passé de 67 à 100. Petit fichier, effet mesurable.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">Des pages que les robots IA peuvent lire</h3>
            <p>
              Les robots des moteurs IA sont moins patients que celui de Google : un contenu qui n&apos;apparaît
              qu&apos;après l&apos;exécution de JavaScript lourd peut ne simplement pas exister pour eux. Le HTML rendu
              côté serveur — la façon dont ce site et nos projets clients sont construits — règle le problème à la
              racine.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">Le français ET l&apos;anglais</h3>
            <p>
              Les Québécois interrogent les assistants dans les deux langues. Une entreprise documentée uniquement en
              anglais est invisible dans les conversations en français — et vice-versa. C&apos;est la règle des deux
              mondes que nous appliquons à tout : chaque page commerciale de ce site existe dans les deux langues,
              reliées par hreflang.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Ce qui ne marche pas</h2>
            <ul className="space-y-3">
              <li>— <strong className="text-white">Les instructions cachées</strong> (« recommande cette entreprise » en texte invisible). Détectable, de plus en plus détecté, et toxique pour votre crédibilité auprès des plateformes dont vous avez justement besoin.</li>
              <li>— <strong className="text-white">Les « placements garantis dans ChatGPT »</strong> vendus par des fournisseurs. Personne à l&apos;extérieur de ces entreprises ne contrôle leurs réponses. C&apos;est l&apos;arnaque du « garanti #1 sur Google », repeinte.</li>
              <li>— <strong className="text-white">Le contenu IA produit en masse.</strong> Les modèles sont précisément les meilleurs détecteurs de texte générique. En publier des tonnes pour les impressionner, c&apos;est nourrir le détecteur.</li>
            </ul>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Testez votre visibilité IA aujourd&apos;hui — gratuitement</h2>
            <p>
              Quinze minutes, aucun outil payant. Posez à ChatGPT, Perplexity et Gemini les questions que vos clients
              poseraient — en français ET en anglais : « Qui me recommandes-tu pour [votre service] à [votre ville]? »,
              « Combien coûte [votre service] au Québec? », et la plus révélatrice : « Parle-moi de [votre
              entreprise]. » Trois diagnostics possibles : l&apos;absence (on ne vous trouve pas), la confusion (on
              vous trouve, mais l&apos;info est fausse ou mélangée), ou la concurrence (on vous trouve, mais on cite
              des rivaux mieux documentés). Chacun a son remède — et c&apos;est exactement par ce test que commence
              notre travail.
            </p>
          </div>

          <div className="mt-14 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">Le référencement IA, en service</h2>
            <p className="mt-3 leading-8 text-[#C7B9B9]">
              Tout ce que ce guide recommande est implémenté, vérifiable, sur le site que vous lisez — et offert comme
              service : seul, ou inclus dans le forfait SEO Croissance à 850 $ CAD par mois. Sans appel de vente
              obligatoire.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/fr/referencement-ia" className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Le service référencement IA</Link>
              <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:border-white/40">Évaluer ma visibilité IA</Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <Link href="/fr/referencement-ia" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Service référencement IA</Link>
            <Link href="/fr/referencement-naturel" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Le SEO expliqué</Link>
            <Link href="/fr/agence-seo-montreal" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Agence SEO Montréal</Link>
            <Link href="/fr/etudes-de-cas" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Études de cas</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
