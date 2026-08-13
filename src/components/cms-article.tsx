import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { jaedenDoody, personAuthorNames } from "@/data/people/jaeden-doody";
import { getAuthor, getPublishedArticles, getRelatedFor } from "@/lib/cms/adapter";
import { estimateReadTime, extractToc } from "@/lib/cms/prose";
import { SectionRenderer } from "@/lib/cms/render";
import type { CmsDraftItem, CmsLocale, CmsPublishedContent, CmsSection } from "@/lib/cms/types";
import { InternalLinks } from "@/components/site";

/**
 * CMS-backed article page body. Reproduces the EXACT existing markdown article
 * layout per locale (category eyebrow, H1, dek, byline, sticky TOC, prose
 * body, CTA, related grid, InternalLinks) so a reader cannot tell whether an
 * article came from a .md file or from the CMS.
 */

type ArticleView = {
  contentId?: string;
  slug: string;
  title: string;
  excerpt: string;
  sections: CmsSection[];
  category: string;
  date: string;
  updated?: string;
  authorId: string | null;
};

function categoryOf(data: Record<string, unknown> | null | undefined): string {
  const category = data?.category;
  return typeof category === "string" && category ? category : "Strategy";
}

export function viewFromPublished(item: CmsPublishedContent): ArticleView {
  const firstPublished = (item.first_published_at ?? item.publish_at ?? item.published_at ?? "").slice(0, 10);
  const lastPublished = (item.published_at ?? "").slice(0, 10);
  return {
    contentId: item.id,
    slug: item.slug,
    title: item.snapshot.title,
    excerpt: item.snapshot.excerpt ?? "",
    sections: item.snapshot.sections ?? [],
    category: categoryOf(item.snapshot.data),
    date: firstPublished || lastPublished,
    updated: lastPublished && lastPublished !== firstPublished ? lastPublished : undefined,
    authorId: item.snapshot.author_id ?? item.author_id,
  };
}

export function viewFromDraft(item: CmsDraftItem): ArticleView {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? "",
    sections: item.sections ?? [],
    category: categoryOf(item.data),
    date: new Date().toISOString().slice(0, 10),
    authorId: item.author_id,
  };
}

