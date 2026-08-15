import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InlinePageSchema } from "@/components/page-schema";
import { PlatformGuideView } from "@/components/tools/platform-guide";
import { getPublishedGuide, publishedGuides } from "@/data/llms-txt-guides";
import { siteUrl } from "@/lib/data";

/**
 * Platform implementation guides.
 *
 * Routes come from `publishedGuides()`, which excludes drafts and anything
 * failing the evidence schema — so a half-finished record cannot become a URL
 * even by accident. Anything not in that list 404s rather than rendering a
 * thin page.
 */

export function generateStaticParams() {
  return publishedGuides("en").map((guide) => ({ platform: guide.slug }));
}

/** Nothing outside the published set exists. */
export const dynamicParams = false;

type Props = { params: Promise<{ platform: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const guide = getPublishedGuide(platform, "en");
  if (!guide) return {};

  const url = `${siteUrl}/tools/llms-txt/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url, languages: { "en-CA": url, "x-default": url } },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article",
      modifiedTime: guide.verifiedDate,
    },
  };
}

export default async function PlatformGuidePage({ params }: Props) {
  const { platform } = await params;
  const guide = getPublishedGuide(platform, "en");
  if (!guide) notFound();

  return (
    <>
      <InlinePageSchema
        input={{
          kind: "article",
          url: `${siteUrl}/tools/llms-txt/${guide.slug}`,
          name: guide.title,
          description: guide.description,
          locale: "en",
          dateModified: guide.verifiedDate,
          crumbs: [
            { name: "Tools", path: "/tools" },
            { name: "llms.txt generator", path: "/tools/llms-txt-generator" },
          ],
        }}
      />
      <PlatformGuideView guide={guide} />
    </>
  );
}
