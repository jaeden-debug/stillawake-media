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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = open ? "hidden" : "";
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Close mobile menu"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-white/[0.06] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header className={`fixed left-0 right-0 top-0 z-50 px-4 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
      <nav className={`relative z-50 mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-5 py-3 border border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] before:absolute before:inset-0 before:-z-10 before:bg-black/25 before:transition-opacity before:duration-700 before:ease-[cubic-bezier(.16,1,.3,1)] ${
  open
    ? "bg-black/35 before:opacity-100"
    : "bg-white/[0.06] before:opacity-0"
}`}>
        <div className="flex items-center justify-between">
          <div onClick={() => setOpen(false)}>
            <Logo />
          </div>

          <div className="hidden gap-7 text-sm text-[#C7B9B9] lg:flex">
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
              className="rounded-full border border-[#D71920]/50 bg-[#D71920]/20 px-4 py-2 text-sm"
            >
              Free Audit
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
              aria-expanded={open}
              className="glass flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
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
          <div className="mt-4 grid gap-2 lg:hidden">
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
    </>
  );
}

export function Footer() {
  return <footer className="border-t border-white/10 px-6 py-12 text-sm text-[#666]">© 2026 StillAwake Media. Ambition Never Sleeps.</footer>;
}

export function Button({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-medium tracking-[-0.02em] transition hover:bg-white/[0.08]">{children}<span className="grid size-7 place-items-center rounded-full bg-[#D71920] text-[12px]">→</span></Link>;
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


export function AuditCta() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-[3rem] border border-[#D71920]/30 bg-[#D71920]/20 p-10 md:p-16">
        <h2 className="geist max-w-5xl text-4xl font-black leading-[.92] tracking-[-0.07em] md:text-7xl">
          Start building before your competitors wake up.
        </h2>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#E7DFDF]">
          Get a clear look at what your website, SEO, brand, or digital system
          needs next.
        </p>

        <Link
          href="/contact"
          className="mt-10 inline-flex rounded-full bg-white px-7 py-4 text-sm font-bold text-black"
        >
          Get a Free Audit →
        </Link>
      </div>
    </section>
  );
}

export function MagazineInjection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
          StillAwake Times
        </p>

        <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
          Editorial strategy, web systems, SEO, AI, and premium digital infrastructure.
        </h2>

        <Link
          href="/stillawake-times/why-custom-coded-websites-outperform-templates"
          className="glass mt-12 block rounded-[2.5rem] p-8 transition hover:border-[#D71920]/60 md:p-12"
        >
          <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
            Web Development
          </p>

          <h3 className="geist mt-4 max-w-4xl text-4xl font-black tracking-[-0.06em]">
            Why Custom-Coded Websites Outperform Templates
          </h3>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7B9B9]">
            Templates can launch fast, but custom-coded websites win when
            performance, SEO, brand control, and scalability matter.
          </p>

          <p className="mt-8 text-sm text-white">
            Read the magazine →
          </p>
        </Link>
      </div>
    </section>
  );
}

export function RelatedReadingInjection() {
  const relatedReading = [
    {
      category: "Web Design",
      title: "Montreal Web Designer for Premium Modern Websites",
      excerpt:
        "Work with a Montreal web designer focused on premium UX, modern branding, SEO structure, conversion systems, and high-performance digital experiences.",
      href: "/stillawake-times/montreal-web-designer",
    },
    {
      category: "Web Design",
      title: "The Future of Websites in 2026 and Beyond",
      excerpt:
        "Websites are changing faster than most businesses realize. AI-native interfaces, immersive motion systems, adaptive personalization, and evolving search behavior are reshaping what a website is and what it needs to do.",
      href: "/stillawake-times/the-future-of-websites-in-2026-and-beyond",
    },
    {
      category: "Web Design",
      title: "Web Design Agency Montreal for Modern Businesses",
      excerpt:
        "A Montreal web design agency building premium websites, SEO systems, conversion architecture, branding, and scalable digital infrastructure.",
      href: "/stillawake-times/web-design-agency-montreal",
    },
    {
      category: "Web Design",
      title: "Web Design Montreal: Premium Websites Built for Growth",
      excerpt:
        "Premium web design in Montreal focused on SEO, performance, conversion optimization, and modern digital infrastructure for serious businesses.",
      href: "/stillawake-times/web-design-montreal",
    },
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
          Related Reading
        </p>

        <h2 className="geist max-w-4xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
          Keep building the system.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {relatedReading.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass rounded-[2rem] p-7 transition hover:border-[#D71920]/60"
            >
              <p className="text-xs uppercase tracking-[.25em] text-[#D71920]">
                {item.category}
              </p>

              <h3 className="geist mt-4 text-3xl font-black tracking-[-0.06em]">
                {item.title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-[#C7B9B9]">
                {item.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
