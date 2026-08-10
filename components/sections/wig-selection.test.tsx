import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { WigSelection } from "./wig-selection";
import { getFeaturedWigs, wigSelectionCopy, wigs } from "@/content/wigs";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("WigSelection", () => {
  const source = readFileSync(join(process.cwd(), "components/sections/wig-selection.tsx"), "utf8");

  it("reste un Server Component sans client ni carousel", () => {
    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef)\b/);
    expect(source).not.toMatch(/carousel|swiper|embla/i);
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
    expect(source).toMatch(/uppercase.*eyebrowLead|eyebrowLead[\s\S]*uppercase/);
    expect(source).not.toMatch(/uppercase[^"]*eyebrowBrand|eyebrowBrand[\s\S]{0,80}uppercase/);
  });

  it("réutilise le portrait vente-pose-perruques et exclut Gallery Hero", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    expect(html).toContain("vente-pose-perruques.webp");
    expect(html).toMatch(/alt=""/);
    expect(html).toContain("data-wig-portrait");
    expect(source).toContain("wigDecorativePortrait");
    expect(html).not.toContain("gallery-hero-model-v1.webp");
    expect(html).not.toContain("/images/wigs/gallery-hero");
  });

  it("rend trois cartes ordonnées avec badges et CTA WhatsApp", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    const featured = getFeaturedWigs();

    expect(featured).toHaveLength(3);
    expect(html.match(/<article\b/g)).toHaveLength(3);
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
    }
    expect(wigSelectionCopy.productCtaLabel).toBe("Demander le tarif sur WhatsApp");
    expect(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).toContain(
      "Demander le tarif sur WhatsApp",
    );
    expect(html.match(/data-wig-cta-label/g)).toHaveLength(3);
  });

  it("affiche les quatre valeurs et n’expose plus le bandeau de faits", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    for (const value of wigSelectionCopy.values) {
      expect(html).toContain(value.replaceAll("&", "&amp;"));
    }
    expect(html).toContain("data-wig-values");
    expect(html).not.toContain("data-wig-facts");
    expect(html).not.toContain("Confirmation par Prisca");
  });

  it("structure intro texte|portrait, grille 3 cols et valeurs densifiées", () => {
    const html = renderToStaticMarkup(<WigSelection />);

    expect(html).toContain("data-wig-intro");
    expect(html).toContain("data-wig-intro-copy");
    expect(html).toContain("data-wig-portrait");
    expect(html).toContain("data-wig-products");
    expect(html).toMatch(/absolute[^"]*right-0/);
    expect(html).toContain("lg:grid-cols-3");
    expect(html).toContain("min-[390px]:grid-cols-4");
    expect(html).not.toContain("data-wig-facts");
    expect(source).toContain("data-wig-intro");
    expect(source).toContain("lg:grid-cols-3");
  });

  it("rejette catalogue, prix et claims inventés", () => {
    const html = renderToStaticMarkup(<WigSelection />);
    expect(html).not.toContain("VOIR TOUTES NOS PERRUQUES");
    expect(html).not.toContain('href="/perruques"');
    expect(html).not.toContain("/perruques");
    expect(html).not.toContain("240 €");
    expect(html).not.toContain("260 €");
    expect(html).not.toContain("220 €");
    expect(html).not.toMatch(/\d+\s*€/);
    expect(html).not.toMatch(/qualité premium|confort optimal|longue durée/i);
    expect(html).not.toMatch(/livraison rapide|paiement sécurisé|retour facile/i);
    expect(html).not.toMatch(/en stock|100\s*%\s*cheveux humains|Naturel \(1B\)/i);
    expect(html).not.toMatch(/Aspect naturel/i);
  });
});
