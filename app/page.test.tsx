import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";

describe("Home page", () => {
  it("conserve le rendu minimal PRIMiE", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain("PRIMiE");
    expect(html).toContain("Site en préparation.");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html.match(/<main\b/g)).toHaveLength(1);
    expect(html).not.toContain("<a");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("#services");
    expect(html).not.toContain("Tresses");
    expect(html).not.toContain("FAQ");
  });
});
