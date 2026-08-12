import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { WigSelection } from "./wig-selection";
import { getFeaturedWigs, wigSelectionCopy, wigs } from "@/content/wigs";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const FORBIDDEN_COMMERCIAL = [
  "240 €",
  "260 €",
  "220 €",
  "100 % cheveux humains",
  "100% cheveux humains",
  "Naturel (1B)",
  "qualité premium",
  "aspect naturel",
  "confort optimal",
  "longue durée",
  "livraison rapide",
  "paiement sécurisé",
  "retour facile",
  "PayPal",
  "Mobile Money",
  "Sous 14 jours",
  "2 à 5 jours",
] as const;

describe("WigSelection — WIG-SALES-DESIGN-R1-R2", () => {
  const source = readFileSync(join(process.cwd(), "components/sections/wig-selection.tsx"), "utf8");
  const heroSource = readFileSync(
    join(process.cwd(), "components/wigs/wig-editorial-hero.tsx"),
    "utf8",
  );
  const ctaSource = readFileSync(join(process.cwd(), "components/wigs/wig-global-cta.tsx"), "utf8");
  const trustSource = readFileSync(
    join(process.cwd(), "components/wigs/wig-trust-strip.tsx"),
    "utf8",
  );
  const gridSource = readFileSync(
    join(process.cwd(), "components/wigs/wig-product-grid.tsx"),
    "utf8",
  );
  const cardSource = readFileSync(join(process.cwd(), "components/wigs/wig-card.tsx"), "utf8");
  const bmad = readFileSync(join(process.cwd(), "docs/BMAD-PRIMIE-001.md"), "utf8");

  it("reste un Server Component sans client ni carousel ni second Header", () => {
    for (const file of [source, heroSource, ctaSource, trustSource, gridSource, cardSource]) {
      expect(file).not.toMatch(/["']use client["']/);
      expect(file).not.toMatch(/\b(useState|useEffect|useRef)\b/);
      expect(file).not.toMatch(/carousel|swiper|embla/i);
      expect(file).not.toMatch(/\bHeader\b/);
      expect(file).not.toMatch(/ResponsiveNavigationMenu|BrandLogo/);
    }
  });

  it("conserve WIG-SALES-CONTENT-01 DONE et la gouvernance R1/R1-R1/R1-R2/R1D/R1E", () => {
    expect(bmad).toMatch(/WIG-SALES-CONTENT-01 \(DONE/);
    expect(bmad).toMatch(/WIG-SALES-DESIGN-R1/);
    expect(bmad).toMatch(/WIG-SALES-DESIGN-R1-R1/);
    expect(bmad).toMatch(/WIG-SALES-DESIGN-R1-R2/);
    expect(bmad).toMatch(/WIG-SALES-DESIGN-R1D/);
    expect(bmad).toMatch(/WIG-SALES-DESIGN-R1E/);
    expect(bmad).toMatch(/DONE — Validé CTO 2026-08-11/);
  });

  it("orchestre hero, grille, CTA global et bandeau trust", () => {
    expect(source).toContain("WigEditorialHero");
    expect(source).toContain("WigProductGrid");
    expect(source).toContain("WigGlobalCta");
    expect(source).toContain("WigTrustStrip");
    const html = renderToStaticMarkup(<WigSelection />);
    expect(html).toContain("data-wig-intro");
    expect(html).toContain("data-wig-products");
    expect(html).toContain("data-wig-global-cta");
    expect(html).toContain("data-wig-facts");
  });

  it("expose une section #perruques unique avec titre et accent gold", () => {
    const html = renderToStaticMarkup(<WigSelection />);

    expect(html.match(/id="perruques"/g)).toHaveLength(1);
    expect(html).toContain('aria-labelledby="wig-selection-heading"');
    expect(html).toContain('id="wig-selection-heading"');
    expect(html).toContain(wigSelectionCopy.eyebrowLead);
    expect(html).toContain(wigSelectionCopy.eyebrowBrand);
    expect(html).toContain(wigSelectionCopy.titleLead);
    expect(html).toContain(`>${wigSelectionCopy.titleAccent}<`);
    expect(html).toContain(wigSelectionCopy.description);
    expect(html.match(/<h2\b/g)).toHaveLength(1);
  });

  it("préserve la graphie publique PRiMiE sans uppercase sur la marque", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    expect(html).toContain(">PRiMiE<");
    expect(html).toContain("Sélection PRiMiE");
    expect(html).toContain("PRiMiE Coiffure");
    expect(html).not.toMatch(/>PRIMIE</);
    expect(html).not.toMatch(/>Primie</);
    expect(heroSource).toMatch(/uppercase.*eyebrowLead|eyebrowLead[\s\S]*uppercase/);
    expect(heroSource).not.toMatch(/uppercase[^"]*eyebrowBrand|eyebrowBrand[\s\S]{0,80}uppercase/);
  });

  it("réutilise le portrait perruque-deep-wave cutout et exclut Gallery Hero", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    expect(html).toContain("perruque-deep-wave-portrait.webp");
    expect(html).not.toContain("vente-pose-perruques.webp");
    expect(html).not.toContain("pose-perruque-lace-portrait.webp");
    expect(html).toMatch(/alt=""/);
    expect(html).toContain("data-wig-portrait");
    expect(html).toContain("data-wig-portrait-fog");
    expect(heroSource).toContain("wigDecorativePortrait");
    expect(heroSource).toContain("unoptimized");
    expect(heroSource).toMatch(/mask-image/);
    expect(heroSource).toMatch(/from-white/);
    expect(html).not.toContain("gallery-hero-model-v1.webp");
    expect(html).not.toContain("/images/wigs/gallery-hero");
  });

  it("rend trois cartes ordonnées avec badges et CTA WhatsApp produit", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    const featured = getFeaturedWigs();

    expect(featured).toHaveLength(3);
    expect(html.match(/data-wig-card(?![-\w])/g)).toHaveLength(3);
    expect(html.match(/<h3\b/g)).toHaveLength(3);
    expect(html).toContain(">01<");
    expect(html).toContain(">02<");
    expect(html).toContain(">03<");

    const positions = wigs.map((item) => html.indexOf(item.name));
    expect(positions.every((pos) => pos >= 0)).toBe(true);
    for (let i = 1; i < positions.length; i += 1) {
      expect(positions[i]!).toBeGreaterThan(positions[i - 1]!);
    }

    for (const item of featured) {
      expect(html).toContain(item.shortDescription);
      expect(html).toContain(buildWhatsAppUrl(item.inquiryMessage));
      expect(item.inquiryMessage).toContain(item.name);
    }
    expect(wigSelectionCopy.productCtaLabel).toBe("Demander le tarif sur WhatsApp");
    expect(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).toContain(
      "Demander le tarif sur WhatsApp",
    );
    expect(html.match(/data-wig-cta-label/g)).toHaveLength(3);
  });

  it("affiche les quatre arguments et le bandeau trust factuel exacts", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    expect(html.match(/data-wig-value(?![-\w])/g)).toHaveLength(4);
    expect(html.match(/data-wig-fact(?![-\w])/g)).toHaveLength(4);
    for (const value of wigSelectionCopy.values) {
      expect(html).toContain(value.replaceAll("&", "&amp;"));
    }
    for (const item of wigSelectionCopy.trustItems) {
      expect(html).toContain(item.title);
      expect(html).toContain(item.detail);
    }
  });

  it("structure arguments en 2×2 jusqu’à xl sans truncate ni break-words", () => {
    expect(heroSource).toContain("grid-cols-2");
    expect(heroSource).toContain("xl:grid-cols-4");
    expect(heroSource).not.toContain("sm:grid-cols-4");
    expect(heroSource).not.toContain("min-[390px]:grid-cols-4");
    expect(heroSource).not.toContain("lg:grid-cols-4");
    expect(trustSource).toContain("grid-cols-2");
    expect(heroSource).toContain("min-w-0");
    expect(heroSource).toContain("hyphens-none");
    expect(heroSource).toContain("[word-break:normal]");
    expect(heroSource).not.toContain("break-words");
    expect(heroSource).not.toContain("line-clamp");
    expect(heroSource).not.toContain("truncate");
    expect(trustSource).toContain("hyphens-none");
    expect(trustSource).not.toContain("break-words");
    const valuesBlock = heroSource.slice(heroSource.indexOf("data-wig-values"));
    expect(valuesBlock).not.toMatch(/whitespace-nowrap/);
  });

  it("expose un CTA global WhatsApp générique sans route catalogue", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    const expected = buildWhatsAppUrl(wigSelectionCopy.globalInquiryMessage);
    expect(html).toContain("data-wig-global-cta");
    expect(html).toContain(wigSelectionCopy.globalCtaLabel);
    expect(html).toContain(`href="${expected}"`);
    expect(html).not.toContain('href="/perruques"');
    expect(html).not.toContain("VOIR TOUTES NOS PERRUQUES");
    expect(ctaSource).toContain("buildWhatsAppUrl");
    expect(ctaSource).not.toContain("wa.me/33749616582");
    expect(ctaSource).toContain("min-h-[3.25rem]");
    expect(expected).toMatch(/^https:\/\/wa\.me\/33749616582\?text=/);
    expect(expected).not.toContain("%25");
    expect(wigSelectionCopy.globalInquiryMessage).not.toMatch(/Body Wave|Deep Wave|Lisse/);
  });

  it("structure responsive : 2 cols lg, 3 cols xl, CTA en bas, ratios contenu", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    expect(gridSource).toContain("lg:grid-cols-2");
    expect(gridSource).toContain("xl:grid-cols-3");
    expect(gridSource).not.toContain("lg:grid-cols-3");
    expect(gridSource).not.toMatch(/-mt-/);
    expect(cardSource).toContain("w-[43%]");
    expect(cardSource).toContain("xl:w-[47%]");
    expect(cardSource).toContain("xl:w-[53%]");
    expect(cardSource).toContain("mt-auto");
    expect(cardSource).toContain("text-sm");
    expect(cardSource).not.toMatch(/whitespace-nowrap/);
    expect(cardSource).not.toContain("line-clamp");
    expect(source).toContain("pb-0");
    expect(html).toContain("data-wig-intro");
    expect(existsSync(join(process.cwd(), "public/images/wigs/body-wave.png"))).toBe(false);
  });

  it("laisse GalleryPreview inchangée (pas de refonte WIG→Gallery côté Gallery)", () => {
    const gallerySource = readFileSync(
      join(process.cwd(), "components/sections/gallery-preview.tsx"),
      "utf8",
    );
    expect(gallerySource).toContain('id="galerie"');
    expect(gallerySource).toContain("pt-16");
    expect(gallerySource).toContain("md:pt-24");
  });

  it("rejette prix, engagements fictifs et catalogue inventés", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    const plain = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    for (const forbidden of FORBIDDEN_COMMERCIAL) {
      expect(plain.toLowerCase()).not.toContain(forbidden.toLowerCase());
    }
    expect(plain).not.toMatch(/\d+\s*€/);
    expect(plain).not.toMatch(/14\s*["″]|16\s*["″]|12\s*["″]|26\s*["″]|28\s*["″]/);
    expect(html).not.toContain("/perruques");
    expect(html).not.toMatch(/en stock|disponible immédiatement/i);
  });
});
