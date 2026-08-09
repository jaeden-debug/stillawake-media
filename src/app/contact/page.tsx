import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/site";

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
