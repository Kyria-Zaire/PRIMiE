import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { advice, adviceCopy, adviceDecorativePortrait } from "../content/advice";

const MAX_WEBP_BYTES = 180 * 1024;
const MAX_PORTRAIT_BYTES = 150 * 1024;
const PUBLIC_ADVICE = join(process.cwd(), "public/images/advice");
const PORTRAIT_WEBP = join(PUBLIC_ADVICE, "advice-portrait-bantu-knots-v1.webp");
const SOURCE_PNG = join(process.cwd(), "images/gallery/bantu-knots.png");

const EXPECTED = [
  {
    id: "preparation-cheveux",
    number: "01",
    category: "Préparation",
    title: "Préparer ses cheveux avant une prestation",
    src: "/images/advice/preparation-cheveux.webp",
    width: 1535,
    height: 1024,
  },
  {
    id: "entretien-tresses",
    number: "02",
    category: "Tresses",
    title: "Entretenir ses tresses",
    src: "/images/advice/entretien-tresses.webp",
    width: 1536,
    height: 1024,
  },
  {
    id: "soin-perruque",
    number: "03",
    category: "Perruques",
    title: "Prendre soin d’une perruque",
    src: "/images/advice/soin-perruque.webp",
    width: 1536,
    height: 1024,
  },
] as const;

