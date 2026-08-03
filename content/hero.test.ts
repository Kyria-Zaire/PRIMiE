import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { galleryCopy } from "./gallery";
import { heroAssetsR2, heroCopy, heroValues } from "./hero";
import { siteConfig } from "./site-config";

const PUBLIC_HERO_DIR = join(process.cwd(), "public/images/hero");

function publicPathFromSrc(src: `/${string}`): string {
  return join(process.cwd(), "public", src.slice(1));
}

describe("heroCopy R2", () => {
  it("expose la copy exacte approuvée CTO", () => {
    expect(heroCopy.eyebrow).toBe("Chez PRiMiE Coiffure");
    expect(heroCopy).not.toHaveProperty("title");
    expect(heroCopy).not.toHaveProperty("scriptAccent");
    expect(JSON.stringify(heroCopy)).not.toContain("avec passion");
    expect(JSON.stringify(heroCopy)).not.toContain("La beauté afro");
    expect(JSON.stringify(heroCopy)).not.toContain("sublimée");
    expect(heroCopy.description).toEqual([
      "Coiffure et beauté afro à domicile.",
      "L’excellence au service de votre beauté et de votre confiance.",
    ]);
    expect(heroCopy.primaryCtaLabel).toBe("Réserver sur WhatsApp");
  });

  it("délègue le H1 au slogan canonique siteConfig", () => {
    expect(siteConfig.brand.slogan).toBe("La beauté commence par une belle coiffure.");
    expect(JSON.stringify(heroCopy)).not.toContain(siteConfig.brand.slogan);
  });

  it("n’utilise aucune ancienne graphie PRIMIE", () => {
    const blob = JSON.stringify(heroCopy);
    expect(heroCopy.eyebrow).toBe("Chez PRiMiE Coiffure");
    expect(blob).toContain("PRiMiE");
    expect(blob).not.toMatch(/\bPRIMIE\b/);
    expect(blob).not.toMatch(/\bPrimie\b/);
  });

  it("ne duplique ni URL WhatsApp ni href galerie", () => {
    const blob = JSON.stringify(heroCopy);
    expect(blob).not.toContain("wa.me");
    expect(blob).not.toContain("whatsapp");
    expect(blob).not.toContain("https://");
    expect(blob).not.toContain("#galerie");
    expect(blob).not.toContain("/galerie");
    expect(heroCopy).not.toHaveProperty("whatsappUrl");
    expect(heroCopy).not.toHaveProperty("secondaryCtaHref");
    expect(heroCopy).not.toHaveProperty("secondaryCtaLabel");
  });

  it("reste une donnée pure sans JSX ni fonction", () => {
    expect(Object.keys(heroCopy).sort()).toEqual(["description", "eyebrow", "primaryCtaLabel"]);
    for (const value of Object.values(heroCopy)) {
      expect(typeof value === "function").toBe(false);
    }
    expect(JSON.stringify(heroCopy)).not.toMatch(/<\/?[A-Za-z]/);
  });

  it("n’introduit pas Avis clientes ni Nos réalisations", () => {
    const blob = JSON.stringify({ heroCopy, heroValues });
    expect(blob).not.toMatch(/Avis clientes/i);
    expect(blob).not.toMatch(/Nos réalisations/i);
  });
});

describe("heroValues R2", () => {
  it("expose exactement quatre valeurs dans l’ordre CTO", () => {
    expect(heroValues).toHaveLength(4);
    expect(heroValues.map((item) => item.id)).toEqual([
      "home",
      "excellence",
      "passion",
      "listening",
    ]);
    expect(heroValues.map((item) => [item.title, item.description])).toEqual([
      ["À DOMICILE", "Confort & discrétion"],
      ["EXCELLENCE", "Qualité professionnelle"],
      ["PASSION", "L’art de vous sublimer"],
      ["À VOTRE ÉCOUTE", "Conseils personnalisés"],
    ]);
  });

  it("garantit des identifiants uniques", () => {
    const ids = heroValues.map((item) => item.id);
    expect(new Set(ids).size).toBe(4);
  });

  it("ne formule aucune garantie contractuelle", () => {
    const blob = JSON.stringify(heroValues).toLowerCase();
    expect(blob).not.toMatch(/garanti|garantie|rembours|contrat|obligation/);
  });

  it("reste sans JSX ni pictogramme embarqué", () => {
    for (const value of heroValues) {
      expect(Object.keys(value).sort()).toEqual(["description", "id", "title"]);
      expect(value).not.toHaveProperty("icon");
      expect(value).not.toHaveProperty("svg");
    }
    expect(JSON.stringify(heroValues)).not.toMatch(/<\/?[A-Za-z]|function\s/);
  });
});

