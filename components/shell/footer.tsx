import Image from "next/image";
import type { ReactNode } from "react";
import {
  FooterResponsiveGrid,
  type FooterDisclosureSlot,
} from "@/components/shell/footer-responsive-grid";
import { BrandLogo } from "@/components/shell/brand-logo";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { bookingConfig } from "@/content/booking";
import { featuredGalleryIds, gallery, galleryCopy } from "@/content/gallery";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site-config";
import type { ResolvedNavigationItem } from "@/content/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type FooterProps = {
  readonly navigationItems: readonly ResolvedNavigationItem[];
  readonly homeHref?: string;
  readonly year?: number;
};

/** Six premiers items featured — ordre CTO (FOOTER-DESIGN-R1B). */
const FOOTER_INSPIRATION_IDS = featuredGalleryIds.slice(0, 6);

const footerInspirations = FOOTER_INSPIRATION_IDS.map((id) => {
  const item = gallery.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`Footer inspiration manquante : ${id}`);
  }
  return item;
});

const linkClassName =
  "inline-flex min-h-11 items-center font-sans text-[0.9375rem] leading-snug font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus";

/** Ornement feuille / fleur PRiMiE — SVG partagé, décoratif. */
function FloralOrnament({ className }: { readonly className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 18"
      className={className ?? "h-4 w-7 text-gold"}
      fill="none"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M16 1.2c.9 2.8 3.2 4.8 6.1 5.4-2.9.6-5.2 2.6-6.1 5.4-.9-2.8-3.2-4.8-6.1-5.4 2.9-.6 5.2-2.6 6.1-5.4Z"
      />
      <path
        fill="currentColor"
        opacity="0.88"
        d="M7.2 3.1c.45 1.5 1.7 2.6 3.2 3-1.5.4-2.75 1.5-3.2 3-.45-1.5-1.7-2.6-3.2-3 1.5-.4 2.75-1.5 3.2-3Z"
      />
      <path
        fill="currentColor"
        opacity="0.88"
        d="M24.8 3.1c.45 1.5 1.7 2.6 3.2 3-1.5.4-2.75 1.5-3.2 3-.45-1.5-1.7-2.6-3.2-3 1.5-.4 2.75-1.5 3.2-3Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        d="M16 12.2v4.2"
        opacity="0.7"
      />
    </svg>
  );
}

function WhatsAppGlyph({ className }: { readonly className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className ?? "size-5 text-gold"}
      fill="currentColor"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.96.52 3.8 1.44 5.4L2 22l4.92-1.55a9.86 9.86 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.93 6.4 17.5 2 12.04 2Zm5.75 13.99c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.12.1-1.81-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.93-4.37-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.29.57-.36.76-.36h.55c.17 0 .4-.07.63.48.24.56.81 1.97.88 2.11.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 1.99 1.11.98 2.04 1.29 2.33 1.43.29.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.67-.17 1.34Z" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <path d="M7.2 3.8h2.2l1.1 3.2-1.5 1.1a10 10 0 0 0 4.5 4.5l1.1-1.5 3.2 1.1v2.2a1.5 1.5 0 0 1-1.6 1.5A12.4 12.4 0 0 1 5.7 5.4 1.5 1.5 0 0 1 7.2 3.8Z" />
    </svg>
  );
}

function HomeGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <path d="M4.5 10.5 12 4.5l7.5 6V19a1.5 1.5 0 0 1-1.5 1.5h-3.5V14h-5v6.5H6A1.5 1.5 0 0 1 4.5 19v-8.5Z" />
    </svg>
  );
}

function ClockGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <circle cx="12" cy="12" r="7.25" />
      <path d="M12 8.5V12l2.6 1.6" />
    </svg>
  );
}

function ScissorsGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <circle cx="7" cy="7" r="2.4" />
      <circle cx="7" cy="17" r="2.4" />
      <path d="M9.2 8.6 20 17M9.2 15.4 20 7" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <circle cx="12" cy="12" r="7.25" />
      <path d="m8.8 12.2 2.2 2.2 4.4-4.6" />
    </svg>
  );
}

function GridGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <rect x="4.5" y="4.5" width="6" height="6" rx="1" />
      <rect x="13.5" y="4.5" width="6" height="6" rx="1" />
      <rect x="4.5" y="13.5" width="6" height="6" rx="1" />
      <rect x="13.5" y="13.5" width="6" height="6" rx="1" />
    </svg>
  );
}

function IconBadge({ children }: { readonly children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-bronze/55 bg-warm-cream text-gold shadow-soft"
    >
      {children}
    </span>
  );
}

function FooterWave() {
  return (
    <svg
      aria-hidden="true"
      className="block h-12 w-full text-black sm:h-14 md:h-16 xl:h-[4.25rem]"
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M0 58c96-22 192-36 320-34 176 3 288 30 400 30s224-27 400-30c128-2 224 12 320 34V96H0V58Z"
      />
      <path
        fill="currentColor"
        opacity="0.35"
        d="M0 68c120-18 240-28 360-26 168 3 264 22 360 22s192-19 360-22c120-2 240 8 360 26V96H0V68Z"
      />
    </svg>
  );
}

