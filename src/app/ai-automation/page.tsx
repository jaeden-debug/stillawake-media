import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title:
    "AI Automation Services | Custom AI Workflows for Business",

  description: "StillAwake Media builds custom AI automation systems for lead handling, content workflows, research, reporting, admin tasks, SEO pipelines, and scalable business operations.",

  alternates: {
    canonical: "https://stillawakedmedia.com/ai-automation",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const systems = [
  {
    title: "AI Workflow Automation",
    text: "AI automation works best when it is connected to specific workflows: research, intake, content production, reporting, lead routing, customer support, and repetitive admin tasks.",
  },
  {
    title: "AI Assistants and Internal Operators",
    text: "Custom AI assistants can help teams organize information, draft content, answer internal questions, summarize files, support planning, and accelerate decisions.",
  },
  {
    title: "Lead Handling Systems",
    text: "AI can qualify leads, summarize inquiries, route messages, prepare responses, identify urgency, and help businesses respond faster without losing context.",
  },
  {
    title: "Content and SEO Pipelines",
    text: "AI can support keyword research, content briefs, article drafting, metadata, internal linking, topical clustering, and publishing workflows when guided by a strong strategy.",
  },
  {
    title: "Reporting and Business Intelligence",
    text: "Automation can turn scattered business data into useful dashboards, summaries, alerts, and decision support systems.",
  },
  {
    title: "Human-in-the-Loop Control",
    text: "Strong AI systems do not remove human judgment. They reduce repetitive work while keeping approval, brand voice, and strategic control in the hands of the business.",
  },
];

const articles = [
  {
    href: "/stillawake-times/how-ai-automation-is-changing-modern-businesses",
    title: "How AI Automation Is Changing Modern Businesses",
  },
  {
    href: "/stillawake-times/how-businesses-use-ai-automation-to-save-hundreds-of-hours",
    title: "How Businesses Use AI Automation to Save Hundreds of Hours",
  },
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
    href: "/stillawake-times/the-future-of-websites-in-2026-and-beyond",
    title: "The Future of Websites in 2026 and Beyond",
  },
];

export default function AIAutomationPage() {
  return (
    <main className="pt-28">

      <section className="relative overflow-hidden px-6 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-6 text-sm uppercase tracking-[.35em] text-[#D71920]">
            AI Automation Services
          </p>

          <h1 className="geist max-w-6xl text-5xl font-black leading-[.88] tracking-[-0.08em] md:text-8xl">
            AI automation systems built to reduce friction, speed up work, and scale operations.
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            StillAwake Media designs AI-powered workflows, assistants, content
            systems, reporting tools, lead handling systems, and automation
            infrastructure for businesses that want to move faster without
            adding unnecessary complexity.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/contact"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
            >
              Start a Project →
            </Link>

            <Link
              href="/software-development"
              className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9] transition hover:border-white/30 hover:text-white"
            >
              Explore Software →
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
              What can AI automation actually do for a business?
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              {[
                "Reduce repetitive admin work",
                "Speed up content and research workflows",
                "Improve lead handling and response time",
                "Summarize files, calls, and customer messages",
                "Create reporting and decision support systems",
                "Support SEO and publishing pipelines",
                "Connect tools into cleaner workflows",
                "Free humans to focus on strategy and execution",
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
              Practical AI Infrastructure
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              AI becomes valuable when it is connected to real workflows.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              The strongest AI systems are not random chatbots. They are
              carefully designed workflow layers that help businesses organize
              information, reduce manual steps, improve speed, and keep humans
              in control where judgment matters.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {systems.map((system) => (
              <div
                key={system.title}
                className="glass rounded-[2rem] p-8"
              >

                <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                  AI System
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
              Explore the AI and automation knowledge ecosystem.
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
              Work Faster
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-7xl">
              AI should make the business sharper — not noisier.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              StillAwake Media builds automation systems with clear purpose,
              practical workflows, structured control, and business outcomes in
              mind.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white"
              >
                Start a Project →
              </Link>

              <Link
                href="/software-development"
                className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9]"
              >
                Explore Software Development →
              </Link>

            </div>

          </div>

        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
