import { describe, expect, it } from "vitest";
import { faq } from "../content/faq";
import { gallery } from "../content/gallery";
import { testimonials } from "../content/testimonials";

describe("contenus non validés", () => {
  it("garde la galerie vide", () => {
    expect(gallery).toEqual([]);
    expect(gallery).toHaveLength(0);
  });

  it("garde les témoignages vides", () => {
    expect(testimonials).toEqual([]);
    expect(testimonials).toHaveLength(0);
  });

  it("garde la FAQ vide", () => {
    expect(faq).toEqual([]);
    expect(faq).toHaveLength(0);
  });
});
