import type { PlatformGuide } from "@/lib/llms-txt-guides/types";

/**
 * WordPress.
 *
 * The highest measured demand of the platform variants, and the one where the
 * ranking pages are least useful — most of them say "install a plugin or
 * upload a file" and stop. The genuinely useful information is what the
 * plugins actually do: Yoast writes a *physical* file to the web root and
 * refreshes it on a weekly schedule, caps each content type at five entries,
 * and refuses to overwrite an existing llms.txt. Every one of those behaviours
 * surprises people, and none of them is visible from the settings screen.
 *
 * Deliberately not an anti-WordPress page. The plugin route is a reasonable
 * answer for most WordPress sites and this guide says so.
 */
export const wordpressGuide: PlatformGuide = {
  slug: "wordpress",
  platform: "WordPress",
  locale: "en",
  status: "verified",

  primaryKeyword: "llms txt wordpress",
  secondaryKeywords: [
    "wordpress llms.txt",
    "add llms.txt to wordpress",
    "yoast llms.txt",
    "llms.txt plugin wordpress",
  ],

  title: "llms.txt on WordPress: Plugin vs Static File (2026)",
  description:
    "How the WordPress llms.txt plugins actually work — Yoast writes a physical file and refreshes it weekly, capped at five entries per content type — plus when a hand-maintained file is the better answer, and how to verify which one your site is really serving.",

  intro:
    "There are three ways to get an llms.txt onto a WordPress site: let an SEO plugin generate one, serve one from a plugin that handles the URL dynamically, or upload a file to your web root yourself. They are not equivalent, and the differences are not visible from the settings screen. Yoast SEO, for example, writes a real file to your web root and refreshes it on a weekly schedule — not when you publish — and includes only the five most recently updated items per content type. That is a perfectly reasonable default, but it is not what most people picture when a plugin says it generates the file automatically. This page covers what each approach actually does so you can pick deliberately.",

  supportStatus: {
    kind: "plugin",
    summary:
      "No core WordPress support. Yoast SEO generates an llms.txt as a built-in feature you enable; dedicated plugins serve it via rewrite rules; or you upload a static file yourself. All three work — they fail differently.",
  },

  fileLocation:
    "https://yoursite.com/llms.txt. Physically, either a real file in the web root — the folder containing wp-config.php — or a virtual URL handled by a plugin's rewrite rule with no file on disk.",
  implementationMethod:
    "Three options: (1) Yoast SEO writes a physical file to the web root on a weekly scheduled action; (2) a dedicated plugin registers a rewrite rule and renders the file on request, typically with its own cache; (3) you upload a static file over SFTP.",

  prerequisites: [
    "Admin access to WordPress if you are using a plugin, or SFTP/file-manager access to the web root if you are uploading a file yourself.",
    "A decision about who owns the file's accuracy — the plugin's selection rules, or you. This is the actual choice being made here.",
  ],

  steps: [
    {
      title: "Check whether you already have one",
      body: "Before installing anything, open https://yoursite.com/llms.txt. An SEO plugin you already run may have generated one, and a file you forgot about may be sitting in the web root. This matters more on WordPress than elsewhere, because a physical file on disk takes precedence over a plugin's rewrite rule — so an old upload can silently shadow a plugin you later enable.",
      code: {
        language: "bash",
        content: 'curl -sI https://yoursite.com/llms.txt | grep -iE "^(HTTP|content-type)"\ncurl -s  https://yoursite.com/llms.txt | head -n 30',
      },
    },
    {
      title: "Option A — enable it in Yoast SEO",
      body: "Yoast SEO includes llms.txt generation for free and premium users; you enable it in the site feature settings and it needs no other setup. Understand what you are getting: Yoast writes a physical file into the web root, resolving the path via get_home_path() and falling back to the server document root. It then refreshes that file on a weekly scheduled action rather than on publish, so newly published content can take up to a week to appear.",
    },
    {
      title: "Option B — use a dedicated plugin if you want dynamic behaviour",
      body: "Plugins built specifically for this, such as the LLMs.txt Builder plugin on WordPress.org, take a different approach: they register rewrite rules and render the response on request, usually with their own cache layer — a 24-hour cache in that plugin's case — and often generate an llms-full.txt with excerpts alongside it. That suits sites with a lot of content or custom post types you want represented. It also means the file exists only as a route, which is worth knowing when you go looking for it on disk.",
    },
    {
      title: "Option C — write the file yourself and upload it",
      body: "Upload an llms.txt to the web root — the same folder as wp-config.php — over SFTP or your host's file manager. This is the only option that gives you full editorial control over what the file says, which for a business site is usually the thing that matters: a curated twenty-line file that states who you are, what you sell and what it costs beats an auto-generated list of your five most recent blog posts. The cost is that nothing updates it but you.",
    },
    {
      title: "Fix the facts the file is generated from",
      body: "Whichever route you take, the generated file can only restate what your site already says. If your homepage does not name what you sell, your pricing lives only in a PDF, and no page states your service area, then a perfectly formatted llms.txt will not make an assistant able to describe you. On most WordPress sites this is where the real work is.",
    },
  ],

  example: {
    caption:
      "A hand-written llms.txt for a WordPress business site. Short and specific beats long and generated.",
    language: "markdown",
    content: `# Example Plumbing Co.

> Licensed plumbing contractor serving Laval and the North Shore since 2009.

Service area: Laval, Blainville, Terrebonne (Quebec, Canada)
Phone and emergency hours are published on the contact page.

## Services

- Emergency repairs — 24/7 callout — https://example.com/emergency
- Drain cleaning — from $150 CAD — https://example.com/drains
- Water heater replacement — quoted on site — https://example.com/water-heaters

## Key pages

- [About and licensing](https://example.com/about)
- [Service area](https://example.com/service-area)
- [Contact](https://example.com/contact)`,
  },

  gotchas: [
    {
      title: "Yoast refreshes the file weekly, not when you publish",
      body:
        "Yoast's llms.txt is generated once and then updated by a weekly scheduled action. That is fine for a stable business site and misleading if you assumed 'automatic' meant 'on publish'. If you have just launched a page you want represented, it will not appear immediately — and if your WP-Cron is unreliable, as it is on sites with little traffic or with DISABLE_WP_CRON set, the refresh may not run when you expect at all.",
    },
    {
      title: "Yoast will not overwrite a file on disk — but it does outrank a plugin",
      body:
        "Two different situations get conflated here, and they resolve in opposite directions. If a physical llms.txt already sits at the web root, Yoast leaves it alone — its spec says it makes sure not to overwrite it — so you can enable the feature, see the setting switched on, and watch /llms.txt never change. But if another plugin is serving llms.txt dynamically, there is no file on disk for Yoast to respect: it writes its own physical file, and that file is what visitors get. Yoast's spec states this outright — the generated file 'has higher prio, it will be displayed'. The mechanism is the web server, not WordPress: under the standard configuration an existing file at the document root is served before the request is ever handed to PHP, so the other plugin's rewrite rule never runs. That is a server-configuration behaviour, not a WordPress rule — a host that routes every request through PHP unconditionally would invert it — so check what is actually being served rather than reasoning from which plugin you enabled last.",
    },
    {
      title: "Only the five most recent items per content type are included",
      body:
        "Yoast selects the top five most recently updated posts, pages or custom post type entries published within the last twelve months, prioritising cornerstone content, plus the top five categories or tags by attached content. That is a curation strategy, not an index. Your best-performing guide from two years ago will not be in the file, which is a good reason to mark it as cornerstone or to maintain the file by hand.",
    },
    {
      title: "There is a short 404 window right after you enable it",
      body:
        "For roughly the first five minutes after activation the View button points at a 404 while the file is generated. People assume the feature failed and start uninstalling. Wait, then re-check.",
    },
    {
      title: "A physical file at the web root sits outside WordPress caching",
      body:
        "Because the Yoast and manual-upload approaches write a real file, your WordPress caching plugin has nothing to purge — the file is served by the web server directly, and any CDN in front of it caches it on its own terms. Purging WordPress cache after editing the file does nothing; purge at the CDN instead.",
    },
    {
      title: "Custom post types need to be visible in search to be eligible",
      body:
        "Yoast only considers custom post types with 'Show in search results' enabled, and custom taxonomy terms only when 'Show terms in search results' is on. If a post type you care about is missing from the file, that setting is the first place to look.",
    },
  ],

  verificationMethod: [
    {
      title: "Confirm the endpoint and content type",
      body: "You want HTTP 200 and a plain-text content type. An HTML content type usually means WordPress is routing the request to a page or a 404 template rather than serving a file, which tells you the rewrite rule is not registered or the file is not where you think it is.",
      code: {
        language: "bash",
        content: 'curl -sI https://yoursite.com/llms.txt | grep -iE "^(HTTP|content-type)"',
      },
    },
    {
      title: "Determine whether it is a real file or a plugin route",
      body: "This tells you which system owns the file, which is the thing you need to know before editing anything. Check the web root over SFTP: if llms.txt is there on disk, it is a physical file — Yoast's or your own upload. If it is not on disk but the URL still returns content, a plugin is rendering it through a rewrite rule and editing files will achieve nothing.",
    },
    {
      title: "Confirm it reflects your current content",
      body: "Compare the pages listed against what you have published recently. If the file names content from months ago and misses your newest pages, you are looking at either the weekly refresh lag or a stale plugin cache — and on a low-traffic site, possibly a WP-Cron job that is not firing.",
    },
  ],

  limitations: [
    "Plugin-generated files reflect the plugin's selection rules, not your editorial judgement. Five recent posts is rarely the best twenty lines you could write about your business.",
    "A static uploaded file has no update mechanism at all. It is correct the day you write it and drifts from then on, which is the trade you are making for control.",
    "Serving the file requires access to the web root or a plugin with rewrite permissions. Some managed hosting plans restrict one or both, and hosts with aggressive edge caching may serve a stale copy after you change it.",
    "llms.txt is a proposed convention, not a standard any engine is obliged to honour. Google's John Mueller has publicly questioned the proposal and noted that LLMs are not actively looking for these files — worth keeping in view before paying for a plugin on the strength of ranking claims.",
  ],

  verifiedDate: "2026-08-15",
  sources: [
    {
      label: "Yoast developer portal — llms.txt functional specification",
      url: "https://developer.yoast.com/features/llms-txt/functional-specification/",
      kind: "primary",
    },
    {
      label: "Yoast — llms.txt feature overview",
      url: "https://yoast.com/features/llms-txt/",
      kind: "primary",
    },
    {
      label: "LLMs.txt Builder — WordPress.org plugin directory",
      url: "https://wordpress.org/plugins/nt-llms-txt-builder/",
      kind: "primary",
    },
    {
      label: "Search Engine Journal — Yoast SEO adds llms.txt support",
      url: "https://www.searchenginejournal.com/yoast-seo-wordpress-plugin-adds-support-for-llms-txt/549220/",
      kind: "secondary",
    },
  ],

  relatedServices: [
    { label: "AI search readiness (AEO)", href: "/answer-engine-optimization" },
    { label: "Website redesign", href: "/website-redesign" },
  ],
  relatedGuides: ["shopify", "nextjs"],
};
