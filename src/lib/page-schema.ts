import { entityIds } from "@/data/entities";
import { siteUrl } from "@/lib/data";

/**
 * Page-level structured data.
 *
 * The root shell already emits one Organization and one WebSite node for the
 * whole site. What was missing was the per-page layer: what *this* URL is,
 * where it sits in the site, and — for service pages — what is actually being
 * offered. 46 of 61 pages had none, which meant an answer engine could see
 * that StillAwake Media exists but not that it sells Shopify development.
 *
 * Everything here references `entityIds` rather than re-declaring the
 * organization, so the graph stays one entity with many pages hanging off it.
 */

export type PageKind =
  | "service" // a thing we sell
  | "collection" // an index of other pages
  | "article" // a guide, comparison or case study
  | "about"
  | "contact"
  | "home";

export type Crumb = { name: string; path: string };

export type PageSchemaInput = {
  kind: PageKind;
  url: string;
  name: string;
  description: string;
  locale: "en" | "fr";
  /** Ancestors, excluding Home (added automatically) and excluding self. */
  crumbs?: Crumb[];
  /** Service pages: what the client actually buys. */
  serviceType?: string;
  /** Articles: when it was last meaningfully revised. */
  dateModified?: string;
  /** Optional Q&A — answer engines quote these near-verbatim. */
  faqs?: { q: string; a: string }[];
};

const TYPE_BY_KIND: Record<PageKind, string> = {
  service: "WebPage",
  collection: "CollectionPage",
  article: "Article",
  about: "AboutPage",
  contact: "ContactPage",
  home: "WebPage",
};

/**
 * Areas served. Deliberately broader than the office location: the studio
 * works remotely and now publishes /global, so a Montréal-only areaServed
 * was actively telling answer engines not to recommend us elsewhere.
 */
export const AREAS_SERVED = ["Canada", "United States", "United Kingdom", "Australia"];

function breadcrumbs(crumbs: Crumb[], self: { name: string; url: string }, locale: "en" | "fr") {
  const home = { name: locale === "fr" ? "Accueil" : "Home", path: locale === "fr" ? "/fr" : "/" };
  const trail = [home, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      ...trail.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${siteUrl}${c.path}`,
      })),
      {
        "@type": "ListItem",
        position: trail.length + 1,
        name: self.name,
        item: self.url,
      },
    ],
  };
}

export function buildPageSchema(input: PageSchemaInput) {
  const {
    kind,
    url,
    name,
    description,
    locale,
    crumbs = [],
    serviceType,
    dateModified,
    faqs,
  } = input;

  const page: Record<string, unknown> = {
    "@type": TYPE_BY_KIND[kind],
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    isPartOf: { "@id": entityIds.website },
    publisher: { "@id": entityIds.organization },
  };

  if (kind === "article") {
    // An Article needs an author and a publisher to be eligible for
    // anything. The author carries the same @id the founder page declares,
    // so this is the existing Person entity rather than a new one — but it
    // is spelled out inline too, because a bare @id pointing at a node on a
    // different page is a reference a parser is not obliged to follow.
    page.author = {
      "@type": "Person",
      "@id": entityIds.founder,
      name: "Jaeden Doody",
      url: `${siteUrl}/founder/jaeden-doody`,
    };
    page.headline = name;
    if (dateModified) page.dateModified = dateModified;
  }

  const graph: Record<string, unknown>[] = [
    page,
    breadcrumbs(crumbs, { name, url }, locale),
  ];

  if (kind === "service" && serviceType) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name,
      description,
      serviceType,
      provider: { "@id": entityIds.organization },
      areaServed: AREAS_SERVED,
      availableLanguage: [
        { "@type": "Language", name: "English" },
        { "@type": "Language", name: "French" },
      ],
    });
  }

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