export function DraftBanner({ locale }: { locale: CmsLocale }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-4 bg-amber-400 px-6 py-2 text-sm font-bold text-black">
      <span>{locale === "fr" ? "APERÇU DU BROUILLON" : "DRAFT PREVIEW"}</span>
      {/* Route handler, not a page — must be a full request so the draft
          cookie is cleared server-side. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/cms/preview/exit" className="underline underline-offset-4">
        {locale === "fr" ? "Quitter l'aperçu" : "Exit preview"}
      </a>
    </div>
  );
}

export function DraftUnavailable({ locale }: { locale: CmsLocale }) {
  return (
    <main className="pt-28">
      <DraftBanner locale={locale} />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-amber-400/50 bg-amber-400/10 p-10">
            <h1 className="geist text-3xl font-black tracking-[-0.06em]">
              {locale === "fr" ? "Brouillon indisponible" : "Draft unavailable"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#C7B9B9]">
              {locale === "fr"
                ? "Le contenu du brouillon n'a pas pu être chargé depuis le CMS. Réessayez, ou quittez l'aperçu."
                : "The draft content could not be loaded from the CMS. Try again, or exit preview."}
            </p>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/cms/preview/exit" className="mt-8 inline-flex rounded-full bg-[#D71920] px-6 py-4 font-bold">
              {locale === "fr" ? "Quitter l'aperçu →" : "Exit preview →"}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

type RelatedCard = { href: string; title: string; excerpt: string; category: string };

async function relatedCards(view: ArticleView, locale: CmsLocale): Promise<RelatedCard[]> {
  const basePath = locale === "fr" ? "/fr/articles" : "/stillawake-times";
  let related: CmsPublishedContent[] = [];
  if (view.contentId) {
    related = await getRelatedFor(view.contentId, 4);
  }
  if (related.length === 0) {
    // Fall back to same-category CMS articles, then any other CMS article.
    const all = (await getPublishedArticles(locale)).filter((item) => item.slug !== view.slug);
    const sameCategory = all.filter((item) => categoryOf(item.snapshot.data) === view.category);
    const rest = all.filter((item) => categoryOf(item.snapshot.data) !== view.category);
    related = [...sameCategory, ...rest].slice(0, 4);
  }
  return related.map((item) => ({
    href: item.route_path ?? `${basePath}/${item.slug}`,
    title: item.snapshot.title,
    excerpt: item.snapshot.excerpt ?? "",
    category: categoryOf(item.snapshot.data),
  }));
}

export async function CmsArticle({
  view,
  locale,
  isDraft = false,
}: {
  view: ArticleView;
  locale: CmsLocale;
  isDraft?: boolean;
}) {
  const author = view.authorId ? await getAuthor(view.authorId) : null;
  const authorName = author?.name ?? "StillAwake Media";
  const byJaeden = personAuthorNames.has(authorName);
  const authorEntityId = byJaeden ? jaedenDoody.id : entityIds.organization;
  const founderPath = locale === "fr" ? "/fr/fondateur/jaeden-doody" : jaedenDoody.path;
  const readTime = estimateReadTime(view.sections, locale);
  const toc = extractToc(view.sections);
  const url =
    locale === "fr"
      ? `${siteUrl}/fr/articles/${view.slug}`
      : `${siteUrl}/stillawake-times/${view.slug}`;
  const related = isDraft ? [] : await relatedCards(view, locale);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: view.title,
    description: view.excerpt,
    datePublished: view.date,
    dateModified: view.updated || view.date,
    ...(locale === "fr" ? { inLanguage: "fr-CA" } : {}),
    mainEntityOfPage: url,
    author: { "@id": authorEntityId },
    publisher: { "@id": entityIds.organization },
    isPartOf: { "@id": entityIds.website },
  };

  const backHref = locale === "fr" ? "/fr/articles" : "/stillawake-times";
  const backLabel = locale === "fr" ? "← Retour aux articles" : "← Back to StillAwake Times";

  return (
    <main className="pt-28">
      {isDraft ? (
        <DraftBanner locale={locale} />
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <article className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Link href={backHref} className="text-sm text-[#C7B9B9] hover:text-white">
            {backLabel}
          </Link>

          <header className="mt-10 max-w-5xl">
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">{view.category}</p>
            <h1 className="geist text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
              {view.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">{view.excerpt}</p>
            <p className="mt-6 text-xs uppercase tracking-[.25em] text-[#666]">
              {byJaeden ? (
                <Link
                  href={founderPath}
                  className="underline decoration-[#D71920] underline-offset-4 hover:text-white"
                >
                  {locale === "fr" ? "Par" : "By"} {authorName}
                </Link>
              ) : (
                authorName
              )}{" "}
              · {view.date}
              {view.updated
                ? locale === "fr"
                  ? ` · Mis à jour le ${view.updated}`
                  : ` · Updated ${view.updated}`
                : ""}{" "}
              · {readTime}
            </p>
          </header>

          <div className="mt-16 grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="block lg:block">
              <div className="rounded-[2rem] border border-white/10 bg-white/[.04] p-5 backdrop-blur-xl lg:sticky lg:top-28">
                <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                  {locale === "fr" ? "Plan de l'article" : "Article Map"}
                </p>
                <nav className="grid max-h-[340px] gap-3 overflow-y-auto pr-1">
                  {toc.slice(0, 14).map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`text-sm leading-5 text-[#C7B9B9] transition hover:text-white ${
                        item.level === 3 ? "pl-4 text-xs text-[#777]" : ""
                      }`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div>
              <SectionRenderer sections={view.sections} locale={locale} contentId={view.contentId} />

              <section className="mt-16 rounded-[3rem] bg-[#D71920] p-8 md:p-12">
                <p className="mb-4 text-sm uppercase tracking-[.35em] text-white/70">
                  {locale === "fr" ? "Prochaine étape" : "Next Step"}
                </p>
                <h2 className="geist max-w-3xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
                  {locale === "fr"
                    ? "Envie d'appliquer ce genre de stratégie à votre entreprise ?"
                    : "Want this kind of strategy applied to your business?"}
                </h2>
                <Link
                  href={locale === "fr" ? "/fr/contact" : "/contact"}
                  className="mt-8 inline-flex rounded-full bg-black px-6 py-4 font-bold"
                >
                  {locale === "fr" ? "Démarrer mon projet →" : "Start Your Project →"}
                </Link>
              </section>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
              {locale === "fr" ? "À lire ensuite" : "Related Reading"}
            </p>
            <h2 className="geist text-4xl font-black tracking-[-0.06em] md:text-6xl">
              {locale === "fr" ? "Continuez à bâtir le système." : "Keep building the system."}
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="glass rounded-[2rem] p-6 transition hover:border-[#D71920]/60"
                >
                  <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">{item.category}</p>
                  <h3 className="geist mt-4 text-2xl font-black tracking-[-0.06em]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#C7B9B9]">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <InternalLinks locale={locale} />
    </main>
  );
}
