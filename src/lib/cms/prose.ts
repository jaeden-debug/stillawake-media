import sanitizeHtml from "sanitize-html";
import type { CmsLocale, CmsSection } from "./types";
import type { TocItem } from "@/lib/content";

/**
 * Rich text arrives server-sanitized at write time; it is re-sanitized here
 * as defence in depth before it ever reaches dangerouslySetInnerHTML.
 */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "h2", "h3", "h4", "blockquote", "ul", "ol", "li",
    "strong", "em", "u", "s", "a", "code", "pre", "br", "hr",
    "table", "thead", "tbody", "tr", "th", "td",
    "figure", "figcaption", "img", "span", "mark", "sup", "sub",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "width", "height", "loading"],
    span: ["id"],
  },
  allowedSchemes: ["https", "http", "mailto"],
};

export function sanitizeRichtext(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}

/** Mirrors the slugify used by the markdown pipeline so anchors look the same. */
export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Ensures every h2/h3 in sanitized richtext carries an anchor. The markdown
 * pipeline injects `<span id="...">` inside headings; CMS richtext gets the
 * same treatment so the sticky TOC works identically. Deterministic — running
 * it twice yields the same ids, so the TOC extractor and the renderer agree.
 */
export function ensureHeadingIds(sanitizedHtml: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const html = sanitizedHtml.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      const text = stripTags(inner);
      if (!text) return match;
      const existing = /<span[^>]*\bid="([^"]+)"/i.exec(inner);
      const id = existing ? existing[1] : slugifyHeading(text);
      toc.push({ id, text, level: tag.toLowerCase() === "h3" ? 3 : 2 });
      if (existing) return match;
      return `<${tag}${attrs}><span id="${id}"></span>${inner}</${tag}>`;
    },
  );
  return { html, toc };
}

/** TOC across all richtext sections — same ids the renderer will emit. */
export function extractToc(sections: CmsSection[]): TocItem[] {
  const toc: TocItem[] = [];
  for (const section of sections) {
    if (section.type !== "richtext") continue;
    toc.push(...ensureHeadingIds(sanitizeRichtext(section.html)).toc);
  }
  return toc;
}

/** Plain-text word source for the read-time estimate. */
function sectionText(section: CmsSection): string {
  switch (section.type) {
    case "richtext":
      return stripTags(section.html);
    case "direct_answer":
      return [section.question, section.answer].filter(Boolean).join(" ");
    case "key_takeaways":
      return [section.heading, ...section.items].filter(Boolean).join(" ");
    case "stats":
      return (section.items ?? []).map((i) => `${i.value} ${i.label} ${i.note ?? ""}`).join(" ");
    case "feature_list":
    case "steps":
      return (section.items ?? []).map((i) => `${i.title} ${i.body ?? ""}`).join(" ");
    case "faq":
      return (section.items ?? []).map((i) => `${i.q} ${i.a}`).join(" ");
    case "comparison_table":
      return [section.caption, ...(section.columns ?? []), ...(section.rows ?? []).flat()]
        .filter(Boolean)
        .join(" ");
    case "quote":
      return [section.text, section.cite, section.role].filter(Boolean).join(" ");
    case "cta":
      return [section.heading, section.body, section.label].filter(Boolean).join(" ");
    case "case_study_proof":
      return [section.metric, section.label, section.evidence].filter(Boolean).join(" ");
    case "code":
      return section.code;
    default:
      return "";
  }
}

/** ~220 wpm, matching the markdown pipeline's estimate + locale phrasing. */
export function estimateReadTime(sections: CmsSection[], locale: CmsLocale): string {
  const words = sections
    .map(sectionText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return locale === "fr" ? `${minutes} min de lecture` : `${minutes} min read`;
}
