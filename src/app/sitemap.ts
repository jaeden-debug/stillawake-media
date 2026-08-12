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
  "fr/agence-web-montreal": "2026-08-12",
  "seo-montreal": "2026-08-12",
  "website-maintenance": "2026-08-12",
  "answer-engine-optimization": "2026-08-12",
  pricing: "2026-08-12",
  "fr/agence-seo-montreal": "2026-08-12",
  "fr/maintenance-site-web": "2026-08-12",
  "fr/referencement-ia": "2026-08-12",
  "fr/developpement-shopify": "2026-08-12",
  "fr/tarifs": "2026-08-12",
  fr: "2026-08-12",
  "fr/contact": "2026-08-12",
  "website-cost-canada": "2026-08-12",
  "fr/prix-site-web-quebec": "2026-08-12",
  "website-redesign": "2026-08-12",
  "fr/refonte-site-web": "2026-08-12",
  "shopify-vs-woocommerce": "2026-08-12",
  "fr/shopify-vs-woocommerce": "2026-08-12",
  "fr/developpement-logiciel": "2026-08-12",
  "fr/image-de-marque": "2026-08-12",
  "fr/automatisation-ia": "2026-08-12",
  "fr/referencement-local": "2026-08-12",
  "fr/developpement-framer": "2026-08-12",
  "work/lisa-travel-design": "2026-08-12",
  "fr/etude-de-cas-lisa-travel-design": "2026-08-12",
  "work/bankdemark": "2026-08-12",
  "fr/etude-de-cas-bankdemark": "2026-08-12",
  "work/stalkr-navtrl": "2026-08-12",
  "fr/etude-de-cas-stalkr-navtrl": "2026-08-12",
};

/** EN ↔ FR pairs — surfaces hreflang directly in the sitemap so both
 *  languages are discovered together (mirrors the on-page alternates). */
const languagePairs: Record<string, string> = {
  "": "fr",
  contact: "fr/contact",
  pricing: "fr/tarifs",
  "seo-montreal": "fr/agence-seo-montreal",
  "website-maintenance": "fr/maintenance-site-web",
  "answer-engine-optimization": "fr/referencement-ia",
  "shopify-development": "fr/developpement-shopify",
  "web-design-montreal": "fr/agence-web-montreal",
  "website-cost-canada": "fr/prix-site-web-quebec",
  "website-redesign": "fr/refonte-site-web",
  "shopify-vs-woocommerce": "fr/shopify-vs-woocommerce",
  "software-development": "fr/developpement-logiciel",
  branding: "fr/image-de-marque",
  "ai-automation": "fr/automatisation-ia",
  "local-seo": "fr/referencement-local",
  "framer-development": "fr/developpement-framer",
  "work/lisa-travel-design": "fr/etude-de-cas-lisa-travel-design",
  "work/bankdemark": "fr/etude-de-cas-bankdemark",
  "work/stalkr-navtrl": "fr/etude-de-cas-stalkr-navtrl",
};
const frToEn = Object.fromEntries(Object.entries(languagePairs).map(([en, fr]) => [fr, en]));

function alternatesFor(page: string) {
  const en = page in languagePairs ? page : frToEn[page] !== undefined ? frToEn[page] : null;
  if (en === null) return undefined;
  const fr = languagePairs[en];
  return {
    languages: {
      "en-CA": en ? `${siteUrl}/${en}` : `${siteUrl}/`,
      "fr-CA": `${siteUrl}/${fr}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.entries(pageLastModified).map(([page, lastModified]) => ({
    url: page ? `${siteUrl}/${page}` : `${siteUrl}/`,
    lastModified: new Date(lastModified),
    alternates: alternatesFor(page),
  }));

  const articles = getAllPosts().map((post) => ({
    url: `${siteUrl}/stillawake-times/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...pages, ...articles];
}
