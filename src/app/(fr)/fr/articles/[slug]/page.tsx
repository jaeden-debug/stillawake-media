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

type Props = { params: Promise<{ slug: string }> };

/** ISR: CMS-published articles appear without a redeploy (§65–68). */
export const revalidate = 300;

export async function generateStaticParams() {
  return getAllPosts("fr").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if ((await draftMode()).isEnabled) {
    const draft = await fetchDraftByRoute(`/fr/articles/${slug}`);
    return {
      title: pageTitle(draft?.title ?? "Aperçu du brouillon"),
      robots: { index: false, follow: false },
    };
  }

  const cms = await getPublishedByTypeSlugConfirmed("article", "fr", slug);
  if (cms) {
    const title = cms.snapshot.seo?.title || cms.snapshot.title;
    // Narrowed for the SERP only. The excerpt and seo.description are sized
    // for the page and the card, and ran past 300 characters on some articles.
    const description = metaDescription(
      cms.snapshot.seo?.description || cms.snapshot.excerpt || "",
    );
    const url = `${siteUrl}/fr/articles/${cms.slug}`;
    const sibling = cms.translation_group_id
      ? await getSiblingOf(cms.translation_group_id, "en")
      : null;
    /** Same precedence as the EN route: CMS sibling first, markdown `pair` second. */
    const filePost = await getPostBySlug(slug, "fr");
    const filePair = filePost?.pair;
    const languages =
      sibling?.route_path != null
        ? {
            "en-CA": `${siteUrl}${sibling.route_path}`,
            "fr-CA": url,
            "x-default": `${siteUrl}${sibling.route_path}`,
          }
        : filePair
          ? {
              "en-CA": `${siteUrl}/stillawake-times/${filePair}`,
              "fr-CA": url,
              "x-default": `${siteUrl}/stillawake-times/${filePair}`,
            }
          : undefined;

    return {
      title: pageTitle(title),
      description,
      authors: articleAuthors(filePost?.author),
      alternates: {
        canonical: `/fr/articles/${cms.slug}`,
        ...(languages ? { languages } : {}),
      },
      openGraph: {
        url,
        title,
        description,
        type: "article",
        locale: "fr_CA",
        images: [
          { url: "/stillawake-media-social-preview.jpeg", width: 1200, height: 655, alt: title },
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

  const post = await getPostBySlug(slug, "fr");
  if (!post) return {};

  const url = `${siteUrl}/fr/articles/${post.slug}`;
  return {
    title: pageTitle(post.title),
    description: metaDescription(post.excerpt),
    authors: articleAuthors(post.author),
    // No `languages` block: these articles are written for Québec and most have
    // no English counterpart, so declaring a bogus en-CA alternate would be
    // worse than declaring none. Pairs get added per-article once both exist.
    alternates: {
      canonical: `/fr/articles/${post.slug}`,
      // Québec-native pieces have no English twin and correctly declare
      // nothing; a paired article points both ways.
      ...(post.pair
        ? {
            languages: {
              "fr-CA": `${siteUrl}/fr/articles/${post.slug}`,
              "en-CA": `${siteUrl}/stillawake-times/${post.pair}`,
              "x-default": `${siteUrl}/stillawake-times/${post.pair}`,
            },
          }
        : {}),
    },
    openGraph: {
      url,
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "fr_CA",
      images: [
        { url: "/stillawake-media-social-preview.jpeg", width: 1200, height: 655, alt: post.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/stillawake-media-social-preview.jpeg"],
    },
  };
}

export default async function ArticleFr({ params }: Props) {
  const { slug } = await params;

  // Aperçu de brouillon (§54) : contenu chargé serveur-à-serveur depuis .dev.
  if ((await draftMode()).isEnabled) {
    const draft = await fetchDraftByRoute(`/fr/articles/${slug}`);
    if (!draft) return <DraftUnavailable locale="fr" />;
    return <CmsArticle view={viewFromDraft(draft)} locale="fr" isDraft />;
  }

  // Dual-read (§65–68) : le CMS publié gagne; un miss en cache est confirmé
  // par une requête directe avant de retomber sur le fichier markdown.
  const cms = await getPublishedByTypeSlugConfirmed("article", "fr", slug);
  if (cms) {
    return <CmsArticle view={viewFromPublished(cms)} locale="fr" />;
  }

  const post = await getPostBySlug(slug, "fr");
  if (!post) {
    // Miroir du chemin EN : ce segment appartient à cette route fichier, le
    // catch-all ne voit jamais ses 404 — consulter la table de redirections ici.
    const target = await redirectFor(`/fr/articles/${slug}`);
    if (target) {
      if (target.status_code === 301 || target.status_code === 308) permanentRedirect(target.to_path);
      redirect(target.to_path);
    }
    notFound();
  }

  const related = getRelatedPosts(post.slug, post.category, 4, "fr");
  const byJaeden = personAuthorNames.has(post.author);
  const url = `${siteUrl}/fr/articles/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: "fr-CA",
    mainEntityOfPage: url,
    image: `${siteUrl}/stillawake-media-social-preview.jpeg`,
    author: authorJsonLd(byJaeden),
    publisher: { "@id": entityIds.organization },
    isPartOf: { "@id": entityIds.website },
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleLayout
        locale="fr"
        backHref="/fr/articles"
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
          title: "Besoin que ce soit fait, pas seulement expliqué ?",
          body: "StillAwake Media bâtit des sites, des systèmes SEO et des logiciels pour les entreprises québécoises — avec des tarifs affichés.",
          links: [
            { href: "https://stillawake.studio/fr/demarrer", label: "Démarrer un projet →", primary: true },
            { href: "/fr/outils/calculateur-cout-projet", label: "Estimer le coût →" },
            { href: "/fr/tarifs", label: "Voir les tarifs →" },
          ],
        }}
        related={related.map((item) => ({
          href: `/fr/articles/${item.slug}`,
          category: item.category,
          title: item.title,
          excerpt: item.excerpt,
        }))}
      >
        <div className="articleProse" dangerouslySetInnerHTML={{ __html: post.html }} />
      </ArticleLayout>

      <InternalLinks locale="fr" />
    </main>
  );
}
