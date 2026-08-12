import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { jaedenDoody } from "@/data/people/jaeden-doody";
import { Section } from "@/components/site";

export const metadata: Metadata = {
  title: "Contact StillAwake Media | Start a Project",
  description:
    "Contact StillAwake Media to start a premium website, SEO system, brand identity, AI automation, Shopify build, or custom software project.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
    <main className="pt-28">
      <section className="px-6 pt-24 pb-0"><div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[.3em] text-[#D71920]">Contact</p>
        <h1 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">Start a project with StillAwake Media.</h1>
      </div></section>
      <Section eyebrow="" title="">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xl leading-9 text-[#C7B9B9]">
              Tell us what you want to build: a premium website, stronger brand,
              SEO growth system, AI automation, software tool, or complete digital infrastructure upgrade.
            </p>

            <p className="mt-6 text-base leading-8 text-[#8F8585]">
              Prefer to reach the founder directly? Jaeden Doody is on{" "}
              <a
                href={jaedenDoody.linkedin}
                target="_blank"
                rel="me noopener"
                className="text-white underline decoration-[#D71920] underline-offset-4"
              >
                LinkedIn
              </a>
              , or read{" "}
              <Link
                href={jaedenDoody.path}
                className="text-white underline decoration-[#D71920] underline-offset-4"
              >
                his background
              </Link>
              .
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
