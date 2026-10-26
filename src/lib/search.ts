/**
 * Site search: a small in-memory index scored on the client.
 *
 * The corpus is a few hundred short documents, so a hosted search service
 * would be infrastructure for its own sake. The index is built on the server
 * from the same registries the pages render from, which means it can only
 * ever contain published content.
 */

export type SearchDoc = {
  id: string;
  title: string;
  url: string;
  /** Filter group: "Projects", "Games", "Weapons", "Enemies"… */
  group: string;
  summary: string;
  /** Extra matchable terms: aliases, categories, platforms. */
  keywords: string[];
  /** Long-form text, lower weight. */
  body?: string;
  spoiler?: boolean;
};

export type SearchHit = { doc: SearchDoc; score: number };

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string): string[] {
  return normalize(s).split(" ").filter(Boolean);
}

/** Optimal-string-alignment distance, capped: we only care about 0, 1 or 2. */
export function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev2: number[] = [];
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        v = Math.min(v, prev2[j - 2] + 1);
      }
      cur[j] = v;
      rowMin = Math.min(rowMin, v);
    }
    if (rowMin > max) return max + 1;
    prev2.splice(0, prev2.length, ...prev);
    prev = cur;
  }
  return prev[b.length];
}

/** How well one query term matches a field's words: 1 exact, 0.8 prefix, 0.5 typo. */
function termScore(term: string, words: string[]): number {
  let best = 0;
  for (const w of words) {
    if (w === term) return 1;
    if (w.startsWith(term) && term.length >= 2) best = Math.max(best, 0.8);
    else if (term.length >= 4) {
      const allowed = term.length >= 7 ? 2 : 1;
      if (editDistance(term, w.slice(0, term.length + allowed), allowed) <= allowed) {
        best = Math.max(best, 0.5);
      }
    }
  }
  return best;
}

type Prepared = { doc: SearchDoc; title: string[]; keys: string[]; summary: string[]; body: string[]; titleNorm: string };

export function prepare(docs: SearchDoc[]): Prepared[] {
  return docs.map((doc) => ({
    doc,
    title: tokens(doc.title),
    keys: tokens(doc.keywords.join(" ") + " " + doc.group),
    summary: tokens(doc.summary),
    body: tokens(doc.body ?? ""),
    titleNorm: normalize(doc.title),
  }));
}

export function search(index: Prepared[], query: string, group?: string, limit = 12): SearchHit[] {
  const terms = tokens(query);
  if (!terms.length) return [];
  const q = normalize(query);
  const hits: SearchHit[] = [];

  for (const p of index) {
    if (group && p.doc.group !== group) continue;
    let score = 0;
    let matched = 0;
    for (const t of terms) {
      const s = Math.max(
        termScore(t, p.title) * 10,
        termScore(t, p.keys) * 7,
        termScore(t, p.summary) * 3,
        termScore(t, p.body) * 1,
      );
      if (s > 0) matched++;
      score += s;
    }
    // Every term has to land somewhere, or the hit is noise.
    if (matched < terms.length) continue;
    if (p.titleNorm === q) score += 25;
    else if (p.titleNorm.startsWith(q)) score += 12;
    else if (p.titleNorm.includes(q)) score += 6;
    hits.push({ doc: p.doc, score });
  }

  return hits.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title)).slice(0, limit);
}
