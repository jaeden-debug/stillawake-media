import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    { path: "/api/contact", method: "POST" },
    /* Checkout creates real Stripe sessions, so it gets the same gate as the
       contact form — payment endpoints are a standard target for card testing. */
    { path: "/api/checkout", method: "POST" },
    /* The SEO audit fetches arbitrary public URLs from our servers; keeping
       scripts off it keeps it from becoming someone's free crawler. */
    { path: "/api/tools/seo-audit", method: "POST" },
  ],
});