/**
 * Pied de page public — Server Component (FOOTER-DESIGN-R1B → R1C-R2).
 * Données métier côté Server ; ouverture desktop déléguée à FooterResponsiveGrid.
 */
export function Footer({ navigationItems, homeHref = "#accueil", year }: FooterProps) {
  const copyrightYear = year ?? new Date().getFullYear();
  const plainWhatsAppUrl = buildWhatsAppUrl();
  const bookingWhatsAppUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);
  const hours = bookingConfig.openingHours;
  const galleryCta = galleryCopy.landing;

  const brand = (
    <div className="mb-5 flex flex-col items-center gap-3 text-center xl:mb-0 xl:items-start xl:gap-3.5 xl:pr-7 xl:text-left">
      <a
        href={homeHref}
        className="inline-flex w-fit items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
      >
        <BrandLogo className="h-auto w-[9.75rem] sm:w-[11rem] xl:w-[14rem]" />
      </a>
      <div className="flex max-w-sm flex-col gap-1.5 xl:max-w-none">
        <p className="font-display text-lg font-semibold tracking-tight text-gold sm:text-xl">
          {siteConfig.brand.commercialName}
        </p>
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          {siteConfig.brand.activity}
        </p>
        <p className="font-display text-[0.95rem] leading-snug text-balance text-bronze italic sm:text-base">
          {siteConfig.brand.slogan}
        </p>
      </div>
      <LinkButton
        href={bookingWhatsAppUrl}
        variant="secondary"
        size="lg"
        className="mt-1 min-h-16 w-full max-w-md justify-center gap-3 rounded-2xl border border-gold bg-black px-5 text-gold shadow-elevated hover:bg-rich-black hover:opacity-100 xl:max-w-none xl:min-h-[4.5rem]"
      >
        <span
          aria-hidden="true"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-rich-black"
        >
          <WhatsAppGlyph className="size-5 text-gold" />
        </span>
        <span className="font-sans text-[0.95rem] leading-tight font-semibold tracking-wide text-gold sm:text-base">
          Réserver sur WhatsApp
        </span>
      </LinkButton>
    </div>
  );

  const disclosures: readonly FooterDisclosureSlot[] = [
    {
      id: "navigation",
      title: "Navigation",
      icon: <FloralOrnament className="h-3.5 w-6 text-gold" />,
      className: "xl:border-l xl:border-soft-gold/55 xl:px-7",
      children:
        navigationItems.length > 0 ? (
          <nav aria-label="Navigation du pied de page" className="flex flex-col">
            {navigationItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={[
                  linkClassName,
                  "justify-between gap-2 py-2.5",
                  index > 0 ? "border-t border-soft-gold/30" : "",
                ].join(" ")}
              >
                <span className="min-w-0">{item.label}</span>
                <span aria-hidden="true" className="pl-1 text-base leading-none text-gold">
                  ›
                </span>
              </a>
            ))}
          </nav>
        ) : null,
    },
    {
      id: "services",
      title: "Services",
      icon: <ScissorsGlyph />,
      className: "xl:border-l xl:border-soft-gold/55 xl:px-7",
      children: (
        <ul className="m-0 flex list-none flex-col p-0">
          {services.map((service, index) => (
            <li
              key={service.id}
              className={[
                "min-h-11 py-2.5 font-sans text-[0.9375rem] leading-snug text-foreground",
                index > 0 ? "border-t border-soft-gold/30" : "",
              ].join(" ")}
            >
              {service.title}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "contact",
      title: "Contactez-moi",
      icon: <PhoneGlyph />,
      className: "xl:border-l xl:border-soft-gold/55 xl:px-7",
      children: (
        <div className="flex flex-col gap-3">
          <address className="m-0 flex flex-col gap-3 not-italic">
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="group flex min-h-11 items-start gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
            >
              <IconBadge>
                <PhoneGlyph />
              </IconBadge>
              <span className="flex min-w-0 flex-col gap-0.5 pt-0.5 font-sans text-sm leading-snug">
                <span className="text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
                  Téléphone
                </span>
                <span className="font-medium text-foreground">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </span>
            </a>
            <a
              href={plainWhatsAppUrl}
              className="group flex min-h-11 items-start gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
            >
              <IconBadge>
                <WhatsAppGlyph className="size-4 text-gold" />
              </IconBadge>
              <span className="flex min-w-0 flex-col gap-0.5 pt-0.5 font-sans text-sm leading-snug">
                <span className="text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
                  WhatsApp
                </span>
                <span className="font-medium text-foreground">WhatsApp</span>
              </span>
            </a>
          </address>

          <div className="flex min-h-11 items-start gap-3">
            <IconBadge>
              <HomeGlyph />
            </IconBadge>
            <div className="flex min-w-0 flex-col gap-0.5 pt-0.5 font-sans text-sm leading-snug">
              <p className="text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
                Prestations
              </p>
              <p className="font-medium text-foreground">Prestations à domicile</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <IconBadge>
              <ClockGlyph />
            </IconBadge>
            <div className="flex min-w-0 flex-col gap-0.5 pt-0.5 font-sans text-sm leading-snug">
              <p className="text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
                Horaires
              </p>
              <p className="font-medium text-foreground">{hours.daysLabel}</p>
              <p className="font-medium text-foreground">{hours.hoursLabel}</p>
              <p className="text-muted-foreground">{hours.appointmentOnlyLabel}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "inspirations",
      title: "Inspirations",
      icon: <GridGlyph />,
      className: "xl:border-l xl:border-soft-gold/55 xl:pl-7",
      children: (
        <>
          <ul
            data-footer-mosaic
            className="m-0 grid w-full list-none grid-cols-3 gap-1 p-0 sm:gap-1.5 xl:gap-2"
          >
            {footerInspirations.map((item) => (
              <li key={item.id} className="overflow-hidden rounded-lg bg-black shadow-soft">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 1279px) 28vw, 120px"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
          <a
            href={galleryCta.ctaHref}
            className={`${linkClassName} mt-3 gap-2 text-bronze underline-offset-4 hover:underline`}
          >
            <span className="min-w-0">{galleryCta.ctaLabel}</span>
            <span aria-hidden="true" className="text-gold">
              →
            </span>
          </a>
        </>
      ),
    },
  ];

  return (
    <footer className="border-t border-soft-gold/60 bg-ivory text-foreground">
      <Container className="py-10 sm:py-12 md:py-14 xl:pt-16 xl:pb-12">
        <div className="mx-auto flex w-full max-w-[min(100%,40rem)] flex-col gap-8 sm:max-w-[42rem] md:max-w-[52rem] xl:mx-0 xl:max-w-none xl:gap-12">
          <FooterResponsiveGrid brand={brand} disclosures={disclosures} />

          <div
            data-footer-facts
            className="relative overflow-hidden rounded-2xl border border-soft-gold/45 bg-warm-cream px-4 py-5 shadow-soft sm:px-6 sm:py-6 md:rounded-[1.75rem] xl:flex xl:min-h-[10.5rem] xl:items-center xl:px-8 xl:py-7"
          >
            <div className="grid w-full gap-4 sm:gap-5 xl:grid-cols-[1.1fr_1.1fr_1.35fr_auto] xl:items-center xl:gap-6">
              <div className="flex items-start gap-3 border-b border-soft-gold/35 pb-4 text-left xl:border-0 xl:pb-0">
                <IconBadge>
                  <ScissorsGlyph />
                </IconBadge>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold tracking-[0.12em] text-gold uppercase">
                    6 prestations
                  </p>
                  <p className="mt-1 font-sans text-sm leading-snug text-muted-foreground">
                    {services.length} prestations proposées.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-b border-soft-gold/35 pb-4 text-left xl:border-0 xl:border-l xl:border-soft-gold/40 xl:pb-0 xl:pl-6">
                <IconBadge>
                  <HomeGlyph />
                </IconBadge>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold tracking-[0.12em] text-gold uppercase">
                    À domicile
                  </p>
                  <p className="mt-1 font-sans text-sm leading-snug text-muted-foreground">
                    {siteConfig.brand.activity}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left xl:border-l xl:border-soft-gold/40 xl:pl-6">
                <IconBadge>
                  <CheckGlyph />
                </IconBadge>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold tracking-[0.12em] text-gold uppercase">
                    Confirmation par Prisca
                  </p>
                  <p className="mt-1 font-sans text-sm leading-snug text-muted-foreground">
                    {bookingConfig.copy.confirmationNote}
                  </p>
                </div>
              </div>
              <p
                aria-hidden="true"
                className="footer-signature pt-1 text-center font-script text-3xl leading-none text-gold xl:self-center xl:pt-0 xl:pl-2 xl:text-right xl:text-[2.35rem]"
              >
                Prisca
              </p>
            </div>
          </div>
        </div>
      </Container>

      <FooterWave />

      <div data-footer-bottom className="bg-black text-on-dark">
        <Container className="flex min-h-[7.5rem] flex-col items-center justify-center gap-4 py-8 text-center sm:min-h-[8rem] xl:grid xl:min-h-[10.5rem] xl:grid-cols-[1fr_auto_1fr] xl:gap-6 xl:py-11 xl:text-left">
          <p className="max-w-[14.5rem] text-balance font-sans text-sm text-on-dark-muted sm:max-w-none xl:text-left">
            © {copyrightYear} {siteConfig.brand.commercialName}. Tous droits réservés.
          </p>
          <div className="mx-auto flex flex-col items-center gap-2">
            <span aria-hidden="true" className="h-px w-10 bg-gold/55" />
            <FloralOrnament className="h-5 w-9 text-gold" />
            <span aria-hidden="true" className="h-px w-10 bg-gold/55" />
          </div>
          <span className="hidden xl:block" aria-hidden="true" />
        </Container>
      </div>
    </footer>
  );
}
