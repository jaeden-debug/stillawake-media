import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { jaedenDoody } from "@/data/people/jaeden-doody";
import { ArticlesLies } from "@/components/articles-lies";

const url = `${siteUrl}/fr/fiche-google-entreprise`;

export const metadata: Metadata = {
  title: "Fiche Google Entreprise : le guide québécois (2026)",
  description:
    "Comment optimiser votre fiche Google Entreprise (Google Business Profile) au Québec : catégories, photos, avis, publications et pièges à éviter — par un studio qui gère de vraies fiches, avec des positions locales mesurées.",
  alternates: { canonical: "/fr/fiche-google-entreprise" },
  openGraph: {
    title: "Fiche Google Entreprise : le guide québécois | StillAwake Media",
    description: "Optimiser sa fiche Google au Québec : le guide pratique, sans mythes.",
    url,
    type: "article",
    locale: "fr_CA",
  },
};

export default function FicheGoogleEntreprisePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: "Fiche Google Entreprise : le guide québécois",
        description:
          "Optimiser sa fiche Google Entreprise au Québec : catégories, photos, avis, publications, bilinguisme et pièges à éviter.",
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
          { "@type": "ListItem", position: 2, name: "Fiche Google Entreprise", item: url },
        ],
      },
    ],
  };

  return (
    <main className="bg-black pt-28 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Guide · Référencement local</p>
          <h1 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Fiche Google Entreprise : le guide québécois
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
              <strong className="text-white">Votre fiche Google Entreprise (Google Business Profile) est le profil
              gratuit qui apparaît quand quelqu&apos;un cherche votre entreprise sur Google ou sur Maps.</strong> Pour
              une entreprise locale québécoise, c&apos;est souvent la première impression — avant même votre site web.
              Une fiche complète et active influence directement qui Google montre pour « près de moi », votre
              quartier et votre service. Et l&apos;optimiser ne coûte rien d&apos;autre que du travail bien fait.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Ce qui compte vraiment (et dans quel ordre)</h2>
            <p>
              Google déclare publiquement trois grands facteurs pour le classement local : la{" "}
              <strong className="text-white">pertinence</strong> (votre fiche correspond-elle à la recherche?), la{" "}
              <strong className="text-white">distance</strong> et la{" "}
              <strong className="text-white">notoriété</strong> (votre réputation en ligne globale). Vous ne contrôlez
              pas la distance. Tout le reste de ce guide travaille les deux autres.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">1. La catégorie principale : la décision la plus importante</h3>
            <p>
              La catégorie principale est le signal de pertinence le plus fort de toute la fiche. Choisissez la plus
              précise possible — « Agence de marketing numérique » plutôt que « Service aux entreprises », « Plombier »
              plutôt que « Entrepreneur ». Ajoutez ensuite des catégories secondaires pour vos autres services réels.
              L&apos;erreur classique : une catégorie trop générale choisie une fois, jamais revue, qui plafonne la
              fiche pendant des années.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">2. La cohérence des coordonnées, partout</h3>
            <p>
              Nom, adresse, téléphone : exactement identiques sur votre fiche, votre site web, vos réseaux et les
              annuaires. Les incohérences sèment le doute — pour Google, et de plus en plus pour les assistants IA qui
              recommandent des entreprises. Un point souvent oublié au Québec : n&apos;ajoutez pas « Montréal » ou des
              mots-clés à votre nom d&apos;entreprise sur la fiche si ce n&apos;est pas votre vrai nom légal ou usuel.
              C&apos;est contre les règles de Google, et les fiches se font suspendre pour ça.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">3. Les avis : le système, pas la chance</h3>
            <p>
              Les avis pèsent sur la notoriété ET sur la conversion — les gens lisent avant d&apos;appeler. Ce qui
              fonctionne : demander au bon moment (à la livraison d&apos;un résultat, quand la satisfaction est
              fraîche), rendre la demande facile (lien direct vers le formulaire d&apos;avis), et{" "}
              <strong className="text-white">répondre à tous les avis</strong>, y compris les négatifs, avec calme et
              précision. Ce qui détruit : acheter des avis ou en fabriquer. C&apos;est détectable, c&apos;est
              sanctionné, et une vague d&apos;avis cinq étoiles sans texte le même mois se repère à l&apos;œil nu.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">4. Photos réelles, mises à jour</h3>
            <p>
              Les fiches avec de vraies photos récentes — l&apos;équipe, les lieux, le travail en cours — surclassent
              les fiches avec un logo et deux photos d&apos;archives. Pas besoin d&apos;un photographe : un téléphone
              récent et de la lumière naturelle suffisent. Ajoutez-en régulièrement; une fiche visiblement vivante
              signale une entreprise vivante.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">5. Le français et l&apos;anglais</h3>
            <p>
              Vos clients cherchent dans les deux langues — nos recherches de marché le mesurent (les Québécois
              écrivent « site web » 2,6 fois plus souvent que « site internet », mais les recherches anglaises
              existent aussi dans presque tous les secteurs). La description de votre fiche devrait être dans la
              langue de votre clientèle principale; votre site, lui, devrait exister dans les deux — c&apos;est le
              travail de fond couvert par notre page{" "}
              <Link href="/fr/referencement-local" className="text-[#D71920] underline underline-offset-4">référencement local</Link>.
            </p>

            <h3 className="geist pt-2 text-2xl font-black tracking-[-0.04em] text-white">6. Le lien fiche ↔ site web</h3>
            <p>
              La fiche n&apos;existe pas en vase clos : Google recoupe ce qu&apos;elle affirme avec ce que votre site
              web démontre. Une fiche « Agence SEO » qui pointe vers un site sans page SEO digne de ce nom ne
              convainc personne. Chaque service listé sur la fiche devrait avoir sa page dédiée, avec des données
              structurées LocalBusiness — exactement l&apos;architecture que nous appliquons à nos propres pages et
              à celles de nos clients.
            </p>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">Les mythes qui coûtent cher</h2>
            <ul className="space-y-3">
              <li>— <strong className="text-white">« Publier tous les jours améliore le classement. »</strong> Les publications aident la conversion (elles montrent une entreprise active), mais aucune preuve sérieuse n&apos;en fait un facteur de classement majeur. Publiez ce qui est utile, au rythme réel de votre entreprise.</li>
              <li>— <strong className="text-white">« Plus de mots-clés dans la description = mieux. »</strong> La description ne pèse pas sur le classement; elle sert le client qui la lit. Écrivez-la pour lui.</li>
              <li>— <strong className="text-white">« Une fois remplie, c&apos;est réglé. »</strong> Les fiches abandonnées déclinent : heures désuètes, questions sans réponse, photos d&apos;il y a cinq ans. Quinze minutes par mois suffisent.</li>
            </ul>

            <h2 className="geist pt-6 text-3xl font-black tracking-[-0.05em] text-white">La preuve que le local, ça se mesure</h2>
            <p>
              Le référencement local ne se juge pas aux promesses mais aux positions. Exemple mesuré de notre
              portfolio :{" "}
              <Link href="/fr/etude-de-cas-lisa-travel-design" className="text-[#D71920] underline underline-offset-4">TravelDesign By Lisa</Link>,
              une entreprise de services montréalaise partie de zéro clic organique, tient maintenant des positions en
              page 1 sur ses recherches locales (position moyenne ~7,9, Google Search Console). La fiche Google en
              fait partie — mais c&apos;est le système complet qui a livré : site techniquement solide, pages par
              intention, cohérence partout.
            </p>
          </div>

          <div className="mt-14 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">Vous voulez que ce soit fait, pas expliqué?</h2>
            <p className="mt-3 leading-8 text-[#C7B9B9]">
              L&apos;optimisation de la fiche Google fait partie de nos forfaits SEO — 600 $ ou 850 $ CAD par mois,
              prix publics, sans contrat annuel. Décrivez votre entreprise par écrit, recevez une évaluation — sans
              appel de vente.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="https://stillawake.studio/fr/demarrer" className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Évaluer ma visibilité locale</Link>
              <Link href="/fr/agence-seo-montreal" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium transition hover:border-white/40">Voir les forfaits SEO</Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <Link href="/fr/referencement-local" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Référencement local</Link>
            <Link href="/fr/referencement-naturel" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Le SEO expliqué</Link>
            <Link href="/fr/audit-seo" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Audit SEO</Link>
            <Link href="/fr/etudes-de-cas" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-[#D71920]/60">Études de cas</Link>
          </div>
        </div>
      </article>
    
      <ArticlesLies pillar="/fr/fiche-google-entreprise" />
    </main>
  );
}
