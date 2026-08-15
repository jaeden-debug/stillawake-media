/**
 * Permanent redirects, in one place.
 *
 * This used to live inline in next.config.mjs. It was moved out when the
 * sitemap started advertising a URL that the config redirected: the "What is
 * AEO?" article was retired into the GEO guide, and because a CMS row for it
 * still existed, the sitemap kept listing a path that answered 308. Telling
 * Google to crawl a URL you have just redirected is a self-inflicted wound,
 * and nothing in the build would ever have caught it.
 *
 * So the sitemap now reads this list and filters itself. Adding a redirect
 * here is enough to keep the retired URL out of the sitemap, whether the old
 * page came from the filesystem, the CMS, or a route that no longer exists.
 *
 * Plain .mjs rather than .ts because next.config.mjs has to import it at
 * config-load time, before any TypeScript pipeline exists.
 *
 * @typedef {{ source: string, destination: string, permanent: boolean }} Redirect
 * @type {Redirect[]}
 */
export const REDIRECTS = [
  { source: "/web-design", destination: "/web-design-montreal", permanent: true },
  {
    source: "/technical-seo",
    destination: "/stillawake-times/what-is-technical-seo",
    permanent: true,
  },
  // Cannibalization repair round 2: the four "Montréal" article stubs were
  // thin commercial-intent duplicates of dedicated service pages. The
  // service page owns the commercial query; article equity 301s into it.
  // Top-level legacy sources point straight at the final target (no chains).
  { source: "/web-development-montreal", destination: "/software-development", permanent: true },
  {
    source: "/stillawake-times/web-development-montreal",
    destination: "/software-development",
    permanent: true,
  },
  { source: "/ecommerce-web-design-montreal", destination: "/shopify-development", permanent: true },
  {
    source: "/stillawake-times/ecommerce-web-design-montreal",
    destination: "/shopify-development",
    permanent: true,
  },
  { source: "/montreal-web-designer", destination: "/web-design-montreal", permanent: true },
  {
    source: "/stillawake-times/montreal-web-designer",
    destination: "/web-design-montreal",
    permanent: true,
  },
  { source: "/web-design-agency-montreal", destination: "/web-design-montreal", permanent: true },
  {
    source: "/stillawake-times/web-design-agency-montreal",
    destination: "/web-design-montreal",
    permanent: true,
  },
  { source: "/website-redesign-montreal", destination: "/website-redesign", permanent: true },
  {
    source: "/stillawake-times/website-redesign-montreal",
    destination: "/website-redesign",
    permanent: true,
  },
  {
    source: "/blog/google-business-profile-optimization",
    destination: "/stillawake-times/google-business-profile-optimization",
    permanent: true,
  },
  {
    source: "/blog/how-to-redesign-a-website-without-destroying-seo",
    destination: "/stillawake-times/how-to-redesign-a-website-without-destroying-seo",
    permanent: true,
  },
  {
    source: "/stillawake-times/custom-coded-websites-outperform-templates",
    destination: "/stillawake-times/why-custom-coded-websites-outperform-templates",
    permanent: true,
  },
  // Cannibalization repair: these articles duplicated dedicated commercial
  // pages head-on (near-identical titles/intent). The service page is the
  // canonical commercial target; the article equity 301s into it.
  {
    source: "/stillawake-times/web-design-montreal",
    destination: "/web-design-montreal",
    permanent: true,
  },
  { source: "/stillawake-times/seo-montreal", destination: "/seo-montreal", permanent: true },
  {
    source: "/stillawake-times/agence-web-montreal",
    destination: "/fr/agence-web-montreal",
    permanent: true,
  },
  // AEO cluster consolidation (2026-08-14): the "What is AEO?" explainer
  // competed head-on with BOTH the /answer-engine-optimization service page
  // (same head term, commercial intent) and the GEO guide (same informational
  // intent, published the same day). The service page keeps the commercial
  // query; the GEO guide — longer, with a first-hand playbook — absorbed the
  // AEO definition, the "what it is not" material and the self-audit, and now
  // owns the informational intent for all three terms. Straight to the final
  // target, no chain.
  {
    source: "/stillawake-times/what-is-aeo-answer-engine-optimization",
    destination: "/stillawake-times/what-is-generative-engine-optimization",
    permanent: true,
  },
  // Near-duplicate merges (same topic, one day apart / same intent):
  {
    source: "/stillawake-times/how-website-speed-impacts-seo-conversions-revenue",
    destination: "/stillawake-times/how-website-speed-directly-impacts-revenue-and-seo-rankings",
    permanent: true,
  },
  {
    source: "/stillawake-times/what-businesses-should-prepare-before-hiring-a-web-design-agency",
    destination: "/stillawake-times/what-to-know-before-hiring-web-design-agency",
    permanent: true,
  },
];

/** Redirect sources as bare paths, for filtering the sitemap. */
export const REDIRECT_SOURCES = new Set(REDIRECTS.map((r) => r.source));
