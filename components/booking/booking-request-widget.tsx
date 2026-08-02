"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  bookingConfig as defaultBookingConfig,
  type BookingConfig,
  type BookingTimeSlot,
} from "@/content/booking";
import type { ServiceId } from "@/content/services";
import { services as canonicalServices } from "@/content/services";
import {
  buildCalendarMonth,
  canNavigateToNextMonth,
  canNavigateToPreviousMonth,
  formatBookingDateFr,
  formatBookingTimeFr,
  getTodayInTimeZone,
  shiftMonth,
  toIsoDate,
  type CalendarMonth,
} from "@/lib/booking/calendar";
import { buildBookingWhatsAppUrl } from "@/lib/booking/message";
import {
  MOBILE_CONTINUE_LABELS,
  MOBILE_MODIFY_INFO_LABEL,
  MOBILE_STEP_TITLES,
  canOpenMobileStep,
  getMobileStepLockMessage,
  getMobileStepProgressLabel,
  hasInfoFieldErrors,
  pickInfoFieldErrors,
  type MobileBookingStep,
} from "@/lib/booking/mobile-steps";
import {
  validateBookingRequest,
  type BookingField,
  type BookingRequest,
  type BookingValidationErrors,
} from "@/lib/booking/validation";

const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] as const;

export type BookingServiceOption = {
  readonly id: ServiceId;
  readonly title: string;
};

export type BookingRequestWidgetProps = {
  readonly services: readonly BookingServiceOption[];
  readonly config?: BookingConfig;
  readonly brand: {
    readonly activity: string;
  };
  readonly contact: {
    readonly phoneDisplay: string;
    readonly phoneE164: string;
    readonly whatsappUrl: string;
  };
};

type ViewMonth = {
  readonly year: number;
  readonly month: number;
};

