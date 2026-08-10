import { siteUrl } from "@/lib/data";

/**
 * Canonical entity identifiers for the StillAwake Media entity graph.
 *
 * Every JSON-LD node in the app must reference these constants rather than
 * re-declaring an entity inline. Two nodes describing the same real-world
 * thing with different (or absent) @ids read as two separate entities to a
 * consumer, which is what we are avoiding here.
 *
 * External @ids below are the identifiers those sites already publish on
 * their own homepages. Reusing them is what links our graph to theirs.
 */
export const entityIds = {
  organization: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  founder: `${siteUrl}/founder/jaeden-doody#person`,
  zylx: "https://zylx.ai/#software",
  bankdemark: "https://bankdemark.com/#organization",
  blackwater: "https://blackwateraquatics.ca/#organization",
} as const;

export const organization = {
  id: entityIds.organization,
  name: "StillAwake Media",
  url: siteUrl,
  slogan: "Ambition Never Sleeps.",
  description:
    "StillAwake Media builds software, intelligent systems, and digital infrastructure for modern businesses.",
} as const;

/**
 * Ventures connected to Jaeden Doody.
 *
 * `relationship` is deliberately explicit per venture. ZylX is a StillAwake
 * Media product; BankDeMark and Blackwater Aquatics each publish their own
 * standalone Organization entity with no declared parent, so they are modelled
 * as separate organizations Jaeden founded — not as StillAwake subsidiaries.
 * Ownership is not inferred from the fact that one person built them all.
 */
export const ventures = [
  {
    key: "zylx",
    id: entityIds.zylx,
    name: "ZYLX.ai",
    url: "https://zylx.ai",
    domain: "zylx.ai",
    schemaType: "SoftwareApplication",
    relationship: "StillAwake Media product · created by Jaeden Doody",
    tagline: "The Business Brain for AI",
    description:
      "ZylX connects a business's systems once, builds persistent context from them, and makes that context available to authorized AI assistants through MCP — so an assistant answers with real business knowledge instead of guesses.",
  },
  {
    key: "bankdemark",
    id: entityIds.bankdemark,
    name: "BankDeMark",
    url: "https://bankdemark.com",
    domain: "bankdemark.com",
    schemaType: "Organization",
    relationship: "Founded by Jaeden Doody · separate organization",
    tagline: "Connected financial management platform",
    description:
      "BankDeMark connects personal and business financial records, transactions, invoices, and financial intelligence through its Command and Invoice products.",
  },
  {
    key: "blackwater",
    id: entityIds.blackwater,
    name: "Blackwater Aquatics Canada",
    url: "https://blackwateraquatics.ca",
    domain: "blackwateraquatics.ca",
    schemaType: "Organization",
    relationship: "Founded and operated by Jaeden Doody · separate business",
    tagline: "Canadian aquatics ecommerce business",
    description:
      "A Canadian ecommerce business selling live fish food, bettas, shrimp, and aquarium livestock — run day to day, not just built and handed off.",
  },
] as const;
