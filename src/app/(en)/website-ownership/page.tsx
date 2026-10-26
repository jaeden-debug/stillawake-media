import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { FaqBlock, RelatedServices } from "@/components/service-page";
import {
  CredentialSplit,
  Disclosure,
  OwnershipMatrix,
  StackDiagram,
  WorkflowRail,
} from "@/components/ownership";
import { faqPairs } from "@/data/website-ownership";
import { RECURRING_BY_ID } from "@/lib/pricing/model";

/**
 * The website-ownership resource.
 *
 * Primary intent: `website ownership` — 480/mo US at LOW competition
 * (index 21), 70/mo Canada, measured via Google Keyword Planner on
 * 2026-08-15. Deliberately *not* targeting `who owns the website` (2,900/mo
 * US) or `who owns the domain name` (1,000/mo CA): that volume is people
 * running a WHOIS lookup on somebody else's site, and writing for it would
 * mean writing a lookup tool page, not this.
 *
 * Nothing else on the site owns this intent. `/website-maintenance` owns
 * upkeep, `/website-cost-canada` owns budget, and the two hiring articles
 * mention ownership in passing without answering it — they now link here
 * instead of half-answering it.
 */

const url = "https://stillawakemedia.com/website-ownership";
const HOSTING = RECURRING_BY_ID["managed-hosting"];
const CARE = RECURRING_BY_ID["website-care-plan"];

export const metadata: Metadata = {
  title: "Website Ownership: Who Owns the Domain, Hosting, Code & Accounts",
  description:
    "A plain-English guide to website ownership when you hire an agency: who should own the domain, hosting, source code, CMS, database, Stripe, Shopify and analytics — who pays for what, and what happens if you stop working together.",
  alternates: {
    canonical: url,
    languages: {
      "en-CA": url,
      "fr-CA": "https://stillawakemedia.com/fr/propriete-site-web",
      "x-default": url,
    },
  },
  openGraph: {
    title: "Who Owns Your Website? The Ownership Guide",
    description:
      "Domain, hosting, code, CMS, database, payments and analytics — who should own each one, who pays, and what happens when an agency relationship ends.",
    url,
    type: "article",
  },
};

const FAQ = faqPairs("en");

const PRINCIPLES: [string, string][] = [
  [
    "You own the accounts",
    "Every account your business depends on — domain, hosting, CMS, database, payments, analytics — should be in your business’s name, on your email, with your recovery method.",
  ],
  [
    "We get access, not ownership",
    "A studio needs administrator or developer access to build and run your site. It does not need to be the owner of anything to do that work well.",
  ],
  [
    "Nothing depends on one laptop",
    "Your ability to reach your own infrastructure should never route through a StillAwake employee’s phone, email or password manager.",
  ],
  [
    "It is written down",
    "Which accounts exist, who holds each one, what they cost, and what happens at the end — in writing, before the build starts.",
  ],
];

