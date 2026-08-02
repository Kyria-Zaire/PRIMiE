import { describe, expect, it } from "vitest";
import { bookingConfig, BOOKING_TIME_SLOTS } from "@/content/booking";
import { services } from "@/content/services";
import {
  addDays,
  buildCalendarMonth,
  canNavigateToNextMonth,
  canNavigateToPreviousMonth,
  compareIsoDates,
  formatBookingDateFr,
  formatBookingTimeFr,
  getIsoWeekday,
  getMondayFirstWeekdayIndex,
  getTodayInTimeZone,
  getTodayIsoInTimeZone,
  isDateWithinBookingWindow,
  isSelectableBookingDate,
  isSunday,
  parseIsoDate,
  shiftMonth,
  toIsoDate,
} from "@/lib/booking/calendar";

describe("booking calendar — dates civiles", () => {
  it("parse et sérialise YYYY-MM-DD sans new Date(iso)", () => {
    expect(parseIsoDate("2026-10-15")).toEqual({ year: 2026, month: 10, day: 15 });
    expect(toIsoDate({ year: 2026, month: 2, day: 1 })).toBe("2026-02-01");
    expect(parseIsoDate("2026-02-30")).toBeNull();
    expect(parseIsoDate("2026-13-01")).toBeNull();
    expect(parseIsoDate("not-a-date")).toBeNull();
  });

  it("compare et ajoute des jours de façon stable", () => {
    expect(compareIsoDates("2026-10-15", "2026-10-16")).toBe(-1);
    expect(compareIsoDates("2026-10-15", "2026-10-15")).toBe(0);
    expect(toIsoDate(addDays({ year: 2026, month: 12, day: 31 }, 1))).toBe("2027-01-01");
    expect(toIsoDate(addDays({ year: 2024, month: 2, day: 28 }, 1))).toBe("2024-02-29");
    expect(toIsoDate(addDays({ year: 2025, month: 2, day: 28 }, 1))).toBe("2025-03-01");
  });

  it("résout aujourd’hui en Europe/Paris avec Date injectée", () => {
    // 2026-08-01 10:00 UTC = 12:00 Paris (été)
    const sameDay = new Date("2026-08-01T10:00:00.000Z");
    expect(getTodayIsoInTimeZone(sameDay, "Europe/Paris")).toBe("2026-08-01");

    // 2026-08-01 22:30 UTC = 2026-08-02 00:30 Paris
    const nearMidnight = new Date("2026-08-01T22:30:00.000Z");
    expect(getTodayIsoInTimeZone(nearMidnight, "Europe/Paris")).toBe("2026-08-02");

    // Heure d’hiver : 2026-01-15 23:30 UTC = 2026-01-16 00:30 Paris
    const winter = new Date("2026-01-15T23:30:00.000Z");
    expect(getTodayIsoInTimeZone(winter, "Europe/Paris")).toBe("2026-01-16");

    // Passage été : après dernier dimanche mars 2026 (29 mars)
    const summer = new Date("2026-03-29T01:30:00.000Z");
    expect(getTodayInTimeZone(summer, "Europe/Paris")).toEqual({
      year: 2026,
      month: 3,
      day: 29,
    });
  });
});

