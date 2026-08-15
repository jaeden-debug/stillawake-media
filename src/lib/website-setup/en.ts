import type { GuideContent } from "./types";

/**
 * The English guide.
 *
 * Written to answer "what should my website consist of", and deliberately not
 * "what should it be built with". Where a technology genuinely is the shortest
 * honest answer — payments, scheduling, email delivery — the guide says *buy
 * the proven thing*, which is a requirements decision, not a stack decision.
 */
export const EN: GuideContent = {
  locale: "en",
  path: "/website-setup-guide",
  otherPath: "/fr/guide-site-web-entreprise",

  meta: {
    title: "What Kind of Website Does My Business Actually Need?",
    description:
      "A requirements-first guide for business owners: the questions that decide what your website must consist of, the nine shapes a business website can take, whether you need a CMS, and what every extra capability costs you forever. Technology comes last.",
    ogTitle: "What kind of website does your business actually need?",
    ogDescription:
      "Nine shapes of business website, the questions that pick between them, and the lifecycle cost of every capability you add. Requirements first, technology last.",
  },

  hero: {
    eyebrow: "Planning guide",
    h1: "What kind of website does your business actually need?",
    standfirst:
      "Most website projects start with a platform and work backwards. That is the wrong order, and it is why so many businesses end up paying to maintain capability they never use. This guide starts where the decision actually lives: what has to happen, for whom, and how often.",
    answer:
      "Your website needs to be whatever shape lets the specific thing your business needs to happen, happen — and nothing more. For most businesses that is a lead-generation site: pages that explain the offer, forms that reach a human, and measurement that shows which pages produce enquiries. You only need a store, a booking engine, accounts, a portal or an application when a real business process cannot run without one. Every capability beyond that adds permanent cost in security, testing, hosting, upgrades, training and maintenance — so a feature should exist because it produces business value, not because it can be built.",
  },

  flow: {
    title: "Requirements before technology",
    intro:
      "There is a sequence to this decision, and every layer is derived from the one above it. Choosing WordPress, Shopify, Framer, Next.js or Supabase before you have worked down this list reverses the process: you commit to a set of constraints first, then discover what your business needed second.",
    steps: [
      {
        label: "Business goal",
        body: "The commercial outcome, stated as a number if you have one. More qualified enquiries. Fewer phone calls about availability. Orders that do not need a person to process them.",
      },
      {
        label: "User action",
        body: "The single thing a visitor must do for that outcome to occur. Submit an enquiry. Complete a checkout. Reserve a time. Log in and download a document.",
      },
      {
        label: "Feature requirements",
        body: "What has to exist for that action to be possible. A form that validates and delivers. A cart that survives a page reload. An availability calendar that cannot double-book.",
      },
      {
        label: "Content requirements",
        body: "What has to be on the page for someone to take the action, how much of it there is, and how often it changes. This is where the CMS question gets decided, not later.",
      },
      {
        label: "Integrations",
        body: "Where the data has to go afterwards. A CRM, an accounting system, an inventory system, a scheduler, an email platform. Anything the business already runs and is not going to abandon.",
      },
      {
        label: "Admin requirements",
        body: "Who edits what, who approves it, and what they must never be able to break. Also: who is on the hook when it goes wrong at 19:00 on a Friday.",
      },
      {
        label: "Security & data",
        body: "What personal or financial data is collected, where it lives, who can reach it, and what obligation that creates. Accounts and payments both convert a website into a system holding other people's data.",
      },
      {
        label: "Scale",
        body: "What breaks at ten times the traffic, ten times the catalogue, or ten times the users — and whether that is a realistic year or a fantasy quarter.",
      },
      {
        label: "Technology",
        body: "Only now. The stack is a consequence of the eight answers above; if two platforms both satisfy them, the difference between the platforms is not the important decision on the table.",
      },
    ],
    warning:
      "If someone quotes you a platform before asking you at least the first five, they are selling what they already build. That can still be the right answer — it is just not yet an argument.",
    handoff: {
      label: "Once you have the eight answers, choose the technology",
      href: "/choosing-website-technology",
    },
  },

  finder: {
    title: "Start with the business, not the software",
    intro:
      "Tick everything that is true about your business. Nothing is stored, nothing is sent, and the result updates as you go. The point is not the recommendation at the end — it is that each statement changes the build in a specific way, and you can see which ones you are actually signing up for.",
    groups: [
      {
        id: "outcome",
        name: "What the website is for",
        intro:
          "The first question is not what the website should have. It is what should be different in the business because the website exists.",
      },
      {
        id: "selling",
        name: "Money and transactions",
        intro:
          "Anything that takes money, holds stock or reserves time turns a website into an operational system. That is a different category of thing to own — and usually the point at which buying proven software beats building it.",
      },
      {
        id: "people",
        name: "Accounts and access",
        intro:
          "The moment someone logs in, you own identity, permissions, password resets, session security and other people's data. It is the single largest jump in cost and obligation on this page.",
      },
      {
        id: "content",
        name: "Content and editing",
        intro:
          "How often content changes, and who changes it, decides whether you need a content management system at all — and if so, what kind. This is a workflow question, not a software preference.",
      },
      {
        id: "systems",
        name: "The rest of your business software",
        intro:
          "A website that does not connect to how the business already runs creates work instead of removing it. Integrations are also where most projects lose their schedule.",
      },
      {
        id: "scale",
        name: "Growth and upkeep",
        intro:
          "Two questions that quietly overrule the others: what happens if this works, and who maintains it when it does.",
      },
    ],
    questions: [
      {
        id: "credibility",
        group: "outcome",
        ask: "People check us out online before deciding to trust us.",
        decides:
          "That the site's job is proof, not persuasion — clear services, real work, real people, and contact details that are easy to find. This alone is satisfied by a handful of well-built pages.",
        implies: ["brochure"],
        weight: 0,
      },
      {
        id: "leads",
        group: "outcome",
        ask: "Its main job is to turn strangers into enquiries.",
        decides:
          "That conversion becomes a measurable requirement, not a hope: forms that reach a human reliably, pages per service or offer, and analytics that attribute enquiries to pages.",
        implies: ["lead-gen"],
        weight: 1,
      },
      {
        id: "organic",
        group: "outcome",
        ask: "People need to find us through search rather than referral.",
        decides:
          "That the site needs a content architecture rather than a page count — one page per real search intent, internal linking that connects them, structured data, and somewhere to publish new material without a developer.",
        implies: ["content", "lead-gen"],
        weight: 2,
        cms: "structured",
      },
      {
        id: "products",
        group: "selling",
        ask: "We sell products directly, and customers buy them on the site.",
        decides:
          "A catalogue, variants, tax and shipping rules, a checkout, refunds, and order records that finance can rely on. This is the largest single expansion of scope on this page.",
        implies: ["ecommerce"],
        weight: 3,
      },
      {
        id: "inventory",
        group: "selling",
        ask: "Stock levels have to be tracked and respected.",
        decides:
          "That the site is no longer the only source of truth. Stock lives somewhere — a POS, a warehouse system, a spreadsheet — and the website has to agree with it, continuously, or it will sell things you do not have.",
        implies: ["ecommerce"],
        weight: 3,
      },
      {
        id: "bookings",
        group: "selling",
        ask: "People reserve time, tables, rooms or appointments.",
        decides:
          "Availability rules, capacity, cancellations, reminders and time zones. Almost always cheaper and safer to integrate proven scheduling software than to build a calendar that must never double-book.",
        implies: ["booking"],
        weight: 2,
      },
      {
        id: "payments",
        group: "selling",
        ask: "Money has to change hands on the website.",
        decides:
          "A payment processor, receipts, failed-payment handling, refunds, and a compliance surface. Card data should never touch your own systems — that is a settled question, and the answer is a hosted processor.",
        implies: ["ecommerce", "booking", "membership"],
        weight: 2,
        duty: "Payment handling brings PCI obligations and a permanent security surface. Use a hosted processor so card data never reaches your servers.",
      },
      {
        id: "subscriptions",
        group: "selling",
        ask: "People pay us on a recurring basis for continued access.",
        decides:
          "Billing cycles, plan changes, dunning, expiry and access revocation. The billing logic is usually harder than the content it protects.",
        implies: ["membership"],
        weight: 3,
      },
      {
        id: "accounts",
        group: "people",
        ask: "Visitors need to log in as themselves.",
        decides:
          "Identity, sessions, password resets, permissions and account recovery — plus a permanent duty of care over whatever those accounts hold. If nothing behind the login is genuinely private, you may not need accounts at all.",
        implies: ["membership", "portal", "saas"],
        weight: 3,
        duty: "Accounts mean you are storing personal data. That carries privacy obligations and a breach-notification duty from day one.",
      },
      {
        id: "client-area",
        group: "people",
        ask: "Clients need a private area for their own documents, files or status.",
        decides:
          "A customer portal: per-customer data isolation, an audit trail, and permissions strict enough that one client can never see another's records. Isolation is the requirement — everything else is decoration.",
        implies: ["portal"],
        weight: 3,
        duty: "One customer seeing another's data is the failure mode here, and it is a reportable incident. Data isolation has to be designed, not assumed.",
      },
      {
        id: "staff",
        group: "people",
        ask: "Our own staff will use it to do their jobs.",
        decides:
          "An internal tool, which is a different product from a marketing website: it is judged on speed of use and accuracy, not on design impressions, and it usually should not live on the public site at all.",
        implies: ["internal"],
        weight: 3,
      },
      {
        id: "software",
        group: "people",
        ask: "The thing we are selling is the software itself.",
        decides:
          "That you are building a product with a marketing site attached, not a website with features. Those two need different budgets, different release cadences and usually different codebases.",
        implies: ["saas"],
        weight: 3,
      },
      {
        id: "frequent",
        group: "content",
        ask: "Content changes weekly or more often.",
        decides:
          "That editing cannot route through a developer. At that cadence the bottleneck is the process, not the technology.",
        implies: ["content"],
        weight: 1,
        cms: "light",
      },
      {
        id: "who-edits",
        group: "content",
        ask: "Someone non-technical has to change words and images without calling us.",
        decides:
          "A CMS with a genuinely usable editing interface — and a decision about what they are allowed to change, which matters more than which CMS you pick.",
        implies: ["content"],
        weight: 1,
        cms: "light",
      },
      {
        id: "approvals",
        group: "content",
        ask: "Changes need review or approval before they go live.",
        decides:
          "Drafts, scheduled publishing and roles. Approval workflow rules out the simplest options — it is one of the few genuine reasons to accept a heavier CMS.",
        implies: ["content"],
        weight: 2,
        cms: "structured",
      },
      {
        id: "languages",
        group: "content",
        ask: "It has to exist in more than one language.",
        decides:
          "Roughly double the content operation, plus canonical and hreflang wiring, plus a rule for what happens when one language falls behind. Machine-translating a page and leaving it is worse than not publishing it.",
        implies: ["content"],
        weight: 2,
        cms: "structured",
      },
      {
        id: "locations",
        group: "content",
        ask: "We serve several locations, cities or regions.",
        decides:
          "A page per location with genuinely different content, plus consistent business listings. Repeating one page with the city swapped is the most common way to make a site rank for nothing.",
        implies: ["content", "lead-gen"],
        weight: 1,
        cms: "structured",
      },
      {
        id: "structured",
        group: "content",
        ask: "We publish repeating things — services, staff, products, FAQs, case studies.",
        decides:
          "Structured content: records with fields and relationships, rather than pages with text in them. It is what makes a site expandable later without a rebuild.",
        implies: ["content"],
        weight: 1,
        cms: "structured",
      },
      {
        id: "crm",
        group: "systems",
        ask: "Enquiries must land in a CRM, not just an inbox.",
        decides:
          "A delivery path with retries and a record, because a form that silently fails is worse than no form. Also the point where lead source and attribution become possible.",
        implies: ["lead-gen"],
        weight: 1,
      },
      {
        id: "integrations",
        group: "systems",
        ask: "It has to exchange data with software we already run.",
        decides:
          "The largest source of schedule risk in most projects, because the other system's limits are discovered rather than designed. Whether an API exists — and what it can actually do — should be checked before anything is priced.",
        implies: ["portal", "internal"],
        weight: 2,
      },
      {
        id: "automation",
        group: "systems",
        ask: "Things should happen automatically after someone submits or buys.",
        decides:
          "Workflows with retries, failure alerts and a log. Automation that fails silently costs more than the manual step it replaced.",
        implies: ["internal", "lead-gen"],
        weight: 2,
      },
      {
        id: "reporting",
        group: "systems",
        ask: "Someone needs a dashboard or a recurring report out of it.",
        decides:
          "Which decision the report is for. Most reporting requests are satisfied by analytics that already exist; a custom dashboard is justified when it joins data from systems that do not talk to each other.",
        implies: ["internal"],
        weight: 2,
      },
      {
        id: "traffic",
        group: "scale",
        ask: "Traffic could realistically grow ten times in a year.",
        decides:
          "Less than people expect for a content site — static pages and a CDN absorb that without drama. Considerably more for anything with logins, carts or live queries, where the database is the thing that gives way first.",
        implies: ["content"],
        weight: 1,
      },
      {
        id: "neglect",
        group: "scale",
        ask: "Nobody here will maintain it. It has to survive being ignored.",
        decides:
          "A hard ceiling on complexity. This is a constraint rather than a feature: it does not add work, it limits how much work the finished thing is allowed to demand of you.",
        implies: ["brochure"],
        weight: 0,
        constraint: true,
      },
    ],
  },

  types: {
    title: "The nine shapes",
    intro:
      "Almost every business website is one of these, or a deliberate combination of two. They are described by what they require rather than by what they are built with, because the requirements are what you are committing to.",
    items: [
      {
        id: "brochure",
        name: "Brochure website",
        job: "Prove the business is real, competent and reachable.",
        sufficientWhen:
          "Work arrives by referral, phone or walk-in, and the website's job is to confirm that you exist and are worth calling. This is a legitimate answer, not a starter tier — a fast, well-written five-page site beats a neglected twenty-page one every time.",
        requires: [
          "Clear services, real proof of work, and human contact details",
          "Fast loading and a layout that works on a phone",
          "Correct business information wherever it appears online",
        ],
        mistake:
          "Adding a blog nobody will write, a shop with no products, and a booking system for a business that books by text — then paying to maintain all three.",
        links: [
          { label: "Why most agency websites feel cheap", href: "/stillawake-times/why-most-agency-websites-feel-cheap" },
          { label: "What a website quote should include", href: "/stillawake-times/what-a-website-quote-should-include" },
        ],
      },
      {
        id: "lead-gen",
        name: "Lead generation website",
        job: "Turn traffic into enquiries you can attribute and measure.",
        sufficientWhen:
          "The sale happens in a conversation, not in a checkout — services, trades, professional firms, consultancies, agencies, B2B. This is what most businesses actually need, and where most website budgets are best spent.",
        requires: [
          "A page per service or offer, written to be found and to answer objections",
          "Forms that validate, reach a human, and are protected against spam",
          "Analytics and conversion tracking that attribute enquiries to pages",
          "Somewhere the enquiry lands and is followed up — an inbox is a system too",
        ],
        mistake:
          "Measuring traffic instead of enquiries. A page that ranks and converts nobody is a cost centre with good posture.",
        links: [
          { label: "Why most business websites fail to generate leads", href: "/stillawake-times/why-most-business-websites-fail-to-generate-leads" },
          { label: "What makes a high-converting website", href: "/stillawake-times/what-makes-a-high-converting-website" },
        ],
      },
      {
        id: "content",
        name: "SEO / content website",
        job: "Earn traffic continuously by owning the questions your buyers ask.",
        sufficientWhen:
          "Your market searches before it buys, and you can commit to publishing for a year rather than a quarter. Without that commitment this shape is the most expensive way to own an empty archive.",
        requires: [
          "A content architecture: one page per intent, deliberately internally linked",
          "A CMS someone will actually use, with structured content types",
          "Structured data, clean URLs, and a sitemap that stays accurate",
          "A publishing rhythm, and someone whose job it is",
        ],
        mistake:
          "Publishing volume instead of coverage. Fifty thin posts compete with each other; ten pages that genuinely answer a question do not.",
        links: [
          { label: "Why internal linking is so powerful", href: "/stillawake-times/why-internal-linking-is-one-of-the-most-powerful-seo-strategies" },
          { label: "SEO services", href: "/seo-canada" },
        ],
      },
      {
        id: "ecommerce",
        name: "Ecommerce website",
        job: "Sell products without a person handling the transaction.",
        sufficientWhen:
          "You have products, stock and a fulfilment process. If you have three products and sell mostly in person, a page and a payment link may serve you better than a store.",
        requires: [
          "Catalogue and variants, with product content that actually sells",
          "Stock that agrees with reality, wherever reality is kept",
          "Checkout, tax, shipping rules, refunds and order records",
          "Fulfilment, returns and customer service — the parts that are not software",
        ],
        mistake:
          "Treating the store as the project and the product pages as filler. The catalogue is the website; everything else is navigation.",
        buyInstead:
          "For most merchants, a hosted commerce platform is the correct answer: checkout, payment compliance and security become someone else's problem. Building a bespoke checkout is justified when a business rule genuinely cannot be expressed on a platform — not because the platform is unfashionable.",
        links: [
          { label: "Shopify vs WooCommerce", href: "/shopify-vs-woocommerce" },
          { label: "Shopify development", href: "/shopify-development" },
          { label: "When you outgrow Shopify", href: "/stillawake-times/when-you-outgrow-shopify" },
        ],
      },
      {
        id: "booking",
        name: "Booking website",
        job: "Let people reserve time or capacity without a phone call.",
        sufficientWhen:
          "Availability is the thing customers actually want to know, and answering it manually is costing you hours or bookings.",
        requires: [
          "Availability and capacity rules that cannot be violated",
          "Confirmations, reminders, cancellations and no-show handling",
          "Whatever your staff already use to see the day's schedule",
        ],
        mistake:
          "Building a reservation engine. Double-booking, time zones, daylight saving and cancellation policy are solved problems with expensive edge cases.",
        buyInstead:
          "Integrate proven scheduling or reservation software and design the site around it. Restaurants in particular should assume the reservation platform is infrastructure, not a feature — guests arrive through it, and rebuilding it buys you nothing a guest can see.",
        links: [{ label: "AI automation", href: "/ai-automation" }],
      },
      {
        id: "membership",
        name: "Membership website",
        job: "Sell continued access to something, and revoke it when payment stops.",
        sufficientWhen:
          "There is genuinely valuable material or community behind the gate and a recurring reason to return. Otherwise you have built a paywall around a library nobody visits twice.",
        requires: [
          "Accounts, subscription billing, plan changes and cancellations",
          "Access control that is enforced on the server, not hidden in the interface",
          "A retention plan, because churn — not signup — decides whether this works",
        ],
        mistake:
          "Gating content that was better used to attract customers. Some material earns more in public than behind a login.",
        links: [{ label: "Custom software development", href: "/software-development" }],
      },
      {
        id: "portal",
        name: "Customer portal",
        job: "Give each customer their own information and workflow, privately.",
        sufficientWhen:
          "Customers currently email you for status, documents or history, and answering costs real staff time. The portal is justified by the volume of those requests, not by how modern it looks.",
        requires: [
          "Strict per-customer data isolation, designed and then tested",
          "Authentication, permissions, an audit trail and account recovery",
          "Integration with wherever the real data lives today",
          "A support path for the day someone cannot get in",
        ],
        mistake:
          "Building the portal before the process. If the internal process is inconsistent, the portal makes the inconsistency visible to customers.",
        links: [
          { label: "What is a custom web application?", href: "/stillawake-times/what-is-a-custom-web-application" },
          { label: "Custom software development", href: "/software-development" },
        ],
      },
      {
        id: "internal",
        name: "Internal business tool",
        job: "Let staff do the work faster and with fewer mistakes.",
        sufficientWhen:
          "A process runs on spreadsheets and memory, breaks when the person who knows it is away, and costs more in errors than it would cost to build.",
        requires: [
          "A process that is written down and agreed before anything is built",
          "Roles, permissions and a record of who changed what",
          "Speed of use over visual polish — this is a tool, not a brochure",
          "Training, and someone who owns it after launch",
        ],
        mistake:
          "Rebuilding software you could buy. The case for building is fit — when the way you work is the advantage and off-the-shelf tools force you to work like everyone else.",
        buyInstead:
          "If a standard product covers eighty per cent of the process, buy it and build only the part that is genuinely yours.",
        links: [
          { label: "Do you actually need custom software?", href: "/do-i-need-custom-software" },
          { label: "Dashboards and internal tools", href: "/stillawake-times/how-modern-businesses-use-custom-dashboards-and-internal-tools" },
          { label: "Custom software development", href: "/software-development" },
        ],
      },
      {
        id: "saas",
        name: "SaaS / web application",
        job: "Deliver software as the product itself.",
        sufficientWhen:
          "People pay for what the software does, not for what your company does. At that point the website is marketing for a product, and the product is a separate build with its own roadmap.",
        requires: [
          "Product scope, a release process, and environments beyond production",
          "Accounts, billing, support, uptime expectations and a security posture",
          "A marketing site that can move at a different speed from the application",
        ],
        mistake:
          "Pricing it like a website. A questionnaire cannot scope a platform — the requirements are the expensive part, and they do not exist yet.",
        links: [
          { label: "What custom software costs in Canada", href: "/stillawake-times/custom-software-development-cost-canada" },
          { label: "Custom software development", href: "/software-development" },
        ],
      },
    ],
    hybrid:
      "Combinations are normal and often correct. A clinic is a lead-generation site plus integrated booking. A brand with wholesale accounts is a store plus a portal. A software company is a marketing site plus an application. What matters is that you know it is two things: they get separate scopes, separate release cadences, and usually separate budgets — and the marketing site should never be blocked waiting for the application.",
  },

  cms: {
    title: "Do you actually need a CMS?",
    intro:
      "A content management system is a workflow decision wearing a software label. Answer these before naming any product — the answers rule most of the options out.",
    deciders: [
      "Who edits — one owner, a marketing person, or several people across departments?",
      "What they edit — words and images, or structured records like services, staff and products?",
      "How often — a few times a year, monthly, or several times a week?",
      "Approvals — can the editor publish directly, or does something have to be reviewed first?",
      "Languages — one, or several that must stay in step with each other?",
      "Publishing — does anything need to be scheduled, embargoed or expired automatically?",
      "Structure — is the content repeating records with fields, or genuinely one-off pages?",
    ],
    options: [
      {
        name: "No CMS",
        what: "Content lives in the codebase and changes ship with a deployment.",
        justifiedWhen:
          "Content changes a handful of times a year and one person owns the site. Fastest and cheapest to run, with no admin surface to secure or upgrade.",
        cost: "Every wording change waits on a developer. That is fine at four changes a year and unbearable at forty.",
      },
      {
        name: "Hosted CMS",
        what: "An all-in-one platform where editing, hosting and templates come together.",
        justifiedWhen:
          "A non-technical owner needs to change most things themselves and the design does not need to be unusual. Lowest friction to edit, and the platform handles updates.",
        cost: "You inherit the platform's limits and its pricing, and unusual requirements get expensive quickly.",
      },
      {
        name: "Headless CMS",
        what: "Content lives in a separate system with an API; the site renders from it.",
        justifiedWhen:
          "Content is structured and reused — the same service record appearing on a listing, a detail page and a form — or several channels consume it, or several editors need roles and approvals.",
        cost: "Two systems to run, a modelling exercise up front, and a real difference between a good and a careless content model.",
      },
      {
        name: "Ecommerce CMS",
        what: "A commerce platform where products, inventory and orders are first-class and pages come along with them.",
        justifiedWhen:
          "Selling is the primary job. Products, stock, tax and checkout are handled by software whose entire purpose is that, and merchandising stays in the merchant's hands.",
        cost: "The content and blogging side is usually weaker than a dedicated CMS, so a heavy content strategy needs planning around it.",
      },
      {
        name: "Custom admin",
        what: "An editing interface built specifically for this business's records.",
        justifiedWhen:
          "The content is genuinely your domain — inventory with your rules, client records, scheduling constraints — and a general-purpose CMS would force staff to translate their work into someone else's model.",
        cost: "You now own an application, including its security, upgrades and training. Justified by daily use, not by preference.",
      },
    ],
    verdict:
      "The right answer is the lightest option that survives your actual editing pattern for two years. Most businesses over-buy here: they pay for a system built for a publishing team, then update the site twice a year through the developer anyway.",
  },

  control: {
    title: "What you should be able to change yourself",
    intro:
      "Ownership is not all-or-nothing. Some things should always be a few clicks away from the business owner; others should stay behind a development and deployment process, because changing them casually is how sites break, lose rankings, or quietly stop collecting enquiries.",
    rows: [
      { item: "Page copy and headlines", owner: "client", why: "Your offer changes faster than any release schedule." },
      { item: "Blog posts and articles", owner: "client", why: "Publishing cannot depend on someone else's availability." },
      { item: "Services and descriptions", owner: "client", why: "What you sell is yours to describe, and it changes." },
      { item: "Staff, bios and photos", owner: "client", why: "People join and leave; a stale team page reads as neglect." },
      { item: "Products, prices and stock", owner: "client", why: "Commercial decisions cannot wait on a deployment." },
      { item: "Images and galleries", owner: "client", why: "New work should be publishable the week it finishes." },
      { item: "Locations and opening hours", owner: "client", why: "Wrong hours cost you customers and damage local search." },
      { item: "FAQs", owner: "client", why: "They come from real customer questions, which arrive constantly." },
      { item: "URL structure and redirects", owner: "build", why: "Casual URL changes are the fastest way to lose accumulated rankings." },
      { item: "Page templates and layout system", owner: "build", why: "A drag-and-drop layout tends to degrade into an inconsistent one." },
      { item: "Structured data and metadata rules", owner: "build", why: "It has to stay consistent site-wide to mean anything to a search engine." },
      { item: "Forms, delivery and integrations", owner: "build", why: "A silently broken form is invisible; changes need testing, not confidence." },
      { item: "Analytics, consent and tracking", owner: "build", why: "It carries privacy obligations and breaks measurement when edited carelessly." },
      { item: "Access, permissions and payments", owner: "build", why: "Security changes need review. This is the one place where friction is the feature." },
    ],
  },

  complexity: {
    title: "The cost of complexity",
    intro:
      "Every capability has a lifecycle, and the build is the cheapest part of it. This is the arithmetic that decides whether a feature is worth having — not whether it can be built, which it almost always can.",
    costs: [
      { name: "Development", body: "The one cost everybody counts, and usually the smallest over five years." },
      { name: "Testing", body: "Every feature multiplies what has to be re-checked before anything ships." },
      { name: "Security", body: "Logins, uploads and payments each add a surface someone has to keep watching." },
      { name: "Hosting", body: "Databases, background jobs and file storage cost more than static pages, monthly, forever." },
      { name: "Monitoring", body: "Anything that can fail silently needs something watching it, or you find out from a customer." },
      { name: "Upgrades", body: "Dependencies age. Software that is never updated becomes software that cannot be updated." },
      { name: "Training", body: "Every admin interface has to be learned — again, each time staff change." },
      { name: "Maintenance", body: "Content drifts, integrations change their APIs, and browsers move on. Nothing stays finished." },
    ],
    rule: "A feature should exist because it produces business value, not because it can be built. If nobody can name the process it improves or the money it makes, it is not a feature — it is a liability with a nice interface.",
  },

  scenarios: {
    title: "Six businesses, reasoned through",
    intro:
      "The same sequence, applied to real situations. Note that none of these start from a platform, and two of them conclude that the ambitious version would be a waste of money.",
    items: [
      {
        id: "contractor",
        business: "Local contractor or trade",
        goal: "More qualified enquiries from the surrounding region, and fewer calls asking questions the site could answer.",
        requirements: [
          "A page per service, written the way customers describe the problem",
          "Proof: real project photos, real reviews, service area stated plainly",
          "A form and a click-to-call that both work on a phone in a truck",
          "Local search presence and consistent business listings",
        ],
        verdict:
          "A lead-generation site with light content editing. No database, no accounts, no store. The budget belongs in the service pages and the proof, because that is what decides whether the phone rings.",
        restraint:
          "No customer login, no quoting engine, no booking system. Quotes for this kind of work need a site visit, and a form that captures the job details does the same work with none of the upkeep.",
        links: [
          { label: "Local SEO", href: "/local-seo" },
          { label: "Web design", href: "/web-design-montreal" },
        ],
      },
      {
        id: "professional",
        business: "Law, accounting or professional firm",
        goal: "Be the obvious credible choice when someone researches a problem they have never had before.",
        requirements: [
          "Authority content answering the questions clients actually ask first",
          "Practice-area pages that map to how people search, not to the org chart",
          "Named people with real credentials — trust in these fields is personal",
          "A contact path that respects confidentiality and sets expectations",
        ],
        verdict:
          "An SEO and content website with lead generation attached, and a CMS with approval workflow — because in regulated professions someone senior has to sign off before anything is published.",
        restraint:
          "No client portal in the first phase. It is a legitimate second project once the document exchange volume justifies it, but it should never delay the site that brings the clients in.",
        links: [
          { label: "SEO services", href: "/seo-canada" },
          { label: "Answer engine optimization", href: "/answer-engine-optimization" },
        ],
      },
      {
        id: "restaurant",
        business: "Restaurant",
        goal: "Fill tables, and stop answering the phone to questions about hours and menus.",
        requirements: [
          "Menu, hours, address and parking — findable in under five seconds, on a phone",
          "Reservations, taken reliably at the moment someone decides to come",
          "Photography that makes the room look like the room",
          "Correct information on the map listing, which most people see first",
        ],
        verdict:
          "A marketing site with proven reservation infrastructure integrated into it. Guests arrive through the reservation platform your floor staff already trust; the website's job is to send them there without friction.",
        restraint:
          "Do not rebuild reservations. Double-booking, waitlists, deposits and no-show policies are solved problems whose edge cases are expensive, and a guest cannot tell who wrote the booking widget.",
        links: [{ label: "Web design", href: "/web-design-montreal" }],
      },
      {
        id: "clothing",
        business: "Online clothing brand",
        goal: "Sell directly, at margin, without a person touching each order.",
        requirements: [
          "Catalogue with variants, sizes and stock that agrees with the warehouse",
          "Checkout, taxes, shipping rules, returns and refunds",
          "Product content that does the selling — photography, fit, materials, care",
          "Email flows for abandoned carts and repeat purchase",
        ],
        verdict:
          "Ecommerce on a hosted commerce platform. Checkout, payment compliance and platform security stop being your problem, and the budget moves to product pages and brand — which is where the conversion difference actually lives.",
        restraint:
          "No custom checkout, and no bespoke inventory system before there is inventory. Revisit only when a specific business rule genuinely cannot be expressed on the platform.",
        links: [
          { label: "Shopify development", href: "/shopify-development" },
          { label: "Shopify vs WooCommerce", href: "/shopify-vs-woocommerce" },
        ],
      },
      {
        id: "travel",
        business: "Travel advisor or high-touch service",
        goal: "Attract qualified enquiries and stop losing hours to itinerary admin and status questions.",
        requirements: [
          "Destination and specialism content that earns search traffic",
          "An enquiry flow that qualifies before it books time in a calendar",
          "A CRM holding the client relationship, not a mailbox",
          "Somewhere clients can see their own itinerary and documents, eventually",
        ],
        verdict:
          "A hybrid, built in that order: content and lead generation first, then a client area once the volume of status emails proves the case. The public site earns the clients; the portal reduces the cost of serving them.",
        restraint:
          "Not both at once. A portal built before there are enough clients to fill it is maintenance without return, and it delays the part that produces revenue.",
        links: [
          { label: "Lisa Travel Design case study", href: "/work/lisa-travel-design" },
          { label: "Custom software development", href: "/software-development" },
        ],
      },
      {
        id: "operations",
        business: "Operations-heavy company",
        goal: "Win work publicly while replacing the spreadsheets the business actually runs on.",
        requirements: [
          "A credible public site that sells the capability",
          "An internal tool that matches the real process, written down first",
          "Roles, permissions and an audit trail",
          "Integration with the accounting or scheduling system already in use",
        ],
        verdict:
          "Two products: a public website and custom internal software. They share a brand and almost nothing else — different users, different success measures, different release cadence.",
        restraint:
          "Do not put staff tools behind a login on the marketing site to save money. It complicates the public site, constrains the tool, and gives both a worse security posture than either would have alone.",
        links: [
          { label: "Custom software development", href: "/software-development" },
          { label: "AI automation", href: "/ai-automation" },
        ],
      },
    ],
  },

  checklist: {
    title: "Your requirements checklist",
    intro:
      "Write an answer to each of these before you talk to anyone about building it. It takes an afternoon, it makes quotes comparable, and it is the difference between buying a website and commissioning one.",
    sections: [
      {
        name: "Goal and action",
        items: [
          "The commercial outcome, in one sentence, with a number if you have one",
          "The single action a visitor must take for that outcome to happen",
          "How you will know it worked, and who looks at that",
        ],
      },
      {
        name: "Features and content",
        items: [
          "The pages that must exist at launch, and who writes them",
          "The repeating content types — services, staff, products, locations, FAQs",
          "How often each changes, and who changes it",
          "Which languages, and who keeps the second one current",
        ],
      },
      {
        name: "Systems and admin",
        items: [
          "Every system this must exchange data with, and whether it has an API",
          "Where an enquiry or order goes after it is submitted",
          "Who edits, who approves, who has an account, and what each may never break",
        ],
      },
      {
        name: "Data, scale and upkeep",
        items: [
          "What personal or payment data is collected, and where it lives",
          "What realistic growth looks like in twelve months",
          "Who maintains it, on what budget, and who is called when it breaks",
          "What you are deliberately not building in phase one",
        ],
      },
    ],
    outro:
      "The last line is the one that saves the most money. A written list of what is out of scope is worth more than a longer list of what is in it.",
  },

  next: {
    title: "Where to go next",
    intro:
      "You have requirements. These are the next decisions, roughly in the order they matter.",
    links: [
      { label: "Now choose the technology", href: "/choosing-website-technology" },
      { label: "Estimate what this scope costs", href: "/tools/project-cost-calculator" },
      { label: "What a website costs in Canada", href: "/website-cost-canada" },
      { label: "Platform decision: Shopify vs WooCommerce", href: "/shopify-vs-woocommerce" },
      { label: "Website builders vs hiring someone", href: "/stillawake-times/website-builders-vs-hiring-someone" },
      { label: "Do you actually need custom software?", href: "/do-i-need-custom-software" },
      { label: "Custom software development", href: "/software-development" },
      { label: "What custom software costs", href: "/stillawake-times/custom-software-development-cost-canada" },
      { label: "Who owns the domain, hosting, code and accounts", href: "/website-ownership" },
      { label: "What ongoing maintenance covers", href: "/website-maintenance" },
      { label: "What a website quote should include", href: "/stillawake-times/what-a-website-quote-should-include" },
      { label: "Published pricing — no sales call", href: "/pricing" },
      { label: "Version française", href: "/fr/guide-site-web-entreprise" },
    ],
  },

  faqs: [
    {
      q: "What kind of website does my business actually need?",
      a: "Most businesses need a lead-generation website: pages that explain the offer, forms that reliably reach a human, and analytics that show which pages produce enquiries. You need a store when you sell products directly, a booking site when customers reserve time, accounts when something genuinely private sits behind a login, a portal when customers need their own records, and an application when the software itself is the product. Anything beyond what your business process actually requires adds permanent cost without adding revenue.",
    },
    {
      q: "How do I choose between a brochure site and a lead generation site?",
      a: "Ask where the work comes from. If it arrives by referral and the site's job is to confirm you are real, a brochure site is sufficient and a bigger one is waste. If you need strangers to become enquiries, you need conversion built in from the start: a page per service, forms that reach a human, and conversion tracking. The difference is measurement — a lead-generation site can tell you which pages produced enquiries, and a brochure site cannot.",
    },
    {
      q: "Do I need a CMS for my website?",
      a: "Only if someone non-technical needs to change content without a developer, or content changes more than a few times a year. If one person owns the site and it changes rarely, no CMS is the fastest and cheapest option. If content is structured and repeating — services, staff, products, locations — a structured or headless CMS earns its keep. If approvals or several languages are involved, that rules out the simplest options and is a genuine reason to accept a heavier one.",
    },
    {
      q: "Should I choose the platform before writing requirements?",
      a: "No. Choosing WordPress, Shopify, Framer, Next.js or Supabase before the requirements exist reverses the decision: you commit to a set of constraints first, then discover what the business needed second. Work down business goal, user action, features, content, integrations, admin, security, scale — and only then technology. If two platforms both satisfy those answers, the choice between them is not the important decision.",
    },
    {
      q: "When should I build something instead of buying it?",
      a: "Build when the way you work is the advantage and off-the-shelf software would force you to work like everyone else. Buy when the problem is already solved and its edge cases are expensive — payments, scheduling, email delivery and commerce checkout are the usual examples. If a standard product covers about eighty per cent of the process, buy it and build only the part that is genuinely yours.",
    },
    {
      q: "What happens to my website if traffic grows ten times?",
      a: "For a content or brochure site, much less than people expect: static pages served through a CDN absorb that without changes. The pressure appears when there are logins, carts or live database queries, where the database gives way before the pages do. The practical answer is to keep the public site static wherever possible and let the dynamic parts scale separately, which is an architecture decision, not a hosting upgrade.",
    },
  ],
};
