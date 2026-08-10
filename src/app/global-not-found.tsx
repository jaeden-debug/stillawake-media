import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { RootShell } from "@/components/root-shell";

/**
 * Global 404 for URLs that match no route.
 *
 * The site has two root layouts — `(en)` and `(fr)` — so Next has no single
 * layout to compose a 404 from, and a plain `not-found.tsx` renders without
 * `<html lang>`, styles, or site chrome. This convention bypasses layout
 * rendering entirely and owns the whole document, so it renders `RootShell`
 * itself. Enabled via `experimental.globalNotFound` in next.config.mjs.
 */
export const metadata: Metadata = {
  title: "Page Not Found | StillAwake Media",
  // Next emits `noindex` for this route itself — declaring it again here
  // produces a duplicate robots meta tag.
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <main className="pt-28">
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
              404
            </p>

            <h1 className="geist max-w-4xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
              This page doesn&apos;t exist.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#C7B9B9]">
              The link may be broken or the page may have moved. Here are the
              places worth going instead.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/" className="rounded-full bg-[#D71920] px-6 py-4 font-bold">
                Back to Home →
              </Link>

              <Link href="/work" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
                Case Studies →
              </Link>

              <Link href="/services" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
                Services →
              </Link>

              <Link href="/contact" className="rounded-full border border-white/10 px-6 py-4 font-bold text-[#C7B9B9] transition hover:text-white">
                Contact →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </RootShell>
  );
}
