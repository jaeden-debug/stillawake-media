import type { PlatformGuide } from "@/lib/llms-txt-guides/types";

/**
 * Shopify.
 *
 * The important thing about this guide is that most of the pages currently
 * ranking for "llms.txt shopify" are wrong. They describe uploading a file to
 * the Files area and adding a URL redirect, which was the correct workaround
 * before Shopify shipped native support on 28 May 2026. Following that advice
 * today means hand-maintaining a file that competes with one Shopify already
 * generates and keeps current.
 *
 * So this guide leads with "you already have one, go look at it" rather than
 * with instructions to build something.
 */
export const shopifyGuide: PlatformGuide = {
  slug: "shopify",
  platform: "Shopify",
  locale: "en",
  status: "verified",

  primaryKeyword: "llms txt shopify",
  secondaryKeywords: [
    "shopify llms.txt",
    "add llms.txt to shopify",
    "shopify agents.md",
    "llms.txt.liquid",
  ],

  title: "llms.txt on Shopify: You Already Have One (2026)",
  description:
    "Shopify generates /llms.txt for every store automatically. Here is how to check yours, when a custom llms.txt.liquid template is justified, and why the upload-and-redirect method most guides still describe is now the wrong answer.",

  intro:
    "If you run a Shopify store, you almost certainly already have a working /llms.txt — Shopify has generated one for every storefront since 28 May 2026, and keeps it aligned with /agents.md without any theme work. That makes most of the advice still circulating on this topic actively harmful: uploading a Markdown file to your Files area and pointing a URL redirect at it replaces a file Shopify maintains with one you have to remember to update. The useful work on Shopify is not creating the file. It is checking what yours currently says, and fixing the store data it is generated from.",

  supportStatus: {
    kind: "native",
    summary:
      "Native since 28 May 2026. Every Shopify store serves /llms.txt, /llms-full.txt and /agents.md with no setup. /agents.md is the canonical agent-discovery document; /llms.txt mirrors it by default.",
  },

  fileLocation:
    "Served by Shopify at https://yourstore.com/llms.txt. If you override it, the template lives at theme/templates/llms.txt.liquid (Online Store → Themes → Edit code → Templates).",
  implementationMethod:
    "Liquid template with a fallback chain. Shopify resolves /llms.txt to templates/llms.txt.liquid if present, then templates/agents.md.liquid, then its own generated default. That precedence governs /llms.txt only — /agents.md and /llms-full.txt are unaffected by an llms.txt.liquid override.",

  prerequisites: [
    "A published Shopify storefront (the files are served on the live domain, not on a password-protected store).",
    "Theme code access — Online Store → Themes → Edit code — only if you intend to override the default.",
  ],

  steps: [
    {
      title: "Look at what Shopify already serves",
      body: "Before changing anything, open https://yourstore.com/llms.txt and https://yourstore.com/agents.md in a browser. Shopify generates both from your store data, so what you see is what an agent sees. Read it as if you had never heard of your brand: does it say what you sell, who you are, and where you ship? Most stores discover the file is fine and the underlying store description is the weak part.",
      code: {
        language: "bash",
        caption: "Check all three endpoints and their content types",
        content:
          "curl -sI https://yourstore.com/llms.txt | head -n 3\ncurl -sI https://yourstore.com/agents.md | head -n 3\ncurl -s  https://yourstore.com/llms.txt | head -n 40",
      },
    },
    {
      title: "Decide whether you actually need to override it",
      body: "Shopify's own guidance is not to add an llms.txt.liquid template in most cases, because the managed default stays aligned with /agents.md with no maintenance from you. Add one only when you have a specific requirement for /llms.txt to say something different from /agents.md. If you simply want better content across all three files, edit templates/agents.md.liquid instead — /llms.txt and /llms-full.txt fall back to it.",
    },
    {
      title: "If you do override, create the template in the right place",
      body: "In Online Store → Themes → Edit code, right-click the Templates folder, choose New File, and name it llms.txt.liquid. It must be a Liquid template — Shopify will not accept a JSON template at this path. Duplicate your live theme first: this is a live storefront route, and a broken template changes what agents read on your production domain.",
    },
    {
      title: "Write it against the objects that are actually available",
      body: "This is where most copied examples break. Inside llms.txt.liquid you have access to the agents object and the request object — and not much else. The global objects you would normally reach for in a Liquid template, including shop, collections, articles and products, are not available here. An example that loops over collections will render empty rather than error, so the file looks fine in the editor and ships broken.",
    },
    {
      title: "Fix the store data, not just the file",
      body: "A well-formed llms.txt pointing at a store with no stated shipping regions, no return policy text and a one-line store description does not help an assistant answer questions about you. The generated file can only reflect what your store already declares, so the highest-value work is usually in your policies, your About page and your product descriptions — not in the template.",
    },
  ],

  example: {
    caption:
      "A minimal llms.txt.liquid override, using only properties Shopify documents for this path (verified against shopify.dev on 2026-08-15). There is no `agents.content` property — several guides show one, and it renders empty.",
    language: "liquid",
    content: `# {{ agents.store_name }}

{{ agents.store_url }}

## Machine endpoints

- Sitemap: {{ agents.sitemap_url }}
- MCP endpoint: {{ agents.mcp_endpoint_url }}
- UCP discovery: {{ agents.ucp_discovery_url }}

## About this store

Domain: {{ request.host }}

## Notes for agents

- Shipping, returns and payment terms are published in the store policies.
- Prices shown on the storefront are authoritative; cached copies may be stale.
- For wholesale or B2B enquiries, use the contact route linked from the storefront.`,
  },

  gotchas: [
    {
      title: "The upload-and-redirect method is now the wrong answer",
      body:
        "Most guides still ranking for this query tell you to upload a Markdown file to Shopify's Files area and create a URL redirect from /llms.txt to the CDN URL. That was a reasonable workaround before native support existed. Today it shadows a file Shopify already generates and keeps current, and it hands you a maintenance job with no owner. If you previously set this up, remove the redirect and check what Shopify serves instead.",
    },
    {
      title: "Most global Liquid objects are unavailable at this path",
      body:
        "llms.txt.liquid exposes the agents and request objects only. shop, collections, articles and products are not available. Because Liquid renders unknown objects as empty rather than throwing, a template copied from a generic Liquid tutorial produces a file that is syntactically valid and substantively empty — and nothing in the theme editor warns you.",
    },
    {
      title: "/agents.md is canonical, not /llms.txt",
      body:
        "Shopify treats /agents.md as the canonical agent-discovery document and /llms.txt as an alternate URL that mirrors it. If you override only llms.txt.liquid, you have created a divergence you now have to maintain in two places. Editing templates/agents.md.liquid changes all three paths at once and is the right lever for almost every store.",
    },
    {
      title: "It must be Liquid, not JSON",
      body:
        "Shopify's newer templates are frequently JSON. This one cannot be. The file has to be named llms.txt.liquid and contain Liquid; a JSON template at this path will not work.",
    },
    {
      title: "Password-protected and preview stores do not serve it usefully",
      body:
        "The endpoints are part of the live storefront. Checking them on a development store behind a password, or on a myshopify.com preview URL, will not tell you what agents see on your real domain. Verify on the customer-facing domain.",
    },
  ],

  verificationMethod: [
    {
      title: "Confirm the endpoint returns 200 as plain text",
      body: "A successful check returns HTTP 200 with a text content type. A 404 means the storefront is not serving it (most often because you are testing a password-protected store), and an HTML content type means a redirect or app is intercepting the path.",
      code: {
        language: "bash",
        content: 'curl -sI https://yourstore.com/llms.txt | grep -iE "^(HTTP|content-type)"',
      },
    },
    {
      title: "Confirm your override is the thing being served",
      body: "After adding llms.txt.liquid, fetch the file and look for a string that only exists in your template. If you see Shopify's generated content instead, the template did not take effect — check the filename exactly, and confirm you edited the published theme rather than a duplicate.",
      code: {
        language: "bash",
        content: 'curl -s https://yourstore.com/llms.txt | grep -i "notes for agents"',
      },
    },
    {
      title: "Check for a leftover redirect shadowing the path",
      body: "In Shopify admin, open Online Store → Navigation → URL Redirects and search for /llms.txt. A redirect left over from the old workaround takes precedence over the template and is the most common reason an override appears to do nothing.",
    },
  ],

  limitations: [
    "Shopify's generated file describes your store, not your marketing. If your store data is thin, the file will be thin — the template cannot invent facts.",
    "Overriding llms.txt.liquid makes that file yours to maintain. Shopify stops keeping it aligned with /agents.md, and nothing will remind you when your catalogue or policies change.",
    "The available Liquid surface at this path is narrow, so a genuinely dynamic file built from live catalogue data is not possible here the way it would be in a normal template.",
    "llms.txt is a proposed convention. Shopify serving it does not mean any assistant is obliged to read it, and no engine has committed to using it as a ranking or citation input.",
  ],

  verifiedDate: "2026-08-15",
  sources: [
    {
      label: "Shopify — llms.txt.liquid template reference",
      url: "https://shopify.dev/docs/storefronts/themes/architecture/templates/llms-txt-liquid",
      kind: "primary",
    },
    {
      label: "Shopify changelog — Customize /llms.txt, /llms-full.txt and /agents.md (28 May 2026)",
      url: "https://shopify.dev/changelog/customize-llmstxt-llms-fulltxt-and-agentsmd",
      kind: "primary",
    },
    {
      label: "Shopify — llms-full.txt.liquid template reference",
      url: "https://shopify.dev/docs/storefronts/themes/architecture/templates/llms-full-txt-liquid",
      kind: "primary",
    },
  ],

  relatedServices: [
    { label: "Shopify development", href: "/shopify-development" },
    { label: "AI search readiness (AEO)", href: "/answer-engine-optimization" },
  ],
  relatedGuides: ["nextjs", "wordpress"],
};
