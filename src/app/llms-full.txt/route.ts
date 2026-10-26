import { fullText } from "@/lib/ai-index";

/**
 * llms-full.txt — the full text behind llms.txt, for answer engines that read
 * a single document rather than crawling every page. Built from the same
 * registries as the pages, so it is current on every deploy.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(fullText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
