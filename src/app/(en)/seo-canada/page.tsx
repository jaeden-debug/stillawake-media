import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, PriceCard, FaqBlock, RelatedServices } from "@/components/service-page";
import { siteUrl } from "@/lib/data";

const url = `${siteUrl}/seo-canada`;

/**
 * National SEO service surface.
 *
 * Intent separation from /seo-montreal is deliberate and must stay that way:
 *
 *   /seo-montreal → local intent. Map pack, Google Business Profile, "near me",
 *                   the Montréal market specifically.
 *   /seo-canada   → national intent. A business anywhere in Canada ranking for
 *                   its service terms, delivered remotely. No local-pack promise.
 *
 * The two pages cross-link and each states which reader belongs on the other,
 * so neither competes for the other's queries. This page deliberately does NOT
 * target "best SEO company in Canada" — that is listicle intent a vendor page
 * cannot honestly win.
 */

export const metadata: Metadata = {
  title: "SEO Services for Canadian Businesses | Published Pricing",
  description:
    "SEO for Canadian businesses, delivered remotely from Montréal: technical foundation, content architecture and AI-search visibility. Published pricing at $600–$850 CAD/month, no 12-month contract.",
  alternates: {
    canonical: "/seo-canada",
    languages: { "en-CA": url, "x-default": url },
  },
  openGraph: {
    title: "SEO Services for Canadian Businesses",
    description:
      "Remote-delivered SEO for businesses across Canada. Published pricing, written reporting, no lock-in.",
    url,
    type: "website",
  },
  robots: { index: true, follow: true },
};

const FAQ: [string, string][] = [
  [
    "Do you work with businesses outside Montréal?",
    "Yes — the work is remote by default and always has been. Search Console, the site itself, and the reporting are all things that don't require being in the room. Our published case studies span a Montréal travel agency, a financial platform, a real-time mobile app and a Canadian ecommerce store; none of that work depended on proximity.",
  ],
  [
    "What's the difference between national SEO and local SEO?",
    "Local SEO competes for the map pack and 'near me' searches in one city — it depends on your Google Business Profile, proximity to the searcher, and local citations. National SEO competes for service terms across the country, where proximity doesn't apply and the work shifts to technical foundation, content depth and authority. If you serve one city, you want local. If you sell across Canada, you want national. Many businesses need both, and they're not the same work.",
  ],
  [
    "How much does SEO cost in Canada?",
    "Ours is published: $600 CAD/month (Essential) and $850 CAD/month (Growth), with no 12-month contract. The wider Canadian market generally runs $500–$5,000+/month depending on scope and agency size — we break down what each band actually buys in our guide to SEO costs in Canada.",
  ],
  [
    "Does operating in French matter if my business is outside Québec?",
    "It depends entirely on whether you sell into Québec. If you do, a French presence is reach your competitors usually aren't covering — our own research measured Québécois writing « site web » 2.6× more often than « site internet », which is the kind of detail machine translation gets wrong. If you don't sell into Québec, English-only is the honest answer and we'll say so.",
  ],
  [
    "Do you guarantee first-page rankings?",
    "No, and neither can anyone else — nobody controls Google. What we commit to is the work delivered each month, a plain-language report of what changed, and no contract keeping you if it isn't working. Our measured results are published with their sources and dates in our case studies.",
  ],
  [
    "How long before results show?",
    "Technical fixes often move within weeks; competitive positions take months and compound afterwards. One client platform went from zero organic clicks to page-1 positions in eight weeks, but that followed a full technical rebuild in a favourable niche — it isn't a promise, it's one measured data point.",
  ],
];

