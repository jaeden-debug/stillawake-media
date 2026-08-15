import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InlinePageSchema } from "@/components/page-schema";
import { PlatformGuideView } from "@/components/tools/platform-guide";
import { getPublishedGuide, publishedGuides } from "@/data/llms-txt-guides";
import { siteUrl } from "@/lib/data";

/**
 * French platform implementation guides.
 *
 * Same evidence gate as the English cluster: routes come from
 * `publishedGuides("fr")`, so a French record that is still a draft — or that
 * fails the schema — never becomes a URL. Slugs are shared with the English
 * guides, which is what lets the two clusters pair by hreflang.
 */

export function generateStaticParams() {
  return publishedGuides("fr").map((guide) => ({ platform: guide.slug }));
}

/** Nothing outside the published French set exists. */
export const dynamicParams = false;

type Props = { params: Promise<{ platform: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const guide = getPublishedGuide(platform, "fr");
  if (!guide) return {};

  const url = `${siteUrl}/fr/outils/llms-txt/${guide.slug}`;
  // Only claim an English counterpart when one is actually published.
  const en = getPublishedGuide(guide.slug, "en");
  const enUrl = en ? `${siteUrl}/tools/llms-txt/${en.slug}` : null;

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/fr/outils/llms-txt/${guide.slug}`,
      languages: enUrl
        ? { "fr-CA": url, "en-CA": enUrl, "x-default": enUrl }
        : { "fr-CA": url, "x-default": url },
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article",
      locale: "fr_CA",
      modifiedTime: guide.verifiedDate,
    },
  };
}

export default async function GuidePlateformePage({ params }: Props) {
  const { platform } = await params;
  const guide = getPublishedGuide(platform, "fr");
  if (!guide) notFound();

  return (
    <>
      <InlinePageSchema
        input={{
          kind: "article",
          url: `${siteUrl}/fr/outils/llms-txt/${guide.slug}`,
          name: guide.title,
          description: guide.description,
          locale: "fr",
          dateModified: guide.verifiedDate,
          crumbs: [
            { name: "Outils", path: "/fr/outils" },
            { name: "Générateur llms.txt", path: "/fr/outils/generateur-llms-txt" },
          ],
        }}
      />
      <PlatformGuideView guide={guide} />
    </>
  );
}
