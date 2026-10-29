import type { Metadata } from "next";
import { metaDescription } from "@/lib/meta-description";
import Link from "next/link";
import { InternalLinks } from "@/components/site";
import { PageSchema } from "@/components/page-schema";
import { ContentRow } from "@/components/our-work/ContentRow";
import { ProjectCard } from "@/components/our-work/ProjectCard";
import { PosterArt } from "@/components/media/PosterArt";
import { SiteSearch } from "@/components/search/SiteSearch";
import {
  projectCategories,
  projectHref,
  projects,
  projectsInCategory,
  recentlyUpdated,
} from "@/data/portfolio/projects";
import { siteSearchDocs } from "@/lib/search-index";
import { JsonLd, graph, itemList } from "@/lib/game-schema";
import { siteUrl } from "@/lib/data";

const description =
  "Explore StillAwake Media’s portfolio of custom websites, Shopify stores, software, AI solutions, and digital experiences. See what we’ve built for businesses.";

// The share card (Open Graph / X) is written for people, not search results.
const shareTitle = "Our Work | Web Design, Software & Digital Experiences — StillAwake Media";
const shareDescription =
  "Explore the work behind StillAwake Media. From custom websites and eCommerce stores to AI-powered software and interactive experiences, discover what we design, develop, and bring to life.";
const shareImage = {
  url: "/stillawake-our-work-social-preview.jpg",
  width: 1200,
  height: 630,
  alt: "StillAwake Media, On Air, stillawakemedia.com",
};

export const metadata: Metadata = {
  title: { absolute: "Our Portfolio | Web Design & Development — StillAwake Media" },
  description: metaDescription(description),
  alternates: {
    canonical: "/our-work",
    languages: {
      "en-CA": `${siteUrl}/our-work`,
      "fr-CA": `${siteUrl}/fr/realisations`,
      "x-default": `${siteUrl}/our-work`,
    },
  },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: `${siteUrl}/our-work`,
    siteName: "StillAwake Media",
    type: "website",
    locale: "en_CA",
    alternateLocale: ["fr_CA"],
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [shareImage.url],
  },
};

export default function OurWorkPage() {
  const featured = projects.find((p) => p.featured && p.categories.includes("games")) ?? projects[0];
  const featuredRow = projects.filter((p) => p.featured);
  const docs = siteSearchDocs().filter((d) => d.group === "Projects");
  const rows = projectCategories
    .map((c) => ({ category: c, items: projectsInCategory(c.id) }))
    .filter((r) => r.items.length > 0);

  return (
    <main className="pt-24">
      <PageSchema route="/our-work" />
      <JsonLd data={graph(itemList("StillAwake Media projects", projects.map((p) => ({ name: p.title, url: projectHref(p) }))))} />

      {/* Featured hero */}
      <section className="relative overflow-hidden" aria-labelledby="our-work-title">
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
          <p className="text-xs font-bold uppercase tracking-[.35em] text-[#D71920]">Our Work</p>
          <h1 id="our-work-title" className="geist mt-4 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.075em] md:text-7xl">
            Websites, apps, games and the tools behind them.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C7B9B9]">
            Every project StillAwake Media has shipped, in one place. Browse by shelf, search, or open a project for the full story.
          </p>

          <div className="mt-12 max-w-2xl rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-md md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.3em]" style={{ color: featured.accent }}>
              Featured · {featured.kind}
            </p>
            <h2 className="geist mt-2 text-4xl font-black tracking-[-.06em] md:text-5xl">{featured.title}</h2>
            <p className="mt-3 text-base leading-7 text-[#C7B9B9]">{featured.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Platforms">
              {featured.platforms.map((p) => (
                <li key={p} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white">{p}</li>
              ))}
              {featured.status === "in-development" && (
                <li className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#C7B9B9]">In development</li>
              )}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={projectHref(featured)}
                data-track="portfolio_featured_click"
                data-track-project={featured.id}
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View project
              </Link>
              {featured.externalUrl && (
                <a
                  href={featured.externalUrl}
                  target="_blank"
                  rel="noopener"
                  data-track="roblox_outbound_click"
                  data-track-game={featured.id}
                  data-track-placement="our_work_hero"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  {featured.externalLabel ?? "Open"} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category navigation and search */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6" aria-label="Browse and search">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
          <nav aria-label="Categories">
            <ul className="flex flex-wrap gap-2">
              {rows.map(({ category, items }) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-sm text-[#C7B9B9] transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    {category.label}
                    <span className="text-xs text-[#777]">{items.length}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href="/games" className="inline-flex rounded-full border border-[#7FA36B]/40 px-4 py-2 text-sm text-[#b9d4a8] transition hover:text-white">
                  Games hub →
                </Link>
              </li>
            </ul>
          </nav>
          <SiteSearch docs={docs} scope="our_work" placeholder="Search projects: Shopify, app, Roblox, finance…" />
        </div>
      </section>

      <ContentRow id="featured" title="Featured Work" blurb="Where to start.">
        {featuredRow.map((p, i) => (
          <ProjectCard key={p.id} project={p} priority={i < 2} />
        ))}
      </ContentRow>

      {rows.map(({ category, items }) => (
        <ContentRow
          key={category.id}
          id={category.id}
          title={category.label}
          blurb={category.blurb}
          href={category.id === "games" ? "/games" : undefined}
          hrefLabel={category.id === "games" ? "Games hub" : undefined}
        >
          {items.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </ContentRow>
      ))}

      <ContentRow id="recent" title="Recently Updated">
        {recentlyUpdated().map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </ContentRow>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="text-xs font-bold uppercase tracking-[.35em] text-[#D71920]">Behind the builds</p>
          <h2 className="geist mt-4 max-w-3xl text-4xl font-black leading-[.95] tracking-[-.06em] md:text-5xl">
            Want the reasoning and the numbers?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#C7B9B9]">
            The case studies break down the brief, the page architecture, the search structure and the measured results behind each build.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work" className="rounded-full bg-[#D71920] px-6 py-3 font-bold">Read the case studies →</Link>
            <a href="https://stillawake.studio/start" className="rounded-full border border-white/15 px-6 py-3 font-bold text-[#C7B9B9] hover:text-white">
              Start a project →
            </a>
          </div>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
