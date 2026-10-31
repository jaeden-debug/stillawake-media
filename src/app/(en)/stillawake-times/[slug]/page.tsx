import type { Metadata } from "next";
import { pageTitle } from "@/lib/page-title";
import { metaDescription } from "@/lib/meta-description";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { articleAuthors, authorJsonLd, personAuthorNames } from "@/data/people/jaeden-doody";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { getPublishedByTypeSlugConfirmed, getSiblingOf, redirectFor } from "@/lib/cms/adapter";
import { fetchDraftByRoute } from "@/lib/cms/draft";
import {
  CmsArticle,
  DraftUnavailable,
  viewFromDraft,
  viewFromPublished,
} from "@/components/cms-article";
import { InternalLinks } from "@/components/site";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { GameSpotlight } from "@/components/games/GameSpotlight";
import { getBundle } from "@/lib/games";

type Props = {
  params: Promise<{ slug: string }>;
};

/** ISR: CMS-published articles appear without a redeploy (§65–68). The
 *  markdown fallback path renders identically to the previous fully-static
 *  output — only the caching mode changed. */
export const revalidate = 300;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Draft preview: per-visitor cookie, never indexable.
  if ((await draftMode()).isEnabled) {
    const draft = await fetchDraftByRoute(`/stillawake-times/${slug}`);
    return {
      title: pageTitle(draft?.title ?? "Draft Preview"),
      robots: { index: false, follow: false },
    };
  }

  // CMS-published wins over the markdown file (dual-read, CMS first).
  const cms = await getPublishedByTypeSlugConfirmed("article", "en", slug);
  if (cms) {
    const title = cms.snapshot.seo?.title || cms.snapshot.title;
    // Narrowed for the SERP only. The excerpt and seo.description are sized
    // for the page and the card, and ran past 300 characters on some articles.
    const description = metaDescription(
      cms.snapshot.seo?.description || cms.snapshot.excerpt || "",
    );
    const url = `${siteUrl}/stillawake-times/${cms.slug}`;
    const sibling = cms.translation_group_id
      ? await getSiblingOf(cms.translation_group_id, "fr")
      : null;
    /**
     * Pairing precedence: a CMS translation sibling wins, because that is the
     * writer's own model. When there is none — the common case for articles
     * that predate the CMS — the markdown `pair` declaration is honoured, so a
     * genuine counterpart is not silently unpaired just because the row moved
     * into the CMS.
     */
    const filePost = await getPostBySlug(slug);
    const filePair = filePost?.pair;
    const languages =
      sibling?.route_path != null
        ? {
            "en-CA": url,
            "fr-CA": `${siteUrl}${sibling.route_path}`,
            "x-default": url,
          }
        : filePair
          ? {
              "en-CA": url,
              "fr-CA": `${siteUrl}/fr/articles/${filePair}`,
              "x-default": url,
            }
          : undefined;

    return {
      title: pageTitle(title),
      description,
      authors: articleAuthors(filePost?.author),
      alternates: {
        canonical: `/stillawake-times/${cms.slug}`,
        ...(languages ? { languages } : {}),
      },
      openGraph: {
        url,
        title,
        description,
        images: [
          {
            url: "/stillawake-media-social-preview.jpeg",
            width: 1200,
            height: 655,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/stillawake-media-social-preview.jpeg"],
      },
      ...(cms.snapshot.seo?.noindex ? { robots: { index: false, follow: false } } : {}),
    };
  }

  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: pageTitle(post.title),
    description: metaDescription(post.excerpt),
    authors: articleAuthors(post.author),
    alternates: {
      canonical: `/stillawake-times/${post.slug}`,
      // Only articles that name a counterpart get alternates. Declaring an
      // en/fr pair that does not point back is worse than declaring none.
      ...(post.pair
        ? {
            languages: {
              "en-CA": `${siteUrl}/stillawake-times/${post.slug}`,
              "fr-CA": `${siteUrl}/fr/articles/${post.pair}`,
              "x-default": `${siteUrl}/stillawake-times/${post.slug}`,
            },
          }
        : {}),
    },
    openGraph: {
      url: `/stillawake-times/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [
        post.ogImage
          ? { url: post.ogImage, alt: post.title }
          : { url: "/stillawake-media-social-preview.jpeg", width: 1200, height: 655, alt: post.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage ?? "/stillawake-media-social-preview.jpeg"],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  // Draft preview (§54): server-to-server fetch from the .dev writer, rendered
  // through the same components with a fixed DRAFT PREVIEW banner.
  if ((await draftMode()).isEnabled) {
    const draft = await fetchDraftByRoute(`/stillawake-times/${slug}`);
    if (!draft) return <DraftUnavailable locale="en" />;
    return <CmsArticle view={viewFromDraft(draft)} locale="en" isDraft />;
  }

  // Dual-read (§65–68): CMS-published first; a cached miss is confirmed with a
  // direct query before falling back to the markdown file.
  const cms = await getPublishedByTypeSlugConfirmed("article", "en", slug);
  if (cms) {
    return <CmsArticle view={viewFromPublished(cms)} locale="en" />;
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    // Slug changes in the CMS auto-create 301s; this file route owns the
    // /stillawake-times namespace, so the redirect table must be consulted
    // here — the last-resort catch-all never sees these paths.
    const target = await redirectFor(`/stillawake-times/${slug}`);
    if (target) {
      if (target.status_code === 301 || target.status_code === 308) permanentRedirect(target.to_path);
      redirect(target.to_path);
    }
    notFound();
  }

  const related = getRelatedPosts(post.slug, post.category, 4);

  /**
   * Article authorship resolves to a canonical entity @id rather than a bare
   * string. Posts crediting Jaeden by name attach to his Person entity;
   * everything else attaches to the StillAwake Media Organization, which is
   * what the frontmatter of every current post declares. Authorship is never
   * reassigned implicitly — a post is authored by whoever the frontmatter says.
   */
  const byJaeden = personAuthorNames.has(post.author);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteUrl}/stillawake-times/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: `${siteUrl}/stillawake-times/${post.slug}`,
    image: post.ogImage ? new URL(post.ogImage, siteUrl).href : `${siteUrl}/stillawake-media-social-preview.jpeg`,
    author: authorJsonLd(byJaeden),
    publisher: { "@id": entityIds.organization },
    isPartOf: { "@id": entityIds.website },
  };

  const faqSchema =
    post.faq.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${siteUrl}/stillawake-times/${post.slug}#faq`,
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  const howToSchema = post.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${siteUrl}/stillawake-times/${post.slug}#howto`,
        name: post.howTo.name,
        isPartOf: { "@id": `${siteUrl}/stillawake-times/${post.slug}#article` },
        step: post.howTo.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/stillawake-times/${post.slug}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "StillAwake Times", item: `${siteUrl}/stillawake-times` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/stillawake-times/${post.slug}` },
    ],
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {howToSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      ) : null}
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <ArticleLayout
        spotlight={(() => {
          const game = post.game ? getBundle(post.game)?.game : undefined;
          return game ? <GameSpotlight game={game} locale="en" placement="article" /> : null;
        })()}
        locale="en"
        backHref="/stillawake-times"
        category={post.category}
        title={post.title}
        excerpt={post.excerpt}
        author={post.author}
        byJaeden={byJaeden}
        date={post.date}
        updated={post.updated}
        readTime={post.readTime}
        toc={post.toc}
        cta={{
          title: "Want this kind of strategy applied to your business?",
          links: [
            { href: "https://stillawake.studio/start", label: "Start Your Project →", primary: true },
            { href: "/tools/project-cost-calculator", label: "Estimate the cost" },
            { href: "/pricing", label: "See pricing" },
          ],
        }}
        related={related.map((item) => ({
          href: `/stillawake-times/${item.slug}`,
          category: item.category,
          title: item.title,
          excerpt: item.excerpt,
        }))}
      >
        <div className="articleProse" dangerouslySetInnerHTML={{ __html: post.html }} />
      </ArticleLayout>

      <InternalLinks />
    </main>
  );
}
