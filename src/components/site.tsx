"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, services, portfolio, posts } from "@/lib/data";

export function Logo() {
  return (
    <Link
      href="/"
      onClick={() => typeof window !== "undefined" && document.body.click()}
      className="geist text-xl font-black tracking-[-.08em]"
    >
      STILL<span className="text-[#D71920]">AWAKE</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;

      setShowHeader(scrollingUp || currentY < 12 || open);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 px-4 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-0 -z-10 bg-white/[0.035] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <nav className={`relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-5 py-3 border border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] before:absolute before:inset-0 before:-z-10 before:bg-black before:transition-opacity before:duration-700 before:ease-[cubic-bezier(.16,1,.3,1)] ${
  open
    ? "bg-white/[0.03] before:opacity-80"
    : "bg-white/[0.06] before:opacity-0"
}`}>
        <div className="flex items-center justify-between">
          <div onClick={() => setOpen(false)}>
            <Logo />
          </div>

          <div className="hidden gap-7 text-sm text-[#C7B9B9] md:flex">
            {nav.map(([n, h]) => (
              <Link className="hover:text-white" key={h} href={h}>
                {n}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full border border-[#B51C1D]/50 bg-[#B51C1D]/20 px-4 py-2 text-sm"
            >
              Free Audit
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
              aria-expanded={open}
              className="glass flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            >
              <span className="relative block h-5 w-5">
                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ease-out ${
                    open ? "rotate-45" : "-translate-y-[7px]"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ease-out ${
                    open ? "-rotate-45" : "translate-y-[7px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-4 grid gap-2 md:hidden">
            {nav.map(([n, h]) => (
              <Link
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-sm text-[#C7B9B9] transition hover:bg-white/[.06] hover:text-white"
              >
                {n}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return <footer className="border-t border-white/10 px-6 py-12 text-sm text-[#666]">© 2026 StillAwake Media. Ambition Never Sleeps.</footer>;
}

export function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium tracking-[-0.02em] transition hover:bg-white/[0.08]">{children}<span className="grid size-7 place-items-center rounded-full bg-[#B51C1D] text-[12px]">→</span></Link>;
}

export function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="px-6 py-24"><div className="mx-auto max-w-7xl"><p className="mb-4 text-sm uppercase tracking-[.3em] text-[#D71920]">{eyebrow}</p><h2 className="geist max-w-4xl text-4xl font-black md:text-6xl tracking-[-0.06em]">{title}</h2><div className="mt-10">{children}</div></div></section>;
}

export function InternalLinks() {
  return <section className="px-6 py-16"><div className="glass mx-auto max-w-7xl rounded-[2rem] p-8"><h2 className="geist text-3xl font-black tracking-[-0.06em]">Keep exploring.</h2><p className="mt-3 text-[#C7B9B9]">See the work, read the strategy, or start a project with StillAwake Media.</p><div className="mt-8 flex flex-wrap gap-3">{nav.slice(1).map(([n,h])=><Link key={h} href={h} className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-[#D71920]/60 hover:text-white">{n}</Link>)}</div></div></section>;
}

export function ServiceGrid() {
  const serviceCopy: Record<string, React.ReactNode> = {
  "Web development": <>Fast custom websites with clean layouts, sharp interactions, strong calls-to-action, and structure that can grow past a basic homepage.</>,
  "SEO optimization": <>Search-focused page architecture, internal links, metadata, content planning, and technical cleanup so the site is easier to crawl and understand.</>,
  "Branding & identity": <>Visual direction, typography, colors, messaging, and assets that make the business feel more legitimate the second people land.</>,
  "App & software development": <>Custom tools, dashboards, portals, and workflow systems built around real business operations instead of random features.</>,
  "AI automation": <>Practical AI workflows for content, research, admin, operations, lead handling, and repetitive tasks that slow the business down.</>,
};

return <div className="grid gap-4 md:grid-cols-5">{services.map(s => <div key={s} className="glass rounded-3xl p-6"><h3 className="geist text-xl font-black tracking-[-0.06em]">{s}</h3><p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{serviceCopy[s]}</p></div>)}</div>;
}

export function PortfolioGrid() {
  return <div className="grid gap-5 md:grid-cols-3">{portfolio.map(([n,u,d]) => <article key={n} className="glass rounded-[2rem] p-6"><p className="text-xs uppercase tracking-[.25em] text-[#D71920]">Live project</p><h3 className="geist mt-4 text-2xl font-black tracking-[-0.06em]">{n}</h3><p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{d}</p><a href={u} target="_blank" className="mt-6 inline-flex text-sm text-white">View live site →</a></article>)}</div>;
}

export function BlogCards() {
  return <div className="grid gap-5 md:grid-cols-3">{posts.map(p => <Link key={p.slug} href={`/stillawake-times/${p.slug}`} className="glass rounded-[2rem] p-6"><p className="text-xs uppercase tracking-[.25em] text-[#D71920]">{p.category}</p><h3 className="geist mt-4 text-2xl font-black tracking-[-0.06em]">{p.title}</h3><p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{p.excerpt}</p></Link>)}</div>;
}
