import Image from "next/image";

/**
 * Artwork slot that never breaks.
 *
 * With a real image it renders next/image (responsive, lazy unless
 * `priority`). Without one it renders a designed typographic poster in the
 * project's accent colour: deliberate, not a broken-image icon and not a
 * stand-in pretending to be a screenshot. The box always reserves its aspect
 * ratio, so swapping the real image in later causes no layout shift.
 */
export function PosterArt({
  src,
  alt,
  title,
  eyebrow,
  accent,
  aspect = "16 / 9",
  sizes = "(max-width: 768px) 80vw, 360px",
  priority = false,
  fit = "cover",
  className = "",
}: {
  src?: string;
  alt?: string;
  title: string;
  eyebrow?: string;
  accent: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0d0d0d] ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "cover" ? "object-cover" : "object-contain p-6"}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 85% 0%, ${accent}55, transparent 55%), radial-gradient(90% 80% at 0% 100%, ${accent}22, transparent 60%), linear-gradient(160deg, #141414, #070707)`,
            }}
          />
          <div className="absolute inset-0 opacity-[.07] [background-image:repeating-linear-gradient(0deg,#fff_0_1px,transparent_1px_4px)]" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            {eyebrow && (
              <p className="text-[10px] font-bold uppercase tracking-[.3em]" style={{ color: accent }}>
                {eyebrow}
              </p>
            )}
            <p className="geist mt-1 text-3xl font-black leading-[.9] tracking-[-.06em] text-white/90 md:text-4xl">
              {title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
