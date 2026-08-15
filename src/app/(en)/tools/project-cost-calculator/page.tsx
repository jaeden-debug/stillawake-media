import type { Metadata } from "next";
import Link from "next/link";

import { PageSchema } from "@/components/page-schema";
import { ProjectCalculator } from "@/components/tools/project-calculator";
import { DISCOVERY, MINIMUM, PRICING_VERSION } from "@/lib/pricing/model";

const url = "https://stillawakemedia.com/tools/project-cost-calculator";
const frUrl = "https://stillawakemedia.com/fr/outils/calculateur-cout-projet";

/**
 * The keyword research behind this page (Google Keyword Planner, 2026-08) put
 * "website design cost", "website development cost", "cost to build a website"
 * and "web design cost" each at 100–1K/month. They are all the same intent —
 * someone trying to budget — so they get ONE page rather than four thin ones.
 * "SEO cost" and "custom software development" are adjacent but distinct
 * intents already served by /pricing and the cost articles; this page links to
 * them instead of trying to rank for them too.
 */
export const metadata: Metadata = {
  title: "Website & Project Cost Calculator — Real Canadian Pricing",
  description:
    "Estimate what a website, online store, SEO programme or custom software project would actually cost in Canada. Free, no email, answers in plain language — built on StillAwake Media's real pricing, in CAD.",
  alternates: {
    canonical: url,
    languages: { "en-CA": url, "fr-CA": frUrl, "x-default": url },
  },
  /* The share card is written for the RESULT, not the tool: what gets shared is
     almost always someone's estimate, and "Website & Project Cost Calculator"
     describes the page they left rather than the thing they are showing you. */
  openGraph: {
    title: "Your StillAwake Project Estimate",
    description: "See your project scope, estimated investment, and next steps.",
    url,
    type: "website",
    images: [
      {
        url: "https://stillawakemedia.com/og-project-estimate.jpg",
        width: 1200,
        height: 630,
        alt: "StillAwake Media — project estimate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your StillAwake Project Estimate",
    description: "See your project scope, estimated investment, and next steps.",
    images: ["https://stillawakemedia.com/og-project-estimate.jpg"],
  },
};

export default function ProjectCostCalculatorPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/tools/project-cost-calculator" />

      {/* The card shares one viewport with a deliberately short intro. The long
          explanation moved below it: three paragraphs above the fold pushed the
          calculator 800px down the page, so nobody ever saw it without
          scrolling, and it could never be centred on screen. */}
      {/* The calculator gets the first screen to itself. The h1 and the
          explanation live below it: this is a tool page, and the tool being
          above the fold matters more than the prose introducing it. */}
      <section className="flex min-h-[100svh] items-center justify-center px-5 pb-4 pt-16 sm:px-6 sm:pb-6 sm:pt-24 [@media(max-height:720px)]:pb-3">
        {/* max-w-2xl is StudioQuestionCard's own width. */}
        <div className="mx-auto w-full max-w-2xl">
          <ProjectCalculator locale="en" />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Free tool</p>
          <h1 className="geist mt-5 text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-5xl">
            What would your project actually cost?
          </h1>
          <div className="mt-6 space-y-5 text-[#C7B9B9]">
            <p className="text-lg">
              Most cost calculators are lead-capture forms wearing a number. This one runs the same
              pricing model StillAwake Media uses internally to scope real work, so the range you get
              is the range we would start from — not a figure designed to get you on a call.
            </p>
            <p>
              It asks about your business, not about technology. You do not need to know whether you
              need Shopify, an API or a booking engine; describe what should happen and the model
              works out what that takes to build.
            </p>
            <p className="text-sm text-[#8C8080]">
              Free · no signup · no email · nothing stored. All figures in Canadian dollars.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.05em]">How this estimate is built</h2>

          <div className="mt-7 space-y-6 text-[#C7B9B9]">
            <div>
              <h3 className="font-semibold text-white">A normal project is a normal price</h3>
              <p className="mt-2">
                The model starts from a real project — a professional business website with the pages,
                forms, analytics and search foundations any business needs — and adds only what you
                actually asked for. It is not a theoretical calculation of agency effort, and it does
                not price your project higher because your company has more people in it.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Services combine — they are not a category</h3>
              <p className="mt-2">
                A restaurant site built to rank with a blog is not one of four options, it is four kinds
                of work at once. So you pick everything that applies and set how deep each one goes.
                That is also why the estimate can move sharply: depth is where the cost lives.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Bigger organisations genuinely cost more to serve</h3>
              <p className="mt-2">
                Not because they can afford it — because several stakeholders means several review
                rounds, compliance means real conformance testing, and connecting to systems we cannot
                see inside is genuinely harder. Those are itemisable, so we itemise them. An
                owner-operator who decides in one message selects none of them and pays the base price.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">The same word can mean very different builds</h3>
              <p className="mt-2">
                &quot;Booking&quot; might mean a link to a scheduling tool, an embedded reservation
                system, or your own availability engine with staff and resource rules. Those are not
                variations on one price — they are three different projects. So the calculator asks a
                follow-up rather than averaging them, which is why the estimate changes sharply when
                you answer it.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Uncertainty widens the range, it does not inflate it</h3>
              <p className="mt-2">
                When a project has to connect to a system nobody outside your business has seen, we
                cannot honestly say how hard that will be. Rather than inventing a number for it, the
                top of the range moves and the bottom stays put. A wider range is the honest output of
                an unclear scope.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Monthly services are kept separate</h3>
              <p className="mt-2">
                SEO, care plans and hosting are recurring costs, and folding them into a project total
                makes both numbers meaningless. Where a monthly price is published it is shown as a
                monthly price; where it is not, it says so rather than inventing one. Our published
                plans are on the{" "}
                <Link href="/pricing" className="text-[#D71920] underline-offset-4 hover:underline">
                  pricing page
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">There is a floor, and there is a product at it</h3>
              <p className="mt-2">
                Nothing is built for under CA${MINIMUM.toLocaleString("en-CA")} — below that the scoping,
                review and handover cost more than the work. But that floor is a real product, not a
                discounted custom project: Launch is our proven layout with your brand applied, up to
                five pages, one revision round. Fixed scope is exactly what makes the price possible.
                Smaller jobs than that are{" "}
                <Link href="/website-maintenance" className="text-[#D71920] underline-offset-4 hover:underline">
                  one-time support
                </Link>
                , which has its own published prices.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Above a point, we stop quoting and start scoping</h3>
              <p className="mt-2">
                Nobody can honestly price a platform from a questionnaire — the requirements are the
                expensive part and they do not exist yet. So past roughly CA$40,000, and for any
                software build, the tool offers paid discovery instead of a confident number. That is
                from CA${DISCOVERY.from.toLocaleString("en-CA")}, it produces a written scope and a fixed
                build price, and the fee comes off the build.
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-[#5a5252]">
            Pricing model {PRICING_VERSION}
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.05em]">Read further</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["How much does a website cost in Canada?", "/website-cost-canada"],
              ["How much does SEO cost in Canada?", "/stillawake-times/how-much-does-seo-cost-canada"],
              [
                "What custom software costs in Canada",
                "/stillawake-times/custom-software-development-cost-canada",
              ],
              ["Published rates — no sales call", "/pricing"],
              ["Free tools", "/tools"],
              ["Website redesign", "/website-redesign"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-white/10 px-5 py-4 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/50 hover:text-white"
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
