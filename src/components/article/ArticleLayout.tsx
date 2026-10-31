import Image from "next/image";
import Link from "next/link";
import { jaedenDoody } from "@/data/people/jaeden-doody";
import { ArticleMap, type ArticleMapItem } from "./ArticleMap";

type Locale = "en" | "fr";

export type ArticleLayoutProps = {
  locale: Locale;
  backHref: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  /** True when the author is Jaeden: shows the avatar, profile link and bio. */
  byJaeden: boolean;
  date: string;
  updated?: string;
  readTime: string;
  toc: ArticleMapItem[];
  cta: { title: string; links: { href: string; label: string; primary?: boolean }[] };
  related: { href: string; category: string; title: string; excerpt: string }[];
  children: React.ReactNode;
};

const COPY = {
  en: {
    back: "StillAwake Times",
    by: "By",
    published: "Published",
    updated: "Updated",
    map: "Article Map",
    next: "Next step",
    related: "Related reading",
    aboutAuthor: "About the author",
    profile: "View profile",
    bio: jaedenDoody.shortBio,
  },
  fr: {
    back: "Articles",
    by: "Par",
    published: "Publié le",
    updated: "Mis à jour le",
    map: "Plan de l'article",
    next: "Prochaine étape",
    related: "À lire ensuite",
    aboutAuthor: "À propos de l'auteur",
    profile: "Voir le profil",
    bio: "Jaeden Doody est le fondateur montréalais de StillAwake Media. Il conçoit des logiciels, des systèmes d'IA et des solutions concrètes pour les entreprises d'aujourd'hui.",
  },
} as const;

function formatDate(iso: string, locale: Locale) {
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * The single article template for markdown and CMS articles in both locales.
 * Server-rendered; the only client code is the Article Map's scroll-spy.
 */
export function ArticleLayout(props: ArticleLayoutProps) {
  const t = COPY[props.locale];
  const profileHref = props.locale === "fr" ? "/fr/fondateur/jaeden-doody" : jaedenDoody.path;
  const showUpdated = props.updated && props.updated !== props.date;

  return (
    <>
      <article className="article-shell">
        <header className="article-header">
          <nav aria-label="Breadcrumb" className="article-crumbs">
            <Link href={props.backHref}>{t.back}</Link>
            <span aria-hidden="true">/</span>
            <span>{props.category}</span>
          </nav>
          <h1 className="article-title">{props.title}</h1>
          <p className="article-dek">{props.excerpt}</p>
          <div className="article-byline">
            {props.byJaeden ? (
              <Image
                src="/jaeden-doody-founder-stillawake-media.jpg"
                alt={props.author}
                width={44}
                height={44}
                className="article-avatar"
                priority
              />
            ) : null}
            <div>
              <p className="article-author">
                {props.byJaeden ? (
                  <Link href={profileHref}>
                    {t.by} {props.author}
                  </Link>
                ) : (
                  props.author
                )}
              </p>
              <p className="article-meta">
                <span>
                  {t.published} <time dateTime={props.date}>{formatDate(props.date, props.locale)}</time>
                </span>
                {showUpdated ? (
                  <span>
                    {t.updated} <time dateTime={props.updated}>{formatDate(props.updated!, props.locale)}</time>
                  </span>
                ) : null}
                <span>{props.readTime}</span>
              </p>
            </div>
          </div>
        </header>

        <div className="article-grid">
          <aside className="article-aside">
            <div className="article-aside-sticky">
              <ArticleMap items={props.toc} title={t.map} />
            </div>
          </aside>

          <div className="article-main">
            {props.children}

            {props.byJaeden ? (
              <section className="article-author-card" aria-labelledby="article-author-heading">
                <Image
                  src="/jaeden-doody-founder-stillawake-media.jpg"
                  alt=""
                  width={72}
                  height={72}
                  className="article-avatar"
                />
                <div>
                  <p id="article-author-heading" className="article-author-label">{t.aboutAuthor}</p>
                  <p className="article-author-name">{props.author}</p>
                  <p className="article-author-bio">{t.bio}</p>
                  <Link href={profileHref} className="article-author-link">{t.profile} →</Link>
                </div>
              </section>
            ) : null}

            <section className="article-cta">
              <p className="article-cta-label">{t.next}</p>
              <h2 className="article-cta-title">{props.cta.title}</h2>
              <div className="article-cta-links">
                {props.cta.links.map((link) => (
                  <Link key={link.href} href={link.href} className={link.primary ? "is-primary" : undefined}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      {props.related.length > 0 ? (
        <section className="article-related" aria-labelledby="article-related-heading">
          <h2 id="article-related-heading">{t.related}</h2>
          <ul>
            {props.related.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span className="article-related-cat">{item.category}</span>
                  <span className="article-related-title">{item.title}</span>
                  <span className="article-related-excerpt">{item.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
