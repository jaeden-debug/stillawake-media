import type { MediaAsset } from "@/data/games/types";

/**
 * Every image the RISK IT! pages use. All are real captures from the game in
 * Roblox Studio (build v0.2.2, 26 Oct 2026), converted to WebP. Phone shots come
 * from Studio's Device Simulator (iPhone XR, landscape). The thumbnail carries
 * is owner-supplied promotional key art, not a capture; everything else is the
 * game as rendered.
 */

const GAME = "risk-it";

type Folder = "branding" | "challenges" | "progression" | "mobile";

const SHOT = { width: 1772, height: 1080 };

function asset(
  id: string,
  folder: Folder,
  target: string,
  description: string,
  alt: string,
  priority: MediaAsset["priority"],
  opts: Partial<Pick<MediaAsset, "use" | "dimensions" | "aspectRatio" | "captureInstructions">> = {},
): MediaAsset {
  const filename = `${id}.webp`;
  return {
    id,
    filename,
    gameId: GAME,
    target,
    description,
    alt,
    use: opts.use ?? "screenshot",
    dimensions: opts.dimensions ?? SHOT,
    aspectRatio: opts.aspectRatio ?? "16:9.75",
    priority,
    captureInstructions: opts.captureInstructions ?? "Captured in a Studio playtest of build v0.2.2 with the game's own capture helper.",
    spoiler: false,
    liveAvailability: "live",
    status: "optimized",
    src: `/games/${GAME}/${folder}/${filename}`,
  };
}

export const riskItMedia: MediaAsset[] = [
  // Branding
  asset("risk-it-hero", "branding", "/games/risk-it", "A player launched off the Quick Draw island with the Full Spectrum trail", "A Roblox avatar ragdolling through the air above the neon RISK IT! arena, trailing a rainbow streak", "P0", { use: "hero" }),
  asset("risk-it-thumbnail", "branding", "/games", "Owner-supplied promotional key art (not an in-game capture), square art letterboxed on a blurred copy of itself", "RISK IT! key art: a Roblox player launched off a glowing pad under the neon RISK IT! sign", "P0", { use: "thumbnail", dimensions: { width: 1920, height: 1080 }, aspectRatio: "16:9", captureInstructions: "Owner-supplied square key art, centred at full height on a blurred copy of itself at 1920×1080." }),
  asset("risk-it-icon", "branding", "/games", "Square game icon", "RISK IT! game icon: the logo over a synthwave grid with a rainbow arc", "P0", { use: "icon", dimensions: { width: 512, height: 512 }, aspectRatio: "1:1" }),
  asset("risk-it-launch-full-spectrum", "branding", "/games/risk-it", "A Quick Draw flinch, launched with the Full Spectrum trail and Seeing Stars burst", "A player tumbling through the air with a rainbow trail and a starburst, the challenge islands behind", "P0"),
  asset("risk-it-arena-aerial", "branding", "what-is-risk-it", "The whole arena from above: the hub and eight islands", "Aerial view of the RISK IT! hub and its eight neon challenge islands over a synthwave grid", "P0"),
  asset("risk-it-hub", "branding", "how-to-play", "The hub with the HUD: GUTS, wipeouts, title, medals and the Hot Seat banner", "The RISK IT! hub from behind the player, with the GUTS and wipeout counters at the top", "P1"),

  // Challenges
  asset("risk-it-the-button", "challenges", "the-button", "THE BUTTON after one safe press: pot 20, next press 20% drop", "THE BUTTON challenge: the pot board reads POT 20, next press 20% drop, with Press and Cash Out buttons", "P0"),
  asset("risk-it-perfect-stop", "challenges", "perfect-stop", "PERFECT STOP, round 1: the needle approaching the green zone", "PERFECT STOP challenge: a needle sliding toward the green and gold zone on a neon board", "P0"),
  asset("risk-it-quick-draw", "challenges", "quick-draw", "QUICK DRAW on red: wait for green", "QUICK DRAW challenge: a red light on the tower and the Wait for green prompt", "P0"),
  asset("risk-it-the-sweeper", "challenges", "the-sweeper", "THE SWEEPER: the bridge, a low arm and the finish", "THE SWEEPER challenge: a narrow yellow bridge with a spinning arm and the finish platform ahead", "P0"),
  asset("risk-it-door-number-who", "challenges", "door-number-who", "DOOR NUMBER WHO, round 1: three doors, three lamps", "DOOR NUMBER WHO challenge: three neon doors numbered 1 to 3, each with a lamp above it", "P0"),
  asset("risk-it-meltdown", "challenges", "meltdown", "MELTDOWN: a tile flashing before it drops, with a gap where one already fell", "MELTDOWN challenge: a player on a dark tile grid with one tile flashing pink and a missing tile beside it", "P0"),
  asset("risk-it-copy-that", "challenges", "copy-that", "COPY THAT: the board showing the next arrow", "COPY THAT challenge: an arrow board lighting the up arrow while the panel says Watch, 3 arrows", "P0"),
  asset("risk-it-long-shot-aim", "challenges", "long-shot", "LONG SHOT: aiming the cannon at the 100, 250 and 500 rings", "LONG SHOT challenge: the aim meter with ring markers and floating target rings below the cannon", "P0"),
  asset("risk-it-long-shot-flight", "challenges", "long-shot", "LONG SHOT: fired toward the 500 ring with the Re-entry trail", "A player flying toward a floating ring labelled 500, trailing an orange streak", "P1"),

  // Progression and the Vault
  asset("risk-it-win-banked-it", "progression", "guts", "A win: BANKED IT, +20 GUTS and confetti", "A win in RISK IT!: the words Banked it with +20 GUTS and confetti falling around the player", "P0"),
  asset("risk-it-the-vault", "progression", "the-vault", "THE VAULT open on Fail Trails", "THE VAULT shop open on the Fail Trails tab, showing Signature, Liquid Gold and Void Walker", "P0"),
  asset("risk-it-trail-full-spectrum", "progression", "fail-trails", "The Full Spectrum trail in a fail", "A player launched with the rainbow Full Spectrum trail and a confetti burst", "P1"),
  asset("risk-it-trail-liquid-gold", "progression", "launch-bursts", "Liquid Gold trail with the Party Pooper confetti burst", "A player launched with a gold trail and colourful square confetti", "P1"),

  // Phone (Studio Device Simulator)
  asset("risk-it-mobile-prompt", "mobile", "playing-on-phone-and-tablet", "Phone: the tappable RISK IT! prompt at a pad", "RISK IT! on a phone screen: the Tap, Risk it prompt beside the thumbstick and jump button", "P1", { dimensions: { width: 1048, height: 524 }, aspectRatio: "2:1" }),
  asset("risk-it-mobile-meltdown", "mobile", "playing-on-phone-and-tablet", "Phone: MELTDOWN with the slim top panel", "RISK IT! on a phone: MELTDOWN with the challenge panel docked at the top", "P1", { dimensions: { width: 786, height: 393 }, aspectRatio: "2:1" }),
  asset("risk-it-mobile-win", "mobile", "playing-on-phone-and-tablet", "Phone: a win with confetti", "RISK IT! on a phone: Banked it with +20 GUTS and confetti", "P2", { dimensions: { width: 786, height: 393 }, aspectRatio: "2:1" }),
];

export const riskItMediaById: Record<string, MediaAsset> = Object.fromEntries(riskItMedia.map((a) => [a.id, a] as const));
