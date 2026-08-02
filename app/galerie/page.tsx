import type { Metadata } from "next";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { MobileNavigation } from "@/components/shell/mobile-navigation";
import { SkipLink } from "@/components/shell/skip-link";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { gallery, galleryCopy } from "@/content/gallery";
import { siteConfig } from "@/content/site-config";
import {
  getVisibleNavigation,
  resolveNavigationForRoute,
  type NavigationSectionId,
} from "@/lib/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const RENDERED_SECTION_IDS = [
  "accueil",
  "services",
  "galerie",
  "faq",
  "reserver",
  "contact",
] as const satisfies readonly NavigationSectionId[];

const copy = galleryCopy.page;

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
};

export default function GaleriePage() {
  const visibleNavigation = getVisibleNavigation(RENDERED_SECTION_IDS);
  const routeNavigation = resolveNavigationForRoute(visibleNavigation, "/galerie");
  const bookingWhatsAppUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

  return (
    <>
      <SkipLink />
      <Header
        items={routeNavigation}
        homeHref="/"
        mobileNavigation={
          <MobileNavigation
            items={routeNavigation}
            whatsappUrl={bookingWhatsAppUrl}
            whatsappLabel="Réserver sur WhatsApp"
          />
        }
      />
      <main id="contenu-principal" tabIndex={-1}>
        <Section tone="cream" aria-labelledby="galerie-page-heading">
          <Container className="flex flex-col gap-8 md:gap-10">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
              <h1
                id="galerie-page-heading"
                className="font-display text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl"
              >
                {copy.title}
              </h1>
              <p className="font-display text-lg italic text-bronze sm:text-xl">{copy.accent}</p>
              <span
                aria-hidden="true"
                className="h-px w-14 bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)]"
              />
              <p className="max-w-prose font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                {copy.description}
              </p>
            </div>

            <GalleryFilters items={gallery} />

            <p className="mx-auto max-w-2xl text-center font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {copy.disclosure}
            </p>

            <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl bg-black px-6 py-8 text-center sm:px-10 sm:py-10">
              <p className="max-w-prose font-sans text-sm leading-relaxed text-on-dark-muted sm:text-base">
                {copy.bookingSecondary}
              </p>
              <LinkButton
                href={copy.bookingCtaHref}
                variant="primary"
                size="lg"
                className="w-full justify-center sm:w-auto"
              >
                {copy.bookingCtaLabel}
              </LinkButton>
            </div>
          </Container>
        </Section>
      </main>
      <Footer navigationItems={routeNavigation} homeHref="/" />
    </>
  );
}
