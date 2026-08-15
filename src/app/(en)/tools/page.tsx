import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { publishedGuides } from "@/data/llms-txt-guides";

const url = "https://stillawakemedia.com/tools";

export const metadata: Metadata = {
  title: "Free Technical Tools for Web and AI Search",
  description:
    "Free tools and implementation guides from StillAwake Media — starting with an llms.txt generator that reports what an answer engine cannot determine about your business. No signup, no email.",
  alternates: {
    canonical: url,
    languages: {
      "en-CA": url,
      "fr-CA": "https://stillawakemedia.com/fr/outils",
      "x-default": url,
    },
  },
  openGraph: {
    title: "Free Technical Tools — StillAwake Media",
    description:
      "Free, no-signup tools for checking how machines read your website, plus platform-by-platform implementation guides.",
    url,
    type: "website",
  },
};

const PLATFORM_LABEL: Record<string, string> = {
  shopify: "Shopify",
  nextjs: "Next.js",
  wordpress: "WordPress",
};

export default function ToolsPage() {
  const guides = publishedGuides("en");

  return (
    <main className="bg-black text-white">
      <PageSchema route="/tools" />

      <section className="px-6 pt-32 pb-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Free tools</p>
          <h1 className="geist mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
            Tools for the part of your website you cannot see.
          </h1>
          <p className="mt-7 text-lg text-[#C7B9B9]">
            Most website tools score what a page looks like to a person. These check what it looks like
            to a machine — a search crawler, an AI assistant, an agent trying to work out what your
            business does and whether it can quote you. We build them because we needed them on client
            work, and we publish them because a tool that only tells you what is wrong when you pay for
            it is not much of a tool.
          </p>
          <p className="mt-5 text-[#C7B9B9]">
            Everything here is free, runs without an account, and does not ask for an email. We do not
            store the sites you check.
          </p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em]">Tools</h2>

          <Link
            href="/tools/llms-txt-generator"
            className="mt-7 block rounded-xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[#D71920]/50"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Live</p>
            <h3 className="geist mt-4 text-2xl font-black tracking-[-0.05em]">
              llms.txt generator + AI readiness check
            </h3>
            <p className="mt-3 text-[#C7B9B9]">
              Generates an llms.txt for your site, then does the part other generators skip: it reports
              which facts an answer engine cannot find — who owns the business, what it sells, what it
              costs, where it operates — because those gaps are what stop you being described accurately,
              file or no file.
            </p>
            <p className="mt-4 text-sm text-[#8C8080]">Free · no signup · nothing stored →</p>
          </Link>

          <Link
            href="/tools/project-cost-calculator"
            className="mt-5 block rounded-xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[#D71920]/50"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Live</p>
            <h3 className="geist mt-4 text-2xl font-black tracking-[-0.05em]">
              Website &amp; project cost calculator
            </h3>
            <p className="mt-3 text-[#C7B9B9]">
              Runs the same pricing model we use internally to scope real work, so the range it returns
              is the range we would start from. Asks about your business rather than about technology —
              you never have to guess whether you need Shopify, an API or a booking engine.
            </p>
            <p className="mt-4 text-sm text-[#8C8080]">Free · no signup · nothing stored →</p>
          </Link>

          <p className="mt-8 text-sm text-[#8C8080]">
            More tools will appear here as we build them. We would rather publish one that does something
            useful than five that generate files.
          </p>
        </div>
      </section>

      {guides.length > 0 ? (
        <section className="px-6 py-10 pb-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">
              Implementation guides
            </h2>
            <p className="mt-3 text-[#C7B9B9]">
              How llms.txt actually works on specific platforms — verified against each platform&apos;s own
              documentation, with the version-specific behaviour that generic guides miss. Each carries the
              date its facts were last checked.
            </p>

            <ul className="mt-8 space-y-4">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/tools/llms-txt/${guide.slug}`}
                    className="block rounded-lg border border-white/10 p-6 transition hover:border-white/40"
                  >
                    <h3 className="geist text-xl font-black tracking-[-0.04em]">
                      llms.txt on {PLATFORM_LABEL[guide.slug] ?? guide.platform}
                    </h3>
                    <p className="mt-2 text-sm text-[#C7B9B9]">{guide.supportStatus.summary}</p>
                    <p className="mt-3 text-xs text-[#5F5757]">
                      Verified {guide.verifiedDate}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-14 rounded-xl border border-white/10 bg-white/[0.02] p-7">
              <h2 className="geist text-2xl font-black tracking-[-0.05em]">
                Want the strategy behind the file?
              </h2>
              <p className="mt-3 text-[#C7B9B9]">
                Publishing an llms.txt is a small technical task. Being the business an assistant actually
                recommends is a different problem — one about entities, evidence and how your site states
                what it does.
              </p>
              <Link
                href="/answer-engine-optimization"
                className="mt-6 inline-block rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
              >
                How we approach AI search
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