export default function WebsiteOwnershipPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <PageSchema route="/website-ownership" />

      {/* Hero — the direct answer is the first paragraph on purpose. It is
          the passage an AI assistant will lift, so it has to be complete
          and defensible standing alone. */}
      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">
            Ownership &amp; Infrastructure
          </p>
          <h1 className="geist max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Who owns what when someone builds your website.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/80">
            <strong className="text-white">
              You should own every account your business depends on — the domain, the hosting, the
              CMS, the database, Stripe, Shopify, Analytics and Search Console. Your agency should
              hold administrator or developer access to those accounts, not ownership of them.
            </strong>{" "}
            That one sentence resolves most of the confusion, and almost every horror story you have
            heard about a business losing its website is a story about that sentence being ignored.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            This page is the whole picture: what each piece of a website actually is, who should hold
            it, who pays for it, how a real project is sequenced, and what happens if you and your
            studio part ways. It is written for a business owner, not a developer. No prior knowledge
            is assumed and nothing is hidden to make the work sound harder than it is.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="https://stillawake.studio/start"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90"
            >
              Get a Written Scope — No Call Required
            </Link>
            <Link
              href="/tools/project-cost-calculator"
              className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40"
            >
              Estimate a Project
            </Link>
          </div>
        </div>
      </section>

      {/* The principle, four ways. */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            The principle, in four lines.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(([title, body]) => (
              <div key={title} className="glass rounded-[1.75rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.05em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layers. */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">The map</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            A website is five layers, not one thing.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            When someone says &ldquo;the website,&rdquo; they are usually talking about one of five
            separate things that can each be owned, paid for and moved independently. Once you can see
            them separately, the ownership question stops being intimidating — it becomes five small
            questions with obvious answers.
          </p>
          <StackDiagram locale="en" />
          <p className="mt-8 max-w-3xl text-sm leading-7 text-[#8C8080]">
            Most small-business websites use layers one, two and three, and stop there. Layers four and
            five are added when the business genuinely needs them — which is a decision worth making
            deliberately, because each one adds cost, maintenance and a security obligation.
          </p>
        </div>
      </section>

      {/* Matrix. */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">The matrix</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Every account, who should hold it, and who pays.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            This is the table to bring to a conversation with any supplier, not just us. Three rows are
            marked <strong className="text-white">varies by contract</strong> — those are genuine
            commercial choices where more than one arrangement is honest. Everything else is a
            recommendation we would defend in any engagement.
          </p>
          <OwnershipMatrix locale="en" />
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <h3 className="geist text-2xl font-black tracking-[-0.05em]">
              Where ownership can legitimately vary
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
              Code can be assigned to you or licensed to you. Hosting can sit in your account or inside
              a managed plan. Transactional email can run on your provider or on ours. All six of those
              arrangements are used by reputable studios, and the choice usually comes down to whether
              you want to hold the platform or hold a single invoice. What is not a legitimate variation
              is leaving it undefined, or discovering the answer only when you try to leave. If a
              proposal does not name the arrangement, that is the question to ask before you sign — and
              our{" "}
              <Link
                href="/stillawake-times/what-a-website-quote-should-include"
                className="text-[#D71920] underline-offset-4 hover:underline"
              >
                guide to auditing a website quote
              </Link>{" "}
              lists the other ten things a real quote specifies.
            </p>
          </div>
        </div>
      </section>

      {/* Category explainers. */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Plain English</p>
          <h2 className="geist mt-5 text-4xl font-black tracking-[-0.06em] md:text-5xl">
            What each of these things actually is.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#C7B9B9]">
            Open the ones you need. Nothing here assumes you know what a nameserver is, and none of it
            is written to make the work sound more mysterious than it is.
          </p>

          <div className="mt-10 space-y-4">
            <Disclosure
              summary="Domains and DNS"
              hint="Your address, and the signpost that points at everything"
            >
              <p>
                A <strong className="text-white">domain name</strong> is the address people type. You
                rent it from a <strong className="text-white">registrar</strong> — Cloudflare, Namecheap,
                Google Domains, GoDaddy — for roughly $15–$60 CAD a year, and it is yours as long as you
                keep renewing it. <strong className="text-white">DNS</strong> is the settings panel
                attached to it: a short list of records saying which server answers for the website,
                which service handles your email, and which records prove to Google or Microsoft that you
                control the domain.
              </p>
              <p>
                Register it yourself, to your legal business name, on a company email address you will
                still have in five years. Turn on auto-renew and transfer lock. Then give your studio
                access to edit records — that is a five-second invitation and it is entirely reversible.
              </p>
              <p>
                A lapsed domain is the one failure on this page with no clean recovery: an expired name
                can be bought by someone else within days, and it takes your email, your search rankings
                and every link anyone ever made to you with it.
              </p>
            </Disclosure>

            <Disclosure summary="Source code and repositories" hint="GitHub, and what handoff means">
              <p>
                A custom website is a folder of files. Those files live in a{" "}
                <strong className="text-white">repository</strong> — almost always on GitHub — which keeps
                the full history of every change, who made it and when, and lets any change be undone.
                The repository is also what the hosting platform watches: push a change, the site rebuilds
                itself.
              </p>
              <p>
                Two things matter to you. First, that a repository exists at all — if a supplier is
                editing files directly on a live server, there is no history and no undo. Second, what your
                contract says happens to it: assigned to you on final payment and transferred to your
                GitHub organisation is the cleanest arrangement, and it is what we do. A licence is a
                legitimate alternative, but it should be a sentence you read, not a fact you discover.
              </p>
              <p>
                Platform builds are different by nature. Shopify, Framer and Webflow sites do not produce
                portable code, and no honest supplier can promise otherwise — what transfers there is the
                account, not the codebase.
              </p>
            </Disclosure>

            <Disclosure summary="Hosting and deployment" hint="Vercel, CDNs, SSL, and where the site runs">
              <p>
                <strong className="text-white">Hosting</strong> is the machines that answer when someone
                visits your address. Modern platforms like <strong className="text-white">Vercel</strong>{" "}
                do more than store files: they build the site from your repository, distribute it across a{" "}
                <strong className="text-white">CDN</strong> — a network of servers worldwide, so a visitor
                in Melbourne is served from nearby — issue the{" "}
                <strong className="text-white">SSL</strong> certificate that produces the padlock, and give
                you a private preview of every change before it goes live.
              </p>
              <p>
                A small business site costs nothing to a few dollars a month at this tier. The account
                should be in your business name by default. Managed hosting under our account is the other
                honest model — one predictable invoice instead of four vendor logins — and if that is what
                you choose, the arrangement is written down and the site remains portable.
              </p>
            </Disclosure>

            <Disclosure summary="CMS — content management" hint="WordPress, Webflow, Framer, Sanity, custom">
              <p>
                A <strong className="text-white">CMS</strong> is the admin screen where somebody changes
                words and pictures without touching code. The categories worth knowing:{" "}
                <strong className="text-white">all-in-one platforms</strong> (WordPress, Webflow, Framer)
                where the CMS and the site are the same product;{" "}
                <strong className="text-white">headless CMSs</strong> (Sanity, Contentful) which store
                content and hand it to a custom-built site;{" "}
                <strong className="text-white">commerce content</strong> (Shopify pages and blogs, which
                come with the store); and a{" "}
                <strong className="text-white">custom admin</strong> built into the site itself — which is
                what runs this website, and which is often the right answer when a business needs to edit
                six things rather than everything.
              </p>
              <p>
                You do not automatically need one. A CMS earns its keep when content changes often enough
                that waiting on a developer is a real cost. Below that threshold it is an update
                obligation and an extra way to break the site.
              </p>
              <p>
                Whichever you use, the owner seat belongs to you, and so does the content inside it.
              </p>
            </Disclosure>

            <Disclosure
              summary="Databases, authentication and storage"
              hint="Supabase, Postgres — and why most sites need none of it"
            >
              <p>
                Say this part plainly:{" "}
                <strong className="text-white">
                  a normal marketing website does not need a custom database.
                </strong>{" "}
                Pages, services, a portfolio and a contact form need no database at all. If a supplier
                proposes one for a five-page brochure site, the right question is what it would store.
              </p>
              <p>
                You need one when the site holds something specific to each visitor: user accounts,
                bookings, saved data, memberships, an internal dashboard, a portal your staff logs into.
                In that case, <strong className="text-white">Supabase</strong> is a hosted bundle of a{" "}
                <strong className="text-white">PostgreSQL</strong> database (the industry-standard place to
                keep structured data), <strong className="text-white">authentication</strong> (sign-up,
                login, password resets, roles) and <strong className="text-white">storage</strong> (files
                and images uploaded by users) — the pieces a small team would otherwise have to run
                themselves.
              </p>
              <p>
                Where it exists, it holds your customers&rsquo; data, which makes it your legal
                responsibility under Québec&rsquo;s Law 25 and Canada&rsquo;s PIPEDA regardless of who
                built it. That is the strongest reason the organisation should be in your name.
              </p>
            </Disclosure>

            <Disclosure summary="Ecommerce" hint="Shopify — products, inventory, checkout, orders, customers">
              <p>
                An ecommerce platform is a database, a CMS, a payment flow and an operations tool sold as
                one subscription. <strong className="text-white">Shopify</strong> holds your product
                catalogue, inventory counts, checkout, orders, shipping settings, discount codes and your
                customer list — which, over a few years, becomes one of the more valuable assets the
                business owns.
              </p>
              <p>
                The store must be opened by you, under your business, with you as store owner. We work
                inside it with Staff or Collaborator access, which can be scoped to exactly the areas the
                work touches and revoked in a click. A supplier who insists on holding the owner seat is
                holding your customer list, and that should end the conversation.
              </p>
              <p>
                If you are still deciding on a platform, our{" "}
                <Link
                  href="/shopify-vs-woocommerce"
                  className="text-[#D71920] underline-offset-4 hover:underline"
                >
                  Shopify vs WooCommerce comparison
                </Link>{" "}
                covers the trade-off in detail.
              </p>
            </Disclosure>

            <Disclosure summary="Payments" hint="Stripe — and why this one is never negotiable">
              <p>
                <strong className="text-white">Stripe</strong> is a payment processor: it takes card
                details on a page your site never sees, charges the card, and deposits the money in your
                bank account. Your site needs it only if you actually take money — a deposit, a
                subscription, a booking fee, a digital product, checkout on a custom store.
              </p>
              <p>
                This is the one row on the matrix with no variation. A Stripe account is verified against
                a real legal identity, pays out to a real bank account, and carries the chargeback and tax
                obligations that come with taking money. It must be opened by your business, in your
                business&rsquo;s name, on your banking details. We build the integration using restricted
                API keys you issue from your own dashboard, and you can revoke them without touching
                anything else.
              </p>
            </Disclosure>

            <Disclosure summary="Email" hint="Business mail versus transactional mail — two different things">
              <p>
                <strong className="text-white">Business email</strong> — you@yourcompany.com, through
                Google Workspace or Microsoft 365 — is yours without qualification. It is the recovery
                address for every other account on this page, which makes it the single worst thing to
                have sitting inside somebody else&rsquo;s tenancy.
              </p>
              <p>
                <strong className="text-white">Transactional email</strong> is different: the automated
                mail your website sends. A contact-form notification, an order confirmation, a password
                reset. Those go through a delivery service such as{" "}
                <strong className="text-white">Resend</strong> or Postmark, because mail sent straight from
                a web server lands in spam. Free tiers usually cover a small business&rsquo;s form volume
                entirely.
              </p>
              <p>
                Whoever holds that account, the SPF, DKIM and DMARC records go in your DNS — they are what
                let receiving servers confirm the mail is genuinely from your domain, and they are the
                difference between arriving and being filtered.
              </p>
            </Disclosure>

            <Disclosure summary="Analytics and marketing accounts" hint="GA4, Search Console, Google Ads, Clarity">
              <p>
                <strong className="text-white">Google Analytics 4</strong> measures what visitors do.{" "}
                <strong className="text-white">Google Search Console</strong> shows what people searched
                before they arrived, and what Google thinks of your pages.{" "}
                <strong className="text-white">Microsoft Clarity</strong> records sessions and heatmaps.{" "}
                <strong className="text-white">Google Ads</strong> spends your money.{" "}
                <strong className="text-white">Google Business Profile</strong> is your listing in Maps and
                the local pack.
              </p>
              <p>
                All of them except Ads are free, and every one of them accumulates history that cannot be
                recreated later. They are also the accounts most often lost, because they are the easiest
                to create in a hurry under whichever Google login happened to be open. Create them under
                your business account, then invite your agency: Administrator in Analytics, a delegated
                Full user in Search Console, Manager access on Ads and on your Business Profile.
              </p>
              <p>
                One technical detail worth insisting on: verify Search Console with a{" "}
                <strong className="text-white">DNS record</strong> rather than an uploaded file or a tag in
                the page. File and tag verification break the moment the site is rebuilt. DNS verification
                survives it.
              </p>
            </Disclosure>
          </div>
        </div>
      </section>

      {/* Right-sizing. */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Right-sizing</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            You almost certainly do not need all of this.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Every service on this page costs money, attention and risk. The list of what a project needs
            should be an argument you win, not a stack you inherit. Here is the honest version.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {(
              [
                [
                  "A brochure or marketing site",
                  "Domain, code, hosting. That is the entire list. No database, no CMS unless you publish often, no Stripe, no Shopify. Most sites we build for service businesses stop here — and they are faster and cheaper to run for it.",
                ],
                [
                  "A site with a blog or frequent updates",
                  "Add a CMS. Which one depends on who edits and how often, not on which platform is fashionable. If two people update three pages a quarter, a small custom admin beats a full platform.",
                ],
                [
                  "A store",
                  "Add Shopify, or a custom store with Stripe. Shopify wins when you have inventory, shipping and a catalogue; a custom checkout wins when you sell a handful of things and want the site to stay one system.",
                ],
                [
                  "A product, portal or booking system",
                  "Now you need a database, authentication and probably payments — the point at which a website becomes software, and where scoping properly matters most. Our guide to a custom web application covers what changes.",
                ],
              ] as [string, string][]
            ).map(([title, body]) => (
              <div key={title} className="glass rounded-[1.75rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.05em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-[#8C8080]">
            Working out which of those four you are is a requirements question rather than a
            technology one, and it has its own guide:{" "}
            <Link
              href="/website-setup-guide"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              what kind of website your business actually needs
            </Link>
            . Once that is settled, what to build it on — and which of these accounts you will end up
            owning as a result — is decided in{" "}
            <Link
              href="/choosing-website-technology"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              the technology guide
            </Link>
            . If you would rather answer it by price, the{" "}
            <Link
              href="/tools/project-cost-calculator"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              project cost calculator
            </Link>{" "}
            asks about your business rather than about technology, and tells you which shape the project
            is — along with the range we would scope it from. Or read{" "}
            <Link
              href="/stillawake-times/what-is-a-custom-web-application"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              what separates a website from a web application
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Workflow. */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">The sequence</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            How a project actually runs, in order.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            The order matters more than any single step. Ownership is established in step four —{" "}
            <em className="not-italic text-white">before</em> anything is built — because every step after
            it inherits whatever was decided there. Fixing ownership after launch means migrating live
            infrastructure, which is work you pay for twice.
          </p>
          <WorkflowRail locale="en" />
        </div>
      </section>

      {/* Credentials. */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Security</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Never share a password. Invite an account.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Emailing a login to a supplier feels like the fast option, and it creates four problems at
            once. Nobody can tell who made which change. You cannot remove one person without locking out
            everyone. Two-factor codes have to be relayed by text at the worst possible moment. And when
            the supplier changes staff, your credentials leave with someone you never met.
          </p>
          <CredentialSplit locale="en" />
          <div className="mt-10 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/[0.07] p-8">
            <h3 className="geist text-2xl font-black tracking-[-0.05em]">The test that matters</h3>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              Your ability to reach your own infrastructure should not depend on a StillAwake
              employee&rsquo;s laptop, phone, email address or authenticator app. If our entire team
              disappeared tomorrow, you would still be able to log into your domain, your hosting, your
              CMS, your database, Stripe, Shopify and your analytics — because they were always yours, and
              we were only ever invited guests inside them. That is not a promise about our conduct. It is
              a property of how the accounts were set up, and you can verify it yourself in ten minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Offboarding. */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Offboarding</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            What happens if we stop working together.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Projects end. Budgets change, teams change, businesses get sold, and sometimes a working
            relationship simply runs its course. None of that should put your website at risk, and a
            studio that is confident in its work has no reason to make leaving difficult.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {(
              [
                [
                  "Nothing switches off",
                  "The domain, hosting, CMS, database, Stripe and analytics are already yours and already paid by you. Removing our access changes who can edit the site. It does not change whether the site runs.",
                ],
                [
                  "You get the inventory",
                  "A written list of every account, what it does, which vendor it is with, who holds it and what it costs — plus the repository, the design source files, and any documentation written during the build.",
                ],
                [
                  "Access is revoked, by you",
                  "You remove our administrator, developer, staff and collaborator accounts from your side. You do not have to wait for us to do it, and you do not have to trust that we did.",
                ],
                [
                  "A new team can start immediately",
                  "Any competent developer can read a repository with a full commit history and pick up a standard stack. Nothing in the build depends on a proprietary tool only we can operate.",
                ],
                [
                  "Search history survives",
                  "Because Analytics, Search Console and your Business Profile were verified under your accounts — Search Console by DNS record — the years of data behind them stay with the business rather than the supplier.",
                ],
                [
                  "The door stays open",
                  "Support afterwards is available and priced publicly. Leaving is not penalised, and coming back does not require explaining a stack we cannot see, because we documented it on the way out.",
                ],
              ] as [string, string][]
            ).map(([title, body]) => (
              <div key={title} className="glass rounded-[1.75rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.05em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{body}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-sm leading-7 text-[#8C8080]">
            If you are reading this because a previous supplier holds something of yours, that is a
            recoverable situation more often than it feels like. Domains can be transferred, Google
            properties can be re-verified by DNS, and a site can be rebuilt from what is publicly served
            even when the original files are gone. Start by finding out who your registrar is — everything
            else follows from that.
          </p>
        </div>
      </section>

      {/* Managed service. */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Managed service</p>
          <h2 className="geist mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Owning it and running it are two different jobs.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Owning your infrastructure does not mean administering it. Most business owners want the
            accounts in their name and the work off their desk, and those two things are entirely
            compatible — that is what a managed service is.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <h3 className="geist text-2xl font-black tracking-[-0.05em]">You keep</h3>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#C7B9B9]">
                {[
                  "The owner seat on every account",
                  "The billing relationship for anything you pay for directly",
                  "The data — customers, orders, submissions, analytics history",
                  "The right to remove us, without notice or negotiation",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#D71920]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/[0.07] p-8">
              <h3 className="geist text-2xl font-black tracking-[-0.05em]">We handle</h3>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#C7B9B9]">
                {[
                  "Deployments, uptime monitoring and daily backups",
                  "Software, dependency and security updates",
                  "DNS, SSL and deliverability records staying correct",
                  "Small content edits, and fixes when something breaks",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#D71920]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-7 text-[#C7B9B9]">
            Our prices for that are published rather than quoted: managed hosting at{" "}
            <strong className="text-white">${HOSTING.monthly} CAD per month</strong>, and a full website
            care plan — hosting, updates, monitoring, backups and small edits, with no separate incident
            fee when something breaks — at <strong className="text-white">${CARE.monthly} CAD per month</strong>.
            Details are on the{" "}
            <Link
              href="/website-maintenance"
              className="text-[#D71920] underline-offset-4 hover:underline"
            >
              maintenance and support page
            </Link>
            , alongside one-time emergency pricing for sites we did not build.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="https://stillawake.studio/start"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90"
            >
              Start a Project
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40"
            >
              Ask an Ownership Question
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock title="Website ownership questions" items={FAQ} />

      <RelatedServices
        title="Keep reading"
        links={[
          ["What Kind of Website Do You Need?", "/website-setup-guide"],
          ["What Technology Should You Use?", "/choosing-website-technology"],
          ["Website Maintenance & Support", "/website-maintenance"],
          ["What a Website Quote Should Include", "/stillawake-times/what-a-website-quote-should-include"],
          ["Before Hiring a Web Design Agency", "/stillawake-times/what-to-know-before-hiring-web-design-agency"],
          ["What Does a Website Cost in Canada?", "/website-cost-canada"],
          ["Custom Software Development", "/software-development"],
          ["Project Cost Calculator", "/tools/project-cost-calculator"],
          ["Version française", "/fr/propriete-site-web"],
        ]}
      />
    </main>
  );
}
