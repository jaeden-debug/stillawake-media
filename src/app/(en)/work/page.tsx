import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";
import { siteUrl } from "@/lib/data";

import { Testimonials } from "@/components/testimonials";
const pageUrl = `${siteUrl}/work`;

export const metadata: Metadata = {
  title: "Case Studies | How We Build Client Projects",
  description:
    "Build breakdowns from StillAwake Media client projects — the brief, the page architecture, the SEO structure, and the design decisions behind each website.",
  alternates: {
    canonical: "/work",
    languages: {
      "en-CA": "https://stillawakemedia.com/work",
      "fr-CA": "https://stillawakemedia.com/fr/etudes-de-cas",
      "x-default": "https://stillawakemedia.com/work",
    },
  },
  openGraph: {
    title: "Case Studies",
    description:
      "Build breakdowns from StillAwake Media client projects — brief, architecture, SEO structure, and design decisions.",
    url: pageUrl,
    type: "website",
  },
};

const caseStudies = [
  {
    id: "lisa",
    name: "Lisa Travel Design",
    domain: "lisatraveldesign.com",
    url: "https://lisatraveldesign.com",
    discipline: "Website · Brand · Lead Generation",
    brief:
      "A travel designer selling bespoke itineraries needed a site that read as premium before a single price was mentioned, and that turned interest into a qualified inquiry rather than a generic contact form fill.",
    approach: [
      [
        "Positioning before layout",
        "Travel planning is sold on trust. The page order was built to establish credibility first — who plans the trip, how the process works, what the client actually receives — before asking for anything. Pricing pressure gets deferred until the value is legible.",
      ],
      [
        "Lead-focused page structure",
        "Rather than a single catch-all contact page, the inquiry path is threaded through the journey: destination context, planning process, then a structured inquiry that captures trip type and timing so the first reply can already be useful.",
      ],
      [
        "Mobile-first brand experience",
        "Travel research happens on phones. Type scale, image cropping, and section rhythm were designed at mobile width first and expanded upward, so the premium feel survives the screen most visitors actually use.",
      ],
    ],
  },
  {
    id: "navtrl",
    name: "Navtrl",
    domain: "navtrl.com",
    url: "https://navtrl.com",
    discipline: "Digital Product · Website · UX",
    brief:
      "A digital product that needed to be understood in seconds. The risk with product sites is explaining the mechanism before the visitor knows why they should care.",
    approach: [
      [
        "Product-style landing structure",
        "One idea per section, in the order a new visitor forms questions: what is it, who is it for, what does it do, what happens next. No section carries two jobs.",
      ],
      [
        "Clean interface direction",
        "The visual language borrows from the product itself, so the marketing site and the thing being marketed feel continuous. Restraint does more work here than decoration.",
      ],
      [
        "Fast visual scanning",
        "Short line lengths, high-contrast headings, and generous spacing let someone extract the value proposition without reading in full — which is what most first-time visitors actually do.",
      ],
    ],
  },
  {
    id: "bankdemark",
    name: "BankDeMark",
    domain: "bankdemark.com",
    url: "https://bankdemark.com",
    discipline: "SEO Platform · Content Architecture · Tools",
    brief:
      "A finance content platform competing in one of the most authority-dense niches on the web. Publishing more articles was never going to be enough on its own.",
    approach: [
      [
        "Calculator-first SEO architecture",
        "Calculators answer a query completely and give people a reason to stay and return. They anchor each topic cluster, and the supporting articles explain the numbers the calculator produces.",
      ],
      [
        "Finance content structure",
        "Content is organised by search intent rather than by category convenience — one page owns one question, so pages support each other instead of competing for the same result.",
      ],
      [
        "Internal linking system",
        "Links run deliberately between tools and explanations in both directions, so authority concentrates on the pages meant to rank rather than leaking evenly across the site.",
      ],
    ],
  },
  {
    id: "zylx",
    name: "Zylx AI",
    domain: "zylx.ai",
    url: "https://zylx.ai",
    discipline: "AI Software Brand · Positioning · Identity",
    brief:
      "An AI software brand covering workflow systems, agents, and automation — a category where nearly every competitor sounds identical and the language is exhausted.",
    approach: [
      [
        "AI product positioning",
        "The messaging is anchored to the operator's job rather than the model behind it. What the software removes from someone's week is more persuasive than the technology powering it.",
      ],
      [
        "Software brand system",
        "A visual system built to stretch across a product surface, marketing pages, and documentation without being rebuilt each time — components and type scale defined once.",
      ],
      [
        "Workflow-focused messaging",
        "Copy describes concrete workflows instead of abstract capability, so a visitor can place themselves in the product immediately.",
      ],
    ],
  },
  {
    id: "northground",
    name: "Northground Bushcraft",
    domain: "northgroundbushcraft.com",
    url: "https://northgroundbushcraft.com",
    discipline: "Outdoor Brand · Editorial · Website",
    brief:
      "An outdoor and bushcraft brand where credibility is everything. In this audience, a site that looks like a generic template reads as inexperience.",
    approach: [
      [
        "Outdoor identity direction",
        "Palette, texture, and type were drawn from field equipment rather than software design trends, so the brand feels like it belongs to the environment it talks about.",
      ],
      [
        "Editorial brand feel",
        "The layout is built for long-form field content, because in this niche depth of knowledge is the trust signal — and long-form content is also what earns search visibility.",
      ],
      [
        "Trust-building layout",
        "Experience, method, and practical detail are surfaced early rather than buried under brand statements.",
      ],
    ],
  },
];

