import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Booking } from "./booking";

describe("Booking section", () => {
  it("rend #reserver avec le contenu et le CTA WhatsApp prérempli", () => {
    const html = renderToStaticMarkup(<Booking />);
    const expectedWhatsApp = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

    expect(html).toContain('id="reserver"');
    expect(html).toContain(">Réservez votre prestation<");
    expect(html).toContain(
      "Contactez Prisca directement sur WhatsApp pour échanger sur votre demande.",
    );
    expect(html).toContain("Réserver sur WhatsApp");
    expect(html).toContain(`href="${expectedWhatsApp}"`);
    expect(html).toContain("?text=");
    expect(html).not.toContain("Réponse rapide");
    expect(html).not.toContain("garantie");
    expect(html).not.toContain("horaire");
    expect(html).not.toContain("<img");
  });

  it("reste un Server Component sans hexadécimal local", () => {
    const source = readFileSync(join(process.cwd(), "components/sections/booking.tsx"), "utf8");

    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(source).toContain("buildWhatsAppUrl");
    expect(source).toContain("whatsappPrefillMessage");
  });
});
