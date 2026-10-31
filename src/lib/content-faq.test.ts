import { describe, expect, it } from "vitest";
import { extractFaq, extractHowTo } from "@/lib/content";

describe("extractFaq", () => {
  it("reads H3 questions and their answers from the FAQ section only", () => {
    const md = [
      "## Intro",
      "### Not a question",
      "Body.",
      "## FAQ",
      "### What is it?",
      "It is a **thing**, see [the guide](/guide).",
      "",
      "Second paragraph.",
      "### Why?",
      "Because.",
      "## Next step",
      "### Also not a question",
      "Text.",
    ].join("\n");
    expect(extractFaq(md)).toEqual([
      { question: "What is it?", answer: "It is a thing, see the guide. Second paragraph." },
      { question: "Why?", answer: "Because." },
    ]);
  });

  it("accepts the long heading and returns nothing without a FAQ section", () => {
    expect(extractFaq("## Frequently asked questions\n### Q\nA")).toEqual([{ question: "Q", answer: "A" }]);
    expect(extractFaq("## Something\n### Q\nA")).toEqual([]);
  });
});

describe("extractHowTo", () => {
  it("reads bold-led ordered items under the named H2 only", () => {
    const md = [
      "## The method",
      "1. **Put one moderator in charge.** You talk to it only.",
      "2. **Split by ownership:** one owner per script.",
      "Not a step.",
      "## Other",
      "3. **Ignored.** Outside the section.",
    ].join("\n");
    expect(extractHowTo(md, "The method")).toEqual([
      { name: "Put one moderator in charge", text: "You talk to it only." },
      { name: "Split by ownership", text: "one owner per script." },
    ]);
    expect(extractHowTo(md, "Missing")).toEqual([]);
  });
});
