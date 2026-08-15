import type { GuideContent } from "./types";

/**
 * The English guide.
 *
 * SEARCH TARGETING (Google Keyword Planner, Canada, exact-keyword history,
 * checked 2026-08-15).
 *
 * The head terms are already owned by pages on this site and this guide
 * deliberately does not compete with them: "custom software development"
 * (260/mo, LOW competition) belongs to /software-development, and the
 * definitional query belongs to the existing Times article "What Is Custom
 * Software Development?". Writing a fourth page for those would be
 * cannibalisation dressed up as coverage.
 *
 * What nothing on this site owns is the DECISION intent — the person who has
 * not yet decided whether to build anything at all: "build vs buy software"
 * (10/mo), "off the shelf vs custom software" (10/mo), "when to build custom
 * software" (10/mo), each at effectively zero competition, alongside the
 * planning vocabulary that does carry volume — "custom business software"
 * (140/mo, LOW), "custom software solutions" (90/mo, LOW), "custom software
 * for small business" (40/mo). Those are small numbers and the page is not
 * built to live on them.
 *
 * It is built for the two surfaces where this question actually gets asked.
 * The first is an answer engine: "does my business need custom software" and
 * "custom software vs saas" return no measurable ad volume precisely because
 * they are conversational, which is a citation surface rather than a ranking
 * one — hence the direct `answer` block and the FAQ phrasing. The second is
 * the calculator, which now links here from every result that lands at the
 * application end of the ladder. A guide that talks a reader out of a build is
 * worth more to this studio than one that ranks for a term it cannot win.
 */
