import type { Metadata } from "next";
import { pageTitle } from "@/lib/page-title";
import { OG_IMAGES } from "@/lib/og-image";
import { metaDescription } from "@/lib/meta-description";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PosterArt } from "@/components/media/PosterArt";
import { ProjectCard } from "@/components/our-work/ProjectCard";
import { LivePreview } from "@/components/our-work/LivePreview";
import { InternalLinks } from "@/components/site";
import { entityIds } from "@/data/entities";
import {
  getProject,
  projectCategories,
  projectsWithDetailPage,
  relatedProjects,
} from "@/data/portfolio/projects";
import { JsonLd, breadcrumbList, graph, type Crumb } from "@/lib/game-schema";
import { siteUrl } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

/** Only projects without a canonical home elsewhere get a page here. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projectsWithDetailPage().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = `${siteUrl}/our-work/${project.slug}`;
  const description = `${project.summary} ${project.kind} by StillAwake Media.`.slice(0, 160);
  return {
    title: pageTitle(`${project.title}: ${project.kind}`),
    description,
    alternates: { canonical: `/our-work/${project.slug}` },
    openGraph: {
      title: `${project.title} | StillAwake Media`,
      description,
      url,
      type: "website",
      ...(project.image
        ? { images: [{ url: project.image.src, width: project.image.width, height: project.image.height, alt: project.image.alt }] }
        : { images: OG_IMAGES }),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.canonicalPath) notFound();

  const url = `${siteUrl}/our-work/${project.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Our Work", path: "/our-work" },
    { name: project.title, path: `/our-work/${project.slug}` },
  ];
  const categoryLabels = project.categories.map((c) => projectCategories.find((x) => x.id === c)?.label ?? c);
  const related = relatedProjects(project);

  const work: Record<string, unknown> = {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.title,
    description: metaDescription(project.description.join(" ")),
    url,
    creator: { "@id": entityIds.organization },
    genre: categoryLabels,
    dateModified: project.updated,
  };
  if (project.externalUrl) work.sameAs = [project.externalUrl];
  if (project.image) work.image = `${siteUrl}${project.image.src}`;

  return (
    <main className="pt-24">
      <JsonLd
        data={graph(
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: project.title,
            description: project.summary,
            inLanguage: "en-CA",
            isPartOf: { "@id": entityIds.website },
            publisher: { "@id": entityIds.organization },
            mainEntity: { "@id": `${url}#work` },
          },
          work,
          breadcrumbList(crumbs),
        )}
      />

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.3em]" style={{ color: project.accent }}>
              {categoryLabels.join(" · ")}
            </p>
            <h1 className="geist mt-3 text-5xl font-black leading-[.9] tracking-[-.07em] md:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#C7B9B9]">{project.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Platforms">
              {project.platforms.map((p) => (
                <li key={p} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white">{p}</li>
              ))}
              {project.status !== "live" && (
                <li className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#C7B9B9]">
                  {project.status === "beta" ? "Beta" : "In development"}
                </li>
              )}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener"
                  data-track="portfolio_outbound_click"
                  data-track-project={project.id}
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black"
                >
                  {project.externalLabel ?? "Visit"} ↗
                </a>
              )}
              {project.caseStudyPath && (
                <Link href={project.caseStudyPath} className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                  Read the case study →
                </Link>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <PosterArt
              src={project.image?.src}
              alt={project.image?.alt}
              title={project.title}
              eyebrow={project.kind}
              accent={project.accent}
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              fit={project.image && project.image.width === project.image.height ? "contain" : "cover"}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="geist text-3xl font-black tracking-[-.05em]">Overview</h2>
          <div className="mt-5 space-y-5 text-base leading-8 text-[#C7B9B9]">
            {project.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7">
          <h2 className="text-xs font-bold uppercase tracking-[.3em] text-[#a9a0a0]">At a glance</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-[#8a8a8a]">Type</dt>
              <dd className="mt-0.5 text-white">{project.kind}</dd>
            </div>
            <div>
              <dt className="text-[#8a8a8a]">Platforms</dt>
              <dd className="mt-0.5 text-white">{project.platforms.join(", ")}</dd>
            </div>
            {project.technologies && (
              <div>
                <dt className="text-[#8a8a8a]">Built with</dt>
                <dd className="mt-0.5 text-white">{project.technologies.join(", ")}</dd>
              </div>
            )}
          </dl>
          <h3 className="mt-7 text-xs font-bold uppercase tracking-[.3em] text-[#a9a0a0]">Highlights</h3>
          <ul className="mt-4 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-6 text-[#d8d0d0]">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                {h}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {project.livePreviewUrl && (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6" aria-labelledby="live-preview">
          <h2 id="live-preview" className="geist text-3xl font-black tracking-[-.05em]">Live Preview</h2>
          <p className="mt-2 text-sm text-[#a9a0a0]">The real site, running in a sandboxed frame.</p>
          <div className="mt-6">
            <LivePreview url={project.livePreviewUrl} title={project.title} accent={project.accent} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6" aria-labelledby="related-projects">
          <h2 id="related-projects" className="geist text-3xl font-black tracking-[-.05em]">Related projects</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <Link href="/our-work" className="text-sm font-semibold text-[#C7B9B9] hover:text-white">← Back to Our Work</Link>
      </div>

      <div className="mt-10">
        <InternalLinks />
      </div>
    </main>
  );
}