function ChevronIcon({ direction }: { readonly direction: "prev" | "next" | "down" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-5"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {direction === "prev" ? (
        <path
          d="M12.5 4.5 7 10l5.5 5.5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
      {direction === "next" ? (
        <path
          d="M7.5 4.5 13 10l-5.5 5.5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
      {direction === "down" ? (
        <path
          d="M5 7.5 10 12.5 15 7.5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-gold" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6.5V10l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-gold" fill="none" aria-hidden="true">
      <path
        d="M10 17s5-4.2 5-8.2A5 5 0 0 0 5 8.8C5 12.8 10 17 10 17Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-gold" fill="none" aria-hidden="true">
      <path
        d="M6.2 3.8h2.1l1 3.1-1.4 1a8.6 8.6 0 0 0 4.2 4.2l1-1.4 3.1 1v2.1a1.4 1.4 0 0 1-1.5 1.4A11.6 11.6 0 0 1 4.8 5.3a1.4 1.4 0 0 1 1.4-1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 shrink-0 text-gold" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="4.5"
        width="13"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.5 8.5h13M7 3v3M13 3v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.2 6.4 11l6.1-6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MobileContinueButton({
  label,
  disabled,
  onClick,
}: {
  readonly label: string;
  readonly disabled: boolean;
  readonly onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-transparent bg-cta-gold px-5 font-sans text-base font-semibold text-primary-foreground transition-[opacity,background-color,border-color,color] duration-short ease-soft hover:opacity-90 disabled:cursor-not-allowed disabled:border-bronze/25 disabled:bg-black/40 disabled:bg-none disabled:text-on-dark-muted disabled:opacity-100 lg:hidden"
    >
      {label}
    </button>
  );
}

function StepAccordionHeader({
  step,
  title,
  summary,
  expanded,
  locked,
  lockMessage,
  triggerId,
  panelId,
  lockId,
  triggerRef,
  onToggle,
}: {
  readonly step: MobileBookingStep;
  readonly title: string;
  readonly summary: string | null;
  readonly expanded: boolean;
  readonly locked: boolean;
  readonly lockMessage: string | null;
  readonly triggerId: string;
  readonly panelId: string;
  readonly lockId: string;
  readonly triggerRef: (node: HTMLButtonElement | null) => void;
  readonly onToggle: () => void;
}) {
  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        aria-expanded={expanded}
        aria-controls={panelId}
        aria-describedby={locked && lockMessage ? lockId : undefined}
        disabled={locked}
        onClick={onToggle}
        className={[
          "flex min-h-12 w-full items-start gap-3 rounded-xl px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus",
          locked
            ? "cursor-not-allowed border border-bronze/25 bg-black/30"
            : "border border-bronze/40 bg-black/45",
        ].join(" ")}
      >
        <span
          className={[
            "inline-flex size-8 shrink-0 items-center justify-center rounded-full border font-sans text-sm font-semibold",
            locked ? "border-bronze/35 text-on-dark-muted" : "border-gold/50 text-gold",
          ].join(" ")}
        >
          {step}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={[
              "block font-display text-lg font-semibold",
              locked ? "text-on-dark-muted" : "text-gold",
            ].join(" ")}
          >
            {title}
          </span>
          {summary ? (
            <span className="mt-0.5 block font-sans text-sm text-on-dark-muted">{summary}</span>
          ) : null}
        </span>
        {locked ? (
          <span className="mt-1.5 shrink-0 text-on-dark-muted" aria-hidden="true">
            <LockIcon />
          </span>
        ) : (
          <span
            className={[
              "mt-1 shrink-0 text-gold transition-transform duration-short ease-soft motion-reduce:transition-none",
              expanded ? "rotate-180" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            <ChevronIcon direction="down" />
          </span>
        )}
      </button>
      {locked && lockMessage ? (
        <p id={lockId} className="mt-2 font-sans text-sm text-on-dark-muted">
          {lockMessage}
        </p>
      ) : null}
    </div>
  );
}

function DesktopPanelTitle({
  title,
  titleId,
  titleClassName = "",
}: {
  readonly title: string;
  readonly titleId: string;
  readonly titleClassName?: string;
}) {
  return (
    <h3
      id={titleId}
      className={[
        "mb-2.5 hidden font-display font-semibold tracking-tight text-gold lg:block",
        titleClassName || "text-xl text-balance sm:text-2xl",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title}
    </h3>
  );
}

/**
 * Widget interactif de demande de rendez-vous WhatsApp.
 * Desktop ≥ lg : grille 01C-R1. Sous lg : parcours déroulant 4 étapes (01D).
 */
export function BookingRequestWidget({
  services,
  config = defaultBookingConfig,
  brand,
  contact,
}: BookingRequestWidgetProps) {
  const baseId = useId();
  const formId = `${baseId}-form`;
  const nameId = `${baseId}-name`;
  const phoneId = `${baseId}-phone`;
  const serviceIdField = `${baseId}-service`;
  const nameErrorId = `${baseId}-name-error`;
  const phoneErrorId = `${baseId}-phone-error`;
  const serviceErrorId = `${baseId}-service-error`;
  const dateErrorId = `${baseId}-date-error`;
  const timeErrorId = `${baseId}-time-error`;
  const summaryErrorId = `${baseId}-summary-errors`;

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const stepTriggerRefs = useRef<Partial<Record<MobileBookingStep, HTMLButtonElement | null>>>({});

  const [todayIso, setTodayIso] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState<ViewMonth | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<BookingTimeSlot | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState<ServiceId | "">("");
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [infoAttempted, setInfoAttempted] = useState(false);
  const [mobileStep, setMobileStep] = useState<MobileBookingStep>(1);

  useEffect(() => {
    const today = getTodayInTimeZone(new Date(), config.timeZone);
    setTodayIso(toIsoDate(today));
    setViewMonth({ year: today.year, month: today.month });
  }, [config.timeZone]);

  const calendar: CalendarMonth | null = useMemo(() => {
    if (!todayIso || !viewMonth) {
      return null;
    }
    return buildCalendarMonth({
      year: viewMonth.year,
      month: viewMonth.month,
      todayIso,
      selectedIso: selectedDate,
      config,
    });
  }, [todayIso, viewMonth, selectedDate, config]);

  const canGoPrev =
    todayIso && viewMonth
      ? canNavigateToPreviousMonth(viewMonth.year, viewMonth.month, todayIso, config)
      : false;
  const canGoNext =
    todayIso && viewMonth
      ? canNavigateToNextMonth(viewMonth.year, viewMonth.month, todayIso, config)
      : false;

  const dateSummary = selectedDate
    ? (formatBookingDateFr(selectedDate, config.locale) ?? "à choisir")
    : "à choisir";
  const timeSummary = selectedSlot
    ? (formatBookingTimeFr(selectedSlot) ?? "à choisir")
    : "à choisir";
  const serviceTitle =
    serviceId === "" ? null : (services.find((service) => service.id === serviceId)?.title ?? null);

  const gateInput = {
    selectedDate,
    selectedSlot,
    name,
    phone,
    serviceId,
  };

  const isFormComplete =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    serviceId !== "" &&
    selectedDate !== "" &&
    selectedSlot !== "";

  function focusStepTrigger(step: MobileBookingStep) {
    requestAnimationFrame(() => {
      stepTriggerRefs.current[step]?.focus();
    });
  }

  function openMobileStep(step: MobileBookingStep) {
    if (!canOpenMobileStep(step, gateInput)) {
      return;
    }
    setMobileStep(step);
    focusStepTrigger(step);
  }

  function toggleMobileStep(step: MobileBookingStep) {
    if (!canOpenMobileStep(step, gateInput)) {
      return;
    }
    if (mobileStep === step) {
      return;
    }
    setMobileStep(step);
  }

  function focusFirstError(nextErrors: BookingValidationErrors) {
    const order: BookingField[] = ["name", "phone", "serviceId", "date", "timeSlot"];
    const first = order.find((field) => nextErrors[field]);
    const focusField = () => {
      if (first === "name") {
        nameRef.current?.focus();
        return;
      }
      if (first === "phone") {
        phoneRef.current?.focus();
        return;
      }
      if (first === "serviceId") {
        serviceRef.current?.focus();
        return;
      }
      errorSummaryRef.current?.focus();
    };

    if (first === "name" || first === "phone" || first === "serviceId") {
      setMobileStep(3);
      requestAnimationFrame(() => {
        requestAnimationFrame(focusField);
      });
      return;
    }
    if (first === "date") {
      setMobileStep(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(focusField);
      });
      return;
    }
    if (first === "timeSlot") {
      setMobileStep(2);
      requestAnimationFrame(() => {
        requestAnimationFrame(focusField);
      });
      return;
    }
    focusField();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!todayIso) {
      return;
    }

    setSubmitted(true);
    const request: BookingRequest = {
      name,
      phone,
      serviceId,
      date: selectedDate,
      timeSlot: selectedSlot,
    };
    const result = validateBookingRequest(request, {
      todayIso,
      services: canonicalServices,
      config,
    });

    if (!result.success) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }

    setErrors({});
    const url = buildBookingWhatsAppUrl(result.value, canonicalServices);
    window.location.assign(url);
  }

  function handleVerifyInfo() {
    if (!todayIso) {
      return;
    }
    setInfoAttempted(true);
    const request: BookingRequest = {
      name,
      phone,
      serviceId,
      date: selectedDate,
      timeSlot: selectedSlot,
    };
    const result = validateBookingRequest(request, {
      todayIso,
      services: canonicalServices,
      config,
    });
    const infoErrors = pickInfoFieldErrors(result.success ? {} : result.errors);
    if (hasInfoFieldErrors(infoErrors)) {
      setErrors((current) => ({
        ...current,
        ...infoErrors,
      }));
      focusFirstError(infoErrors);
      return;
    }
    setErrors((current) => {
      const next = { ...current };
      delete next.name;
      delete next.phone;
      delete next.serviceId;
      return next;
    });
    openMobileStep(4);
  }

  const visibleErrors = {
    ...(submitted || infoAttempted
      ? {
          name: errors.name,
          phone: errors.phone,
          serviceId: errors.serviceId,
        }
      : {}),
    ...(submitted
      ? {
          date: errors.date,
          timeSlot: errors.timeSlot,
        }
      : {}),
  };
  const hasVisibleErrors = Object.values(visibleErrors).some(Boolean);

  function panelVisibility(step: MobileBookingStep): string {
    return mobileStep === step ? "block" : "hidden lg:block";
  }

  function renderCalendar(): ReactNode {
    return (
      <>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-gold disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Mois précédent"
            disabled={!canGoPrev}
            onClick={() => {
              if (!viewMonth) {
                return;
              }
              const prev = shiftMonth(viewMonth.year, viewMonth.month, -1);
              setViewMonth({ year: prev.year, month: prev.month });
            }}
          >
            <ChevronIcon direction="prev" />
          </button>
          <p className="font-display text-lg font-semibold capitalize text-gold sm:text-xl">
            {calendar?.label ?? "Chargement…"}
          </p>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-gold disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Mois suivant"
            disabled={!canGoNext}
            onClick={() => {
              if (!viewMonth) {
                return;
              }
              const next = shiftMonth(viewMonth.year, viewMonth.month, 1);
              setViewMonth({ year: next.year, month: next.month });
            }}
          >
            <ChevronIcon direction="next" />
          </button>
        </div>

        <div className="mt-3" aria-busy={calendar ? undefined : true} aria-live="polite">
          <div className="grid grid-cols-7 gap-1.5 text-center font-sans text-xs text-on-dark-muted sm:text-sm">
            {WEEKDAY_LABELS.map((label) => (
              <span key={label} className="py-1">
                {label}
              </span>
            ))}
          </div>
          <div className="mt-1.5 grid grid-cols-7 gap-1.5">
            {(
              calendar?.cells ??
              Array.from({ length: 42 }, (_, index) => ({
                kind: "empty" as const,
                key: `skeleton-${index}`,
              }))
            ).map((cell) => {
              if (cell.kind === "empty") {
                return <div key={cell.key} className="min-h-11" aria-hidden="true" />;
              }

              const selected = cell.isSelected;
              const today = cell.isToday;

              return (
                <button
                  key={cell.key}
                  type="button"
                  aria-label={cell.ariaLabel}
                  aria-pressed={selected}
                  disabled={cell.isDisabled}
                  onClick={() => {
                    setSelectedDate(cell.isoDate);
                    if (submitted) {
                      setErrors((current) => {
                        const next = { ...current };
                        delete next.date;
                        return next;
                      });
                    }
                  }}
                  className={[
                    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg font-sans text-sm font-medium transition-[background-color,color,box-shadow] duration-short ease-soft",
                    cell.isDisabled
                      ? "cursor-not-allowed bg-black/35 text-on-dark-muted/50"
                      : "bg-black/55 text-on-dark hover:border-gold/50 hover:bg-rich-black",
                    !cell.isDisabled && !selected ? "border border-bronze/30" : "",
                    selected
                      ? "border border-gold bg-cta-gold font-semibold text-primary-foreground shadow-soft"
                      : "",
                    today && !selected
                      ? "ring-1 ring-gold/70 ring-offset-1 ring-offset-rich-black"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
        {visibleErrors.date ? (
          <p id={dateErrorId} className="mt-3 font-sans text-sm text-danger" role="alert">
            {visibleErrors.date}
          </p>
        ) : null}
      </>
    );
  }

  function renderSlots(): ReactNode {
    return (
      <>
        <p className="mb-2.5 font-sans text-sm text-on-dark-muted">
          Créneau souhaité — confirmation par Prisca.
        </p>
        <div className="flex flex-col gap-2.5" role="group" aria-label="Créneaux horaires">
          {config.timeSlots.map((slot) => {
            const selected = selectedSlot === slot;
            const label = formatBookingTimeFr(slot) ?? slot;
            return (
              <button
                key={slot}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setSelectedSlot(slot);
                  if (submitted) {
                    setErrors((current) => {
                      const next = { ...current };
                      delete next.timeSlot;
                      return next;
                    });
                  }
                }}
                className={[
                  "inline-flex min-h-11 w-full items-center justify-between rounded-xl border px-4 font-sans text-base font-medium transition-[background-color,color,border-color] duration-short ease-soft",
                  selected
                    ? "border-gold bg-cta-gold text-primary-foreground"
                    : "border-gold/45 bg-transparent text-on-dark hover:border-gold hover:bg-black/40",
                ].join(" ")}
              >
                <span>{label}</span>
                {selected ? <CheckIcon /> : null}
              </button>
            );
          })}
        </div>
        {visibleErrors.timeSlot ? (
          <p id={timeErrorId} className="mt-3 font-sans text-sm text-danger" role="alert">
            {visibleErrors.timeSlot}
          </p>
        ) : null}
      </>
    );
  }

  function renderInfoFields(): ReactNode {
    return (
      <>
        {hasVisibleErrors ? (
          <div
            ref={errorSummaryRef}
            id={summaryErrorId}
            tabIndex={-1}
            className="rounded-xl border border-danger/40 bg-black/40 px-4 py-3 font-sans text-sm text-on-dark outline-none"
            aria-live="polite"
          >
            <p className="font-semibold text-danger">Vérifiez les champs indiqués.</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-on-dark-muted">
              {Object.entries(visibleErrors).map(([field, message]) =>
                message ? <li key={field}>{message}</li> : null,
              )}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <label htmlFor={nameId} className="font-sans text-sm font-medium text-on-dark">
            Votre nom
          </label>
          <input
            ref={nameRef}
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            aria-invalid={visibleErrors.name ? true : undefined}
            aria-describedby={visibleErrors.name ? nameErrorId : undefined}
            onChange={(event) => {
              setName(event.target.value);
              if (submitted || infoAttempted) {
                setErrors((current) => {
                  const next = { ...current };
                  delete next.name;
                  return next;
                });
              }
            }}
            className="min-h-11 rounded-xl border border-gold/40 bg-black/40 px-4 font-sans text-base text-on-dark placeholder:text-on-dark-muted/70"
            placeholder="Entrez votre nom"
          />
          {visibleErrors.name ? (
            <p id={nameErrorId} className="font-sans text-sm text-danger" role="alert">
              {visibleErrors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={phoneId} className="font-sans text-sm font-medium text-on-dark">
            Votre téléphone
          </label>
          <input
            ref={phoneRef}
            id={phoneId}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            aria-invalid={visibleErrors.phone ? true : undefined}
            aria-describedby={visibleErrors.phone ? phoneErrorId : undefined}
            onChange={(event) => {
              setPhone(event.target.value);
              if (submitted || infoAttempted) {
                setErrors((current) => {
                  const next = { ...current };
                  delete next.phone;
                  return next;
                });
              }
            }}
            className="min-h-11 rounded-xl border border-gold/40 bg-black/40 px-4 font-sans text-base text-on-dark placeholder:text-on-dark-muted/70"
            placeholder="Entrez votre téléphone"
          />
          {visibleErrors.phone ? (
            <p id={phoneErrorId} className="font-sans text-sm text-danger" role="alert">
              {visibleErrors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={serviceIdField} className="font-sans text-sm font-medium text-on-dark">
            Prestation
          </label>
          <select
            ref={serviceRef}
            id={serviceIdField}
            name="serviceId"
            value={serviceId}
            aria-invalid={visibleErrors.serviceId ? true : undefined}
            aria-describedby={visibleErrors.serviceId ? serviceErrorId : undefined}
            onChange={(event) => {
              setServiceId(event.target.value as ServiceId | "");
              if (submitted || infoAttempted) {
                setErrors((current) => {
                  const next = { ...current };
                  delete next.serviceId;
                  return next;
                });
              }
            }}
            className="min-h-11 rounded-xl border border-gold/40 bg-black/40 px-4 font-sans text-base text-on-dark"
          >
            <option value="">Choisissez une prestation</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          {visibleErrors.serviceId ? (
            <p id={serviceErrorId} className="font-sans text-sm text-danger" role="alert">
              {visibleErrors.serviceId}
            </p>
          ) : null}
        </div>
      </>
    );
  }

  const step1PanelId = `${baseId}-step-1-panel`;
  const step2PanelId = `${baseId}-step-2-panel`;
  const step3PanelId = `${baseId}-step-3-panel`;
  const step4PanelId = `${baseId}-step-4-panel`;

  return (
    <div className="flex flex-col gap-3 lg:gap-3">
      <p className="font-sans text-sm text-on-dark-muted lg:hidden" aria-live="polite">
        {getMobileStepProgressLabel(mobileStep)}
      </p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
        <section
          aria-labelledby={`${baseId}-calendar-title`}
          className="rounded-2xl border border-bronze/35 bg-rich-black/70 p-3 sm:p-3.5 lg:col-span-4"
        >
          <StepAccordionHeader
            step={1}
            title={MOBILE_STEP_TITLES[1]}
            summary={selectedDate ? dateSummary : null}
            expanded={mobileStep === 1}
            locked={false}
            lockMessage={null}
            triggerId={`${baseId}-step-1-trigger`}
            panelId={step1PanelId}
            lockId={`${baseId}-step-1-lock`}
            triggerRef={(node) => {
              stepTriggerRefs.current[1] = node;
            }}
            onToggle={() => toggleMobileStep(1)}
          />
          <DesktopPanelTitle title="Choisissez votre date" titleId={`${baseId}-calendar-title`} />
          <div id={step1PanelId} role="region" className={`mt-2.5 ${panelVisibility(1)}`}>
            {renderCalendar()}
            <MobileContinueButton
              label={MOBILE_CONTINUE_LABELS[1]}
              disabled={!selectedDate}
              onClick={() => openMobileStep(2)}
            />
          </div>
        </section>

        <section
          aria-labelledby={`${baseId}-slots-title`}
          className="rounded-2xl border border-bronze/35 bg-rich-black/70 p-3 sm:p-3.5 lg:col-span-3"
        >
          <StepAccordionHeader
            step={2}
            title={MOBILE_STEP_TITLES[2]}
            summary={selectedSlot ? timeSummary : null}
            expanded={mobileStep === 2}
            locked={!canOpenMobileStep(2, gateInput)}
            lockMessage={getMobileStepLockMessage(2, gateInput)}
            triggerId={`${baseId}-step-2-trigger`}
            panelId={step2PanelId}
            lockId={`${baseId}-step-2-lock`}
            triggerRef={(node) => {
              stepTriggerRefs.current[2] = node;
            }}
            onToggle={() => toggleMobileStep(2)}
          />
          <DesktopPanelTitle
            title="Choisissez votre créneau"
            titleId={`${baseId}-slots-title`}
            titleClassName="text-[clamp(1.05rem,0.55vw+0.9rem,1.5rem)] leading-snug text-pretty xl:whitespace-nowrap"
          />
          <div id={step2PanelId} role="region" className={`mt-2.5 ${panelVisibility(2)}`}>
            {renderSlots()}
            <MobileContinueButton
              label={MOBILE_CONTINUE_LABELS[2]}
              disabled={!selectedSlot}
              onClick={() => openMobileStep(3)}
            />
          </div>
        </section>

        <section
          aria-labelledby={`${baseId}-details-title`}
          className="rounded-2xl border border-bronze/35 bg-rich-black/70 p-3 sm:p-3.5 lg:col-span-5 lg:row-span-2"
        >
          <StepAccordionHeader
            step={3}
            title={MOBILE_STEP_TITLES[3]}
            summary={serviceTitle}
            expanded={mobileStep === 3}
            locked={!canOpenMobileStep(3, gateInput)}
            lockMessage={getMobileStepLockMessage(3, gateInput)}
            triggerId={`${baseId}-step-3-trigger`}
            panelId={step3PanelId}
            lockId={`${baseId}-step-3-lock`}
            triggerRef={(node) => {
              stepTriggerRefs.current[3] = node;
            }}
            onToggle={() => toggleMobileStep(3)}
          />
          <DesktopPanelTitle title="Détails de la demande" titleId={`${baseId}-details-title`} />
          <div id={step3PanelId} role="region" className={`mt-2.5 ${panelVisibility(3)}`}>
            <form id={formId} className="flex flex-col gap-3" noValidate onSubmit={handleSubmit}>
              {renderInfoFields()}

              <div
                className="hidden rounded-xl border border-bronze/40 bg-black/50 px-4 py-3 lg:block"
                aria-live="polite"
              >
                <p className="flex items-start gap-2 font-sans text-sm text-on-dark sm:text-base">
                  <CalendarIcon />
                  <span>Date : {selectedDate ? dateSummary : "à choisir"}</span>
                </p>
                <p className="mt-2 flex items-start gap-2 font-sans text-sm text-on-dark sm:text-base">
                  <ClockIcon />
                  <span>Heure : {selectedSlot ? timeSummary : "à choisir"}</span>
                </p>
              </div>

              <p className="hidden font-sans text-sm text-on-dark-muted lg:block">
                {config.copy.confirmationNote}
              </p>

              <button
                type="submit"
                disabled={!isFormComplete || !todayIso}
                className="hidden min-h-12 w-full items-center justify-center rounded-md border border-transparent bg-cta-gold px-6 font-sans text-lg font-semibold text-primary-foreground transition-[color,background-color,border-color,opacity,background-image] duration-short ease-soft hover:opacity-90 disabled:cursor-not-allowed disabled:border-bronze/65 disabled:bg-black/85 disabled:bg-none disabled:text-ivory disabled:opacity-100 lg:inline-flex"
              >
                {config.copy.ctaLabel}
              </button>

              <MobileContinueButton
                label={MOBILE_CONTINUE_LABELS[3]}
                disabled={false}
                onClick={handleVerifyInfo}
              />
            </form>
          </div>
        </section>

        <section
          aria-labelledby={`${baseId}-review-title`}
          className="rounded-2xl border border-bronze/35 bg-rich-black/70 p-3 sm:p-3.5 lg:hidden"
        >
          <StepAccordionHeader
            step={4}
            title={MOBILE_STEP_TITLES[4]}
            summary={null}
            expanded={mobileStep === 4}
            locked={!canOpenMobileStep(4, gateInput)}
            lockMessage={getMobileStepLockMessage(4, gateInput)}
            triggerId={`${baseId}-step-4-trigger`}
            panelId={step4PanelId}
            lockId={`${baseId}-step-4-lock`}
            triggerRef={(node) => {
              stepTriggerRefs.current[4] = node;
            }}
            onToggle={() => toggleMobileStep(4)}
          />
          <h3 id={`${baseId}-review-title`} className="sr-only">
            {MOBILE_STEP_TITLES[4]}
          </h3>
          <div
            id={step4PanelId}
            role="region"
            className={`mt-2.5 ${mobileStep === 4 ? "block" : "hidden"}`}
          >
            <dl className="space-y-3 rounded-xl border border-bronze/40 bg-black/50 px-4 py-3 font-sans text-sm text-on-dark sm:text-base">
              <div>
                <dt className="text-on-dark-muted">Nom</dt>
                <dd className="font-medium">{name.trim() || "—"}</dd>
              </div>
              <div>
                <dt className="text-on-dark-muted">Téléphone</dt>
                <dd className="font-medium">{phone.trim() || "—"}</dd>
              </div>
              <div>
                <dt className="text-on-dark-muted">Prestation</dt>
                <dd className="font-medium">{serviceTitle ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-on-dark-muted">Date souhaitée</dt>
                <dd className="font-medium">{selectedDate ? dateSummary : "—"}</dd>
              </div>
              <div>
                <dt className="text-on-dark-muted">Créneau souhaité</dt>
                <dd className="font-medium">{selectedSlot ? timeSummary : "—"}</dd>
              </div>
            </dl>

            <p className="mt-3 font-sans text-sm text-on-dark-muted">
              {config.copy.confirmationNote}
            </p>

            <button
              type="submit"
              form={formId}
              disabled={!isFormComplete || !todayIso}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-transparent bg-cta-gold px-6 font-sans text-lg font-semibold text-primary-foreground transition-[color,background-color,border-color,opacity,background-image] duration-short ease-soft hover:opacity-90 disabled:cursor-not-allowed disabled:border-bronze/65 disabled:bg-black/85 disabled:bg-none disabled:text-ivory disabled:opacity-100"
            >
              {config.copy.ctaLabel}
            </button>

            <button
              type="button"
              onClick={() => openMobileStep(3)}
              className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-gold/45 bg-transparent px-5 font-sans text-base font-medium text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
            >
              {MOBILE_MODIFY_INFO_LABEL}
            </button>
          </div>
        </section>

        <div
          id="contact"
          className="scroll-mt-24 rounded-2xl border border-bronze/35 bg-rich-black/70 p-3 sm:p-3.5 lg:col-span-7"
        >
          <h3 className="sr-only">Coordonnées et informations</h3>
          <address className="not-italic">
            <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <li className="flex min-w-0 items-start gap-3">
                <ClockIcon />
                <div className="min-w-0 font-sans text-sm text-pretty text-on-dark sm:text-base">
                  <p className="font-medium text-gold">{config.openingHours.daysLabel}</p>
                  <p>{config.openingHours.hoursLabel}</p>
                  <p className="text-on-dark-muted">{config.openingHours.appointmentOnlyLabel}</p>
                </div>
              </li>
              <li className="flex min-w-0 items-start gap-3">
                <PinIcon />
                <div className="min-w-0 font-sans text-sm text-pretty text-on-dark sm:text-base">
                  <p className="font-medium text-gold">Prestations à domicile</p>
                  <p className="text-on-dark-muted">{brand.activity}</p>
                </div>
              </li>
              <li className="flex min-w-0 items-start gap-3">
                <PhoneIcon />
                <div className="flex min-w-0 flex-col gap-2 font-sans text-sm text-on-dark sm:text-base">
                  <p className="font-medium text-gold">Appelez-nous</p>
                  <a
                    href={`tel:${contact.phoneE164}`}
                    className="inline-flex min-h-11 items-center font-semibold text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={contact.whatsappUrl}
                    className="inline-flex min-h-11 items-center font-semibold text-gold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                  >
                    WhatsApp
                  </a>
                </div>
              </li>
            </ul>
          </address>
        </div>
      </div>
    </div>
  );
}
