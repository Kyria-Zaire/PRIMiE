import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Container } from "./container";

describe("Container", () => {
  it("rend un div serveur avec taille page par défaut", () => {
    const html = renderToStaticMarkup(<Container data-testid="box">Contenu</Container>);

    expect(html.startsWith("<div")).toBe(true);
    expect(html).toContain("max-w-page");
    expect(html).toContain("mx-auto");
    expect(html).toContain('data-testid="box"');
    expect(html).toContain("Contenu");
  });

  it("applique les trois tailles et className", () => {
    expect(renderToStaticMarkup(<Container size="page" />)).toContain("max-w-page");
    expect(renderToStaticMarkup(<Container size="content" />)).toContain("max-w-content");
    expect(renderToStaticMarkup(<Container size="narrow" />)).toContain("max-w-narrow");
    expect(renderToStaticMarkup(<Container className="custom" />)).toContain("custom");
  });
});
