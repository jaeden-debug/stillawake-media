"use client";

import { useMemo, useRef, useState } from "react";

const projects = [
  {
    id: "lisa",
    title: "Lisa Travel Design",
    url: "https://lisatraveldesign.com",
    domain: "lisatraveldesign.com",
    accent: "#FFB6C1",
    type: "Travel Website",
    tags: ["Website", "Brand", "Lead Gen"],
    summary: "A premium travel website built around trust, destination planning, and inquiry flow.",
    build: ["High-end travel positioning", "Lead-focused page structure", "Mobile-first brand experience"],
  },
  {
    id: "navtrl",
    title: "Navtrl",
    url: "https://navtrl.com",
    domain: "navtrl.com",
    accent: "#7CFF8A",
    type: "Digital Product",
    tags: ["Website", "Product", "UX"],
    summary: "A clean digital product presence built to feel modern, focused, and easy to understand.",
    build: ["Product-style landing structure", "Clean interface direction", "Fast visual scanning"],
  },
  {
    id: "bankdemark",
    title: "BankDeMark",
    url: "https://bankdemark.com",
    domain: "bankdemark.com",
    accent: "#6BE3FF",
    type: "Finance SEO Platform",
    tags: ["SEO", "Content", "Calculators"],
    summary: "A calculator-led finance content platform designed around search intent and topical authority.",
    build: ["Calculator-first SEO architecture", "Finance content structure", "Internal linking system"],
  },
  {
    id: "zylx",
    title: "Zylx AI",
    url: "https://zylx.ai",
    domain: "zylx.ai",
    accent: "#8B5CF6",
    type: "AI Software Brand",
    tags: ["AI", "Software", "Brand"],
    summary: "An AI software brand direction for workflow systems, agents, automation, and modern operators.",
    build: ["AI product positioning", "Software brand system", "Workflow-focused messaging"],
  },
  {
    id: "northground",
    title: "Northground Bushcraft",
    url: "https://northgroundbushcraft.com",
    domain: "northgroundbushcraft.com",
    accent: "#C19A6B",
    type: "Outdoor Brand",
    tags: ["Website", "Outdoor", "Editorial"],
    summary: "A rugged outdoor brand presence with survival, bushcraft, and field-ready editorial direction.",
    build: ["Outdoor identity direction", "Editorial brand feel", "Trust-building layout"],
  },
];

