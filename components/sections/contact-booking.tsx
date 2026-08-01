import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const panelClass =
  "group rounded-2xl border border-bronze/40 bg-black/55 shadow-soft open:border-gold/45";

const summaryClass =
  "flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 font-display text-lg font-semibold tracking-tight text-on-dark marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:px-6 sm:text-xl lg:hidden [&::-webkit-details-marker]:hidden";

const panelBodyClass =
  "hidden flex-col gap-4 border-t border-bronze/25 px-5 py-4 group-open:flex sm:px-6 sm:py-5 lg:flex lg:border-t-0 lg:p-7";

/**
 * Section fusionnée Réservation + Contact — Server Component.
 * Desktop (lg+) : grille 2 colonnes 01B. Mobile : disclosures natifs.
 * CTA principal hors details ; `#contact` sur le details Coordonnées.
 */
export function ContactBooking() {
  const bookingWhatsAppUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);
  const contactWhatsAppUrl = buildWhatsAppUrl();
  const phoneHref = `tel:${siteConfig.contact.phoneE164}`;

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

      <Container className="relative z-10 flex flex-col gap-8 md:gap-10 lg:gap-12">
        <div className="flex max-w-3xl flex-col items-start gap-5 md:items-center md:text-center lg:mx-auto">
          <p className="font-sans text-xs font-medium tracking-[0.16em] text-gold uppercase">
            Réservation & contact
          </p>
          <h2
            id="contact-booking-heading"
            className="font-display text-2xl font-semibold tracking-tight text-balance text-on-dark sm:text-3xl md:text-4xl"
          >
            Contactez PRiMiE Coiffure
          </h2>
          <p className="max-w-prose font-sans text-base text-on-dark-muted sm:text-lg">
            Échangez directement avec Prisca sur WhatsApp pour préciser votre prestation et votre
            demande.
          </p>
          <div className="flex w-full flex-col gap-2.5 pt-1 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <LinkButton
              href={bookingWhatsAppUrl}
              size="lg"
              className="w-full justify-center sm:w-auto"
            >
              Réserver sur WhatsApp
            </LinkButton>
            <LinkButton
              href="#services"
              variant="secondary"
              size="lg"
              className="w-full justify-center border border-gold/40 bg-transparent text-on-dark hover:bg-rich-black sm:w-auto"
            >
              Découvrir nos services
            </LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          <details open className={panelClass}>
            <summary className={summaryClass}>
              <span>Comment réserver ?</span>
              <span
                aria-hidden="true"
                className="inline-flex size-6 shrink-0 items-center justify-center text-gold motion-safe:transition-transform motion-safe:duration-short motion-safe:ease-soft group-open:rotate-45"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor">
                  <path d="M3 8h10M8 3v10" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className={panelBodyClass}>
              <h3 className="font-display text-xl font-semibold tracking-tight text-on-dark sm:text-2xl">
                Réserver votre prestation
              </h3>
              <p className="font-sans text-sm font-medium text-on-dark sm:text-base">
                {siteConfig.brand.activity}
              </p>
              <p className="font-sans text-sm text-gold sm:text-base">Prestations à domicile</p>
              <p className="font-sans text-sm leading-relaxed text-on-dark-muted sm:text-base">
                Contactez Prisca sur WhatsApp, précisez la prestation souhaitée, puis attendez la
                confirmation des détails et de la disponibilité.
              </p>
              <a
                href="#services"
                className="inline-flex min-h-11 items-center font-sans text-sm font-semibold text-gold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:text-base"
              >
                Découvrir nos services
              </a>
            </div>
          </details>

          <details id="contact" className={`scroll-mt-24 ${panelClass}`}>
            <summary className={summaryClass}>
              <span>Coordonnées</span>
              <span
                aria-hidden="true"
                className="inline-flex size-6 shrink-0 items-center justify-center text-gold motion-safe:transition-transform motion-safe:duration-short motion-safe:ease-soft group-open:rotate-45"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor">
                  <path d="M3 8h10M8 3v10" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className={panelBodyClass}>
              <h3 className="font-display text-xl font-semibold tracking-tight text-on-dark sm:text-2xl">
                Coordonnées
              </h3>
              <p className="font-sans text-sm text-gold sm:text-base">Prestations à domicile</p>
              <address className="not-italic">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-sans text-base font-medium text-on-dark">
                      {siteConfig.brand.commercialName}
                    </p>
                    <p className="font-sans text-sm text-on-dark-muted sm:text-base">
                      {siteConfig.brand.activity}
                    </p>
                  </div>
                  <ul className="grid list-none grid-cols-1 gap-3 sm:gap-4">
                    <li className="min-w-0">
                      <p className="mb-1 font-sans text-xs font-medium tracking-[0.12em] text-bronze uppercase">
                        Téléphone
                      </p>
                      <a
                        href={phoneHref}
                        className="inline-flex min-h-11 items-center font-sans text-base font-semibold text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </li>
                    <li className="min-w-0">
                      <p className="mb-1 font-sans text-xs font-medium tracking-[0.12em] text-bronze uppercase">
                        WhatsApp
                      </p>
                      <a
                        href={contactWhatsAppUrl}
                        className="inline-flex min-h-11 items-center font-sans text-base font-semibold text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                      >
                        WhatsApp
                      </a>
                    </li>
                  </ul>
                </div>
              </address>
            </div>
          </details>
        </div>
      </Container>
    </Section>
  );
}
