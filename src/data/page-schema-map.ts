import type { PageSchemaInput } from "@/lib/page-schema";

/**
 * Every static page, and what it is.
 *
 * Kept in one file rather than scattered inline so the site's entity
 * coverage can be reviewed in a single read, and so a missing page is
 * obvious. Names are the page's own metadata title with the brand suffix
 * removed; descriptions are copied from each page's existing metadata.
 */
export const PAGE_SCHEMA: Record<string, Omit<PageSchemaInput, "url">> = {
  "/about": { kind: "about", name: "About StillAwake Media", description: "StillAwake Media is a Canada-based digital infrastructure studio building premium websites, SEO systems, branding, AI automation, Shopify experiences, and custom software.", locale: "en" },
  "/ai-automation": { kind: "service", name: "AI Workflow Automation", description: "StillAwake Media builds custom AI automation systems for lead handling, content workflows, research, reporting, admin tasks, SEO pipelines, and scalable business operations.", locale: "en", serviceType: "AI workflow automation" },
  "/branding": { kind: "service", name: "Brand Positioning", description: "StillAwake Media builds premium brand identity systems, positioning, logo direction, typography, color strategy, messaging, and digital assets that help modern businesses stand out online.", locale: "en", serviceType: "Brand identity and positioning" },
  "/contact": { kind: "contact", name: "Contact StillAwake Media", description: "Contact StillAwake Media to start a premium website, SEO system, brand identity, AI automation, Shopify build, or custom software project.", locale: "en" },
  "/framer-development": { kind: "service", name: "Framer Development Services", description: "StillAwake Media builds premium Framer websites that feel high-end, load fast, stay easy to edit, and support SEO, conversion, and long-term brand growth.", locale: "en", serviceType: "Framer website development" },
  "/local-seo": { kind: "service", name: "Local SEO Services", description: "StillAwake Media builds local SEO systems that improve Google Maps visibility, search rankings, trust signals, and lead generation for modern businesses.", locale: "en", serviceType: "Local SEO" },
  "/": { kind: "home", name: "StillAwake Media", description: "Montréal studio building premium websites, Shopify stores, SEO systems, AI-search (AEO) visibility, and custom software — with transparent pricing and measurable results.", locale: "en" },
  "/portfolio": { kind: "collection", name: "Website Portfolio", description: "Explore StillAwake Media website projects through live previews, SEO systems, brand builds, ecommerce experiences, and digital infrastructure examples.", locale: "en" },
  "/services": { kind: "collection", name: "StillAwake Media Services", description: "Explore StillAwake Media services across web design, SEO, software development, branding, AI automation, Shopify, Framer, and digital strategy.", locale: "en" },
  "/shopify-development": { kind: "service", name: "Shopify Development Services", description: "StillAwake Media helps ecommerce brands improve Shopify product pages, collections, SEO structure, conversion flow, trust signals, and visual presentation.", locale: "en", serviceType: "Shopify development" },
  "/software-development": { kind: "service", name: "Custom Software Development", description: "StillAwake Media builds custom software, dashboards, portals, web applications, AI workflows, and scalable digital systems for modern businesses.", locale: "en", serviceType: "Custom software development" },
  "/stillawake-times": { kind: "collection", name: "StillAwake Times", description: "Explore StillAwake Times for practical insights on web design, SEO, AI automation, branding, software, Shopify, Framer, and digital infrastructure.", locale: "en" },
  "/fr/a-propos": { kind: "about", name: "À propos", description: "StillAwake Media est un studio montréalais qui bâtit des sites premium, des systèmes SEO, des marques, de l'automatisation IA, des expériences Shopify et des logiciels sur mesure.", locale: "fr" },
  "/fr/articles": { kind: "collection", name: "Articles", description: "Guides pratiques sur le web, le référencement, l'IA et le commerce en ligne — écrits pour le marché québécois, pas traduits de l'anglais.", locale: "fr" },
  "/fr/contact": { kind: "contact", name: "Contact", description: "Contactez StillAwake Media pour démarrer un site web, un système SEO, une boutique Shopify, une image de marque ou un logiciel sur mesure. Réponse par courriel — sans appel obligatoire.", locale: "fr" },
  "/fr/etudes-de-cas": { kind: "collection", name: "Études de cas", description: "Décortiqués de projets StillAwake Media — le mandat, l'architecture des pages, la structure SEO et les décisions de design derrière chaque build.", locale: "fr" },
  "/fr/realisations": { kind: "collection", name: "Réalisations", description: "Explorez les réalisations de StillAwake Media : aperçus en direct de sites web, systèmes SEO, marques, expériences ecommerce et infrastructure numérique.", locale: "fr" },
  "/privacy": { kind: "contact", name: "Privacy Policy", description: "What StillAwake Media collects, which analytics tools run, which cookies are set, how consent works, and how to contact us about your data.", locale: "en" },
  "/fr/confidentialite": { kind: "contact", name: "Politique de confidentialité", description: "Ce que StillAwake Media recueille, quels outils de mesure fonctionnent, quels témoins sont déposés, comment fonctionne le consentement et comment nous joindre.", locale: "fr" },
  "/tools/llms-txt-generator": { kind: "service", name: "Free llms.txt Generator + AI Readiness Check", description: "Generate an llms.txt file for your website and see what an answer engine can — and cannot — tell about your business. Free, no signup.", locale: "en", serviceType: "Answer engine optimization" },
};
