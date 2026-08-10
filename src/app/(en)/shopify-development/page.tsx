import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Shopify Development Services | SEO & Conversion Builds",
  description:
    "StillAwake Media helps ecommerce brands improve Shopify product pages, collections, SEO structure, conversion flow, trust signals, and visual presentation.",
  alternates: {
    canonical: "/shopify-development",
  },
};

const included = [
  [
    "Product pages that answer objections",
    "Manufacturer copy pasted into a description field is duplicate content that ranks for nothing and sells nothing. Product pages get original copy built around the questions that stop people from buying.",
  ],
  [
    "Collections treated as landing pages",
    "Collections are usually the strongest ranking opportunity in a Shopify store and are almost always left as a bare product grid. Given real copy and structure, they become the pages that capture category-level search.",
  ],
  [
    "Duplicate content and canonical audit",
    "Shopify generates multiple URLs for the same product through collection paths and variants. We verify canonical tags resolve to the base product URL so authority consolidates instead of splitting.",
  ],
  [
    "Trust signals placed where hesitation happens",
    "Shipping terms, returns, reviews, and guarantees are positioned at the decision points rather than buried in a policy page nobody opens.",
  ],
  [
    "Conversion flow through checkout",
    "Cart, upsell placement, and checkout friction are reviewed as one path, because traffic gains are wasted if the last three steps leak.",
  ],
  [
    "Content-driven ecommerce growth",
    "Buying guides and comparison content capture demand before the purchase decision and feed internal links back to the collections meant to rank.",
  ],
];

const faqs = [
  [
    "Is Shopify good for SEO?",
    "Yes. Shopify handles the fundamentals well — sitemaps, canonical tags, HTTPS, and metadata controls. Its real constraints are fixed URL prefixes and the duplicate content created by collection and variant URLs, both of which are manageable.",
  ],
  [
    "Why is my store getting traffic but not sales?",
    "Usually the traffic is arriving on pages that were never structured to convert, or the hesitation points are unaddressed at the moment of decision. It is worth diagnosing which of the two it is before spending more on acquisition.",
  ],
  [
    "Do you work on existing stores or only new builds?",
    "Both. Most of this work is done on existing stores that already have products and traffic but a structure that is limiting what either can produce.",
  ],
];

export default function Page() {
  const points = ['Product page optimization', 'Collection SEO', 'Trust sections', 'Conversion UX', 'Shopify structure', 'Content-driven ecommerce growth'];

  return (
    <main className="pt-28">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Shopify Development
          </p>

          <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
            Shopify stores built for trust, speed, and organic growth.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            StillAwake Media helps ecommerce brands improve product pages, collections, SEO structure, conversion flow, trust signals, and visual presentation.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#D71920] px-6 py-4 font-bold">
              Start a Project →
            </Link>

            <Link href="/portfolio" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
              View Work →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {points.map((point) => (
            <div key={point} className="glass rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                StillAwake System
              </p>
              <h2 className="geist mt-4 text-3xl font-black tracking-[-0.06em]">
                {point}
              </h2>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            What&apos;s Included
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Most Shopify stores are losing revenue structurally.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Not because the products are wrong or the theme is ugly, but because
            collections are empty grids, product copy is duplicated from the
            supplier, and the pages with the most search potential were never
            treated as pages at all. That is fixable without replatforming.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {included.map(([heading, body]) => (
              <div key={heading} className="glass rounded-[2rem] p-7">
                <h3 className="geist text-2xl font-black tracking-[-0.05em]">
                  {heading}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#C7B9B9]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Questions
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Shopify, answered honestly.
          </h2>

          <div className="mt-12 space-y-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="glass rounded-[2rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.04em]">
                  {question}
                </h3>
                <p className="mt-3 max-w-4xl text-base leading-8 text-[#C7B9B9]">
                  {answer}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            For the full breakdown, read our{" "}
            <Link href="/stillawake-times/shopify-seo-guide" className="text-white underline decoration-[#D71920] underline-offset-4">
              Shopify SEO guide
            </Link>
            , or see how we structure builds in our{" "}
            <Link href="/work" className="text-white underline decoration-[#D71920] underline-offset-4">
              case studies
            </Link>
            .
          </p>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
