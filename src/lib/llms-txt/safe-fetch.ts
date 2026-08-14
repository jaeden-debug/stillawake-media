import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/**
 * Server-Side Request Forgery guard.
 *
 * This endpoint fetches a URL that a stranger typed into a box on a public
 * page, from inside our infrastructure. Without this file that is a proxy
 * into anything our server can reach — cloud metadata endpoints, internal
 * services, localhost. It is the single most dangerous part of the tool and
 * the reason the checks run before every request rather than once per host.
 *
 * The specific trap this defends against is DNS rebinding: validating the
 * hostname, then letting fetch() resolve it again a moment later to an
 * address the check never saw. So we resolve first, validate the resolved
 * addresses, and only then connect — and we re-run the whole check on every
 * hop of a redirect chain, because a public URL is free to redirect to
 * 169.254.169.254.
 */

const MAX_BYTES = 2_000_000;
const TIMEOUT_MS = 8_000;
const MAX_REDIRECTS = 3;

/** Ranges that must never be reachable from a user-supplied URL. */
function isBlockedIPv4(ip: string): boolean {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  const [a, b] = p;
  return (
    a === 0 || // this network
    a === 10 || // private
    a === 127 || // loopback
    (a === 100 && b >= 64 && b <= 127) || // carrier-grade NAT
    (a === 169 && b === 254) || // link-local — cloud metadata lives here
    (a === 172 && b >= 16 && b <= 31) || // private
    (a === 192 && b === 168) || // private
    (a === 192 && b === 0) || // IETF protocol assignments
    (a === 198 && (b === 18 || b === 19)) || // benchmarking
    a >= 224 // multicast + reserved
  );
}

/**
 * Expands an IPv6 address to its eight 16-bit groups.
 * Returns null if it does not parse, which callers treat as "block it".
 */
function expandIPv6(v: string): number[] | null {
  const [head, tail] = v.split("::");
  if (tail !== undefined && v.split("::").length > 2) return null;

  const parse = (s: string) => (s ? s.split(":").filter(Boolean) : []);
  const left = parse(head);
  const right = tail !== undefined ? parse(tail) : [];

  // A trailing dotted quad (::ffff:127.0.0.1) occupies the last two groups.
  const dotted = (right.length ? right : left).at(-1);
  let quadGroups: number[] = [];
  let leftG = left;
  let rightG = right;
  if (dotted && dotted.includes(".")) {
    const parts = dotted.split(".").map(Number);
    if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
      return null;
    }
    quadGroups = [(parts[0] << 8) | parts[1], (parts[2] << 8) | parts[3]];
    if (right.length) rightG = right.slice(0, -1);
    else leftG = left.slice(0, -1);
  }

  const toNum = (g: string) => {
    if (!/^[0-9a-f]{1,4}$/.test(g)) return NaN;
    return parseInt(g, 16);
  };
  const l = leftG.map(toNum);
  const r = rightG.map(toNum);
  if ([...l, ...r].some(Number.isNaN)) return null;

  const known = l.length + r.length + quadGroups.length;
  if (tail === undefined) return known === 8 ? [...l, ...quadGroups] : null;
  if (known > 8) return null;
  return [...l, ...new Array(8 - known).fill(0), ...r, ...quadGroups];
}

