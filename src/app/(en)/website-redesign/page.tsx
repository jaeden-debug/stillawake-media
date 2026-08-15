import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Website Redesign Services | Rebuild Without Losing Your SEO",
  description:
    "Website redesign from Montréal, serving all of Canada: modern rebuild, preserved search equity, measurable conversion goals, and a written fixed price before you commit.",
  alternates: {
    canonical: "https://stillawakemedia.com/website-redesign",
    languages: {
      "en-CA": "https://stillawakemedia.com/website-redesign",
      "fr-CA": "https://stillawakemedia.com/fr/refonte-site-web",
      "x-default": "https://stillawakemedia.com/website-redesign",
    },
  },
  openGraph: {
    title: "Website Redesign",
    description: "Rebuild the site without losing the rankings. Written scope, fixed price, no sales call.",
    url: "https://stillawakemedia.com/website-redesign",
    type: "website",
  },
};

const FAQ: [string, string][] = [
  [
    "What is a website redesign?",
    "A website redesign rebuilds an existing site's design, structure, and often its platform — while protecting what already works: rankings, traffic, and conversion paths. Done right it's a migration, not just a repaint; done wrong it's how businesses lose years of SEO in one launch.",
  ],
  [
    "Will a redesign hurt my SEO?",
    "Only if it's done carelessly. Rankings are attached to URLs, content, internal links, and site structure. Our redesigns map every existing URL, preserve or 301 each one deliberately, carry over the content that earns traffic, and re-launch with structured data and performance improvements — so the redesign typically helps rankings instead of erasing them.",
  ],
  [
    "How much does a website redesign cost?",
    "Redesigns are quoted in writing from your intake — scope depends on page count, platform, and how much content moves. Typical Canadian market ranges for a professional redesign run from a few thousand dollars to $25,000+; see our website cost guide for honest ranges. You get a fixed written price before committing, never a surprise invoice.",
  ],
  [
    "How long does a redesign take?",
    "It depends on scope — but you'll see the plan before you pay, and you review the new site on a private preview with a guided tour before anything goes live. Nothing launches without your approval on the exact version you reviewed.",
  ],
  [
    "Can you redesign a site you didn't build?",
    "Yes — most redesigns start from someone else's build. We work from an audit of what exists: what ranks, what converts, what's broken, and what the new site must keep.",
  ],
];

