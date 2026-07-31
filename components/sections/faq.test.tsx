import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { faq } from "@/content/faq";
import { Faq } from "./faq";

describe("Faq section", () => {
  it("rend #faq avec exactement cinq questions/réponses natives", () => {
    const html = renderToStaticMarkup(<Faq />);

    expect(html).toContain('id="faq"');
    expect(html).toContain(">Questions fréquentes<");
    expect(html.match(/<h2\b/g)).toHaveLength(1);
    expect(html.match(/<details\b/g)).toHaveLength(5);
    expect(html.match(/<summary\b/g)).toHaveLength(5);

    for (const item of faq) {
      expect(html).toContain(item.question);
      expect(html).toContain(item.answer);
    }

    const order = faq.map((item) => html.indexOf(item.question));
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(html).not.toMatch(/dimanche/i);
    expect(html).not.toContain("09h00");
    expect(html).not.toContain("<img");
  });

  it("reste un Server Component alimenté par content/faq.ts", () => {
    const source = readFileSync(join(process.cwd(), "components/sections/faq.tsx"), "utf8");

    expect(source).not.toMatch(/["']use client["']/);
    expect(source).toContain('from "@/content/faq"');
    expect(source).not.toContain("Comment prendre rendez-vous");
    expect(source).not.toMatch(/\b(useState|useEffect)\b/);
  });
});
