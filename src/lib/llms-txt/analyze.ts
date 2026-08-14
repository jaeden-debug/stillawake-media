/**
 * Entity analysis for llms.txt.
 *
 * Every competing generator crawls a site and summarises its pages. That
 * answers "what pages exist", which is not the question llms.txt exists to
 * solve. The question an answer engine is actually trying to resolve is
 * "who is this, what do they sell, where do they operate, and what does it
 * cost" — and a list of page titles does not answer any of it.
 *
 * So this file does two things a page-dumper does not: it looks for the
 * entity facts, and it reports the ones it could not find. The warnings are
 * the product. A generated file is a commodity; "no pricing signal was found
 * anywhere on your site, so an answer engine cannot quote your cost" is a
 * finding the visitor can act on.
 *
 * Pure functions only — no network. The fetching lives in safe-fetch.ts so
 * this can be tested against fixtures.
 */

export type PageInfo = {
  url: string;
  title: string;
  description: string;
};

export type EntityFacts = {
  organizationName: string | null;
  organizationType: string | null;
  description: string | null;
  founder: string | null;
  sameAs: string[];
  areaServed: string[];
  hasPricingSignal: boolean;
  hasContactSignal: boolean;
  languages: string[];
  hasExistingLlmsTxt: boolean;
  schemaTypes: string[];
};

export type Finding = {
  level: "ok" | "warn" | "fail";
  /** What was or was not found. */
  label: string;
  /** Why it matters to an answer engine, in one sentence. */
  why: string;
};

export type Analysis = {
  domain: string;
  facts: EntityFacts;
  pages: PageInfo[];
  findings: Finding[];
  /** 0–100. Weighted toward the facts that change whether you can be quoted. */
  score: number;
  llmsTxt: string;
};

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  "#39": "'", "#x27": "'", "#x2F": "/", "#47": "/",
};

/** Decodes the entities that actually turn up in titles and descriptions. */
function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, code: string) => {
    const key = code.toLowerCase();
    if (ENTITIES[key] !== undefined) return ENTITIES[key];
    if (ENTITIES[code] !== undefined) return ENTITIES[code];
    if (code.startsWith("#x") || code.startsWith("#X")) {
      const n = parseInt(code.slice(2), 16);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    if (code.startsWith("#")) {
      const n = parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return match;
  });
}

/** Strips tags, decodes entities, collapses whitespace. */
function text(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? text(m[1]).slice(0, 120) : "";
}

export function extractDescription(html: string): string {
  const m =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  return m ? text(m[1]).slice(0, 300) : "";
}

/** Every JSON-LD block on the page, flattened out of any @graph wrappers. */
export function extractJsonLd(html: string): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      for (const node of nodes) {
        if (node && typeof node === "object") {
          const graph = (node as Record<string, unknown>)["@graph"];
          if (Array.isArray(graph)) out.push(...(graph as Record<string, unknown>[]));
          else out.push(node as Record<string, unknown>);
        }
      }
    } catch {
      // A malformed block is itself a finding, but not a reason to stop.
    }
  }
  return out;
}

const ORG_TYPES = new Set([
  "Organization",
  "Corporation",
  "LocalBusiness",
  "ProfessionalService",
  "OnlineStore",
  "Store",
]);

function typesOf(node: Record<string, unknown>): string[] {
  const t = node["@type"];
  if (typeof t === "string") return [t];
  if (Array.isArray(t)) return t.filter((x): x is string => typeof x === "string");
  return [];
}

function asStringArray(v: unknown): string[] {
  if (typeof v === "string") return [v];
  if (Array.isArray(v)) {
    return v
      .map((x) =>
        typeof x === "string"
          ? x
          : x && typeof x === "object" && typeof (x as Record<string, unknown>).name === "string"
            ? ((x as Record<string, unknown>).name as string)
            : null,
      )
      .filter((x): x is string => !!x);
  }
  if (v && typeof v === "object" && typeof (v as Record<string, unknown>).name === "string") {
    return [(v as Record<string, unknown>).name as string];
  }
  return [];
}

