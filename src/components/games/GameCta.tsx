import type { Game } from "@/data/games/types";

/**
 * The outbound Roblox button. Says "Play on Roblox" only once the game is
 * confirmed publicly playable; until then it is honest about being a page to
 * view. A click is recorded as an outbound click, never as a play.
 */
export function RobloxCta({
  game,
  placement,
  variant = "primary",
}: {
  game: Game;
  placement: string;
  variant?: "primary" | "secondary";
}) {
  if (!game.officialUrl) return null;
  const label = game.publiclyPlayable ? "Play on Roblox" : "View on Roblox";
  return (
    <a
      href={game.officialUrl}
      target="_blank"
      rel="noopener"
      data-track="roblox_outbound_click"
      data-track-game={game.id}
      data-track-placement={placement}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded-full bg-[#7FA36B] px-6 py-3 text-sm font-bold text-[#06110a] transition hover:bg-[#93b87e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          : "inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      }
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export function StatusBadge({ game }: { game: Game }) {
  const label =
    game.releaseStatus === "released" ? "Released" : game.releaseStatus === "early-access" ? "Early access" : "In development";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#E3B341]/40 bg-[#E3B341]/10 px-3 py-1 text-xs font-semibold text-[#f0d58a]">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-[#E3B341]" />
      {label}
    </span>
  );
}
