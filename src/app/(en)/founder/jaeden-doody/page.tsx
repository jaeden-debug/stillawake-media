import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";
import { siteUrl } from "@/lib/data";
import { entityIds, ventures } from "@/data/entities";
import { jaedenDoody as person, personAuthorNames } from "@/data/people/jaeden-doody";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Jaeden Doody — Founder of StillAwake Media",
  description: person.shortBio,
  alternates: {
    canonical: person.path,
    languages: {
      "en-CA": person.url,
      "fr-CA": `${siteUrl}/fr/fondateur/jaeden-doody`,
      "x-default": person.url,
    },
  },
  openGraph: {
    title: "Jaeden Doody — Founder of StillAwake Media",
    description: person.shortBio,
    url: person.url,
    type: "profile",
  },
};

const principles = [
  [
    "Understand the system first",
    "Patching a symptom before you understand what produced it usually just moves the failure somewhere less visible.",
  ],
  [
    "Question assumptions",
    "“That’s how it’s done” is a description of a habit, not an explanation. It is worth asking who decided that and whether the reason still holds.",
  ],
  [
    "Build to learn",
    "A working system tells you things theory does not. Most of what I know about software, search, and operations came from running something, not reading about it.",
  ],
  [
    "Follow the problem deeper",
    "The obvious problem is often a symptom. The interesting work is one or two layers underneath it.",
  ],
  [
    "Rebuild when it is warranted",
    "Improving a fundamentally broken system forever costs more than rebuilding it properly once. Knowing which situation you are in matters.",
  ],
  [
    "Stay curious",
    "Every system has something in it worth understanding, including the ones that look boring from outside.",
  ],
];

const faqs = [
  [
    "Who is Jaeden Doody?",
    "Jaeden Doody is a creator and developer based in Montreal, Quebec, and the founder of StillAwake Media. He builds software, digital products, and business systems, and came to technology from a background in mechanics.",
  ],
  [
    "Who founded StillAwake Media?",
    "StillAwake Media was founded by Jaeden Doody. It is the company through which he develops software, intelligent systems, and digital infrastructure for modern businesses.",
  ],
  [
    "Who created ZylX, and is it part of StillAwake Media?",
    "ZylX is a StillAwake Media product, created by Jaeden Doody. It is a business intelligence system — a Business Brain for AI — that connects a company's systems and makes that context available to authorized AI assistants through MCP.",
  ],
  [
    "What is BankDeMark?",
    "BankDeMark is a connected financial management platform founded by Jaeden Doody. It links personal and business financial records, transactions, invoices, and financial intelligence through its Command and Invoice products. It operates as its own organization rather than as a StillAwake Media product.",
  ],
  [
    "What is Jaeden's relationship to Blackwater Aquatics?",
    "Jaeden founded and operates Blackwater Aquatics Canada, an ecommerce business selling live fish food, bettas, shrimp, and aquarium livestock. It is a separate business from StillAwake Media, and it is where a lot of his ecommerce, SEO, fulfillment, and operations experience comes from firsthand.",
  ],
  [
    "What is Jaeden Doody's professional background?",
    "He started in mechanics, working on physical systems, and moved into software, websites, AI, automation, and business systems. The diagnostic approach carried over: understand the system, trace the failure to its actual cause, then repair or rebuild it.",
  ],
];

