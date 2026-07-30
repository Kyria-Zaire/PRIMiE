import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Card } from "./card";

describe("Card", () => {
  it("rend une surface non interactive par défaut", () => {
    const html = renderToStaticMarkup(<Card data-role="surface">Contenu</Card>);

    expect(html.startsWith("<div")).toBe(true);
    expect(html).toContain("rounded-lg");
    expect(html).toContain("border");
    expect(html).toContain("shadow-soft");
    expect(html).toContain('data-role="surface"');
    expect(html).not.toContain("hover:");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("<a");
  });

  it("applique variantes, paddings et className", () => {
    expect(renderToStaticMarkup(<Card variant="default" />)).toContain("bg-paper");
    expect(renderToStaticMarkup(<Card variant="muted" />)).toContain("bg-surface-muted");
    expect(renderToStaticMarkup(<Card padding="sm" />)).toContain("p-4");
    expect(renderToStaticMarkup(<Card padding="md" />)).toContain("p-5");
    expect(renderToStaticMarkup(<Card padding="lg" />)).toContain("p-6");
    expect(renderToStaticMarkup(<Card className="extra" />)).toContain("extra");
  });
});
