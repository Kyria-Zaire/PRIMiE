import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const themeCss = readFileSync(join(root, "app/theme.css"), "utf8");
const globalsCss = readFileSync(join(root, "app/globals.css"), "utf8");

const OLD_BRAND_HEX = [
  "#0b0908",
  "#191512",
  "#c9a45c",
  "#f7f0e6",
  "#e8d8c3",
  "#fffdf8",
  "#0B0908",
  "#191512",
  "#C9A45C",
  "#F7F0E6",
  "#E8D8C3",
  "#FFFDF8",
];

describe("Design tokens PRiMiE v1.0", () => {
  it("expose les 12 couleurs primitives canoniques", () => {
    expect(themeCss).toContain("--color-black: #0e0d0c");
    expect(themeCss).toContain("--color-rich-black: #1b1918");
    expect(themeCss).toContain("--color-espresso: #533420");
    expect(themeCss).toContain("--color-bronze: #664a30");
    expect(themeCss).toContain("--color-gold: #a98c69");
    expect(themeCss).toContain("--color-gold-light: #cf9a5f");
    expect(themeCss).toContain("--color-champagne: #dfcdb4");
    expect(themeCss).toContain("--color-soft-gold: #c5ae97");
    expect(themeCss).toContain("--color-ivory: #f3ebe4");
    expect(themeCss).toContain("--color-warm-cream: #efe4d7");
    expect(themeCss).toContain("--color-taupe: #aa9f90");
    expect(themeCss).toContain("--color-warm-gray: #6a5e51");
  });

  it("distingue ivory et warm-cream sans inversion", () => {
    expect(themeCss).toMatch(/--color-ivory:\s*#f3ebe4/i);
    expect(themeCss).toMatch(/--color-warm-cream:\s*#efe4d7/i);
    expect(themeCss).not.toMatch(/--color-ivory:\s*#efe4d7/i);
    expect(themeCss).not.toMatch(/--color-warm-cream:\s*#f3ebe4/i);
  });

  it("expose les trois dégradés canoniques via variables", () => {
    expect(themeCss).toContain("--gradient-hero:");
    expect(themeCss).toContain("--gradient-cta:");
    expect(themeCss).toContain("--gradient-surface:");
    expect(themeCss).toContain("var(--color-black)");
    expect(themeCss).toContain("var(--color-rich-black)");
    expect(themeCss).toContain("var(--color-gold)");
    expect(themeCss).toContain("var(--color-gold-light)");
    expect(themeCss).toContain("var(--color-ivory)");
    expect(themeCss).toContain("var(--color-warm-cream)");
    expect(themeCss).toContain("--background-image-hero:");
    expect(themeCss).toContain("--background-image-cta-gold:");
    expect(themeCss).toContain("--background-image-surface-light:");
  });

  it("expose les rôles sémantiques essentiels", () => {
    expect(themeCss).toContain("--color-background: var(--color-ivory)");
    expect(themeCss).toContain("--color-foreground: var(--color-black)");
    expect(themeCss).toContain("--color-surface: var(--color-warm-cream)");
    expect(themeCss).toContain("--color-surface-muted: var(--color-champagne)");
    expect(themeCss).toContain("--color-surface-dark: var(--color-rich-black)");
    expect(themeCss).toContain("--color-primary: var(--color-gold)");
    expect(themeCss).toContain("--color-primary-hover: var(--color-gold-light)");
    expect(themeCss).toContain("--color-primary-foreground: var(--color-black)");
    expect(themeCss).toContain("--color-accent: var(--color-soft-gold)");
    expect(themeCss).toContain("--color-border: var(--color-soft-gold)");
    expect(themeCss).toContain("--color-muted: var(--color-taupe)");
    expect(themeCss).toContain("--color-muted-foreground: var(--color-warm-gray)");
    expect(themeCss).toContain("--color-on-dark: var(--color-ivory)");
    expect(themeCss).toContain("--color-on-dark-muted: var(--color-taupe)");
    expect(themeCss).toContain("--color-focus: var(--color-gold)");
  });

  it("n’expose plus les anciennes couleurs de marque", () => {
    for (const hex of OLD_BRAND_HEX) {
      expect(themeCss.toLowerCase()).not.toContain(hex.toLowerCase());
    }
    expect(themeCss).not.toContain("--color-ink:");
    expect(themeCss).not.toContain("--color-charcoal:");
    expect(themeCss).not.toContain("--color-paper:");
    expect(themeCss).not.toContain("--color-cream:");
    expect(themeCss).not.toContain("--color-beige:");
  });

  it("conserve success et danger comme tokens fonctionnels", () => {
    expect(themeCss).toContain("--color-success:");
    expect(themeCss).toContain("--color-danger:");
  });

  it("expose les familles typographiques sans, display et script", () => {
    expect(themeCss).toContain("--font-sans:");
    expect(themeCss).toContain("--font-display:");
    expect(themeCss).toContain("--font-script:");
    expect(themeCss).toContain("var(--font-manrope)");
    expect(themeCss).toContain("var(--font-cormorant)");
    expect(themeCss).toContain("var(--font-great-vibes)");
    expect(themeCss).not.toMatch(/allura/i);
  });

  it("expose le conteneur page à 75rem", () => {
    expect(themeCss).toContain("--max-width-page: 75rem");
    expect(themeCss).toContain("--max-width-content: 48rem");
    expect(themeCss).toContain("--max-width-narrow: 36rem");
  });

  it("expose les z-index shell Header et menu mobile", () => {
    expect(themeCss).toContain("--z-header: 20");
    expect(themeCss).toContain("--z-mobile-nav: 30");
    expect(themeCss).toContain("--z-nav-dialog: 40");
  });

  it("définit prefers-reduced-motion dans les styles globaux", () => {
    expect(globalsCss).toContain("prefers-reduced-motion");
    expect(globalsCss).toContain(":focus-visible");
    expect(globalsCss).toContain('@import "./theme.css"');
  });

  it("n’embarque pas d’hexadécimaux dans components/shell et components/ui", () => {
    const dirs = [join(root, "components/shell"), join(root, "components/ui")];
    const hex = /#[0-9a-fA-F]{3,8}\b/;

    for (const dir of dirs) {
      const files = readdirSync(dir).filter(
        (name) => name.endsWith(".tsx") && !name.includes(".test."),
      );
      for (const name of files) {
        const source = readFileSync(join(dir, name), "utf8");
        expect(source, `${dir}/${name}`).not.toMatch(hex);
      }
    }
  });
});
