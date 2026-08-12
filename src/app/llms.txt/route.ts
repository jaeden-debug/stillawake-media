import { siteUrl } from "@/lib/data";
import { organization, ventures } from "@/data/entities";
import { jaedenDoody } from "@/data/people/jaeden-doody";
import { SERVICES } from "@/data/services";

/**
 * llms.txt — a plain-text orientation file for language models.
 *
 * Generated from the same entity data the pages and JSON-LD use, so it cannot
 * drift from the rest of the site. Facts only; no marketing claims.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# ${organization.name}

> ${organization.description}

${organization.name} is based in Montreal, Quebec, Canada.
Website: ${siteUrl}

## Founder

${jaedenDoody.name} is the founder of ${organization.name}, a Montreal-based creator and developer building software, AI systems, and practical business solutions. He came to technology from a background in mechanics, which shaped a diagnostic approach to systems: understand how the system works, trace a failure to its actual cause, then repair or rebuild it.

Founder profile: ${jaedenDoody.url}

## Entity relationships

- ${jaedenDoody.name} — founder of ${organization.name}
${ventures
  .map((v) => `- ${v.name} (${v.url}) — ${v.relationship}`)
  .join("\n")}

ZylX is a ${organization.name} product. BankDeMark and Blackwater Aquatics Canada are separate organizations founded by ${jaedenDoody.name}; ${organization.name} is not their parent company.

## Services and pricing

Prices are in Canadian dollars and mirror the live service catalogue. Services without a listed price are custom-quoted in writing through an async intake (no sales call required).

${SERVICES.filter((svc) => svc.active)
  .map((svc) => {
    const price = svc.price
      ? `${svc.price} CAD/month`
      : svc.tiers?.length
        ? `${svc.tiers.map((t) => `$${t.price}`).join(" / ")} CAD one-time (tier set by workload)`
        : "custom quote";
    return `- ${svc.name} — ${price} — ${siteUrl}${svc.enPath}${svc.frPath ? ` (français: ${siteUrl}${svc.frPath})` : ""}`;
  })
  .join("\n")}

Pricing overview: ${siteUrl}/pricing (français: ${siteUrl}/fr/tarifs)

## Key pages

- ${siteUrl}/ — home
- ${siteUrl}/about — about ${organization.name}
- ${jaedenDoody.url} — founder profile
- ${siteUrl}/work — case studies
- ${siteUrl}/portfolio — live project previews
- ${siteUrl}/services — services
- ${siteUrl}/stillawake-times — articles
- ${siteUrl}/contact — contact
- ${siteUrl}/pricing — published pricing
- ${siteUrl}/fr — French site (Québec French; every commercial page has a French counterpart)

## Related first-party sites

${ventures.map((v) => `- ${v.url} — ${v.tagline}`).join("\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
