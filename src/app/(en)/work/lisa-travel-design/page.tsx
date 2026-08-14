import type { Metadata } from "next";
import { ServiceJsonLd, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Case Study: TravelDesign By Lisa — 0 Clicks to Page 1 in 8 Weeks",
  description:
    "How StillAwake Media built a trilingual travel platform — 834 URLs, custom CMS, eSIM commerce, 412 automated tests — and took it from zero organic clicks to page-1 rankings. Real numbers, sourced and dated.",
  alternates: {
    canonical: "https://stillawakemedia.com/work/lisa-travel-design",
    languages: {
      "en-CA": "https://stillawakemedia.com/work/lisa-travel-design",
      "fr-CA": "https://stillawakemedia.com/fr/etude-de-cas-lisa-travel-design",
      "x-default": "https://stillawakemedia.com/work/lisa-travel-design",
    },
  },
  openGraph: {
    title: "Case Study: TravelDesign By Lisa",
    description: "From zero organic clicks to page-1 rankings in 8 weeks — with every number sourced.",
    url: "https://stillawakemedia.com/work/lisa-travel-design",
    type: "article",
  },
};

const METRICS: [string, string, string][] = [
  ["0 → page 1", "Organic reality shift", "June 22 audit: 14 keywords, avg position 64, zero clicks. August (180-day GSC window): page-1 positions (5.3–8.9) on multiple target resort queries, ~9,000 impressions on a single comparison article."],
  ["9m 06s", "Average session duration", "GA4, 90-day window ending Aug 12, 2026 — with a 59.9% engagement rate. Visitors don't bounce; they read."],
  ["0.00 CLS · 100 BP", "Measured performance", "Chrome Lighthouse run by us on Aug 12, 2026 (mobile): Cumulative Layout Shift 0.00, Best Practices 100, Accessibility 93, SEO 92."],
  ["~2,300", "SEO defects cleared", "The Ahrefs audit surfaced ~3,000 issue instances; root-cause analysis traced ~88% to one misconfiguration. Eleven files and one environment variable later: duplicate titles 7→0, sitemap deduplicated 716→634 URLs."],
  ["412", "Automated tests", "Unit, end-to-end, and security suites (RLS and auth boundaries included) — all passing on the last recorded run."],
  ["0 critical / 0 high", "Security posture", "Black-box probe of all 77 API routes plus source review of every auth boundary (Aug 5, 2026). Two low findings — both fixed same cycle."],
];

export default function LisaCaseStudy() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/work/lisa-travel-design"
        name="Case Study: TravelDesign By Lisa"
        description="Trilingual travel platform build: 834 URLs, custom CMS, eSIM commerce, measured SEO turnaround from zero clicks to page-1 rankings."
        breadcrumb={[
          ["Home", "/"],
          ["Case Studies", "/work"],
          ["TravelDesign By Lisa", "/work/lisa-travel-design"],
        ]}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Case Study · Travel</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            TravelDesign By Lisa: from zero organic clicks to page 1 — with receipts.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            A Montréal travel advisor needed more than a brochure: a booking business. In 65 days and 310 commits we
            built <a href="https://lisatraveldesign.com" className="text-[#D71920] underline-offset-4 hover:underline" rel="noopener">lisatraveldesign.com</a> —
            a trilingual (EN/FR/ES) platform of 834 URLs: custom CMS, client portal and CRM, quote builder, and a
            live eSIM store with Stripe checkout. Then we fixed what the audits found and measured what happened.
            Every number below has a source and a date.
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

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="geist text-3xl font-black tracking-[-0.06em]">What was actually built</h2>
              <ul className="mt-6 space-y-3 text-[#C7B9B9]">
                <li>— 834-URL trilingual architecture (EN 345 / FR 342 / ES 149)</li>
                <li>— Custom CMS on Supabase: 56 migrations, bilingual link resolver, scheduling</li>
                <li>— eSIM ecommerce: catalogue, Stripe checkout, automated fulfillment &amp; reconciliation</li>
                <li>— Client portal, CRM, quote builder with travel-date capture</li>
                <li>— Image pipeline: WebP at quality 80, blur-up placeholders, 2200px cap</li>
                <li>— 199 country entry-requirement pages × 3 languages with typo-tolerant search</li>
              </ul>
            </div>
            <div>
              <h2 className="geist text-3xl font-black tracking-[-0.06em]">The honest part</h2>
              <p className="mt-6 leading-8 text-[#C7B9B9]">
                This is a young site — the absolute traffic numbers are early-stage and we publish them anyway: 573
                sessions and 9 lead conversions in the last 90 days. What the data proves is trajectory and quality:
                two months ago Google sent this site nothing; today it holds page-1 positions on its target queries
                with the deepest engagement we&apos;ve measured on any build. When infrastructure costs spiked, we cut
                per-page payload ~95% (≈750KB → ≈30KB). When a security incident hit on Aug 5, we patched, hardened,
                and <em>documented it</em> the same day. That&apos;s what owning a build means.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices
        title="The services behind this build"
        links={[
          ["Web Design Montréal", "/web-design-montreal"],
          ["Custom Software Development", "/software-development"],
          ["SEO Montréal", "/seo-montreal"],
          ["Website Maintenance", "/website-maintenance"],
          ["All case studies", "/work"],
          ["Version française", "/fr/etude-de-cas-lisa-travel-design"],
        ]}
      />
    </main>
  );
}
