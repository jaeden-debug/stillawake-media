import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { jaedenDoody, personAuthorNames } from "@/data/people/jaeden-doody";
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
      title: draft?.title ?? "Aperçu du brouillon",
      robots: { index: false, follow: false },
    };
  }

  const cms = await getPublishedByTypeSlugConfirmed("article", "fr", slug);
  if (cms) {
    const title = cms.snapshot.seo?.title || cms.snapshot.title;
    const description = cms.snapshot.seo?.description || cms.snapshot.excerpt || "";
    const url = `${siteUrl}/fr/articles/${cms.slug}`;
    const sibling = cms.translation_group_id
      ? await getSiblingOf(cms.translation_group_id, "en")
      : null;
    const languages =
      sibling?.route_path != null
        ? {
            "en-CA": `${siteUrl}${sibling.route_path}`,
            "fr-CA": url,
            "x-default": `${siteUrl}${sibling.route_path}`,
          }
        : undefined;

    return {
      title,
      description,
      authors: [{ name: "StillAwake Media", url: siteUrl }],
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
          { url: "/stillawake-media-social-preview.jpeg", width: 1200, height: 630, alt: title },
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
    title: post.title,
    description: post.excerpt,
    // No `languages` block: these articles are written for Québec and most have
    // no English counterpart, so declaring a bogus en-CA alternate would be
    // worse than declaring none. Pairs get added per-article once both exist.
    alternates: { canonical: `/fr/articles/${post.slug}` },
    openGraph: {
      url,
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "fr_CA",
      images: [
        { url: "/stillawake-media-social-preview.jpeg", width: 1200, height: 630, alt: post.title },
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
  const authorId = byJaeden ? jaedenDoody.id : entityIds.organization;
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
    author: { "@id": authorId },
    publisher: { "@id": entityIds.organization },
    isPartOf: { "@id": entityIds.website },
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Link href="/fr/articles" className="text-sm text-[#C7B9B9] hover:text-white">
            ← Retour aux articles
          </Link>

          <header className="mt-10 max-w-5xl">
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">{post.category}</p>
            <h1 className="geist text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
              {post.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">{post.excerpt}</p>
            <p className="mt-6 text-xs uppercase tracking-[.25em] text-[#666]">
              {byJaeden ? (
                <Link href="/fr/fondateur/jaeden-doody" className="underline decoration-[#D71920] underline-offset-4 hover:text-white">
                  Par {post.author}
                </Link>
              ) : (
                post.author
              )}{" "}
              · {post.date}
              {post.updated ? ` · Mis à jour le ${post.updated}` : ""} · {post.readTime}
            </p>
          </header>

          <div className="mt-16 grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside>
              <div className="rounded-[2rem] border border-white/10 bg-white/[.04] p-5 backdrop-blur-xl lg:sticky lg:top-28">
                <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">Plan de l&apos;article</p>
                <nav className="grid max-h-[340px] gap-3 overflow-y-auto pr-1">
                  {post.toc.slice(0, 14).map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`text-sm text-[#C7B9B9] transition hover:text-white ${item.level === 3 ? "pl-3 text-[13px]" : ""}`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div
              className="article-body max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>

          {related.length > 0 && (
            <section className="mt-24">
              <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">À lire ensuite</p>
              <div className="grid gap-5 md:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/fr/articles/${item.slug}`}
                    className="glass rounded-[2rem] p-6 transition hover:border-[#D71920]/60"
                  >
                    <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">{item.category}</p>
                    <h3 className="geist mt-4 text-2xl font-black tracking-[-0.06em]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-20 rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
            <h2 className="geist max-w-3xl text-3xl font-black leading-[.95] tracking-[-0.06em] md:text-5xl">
              Besoin que ce soit fait, pas seulement expliqué ?
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#C7B9B9]">
              StillAwake Media bâtit des sites, des systèmes SEO et des logiciels
              pour les entreprises québécoises — avec des tarifs affichés.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/fr/contact" className="rounded-full bg-[#D71920] px-6 py-4 font-bold">
                Démarrer un projet →
              </Link>
              <Link href="/fr/tarifs" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
                Voir les tarifs →
              </Link>
            </div>
          </section>
        </div>
      </article>

      <InternalLinks locale="fr" />
    </main>
  );
}
