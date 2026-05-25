import Link from "next/link";

const services = [
  ["Web Design", "/web-design-montreal"],
  ["SEO", "/seo-montreal"],
  ["Shopify Development", "/shopify-development"],
  ["Branding", "/branding"],
  ["Software Development", "/software-development"],
  ["AI Automation", "/ai-automation"],
];

const montreal = [
  ["Web Design Montreal", "/web-design-montreal"],
  ["Agence Web Montréal", "/fr/agence-web-montreal"],
  ["SEO Montreal", "/seo-montreal"],
];

const resources = [
  ["StillAwake Times", "/stillawake-times"],
  ["Portfolio", "/portfolio"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#D71920_0%,transparent_60%)] opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_.7fr_.7fr_.7fr]">
          
          <div>
            <p className="text-xs uppercase tracking-[.35em] text-[#D71920]">
              StillAwake Media
            </p>

            <h2 className="geist mt-6 max-w-xl text-5xl font-black leading-[0.9] tracking-[-0.08em] md:text-7xl">
              Digital infrastructure for brands built to dominate online.
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#B8B8B8]">
              Premium web design, SEO systems, branding, AI automation,
              ecommerce infrastructure, custom software, and performance-first
              digital experiences built for modern businesses.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[#D71920] px-6 py-3 text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                Start a Project
              </Link>

              <Link
                href="/portfolio"
                className="rounded-full border border-white/10 px-6 py-3 text-sm text-white transition hover:border-[#D71920]/60"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[.25em] text-[#D71920]">
              Services
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {services.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[#B8B8B8] transition hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[.25em] text-[#D71920]">
              Montreal
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {montreal.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[#B8B8B8] transition hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[.25em] text-[#D71920]">
              Explore
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {resources.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[#B8B8B8] transition hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-[#777] md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 StillAwake Media. Built for performance, search visibility,
            and long-term digital growth.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>

            <Link href="/portfolio" className="transition hover:text-white">
              Portfolio
            </Link>

            <Link href="/stillawake-times" className="transition hover:text-white">
              StillAwake Times
            </Link>

            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
