import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";

/**
 * Privacy policy.
 *
 * Every factual claim here was verified against the running site rather than
 * copied from a template: the trackers listed are the three that actually
 * load, the cookie names are the ones actually observed in the browser, and
 * the processors named are the ones the codebase actually calls.
 *
 * This is a factual disclosure, not legal advice. It should be reviewed by
 * counsel before being relied on for compliance.
 */

const url = "https://stillawakemedia.com/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What StillAwake Media collects, which analytics tools run, which cookies are set, how consent works, and how to contact us about your data.",
  alternates: {
    canonical: url,
    languages: {
      "en-CA": url,
      "fr-CA": "https://stillawakemedia.com/fr/confidentialite",
      "x-default": url,
    },
  },
};

const updated = "13 August 2026";

export default function PrivacyPage() {
  return (
    <main className="bg-black text-white">
      <PageSchema route="/privacy" />

      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="geist text-4xl font-black tracking-[-0.04em] md:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-sm text-[#C7B9B9]">Last updated {updated}</p>

          <div className="mt-12 space-y-10 text-[#C7B9B9]">
            <section>
              <h2 className="geist text-2xl font-bold text-white">Who we are</h2>
              <p className="mt-3">
                StillAwake Media is a digital studio based in Montréal, Québec,
                Canada, operating remotely with clients internationally. For any
                privacy question, contact{" "}
                <a href="mailto:jaeden@stillawakemedia.com" className="underline hover:text-white">
                  jaeden@stillawakemedia.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">
                Information you give us
              </h2>
              <p className="mt-3">
                When you submit the contact form or complete the onboarding
                questionnaire at stillawake.studio, we collect what you enter —
                typically your name, email address, and a description of your
                project. We use it to reply to you and to scope the work. We do
                not sell it, and we do not use it for advertising.
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">
                Analytics and cookies
              </h2>
              <p className="mt-3">
                Three measurement tools run on this site. Two of them are
                switched off until you accept them.
              </p>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-white">
                    Ahrefs Web Analytics — always on
                  </h3>
                  <p className="mt-1">
                    Counts page views. Sets no cookies and creates no visitor
                    identifier, so it measures pages rather than people. It runs
                    without consent because it cannot identify you.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    Google Analytics 4 — only with consent
                  </h3>
                  <p className="mt-1">
                    Measures which pages are visited and how people move through
                    the site. If you accept, it sets the cookies{" "}
                    <code className="text-white">_ga</code> and{" "}
                    <code className="text-white">_ga_KE1CWNHY0S</code>. If you
                    decline, Google Consent Mode keeps analytics storage denied
                    and no such cookie is set. Advertising and personalisation
                    signals are denied at all times — we run no ad or
                    remarketing tags.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    Microsoft Clarity — only with consent
                  </h3>
                  <p className="mt-1">
                    Records anonymised interaction with pages — scrolling,
                    clicks, pointer movement — so we can see where a page
                    confuses people. If you accept, it sets{" "}
                    <code className="text-white">_clck</code> and{" "}
                    <code className="text-white">_clsk</code>. If you decline,
                    the Clarity script is never loaded at all.
                  </p>
                </div>
              </div>
              <p className="mt-6">
                Your choice is stored in your browser&apos;s local storage under{" "}
                <code className="text-white">sam-consent</code>, together with
                the date you made it. Clearing your browser storage will make
                the banner appear again.
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">
                Service providers
              </h2>
              <p className="mt-3">
                We use Vercel for hosting, Supabase for storing enquiries and
                project data, Resend for sending email, Google Analytics,
                Microsoft Clarity and Ahrefs for measurement, and Stripe where a
                project is invoiced online. Some of these process data outside
                Canada, including in the United States.
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">Your rights</h2>
              <p className="mt-3">
                You can ask us what we hold about you, ask for it to be
                corrected, ask for it to be deleted, withdraw analytics consent
                at any time by clearing your browser storage and choosing again,
                and — under Québec&apos;s Law 25 — request your data in a
                portable format. Write to{" "}
                <a href="mailto:jaeden@stillawakemedia.com" className="underline hover:text-white">
                  jaeden@stillawakemedia.com
                </a>{" "}
                and we will respond within 30 days.
              </p>
              <p className="mt-3">
                If you are in the EU or the UK, you also have the right to
                complain to your local data protection authority.
              </p>
            </section>

            <section>
              <h2 className="geist text-2xl font-bold text-white">Retention</h2>
              <p className="mt-3">
                Enquiries and project records are kept while the working
                relationship is active and for as long afterwards as tax and
                accounting rules require. Analytics data follows the retention
                period configured in each tool.
              </p>
            </section>

            <p className="border-t border-white/10 pt-8 text-sm">
              Available in French:{" "}
              <Link href="/fr/confidentialite" className="underline hover:text-white">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
