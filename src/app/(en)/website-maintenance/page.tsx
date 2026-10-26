import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard, FaqBlock, RelatedServices } from "@/components/service-page";
import { EMERGENCY, RECURRING_BY_ID } from "@/lib/pricing/model";
import { EMERGENCY_DESCRIPTIONS, EMERGENCY_LABELS, RECURRING_LABELS } from "@/lib/pricing/labels";

/**
 * Emergency tiers and the care plan come from the pricing kernel. They used to
 * be typed by hand here, on /pricing, and in Stripe — the FAQ answer below is
 * generated for the same reason, because a hand-written sentence listing six
 * prices is the single most likely thing on this page to go stale.
 */
const track = (id: keyof typeof EMERGENCY) => EMERGENCY[id];
const tierPrices = (id: keyof typeof EMERGENCY) => track(id).tiers.map((t) => t.price);
const listPrices = (id: keyof typeof EMERGENCY) => {
  const prices = tierPrices(id).map((p) => `$${p}`);
  return `${prices.slice(0, -1).join(", ")}, or ${prices.at(-1)} CAD`;
};
const bandLabel = (id: keyof typeof EMERGENCY) =>
  `$${Math.min(...tierPrices(id))}–$${Math.max(...tierPrices(id))} CAD`;

const CARE = RECURRING_BY_ID["website-care-plan"];
const HOSTING = RECURRING_BY_ID["managed-hosting"];

export const metadata: Metadata = {
  title: "Website Maintenance & Emergency Support | Transparent Pricing",
  description:
    `Website maintenance and same-day emergency support from StillAwake Media in Montréal, serving all of Canada remotely. Care plans from $${HOSTING.monthly} CAD per month and emergency fixes from $${Math.min(...tierPrices("custom_site"))} CAD, with published tier pricing.`,
  alternates: {
    canonical: "https://stillawakemedia.com/website-maintenance",
    languages: {
      "en-CA": "https://stillawakemedia.com/website-maintenance",
      "fr-CA": "https://stillawakemedia.com/fr/maintenance-site-web",
      "x-default": "https://stillawakemedia.com/website-maintenance",
    },
  },
  openGraph: {
    title: "Website Maintenance & Emergency Support",
    description: "Care plans and same-day emergency website support with published pricing. Montréal-based, Canada-wide.",
    url: "https://stillawakemedia.com/website-maintenance",
    type: "website",
  },
};

const FAQ: [string, string][] = [
  [
    "How much does emergency website support cost?",
    `Emergency support for a custom website costs ${listPrices("custom_site")} one-time depending on workload: a quick fix, a priority incident, or a heavy incident affecting several systems. Ecommerce emergencies are ${listPrices("ecommerce")}. A short questionnaire sets the tier before you pay — the price is shown before checkout.`,
  ],
  [
    "What counts as an emergency?",
    "The site is down, checkout is broken, a deploy went wrong, forms stopped submitting, the site was defaced, or something is visibly wrong and costing you business. If it's urgent to you, it qualifies — the tier just reflects how much work it takes.",
  ],
  [
    "How fast do you respond?",
    "Same day during business hours for emergency tiers. You get an incident summary when it's fixed, plus prevention notes so the same failure doesn't repeat.",
  ],
  [
    "Do you maintain websites you didn't build?",
    "Yes. We support custom-coded sites, Next.js and React apps, Shopify stores, and most modern stacks. WordPress support is assessed case-by-case during intake.",
  ],
  [
    "Do you offer monthly maintenance plans?",
    `Yes, and the price is published. Managed hosting is $${HOSTING.monthly} CAD per month. The website care plan is $${CARE.monthly} CAD per month and includes hosting, software updates, monitoring, backups, and small content edits — if something breaks on a care plan there is no separate incident fee. Larger stacks are still quoted individually.`,
  ],
  [
    "Do you work outside Montréal?",
    "Yes. StillAwake Media is based in Montréal and works remotely with businesses across Québec, Canada, and beyond. Maintenance and emergency support are fully remote services.",
  ],
];

