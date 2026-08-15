import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { LlmsTxtTool } from "@/components/tools/llms-txt-tool";

const url = "https://stillawakemedia.com/tools/llms-txt-generator";

export const metadata: Metadata = {
  title: "Free llms.txt Generator + AI Readiness Check",
  description:
    "Generate an llms.txt file for your website and see what an answer engine can — and cannot — tell about your business. Free, no signup, no email required.",
  alternates: { canonical: url, languages: { "en-CA": url, "x-default": url } },
  openGraph: {
    title: "Free llms.txt Generator + AI Readiness Check",
    description:
      "Generate llms.txt and find out what ChatGPT, Perplexity and Google AI Overviews can actually tell about your business.",
    url,
    type: "website",
  },
};

/**
 * The checks, described exactly as `src/lib/llms-txt/analyze.ts` implements
 * them. Kept in the same order as the findings the tool returns, so the page
 * and the output cannot tell different stories. If a check changes, this list
 * changes with it.
 */
const CHECKS = [
  {
    name: "Organization identity",
    detail:
      "Looks for an Organization (or subtype) node in your homepage JSON-LD and reads its name. This is weighted most heavily of anything checked: if a machine cannot resolve who owns the site, nothing else it finds is attributable to you.",
  },
  {
    name: "Business description",
    detail:
      "Takes the organization's description from structured data, falling back to your meta description. A site whose only self-description is a tagline gives an engine nothing concrete to repeat.",
  },
  {
    name: "Pricing signal",
    detail:
      "Scans the fetched pages for currency-shaped values ($, €, £, or an amount followed by CAD/USD/EUR/GBP). Deliberately conservative — a false positive here would tell you your pricing is discoverable when it is not.",
  },
  {
    name: "Service area",
    detail:
      "Reads areaServed from your organization markup. Without it, an assistant asked for someone “near me” has no basis to include you.",
  },
  {
    name: "Contact route",
    detail:
      "Looks for a mailto: link or a recognisable contact path, including the French /contactez and /nous-joindre forms.",
  },
  {
    name: "Founder or author entity",
    detail:
      "Finds a founder or Person entity. It follows @id references to nodes declared on other pages rather than marking them absent — referencing a shared entity by @id is the correct way to model this, and penalising it would mark down the sites doing it properly.",
  },
  {
    name: "External corroboration and declared languages",
    detail:
      "Collects sameAs profile links, plus the languages your site declares through its html lang attribute and any hreflang annotations.",
  },
  {
    name: "Existing llms.txt",
    detail:
      "Checks whether you already publish one, so you find out before writing a second.",
  },
] as const;

const LIMITS = [
  "It reads your homepage and up to twelve linked pages. A large site will have relevant facts it never sees, so treat a low score as a prompt to look, not a verdict.",
  "It reads what your site states, not what is true. A confident, well-marked-up page containing wrong facts scores well.",
  "It cannot tell you whether any AI system will actually cite you. Nothing can — that is the honest state of this field.",
  "Structured data is read from the homepage only. Organization markup that appears exclusively on an inner page will not be found.",
] as const;

const GUIDE_LINKS = [
  { href: "/tools/llms-txt/shopify", label: "Shopify", hint: "You already have one — check it first" },
  { href: "/tools/llms-txt/nextjs", label: "Next.js", hint: "Route handler vs static file" },
  { href: "/tools/llms-txt/wordpress", label: "WordPress", hint: "Plugin behaviour vs a file you own" },
] as const;

const FAQS = [
  {
    q: "What is llms.txt?",
    a: "A plain-text file at the root of your website that tells AI systems what your site is and which pages matter. It is to answer engines roughly what robots.txt is to crawlers: a short, machine-readable statement you write yourself, instead of leaving the summary to be inferred.",
  },
  {
    q: "Where do I put the file?",
    a: "At the root of your domain, so it resolves at https://yoursite.com/llms.txt. It must be served as plain text.",
  },
  {
    q: "Does llms.txt actually do anything yet?",
    a: "It is a proposed convention, not a standard any engine is obliged to honour, and adoption is early. We say that plainly because most tools do not. The reason to publish one is that it costs almost nothing and it makes you decide what your own summary should say — and that exercise is worth more than the file.",
  },
  {
    q: "Why does this tool show warnings instead of just generating a file?",
    a: "Because the file is the easy part. If your site has no organization markup, no stated pricing and no declared service area, an answer engine still cannot describe you — with or without llms.txt. The warnings are the part that changes whether you get recommended.",
  },
  {
    q: "Do you store my site's content?",
    a: "No. Pages are fetched, analysed in memory, and discarded when the response is sent. Nothing is written to a database and no email is required.",
  },
];

export default function LlmsTxtGeneratorPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/tools/llms-txt-generator" />

      <section className="px-6 pt-32 pb-12">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#8C8080]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/tools" className="hover:text-white">
                  Tools
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#C7B9B9]">llms.txt generator</li>
            </ol>
          </nav>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Free tool</p>
          <h1 className="geist mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
            llms.txt generator, plus the part everyone skips.
          </h1>
          <p className="mt-7 text-lg text-[#C7B9B9]">
            Most generators crawl your site and hand back a list of your pages. That tells an
            AI what exists, not who you are. This one looks for the facts an answer engine
            actually needs — who owns the site, what you sell, where you work, what it costs —
            and tells you which ones are missing.
          </p>
          <p className="mt-4 text-sm text-[#C7B9B9]">
            Free. No signup, no email, nothing stored.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <LlmsTxtTool />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.04em]">What this actually checks</h2>
          <p className="mt-5 text-[#C7B9B9]">
            No black box. The analyser fetches your homepage and up to twelve linked pages, reads them
            once in memory, and looks for the specific facts an answer engine needs before it will
            describe a business. Here is the whole list.
          </p>

          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {CHECKS.map((c) => (
              <div key={c.name} className="py-5">
                <dt className="font-semibold text-white">{c.name}</dt>
                <dd className="mt-2 text-sm text-[#C7B9B9]">{c.detail}</dd>
              </div>
            ))}
          </dl>

          <h3 className="geist mt-12 text-xl font-black tracking-[-0.04em]">
            What it cannot tell you
          </h3>
          <ul className="mt-5 space-y-3">
            {LIMITS.map((l) => (
              <li key={l} className="flex gap-3 text-[#C7B9B9]">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8C8080]" />
                <span>{l}</span>
              </li>
            ))}
          </ul>

          <h3 className="geist mt-12 text-xl font-black tracking-[-0.04em]">
            How it handles your site
          </h3>
          <p className="mt-4 text-[#C7B9B9]">
            Requests are rate-limited and the fetcher validates the addresses a hostname resolves to
            before it connects, so the endpoint cannot be pointed at internal or private network ranges.
            Pages are analysed in memory and discarded when the response is sent — nothing is written to
            a database, and no email is required.
          </p>
        </div>
      </section>

      <section className="px-6 pb-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.04em]">
            Putting the file on your platform
          </h2>
          <p className="mt-4 text-[#C7B9B9]">
            Generating the file and serving it are different problems, and the second one is
            platform-specific in ways most guides skip. These are checked against each platform&apos;s own
            documentation and carry the date they were last verified.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-3">
            {GUIDE_LINKS.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="block h-full rounded-lg border border-white/10 p-5 transition hover:border-white/40"
                >
                  <span className="geist block font-black tracking-[-0.03em]">{g.label}</span>
                  <span className="mt-2 block text-sm text-[#8C8080]">{g.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-16">
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
          <p className="mt-10 text-[#C7B9B9]">
            Built and maintained by{" "}
            <Link href="/founder/jaeden-doody" className="underline hover:text-white">
              Jaeden Doody
            </Link>{" "}
            at{" "}
            <Link href="/" className="underline hover:text-white">StillAwake Media</Link>, a
            Montréal studio that does{" "}
            <Link href="/answer-engine-optimization" className="underline hover:text-white">
              answer engine optimization
            </Link>{" "}
            and{" "}
            <Link
              href="/stillawake-times/what-is-technical-seo"
              className="underline hover:text-white"
            >
              technical SEO
            </Link>
            . The same checks run against this site — see{" "}
            <Link href="/llms.txt" className="underline hover:text-white">
              our own llms.txt
            </Link>
            .
          </p>
          <p className="mt-4 text-sm text-[#8C8080]">
            More free tools and platform guides:{" "}
            <Link href="/tools" className="underline hover:text-white">
              StillAwake tools
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
