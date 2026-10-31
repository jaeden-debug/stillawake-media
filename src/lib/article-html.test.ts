import { describe, expect, it } from "vitest";
import { enhanceArticleHtml } from "@/lib/article-html";

describe("enhanceArticleHtml", () => {
  it("moves span ids onto headings and adds anchor links", () => {
    const out = enhanceArticleHtml('<h2><span id="intro"></span>Intro</h2><h3 class="x"><span id="sub"></span>Sub</h3>');
    expect(out).toContain('<h2 id="intro"><a class="heading-anchor" href="#intro"');
    expect(out).toContain('<h3 id="sub" class="x">');
  });

  it("wraps tables and marks takeaways and step lists", () => {
    const out = enhanceArticleHtml(
      '<h2><span id="key-takeaways"></span>Key takeaways</h2>\n<ul>\n<li>A</li>\n</ul>' +
        "<table><tr><td>1</td></tr></table>" +
        "<ol>\n<li><strong>One.</strong> a</li>\n<li><strong>Two.</strong> b</li>\n<li><strong>Three.</strong> c</li>\n</ol>" +
        "<ol>\n<li>plain</li>\n<li>plain</li>\n<li>plain</li>\n</ol>",
    );
    expect(out).toContain('<ul class="takeaways">');
    expect(out).toContain('<div class="table-scroll"><table>');
    expect(out.match(/<ol class="steps">/g)).toHaveLength(1);
  });

  it("turns FAQ questions into details without dropping any text", () => {
    const html =
      '<h2><span id="faq"></span>FAQ</h2>\n<h3><span id="q1"></span>Q1?</h3>\n<p>A1.</p>\n<h3><span id="q2"></span>Q2?</h3>\n<p>A2.</p>\n<h2><span id="end"></span>End</h2>';
    const out = enhanceArticleHtml(html);
    expect(out).toContain('<details class="faq-item" id="q1"><summary><h3>');
    expect(out).toContain("<p>A1.</p>");
    expect(out).toContain("<p>A2.</p>");
    expect(out).toContain('<h2 id="end">');
    expect(out.indexOf('id="end"')).toBeGreaterThan(out.indexOf("A2."));
  });

  it("leaves pages without these features unchanged apart from headings", () => {
    expect(enhanceArticleHtml("<p>Hello</p>")).toBe("<p>Hello</p>");
  });
});