describe("réutilisation Gallery / WhatsApp / slogan Footer", () => {
  it("conserve le libellé galerie canonique hors content/hero.ts", () => {
    expect(galleryCopy.landing.ctaLabel).toBe("Découvrir la galerie");
    expect(JSON.stringify(heroCopy)).not.toContain("Découvrir la galerie");
  });

  it("laisse le slogan Footer inchangé dans siteConfig et hors heroCopy", () => {
    expect(siteConfig.brand.slogan).toBe("La beauté commence par une belle coiffure.");
    expect(JSON.stringify(heroCopy)).not.toContain(siteConfig.brand.slogan);
    expect(JSON.stringify(heroCopy)).not.toContain("avec passion");
  });
});

describe("heroAssetsR2", () => {
  it("expose les chemins publics exacts sans PNG", () => {
    expect(heroAssetsR2.desktop.src).toBe("/images/hero/primie-hero-r2-desktop.webp");
    expect(heroAssetsR2.mobile.src).toBe("/images/hero/primie-hero-r2-mobile.webp");
  });

  it("vérifie existence, format, dimensions et budgets WebP", async () => {
    const sharp = (await import("sharp")).default;

    for (const asset of [heroAssetsR2.desktop, heroAssetsR2.mobile]) {
      const absolute = publicPathFromSrc(asset.src);
      expect(existsSync(absolute)).toBe(true);
      const bytes = statSync(absolute).size;
      expect(bytes).toBeLessThanOrEqual(asset.maxBytes);
      expect(bytes).toBeGreaterThan(0);

      const buf = readFileSync(absolute);
      expect(buf.subarray(0, 4).toString("ascii")).toBe("RIFF");
      expect(buf.subarray(8, 12).toString("ascii")).toBe("WEBP");

      const meta = await sharp(buf).metadata();
      expect(meta.format).toBe("webp");
      expect(meta.width).toBe(asset.width);
      expect(meta.height).toBe(asset.height);
      expect(meta.hasAlpha).toBe(false);
      expect(meta.channels).toBe(3);
    }
  });

  it("conserve les Hero V1 sur disque et n’ajoute aucun PNG sous public/images/hero", () => {
    expect(existsSync(join(PUBLIC_HERO_DIR, "primie-hero-v1.webp"))).toBe(true);
    expect(existsSync(join(PUBLIC_HERO_DIR, "primie-hero-mobile-v1.webp"))).toBe(true);
    expect(existsSync(join(PUBLIC_HERO_DIR, "primie-hero-r2-desktop.webp"))).toBe(true);
    expect(existsSync(join(PUBLIC_HERO_DIR, "primie-hero-r2-mobile.webp"))).toBe(true);

    const pngs = readdirSync(PUBLIC_HERO_DIR).filter((name) => /\.png$/i.test(name));
    expect(pngs).toEqual([]);
  });

  it("confirme des sources desktop/mobile distinctes et des fichiers non identiques", () => {
    const desktop = readFileSync(publicPathFromSrc(heroAssetsR2.desktop.src));
    const mobile = readFileSync(publicPathFromSrc(heroAssetsR2.mobile.src));
    const desktopSha = createHash("sha256").update(desktop).digest("hex");
    const mobileSha = createHash("sha256").update(mobile).digest("hex");
    expect(desktopSha).not.toBe(mobileSha);
    expect(desktop.equals(mobile)).toBe(false);
    expect(heroAssetsR2.desktop.width).not.toBe(heroAssetsR2.mobile.width);
    expect(heroAssetsR2.desktop.height).not.toBe(heroAssetsR2.mobile.height);
  });

  it("branche le Hero runtime sur content/hero, siteConfig.slogan et les WebP R2 uniquement", () => {
    const heroSource = readFileSync(join(process.cwd(), "components/sections/hero.tsx"), "utf8");
    expect(heroSource).toContain("@/content/hero");
    expect(heroSource).toContain("heroCopy");
    expect(heroSource).toContain("heroValues");
    expect(heroSource).toContain("heroAssetsR2");
    expect(heroSource).toContain("heroAssetsR2.desktop");
    expect(heroSource).toContain("heroAssetsR2.mobile");
    expect(heroSource).toContain("siteConfig.brand.slogan");
    expect(heroSource).not.toContain("avec passion");
    expect(heroSource).not.toContain("scriptAccent");
    expect(heroSource).not.toContain("primie-hero-v1");
    expect(heroSource).not.toContain("hero-highlights");
    expect(heroSource).not.toContain("heroHighlights");
    expect(heroSource).not.toMatch(/images\/Hero\/hero-(desktop|mobile)\.png/);
  });
});
