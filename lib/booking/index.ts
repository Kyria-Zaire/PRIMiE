export { bookingConfig, BOOKING_TIME_SLOTS, BOOKING_SELECTABLE_WEEKDAYS } from "@/content/booking";
export type { BookingConfig, BookingTimeSlot } from "@/content/booking";

export {
  parseIsoDate,
  toIsoDate,
  compareIsoDates,
  addDays,
  getTodayInTimeZone,
  getTodayIsoInTimeZone,
  getIsoWeekday,
  getMondayFirstWeekdayIndex,
  buildCalendarMonth,
  isDateWithinBookingWindow,
  isSelectableBookingDate,
  canNavigateToPreviousMonth,
  canNavigateToNextMonth,
  formatBookingDateFr,
  formatBookingTimeFr,
  shiftMonth,
  isSunday,
  daysInMonth,
} from "@/lib/booking/calendar";
export type { CalendarDate, CalendarCell, CalendarMonth } from "@/lib/booking/calendar";

export {
  validateBookingRequest,
  isSoftValidPhone,
  countPhoneDigits,
} from "@/lib/booking/validation";
export type {
  BookingRequest,
  ValidBookingRequest,
  BookingField,
  BookingValidationErrors,
  BookingValidationResult,
} from "@/lib/booking/validation";

export { buildBookingWhatsAppMessage, buildBookingWhatsAppUrl } from "@/lib/booking/message";

export {
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
} from "@/lib/booking/mobile-steps";
export type {
  MobileBookingStep,
  MobileStepGateInput,
  InfoFieldErrors,
} from "@/lib/booking/mobile-steps";
