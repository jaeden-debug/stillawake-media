import type { Metadata } from "next";
import Link from "next/link";
import { AuditCta, MagazineInjection, RelatedReadingInjection, InternalLinks } from "@/components/site";

const pageUrl = "https://stillawakemedia.com/web-design-montreal";

export const metadata: Metadata = {
  title: "Web Design Montreal | Premium Websites Built for Growth",
  description:
    "Premium web design Montreal services built for SEO, speed, trust, conversion, branding, and long-term business growth.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Web Design Montreal | StillAwake Media",
    description:
      "Premium Montreal web design built for trust, SEO, performance, conversion, and modern digital infrastructure.",
    url: pageUrl,
    type: "website",
  },
};

const relatedPages = [
  ["/montreal-web-designer", "Montreal Web Designer"],
  ["/web-design-agency-montreal", "Web Design Agency Montreal"],
  ["/web-development-montreal", "Web Development Montreal"],
  ["/seo-montreal", "SEO Montreal"],
  ["/website-redesign-montreal", "Website Redesign Montreal"],
  ["/ecommerce-web-design-montreal", "Ecommerce Web Design Montreal"],
  ["/fr/agence-web-montreal", "Agence Web Montréal"],
];

const relatedArticles = [
  ["/stillawake-times/best-website-design-for-small-businesses-2026", "Best Website Design for Small Businesses in 2026"],
  ["/stillawake-times/why-custom-coded-websites-outperform-templates", "Why Custom-Coded Websites Outperform Templates"],
  ["/stillawake-times/what-makes-a-high-converting-website", "What Makes a High-Converting Website"],
  ["/stillawake-times/how-website-speed-directly-impacts-revenue-and-seo-rankings", "How Website Speed Impacts Revenue & SEO"],
  ["/stillawake-times/what-makes-a-luxury-brand-website-feel-premium", "What Makes a Luxury Brand Website Feel Premium"],
  ["/stillawake-times/framer-seo-guide", "Framer SEO Guide"],
];

