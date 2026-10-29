import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { SchemaGeneratorTool } from "@/components/tools/schema-generator-tool";

const url = "https://stillawakemedia.com/tools/schema-markup-generator";

/**
 * Keyword Planner, 2026-10-29: "schema markup generator" 1,000/mo US and
 * 110/mo CA, "faq schema generator" 390/mo US, "json ld generator" 140/mo US
 * (rising), "local business schema generator" 110/mo US — all LOW
 * competition. One tool owns the whole cluster; the type picker covers the
 * long-tail variants rather than a page per type.
 */
export const metadata: Metadata = {
  title: "Free Schema Markup Generator (JSON-LD) with Validation",
  description:
    "Generate JSON-LD schema markup for a local business, organization, article, product, breadcrumbs, FAQ or person. Checks required fields and formats as you type. Free, nothing stored.",
  alternates: { canonical: url },
  openGraph: {
    title: "Free Schema Markup Generator (JSON-LD) with Validation",
    description:
      "JSON-LD for seven schema.org types, checked against Google's required and recommended properties as you type.",
    url,
    type: "website",
  },
};

const TYPES = [
  ["Local business", "Name and full postal address are required by Google. Phone, opening hours, coordinates and a photo are recommended. Subtypes such as ProfessionalService or Restaurant are available."],
  ["Organization", "Google requires nothing, but recommends as many true properties as apply. Name, URL, logo and sameAs links to your profiles elsewhere matter most for identifying you."],
  ["Article / BlogPosting / NewsArticle", "No required properties. Headline, author with a profile URL, dates and images are recommended. The tool checks that the modified date isn't earlier than the published date."],
  ["Product", "Needs a name plus a price, or a rating with its review count. Price must be a plain number and currency a three-letter code such as CAD."],
  ["Breadcrumbs", "At least two levels. Every level except the current page needs its URL."],
  ["FAQ page", "Still valid schema.org, but Google retired the FAQ rich result on 7 May 2026. Use it for other systems that read it, not for a Google result."],
  ["Person", "Name, plus a profile URL, job title, employer and sameAs links so the name resolves to one person."],
] as const;

const FAQS = [
  {
    q: "Will schema markup get my page a rich result or into AI answers?",
    a: "Not by itself. Google says features that consume structured data aren't guaranteed to appear, and that there's no special markup needed to appear in AI Overviews or AI Mode. Markup helps machines read facts that are already true and visible on the page. It can't add facts the page doesn't state.",
  },
  {
    q: "Where do I put the JSON-LD?",
    a: "Inside a <script type=\"application/ld+json\"> tag in the page's HTML, in the head or the body. Most CMSs have a custom-code or header-scripts field; in a framework, render it from the page template. Mark up only content visible on that page.",
  },
  {
    q: "Should every page have Organization markup?",
    a: "Declare your Organization once, usually on the homepage, with a stable @id, and reference it from other pages. Repeating slightly different copies across pages gives parsers conflicting facts.",
  },
  {
    q: "Why does the tool still offer FAQPage if the rich result is gone?",
    a: "Because people still search for it and other systems read it. The tool says plainly that it won't produce a Google rich result, so you can decide whether it's worth adding.",
  },
  {
    q: "Is anything I type stored?",
    a: "No. The generator runs entirely in your browser. Nothing is sent to our server.",
  },
];

export default function SchemaMarkupGeneratorPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/tools/schema-markup-generator" />

      <section className="px-6 pt-32 pb-10">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#8C8080]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-[#C7B9B9]">Schema markup generator</li>
            </ol>
          </nav>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Free tool</p>
          <h1 className="geist mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
            Schema markup generator, with the checks built in.
          </h1>
          <p className="mt-7 max-w-3xl text-lg text-[#C7B9B9]">
            Pick a type, fill in what is true on your page, and copy valid JSON-LD. As you type, the tool flags
            missing required properties, gaps Google recommends filling, and values in the wrong format: a
            price with a dollar sign, a date written 29/10/2026, opening hours a parser can&apos;t read.
          </p>
          <p className="mt-4 text-sm text-[#C7B9B9]">Free. No signup. Runs in your browser; nothing is sent anywhere.</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SchemaGeneratorTool />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.04em]">What it checks, type by type</h2>
          <p className="mt-5 text-[#C7B9B9]">
            Requirement levels follow Google Search Central&apos;s structured-data documentation, checked 29 October
            2026. Where Google requires nothing (Organization, Article, Person), the tool still asks for a name or
            headline, because markup without one describes nothing.
          </p>
          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {TYPES.map(([name, detail]) => (
              <div key={name} className="py-5">
                <dt className="font-semibold text-white">{name}</dt>
                <dd className="mt-2 text-sm text-[#C7B9B9]">{detail}</dd>
              </div>
            ))}
          </dl>

          <h2 className="geist mt-14 text-3xl font-black tracking-[-0.04em]">What markup can&apos;t do</h2>
          <ul className="mt-5 space-y-3 text-[#C7B9B9]">
            <li>It doesn&apos;t guarantee a rich result. Google decides whether to show one, page by page.</li>
            <li>It isn&apos;t required for Google&apos;s AI Overviews or AI Mode. Google&apos;s guidance is that no special schema is needed to appear there.</li>
            <li>It has to match the page. Marking up a rating, price or address that visitors can&apos;t see is against Google&apos;s guidelines and can lead to a manual action.</li>
            <li>It doesn&apos;t replace content. If a fact isn&apos;t clearly stated on the page, adding it to the markup doesn&apos;t make the page answer the question.</li>
          </ul>
          <p className="mt-6 text-[#C7B9B9]">
            Where it does help: it states your business name, address, prices, authors and dates in a form machines
            don&apos;t have to guess at. For a site that already says those things clearly, that removes ambiguity.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
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
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">Related</h2>
            <ul className="mt-4 space-y-2 text-[#C7B9B9]">
              <li><Link href="/tools/llms-txt" className="underline hover:text-white">What is llms.txt?</Link> Another machine-readable file, with its own limits.</li>
              <li><Link href="/tools/llms-txt-generator" className="underline hover:text-white">llms.txt generator and AI readiness check</Link> reads your homepage markup and reports what&apos;s missing.</li>
              <li><Link href="/local-seo" className="underline hover:text-white">Local SEO</Link>: where LocalBusiness markup fits alongside your Google Business Profile.</li>
              <li><Link href="/answer-engine-optimization" className="underline hover:text-white">Answer engine optimization</Link>: how we work on being described accurately by AI assistants.</li>
            </ul>
          </div>

          <p className="mt-10 text-sm text-[#8C8080]">
            Built and maintained by{" "}
            <Link href="/founder/jaeden-doody" className="underline hover:text-white">Jaeden Doody</Link> at{" "}
            <Link href="/" className="underline hover:text-white">StillAwake Media</Link>, a Montréal web studio. More
            free tools: <Link href="/tools" className="underline hover:text-white">StillAwake tools</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