function isBlockedIPv6(ip: string): boolean {
  const v = ip.toLowerCase().replace(/^\[|\]$/g, "");
  const g = expandIPv6(v);
  if (!g) return true; // unparseable — refuse rather than guess

  const allZeroExceptLast = g.slice(0, 7).every((x) => x === 0);
  if (allZeroExceptLast && (g[7] === 0 || g[7] === 1)) return true; // :: and ::1

  const first = g[0];
  if ((first & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
  if ((first & 0xfe00) === 0xfc00) return true; // fc00::/7 unique local
  if (first === 0xff00 || (first & 0xff00) === 0xff00) return true; // ff00::/8 multicast

  /* ::ffff:0:0/96 — IPv4 wearing an IPv6 coat. The URL parser rewrites the
     dotted form to hex (::ffff:127.0.0.1 becomes ::ffff:7f00:1), so matching
     the dotted text alone let loopback through. Reconstruct the v4 address
     from the low 32 bits and apply the v4 rules to it. */
  const isV4Mapped = g.slice(0, 5).every((x) => x === 0) && g[5] === 0xffff;
  if (isV4Mapped) {
    const v4 = [g[6] >> 8, g[6] & 0xff, g[7] >> 8, g[7] & 0xff].join(".");
    return isBlockedIPv4(v4);
  }
  return false;
}

function isBlockedAddress(ip: string): boolean {
  const family = isIP(ip);
  if (family === 4) return isBlockedIPv4(ip);
  if (family === 6) return isBlockedIPv6(ip);
  return true; // not an IP we understand — refuse
}

export class UnsafeUrlError extends Error {}

/**
 * Validates a URL and resolves its host, rejecting anything private.
 * Returns the parsed URL when safe.
 */
export async function assertSafeUrl(raw: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new UnsafeUrlError("That does not look like a valid URL.");
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new UnsafeUrlError("Only http and https URLs can be checked.");
  }
  // Credentials in a URL are never legitimate here and can confuse parsers.
  if (url.username || url.password) {
    throw new UnsafeUrlError("URLs with embedded credentials are not accepted.");
  }

  const host = url.hostname.replace(/^\[|\]$/g, "");

  // A literal IP skips DNS entirely, so check it directly.
  if (isIP(host)) {
    if (isBlockedAddress(host)) throw new UnsafeUrlError("That address is not publicly reachable.");
    return url;
  }

  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".internal")) {
    throw new UnsafeUrlError("That address is not publicly reachable.");
  }

  let addresses: { address: string }[];
  try {
    addresses = await lookup(host, { all: true });
  } catch {
    throw new UnsafeUrlError("That domain could not be resolved.");
  }
  if (addresses.length === 0) throw new UnsafeUrlError("That domain could not be resolved.");
  // Every address must be safe. One private answer among public ones is
  // enough for an attacker, since we do not control which one is used.
  for (const { address } of addresses) {
    if (isBlockedAddress(address)) {
      throw new UnsafeUrlError("That address resolves to a private network.");
    }
  }
  return url;
}

export type FetchedPage = { url: string; status: number; body: string; contentType: string };

/**
 * Fetches a URL with the guard applied to every redirect hop, a hard byte
 * cap, and a timeout. Redirects are followed manually — `redirect: "follow"`
 * would let the runtime chase a hop we never validated.
 */
export async function safeFetch(raw: string): Promise<FetchedPage | null> {
  let current = raw;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const url = await assertSafeUrl(current);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal: controller.signal,
        headers: {
          // Identifies the crawler honestly and gives site owners something
          // to block if they would rather not be checked.
          "user-agent":
            "StillAwakeLLMsTxtBot/1.0 (+https://stillawakemedia.com/tools/llms-txt-generator)",
          accept: "text/html,text/plain,application/xml;q=0.9,*/*;q=0.8",
        },
      });
    } catch {
      clearTimeout(timer);
      return null;
    }
    clearTimeout(timer);

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) return null;
      current = new URL(location, url).toString();
      continue;
    }

    const contentType = res.headers.get("content-type") ?? "";
    // Read with a cap rather than trusting content-length, which lies.
    const reader = res.body?.getReader();
    if (!reader) return { url: url.toString(), status: res.status, body: "", contentType };

    const chunks: Uint8Array[] = [];
    let total = 0;
    while (total < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      total += value.length;
    }
    await reader.cancel().catch(() => {});

    const merged = new Uint8Array(total);
    let offset = 0;
    for (const c of chunks) {
      const room = Math.min(c.length, total - offset);
      merged.set(c.subarray(0, room), offset);
      offset += room;
    }

    return {
      url: url.toString(),
      status: res.status,
      body: new TextDecoder().decode(merged),
      contentType,
    };
  }
  return null;
}
