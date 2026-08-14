"use client";

import { useState } from "react";

/**
 * Product card for the /products hub.
 *
 * Two legitimate designs, not one design with a hole in it:
 *  · WITH IMAGE   — visual card, media band above the copy.
 *  · WITHOUT IMAGE — text-led card: oversized wordmark-style name on a tinted
 *    panel. A product with no thumbnail must never render an empty rectangle,
 *    a grey placeholder, or "image coming soon".
 *
 * A remote image that 404s at runtime is a different failure from "no image
 * configured": onError flips the card to the text-led design so a broken URL
 * degrades into the other intentional state rather than a torn frame.
 */

export type ProductCardData = {
  name: string;
  description: string;
  category?: string;
  href: string;
  ctaLabel: string;
  image?: { url: string; alt: string } | null;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const [imageBroken, setImageBroken] = useState(false);
  const showImage = Boolean(product.image?.url) && !imageBroken;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#070707] transition hover:border-[#D71920]/60">
      {showImage ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element -- CMS media is
              remote and host-variable; next/image would need per-host config
              for URLs editors can change at any time. */}
          <img
            src={product.image!.url}
            alt={product.image!.alt}
            loading="lazy"
            decoding="async"
            onError={() => setImageBroken(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(215,25,32,.18),transparent_60%)] px-6"
        >
          <span className="geist text-center text-3xl font-black leading-[.95] tracking-[-0.06em] text-white/90 md:text-4xl">
            {product.name}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        {product.category ? (
          <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">{product.category}</p>
        ) : null}

        <h3 className="geist mt-3 text-2xl font-black tracking-[-0.05em]">{product.name}</h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-[#C7B9B9]">{product.description}</p>

        <a
          href={product.href}
          rel="noopener"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#D71920] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          {product.ctaLabel}
          <span aria-hidden="true">→</span>
          <span className="sr-only"> — {product.name}</span>
        </a>
      </div>
    </article>
  );
}
