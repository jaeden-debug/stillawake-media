import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import {
  getPublishedByRouteConfirmed,
  getRedirects,
  getSiblingOf,
} from "@/lib/cms/adapter";
import { fetchDraftByRoute } from "@/lib/cms/draft";
import { SectionRenderer } from "@/lib/cms/render";
import { DraftBanner, DraftUnavailable } from "@/components/cms-article";
import type { CmsContentType, CmsLocale, CmsPublishedContent } from "@/lib/cms/types";
import { InternalLinks } from "@/components/site";

/**
 * Shared implementation for the last-resort CMS catch-all routes.
 *
 * The repo has no single root layout (two per-locale route groups), so the
 * catch-all lives once per group — `(en)/[...cmsSlug]` and
 * `(fr)/fr/[...cmsSlug]` — both delegating here. Next prefers file/static
 * routes over dynamic catch-alls, so nothing existing is shadowed; only URLs
 * no file route matched arrive. Resolution order:
 *   1. published CMS content for the route (cached miss re-confirmed
 *      uncached before any 404),
 *   2. cms_public_redirects,
 *   3. notFound() → the existing global-not-found.
 */

/** Paths that can never be CMS content: assets, API, files with extensions. */
export function isNonContentPath(path: string): boolean {
  return (
    path.startsWith("/_next") ||
    path.startsWith("/api/") ||
    /\.[a-zA-Z0-9]{1,8}$/.test(path)
  );
}

function schemaTypeFor(type: CmsContentType): "Article" | "Service" | "WebPage" {
  if (type === "article" || type === "case_study") return "Article";
  if (type === "service") return "Service";
  return "WebPage";
}

export async function cmsCatchAllMetadata(path: string, locale: CmsLocale): Promise<Metadata> {
  if (isNonContentPath(path)) return {};

  if ((await draftMode()).isEnabled) {
    const draft = await fetchDraftByRoute(path);
    return { title: draft?.title ?? "Draft Preview", robots: { index: false, follow: false } };
  }

  const item = await getPublishedByRouteConfirmed(path);
  if (!item || item.type === "content_layer") return {};

  const title = item.snapshot.seo?.title || item.snapshot.title;
  const description = item.snapshot.seo?.description || item.snapshot.excerpt || "";
  const url = `${siteUrl}${path}`;
  const sibling = item.translation_group_id
    ? await getSiblingOf(item.translation_group_id, locale === "fr" ? "en" : "fr")
    : null;
  let languages: Record<string, string> | undefined;
  if (sibling?.route_path != null) {
    const enUrl = locale === "fr" ? `${siteUrl}${sibling.route_path}` : url;
    const frUrl = locale === "fr" ? url : `${siteUrl}${sibling.route_path}`;
    languages = { "en-CA": enUrl, "fr-CA": frUrl, "x-default": enUrl };
  }

  return {
    title,
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph: {
      url,
      title,
      description,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
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
    ...(item.snapshot.seo?.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

function GenericCmsPage({
  item,
  path,
  locale,
  isDraft = false,
}: {
  item: Pick<CmsPublishedContent, "type" | "snapshot" | "id"> & { id?: string };
  path: string;
  locale: CmsLocale;
  isDraft?: boolean;
}) {
  const url = `${siteUrl}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": schemaTypeFor(item.type),
    "@id": `${url}#${schemaTypeFor(item.type).toLowerCase()}`,
    name: item.snapshot.title,
    ...(schemaTypeFor(item.type) === "Article" ? { headline: item.snapshot.title } : {}),
    description: item.snapshot.excerpt ?? undefined,
    ...(locale === "fr" ? { inLanguage: "fr-CA" } : {}),
    url,
    mainEntityOfPage: url,
    ...(schemaTypeFor(item.type) === "Service" ? { provider: { "@id": entityIds.organization } } : {}),
    ...(schemaTypeFor(item.type) === "Article"
      ? { author: { "@id": entityIds.organization }, publisher: { "@id": entityIds.organization } }
      : { publisher: { "@id": entityIds.organization } }),
    isPartOf: { "@id": entityIds.website },
  };

  return (
    <main className="pt-28">
      {isDraft ? (
        <DraftBanner locale={locale} />
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <article className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-5xl">
            <h1 className="geist text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
              {item.snapshot.title}
            </h1>
            {item.snapshot.excerpt && (
              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">{item.snapshot.excerpt}</p>
            )}
          </header>

          <div className="mt-16 max-w-4xl">
            <SectionRenderer
              sections={item.snapshot.sections ?? []}
              locale={locale}
              contentId={isDraft ? undefined : item.id}
            />
          </div>
        </div>
      </article>

      <InternalLinks locale={locale} />
    </main>
  );
}

export async function CmsCatchAll({ path, locale }: { path: string; locale: CmsLocale }) {
  if (isNonContentPath(path)) notFound();

  // Draft preview reaches non-article content types through here too.
  if ((await draftMode()).isEnabled) {
    const draft = await fetchDraftByRoute(path);
    if (!draft) return <DraftUnavailable locale={locale} />;
    return (
      <GenericCmsPage
        item={{
          type: draft.type,
          id: draft.id,
          snapshot: {
            title: draft.title,
            excerpt: draft.excerpt,
            sections: draft.sections,
            seo: draft.seo,
            data: draft.data,
            author_id: draft.author_id,
            featured_media_id: draft.featured_media_id,
            slug: draft.slug,
            route_path: draft.route_path ?? path,
          },
        }}
        path={path}
        locale={locale}
        isDraft
      />
    );
  }

  // 1. Published CMS content owns the route.
  const item = await getPublishedByRouteConfirmed(path);
  if (item && item.type !== "content_layer") {
    return <GenericCmsPage item={item} path={path} locale={locale} />;
  }

  // 2. CMS-managed redirect.
  const redirects = await getRedirects();
  const hit = redirects.find((row) => row.from_path === path);
  if (hit && hit.to_path && hit.to_path !== path) {
    if (hit.status_code === 302 || hit.status_code === 307) redirect(hit.to_path);
    permanentRedirect(hit.to_path);
  }

  // 3. Genuinely nothing here → existing global 404.
  notFound();
}
