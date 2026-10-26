import type { TechStackContent } from "./types";

/**
 * English content for the technology decision resource.
 *
 * Written as advice a studio would actually give, which means it repeatedly
 * recommends things StillAwake does not sell. A page that concluded "custom
 * Next.js" for every business would be a brochure, and would be wrong: most
 * businesses are best served two or three rungs below what an agency would
 * enjoy building.
 */
export const EN: TechStackContent = {
  locale: "en",

  chrome: {
    meta: {
      title: "What Technology Should I Use for My Website?",
      description:
        "A decision resource for choosing a website platform or tech stack: nine business situations, a five-level simplicity ladder, a fifteen-criterion comparison of builders, Webflow, WordPress, Shopify and custom builds — and the requirement that justifies each step up.",
      ogTitle: "What Technology Should I Use for My Website?",
      ogDescription:
        "Choose the simplest architecture that reliably does what your business needs — and see exactly what would justify anything more.",
    },
    eyebrow: "Decision resource",
    h1: "What technology should I use for my website?",
    standfirst:
      "The right answer is the simplest architecture that reliably does what your business needs — and for most businesses that is several rungs below what an agency would enjoy building. This resource works out which rung you are on, and what would legitimately move you up one.",
    intro: [
      "Almost every bad technology decision in this market is the same decision: a business is sold a level of machinery its requirements never asked for. A five-page plumbing site gets a database. A clothing shop gets a custom checkout. A team that publishes twice a year gets a headless CMS with a workflow engine. None of it is incompetent — it is all buildable, and it all works on the day it launches. It is simply more than the business needed, and the cost of that shows up later, as maintenance, as fragility, and as an inability to change anything without calling the person who built it.",
      "So this page is organised around business situations rather than technologies. You will not find a ranking of frameworks. You will find the requirement that justifies each step up in complexity, stated plainly enough that you can check whether you have that requirement — and the honest answer for a lot of readers is a hosted builder and an afternoon, not a project.",
      "Everything here is the reasoning we use on real projects, including the parts where the right recommendation is something we do not sell.",
    ],
    ui: {
      ladderHeading: "The simplicity ladder",
      ladderIntro:
        "Five rungs, from least machinery to most. The rule that matters is the one between them: do not move up a level unless a requirement forces you to. Each rung below states what forces the next one.",
      scenariosHeading: "Nine business situations",
      scenariosIntro:
        "Find the one that matches how your business actually operates. Each states the normal answer, the defensible alternatives, the over-engineering that situation specifically invites, and the single requirement that legitimately moves it up a level.",
      matrixHeading: "Comparison by criterion",
      matrixIntro:
        "Six approaches against the fifteen criteria that decide real projects. Rows are approaches rather than individual products, because the choice a business makes is architectural — “a hosted builder” is a decision; “Framer rather than Squarespace” is a preference.",
      matrixMethodology:
        "There are no scores out of ten here, deliberately. Nobody can defend why one platform's SEO is a 7 and another's an 8, and a number invents a precision that does not exist. What can be defended is the decision a rating implies, so each cell says what it would mean for your choice — and carries the fact behind it. These are judgements from building and maintaining these stacks, not benchmarks.",
      matrixLegend: {
        strong: "A reason to choose it",
        workable: "Fine, with a caveat",
        limited: "Possible, but it fights you",
        wrong_tool: "Wrong tool for this",
      },
      criterionColumn: "Criterion",
      criteria: {
        setup: "Setup complexity",
        maintenance: "Ongoing maintenance",
        editing: "Client editing",
        seo: "SEO flexibility",
        performance: "Performance",
        ecommerce: "Ecommerce",
        auth: "Authentication",
        database: "Database / persistence",
        workflows: "Custom workflows",
        scale: "Scalability",
        build_cost: "Development cost",
        run_cost: "Ongoing cost",
        lock_in: "Vendor lock-in",
        portability: "Portability",
        expertise: "Expertise required",
      },
      approaches: {
        hosted_builder: { name: "Hosted builder", sub: "Framer, Squarespace" },
        visual_cms: { name: "Visual CMS", sub: "Webflow" },
        wordpress: { name: "WordPress", sub: "Self-hosted, themed" },
        shopify: { name: "Shopify", sub: "Hosted commerce" },
        custom_cms: { name: "Custom front end + CMS", sub: "Next.js + Sanity" },
        custom_app: { name: "Custom app + backend", sub: "Next.js + Supabase" },
      },
      layersHeading: "The technologies, by layer",
      layersIntro:
        "Grouping by architectural layer prevents the most common confusion in these conversations: treating tools that do unrelated jobs as if they compete. Stripe and Framer are not alternatives to one another. Supabase does not replace Shopify. Most real stacks pick one thing per layer and leave several layers empty — and an empty layer is a good result, not a gap.",
      mythsHeading: "You probably don't need…",
      mythsIntro:
        "Each of these is genuinely correct for some businesses and wildly excessive for most. What follows is the requirement that makes each one right, so you can check rather than guess.",
      mythsUsually: "Why usually not",
      mythsJustified: "When it is genuinely justified",
      mythsInstead: "What to do instead",
      treeHeading: "Work out your answer",
      treeIntro:
        "Four or five questions about how your business operates — none about technology. Each one can only move you up the ladder, so you land on the simplest architecture that still satisfies something you actually said you needed.",
      treeStart: "Start",
      treeRestart: "Start over",
      treeBack: "Back",
      treeAnswerLabel: "Your answers",
      treeStackLabel: "Where to start",
      treeWhyLabel: "Why this",
      treeChangesLabel: "What would change this",
      treeReadMore: "Read the full reasoning",
      treeCalculator: "See what this costs to build",
      treeDisclaimer:
        "A starting point, not a specification. A real recommendation follows a look at your content, your traffic and the systems you already run.",
      levelBadge: "Level",
      rightWhen: "Right when",
      outgrowWhen: "You have outgrown it when",
      runningCost: "What it costs to run",
      whoEdits: "Who can change it",
      scenarioWho: "Who this is",
      scenarioNeeds: "What it has to do",
      scenarioRecommendation: "Normal answer",
      scenarioAlternatives: "Also defensible",
      scenarioOverkill: "The over-engineering to refuse",
      scenarioEscalation: "What legitimately moves it up",
      layerCaution: "Where this goes wrong",
      diagramLabel: "Architecture",
      absentLabel: "not present",
      readNext: "Read next",
      honesty:
        "We build custom software, and this page still tells most readers not to buy it. That is not modesty — a business on the wrong rung becomes an unhappy client about eighteen months in, and we would rather lose the project than inherit that.",
    },
    principlesHeading: "How we actually decide",
    principles: [
      {
        title: "Requirements pick the architecture — never the reverse",
        body: "Every rung on the ladder is justified by a requirement or it is not justified at all. If nobody can name the requirement that needs a database, there is no database. This sounds obvious and is violated constantly, usually because the technology was chosen before anyone wrote the requirements down.",
      },
      {
        title: "Integrating what exists and building it are different products",
        body: "“Take bookings” can mean embedding the scheduling tool you already pay for, or building an availability engine with staff, resources and rules. Those are not two sizes of one job — they differ by an order of magnitude in cost, in time and in what you are responsible for afterwards. The same split applies to ordering, payments, logins and search. Asking which one you mean is usually the single highest-value question in a project.",
      },
      {
        title: "Buy before you build, and be honest about which one you are doing",
        body: "If an existing product does eighty per cent of it, the correct move is nearly always to run that product and build the missing twenty — or to change the process so the eighty is enough. Custom software earns its place when the process is the competitive advantage, not when it is merely unusual.",
      },
      {
        title: "Count the second year, not the launch",
        body: "Any of these approaches can be made to look good on launch day. The differences show up in year two: who can change a price without a developer, what breaks when a plugin updates, whether a redesign means a rebuild, and whether you can leave. Cheap to build and expensive to own is the most common bad trade in this market.",
      },
      {
        title: "Own the accounts, whatever the stack",
        body: "The domain, the DNS, the hosting, the analytics and the repository should be in your name, with your agency invited in. This is independent of every other decision on this page and it is the one that determines whether a technology choice is reversible. A stack you like on someone else's account is worse than a stack you tolerate on your own.",
      },
      {
        title: "Prefer the boring layer",
        body: "Postgres, a hosted CMS, a payment processor everyone already trusts. Novelty at the infrastructure layer buys almost nothing for a business website and costs a great deal when the interesting choice stops being maintained. Save the originality for the parts of the product your customers can see.",
      },
    ],
    faqHeading: "Common questions",
    faq: [
      {
        q: "What technology should I use for my website?",
        a: "Choose the simplest architecture that reliably satisfies your actual requirements. For most businesses — contractors, consultants, clinics, restaurants, professional services — that is a hosted builder such as Framer or Squarespace, or a CMS-driven site on Webflow or WordPress. A custom front end with a headless CMS becomes justified when search is a primary channel and the page count is large. A backend and database become justified when users log in and see data that belongs to them. Full custom software is justified when the process itself is the product.",
      },
      {
        q: "Is WordPress still a reasonable choice in 2026?",
        a: "Yes, for a specific case: a content-heavy site with multiple editors, an existing WordPress team or agency, and a plugin that genuinely solves a requirement. It is a poor choice when nobody is accountable for updates, because the maintenance is real and the cost of neglect is a compromised site rather than an out-of-date one.",
      },
      {
        q: "Do I need a custom website, or is a template fine?",
        a: "A template is fine when the site's job is to be credible and explain what you do, and when nobody on the team is fighting the template to publish. It stops being fine when the structure you need does not exist in the template, when performance or search results are commercially material, or when the design has become indistinguishable from your competitors using the same theme.",
      },
      {
        q: "Should I use Shopify or build a custom store?",
        a: "Use Shopify unless something about how you sell genuinely breaks a normal store — per-customer pricing, rentals and returns, complex configurators, a marketplace with third-party sellers, or an ERP that must be the source of truth. Shopify's checkout, tax handling, fraud screening, payment compliance and hosting represent an enormous amount of work you would otherwise pay to rebuild and then maintain, and rebuilding checkout almost never returns the investment.",
      },
      {
        q: "When does a business actually need a database like Supabase or Postgres?",
        a: "When something must persist and belong to someone: user accounts, saved records, order history you control, uploaded documents, an application's state. A contact form does not need one — it needs an email. A blog does not need one — the CMS already has one. If nothing dynamic needs to be stored and retrieved per user, a database is machinery with no job.",
      },
      {
        q: "Is Next.js overkill for a small business website?",
        a: "Often, yes. Next.js earns its place when a site is large, when search is a primary acquisition channel, when content comes from a CMS or an API, or when the site will grow into an application. For a five-page site edited twice a year, a hosted builder gets you the same commercial result faster, and someone in your office can change the phone number.",
      },
      {
        q: "How do I avoid being over-sold?",
        a: "Ask which requirement makes each component necessary, and expect a specific answer. “You will need it later” is not a requirement. Ask what happens on the day you want to leave, who owns the accounts, and who can change a price without a developer. A studio that cannot answer those in plain language is quoting a stack rather than solving a problem.",
      },
    ],
    relatedHeading: "Read next",
    related: [
      { label: "Do I need custom software at all?", href: "/do-i-need-custom-software" },
      { label: "Who owns the domain, hosting, code and accounts", href: "/website-ownership" },
      { label: "What a website quote should include", href: "/stillawake-times/what-a-website-quote-should-include" },
      { label: "Website builders vs hiring someone", href: "/stillawake-times/website-builders-vs-hiring-someone" },
      { label: "What is custom software development?", href: "/stillawake-times/what-is-custom-software-development" },
      { label: "Framer vs WordPress", href: "/stillawake-times/framer-vs-wordpress" },
      { label: "Shopify vs WooCommerce", href: "/shopify-vs-woocommerce" },
      { label: "When you actually outgrow Shopify", href: "/stillawake-times/when-you-outgrow-shopify" },
      { label: "What a custom web application is", href: "/stillawake-times/what-is-a-custom-web-application" },
      { label: "Project cost calculator", href: "/tools/project-cost-calculator" },
      { label: "What a website costs in Canada", href: "/website-cost-canada" },
      { label: "Version française", href: "/fr/choisir-technologie-site-web" },
    ],
    cta: {
      heading: "Want this decided for your actual business?",
      body: "The cost calculator asks the same kind of questions this page does — about your business rather than about technology — and returns a scope and a range from the model we use to price real work. If the answer turns out to be a hosted builder and no project, it will say so.",
      primary: "Use the cost calculator",
      secondary: "See published prices",
    },
  },

  levels: {
    l1: {
      id: "l1",
      name: "Level 1 — Simple hosted builder",
      summary:
        "One product hosts, edits and serves the whole site. There is no separate CMS, no server you maintain and nothing to update.",
      examples: "Framer, Squarespace, Carrd, Shopify's own pages for a shop that already exists.",
      rightWhen: [
        "Under about fifteen pages, and the structure is not unusual.",
        "The site's job is to be credible, explain the offer and produce enquiries.",
        "Nobody needs to log in, and nothing needs to be stored per person.",
        "Content changes occasionally, and one person can be trusted with the editor.",
      ],
      outgrowWhen: [
        "You need a page type the builder cannot express, and you are faking it with duplicated pages.",
        "Search is a primary acquisition channel and you are running into control limits — redirects, structured data, per-page metadata, internationalisation.",
        "Someone needs to log in, buy something complicated, or see their own data.",
        "The page count has grown to the point where a change means editing the same block twenty times.",
      ],
      runningCost: "A subscription per month and a domain per year. No hosting bill and no maintenance retainer.",
      whoEdits: "Anyone in the business, in a visual editor, without a deployment.",
      diagram: [
        { role: "Hosting", fill: "Included in the platform" },
        { role: "Presentation", fill: "Platform templates and editor" },
        { role: "Content", fill: "Built-in collections" },
        { role: "Forms", fill: "Built-in, to email" },
        { role: "Database", fill: "None", absent: true },
        { role: "Authentication", fill: "None", absent: true },
        { role: "Backend", fill: "None", absent: true },
      ],
    },
    l2: {
      id: "l2",
      name: "Level 2 — CMS-driven marketing site",
      summary:
        "A content management system your team publishes from, with a designed front end on top of it. Still one platform, but content is now structured rather than typed into a page.",
      examples: "Webflow with its CMS, WordPress with a maintained theme, Shopify for a store with real content.",
      rightWhen: [
        "Content is a channel: service pages, locations, comparisons, case studies, a blog with a schedule.",
        "Non-technical people publish regularly and cannot wait for a developer.",
        "There are repeating page types — services, staff, locations, projects — that should share one structure.",
        "Search matters commercially and you need control of metadata, redirects and structured data.",
      ],
      outgrowWhen: [
        "Performance has become a commercial problem and the platform's output is the ceiling.",
        "The design is fighting the builder — every layout needs a workaround that the next editor breaks.",
        "You need content in two places at once: a website, an app, in-store screens.",
        "You have started paying for four subscription apps to fake one feature.",
      ],
      runningCost:
        "A platform subscription, plus plugins or apps. On WordPress, add real hosting and a maintenance budget — an unmaintained WordPress site is a security incident waiting for a slow week.",
      whoEdits: "The marketing team, in the CMS, without touching layout.",
      diagram: [
        { role: "Hosting", fill: "Platform (Webflow) or your host (WordPress)" },
        { role: "Presentation", fill: "Theme or visual build" },
        { role: "Content", fill: "CMS collections and post types" },
        { role: "Forms", fill: "Built-in or a plugin" },
        { role: "Database", fill: "The CMS's own — you do not design it" },
        { role: "Authentication", fill: "Editors only", absent: true },
        { role: "Backend", fill: "None of your own", absent: true },
      ],
    },
    l3: {
      id: "l3",
      name: "Level 3 — Custom front end + CMS",
      summary:
        "The interface is built as code and the content lives in a headless CMS. The two are separate, so the site can be redesigned without re-entering the content, and the content can outlive the design.",
      examples: "Next.js on Vercel with Sanity, Contentful or a Git-based content layer.",
      rightWhen: [
        "Search is a primary channel and the page count is large enough that structure and internal linking are strategy rather than housekeeping.",
        "Performance is commercially material — a store, a lead engine, a publisher.",
        "The design is genuinely bespoke and a builder would be reproduced at ninety per cent, badly.",
        "Content must feed more than one surface, or must survive the next redesign.",
      ],
      outgrowWhen: [
        "Users need accounts, private data, or anything that persists per person — that is Level 4, and it is a different project.",
        "You are building business logic inside the CMS to avoid admitting you need a backend.",
      ],
      runningCost:
        "Hosting on a serverless platform, a CMS subscription, and a developer relationship for changes to structure — not for changes to content.",
      whoEdits:
        "Editors change content freely. Changing what a page type IS requires a developer, which is the trade you are making.",
      diagram: [
        { role: "Hosting", fill: "Vercel or equivalent" },
        { role: "Presentation", fill: "Next.js / React, written for this business" },
        { role: "Content", fill: "Headless CMS, structured" },
        { role: "Forms", fill: "API route to email or CRM" },
        { role: "Database", fill: "The CMS's, plus nothing of your own" },
        { role: "Authentication", fill: "Editors only", absent: true },
        { role: "Backend", fill: "Thin — API routes, no state of its own" },
      ],
    },
    l4: {
      id: "l4",
      name: "Level 4 — Custom front end + backend and database",
      summary:
        "Now there is state. People sign in, records belong to them, and the system does things when nobody is watching. This is software with a website attached, rather than a website with features.",
      examples:
        "Next.js with Supabase or Postgres, authentication, row-level security, Stripe for billing, Resend for transactional email.",
      rightWhen: [
        "Users log in and see data that is theirs — a client portal, a member area, a booking system you own.",
        "The business has a process no existing product runs, and the process is the advantage.",
        "Data must be queried and reported on in ways a spreadsheet or a CMS cannot express.",
        "Something must happen on a schedule, or in response to an event, without a person.",
      ],
      outgrowWhen: [
        "Multiple products, multiple teams and a genuine platform surface — Level 5, and mostly an organisational change rather than a technical one.",
      ],
      runningCost:
        "Hosting, a managed database, an authentication provider, email, error tracking — and, unavoidably, an ongoing engineering relationship. Software is not a thing you buy once.",
      whoEdits:
        "Marketing content, if a CMS was included. Everything else is a deployment, which is why the marketing site is often deliberately kept out of this level.",
      diagram: [
        { role: "Hosting", fill: "Vercel or equivalent" },
        { role: "Presentation", fill: "Next.js / React application" },
        { role: "Content", fill: "CMS for marketing pages, if there are any" },
        { role: "Backend", fill: "API routes, server actions, scheduled jobs" },
        { role: "Database", fill: "Postgres, with access rules per row" },
        { role: "Authentication", fill: "Supabase Auth, Clerk or equivalent" },
        { role: "Payments", fill: "Stripe, if money changes hands" },
      ],
    },
    l5: {
      id: "l5",
      name: "Level 5 — Full custom software or platform",
      summary:
        "A product in its own right: anyone can sign up, billing runs itself, and the system is expected to keep working while the team sleeps. The website becomes marketing for the software, not the thing itself.",
      examples:
        "A SaaS application — Next.js, Postgres, authentication with roles and organisations, Stripe subscriptions, transactional email, observability, a staging environment and a release process.",
      rightWhen: [
        "Customers self-serve: they sign up, use it and are billed without you touching anything.",
        "Multiple organisations use the same system and must never see each other's data.",
        "The software is what you sell, or it is the operational core the business runs on.",
      ],
      outgrowWhen: ["This is the top of the ladder. What changes past here is team structure, not architecture."],
      runningCost:
        "Everything at Level 4, plus observability, on-call expectations, a security posture, and a roadmap. Budget for the second year before you commit to the first.",
      whoEdits: "Product and engineering, on a release cycle.",
      diagram: [
        { role: "Hosting", fill: "Managed platform, plus a staging environment" },
        { role: "Presentation", fill: "Application UI, plus a separate marketing site" },
        { role: "Backend", fill: "Application services, jobs, webhooks" },
        { role: "Database", fill: "Postgres, with tenant isolation" },
        { role: "Authentication", fill: "Accounts, roles, organisations, SSO" },
        { role: "Payments", fill: "Stripe subscriptions and entitlements" },
        { role: "Observability", fill: "Logging, error tracking, alerting" },
      ],
    },
  },

  scenarios: {
    "simple-business": {
      id: "simple-business",
      name: "Simple business website",
      who: "Contractors, consultants, local service companies, restaurants, clinics, trades, professional practices — businesses whose website has to establish that they are real and make it easy to get in touch.",
      needs: [
        "Explain the offer, the service area and the prices or the range.",
        "Look credible enough that a stranger is willing to call.",
        "Produce enquiries: a form, a phone number, a map, opening hours.",
        "Be found for the business's own name and a handful of local terms.",
      ],
      level: "l1",
      recommendation:
        "A hosted builder — Framer or Squarespace — set up properly, with the domain and analytics in the business's own accounts.",
      why: "Nothing on the requirement list needs a database, a login or a deployment. What it needs is clear structure, credible design, fast pages, correct local search signals and a form that reaches a person. A hosted builder does all of that, and does it without creating anything for the business to maintain. The failure mode for this kind of site is almost never the platform — it is vague copy, no clear next step, and a Google Business Profile nobody filled in.",
      alternatives: [
        {
          option: "Webflow",
          when: "There are repeating page types — several services, several locations — that should share one structure rather than being copies.",
        },
        {
          option: "WordPress",
          when: "The business already has a WordPress site, a person who maintains it, and no reason to migrate. Moving platforms is a cost; “WordPress is old” is not a requirement.",
        },
        {
          option: "A static custom build",
          when: "The brand is the product and the design must be genuinely bespoke — hospitality, luxury, architecture — or the site is a lead engine where performance and search structure are worth paying for.",
        },
      ],
      overkill:
        "A database, a login, a headless CMS, or a custom-coded build for a five-page site nobody edits. A plumber does not need Supabase. If the proposal contains one, ask which requirement it serves and expect a specific answer.",
      escalation:
        "Search becoming a real acquisition channel — the moment you want twenty service-by-neighbourhood pages that share a structure, you have moved to Level 2.",
    },

    "marketing-seo": {
      id: "marketing-seo",
      name: "Marketing / SEO-heavy website",
      who: "Businesses where organic search and paid landing pages are a primary source of customers: agencies, SaaS marketing sites, multi-service or multi-location companies, anyone running content as a channel.",
      needs: [
        "Many landing pages that share a structure and can be produced quickly.",
        "A blog or resource library, published to a schedule by non-developers.",
        "Excellent Core Web Vitals, because performance is both a ranking input and a conversion input.",
        "Full control of metadata, canonicals, redirects, structured data, sitemaps and hreflang.",
        "Conversion tracking that survives consent, and analytics you can actually act on.",
      ],
      level: "l2",
      recommendation:
        "Webflow when the marketing team must own the pages end to end. Next.js with a headless CMS when the page count is large, performance is commercially material, or the site is bilingual and the URL architecture matters.",
      why: "This is the situation where the platform genuinely changes results. Landing pages are only cheap if the page type exists once and the team can produce instances of it; performance is only reliable if you control what ships to the browser; and search structure — canonicals, redirects, hreflang — is only controllable if the platform exposes it. Those three are exactly where hosted builders start to run out of room, and exactly where a custom front end starts to earn its cost.",
      alternatives: [
        {
          option: "WordPress",
          when: "There is an existing content team who know it, someone accountable for updates, and a plugin that genuinely solves a requirement rather than adding one.",
        },
        {
          option: "Staying on a hosted builder",
          when: "Search matters but the site is small. Do not migrate a fifteen-page site for search reasons alone — fix the content and the structure first, and see whether the platform was ever the constraint.",
        },
      ],
      overkill:
        "A backend and a database for a site that publishes articles. Content is not application state. If nothing is stored per user, the CMS is the only database in this project.",
      escalation:
        "Content needing to feed a second surface — an app, in-store screens, a partner feed — or performance hitting the platform's ceiling. Both point at Level 3.",
    },

    publisher: {
      id: "publisher",
      name: "Content-heavy publisher",
      who: "Magazines, newsrooms, research and education sites, large resource libraries — anywhere the content is the product and more than one person is responsible for it.",
      needs: [
        "Frequent editing, by several people, without collisions.",
        "Real editorial workflow: drafts, review, scheduled publishing, embargoes.",
        "Taxonomy that holds up at volume — categories, tags, series, authors.",
        "Media handling: images at multiple sizes, video, captions, credits.",
        "Archives that stay fast and stay indexed as they grow into the thousands.",
      ],
      level: "l3",
      recommendation:
        "A headless CMS with proper roles and scheduling — Sanity, Contentful, or WordPress used strictly as a headless back end — with a Next.js front end.",
      why: "Publishing is the case where the editorial experience is a business requirement, not a convenience. Editors need drafts and scheduling; the archive needs to stay quick at scale; and the content needs to outlive several redesigns. Separating content from presentation is what makes all three possible at once. It is also the one situation where WordPress's editorial model, thirty years of refinement deep, is a genuine argument in its favour.",
      alternatives: [
        {
          option: "WordPress, traditionally themed",
          when: "The editorial team is large, already trained, and the performance requirements are ordinary. Do not headless a newsroom for fashion — it doubles the surface area you maintain.",
        },
        {
          option: "Webflow CMS",
          when: "The library is in the low hundreds of items and the workflow is simple. Its item limits and editorial workflow are the constraints to check before committing.",
        },
      ],
      overkill:
        "Building a custom CMS. Editorial software is a solved problem with decades of usability work behind it, and a bespoke admin panel will be worse on the day it ships and worse still in three years. Build a custom CMS only when the content model is genuinely unrepresentable — and it almost never is.",
      escalation:
        "Subscriptions, paywalls or reader accounts. That is Level 4, because it introduces users and things that belong to them.",
    },

    ecommerce: {
      id: "ecommerce",
      name: "Ecommerce",
      who: "Anyone selling products online — a first store, an established brand, direct-to-consumer, or a wholesale operation moving online.",
      needs: [
        "A catalogue with variants, inventory and collections.",
        "A checkout that converts, and that handles tax, shipping and fraud correctly.",
        "Payments, refunds and chargebacks handled compliantly.",
        "Operations: orders, fulfilment, returns, customer records, reporting.",
        "Marketing: discounts, email, abandoned carts, product feeds.",
      ],
      level: "l2",
      recommendation:
        "Shopify, unless something about how you sell genuinely breaks a normal store. Put the effort into the theme, the product data and the merchandising rather than into the plumbing.",
      why: "Checkout is the most expensive component in commerce and the least visible. Tax across jurisdictions, address validation, fraud screening, PCI scope, payment method coverage, retries on failed cards, refunds, chargebacks — Shopify has spent well over a decade on that surface, it improves without you, and it is regulated territory where being wrong is expensive. Rebuilding it is a large project whose best possible outcome is parity with what you could have rented. Almost every store that thinks it needs custom commerce actually needs a better theme, cleaner product data and a merchandising decision.",
      alternatives: [
        {
          option: "Shopify with a custom front end (headless)",
          when: "The brand or content experience is genuinely a differentiator and the storefront is a real design problem — but keep Shopify's checkout. Headless means custom storefront, not custom checkout.",
        },
        {
          option: "WooCommerce",
          when: "The business is already deep in WordPress, the catalogue is modest, and someone is accountable for maintenance and PCI posture.",
        },
        {
          option: "Custom commerce",
          when: "Per-customer contract pricing, rentals with availability and returns, complex configurators, marketplaces with third-party sellers, or an ERP that must remain the source of truth. These are real, and they are rarer than they are claimed.",
        },
      ],
      overkill:
        "A custom checkout. A clothing store does not need one. If a proposal includes rebuilding checkout, ask what it will do that Shopify's will not, and price the compliance and maintenance of the answer alongside the build.",
      escalation:
        "Selling models a store cannot express — subscriptions with entitlements, usage billing, per-account catalogues. At that point commerce has become an application, which is Level 4.",
    },

    booking: {
      id: "booking",
      name: "Booking / service business",
      who: "Clinics, salons, studios, restaurants, trades with scheduled visits, consultants selling time, tours and rentals.",
      needs: [
        "Availability that reflects reality — staff, rooms, equipment, travel time.",
        "Confirmations, reminders and rescheduling without phone calls.",
        "Deposits or payment at the time of booking, where that suits the business.",
        "Whatever the industry already expects: OpenTable, a practice management system, a POS.",
      ],
      level: "l1",
      recommendation:
        "Embed the booking product your industry already runs on — Calendly, Square, Acuity, OpenTable, Jane, your practice management system — into whatever level the rest of the site is at. Booking rarely changes the architecture of the website.",
      why: "This is the clearest example of the integrate-versus-build split, and the one where the cost difference is largest. Embedding a scheduling tool is configuration and styling; building an availability engine is software, with rules about staff, resources, buffers, cancellations, time zones, no-shows and reminders — every one of which is a decision someone has to make and maintain. The industry tool also usually carries something you cannot rebuild cheaply: reminders that reduce no-shows, a payments relationship, and compliance if health records are involved.",
      alternatives: [
        {
          option: "A booking system you own",
          when: "Availability depends on rules no product expresses — multi-resource jobs, technician routing, equipment that must return before it can go out again — or the booking flow itself is the differentiator.",
        },
        {
          option: "Booking through the ecommerce platform",
          when: "You already run Shopify and are selling appointments as products with a straightforward calendar.",
        },
      ],
      overkill:
        "Building a scheduling engine because the embedded widget does not match the brand fonts. Style the embed, or choose a product that allows styling. The visual mismatch costs a fraction of what maintaining a calendar system costs.",
      escalation:
        "Availability rules no product can express, or bookings that must drive an operational system you own. Then it is Level 4 — and it is a software project with a website beside it, not a bigger website.",
    },

    membership: {
      id: "membership",
      name: "Membership / authenticated portal",
      who: "Associations, course providers, agencies giving clients a place to see their own work, B2B suppliers exposing pricing or documents, communities behind a login.",
      needs: [
        "Accounts, and content or data that only the right person can see.",
        "Roles: member, admin, staff, sometimes organisation-level access.",
        "Recurring billing, if membership is paid.",
        "A record of things that belong to a person — files, progress, invoices, tickets.",
      ],
      level: "l4",
      recommendation:
        "First, check whether a product already does it: Circle, Memberstack, a course platform, your CRM's client portal. If none fits, this is where a backend earns its place — Next.js with Supabase or Postgres, real authentication, access rules enforced per row, Stripe for billing.",
      why: "This is the boundary the whole ladder is built around. The moment data belongs to a specific person, you have taken on responsibility for access control, for privacy law, for password and session handling, and for what happens when someone leaves. That responsibility is exactly what Supabase, Clerk and their peers exist to reduce — and it is exactly why a login should never be added casually to a marketing site. A portal is not a page behind a password; it is an application with a marketing site attached.",
      alternatives: [
        {
          option: "An off-the-shelf membership product",
          when: "The requirement is content behind a login and recurring billing. This covers more cases than most agencies admit, and it removes the security surface entirely.",
        },
        {
          option: "A shared workspace instead of a portal",
          when: "The real requirement is “clients can see their files and the project status”. Notion, a shared drive or your project tool often satisfies that for the cost of an afternoon.",
        },
      ],
      overkill:
        "Building a portal to deliver something an email attachment or a shared folder already delivers. Portals are frequently bought to look organised and then abandoned because logging in is more friction than the value inside.",
      escalation:
        "Anyone being able to sign up unattended, with self-serve billing and tenants who must never see each other — that is Level 5.",
    },

    saas: {
      id: "saas",
      name: "SaaS",
      who: "Software sold as a subscription, where customers sign up themselves, use the product, and are billed automatically.",
      needs: [
        "An application interface that is the product, not a description of it.",
        "Multi-tenancy: strict isolation between customer organisations.",
        "Authentication with roles, invitations and — eventually — SSO.",
        "Subscription billing, plan changes, proration, dunning, entitlements.",
        "Transactional email that reliably arrives.",
        "Observability: you find out something is broken before your customers tell you.",
      ],
      level: "l5",
      recommendation:
        "Next.js and React on Vercel; Postgres, usually via Supabase, with row-level security; Supabase Auth or Clerk for accounts; Stripe for subscriptions; Resend for transactional email; GitHub with previews and a staging environment; error tracking and uptime alerting from day one.",
      why: "This is the one situation on this page where custom architecture is the obvious answer rather than a risk, because the software IS the product — you cannot rent the thing you are selling. The discipline that matters here is different: not “should this be custom” but “how little can we build for the first version”. Buy authentication, buy billing, buy email, buy error tracking. Build only the part your customers are paying for. Teams that build their own auth and their own billing to save subscription fees routinely spend a quarter doing it and inherit the security burden permanently.",
      alternatives: [
        {
          option: "Validate on no-code first",
          when: "The product hypothesis is unproven. A concierge version behind a form and a spreadsheet answers the question that matters far more cheaply than a platform does.",
        },
      ],
      overkill:
        "Microservices, Kubernetes and event buses for a product with no users yet. A single well-structured application on managed infrastructure will carry you further than most founders expect, and it is far easier to split something that works than to assemble something that never quite did. Equally: a SaaS dashboard should not be assembled from page-builder pages — the product surface is application state, which is not what those tools are for.",
      escalation:
        "Scale problems you can actually measure. Split a service when a specific bottleneck demands it, not in anticipation of one.",
    },

    "internal-tools": {
      id: "internal-tools",
      name: "Internal business application",
      who: "Operations software used by staff rather than customers: a CRM, quoting or dispatch tooling, an approval workflow, inventory, reporting dashboards.",
      needs: [
        "Encode a process that currently lives in spreadsheets, email and people's heads.",
        "Records with a history, and reporting across them.",
        "Permissions by role, and an audit trail where decisions have consequences.",
        "Connections to the systems that already hold the data.",
      ],
      level: "l4",
      recommendation:
        "Apply the buy-first test hardest here. If an existing product does most of it, run it and build the missing part. Where custom is right, an internal tool is usually the cheapest custom software there is: a Next.js interface over Postgres, authentication, and honest scope.",
      why: "Internal tools have a hidden advantage — the users are your own staff, so the interface can be plain, the edge cases can be handled by a person, and the requirements can be gathered by walking over to someone's desk. That makes them unusually good value when the process really is unusual. But the same conditions make them easy to over-scope: the request is often for a system that replaces four tools when what is needed is one screen that removes one repeated hour a week.",
      alternatives: [
        {
          option: "Configure an existing platform",
          when: "The process is common — sales pipeline, tickets, projects, inventory. Airtable, a proper CRM or your ERP will beat a custom build for years.",
        },
        {
          option: "An automation instead of an application",
          when: "The requirement is really “this data should move from A to B without a person”. That is a workflow, not a system, and it is a fraction of the cost.",
        },
      ],
      overkill:
        "Rebuilding a CRM. Also: dashboards nobody opens. Before building a reporting system, find out which decision the report changes — if the answer is none, the report is a project with no return.",
      escalation:
        "The tool becoming something you would sell to others. That is a different business, and it needs the Level 5 requirements — multi-tenancy, self-serve billing, support.",
    },

    "custom-platform": {
      id: "custom-platform",
      name: "Highly custom platform",
      who: "Marketplaces, logistics and routing systems, regulated workflows, data products, anything where the way the business operates is not represented by any product on the market.",
      needs: [
        "A domain model that no off-the-shelf system expresses.",
        "Rules, states and integrations specific to this business.",
        "Frequently: compliance, auditability, or data residency requirements.",
        "A long life, and therefore a maintainable architecture rather than a clever one.",
      ],
      level: "l5",
      recommendation:
        "Custom, and scoped in writing before anything is built. Paid discovery that produces a requirements document, an architecture and a fixed build price is not a formality here — the requirements are the expensive part, and they do not exist yet.",
      why: "This is where custom software is straightforwardly correct: when the process is the competitive advantage, encoding it is the investment. The risk is no longer over-engineering the architecture — it is building the wrong thing accurately. So the money goes into deciding what to build, into shipping the smallest version that a real user can use for real work, and into boring, well-understood infrastructure underneath. Nobody can honestly price a platform from a questionnaire, and any studio that does is guessing at your expense.",
      alternatives: [
        {
          option: "A composed stack of existing products",
          when: "The unusual part is one step in an otherwise ordinary process. Ninety per cent bought and ten per cent built beats a hundred per cent built, permanently.",
        },
      ],
      overkill:
        "Architecting for a scale you have not reached. The most common failure at this level is not too little engineering — it is a system designed for the company you hope to be in five years, shipped so late that the company you are now could not wait for it.",
      escalation:
        "Nothing above this. The next constraint is organisational: who maintains it, who is on call, and what happens when the person who understood it leaves.",
    },
  },

  matrix: {
    hosted_builder: {
      setup: { rating: "strong", note: "Live in days. No environment, no build step, no hosting decision." },
      maintenance: { rating: "strong", note: "Nothing to patch. The platform updates itself." },
      editing: { rating: "strong", note: "Visual editing by anyone, published instantly." },
      seo: { rating: "workable", note: "Metadata, sitemaps and redirects are handled; advanced control — hreflang, granular structured data, edge rules — varies and should be checked before committing." },
      performance: { rating: "workable", note: "Usually good out of the box; the ceiling is the platform's, and heavy animation or embedded scripts erode it quickly." },
      ecommerce: { rating: "limited", note: "Fine for a handful of products. Not an operations platform." },
      auth: { rating: "wrong_tool", note: "Password-gating a page is not authentication." },
      database: { rating: "wrong_tool", note: "Collections hold content, not per-user records." },
      workflows: { rating: "wrong_tool", note: "No place to run business logic." },
      scale: { rating: "workable", note: "Traffic scales fine. Page count and structural complexity are what break first." },
      build_cost: { rating: "strong", note: "The lowest credible entry point for a professional site." },
      run_cost: { rating: "strong", note: "A subscription and a domain." },
      lock_in: { rating: "limited", note: "The design does not leave with you. A move means a rebuild." },
      portability: { rating: "limited", note: "Content can usually be exported; layout and interactions cannot." },
      expertise: { rating: "strong", note: "A capable non-developer can run it indefinitely." },
    },

    visual_cms: {
      setup: { rating: "workable", note: "Days to weeks. Structuring collections properly is real design work." },
      maintenance: { rating: "strong", note: "Hosted and patched by the platform." },
      editing: { rating: "strong", note: "The Editor role lets marketing publish without touching layout." },
      seo: { rating: "strong", note: "Per-page control, redirects, canonicals, sitemaps and structured data are all exposed." },
      performance: { rating: "workable", note: "Good when built carefully; degrades with heavy interactions and third-party embeds." },
      ecommerce: { rating: "limited", note: "Exists, but is not competitive with a dedicated commerce platform for real operations." },
      auth: { rating: "limited", note: "Member features exist; anything beyond gated content wants a real backend." },
      database: { rating: "limited", note: "CMS collections, with item limits worth checking against your archive." },
      workflows: { rating: "limited", note: "Logic means third-party automation services, not code you control." },
      scale: { rating: "workable", note: "Comfortable into the hundreds of items; plan the architecture past that." },
      build_cost: { rating: "workable", note: "Mid-range. Cheaper than custom, more than a builder." },
      run_cost: { rating: "workable", note: "Site plan plus seats; costs rise with editors and add-ons." },
      lock_in: { rating: "limited", note: "Content exports; the build does not. Leaving means rebuilding the front end." },
      portability: { rating: "limited", note: "CMS content is portable via CSV or API; layout is not." },
      expertise: { rating: "workable", note: "Editors need no skills. Building well requires someone who knows the tool properly." },
    },

    wordpress: {
      setup: { rating: "workable", note: "Fast to stand up, slow to make good. Theme and plugin choices decide the next five years." },
      maintenance: { rating: "limited", note: "Core, theme and plugin updates are ongoing and non-optional. Unmaintained WordPress is the most commonly compromised software on the web." },
      editing: { rating: "strong", note: "Thirty years of editorial refinement, and a workforce that already knows it." },
      seo: { rating: "strong", note: "Complete control, with mature plugins. The constraint is discipline, not capability." },
      performance: { rating: "limited", note: "Achievable, but it is work: caching, image handling and plugin restraint. Plugin sprawl is the usual cause of a slow site." },
      ecommerce: { rating: "workable", note: "WooCommerce is capable and puts you in charge of PCI posture, updates and uptime." },
      auth: { rating: "workable", note: "Users and roles exist; membership plugins extend them. Security posture is yours to own." },
      database: { rating: "workable", note: "A real database underneath, though the schema is WordPress's rather than yours." },
      workflows: { rating: "workable", note: "Hooks and custom plugins can do genuine work — at the cost of maintaining that code inside someone else's release cycle." },
      scale: { rating: "workable", note: "Scales with caching and infrastructure attention. Very large sites do run on it, with teams." },
      build_cost: { rating: "strong", note: "Enormous supply of developers and themes keeps entry cost low." },
      run_cost: { rating: "workable", note: "Hosting, premium plugins, and a maintenance budget that is not optional." },
      lock_in: { rating: "strong", note: "Open source. You can host it anywhere and nobody can raise the rent." },
      portability: { rating: "strong", note: "Database and files are yours; export paths are well-trodden." },
      expertise: { rating: "workable", note: "Easy to start, and needs a genuinely competent maintainer to stay safe." },
    },

    shopify: {
      setup: { rating: "strong", note: "A working store, with payments and tax, in days." },
      maintenance: { rating: "strong", note: "Platform, checkout and compliance are Shopify's problem. Apps are yours." },
      editing: { rating: "strong", note: "Products, collections and content in one admin the whole team can use." },
      seo: { rating: "workable", note: "Solid, with known constraints — enforced URL prefixes and limited control over some generated pages." },
      performance: { rating: "workable", note: "Fast by default; app scripts are the usual reason a store stops being fast." },
      ecommerce: { rating: "strong", note: "Checkout, tax, fraud, payments, inventory and reporting — the whole surface, maintained for you." },
      auth: { rating: "workable", note: "Customer accounts are built in. Not a general-purpose identity system." },
      database: { rating: "workable", note: "Products, orders and customers, with metafields for the rest. Not a place for unrelated application data." },
      workflows: { rating: "workable", note: "Flow, apps and functions cover a lot; genuinely unusual logic needs code beside the platform." },
      scale: { rating: "strong", note: "Handles traffic spikes and large catalogues without you thinking about it." },
      build_cost: { rating: "strong", note: "Money goes into theme, product data and merchandising rather than plumbing." },
      run_cost: { rating: "workable", note: "Subscription plus transaction fees plus apps. App creep is the cost to watch." },
      lock_in: { rating: "limited", note: "Real, and usually worth it. Theme code and checkout do not come with you." },
      portability: { rating: "workable", note: "Products, customers and orders export cleanly; the storefront does not." },
      expertise: { rating: "strong", note: "Merchants run stores unaided every day. Specialists are for theme and integration work." },
    },

    custom_cms: {
      setup: { rating: "limited", note: "Weeks. Content modelling, front end and deployment are all real decisions." },
      maintenance: { rating: "workable", note: "Dependencies need periodic updates, but there is no server to patch and a smaller attack surface than a plugin ecosystem." },
      editing: { rating: "strong", note: "Editors get a purpose-built model. Changing what a page type IS still needs a developer." },
      seo: { rating: "strong", note: "Total control: metadata, canonicals, hreflang, structured data, redirects, sitemaps, rendering strategy." },
      performance: { rating: "strong", note: "You decide what ships to the browser, which is the only durable way to hold Core Web Vitals." },
      ecommerce: { rating: "workable", note: "Correct as a storefront in front of Shopify. Building the commerce engine itself is a different project." },
      auth: { rating: "workable", note: "Straightforward to add — but adding it means you are at Level 4, not Level 3." },
      database: { rating: "workable", note: "The CMS is the database. Add your own only when something must persist per user." },
      workflows: { rating: "workable", note: "API routes and scheduled jobs handle real logic without a full backend." },
      scale: { rating: "strong", note: "Static generation and edge delivery scale essentially without limit." },
      build_cost: { rating: "limited", note: "The most expensive option that is not an application. Justified by traffic, page count or brand." },
      run_cost: { rating: "workable", note: "Hosting plus a CMS subscription — often less per month than the equivalent stack of plugins." },
      lock_in: { rating: "strong", note: "Your code, your repository, portable hosting. The CMS is the replaceable part." },
      portability: { rating: "strong", note: "Content exports via API; the front end runs anywhere that runs Node." },
      expertise: { rating: "limited", note: "Requires a developer relationship for anything structural. That is the trade." },
    },

    custom_app: {
      setup: { rating: "wrong_tool", note: "For a marketing site, this is the wrong starting point. For an application, it is the beginning of a project, not a launch." },
      maintenance: { rating: "limited", note: "Dependencies, migrations, security patches and someone accountable when it breaks at 2am." },
      editing: { rating: "limited", note: "Content editing exists only if a CMS was deliberately included. Everything else is a deployment." },
      seo: { rating: "strong", note: "Complete control — though most of an application is behind a login and correctly not indexed at all." },
      performance: { rating: "strong", note: "Yours to control, and yours to get wrong. Database queries become the thing that decides it." },
      ecommerce: { rating: "workable", note: "Necessary only for selling models a commerce platform cannot express. Otherwise a large, avoidable cost." },
      auth: { rating: "strong", note: "The reason to be here. Accounts, roles, sessions and per-row access rules." },
      database: { rating: "strong", note: "A schema designed for your domain, which is the whole point of this level." },
      workflows: { rating: "strong", note: "Any rule, any schedule, any integration. Nothing is “not supported”." },
      scale: { rating: "strong", note: "Scales as far as the architecture and the database design allow." },
      build_cost: { rating: "wrong_tool", note: "By far the highest, and unrecoverable if the requirement was imaginary." },
      run_cost: { rating: "limited", note: "Hosting, database, auth, email, monitoring — plus an ongoing engineering relationship." },
      lock_in: { rating: "strong", note: "Your code and your data. Managed services are swappable with effort." },
      portability: { rating: "workable", note: "Postgres and standard tooling travel well; managed-service specifics need planning." },
      expertise: { rating: "wrong_tool", note: "Needs continuous engineering. A business without that relationship should not be at this level." },
    },
  },

  layers: {
    presentation: {
      id: "presentation",
      name: "Presentation — what the visitor sees",
      purpose:
        "The interface itself. Every project has this layer; the only question is whether it is expressed in a visual editor or in code.",
      entries: [
        { tech: "Framer", what: "A hosted design tool that publishes a real site.", when: "Small, design-forward sites where the team wants to edit visually and nothing needs a backend." },
        { tech: "Webflow", what: "A visual builder with a CMS behind it.", when: "Marketing sites with repeating page types where the marketing team must own the pages." },
        { tech: "React", what: "The component library the custom work is written in.", when: "Any interface built as code — which in practice means anything at Level 3 or above." },
        { tech: "Next.js", what: "The React framework: routing, rendering strategy, metadata, images, API routes.", when: "Custom sites and applications where search, performance or application state matter." },
      ],
      caution:
        "Choosing a framework before knowing whether the site needs one. Next.js is an excellent answer to questions a five-page brochure site never asks.",
    },

    content: {
      id: "content",
      name: "Content — where words and images live",
      purpose:
        "Where editable content is stored and modelled. Needed the moment content changes on a schedule or by someone who is not a developer.",
      entries: [
        { tech: "Built-in CMS (Framer, Webflow, Shopify)", what: "Collections inside the platform.", when: "The site and the content live on the same platform, which covers most businesses." },
        { tech: "WordPress", what: "A mature CMS with a large editorial ecosystem.", when: "Large editorial teams, an existing WordPress capability, or a genuinely useful plugin." },
        { tech: "Sanity / headless CMS", what: "Content as structured data, delivered by API.", when: "A custom front end, or content that must feed more than one surface." },
        { tech: "Markdown in the repository", what: "Content as files, versioned with the code.", when: "Developer-authored content — documentation, changelogs — where review through pull requests is a feature." },
      ],
      caution:
        "Building a custom CMS. Editorial software is a solved problem, and a bespoke admin panel is worse on the day it ships than the thing you did not buy.",
    },

    commerce: {
      id: "commerce",
      name: "Commerce — catalogue, checkout, orders",
      purpose:
        "Everything between a product existing and money arriving: variants, inventory, cart, checkout, tax, shipping, fulfilment, returns.",
      entries: [
        { tech: "Shopify", what: "Hosted commerce, including a checkout that is maintained for you.", when: "Almost every store. The default until a specific requirement breaks it." },
        { tech: "Shopify headless (Storefront API)", what: "Shopify's commerce engine behind a custom storefront.", when: "The brand experience is a differentiator — while keeping Shopify's checkout." },
        { tech: "WooCommerce", what: "Commerce as a WordPress plugin.", when: "Already committed to WordPress, modest catalogue, someone accountable for maintenance." },
        { tech: "Custom commerce", what: "Your own catalogue, cart and order model.", when: "Contract pricing, rentals, configurators, marketplaces, or an ERP that must be the source of truth." },
      ],
      caution:
        "Confusing “headless” with “custom checkout”. Headless commerce means you built the storefront. Rebuilding checkout is a separate, much larger and much riskier decision.",
    },

    data: {
      id: "data",
      name: "Data — what persists",
      purpose:
        "Where records live when they must survive, be queried, and belong to someone. This layer is empty on most business websites, and that is the correct outcome.",
      entries: [
        { tech: "PostgreSQL", what: "The relational database almost every serious application ends up on.", when: "Anything with users, records, history or reporting." },
        { tech: "Supabase", what: "Managed Postgres with authentication, storage, realtime and row-level security.", when: "Applications that want a real database without running one — the usual choice at Level 4." },
        { tech: "The CMS's own storage", what: "Content, already stored and already queryable.", when: "The content is the only thing that persists — which is most sites." },
      ],
      caution:
        "Adding a database because the project feels like it should have one. If nothing is stored per user, this layer stays empty and the project stays cheaper to own.",
    },

    auth: {
      id: "auth",
      name: "Authentication — who is signed in",
      purpose:
        "Identity, sessions and permissions. Introducing this layer is the single largest step up the ladder, because it brings responsibility for other people's data with it.",
      entries: [
        { tech: "Supabase Auth", what: "Accounts, sessions and access rules alongside the database.", when: "You are already using Supabase and want access control enforced at the data layer." },
        { tech: "Clerk / Auth.js", what: "Dedicated identity providers.", when: "Social sign-in, organisations, invitations or SSO are requirements." },
        { tech: "Platform accounts (Shopify, Circle, a membership product)", what: "Someone else's login, someone else's liability.", when: "The requirement is content or orders behind a login — which it usually is." },
      ],
      caution:
        "Writing your own authentication. Sessions, resets, rate limiting, breach handling and privacy law are all in scope the moment you do, and none of it is where your product is different.",
    },

    payments: {
      id: "payments",
      name: "Payments — taking money",
      purpose:
        "Processing money. Deliberately separate from commerce: taking a deposit is not the same problem as running a store, and conflating them is how businesses end up with a store they did not need.",
      entries: [
        { tech: "Stripe", what: "Payments, subscriptions, invoices, hosted checkout.", when: "Deposits, service payments, subscriptions, or an application that bills — anywhere without a full catalogue." },
        { tech: "Shopify Payments", what: "Payments inside the commerce platform.", when: "You are running a store; it is already there." },
        { tech: "A payment link", what: "A hosted page you send someone.", when: "Occasional or one-off payments. The correct answer far more often than a checkout is." },
      ],
      caution:
        "Building a store to take four payments a month. Stripe on a Level 1 site handles that for the cost of an afternoon and no ongoing platform fee.",
    },

    email: {
      id: "email",
      name: "Email — messages the system sends",
      purpose:
        "Transactional mail: confirmations, receipts, password resets, notifications. Distinct from marketing email, and it must arrive.",
      entries: [
        { tech: "Resend", what: "Developer-focused transactional email with a real deliverability posture.", when: "Any custom build that sends mail on its own." },
        { tech: "Platform email", what: "Whatever the builder or store sends already.", when: "Form notifications and order confirmations on a hosted platform." },
      ],
      caution:
        "Sending transactional mail from an inbox provider or an unauthenticated domain. Without SPF, DKIM and DMARC, password resets land in spam and nobody finds out until a customer complains.",
    },

    hosting: {
      id: "hosting",
      name: "Hosting and delivery",
      purpose: "Where the site actually runs, and how quickly it reaches people.",
      entries: [
        { tech: "The platform itself", what: "Framer, Webflow and Shopify host what they build.", when: "Levels 1 and 2. There is no hosting decision to make, which is a feature." },
        { tech: "Vercel", what: "Managed hosting for Next.js, with previews and edge delivery.", when: "Custom front ends and applications, where deploy previews change how review works." },
        { tech: "Traditional managed hosting", what: "A server someone maintains.", when: "WordPress. Choose a host that handles updates and backups, or budget for someone who does." },
      ],
      caution:
        "Hosting in the agency's account. Whatever the stack, the hosting, domain and DNS should be in the business's own name — it is what makes every other decision reversible.",
    },

    measurement: {
      id: "measurement",
      name: "Measurement — knowing whether it worked",
      purpose:
        "The layer that decides whether any of the others were worth it. Independent of the stack, and routinely the last thing anyone sets up.",
      entries: [
        { tech: "Google Analytics 4", what: "Traffic, sources and conversions.", when: "Always, with consent handled properly." },
        { tech: "Google Search Console", what: "What the site is actually found for, and what Google cannot index.", when: "Always. It is free, and it is the only first-party view of search." },
        { tech: "Microsoft Clarity", what: "Session recordings and heatmaps.", when: "Diagnosing why a page that gets traffic does not convert." },
      ],
      caution:
        "Analytics that measure sessions but not the enquiry. If the form submission is not a tracked event, the site cannot be improved on evidence and every argument about it becomes a matter of taste.",
    },

    source: {
      id: "source",
      name: "Source control and process",
      purpose:
        "Where the code lives and how changes reach production. Only present from Level 3 up — and from there it is not optional.",
      entries: [
        { tech: "GitHub", what: "Version history, review, and the record of why things changed.", when: "Any custom build. Also your insurance policy against a single point of human failure." },
        { tech: "Preview deployments", what: "Every change gets a URL before it is live.", when: "Custom front ends — it changes review from a description into something you can click." },
      ],
      caution:
        "Custom code with no repository the business can reach. If the only copy is on a contractor's laptop, you do not own the site regardless of what the invoice said.",
    },
  },

  myths: {
    database: {
      id: "database",
      claim: "…a database",
      usually:
        "A brochure site stores nothing. Contact forms send an email. Blog posts live in the CMS. Products live in the commerce platform. If nothing has to be written, read back and tied to a specific person, there is nothing for a database to do — and it will still need backups, migrations and someone who understands it.",
      justifiedWhen: [
        "Users have accounts and see records that belong to them.",
        "The business needs to query its own data in ways a CMS cannot express.",
        "Something must persist between sessions — saved work, progress, order history you control.",
        "Uploaded documents or media must be associated with a person or an organisation.",
      ],
      instead:
        "Let the CMS be the database for content and the commerce platform be the database for products. Send form submissions to email and a CRM.",
    },

    auth: {
      id: "auth",
      claim: "…user accounts",
      usually:
        "Logins get added because they feel professional, and then nobody signs in. Every account you create is a password to reset, a session to secure, a privacy obligation, and something to delete when someone asks. Gating content that is not worth the friction reliably reduces the audience for it.",
      justifiedWhen: [
        "People must see data that is genuinely theirs and must not see anyone else's.",
        "Access is what you sell — membership, a course, a subscription.",
        "Staff use the system and their actions need to be attributable.",
      ],
      instead:
        "Send the file. Use a shared drive or workspace for client documents. If it is genuinely a members' area, start with a membership product before you build identity yourself.",
    },

    "custom-ecommerce": {
      id: "custom-ecommerce",
      claim: "…custom ecommerce",
      usually:
        "Checkout looks like a form and is not. Tax across jurisdictions, address validation, fraud screening, PCI scope, payment method coverage, failed-card retries, refunds and chargebacks are years of work that improve without you on a hosted platform. The best realistic outcome of rebuilding it is parity — and then you own it forever.",
      justifiedWhen: [
        "Pricing is negotiated per customer or per contract.",
        "You rent rather than sell, with availability, returns and condition to track.",
        "Products are configured rather than chosen, with dependent options and priced rules.",
        "It is a marketplace: third-party sellers, split payouts, their own inventory.",
        "An ERP or PIM must remain the source of truth and the storefront must follow it.",
      ],
      instead:
        "Run Shopify and put the money into the theme, the product data and merchandising. If the storefront experience is genuinely a differentiator, go headless — and keep Shopify's checkout.",
    },

    "custom-cms": {
      id: "custom-cms",
      claim: "…a custom CMS",
      usually:
        "“Our content is unusual” is nearly always “our content model was never written down”. Editorial software has decades of usability work in it — drafts, roles, scheduling, media, previews, revision history — and a bespoke admin panel starts behind on all six and falls further behind every year.",
      justifiedWhen: [
        "The content model is genuinely unrepresentable in a configurable CMS — deeply relational, versioned in an unusual way, or regulated.",
        "Editing IS the product, as it is for a publishing tool.",
      ],
      instead:
        "Model the content properly in a headless CMS. Almost every “we need a custom CMS” conversation ends with a well-designed schema in an existing one.",
    },

    microservices: {
      id: "microservices",
      claim: "…microservices",
      usually:
        "Microservices solve an organisational problem: many teams needing to deploy independently. For one team, they convert simple function calls into network calls that can fail, and turn one deployment into several. A single well-structured application will carry a business much further than most architecture diagrams suggest.",
      justifiedWhen: [
        "Multiple teams genuinely block each other on releases.",
        "One measured component has resource needs so different that it must scale separately.",
        "A regulatory boundary requires physical separation of a subsystem.",
      ],
      instead:
        "Build a well-organised single application with clear internal boundaries. Splitting something that works is straightforward; assembling something that never worked is not.",
    },

    ai: {
      id: "ai",
      claim: "…an AI layer",
      usually:
        "AI added because it is expected produces a chatbot that answers worse than the FAQ page, and a support cost. The useful question is never “where can we add AI” but “which repeated judgement is expensive, tolerant of review, and happening often enough to matter”.",
      justifiedWhen: [
        "A repeated task requires reading unstructured input and making a judgement — triaging enquiries, extracting fields from documents, classifying tickets.",
        "The volume is high enough that a percentage improvement is real money.",
        "A person can review the output, and a wrong answer is recoverable.",
      ],
      instead:
        "Fix the content first — a clear pricing page outperforms a chatbot that explains pricing. Then automate the specific, boring, high-volume judgement rather than adding a general-purpose assistant.",
    },

    headless: {
      id: "headless",
      claim: "…a headless architecture",
      usually:
        "Going headless doubles the number of systems you maintain and the number of places a change has to be made. It is bought for performance far more often than it is needed for it — most slow sites are slow because of images, third-party scripts and plugin sprawl, none of which the architecture fixes.",
      justifiedWhen: [
        "Content must feed more than one surface — a site, an app, in-store displays, a partner feed.",
        "The front end is genuinely bespoke and the platform's output is the constraint you have measured.",
        "The content must survive several redesigns without being re-entered.",
      ],
      instead:
        "Measure first. Fix images, scripts and hosting on the platform you have; if it is still the constraint after that, the case for headless will be specific rather than aspirational.",
    },

    "mobile-app": {
      id: "mobile-app",
      claim: "…a mobile app",
      usually:
        "An app has to be installed, updated, reviewed and shipped through two app stores, and it starts with an audience of zero. Unless there is a reason to be on the home screen, a fast responsive website reaches everyone immediately and can be changed the same afternoon.",
      justifiedWhen: [
        "You need something only a device provides — offline use, push notifications, camera or location in the background.",
        "Usage is habitual and frequent enough that the home-screen icon is worth the install friction.",
        "Distribution through the app stores is itself the channel.",
      ],
      instead:
        "Build a fast, properly responsive site first. If installability is the only requirement, a progressive web app covers a surprising amount of it without two more codebases.",
    },
  },

  questions: {
    selling: {
      prompt: "Will people pay you through the website?",
      help: "Money changing hands on the site — not an invoice you send afterwards.",
      answers: {
        no: { label: "No", blurb: "Enquiries, calls, quotes, or payment handled elsewhere" },
        occasional: {
          label: "Occasionally, or for just a few things",
          blurb: "Deposits, a handful of items, a course, an invoice",
        },
        catalogue: { label: "Yes — a real catalogue", blurb: "Products with variants, stock and shipping" },
        subscription: {
          label: "Yes — recurring access to something",
          blurb: "A subscription, a membership, software",
        },
      },
    },

    commerce_fit: {
      prompt: "Does anything about how you sell break a normal store?",
      help: "Not “are you special” — whether the mechanics differ from choosing an item, paying and having it shipped.",
      answers: {
        normal: { label: "No, it's a normal store", blurb: "Choose, pay, ship or collect" },
        content: {
          label: "Normal, but we publish seriously too",
          blurb: "Editorial, guides and campaigns alongside the catalogue",
        },
        unusual: {
          label: "Yes, genuinely",
          blurb: "Per-customer pricing, rentals, configurators, a marketplace, or an ERP in charge",
        },
      },
    },

    accounts: {
      prompt: "Does anyone need to log in?",
      help: "Signing in to see or do something that belongs specifically to them.",
      answers: {
        no: { label: "No", blurb: "Everything on the site is public" },
        clients: { label: "Our customers, to see their own things", blurb: "Files, bookings, orders, progress" },
        staff: { label: "Only our team, internally", blurb: "An operations tool rather than a website" },
        public: { label: "Anyone can sign up", blurb: "Self-serve, and billed automatically" },
      },
    },

    portal_scope: {
      prompt: "Could a product you can buy already do most of that?",
      help: "A client portal in your CRM, a course platform, a membership tool, a shared workspace.",
      answers: {
        maybe: { label: "Probably — we haven't really looked", blurb: "The requirement sounds fairly standard" },
        no: {
          label: "No — we've looked, and nothing fits",
          blurb: "The data or the rules are specific to how we work",
        },
      },
    },

    editing: {
      prompt: "Who changes the website, and how often?",
      answers: {
        rarely: { label: "Rarely, and asking someone is fine", blurb: "A few changes a year" },
        team: { label: "Our team publishes regularly", blurb: "Non-technical people, without waiting for a developer" },
        editorial: {
          label: "Several editors, with a real workflow",
          blurb: "Drafts, review, scheduling, categories, media",
        },
      },
    },

    workflow: {
      prompt: "Is there a process you run by hand that no tool you own handles?",
      help: "Quoting, dispatch, approvals, reconciliation — the spreadsheet everyone knows is a problem.",
      answers: {
        no: { label: "No, our tools cover it", blurb: "Or the gaps are minor" },
        manual: { label: "Yes, and it costs us real time", blurb: "People re-keying things between systems" },
      },
    },

    search: {
      prompt: "How much of your business depends on being found in search?",
      answers: {
        known: { label: "Not much", blurb: "People arrive knowing our name — referrals, repeat, word of mouth" },
        channel: { label: "It's one of our main channels", blurb: "Service pages, locations, a blog worth publishing" },
        primary: {
          label: "It's the main channel",
          blurb: "Large page count, and rankings decide the month",
        },
      },
    },
  },

  outcomes: {
    "simple-site": {
      title: "A hosted builder is genuinely the right answer",
      stack: "Framer or Squarespace · your own domain · Google Business Profile · Analytics and Search Console",
      why: "Nothing you described needs a database, a login, a CMS or a deployment. It needs clear structure, credible design, fast pages and a form that reaches a person — and a hosted builder does all of that without creating anything for you to maintain. Spend the budget you just saved on photography and on writing the pages properly, which is what will actually decide whether the site works.",
      changesIf:
        "You start wanting many pages that share one structure — services by neighbourhood, a growing library — or search becomes a channel you compete in. That is the move to a CMS-driven site, and it is a real reason.",
      level: "l1",
      scenario: "simple-business",
    },

    "marketing-site": {
      title: "A CMS-driven marketing site",
      stack: "Webflow, or WordPress if your team already lives there · structured collections for repeating page types · consent-aware analytics",
      why: "You have repeating page types and a team that publishes — that is exactly what a CMS is for. The value is that a service page or a location page exists once as a structure, so producing the twentieth costs almost nothing and they all stay consistent. Choose Webflow if you want hosting and updates handled; choose WordPress if you already have the team, the plugins and someone accountable for maintenance.",
      changesIf:
        "Performance becomes commercially material, the design starts fighting the builder, or content has to feed a second surface. Then a custom front end with a headless CMS starts to pay for itself.",
      level: "l2",
      scenario: "marketing-seo",
    },

    "custom-marketing-site": {
      title: "A custom front end with a headless CMS",
      stack: "Next.js on Vercel · Sanity or an equivalent headless CMS · GitHub with preview deployments · Search Console and analytics wired to the enquiry, not the visit",
      why: "When rankings decide the month and the page count is large, the platform stops being a detail. You need control of what ships to the browser, of canonicals, redirects, structured data and — if you are bilingual — of hreflang and URL architecture. Separating content from presentation also means the next redesign does not mean re-entering years of content. This is the most expensive option that is not an application, and traffic is what justifies it.",
      changesIf:
        "Someone needs to log in and see data that is theirs. That is a different project with a database in it, and it should be scoped as one rather than added to this.",
      level: "l3",
      scenario: "marketing-seo",
    },

    publisher: {
      title: "A publishing stack, with the editorial workflow as the requirement",
      stack: "Headless CMS with roles, drafts and scheduling · Next.js front end · a media pipeline that handles sizes and formats properly",
      why: "With several editors, the editorial experience is a business requirement rather than a convenience: drafts, review, scheduling and a taxonomy that still makes sense at a thousand items. Separating content from presentation is what lets the archive stay fast, stay indexed and survive redesigns. If your team already knows WordPress and the performance requirements are ordinary, using it traditionally is a perfectly defensible answer — do not go headless for fashion.",
      changesIf:
        "Paywalls, subscriptions or reader accounts. That introduces users and things that belong to them, which is a level up and a different budget.",
      level: "l3",
      scenario: "publisher",
    },

    "payments-link": {
      title: "Take payments without building a store",
      stack: "Whatever level the site is already at · Stripe payment links or a hosted checkout · an invoice tool if you send invoices",
      why: "A handful of items, deposits or occasional payments is a payments problem, not a commerce problem. Stripe handles it on a Level 1 site for the cost of an afternoon, with no platform fee, no catalogue to maintain and no store to keep merchandised. Businesses routinely end up running an ecommerce platform for four transactions a month, and then paying to maintain it.",
      changesIf:
        "The catalogue grows, or you need stock, variants, shipping rules and order management. That is when a real commerce platform stops being overhead and starts being the cheaper option.",
      level: "l1",
      scenario: "ecommerce",
    },

    shopify: {
      title: "Shopify, and put the effort into the store rather than the plumbing",
      stack: "Shopify · a well-built theme · clean product data · Shopify Payments · email and abandoned-cart flows",
      why: "Nothing you described breaks a normal store, and checkout is the most expensive thing in commerce to build and the least visible. Tax, fraud, payment coverage, retries, refunds and PCI scope come maintained, and they improve without you. The money is far better spent on the theme, the product photography, the product data and the merchandising, because that is what customers actually respond to.",
      changesIf:
        "How you sell genuinely stops fitting — contract pricing, rentals, configurators, a marketplace, or an ERP that must be in charge. Then a custom storefront or custom commerce becomes a real conversation.",
      level: "l2",
      scenario: "ecommerce",
    },

    "shopify-content": {
      title: "Shopify for commerce, with a serious content layer",
      stack: "Shopify for catalogue and checkout · a custom or CMS-driven content experience · one navigation and one brand across both",
      why: "You are running two jobs at once: selling, and publishing well enough that content is a channel. Shopify handles the commerce; where it is weaker is editorial. The two workable answers are a strong content build inside Shopify, or a custom storefront that reads Shopify through its Storefront API — keeping Shopify's checkout either way. The decision hinges on how much editorial volume there really is, so count the articles you published last year before choosing.",
      changesIf:
        "The editorial operation is small in practice. Then keep everything in Shopify — a second system you maintain for six posts a year is a bad trade.",
      level: "l3",
      scenario: "ecommerce",
    },

    "headless-commerce": {
      title: "Commerce that a platform genuinely cannot express",
      stack: "Written scope before anything is built · Shopify's engine retained wherever possible · custom only for the part that is actually different",
      why: "Per-customer pricing, rentals, configurators, marketplaces and ERP-led catalogues are real reasons a normal store does not fit — and they are rarer than they are claimed, so the first job is confirming yours is one of them. Even then, the right shape is usually to keep as much of the platform as possible and build only the part that differs. Rebuilding checkout should be the last thing considered, not the first.",
      changesIf:
        "The unusual part turns out to be one step in an otherwise ordinary process. Ninety per cent bought and ten per cent built beats a hundred per cent built, every time.",
      level: "l4",
      scenario: "ecommerce",
    },

    "buy-before-build": {
      title: "Buy the portal before you build one",
      stack: "An existing product — your CRM's client portal, a course or membership platform, a shared workspace · your current website, unchanged",
      why: "What you described sounds like a solved problem, and solved problems are worth buying. A product gets you accounts, permissions, password resets, privacy handling and a support team, none of which is where your business is different. Building it instead means owning identity, access control and other people's data permanently. Look properly at what exists first — and if nothing fits, you will be able to say exactly why, which makes the custom build far better specified.",
      changesIf:
        "You look and genuinely nothing fits, because the data or the rules are specific to how you work. Then a custom portal is justified, and you will scope it from what the products got wrong.",
      level: "l2",
      scenario: "membership",
    },

    portal: {
      title: "A client portal — an application with a website beside it",
      stack: "Next.js · Supabase or Postgres with access rules per row · authentication you did not write yourself · Stripe if it is billed · Resend for transactional email",
      why: "Once data belongs to a specific person, you have taken on access control, session handling, privacy obligations and deletion requests. That is why this rung exists and why it is not a feature you add to a marketing site. Use managed services for the parts that are the same in every product — identity, billing, email — and build only what is specific to you. Keeping the public marketing site on a simpler platform is usually the right call, so content changes never need a deployment.",
      changesIf:
        "Anyone can sign up unattended and is billed automatically, with organisations that must never see each other's data. That is a product, and it needs the full Level 5 set.",
      level: "l4",
      scenario: "membership",
    },

    "internal-tool": {
      title: "An internal tool — the cheapest custom software there is, if scoped honestly",
      stack: "Configure an existing platform where you can · otherwise Next.js over Postgres, with roles and an audit trail · integrations to the systems that already hold the data",
      why: "The users are your own staff, so the interface can be plain and the edge cases can be handled by a person — which makes internal tools unusually good value when the process really is unusual. The risk is scope: the request is often for a system that replaces four tools, when what removes the pain is one screen that eliminates one repeated hour a week. Build that screen first, and be honest about whether an existing platform configured well would beat it.",
      changesIf:
        "You would sell it to others. That is a different business with different requirements — multi-tenancy, self-serve billing, support — and it belongs at Level 5.",
      level: "l4",
      scenario: "internal-tools",
    },

    saas: {
      title: "A product, not a website",
      stack: "Next.js on Vercel · Postgres via Supabase with tenant isolation · Supabase Auth or Clerk · Stripe subscriptions · Resend · GitHub with previews and staging · error tracking and uptime alerting",
      why: "This is the case where custom architecture is the obvious answer, because the software is what you sell. The discipline that matters is not “should this be custom” but “how little can we build for version one”. Buy authentication, billing, email and monitoring; build only the part customers pay for. Teams that write their own auth and billing to save subscription fees routinely lose a quarter to it and inherit the security burden permanently. Skip microservices — a single well-structured application will take you much further than the architecture diagrams suggest.",
      changesIf:
        "The product hypothesis is not yet proven. A concierge version behind a form and a spreadsheet answers the question that matters for a fraction of the cost.",
      level: "l5",
      scenario: "saas",
    },

    "separate-system": {
      title: "Two projects, not one bigger website",
      stack: "Keep the website at the simplest level that serves it · scope the workflow separately: an automation if data just needs to move, an internal tool if the process needs to be encoded",
      why: "This is the most valuable answer this tool gives. A painful manual process is a reason to build software; it is not a reason to rebuild the website around it. Folding them together produces a site that needs a developer to change a phone number and a tool that inherits the constraints of a marketing site. Keep them separate: the site stays cheap to own and easy to edit, and the workflow gets scoped on its own merits — where the first question is whether an existing product or a simple automation already solves it.",
      changesIf:
        "The workflow turns out to be data moving between two tools you already pay for. That is an automation measured in days, not a system.",
      level: "l4",
      scenario: "internal-tools",
    },
  },
};