/** Currency-shaped strings. Deliberately conservative — a false positive here
 *  would tell someone their pricing is discoverable when it is not. */
const PRICE_RE = /(?:[$€£]\s?\d[\d,]*(?:\.\d{2})?)|(?:\b\d[\d,]*\s?(?:CAD|USD|EUR|GBP)\b)/;

export function analyzeEntity(
  homepageHtml: string,
  allHtml: string,
  opts: { hasExistingLlmsTxt: boolean },
): EntityFacts {
  const nodes = extractJsonLd(homepageHtml);
  const org = nodes.find((n) => typesOf(n).some((t) => ORG_TYPES.has(t)));

  /**
   * Resolves a value that may be a name, an inline node, or an @id pointing
   * at a node declared elsewhere in the graph.
   *
   * The @id case is not an edge case — it is the *correct* way to model a
   * shared entity, and the first version of this function missed it. Run
   * against our own site, which declares `founder: {"@id": ...}` and puts the
   * Person on a different page, the tool reported "no founder entity" for a
   * site that has one. A site doing entity modelling properly was being
   * marked down for it.
   */
  function resolveName(value: unknown): string | null {
    if (typeof value === "string") return value;
    if (!value || typeof value !== "object") return null;
    const ref = value as Record<string, unknown>;
    if (typeof ref.name === "string") return ref.name;
    if (typeof ref["@id"] === "string") {
      const target = nodes.find((n) => n["@id"] === ref["@id"]);
      if (target && typeof target.name === "string") return target.name;
      /* The node lives on another page — common and correct. We cannot read
         its name, but the reference itself proves the relationship is
         declared, so credit it rather than reporting the entity as absent. */
      return "declared by reference";
    }
    return null;
  }

  const founderNode = nodes.find((n) => typesOf(n).includes("Person"));
  const founder =
    resolveName(org?.founder) ?? (founderNode?.name as string | undefined) ?? null;

  const langMatches = new Set<string>();
  const htmlLang = homepageHtml.match(/<html[^>]+lang=["']([^"']+)["']/i);
  if (htmlLang) langMatches.add(htmlLang[1].toLowerCase());
  for (const m of allHtml.matchAll(/hreflang=["']([^"']+)["']/gi)) {
    if (m[1].toLowerCase() !== "x-default") langMatches.add(m[1].toLowerCase());
  }

  return {
    organizationName: (org?.name as string) ?? null,
    organizationType: org ? typesOf(org)[0] ?? null : null,
    description: (org?.description as string) ?? (extractDescription(homepageHtml) || null),
    founder,
    sameAs: asStringArray(org?.sameAs),
    areaServed: asStringArray(org?.areaServed),
    hasPricingSignal: PRICE_RE.test(text(allHtml)),
    hasContactSignal: /\bmailto:|\/contact\b|\/nous-joindre\b|\/contactez\b/i.test(allHtml),
    languages: [...langMatches],
    hasExistingLlmsTxt: opts.hasExistingLlmsTxt,
    schemaTypes: [...new Set(nodes.flatMap(typesOf))],
  };
}

/**
 * The diagnostic. Each finding names a fact and says why it matters.
 * Weights reflect what actually stops an engine quoting you: not knowing
 * who you are is fatal; not having a `sameAs` array is a nice-to-have.
 */
