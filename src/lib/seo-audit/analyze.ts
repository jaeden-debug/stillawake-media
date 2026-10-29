/**
 * Public-page SEO audit: the parsing and judging half.
 *
 * Everything here is pure, so the route only has to fetch and the tests can
 * feed in real-world HTML without a network. The checks are deliberately the
 * ones a single public fetch can answer honestly. Whether Google has indexed
 * the page, how it ranks, or what Search Console reports are not visible from
 * outside, and the tool says so instead of guessing.
 */

export type CheckLevel = "pass" | "warn" | "fail" | "info";

export type Check = {
  id: string;
  group: "Response" | "Indexing" | "Content" | "Structured data" | "Sharing";
  level: CheckLevel;
  title: string;
  detail: string;
};

export type PageFacts = {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  redirects: string[];
  contentType: string;
  xRobotsTag: string | null;
  lang: string | null;
  title: string | null;
  titles: number;
  description: string | null;
  descriptions: number;
  canonicals: string[];
  robotsMeta: string[];
  viewport: boolean;
  headings: { level: number; text: string }[];
  wordCount: number;
  images: number;
  imagesMissingAlt: number;
  hreflang: { lang: string; href: string }[];
  jsonLd: { types: string[]; valid: boolean }[];
  openGraph: { title: boolean; description: boolean; image: boolean };
  internalLinks: number;
};

export type RobotsGroup = { agents: string[]; rules: { allow: boolean; path: string }[] };
export type RobotsTxt = { groups: RobotsGroup[]; sitemaps: string[] };

export type SiteFacts = {
  robots: { status: number | null; parsed: RobotsTxt | null };
  sitemap: { url: string | null; status: number | null; isXml: boolean; listsPage: boolean | null };
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const clean = (s: string) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Attribute value from a single tag, case-insensitive, either quote style. */
function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  if (!m) return null;
  return decode(m[2] ?? m[3] ?? m[4] ?? "");
}

function tags(html: string, name: string): string[] {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function metaContent(head: string, key: "name" | "property", value: string): string[] {
  return tags(head, "meta")
    .filter((t) => (attr(t, key) ?? "").toLowerCase() === value)
    .map((t) => attr(t, "content") ?? "");
}

function jsonLdTypes(node: unknown, out: string[]) {
  if (Array.isArray(node)) {
    for (const n of node) jsonLdTypes(n, out);
    return;
  }
  if (!node || typeof node !== "object") return;
  const obj = node as Record<string, unknown>;
  const t = obj["@type"];
  if (typeof t === "string") out.push(t);
  else if (Array.isArray(t)) out.push(...t.filter((x): x is string => typeof x === "string"));
  if (obj["@graph"]) jsonLdTypes(obj["@graph"], out);
}

export function analyzePage(input: {
  requestedUrl: string;
  finalUrl: string;
  status: number;
  redirects: string[];
  contentType: string;
  xRobotsTag: string | null;
  html: string;
}): PageFacts {
  const { html, finalUrl } = input;
  const headEnd = html.search(/<\/head>/i);
  const head = headEnd > 0 ? html.slice(0, headEnd) : html;

  const titleMatches = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const descriptions = metaContent(head, "name", "description");

  const canonicals = tags(head, "link")
    .filter((t) => (attr(t, "rel") ?? "").toLowerCase().split(/\s+/).includes("canonical"))
    .map((t) => attr(t, "href") ?? "")
    .map((href) => {
      try {
        return new URL(href, finalUrl).toString();
      } catch {
        return href;
      }
    });

  const robotsMeta = [...metaContent(head, "name", "robots"), ...metaContent(head, "name", "googlebot")];

  const hreflang = tags(head, "link")
    .filter((t) => (attr(t, "rel") ?? "").toLowerCase() === "alternate" && attr(t, "hreflang"))
    .map((t) => ({ lang: attr(t, "hreflang") ?? "", href: attr(t, "href") ?? "" }));

  const jsonLd = [
    ...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ].map((m) => {
    try {
      const types: string[] = [];
      jsonLdTypes(JSON.parse(m[1]), types);
      return { types, valid: true };
    } catch {
      return { types: [], valid: false };
    }
  });

  const body = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<template\b[\s\S]*?<\/template>/gi, " ");

  const headings = [...body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: clean(m[2]).slice(0, 140),
  }));

  const bodyStart = body.search(/<body\b/i);
  const text = clean(bodyStart >= 0 ? body.slice(bodyStart) : body);
  const wordCount = text ? text.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;

  const imgs = tags(body, "img");
  const imagesMissingAlt = imgs.filter((t) => attr(t, "alt") === null).length;

  let host = "";
  try {
    host = new URL(finalUrl).host;
  } catch {
    // Unparseable final URL: internal-link counting just stays at zero.
  }
  const internalLinks = tags(body, "a")
    .map((t) => attr(t, "href"))
    .filter((href): href is string => !!href && !href.startsWith("#") && !/^(mailto|tel|javascript):/i.test(href))
    .filter((href) => {
      try {
        return new URL(href, finalUrl).host === host;
      } catch {
        return false;
      }
    }).length;

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";

  return {
    requestedUrl: input.requestedUrl,
    finalUrl,
    status: input.status,
    redirects: input.redirects,
    contentType: input.contentType,
    xRobotsTag: input.xRobotsTag,
    lang: attr(htmlTag, "lang"),
    title: titleMatches[0] ? clean(titleMatches[0][1]) : null,
    titles: titleMatches.length,
    description: descriptions[0]?.trim() || null,
    descriptions: descriptions.length,
    canonicals,
    robotsMeta,
    viewport: metaContent(head, "name", "viewport").length > 0,
    headings,
    wordCount,
    images: imgs.length,
    imagesMissingAlt,
    hreflang,
    jsonLd,
    openGraph: {
      title: metaContent(head, "property", "og:title").length > 0,
      description: metaContent(head, "property", "og:description").length > 0,
      image: metaContent(head, "property", "og:image").length > 0,
    },
    internalLinks,
  };
}

