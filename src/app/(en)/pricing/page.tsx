import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard } from "@/components/service-page";
import { getContentLayer } from "@/lib/cms/adapter";
import { DISCOVERY, EMERGENCY, MINIMUM, ONE_TIME, RECURRING } from "@/lib/pricing/model";
import {
  EMERGENCY_DESCRIPTIONS,
  EMERGENCY_LABELS,
  ONE_TIME_DESCRIPTIONS,
  ONE_TIME_LABELS,
  RECURRING_LABELS,
} from "@/lib/pricing/labels";
import { slot } from "@/lib/cms/layer";

import { Testimonials } from "@/components/testimonials";
export const revalidate = 300;

const money = (n: number) => `$${n.toLocaleString("en-CA")} CAD`;

/**
 * Everything on this page comes out of the pricing kernel. Emergency tiers in
 * particular used to be hand-typed here, in the French page, and in Stripe —
 * three copies of six numbers with nothing keeping them equal.
 */
const MONTHLY = RECURRING.filter((r) => r.approved && r.monthly !== null);
const ONE_TIME_SERVICES = Object.values(ONE_TIME).filter((s) => s.approved);

/** The three numbers the page leads with. Derived, so the copy cannot go stale. */
const ENTRY_MONTHLY = Math.min(...MONTHLY.map((r) => r.monthly!));
const ENTRY_ONE_TIME = Math.min(...ONE_TIME_SERVICES.map((s) => s.price));
const EMERGENCY_CEILING = Math.max(
  ...Object.values(EMERGENCY).flatMap((t) => t.tiers.map((tier) => tier.price)),
);

/** What each monthly plan actually buys. Keyed by catalogue id, not position. */
const MONTHLY_ITEMS: Record<string, string[]> = {
  "managed-hosting": [
    "Fast hosting on our infrastructure",
    "SSL, DNS and uptime monitoring",
    "Daily backups",
    "We handle the platform, you never see it",
  ],
  "website-care-plan": [
    "Everything in managed hosting",
    "Software and dependency updates",
    "Small content and copy edits",
    "Something breaks, we fix it — no incident fee",
  ],
  "seo-starter": [
    "Search Console monitoring",
    "One on-page fix a month",
    "Monthly report you can actually read",
    "The honest entry point — not a smaller Essentials",
  ],
  "seo-essentials": [
    "Technical SEO",
    "On-page optimization",
    "Google Search Console monitoring",
    "Monthly report",
  ],
  "seo-advanced": [
    "Everything in Essentials",
    "AI-search (AEO) optimization",
    "Entity optimization",
    "Content strategy",
  ],
  "content-creation": [
    "Articles and page copy written for you",
    "Researched against what people actually search",
    "Published, internally linked and measured",
    "Pairs with an SEO plan — it is not one",
  ],
};

const MONTHLY_CTA: Record<string, [string, string]> = {
  "managed-hosting": ["Start hosting", "/website-maintenance"],
  "website-care-plan": ["Start a care plan", "/website-maintenance"],
  "seo-starter": ["Start with Starter", "/seo-montreal"],
  "seo-essentials": ["Start Essentials", "/seo-montreal"],
  "seo-advanced": ["Start Advanced", "/seo-montreal"],
  "content-creation": ["Start content production", "/contact"],
};

