import type { MediaAsset } from "@/data/games/types";
import { capturedAssets, extraAssets } from "./captured";

/**
 * Every image the Stillskin Forest pages want, captured or not.
 *
 * An asset with status "missing" renders the designed fallback panel; the
 * site never emits an <img> for a file that does not exist. When a capture
 * lands in /public/games/stillskin-forest/<folder>/<filename>, flip its status
 * to "optimized" (or regenerate captured.ts from the capture agent's
 * stillskin-forest-assets.json) and the image appears everywhere it is referenced.
 *
 * Capture rules: real in-game captures only, no development UI, no generated
 * or stock imagery presented as gameplay. 16:9 screenshots at 1920×1080.
 */

const GAME = "stillskin-forest";

type Folder =
  | "branding"
  | "locations"
  | "enemies"
  | "weapons"
  | "items"
  | "mechanics"
  | "nights"
  | "lore"
  | "quests";

type Opts = Partial<Pick<MediaAsset, "use" | "spoiler" | "liveAvailability" | "dimensions" | "aspectRatio">>;

const WIDE = { dimensions: { width: 1920, height: 1080 }, aspectRatio: "16:9" };

function asset(
  id: string,
  folder: Folder,
  target: string,
  description: string,
  alt: string,
  priority: MediaAsset["priority"],
  captureInstructions: string,
  opts: Opts = {},
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
    dimensions: opts.dimensions ?? WIDE.dimensions,
    aspectRatio: opts.aspectRatio ?? WIDE.aspectRatio,
    priority,
    captureInstructions,
    spoiler: opts.spoiler ?? false,
    liveAvailability: opts.liveAvailability ?? "live",
    status: "missing",
    src: `/games/${GAME}/${folder}/${filename}`,
  };
}

const NO_UI = "Hide all HUD and development UI.";

