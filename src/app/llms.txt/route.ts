import { siteUrl } from "@/lib/data";
import { organization, ventures } from "@/data/entities";
import { jaedenDoody } from "@/data/people/jaeden-doody";
import { SERVICES } from "@/data/services";
import { articlesSection, gamesSection, projectsSection } from "@/lib/ai-index";

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

Founder profile: ${jaedenDoody.url} (français: ${siteUrl}/fr/fondateur/jaeden-doody)
LinkedIn: ${jaedenDoody.linkedin}

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

- [Home](${siteUrl}/)
- [About ${organization.name}](${siteUrl}/about)
- [Founder profile — ${jaedenDoody.name}](${jaedenDoody.url})
- [Profil du fondateur (français)](${siteUrl}/fr/fondateur/jaeden-doody)
- [Case studies](${siteUrl}/work)
- [Our Work: every project by category](${siteUrl}/our-work)
- [Games](${siteUrl}/games)
- [Stillskin Forest (Roblox co-op survival horror)](${siteUrl}/games/stillskin-forest)
- [Stillskin Forest official wiki](${siteUrl}/games/stillskin-forest/wiki)
- [Scary Roblox horror games to play with friends](${siteUrl}/games/guides/scary-roblox-games-with-friends)
- [Best Roblox zombie games](${siteUrl}/games/guides/best-roblox-zombie-games)
- [Roblox horror survival games (survive the night)](${siteUrl}/games/guides/roblox-horror-survival-games)
- [RISK IT! (Roblox minigames with ragdoll fails)](${siteUrl}/games/risk-it)
- [RISK IT! official wiki](${siteUrl}/games/risk-it/wiki)
- [Roblox minigame and ragdoll games compared](${siteUrl}/games/guides/roblox-minigame-games)
- [Services](${siteUrl}/services)
- [Free tools](${siteUrl}/tools)
- [What is llms.txt? Real examples and limits](${siteUrl}/tools/llms-txt)
- [llms.txt generator and AI readiness check](${siteUrl}/tools/llms-txt-generator)
- [Schema markup generator (JSON-LD)](${siteUrl}/tools/schema-markup-generator)
- [Free SEO audit for one public page](${siteUrl}/tools/seo-audit)
- [Website and project cost calculator](${siteUrl}/tools/project-cost-calculator)
- [App development cost calculator](${siteUrl}/tools/app-development-cost-calculator)
- [Articles — The StillAwake Times](${siteUrl}/stillawake-times)
- [Contact](${siteUrl}/contact)
- [Published pricing](${siteUrl}/pricing)
- [French articles](${siteUrl}/fr/articles) — written for Québec, not translated from English
- [French site](${siteUrl}/fr) — Québec French; every commercial page has a French counterpart

## Related first-party sites

${ventures.map((v) => `- ${v.url} — ${v.tagline}`).join("\n")}

## Full text

The complete text of every project page and published game wiki article: ${siteUrl}/llms-full.txt
Sitemap of every indexable URL: ${siteUrl}/sitemap.xml

## Optional

Everything below is the long tail: every project, game wiki page and article. Skip it when context is short; the key pages above cover what the studio does.

${[projectsSection(), gamesSection(), articlesSection()].join("\n\n").replace(/^(#{2,}) /gm, "#$1 ")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
