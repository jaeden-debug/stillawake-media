import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteSearch } from "@/components/search/SiteSearch";
import { WikiShell } from "@/components/wiki/WikiShell";
import { RobloxCta } from "@/components/games/GameCta";
import { gameBundles } from "@/data/games";
import type { WikiEntry } from "@/data/games/types";
import { JsonLd, breadcrumbList, collectionPageNode, graph, itemList, videoGameId, type Crumb } from "@/lib/game-schema";
import {
  absolute,
  activeCategories,
  categoryPath,
  entriesInCategory,
  entryPath,
  gamePath,
  getBundle,
  getEntry,
  publishedEntries,
  recentlyUpdatedEntries,
  wikiPath,
} from "@/lib/games";
import { wikiSearchDocs } from "@/lib/search-index";

type Props = { params: Promise<{ game: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return gameBundles.map((b) => ({ game: b.game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game: slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) return {};
  const description = bundle.game.wikiBlurb.description;
  return {
    title: `${bundle.game.title} Wiki: ${bundle.game.wikiBlurb.title}`,
    description,
    alternates: { canonical: wikiPath(slug) },
    openGraph: { title: `${bundle.game.title} Wiki`, description, url: absolute(wikiPath(slug)), type: "website" },
  };
}

export default async function WikiHome({ params }: Props) {
  const { game: slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) notFound();
  const { game } = bundle;

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: game.title, path: gamePath(slug) },
    { name: "Wiki", path: wikiPath(slug) },
  ];
  const pick = (slugs: string[]) => slugs.map((s) => getEntry(bundle, s)).filter((e): e is WikiEntry => Boolean(e));
  const categories = activeCategories(bundle);
  const docs = wikiSearchDocs(slug);
  const url = absolute(wikiPath(slug));

  return (
    <main className="pt-24">
      <JsonLd
        data={graph(
          collectionPageNode(url, `${game.title} Wiki`, `The official ${game.title} wiki.`, videoGameId(game)),
          itemList(
            `${game.title} wiki categories`,
            categories.map((c) => ({ name: c.title, url: categoryPath(slug, c.slug) })),
          ),
          breadcrumbList(crumbs),
        )}
      />

      <div className="mx-auto max-w-[88rem] px-4 pt-10 sm:px-6">
        <Breadcrumbs crumbs={crumbs} />
        <header className="mt-8 rounded-[2.5rem] border border-white/10 bg-[radial-gradient(80%_120%_at_90%_0%,rgba(127,163,107,.18),transparent_60%),#080b08] p-7 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[.35em] text-[#7FA36B]">Official wiki</p>
          <h1 className="geist mt-3 text-5xl font-black leading-[.9] tracking-[-.07em] md:text-6xl">{game.title} Wiki</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#C7B9B9]">
            {publishedEntries(bundle).length} {bundle.game.wikiBlurb.intro}
          </p>
          <div className="mt-8 max-w-2xl">
            <SiteSearch
              docs={docs}
              scope={`wiki:${slug}`}
              tone="forest"
              placeholder={`Search the ${game.title} wiki: shotgun, hiding, Brute…`}
              groups={categories.map((c) => c.navLabel)}
            />
          </div>
          <p className="mt-6 text-xs text-[#8a8a8a]">{game.statusNote}</p>
        </header>
      </div>

      <div className="mt-12">
        <WikiShell bundle={bundle}>
          <section aria-labelledby="start-here">
            <h2 id="start-here" className="geist text-3xl font-black tracking-[-.05em]">Start here</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pick(game.beginnerGuides).map((e) => (
                <EntryCard key={e.slug} slug={slug} entry={e} label="Beginner" />
              ))}
            </div>
          </section>

          <section aria-labelledby="featured-guides" className="mt-14">
            <h2 id="featured-guides" className="geist text-3xl font-black tracking-[-.05em]">Featured guides</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pick(game.featuredGuides).map((e) => (
                <EntryCard key={e.slug} slug={slug} entry={e} label={bundle.categories.find((c) => c.id === e.category)?.navLabel} />
              ))}
            </div>
          </section>

          <section aria-labelledby="browse" className="mt-14">
            <h2 id="browse" className="geist text-3xl font-black tracking-[-.05em]">Browse by category</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {categories.map((c) => {
                const entries = entriesInCategory(bundle, c.id);
                return (
                  <div key={c.id} className="rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] p-6">
                    <h3 className="geist text-xl font-black tracking-[-.04em]">
                      <Link href={categoryPath(slug, c.slug)} className="hover:text-[#cfe3c2]">
                        {c.title} <span className="text-sm font-semibold text-[#8a8a8a]">({entries.length})</span>
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#a9a0a0]">{c.intro}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                      {entries.slice(0, 8).map((e) => (
                        <li key={e.slug}>
                          <Link href={entryPath(slug, e)} className="text-[#cfe3c2] hover:text-white">{e.title}</Link>
                        </li>
                      ))}
                      {entries.length > 8 && (
                        <li>
                          <Link href={categoryPath(slug, c.slug)} className="font-semibold text-white">+{entries.length - 8} more</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="recently-updated" className="mt-14">
            <h2 id="recently-updated" className="geist text-3xl font-black tracking-[-.05em]">Recently updated</h2>
            <ul className="mt-5 divide-y divide-white/[.07] rounded-[1.6rem] border border-white/10">
              {recentlyUpdatedEntries(bundle, 8).map((e) => (
                <li key={e.slug}>
                  <Link href={entryPath(slug, e)} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm hover:bg-white/[.03]">
                    <span className="text-white">{e.title}</span>
                    <span className="shrink-0 text-xs text-[#8a8a8a]">{e.lastVerified}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14 flex flex-wrap gap-3">
            <Link href={gamePath(slug)} className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
              About {game.title}
            </Link>
            <RobloxCta game={game} placement="wiki_home" variant="secondary" />
          </div>
        </WikiShell>
      </div>
    </main>
  );
}

function EntryCard({ slug, entry, label }: { slug: string; entry: WikiEntry; label?: string }) {
  return (
    <Link
      href={entryPath(slug, entry)}
      className="block rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] p-6 transition hover:border-[#7FA36B]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
    >
      {label && <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#7FA36B]">{label}</p>}
      <h3 className="geist mt-2 text-lg font-black leading-tight tracking-[-.03em] text-white">{entry.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#C7B9B9]">{entry.description}</p>
    </Link>
  );
}
