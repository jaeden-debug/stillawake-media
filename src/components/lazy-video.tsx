"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A muted, looping background video that downloads only when it nears the
 * viewport. `preload="none"` alone doesn't do this: `autoPlay` overrides it,
 * so a below-the-fold video on the homepage was fetched (401 KB) during the
 * initial load, competing with the hero for bandwidth. Until it's in view the
 * poster shows, which is what visitors saw before the video loaded anyway.
 */
export function LazyVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={near ? src : undefined}
      poster={poster}
      preload="none"
      autoPlay={near}
      muted
      loop
      playsInline
    />
  );
}
