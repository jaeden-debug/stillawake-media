import { describe, expect, it } from "vitest";
import knowledge from "@/data/games/stillskin-forest/knowledge.json";
import { getBundle, getEntry, isPublished } from "@/lib/games";

/**
 * The documentation gate for Stillskin Forest. `knowledge.json` is exported from the game's own
 * configuration (scripts/sync-stillskin-knowledge.mjs). These checks fail when the wiki says
 * something the game no longer does, or when a verified feature has no published page.
 */

const bundle = getBundle("stillskin-forest")!;
const K = knowledge.values;
const fact = (slug: string, label: string) => getEntry(bundle, slug)?.facts?.find(([k]) => k === label)?.[1];
const row = (slug: string, first: string) => {
  for (const s of getEntry(bundle, slug)?.sections ?? []) {
    for (const b of s.blocks) {
      if (b.type === "table") {
        const r = b.rows.find((cells) => cells[0].includes(first));
        if (r) return r;
      }
    }
  }
  return undefined;
};

describe("Stillskin Forest knowledge source", () => {
  it("documents every verified feature on a published page dated no earlier than the export", () => {
    for (const f of knowledge.features) {
      if (f.status !== "verified_live" && f.status !== "partially_verified") continue;
      for (const slug of f.wiki) {
        const entry = getEntry(bundle, slug);
        expect(entry, `${f.id}: wiki page ${slug} is missing`).toBeDefined();
        expect(isPublished(entry!), `${f.id}: ${slug} is not published`).toBe(true);
        expect(entry!.lastVerified >= knowledge.lastVerified, `${f.id}: ${slug} last verified ${entry!.lastVerified}, before ${knowledge.lastVerified}`).toBe(true);
      }
    }
  });

  it("states the day and night lengths the game uses", () => {
    expect(fact("day-night-cycle", "Day phase")).toBe(`${K.cycle.daySeconds / 60} min`);
    expect(fact("day-night-cycle", "Night")).toBe(`${K.cycle.nightSeconds / 60} min`);
    expect(fact("day-night-cycle", "Sunrise")).toBe(`${K.cycle.dawnSeconds} s`);
    expect(fact("day-night-cycle", "Dusk")).toBe(`${K.cycle.duskSeconds} s`);
  });

  it("states the headlamp battery the game uses", () => {
    expect(fact("headlamp", "Battery")).toBe(
      `${K.headlamp.batterySeconds / 60} minutes of light (${K.headlamp.extendedBatterySeconds / 60} with Extended Battery)`,
    );
    expect(fact("headlamp", "Spare batteries")).toBe(`Up to ${K.headlamp.reserveCap}, no bag slot`);
  });

  it("matches the soldier and Mini AK numbers in the comparison tables", () => {
    const s = row("enemy-comparison", "Soldier")!;
    expect(s[1]).toBe(String(K.zombies.Soldier.health));
    expect(s[3]).toBe(String(K.zombies.Soldier.damage));
    const ak = row("weapons-compared", "Mini AK")!;
    const item = K.items["Mini AK"];
    expect(ak[1]).toBe(String(item.Damage));
    expect(ak[3]).toBe(String(item.MagSize));
    expect(ak[4]).toBe(`${item.ReloadTime} s`);
  });

  it("says planks are unlimited only while the game has no cap", () => {
    expect(K.building.maxPerPlayer).toBe("unlimited");
    expect(row("doors-and-building", "Maximum")?.[1]).toBe("No limit");
  });
});