const constants = [
  [
    "01",
    "Search intent is decided before design",
    "Every page gets one job and one primary query before a layout exists. This is what prevents two pages on the same site from competing for the same result later.",
  ],
  [
    "02",
    "Custom code, not page builders",
    "Builds ship as custom-coded sites so page weight, markup structure, and Core Web Vitals stay under our control instead of being dictated by a plugin stack.",
  ],
  [
    "03",
    "Internal linking is designed, not incidental",
    "Links between pages are planned as an architecture so authority flows toward the pages that are supposed to rank.",
  ],
  [
    "04",
    "Technical SEO is part of the build",
    "Metadata, canonical tags, schema, sitemap structure, and crawlability are implemented during the build rather than retrofitted after launch.",
  ],
  [
    "05",
    "The conversion path is explicit",
    "Every page has a defined next step. Traffic that has nowhere to go is a cost, not an asset.",
  ],
];

const faqs = [
  [
    "What is the difference between this page and the portfolio?",
    "This page explains the reasoning behind each build — the brief, the page architecture, and the structural decisions. The portfolio is the interactive showcase where you can preview each live site directly.",
  ],
  [
    "Do you work with businesses outside Montreal?",
    "Yes. StillAwake Media is based in Montreal and works with clients across Canada and internationally. The projects covered here span travel, finance, software, ecommerce, and outdoor brands.",
  ],
  [
    "How long does a typical project take?",
    "It depends on scope. A focused service or landing page build moves quickly; a full site with an SEO content architecture, brand system, and custom components takes longer because the structure is planned before anything is designed.",
  ],
  [
    "Do you rebuild existing websites or only build new ones?",
    "Both. Redesigns need more care, because rankings and existing URLs have to be preserved through the migration rather than reset by it.",
  ],
];

