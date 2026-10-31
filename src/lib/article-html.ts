/**
 * Server-side enhancements to article HTML (markdown and CMS alike).
 *
 * Everything here is a plain string transform on trusted, already-rendered
 * HTML, so it runs at build/request time with no client JavaScript and every
 * word stays in the served document for crawlers:
 *
 * - h2/h3 get their id on the heading itself and a visible anchor link;
 * - tables are wrapped so they scroll sideways on narrow screens;
 * - the list right after a "Key takeaways" heading becomes a takeaway card;
 * - an ordered list whose items all lead with bold text becomes step blocks;
 * - the FAQ section's questions become native <details> disclosures, which
 *   search engines read in full whether or not they are open.
 */

const HEADING = /<h([23])((?:\s[^>]*)?)>(?:<span id="([^"]+)"><\/span>)?([\s\S]*?)<\/h\1>/g;

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function anchorHeadings(html: string) {
  return html.replace(HEADING, (_m, level: string, attrs: string, spanId: string | undefined, inner: string) => {
    const ownId = /\bid="([^"]+)"/.exec(attrs)?.[1];
    const id = spanId || ownId || slugify(inner);
    const rest = attrs.replace(/\s*\bid="[^"]*"/, "");
    return `<h${level} id="${id}"${rest}><a class="heading-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${inner}</h${level}>`;
  });
}

function wrapTables(html: string) {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, '<div class="table-scroll"><table>$1</table></div>');
}

function markTakeaways(html: string) {
  return html.replace(
    /(<h2 id="key-takeaways"[^>]*>[\s\S]*?<\/h2>\s*)<ul>/,
    '$1<ul class="takeaways">',
  );
}

function markSteps(html: string) {
  return html.replace(/<ol>([\s\S]*?)<\/ol>/g, (whole, inner: string) => {
    const items = inner.match(/<li>/g)?.length ?? 0;
    const bold = inner.match(/<li>\s*<strong>/g)?.length ?? 0;
    return items >= 3 && bold === items ? `<ol class="steps">${inner}</ol>` : whole;
  });
}

const FAQ_HEADING = /<h2 id="(faq|frequently-asked-questions|questions-frequentes|faq-questions-frequentes)"[^>]*>[\s\S]*?<\/h2>/;

function faqDisclosures(html: string) {
  const match = FAQ_HEADING.exec(html);
  if (!match) return html;
  const start = match.index + match[0].length;
  const nextH2 = html.indexOf("<h2", start);
  const end = nextH2 === -1 ? html.length : nextH2;
  const section = html.slice(start, end);
  const parts = section.split(/(?=<h3 id=")/);
  if (parts.length < 2) return html;
  const intro = parts[0];
  const items = parts
    .slice(1)
    .map((part) => {
      const h3 = part.match(/^<h3 id="([^"]+)"[^>]*>([\s\S]*?)<\/h3>/);
      if (!h3) return part;
      const answer = part.slice(h3[0].length);
      return `<details class="faq-item" id="${h3[1]}"><summary><h3>${h3[2]}</h3></summary><div class="faq-answer">${answer.trim()}</div></details>`;
    })
    .join("\n");
  return `${html.slice(0, start)}${intro}<div class="faq-list">${items}</div>${html.slice(end)}`;
}

export function enhanceArticleHtml(html: string) {
  return faqDisclosures(markSteps(markTakeaways(wrapTables(anchorHeadings(html)))));
}
