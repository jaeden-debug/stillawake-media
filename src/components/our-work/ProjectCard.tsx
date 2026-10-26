import Link from "next/link";
import { PosterArt } from "@/components/media/PosterArt";
import { projectCategories, projectHref, type Project } from "@/data/portfolio/projects";
import { projectCategoriesFr, projectHrefFr, projectsFr } from "@/data/portfolio/projects-fr";

const statusLabel: Record<"en" | "fr", Record<Project["status"], string | null>> = {
  en: { live: null, beta: "Beta", "in-development": "In development" },
  fr: { live: null, beta: "Bêta", "in-development": "En développement" },
};

export function ProjectCard({
  project,
  priority = false,
  locale = "en",
}: {
  project: Project;
  priority?: boolean;
  locale?: "en" | "fr";
}) {
  const fr = locale === "fr";
  const firstCategory = project.categories[0];
  const categoryLabel = fr
    ? projectCategoriesFr[firstCategory].label
    : projectCategories.find((c) => c.id === firstCategory)?.label;
  const status = statusLabel[locale][project.status];
  const kind = (fr && projectsFr[project.id]?.kind) || project.kind;
  const summary = (fr && projectsFr[project.id]?.summary) || project.summary;
  const target = fr ? projectHrefFr(project) : { href: projectHref(project) };

  const className =
    "group block overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a0a0a] transition duration-300 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-safe:hover:-translate-y-1";

  const body = (
    <>
      <div className="relative">
        <PosterArt
          src={project.image?.src}
          alt={project.image?.alt}
          title={project.title}
          eyebrow={kind}
          accent={project.accent}
          priority={priority}
          fit={project.image && project.image.width === project.image.height ? "contain" : "cover"}
        />
        {status && (
          <span className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-white backdrop-blur">
            {status}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[.25em]" style={{ color: project.accent }}>
          {categoryLabel}
        </p>
        <h3 className="geist mt-1.5 text-xl font-black tracking-[-.04em] text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#C7B9B9]">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={fr ? "Plateformes" : "Platforms"}>
          {project.platforms.map((p) => (
            <li key={p} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-[#C7B9B9]">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if ("external" in target && target.external) {
    return (
      <a
        href={target.href}
        target="_blank"
        rel="noopener"
        data-track="portfolio_outbound_click"
        data-track-project={project.id}
        className={className}
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      href={target.href}
      hrefLang={"lang" in target ? target.lang : undefined}
      data-track="portfolio_card_click"
      data-track-project={project.id}
      className={className}
    >
      {body}
    </Link>
  );
}
