import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
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
      <Section eyebrow="Contact" title="Start building.">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xl leading-9 text-[#C7B9B9]">
              Tell us what you want to build: a premium website, stronger brand,
              SEO growth system, AI automation, software tool, or complete digital infrastructure upgrade.
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
