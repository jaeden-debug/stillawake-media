import type { Metadata } from "next";
import Link from "next/link";
import { serviceNav, montrealNav } from "@/lib/data";
import { AuditCta, MagazineInjection, RelatedReadingInjection, InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Services | StillAwake Media",
  description:
    "Explore StillAwake Media services across web design, SEO, software development, branding, AI automation, Shopify, Framer, and Montreal digital strategy.",
};

export default function Page() {
  return (
    <main className="pt-28">
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Services
          </p>

          <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
            Digital systems for brands built to move.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            Web design, SEO, branding, software, AI automation, Shopify,
            Framer, and Montreal-focused digital infrastructure.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[...serviceNav, ...montrealNav].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="glass rounded-[2rem] p-7 transition hover:border-[#D71920]/60"
              >
                <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                  StillAwake Media
                </p>

                <h2 className="geist mt-4 text-3xl font-black tracking-[-0.06em]">
                  {label}
                </h2>

                <p className="mt-6 text-sm text-[#999]">
                  Explore →
                </p>
              </Link>
            ))}
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
