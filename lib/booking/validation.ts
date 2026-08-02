import {
  BOOKING_TIME_SLOTS,
  bookingConfig,
  type BookingConfig,
  type BookingTimeSlot,
} from "@/content/booking";
import type { Service, ServiceId } from "@/content/services";
import { services as canonicalServices } from "@/content/services";
import { isSelectableBookingDate, parseIsoDate } from "@/lib/booking/calendar";

export type BookingField = "name" | "phone" | "serviceId" | "date" | "timeSlot";

export type BookingRequest = {
  readonly name: string;
  readonly phone: string;
  readonly serviceId: ServiceId | "";
  readonly date: string;
  readonly timeSlot: BookingTimeSlot | "";
};

export type ValidBookingRequest = {
  readonly name: string;
  readonly phone: string;
  readonly serviceId: ServiceId;
  readonly date: string;
  readonly timeSlot: BookingTimeSlot;
};

export type BookingValidationErrors = Partial<Record<BookingField, string>>;

export type BookingValidationResult =
  | {
      readonly success: true;
      readonly value: ValidBookingRequest;
      readonly errors: Record<string, never>;
    }
  | {
      readonly success: false;
      readonly errors: BookingValidationErrors;
    };

const SERVICE_IDS = new Set(canonicalServices.map((service) => service.id));

export function countPhoneDigits(phone: string): number {
  return phone.replace(/\D/g, "").length;
}

export function isSoftValidPhone(phone: string, config: BookingConfig = bookingConfig): boolean {
  const trimmed = phone.trim();
  if (trimmed.length === 0) {
    return false;
  }
  if (/[a-zA-Z]/.test(trimmed)) {
    return false;
  }
  if (!/^[\d\s+().-]+$/.test(trimmed)) {
    return false;
  }
  const digits = countPhoneDigits(trimmed);
  return digits >= config.limits.phoneMinDigits && digits <= config.limits.phoneMaxDigits;
}

export function validateBookingRequest(
  request: BookingRequest,
  options: {
    readonly todayIso: string;
    readonly services?: readonly Service[];
    readonly config?: BookingConfig;
  },
): BookingValidationResult {
  const config = options.config ?? bookingConfig;
  const catalog = options.services ?? canonicalServices;
  const errors: BookingValidationErrors = {};

  const name = request.name.trim();
  if (name.length === 0) {
    errors.name = "Indiquez votre nom.";
  } else if (name.length < config.limits.nameMinLength) {
    errors.name = "Le nom doit contenir au moins 2 caractères.";
  } else if (name.length > config.limits.nameMaxLength) {
    errors.name = "Le nom est trop long.";
  }

  const phone = request.phone.trim();
  if (phone.length === 0) {
    errors.phone = "Indiquez votre numéro de téléphone.";
  } else if (!isSoftValidPhone(phone, config)) {
    errors.phone = "Vérifiez le numéro de téléphone.";
  }

  const serviceId = request.serviceId;
  const knownIds = new Set(catalog.map((service) => service.id));
  if (serviceId === "" || !knownIds.has(serviceId) || !SERVICE_IDS.has(serviceId as ServiceId)) {
    errors.serviceId = "Choisissez une prestation.";
  }

  const date = request.date.trim();
  if (date.length === 0) {
    errors.date = "Choisissez une date.";
  } else if (!parseIsoDate(date) || !isSelectableBookingDate(date, options.todayIso, config)) {
    errors.date = "Cette date ne peut pas être sélectionnée.";
  }

  const timeSlot = request.timeSlot;
  if (timeSlot === "" || !(BOOKING_TIME_SLOTS as readonly string[]).includes(timeSlot)) {
    errors.timeSlot = "Choisissez un créneau.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    value: {
      name,
      phone,
      serviceId: serviceId as ServiceId,
      date,
      timeSlot: timeSlot as BookingTimeSlot,
    },
    errors: {},
  };
}
