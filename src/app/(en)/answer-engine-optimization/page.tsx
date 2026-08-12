import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Answer Engine Optimization (AEO) & AI Search Services | Montréal",
  description:
    "AEO, GEO, and AI search optimization from Montréal: make ChatGPT, Perplexity, Gemini, and Google AI Overviews find, understand, and cite your business. Clear deliverables, no hype.",
  alternates: {
    canonical: "https://stillawakemedia.com/answer-engine-optimization",
    languages: {
      "en-CA": "https://stillawakemedia.com/answer-engine-optimization",
      "fr-CA": "https://stillawakemedia.com/fr/referencement-ia",
      "x-default": "https://stillawakemedia.com/answer-engine-optimization",
    },
  },
  openGraph: {
    title: "Answer Engine Optimization (AEO) | StillAwake Media",
    description: "Get found and cited by AI search — entity graphs, structured data, answer-ready content.",
    url: "https://stillawakemedia.com/answer-engine-optimization",
    type: "website",
  },
};

const FAQ: [string, string][] = [
  [
    "What is answer engine optimization (AEO)?",
    "Answer engine optimization is the practice of structuring your website and business information so AI systems — ChatGPT, Perplexity, Gemini, Google AI Overviews — can find it, understand it, trust it, and cite it when people ask questions your business answers. It builds on SEO rather than replacing it.",
  ],
  [
    "What's the difference between AEO, GEO, and AI SEO?",
    "They largely describe the same emerging discipline from different angles. AEO (answer engine optimization) focuses on being the answer engines' source; GEO (generative engine optimization) emphasizes generative AI results; 'AI SEO' and 'AI search optimization' are broader umbrella terms. The terminology hasn't standardized — the underlying work (entities, structured data, answer-shaped content, citations) is what matters.",
  ],
  [
    "How is AEO different from traditional SEO?",
    "SEO earns positions on a results page; AEO earns citations inside a generated answer. AI engines lean harder on machine-readable signals: a consistent entity graph, structured data, clearly attributed authorship, extractable factual statements, and third-party corroboration. Good AEO work usually improves classic SEO at the same time.",
  ],
  [
    "What do you actually deliver?",
    "An AI-visibility audit of how engines currently represent your business; entity and structured-data implementation (Organization, Service, pricing, authorship); answer-shaped rewrites of key pages; an llms.txt and machine-readable business facts; citation-source development; and before/after visibility checks across major AI engines.",
  ],
  [
    "How much does AEO cost?",
    "AEO engagements are custom-quoted because scope depends on your site's size and current machine-readability. Describe your site through our project intake and you'll receive a written scope and price — asynchronously, no sales call.",
  ],
  [
    "Do you practice what you sell?",
    "Yes — this site runs a consolidated schema.org entity graph, publishes llms.txt for AI crawlers, and exposes real service pricing in extractable form. The techniques on this page are the ones applied to it.",
  ],
];

export default function AeoPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/answer-engine-optimization"
        name="Answer Engine Optimization (AEO) & AI Search Optimization"
        description="AEO/GEO services: entity graphs, structured data, answer-ready content, and citation development so AI search engines cite your business. Custom-quoted."
        breadcrumb={[
          ["Home", "/"],
          ["Services", "/services"],
          ["Answer Engine Optimization", "/answer-engine-optimization"],
        ]}
        faq={FAQ}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">AEO · AI Search</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Answer engine optimization: be the business AI recommends.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            <strong className="text-white">What is AEO?</strong> Answer engine optimization structures your website so
            AI systems — ChatGPT, Perplexity, Gemini, Google AI Overviews — can find, understand, trust, and{" "}
            <em>cite</em> your business when buyers ask questions you answer. Search is splitting into rankings and
            answers; AEO is how you show up in the second one. StillAwake Media builds this from Montréal for clients
            anywhere.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-[#D71920] px-7 py-4 text-sm font-medium transition hover:opacity-90">
              Request an AI Visibility Audit
            </Link>
            <Link href="/seo-montreal" className="rounded-full border border-white/15 px-7 py-4 text-sm font-medium transition hover:border-white/40">
              Classic SEO Services
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-5xl">
            AEO, GEO, AI SEO — the terms are messy. The work isn't.
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
            You&apos;ll see answer engine optimization (AEO), generative engine optimization (GEO), AI search
            optimization, and LLM visibility used almost interchangeably. None of them is an official standard. Under
            every label, the same things decide whether AI cites you:
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Entity clarity", "One consistent, machine-readable identity: who you are, what you do, where, for whom — expressed in linked schema.org data, not just prose."],
              ["Answer-shaped content", "Pages that state the answer — what a service is, what it costs, who it's for — in extractable sentences, not marketing fog."],
              ["Machine access", "Clean semantic HTML, structured data that matches visible content, llms.txt, and crawlable architecture AI systems can parse."],
              ["Corroboration", "Citations, directories, first-party data, and authorship signals that give engines reasons to trust you over a competitor."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-[2rem] border border-white/10 p-7">
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Deliverables</h2>
            <ul className="mt-6 space-y-3 text-[#C7B9B9]">
              <li>— AI-visibility audit: how ChatGPT, Perplexity &amp; Gemini currently describe you</li>
              <li>— Entity graph + structured data implementation (Organization, Service, Offer, Person)</li>
              <li>— Answer-shaped rewrites of your key commercial pages</li>
              <li>— llms.txt + machine-readable business facts</li>
              <li>— Citation-source and directory development</li>
              <li>— Before/after AI-visibility comparison</li>
            </ul>
          </div>
          <div>
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Pricing &amp; process</h2>
            <p className="mt-6 leading-8 text-[#C7B9B9]">
              AEO engagements are <strong className="text-white">custom-quoted</strong> — scope depends on your
              site&apos;s size and how machine-readable it already is. Describe your site through our async project
              intake; you&apos;ll get a written scope, timeline, and fixed price by email. No discovery call required.
              AEO pairs naturally with our <Link href="/seo-montreal" className="text-[#D71920] underline-offset-4 hover:underline">SEO plans from $600 CAD/month</Link>.
            </p>
            <Link href="/contact" className="mt-8 inline-flex rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium transition hover:opacity-90">
              Start the Intake
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock title="AEO questions, answered plainly" items={FAQ} />

      <RelatedServices
        title="Related services"
        links={[
          ["SEO Montréal", "/seo-montreal"],
          ["Local SEO", "/local-seo"],
          ["Web Design Montréal", "/web-design-montreal"],
          ["Website Maintenance", "/website-maintenance"],
          ["Version française", "/fr/referencement-ia"],
        ]}
      />
    </main>
  );
}
