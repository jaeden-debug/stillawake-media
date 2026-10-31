import Link from "next/link";
import type { GameBundle } from "@/data/games";
import { activeCategories, categoryPath, entriesInCategory, entryPath, wikiPath } from "@/lib/games";
import { ArticleMap } from "@/components/article/ArticleMap";

/**
 * Documentation layout: navigation left, article centre, contents right.
 *
 * On phones the navigation collapses into a native <details> drawer, so it
 * works without JavaScript and without hover.
 */
export function WikiShell({
  bundle,
  currentCategory,
  currentEntry,
  toc,
  children,
}: {
  bundle: GameBundle;
  currentCategory?: string;
  currentEntry?: string;
  toc?: { id: string; heading: string }[];
  children: React.ReactNode;
}) {
  const nav = <WikiNav bundle={bundle} currentCategory={currentCategory} currentEntry={currentEntry} />;

  return (
    <div className="mx-auto max-w-[88rem] px-4 sm:px-6">
      <details className="mb-6 rounded-2xl border border-white/10 bg-white/[.03] lg:hidden">
        <summary className="cursor-pointer list-none px-5 py-3.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
          ☰ {bundle.game.title} Wiki menu
        </summary>
        <div className="max-h-[70vh] overflow-y-auto border-t border-white/10 px-5 py-4">{nav}</div>
      </details>

      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
        <aside className="hidden lg:block" aria-label="Wiki navigation">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-10 pr-2 [scrollbar-width:thin]">{nav}</div>
        </aside>

        <div className="min-w-0">{children}</div>

        {toc && toc.length > 1 && (
          <aside className="hidden xl:block" aria-label="On this page">
            <div className="sticky top-28">
              <ArticleMap
                title="On this page"
                items={toc.map((item) => ({ id: item.id, text: item.heading, level: 2 }))}
                className="wiki-article-map"
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function WikiNav({
  bundle,
  currentCategory,
  currentEntry,
}: {
  bundle: GameBundle;
  currentCategory?: string;
  currentEntry?: string;
}) {
  const slug = bundle.game.slug;
  return (
    <nav aria-label={`${bundle.game.title} wiki`}>
      <Link href={wikiPath(slug)} className="text-sm font-bold text-white hover:text-[#cfe3c2]">
        Wiki home
      </Link>
      <ul className="mt-4 space-y-3">
        {activeCategories(bundle).map((c) => {
          const open = c.id === currentCategory;
          return (
            <li key={c.id}>
              <Link
                href={categoryPath(slug, c.slug)}
                aria-current={open && !currentEntry ? "page" : undefined}
                className={`text-[11px] font-bold uppercase tracking-[.2em] transition hover:text-white ${open ? "text-[#9fc28a]" : "text-[#8a8a8a]"}`}
              >
                {c.navLabel}
              </Link>
              {/* Only the current category is expanded; the rest stay one line each. */}
              {open && <ul className="mt-2 space-y-1">
                {entriesInCategory(bundle, c.id).map((e) => {
                  const current = e.slug === currentEntry;
                  return (
                    <li key={e.slug}>
                      <Link
                        href={entryPath(slug, e)}
                        aria-current={current ? "page" : undefined}
                        className={`block rounded-lg px-2 py-1 text-[13px] leading-5 transition ${
                          current ? "bg-[#7FA36B]/15 text-white" : "text-[#b5adad] hover:bg-white/[.04] hover:text-white"
                        }`}
                      >
                        {e.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
