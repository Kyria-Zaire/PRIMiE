/**
 * Configuration métier BOOKING-WHATSAPP-FLOW — demande de RDV (pas disponibilité).
 * Seed CTO 2026-08-01. Branché à l’UI via BookingRequestWidget (01C+).
 */

export const BOOKING_TIME_SLOTS = ["09:00", "10:30", "12:00", "14:30", "16:00", "17:30"] as const;

export type BookingTimeSlot = (typeof BOOKING_TIME_SLOTS)[number];

/** ISO weekday : 1 = lundi … 7 = dimanche (ISO-8601). */
export const BOOKING_SELECTABLE_WEEKDAYS = [1, 2, 3, 4, 5, 6] as const;

export const bookingConfig = {
  timeZone: "Europe/Paris",
  locale: "fr-FR",
  horizonDays: 90,
  /** Jours ISO sélectionnables (lundi–samedi). */
  selectableWeekdays: BOOKING_SELECTABLE_WEEKDAYS,
  timeSlots: BOOKING_TIME_SLOTS,
  openingHours: {
    daysLabel: "Lundi – Samedi",
    hoursLabel: "09h00 – 19h00",
    appointmentOnlyLabel: "Uniquement sur rendez-vous",
  },
  copy: {
    subtitle:
      "Préparez votre demande de rendez-vous, puis envoyez-la directement à Prisca sur WhatsApp.",
    confirmationNote: "Le rendez-vous sera confirmé par Prisca après votre demande sur WhatsApp.",
    ctaLabel: "Envoyer ma demande sur WhatsApp",
  },
  limits: {
    nameMinLength: 2,
    nameMaxLength: 80,
    phoneMinDigits: 8,
    phoneMaxDigits: 15,
  },
} as const;

export type BookingConfig = typeof bookingConfig;