export default function Page() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: pageUrl },
    ],
  };

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "StillAwake Media Case Studies",
    url: pageUrl,
    description:
      "Build breakdowns from StillAwake Media client projects — the brief, the page architecture, the SEO structure, and the design decisions behind each website.",
    hasPart: caseStudies.map((study) => ({
      "@type": "CreativeWork",
      name: study.name,
      url: study.url,
      abstract: study.brief,
      creator: { "@type": "Organization", name: "StillAwake Media" },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Case Studies
          </p>

          <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
            The reasoning behind the work, not just the screenshots.
          </h1>

          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-[#C7B9B9]">
            <p>
              Most agency work pages are a wall of thumbnails. That tells you a
              project exists, but it tells you nothing about whether the
              thinking behind it would transfer to your business.
            </p>

            <p>
              These breakdowns cover the brief, the page architecture, the
              search structure, and the design decisions behind five live
              StillAwake Media projects across travel, digital product, finance,
              AI software, and outdoor retail. If you want to click through the
              sites themselves, the{" "}
              <Link href="/portfolio" className="text-white underline decoration-[#D71920] underline-offset-4">
                interactive portfolio
              </Link>{" "}
              opens each one in a live preview.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="https://stillawake.studio/start" className="rounded-full bg-[#D71920] px-6 py-4 font-bold">
              Start a Project →
            </Link>

            <Link href="/services" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
              See Services →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl space-y-8">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className="rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14"
            >
              <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                {study.discipline}
              </p>

              <h2 className="geist mt-4 text-4xl font-black tracking-[-0.06em] md:text-6xl">
                {study.name}
              </h2>

              <a
                href={study.url}
                target="_blank"
                rel="noopener"
                className="mt-3 inline-flex text-sm text-[#C7B9B9] transition hover:text-white"
              >
                {study.domain} →
              </a>

              <p className="mt-8 max-w-3xl text-base leading-8 text-[#C7B9B9]">
                <span className="font-bold text-white">The brief. </span>
                {study.brief}
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {study.approach.map(([heading, body]) => (
                  <div key={heading} className="glass rounded-[2rem] p-7">
                    <h3 className="geist text-xl font-black leading-tight tracking-[-0.04em]">
                      {heading}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            What Stays Constant
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Five things every build gets, regardless of industry.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            The industries above have nothing in common. The underlying system
            does. These are the decisions that carry from a travel site to a
            finance platform to an AI software brand.
          </p>

          <div className="mt-12 space-y-4">
            {constants.map(([number, heading, body]) => (
              <div
                key={number}
                className="glass grid gap-4 rounded-[2rem] p-7 md:grid-cols-[auto_1fr] md:gap-10"
              >
                <p className="geist text-3xl font-black tracking-[-0.06em] text-[#D71920]">
                  {number}
                </p>

                <div>
                  <h3 className="geist text-2xl font-black tracking-[-0.05em]">
                    {heading}
                  </h3>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-[#C7B9B9]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Questions
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Common questions about this work.
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
        </div>
      </section>

      <section className="px-6 pb-4">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Go deeper on the strategy.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            The reasoning in these builds is written up in more detail across
            StillAwake Times, including{" "}
            <Link href="/stillawake-times/what-is-technical-seo" className="text-white underline decoration-[#D71920] underline-offset-4">
              technical SEO
            </Link>
            ,{" "}
            <Link href="/stillawake-times/why-custom-coded-websites-outperform-templates" className="text-white underline decoration-[#D71920] underline-offset-4">
              why custom-coded sites outperform templates
            </Link>
            , and{" "}
            <Link href="/stillawake-times/how-to-redesign-a-website-without-destroying-seo" className="text-white underline decoration-[#D71920] underline-offset-4">
              how to redesign a site without destroying its rankings
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-6 pb-8"><div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[.3em] text-[#D71920]">Metric-Driven Case Studies</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[["TravelDesign By Lisa","0 organic clicks to page 1 in 8 weeks — sourced and dated.","/work/lisa-travel-design"],["BankDeMark","#1 Google positions with a perfect 100/100/100 Lighthouse.","/work/bankdemark"],["NAVTRL / Stalkr","A real-time location app built to beta in 24 days.","/work/stalkr-navtrl"],["Blackwater Aquatics","Education-led Shopify: an 8.6% CTR product page and 27.8% repeat customers.","/work/blackwater-aquatics"]].map(([n,d,h])=>(
            <a key={h} href={h} className="rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-7 transition hover:border-[#D71920]">
              <h3 className="geist text-2xl font-black tracking-[-0.05em]">{n}</h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{d}</p>
              <p className="mt-4 text-sm font-semibold text-[#D71920]">Read the numbers →</p>
            </a>
          ))}
        </div>
      </div></section>

      <section className="px-6 pb-8"><div className="glass mx-auto max-w-7xl rounded-[2rem] p-8">
        <h2 className="geist text-3xl font-black tracking-[-0.06em]">Hire the services behind this work.</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {[["Web Design Montréal","/web-design-montreal"],["Shopify Development","/shopify-development"],["SEO Montréal","/seo-montreal"],["Custom Software","/software-development"],["Website Redesign","/website-redesign"],["Branding","/branding"]].map(([n,h])=>(
            <a key={h} href={h} className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-[#D71920]/60 hover:text-white">{n}</a>
          ))}
        </div>
      </div></section>

      <Testimonials placement="work" title="In their words" />

      <InternalLinks />
    </main>
  );
}
