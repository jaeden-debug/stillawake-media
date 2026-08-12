import Link from "next/link";
import { getSatellites } from "@/lib/clusters";

/**
 * Renders a pillar page's satellite articles — the return half of the cluster.
 *
 * Articles already link up to their pillar; without this the authority only
 * flowed one way and the pillar never told Google which articles belonged to
 * it. Renders nothing when a pillar has no satellites yet, so it is safe to
 * drop onto any French commercial page.
 *
 * `limit` defaults high enough to render every satellite a pillar currently
 * has. A lower cap silently drops articles from the cluster — the link still
 * exists article→pillar, but pillar→article disappears, which is exactly the
 * one-way structure this component exists to fix.
 */
export function ArticlesLies({
  pillar,
  title = "Pour aller plus loin",
  limit = 12,
}: {
  pillar: string;
  title?: string;
  limit?: number;
}) {
  const satellites = getSatellites(pillar, limit);
  if (satellites.length === 0) return null;

  return (
    <section className="border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[.3em] text-[#D71920]">Guides liés</p>
        <h2 className="geist max-w-4xl text-3xl font-black tracking-[-0.06em] md:text-5xl">
          {title}
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {satellites.map((item) => (
            <Link
              key={item.slug}
              href={`/fr/articles/${item.slug}`}
              className="glass rounded-[2rem] p-6 transition hover:border-[#D71920]/60"
            >
              <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">{item.category}</p>
              <h3 className="geist mt-4 text-xl font-black leading-tight tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{item.excerpt}</p>
            </Link>
          ))}
        </div>

        <Link href="/fr/articles" className="mt-8 inline-flex text-[#D71920]">
          Voir tous les articles →
        </Link>
      </div>
    </section>
  );
}