export const EN: GuideContent = {
  locale: "en",
  path: "/do-i-need-custom-software",
  otherPath: "/fr/logiciel-sur-mesure-ou-solution-existante",

  meta: {
    title: "Do I Need Custom Software? A Buy-vs-Build Guide for Business Owners",
    description:
      "Most businesses that think they need custom software need to buy, configure or connect something that already exists. A five-route framework — buy, configure, integrate, extend, build — plus the signals that genuinely justify a custom build and the ownership costs nobody quotes.",
    ogTitle: "Do you actually need custom software?",
    ogDescription:
      "Buy, configure, integrate, extend or build — in that order. The honest test for whether your business needs software written for it, from a studio that builds it.",
  },

  hero: {
    eyebrow: "Decision guide",
    h1: "Do I actually need custom software?",
    standfirst:
      "This is written by a studio that builds custom software, which is exactly why it starts with the case against. Most requirements that arrive described as \"we need a system built\" are met by something that already exists — and the ones that genuinely are not, are worth doing properly.",
    answer:
      "Most businesses do not need custom software. You need it when a process that makes you money cannot be modelled by any product you can buy — because the workflow is genuinely yours, because several systems have to be orchestrated in a way none of them supports, or because the software is the product you sell. Everything else is better served by buying a proven product, configuring it, connecting a few of them together, or extending one with a small amount of custom code. Work down that list in order: buy, configure, integrate, extend, build. Custom software is the right answer when the four cheaper routes have each been ruled out for a specific, stated reason — not when they have simply not been tried.",
  },

  kinds: {
    title: "First, the words",
    intro:
      "A great deal of money is wasted because two people in a room use \"a system\" to mean different things. One is describing something they could be running by Thursday; the other is describing six months of work. These are the categories, and the distinctions between them are where the cost lives.",
    items: [
      {
        id: "website",
        name: "A website",
        oneLine: "Pages that explain what you do and give someone a way to reach you.",
        needItWhen: "People need to find you, understand what you sell, and get in touch. Which is nearly every business.",
        notToBeConfusedWith: "A web application. A website presents information; an application holds state that belongs to somebody.",
        provenProductsExist: true,
      },
      {
        id: "cms",
        name: "A content management system",
        oneLine: "The editing surface behind a website, so you can change it without a developer.",
        needItWhen: "The content will change and you want to be the one changing it.",
        notToBeConfusedWith: "A database. A CMS stores pages you publish; a database stores records your business operates on. Sites need the first far more often than the second.",
        provenProductsExist: true,
      },
      {
        id: "ecommerce",
        name: "An ecommerce platform",
        oneLine: "A catalogue, a cart, a checkout, and the tax, shipping and fraud machinery behind them.",
        needItWhen: "You sell products and want the money, stock and tax handled by something that has already solved them.",
        notToBeConfusedWith: "Custom commerce. Wanting an unusual storefront is a design problem; needing an ordering model no platform supports is a software problem, and only the second is expensive.",
        provenProductsExist: true,
      },
      {
        id: "crm",
        name: "A CRM",
        oneLine: "A record of the people you deal with and every interaction you have had with them.",
        needItWhen: "Leads or customers are being tracked in someone's inbox, a spreadsheet, or their memory.",
        notToBeConfusedWith: "A custom database. Almost every CRM requirement a small business has is met by a product costing tens of dollars a month.",
        provenProductsExist: true,
      },
      {
        id: "erp",
        name: "An ERP",
        oneLine: "One system running finance, inventory, purchasing and operations together, on shared data.",
        needItWhen: "Several departments need the same numbers and currently disagree about them.",
        notToBeConfusedWith: "Anything a small business should be building. ERP implementations are configuration projects, and the ones that fail usually failed at the process stage, not the software stage.",
        provenProductsExist: true,
      },
      {
        id: "saas",
        name: "SaaS",
        oneLine: "Software you rent rather than own, running on someone else's infrastructure.",
        needItWhen: "A product already does the job. Which, for most business functions, one does.",
        notToBeConfusedWith: "Building your own SaaS. Using SaaS and selling SaaS are opposite ends of this guide.",
        provenProductsExist: true,
      },
      {
        id: "portal",
        name: "A customer portal",
        oneLine: "A place your customers sign in to see things that belong only to them.",
        needItWhen: "You are emailing individual customers documents, statuses or files often enough that it has become a job.",
        notToBeConfusedWith: "A website with a password on it. The moment private data is involved, separation between customers has to be enforced in the database, not in the design.",
        provenProductsExist: false,
      },
      {
        id: "dashboard",
        name: "An internal dashboard",
        oneLine: "Screens your own team works in, built around how they actually work.",
        needItWhen: "Your team's day is spent moving between systems and reconciling them by hand.",
        notToBeConfusedWith: "A reporting tool. If you only need to SEE the numbers, a reporting product does that today and costs almost nothing.",
        provenProductsExist: false,
      },
      {
        id: "automation",
        name: "Workflow automation",
        oneLine: "A process that runs between systems you already have, on a schedule or a trigger.",
        needItWhen: "A repetitive sequence happens the same way every time and a person is currently doing it.",
        notToBeConfusedWith: "An application. Automation has no interface and nobody logs into it — which is why it is usually far cheaper than what people expect.",
        provenProductsExist: true,
      },
      {
        id: "integration",
        name: "An integration layer",
        oneLine: "The plumbing that keeps two or more systems agreeing with each other.",
        needItWhen: "The same information is being typed into more than one place.",
        notToBeConfusedWith: "Replacing the systems. Connecting what you run is almost always cheaper than migrating off it.",
        provenProductsExist: true,
      },
      {
        id: "business-app",
        name: "A custom business application",
        oneLine: "Software built around one company's process, because that process is genuinely theirs.",
        needItWhen: "The way you do the thing is a reason customers choose you, and no product models it.",
        notToBeConfusedWith: "Impatience with a product you have not finished configuring.",
        provenProductsExist: false,
      },
      {
        id: "product",
        name: "Software as the product",
        oneLine: "The software is the thing you sell. Anyone can sign up, and it has to hold up.",
        needItWhen: "Your business model is the software itself.",
        notToBeConfusedWith: "Everything above. This is a different undertaking with a different risk profile, and it does not end at launch.",
        provenProductsExist: false,
      },
    ],
  },

  routes: {
    title: "Buy, configure, integrate, extend, build",
    intro:
      "Every requirement gets walked down this list in order. Not because cheap is always right, but because each route down costs more money, more time and more permanent obligation than the one above it — so moving down should require a reason you can say out loud.",
    rule:
      "The rule: you may only move down a rung by naming what the rung above it could not do. \"We looked and nothing fit\" is not a reason. \"The three products we shortlisted all assume one price per customer, and we price per site\" is.",
    items: [
      {
        id: "buy",
        name: "Buy",
        meaning: "A product already does this. You pay for it and start using it.",
        chooseWhen: [
          "The need is one thousands of other businesses also have — payments, scheduling, accounting, email, payroll, support tickets, CRM.",
          "Being different at this is not how you win. Nobody has ever chosen a supplier because of their invoicing software.",
          "You would rather the security, compliance and uptime be someone else's full-time job.",
        ],
        cost: "A subscription, and living inside someone else's assumptions about how the work is done.",
        failureMode:
          "Buying five overlapping products that each solve a slice, then paying a person to reconcile them. That is not a buying failure — it is an integration problem being solved by a human.",
        example:
          "A clinic that wants online booking. Scheduling products handle availability, reminders, no-shows, time zones and cancellations, and have been debugged by tens of thousands of clinics. Building this is a year of learning what those edge cases were.",
      },
      {
        id: "configure",
        name: "Configure",
        meaning: "A product does this, but only once it is genuinely set up around your business.",
        chooseWhen: [
          "The product has the concepts you need but the defaults describe a business unlike yours.",
          "The gap is fields, stages, permissions, templates, rules and terminology — not missing capability.",
          "Someone competent has not yet spent real time on it. Most \"this product cannot do it\" verdicts are delivered from the default settings.",
        ],
        cost: "Real hours from someone who understands both the product and your process. This is the routinely underestimated one.",
        failureMode:
          "Declaring a product inadequate after a free trial, then paying fifty times more to rebuild what it already did. The trial was the evaluation of the defaults, not of the product.",
        example:
          "A CRM that appears to have no concept of your sales process, until custom stages, fields and automation rules are set up — a few days of work against several months of building an alternative.",
      },
      {
        id: "integrate",
        name: "Integrate",
        meaning: "Several proven systems each do their part, and are connected so the data only gets entered once.",
        chooseWhen: [
          "Every individual job is already solved by a product you either run or could buy.",
          "The actual pain is re-entry, reconciliation and disagreement between systems.",
          "The systems have real interfaces — most established products do.",
        ],
        cost: "Build once, then maintain forever: interfaces change, credentials expire, and something has to notice when a sync fails.",
        failureMode:
          "A connection nobody monitors. Silent integration failure is worse than no integration, because the business keeps trusting numbers that stopped being true weeks ago.",
        example:
          "Orders from the store creating invoices in the accounting system and contacts in the mailing list. Three proven products, two connections, and nobody retyping anything.",
      },
      {
        id: "extend",
        name: "Extend",
        meaning: "Keep the platform, and write a small amount of custom code for the specific part it does not do.",
        chooseWhen: [
          "One requirement out of twenty is genuinely unsupported, and the other nineteen are handled well.",
          "The platform has a supported way to extend it, rather than a way to fight it.",
          "You want the vendor to keep carrying the security, hosting and upgrades of everything else.",
        ],
        cost: "A piece of code you own inside a product you do not, which has to be re-tested when the platform changes.",
        failureMode:
          "Extending so far that you have built an application inside someone else's product, with none of the control and all of the maintenance. There is a point where extending stops being cheaper than building, and it is usually passed without anyone noticing.",
        example:
          "A store that needs one unusual pricing rule. The catalogue, checkout, tax and fulfilment stay on the platform; the pricing rule is a small piece of custom code.",
      },
      {
        id: "build",
        name: "Build",
        meaning: "Software written for your business, owned by your business.",
        chooseWhen: [
          "The workflow is genuinely proprietary and it is part of why customers choose you.",
          "You have shortlisted real products and can name the specific thing each one cannot model.",
          "The manual cost is measurable and recurring, and the arithmetic still works after the ownership costs below.",
          "The software is itself the product you sell.",
        ],
        cost: "Everything in the ownership section below, permanently, whether or not anyone is actively working on it.",
        failureMode:
          "Rebuilding a product that already exists, with fewer features, no test suite, and one person who understands it. This is the single most common expensive mistake in this field.",
        example:
          "A distributor whose pricing depends on contract terms, volume history and route economics in a combination no ERP models — and where getting it right is the reason they win accounts.",
      },
    ],
  },

  when: {
    title: "When custom software genuinely makes sense",
    intro:
      "These are the cases where building is the right call. Each one has a test attached, because every item on this list is also something a business can talk itself into believing.",
    items: [
      {
        id: "proprietary-workflow",
        title: "The workflow is genuinely yours",
        body: "Your process is not a worse version of a standard process — it is a different one, and it is part of why customers choose you. Forcing it into a product's model would mean doing the thing that makes you competitive slightly worse, forever.",
        test: "Can you name a competitor who does it the same way? If the answer is \"all of them\", it is a standard process and a product exists.",
      },
      {
        id: "no-model-fits",
        title: "No product can model the operation",
        body: "You have looked properly, and each candidate breaks on the same structural assumption — one location per account, one price per product, one owner per record — that your business genuinely violates.",
        test: "Can you state the assumption each shortlisted product makes, and why your business breaks it? If not, the evaluation has not happened yet.",
      },
      {
        id: "manual-cost",
        title: "There is measurable, recurring manual work",
        body: "A specific number of hours goes into a specific repetitive task every week, and the task is deterministic enough to be described precisely. That is an arithmetic problem with a real answer.",
        test: "How many hours, doing exactly what, and how many of them would actually disappear? A saving you cannot count is a saving you did not make.",
      },
      {
        id: "orchestration",
        title: "Several systems need real orchestration",
        body: "Not two systems needing a sync — several systems, with sequencing, conditional logic, exceptions and someone accountable when a step fails. That is a system in its own right, and connector tools stop being honest at that complexity.",
        test: "Does the process have branches and failure states you can draw? Straight lines are automation; branches with consequences are software.",
      },
      {
        id: "private-data",
        title: "Customers need their own private area",
        body: "Your customers must sign in and see records that belong only to them. That is not a website feature — it is a data separation guarantee, and it has to be enforced in the database rather than in the interface.",
        test: "If two customers' data got mixed, would that be an incident you would have to disclose? If yes, this is software with obligations, not a page with a password.",
      },
      {
        id: "unusual-data",
        title: "The data model itself is unusual",
        body: "The things your business tracks, and the relationships between them, do not resemble the customers-orders-products shape that products are built around.",
        test: "Sketch your entities and their relationships. If it looks like a normal commerce or CRM diagram, buy one of those.",
      },
      {
        id: "permissions",
        title: "Permissions are genuinely complicated",
        body: "Several kinds of user, seeing different things, with rules that depend on relationships rather than on job titles. Products tend to offer roles; some businesses need rules.",
        test: "Can you express access as a short list of roles? If yes, products handle it. If it depends on who owns what, it may not.",
      },
      {
        id: "the-product",
        title: "The software is what you sell",
        body: "Anyone can sign up, they pay for access, and the software itself is the business. There is no buying your way out of this one.",
        test: "Would customers still pay you if the software disappeared? If no, this is the product, and it deserves to be built properly.",
      },
    ],
  },

  whenNot: {
    title: "When it probably doesn't",
    intro:
      "Each of these is a requirement we have genuinely been asked to build, and each one is better served by something that already exists. Naming the alternative is the whole point — a list of things not to build, without the thing to buy instead, is not useful to anybody.",
    items: [
      {
        id: "ordinary-ecommerce",
        title: "Ordinary online selling",
        body: "Products, variants, stock, a cart, tax, shipping, refunds and fraud. Every one of these is a solved problem with brutal edge cases, and the edge cases are what you would be paying to rediscover.",
        buyInstead:
          "A commerce platform. Spend the difference on the storefront, the photography and the product pages, which are the parts that actually affect whether anyone buys.",
      },
      {
        id: "ordinary-scheduling",
        title: "Ordinary appointments and bookings",
        body: "Availability, buffers, staff, reminders, reschedules, cancellations, time zones and daylight saving. Scheduling looks simple and is famously not.",
        buyInstead:
          "An established scheduling product, embedded into your site and styled to match. Build one only when availability depends on rules — rooms, equipment, qualified staff, sequences — that no product supports.",
      },
      {
        id: "marketing-site",
        title: "A marketing website",
        body: "If the site explains what you do and produces enquiries, it does not need a backend, a database or accounts. Adding them adds security surface, hosting cost and maintenance in exchange for nothing a visitor can see.",
        buyInstead:
          "A well-built site on a proven platform, with the form delivered to a real inbox. Spend the money on the writing and the search architecture.",
      },
      {
        id: "custom-cms",
        title: "A custom content management system",
        body: "Building an editing interface means building drafts, revisions, media handling, permissions, previews and scheduling. This is a product category with decades of work in it, and it is almost never the thing that makes a business money.",
        buyInstead:
          "A platform's own editor, or an established headless CMS when the content is genuinely structured. Custom admin screens make sense for your business records — not for your pages.",
      },
      {
        id: "basic-crm",
        title: "A basic CRM",
        body: "Contacts, deals, stages, notes and reminders. This is the most thoroughly solved category in business software, and the cheapest products in it are very good.",
        buyInstead:
          "An established CRM, properly configured — which is a few days of work, not a few months. Revisit only when your sales process genuinely does not fit a pipeline.",
      },
      {
        id: "payments",
        title: "Anything that touches card details",
        body: "Handling card data yourself converts a website into a system carrying regulatory obligations, audit requirements and a genuinely serious breach scenario.",
        buyInstead:
          "A hosted checkout, so card details never reach your servers. This is not a shortcut — it is the correct architecture, and it is what the platforms themselves use.",
      },
      {
        id: "reporting",
        title: "Reporting on data you already have",
        body: "Wanting to see the numbers is not the same as needing an application. Most \"we need a dashboard\" requirements are a reporting question wearing a software costume.",
        buyInstead:
          "A reporting or business-intelligence tool pointed at your existing systems. Build screens only when people need to ACT inside them, not just look.",
      },
      {
        id: "internal-comms",
        title: "Internal messaging, files or documents",
        body: "Chat, shared drives, wikis, e-signature and project tracking are commodity categories where the products are excellent and the switching cost of being wrong is a month's subscription.",
        buyInstead: "Whichever established product your team will actually open. Adoption matters more than fit here.",
      },
    ],
  },

  cost: {
    title: "What it costs to own, not just to build",
    intro:
      "The build is the part everyone budgets for, and it is rarely the part that hurts. Custom software is a permanent obligation: the moment it exists, it has to be kept alive, kept secure and kept correct — whether or not anyone is actively working on it.",
    note:
      "No dollar figures appear in this section, deliberately. Any number we invented for \"annual maintenance\" would be a guess dressed as research, and the ranges vary by more than an order of magnitude depending on what was built. What matters is that every line below exists, that most of them recur, and that a quote which mentions only the first four is incomplete rather than competitive.",
    comparison:
      "Compare it honestly against the alternative. A subscription looks expensive next to a one-time build price and is usually cheaper over five years, because the vendor's fee is spread across every customer they have — you are buying a fraction of a security team, a fraction of an uptime budget and a fraction of a product roadmap. Custom software wins when what you get is something no vendor sells, not when the monthly fee looks annoying.",
    items: [
      { id: "discovery", name: "Discovery and specification", timing: "build", body: "Working out precisely what it must do before anything is built. Skipping this does not save the cost — it moves it into the build, where changing your mind is far more expensive." },
      { id: "design", name: "Design", timing: "build", body: "Not decoration. How the screens are arranged decides whether your team is faster or slower than the spreadsheet you are replacing." },
      { id: "development", name: "Development", timing: "build", body: "The part everyone means by \"what will it cost\". Typically well under half of the five-year figure." },
      { id: "qa", name: "Testing", timing: "build", body: "Automated tests are what make a system changeable later. Software without them gets more expensive to modify every year until it is cheaper to replace." },
      { id: "data", name: "Data migration", timing: "build", body: "Getting what you already have into the new system, in a state worth keeping. Real data is always messier than anyone expects." },
      { id: "training", name: "Training and rollout", timing: "build", body: "Software your team works around is a cost, not an asset. The rollout is where that gets decided." },
      { id: "hosting", name: "Hosting and infrastructure", timing: "ongoing", body: "Servers, databases, storage, bandwidth. Modest for most business applications, and it never stops." },
      { id: "security", name: "Security", timing: "ongoing", body: "Dependency updates, patching, access review, and a plan for the day something is found. A vendor does this for every customer at once; owning software means owning this." },
      { id: "monitoring", name: "Monitoring and alerting", timing: "ongoing", body: "Knowing it broke before your customers tell you. Unmonitored software fails silently, which is the expensive kind." },
      { id: "backups", name: "Backups and recovery", timing: "ongoing", body: "Backups nobody has ever restored are not backups. The restore is the thing being paid for." },
      { id: "maintenance", name: "Maintenance", timing: "ongoing", body: "Platforms, languages and libraries move underneath you. Software left alone for two years is not stable, it is accruing a bill." },
      { id: "integrations", name: "Integration upkeep", timing: "ongoing", body: "Every system you connect to will change its interface eventually, on its schedule rather than yours." },
      { id: "support", name: "Support", timing: "ongoing", body: "Someone your team can ask, and someone who answers when it breaks at an inconvenient hour." },
      { id: "evolution", name: "Changes", timing: "ongoing", body: "Your business will change, and software that cannot follow it becomes the constraint it was built to remove." },
    ],
  },

  decide: {
    title: "How to decide, in order",
    intro:
      "Run each requirement through this sequence separately. Most projects are a mixture — buy the scheduling, configure the CRM, integrate the accounting, build the one thing that is genuinely yours — and treating the whole project as a single build-or-buy decision is how businesses end up building parts they could have bought.",
    steps: [
      { label: "Write the process down", body: "Exactly as it runs today, including the exceptions and the bits someone handles by knowing. If it cannot be written down, it cannot be built, and this step alone often reveals the problem is a process one." },
      { label: "Separate the requirements", body: "Split it into the individual jobs. Scheduling, invoicing, records, reporting, notifications. Each gets evaluated on its own." },
      { label: "Shortlist real products for each", body: "Name three. If you cannot find three for a requirement, that is genuine evidence — and it is the first real evidence you will have gathered." },
      { label: "Test them properly", body: "Configured, with your data, by someone who has read the documentation. A default trial evaluates the defaults." },
      { label: "Name what breaks", body: "For each product, the specific assumption that fails. This sentence is the entire justification for everything downstream, and if you cannot write it, you are not ready to build." },
      { label: "Check whether connecting them closes the gap", body: "Frequently the products are individually fine and the pain is that they do not talk. That is an integration project, and it is a fraction of the cost." },
      { label: "Check whether extending one closes the gap", body: "One custom piece inside a platform that keeps carrying everything else is often the best value available." },
      { label: "Do the ownership arithmetic", body: "Build cost plus five years of the ongoing lines above, against subscriptions plus the manual hours you would keep paying. Then decide." },
      { label: "Build the smallest thing that proves it", body: "If you do build, build the one workflow that carries the value first. A first version in production beats a specification of everything." },
    ],
  },

  faq: [
    [
      "Does my business need custom software?",
      "Probably not, and the test is specific: custom software is warranted when a process that makes you money cannot be modelled by any product you can buy, when several systems need orchestration none of them supports, when customers need private areas of their own, or when the software is itself what you sell. Work down buy → configure → integrate → extend → build in that order, and only move down a rung when you can name what the rung above could not do.",
    ],
    [
      "Custom software or SaaS — which is better?",
      "They are not competitors, they are different answers to different questions. SaaS is right whenever thousands of businesses share your requirement, because the vendor spreads the cost of security, uptime and development across all of them. Custom is right when the requirement is genuinely yours. Most businesses should be running mostly SaaS with a small amount of custom software at the point where they are actually different.",
    ],
    [
      "How do I know if an existing product can really do what I need?",
      "Shortlist three, configure them with your own data, and try to write one sentence for each naming the specific structural assumption that fails — one location per account, one price per product, one owner per record. If you cannot write that sentence, the product has not been evaluated yet; a free trial tests the default settings, not the product.",
    ],
    [
      "What does custom software cost to maintain?",
      "The honest answer is that it varies by more than an order of magnitude, so any single figure would be invented. What is reliable is the list: hosting, security patching, monitoring, backups and restore testing, dependency and platform upgrades, integration upkeep, support, and changes as the business moves. Those recur whether or not anyone is actively working on it, and a quote that mentions only discovery, design, development and QA is incomplete.",
    ],
    [
      "Is custom software cheaper than paying for subscriptions?",
      "Usually not, and the comparison is often made wrongly. A subscription buys a fraction of a security team, an uptime budget and a product roadmap shared across every customer the vendor has. Custom software wins when what you get is something no vendor sells — not when the monthly fee looks irritating next to a one-time build price.",
    ],
    [
      "Can I start with an existing platform and build later?",
      "Usually yes, and it is often the best sequence available. Buy or configure something now, run the business on it, and let the friction tell you precisely where the custom piece has to go. Requirements discovered by operating are worth far more than requirements imagined in a planning meeting — and you may find the friction never arrives.",
    ],
    [
      "What is the difference between a customer portal and a website with a login?",
      "The obligation. A website with a password hides pages; a portal holds records belonging to specific people, and separation between them has to be enforced in the database rather than in the interface. Once private customer data is involved you are operating software with security, backup and disclosure responsibilities — which is a different project, and priced as one.",
    ],
  ],

  cta: {
    title: "Put your own requirements through it",
    body: "The project calculator runs the same logic as this guide. Describe what has to happen and it returns the simplest setup that does it — including, where it applies, the things it says you do not need.",
    calculator: { label: "Try the project calculator", href: "/tools/project-cost-calculator" },
  },

  related: {
    title: "The rest of the decision",
    links: [
      { label: "What kind of website does your business need?", href: "/website-setup-guide" },
      { label: "How website ownership and accounts work", href: "/website-ownership" },
      { label: "What custom software costs in Canada", href: "/stillawake-times/custom-software-development-cost-canada" },
      { label: "What is custom software development?", href: "/stillawake-times/what-is-custom-software-development" },
      { label: "How businesses use custom dashboards and internal tools", href: "/stillawake-times/how-modern-businesses-use-custom-dashboards-and-internal-tools" },
      { label: "Custom software development at StillAwake", href: "/software-development" },
    ],
  },
};
