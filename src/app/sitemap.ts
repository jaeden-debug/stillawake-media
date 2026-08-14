import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { getAllPublishedForSitemap } from "@/lib/cms/adapter";
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
  "": "2026-08-13",
  about: "2026-08-13",
  portfolio: "2026-08-13",
  global: "2026-08-13",
  services: "2026-08-13",
  "stillawake-times": "2026-08-13",
  contact: "2026-08-13",
  "software-development": "2026-08-13",
  branding: "2026-08-13",
  "local-seo": "2026-08-13",
  "ai-automation": "2026-08-13",
  "framer-development": "2026-08-13",
  "shopify-development": "2026-08-13",
  work: "2026-08-13",
  "founder/jaeden-doody": "2026-08-13",
  "fr/fondateur/jaeden-doody": "2026-08-13",
  "fr/a-propos": "2026-08-13",
  "fr/realisations": "2026-08-13",
  "fr/etudes-de-cas": "2026-08-13",
  "fr/articles": "2026-08-13",
  "web-design-montreal": "2026-08-13",
  "fr/agence-web-montreal": "2026-08-13",
  "seo-montreal": "2026-08-13",
  "website-maintenance": "2026-08-13",
  "answer-engine-optimization": "2026-08-13",
  pricing: "2026-08-13",
  "fr/agence-seo-montreal": "2026-08-13",
  "fr/maintenance-site-web": "2026-08-13",
  "fr/referencement-ia": "2026-08-13",
  "fr/developpement-shopify": "2026-08-13",
  "fr/tarifs": "2026-08-13",
  fr: "2026-08-13",
  "fr/contact": "2026-08-13",
  "website-cost-canada": "2026-08-13",
  "fr/prix-site-web-quebec": "2026-08-13",
  "website-redesign": "2026-08-13",
  "fr/refonte-site-web": "2026-08-13",
  "shopify-vs-woocommerce": "2026-08-13",
  "fr/shopify-vs-woocommerce": "2026-08-13",
  "fr/developpement-logiciel": "2026-08-13",
  "fr/image-de-marque": "2026-08-13",
  "fr/automatisation-ia": "2026-08-13",
  "fr/referencement-local": "2026-08-13",
  "fr/developpement-framer": "2026-08-13",
  "work/lisa-travel-design": "2026-08-13",
  "fr/etude-de-cas-lisa-travel-design": "2026-08-13",
  "work/bankdemark": "2026-08-13",
  "fr/etude-de-cas-bankdemark": "2026-08-13",
  "work/stalkr-navtrl": "2026-08-13",
  "fr/etude-de-cas-stalkr-navtrl": "2026-08-13",
  "work/blackwater-aquatics": "2026-08-13",
  "fr/etude-de-cas-blackwater-aquatics": "2026-08-13",
  "fr/fiche-google-entreprise": "2026-08-13",
  "fr/referencement-naturel": "2026-08-13",
  "fr/audit-seo": "2026-08-13",
  "fr/etre-cite-par-ia": "2026-08-13",
  "fr/boutique-en-ligne-quebec": "2026-08-13",
  products: "2026-08-13",
  "fr/produits": "2026-08-13",
  privacy: "2026-08-13",
  "fr/confidentialite": "2026-08-13",
  "tools/llms-txt-generator": "2026-08-13",
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
  "work/blackwater-aquatics": "fr/etude-de-cas-blackwater-aquatics",
  "founder/jaeden-doody": "fr/fondateur/jaeden-doody",
  about: "fr/a-propos",
  portfolio: "fr/realisations",
  work: "fr/etudes-de-cas",
  products: "fr/produits",
  privacy: "fr/confidentialite",
};
const frToEn = Object.fromEntries(Object.entries(languagePairs).map(([en, fr]) => [fr, en]));

function alternatesFor(page: string) {
  const en = page in languagePairs ? page : frToEn[page] !== undefined ? frToEn[page] : null;
  if (en === null) return undefined;
  const fr = languagePairs[en];
  const enUrl = en ? `${siteUrl}/${en}` : `${siteUrl}/`;
  return {
    languages: {
      "en-CA": enUrl,
      "fr-CA": `${siteUrl}/${fr}`,
      /**
       * x-default is the page served to a user whose language and region match
       * neither declared alternate — a German or Brazilian visitor, say. English
       * is the right fallback for that person, so it points at the EN URL of
       * this same pair.
       *
       * It deliberately does NOT point at /global. x-default names the default
       * *within this cluster*; sending someone who asked for /shopify-development
       * to a page about remote engagement would be a redirect, not a language
       * fallback. Pages with no FR counterpart get no alternates at all, which
       * is correct — x-default only has meaning inside a cluster.
       */
      "x-default": enUrl,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = Object.entries(pageLastModified).map(([page, lastModified]) => ({
    url: page ? `${siteUrl}/${page}` : `${siteUrl}/`,
    lastModified: new Date(lastModified),
    alternates: alternatesFor(page),
  }));

  const articles = getAllPosts().map((post) => ({
    url: `${siteUrl}/stillawake-times/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
  }));

  /** French articles live in their own content tree and are written for
   *  Québec, so they are listed independently rather than paired 1:1. */
  const articlesFr = getAllPosts("fr").map((post) => ({
    url: `${siteUrl}/fr/articles/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
  }));

  /**
   * CMS-published items. Excludes noindex, the content_layer type, and rows
   * without a route. Dedupe by URL against file-based entries: a markdown
   * article superseded by a CMS row with the same slug keeps ONE sitemap
   * entry, with the CMS lastmod winning. hreflang comes from translation
   * groups where both locales are published. Adapter failures degrade to []
   * so a Supabase outage never breaks the sitemap.
   */
  const cmsRows = (await getAllPublishedForSitemap()).filter(
    (item) =>
      item.route_path != null &&
      item.type !== "content_layer" &&
      !item.snapshot?.seo?.noindex,
  );

  const byGroup = new Map<string, typeof cmsRows>();
  for (const item of cmsRows) {
    if (!item.translation_group_id) continue;
    const group = byGroup.get(item.translation_group_id) ?? [];
    group.push(item);
    byGroup.set(item.translation_group_id, group);
  }

  const cmsEntries = cmsRows.map((item) => {
    const group = item.translation_group_id ? byGroup.get(item.translation_group_id) : undefined;
    const en = group?.find((row) => row.locale === "en" && row.route_path);
    const fr = group?.find((row) => row.locale === "fr" && row.route_path);
    return {
      url: `${siteUrl}${item.route_path}`,
      lastModified: new Date(item.published_at ?? item.publish_at ?? Date.now()),
      alternates:
        en && fr
          ? {
              languages: {
                "en-CA": `${siteUrl}${en.route_path}`,
                "fr-CA": `${siteUrl}${fr.route_path}`,
              },
            }
          : undefined,
    };
  });

  const cmsUrls = new Set(cmsEntries.map((entry) => entry.url));
  const fileEntries = [...pages, ...articles, ...articlesFr].filter(
    (entry) => !cmsUrls.has(entry.url),
  );

  return [...fileEntries, ...cmsEntries];
}
