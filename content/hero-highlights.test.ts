import { describe, expect, it } from "vitest";
import { heroHighlights } from "./hero-highlights";

describe("heroHighlights", () => {
  it("expose les quatre signaux de la maquette brand", () => {
    expect(heroHighlights).toHaveLength(4);
    expect(heroHighlights.map((item) => item.label)).toEqual([
      "PROFESSIONNELLE",
      "SOIGNÉE",
      "TENDANCE",
      "À DOMICILE",
    ]);
  });
});
