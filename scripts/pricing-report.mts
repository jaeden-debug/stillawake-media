/**
 * Prints the calibration table for review.
 *
 *   npx tsx scripts/pricing-report.mts
 *   npx tsx scripts/pricing-report.mts <scenario-id>   # full line breakdown
 *
 * The whole-table view is for eyeballing the distribution: if a row looks
 * commercially absurd, the model is wrong, not the row.
 */

import { SCENARIOS } from "../src/lib/pricing/calibration";
import { estimate } from "../src/lib/pricing/engine";
import { labelForKey } from "../src/lib/pricing/labels";

const money = (n: number) => `$${n.toLocaleString("en-CA")}`;
const pad = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s.padEnd(n));

const only = process.argv[2];

if (only) {
  const s = SCENARIOS.find((x) => x.id === only);
  if (!s) {
    console.error(`No scenario "${only}". Available:\n  ${SCENARIOS.map((x) => x.id).join("\n  ")}`);
    process.exit(1);
  }
  const e = estimate(s.input);
  console.log(`\n${s.name}\n${"─".repeat(78)}`);
  console.log(`probes: ${s.probes}\n`);
  for (const l of e.lines) {
    const tier = l.days ? ` [${l.days.expected}d ${l.discipline ?? ""}]` : "";
    const note = l.note ? `  ← ${l.note}` : "";
    console.log(
      `  ${pad(labelForKey(l.key, "en") + tier, 42)} ${pad(money(Math.round(l.band.low)), 10)} ${pad(
        money(Math.round(l.band.expected)),
        10,
      )} ${pad(money(Math.round(l.band.high)), 10)}${note}`,
    );
  }
  console.log(`  ${"─".repeat(74)}`);
  console.log(
    `  ${pad("TOTAL", 42)} ${pad(money(e.low), 10)} ${pad(money(e.expected), 10)} ${pad(money(e.high), 10)}`,
  );
  console.log(`\n  drivers:   ${e.drivers.map((d) => labelForKey(d, "en")).join(", ")}`);
  console.log(`  recurring: ${e.recurring.map((r) => `${labelForKey(r.id, "en")} ${r.monthly ? `$${r.monthly}/mo` : "(quoted)"}`).join(", ") || "none"}`);
  if (e.caveats.length) console.log(`  caveats:   ${e.caveats.join(", ")}`);
  if (e.minimumApplied) console.log(`  minimum applied`);
  console.log();
  process.exit(0);
}

console.log(
  `\n${pad("SCENARIO", 50)} ${pad("LOW", 9)} ${pad("EXPECTED", 9)} ${pad("HIGH", 9)} ${pad("DAYS", 7)} ${pad("TIER", 8)} SPREAD`,
);
console.log("─".repeat(112));

for (const s of SCENARIOS) {
  const e = estimate(s.input);
  const spread = (e.high / e.low).toFixed(2) + "×";
  const tier = e.needsDiscovery ? "DISCOVER" : e.tier;
  console.log(
    `${pad(s.name, 50)} ${pad(money(e.low), 9)} ${pad(money(e.expected), 9)} ${pad(money(e.high), 9)} ${pad(String(e.days.expected), 7)} ${pad(tier, 8)} ${spread}`,
  );
}
console.log();
