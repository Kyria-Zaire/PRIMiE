import { BookingRequestWidget } from "@/components/booking/booking-request-widget";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { bookingConfig } from "@/content/booking";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";

function GoldCurves() {
  return (
    <svg
      viewBox="0 0 220 120"
      className="pointer-events-none absolute top-0 right-0 h-24 w-40 text-gold/55 sm:h-28 sm:w-48 lg:h-32 lg:w-56"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 100C60 20 120 10 210 40"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10 85C55 15 130 0 215 55"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M30 110C75 45 145 25 205 70"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

/**
 * Section Réservation / Contact — Server Component.
 * Compose le widget Client `BookingRequestWidget` (demande WhatsApp interactive).
 */
export function ContactBooking() {
  const serviceOptions = services.map((service) => ({
    id: service.id,
    title: service.title,
  }));

  return (
    <Section
      id="reserver"
      tone="ink"
      className="relative isolate overflow-hidden"
      aria-labelledby="contact-booking-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,color-mix(in_srgb,var(--color-gold)_14%,transparent),transparent_55%)]"
      />

      <Container className="relative z-10">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/75 bg-black shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-gold)_28%,transparent),0_20px_52px_-26px_color-mix(in_srgb,var(--color-bronze)_60%,transparent)] ring-1 ring-gold/40 sm:rounded-[2rem]">
          <div className="relative border-b border-bronze/30 px-5 py-3.5 sm:px-8 sm:py-4 lg:px-10 lg:py-5">
            <GoldCurves />
            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
              <h2
                id="contact-booking-heading"
                className="font-display text-2xl font-semibold tracking-tight text-balance text-gold sm:text-3xl md:text-4xl"
              >
                Contactez PRiMiE Coiffure
              </h2>
              <p className="max-w-prose font-sans text-sm text-on-dark-muted sm:text-base">
                {bookingConfig.copy.subtitle}
              </p>
            </div>
          </div>

          <div className="px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
            <BookingRequestWidget
              services={serviceOptions}
              config={bookingConfig}
              brand={{
                activity: siteConfig.brand.activity,
              }}
              contact={{
                phoneDisplay: siteConfig.contact.phoneDisplay,
                phoneE164: siteConfig.contact.phoneE164,
                whatsappUrl: siteConfig.contact.whatsappUrl,
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
