import type { Metadata } from "next";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { GalleryPageHero } from "@/components/gallery/gallery-page-hero";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { MobileNavigation } from "@/components/shell/mobile-navigation";
import { SkipLink } from "@/components/shell/skip-link";
import { LinkButton } from "@/components/ui/button";
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
        <GalleryFilters
          items={gallery}
          footer={
            <>
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
            </>
          }
        >
          <GalleryPageHero />
        </GalleryFilters>
      </main>
      <Footer navigationItems={routeNavigation} homeHref="/" />
    </>
  );
}
