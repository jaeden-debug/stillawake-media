/**
 * IndexNow: tells Bing (and through it Copilot and ChatGPT search), Yandex,
 * Seznam and Naver that a URL changed, instead of waiting to be recrawled.
 * Google does not take part; it reads the sitemap, which already carries
 * real lastmod dates.
 *
 * The key is public by design: IndexNow verifies ownership by fetching
 * /<key>.txt from this host, which must contain the key. It is not a secret.
 */
import { siteUrl } from "@/lib/data";

export const INDEXNOW_KEY = "cd3d70095fcf36ece162530aca2a273c";
export const INDEXNOW_KEY_LOCATION = `${siteUrl}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_PER_REQUEST = 10_000;

export type IndexNowResult = { submitted: number; status: number[] };

/** Submits URLs on this host. Non-2xx statuses are returned, never thrown. */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const host = new URL(siteUrl).host;
  const own = [...new Set(urls)].filter((u) => new URL(u).host === host);
  const status: number[] = [];
  for (let i = 0; i < own.length; i += MAX_PER_REQUEST) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: own.slice(i, i + MAX_PER_REQUEST),
      }),
    });
    status.push(res.status);
  }
  return { submitted: own.length, status };
}

/** Sitemap entries changed within the window, newest first. */
export function recentlyChanged(
  entries: { url: string; lastModified?: string | Date }[],
  windowDays: number,
  now = Date.now(),
): string[] {
  const since = now - windowDays * 86_400_000;
  return entries
    .filter((e) => e.lastModified && new Date(e.lastModified).getTime() >= since)
    .sort((a, b) => new Date(b.lastModified!).getTime() - new Date(a.lastModified!).getTime())
    .map((e) => e.url);
}
