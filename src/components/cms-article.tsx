import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { authorJsonLd, jaedenDoody, personAuthorNames } from "@/data/people/jaeden-doody";
import { cmsContentDates } from "@/lib/cms/dates";
import { getAuthor, getPublishedArticles, getRelatedFor } from "@/lib/cms/adapter";
import { estimateReadTime, extractToc } from "@/lib/cms/prose";
import { SectionRenderer } from "@/lib/cms/render";
import type { CmsDraftItem, CmsLocale, CmsPublishedContent, CmsSection } from "@/lib/cms/types";
import { InternalLinks } from "@/components/site";
import { ArticleLayout } from "@/components/article/ArticleLayout";

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
  const { published, modified } = cmsContentDates(item);
  return {
    contentId: item.id,
    slug: item.slug,
    title: item.snapshot.title,
    excerpt: item.snapshot.excerpt ?? "",
    sections: item.snapshot.sections ?? [],
    category: categoryOf(item.snapshot.data),
    date: published,
    updated: modified,
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
  // Unattributed CMS articles are Jaeden's: he writes everything published here.
  const authorName = author?.name ?? jaedenDoody.name;
  const byJaeden = personAuthorNames.has(authorName);
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
    image: `${siteUrl}/stillawake-media-social-preview.jpeg`,
    author: authorJsonLd(byJaeden),
    publisher: { "@id": entityIds.organization },
    isPartOf: { "@id": entityIds.website },
  };

  const backHref = locale === "fr" ? "/fr/articles" : "/stillawake-times";

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
      <ArticleLayout
        locale={locale}
        backHref={backHref}
        category={view.category}
        title={view.title}
        excerpt={view.excerpt}
        author={authorName}
        byJaeden={byJaeden}
        date={view.date}
        updated={view.updated}
        readTime={readTime}
        toc={toc}
        cta={{
          title:
            locale === "fr"
              ? "Envie d'appliquer ce genre de stratégie à votre entreprise ?"
              : "Want this kind of strategy applied to your business?",
          links: [
            {
              href: locale === "fr" ? "/fr/contact" : "/contact",
              label: locale === "fr" ? "Démarrer mon projet →" : "Start Your Project →",
              primary: true,
            },
            {
              href: locale === "fr" ? "/fr/outils/calculateur-cout-projet" : "/tools/project-cost-calculator",
              label: locale === "fr" ? "Estimer le coût" : "Estimate the cost",
            },
            {
              href: locale === "fr" ? "/fr/tarifs" : "/pricing",
              label: locale === "fr" ? "Voir les tarifs" : "See pricing",
            },
          ],
        }}
        related={related}
      >
        <SectionRenderer sections={view.sections} locale={locale} contentId={view.contentId} />
      </ArticleLayout>

      <InternalLinks locale={locale} />
    </main>
  );
}