export default function WebsiteMaintenancePage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/website-maintenance"
        name="Website Maintenance & Emergency Support"
        description="Ongoing website care plans and same-day emergency website support with published one-time tier pricing, delivered remotely from Montréal, Canada."
        offers={[
          ...Object.values(EMERGENCY).flatMap((t) =>
            t.tiers.map((tier) => ({
              name: `${EMERGENCY_LABELS[t.id].en} (${EMERGENCY_LABELS[`${t.id}.${tier.id}`].en})`,
              price: tier.price,
            })),
          ),
          { name: RECURRING_LABELS["managed-hosting"].en, price: HOSTING.monthly!, interval: "MONTH" as const },
          { name: RECURRING_LABELS["website-care-plan"].en, price: CARE.monthly!, interval: "MONTH" as const },
        ]}
        breadcrumb={[
          ["Home", "/"],
          ["Services", "/services"],
          ["Website Maintenance & Support", "/website-maintenance"],
        ]}
        faq={FAQ}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Maintenance & Support</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Website maintenance and emergency support — with the price on the page.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">What is website maintenance?</strong> It&apos;s the ongoing work that keeps a
            website fast, secure, and converting after launch: software updates, uptime monitoring, backups, small fixes,
            and someone accountable when something breaks. StillAwake Media provides both ongoing care plans and one-time
            emergency help — remotely, across Canada, from Montréal.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/start" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Get Help Now
            </Link>
            <Link href="/pricing" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              See All Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Emergency support pricing. One-time. No subscription.
          </h2>
          <p className="mt-4 max-w-3xl text-[#C7B9B9]">
            A three-question workload check sets your tier and you see the exact price before paying. Emergency support
            for a custom website costs {bandLabel("custom_site")} one-time; ecommerce emergencies cost{" "}
            {bandLabel("ecommerce")} one-time.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {Object.values(EMERGENCY).map((t) => (
              <PriceCard
                key={t.id}
                name={EMERGENCY_LABELS[t.id].en}
                price={bandLabel(t.id as keyof typeof EMERGENCY)}
                cadence="one-time"
                items={[
                  ...t.tiers.map(
                    (tier) =>
                      `${EMERGENCY_LABELS[`${t.id}.${tier.id}`].en} — $${tier.price}: ${
                        EMERGENCY_DESCRIPTIONS[`${t.id}.${tier.id}`].en
                      }`,
                  ),
                  t.id === "ecommerce"
                    ? "Shopify and custom ecommerce stacks"
                    : "Incident summary + prevention notes included",
                ]}
                cta={[t.id === "ecommerce" ? "Fix My Store" : "Start Emergency Support", "/contact"]}
                highlight
              />
            ))}
          </div>

          <h2 className="geist mt-16 max-w-4xl text-4xl font-black tracking-[-0.06em]">
            Ongoing care plans. Published, not quoted.
          </h2>
          <p className="mt-4 max-w-3xl text-[#C7B9B9]">
            A care plan is the cheaper way to buy the same outcome: on a plan, the fixes that would
            otherwise be an emergency ticket are simply included. One heavy incident a year costs
            more than the plan does.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PriceCard
              name={RECURRING_LABELS["managed-hosting"].en}
              price={`$${HOSTING.monthly} CAD`}
              cadence="per month"
              items={[
                "Fast hosting on our infrastructure",
                "SSL, DNS and uptime monitoring",
                "Daily backups",
                "The platform handled, so you never think about it",
              ]}
              cta={["Start hosting", "https://stillawake.studio/start"]}
            />
            <PriceCard
              name={RECURRING_LABELS["website-care-plan"].en}
              price={`$${CARE.monthly} CAD`}
              cadence="per month"
              items={[
                "Everything in managed hosting",
                "Software and dependency updates",
                "Small content and copy edits",
                "Something breaks, we fix it — no incident fee",
              ]}
              cta={["Start a care plan", "https://stillawake.studio/start"]}
              highlight
            />
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Larger stacks, heavy traffic or unusual risk profiles are still quoted individually —
            but the published plan is the starting point, not a teaser rate.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Who this is for</h2>
            <ul className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>— Businesses whose site or store is misbehaving right now</li>
              <li>— Owners without an in-house developer on call</li>
              <li>— Shopify merchants losing checkout revenue to a bug</li>
              <li>— Teams that want updates and backups handled for good</li>
            </ul>
          </div>
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">How it works</h2>
            <ol className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>1. Describe the problem — three questions set your tier</li>
              <li>2. Pay the shown price through secure Stripe checkout</li>
              <li>3. We fix it same day (business hours) and confirm in writing</li>
              <li>4. You receive an incident summary with prevention notes</li>
            </ol>
          </div>
        </div>
      </section>

      <FaqBlock title="Maintenance & support questions" items={FAQ} />

      <RelatedServices
        title="Related services"
        links={[
          ["Who Owns Your Website?", "/website-ownership"],
          ["SEO Montréal", "/seo-montreal"],
          ["Shopify Development", "/shopify-development"],
          ["Web Design Montréal", "/web-design-montreal"],
          ["AI Search Optimization", "/answer-engine-optimization"],
          ["Pricing", "/pricing"],
          ["Version française", "/fr/maintenance-site-web"],
        ]}
      />
    </main>
  );
}