describe("booking calendar — mois et sélection", () => {
  const todayIso = "2026-08-05"; // mercredi

  it("commence la semaine le lundi et produit 42 cellules", () => {
    const month = buildCalendarMonth({ year: 2026, month: 8, todayIso });
    expect(month.cells).toHaveLength(42);
    expect(getMondayFirstWeekdayIndex({ year: 2026, month: 8, day: 1 })).toBe(5); // samedi
    expect(getIsoWeekday({ year: 2026, month: 8, day: 3 })).toBe(1); // lundi
  });

  it("gère un mois commençant lundi et un mois commençant dimanche", () => {
    // juin 2026 commence lundi
    const june = buildCalendarMonth({ year: 2026, month: 6, todayIso: "2026-06-01" });
    expect(june.cells[0]).toMatchObject({ kind: "day", day: 1, isoDate: "2026-06-01" });

    // février 2026 commence dimanche
    const feb = buildCalendarMonth({ year: 2026, month: 2, todayIso: "2026-02-01" });
    expect(feb.cells.slice(0, 6).every((cell) => cell.kind === "empty")).toBe(true);
    expect(feb.cells[6]).toMatchObject({ kind: "day", day: 1, isoDate: "2026-02-01" });
  });

  it("gère février bissextile et non bissextile", () => {
    const leap = buildCalendarMonth({ year: 2024, month: 2, todayIso: "2024-02-01" });
    expect(leap.cells.some((cell) => cell.kind === "day" && cell.day === 29)).toBe(true);

    const nonLeap = buildCalendarMonth({ year: 2025, month: 2, todayIso: "2025-02-01" });
    expect(nonLeap.cells.some((cell) => cell.kind === "day" && cell.day === 29)).toBe(false);
  });

  it("enchaîne décembre → janvier et janvier → décembre", () => {
    expect(shiftMonth(2026, 12, 1)).toEqual({ year: 2027, month: 1, day: 1 });
    expect(shiftMonth(2027, 1, -1)).toEqual({ year: 2026, month: 12, day: 1 });
  });

  it("marque les cellules hors mois comme vides et n’a aucune pré-sélection", () => {
    const month = buildCalendarMonth({ year: 2026, month: 8, todayIso });
    expect(month.cells.filter((cell) => cell.kind === "empty").length).toBeGreaterThan(0);
    expect(month.cells.every((cell) => cell.kind === "empty" || cell.isSelected === false)).toBe(
      true,
    );
  });

  it("identifie aujourd’hui et désactive passé / dimanche / hors fenêtre", () => {
    const month = buildCalendarMonth({
      year: 2026,
      month: 8,
      todayIso,
      selectedIso: "2026-08-07",
    });

    const today = month.cells.find((cell) => cell.kind === "day" && cell.isoDate === todayIso);
    expect(today).toMatchObject({ kind: "day", isToday: true, isDisabled: false });

    const past = month.cells.find((cell) => cell.kind === "day" && cell.isoDate === "2026-08-04");
    expect(past).toMatchObject({ kind: "day", isDisabled: true });

    const sunday = month.cells.find((cell) => cell.kind === "day" && cell.isoDate === "2026-08-09");
    expect(sunday).toMatchObject({ kind: "day", isDisabled: true });
    expect(isSunday("2026-08-09")).toBe(true);

    const selected = month.cells.find(
      (cell) => cell.kind === "day" && cell.isoDate === "2026-08-07",
    );
    expect(selected).toMatchObject({ kind: "day", isSelected: true, isDisabled: false });
  });

  it("inclut le jour 90 et exclut le jour 91", () => {
    const day90 = toIsoDate(addDays(parseIsoDate(todayIso)!, 90));
    const day91 = toIsoDate(addDays(parseIsoDate(todayIso)!, 91));
    expect(isDateWithinBookingWindow(day90, todayIso, 90)).toBe(true);
    expect(isSelectableBookingDate(day90, todayIso)).toBe(!isSunday(day90));
    expect(isDateWithinBookingWindow(day91, todayIso, 90)).toBe(false);
    expect(isSelectableBookingDate(day91, todayIso)).toBe(false);
  });

  it("bloque la navigation hors fenêtre", () => {
    expect(canNavigateToPreviousMonth(2026, 8, todayIso)).toBe(false);
    expect(canNavigateToNextMonth(2026, 8, todayIso)).toBe(true);

    const lastSelectable = toIsoDate(addDays(parseIsoDate(todayIso)!, 90));
    const last = parseIsoDate(lastSelectable)!;
    expect(canNavigateToNextMonth(last.year, last.month, todayIso)).toBe(false);
    expect(canNavigateToPreviousMonth(last.year, last.month, todayIso)).toBe(true);
  });

  it("fournit un ariaLabel français complet sur les cellules jour", () => {
    const label = formatBookingDateFr("2026-10-15");
    expect(label).toMatch(/jeudi/i);
    expect(label).toMatch(/15/);
    expect(label).toMatch(/octobre/i);
    expect(label).toMatch(/2026/);
    expect(formatBookingTimeFr("10:30")).toBe("10h30");
    expect(formatBookingTimeFr("09:00")).toBe("09h00");

    const month = buildCalendarMonth({ year: 2026, month: 10, todayIso: "2026-10-01" });
    const day15 = month.cells.find((cell) => cell.kind === "day" && cell.isoDate === "2026-10-15");
    expect(day15).toMatchObject({ kind: "day", ariaLabel: label });
  });

  it("confirme la config créneaux et services inchangés", () => {
    expect(BOOKING_TIME_SLOTS).toEqual(["09:00", "10:30", "12:00", "14:30", "16:00", "17:30"]);
    expect(bookingConfig.timeZone).toBe("Europe/Paris");
    expect(bookingConfig.locale).toBe("fr-FR");
    expect(bookingConfig.horizonDays).toBe(90);
    expect(bookingConfig.selectableWeekdays).toEqual([1, 2, 3, 4, 5, 6]);
    expect(bookingConfig.openingHours.daysLabel).toBe("Lundi – Samedi");
    expect(bookingConfig.openingHours.hoursLabel).toBe("09h00 – 19h00");
    expect(bookingConfig.timeSlots).toBe(BOOKING_TIME_SLOTS);
    expect(services).toHaveLength(6);
  });
});