const sections = [
  {
    title: "What Web Design Montreal Means Now",
    body: [
      "Web design in Montreal is no longer about putting a business online. Most serious businesses already have some form of website. The real question is whether that website helps the business compete.",
      "A modern website needs to create trust quickly, communicate positioning clearly, perform well on mobile, load fast, support search visibility, and move visitors toward action without feeling forced.",
      "For Montreal businesses, this matters because the market is both local and global. A restaurant, clinic, contractor, consultant, ecommerce brand, startup, or professional service firm is judged against the best digital experiences people use every day.",
      "StillAwake Media approaches web design as digital infrastructure: design, SEO, performance, branding, and conversion architecture working together instead of being treated as separate pieces."
    ],
  },
  {
    title: "Who This Page Is For",
    body: [
      "This page is for Montreal business owners, founders, operators, consultants, and teams that need more than a basic website.",
      "It is for businesses that know their current site does not reflect the quality of their work. It is for companies that are tired of generic templates, slow pages, weak mobile UX, poor SEO structure, and websites that look fine but do not generate serious leads.",
      "It is also for businesses preparing to scale: brands that need stronger positioning, better organic visibility, stronger service pages, ecommerce systems, content hubs, lead capture, analytics, or future custom software integrations.",
      "The goal is not to sell a design trend. The goal is to build a website that can support business growth."
    ],
  },
  {
    title: "What Is Included in Serious Web Design",
    body: [
      "A serious web design project includes strategy before visuals. The business model, audience, local search opportunity, competitive landscape, offer structure, brand positioning, and conversion goals must be understood before the interface is designed.",
      "A strong build includes information architecture, mobile-first UX, SEO-ready page structure, clear hierarchy, technical performance, internal linking, visual identity alignment, metadata, schema planning, analytics readiness, and a scalable structure for future content.",
      "The difference between a surface-level website and a real digital system is the foundation. A basic website may look acceptable for a short time. A real web system can evolve into landing pages, articles, service pillars, ecommerce, automation, dashboards, and software."
    ],
  },
  {
    title: "Why Montreal Businesses Need Better Websites",
    body: [
      "Montreal is full of strong businesses with weak digital presentation. This creates an opportunity for companies willing to invest in quality.",
      "A website influences how customers perceive professionalism, pricing, trust, and competence. A slow, cluttered, outdated, or generic site can make a strong business feel less credible than it actually is.",
      "The reverse is also true. A sharp, fast, well-structured website can make a business feel more established, more premium, and more trustworthy before a call ever happens.",
      "In local markets, that difference matters. People searching for web design Montreal, website design Montreal, SEO Montreal, Shopify Montreal, or service providers in any industry are comparing options quickly. The business that feels clearest and most credible usually wins more attention."
    ],
  },
  {
    title: "The StillAwake Media Difference",
    body: [
      "StillAwake Media is not positioned as a generic website vendor. The work sits at the intersection of premium web design, SEO systems, branding, software thinking, AI automation, and digital infrastructure.",
      "That matters because modern websites are no longer isolated marketing assets. They connect to search engines, content systems, analytics, CRM tools, ecommerce platforms, social proof, email flows, automation, and future software layers.",
      "The StillAwake approach is simple: build websites that feel premium on the surface and intelligent underneath. The design should create trust. The structure should support SEO. The performance should feel fast. The messaging should be clear. The system should be able to grow."
    ],
  },
  {
    title: "SEO Built Into the Foundation",
    body: [
      "SEO cannot be treated as something added after launch. The structure of the website determines how easily Google can crawl, understand, and rank the business.",
      "A Montreal web design project should consider page hierarchy, internal linking, metadata, heading structure, local intent, service pages, bilingual opportunities, content hubs, schema, sitemap logic, and technical performance from the beginning.",
      "The strongest websites do not rely on one homepage to rank for everything. They build clusters. A main web design Montreal page can connect to Montreal web designer, web design agency Montreal, web development Montreal, SEO Montreal, website redesign Montreal, ecommerce web design Montreal, and French Quebec pages like agence web Montréal.",
      "This creates a semantic network that helps Google understand the business more deeply."
    ],
  },
  {
    title: "Performance and Core Web Vitals",
    body: [
      "Speed is part of trust. A website that loads slowly feels less professional before the visitor reads a single word.",
      "Performance affects SEO, mobile usability, bounce rate, conversion rate, and brand perception. A premium website should not feel heavy, unstable, or delayed.",
      "StillAwake Media treats performance as a design constraint. Image delivery, rendering strategy, layout stability, script weight, hosting, caching, and mobile responsiveness all shape the final experience.",
      "A high-end website is not only beautiful. It feels immediate."
    ],
  },
  {
    title: "Conversion Architecture",
    body: [
      "A website can be visually strong and still fail if it does not guide behavior.",
      "Conversion-focused web design is about reducing uncertainty. Visitors should understand what the business does, who it helps, why it is credible, and what step to take next.",
      "This requires strong hierarchy, concise messaging, strategic calls to action, trust signals, frictionless navigation, clear service positioning, and mobile-first layouts.",
      "The best conversion systems do not feel aggressive. They feel natural because the page answers questions in the right order."
    ],
  },
  {
    title: "Branding and Visual Trust",
    body: [
      "Branding and web design are inseparable. Typography, spacing, color, imagery, motion, and layout rhythm all communicate value.",
      "Premium design usually comes from restraint. It does not need to be loud. It needs to feel controlled, intentional, and aligned with the business.",
      "A Montreal business that wants to charge premium prices cannot afford a digital presence that feels generic. The website should support the level of trust the business wants to command."
    ],
  },
  {
    title: "Common Web Design Mistakes",
    body: [
      "The most common mistake is building around appearance instead of architecture. A pretty homepage is not enough.",
      "Other common mistakes include weak mobile UX, slow performance, vague messaging, poor internal linking, no SEO structure, generic template sections, unclear calls to action, bad typography, and treating content as an afterthought.",
      "A website should not be a random collection of sections. It should be a controlled path from attention to trust to action."
    ],
  },
  {
    title: "How Much Does Web Design Cost in Montreal?",
    body: [
      "Web design pricing depends on scope. A simple brochure website, a premium service website, a bilingual local SEO system, a Shopify store, and a custom-coded digital platform are completely different projects.",
      "Cost is influenced by strategy, branding, number of pages, copywriting, SEO depth, development complexity, CMS needs, integrations, animations, ecommerce, technical requirements, and long-term content architecture.",
      "The better question is not only how much the website costs. The better question is what the current website is costing the business in lost trust, weak rankings, low conversion rates, and missed opportunities."
    ],
  },
  {
    title: "Timeline for a Serious Web Design Project",
    body: [
      "A serious website project should move through strategy, structure, content planning, design direction, development, optimization, testing, launch, and post-launch refinement.",
      "Rushing the foundation usually creates problems later. Strong digital systems need enough planning to avoid weak architecture, unclear messaging, and technical debt.",
      "The timeline depends on complexity, but the process should always protect quality."
    ],
  },
  {
    title: "Related Montreal Services",
    body: [
      "Web design connects naturally with SEO, branding, development, Shopify, Framer, AI automation, and technical performance.",
      "A business may start with a website but eventually need local SEO, ecommerce optimization, custom software, content systems, bilingual pages, or automation workflows.",
      "That is why StillAwake Media builds the website as a platform instead of a dead-end asset."
    ],
  },
];

