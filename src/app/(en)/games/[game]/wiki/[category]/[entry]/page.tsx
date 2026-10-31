import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/og-image";
import { metaDescription } from "@/lib/meta-description";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WikiShell } from "@/components/wiki/WikiShell";
import { SpoilerGate, WikiSectionView, WikiText } from "@/components/wiki/WikiContent";
import { RobloxCta } from "@/components/games/GameCta";
import { gameBundles, type GameBundle } from "@/data/games";
import { articleAuthors, jaedenDoody } from "@/data/people/jaeden-doody";
import type { GameUpdate, WikiEntry } from "@/data/games/types";
import {
  JsonLd,
  breadcrumbList,
  faqPageNode,
  graph,
  wikiArticleNode,
  wikiWebPageNode,
  type Crumb,
} from "@/lib/game-schema";
import {
  absolute,
  backlinks,
  categoryPath,
  entriesInCategory,
  entryPath,
  entryTitleTag,
  gamePath,
  getBundle,
  getCategory,
  getEntry,
  hasImage,
  entryImage,
  publishedEntries,
  relatedEntries,
  tableOfContents,
  wikiPath,
} from "@/lib/games";

type Props = { params: Promise<{ game: string; category: string; entry: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return gameBundles.flatMap((b) =>
    publishedEntries(b).map((e) => ({ game: b.game.slug, category: e.category, entry: e.slug })),
  );
}

function resolve(slug: string, category: string, entrySlug: string) {
  const bundle = getBundle(slug);
  const entry = bundle && getEntry(bundle, entrySlug);
  if (!bundle || !entry || entry.category !== category) return null;
  return { bundle, entry, category: getCategory(bundle, category)! };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, category, entry: slug } = await params;
  const r = resolve(game, category, slug);
  if (!r) return {};
  const { bundle, entry } = r;
  const url = absolute(entryPath(game, entry));
  const image = entryImage(bundle, entry);
  const title = entryTitleTag(bundle, entry);
  return {
    // Entry titles are written in full, so they skip the site suffix.
    title: { absolute: title },
    description: metaDescription(entry.description),
    authors: articleAuthors(jaedenDoody.name),
    alternates: { canonical: entryPath(game, entry) },
    openGraph: {
      title,
      description: entry.description,
      url,
      type: "article",
      modifiedTime: entry.lastVerified,
      ...(hasImage(image) && !image.spoiler
        ? { images: [{ url: image.src, alt: image.alt }] }
        // Falls back to the site card rather than nothing. A spoiler image or a
        // missing one left 57 wiki pages with no og:image at all.
        : { images: OG_IMAGES }),
    },
  };
}

const verificationLabel: Record<WikiEntry["verification"], string> = {
  verified_live: "Checked against the live game",
  verified_planned: "Planned",
  unverified: "Unverified",
  deprecated: "No longer in the game",
};

