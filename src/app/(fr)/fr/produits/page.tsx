import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { getProductCards, productsCollectionSchema } from "@/lib/products";

const pageUrl = `${siteUrl}/fr/produits`;

const TITLE = "Produits | Les logiciels bâtis par StillAwake Media";
const DESCRIPTION =
  "Les logiciels que StillAwake Media bâtit et exploite pour elle-même : intelligence d'affaires, facturation et gestion financière — en production, pas des concepts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/fr/produits",
    languages: {
      "fr-CA": pageUrl,
      "en-CA": `${siteUrl}/products`,
      "x-default": `${siteUrl}/products`,
    },
  },
  openGraph: {
    title: "Produits | StillAwake Media",
    description: DESCRIPTION,
    url: pageUrl,
    type: "website",
    locale: "fr_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Produits | StillAwake Media",
    description: DESCRIPTION,
  },
};

export const revalidate = 300;

export default async function ProduitsPage() {
  const products = await getProductCards("fr", "En savoir plus");

  const schema = productsCollectionSchema({
    pageUrl,
    name: "Produits",
    description: DESCRIPTION,
    locale: "fr-CA",
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
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Produits</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            On ne bâtit pas que pour les clients. On bâtit aussi pour nous.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            L&apos;essentiel du travail de StillAwake Media, c&apos;est du travail client — sites
            web, commerce en ligne, plateformes sur mesure. Mais le studio développe et exploite
            aussi ses propres logiciels, et c&apos;est là que ça devient utile : exploiter un
            produit vous apprend ce que bâtir celui d&apos;un autre ne vous apprendra jamais. Voici
            ces produits, en production.
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
                La liste des produits est en mise à jour.
              </h2>
              <p className="mt-3 max-w-2xl leading-8 text-[#C7B9B9]">
                Rien n&apos;est publié ici pour le moment. Entretemps, le travail client se trouve
                dans nos{" "}
                <Link href="/fr/etudes-de-cas" className="text-[#D71920] underline underline-offset-4">
                  études de cas
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#D71920]/15 p-10 md:p-16">
          <h2 className="geist max-w-4xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-6xl">
            Une idée de produit ou de plateforme?
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#E7DFDF]">
            L&apos;équipe qui a bâti ces produits bâtit aussi pour ses clients. Décrivez ce que vous
            voulez créer et recevez une portée écrite avec prix fixe — sans appel de vente.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/fr/contact"
              className="rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition hover:opacity-90"
            >
              Démarrer un projet →
            </Link>
            <Link
              href="/fr/developpement-logiciel"
              className="rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-white/50"
            >
              Développement logiciel →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
