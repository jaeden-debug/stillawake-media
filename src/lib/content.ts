import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "src/content/stillawake-times");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
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

function getPostFiles() {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"));
}

function extractToc(markdown: string): TocItem[] {
  return markdown
    .split("\n")
    .filter((line) => /^#{2,3}\s+/.test(line))
    .map((line) => {
      const level = line.startsWith("###") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s+/, "").trim();
      return { id: slugify(text), text, level };
    });
}

function addHeadingIds(markdown: string) {
  return markdown.replace(/^(#{2,3})\s+(.+)$/gm, (_match, hashes, text) => {
    const clean = String(text).trim();
    return `${hashes} <span id="${slugify(clean)}"></span>${clean}`;
  });
}

function estimateReadTime(markdown: string) {
  const words = markdown.replace(/[#>*_[\]()`-]/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function getAllPosts(): PostMeta[] {
  return getPostFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "2026-05-24",
        excerpt: data.excerpt || content.slice(0, 180),
        category: data.category || "Strategy",
        featured: Boolean(data.featured),
        image: data.image || "",
        readTime: data.readTime || estimateReadTime(content),
        author: data.author || "StillAwake Media",
      };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const toc = extractToc(content);
  const processed = await remark().use(html, { sanitize: false }).process(addHeadingIds(content));

  return {
    slug,
    title: data.title || slug,
    date: data.date || "2026-05-24",
    excerpt: data.excerpt || content.slice(0, 180),
    category: data.category || "Strategy",
    featured: Boolean(data.featured),
    image: data.image || "",
    readTime: data.readTime || estimateReadTime(content),
    author: data.author || "StillAwake Media",
    content,
    html: processed.toString(),
    toc,
  };
}

export function getRelatedPosts(currentSlug: string, category?: string, limit = 4) {
  const posts = getAllPosts().filter((post) => post.slug !== currentSlug);
  const related = posts.filter((post) => post.category === category);
  const fallback = posts.filter((post) => post.category !== category);
  return [...related, ...fallback].slice(0, limit);
}

export function getCategories() {
  return Array.from(new Set(getAllPosts().map((post) => post.category))).sort();
}
