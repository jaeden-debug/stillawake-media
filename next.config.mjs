import { withBotId } from "botid/next/config";
import { REDIRECTS } from "./src/data/redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remote hosts CMS content is allowed to serve through next/image:
    // Unsplash originals and the Supabase CMS media bucket. The CMS renderer
    // falls back to a plain <img> for any other host.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "qzyzdpjvrecplkenrxhe.supabase.co" },
    ],
  },
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
    return REDIRECTS;
  },
};

export default withBotId(nextConfig);