export default function WebsiteRedesignPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/website-redesign"
        name="Website Redesign Services"
        description="Website redesign that preserves search equity: URL mapping, deliberate redirects, content migration, performance and structured-data upgrades. Written fixed price via async intake."
        breadcrumb={[
          ["Home", "/"],
          ["Services", "/services"],
          ["Website Redesign", "/website-redesign"],
        ]}
        faq={FAQ}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Website Redesign</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Redesign the site. Keep the rankings.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">What is a website redesign?</strong> It&apos;s rebuilding your site&apos;s
            design, structure, and often platform — while protecting the search equity and conversion paths you already
            earned. The most expensive redesign mistake isn&apos;t ugly design; it&apos;s launching a beautiful site
            that silently deletes the URLs Google trusted. We treat every redesign as a migration first.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://stillawake.studio/start" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Get a Redesign Plan
            </Link>
            <Link href="/website-cost-canada" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              What Should It Cost?
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">How we protect what you built</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["URL & ranking audit", "Every existing URL is inventoried with its traffic and rankings before a single pixel changes."],
              ["Deliberate redirect map", "Kept, merged, or 301'd — every address is a decision, not an accident."],
              ["Content migration", "The pages earning search traffic move over improved, not deleted."],
              ["Relaunch upgrades", "Speed, structured data, internal linking, and bilingual structure built into the new foundation."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-[2rem] border border-white/10 p-7">
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl leading-8 text-[#C7B9B9]">
            Before launch, you review the finished redesign on a private preview with a guided tour, flag anything in
            context, and approve the exact version that goes live. After launch,{" "}
            <Link href="/website-maintenance" className="text-[#D71920] underline-offset-4 hover:underline">maintenance</Link> and{" "}
            <Link href="/seo-montreal" className="text-[#D71920] underline-offset-4 hover:underline">SEO plans</Link> keep it compounding.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            What gets kept, and what gets rebuilt
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            &quot;Redesign&quot; hides an important question: how much of the existing site survives? Being explicit
            about it up front is what stops a rebuild from quietly deleting the parts that were working.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
              <h3 className="text-xl font-semibold">Kept and carried over</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#C7B9B9]">
                <li>— <strong className="text-white">URLs that earn traffic</strong>, unchanged wherever possible. An address that ranks is an asset, not a design decision.</li>
                <li>— <strong className="text-white">Content with search history</strong> — moved across and improved, never dropped because it didn&apos;t fit a new template.</li>
                <li>— <strong className="text-white">Backlink targets.</strong> Any page other sites link to either keeps its URL or gets a direct 301 — never a chain, never the homepage.</li>
                <li>— <strong className="text-white">Conversion paths that already work</strong>, even if they&apos;re ugly. We measure before replacing them.</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-white/10 p-8">
              <h3 className="text-xl font-semibold">Rebuilt</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#C7B9B9]">
                <li>— <strong className="text-white">The front-end</strong>, for speed and Core Web Vitals — usually the single biggest measurable gain.</li>
                <li>— <strong className="text-white">Information architecture</strong>, so each search intent has exactly one page that owns it.</li>
                <li>— <strong className="text-white">Structured data and metadata</strong>, generally absent or wrong on the outgoing site.</li>
                <li>— <strong className="text-white">Anything genuinely thin.</strong> Some pages should be merged or retired — that&apos;s a deliberate decision with a redirect, not a deletion.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            What a redesign costs
          </h2>
          <p className="mt-6 max-w-3xl leading-8 text-[#C7B9B9]">
            A properly executed redesign generally tracks the same 2026 Canadian ranges as a new build — roughly{" "}
            <strong className="text-white">$3,000–$10,000</strong> for a small-business site and{" "}
            <strong className="text-white">$8,000–$25,000</strong> for a fully custom one — because doing it right
            means re-examining structure, content and technical foundation rather than repainting the old site. Those
            are market observations, not quotes: every project gets a{" "}
            <strong className="text-white">written scope with a fixed price</strong> before you commit, described
            asynchronously with no mandatory sales call. The full breakdown is in the{" "}
            <Link href="/website-cost-canada" className="text-[#D71920] underline underline-offset-4">
              Canadian website cost guide
            </Link>
            .
          </p>
          <div className="mt-10 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <p className="mb-3 text-sm uppercase tracking-[.3em] text-[#D71920]">Proof, not promises</p>
            <h3 className="geist max-w-3xl text-2xl font-black tracking-[-0.05em]">
              Zero organic clicks to page 1 in 8 weeks — measured.
            </h3>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              On the TravelDesign By Lisa platform, a client rebuild, roughly 2,300 technical defects were cleared
              across 834 URLs in three languages. Measured afterwards: page-1 positions from a standing start,
              9-minute average sessions, CLS 0.00 and Best Practices 100 (Chrome Lighthouse, mobile, August 2026).
              Every figure is sourced and dated in the case study.
            </p>
            <Link
              href="/work/lisa-travel-design"
              className="mt-6 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90"
            >
              Read the case study →
            </Link>
          </div>
          <p className="mt-8 max-w-3xl leading-8 text-[#C7B9B9]">
            If your current site isn&apos;t ranking and you&apos;re not yet sure a rebuild is the fix, start with the
            diagnosis instead:{" "}
            <Link
              href="/stillawake-times/why-is-my-website-not-ranking-on-google"
              className="text-[#D71920] underline underline-offset-4"
            >
              why isn&apos;t my website ranking on Google?
            </Link>{" "}
            walks the nine checks in order. Sometimes the answer is a redirect map, not a redesign.
          </p>
        </div>
      </section>

      <FaqBlock title="Redesign questions" items={FAQ} />

      <RelatedServices
        title="Related services"
        links={[
          ["Web Design Montréal", "/web-design-montreal"],
          ["SEO Montréal", "/seo-montreal"],
          ["Website Maintenance", "/website-maintenance"],
          ["Website Cost Guide", "/website-cost-canada"],
          ["Version française", "/fr/refonte-site-web"],
        ]}
      />
    </main>
  );
}
