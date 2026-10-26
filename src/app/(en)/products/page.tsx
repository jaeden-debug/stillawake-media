import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { getProductCards, productsCollectionSchema } from "@/lib/products";

const pageUrl = `${siteUrl}/products`;

const TITLE = "Products | Software Built by StillAwake Media";
const DESCRIPTION =
  "The software StillAwake Media builds and runs for itself — business intelligence, invoicing, and financial management tools used in production, not concepts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/products",
    languages: {
      "en-CA": pageUrl,
      "fr-CA": `${siteUrl}/fr/produits`,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Products | StillAwake Media",
    description: DESCRIPTION,
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | StillAwake Media",
    description: DESCRIPTION,
  },
};

export const revalidate = 300;

export default async function ProductsPage() {
  const products = await getProductCards("en", "Learn more");

  const schema = productsCollectionSchema({
    pageUrl,
    name: "Products",
    description: DESCRIPTION,
    locale: "en-CA",
    products,
  });

  return (
    <main className="bg-black pt-28 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Products</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            We don&apos;t only build software for clients. We build our own.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            Most of what StillAwake Media does is client work — websites, ecommerce, custom
            platforms. But the studio also develops and operates its own software, and that turns
            out to be the useful part: running a product teaches you things that building one for
            someone else never will. These are the products, live and in production.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {products.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.href} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/10 bg-[#070707] p-10">
              <h2 className="geist text-2xl font-black tracking-[-0.05em]">
                The product list is being updated.
              </h2>
              <p className="mt-3 max-w-2xl leading-8 text-[#C7B9B9]">
                Nothing is published here right now. In the meantime, the client work is on the{" "}
                <Link href="/work" className="text-[#D71920] underline underline-offset-4">
                  case studies
                </Link>{" "}
                page.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#D71920]/15 p-10 md:p-16">
          <h2 className="geist max-w-4xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-6xl">
            Have a product or platform idea?
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#E7DFDF]">
            The same team that built these builds for clients. Describe what you&apos;re trying to
            make and you&apos;ll get a written scope with a fixed price — no sales call required.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition hover:opacity-90"
            >
              Start a project →
            </Link>
            <Link
              href="/software-development"
              className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-white/50"
            >
              Software development →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
