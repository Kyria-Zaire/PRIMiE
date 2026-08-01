import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ContactBooking } from "./contact-booking";

describe("ContactBooking section", () => {
  it("fusionne réservation et contact avec disclosures mobiles natifs", () => {
    const html = renderToStaticMarkup(<ContactBooking />);
    const bookingWhatsApp = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);
    const plainWhatsApp = siteConfig.contact.whatsappUrl;

    expect(html).toContain('id="reserver"');
    expect(html.match(/id="reserver"/g)).toHaveLength(1);
    expect(html).toContain('id="contact"');
    expect(html.match(/id="contact"/g)).toHaveLength(1);
    expect(html).toContain("scroll-mt-24");

    expect(html.match(/<h2\b/g)).toHaveLength(1);
    expect(html).toContain(">Contactez PRiMiE Coiffure<");
    expect(html).toContain("Réservation &amp; contact");
    expect(html).toContain(
      "Échangez directement avec Prisca sur WhatsApp pour préciser votre prestation et votre demande.",
    );
    expect(html).toContain(">Réserver votre prestation<");
    expect(html).toContain(">Coordonnées<");
    expect(html).toContain("Prestations à domicile");
    expect(html).toContain(siteConfig.brand.activity);
    expect(html).toContain("Chez PRiMiE Coiffure");

    expect(html.match(/<details\b/g)).toHaveLength(2);
    expect(html).toContain("<details open");
    expect(html).toContain(">Comment réserver ?<");
    expect(html.match(/<summary\b/g)).toHaveLength(2);
    expect(html).toContain("lg:hidden");
    expect(html).toContain("group-open:flex");
    expect(html).toContain("lg:flex");

    const ctaIndex = html.indexOf(">Réserver sur WhatsApp<");
    const detailsIndex = html.indexOf("<details");
    expect(ctaIndex).toBeGreaterThan(-1);
    expect(detailsIndex).toBeGreaterThan(ctaIndex);

    expect(html).toContain(`href="${bookingWhatsApp}"`);
    expect(html).toContain("?text=");
    expect(html).toContain('href="#services"');
    expect(html).toContain(">Découvrir nos services<");

    expect(html).toContain('href="tel:+33749616582"');
    expect(html).toContain("+33 7 49 61 65 82");
    expect(html).toContain("<address");

    const contactBlock = html.slice(html.indexOf('id="contact"'));
    expect(contactBlock).toContain(`href="${plainWhatsApp}"`);
    expect(contactBlock).not.toContain("?text=");
    expect(contactBlock).toContain(">WhatsApp<");
    expect(contactBlock).toMatch(/^[^>]*>[\s\S]*<summary\b/);

    expect(html).toContain("lg:grid-cols-2");
    expect(html).not.toContain("<form");
    expect(html).not.toContain("<input");
    expect(html).not.toMatch(/calendrier|créneau|octobre|09h00|10h30/i);
    expect(html).not.toContain("horaire");
    expect(html).not.toContain("@");
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("Facebook");
    expect(html).not.toMatch(/Réponse rapide|garantie|Déplacement inclus|dimanche/i);
    expect(html).not.toContain("<img");
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
    expect(source).toContain("whatsappPrefillMessage");
    expect(source).toContain("buildWhatsAppUrl");
    expect(source).toContain('id="contact"');
    expect(source).toContain("scroll-mt-24");
    expect(source).toContain("<details");
    expect(source).toContain("<summary");
    expect(source).toContain("lg:flex");
    expect(source).toContain("lg:hidden");
    expect(source).toContain('aria-hidden="true"');
    expect(source).not.toContain('role="button"');
    expect(source).not.toContain("aria-expanded");
    expect(source).not.toMatch(/BOOKING-ENGINE|calendrier|créneau/i);
  });

  it("encode le WhatsApp réservation une seule fois sans double encodage", () => {
    const html = renderToStaticMarkup(<ContactBooking />);
    const bookingWhatsApp = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

    expect(html).toContain(`href="${bookingWhatsApp}"`);
    expect(bookingWhatsApp.startsWith("https://wa.me/33749616582?text=")).toBe(true);
    expect(bookingWhatsApp.match(/\?text=/g)).toHaveLength(1);
    expect(bookingWhatsApp).not.toContain("%25");
    expect(decodeURIComponent(bookingWhatsApp.split("?text=")[1] ?? "")).toBe(
      siteConfig.contact.whatsappPrefillMessage,
    );

    const contactBlock = html.slice(html.indexOf('id="contact"'));
    expect(contactBlock).toContain('href="https://wa.me/33749616582"');
    expect(contactBlock).not.toContain("?text=");
  });
});
