import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinks } from "@/components/site";

/**
 * The global / United States entry point.
 *
 * Deliberately NOT another "web design agency" page competing on head
 * terms — that fight is unwinnable from a three-month-old domain. This
 * page targets the specific intent of someone who has decided to hire
 * remotely and is asking how it works: timezones, currency, contracts,
 * communication. Those questions are long-tail, low-competition, and
 * exactly what answer engines quote.
 */

const url = "https://stillawakemedia.com/global";

export const metadata: Metadata = {
  title: "Work With Us From Anywhere",
  description:
    "StillAwake Media is a remote-first digital studio working with clients across the United States, Canada, Europe and beyond. Written scope, fixed price, no sales calls, no timezone friction.",
  alternates: {
    canonical: url,
    languages: {
      "en-CA": url,
      "en-US": url,
      "x-default": url,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Work With StillAwake From Anywhere",
    description:
      "A remote-first studio. Describe your project in writing, get a written scope and a fixed price back. No sales calls, no timezone friction.",
    url,
    type: "website",
  },
};

/** How remote actually works here — the real questions, answered plainly. */
const faqs = [
  {
    q: "Do you work with clients outside Canada?",
    a: "Yes. StillAwake Media is remote-first and works with clients across the United States, Canada, Europe and Australia. Everything from the first enquiry to the final handover happens in writing and online, so location changes nothing about how the work runs.",
  },
  {
    q: "How do timezones work?",
    a: "We are based in Montréal (Eastern Time), which overlaps the full North American business day and the European afternoon. The process is asynchronous by design: you describe the project in writing, we reply with a written scope, and progress happens in your project space rather than in scheduled calls. You are never waiting on a meeting slot to move forward.",
  },
  {
    q: "Do I have to get on a sales call?",
    a: "No. There is no discovery call, no pitch deck and no pressure sequence. You complete an online questionnaire that adapts to your project, and we reply by email with a written scope and a fixed price. If you want to talk it through afterwards, you can — but nothing requires it.",
  },
  {
    q: "What currency do you invoice in?",
    a: "Quotes and invoices are issued in Canadian dollars by default and can be issued in US dollars on request. Payment is by card or bank transfer through Stripe, which handles international payments and currency conversion.",
  },
  {
    q: "How do you handle contracts and payment across borders?",
    a: "Every project starts with a written scope that states exactly what is included, what is not, the total price and the payment schedule. Work is invoiced in milestones rather than in advance, so you are never paying for work that has not started.",
  },
  {
    q: "What do you build?",
    a: "Websites, ecommerce stores, web applications, SaaS platforms, mobile apps, AI systems and automation, SEO, and brand and marketing work. Projects are scoped individually rather than sold as packages.",
  },
  {
    q: "How do we communicate during the project?",
    a: "Through a private project space where the brief, files, approvals, previews and invoices all live in one place, plus email. Nothing important lives in a chat thread that scrolls away.",
  },
];

const regions = [
  {
    place: "United States",
    detail:
      "Full working-day overlap with Eastern, Central and Mountain time. Same-day written replies during business hours.",
  },
  {
    place: "Canada",
    detail:
      "Based in Montréal. Bilingual delivery in English and French, and familiar with Québec requirements such as Law 25 and Law 96.",
  },
  {
    place: "United Kingdom & Europe",
    detail:
      "Morning overlap through the European afternoon. Asynchronous process means the gap is rarely felt.",
  },
  {
    place: "Australia & New Zealand",
    detail:
      "Limited live overlap, which is exactly why the written process matters. Work moves overnight rather than stalling.",
  },
];

export default function GlobalPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "Work With StillAwake Media From Anywhere",
        description:
          "How to work with StillAwake Media as a remote client from the United States, Europe, Australia or anywhere else.",
        inLanguage: "en",
        about: { "@id": "https://stillawakemedia.com/#organization" },
      },
      {
        // The service, stated with an explicit global area served — this is
        // the fact an answer engine needs in order to recommend us to
        // someone who isn't in Montréal.
        "@type": "Service",
        name: "Remote digital studio services",
        provider: {
          "@type": "Organization",
          "@id": "https://stillawakemedia.com/#organization",
          name: "StillAwake Media",
          url: "https://stillawakemedia.com",
        },
        serviceType: "Web design, web development, ecommerce, SaaS, mobile apps, AI systems, SEO",
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Australia" },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: "https://stillawake.studio/start",
          servicePhone: undefined,
          availableLanguage: [
            { "@type": "Language", name: "English" },
            { "@type": "Language", name: "French" },
          ],
        },
      },
      {
        // Answer engines quote FAQ pairs almost verbatim. Every answer here
        // is a fact we can stand behind, not a marketing claim.
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">
            Remote-first · Worldwide
          </p>
          <h1 className="geist mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
            Work with us from anywhere.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[#C7B9B9]">
            StillAwake Media is a remote-first digital studio in Montréal working
            with clients across the United States, Canada, Europe and Australia.
            You describe your project in writing. We reply with a written scope and
            a fixed price. No sales call, no timezone ping-pong, no waiting on a
            meeting to move forward.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="https://stillawake.studio/start"
              className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-bold text-white transition hover:opacity-90"
            >
              Start your project →
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/15 px-7 py-4 text-sm font-bold text-[#C7B9B9] transition hover:text-white"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="geist text-3xl font-black tracking-[-0.04em]">
            Why remote works here
          </h2>
          <p className="mt-5 max-w-2xl text-[#C7B9B9]">
            Most studios treat remote clients as a compromise — the same
            call-heavy process, stretched across timezones. Ours was built the
            other way round. The written process that removes sales calls for a
            client down the street is the same thing that makes a client eight
            timezones away feel local.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {regions.map((r) => (
              <div key={r.place} className="rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white">{r.place}</h3>
                <p className="mt-2 text-sm text-[#C7B9B9]">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="geist text-3xl font-black tracking-[-0.04em]">
            Questions people actually ask
          </h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="text-lg font-bold text-white">{f.q}</h3>
                <p className="mt-3 text-[#C7B9B9]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#D71920] p-10 md:p-16">
          <h2 className="geist text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Wherever you are, start the same way.
          </h2>
          <p className="mt-4 max-w-xl text-white/90">
            A few questions about what you want to build. A written scope and a
            fixed price back by email.
          </p>
          <Link
            href="https://stillawake.studio/start"
            className="mt-8 inline-flex rounded-full bg-black px-6 py-4 font-bold"
          >
            Start your project →
          </Link>
        </div>
      </section>
    </main>
  );
}
