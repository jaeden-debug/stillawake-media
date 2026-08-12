import { entityIds, organization } from "@/data/entities";
import { siteUrl } from "@/lib/data";

/**
 * Source of truth for the Jaeden Doody entity.
 *
 * Every surface that describes Jaeden — the founder page, Person JSON-LD,
 * article authorship, About references — reads from here. Wording may vary by
 * surface; the facts below must not. If this file and another site (ZylX,
 * BankDeMark) ever disagree on name, birth date, location, or role, this file
 * is what gets reconciled to, not quietly forked.
 *
 * Nothing here is aspirational. No awards, press, education, certifications,
 * client counts, revenue, funding, or expertise claims — only what is real.
 */
export const jaedenDoody = {
  id: entityIds.founder,
  name: "Jaeden Doody",
  slug: "jaeden-doody",
  path: "/founder/jaeden-doody",
  url: `${siteUrl}/founder/jaeden-doody`,

  birthDate: "1997-10-09",
  birthPlaceName: "Montreal, Quebec, Canada",
  locality: "Montreal",
  region: "QC",
  country: "CA",

  /**
   * Genuine photograph, supplied by Jaeden. Used for the Person entity's
   * `image`, the founder page's og:image, and the LinkedIn Featured preview.
   * A Person node with a real image is a materially stronger entity signal
   * than one without — but it must never be an AI-generated likeness.
   */
  image: "https://stillawakemedia.com/jaeden-doody-founder-stillawake-media.jpg",

  jobTitle: "Founder",
  roles: ["Founder", "Creator", "Developer", "Builder", "Problem solver"],

  /** One-line identity used under the H1 and in compact contexts. */
  tagline:
    "Founder of StillAwake Media · Creator · Developer · Problem Solver",

  /** Meta description and compact bio. Kept under ~160 characters. */
  shortBio:
    "Jaeden Doody is the Montreal-based founder of StillAwake Media, building software, AI systems, and practical business solutions for modern companies.",

  /** Opening paragraph on the founder page and the schema `description`. */
  longBio:
    "Jaeden Doody is a creator and developer based in Montreal, and the founder of StillAwake Media. He builds software, digital products, and the business systems underneath them — starting from a background in mechanics that shaped how he approaches every system he has worked on since.",

  /** Areas of work. Framed as what he builds and researches in, not expertise claims. */
  knowsAbout: [
    "Artificial intelligence",
    "AI agents",
    "Model Context Protocol",
    "Business intelligence",
    "SaaS",
    "Software development",
    "Business systems",
    "Automation",
    "Financial technology",
    "Ecommerce",
    "Search and SEO",
    "Data infrastructure",
    "Websites and digital products",
    "Product development",
  ],

  organizationId: organization.id,
  organizationName: organization.name,

  /**
   * Confirmed public professional profiles only.
   *
   * Only profiles verified to exist AND to represent Jaeden himself belong
   * here. A company-controlled account (for example x.com/zylxai) is not a
   * personal sameAs. Product/venture sites are modelled as separate entities
   * with their own relationships — they must never be listed here just
   * because he built them.
   *
   * https://zylx.ai/authors/jaeden-doody still returns 404; add it once live.
   */
  sameAs: ["https://www.linkedin.com/in/jaedendoody"] as string[],

  /**
   * Jaeden's personal LinkedIn, for visible on-page links.
   *
   * Deliberately NOT added to the StillAwake Organization's sameAs, and
   * deliberately not placed in the site-wide footer. A personal profile linked
   * from every page reads to a crawler as the *company's* profile, which is
   * how a Person and an Organization entity get conflated. Every link below
   * sits in copy that names him, so the association stays unambiguous.
   *
   * Rendered with rel="me" — the standard signal that a link points to another
   * profile of the same person.
   */
  linkedin: "https://www.linkedin.com/in/jaedendoody",
} as const;

/**
 * Author names in article frontmatter that resolve to Jaeden's Person entity.
 * Everything else falls back to the Organization as author.
 */
export const personAuthorNames = new Set(["Jaeden Doody"]);
