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
            Built by{" "}
            <Link href="/" className="underline hover:text-white">StillAwake Media</Link>, a
            Montréal studio that does{" "}
            <Link href="/answer-engine-optimization" className="underline hover:text-white">
              answer engine optimization
            </Link>{" "}
            and{" "}
            <Link href="/technical-seo" className="underline hover:text-white">technical SEO</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
