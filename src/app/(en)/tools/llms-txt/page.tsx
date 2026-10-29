import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { publishedGuides } from "@/data/llms-txt-guides";

const url = "https://stillawakemedia.com/tools/llms-txt";
const CHECKED = "2026-10-29";

/**
 * The "what is llms.txt" intent, kept off the generator page on purpose:
 * Google's top 10 for "what is llms.txt" is explainers (llmstxt.org, Chrome's
 * Lighthouse docs, GitBook, Semrush, Ahrefs), a different intent from "llms
 * txt generator". Keyword Planner, 2026-10-29: "llms txt" 5,400/mo US and
 * 880/mo CA, "what is llms txt" 480/mo US, "llms txt example" 170/mo US.
 * This page is the parent of the platform guides under /tools/llms-txt/*.
 *
 * Every measurement in EXAMPLES was taken with curl on CHECKED. Re-measure
 * before changing the date.
 */
export const metadata: Metadata = {
  title: "What Is llms.txt? Real Examples, Limits and How to Add One",
  description:
    "What an llms.txt file is, what it looks like on eight real sites (measured), what Google says it does and doesn't do, and how to add one without overselling it.",
  alternates: { canonical: url },
  openGraph: {
    title: "What Is llms.txt? Real Examples, Limits and How to Add One",
    description:
      "The llms.txt format, eight real files measured side by side, Google's June 2026 position, and practical steps for adding one.",
    url,
    type: "article",
    modifiedTime: CHECKED,
  },
};

const EXAMPLES = [
  { site: "llmstxt.org", url: "https://llmstxt.org/llms.txt", kb: 0.6, links: 3, h2: 1, optional: false, note: "The proposal's own file. A title, a one-line summary, and three links to Markdown docs." },
  { site: "Svelte", url: "https://svelte.dev/llms.txt", kb: 1.7, links: 7, h2: 3, optional: false, note: "Mostly links to full, medium and small versions of the docs, so a model can pick a size that fits its context." },
  { site: "Vercel", url: "https://vercel.com/llms.txt", kb: 5.4, links: 28, h2: 9, optional: true, note: "Opens with a 'When to use Vercel' section, then points to deeper indexes. Uses the Optional section as the spec suggests." },
  { site: "Shopify", url: "https://www.shopify.com/llms.txt", kb: 12.5, links: 71, h2: 12, optional: false, note: "A marketing-site file: what Shopify is, then sections by task (start a business, sell online), each link with a one-line description." },
  { site: "Next.js", url: "https://nextjs.org/llms.txt", kb: 14.4, links: 51, h2: 5, optional: false, note: "Says what the site is the source of truth for, which tells a model when to prefer it over other sources." },
  { site: "Cloudflare developer docs", url: "https://developers.cloudflare.com/llms.txt", kb: 16.8, links: 112, h2: 9, optional: false, note: "A file of files: each product links to its own llms.txt rather than listing every page here." },
  { site: "StillAwake Media (ours)", url: "https://stillawakemedia.com/llms.txt", kb: 77.0, links: 245, h2: 10, optional: false, note: "Too long for what the spec intends: it listed every article and game wiki page with no Optional section. Measuring it for this page is how we noticed; those lists now sit under ## Optional." },
  { site: "Stripe docs", url: "https://docs.stripe.com/llms.txt", kb: 97.3, links: 467, h2: 27, optional: true, note: "The largest here, and the only one that starts with direct instructions to coding agents (check the latest package version) instead of a summary blockquote." },
] as const;

const COMPARE = [
  ["robots.txt", "Which crawlers may fetch which URLs.", "Yes: a long-standing standard that major crawlers follow."],
  ["sitemap.xml", "Which URLs exist and when they changed.", "Yes: search engines use it to discover pages."],
  ["Structured data (JSON-LD)", "Facts about the page: business, article, product.", "Partly: Google uses it for some rich results, without guarantees."],
  ["llms.txt", "A short Markdown summary of the site and its most useful pages, written for language models.", "No: a 2024 proposal. Google says Search doesn't need it."],
] as const;

