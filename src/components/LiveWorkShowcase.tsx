import Link from "next/link";
import { ProjectCard } from "@/components/our-work/ProjectCard";
import { projects } from "@/data/portfolio/projects";

/**
 * Homepage teaser for the portfolio.
 *
 * This used to embed two live client sites in iframes on the homepage: heavy,
 * outside our performance budget, and blank whenever a site refused framing.
 * It now shows the featured project cards from the portfolio registry; the
 * live previews still exist, one click deeper, on each project page.
 */
export default function LiveWorkShowcase({ locale = "en" }: { locale?: "en" | "fr" } = {}) {
  const fr = locale === "fr";
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="px-6 pb-32 pt-6 md:pb-40 md:pt-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-[#070707] p-5 shadow-2xl md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%),radial-gradient(circle_at_10%_100%,rgba(255,255,255,.08),transparent_35%)]" />

        <div className="relative z-10 mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[.35em] text-[#D71920]">{fr ? "Aperçu du portfolio" : "Our Work"}</p>
            <h2 className="geist mt-4 text-5xl font-black leading-[.9] tracking-[-0.06em] md:text-7xl">
              {fr ? <>Des projets réels <br /> que nous avons bâtis.</> : <>Real work <br /> we have shipped.</>}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#C7B9B9] md:text-lg">
              {fr
                ? "Sites web, applications, plateformes ecommerce, projets SEO et jeux réalisés par StillAwake Media."
                : "Websites, apps, ecommerce platforms, SEO projects and games built by StillAwake Media."}
            </p>
          </div>

          <Link
            href={fr ? "/fr/realisations" : "/our-work"}
            className="glass inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/70 px-5 py-3 text-sm font-medium text-[#C7B9B9] transition hover:text-white"
          >
            {fr ? "Voir toutes les réalisations" : "See all our work"}{" "}
            <span className="grid size-7 place-items-center rounded-full bg-[#D71920] text-white">→</span>
          </Link>
        </div>

        <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
