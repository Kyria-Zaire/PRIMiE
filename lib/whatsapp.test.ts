import { describe, expect, it } from "vitest";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  const base = siteConfig.contact.whatsappUrl;
  const prefill = siteConfig.contact.whatsappPrefillMessage;

  it("retourne l’URL canonique sans message", () => {
    expect(buildWhatsAppUrl()).toBe(base);
    expect(buildWhatsAppUrl()).toBe("https://wa.me/33749616582");
    expect(buildWhatsAppUrl()).not.toContain("?text=");
  });

  it("ignore un message vide ou composé d’espaces", () => {
    expect(buildWhatsAppUrl("")).toBe(base);
    expect(buildWhatsAppUrl("   ")).toBe(base);
    expect(buildWhatsAppUrl("\t\n")).toBe(base);
  });

  it("encode les espaces, accents et caractères spéciaux", () => {
    // Fixtures techniques — ne pas publier comme copy Production.
    expect(buildWhatsAppUrl("Bonjour, je souhaite des informations.")).toBe(
      `${base}?text=${encodeURIComponent("Bonjour, je souhaite des informations.")}`,
    );
    expect(buildWhatsAppUrl("Tresses & coiffure")).toBe(
      `${base}?text=${encodeURIComponent("Tresses & coiffure")}`,
    );
    expect(buildWhatsAppUrl("café & thé")).toBe(`${base}?text=${encodeURIComponent("café & thé")}`);
    expect(buildWhatsAppUrl("ligne1\nligne2")).toBe(
      `${base}?text=${encodeURIComponent("ligne1\nligne2")}`,
    );
  });

  it("encode le message PO seed une seule fois avec accents et emoji", () => {
    const url = buildWhatsAppUrl(prefill);
    const expected = `${base}?text=${encodeURIComponent(prefill)}`;

    expect(url).toBe(expected);
    expect(url.match(/\?text=/g)).toHaveLength(1);
    expect(url).not.toContain("%25");
    expect(decodeURIComponent(url.slice(`${base}?text=`.length))).toBe(prefill);
    expect(prefill).toContain("PRiMiE");
    expect(prefill).toContain("👋");
    expect(prefill).toContain("😊");
    expect(prefill).toContain("disponibilités");
    expect(prefill).not.toMatch(/PRIMiE|PRIMIE|Primie/);
  });

  it("n’ajoute qu’un seul paramètre text et ne mute pas la config", () => {
    const before = structuredClone(siteConfig);
    const url = buildWhatsAppUrl("  message  ");

    expect(url.startsWith(`${base}?text=`)).toBe(true);
    expect(url.match(/\?text=/g)).toHaveLength(1);
    expect(url).not.toContain("?text=?text=");
    expect(siteConfig).toEqual(before);
  });
});
