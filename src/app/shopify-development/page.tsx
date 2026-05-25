import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Shopify Development",
  description: "StillAwake Media helps ecommerce brands improve product pages, collections, SEO structure, conversion flow, trust signals, and visual presentation.",
};

export default function Page() {
  const points = ['Product page optimization', 'Collection SEO', 'Trust sections', 'Conversion UX', 'Shopify structure', 'Content-driven ecommerce growth'];

  return (
    <main className="pt-28">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Shopify Development
          </p>

          <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
            Shopify stores built for trust, speed, and organic growth.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            StillAwake Media helps ecommerce brands improve product pages, collections, SEO structure, conversion flow, trust signals, and visual presentation.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#B51C1D] px-6 py-4 font-bold">
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
            <div key={point} className="glass rounded-[2rem] p-7">
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
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Built Different
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            This page is now part of the StillAwake internal SEO system.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            It gives Google and visitors a clear destination for this service while supporting the article ecosystem, internal links, and future conversion-focused expansion.
          </p>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