export function buildFindings(facts: EntityFacts): { findings: Finding[]; score: number } {
  const checks: (Finding & { weight: number; passed: boolean })[] = [
    {
      passed: !!facts.organizationName,
      weight: 25,
      level: facts.organizationName ? "ok" : "fail",
      label: facts.organizationName
        ? `Organization identified: ${facts.organizationName}`
        : "No organization entity found",
      why: "Without a named Organization in structured data, an answer engine has to guess who the site belongs to from prose — and usually declines to name you at all.",
    },
    {
      passed: !!facts.description,
      weight: 15,
      level: facts.description ? "ok" : "fail",
      label: facts.description ? "Description found" : "No description found",
      why: "This is the sentence an assistant reuses when someone asks what you do. Without one it writes its own, from whatever text it happens to read first.",
    },
    {
      passed: facts.hasPricingSignal,
      weight: 20,
      level: facts.hasPricingSignal ? "ok" : "warn",
      label: facts.hasPricingSignal
        ? "Pricing signal found on the site"
        : "No pricing found anywhere on the pages checked",
      why: "Assistants are asked what things cost constantly. A site with no number on it cannot be the answer, so a competitor who publishes one gets quoted instead.",
    },
    {
      passed: facts.areaServed.length > 0,
      weight: 12,
      level: facts.areaServed.length > 0 ? "ok" : "warn",
      label:
        facts.areaServed.length > 0
          ? `Area served declared: ${facts.areaServed.join(", ")}`
          : "No areaServed declared",
      why: "Where you will work is one of the first filters applied to a recommendation. Leaving it unstated means being excluded from location-shaped questions.",
    },
    {
      passed: facts.hasContactSignal,
      weight: 10,
      level: facts.hasContactSignal ? "ok" : "warn",
      label: facts.hasContactSignal ? "Contact route found" : "No obvious contact route found",
      why: "A recommendation that cannot be acted on is rarely made. Engines favour entities a reader can actually reach.",
    },
    {
      passed: !!facts.founder,
      weight: 8,
      level: facts.founder ? "ok" : "warn",
      label: facts.founder ? `Founder identified: ${facts.founder}` : "No founder or author entity",
      why: "A named person attached to an organization is one of the stronger trust signals available, and it links your entity to their public profiles.",
    },
    {
      passed: facts.sameAs.length > 0,
      weight: 5,
      level: facts.sameAs.length > 0 ? "ok" : "warn",
      label:
        facts.sameAs.length > 0
          ? `${facts.sameAs.length} external profile(s) linked`
          : "No sameAs profiles linked",
      why: "sameAs is how you tell an engine that the entity here and the one on LinkedIn or Crunchbase are the same thing rather than two similarly named ones.",
    },
    {
      passed: facts.hasExistingLlmsTxt,
      weight: 5,
      level: facts.hasExistingLlmsTxt ? "ok" : "warn",
      label: facts.hasExistingLlmsTxt ? "An llms.txt already exists" : "No llms.txt published yet",
      why: "The file itself is the smallest part of this, but publishing one is how you get to choose the summary instead of accepting whatever is inferred.",
    },
  ];

  const total = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.reduce((s, c) => s + (c.passed ? c.weight : 0), 0);
  return {
    findings: checks.map(({ level, label, why }) => ({ level, label, why })),
    score: Math.round((earned / total) * 100),
  };
}

/** Renders the file itself, in the conventional markdown-ish llms.txt shape. */
export function renderLlmsTxt(domain: string, facts: EntityFacts, pages: PageInfo[]): string {
  const name = facts.organizationName ?? domain;
  const lines: string[] = [`# ${name}`, ""];

  if (facts.description) lines.push(`> ${facts.description}`, "");
  if (facts.areaServed.length) lines.push(`Areas served: ${facts.areaServed.join(", ")}.`);
  if (facts.founder) lines.push(`Founder: ${facts.founder}.`);
  if (facts.languages.length) lines.push(`Languages: ${facts.languages.join(", ")}.`);
  lines.push(`Website: https://${domain}`, "");

  if (facts.sameAs.length) {
    lines.push("## Profiles", "");
    for (const s of facts.sameAs) lines.push(`- ${s}`);
    lines.push("");
  }

  if (pages.length) {
    lines.push("## Key pages", "");
    for (const p of pages) {
      lines.push(p.description ? `- [${p.title}](${p.url}): ${p.description}` : `- [${p.title}](${p.url})`);
    }
    lines.push("");
  }

  lines.push(
    "## Notes",
    "",
    "This file was generated from publicly available pages. Edit it before publishing — the",
    "summary you write yourself is better than any summary inferred from your markup.",
    "",
  );
  return lines.join("\n");
}
