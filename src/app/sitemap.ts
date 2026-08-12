import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { siteUrl } from "@/lib/data";

/**
 * Stable per-route lastmod dates.
 *
 * These are edited by hand when a page's content actually changes. Deriving
 * them from `new Date()` re-stamped every static route on every deploy, which
 * told Google the whole site changed each time we shipped an unrelated fix and
 * made the signal worthless.
 */
const pageLastModified: Record<string, string> = {
  "": "2026-05-25",
  about: "2026-05-25",
  portfolio: "2026-08-09",
  services: "2026-08-09",
  "stillawake-times": "2026-05-25",
  contact: "2026-05-25",
  "software-development": "2026-05-25",
  branding: "2026-05-25",
  "local-seo": "2026-05-25",
  "ai-automation": "2026-05-25",
  "framer-development": "2026-08-09",
  "shopify-development": "2026-08-09",
  work: "2026-08-09",
  "founder/jaeden-doody": "2026-08-10",
  "web-design-montreal": "2026-05-25",
  "fr/agence-web-montreal": "2026-05-25",
  "seo-montreal": "2026-08-12",
  "website-maintenance": "2026-08-12",
  "answer-engine-optimization": "2026-08-12",
  pricing: "2026-08-12",
  "fr/agence-seo-montreal": "2026-08-12",
  "fr/maintenance-site-web": "2026-08-12",
  "fr/referencement-ia": "2026-08-12",
  "fr/developpement-shopify": "2026-08-12",
  "fr/tarifs": "2026-08-12",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.entries(pageLastModified).map(([page, lastModified]) => ({
    url: page ? `${siteUrl}/${page}` : `${siteUrl}/`,
    lastModified: new Date(lastModified),
  }));

  const articles = getAllPosts().map((post) => ({
    url: `${siteUrl}/stillawake-times/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...pages, ...articles];
}
