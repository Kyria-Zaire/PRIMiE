import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const themeCss = readFileSync(join(root, "app/theme.css"), "utf8");
const globalsCss = readFileSync(join(root, "app/globals.css"), "utf8");

describe("Design tokens PRIMiE", () => {
  it("expose les couleurs canoniques de la marque", () => {
    expect(themeCss).toContain("--color-ink: #0b0908");
    expect(themeCss).toContain("--color-charcoal: #191512");
    expect(themeCss).toContain("--color-gold: #c9a45c");
    expect(themeCss).toContain("--color-cream: #f7f0e6");
    expect(themeCss).toContain("--color-beige: #e8d8c3");
    expect(themeCss).toContain("--color-paper: #fffdf8");
  });

  it("expose les familles typographiques sans et display", () => {
    expect(themeCss).toContain("--font-sans:");
    expect(themeCss).toContain("--font-display:");
    expect(themeCss).toContain("var(--font-manrope)");
    expect(themeCss).toContain("var(--font-cormorant)");
    expect(themeCss).not.toMatch(/allura/i);
  });

  it("expose le conteneur page à 75rem", () => {
    expect(themeCss).toContain("--max-width-page: 75rem");
    expect(themeCss).toContain("--max-width-content: 48rem");
    expect(themeCss).toContain("--max-width-narrow: 36rem");
  });

  it("expose le token focus sémantique", () => {
    expect(themeCss).toContain("--color-focus:");
    expect(themeCss).toContain("var(--color-gold)");
  });

  it("définit prefers-reduced-motion dans les styles globaux", () => {
    expect(globalsCss).toContain("prefers-reduced-motion");
    expect(globalsCss).toContain(":focus-visible");
    expect(globalsCss).toContain('@import "./theme.css"');
  });
});
