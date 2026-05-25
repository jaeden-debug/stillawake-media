import type { Metadata } from "next";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";
import { InternalLinks } from "@/components/site";

export const metadata: Metadata = {
  title: "Website Portfolio",
  description:
    "Explore StillAwake Media website projects through an interactive browser-style portfolio featuring live website previews, SEO systems, brand builds, and digital products.",
};

export default function Portfolio() {
  return (
    <main className="pt-28">
      <PortfolioBrowser />
      <InternalLinks />
    </main>
  );
}
