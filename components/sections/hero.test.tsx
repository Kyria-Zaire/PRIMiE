import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { heroHighlights } from "@/content/hero-highlights";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Hero } from "./hero";

describe("Hero", () => {
  it("rend la section #accueil avec composition brand, slogan canonique et CTA", () => {
    const html = renderToStaticMarkup(<Hero />);
    const expectedWhatsApp = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

    expect(html).toContain('id="accueil"');
    expect(html).toContain("bg-hero");
    expect(html).toContain(">PRiMiE<");
    expect(html).toContain("Chez");
    expect(html).toContain("COIFFURE");
    expect(html).toContain(siteConfig.brand.slogan);
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain(`href="${expectedWhatsApp}"`);
    expect(html).toContain("?text=");
    expect(html).toContain("Découvrir nos services");
    expect(html).toContain('href="#services"');
    expect(html).toContain("font-script");
    expect(html).toContain("bg-clip-text");

    for (const item of heroHighlights) {
      expect(html).toContain(item.label);
    }

    expect(html).not.toContain("Site en préparation.");
    expect(html).not.toContain("#galerie");
    expect(html).not.toContain("PRIMiE");
    expect(html).not.toContain("Primie");
    expect(html).not.toContain("uppercase");
    expect(html).not.toContain("Révélez votre beauté, une coiffure à la fois.");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
  });

  it("applique l’art direction mobile/desktop sans importer les PNG sources", () => {
    const html = renderToStaticMarkup(<Hero />);
    const source = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");
    const desktopWebp = join(process.cwd(), "public/images/hero/primie-hero-v1.webp");
    const mobileWebp = join(process.cwd(), "public/images/hero/primie-hero-mobile-v1.webp");
    const desktopPng = join(process.cwd(), "images/primie-hero.png");
    const mobilePng = join(process.cwd(), "images/primie section hero mobile.png");

    expect(existsSync(desktopWebp)).toBe(true);
    expect(existsSync(mobileWebp)).toBe(true);
    expect(statSync(desktopWebp).size).toBeLessThanOrEqual(450 * 1024);
    expect(statSync(mobileWebp).size).toBeLessThanOrEqual(350 * 1024);
    expect(existsSync(desktopPng)).toBe(true);
    expect(existsSync(mobilePng)).toBe(true);

    expect(html).toContain("<picture");
    expect(html).toContain('media="(min-width: 1024px)"');
    expect(html).toContain("primie-hero-v1.webp");
    expect(html).toContain("primie-hero-mobile-v1.webp");
    expect(html).toContain("<img");
    expect(html).toMatch(/alt=""/);
    expect(html).toContain('aria-hidden="true"');

    expect(source).toContain("getImageProps");
    expect(source).toContain('src: "/images/hero/primie-hero-v1.webp"');
    expect(source).toContain('src: "/images/hero/primie-hero-mobile-v1.webp"');
    expect(source).toContain("width: 1728");
    expect(source).toContain("height: 910");
    expect(source).toContain("width: 1030");
    expect(source).toContain("height: 1527");
    expect(source).toContain("priority: true");
    expect(source).toContain("object-cover");
    expect(source).not.toMatch(/scale-\[/);
    expect(source).not.toContain("images/primie-hero.png");
    expect(source).not.toContain("primie section hero mobile.png");
    expect(source).toContain("siteConfig.brand.slogan");
    expect(source).toContain("heroHighlights");
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\buppercase\b/);
    expect(source).not.toMatch(/\b(useState|useEffect|window|document)\b/);
  });

  it("protège le contraste des quatre valeurs sur mobile sans casser la grille", () => {
    const html = renderToStaticMarkup(<Hero />);
    const source = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");

    expect(html).toContain("grid-cols-2");
    expect(html).toContain("lg:grid-cols-4");
    expect(html).toContain("bg-black/75");
    expect(html).toContain("border-bronze/45");
    expect(html).toContain("rounded-md");
    expect(html).toContain("lg:bg-transparent");
    expect(html).toContain("text-[11px]");
    expect(html).toContain("min-[390px]:text-xs");
    expect(html).toContain("h-11 w-11");
    expect(html).toMatch(/aria-hidden="true"/);

    expect(heroHighlights).toHaveLength(4);
    for (const item of heroHighlights) {
      expect(html).toContain(item.label);
    }

    expect(source).toContain("min-width: 1024px");
    expect(source).toContain("getImageProps");
    expect(source).not.toMatch(/scale-\[/);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain('href="#services"');
  });
});
