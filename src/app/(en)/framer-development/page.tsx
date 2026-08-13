import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

import { PageSchema } from "@/components/page-schema";
export const metadata: Metadata = {
  title: "Framer Development Services | Premium Framer Websites",
  description:
    "StillAwake Media builds premium Framer websites that feel high-end, load fast, stay easy to edit, and support SEO, conversion, and long-term brand growth.",
  alternates: {
    canonical: "https://stillawakemedia.com/framer-development",
    languages: {
      "en-CA": "https://stillawakemedia.com/framer-development",
      "fr-CA": "https://stillawakemedia.com/fr/developpement-framer",
      "x-default": "https://stillawakemedia.com/framer-development",
    },
  },
};

const included = [
  [
    "Page architecture before design",
    "Each page is assigned one search intent and one conversion goal before a frame is drawn. This is what stops a site from having four pages that all half-target the same query.",
  ],
  [
    "CMS structure that survives growth",
    "Collections, fields, and slugs are modelled so blog posts, case studies, and service pages can be added later without restructuring the site or breaking URLs.",
  ],
  [
    "SEO configuration on every page",
    "Titles, meta descriptions, canonical URLs, Open Graph data, heading hierarchy, image alt text, and sitemap inclusion are set per page rather than left on defaults.",
  ],
  [
    "Responsive behaviour, not just breakpoints",
    "Layouts are built at mobile width first and expanded, so the design holds together on the screens where most visitors actually arrive.",
  ],
  [
    "Animation with a purpose",
    "Motion is used to direct attention and signal quality — not applied to every element until the page feels slow and busy.",
  ],
  [
    "Handover you can actually use",
    "The site is structured so your team can edit copy, swap images, and publish posts without needing a developer for routine changes.",
  ],
];

const faqs = [
  [
    "Is Framer good for SEO?",
    "Yes, for marketing and service sites. Framer outputs static HTML, adds self-referencing canonical tags, generates a sitemap, and performs well on Core Web Vitals. The limits show up with complex programmatic pages and advanced schema, which is where a custom Next.js build makes more sense.",
  ],
  [
    "When should I choose Framer over a custom build?",
    "Framer is a strong fit when you want a premium marketing site your team can edit without a developer. A custom-coded build is the better call when you need programmatic pages, deep integrations, application logic, or full control over rendering.",
  ],
  [
    "Can you redesign an existing site in Framer?",
    "Yes. The important part of a redesign is preserving existing URLs and rankings through the migration with a mapped redirect plan, rather than launching a new site and losing the search equity you already paid for.",
  ],
];

export default function Page() {
  const points = ['Framer builds', 'Landing pages', 'SEO setup', 'Responsive design', 'CMS structure', 'Premium animations'];

  return (
    <main className="pt-28">
          <PageSchema route="/framer-development" />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Framer Development
          </p>

          <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
            Framer websites with premium design and serious SEO structure.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            We build Framer websites that feel high-end, load fast, stay easy to edit, and support real search visibility through clean page architecture and strategic content systems.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="https://stillawake.studio/start" className="rounded-full bg-[#D71920] px-6 py-4 font-bold">
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
            <div key={point} className="glass rounded-4xl p-7">
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
            A Framer site is only as good as its structure.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Framer makes it easy to produce something that looks expensive. It
            does not stop you from shipping a beautiful site with no search
            structure, no conversion path, and a CMS that has to be rebuilt the
            first time you want to add a blog. That structural work is the part
            we do.
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
            Framer, answered honestly.
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
            For the longer version, read our{" "}
            <Link href="/stillawake-times/framer-seo-guide" className="text-white underline decoration-[#D71920] underline-offset-4">
              Framer SEO guide
            </Link>{" "}
            and{" "}
            <Link href="/stillawake-times/framer-vs-wordpress" className="text-white underline decoration-[#D71920] underline-offset-4">
              Framer vs WordPress
            </Link>
            , or see how these builds come together in our{" "}
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
