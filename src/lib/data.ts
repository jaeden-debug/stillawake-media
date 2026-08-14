export const siteUrl = "https://stillawakemedia.com";

export const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Portfolio", "/portfolio"],
  ["Services", "/services"],
  ["Products", "/products"],
  ["Montreal", "/web-design-montreal"],
  ["StillAwake Times", "/stillawake-times"],
  ["Contact", "/contact"],
  ["FR", "/fr"],
];

export const navFr = [
  ["Accueil", "/fr"],
  ["Création Web", "/fr/agence-web-montreal"],
  ["SEO", "/fr/agence-seo-montreal"],
  ["Produits", "/fr/produits"],
  ["Articles", "/fr/articles"],
  ["Tarifs", "/fr/tarifs"],
  ["Contact", "/fr/contact"],
  ["English", "/"],
];

export const serviceNav = [
  ["Web Design", "/web-design-montreal"],
  ["SEO Montréal", "/seo-montreal"],
  ["Website Maintenance & Support", "/website-maintenance"],
  ["AI Search Optimization (AEO)", "/answer-engine-optimization"],
  ["Shopify Development", "/shopify-development"],
  ["Software Development", "/software-development"],
  ["Branding", "/branding"],
  ["Local SEO", "/local-seo"],
  ["AI Automation", "/ai-automation"],
  ["Framer Development", "/framer-development"],
  ["Website Redesign", "/website-redesign"],
  ["Pricing", "/pricing"],
];

/**
 * Rendered on the English /services page, so it must stay English-only.
 * It previously mixed in three French URLs, which sent English visitors into
 * the French site from an English page. Crossing languages is the header's
 * FR/English switcher's job, not a content list's.
 */
export const montrealNav = [
  ["Web Design Montreal", "/web-design-montreal"],
  ["SEO Montreal", "/seo-montreal"],
  ["Local SEO", "/local-seo"],
  ["Website Maintenance", "/website-maintenance"],
  ["Software Development", "/software-development"],
  ["Website Redesign", "/website-redesign"],
  ["Shopify Development", "/shopify-development"],
];

export const services = [
  "Web development",
  "SEO optimization",
  "Branding & identity",
  "App & software development",
  "AI automation",
];

export const portfolio = [
  ["Lisa Travel Design", "https://lisatraveldesign.com", "Premium travel website and conversion-focused brand system."],
  ["Navtrl", "https://navtrl.com", "Modern digital product with clean brand presentation."],
  ["Blackwater Aquatics", "https://blackwateraquatics.ca", "Ecommerce, SEO, live product education, and Canadian search growth."],
  ["BankDeMark", "https://bankdemark.com", "Finance content platform with calculator-led SEO architecture."],
  ["Zylx AI", "https://zylx.ai", "AI software brand for workflow systems, agents, and automation."],
  ["Northground Bushcraft", "https://northgroundbushcraft.com", "Outdoor brand presence with rugged editorial direction."],
];

export const posts = [
  {
    slug: "custom-coded-websites-outperform-templates",
    title: "Why Custom-Coded Websites Outperform Templates",
    category: "Web Development",
    date: "2026-05-24",
    readTime: "7 min",
    excerpt: "Templates can launch fast, but custom-coded websites win when performance, SEO, brand control, and scalability matter.",
    metaTitle: "Why Custom-Coded Websites Outperform Templates",
    metaDescription: "Learn why custom-coded websites outperform templates for speed, SEO, conversion, branding, scalability, and long-term growth.",
    toc: ["Performance", "SEO control", "Brand experience", "Scalability"],
    body: [
      "A custom-coded website gives your business control over performance, structure, crawlability, UX, content systems, and conversion flow.",
      "SEO improves when the site architecture is planned around search intent, internal linking, metadata, schema, clean HTML, and fast rendering.",
      "Premium brands need websites that feel designed, not assembled. Custom code lets motion, spacing, layout, and copy work together.",
      "The best site is not just a homepage. It is a digital operating layer that can grow into landing pages, articles, tools, dashboards, and software systems.",
    ],
  },
];
