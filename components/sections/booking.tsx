import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Section Réservation WhatsApp — Server Component.
 * Contenu factuel uniquement ; aucune promesse de délai ni message prérempli.
 */
export function Booking() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <Section
      id="reserver"
      tone="ink"
      className="relative isolate overflow-hidden"
      aria-labelledby="booking-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_srgb,var(--color-gold)_16%,transparent),transparent_55%)]"
      />

      <Container className="relative z-10 flex max-w-3xl flex-col items-start gap-6 py-4 md:items-center md:text-center lg:py-6">
        <h2
          id="booking-heading"
          className="font-display text-2xl font-semibold tracking-tight text-on-dark sm:text-3xl md:text-4xl"
        >
          Réservez votre prestation
        </h2>
        <p className="max-w-prose font-sans text-base text-on-dark-muted sm:text-lg">
          Contactez Prisca directement sur WhatsApp pour échanger sur votre demande.
        </p>
        <div className="w-full pt-1 sm:w-auto">
          <LinkButton href={whatsappUrl} size="lg" className="w-full justify-center sm:w-auto">
            Réserver sur WhatsApp
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
