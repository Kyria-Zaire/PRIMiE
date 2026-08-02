import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { bookingConfig } from "@/content/booking";
import { siteConfig } from "@/content/site-config";
import { ContactBooking } from "./contact-booking";

describe("ContactBooking section", () => {
  it("compose le module de demande WhatsApp sans ancien design deux cards", () => {
    const html = renderToStaticMarkup(<ContactBooking />);

    expect(html).toContain('id="reserver"');
    expect(html.match(/id="reserver"/g)).toHaveLength(1);
    expect(html).toContain('id="contact"');
    expect(html.match(/id="contact"/g)).toHaveLength(1);
    expect(html).toContain("scroll-mt-24");
    expect(html.match(/<h2\b/g)).toHaveLength(1);
    expect(html).toContain(">Contactez PRiMiE Coiffure<");
    expect(html).toContain(bookingConfig.copy.subtitle);
    expect(html).toContain("Choisissez votre date");
    expect(html).toContain("Choisissez votre créneau");
    expect(html).toContain("Détails de la demande");
    expect(html).toContain(bookingConfig.copy.ctaLabel);
    expect(html).toContain("lg:grid-cols-12");
    expect(html).toContain("<form");
    expect(html).toContain("<input");
    expect(html).toContain("<select");
    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain(siteConfig.contact.whatsappUrl);
    expect(html).toContain(siteConfig.brand.activity);

    expect(html).not.toContain("<details");
    expect(html).not.toContain("Comment réserver");
    expect(html).not.toContain("lg:grid-cols-2");
    expect(html).not.toContain("Réserver sur WhatsApp");
    expect(html).not.toContain("Déplacement inclus");
    expect(html).not.toContain("@");
    expect(html).not.toContain("Instagram");
    expect(html).not.toMatch(/Réponse rapide|garantie/i);
  });

  it("reste un Server Component sans hexadécimal local", () => {
    const source = readFileSync(
      join(process.cwd(), "components/sections/contact-booking.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(/["']use client["']/);
    expect(source).not.toMatch(/\b(useState|useEffect|useRef|useMemo|useCallback)\b/);
    expect(source).not.toMatch(/\b(window|document|localStorage)\b/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(source).toContain("BookingRequestWidget");
    expect(source).toContain('id="reserver"');
    expect(source).toContain('aria-hidden="true"');
    expect(source).not.toContain("<details");
    expect(source).not.toContain("<summary");
  });

  it("délègue le WhatsApp dynamique au widget (pas de prérempli figé section)", () => {
    const html = renderToStaticMarkup(<ContactBooking />);
    const contactBlock = html.slice(html.indexOf('id="contact"'));

    expect(contactBlock).toContain(`href="${siteConfig.contact.whatsappUrl}"`);
    expect(contactBlock).not.toContain("?text=");
    expect(html).not.toContain(siteConfig.contact.whatsappPrefillMessage.split("\n")[0]!);
  });

  it("bandeau #contact sans répétition du nom commercial (R1)", () => {
    const html = renderToStaticMarkup(<ContactBooking />);
    const contactBlock = html.slice(html.indexOf('id="contact"'));

    expect(html.match(/id="contact"/g)).toHaveLength(1);
    expect(contactBlock).not.toContain(siteConfig.brand.commercialName);
    expect(contactBlock).toContain('href="tel:+33749616582"');
    expect(contactBlock).toContain(`href="${siteConfig.contact.whatsappUrl}"`);
    expect(contactBlock).toContain(">WhatsApp<");
    expect(contactBlock).not.toMatch(/\+33 7 49 61 65 82WhatsApp/);
  });
});
