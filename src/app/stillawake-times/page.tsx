import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { getAllPosts } from "@/lib/content";
import { InternalLinks, Section } from "@/components/site";

export const metadata: Metadata = {
  title: "StillAwake Times",
  description:
    "StillAwake Times is the editorial hub for web strategy, SEO, AI automation, premium branding, and digital infrastructure.",
};

export default function Blog() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <main className="pt-28">

      <Section
        eyebrow="Magazine"
        title="StillAwake Times. Strategy for brands that refuse to sleep."
      >

        {featured && (
          <Link
            href={`/stillawake-times/${featured.slug}`}
            className="group mb-10 block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition hover:border-[#D71920]/50"
          >
            <div className="grid md:grid-cols-[1.1fr_.9fr]">

              <div className="relative min-h-[320px] overflow-hidden">
                <Image
                  src={featured.image || "/best-website-design-for-small-businesses-2026-featured-image.png"}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                  Featured Article
                </p>

                <h2 className="geist mt-4 text-4xl font-black tracking-[-0.06em] md:text-5xl">
                  {featured.title}
                </h2>

                <p className="mt-5 text-[#C7B9B9] leading-7">
                  {featured.excerpt}
                </p>

                <div className="mt-8 flex items-center gap-4 text-xs text-[#666]">
                  <span>{featured.date}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                </div>

                <div className="mt-8 inline-flex items-center gap-2 text-sm text-white">
                  Read article →
                </div>
              </div>

            </div>
          </Link>
        )}

        <div className="grid gap-5 md:grid-cols-2">

          {regularPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/stillawake-times/${p.slug}`}
              className="glass rounded-[2rem] p-7 transition hover:border-[#D71920]/60"
            >
              <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                {p.category}
              </p>

              <h2 className="geist mt-4 text-3xl font-black tracking-[-0.06em]">
                {p.title}
              </h2>

              <p className="mt-3 text-[#C7B9B9]">
                {p.excerpt}
              </p>

              <p className="mt-6 text-xs text-[#666]">
                {p.date} · {p.readTime}
              </p>
            </Link>
          ))}

        </div>

      </Section>

      <InternalLinks />
    </main>
  );
}
