import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { InternalLinks } from "@/components/site";
import { siteUrl } from "@/lib/data";

const pageUrl = `${siteUrl}/fr/articles`;

export const metadata: Metadata = {
  title: "Articles | Stratégie web, SEO et IA pour le Québec",
  description:
    "Guides pratiques sur le web, le référencement, l'IA et le commerce en ligne — écrits pour le marché québécois, pas traduits de l'anglais.",
  alternates: { canonical: "/fr/articles" },
  openGraph: {
    title: "Articles | StillAwake Media",
    description:
      "Guides pratiques sur le web, le SEO, l'IA et le commerce en ligne, écrits pour le marché québécois.",
    url: pageUrl,
    type: "website",
    locale: "fr_CA",
  },
};

export default function ArticlesFr() {
  const posts = getAllPosts("fr");
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <main className="pt-28">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">Articles</p>
          <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
            Écrits pour le Québec, pas traduits.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
            Des guides sur le web, le référencement, l&apos;IA et le commerce en
            ligne — avec les particularités d&apos;ici : le bilinguisme, la
            Loi&nbsp;96 et un marché où vos clients cherchent dans deux langues.
          </p>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          {featured && (
            <Link
              href={`/fr/articles/${featured.slug}`}
              className="group mb-10 block overflow-hidden rounded-[3rem] border border-white/10 bg-[#070707] p-8 transition hover:border-[#D71920]/50 md:p-14"
            >
              <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">
                À la une · {featured.category}
              </p>
              <h2 className="geist mt-6 max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">{featured.excerpt}</p>
              <p className="mt-8 text-xs uppercase tracking-[.25em] text-[#666]">
                {featured.author} · {featured.readTime}
              </p>
            </Link>
          )}

          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/fr/articles/${post.slug}`}
                className="glass rounded-[2rem] p-6 transition hover:border-[#D71920]/60"
              >
                <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">{post.category}</p>
                <h3 className="geist mt-4 text-2xl font-black tracking-[-0.06em]">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{post.excerpt}</p>
                <p className="mt-6 text-xs uppercase tracking-[.25em] text-[#666]">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks locale="fr" />
    </main>
  );
}
