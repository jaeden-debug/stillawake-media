import type { Metadata } from "next";
import { CmsCatchAll, cmsCatchAllMetadata } from "@/components/cms-page";

/**
 * Last-resort catch-all for unmatched /fr/* URLs — twin of the (en) group's
 * catch-all, but rendered inside the fr-CA root layout. File routes always
 * win over this dynamic segment, so existing pages are never shadowed.
 */

export const revalidate = 300;

type Props = { params: Promise<{ cmsSlug: string[] }> };

function toPath(cmsSlug: string[]): string {
  return `/fr/${cmsSlug.map((part) => decodeURIComponent(part)).join("/")}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cmsSlug } = await params;
  return cmsCatchAllMetadata(toPath(cmsSlug), "fr");
}

export default async function CmsCatchAllPageFr({ params }: Props) {
  const { cmsSlug } = await params;
  return CmsCatchAll({ path: toPath(cmsSlug), locale: "fr" });
}
