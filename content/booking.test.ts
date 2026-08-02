import { describe, expect, it } from "vitest";
import { bookingConfig, BOOKING_TIME_SLOTS } from "@/content/booking";
import { services } from "@/content/services";

describe("bookingConfig", () => {
  it("fige fuseau, locale, horizon, jours et créneaux", () => {
    expect(bookingConfig.timeZone).toBe("Europe/Paris");
    expect(bookingConfig.locale).toBe("fr-FR");
    expect(bookingConfig.horizonDays).toBe(90);
    expect([...bookingConfig.selectableWeekdays]).toEqual([1, 2, 3, 4, 5, 6]);
    expect([...BOOKING_TIME_SLOTS]).toEqual(["09:00", "10:30", "12:00", "14:30", "16:00", "17:30"]);
    expect(bookingConfig.openingHours).toEqual({
      daysLabel: "Lundi – Samedi",
      hoursLabel: "09h00 – 19h00",
      appointmentOnlyLabel: "Uniquement sur rendez-vous",
    });
    expect(bookingConfig.copy.subtitle).toContain("demande de rendez-vous");
    expect(bookingConfig.copy.ctaLabel).toBe("Envoyer ma demande sur WhatsApp");
    // Readonly au niveau TypeScript (`as const`) — pas de mutation métier attendue.
    expect(bookingConfig.timeSlots).toBe(BOOKING_TIME_SLOTS);
    expect(bookingConfig.timeSlots.length).toBe(6);
  });

  it("conserve les six services canoniques", () => {
    expect(services.map((service) => service.id)).toEqual([
      "tresses-coiffure",
      "traitement-perruque",
      "pose-perruque",
      "look-twist",
      "vente-pose-perruques",
      "tissage",
    ]);
  });
});
