import type { Metadata } from "next";
import { metaDescription } from "@/lib/meta-description";
import { OG_IMAGES } from "@/lib/og-image";
import Link from "next/link";

import { PageSchema } from "@/components/page-schema";
import { ProjectCalculator } from "@/components/tools/project-calculator";
import { ADDITIONS, BASES, DISCOVERY, DISCOVERY_SIZE_THRESHOLD } from "@/lib/pricing/model";
import { formatCad } from "@/lib/pricing/labels";

const url = "https://stillawakemedia.com/tools/app-development-cost-calculator";

/**
 * Keyword Planner (historical input in docs/seo/KEYWORD-TO-URL-MAP.md): "app
 * development cost calculator" 210/mo US. A different intent from the general
 * project calculator, whose searchers are budgeting a website, so it gets its
 * own landing page. It is NOT a second pricing model: the calculator below is
 * the same engine with the custom-software goal pre-answered, and every
 * figure on this page is read from src/lib/pricing/model.ts.
 */
export const metadata: Metadata = {
  title: "App Development Cost Calculator (Canada, CAD)",
  description:
    metaDescription(
    "Estimate what a web app, customer portal or SaaS platform would cost to build in Canada. Uses StillAwake Media's real pricing model, shows what drives the range, and states every assumption. Free, no email.",
  ),
  alternates: { canonical: url },
  openGraph: {
    title: "App Development Cost Calculator (Canada, CAD)",
    description:
      "A web app, portal or platform estimate from a studio's real pricing model, with the assumptions written down.",
    url,
    type: "website",
    images: OG_IMAGES,
  },
};

const band = (b: { low: number; high: number }) => `${formatCad(b.low, "en")}–${formatCad(b.high, "en")}`;

const APP_TYPES = [
  {
    name: "Internal tool or dashboard",
    who: "Your team only",
    price: band(BASES.software_dashboard.price),
    body: "Sign-in, a designed database, the core screens, reporting and an admin area, hosted and deployed. The low end is a tool whose requirements you already know; the high end has more workflows and integrations.",
  },
  {
    name: "Customer portal",
    who: "Your customers log in",
    price: band(BASES.software_portal.price),
    body: "Everything above plus roles and permissions and two surfaces: what customers see and what your team manages. Always scoped in a paid discovery first, because who-can-see-what decides most of the cost.",
  },
  {
    name: "Platform or SaaS",
    who: "Anyone can sign up",
    price: band(BASES.software_platform.price),
    body: "Public sign-up, several user types, multiple surfaces and an admin back office. Also scoped first. At this size the range is wide because two products with the same description can differ by months of work.",
  },
];

const FACTORS = [
  ["Customer accounts", band(ADDITIONS.accounts.price as { low: number; high: number }), "Sign-up, sign-in, password reset and a profile, on a tool that didn't need them."],
  ["Payments", band(ADDITIONS.payments.price as { low: number; high: number }), "Stripe Checkout or similar, with webhooks and receipts. Subscriptions with proration and dunning sit at the high end."],
  ["Each tool you already use", band(ADDITIONS.connect_tools.price as { low: number; high: number }), "A CRM, mailing list or analytics tool with a documented API."],
  ["Your own internal system", band(ADDITIONS.connect_internal.price as { low: number; high: number }), "An in-house database or legacy system. Higher because nobody can see inside it before work starts."],
  ["A custom feature", band(ADDITIONS.custom_functionality.price as { low: number; high: number }), "A specific piece of behaviour the base doesn't cover, such as a scheduling rule or a calculation engine."],
] as const;

const FAQS = [
  {
    q: "Is this a quote?",
    a: `No. It's the same pricing model we quote from, applied to your answers, so it's a realistic range rather than a lead-capture guess. Portals and platforms, and anything estimated above ${formatCad(DISCOVERY_SIZE_THRESHOLD, "en")}, go through a paid discovery from ${formatCad(DISCOVERY.from, "en")} first. Its fee is credited against the build, and it ends in a written scope and a fixed price.`,
  },
  {
    q: "Does it cover native iOS and Android apps?",
    a: "Not directly. The estimate is for a web application, which runs in any browser and can be installed to a phone's home screen as a progressive web app. A native app adds a second or third codebase, app store review and device testing, so we scope native work individually rather than quoting it from a calculator. Our guide to app development costs in Canada explains how much that typically changes the picture.",
  },
  {
    q: "Why is the range so wide?",
    a: "The low end is the simplest realistic build of what you selected. The high end is the same selection once integrations, workflows, data migration and revision rounds turn out to be substantial. They aren't a margin of error around one number, and most projects don't land at either extreme.",
  },
  {
    q: "What does it cost after launch?",
    a: "Hosting, monitoring, security updates and small fixes are an ongoing cost for any application. The estimate's result screen shows the care plan we'd recommend alongside the build. Larger new features are scoped and priced like any other work.",
  },
];

export default function AppDevelopmentCostCalculatorPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/tools/app-development-cost-calculator" />

      <section className="px-6 pt-32 pb-8">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#8C8080]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/tools" className="hover:text-white">Tools</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-[#C7B9B9]">App development cost calculator</li>
            </ol>
          </nav>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">Free tool</p>
          <h1 className="geist mt-5 text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-5xl">
            App development cost calculator
          </h1>
          <p className="mt-6 text-lg text-[#C7B9B9]">
            Answer a few questions about who will use your app and what it has to do, and get a range in Canadian
            dollars from the pricing model we actually quote from. Free, no email, and every assumption is written
            down below.
          </p>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6">
        <div className="mx-auto w-full max-w-2xl">
          <ProjectCalculator locale="en" preset={{ goal: "software" }} />
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.04em]">Where the estimate starts</h2>
          <p className="mt-5 text-[#C7B9B9]">
            The biggest factor is who uses the app, because that decides how many separate surfaces, permissions
            and edge cases have to be built. These are the starting bands, before anything is added.
          </p>
          <div className="mt-8 grid gap-4">
            {APP_TYPES.map((t) => (
              <div key={t.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{t.name}</h3>
                  <p className="geist text-xl font-black text-white">{t.price}</p>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8C8080]">{t.who}</p>
                <p className="mt-3 text-sm text-[#C7B9B9]">{t.body}</p>
              </div>
            ))}
          </div>

          <h2 className="geist mt-14 text-3xl font-black tracking-[-0.04em]">What moves it</h2>
          <p className="mt-5 text-[#C7B9B9]">
            Additions are priced as what they are, with a low end for the simple case and a high end for the
            involved one. They don&apos;t simply stack: the calculator combines them the way the work actually
            overlaps.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-[#8C8080]">
                <tr>
                  <th scope="col" className="py-3 pr-4 font-semibold">Factor</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Adds</th>
                  <th scope="col" className="py-3 font-semibold">What it means</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-[#C7B9B9]">
                {FACTORS.map(([name, price, detail]) => (
                  <tr key={name}>
                    <td className="py-3 pr-4 font-semibold text-white">{name}</td>
                    <td className="whitespace-nowrap py-3 pr-4">{price}</td>
                    <td className="py-3">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="geist mt-14 text-3xl font-black tracking-[-0.04em]">Assumptions</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-[#C7B9B9]">
            <li>Prices are in Canadian dollars, before sales tax, for a web application built by StillAwake Media.</li>
            <li>Every base includes authentication, database design, hosting setup and deployment. Design is included at a level that suits the product; a separate brand identity is not.</li>
            <li>Native iOS and Android apps, app store submission and hardware integrations are outside the calculator and scoped individually.</li>
            <li>Third-party running costs (hosting, email delivery, payment processing fees, paid APIs) are billed by those providers and aren&apos;t in the estimate.</li>
            <li>Content, data migration from an old system and the number of people approving the work all move the final figure; the calculator asks about the ones it can.</li>
          </ul>

          <h2 className="geist mt-14 text-3xl font-black tracking-[-0.04em]">Questions</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="text-lg font-bold text-white">{f.q}</h3>
                <p className="mt-3 text-[#C7B9B9]">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.02] p-7">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">Related</h2>
            <ul className="mt-4 space-y-2 text-[#C7B9B9]">
              <li><Link href="/stillawake-times/app-development-cost-canada" className="underline hover:text-white">How much it costs to build an app in Canada</Link>: native, cross-platform and web apps compared, with worked examples.</li>
              <li><Link href="/do-i-need-custom-software" className="underline hover:text-white">Do you need custom software?</Link> When an existing product is the better answer.</li>
              <li><Link href="/tools/project-cost-calculator" className="underline hover:text-white">Project cost calculator</Link>: websites, stores, SEO and automation.</li>
              <li><Link href="/software-development" className="underline hover:text-white">Custom software development</Link>: how we build and what we&apos;ve built.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
