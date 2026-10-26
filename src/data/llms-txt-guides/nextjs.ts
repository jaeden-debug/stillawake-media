import type { PlatformGuide } from "@/lib/llms-txt-guides/types";

/**
 * Next.js.
 *
 * This is the guide we have the most direct evidence for: stillawakemedia.com
 * is a Next.js App Router site and serves its own /llms.txt from a Route
 * Handler at src/app/llms.txt/route.ts, generated from the same entity data
 * that produces the site's JSON-LD. The interesting content here is not "how
 * do I return a string" — it is the caching behaviour, which changed in the
 * App Router and quietly turns a static file into a per-request computation.
 */
export const nextjsGuide: PlatformGuide = {
  slug: "nextjs",
  platform: "Next.js",
  locale: "en",
  status: "verified",

  primaryKeyword: "llms txt nextjs",
  secondaryKeywords: [
    "next.js llms.txt",
    "llms.txt app router",
    "next js route handler llms.txt",
    "generate llms.txt next js",
  ],

  title: "llms.txt in Next.js: Route Handler vs Static File (App Router, 2026)",
  description:
    "Three ways to serve llms.txt from a Next.js App Router site, why an uncached Route Handler recomputes on every crawler request, and the generated-from-source pattern we use on this site so the file cannot drift.",

  intro:
    "Serving /llms.txt from Next.js is easy; serving one that stays true is the part worth thinking about. You have three real options — a static file in public/, a Route Handler that generates the file at build time, or a Route Handler that runs per request — and they differ mainly in how they fail. The static file is correct the day you write it and wrong the first time you ship a new service page. The per-request handler is always current and costs you a serverless invocation every time a crawler touches it, because Route Handlers are not cached by default in the App Router. This page covers all three and shows the build-time pattern this site actually uses.",

  supportStatus: {
    kind: "manual",
    summary:
      "No built-in llms.txt convention. Next.js has special metadata files for robots.txt and sitemap.xml, but llms.txt is not one of them — you implement it yourself, most cleanly as a Route Handler.",
  },

  fileLocation:
    "Either public/llms.txt (static) or a Route Handler at app/llms.txt/route.ts — src/app/llms.txt/route.ts when using the src directory. A directory name containing a dot is valid.",
  implementationMethod:
    "Route Handler exporting GET, with export const dynamic = 'force-static' to prerender it at build time. Verified against Next.js 16.3.0.",

  prerequisites: [
    "A Next.js App Router project (this guide is written against Next.js 16.3.0; the caching defaults described here are App Router behaviour and do not apply to the Pages Router).",
    "Somewhere authoritative to generate the content from — a services array, a CMS query, or your entity/config module. If the only source is a hand-written string, use public/ instead and accept the drift.",
  ],

  steps: [
    {
      title: "Decide which failure mode you can live with",
      body: "A file in public/llms.txt is served directly and costs nothing, but it is a copy of your site's facts that nothing keeps in sync — it goes stale silently. A Route Handler generated from real data cannot drift, because it reads the same source your pages read. Choose public/ only if your site is small and rarely changes; otherwise generate it.",
    },
    {
      title: "Create the Route Handler",
      body: "Add app/llms.txt/route.ts exporting a GET function that returns a Response. Set the content type explicitly — this file has to be served as plain text to be useful, and being explicit means the header does not depend on framework defaults. Note that a route.ts cannot sit at the same route as a page.tsx, which is not a problem here since nothing else owns /llms.txt.",
      code: {
        language: "ts",
        caption: "app/llms.txt/route.ts — the shape we use on this site",
        content: `import { siteUrl } from "@/lib/data";
import { organization } from "@/data/entities";
import { SERVICES } from "@/data/services";

// Route Handlers are NOT cached by default in the App Router.
// Without this, the file is regenerated on every crawler request.
export const dynamic = "force-static";

export function GET() {
  const body = \`# \${organization.name}

> \${organization.description}

## Services

\${SERVICES.filter((s) => s.active)
  .map((s) => \`- \${s.name} — \${siteUrl}\${s.enPath}\`)
  .join("\\n")}
\`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}`,
      },
    },
    {
      title: "Opt into caching explicitly",
      body: "This is the step people miss. In the App Router, Route Handlers are not cached by default; only GET can opt in, and it does so through a route config option. Adding export const dynamic = 'force-static' prerenders the response at build time, which is what you want for a file whose content only changes when you deploy. Without it, every AI crawler that fetches /llms.txt invokes your function.",
    },
    {
      title: "Generate from the same source your pages use",
      body: "The reason to use a Route Handler at all is that it can read your real data. On this site the handler imports the same entity, people and services modules that produce the JSON-LD and the service pages, so the file cannot claim a service that no longer exists or miss one that was added. If your llms.txt is generated from a different source than your site, you have built a second thing to maintain.",
    },
    {
      title: "Deploy and confirm it was prerendered",
      body: "After building, check the build output. A route listed as static has been prerendered; one listed as dynamic will run per request, which usually means the force-static export is missing or something in the handler reads request-time data. On Vercel and similar platforms this is the difference between a cached static asset and a function invocation per crawl.",
      code: {
        language: "bash",
        content: "npx next build\n# Look for /llms.txt in the route table and check it is marked static, not dynamic.",
      },
    },
  ],

  example: {
    caption:
      "Output shape. Facts only — an assistant reading this needs entities and URLs, not positioning copy.",
    language: "markdown",
    content: `# Example Studio

> One-sentence description of what the business actually does.

Example Studio is based in Montreal, Quebec, Canada.
Website: https://example.com

## Services and pricing

- Website builds — from $4,000 CAD — https://example.com/websites
- Technical SEO — $1,200 CAD/month — https://example.com/seo

## Key pages

- [About](https://example.com/about)
- [Contact](https://example.com/contact)
- [Pricing](https://example.com/pricing)`,
  },

  gotchas: [
    {
      title: "Route Handlers are not cached by default",
      body:
        "This is the single most common mistake, and it is silent — the file is correct, it just costs you an invocation per request. In the App Router, Route Handlers are uncached unless a GET handler opts in via a route config option such as export const dynamic = 'force-static'. AI crawlers are enthusiastic about fetching discovery files, so an uncached handler is a real cost line, not a theoretical one.",
    },
    {
      title: "`use cache` cannot be used directly inside a Route Handler body",
      body:
        "If your project has Cache Components enabled and you try to reach for `use cache` inside the handler to cache an expensive lookup, it will not work there. The documented approach is to extract the work into a helper function and mark that. Worth knowing before you restructure a handler around a caching directive that is not valid in that position.",
    },
    {
      title: "public/llms.txt and a Route Handler are two sources of truth",
      body:
        "If you previously dropped a file in public/ and later add app/llms.txt/route.ts, you now have two definitions of the same URL and it is not obvious from the codebase which one wins. Delete the public/ file when you move to a handler. Note also that files in public/ are served with Cache-Control: public, max-age=0, so the static route is not automatically the cheaper one.",
    },
    {
      title: "Generating from your sitemap produces a worse file",
      body:
        "The tempting shortcut is to map over the same array that feeds sitemap.ts. A sitemap is an exhaustive list of URLs; llms.txt is a curated statement of what matters and what the business is. Dumping every route produces a long file with no entity information — the exact failure this file is supposed to fix.",
    },
    {
      title: "The dot in the directory name is fine, but the route is not a page",
      body:
        "app/llms.txt/route.ts looks odd and works correctly. What will not work is putting a page.tsx at the same route — Next.js treats a route.ts and page.tsx at the same path as a conflict, and each file takes over all HTTP verbs for its route.",
    },
  ],

  verificationMethod: [
    {
      title: "Confirm status and content type in production",
      body: "The endpoint should return 200 with a plain-text content type. If you get text/html, something is rendering a page — most often a catch-all route or a rewrite intercepting the path before the handler.",
      code: {
        language: "bash",
        content: 'curl -sI https://yoursite.com/llms.txt | grep -iE "^(HTTP|content-type)"',
      },
    },
    {
      title: "Confirm it was prerendered rather than computed per request",
      body: "Check the next build route table for /llms.txt and confirm it is listed as static. If it is dynamic, the force-static export is missing or the handler touches request-time data. This is the check that catches the caching mistake, and it is easy to add to CI.",
      code: {
        language: "bash",
        content: "npx next build | grep -A2 'llms.txt'",
      },
    },
    {
      title: "Confirm the content matches your live site",
      body: "Diff the services or pages listed in the file against what your site actually offers today. If they disagree, the file is generated from the wrong source — which is the failure the Route Handler approach exists to prevent.",
    },
  ],

  limitations: [
    "force-static means the file is fixed at build time. If your services or content change through a CMS without a rebuild, the file will lag until the next deploy — use revalidation or an on-demand rebuild hook if that matters.",
    "A Route Handler can only describe data your application already has. It cannot compensate for a site that never states its pricing, service area or ownership.",
    "The caching behaviour described here is App Router behaviour verified against Next.js 16.3.0. Older major versions and the Pages Router differ, and Next.js has changed caching defaults between majors before.",
    "llms.txt remains a proposed convention. Google's John Mueller has publicly questioned the proposal and noted that LLMs are not actively seeking these files; implementing it is cheap and low-risk, not a ranking mechanism.",
  ],

  verifiedDate: "2026-08-14",
  sources: [
    {
      label: "Next.js — Route Handlers (caching, route resolution)",
      url: "https://nextjs.org/docs/app/getting-started/route-handlers",
      kind: "primary",
    },
    {
      label: "Next.js — public folder (static file serving and cache headers)",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/public-folder",
      kind: "primary",
    },
    {
      label: "Next.js — route.js file convention",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/route",
      kind: "primary",
    },
  ],

  relatedServices: [
    { label: "Custom software development", href: "/software-development" },
    { label: "AI search readiness (AEO)", href: "/answer-engine-optimization" },
  ],
  relatedGuides: ["shopify", "wordpress"],
};
