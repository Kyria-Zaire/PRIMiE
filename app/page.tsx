import { ContactBooking } from "@/components/sections/contact-booking";
import { Faq } from "@/components/sections/faq";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { MobileNavigation } from "@/components/shell/mobile-navigation";
import { SkipLink } from "@/components/shell/skip-link";
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

export default function Home() {
  const visibleNavigation = getVisibleNavigation(RENDERED_SECTION_IDS);
  const routeNavigation = resolveNavigationForRoute(visibleNavigation, "/");
  const bookingWhatsAppUrl = buildWhatsAppUrl(siteConfig.contact.whatsappPrefillMessage);

  return (
    <>
      <SkipLink />
      <Header
        variant="heroOverlay"
        items={routeNavigation}
        homeHref="#accueil"
        mobileNavigation={
          <MobileNavigation
            items={routeNavigation}
            whatsappUrl={bookingWhatsAppUrl}
            whatsappLabel="Réserver sur WhatsApp"
          />
        }
      />
      <main id="contenu-principal" tabIndex={-1}>
        <Hero />
        <Services />
        <GalleryPreview />
        <Faq />
        <ContactBooking />
      </main>
      <Footer navigationItems={routeNavigation} homeHref="#accueil" />
    </>
  );
}