/* ------------------------------------------------------------------ */
/* robots.txt                                                          */
/* ------------------------------------------------------------------ */

export function parseRobotsTxt(text: string): RobotsTxt {
  const groups: RobotsGroup[] = [];
  const sitemaps: string[] = [];
  let current: RobotsGroup | null = null;
  let lastWasAgent = false;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();

    if (key === "sitemap") {
      if (value) sitemaps.push(value);
      continue;
    }
    if (key === "user-agent") {
      // Consecutive user-agent lines share one group.
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue;
    if (key === "allow" || key === "disallow") {
      // An empty Disallow allows everything; it is not a rule.
      if (value === "") continue;
      current.rules.push({ allow: key === "allow", path: value });
    }
  }
  return { groups, sitemaps };
}

function ruleMatches(rulePath: string, path: string): boolean {
  const anchored = rulePath.endsWith("$");
  const pattern = (anchored ? rulePath.slice(0, -1) : rulePath)
    .split("*")
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${pattern}${anchored ? "$" : ""}`).test(path);
}

/**
 * Google's documented precedence: the group for the most specific matching
 * user agent wins (falling back to `*`), and within it the longest matching
 * rule wins, with Allow winning a tie.
 */
export function isAllowedByRobots(robots: RobotsTxt, agent: string, path: string): boolean {
  const ua = agent.toLowerCase();
  const specific = robots.groups.filter((g) => g.agents.some((a) => a !== "*" && ua.startsWith(a)));
  const groups = specific.length ? specific : robots.groups.filter((g) => g.agents.includes("*"));
  const rules = groups.flatMap((g) => g.rules).filter((r) => ruleMatches(r.path, path));
  if (rules.length === 0) return true;
  rules.sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow));
  return rules[0].allow;
}

/* ------------------------------------------------------------------ */
/* Judging                                                             */
/* ------------------------------------------------------------------ */

const sameUrl = (a: string, b: string) => {
  try {
    const x = new URL(a);
    const y = new URL(b);
    const strip = (u: URL) => `${u.protocol}//${u.host}${u.pathname.replace(/\/$/, "")}${u.search}`;
    return strip(x) === strip(y);
  } catch {
    return a === b;
  }
};

