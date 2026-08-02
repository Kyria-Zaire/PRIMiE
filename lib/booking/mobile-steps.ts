/**
 * Logique pure du parcours mobile BOOKING-WHATSAPP-FLOW-01D.
 * Aucun stockage — état UI uniquement.
 */

export type MobileBookingStep = 1 | 2 | 3 | 4;

export const MOBILE_BOOKING_STEP_COUNT = 4;

export const MOBILE_STEP_TITLES = {
  1: "Choisissez votre date",
  2: "Choisissez votre créneau",
  3: "Vos informations",
  4: "Vérifiez votre demande",
} as const satisfies Record<MobileBookingStep, string>;

export const MOBILE_CONTINUE_LABELS = {
  1: "Continuer vers les créneaux",
  2: "Continuer vers mes informations",
  3: "Vérifier ma demande",
} as const;

export const MOBILE_MODIFY_INFO_LABEL = "Modifier mes informations";

export type MobileStepGateInput = {
  readonly selectedDate: string;
  readonly selectedSlot: string;
  readonly name: string;
  readonly phone: string;
  readonly serviceId: string;
};

export function isMobileStep(value: number): value is MobileBookingStep {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

/** Prérequis pour ouvrir une étape (sans validation stricte téléphone). */
export function canOpenMobileStep(step: MobileBookingStep, input: MobileStepGateInput): boolean {
  if (step === 1) {
    return true;
  }
  if (step === 2) {
    return input.selectedDate.trim().length > 0;
  }
  if (step === 3) {
    return input.selectedDate.trim().length > 0 && input.selectedSlot.trim().length > 0;
  }
  return (
    input.selectedDate.trim().length > 0 &&
    input.selectedSlot.trim().length > 0 &&
    input.name.trim().length > 0 &&
    input.phone.trim().length > 0 &&
    input.serviceId.trim().length > 0
  );
}

export function getMobileStepLockMessage(
  step: MobileBookingStep,
  input: MobileStepGateInput,
): string | null {
  if (canOpenMobileStep(step, input)) {
    return null;
  }
  if (step === 2) {
    return "Choisissez d’abord une date pour accéder aux créneaux.";
  }
  if (step === 3) {
    return "Choisissez une date et un créneau pour renseigner vos informations.";
  }
  return "Complétez vos informations pour vérifier la demande.";
}

export function getMobileStepProgressLabel(step: MobileBookingStep): string {
  return `Étape ${step} sur ${MOBILE_BOOKING_STEP_COUNT}`;
}

export type InfoFieldErrors = {
  readonly name?: string;
  readonly phone?: string;
  readonly serviceId?: string;
};

/** Conservée pour les tests / filtrage des erreurs d’étape 3. */
export function pickInfoFieldErrors(errors: {
  readonly name?: string;
  readonly phone?: string;
  readonly serviceId?: string;
  readonly date?: string;
  readonly timeSlot?: string;
}): InfoFieldErrors {
  const next: {
    name?: string;
    phone?: string;
    serviceId?: string;
  } = {};
  if (errors.name) {
    next.name = errors.name;
  }
  if (errors.phone) {
    next.phone = errors.phone;
  }
  if (errors.serviceId) {
    next.serviceId = errors.serviceId;
  }
  return next;
}

export function hasInfoFieldErrors(errors: InfoFieldErrors): boolean {
  return Boolean(errors.name || errors.phone || errors.serviceId);
}
