import { ArticleMapSpy } from "./ArticleMapSpy";

export type ArticleMapItem = { id: string; text: string; level: number };

/**
 * The one in-page navigation for long pages (articles and wiki entries).
 *
 * Desktop: a sticky list beside the text. Phones: a native <details> drawer
 * above the text, so it works without JavaScript. The only script is the
 * optional scroll-spy that highlights the current section.
 */
export function ArticleMap({
  items,
  title = "Article Map",
  className = "",
}: {
  items: ArticleMapItem[];
  title?: string;
  className?: string;
}) {
  // Sections only: sub-questions (an FAQ's H3s, say) make the map too long to scan.
  const sections = items.filter((item) => item.level === 2);
  if (sections.length < 2) return null;

  const list = (
    <ol className="article-map-list">
      {sections.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} data-map-link={item.id}>
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className={`article-map-mobile lg:hidden ${className}`}>
        <summary>
          <span>{title}</span>
          <span className="article-map-count">{sections.length}</span>
        </summary>
        <nav aria-label={title}>{list}</nav>
      </details>
      <nav aria-label={title} className={`article-map hidden lg:block ${className}`}>
        <p className="article-map-title">{title}</p>
        {list}
      </nav>
      <ArticleMapSpy ids={sections.map((s) => s.id)} />
    </>
  );
}
