import { describe, expect, it } from "vitest";
import { siteConfig } from "@/content/site-config";
import { services } from "@/content/services";
import { buildBookingWhatsAppMessage, buildBookingWhatsAppUrl } from "@/lib/booking/message";
import type { ValidBookingRequest } from "@/lib/booking/validation";

const valid: ValidBookingRequest = {
  name: "Marie Dupont",
  phone: "+33 7 49 61 65 82",
  serviceId: "tissage",
  date: "2026-10-15",
  timeSlot: "10:30",
};

describe("buildBookingWhatsAppMessage", () => {
  it("produit le message exact avec marque, titre, date FR et horaire h", () => {
    const message = buildBookingWhatsAppMessage(valid, services);
    const expected = [
      "Bonjour Prisca 👋",
      "",
      "Je souhaite faire une demande de rendez-vous chez PRiMiE Coiffure.",
      "",
      "Nom : Marie Dupont",
      "Téléphone : +33 7 49 61 65 82",
      "Prestation : Tissage",
      "Date souhaitée : jeudi 15 octobre 2026",
      "Créneau souhaité : 10h30",
      "",
      "Je comprends que le rendez-vous sera confirmé selon vos disponibilités.",
      "",
      "Merci 😊",
    ].join("\n");

    expect(message).toBe(expected);
    expect(message).toContain("PRiMiE");
    expect(message).toContain("👋");
    expect(message).toContain("😊");
    expect(message).not.toMatch(/confirmée automatiquement|réservation confirmée|PRIMiE/);
    expect(message).not.toContain("@");
    expect(message).not.toMatch(/€|prix|durée/i);
  });

  it("n’altère pas la requête source", () => {
    const before = structuredClone(valid);
    buildBookingWhatsAppMessage(valid, services);
    expect(valid).toEqual(before);
  });
});

describe("buildBookingWhatsAppUrl", () => {
  it("réutilise buildWhatsAppUrl avec un seul ?text= et sans double encodage", () => {
    const message = buildBookingWhatsAppMessage(valid, services);
    const url = buildBookingWhatsAppUrl(valid, services);
    const base = siteConfig.contact.whatsappUrl;

    expect(url.startsWith(`${base}?text=`)).toBe(true);
    expect(url.match(/\?text=/g)).toHaveLength(1);
    expect(url).not.toContain("%25");
    expect(decodeURIComponent(url.slice(`${base}?text=`.length))).toBe(message);
    expect(url).toBe(`${base}?text=${encodeURIComponent(message)}`);
  });
});
