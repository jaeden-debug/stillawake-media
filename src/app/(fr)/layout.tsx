import "../globals.css";
import { RootShell, buildRootMetadata } from "@/components/root-shell";

export const metadata = buildRootMetadata("fr_CA");

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr-CA">{children}</RootShell>;
}
