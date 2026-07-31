import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

describe("Home page", () => {
  it("intègre SkipLink, Header, Accueil et Footer sans lien mort", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain("Aller au contenu principal");
    expect(html).toContain('href="#contenu-principal"');
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
    expect(html).toContain('id="contenu-principal"');
    expect(html).toContain('tabindex="-1"');
    expect(html).toContain('id="accueil"');
    expect(html).toContain("PRiMiE");
    expect(html).toContain("Site en préparation.");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("Coiffure et beauté afro à domicile");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html.match(/<main\b/g)).toHaveLength(1);
    expect(html.match(/<footer\b/g)).toHaveLength(1);

    expect(html).toContain('aria-label="Navigation principale"');
    expect(html).toContain('aria-label="Navigation mobile"');
    expect(html).toContain('aria-label="Navigation du pied de page"');
    expect(html).toContain(">Accueil<");
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain(">Menu<");
    expect(html).toContain('href="https://wa.me/33749616582"');
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain(">WhatsApp<");

    expect(html).not.toContain("#services");
    expect(html).not.toContain("#galerie");
    expect(html).not.toContain("#a-propos");
    expect(html).not.toContain("#avis");
    expect(html).not.toContain("#faq");
    expect(html).not.toContain("#reserver");
    expect(html).not.toContain("#contact");
    expect(html).not.toContain("Tresses");
    expect(html).not.toContain("FAQ");
    expect(html).not.toContain("Tous droits réservés");
    expect(html).not.toContain("mentions légales");
  });

  it("ne contient qu’une directive client dans le shell", () => {
    const pageSource = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    expect(pageSource).not.toMatch(/["']use client["']/);

    const shellDir = join(process.cwd(), "components/shell");
    const files = readdirSync(shellDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    const clientFiles = files.filter((name) => {
      const source = readFileSync(join(shellDir, name), "utf8");
      return /["']use client["']/.test(source);
    });

    expect(clientFiles).toEqual(["mobile-navigation.tsx"]);
  });
});
