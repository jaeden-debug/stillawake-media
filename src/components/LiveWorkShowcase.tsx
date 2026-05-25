"use client";

import Link from "next/link";
import { useState } from "react";

const projects = [
  { title: "Lisa Travel Design", url: "https://lisatraveldesign.com", accent: "#FFB6C1" },
  { title: "Navtrl", url: "https://navtrl.com", accent: "#7CFF8A" },
  { title: "BankDeMark", url: "https://bankdemark.com", accent: "#6BE3FF" },
  { title: "Zylx AI", url: "https://zylx.ai", accent: "#8B5CF6" },
  { title: "Northground Bushcraft", url: "https://northgroundbushcraft.com", accent: "#C19A6B" },
];

export default function LiveWorkShowcase() {
  const [showMore, setShowMore] = useState(false);
  const visibleProjects = showMore ? projects : projects.slice(0, 2);

  return (
    <section className="px-6 pb-32 pt-6 md:pb-40 md:pt-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-[#070707] p-5 shadow-2xl md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.22),transparent_35%),radial-gradient(circle_at_10%_100%,rgba(255,255,255,.08),transparent_35%)]" />

        <div className="relative z-10 mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[.35em] text-[#D71920]">Website Portfolio Preview</p>
            <h2 className="geist mt-4 text-5xl font-black leading-[.9] md:text-7xl tracking-[-0.06em]">
              Real websites <br /> we have built.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#C7B9B9] md:text-lg">
              Explore live examples of StillAwake Media website builds, brand systems, ecommerce platforms, SEO projects, and digital products.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="glass inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/70 px-5 py-3 text-sm font-medium text-[#C7B9B9] transition hover:text-white"
          >
            View full portfolio <span className="grid size-7 place-items-center rounded-full bg-[#D71920] text-white">→</span>
          </Link>
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.045] shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
              />

              <div className="flex items-center gap-3 border-b border-white/10 bg-white/[.04] px-4 py-3">
                <div className="flex gap-2">
                  <span className="size-3 rounded-full bg-[#FF5F57]" />
                  <span className="size-3 rounded-full bg-[#FEBC2E]" />
                  <span className="size-3 rounded-full bg-[#28C840]" />
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-xs text-[#B8B8B8]">
                  <span className="size-2 rounded-full" style={{ background: project.accent }} />
                  <span className="truncate">{project.url.replace("https://", "")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/25 p-4">
                <div>
                  <p className="text-xs font-black text-[#666]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="geist mt-1 text-2xl font-black tracking-[-0.06em]">{project.title}</h3>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full border px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                  style={{ borderColor: project.accent, boxShadow: `0 0 22px ${project.accent}33` }}
                >
                  Open ↗
                </a>
              </div>

              <div className="h-[500px] bg-[#111] md:h-[640px]">
                <iframe
                  title={`${project.title} live website preview`}
                  src={project.url}
                  loading="lazy"
                  className="h-full w-full border-0 bg-white"
                />
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={() => setShowMore(!showMore)}
          className="relative z-10 mt-10 w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.05] p-7 text-left shadow-2xl transition duration-500 hover:bg-white/[.08]"
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(215,25,32,.35),transparent_35%)]" />
          <span className="relative block text-xs font-black uppercase tracking-[.25em] text-[#D71920]">
            {showMore ? "Collapse Showcase" : "View More Work"}
          </span>
          <strong className="relative mt-2 block text-2xl tracking-[-.05em]">
            {showMore ? "Show featured projects only ↑" : "Open 4 more live projects ↓"}
          </strong>
        </button>
      </div>
    </section>
  );
}
