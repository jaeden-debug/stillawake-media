import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Web Design Services | StillAwake Media",
  description:
    "StillAwake Media builds premium websites focused on SEO, conversion systems, performance, branding, and scalable digital architecture.",
};

const sections = [
  {
    title: "Conversion-Focused Architecture",
    text: "Modern websites are not digital brochures. They are systems designed to guide users toward action through structure, hierarchy, speed, and trust.",
  },
  {
    title: "Technical SEO Foundations",
    text: "Semantic structure, crawl depth, internal linking, clean rendering, and fast delivery infrastructure all affect rankings and visibility.",
  },
  {
    title: "Premium Visual Direction",
    text: "Typography, spacing, motion, interaction design, and visual rhythm shape how premium a business feels before visitors read a word.",
  },
  {
    title: "Mobile-First UX",
    text: "Most traffic is mobile. Thumb ergonomics, readability, responsive systems, and touch interactions directly affect conversions.",
  },
  {
    title: "Performance Engineering",
    text: "Fast websites retain visitors, improve trust perception, and create measurable SEO advantages through Core Web Vitals optimization.",
  },
  {
    title: "Scalable Digital Systems",
    text: "Websites should support future growth through content systems, SEO clusters, integrations, automation, and scalable infrastructure.",
  },
];

const articleLinks = [
  {
    href: "/stillawake-times/why-custom-coded-websites-outperform-templates",
    title: "Why Custom-Coded Websites Outperform Templates",
  },
  {
    href: "/stillawake-times/framer-seo-guide",
    title: "Framer SEO Guide",
  },
  {
    href: "/stillawake-times/what-makes-a-high-converting-website",
    title: "What Makes a High-Converting Website",
  },
  {
    href: "/stillawake-times/why-most-business-websites-fail-to-generate-leads",
    title: "Why Most Business Websites Fail to Generate Leads",
  },
  {
    href: "/stillawake-times/what-makes-a-luxury-brand-website-feel-premium",
    title: "What Makes a Luxury Brand Website Feel Premium",
  },
  {
    href: "/stillawake-times/how-website-speed-directly-impacts-revenue-and-seo-rankings",
    title: "How Website Speed Directly Impacts Revenue & SEO Rankings",
  },
];

export default function WebDesignPage() {
  return (
    <main className="pt-28">

      <section className="relative overflow-hidden px-6 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-6 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Web Design Services
          </p>

          <h1 className="geist max-w-6xl text-5xl font-black leading-[.88] tracking-[-0.08em] md:text-8xl">
            Premium websites built for rankings, conversions, authority, and long-term growth.
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            StillAwake Media designs modern websites that combine performance,
            technical SEO, conversion architecture, cinematic visual direction,
            branding systems, and scalable infrastructure into one unified
            digital presence.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/contact"
              className="rounded-full bg-[#B51C1D] px-7 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
            >
              Start a Project →
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9] transition hover:border-white/30 hover:text-white"
            >
              View Portfolio →
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
              What makes a modern website successful?
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              {[
                "Fast loading performance",
                "Mobile-first UX systems",
                "Strong conversion architecture",
                "Technical SEO foundations",
                "Premium visual direction",
                "Scalable content structure",
                "Clear internal linking",
                "Semantic page hierarchy",
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
              What You'll Learn
            </p>

            <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              Modern web design is no longer just about appearance.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              Websites today are expected to rank, convert, scale, build trust,
              communicate positioning, and support long-term growth across
              search engines, AI systems, and mobile-first user behavior.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {sections.map((section) => (
              <div
                key={section.title}
                className="glass rounded-[2rem] p-8"
              >

                <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                  StillAwake System
                </p>

                <h3 className="geist text-3xl font-black tracking-[-0.06em]">
                  {section.title}
                </h3>

                <p className="mt-6 text-base leading-8 text-[#C7B9B9]">
                  {section.text}
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
              Explore the StillAwake knowledge system.
            </h2>

          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {articleLinks.map((article) => (
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
              Build Different
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-7xl">
              Your website should feel like infrastructure — not decoration.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              StillAwake Media builds modern digital systems designed for
              performance, scalability, rankings, conversions, and long-term
              authority growth.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="rounded-full bg-[#B51C1D] px-7 py-4 text-sm font-bold text-white"
              >
                Start a Project →
              </Link>

              <Link
                href="/stillawake-times"
                className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9]"
              >
                Explore Articles →
              </Link>

            </div>

          </div>

        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
