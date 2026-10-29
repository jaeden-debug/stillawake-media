import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PosterArt } from "@/components/media/PosterArt";
import { ContentRow } from "@/components/our-work/ContentRow";
import { RobloxCta, StatusBadge } from "@/components/games/GameCta";
import { InternalLinks } from "@/components/site";
import { gameBundles } from "@/data/games";
import { comparisonGuides } from "@/data/games/guides";
import { JsonLd, breadcrumbList, collectionPageNode, graph, itemList, type Crumb } from "@/lib/game-schema";
import { absolute, entryPath, gamePath, getEntry, hasImage, mediaFor, wikiPath } from "@/lib/games";

const description =
  "Explore original games developed by StillAwake Media, including Roblox survival horror adventures and multiplayer experiences. Discover games, updates, and guides.";

// The share card (Open Graph / X) is written for people, not search results.
const shareTitle = "StillAwake Games | Original Games by StillAwake Media";
const shareDescription =
  "Discover original games from StillAwake Media. Explore immersive worlds, survival horror, exciting challenges, and unique Roblox experiences. Play, explore, and stay updated on our latest releases.";
const shareImage = {
  url: "/stillawake-games-social-preview.jpg",
  width: 1200,
  height: 630,
  alt: "StillAwake Games by StillAwake Media, stillawakemedia.com",
};

export const metadata: Metadata = {
  title: { absolute: "StillAwake Games | Play & Explore Our Games" },
  description,
  alternates: { canonical: "/games" },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: absolute("/games"),
    siteName: "StillAwake Media",
    type: "website",
    locale: "en_CA",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [shareImage.url],
  },
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Games", path: "/games" },
];

/** Creator-facing tutorials. They live in the Times so they carry Article
 *  schema and an author; the hub links them so players' pages and
 *  developers' pages stay one hop apart. */
const DEV_GUIDES = [
  ["How to make a Roblox game", "/stillawake-times/how-to-make-a-roblox-game", "From concept and core loop to scripting, testing and publishing, with RISK IT! as the example."],
  ["How to make a horror game in Roblox Studio", "/stillawake-times/how-to-make-a-horror-game-in-roblox-studio", "Atmosphere, sound, enemy perception and hiding systems, from building Stillskin Forest."],
  ["How to fix lag in Roblox games", "/stillawake-times/how-to-fix-lag-in-roblox-studio", "Diagnose first, then fix draw calls, lighting, scripts, physics and replication."],
] as const;

export default function GamesHub() {
  const url = absolute("/games");
  return (
    <main className="pt-24">
      <JsonLd
        data={graph(
          collectionPageNode(url, "Games by StillAwake Media", description),
          itemList(
            "Games",
            gameBundles.map((b) => ({ name: b.game.title, url: gamePath(b.game.slug) })),
          ),
          breadcrumbList(crumbs),
        )}
      />

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <Breadcrumbs crumbs={crumbs} />
        <p className="mt-10 text-xs font-bold uppercase tracking-[.35em] text-[#7FA36B]">StillAwake Games</p>
        <h1 className="geist mt-4 max-w-4xl text-5xl font-black leading-[.9] tracking-[-.075em] md:text-7xl">
          Games we make, and everything you need to play them.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C7B9B9]">
          Each game gets an official page and a full wiki written from the game itself. Games are also part of{" "}
          <Link href="/our-work#games" className="text-white underline decoration-[#7FA36B] underline-offset-4">our wider portfolio</Link>.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-7xl space-y-8 px-4 sm:px-6" aria-label="All games">
        {gameBundles.map((bundle, i) => {
          const { game } = bundle;
          const thumb = mediaFor(bundle, game.media.thumbnail);
          return (
            <article
              key={game.id}
              className="grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080b08] lg:grid-cols-[1.25fr_1fr]"
            >
              <Link href={gamePath(game.slug)} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label={`${game.title}: view details`}>
                <PosterArt
                  src={hasImage(thumb) ? thumb.src : undefined}
                  alt={thumb?.alt}
                  title={game.title}
                  eyebrow={game.genre[0]}
                  accent={game.accent}
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="h-full"
                />
              </Link>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge game={game} />
                  {game.platforms.map((p) => (
                    <span key={p} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white">{p}</span>
                  ))}
                </div>
                <h2 className="geist mt-5 text-4xl font-black tracking-[-.06em] md:text-5xl">
                  <Link href={gamePath(game.slug)} className="hover:text-[#cfe3c2]">{game.title}</Link>
                </h2>
                <p className="mt-2 text-sm italic" style={{ color: game.accentSoft }}>{game.tagline}</p>
                <p className="mt-4 text-base leading-7 text-[#C7B9B9]">{game.summary}</p>
                <p className="mt-4 text-xs uppercase tracking-[.2em] text-[#8a8a8a]">{game.genre.join(" · ")}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={gamePath(game.slug)}
                    data-track="game_cta_click"
                    data-track-game={game.id}
                    data-track-cta="view_details"
                    className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/90"
                  >
                    View details
                  </Link>
                  <Link href={wikiPath(game.slug)} className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
                    Official wiki
                  </Link>
                  <RobloxCta game={game} placement="games_hub" variant="secondary" />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {gameBundles.map((bundle) => (
        <div key={bundle.game.id} className="mt-12">
          <ContentRow id={`${bundle.game.slug}-guides`} title={`${bundle.game.title} guides`} blurb="Start here." href={wikiPath(bundle.game.slug)} hrefLabel="Full wiki">
            {bundle.game.featuredGuides
              .map((slug) => getEntry(bundle, slug))
              .filter((e) => e !== undefined)
              .map((e) => (
                <Link
                  key={e.slug}
                  href={entryPath(bundle.game.slug, e)}
                  className="block h-full rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] p-6 transition hover:border-[#7FA36B]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#7FA36B]">
                    {bundle.categories.find((c) => c.id === e.category)?.navLabel}
                  </p>
                  <h3 className="geist mt-2 text-xl font-black tracking-[-.04em] text-white">{e.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#C7B9B9]">{e.description}</p>
                </Link>
              ))}
          </ContentRow>
        </div>
      ))}

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6" aria-labelledby="guides">
        <h2 id="guides" className="geist text-3xl font-black tracking-[-.05em]">Guides</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {comparisonGuides.map((guide) => (
            <Link
              key={guide.id}
              href={guide.path}
              className="block rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] p-6 transition hover:border-[#7FA36B]/50 md:p-8"
            >
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#7FA36B]">Roblox</p>
              <h3 className="geist mt-2 text-2xl font-black tracking-[-.04em]">{guide.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#C7B9B9]">{guide.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6" aria-labelledby="dev-guides">
        <h2 id="dev-guides" className="geist text-3xl font-black tracking-[-.05em]">Make your own Roblox game</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#C7B9B9]">
          What we&apos;ve learned building these games, written up as practical guides for other creators.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {DEV_GUIDES.map(([title, href, blurb]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] p-6 transition hover:border-[#7FA36B]/50"
            >
              <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#7FA36B]">Roblox Studio</p>
              <h3 className="geist mt-2 text-xl font-black tracking-[-.04em]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#C7B9B9]">{blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <InternalLinks />
      </div>
    </main>
  );
}
