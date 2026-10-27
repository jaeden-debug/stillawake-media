import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";
import { PageSchema } from "@/components/page-schema";
import { ContentRow } from "@/components/our-work/ContentRow";
import { ProjectCard } from "@/components/our-work/ProjectCard";
import { PosterArt } from "@/components/media/PosterArt";
import { SiteSearch } from "@/components/search/SiteSearch";
import { projectCategories, projects, projectsInCategory, recentlyUpdated } from "@/data/portfolio/projects";
import { projectCategoriesFr, projectHrefFr, projectsFr } from "@/data/portfolio/projects-fr";
import { JsonLd, graph, itemList } from "@/lib/game-schema";
import type { SearchDoc } from "@/lib/search";
import { siteUrl } from "@/lib/data";

const pageUrl = `${siteUrl}/fr/realisations`;
const description =
  "Découvrez le portfolio de StillAwake Media : sites web sur mesure, boutiques Shopify, logiciels, solutions d’IA et expériences numériques. Voyez ce que nous avons bâti pour les entreprises.";

// La carte de partage (Open Graph / X) s'adresse aux gens, pas aux résultats de recherche.
const shareTitle = "Réalisations | Design web, logiciels et expériences numériques — StillAwake Media";
const shareDescription =
  "Découvrez le travail derrière StillAwake Media. Des sites web sur mesure et boutiques en ligne aux logiciels propulsés par l’IA et aux expériences interactives, voyez ce que nous concevons, développons et faisons naître.";
const shareImage = {
  url: "/stillawake-our-work-social-preview.jpg",
  width: 1200,
  height: 630,
  alt: "StillAwake Media, On Air, stillawakemedia.com",
};

export const metadata: Metadata = {
  title: { absolute: "Nos réalisations | Conception et développement web — StillAwake Media" },
  description,
  alternates: {
    canonical: "/fr/realisations",
    languages: {
      "fr-CA": pageUrl,
      "en-CA": `${siteUrl}/our-work`,
      "x-default": `${siteUrl}/our-work`,
    },
  },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: pageUrl,
    siteName: "StillAwake Media",
    type: "website",
    locale: "fr_CA",
    alternateLocale: ["en_CA"],
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [shareImage.url],
  },
};

export default function Realisations() {
  const featured = projects.find((p) => p.featured && p.categories.includes("games")) ?? projects[0];
  const featuredFr = projectsFr[featured.id];
  const featuredHref = projectHrefFr(featured);
  const rows = projectCategories
    .map((c) => ({ category: c, fr: projectCategoriesFr[c.id], items: projectsInCategory(c.id) }))
    .filter((r) => r.items.length > 0);

  const docs: SearchDoc[] = projects.map((p) => ({
    id: `project:${p.id}`,
    title: p.title,
    url: projectHrefFr(p).href,
    group: "Projets",
    summary: projectsFr[p.id]?.summary ?? p.summary,
    keywords: [
      projectsFr[p.id]?.kind ?? p.kind,
      ...p.platforms,
      ...p.categories.map((c) => projectCategoriesFr[c].label),
    ],
  }));

  return (
    <main className="pt-24">
      <PageSchema route="/fr/realisations" />
      <JsonLd
        data={graph(
          itemList(
            "Réalisations de StillAwake Media",
            projects.map((p) => ({ name: p.title, url: projectHrefFr(p).href })),
          ),
        )}
      />

      <section className="relative overflow-hidden" aria-labelledby="realisations-title">
        <div className="absolute inset-0" aria-hidden="true">
          <PosterArt
            src={(featured.heroImage ?? featured.image)?.src}
            alt=""
            title=""
            accent={featured.accent}
            aspect="auto"
            sizes="100vw"
            priority
            className="h-full opacity-70"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_15%,rgba(5,5,5,.6)_55%,rgba(5,5,5,.2))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-24">
          <p className="text-xs font-bold uppercase tracking-[.35em] text-[#D71920]">Réalisations</p>
          <h1 id="realisations-title" className="geist mt-4 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.075em] md:text-7xl">
            Des sites, des applications, des jeux et les outils derrière.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C7B9B9]">
            Tous les projets livrés par StillAwake Media, au même endroit. Parcourez par catégorie, cherchez, ou lisez l&apos;étude de cas.
          </p>

          <div className="mt-12 max-w-2xl rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-md md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.3em]" style={{ color: featured.accent }}>
              En vedette · {featuredFr?.kind ?? featured.kind}
            </p>
            <h2 className="geist mt-2 text-4xl font-black tracking-[-.06em] md:text-5xl">{featured.title}</h2>
            <p className="mt-3 text-base leading-7 text-[#C7B9B9]">{featuredFr?.summary ?? featured.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Plateformes">
              {featured.platforms.map((p) => (
                <li key={p} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white">{p}</li>
              ))}
              {featured.status === "in-development" && (
                <li className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#C7B9B9]">En développement</li>
              )}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={featuredHref.href}
                hrefLang={featuredHref.lang}
                data-track="portfolio_featured_click"
                data-track-project={featured.id}
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/90"
              >
                Voir le projet{featuredHref.lang ? " (en anglais)" : ""}
              </Link>
              {featured.externalUrl && (
                <a
                  href={featured.externalUrl}
                  target="_blank"
                  rel="noopener"
                  data-track="roblox_outbound_click"
                  data-track-game={featured.id}
                  data-track-placement="realisations_hero"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Voir sur Roblox ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6" aria-label="Parcourir et chercher">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
          <nav aria-label="Catégories">
            <ul className="flex flex-wrap gap-2">
              {rows.map(({ category, fr, items }) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-sm text-[#C7B9B9] transition hover:border-white/30 hover:text-white"
                  >
                    {fr.label}
                    <span className="text-xs text-[#777]">{items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <SiteSearch docs={docs} scope="realisations" locale="fr" placeholder="Chercher : Shopify, application, Roblox, finance…" />
        </div>
      </section>

      <ContentRow id="vedette" title="En vedette" blurb="Par où commencer." locale="fr">
        {projects.filter((p) => p.featured).map((p, i) => (
          <ProjectCard key={p.id} project={p} priority={i < 2} locale="fr" />
        ))}
      </ContentRow>

      {rows.map(({ category, fr, items }) => (
        <ContentRow key={category.id} id={category.id} title={fr.label} blurb={fr.blurb} locale="fr">
          {items.map((p) => (
            <ProjectCard key={p.id} project={p} locale="fr" />
          ))}
        </ContentRow>
      ))}

      <ContentRow id="recents" title="Mis à jour récemment" locale="fr">
        {recentlyUpdated().map((p) => (
          <ProjectCard key={p.id} project={p} locale="fr" />
        ))}
      </ContentRow>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="text-xs font-bold uppercase tracking-[.35em] text-[#D71920]">Derrière les projets</p>
          <h2 className="geist mt-4 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.06em] md:text-5xl">
            Vous voulez le raisonnement et les chiffres?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#C7B9B9]">
            Les études de cas expliquent le mandat, l&apos;architecture des pages, la structure de recherche et les résultats mesurés de chaque projet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/fr/etudes-de-cas" className="rounded-full bg-[#D71920] px-6 py-3 font-bold">Lire les études de cas →</Link>
            <Link href="/our-work" hrefLang="en-CA" className="rounded-full border border-white/15 px-6 py-3 font-bold text-[#C7B9B9] hover:text-white">
              English version →
            </Link>
          </div>
        </div>
      </section>

      <InternalLinks locale="fr" />
    </main>
  );
}
