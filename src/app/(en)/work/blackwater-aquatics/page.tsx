import type { Metadata } from "next";
import { ServiceJsonLd, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Case Study: Blackwater Aquatics — Education-Led Shopify Commerce",
  description:
    "How StillAwake Media built a Canadian Shopify store where 64 education pages power a 17-product catalogue: page-1 rankings, an 8.6% CTR product page, and a 27.8% repeat-customer rate.",
  alternates: {
    canonical: "https://stillawakemedia.com/work/blackwater-aquatics",
    languages: {
      "en-CA": "https://stillawakemedia.com/work/blackwater-aquatics",
      "fr-CA": "https://stillawakemedia.com/fr/etude-de-cas-blackwater-aquatics",
      "x-default": "https://stillawakemedia.com/work/blackwater-aquatics",
    },
  },
  openGraph: {
    title: "Case Study: Blackwater Aquatics | StillAwake Media",
    description: "Education-led Shopify commerce: content outweighs catalogue 4-to-1, and it sells.",
    url: "https://stillawakemedia.com/work/blackwater-aquatics",
    type: "article",
  },
};

const METRICS: [string, string, string][] = [
  ["8.6% CTR", "A product page that ranks itself", "The scud-culture product page earned 230 organic clicks at an 8.61% click-through rate (position 8.5) — Google Search Console, 180-day window ending Aug 12, 2026. Product pages almost never do this without content architecture behind them."],
  ["~60,000", "Impressions on the top 12 pages", "≈890 organic clicks across the top 12 URLs in the same 180-day window, with care guides holding positions 5.7–8 on their queries — one betta-breeding guide alone earned 17,872 impressions."],
  ["27.8%", "Returning-customer rate", "Up from 5.9% the previous period (Shopify, customer-weighted, 30-day window ending Aug 12, 2026). Education doesn't just rank — it brings buyers back."],
  ["64 : 17", "Pages to products", "Sixty-four education pages and four blogs behind a seventeen-product catalogue. The store is built like a knowledge base that happens to sell — because in a niche, trust is the product."],
  ["4 collections", "Intent-mapped structure", "Collections engineered around real Canadian search intent (live fish food Canada, betta fish Canada) with clean canonical structure — the collection pages rank on their own."],
  ["2 properties", "An ecosystem, not a site", "The companion app SpawnOS (spawnos.app) already earns its own rankings — species guides and aquarium tools feeding the same audience back to the store."],
];

export default function BlackwaterCaseStudy() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/work/blackwater-aquatics"
        name="Case Study: Blackwater Aquatics Canada"
        description="Education-led Shopify store: 64 content pages powering a 17-product catalogue, page-1 rankings, 8.6% CTR product page, 27.8% repeat-customer rate."
        breadcrumb={[
          ["Home", "/"],
          ["Case Studies", "/work"],
          ["Blackwater Aquatics", "/work/blackwater-aquatics"],
        ]}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Case Study · Shopify / Ecommerce</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Blackwater Aquatics: the store that teaches first and sells because of it.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <a href="https://blackwateraquatics.ca" className="text-[#D71920] underline-offset-4 hover:underline" rel="noopener">Blackwater Aquatics Canada</a>{" "}
            ships live fish food and breeding cultures — a deep niche where buyers research obsessively before
            trusting anyone. So we built the Shopify store backwards: 64 education pages and a care-guide knowledge
            base first, 17 products supported by them. The result is a store Google treats like an authority and
            customers treat like a resource. Every number below is sourced and dated.
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
              This is a small niche store, and we won&apos;t pretend otherwise — no inflated revenue claims, no vanity
              multiples. What the data proves is the model: in a category where a product page normally can&apos;t rank,
              education-led architecture put one on page 1 with an 8.6% click-through rate, holds care guides at
              positions 5–8 across the niche&apos;s real questions, and more than quadrupled the repeat-customer rate
              period over period. Orders arrive weekly from organic search. That&apos;s the Shopify playbook we sell —
              running live, measurable, in production.
            </p>
          </div>
        </div>
      </section>

      <RelatedServices
        title="The services behind this build"
        links={[
          ["Shopify Development", "/shopify-development"],
          ["SEO Montréal", "/seo-montreal"],
          ["Shopify vs WooCommerce", "/shopify-vs-woocommerce"],
          ["Ecommerce Emergency Support", "/website-maintenance"],
          ["All case studies", "/work"],
          ["Version française", "/fr/etude-de-cas-blackwater-aquatics"],
        ]}
      />
    </main>
  );
}
