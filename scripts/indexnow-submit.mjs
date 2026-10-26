/**
 * One-off IndexNow submission of every URL in the live sitemap.
 * Use after a large deploy; the daily cron handles day-to-day changes.
 *
 * Run: node scripts/indexnow-submit.mjs [--dry-run]
 */
const SITE = "https://stillawakemedia.com";
const KEY = "cd3d70095fcf36ece162530aca2a273c";
const dryRun = process.argv.includes("--dry-run");

const keyFile = await fetch(`${SITE}/${KEY}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
  console.error(`Key file ${SITE}/${KEY}.txt is not live yet (HTTP ${keyFile.status}). Deploy first.`);
  process.exit(1);
}

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))];
console.log(`${urls.length} URLs in the live sitemap.`);
if (dryRun) {
  console.log(urls.join("\n"));
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
// 200 = accepted, 202 = accepted pending key validation. Anything else is a problem.
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