export const metadata: Metadata = {
  title: "Pricing — Published Rates, No Sales Call",
  description: `StillAwake Media pricing: monthly plans from ${money(ENTRY_MONTHLY)}, fixed-price services from ${money(ENTRY_ONE_TIME)}, websites from $1,800 CAD, a full business website $2,750–$5,750, online stores from $4,250, paid discovery from $1,800 and emergency support $${ENTRY_ONE_TIME}–$${EMERGENCY_CEILING} one-time. Published, in CAD, no sales call.`,
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
          ...MONTHLY.map((r) => ({
            name: RECURRING_LABELS[r.id].en,
            price: r.monthly!,
            interval: "MONTH" as const,
          })),
          ...ONE_TIME_SERVICES.map((s) => ({ name: ONE_TIME_LABELS[s.id].en, price: s.price })),
          ...Object.values(EMERGENCY).map((track) => ({
            name: EMERGENCY_LABELS[track.id].en,
            price: track.tiers[0].price,
          })),
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
              `Most agencies hide pricing behind a discovery call. StillAwake Media publishes it. A professional business website with local search set up runs about $2,750 to $5,750, and a simpler site starts at $1,800. The lower end assumes you supply the content and the scope stays close to what you asked for; the higher end is the same project once there is more original content, more design involvement or more to connect. If a build is not where you are yet, fixed-price services start at $${ENTRY_ONE_TIME} and monthly plans at $${ENTRY_MONTHLY}. You are never charged more for having more employees. All prices in Canadian dollars.`,
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
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Projects can be split into up to four payments across the build, at the same total
            price — no interest, no fees, and nothing extra for paying over time. The{" "}
            <Link href="/tools/project-cost-calculator" className="text-[#D71920] underline-offset-4 hover:underline">
              calculator
            </Link>{" "}
            estimates what each payment looks like. Payment options are confirmed in your written
            proposal, not here.
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

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">
            One-time — fixed-price starting points
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Not ready for a build. These are fixed — not a range, not an estimate, and not a
            consultation that turns into a quote. You pay the number you see and you get the thing.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ONE_TIME_SERVICES.map((service) => (
              <PriceCard
                key={service.id}
                name={ONE_TIME_LABELS[service.id].en}
                price={money(service.price)}
                cadence="one-time"
                items={[ONE_TIME_DESCRIPTIONS[service.id].en]}
                cta={["Book it", "https://stillawake.studio/start"]}
              />
            ))}
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Monthly — keeping it running</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Plans start at {money(MONTHLY[0].monthly!)} a month. Each one is the whole rung, not a
            trimmed version of the one above it — you move up when the work calls for it, not
            because the small plan was made deliberately annoying.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {MONTHLY.filter((r) => r.group === "care").map((plan) => (
              <PriceCard
                key={plan.id}
                name={RECURRING_LABELS[plan.id].en}
                price={money(plan.monthly!)}
                cadence="per month"
                items={MONTHLY_ITEMS[plan.id]}
                cta={MONTHLY_CTA[plan.id]}
              />
            ))}
          </div>

          <h2 className="geist mt-16 text-4xl font-black tracking-[-0.06em]">Monthly — growth plans</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Starter is a real plan at a small size, not a trial. Content production is the odd one
            out on purpose — it writes new material rather than optimising what exists, so it sits
            alongside an SEO plan rather than replacing one.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MONTHLY.filter((r) => r.group === "seo" || r.group === "content").map((plan) => (
              <PriceCard
                key={plan.id}
                name={RECURRING_LABELS[plan.id].en}
                price={money(plan.monthly!)}
                cadence="per month"
                items={MONTHLY_ITEMS[plan.id]}
                cta={MONTHLY_CTA[plan.id]}
                highlight={plan.id === "seo-essentials"}
              />
            ))}
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
            {Object.values(EMERGENCY).map((track) => {
              const prices = track.tiers.map((t) => t.price);
              return (
                <PriceCard
                  key={track.id}
                  name={EMERGENCY_LABELS[track.id].en}
                  price={`$${Math.min(...prices)}–$${Math.max(...prices)} CAD`}
                  cadence="one-time"
                  items={track.tiers.map(
                    (tier) =>
                      `${EMERGENCY_LABELS[`${track.id}.${tier.id}`].en} — $${tier.price}: ${
                        EMERGENCY_DESCRIPTIONS[`${track.id}.${tier.id}`].en
                      }`,
                  )}
                  cta={[track.id === "ecommerce" ? "Fix My Store" : "Get Help", "/website-maintenance"]}
                />
              );
            })}
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
