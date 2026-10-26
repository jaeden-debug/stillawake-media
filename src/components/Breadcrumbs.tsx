import Link from "next/link";
import type { Crumb } from "@/lib/game-schema";

/** Visible breadcrumb trail. The last crumb is the current page and is not a link. */
export function Breadcrumbs({ crumbs, className = "" }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#a9a0a0]">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-[#d8d0d0]">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white">
                    {c.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
