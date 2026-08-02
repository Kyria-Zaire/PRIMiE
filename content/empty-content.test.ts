import { describe, expect, it } from "vitest";
import { gallery } from "../content/gallery";
import { testimonials } from "../content/testimonials";

describe("contenus non validés", () => {
  it("expose la galerie d’inspirations (données 01B, UI encore absente)", () => {
    expect(gallery).toHaveLength(14);
    expect(gallery.every((item) => item.kind === "illustration")).toBe(true);
  });

  it("garde les témoignages vides", () => {
    expect(testimonials).toEqual([]);
    expect(testimonials).toHaveLength(0);
  });
});