export function buildChecks(page: PageFacts, site: SiteFacts): Check[] {
  const checks: Check[] = [];
  const add = (c: Check) => checks.push(c);

  // Response
  if (page.status >= 200 && page.status < 300) {
    add({ id: "status", group: "Response", level: "pass", title: `HTTP ${page.status}`, detail: "The page returns a success status, which Google needs before it can index it." });
  } else {
    add({ id: "status", group: "Response", level: "fail", title: `HTTP ${page.status}`, detail: "Pages that return an error status are not indexed. Fix the response before anything else on this list." });
  }

  if (page.redirects.length > 1) {
    add({ id: "redirects", group: "Response", level: "warn", title: `${page.redirects.length} redirects before the page`, detail: `${[...page.redirects, page.finalUrl].join(" → ")}. Each hop slows crawling and leaks a little reliability. Link and redirect straight to the final URL.` });
  } else if (page.redirects.length === 1) {
    add({ id: "redirects", group: "Response", level: "info", title: "One redirect", detail: `${page.redirects[0]} → ${page.finalUrl}. Fine for a typed address; internal links should point at the final URL.` });
  }

  if (page.finalUrl.startsWith("https://")) {
    add({ id: "https", group: "Response", level: "pass", title: "Served over HTTPS", detail: "The final URL is secure." });
  } else {
    add({ id: "https", group: "Response", level: "fail", title: "Not served over HTTPS", detail: "Browsers mark plain HTTP pages as not secure. Redirect to HTTPS and update the canonical." });
  }

  if (!/html/i.test(page.contentType)) {
    add({ id: "content-type", group: "Response", level: "warn", title: "Not an HTML page", detail: `The server says the content type is "${page.contentType || "unknown"}". The remaining checks assume HTML.` });
  }

  // Indexing
  const noindexMeta = page.robotsMeta.some((v) => /\b(noindex|none)\b/i.test(v));
  const noindexHeader = !!page.xRobotsTag && /\b(noindex|none)\b/i.test(page.xRobotsTag);
  if (noindexMeta || noindexHeader) {
    add({ id: "noindex", group: "Indexing", level: "fail", title: "The page asks not to be indexed", detail: `${noindexHeader ? `The X-Robots-Tag header says "${page.xRobotsTag}". ` : ""}${noindexMeta ? `The robots meta tag says "${page.robotsMeta.join(", ")}". ` : ""}If this page should appear in search, remove the noindex.` });
  } else {
    add({ id: "noindex", group: "Indexing", level: "pass", title: "No noindex directive", detail: "Neither a robots meta tag nor an X-Robots-Tag header blocks indexing." });
  }

  const robots = site.robots.parsed;
  let path = "/";
  try {
    const u = new URL(page.finalUrl);
    path = `${u.pathname}${u.search}`;
  } catch {
    // Keep "/" if the URL is unparseable.
  }
  if (site.robots.status === 200 && robots) {
    const allowed = isAllowedByRobots(robots, "Googlebot", path);
    add(
      allowed
        ? { id: "robots", group: "Indexing", level: "pass", title: "robots.txt allows Googlebot", detail: `The rules in /robots.txt let Googlebot fetch ${path}.` }
        : { id: "robots", group: "Indexing", level: "fail", title: "robots.txt blocks Googlebot", detail: `A Disallow rule in /robots.txt matches ${path}. Google can't crawl the page, so it can't read its content or its noindex.` },
    );
  } else if (site.robots.status === 404 || site.robots.status === 410) {
    add({ id: "robots", group: "Indexing", level: "info", title: "No robots.txt", detail: "A missing robots.txt means everything may be crawled. That's fine unless you meant to block something." });
  } else if (site.robots.status !== null && site.robots.status >= 500) {
    add({ id: "robots", group: "Indexing", level: "fail", title: `robots.txt returns ${site.robots.status}`, detail: "Google treats a server error on robots.txt as a reason to pause crawling the whole site. Make it return 200 or 404." });
  } else {
    add({ id: "robots", group: "Indexing", level: "info", title: "robots.txt could not be read", detail: "The check couldn't fetch it, so crawl rules are unknown." });
  }

  if (page.canonicals.length === 0) {
    add({ id: "canonical", group: "Indexing", level: "warn", title: "No canonical tag", detail: "Without one, Google picks the preferred URL itself. A self-referencing canonical removes the guesswork for parameter and duplicate URLs." });
  } else if (page.canonicals.length > 1 && new Set(page.canonicals).size > 1) {
    add({ id: "canonical", group: "Indexing", level: "fail", title: "Conflicting canonical tags", detail: `The page declares ${page.canonicals.length} different canonicals: ${page.canonicals.join(", ")}. Google may ignore all of them.` });
  } else if (sameUrl(page.canonicals[0], page.finalUrl)) {
    add({ id: "canonical", group: "Indexing", level: "pass", title: "Self-referencing canonical", detail: page.canonicals[0] });
  } else {
    add({ id: "canonical", group: "Indexing", level: "warn", title: "Canonical points elsewhere", detail: `The canonical is ${page.canonicals[0]}, not this URL. That's correct for a duplicate, and wrong if this page should rank on its own.` });
  }

  if (site.sitemap.status === 200 && site.sitemap.isXml) {
    const where = site.sitemap.url ?? "the sitemap";
    if (site.sitemap.listsPage === true) {
      add({ id: "sitemap", group: "Indexing", level: "pass", title: "Listed in the XML sitemap", detail: `Found in ${where}.` });
    } else if (site.sitemap.listsPage === false) {
      add({ id: "sitemap", group: "Indexing", level: "warn", title: "Not found in the XML sitemap", detail: `${where} exists but this URL wasn't in the part we read (large sitemaps are only sampled). Pages you want indexed should be listed.` });
    } else {
      add({ id: "sitemap", group: "Indexing", level: "pass", title: "XML sitemap found", detail: where });
    }
  } else {
    add({ id: "sitemap", group: "Indexing", level: "warn", title: "No XML sitemap found", detail: "Neither robots.txt nor /sitemap.xml led to one. A sitemap helps Google find pages that few links point to." });
  }

  if (page.hreflang.length > 0) {
    const self = page.hreflang.some((h) => {
      try {
        return sameUrl(new URL(h.href, page.finalUrl).toString(), page.finalUrl);
      } catch {
        return false;
      }
    });
    add(
      self
        ? { id: "hreflang", group: "Indexing", level: "pass", title: `${page.hreflang.length} hreflang alternates, including itself`, detail: page.hreflang.map((h) => h.lang).join(", ") }
        : { id: "hreflang", group: "Indexing", level: "warn", title: "hreflang doesn't include this page", detail: "Each language version should list itself as well as the others, or Google may ignore the set." },
    );
  }

  // Content
  if (!page.title) {
    add({ id: "title", group: "Content", level: "fail", title: "No title tag", detail: "The title is the main text of a search result. Write one that says what the page is." });
  } else {
    const len = [...page.title].length;
    const level: CheckLevel = len < 15 || len > 70 ? "warn" : "pass";
    add({ id: "title", group: "Content", level, title: `Title, ${len} characters`, detail: `"${page.title}"${level === "warn" ? (len < 15 ? ". Very short titles rarely describe the page well." : ". Google may cut or rewrite long titles; keep the important words first.") : ""}` });
    if (page.titles > 1) add({ id: "title-dup", group: "Content", level: "warn", title: `${page.titles} title tags`, detail: "Only one is used. Remove the extras." });
  }

  if (!page.description) {
    add({ id: "description", group: "Content", level: "warn", title: "No meta description", detail: "Google writes its own snippet when there isn't one. A good description can still be shown and can improve click-through." });
  } else {
    const len = [...page.description].length;
    const level: CheckLevel = len < 50 || len > 180 ? "warn" : "pass";
    add({ id: "description", group: "Content", level, title: `Meta description, ${len} characters`, detail: `"${page.description}"${level === "warn" ? (len < 50 ? ". Short descriptions often get replaced." : ". Long descriptions are truncated in results.") : ""}` });
  }

  const h1s = page.headings.filter((h) => h.level === 1);
  if (h1s.length === 0) {
    add({ id: "h1", group: "Content", level: "warn", title: "No H1", detail: "A single main heading tells readers and machines what the page is about." });
  } else if (h1s.length > 1) {
    add({ id: "h1", group: "Content", level: "warn", title: `${h1s.length} H1 headings`, detail: `${h1s.map((h) => `"${h.text}"`).join(", ")}. Not an error for Google, but one clear H1 is easier to read and to summarise.` });
  } else {
    add({ id: "h1", group: "Content", level: "pass", title: "One H1", detail: `"${h1s[0].text}"` });
  }

  const skips = page.headings.filter((h, i) => i > 0 && h.level > page.headings[i - 1].level + 1);
  if (skips.length > 0) {
    add({ id: "heading-order", group: "Content", level: "info", title: "Heading levels skip", detail: `For example "${skips[0].text}" jumps to H${skips[0].level}. A tidy outline helps screen readers and passage-level understanding.` });
  }

  if (page.wordCount < 200) {
    add({ id: "words", group: "Content", level: "warn", title: `About ${page.wordCount} words of HTML text`, detail: "Very little text is in the HTML this check received. If the page builds its content with JavaScript, Google can usually render it, but other crawlers and AI tools often can't." });
  } else {
    add({ id: "words", group: "Content", level: "pass", title: `About ${page.wordCount.toLocaleString("en-CA")} words in the HTML`, detail: "The content is present in the server response, so crawlers that don't run JavaScript can read it." });
  }

  if (!page.lang) {
    add({ id: "lang", group: "Content", level: "warn", title: "No lang attribute", detail: 'Add lang to the <html> tag (for example lang="en-CA") so browsers, screen readers and search engines know the language.' });
  } else {
    add({ id: "lang", group: "Content", level: "pass", title: `Language declared: ${page.lang}`, detail: "Set on the <html> tag." });
  }

  if (!page.viewport) {
    add({ id: "viewport", group: "Content", level: "fail", title: "No viewport meta tag", detail: "Without it, phones render the page at desktop width. Google indexes the mobile version." });
  }

  if (page.images > 0) {
    add(
      page.imagesMissingAlt === 0
        ? { id: "alt", group: "Content", level: "pass", title: `All ${page.images} images have alt attributes`, detail: "Decorative images can use an empty alt; meaningful ones should describe the image." }
        : { id: "alt", group: "Content", level: "warn", title: `${page.imagesMissingAlt} of ${page.images} images have no alt attribute`, detail: "Alt text is how screen readers and image search understand an image. Use alt=\"\" for decorative images." },
    );
  }

  if (page.internalLinks === 0) {
    add({ id: "links", group: "Content", level: "warn", title: "No internal links found", detail: "Links to your other pages help visitors and crawlers move through the site. If the navigation is built with JavaScript, it may not be in the HTML." });
  }

  // Structured data
  if (page.jsonLd.length === 0) {
    add({ id: "jsonld", group: "Structured data", level: "info", title: "No JSON-LD structured data", detail: "Not required to rank. It helps machines read facts like your business name, address, prices and authors without guessing." });
  } else {
    const broken = page.jsonLd.filter((j) => !j.valid).length;
    const types = [...new Set(page.jsonLd.flatMap((j) => j.types))];
    add(
      broken > 0
        ? { id: "jsonld", group: "Structured data", level: "fail", title: `${broken} JSON-LD block${broken > 1 ? "s" : ""} won't parse`, detail: "Invalid JSON is ignored entirely. Check for trailing commas and unescaped quotes." }
        : { id: "jsonld", group: "Structured data", level: "pass", title: `${page.jsonLd.length} JSON-LD block${page.jsonLd.length > 1 ? "s" : ""} parse cleanly`, detail: types.length ? `Types found: ${types.join(", ")}. Parsing isn't validation; run Google's Rich Results Test for eligibility.` : "No @type found." },
    );
  }

  // Sharing
  const og = page.openGraph;
  const missing = [!og.title && "og:title", !og.description && "og:description", !og.image && "og:image"].filter(Boolean);
  add(
    missing.length === 0
      ? { id: "og", group: "Sharing", level: "pass", title: "Open Graph tags present", detail: "Title, description and image are set for link previews." }
      : { id: "og", group: "Sharing", level: "info", title: `Missing ${missing.join(", ")}`, detail: "These control how the link looks when shared in messages and social apps. They don't affect rankings." },
  );

  return checks;
}

export function summarize(checks: Check[]) {
  return {
    fail: checks.filter((c) => c.level === "fail").length,
    warn: checks.filter((c) => c.level === "warn").length,
    pass: checks.filter((c) => c.level === "pass").length,
    info: checks.filter((c) => c.level === "info").length,
  };
}
