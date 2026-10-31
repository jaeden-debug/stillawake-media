"use client";

import { useEffect } from "react";

/** Marks the Article Map link of the section being read. No layout work, no re-renders. */
export function ArticleMapSpy({ ids }: { ids: string[] }) {
  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length || !("IntersectionObserver" in window)) return;

    const setActive = (id: string) => {
      document.querySelectorAll<HTMLAnchorElement>("[data-map-link]").forEach((link) => {
        if (link.dataset.mapLink === id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [ids]);

  return null;
}
