/**
 * The portfolio registry: one record per project, however many shelves it
 * appears on.
 *
 * A project belongs to categories by reference (`categories`), never by being
 * copied into a per-category list, so a project that is both a website and a
 * tool is one record with two category ids. Adding a category is a single
 * entry in `projectCategories`; no page layout changes.
 *
 * Everything written here is something the existing site already said about
 * the project, or that the project's own case study documents. Nothing is
 * claimed that the case studies do not support.
 */

export type ProjectCategoryId =
  | "websites"
  | "apps"
  | "games"
  | "tools"
  | "components"
  | "saas"
  | "brand-design";

export type ProjectCategory = {
  id: ProjectCategoryId;
  label: string;
  /** Short line under the row title on /our-work. */
  blurb: string;
};

export const projectCategories: ProjectCategory[] = [
  { id: "websites", label: "Websites", blurb: "Custom-coded sites built around search intent and a clear next step." },
  { id: "apps", label: "Apps", blurb: "Mobile and real-time products." },
  { id: "games", label: "Games", blurb: "Original games published by StillAwake Media." },
  { id: "tools", label: "Tools", blurb: "Free utilities anyone can use." },
  { id: "components", label: "Components", blurb: "Interactive UI sections and building blocks." },
  { id: "saas", label: "SaaS", blurb: "Software products sold as a service." },
  { id: "brand-design", label: "Brand & Design", blurb: "Identity systems, logos, and graphic assets." },
];

export type ProjectStatus = "live" | "beta" | "in-development";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  /** Stable id. Never reused, never renamed once published. */
  id: string;
  slug: string;
  title: string;
  /** One sentence for cards. */
  summary: string;
  /** Two or three paragraphs for the detail page. */
  description: string[];
  categories: ProjectCategoryId[];
  /** Only platforms the project actually ships on. */
  platforms: string[];
  status: ProjectStatus;
  /** Shown on the card as a small label: "Travel website", "Finance SEO platform". */
  kind: string;
  accent: string;
  /** Real artwork only. A project without one renders the designed fallback. */
  image?: ProjectImage;
  /** Wider, darker art for the featured hero. Falls back to `image`. */
  heroImage?: ProjectImage;
  externalUrl?: string;
  externalLabel?: string;
  /**
   * When the project has a canonical home elsewhere on this site (a game's
   * landing page), cards link there and /our-work/[slug] is not generated —
   * one canonical URL per project.
   */
  canonicalPath?: string;
  /** The existing deep-dive, if one exists. */
  caseStudyPath?: string;
  /**
   * The site embedded as a live preview on the detail page. Only set for
   * sites that were already previewed in the old iframe browser.
   */
  livePreviewUrl?: string;
  highlights: string[];
  technologies?: string[];
  featured?: boolean;
  /** ISO date this record was last reviewed against the live project. */
  updated: string;
};

