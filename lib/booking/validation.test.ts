import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import type { ServiceId } from "@/content/services";
import { validateBookingRequest, type BookingRequest } from "@/lib/booking/validation";

const todayIso = "2026-08-05";

function baseRequest(overrides: Partial<BookingRequest> = {}): BookingRequest {
  return {
    name: "Marie Dupont",
    phone: "+33 7 49 61 65 82",
    serviceId: "tissage",
    date: "2026-08-07",
    timeSlot: "10:30",
    ...overrides,
  };
}

describe("validateBookingRequest", () => {
  it("rejette un formulaire vide", () => {
    const result = validateBookingRequest(
      { name: "", phone: "", serviceId: "", date: "", timeSlot: "" },
      { todayIso, services },
    );
    expect(result.success).toBe(false);
    if (result.success) {
      return;
    }
    expect(result.errors.name).toBe("Indiquez votre nom.");
    expect(result.errors.phone).toBe("Indiquez votre numéro de téléphone.");
    expect(result.errors.serviceId).toBe("Choisissez une prestation.");
    expect(result.errors.date).toBe("Choisissez une date.");
    expect(result.errors.timeSlot).toBe("Choisissez un créneau.");
  });

  it("accepte accents, apostrophes et tirets dans le nom", () => {
    const result = validateBookingRequest(baseRequest({ name: "Marie-Hélène O’Connor" }), {
      todayIso,
      services,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.name).toBe("Marie-Hélène O’Connor");
    }
  });

  it("rejette un nom trop court ou trop long", () => {
    const short = validateBookingRequest(baseRequest({ name: "A" }), { todayIso, services });
    expect(short.success).toBe(false);
    if (!short.success) {
      expect(short.errors.name).toBe("Le nom doit contenir au moins 2 caractères.");
    }

    const long = validateBookingRequest(baseRequest({ name: "a".repeat(81) }), {
      todayIso,
      services,
    });
    expect(long.success).toBe(false);
    if (!long.success) {
      expect(long.errors.name).toBe("Le nom est trop long.");
    }
  });

  it("valide téléphone français et international, rejette lettres et longueurs", () => {
    expect(
      validateBookingRequest(baseRequest({ phone: "07 49 61 65 82" }), { todayIso, services })
        .success,
    ).toBe(true);
    expect(
      validateBookingRequest(baseRequest({ phone: "+32 470 12 34 56" }), { todayIso, services })
        .success,
    ).toBe(true);

    const letters = validateBookingRequest(baseRequest({ phone: "07abcd616582" }), {
      todayIso,
      services,
    });
    expect(letters.success).toBe(false);
    if (!letters.success) {
      expect(letters.errors.phone).toBe("Vérifiez le numéro de téléphone.");
    }

    const short = validateBookingRequest(baseRequest({ phone: "1234567" }), {
      todayIso,
      services,
    });
    expect(short.success).toBe(false);

    const long = validateBookingRequest(baseRequest({ phone: "1".repeat(16) }), {
      todayIso,
      services,
    });
    expect(long.success).toBe(false);
  });

  it("accepte les six services et rejette un id invalide", () => {
    for (const service of services) {
      const result = validateBookingRequest(baseRequest({ serviceId: service.id }), {
        todayIso,
        services,
      });
      expect(result.success).toBe(true);
    }

    const invalid = validateBookingRequest(
      baseRequest({ serviceId: "extensions-cils" as ServiceId }),
      { todayIso, services },
    );
    expect(invalid.success).toBe(false);
    if (!invalid.success) {
      expect(invalid.errors.serviceId).toBe("Choisissez une prestation.");
    }
  });

  it("valide date et créneau, rejette hors fenêtre, dimanche et ISO invalide", () => {
    expect(validateBookingRequest(baseRequest(), { todayIso, services }).success).toBe(true);

    const sunday = validateBookingRequest(baseRequest({ date: "2026-08-09" }), {
      todayIso,
      services,
    });
    expect(sunday.success).toBe(false);
    if (!sunday.success) {
      expect(sunday.errors.date).toBe("Cette date ne peut pas être sélectionnée.");
    }

    const past = validateBookingRequest(baseRequest({ date: "2026-08-01" }), {
      todayIso,
      services,
    });
    expect(past.success).toBe(false);

    const invalidIso = validateBookingRequest(baseRequest({ date: "2026-02-30" }), {
      todayIso,
      services,
    });
    expect(invalidIso.success).toBe(false);
    if (!invalidIso.success) {
      expect(invalidIso.errors.date).toBe("Cette date ne peut pas être sélectionnée.");
    }

    const day91 = validateBookingRequest(baseRequest({ date: "2026-11-04" }), {
      todayIso,
      services,
    });
    expect(day91.success).toBe(false);

    const slot = validateBookingRequest(baseRequest({ timeSlot: "11:00" as "10:30" }), {
      todayIso,
      services,
    });
    expect(slot.success).toBe(false);
    if (!slot.success) {
      expect(slot.errors.timeSlot).toBe("Choisissez un créneau.");
    }
  });

  it("normalise sans perdre les autres champs en cas d’erreur partielle", () => {
    const result = validateBookingRequest(baseRequest({ name: " " }), { todayIso, services });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBeDefined();
      expect(result.errors.phone).toBeUndefined();
      expect(result.errors.serviceId).toBeUndefined();
    }
  });

  it("retourne une requête valide trimée", () => {
    const result = validateBookingRequest(
      baseRequest({ name: "  Anna  ", phone: "  +33749616582  " }),
      { todayIso, services },
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toEqual({
        name: "Anna",
        phone: "+33749616582",
        serviceId: "tissage",
        date: "2026-08-07",
        timeSlot: "10:30",
      });
    }
  });
});
