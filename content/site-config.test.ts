import { describe, expect, it } from "vitest";
import { siteConfig } from "../content/site-config";

describe("siteConfig", () => {
  it("expose la graphie et l’identité confirmées", () => {
    expect(siteConfig.brand.shortName).toBe("PRiMiE");
    expect(siteConfig.brand.commercialName).toBe("Chez PRiMiE Coiffure");
    expect(siteConfig.brand.owner).toBe("Prisca");
    expect(siteConfig.brand.activity).toBe("Coiffure et beauté afro à domicile");
    expect(siteConfig.brand.slogan).toBe("La beauté commence par une belle coiffure.");
    expect(siteConfig.locale.language).toBe("fr");
    expect(siteConfig.locale.locale).toBe("fr_FR");
  });

  it("expose les coordonnées canoniques", () => {
    expect(siteConfig.contact.phoneDisplay).toBe("+33 7 49 61 65 82");
    expect(siteConfig.contact.phoneE164).toBe("+33749616582");
    expect(siteConfig.contact.whatsappNumber).toBe("33749616582");
    expect(siteConfig.contact.whatsappUrl).toBe("https://wa.me/33749616582");
  });

  it("n’expose aucun champ non confirmé hors seed WhatsApp centralisé", () => {
    const root = siteConfig as Record<string, unknown>;
    const brand = siteConfig.brand as Record<string, unknown>;
    const contact = siteConfig.contact as Record<string, unknown>;

    expect(root).not.toHaveProperty("address");
    expect(root).not.toHaveProperty("hours");
    expect(root).not.toHaveProperty("email");
    expect(root).not.toHaveProperty("social");
    expect(root).not.toHaveProperty("pricing");
    expect(brand).not.toHaveProperty("address");
    expect(contact).not.toHaveProperty("email");
    expect(contact).not.toHaveProperty("address");
    expect(contact).not.toHaveProperty("hours");
    expect(contact).not.toHaveProperty("serviceArea");
    expect(contact).toHaveProperty("whatsappPrefillMessage");
  });
});
