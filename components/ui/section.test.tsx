import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Section } from "./section";

describe("Section", () => {
  it("rend une section avec id et sans Container automatique", () => {
    const html = renderToStaticMarkup(
      <Section id="services" data-anchor="yes">
        Corps
      </Section>,
    );

    expect(html.startsWith("<section")).toBe(true);
    expect(html).toContain('id="services"');
    expect(html).toContain('data-anchor="yes"');
    expect(html).toContain("scroll-mt-24");
    expect(html).not.toContain("max-w-page");
    expect(html).not.toContain("mx-auto w-full px-4");
  });

  it("applique tons et espacements", () => {
    expect(renderToStaticMarkup(<Section tone="paper" />)).toContain("bg-paper");
    expect(renderToStaticMarkup(<Section tone="cream" />)).toContain("bg-cream");
    expect(renderToStaticMarkup(<Section tone="ink" />)).toContain("bg-ink");
    expect(renderToStaticMarkup(<Section spacing="default" />)).toContain("py-16");
    expect(renderToStaticMarkup(<Section spacing="compact" />)).toContain("py-10");
    expect(renderToStaticMarkup(<Section spacing="none" />)).toContain("py-0");
  });
});
