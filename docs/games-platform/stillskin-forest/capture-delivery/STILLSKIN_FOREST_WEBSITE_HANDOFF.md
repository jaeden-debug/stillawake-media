# Stillskin Forest — website asset handoff

**Delivered:** 2026-10-26 by the Stillskin Forest capture agent (Claude, "Stillskin Forest moderator" session).
**Receiving project:** `stillawake-media` (website agent session "StillAwake Media portfolio expansion").

## Where the files are

- **Location:** `stillawake-media/public/games/stillskin-forest/`, in the subfolders your `media.ts` expects: `branding/`, `locations/`, `enemies/`, `weapons/`, `items/`, `mechanics/`, `quests/`.
- **Filenames:** `<id>.webp`.
- **Manifest:** `stillawake-media/docs/games-platform/stillskin-forest/capture-delivery/stillskin-forest-assets.json` (outside `public/`, so it is never served).
  - `capturedAssets` holds the MediaAsset fields: id, filename, gameId, target, description, alt, use, dimensions, aspectRatio, priority, spoiler, liveAvailability, status "optimized", src.
  - Each entry also has capture metadata: captureMode, originalResolution, captureDate, gameVersion, verification, bytes, sha1, and source master.
  - `missing` lists every website id that has no image yet.
- **Masters:** lossless 2768×1557 PNG originals in `~/Documents/STILLSKIN_FOREST_MEDIA/masters/`. Nothing in your repo is a master.

## Counts

- **48 files delivered:** 39 match website ids, 9 are extra captures with new ids.
- **47 website ids are still missing.** They keep rendering your designed fallback.
- **Verified:** every `src` resolves to a file under `public/` (48/48). Every file opens, its dimensions match the manifest, and nothing was upscaled.

## Integration

1. Merge `capturedAssets` into `capturedAssets` in `media.ts`. Keep `target` exactly as given, since the wiki attaches images by target.
2. Images with `spoiler: true` sit behind your spoiler control: crypt cave, Hollow, Hollow heart.
3. Website ids not listed below stay `missing`.

## Recommended picks

- **Hero:** none yet. `stillskin-forest-hero` (dusk survivors) is still missing; a re-shoot is planned. Until then `locations/stillskin-forest-stillwater.webp` works as an interim wide image if you want one.
- **Portfolio / games hub thumbnail:** `branding/stillskin-forest-thumbnail.webp` (Blackthorn Asylum above Green Lake).
- **Icon:** `branding/stillskin-forest-icon.webp`, a Walker face. A stronger silhouette icon is still wanted.
- **Wiki lead images:** stillwater, hospital, campgrounds, green-lake, walker, dread-encounter, locker-view.

## Delivered files

