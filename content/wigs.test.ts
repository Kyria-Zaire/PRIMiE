import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  getFeaturedWigs,
  wigCollectionSources,
  wigDecorativePortrait,
  wigSelectionCopy,
  wigs,
} from "./wigs";

const MAX_WEBP_BYTES = 180 * 1024;
const PUBLIC_WIGS = join(process.cwd(), "public/images/wigs");
const PORTRAIT = join(process.cwd(), "public/images/services/vente-pose-perruques.webp");

describe("wigs content — WIG-SALES-CONTENT-01B", () => {
  it("expose exactement trois produits ordonnés Body Wave → Deep Wave → Lisse", () => {
    expect(wigs).toHaveLength(3);
    expect(wigs.map((item) => item.id)).toEqual(["body-wave", "deep-wave", "lisse"]);
    expect(wigs.map((item) => item.name)).toEqual([
      "Perruque Body Wave",
      "Perruque Deep Wave",
      "Perruque Lisse",
    ]);
    expect(new Set(wigs.map((item) => item.id)).size).toBe(3);
    expect(new Set(wigs.map((item) => item.name)).size).toBe(3);
    expect(new Set(wigs.map((item) => item.image.src)).size).toBe(3);
  });

  it("pointe vers des WebP locaux 1122×1402 sous budget 180 Ko sans PNG runtime", () => {
    expect(existsSync(PUBLIC_WIGS)).toBe(true);
    const publicFiles = readdirSync(PUBLIC_WIGS);
    expect(publicFiles.every((name) => name.endsWith(".webp"))).toBe(true);
    expect(publicFiles.some((name) => name.endsWith(".png"))).toBe(false);
    expect(publicFiles.sort()).toEqual(["body-wave.webp", "deep-wave.webp", "lisse.webp"].sort());

    for (const item of wigs) {
      expect(item.image.src.endsWith(".webp")).toBe(true);
      expect(item.image.src).not.toMatch(/\.png$/i);
      expect(item.image.width).toBe(1122);
      expect(item.image.height).toBe(1402);
      const absolute = join(process.cwd(), "public", item.image.src.replace(/^\//, ""));
      expect(existsSync(absolute)).toBe(true);
      expect(statSync(absolute).size).toBeGreaterThan(0);
      expect(statSync(absolute).size).toBeLessThanOrEqual(MAX_WEBP_BYTES);
    }
  });

  it("ne publie via getFeaturedWigs que des produits confirmed featured complets", () => {
    const featured = getFeaturedWigs();
    expect(featured).toHaveLength(3);
    for (const item of featured) {
      expect(item.status).toBe("confirmed");
      expect(item.featured).toBe(true);
      expect(item.shortDescription.length).toBeGreaterThan(10);
      expect(item.inquiryMessage).toContain(item.name);
    }
  });

  it("fixe les familles Vietnam / Inde (origin) et Gamme classique (range)", () => {
    expect(wigCollectionSources).toHaveLength(3);
    const origins = wigCollectionSources.filter((item) => item.kind === "origin");
    const ranges = wigCollectionSources.filter((item) => item.kind === "range");
    expect(origins.map((item) => item.id)).toEqual(["vietnam", "india"]);
    expect(origins.map((item) => item.label)).toEqual(["Vietnam", "Inde"]);
    expect(ranges).toHaveLength(1);
    expect(ranges[0]).toEqual({
      id: "classic",
      kind: "range",
      label: "Gamme classique",
    });

    const blob = JSON.stringify(wigs);
    expect(blob).not.toContain('"vietnam"');
    expect(blob).not.toContain('"india"');
    expect(blob).not.toContain('"classic"');
    expect(blob).not.toContain("origin");
    expect(wigs.every((item) => !("collectionSourceId" in item))).toBe(true);
    expect(wigs.every((item) => !("origin" in item))).toBe(true);
  });

  it("centralise la copy CTO sans claims inventés ni catalogue", () => {
    expect(wigSelectionCopy.eyebrowLead).toBe("LA SÉLECTION");
    expect(wigSelectionCopy.eyebrowBrand).toBe("PRiMiE");
    expect(`${wigSelectionCopy.eyebrowLead} ${wigSelectionCopy.eyebrowBrand}`).toBe(
      "LA SÉLECTION PRiMiE",
    );
    expect(wigSelectionCopy.titleLead).toBe("Découvrez nos");
    expect(wigSelectionCopy.titleAccent).toBe("perruques");
    expect(wigSelectionCopy.description).toContain("Vietnam");
    expect(wigSelectionCopy.description).toContain("Inde");
    expect(wigSelectionCopy.description).toMatch(/classiques/i);
    expect(wigSelectionCopy.description).toContain("PRiMiE");
    expect(wigSelectionCopy.values).toEqual([
      "Sélection PRiMiE",
      "Vietnam & Inde",
      "Gamme classique",
      "Conseils personnalisés",
    ]);
    expect(wigSelectionCopy.trustItems).toEqual([
      "Vente et pose",
      "Demande sur WhatsApp",
      "Confirmation par Prisca",
      "Conseils personnalisés",
    ]);
    expect(wigSelectionCopy.productCtaLabel).toBe("Demander le tarif sur WhatsApp");
    expect(wigSelectionCopy).not.toHaveProperty("catalogHref");
    expect(wigSelectionCopy).not.toHaveProperty("ctaHref");
  });

  it("prépare des messages WhatsApp purs sans URL ni prix", () => {
    for (const item of wigs) {
      expect(item.inquiryMessage).toContain(item.name);
      expect(item.inquiryMessage).toMatch(/informations/i);
      expect(item.inquiryMessage).toMatch(/tarif/i);
      expect(item.inquiryMessage).not.toMatch(/wa\.me/i);
      expect(item.inquiryMessage).not.toMatch(/https?:\/\//i);
      expect(item.inquiryMessage).not.toMatch(/\d+\s*€/);
      expect(item.inquiryMessage).not.toMatch(/en stock|disponible immédiatement/i);
    }
  });

  it("réutilise le portrait vente-pose-perruques sans copie sous /images/wigs/", () => {
    expect(wigDecorativePortrait.src).toBe("/images/services/vente-pose-perruques.webp");
    expect(wigDecorativePortrait.reuseDecision).toBe("APPROVED_REUSE");
    expect(existsSync(PORTRAIT)).toBe(true);
    expect(existsSync(join(PUBLIC_WIGS, "vente-pose-perruques.webp"))).toBe(false);
  });

  it("interdit les formulations commerciales non confirmées dans le runtime", () => {
    const blob = JSON.stringify({
      wigs,
      wigSelectionCopy,
      wigCollectionSources,
      wigDecorativePortrait,
    });
    expect(blob).not.toMatch(/Naturel/i);
    expect(blob).not.toMatch(/100\s*%\s*cheveux humains/i);
    expect(blob).not.toMatch(/cheveux naturels/i);
    expect(blob).not.toMatch(/synthétique/i);
    expect(blob).not.toContain("240 €");
    expect(blob).not.toContain("260 €");
    expect(blob).not.toContain("220 €");
    expect(blob).not.toMatch(/À partir de/i);
    expect(blob).not.toMatch(/\d+\s*["″]/);
    expect(blob).not.toMatch(/Naturel\s*\(1B\)/i);
    expect(blob).not.toMatch(/qualité premium/i);
    expect(blob).not.toMatch(/confort optimal/i);
    expect(blob).not.toMatch(/longue durée/i);
    expect(blob).not.toMatch(/livraison rapide/i);
    expect(blob).not.toMatch(/paiement sécurisé/i);
    expect(blob).not.toMatch(/retour facile/i);
    expect(blob).not.toMatch(/en stock/i);
    expect(blob).not.toMatch(/disponible immédiatement/i);
    expect(blob).not.toContain("wa.me");
    expect(blob).not.toContain("/perruques");
  });

  it("n’introduit aucune route page catalogue ni dépendance UI", () => {
    expect(existsSync(join(process.cwd(), "app/perruques"))).toBe(false);
    expect(existsSync(join(process.cwd(), "app/perruques/page.tsx"))).toBe(false);
    const source = readFileSync(join(process.cwd(), "content/wigs.ts"), "utf8");
    expect(source).not.toContain('"use client"');
    expect(source).not.toContain("react");
    expect(source).not.toContain("next/");
    expect(source).not.toContain("href");
  });

  it("conserve les descriptions visuelles exactes sans inventer de matière", () => {
    expect(wigs[0]?.shortDescription).toBe("Un modèle aux ondulations souples et élégantes.");
    expect(wigs[1]?.shortDescription).toBe("Un modèle aux ondulations profondes et définies.");
    expect(wigs[2]?.shortDescription).toBe("Un modèle au tombé lisse et soigné.");
  });
});
