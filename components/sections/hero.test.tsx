import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { galleryCopy } from "@/content/gallery";
import { heroAssetsR2, heroCopy, heroValues } from "@/content/hero";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Hero } from "./hero";

describe("Hero R2", () => {
  it("rend la section #accueil avec slogan H1, un seul H1 et deux CTA", () => {
    const html = renderToStaticMarkup(<Hero />);
    const expectedWhatsApp = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

    expect(html).toContain('id="accueil"');
    expect(html).toContain("bg-hero");
    expect(html).toContain(heroCopy.eyebrow);
    expect(html.replace(/<br\s*\/?>/g, " ")).toContain(siteConfig.brand.slogan);
    expect(html).toContain("La beauté commence");
    expect(html).toContain("par une belle coiffure.");
    expect(html).toContain('id="hero-heading"');
    expect(html).toContain("data-hero-slogan");
    expect(html).toContain("<br/>");
    expect(html).not.toContain("La beauté afro,");
    expect(html).not.toContain("sublimée");
    expect(html).not.toContain("avec passion");
    expect(html).not.toContain("fill-gold/80");
    expect(html).toMatch(/data-hero-slogan[^>]*text-on-dark/);
    expect(html).not.toMatch(/data-hero-slogan[^>]*text-gold/);
    for (const line of heroCopy.description) {
      expect(html).toContain(line);
    }
    expect(html).toContain(heroCopy.primaryCtaLabel);
    expect(html).toContain(`href="${expectedWhatsApp}"`);
    expect(html).toContain("?text=");
    expect(html).toContain(galleryCopy.landing.ctaLabel);
    expect(html).toContain('href="#galerie"');
    expect(html).toContain("font-script");
    expect(html).toContain("text-gold");
    expect(html).not.toContain("font-display");
    expect(html).toContain("data-hero-eyebrow");
    expect(html).toContain("clamp(1.875rem,9vw,2.125rem)");
    expect(html).toContain("md:text-[clamp(1.75rem,5.2vw,3.35rem)]");
    expect(html).toContain("md:leading-snug");
    expect(html).toContain("leading-[1.12]");
    expect(html).toContain("flex-1 flex-col justify-center");
    expect(html).toContain("lg:justify-start");
    expect(html).toContain("data-hero-editorial");
    expect(html).toContain("items-center");
    expect(html).toContain("text-center");
    expect(html).toContain("lg:items-start");
    expect(html).toContain("lg:text-left");
    expect(html).toContain("pt-28");
    expect(html).toContain("sm:pt-32");
    expect(html).toContain("lg:pt-36");
    expect(html).toContain("xl:pt-40");
    expect(html).not.toContain("pt-20");
    expect(html).not.toContain("lg:pt-28");
    expect(html).toContain("min-h-14");
    expect(html).toContain("sm:min-h-12");
    expect(html).toContain("flex-col gap-3");
    expect(html).toContain("sm:flex-row");

    for (const item of heroValues) {
      expect(html).toContain(item.title);
      expect(html).toContain(item.description.replaceAll("&", "&amp;"));
    }

    // Valeurs présentes dans le DOM unique, masquées sous lg via hidden lg:grid
    expect(html).toContain("hidden");
    expect(html).toContain("lg:grid");
    expect(html).toContain('aria-label="Valeurs PRiMiE"');
    expect(html).not.toContain("Site en préparation.");
    expect(html).not.toContain("Découvrir nos services");
    expect(html).not.toContain('href="#services"');
    expect(html).not.toContain("PROFESSIONNELLE");
    expect(html).not.toContain("SOIGNÉE");
    expect(html).not.toContain("TENDANCE");
    expect(html).not.toContain("Nos réalisations");
    expect(html).not.toContain("PRIMiE");
    expect(html).not.toContain("Primie");
    expect(html).not.toContain("uppercase");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
  });

  it("applique l’art direction R2 mobile/desktop sans importer les PNG ni les V1", () => {
    const html = renderToStaticMarkup(<Hero />);
    const source = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");
    const desktopWebp = join(process.cwd(), "public", heroAssetsR2.desktop.src.slice(1));
    const mobileWebp = join(process.cwd(), "public", heroAssetsR2.mobile.src.slice(1));
    const desktopPng = join(process.cwd(), "images/Hero/hero-desktop.png");
    const mobilePng = join(process.cwd(), "images/Hero/hero-mobile.png");

    expect(existsSync(desktopWebp)).toBe(true);
    expect(existsSync(mobileWebp)).toBe(true);
    expect(statSync(desktopWebp).size).toBeLessThanOrEqual(heroAssetsR2.desktop.maxBytes);
    expect(statSync(mobileWebp).size).toBeLessThanOrEqual(heroAssetsR2.mobile.maxBytes);
    expect(existsSync(desktopPng)).toBe(true);
    expect(existsSync(mobilePng)).toBe(true);

    expect(html).toContain("<picture");
    expect(html).toContain('media="(min-width: 1024px)"');
    expect(html).toContain("primie-hero-r2-desktop.webp");
    expect(html).toContain("primie-hero-r2-mobile.webp");
    expect(html).not.toContain("primie-hero-v1.webp");
    expect(html).not.toContain("primie-hero-mobile-v1.webp");
    expect(html).toContain("<img");
    expect(html).toMatch(/alt=""/);
    expect(html).toContain('aria-hidden="true"');

    expect(source).toContain("getImageProps");
    expect(source).toContain("heroAssetsR2");
    expect(source).toContain("heroCopy");
    expect(source).toContain("heroValues");
    expect(source).toContain("galleryCopy.landing.ctaLabel");
    expect(source).toContain("siteConfig.brand.slogan");
    expect(source).toContain("priority: true");
    expect(source).toContain("object-cover");
    expect(source).not.toMatch(/scale-\[/);
    expect(source).not.toContain("images/Hero/hero-desktop.png");
    expect(source).not.toContain("images/Hero/hero-mobile.png");
    expect(source).not.toContain("primie-hero-v1");
    expect(source).not.toContain("hero-highlights");
    expect(source).not.toContain("heroHighlights");
    expect(source).not.toContain("heroCopy.title");
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\buppercase\b/);
    expect(source).not.toMatch(/\b(useState|useEffect|window|document)\b/);
  });

  it("masque les valeurs sous 1024 px et conserve le bandeau desktop gelé", () => {
    const html = renderToStaticMarkup(<Hero />);
    const source = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");

    expect(html).toContain("grid-cols-2");
    expect(html).toContain("min-[390px]:grid-cols-4");
    expect(html).toContain("hidden");
    expect(html).toContain("lg:grid");
    expect(html).toContain("lg:absolute lg:inset-x-0 lg:bottom-0");
    expect(html).toContain("border-gold/70");
    expect(html).toContain("h-10 w-10");
    expect(html).toContain("min-[390px]:h-11");
    expect(html).toMatch(/aria-hidden="true"/);
    expect(html).toContain('aria-label="Valeurs PRiMiE"');
    // Une seule liste de valeurs (pas de duplication mobile/desktop)
    expect(html.match(/aria-label="Valeurs PRiMiE"/g)).toHaveLength(1);

    expect(heroValues).toHaveLength(4);
    for (const item of heroValues) {
      expect(html).toContain(item.title);
      expect(html).toContain(item.description.replaceAll("&", "&amp;"));
    }

    expect(source).toContain("min-width: 1024px");
    expect(source).toContain("getImageProps");
    expect(source).toContain("min-[390px]:grid-cols-4");
    expect(source).toContain("hidden");
    expect(source).toContain("lg:grid");
    expect(source).not.toContain("min-[400px]:grid-cols");
    expect(source).not.toContain("min-[430px]:grid-cols");
    expect(source).not.toMatch(/scale-\[/);
    expect(source).toContain("object-[70%_center]");
    expect(source).toContain("min-[390px]:object-[66%_center]");
    expect(source).toContain("md:object-[62%_center]");
    expect(source).toContain("lg:object-[78%_center]");
    expect(source).toContain("xl:object-[82%_center]");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain(heroCopy.primaryCtaLabel);
    expect(html).toContain('href="#galerie"');
    expect(html).not.toContain("primie-hero-v1");
  });

  it("préserve les classes desktop gelées et reste un Server Component", () => {
    const source = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");
    expect(source).toContain("lg:pt-36");
    expect(source).toContain("xl:pt-40");
    expect(source).toContain("lg:object-[78%_center]");
    expect(source).toContain("xl:object-[82%_center]");
    expect(source).toContain("lg:absolute lg:inset-x-0 lg:bottom-0");
    expect(source).toContain("lg:items-start");
    expect(source).toContain("lg:text-left");
    expect(source).toContain("lg:justify-start");
    expect(source).toContain("lg:grid");
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|window|document)\b/);
    expect(source).not.toContain("hero-highlights");
    expect(source).not.toContain(".png");
  });

  it("centre le bloc éditorial mobile sans modifier le texte canonique", () => {
    const html = renderToStaticMarkup(<Hero />);
    const source = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");

    expect(html).toContain("data-hero-editorial");
    expect(source).toContain("items-center");
    expect(source).toContain("text-center");
    expect(source).toContain("mx-auto");
    expect(source).toContain("lg:items-start");
    expect(source).toContain("lg:text-left");
    expect(html).toContain("<br/>");
    expect(html).toContain("La beauté commence");
    expect(html).toContain("par une belle coiffure.");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html.replace(/<br\s*\/?>/g, " ")).toContain(siteConfig.brand.slogan);
  });

  it("utilise le slogan canonique comme unique H1 sans ancien titre", () => {
    const html = renderToStaticMarkup(<Hero />);
    const source = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");

    expect(siteConfig.brand.slogan).toBe("La beauté commence par une belle coiffure.");
    expect(html.replace(/<br\s*\/?>/g, " ")).toContain(siteConfig.brand.slogan);
    expect(source).toContain("siteConfig.brand.slogan");
    expect(source).not.toContain("avec passion");
    expect(source).not.toContain("scriptAccent");
    expect(source).not.toContain("La beauté afro");
    expect(source).not.toContain("heroCopy.title");
    expect(html).not.toContain("avec passion");
    expect(html).not.toContain("La beauté afro,");
    expect(html).not.toContain("sublimée");
    expect(html).toContain('id="hero-heading"');
    expect(html).toContain("data-hero-slogan");
    expect(html).toContain("<br/>");
    expect(html).toContain("font-script");
    expect(html).toMatch(/data-hero-slogan[^>]*text-on-dark/);
    expect(html).not.toMatch(/data-hero-slogan[^>]*text-gold/);
    expect(html).toContain("clamp(1.875rem,9vw,2.125rem)");
    expect(html).toContain("md:text-[clamp(1.75rem,5.2vw,3.35rem)]");
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain(heroCopy.primaryCtaLabel);
    expect(html).toContain(galleryCopy.landing.ctaLabel);
    expect(heroValues).toHaveLength(4);
    expect(html).not.toContain("primie-hero-v1");
    expect(html).not.toContain("Site en préparation.");
  });
});
