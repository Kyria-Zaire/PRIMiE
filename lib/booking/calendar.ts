import { BOOKING_SELECTABLE_WEEKDAYS, bookingConfig, type BookingConfig } from "@/content/booking";

export type CalendarDate = {
  readonly year: number;
  readonly month: number;
  readonly day: number;
};

export type CalendarCell =
  | {
      readonly kind: "empty";
      readonly key: string;
    }
  | {
      readonly kind: "day";
      readonly key: string;
      readonly isoDate: string;
      readonly day: number;
      readonly isToday: boolean;
      readonly isSelected: boolean;
      readonly isDisabled: boolean;
      readonly ariaLabel: string;
    };

export type CalendarMonth = {
  readonly year: number;
  readonly month: number;
  readonly label: string;
  readonly cells: readonly CalendarCell[];
};

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseIsoDate(iso: string): CalendarDate | null {
  const match = ISO_DATE_PATTERN.exec(iso);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!isValidCivilDate(year, month, day)) {
    return null;
  }

  return { year, month, day };
}

export function toIsoDate(date: CalendarDate): string {
  return `${String(date.year).padStart(4, "0")}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

export function compareIsoDates(a: string, b: string): number {
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
}

export function isValidCivilDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  if (month < 1 || month > 12 || day < 1) {
    return false;
  }
  return day <= daysInMonth(year, month);
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function addDays(date: CalendarDate, days: number): CalendarDate {
  const utc = Date.UTC(date.year, date.month - 1, date.day + days);
  const next = new Date(utc);
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}

/**
 * Jour de la semaine ISO : 1 = lundi … 7 = dimanche.
 * Propriété civile grégorienne (indépendante du fuseau).
 */
export function getIsoWeekday(date: CalendarDate): number {
  const dow = new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay();
  return dow === 0 ? 7 : dow;
}

/** Index 0 = lundi … 6 = dimanche. */
export function getMondayFirstWeekdayIndex(date: CalendarDate): number {
  return getIsoWeekday(date) - 1;
}

/**
 * Date civile « aujourd’hui » dans un fuseau IANA, à partir d’un instant injecté.
 */
export function getTodayInTimeZone(
  now: Date,
  timeZone: string = bookingConfig.timeZone,
): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  if (!isValidCivilDate(year, month, day)) {
    throw new Error("Unable to resolve civil date for time zone");
  }

  return { year, month, day };
}

export function getTodayIsoInTimeZone(
  now: Date,
  timeZone: string = bookingConfig.timeZone,
): string {
  return toIsoDate(getTodayInTimeZone(now, timeZone));
}

export function isDateWithinBookingWindow(
  isoDate: string,
  todayIso: string,
  horizonDays: number = bookingConfig.horizonDays,
): boolean {
  const date = parseIsoDate(isoDate);
  const today = parseIsoDate(todayIso);
  if (!date || !today) {
    return false;
  }

  const max = toIsoDate(addDays(today, horizonDays));
  return compareIsoDates(isoDate, todayIso) >= 0 && compareIsoDates(isoDate, max) <= 0;
}

export function isSelectableBookingDate(
  isoDate: string,
  todayIso: string,
  config: Pick<BookingConfig, "horizonDays" | "selectableWeekdays"> = bookingConfig,
): boolean {
  const date = parseIsoDate(isoDate);
  if (!date) {
    return false;
  }

  if (!isDateWithinBookingWindow(isoDate, todayIso, config.horizonDays)) {
    return false;
  }

  const weekday = getIsoWeekday(date);
  return (config.selectableWeekdays as readonly number[]).includes(weekday);
}

export function formatBookingDateFr(
  isoDate: string,
  locale: string = bookingConfig.locale,
): string | null {
  const date = parseIsoDate(isoDate);
  if (!date) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return formatter.format(new Date(Date.UTC(date.year, date.month - 1, date.day)));
}

export function formatBookingTimeFr(timeSlot: string): string | null {
  const match = /^(\d{2}):(\d{2})$/.exec(timeSlot);
  if (!match) {
    return null;
  }
  return `${match[1]}h${match[2]}`;
}

export type BuildCalendarMonthOptions = {
  readonly year: number;
  readonly month: number;
  readonly todayIso: string;
  readonly selectedIso?: string;
  readonly config?: Pick<BookingConfig, "horizonDays" | "selectableWeekdays" | "locale">;
};

export function buildCalendarMonth({
  year,
  month,
  todayIso,
  selectedIso = "",
  config = bookingConfig,
}: BuildCalendarMonthOptions): CalendarMonth {
  if (!isValidCivilDate(year, month, 1)) {
    throw new Error("Invalid calendar month");
  }

  const first: CalendarDate = { year, month, day: 1 };
  const leading = getMondayFirstWeekdayIndex(first);
  const totalDays = daysInMonth(year, month);
  const cells: CalendarCell[] = [];

  for (let i = 0; i < leading; i += 1) {
    cells.push({ kind: "empty", key: `empty-lead-${year}-${month}-${i}` });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const civil: CalendarDate = { year, month, day };
    const isoDate = toIsoDate(civil);
    const isToday = isoDate === todayIso;
    const isSelected = selectedIso !== "" && isoDate === selectedIso;
    const isDisabled = !isSelectableBookingDate(isoDate, todayIso, config);
    const ariaLabel = formatBookingDateFr(isoDate, config.locale) ?? isoDate;

    cells.push({
      kind: "day",
      key: isoDate,
      isoDate,
      day,
      isToday,
      isSelected,
      isDisabled,
      ariaLabel,
    });
  }

  while (cells.length < 42) {
    const trail = cells.length;
    cells.push({ kind: "empty", key: `empty-trail-${year}-${month}-${trail}` });
  }

  const label = new Intl.DateTimeFormat(config.locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));

  return {
    year,
    month,
    label,
    cells: cells.slice(0, 42),
  };
}

export function shiftMonth(year: number, month: number, delta: number): CalendarDate {
  const utc = new Date(Date.UTC(year, month - 1 + delta, 1));
  return {
    year: utc.getUTCFullYear(),
    month: utc.getUTCMonth() + 1,
    day: 1,
  };
}

function monthHasSelectableDay(
  year: number,
  month: number,
  todayIso: string,
  config: Pick<BookingConfig, "horizonDays" | "selectableWeekdays">,
): boolean {
  const totalDays = daysInMonth(year, month);
  for (let day = 1; day <= totalDays; day += 1) {
    const iso = toIsoDate({ year, month, day });
    if (isSelectableBookingDate(iso, todayIso, config)) {
      return true;
    }
  }
  return false;
}

export function canNavigateToPreviousMonth(
  year: number,
  month: number,
  todayIso: string,
  config: Pick<BookingConfig, "horizonDays" | "selectableWeekdays"> = bookingConfig,
): boolean {
  const prev = shiftMonth(year, month, -1);
  return monthHasSelectableDay(prev.year, prev.month, todayIso, config);
}

export function canNavigateToNextMonth(
  year: number,
  month: number,
  todayIso: string,
  config: Pick<BookingConfig, "horizonDays" | "selectableWeekdays"> = bookingConfig,
): boolean {
  const next = shiftMonth(year, month, 1);
  return monthHasSelectableDay(next.year, next.month, todayIso, config);
}

/** Exposé pour tests / clarté — dimanche = 7. */
export function isSunday(isoDate: string): boolean {
  const date = parseIsoDate(isoDate);
  if (!date) {
    return false;
  }
  return getIsoWeekday(date) === 7;
}

export { BOOKING_SELECTABLE_WEEKDAYS };
