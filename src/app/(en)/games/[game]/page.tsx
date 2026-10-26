import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PosterArt } from "@/components/media/PosterArt";
import { RobloxCta, StatusBadge } from "@/components/games/GameCta";
import { InternalLinks } from "@/components/site";
import { gameBundles } from "@/data/games";
import type { WikiEntry } from "@/data/games/types";
import { JsonLd, breadcrumbList, gamePageNode, graph, videoGameNode, type Crumb } from "@/lib/game-schema";
import {
  absolute,
  categoryPath,
  entriesInCategory,
  entryPath,
  gamePath,
  getBundle,
  getEntry,
  hasImage,
  mediaFor,
  wikiPath,
} from "@/lib/games";

type Props = { params: Promise<{ game: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return gameBundles.map((b) => ({ game: b.game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game: slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) return {};
  const { game } = bundle;
  const hero = [mediaFor(bundle, game.media.hero), mediaFor(bundle, game.media.thumbnail)].find(hasImage);
  return {
    title: `${game.title}: Co-op Survival Horror on Roblox`,
    description: game.metaDescription,
    alternates: { canonical: gamePath(game.slug) },
    openGraph: {
      title: `${game.title} | ${game.tagline}`,
      description: game.summary,
      url: absolute(gamePath(game.slug)),
      type: "website",
      ...(hasImage(hero) ? { images: [{ url: hero.src, width: hero.dimensions.width, height: hero.dimensions.height, alt: hero.alt }] } : {}),
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { game: slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) notFound();
  const { game } = bundle;

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: game.title, path: gamePath(game.slug) },
  ];
  // Until a dedicated hero is captured, the thumbnail (a real wide shot) stands in.
  const hero = [mediaFor(bundle, game.media.hero), mediaFor(bundle, game.media.thumbnail)].find(hasImage);
  const shots = game.media.screenshots.map((id) => mediaFor(bundle, id)).filter(hasImage);
  const pick = (slugs: string[]) => slugs.map((s) => getEntry(bundle, s)).filter((e): e is WikiEntry => Boolean(e));
  const startHere = pick(game.beginnerGuides);
  const enemies = entriesInCategory(bundle, "enemies").filter((e) => e.slug !== "enemy-comparison");
  const places = pick(["campgrounds", "stillwater", "st-agnes-hospital", "blackthorn-asylum", "green-lake", "the-hollow"]);
  const latest = bundle.updates[0];

  return (
    <main className="pt-24">
      <JsonLd data={graph(gamePageNode(bundle), videoGameNode(bundle), breadcrumbList(crumbs))} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden" aria-labelledby="game-title">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {hasImage(hero) ? (
            <Image src={hero.src} alt="" fill priority sizes="100vw" className="object-cover" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(90%_70%_at_75%_10%,rgba(127,163,107,.28),transparent_60%),radial-gradient(60%_50%_at_10%_90%,rgba(155,28,28,.22),transparent_60%),linear-gradient(180deg,#0b100b,#050605)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,5,.95)_20%,rgba(5,6,5,.55)_60%,rgba(5,6,5,.2))]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pb-28">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-12 flex flex-wrap items-center gap-2">
            <StatusBadge game={game} />
            {game.platforms.map((p) => (
              <span key={p} className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white">{p}</span>
            ))}
            <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-[#C7B9B9]">{game.genre.join(" · ")}</span>
          </div>
          <h1 id="game-title" className="geist mt-6 text-6xl font-black leading-[.85] tracking-[-.08em] md:text-8xl">
            {game.title}
          </h1>
          <p className="mt-5 text-xl italic text-[#b9d4a8] md:text-2xl">{game.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d6cfcf]">{game.summary}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <RobloxCta game={game} placement="game_hero" />
            <Link
              href={wikiPath(game.slug)}
              data-track="game_cta_click"
              data-track-game={game.id}
              data-track-cta="wiki"
              className="rounded-full border border-white/20 bg-black/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Official wiki
            </Link>
            <Link
              href={entryPathFor(bundle, "how-to-play")}
              data-track="game_cta_click"
              data-track-game={game.id}
              data-track-cta="how_to_play"
              className="rounded-full px-4 py-3 text-sm font-semibold text-[#C7B9B9] hover:text-white"
            >
              How to play →
            </Link>
          </div>
          <p className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm leading-6 text-[#C7B9B9]" role="note">
            {game.statusNote}
          </p>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="about-game">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="about-game" className="geist text-4xl font-black tracking-[-.06em] md:text-5xl">About the game</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-[#C7B9B9]">
              {game.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <dl className="grid h-fit grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 text-sm">
            {[
              ["Platform", game.platforms.join(", ")],
              ["Genre", game.genre.join(", ")],
              ["Players", "Solo, Duo or Squad of 4"],
              ["Developer", game.developer],
              ["Status", "In development"],
              ["Devices", game.verifiedDevices.length ? game.verifiedDevices.join(", ") : "Device testing in progress"],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#080b08] p-5">
                <dt className="text-xs uppercase tracking-[.2em] text-[#8a8a8a]">{k}</dt>
                <dd className="mt-1.5 font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6" aria-labelledby="features">
        <h2 id="features" className="geist text-4xl font-black tracking-[-.06em] md:text-5xl">What makes it Stillskin Forest</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {game.features.map((f) => (
            <div key={f.title} className="rounded-[1.8rem] border border-white/10 bg-[#0a0d0a] p-7">
              <h3 className="geist text-xl font-black tracking-[-.04em]">{f.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots: only real captures, never placeholders */}
      {shots.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6" aria-labelledby="screenshots">
          <h2 id="screenshots" className="geist text-4xl font-black tracking-[-.06em]">Screenshots</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shots.map((s) => (
              <figure key={s.id} className="overflow-hidden rounded-[1.5rem] border border-white/10">
                <Image src={s.src} alt={s.alt} width={s.dimensions.width} height={s.dimensions.height} sizes="(max-width: 640px) 100vw, 400px" className="h-auto w-full" />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Start here */}
      <GuideStrip bundle={bundle} title="New here? Start with these" entries={startHere} />

      {/* Enemies */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6" aria-labelledby="enemies">
        <div className="flex items-end justify-between gap-4">
          <h2 id="enemies" className="geist text-4xl font-black tracking-[-.06em]">The infected</h2>
          <Link href={categoryPath(game.slug, "enemies")} className="text-sm font-semibold text-[#C7B9B9] hover:text-white">All enemies →</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {enemies.map((e) => (
            <Link key={e.slug} href={entryPath(game.slug, e)} className="rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] p-6 transition hover:border-[#9B1C1C]/60">
              <h3 className="geist text-xl font-black tracking-[-.04em]">{e.title}</h3>
              <p className="mt-2 line-clamp-4 text-sm leading-6 text-[#C7B9B9]">{e.answer}</p>
            </Link>
          ))}
        </div>
      </section>

      <GuideStrip bundle={bundle} title="Places to survive" entries={places} href={categoryPath(game.slug, "locations")} />

      {/* Latest update */}
      {latest && (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6" aria-labelledby="latest-update">
          <div className="rounded-[2.5rem] border border-white/10 bg-[#080b08] p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[.3em] text-[#7FA36B]">Latest update · {formatDate(latest.date)}</p>
            <h2 id="latest-update" className="geist mt-3 text-3xl font-black tracking-[-.05em] md:text-4xl">{latest.title}</h2>
            <ul className="mt-6 grid gap-2 text-sm leading-6 text-[#C7B9B9] md:grid-cols-2">
              {latest.newFeatures.slice(0, 6).map((f) => (
                <li key={f} className="flex gap-3"><span aria-hidden="true" className="text-[#7FA36B]">+</span>{f}</li>
              ))}
            </ul>
            <Link href={entryPathFor(bundle, "development-log")} className="mt-7 inline-flex text-sm font-bold text-white underline decoration-[#7FA36B] underline-offset-4">
              Full development log →
            </Link>
          </div>
        </section>
      )}

      {/* Wiki CTA */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,#1a2617,#0b100b)] p-8 md:p-14">
          <h2 className="geist max-w-3xl text-4xl font-black leading-[.95] tracking-[-.06em] md:text-5xl">Every weapon, enemy, place and secret, documented.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#d6cfcf]">
            The official {game.title} wiki is written from the game&apos;s own data. Story pages hide spoilers until you open them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={wikiPath(game.slug)} className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black">Open the wiki</Link>
            <RobloxCta game={game} placement="game_footer" variant="secondary" />
          </div>
        </div>
      </section>

      <div className="mt-16">
        <InternalLinks />
      </div>
    </main>
  );
}

function entryPathFor(bundle: NonNullable<ReturnType<typeof getBundle>>, slug: string) {
  const e = getEntry(bundle, slug);
  return e ? entryPath(bundle.game.slug, e) : wikiPath(bundle.game.slug);
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

function GuideStrip({
  bundle,
  title,
  entries,
  href,
}: {
  bundle: NonNullable<ReturnType<typeof getBundle>>;
  title: string;
  entries: WikiEntry[];
  href?: string;
}) {
  if (!entries.length) return null;
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="geist text-4xl font-black tracking-[-.06em]">{title}</h2>
        {href && <Link href={href} className="text-sm font-semibold text-[#C7B9B9] hover:text-white">See all →</Link>}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => (
          <Link
            key={e.slug}
            href={entryPath(bundle.game.slug, e)}
            className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] transition hover:border-[#7FA36B]/50"
          >
            {e.media && <PosterArt title={e.title} accent={bundle.game.accent} aspect="16 / 7" />}
            <div className="p-6">
              <h3 className="geist text-xl font-black tracking-[-.04em]">{e.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#C7B9B9]">{e.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
