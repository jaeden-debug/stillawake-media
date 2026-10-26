/**
 * Technical SEO crawl of every URL in a live sitemap. Read-only.
 *
 * Checks per page: HTTP status, <title> and meta description (presence,
 * length, duplicates), H1 count, canonical (must be self), robots noindex,
 * hreflang reciprocity, images without alt, and every internal link's status.
 *
 * Run: node scripts/seo-crawl.mjs [baseUrl] [--json out.json]
 *   baseUrl defaults to https://stillawakemedia.com
 */
import fs from "node:fs";

const args = process.argv.slice(2);
const BASE = (args.find((a) => a.startsWith("http")) ?? "https://stillawakemedia.com").replace(/\/$/, "");
const jsonOut = args.includes("--json") ? args[args.indexOf("--json") + 1] : null;
const PROD = "https://stillawakemedia.com";

const toLocal = (u) => u.replace(PROD, BASE);
const toProd = (u) => u.replace(BASE, PROD);
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))];

const pages = [];
let i = 0;
async function worker() {
  while (i < urls.length) {
    const u = urls[i++];
    const res = await fetch(toLocal(u), { redirect: "manual" });
    const html = res.status === 200 ? await res.text() : "";
    const head = html.split("</head>")[0] ?? "";
    const title = decode(/<title>([^<]*)<\/title>/.exec(head)?.[1] ?? "");
    const desc = decode(/<meta name="description" content="([^"]*)"/.exec(head)?.[1] ?? "");
    const canonical = /<link rel="canonical" href="([^"]*)"/.exec(head)?.[1] ?? "";
    const robots = /<meta name="robots" content="([^"]*)"/.exec(head)?.[1] ?? "";
    const hreflang = Object.fromEntries(
      [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]),
    );
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    const imgsNoAlt = [...html.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\balt=/.test(m[0])).length;
    const links = [...new Set([...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]))].filter(
      (l) => !l.startsWith("/_next") && !/\.(png|jpe?g|webp|svg|ico|json|xml|txt|mp4|css|js)$/.test(l),
    );
    pages.push({ url: u, status: res.status, title, desc, canonical, robots, hreflang, h1, imgsNoAlt, links });
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

// Internal link targets
const allLinks = new Set(pages.flatMap((p) => p.links));
const linkStatus = {};
const list = [...allLinks];
let j = 0;
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (j < list.length) {
      const l = list[j++];
      const r = await fetch(BASE + l, { redirect: "manual" });
      linkStatus[l] = r.status;
    }
  }),
);

const byTitle = {}, byDesc = {};
for (const p of pages) {
  if (p.title) (byTitle[p.title] ??= []).push(p.url);
  if (p.desc) (byDesc[p.desc] ??= []).push(p.url);
}
const inbound = {};
for (const p of pages) for (const l of p.links) (inbound[l] ??= new Set()).add(p.url);

const issues = {
  non200: pages.filter((p) => p.status !== 200).map((p) => [p.url, p.status]),
  missingTitle: pages.filter((p) => !p.title).map((p) => p.url),
  longTitle: pages.filter((p) => p.title.length > 70).map((p) => [p.url, p.title.length]),
  missingDesc: pages.filter((p) => !p.desc).map((p) => p.url),
  shortDesc: pages.filter((p) => p.desc && p.desc.length < 70).map((p) => [p.url, p.desc.length]),
  longDesc: pages.filter((p) => p.desc.length > 170).map((p) => [p.url, p.desc.length]),
  dupTitles: Object.entries(byTitle).filter(([, v]) => v.length > 1),
  dupDescs: Object.entries(byDesc).filter(([, v]) => v.length > 1),
  h1Not1: pages.filter((p) => p.h1 !== 1).map((p) => [p.url, p.h1]),
  canonicalNotSelf: pages.filter((p) => toProd(p.canonical).replace(/\/$/, "") !== p.url.replace(/\/$/, "")).map((p) => [p.url, p.canonical]),
  noindex: pages.filter((p) => /noindex/.test(p.robots)).map((p) => p.url),
  hreflangNotReciprocal: [],
  imgsNoAlt: pages.filter((p) => p.imgsNoAlt > 0).map((p) => [p.url, p.imgsNoAlt]),
  brokenInternalLinks: Object.entries(linkStatus).filter(([, s]) => s >= 400).map(([l, s]) => [l, s, [...(inbound[l] ?? [])].slice(0, 3)]),
  linksToRedirects: Object.entries(linkStatus).filter(([, s]) => s >= 300 && s < 400).map(([l, s]) => [l, s, [...(inbound[l] ?? [])].slice(0, 3)]),
  orphans: pages.filter((p) => !inbound[new URL(p.url).pathname.replace(/\/$/, "") || "/"] && new URL(p.url).pathname !== "/").map((p) => p.url),
};
const pageByUrl = Object.fromEntries(pages.map((p) => [p.url.replace(/\/$/, ""), p]));
for (const p of pages) {
  for (const [lang, href] of Object.entries(p.hreflang)) {
    if (lang === "x-default") continue;
    const other = pageByUrl[href.replace(/\/$/, "")];
    if (!other) continue;
    const back = Object.values(other.hreflang).map((h) => h.replace(/\/$/, ""));
    if (!back.includes(p.url.replace(/\/$/, ""))) issues.hreflangNotReciprocal.push([p.url, lang, href]);
  }
}

const summary = Object.fromEntries(Object.entries(issues).map(([k, v]) => [k, v.length]));
console.log(JSON.stringify({ base: BASE, pages: pages.length, internalLinks: list.length, summary }, null, 1));
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ crawledAt: new Date().toISOString(), base: BASE, summary, issues }, null, 1));
