import Link from "next/link";
import type { Game } from "@/data/games/types";
import { StatusBadge } from "./GameCta";

type Locale = "en" | "fr";

const COPY = {
  en: { kicker: "Our game", play: "Play on Roblox", view: "View on Roblox", newTab: "(opens Roblox in a new tab)" },
  fr: { kicker: "Notre jeu", play: "Jouer sur Roblox", view: "Voir sur Roblox", newTab: "(ouvre Roblox dans un nouvel onglet)" },
} as const;

/**
 * A related-game block for articles and game pages: what the game is, where
 * to read more on this site, and the verified Roblox link.
 *
 * Server-rendered plain links, so every word and URL is in the HTML for
 * crawlers. A game opts in with `spotlight` in its data; without it this
 * renders nothing, so adding a future game is a data change only.
 * The Play label follows `publiclyPlayable`, like RobloxCta.
 */
export function GameSpotlight({
  game,
  locale = "en",
  placement,
  context,
}: {
  game: Game;
  locale?: Locale;
  placement: string;
  /** Optional sentence tying the game to the page it sits on. */
  context?: string;
}) {
  const spot = game.spotlight;
  if (!spot) return null;
  const t = COPY[locale];
  const headingId = `spotlight-${game.slug}-${placement}`;
  const blurb = locale === "fr" ? spot.blurbFr : spot.blurbEn;

  return (
    <aside className="game-spotlight" aria-labelledby={headingId} data-game={game.id}>
      <div className="game-spotlight-head">
        <p className="game-spotlight-kicker">{t.kicker}</p>
        <StatusBadge game={game} />
      </div>
      <h2 id={headingId} className="game-spotlight-title">
        <Link href={`/games/${game.slug}`}>{game.title}</Link>
      </h2>
      <p className="game-spotlight-tagline" lang="en">{game.tagline}</p>
      <p className="game-spotlight-blurb">{blurb}</p>
      {context ? <p className="game-spotlight-context">{context}</p> : null}

      <ul className="game-spotlight-links">
        {spot.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{locale === "fr" ? link.labelFr : link.labelEn}</Link>
          </li>
        ))}
      </ul>

      {game.officialUrl ? (
        <a
          href={game.officialUrl}
          target="_blank"
          rel="noopener"
          className="game-spotlight-play"
          data-track="roblox_outbound_click"
          data-track-game={game.id}
          data-track-placement={placement}
        >
          {game.publiclyPlayable ? t.play : t.view} <span aria-hidden="true">↗</span>
          <span className="sr-only"> {t.newTab}</span>
        </a>
      ) : null}
    </aside>
  );
}
