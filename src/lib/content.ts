import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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

export type Post = PostMeta & {
  content: string;
  html: string;
  toc: TocItem[];
};

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
    excerpt: data.excerpt || content.slice(0, 180),
    category: data.category || "Strategy",
    featured: Boolean(data.featured),
    image: data.image || "",
    readTime: data.readTime || estimateReadTime(content, locale),
    author: data.author || "StillAwake Media",
    content,
    html: processed.toString(),
    toc,
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
