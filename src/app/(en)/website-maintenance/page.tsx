import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Website Maintenance & Emergency Support | Transparent Pricing",
  description:
    "Website maintenance and same-day emergency support from StillAwake Media in Montréal, serving all of Canada remotely. Emergency fixes from $150 CAD with published tier pricing.",
  alternates: {
    canonical: "https://stillawakemedia.com/website-maintenance",
    languages: {
      "en-CA": "https://stillawakemedia.com/website-maintenance",
      "fr-CA": "https://stillawakemedia.com/fr/maintenance-site-web",
      "x-default": "https://stillawakemedia.com/website-maintenance",
    },
  },
  openGraph: {
    title: "Website Maintenance & Emergency Support | StillAwake Media",
    description: "Care plans and same-day emergency website support with published pricing. Montréal-based, Canada-wide.",
    url: "https://stillawakemedia.com/website-maintenance",
    type: "website",
  },
};

const FAQ: [string, string][] = [
  [
    "How much does emergency website support cost?",
    "Emergency support for a custom website costs $150, $250, or $400 CAD one-time depending on workload: a quick fix, a priority incident, or a heavy incident affecting several systems. Ecommerce emergencies are $250, $400, or $600 CAD. A short questionnaire sets the tier before you pay — the price is shown before checkout.",
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
    "Yes — ongoing care plans covering updates, monitoring, backups, and small fixes are quoted to your stack and traffic. Tell us about your site and we'll send a plan; no call required.",
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
          { name: "Emergency Support — Custom Site (Quick fix)", price: 150 },
          { name: "Emergency Support — Custom Site (Priority incident)", price: 250 },
          { name: "Emergency Support — Custom Site (Heavy incident)", price: 400 },
          { name: "Emergency Support — Ecommerce (Store triage)", price: 250 },
          { name: "Emergency Support — Ecommerce (Priority incident)", price: 400 },
          { name: "Emergency Support — Ecommerce (Business-critical)", price: 600 },
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
            for a custom website costs $150–$400 CAD one-time; ecommerce emergencies cost $250–$600 CAD one-time.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Emergency Support — Custom Site"
              price="$150–$400 CAD"
              cadence="one-time"
              items={[
                "Quick fix — $150: one contained issue, fixed same day",
                "Priority incident — $250: something broken and costing you business",
                "Heavy incident — $400: multiple pages or systems affected",
                "Incident summary + prevention notes included",
              ]}
              cta={["Start Emergency Support", "/contact"]}
              highlight
            />
            <PriceCard
              name="Emergency Support — Ecommerce"
              price="$250–$600 CAD"
              cadence="one-time"
              items={[
                "Store triage — $250: checkout or catalogue issue diagnosed and fixed",
                "Priority incident — $400: revenue-impacting store failure",
                "Business-critical — $600: store down, drop-everything response",
                "Shopify and custom ecommerce stacks",
              ]}
              cta={["Fix My Store", "/contact"]}
              highlight
            />
          </div>
          <div className="mt-10 rounded-[2rem] border border-white/10 p-8">
            <h3 className="geist text-2xl font-black tracking-[-0.05em]">Ongoing care plans</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
              Monthly maintenance — updates, monitoring, backups, and small fixes — is quoted to your stack, traffic, and
              risk profile rather than sold as a one-size-fits-all plan. Tell us about your site and you&apos;ll get a
              written plan with a fixed monthly price. No call required.
            </p>
            <Link href="https://stillawake.studio/start" className="mt-6 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm transition hover:border-[#D71920]/60">
              Request a Care Plan Quote
            </Link>
          </div>
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
