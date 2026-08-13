import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/site";
import { Footer } from "@/components/footer";
import { ConsentBanner } from "@/components/consent-banner";
import { siteUrl } from "@/lib/data";
import { entityIds } from "@/data/entities";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/** Google Analytics 4 measurement ID (stillawakemedia.com). */
const GA_MEASUREMENT_ID = "G-KE1CWNHY0S";

const title = "StillAwake Media | Web Design, SEO, AI & Software";
const description =
  "StillAwake Media builds premium websites, SEO systems, branding, AI automation, Shopify stores, and custom software for modern businesses. Ambition Never Sleeps.";

/**
 * Shared root metadata.
 *
 * The site has two root layouts — one per language route group — so that the
 * French page can declare `<html lang="fr-CA">` instead of inheriting `en`.
 * Both layouts derive their metadata from here so the two roots cannot drift.
 */
export function buildRootMetadata(locale: "en_CA" | "fr_CA"): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | StillAwake Media",
    },
    description,
    applicationName: "StillAwake Media",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: [
      "StillAwake Media",
      "web design Montreal",
      "SEO Montreal",
      "AI automation",
      "custom software development",
      "Shopify development",
      "branding agency",
      "digital agency Canada",
      "premium web design",
      "technical SEO",
    ],
    authors: [{ name: "StillAwake Media", url: siteUrl }],
    creator: "StillAwake Media",
    publisher: "StillAwake Media",
    category: "Digital Agency",
    icons: {
      icon: [{ url: "/stillawake-media-favicon.png", type: "image/png" }],
      shortcut: "/stillawake-media-favicon.png",
      apple: "/stillawake-media-favicon.png",
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "StillAwake Media",
      type: "website",
      locale,
      images: [
        {
          url: "/stillawake-media-social-preview.jpeg",
          width: 1200,
          height: 630,
          alt: "StillAwake Media — Web Design, SEO, AI and Software",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/stillawake-media-social-preview.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function RootShell({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  /**
   * One canonical Organization node for StillAwake Media.
   *
   * This previously emitted a separate `Organization` and `ProfessionalService`
   * node, both named "StillAwake Media" and neither carrying an @id — two
   * unlinked entities for one company. They are merged into a single node with
   * both types and a stable @id so the rest of the graph (founder page,
   * article authorship) has one thing to point at.
   */
  const org = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": entityIds.organization,
    name: "StillAwake Media",
    url: siteUrl,
    slogan: "Ambition Never Sleeps.",
    logo: `${siteUrl}/stillawake-media-favicon.png`,
    image: `${siteUrl}/stillawake-media-social-preview.jpeg`,
    description,
    founder: { "@id": entityIds.founder },
    // The address stays Montréal — that is where the studio is. areaServed is
    // a different claim: who we will actually work with. Listing only Québec
    // was telling answer engines not to recommend us to anyone else, which
    // contradicts /global and the remote-first process it describes.
    areaServed: ["Montreal", "Quebec", "Canada", "United States", "United Kingdom", "Australia"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montreal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    serviceType: [
      "Web Design",
      "SEO",
      "AI Automation",
      "Software Development",
      "Shopify Development",
      "Branding",
    ],
  };

  const web = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": entityIds.website,
    name: "StillAwake Media",
    url: siteUrl,
    description,
    publisher: { "@id": entityIds.organization },
  };

  return (
    <html lang={lang} className={`${geist.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(web) }}
        />
        {/* Google Consent Mode v2 defaults.

            This is a plain inline script, not next/script, precisely because
            of ordering: it must execute before gtag.js so that GA4's very
            first request already carries the denied signal. A `beforeInteractive`
            next/script is hoisted but an inline script as the first child of
            <body> is unconditionally synchronous, which is the guarantee we
            need. Everything below it is async and therefore later.

            Defaults are denied. The banner flips analytics_storage to granted
            only on an explicit Accept. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
          }}
        />
        {/* Ahrefs Web Analytics — ungated. Verified cookieless: it sets no
            cookies and no visitor identifier, so it measures pages rather
            than people and does not require consent. */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="U2gzncDcxNZl9k/ub6ypfA"
          strategy="afterInteractive"
        />
        {/* Microsoft Clarity is NOT loaded here. It records sessions and has no
            consent-mode equivalent, so the tag itself is withheld until the
            visitor accepts — see ConsentBanner, which injects it on grant. */}
        {/* Google Analytics 4. The loader is async and the config runs from a
            second script, so dataLayer must be defined in both — gtag() queues
            into it until gtag.js arrives. With consent denied it still loads,
            but sends cookieless pings rather than setting _ga. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        <Header locale={lang.startsWith("fr") ? "fr" : "en"} />
        {children}
        <Footer locale={lang.startsWith("fr") ? "fr" : "en"} />
        <ConsentBanner locale={lang.startsWith("fr") ? "fr" : "en"} />
      </body>
    </html>
  );
}
