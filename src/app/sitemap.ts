import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { siteUrl } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about", "portfolio", "services", "stillawake-times", "contact", "web-design", "software-development", "branding", "local-seo", "ai-automation", "framer-development", "shopify-development", "work", "web-design-montreal", "fr/agence-web-montreal", "seo-montreal"].map((page) => ({
    url: page ? `${siteUrl}/${page}` : `${siteUrl}/`,
    lastModified: new Date(),
  }));

  const articles = getAllPosts().map((post) => ({
    url: `${siteUrl}/stillawake-times/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...pages, ...articles];
}
