import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Custom Software Development | StillAwake Media",
  description: "StillAwake Media builds custom software, dashboards, portals, web applications, AI workflows, and scalable digital systems for modern businesses.",

  alternates: {
    canonical: "https://stillawakedmedia.com/software-development",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const systems = [
  {
    title: "Custom Web Applications",
    text: "Business software should be designed around real workflows, not generic feature lists. Custom web applications create purpose-built systems for operations, clients, teams, and growth.",
  },
  {
    title: "Dashboards and Portals",
    text: "Dashboards and portals help businesses centralize data, simplify client experiences, reduce admin work, and make operations easier to manage.",
  },
  {
    title: "Workflow Automation",
    text: "Software becomes more valuable when it removes repetitive tasks. Automation connects forms, databases, alerts, reports, content systems, and internal processes.",
  },
  {
    title: "AI-Enhanced Systems",
    text: "AI can support research, writing, classification, support, lead handling, reporting, and internal decision-making when it is integrated into practical workflows.",
  },
  {
    title: "Next.js Infrastructure",
    text: "Modern software benefits from fast rendering, clean routing, scalable components, static generation, server logic, APIs, and deployment infrastructure built for performance.",
  },
  {
    title: "Scalable Product Architecture",
    text: "The best systems are built to evolve. Clean data models, modular interfaces, secure authentication, and structured code make future expansion easier.",
  },
];

const articles = [
  {
    href: "/stillawake-times/what-is-custom-software-development",
    title: "What Is Custom Software Development?",
  },
  {
    href: "/stillawake-times/what-is-a-custom-web-application",
    title: "What Is a Custom Web Application?",
  },
  {
    href: "/stillawake-times/why-nextjs-is-the-best-framework-for-modern-websites",
    title: "Why Next.js Is One of the Best Frameworks for Modern Websites",
  },
  {
    href: "/stillawake-times/how-ai-automation-is-changing-modern-businesses",
    title: "How AI Automation Is Changing Modern Businesses",
  },
  {
    href: "/stillawake-times/how-businesses-use-ai-automation-to-save-hundreds-of-hours",
    title: "How Businesses Use AI Automation to Save Hundreds of Hours",
  },
  {
    href: "/stillawake-times/how-google-crawls-and-understands-websites",
    title: "How Google Crawls and Understands Websites",
  },
];

export default function SoftwareDevelopmentPage() {
  return (
    <main className="pt-28">

      <section className="relative overflow-hidden px-6 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-6 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Software Development
          </p>

          <h1 className="geist max-w-6xl text-5xl font-black leading-[.88] tracking-[-0.08em] md:text-8xl">
            Custom software built around the way your business actually works.
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            StillAwake Media builds custom web applications, dashboards, portals,
            AI-powered workflows, automation systems, and scalable digital tools
            designed to reduce friction and support long-term growth.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/contact"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
            >
              Start a Project →
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9] transition hover:border-white/30 hover:text-white"
            >
              View Work →
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
              What makes custom software valuable?
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              {[
                "It solves specific business workflows",
                "It reduces repetitive admin work",
                "It centralizes information and operations",
                "It creates cleaner client experiences",
                "It supports automation and AI integration",
                "It scales beyond generic SaaS limitations",
                "It improves reporting and decision-making",
                "It becomes owned digital infrastructure",
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
              Digital Infrastructure
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              Software is where websites evolve into business systems.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              A website can attract attention. Software can organize operations,
              automate processes, power dashboards, improve client experience,
              and give a business infrastructure it actually owns.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {systems.map((system) => (
              <div
                key={system.title}
                className="glass rounded-[2rem] p-8"
              >

                <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                  Software System
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
              Explore the software and automation knowledge ecosystem.
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
              Build the System
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-7xl">
              When generic tools stop fitting, custom software becomes leverage.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              StillAwake Media builds software systems designed to support real
              operations, reduce repetitive work, and create scalable digital
              infrastructure.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white"
              >
                Start a Project →
              </Link>

              <Link
                href="/ai-automation"
                className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9]"
              >
                Explore AI Automation →
              </Link>

            </div>

          </div>

        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
