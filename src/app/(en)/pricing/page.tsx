import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard } from "@/components/service-page";
import { getContentLayer } from "@/lib/cms/adapter";
import { DISCOVERY, MINIMUM } from "@/lib/pricing/model";
import { slot } from "@/lib/cms/layer";

import { Testimonials } from "@/components/testimonials";
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Pricing — Published Rates, No Sales Call",
  description:
    "StillAwake Media pricing: websites from $1,800 CAD, a full business website $2,750–$5,750, online stores from $4,250, paid discovery from $1,800, SEO plans $600–$850 CAD/month and emergency support $150–$600 one-time. Published, in CAD, no sales call.",
  alternates: {
    canonical: "https://stillawakemedia.com/pricing",
    languages: {
      "en-CA": "https://stillawakemedia.com/pricing",
      "fr-CA": "https://stillawakemedia.com/fr/tarifs",
      "x-default": "https://stillawakemedia.com/pricing",
    },
  },
  openGraph: {
    title: "Pricing",
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
          { name: "Website", price: MINIMUM },
          { name: "Project Discovery", price: DISCOVERY.from },
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
              "Most agencies hide pricing behind a discovery call. StillAwake Media publishes it. A professional business website with local search set up runs about $2,750 to $5,750, and a simpler site starts at $1,800. The lower end assumes you supply the content and the scope stays close to what you asked for; the higher end is the same project once there is more original content, more design involvement or more to connect. You are never charged more for having more employees. All prices in Canadian dollars.",
            )}
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist text-4xl font-black tracking-[-0.06em]">Projects — three ways in</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Which one you need is decided by the work, not by the size of your company. Price your own
            project with the{" "}
            <Link href="/tools/project-cost-calculator" className="text-[#D71920] underline-offset-4 hover:underline">
              cost calculator
            </Link>{" "}
            — it runs the same model we scope real work with.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <PriceCard
              name="Website"
              price={`from $${MINIMUM.toLocaleString("en-CA")} CAD`}
              cadence="a full business site with local search: $2,750–$5,750"
              items={[
                "Custom design, built for you",
                "Home, about, contact and your service pages",
                "Forms, analytics and Search Console",
                "Technical SEO and structured data",
                "You edit the content yourself",
              ]}
              cta={["Price it", "/tools/project-cost-calculator"]}
              highlight
            />
            <PriceCard
              name="Store or system"
              price="from $4,250 CAD"
              cadence="written scope, fixed price"
              items={[
                "Shopify set up properly, from $4,250",
                "Business dashboards from $12,000",
                "Priced for the work, not your headcount",
                "No mandatory sales call",
              ]}
              cta={["Get a range", "/tools/project-cost-calculator"]}
            />
            <PriceCard
              name="Discovery"
              price={`from $${DISCOVERY.from.toLocaleString("en-CA")} CAD`}
              cadence="credited against the build"
              items={[
                "For software and anything still taking shape",
                "A written scope and architecture",
                "A fixed build price at the end",
                "The fee comes off the build",
              ]}
              cta={["Start with discovery", "https://stillawake.studio/start"]}
            />
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Monthly — SEO growth plans</h2>
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

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">What we do</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            These combine — most projects are more than one. Software and large systems start with
            discovery rather than a quote, because the requirements are the expensive part and they do
            not exist yet.
          </p>
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
                <p className="mt-2 text-sm text-[#C7B9B9]">Written scope, fixed price, no sales call.</p>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-[#C7B9B9]">
            Wondering what a build should cost before you start?{" "}
            <Link href="/tools/project-cost-calculator" className="text-[#D71920] underline-offset-4 hover:underline">
              Price your project with our calculator
            </Link>{" "}
            — it runs the model we use internally — or read the guide:{" "}
            <Link href="/website-cost-canada" className="text-[#D71920] underline-offset-4 hover:underline">How much does a website cost in Canada?</Link>
          </p>

          <div className="mt-16 rounded-[2rem] bg-[#D71920] p-10">
            <h2 className="geist max-w-2xl text-4xl font-black tracking-[-0.06em]">Skip the sales call. Tell us what you&apos;re building.</h2>
            <Link href="https://stillawake.studio/start" className="mt-6 inline-flex rounded-full bg-black px-6 py-4 font-bold">Start a Project →</Link>
          </div>
        </div>
      </section>
      <Testimonials placement="pricing" title="What clients say" />
    </main>
  );
}
