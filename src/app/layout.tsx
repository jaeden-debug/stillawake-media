import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/data";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const title = "StillAwake Media | Web Design, SEO, AI & Software";
const description =
  "StillAwake Media builds premium websites, SEO systems, branding, AI automation, Shopify stores, and custom software for modern businesses. Ambition Never Sleeps.";

export const metadata: Metadata = {
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
    icon: [
      { url: "/stillawake-media-favicon.png", type: "image/png" },
    ],
    shortcut: "/stillawake-media-favicon.png",
    apple: "/stillawake-media-favicon.png",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "StillAwake Media",
    type: "website",
    locale: "en_CA",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StillAwake Media",
    url: siteUrl,
    slogan: "Ambition Never Sleeps.",
    logo: `${siteUrl}/stillawake-media-favicon.png`,
    image: `${siteUrl}/stillawake-media-social-preview.jpeg`,
    description,
  };

  const web = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StillAwake Media",
    url: siteUrl,
    description,
    publisher: {
      "@type": "Organization",
      name: "StillAwake Media",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "StillAwake Media",
    url: siteUrl,
    image: `${siteUrl}/stillawake-media-social-preview.jpeg`,
    logo: `${siteUrl}/stillawake-media-favicon.png`,
    slogan: "Ambition Never Sleeps.",
    description,
    areaServed: ["Montreal", "Quebec", "Canada"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montreal",
      addressRegion: "QC",
      addressCountry: "CA"
    },
    serviceType: [
      "Web Design",
      "SEO",
      "AI Automation",
      "Software Development",
      "Shopify Development",
      "Branding"
    ]
  };

  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(web) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="U2gzncDcxNZl9k/ub6ypfA"
          strategy="afterInteractive"
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
