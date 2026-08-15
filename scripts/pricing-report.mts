/**
 * Prints the calibration table.
 *   npx tsx scripts/pricing-report.mts            table
 *   npx tsx scripts/pricing-report.mts <id>       full derivation
 */
import { SCENARIOS } from "../src/lib/pricing/calibration";
import { estimate } from "../src/lib/pricing/engine";
import { mapAnswers } from "../src/lib/pricing/public-flow";
import { labelForKey } from "../src/lib/pricing/labels";
import { DISCOVERY, PLANNING_DAY_RATE } from "../src/lib/pricing/model";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-CA")}`;
const pad = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s.padEnd(n));
const only = process.argv[2];

if (only) {
  const s = SCENARIOS.find((x) => x.id === only);
  if (!s) { console.error(`No scenario "${only}".`); process.exit(1); }
  const input = mapAnswers(s.answers);
  const e = estimate(input);
  console.log(`\n${s.name} — ${s.asked}\n${"─".repeat(80)}`);
  for (const l of e.lines) {
    const k = l.addKind ? ` (${l.addKind})` : "";
    const dd = l.days?.expected ? ` ${l.days.expected}d` : "";
    console.log(`  ${pad(labelForKey(l.key, "en") + k + dd, 46)} ${pad(money(l.band.low), 9)} ${pad(money(l.band.high), 9)}`);
  }
  console.log(`  ${"─".repeat(76)}`);
  console.log(`  ${pad("PUBLIC", 46)} ${pad(money(e.low), 9)} ${pad(money(e.high), 9)}`);
  console.log(`\n  internal: ${e.days.expected}d · implied ${money(e.internalRate)}/day vs ${money(PLANNING_DAY_RATE)} planning`);
  if (e.needsDiscovery) console.log(`  discovery: ${e.discoveryReason}`);
  console.log();
  process.exit(0);
}

console.log(`\n${pad("PROJECT", 26)}${pad("SCOPE", 30)}${pad("EFFORT", 8)}${pad("PUBLIC QUOTE", 20)}ROUTE`);
console.log("─".repeat(104));
for (const s of SCENARIOS) {
  const input = mapAnswers(s.answers);
  const e = estimate(input);
  const scope = [labelForKey(input.base, "en"), ...(input.additions ?? []).map((a) => labelForKey(a.id, "en"))]
    .join(", ");
  const quote = e.needsDiscovery ? `from ${money(e.low)}` : `${money(e.low)}–${money(e.high)}`;
  const route = e.needsDiscovery ? "DISCOVERY" : e.tier.toUpperCase();
  console.log(`${pad(s.name, 26)}${pad(scope, 30)}${pad(e.days.expected + "d", 8)}${pad(quote, 20)}${route}`);
}
console.log(`\nDiscovery from ${money(DISCOVERY.from)}, credited against the build.`);
console.log(`Implied day rates:`);
for (const s of SCENARIOS) {
  const e = estimate(mapAnswers(s.answers));
  console.log(`  ${pad(s.name, 28)} ${money(e.internalRate)}/day`);
}
console.log();