const MISTAKES = [
  ["Listing every URL", "That's what the sitemap is for. The file is meant to be short: the pages a model should read first, with a line on why. Put the long tail under ## Optional."],
  ["Writing marketing copy", "\"The leading solution for…\" gives a model nothing to repeat. Say plainly what you do, for whom, where, and what it costs."],
  ["Facts that contradict the site", "If the file says one price and the pricing page another, you've created the inconsistency you were trying to remove. Generate it from the same data as your pages if you can."],
  ["Serving it as HTML", "It should return plain text or Markdown at /llms.txt with a 200 status. A 404 page or a redirect to your homepage doesn't count."],
  ["Expecting it to fix visibility", "If your site never states your service area, prices or who runs it, the file can't make an assistant describe you accurately. Fix the pages first."],
] as const;

const FAQS = [
  {
    q: "What is llms.txt in one sentence?",
    a: "A Markdown file at yoursite.com/llms.txt that gives language models a short summary of your site and links to the pages most worth reading.",
  },
  {
    q: "Who created llms.txt?",
    a: "Jeremy Howard proposed it on llmstxt.org on 3 September 2024. The site describes it as a proposal open for community input, not a standard any company is obliged to follow.",
  },
  {
    q: "Does Google use llms.txt?",
    a: "No. In June 2026 Google added a note to its documentation saying these files aren't needed for Google Search and won't positively or negatively affect visibility or rankings. Google also says no special files or markup are needed to appear in AI Overviews or AI Mode.",
  },
  {
    q: "Does ChatGPT, Claude or Perplexity read it?",
    a: "There's no public, verifiable commitment from those products to read llms.txt when answering ordinary questions, so we don't claim one. It is used by some developer tools and documentation workflows that fetch it deliberately. Treat it as cheap, harmless and possibly useful, not as a ranking lever.",
  },
  {
    q: "Is llms.txt the same as robots.txt?",
    a: "No. robots.txt controls which crawlers may fetch what. llms.txt doesn't allow or block anything; it only describes. Blocking AI crawlers is done in robots.txt.",
  },
  {
    q: "What is llms-full.txt?",
    a: "A convention some sites use for a second file containing full page text rather than links. It isn't part of the llmstxt.org proposal, which instead suggests offering a Markdown version of each page at the same URL with .md appended.",
  },
];

