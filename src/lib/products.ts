import { getMediaByIds, getPublishedProducts } from "@/lib/cms/adapter";
import type { CmsLocale, CmsProductData, CmsPublishedContent } from "@/lib/cms/types";
import type { ProductCardData } from "@/components/product-card";
import { entityIds } from "@/data/entities";
import { siteUrl } from "@/lib/data";

/**
 * Resolves published CMS product rows into render-ready cards.
 *
 * Shared by both hub pages so EN and FR can never drift in how they read the
 * CMS — only in the copy they display.
 */

/**
 * Editors type these URLs, so they are untrusted input on the render path.
 * Only absolute http(s) URLs are allowed: `javascript:` and `data:` hrefs are
 * an XSS vector, and a relative path would silently point at our own site.
 * A product whose destination fails this check is dropped from the hub rather
 * than rendered with a dead or dangerous CTA.
 */
export function safeExternalUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.trim() === "") return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function textOf(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

export async function getProductCards(
  locale: CmsLocale,
  ctaLabel: string,
): Promise<ProductCardData[]> {
  const rows: CmsPublishedContent[] = await getPublishedProducts(locale);
  if (rows.length === 0) return [];

  const mediaIds = rows
    .map((row) => row.featured_media_id ?? row.snapshot?.featured_media_id ?? null)
    .filter((id): id is string => typeof id === "string" && id.length > 0);

  const media = mediaIds.length > 0 ? await getMediaByIds(mediaIds) : [];
  const mediaById = new Map(media.map((m) => [m.id, m]));

  return rows.flatMap((row) => {
    const data = (row.snapshot?.data ?? {}) as CmsProductData;
    const href = safeExternalUrl(data.product_url);
    // No valid destination means the card would be a dead end — omit it.
    if (!href) return [];

    const name = textOf(row.snapshot?.title);
    if (!name) return [];

    const mediaId = row.featured_media_id ?? row.snapshot?.featured_media_id ?? null;
    const asset = mediaId ? mediaById.get(mediaId) : undefined;
    const imageUrl = asset ? safeExternalUrl(asset.optimized_url ?? asset.url) : null;

    return [
      {
        name,
        description: textOf(row.snapshot?.excerpt) ?? "",
        category: textOf(data.category),
        href,
        ctaLabel,
        image: imageUrl
          ? { url: imageUrl, alt: textOf(asset?.alt) ?? name }
          : null,
      } satisfies ProductCardData,
    ];
  });
}

/**
 * Entity wiring for the hub's JSON-LD, keyed by the product's own host.
 *
 * Deliberately code-owned rather than CMS-editable: which real-world
 * organization publishes a product is an entity-graph fact, not copy. ZylX is a
 * StillAwake Media product; BankDeMark is a separate organization Jaeden
 * founded, so its products are published by BankDeMark — asserting otherwise
 * would misstate ownership. Unknown hosts simply get no publisher claim.
 */
const PUBLISHER_BY_HOST: Record<string, { id: string; appId?: string }> = {
  "zylx.ai": { id: entityIds.organization, appId: entityIds.zylx },
  "www.zylx.ai": { id: entityIds.organization, appId: entityIds.zylx },
  "bankdemark.com": { id: entityIds.bankdemark },
  "www.bankdemark.com": { id: entityIds.bankdemark },
};

export function productsCollectionSchema(opts: {
  pageUrl: string;
  name: string;
  description: string;
  locale: string;
  products: ProductCardData[];
}) {
  const items = opts.products.map((product, index) => {
    let host = "";
    try {
      host = new URL(product.href).host.toLowerCase();
    } catch {
      host = "";
    }
    const wiring = PUBLISHER_BY_HOST[host];

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        ...(wiring?.appId ? { "@id": wiring.appId } : {}),
        name: product.name,
        url: product.href,
        ...(product.description ? { description: product.description } : {}),
        ...(product.category ? { applicationCategory: product.category } : {}),
        ...(wiring ? { publisher: { "@id": wiring.id } } : {}),
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${opts.pageUrl}#page`,
        url: opts.pageUrl,
        name: opts.name,
        description: opts.description,
        inLanguage: opts.locale,
        isPartOf: { "@id": entityIds.website },
        about: { "@id": entityIds.organization },
        ...(items.length
          ? { mainEntity: { "@type": "ItemList", itemListElement: items } }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: opts.locale === "fr-CA" ? "Accueil" : "Home",
            item: opts.locale === "fr-CA" ? `${siteUrl}/fr` : `${siteUrl}/`,
          },
          { "@type": "ListItem", position: 2, name: opts.name, item: opts.pageUrl },
        ],
      },
    ],
  };
}
