import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { enhanceArticleHtml } from "@/lib/article-html";

/**
 * Articles are stored per-locale. French articles are written for Québec, not
 * machine-translated from the English set — several have no English
 * counterpart at all (Loi 96, for instance), so the two directories are
 * deliberately independent rather than mirrored.
 */
export type Locale = "en" | "fr";

const contentDirs: Record<Locale, string> = {
  en: path.join(process.cwd(), "src/content/stillawake-times"),
  fr: path.join(process.cwd(), "src/content/fr/stillawake-times"),
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  /** Last substantive content revision (YYYY-MM-DD). Drives dateModified + sitemap lastmod. */
  updated?: string;
  /**
   * Slug of this article's counterpart in the other locale.
   *
   * Set on BOTH sides of a pair. Its presence is what allows the routes to
   * emit reciprocal hreflang: an article without it declares no alternates at
   * all, which is correct for the Québec-native pieces that have no English
   * twin. A one-sided value would advertise an alternate that does not point
   * back, so the sitemap cross-checks both directions before pairing.
   */
  pair?: string;
  excerpt: string;
  category: string;
  featured: boolean;
  image?: string;
  readTime: string;
  author: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HowToStepItem = {
  name: string;
  text: string;
};

export type Post = PostMeta & {
  /** Social preview image (frontmatter `ogImage`, 1200×630 or 16:9). Defaults to the site preview. */
  ogImage?: string;
  content: string;
  html: string;
  toc: TocItem[];
  /** Questions from the article's own visible FAQ section (frontmatter `faqSchema: true`); drives FAQPage markup. */
  faq: FaqItem[];
  /** The numbered method named by frontmatter `howTo` (an H2's text); drives HowTo markup. */
  howTo: { name: string; steps: HowToStepItem[] } | null;
};

/** Markdown inline syntax to plain text, for structured data. */
function plainText(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * HowTo steps come from the ordered list under the H2 whose text matches the
 * article's `howTo` frontmatter, so the markup mirrors the visible method.
 * Each item reads "**Step name.** Explanation".
 */
export function extractHowTo(content: string, heading: string): HowToStepItem[] {
  const lines = content.split("\n");
  const start = lines.findIndex((line) => /^## +/.test(line) && cleanHeadingText(line.replace(/^## +/, "")) === heading);
  if (start === -1) return [];
  const steps: HowToStepItem[] = [];
  for (const line of lines.slice(start + 1)) {
    if (/^## /.test(line)) break;
    const item = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*(.*)$/);
    if (item) steps.push({ name: plainText(item[1]).replace(/[.:]$/, ""), text: plainText(item[2]) });
  }
  return steps;
}

/**
 * The FAQ is read from the article body, never from separate frontmatter, so
 * the FAQPage markup can only ever contain questions a reader can see. The
 * section is an H2 titled "FAQ" or "Frequently asked questions"; each H3 inside
 * it is a question and the text under it, up to the next heading, its answer.
 */
export function extractFaq(content: string): FaqItem[] {
  const start = content.search(/^## +(?:FAQ|Frequently asked questions)\s*$/im);
  if (start === -1) return [];
  const afterHeading = content.slice(start).replace(/^.*\n/, "");
  const end = afterHeading.search(/^## /m);
  const section = end === -1 ? afterHeading : afterHeading.slice(0, end);

  const items: FaqItem[] = [];
  for (const block of section.split(/^### +/m).slice(1)) {
    const [questionLine, ...rest] = block.split("\n");
    const question = plainText(questionLine);
    const answer = plainText(rest.join(" "));
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getPostFiles(locale: Locale = "en") {
  const dir = contentDirs[locale];
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

function cleanHeadingText(value: string) {
  return value.replace(/\s*\{#[^}]+\}\s*$/g, "").trim();
}

function extractToc(markdown: string): TocItem[] {
  return markdown
    .split("\n")
    .filter((line) => /^#{2,3}\s+/.test(line))
    .map((line) => {
      const level = line.startsWith("###") ? 3 : 2;
      const text = cleanHeadingText(line.replace(/^#{2,3}\s+/, "").trim());
      return { id: slugify(text), text, level };
    });
}

function addHeadingIds(markdown: string) {
  return markdown.replace(/^(#{2,3})\s+(.+)$/gm, (_match, hashes, text) => {
    const clean = cleanHeadingText(String(text).trim());
    return `${hashes} <span id="${slugify(clean)}"></span>${clean}`;
  });
}

function estimateReadTime(markdown: string, locale: Locale = "en") {
  const words = markdown.replace(/[#>*_[\]()`-]/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return locale === "fr" ? `${minutes} min de lecture` : `${minutes} min read`;
}

export function getAllPosts(locale: Locale = "en"): PostMeta[] {
  return getPostFiles(locale)
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(contentDirs[locale], file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "2026-05-24",
        updated: data.updated || undefined,
        pair: typeof data.pair === "string" && data.pair.trim() ? data.pair.trim() : undefined,
        excerpt: data.excerpt || content.slice(0, 180),
        category: data.category || "Strategy",
        featured: Boolean(data.featured),
        image: data.image || "",
        readTime: data.readTime || estimateReadTime(content, locale),
        author: data.author || "StillAwake Media",
      };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export async function getPostBySlug(slug: string, locale: Locale = "en"): Promise<Post | null> {
  const file = path.join(contentDirs[locale], `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content: rawContent } = matter(raw);
  // The template renders post.title as the page's single H1; a leading
  // markdown `# …` would produce a second one, so it is stripped centrally.
  const content = rawContent.replace(/^\s*# .+\n/, "");
  const toc = extractToc(content);
  const processed = await remark().use(html, { sanitize: false }).process(addHeadingIds(content));

  return {
    slug,
    title: data.title || slug,
    date: data.date || "2026-05-24",
    updated: data.updated || undefined,
    pair: typeof data.pair === "string" && data.pair.trim() ? data.pair.trim() : undefined,
    excerpt: data.excerpt || content.slice(0, 180),
    category: data.category || "Strategy",
    featured: Boolean(data.featured),
    image: data.image || "",
    readTime: data.readTime || estimateReadTime(content, locale),
    author: data.author || "StillAwake Media",
    ogImage: typeof data.ogImage === "string" && data.ogImage ? data.ogImage : undefined,
    content,
    html: enhanceArticleHtml(processed.toString()),
    toc,
    // Opt-in per article (`faqSchema: true`), so enabling it never changes
    // the markup of an existing post by surprise.
    faq: data.faqSchema === true ? extractFaq(content) : [],
    howTo:
      typeof data.howTo === "string" && extractHowTo(content, data.howTo).length >= 2
        ? { name: data.howTo, steps: extractHowTo(content, data.howTo) }
        : null,
  };
}

export function getRelatedPosts(currentSlug: string, category?: string, limit = 4, locale: Locale = "en") {
  const posts = getAllPosts(locale).filter((post) => post.slug !== currentSlug);
  const related = posts.filter((post) => post.category === category);
  const fallback = posts.filter((post) => post.category !== category);
  return [...related, ...fallback].slice(0, limit);
}

export function getCategories() {
  return Array.from(new Set(getAllPosts().map((post) => post.category))).sort();
}
