import type { Metadata } from "next";
import { ContactForm, FR_LABELS } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Démarrer un projet avec StillAwake Media",
  description:
    "Contactez StillAwake Media pour démarrer un site web, un système SEO, une boutique Shopify, une image de marque ou un logiciel sur mesure. Réponse par courriel — sans appel obligatoire.",
  alternates: {
    canonical: "https://stillawakemedia.com/fr/contact",
    languages: {
      "fr-CA": "https://stillawakemedia.com/fr/contact",
      "en-CA": "https://stillawakemedia.com/contact",
      "x-default": "https://stillawakemedia.com/contact",
    },
  },
  openGraph: {
    title: "Contact | StillAwake Media",
    description: "Démarrez votre projet — réponse par courriel, sans appel de vente.",
    url: "https://stillawakemedia.com/fr/contact",
    type: "website",
    locale: "fr_CA",
  },
};

export default function ContactFr() {
  return (
    <main className="pt-28">
      <section className="px-6 pt-24 pb-0">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm uppercase tracking-[.3em] text-[#D71920]">Contact</p>
          <h1 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Démarrez un projet avec StillAwake Media.
          </h1>
        </div>
      </section>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xl leading-9 text-[#C7B9B9]">
                Dites-nous ce que vous voulez bâtir : un site web premium, une marque plus forte, un système SEO, une
                boutique Shopify, un outil IA ou une mise à niveau complète de votre infrastructure numérique. Vous
                recevrez une réponse claire par courriel — jamais d&apos;appel de vente obligatoire.
              </p>
            </div>
            <ContactForm labels={FR_LABELS} />
          </div>
        </div>
      </section>
    </main>
  );
}
