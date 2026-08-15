import Link from "next/link";
import type { GuideStep, PlatformGuide } from "@/lib/llms-txt-guides/types";

/**
 * Renders one platform guide.
 *
 * Entirely server-rendered. Code blocks are plain <pre><code> with no
 * highlighting library — one guide shows at most five short snippets, and
 * shipping a tokenizer to the browser for that would cost more than it
 * returns on a page whose whole argument is that technical detail matters.
 */

const SUPPORT_LABEL: Record<PlatformGuide["supportStatus"]["kind"], string> = {
  native: "Built in",
  plugin: "Via plugin",
  manual: "Do it yourself",
  none: "Not supported",
};

function Code({ code }: { code: NonNullable<GuideStep["code"]> }) {
  return (
    <figure className="mt-5">
      {code.caption ? (
        <figcaption className="mb-2 text-xs text-[#8C8080]">{code.caption}</figcaption>
      ) : null}
      <pre className="overflow-x-auto rounded-lg border border-white/10 bg-[#0B0B0B] p-4 text-[13px] leading-relaxed">
        <code className={`language-${code.language} whitespace-pre text-[#D7CFCF]`}>
          {code.content}
        </code>
      </pre>
    </figure>
  );
}

function Steps({ steps, start = 1 }: { steps: GuideStep[]; start?: number }) {
  return (
    <ol className="mt-8 space-y-10">
      {steps.map((step, i) => (
        <li key={step.title}>
          <h3 className="geist text-xl font-black tracking-[-0.04em]">
            <span className="mr-3 text-[#D71920]">{start + i}.</span>
            {step.title}
          </h3>
          <p className="mt-3 text-[#C7B9B9]">{step.body}</p>
          {step.code ? <Code code={step.code} /> : null}
        </li>
      ))}
    </ol>
  );
}

export function PlatformGuideView({ guide }: { guide: PlatformGuide }) {
  const verified = new Date(guide.verifiedDate).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="bg-black text-white">
      <section className="px-6 pt-32 pb-10">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-xs text-[#8C8080]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/tools" className="hover:text-white">
                  Tools
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/tools/llms-txt-generator" className="hover:text-white">
                  llms.txt
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#C7B9B9]">{guide.platform}</li>
            </ol>
          </nav>

          <h1 className="geist mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] md:text-5xl">
            {guide.title}
          </h1>

          <p className="mt-7 text-lg text-[#C7B9B9]">{guide.intro}</p>

          {/* The answer box. Someone who reads only this should still leave correct. */}
          <div className="mt-9 rounded-xl border border-[#D71920]/30 bg-[#D71920]/[0.06] p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#D71920]">
              {guide.platform} · {SUPPORT_LABEL[guide.supportStatus.kind]}
            </p>
            <p className="mt-3 text-[#E6DCDC]">{guide.supportStatus.summary}</p>
            <dl className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">Where it lives</dt>
                <dd className="mt-1 text-sm text-[#C7B9B9]">{guide.fileLocation}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-[#8C8080]">How it works</dt>
                <dd className="mt-1 text-sm text-[#C7B9B9]">{guide.implementationMethod}</dd>
              </div>
            </dl>
          </div>

          <p className="mt-4 text-xs text-[#8C8080]">
            Platform behaviour verified against primary documentation on {verified}. This is a fast-moving
            area — if you are reading long after that date, re-check the sources at the end.
          </p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="geist text-3xl font-black tracking-[-0.06em]">Before you start</h2>
          <ul className="mt-5 space-y-3">
            {guide.prerequisites.map((p) => (
              <li key={p} className="flex gap-3 text-[#C7B9B9]">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D71920]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <h2 className="geist mt-16 text-3xl font-black tracking-[-0.06em]">
            Implementation on {guide.platform}
          </h2>
          <Steps steps={guide.steps} />

          <h2 className="geist mt-16 text-3xl font-black tracking-[-0.06em]">Example</h2>
          <p className="mt-3 text-[#C7B9B9]">{guide.example.caption}</p>
          <Code code={{ language: guide.example.language, content: guide.example.content }} />

          <h2 className="geist mt-16 text-3xl font-black tracking-[-0.06em]">
            What catches people out
          </h2>
          <div className="mt-6 space-y-6">
            {guide.gotchas.map((g) => (
              <div key={g.title} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                <h3 className="geist font-black tracking-[-0.03em]">{g.title}</h3>
                <p className="mt-2 text-sm text-[#C7B9B9]">{g.body}</p>
              </div>
            ))}
          </div>

          <h2 className="geist mt-16 text-3xl font-black tracking-[-0.06em]">Verify it worked</h2>
          <Steps steps={guide.verificationMethod} />

          <h2 className="geist mt-16 text-3xl font-black tracking-[-0.06em]">
            What this will not do
          </h2>
          <ul className="mt-5 space-y-3">
            {guide.limitations.map((l) => (
              <li key={l} className="flex gap-3 text-[#C7B9B9]">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8C8080]" />
                <span>{l}</span>
              </li>
            ))}
          </ul>

          {/* One CTA, after the answer — not interleaved through the instructions. */}
          <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.03] p-7">
            <h2 className="geist text-2xl font-black tracking-[-0.05em]">
              See what an answer engine can actually tell about your site
            </h2>
            <p className="mt-3 text-[#C7B9B9]">
              Publishing the file is the easy half. Our free checker reads your site the way an assistant
              would and reports which facts are missing — owner, pricing, service area, contact route —
              because those are what stop you being described accurately, with or without an llms.txt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/llms-txt-generator"
                className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b5141b]"
              >
                Check your site — free
              </Link>
              {guide.relatedServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <h2 className="geist mt-16 text-3xl font-black tracking-[-0.06em]">Sources</h2>
          <p className="mt-3 text-sm text-[#8C8080]">
            Platform facts on this page come from the documentation below, checked on {verified}.
          </p>
          <ul className="mt-5 space-y-3">
            {guide.sources.map((s) => (
              <li key={s.url} className="text-sm">
                <a
                  href={s.url}
                  className="text-[#C7B9B9] underline decoration-white/25 underline-offset-4 hover:text-white"
                  rel="noopener"
                >
                  {s.label}
                </a>
                <span className="ml-2 text-xs uppercase tracking-[0.2em] text-[#5F5757]">
                  {s.kind}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="geist mt-16 text-3xl font-black tracking-[-0.06em]">Other platforms</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {guide.relatedGuides.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/tools/llms-txt/${slug}`}
                  className="inline-block rounded-full border border-white/20 px-5 py-2.5 text-sm text-[#C7B9B9] transition hover:border-white/50 hover:text-white"
                >
                  llms.txt on {slug === "nextjs" ? "Next.js" : slug === "wordpress" ? "WordPress" : "Shopify"}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-14 border-t border-white/10 pt-6 text-sm text-[#8C8080]">
            Written and technically verified by{" "}
            <Link href="/founder/jaeden-doody" className="text-[#C7B9B9] underline underline-offset-4 hover:text-white">
              Jaeden Doody
            </Link>
            , founder of StillAwake Media, who builds and maintains the {guide.platform} implementations
            described here. Implementation verified {verified}.
          </p>
        </div>
      </section>
    </main>
  );
}
