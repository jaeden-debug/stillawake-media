import type { Metadata } from "next";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Website Portfolio | Premium Web Design & SEO Projects",
  description:
    "Explore StillAwake Media website projects through live previews, SEO systems, brand builds, ecommerce experiences, and digital infrastructure examples.",
};

export default function Portfolio() {
  return (
    <main className="pt-28">
      <PortfolioBrowser />
      <InternalLinks />
    </main>
  );
}