const faqs = [
  ["What is web design Montreal?", "Web design Montreal refers to professional website design services for Montreal businesses, including UX, branding, SEO structure, mobile optimization, performance, and conversion-focused layouts."],
  ["How much does web design cost in Montreal?", "The cost depends on scope, page count, design complexity, SEO requirements, branding, copywriting, ecommerce, integrations, and whether the site is custom-coded or built on a platform like Framer or Shopify."],
  ["What makes a good Montreal web design company?", "A strong web design partner should understand design, SEO, performance, mobile UX, conversion strategy, branding, and long-term digital infrastructure."],
  ["Is SEO included in web design?", "It should be. SEO-friendly structure, metadata, headings, internal linking, performance, and crawlability should be planned during the web design process, not after launch."],
  ["Should my Montreal business have a bilingual website?", "For many Montreal and Quebec businesses, bilingual English and French pages can improve trust, reach, and organic visibility. French pages should be written for Quebec search behavior, not machine translated."],
  ["What platform is best for web design?", "The best platform depends on the business. Framer can be strong for premium marketing sites, Shopify for ecommerce, and Next.js for high-performance custom systems."],
  ["How long does a website project take?", "Timelines vary based on scope, content, design complexity, SEO depth, and technical requirements. A serious project should include strategy, design, development, testing, and launch refinement."],
  ["Can better web design improve conversions?", "Yes. Clear messaging, strong hierarchy, faster performance, better trust signals, and mobile-first UX can all improve the percentage of visitors who take action."],
  ["Why do template websites underperform?", "Templates often create generic visuals, bloated code, weak differentiation, limited SEO structure, and poor scalability when a business grows."],
  ["Does website speed matter for SEO?", "Yes. Speed affects user experience, Core Web Vitals, bounce rates, and overall search performance."],
  ["What is the difference between web design and web development?", "Web design focuses on UX, layout, branding, and visual structure. Web development focuses on code, performance, integrations, infrastructure, and technical implementation."],
  ["Can StillAwake Media redesign an existing website?", "Yes. Redesign work can improve UX, speed, branding, SEO preservation, structure, and conversion performance."],
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
        "Premium web design Montreal services built for SEO, speed, trust, conversion, branding, and long-term business growth.",
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
            Premium Montreal web design built for trust, speed, SEO, conversion,
            branding, and long-term digital growth.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white">
              Start your project →
            </Link>
            <Link href="/portfolio" className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9]">
              View selected work →
            </Link>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-[#888]">
            Canada-based digital studio serving Montreal businesses with modern
            websites, SEO systems, branding, ecommerce, software, and digital
            infrastructure.
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
              Professional web design in Montreal should include strategy, UX,
              branding, SEO structure, mobile-first layouts, fast performance,
              conversion-focused content, clean development, analytics readiness,
              and a scalable architecture that can grow with the business.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-4xl border border-white/10 bg-white/4 p-5">
              <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                Local Pillars
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
            convert visitors, or support future growth, StillAwake Media can help
            rebuild the system.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-white px-7 py-4 text-sm font-bold text-black">
              Start your project →
            </Link>
            <Link href="/about" className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white">
              Learn about StillAwake Media →
            </Link>
          </div>
        </div>
      </section>

      <AuditCta />
      <MagazineInjection />
      <RelatedReadingInjection />
      <InternalLinks />
    </main>
  );
}
