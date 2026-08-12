import Image from "next/image";
import Link from "next/link";
import { getRelatedFor, getSourcesFor } from "./adapter";
import { ensureHeadingIds, sanitizeRichtext } from "./prose";
import type { CmsLocale, CmsSection, ImageItem } from "./types";

/**
 * Renders the CMS section array to the site's visual language. Server-only.
 *
 * richtext goes through sanitize-html (defence in depth — the writer already
 * sanitizes) and gets heading anchors injected, then renders inside the same
 * `articleProse` styling the markdown pipeline uses.
 */

/** Hosts next/image is configured for (next.config.mjs remotePatterns). */
const OPTIMIZED_IMAGE_HOSTS = new Set([
  "images.unsplash.com",
  "plus.unsplash.com",
  "qzyzdpjvrecplkenrxhe.supabase.co",
]);

function canUseNextImage(url: string): boolean {
  if (url.startsWith("/")) return true;
  try {
    return OPTIMIZED_IMAGE_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

function CmsFigure({ item }: { item: ImageItem }) {
  if (!item.url) return null;
  const attribution = item.attribution;
  const isUnsplash = attribution?.provider === "unsplash";
  // Dimensions are not part of the section contract; use next/image only for
  // hosts the optimizer is configured for, plain <img> otherwise.
  const useNextImage = canUseNextImage(item.url);

  return (
    <figure className="mt-10 overflow-hidden rounded-[2rem] border border-white/10">
      {useNextImage ? (
        <Image
          src={item.url}
          alt={item.alt || ""}
          width={1600}
          height={900}
          className="h-auto w-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.url} alt={item.alt || ""} loading="lazy" className="h-auto w-full object-cover" />
      )}
      {(item.caption || isUnsplash) && (
        <figcaption className="px-6 py-4 text-sm leading-6 text-[#888]">
          {item.caption}
          {isUnsplash && (
            <span className={item.caption ? "ml-2" : undefined}>
              Photo:{" "}
              {attribution?.photographerUrl ? (
                <a
                  href={attribution.photographerUrl}
                  rel="noopener"
                  target="_blank"
                  className="underline decoration-[#D71920] underline-offset-4 hover:text-white"
                >
                  {attribution.photographerName}
                </a>
              ) : (
                attribution?.photographerName
              )}
              {" / "}
              {attribution?.sourceUrl ? (
                <a
                  href={attribution.sourceUrl}
                  rel="noopener"
                  target="_blank"
                  className="underline decoration-[#D71920] underline-offset-4 hover:text-white"
                >
                  Unsplash
                </a>
              ) : (
                "Unsplash"
              )}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function CtaLink({ href, label }: { href: string; label: string }) {
  const className = "mt-8 inline-flex rounded-full bg-black px-6 py-4 font-bold";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label} →
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener" className={className}>
      {label} →
    </a>
  );
}

async function SourcesBlock({
  contentId,
  heading,
  locale,
}: {
  contentId?: string;
  heading?: string;
  locale: CmsLocale;
}) {
  const sources = contentId ? await getSourcesFor(contentId) : [];
  if (sources.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="geist text-3xl font-black tracking-[-0.06em]">
        {heading || "Sources"}
      </h2>
      <ol className="mt-6 grid list-decimal gap-4 pl-6">
        {sources.map((source) => (
          <li key={source.id} className="text-sm leading-6 text-[#C7B9B9]">
            {source.url ? (
              <a
                href={source.url}
                rel="noopener"
                target="_blank"
                className="text-white underline decoration-[#D71920] underline-offset-4"
              >
                {source.title}
              </a>
            ) : (
              <span className="text-white">{source.title}</span>
            )}
            {source.publisher ? ` — ${source.publisher}` : ""}
            {source.accessed_at
              ? ` (${locale === "fr" ? "consulté le" : "accessed"} ${source.accessed_at.slice(0, 10)})`
              : ""}
          </li>
        ))}
      </ol>
    </section>
  );
}

async function RelatedBlock({
  contentId,
  heading,
  limit,
  locale,
}: {
  contentId?: string;
  heading?: string;
  limit?: number;
  locale: CmsLocale;
}) {
  const related = contentId ? await getRelatedFor(contentId, limit ?? 4) : [];
  if (related.length === 0) return null;
  return (
    <section className="mt-16">
      <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
        {heading || (locale === "fr" ? "À lire ensuite" : "Related Reading")}
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {related.map((item) =>
          item.route_path ? (
            <Link
              key={item.id}
              href={item.route_path}
              className="glass rounded-[2rem] p-6 transition hover:border-[#D71920]/60"
            >
              <h3 className="geist text-2xl font-black tracking-[-0.06em]">{item.snapshot.title}</h3>
              {item.snapshot.excerpt && (
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{item.snapshot.excerpt}</p>
              )}
            </Link>
          ) : null,
        )}
      </div>
    </section>
  );
}

function renderSection(section: CmsSection, locale: CmsLocale, contentId?: string) {
  switch (section.type) {
    case "richtext": {
      const { html } = ensureHeadingIds(sanitizeRichtext(section.html));
      return <div className="articleProse" dangerouslySetInnerHTML={{ __html: html }} />;
    }

    case "direct_answer":
      return (
        <div className="mt-10 rounded-[2rem] border-l-4 border-[#D71920] bg-white/[.045] p-6 md:p-8">
          {section.question && (
            <p className="mb-3 text-xs uppercase tracking-[.3em] text-[#D71920]">{section.question}</p>
          )}
          <p className="text-lg leading-8 text-white">
            <strong>{section.answer}</strong>
          </p>
        </div>
      );

    case "key_takeaways":
      return (
        <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[.04] p-6 md:p-8">
          <h2 className="geist text-2xl font-black tracking-[-0.06em]">
            {section.heading || (locale === "fr" ? "À retenir" : "Key Takeaways")}
          </h2>
          <ul className="mt-5 grid gap-3">
            {(section.items ?? []).map((item, index) => (
              <li key={index} className="flex gap-3 text-sm leading-7 text-[#C7B9B9]">
                <span aria-hidden className="mt-[.6rem] h-2 w-2 shrink-0 rounded-full bg-[#D71920]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      );

    case "image":
      return <CmsFigure item={section} />;

    case "gallery":
      return (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {(section.items ?? []).map((item, index) => (
            <CmsFigure key={index} item={item} />
          ))}
        </div>
      );

    case "stats":
      return (
        <section className="mt-12">
          {section.heading && (
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">{section.heading}</h2>
          )}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(section.items ?? []).map((item, index) => (
              <div key={index} className="glass rounded-[2rem] p-6">
                <p className="geist text-4xl font-black tracking-[-0.06em] text-white">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[.2em] text-[#C7B9B9]">{item.label}</p>
                {item.note && <p className="mt-2 text-xs leading-5 text-[#777]">{item.note}</p>}
              </div>
            ))}
          </div>
        </section>
      );

    case "feature_list":
      return (
        <section className="mt-12">
          {section.heading && (
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">{section.heading}</h2>
          )}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {(section.items ?? []).map((item, index) => (
              <div key={index} className="glass rounded-[2rem] p-6">
                <h3 className="geist text-xl font-black tracking-[-0.04em]">{item.title}</h3>
                {item.body && <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{item.body}</p>}
              </div>
            ))}
          </div>
        </section>
      );

    case "steps":
      return (
        <section className="mt-12">
          {section.heading && (
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">{section.heading}</h2>
          )}
          <ol className="mt-6 grid gap-6">
            {(section.items ?? []).map((item, index) => (
              <li key={index} className="flex gap-5">
                <span
                  aria-hidden
                  className="geist flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D71920] font-black"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="geist text-xl font-black tracking-[-0.04em]">{item.title}</h3>
                  {item.body && <p className="mt-2 text-sm leading-7 text-[#C7B9B9]">{item.body}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case "faq":
      return (
        <section className="mt-16">
          <h2 className="geist text-3xl font-black tracking-[-0.06em]">FAQ</h2>
          <div className="mt-6 grid gap-8">
            {(section.items ?? []).map((item, index) => (
              <div key={index}>
                <h3 className="geist text-xl font-black tracking-[-0.04em]">{item.q}</h3>
                <p className="mt-3 text-base leading-8 text-[#C7B9B9]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "comparison_table":
      return (
        <div className="mt-12 overflow-x-auto rounded-[1rem]">
          <table className="w-full border-collapse">
            {section.caption && (
              <caption className="pb-4 text-left text-sm text-[#888]">{section.caption}</caption>
            )}
            <thead>
              <tr>
                {(section.columns ?? []).map((column, index) => (
                  <th
                    key={index}
                    className="border border-white/[.12] bg-white/[.06] p-4 text-left text-white"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(section.rows ?? []).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-white/[.12] p-4 text-[#C7B9B9]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "quote":
      return (
        <blockquote className="my-10 rounded-[1.5rem] border-l-4 border-[#D71920] bg-white/[.045] p-6">
          <p className="text-lg leading-8 text-white">{section.text}</p>
          {(section.cite || section.role) && (
            <cite className="mt-4 block text-sm not-italic text-[#C7B9B9]">
              {section.cite}
              {section.role ? ` — ${section.role}` : ""}
            </cite>
          )}
        </blockquote>
      );

    case "cta":
      return (
        <section className="mt-16 rounded-[3rem] bg-[#D71920] p-8 md:p-12">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-white/70">
            {locale === "fr" ? "Prochaine étape" : "Next Step"}
          </p>
          {section.heading && (
            <h2 className="geist max-w-3xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              {section.heading}
            </h2>
          )}
          {section.body && <p className="mt-6 max-w-2xl text-base leading-8 text-white/85">{section.body}</p>}
          <CtaLink href={section.href} label={section.label} />
        </section>
      );

    case "case_study_proof":
      return (
        <section className="mt-12 rounded-[2rem] border border-[#D71920]/40 bg-white/[.03] p-8 md:p-10">
          <p className="geist text-5xl font-black tracking-[-0.06em] text-[#D71920] md:text-7xl">
            {section.metric}
          </p>
          <p className="mt-3 text-sm uppercase tracking-[.25em] text-white">{section.label}</p>
          {section.evidence && <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{section.evidence}</p>}
        </section>
      );

    case "code":
      return (
        <pre className="mt-10 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#070707] p-6 text-sm leading-7 text-[#C7B9B9]">
          <code data-language={section.language || undefined}>{section.code}</code>
        </pre>
      );

    case "sources":
      return <SourcesBlock contentId={contentId} heading={section.heading} locale={locale} />;

    case "related_content":
      return (
        <RelatedBlock
          contentId={contentId}
          heading={section.heading}
          limit={section.limit}
          locale={locale}
        />
      );

    default:
      // Unknown section type from a newer schema version: skip rather than break.
      return null;
  }
}

export function SectionRenderer({
  sections,
  locale,
  contentId,
}: {
  sections: CmsSection[];
  locale: CmsLocale;
  /** Published content id — powers `sources` and `related_content` sections.
   *  Omitted for drafts (those sections render empty in preview). */
  contentId?: string;
}) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.id}>{renderSection(section, locale, contentId)}</div>
      ))}
    </>
  );
}
