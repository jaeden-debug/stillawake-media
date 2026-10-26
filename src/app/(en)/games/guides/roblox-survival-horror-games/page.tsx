import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InternalLinks } from "@/components/site";
import { entityIds } from "@/data/entities";
import { GUIDE_PATH, GUIDE_TITLE, SNAPSHOT_DATE, guideGames, robloxUrl } from "@/data/games/guides/roblox-survival-horror";
import { JsonLd, breadcrumbList, graph, type Crumb } from "@/lib/game-schema";
import { absolute } from "@/lib/games";

const title = GUIDE_TITLE;
const description =
  "Eight Roblox survival-horror games compared with numbers from Roblox itself: play style, server size, visits and players, plus which suit a group of friends.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: GUIDE_PATH },
  openGraph: { title, description, url: absolute(GUIDE_PATH), type: "article", modifiedTime: SNAPSHOT_DATE },
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Games", path: "/games" },
  { name: "Roblox survival horror games", path: GUIDE_PATH },
];

const fmt = (n: number) => n.toLocaleString("en-CA");
const compact = (n: number) =>
  n >= 1e9 ? `${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `${Math.round(n / 1e6)}M` : fmt(n);
const anchor = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function SurvivalHorrorGuide() {
  const url = absolute(GUIDE_PATH);
  const byStyle = [
    { label: "Play with a group of friends (16+ per server)", items: guideGames.filter((g) => g.maxPlayers >= 16) },
    { label: "Small sessions (under 10 per server)", items: guideGames.filter((g) => g.maxPlayers < 10) },
  ];

  return (
    <main className="pt-24">
      <JsonLd
        data={graph(
          {
            "@type": "Article",
            "@id": `${url}#article`,
            headline: title,
            description,
            url,
            dateModified: SNAPSHOT_DATE,
            author: { "@id": entityIds.organization },
            publisher: { "@id": entityIds.organization },
            mainEntityOfPage: { "@id": `${url}#webpage` },
            inLanguage: "en-CA",
          },
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: title,
            description,
            isPartOf: { "@id": entityIds.website },
            publisher: { "@id": entityIds.organization },
          },
          {
            "@type": "ItemList",
            name: "Roblox survival horror games",
            numberOfItems: guideGames.length,
            itemListElement: guideGames.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "VideoGame",
                name: g.name,
                url: robloxUrl(g),
                gamePlatform: "Roblox",
                author: { "@type": "Organization", name: g.creator },
              },
            })),
          },
          breadcrumbList(crumbs),
        )}
      />

      <article className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
        <Breadcrumbs crumbs={crumbs} />
        <p className="mt-10 text-xs font-bold uppercase tracking-[.35em] text-[#7FA36B]">Games guide</p>
        <h1 className="geist mt-3 text-4xl font-black leading-[.95] tracking-[-.06em] md:text-6xl">{title}</h1>
        <p className="mt-4 text-xs text-[#8a8a8a]">
          Figures from Roblox&apos;s public game listings, checked <time dateTime={SNAPSHOT_DATE}>{SNAPSHOT_DATE}</time>.
        </p>

        <div className="mt-6 rounded-2xl border border-[#7FA36B]/35 bg-[#7FA36B]/[.07] p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#9fc28a]">What are good survival horror games on Roblox?</p>
          <p className="mt-2 text-[1.08rem] leading-8 text-[#ece6e6]">
            Eight established options, each in a different style: <strong>DOORS</strong>, <strong>The Mimic</strong> and{" "}
            <strong>Pressure</strong> for co-op escape horror; <strong>3008</strong> for base building;{" "}
            <strong>Dead Rails</strong> for zombie survival on the move; <strong>Piggy</strong> for short chases;{" "}
            <strong>Forsaken</strong> for killer-versus-survivors; and <strong>Apeirophobia</strong> for exploration. The
            right one depends on how many friends you have and whether you&apos;d rather fight, hide, build or explore.
          </p>
        </div>

        <section aria-labelledby="how" className="mt-10">
          <h2 id="how" className="geist text-2xl font-black tracking-[-.04em] md:text-3xl">How this list was made</h2>
          <p className="mt-4 text-[1.0625rem] leading-8 text-[#cfc8c8]">
            This is not a ranking. We picked established survival and horror experiences and took every number from Roblox&apos;s own listing for each game. Visits are lifetime totals. &ldquo;Playing&rdquo; is a single moment on the day we checked, not an average. &ldquo;Server size&rdquo; is how many people one server holds, not how many can be in your party. Premises are summarised from each developer&apos;s own description.
          </p>
          <p className="mt-4 text-[1.0625rem] leading-8 text-[#cfc8c8]">
            Disclosure: StillAwake Media makes{" "}
            <Link href="/games/stillskin-forest" className="text-[#cfe3c2] underline decoration-[#7FA36B]/60 underline-offset-[3px]">Stillskin Forest</Link>, a co-op survival-horror game that is still in development. It is left off this list because it is not yet publicly playable.
          </p>
        </section>

        <section aria-labelledby="compare" className="mt-10">
          <h2 id="compare" className="geist text-2xl font-black tracking-[-.04em] md:text-3xl">At a glance</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10" role="region" aria-label="Comparison table" tabIndex={0}>
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">Roblox survival horror games compared, {SNAPSHOT_DATE}</caption>
              <thead className="bg-white/[.05] text-xs uppercase tracking-[.12em] text-[#a9a0a0]">
                <tr>
                  {["Game", "Style", "Server size", "Total visits", `Playing on ${SNAPSHOT_DATE}`, "Created"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guideGames.map((g) => (
                  <tr key={g.universeId} className="border-t border-white/[.07]">
                    <th scope="row" className="px-4 py-3 font-semibold text-white">
                      <a href={`#${anchor(g.name)}`} className="hover:text-[#cfe3c2]">{g.name}</a>
                    </th>
                    <td className="px-4 py-3 text-[#cfc8c8]">{g.style}</td>
                    <td className="px-4 py-3 text-[#cfc8c8]">{g.maxPlayers}</td>
                    <td className="px-4 py-3 text-[#cfc8c8]">{compact(g.visits)}</td>
                    <td className="px-4 py-3 text-[#cfc8c8]">{fmt(g.playingAtSnapshot)}</td>
                    <td className="px-4 py-3 text-[#cfc8c8]">{g.created.slice(0, 4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="games" className="mt-12">
          <h2 id="games" className="geist text-2xl font-black tracking-[-.04em] md:text-3xl">The games</h2>
          {guideGames.map((g) => (
            <section key={g.universeId} aria-labelledby={anchor(g.name)} className="mt-8 scroll-mt-28 rounded-[1.6rem] border border-white/10 bg-[#0a0d0a] p-6 md:p-8">
              <h3 id={anchor(g.name)} className="geist text-2xl font-black tracking-[-.04em]">{g.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[.2em] text-[#7FA36B]">{g.style} · by {g.creator}</p>
              <p className="mt-4 text-[1.0625rem] leading-8 text-[#cfc8c8]">{g.premise}</p>
              <p className="mt-3 text-[1.0625rem] leading-8 text-[#cfc8c8]"><strong className="text-white">Good for:</strong> {g.goodFor}</p>
              {g.warnings && <p className="mt-3 text-sm text-[#a9a0a0]">{g.warnings}</p>}
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                {[
                  ["Roblox genre", g.genre],
                  ["Server size", String(g.maxPlayers)],
                  ["Visits", compact(g.visits)],
                  ["Created", g.created],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11px] uppercase tracking-[.15em] text-[#8a8a8a]">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={robloxUrl(g)}
                target="_blank"
                rel="noopener"
                data-track="guide_outbound_click"
                data-track-game={g.name}
                className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                {g.name} on Roblox ↗
              </a>
            </section>
          ))}
        </section>

        <section aria-labelledby="friends" className="mt-12">
          <h2 id="friends" className="geist text-2xl font-black tracking-[-.04em] md:text-3xl">Which to play with friends</h2>
          <p className="mt-4 text-[1.0625rem] leading-8 text-[#cfc8c8]">
            Every game here is multiplayer. Server size is the practical difference: it decides whether your whole group fits in one server.
          </p>
          {byStyle.map((grp) => (
            <div key={grp.label} className="mt-5">
              <h3 className="text-sm font-bold text-white">{grp.label}</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[1.0625rem] leading-8 text-[#cfc8c8] marker:text-[#7FA36B]">
                {grp.items.map((g) => (
                  <li key={g.universeId}>{g.name}: up to {g.maxPlayers} per server</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <footer className="mt-14 border-t border-white/10 pt-6 text-xs leading-6 text-[#8a8a8a]">
          Source: Roblox public game listings (games.roblox.com), read {SNAPSHOT_DATE}. Player counts change minute to minute; event names in titles are left out. Spotted something out of date?{" "}
          <Link href="/contact" className="text-[#C7B9B9] underline underline-offset-2">Tell us</Link>.
        </footer>
      </article>

      <div className="mt-16">
        <InternalLinks />
      </div>
    </main>
  );
}
