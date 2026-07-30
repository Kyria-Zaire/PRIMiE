import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";

describe("Home page", () => {
  it("rend PRIMIE et le message de préparation", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain("PRIMIE");
    expect(html).toContain("Site en préparation.");
  });
});
