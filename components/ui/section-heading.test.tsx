import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("rend h2 par défaut avec titre", () => {
    const html = renderToStaticMarkup(<SectionHeading title="Services" />);

    expect(html).toContain("<h2");
    expect(html).toContain("font-display");
    expect(html).toContain("Services");
    expect(html).not.toContain('<p class="mt-');
  });

  it("supporte h1, h2, h3 et alignements", () => {
    expect(renderToStaticMarkup(<SectionHeading level="h1" title="A" />)).toContain("<h1");
    expect(renderToStaticMarkup(<SectionHeading level="h2" title="B" />)).toContain("<h2");
    expect(renderToStaticMarkup(<SectionHeading level="h3" title="C" />)).toContain("<h3");
    expect(renderToStaticMarkup(<SectionHeading align="center" title="D" />)).toContain(
      "text-center",
    );
    expect(renderToStaticMarkup(<SectionHeading align="left" title="E" />)).toContain("text-left");
  });

  it("rend eyebrow optionnel et omet description absente", () => {
    const withEyebrow = renderToStaticMarkup(
      <SectionHeading title="Titre" eyebrow="Découvrir" description="Lead utile." />,
    );
    const withoutDescription = renderToStaticMarkup(<SectionHeading title="Titre seul" />);

    expect(withEyebrow).toContain("Découvrir");
    expect(withEyebrow).toContain("Lead utile.");
    expect(withoutDescription).not.toContain("Lead");
    expect(withoutDescription.match(/<p/g) ?? []).toHaveLength(0);
  });
});
