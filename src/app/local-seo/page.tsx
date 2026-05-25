import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Local SEO Services | StillAwake Media",
  description:
    "Local SEO systems built to improve Google Maps visibility, rankings, trust signals, and lead generation for modern businesses.",
};

const systems = [
  {
    title: "Google Business Profile Optimization",
    text: "Google Business Profile structure, categories, service setup, media optimization, posting strategy, and ranking signals directly affect Maps visibility.",
  },
  {
    title: "Local Landing Page Architecture",
    text: "Location pages and service-area structures help Google understand geographic relevance while improving crawlability and conversion flow.",
  },
  {
    title: "Internal Linking Systems",
    text: "Strategic contextual linking distributes authority across service pages, local pages, blog content, and supporting SEO clusters.",
  },
  {
    title: "Technical SEO Infrastructure",
    text: "Semantic HTML, schema markup, crawl depth optimization, Core Web Vitals, and rendering performance all influence local rankings.",
  },
  {
    title: "Trust and Review Signals",
    text: "Review consistency, authority signals, branded search behavior, and reputation systems contribute to local search visibility.",
  },
  {
    title: "Mobile-First Local UX",
    text: "Most local searches happen on mobile devices. Fast mobile experiences and frictionless conversion paths directly affect lead generation.",
  },
];

const articles = [
  {
    href: "/stillawake-times/how-to-rank-higher-on-google-maps",
    title: "How to Rank Higher on Google Maps",
  },
  {
    href: "/stillawake-times/google-business-profile-optimization",
    title: "Google Business Profile Optimization",
  },
  {
    href: "/stillawake-times/what-is-technical-seo",
    title: "What Is Technical SEO?",
  },
  {
    href: "/stillawake-times/why-local-seo-matters",
    title: "Why Local SEO Matters",
  },
  {
    href: "/stillawake-times/how-google-crawls-and-understands-websites",
    title: "How Google Crawls and Understands Websites",
  },
  {
    href: "/stillawake-times/how-website-speed-directly-impacts-revenue-and-seo-rankings",
    title: "How Website Speed Impacts Rankings",
  },
];

export default function LocalSEOPage() {
  return (
    <main className="pt-28">

      <section className="relative overflow-hidden px-6 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-6 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Local SEO Services
          </p>

          <h1 className="geist max-w-6xl text-5xl font-black leading-[.88] tracking-[-0.08em] md:text-8xl">
            Local SEO systems designed to increase visibility, rankings, and qualified leads.
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            StillAwake Media builds local SEO infrastructure focused on Google
            Maps visibility, search rankings, conversion architecture, mobile
            performance, and long-term authority growth.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/contact"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
            >
              Start a Project →
            </Link>

            <Link
              href="/stillawake-times"
              className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9] transition hover:border-white/30 hover:text-white"
            >
              Read Articles →
            </Link>

          </div>

        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">

          <div className="glass rounded-[2.5rem] p-8 md:p-12">

            <p className="mb-5 text-sm uppercase tracking-[.35em] text-[#D71920]">
              Quick Answer
            </p>

            <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              What actually improves local SEO rankings?
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              {[
                "Google Business Profile optimization",
                "Strong local landing pages",
                "Mobile-first performance",
                "Technical SEO structure",
                "Review and trust signals",
                "Internal linking systems",
                "Fast page speed",
                "Location-focused content architecture",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
                >
                  <p className="text-base leading-7 text-[#E7DFDF]">
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14">

            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
              Local Search Infrastructure
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              Local SEO is no longer just citations and keywords.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              Modern local SEO combines technical infrastructure, conversion
              systems, semantic page architecture, mobile-first UX, and local
              authority signals into one integrated digital ecosystem.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {systems.map((system) => (
              <div
                key={system.title}
                className="glass rounded-[2rem] p-8"
              >

                <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                  Local SEO System
                </p>

                <h3 className="geist text-3xl font-black tracking-[-0.06em]">
                  {system.title}
                </h3>

                <p className="mt-6 text-base leading-8 text-[#C7B9B9]">
                  {system.text}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-5xl">

            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
              Related Articles
            </p>

            <h2 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              Explore the local SEO knowledge ecosystem.
            </h2>

          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="glass rounded-[2rem] p-7 transition hover:border-[#D71920]/50"
              >

                <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">
                  Stillawake Times
                </p>

                <h3 className="geist mt-5 text-3xl font-black tracking-[-0.06em]">
                  {article.title}
                </h3>

                <p className="mt-6 text-sm text-[#999]">
                  Read Article →
                </p>

              </Link>
            ))}

          </div>

        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-[3rem] border border-white/10 bg-[#070707] p-10 md:p-16">

            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
              Visibility Matters
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-7xl">
              Your business cannot generate leads from searches it never appears in.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              StillAwake Media builds local SEO systems designed for rankings,
              visibility, trust, mobile performance, and conversion-focused
              growth.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white"
              >
                Start a Project →
              </Link>

              <Link
                href="/web-design"
                className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9]"
              >
                Explore Web Design →
              </Link>

            </div>

          </div>

        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