export default function PortfolioBrowser() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const [openTabs, setOpenTabs] = useState(projects.map((p) => p.id));
  const [query, setQuery] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCreative, setSelectedCreative] = useState("custom-sections");
  const previewRef = useRef<HTMLDivElement | null>(null);
  const creativeDisplayRef = useRef<HTMLDivElement | null>(null);

  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  const creativeItems = [
    {
      id: "custom-sections",
      title: "Custom Sections",
      label: "Custom UI",
      image: "/stillawake-neon-links-component-showcase.jpg",
      alt: "StillAwake Media neon links custom component showcase",
      desc: "Interactive website sections, animated UI blocks, link hubs, feature layouts, and premium conversion-focused experiences.",
    },
    {
      id: "logos",
      title: "Logos & Identity",
      label: "Brand System",
      image: "/blackwater-aquatics-canada-logo.jpg",
      alt: "Blackwater Aquatics Canada logo design example",
      desc: "Brand marks, icon systems, typography direction, and visual identity work designed to feel recognizable, sharp, and scalable.",
    },
    {
      id: "graphics",
      title: "Graphics & Assets",
      label: "Visual Assets",
      image: "/rhabdocoela-flatworm-aquarium-guide.jpg",
      alt: "Aquarium infographic and graphic design example",
      desc: "Infographics, thumbnails, social visuals, banners, and digital assets built to stop scrolling and strengthen brand authority.",
    },
  ];

  const activeCreative = creativeItems.find((item) => item.id === selectedCreative) || creativeItems[0];

  const filteredProjects = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return projects;
    return projects.filter((p) =>
      [p.title, p.domain, p.type, p.summary, ...p.tags].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const selectProject = (id: string, scrollToPreview = false) => {
    if (!openTabs.includes(id)) setOpenTabs((tabs) => [...tabs, id]);
    if (id !== activeId || minimized) setIsLoading(true);
    setActiveId(id);
    setMinimized(false);

    if (scrollToPreview && typeof window !== "undefined" && window.innerWidth < 1024) {
      window.setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  const openProject = (id: string) => {
    selectProject(id, true);
  };


  return (
    <section className="px-6 pb-24 pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
              Website Portfolio
            </p>
            <h1 className="geist max-w-5xl text-5xl font-black leading-[.9] tracking-[-0.075em] md:text-8xl">
              Open the work like a live operating system.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C7B9B9]">
              Browse live website builds inside a custom StillAwake browser. Search projects, open tabs, close them, restore them, and explore the systems like you are inside the portfolio itself.
            </p>
          </div>

          <a
            href="/contact"
            className="glass inline-flex w-fit rounded-full px-6 py-4 text-sm font-bold transition hover:bg-white/[.09]"
          >
            Start a Project →
          </a>
        </div>

        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#060606] shadow-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.25),transparent_32%),radial-gradient(circle_at_5%_100%,rgba(255,255,255,.08),transparent_32%)]" />

          <div className="relative border-b border-white/10 bg-white/[.04] p-4 backdrop-blur-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#FF5F57]" />
              <span className="size-3 rounded-full bg-[#FEBC2E]" />
              <span className="size-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs uppercase tracking-[.25em] text-[#666]">
                StillAwake Browser
              </span>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-3">
                <span className="text-[#D71920]">⌕</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search websites, SEO, AI, travel, finance..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#666]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {["Website", "SEO", "Brand", "AI", "Product"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs text-[#C7B9B9] transition hover:border-[#D71920]/60 hover:text-white"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [animation:portfolioTabHint_2.8s_ease-in-out_infinite]">
              {openTabs.map((id) => {
                const project = projects.find((p) => p.id === id);
                if (!project) return null;

                const active = activeId === id && !minimized;

                return (
                  <button
                    key={id}
                    onClick={() => selectProject(id, true)}
                    className={`group flex min-w-[190px] items-center gap-3 rounded-t-2xl border border-white/10 px-4 py-3 text-left transition ${
                      active ? "bg-black text-white" : "bg-white/[.04] text-[#C7B9B9] hover:bg-white/[.07]"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold">{project.title}</span>
                      <span className="block truncate text-[11px] text-[#666]">{project.domain}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative grid min-h-[760px] gap-0 lg:grid-cols-[330px_1fr]">
            <aside className="hidden border-b border-white/10 bg-black/35 p-5 backdrop-blur-xl lg:block lg:border-b-0 lg:border-r">
              <p className="mb-4 text-xs uppercase tracking-[.3em] text-[#D71920]">
                Search Results
              </p>

              <div className="grid gap-3">
                {filteredProjects.map((project) => {
                  const isOpen = openTabs.includes(project.id);
                  const isActive = activeProject.id === project.id && !minimized;

                  return (
                    <button
                      key={project.id}
                      onClick={() => openProject(project.id)}
                      className={`group rounded-[1.5rem] border p-4 text-left transition duration-300 hover:-translate-y-1 ${
                        isActive
                          ? "border-[#D71920]/60 bg-white/[.08]"
                          : "border-white/10 bg-white/[.035] hover:border-white/20"
                      }`}
                    >
                      <div
                        className="mb-4 h-1 w-16 rounded-full transition group-hover:w-28"
                        style={{ background: project.accent }}
                      />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="geist text-xl font-black tracking-[-.06em]">{project.title}</h3>
                          <p className="mt-1 text-xs text-[#666]">{project.type}</p>
                        </div>
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-[#C7B9B9]">
                          {isOpen ? "open" : "closed"}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">{project.summary}</p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div ref={previewRef} className="scroll-mt-24 bg-[#090909] p-4 md:p-6">
              {minimized || !openTabs.length ? (
                <div className="grid h-full min-h-[620px] place-items-center rounded-[2rem] border border-dashed border-white/15 bg-black/40 p-8 text-center">
                  <div>
                    <p className="text-sm uppercase tracking-[.35em] text-[#D71920]">No active tab</p>
                    <h2 className="geist mt-4 text-5xl font-black tracking-[-.07em]">Choose a project to reopen the browser.</h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      {projects.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => openProject(project.id)}
                          className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#C7B9B9] transition hover:border-[#D71920]/60 hover:text-white"
                        >
                          {project.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl">
                  <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[.04] p-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">{activeProject.type}</p>
                      <h2 className="geist mt-1 truncate text-3xl font-black tracking-[-.06em]">
                        {activeProject.title}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setMinimized(true)}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#C7B9B9] transition hover:text-white"
                      >
                        Minimize
                      </button>
                      <a
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full px-4 py-2 text-xs font-bold text-black transition hover:scale-[1.02]"
                        style={{ background: activeProject.accent }}
                      >
                        Open Live ↗
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-0 xl:grid-cols-[1fr_320px]">
                    <div className="relative h-[680px] overflow-hidden bg-black">
                      {isLoading && (
                        <div className="absolute inset-0 z-10 grid place-items-center bg-[#050505]">
                          <div className="text-center">
                            <div
                              className="mx-auto size-14 animate-spin rounded-full border-2 border-white/10 border-t-[#D71920]"
                            />
                            <p className="mt-5 text-xs uppercase tracking-[.35em] text-[#D71920]">
                              Loading Live Preview
                            </p>
                            <p className="mt-3 text-sm text-[#666]">{activeProject.domain}</p>
                          </div>
                        </div>
                      )}

                      <iframe
                        key={activeProject.id}
                        title={`${activeProject.title} live website preview`}
                        src={activeProject.url}
                        loading="lazy"
                        onLoad={() => setIsLoading(false)}
                        className={`h-full w-full border-0 bg-black transition-opacity duration-700 ${
                          isLoading ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    </div>

                    <aside className="border-t border-white/10 bg-[#080808] p-5 xl:border-l xl:border-t-0">
                      <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">Project Intel</p>
                      <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{activeProject.summary}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {activeProject.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#C7B9B9]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 grid gap-3">
                        {activeProject.build.map((item) => (
                          <div key={item} className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm leading-6 text-[#C7B9B9]">
                            {item}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-4">
                        <p className="text-xs uppercase tracking-[.25em] text-[#666]">Preview note</p>
                        <p className="mt-3 text-sm leading-6 text-[#C7B9B9]">
                          Some live sites block iframe previews. If a preview fails, use Open Live to view the project directly.
                        </p>
                      </div>
                    </aside>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="mt-12 overflow-hidden rounded-[3rem] border border-white/10 bg-[#070707] p-5 shadow-2xl md:p-10">
          <div className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[.35em] text-[#D71920]">
                Custom Creative Systems
              </p>
              <h2 className="geist max-w-4xl text-5xl font-black leading-[.9] tracking-[-0.07em] md:text-7xl">
                Components, graphics, logos, and digital assets built to feel alive.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#C7B9B9]">
                We do more than full websites. StillAwake Media can design custom UI sections, link hubs, landing blocks, logo systems, graphics, banners, thumbnails, social assets, and interactive brand pieces that make the whole business feel sharper.
              </p>
            </div>

            <a href="/contact" className="glass inline-flex w-fit rounded-full px-5 py-3 text-sm font-bold transition hover:bg-white/[.08]">
              Request Custom Work →
            </a>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <article ref={creativeDisplayRef} className="group scroll-mt-24 overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl">
              <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[.04] px-5 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[.3em] text-[#D71920]">Featured Component</p>
                  <h3 className="geist mt-1 text-2xl font-black tracking-[-.06em]">{activeCreative.title}</h3>
                </div>
                <span className="w-fit rounded-full border border-white/10 px-3 py-1 text-xs text-[#C7B9B9]">
                  {activeCreative.label}
                </span>
              </div>

              <div className="relative overflow-hidden bg-black">
                <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_80%_0%,rgba(215,25,32,.18),transparent_30%)] opacity-80" />
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={
                      activeCreative.id === "logos"
                        ? "/a_clean_high_resolution_square_futuristic_app_i.jpg"
                        : activeCreative.id === "graphics"
                        ? "/square_infographic_style_image_with_an_aquarium_ed..jpg"
                        : "/a_dark_moody_graphic_design_scene_a_centered_hor.jpg"
                    }
                  />

                  <img
                    key={activeCreative.id}
                    src={activeCreative.image}
                    alt={activeCreative.alt}
                    className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-[1.025] md:h-[560px]"
                  />
                </picture>
              </div>
            </article>

            <div className="grid gap-5">
              {creativeItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedCreative(item.id);

                    if (typeof window !== "undefined" && window.innerWidth < 1024) {
                      window.setTimeout(() => {
                        creativeDisplayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 80);
                    }
                  }}
                  className={`creativePillBounce group relative overflow-hidden rounded-[2.5rem] border p-6 text-left transition hover:-translate-y-1 ${
                    selectedCreative === item.id
                      ? "border-[#D71920]/60 bg-white/[.08]"
                      : "border-white/10 bg-white/[.04] hover:border-[#D71920]/50"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,.08),transparent_35%)]" />
                  <div className="relative">
                    <p className="mb-3 text-xs uppercase tracking-[.3em] text-[#D71920]">{item.label}</p>
                    <h3 className="geist text-3xl font-black tracking-[-.06em]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#C7B9B9]">{item.desc}</p>
                    <span className="mt-5 inline-flex text-xs font-bold text-white">
                      Display example →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[3rem] bg-[#D71920] p-8 md:p-14">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[.35em] text-white/70">Build with StillAwake</p>
              <h2 className="geist max-w-4xl text-5xl font-black leading-[.9] tracking-[-0.07em] md:text-7xl">
                Want your site to feel this impossible to ignore?
              </h2>
            </div>
            <a href="/contact" className="inline-flex rounded-full bg-black px-7 py-4 font-bold text-white transition hover:scale-[1.02]">
              Start a Project →
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