| id | src | size | P | spoiler | mode | target |
|---|---|---|---|---|---|---|
| stillskin-forest-thumbnail | /games/stillskin-forest/branding/stillskin-forest-thumbnail.webp | 1920×1080 | P0 |  | Staged | /games |
| stillskin-forest-icon | /games/stillskin-forest/branding/stillskin-forest-icon.webp | 512×512 | P0 |  | Clean | /games |
| stillskin-forest-campgrounds | /games/stillskin-forest/locations/stillskin-forest-campgrounds.webp | 1920×1080 | P0 |  | Staged | campgrounds |
| stillskin-forest-stillwater | /games/stillskin-forest/locations/stillskin-forest-stillwater.webp | 1920×1080 | P0 |  | Staged | stillwater |
| stillskin-forest-hospital | /games/stillskin-forest/locations/stillskin-forest-hospital.webp | 1920×1080 | P0 |  | Staged | st-agnes-hospital |
| stillskin-forest-blackthorn-asylum | /games/stillskin-forest/locations/stillskin-forest-blackthorn-asylum.webp | 1920×1080 | P0 |  | Staged | blackthorn-asylum |
| stillskin-forest-green-lake | /games/stillskin-forest/locations/stillskin-forest-green-lake.webp | 1920×1080 | P0 |  | Staged | green-lake |
| stillskin-forest-walker | /games/stillskin-forest/enemies/stillskin-forest-walker.webp | 1920×1080 | P0 |  | Clean | walker |
| stillskin-forest-dread-encounter | /games/stillskin-forest/mechanics/stillskin-forest-dread-encounter.webp | 1920×1080 | P0 |  | Authentic | the-dread-encounter |
| stillskin-forest-locker-view | /games/stillskin-forest/mechanics/stillskin-forest-locker-view.webp | 1920×1080 | P1 |  | Authentic | hiding |
| stillskin-forest-daytime | /games/stillskin-forest/locations/stillskin-forest-daytime.webp | 1920×1080 | P1 |  | Staged | day-night-cycle |
| stillskin-forest-trails | /games/stillskin-forest/locations/stillskin-forest-trails.webp | 1920×1080 | P1 |  | Staged | forest-trail |
| stillskin-forest-welcome-sign | /games/stillskin-forest/locations/stillskin-forest-welcome-sign.webp | 1920×1080 | P2 |  | Staged | stillwater |
| stillskin-forest-diner | /games/stillskin-forest/locations/stillskin-forest-diner.webp | 1920×1080 | P1 |  | Staged | rosies-diner |
| stillskin-forest-general-store | /games/stillskin-forest/locations/stillskin-forest-general-store.webp | 1920×1080 | P1 |  | Staged | pine-general-store |
| stillskin-forest-houses | /games/stillskin-forest/locations/stillskin-forest-houses.webp | 1920×1080 | P2 |  | Staged | houses-of-stillwater |
| stillskin-forest-police-car | /games/stillskin-forest/locations/stillskin-forest-police-car.webp | 1920×1080 | P2 |  | Staged | stillwater |
| stillskin-forest-wrecked-vehicles | /games/stillskin-forest/locations/stillskin-forest-wrecked-vehicles.webp | 1920×1080 | P2 |  | Staged | stillwater |
| stillskin-forest-memorial-park | /games/stillskin-forest/locations/stillskin-forest-memorial-park.webp | 1920×1080 | P1 |  | Staged | memorial-park |
| stillskin-forest-graveyard | /games/stillskin-forest/locations/stillskin-forest-graveyard.webp | 1920×1080 | P1 |  | Staged | graveyard |
| stillskin-forest-chapel | /games/stillskin-forest/locations/stillskin-forest-chapel.webp | 1920×1080 | P1 |  | Staged | chapel |
| stillskin-forest-crypt-cave | /games/stillskin-forest/locations/stillskin-forest-crypt-cave.webp | 1920×1080 | P1 | yes | Staged | crypt-cave |
| stillskin-forest-hollow | /games/stillskin-forest/locations/stillskin-forest-hollow.webp | 1920×1080 | P1 | yes | Staged | the-hollow |
| stillskin-forest-hollow-heart | /games/stillskin-forest/quests/stillskin-forest-hollow-heart.webp | 1920×1080 | P2 | yes | Staged | the-heart-of-stillskin |
| stillskin-forest-runner | /games/stillskin-forest/enemies/stillskin-forest-runner.webp | 1920×1080 | P1 |  | Clean | runner |
| stillskin-forest-screamer | /games/stillskin-forest/enemies/stillskin-forest-screamer.webp | 1920×1080 | P1 |  | Clean | screamer |
| stillskin-forest-brute | /games/stillskin-forest/enemies/stillskin-forest-brute.webp | 1920×1080 | P1 |  | Clean | brute |
| stillskin-forest-infected-horde | /games/stillskin-forest/enemies/stillskin-forest-infected-horde.webp | 1920×1080 | P1 |  | Authentic | enemy-comparison |
| stillskin-forest-baseball-bat | /games/stillskin-forest/weapons/stillskin-forest-baseball-bat.webp | 1920×1080 | P1 |  | Clean | baseball-bat |
| stillskin-forest-machete | /games/stillskin-forest/weapons/stillskin-forest-machete.webp | 1920×1080 | P1 |  | Clean | machete |
| stillskin-forest-pistol | /games/stillskin-forest/weapons/stillskin-forest-pistol.webp | 1920×1080 | P1 |  | Clean | pistol |
| stillskin-forest-shotgun | /games/stillskin-forest/weapons/stillskin-forest-shotgun.webp | 1920×1080 | P1 |  | Clean | shotgun |
| stillskin-forest-crowbar | /games/stillskin-forest/weapons/stillskin-forest-crowbar.webp | 1920×1080 | P2 |  | Clean | crowbar |
| stillskin-forest-hammer | /games/stillskin-forest/weapons/stillskin-forest-hammer.webp | 1920×1080 | P2 |  | Clean | hammer |
| stillskin-forest-signal-remote | /games/stillskin-forest/weapons/stillskin-forest-signal-remote.webp | 1920×1080 | P2 |  | Clean | signal-remote |
| stillskin-forest-first-aid-kit | /games/stillskin-forest/items/stillskin-forest-first-aid-kit.webp | 1920×1080 | P2 |  | Clean | first-aid-kit |
| stillskin-forest-lantern | /games/stillskin-forest/items/stillskin-forest-lantern.webp | 1920×1080 | P2 |  | Clean | lantern |
| stillskin-forest-food | /games/stillskin-forest/items/stillskin-forest-food.webp | 1920×1080 | P2 |  | Clean | food |
| stillskin-forest-headlamp | /games/stillskin-forest/mechanics/stillskin-forest-headlamp.webp | 1920×1080 | P1 |  | Staged | headlamp |
| stillskin-forest-enemy-lineup | /games/stillskin-forest/enemies/stillskin-forest-enemy-lineup.webp | 1920×1080 | P2 |  | Clean | enemy-comparison |
| stillskin-forest-hospital-interior | /games/stillskin-forest/locations/stillskin-forest-hospital-interior.webp | 1920×1080 | P2 |  | Staged | st-agnes-hospital |
| stillskin-forest-chapel-interior-alt | /games/stillskin-forest/locations/stillskin-forest-chapel-interior-alt.webp | 1920×1080 | P2 |  | Staged | chapel |
| stillskin-forest-walker-detail | /games/stillskin-forest/enemies/stillskin-forest-walker-detail.webp | 1920×1080 | P2 |  | Clean | walker |
| stillskin-forest-brute-detail | /games/stillskin-forest/enemies/stillskin-forest-brute-detail.webp | 1920×1080 | P2 |  | Clean | brute |
| stillskin-forest-hospital-night | /games/stillskin-forest/locations/stillskin-forest-hospital-night.webp | 1920×1080 | P2 |  | Staged | st-agnes-hospital |
| stillskin-forest-energy-bar | /games/stillskin-forest/items/stillskin-forest-energy-bar.webp | 1920×1080 | P2 |  | Clean | food |
| stillskin-forest-canned-beans | /games/stillskin-forest/items/stillskin-forest-canned-beans.webp | 1920×1080 | P2 |  | Clean | food |
| stillskin-forest-batteries | /games/stillskin-forest/items/stillskin-forest-batteries.webp | 1920×1080 | P2 |  | Clean | headlamp |

