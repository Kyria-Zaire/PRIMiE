import { describe, expect, it } from "vitest";
import {
  MOBILE_BOOKING_STEP_COUNT,
  MOBILE_CONTINUE_LABELS,
  MOBILE_MODIFY_INFO_LABEL,
  MOBILE_STEP_TITLES,
  canOpenMobileStep,
  getMobileStepLockMessage,
  getMobileStepProgressLabel,
  hasInfoFieldErrors,
  isMobileStep,
  pickInfoFieldErrors,
  type MobileStepGateInput,
} from "@/lib/booking/mobile-steps";

const empty: MobileStepGateInput = {
  selectedDate: "",
  selectedSlot: "",
  name: "",
  phone: "",
  serviceId: "",
};

const withDate: MobileStepGateInput = {
  ...empty,
  selectedDate: "2026-08-03",
};

const withDateSlot: MobileStepGateInput = {
  ...withDate,
  selectedSlot: "10:30",
};

const withInfo: MobileStepGateInput = {
  ...withDateSlot,
  name: "Test Visuel",
  phone: "+33 6 00 00 00 01",
  serviceId: "tissage",
};

describe("mobile-steps — FLOW-01D", () => {
  it("expose quatre titres et libellés exacts", () => {
    expect(MOBILE_BOOKING_STEP_COUNT).toBe(4);
    expect(MOBILE_STEP_TITLES[1]).toBe("Choisissez votre date");
    expect(MOBILE_STEP_TITLES[2]).toBe("Choisissez votre créneau");
    expect(MOBILE_STEP_TITLES[3]).toBe("Vos informations");
    expect(MOBILE_STEP_TITLES[4]).toBe("Vérifiez votre demande");
    expect(MOBILE_CONTINUE_LABELS[1]).toBe("Continuer vers les créneaux");
    expect(MOBILE_CONTINUE_LABELS[2]).toBe("Continuer vers mes informations");
    expect(MOBILE_CONTINUE_LABELS[3]).toBe("Vérifier ma demande");
    expect(MOBILE_MODIFY_INFO_LABEL).toBe("Modifier mes informations");
    expect(isMobileStep(1)).toBe(true);
    expect(isMobileStep(5)).toBe(false);
  });

  it("applique les prérequis d’ouverture des étapes", () => {
    expect(canOpenMobileStep(1, empty)).toBe(true);
    expect(canOpenMobileStep(2, empty)).toBe(false);
    expect(canOpenMobileStep(2, withDate)).toBe(true);
    expect(canOpenMobileStep(3, withDate)).toBe(false);
    expect(canOpenMobileStep(3, withDateSlot)).toBe(true);
    expect(canOpenMobileStep(4, withDateSlot)).toBe(false);
    expect(canOpenMobileStep(4, withInfo)).toBe(true);
  });

  it("verrouille puis déverrouille l’étape 4 selon le remplissage des prérequis", () => {
    expect(canOpenMobileStep(4, withDateSlot)).toBe(false);
    expect(getMobileStepLockMessage(4, withDateSlot)).toMatch(/informations/i);

    const missingPhone: MobileStepGateInput = {
      ...withDateSlot,
      name: "Test Visuel",
      phone: "",
      serviceId: "tissage",
    };
    expect(canOpenMobileStep(4, missingPhone)).toBe(false);
    expect(getMobileStepLockMessage(4, missingPhone)).not.toBeNull();

    expect(canOpenMobileStep(4, withInfo)).toBe(true);
    expect(getMobileStepLockMessage(4, withInfo)).toBeNull();
  });

  it("explique les verrous sans se contenter d’un état silencieux", () => {
    expect(getMobileStepLockMessage(2, empty)).toMatch(/date/i);
    expect(getMobileStepLockMessage(3, withDate)).toMatch(/créneau/i);
    expect(getMobileStepLockMessage(4, withDateSlot)).toMatch(/informations/i);
    expect(getMobileStepLockMessage(1, empty)).toBeNull();
    expect(getMobileStepProgressLabel(1)).toBe("Étape 1 sur 4");
    expect(getMobileStepProgressLabel(4)).toBe("Étape 4 sur 4");

    const picked = pickInfoFieldErrors({
      name: "Indiquez votre nom.",
      date: "Choisissez une date.",
    });
    expect(picked).toEqual({ name: "Indiquez votre nom." });
    expect(hasInfoFieldErrors(picked)).toBe(true);
    expect(hasInfoFieldErrors({})).toBe(false);
  });
});
