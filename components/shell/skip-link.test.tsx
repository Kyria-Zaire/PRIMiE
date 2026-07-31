import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SkipLink } from "./skip-link";

describe("SkipLink", () => {
  it("rend le lien d’évitement exact", () => {
    const html = renderToStaticMarkup(<SkipLink />);

    expect(html.startsWith("<a")).toBe(true);
    expect(html).toContain('href="#contenu-principal"');
    expect(html).toContain("Aller au contenu principal");
    expect(html).toContain("sr-only");
    expect(html).toContain("focus-visible:not-sr-only");
    expect(html).toContain("focus-visible:bg-cta-gold");
  });
});
