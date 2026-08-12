import { withBotId } from "botid/next/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required for app/global-not-found.tsx. The site has two root layouts
    // ((en) and (fr)) so there is no single layout Next can compose a global
    // 404 from; without this the 404 for unmatched URLs renders as a bare
    // unstyled document with no lang attribute and no header/footer.
    globalNotFound: true,
  },
  async headers() {
    return [
      {
        source: "/api/contact",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/web-design", destination: "/web-design-montreal", permanent: true },
      { source: "/technical-seo", destination: "/stillawake-times/what-is-technical-seo", permanent: true },
      { source: "/web-development-montreal", destination: "/stillawake-times/web-development-montreal", permanent: true },
      { source: "/ecommerce-web-design-montreal", destination: "/stillawake-times/ecommerce-web-design-montreal", permanent: true },
      { source: "/montreal-web-designer", destination: "/stillawake-times/montreal-web-designer", permanent: true },
      { source: "/web-design-agency-montreal", destination: "/stillawake-times/web-design-agency-montreal", permanent: true },
      { source: "/website-redesign-montreal", destination: "/website-redesign", permanent: true },
      { source: "/stillawake-times/website-redesign-montreal", destination: "/website-redesign", permanent: true },
      { source: "/blog/google-business-profile-optimization", destination: "/stillawake-times/google-business-profile-optimization", permanent: true },
      { source: "/blog/how-to-redesign-a-website-without-destroying-seo", destination: "/stillawake-times/how-to-redesign-a-website-without-destroying-seo", permanent: true },
      { source: "/stillawake-times/custom-coded-websites-outperform-templates", destination: "/stillawake-times/why-custom-coded-websites-outperform-templates", permanent: true },
      // Cannibalization repair: these articles duplicated dedicated commercial
      // pages head-on (near-identical titles/intent). The service page is the
      // canonical commercial target; the article equity 301s into it.
      { source: "/stillawake-times/web-design-montreal", destination: "/web-design-montreal", permanent: true },
      { source: "/stillawake-times/seo-montreal", destination: "/seo-montreal", permanent: true },
      { source: "/stillawake-times/agence-web-montreal", destination: "/fr/agence-web-montreal", permanent: true },
      // Near-duplicate merges (same topic, one day apart / same intent):
      { source: "/stillawake-times/how-website-speed-impacts-seo-conversions-revenue", destination: "/stillawake-times/how-website-speed-directly-impacts-revenue-and-seo-rankings", permanent: true },
      { source: "/stillawake-times/what-businesses-should-prepare-before-hiring-a-web-design-agency", destination: "/stillawake-times/what-to-know-before-hiring-web-design-agency", permanent: true },
    ];
  },
};

export default withBotId(nextConfig);
