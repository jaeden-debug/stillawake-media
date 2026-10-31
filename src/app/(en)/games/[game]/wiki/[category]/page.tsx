import type { Metadata } from "next";
import { pageTitle } from "@/lib/page-title";
import { OG_IMAGES } from "@/lib/og-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WikiShell } from "@/components/wiki/WikiShell";
import { gameBundles } from "@/data/games";
import { JsonLd, breadcrumbList, collectionPageNode, graph, itemList, videoGameId, type Crumb } from "@/lib/game-schema";
import {
  absolute,
  activeCategories,
  categoryPath,
  entriesInCategory,
  entryPath,
  gamePath,
  getBundle,
  getCategory,
  wikiPath,
} from "@/lib/games";

type Props = { params: Promise<{ game: string; category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return gameBundles.flatMap((b) => activeCategories(b).map((c) => ({ game: b.game.slug, category: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game: slug, category } = await params;
  const bundle = getBundle(slug);
  const cat = bundle && getCategory(bundle, category);
  if (!bundle || !cat) return {};
  return {
    title: pageTitle(`${cat.title} | ${bundle.game.title} Wiki`),
    description: cat.description,
    alternates: { canonical: categoryPath(slug, cat.slug) },
    openGraph: { title: `${cat.title} | ${bundle.game.title} Wiki`, description: cat.description, url: absolute(categoryPath(slug, cat.slug)), type: "website", images: OG_IMAGES },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { game: slug, category } = await params;
  const bundle = getBundle(slug);
  const cat = bundle && getCategory(bundle, category);
  if (!bundle || !cat) notFound();
  const entries = entriesInCategory(bundle, cat.id);
  if (!entries.length) notFound();

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: bundle.game.title, path: gamePath(slug) },
    { name: "Wiki", path: wikiPath(slug) },
    { name: cat.title, path: categoryPath(slug, cat.slug) },
  ];
  const url = absolute(categoryPath(slug, cat.slug));

  return (
    <main className="pt-24">
      <JsonLd
        data={graph(
          collectionPageNode(url, `${bundle.game.title} ${cat.title}`, cat.description, videoGameId(bundle.game)),
          itemList(cat.title, entries.map((e) => ({ name: e.title, url: entryPath(slug, e) }))),
          breadcrumbList(crumbs),
        )}
      />
      <div className="mx-auto max-w-[88rem] px-4 pb-8 pt-10 sm:px-6">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <WikiShell bundle={bundle} currentCategory={cat.id}>
        <header>
          <p className="text-xs font-bold uppercase tracking-[.3em] text-[#7FA36B]">{bundle.game.title} Wiki</p>
          <h1 className="geist mt-3 text-4xl font-black leading-[.95] tracking-[-.06em] md:text-6xl">{cat.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#C7B9B9]">{cat.intro}</p>
        </header>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {entries.map((e) => (
            <li key={e.slug}>
              <Link
                href={entryPath(slug, e)}
                className="block h-full rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] p-6 transition hover:border-[#7FA36B]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <h2 className="geist flex items-center gap-2 text-xl font-black tracking-[-.04em] text-white">
                  {e.title}
                  {e.spoiler && <span className="rounded-full bg-[#B3261E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.12em]">Spoilers</span>}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#C7B9B9]">{e.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </WikiShell>
    </main>
  );
}
