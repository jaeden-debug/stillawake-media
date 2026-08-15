import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "How Much Does a Website Cost in Canada? (2026 Guide)",
  description:
    "Real Canadian website pricing for 2026: what template sites, custom business sites, ecommerce, and web apps actually cost, what drives price, and the published rates one Montréal studio charges.",
  alternates: {
    canonical: "https://stillawakemedia.com/website-cost-canada",
    languages: {
      "en-CA": "https://stillawakemedia.com/website-cost-canada",
      "fr-CA": "https://stillawakemedia.com/fr/prix-site-web-quebec",
      "x-default": "https://stillawakemedia.com/website-cost-canada",
    },
  },
  openGraph: {
    title: "How Much Does a Website Cost in Canada?",
    description: "Honest 2026 cost ranges for Canadian websites — and the published prices behind them.",
    url: "https://stillawakemedia.com/website-cost-canada",
    type: "website",
  },
};

const FAQ: [string, string][] = [
  [
    "How much does a website cost in Canada?",
    "In 2026, typical Canadian market ranges are: DIY template sites $0–$1,500; professionally built small-business sites roughly $3,000–$10,000; custom-designed business sites $8,000–$25,000; ecommerce stores $5,000–$30,000+; and custom web applications $15,000 to well past $100,000 depending on scope. These are market observations, not quotes — the honest answer for your project is a written scope.",
  ],
  [
    "Why do website prices vary so much?",
    "Five drivers explain most of the spread: custom design vs. template, the number of unique pages and content produced for them, ecommerce and integrations, SEO architecture built in from day one vs. bolted on later, and who is accountable after launch. Two 'websites' can legitimately differ by 10x in build effort.",
  ],
  [
    "What does ongoing website ownership cost?",
    "Beyond the build: hosting and domain (commonly $10–$100+/month), maintenance and updates, and growth work like SEO. For reference, StillAwake Media publishes its own prices: a professional business website at about $2,750–$5,750 CAD with local search, a simpler site from $1,800, an online store from $4,250, paid discovery from $1,800, SEO plans at $600–$850 CAD/month and emergency support at $150–$600 one-time.",
  ],
  [
    "Is a cheap website a bad idea?",
    "Not always — a template site can be right for validating an idea. It becomes expensive when the business depends on the site: slow templates, unfixable SEO structure, and platform lock-in usually cost more to escape later than building properly would have cost up front.",
  ],
  [
    "How do I get an exact price without a sales call?",
    "Describe your project through StillAwake Media's async intake: you answer questions once, and you get a written scope with a fixed price by email. No discovery call is required — that's the studio's standard process for every custom build.",
  ],
];

export default function WebsiteCostCanadaPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/website-cost-canada"
        name="Website Cost in Canada — 2026 Pricing Guide"
        description="Canadian website cost guide: market ranges for template, custom, ecommerce and web-app builds, the factors that drive price, and StillAwake Media's published rates."
        breadcrumb={[
          ["Home", "/"],
          ["Pricing", "/pricing"],
          ["Website Cost in Canada", "/website-cost-canada"],
        ]}
        faq={FAQ}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Pricing Guide · 2026</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            How much does a website cost in Canada?
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            The honest answer: <strong className="text-white">from about $1,500 for a template build to well past
            $100,000 for a custom web application</strong> — because &quot;a website&quot; describes ten different
            products. Whether you&apos;re pricing web design, web development, or a full platform, this guide breaks
            down real 2026 Canadian ranges, what actually moves web design cost up or down, and — unusually for an
            agency — the rates we publish ourselves.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist text-4xl font-black tracking-[-0.06em]">Canadian market ranges (2026)</h2>
          <p className="mt-3 max-w-3xl text-sm text-[#C7B9B9]">
            Market observations from working in the Canadian market — labelled as ranges, not quotes. Every serious
            studio prices from scope.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/20 text-xs uppercase tracking-[0.15em] text-[#C7B9B9]">
                  <th className="py-3 pr-4">Type of website</th>
                  <th className="py-3 pr-4">Typical range (CAD)</th>
                  <th className="py-3">What moves it</th>
                </tr>
              </thead>
              <tbody className="text-[#C7B9B9]">
                {[
                  ["DIY / template site", "$0 – $1,500", "Your time, template limits, platform fees"],
                  ["Professionally built small-business site", "$3,000 – $10,000", "Page count, copywriting, design customization"],
                  ["Custom-designed business site", "$8,000 – $25,000", "Original design, SEO architecture, content systems"],
                  ["Ecommerce / Shopify store", "$5,000 – $30,000+", "Catalogue size, custom theme, integrations, bilingual"],
                  ["Custom web application / SaaS", "$15,000 – $100,000+", "Features, accounts, payments, integrations, scale"],
                ].map(([t, r, w]) => (
                  <tr key={t} className="border-b border-white/10">
                    <td className="py-4 pr-4 text-white">{t}</td>
                    <td className="py-4 pr-4 font-semibold text-white">{r}</td>
                    <td className="py-4">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">What StillAwake actually publishes</h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              Our own prices are published rather than quoted on request. A{" "}
              <strong className="text-white">professional business website runs about $2,750–$5,750 CAD</strong> with local
              search set up, a simpler site <strong className="text-white">starts at $1,800</strong>, an online store{" "}
              <strong className="text-white">from $4,250</strong>, and anything a form cannot honestly scope starts
              with <strong className="text-white">paid discovery from $1,800</strong>, credited against the build.
              You are not charged more for having more employees.
              Recurring and support are public too: SEO plans cost{" "}
              <strong className="text-white">$600–$850 CAD per month</strong>, emergency support{" "}
              <strong className="text-white">$150–$400 CAD one-time</strong> (custom sites) or{" "}
              <strong className="text-white">$250–$600 CAD one-time</strong> (ecommerce). Full details on the{" "}
              <Link href="/pricing" className="text-[#D71920] underline-offset-4 hover:underline">pricing page</Link>.
            </p>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              The bands above are market observations. For a range built from your actual project rather
              than from the market,{" "}
              <Link
                href="/tools/project-cost-calculator"
                className="text-[#D71920] underline-offset-4 hover:underline"
              >
                use the project cost calculator
              </Link>{" "}
              — it runs the same pricing model we scope real work with.
            </p>
            <Link href="https://stillawake.studio/start" className="mt-6 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">
              Get a Written Quote — No Call Required
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Website cost questions" items={FAQ} />

      <RelatedServices
        title="Keep going"
        links={[
          ["Web Design Montréal", "/web-design-montreal"],
          ["Shopify Development", "/shopify-development"],
          ["All Pricing", "/pricing"],
          ["Who Owns Your Website?", "/website-ownership"],
          ["How Much Does SEO Cost in Canada?", "/stillawake-times/how-much-does-seo-cost-canada"],
          ["Website Maintenance", "/website-maintenance"],
          ["Version française", "/fr/prix-site-web-quebec"],
        ]}
      />
    </main>
  );
}