export default async function EntryPage({ params }: Props) {
  const { game, category, entry: slug } = await params;
  const r = resolve(game, category, slug);
  if (!r) notFound();
  const { bundle, entry, category: cat } = r;

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: bundle.game.title, path: gamePath(game) },
    { name: "Wiki", path: wikiPath(game) },
    { name: cat.title, path: categoryPath(game, cat.slug) },
    { name: entry.title, path: entryPath(game, entry) },
  ];

  const siblings = entriesInCategory(bundle, cat.id);
  const at = siblings.findIndex((e) => e.slug === entry.slug);
  const prev = at > 0 ? siblings[at - 1] : undefined;
  const next = at < siblings.length - 1 ? siblings[at + 1] : undefined;
  const related = relatedEntries(bundle, entry);
  const linkedFrom = backlinks(bundle, entry).filter((e) => !related.includes(e)).slice(0, 6);
  const image = entryImage(bundle, entry);
  const isLog = entry.slug === "development-log";

  const nodes: Record<string, unknown>[] = [
    wikiWebPageNode(bundle, entry),
    wikiArticleNode(bundle, entry),
    breadcrumbList(crumbs),
  ];
  if (entry.slug === "faq") nodes.push(faqPageNode(bundle, entry));

  const answer = (
    <div className="mt-6 rounded-2xl border border-[#7FA36B]/35 bg-[#7FA36B]/[.07] p-5 md:p-6">
      {entry.question && (
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#9fc28a]">{entry.question}</p>
      )}
      <p className="mt-2 text-[1.08rem] leading-8 text-[#ece6e6]">
        <WikiText bundle={bundle} text={entry.answer} />
      </p>
    </div>
  );

  const body = (
    <>
      {hasImage(image) && (
        <figure className="mt-8 overflow-hidden rounded-[1.6rem] border border-white/10">
          <Image src={image.src} alt={image.alt} width={image.dimensions.width} height={image.dimensions.height} sizes="(max-width: 1024px) 100vw, 760px" className="h-auto w-full" />
          <figcaption className="px-4 py-2 text-xs text-[#8a8a8a]">{image.description}</figcaption>
        </figure>
      )}
      {entry.sections.map((s) => (
        // Inside a whole-page spoiler gate, sections don't need gates of their own.
        <WikiSectionView key={s.id} bundle={bundle} section={s} revealed={entry.spoiler} />
      ))}
      {isLog && <UpdateLog bundle={bundle} updates={bundle.updates} />}
    </>
  );

  return (
    <main className="pt-24">
      <JsonLd data={graph(...nodes)} />
      <div className="mx-auto max-w-[88rem] px-4 pb-8 pt-10 sm:px-6">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <WikiShell bundle={bundle} currentCategory={cat.id} currentEntry={entry.slug} toc={tableOfContents(entry)}>
        <article aria-labelledby="entry-title" className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.3em] text-[#7FA36B]">
            <Link href={categoryPath(game, cat.slug)} className="hover:text-white">{cat.title}</Link>
          </p>
          <h1 id="entry-title" className="geist mt-3 text-4xl font-black leading-[.95] tracking-[-.06em] md:text-[3.4rem]">
            {entry.title}
          </h1>
          <p className="mt-4 text-xs text-[#8a8a8a]">
            By{" "}
            <Link href={jaedenDoody.path} className="underline underline-offset-2 hover:text-white">{jaedenDoody.name}</Link>
            {" "}· Last checked <time dateTime={entry.lastVerified}>{entry.lastVerified}</time> · {verificationLabel[entry.verification]}
          </p>

          {entry.spoiler ? (
            <>
              <p className="mt-6 rounded-2xl border border-[#B3261E]/40 bg-[#B3261E]/[.06] px-5 py-4 text-sm text-[#ece6e6]">
                This page is about the story and contains spoilers. Open it when you&apos;re ready.
              </p>
              <SpoilerGate label="Show the answer and the full page">
                {answer}
                {entry.facts && entry.facts.length > 0 && <Infobox facts={entry.facts} />}
                {body}
              </SpoilerGate>
            </>
          ) : (
            <>
              {answer}
              {entry.facts && entry.facts.length > 0 && <Infobox facts={entry.facts} />}
              {body}
            </>
          )}

          <footer className="mt-14 border-t border-white/10 pt-6 text-xs leading-6 text-[#8a8a8a]">
            <p>
              <span className="font-semibold text-[#b5adad]">Sources:</span> {entry.sources.join("; ")}.
            </p>
            <p className="mt-1">
              {bundle.game.title} is updated regularly; details can change between builds. Spotted something out of date?{" "}
              <Link href="/contact" className="text-[#C7B9B9] underline underline-offset-2">Tell us</Link>.
            </p>
          </footer>

          {(prev || next) && (
            <nav aria-label="More in this category" className="mt-10 grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link href={entryPath(game, prev)} className="rounded-2xl border border-white/10 p-4 text-sm hover:border-white/25">
                  <span className="text-xs text-[#8a8a8a]">← Previous</span>
                  <span className="mt-1 block font-semibold text-white">{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link href={entryPath(game, next)} className="rounded-2xl border border-white/10 p-4 text-right text-sm hover:border-white/25">
                  <span className="text-xs text-[#8a8a8a]">Next →</span>
                  <span className="mt-1 block font-semibold text-white">{next.title}</span>
                </Link>
              )}
            </nav>
          )}
        </article>

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-16 max-w-3xl">
            <h2 id="related" className="geist text-2xl font-black tracking-[-.04em]">Related articles</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((e) => (
                <li key={e.slug}>
                  <Link href={entryPath(game, e)} className="block h-full rounded-2xl border border-white/10 bg-[#0a0d0a] p-5 transition hover:border-[#7FA36B]/50">
                    <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#7FA36B]">
                      {bundle.categories.find((c) => c.id === e.category)?.navLabel}
                    </span>
                    <span className="mt-1 block font-semibold text-white">{e.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {linkedFrom.length > 0 && (
          <section aria-labelledby="linked-from" className="mt-10 max-w-3xl">
            <h2 id="linked-from" className="text-xs font-bold uppercase tracking-[.25em] text-[#8a8a8a]">Mentioned in</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {linkedFrom.map((e) => (
                <li key={e.slug}>
                  <Link href={entryPath(game, e)} className="inline-flex rounded-full border border-white/10 px-3 py-1.5 text-sm text-[#C7B9B9] hover:text-white">
                    {e.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 flex max-w-3xl flex-wrap gap-3">
          <Link href={wikiPath(game)} className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
            ← Wiki home
          </Link>
          <RobloxCta game={bundle.game} placement="wiki_entry" variant="secondary" />
        </div>
      </WikiShell>
    </main>
  );
}

function Infobox({ facts }: { facts: [string, string][] }) {
  return (
    <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-sm sm:grid-cols-3">
      {facts.map(([k, v]) => (
        <div key={k} className="bg-[#0a0d0a] px-4 py-3">
          <dt className="text-[11px] uppercase tracking-[.15em] text-[#8a8a8a]">{k}</dt>
          <dd className="mt-1 font-semibold text-white">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function UpdateLog({ bundle, updates }: { bundle: GameBundle; updates: GameUpdate[] }) {
  const groups: [string, keyof GameUpdate][] = [
    ["New", "newFeatures"],
    ["Changed", "changes"],
    ["Fixed", "fixes"],
    ["Balance", "balance"],
    ["Known issues", "knownIssues"],
  ];
  return (
    <div className="mt-6 space-y-10">
      {updates.map((u) => (
        <section key={u.id} aria-labelledby={u.id} className="scroll-mt-28 border-l-2 border-[#7FA36B]/50 pl-6">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#7FA36B]">
            <time dateTime={u.date}>{u.date}</time> · {u.version ?? (u.kind === "development-milestone" ? "Development build" : "Release")}
          </p>
          <h2 id={u.id} className="geist mt-2 text-2xl font-black tracking-[-.04em]">{u.title}</h2>
          {groups.map(([label, key]) => {
            const items = u[key] as string[];
            if (!items.length) return null;
            return (
              <div key={label} className="mt-5">
                <h3 className="text-sm font-bold text-white">{label}</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.98rem] leading-7 text-[#cfc8c8] marker:text-[#7FA36B]">
                  {items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            );
          })}
          {u.relatedEntries.length > 0 && (
            <p className="mt-5 text-sm text-[#a9a0a0]">
              Documentation updated:{" "}
              {u.relatedEntries
                .map((s) => getEntry(bundle, s))
                .filter((e): e is WikiEntry => Boolean(e))
                .map((e, i, arr) => (
                  <span key={e.slug}>
                    <Link href={entryPath(bundle.game.slug, e)} className="text-[#cfe3c2] underline underline-offset-2">{e.title}</Link>
                    {i < arr.length - 1 ? ", " : ""}
                  </span>
                ))}
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
