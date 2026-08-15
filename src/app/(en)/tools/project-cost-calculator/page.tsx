import type { Metadata } from "next";
import Link from "next/link";

import { PageSchema } from "@/components/page-schema";
import { ProjectCalculator } from "@/components/tools/project-calculator";
import { GLOBAL_MINIMUM, PRICING_VERSION } from "@/lib/pricing/model";

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
  openGraph: {
    title: "Website & Project Cost Calculator",
    description:
      "Answer a few questions in plain language and get a realistic CAD range for a website, store, SEO programme or custom software project.",
    url,
    type: "website",
  },
};

export default function ProjectCostCalculatorPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/tools/project-cost-calculator" />

      <section className="px-6 pb-10 pt-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Free tool</p>
          <h1 className="geist mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
            What would your project actually cost?
          </h1>
          <p className="mt-7 text-lg text-[#C7B9B9]">
            Most cost calculators are lead-capture forms wearing a number. This one runs the same
            pricing model StillAwake Media uses internally to scope real work, so the range you get is
            the range we would start from — not a figure designed to get you on a call.
          </p>
          <p className="mt-5 text-[#C7B9B9]">
            It asks about your business, not about technology. You do not need to know whether you need
            Shopify, an API or a booking engine; describe what should happen and the model works out
            what that takes to build.
          </p>
          <p className="mt-5 text-sm text-[#8C8080]">
            Free · no signup · no email · nothing stored. All figures in Canadian dollars.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <ProjectCalculator locale="en" />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.05em]">How this estimate is built</h2>

          <div className="mt-7 space-y-6 text-[#C7B9B9]">
            <div>
              <h3 className="font-semibold text-white">It prices capabilities, not pages</h3>
              <p className="mt-2">
                Ten straightforward pages are often less work than one application screen. The model
                starts from a foundation — the minimum meaningful version of what you are building —
                and prices what you need on top of it. Page count adjusts the estimate, but it never
                drives it.
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
              <h3 className="font-semibold text-white">There is a floor</h3>
              <p className="mt-2">
                StillAwake Media does not take build engagements under CA$
                {GLOBAL_MINIMUM.toLocaleString("en-CA")}. Below that the scoping, review and handover
                cost more than the work. Smaller jobs are handled as{" "}
                <Link
                  href="/website-maintenance"
                  className="text-[#D71920] underline-offset-4 hover:underline"
                >
                  one-time support
                </Link>{" "}
                instead, which has its own published prices.
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
