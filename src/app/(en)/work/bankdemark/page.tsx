import type { Metadata } from "next";
import { ServiceJsonLd, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Case Study: BankDeMark — #1 Rankings with a Perfect Lighthouse Score",
  description:
    "How StillAwake Media built a calculator-led finance platform: a 90+ URL SEO architecture, 13 interactive calculators, #1 Google positions, and a measured 100/100/100 Lighthouse score.",
  alternates: {
    canonical: "https://stillawakemedia.com/work/bankdemark",
    languages: {
      "en-CA": "https://stillawakemedia.com/work/bankdemark",
      "fr-CA": "https://stillawakemedia.com/fr/etude-de-cas-bankdemark",
      "x-default": "https://stillawakemedia.com/work/bankdemark",
    },
  },
  openGraph: {
    title: "Case Study: BankDeMark",
    description: "Calculator-led SEO architecture: #1 rankings and a perfect measured Lighthouse score.",
    url: "https://stillawakemedia.com/work/bankdemark",
    type: "article",
  },
};

const METRICS: [string, string, string][] = [
  ["Position 1.3", "#1 on its head query", "Google Search Console, 180-day window ending Aug 12, 2026: the net-worth-by-age page holds average position 1.3 (332 impressions), retirement-savings-by-age sits at 2.3, and the calculators hub at 2.6."],
  ["100 / 100 / 100", "Perfect Lighthouse", "Accessibility 100, Best Practices 100, SEO 100 — measured by us with Chrome Lighthouse (mobile) on Aug 12, 2026. Not an estimate; a run you can reproduce."],
  ["94 URLs", "Calculator-led architecture", "13 interactive financial calculators, plus articles and pillar pages engineered as one internal-linking system — tools earn the rankings, content converts the intent. Sitemap re-counted Aug 13, 2026; it was 91 at launch and grows as content ships."],
  ["26 test cases", "Golden financial cases", "Money math is tested against golden cases — plus ~190 automated tests across the platform's financial kernel, with money-precision handling built to the cent."],
  ["26 tables", "Row-level security everywhere", "The financial data layer runs 26 Supabase tables, every one RLS-enabled, with tracked migrations and an append-only audit trail."],
  ["3 subdomains", "One financial system", "bankdemark.com (public platform), command.bankdemark.com (business finance app), invoice.bankdemark.com — one entity graph, one brand, scoped cookies."],
];

export default function BankDeMarkCaseStudy() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/work/bankdemark"
        name="Case Study: BankDeMark"
        description="Calculator-led finance platform: 90+ URL SEO architecture, 13 calculators, #1 Google positions, measured 100/100/100 Lighthouse."
        breadcrumb={[
          ["Home", "/"],
          ["Case Studies", "/work"],
          ["BankDeMark", "/work/bankdemark"],
        ]}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Case Study · Finance</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            BankDeMark: rank #1 with tools, not tricks.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <a href="https://bankdemark.com" className="text-[#D71920] underline-offset-4 hover:underline" rel="noopener">BankDeMark</a>{" "}
            is a Canadian finance platform built on a simple thesis: interactive calculators earn search rankings that
            articles alone can&apos;t. We architected the site around 13 calculators and the content that feeds them — 94 URLs today —
            then engineered the financial layer underneath with the rigor money demands. Every number below is sourced
            and dated.
          </p>
          {/* Same disclosure as the Blackwater study, for the same reason:
              a reader who finds this out for themselves discounts the page. */}
          <p className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-[#C7B9B9]">
            <strong className="text-white">Disclosure:</strong> BankDeMark was founded by Jaeden Doody,
            StillAwake Media&apos;s founder, and is a separate organization rather than a client engagement.
            We publish it because we can show the whole build — architecture, test suite, measured scores —
            without asking anyone&apos;s permission. Treat it as proof of method, not as a client reference.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {METRICS.map(([big, label, detail]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 p-7">
                <p className="geist text-3xl font-black tracking-[-0.04em] text-[#D71920]">{big}</p>
                <h2 className="mt-2 text-lg font-semibold">{label}</h2>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">The honest part</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              BankDeMark is young and pre-revenue, and its business-finance product layer is in active development —
              we publish that plainly. What&apos;s proven today is the search architecture (a #1 position on a
              competitive head query within months of launch), the measured technical ceiling (a literal perfect
              Lighthouse score), and an engineering culture where financial math ships with golden test cases and the
              internal audits are harsher than anything a client would write. Rankings come first; the clicks and
              revenue curve are what the next chapter measures.
            </p>
          </div>
        </div>
      </section>

      <RelatedServices
        title="The services behind this build"
        links={[
          ["SEO Montréal", "/seo-montreal"],
          ["Custom Software Development", "/software-development"],
          ["Answer Engine Optimization", "/answer-engine-optimization"],
          ["All case studies", "/work"],
          ["Version française", "/fr/etude-de-cas-bankdemark"],
        ]}
      />
    </main>
  );
}