## Missing website ids (47)

| id | folder | P | spoiler | target |
|---|---|---|---|---|
| stillskin-forest-hero | branding | P0 |  | /games/stillskin-forest |
| stillskin-forest-night-chase | branding | P0 |  | /games/stillskin-forest |
| stillskin-forest-locker-hiding | mechanics | P0 |  | hiding |
| stillskin-forest-cover | branding | P1 |  | /games/stillskin-forest |
| stillskin-forest-gameplay-overview | branding | P1 |  | /games/stillskin-forest |
| stillskin-forest-team-survival | branding | P1 |  | /games/stillskin-forest/wiki/multiplayer/co-op-survival |
| stillskin-forest-watcher | enemies | P1 |  | watcher |
| stillskin-forest-nighttime | locations | P1 |  | day-night-cycle |
| stillskin-forest-morgue | locations | P1 |  | morgue |
| stillskin-forest-asylum-interior | locations | P1 |  | blackthorn-asylum |
| stillskin-forest-dread-encounter-closeup | mechanics | P1 |  | the-dread-encounter |
| stillskin-forest-revive | mechanics | P1 |  | downed-and-revive |
| stillskin-forest-end-run | mechanics | P1 |  | death-ghosts-and-the-finale |
| stillskin-forest-blood-moon | nights | P1 |  | blood-moon |
| stillskin-forest-heavy-fog | nights | P1 |  | heavy-fog |
| stillskin-forest-infected-surge | nights | P1 |  | infected-surge |
| stillskin-forest-silent-night | nights | P1 |  | silent-night |
| stillskin-forest-ritual-circle | quests | P1 | yes | the-rite-of-stillness |
| stillskin-forest-admission-ledger | quests | P1 |  | blackthorn-admission-ledger |
| stillskin-forest-weapon-combat | weapons | P1 |  | weapons-compared |
| stillskin-forest-trailer-poster | branding | P2 |  | /games/stillskin-forest |
| stillskin-forest-zombie-chase | enemies | P2 |  | detection-and-noise |
| stillskin-forest-zombie-investigation | enemies | P2 |  | detection-and-noise |
| stillskin-forest-cabins | locations | P2 |  | campgrounds |
| stillskin-forest-freezer | locations | P2 |  | pine-general-store |
| stillskin-forest-attic | locations | P2 |  | houses-of-stillwater |
| stillskin-forest-rooftops | locations | P2 |  | st-agnes-hospital |
| stillskin-forest-hidden-study | locations | P2 |  | houses-of-stillwater |
| stillskin-forest-storm-drain | locations | P2 |  | storm-drain |
| stillskin-forest-green-lake-dock | locations | P2 |  | green-lake |
| stillskin-forest-green-lake-drain | locations | P2 | yes | green-lake |
| stillskin-forest-sisters-rosary | lore | P2 | yes | sisters-rosary |
| stillskin-forest-miners-lantern | lore | P2 | yes | miners-lantern |
| stillskin-forest-angels-tear | lore | P2 | yes | angels-tear |
| stillskin-forest-dr-vances-ring | lore | P2 | yes | dr-vances-ring |
| stillskin-forest-story-documents | lore | P2 |  | notes-and-tapes |
| stillskin-forest-sprinting | mechanics | P2 |  | stamina-and-sprinting |
| stillskin-forest-stamina | mechanics | P2 |  | stamina-and-sprinting |
| stillskin-forest-health | mechanics | P2 |  | health-and-healing |
| stillskin-forest-inventory | mechanics | P2 |  | inventory-and-hotbar |
| stillskin-forest-hotbar | mechanics | P2 |  | inventory-and-hotbar |
| stillskin-forest-downed | mechanics | P2 |  | downed-and-revive |
| stillskin-forest-ghost-spectator | mechanics | P2 |  | death-ghosts-and-the-finale |
| stillskin-forest-zombie-dance | mechanics | P2 |  | death-ghosts-and-the-finale |
| stillskin-forest-building | mechanics | P2 |  | doors-and-building |
| stillskin-forest-ritual | quests | P2 | yes | the-rite-of-stillness |
| stillskin-forest-weapon-inventory | weapons | P2 |  | inventory-and-hotbar |

## Notes the site should respect

- **Exposure:** night images were captured with a client-side exposure lift (+2.2 EV) so they are legible. The real game is darker. Their manifest descriptions say so.
- **Branding:** the in-game **Bag of Chips** model carries a real third-party brand logo (Lay's). It was left out of the website set (food uses canned beans) and should not be used in marketing.
- **Same master, different crop:** `thumbnail` and `green-lake`, `food` and `canned-beans`, and `headlamp` and `hospital-night` share a source frame.
