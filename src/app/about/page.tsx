import type { Metadata } from "next";
import Link from "next/link";
import { Button, InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "About StillAwake Media | Digital Infrastructure Studio",
  description:
    "StillAwake Media is a Canada-based digital infrastructure studio building premium websites, SEO systems, branding, AI automation, Shopify experiences, and custom software.",
};

const capabilities = [
  ["Websites", "Custom-coded sites, landing pages, service pages, portfolio pages, and conversion-focused page systems."],
  ["SEO Systems", "Technical SEO, metadata, internal links, article structures, crawlable pages, and search-focused content architecture."],
  ["Brand Identity", "Logo direction, visual systems, typography, colors, messaging, graphics, and digital assets."],
  ["AI Automation", "Practical workflows for content, research, admin, lead handling, operations, and repetitive business tasks."],
  ["Apps & Software", "Dashboards, portals, workflow tools, SaaS concepts, internal tools, and custom product interfaces."],
  ["Growth Assets", "Reusable sections, blog pipelines, landing pages, campaign pages, lead magnets, and authority-building content."],
];

const fit = [
  "Founders launching a serious brand",
  "Service businesses that need better trust online",
  "Ecommerce brands that need stronger SEO",
  "Creators turning attention into a real business",
  "Local businesses ready to look premium",
  "Operators building tools, automations, or software",
];

const process = [
  ["01", "Clarify", "We define the offer, audience, positioning, pages, search intent, and conversion path."],
  ["02", "Design", "We shape the visual system: layout, hierarchy, typography, motion, trust, and brand feel."],
  ["03", "Build", "We create the website, content structure, SEO foundation, integrations, and technical system."],
  ["04", "Launch", "We polish, test, publish, and prepare the next moves for traffic, leads, and authority."],
];

export default function About() {
  return (
    <main className="overflow-hidden pt-28">
      <section className="relative px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(215,25,32,.22),transparent_34%),radial-gradient(circle_at_10%_70%,rgba(255,255,255,.06),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_.9fr] md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">About StillAwake Media</p>
            <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
              Digital systems for brands that refuse to look average.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9] md:text-xl md:leading-9">
              StillAwake Media is a Canada-based creative technology studio building custom websites, SEO systems, brand identities, AI automation, software tools, and digital assets for businesses that want a sharper online presence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Start a Project</Button>
              <Link href="/portfolio" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium text-[#C7B9B9] transition hover:bg-white/8 hover:text-white">
                View Work <span className="grid size-7 place-items-center rounded-full bg-white/8 text-white">→</span>
              </Link>
            </div>
          </div>

          <div className="glass relative overflow-hidden rounded-[2.5rem] p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.25),transparent_35%)]" />
            <div className="relative grid gap-4">
              {[
                ["01", "Websites that convert"],
                ["02", "SEO architecture Google can crawl"],
                ["03", "Brand systems people remember"],
                ["04", "AI workflows that save time"],
              ].map(([num, text]) => (
                <div key={text} className="rounded-3xl border border-white/10 bg-black/35 p-5 transition hover:-translate-y-1 hover:border-[#D71920]/50">
                  <p className="text-xs tracking-[.25em] text-[#D71920]">{num}</p>
                  <p className="geist mt-2 text-2xl font-black tracking-tighter">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">What we do</p>
          <h2 className="geist max-w-5xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-7xl">
            We turn scattered ideas into a clear digital engine.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {capabilities.map(([title, desc]) => (
              <article key={title} className="glass group rounded-4xl p-6 transition duration-500 hover:-translate-y-1 hover:border-[#D71920]/50 hover:bg-white/8">
                <div className="mb-8 h-1 w-16 rounded-full bg-[#D71920] transition group-hover:w-28" />
                <h3 className="geist text-3xl font-black tracking-[-0.06em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[.9fr_1.1fr] md:items-center">
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-black p-6 shadow-2xl md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(215,25,32,.35),transparent_32%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,.12),transparent_30%)]" />
            <div className="relative rounded-4xl border border-white/10 bg-white/6 p-5 backdrop-blur-2xl md:p-6">
              <p className="text-xs uppercase tracking-[.35em] text-[#D71920]">System View</p>
              <p className="geist mt-4 text-3xl font-black leading-none tracking-[-.07em] md:text-5xl">
                Brand → Website → SEO → Leads → Automation
              </p>
            </div>
            <div className="relative mt-6 grid gap-3">
              {["Clear positioning", "Premium interface", "Search visibility", "Business workflow"].map((x) => (
                <div key={x} className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-sm text-[#C7B9B9] backdrop-blur-xl">
                  {x}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Positioning</p>
            <h2 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              Not just a web design shop. A digital infrastructure studio.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#C7B9B9]">
              A modern business needs more than a nice homepage. It needs pages that explain the offer, content that builds authority, a brand that feels trustworthy, and systems that make the business easier to operate.
            </p>
            <p className="mt-5 text-lg leading-8 text-[#C7B9B9]">
              That is the gap StillAwake Media is built for: strategy, design, development, SEO, automation, and software thinking under one roof.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Who we help</p>
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Built for people who are done looking small.
          </h2>

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {fit.map((item) => (
              <div key={item} className="rounded-full border border-white/10 bg-white/4 px-5 py-4 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/50 hover:text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-6 md:p-10">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">How we build</p>
              <h2 className="geist text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
                Clean process. Heavy polish.
              </h2>
            </div>

            <div className="grid gap-4">
              {process.map(([num, title, desc]) => (
                <div key={title} className="glass grid gap-5 rounded-4xl p-6 transition hover:-translate-x-1 hover:border-[#D71920]/50 md:grid-cols-[90px_1fr]">
                  <p className="text-sm tracking-[.3em] text-[#D71920]">{num}</p>
                  <div>
                    <h3 className="geist text-3xl font-black tracking-[-.06em]">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#D71920] p-8 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,.22),transparent_30%)]" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[.35em] text-white/70">Start here</p>
              <h2 className="geist max-w-4xl text-5xl font-black leading-[.9] tracking-[-0.07em] md:text-7xl">
                Tell us what you want to build.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Send the project idea, current website, goals, or problem. We’ll turn it into a clear next step.
              </p>
            </div>

            <Link href="/contact" className="inline-flex rounded-full bg-black px-7 py-4 font-bold text-white transition hover:scale-[1.02]">
              Get a Free Audit →
            </Link>
          </div>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