export default function Page() {
  const authoredPosts = getAllPosts().filter((post) =>
    personAuthorNames.has(post.author)
  );

  /**
   * Entity graph for this page.
   *
   * The StillAwake Organization and WebSite nodes are emitted once in the root
   * shell on every page, so this page references the organization by @id
   * instead of re-declaring it — re-declaring would create a competing node.
   *
   * Relationships are modelled on the side where Schema.org actually defines
   * them: `Organization.founder -> Person`, and `SoftwareApplication.creator /
   * .publisher` for the product. ZylX is a SoftwareApplication, so
   * `parentOrganization` would be invalid here and is not used. BankDeMark and
   * Blackwater Aquatics publish their own Organization @ids with no declared
   * parent, so they are separate organizations Jaeden founded — StillAwake is
   * not asserted as their parent company.
   */
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person.id,
        name: person.name,
        url: person.url,
        description: person.longBio,
        birthDate: person.birthDate,
        birthPlace: {
          "@type": "Place",
          name: person.birthPlaceName,
        },
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: person.locality,
            addressRegion: person.region,
            addressCountry: person.country,
          },
        },
        jobTitle: person.jobTitle,
        worksFor: { "@id": entityIds.organization },
        knowsAbout: [...person.knowsAbout],
        ...(person.sameAs.length ? { sameAs: [...person.sameAs] } : {}),
      },
      {
        "@type": "SoftwareApplication",
        "@id": entityIds.zylx,
        name: "ZYLX.ai",
        url: "https://zylx.ai",
        applicationCategory: "BusinessApplication",
        description: ventures[0].description,
        creator: { "@id": person.id },
        publisher: { "@id": entityIds.organization },
      },
      {
        "@type": "Organization",
        "@id": entityIds.bankdemark,
        name: "BankDeMark",
        url: "https://bankdemark.com",
        description: ventures[1].description,
        founder: { "@id": person.id },
      },
      {
        "@type": "Organization",
        "@id": entityIds.blackwater,
        name: "Blackwater Aquatics Canada",
        url: "https://blackwateraquatics.ca",
        description: ventures[2].description,
        founder: { "@id": person.id },
      },
      {
        "@type": "ProfilePage",
        "@id": `${person.url}#profilepage`,
        url: person.url,
        name: "Jaeden Doody — Founder of StillAwake Media",
        mainEntity: { "@id": person.id },
        isPartOf: { "@id": entityIds.website },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Founder",
            item: person.url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${person.url}#faq`,
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Founder
          </p>

          <h1 className="geist text-6xl font-black leading-[.9] tracking-[-0.075em] md:text-9xl">
            Jaeden Doody
          </h1>

          <p className="geist mt-6 text-xl font-bold tracking-[-0.03em] text-white md:text-2xl">
            Founder of StillAwake Media · Creator · Developer · Problem Solver
          </p>

          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-[#C7B9B9]">
            <p>
              Jaeden Doody is a creator and developer based in Montreal, Quebec,
              and the founder of{" "}
              <span className="text-white">StillAwake Media</span> — the company
              through which he builds software, digital products, and the
              business systems underneath them.
            </p>

            <p>
              He did not start in software. He started in mechanics, and that is
              still the most useful thing about how he works.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-[#D71920] px-6 py-4 font-bold">
              Work With StillAwake →
            </Link>

            <Link href="/work" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
              See the Work →
            </Link>

            <Link href="/fr/fondateur/jaeden-doody" lang="fr-CA" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
              Version française →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-4">
        <div className="mx-auto max-w-7xl">
          <div className="glass rounded-[2rem] p-8 md:p-10">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">
              Who is Jaeden Doody?
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[#C7B9B9]">
              Jaeden Doody is a creator and developer from Montreal, Quebec, and
              the founder of StillAwake Media, a studio that builds software,
              websites, ecommerce systems, and AI infrastructure. He came to
              technology from a background in mechanics, and he builds and
              operates his own ventures — including ZylX, a business
              intelligence system for AI; BankDeMark, a connected financial
              platform; and Blackwater Aquatics Canada, a live ecommerce
              business — which is where the expertise behind StillAwake&apos;s
              client work comes from firsthand.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Background
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            From mechanics to software.
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-[#C7B9B9]">
            <p>
              Before Jaeden was building software systems, he was working on
              mechanical ones. Mechanics enforces a discipline that is hard to
              fake: you cannot reliably fix something without understanding how
              it actually works. A part either moves or it does not. The engine
              either runs or it does not. There is no version of the job where
              you talk your way past a fault.
            </p>

            <p>
              So you learn a sequence. When something fails, you trace it. You
              inspect the components. You work out which one is actually
              responsible, as opposed to which one is easiest to blame. Then you
              repair it, or you decide the design was wrong and rebuild it.
            </p>

            <p>
              That sequence turned out to transfer almost completely. The
              objects changed; the thinking did not. Mechanical systems became
              software systems. Troubleshooting became debugging. Components
              became services, databases, APIs, and workflows. Rebuilding an
              assembly became product development.
            </p>

            <p>
              It is also why a lot of standard business advice does not land
              well with him. A recommendation with no mechanism behind it is
              just a guess with confidence attached — and in mechanics, guessing
              confidently is how you replace the wrong part twice.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Approach
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Building is how I learn.
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-[#C7B9B9]">
            <p>
              Jaeden does not treat learning and building as separate
              activities. The projects <em>are</em> the study — each one is a
              practical environment for understanding customers, software,
              operations, finance, marketing, search, automation, AI, data, and
              infrastructure at the same time, under real conditions where being
              wrong has consequences.
            </p>

            <p>
              The result is a loop rather than a straight line: find a problem,
              investigate what is really causing it, build something, operate it
              long enough to see where it strains, discover the next problem
              that was hiding underneath the first one, and improve the system.
            </p>

            <p>
              He has been known to create problems for himself deliberately —
              taking on a build he does not yet know how to finish, because
              having to finish it is what forces the learning. It is a habit of
              curiosity more than anything else.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 text-sm">
            {["Problem", "Investigate", "Build", "Operate", "New problem", "Improve"].map(
              (step, i) => (
                <span key={step} className="flex items-center gap-3">
                  <span className="glass rounded-full px-5 py-3 font-bold text-white">
                    {step}
                  </span>
                  {i < 5 && <span className="text-[#D71920]">→</span>}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            The Hours Nobody Sees
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            A shipped product hides most of the work.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            The visible part of a build is the launch. The real part is the
            night before it, and the fifty nights before that. An illustrative
            sequence — not literal timestamps, but a night any builder will
            recognize:
          </p>

          <div className="mt-10 max-w-2xl font-mono text-sm leading-7">
            {[
              ["11:47 PM", "One bug left before this can ship."],
              ["12:38 AM", "The bug isn't a bug. The architecture is wrong."],
              ["1:26 AM", "Architecture rewritten. Half the tests now fail — good, they were testing the wrong thing."],
              ["2:14 AM", "Tests pass. Deploy."],
              ["2:17 AM", "Watching it run, notices what it could do next."],
              ["2:18 AM", "Opens a new file."],
            ].map(([time, entry]) => (
              <div key={time} className="flex gap-4 border-l border-[#D71920]/40 py-2 pl-5">
                <span className="shrink-0 text-[#D71920]">{time}</span>
                <span className="text-[#C7B9B9]">{entry}</span>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            That last line is the important one. The name StillAwake has come to
            represent exactly this — not sleep deprivation as a badge of honor,
            but the state of being genuinely unable to leave a problem alone
            once the next solution is visible. The finished systems on this page
            are made of hundreds of those small, invisible loops: build, break,
            trace, learn, rebuild.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Companies &amp; Products
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            What I&apos;ve built.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Four things, with different relationships to each other. They are
            not all the same kind of venture, and it is worth being precise
            about which is which.
          </p>

          <div className="mt-12 space-y-5">
            <article className="rounded-[2.5rem] border border-[#D71920]/30 bg-[#D71920]/10 p-8 md:p-10">
              <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                Founded by Jaeden Doody · you are here
              </p>
              <h3 className="geist mt-4 text-3xl font-black tracking-[-0.05em] md:text-4xl">
                StillAwake Media
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#E7DFDF]">
                The company Jaeden founded, and the umbrella the rest of the
                work runs through. StillAwake Media builds software,
                intelligent systems, and digital infrastructure for modern
                businesses — identifying a real operational problem,
                understanding the system producing it, then building a
                practical solution. It exists because he kept running into
                those problems while operating businesses and got tired of
                stitching together tools that were not built for the job.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex text-sm font-bold text-white underline decoration-[#D71920] underline-offset-4"
              >
                More about StillAwake Media →
              </Link>
            </article>

            {ventures.map((venture) => (
              <article
                key={venture.key}
                className="rounded-[2.5rem] border border-white/10 bg-[#070707] p-8 md:p-10"
              >
                <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                  {venture.relationship}
                </p>

                <h3 className="geist mt-4 text-3xl font-black tracking-[-0.05em] md:text-4xl">
                  {venture.name}
                </h3>

                <p className="mt-2 text-sm text-[#8F8585]">{venture.tagline}</p>

                <p className="mt-4 max-w-3xl text-base leading-8 text-[#C7B9B9]">
                  {venture.key === "zylx" && (
                    <>
                      A StillAwake Media product, created by Jaeden.{" "}
                      {venture.description} It is the clearest example of the
                      pattern behind everything else here — the problem was
                      real, it was hit repeatedly while operating other
                      businesses, and the fix became a product.
                    </>
                  )}
                  {venture.key === "bankdemark" && (
                    <>
                      {venture.description} BankDeMark runs as its own
                      organization rather than as a StillAwake Media product —
                      Jaeden founded and builds it, but the two are separate
                      entities.
                    </>
                  )}
                  {venture.key === "blackwater" && (
                    <>
                      {venture.description} This one matters for a specific
                      reason: it is a real ecommerce business with real
                      customers, inventory, shipping, and search competition,
                      operated day to day. The experience behind StillAwake&apos;s
                      ecommerce, SEO, and automation work is firsthand rather
                      than theoretical. It is a separate business, not a
                      StillAwake Media property.
                    </>
                  )}
                </p>

                <a
                  href={venture.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex text-sm font-bold text-white underline decoration-[#D71920] underline-offset-4"
                >
                  {venture.domain} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Built, Not Claimed
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            The work, with numbers attached.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Adjectives are cheap; measurements are not. These four client builds
            are documented in full case studies where every number carries its
            source and date.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              ["/work/lisa-travel-design", "TravelDesign By Lisa", "An 834-URL trilingual travel platform — custom CMS, client portal, CRM, and an automated eSIM store — taken from zero organic clicks to page-1 rankings, covered by 412 tests."],
              ["/work/bankdemark", "BankDeMark", "A financial platform whose money math is verified against 26 golden test cases, holding average position 1.3 in search with a measured 100/100/100 Lighthouse score."],
              ["/work/stalkr-navtrl", "NAVTRL / Stalkr", "A real-time location app — 10,947 lines of TypeScript, sub-3-second sync, hold-to-activate SOS — taken from first commit to TestFlight-ready in 24 days."],
              ["/work/blackwater-aquatics", "Blackwater Aquatics", "An education-led Shopify store where 64 content pages power 17 products: a page-1 product page at 8.6% CTR and a repeat-customer rate up from 5.9% to 27.8%."],
            ].map(([href, name, detail]) => (
              <Link key={href} href={href} className="glass rounded-[2rem] p-7 transition hover:border-[#D71920]/60">
                <h3 className="geist text-2xl font-black tracking-[-0.05em]">{name}</h3>
                <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{detail}</p>
                <p className="mt-4 text-sm font-bold text-[#D71920]">Read the case study →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Technical Range
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            The stack, and what it&apos;s for.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Every technology below is in production in the projects on this
            page — none of it is résumé decoration.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              ["Web platforms", "TypeScript, React and Next.js — the foundation of StillAwake's sites and platforms, including this one. Used for server-rendered, SEO-sound systems rather than single-page demos."],
              ["Mobile", "React Native with Expo — one codebase shipping iOS and Android, proven by Stalkr's real-time location engine."],
              ["Data & security", "Supabase and PostgreSQL with row-level security on every table — including location data and financial records, where a missing policy is not a detail."],
              ["Payments & commerce", "Stripe for subscriptions, checkout and reconciliation; Shopify and Liquid for ecommerce, operated firsthand through Blackwater Aquatics."],
              ["AI systems", "AI model integration with engineered guardrails — ZylX connects business systems to AI assistants through the Model Context Protocol, built so assistants answer from real data instead of guessing."],
              ["Search & measurement", "Structured data, entity graphs, hreflang architecture, Search Console and Lighthouse — treated as engineering, with published, dated measurements."],
            ].map(([area, detail]) => (
              <div key={area}>
                <h3 className="geist text-xl font-black tracking-[-0.04em] text-white">{area}</h3>
                <p className="mt-3 text-sm leading-7 text-[#C7B9B9]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Areas of Work
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            What I work on.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Areas Jaeden builds and researches in. Some of these he has worked
            in for years; others are current and actively being learned.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            {person.knowsAbout.map((area) => (
              <span
                key={area}
                className="glass rounded-full px-5 py-3 text-sm text-[#C7B9B9]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Principles
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            How I approach problems.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map(([heading, body]) => (
              <div key={heading} className="glass rounded-[2rem] p-7">
                <h3 className="geist text-2xl font-black tracking-[-0.05em]">
                  {heading}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#C7B9B9]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/10 bg-[#070707] p-8 md:p-14">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            In His Own Words
          </p>

          <div className="mt-4 max-w-3xl space-y-6 text-lg leading-9 text-[#E7DFDF]">
            <p>
              &ldquo;I&apos;ve always wanted to know how things actually work.
              Mechanics gave me somewhere to start, and it was honest work in
              one specific way: if something was broken, you couldn&apos;t talk
              your way around it. You had to go find the problem.&rdquo;
            </p>

            <p>
              &ldquo;That followed me into software and business. These days
              instead of pulling apart an engine I&apos;m pulling apart
              workflows, APIs, financial systems, search problems, and AI
              infrastructure. Same instinct, different objects.&rdquo;
            </p>

            <p>
              &ldquo;I like building things. What I like more is understanding
              what I&apos;ve built and why it works — because that&apos;s the
              part that transfers to the next thing.&rdquo;
            </p>
          </div>

          <p className="geist mt-10 text-sm font-bold tracking-[-0.02em] text-[#8F8585]">
            — Jaeden Doody, Founder, StillAwake Media
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Currently Exploring
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            What I&apos;m building now.
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-[#C7B9B9]">
            <p>
              The current center of gravity is ZylX and the question underneath
              it: how do you give an AI assistant real, verified business
              context — so it answers from what is actually true about a
              company instead of improvising? That pulls in AI agents, the
              Model Context Protocol, business intelligence, and the
              guardrail engineering that keeps an assistant honest.
            </p>
            <p>
              Alongside it: StillAwake&apos;s async-first client system — an
              acquisition, onboarding and delivery pipeline that runs in
              English and French without mandatory sales calls — and the
              ongoing research into AI-search visibility (AEO) that
              StillAwake publishes and applies for clients.
            </p>
          </div>

          <p className="mt-8 text-sm text-[#8F8585]">Last updated: August 12, 2026</p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Writing &amp; Research
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Written by Jaeden Doody.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Articles Jaeden authored in{" "}
            <Link href="/stillawake-times" className="text-[#D71920] underline-offset-4 hover:underline">
              The StillAwake Times
            </Link>
            . Authorship on this site is literal — pieces he wrote carry his
            name; everything else is credited to the studio.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {authoredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/stillawake-times/${post.slug}`}
                className="glass rounded-[2rem] p-6 transition hover:border-[#D71920]/60"
              >
                <h3 className="geist text-xl font-black tracking-[-0.04em]">{post.title}</h3>
                <p className="mt-3 text-sm text-[#8F8585]">Read article →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
            Questions
          </p>

          <h2 className="geist max-w-4xl text-4xl font-black leading-[.95] tracking-[-0.06em] md:text-6xl">
            Common questions.
          </h2>

          <div className="mt-12 space-y-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="glass rounded-[2rem] p-7">
                <h3 className="geist text-xl font-black tracking-[-0.04em]">
                  {question}
                </h3>
                <p className="mt-3 max-w-4xl text-base leading-8 text-[#C7B9B9]">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks />
    </main>
  );
}
