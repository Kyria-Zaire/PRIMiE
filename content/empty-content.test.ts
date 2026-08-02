import { describe, expect, it } from "vitest";
import { gallery } from "../content/gallery";

describe("contenus différés / non sectionnés", () => {
  it("expose la galerie d’inspirations (illustrations validées)", () => {
    expect(gallery).toHaveLength(14);
    expect(gallery.every((item) => item.kind === "illustration")).toBe(true);
  });
});
