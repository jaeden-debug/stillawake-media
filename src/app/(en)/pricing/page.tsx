import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard } from "@/components/service-page";
import { getContentLayer } from "@/lib/cms/adapter";
import { slot } from "@/lib/cms/layer";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Pricing | StillAwake Media — Published Rates, No Sales Call",
  description:
    "StillAwake Media pricing: SEO plans $600–$850 CAD/month, emergency website support $150–$600 CAD one-time, and written custom quotes for builds. Transparent, in CAD, no call required.",
  alternates: {
    canonical: "https://stillawakemedia.com/pricing",
    languages: {
      "en-CA": "https://stillawakemedia.com/pricing",
      "fr-CA": "https://stillawakemedia.com/fr/tarifs",
      "x-default": "https://stillawakemedia.com/pricing",
    },
  },
  openGraph: {
    title: "Pricing | StillAwake Media",
    description: "Published pricing for SEO, maintenance, and support. Custom quotes for builds — async, no sales call.",
    url: "https://stillawakemedia.com/pricing",
    type: "website",
  },
};

export default async function PricingPage() {
  const slots = await getContentLayer("pricing", "en");
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/pricing"
        name="StillAwake Media Services Pricing"
        description="Published pricing for StillAwake Media services: monthly SEO plans, one-time emergency website support tiers, and custom-quoted design/development work."
        offers={[
          { name: "SEO Growth — Essentials", price: 600, interval: "MONTH" },
          { name: "SEO Growth — Advanced", price: 850, interval: "MONTH" },
          { name: "Emergency Support — Custom Site", price: 150 },
          { name: "Emergency Support — Ecommerce", price: 250 },
        ]}
        breadcrumb={[
          ["Home", "/"],
          ["Pricing", "/pricing"],
        ]}
      />

      <section className="border-b border-white/10 px-6 pb-16 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Pricing</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            {slot(slots, "hero_title", "The prices are on the page. That's the point.")}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            {slot(
              slots,
              "hero_intro",
              "Most agencies hide pricing behind a discovery call. StillAwake Media publishes it: recurring services have monthly prices, support has one-time tiers, and project work gets a written custom quote through an async intake — never a mandatory sales call. All prices in Canadian dollars.",
            )}
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist text-4xl font-black tracking-[-0.06em]">Monthly — SEO growth plans</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            SEO Growth — Essentials costs $600 CAD per month. SEO Growth — Advanced costs $850 CAD per month.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="SEO Growth — Essentials"
              price="$600 CAD"
              cadence="per month"
              items={["Technical SEO", "On-page optimization", "Google Search Console monitoring", "Monthly report"]}
              cta={["Start Essentials", "/seo-montreal"]}
            />
            <PriceCard
              name="SEO Growth — Advanced"
              price="$850 CAD"
              cadence="per month"
              items={["Everything in Essentials", "AI-search (AEO) optimization", "Entity optimization", "Content strategy"]}
              cta={["Start Advanced", "/seo-montreal"]}
              highlight
            />
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">One-time — emergency support</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            {slot(
              slots,
              "guarantee_note",
              "A three-question workload check sets the tier; you see the exact price before paying. Never a subscription.",
            )}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Emergency Support — Custom Site"
              price="$150–$400 CAD"
              cadence="one-time"
              items={["$150 quick fix", "$250 priority incident", "$400 heavy incident", "Same-day response in business hours"]}
              cta={["Get Help", "/website-maintenance"]}
            />
            <PriceCard
              name="Emergency Support — Ecommerce"
              price="$250–$600 CAD"
              cadence="one-time"
              items={["$250 store triage", "$400 priority incident", "$600 business-critical", "Shopify & custom stacks"]}
              cta={["Fix My Store", "/website-maintenance"]}
            />
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Custom quote — builds &amp; programs</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Web Design & Development", "/web-design-montreal"],
              ["Shopify Development", "/shopify-development"],
              ["Custom Software & SaaS", "/software-development"],
              ["Answer Engine Optimization", "/answer-engine-optimization"],
              ["Branding & Identity", "/branding"],
              ["AI Automation", "/ai-automation"],
              ["Website Care Plans", "/website-maintenance"],
              ["Framer Development", "/framer-development"],
            ].map(([n, h]) => (
              <Link key={h} href={h} className="rounded-[2rem] border border-white/10 p-6 transition hover:border-[#D71920]/60">
                <h3 className="text-lg font-semibold">{n}</h3>
                <p className="mt-2 text-sm text-[#C7B9B9]">Written scope + fixed price via async intake.</p>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-[#C7B9B9]">
            Wondering what a build should cost before you start? Read the guide:{" "}
            <Link href="/website-cost-canada" className="text-[#D71920] underline-offset-4 hover:underline">How much does a website cost in Canada?</Link>
          </p>

          <div className="mt-16 rounded-[2rem] bg-[#D71920] p-10">
            <h2 className="geist max-w-2xl text-4xl font-black tracking-[-0.06em]">Skip the sales call. Tell us what you&apos;re building.</h2>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-black px-6 py-4 font-bold">Start a Project →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
