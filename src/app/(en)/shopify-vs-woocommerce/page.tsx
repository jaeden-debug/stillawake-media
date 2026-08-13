import type { Metadata } from "next";
import Link from "next/link";
import { ServiceJsonLd, FaqBlock, RelatedServices } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Shopify vs WooCommerce (2026): An Honest Canadian Comparison",
  description:
    "Shopify vs WooCommerce for Canadian businesses in 2026: real cost of ownership, maintenance burden, SEO, bilingual stores, and who should genuinely pick which — from a studio that builds on Shopify.",
  alternates: {
    canonical: "https://stillawakemedia.com/shopify-vs-woocommerce",
    languages: {
      "en-CA": "https://stillawakemedia.com/shopify-vs-woocommerce",
      "fr-CA": "https://stillawakemedia.com/fr/shopify-vs-woocommerce",
      "x-default": "https://stillawakemedia.com/shopify-vs-woocommerce",
    },
  },
  openGraph: {
    title: "Shopify vs WooCommerce (2026) | StillAwake Media",
    description: "An honest comparison from a studio that builds Shopify stores — including when WooCommerce wins.",
    url: "https://stillawakemedia.com/shopify-vs-woocommerce",
    type: "website",
  },
};

const FAQ: [string, string][] = [
  [
    "Which is better, Shopify or WooCommerce?",
    "For most Canadian small and mid-size merchants, Shopify — because checkout, hosting, security, and updates are the platform's problem, not yours, and total cost of ownership is more predictable. WooCommerce wins when you need deep WordPress integration, unusual customization on a tight software budget, or full self-hosted control and you have someone technical to own it.",
  ],
  [
    "Which is cheaper, Shopify or WooCommerce?",
    "WooCommerce looks cheaper (free plugin) but isn't once you count hosting, premium plugins, security, and the maintenance hours it demands. Shopify's fees are visible up front (plans from about $50 CAD/month plus transaction costs). Over 2–3 years, a maintained WooCommerce store usually costs at least as much as Shopify — just less predictably.",
  ],
  [
    "Which is better for SEO?",
    "Neither wins by default — SEO comes from structure, speed, and content, not the platform badge. Shopify gives you solid technical defaults you can't break; WooCommerce gives you total control you can also break. A well-built store ranks on either; a neglected WooCommerce store degrades faster because updates and speed are your job.",
  ],
  [
    "Can either run a bilingual French-English store for Québec?",
    "Yes, both — with work. Shopify handles it through native localization features and structured markets; WooCommerce through multilingual plugins. For Québec merchants we typically build bilingual Shopify stores: fewer moving parts to keep both languages consistent, which matters for compliance and for ranking in both languages.",
  ],
  [
    "Can you migrate my WooCommerce store to Shopify?",
    "Yes — products, customers, and orders migrate, and we treat URLs like a redesign migration: every address is mapped and redirected deliberately so rankings survive the move. Migration is quoted in writing from your store's actual catalogue and traffic.",
  ],
];

const ROWS: [string, string, string][] = [
  ["Hosting & security", "Included, managed by Shopify", "Your responsibility (hosting, SSL, patches)"],
  ["Maintenance burden", "Minimal — platform updates itself", "Ongoing — plugin/theme/core updates on you"],
  ["Real monthly cost", "Predictable: plan + apps + fees", "Variable: hosting + plugins + maintenance hours"],
  ["Checkout & payments", "Best-in-class, PCI handled", "Configurable, but you own the risk surface"],
  ["Customization depth", "Themes + apps; code via Liquid", "Unlimited — it's WordPress + PHP"],
  ["Content & blogging", "Adequate", "Excellent — it is WordPress"],
  ["Bilingual (fr-CA/en-CA)", "Native localization, cleaner to maintain", "Plugin-based, more moving parts"],
  ["Best owner", "Merchants who want to sell, not administer", "Teams with technical ownership in-house"],
];

export default function ShopifyVsWooPage() {
  return (
    <main className="bg-black pt-28 text-white">
      <ServiceJsonLd
        path="/shopify-vs-woocommerce"
        name="Shopify vs WooCommerce — 2026 Canadian Comparison"
        description="Honest platform comparison for Canadian merchants: cost of ownership, maintenance, SEO, bilingual capability, and who should pick which."
        breadcrumb={[
          ["Home", "/"],
          ["Shopify Development", "/shopify-development"],
          ["Shopify vs WooCommerce", "/shopify-vs-woocommerce"],
        ]}
        faq={FAQ}
      />

      <section className="border-b border-white/10 px-6 pb-20 pt-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#D71920]">Comparison · 2026</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] md:text-6xl">
            Shopify vs WooCommerce: the honest version.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/70">
            Full disclosure: we build Shopify stores — including original Shopify themes. That&apos;s exactly why this
            comparison can afford to be honest about where WooCommerce genuinely wins. The short answer:{" "}
            <strong className="text-white">most merchants should pick Shopify; teams with real technical ownership and
            WordPress-heavy content needs should consider WooCommerce.</strong> Here&apos;s the reasoning.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/20 text-xs uppercase tracking-[0.15em] text-[#C7B9B9]">
                  <th className="py-3 pr-4">Dimension</th>
                  <th className="py-3 pr-4">Shopify</th>
                  <th className="py-3">WooCommerce</th>
                </tr>
              </thead>
              <tbody className="text-[#C7B9B9]">
                {ROWS.map(([d, a, b]) => (
                  <tr key={d} className="border-b border-white/10">
                    <td className="py-4 pr-4 font-semibold text-white">{d}</td>
                    <td className="py-4 pr-4">{a}</td>
                    <td className="py-4">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 rounded-[2rem] border border-[#D71920]/40 bg-[#D71920]/5 p-8">
            <h2 className="geist text-3xl font-black tracking-[-0.06em]">Our verdict</h2>
            <p className="mt-4 max-w-3xl leading-8 text-[#C7B9B9]">
              If selling is your job and the website is a tool: <strong className="text-white">Shopify</strong> — and
              if it breaks, our <Link href="/website-maintenance" className="text-[#D71920] underline-offset-4 hover:underline">ecommerce emergency support</Link> has
              published tiers. If your store is inseparable from a large WordPress content operation and someone
              technical owns it: WooCommerce is legitimate. Unsure which fits your case?{" "}
              <Link href="https://stillawake.studio/start" className="text-[#D71920] underline-offset-4 hover:underline">Describe your store</Link> and
              you&apos;ll get a written recommendation — even if the answer is &quot;stay where you are.&quot;
            </p>
          </div>
        </div>
      </section>

      <FaqBlock title="Shopify vs WooCommerce questions" items={FAQ} />

      <RelatedServices
        title="Keep going"
        links={[
          ["Shopify Development", "/shopify-development"],
          ["Shopify Website Cost", "/website-cost-canada"],
          ["Website Redesign (migrations)", "/website-redesign"],
          ["Ecommerce Emergency Support", "/website-maintenance"],
          ["Version française", "/fr/shopify-vs-woocommerce"],
        ]}
      />
    </main>
  );
}