export const projects: Project[] = [
  {
    id: "stillskin-forest",
    slug: "stillskin-forest",
    title: "Stillskin Forest",
    summary:
      "A cooperative survival-horror game on Roblox. The forest is beautiful. The nights are not.",
    description: [
      "Stillskin Forest is StillAwake Media's first game: a cooperative zombie survival-horror experience built on Roblox. Players scavenge a campground, the ruined town of Stillwater and the grounds of Blackthorn Asylum by day, then survive escalating nights against infected that hear, search and remember.",
      "The game is in active development. Its official landing page and wiki live under /games.",
    ],
    categories: ["games"],
    platforms: ["Roblox"],
    status: "in-development",
    kind: "Co-op survival horror",
    accent: "#7FA36B",
    image: {
      src: "/games/stillskin-forest/branding/stillskin-forest-thumbnail.webp",
      alt: "Blackthorn Asylum above Green Lake in Stillskin Forest",
      width: 1920,
      height: 1080,
    },
    heroImage: {
      src: "/games/stillskin-forest/branding/stillskin-forest-hero.webp",
      alt: "Two survivors with headlamps on a forest trail at dusk in Stillskin Forest",
      width: 2560,
      height: 1440,
    },
    canonicalPath: "/games/stillskin-forest",
    externalUrl: "https://www.roblox.com/games/111788627314883/Stillskin-Forest",
    externalLabel: "View on Roblox",
    highlights: [
      "Infected AI with sight, hearing, search and ladder memory",
      "The Dread Encounter: hiding is not the same as being safe",
      "Co-op revives, ghost spectating and a rooftop finale",
    ],
    technologies: ["Roblox", "Luau"],
    featured: true,
    updated: "2026-10-25",
  },
  {
    id: "lisa-travel-design",
    slug: "lisa-travel-design",
    title: "Lisa Travel Design",
    summary:
      "A premium travel website built around trust, destination planning, and inquiry flow.",
    description: [
      "A travel designer selling bespoke itineraries needed a site that read as premium before a single price was mentioned, and that turned interest into a qualified inquiry rather than a generic contact form fill.",
      "The page order establishes credibility first (who plans the trip, how the process works, what the client receives) before asking for anything. The inquiry path is threaded through the journey and captures trip type and timing, so the first reply can already be useful. Type scale, image cropping and section rhythm were designed at mobile width first.",
    ],
    categories: ["websites"],
    platforms: ["Web"],
    status: "live",
    kind: "Travel website",
    accent: "#FFB6C1",
    externalUrl: "https://lisatraveldesign.com",
    externalLabel: "Visit lisatraveldesign.com",
    caseStudyPath: "/work/lisa-travel-design",
    livePreviewUrl: "https://lisatraveldesign.com",
    highlights: [
      "High-end travel positioning",
      "Lead-focused page structure",
      "Mobile-first brand experience",
    ],
    featured: true,
    updated: "2026-08-13",
  },
  {
    id: "navtrl-stalkr",
    slug: "navtrl-stalkr",
    title: "NAVTRL / Stalkr",
    summary:
      "Stalkr, a real-time location app for crews who go off-grid, plus the NAVTRL site that markets it.",
    description: [
      "Stalkr is live-location software for crews who go off-grid: hunters, road-trippers, families. It was built to a TestFlight beta in 24 days. It has not shipped to the public App Store yet.",
      "The NAVTRL product site uses a product-style landing structure (one idea per section, in the order a new visitor forms questions) and a visual language borrowed from the app itself.",
    ],
    categories: ["apps", "websites"],
    platforms: ["iOS", "Web"],
    status: "beta",
    kind: "Real-time location app",
    accent: "#7CFF8A",
    externalUrl: "https://navtrl.com",
    externalLabel: "Visit navtrl.com",
    caseStudyPath: "/work/stalkr-navtrl",
    livePreviewUrl: "https://navtrl.com",
    highlights: [
      "Beta in TestFlight in 24 days",
      "Crews, zones and SOS in real time",
      "Product-style landing structure",
    ],
    technologies: ["iOS"],
    featured: true,
    updated: "2026-08-13",
  },
  {
    id: "bankdemark",
    slug: "bankdemark",
    title: "BankDeMark",
    summary:
      "A calculator-led finance content platform designed around search intent and topical authority.",
    description: [
      "BankDeMark is a Canadian finance platform built on a simple thesis: interactive calculators answer a query completely and give people a reason to return. They anchor each topic cluster, and the supporting articles explain the numbers the calculators produce.",
      "Content is organised by search intent rather than category convenience, and links run deliberately between tools and explanations in both directions. BankDeMark is a separate organization founded by StillAwake Media's founder, not a client engagement.",
    ],
    categories: ["websites", "tools"],
    platforms: ["Web"],
    status: "live",
    kind: "Finance SEO platform",
    accent: "#6BE3FF",
    externalUrl: "https://bankdemark.com",
    externalLabel: "Visit bankdemark.com",
    caseStudyPath: "/work/bankdemark",
    livePreviewUrl: "https://bankdemark.com",
    highlights: [
      "Calculator-first SEO architecture",
      "One page owns one question",
      "Two-way internal linking between tools and guides",
    ],
    featured: true,
    updated: "2026-08-13",
  },
  {
    id: "blackwater-aquatics",
    slug: "blackwater-aquatics",
    title: "Blackwater Aquatics",
    summary:
      "Education-led Shopify commerce: ecommerce, SEO and live product education for Canadian aquarists.",
    description: [
      "Blackwater Aquatics is a Canadian aquarium store where the content outweighs the catalogue. Care guides come first and the products they recommend sit behind them, so the store reads to Google like an authority rather than a catalogue.",
      "It is operated by StillAwake Media's founder. It is our own store, not a client engagement, and the case study says so.",
    ],
    categories: ["websites", "brand-design"],
    platforms: ["Web", "Shopify"],
    status: "live",
    kind: "Shopify store",
    accent: "#3FB6A8",
    image: {
      src: "/blackwater-aquatics-canada-logo.jpg",
      alt: "Blackwater Aquatics Canada logo",
      width: 1200,
      height: 1200,
    },
    externalUrl: "https://blackwateraquatics.ca",
    externalLabel: "Visit blackwateraquatics.ca",
    caseStudyPath: "/work/blackwater-aquatics",
    highlights: [
      "Content outweighs catalogue",
      "Logo and identity system",
      "Canadian search growth",
    ],
    technologies: ["Shopify"],
    updated: "2026-08-13",
  },
  {
    id: "zylx-ai",
    slug: "zylx-ai",
    title: "ZYLX.ai",
    summary:
      "An AI software brand for workflow systems, agents, and automation.",
    description: [
      "ZYLX connects a business's systems once, builds persistent context from them, and makes that context available to authorized AI assistants, so an assistant answers with real business knowledge instead of guesses. It is a StillAwake Media product.",
      "The messaging is anchored to the operator's job rather than the model behind it, and the visual system is built to stretch across the product surface, marketing pages and documentation without being rebuilt each time.",
    ],
    categories: ["saas", "websites"],
    platforms: ["Web"],
    status: "live",
    kind: "AI software",
    accent: "#8B5CF6",
    externalUrl: "https://zylx.ai",
    externalLabel: "Visit zylx.ai",
    livePreviewUrl: "https://zylx.ai",
    highlights: [
      "AI product positioning",
      "Software brand system",
      "Workflow-focused messaging",
    ],
    featured: true,
    updated: "2026-08-13",
  },
  {
    id: "northground-bushcraft",
    slug: "northground-bushcraft",
    title: "Northground Bushcraft",
    summary:
      "A rugged outdoor brand presence with survival, bushcraft, and field-ready editorial direction.",
    description: [
      "An outdoor and bushcraft brand where credibility is everything. In this audience, a site that looks like a generic template reads as inexperience.",
      "Palette, texture and type were drawn from field equipment rather than software design trends. The layout is built for long-form field content, because in this niche depth of knowledge is the trust signal, and long-form content is also what earns search visibility.",
    ],
    categories: ["websites", "brand-design"],
    platforms: ["Web"],
    status: "live",
    kind: "Outdoor brand",
    accent: "#C19A6B",
    externalUrl: "https://northgroundbushcraft.com",
    externalLabel: "Visit northgroundbushcraft.com",
    livePreviewUrl: "https://northgroundbushcraft.com",
    highlights: [
      "Outdoor identity direction",
      "Editorial brand feel",
      "Trust-building layout",
    ],
    updated: "2026-08-13",
  },
  {
    id: "llms-txt-generator",
    slug: "llms-txt-generator",
    title: "llms.txt Generator",
    summary:
      "A free tool that writes an llms.txt file for any site and reports what an answer engine can't tell about the business.",
    description: [
      "The generator reads a public website, drafts an llms.txt file, and lists the gaps: the things an AI answer engine still cannot work out about the business from the site alone.",
      "It is free and needs no signup.",
    ],
    categories: ["tools"],
    platforms: ["Web"],
    status: "live",
    kind: "Free AEO tool",
    accent: "#D71920",
    canonicalPath: "/tools/llms-txt-generator",
    highlights: [
      "Drafts llms.txt from a live site",
      "Reports the gaps, not just the file",
      "No signup",
    ],
    updated: "2026-08-13",
  },
  {
    id: "neon-link-hub",
    slug: "neon-link-hub",
    title: "Neon Link Hub",
    summary:
      "An animated link-hub component: interactive sections and premium conversion-focused UI blocks.",
    description: [
      "A custom link-hub section from StillAwake Media's component work: interactive website sections, animated UI blocks, link hubs and feature layouts built to sit inside a larger site.",
    ],
    categories: ["components"],
    platforms: ["Web"],
    status: "live",
    kind: "UI component",
    accent: "#FF4FD8",
    image: {
      src: "/stillawake-neon-links-component-showcase.jpg",
      alt: "StillAwake Media neon link hub component showcase",
      width: 1400,
      height: 933,
    },
    highlights: ["Animated link hub", "Custom UI section", "Conversion-focused layout"],
    updated: "2026-08-13",
  },
  {
    id: "graphics-and-assets",
    slug: "graphics-and-assets",
    title: "Graphics & Assets",
    summary:
      "Infographics, thumbnails, social visuals and banners built to strengthen brand authority.",
    description: [
      "Graphic work produced alongside the sites above: infographics, article artwork, thumbnails, social visuals and banners.",
    ],
    categories: ["brand-design"],
    platforms: ["Web"],
    status: "live",
    kind: "Graphic design",
    accent: "#E3B341",
    image: {
      src: "/rhabdocoela-flatworm-aquarium-guide.jpg",
      alt: "Aquarium infographic artwork for an aquarium care guide",
      width: 1000,
      height: 747,
    },
    highlights: ["Infographics", "Article artwork", "Social visuals"],
    updated: "2026-08-13",
  },
];

export function projectHref(project: Project): string {
  return project.canonicalPath ?? `/our-work/${project.slug}`;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects that get their own /our-work/[slug] page. */
export function projectsWithDetailPage(): Project[] {
  return projects.filter((p) => !p.canonicalPath);
}

export function projectsInCategory(id: ProjectCategoryId): Project[] {
  return projects.filter((p) => p.categories.includes(id));
}

export function relatedProjects(project: Project, limit = 4): Project[] {
  return projects
    .filter((p) => p.id !== project.id)
    .map((p) => ({
      p,
      shared: p.categories.filter((c) => project.categories.includes(c)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.p.updated.localeCompare(a.p.updated))
    .slice(0, limit)
    .map(({ p }) => p);
}

export function recentlyUpdated(limit = 8): Project[] {
  return [...projects].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, limit);
}
