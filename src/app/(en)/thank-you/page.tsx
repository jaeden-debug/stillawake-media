import type { Metadata } from "next";
import Link from "next/link";

/**
 * Post-submission confirmation for the StillAwake Studio intake.
 *
 * The questionnaire lives on stillawake.studio, but the thank-you page lives
 * here because this is the acquisition domain — the one that will carry
 * Google Ads conversion measurement. Studio redirects here only after the
 * lead row is written, so a visit means a real submission happened.
 *
 * Transactional, not editorial: noindex/nofollow, absent from the sitemap,
 * absent from navigation, and carrying no structured data. It exists to
 * close the loop for the visitor, not to rank.
 */
export const metadata: Metadata = {
  // The root layout appends "| StillAwake Media" — naming the brand here too
  // would double it, which is the exact bug 3db8c04 cleaned out of 40 titles.
  title: "Project Received",
  description:
    "Your project details have been received. StillAwake Media will review your submission and follow up with the next steps.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const CTA_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium tracking-[-0.02em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D71920]";

export default function ThankYou() {
  return (
    <main className="bg-black pt-28 text-white">
      <section className="px-6 pb-32 pt-24">
        <div className="mx-auto max-w-3xl">
          {/* Success mark. Decorative — the heading already carries the message. */}
          <div
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-full border border-[#D71920]/40 bg-[#D71920]/20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-white"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <p className="mt-8 text-sm uppercase tracking-[.3em] text-[#D71920]">
            Project received
          </p>

          <h1 className="geist mt-5 text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Thanks — your project is in.
          </h1>

          <p className="mt-8 text-lg leading-8 text-[#C7B9B9]">
            We&apos;ve received your project details. StillAwake Media will review what
            you submitted and follow up with the next steps.
          </p>

          <p className="mt-4 text-base leading-8 text-[#8F8585]">
            You don&apos;t need to submit the form again.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/" className={`${CTA_BASE} bg-white font-bold text-black hover:bg-white/90`}>
              Back to StillAwake Media
            </Link>
            <Link
              href="/stillawake-times"
              className={`${CTA_BASE} glass hover:bg-white/[0.08]`}
            >
              Read StillAwake Times
            </Link>
          </div>

          <p className="mt-12 border-t border-white/10 pt-8 text-sm leading-7 text-[#8F8585]">
            While you&apos;re here, explore how we build websites, software and digital
            systems.
          </p>
        </div>
      </section>
    </main>
  );
}