export default function SeoCanadaPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/seo-canada"
        name="SEO Services for Canadian Businesses"
        description="Remote-delivered search engine optimization for businesses across Canada: technical SEO, content architecture, and AI-search visibility, with published monthly pricing."
        offers={[
          { name: "Growth SEO — Essential", price: 600, interval: "MONTH" },
          { name: "Growth SEO — Growth", price: 850, interval: "MONTH" },
        ]}
        breadcrumb={[
          ["Home", "/"],
          ["Services", "/services"],
          ["SEO Canada", "/seo-canada"],
        ]}
        faq={FAQ}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">SEO · Canada</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            SEO for Canadian businesses — with the prices on the page.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">What is national SEO?</strong> It&apos;s the work that gets your business
            found across Canada for the things you actually sell, rather than only in the city you&apos;re sitting in.
            Technical foundation, content architecture, and — increasingly — being legible to the AI systems that now
            answer a growing share of searches. StillAwake Media is a Montréal studio that delivers it remotely, with
            published pricing and no 12-month contract.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://stillawake.studio/start"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90"
            >
              Start a project →
            </a>
            <Link
              href="/work"
              className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40"
            >
              See measured results →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-4 pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">
              Looking for local Montréal SEO instead?
            </h2>
            <p className="mt-3 max-w-3xl leading-8 text-[#C7B9B9]">
              These are different jobs, so they have different pages. If you need the map pack, your Google Business
              Profile and &quot;near me&quot; visibility in one city, that work lives on{" "}
              <Link href="/seo-montreal" className="text-[#D71920] underline underline-offset-4">
                SEO Montréal
              </Link>
              , with the French version at{" "}
              <Link href="/fr/agence-seo-montreal" className="text-[#D71920] underline underline-offset-4">
                agence SEO Montréal
              </Link>
              . This page is for businesses selling across Canada, where proximity to the searcher doesn&apos;t apply.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Published monthly pricing. Canadian dollars.
          </h2>
          <p className="mt-4 max-w-3xl text-[#C7B9B9]">
            In our research across this market we found exactly one competitor publishing SEO prices. Here are ours,
            and they&apos;re the same wherever in Canada you are.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PriceCard
              name="Growth SEO — Essential"
              price="$600 CAD"
              cadence="per month"
              items={[
                "Technical SEO foundation",
                "On-page optimization",
                "Google Search Console monitoring",
                "Plain-language monthly report",
              ]}
              cta={["Start with Essential", "https://stillawake.studio/start"]}
            />
            <PriceCard
              name="Growth SEO — Growth"
              price="$850 CAD"
              cadence="per month"
              items={[
                "Everything in Essential",
                "AI-engine optimization (AEO)",
                "Entity and structured-data work",
                "Content strategy",
              ]}
              cta={["Start with Growth", "https://stillawake.studio/start"]}
              highlight
            />
          </div>
          <p className="mt-6 text-sm text-[#8F8585]">
            No 12-month contract. Full breakdown of what the Canadian market charges is in{" "}
            <Link
              href="/stillawake-times/how-much-does-seo-cost-canada"
              className="text-[#D71920] underline underline-offset-4"
            >
              how much SEO costs in Canada
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-4xl space-y-14">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
              What changes when the market is national
            </h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Local SEO has a shortcut: proximity. If someone searches from three blocks away, Google weighs that
              heavily, and a well-kept Google Business Profile can carry a lot of the result. National search has no
              such shortcut. You&apos;re competing against every other Canadian business selling the same thing, and
              the only levers left are the slow ones — a technically sound site, content that genuinely answers the
              question better than the incumbents, and enough credible references that Google trusts you on the
              subject.
            </p>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              That has a practical consequence worth saying out loud: national SEO usually takes longer than local,
              and the honest strategy for a newer domain is to win specific, lower-competition queries first rather
              than throwing budget at head terms it cannot yet reach.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
              The bilingual advantage most Canadian competitors skip
            </h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              If you sell into Québec, the French side of your market is usually far less contested than the English
              side — and most national competitors either ignore it or run it through machine translation, which
              Québécois readers spot instantly. Our own keyword research measured real differences in how the market
              searches, down to vocabulary: « site web » outpaces « site internet » roughly 2.6 to 1 here.
            </p>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              This site is the demonstration — every commercial page exists in both languages with reciprocal
              hreflang, written natively rather than translated. Whether that&apos;s worth doing for your business
              depends on whether you actually sell into Québec, and we&apos;ll tell you if the answer is no.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">
              Search is splitting, and we build for both halves
            </h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              A growing share of questions now end in an AI-generated answer instead of a list of links. Being cited
              there is a different discipline — structured data, extractable facts, published prices, machine-readable
              summaries. We treat it as engineering rather than speculation, and we publish free tooling for it: our{" "}
              <Link
                href="/tools/llms-txt-generator"
                className="text-[#D71920] underline underline-offset-4"
              >
                llms.txt generator
              </Link>{" "}
              reports what an answer engine can and cannot determine about a business. The commercial version of that
              work is{" "}
              <Link
                href="/answer-engine-optimization"
                className="text-[#D71920] underline underline-offset-4"
              >
                answer engine optimization
              </Link>
              , included in the Growth plan.
            </p>
          </div>

          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em] md:text-4xl">Proof, with sources and dates</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Client work:{" "}
              <Link href="/work/lisa-travel-design" className="text-[#D71920] underline underline-offset-4">
                TravelDesign By Lisa
              </Link>{" "}
              went from zero organic clicks to page-1 positions in eight weeks after roughly 2,300 technical defects
              were cleared across an 834-URL trilingual platform.{" "}
              <Link href="/work/stalkr-navtrl" className="text-[#D71920] underline underline-offset-4">
                NAVTRL
              </Link>{" "}
              measures 98/100/100 on Chrome Lighthouse with a perfect agentic-navigation score.
            </p>
            <p className="mt-4 leading-8 text-[#C7B9B9]">
              And two we own and operate rather than sell to — which is where a lot of this experience comes from:{" "}
              <Link href="/work/bankdemark" className="text-[#D71920] underline underline-offset-4">
                BankDeMark
              </Link>{" "}
              holds average position 1.3 on its query cluster at a measured 100/100/100, and{" "}
              <Link href="/work/blackwater-aquatics" className="text-[#D71920] underline underline-offset-4">
                Blackwater Aquatics
              </Link>
              , a Canadian store Jaeden founded and runs, earns weekly organic orders with an 8.6% CTR product page and
              a repeat-customer rate that went from 5.9% to 27.8%. Every figure carries its source and measurement
              window.
            </p>
          </div>
        </div>
      </section>

      <FaqBlock title="Questions about SEO across Canada" items={FAQ} />

      <RelatedServices
        title="Related"
        links={[
          ["SEO Montréal (local intent)", "/seo-montreal"],
          ["Answer Engine Optimization", "/answer-engine-optimization"],
          ["Free llms.txt generator", "/tools/llms-txt-generator"],
          ["Why isn't my website ranking?", "/stillawake-times/why-is-my-website-not-ranking-on-google"],
          ["What SEO costs in Canada", "/stillawake-times/how-much-does-seo-cost-canada"],
          ["Case studies", "/work"],
        ]}
      />
    </main>
  );
}