export default function WhatIsLlmsTxtPage() {
  const guides = publishedGuides("en");
  return (
    <main className="bg-black text-white">
      <PageSchema route="/tools/llms-txt" />

      <article>
        <section className="px-6 pt-32 pb-10">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#8C8080]">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-[#C7B9B9]">What is llms.txt?</li>
              </ol>
            </nav>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Guide</p>
            <h1 className="geist mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">What is llms.txt?</h1>
            <p className="mt-4 text-xs text-[#8C8080]">
              By <Link href="/founder/jaeden-doody" className="underline hover:text-white">Jaeden Doody</Link>, StillAwake Media. Examples measured <time dateTime={CHECKED}>29 October 2026</time>.
            </p>

            <div className="mt-8 rounded-2xl border border-[#D71920]/35 bg-[#D71920]/[.07] p-6">
              <p className="text-[1.08rem] leading-8 text-[#ece6e6]">
                <strong>llms.txt is a plain Markdown file at the root of a website</strong> (yoursite.com/llms.txt) that
                summarises what the site is and links to the pages a language model should read first. It was proposed in
                September 2024 and is not a standard. Google says Search doesn&apos;t use it. It can help tools that
                fetch it on purpose, but no AI product has publicly committed to reading it for everyday answers.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.04em]">What the file looks like</h2>
            <p className="mt-5 text-[#C7B9B9]">
              The proposal on llmstxt.org defines a short structure. Only the first line is required; the rest is
              optional and goes in this order:
            </p>
            <ol className="mt-5 list-decimal space-y-2 pl-6 text-[#C7B9B9] marker:text-[#D71920]">
              <li>An H1 with the site or project name. <span className="text-white">The only required part.</span></li>
              <li>A blockquote with a one-paragraph summary.</li>
              <li>Any plain paragraphs or lists with more detail (no headings).</li>
              <li>H2 sections, each a list of links in the form <code className="text-white">- [Name](url): note</code>.</li>
              <li>An <code className="text-white">## Optional</code> section for links a model can skip when it is short on space.</li>
            </ol>
            <p className="mt-5 text-[#C7B9B9]">A minimal file for a small business looks like this:</p>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 text-sm leading-6 text-[#e6dddd]"><code>{`# Example Plumbing

> Example Plumbing is a licensed plumbing company serving Laval and
> Montréal, Québec. Emergency repairs, water heaters and renovations.
> Service calls from $129 CAD.

Open Monday to Saturday, 7:00–19:00. Bilingual (English and French).

## Services
- [Emergency repairs](https://example.com/emergency): 24/7 call-outs and response times
- [Water heaters](https://example.com/water-heaters): installation and replacement, with prices

## About
- [Licences and insurance](https://example.com/about): RBQ licence number and coverage
- [Contact](https://example.com/contact): phone, email and service area map

## Optional
- [Blog](https://example.com/blog): maintenance tips and seasonal advice`}</code></pre>
            <p className="mt-4 text-sm text-[#8C8080]">
              Fictional business. Notice what it states: location, service area, hours, languages and a starting price.
              Those are the facts an assistant needs and most sites bury.
            </p>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-4xl">
            <h2 className="geist text-3xl font-black tracking-[-0.04em]">Eight real files, measured</h2>
            <p className="mt-5 max-w-3xl text-[#C7B9B9]">
              We fetched each file on 29 October 2026 and counted its size, links and H2 sections. They range from a
              third of a page to almost 100 KB, which says a lot about how loosely the proposal is followed.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10" role="region" aria-label="llms.txt files compared" tabIndex={0}>
              <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
                <caption className="sr-only">Eight llms.txt files compared, measured {CHECKED}</caption>
                <thead className="bg-white/[.05] text-xs uppercase tracking-[.12em] text-[#a9a0a0]">
                  <tr>
                    {["Site", "Size", "Links", "H2 sections", "## Optional", "What stands out"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLES.map((e) => (
                    <tr key={e.site} className="border-t border-white/[.07] align-top">
                      <th scope="row" className="px-4 py-3 font-semibold text-white">
                        <a href={e.url} target="_blank" rel="noopener" className="underline decoration-white/30 underline-offset-2 hover:decoration-white">{e.site}</a>
                      </th>
                      <td className="px-4 py-3 tabular-nums text-[#cfc8c8]">{e.kb.toFixed(1)} KB</td>
                      <td className="px-4 py-3 tabular-nums text-[#cfc8c8]">{e.links}</td>
                      <td className="px-4 py-3 tabular-nums text-[#cfc8c8]">{e.h2}</td>
                      <td className="px-4 py-3 text-[#cfc8c8]">{e.optional ? "Yes" : "No"}</td>
                      <td className="px-4 py-3 text-[#cfc8c8]">{e.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-3xl text-sm text-[#8C8080]">
              Links counts list items starting with a Markdown link. Only two of the eight use the Optional section, and
              Stripe skips the summary blockquote. Large companies treat the format as a loose convention, not a
              specification.
            </p>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.04em]">What llms.txt does and doesn&apos;t do</h2>
            <h3 className="mt-8 text-lg font-bold text-white">What Google says</h3>
            <p className="mt-3 text-[#C7B9B9]">
              In June 2026 Google added a note to its Search documentation: llms.txt files aren&apos;t needed for
              Google Search and won&apos;t positively or negatively affect visibility or rankings, though it&apos;s
              fine to keep one for other systems. Its guide to AI features also says you don&apos;t need new
              machine-readable files, AI text files or special markup to appear in AI Overviews or AI Mode.
            </p>
            <h3 className="mt-8 text-lg font-bold text-white">What other tools do with it</h3>
            <p className="mt-3 text-[#C7B9B9]">
              Chrome&apos;s Lighthouse has an llms.txt audit in its agentic-browsing category. It flags a server error
              when fetching the file and marks a missing file as not applicable, because providing one is optional.
              Developer tools and documentation assistants sometimes fetch a site&apos;s llms.txt deliberately, which
              is why documentation sites (Stripe, Cloudflare, Next.js, Svelte) were early adopters.
            </p>
            <h3 className="mt-8 text-lg font-bold text-white">What it can&apos;t do</h3>
            <ul className="mt-3 space-y-2 text-[#C7B9B9]">
              <li>It can&apos;t make an AI assistant mention or recommend you. Nothing can guarantee that.</li>
              <li>It can&apos;t block or allow AI crawlers. That&apos;s robots.txt.</li>
              <li>It can&apos;t fix a site that never states its own facts. If your pages don&apos;t say where you work or what you charge, a summary file is the only place that does, and that&apos;s a weak signal.</li>
            </ul>
            <p className="mt-5 text-[#C7B9B9]">
              So why publish one? It costs little, it&apos;s useful to the tools that do read it, and writing it forces
              you to decide what your one-paragraph description should be. Then make sure your homepage and service pages
              say the same thing.
            </p>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.04em]">llms.txt next to the files you already have</h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10" role="region" aria-label="Machine-readable files compared" tabIndex={0}>
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead className="bg-white/[.05] text-xs uppercase tracking-[.12em] text-[#a9a0a0]">
                  <tr>{["File", "What it tells machines", "Used by search engines?"].map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {COMPARE.map(([f, what, used]) => (
                    <tr key={f} className="border-t border-white/[.07] align-top">
                      <th scope="row" className="px-4 py-3 font-semibold text-white">{f}</th>
                      <td className="px-4 py-3 text-[#cfc8c8]">{what}</td>
                      <td className="px-4 py-3 text-[#cfc8c8]">{used}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.04em]">How to add one</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-6 text-[#C7B9B9] marker:text-[#D71920]">
              <li><span className="text-white">Write the summary first.</span> One paragraph: what you do, for whom, where, and a starting price if you publish one. Check that your homepage says the same.</li>
              <li><span className="text-white">Pick 5 to 20 pages.</span> Services, pricing, about, contact and your best guides. Give each a one-line note on what it answers.</li>
              <li><span className="text-white">Put everything else under ## Optional</span>, or leave it to your sitemap.</li>
              <li><span className="text-white">Serve it at /llms.txt</span> as plain text with a 200 status. How depends on your platform; see the guides below.</li>
              <li><span className="text-white">Keep it in sync.</span> Generate it from the same data as your pages if you can, or set a reminder to review it when prices or services change.</li>
            </ol>
            <p className="mt-6 text-[#C7B9B9]">
              Our <Link href="/tools/llms-txt-generator" className="text-white underline underline-offset-2">free llms.txt generator</Link>{" "}
              drafts the file from your site and reports which of those facts it couldn&apos;t find.
            </p>
            {guides.length > 0 && (
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/tools/llms-txt/${g.slug}`} className="block h-full rounded-lg border border-white/10 p-5 transition hover:border-white/40">
                      <span className="geist block font-black tracking-[-0.03em]">llms.txt on {g.platform}</span>
                      <span className="mt-2 block text-sm text-[#8C8080]">Verified {g.verifiedDate}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.04em]">Common mistakes</h2>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {MISTAKES.map(([m, why]) => (
                <div key={m} className="py-5">
                  <dt className="font-semibold text-white">{m}</dt>
                  <dd className="mt-2 text-sm text-[#C7B9B9]">{why}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="px-6 py-10 pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.04em]">Questions</h2>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {FAQS.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="text-lg font-bold text-white">{f.q}</h3>
                  <p className="mt-3 text-[#C7B9B9]">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.02] p-7">
              <h2 className="geist text-2xl font-black tracking-[-0.05em]">What actually moves AI visibility</h2>
              <p className="mt-3 text-[#C7B9B9]">
                Clear pages that state your facts, consistent information across the web, and independent sources that
                mention you. Read{" "}
                <Link href="/stillawake-times/what-is-generative-engine-optimization" className="text-white underline underline-offset-2">what generative engine optimization is</Link>,{" "}
                <Link href="/stillawake-times/can-chatgpt-recommend-my-business" className="text-white underline underline-offset-2">whether ChatGPT can recommend your business</Link>, or see{" "}
                <Link href="/answer-engine-optimization" className="text-white underline underline-offset-2">how we approach answer engine optimization</Link>.
                For page-level facts, try the{" "}
                <Link href="/tools/schema-markup-generator" className="text-white underline underline-offset-2">schema markup generator</Link>.
              </p>
            </div>
            <p className="mt-8 text-xs leading-6 text-[#8C8080]">
              Sources: llmstxt.org (proposal, v2); Google Search Central documentation updates, June 2026; Google Search
              Central, &ldquo;AI features and your website&rdquo;; Chrome for Developers, Lighthouse llms.txt audit. File
              measurements by StillAwake Media, {CHECKED}.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
