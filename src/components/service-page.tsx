import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";
import { BuyButton } from "@/components/buy-button";

/**
 * Shared building blocks for commercial service pages. Structure is shared;
 * every page writes its own argument — these helpers only remove boilerplate
 * (schema wiring, price semantics), not voice.
 */

export function ServiceJsonLd(props: {
  path: string;
  name: string;
  description: string;
  offers?: { name: string; price: number; currency?: string; interval?: "MONTH" | null }[];
  breadcrumb: [string, string][];
  faq?: [string, string][];
  inLanguage?: string;
}) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${siteUrl}${props.path}#service`,
      name: props.name,
      description: props.description,
      provider: { "@id": entityIds.organization },
      // Montréal first because that is the strongest local signal, then the
      // markets the studio actually serves remotely. Stopping at "Canada"
      // read as a geographic restriction rather than a home base.
      areaServed: [
        { "@type": "City", name: "Montréal" },
        { "@type": "AdministrativeArea", name: "Québec" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Australia" },
      ],
      ...(props.offers?.length
        ? {
            offers: props.offers.map((o) => ({
              "@type": "Offer",
              name: o.name,
              price: o.price,
              priceCurrency: o.currency ?? "CAD",
              ...(o.interval
                ? {
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: o.price,
                      priceCurrency: o.currency ?? "CAD",
                      billingIncrement: 1,
                      unitCode: "MON",
                    },
                  }
                : {}),
            })),
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: props.breadcrumb.map(([label, url], i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: label,
        item: `${siteUrl}${url}`,
      })),
    },
    ...(props.faq?.length
      ? [
          {
            "@type": "FAQPage",
            mainEntity: props.faq.map(([q, a]) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          },
        ]
      : []),
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

/**
 * Semantic, extraction-friendly price presentation.
 *
 * `cta` is a link; `buy` starts a Stripe Checkout session. A card may have one
 * or the other. Passing `buy` is a statement that this exact thing can be
 * bought unattended at the price shown — the route enforces that
 * independently, so a card cannot sell something the allowlist excludes.
 *
 * The tax note is not decoration. Every price is `tax_behavior: exclusive`, so
 * a Canadian buyer sees GST/QST added at checkout; a card that shows "$150"
 * and then charges $172.46 without warning is a nasty surprise at exactly the
 * wrong moment.
 */
export function PriceCard(props: {
  name: string;
  price: string; // e.g. "$600 CAD"
  cadence: string; // "per month" | "one-time" | "custom quote"
  items: string[];
  cta?: [string, string];
  buy?: { item: string; label: string; locale?: "en" | "fr" };
  highlight?: boolean;
}) {
  const taxNote = props.buy
    ? props.buy.locale === "fr"
      ? "Taxes en sus"
      : "Plus applicable tax"
    : null;

  return (
    <div className={`rounded-[2rem] border p-8 ${props.highlight ? "border-[#D71920]/60 bg-[#D71920]/5" : "border-white/10 bg-white/[0.03]"}`}>
      <h3 className="geist text-2xl font-black tracking-[-0.05em]">{props.name}</h3>
      <p className="mt-4 text-4xl font-black">
        {props.price} <span className="text-base font-normal text-[#C7B9B9]">{props.cadence}</span>
      </p>
      {taxNote && <p className="mt-1 text-xs text-[#C7B9B9]">{taxNote}</p>}
      <ul className="mt-6 space-y-2 text-sm leading-6 text-[#C7B9B9]">
        {props.items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className="text-[#D71920]">—</span> {x}
          </li>
        ))}
      </ul>
      {props.buy ? (
        <BuyButton item={props.buy.item} label={props.buy.label} locale={props.buy.locale} />
      ) : props.cta ? (
        <Link href={props.cta[1]} className="mt-8 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">
          {props.cta[0]}
        </Link>
      ) : null}
    </div>
  );
}

export function FaqBlock({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">{title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map(([q, a]) => (
            <div key={q} className="rounded-[2rem] border border-white/10 p-7">
              <h3 className="text-lg font-semibold">{q}</h3>
              <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelatedServices({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <section className="px-6 pb-24">
      <div className="glass mx-auto max-w-7xl rounded-[2rem] p-8">
        <h2 className="geist text-3xl font-black tracking-[-0.06em]">{title}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {links.map(([n, h]) => (
            <Link key={h} href={h} className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-[#D71920]/60 hover:text-white">
              {n}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
