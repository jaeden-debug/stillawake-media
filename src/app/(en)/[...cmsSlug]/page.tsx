import type { Metadata } from "next";
import { CmsCatchAll, cmsCatchAllMetadata } from "@/components/cms-page";

/**
 * Last-resort catch-all (English root). Only receives paths no file route
 * matched — Next always prefers static/file routes over a dynamic catch-all.
 * Resolves published CMS content by route, then CMS redirects, then 404.
 * French URLs under /fr/* are caught by the (fr) group's twin so they render
 * with the fr-CA root layout.
 */

export const revalidate = 300;

type Props = { params: Promise<{ cmsSlug: string[] }> };

function toPath(cmsSlug: string[]): string {
  return `/${cmsSlug.map((part) => decodeURIComponent(part)).join("/")}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cmsSlug } = await params;
  return cmsCatchAllMetadata(toPath(cmsSlug), "en");
}

export default async function CmsCatchAllPage({ params }: Props) {
  const { cmsSlug } = await params;
  return CmsCatchAll({ path: toPath(cmsSlug), locale: "en" });
}
