/**
 * The default Open Graph / Twitter card, in one place.
 *
 * Next.js REPLACES the `openGraph` object when a page declares one — it does
 * not deep-merge it with the parent. So every page that set its own
 * `openGraph` to override the title, description or url silently discarded the
 * root shell's `images` and shipped with no card at all.
 *
 * A live crawl on 2026-10-29 found 140 of 338 URLs in that state, across 64
 * page files: most of /games, most of /fr, every /tools page and every /work
 * case study. Those are the pages most likely to be shared, and a shared link
 * with no card is a measurably worse link.
 *
 * Spread `images: OG_IMAGES` into every page-level `openGraph`. A page that
 * genuinely wants its own art can still override it; what must not happen
 * again is losing the card by accident while editing a title.
 *
 * Kept identical to the array in src/components/root-shell.tsx, which is where
 * the inheriting pages get it from.
 */
export const OG_IMAGES = [
  {
    url: "/stillawake-media-social-preview.jpeg",
    width: 1200,
    height: 655,
    alt: "StillAwake Media — Web Design, SEO, AI and Software",
  },
];

/** Twitter takes a bare URL list rather than objects. */
export const TWITTER_IMAGES = ["/stillawake-media-social-preview.jpeg"];
