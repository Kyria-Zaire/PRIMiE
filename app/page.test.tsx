import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

describe("Home page", () => {
  it("intègre le shell CORE complet sans lien mort ni contenu inventé", () => {
    const html = renderToStaticMarkup(Home());

    expect(html).toContain("Aller au contenu principal");
    expect(html).toContain('href="#contenu-principal"');
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
    expect(html).toContain('id="contenu-principal"');
    expect(html).toContain('tabindex="-1"');
    expect(html).toContain('id="accueil"');
    expect(html).toContain('id="services"');
    expect(html).toContain('id="reserver"');
    expect(html).toContain('id="contact"');
    expect(html).toContain("bg-hero");
    expect(html).toContain("PRiMiE");
    expect(html).toContain("Chez PRiMiE Coiffure");
    expect(html).toContain("Coiffure et beauté afro à domicile");
    expect(html).toContain(">Nos services<");
    expect(html).toContain(">Réservez votre prestation<");
    expect(html).toContain(
      "Contactez Prisca directement sur WhatsApp pour échanger sur votre demande.",
    );
    expect(html).toContain("Tresses &amp; coiffure femme et homme");
    expect(html).toContain("Découvrir nos services");
    expect(html).toContain('href="#services"');
    expect(html).toContain('href="#reserver"');
    expect(html).toContain('href="#contact"');
    expect(html).toContain('href="https://wa.me/33749616582"');
    expect(html).not.toContain("?text=");
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("Site en préparation.");
    expect(html).not.toContain("Réponse rapide");
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("Extensions cils");

    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain(">Nos services<");
    expect(html).toContain(">Réservez votre prestation<");
    expect(html).toMatch(/<h2[^>]*>Contact<\/h2>|>Contact</);
    const h2Count = html.match(/<h2\b/g)?.length ?? 0;
    expect(h2Count).toBe(3);

    expect(html).toContain(">Accueil<");
    expect(html).toContain(">Services<");
    expect(html).toContain(">Réserver<");
    expect(html).toContain(">Contact<");
    expect(html).not.toContain("#galerie");
    expect(html).not.toContain("#a-propos");
    expect(html).not.toContain("#avis");
    expect(html).not.toContain("#faq");
    expect(html).not.toContain(">Galerie");

    for (const href of ["#accueil", "#services", "#reserver", "#contact"] as const) {
      expect(html).toContain(`href="${href}"`);
      const id = href.slice(1);
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("ne contient qu’une directive client dans le shell et aucune dans sections", () => {
    const pageSource = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    expect(pageSource).not.toMatch(/["']use client["']/);
    expect(pageSource).toMatch(
      /RENDERED_SECTION_IDS\s*=\s*\[[\s\S]*"accueil"[\s\S]*"services"[\s\S]*"reserver"[\s\S]*"contact"/,
    );

    const shellDir = join(process.cwd(), "components/shell");
    const shellFiles = readdirSync(shellDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    const shellClients = shellFiles.filter((name) => {
      const source = readFileSync(join(shellDir, name), "utf8");
      return /["']use client["']/.test(source);
    });
    expect(shellClients).toEqual(["mobile-navigation.tsx"]);

    const sectionsDir = join(process.cwd(), "components/sections");
    const sectionFiles = readdirSync(sectionsDir).filter(
      (name) => name.endsWith(".tsx") && !name.includes(".test."),
    );
    const sectionClients = sectionFiles.filter((name) => {
      const source = readFileSync(join(sectionsDir, name), "utf8");
      return /["']use client["']/.test(source);
    });
    expect(sectionClients).toEqual([]);
  });
});
