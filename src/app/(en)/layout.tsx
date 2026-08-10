import "../globals.css";
import { RootShell, buildRootMetadata } from "@/components/root-shell";

export const metadata = buildRootMetadata("en_CA");

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
