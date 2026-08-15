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
  "/tools": { kind: "collection", name: "Free Technical Tools", description: "Free tools and implementation guides from StillAwake Media for checking how search crawlers and AI assistants read your website. No signup, no email.", locale: "en" },
  "/tools/llms-txt-generator": { kind: "service", name: "Free llms.txt Generator + AI Readiness Check", description: "Generate an llms.txt file for your website and see what an answer engine can — and cannot — tell about your business. Free, no signup.", locale: "en", serviceType: "Answer engine optimization", crumbs: [{ name: "Tools", path: "/tools" }] },
  "/fr/outils": { kind: "collection", name: "Outils techniques gratuits", description: "Outils gratuits et guides d'implémentation de StillAwake Media pour vérifier comment les robots de recherche et les assistants IA lisent votre site. Sans inscription.", locale: "fr" },
  "/fr/outils/generateur-llms-txt": { kind: "service", name: "Générateur llms.txt gratuit + vérification de lisibilité IA", description: "Générez un fichier llms.txt pour votre site et découvrez ce qu'un moteur de réponse peut — ou ne peut pas — dire de votre entreprise. Gratuit, sans inscription.", locale: "fr", serviceType: "Answer engine optimization", crumbs: [{ name: "Outils", path: "/fr/outils" }] },
  /**
   * The FAQs are the load-bearing part here. Keyword Planner puts "website
   * design cost", "website development cost", "cost to build a website" and
   * "web design cost" each at 100–1K/month — one intent, budgeting, so one
   * page. Answer engines quote these near-verbatim, which is why the first
   * one carries the actual figures and the second one says outright that this
   * is not a quote: being cited alongside a fabricated commitment would be
   * worse than not being cited.
   */
  "/tools/project-cost-calculator": {
    kind: "service",
    name: "Website & Project Cost Calculator",
    description:
      "Estimate what a website, online store, SEO programme or custom software project would cost in Canada, using StillAwake Media's real pricing model. Free, no signup, figures in CAD.",
    locale: "en",
    serviceType: "Project cost estimation",
    crumbs: [{ name: "Tools", path: "/tools" }],
    faqs: [
      {
        q: "How much does a website cost in Canada?",
        a: "A professionally built small-business website in Canada generally starts around CA$3,000 and runs to about CA$10,000. A custom-designed business site with SEO architecture runs roughly CA$8,000–$25,000, an online store CA$6,500–$30,000, and a custom web application from about CA$15,000 upward. StillAwake Media's minimum build engagement is CA$2,500.",
      },
      {
        q: "Is this a quote?",
        a: "No. It is a planning estimate produced by the same pricing model StillAwake Media uses internally to scope work. Final pricing depends on confirmed scope and integrations, and every engagement gets a written scope with a fixed price before any commitment.",
      },
      {
        q: "Why is the estimate a range rather than a single number?",
        a: "Because the scope is not confirmed yet. The range reflects genuine uncertainty in the work: where a project connects to a system we have not seen inside, the top of the range widens rather than a cost being invented for it. The range narrows once the scope is written down.",
      },
      {
        q: "Does the estimate include monthly costs?",
        a: "No. Recurring services are shown separately from the build. StillAwake Media's published monthly prices are SEO Growth — Essentials at CA$600 per month and SEO Growth — Advanced at CA$850 per month; care plans and hosting are quoted in writing.",
      },
    ],
  },
  "/fr/outils/calculateur-cout-projet": {
    kind: "service",
    name: "Calculateur de coût de projet web",
    description:
      "Estimez ce que coûterait un site web, une boutique en ligne, un mandat SEO ou un logiciel sur mesure au Québec, à partir du modèle tarifaire réel de StillAwake Media. Gratuit, sans inscription, en dollars canadiens.",
    locale: "fr",
    serviceType: "Estimation de coût de projet",
    crumbs: [{ name: "Outils", path: "/fr/outils" }],
    faqs: [
      {
        q: "Combien coûte un site web au Québec?",
        a: "Un site d'entreprise fait par des professionnels part généralement d'environ 3 000 $ et va jusqu'à environ 10 000 $. Un site sur mesure avec architecture SEO se situe entre 8 000 $ et 25 000 $, une boutique en ligne entre 6 500 $ et 30 000 $, et une application web sur mesure à partir d'environ 15 000 $. Le mandat de construction minimum de StillAwake Media est de 2 500 $.",
      },
      {
        q: "Est-ce une soumission?",
        a: "Non. C'est une estimation de planification produite par le même modèle tarifaire que StillAwake Media utilise à l'interne. Le prix final dépend de la portée confirmée et des intégrations, et chaque mandat reçoit une portée écrite avec un prix fixe avant tout engagement.",
      },
      {
        q: "Pourquoi une fourchette plutôt qu'un seul chiffre?",
        a: "Parce que la portée n'est pas encore confirmée. La fourchette reflète l'incertitude réelle du travail : quand un projet se connecte à un système qu'on n'a pas vu de l'intérieur, le haut de la fourchette s'élargit plutôt que d'inventer un coût. La fourchette se resserre une fois la portée écrite.",
      },
      {
        q: "Les frais mensuels sont-ils inclus?",
        a: "Non. Les services récurrents sont présentés séparément de la construction. Les prix mensuels publiés de StillAwake Media sont Croissance SEO — Essentiel à 600 $ CAD par mois et Croissance SEO — Avancé à 850 $ CAD par mois; les forfaits d'entretien et l'hébergement sont sur soumission écrite.",
      },
    ],
  },
};
