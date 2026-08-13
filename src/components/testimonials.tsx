import Link from "next/link";
import { testimonialsFor, type TestimonialPlacement } from "@/data/testimonials";

/**
 * Renders real client quotes for one surface, or nothing at all.
 *
 * The "or nothing at all" is the important half. Drop <Testimonials> onto a
 * page today and it renders no markup, no heading and no empty state — the
 * page looks exactly as it does now. The moment a real quote is added to the
 * registry with permission, it appears. That way the placements can be wired
 * up and reviewed before any proof exists, without the site ever displaying
 * a hollow "What our clients say" heading above blank space.
 *
 * Attribution is always full — name, company, and role where they have one.
 * An anonymous quote is not evidence, and rendering one would undercut the
 * quotes that are real.
 */
export function Testimonials({
  placement,
  title,
  className = "",
}: {
  placement: TestimonialPlacement;
  title?: string;
  className?: string;
}) {
  const items = testimonialsFor(placement);
  if (items.length === 0) return null;

  return (
    <section className={`px-6 py-16 ${className}`}>
      <div className="mx-auto max-w-5xl">
        {title ? (
          <h2 className="geist text-3xl font-black tracking-[-0.04em] text-white">{title}</h2>
        ) : null}
        <div
          className={
            "mt-10 grid gap-6 " + (items.length > 1 ? "md:grid-cols-2" : "max-w-3xl")
          }
        >
          {items.map((t) => (
            <figure key={t.id} className="rounded-2xl border border-white/10 p-6">
              <blockquote className="text-lg leading-relaxed text-[#C7B9B9]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-bold text-white">{t.name}</span>
                <span className="text-[#C7B9B9]">
                  {t.role ? `, ${t.role}` : ""} — {t.company}
                </span>
                {t.project ? (
                  <>
                    {" · "}
                    <Link
                      href={`/work/${t.project}`}
                      className="text-[#C7B9B9] underline hover:text-white"
                    >
                      See the project
                    </Link>
                  </>
                ) : null}
                {/* A quote a reader can go and check is worth more than one
                    they have to take on faith. Link it whenever it is public. */}
                {t.sourceUrl ? (
                  <>
                    {" · "}
                    <a
                      href={t.sourceUrl}
                      rel="nofollow noopener"
                      className="text-[#C7B9B9] underline hover:text-white"
                    >
                      {t.source === "google-review" ? "Google review" : "Source"}
                    </a>
                  </>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