describe("advice content — CONSEILS-PREVIEW-01B", () => {
  it("expose exactement trois conseils ordonnés 01–03", () => {
    expect(advice).toHaveLength(3);
    expect(advice.map((item) => item.number)).toEqual(["01", "02", "03"]);
    expect(advice.map((item) => item.id)).toEqual(EXPECTED.map((item) => item.id));
    expect(new Set(advice.map((item) => item.id)).size).toBe(3);
    expect(new Set(advice.map((item) => item.number)).size).toBe(3);
  });

  it("fixe titres, catégories et résumés exacts", () => {
    for (let i = 0; i < EXPECTED.length; i += 1) {
      expect(advice[i]?.category).toBe(EXPECTED[i]?.category);
      expect(advice[i]?.title).toBe(EXPECTED[i]?.title);
      expect(advice[i]?.summary.length).toBeGreaterThan(20);
    }
  });

  it("marque les trois items en preview_only sans href ni route", () => {
    for (const item of advice) {
      expect(item.publicationStatus).toBe("preview_only");
      expect(item).not.toHaveProperty("href");
      expect(item).not.toHaveProperty("url");
      expect(item).not.toHaveProperty("articleUrl");
      expect(item).not.toHaveProperty("slug");
    }

    const blob = JSON.stringify({ advice, adviceCopy, adviceDecorativePortrait });
    expect(blob).not.toContain("/conseils");
    expect(blob).not.toContain("href");
    expect(blob).not.toMatch(/\/conseils\/\[/);
  });

  it("qualifie les images comme illustrations project_approved", () => {
    for (const item of advice) {
      expect(item.image.kind).toBe("illustration");
      expect(item.image.rightsStatus).toBe("project_approved");
      expect(item.image.alt.trim().length).toBeGreaterThan(0);
    }
    const alts = advice.map((item) => item.image.alt);
    expect(new Set(alts).size).toBe(3);
  });

  it("pointe uniquement vers des WebP locaux sous budget 180 Ko", () => {
    expect(existsSync(PUBLIC_ADVICE)).toBe(true);
    const publicFiles = readdirSync(PUBLIC_ADVICE);
    expect(publicFiles.every((name) => name.endsWith(".webp"))).toBe(true);
    expect(publicFiles.some((name) => name.endsWith(".png"))).toBe(false);
    expect(publicFiles.sort()).toEqual(
      [
        "advice-portrait-bantu-knots-v1.webp",
        "entretien-tresses.webp",
        "preparation-cheveux.webp",
        "soin-perruque.webp",
      ].sort(),
    );

    for (let i = 0; i < EXPECTED.length; i += 1) {
      const item = advice[i];
      const expected = EXPECTED[i];
      expect(item?.image.src).toBe(expected?.src);
      expect(item?.image.src.endsWith(".webp")).toBe(true);
      expect(item?.image.src).not.toMatch(/\.png$/i);
      expect(item?.image.width).toBe(expected?.width);
      expect(item?.image.height).toBe(expected?.height);

      const absolute = join(process.cwd(), "public", item!.image.src.replace(/^\//, ""));
      expect(existsSync(absolute)).toBe(true);
      expect(statSync(absolute).size).toBeGreaterThan(0);
      expect(statSync(absolute).size).toBeLessThanOrEqual(MAX_WEBP_BYTES);
    }

    const card3 = advice.find((item) => item.id === "soin-perruque");
    expect(card3?.image.src).toBe("/images/advice/soin-perruque.webp");
    expect(card3?.image.alt).toBe("Perruque ondulée présentée avec des accessoires de soin");
    expect(JSON.stringify(advice)).not.toContain("/images/gallery/perruque-deep-wave.webp");
    expect(existsSync(join(PUBLIC_ADVICE, "soin-perruque.webp"))).toBe(true);
    expect(card3?.image.alt).not.toMatch(
      /produits? PRiMiE|gamme PRiMiE|coffret PRiMiE|disponible à la vente/i,
    );
  });

  it("n’importe aucun PNG ni wording interdit dans la source", () => {
    const source = readFileSync(join(process.cwd(), "content/advice.ts"), "utf8");
    expect(source).not.toMatch(/images\/conseil\/carte-\d+\.png/);
    expect(source).not.toMatch(/from ["'].*\.png["']/);
    expect(source).not.toMatch(/secrets d['’]experte/i);
    expect(source).not.toMatch(/résultats? garantis?/i);
    expect(source).not.toMatch(/conseils professionnels garantis/i);
    expect(source).not.toMatch(/produits? PRiMiE/i);
    expect(source).not.toMatch(/produits? recommandés? par Prisca/i);
    expect(source).not.toMatch(/réalisation de Prisca/i);
    expect(source).not.toContain('"use client"');
    expect(source).not.toContain("react");
    expect(source).not.toContain("next/");
  });

  it("centralise la copy éditoriale future sans CTA routable", () => {
    expect(adviceCopy.eyebrowLead).toBe("Le carnet de conseils");
    expect(adviceCopy.eyebrowBrand).toBe("PRiMiE");
    expect(`${adviceCopy.eyebrowLead} ${adviceCopy.eyebrowBrand}`).toBe(
      "Le carnet de conseils PRiMiE",
    );
    expect(adviceCopy.titleLead).toBe("Nos conseils");
    expect(adviceCopy.titleAccent).toBe("pour sublimer");
    expect(adviceCopy.titleEnd).toBe("vos cheveux au quotidien");
    expect(adviceCopy.description).toContain("Astuces et bonnes pratiques");
    expect(adviceCopy.description).not.toMatch(/secrets d['’]experte/i);
    expect(adviceCopy.ctaLabel).toBe("Découvrir tous nos conseils");
    expect(adviceCopy).not.toHaveProperty("ctaHref");
    expect(adviceCopy).not.toHaveProperty("href");
  });

  it("fixe le portrait intro officiel Bantu Knots en WebP dédié", () => {
    expect(adviceDecorativePortrait.id).toBe("bantu-knots");
    expect(adviceDecorativePortrait.src).toBe("/images/advice/advice-portrait-bantu-knots-v1.webp");
    expect(adviceDecorativePortrait.width).toBe(447);
    expect(adviceDecorativePortrait.height).toBe(558);
    expect(adviceDecorativePortrait.role).toBe("section_intro_decorative");
    expect(adviceDecorativePortrait.src).not.toContain("entretien-tresses");
    expect(adviceDecorativePortrait.src).not.toMatch(/\.png$/i);

    expect(existsSync(SOURCE_PNG)).toBe(true);
    expect(existsSync(PORTRAIT_WEBP)).toBe(true);
    expect(existsSync(join(process.cwd(), "public/images/gallery/bantu-knots.png"))).toBe(false);
    expect(statSync(PORTRAIT_WEBP).size).toBeGreaterThan(0);
    expect(statSync(PORTRAIT_WEBP).size).toBeLessThanOrEqual(MAX_PORTRAIT_BYTES);

    const card2 = advice.find((item) => item.id === "entretien-tresses");
    expect(card2?.image.src).toBe("/images/advice/entretien-tresses.webp");
  });

  it("ne mute pas siteConfig, services, gallery ou faq", () => {
    const site = readFileSync(join(process.cwd(), "content/site-config.ts"), "utf8");
    const services = readFileSync(join(process.cwd(), "content/services.ts"), "utf8");
    const gallery = readFileSync(join(process.cwd(), "content/gallery.ts"), "utf8");
    const faq = readFileSync(join(process.cwd(), "content/faq.ts"), "utf8");
    expect(site).not.toContain("advice");
    expect(services).not.toContain("advice");
    expect(gallery).not.toContain("advice");
    expect(faq).not.toContain("advice");
  });

  it("n’introduit aucune route page Conseils (aperçu UI réservé à 01C)", () => {
    expect(existsSync(join(process.cwd(), "app/conseils"))).toBe(false);
    expect(existsSync(join(process.cwd(), "app/conseils/page.tsx"))).toBe(false);
    const page = readFileSync(join(process.cwd(), "app/page.tsx"), "utf8");
    expect(page).not.toMatch(/href=["']\/conseils["']/);
    expect(page).not.toContain('href="/conseils"');
  });
});
