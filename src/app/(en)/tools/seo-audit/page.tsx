import type { Metadata } from "next";
import { metaDescription } from "@/lib/meta-description";
import { OG_IMAGES } from "@/lib/og-image";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { SeoAuditTool } from "@/components/tools/seo-audit-tool";

const url = "https://stillawakemedia.com/tools/seo-audit";

/**
 * One public page per check, by design. A site-wide crawl from our servers
 * would be slower, easier to abuse and, without Search Console access, no
 * more able to say what Google has actually indexed. The page says so.
 */
export const metadata: Metadata = {
  title: "Free SEO Audit Tool: Check Any Page's Technical SEO",
  description:
    metaDescription(
    "Check one public page for the technical basics Google needs: status, redirects, noindex, robots.txt, canonical, sitemap, title, description, headings, structured data and more. Free, nothing stored.",
  ),
  alternates: { canonical: url },
  openGraph: {
    title: "Free SEO Audit Tool: Check Any Page's Technical SEO",
    description:
      "A plain-language technical check of one public page: indexability, crawl rules, canonical, metadata, headings and structured data.",
    url,
    type: "website",
    images: OG_IMAGES,
  },
};

const CHECKS = [
  ["Response", "The HTTP status, every redirect hop on the way to the final URL, HTTPS, and whether the server says it's HTML."],
  ["Indexing", "noindex in the robots meta tag or the X-Robots-Tag header, whether robots.txt lets Googlebot fetch the URL (using Google's longest-match rule), the canonical tag, sitemap listing, and hreflang self-reference."],
  ["Content", "Title and meta description, H1 count and heading order, how much text is in the HTML before any JavaScript runs, the lang attribute, the viewport tag, image alt attributes, and internal links."],
  ["Structured data", "Whether each JSON-LD block parses and which schema.org types it declares."],
  ["Sharing", "Open Graph title, description and image for link previews."],
] as const;

const FAQS = [
  {
    q: "Can this tell me whether Google has indexed my page?",
    a: "No. Only Google knows that, and it reports it in Search Console's URL Inspection tool to the verified owner. This check tells you whether anything on the page or the server would stop indexing. A page can pass every check and still not be indexed, because Google also weighs quality, duplication and how it found the URL.",
  },
  {
    q: "Why one page instead of my whole site?",
    a: "Problems are usually template-wide, so checking one page of each type (home, a service page, an article, a product) finds most of them. A full crawl from our server would be slow and easy to abuse. For a whole-site crawl, Search Console's Page indexing report or a desktop crawler such as Screaming Frog is the right tool.",
  },
  {
    q: "My page builds its content with JavaScript. Will the check see it?",
    a: "It reads the HTML your server sends, without running JavaScript. Google can render JavaScript, so a low word count here isn't proof Google sees an empty page. It does mean crawlers that don't render, including several AI tools, may see little or nothing.",
  },
  {
    q: "Does passing the structured-data check mean I'll get a rich result?",
    a: "No. The check confirms the JSON parses and lists its types. Eligibility depends on Google's per-feature requirements and on Google choosing to show it. Use Google's Rich Results Test for eligibility.",
  },
  {
    q: "Is anything stored? Can I check a page on my intranet?",
    a: "Nothing is stored. The check only fetches public internet addresses: private networks, localhost and cloud metadata addresses are refused, including after redirects. It identifies itself as StillAwakeSEOAuditBot, and it's limited to a few checks per minute per visitor.",
  },
];

export default function SeoAuditPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/tools/seo-audit" />

      <section className="px-6 pt-32 pb-10">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#8C8080]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-[#C7B9B9]">SEO audit</li>
            </ol>
          </nav>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Free tool</p>
          <h1 className="geist mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
            Free SEO audit for any public page.
          </h1>
          <p className="mt-7 max-w-3xl text-lg text-[#C7B9B9]">
            Paste a URL and get a plain-language report on what a crawler sees: the status and redirects, anything
            that blocks indexing, the canonical, whether the page is in your sitemap, and the title, headings and
            structured data. Each finding says why it matters and what to change.
          </p>
          <p className="mt-4 text-sm text-[#C7B9B9]">Free. No signup. Nothing is stored.</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SeoAuditTool />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.04em]">What it checks</h2>
          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {CHECKS.map(([name, detail]) => (
              <div key={name} className="py-5">
                <dt className="font-semibold text-white">{name}</dt>
                <dd className="mt-2 text-sm text-[#C7B9B9]">{detail}</dd>
              </div>
            ))}
          </dl>

          <h2 className="geist mt-14 text-3xl font-black tracking-[-0.04em]">What it can&apos;t tell you</h2>
          <ul className="mt-5 space-y-3 text-[#C7B9B9]">
            <li>Whether Google has indexed the page, or why it chose not to. That&apos;s in Search Console&apos;s URL Inspection and Page indexing reports, which only the site owner can see.</li>
            <li>Rankings, impressions or clicks. Those also live in Search Console.</li>
            <li>Content quality. A page can be technically perfect and still not be useful enough to index or rank.</li>
            <li>Page speed and Core Web Vitals. Use PageSpeed Insights, which reports real-user data where Google has it.</li>
            <li>Anything behind a login, or what JavaScript adds after the page loads.</li>
          </ul>

          <h2 className="geist mt-14 text-3xl font-black tracking-[-0.04em]">How to use the results</h2>
          <p className="mt-5 text-[#C7B9B9]">
            Fix problems marked <strong className="text-white">✕</strong> first: an error status, a noindex, a
            robots.txt block or conflicting canonicals can keep a page out of search no matter how good it is. Then
            work through the <strong className="text-white">!</strong> items, which affect how the page is understood
            and shown. Notes marked <strong className="text-white">i</strong> are context, not faults. Run the check
            on one page of each template, because most issues repeat across every page built from it.
          </p>
          <p className="mt-4 text-[#C7B9B9]">
            If the technical checks pass and a page still isn&apos;t indexed, the cause is usually discovery or
            quality: too few internal links pointing at it, or content too similar to other pages.{" "}
            <Link href="/stillawake-times/why-is-my-website-not-ranking-on-google" className="underline hover:text-white">
              Why your website isn&apos;t ranking
            </Link>{" "}
            walks through those causes, and{" "}
            <Link href="/stillawake-times/what-is-technical-seo" className="underline hover:text-white">
              what technical SEO covers
            </Link>{" "}
            explains each area in more depth.
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
              <li><Link href="/tools/schema-markup-generator" className="underline hover:text-white">Schema markup generator</Link>: write JSON-LD with the required fields checked.</li>
              <li><Link href="/tools/llms-txt-generator" className="underline hover:text-white">llms.txt generator and AI readiness check</Link>: what an AI assistant can tell about your business from your site.</li>
              <li><Link href="/stillawake-times/how-to-appear-in-google-ai-overviews" className="underline hover:text-white">How to appear in Google AI Overviews</Link>: the same indexing basics apply.</li>
              <li><Link href="/seo-canada" className="underline hover:text-white">SEO services</Link>: when you&apos;d rather have someone fix what the audit finds.</li>
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
