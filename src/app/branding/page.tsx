import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Branding Services | StillAwake Media",
  description:
    "StillAwake Media builds premium brand identity systems, visual direction, messaging, logos, typography, colors, and digital assets for modern businesses.",
};

const systems = [
  {
    title: "Brand Positioning",
    text: "Strong branding starts before visuals. Positioning defines who the business serves, what it stands for, why it matters, and how it should be perceived.",
  },
  {
    title: "Visual Identity Systems",
    text: "A real identity system includes typography, color, spacing, logo direction, graphic language, motion style, imagery, and reusable design rules.",
  },
  {
    title: "Logo Direction",
    text: "A logo should not carry the entire brand alone. It should work as one recognizable anchor inside a larger identity system.",
  },
  {
    title: "Typography and Color Strategy",
    text: "Fonts and colors shape trust instantly. Premium brands use visual choices with intention, consistency, and emotional control.",
  },
  {
    title: "Messaging and Voice",
    text: "Brand voice turns positioning into words. Clear messaging helps visitors understand the offer faster and trust the business sooner.",
  },
  {
    title: "Digital Brand Assets",
    text: "Modern brands need assets for websites, social media, landing pages, thumbnails, ads, presentations, email, and future content systems.",
  },
];

const articles = [
  {
    href: "/stillawake-times/what-is-branding",
    title: "What Is Branding?",
  },
  {
    href: "/stillawake-times/what-makes-a-luxury-brand-website-feel-premium",
    title: "What Makes a Luxury Brand Website Feel Premium?",
  },
  {
    href: "/stillawake-times/why-most-agency-websites-feel-cheap",
    title: "Why Most Agency Websites Feel Cheap",
  },
  {
    href: "/stillawake-times/the-psychology-behind-high-converting-websites",
    title: "The Psychology Behind High-Converting Websites",
  },
  {
    href: "/stillawake-times/what-makes-a-high-converting-website",
    title: "What Makes a High-Converting Website?",
  },
  {
    href: "/stillawake-times/best-website-design-for-small-businesses-2026",
    title: "Best Website Design for Small Businesses in 2026",
  },
];

export default function BrandingPage() {
  return (
    <main className="pt-28">
      <section className="relative overflow-hidden px-6 py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Branding Services
          </p>

          <h1 className="geist max-w-6xl text-5xl font-black leading-[.88] tracking-[-0.08em] md:text-8xl">
            Brand systems that make businesses feel premium before a word is read.
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            StillAwake Media builds brand identity systems, visual direction,
            messaging, logo direction, typography, color systems, and digital
            assets that make modern businesses feel clear, memorable, and
            trustworthy across every touchpoint.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
            >
              Start a Project →
            </Link>

            <Link
              href="/web-design-montreal"
              className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9] transition hover:border-white/30 hover:text-white"
            >
              Explore Web Design →
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
              What makes a brand feel premium?
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {[
                "Clear positioning",
                "Consistent visual identity",
                "Strong typography and spacing",
                "Memorable logo direction",
                "Cohesive colors and assets",
                "Confident messaging",
                "Premium website presentation",
                "Trust-building visual systems",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
                >
                  <p className="text-base leading-7 text-[#E7DFDF]">{item}</p>
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
              Identity Infrastructure
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
              Branding is not decoration. It is perception architecture.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              Every visual choice teaches people how to interpret the business.
              A strong brand system controls that perception with consistency,
              clarity, emotional direction, and strategic visual language.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {systems.map((system) => (
              <div key={system.title} className="glass rounded-[2rem] p-8">
                <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                  Brand System
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
              Explore the branding and trust-building knowledge ecosystem.
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

                <p className="mt-6 text-sm text-[#999]">Read Article →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[3rem] border border-white/10 bg-[#070707] p-10 md:p-16">
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
              Look Premium
            </p>

            <h2 className="geist max-w-5xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-7xl">
              If the brand feels generic, the offer feels easier to ignore.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              StillAwake Media builds brand systems that make businesses feel
              sharper, more trustworthy, and more valuable across websites,
              content, social media, and digital campaigns.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white"
              >
                Start a Project →
              </Link>

              <Link
                href="/portfolio"
                className="rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-[#C7B9B9]"
              >
                View Portfolio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
