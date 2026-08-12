import type { Metadata } from "next";
import { ServiceJsonLd, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Case Study: NAVTRL / Stalkr — A Location App in TestFlight in 24 Days",
  description:
    "How StillAwake Media built Stalkr: an 11,000-line real-time location app (crews, zones, SOS) in 24 days, plus a 31-route growth engine scoring 98/100/100 with a perfect AI-navigability score.",
  alternates: {
    canonical: "https://stillawakemedia.com/work/stalkr-navtrl",
    languages: {
      "en-CA": "https://stillawakemedia.com/work/stalkr-navtrl",
      "fr-CA": "https://stillawakemedia.com/fr/etude-de-cas-stalkr-navtrl",
      "x-default": "https://stillawakemedia.com/work/stalkr-navtrl",
    },
  },
  openGraph: {
    title: "Case Study: NAVTRL / Stalkr | StillAwake Media",
    description: "A real-time location app in TestFlight in 24 days — plus the growth engine around it.",
    url: "https://stillawakemedia.com/work/stalkr-navtrl",
    type: "article",
  },
};

const METRICS: [string, string, string][] = [
  ["24 days", "Idea → TestFlight-ready build", "10,947 lines of TypeScript across 11 screens: live crew tracking, geofenced zones, trails, invites, and safety journeys — first commit to TestFlight-prep in under a month (May 2026, git history)."],
  ["< 3 seconds", "Real-time position sync", "Supabase Realtime fan-out with a sub-3-second update target, ghost-marker detection past 5 minutes, and per-layer render optimization documented in a 355-line rebuild architecture."],
  ["3s hold · 60s cooldown", "Safety engineering", "The SOS trigger is deliberately hard to fire by accident and impossible to spam — hold-to-activate with cooldowns, plus 'I'm OK' pings and journey watchers with their own push channel."],
  ["98 / 100 / 100", "Marketing site, measured", "navtrl.com: Accessibility 98, Best Practices 100, SEO 100 — plus a perfect 100 on Agentic Browsing, the AI-navigability audit. Chrome Lighthouse (mobile), run by us Aug 12, 2026."],
  ["31 routes", "The growth engine", "19 intent-targeted landing pages, 40 articles, live watch-pages with rich link previews, and Apple App Site Association deep links — built in 19 days alongside the app."],
  ["34 templates", "Lifecycle marketing built-in", "A 7-email welcome drip, activation sequences, and 30/60/90-day winbacks — 34 email templates wired to the waitlist before launch, not after."],
];

export default function StalkrCaseStudy() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/work/stalkr-navtrl"
        name="Case Study: NAVTRL / Stalkr"
        description="Real-time location app (crews, zones, SOS) built to TestFlight in 24 days, with a 31-route growth engine measured at 98/100/100."
        breadcrumb={[
          ["Home", "/"],
          ["Case Studies", "/work"],
          ["NAVTRL / Stalkr", "/work/stalkr-navtrl"],
        ]}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Case Study · Mobile App / SaaS</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Stalkr: a real-time location app, built to beta in 24 days.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <a href="https://navtrl.com" className="text-[#D71920] underline-offset-4 hover:underline" rel="noopener">NAVTRL</a>&apos;s
            Stalkr is live-location software for crews who go off-grid — hunters, road-trippers, families: real-time
            positions, geofenced zones, trails, and safety journeys with SOS. We built the React Native app AND the
            growth machine around it — landing pages, lifecycle email, live share-pages — as one system. Numbers
            sourced and dated below.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {METRICS.map(([big, label, detail]) => (
              <div key={label} className="rounded-[2rem] border border-white/10 p-7">
                <p className="geist text-3xl font-black tracking-[-0.04em] text-[#D71920]">{big}</p>
                <h2 className="mt-2 text-lg font-semibold">{label}</h2>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 max-w-3xl">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">The honest part</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              Stalkr is in TestFlight beta — it has not shipped to the public App Store yet, and we say so. What the
              build proves is velocity with discipline: a 60-case QA checklist with explicit thresholds, a root-cause
              table for every map bug fixed (six of them, each with the actual cause named), and row-level security on
              every table including location data. Products in beta deserve the same engineering honesty as products
              at scale.
            </p>
          </div>
        </div>
      </section>

      <RelatedServices
        title="The services behind this build"
        links={[
          ["Custom Software Development", "/software-development"],
          ["Web Design Montréal", "/web-design-montreal"],
          ["SEO Montréal", "/seo-montreal"],
          ["All case studies", "/work"],
          ["Version française", "/fr/etude-de-cas-stalkr-navtrl"],
        ]}
      />
    </main>
  );
}
