import type { Metadata } from "next";
import Link from "next/link";
import { AuditCta, MagazineInjection, RelatedReadingInjection, InternalLinks } from "@/components/site";

const pageUrl = "https://stillawakemedia.com/web-design-montreal";

export const metadata: Metadata = {
  title: "Web Design Montreal | Premium Websites Built for Growth",
  description: "Premium web design in Montreal with published pricing context and measured results: page-1 rankings, 100/100 Lighthouse scores, and four sourced case studies.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-CA": pageUrl,
      "fr-CA": "https://stillawakemedia.com/fr/agence-web-montreal",
    },
  },
  openGraph: {
    title: "Web Design Montreal",
    description:
      "Premium Montreal web design proven by measured results — page-1 rankings, perfect Lighthouse scores, sourced case studies.",
    url: pageUrl,
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const relatedPages = [
  ["/seo-montreal", "SEO Montreal"],
  ["/website-redesign", "Website Redesign"],
  ["/shopify-development", "Shopify Development"],
  ["/framer-development", "Framer Development"],
  ["/software-development", "Software Development"],
  ["/branding", "Branding"],
  ["/work", "Case Studies"],
  ["/fr/agence-web-montreal", "Agence Web Montréal"],
];

const relatedArticles = [
  ["/stillawake-times/best-website-design-for-small-businesses-2026", "Best Website Design for Small Businesses in 2026"],
  ["/stillawake-times/why-custom-coded-websites-outperform-templates", "Why Custom-Coded Websites Outperform Templates"],
  ["/stillawake-times/what-makes-a-high-converting-website", "What Makes a High-Converting Website"],
  ["/stillawake-times/how-website-speed-directly-impacts-revenue-and-seo-rankings", "How Website Speed Impacts Revenue & SEO"],
  ["/stillawake-times/what-makes-a-luxury-brand-website-feel-premium", "What Makes a Luxury Brand Website Feel Premium"],
  ["/stillawake-times/framer-seo-guide", "Framer SEO Guide"],
  ["/stillawake-times/core-web-vitals-guide", "Core Web Vitals: How to Actually Fix Them"],
];

const caseStudies: [string, string, string, string][] = [
  [
    "/work/lisa-travel-design",
    "TravelDesign By Lisa",
    "0 → page 1 in 8 weeks",
    "834-URL trilingual platform: ~2,300 SEO defects cleared, 9-minute average sessions, CLS 0.00 and Best Practices 100 measured Aug 2026, page-1 rankings from zero organic clicks.",
  ],
  [
    "/work/bankdemark",
    "BankDeMark",
    "Position 1.3 · 100/100/100",
    "Financial platform holding average position 1.3 on its brand cluster with a perfect measured Lighthouse score — 91 URLs, 13 interactive calculators, money-math verified by 26 golden test cases.",
  ],
  [
    "/work/stalkr-navtrl",
    "NAVTRL / Stalkr",
    "31-route site in 19 days",
    "Marketing engine built alongside a mobile app: 19 intent-targeted landing pages, 34 lifecycle email templates, measured 98/100/100 Lighthouse with a perfect agentic-navigation score.",
  ],
  [
    "/work/blackwater-aquatics",
    "Blackwater Aquatics",
    "8.6% CTR product page",
    "Education-led Shopify build: 64 content pages behind 17 products, ~60,000 impressions on the top 12 URLs, repeat-customer rate up from 5.9% to 27.8%.",
  ],
];

const sections = [
  {
    title: "What Web Design Montreal Means Now",
    body: [
      "Most serious Montréal businesses already have a website. The real question is whether it competes: does it rank for the searches your customers actually type, load instantly on a phone, earn trust in the first five seconds, and turn visitors into inquiries?",
      "StillAwake Media builds websites as growth infrastructure — design, SEO architecture, performance and conversion working as one system instead of a pretty brochure. The proof standard we hold ourselves to is on this page: every claim links to a sourced, dated case study.",
      "One market fact worth knowing before you brief any agency: in our keyword research for this market (Google Ads Keyword Planner, Canada), searches around web design Montreal cluster to roughly six hundred per month in English, with a parallel French market most agencies ignore. A bilingual build isn't a nice-to-have here — it's reach your competitors are leaving on the table.",
    ],
  },
  {
    title: "What a Serious Build Includes",
    body: [
      "Strategy before visuals: your offer, your market, and the search demand around it — mapped before the interface is designed. Then original design (never a purchased template), mobile-first UX, SEO-ready structure with clean headings and internal linking, structured data, analytics, and a content architecture that can grow into service pages, articles and landing pages without a rebuild.",
      "Concretely, that structure is what put TravelDesign By Lisa on page 1: not a trick, but 834 correctly-structured URLs in three languages, ~2,300 technical SEO defects cleared, and dedicated pages matched to real search intent. The architecture is the ranking strategy.",
      "Every build ships with training and full ownership — code, accounts, content. No hostage-taking.",
    ],
  },
  {
    title: "Performance Is Measured, Not Promised",
    body: [
      "Speed and stability are part of trust, and they're testable — so we publish our numbers instead of adjectives. Measured with Chrome Lighthouse (mobile) in August 2026: BankDeMark scores 100/100/100 across performance, accessibility and best practices. NAVTRL scores 98/100/100 with a perfect 100 on agentic navigation — the audit of how well AI assistants can read and navigate a site. Lisa's platform holds CLS 0.00 (zero layout shift) with Best Practices 100.",
      "Ask any web design agency you're comparing for their live Lighthouse scores on real client work. It's a fast way to separate builders from resellers.",
    ],
  },
  {
    title: "Built for Google — and for AI Answers",
    body: [
      "Search is splitting in two: classic Google results, and AI assistants that read the web and answer directly. We build for both. Clean structured data, extractable pricing, llms.txt, and question-shaped content mean your business can be cited when someone asks ChatGPT or Claude who to hire in Montréal — the same discipline documented on our SEO Montréal page and proven by rankings our clients hold today.",
      "This page's own architecture is the demo: FAQ schema, service schema, bilingual hreflang pairing with its French twin, and internal links that concentrate authority instead of scattering it.",
    ],
  },
];

const pricingRows: [string, string, string][] = [
  ["Professionally built small-business site", "$3,000 – $10,000", "Page count, copywriting, design customization"],
  ["Custom-designed business site", "$8,000 – $25,000", "Original design, SEO architecture, content systems"],
  ["Ecommerce / Shopify store", "$5,000 – $30,000+", "Catalogue size, custom theme, integrations, bilingual"],
  ["Custom web application / SaaS", "$15,000 – $100,000+", "Features, accounts, payments, integrations, scale"],
];

const faqs = [
  ["How much does web design cost in Montreal?", "Typical 2026 Canadian market ranges: professionally built small-business sites roughly $3,000–$10,000; custom-designed business sites $8,000–$25,000; ecommerce stores $5,000–$30,000+; custom web applications $15,000 to well past $100,000. These are market observations, not quotes — every StillAwake project gets a written scope with a fixed price before you commit. Full breakdown in our website cost guide."],
  ["What results has StillAwake Media actually delivered?", "Sourced and dated in our case studies: a trilingual 834-URL platform taken from zero organic clicks to page-1 rankings in 8 weeks; a financial platform holding average position 1.3 with a measured 100/100/100 Lighthouse score; a 31-route marketing site built in 19 days scoring 98/100/100; and a Shopify store whose product page earns an 8.6% organic CTR."],
  ["Is SEO included in web design?", "In our builds, yes — structure, metadata, headings, internal linking, structured data and performance are designed in from the start, because retrofitting SEO costs more than building it right. Ongoing ranking work is separate: SEO plans are $600–$850 CAD/month, published on the SEO Montréal page."],
  ["Should my Montreal business have a bilingual website?", "For most, yes. The French-speaking market searches differently (our research measures Québécois say « site web » 2.6× more often than « site internet ») and most competitors serve it badly. We build true French pages written for Québec search behavior — this site itself runs every page in both languages with hreflang."],
  ["What platform is best for web design?", "It depends on the job, and we build on all three: Framer for premium marketing sites on a tighter budget and timeline, Shopify for ecommerce, and Next.js for high-performance custom systems. The honest comparison is on our Framer and Shopify service pages — we'll recommend the cheaper option when it genuinely fits."],
  ["How long does a website project take?", "Depends on scope, but our measured reference points: a 31-route marketing site with 19 landing pages shipped in 19 days; a full mobile app went from first commit to TestFlight-ready in 24 days. Serious multi-language platforms take longer. Your written scope includes the timeline with milestones."],
  ["Can StillAwake Media redesign an existing website?", "Yes — redesigns that preserve existing rankings while fixing UX, speed and structure are covered on our website redesign page, including how we handle redirects so you don't lose the traffic you already earn."],
  ["Why do template websites underperform?", "Bloated code hurts Core Web Vitals, generic structure gives Google nothing distinctive to rank, and every competitor with the same template dilutes your brand. Our article on custom-coded vs template websites covers the evidence."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Web Design Montreal",
      description:
        "Premium web design Montreal services with published pricing context and measured, sourced results.",
      inLanguage: "en-CA",
    },
    {
      "@type": "Service",
      name: "Web Design Montreal",
      serviceType: "Web Design",
      areaServed: {
        "@type": "City",
        name: "Montreal",
      },
      provider: {
        "@type": "Organization",
        name: "StillAwake Media",
        url: "https://stillawakemedia.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://stillawakemedia.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Web Design Montreal",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden px-6 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.2),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Web Design Montreal
          </p>

          <h1 className="geist max-w-6xl text-5xl font-black leading-[.88] tracking-[-0.08em] md:text-8xl">
            Web design Montreal businesses can use as growth infrastructure.
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            Premium Montreal web design proven by measured results: page-1 rankings, 100/100 Lighthouse
            scores, and four case studies where every number is sourced and dated.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/start" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white">
              Start your project →
            </Link>
            <Link href="/work" className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9]">
              See measured results →
            </Link>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-[#888]">
            Canada-based digital studio serving Montréal businesses with modern
            websites, SEO systems, branding, ecommerce, and custom software.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="glass rounded-[2.5rem] p-8 md:p-12">
            <p className="mb-5 text-sm uppercase tracking-[.35em] text-[#D71920]">
              Quick Answer
            </p>
            <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              What should professional web design in Montreal actually include?
            </h2>
            <p className="mt-8 max-w-4xl text-lg leading-8 text-[#C7B9B9]">
              Strategy, original design, SEO-ready structure, mobile-first UX, fast measured performance,
              bilingual capability, and a scalable architecture — typically $3,000–$10,000 for a professional
              small-business site and $8,000–$25,000 for a fully custom one (2026 Canadian market ranges;
              every StillAwake project gets a fixed written quote).
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Proof, not promises</p>
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Four builds. Every number sourced and dated.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {caseStudies.map(([href, name, stat, detail]) => (
              <Link key={href} href={href} className="glass rounded-[2rem] p-7 transition hover:border-[#D71920]/60">
                <p className="geist text-2xl font-black tracking-[-0.04em] text-[#D71920]">{stat}</p>
                <h3 className="mt-2 text-xl font-semibold">{name}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-4xl border border-white/10 bg-white/4 p-5">
              <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                Related Services
              </p>
              <div className="grid gap-3">
                {relatedPages.map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm text-[#C7B9B9] hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <article className="grid gap-12">
            {sections.map((section) => (
              <section key={section.title} className="rounded-[2.5rem] border border-white/10 bg-[#070707] p-8 md:p-12">
                <h2 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
                  {section.title}
                </h2>
                <div className="mt-8 grid gap-5">
                  {section.body.map((p) => (
                    <p key={p} className="text-base leading-8 text-[#C7B9B9]">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-[2.5rem] border border-white/10 bg-[#070707] p-8 md:p-12">
              <h2 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
                What Web Design Costs in Montreal
              </h2>
              <p className="mt-8 text-base leading-8 text-[#C7B9B9]">
                Most agencies hide pricing until you book a call. Here are the real 2026 Canadian market
                ranges — labelled as observations, not quotes, because scope is everything:
              </p>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-[#888]">
                      <th className="py-3 pr-4">Project type</th>
                      <th className="py-3 pr-4">Typical range (CAD)</th>
                      <th className="py-3">What moves the price</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#C7B9B9]">
                    {pricingRows.map(([type, range, drivers]) => (
                      <tr key={type} className="border-b border-white/5">
                        <td className="py-4 pr-4 font-medium text-white">{type}</td>
                        <td className="py-4 pr-4">{range}</td>
                        <td className="py-4">{drivers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-base leading-8 text-[#C7B9B9]">
                Every StillAwake project gets a <strong className="text-white">written scope with a fixed price</strong> before
                you commit — described through an async form, no mandatory sales call. Ongoing work is published
                outright: SEO plans at <strong className="text-white">$600–$850 CAD/month</strong> and emergency support
                at <strong className="text-white">$150–$600 CAD one-time</strong>. Full breakdown in the{" "}
                <Link href="/website-cost-canada" className="text-[#D71920] underline-offset-4 hover:underline">website cost guide</Link>{" "}
                and on <Link href="/pricing" className="text-[#D71920] underline-offset-4 hover:underline">pricing</Link>.
              </p>
            </section>
          </article>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Related Strategy
          </p>
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Supporting articles for smarter web decisions.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map(([href, title]) => (
              <Link key={href} href={href} className="glass rounded-4xl p-7 transition hover:border-[#D71920]/60">
                <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">
                  StillAwake Times
                </p>
                <h3 className="geist mt-4 text-2xl font-black tracking-[-0.06em]">
                  {title}
                </h3>
                <p className="mt-6 text-sm text-[#999]">Read article →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[3rem] border border-white/10 bg-[#070707] p-10 md:p-16">
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
              FAQ
            </p>

            <div className="grid gap-5">
              {faqs.map(([q, a]) => (
                <div key={q} className="rounded-4xl border border-white/10 bg-white/3 p-6">
                  <h3 className="geist text-2xl font-black tracking-tighter">{q}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#D71920]/20 p-10 md:p-16">
          <h2 className="geist max-w-5xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-7xl">
            Build a Montreal website that feels premium and performs underneath.
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#E7DFDF]">
            If your current website does not reflect your quality, rank properly,
            convert visitors, or support future growth, describe it in our async form
            and get a written scope with a fixed price — no sales call required.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/start" className="rounded-full bg-white px-7 py-4 text-sm font-bold text-black">
              Start your project →
            </Link>
            <Link href="/work" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white">
              See the case studies →
            </Link>
          </div>
        </div>
      </section>

      <AuditCta />
      <MagazineInjection />
      <RelatedReadingInjection />
      <InternalLinks />

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
          <p className="mb-3 text-sm uppercase tracking-[.3em] text-[#D71920]">Proof, not promises</p>
          <h2 className="geist max-w-3xl text-3xl font-black tracking-[-0.06em]">Zero organic clicks to page 1 in 8 weeks — measured.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            TravelDesign By Lisa: 834-URL trilingual build, ~2,300 SEO defects cleared, 9-minute average sessions,
            CLS 0.00 and Best Practices 100 measured Aug 2026. Every number sourced and dated in the case study.
          </p>
          <Link href="/work/lisa-travel-design" className="mt-6 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">Read the case study →</Link>
        </div>
      </section>
    </main>
  );
}