export const stillskinMedia: MediaAsset[] = [
  // Branding and promotional
  asset("stillskin-forest-hero", "branding", "/games/stillskin-forest", "Cinematic main game hero", "Survivors with headlamps on a forest trail at dusk in Stillskin Forest", "P0", `Wide establishing shot at dusk with 2–4 survivors, headlamps on, forest and Stillwater rooftops in depth. Leave the left third darker for headline text. ${NO_UI}`, { use: "hero", dimensions: { width: 2560, height: 1440 } }),
  asset("stillskin-forest-thumbnail", "branding", "/games", "Primary horizontal game thumbnail", "Stillskin Forest key art: a survivor in a beanie aims at infected outside Rosie's Diner under a full moon", "P0", `Strongest single image of the game, readable at 400px wide. ${NO_UI}`, { use: "thumbnail" }),
  {
    ...asset("stillskin-forest-social", "branding", "/games/stillskin-forest", "Owner-supplied promotional key art for link previews (not an in-game capture)", "Stillskin Forest key art: the logo over a survivor with a headlamp facing infected outside Rosie's Diner under a full moon", "P0", "Owner-supplied key art, exported as 1600×900 JPEG for social previews.", { use: "social", dimensions: { width: 1600, height: 900 } }),
    filename: "stillskin-forest-social.jpg",
    source: "owner-supplied key art, 1672x941 (2026-10-27)",
    status: "optimized",
    src: "/games/stillskin-forest/branding/stillskin-forest-social.jpg",
  },
  asset("stillskin-forest-icon", "branding", "/games", "Square game icon", "Stillskin Forest game icon", "P0", "Square crop of a single strong subject (an infected silhouette or the asylum). Must read at 64px.", { use: "icon", dimensions: { width: 512, height: 512 }, aspectRatio: "1:1" }),
  asset("stillskin-forest-cover", "branding", "/games/stillskin-forest", "Game cover artwork", "Stillskin Forest cover art", "P1", "Portrait cover composition with room for the title at the top.", { use: "cover", dimensions: { width: 1200, height: 1600 }, aspectRatio: "3:4" }),
  asset("stillskin-forest-gameplay-overview", "branding", "/games/stillskin-forest", "Wide gameplay overview", "A survivor scavenging a Stillwater street by day", "P1", `Third-person, mid-day, a survivor looting with the town behind. ${NO_UI}`),
  asset("stillskin-forest-team-survival", "branding", "/games/stillskin-forest/wiki/multiplayer/co-op-survival", "Cooperative survivors", "Four survivors holding a doorway together at night", "P1", "Squad of 3–4 players covering each other at night. Needs real players or test accounts."),
  asset("stillskin-forest-night-chase", "branding", "/games/stillskin-forest", "Infected pursuit", "A survivor runs from a crowd of infected along a lantern-lit forest trail at night", "P0", `Over-the-shoulder chase at night with 2–3 infected visible. ${NO_UI}`),
  asset("stillskin-forest-trailer-poster", "branding", "/games/stillskin-forest", "Trailer thumbnail", "Stillskin Forest trailer poster", "P2", "Only needed once a trailer exists.", { use: "trailer-poster" }),

  // Locations
  asset("stillskin-forest-campgrounds", "locations", "campgrounds", "Main campground", "A log cabin across the campground lake at night, with infected at the shoreline in Stillskin Forest", "P0", `Cabins reflected across the lake at dusk. ${NO_UI}`),
  asset("stillskin-forest-daytime", "locations", "day-night-cycle", "Peaceful forest in daylight", "Sunlit pine forest in Stillskin Forest", "P1", "Mid-morning, Day 1 lighting."),
  asset("stillskin-forest-nighttime", "locations", "day-night-cycle", "Forest at night", "Moonlit pine forest at night in Stillskin Forest", "P1", "Same framing as the daytime shot, at night, headlamp off."),
  asset("stillskin-forest-cabins", "locations", "campgrounds", "Cabin area", "Wooden camping cabins in the Stillskin Forest campground", "P2", "Close on the cabin row."),
  asset("stillskin-forest-trails", "locations", "forest-trail", "Forest trails", "The lantern-lit forest trail toward Stillwater", "P1", "Trail with lanterns and the signpost."),
  asset("stillskin-forest-stillwater", "locations", "stillwater", "Stillwater town overview", "Pine General Store and a wrecked car on Stillwater's main road", "P0", `Elevated view down Main Street, wrecks and streetlights visible. ${NO_UI}`),
  asset("stillskin-forest-welcome-sign", "locations", "stillwater", "Welcome to Stillwater sign", "The Welcome to Stillwater sign with the population crossed out to zero", "P2", "Close on the sign."),
  asset("stillskin-forest-hospital", "locations", "st-agnes-hospital", "St. Agnes Hospital", "An ambulance with its doors open outside St. Agnes Hospital as infected close in at night", "P0", "Hospital entrance with the ER canopy and ambulance."),
  asset("stillskin-forest-morgue", "locations", "morgue", "Morgue", "The drawer wall and autopsy tables in the St. Agnes morgue", "P1", "Inside the morgue, drawer wall in frame.", { liveAvailability: "secret" }),
  asset("stillskin-forest-freezer", "locations", "pine-general-store", "Walk-in freezer", "Meat hooks in the walk-in freezer behind the general store", "P2", "Inside the freezer.", { liveAvailability: "secret" }),
  asset("stillskin-forest-diner", "locations", "rosies-diner", "Rosie's Diner", "The exterior of Rosie's Diner in Stillwater", "P1", "Exterior with neon sign at dusk."),
  asset("stillskin-forest-general-store", "locations", "pine-general-store", "Pine General Store", "Pine General Store on Stillwater's main street", "P1", "Store front."),
  asset("stillskin-forest-houses", "locations", "houses-of-stillwater", "Residential buildings", "Boarded-up houses on a Stillwater street", "P2", "Elm Street porches."),
  asset("stillskin-forest-attic", "locations", "houses-of-stillwater", "Tommy's attic", "A circle of dolls in an attic in Stillwater", "P2", "Attic with the doll circle and rocking chair.", { liveAvailability: "secret" }),
  asset("stillskin-forest-rooftops", "locations", "st-agnes-hospital", "Rooftop traversal", "A survivor on the hospital roof above Stillwater", "P2", "Hospital roof sandbag nest."),
  asset("stillskin-forest-hidden-study", "locations", "houses-of-stillwater", "Hidden study", "A hidden study behind a bookshelf", "P2", "Inside Paul's study.", { liveAvailability: "secret" }),
  asset("stillskin-forest-storm-drain", "locations", "storm-drain", "Storm drain", "The storm drain tunnel under Memorial Park", "P2", "Tunnel interior with headlamp light.", { liveAvailability: "secret" }),
  asset("stillskin-forest-memorial-park", "locations", "memorial-park", "Memorial Park", "The playground in Memorial Park, Stillwater", "P1", "Playground, picnic tables and fountain."),
  asset("stillskin-forest-police-car", "locations", "stillwater", "Police car", "A police roadblock with flashing lights at the edge of Stillwater", "P2", "Roadblock at night with lights on."),
  asset("stillskin-forest-wrecked-vehicles", "locations", "stillwater", "Wrecked vehicles", "Burning car wrecks on a Stillwater street", "P2", "Burning wrecks at night."),
  asset("stillskin-forest-blackthorn-asylum", "locations", "blackthorn-asylum", "Asylum exterior", "Infected at the windows and in the grass outside Blackthorn Asylum under a full moon", "P0", "Asylum front with the green lamp over the doors."),
  asset("stillskin-forest-asylum-interior", "locations", "blackthorn-asylum", "Asylum interior", "The admissions hall inside Blackthorn Asylum", "P1", "Admissions hall and stairs."),
  asset("stillskin-forest-graveyard", "locations", "graveyard", "Graveyard", "The Blackthorn graveyard and its angel statue", "P1", "Angel statue in frame."),
  asset("stillskin-forest-chapel", "locations", "chapel", "Chapel", "The chapel beside the Blackthorn graveyard", "P1", "Chapel exterior."),
  asset("stillskin-forest-crypt-cave", "locations", "crypt-cave", "Crypt cave", "The green-lit chamber at the bottom of the crypt cave", "P1", "Green-lit chamber.", { spoiler: true }),
  asset("stillskin-forest-ritual-circle", "quests", "the-rite-of-stillness", "Ritual circle", "The ritual circle in the Blackthorn cafeteria", "P1", "Cafeteria circle with candles.", { spoiler: true }),
  asset("stillskin-forest-hollow", "locations", "the-hollow", "Hollow environment", "Green crystals lighting the Weeping Gallery underground", "P1", "Weeping Gallery and chasm.", { spoiler: true }),
  asset("stillskin-forest-green-lake", "locations", "green-lake", "Green Lake", "Blackthorn Asylum above Green Lake at night, with infected along the fence", "P0", "Lake with the asylum above, fog and green water."),
  asset("stillskin-forest-green-lake-dock", "locations", "green-lake", "Sampling dock", "The abandoned sampling dock on Green Lake", "P2", "Dock and condemned-water sign."),
  asset("stillskin-forest-green-lake-drain", "locations", "green-lake", "Asylum drainage outlet", "The corroded asylum drain outlet at Green Lake", "P2", "Drain outlet.", { spoiler: true }),

  // Enemies
  asset("stillskin-forest-walker", "enemies", "walker", "Walker", "A Walker infected in Stillskin Forest", "P0", "Full body, three-quarter view, readable silhouette."),
  asset("stillskin-forest-runner", "enemies", "runner", "Runner", "A Runner infected mid-sprint", "P1", "Mid-run."),
  asset("stillskin-forest-screamer", "enemies", "screamer", "Screamer", "A Screamer infected calling the horde", "P1", "Mid-scream if possible."),
  asset("stillskin-forest-brute", "enemies", "brute", "Brute", "A Brute, the largest infected, at night", "P1", "Low angle to sell its size."),
  asset("stillskin-forest-watcher", "enemies", "watcher", "Watcher", "The Watcher standing at the tree line with glowing eyes", "P1", "Distant, at the tree line, at night."),
  asset("stillskin-forest-infected-horde", "enemies", "enemy-comparison", "Infected horde", "A horde of infected on a Stillwater street at night", "P1", "Night horde."),
  asset("stillskin-forest-zombie-chase", "enemies", "detection-and-noise", "Zombie chase", "Infected chasing a survivor", "P2", "Chase from behind the infected."),
  asset("stillskin-forest-zombie-investigation", "enemies", "detection-and-noise", "Zombie investigation", "An infected searching where a survivor was last seen", "P2", "Infected in search state."),

  // Weapons
  asset("stillskin-forest-baseball-bat", "weapons", "baseball-bat", "Baseball Bat", "The Baseball Bat", "P1", "Item on a plain surface or in hand, first person."),
  asset("stillskin-forest-machete", "weapons", "machete", "Machete", "The Machete", "P1", "Same framing as the bat."),
  asset("stillskin-forest-hammer", "weapons", "hammer", "Hammer", "The Hammer", "P2", "Same framing as the bat."),
  asset("stillskin-forest-crowbar", "weapons", "crowbar", "Crowbar", "The Crowbar", "P2", "Same framing as the bat."),
  asset("stillskin-forest-pistol", "weapons", "pistol", "Pistol", "The Pistol", "P1", "First-person aimed down sights."),
  asset("stillskin-forest-shotgun", "weapons", "shotgun", "Shotgun", "The Shotgun", "P1", "First-person, two-handed."),
  asset("stillskin-forest-signal-remote", "weapons", "freeze-device", "Freeze Device", "The Freeze Device, a rewired remote with red lights", "P2", "Mid-shot with a frozen group."),
  asset("stillskin-forest-weapon-combat", "weapons", "weapons-compared", "Weapon combat", "A survivor fighting infected with a melee weapon", "P1", "Third-person mid-swing."),
  asset("stillskin-forest-weapon-inventory", "weapons", "inventory-and-hotbar", "Weapon inventory", "The backpack panel with weapons", "P2", "Backpack open. HUD allowed for this one."),

  // Items
  asset("stillskin-forest-food", "items", "food", "Food items", "Canned beans, chips and an energy bar", "P2", "The three snacks together."),
  asset("stillskin-forest-first-aid-kit", "items", "first-aid-kit", "First Aid Kit", "A First Aid Kit", "P2", "Item close-up."),
  asset("stillskin-forest-lantern", "items", "lantern", "Lantern", "A lit Lantern glowing on a dark wooden table", "P2", "Placed lantern at night."),

  // Mechanics
  asset("stillskin-forest-sprinting", "mechanics", "stamina-and-sprinting", "Sprinting", "A survivor sprinting", "P2", "Sprint with FOV widening."),
  asset("stillskin-forest-stamina", "mechanics", "stamina-and-sprinting", "Stamina bar", "The stamina bar while sprinting", "P2", "HUD allowed: stamina bar visible."),
  asset("stillskin-forest-health", "mechanics", "health-and-healing", "Health", "The health bar flashing after a hit", "P2", "HUD allowed."),
  asset("stillskin-forest-inventory", "mechanics", "inventory-and-hotbar", "Inventory", "The backpack inventory panel", "P2", "HUD allowed."),
  asset("stillskin-forest-hotbar", "mechanics", "inventory-and-hotbar", "Hotbar", "The hotbar with items and ammo counts", "P2", "HUD allowed."),
  asset("stillskin-forest-headlamp", "mechanics", "headlamp", "Headlamp", "A headlamp beam cutting through the forest at night", "P1", "Night, beam visible."),
  asset("stillskin-forest-locker-hiding", "mechanics", "hiding", "Locker hiding", "A survivor stepping into a hospital locker", "P0", "Third-person entering a locker."),
  asset("stillskin-forest-locker-view", "mechanics", "hiding", "Locker view", "The view out through the slats of a locker", "P1", "Peek camera through slats."),
  asset("stillskin-forest-dread-encounter", "mechanics", "the-dread-encounter", "Dread Encounter", "An infected approaching a locker during the Dread Encounter", "P0", "Infected walking up to the hide."),
  asset("stillskin-forest-dread-encounter-closeup", "mechanics", "the-dread-encounter", "Dread Encounter close-up", "An infected staring through a locker grate", "P1", "From inside, the face at the grate."),
  asset("stillskin-forest-revive", "mechanics", "downed-and-revive", "Revive", "A survivor reviving a downed teammate", "P1", "Two players, revive in progress."),
  asset("stillskin-forest-downed", "mechanics", "downed-and-revive", "Downed", "A downed survivor on the ground", "P2", "Downed state."),
  asset("stillskin-forest-ghost-spectator", "mechanics", "death-ghosts-and-the-finale", "Ghost spectator", "A blue ghost spectator watching teammates", "P2", "Ghost mode."),
  asset("stillskin-forest-end-run", "mechanics", "death-ghosts-and-the-finale", "End of run", "The end-of-run summary card over the landmark tour", "P1", "The run-over result card during the outro tour."),
  asset("stillskin-forest-zombie-dance", "mechanics", "death-ghosts-and-the-finale", "Zombie dance", "Infected dancing around the survivors on the hospital roof", "P2", "Finale dance."),
  asset("stillskin-forest-building", "mechanics", "doors-and-building", "Building", "Planks nailed across a doorway", "P2", "Barricaded doorway."),

  // Special nights
  asset("stillskin-forest-blood-moon", "nights", "blood-moon", "Blood Moon", "A red Blood Moon over the forest", "P1", "Red sky, moon in frame."),
  asset("stillskin-forest-heavy-fog", "nights", "heavy-fog", "Heavy Fog", "Dense grey fog in Stillwater", "P1", "Street disappearing into fog."),
  asset("stillskin-forest-infected-surge", "nights", "infected-surge", "Infected Surge", "A surge of infected flooding a street", "P1", "Many infected."),
  asset("stillskin-forest-silent-night", "nights", "silent-night", "Silent Night", "Cold, clear moonlight over a silent forest", "P1", "Blue moonlight, nothing moving."),

  // Story and relics
  asset("stillskin-forest-sisters-rosary", "lore", "sisters-rosary", "The Sister's Rosary", "The Sister's Rosary", "P2", "Relic where it lies.", { spoiler: true }),
  asset("stillskin-forest-miners-lantern", "lore", "miners-lantern", "The Miner's Lantern", "The Miner's Lantern burning green", "P2", "In the crypt chamber.", { spoiler: true }),
  asset("stillskin-forest-angels-tear", "lore", "angels-tear", "The Angel's Tear", "The Angel's Tear", "P2", "At the grave.", { spoiler: true }),
  asset("stillskin-forest-dr-vances-ring", "lore", "dr-vances-ring", "Dr. Vance's Ring", "Dr. Vance's Ring", "P2", "In Vance's office.", { spoiler: true }),
  asset("stillskin-forest-admission-ledger", "quests", "blackthorn-admission-ledger", "Admission ledger", "The Blackthorn Admission Ledger open in the note reader", "P1", "Ledger note open on screen (use the ShowNote hook). HUD allowed."),
  asset("stillskin-forest-story-documents", "lore", "notes-and-tapes", "Story documents", "The note reader open on a story note", "P2", "Note UI open. HUD allowed.", { spoiler: true }),
  asset("stillskin-forest-ritual", "quests", "the-rite-of-stillness", "The ritual", "Candles lighting during the Rite of Stillness", "P2", "Ritual in progress.", { spoiler: true }),
  asset("stillskin-forest-hollow-heart", "quests", "the-heart-of-stillskin", "The Heart", "The pulsing Heart of Stillskin in its cavern", "P2", "Heart cavern.", { spoiler: true }),
];

/**
 * Declared assets with captures applied (see captured.ts), followed by extra
 * captures that were not on the original list.
 */
export const stillskinMediaById: Record<string, MediaAsset> = Object.fromEntries([
  ...stillskinMedia.map((a) => [a.id, { ...a, ...(capturedAssets[a.id] ?? {}) }] as const),
  ...extraAssets.map((a) => [a.id, a] as const),
]);
