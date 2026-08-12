import type { Metadata } from "next";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { jaedenDoody, personAuthorNames } from "@/data/people/jaeden-doody";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { getPublishedByTypeSlugConfirmed, getSiblingOf } from "@/lib/cms/adapter";
import { fetchDraftByRoute } from "@/lib/cms/draft";
import {
  CmsArticle,
  DraftUnavailable,
  viewFromDraft,
  viewFromPublished,
} from "@/components/cms-article";
import { InternalLinks } from "@/components/site";

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
      title: draft?.title ?? "Draft Preview",
      robots: { index: false, follow: false },
    };
  }

  // CMS-published wins over the markdown file (dual-read, CMS first).
  const cms = await getPublishedByTypeSlugConfirmed("article", "en", slug);
  if (cms) {
    const title = cms.snapshot.seo?.title || cms.snapshot.title;
    const description = cms.snapshot.seo?.description || cms.snapshot.excerpt || "";
    const url = `${siteUrl}/stillawake-times/${cms.slug}`;
    const sibling = cms.translation_group_id
      ? await getSiblingOf(cms.translation_group_id, "fr")
      : null;
    const languages =
      sibling?.route_path != null
        ? {
            "en-CA": url,
            "fr-CA": `${siteUrl}${sibling.route_path}`,
            "x-default": url,
          }
        : undefined;

    return {
      title,
      description,
      authors: [{ name: "StillAwake Media", url: siteUrl }],
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
            height: 630,
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
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/stillawake-times/${post.slug}`,
    },
    openGraph: {
      url: `/stillawake-times/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: "/stillawake-media-social-preview.jpeg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
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
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 4);

  /**
   * Article authorship resolves to a canonical entity @id rather than a bare
   * string. Posts crediting Jaeden by name attach to his Person entity;
   * everything else attaches to the StillAwake Media Organization, which is
   * what the frontmatter of every current post declares. Authorship is never
   * reassigned implicitly — a post is authored by whoever the frontmatter says.
   */
  const byJaeden = personAuthorNames.has(post.author);
  const authorId = byJaeden ? jaedenDoody.id : entityIds.organization;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteUrl}/stillawake-times/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: `${siteUrl}/stillawake-times/${post.slug}`,
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
          <Link href="/stillawake-times" className="text-sm text-[#C7B9B9] hover:text-white">
            ← Back to StillAwake Times
          </Link>

          <header className="mt-10 max-w-5xl">
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">{post.category}</p>
            <h1 className="geist text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
              {post.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">{post.excerpt}</p>
            <p className="mt-6 text-xs uppercase tracking-[.25em] text-[#666]">
              {byJaeden ? (
                <Link href={jaedenDoody.path} className="underline decoration-[#D71920] underline-offset-4 hover:text-white">
                  By {post.author}
                </Link>
              ) : (
                post.author
              )}{" "}
              · {post.date}
              {post.updated ? ` · Updated ${post.updated}` : ""} · {post.readTime}
            </p>
          </header>

          <div className="mt-16 grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="block lg:block">
              <div className="rounded-[2rem] border border-white/10 bg-white/[.04] p-5 backdrop-blur-xl lg:sticky lg:top-28">
                <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">Article Map</p>
                <nav className="grid max-h-[340px] gap-3 overflow-y-auto pr-1">
                  {post.toc.slice(0, 14).map((item) => (
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
              <div className="articleProse" dangerouslySetInnerHTML={{ __html: post.html }} />

              <section className="mt-16 rounded-[3rem] bg-[#D71920] p-8 md:p-12">
                <p className="mb-4 text-sm uppercase tracking-[.35em] text-white/70">Next Step</p>
                <h2 className="geist max-w-3xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
                  Want this kind of strategy applied to your business?
                </h2>
                <Link href="/contact" className="mt-8 inline-flex rounded-full bg-black px-6 py-4 font-bold">
                  Get a Free Audit →
                </Link>
              </section>
            </div>
          </div>
        </div>
      </article>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Related Reading</p>
          <h2 className="geist text-4xl font-black tracking-[-0.06em] md:text-6xl">Keep building the system.</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/stillawake-times/${item.slug}`} className="glass rounded-[2rem] p-6 transition hover:border-[#D71920]/60">
                <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">{item.category}</p>
                <h3 className="geist mt-4 text-2xl font-black tracking-[-0.06em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#C7B9B9]">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
